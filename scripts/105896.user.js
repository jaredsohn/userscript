// ==UserScript==
// @name           GoogleBarPlus
// @namespace      GoogleBarPlus
// @description    GoogleBarPlus
// @include        https://plus.google.com/*
// ==/UserScript==
var olClass_gbtc=document.evaluate(
            "//div[@id='gbg']/ol[@class='gbtc']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
var final=olClass_gbtc.snapshotItem(0);
var slash=document.createElement("li");
slash.className="gbt gbtb";
slash.innerHTML='<span class="gbts"></span>';
var plusButton=document.createElement("li");
plusButton.className="gbt";
plusButton.innerHTML='<a class="gbgt" href="https://plus.google.com/notifications/mentions"><span class="gbtb2"></span><span class="gbts"><span class="gbid"></span><span class="gbids" style="display:block; font-size:16px; font-weight:blod; position:relative; width:16px; text-align:center">+</span></a>';
final.insertBefore(slash,final.firstChild);
final.insertBefore(plusButton,final.firstChild);