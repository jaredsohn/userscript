// ==UserScript==
// @name           Deals :: Last Comment by... (on deals page)
// @namespace      Woot
// @include        http://deals.woot.com/*
// @exclude        http://deals.woot.com/deals/details/*
// @exclude        http://deals.woot.com/deals/go/*
// @exclude        http://deals.woot.com/questions/details/*
// ==/UserScript==

// v0.12 (02/19/2010)
// - Fixed so it works with both deals and questions (ask the wooters) page
// v0.11 (02/19/2010)
// - Added another exclude (/questions/details/*) to avoid the error
//   in console.
// v0.10 (02/18/2010)
// - Release

// Feel free to put this wherever you want, claim it, modify it, etc. not really
// too worried about a woot script. ;-)

// Yank jQuery from woot's site
$ = unsafeWindow.jQuery;
jQuery = unsafeWindow.jQuery;

// iterate through the "postInfo" <post block> DIVs
$('div.postInfo').each(function(){
  // Grab the comment field so we can get an RSS link to the comments
  // Also, check URL so it will work on deals page and "ask the wooters".
  var $comments = $('a.comment-count',this) || $('h3>a',this);
  var isQuestions = ($comments.attr('href').indexOf('questions') != -1);
  var rss = 'http://deals.woot.com/'
          + (isQuestions ? 'questions.rss/' : 'deals.rss/')
          + $comments.attr('href').substring((isQuestions ? 11 : 7)).split('#')[0]
          + '?sort=newest&page=1';
  // go out to the RSS page and get the comments
  $.ajax({
    type: 'GET',
    url: rss,
    dataType: 'xml',
    success: function(xml){
      var $post = $(xml).find('item:first');
      //TODO: check the comment count _before_ we call AJAX, save us a round trip.
      //      hoenstly, just too lazy at the moment
      if ($post.length > 0){ // make sure we have comments to post.
        var lastPoster = $post.find('title').text();
        var lastComment = $post.find('description').text();
        // inject the html just after the comment count
        // I am _assuming_ that just escaping the name works to make a direct profile link.
        // if not, guess I go another route. Hard finding a user (with a space) who's posted
        // though so I can test. ;-)
        $comments.after(', last by <a href="/deals/users/'+escape(lastPoster)+'" title="'+lastComment+'">'
          +lastPoster+'</a> ');
      }
    }
  });
});// EOF