// ==UserScript==
// @name           Thumb Quotes
// @namespace      http://www.omnomasaur.com
// @description    Makes [img] tags inside of [quote] tags into [img_thumb] tags.  
// @include        http://*.facepunch*.com/newreply.php?do=newreply&p*
// ==/UserScript==

//Some notes:
// - This is a pretty cheap way of doing this, I know.  
// - Will only work if you hit the reply button.  (although I don't know why you would write your own [quote] tags.  
// - If Garry ever changes the names of his .php files it wont work anymore.  
// - If some retard writes img] and doesn't mean an img tag it will replace that with img_thumb]
// - The reason it doesn't look for the whole [img] and [/img] strings is because javascript will replace every single instance of every character within the [] with [img_thumb] if you try to do it like this.  
// - Probaly interferes with other scripts I've never tested it.  

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp("img]",'gi');
var replace = "img_thumb]";
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
  }
  
