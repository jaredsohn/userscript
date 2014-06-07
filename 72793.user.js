// ==UserScript==
// @name           Danske aviser - Printudgave af artikler
// @description    Skifter til siden med udskriftsvenlig udgave. Virker på Berlingske, JyllandsPosten, Politiken, BT, Ekstrabladet, epd.dk og Erhvervsbladet, 
// @version        1.0
// @include        http://bt.dk/*
// @include        http://www.bt.dk/*
// @include        http://politiken.dk/*
// @include        http://www.politiken.dk/*
// @include        http://ibyen.dk/*
// @include        http://www.ibyen.dk/*
// @include        http://ekstrabladet.dk/*
// @include        http://www.ekstrabladet.dk/*
// @include        http://epn.dk/*
// @include        http://www.epn.dk/*
// @include        http://berlingske.dk/*
// @include        http://www.berlingske.dk/*
// @include        http://jp.dk/*
// @include        http://www.jp.dk/*
// @include        http://erhvervsbladet.dk/*
// @include        http://www.erhvervsbladet.dk/*
// @include        http://business.dk/*
// @include        http://www.business.dk/*
// @include        http://borsen.dk/*
// @include        http://www.borsen.dk/*
// ==/UserScript==


   document.body.setAttribute("onload", ""); 
	var nr;
	var allDivs, thisDiv, hoved, tekst, indholdtekst, indholdhoved;

	var url = document.location.href;
	// BT
	if (url.match("bt") ) {
		if (url.match("print") == null){
			var tekst = document.getElementsByTagName("meta");
			for (i = 0; i < tekst.length; i++) {
				if (tekst[i].name == "node-id"){
					url = "http://www.bt.dk/node/" + tekst[i].content +"/print";
				};
			};
			if (document.location.href != url ) {
				document.location.replace(url)
			}
		};
	} ;
	if (url.match("berlingske.dk") ) {
		if (url.match("print") == null){
			var tekst = document.getElementsByTagName("meta");
			for (i = 0; i < tekst.length; i++) {
				if (tekst[i].name == "node-id"){
					url = "http://www.berlingske.dk/node/" + tekst[i].content +"/print";
					i = tekst.length;
				};
			};
			if (document.location.href != url ) {
				document.location.replace(url)
			}
		}
	} 
	if (url.match("business.dk") ) {
		if (url.match("print") == null){
			var tekst = document.getElementsByTagName("meta");
			for (i = 0; i < tekst.length; i++) {
				if (tekst[i].name == "node-id"){
					url = "http://www.business.dk/node/" + tekst[i].content +"/print";
					i = tekst.length;
				};
			};
			if (document.location.href != url ) {
				document.location.replace(url)
			}
		}
	} 
	if (url.match("erhvervsbladet.dk") ) {
		if (url.match("print") == null){
			var tekst = document.getElementsByTagName("meta");
			for (i = 0; i < tekst.length; i++) {
				if (tekst[i].name == "node-id"){
					url = "http://www.erhvervsbladet.dk/node/" + tekst[i].content +"/print";
					i = tekst.length;
				};
			};
			if (document.location.href != url ) {
				document.location.replace(url)
			}
		}
	} 
	if ((url.match("politiken.dk") || url.match("ekstrabladet.dk") || 
	      url.match("ibyen.dk")) && (url.match("print")  == null) 
	      //&& (url.match("article"))
	      && /[0-9][0-9][0-9]/.test(url)
	    ) {
		url = url + "?service=print";
			if (document.location.href != url ) {
				document.location.replace(url)
			}
	}
	if ( (url.match("epn.dk") || (url.match("jp.dk")))&& (url.match("printversion") == null) && (url.match("article"))) {
		url = url + "?service=printversion";
			if (document.location.href != url ) {
				document.location.replace(url)
			}
	}
	
	if (url.match("borsen.dk") ) {
		document.body.setAttribute("onload", ""); 
		if (url.match("\/nyhed\/") ) {
			document.getElementById("basicheader").innerHTML="";
			tekst = document.getElementById("content");
			indholdtekst = tekst.innerHTML;
			document.body.innerHTML = '<dir><a href="http://www.borsen.dk">B&oslash;rsen</a><br></div>' + indholdtekst;
		};
	};