// ==UserScript==
// @name           Better Repubblica.it
// @version        1.27
// @namespace      http://www.repubblica.it
// @description    Rimuove immondizia da repubblica.it / Removes garbage from repubblica.it.
// @include        http://repubblica.it/*
// @include        http://*.repubblica.it/*
// @updateURL      http://userscripts.org/scripts/source/88575.user.js
// @icon           http://www.repubblica.it/static/images/homepage/2010/favicon.ico
// ==/UserScript==

/**** HISTORY ****/
//1.27 Blocked a couple of ad boxes

//replaces br with space
function replaceBr(){
	
   var elems = document.getElementsByTagName("p");
   for (i=0; i<elems.length; i++) {
     elems[i].innerHTML = elems[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }
  
     var elems = document.getElementsByTagName("h3");
   for (i=0; i<elems.length; i++) {
     elems[i].innerHTML = elems[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }

	//document.body.innerHTML=document.body.innerHTML.replace(new RegExp("<br>","g"),' ');
	}

//thanks to n0nick http://userscripts.org/scripts/show/4097
function blockMetaRefresh(){

	// looking for three common cases: refresh, Refresh, REFRESH
	// if anyone knows how to do a case-insensitive query, that would be cool.. email sagiem at gmail dot com
	var refresh1 = document.evaluate("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
	
	//GM_log("Refresh: "+refresh1.snapshotItem(0));
	
	if(refresh1.snapshotItem(0) != null){
		var content = refresh1.snapshotItem(0).getAttribute("content");
		var yesh = 1;
	}
	
	if (yesh == 1){
		var stopTimer = window.setTimeout("window.stop();",
			(content-1)*1000); // in case load hasn't finished when the refresh fires
		window.addEventListener("load", function(){
		   try { window.clearTimeout(stopTimer); } catch(ex) {}
		   window.stop();
		   }, true);
		GM_log("stopped meta-refresh");
	} else {
		GM_log("no meta-refresh found");
	}
}

//disable given function
function disableFunction(func){
	
	document.body.appendChild(document.createElement('script')).innerHTML = "function "+func+"(){}";
	
	}
 
//main function
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '.col-C,ul.iniziativeeditoriali,.adv, .share-label,.share-delicious,.share-facebook,.share-oknotizie,.share-googlebuzz,.share-twitter, #OAS-titolo-vetrina,  #advtop, #stripa, .manchette-right, .manchette-left, #adv300x250r, #topheader, .super-vetrina, .ad-box, #mirago-iframe, .network-community, #superMoneyWidget-rotator, .from-section-rich, #adv-top, #Position3teaser, .repubblica-extra-2, #box-ilmiolibro, #dx-social-content {display:none !important}';
	
	//a little make-up
cssStyle += '.aperture, .cont-left {width:100%} .aperture p {font-size:15px; line-height:19px} .articles p.link {font-size:15px;line-height:17px;} .aperture {border-bottom:2px solid #DBDBDB;} .apertura {border-bottom:2px solid #DBDBDB;} .riaperture-enfasi-small {width:550px !important; padding-left:10px} .riaperture-enfasi p {font-size:15px; line-height:19px} .riapertura {width:48%} .riapertura-1 {padding-bottom:30px !important} .riapertura h2 {font-size:21px;line-height:22px;margin-bottom:3px;}.riapertura h3 {font-size:20px;line-height:22px;} .riapertura-large p {font-size:13px; line-height:17px} .riapertura-large p.link {font-size:13px;line-height:16px;} .riapertura-large h3 {font-size:20px;line-height:22px;} .riapertura-large h2 {font-size:21px;line-height:22px;} .cont-AB{width:100% !important} .col-B{width:550px !important; float:left} .col-A{width:420px !important; float:right} h3.interstitial img{display:none} .col-B p {font-size:15px;line-height:18px;} .col-B h3 {font-size:20px;line-height:23px;} .col-A li{font-size:110%; line-height:16px !important} .multimedia{border:0; border-left:1px solid #2992C1;} body {background:url("http://www.repubblica.it/static/images/homepage/2010/body-gray.png") repeat-y scroll center center #EFEFEF !important} .logo{float:none} #container, #bgspot, #newprefooter, #newfooter {margin:auto !important; float:none} #newfooter{width:990px}';

  //add CSS
	addGlobalStyle(cssStyle);
	
	//modifiers for home page only
	if (window.location.href == "http://www.repubblica.it/" || window.location.href == "http://repubblica.it/" ) {
		replaceBr();
	}	
	
	// break moronic refresh of the page
	blockMetaRefresh();
	
	for(h=1;h<10;h++) {unsafeWindow.clearTimeout(h);}
	
	//disable functions
	disableFunction("OAS_RICH");
	
}

)()