// ==UserScript==
// @name        eRepublik Wiping Weapon Raw Material Market Tool
// @namespace   eRepublikWipingWeaponRawMaterialMarketTool
// @include     http://www.erepublik.com/*/economy/market/*/12/1/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @version     v1.0.3
// ==/UserScript==
var options = GM_getValue("opts", false);
var id;
var IDBarLength=0;
var releaseTo='';
var sideBoxes = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAABXCAYAAAAXvud+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAT1JREFUeNrs1j1qxDAQgFH5hxQG43bPllOETZV+Id12gZwg1/ER3G4hF8bEnVfRniCNRSC8BwOqh49B1TiOTyGE9zzPeU4BjnHL85Xnra2q6jIMw7nrutA0jdVwiH3fT9u2nZdlCdU0Td9933fWQgnrum5VjDHla2YbFJFSCm1d1zZBMY8D1rpilCYyRIbI4PfIfPxxyRAZiAyR4eMPLhkiA5EhMv4Bv35cMlwyEBkiQ2QgMkQGIkNkiAxEhsgQGYgMkYHIEBkiA5EhMkQGIkNkIDJEhshAZIgMkYHIEBmIDJEhMhAZIkNkIDJEBiJDZIgMRIbIEBmIDJGByBAZIgORITJEBiJDZCAyRIbIQGSIDJGByBAZiIw/iSxZAwWl+n6/f9gDpeS+PusY42t+X/PcrIQDPXq6zvP88iPAAOC0Mc6dlDXaAAAAAElFTkSuQmCC';
var sideBack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAGCAYAAADkOT91AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAAB5JREFUCFtjeP369X8QBgEQzQATgGFMAZhS3CrQBQANsFp5WDNrnwAAAABJRU5ErkJggg==';
var div = '<div class="optionsHolder"><div style="display: block; float: left; color: #b4b4b4; width: 100%; margin-bottom: 3px;margin-top: 3px;cursor:pointer" id="opts">Options</div><div class="ExchangeMarketToolHolder"><div style="display:block" id="optionsList" class="itemCountHolder">';
    div += '<div id="IDBar"></div><center><input type="checkbox" id="opt-autoRefresh">Auto Refresh<br>';
    div += 'Scan Time<br>Min <input type="text" id="opt-vNMin" style="width:25px;"> Max <input type="text" id="opt-vNMax" style="width:25px;">Sec.<br>';
    div += 'Max Price <input type="text" id="opt-vNMaxPrice" style="width:50px;">CC<br>';
    div += '<input type="text" id="opt-vNMaxAmount" style="width:50px;">Qty./Trade<br>';
    div += 'Country List <input type="text" id="opt-vNCountryList" style="width:50px;">';
    div += '</center>';
    div += '</div></div></div>';
var BaseURL = 'http://www.erepublik.com/en/economy/market/COUNTRY/12/1/citizen/0/price_asc/1';
var i=0;
var CountryFactor;
if (!options) {
	options={};
	options["autoRefresh"]=false;
	options["vNMin"]=1;
	options["vNMax"]=5;
	options["vNMaxPrice"]=0.1;
	options["vNMaxAmount"]=1000;
	options["vNCountryList"]="81::14";
	options["offerId"]='';
	var optionsTemp=JSON.stringify(options);
	GM_setValue("opts", optionsTemp);
} else {
	options = JSON.parse(options);
}

addStyle('.ToolBoxHolder { background-image: url(' + sideBack +'); background-repeat: repeat; border: 2px solid #EBEBEB; border-radius: 5px 5px 5px 5px; float: left; margin-right: 18px; padding: 11px 11px 8px; width: 149px; margin-top: 10px; clear: left;}' +'.ToolBoxHolder .inventoryContent { border-radius: 5px 5px 5px 5px; background: url(' + sideBack +') repeat scroll 0 0 transparent; padding: 10px; width: 149px; }' +'.ToolBoxHolder .inventoryMain .inventoryInner { font-size: 12px; padding: 0px 0px 3px 3px; }' +'.ExchangeMarketToolHolder { background: url(' + sideBoxes +') no-repeat scroll 0 0 #FFFFFF; float: left; margin-bottom: 7px; width: 153px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; height: auto !important; padding-top: 5px; }' +'.ExchangeMarketToolHolder .itemCountHolder { clear: both; float: left; line-height: 18px; margin-left: 6px; width: 142px; border-bottom: 1px solid #DEDEDE; font-size: 11px}' +'.ExchangeMarketToolHolder .itemCountHolder img { float: left; width: 16px; height: 16px; margin-left: 1px; margin-right: 6px; }' +'.ExchangeMarketToolHolder .itemCountHolder .itemCount { text-align: center; color: grey; line-height: 30px; }' +'.completed { width: 60px; border: 1px solid #777; border-radius: 5px; padding: 3px; background-color: #333; font-size:16px; text-align:center; color: #fff; font-weight:bold; }' +'.done { float:right; position:absolute; left: -2px; }' +'.killsCounter { float:right; position:absolute; color:white; font-weight:bold;font-size:11px; border: 1px solid #777; width: 15px; border-radius: 5px; padding: 1px; background-color: #333; text-align:center; color: #fff; font-weight:bold;}' + 'span.left { left:4px; top:22px; }' + 'span.right { left:50px; top:17px; } img.left { left:2px; top:7px; } img.right { left:48px; top:7px; }');

