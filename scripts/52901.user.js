// ==UserScript==
// @name           Demented Cheater
// @namespace      Dementedrpg
// @description    allows you to interregate and subjagate without torturing
// @include        http://dementedrpg.com/torture.cfm?t=*
// ==/UserScript==

document.getElementById('actions').innerHTML = '<form><input type="button" onclick="javascript:doAction(1)" value="Torture"/>     <input type="button" onclick="javascript:tryit(1)" value="Attempt Interrogation"/>     <input type="button" onclick="javascript:tryit(2)" value="Attempt Subjugation"/></form>';