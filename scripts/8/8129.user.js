// ==UserScript==
// @name          inYOfac3Book
// @namespace     znerp
// @description   Displays the pictures larger when you roll over smaller ones on facebook.com
// @include       http://*facebook.com*
// ==/UserScript==

// Original script by: Justin Rosenthal (justin.rosenthal at gmail)
// Modified by znerp.

GM_addStyle('.tip {padding:3px;visibility:hidden;position:fixed;z-index:100;color:#333333;top:20px;left:20px;background-color:#3B5998;.tip img {border:2px solid white;}');
var globalTimer;
var allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=allImages.snapshotLength-1; i>=0; i--){
    var thisImage = allImages.snapshotItem(i);
    var src = thisImage.src;
    fullsize=src.substring( 0, src.lastIndexOf('/') + 1 ) + 'n' + src.substring( src.lastIndexOf('/') + 2, src.length );
    if ((thisImage.src.indexOf('static')==-1) && (thisImage.src!=fullsize)){
    thisImage.wrappedJSObject.divID='iyft'+i;
    thisImage.addEventListener(
        'mouseover',
        function(event) {thisID = this.divID; globalTimer = window.setTimeout(function () {document.getElementById(thisID).style.visibility = "visible"},500);},
        true);
    thisImage.addEventListener(
        'mouseout',
        function(event) {window.clearTimeout(globalTimer);  document.getElementById(this.divID).style.visibility = "hidden";},
        true);
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "<div id='iyft" + i + "' class='tip'><a href="+thisImage.parentNode.href+"><img src='" + fullsize + "'></a></div>";
    document.body.appendChild(newDiv);
    }
}