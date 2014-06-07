/* License
Well, to make it short. This program is distributed as public domain
in the hope that it will be useful, but WITHOUT ANY WARRANTY!
*/

// ==UserScript==
// @name           wangwei Autodonater for eRepublik
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.erepublik.com/en/citizen/profile/2832733
// @include        http://economy.erepublik.com/*
// @include        http://www.erepublik.com/*
// ==/UserScript==

var version = "1.3";
var $j = jQuery.noConflict();
var eToday = $j(".eday").text().trim().split(" ")[1].replace(",","");
var eTodayIndex = (eToday - 965) % 7;


$j("#logo").after("<span id='company_quicklink' style='display:inline;position:absolute;left:200px;top:80px'></span>");

var saveCookie = function(cookieKey,cookieValue) {
	document.cookie = cookieKey + "=" + cookieValue + "; path=/";
};

var addQuickLink = function(cinfo) {
	$j(".offers>tbody>tr" , cinfo).each(function(index,ele) {
		if(index == 0) {
		} else {
			var companyLink = $j(ele).find(".avatarholder").attr("href");
			var companyName = $j(ele).find(".avatarholder").attr("title");
			
			 var optionStr = "<option value='http://economy.erepublik.com"+companyLink+"'";
          if(document.location.href == "http://economy.erepublik.com" + companyLink) {
              optionStr += " selected=true ";
          }
          optionStr += ">"+companyName+"</option>";
          $j("#quick_select").append(optionStr);
	   }
   });        
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

var checkSwap = function() {
	if($j("#currency_switch").size()<=0) {
		showSwap();
	}
	window.setTimeout(checkSwap, 500);
}

var showSwap = function() {
	var changeLink = '<a id="currency_switch" href="javascript:void(0)" style="display: inline; position:relative; left: 328px; top: -20px;"><img src="/images/parts/icon_show-off.gif"/>&nbsp;&nbsp;swap currency</a>';
	$j("#filters").append(changeLink);
	var curLink = $j("#buy_selector").attr("href").split("=");
	var newLink = "http://www.erepublik.com/en/exchange#buy_currencies="+curLink[2].substring(0,curLink[2].indexOf(";"))+";sell_currencies="+curLink[1].substring(0,curLink[1].indexOf(";"))+";page=1";
	$j("#currency_switch").attr("href",newLink);
}


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

var parseExchangeInfo = function(curMoney , einfo) {
	var exchangeRate = $j(einfo).find("exchange-rate").eq(0).text();
	
	$j("th[class=m_price]").after("<th>Gold&nbsp;&nbsp;&nbsp;&nbsp;</th>");
	
	
	$j("tbody>tr>.m_price").each(function(index,ele) {
		var price = $j(ele).text().trim().replace(curMoney , "");
		price = parseFloat(price) * parseFloat(exchangeRate);
		price = parseInt(price*1000000)/1000000;
		var priceF = Math.floor(price);
		var priceS = new String(Math.round((price - priceF) * 100000));
		var zeroCount = 5 - priceS.length;
		for(var i=0;i<zeroCount;i++) {
			priceS = "0" + priceS;
		}
		$j(ele).after("<td><strong>"+priceF+"</strong><sup>."+priceS+"<strong>&nbsp;G</strong></sup></td>")
	});
	
	
}

var startShowGold = function() {
	var curMoney = $j("tbody>tr>.m_price>sup>strong").eq(0).text();
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.erepublik.com/v2/feeds/exchange/"+curMoney+"/GOLD",
		onload: function(response) {
			var exchangeXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			parseExchangeInfo(curMoney , exchangeXML);
		}
	});
}

