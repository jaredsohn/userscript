// ==UserScript==
// @name          Pet Fluffy
// @description   Automatically pet fluffy friend on www.facebook.com Fluffy Friend.
// @include       http://apps.facebook.com/fluff/fluffbook.php*
// ==/UserScript==

var allForms, petForm, allInputs, typeInput, allBodies, thisBody;

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
  // auto submit the pet form, delay 5 sec
  thisBody.onload = window.setInterval(
    function(){petForm.submit()},5000);
}