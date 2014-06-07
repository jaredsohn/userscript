// ==UserScript==
// @name        fbcolorz
// @namespace   newscript
// @description Changes FaceBook background colors
// @include     https://www.facebook.com/
// @grant       none
// @version     1
// ==/UserScript==

document.body.style.background = "none repeat scroll 0% 0% rgb(250, 236, 208)"
document.getElementById("contentCol").style.backgroundColor = 'rgb(255, 244, 215)';
document.getElementById("leftCol").style.position = 'fixed'; //fixed !important
document.getElementById("pageLogo").style.display= 'none';
document.getElementById("fbRequestsJewel").style.paddingLeft= '100px';
//document.getElementById("blueBar").style.backgroundColor = 'rgb(246, 217, 152)';
//document.getElementById("fbRequestsJewel").style.paddingLeft= '100px';
//document.getElementsByClassName("UFIRow").backgroundColor="rgb(250, 245, 215)";
//document.getElementsByClassName("textInput").backgroundColor="rgb(250, 245, 215)";
//document.getElementsByClassName("shareRedesignContainer").backgroundColor="rgb(250, 245, 215)";

/*

.uiTypeahead .textInput {
    background-color: rgb(250, 245, 215);
    border: 0px none;
    -moz-box-sizing: border-box;
    outline: 0px none;
    width: 100%;
}

.UFIRow {
    background-color: rgb(250, 235, 200);
    margin-top: 1px;
    padding: 4px;
}

.shareRedesignText, .shareRedesignContainer, .shareRedesign .shareMediaVideo {
    background-color: rgb(247, 247, 247);
}


*/
