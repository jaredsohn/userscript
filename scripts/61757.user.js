// ==UserScript==

// @name           Auto Block Facebook People
// @namespace      http://www.facebook.com/

// @include        *facebook.com/*

// ==/UserScript==


function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}


// Check if it's a user profile that we can delete
var links=document.getElementsByTagName("a");
var link;

for(i=links.length-1;i>=0;i--) {
  if(links[i].innerHTML == "Report/Block this Person") {
    link = links[i];
  }
}

if(link) {

  // Click report link
  performClick(link);
  
  // Wait to confirm
  window.setTimeout(confirm,1000);

}


function confirm() {
  var done = false;
  
  try {
    document.getElementById("do_block").checked = true;
    document.getElementById("reason_type").selectedIndex = 6;
    
    var cfm=document.getElementsByTagName("input");
    for(i=cfm.length-1;i>=0;i--){
      if(cfm[i].name=="submit"){
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