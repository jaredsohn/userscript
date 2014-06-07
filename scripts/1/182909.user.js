// ==UserScript==
// @name          Horny Pharoh Video downloader
// @namespace     hornyPharohDownloader.js
// @description	  Allows the download of videos from hornypharoh.com
// @author        thingywhat
// @include       http://www.hornypharaoh.com/videos/*/*
// ==/UserScript==

window.onload = function(){
    function download(){
	var configURL = s1.getParams().flashvars.split("settings=")[1];
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", configURL, true);
	xhr.onreadystatechange = function(){
	    if(xhr.readyState === 4){
		location.replace("http://media.hornypharaoh.com/videos/" +
				 xhr.responseText.split("defaultVideo:")[1]
				 .split(";")[0]);
	    }
	};

	xhr.send();
    }

    var button = document.createElement("button");
    button.innerHTML = "Download!";
    button.onclick = download;
    document.querySelectorAll("#video_option td")[2].appendChild(button);
};
