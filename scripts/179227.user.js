// ==UserScript==
// @id             doc-ubuntu-fr-delai-depuis-maj-en-haut@http://userscripts.org/users/87056
// @name           Doc ubuntu-fr: Délai depuis maj en haut.
// @version        0.3
// @namespace      http://userscripts.org/users/87056
// @author         jok-r
// @description    Affiche les dates de mise à jour des pages de la doc en haut de celles-ci. Ça permet de voir rapidement si une page est obsolète ou pas.
// @homepage
// @updateURL      https://userscripts.org/scripts/source/179227.meta.js
// @downloadURL    https://userscripts.org/scripts/source/179227.user.js
// @icon
// @screenshot
// @include        http://doc.*ubuntu-fr.org/*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==

// =================================================================================================
// source: http://wiki.greasespot.net/Get_Elements_By_CSS_Selector
function $$(xpath,root) {
	xpath = xpath
		.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
		.replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
		.replace(/#([\w-]+)/g, '[@id="$1"]')
		.replace(/\/\[/g,'/*[');
	str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	xpath = xpath
		.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
		.replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
		.replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	var got = document.evaluate(xpath, root||document, null, 5, null);
	var result=[];
	while (next = got.iterateNext())
		result.push(next);
	return result;
}

// source: http://wiki.greasespot.net/Create_DOM_Structure
function createEl(elObj, parent) {
	var el;
	if (typeof elObj == 'string') {
		el = document.createTextNode(elObj);
	}
	else {
		el = document.createElement(elObj.n);
		if (elObj.a) {
			attributes = elObj.a;
			for (var key in attributes) if (attributes.hasOwnProperty(key)) {
				if (key.charAt(0) == '@')
					el.setAttribute(key.substring(1), attributes[key]);
				else
					el[key] = attributes[key];
			}
		}
		if (elObj.evl) {
			el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
		}
		if (elObj.c) {
			elObj.c.forEach(function (v, i, a) { createEl(v, el); });
		}
	}
	if (parent)
		parent.appendChild(el);
	return el;
}
// =================================================================================================

//
function dateDiff2(date1, date2) {
	var years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
	var origDate1	= new Date(date1);	// original date1
	var origDate2	= new Date(date2);	// original date2
	//console.log('tmpDate1: ' +tmpDate1);

	var tmpDate		= new Date(origDate1); // intermediate date for incrementing years, months

	if(date1 < date2){
		// Années -----------------------
		//console.group('years');
		//while(tmpDate1 <= date2){
			//years += 1;
			//tmpDate1.setFullYear(tmpDate1.getFullYear() + years);
			//console.log('tmpDate1+' +years+'year(s)= ', tmpDate1);
		//}
		//years -=1;
		//tmpDate1.setFullYear(tmpDate1.getFullYear()-1);
//
		//console.log('Diff year(s)=', years);
		//console.info('tmpDate1: ' +tmpDate1);
		//console.groupEnd();

		// Mois ---------------------------
		var lockedDate = new Date(date1);
		console.info('lockedDate =' +lockedDate);
		console.group('months');
		while(date1 <= date2){
			months += 1;
			date1 = new Date(lockedDate); // date1 is temporary date
			console.info('lockedDate =' +lockedDate);
			console.info('date1 =' +date1);
			date1.setMonth(date1.getMonth() + months);
			console.log('date1+' +months+'month(s)= ', date1);
		}
		months -=1;
		date1 = lockedDate; // date1 is temporary date
		date1.setMonth(date1.getMonth() + months);
//
		//if (date1 <= date2) {
			//months += 1;
			//date1 = lockedDate;
			//date1.setMonth(date1.getMonth() + months);
			//
		//} else {
			//months -= 1;
			//date1 = lockedDate;
			//date1.setMonth(date1.getMonth() + months);
		//}

		console.log('Diff month(s)=', months);
		console.info('date1: ' +date1);
		console.groupEnd();


	}
	return years +' ans ' +months +' mois ' +dateDiff(date1, date2);
}

// =============
function dateDiff(date1, date2){
	var milliseconds, seconds, minutes, hours, days;

	timediff		=	date2-date1;
	milliseconds	=	Math.floor(timediff %1000);
	seconds			=	Math.floor(timediff/1000)%60;
	minutes			=	Math.floor(timediff/60000)%60;
	hours			=	Math.floor(timediff/3600000)%24;
	days			=	Math.floor(timediff/86400000);

	return days +'j ' +hours +'h ' +minutes +'min ';
}

console.info('Début du script');
// Récupération des infos de mise à jour
var infoMaj = $$('div#pageinfo')[0].textContent; // informations de la dernière modification
var resul = /((\d{2}\/){2}\d{4}),\s(\d{2}:\d{2})\s*(par)*\s*(.*)/gi.exec(infoMaj); // récuperation des infos
console.log('resul =', resul);

var dateMaj = new Date(resul[1].replace(/\b(\d{2})\/(\d{2})\/(\d{4})/g, '$2\/$1\/\$3')+' '+resul[3]);
var now 	= new Date();
//var dateMaj = new Date('30 Jan 2013 18:32');
//437lclvar now 	= new Date('30 Apr 2013 18:32');
//dateMaj.setMonth(dateMaj.getMonth() + 2);
console.warn(dateMaj);
console.info('dateMaj=', dateMaj);
console.info('now=', now);

var boxMsg
boxMsg= 'Mise à jour: le <strong>' +resul[1] +'</strong> à <strong>' +resul[3] +'</strong> - <strong>' +resul[5] +'</strong>';
boxMsg+= '<br/>Il y a <strong>' +dateDiff2(dateMaj, now) +'</strong>';

// Ajout d'un bloc contenant ces infos après le fil de piste mais avant d'éventuels blocs d'information (note de redirection, etc...).
var majBox = createEl({n: 'div', a: {'@class': 'majbox', 'innerHTML': boxMsg}})
$$('div#main')[0].insertBefore(majBox, $$('div#main/div#pagerror/following-sibling::*')[0]);

// Ajout d'un style
GM_addStyle('.majbox{background:#dcc089; border-radius:6px; margin:1em auto; padding:7px 10px 5px 32px; text-align:right;}');
