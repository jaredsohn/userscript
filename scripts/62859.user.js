// ==UserScript==
// @name        Ubuntu.it Forum Kill Rooms
// @namespace   http://
// @description Simple kill Rooms 3d from unread/unanswered/active topics/new posts
// @include     http://forum.ubuntu-it.org/search.php?search_id=*
// Author Alkatron
// ==/UserScript==
  var NameRooms= new Array();
//======================================================================
// Insert room name or part of it one for element
  NameRooms[0]= 'Bar';
//  NameRooms[1]= 'Bar Ubuntu';
//  NameRooms[2]= 'Room 3';
//======================================================================
var ttot=0;
var msg = '';
for (var x in NameRooms) { // loop through user-defined room names
    msg+="'"+NameRooms[x]+"' ";
}
msg='<span style="color: red;"><big>AlKllRm: killed:<b>' +msg;
//----------------------------------------------------------------------  
  //which nodes in the document contain a 3d row?
  var nodes = document.evaluate(
                '//li[contains(@class,"row bg")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  //loop through them...
  for (var i = 0; i < nodes.snapshotLength; i++) {
    var node = nodes.snapshotItem(i); //row
    var dt_node = nodes.snapshotItem(i).getElementsByTagName('dt')[0]; // cell
    var a_node = dt_node.getElementsByTagName('a'); // array of a tag last-1 is room
    //GM_log(a_node.length);
    //GM_log(a_node[a_node.length-1].innerHTML);
    for (var x in NameRooms) { // loop through user-defined room names
        if (a_node[a_node.length-1].innerHTML.indexOf(NameRooms[x]) > -1) {
          node.style.display = "none"; //hide
          ttot++;
          break;
        }
    }
  }
msg+=' ; '+ ttot +'</b></big></span><br>';
document.getElementById('content-top').innerHTML+=msg;

          

