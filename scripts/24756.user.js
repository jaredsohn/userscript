// ==UserScript==
// @name          Google Own Language
// @description   Adds linkage to google.com's results in prefered (NL/EN)) language
// @include       *.google.*q=*
// @version       0.5b

// ==/UserScript==
/*
* Author: Korneel Wever (korneelwever@gmail.com)
* Version: 0.5
* use de GM menu to set country codes and linksize.
*/
GM_registerMenuCommand('Set Country Codes', setCodes);
GM_registerMenuCommand('Set Font Size', setSize);
var a_country = GM_getValue('a_country', 'nl,en');
var a_country = a_country.split(',');
var linkSize = GM_getValue('linkSize', '10px');
searchLanguages();

function searchLanguages(){
	newURL = window.location.href.replace(/hl=[\w]{2,}/, ''); //remove old params.
	newURL = newURL.replace(/&$/, '');
	newURL = newURL.replace(/&lr=[\w_]{2,}/, '');
	newURL = newURL.replace(/&meta=[\w\d_%]{2,}/, '');
	newURL = newURL.replace(/&btnG=[\w\+]{2,}/, '');
	newURL = newURL.replace(/&ned=[\w\+]{2,}/, '');
	activeCountry = document.domain.split('.')[2];
	activeCountry == 'com' ? activeCountry = 'en' : ''; //swap for com to english
	if(window.location.href.indexOf('hl=', 0) != -1){ //swap to url param
		activeCountry = window.location.href.substring(window.location.href.indexOf('hl=', 0)+3,window.location.href.indexOf('hl=', 0)+5)
	}
	pN = document.forms[0].elements[2].parentNode;
	if(pN.nextSibling)
	{
		pN.nextSibling.vAlign = 'top';
	}
	tN = document.createElement('span');
	tN.appendChild(document.createElement('br'));
	tN.style.fontSize = linkSize;
	for(i=0; i<a_country.length; i++)
	{
		if(activeCountry != a_country[i]){
			a = document.createElement('a');
			a.innerHTML = a_country[i];
			a.href = newURL+'&hl='+a_country[i];
			tN.appendChild(a);
			tN.innerHTML += '&nbsp;';
			a = document.createElement('a');
			a.innerHTML = a_country[i]+'-'+a_country[i];
			a.href = newURL+'&hl='+a_country[i]+'&lr=lang_'+a_country[i];
			tN.appendChild(a);
			tN.innerHTML += '&nbsp;';
		}
	}
	pN.appendChild(tN);
}
function setCodes()
{
	reply = prompt('Please set Language tags, separate by comma.\n Currently you have:', GM_getValue('a_country','nl,en'));
	GM_setValue('a_country', reply);
}
function setSize()
{
	reply = prompt('Please set link size.\n Currently you have:', GM_getValue('linkSize','10px'));
	GM_setValue('linkSize', reply);
}