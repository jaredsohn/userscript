// ==UserScript==
// @name           Linkbucks Remover
// @namespace      Dataz/SyphirX/Dephy/pH1r - http://thedataz.org/
// @description    Removes the http://XXXXXXX.linkbucks.com/url/ from links. Huge thanks to temp01 on ##javascript (Freenode). HOMEPAGE: http://blog.thedataz.org/2010/06/js-linkbucks-link-remover/
// @include        *
// @exclude        http://*www.linkbucks.com/
// ==/UserScript==

Array.forEach(document.querySelectorAll('a[href*="linkbucks.com"]'), function(link){ link.href = link.href.replace(/^http:\/\/\w+\.linkbucks\.com\/url\//, ''); });