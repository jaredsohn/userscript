// ==UserScript==
// @name           YouTube Streaming Player
// @namespace      iambappa
// @include        http://www.youtube.com/verify_age*
// @include        https://www.youtube.com/verify_age*
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @version        1.1.5.2
// ==/UserScript==

var strVersion="1.1.5.2";

// Changes from 1.1.5 to 1.1.5.1 :
// 1. Unable to add vlc player settings in sidebar fixed for verify_age urls.

// Changes from 1.1.5.1 to 1.1.5.2
// 2. NaN volume and seek fix
// 3. createVLCPlayer link fix

var imgBg="";
var imgPlay="";
var imgPause="";
var imgStop="";
var imgVertBar="";
var imgHorBar="";
var imgFullScreen="";
var imgWide="";
var imgVolume="";

var hideControlsTimeout=null;
var showPluginCrashFixTimeout=null;

// DOM Functions

function $(id){
	return document.getElementById(id);
}

function $$(tag){
	return document.getElementsByTagName(tag);
}

function init(){
	if(!document.body.innerHTML)
		return;
	if(location.pathname=="/verify_age"){
		var divContent=$("content");
		var divVerify=$("verify");
		var divFake=document.createElement("div");
		divFake.innerHTML=""+
			"<div id=watch-container>"+
				"<div id=watch-video-container>"+
					"<div id=watch-video>"+
						"<div id=watch-player class=flash-player>"+
						"</div>"+
					"</div>"+
				"</div>"+
				"<div id=watch-main-container>"+
					"<div id=watch-main>"+
						"<div id=watch-panel>"+
							"<div id=watch-actions>"+
							"</div>"+
						"</div>"+
						"<div id=watch-sidebar>"+
						"</div>"+
				"</div>"+
			"</div>"+
		"";
		divContent.insertBefore(divFake,divVerify);
	}
	var divWatchPanel=$("watch-panel");
	var divWatchActions=$("watch-actions");
	if(!divWatchPanel){ // cosmic panda
		divWatchPanel=$("watch-frame-bottom");
		divWatchActions=$("watch-content");
	}
	if(!divWatchPanel)
		return;
	
	var divVLCStatus=document.createElement("div");
	divVLCStatus.className="stream-link";
	divVLCStatus.id="vlc-status";
	divVLCStatus.style.display="none";
	divVLCStatus.innerHTML="";
	divWatchPanel.insertBefore(divVLCStatus,divWatchActions);
	
	function createStreamLinks(strHTML, func, divWatchPanel){
		var divStream=document.createElement("div");
		divStream.className="stream-link";
		divWatchPanel.insertBefore(divStream,divWatchActions);
	
		var aStream=document.createElement("a");
		aStream.href="javascript:void(0);"
		aStream.addEventListener("click",func,false);
		aStream.innerHTML=strHTML;
		divStream.appendChild(aStream);
	}
	
	createStreamLinks("Stream : 176x144 : 3GP : Lowest Quality", function (){
		stream(false);
	}, divWatchPanel);
	
	createStreamLinks("Stream : 320x240 : 3GP : Low Quality", function (){
		stream(true);
	}, divWatchPanel);
	
	
	var divEmptyVLC=document.createElement("div");
	divEmptyVLC.className="stream-link";
	divEmptyVLC.id="create-empty-vlc-player-link"
	divWatchPanel.insertBefore(divEmptyVLC,divWatchActions);
	
	var aCreateEmptyVLC=document.createElement("a");
	aCreateEmptyVLC.href="javascript:void(0);"
	aCreateEmptyVLC.addEventListener("click",function (){
		createVLCPlayer();
	},false)
	aCreateEmptyVLC.innerHTML="Create Empty VLC Player";
	divEmptyVLC.appendChild(aCreateEmptyVLC);
	
	var divStatus=document.createElement("div");
	divStatus.className="stream-link";
	divStatus.id="streaming-status";
	divStatus.style.display="none";
	divWatchPanel.insertBefore(divStatus,divWatchActions);
	
	var divVLCMenuLauncher=document.createElement("div");
	divVLCMenuLauncher.className="stream-link";
	divVLCMenuLauncher.id="vlc-menu-launcher";
	divVLCMenuLauncher.style.display="none";
	divWatchPanel.insertBefore(divVLCMenuLauncher,divWatchActions);
	
	var aOpenVLCMenu=document.createElement("a");
	aOpenVLCMenu.href="javascript:void(0);"
	aOpenVLCMenu.addEventListener("click",showVLCMenu,false);
	aOpenVLCMenu.innerHTML="VLC Player Settings";
	divVLCMenuLauncher.appendChild(aOpenVLCMenu);
	
	var divCrashLinkContainer=document.createElement("div");
	divCrashLinkContainer.className="stream-link";
	divCrashLinkContainer.id="plugin-crash-solve-link";
	divCrashLinkContainer.style.display="none";
	divWatchPanel.insertBefore(divCrashLinkContainer,divWatchActions);
	
	var aResolveCrash=document.createElement("a");
	aResolveCrash.href="javascript:void(0);"
	aResolveCrash.addEventListener("click",solvePluginCrash,false);
	aResolveCrash.innerHTML="VLC Plugin Crashed? Click here to Fix it";
	divCrashLinkContainer.appendChild(aResolveCrash);
	
	var liVideoListItems=document.getElementsByClassName("video-list-item");
	for(var i=0;i<liVideoListItems.length;i++){
		var aLinks=liVideoListItems[i].getElementsByTagName("a");
		if(aLinks.length>0 && getVidId(aLinks[0].href)!=""){
			var spanLinks=document.createElement("span");
			spanLinks.className="video-streaming-links";
			liVideoListItems[i].appendChild(spanLinks);
			
			spanLinks.appendChild(document.createTextNode("Stream: "));
			
			var aLow=document.createElement("a");
			aLow.href="javascript:void(0);"
			aLow.setAttribute("url",aLinks[0].href);
			aLow.addEventListener("click",function (){
				stream(false,this.getAttribute("url"));
			},false)
			aLow.innerHTML="176x144";
			spanLinks.appendChild(aLow);
			
			spanLinks.appendChild(document.createTextNode(" | "));
			
			var aHigh=document.createElement("a");
			aHigh.href="javascript:void(0);"
			aHigh.setAttribute("url",aLinks[0].href);
			aHigh.addEventListener("click",function (){
				stream(true,this.getAttribute("url"));
			},false)
			aHigh.innerHTML="320x240";
			spanLinks.appendChild(aHigh);
		}
	}
};

