// ==UserScript==
// @name           GigaSize Time Attack
// @namespace      #aVg
// @description    Helps you quickly download from GigaSize
// @include        http://www.gigasize.com/*
// @version        0.1.2
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b=="style") A.setAttribute("style", B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var loc = location.pathname.substring(1);
if(loc=="get.php") {
/*
	if($("username_f")) {
		GM_xmlhttpRequest({
			headers : {
				"Content-Type" : "application x-www-form-urlencoded"
			},
			url : "http://www.gigasize.com/login.php",
			method : "POST",
			data : "uname=aavindraa%40gmail.com&passwd=userscripts&d=Login&login=1",
			onload : function(A) {
			}
		});
	}
*/
	$("txtNumber").addEventListener("keyup", function() {
		this.value = this.value.toUpperCase().replace(/0/g, "O").replace(/[^A-Z]/g, "");
		if(this.value.length==3) $("btnLogin").click();
		// implement ajax instead when download limit is restored
	}, false);
	single("//a[.=\"Can't read?\"]").setAttribute("href", "javascript:void($('imgnam').src='/randomImage.php?'+new Date().getTime())");
} else if(loc=="formdownload.php") {
	if($("askPws")) {
		var t = document.getElementsByTagName("table")[2];
		t.parentNode.replaceChild(new Element("div", {
			textContent : "Download limit reached! :( Try again later!"
		}), t);
	}
	// will implement when download limit is restored
}
remove(single("//a[@href='http://www.gigasize.com/register.php']/.."))(single("//span[@class='abuse']"))(single("//a[@href='/register.php']/.."))($("toolbar_email_holder"))(single("//div[@class='bottommenu']"));
})();
