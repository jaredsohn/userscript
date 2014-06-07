// ==UserScript==
// @name        Ubuntu.it Forum Kill Troll
// @namespace   http://
// @description Simple kill-user/troll from phpBB unread/unanswered/active/new posts and 3d
// @include     http://forum.ubuntu-it.org/search.php?search_id=*
// @include     http://forum.ubuntu-it.org/viewtopic.php?*
// Author Alkatron
// ==/UserScript==
  var NameTrolls= new Array();
//======================================================================
// Insert troll name one for element
  NameTrolls[0]= 'troll 1';
//  NameTrolls[1]= 'troll 2';
//  NameTrolls[2]= 'troll 3';
//======================================================================
var ttot=0;
var msg = '';
for (var x in NameTrolls) { // loop through user-defined room names
    msg+="'"+NameTrolls[x]+"' ";
}
msg='<span style="color: red;"><big>AlKllTrll: killed:<b>' +msg;
//----------------------------------------------------------------------  
  if (document.URL.indexOf("viewtopic.php")>-1) { // inside 3d page
        GM_log("gino");
          //which nodes in the document contain a post?
          var nodes = document.evaluate(
                        '//div[contains(@class,"post bg")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

          //loop through them...
          for (var i = 0; i < nodes.snapshotLength; i++) {
            var lcheck = true
            var node = nodes.snapshotItem(i); // post
            var alknode = nodes.snapshotItem(i).getElementsByClassName('author')[0];
            var alknode1 = alknode.getElementsByTagName('a')[1]; // author name
            for (var x in NameTrolls) { // loop through user-defined troll names
                lcheck = lcheck && (alknode1.innerHTML.indexOf(NameTrolls[x]) == -1)
            }
            //GM_log(lcheck);
            //GM_log(alknode1.innerHTML);
            if (lcheck==false) { 
                node.style.display = "none"; //hide
                  ttot++;
            }
          }
      } else if (document.URL.indexOf("search_id=unreadposts")>-1) { // unread posts page
          //which nodes in the document contain a 3d row?
          var nodes = document.evaluate(
                        '//li[contains(@class,"row bg")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
          //loop through them...
          for (var i = 0; i < nodes.snapshotLength; i++) {
            var node = nodes.snapshotItem(i); //row
            var dt_node = nodes.snapshotItem(i).getElementsByTagName('dt')[0]; // cell
            var a_node = dt_node.getElementsByTagName('a'); // array of a tag last-2 is author
            //GM_log(a_node.length);
            //GM_log(a_node[a_node.length-2].innerHTML);
            for (var x in NameTrolls) { // loop through user-defined troll names
                if (a_node[a_node.length-2].innerHTML.indexOf(NameTrolls[x]) > -1) {
                  node.style.display = "none"; //hide
                  ttot++;
                  break;
                }
            }
          }
      }    
msg+=' ; '+ ttot +'</b></big></span><br>';
document.getElementById('content-top').innerHTML+=msg;
  
