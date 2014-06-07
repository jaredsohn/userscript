// ==UserScript==
// @name           User Thumbnails
// @namespace      dslr-forum.de
// @description    Ersetzt "als Kontakt hinzufügen" durch "Bilder anzeigen"
// @include        http://www.dslr-forum.de/showthread.php?*
// ==/UserScript==
$x=function(xpath,root){var doc=root?root.evaluate?root:root.ownerDocument:document,next;var got=doc.evaluate(xpath,root||doc,null,null,null),result=[];while(next=got.iterateNext())result.push(next);return result;};

var searchChars = " als Kontakt hinzufügen";
var replacChars = "s Bilder anzeigen";

var anchors = document.getElementsByTagName('a');

for ( var i = 0; i< anchors.length; i++ ) {
	 var x = anchors[i].href
	anchors[i].href =anchors[i].href.replace( "addlist&userlist=buddy&", "editattachments&pp=20&page=1&showthumbs=1&" )
}

Array.forEach($x("//text()[contains(.,'" + searchChars + "')]"),function(item){
  item.parentNode.innerHTML=item.parentNode.innerHTML.replace(new RegExp(searchChars,"gm"),replacChars);
  });