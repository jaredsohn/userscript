// ==UserScript==
// @id             easyamazonaffiliatelinks@http://luckz.de
// @name           Easily create Amazon affiliate links (international)
// @version        1.0.0
// @namespace      http://luckz.de
// @author         luckz
// @description    Easily create Amazon affiliate links for all Amazon websites you have an affiliate account on
// @include        http://www.amazon.*/*
// @include        https://www.amazon.*/*
// @include        https://*.amzn.com/*
// @run-at         document-end
// ==/UserScript==

//based on http://userscripts.org/scripts/review/65910
//modified to support more Amazon countries (and fix the present ones) and most importantly added per-country Affiliate IDs



//Define your Amazon Affiliate IDs down here for the countries you have some for

function getAffiliateID()
{
	var AffiliateID;
	var title = document.getElementsByTagName("title")[0].text;
	
	if(title.indexOf("Amazon.com") != -1)
	{
		AffiliateID = "amazzoon-20";
	}
	else if(title.indexOf("Amzn.com") != -1)
	{
		AffiliateID = "amazzoon-20";
	}
	else if(title.indexOf("Amazon.co.uk") != -1)
	{
		AffiliateID = "normabates-21";
	}
	else if(title.indexOf("Amazon.de") != -1)
	{
		AffiliateID = "tagtagtagtag-21";
	}
	else if(title.indexOf("Amazon.fr") != -1)
	{
		AffiliateID = "zoomzoomzoom-21";
	}
	else if(title.indexOf("Amazon.es") != -1)
	{
		AffiliateID = "fuegofuegofue-21";
	}
	else if(title.indexOf("Amazon.it") != -1)
	{
		AffiliateID = "zoomzoomzoo0b-21";
	}
	else if(title.indexOf("Amazon.ca") != -1)
	{
		AffiliateID = "buybuybuy0b-20";
	}
	else if(title.indexOf("Amazon.co.jp") != -1)
	{
		AffiliateID = "";
	}
	else if(title.indexOf("Amazon.cn") != -1)
	{
		AffiliateID = "";
	}

	return AffiliateID;
}
	

//get country code
function getCountryName()
{
	var country;
	var title = document.getElementsByTagName("title")[0].text;

	if(title.indexOf("Amazon.com") != -1)
	{
		country = "com";
	}
	else if(title.indexOf("Amzn.com") != -1)
	{
		country = "com";
	}
	else if(title.indexOf("Amazon.co.uk") != -1)
	{
		country = "co.uk";
	}
	else if(title.indexOf("Amazon.de") != -1)
	{
		country = "de";
	}
	else if(title.indexOf("Amazon.fr") != -1)
	{
		country = "fr";
	}
	else if(title.indexOf("Amazon.es") != -1)
	{
		country = "es";
	}
	else if(title.indexOf("Amazon.it") != -1)
	{
		country = "it";
	}
	else if(title.indexOf("Amazon.ca") != -1)
	{
		country = "ca";
	}
	else if(title.indexOf("Amazon.co.jp") != -1)
	{
		country = "co.jp";
	}
	else if(title.indexOf("Amazon.cn") != -1)
	{
		country = "cn";
	}

	return country;
}

//set link of amazon affiliate links
function setAffiliateLink()
{
	if(document.getElementById('merchantID'))
	{
		var country = getCountryName();
		var AffiliateID = getAffiliateID();
		var asin = document.getElementById('ASIN').value;
		document.getElementById("affiliateLinks").innerHTML = "<a href=\"http://www.amazon."+country+"/exec/obidos/asin/"+asin+"/"+AffiliateID +"\" target=\"_blank\">Affiliate Link</a>";
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

		//set link of amazon affiliate blogParts
		setAffiliateLink();
	}
}
)();