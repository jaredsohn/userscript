// ==UserScript==
// @name                   Startupseeds Smiles 1.1
// @namespace        http://www.downit.co.il/susscript/smile
// @description         Add Smile Support On Startupseeds.com :-)
// @include                http://www.startupseeds.com/Forums/NewMessage.aspx*
// @include                http://www.startupseeds.com/Forums/ShowThread.aspx*
// @include                http://startupseeds.com/Forums/NewMessage.aspx*
// @include                http://startupseeds.com/Forums/ShowThread.aspx*
// ==/UserScript==
//--------------------------/\Created by Adir/\--------------------------
var allDivs, thisDiv;
var smile1;
if(window.location.href.indexOf("NewMessage.aspx") != -1){
    //NewMessage
    allDivs = document.evaluate(
    "//div[@class='response']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisDiv = allDivs.snapshotItem(0);
    thisDiv.setAttribute("style", "text-align: center");
    for (var i = 1; i < 26; i++) {
        smile1 = document.createElement("img");
        smile1.setAttribute("src", "http://www.downit.co.il/e/" + i + ".gif");
        thisDiv.appendChild(smile1);
    }
}else{
    //Thread
    allDivs = document.evaluate(
    "//div[@id='ctl00_ContentPlaceHolder1_ShowThread1_qmsg1_pnlOpenMessage']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisDiv = allDivs.snapshotItem(0);
    thisDiv.setAttribute("style", "text-align: center");
    for (var i = 1; i < 26; i++) {
        smile1 = document.createElement("img");
        smile1.setAttribute("src", "http://www.downit.co.il/e/" + i + ".gif");
        thisDiv.parentNode.appendChild(smile1);
    }
}
//--------------------------/\Created by Adir/\--------------------------