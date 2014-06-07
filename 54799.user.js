var GMSU_meta_54779 = <><![CDATA[
// ==UserScript==
// @name           REV3 HD on quicktime
// @namespace      Oldarney
// @description    Places a Quicktime-Web-Player instead of a Flash-Player on the Revision3 episode-sites
// @include        *.revision3.com/*
// @include        *//revision3.com/*
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     54779
// ==/UserScript==
]]></>;
//Dependencies

/* The Ultimate getElementsByClassName */
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

//SCRIPT START
var vidEl = document.getElementById('video-embed');
var vidRightSide = document.getElementsByClassName('player-sidebar-right');
var vidLeftSide = document.getElementsByClassName('player-sidebar');
var vidEmbed = document.getElementsByTagName('embed');
var vidStage = document.getElementsByClassName('video-stage');

if(vidEl ){
	
	var quicktimeMp4HDRef = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'hd720p30.h264.mp4')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var quicktimeMp4Ref = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'hd.h264.mp4')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var quicktimeMovSDRef = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'large.h264.mp4')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var quicktimeMovHDRef = document.evaluate( "//div[@id='episode-sidebar-download']//a[contains(@href, 'hd.h264.mov')]" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var quicktimeHref = quicktimeMp4HDRef.singleNodeValue || quicktimeMp4Ref.singleNodeValue || quicktimeMovHDRef.singleNodeValue || quicktimeMovSDRef.singleNodeValue;
	quicktimeHref = quicktimeHref.href;
	//var prevImage = document.evaluate( "//div[@id='show-notes']//img[@class='thumbnail']" ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.src;
	var quicks = document.createElement("div");
	quicks.innerHTML = 	'<embed type="video/quicktime" src="' + quicktimeHref + '" width="1280" height="736" targetcache="true" autostart="true"'+
										' name="movie1"/> <p style="text-align: center"><a href="javascript:document.movie1.Play();document.movie1.SetRate(1);"> Play </a>'+
										'<a href="javascript:document.movie1.Stop();"> Stop </a>'+
										'<a href="javascript:document.movie1.SetRate(-2);"> Reverse </a>'+
										'<a href="javascript:document.movie1.SetRate(2.5);"> Fast </a></p>';
	vidEl.parentNode.replaceChild(quicks, vidEl);
	vidLeftSide[0].parentNode.removeChild(vidLeftSide[0]);
	vidRightSide[0].parentNode.removeChild(vidRightSide[0]);
	//vidEmbed[0].width = 1280; 
	//vidEmbed[0].height = 736;
	vidStage[0].style.width= "1280px"; 
	vidStage[0].style.height= "752px";
	
	//quicks.style.marginBottom = "-5px";		
	
}