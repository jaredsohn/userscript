// ==UserScript==
// @name           Shufuni Get Video
// @namespace      http://www.shufuni.com/*.html
// @description    Get Video
// @include        http://www.shufuni.com/*.html
// ==/UserScript==

flashParams = document.getElementsByTagName('input').item(3).value;
flashParams = flashParams.replace(/<object.*flashvars="/g,'')
flashParams = flashParams.replace(/&autostart.*"/g,'')
flashParams = flashParams.replace(/>.*/,'')
fileExists = flashParams.indexOf('file=');
if(flashParams.indexOf('file')>-1) {
	file = flashParams.replace(/file=/,'');
	file = file.replace(/&.*/,'');	
	linkLoc = file;
}
else {
	flashParams = flashParams.replace(/sdom=/g,'');
	fileName = flashParams.replace(/.*&mvnm=/g,'');
	subDomain = flashParams.replace(/&.*/g,'');		
	linkLoc = "http:\/\/" + subDomain + ".shufuni.com\/" + fileName;
}
var linkDiv = document.createElement("div");
linkHTML = "<a style='display: block; text-align: center; background-color: #005796; color: white; width: 100%; height: 20px;' href='" + linkLoc + "'>Download Video<\/a>";
linkDiv.innerHTML = linkHTML;
document.body.insertBefore(linkDiv, document.body.firstChild);
