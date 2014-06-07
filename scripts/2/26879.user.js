// ==UserScript==
// @name           Strip Veoh URL & Use To Find FLV & Replace Page with Link
// @namespace      me
// @description    This is a quick and dirty hack that connects to Veoh directly and asks for a download link for their stupid flv. I made a bunch of other programs, but I want Veoh to work, the sites haven't updated their scripts to make mine work yet, so I just did this from scratch and they can go do what they will.
// @include        http://www.veoh.com/videos/*
// ==/UserScript==
var initX=function(){
	document.body.innerHTML="";
	var id=location.href.split("\?")[0].split("/")[4];
	var url="http\:\/\/www.veoh.com\/rest\/video\/"+id+"\/details";
		GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(stuff){
			document.body.innerHTML=stuff.responseText;
			document.body.innerHTML="<a href=\""+document.getElementsByTagName("video")[0].getAttribute("fullpreviewhashpath")+"\">Click here to Download FLV.</a>";
		}
	});
}
initX();/////THIS IS THE WORST SCRIPT I EVER MADE. But it works.