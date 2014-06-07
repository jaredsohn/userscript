// ==UserScript==
// @name           Forum autoreplier for content
// @namespace      #aVg
// @description    Only works on certain forums for now
// @include        http://www.realraptalk.com/f*
// @version        0.1
// ==/UserScript==
(function() {
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function $(A) {return document.getElementById(A);}
remove(single("//img[@src='http://www.realraptalk.com/banner.png']/../../../../.."));
var ref;
if(!(ref=single("//span[@class='highlight' and contains(text(), 'hidden content')]"))) return;
for(var i = 4; i > 0; --i)
	ref = ref.parentNode;
ref = $("post_thanks_button_"+ref.id.match(/\d+/)[0]);
// unsafeWindow.Rufen(ref.id.match(/\d+/)[0]);

GM_xmlhttpRequest({
	url : ref.href,
	method : "GET",
	onload : function(A) {
		location.href = location.href;
		// unsafeWindow.Rufen(ref.id.match(/\d+/)[0]);
	}
});

})();