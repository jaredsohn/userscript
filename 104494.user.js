// ==UserScript==
// @name           ir
// @namespace      //
// @include        http://www.iloveinterracial.com*
// @include        http://www.domywife.com*
// @include        http://www.personalclips.com*
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName("*");
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if(thisElement.id.length == 0) {
	if(thisElement.getAttribute("alt") == null) {
	thisElement.id = thisElement.getAttribute("class"); //thisElement.innerHTML;
	} else {
	thisElement.id = thisElement.getAttribute("alt");
		}
}
}
if(document.location.href.indexOf("ilove")!=-1 || document.location.href.indexOf("personalc")!=-1 || document.location.href.indexOf("wife.com/videos/category/")!=-1) {
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if(thisElement.id.indexOf(".flv")!=-1) {
	var s = thisElement.src.replace(".jpg",".flv");
	var olds = s;
 	s = s.replace("thumbl_","");
	//s="http://www.maxilamba.com/flash.html?video="+s+"&autostart=true&autoplay=1";
	//thisElement.parentNode.href=s;
	//thisElement.parentNode.parentNode.innerHTML=thisElement.parentNode.parentNode.innerHTML.replace("id=\"albumLink\"", "target=\"_blank\"");

	thisElement.parentNode.parentNode.innerHTML="<embed name=\"maxilamba\" width=\"480\" height=\"340\" allowfullscreen=\"true\"" + "src=\"http://www.maxilamba.com/player.swf\"" + "flashvars=\"file=" + s+"&image="+ olds.replace(".flv",".jpg") + "\"" + "type=\"application/x-shockwave-flash\" pluginspage=\"http://get.adobe.com/flashplayer/\"></embed><noembed><div id=\"no_embed\" style=\"width: 480px; text-align: center; font-family: arial; font-size: 13px; color: #ff0000;\"><br><b>Embed capable browser is required to view this content!</b><br><br></div></noembed>"


}
}



//document.getElementById("Click to view full size image").parentNode.href=document.getElementById("Click to view full size image").src.replace("normal_","");



var thevar = document.getElementById("Click to view full size image").src.replace("normal_","@");
for (var r = 0; r<thevar.length-1; r++) {

if (thevar.charAt(r) == '@') {

var thevar2 = thevar.substring(r-6, r+1);
thevar = thevar.replace(thevar2, "");
document.getElementById("Click to view full size image").parentNode.href=thevar;
} 
else {
}}



} else {
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if(thisElement.id.indexOf(".flv")!=-1) {
	var s = thisElement.src;//.replace(".jpg",".flv");
	var olds = s;
	if(s.indexOf("thumbl_")!=-1) { 
	s = s.replace("thumbl_","");
	s = s.replace(".jpg",".flv");
	} else {
	s = s.substring(0, s.length-5);
		var b = 0;
	    for (var a = 0; a<10; a++) {
		if(s.substring(s.length-1, s.length)==""+a&&b==0) {
			s = s.substring(0, s.length-1); b = 1;
		}
	    }
	s = s+".flv";
	}
	s = s.replace("/thumbl/","");
	
	//s="http://www.maxilamba.com/flash.html?video="+s+"&autostart=true&autoplay=1";
	//thisElement.parentNode.href=s;
	//thisElement.parentNode.parentNode.innerHTML=thisElement.parentNode.parentNode.innerHTML.replace("id=\"\"", "target=\"_blank\"");

	
	thisElement.parentNode.parentNode.innerHTML="<embed name=\"maxilamba\" width=\"480\" height=\"340\" allowfullscreen=\"true\"" + "src=\"http://www.maxilamba.com/player.swf\"" + "flashvars=\"file=" + s+"&image="+ olds + "\"" + "type=\"application/x-shockwave-flash\" pluginspage=\"http://get.adobe.com/flashplayer/\"></embed><noembed><div id=\"no_embed\" style=\"width: 480px; text-align: center; font-family: arial; font-size: 13px; color: #ff0000;\"><br><b>Embed capable browser is required to view this content!</b><br><br></div></noembed>"


}
}
document.getElementById("Click to view full size image").parentNode.href=document.getElementById("Click to view full size image").src.replace("normal_","");
}