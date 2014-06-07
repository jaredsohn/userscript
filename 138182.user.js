// ==UserScript==
// @name            argh
// @namespace       http://userscripts.org/scripts/show/118446
// @icon            http://img66.xooimage.com/files/3/6/d/jaws64-2b5041c.png
// @description     descrizi
// @include         *://apps.facebook.com/dragonsofatlantis/*
// @include         *://*.castle.wonderhill.com/platforms/*/game
// @match           *://apps.facebook.com/dragonsofatlantis/*
// @match           *://*.castle.wonderhill.com/platforms/*/game
// @include         *://plus.google.com/games/659749063556*
// @include         *://plus.google.com/*/games/659749063556*
// @include         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match           *://plus.google.com/games/659749063556*
// @match           *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @include         *://www.kabam.com/dragons-of-atlantis/play
// @exclude         *://apps.facebook.com/dragonsofatlantis/rubies
// @exclude         *://apps.facebook.com/ai.php*
// @exclude         *://www.facebook.com/plugins/like.php*
// @exclude         *://kabam1-a.akamaihd.net/pixelkabam/*
// @exclude         *://*.akamaihd.net/pixelkabam/*
// @exclude         *://plus.google.com/_/apps-static/*
// @exclude         *://plus.google.com/u/0/_/gadgets/contactPicker*
// @exclude         *://accounts.google.com/*
// @exclude         *://talkgadget.google.com/*
// @exclude         *://www.googleapis.com/static*
// @version         2012.0623
// @changeLog		<ul><li>Changed API version</li><li>Added Dark Slayers</li></ul>
// ==/UserScript==


var errorMsg ='lol';
var kFatalSeedTitle	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var kFatalSeedMsg	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.';


dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
											<font color="#BF0000"><b> ' + errorMsg + '</b></font>\
											<br><br><div align=left>\
											' + kFatalSeedMsg + '<br><br></div>\
											<a href="#" target="_blank">Bugs and Known Issues</a><br>');