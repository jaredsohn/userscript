/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           wangwei CompanyProfitCalc for eRepublik
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.erepublik.com/en/citizen/profile/2832733
// @include        http://economy.erepublik.com/en/company/employees/*
// ==/UserScript==


var $j = jQuery.noConflict();


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


var getJSON = function(jsonstr,key) {
	var index = jsonstr.indexOf(key);
	if(index == -1) {	
		return "";
	}
	var startIndex = index + key.length + 3;
	var endIndex = jsonstr.indexOf("\"" , startIndex);
	if(endIndex == -1) {
		return "";
	}
	return jsonstr.substring(startIndex,endIndex);
};

$j(".el_mainh").append("<th class='el_salary'><a href='javascript:;' id='profit_header'>Profit</a></th>");

$j("#profit_header").click(function(){

	var expireDate = new Date("December 31, 2020");
	expireDateStr = expireDate.toGMTString();

	if($j(".p_container").size() == 0) {
		return;
	}

	if($j("#employee_list>table>tbody>tr>.el_salary>.p_container").size() == 0) {
		for(var i=0;i<$j(".p_container").size();i++) {
			$j("#employee_list>table>tbody>tr>.el_salary").eq(i).append($j(".p_container").eq(i));
		}
		document.cookie = "profit_position=under; path=/ ; expires=" + expireDateStr;

	} else {
		for(var i=0;i<$j(".p_container").size();i++) {
			$j("#employee_list>table>tbody>tr>.el_salary").eq(i).after($j(".p_container").eq(i));
		}
		document.cookie = "profit_position=right; path=/ ; expires=" + expireDateStr;
	}
});

var eToday = $j(".eday").text().trim().split(" ")[1].replace(",","");
var eTodayIndex = (eToday - 965) % 7;
var empCount = $j(".el_employee").size() - 1;
var empMulti = 2;

var currency = $j(".ecur").eq(0).text();

$j(".biggersection").before("<div id='main_container'></div><br/><br/><br/>");

var tableContent  = "<table border='0' cellpadding='0' style='width:560px'>";
tableContent	 += "<tr>";	
tableContent	 += "<td style='text-align:right'>";
tableContent	 += "Sell Price:";
tableContent	 += "</td>";	
tableContent	 += "<td class='el_salary'>";	
tableContent	 += "<input type='text' id='sellprice' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "</td>";	
tableContent	 += "<td title='Total Estimate Productivity' style='text-align:right'>";
tableContent	 += "total epd:";
tableContent	 += "</td>";	
tableContent	 += "<td>";	
tableContent	 += "<input type='text' id='totalepd' readonly='true' class='shadowed buyField' size='6'/>";
tableContent	 += "</td>";	
tableContent	 += "<td title='Total Estimate Profit' style='text-align:right'>";	
tableContent	 += "total epr:";
tableContent	 += "</td>";	
tableContent	 += "<td class='el_salary'>";	
tableContent	 += "<input type='text' id='totalepr' readonly='true' style='width:60px' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "</td>";	
tableContent	 += "<td rowspan='2'>";	
tableContent	 += "<a id='calcButton' href='javascript:;' class='fluid_blue_light_big submitdonate'><span>Calculate</span></a></span>";
tableContent	 += "</td>";	
tableContent	 += "</tr>";	
tableContent	 += "<tr>";	
tableContent	 += "<td style='text-align:right'>";
tableContent	 += "Raw Price:";
tableContent	 += "</td>";	
tableContent	 += "<td class='el_salary'>";	
tableContent	 += "<input type='text' id='rawprice' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "</td>";	
tableContent	 += "<td title='Total Real Productivity' style='text-align:right'>";
tableContent	 += "total rpd:";
tableContent	 += "</td>";	
tableContent	 += "<td>";	
tableContent	 += "<input type='text' id='totalrpd' readonly='true' class='shadowed buyField' size='6'/>";
tableContent	 += "</td>";	
tableContent	 += "<td title='Total Real Profit' style='text-align:right'>";	
tableContent	 += "total rpr:";
tableContent	 += "</td>";	
tableContent	 += "<td class='el_salary'>";	
tableContent	 += "<input type='text' id='totalrpr' readonly='true' style='width:60px' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "</td>";	
tableContent	 += "</tr>";	
tableContent	 += "</table><br/>";	