function setStreamingStatus(strMsg){
	var divStatus=$("streaming-status");
	if(!divStatus){
		return;
	}
	if(strMsg.length!=0){
		divStatus.style.display="block";
		divStatus.innerHTML=strMsg;
	} else {
		divStatus.innerHTML="";
		divStatus.style.display="none";
	}
};

function stream(blHQ, strUrl){
	var divStatus=$("streaming-status");
	if(!divStatus || divStatus.style.display=="none"){
		if(strUrl)
			setStreamingQuality(blHQ, strUrl);
		else
			setStreamingQuality(blHQ);
	}else
		alert("Cannot start new process. Wait till another process gets finished.");
}

function setStreamingQuality(blHQ, strUrl){
	setStreamingStatus("Loading...");
	if(!strUrl)
		strUrl=location.href;
	GM_xmlhttpRequest({
		method : "GET",
		url: "http://gdata.youtube.com/feeds/api/videos/"+getVidId(strUrl)+"?format=1",
		onload: function (res){
			processResponse(res.responseText, blHQ);
		},
		onerror: function (res){
			setStreamingStatus("");
			alert("Error loading. Try again.");
		}
	});
};

unsafeWindow.toggleWide=function (){
	var divContent=$("content");
	var divWatchVideo=$("watch-video");
	var divWatchPlayer=$("watch-player-clone");
	var vlcObject=$("streaming-player");
	var divStreamingControls=$("streaming-controls");
	var divSeekDisplay=$("seek-display");
	if(divContent.className.indexOf("watch-wide")!=-1){
		divContent.className=divContent.className.replace("watch-wide","");
		divWatchVideo.className=divWatchVideo.className.replace("wide","");
	} else {
		divContent.className+="watch-wide";
		divWatchVideo.className+="wide";
	}
	vlcObject.width=vlcObject.parentNode.clientWidth;
	if(divStreamingControls.style.display=="block"){
		vlcObject.height=vlcObject.parentNode.clientHeight-divStreamingControls.clientHeight-divSeekDisplay.clientHeight;
	} else {
		vlcObject.height=vlcObject.parentNode.clientHeight-divSeekDisplay.clientHeight;
	}
}

function showVLCMenu(){
	var divVLCMenu=$("vlc-menu-settings");
	if(divVLCMenu){
		divVLCMenu.style.display=(divVLCMenu.style.display=="none")?"block":"none";
		return;
	}
	
	var divWatchSidebar=$("watch-sidebar");
	if(!divWatchSidebar){
		alert("Unable to get sidebar.");
		return;
	}
	
	var divVLCMenuModule=document.createElement("div");
	divVLCMenuModule.className="watch-module";
	divVLCMenuModule.id="vlc-menu-settings";
	if(divWatchSidebar.firstChild)
		divWatchSidebar.insertBefore(divVLCMenuModule,divWatchSidebar.firstChild);
	else
		divWatchSidebar.appendChild(divVLCMenuModule);
	
	var divVLCMenuModuleBody=document.createElement("div");
	divVLCMenuModuleBody.className="watch-module-body";
	divVLCMenuModule.appendChild(divVLCMenuModuleBody);
	
	var h4First=document.createElement("h4");
	h4First.className="first";
	h4First.innerHTML="VLC Player Settings"
	divVLCMenuModuleBody.appendChild(h4First);
	
	divVLCMenu=document.createElement("div");
	divVLCMenu.style.height="363px";
	divVLCMenu.style.overflow="auto";
	divVLCMenu.innerHTML=""+
			"<div>Play local file or remote url:</div>"+
			"<div><input type=text class=vlc-menu-setting id=local-file-remote-url><button id=play-local-file-remote-url type=button class=\"yt-uix-button\" onclick=\"; return false;\"/>Play</button></div>"+
			"<br>"+
			"<div>Audio Channel:</div>"+
			"<div><select class=vlc-menu-setting onchange=\"document.getElementById('streaming-player').audio.channel=parseInt(this.value);\"><option value=1>Stereo</option><option value=2>Reverse Stereo</option><option value=3>Left</option><option value=4>Right</option><option value=5>Dolby</option></select></div>"+
			"<br>"+
			"<div>Video Aspect Ratio:</div>"+
			"<div><select class=vlc-menu-setting onchange=\"document.getElementById('streaming-player').video.aspectRatio=this.value;\"><option value=1:1>1:1</option><option value=4:3>4:3</option><option value=16:9>16:9</option><option value=16:10>16:10</option><option value=221:100>2.21:1</option><option value=5:4>5:4</option></select></div>"+
		"";
	divVLCMenuModuleBody.appendChild(divVLCMenu);
	
	var btnPlayFile=document.getElementById("play-local-file-remote-url");
	btnPlayFile.addEventListener("click", function (){
			var iFile=document.getElementById("local-file-remote-url");
			createVLCPlayer(iFile.value);
		},false);
};

