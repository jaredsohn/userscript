// ==UserScript==
// @name YouTube Download
// @description Adds a small download button to every video on YouTube
// @author KayKay
// @namespace kk.tools
// @version 1.9
// @include				http://youtube.com/watch?v=*
// @include				http://*.youtube.com/watch?v=*
// @include				http://youtube.com/watch?*&v=*
// @include				http://*.youtube.com/watch?*&v=*
// ==/UserScript==
GM_setValue("version","1.9"); 

GM_registerMenuCommand("Switch download mode",switch_mode);
var el_action,el_text;
var div_actions = document.getElementById("watch-actions-area");
if(!div_actions) {
	el_action = el_text = document.createElement("a");
	el_action.setAttribute("href","#");
	el_text.setAttribute("id","download-link");
	el_text.setAttribute("class","hLink");
	var div_download = document.createElement("div");
	div_download.appendChild(el_action);
	var div_quality = document.getElementById("watch-video-quality-setting");
	if(!div_quality) {
		div_quality = document.createElement("div");
		div_quality.setAttribute("id","watch-video-quality-setting");
		var div_views = document.getElementById("watch-views-div");
		div_views.insertBefore(div_quality,div_views.lastChild.previousSibling);
	}
	div_quality.insertBefore(div_download,div_quality.firstChild);
} else {
	var div_tab = el_action = document.createElement("div");
	div_tab.setAttribute("id","watch-tab-download");
	div_tab.setAttribute("class","watch-tab");
	var a_link = document.createElement("a");
	a_link.setAttribute("href","#");
	a_link.setAttribute("id","watch-action-download-link");
	a_link.setAttribute("class","watch-action-link");
	div_tab.appendChild(a_link);
	var button_action = document.createElement("button");
	button_action.setAttribute("id","watch-action-download");
	button_action.setAttribute("title","Download");
	button_action.setAttribute("class","master-sprite");
	a_link.appendChild(button_action);
	var span_action = el_text = document.createElement("span");
	span_action.setAttribute("class","watch-action-text");
	a_link.appendChild(span_action);
	var div_tabs = div_actions.getElementsByTagName("div")[0];
	div_tabs.insertBefore(div_tab,div_tabs.lastChild.previousSibling);
}

el_action.addEventListener("click", function() { 
	if(GM_getValue("mode","L") == "L") flashloaderOpen(window.document.location.href);
	else {
		var link = "http://www.flashload.net/popup.php?direct&url=" + (encodeURIComponent||escape)(window.document.location.href);
		window.open(link,"FlashLoader","fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=600,top=100,left=100");
	}
},false);

var language;
if(!language||language.length!=2) {
	var html = document.getElementsByTagName('html');
	if(html&&html.length)
		language = html[0].getAttribute("lang");
}
if(!language||language.length!=2) {
	var location = self.location.host.split(".");
	if(location&&location.length)
		language = location[0].length!=2?location[location.length-1]:location[0];
}
if(!language||language.length!=2)
	language = new String(); //default

var text = new Array();
switch(language) {
case "ru": text[0] = "скачать это видео"; text[1] = "закрыть"; break; //Russia
case "jp": text[0] = "このビデオをダウンロード"; text[1] = "閉じる"; break; //Japan
case "kr": text[0] = "이 동영상을 다운로드"; text[1] = "닫기"; break; //Korea
case "br": text[0] = "baixar o vídeo"; text[1] = "Fechar"; break; //Brasil
case "de": text[0] = "dieses video herunterladen"; text[1] = "Schließen"; break; //Germany
case "fr": text[0] = "télécharger cette vidéo"; text[1] = "Fermer"; break; //France
case "in": text[0] = "इस वीडियो डाउनलोड"; text[1] = "बंद करना"; break; //India
case "it": text[0] = "scaricare questo video"; text[1] = "Chiudere"; break; //Italia
case "nl": text[0] = "download deze video"; text[1] = "Luk"; break; //Dutch
case "pl": text[0] = "pobierz ten film wideo"; text[1] = "Blisko"; break; //Poland
case "hk": case "tw": text[0] = "下載該視頻"; text[1] = "关闭"; break; //Taiwan, Hong Kong
case "es": case "mx": text[0] = "descargar este vídeo"; text[1] = "Cerrar"; break; //Spain, Mexico
default: text[0] = "download this video"; text[1] = "Close"; break; } //Australia, United Kingdom, Canada, Ireland, New Zealand, Global
if(div_actions) {
	switch(language) {
	case "jp": text[0] = "ダウンロード"; break; //Japan
	case "kr": text[0] = "다운로드"; break; //Korea
	case "in": text[0] = "डाउनलोड"; break; //India
	case "hk": case "tw": text[0] = "下載"; break; //Taiwan, Hong Kong
	case "de": text[0] = text[0].split(' ').pop(); break; //last word
	default: text[0] = text[0].split(' ').shift(); break; } //first word
	text[0] = text[0].substr(0,1).toUpperCase()+text[0].substr(1);
}
el_text.appendChild(document.createTextNode(text[0]));

