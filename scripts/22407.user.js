// 
// Pitchfork links: Greasemonkey user script
// v0.1, 2008-02-06
// (c) 2008 by Tony Gambone <tonygambone@gmail.com>
// Released under the GPLv2 license, available at gnu.org.
//
// To hide or re-order links, edit the 'show' array below.
//
// To add new links, create a function named 'get_XXXX_content()'
// that returns the string that you would like to add to the page.
// Use the existing functions as an example.  Then, add 'XXXX' to
// the 'show' array (of course, replace 'XXXX' with something
// more meaningful). If the links don't appear, look in the Firefox
// error console for problems.
// 
// ==UserScript==
// @name           Pitchfork links
// @namespace      mogrify
// @description    Add links to Pitchfork record reviews based on artist and album. Includes links to Last.fm, iLike, and Wikipedia.
// @include        http://www.pitchforkmedia.com/article/record_review/*
// ==/UserScript==

// configuration: which links to display
var show = new Array(
    'lastfm',
    'ilike',
    'wikipedia'
  );

// variables to hold the review info
var artist_name;
var album_name;

// template for creating new links
var url_placeholder = '[[[URL]]]';
var text_placeholder = '[[[TEXT]]]';
var link_html = '<img alt="Link-arrow" src="http://assets3.pitchforkmedia.com/images/link-arrow.gif?1200372477" style="clear:both;margin: 0px; padding: 5px 5px 0px 0px;" /><a href="[[[URL]]]" class="big_link">[[[TEXT]]]</a><br />';

//
// Last.fm
//

function get_lastfm_artist_url() {
  return 'http://last.fm/music/' + escape(artist_name);
}

function get_lastfm_album_url() {
  return get_lastfm_artist_url(artist_name) + '/' + escape(album_name);
}

function get_lastfm_content() {
  return get_link( get_lastfm_artist_url(), 'Last.fm artist page' ) + get_link( get_lastfm_album_url(), 'Last.fm album page' );
}

//
// iLike
//

function get_ilike_artist_url() {
  return 'http://www.ilike.com/artist/' + escape(artist_name);
}

function get_ilike_album_url() {
  return get_ilike_artist_url(artist_name) + '/album/' + escape(album_name);
}

function get_ilike_content() {
  return get_link( get_ilike_artist_url(), 'iLike artist page' ) + get_link( get_ilike_album_url(), 'iLike album page' );
}

//
// Wikipedia
//

function get_wikipedia_content() {
  return get_link( 'http://en.wikipedia.org/wiki/' + escape(artist_name), 'Wikipedia' );
}


//
// Generic functions
//

// get a pitchfork link for the given URL and text
function get_link( url, text ) {
  return link_html.replace(url_placeholder, url).replace(text_placeholder, text);
}

// determine the review info
function get_info() {
  var title = find_first_element_with_class( 'span', 'reviewtitle fn' );
  if (title) {
    var a = title.innerHTML.split('&nbsp;<br>');
    if (a.length == 2) {
      artist_name = a[0];
      album_name = a[1];
      return true;
    }
  }   
  return false;
}

// find an element by tag and class name
function find_first_element_with_class( tag_name, class_name ) {
  var a = document.getElementsByTagName(tag_name);
  for (var i = 0; i < a.length; i++) {
    if (a[i].className == class_name) {
      return a[i];
    }
  }
  return false;
}

// assemble the content
function get_content() {
  var out = '';  
  for (var i = 0; i < show.length; i++) {
    var function_name = 'get_' + show[i] + '_content';
    if ( eval('typeof ' + function_name) == 'function' ) {
      out += eval( function_name + '()' );
    } else {
      GM_log("Invalid name: " + show[i]);
    }
  }  
  return out;
}

// insert the links into the page
function insert_content() {
  if (!get_info()) {
    GM_log("Fail: couldn't determine artist/album info.");
    return false;
  }
  
  var span = document.createElement('span');
  span.innerHTML = get_content();  
  var articleBodyDiv = find_first_element_with_class( 'div', 'article_body' );
  
  if (articleBodyDiv) {
    articleBodyDiv.parentNode.insertBefore(span, articleBodyDiv);
    GM_log("Success: inserted links.");    
  } else {
    GM_log("Fail: couldn't locate article body.");
  }
}

// do it
insert_content();