function processResponse(strRes, blHQ){
	var rtspLink="";
	var xmlResponse=document.createElement("div");;
	try{
		xmlResponse.innerHTML=strRes;
	}catch(e){
		alert("Unable to parse response. Try again.");
		return;
	}
	if(xmlResponse.innerHTML){
		var mcLinks=xmlResponse.getElementsByTagName("media:content");
		var blHasRtspLinks=false;
		if(mcLinks.length==0){
			setStreamingStatus("");
			alert("Video not available.");
			return;
		}
		for(var i=0;i<mcLinks.length;i++){
			if(mcLinks[i].getAttribute("url") && mcLinks[i].getAttribute("url").indexOf("rtsp://")==0){
				blHasRtspLinks=true;
			}
			if(mcLinks[i].getAttribute("yt:format")=="1" && mcLinks[i].getAttribute("url") && !blHQ){
				createVLCPlayer(mcLinks[i].getAttribute("url"));
				return;
			}
			if(mcLinks[i].getAttribute("yt:format")=="6" && mcLinks[i].getAttribute("url") && blHQ){
				createVLCPlayer(mcLinks[i].getAttribute("url"));
				return;
			}
		}
		if(blHasRtspLinks && confirm("Unable to find streaming link in Low"+(blHQ?"":"est")+" quality. Press OK to create stream of available quality.")){
			for(var i=0;i<mcLinks.length;i++){
				if(mcLinks[i].getAttribute("url") && mcLinks[i].getAttribute("url").indexOf("rtsp://")==0){
					createVLCPlayer(mcLinks[i].getAttribute("url"));
					return;
				}
			}
		}
		setStreamingStatus("");
		alert("No streaming links found for this video.");
		return;
	}
}

function createVLCPlayer(strURL){
	var divWatchPlayer=$("watch-player-clone");
	var divCreateEmptyVLCPlayerLink=$("create-empty-vlc-player-link");
	if(divCreateEmptyVLCPlayerLink.style.display!="none")
		divCreateEmptyVLCPlayerLink.style.display="none";
	try{
		var divStopVid=document.createElement("div");
		divStopVid.innerHTML="<a onclick=\"\
				var mPlayer=document.getElementById('movie_player');\
				if(mPlayer && mPlayer.stopVideo){\
					mPlayer.stopVideo();\
				}\
			\"></a>";
		divStopVid.firstChild.click();
	}catch(e){}
	
	if(!divWatchPlayer){
		playerDoesNotExist=true;
		var divWatchPlayerOrig=$("watch-player");
		divWatchPlayer=document.createElement("div");
		divWatchPlayer.id="watch-player-clone";
		divWatchPlayer.addEventListener("mouseover",unsafeWindow.showControls,false); 
		divWatchPlayer.addEventListener("mouseout",hideControls,true); 
		divWatchPlayerOrig.parentNode.appendChild(divWatchPlayer);
		divWatchPlayerOrig.style.display="none";
	}
	
	setStreamingStatus("Creating VLC Plugin Object...");
	divWatchPlayer.innerHTML="";
	
	var eStreamingPlayer=$("streaming-player");
	
	var playerDoesNotExist=false;
	if(!eStreamingPlayer){
		playerDoesNotExist=true;
		eStreamingPlayer=document.createElement("embed");
		eStreamingPlayer.id="streaming-player";
		eStreamingPlayer.setAttribute("type","application/x-vlc-plugin");
		eStreamingPlayer.setAttribute("autoplay","yes");
		eStreamingPlayer.setAttribute("onmouseover","window.showControls");
	}
	
	if(strURL)
		eStreamingPlayer.setAttribute("target",strURL);
	
	if(playerDoesNotExist){
		eStreamingPlayer.width=divWatchPlayer.clientWidth;
		eStreamingPlayer.height=divWatchPlayer.clientHeight;
		divWatchPlayer.appendChild(eStreamingPlayer);
		
		var divListener=document.createElement("div");
		divListener.innerHTML="<a onclick=\"\
			setInterval(function (){\
				var vlcObject=document.getElementById('streaming-player');\
				if(vlcObject && vlcObject.audio){\
					window.playerEvent(vlcObject.audio.volume, vlcObject.input.length, vlcObject.input.time, vlcObject.input.state);\
				}\
			},250);void(0);\"></a>";
		divListener.firstChild.click();
		
		var divSeekDisplay=document.createElement("div");
		divSeekDisplay.id="seek-display";
		divSeekDisplay.innerHTML="<font size=1>&nbsp;</font>"+
			"<a class=stream-control href=\"javascript:void(0);\" onmousemove=\""+
								"var intOffsetLeft=document.getElementById('watch-video').offsetLeft;"+
								"var intTotalWidth=this.parentNode.clientWidth;"+
								"window.showSeekTime((event.clientX-intOffsetLeft)/intTotalWidth, event.clientX-intOffsetLeft,intTotalWidth);"+
							"\" onmousedown=\""+
								"var intOffsetLeft=document.getElementById('watch-video').offsetLeft;"+
								"var intTotalWidth=this.parentNode.clientWidth;"+
								"document.getElementById('streaming-player').input.position=(event.clientX-intOffsetLeft)/intTotalWidth"+
							"\">"+
				"<div id=seek-tooltip>"+
				"</div>"+
				"<table width=100% cellpadding=0 cellspacing=0 id=seek-table>"+
					"<tr>"+
						"<td width=0% id=seek-control-bar-played>"+
						"</td>"+
						"<td width=100% id=seek-control-bar-remaining>"+
						"</td>"+
					"</tr>"+
				"</table>"+
			"</a>"+
			
		"";
		divWatchPlayer.appendChild(divSeekDisplay);
		
		var divStreamingControls=document.createElement("div");
		divStreamingControls.id="streaming-controls";
		divStreamingControls.innerHTML=""+
			"<table width=100% height=100% cellpadding=0 cellspacing=0 id=streaming-controls-table>"+
				"<tr>"+
					"<td class=stream-control-container id=first-streaming-control>"+
						"<a class=stream-control title=Replay href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').playlist.play();\">"+
							"<img class=stream-control id=streaming-control-play src=\""+imgPlay+"\">"+
						"</a>"+
					"</td>"+
					"<td class=stream-control-container>"+
						"<a class=stream-control title=\"Play/Pause\" href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').playlist.togglePause();\">"+
							"<img class=stream-control id=streaming-control-pause src=\""+imgPause+"\">"+
						"</a>"+
					"</td>"+
					"<td class=stream-control-container>"+
						"<a class=stream-control title=Stop href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').playlist.stop();\">"+
							"<img class=stream-control id=streaming-control-stop src=\""+imgStop+"\">"+
						"</a>"+
					"</td>"+
					"<td class=stream-control-container>"+
						"<a class=stream-control title=\"Toggle Mute\" href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').audio.toggleMute();\">"+
							"<img class=stream-control id=streaming-control-volume src=\""+imgVolume+"\">"+
						"</a>"+
					"</td>"+
					"<td class=stream-control-container style=\"min-width:110px;max-width:110px;text-align:left\">"+
						"<a class=stream-control title=Volume href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').audio.volume=(event.clientX-document.getElementById('watch-video').offsetLeft-document.getElementById('first-streaming-control').clientWidth*4)*2;\">"+
							"<img class=stream-control id=\"volume-control-bar\" src=\""+imgHorBar+"\">"+
							"<img class=stream-control id=\"volume-control\" style=\"border:0px;position:absolute;left:-300px;top:5px\" src=\""+imgVertBar+"\">"+
						"</a>"+
					"</td>"+
					"<td width=1 id=seek-current-duration valign=center>"+
						"00:00"+
					"</td>"+
					"<td width=100%>"+
					"</td>"+
					"<td class=stream-control-container>"+
						"<a class=stream-control title=\"Toggle Wide Mode\" href=\"javascript:void(0);\" onmouseup=\"window.toggleWide()\">"+
							"<img class=stream-control id=streaming-control-wide src=\""+imgWide+"\">"+
						"</a>"+
					"</td>"+
					"<td class=stream-control-container>"+
						"<a class=stream-control title=\"Switch to Full Screen\" href=\"javascript:void(0);\" onmousedown=\"document.getElementById('streaming-player').video.toggleFullscreen();\">"+
							"<img class=stream-control id=streaming-control-fullscreen src=\""+imgFullScreen+"\">"+
						"</a>"+
					"</td>"+
				"</tr>"+
			"</table>"+
		"";
		divWatchPlayer.appendChild(divStreamingControls);
		
		if(showPluginCrashFixTimeout)
			clearTimeout(showPluginCrashFixTimeout);
		showPluginCrashFixTimeout=setTimeout(showPluginCrashFixLink,300);
		
		eStreamingPlayer.height=divWatchPlayer.clientHeight-divSeekDisplay.clientHeight;

	}
	
	
	setStreamingStatus("");
};

