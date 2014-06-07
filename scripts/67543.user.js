// ==UserScript==
// @name           FetLife 'Friendship Requests' Sort
// @namespace      sparr
// @description    Sorts FetLife "Friendship Requests" page alphabetically
// @include        http://fetlife.com/users/*/friendship_requests
// ==/UserScript==

// based partially on http://userscripts.org/scripts/show/1278
// based almost entirely on http://userscripts.org/scripts/show/31471

// thanks http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

function FetLifeRequestsSort(){
  var list_items = getElementsByClass('friendship_request',document,'div');
  var myarray = new Array;
  for (i = 0; i < list_items.length; i++) {
    myarray[i] = [list_items[i].getElementsByTagName('a')[0].innerHTML.toLowerCase(),list_items[i].innerHTML,list_items[i].getAttribute('class')];
  }
  myarray.sort();
  for (i = 0; i < list_items.length; i++) {
    list_items[i].innerHTML = myarray[i][1];
    list_items[i].setAttribute('class',myarray[i][2]);
  }
}

FetLifeRequestsSort();