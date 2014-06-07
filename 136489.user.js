// ==UserScript==
// @name          Better Douban
// @author        jnozsc
// @namespace     http://www.douban.com/people/1563045/
// @description   I need a better douban
// @include       http://www.douban.com/*
// @match         http://www.douban.com/*
// @include       http://book.douban.com/*
// @match         http://book.douban.com/*
// @include       http://music.douban.com/*
// @match         http://music.douban.com/*
// @include       http://movie.douban.com/*
// @match         http://movie.douban.com/*
// @version       1.4
// ==/UserScript==

function main($) {
  'use strict';
  jQuery.noConflict();

  // get domain URL
  var currentURL = document.URL;
  // if douban homepage, except location
  if ((currentURL.indexOf("www.douban.com") != -1) && (currentURL.indexOf("location") == -1)) {
    // remove ugly mini ad, it doesn't match the width, stupid douban coders forget to test it on the old version homepage
    $(".promote-mod").hide();
    // if book homepage
  } else if (currentURL.indexOf("book.douban.com") != -1) {
    // if login
    if ($(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").size() != 0) {
      // change tag to review
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('分类') >a").attr('href', '/review/best/');
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('分类') >a").text('书评');
      // move 'update' after 'review'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('书评')").after($(".bd:eq(1) > .site-nav-items > ul > li:contains('动态')"));
    }
    // move search input to right
    $(".nav-srh").css('float', 'right');
    // remove search input background
    $(".nav-srh").css('background', 'none');
    $(".nav-srh > form").css('background', 'none');
    // change nav bar color to douban green
    $(".bd:eq(1)").css('background-color', '#E9F4E9');
    // remove dashed line between <li>s
    $(".site-nav-items > ul >li").css('background', 'none');
    // move read store ad below, I have already seen the ad!
    $(".book-express-home").after($(".read-landing"));
    // move tag cloud below, i don't need this foolish cloud, stupid douban coders forget to add div id.
    $(".pl2").before($(".aside > h2:contains('热门标签')"));
    $(".pl2").before($(".hot-tags-col5"));
    // fix an online display bug of douban book subject search
    if (currentURL.indexOf("subject_search") != -1) {
      if ($(".rr").html().indexOf('共0') != -1) {
        $(".mb20").after($(".article > p:eq(2)"))
        $(".mb20").after($(".article > p:eq(1)"))
        $(".mb20").after($(".article > p:eq(0)"))
        $(".mb20").after($(".article > h2:eq(0)"))
        $(".article > [class!='rr']").hide()
      }
    }
    // if movie homepage
  } else if (currentURL.indexOf("movie.douban.com") != -1) {
    //if login
    if ($(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").size() != 0) {
      // change 'tag' to 'recommended'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('分类') >a").attr('href', '/recommended');
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('分类') >a").text('豆瓣猜');
      // remove useless movie ticket
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('电影票')").hide();
      // move 'review' after 'mine'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").after($(".bd:eq(1) > .site-nav-items > ul > li:contains('评')"));
      // move 'recommended' after 'mine'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").after($(".bd:eq(1) > .site-nav-items > ul > li:contains('猜')"));
    }
    // move search input to right
    $(".nav-srh").css('float', 'right');
    // remove search input background
    $(".nav-srh").css('background', 'none');
    $(".nav-srh > form").css('background', 'none');
    // change nav bar color to douban green
    $(".bd:eq(1)").css('background-color', '#E9F4E9');
    // remove dashed line between <li>s
    $(".site-nav-items > ul >li").css('background', 'none');
    // change nav bar link font color to douban green	
    $(".site-nav-items > ul > li[class!='new'] > a").css('color', '#0C7823');
    // change search input border color to douban green
    $(".inp > span:eq(0) > input").css('border-color', '#A6D098');
	// move 'recommended' upside, and 'tag' cloud downside
	$(".movie_show").after($(".newtags"))
	$(".movie_top").before($(".movie_show"))
    // fix an online display bug of douban movie subject search
    if (currentURL.indexOf("subject_search") != -1) {
      $(".mb20").after($(".mb40"))
    }
    //if music homepage 
  } else if (currentURL.indexOf("music.douban.com") != -1) {
    // remove douban.fm. there is a link in class 1 nav, so the link in class 2 nav is unneccessary.
    $(".bd:eq(1) > .site-nav-items > ul > li:contains('FM')").hide();
    // if login
    if ($(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").size() != 0) {
      // move 'mine' to first link
      $(".bd:eq(1) > .site-nav-items > ul > li:eq(0)").before($(".bd:eq(1) > .site-nav-items > ul > li:contains('我')"));
      // add 'recommended' and 'review' after 'mine'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('我')").after("<li><a href='/recommended'>豆瓣猜</a></li><li><a href='/review/best/'>乐评</a></li>");
      // change the text of 'mine' to comport with book's and movie's
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('我') >a").text('我听');
      // remove 'tag'
      $(".bd:eq(1) > .site-nav-items > ul > li:contains('分类')").hide();
    }
    // change nav bar background color to douban green
    $(".bd:eq(1)").css('background-color', '#E9F4E9');
    // change nav bar link font color to douban green
    $(".site-nav-items > ul > li[class!='new'] > a").css('color', '#0C7823');
    // increase the width of search input form to comport with book's and movie's
    $(".inp").css('width', '366px');
    $(".inp > span:eq(0) > input").css('width', '300px');
    // change search input border color to douban green
    $(".inp > span:eq(0) > input").css('border-color', '#A6D098');
    // change something in the music homepage, except other page
    if ((currentURL.indexOf("subject") == -1) && (currentURL.indexOf("artists") == -1) && (currentURL.indexOf("mine") == -1) && (currentURL.indexOf("people") == -1)) {
      // remove douban music artists from homepage, they are toooo ulgy
      $(".article > div > h2").hide();
      $(".article > div > div.clearfix").hide();
      $(".article > div > div#song-chart.song-chart").hide();
      // move 'recommended' upside, and 'tag' cloud downside
      $(".movie_show").after($(".newtags"))
      // if login movie music-event above 'tag' cloud
      if ($("#music-events").size() != 0) {
        $(".movie_show").after($("#music-events"));
      }
    }
    // remove a h1 title on douban music search page to comport with book's and movie's
    if (currentURL.indexOf("subject_search") != -1) {
      $("#content > h1").hide()
    }
    // fix an online display bug on music recommended page, 20120715 check, maybe has been fixed, so remove
    //if (currentURL.indexOf("recommended") != -1) {
    //  $(".fav> dl:nth-child(3n-1)").hide();
    //  $(".fav> dl:nth-child(3n)").hide();
    //}
  }

}

function thirdParty($) {
  'use strict';
  jQuery.noConflict();

  // Put third-party non-jQuery functions here.  They'll be wrapped into the 
  // jQuery prototype in a moment.
  var sayHello = function (who) {
      alert('Hello ' + who + '!');
    }

  jQuery.extend({
    // If you have any non-jQuery functions, they need to be wrapped in here.
    sayHellow: function (who) {
      return sayHello('World');
    }

  });

  // Put third-party jQuery plugins, extensions, etc. here
}

!
function loader(i) {
  var script, requires = ['http://img3.douban.com/js/packed_jquery.min6301986802.js'],
    head = document.getElementsByTagName('head')[0],
    makeScript = function () {
      script = document.createElement('script');
      script.type = 'text/javascript';
    },
    loadLocal = function (fn) {
      makeScript();
      script.textContent = '(' + fn.toString() + ')(jQuery);';
      head.appendChild(script);
    };
  (function (i) {
    makeScript();
    script.src = requires[i];
    script.addEventListener('load', function () {
      ++i !== requires.length ? loader(i) : (loadLocal(thirdParty), loadLocal(main));
    }, true);
    head.appendChild(script);
  })(i || 0);
}();