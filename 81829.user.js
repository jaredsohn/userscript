/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           wangwei ExtraLink for eRepublik
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.erepublik.com/en/citizen/profile/2832733
// @include        http://*.erepublik.com/*
// ==/UserScript==


var $j = jQuery.noConflict();

var saveCookie = function(cookieKey,cookieValue) {
	var expireDate = new Date("December 31, 2020");
	expireDateStr = expireDate.toGMTString();
	document.cookie = cookieKey + "=" + cookieValue + "; path=/; expires=" + expireDateStr;
};

var getCookie = function(cookieKey) {
	var strCookie = document.cookie;
	var cookieIndex = strCookie.indexOf(cookieKey);
	if(cookieIndex != -1) {
		strCookie = strCookie.substring(cookieIndex);
		var eqIndex = strCookie.indexOf("=");
		strCookie = strCookie.substring(eqIndex + 1);
		var comIndex = strCookie.indexOf(";");
		if(comIndex != -1) {
			strCookie = strCookie.substring(0,comIndex);
		}
		return strCookie;
	} else {
		return "";
	}
};

var addLink = function() {

	var curCountryId = $j("#side_bar_natural_currency_id").text();
	
	var foodlink = $j("#menu3>ul>li>a").eq(0).attr("href") + "/1" ;
	var houselink = $j("#menu3>ul>li>a").eq(0).attr("href") + "/3" ;
	var goldlink =  $j("#menu3>ul>li>a").eq(1).attr("href") + "#buy_currencies=62;sell_currencies="+curCountryId+";page=1" ;
	var moneylink =  $j("#menu3>ul>li>a").eq(1).attr("href") + "#buy_currencies="+curCountryId+";sell_currencies=62;page=1" ;
	
	var foodAttribute = getCookie("foodType");
	var houseAttribute = getCookie("houseType");
	if(foodAttribute != "") {
		foodlink += foodAttribute;
	}
	if(houseAttribute != "") {
		houselink += houseAttribute;
	}
	
	var welness = $j(".citizen_attributes>li>span").eq(0).text();
	var happy = $j(".citizen_attributes>li>span").eq(1).text();
	var gold = $j("#side_bar_gold_account_value").text();
	var money = $j("#side_bar_natural_account_value").text();
	if(money == "") {
		money = $j("#accountdisplay>div").eq(1).text().trim();
		$j("#accountdisplay>div").eq(1).html("<img class='flag' alt='CNY' title='CNY' src='/images/flags/S/China.gif' /><div id='side_bar_natural_account_value'>"+money+"</div>");
	}

	$j(".citizen_attributes>li>span").eq(0).html("<a href='"+foodlink+"'>"+welness+"</a>");
	$j(".citizen_attributes>li>span").eq(1).html("<a href='"+houselink+"'>"+happy+"</a>");
	$j("#side_bar_gold_account_value").html("<a href='"+goldlink+"'>"+gold+"</a>");
	$j("#side_bar_natural_account_value").html("<a href='"+moneylink+"'>"+money+"</a>");
	
	$j("#side_bar_natural_account_value").after("<br/><div><img style='height:20px;width:20px' src='http://www.erepublik.com/images/modules/timemanagement/entertaiment_link.png'/><a href='http://economy.erepublik.com/en/entertain'>rest</a></div>");
	$j("#side_bar_natural_account_value").after("<br/><div><img style='height:20px;width:20px' src='http://www.erepublik.com/images/modules/timemanagement/library_link.png'/><a href='http://economy.erepublik.com/en/study'>study</a></div>");
	$j("#side_bar_natural_account_value").after("<br/><div><img style='height:20px;width:20px' src='http://www.erepublik.com/images/modules/timemanagement/training_grounds_link.png'/><a href='http://economy.erepublik.com/en/train'>train</a></div>");
	$j("#side_bar_natural_account_value").after("<br/><div><img style='height:20px;width:20px' src='http://www.erepublik.com/images/modules/timemanagement/company_link.png'/><a href='http://economy.erepublik.com/en/work'>work</a></div>");
	
	
	
	
};

if(document.location.href.indexOf("http://economy.erepublik.com/en/market/") == 0) {
	// in food market
	var marketType = document.location.href.substring("http://economy.erepublik.com/en/market/".length).split("/");
	var countryId = marketType[0];
	var productType = marketType[1];
	
	if(productType == "1") {
		// food
		var foodType = location.href.substring(("http://economy.erepublik.com/en/market/"+countryId+"/1").length);
		saveCookie("foodType" , foodType);
		$j("#eads").after("<iframe src='http://www.erepublik.com/en/usetosetcookie?foodType="+foodType+"' width='1' height='1' style='visibility:hidden'/>");
	} else if(productType == "3") {
		// house
		var houseType = location.href.substring(("http://economy.erepublik.com/en/market/"+countryId+"/3").length);
		saveCookie("houseType" , houseType);
		$j("#eads").after("<iframe src='http://www.erepublik.com/en/usetosetcookie?houseType="+houseType+"' width='1' height='1' style='visibility:hidden'/>");
	}
	
	
	addLink();
} else {
	if(document.location.href.indexOf("http://www.erepublik.com/en/usetosetcookie") == 0) {
		var setInfo = document.location.href.substring("http://www.erepublik.com/en/usetosetcookie".length + 1).split("=");
		saveCookie(setInfo[0] , setInfo[1]);
		return;
	}
	
	addLink();
}

