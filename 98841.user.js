// ==UserScript==
// @name           get youtube share2Discuz code
// @description    get http://www.youtube.com/v/XXXXXX
// @include        http://www.youtube.com/watch*
// @include        http://www.youtube.com/das*
// @author         congxz6688
// ==/UserScript==

var nowurl=window.location.href
if(nowurl.indexOf("das_captcha")!=-1){
	var change1=nowurl.replace(/http.*next\=/,"").replace(/%26.*/,"").replace(/&.*/,"").replace(/%3A/,":").replace(/%3F/,"?").replace(/%3D/,"=");
	window.location.href=change1;
}

if(nowurl.indexOf("watch?v=")==23){
	var myposs=document.getElementById("watch-share");
	var myAnchors=document.evaluate('//meta[@property="og:url"]', document, null, 9, null);
	var myAnchord=document.evaluate('//embed[@id="movie_player"]', document, null, 9, null);
	var myshare=myAnchors.singleNodeValue.content.replace(/watch\?v=/,"v/");

	var Newinput=document.createElement("input");
  	    Newinput.size="40";
 	    Newinput.value="click here to get swf share code";
  	    Newinput.addEventListener("click", function (){
		this.value=myshare;
		this.select();
		}, false);
	myposs.parentNode.appendChild(Newinput);

	var Newin=document.createElement("adaa");
  	    Newin.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;";
	myposs.parentNode.appendChild(Newin);

	var Newinput2=document.createElement("input");
  	    Newinput2.size="40";
 	    Newinput2.value="click here to get oflash share code";
  	    Newinput2.addEventListener("click", function (){
		this.value="[oflash=" + myAnchord.singleNodeValue.width + "," + myAnchord.singleNodeValue.height + "]" + myshare + "[/oflash]";
		this.select();
		}, false);
	myposs.parentNode.appendChild(Newinput2);
}