// ==UserScript==
// @name           vBTimecop
// @namespace      http://sites.google.com/site/kenscode/
// @description    Undoes time warps on vBulletin message boards.
// @include        http://*/showthread.php?*
// ==/UserScript==
//for each div
var divs = document.getElementsByTagName('DIV');
var divlist = new Array();
for(var i=0; i < divs.length; i++) {
  var div = divs[i];
  //if it's a div with id=edit.*
  if(div.id.substring(0,4) == 'edit')
    //push the div in a list.
    divlist.push(div);
}
divs = null;
//For each div in the list
for(var i=1; i < divlist.length; i++) {
  if(parseInt(divlist[i-1].id.substring(4)) > parseInt(divlist[i].id.substring(4))) {
    var j=i;
    var newpost = divlist[j].innerHTML
    //while the number is less than the number before it
    while(j > 0 && parseInt(divlist[j-1].id.substring(4)) > parseInt(divlist[j].id.substring(4))) {
      //Copy the innerhtml and id of the post before it, and move up one.
      divlist[j].innerHTML = divlist[j-1].innerHTML;
      j--;
    }
    //if this post id is not the same as the initial one, write the post here.
    divlist[j].innerHTML = newpost;
  }
}

for(var i=0; i < divlist.length; i++) {
  vbmenu_register("postmenu_"+divlist[i].id.substring(4), true);
}
