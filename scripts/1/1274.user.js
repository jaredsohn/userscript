// ==UserScript==
// @name          DreamHost Rewards Pending
// @namespace     http://squarefree.com/userscripts
// @description   Estimates how much you'll make from pending (italicized) referrals.
// @include       https://panel.dreamhost.com/index.cgi?tree=home.rew&
// ==/UserScript==

/*

  Author: Jesse Ruderman - http://www.squarefree.com/
  
  This script adds two extra paragraphs to your rewards page:
 
    If all N italicized one-time direct referrals stay, you have $NNN.00 more on the way!
 
    If all N italicized one-time secondary referrals stay, you have $NN.00 more on the way!
 
  This script assumes that all italicized referrals are less than a year old, and that all italicized referrals are due to discounts rather than domain-registration-only.
 
*/


function xpath(expr)
{ 
  return document.evaluate(expr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}

function stuff(type, amountPer)
{
  var italicizedReferrals = xpath('//text()[contains(.,"' + type + '")]').snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("i").length / 2;
  
  var newPara = document.createElement("p");
  newPara.innerHTML = "If all <b>" + italicizedReferrals + "</b> italicized " + type.toLowerCase() + " stay, you have <b>$" + (amountPer * italicizedReferrals) + ".00</b> more on the way!";

  var winningsTextNode = xpath('//text()[contains(.,"Rewards payments built up!")]').snapshotItem(0);
  winningsTextNode.parentNode.insertBefore(newPara, winningsTextNode.nextSibling);
}

stuff("One-Time Secondary Referrals", 5);
stuff("One-Time Direct Referrals", 97);
