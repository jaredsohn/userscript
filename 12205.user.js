// ==UserScript==
// @name           TexAgs GM - Check Sig
// @namespace      Texags
// @description    Makes the signature checkbox default as checked
// @include        http://www.texags.com/main/forum.posttopic.*
// @include        http://texags.com/main/forum.posttopic.*
// @include        http://www.texags.com/main/forum.postreply.*
// @include        http://texags.com/main/forum.postreply.*
// @include        http://www.texags.com/main/privatemessage.postmessage.*
// @include        http://texags.com/main/privatemessage.postmessage.*
// ==/UserScript==


var allInputs = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var j = 0; j < allInputs.snapshotLength; j++)
	allInputs.snapshotItem(j).checked = true;
