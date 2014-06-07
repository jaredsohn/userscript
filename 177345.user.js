// ==UserScript==
// @name          Cat Replacer
// @namespace     catreplacerextreme
// @author     	  Michelle Khuu
// @description   Replaces keywords with cat pictures BECAUSE WHY NOT
// @grant       GM_getValue
// @grant       GM_setValue
// @version .1
// ==/UserScript==

//Words to replace with cats
var triggerList = ['5th Planet Games', '5pg'];		

//List of cat pic urls
var picList = ["https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/1209762_70576067848_2052640025_q.jpg"];



var rand = Math.floor((Math.random()*picList.length));
var replace = "<img src=" + picList[rand] + ">";

for(var k = 0; k < triggerList.length; k++)
{
    var regex = new RegExp(triggerList[k], "gi");
    var html = document.body.innerHTML.replace(regex, replace);
    document.body.innerHTML = html;
}
