// ==UserScript==
// @name           bitkaYT
// @namespace      ivicaSR_bitka_youtube
// @description    Mnogo dobra stvar
// @include        http://*.erepublik.com/*/military/battlefield/*
// ==/UserScript==

/* pozadina na battle stranici */


var video_url = "http://www.youtube.com/v/a5irTX82olg"; //shakira - rabiosa
var video_width = 760;
var video_height = 560;


var togle=0;
pvpObj = document.getElementById('pvp');
pvpCSS = 	'margin: -'+(video_height*0)+'px 0pt 0pt 10px;'+
			'z-index: 1';
pvpObj.setAttribute("style", pvpCSS);
pvpObj.style.backgroundImage = "none";
flashContent = document.createElement("div");

flashContent.innerHTML = '';
flashCSS = 'z-index: 2;';
flashContent.setAttribute("style", flashCSS);
flashContent.id = "flashContent";
document.getElementById('content').replaceChild(flashContent, pvpObj);
flashContent.appendChild(pvpObj);
flashContent.innerHTML += '<object style="z-index: 0; margin: -'+(video_height)+'px 0pt 0pt 0px; position: relative; float: left;" id="ytvideo" width="'+video_width+'" height="'+video_height+'"><param name="movie" value="'+video_url+'"></param><param name="wmode" value="transparent"></param><embed src="'+video_url+'" type="application/x-shockwave-flash" wmode="transparent" width="'+video_width+'" height="'+video_height+'"></embed></object>';

flashContent.appendChild(document.createElement('br'));
var dugme = document.createElement('input');
dugme.type = 'submit';
dugme.name = 'yt_togle';
dugme.id = 'yt_togle';
dugme.value = 'Youtube togle';
dugme.addEventListener('click', togleCommand, false);
flashContent.appendChild(dugme);


function togleCommand() {
	if (togle==0) {
		var yt_element = document.getElementById('ytvideo');
		var ytCSS = 	'margin: -'+(video_height)+'px 0pt 0pt 0px;'+
						'z-index: 2;'+
						'position: relative;'+
						'float: left;';
		yt_element.setAttribute("style", ytCSS);
		togle=1;
	} else {
		var yt_element = document.getElementById('ytvideo');
		var ytCSS = 	'margin: -'+(video_height)+'px 0pt 0pt 0px;'+
						'z-index: 0;'+
						'position: relative;'+
						'float: left;';
		yt_element.setAttribute("style", ytCSS);
		togle=0;
	}
}

/*****************************************/



