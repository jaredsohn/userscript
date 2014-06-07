// ==UserScript==
// @name          Travian: Send back troops
// @description   Send troops back from rally point
// @include       *travian*build.php?id=39&j*
// ==/UserScript==

var table = "test";

var interfaceStart = document.evaluate(  
"//a[@href='build.php?id=39']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    
null);
var  InterfaceElement = document.createElement("a");
InterfaceElement.innerHTML = table;
InterfaceElement.href='test.php'
interfaceStart = interfaceStart.snapshotItem(0);
interfaceStart.appendChild(InterfaceElement);
