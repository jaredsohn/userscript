// ==UserScript==
// @name           ttMOD
// @namespace      testbox
// @include        http://*tramtracker.com*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


// custom script to display the webpids.tramtracker 
// application's active window only


//$("body").css('font-size', '1.7em');


$("body").css('cursor', 'none');

$("#title,#subtitle,#trackerid,#stopid,.background").hide();

$("div#screencontainer,div#specialevent,div#error,div#disruption").css('top', '0px').css('left', '0px');

$("div").width('100%').height('100%');
$("#screenbackground,#screen,#specialeventbackground,#errorbackground,#disruptionbackground").width('100%').height('100%');



