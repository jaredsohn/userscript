// ==UserScript==
// @name           Autovote Joby
// @namespace      http://userscripts.org/users/81090
// @description    Auto votes Nadine on nido fortified - Joby
// @include        http://jobydgreat.multiply.com/journal/item/171*
// @copyright      JoeSimmons - Joby
// ==/UserScript==

var yes = document.getElementById('Vote:jobydgreat:journal:171::castvote::0'),
	submit = document.getElementsByName('Vote:jobydgreat:journal:171::Vote')[0];
if(typeof yes!='undefined' && typeof submit!='undefined') {
yes.checked=true;
submit.click();
}
else {
document.cookie = "uid=; domain=multiply.com; path=/; expires=" + (new Date(Date.now() - 1)).toGMTString();
"uid=; domain=multiply.com; path=/; expires=Fri, 20 Feb 2009 21:26:14 GMT";
top.location.replace(location.href);
}