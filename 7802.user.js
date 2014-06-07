// ==UserScript==
// @name           Shartak Suicide 
// @description    Allows you to attack yourself in the game of Shartak.
// @include        http://www.shartak.com/game.cgi
// ==/UserScript==

var characterName = '';
var characterID = '';

// Character name and ID can be found in the div with class info, in a link with class txlink.
var characterInfo = document.evaluate("//div//a[@class='txlink']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (characterInfo.snapshotLength)
{
   characterID += characterInfo.snapshotItem(0).href.replace(/[^0-9]*/,'');
   characterName += characterInfo.snapshotItem(0).innerHTML;

   // The target select is a select with a name of target - append into the options an option for the character
   var targetSelects = document.evaluate("//select[@name='target']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   if (targetSelects.snapshotLength)
   {
      targetSelects.snapshotItem(0).innerHTML += '<option value="'+characterID+'">'+characterName+'</option>';
   }
}

