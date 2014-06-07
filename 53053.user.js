// ==UserScript==
// @name        Ubuntu.it Forum Kill 3d
// @namespace   http://
// @description Simple kill 3d from unread/unanswered/active topics/new posts
// @include     http://forum.ubuntu-it.org/search.php?search_id=*
// Author Alkatron
// ==/UserScript==
  var Name3ds= new Array();
//======================================================================
// Insert 3d name or part of it one for element
  Name3ds[0]= 'virtualbox';
//  Name3ds[1]= 'file';
//  Name3ds[2]= 'Room 3';
//======================================================================
var msg = '';
var ttot = 0;
for (var x in Name3ds) { // loop through user-defined room names
    msg+="'"+Name3ds[x]+"' ";
}
msg='<span style="color: red;"><big>AlKll3d: killed:<b>' +msg;
//----------------------------------------------------------------------  
  //which nodes in the document contain a 3d row?
  var nodes = document.evaluate(
                '//li[contains(@class,"row bg")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  //loop through them...
  for (var i = 0; i < nodes.snapshotLength; i++) {
    var node = nodes.snapshotItem(i); //row
    var dt_node = nodes.snapshotItem(i).getElementsByTagName('dt')[0]; // cell
    var a_node = dt_node.getElementsByTagName('a'); // array of a tag 1 is 3d title
    //GM_log(a_node.length);
    //GM_log(a_node[1].innerHTML);
    
    for (var x in Name3ds) { // loop through user-defined 3d names
        if (a_node[1].innerHTML.indexOf(Name3ds[x]) > -1) {
          node.style.display = "none"; //hide
          ttot++;
          break;
        }
    }
  }
msg+=' ; '+ ttot +'</b></big></span><br>';
document.getElementById('content-top').innerHTML+=msg;
