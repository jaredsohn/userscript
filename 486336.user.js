/**
 * Created by Marcel van Doornen on 16-04-2014.
 */
// ==UserScript==
// @name        Netflix > Trakt.tv search
// @namespace   NetflixTraktSearch
// @include     http://www.netflix.com/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
  /**
   * Loop over each movie/show on this page
   */
  $('.agMovie').each(function(){

    // Create search links
    var links = create_movie_link(this);

    // Show the links on the screen
    $(this).prepend('<div class="search-container">' + links +    '</div>');
  });

  /**
   * Genre pages
   */
  $('.lockup').each(function(){

    // Create search links
    var links = create_movie_link(this);

    // Show the links on the screen
    $(this).prepend('<div class="search-container">' + links +    '</div>');
  });

  /**
   * Recommended movie/show
   */
  $('.supportVideos li').each(function(){

    // Create search links
    var links = '<div class="search-container small">' + create_movie_link(this, true) + '</div>';
    // Show the links on the screen
    $(this).html($(this).html() + links);
  });

  /**
   * Create trakt.tv search links
   */
  function create_movie_link(movie, short) {
    // Ge movie/show title
    var title = $(movie).find('img').attr('alt');

    // Create links for above a movie/show image
    if (short) {
      var links = '<a target="_blank" title="Search for movie '+ title +'" href="http://trakt.tv/search/movies?q=' + title + '">movie</a> | <a target="_blank" title="Search for show '+ title +'" href="http://trakt.tv/search/shows?q=' + title +  '">show</a>';
    }
    else {
      var links = 'Trak.tv search: <a target="_blank" title="Search for movie '+ title +'" href="http://trakt.tv/search/movies?q=' + title + '">movie</a> | <a target="_blank" title="Search for show '+ title +'" href="http://trakt.tv/search/shows?q=' + title +  '">show</a>';
    }

    // Show the links on the screen
    var output = '<div class="search-container">' + links +    '</div>';
    return output;
  }

  /**
   * Add some styling
   */
  var css = '.search-container {display:block; clear: both; text-align: left; padding-left: 5px;}';
  css += '.recentlyWatchedInner .search-container{ padding-left: 0;}';
  css += '.small {font-size: 80%;font-weight: normal;padding: 0;}';
  css += '#genrePage .search-container{padding-left:0;font-size: 85%;margin-top: -10px;position: absolute;width: 160px;}';
  css += '#page-KidsAltGenre .search-container{padding-left:0}';

  $('head').append('<style media="screen" type="text/css">' + css + '</style>');
});

