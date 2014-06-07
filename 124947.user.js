// ==UserScript==
// @id             www.funnyordie.com-4ea560e7-b380-4e35-b217-37fa09a56a48@wpPlus
// @name           FunnyOrDieAutobufferWithNoAutoplay
// @version        1.0
// @namespace      fod
// @author         Yansky
// @description    
// @include        http://www.funnyordie.com/videos/*
// @run-at         document-start
// ==/UserScript==



if(!GM_getValue('FODVideoRes')){
	GM_setValue('FODVideoRes','sd');
}



function setVidUp(){
	
		var fodplayer=document.getElementById('fodplayer');
		var video_player=document.getElementById('video_player');
		video_player.removeChild(fodplayer);
		
		var resol = GM_getValue('FODVideoRes');
		var vidU="http://videos0.ordienetworks.com/videos/"+document.URL.split('/videos/')[1].split('/')[0]+"/"+resol+".flv";
		var videoThum = document.querySelector('link[rel="videothumbnail"]').href;
		
		var newflow = document.createElement('object');
		newflow.setAttribute("data","http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf");
		newflow.setAttribute("type","application/x-shockwave-flash");
		newflow.setAttribute("width","640");
		newflow.setAttribute("height","360");

	
		var params1 = document.createElement('param');
		params1.setAttribute("value","http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf");
		params1.setAttribute("name","movie");
	
		newflow.appendChild(params1);
	
		var params2 = document.createElement('param');
		params2.setAttribute("value","true");
		params2.setAttribute("name","allowfullscreen");
	
		newflow.appendChild(params2);
		
		var params3 = document.createElement('param');
		params3.setAttribute("value","config={'playlist':['"+videoThum+"', {'url': '"+vidU+"','autoPlay':false,'autoBuffering':true}]}");
		params3.setAttribute("name","flashvars");
	
		newflow.appendChild(params3);	
		
		video_player.appendChild(newflow);	
		
}

function domWaiter(){
	if(!document.getElementById('video_player') || !document.getElementById('fodplayer')){
		window.setTimeout(function() {domWaiter();},50);
	}
	else{
		setVidUp();
	}
}



if(!document.getElementById('video_player')){
	domWaiter();
}
else{
	setVidUp();
}
/*
GM_registerMenuCommand("HD Video", function(){
	GM_setValue('FODVideoRes','hd');
	setVidUp();
});
GM_registerMenuCommand("SD Video", function(){
	GM_setValue('FODVideoRes','sd')
	setVidUp();
});
*/