setTimeout(check_version,1000);
function check_version() {
	if(typeof GM_getValue("day") == "undefined") GM_setValue("day",(new Date()).getDay());
	if(GM_getValue("day") != (new Date()).getDay()) {
		GM_xmlhttpRequest({ method:"GET",url:"http://userscripts.org/scripts/review/28918.txt",
			onload:function(result) {
				if(result.responseText.indexOf("@version "+GM_getValue("version")) == -1 &&
					 confirm('A new version of the "YouTube Download" userscript for Greasemonkey is available.\n\nDo you want to update now?'))
						top.location.href = "http://userscripts.org/scripts/source/28918.user.js";
			}
		});
		GM_setValue("day",(new Date()).getDay());
	}
}

function switch_mode() {
	if(GM_getValue("mode","L") == "L") {
		GM_setValue("mode","P");
		alert("Download will now open in a popup.");	
	} else {
		GM_setValue("mode","L");
		alert("Download will now open in a layer.");
	}
}

var embed_display;
function flashloaderOpen(url) {
	embed_display = new Array();
	for(var embed_index=0;embed_index < document.embeds.length; embed_index++) {
		embed_display[embed_index] = document.embeds[embed_index].style.display;
		document.embeds[embed_index].style.display = "none";
	}
	
	var body = document.getElementsByTagName("body").item(0);
	var div_bg = document.createElement("div");
	div_bg.setAttribute("id", "flashloader_bg");
	div_bg.setAttribute("style", "position: absolute;top: 0pt;left: 0pt;margin-top: 0pt;margin-right: 0pt;margin-bottom: 0pt;margin-left: 0pt;padding-top: 0pt;padding-right: 0pt;padding-bottom: 0pt;padding-left: 0pt;background-color: #000000;opacity: 0.5;display: block");
	div_bg.style.zIndex = 100;
	div_bg.addEventListener("click",flashloaderClose,false);
	body.appendChild(div_bg);
	
	var div_window = document.createElement("div");
	div_window.setAttribute("id", "flashloader_window");
	div_window.setAttribute("style", "opacity: 0.95; position: absolute;background-color: #dddddd;margin: 0pt 0pt auto auto;padding: 1px 1px 0px 0px;float: left;width: 700px;display: block");
	div_window.style.zIndex = 200;
	body.appendChild(div_window);

	var div_close = document.createElement("div");
	div_close.setAttribute("style", "float: right");
	div_window.appendChild(div_close);
	
	var p_close = document.createElement("p");
	p_close.setAttribute("style", "font-size: 11px;font-family: tahoma;margin: 0px 2px 0px 0px;line-height: 16px;padding-right: 10px;padding-left: 18px;background-color: transparent;background-image: url(data:image/gif;base64,"+images["close"]+");background-repeat: no-repeat;background-attachment: scroll;background-x-position: left;background-y-position: center;color: #888888;cursor: pointer;margin-top:10px");
	p_close.addEventListener("click",flashloaderClose,false);
	p_close.innerHTML = text[1];
	div_close.appendChild(p_close);
	
	var div_content = document.createElement("div");
	div_content.setAttribute("style", "background-color: #ffffff;margin: 0px 0px 1px 1px;padding: 10px; background-image: url(data:image/gif;base64,"+images["bg"]+");background-repeat: repeat-x;text-align: left");
	div_window.appendChild(div_content);
	
	var iframe_content = document.createElement("iframe");
	iframe_content.setAttribute("height", "500px");
	iframe_content.setAttribute("width", "680px");
	iframe_content.setAttribute("frameborder", "0");
	iframe_content.setAttribute("marginheight", "0");
	iframe_content.setAttribute("marginwidth", "0");
	iframe_content.setAttribute("scrolling", "auto");
	iframe_content.setAttribute("allowtransparency", "true");
	iframe_content.setAttribute("src", "http://www.flashload.net/popup.php?direct&borderless&url=" + (encodeURIComponent||escape)(url));
	div_content.appendChild(iframe_content);
	
	flashloaderMove();
	window.addEventListener("resize",flashloaderMove,false);
	window.addEventListener("scroll",flashloaderMove,false);
}