var parseEmployeeInfo = function(cinfo) {

	var totalProduced = 0;
	var totalUnProduced = 0;
	var totalSalaryPaid = 0;
	var totalSalaryUnpaid = 0;

	var cid = $j(".edit" , cinfo).eq(0).attr("href");
	cid = cid.substring(cid.lastIndexOf("/") + 1);

	$j("#employee_list>table>tbody>tr>.el_salary" , cinfo).each(function(index,ele){
		var skillLevel = $j(".skiller" , cinfo).eq(index).text().trim().split(" ")[0];
		var salary = $j("#employee_list>table>tbody>tr>.el_salary>div>.sallary_field" , cinfo).eq(index).val();

		var workTime = 8;
		var wellness = 95;
		var happiness = 95;
		
		var workResultTD = $j(".el_day" , cinfo).eq(index * 7 + eTodayIndex);
		if($j(workResultTD).text() == "") {
			workTime = 8;
			wellness = 95;
			happiness = 95;
			
			var productivity = parseInt(0.5 * 2 * skillLevel * ((1 + 2 * wellness / 100)  + (1 + 2 * happiness / 100)) * workTime * 1.1);
			totalUnProduced += parseInt(productivity);
			totalSalaryUnpaid += parseFloat(salary * workTime);
		} else {
			workTime = $j("small" , workResultTD).text();
			workTime = workTime.substring(0 , workTime.length - 1);
			var json = $j("script" , workResultTD).text();
			wellness = getJSON(json,"well");
			happiness = getJSON(json,"happ");
			var productivity = 	$j("strong" , workResultTD).text().replace(",","");	

			totalProduced += parseInt(productivity);
			totalSalaryPaid += parseFloat(salary * workTime);
		}

		
		
	});
	
	var pre_totalProduced = parseInt($j(".produced[id="+cid+"]").text());
	var pre_totalUnProduced = parseInt($j(".unproduced[id="+cid+"]").text());
	var pre_totalSalaryPaid = parseFloat($j(".paid[id="+cid+"]").text());
	var pre_totalSalaryUnpaid = parseFloat($j(".unpaid[id="+cid+"]").text());
	
	if(!isNaN(pre_totalProduced)) {
		totalProduced += pre_totalProduced;
	}
	if(!isNaN(pre_totalUnProduced)) {
		totalUnProduced += pre_totalUnProduced;
	}
	if(!isNaN(pre_totalSalaryPaid)) {
		totalSalaryPaid += pre_totalSalaryPaid;
	}
	if(!isNaN(pre_totalSalaryUnpaid)) {
		totalSalaryUnpaid += pre_totalSalaryUnpaid;
	}
	
	totalSalaryPaid = parseInt(totalSalaryPaid * 100) / 100;
	totalSalaryUnpaid = parseInt(totalSalaryUnpaid * 100) / 100;

	
	$j(".produced[id="+cid+"]").text(totalProduced);
	$j(".unproduced[id="+cid+"]").text(totalUnProduced);
	$j(".paid[id="+cid+"]").text(totalSalaryPaid);
	$j(".unpaid[id="+cid+"]").text(totalSalaryUnpaid);
	
	var moneyInCompany = $j(".money[id="+cid+"]").text().replace(",","");
	if(moneyInCompany <= totalSalaryUnpaid * 2 + totalSalaryPaid) {
		$j(".money[id="+cid+"]").css("color","red");
	}

	var rawInCompany = $j(".raw_stock[id="+cid+"]").text().replace(",","");
	
	if(rawInCompany != "N/A" && rawInCompany <= totalUnProduced * 2 + totalProduced) {
		$j(".raw_stock[id="+cid+"]").css("color","red");
	}
	

}

var parseCompanyInfo = function(cinfo) {
	var cid = $j(".fluid_blue_push_small" , cinfo).eq(0).attr("href");
	cid = cid.substring(cid.lastIndexOf("/") + 1);
	var prdstock = $j(".product_stock" , cinfo).find("#stock").text().trim();
	prdstock = prdstock.substring(0,prdstock.indexOf("\t"));
	$j(".prd_stock[id="+cid+"]").text(prdstock);
	
	var rawstock = $j(".raw_materials" , cinfo).find("big").eq(0).text();
	if(rawstock != "") {
		$j(".raw_stock[id="+cid+"]").text(rawstock);
	} else {
		$j(".raw_stock[id="+cid+"]").text("N/A");
	}
	
	var worked = 0;
	$j(".employee>ul>li>div>small" , cinfo).each(function(index,ele){
		var singleWorked = $j(ele).text().split(" ")[0];
		if(singleWorked != "No") {
			worked += parseInt(singleWorked);
		}
	});

	var incompany = $j(".employee" , cinfo).find(".you>small").eq(0).text();

	var rec = $j(".employee" , cinfo).find(".recommended>small").eq(0).text();

	$j(".employee_count[id="+cid+"]").text(worked+"/"+incompany+"/"+rec);
	
	var money = $j(".finances" , cinfo).find("big").text();// + " " + $j(".finances" , cinfo).find("small").text();

	$j(".money[id="+cid+"]").text(money);

	var employeeLink = $j(".fluid_blue_raised_small" , cinfo).attr("href");
	
	
	var pages = Math.ceil(incompany / 10);
	
	for(var ipage = 0;ipage<pages;ipage++ ) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://economy.erepublik.com" + employeeLink + "/" + ipage,
			onload: function(response) {
					var jqueryobj = $j(response.responseText);
					parseEmployeeInfo(jqueryobj);
			}
		});
	}
	
	
};

var checkUpdate = function(ppage) {
    var newVersion = $j("#summary" , ppage).text();
    newVersion = newVersion.substring(newVersion.indexOf("Version:") + 8).trim();
    if(newVersion != version) {
        var linkStr = "<a id='update_link' class='fluid_blue_push_small' style='color:black;display:inline;position:absolute;left:200px;top:40px' href='http://userscripts.org/scripts/show/81096'><span>autodonater new version available [&nbsp;"+version+"&nbsp;===>&nbsp;" + newVersion + "&nbsp;] </span></a>";
        var updateInfo = "<div id='update_info' style='padding:5px 15px 5px 15px;background-color:#0000CC;color:white;display:inline;position:absolute;left:400px;top:80px;visibility:hidden;z-index:999;'></div>";
        $j("#company_quicklink").after(linkStr);
        $j("#company_quicklink").after(updateInfo);

        var fullDescription = $j("#full_description" , ppage).html();
        var firstIndex = fullDescription.indexOf("updated");
        var secondIndex = fullDescription.indexOf("updated" , firstIndex + 1);
        var recentUpdate = fullDescription.substring(0 , secondIndex - 3);
        
        $j("#update_info").append(recentUpdate);
        
        $j("#update_link").bind("mouseenter",function(event){
            $j("#update_info").eq(0).css("visibility","visible");
        });
        $j("#update_link").bind("mouseleave",function(event){
            $j("#update_info").eq(0).css("visibility","hidden");
        });
    }
    
    
    
};


