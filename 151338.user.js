// ==UserScript==
// @name           Tatoeba Filter Some Users Comment
// @copyright      Christophe HENRY <siteweb@sbgodin.fr>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      http://sbgodin.fr
// @description    Filters out some users' messages in the comment thread of sentences.
// @include        http://tatoeba.org/*
// @match          http://tatoeba.org/*
// @grant          none
// ==/UserScript==
// This uses the JQuery library, already imported by Tatoeba

$(document).ready(function () {
  
/* 
  blackList = {
    'foo1': {}, // default strategy, blur for all cases
    'foo2': {wall: 'hide'}, // default strategy, blur, for sentences and hide for wall
    'foo3': {sentences: 'hide'}, // default strategy, blur, for wall and hide for sentences
    'foo4': {sentences: 'hide', wall: 'blur'}, // explicit strategy for all cases
    'foo5': {wall: 'blur', sentences: 'hide'}, // same as above
  }; 
  */

  // Je adapti, To adapt, À modifier.
  blackList = {}; 
  
  if (0==Object.keys(blackList).length) {
    alert('Tatoeba Filter Some Users Comment\n\nBlackList: Je adapti, To adapt, À modifier.');
    return;
  }

  // will adapt behavior of the script
  if (-1!=location.pathname.search('/wall/')) {
    sitePart = 'wall';
  } else if (-1!=location.pathname.search('/sentences/')) {
    sitePart = 'sentences';
  } else {
    sitePart = '';
  }
  if (''==sitePart) return; // unmanaged case, do nothing
  
  var authors = $(this).find('.author a');
  var viewedAuthors = authors.length; // number of views, if zero then a message
  
  authors.each(function(index) {
    pseudo = $(this).text();
    if (Object.keys(blackList).indexOf(pseudo)!=-1) { // current author in blacklist?
      action = blackList[pseudo][sitePart]; // choose between the alternatives: wall, sentences
      switch(action) {
	case 'hide': // will hide the content
	  viewedAuthors--;
	  switch(sitePart) {
	    case 'wall': $(this).closest('div').css('display', 'None'); break
	    case 'sentences': $(this).closest('li').css('display', 'None'); break;
	  }
	break;
	case 'blur': // will display, but not as visible as the others
 	default:
	  blurOn = function(element) {
	    // Ugly: this to guess wether I use this (as an event handler)
	    //       or the parameter (when called directly)
	    if ((""+this.constructor).search('HTML')!=-1) element = $(this);
	    $(element)
	      .css('font-size','.8em')
	      .css('color', 'lightgray')
	  }
	  blurOff = function(element) {
	    $(this)
	      .css('font-size','0.9em')
	      .css('color', '#444')
	  }
	  switch(sitePart) {
	    // manages the mouse hover to blur/unblur the text
	    case 'wall': blurOn($(this).closest('div').hover(blurOff, blurOn)); break;
	    case 'sentences': blurOn($(this).closest('li').hover(blurOff, blurOn)); break;
	  }
	break;
      }
    }	
  });
  if (viewedAuthors==0 && authors.length>0) { // tries to behave as if there were really nothing
    //TODO: manage more languages
    $('ol.comments').append('<em>Ne estas komento ĝis nun.</em>');   
  }
});
