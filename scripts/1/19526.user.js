// ==UserScript==
// @name           ExpertsExchangeFilter
// @namespace      All
// @description    Remove Experts Exchange Stuff
// @include        http://experts-exchange.com/*
// @include        http://www.experts-exchange.com/*
// ==/UserScript==

function rot13(s)
{
var r='';
for (var i=0, len=s.length; i<len;i++)
{
c = s.charCodeAt(i);

if ((c >= 65 && c <= 77) || (c >= 97 && c <= 109))
{
c = s.charCodeAt(i) + 13;
}
else if ((c >= 78 && c <= 90) || (c >= 110 && c <= 122))
{
c = s.charCodeAt(i) - 13;
}
r += String.fromCharCode(c);
}
return r;
}


// Kill that annoyingly large all experts exchange box
var KillBox = document.evaluate("//div[@class[contains(.,'allZonesMain')]]",
  document, null, 6, null);
KillBox.snapshotItem(0).style.display="none";


var KillAd = document.evaluate("//a[@rel[contains(.,'nofollow')]]",
  document, null, 6, null);
for(var i=0;i<KillAd.snapshotLength;i++)
{
  KillAd.snapshotItem(i).style.display="none";
}

// Kill all the stupid testimonials in the page
var KillTest = document.evaluate("//div[@class[contains(.,'testimonial')]]",
  document, null, 6, null);
for(var i=0;i<KillTest.snapshotLength;i++)
{
  KillTest.snapshotItem(i).style.display="none";
}

var KillJunk = document.evaluate("//div[@class[contains(.,'hasMouseOver')]]",
  document, null, 6, null);
for(var i=0;i<KillJunk.snapshotLength;i++)
{
  KillJunk.snapshotItem(i).style.display="none";
}

// Unblur and unencrypt only the divs that need it
var RotDivs = document.evaluate("//div[@class[contains(.,'blurred')]]",
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for(i=0;i<RotDivs.snapshotLength;i++)
{
  var RotDiv = RotDivs.snapshotItem(i);
  var Section2Fix = document.evaluate("div/div/div/div[2]/div[2]/div[2]",
    RotDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  Section2Fix.removeChild(Section2Fix.childNodes[1]);
  
  var RotSection = document.evaluate("div[@id='intelliTxt']",
    Section2Fix, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  RotSection.innerHTML = rot13(RotSection.innerHTML.replace(/<br>/,''))
}
