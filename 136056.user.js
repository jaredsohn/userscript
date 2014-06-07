// ==UserScript==
// @name        eRepublikMarketplaceTaxFreeMOD
// @namespace   eRepublikMarketplaceTaxFreeMOD
// @include     http://www.erepublik.com/*/market/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.5
// ==/UserScript==

var id_country = {1:"Romania",9:"Brazil",10:"Italy",11:"France",12:"Germany",14:"China",13:"Hungary",15:"Spain",23:"Canada",24:"USA",26:"Mexico",27:"Argentina",28:"Venezuela",29:"United-Kingdom",30:"Switzerland",31:"Netherlands",32:"Belgium",33:"Austria",34:"Czech-Republic",35:"Poland",36:"Slovakia",37:"Norway",38:"Sweden",39:"Finland",40:"Ukraine",41:"Russia",42:"Bulgaria",43:"Turkey",44:"Greece",45:"Japan",47:"South-Korea",48:"India",49:"Indonesia",50:"Australia",51:"South-Africa",52:"Republic-of-Moldova",53:"Portugal",54:"Ireland",55:"Denmark",56:"Iran",57:"Pakistan",58:"Israel",59:"Thailand",61:"Slovenia",62:"GOLD",63:"Croatia",65:"Serbia",66:"Malaysia",67:"Philippines",68:"Singapore",69:"Bosnia-Herzegovina",70:"Estonia",71:"Latvia",72:"Lithuania",73:"North-Korea",64:"Chile",74:"Uruguay",75:"Paraguay",76:"Bolivia",77:"Peru",78:"Colombia",79:"Republic-of-Macedonia-FYROM",80:"Montenegro",81:"Republic-of-China-Taiwan",82:"Cyprus",83:"Belarus",84:"New-Zealand",164:"Saudi-Arabia",165:"Egypt",166:"United-Arab-Emirates",167:"Albania"};

var key = 'eRepublikMarketplaceTaxFreeMOD';
var CountryName = id_country[window.location.href.split("/")[6]];//country name
var CountryName = 'http://www.erepublik.com/en/country/economy/' + CountryName;//country link
var IndustryType = window.location.href.split("/")[7];
var Price = 0;
var Tax = 0;
var TaxFreePrice = 0;
var strFlag_Factor = 'http://www.erepublik.com/images/flags/M/COUNTRY_ID.gif';


GM_xmlhttpRequest({
	method: "GET",
	url: CountryName,
	onload: function(response) {
		switch (IndustryType) {
			case "1":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(4).text())/100;
				break;
			case "2":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(7).text())/100;
				break;
			case "3":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(10).text())/100;
				break;
			case "7":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(13).text())/100;
				break;
			case "12":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(16).text())/100;
				break;
			case "5":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(19).text())/100;
				break;
			case "6":
				Tax=1+parseFloat($(response.responseText).find('span[class*="special"]').eq(22).text())/100;
				break;
		}
		$.each($('.m_price'), function() {
			if ($(this).find("sup").text()!= '') {
				Price=parseFloat($(this).find("strong").eq(0).text()+"."+$(this).find("sup").text().match(/[0-9]+/i));
				TaxFreePrice=Price/Tax;
				$(this).append('<br><sup>Tax: '+Tax+'</sup><br><sup>Tax-Free: '+TaxFreePrice+'</sup>');
			}
		});
		
		$.each($('.m_provider a'), function() {
			var that = this;
			var igm = this.href;
			igm=igm.replace('citizen','main');
			igm=igm.replace('profile','messages-compose');
			GM_xmlhttpRequest({
				method: "GET",
				url: this.href,
				onload: function(r) {
					var country = $(r.responseText).find('.citizen_info').find('img').eq(1).attr('src').match(/.*\/S\/(.*).gif/)[1];
					$(that).after('<a href="'+igm+'" target=_blank><img src="http://www.erepublik.com/images/modules/sidebar/mail_icon_off.png" width=22 height=16></a>');
					$(that).after('<img src="http://www.erepublik.com/images/flags/M/'+ country +'.gif" title="'+ country +'"> ');
				}
			});
		});
	}
});
