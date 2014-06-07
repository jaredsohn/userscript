// ==UserScript==
// @name          audioYoink - AudioPlayer MP3 Link Extractor
// @description	  Find link to mp3's embedded with 1pixelout's audioplayer plugin.
// @namespace     http://hjwashington.com/js
// @include       http://*fisierulmeu.ro/*

//by hjw (http://hjwashington.com)
// ==/UserScript==

(function () {
	var allObjects = document.getElementsByTagName("object");
	var lists = document.getElementsByTagName("param");
	Array.forEach(lists, function(list) {
		if (list.name == "FlashVars") {
			var yoink = document.createElement("span");
			flashVarString = list.value;
			flashVarArray = flashVarString.toString().split('&');
			Array.forEach(flashVarArray, function(fVar) {
				if (fVar.indexOf("soundFile=") != -1) {
					fileString = decodeURIComponent(fVar.substring(10,fVar.length));
					fileArray = fileString.split(',');
				}
			});

			audioPlayerID = list.parentNode.id;
			theObject = document.getElementById(audioPlayerID);
			currentParent = theObject.parentNode;
			
			yoinkStr = "<br />";
			
			Array.forEach(fileArray, function(theFile) {
				yoinkStr = yoinkStr + '<button onclick="window.location.href=\'' + theFile + '\'">Download</button><br />';
			});
			
			yoink.innerHTML = yoinkStr;
			
			currentParent.insertBefore(yoink, theObject.nextSibling);
		}
	});

}) ();