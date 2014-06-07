// Google Fool / April Foogle / Flickr Fool
//
// A Search-engine Mindreading Magic Trick / Practical Joke / April Fool
//
// YOU WON'T BE ABLE TO MAKE USE OF THIS WITHOUT CAREFULLY READING THE
// INSTRUCTIONS: http://www.krazydad.com/greasemonkey/googlefool.php
//
// Copyright 2005, Jim Bumgardner (krazydad.com, jbum.com)
//
// Release History:
// Version 1.1.1 2005-03-30
//     * Fixed backspace during covert entry.
//     * Clear input field on page entry
//
// Version 1.1   2005-03-30
//     * Now works with Google image search, Yahoo and Flickr Tag Search, and many others.
//
// Version 1.0   2005-03-29
//     Based on my effect Bondoogle (http://www.krazydad.com/bondoogle/)
//
// ==UserScript==
// @name          Google Fool
// @description	  Modifies various search engines to do a great magic trick / april fool
// @include       http://www.google.com/*
// @include       http://images.google.com/*
// @include       http://news.google.com/*
// @include       http://www.flickr.com/photos/tags/*
// @include       http://www.yahoo.com/*
// ==/UserScript==

(function() 
{

	// Edit this to provide your own fake question
	//
	var trickQuestion = "What is it that I am looking for?";

	// Edit this to match other search forms you want to use
	//
	var nameOfSearchParams = ['q',  // used in Google, Flickr and a few others
	                          'p']; // used in Yahoo

	var NORMAL = 0;
	var SECRET = 1;
	var CODED = 2;

	var mode = NORMAL;
	var count = 0;

	function dochange(e) 
	{
	  var whichkey;

	  if (e.which) 			whichkey = e.which;
	  else if (e.keyCode)	whichkey = e.keyCode;
	  else		        	whichkey = window.event.keyCode;

	  // slashes are giving me 191 47
	  if (whichkey == 191)
		return false;	// ignore it

	  switch (mode) {
	  case NORMAL:
	    if (whichkey == 47) {
	      mode = SECRET;
	      document.foolinput.value = trickQuestion.substring(0, ++count);
	      document.foolquery.value = "";
	      return false;
	    }
	    else {
	      document.foolquery.value += String.fromCharCode(whichkey);
	    }
	    break;
	  case SECRET: // todo: add backspace support!!!
	    // 4/1/05 allow backspacing
	    if (whichkey == 8) {
	      --count;
	      document.foolquery.value = document.foolquery.value.substr(0,document.foolquery.value.length-1);
	      return true;
	    }
	    document.foolinput.value = trickQuestion.substring(0, ++count);
	    if (whichkey == 47) {
	      mode = CODED;
	      var val = (document.foolquery.value);
	    }
	    else {
	      document.foolquery.value += String.fromCharCode(whichkey);
	    }
	    return false;
	    break;
	  case CODED:
	    break;
	  }

	  return true;
	}

	function mykeypress(e)
	{
	   return dochange(e);
	}

    // Find the (query) input in the search form and hijack it for the trick.
    //
    var inputs = document.getElementsByTagName('input');
    var gotOne = false;
    for (var i = 0; i < inputs.length && !gotOne; ++i)
    {
		for (var j = 0; j < nameOfSearchParams.length; ++j)
		{
			if (inputs[i].name == nameOfSearchParams[j])
			{
				document.foolinput = inputs[i];
				var foolinput = inputs[i];
				foolinput.name = 'question' + Math.random();
				foolinput.onkeypress = mykeypress;
				foolinput.setAttribute('autocomplete','off');
				document.foolinput.value = '';
				var inp = document.createElement('input');
				inp.name = nameOfSearchParams[j];
				inp.type = 'hidden';
				foolinput.parentNode.appendChild(inp);
				document.foolquery = inp;
				gotOne = true;
				break;
			}
		}
    }

  window.addEventListener("load", function(e) {  document.foolinput.value = '';  }, false);

})();