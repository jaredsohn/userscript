// Gametrailers.com age auto-verification
// Version 1.1
//
// 1.0 : 2007-09-10
//        + First release
// 1.1 : 2009-04-04
//        + GT updated their design, and age verification procedure
// 1.11: 2009-06-21
//        * Changed include page from player to video
// 
// Copyright (c) 2007-2009, Peter Reinhold
//
// ==UserScript==
// @name          GT Age Verifier
// @namespace     http://www.reinhold.dk/greasemonkey
// @description   Autosubmits agecheck on gametrailers.com
// @include       http://www.gametrailers.com/video/*
// ==/UserScript==

// Check if all the age-verification elements are present
if (document.getElementById('ageCheckMonth') && document.getElementById('ageCheckDay') && document.getElementById('ageCheckYear'))
{
	// Set a date where you are old enough to view the video
	document.getElementById('ageCheckMonth').selectedIndex = Math.ceil(12 * Math.random());
	document.getElementById('ageCheckDay').selectedIndex = Math.ceil(28 * Math.random());
	document.getElementById('ageCheckYear').selectedIndex = 18 + Math.ceil(20 * Math.random());

  // Find the Go button, loop all input elements
  var oButtons = document.getElementsByTagName('input');
  
  for (var i = 0; i < oButtons.length; i++)
  {
    // If it is a button, and the content is go, then click it :)
    if (oButtons[i].type.toLowerCase() == 'button' && oButtons[i].value.toLowerCase() == 'go')
    {
      // Click!
      oButtons[i].click();
    }
  }
}	
