// ==UserScript==
// @name           Only CSharp on MSDN
// @namespace      http://skaue.com/
// @description    Display only cSharp code when visiting MSDN
// @include        *msdn*.microsoft.*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='code']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if(thisDiv.id.indexOf('_CSharp')==-1&&thisDiv.id.indexOf('_other')==-1)thisDiv.className='codeHide';
}
