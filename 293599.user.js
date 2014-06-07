// ==UserScript==
// @name        zive.cz - spojeni kapitol do jedne stranky
// @namespace   monnef.tk
// @author      moen
// @description prednacte vsechny kapitoly vybraneho clanku do otevrene stranky
// @include     http://www.zive.cz/*
// @version     2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// moje zkusenosti s JavaScriptem a jQuery nejsou zavratne,
// takze pokud odhalite chyby nebo vykonostni nedostatky,
// prosim napiste mi :)

// ----------------------------------
// -- zacatek uzivatelskeho nastaveni

// onlyPartialHide - nastaveni zpracovani vybranych
//   elementu (napr. tlacitka pro navigaci mezi kapitolami, seznam kapitol)
// true - pouze zpruhledneni 
// false - uplne skryti
var onlyPartialHide = false;

// pokud zapnuto (true), pak pro nacitani dalsich kapitol vlozi nahodne
// dlouhy cekaci interval
var insertWaiting = true;
var waitingMin = 250; // ms
var waitingMax = 2500; // ms

// -- konec uzivatelskeho nastaveni
// ----------------------------------

var debug = false;
var logTitle = "[chaptJoiner]";

function log(s){
	console.log(logTitle + " " + s);
}

function logD(s){
	if(debug) console.log(logTitle + "[D] " + s);
}

this.$ = this.jQuery = jQuery.noConflict(true);

log("started");
logD("debug output");

function getNextLink(mainAr) {
	return $(".button-row a.chapter-next", mainAr).filter(function(index){
		return $(this).html().indexOf("Následující kapitola") != -1;
	});
}

function getMainArticleDiv(page) {
	return $("#main-article", page);
}

var mainAr = getMainArticleDiv($("html"));
if(mainAr.length === 0){
	logD("main article not found");
	return;
}
if(debug) mainAr.css("border", "1px solid red");

// --

function appendNextChapter(newMainAr){
	mainAr.html(mainAr.html() + 
		"<br>\n<!-- Inserted by " + logTitle + " -->\n" +
		newMainAr.html());
}

var applyHiding = function (idx){
	var elem = $(this);
	if(onlyPartialHide){
		elem.css("opacity", "0.1");
	}else{
		elem.hide();
	}
}

function makeFinalTouches(){
	var sigId = "chaptJoinerSig";
	$(".button-row a.chapter-next, .button-row a.chapter-previous").each(applyHiding);
	mainAr.append($("<div id='" + sigId + "'>Skript spojující kapitoly do jedné stránky vám napsal <a href='http://monnef.tk'>moen</a>.</div>"));
	$("#" + sigId).
		css("text-align", "right").
		css("font-size", "120%");
	$("div.box .box-heading span").filter(function(i){ return $(this).html().indexOf("Kapitoly článku") != -1 }).
		parent().parent().parent().each(applyHiding);
}

function queueNextChapter(url){
	$.ajax({url: url}).done(function(data){
		logD("got response, parsing");
		var page = $.parseHTML(data);
		logD("parsed");
		var subMainAr = $("#main-article", page);
		logD("subMainAr: " + subMainAr);
		appendNextChapter(subMainAr);
		processCurrMainAr(subMainAr, false);
	});
}

function processCurrMainAr(currentMainAr, isFirst){
	var linkToNext = getNextLink(currentMainAr);
	if(linkToNext.length === 0){
		logD("next link not found");
		if(!isFirst) makeFinalTouches();
		return;
	}else{
		logD("link found");
	}
	var linkTarget = linkToNext.prop('href');
	if(debug){
		linkToNext.parent().css("border", "1px dashed blue");
		logD("link points @ "+linkTarget);
	}
	var toFire = function() { queueNextChapter(linkTarget); };
	if(insertWaiting){
		var ms = Math.floor(Math.random() * (waitingMax - waitingMin)) + waitingMin;
		logD("waiting for " + ms + "ms");
		window.setTimeout(toFire, ms);
	}else{
		toFire();
	}
}

processCurrMainAr(mainAr, true);
