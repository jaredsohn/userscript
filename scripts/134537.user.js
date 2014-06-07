// ==UserScript==
// @name        LOR Rainbow Tracker
// @namespace   xor9.ru/lor__rainbow_tracker
// @include       http*://www.linux.org.ru/tracker*
// @include       http*://linux.org.ru/tracker*
// ==/UserScript==
//
// License: GPL
// Author:  ollowtf ( http://www.linux.org.ru/whois.jsp?nick=ollowtf )
// 
// based on LOR Tracker filter (http://userscripts.org/scripts/review/27005)
// by sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
//
// Version: 0.3

// ------------------------------------------------------------------------

var jq;

if (typeof(GM_log) == 'function') {
	// For FF, Mozilla (with greasemonkey sandbox)
	jq = unsafeWindow.$;
} else {
	// For Epiphany, Opera
	jq = $;
}

// ---

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function hsvToRgb(h,s,v) {  
  
    var s = s / 100,  
         v = v / 100;  
  
    var hi = Math.floor((h/60) % 6);  
    var f = (h / 60) - hi;  
    var p = v * (1 - s);  
    var q = v * (1 - f * s);  
    var t = v * (1 - (1 - f) * s);  
  
    var rgb = [];  
  
    switch (hi) {  
        case 0: rgb = [v,t,p];break;  
        case 1: rgb = [q,v,p];break;  
        case 2: rgb = [p,v,t];break;  
        case 3: rgb = [p,q,v];break;  
        case 4: rgb = [t,p,v];break;  
        case 5: rgb = [v,p,q];break;  
    }  
  
    var r = Math.min(255, Math.round(rgb[0]*256)),  
        g = Math.min(255, Math.round(rgb[1]*256)),  
        b = Math.min(255, Math.round(rgb[2]*256));  
  
    return 'rgb('+r+','+g+','+b+')';  
  
}     

// get rows
var jTR = jq('div.forum table.message-table tbody tr');

jTR.each(function() {
		
	var firstTd = jq("td:first", this)[0];
	
	// section coloriser
	var sectionLink = jq("td:first a.secondary", this)[0];
	var url = sectionLink.getAttribute('href');
	var hash = hashCode(url);
	var color = hsvToRgb(Math.abs(hash) % 360,39,78);
	var styleText = 'font-weight: bold; text-decoration: none !important; color: '+color+' !important;';
	sectionLink.setAttribute('style', styleText);
		
	// unconfirmed
	var isUnconfirmed = firstTd.innerHTML.indexOf('не подтверждено') != -1;
	if (isUnconfirmed==1) {
		firstTd.innerHTML=sectionLink.outerHTML + (isUnconfirmed ? ' ***' : '');
	}
});

