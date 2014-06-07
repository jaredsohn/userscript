// ==UserScript==
// @name        Ubuntu.it Forum search user's posts in a 3d
// @namespace   http://
// @description Simple filter a 3d showing only posts from selected users in a phpBB 3d
// @include     http://forum.ubuntu-it.org/viewtopic.php?*
// Author Alkatron
// ==/UserScript==
  var NameUsers= new Array();
//======================================================================
// Insert username one for element
// REMEMBER - disable script after use, otherwise it filters all 3ds
  NameUsers[0]= 'username 1';
//  NameUsers[1]= 'username 2';
//  NameUsers[2]= 'username 3';
//======================================================================
var msg = '';
for (var x in NameUsers) { // loop through user-defined room names
    msg+="'"+NameUsers[x]+"' ";
}
msg='<span style="color: red;"><big>AlkSrchUsr: filter on:<b>' +msg+'</b></big></span>';
document.getElementById('content-top').innerHTML+=msg;
//----------------------------------------------------------------------  
  //which nodes in the document contain a post?
  var nodes = document.evaluate(
                '//div[contains(@class,"post bg")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  //loop through them...
  for (var i = 0; i < nodes.snapshotLength; i++) {
    var lcheck = true
    var node = nodes.snapshotItem(i); // post
    var alknode = nodes.snapshotItem(i).getElementsByClassName('author')[0];
    var alknode1 = alknode.getElementsByTagName('a')[1]; // author name
    for (var x in NameUsers) { // loop through user-defined username
        lcheck = lcheck && (alknode1.innerHTML.indexOf(NameUsers[x]) == -1)
    }
    //GM_log(lcheck);
    //GM_log(alknode1.innerHTML);
    if (lcheck) { 
        node.style.display = "none"; //hide
    }
  }
alert("Ricordarsi di disabilitare lo script 'Ubuntu.it Forum search user's posts in a 3d' dopo l'uso")
