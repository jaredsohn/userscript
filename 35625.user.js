// ==UserScript==
// @name           Thumbnail addon for directory indexes
// @namespace      http://userscripts.org/users/23652
// @description    Replaces image icons with the image thumbnails
// @include        http://*.*/*/
// @include        http://*.*/*/?N=*
// @include        http://*.*/*/?M=*
// @include        http://*.*/*/?S=*
// @include        http://*.*/*/?D=*
// @include        https://*.*/*/
// @include        https://*.*/*/?N=*
// @include        https://*.*/*/?M=*
// @include        https://*.*/*/?S=*
// @include        https://*.*/*/?D=*
// @copyright      JoeSimmons
// ==/UserScript==

// XPath multiple, but the array returned is a normal array[x]
// Always uses unordered node snapshot
// Syntax: $xM("//a", "//img", "//form");
function $xM() {
  var i, x, arr = [], xpr;
  for(x=0; x<arguments.length; x++) {
  xpr = document.evaluate(arguments[x],document,null,7,null);
  for (i=0; i<xpr.snapshotLength; i++) {arr.push(xpr.snapshotItem(i));}
  }
  return arr;
}

function options() {
var max_w = parseInt(prompt('Max thumbnail width','80'));
var max_h = parseInt(prompt('Max thumbnail height','60'));
if(max_w!=''&&max_w!=0 && max_h!=''&&max_h!=0) {
GM_setValue('pi_width', max_w);
GM_setValue('pi_height', max_h);
if(confirm('Reload to apply?')) {window.location.reload();}
}
}

function main() {
var pi_width = GM_getValue('pi_width', 80),
pi_height = GM_getValue('pi_height', 60),
i, img, linkimg,
links = $xM("//a[contains(@href, '.jpg')]","//a[contains(@href, '.jpeg')]","//a[contains(@href, '.png')]","//a[contains(@href, '.gif')]");

if(document.evaluate("//h1[contains(text(), 'Index of')]",document,null,9,null).singleNodeValue && /Index of/.test(document.title)) {

for(i=0; i<links.length; i++) {
l = links[i];
img = l.parentNode.previousSibling.firstChild || l.previousSibling.previousSibling;
linkimg = new Image();
linkimg.src = l.href;
img.width = pi_width;
img.height = pi_height;
img.src = linkimg.src;
}

}
}

GM_registerMenuCommand('Thumbnail addon options', options);

window.addEventListener('load', main, false);