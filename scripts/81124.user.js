/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           hatasu Autodonater for eRepublik Rising
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.erepublik.com/en/citizen/profile/1243317
// @include        http://economy.erepublik.com/*
// ==/UserScript==



if(document.location.href.substring(document.location.href.length - 6) == "donate") {

	var buyCountSpan = document.createElement("span");
	var maxPriceSpan = document.createElement("span");
	var br = document.createElement("br");
	buyCountSpan.appendChild(document.createTextNode("   Darabszám:"));
	maxPriceSpan.appendChild(document.createTextNode("   Max ár:"));
	
	var startButton = document.createElement("A");
	var buyCount = document.createElement("input");
	buxCount = buyCount*2;
	buyCount.id = "buyCount";
	var maxPrice = document.createElement("input");
	maxPrice.id = "maxPrice";
	startButton.appendChild(document.createTextNode("Start"));
	startButton.className = "fluid_blue_light_big";
	startButton.href = "javascript:document.cookie='buyCount=' + document.getElementById('buyCount').value + ';path=/' ;document.cookie='maxPrice=' + document.getElementById('maxPrice').value + ';path=/' ; document.location.href = document.getElementById('items1').children[0].children[0].href;document.cookie = 'companyLink=' + document.location.href + ';path=/';";
	startButton.style.cursor = "hand";
	document.getElementById("donationlink").parentNode.appendChild(startButton);
	document.getElementById("donationlink").parentNode.appendChild(buyCountSpan);
	document.getElementById("donationlink").parentNode.appendChild(buyCount);
	document.getElementById("donationlink").parentNode.appendChild(br);
	document.getElementById("donationlink").parentNode.appendChild(maxPriceSpan);
	document.getElementById("donationlink").parentNode.appendChild(maxPrice);
	
	var own = document.getElementById("own");
	var other = document.getElementById("other");
	other.style.height = "151px";
	for(var f=0;f<2;f++) {
	for(var i=0;i<10;i++) {
		try{
			if(own.children.length > 0) {
				other.appendChild(own.children[0]);
			}
		} catch(e) {
			alert(e);
		}
	}
	}
	if(own.children.length == 0 && other.children.length == 0) {
		var strCookie = document.cookie;
		var buyCountIndex = strCookie.indexOf("buyCount");
		if(buyCountIndex == -1) {
			return;
		}
		strCookie = strCookie.substring(buyCountIndex);
		var eqIndex = strCookie.indexOf("=");
		strCookie = strCookie.substring(eqIndex + 1);
		var comIndex = strCookie.indexOf(";");
		if(comIndex != -1) {
			strCookie = strCookie.substring(0,comIndex);
		}
		var intBuyCount = parseInt(strCookie);
		if(intBuyCount <= 0) {
			return;
		}
		
		document.location.href = document.getElementById('items1').children[0].children[0].href;
	} else {
		var strCookie = document.cookie;
		var buyCountIndex = strCookie.indexOf("buyCount");
		if(buyCountIndex == -1) {
			return;
		}
		strCookie = strCookie.substring(buyCountIndex);
		var eqIndex = strCookie.indexOf("=");
		strCookie = strCookie.substring(eqIndex + 1);
		var comIndex = strCookie.indexOf(";");
		if(comIndex != -1) {
			strCookie = strCookie.substring(0,comIndex);
		}
		var intBuyCount = parseInt(strCookie);
		intBuyCount = intBuyCount - 20;
		if(intBuyCount <= -20) {
			return;
		}
		document.cookie = "buyCount=" + intBuyCount + ";path=/";;
		document.forms[0].submit();
	}
	
	
}
if(document.location.href.indexOf("market") != -1) {
	var tables = document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++) {
		if(tables[i].className.indexOf("error_message") != -1 ) {
			document.cookie = "buyCount=0;path=/";
			document.cookie = "companyLink=;path=/";
			return;
		}
		if(tables[i].className.indexOf("success_message") != -1 ) {
			var strCookie = document.cookie;
			var companyLinkIndex = strCookie.indexOf("companyLink");
			if(companyLinkIndex == -1) {
				return;
			}
			strCookie = strCookie.substring(companyLinkIndex);
			var eqIndex = strCookie.indexOf("=");
			strCookie = strCookie.substring(eqIndex + 1);
			var comIndex = strCookie.indexOf(";");
			if(comIndex != -1) {
				strCookie = strCookie.substring(0,comIndex);
			}
			var companyLink = strCookie;
			if(companyLink.length <= 0) {
				return;
			}
			document.location.href = companyLink;
			return;
		}
	}
	var strCookie = document.cookie;
	var buyCountIndex = strCookie.indexOf("buyCount");
	if(buyCountIndex == -1) {
		return;
	}
	strCookie = strCookie.substring(buyCountIndex);
	var eqIndex = strCookie.indexOf("=");
	strCookie = strCookie.substring(eqIndex + 1);
	var comIndex = strCookie.indexOf(";");
	if(comIndex != -1) {
		strCookie = strCookie.substring(0,comIndex);
	}
	var intBuyCount = parseInt(strCookie);
	if(intBuyCount <= 0) {
		return;
	}
	
	var amountText = document.getElementsByTagName("input")[0];
	var price = document.getElementsByTagName("input")[0].parentNode.parentNode.children[3].innerHTML;
	price = price.replace(/\<.*?\>/g,"").trim();
	price = price.substring(0 , price.indexOf(" "));
	price = parseFloat(price);
	strCookie = document.cookie;
	var maxPriceIndex = strCookie.indexOf("maxPrice");
	if(maxPriceIndex == -1) {
		return;
	}
	strCookie = strCookie.substring(maxPriceIndex);
	var eqIndex = strCookie.indexOf("=");
	strCookie = strCookie.substring(eqIndex + 1);
	var comIndex = strCookie.indexOf(";");
	if(comIndex != -1) {
		strCookie = strCookie.substring(0,comIndex);
	}
	var maxPrice = parseFloat(strCookie);
	if(maxPrice < price) {
		document.cookie = "buyCount=0;path=/";
		document.cookie = "companyLink=;path=/";
		alert("expensive");
		return;
	}



	amountText.value = 10;
	var id = amountText.id.substring(amountText.id.indexOf("_") + 1);
	document.getElementById("buyMarketOffer_amount").value = 10;
	document.getElementById("buyMarketOffer_offerId").value = id;
	document.forms[0].submit();
	
}
