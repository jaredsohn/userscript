// ==UserScript==
// @name           serienjunkies.org
// @namespace      segr.2010.serienjunkies
// @description    Click all RapidShare-Download buttons (I recommend quick download setting in RapidShare)
// @include        http://download.serienjunkies.org/*
// ==/UserScript==
//+ Vars
var c = 0; // Counter
var timeOut = 2500; // Timeout in ms
var buttons = document.getElementsByTagName("button"); // Buttons
//+ Main
for (var i = 0; i < buttons.length; i++) // Call the function for every button
{
  window.setTimeout(function() {
	if (buttons[c].innerHTML == "Download") // The RapidShare download buttons have the text "Download"
	{
	  buttons[c].parentNode.submit(); // Submit the form
	}
	c++; // Time for the next button
  }, (timeOut * i) + 1); // Every button is called after the same delay
}