$j("#main_container").append(tableContent);

var prodType = $j(".product_type").attr("alt");
var prodLevel = 1;
var rawPerProd = 1;

var costRaw = 1;

var recEmpCount = 10;

if(prodType == "Iron" || prodType == "Grain" || prodType == "Stone" || prodType == "Oil" || prodType == "Titanium") {
	$j("#rawprice").attr("disabled","true");
	var prodLevel = -1;
} else {
	var companyInfo = $j(".product_type").attr("src");
	var startIndex = companyInfo.lastIndexOf("/");	
	var endIndex = companyInfo.lastIndexOf(".");	
	var prodLevel = parseInt(companyInfo.substring(startIndex + 2 , endIndex));

	if(prodType == "Food") {
		rawPerProd = prodLevel * 9;
	}
	else if(prodType == "Moving Tickets") {
		rawPerProd = prodLevel * 80;
	}
	else if(prodType == "Tank") {
		rawPerProd = prodLevel * 300;
	}
	else if(prodType == "Tank") {
		rawPerProd = prodLevel * 300;
	}
	else if(prodType == "Air Unit") {
		rawPerProd = prodLevel * 450;
	}
	else if(prodType == "Rifle") {
		rawPerProd = prodLevel * 100;
	}
	else if(prodType == "Artillery") {
		rawPerProd = prodLevel * 150;
	}
	else if(prodType == "House") {
		recEmpCount = 20;
		rawPerProd = prodLevel * 1000;
	}
	else if(prodType == "Defense System") {
		recEmpCount = 20;
		rawPerProd = prodLevel * 20000;
	}
	else if(prodType == "Hospital") {
		recEmpCount = 20;
		rawPerProd = prodLevel * 20000;
	}
}


if(empCount < recEmpCount) {
	empMulti = 1 + (empCount / recEmpCount);
} else {
	empMulti = 3 - (empCount / recEmpCount);
}
if(empMulti < 1) {
	empMulti = 1;
}

var profit_position = getCookie("profit_position");

$j("#employee_list>table>tbody>tr>.el_salary").each(function(index,ele){
	if(profit_position == "under") {
		$j(this).append("<td class='p_container'></td>");
	} else {
		$j(this).after("<td class='p_container'></td>");
	}
});




