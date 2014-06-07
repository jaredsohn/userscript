// ==UserScript==
// @name           Only CSharp and Xaml on MSDN-Silverlight
// @namespace      http://tempuri.org/
// @description    Display only cSharp & Xaml when visiting MSDN-Silverlight
// @include        *msdn*.microsoft.*
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='DivCbxLabelLanguage']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if(thisDiv.arrayvalue!='csharp'&&thisDiv.arrayvalue!='xaml'&&thisDiv.arrayvalue!='other')thisDiv.className='DropDownFilterOff';
}