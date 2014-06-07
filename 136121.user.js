// ==UserScript==
// @name           autoselect radio buttons
// @namespace      lategenius.com
// @description    disables required fields
// @include        https://211sandiego.communityos.org/zf/client/render/-1
// @include        https://211sandiego.communityos.org/zf/client/save
// @include        https://211sandiego.communityos.org/
// ==/UserScript==

var labels = document.getElementsByTagName('label'); //obtain the labels
for (var i = 0; i< labels.length; ++i) 
//Loops through labels
{
if (labels [i].textContext == "N/A") 
{
labels[i].click();}//selects from label
}
}