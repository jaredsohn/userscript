// ==UserScript==
// @name       39 OA-Auto
// @namespace  http://mikespook.com/
// @version    0.1
// @description  
// @match      https://oa.39.net/*
// @copyright  2012+, mikespook
// ==/UserScript==
    
if (location.href.indexOf("IndexDO.aspx") != -1) {
    location.href = "https://oa.39.net/OAFlow/" + document.getElementsByClassName("last")[1].children[0].getAttribute("href") + "&isBreak=1&pageName=BuQianMng"
}
if (location.href.indexOf("BuQianMng.aspx") != -1 || 
    location.href.indexOf("HolidayMng.aspx") != -1 ||
   location.href.indexOf("JiaBanMng.aspx") != -1) {    
    window.setTimeout(FireClick, 500);
}
function BackToIndexDO() {
    location.href = "https://oa.39.net/OAFlow/IndexDO.aspx";
}
function FireClick() {    
    var event = document.createEvent("MouseEvents")
    event.initEvent("click", true, true);    
    document.getElementById("btnOK").dispatchEvent(event);
    window.setTimeout(BackToIndexDO, 1000);
}