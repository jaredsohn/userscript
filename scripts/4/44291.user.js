// ==UserScript==
// @name           DeutscheBahn_Preset
// @namespace      www.ingmar-kellner.de
// @include        http://www.bahn.de/p/view/index.shtml
// ==/UserScript==


//Documentation: This script automatically inserts your home station for the departure
// and presets the bahncard options.
// In the end the focus is placed on the destination.

(function() {

var departurePlace = "<your departure>";

// Set your bahncard: 
//0=no bahncard, 1=bahncard 25 (2. class), 2=bahncard 50 (2. class), 
//1=bahncard 25 (1. class), 2=bahncard 50 (1. class)
var bahnCardIndex = 2;  


function getElementsByXPath(xpath) {
  var results = new Array();
  var elements = document.evaluate(xpath,
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) {
      var element = elements.snapshotItem(i);
      results[i] = element;
  }
  return results;
}

var departure = getElementsByXPath('//*[@id="qf-departure-point"]')[0];
departure.value = departurePlace;

var bahncard = document.getElementById("qf-trav-bc-1");
bahncard.selectedIndex = bahnCardIndex;

var destination = getElementsByXPath('//*[@id="qf-destination-point"]')[0];
destination.focus();

})();
