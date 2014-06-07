// ==UserScript==
// @name       MakeESBPretty
// @namespace  http://*/ESB.Portal/Faults/
// @version    0.1
// @description  Turns the new lines in the stack trace into HTML breaks
// @match      http://*/ESB.Portal/Faults/FaultViewer.aspx?*
// @copyright  2012+, Nathan Isaak
// ==/UserScript==
var fields = document.getElementsByClassName("formField");
var index = 0;
while(index < fields.length){
    fields[index].innerHTML = fields[index].innerHTML.replace(/\n/g, "<br />");
    index++;
};