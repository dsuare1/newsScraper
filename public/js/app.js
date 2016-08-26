$(document).ready(function() {

    console.log('front-end app.js loaded');

    var articleTitles = [];
    var articleLinks = [];
    var curIndex = 0;
    var clickCountNote = 0;

    $.get('/scrape', function() {
        return;
    });

    $('#date').html(moment().format('MMMM Do YYYY'));

    $('#next-article').on('click', function() {
        $('#article-title').empty();
        $('#article-link').empty();
        curIndex++;
        displayArticleTitle(articleTitles[curIndex]);
        displayArticleLink(articleLinks[curIndex]);
        if (curIndex >= articleTitles.length) {
            $('#article-title').html('No more articles!');
        }
        $('#save-note').remove();
        $('#note-body-input').val("");
        clickCountNote = 0;
    });

    $('#prev-article').on('click', function() {
        if (curIndex == 0) {
            return;
        }
        $('#article-title').empty();
        $('#article-link').empty();
        curIndex--;
        displayArticleTitle(articleTitles[curIndex]);
        displayArticleLink(articleLinks[curIndex]);
        $('#save-note').remove();
        $('#note-body-input').val("");
        clickCountNote = 0;
    });

    function displayArticleTitle(title) {
        $('#article-title').html(title);
    }

    function displayArticleLink(link) {
        $('#article-link').html(link);
    }

    $('#view-articles').on('click', function() {

        $.getJSON('/articles', function(data) {
            for (var i = 0; i < data.length; i++) {
                var p = $('<p data-id="' + data[i]._id + '">' + data[i].title + '</p>');
                articleTitles.push(p);
                var a = $('<a href="' + data[i].link + '" target="_blank">' + data[i].link + '</a>');
                articleLinks.push(a);
            }
            displayArticleTitle(articleTitles[curIndex]);
            displayArticleLink(articleLinks[curIndex]);
        });

        $(this).animate({
            opacity: 0
        }, 1000, function() {
            $(this).remove();
            $('#view-articles-button-container').remove();

            $('#front-page').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');

            $('#note-header').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');

            $('#note-display').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');

            $('#next-article').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');

            $('#prev-article').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');
        });

    });

    // to add notes
    $('#article-title').on('click', 'p', function() {
        // empty the notes from the note section
        $('#note-body-input').empty();
        $('#save-note').remove();
        // save the id from the article title
        var thisId = $(this).attr('data-id');
        console.log('this article\'s id: ' + thisId);

        // now make an ajax call for the Article
        $.ajax({
                method: 'GET',
                url: '/articles/' + thisId
            })
            // with that done, add the note information to the page
            .done(function(data) {
                // console.log(data);
                if (clickCountNote != 0) {
                    return;
                } else {
                    $('#note-display').append('<div id="save-button-container"><button data-id="' + data._id + '" id="save-note">Save Note</button></div>');
                    $('#note-body-input').attr('disabled', false).focus();
                // $('#save-note').attr('disabled', false);
                    if (data.note) {
                        $('#note-body-input').val(data.note.body);
                    }
                }
                clickCountNote++;
            });
    });

    $('#note-body-input').blur(function() {
        $(this).attr('disabled', true);
        // $('#save-note').attr('disabled', true);
        clickCountNote = 0;
    });

    $('#note-display').on('click', 'button', function() {
        console.log('save button hit');
        var thisId = $(this).attr('data-id');
        console.log('id: ' + thisId);
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: $('#note-body-input').val()
            }
        })
        .done(function(data) {
            console.log(data);
            $('#note-body-input').val("");
            // $(this).attr('disabled', true);
            $(this).remove();
        });
    });
});