var recalc = function() {

	var itotalepd = 0;
	var itotalrpd = 0;
	var floattotalepr = 0.0;
	var floattotalrpr = 0.0;

	var price = $j("#sellprice").val();
	var rawPrice = $j("#rawprice").val();

	var expireDate = new Date("December 31, 2020");
	expireDateStr = expireDate.toGMTString();

	var companyId = $j(".product_attributes").attr("id");
	
	document.cookie = companyId + "_sellprice=" + price + "; path=/; expires=" + expireDateStr;
	document.cookie = companyId + "_rawprice=" + rawPrice + "; path=/; expires=" + expireDateStr;

$j("#employee_list>table>tbody>tr>.el_salary").each(function(index,ele){

	$j(".p_container").eq(index).html("");

	var skillLevel = $j(".skiller").eq(index).text().trim().split(" ")[0];
	var profileId = $j(".el_img").eq(index).attr("href");
	profileId = profileId.substring(profileId.lastIndexOf("/") + 1);
	var salary = $j("#employee_list>table>tbody>tr>.el_salary>div>.sallary_field").eq(index).val();

	var workTime = 8;
	var wellness = 95;
	var happiness = 95;
	if(eTodayIndex > 0) {
		try {
			var workResultTD = $j(".el_day").eq(index * 7 + eTodayIndex - 1);
			workTime = $j("small" , workResultTD).text();
			workTime = workTime.substring(0 , workTime.length - 1);
			var json = $j("script" , workResultTD).text();
			wellness = getJSON(json,"well");
			happiness = getJSON(json,"happ");
		} catch(e) {
			// do nothing
		}
	}

	if(workTime == "") {
		workTime = 8;
		wellness = 95;
		happiness = 95;
	}


	var productivity = parseInt(0.5 * empMulti * skillLevel * ((1 + 2 * wellness / 100)  + (1 + 2 * happiness / 100)) * workTime * 1.1);

	itotalepd += parseInt(productivity);

	if(prodLevel == -1) {
		$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;epd:"+productivity+"</span>");

		var profit = parseInt((productivity * price - salary * workTime) * 100) / 100;
		$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;epr:"+profit+"</span>");
		$j(".p_container").eq(index).append("<br/>");

		floattotalepr += parseFloat(profit);

		var workResultTD = $j(".el_day").eq(index * 7 + eTodayIndex);

		if(workResultTD.text() != "") {
			
			json = $j("script" , workResultTD).text();
			var units = getJSON(json,"units").replace(",","");
			productivity = 	$j("strong" , workResultTD).text().replace(",","");	

			if(parseInt(units) < parseInt(productivity) - 1) {
				productivity = units;
			}

			workTime = $j("small" , workResultTD).text();
			workTime = workTime.substring(0 , workTime.length - 1);
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpd:"+productivity+"</span>");
			itotalrpd += parseInt(productivity);
			profit = parseInt((productivity * price - salary * workTime) * 100) / 100;
			if(profit < 0) {
				$j(".p_container").eq(index).append("<span style='color:red'>&nbsp;&nbsp;&nbsp;&nbsp;rpr:"+profit+"</span>");
			} else {
				$j(".p_container").eq(index).append("<span style='color:green'>&nbsp;&nbsp;&nbsp;&nbsp;rpr:"+profit+"</span>");
			}

			floattotalrpr += profit;
		} else {
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpd:</span>");
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpr:</span>");
		}
	} else {
		$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;epd:"+productivity+"</span>");

		var prodCount = productivity / rawPerProd;

		var profit = parseInt((prodCount * price - salary * workTime - productivity * rawPrice) * 100) / 100;
		$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;epr:"+profit+"</span>");
		
		floattotalepr += parseFloat(profit);
		
		$j(".p_container").eq(index).append("<br/>");

		var workResultTD = $j(".el_day").eq(index * 7 + eTodayIndex);

		if(workResultTD.text() != "") {
			productivity = 	$j("strong" , workResultTD).text().replace(",","");	
			var prodCount = productivity / rawPerProd;
			workTime = $j("small" , workResultTD).text();
			workTime = workTime.substring(0 , workTime.length - 1);
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpd:"+productivity+"</span>");
			itotalrpd += parseInt(productivity);
			var profit = parseInt((prodCount * price - salary * workTime - productivity * rawPrice) * 100) / 100;
			if(profit < 0) {
				$j(".p_container").eq(index).append("<span style='color:red'>&nbsp;&nbsp;&nbsp;&nbsp;rpr:"+profit+"</span>");
			} else {
				$j(".p_container").eq(index).append("<span style='color:green'>&nbsp;&nbsp;&nbsp;&nbsp;rpr:"+profit+"</span>");
			}
			floattotalrpr += profit;
		} else {
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpd:</span>");
			$j(".p_container").eq(index).append("<span>&nbsp;&nbsp;&nbsp;&nbsp;rpr:</span>");
		}
	}
});

	$j("#totalepd").val(itotalepd);
	$j("#totalepr").val(parseInt(floattotalepr*100)/100);
	if(floattotalepr<0) {
		$j("#totalepr").css("color","red");
	} else {
		$j("#totalepr").css("color","green");
	}
	$j("#totalrpd").val(itotalrpd);
	$j("#totalrpr").val(parseInt(floattotalrpr*100)/100);
	if(floattotalrpr<0) {
		$j("#totalrpr").css("color","red");
	} else {
		$j("#totalrpr").css("color","green");
	}

	


}

$j("#calcButton").click(function(){
	recalc();
});


var cid = $j(".product_attributes").attr("id");
var sellPriceFromCookie = getCookie(cid + "_sellprice");
var rawPriceFromCookie = getCookie(cid + "_rawprice");

if(sellPriceFromCookie != "") {
	$j("#sellprice").val(sellPriceFromCookie);
	$j("#rawprice").val(rawPriceFromCookie);
	recalc();
}
