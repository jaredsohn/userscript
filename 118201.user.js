// ==UserScript==
// @name           Halo Waypoint New Hawtness
// @author         Der Flatulator6
// @version        1.7
// @namespace      http://halo.xbox.com/Forums/
// @description    Makes various arrangements to make stuff look purdy.
// @include        http://halo.xbox.com/Forums/*
// @include        https://halo.xbox.com/Forums/*
// ==/UserScript==

//SS
var x = document.styleSheets[2];
//Add new rules
//Links
x.insertRule('td.message div a { color: #B33604 !important; }',x.cssRules.length);

//Breakword
//alt
x.insertRule('.yafnet table.content { word-break: break-word !important; }',x.cssRules.length);

//GT
x.insertRule('#yafMenu table td:first-child { display:none; }',x.cssRules.length);

//Report & Edit
x.insertRule('td.message div.displayPostFooter a:link { color: #364859 !important; }',x.cssRules.length);

//Permissions
x.insertRule('div #DivPageAccess { display:none !important; }',x.cssRules.length);

//CAPS
x.insertRule('.yafnet input, .yafnet .select { text-transform:none !important; }',x.cssRules.length);

//QR
x.insertRule('.yafnet textarea.basicBBCodeEditor { -moz-border-radius: 5px; border-radius: 5px; background-color: #CBCDD4 !important; }',x.cssRules.length);

//Avatar
x.insertRule('img.avatarimage { height: 100px !important; width: 100px !important; }',x.cssRules.length);

//Announcement
x.insertRule('td.topicImage img[src="/Forums/Themes/WayPoint/topic_lock.png"] { 
width:0 !important; height:0 !important; padding: 32px 32px 0 0 !important; background:url("http://i.imgur.com/fCLnQ.png") !important; }',x.cssRules.length);


x.insertRule('#HaloLayout .content { background-color: transparent; }',x.cssRules.length);
// inb4derp
// <4 Der Flatulator6

