// ==UserScript==
// @name           VU Add Total Derbs
// @namespace      http://userscripts.org/users/125692
// @description    Adds total Derbs in orbit.
// @include        http://www.humugus.com/ds.php/colony/index/* 
// @include        http://www.humugus.com/ds.php/nav/index/*
// ==/UserScript==
(function() {
//start
var availableloot;
var allElementsE,allElementsO,allElementsM; 
var stemp,stemp2;
var ienergy,iorganic,imineral;
var inumimg;
var lasttext;

stemp=""+ location;    //""+ to make a string
stemp2=stemp.match(/.*colony.*/);

if (stemp2){//ie not null so colony page
    inumimg=1//one energy image = derbs
    //gotta test if it is friendly colony    
    var dansel = document.getElementsByClassName('bmy')[0] //page has heading of own colony 
    if (dansel){
        inumimg=2
    }
}
else{//nav page where second image is derbs
    inumimg=2//2 images means derbs
}

ienergy=0;
iorganic=0;
imineral=0;
//get energy if there
allElementsE = document.evaluate(
    "//IMG[@title='energy']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElementsE.snapshotLength==inumimg) {//ie found energy image. should mean derbs there
 stemp=allElementsE.snapshotItem(inumimg-1).previousSibling.wholeText
 ienergy=parseInt(stemp.match(/[0-9]* $/))//should get the last number
}
//get organic if there
allElementsO = document.evaluate(
    "//IMG[@title='organic']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElementsO.snapshotLength==inumimg) {
 stemp=allElementsO.snapshotItem(inumimg-1).previousSibling.wholeText
 iorganic=parseInt(stemp)
}
//get mineral if there
allElementsM = document.evaluate(
    "//IMG[@title='mineral']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElementsM.snapshotLength==inumimg) {
stemp=allElementsM.snapshotItem(inumimg-1).previousSibling.wholeText
 imineral=parseInt(stemp)
}

availableloot=ienergy+iorganic+imineral;
if (availableloot>0){//derbs found
    //test if mineral found.
    if (imineral>0){
        lasttext=allElementsM.snapshotItem(inumimg-1).nextSibling;
    }
    else if (iorganic>0){
        lasttext=allElementsO.snapshotItem(inumimg-1).nextSibling;
    }
    else if (ienergy>0){
        lasttext=allElementsE.snapshotItem(inumimg-1).nextSibling;
    }
    //var newElement = document.createElement("td");
    //newElement.innerHTML = ' Total Derbs : ' + availableloot;
    //lasttext.parentNode.insertAfter(newElement, lasttext);
    //lasttext.parentNode.insertBefore(newElement, lasttext.nextSibling);
    lasttext.replaceWholeText(lasttext.wholeText +'. Total Derbs : ' + availableloot);
}


//end
})();