// ==UserScript==
// @id             c97e38bb-5ab5-403c-af45-7540077fbc6f
// @name           Ellara Kannada Lipikara
// @namespace      Honalu
// @copyright      2013+, Honalu (http://userscripts.org/users/514227)
// @licence        Summary: Free for personal non-commercial use;
// @description    Read all your favorite Kannada sites and webpages in Ellara Kannada
// @version        2013.04.20
// @include        *
// ==/UserScript==

function toplevel(n)
{ go(n); }


function go(n)

{ if (n.nodeType == 3) { tx(n); } if(n.tagName == 'FRAME') go(n.contentDocument); else for(var m = n.firstChild; m != null; m = m.nextSibling) go(m); } function tx(n) { var s = n.nodeValue; var res = ''; for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); if (c == 0xc96 || c == 0xc98 || c == 0xc9b || c == 0xc9d || c == 0xca0 || c == 0xca2 || c == 0xca5 || c == 0xca7 || c == 0xcab || c == 0xcad || c == 0xcb7) res += String.fromCharCode(c-1); else if(c == 0xc94) res += String.fromCharCode(0xc85) + String.fromCharCode(0xcb5) + String.fromCharCode(0xccd);
else if(c == 0xc90) res += String.fromCharCode(0xc85) + String.fromCharCode(0xcaf) + String.fromCharCode(0xccd);
else if(c == 0xc8b) res += String.fromCharCode(0xcb0) + String.fromCharCode(0xcc1);
else if(c == 0xcc3) res += String.fromCharCode(0xccd) + String.fromCharCode(0xcb0) + String.fromCharCode(0xcc1);
else if(c == 0xcc8) res += String.fromCharCode(0xcaf) + String.fromCharCode(0xccd);
else if(c == 0xccc) res += String.fromCharCode(0xcb5) + String.fromCharCode(0xccd);
else if(s.length > i+2 && c == 0xcb0 && s.charCodeAt(i+1) == 0xccd && s.charCodeAt(i+2) != 8205) {
	res += String.fromCharCode(0xcb0) + String.fromCharCode(0xccd) + String.fromCharCode(8205);
	i++;
}
else res += s.charAt(i); } n.nodeValue = res; }

void(toplevel(document.body));
void(toplevel(document.frameset));