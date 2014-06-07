// ==UserScript==
// @namespace     bms
// @name          BMS Link
// @description   Adds a BMS link next to the AMS Package link. User must be logged into both the AMS and the BMS in order for this to work properly. 
// @include       */listHandler*
// @include       *modifyHandler*
// @include       *filterPackages*
// @include       *modifyPackages*
// @include       *ams*/listPackage*
// @exclude       *modifyHandlerSettings*
// @exclude       *bms/*
// ==/UserScript==

var tags =
{
    "a": "href",
};
var count = 0;

function main()
{
    var expression = "";
    var isFirst = true;
    for (var tag in tags)
    {
        if (isFirst) isFirst = false;
        else expression += " | ";
        expression += ".//" + tag + "[@" + tags[tag] + "]";
    }
    //alert(tags);
    var elements = document.evaluate(expression, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (elements == null) return;
    for (var i = 0; i < elements.snapshotLength ; i++) addLink(elements.snapshotItem(i));
    var mydiv = document.createElement('div'); 
    mydiv.appendChild(document.createTextNode("There are " + count + " assets listed."));
    document.body.appendChild(mydiv);
}

function addLink(element)
{
    var attribute = tags[element.tagName.toLowerCase()];
    var value = element.getAttribute(attribute);
    var strValue = value.toString(); 
    
    if (strValue.indexOf("packageName=")>0){
        //if (strValue.indexOf("HBO")>0) addHBOLink(element);
        strValue = strValue.substring(strValue.lastIndexOf("=")+1,strValue.length);
        var a = document.createElement("a");
        
        a.setAttribute("href", "http://bms/osbmui/packageSummary.do?packageName=" + strValue);

        var index = value.lastIndexOf("/");
        var name = value.substring(index + 1);
        a.appendChild(document.createTextNode("BMS Link"));
        var parent = element.parentNode;
        var next = element.nextSibling;
        parent.insertBefore(document.createTextNode("·  |  ·"), next);
        parent.insertBefore(a, next); // ADD LINK
        count++;
    }

}

function addHBOLink(element)
{
    var attribute = tags[element.tagName.toLowerCase()];
    var value = element.getAttribute(attribute);
    var strValue = value.toString(); 
    
    if (strValue.indexOf("packageName=")>0){
        strValue = strValue.substring(strValue.lastIndexOf("=")+1,strValue.length);
        var a = document.createElement("a");
        a.setAttribute("href", "http://bms/osbmui/packageSummary.do?packageName=HBO::SVOD::" + strValue);
        var index = value.lastIndexOf("/");
        var name = value.substring(index + 1);
        a.appendChild(document.createTextNode("HBO Link"));
        var parent = element.parentNode;
        var next = element.nextSibling;
        parent.insertBefore(document.createTextNode("·  |  ·"), next);
        parent.insertBefore(a, next); // ADD LINK
    }

}
main();
