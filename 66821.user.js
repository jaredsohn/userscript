// ==UserScript==
// @name           eRepublik zarada!
// @version        0.01
// @namespace      http://userscripts.org/users/117540
// @author         NegoTinac
// @description    eRepublik Dnevni Calculator zarade
// @include        http://www.erepublik.com/*
// @include        http://www2.erepublik.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


var CURR_IN_GOLD = true;
var PAGE = new Array();
var PRODUCTS = {
	"food"				:	{"raw_type"		:	"grain",
							 "raw_needed"	:	"1",
							 "rec_employee"	:	"10",
							 "id"			:	"1"},
	"gift"				:	{"raw_type"		:	"diamonds",
							 "raw_needed"	:	"2",
							 "rec_employee"	:	"10",
							 "id"			:	"2"},
	"weapon"			:	{"raw_type"		:	"iron",
							 "raw_needed"	:	"5",
							 "rec_employee"	:	"10",
							 "id"			:	"3"},
	"moving tickets"	:	{"raw_type"		:	"oil",
							 "raw_needed"	:	"10",
							 "rec_employee"	:	"10",
							 "id"			:	"4"},
	"house"				:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"200",
							 "rec_employee"	:	"20",
							 "id"			:	"10"},
	"hospital"			:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"2000",
							 "rec_employee"	:	"20",
							 "id"			:	"11"},
	"defense system"	:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"2000",
							 "rec_employee"	:	"20",
							 "id"			:	"12"},
	"grain"				:	{"rec_employee"	:	"10",
							 "id"			:	"5"},
	"diamonds"			:	{"rec_employee"	:	"10",
							 "id"			:	"6"},
	"iron"				:	{"rec_employee"	:	"10",
							 "id"			:	"7"},
	"oil"				:	{"rec_employee"	:	"10",
							 "id"			:	"8"},
	"wood"				:	{"rec_employee"	:	"10",
							 "id"			:	"9"}
};

var COMPANY = {
	"country"		:	null,
	"domain"		:	null,
	"industry"		:	null,
	"quality"		:	null,
	"id"			:	null,
	"employees"		:	0,
	"productivity"	:	0,
	"salary"		:	0
}





function output() {
	html = new Array();
	html["holder"] = '\
	<div class="holder" id="statsholder">\
		<h2 class="section">Vaša današnja zarada (pogledaj)</h2>\
		<div class="indent">\
			<div class="infoholder" id="stats" style="width:540px;display:none;">\
			</div>\
		</div>\
	</div>\
	';
	html["product_price"] = '\
		<div class="left">\
			<p class="goleft regular">Cena proizvoda</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="product_price" class="ammount" value="0"></p>\
		</div>\
	';
	html["raw_price"] = '\
		<div class="left">\
			<p class="goleft regular">Cena materijala</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="raw_price" class="ammount" value="0"></p>\
		</div>\
	';
	html["salary_cost"] = '\
		<div class="left">\
			<p class="goleft regular">Troškovi za plate</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="salary_cost" class="ammount" value="0"></p>\
		</div>\
	';
	html["total_productivity"] = '\
		<div class="left">\
			<p class="goleft regular">Ukupna produktivnost</p>\
			<p class="goleft special"><span id="total_productivity">0</span></p>\
			<p class="goleft currency"><span id="products">0</span><span> (proizvedeno)</span></p>\
            </div>\
	';
	html["raw_cost"] = '\
		<div class="left">\
			<p class="goleft regular">Troškovi materijala</p>\
			<p class="goleft special"><span id="raw_cost">0</span></p>\
			<p class="goleft currency"><span id="raw_needed">0</span><span> (potrebno materijala)</span></p>\
		</div>\
	';
	html["profit"] = '\
		<div class="left">\
			<p class="goleft regular">Тrenutna zarada</p>\
			<p class="goleft special"><span id="profit">0</span></p>\
			<p class="goleft currency"><span id="per_product">0</span> (cena po jedinici)</p>\
		</div>\
	';
	html_output = "";
	for(i=0;i<arguments.length;i++) {
		html_output += html[arguments[i]] || "";
	}
	return html_output;
}

