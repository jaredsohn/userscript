// ==UserScript==
// @name           Youtube Buffer Video
// @namespace      userscripts.org
// @description    Autoplay is disabled and it buffers the video .
// @version        0.3.2
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

var sGetter = document.createElement('script');
sGetter.type = "text/javascript";
sGetter.innerHTML = "function onYouTubePlayerReady(playerid){"+
						"if(playerid=='ytplayer'){"+
							"var movP = document.getElementById('movie_player');"+
							"movP.addEventListener('onStateChange', 'onytplayerStateChange');"+
							"movP.addEventListener('onPlaybackQualityChange','onPlayerFormatChanged');"+
						"}"+
					"};";
document.body.appendChild(sGetter);

var vidID = document.location.toString().split("v=")[1].split("#")[0].split("&")[0];
var pD = document.getElementById('watch-player-div');
var mP = document.getElementById('movie_player');
var fV = mP.getAttribute("flashvars");
if(fV.match('ad_module=http')){
	
	var toRemove = "ad_module="+fV.split('ad_module=')[1].split('.swf')[0]+".swf";
	fV=fV.replace(toRemove,'');
}

mP.setAttribute("flashvars",fV+"&playerapiid=ytplayer");
mP.src+="#";
mP.style.height='25px';


var cI ='startbuffer', sek2=0, uwmp;

var altPlayerIMG = document.createElement('img');
altPlayerIMG.setAttribute('id','myytplayerIMG');
altPlayerIMG.src='http://i2.ytimg.com/vi/'+vidID+'/default.jpg';
altPlayerIMG.setAttribute('style','width:640px;height:360px;');
pD.insertBefore( altPlayerIMG, mP );


function bufferAndImage(newState){

	if(newState==1){
		if(cI =='startbuffer'){
			uwmp = unsafeWindow.document.getElementById('movie_player');
			uwmp.seekTo(sek2);
			uwmp.pauseVideo();
			cI=null;
		}
		else{
			altPlayerIMG.display='none';//(altPlayerIMG);
			mP.style.height='385px';
			pD.removeEventListener("mouseover", pdmousOv, false);
			pD.removeEventListener("mouseout", pdmousOu, false);
		}
	
	}
}

unsafeWindow.onytplayerStateChange = function(newState){
	bufferAndImage(newState)
}
unsafeWindow.onPlayerFormatChanged = function(f){
	//f==1==regular quality
	//f==2==high quality
	//sek2=uwmp.getDuration(); if you don't want it to restart from start when change to hq
	pD.display='block';
	cI ='startbuffer';
	//generateVidImage();
}


pD.addEventListener('mouseover', pdmousOv = function(e){

	altPlayerIMG.style.display='none';
	mP.style.height='385px';

}, false);
pD.addEventListener('mouseout', pdmousOu = function(e){

	altPlayerIMG.style.display='block';
	mP.style.height='25px';

}, false);

