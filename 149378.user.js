// ==UserScript==
// @name           English Text-to-Speech
// @namespace      tts.english
// @description    Speaks the selected text in English voice. To use it, first select any text on the page and white the text is selected control-double click on a blank space on the page. It will automatically get the text and speak it in English. Please wait for a white until the complete speech is loaded in the background. For longer texts it may take a while.
// @author         sanilunlu
// @version	   	   1.0
// @include        *
// ==/UserScript==

function speakText(text) {
	GM_xmlhttpRequest({
		method: "POST",
		url: 'http://vaassl3.acapela-group.com/Services/Synthesizer',
		headers: {"Content-Type": "application/x-www-form-urlencoded","User-Agent":"Mozilla/5.0","Accept":"*/*","Origin":"http://www.acapela-group.com","Accept-Encoding":"gzip,deflate,sdch","Accept-Language":"en-US,en;q=0.8","Accept-Charset":"ISO-8859-1,utf-8;q=0.7,*;q=0.3"},
		data: "cl_env=FLASH_AS_3.0&req_snd_kbps=EXT_CBR_128&req_asw_type=INFO&cl_vers=1-30&cl_login=demo_web&req_voice=heather22k&cl_pwd=demo_web&prot_vers=2&req_text=" + text,
		onload: function(response) {
			var tx = response.responseText;
			var ur = tx.substring(tx.indexOf('&snd_url=') + '&snd_url='.length, tx.indexOf('&snd_size='));

			if(navigator.userAgent.indexOf('WebKit') != -1) {
				var s = document.createElement('AUDIO');
				s.controls="false";
				s.autoplay="true";
				s.src=ur;
			} else {
				var s = document.createElement('EMBED');
				s.width="100";
				s.height="30";
				s.type="application/x-mplayer2";
				s.src=ur;
			}
			if(document.getElementById("english_tts").children.length > 0)
				document.getElementById("english_tts").replaceChild(s, document.getElementById("english_tts").children[0]);
			else
				document.getElementById("english_tts").appendChild(s);
			
			//console.log(ur);
		},
		onerror: function(response) {
			alert('THERE WAS AN ERROR WHILE LOADING THE SPEECH!'); //GM_log(response); 
		}
	});
}

function getSelText() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	} else if (document.getSelection) {
		txt = document.getSelection();
	} else if (document.selection) {
		txt = document.selection.createRange().text;
	} else return "";
	var t = "";
	if(txt.rangeCount > 0) {
		var i = 0;
		while(i < txt.rangeCount)
			t += txt.getRangeAt(i++).toString().replace(/[\t \n\r]+/g,' ') + ' ';
		return t;
	} else
		return "";
}

function keyPress(e) {
	if(e && (e.keyCode == 112 && e.shiftKey && !e.altKey && !e.ctrlKey) ||
(navigator.userAgent.indexOf('Chrome') != -1 && e.charCode == 5 && e.shiftKey && !e.altKey && e.ctrlKey)) {
		var t = getSelText();
		//console.log(t);
		if(t != undefined && t.length > 0)
			speakText(t);
	}
}

var e = document.createElement('DIV');
e.id = "english_tts";
e.style.display = 'block';
e.style.left = '-500px';
e.style.position = 'absolute';
document.body.appendChild(e);

document.addEventListener("keypress", keyPress, true);
