// ==UserScript==
// @name           rapidshare account id viewer
// @namespace      http://hardreboot.net
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi*
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi*
// ==/UserScript==
test = document.getElementById("pb1");
test = test.parentNode;
t1 = ""+test.innerHTML;
myRegExp = /Overview of the Account: /;
answerIdx = t1.search(myRegExp);
if(answerIdx == -1){
	return;
}
t1 = t1.substring(answerIdx+25,t1.length);
//alert(t1);
t2 = document.getElementById("p1");
t3 = t2.childNodes[1].childNodes[1].childNodes[0].childNodes[2];
t3.innerHTML = t3.innerHTML+":"+t1;