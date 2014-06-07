// ==UserScript==
// @name			Userscripts.org Remove 'Share' From Right Nav
// @author			Erik Vergobbi Vold
// @namespace		usoRemoveRightShareCrap
// @include			http://userscripts.org/scripts/show/*
// @include			https://userscripts.org/scripts/show/*
// @match			http://userscripts.org/scripts/show/*
// @version			0.1.3
// @license			MPL 2.0
// @datecreated		2009-10-24
// @lastupdated		2013-07-16
// @homepageURL     https://userscripts.org/scripts/show/60497
// @description		Removes the 'Share' crap from the right menu on userscript pages of userscripts.org
// ==/UserScript==

(function(){
	var share=document.evaluate("//h6[contains(text(),'Share')]",document,null,9,null).singleNodeValue;
	if (!share) return;
	var p=share.parentNode;

	var end=document.evaluate(".//.[@id='fans']",p,null,9,null).singleNodeValue;
	if (!end) {
		end = document.evaluate(".//h6[contains(text(),'Groups')]", p, null, 9, null).singleNodeValue;
		if (!end) {
			end = document.evaluate(".//h6[contains(text(),'Admin for script')]", p, null, 9, null).singleNodeValue;
			if (!end) {
				end = document.evaluate(".//h6[contains(text(),'Tags')]", p, null, 9, null).singleNodeValue;
				if (!end) return;
			}
		}
	}

	var next=share,cur;
	while(next!=end){
		cur=next;
		next=cur.nextSibling;

		p.removeChild(cur);
	}
})();
