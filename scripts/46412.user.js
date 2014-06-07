// ==UserScript==
// @name           AutoHaggler
// @namespace      http://userscripts.org/users/83296
// @description    Auto Haggles On Neopets
// @include        http://*.neopets.*/haggle.phtml*
// @include        http://neopets.*/haggle.phtml*
// this is a script i got off http://www.ab3r.com/ and modified a little.
// ==/UserScript==
var wil = 4000 //change delay after purchasing to maximize "buying chains" with 5 second buy limit rule; the 4000 equals 4 secs btw
var x = "http://www.neopets.com/objects.phtml?type=shop&obj_type=30" //change this to whatever the shops address is that your shopping at!


function GetBetween(zStr, zStart, zEnd){
	var zStr = zStr; var zStart = zStart; var zEnd = zEnd;
	var z1 = zStr.indexOf(zStart); var z2 = zStr.indexOf(zEnd, z1);
	if(z2 > z1 && z1 > -1){
		return zStr.substring(z1 + zStart.length,z2);
	}else{
		return "";
	}
}

function SmartHaggle(priceth){
	var pricelength = priceth.length;
	var returnval = priceth.charAt(0) + priceth.charAt(1);
	for (i = 2; i < pricelength; i++) 
	{
    	returnval = returnval + priceth.charAt( Math.round(Math.random()) );
	}
	return returnval;
}

var URL = window.location.href; URL = URL.toLowerCase();
if(URL.indexOf("neopets.") > 0){
	var DOMAIN = "neopets";
}

if(DOMAIN == "neopets"){
	var strHTML = document.body.innerHTML;
	if(strHTML.indexOf("I want at least ") > 1){
		var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I want at least "," Neopoints for this great item.'");
		document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
	}else if(strHTML.indexOf("I wont take less than ") > 1){
		var haggle = GetBetween(strHTML,"<b>The Shopkeeper says 'I wont take less than "," Neopoints for it.'");
		document.getElementsByName("current_offer")[0].value = SmartHaggle(haggle.replace(",",""));
	}
}
////////////////////////wil_01////////////below is all i've added/////////////////////////////////////
if(document.body.innerHTML.indexOf('Due to massive demand')  != -1){
  var button = document.evaluate('//input[@type = "hidden" and @name = "obj_type"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}
if(document.body.innerHTML.indexOf('has been added to your inventory') != -1){
  function foo(){
  	window.location=x; 
  }window.setTimeout(foo, wil)
}
if(document.body.innerHTML.indexOf('SOLD OUT!') != -1){
  window.location=x; 
}