var newDailyConsumption =     "<li class='nomargin' id='NewDailyConsumtion'>";
newDailyConsumption +=         "<a  style='display:none' class='eat_food' id='NewDailyConsumtionTrigger' style='cursor:pointer'>";
newDailyConsumption +=         "<strong>Pick Food</strong>";
newDailyConsumption +=         "</a></li>";


var realEat = function(urlStr , wv , hv){
    var target=window.parent.document.getElementById("DailyConsumtionTrigger");
    var oEvent = window.parent.document.createEvent("MouseEvents");
    oEvent.initMouseEvent("click", true, true,window.parent, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
    target.dispatchEvent(oEvent);
};

var adjustSize = function() {
	var clientWidth = parseInt($j("#food_container").contents().find("#food_div").eq(0).attr("clientWidth")) + 1;
	var clientHeight = parseInt($j("#food_container").contents().find("#food_div").eq(0).attr("clientHeight")) + 1;
	
    $j("#food_container").css("width",clientWidth+"px");
    $j("#food_container").css("height",clientHeight+"px");
};


var autoBuyFood = function(minfo , pvalue , cvalue , urlMarket) {

	if(foodPrice = $j(".m_price" , minfo).size() < 2) {
		alert("No Food Found");
		return;
	}

    var foodPrice = $j(".m_price" , minfo).eq(1).text().trim();
    foodPrice = parseFloat(foodPrice.substring(0,foodPrice.length - 3).trim());
    var offerID = $j("a[title='Buy']" , minfo).eq(0).attr("id");
    var countInStock = parseInt($j(".m_stock" , minfo).eq(1).text().trim());
    var csrfToken = $j("#buyMarketOffer__csrf_token" , minfo).eq(0).attr("value");
    
    if(foodPrice > pvalue) {
        alert("Food Too Expensive:" + foodPrice);
        return;
    }
    
    if(countInStock < cvalue) {
        alert("Not Enough To Buy:" + countInStock);
        return;
    }

    var dataStr = escape("buyMarketOffer[amount]") + "="+cvalue+"&";
    dataStr += escape("buyMarketOffer[offerId]") + "="+offerID+"&";
    dataStr += escape("buyMarketOffer[_csrf_token]") + "="+csrfToken;
    
    GM_xmlhttpRequest({
            method: "POST",
            url: urlMarket,
            data: dataStr,
            headers: {
                'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(response) {
                $j("#food_container").css("display","none");
                startAutoEat();
            }
    });
};

var startBuyFood = function() {
    var healthV = parseFloat($j("#food_container").contents().find("#health_value").val()) * 10;
    var happyV = parseFloat($j("#food_container").contents().find("#happy_value").val()) * 10;
    var priceV = $j("#food_container").contents().find("#price_value").val();
    var countV = $j("#food_container").contents().find("#count_value").val();
    var offerV = "";    
    
    if(priceV.length >=8) {
        offerV = priceV;
        priceV = 9999;
    } else {
        offerV = "";
        priceV = parseFloat(priceV);
    }
    
    saveCookie("health_req" , healthV / 10);
    saveCookie("happy_req" , happyV / 10);
    if(priceV != 9999) {
        saveCookie("price_req" , priceV);
    }
    
    var urlMarket = "";
    
    if(offerV.length > 0) {
        urlMarket = "http://economy.erepublik.com/en/market/offer/" + offerV;
    } else {
        urlMarket = "http://economy.erepublik.com/en/market/14/1/"+healthV+"/"+happyV+"/0/0/citizen/0/price_asc/1";
    }
    
    GM_xmlhttpRequest({
            method: "GET",
            url: urlMarket,
            onload: function(response) {
                	var jqueryobj = $j(response.responseText);
                 autoBuyFood(jqueryobj , priceV , countV , urlMarket);
            }
     });
};

var keepOpenFlag = false;
var toRemoveFromTable;
var curEat = 0;

var showAllFoods = function(iinfo , x , y) {


    var bigBagFlag = $j(".btnGetExtraStorage" , iinfo).size();
    var bagSize = 20;
    if(bigBagFlag == 0) {
        bagSize = 50;
    }
    var emptySize = bagSize - $j(".item_handler",iinfo).size();


	var allIDs = "";
	var strTable = "<link rel='stylesheet' href='http://www.erepublik.com/css/cmp/app.css' type='text/css' media='screen' />";
	strTable += "<link rel='stylesheet' href='http://www.erepublik.com/css/layout/en.css' type='text/css'/>";
	strTable += "<link rel='stylesheet' href='http://www.erepublik.com/css/texts/en.css' media='screen' />";
	strTable += "<link rel='stylesheet' href='http://www.erepublik.com/css/layout/menu_v4_en.css' type='text/css'/>";
	strTable += "<link rel='stylesheet' href='http://www.erepublik.com/css/lightwindow.css' type='text/css' media='screen' />";
	strTable += "<table id='food_table'>";
	
	var iFoodCount = 0;
	$j("#own>li" , iinfo).each(function(idx,ele){
		if(iFoodCount % 10 == 0) {
			strTable += "<tr>";
		} 
		var ind = $j(ele).attr("industry");
		var invID = $j(ele).attr("id").substring(2);
		if(allIDs.length > 0) {
			allIDs += ";";
		}
		allIDs += invID;
		if(ind == 1) {
			var imgSrc = $j(ele).find("img").eq(0).attr("src");
			var imgWidth = $j(ele).find("img").eq(0).attr("width");
			var imgHeight = $j(ele).find("img").eq(0).attr("height");
			var well = $j(ele).find(".mids").eq(1).css("width");
			var happy = $j(ele).find(".mids").eq(3).css("width");
			well = parseFloat(well.substring(0,well.length - 1)) / 85 * 10 + "";
			happy = parseFloat(happy.substring(0,happy.length - 1)) / 85 * 10 + "";
			
			well = (Math.round(well * 10)) / 10;
			happy = (Math.round(happy * 10)) / 10;

			iFoodCount ++;
			strTable += "<td background='http://www.erepublik.com/images/parts/product_hover.png'>";
			strTable += "<span><table style='height:100%;width:100%'><tr><td align='center' class='img_container'><img src='"+imgSrc+"' width='"+imgWidth+"' height='"+imgHeight+"'/></td></tr>";
			strTable += "<tr><td align='center'><a href='javascript:;' well='"+well+"' happy='"+happy+"' id='button_"+invID+"'><span style='width:22px' class='solid health'>&nbsp;"+well+"&nbsp;</span><span style='width:22px' class='solid happiness'>&nbsp;"+happy+"&nbsp;</span></a></td></tr></table></span>";
			strTable += "</td>";
		}
		if(iFoodCount % 10 == 0) {
			strTable += "</tr>";
		} 

	});
	
	if(iFoodCount == 0) {
	    strTable += "<td align='center' style='cursor:pointer'>No Food In Your Inventory , Please Buy Some</td>"
	} 

	if(iFoodCount % 10 != 0) {
			strTable += "</tr>";
	}
	
	strTable += "</table>";
	
	var remainFood = "&nbsp;(&nbsp;<span id='remain_food_container'>" + $j("#eatFoodTooltip>p > big").text() + "</span>&nbsp;)";
	
	var healthFromCookie = getCookie("health_req");
	var happyFromCookie = getCookie("happy_req");
	var priceFromCookie = getCookie("price_req");
	
	if(healthFromCookie == "") {
	    healthFromCookie = 0;
	}
	if(happyFromCookie == "") {
	    happyFromCookie = 0;
	}
	
	strTable += "<br/><center>";
	strTable += "<table border='0' style='width:100%'>";
	strTable += "<tr>";
	strTable += "<td rowspan='2' align='right' valign='middle'><a href='javascript:;' id='button_buyfood' class='fluid_blue_dark_big'><span>&nbsp;Buy Food&nbsp;</span></a></span></td>";
	strTable += "<td align='center' style='font-size:9pt;font-weight:normal'>&nbsp;&nbsp;Health&nbsp;&nbsp;</td>";
	strTable += "<td align='center' style='font-size:9pt;font-weight:normal'>&nbsp;&nbsp;Happy&nbsp;&nbsp;</td>";
	strTable += "<td align='center' style='font-size:9pt;font-weight:normal'>&nbsp;&nbsp;Price&nbsp;&nbsp;</td>";
	strTable += "<td align='center' style='font-size:9pt;font-weight:normal'>&nbsp;&nbsp;Count&nbsp;&nbsp;</td>";
	strTable += "<td align='center' style='font-size:9pt;font-weight:normal'>&nbsp;&nbsp;Keep Open&nbsp;&nbsp;</td>";
	strTable += "</tr>";
	strTable += "<tr>";
	strTable += "<td align='center'><input  style='font-size:9pt;font-weight:normal' id='health_value' type='text' class='shadowed buyField' name='textfield' value='"+healthFromCookie+"' size='2'/></td>";
	strTable += "<td align='center'><input  style='font-size:9pt;font-weight:normal' id='happy_value' type='text' class='shadowed buyField' name='textfield' value='"+happyFromCookie+"' size='2'/></td>";
	strTable += "<td align='center'><input  style='font-size:9pt;font-weight:normal' id='price_value' type='text' class='shadowed buyField' name='textfield' value='"+priceFromCookie+"' size='2'/></td>";
	strTable += "<td align='center'><input  style='font-size:9pt;font-weight:normal' id='count_value' type='text' class='shadowed buyField' name='textfield' size='2'/>&nbsp;/&nbsp;<span style='color:red'><b><span id='empty_size_container'>" + emptySize + "</span>" + remainFood + "</b></span></td>";
	strTable += "<td align='center'><input  style='font-size:9pt;font-weight:normal' type='checkbox' value='true' id='keep_open_flag'></td>";
	strTable += "</tr>";
	strTable += "</center>";
	

	$j("#food_container").css("display","inline");
	$j("#food_container").css("left",x);
	$j("#food_container").css("top",y);
	$j("#food_container").contents().find("body").html("<div id='food_div' style='position:absolute;background-color:white'>"+strTable+"</div>");
	
	// set the keep on falg to the last status
	$j("#food_container").contents().find("#keep_open_flag").attr("checked" , keepOpenFlag);
	
	var clientWidth = parseInt($j("#food_container").contents().find("#food_div").eq(0).attr("clientWidth")) + 5;
	var clientHeight = parseInt($j("#food_container").contents().find("#food_div").eq(0).attr("clientHeight")) + 5;
	
	$j("#food_container").contents().find(".fluid_blue_dark_small").css("font-size","9px");
	
    $j("#food_container").css("width",clientWidth+"px");
    $j("#food_container").css("height",clientHeight+"px");


    if(iFoodCount == 0) {
        	$j("#food_container").contents().find("#food_table").css("width","100%");
    }
	$j("#food_container").contents().find("#food_table").click(function(){
	    if(keepOpenFlag) {
	        return;
	    }
	    $j("#food_container").css("display","none");
	});

	$j("#food_container").contents().find("#keep_open_flag").click(function(){
	    keepOpenFlag = $j("#food_container").contents().find("#keep_open_flag").attr("checked");
	});

	$j("#food_container").contents().find("#button_buyfood").click(startBuyFood);
	
	var idArray = allIDs.split(";");
	
	var eatToken = $j("#DailyConsumtion>input").eq(0).val();
	var saveToken = $j("#_csrf_token" , iinfo).val();
	
	for(var i=0;i<idArray.length;i++) {
		$j("#food_container").contents().find("#button_"+idArray[i]).attr("eatToken" , eatToken);
		$j("#food_container").contents().find("#button_"+idArray[i]).attr("saveToken" , saveToken);
		$j("#food_container").contents().find("#button_"+idArray[i]).attr("allid" , allIDs);
		$j("#food_container").contents().find("#button_"+idArray[i]).click(function(){
			var ids = $j(this).attr("allid").split(";");
			var cid = $j(this).attr("id").split("_")[1];
			var wvalue = $j(this).attr("well");
			var hvalue = $j(this).attr("happy");
			var stoken = $j(this).attr("saveToken");
			var etoken = $j(this).attr("eatToken");
			var cp = 2;

            // save the value
		    toRemoveFromTable = $j(this);
		    curEat = wvalue;

			var dataStr = "priorities={";
			var idpart = "";
			for(var j=0;j<ids.length;j++) {
				if(ids[j] != cid) {
					idpart += ",\"" + ids[j] + "\":" + cp;
					cp++;
				}
			}
			dataStr += "\"" + cid + "\":1";
			if(idpart.length > 0) {
				dataStr += idpart;
			}
    		    dataStr += "}&_token=" + stoken;
			GM_xmlhttpRequest({
           		method: "POST",
            	        url: "http://economy.erepublik.com/en/inventory/save",
            	        data: dataStr,
            	        headers: {
              	          'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
             	          'Content-Type': 'application/x-www-form-urlencoded'
                   	},
                    	onload: function(response) {
            		        var urlStr = "http://www.erepublik.com/eat?format=json&_token="+etoken+"&jsoncallback=?";
            		        toRemoveFromTable.parent().parent().parent().find(".img_container").html("<div style='height:49px;width:49px'><br/>Eaten</div>");
            		        var innerContent = toRemoveFromTable.parent().parent().parent().find("a").html();
            		        toRemoveFromTable.parent().parent().parent().find("a").parent().html(innerContent);
            		        var preRemain = parseInt($j("#food_container").contents().find("#remain_food_container").text());
            		        var preEmpty = parseInt($j("#food_container").contents().find("#empty_size_container").text());
            		        $j("#food_container").contents().find("#remain_food_container").text(preRemain - curEat);
            		        $j("#food_container").contents().find("#empty_size_container").text(preEmpty + 1);
            		        realEat(urlStr , wvalue , hvalue);
                    	}
    		    });
		});
	}
	
    window.setTimeout(adjustSize, 100);
};

var previous_pageX = 0;
var previous_pageY = 0;

var startAutoEat = function(e) {
    var showX = 0;
    var showY = 0;
    if(e) {
        previous_pageX = e.pageX;
        previous_pageY = e.pageY;
    }
    var showX = previous_pageX;
    var showY = previous_pageY;
    
	GM_xmlhttpRequest({
        	method: "GET",
        	url: 'http://economy.erepublik.com/en/inventory',
        	onload: function(response) {
            		var jqueryobj = $j(response.responseText);
            		showAllFoods(jqueryobj , showX , showY);
        	}
    	});
};

var parseInventoryInfo = function(cinfo) {
    var bigBagFlag = $j(".btnGetExtraStorage" , cinfo).size();
    var     bagSize = 20;
    if(bigBagFlag == 0) {
        bagSize = 50;
    }
    var emptySize = bagSize - $j(".item_handler",cinfo).size();
    var bagStr = emptySize + "/" + bagSize;
    $j("#side_bar_natural_account_value").after("<br/><div><img id='img_showconfig' style='height:20px;width:20px' src='http://www.erepublik.com/images/icons/skills/marketingmanager.png'/><a id='to_inventory' href='http://economy.erepublik.com/en/inventory'>"+bagStr+"</a></div>");
    $j("#img_showconfig").bind('click', showConfig);
}

var parseRegion = function(rinfo) {
    var rName = $j(".largepadded").eq(0).text();
    $j("region>name",rinfo).each(function(idx,ele) {
        if($j(ele).text() == rName) {
            var regionID = $j(ele).parent().children("id").text();
            $j(".largepadded").eq(0).parent().append("<b><a href='http://www.erepublik.com/en/battlefield/"+regionID+"'>To BattleField</a></b>")
        }
    });
}

var parseRegions = function(rinfo) {
	$j(".regions>tbody>tr>td>.fakeheight").each(function(idx,ele){
		var rName = $j(ele).text();
		$j("region>name",rinfo).each(function(idxInner,eleInner) {
			if($j(eleInner).text() == rName) {
				var regionID = $j(eleInner).parent().children("id").text();
				$j(ele).parent().parent().append("<td><a class='details-small' href='http://www.erepublik.com/en/battlefield/"+regionID+"'>field</a></td>")
			}
		});
	});
	$j(".regions>tbody>tr>td>span>.fakeheight").each(function(idx,ele){
		var rName = $j(ele).text();
		$j("region>name",rinfo).each(function(idxInner,eleInner) {
			if($j(eleInner).text() == rName) {
				var regionID = $j(eleInner).parent().children("id").text();
				$j(ele).parent().parent().parent().append("<td><a class='details-small' href='http://www.erepublik.com/en/battlefield/"+regionID+"'>field</a></td>")
			}
		});
	});
}


var inSelectFlag = false;

var showFoodSelect = function() {
    if($j("#DailyConsumtionTrigger").hasClass("disabled")) {
        return;
    }
    $j("#NewDailyConsumtionTrigger").css("display","inline");
}
var startHideFoodSelect = function() {
    window.setTimeout(hideFoodSelect, 1000);
    inSelectFlag = false;
}
var setInSelectFlag = function() {
    inSelectFlag = true;
}
var hideFoodSelect = function() {
    if(!inSelectFlag) {
        $j("#NewDailyConsumtionTrigger").css("display","none");
    }
}


$j(document).ready(function(){
    $j("#DailyConsumtionTrigger").after(newDailyConsumption);
    $j("#DailyConsumtionTrigger").mouseover(showFoodSelect);
    $j("#DailyConsumtionTrigger").mouseout(startHideFoodSelect);
    $j('#NewDailyConsumtionTrigger').bind('click', startAutoEat);
    $j('#NewDailyConsumtionTrigger').mouseover(setInSelectFlag);
    $j('#NewDailyConsumtionTrigger').mouseout(startHideFoodSelect);
    $j("body").append("<iframe id='food_container' style='z-index:999999999999;width:620px;height:240px;display:none' scrolling='no' frameborder='0' framespacing='0' border='0'></iframe>");
	$j("#food_container").css("position","absolute");
});

if(document.location.href == "http://www.erepublik.com/en") {

    //GM_xmlhttpRequest({
    //    method: "GET",
    //    url: "http://economy.erepublik.com/en/inventory",
    //    onload: function(response) {
    //        var jqueryobj = $j(response.responseText);
    //        parseInventoryInfo(jqueryobj);
    //     }
    //});

    // check update
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://userscripts.org/scripts/show/81096',
        onload: function(response) {
            	var jqueryobj = $j(response.responseText);
            checkUpdate(jqueryobj);
        }
    });
}

