// ==UserScript==
// @name           YouTube Alternative Player
// @namespace      YAP.BETA.you.dumbass
// @description    Selects always best video quality, fits video size to available space and offers zoom-option
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// ==/UserScript==

var cfg = new Array();
/*
 * CONFIG START
 */
cfg['resolution'] =      1280;  // screen-width (can be custom value)
cfg['autodetectratio'] = false; // autodetect video-ratio
cfg['ratio'] =           16/9;  // fixed player-ratio (if autodetectratio = false), shows black bars for other video-ratios

cfg['autoWidth'] =       false; // fit page-width to window-width
cfg['fitZoom'] =         true;  // fit unzoomed video to comment-width
cfg['wideZoom'] =        true;  // use full page-width in zoom-mode
cfg['startZoomed'] =     false; // start in zoom-mode
cfg['autostart'] =       false; // autostart video

cfg['url'] =               new Array();
cfg['url']['skin'] =       'http://myspecial.de/player/overlay.swf';
cfg['url']['player'] =     'http://myspecial.de/player/player-licensed.swf';
cfg['url']['spacer'] =     'http://s.ytimg.com/yt/img/pixel-vfl73.gif';
cfg['url']['imagesheet'] = 'http://s.ytimg.com/yt/img/master-vfl102488.png';
/*
 * CONFIG END
 */


/*
 * SCRIPT START
 */
if(cfg['autoWidth']){
	cfg['resolution'] = (document.body.offsetWidth > 0) ? document.body.offsetWidth : cfg['resolution'];
}
var fullWidth = cfg['resolution']-64;

var size = document.getElementById('player-open-popup').innerHTML.match(/(\d+), (\d+)\)/);
var ratio = size[1]/size[2];
if(cfg['autodetectratio'] || cfg['ratio'] == ratio){
	cfg['ratio'] = ratio;
	cfg['stretching'] = 'fill';
}else{
	cfg['stretching'] = 'uniform';
}

var playerFullWidth = fullWidth;
var playerFullHeight = playerFullWidth/cfg['ratio'];

var playerBigWidth = fullWidth-320;
var playerBigHeight = playerBigWidth/cfg['ratio'];

if(cfg['fitZoom']){
	var playerSmallWidth = playerBigWidth;
	var playerSmallHeight = playerBigHeight;
}else{
	var playerSmallWidth = cfg['resolution']/2;
	var playerSmallHeight = playerSmallWidth/cfg['ratio'];
}

if(cfg['wideZoom']){
	var playerZoomWidth = playerFullWidth;
	var playerZoomHeight = playerFullHeight;
}else{
	var playerZoomWidth = playerBigWidth;
	var playerZoomHeight = playerBigHeight;
}


var video_id = null;
var video_hash = null;
var video_quality = null;
var video_duration = null;