function flashloaderClose() {
	for(var embed_index=0;embed_index < document.embeds.length; embed_index++) { document.embeds[embed_index].style.display = embed_display[embed_index]; }
	if(document.getElementById("flashloader_bg"))		 document.getElementsByTagName("body").item(0).removeChild(document.getElementById("flashloader_bg"));
	if(document.getElementById("flashloader_window")) document.getElementsByTagName("body").item(0).removeChild(document.getElementById("flashloader_window"));
	window.removeEventListener("resize",flashloaderMove,false);
	window.removeEventListener("scroll",flashloaderMove,false);
}

function flashloaderMove() {
	var div_bg = document.getElementById("flashloader_bg");
	div_bg.style.width = flashloaderGetDimension(0)[0] + "px";
	div_bg.style.height = flashloaderGetDimension(0)[1] + "px";
	
	var div_window = document.getElementById("flashloader_window");
	var top = Math.round((flashloaderGetDimension(2)[1] - parseInt(div_window.clientHeight)) / 2);
	if(top < 0) { top = 0; }
	top += flashloaderGetDimension(1)[1];
	var left = Math.round((flashloaderGetDimension(2)[0] - parseInt(div_window.clientWidth)) / 2);
	if(left < 0) { left = 0; }
	left += flashloaderGetDimension(1)[0];
	div_window.style.top = top + "px";
	div_window.style.left = left + "px";
}

function flashloaderGetDimension(type) { var dimensions = new Array(2); switch(type) { case 0: if(window.innerHeight && window.scrollMaxY) {	dimensions[0] = document.body.scrollWidth; dimensions[1] = window.innerHeight + window.scrollMaxY; } else if(document.body.scrollHeight > document.body.offsetHeight) { dimensions[0] = document.body.scrollWidth; dimensions[1] = document.body.scrollHeight;	} else { dimensions[0] = document.body.offsetWidth; dimensions[1] = document.body.offsetHeight;	}	break; case 1: if(self.pageYOffset) { dimensions[0] = self.pageXOffset; dimensions[1] = self.pageYOffset; } else if((document.documentElement) && (document.documentElement.scrollTop))	{	dimensions[0] = document.documentElement.scrollLeft; dimensions[1] = document.documentElement.scrollTop; } else if(document.body) { dimensions[0] = document.body.scrollLeft;	dimensions[1] = document.body.scrollTop; }	break; case 2: if(document.documentElement && document.documentElement.clientWidth) { dimensions[0] = document.documentElement.clientWidth; dimensions[1] = document.documentElement.clientHeight; } else if(self.innerWidth) { dimensions[0] = self.innerWidth; dimensions[1] = self.innerHeight; } else if(document.body) { dimensions[0] = document.body.clientWidth; dimensions[1] = document.body.clientHeight;	}	break; }	return(dimensions); }
	
var images = new Array();
images["bg"] = "R0lGODlhDwAwAPcAANDQ0dfX2d3d3uTk5ebm5unp6+7u7u7u8PPz9PT09Pf3+Pr6+/39/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAPADAAAAh7AAkAICCQ4MCCBQMYMKCQ4cKGDRMkECCR4sSKFRcMWKCR48aOHQs0aCCS5MiSJUceUMmywUqXDRCMlBlzpk0FI3E20Mlz5MgFP4M2ADq0AYORR40iXeqzqdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqrRoQADs=";
images["close"] = "R0lGODlhDgAOAPcAAJajrp2ptKOvuaq1wLG8xbfBybzG0MHL1MjQ2MzU3M/Y39DY39bd49rg5tzh59zi5+Dl6ujq7O7x9Pb3+Pv8/Pz8/Pz8/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAOAA4AAAh7ACNMuECwoMEJEShAUMCwoUMIFC4kcPCgosWKDhIQTNCgo8ePGi8gYMCAIEmTDBAQPLBgAcGWLxccIGgAgU2DNhEYIFigZwGDPn9eIECUYNGhRwcoJbj0gtIBBAVInUpVKsEAWLNqxXqhQgEAYMOKLVBBggWDaC9YkBAQADs=";