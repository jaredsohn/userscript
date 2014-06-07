// ==UserScript==
// @name           Snowwars Auto'r
// @description	   Autoplays Snowwars till the small guys are found.
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/games/snowwars.phtml*
// ==/UserScript==

var x = 1000 //change the page delay here; 1000 = 1 second
function delay() {
if (GM_getValue("snow1") != 5){
	var button = document.evaluate('//div[@style="padding: 7px;"]/table[1]//td[@background="http://images.neopets.com/games/snowwars/3_1.gif"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){if(GM_getValue("snow2")==1){return}GM_setValue("snow1","1")}}
if (GM_getValue("snow2") != 5){
	var button = document.evaluate('//div[@style="padding: 7px;"]/table[1]//td[@background="http://images.neopets.com/games/snowwars/4_1.gif"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){if(GM_getValue("snow1")==1){return}GM_setValue("snow2","1")}}

var button = document.evaluate('//table[@border="2" and @align ="center"]//b[.="\?"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (button.snapshotLength > 0){button = button.snapshotItem(0);
selectedlink=button.parentNode.parentNode.href;window.location = selectedlink}

if(document.body.innerHTML.indexOf('You fire') != -1){
		var button = document.evaluate('//input[@type = "submit" and @value = "Continue Game"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}

if(document.body.innerHTML.indexOf('YOU WON!!!') != -1){
			var button = document.evaluate('//input[@type = "submit" and @value = "Play Again!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}

if(document.body.innerHTML.indexOf('You Lost') != -1){
			var button = document.evaluate('//input[@type = "submit" and @value = "Play Again!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}

			
if(document.body.innerHTML.indexOf('Lets Play') != -1){
	GM_setValue("snow1","0");
	GM_setValue("snow2","0");
	var button = document.evaluate('//input[@type = "submit" and @value = "Lets Play!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);button.click();button.form.submit();return}
}window.setTimeout(delay, x)