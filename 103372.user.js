// ==UserScript==
// @name          SOAJAX
// @description   no reload on so
// @include       http://stackoverflow.com*
// ==/UserScript==
var newscr = document.createElement('script');
newscr.innerHTML = "function loadHref(url){$('#content').load(url + ' #content', function (response, status, xhr) {if(status!='error'){history.pushState('','',url);} else {window.location.href = url;}});return false;}";
document.head.appendChild(newscr);