if(document.location.href.indexOf("/country/society/") != -1) {
    var countryName = $j(".vroundbtnh25-start").eq(0).attr("href");
    countryName = countryName.substring(countryName.lastIndexOf("/")+1);

   $j("ul>li>.spaced_small").each(function(index,ele) {
       var cname = $j(ele).attr("href");
       cname = cname.substring(cname.lastIndexOf("/")+1);
       if(cname == countryName) {
           var countryID = $j(ele).attr("id");
               GM_xmlhttpRequest({
                method: "GET",
                url: "http://api.erepublik.com/v2/feeds/countries/"+countryID+"/regions",
                onload: function(response) {
        	            var jqueryobj = $j(response.responseText);
        	            parseRegions(jqueryobj);
                }
           });
       }
   });
}

if(document.location.href.indexOf("/region/") != -1) {
    var countryName = $j(".vroundbtnh25-start").eq(0).attr("href");
    countryName = countryName.substring(countryName.lastIndexOf("/")+1);

   $j("ul>li>.spaced_small").each(function(index,ele) {
       var cname = $j(ele).attr("href");
       cname = cname.substring(cname.lastIndexOf("/")+1);
       if(cname == countryName) {
           var countryID = $j(ele).attr("id");
               GM_xmlhttpRequest({
                method: "GET",
                url: "http://api.erepublik.com/v2/feeds/countries/"+countryID+"/regions",
                onload: function(response) {
        	            var jqueryobj = $j(response.responseText);
        	            parseRegion(jqueryobj);
                }
           });
       }
   });
}

