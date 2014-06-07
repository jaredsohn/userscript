// ==UserScript==
// @name           Video Site Color Toggle
// @description    Change the color scheme for video sites (Can toggle on/off with hotkey F2)
// @include        http://www.youtube.com/watch?*
// @include        http://*vimeo.com/*
// @include        http://www.snotr.com/video/*
// @include        http://www.nfl.com/videos/*
// @include        http://*espn.go.com/*video*
// @version        2012-04-19
// ==/UserScript==

/* 
   Note: This code is derived from the 'Tired Eyes' script by Ben Lee.
         Ben made a general-purpose script, but I modified it quite a 
         bit to tailor it for watching videos. For general-purpose color 
         toggling I recommend the 'Color Toggle' Firefox add-on. 
*/

// the new color scheme
var newBackgroundColor = '#000000';  // Background color
var newTextColor       = '#663366';  // Text color
var newLinkColor       = '#663366';  // Unvisited link color 
var newVisitedColor    = '#663366';  // Visited link color 
var newH1Size          = '100%';     // H1 size - specifically for YouTube video title, in case want to resize it

// javascript key code for the toggle hotkey. The default is the F2 key.
var hotkeyCode = 113;

// create new style sheet
var newStyle = document.createElement('style');
newStyle.id = 'vidToggleStyle';
newStyle.innerHTML = 'html,body,div,span,applet,embed,canvas,object,iframe,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,input,ins,kbd,q,samp,small,strike,strong,sub,sup,tt,var,b,u,i,s,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,button,table,caption,tbody,tfoot,thead,textarea,tr,th,td {background: ' + newBackgroundColor + ' !important; color: ' + newTextColor + ' !important} ';
newStyle.innerHTML += 'h1 {background: ' + newBackgroundColor + ' !important; color: ' + newTextColor + ' !important; font-size: ' + newH1Size + ' !important} ';
newStyle.innerHTML += ':link, :link * { color: ' + newLinkColor + ' !important}';
newStyle.innerHTML += ':visited, :visited * { color: ' + newVisitedColor + ' !important};';

// add it
document.getElementsByTagName("head")[0].appendChild(newStyle);

// enable toggle hotkey
window.addEventListener('keypress', toggleColors, true);

function toggleColors(e) {
	if ( e.keyCode == hotkeyCode ) {
      if ( null == document.getElementById("vidToggleStyle") ) {
			document.getElementsByTagName("head")[0].appendChild(newStyle);
		} else { 
			document.getElementsByTagName("head")[0].removeChild(newStyle);
		}
	}
}
