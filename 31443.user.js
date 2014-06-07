/*<![CDATA[*//*
// ==UserScript==
// @name          youtubepItvl
// @description   personal configurations for youtube
// @include       https://*youtube.com/*
// @include       http://*youtube.com/*
// @match         http://*.youtube.com/*
// @namespace     userscripts.org/users/46776
// ==/UserScript==*/
function remWatchs(){
	var doc=document,aswatch=['footer'];
   for(var j=aswatch.length,tmp=[],n=0,ads;j--;){ads=doc.getElementById(aswatch[j]);if(ads){tmp[n++]=[ads,ads.parentNode];}}
	tmp.forEach(function(v){v[1].removeChild(v[0]);});
}

var confget={
adcod: function(){
	var doc=document,adc=doc.getElementById('watch-headline-title'); if(adc){
	adcom=adc.getElementsByTagName('span')[0],cld=adcom.cloneNode(true);
	cld.textContent=cld.textContent.replace(/\//g,'-').replace(/\:/g,' -').replace(/\&/g,'y').replace(/[\\\|\(\)\[\]\{\}]/g,' ').replace(/Parte?\s/,'part ').replace(/\s{2,}/g,' ').replace(/^\s|\s$/g,'').replace(/\s\./g,'.');
	cld.style.cssText="border:none;font-family:Arial;font-size:17px;font-weight:700;color:#000000;text-shadow:.2px .3px 0 #306060;padding-left:5x;";
	adcom.parentNode.replaceChild(cld,adcom);cld=null;
	adc.ondblclick=function(){this.setAttribute('contentEditable','true');};
  }
}
};

function adstyle(){
	var doc=document,adstyle=doc.createElement('style'),
	uservid="body{background-image:none!important;background-color:rgb(246, 255, 244);}a:visited{border-bottom:1px dotted #007736;}a:visited:hover{color:#000000;background-color:#f6fff4;}#masthead a{font-size:12px;}#videosPofileVideos{max-width:800px;}a:visited img{outline:solid 2px #aaa0a0;}\
#watch-related li,#watch-sidebar li,#video-sidebar li{margin:0px!important;padding:0px!important;}#video-sidebar .ux-thumb-wrap{height:99px;}#playlist-pane-container .video-thumb,#watch-sidebar .video-thumb,#video-sidebar .video-thumb{height:92px;width:120px;}#playlist-pane-container a,#watch-sidebar a,#video-sidebar a{padding:0px!important;}.playnav-video-thumb .video-thumb{height:99px!important;}.video-list-item{height:76px;}#watch7-sidebar .video-thumb{height:75px;}.ux-thumb{height:70px;}\
#watch-related .video-list-item{height:78px;margin-bottom:1px!important;}#watch-related .yt-uix-simple-thumb-wrap{height:78px;}span img{top:-2px!important;}";
	adstyle.appendChild(doc.createTextNode(uservid)); codi=null;
	doc.getElementsByTagName('head')[0].appendChild(adstyle);
}

  document.addEventListener('load',remWatchs(),confget.adcod(),adstyle(),false);


/*]]>*/