if(document.location.href.substring(document.location.href.length - 6) == "donate") {

	if(document.body.id == "error") {
        document.location.href=document.location.href;
	}

	var intBagSize = 20;
	if(getCookie("bagSize") != "") {
		intBagSize = parseInt(getCookie("bagSize"));	
	}
	
	
	var autoBuyPart = $j("<br/><br/><a href='javascript:;' class='fluid_blue_light_big submitdonate'><span>&nbsp;&nbsp;&nbsp;&nbsp;Auto Buy&nbsp;&nbsp;&nbsp;</span></a></span>");
	var buyCountPart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Count:&nbsp;&nbsp;&nbsp;</span><input id='buyCount' type='text' class='shadowed buyField' name='textfield' size='5'/>");
	var maxPricePart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Price&nbsp;&nbsp;:&nbsp;&nbsp;</span><input id='maxPrice' type='text' class='shadowed buyField' name='textfield' size='5'/>");
	var bagSizePart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Size&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><input id='bagSize' type='text' class='shadowed buyField' name='textfield' value='"+intBagSize+"' size='2'/>");
	var offerPart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Offer&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><input id='offerId' type='text' class='shadowed buyField' name='textfield' size='8'/>");
	
	$j("#items1>p").after(autoBuyPart);
	$j("#items1>a").after(offerPart);
	$j("#items1>a").after(bagSizePart);
	$j("#items1>a").after(maxPricePart);
	$j("#items1>a").after(buyCountPart);
	$j("#items1>a").click(function(){
		if($j("#buyCount").val() == "") {
			alert("please set buy count");
			return;
		}
		if($j("#maxPrice").val() == "") {
			alert("please set max price");
			return;
		}
		document.cookie ='buyCount=' + $j("#buyCount").val() + ';path=/' ;
		document.cookie ='bagSize=' + $j("#bagSize").val() + ';path=/';
		document.cookie ='maxPrice=' + $j("#maxPrice").val() + ';path=/' ;
		document.cookie ='companyLink=' + document.location.href + ';path=/';
		if($j("#offerId").val() != "") {
			document.cookie ='offerId =' + $j("#offerId").val() + ';path=/' ;
			document.location.href = "/en/market/offer/" + $j("#offerId").val();
		} else {
			document.cookie ='offerId=;path=/';
			document.location.href = $j("#items1>p>a").attr("href");
		}

	});

	$j("#other").css("height","380px");
	$j("#own>li").each(function(index,ele){
		$j("#other").append(ele);
	});

	var buyCount = getCookie("buyCount");
	var companyLink = getCookie("companyLink");
	if($j("#other>li").size() == 0 ) {
		var buyCount = getCookie("buyCount");
		if(buyCount == "" || parseInt(buyCount) <= 0) {
			return;
		}
		var offerId = getCookie("offerId");
		if(offerId != "") {
			document.location.href = "http://economy.erepublik.com/en/market/offer/" + offerId;
			return;
		} else {
			document.location.href = "http://economy.erepublik.com" + $j("#items1>p>a").attr("href");
			return;
		}
	} else {
		if(companyLink == "" || buyCount == "" || parseInt(buyCount) <= (0-intBagSize)) {
			return;
		}
		buyCount = parseInt(buyCount) - intBagSize;
		document.cookie = "buyCount=" + buyCount + ";path=/";;

		$j("#donateform").submit();
	}
} else if (document.location.href.indexOf("/market/") != -1 || document.location.href.indexOf("/offer/") != -1) {


	$j(".m_provider>a").each(function(index) {
		$j(this).attr("title",$j(".buyOffer").eq(index).attr("id"));
	});

	if(document.body.id == "error") {
		setTimeout('document.location.href=document.location.href;',2000); 
	}


	var errorMessage = $j(".error_message").text().trim();
	if( errorMessage != "") {
		if(errorMessage.substring(0,10) == "This offer") {
			document.location.href=document.location.href;
		} else {
			document.cookie = "buyCount=0;path=/";
			document.cookie = "companyLink=;path=/";
			
			startShowGold();
			
			return;
		}
	}

	var successMessage = $j(".success_message").text().trim();
	if(successMessage != "") {
		var companyLink = getCookie("companyLink");
		if(companyLink != "") {
			document.location.href = companyLink;
			return;
		}
	}

	var buyCount = getCookie("buyCount");
	var bagSize = getCookie("bagSize");
	var maxPrice = getCookie("maxPrice");
	var intBagSize = 20;
	if(buyCount == "" || buyCount == "0") {
		startShowGold();
		return;
	}
	if(maxPrice == "" || maxPrice == "0") {
		startShowGold();
		return;
	}
	var intBuyCount = parseInt(buyCount);
	var maxPrice = parseFloat(maxPrice);
	if(bagSize != "" && bagSize != "0") {
		try {
			intBagSize = parseInt(bagSize);
		} catch(e) {
	
		}
	}
	
	var price = $j(".stprice").eq(0).text().trim();
	var curCount = $j(".m_stock").eq(1).text().trim();
	price = parseFloat(price.substring(0 , price.indexOf(" ")));
	curCount = parseInt(curCount);
	
	if(maxPrice < price) {
		document.cookie = "buyCount=0;path=/";
		document.cookie = "companyLink=;path=/";
		alert("expensive than max price , stop buying");
		startShowGold();
		return;
	}

	if(curCount > intBagSize) {
		curCount = intBagSize;
	}
	
	$j(".m_quantity>input").eq(0).val(curCount);
	var id = $j(".m_quantity>input").eq(0).attr("id");
	id = id.substring(id.indexOf("_") + 1);
	$j("#buyMarketOffer_amount").val(curCount);
	$j("#buyMarketOffer_offerId").val(id);
	$j("#buyOffer").submit();
	
} else if (document.location.href.indexOf("/my-places/company/") != -1 ) {

	var trCount = $j(".offers>tbody>tr").size() - 1;

	$j(".offers>tbody>tr").each(function(index,ele) {
		
		if(index == 0) {
			$j(ele).find("th").eq(0).attr("width","150")
			$j(ele).find("th").eq(1).attr("width","40")
			$j(ele).find("th").eq(2).attr("width","1")
			$j(ele).find("th").eq(1).after("<th width='130' style='text-align:center'>Used/Unused Raw<br/>Paid/Unpaid Salary</th>");
			$j(ele).find("th").eq(1).after("<th width='70' style='text-align:center'>Money <br/>in company</th>");
			$j(ele).find("th").eq(1).after("<th width='70' style='text-align:center'>Product <br/>in stock</th>");
			$j(ele).find("th").eq(1).after("<th width='70' style='text-align:center'>Raw<br/>in stock</th>");
			$j(ele).find("th").eq(1).after("<th width='70' style='text-align:center'>Employee<br/>count</th>");
		} else {
			var companyLink = $j(ele).find(".avatarholder").attr("href");
			cid = companyLink.substring(companyLink.lastIndexOf("/") + 1);
			$j(ele).find(".entity>a").eq(0).after($j(ele).find(".fluid_blue_light_medium"));
			
			var ctype = $j(ele).find(".entity").eq(1).text().trim();
			if(ctype == "Iron" || ctype == "Grain" || ctype == "Oil" || ctype == "Titanium" || ctype == "Stone") {
			} else {
				$j(ele).find(".fluid_blue_light_medium").after("<a title='' class='fluid_blue_light_medium right' href='http://economy.erepublik.com/en/company/"+cid+"/donate'><span>Donate</span></a>");
			}
			

			var container = '\
				<td class="employee_count" id="'+cid+'" style="text-align:center">\
				</td>\
				<td class="raw_stock" id="'+cid+'" style="text-align:center">\
				</td>\
				<td class="prd_stock" id="'+cid+'" style="text-align:center">\
				</td>\
				<td class="money" id="'+cid+'" style="text-align:center">\
				</td>\
				<td style="text-align:center">\
					<span class="produced" id="'+cid+'">0</span>/<span class="unproduced" id="'+cid+'">0</span><br/>\
					<span class="paid" id="'+cid+'">0</span>/<span class="unpaid" id="'+cid+'">0</span>\
				</td>\
			';
			$j(ele).find("td").eq(1).after(container);
			
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://economy.erepublik.com" + companyLink,
				onload: function(response) {
						var jqueryobj = $j(response.responseText);
						parseCompanyInfo(jqueryobj);
				}
			});
		}
		
		
	});

	var intBagSize = 20;
	if(getCookie("bagSize") != "") {
		intBagSize = parseInt(getCookie("bagSize"));	
	}
		

	$j("td[nowrap=nowrap]").each(function(index,ele) {
		var companyLink = $j(ele).find(".avatarholder").attr("href");
		cid = companyLink.substring(companyLink.lastIndexOf("/") + 1);
		var ctype = $j(ele).next().text().trim();
		if(ctype == "Iron" || ctype == "Grain" || ctype == "Oil" || ctype == "Stone" || ctype == "Titanium") {
			return;
		}
		var autoBuyContainer = '\
			<tr><td	colspan="6" class="autobuy_container" id='+cid+'>\
			</td></tr>\
		';
		$j(ele).attr("rowspan","2");
		$j(ele).parent().after(autoBuyContainer);
		
		var autoBuyPart = $j("<a href='javascript:;' class='fluid_blue_light_big submitdonate' cid="+cid+"><span>Buy</span></a>");
		var buyCountPart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Count:&nbsp;&nbsp;&nbsp;</span><input type='text' id='buyCount_"+cid+"' class='shadowed buyField' name='textfield' size='5'/>");
		var maxPricePart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Price&nbsp;&nbsp;:&nbsp;&nbsp;</span><input id='maxPrice_"+cid+"' itype='maxPrice' type='text' class='shadowed buyField' name='textfield' size='5'/>");
		var bagSizePart = $j("<span>&nbsp;&nbsp;&nbsp;&nbsp;Size&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span><input id='bagSize_"+cid+"' type='text' class='shadowed buyField' name='textfield' value='"+intBagSize+"' size='2'/>");

		$j(".autobuy_container[id="+cid+"]").append(autoBuyPart);
		$j(".autobuy_container[id="+cid+"]").append(buyCountPart);
		$j(".autobuy_container[id="+cid+"]").append(maxPricePart);
		$j(".autobuy_container[id="+cid+"]").append(bagSizePart);
		
		$j("a[cid="+cid+"]").click(function(){
		
			var companyId = $j(this).parent().attr("id");
			if($j(this).next().next().val() == "") {
				alert("please set buy count");
				return;
			}
			if($j(this).next().next().next().next().val() == "") {
				alert("please set max price");
				return;
			}
			
			saveCookie("buyCount" , $j(this).next().next().val());
			saveCookie("maxPrice" , $j(this).next().next().next().next().val());
			saveCookie("bagSize" , $j(this).next().next().next().next().next().next().val());
			saveCookie("companyLink" , "http://economy.erepublik.com/en/company/"+companyId+"/donate");
			document.location.href = "http://economy.erepublik.com/en/company/"+companyId+"/donate";
		});
	});	
} else if (document.location.href.indexOf("/exchange") != -1 ) {
	window.setTimeout(checkSwap, 800);
} else {

}


var xpRank = $j(".xprank").text();
if(xpRank != "Or") {
    return;
}



var cid = $j(".citizen_name").attr("href");
cid = cid.substring(cid.lastIndexOf("/"));

var clink = "http://economy.erepublik.com/en/my-places/company/" + cid; 

var selectStr = "<select id='quick_select' onchange='document.location.href=this.value'>";
selectStr += "<option>------ Select one company ------</option>";
selectStr += "<option value='"+clink+"'";
if(document.location.href == clink) {
    selectStr += " selected=true ";
}
selectStr += ">Company List Page</option>";
selectStr += "</select>";
$j("#company_quicklink").append(selectStr);

// add QuickLink
GM_xmlhttpRequest({
    method: "GET",
    url: clink,
    onload: function(response) {
        	var jqueryobj = $j(response.responseText);
        	addQuickLink(jqueryobj);
    }
});

