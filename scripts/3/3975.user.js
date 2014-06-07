// ==UserScript==
// @name           YouTube Resizer
// @namespace      http://www.arantius.com/misc/greasemonkey/
// @description    Move the YouTube player to a spot where it has more room, and make it bigger.
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==

var vidHolder=null;
vidHolder=document.getElementById('flashcontent');
if (!vidHolder) vidHolder=document.getElementById('playerDiv');
if (!vidHolder) return;

var vid=null;
try {
	vid=vidHolder.getElementsByTagName('embed')[0];
} catch (e) { }
if (!vid) return;

var vidOrigTable=vidHolder;
while (vidOrigTable && 'TABLE'!=vidOrigTable.tagName) {
	vidOrigTable=vidOrigTable.parentNode;
}
if (!vidOrigTable) return;

// make sure it's centered
vidHolder.style.textAlign='center';

// munge the src
var vidSrc=vid.src;
if (!vidSrc.match('fs=')) vidSrc+='&fs=1';
if (!vidSrc.match('player2')) vidSrc=vidSrc.replace('player', 'player2');
if (!vidSrc.match('watch2')) vidSrc+='&watch2=1';
vid.src=vidSrc;

// move it
vidHolder.parentNode.removeChild(vidHolder);
vidOrigTable.parentNode.insertBefore(vidHolder, vidOrigTable);

// resize it
var vidW=parseInt(vid.width);
var vidH=parseInt(vid.height);
var sizeRatio=vidHolder.offsetWidth/vidW;
vidW=parseInt(vidW*sizeRatio);
vidH=parseInt(vidH*sizeRatio)-32;
if (vidH>window.innerHeight) {
	sizeRatio=(window.innerHeight)/vidH;
	vidW=parseInt(vidW*sizeRatio);
	vidH=parseInt(vidH*sizeRatio);
}
vid.width=String(vidW);
vid.height=String(vidH);

if (vidH<window.innerHeight) {
	vidHolder.style.marginBottom=parseInt(window.innerHeight-vidH)+'px';
}

// put player in view
scrollTo(0, vidHolder.offsetTop+5);