// ==UserScript==
// @name           Google Autocorrect Disabler
// @description    Redirects to "Did you mean" version of Google search.
// @include        http://*.google.*/*
// ==/UserScript==

if(
        document.getElementById('topstuff')
        && document.getElementById('topstuff').getElementsByTagName('span').length > 0
        && (/q=/).test(document.location.href)
	    && (!(/&nfpr=1/).test(document.location.href))
){
	window.location = window.location + "&nfpr=1";
}
