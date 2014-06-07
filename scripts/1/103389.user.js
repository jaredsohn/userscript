// ==UserScript==
// @name           141 images & cwebgame
// @description    让141 images和cwebgame的图片不再缩小显示
// @include        http://141hongkong.com/forum/*
// @include        http://bbs.cwebgame.com/thread*
// @include        http://nightlife141.com/*
// @author         congxz6688
// @grant          GM_addStyle
// ==/UserScript==

var cssStyle = "";
cssStyle += ".pls {display:none  !important;}";
cssStyle += "p.mbn, DL.tattl.attm,.showhide {width:100%  !important;}";
cssStyle += ".showhide {width:905px !important; margin:0px -5px 0px -10px !important; }";
cssStyle += "img[id^='resize'] {max-width:1160px !important;}";
GM_addStyle(cssStyle);

var getAuthors=document.querySelectorAll('a.xw1:not(.xi2)');
var getpublish=document.querySelectorAll('[id^="authorposton"]');
if (window.location.href.indexOf("nightlife141.com")!=-1){
	var getAuthors=document.querySelectorAll('.pi>.authi');
	document.querySelector('#recommend_add').click();
}

if(getAuthors.length!=0){
	for(i=0;i<getAuthors.length;i++){
		getpublish[i].innerHTML="由 " + getAuthors[i].innerHTML.bold().fontcolor("blue") + " " + getpublish[i].innerHTML;
	}
}

var imas=document.querySelectorAll("IMG");
for(var i=0;i<imas.length;i++) {
	var file=imas[i].src;
	if(((imas[i].id.indexOf("aimg_")!=-1||imas[i].id=="") && file.search(/uc_server\/data\/avatar/)==-1 && file.search(/center\.cwebgame\.com\/avatar/)==-1&& file.search(/uc_server\/images/)==-1  && file.search("/source/plugin/")==-1 && imas[i].parentNode.tagName!="A" ) ||file.search("/data/attachment/forum/")!=-1) {
		imas[i].removeAttribute("onclick");
		imas[i].removeAttribute("onload");
		imas[i].style.height=null;
		imas[i].removeAttribute("height");
		imas[i].style.width=null;
		imas[i].removeAttribute("width");
		imas[i].removeAttribute("class");
		imas[i].id="resize"+i;
	}
}