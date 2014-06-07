// ==UserScript==
// @name           Double Or Nothing Auto Player
// @namespace      http://userscripts.org/users/104935
// @description    Plays Double or Nothing for you until it reach the score of 320.
// @include        http://www.neopets.com/medieval/doubleornothing.phtml*
// ==/UserScript==

var x = 1000 //change the page delay here; 1000 = 1 second
function timeout() {	//timeout function 

if(document.body.innerHTML.indexOf('320 NP') != -1){
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