$('.logout').after(div);

function addStyle(css){
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function autoRefresh(Force_Reload) {
	if (Force_Reload==0) {
		options = GM_getValue("opts", false);
		options = JSON.parse(options);
		
		if (options["autoRefresh"]) {
			var vNum=Math.round(Math.random()*(options["vNMax"]-options["vNMin"])+parseFloat(options["vNMin"]));
			id = window.setTimeout(retrieveMarketPlace,vNum*1000);
			$('#IDBar').html('Reload Page in '+vNum+' sec.');
		}
	} else {
		$('#IDBar').html('Reloading Page');
		setTimeout('location.reload(true);',1000);
	}
};


var tmp = $(".m_price").eq(1);
var Price = parseFloat(tmp.find("strong").eq(0).text()+"."+tmp.find("sup").text().match(/[0-9]+/i));
var tmp = $(".buyOffer").eq(0);
var offerId = parseInt(tmp.attr('id'));
var amount = parseInt($("input#amount_"+offerId).eq(0).val());

function retrieveMarketPlace() {
	if (options["autoRefresh"]) {
		i++;
		$('#IDBar').html('Retrieving '+CountryFactor[i%CountryFactor.length]+'...');
		var URL = BaseURL.replace("COUNTRY",CountryFactor[i%CountryFactor.length]);
		GM_xmlhttpRequest({
			method: "GET",
			url: URL,
			onload: function(r) {
				$('#IDBar').html('Retrieved');
				var tmp = $(r.responseText).find(".m_price").eq(1);
				var Price = parseFloat(tmp.find("strong").eq(0).text()+"."+tmp.find("sup").text().match(/[0-9]+/i));
				tmp = $(".buyOffer").eq(0);
				var offerId = parseInt(tmp.attr('id'));
				tmp = $(".m_stock").eq(1);
				var amount = parseInt(tmp.text());
				if (parseFloat(amount)>parseFloat(options["vNMaxAmount"])) {
					amount = options["vNMaxAmount"];
				}
				if (parseFloat(Price) <= options["vNMaxPrice"]) {
					$('#IDBar').html('Found');
					$("#offerId").val(offerId);
					$("#amount").val(amount);
					$("#buyOffer").submit();
					autoRefresh(1);
				} else {
					autoRefresh(0);
				}
			}
		});
	}
}

function setDefault() {
	function checked(opt) {
		$("#opt-" + opt).attr("checked", "");
	}
	
	function fillvalue(opt,value) {
		$("#opt-" + opt).attr("value", value);
	}
	
	var options = GM_getValue("opts", false);
	options = JSON.parse(options);
	
	if (options["autoRefresh"]) checked("autoRefresh");
	if (options["vNMin"] != '') fillvalue("vNMin",options["vNMin"]);
	if (options["vNMax"] != '') fillvalue("vNMax",options["vNMax"]);
	if (options["vNMaxPrice"] != '') fillvalue("vNMaxPrice",options["vNMaxPrice"]);
	if (options["vNMaxAmount"] != '') fillvalue("vNMaxAmount",options["vNMaxAmount"]);
	if (options["vNCountryList"] != '') fillvalue("vNCountryList",options["vNCountryList"]);
	CountryFactor = options["vNCountryList"].split("::");
}

setDefault();

retrieveMarketPlace();

$("input[id*='opt-autoRefresh']").click(function() {
	var opt = ($(this).attr("id")).replace("opt-", "");
	var val = Boolean($(this).attr("checked"));
	var options = GM_getValue("opts", false);
	options = JSON.parse(options);
	options[opt] = val;
	var optionsTemp = JSON.stringify(options);
	GM_setValue("opts", optionsTemp);
	options = GM_getValue("opts", false);
	options = JSON.parse(options);
	if (val) {
		autoRefresh(0);
	} else {
		autoRefresh(1);
	}
});

$("input[id*='opt-vN']").change(function() {
	var opt = ($(this).attr("id")).replace("opt-", "");
	var val = $(this).attr("value");
	var options = GM_getValue("opts", false);
	options = JSON.parse(options);
	options[opt] = val;
	var optionsTemp = JSON.stringify(options);
	GM_setValue("opts", optionsTemp);
	options = GM_getValue("opts", false);
	options = JSON.parse(options);
	setDefault();
	alert(opt+' is set');
});

$("input[id*='opt-vN']").focus(function() {
	window.clearTimeout(id);
	$('#IDBar').html('Stopped');
	
	var options = GM_getValue("opts", false);
	options = JSON.parse(options);
	if (options["autoRefresh"]) {
		options["autoRefresh"] = false;
		var optionsTemp = JSON.stringify(options);
		GM_setValue("opts", optionsTemp);
		
		autoRefresh(0);
		
		$("input[id*='opt-autoRefresh']").attr("checked",false);
	}
});
