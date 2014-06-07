// ==UserScript==
// @name            BTC to USD Conversion
// @namespace       iamabananaamaa/btctousdconverter
// @description     Converts BTC to current USD prices.
// @version         1.0
// ==/UserScript==

var pageText = document.documentElement.innerHTML;
var matchBTC = /(\.)?[0-9]{1,3}(?:\,?[0-9]{3})*(?:\.[0-9]*)?( )?(BTC)/gi;
var matches = pageText.match(matchBTC);
var newSource = document.documentElement.innerHTML;
var used = [];

if (matches !== null)
{
  for (i=0; i<matches.length; i++) {
   if (used.indexOf(matches[i]) === -1)
   {
    if (matches[i] !== null)
    {
      var imageSrc = "http://btcticker.appspot.com/mtgox/0" + matches[i].replace(" ", "").replace(/,/g, "").toLowerCase() + ".png";
      newSource = newSource.replace(new RegExp(matches[i], "g"), matches[i] + " <img src=\"" + imageSrc + "\" alt=\"" + matches[i] + "\">");
      used.push(matches[i]);
    }
  }
}
}

var matchUSD = /\$(\.)?[0-9]{1,3}(?:\,?[0-9]{3})*(?:\.[0-9]*)?/gi;
prevMatches = pageText.match(matchUSD) || [];
matchUSD = /(\.)?[0-9]{1,3}(?:\,?[0-9]{3})*(?:\.[0-9]*)?\$/gi;
matches = [].concat(pageText.match(matchUSD) || [], prevMatches || []);

used = [];

if (matches !== null)
{
  for (i=0; i<matches.length; i++) {
    if (used.indexOf(matches[i]) === -1)
    {
      if (matches[i] !== null)
      {
        var imageSrc = "http://btcticker.appspot.com/mtgox/" + matches[i].replace("$.", "$0.").replace("$", "").replace(/,/g, "").toLowerCase() + "usd.png";
        newSource = newSource.replace(new RegExp(matches[i].replace("$", "\\$").replace(".", "\\."), "g"), matches[i] + " <img src=\"" + imageSrc + "\" alt=\"" + matches[i] + "\">");
        used.push(matches[i]);
      }
    }
  }
}

document.documentElement.innerHTML = newSource;
