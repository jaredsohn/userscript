// ==UserScript==
// @name           GLB AI Output Namer
// @description    renames outputs to match the name of the play chosen
// @namespace      monsterkill
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// ==/UserScript==

var rbtn = document.createElement('input');
rbtn.id = "testid";
rbtn.type = "button";
rbtn.value = 'Rename Outputs to match play and package names';
rbtn.addEventListener("click", renameOutputsForSpecificPlays, true);
var elmts = document.getElementsByClassName('description_text');
elmts[0].appendChild(rbtn);

function renameOutputsForSpecificPlays() {
    //gets all the anchor elements for specific play names
    var iterator = document.evaluate("//span[contains(@id,'specific_play_name')]/a", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
    try {
      var thisNode = iterator.iterateNext();
      var count=0;
      while (thisNode) {
          count++;
          var tmp = 'output_name_';
          tmp += thisNode.parentNode.id.split('_')[4];
          var outputNameElement = document.getElementById(tmp);
          outputNameElement.value = thisNode.innerHTML;
    
          thisNode = iterator.iterateNext();
      }	
      alert('Renamed '+count+' outputs to match specific plays.'+((count>0)?'\n\nBe sure to save the AI to keep these names.':''));
      renameOutputsForSpecificPackages();
    }
    catch (e) {
      dump( 'Error: Document tree modified during iteration ' + e );
    }
}
function renameOutputsForSpecificPackages() {
    //gets all the anchor elements for specific packages
    var iterator = document.evaluate("//span[contains(@id,'package_name')]", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
    try {
      var thisNode = iterator.iterateNext();
      var count=0;
      while (thisNode) {
          if (thisNode.innerHTML!='none') {
              count++;
              var tmp = 'output_name_';
              
              tmp += thisNode.id.split('_')[3];
              var outputNameElement = document.getElementById(tmp);
              outputNameElement.value = thisNode.innerHTML;
        
          }
          thisNode = iterator.iterateNext();
      }	
      alert('Renamed '+count+' outputs to match packages.'+((count>0)?'\n\nBe sure to save the AI to keep these names.':''));
    }
    catch (e) {
      dump( 'Error: Document tree modified during iteration ' + e );
    }
}
