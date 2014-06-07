// ==UserScript==
// @name           acidd
// @namespace      http://userscripts.org/users/101059
// @description    Another take on nausea inducement
// @include        *
// ==/UserScript==

var allElements, d, h, i, j, k, thisElement, thisStyle, BG, newBG, CLR, newCLR, t, test, newTest;

// Get all the child elements of document.body
allElements = document.evaluate('.//*', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Assign the directional arrays for CLR and BG
var dBG= new Array(allElements.snapshotLength);
var dCLR= new Array(allElements.snapshotLength);
for (var h=0; h<allElements.snapshotLength; h++) { // NOW IN 2D!!!
 dBG[h] = new Array(1,1,1,1,1,1);
 dCLR[h] = new Array(1,1,1,1,1,1);
}

// Lick the toad
window.acidd=function() {
 for (i=0; i < allElements.snapshotLength; i++) {
  thisElement = allElements.snapshotItem(i);
  thisStyle=getComputedStyle(thisElement, '');
  // Phase the BG color
  BG=thisStyle.backgroundColor.substring(4,thisStyle.backgroundColor.length-1).split(",");
  // Phase the color
  CLR=thisStyle.color.substring(4,thisStyle.color.length-1).split(",");
  for(j=0;j<3;j++) {
   d=Math.floor(Math.random()*3);	//Randomize the delta
   BG[j]=parseInt(BG[j],10);
   BG[j]+=(d*dBG[i][j]);
   CLR[j]=parseInt(CLR[j],10);
   CLR[j]+=(d*dCLR[i][j]);
   if (BG[j]<0) {			//Lower range, change sign and move away from boundary
    dBG[i][j]*=-1;
    BG[j]=6;
   }
   if (CLR[j]<0) {			//Lower range, change sign and move away from boundary
    dCLR[i][j]*=-1;
    CLR[j]=6;
   }
   if (BG[j]>254) {			//Upper range, change sign and move away from boundary
    dBG[i][j]*=-1;
    BG[j]=249;
   }
   if (CLR[j]>254) {			//Upper range, change sign and move away from boundary
    dCLR[i][j]*=-1;
    CLR[j]=249;
   }
  } 
  if(thisStyle.backgroundColor!="transparent") {
   newBG="rgb("+BG[0]+", "+BG[1]+", "+BG[2]+")";
   thisElement.style.backgroundColor=newBG;
  }
  newClr="rgb("+CLR[0]+", "+CLR[1]+", "+CLR[2]+")";
  thisElement.style.color=newClr;
 }
 t=window.setTimeout(acidd,333);	//Play it again Sam
}
window.acidd();