function EmployeeProductivity() {
	if($("#is_manager").val() != "1") return;
	date_runner_position = today - $("#date_runner p:first").text().match(/[0-9]{2}/);
	if(date_runner_position < 0) date_runner_position = 6 + today - $("#date_runner p:first").text().match(/0[0-9]/);
	raw_price = 1*GM_getValue("raw_price-"+COMPANY["id"],0);
	product_price = 1*GM_getValue("product_price-"+COMPANY["id"],0);
	employees_nr = 1*GM_getValue("employees-"+COMPANY["id"],0);
	$("h2.biggersection").append(" ("+employees_nr+')<br />Cena po jedinici:  <span id="product_price">'+product_price+'</span>');
	if(COMPANY["domain"] != "land") $("h2.biggersection").append(' Cena materijala:  <span id="raw_price">'+raw_price+'</span>');
	$("table.employees_details th.e_wellness").css("text-align","center").append(" Productivity Profit");
	$.each($("table.employees_details tbody tr"),function() {
		$(this).find("strong:eq(1)").after("<strong>0</strong><strong>0</strong>");
		$(this).find("strong").css("margin-bottom","2px");
		skill = 1*$("strong:eq(0)",this).html();
		wellness = 1*$("strong:eq(1)",this).html();
		real_productivity = 1*$.trim($("td.e_productivity li p",this).eq(date_runner_position).text());
		productivity = real_productivity || getProductivity(employees_nr,skill,wellness);
		$("strong:eq(2)",this).html(Math.round(productivity*100)/100);
		salary = 1*$("input:first",this).val();
		profit = Math.round((productivity*(product_price/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1) - raw_price*COMPANY["quality"])-salary)*100)/100;
		$("strong:eq(3)",this).html(profit).css("color","green");
		if(profit<0) $("strong:eq(3)",this).css("color","red");
	});
}

