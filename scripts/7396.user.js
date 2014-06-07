// ==UserScript==
// @name           Mefi Titles 2
// @namespace      ~msn
// @description    Adds (hidden) titles to the Mefi front pages
// @include        http://www.metafilter.com/
// @include        http://www.metafilter.com/index.cfm*
// @include        http://ask.metafilter.com/
// @include        http://ask.metafilter.com/index.cfm*
// ==/UserScript==


GM_addStyle('.gmTitle {font-size: 10pt; color: rgb(255, 190, 100)}');

postFootPath 
// = "//div[@id='ajaxcontentarea']/div[@class='copy']/span[@class='smallcopy']/a/..";
 = "//div[@id='ajaxcontentarea']/div[@class='copy']/span[./a and @class='smallcopy']";
linkSubPath = "./a[@class='more']/@href";   //  i.e a[2]
if ('ask.metafilter.com' == document.location.host)
 linkSubPath = "./a[3]/@href"; 

function XPFirst(node, xpath){
 return document.evaluate(xpath, node, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function XPOrderedSnap(node, xpath){
 return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
smalls = XPOrderedSnap(document, postFootPath);

for (var i=0; i< smalls.snapshotLength; i++){
 var small = smalls.snapshotItem(i);
//  small.style.backgroundColor = 'rgb(220, 200, 180)';
  var more = XPFirst(small, linkSubPath);
  var dum = document.createElement('div');
  var tit = more.nodeValue.replace(/\/\d*\//, '');
   dum.innerHTML = '<div><span class="gmTitle">' + tit + '</span></div>';
   var parent = small.parentNode;
    parent.insertBefore(dum.firstChild, parent.firstChild);
}

//
// Inverse Functions to encode and decode titles
//  title = decodeTitle(encodeTitle(title))
// These are based on encodeURIComponent and exhibit the desired 
// behavior of converting spaces to '-'s.

// this function encodes true hyphens by appending their indicies
// to the end of the string following the magic word " 3q72j"
// Thus "a b c" ->  "a-b-c"
//      "a-b-c" ->  "a-b-c-3q72j1~3"
function encodeTitle(title){
 var hyphs =[];
 for (var i=title.indexOf('-'); i>-1; i=title.indexOf('-', i+1)){
  hyphs.push(i)
 }
 if (hyphs.length > 0) 
  title = title + ' 3q72j' +  hyphs.toString().replace(/,/g, "~");
 var a = encodeURIComponent(title);
 var b = a.replace(/%20/g, '-');
 var c = b.replace(/((%..)+)/g, '-$1-');
 return c;
}

function decodeTitle(eTitle){
 var a = eTitle.replace(/-((%..)+)-/g, '$1');
 var b = a.replace(/-/g, '%20');
 var c = decodeURIComponent(b);
 var mat = c.match(/(.*) 3q72j([\d\~]+)$/);
 if (mat){
  var hyphs = mat[2].split('~');
  var chars = mat[1].split('');
  for (var i=0; i<hyphs.length; i++){
   chars[hyphs[i]] = '-';
   }
  c = String.concat.apply(null, chars);
 }
 return  c;
}
  

