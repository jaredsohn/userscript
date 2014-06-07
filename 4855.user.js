// ==UserScript==
// @name          Googlelicious
// @namespace     http://gandrew.com/projects/userscripts
// @description	  Presents a link to del.icio.us bookmarks alongside Google search results.  
// @include       http://*google.*/search?*
// ==/UserScript==
// Originally written by Shii - http://shii.org
// Maintenance by Gareth Andrew -  http://gandrew.com
// Fixed 24/07/06 by Gareth Andrew.  Now uses XPCNativeWrapper compatible code
// Updated 21/05/08 by Gareth Andrew - Fixed xpath

function do_insert_html(doc, type, element, html) {
  var new_element = doc.createElement(type);
  new_element.innerHTML = html;
  element.parentNode.insertBefore(new_element, element.nextSibling);
};

var form = document.forms.namedItem("gs");
var input = form.elements.namedItem("q");
var q = input.value;

var header = document.evaluate("//table[@class='t bt']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;	
if (!header) {
  throw "Header not found";
}

do_insert_html(document, "SPAN", header, 
  '<table cellpadding=1 cellspacing=0 border=0 style="font-size: small"><tr><td colspan=2>Bookmark results for <b>'
  + q +
  '</b></td><tr  bgcolor="#dddddd"><td valign=top width=18><img src="http://del.icio.us/img/delicious.gif"></td><td valign=top><a href="javascript:luserscript(\''+q+'\',self)">Search del.icio.us for <b>'+q+'</b></a><br id=abutt><font color=green>del.icio.us</font></td></tr></table>');

var script = document.createElement("script");
script.language = "javascript";
script.innerHTML = ' \
function luserscript(q,abutt) { \
  var new_element = document.createElement("SPAN"); \
  stuff = document.getElementById("abutt"); \
  new_element.innerHTML = "<br><iframe src=\'http://del.icio.us/search/?search="+q+"\' width=500 height=300>"; \
  stuff.parentNode.insertBefore(new_element, stuff); \
} ';

document.getElementsByTagName('head')[0].appendChild(script);

