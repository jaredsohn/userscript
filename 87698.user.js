// ==UserScript==
// @name           SPIEGEL ONLINE Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Centered content and some beautifications
//
// @include        http://spiegel.de/*
// @include        http://*.spiegel.de/*
// @include        http://www.harvardbusinessmanager.de/*
// @include        https://www.harvardbusinessmanager.de/*
// @include        http://www.manager-magazin.de/*
// @include        http://www.buchreport.de/*
//
// @exclude        http://abo.spiegel.de/*
// @exclude        http://shop.spiegel.de/*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.4
// @lastupdated    2012-06-19
// 
// @history        0.1.4 added modifications for Video and Foto-Ticker 
// @history        0.1.3 added some modifications for subsites of spiegel online
// @history        0.1.2 script rewritten to change css-styles after update
// @history        0.1.1 better Photo Gallery support
// @history        0.1.0 Initial release
//
// ==/UserScript==
//------------------------------------------------------------------------------------------------------------------------------------

var DoThird = true

//Modify CSS

// Body
document.body.style.background = '#222';

// Main divs
if (document.getElementById('spWrapper')){
	document.getElementById('spWrapper').style.margin = '0 auto';
	document.getElementById('spWrapper').style.cssFloat = 'none';
	document.getElementById('spWrapper').style.minWidth = '900px';
	document.getElementById('spWrapper').style.maxWidth = '900px';
};
if (document.getElementById('spPageFooter')){
	document.getElementById('spPageFooter').style.cssFloat = 'none';
	document.getElementById('spPageFooter').style.margin = '0 auto';
	document.getElementById('spPageFooter').style.minWidth = '875px';
	document.getElementById('spPageFooter').style.maxWidth = '875px';
};
if (document.getElementById('spPageFooterWrapper')){
	document.getElementById('spPageFooterWrapper').style.background = '#222';
	document.getElementById('spPageFooterWrapper').style.borderTop = 'none';
	document.getElementById('spPageFooterWrapper').style.margin = '0 auto';
};
if (window.location.href.search(/http:\/\/www\.spiegel\.de\/schlagzeilen\/foto\//) > -1){
	if (document.getElementById('spHeader')){
		document.getElementById('spHeader').style.margin = '0 auto';
	};
};

// Fotostrecke
if (window.location.href.search(/http:\/\/www\.spiegel\.de\/fotostrecke\//) > -1){
	if (document.getElementById('spBigaHead')){
		document.getElementById('spBigaHead').style.marginTop = '-30px';
		document.getElementById('spBigaHead').style.height = '0px';
	};
	if (document.getElementById('spBreadcrumb')){
		document.getElementById('spBreadcrumb').style.marginTop = '26px';
		document.getElementById('spBreadcrumb').style.height = '6px';
	};
	if (document.getElementById('spBigaHeadline')){
		document.getElementById('spBigaHeadline').style.height = '10px';
		document.getElementById('spBigaHeadline').style.marginTop = '-14px';
	};
	if (document.getElementById('spPageFooter')){
		document.getElementById('spPageFooter').style.minWidth = '870px';
		document.getElementById('spPageFooter').style.maxWidth = '870px';
	};
};

// Video
if (window.location.href.search(/http:\/\/www\.spiegel\.de\/video/) > -1){
	if (document.getElementById('spVideoChannelNav')){
		document.getElementById('spVideoChannelNav').style.background = '#fff';
		document.getElementById('spVideoChannelNav').style.width = '980px';
	};
	if (document.getElementById('spBreadcrumb')){
		document.getElementById('spBreadcrumb').style.width = '980px';
	};
};

// einestages
if (window.location.href.search(/http:\/\/einestages\.spiegel\.de/) > -1){
	if (document.getElementById('huWrapper')){
		document.getElementById('huWrapper').style.cssFloat = 'none';
		document.getElementById('huWrapper').style.margin = '0 auto';
		document.getElementById('huWrapper').style.background = '#FFF';
	};
};

// Karrierespiegel
if (window.location.href.search(/http:\/\/www\.spiegel\.de\/karriere/) > -1){
	if (document.getElementById('spContentWrapper')){
		document.getElementById('spContentWrapper').style.paddingLeft = '10px';
	};
	if (document.getElementById('spHeaderKarriereMeta')){
		document.getElementById('spHeaderKarriereMeta').style.marginLeft = '-10px';
	};
};

if (DoThird == true){ 
	// Harvard Business Manager
	// Switch to https
	if (window.location.href.search(/http:\/\/www\.harvardbusinessmanager\.de/) > -1){
		window.location.href=window.location.href.replace(/http:\/\//, "https://");	
	};
	// Modify CSS
	if (window.location.href.search(/https:\/\/www\.harvardbusinessmanager\.de/) > -1){
		if (document.getElementById('hbmWrapper')){
			document.getElementById('hbmWrapper').style.cssFloat = 'none';
			document.getElementById('hbmWrapper').style.margin = '0 auto';
		};
	};

	// Manager Magazin
	if (window.location.href.search(/http:\/\/www\.manager-magazin\.de/) > -1){
		if (document.getElementById('mmWrapper')){
			document.getElementById('mmWrapper').style.cssFloat = 'none';
			document.getElementById('mmWrapper').style.minWidth = '0px';
		};
		if (document.getElementById('mmContentWrapper')){
			document.getElementById('mmContentWrapper').style.cssFloat = 'none';
			document.getElementById('mmContentWrapper').style.margin = '0 auto';
		};
		if (document.getElementById('mmFooter')){
			document.getElementById('mmFooter').style.cssFloat = 'none';
			document.getElementById('mmFooter').style.margin = '0 auto';
		};
	};

	// Buchreport
	if (window.location.href.search(/http:\/\/www\.buchreport\.de/) > -1){
		if (document.getElementById('content')){
			document.getElementById('content').style.cssFloat = 'none';
			document.getElementById('content').style.minWidth = '0px';
		};
		if (document.getElementById('mmContentWrapper')){
			document.getElementById('mmContentWrapper').style.cssFloat = 'none';
			document.getElementById('mmContentWrapper').style.margin = '0 auto';
		};
		if (document.getElementById('mmFooter')){
			document.getElementById('mmFooter').style.cssFloat = 'none';
			document.getElementById('mmFooter').style.margin = '0 auto';
		};
	};
};

//------------------------------------------------------------------------------------------------------------------------------------
