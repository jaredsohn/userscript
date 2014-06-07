// ==UserScript==
// @name           Autovote *^*
// @namespace      http://userscripts.org/users/23652
// @description    It auto votes
// @include        http://nidofortified.multiply.com/journal/item/62*
// @copyright      ThisIs
// ==/UserScript==

var yes = document.getElementById('Vote:nidofortified:journal:62::castvote::0'),
	submit = document.getElementsByName('Vote:nidofortified:journal:62::Vote')[0];
if(typeof yes!='undefined' && typeof submit!='undefined') {
yes.checked=true;
submit.click();
}
else {
document.cookie = "uid=; domain=multiply.com; path=/; expires=" + (new Date(Date.now() - 1)).toGMTString();
"uid=; domain=multiply.com; path=/; expires=Sat, 24 Jan 2009 21:26:14 GMT";
top.location.replace(location.href);
}

