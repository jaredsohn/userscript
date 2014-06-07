// ==UserScript==
// @name           Dumbwit
// // @description Dumwit link for Urban Dead
// @include        http://urbandead.com/map.cgi*
// @include        http://www.urbandead.com/map.cgi*
// ==/UserScript==

/* Urban Dead Dumwit button
 * v1.0.0
 * Created by Kyle The Feard and Duck J
 * 1-23-2011, Fixed by Sophie 3-10-11, Thanks Girl.
 * This is open source do what you want with it I claim no legal or other responsibility *for this script so you use it at your own risk.  Edit it fix it have fun with it enjoy.  
 *
*/

var input = document.createElement('input');
input.type = 'submit';
input.className = 'm';
input.value = 'SCREENSHOT';
input.addEventListener(
  'click',
  function(event) {
           event.stopPropagation();
           event.preventDefault();
    var d = new Date();
    var w = window.open('', d);
    w.document.write('<html><body><form name="wF" action="http://iamscott.net/cgi-bin/dumbwit.rb" method="post"><input name="wP" value="PRIVATE" /><input name="wT" value="' + window.document.lastModified + '" /><input name="wZ" value="' + d.getTimezoneOffset() + '" /><input name="wV" value="23" /><textarea name="wS">' + document.body.innerHTML + '</textarea></form>');
    w.document.forms[0].submit();
  },
  false
);

var form = document.createElement('form');
form.className = 'a';
form.appendChild(input);

var frag = document.createDocumentFragment();
frag.appendChild(document.createTextNode(' '));
frag.appendChild(form);

var firstForm = document.evaluate('//td[@class="gp"]/form', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!firstForm)
  document.evaluate('//td[@class="gp"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).appendChild(frag);
else
  firstForm.parentNode.insertBefore(frag, firstForm.nextSibling);