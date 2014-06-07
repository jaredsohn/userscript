// ==UserScript==
// @name           Erepublik: Always show the full about text.
// @description    This will expand the about texts on profiles. They only allow short texts and even cut it? Screw them.
// @author         Opaque
// @version        1
// @namespace      tag:littlefreaks.org,2008-06-20:Erepublik
// @include        http://www.erepublik.com/profile-*.html
// @include        http://erepublik.com/profile-*.html
// ==/UserScript==
function $(a){return document.getElementById(a);}
function d(a){return a.parentNode.removeChild(a);}
if($('about_me_')&&$('about_me')){d($('about_me_'));$('about_me').style.display='block';d($('about_me').getElementsByTagName('a')[$('about_me').getElementsByTagName('a').length-1]);}