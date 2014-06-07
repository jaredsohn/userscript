// ==UserScript==
// @name           Bugmenot Button 2014
// @namespace      BB2014
// @description    Adds menu button that opens the Bugmenot user/password page for the current site you are visiting.
// @include        *
// @author         drhouse
// @version        2.3.13.1800
// ==/UserScript==

GM_registerMenuCommand("BugMeNot Button", function() {
location.replace("javascript:(" + function() {
window.open('http://www.bugmenot.com/view/'+window.location.host+'#content', '_blank', 'width=680,height=250,menu=no');
	} + ")()");
});