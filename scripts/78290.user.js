// ==UserScript==
// @name EndlessYouTube v.Wister
// @namespace http://www.endlessyoutube.com/
// @include http://*.youtube.com/watch?v=*
// @include http://*.youtube.com/*
// ==/UserScript==
var styles = [
		'.eyt { text-align: center; }',
		'.eyt a { border-bottom: 1px dotted blue; }',
		'.eyt a { text-decoration: none; }',
		'.repeat_button { padding-top: 5px; }',
                '.eyt input { padding: 3px; text-align: center; border: 1px solid #CCCCCC; }'
	];
GM_addStyle(styles.join("\r\n"));

var div = document.createElement('div');

div.innerHTML = 

'<script>' +

	'var $ = function(id) { return document.getElementById(id); };\n' +
	'var ytplayer = $("movie_player");' +
	'var loop = false;' +
	
	'function repeat() {' +
	'this.start = parseInt($("start_m").value * 60) + parseInt($("start_s").value);' +
	'this.end = parseInt($("end_m").value * 60) + parseInt($("end_s").value);' +
	'$("repeat_stop").style.display = ""; $("repeat").style.display = "none";' +
	'this.seekTo = function() { if (ytplayer) { ytplayer.seekTo(this.start, true); this.timer(); } };' +
	'this.updateTime = function() { if (this.end < ytplayer.getCurrentTime()) { clearInterval(setinterval); this.seekTo(); } };' +
	'this.timer = function() { setinterval = setInterval("this.updateTime()", 100); };' +
	'this.seekTo();' +
	'};' +
	'function stopRepeat() { clearInterval(setinterval); $("repeat").style.display = ""; $("repeat_stop").style.display = "none"; };' +
	
	'function onYouTubePlayerReady(playerId) { ytplayer = $("movie_player"); ytplayer.addEventListener("onStateChange", "onytplayerStateChange"); };' +
	'function onytplayerStateChange(newState) { if (newState == 0 && loop == true) { ytplayer.seekTo(0, true); }; };' +
	
	'function loopVideo() { $("stop_loop").style.display = ""; $("loop").style.display = "none"; loop = true };' +
	'function stopLoop() { $("stop_loop").style.display = "none"; $("loop").style.display = ""; loop = false };' +

        'function loopWorkaround() {document.getElementById("start_m").value=0; document.getElementById("start_s").value=0; document.getElementById("end_m").value=parseInt(ytplayer.getDuration()/60); document.getElementById("end_s").value=parseInt(((ytplayer.getDuration()/60)-parseInt(ytplayer.getDuration()/60))*60); repeat(); };' +
	
'</script>' +

'<div class="eyt" style="background: #EEEEEE; border: 1px solid #CCCCCC; padding: 10px; margin-top: 10px;">' +

	'<input type="text" id="start_m" size="2" onchange="stopRepeat();"/> : <input type="text" id="start_s" size="2" onchange="stopRepeat();"/> - <input type="text" id="end_m" size="2" onchange="stopRepeat();"/> : <input type="text" id="end_s" size="2" onchange="stopRepeat();"/>' +
	
	'&nbsp;&nbsp;' +
	
	'<span class="repeat_button">' +
		'<span id="repeat"><a href="javascript:void(0);" onclick="repeat();">Repeat Selected Time</a></span>' +
		'<a id="repeat_stop" href="javascript:void(0);" onclick="stopRepeat();" style="display: none;">Stop Repeat</a>' +
	'</span>' +
	
	'&nbsp;&nbsp;' +
	
	'<span id="loop"><a onclick="loopWorkaround();" href="javascript:void(0);">Loop Video</a></span>' +
	'<a id="stop_loop" onclick="stopLoop();" href="javascript:void(0);" style="display: none;">Stop Loop</a>' +
	

'</div>';
if (document.getElementById('playnav-curvideo-controls')){document.getElementById('playnav-curvideo-controls').appendChild(div);}
else if (document.getElementById('watch-info')){document.getElementById('watch-info').appendChild(div);}
