// ==UserScript==
// @name           Easy save and edit for megaupload
// @namespace      xpsdeset
// @include        http://multifetch.megaupload.com/?c=filemanager
// ==/UserScript==


x=document.getElementById('folder-path');
var dld=document.createElement("div");
dld.innerHTML="<a href=\"javascript:$('[id*=object-editform-link]').click();void(0);\">[EA]</a><a href=\"javascript:$('[id*=form-object-save-button]').click();void(0);\">[SA]</a>";
x.parentNode.insertBefore( dld ,x.nextSibling);


