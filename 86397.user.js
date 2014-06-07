// ==UserScript==
// @name           Auto Add Facebook Friends
// @namespace      http://www.facebook.com/
// @include        *facebook.com/*
// ==/UserScript==


function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}


// Start main script
try {

// Check if it's a user profile that we can add
var link=document.getElementById("profile_connect").getElementsByTagName("a")[0];

if(link) {

  // Click delete button
  performClick(link);
  
  // Wait to confirm
  window.setTimeout(confirm,1000);

}

}catch(e){}
// End main script


function confirm() {
  var done = false;
  
  try {
    if(!set) {
      setlist();
    }
    else {
      var cfm=document.getElementsByTagName("input");
      for(i=cfm.length-1;i>=0;i--){
        if(cfm[i].name=="connect"){
          cfm[i].click();
          done = true;
          //window.close();
        }
      }
    }
  }catch(e){}
  
  if(!done) {
    window.setTimeout(confirm,1000);
  }
}

var set = true;
function setlist() {

  // open list
try{
  var add,list=document.getElementsByTagName("a");
  for(i=0;i<list.length;i++){
    if(list[i].className=="UIActionMenu_Wrap"){
      //alert(list[i].parentNode.innerHTML);
      
      for(j=0;j<list[i].childNodes.length;j++) {
        performClick(list[i].childNodes[j]);
      }
      
      add=list[i].getElementsByTagName('input')[0];
      performClick(add);
      add.click();

      break;
  }}
}catch(e){alert(e);}

  // find menu items
  var d,e=document.getElementsByTagName('div');
  for(i=0;i<e.length;i++){
    if(e[i].className=='FriendAddingTool_InnerMenu'){
      d=e[i].childNodes[0];
      //alert(d.childNodes.length);
      break;
  }}
  
  // click on "AutoAdd" list
  for(i=0;i<d.childNodes.length;i++){
    if(d.childNodes[i].getElementsByTagName('a')[0].innerHTML=="AutoAdd"){
      //alert(d.childNodes[i].innerHTML);
      d.childNodes[i].getElementsByTagName('input')[0].click();
      set = !set;
      break;
  }}

}