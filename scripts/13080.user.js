// ==UserScript==
// @name           Google Scholar Nature article linker
// @namespace      scholar.google.com
// @description    Links directly to Nature articles from Google Scholar results
// @include        http://www.srcf.ucam.org/~ms609/Wiki/Scholar?*
// @include        http://scholar.google.com/scholar?*
// ==/UserScript==

spans = document.getElementsByTagName("span");
for (var i = 0, j = spans.length; i < j; i++) {
	if (spans[i].className == "a" && spans[i].parentNode.parentNode.firstChild.firstChild) spans[i].innerHTML=spans[i].innerHTML.replace(/nature/i, "<a href=http://www.nature.com/search/executeSearch?sp-q-9=NATURE&sp-q=" + spans[i].parentNode.parentNode.firstChild.firstChild.innerHTML.replace(/\s/g, "+") + "&sp-c=10&sp-x-9=cat&sp-s=date&submit=go&sp-a=sp1001702d&sp-sfvl-field=subject%7Cujournal&sp-x-1=ujournal&sp-p-1=phrase&sp-p=all>Nature</a>");;
}