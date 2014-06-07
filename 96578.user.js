// ==UserScript==
// @name Lifehacker #
// @namespace BLAH
// @description Fixes shit
// @include http://lifehacker.com*
// ==/UserScript==
var u = document.createElement("div");
u.setAttribute("style", "font-family: Tahoma,Verdana,Arial,sans-serif; line-height: normal; font-size: 110%; padding: 4px 8px; font-weight: bold; position: fixed; z-index: 1; top: 0; left: 0;");
u.innerHTML = "<a href=\"http://lifehacker.com/#!tips/forum\">#tips</a> <br /> <a href=\"http://lifehacker.com/#!openthread/forum\">#openthread</a><br /> <a href=\"http://lifehacker.com/#!howto/forum\">#howto</a><br /> <a href=\"http://lifehacker.com/#!dealhacker/forum\">#dealhacker</a><br /> <a href=\"http://lifehacker.com/#!diy/forum\">#diy</a>";
document.body.insertBefore(u, document.body.firstChild);