// ==UserScript==
// @name           Show Blocked Flash in Myspace Forums
// @namespace      myspace.com/xenomark
// @include        http://forums.myspace.com/*
// @description    If you have used my red dot script 
// @description    (x3designs.com/thedot) for protection in 
// @description    myspace forums and groups, this GM script   
// @description    will allow you the option of viewing videos  
// @description    that are blocked by the red dot,  
// @description    but are now allowed in the forums
// ==/UserScript==


var allObjects, thisObject;
allObjects = document.getElementsByTagName('object');
for (var i = 0; i < allObjects.length; i++) {
    thisObject = allObjects[i];
    if (thisObject) {


var innards, width, height, data, class;  //get variables from original embed
innards = thisObject.innerHTML;  //params and embed tag
width = thisObject.width;
height = thisObject.height;
data = thisObject.data;
IDdata = data.replace(/[^a-zA-Z 0-9]+/g,'');
clip1 = data.substring(0,48) + ' ';
clip2 = data.substring(49,98) + ' ';
clip3 = data.substring(99,148) + ' ';
clip4 = data.substring(149);
    
var showMe = document.createElement("div");
showMe.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #f78b8b; ' +
    '"><p style="margin: 2px 0 1px 0;"> ' +
    '<input type="button" value="Show Video" onclick="' + IDdata + '.style.display=\'block !important\'"> ' +
    clip1 + clip2 + clip3 + clip4 +
    '</p></div>' +
    '<embed id="' + IDdata + '" style="display:none" height="' +
    height +
    '" width="' +
    width +
    '" src="' +
    data +
    '">';


    thisObject.parentNode.insertBefore(showMe, thisObject);

}
}



