// ==UserScript==
// @name           The Daily Show and Colbert Report 4 aliens
// @namespace      armeagle.nl
// @description    Enables playback of The Daily Show and the Colbert Report outside of the USA
// @include        http://www.thedailyshow.com/*
// @include        http://www.colbertnation.com/*
// @author         ArmEagle
// ==/UserScript==

/*
 * This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License by Alex Haan (http://creativecommons.org/licenses/by-nc-sa/3.0/)
 */

setTimeout(function() {

var obj_player = document.getElementById('video_player');

obj_player.setAttribute('data', obj_player.getAttribute('data').replace('video:thedailyshow.com:','item:comedycentral.com:').replace('episode:thedailyshow.com:', 'item:comedycentral.com:').replace('episode:colbertnation.com:', 'item:comedycentral.com:'));

}, 100);