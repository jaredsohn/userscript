// ==UserScript==

// @author	  anthony <bakayarou@gmail.com>

// @name          goto: subreddit

// @description   go to a sub-reddit with a box underneath the search-reddit box

// @include       http://www.reddit.com/*

// ==/UserScript==


$ = unsafeWindow.jQuery;

var spacer = $('div.side');
var form   = spacer.children('.spacer')
            .children('form')
            .clone(false, false);

form.children().attr('placeholder', 'goto subreddit');
form.children().focus(function(event){
    event.stopImmediatePropagation();
    return false;
});

form.submit(function(e){
   e.preventDefault();
   var input = $(this).children().val().replace(/\s/g,'');
   window.location = 'http://www.reddit.com/r/' + input;
}).insertAfter(spacer.children().first());