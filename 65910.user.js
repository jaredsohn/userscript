// ==UserScript==
// @name         Create amazon affiliate links
// @namespace    http://www.schlingel.net
// @description  Create amazon affiliate links
// @include      http://www.amazon.*/*
// @include      https://www.amazon.*/*
// ==/UserScript==


//Define your Amazon Affiliate IDs
var SellerIDs = ["digital0c-21", "schlingel-21", "4hg-21"];

//get country code
function getCountryName()
{
	var country;
	var title = document.getElementsByTagName("title")[0].text;

	if(title.indexOf("Amazon.co.jp") != -1)
	{
		country = "co.jp";
	}
	else if(title.indexOf("Amazon.com") != -1)
	{
		country = "com";
	}
	else if(title.indexOf("Amazon.co.uk") != -1)
	{
		country = "uk";
	}
	else if(title.indexOf("Amazon.de") != -1)
	{
		country = "de";
	}
	else if(title.indexOf("Amazon.fr") != -1)
	{
		country = "fr";
	}
	else if(title.indexOf("Amazon.ca") != -1)
	{
		country = "ca";
	}

	return country;
}

//set link of amazon affiliate links
function setAffiliateLink()
{
	if(document.getElementById('merchantID'))
	{
		var country = getCountryName();
		var asin = document.getElementById('ASIN').value;
		var AffHTML = "";
		for (var i in SellerIDs) {
		  var curSellerID = SellerIDs [i];
		  AffHTML += "<a href=\"http://www.amazon."+country+"/exec/obidos/asin/"+asin+"/"+curSellerID+"\">Affiliate Link ("+curSellerID+")</a><br>";
	   }
	   document.getElementById("affiliateLinks").innerHTML = AffHTML;
	}
	setTimeout(setAffiliateLink, 500);
}

//main
(function(){
	if(document.getElementById('ASIN'))
	{
		//create check delivery of link
		var linkObj = document.createElement('div');
		linkObj.id = "affiliateLinks";
		linkObj.style.padding = "10px";
		linkObj.style.fontSize = "0.9em";
		var obj = document.getElementById("btAsinTitle");
		obj.appendChild(linkObj);
        
        setAffiliateLink();
	}
}
)();