// ==UserScript==
// @name           Auto Delete Facebook Friends
// @namespace      http://www.facebook.com/
// @include        *facebook.com/*
// ==/UserScript==

function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}

// Check if it's a user profile that we can delete
var link=document.getElementById("profile_action_remove_friend");

if(link) {

  // Click delete button
  performClick(link);
  
  // Wait to confirm
  window.setTimeout(confirm,1000);

}
else {

// Check if it's a user profile that we can add
link=document.getElementById("profile_connect");
if(link) {

  // Close window
  window.close();
  window.location = "about:blank";
}
}

function confirm() {
  var done = false;
  
  try {
    var cfm=document.getElementsByTagName("input");
    for(i=cfm.length-1;i>=0;i--){
      if(cfm[i].name=="remove-friend"){
        cfm[i].click();
        done = true;
        window.close();
      }
    }
  }catch(e){}
  
  if(!done) {
    window.setTimeout(confirm,1000);
  }
}