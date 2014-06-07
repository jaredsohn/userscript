// ==UserScript==

// @name           Microsoft Points to Currency

// @namespace      test

// @description  Converts the MS Point values on xbox.com to their corresponding dollar or pound value and displays it alongisde
// @author       mikelid109
// @include *www.xbox.com*

// ==/UserScript==


//On/Off $ or £ select
var pounds = false;


var allDivs, thisDiv, altext, allDivs2, thisDiv2, nodeValue;
if (pounds)
{
  var ratio = (17.99 / 2100);
}
else
{
  var ratio = (20 / 1600);
}
var amount;

allDivs = document.evaluate(
    "//div[@class='XbcFloatLeft']/p/strong//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    thisDiv = allDivs.snapshotItem(i);
    nodeValue = thisDiv.nodeValue;
//    altText = document.createTextNode(' MS Points');
//    thisDiv.parentNode.replaceChild(altText, thisDiv); 
}

allDivs = document.evaluate(
    "//img[@class='XbcMSPointsImage']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) 
{
      thisDiv = allDivs.snapshotItem(i);
    var text = document.createElement("div");
    amount = Math . round (100 * (nodeValue * ratio));
    // Convert amount to string and pad with leading zeros if necessary:
     var string;
     if (amount < 10)
         string = "00" + amount;
     else if (amount < 100)
         string = "0" + amount;
     else
         string = "" + amount;

     // Insert decimal point before last two digits:
     string = string . substring (0, string . length - 2) + "." + string . substring (string . length - 2, string . length);
    if (pounds)
    {
      text.innerHTML = '-<br><strong>£' + string + '</strong>';
    }
    else
    {
      text.innerHTML = '-<br><strong>$' + string + '</strong>';
    }
    thisDiv.parentNode.insertBefore(text, thisDiv.nextSibling);
}
