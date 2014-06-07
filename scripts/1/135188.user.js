// ==UserScript==
// @name          Bento Top Gear Video resizer by http://userscripts.org/users/470477
// @namespace     http://www.topgear.com
// @description   Resizes videos on topgear.com/uk/videos/
// @include       http://www.topgear.com/uk/videos/*
// ==/UserScript==


// change video size:

//video org width =  512
//video org height = 288
//calculate new height: height_video = (288/512)*width_video

// full width of original pagesize:
//var width_video = 983;
//var height_video = 540;

// 1200px width:
var width_video = 1200;
var height_video = 675; 


// changes made below here is at own risk...

if(width_video>963) {
document.getElementById('wrap').style.width = width_video+'px';
document.getElementById('mainContent').style.width = width_video+'px';
document.getElementById('videos-head').style.width = width_video+'px';
}

document.getElementById('videos-head').style.height = (height_video+200)+'px';
document.getElementById('videos-head').style.background = 'url("") no-repeat scroll center top #0B0301';

document.getElementById('video-player').style.width = width_video+'px';
document.getElementById('video-player').style.height = height_video+'px';
document.getElementById('video-player').style.left = '0';
document.getElementById('video-player').style.top = '44px';

document.getElementById('myExperience').width = width_video;
document.getElementById('myExperience').height = height_video;

document.getElementById('video-description').style.top = (height_video+50)+'px';

document.getElementById('related-videos').style.top = (height_video+50)+'px';
