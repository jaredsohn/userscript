// ==UserScript==
// @name          OKC remove floating header from profiles
// @namespace     nomonkeynodeal
// @description   Kills the floating send-him-a-message nag bar which breaks paging by the screenful.
// @include       *okcupid.com*
// @author        tactileslut
// ==/UserScript==
// 
// http://www.okcupid.com/profile/tactileslut/journal

removeByID("action_bar");

function removeByID(ID){
  var myID = document.getElementById(ID);
  if(myID != null){
    myID.parentNode.removeChild(myID);
  }
}
