// ==UserScript==
// @id             8ettervisca
// @name           8etter Visca
// @version        1.0
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Changes all of the definition links in the visca regex dictionary search to use wiktionary or dictionary.com. All of them. ::::)
// @include        http://www.visca.com/regexdict/
// @run-at         document-end
// ==/UserScript==

// Remove the two slashes below to use dictionary.com.

dictionary = 'http://en.wiktionary.org/wiki/';
//dictionary = 'http://dictionary.reference.com/browse/';

for (i = 3; i < document.links.length; i++) {
document.links[i].href = dictionary + document.links[i].innerHTML;
}