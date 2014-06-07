// ==UserScript==
// @name           NicoStopper
// @namespace      http://d.hatena.ne.jp/Cyario/
// @description    The script is for those who are addicted to NicoNicoDoga which is a Japanese streaming site.
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

var time			= GM_getValue("NicoStopperTime", 3600);
var date			= GM_getValue("NicoStopperDate", 0);
var field			= document.createElement("div");

document.body.appendChild(field);
with(field.style){
  fontSize			= "12px";
  textAlign			= "center";
  left				=  0;
  bottom			=  0;
  width				= "93px";
  position			= "fixed";
  opacity			=  0.5;
  backgroundColor	= "#0099FF";
}

window.wrappedJSObject.onunload = function(){window.location.reload(true);};

if(window.parent == window){
	window.setInterval(function(){
		var date_tmp = (new Date).getDate();
		if(date_tmp != date){ GM_setValue("NicoStopperDate", date_tmp); time = 3600;}
		if(time > (30*60));
		else if(time <= (30*60) && time > (10*60)) field.style.backgroundColor="#FFFF00";
		else if(time <= (10*60) && time > 0      ){ with(field.style){backgroundColor="#FF0000";textDecoration="blink";color="#FFFFFF";}}
		else{
			document.open();
			document.write("<html><head><title>Access denied</title><\/head><body><b>Sorry... You are not allowed to access to NicoNicoDoga any more.<\/b><\/body><\/html>");
			document.close();
		}
		GM_setValue("NicoStopperTime", time--);
    	var min = Math.floor(time / 60) + 1;
    	var str = "You have only " + min + " minutes left";
    	field.innerHTML = str;
  	}, 1000);
}
