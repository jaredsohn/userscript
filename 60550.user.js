// ==UserScript==
// @name			UserScripts.org Better Feedback Link
// @author			Erik Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-25
// @lastupdated		2010-03-12
// @namespace		usoBetterFeedbackBtn
// @include			http://userscripts.org/*
// @match			http://userscripts.org/*
// @version			0.1.2
// @description		This userscript adds the 'Feedback' link to the navigation at userscripts.org on pages where it is missing and it will make the link go directly to userscripts.uservoice.com in a new tab.
// ==/UserScript==

(function(d){
	var m=d.getElementById('mainmenu');
	if(!m) return;

	var i,
		f=d.evaluate(".//li/a[contains(text(),'Feedback')]",m,null,9,null).singleNodeValue;

	if(!f){
		i = d.createElement('li');
		f = d.createElement('a');
		f.innerHTML = 'Feedback';
		f.href = "http://userscripts.uservoice.com/";
	}
	else{
		f.removeAttribute('onclick');
		f.href = "http://userscripts.uservoice.com/";
	}

	f.setAttribute('target','_blank');

	if(i){
		i.appendChild(f);
		m.insertBefore(i,d.evaluate(".//li/a[contains(text(),'Books')]", m, null, 9, null).singleNodeValue.parentNode.nextSibling);
	}
})(document);
