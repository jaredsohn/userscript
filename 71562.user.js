// ==UserScript==
// @name           Double Or Nothing Autoplayer
// Edited by	   Deadly_Dennis
// @namespace      http://userscripts.org/users/83296
// @description    Plays Double or Nothing for you.
// @include        http://www.neopets.com/medieval/doubleornothing.phtml*
// ==/UserScript==

// <--- this mean you can change it yourself !!!
//timeout function
//change the page delay here; 1000 = 1 second

var x = 3000 
function timeout() {	 


// 				Change this amount to when you want this script to stop...
if(document.body.innerHTML.indexOf('640 NP') != -1){
return
}

if(document.body.innerHTML.indexOf('Continue') != -1){
  var button = document.evaluate('//form[contains(@action,"doubleornothing.phtml")]/input[@type = "submit" and @value = "Continue"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if (document.body.innerHTML.indexOf('Try again...') != -1){
  var button = document.evaluate('//form[contains(@action,"doubleornothing.phtml")]/input[@type = "submit" and @value = "Try again..."]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
								

//							Change this to the amount of NP you want it to stop...--------------------------- Also here...
}if (document.body.innerHTML.indexOf('Collect Your Winnings - 320 NP') != -1){
  var button = document.evaluate('//form[contains(@action,"doubleornothing.phtml")]/input[@type = "submit" and @value = "Collect Your Winnings - 320 NP"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
if (document.body.innerHTML.indexOf('Play Again!!!') != -1){
  var button = document.evaluate('//form[contains(@action,"doubleornothing.phtml")]/input[@type = "submit" and @value = "Play Again!!!"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    flip = links.snapshotItem(i);

    if (flip.href.match('doubleornothing.phtml.type=cointoss'))
    {
	document.location=flip.href;						
	return;
    }
}

}
window.setTimeout(timeout, x)