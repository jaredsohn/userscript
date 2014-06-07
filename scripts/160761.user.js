// ==UserScript==
// @name        JVC - No Smileys
// @namespace   jvcNoSmileys
// @description Suppression de tous les smileys de JVC.
// @include     http://www.jeuxvideo.com/*
// @include     http://www1.jeuxvideo.com/*
// @include     http://m.jeuxvideo.com/*
// @include     http://www.noelshack.com/*
// @version     1
// ==/UserScript==


(function(){

	function isSmiley(alt) {
		var codes = [':)',':-)',':-)))',':o))',':-p',':p)',':(',':-(',':-((',':d)',':g)',':-D'];
		if(alt[0]===':'&&alt[alt.length-1]===':')
			return true;
		else
			for(var j in codes)
				if(alt===codes[j]) return true;
			return false;
	}
	
	
	
	var tmp = [];
	
	for(i in document.images) {
		var elm = document.images[i];
		var alt = elm.alt || 'alt';
		if(isSmiley(alt)) tmp.push(elm);
	}

	
	while(tmp.length) {
		var elm = tmp.pop();
		elm.parentNode.removeChild(elm);
	}
	
	
}());