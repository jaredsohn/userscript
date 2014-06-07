// ==UserScript==
// @name        rheuma-online-BLICK
// @namespace   rheuma-online-BLICK
// @author		Dediggefedde
// @description Lesbarkeit per Klick!
// @include     http://www.rheuma-online.de/*
// @version     1.1
// ==/UserScript==

(function(){

if(window.self != window.top)return;

//Voreinstellung
var groeinst=18;//px
var abseinst=true;//absatz-vergrößerung
var liseinst=true; //liste vergrößern
var invert=false; //Farben invertieren
var kleinpagevar=false; //Seite für kleine Bildschirme anpassen
var scheinst=0;//Schriftart Georgia
var schriftliste=new Array("Georgia","Palatino Linotype","Book Antiqua", "Tahoma","Arial","Helvetica","Verdana","Times New Roman");
var schriftreihe="";

//Optik
function gros(){
	addstyle(""+
		".postbody .content {"+
		"	line-height:1.5em;"+
		"	font-family:/*schrift*/"+schriftreihe+"/*schrift*/;"+
		"	font-size:/**/"+groeinst+"px/**/;"+
		"	margin-left: 10px;"+
		"	margin-right: 7%;"+
		"	margin-top: 15px;"+
		"	text-align: left;"+
		"	letter-spacing: 1px;"+
		"	color: #003;"+
		"}"+
		".posts .content .bbcode_quote{"+
		"	line-height:1.5em;"+
		"	font-family:/*schrift*/"+schriftreihe+"/*schrift*/;"+
		"	font-size:/**/"+groeinst+"px/**/;"+
		"}"+
		".postbody h2.title {"+
		"	font-family:/*schrift*/"+schriftreihe+"/*schrift*/;"+
		"	font-weight:bold;"+
		"	font-size: /**/"+groeinst+"px/**/;"+
		"}"+		
		".postbody .content a {"+
		"	color: #BB5555;"+
		"	font-size: 14px;"+
		"	font-style: italic;"+
		"	text-decoration: underline;"+
		"}"+
		".postbody img.inlineimg {"+
		"	vertical-align: middle!important;"+
		"	margin: 0 4px;"+
		"}");
}

function absatz(){
	var contents=document.getElementById("posts").getElementsByClassName("content");
	for(var i=0;i<contents.length;i++)contents[i].innerHTML=contents[i].innerHTML.replace(/<br>(\s*<br>)+/gi,"<br>");

	addstyle("/*abs*/"+
		".postbody .content li {"+
			"margin-bottom: 1em;"+
		"}"+
		".postbody .content br {"+
		"	margin-bottom: 1em;"+
		"	content:' ';"+
		"	display:block;"+
		"}/*abs*/");
}

function kleinpage(){
	addstyle("/*kleinpage*/"+
	"div.postdetails div.userinfo {"+
		"display:inline-block;"+
	"}"+
	"div.postdetails div.postbody {"+
		"display:inline-block;"+
		"margin-left:0px;"+
	"}"+
	"#container_gesamt {"+
		"table-layout: fixed;"+
	"}"+
	"#container_links{overflow:hidden;width:20px;transition:width 0.5s;}"+
	"#container_links:hover{width:200px;}"+
	"/*kleinpage*/");
}

function Liste(){
	addstyle("/*list*/"+
	"li.threadbit {"+
		"margin: 2px 0 !important;"+
		"color: #000;"+
	"}"+
	"li.threadbit .pagination{"+
		"vertical-align: middle;"+
	"}"+
	"li.threadbit > div{"+
		"padding:5px;"+
		"font-style: /*schrift*/"+schriftreihe+"/*schrift*/;"+
		"}"+		
		".label {"+
		"	vertical-align: middle;"+
	"}"+
	"/*list*/");
}

function invertcolor(){
	addstyle("/*invert*/"+
	".posts .postbody{"+
		"background-color:#001;"+
	"}"+
	".posts .content .bbcode_quote{"+
		"background-color:#003;"+
	"}"+
	".postbody h2.title{"+
		"color:#fdd"+
	"}"+
	".posts .postbody .content{"+
		"color:#ffd"+
	"}"+
	"/*invert*/");
}

//bar
function insertbar(){
	var bar=document.createElement("div");
	bar.id="BLICK_bar";
	
	schriftreiher();
	var schriften="";
	for(var i=0;i<schriftliste.length;i++)schriften+="<option"+((i==scheinst)?" selected='selected'":"")+">"+schriftliste[i]+"</option>";	
	
	bar.innerHTML="<div style='width:300px;font: 22px/2em georgia, Palatino Linotype, Book Antiqua, Tahoma;padding: 20px;'><div class='blick_row'><span class='BLICK_title'>Textgröße:</span><span class='blick_button' id='blick_plus'>+</span><span class='blick_button' id='blick_minus'>-</span></div><div class='blick_row'><span class='BLICK_title'><input type='checkbox' id='blick_absver' alt='Absaetze vergroessern' "+((abseinst)?"checked='ckecked'":"")+"/><label for='blick_absver'>Absätze vergrößern</label></span></div><div class='blick_row'><span class='BLICK_title'><input type='checkbox' id='blick_listver' alt='Beitragsliste vergroessern' "+((liseinst)?"checked='ckecked'":"")+"/><label for='blick_listver'>Beitragsliste vergrößern</label></span></div><div class='blick_row'><span class='BLICK_title'><input type='checkbox' id='blick_invert' alt='Farben invertieren' "+((invert)?"checked='ckecked'":"")+"/><label for='blick_invert'>Farben invertieren</label></span></div><div class='blick_row'><span class='BLICK_title'><input type='checkbox' id='blick_klein' alt='Kleiner Bildschirm' "+((kleinpagevar)?"checked='ckecked'":"")+"/><label for='blick_klein'>kleiner Bildschirm</label></span></div><div class='blick_row'><span class='BLICK_title'>Schriftart: </span><select id='blick_select'>"+schriften+"</select></div></div>";
	
	document.body.appendChild(bar);	
	
	document.getElementById("blick_plus").addEventListener("click", function(){schriftvergr(true);}, false);
	document.getElementById("blick_minus").addEventListener("click", function(){schriftvergr(false);}, false);
	document.getElementById("blick_absver").addEventListener("click", function(){
		if(abseinst)document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*abs\*\/[\s\S]*?\/\*abs\*\//gi,""); else absatz();
		abseinst= !abseinst;
		speichern("abseinst",abseinst);
	}, false);
	document.getElementById("blick_listver").addEventListener("click", function(){
		if(liseinst)document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*list\*\/[\s\S]*?\/\*list\*\//gi,""); else Liste();
		liseinst= !liseinst;
		speichern("liseinst",liseinst);
	}, false);
	document.getElementById("blick_invert").addEventListener("click", function(){
		if(invert)document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*invert\*\/[\s\S]*?\/\*invert\*\//gi,""); else invertcolor();
		invert= !invert;
		speichern("invert",invert);
	}, false);
	document.getElementById("blick_klein").addEventListener("click", function(){
		if(kleinpagevar)document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*kleinpage\*\/[\s\S]*?\/\*kleinpage\*\//gi,""); else kleinpage();
		kleinpagevar= !kleinpagevar;
		speichern("kleinpagevar",kleinpagevar);
	}, false);
	document.getElementById("blick_select").addEventListener("click", function(){
		scheinst=document.getElementById("blick_select").selectedIndex;
		schriftreiher();		
		document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*schrift\*\/[\s\S]*?\/\*schrift\*\//gi,"/*schrift*/"+schriftreihe+"/*schrift*/");
		speichern("scheinst",scheinst);
	}, false);
	
	addstyle("#BLICK_bar{width:20px;overflow:hidden;position:fixed;transition:width 0.5s,opacity 0.5s, height 0.5s;-moz-transition: width 0.5s,opacity 0.5s, height 0.5s;-webkit-transition: width 0.5s,opacity 0.5s, height 0.5s;-o-transition: width 0.5s,opacity 0.5s, height 0.5s; right:0px;height:30px;background-color:#9ad;z-index:99999999;opacity:0.5;top:50px;border:2px ridge #ddf;border-top-left-radius:25px;border-bottom-left-radius:25px;}");
	addstyle("#BLICK_bar:hover{width:300px;opacity:1;height:300px;}");
	addstyle(".blick_button {"+
		"background-color: #DDDDFF;"+
		"border: 1px ridge #CCCCCC;"+
		"border-radius: 10px 10px 10px 10px;"+
		"cursor: pointer;"+
		"display: inline-block;"+
		"font: 40px/34px georgia;"+
		"height: 40px;"+
		"margin: 5px;"+
		"text-align: center;"+
		"vertical-align: middle;"+
		"width: 40px;"+
	"}");
	addstyle(".blick_button:hover {"+
		"background-color: #aaf;"+
	"}");
	addstyle(".blick_button:active {"+
		"background-color: #77d;"+
	"}");
	addstyle("#BLICK_bar input {"+
		"margin: 5px;"+
	"}");
	addstyle("#blick_select {"+
		"font: 20px "+schriftreihe+";"+
		"width:180px;"+
	"}");
}

//Technisches

function schriftreiher(){
	schriftreihe=schriftliste[scheinst];
	for(var i=0;i<schriftliste.length;i++)if(i!=scheinst)schriftreihe+=", "+schriftliste[i];
}

function schriftvergr(grosser){
	if(grosser)groeinst++;else groeinst--;
	document.getElementById("BLICK_style").innerHTML=document.getElementById("BLICK_style").innerHTML.replace(/\/\*\*\/\d+px\/\*\*\//gi,"/**/"+groeinst+"px/**/");
	speichern("groeinst",groeinst);
}

function addstyle(text){
	if(document.getElementById("BLICK_style")==null){
		var sty =document.createElement("style");
		sty.innerHTML=text;
		sty.id="BLICK_style";
		sty.setAttribute("type","text/css");
		document.head.appendChild(sty);
	}else{
		var sty =document.getElementById("BLICK_style");
		sty.innerHTML+=text;
	}
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function c_speichern(name, wert){
	var myDate = new Date();
	myDate.setDate(myDate.getDate()+1);
	document.cookie = name + "=" + escape(wert) + ";expires=" + myDate +";domain=.rheuma-online.de;path=/;";
}

function c_laden(name){
	var wert=document.cookie.indexOf(name+"=");
	if(wert==-1)return null;
	wert=document.cookie.substr(wert+name.length+1);
	return unescape(wert.substring(0,wert.indexOf(";")));
}
function s_speichern(name,wert){
	localStorage.setItem(name, wert);
}
function s_laden(name){
	return localStorage.getItem(name);
}

function start(){
	insertbar();	
	gros();
	if(document.getElementById("posts")!=null&&abseinst)absatz();
	if(liseinst)Liste();
	if(invert)invertcolor();
	if(kleinpagevar)kleinpage();
}

if(supports_html5_storage()){
	speichern=s_speichern;
	laden=s_laden;
}else{
	speichern=c_speichern;
	laden=c_laden;
}

if(laden("groeinst")!=null){groeinst=laden("groeinst");}
if(laden("abseinst")!=null){abseinst=laden("abseinst")=="true";}
if(laden("invert")!=null){invert=laden("invert")=="true";}
if(laden("liseinst")!=null){liseinst=laden("liseinst")=="true";}
if(laden("scheinst")!=null){scheinst=laden("scheinst");}
if(laden("kleinpagevar")!=null){kleinpagevar=laden("kleinpagevar");}

start();
})();