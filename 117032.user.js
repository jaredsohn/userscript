// ==UserScript== 
// @name			highlighting IBM developerworks
// @author			Atom Chen
// @namespace		http://www.iloveolive.info
// @include			 http://www.ibm.com/developerworks/*
// @description		syntax highlighting of source code at IBM developerworks
// @version			0.1
// ==/UserScript== 

function loadScript(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}

function loadCss(url){
	var css = document.createElement("link");
	css.href = url;
	css.type = "text/css";
	css.rel = "stylesheet";
	document.body.appendChild(css);
}

loadScript("http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js")
loadCss("http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css")

var allPres = document.getElementsByTagName("pre");
for(var i = 0; i < allPres.length; i++) {
	if(allPres[i].getAttribute("class") == "displaycode") {
		allPres[i].setAttribute("class", "prettyprint");
	}
}

document.body.setAttribute("onload", "prettyPrint()");
