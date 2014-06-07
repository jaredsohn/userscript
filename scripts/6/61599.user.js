// ==UserScript==
// @name           Simple Swoopo Bot
// @namespace      swoopo
// @include        http://www.swoopo.de/*
// ==/UserScript==

//var evaluator = new XPathEvaluator();
//var result = evaluator.evaluate("/html/body/center/div/div[3]/div[9]/div[2]/div[2]/div[2]/div/div[7]/table/tbody/tr/td[2]", document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//maxPreis = format_geld(result.singleNodeValue.innerHTML);

var auctionid = document.getElementById('gebotsbutton').innerHTML;
var auctionid = parseInt(auctionid.substr(auctionid.indexOf("place_bid")+11, 6));

function bieten() {
	// REMOVE TO ARM
	//unsafeWindow.place_bid(auctionid, 'fehlermeldung', '123', '1', 1);

	bietcounter = parseInt(document.getElementById('beobachten').innerHTML);
	var bietcounter = bietcounter+1;
	document.getElementById('beobachten').innerHTML = bietcounter;
	
	clearInterval(steuerung);
	document.getElementById('ptext').innerHTML = "Geboten...8s Pause";
	window.setTimeout(starter, 8000);
}

function starter() {
	steuerung = setInterval(runner, 100);
}

function runner() {
	document.getElementById('ptext').innerHTML = "";
	var errormsg = "";
	var rest = document.getElementById('countertime').innerHTML;
	var rest_h = parseInt(parseFloat(rest.substr(0, 2)));
	var rest_m = parseInt(parseFloat(rest.substr(3, 2)));
	var rest_s = parseInt(parseFloat(rest.substr(6, 2))); //wg parseInt-Bug bei 09=0
	var preis = format_geld(document.getElementById('a_current_price').innerHTML);
	//var bishKosten = format_geld(document.getElementById('a_bid_amount_placed').innerHTML);
	var ButlerWarner = document.getElementById('stats_test').innerHTML;
	var num_bidders = parseInt(document.getElementById('num_bidders_h').innerHTML);
	
	if (ButlerWarner.indexOf("BietButler")>1) {
		errormsg = "Stopp! "+ButlerWarner.match(/BietButler/g).length+" BietButler bei den letzten 10 Geboten<br />";
		if (num_bidders<15) errormsg = "";
		errormsg = "";
	}
	if (num_bidders>20) errormsg = errormsg + "Stopp! Zu viele Interessenten<br/>";
	//if (bishKosten > 1.5) errormsg = errormsg + "Stopp! Bereits "+bishKosten+"€ geboten. Limit erreicht.";
	if (preis>130) errormsg = errormsg + "Stopp! Zu teuer, über 130€<br/>";
	if (preis<40) errormsg = errormsg + "Zu billig, unter 40€<br>";
	if (errormsg != "") {
		document.getElementById('ptext').innerHTML = errormsg;
	} else {
		if (rest_h==0 && rest_m==0 && rest_s < 3) {
			document.getElementById('ptext').innerHTML = "Biete!"+rest_s;
			bieten();
		}
	}
	document.getElementById('ptext').innerHTML = document.getElementById('ptext').innerHTML+"<br />Warte... "+rest;
}

function unix_time() {
	var now = new Date();
	return parseInt(now.getTime().toString().substring(0,10));
}

function format_geld(geld) {
	var geld = geld.replace(".","");
	var geld = geld.replace(",",".");
	var geld = parseFloat(geld);
	return geld;
}

var Jetzt = new Date();
document.getElementsByName('product_details').innerHTML = "Beobachtet seit "+Jetzt.toLocaleString();
document.getElementById('beobachten').innerHTML = "0";
document.getElementById('ptext').innerHTML = "";
steuerung = setInterval(runner, 100);