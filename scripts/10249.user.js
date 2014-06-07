// ==UserScript==
// @name           Woot Off Bar to Percent
// @include        http://www.woot.com/Default.aspx
// @include        http://www.woot.com
// @include        http://www.woot.com/
// @include        http://www.woot.com/Errors/*
// @exclude        http://www.woot.com/WantOne.aspx
// ==/UserScript==

if (/Errors/.test(window.location)) {
	// If we're in an error page, forward back to woot.
	window.location.href = 'http://www.woot.com/';
}

var woot = document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff');

if (!woot) return;

if (document.getElementsByClassName('soldOut').length>0) {
	// If sold out refresh every second.
	setTimeout(refresh,1000);
} else {
	// Refresh every 7.5 seconds
	setTimeout(refresh,7500);
}

var percent = parseInt(document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOffProgressBarValue').getAttribute('style').match(/\d+/)[0],10);
var title   = document.getElementsByTagName('h2')[0].innerHTML;
var price   = document.getElementsByTagName('h3')[0].innerHTML;
var wootbar = document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOffProgressBar');

var div = wootbar.appendChild(document.createElement('div'));
	div.style.position = 'absolute';
	div.style.top = '0px';
	div.style.height = '17px';
	div.style.width = '100%';
	div.style.textAlign = 'center';
	div.style.fontSize = '15px';
	div.innerHTML = (100-percent) +'% Sold';

document.title = 'wootoff: '+ price +' | '+ (100-percent) +'% | '+ title;

function refresh() {
	window.location.href = window.location.href;	
}