function hidePluginCrashFixLink(){
	var divPluginCrashSolveLink=$("plugin-crash-solve-link");
	var divVLCMenuLauncher=$("vlc-menu-launcher");
	if(divPluginCrashSolveLink.style.display!="none")
		divPluginCrashSolveLink.style.display="none";
	if(divVLCMenuLauncher.style.display!="block")
		divVLCMenuLauncher.style.display="block";
}

function showPluginCrashFixLink(){
	var divPluginCrashSolveLink=$("plugin-crash-solve-link");
	var divVLCMenuLauncher=$("vlc-menu-launcher");
	if(divPluginCrashSolveLink.style.display!="block")
		divPluginCrashSolveLink.style.display="block";
	if(divVLCMenuLauncher.style.display!="none")
		divVLCMenuLauncher.style.display="none";
}

unsafeWindow.showSeekTime=function(fltSeekTo, fltLeft, intTooltipParentWidth){
	var divSeekCurrentDuration=$("seek-current-duration");
	var divSeekTooltip=$("seek-tooltip");
	if(divSeekCurrentDuration.getAttribute("TotalLength")){
		var lngTotalLength=divSeekCurrentDuration.getAttribute("TotalLength");
		if(lngTotalLength!=-1){
			lngSeekTime=parseInt(fltSeekTo*lngTotalLength);
			divSeekTooltip.innerHTML=getUTCTimeString(new Date(lngSeekTime))
		} else {
			divSeekTooltip.innerHTML="Seek";
		}
	} else 
		divSeekTooltip.innerHTML="Seek";
	if((fltLeft-divSeekTooltip.clientWidth/2)<0)
		divSeekTooltip.style.left="0px";
	else if((fltLeft-divSeekTooltip.clientWidth/2)+divSeekTooltip.clientWidth>intTooltipParentWidth)
		divSeekTooltip.style.left=(intTooltipParentWidth-divSeekTooltip.clientWidth)+"px";
	else
		divSeekTooltip.style.left=(fltLeft-divSeekTooltip.clientWidth/2)+"px";
};

