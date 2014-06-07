// ==UserScript==
// @name           Gmail Example
// @namespace      #aVg
// @include        http://mail.google.com/mail/?*
// @version        0.1
// ==/UserScript==
(function() {
function begin(gm){
	unsafeWindow.gm = gm;
	function single(A, B) {var doc=B ? B.ownerDocument : document;return doc.evaluate(A, B || document, null, 9, null).singleNodeValue;}
	function remove(A) {if(A) A.parentNode.removeChild(A);}
	console = unsafeWindow.console;
	console.log("Instance of script");
	gm.registerViewChangeCallback(function() {
		if(gm.getActiveViewType()=="cv")
		{
		}
	});
}
unsafeWindow.gmonkey.load("1.0", begin);
})();