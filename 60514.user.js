// ==UserScript==
// @name			Remove Print CSS (WYSIWYG)
// @author			Erik Vold
// @namespace		removePrintCSS
// @include			http*://*
// @version			0.1
// @datecreated		2009-10-25
// @lastupdated		2009-10-25
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This will remove all print only css from a document and make the screen css print css.
// ==/UserScript==

(function(){
	var removePrintCSS = {
		init: function(){
			var c, l = document.evaluate("//head/link[@media='print' and contains(@type,'css')]", document, null, 7, null);
			if (!l.snapshotLength) {
				removePrintCSS.makeMediaCSSPrintCSS()
				return alert('No exclusively print css was found.');
			}
			for (var i = 0; i < l.snapshotLength; i++) {
				c = l.snapshotItem(i);
				c.parentNode.removeChild(c);
			}
			removePrintCSS.makeMediaCSSPrintCSS();
			return alert('All print css has been removed');
		},
		makeMediaCSSPrintCSS:function(){
			var c, l = document.evaluate("//head/link[contains(@media,'screen') and not(contains(@media,'print'))]", document, null, 7, null);
			for (var i = 0; i < l.snapshotLength; i++) {
				c = l.snapshotItem(i);
				c.setAttribute('media',c.getAttribute('media')+", print");
			}
		}
	}
	GM_registerMenuCommand("Remove Print CSS", removePrintCSS.init);
})();