function CompanyStats() {
	js="<script>\
			function addTitle(el,val){\
				val = Math.round(val*curr_in_gold*10000)/10000 + ' GOLD (1'+curr+' = '+curr_in_gold+'GOLD)';\
				jQuery(el).attr('title',val);\
			}\
			function calculateProfit(input){\
				products = 1*jQuery('#products').html();\
				if(!products) return;\
				product_price = 1*jQuery('#product_price').val();\
				raw_price = 1*jQuery('#raw_price').val() || 0;\
				salary_cost = 1*jQuery('#salary_cost').val();\
				raw_cost = raw_price*jQuery('#raw_needed').html();\
				jQuery('#raw_cost').html((Math.round(raw_cost*100)/100).toString());\
				profit = products*product_price-raw_cost-salary_cost;\
				jQuery('#profit').html((Math.round(profit*100)/100).toString());\
				per_product = profit/products;\
				jQuery('#per_product').html((Math.round(per_product*100)/100).toString());\
				if(jQuery('#curr_in_gold')) {\
					curr = jQuery('#curr').val();\
					curr_in_gold = jQuery('#curr_in_gold').val();\
					addTitle('#product_price',jQuery('#product_price').val());\
					addTitle('#raw_price',jQuery('#raw_price').val());\
					addTitle('#salary_cost',jQuery('#salary_cost').val());\
					addTitle('#raw_cost',jQuery('#raw_cost').text());\
					addTitle('#profit',jQuery('#profit').text());\
					addTitle('#per_product',jQuery('#per_product').text());\
				}\
			}\
		</script>";
	$("head").append(js);

	$("#content div.holder:eq(2)").before(output("holder"));
	$("#statsholder h2:first").mouseover(function() {
		$(this).css("cursor","pointer");
	});
	$("#statsholder h2:first").click(function() {
		$("#stats").slideToggle("slow");
	});
	if(COMPANY["domain"] == "land") {
		$("#stats").append(output("product_price","salary_cost","total_productivity","profit"));
		$("#stats").css("width","360px");
	}
	else {
		$("#stats").append(output("product_price","raw_price","salary_cost","total_productivity","raw_cost","profit"));
		$("#raw_price").keyup(function() {
			GM_setValue('raw_price-'+COMPANY["id"],$("#raw_price").val());
		});
	}
	$("#stats div,#stats p").css("width","180px");
	$("#product_price").keyup(function() {
		GM_setValue('product_price-'+COMPANY["id"],$("#product_price").val());
	});
	currency = $(".accountdisplay:eq(1) img").attr("title");
	$("#stats").prepend('<input type="hidden" id="curr" value="'+currency+'" />');
	if(CURR_IN_GOLD) {
		$("#stats").prepend('<input type="hidden" id="curr_in_gold" value="0" />');
		currInGold(currency);
	}

	productivity_to_go = 0;
	employees_nr = $("#content div.holder:eq(3) span:first").html();
	GM_setValue("employees-"+COMPANY["id"],employees_nr);
	pages = Math.ceil(employees_nr/10);
	employees_url = $("#content div.holder:eq(3) a:first").attr("href");
	for(i=1;i<=pages;i++) {
		$.get(employees_url.replace(/.$/,i), function(data){
			date_runner_position = today - $("#date_runner p:first",data).text().match(/[0-9]{2}/);
			if(date_runner_position < 0) date_runner_position = 6 + today - $("#date_runner p:first",data).text().match(/0[0-9]/);
			$.each($("table.employees_details tbody tr",data),function() {
				wellness = 1*$("strong:eq(1)",this).html();
				skill = 1*$("strong:eq(0)",this).html();
				productivity = 1*$.trim($("td.e_productivity li p",this).eq(date_runner_position).text());
				if(!productivity) {
					productivity = getProductivity(employees_nr,skill,wellness);
					productivity_to_go += productivity;
				}
				salary = 1*$("input:first",this).val();
				COMPANY["salary"] += salary;
				COMPANY["productivity"] += productivity;
			});
			$("#salary_cost").val(round(COMPANY["salary"],2));
			$("#total_productivity").html(round(COMPANY["productivity"],2));
			$("#total_productivity").attr("title",round(productivity_to_go,2)+" remaining today");
			products = COMPANY["productivity"]/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1);
			products_decimals = Math.ceil(2-Math.log(products)/Math.log(10));
			$("#products").html(round(products,products_decimals));
			raw_needed = COMPANY["productivity"]*COMPANY["quality"];
			$("#raw_needed").html(round(raw_needed,1));
			unsafeWindow.calculateProfit();
		});
	}
	var sReq = "http://api.erepublik.com/v1/feeds/market/";
	GM_xmlhttpRequest({ 
//------------------------ Cena proizvoda ----------------------------------
		method: 'GET',
		url: (sReq + COMPANY["industry"].replace(/ /g, "-")+'/'+COMPANY["quality"]+'/'+COMPANY["country"].replace(/ /g, "-")).toLowerCase(),
		onload: function (response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("records").each(function() {
				var vat = 0;
				if(COMPANY["domain"] != "land") $("#market_offers tr:gt(0)").each(function() {
					if($("img",this).attr("title") == COMPANY["country"]) vat = parseFloat($("input:first",this).val());
				});
				product_price = Math.round(parseFloat($(this).find("price:first").text())/(1+vat)*100)/100;
				$("#product_price").val(product_price);
				GM_setValue("product_price-"+COMPANY["id"],product_price.toString());
			});
			//if($("#product_price").val() == "0") $("#product_price").val(GM_getValue("product_price-"+COMPANY["id"],0));
			unsafeWindow.calculateProfit();
		}
	});
	if(COMPANY["domain"] == "land") return;
	for(q=1;q<=5;q++) {
		GM_xmlhttpRequest({ 
//----------------------------- Cena materijala ---------------------------------
			method: 'GET',
			url: (sReq + PRODUCTS[COMPANY["industry"]]["raw_type"]+'/'+q+'/'+COMPANY["country"].replace(/ /g, "-")).toLowerCase(),
			onload: function (response) {
				url = response.finalUrl.split('/');
				quality = url[url.length-2];
				response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				$(response.responseXML).find("records").each(function() {
					raw_price = Math.round(parseFloat($(this).find("price:first").text())/quality*100)/100;
					if($("#raw_price").val()=="0" || raw_price < 1*$("#raw_price").val()) {
						$("#raw_price").val(raw_price);
						//change raw link
						raw_url = $("#content div.holder:eq(5) a:first").attr("href").replace(/quality-./,"quality-"+quality);
						$("#content div.holder:eq(5) a:first").attr("href",raw_url);
						$("#content div.holder:eq(5) a:first").html("Buy raw materials (Q"+quality+")");
					}
					GM_setValue("raw_price-"+COMPANY["id"],$("#raw_price").val());
				});
				//if($("#raw_price").val() == "0") $("#raw_price").val(GM_getValue("raw_price-"+COMPANY["id"],0));
				unsafeWindow.calculateProfit();
			}
		});
	}
}

