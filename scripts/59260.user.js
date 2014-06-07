// ==UserScript==
// @name           Classmates.com Signature Revealer
// @namespace      #aVg
// @description    Shows the largest pictures for people who signed, without paying some ridiculous fee.
// @version        0.1
// @include        http://www.classmates.com/profile/myvisitors/profile/my_visitors.htm*
// ==/UserScript==
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var i = A.snapshotLength;
	while(--i >=0) B(A.snapshotItem(i));
}
function $(A) {return document.getElementById(A);}
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
remove($("lightbox"));
loop("//a[starts-with(@href, '/cmo/user/checkout/select_item.jsp?fp=viewGuestbook')]/img", function(A) {
	if((A.src=="http://www.classmates.com/graphics/myvisitors/basic_image_overlay.png" ? A.style.backgroundImage : A.src).match(/(\d+)/))
	{
		A.src = "http://images.classmates.com/imgsvc/d?p=" + RegExp.$1;
		A.removeAttribute("height");
		A.removeAttribute("width");
		A.parentNode.href = A.src;
	}
});