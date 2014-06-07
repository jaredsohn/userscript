// ==UserScript==
// @name           Die_Plus
// @namespace      ik_diePlus
// @description    Hide the stupid plus icons.
// @include        http://s*.ikariam.*/*
// ==/UserScript==
function xpath(query) { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

/*  Hide the + on advisors   */
var plus = xpath('//div//li//a[@class="plusteaser"]');
for (var i=0; i<plus.snapshotLength; i++) { var node = plus.snapshotItem(i); node.style.display = 'none'; }

/*  Stop the spinning Ambrosia bottle   */
var li = document.getElementsByTagName("li");
for (i=0; i<li.length; i++) { if (li[i].className == "ambrosia") { li[i].className = "ambrosiaNoSpin"; } }

/*  Hide FB Button  */
document.getElementById("facebook_button").style.display="none";

/*  Uncomment this line to hide the friend list  */
//document.getElementById("friends").style.display="none";

/* Hide Naturalise button in town halls and barracks */
if (document.getElementById("cizitensOrderButton")) { document.getElementById("cizitensOrderButton").style.display = "none"; }

/*  Hide Triton Engines */
if (document.getElementById("setPremiumJetPropulsion")) { 
  document.getElementById("setPremiumJetPropulsion").style.display = "none"; 
  var h = document.getElementsByTagName("hr");
  h[0].style.display = "none";
}