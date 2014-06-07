// ==UserScript==
// @name           eRep Profit V2
// @version	   0.0.1
// @namespace      www.erepublik.com
// @description    Productividad por empleado [SOLO PARA EMPRESAS DE RAW]
// @autor    	   mcardielo [http://www.erepublik.com/en/citizen/profile/2517447]
// @include        http://economy.erepublik.com/*/company/employees/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var version 	= '0.0.1';

var indexEmployee = 0;
var sReq = "http://api.erepublik.com/v2/feeds/";
var EmployeesMultiplier = 0;
var price = 0;

var COMPANY = {
	"country"		:	null,
	"domain"		:	null,
	"industry"		:	null,
	"quality"		:	null,
	"id"			:	null,
	"employees"		:	null,
	"productivity"		:	0,
	"salary"		:	0
}

function stats() {
	// Estadisticas de compañia
	GM_xmlhttpRequest({
		method: 'GET',
		url: (sReq + "companies/" + COMPANY["id"] + ".json").toLowerCase(),
		onload: function (response) {
			var companyData = eval('(' + response.responseText + ')');
			COMPANY["country"] = companyData.country["id"];
			COMPANY["industry"] = companyData.industry["id"];
			COMPANY["employees"] = companyData.employees;
			if(COMPANY["employees"].length <= 10) EmployeesMultiplier = 1 + (COMPANY["employees"].length/10);
			if(COMPANY["employees"].length > 10) EmployeesMultiplier = 3 - (COMPANY["employees"].length/10);
			if(COMPANY["employees"].length < 1) EmployeesMultiplier = 1;

			GM_xmlhttpRequest({
				method: 'GET',
				url: (sReq + "market/" + COMPANY["industry"] + "/" + COMPANY["country"] + ".json").toLowerCase(),
				onload: function (response) {
					var marketData = eval('(' + response.responseText + ')');
					price = marketData[0]["price"];
					if(COMPANY["employees"].length > 0) employeeProductivity();
				}
			});
		}
	});
}

function employeeProductivity() {
	if(COMPANY["employees"].length > indexEmployee)
		GM_xmlhttpRequest({
			method: 'GET',
			url: (sReq + "citizens/" + COMPANY["employees"][indexEmployee]["id"] + ".json").toLowerCase(),
			onload: function (response) {
				var employeeData = eval('(' + response.responseText + ')');
				var objSkill = null;
				var salary = 0;
				var objDiv = eval('$("a:contains(\''+employeeData["name"]+'\')")');
				if(objDiv) {
					objSkill = objDiv.parent().parent().parent().find('td').get(1);
					objSalary = objDiv.parent().parent().parent().find('td').get(9);
					if(objSalary) salary = $(objSalary).find('input').val();
					objDiv = objDiv.parent().get(0);
				}
				for(var i in employeeData.skills) {
					if(employeeData.skills[i]["id"] == COMPANY["employees"][indexEmployee]["skill"]["id"] && objDiv) {
						var productivity = $(objDiv.parentNode.parentNode).find('td.current').find('strong').text();
						var hours = $(objDiv.parentNode.parentNode).find('td.current').find('small').text();
						var profit = 0;
						if(productivity == "" && hours == "") {
							var skillLevel = 0;
							if(0 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 20) skillLevel = 1;
							if(20 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 100) skillLevel = 2;
							if(100 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 500) skillLevel = 3;
							if(500 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 2000) skillLevel = 4;
							if(2000 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 5000) skillLevel = 5;
							if(5000 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 10000) skillLevel = 6;
							if(10000 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 20000) skillLevel = 7;
							if(20000 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 40000) skillLevel = 8;
							if(40000 <= employeeData.skills[i]["points"] && employeeData.skills[i]["points"] < 80000) skillLevel = 9;
							if(80000 <= employeeData.skills[i]["points"]) skillLevel = 10;
							var productivity = 0.5 * EmployeesMultiplier * skillLevel * ((1 + 2 * employeeData["wellness"] / 100 ) + (1 + 2 * employeeData["happiness"] / 100 )) * 8;
							//objDiv.innerHTML += "<small>"+employeeData.skills[i]["id"]+";"+employeeData.skills[i]["name"]+"</small>";
							profit = (((productivity*price)/8) - salary).toFixed(2);
							if(profit < 0) profitTxt = "<span style='color:red;'>"+profit+"</span>";
							else profitTxt = profit;
							objSkill.innerHTML += "<small style='width:150px;'><b>W:</b>"+employeeData["wellness"].toFixed(0)+" <b>H:</b>"+employeeData["happiness"].toFixed(0)+"<br /><b>P:</b>"+productivity.toFixed(0)+"/8h <b>PT/h:</b>"+profitTxt+"</small>";
						} else {
							profit = (((productivity*price)/hours.replace("h","")) - salary).toFixed(2);
							if(profit < 0) profitTxt = "<span style='color:red;'>"+profit+"</span>";
							else profitTxt = profit;
							objSkill.innerHTML += "<small style='width:150px;'><b>W:</b>"+employeeData["wellness"].toFixed(0)+" <b>H:</b>"+employeeData["happiness"].toFixed(0)+"<br /><b>P:</b>"+productivity+"/"+hours+" <b>PT/h:</b>"+profitTxt+"</small>";
						}
					}
				}
				indexEmployee++;
				employeeProductivity();
			}
		});
}

$(document).ready(function () {
	COMPANY["id"] = ($(".product_attributes").attr("id")).replace("company_", "");
	stats();
});