unsafeWindow.playerEvent=function (intVolume, lngTotalLength, lngCurrentTime, intState){
	var divVolumeControl=$("volume-control");
	var divSeekCurrentDuration=$("seek-current-duration");
	var divSeekControlBarPlayed=$("seek-control-bar-played");
	var divSeekControlBarRemaining=$("seek-control-bar-remaining");
	var divStreamingControls=$("streaming-controls");
	var targetValue=null;
	
	hidePluginCrashFixLink();
	if(showPluginCrashFixTimeout){
		clearTimeout(showPluginCrashFixTimeout);
	}
	showPluginCrashFixTimeout=setTimeout(showPluginCrashFixLink,300);
	
	if(typeof intVolume!="undefined" && divStreamingControls.style.display=="block" && divVolumeControl){
		targetValue=$('first-streaming-control').clientWidth*4+intVolume/2-divVolumeControl.clientWidth/2+"px";
		if(divVolumeControl.style.left!=targetValue){
			divVolumeControl.style.left=targetValue;
		}
	}
	if(typeof lngTotalLength!="undefined" && divSeekCurrentDuration){
		if(!divSeekCurrentDuration.getAttribute("TotalLength") || divSeekCurrentDuration.getAttribute("TotalLength")!=lngTotalLength)
			divSeekCurrentDuration.setAttribute("TotalLength",lngTotalLength);
		if(lngTotalLength!=-1 && lngCurrentTime!=-1){
			var dTotalLength=new Date(lngTotalLength);
			var dCurrentTime=new Date(lngCurrentTime);
			targetValue="<font color=\"white\">"+getUTCTimeString(dCurrentTime)+"</font>&nbsp;/&nbsp;"+getUTCTimeString(dTotalLength); // do not edit this line - iampradip
		} else {
			targetValue="00:00";
		}
		if(divSeekCurrentDuration.innerHTML!=targetValue){
			divSeekCurrentDuration.innerHTML=targetValue;
			var percentSeek=lngCurrentTime*100/lngTotalLength;
			divSeekControlBarPlayed.style.width=percentSeek+"%";
			divSeekControlBarRemaining.style.width=(100-percentSeek)+"%";
		}
	}
	
	var divVLCStatus=$("vlc-status");
	if(divVLCStatus.style.display=="none")
		divVLCStatus.style.display="block";
	switch(intState){
		case 0:
			targetValue="Idle";
			break;
		case 1:
			targetValue="Opening...";
			break;
		case 2:
			targetValue="Buffering...";
			break;
		case 3:
			targetValue="Playing...";
			break;
		case 4:
			targetValue="Paused";
			break;
		case 5:
			targetValue="Stopped";
			break;
		case 6:
			targetValue="Media Stopped";
			break;
		default:
			targetValue="Media unavailable";
			break;
	}
	if(divVLCStatus.innerHTML!=targetValue){
		divVLCStatus.innerHTML=targetValue;
	}
}

function getUTCTimeString(d){
	var intHours=d.getUTCHours();
	var intMinutes=d.getUTCMinutes();
	var intSeconds=d.getUTCSeconds();
	if(intHours!=0)
		return intHours+":"+y2k(intMinutes)+":"+y2k(intSeconds);
	else
		return intMinutes+":"+y2k(intSeconds);
}

function y2k(x){
	if(String(x).length==1)
		return "0"+String(x);
	else
		return x;
}

unsafeWindow.showControls=function (){
	if(hideControlsTimeout)
		clearTimeout(hideControlsTimeout);
	var vlcObject=$("streaming-player");
	var divStreamingControls=$("streaming-controls");
	var divSeekDisplay=$("seek-display");
	if(divStreamingControls.style.display!="block"){
		divStreamingControls.style.display="block";
		divSeekDisplay.className="control";
		vlcObject.height=vlcObject.parentNode.clientHeight-divStreamingControls.clientHeight-divSeekDisplay.clientHeight;
	}
}

function hideControls(){
	if(hideControlsTimeout)
		clearTimeout(hideControlsTimeout);
	hideControlsTimeout=setTimeout(function(){
		var vlcObject=$("streaming-player");
		var divStreamingControls=$("streaming-controls");
		var divSeekDisplay=$("seek-display");
		if(divStreamingControls.style.display=="block"){
			divStreamingControls.style.display="none";
			divSeekDisplay.className="";
			vlcObject.height=vlcObject.parentNode.clientHeight-divSeekDisplay.clientHeight;
		}
	},1000);
}

function solvePluginCrash(){
	var pluginContainer=$("watch-player-clone");
	if(pluginContainer){
		var strSCHTML=pluginContainer.innerHTML;
		pluginContainer.innerHTML="";
		pluginContainer.innerHTML=strSCHTML;
	}
}

