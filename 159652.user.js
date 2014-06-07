// ==UserScript==
// @name           Disface
// @namespace      net.woonet.disface
// @description    Azok számára, akik nem akarnak megosztani semmit, amíg nem látták azt.
// @author         Daniel Senti
// @copyright      (C) 2013  Daniel Senti
// @include        http://szilvasbukta.com/*
// @include        http://napivicc.com/*
// @include        http://6perc.com/*
// @include        http://6perc.net/*
// @include        http://humordonor.hu/*
// @include        http://humormaffia.hu/*
// @version        1.0.2
// ==/UserScript==

var loc = window.location.href;

if (loc.match(/szilvasbukta\.com\/post/)) {
	$("#mutat").remove();
	$("#rejtett").show();
	$("#slider").remove();	// beúszó reklám
	//$("#contentCenter div.content > div:eq(1)").remove();	// Csatlakozz hozzánk Facebook-on
} else if (loc.match(/6perc/)) {
	var element = document.getElementById("slider");
	element.parentNode.removeChild(element);
	var bb = document.getElementsByTagName('table')[1].getElementsByTagName('table')[2];
	bb.parentNode.removeChild(bb);
} else if (loc.match(/humormaffia/)) {
	//$("#exposeMask").remove();
	//$("#overlay").remove();
	var ugyespopup = document.getElementById("ugyespopup");
	ugyespopup.parentNode.removeChild(ugyespopup);
	var tw = document.getElementById('text-64').getElementsByClassName('textwidget')[0];
	tw.parentNode.removeChild(tw);
	var ad = document.getElementById('text-64').getElementsByTagName('div')[0];
	ad.parentNode.removeChild(ad);
} else if (loc.match(/napivicc.com\/.+-kepek/)) {
	if ($("meta[http-equiv=refresh]").length)	// meta refresh ellen
		$(window).bind("beforeunload", function() { return "Kattints a maradás az oldalon gombra!"; });
	var div = $("div[id^=post-] div.entry");
	div.find("> a:first").remove();
	div.find("div[id^=div]").show();
	$("#browseratfooter_background").remove();	// alsó ad
} else if (loc.match(/humordonor/)) {
	var element = document.getElementById("kapu");
	element.parentNode.removeChild(element);
	setTimeout(function(){document.getElementsByClassName('size-full')[0].style.display = '';}, 500);

}