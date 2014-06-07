// ==UserScript==
// @name           Wikipedia reference formatter
// @namespace      geological-supplies.com
// @include        http://en.wikipedia.org/w/index.php*action=*
// ==/UserScript==
if (document.getElementById('wpDiff')){
 diff = document.getElementById('wpDiff');
 refButton = document.createElement("input");
 refButton.value="Convert refs";
 refButton.type="submit";
 originalAction=document.getElementById('editform').getAttribute('action');
 refButton.setAttribute("onmousedown", " document.getElementById('editform').setAttribute('action', 'http://toolserver.org/~verisimilus/Scholar/Refs.php')");
 refButton.setAttribute("onkeydown", " document.getElementById('editform').setAttribute('action', 'http://toolserver.org/~verisimilus/Scholar/Refs.php')");
 diff.setAttribute("onmousedown", originalAction);
 diff.setAttribute("onkeydown", originalAction);
 document.getElementById('wpPreview').setAttribute("onmousedown", originalAction);
 document.getElementById('wpPreview').setAttribute("onkeydown", originalAction);
 document.getElementById('wpSave').setAttribute("onmousedown", originalAction);
 document.getElementById('wpSave').setAttribute("onkeydown", originalAction);
 diff.parentNode.insertBefore(refButton, diff.nextSibling);
}
