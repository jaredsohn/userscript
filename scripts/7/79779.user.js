// ==UserScript==
// @name          OKC Limit IM Tabs
// @namespace     nomonkeynodeal
// @description   Kills the IM Window in any tab other than the ones excluded here.
// @include       *okcupid.com*
// @exclude       http://www.okcupid.com/relevant*
// @exclude       http://www.okcupid.com/visitors*
// @exclude       http://www.okcupid.com/home*
// ==/UserScript==

removeByID("im_footer");

function removeByID(ID){
  var myID = document.getElementById(ID);
  if(myID != null){
    myID.parentNode.removeChild(myID);
  }else{}
}
