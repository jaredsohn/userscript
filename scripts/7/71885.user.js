// ==UserScript==
// @name          RedditGSearch
// @namespace     http://worldisending.com/
// @description   Search Reddit using Google with a simple shortcut (Just hold down the CTRL key and press Enter!)
// @include       http://reddit.com/*
// @include       http://www.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require       http://worldisending.com/development/shortcuts_fin.js
// ==/UserScript==

function googleSearch() {
  var the_val = getValue();
  if (the_val!="") {    
      window.open("http://www.google.com/search?hl=en&q=site:reddit.com " + the_val) ;        
  }
  else {
    alert("Please enter something to search.")
  }
}


function getValue() {
    // this line does the magic
    var theValue = $('#search input').val()
    return theValue;
}


$(document).ready(function() {

	shortcut.add("Ctrl+Enter", function() {
		googleSearch();
	});

});
