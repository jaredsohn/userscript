// ==UserScript==
// @name        Simplify Niconico(Harajuku)
// @namespace   http://
// @include     http://www.nicovideo.jp/watch/*
// @version     1.0.3
// ==/UserScript==
(function(){
	var div = document.createElement('div');
	div.id = "setumeiidou"
	div.style.height = "100px"
	var  div2 = document.createElement('div');
	div2.style.width = "712px"
	div2.style.padding = "4px"
	div2.style.overflow = "hidden"
	div2.style.cssFloat  = "left"
	var  div3 = document.createElement('div');
	var  div4 = document.createElement('div');
	div4.style.position = "absolute"
	div4.style.width = "400px";
	div4.style.marginLeft = "312px"
	div4.style.paddingTop = "5px"
	var video_controls = document.getElementById('video_controls');
	video_controls.style.background = "none";
	video_controls.style.paddingLeft = "0px"
	video_controls.style.marginTop = "5px"
	video_controls.style.fontSize = "13px"
	var BTN_add_deflist = document.getElementById('BTN_add_deflist').parentNode.parentNode;
	BTN_add_deflist.style.cssFloat = "right";
	var BTN_add_deflistnobrchild = BTN_add_deflist.getElementsByTagName("nobr")[0];
	BTN_add_deflistnobrchild.style.cssFloat = "right";
	var addbuttonimg = BTN_add_deflist.getElementsByTagName("img");
	for( var i = 0; i < addbuttonimg.length; i++ ) {
		var imgnode = addbuttonimg[i];
		imgnode.style.height = "22px";
		imgnode.style.marginLeft = "3px";
	}
	var video_tags =  document.getElementById('video_tags');
	video_tags.style.width = "780px";
	video_tags.style.marginTop = "-3px";
	var  video_tagsnobrnodelist = video_tags.getElementsByTagName("p")[0].getElementsByTagName("nobr");
	for( var i = 0; i < video_tagsnobrnodelist.length; i++ ) {
		var video_tagsnobrnode = video_tagsnobrnodelist[i];
		var video_tagsnobranode = video_tagsnobrnode.getElementsByTagName("a")[0];
		video_tagsnobranode.style.fontSize = "11px"
		video_tagsnobranode.style.textDecoration = "none"
	}
	var zero_lead_index = document.getElementById('zero_lead_index');
	var head_ads = document.getElementById('head_ads');
	var head_logo = document.getElementById('head_logo');
	var search_tab = document.getElementById('search_tab');
	search_tab.style.position = "absolute"
	search_tab.style.paddingTop = "3px"
	search_tab.style.marginLeft = "222px"
	var PAGEHEADER = document.getElementById('PAGEHEADER');
	var head_search = document.getElementById('head_search');
	head_search.style.padding = "0px 4px"
	var siteHeaderInner = document.getElementById('siteHeaderInner');
	var aa = siteHeaderInner.lastChild.previousSibling
	siteHeaderInner.style.width = "auto";
	var videotitleNode = document.getElementById("video_title");
	videotitleNode.style.fontSize = "20px";
	videotitleNode.style.position = "relative"
	videotitleNode.style.top = "5px"
	videotitleNode.parentNode.style.width = "984px"
	var videodateNode = document.getElementById("video_date").parentNode;
	var itabNode = document.getElementById("itab");
	var itabNodepreviousSibling = itabNode.parentNode.getElementsByTagName("p")[0];
	var videotitlekyoudaiNode1 = videotitleNode.parentNode.getElementsByTagName("div")[1];
	var videotitlekyoudaiNode2 = videotitleNode.parentNode.getElementsByTagName("div")[2];
	var WATCHHEADER = document.getElementById('WATCHHEADER');
	var videotitlekyoudaiNode3 = WATCHHEADER.childNodes[5];
	videodateNode.className ="des_3";
	videodateNode.style.display ="block";
	head_ads.parentNode.removeChild(head_ads);
	head_logo.parentNode.removeChild(head_logo);
	zero_lead_index.parentNode.removeChild(zero_lead_index);
	var  WATCHFOOTERNode = document.getElementById("WATCHFOOTER");
	WATCHFOOTERNode.parentNode.insertBefore(div,WATCHFOOTERNode);
	var setumeiidou = document.getElementById("setumeiidou");
	div.appendChild(div2);
	div2.appendChild(videotitlekyoudaiNode1);
	div2.appendChild(videotitlekyoudaiNode2);
	videotitlekyoudaiNode3.appendChild(itabNodepreviousSibling);
	div.appendChild(videotitlekyoudaiNode3);
	siteHeaderInner.insertBefore(div4,aa);
	div4.appendChild(PAGEHEADER);
})();