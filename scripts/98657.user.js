// ==UserScript==
// @name           Printable Confluence Page
// @namespace      http://greasemonkey.mikepfirrmann.com
// @description    Make a "printable" page on Confluence even more printer-friendly.
// @include        *decorator=printable*
// ==/UserScript==

(function() {
	function hideElement(el) {
		var i=null,
			num=null;
		if ('number'===typeof el.length) {
			for (i=0, num=el.length; i<num; ++i) {
				el[i].style.display='none';
			}
		} else {
			el.style.display='none';
		}
	}

	function setStyle(els, margin, fontSize) {
		var i=null,
			num=null;

		for (i=0, num=els.length; i<num; ++i) {
			if ('undefined'!==typeof margin) els[i].style.margin=margin;
			if ('undefined'!==typeof fontSize) els[i].style.fontSize=fontSize;
		}
	}

	var $=document.querySelector;
	var $$=document.querySelectorAll;

	hideElement($('#PageContent table'));
	hideElement($('#pageInfoBar'));
	hideElement($('.bottomshadow'));
	hideElement($('#poweredby'));
	hideElement($$('.pagebody br')[3]);

	$('#PageContent').style.padding='0';
	$$('.pagecontent')[0].style.padding='0';

	setStyle($$('h1'), '10px 0 5px', '18px');
	setStyle($$('h2'), '10px 0 5px', '14px');
	setStyle($$('h3'), '10px 0 5px', '12px');
	setStyle($$('p'), '10px 0');
})();
