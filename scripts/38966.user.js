// ==UserScript==
// @name           GarrysMod.org speedup
// @namespace      aVoN
// @description    Speeds up the downloads on garrysmod.org by bypassing the mirrorsite coblitz.codeen.org to download directly from garrysmod.org
// @version        0.2
// @include        http://www.garrysmod.org/*
// @include        http://garrysmod.org/*
// ==/UserScript==

//Coded by aVoN - http://39051.vs.webtropia.com/wordpress/
//You are free to distribute,copy,delete :P,rewrite this piece of code even without giving credits. Have fun

var filename = document.getElementsByTagName("h2")[0].innerHTML; //The name of the file to download
if(filename.indexOf(".zip") != -1){ //If someone set another title rather than the ZIP-File name, this script does not work!
	var url = document.URL; //URLof this download
	var id = url.substr(url.indexOf("id")+3); //ID of this download
	var ForbiddenChars = new Array("#");
	for(var i=0;i < ForbiddenChars.length;i++){
		filename = filename.replace(ForbiddenChars[i],"_");
	}


	var new_url = "http://file.garrysmod.org/"; //Direct URL to download from

	//Create the new direct-download URL
	for(var i = 0; i <= id.length; i++){
		new_url += id.substr(i,1)+"/";
	}
	new_url += filename;

	function DownloadDirectly(){
		window.location.href = new_url;
		return true;
	}

	//Now edit the "Download Button" to the direct download
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		if(inputs[i].value == "Download"){
			inputs[i].value = "Download [FAST]"
			inputs[i].type = "button";
			//inputs[i].onclick = DownloadDirectly; //This does not work in GreaseMonkey. - http://groups.google.com/group/greasemonkey-users/browse_thread/thread/3c37e0e9c87fb00f/308db589b9bcc29e?pli=1
			inputs[i].addEventListener("click",DownloadDirectly,true);
			break;
		}
	}
}