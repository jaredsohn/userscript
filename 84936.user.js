// ==UserScript==

// @name           vbox7 noflash player

// @namespace      http://www.vbox7.com/

// @description    watch videos in vbox7 without the need of flash

// @version        0.2

// @author         lokster

// @include        http://www.vbox7.com/*

// @include        http://vbox7.com/*

//

// ==/UserScript==



(function () {

	var embedElement = getElementsByClassName('clipControls');

	embedElement = embedElement[0];

	if (embedElement){

		var element = document.createElement('div');

		element.setAttribute('class','clipControlsBtn');

		var re = new RegExp(/play:([a-z0-9]{8})/gm);

		var m = re.exec(document.location);

		get_video_url(m[1]);

		var content = '<a id="vbox7_download_link" href="#" title="Download"><img src="data:image/gif,GIF89aI%00%18%00%F7%00%00XWX%5B%5B%5B%5C%5C%5Cfffrfj%86%81%83%89%89%89%95%82%89%99%8A%8F%9B%99%9A%DC%9B%B3%E7%AD%C3%E8%B2%C6%EA%B4%C8%ED%B7%CB%EE%BA%CD%F5%BF%D3%F7%C1%D5%FA%C4%D8%FC%C6%DA%F2%D5%DF%FB%D2%E1%F9%DA%E5%FD%DD%E9%FA%FA%FA%FB%FB%FB%FD%FD%FD%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00I%00%18%00%00%08%FF%007%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%94%98%A1%A3%80%8F%1BC2%EC%A8%E1%A3%00%91(%11%1A%08%90%C0d%80%97%2F%0B%A4D%19%60%C2%05%93%0F%1C4%60%C0%20%40%C2%01%40gF%0C%80%C0%E4%C7%03%3B%7B%22%1C0%90%A9P%87%05.%14%3D%AA%93%A7O%83N%0B%02%CD%BAakS%AF%02%BDfu%0AVa%80%0A%16%8A%16%60PU)%D6%83d%C36%95%DB%95.%D3%B1u%E9%26%AC%896%C1%03%01%00%02%03H%00%17n%D0%AF%87%E3%E6%BD%BB%95qY%845%25T%88%40!%C0%02%05%04%12%60(%FCv%F1%5C%CFa%83%E2%E5%BA0r%04%08%951\'%C8%B0%993h%C5%89%ED%CA%1D%FDy%EF%04%09%A7)%08%C8%DC%B1%B5%E1%B1%87C%D7%C5%EB%99%F8c%C8%B7s%B3%EC%C8%FA%E9%C6%950%973%F7%ED%BC%BA%F5%EB%D8%B3k%DF%CE%BD%BB%F7%EF%06%03%02%00%3B" /></a>';

		element.innerHTML = content;



		embedElement.appendChild(element);

	}

})();







var playersAvailable = [{

	name:"Generic Player",

	description:"A player that should work with most video plugins.",

	init:function() {

		return this;

	},

	writePlayer:function(parentDivId, url, autoplay, width, height) {

		var parentDiv = document.getElementById(parentDivId);

		var mime = 'video/flv';

		parentDiv.innerHTML = '<embed id="no-flash-player" type="' + mime + '" src="' + url

			+ '" scale="tofit" width="' + parseInt(width) + '" height="' + parseInt(height) + '" autoplay="' + autoplay + '"></embed><br />';

	}

}];



function getElementsByClassName(classname, node) {

	if(!node) node = document.getElementsByTagName("body")[0];

	var a = [];

	var re = new RegExp('\\b' + classname + '\\b');

	var els = node.getElementsByTagName("*");

	for(var i=0,j=els.length; i<j; i++)

	if(re.test(els[i].className))a.push(els[i]);

	return a;

}



function get_video_url(vid){
	var re = new RegExp('http://www.');

	GM_xmlhttpRequest({

	  method: "POST",

	  url: (re.test(window.location) ? "http://www.vbox7.com/play/magare.do" : "http://vbox7.com/play/magare.do"),

	  data: "onLoad=[type%20Function]&vid="+vid,

	  headers: {

		"Content-Type": "application/x-www-form-urlencoded"

	  },

	  onload: function(response) {

		var re = new RegExp(/&videoFile=(.*?)&/gm);

		var m = re.exec(response.responseText);

		document.getElementById('vbox7_download_link').href=m[1];

		

		var player = playersAvailable[0].init()

		player.writePlayer('flashcontent',m[1],true,512,403)

		

		

	  }

	});

}

