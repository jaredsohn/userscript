// ==UserScript==
// @name          Earn Munny
// @description   Automatically pet other's fluffy friend to earn munny on www.facebook.com Fluffy Friend.
// @include       http://apps.facebook.com/fluff/fluffbook.php*
// @include       */facebook.htm
// @include       */init.htm
// ==/UserScript==

var allForms, petForm, allInputs, typeInput, 
  allBodies, thisBody, allLinks, thisLink, index;

if(window.location.host != "apps.facebook.com"){
  if(window.location.href.search("init.htm") != -1){
    // initialize!!
    GM_setValue("LINK_INDEX", 0);
    GM_setValue("NOT_PETTED", true);
    GM_setValue("FRIEND_LIST", document.title);
    window.location.href = document.title;
  }
  else{ // facebook.htm
    allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

    index = GM_getValue("LINK_INDEX", 0);
    GM_setValue("LINK_INDEX", index+1);
    if(index < allLinks.snapshotLength){
      thisLink = allLinks.snapshotItem(index);
      // redirect to fluffy address
      window.location.href = thisLink.href;
    }
    else{
      // petting over, reset to beginning
      GM_setValue("LINK_INDEX", 0);
      GM_setValue("NOT_PETTED", true);
    }
  }
}
else{
  if(GM_getValue("NOT_PETTED", true)){
    GM_setValue("NOT_PETTED", false);
    allBodies = document.evaluate(
    '//body',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisBody = allBodies.snapshotItem(0);

    allForms = document.evaluate(
    "//form[@id='app2219808235_pet_friend']", 
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    petForm = allForms.snapshotItem(0);

    allInputs = document.evaluate(
    "//input[@name='type']", 
    petForm,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    typeInput = allInputs.snapshotItem(0);

    if(thisBody && petForm && typeInput){  
      // server use this for justification
      // original value="fake", and server knows it's a robot
      typeInput.value = "pet";
      // auto submit the pet form

      thisBody.onload = window.setInterval(function(){
        petForm.submit();}, 5000);
    }
  }
  else{
    GM_setValue("NOT_PETTED", true);
    // petted and redirect to friend list
    window.location.href = GM_getValue("FRIEND_LIST");
  }
}