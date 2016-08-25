$(document).ready(function() {

    console.log('front-end app.js loaded');

    var articleTitles = [];
    var articleLinks = [];
    var curIndex = 0;

    $.get('/articles', function(data) {
        for (var i = 0; i < data.articles.length; i++) {
            articleTitles.push(data.articles[i].title);
            articleLinks.push(data.articles[i].link);
        }
        displayArticleTitle(articleTitles[curIndex]);
        displayArticleLink(articleLinks[curIndex]);
    });

    $('#date').html(moment().format('MMMM Do YYYY'));

    $('#iterate-articles').on('click', function() {
        $('#article-title').empty();
        $('#article-link').empty();
        curIndex++;
        displayArticleTitle(articleTitles[curIndex]);
        displayArticleLink(articleLinks[curIndex]);
        if (curIndex >= articleTitles.length) {
        	noMoreArticles();
        }
    })

    function displayArticleTitle(title) {
        $('#article-title').html(title);
    }

    function displayArticleLink(link) {
        $('#article-link').html(link);
    }

    function noMoreArticles() {
    	$('#article-title').html('No more articles!');
    }

    $('#view-articles').on('click', function() {
    	$(this).animate({
    		opacity: 0
    	}, 2000, function() {
    		$(this).remove();
    		$('#view-articles-button-container').remove();
    		
    		$('#front-page').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');
    		
    		$('#note-display').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');
    		
    		$('#iterate-articles').fadeIn(2000).css('display', 'inline-block').removeClass('hidden');
    	});
    });

});