function CompanyProductivity() {
	htm='\
	<div class="holder" id="statsholder">\
		<h2 class="section">Vaša današnja zarada (pogledaj)</h2>\
		<div class="indent">\
			<div class="infoholder" id="stats" style="width:540px;display:none;">\
				<div class="left" id="productivity">\
					<p class="goleft regular">Ukupna produktivnost</p>\
					<p class="goleft"><span class="special" id="total_productivity">0</span></p>\
					<p class="goleft"><span class="currency" id="(proizvedeno)">0</span><span class="currency"> products</span></p>\
				</div>\
			</div>\
		</div>\
	</div>\
	';
	$("#content div.holder.largepadded:first").after(htm);
	$("#statsholder h2:first").mouseover(function() {
		$(this).css("cursor","pointer");
	});
	$("#statsholder h2:first").click(function() {
		$("#stats").slideToggle("slow");
	});
	$("#stats div,#stats p").css("width","180px");

	employees_nr = $("#content div.holder.largepadded:first span:first").html();
	//GM_setValue("employees-"+COMPANY["id"],employees_nr);
	pages = Math.ceil(employees_nr/10);
	employees_url = $("#content div.holder.largepadded:first a:first").attr("href");
	for(i=1;i<=pages;i++) {
		$.get(employees_url.replace(/.$/,i), function(data){
			$.each($("table.employees_details tbody tr",data),function() {
				wellness = 1*$("strong:eq(1)",this).html();
				skill = 1*$("strong:eq(0)",this).html();
				productivity = getProductivity(employees_nr,skill,wellness);
				COMPANY["productivity"] += productivity;
			});
			$("#total_productivity").html(Math.round(COMPANY["productivity"]*100)/100);
			products = COMPANY["productivity"]/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1);
			products_decimals = Math.ceil(2-Math.log(products)/Math.log(10));
			$("#products").html(round(products,products_decimals));
		});
	}
}

function addMarketLinks(e) {
	if(e && e.target.tagName != "H2") return;
	setTimeout(function() { //hack
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.erepublik.com/v1/feeds/countries",
		onload: function(response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$("#market_offers tr:gt(0)").each(function(i,licence) {
				$(response.responseXML).find("country").each(function() {
					if($("img",licence).attr("title") == $("name",this).text()) country_id = $("id",this).text();
				});
				$("td:last",licence).append('<span class="vround-btn-start goright"><span class="vround-btn-end">\
					<a class="vround-btn-core" title="" href="/en/market/country-'+country_id+'-industry-'+PRODUCTS[COMPANY["industry"]]["id"]+'-quality-'+COMPANY["quality"]+'/1">  	    Go to marketplace</a></span></span>');
			});
		}
	});
	},10);
}

function currInGold(currency) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://api.erepublik.com/v1/feeds/exchange/"+currency+"/GOLD",
		onload: function(response) {
 			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("records").each(function() {
				curr_in_gold = $("record:first for",this).text();
				$("#curr_in_gold").val(curr_in_gold);
				unsafeWindow.calculateProfit();
			});
		}
	});
}

function profIT () {
	COMPANY["id"] = $("#company_id").val();
	today = 1*$("#clock span.date").text().match(/[0-9]{2}/);
	var sReq = "http://api.erepublik.com/v1/feeds/companies/";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq + COMPANY["id"],
		onload: function (response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("company").each(function() {
				COMPANY["country"] = $(response.responseXML).find("company > country").text();
				COMPANY["domain"] = $(response.responseXML).find("company > domain").text();
				COMPANY["industry"] = $(response.responseXML).find("company > industry").text();
				COMPANY["quality"] = $(response.responseXML).find("company > quality").text();
				var pages = [
					{p:"company-employees",	f:EmployeeProductivity},
					{p:"company",			f:waitMarketOffers}
				];
				$.each(pages, function() {
					if(PAGE[4] == this.p) this.f();
				});
			});
		}
	});
}

function waitMarketOffers() {
	if($("#is_manager").val() != "1") CompanyProductivity();
	else if(!$("#market_offers tr:gt(0)")) setTimeout(waitMarketOffers,50);
	else {
		addMarketLinks();
		$("#market_offers").bind("DOMNodeInserted",addMarketLinks);
		CompanyStats();
	}
}

function getProductivity(employees_nr,skill,wellness) {
	if(!wellness) return 0;
	if(employees_nr <= PRODUCTS[COMPANY["industry"]]["rec_employee"]) e_m = 1+employees_nr/PRODUCTS[COMPANY["industry"]]["rec_employee"];
	else e_m = 3-employees_nr/PRODUCTS[COMPANY["industry"]]["rec_employee"];
	if(e_m<1) e_m=1;
	if(!skill) skill = 0.1;
	if(COMPANY["domain"] == "land") productivity = 0.25*e_m*skill*(1+2*wellness/100)*2*1.5*(11-COMPANY["quality"])/10;
	else productivity = 0.5*e_m*skill*(1+2*wellness/100)*1.5/COMPANY["quality"];
	return productivity;
}

function round(fl,dc) {
	dc = dc || 0;
	dc = Math.floor(dc);
	if(dc<0) dc = 0;
	m = Math.pow(10,dc);
	return Math.round(fl*m)/m;
}


$(document).ready(function () {
	/*$.each(GM_listValues(), function() {
		GM_deleteValue(this);
	});*/
	PAGE = location.href.split("/");
	var pages = [
		{p:"company-employees",	f:profIT},
		{p:"company",			f:profIT}
	];
	$.each(pages, function() {
		if(PAGE[4] == this.p) this.f();
	});
});