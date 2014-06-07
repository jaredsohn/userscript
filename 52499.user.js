// ==UserScript==
// @name           Expand Subtasks
// @namespace      http://userscripts.org/users/11111
// @include        http://www.toodledo.com/views/context.php
// ==/UserScript==

var target=document.getElementById('action_toggleSubtasks');
if(document.dispatchEvent)
{ 
    var oEvent = document.createEvent("MouseEvents");
    oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
    target.dispatchEvent(oEvent);
}
else if(document.fireEvent)
{
    target.fireEvent("onclick");
}