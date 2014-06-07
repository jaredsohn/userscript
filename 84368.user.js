// ==UserScript==
// @name           MyYearBook.com Auto-Anonymization
// @description    This script automatically checks the checkbox / tickbox on MyYearBook on both profile pages and chatter pages which enables you to post anonymously.
// @homepage       http://userscripts.org/
// @version        3.0
// @date           24th of August 2010
//
// @namespace      http://userscripts.org/users/52618
// @copyright      YourGreatestMember, sizzlemctwizzle & userscripts.org
// @creator        Idea & Initial start by YourGreatestMember but a big thanks to sizzlemctwizzle for creating the finished product and WhiteScripter and AmpliDude for their input
//
// @include        http:/*myyearbook.com/?mysession=*
// @include        http://*chatter.myyearbook.com/askMe/*
// ==/UserScript==

//	Anonymous Checkbox Locator
// alert(document.getElementsByName("anonymous").length)

//	Version 1.0
// document.getElementsByName("anonymous")[0].checked = true;

//	Version 2.0
// anonymouscheck = document.getElementsByName("anonymous")[0];
// if(anonymouscheck){
// anonymouscheck.checked = true;
// }

//	Version 3.0
function checkBox() {
    if (document.getElementsByName("anonymous").length) {
        document.getElementsByName("anonymous")[0].checked = true;
        // document.documentElement.removeEventListener('DOMNodeInserted', checkBox, false);
    }
}
document.documentElement.addEventListener('DOMNodeInserted', checkBox, false);