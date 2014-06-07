// ==UserScript==
// @name           Kiss the Mortog Auto Player
// @description	   Plays Kiss the Mortog until it reaches the score of 5,900.
// @namespace      http://userscripts.org/users/104935
// @include        http://www.neopets.com/medieval/kissthemortog.phtml*
// set to stop at 35000 neopoints, just change it higher or lower if needed.
// ==/UserScript==

var x = 1000 //change the delay here; 1000 = 1 second

function delay() {
if(document.body.innerHTML.indexOf('5,900 NP') != -1){
return
}

if(document.body.innerHTML.indexOf('Continue') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Continue"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
if (document.body.innerHTML.indexOf('Try again...') != -1){
  var button = document.evaluate('//form[contains(@action,"kissthemortog.phtml")]/input[@type = "submit" and @value = "Try again..."]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if (document.body.innerHTML.indexOf('Select your Mortog') != -1){
var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; ++i)
{
    flip = links.snapshotItem(i);

    if (flip.href.match('kissthemortog.phtml.type=frogprince&num=1'))
    {
	document.location=flip.href;						
	return;
    }
}
}
}
window.setTimeout(delay, x)