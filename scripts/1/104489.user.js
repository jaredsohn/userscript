// ==UserScript==
// @name           	No Experts Exchange (June 2011)
// @namespace      	_NG_
// @description    	We HATES them, Exchange, dirty Expertsses!
// @include        	http://www.google.tld/*
// @info		Inspired by: http://userscripts.org/scripts/show/59258
// @version		2011.06
// ==/UserScript==

list = document.getElementsByClassName('g')
for (var i=0;i<list.length;i++) {
    found = list[i].getElementsByClassName('l')
    if (found) {
      if (found.item(0).href.match('experts-exchange')) {
        list[i].style.display = 'none'
        }
    }
}