// ==UserScript==
// @name           GR-Tools | Latest Threads Highlighter
// @namespace      http://gr-tools.justlep.net/
// @description    Hebt auf der Seite "Beiträge der letzten zwei Wochen" im Club Center die Beiträge der letzten 3 Tage hervor.
// @include        http*://83.98.143.20/*myuser/*page=club
// @include        http*://83.98.143.20/*myuser/*page=club*subPage=forum*
// @include        http*://www.gayromeo.com/*myuser/*page=club
// @include        http*://www.gayromeo.com/*myuser/*page=club*subPage=forum*
// @include        http*://www.planetromeo.com/*myuser/*page=club
// @include        http*://www.planetromeo.com/*myuser/*page=club*subPage=forum*
// @version $Revision: 1.5 $
// @date    $Date: 2012/05/24 20:22:36 $
// @author LeP <gr-tools@justlep.net>
// @icon data:image/gif;base64,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%3D
// ==/UserScript==


var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	doc = (self.wrappedJSObject || self).document,
	today = new Date(),
	getDayRegex = function(date) {
		if (!date) return /\d{1,2}\.[a-z]{3}\.\d{4}/i;
		var day = date.getDate(),
			dayPrefix = (day<10)? '0' : '',
			year = date.getFullYear(),
			monthName = MONTHS[date.getMonth()];
		return new RegExp(dayPrefix + day + '\\.' + monthName + '\\.' + year);
	},
	st = doc.createElement('style'),
	regexes = {/*today:null, todayMinus1:null, todayMinus2:null */};

// prepare regexes..
regexes['today exact'] = getDayRegex(today);
today.setDate(today.getDate() - 1);
regexes['today minus1'] = getDayRegex(today);
today.setDate(today.getDate() - 1);
regexes['today minus2'] = getDayRegex(today);
regexes['today older'] = getDayRegex();

// prepare styles..
st.type = 'text/css';
st.innerHTML =  'tr.today {font-weight:bold}' +
				'tr.today.exact {background:#B4FF7C !important}' +
				'tr.today.minus1 {background:#DEFFC6 !important}' +
				'tr.today.minus2 {background:#EEFFE2 !important}'+
				'tr.today.older td, tr.today.older td * {color:#999 !important; font-weight:normal}';
doc.getElementsByTagName('head')[0].appendChild(st);

var tds = doc.getElementById('content').getElementsByTagName('td');
for (var i=tds.length-1; i>=0; i--) {
	var td = tds[i];
	
	if (td.align != 'right') continue;
	
	for (var k in regexes) {
		if (!regexes[k].test( td.innerHTML||'' )) continue;
		td.parentNode.className = (td.parentNode.className||'') + k;
		break;
	}
}