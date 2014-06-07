// ==UserScript==
// @name        OVS-HideMessagesFromBlackListedUsers
// @namespace   http://lyon.onvasortir.com/vue_messages_recus.php
// @include     http://*.onvasortir.com/vue_messages_recus.php
// @version     1
// @grant       none
// ==/UserScript==

//purpose:       Hide Messages From OVS Black Listed Users
//tested on :    firefox 27.0.1
//last change :  16 march 2014
//author: Pierre LHUSSIEZ


var myNodeList = document.getElementsByClassName('mesindesirables');
var count = myNodeList.length;
//alert('Debug: ' + count+ ' elements to be deleted');
var ar = new Array();

for (var i = 0; i < count; ++i) {
    //alert('Debug: Read elem ' + i);
    var item = myNodeList[i];
    //alert('Debug: item ok');
    var lineToBeRemoved = item.parentNode.parentNode;
    //alert('Debug: lineToBeRemoved ok');
   
    //add lineToBeRemoved to array
ar[i] = lineToBeRemoved;
}

// remove lines
for (var i = 0; i < count; ++i) {
    //alert('Debug: Start delete elem ' + i);
    var parent = ar[i].parentNode;
    //alert('Debug: parent ok');
    //alert('Debug: delete elem ' + i + '\n' + ar[i].innerHTML);
    parent.removeChild(ar[i]);
}