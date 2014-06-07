// ==UserScript==
// @name          dfaf renamer
// @namespace     http://www.doublefine.com/
// @description   renames names
// @include       http://*.doublefine.com/forums/*
// @include       http://doublefine.com/forums/*
// ==/UserScript==
var objDict = new Array();
objDict["hot"] = "jesus";
objDict["Katez"] = "Bemonocled Molly";
objDict["Trogdor The Burninator"] = "Kyael";
objDict["OriginalUsername"] = "Amy";
objDict["Headroom"] = "Brian";
objDict["Tripz Ballz"] = "Bill";
objDict["Scarecrow"] = "Jarad";
objDict["lejwocky"] = "Nathan";
objDict["tiffuts"] = "Scot";
objDict["Leroy_Octopus"] = "Ryan";
objDict["zeeman645"] = "Gunnar";
objDict["Apple Pop"] = "Harry Potter";
objDict["paxtofettel"] = "Chris";
objDict["Aluminumticket"] = "Alice";
objDict["Koco"] = "Erika";
objDict["Crazy Sunshine"] = "Bobby";
objDict["dinnerordie17"] = "Thomas";
objDict["Blazerkin"] = "Zac";
objDict["Code Echo"] = "Cody";
objDict["Miriku"] = "Lilly";
objDict["the ass man"] = "Harrison";
var allElements, thisElement;
allElements = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
myregex = new RegExp("^http://www.doublefine.com/forums/member/\\d+/$");
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    if ((thisElement.href.match(myregex)) && (objDict[thisElement.textContent])) {
        thisElement.textContent = thisElement.textContent + " (" + objDict[thisElement.textContent] + ")";
    }
}
