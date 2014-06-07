// ==UserScript==
// @name           loop-over-sections-of-youtube-videos
// @namespace      yeungda
// @description    Adds looping over sections of a single YouTube video.  I use it when practising music or dancing to learn small sections at a time.  Originally based on another script, but probably only it's ideas remain: http://userscripts.org/scripts/show/28832
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
var looper = null
$(document).ready(function () {
    $('head').append('<style>' + stylesheet + '</style>')
    $('#watch-player-div').append(html)

    looper = new Looper(unsafeWindow.document.getElementById("movie_player"))

    $('#endLoopHereLabel').click(loopToHere)
    $('#startLoopHereLabel').click(loopFromNearestKeyframeToHere)
    $('#eOnOff').click(toggleOnOff)
});

function Looper(youtubePlayer) {
    this.from = 0
   	this.fromKeyFrame = 0
    this.to = null
    this.playerState = -1
    this.on = false
    this.youtubePlayer = youtubePlayer
    this.loopFromTimeIsAccurate = true
}
    
function playVideo() {
	if (looper.on && (looper.playerState == 0 || looper.playerState == 1)) {
        looper.youtubePlayer.seekTo(looper.from) 
        if (!looper.loopFromTimeIsAccurate) {
	        looper.youtubePlayer.pauseVideo()
        	window.setTimeout(function () {        	
		        setLoopFromKeyFrameHere()
		        looper.youtubePlayer.playVideo() 
        	}, 1000)
    	}
    	else {
    		looper.youtubePlayer.playVideo() 
    	}
    }
}

function loopFromNearestKeyframeToHere() {
    looper.loopFromTimeIsAccurate = false
    loopFromHere()
}

function calculateCurrentTimeToNearestSecond() {
	currentTime = looper.youtubePlayer.getCurrentTime()
    return currentTime - (currentTime % 1)
}

function setLoopFromKeyFrameHere () {
	looper.fromKeyFrame = calculateCurrentTimeToNearestSecond()
	looper.loopFromTimeIsAccurate = true
    updateStatus()
}
    
function loopFromHere() {
    looper.from = calculateCurrentTimeToNearestSecond()
    updateStatus()
}

function loopToHere() {
    looper.to = calculateCurrentTimeToNearestSecond() + 1
    updateStatus()
}
    
function updateStatus() {
	mostAccurateFromTime = (looper.loopFromTimeIsAccurate ? looper.fromKeyFrame : looper.from)
    status = ' from ' + (mostAccurateFromTime == 0 ? 'start ' : 
        				(looper.loopFromTimeIsAccurate ? '' : 'about ' ) + 
        		     	 mostAccurateFromTime + 's '
        		     	)
    status += 'to ' + (looper.to > 0 ? looper.to + 's ' : 'finish ')
    $('#eOnOff').html('Loop' + (looper.from + looper.to > 0 ? status : ''))
}
    
function toggleOnOff() {
    looper.on = !looper.on
    $("#eOnOff").attr('title', looper.on ? "Disable auto replay" : "Enable auto replay")
    $("#eOnOff").toggleClass("LoopyOn")
    monitor()
    updateStatus()
}
    
function monitor() {
    if (looper.on) {
        window.setTimeout(monitor, 1000)
    }
    looper.playerState = looper.youtubePlayer.getPlayerState()
    if (looper.on && looper.playerState == 1) {
        currentTime = looper.youtubePlayer.getCurrentTime()
        ytLoopFromTime = looper.fromKeyFrame - (looper.fromKeyFrame % 2)
        if (currentTime < ytLoopFromTime || (looper.to != null && currentTime > looper.to)) {
            playVideo()
        }
    }

    if (looper.on && looper.playerState == 0) {
        playVideo()
    }
}
    
var html = 
	'<div id="eLoopy">' +
    	'<label id="eOnOff" title="Enable auto replay" class="loopyLabel loopyToggle">Loop</label>' +   
    	'<label id="endLoopHereLabel" class="loopyLabel">End Loop Here</label>' +
    	'<label id="startLoopHereLabel" class="loopyLabel">Start Loop Here</label>' +
    '</div>'

var stylesheet = "                              \
.loopyLabel {					\
    float: right;				\
    background: #EFEFEF;			\
    border-left: #B1B1B1 1px solid;		\
    border-right: #B1B1B1 1px solid;            \
    border-bottom: #B1B1B1 1px solid;	        \
    padding: 1px 4px 1px 4px;		        \
    margin-bottom: 5px; 			\
    margin-left: 5px; 			        \
    font-weight: bold;			        \
    text-decoration: none;			\
    -moz-user-select: none;			\
    -khtml-user-select: none;		        \
    user-select: none;                          \
    color: grey !important; }                   \
.loopyToggle {                                  \
    float: left;				\
    margin-left: 0px; }                         \
.loopyLabel:hover {                             \
    color: black !important; }                  \
.LoopyOn {					\
    color: crimson !important; }                \
.LoopyOn:hover {                                \
color: crimson !important;}"

