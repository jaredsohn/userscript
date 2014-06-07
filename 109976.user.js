// ESPN3 Full Screen
// version 1.0.0.0
// 2011-08-15
// Copyright (c) 2011, Amar Kota
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ESPN3 Full Screen", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           ESPN3 Full Screen
// @namespace      http://amarkota.com
// @author         Amar Kota
// @description    This script makes the streaming flash video on the ESPN3 / WatchESPN player web page full screen on page load
// @version        1.0.0.1
// @include        http://espn.go.com/watchespn/player/*
// ==/UserScript==
 
/*
 * Returns the requested querystring value from the address bar
 * @namespace amarkota.com
 * @method getParameterByName
 * @param {String} name querystring parameter name to get the value of
 * @return {String} querystring parameter value
 *
 * http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
 */
function getParameterByName(name) 
{ 
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); 
  var regexS = "[\\?&]" + name + "=([^&#]*)"; 
  var regex = new RegExp(regexS); 
  var results = regex.exec(window.location.href); 
  if(results == null) 
    return ""; 
  else 
    return decodeURIComponent(results[1].replace(/\+/g, " ")); 
}

/*
 * Declare and initialize variables
 */
var screenHeight = (screen.height - 20);						// height of the video to be resized to
var screenWidth = (screen.width - 20);							// width of the video to be resized to
var videoId = window.location.href.substr(41, 6);				// get the video id value from the url
var objFlash = document.getElementById('e3p-flash-container');	// get where the flash object content is located in the web page

// if the flash object exists in the page, attempt to replace the original flash object HTML with HTML with new screen resolution values
if (objFlash != null)
{
	objFlash.style.top = '0px';						// move video plater to very top of page
	objFlash.style.left = '0px';					// move video player to very left of page
	objFlash.style.width = screenWidth + 'px'; 		// set width of div container
	objFlash.style.height = screenHeight + 'px';	// set height of div container
	
	var flashHtml = '';				// construct new flash object HTML
	flashHtml += '<object width="100%" height="100%" align="middle" type="application/x-shockwave-flash" id="${application}" name="${application}" data="http://espn.go.com/espn3/player.swf">'
	flashHtml += '<param name="allowScriptAccess" value="always">'
	flashHtml += '<param name="allowFullScreen" value="true">'
	flashHtml += '<param name="flashvars" value="configUrl=http://espn.go.com/espn3/config&amp;playerSize=' + screenWidth + 'x' + screenHeight + '&amp;id=' + videoId + '">'	// specify new player size values and video to play
	flashHtml += '</object>';

	objFlash.innerHTML = flashHtml;					// set content of div to new HTML flash player code
}