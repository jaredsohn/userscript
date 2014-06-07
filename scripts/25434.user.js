// ==UserScript==
// @namespace     bms
// @name          BMS Missing Sites List
// @description   Adds a list of sites where a package asset has failed to attach to a content store.
// @include       *packageSummary.do?*
// ==/UserScript==

function main() {  

  var sites = new Array("CLARKSBURG","DOTHAN","MOSCOW","BENNING","RICHMOND","YUMA","TERREHAUTE","OWENS","CDA", "ELCEN","KENNETT","CULLMAN","RICHLANDS");
  var realNames = new Array(" Clarksburg"," Dothan", " Moscow", " Fort Benning"," Richmond"," Yuma"," Terre Haute"," Owensboro"," Couer d'Alene"," El Centro"," Kennett"," Cullman", " Richlands");
  var missing = new Array();

  for(var i = 0; i < sites.length; i++) { 
    var xpath = "//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'" + sites[i] + "')]";
    var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT, null);
    var xpath = "count(//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+sites[i]+"')])";
    var count = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).numberValue;
    var items = new Array();
    var thisItem = results.iterateNext();
    while(thisItem) {
      items.push(thisItem); 
      thisItem = results.iterateNext(); 
    }
  
    if (count<1) 
      missing.push(realNames[i]);
  }

 var mydiv = document.createElement('div'); 
 if (missing.length <1)
   mydiv.appendChild(document.createTextNode("Not missing from any content stores."));
 else if (missing.length==1)
   mydiv.appendChild(document.createTextNode("No export for " + missing.length + " content store: " + missing));
 else
   mydiv.appendChild(document.createTextNode("No export for " + missing.length + " content stores: " + missing));
 document.body.appendChild(mydiv);
 
}
main();