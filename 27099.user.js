// ==UserScript==
// @namespace     bms
// @name          BMS Missing Sites List 2? - NOT WORKING
// @description   This has to also separate the listing for movie and preview.
// @include       *packageSummary.do?*
// ==/UserScript==

function main() {  

  var sites = new Array("CLARKSBURG","DOTHAN","MOSCOW","BENNING","RICHMOND","YUMA","TERREHAUTE","OWENS","CDA", "ELCEN","KENNETT","CULLMAN");
  var realNames = new Array(" Clarksburg"," Dothan", " Moscow", " Fort Benning"," Richmond"," Yuma"," Terre Haute"," Owensboro"," Couer d'Alene"," El Centro"," Kennett"," Cullman");
  var missing = new Array();

  var findRow = document.evaluate("//tr[@class='row0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).numberValue;

  var xpath = "count(//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+sites[i]+"')])";
  var count = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).numberValue;
  document.write(count);
//  for (var i = 0; i < findRow.snapshotLength; i++) {    
//    thisNode = findRow.snapshotItem(i);    
//    for(var i = 0; i < sites.length; i++) { 
 //     var xpath = "//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + sites[i] + "')]";
  //    document.write(xpath);
   //   var results = .evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT, null);
   //   var xpath = "count(//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+sites[i]+"')])";
   //   var count = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).numberValue;
   //   var items = new Array();
   //   var thisItem = results.iterateNext();
   //   while(thisItem) {
   //     items.push(thisItem); 
   //     thisItem = results.iterateNext(); 
 //     }
  //  }
  

// var mydiv = document.createElement('div'); 
// if (missing.length <1)
//   mydiv.appendChild(document.createTextNode("Not missing from any content stores."));
// else if (missing.length==1)
//   mydiv.appendChild(document.createTextNode("No export for " + missing.length + " content store: " + missing));
// else
//   mydiv.appendChild(document.createTextNode("No export for " + missing.length + " content stores: " + missing));
// document.body.appendChild(mydiv);
 
}


main();