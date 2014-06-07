// ==UserScript==
// @name		Download ESnips Mp3 Songs
// @author		Umakanthan Chandran
// @namespace	http://cumakt.googlepages.com
// @description	Download  mp3 songs from esnips.com
// @include		http://*esnips.com/*
// ==/UserScript==

(function() {
	function findPlaceToAdd() {
		els = document.getElementsByTagName("div");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == 'info-block options') return el;
			}
		}

		el = document.getElementById("widget");
		if (el != null) return el;
		return null;
	}
	
	function generic_find(word,start,startIndexWord,endIndexWord) {
    var searc = start;
    var matches = word.search(searc);
    if (matches == -1) {
           return "-1"; }
    var matchedString = word.substring(matches, word.length);
    var startIndex = matchedString.indexOf(startIndexWord) + startIndexWord.length;
    var endIndex = matchedString.indexOf(endIndexWord);
    var define = matchedString.substring(startIndex, endIndex);
    return define;
}

	
	
	var imgdownload = document.createElement('img');
	imgdownload.setAttribute('class','alignMid');
	imgdownload.setAttribute('border','0');
	imgdownload.setAttribute('width','32');
	imgdownload.setAttribute('height','32');
	imgdownload.src = "data:image/jpeg;base64,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%3D%3D";
	
	x=document.body.innerHTML;
    round1 = generic_find(x,"theFile=","theFile=","&amp;theName");
	links = findPlaceToAdd();
	
	var a = document.createElement('a');
	a.setAttribute('class','noul');
	if(round1 != "-1") {
	a.setAttribute('href',round1);
	a.appendChild(imgdownload);
	a.innerHTML += ' <span class="eLink"><font style="font-size: 8pt;" face="Tahoma">Download MP3</font></span>';
	}
	
	links.appendChild(a);

})();