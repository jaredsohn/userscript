// ==UserScript==
// @name           karaok lyric player for youtube
// @namespace      http://youtubelyric.com/
// @description    karaok lyric player for youtube . It automatically display a karaoke like lyrics you youtube music.
// @include         http://*.youtube.com/watch?v=*
// ==/UserScript==
function main () {
	var $;
// Add jQuery
    (function(){
        if (typeof window.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof window.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = window.jQuery.noConflict(true);
            letsJQuery();
        }
    }
// All your GM code must be inside this function
function letsJQuery() {
	//URLEncode
	$.extend({URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;while(x<c.length){var m=r.exec(c.substr(x));if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;}else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;}});
	//extract vid
	var vid=window.location.href.match(/v=(.*)/);
		if(vid[1].indexOf('&')!==-1){
			var vid=window.location.href.match(/v=(.*?)&/);
		}
		if($('img.music-note').size()>0){
			var meta=$('img.music-note:eq(0)').next().text().trim();
		}else{
			var meta='';
		}
	//src
	src = 'http://youtubelyric.com/lyric/youtube.php?vid='+vid[1]+'&meta='+$.URLEncode(meta);
	$('#watch-sidebar').prepend('<iframe id="karaobird" src="'+src+'#" width="300" height="450" style="margin-left:20px;margin-bottom:10px;"></iframe>');
	//receive message
		window.addEventListener("message", function(e){
			if(e.origin !== "http://youtubelyric.com"){return;}
			//reheight
			if(e.data.indexOf('reHeight:') == 0){
				$('#karaobird').css('height',e.data.substr(9)+'pt');
			}
			//changeurl
			if(e.data.indexOf('changeURL:') == 0){
				$('#karaobird').attr('src',e.data.substr(10));
			}
		}, true);
	//check if html5 player is enabled
	ishtml5player=($('.html5-player').size()>0)?1:0;
	//attach function on play and pause button
	$('.play-button').click(function(){
		 document.getElementById("karaobird").contentWindow.postMessage('playNpause','http://youtubelyric.com');
	});
	//$('#karaobird').load(function(){
	time=-1;
	laststate=1;
	countTime();
}
	//function to send time to iframe
	function countTime(){
			if(ishtml5player){
				// if html5 player is enabled, send the accurate timestamp to iframe
				var timeTag=$('.current-time:eq(0)').text().split(':');
				time=parseInt(timeTag[0],10)*60+parseInt(timeTag[1],10);
			}else{
				try {
					// if html5 player is not loaded, send the time of the flash player
					time=Math.round(document.getElementById("movie_player").getCurrentTime());
						//check if clicked play/pause
						if(laststate!=document.getElementById("movie_player").getPlayerState()){
								if(document.getElementById("movie_player").getPlayerState()==1){
									 document.getElementById("karaobird").contentWindow.postMessage('play','http://youtubelyric.com');
								}else{
									 document.getElementById("karaobird").contentWindow.postMessage('pause','http://youtubelyric.com');
								}
						}
					laststate=document.getElementById("movie_player").getPlayerState();
				}
				catch(err) {
				}
			}
		 document.getElementById("karaobird").contentWindow.postMessage(time,'http://youtubelyric.com');
			setTimeout(function(){
				countTime();
			},500);
	}
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
