// ==UserScript==
// @name           GLB NoExcuses
// @namespace      monsterkill
// @description    Annoying prompt to make sure you know the advanced ai is not turned on
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// ==/UserScript==

var xpath = "/html/body/div[2]/div[5]/div[5]/form/input";

var test = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
if (!test.singleNodeValue.checked) {
    alert('WARNING: Advanced AI is currently not turned on.');
}   