function addCSS(css){
	var heads = $$("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

function getVidId(strUrl){
	if(strUrl.indexOf("?")==-1)
		return "";
	var strSearch=strUrl.substring(strUrl.indexOf("?"));
	if(strUrl.indexOf("/verify_age")!=-1){
		strSearch=unescape(strSearch.substring(1));
	}
	if(strSearch.indexOf("v=")==-1)
		return "";
	var strVidId=strSearch.substring(strSearch.indexOf("v=")+2);
	if(strVidId.indexOf("&")!=-1)
		strVidId=strVidId.substring(0,strVidId.indexOf("&"));
	if(strVidId.indexOf("#")!=-1)
		strVidId=strVidId.substring(0,strVidId.indexOf("#"));
	return strVidId;
}

var Updater={ // This updater works on @version, not on @uso:version
	isGreasemonkey: function (){
		try{
			if(GM_getValue("test","test")){
				return true;
			} else {
				return false;
			}
		}catch(e){
			return false;
		}
	},
	showError: function (strError, strScriptName, strScriptVersion){
		alert("Error checking for updates. \n\n"+strError+"\n\nScript: "+strScriptName+"\nVersion: "+strScriptVersion);
	},
	addUpdater: function (strName, strCurrentVersion, intId){ // script id in userscripts.org, e.g. http://userscripts.org/scripts/show/<scriptid>
		if(!Updater.isGreasemonkey())
			return;
		GM_registerMenuCommand(strName+" -> Check for updates", function (){
			GM_xmlhttpRequest({
				url: "http://userscripts.org/scripts/source/"+intId+".meta.js",
				method: "GET",
				onerror: function (res){
					Updater.showError("Connection Failed", strName, strCurrentVersion);
					return;
				},
				onload: function (res){
					if(res.status!=200){
						Updater.showError("Server Response: "+res.status, strName, strCurrentVersion);
						return;
					}
					try{
						var strSName=res.responseText.match(/\/\/ @name\ .*/g)[0].substring(8);
						var strSVersion=res.responseText.match(/\/\/ @version\ .*/g)[0].substring(11);
						if(strSName.trim()==strName.trim()){
							if(strSVersion.trim()==strCurrentVersion.trim()){
								alert("You are using latest version of '"+strName+"' script.\n\nVersion: "+strCurrentVersion);
								return;
							} else {
								if(confirm("Press OK to update '"+strName+"' script.\n\nInstalled version: "+strCurrentVersion+"\nNew version: "+strSVersion.trim()))
									GM_openInTab("http://userscripts.org/scripts/source/"+intId+".user.js");
							}
						} else {
							Updater.showError("Script name mismatch.\nInstalled script: "+strName+"\nScript name found: "+strSName.trim(), strName, strCurrentVersion);
							return;
						}
					}catch(e){
						Updater.showError("Exception: "+e, strName, strCurrentVersion);
						return;
					}
				}
			});
		});
	}
};

try{
	imgBg        ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAbCAIAAAAyOnIjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFhJREFUGFcdw8sJxCAAQMF3yV6UKIoS8Yui2ElI/w0tODD8rovvfdl7n2st5pyMMc7eO601aq2UUsg5k1IixkgIged58N6fzjmstRhj0FqjlOK+b6SUCCH+JtUIlSpx02cAAAAASUVORK5CYII=";
	var imgCommon="data:image/png;base64,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";
	imgPlay      =imgCommon+"BzklEQVR42oySP48SQRjGn5nZmVlmQY7vQLOGcgtzxeVqk4ufABMLvdwHsDQmSnkWFxppNHwJaQjYmDNZ4xoKwhYUZCn5G2IYWDJjYeC880Df5O3m+T3PPHmJtRbVavVCSnm12Wy+GGMu1ut1j1IKz/NQLBahlEK320W73Uaj0cBoNIK1FhQApJRPAHDO+akQ4pox9sxaS6y1ODQUAIQQEEKAcw4hxFE+n/+Qy+U+W2sfHgJQ/LbcCnerlDpRSl1rrc+NMfw+iLN1vm+EEA8Wi8V7Y8xTY8xzAN0/Ibdi313OOVzXhTHmuFAohL7vv3IcJ8s5v3HmnIMQcrAcKaUKguBNpVJ5PBgMzgCM9sbeB/N9/1GapmcAPh78810YpRTz+fxbEASf/js2Ywyr1Wo9nU4vZ7PZ21KppP/ZNqUUjDFMJpMfcRy/EEKEUsrd+71tK6UAQMdx/LLX6x1rrUPGGLLZLKIoui3eHonrulBKYTwefw/D8HQ4HF4CWFJKkclk0O/3US6X/z4Sxhi01j+jKHqdJMkVgI3jOCCEwPM8tFot1Ot1LJfLG+cwDNtpmq6TJPna6XROkiR5RyndMMZACAFjDM1mE7VabScEgF8DALwiuI7FtATlAAAAAElFTkSuQmCC";
	imgPause     =imgCommon+"BTElEQVR42oSRP64TMRCHv/GMHVAiFNEggRQalEtwpFzgdRFn4FxUXIDmiYYq2iS78dpDEy+bRwjTuJnPvz8j7s5+v/+y2Wye3L0DYq31O/D5dDrR9z3r9fpbjPGTu4/Aq2EYvu52uycD2G63m5xzAt4C1Fo/HA4HhmHgcrmoqr43szfuDkDO+R2AcZ0YIwAiQs6Zvu9xd0QEMyPGiLvj7qiqT3ADG+zuUmvF3am1oqoyh81MJtjMbuBa6/S6u6iqmNlcmX8qN1hEuH7+UvkxrKpcC5KXmdv+XdvjODIfM7ux/VD5HpxSah38H24qc9sNfmi7tQm0dsXMJvhh2+2OV1ha23eV78DT4vxUpZS/M6eUpowicnMWdw9mpmZGCAGAxWLxBz4ej8+r1eoSQuhCCLHrup/L5ZJSCmbWAz9SSh9LKWMp5fX5fP4F8HsAqUTjecgX4WAAAAAASUVORK5CYII=";
	imgStop      =imgCommon+"Ai0lEQVR42uSSsQ4CMQxDk9SROjCfmPju/hifAOITKtTWLAXBcQKujOctip/sSNGU0jGEsJcuVZW5SL7MqiqllDNijAeSu/vCzD7CJEVVhSQA4PpsXAEXuPtbpSW4Aw8PSQEAGUlurclw8v/waO1a6+ZqL8K/CoDA3X3++N/Ub3aY2cnMprVwzvlyGwA8xH1/uZJ/0QAAAABJRU5ErkJggg==";
	imgVertBar   =imgCommon+"BFklEQVR42rySPW6DQBCF384Pa0yDOAYgK30ukZwhZYpcJ1L6pEnhli4tVSQXTkkHRQSS5dKYTWM5COxAlSdtM/s+zdvZMc459FWWpeR5/lxV1b2qom1bRFH0lqbpU5Ikx76XMNB6vb6r6/rB9/2ImaPFYhHt9/vHLMtuh94RHIbhjbUWIgJVhYjA930459JJuCiK43K5hOd556OquCQZFU4djTHnmjEGRGQm4dVq5Q6HA0R+r4gIAKZhAKOYRATTj3INvvQ+IpoX+xpsjKH/78zM8wbmeR6GK8vM82IzswwHKyKg03/9uWGbzeYrCAJYa6GqsNaCmdF13eckvNvt3rfb7WvXdY2qNs6576ZpXuI4/hh6fwYAfvhJuk/61BsAAAAASUVORK5CYII=";
	imgHorBar    =imgCommon+"A+UlEQVR42uyMO2qFUBRFN4IDsFRCwPCecC3t7Z2Biq2V8/Aq4udeG+ejc7CwjD+CCDoC0wTzUiQvCSmzYHE4m7MPjuPAb8V/+Yflpmmuy7KQaZo+dZ5nsm0bWdeVbNtG9n0ndV0/oeu6l2EYjr7vv+04jkfbts8oiuKRc34tiuLCOT9ljJ2zLMtLVVWnb/cPiKIIeZ4jDENQSk9v9zAM4TgOdF2H67pIkgSUUkBRFNi2DUopGGOI4xhxHCNNUzDGUJYlTNPELYQQqKr6HsiyDM/zwDlHlmXwfR+WZSEIAhiGgbtIkgTf96Fp2odcFMX7ZUEQ8Jd8+e11AMunt/YKiZwSAAAAAElFTkSuQmCC";
	imgFullScreen=imgCommon+"DHElEQVR42jyST0gjVwCHf+/NzJtJfElMd4j/RkQKkkVJwXgRT55SSylFbA6tCOnV00ILvfbkYaEsRU+RUmRblIKU0tRlF0ohl6Ct7ME/CJodq6RK1THJkEnyZt70sLv94Lt9x48Ui8UqgCRewwgh94qiTLiu66ysrGBxcRGWZRmGYfxFCBkhhIg3rUN1XX+g63qvruu9jLG/gyC4jMfjslwuo1aroVwuw7KsUNO0S13XrxhjvW98oDLGfACQUqK/v/9XKeWXq6urKJVKAICrqytks9nOycnJB77v/1iv198lhACAT3VdZwAuKaVnjUbjC8MwVvb29gzOOUzTRC6Xw87OTspxnE3P8/LNZvO5lPIoEokYqqIoWhAE/1iW9akQ4lm9Xv9qbW3tkDH29OLiAs1mE1LKjzjnC5zzPzqdzsdSyueapqXV09PT91qtljAMozoxMbGwvr7+2e7u7s+e58E0TczMzKDdbn8fiUT0bDa77bqud3Z2tlQsFodUIcRJEAQghCAMw5cbGxsvr6+v8ZahoSGMjo76Nzc3a4VCAdVqFYVC4dX5+fkrVdO0/0PbtpFOp+E4DoQQCMMQW1tbiEQi8DwPjUYDALC5uYlOpwMll8uBUgrOOY6Pj5FOpzE9PY2DgwO0Wi3k83nMzc1hamoK0WgUnHPMz8+jUqlAjcViC91utx4EwYuenp6HyWTy80aj8bWiKC4AxGIxmKaZSKVS3y4vLz+tVCovarXa+/l8vk8dHx//yXGcPxVFsVOp1HYikUjv7+8fCyG+A4Dh4WFkMpkZAEu2bX/IOf9kZGTkm8nJyYdUVdVmPB7vj8fjvyeTyXS1Wn18f3//g+/7AIDBwUH09fX9JqVcCsMwGY1GS4lEwgrDsK4yxrqMMYtSCtu2t29vbx/Pzs52NE3D0dER7u7uUCqVKKX02cDAwJOxsbFHAAzP8+7I4eFhBwB7u6jruheVSiWtqmork8nANE34vv8OADsMwx5N0yilFO12u6syxrYAcABQVZUKIf7tdruB67rwfR+xWAxCiC6AXwDwMAwlIQRSSve/AQAseGr6fq5D8gAAAABJRU5ErkJggg==";
	imgWide      =imgCommon+"CvklEQVR42nSQTU8bVxiFz51759oePBpjT4kZy1hBZIRURwGxoF6gbKqoUrtwRBfdhazJMlnAguQXRJVY8QOy6qKKBFlQVZZQ2wUfVlEF0bSiCARlbCDiaxiYe31vVlSRkjzbo+ecVy8BgImJCQwODkJKiePjYywtLWF9fZ1IKeF5nl5YWMD29vZXOzs7Ly3Legrgj+vrazAAIIQAAIQQyOfzGB8fx8jIiD48PES1WoVhGHBd98tWq1UzDOPnTqfzNYC/GABEUQRK6T3HceoANABUq1VQSpEkCRqNhmKMKa31P7Zt3xFC/CKE+J4BIFEUac75aLFYfPHhJTdorSGlBCHkJrvV09PzI8vlcnp4eBidTkdwztFut1+dn5+/Jh80KKXgeZ7IZrPP4jiupVKp1tjY2BMWRREODg7geR4451BKrVxdXf1EKYUQAgDAOUcul3tMCKkxxsJarfat67pNQwhB9vb2kE6nkclkEIZhem1tDc1mE0oppNNpUEqxubn5dxzHv5XL5XqxWGwCALNtW4+OjkIpBdM00dXVhUKhAMYYwjBEo9HAyckJfN//fWpq6r7rump6ehphGILV63X09/dDSglKKfL5PKlUKnBdF3NzcwiCAADQarXgOI5KkgSLi4sAAKNUKkEpBcaYMk0TWmudJAkKhQImJydRKpX+//r8/PyNSADAiKLoYXd394zWWnPOobUmlUrleSqV+mZoaIjMzs6ir68Pn4LOzMy88X3/oWmaQ5lMptu27bu+738npawEQfDKsqwO5xzLy8sfyUYQBD+cnp7+Vy6Xb5umid7e3ltnZ2dvNzY2Hh8dHSW7u7uQUn5y2ZBSLq+srNy/uLj4N5vNQkr5ZxAEDy4vL7cYY6CU4nNQx3GwtbX1rtls/jowMPCFZVmP9vf39+M4BiEEjDG0222srq5+JL8fAL0GKzMFbMDSAAAAAElFTkSuQmCC";
	imgVolume    =imgCommon+"BhklEQVR42qSSvW4TQRSFz975kWcMdgyN15UbOncoEgU1rfMACCReIKKlJV2MFKXnIXgAOgsh3FC4tERlyZp2k12t13MvjXe9IYpiiStN+c355sxNRASz2QxlWUJEAADMDO89iqLAeDxGVVVQSj0joq95np8Nh8Pz6XR6TXhkmBlE9LKqqp8xxjPnHNbr9RsAeBCuLcqyPLfW/vDevzDGQGsNa60BAL2/PWHmTks7MvPJaDT60u123xIdMpIkgdYaDTwYDD577z+ISL5PFa31wHv/nJkbixpWSh3gNE1PkyRJ/9UWEbRTa9gYc4BrjWPmnvZ/wbXGMUNEd7WNMU0J7Tcz8+NwURS/t9vtKYDbum3n3NNer3cSY7wH32l7t9t9ms/nF8YY2f8z9/v9J5PJ5DJN03dti3Yy7UuIRJQR0Q0R3SilchEJIYT3q9XqI4Cq0+lAa92cB9dTRJplCCFcLRaL11mW/XHOwVoLa60ctdtKKWRZ9mu5XL4KIXwTkbjZbL4DwN8BAFESseHwyhJJAAAAAElFTkSuQmCC";

	addCSS("\
		.calibri{font-family:Calibri !important}\
		.stream-link{padding:3px;font-family:Calibri;font-size:120%;display:block}\
		#streaming-controls{position:relative;top:-3px;vertical-align:middle;display:block;width:100% !important;height:27px !important;background:url('"+imgBg+"') !important}\
		a.stream-control:focus{-moz-outline-radius:0px !important;outline:0px !important;background-color:transparent !important}\
		.stream-control-container{min-width:35px;min-height:27px;max-width:35px;max-height:27px;vertical-align:middle;text-align:center}\
		.stream-control-container{opacity:0.6;}\
		.stream-control-container:hover{opacity:0.95;transition: opacity 500ms;-moz-transition: opacity 500ms;}\
		#volume-control{transition: left 500ms;-moz-transition: left 500ms;}\
		#streaming-control-play,#streaming-control-pause,#streaming-control-stop,#volume-control,#streaming-control-volume,#streaming-control-wide,#streaming-control-fullscreen{width:15px;height:15px}\
		#volume-control-bar{width:100px;height:27px}\
		#streaming-player,#streaming-controls, #watch-player-clone, #seek-display{margin:0px !important;padding:0px !important}\
		#seek-display{position:relative;top:-3px;vertical-align:middle;display:block;width:100% !important}\
		#seek-display, #seek-display td{height:3px}\
		#seek-display font{display:none}\
		#seek-display #seek-tooltip{display:none;position:absolute;background:black;color:white;border:1px solid white;font-size:85%;padding:1px 5px;top:-3px;z-index:10;border-radius:1px}\
		#seek-display:hover #seek-tooltip{display:block;}\
		#seek-display.control{top:-18px;}\
		#seek-display.control, #seek-display.control td{height:7px}\
		#seek-display.control font{display:inline}\
		#seek-current-duration{padding-left:2px;padding-right:2px;font-size:90%;color:#c0c0c0}\
		#flash10-promo-div{display:none !important}\
		#watch-player-clone{position:relative;overflow:hidden;width:640px;height:390px;background:#000;color:#fff;text-align:center}\
		#watch-video.wide #watch-player-clone{width:854px;height:510px;margin:0 auto}\
		#seek-control-bar-played{height:2px;background:rgb(215,36,36);}\
		#seek-control-bar-remaining{height:2px;background:rgb(128,128,128)}\
		.video-list-item .video-streaming-links{display:none;font-family:Calibri;font-size:95%;width:100%;text-align:center;background:#d1e1fa;border-radius:0px 0px 5px 5px}\
		.video-list-item-link:hover{border-radius:5px 5px 0px 0px}\
		.video-list-item:hover .video-streaming-links{display:block}\
		.video-streaming-links:hover{background:white;}\
		.vlc-menu-setting{height:19px;width:260px}\
		#play-local-file-remote-url{margin-top:-1px}\
	");
	try{
		Updater.addUpdater("YouTube Streaming Player", strVersion, 108912);
	}catch(e){}
	init();
}catch(e){
	console.log("Error:"+e);
}