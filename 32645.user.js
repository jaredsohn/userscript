// ==UserScript==
// @name           Team AI Builder - Larger Text Boxes
// @namespace      KHMI - Greasemonkey
// @description    Makes the Input text boxes larger
// @include        http://goallineblitz.com/game/team_offense_ai.pl*
// @include        http://goallineblitz.com/game/team_defense_ai.pl*
// ==/UserScript==

var timeout = 0;
var width = "150px";

window.setTimeout( function(){
   var allInputs, thisInput;
   allInputs = document.evaluate(
      "//input[@type='text']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
   for (var i = 0; i < allInputs.snapshotLength; i++) {
      thisInput = allInputs.snapshotItem(i);
      if(thisInput.id.indexOf("input_name") >= 0 || thisInput.id.indexOf("output_name") >= 0){
         thisInput.style.width = width;
      }
   }
},timeout);