function setPlayer(quality){
	document.getElementById('watch-longform-buttons').innerHTML = '<div id="player-toggle-size" class="reverse-tooltip-wrapper"></div>'+document.getElementById('watch-longform-buttons').innerHTML;
		
	var zoomedOut = '<button id="toggle-size" style="cursor: pointer; float: left; width: 27px; height: 22px; outline: 0; background: url(\''+cfg['url']['imagesheet']+'\') 0px -614px;" class="zoomedOut" onmouseover="this.style.backgroundPosition = \'-27px -614px\'; toggleSimpleTooltip(this, true);" onmouseout="this.style.backgroundPosition = \'0px -614px\'; toggleSimpleTooltip(this, false);"></button><div class="reverse-tooltip-wrapper-box hid"><div class="reverse-tooltip-box" id="toggle-size-tooltip-text">Diesen Player vergr&ouml;&szlig;ern</div><img class="reverse-tooltip-box-bot" src="'+cfg['url']['spacer']+'"></div>';
	var zoomedIn = '<button id="toggle-size" style="cursor: pointer; float: left; width: 27px; height: 22px; outline: 0; background: url(\''+cfg['url']['imagesheet']+'\') 0px -636px;" class="zoomedOut" onmouseover="this.style.backgroundPosition = \'-27px -636px\'; toggleSimpleTooltip(this, true);" onmouseout="this.style.backgroundPosition = \'0px -636px\'; toggleSimpleTooltip(this, false);"></button><div class="reverse-tooltip-wrapper-box hid"><div class="reverse-tooltip-box" id="toggle-size-tooltip-text">Diesen Player verkleinern</div><img class="reverse-tooltip-box-bot" src="'+cfg['url']['spacer']+'"></div>';

	if(cfg['startZoomed']){
		document.getElementById('watch-this-vid').style.width = playerZoomWidth+'px';
		document.getElementById('watch-player-div').style.width = playerZoomWidth+'px';
		document.getElementById('player-toggle-size').innerHTML = zoomedIn;
	}else{
		document.getElementById('watch-this-vid').style.width = playerBigWidth+'px';
		document.getElementById('watch-player-div').style.width = playerBigWidth+'px';
		document.getElementById('player-toggle-size').innerHTML = zoomedOut;
	}

	if(cfg['startZoomed']){
		var width = playerZoomWidth;
		var height = playerZoomHeight;
	}else if(quality == 35 || quality == 34 || quality == 22){
		var width = playerBigWidth;
		var height = playerBigHeight;
	}else if(quality == 18){
		var width = playerSmallWidth;
		var height = playerSmallHeight;
	}else{
		var quality = 0;
		var width = playerSmallWidth;
		var height = playerSmallHeight;
	}
	if(quality > 0){
		var fmt = 'fmt='+parseFloat(quality)+'&';
	}else{
		var fmt = '';
	}
	
	document.getElementById('watch-player-div').innerHTML = '<embed id="movieplayer" src="'+cfg['url']['player']+'" width=\''+width+'\' height=\''+height+'\' bgcolor="#000000" allowscriptaccess="always" allowfullscreen="true" flashvars="file='+escape('http://www.youtube.com/v/'+video_id+'&ap=&fmt=22')+'&showsearch=0&rel=0&image='+escape('http://i2.ytimg.com/vi/'+video_id+'/hqdefault.jpg')+'&skin='+escape(cfg['url']['skin'])+'&stretching='+cfg['stretching']+'&controlbar=over&autostart='+cfg['autostart']+'&backcolor=000000&displayclick=play" quality="high" name="movieplayer" style="width: '+width+'px; height: '+height+'px;" />';

	document.getElementById('player-toggle-size').addEventListener('click', function (){
		if(parseFloat(document.getElementById('movieplayer').style.width) != playerZoomWidth){
			document.getElementById('watch-this-vid').style.width = playerZoomWidth+'px';
			document.getElementById('watch-player-div').style.width = playerZoomWidth+'px';
			
			document.getElementById('movieplayer').style.width = playerZoomWidth+'px';
			document.getElementById('movieplayer').style.height = playerZoomHeight+'px';
			
			document.getElementById('player-toggle-size').innerHTML = zoomedIn;
		}else{
			document.getElementById('watch-this-vid').style.width = playerBigWidth+'px';
			document.getElementById('watch-player-div').style.width = playerBigWidth+'px';

			document.getElementById('movieplayer').style.width = playerSmallWidth+'px';
			document.getElementById('movieplayer').style.height = playerSmallHeight+'px';
			
			document.getElementById('player-toggle-size').innerHTML = zoomedOut;
		}
	}, false);
}

(function (){
	var video_player = document.getElementById('movie_player');

	if(video_player){
		var flash_variables = video_player.attributes.getNamedItem('flashvars');
		if(flash_variables){
			var flash_values = flash_variables.value;
			if(flash_values){
				var video_id_match = flash_values.match(/[^a-z]video_id=([^(\&|$)]*)/);
				if(video_id_match != null){
					video_id = video_id_match[1];
				}
				var video_hash_match = flash_values.match(/[^a-z]t=([^(\&|$)]*)/);
				if(video_hash_match != null){
					video_hash = video_hash_match[1];
				}
				var video_quality_match = flash_values.match(/[^a-z]fmt_map=([^\/]*)\/*/);
				if(video_quality_match != null){
					video_quality = video_quality_match[1];
				}
				var video_duration_match = flash_values.match(/[^a-z]l=(\d*)/);
				if(video_duration_match != null){
					video_duration = video_duration_match[1];
				}
			}
		}
	}

	// die, pls
	if(video_id == null || video_hash == null || video_quality == null){
		return;
	}

	if(document.getElementById('watch-player-div')){
		setPlayer(video_quality);
		
		// mainpagestructure
		document.getElementById('baseDiv').style.width = fullWidth+'px';
		document.getElementById('masthead').style.width = fullWidth+'px';
		document.getElementById('footer').style.width = fullWidth+'px';

		// beautystuff
		document.getElementById('watch-this-vid').style.textAlign = 'center';
		document.getElementById('watch-this-vid').style.marginBottom = '10px';

		document.getElementById('watch-player-div').style.textAlign = 'center';

		document.getElementById('watch-this-vid-info').style.width = playerBigWidth+'px';

		var tabs = document.getElementsByClassName('watch-tabs');
		for(var i = 0; i < tabs.length; i++){
			tabs[i].style.width = (playerBigWidth-2)+'px';
		}
		
		// scroll to the right position
		window.scrollBy(0, -2000);
		window.scrollBy(0, 88);
	}
})();
/*
 * SCRIPT END
 */