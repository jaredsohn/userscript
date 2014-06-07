// ==UserScript==
// @name          Stubar's odeo embed fix
// @description   Replaces Odeos player html textbox with valid XHTML
// @include       http://www.test.uswitch.com/*
// @include       https://www.test.uswitch.com/*
// @include       http://studio.odeo.com/audio/*
// @include       http://odeo.com/audio/*
// @include       http://www.odeo.com/audio/*
// ==/UserScript==
function convert(){
var o= document.getElementById("audio-blog-this-flash-html");
var p1 = document.createElement("div");
var p2 = document.createElement("object");
var pmovie = document.createElement("param");
var pquality = document.createElement("param");
var pflashvars = document.createElement("param");
if(o.value!=""){
	p1.innerHTML = o.value;
	
	p2.setAttribute("type","application/x-shockwave-flash");
	p2.setAttribute("data","http://odeo.com/flash/audio_player_gray.swf");
	p2.setAttribute("width","322");
	p2.setAttribute("height","54");
	
	pmovie.setAttribute("name","movie");
	pmovie.setAttribute("value",p1.childNodes[0].getAttribute("name"));
	pquality.setAttribute("name","quality");
	pquality.setAttribute("value",p1.childNodes[0].getAttribute("quality"));
	pflashvars.setAttribute("name","flashvars");
	pflashvars.setAttribute("value",p1.childNodes[0].getAttribute("flashvars"));
	
	p2.appendChild(pmovie);
	p2.appendChild(pquality);
	p2.appendChild(pflashvars);
	//work out mp3 url
	var flashvars = p1.childNodes[0].getAttribute("flashvars");
	var mp3 = flashvars.substr(flashvars.lastIndexOf("=")+1,flashvars.length -flashvars.lastIndexOf("="));
	
	
	o.innerHTML="";
	o.appendChild(p2);
	o.value = o.innerHTML;
	o.value+="<br /><a style=\"font-size: 9px; padding-left: 110px; color: #f39; letter-spacing: -1px; text-decoration: none\" href=\"http://odeo.com/audio/2196079/view\">powered by <strong>ODEO</strong></a><br /><a href=\"" + mp3 + "\">Download MP3</a>";
}
}
convert();






