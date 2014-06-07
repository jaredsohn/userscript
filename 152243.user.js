// ==UserScript==
// @id             	Hemnetboendekostnadsuträknare
// @name           	Hemnetboendekostnadsuträknare
// @namespace		brtkrbzhnv
// @version        	2012.12.13
// @updateURL       http://userscripts.org/scripts/source/152243.meta.js
// @description		Calculates the total cost (interest + fees - tax deduction) for objects on Hemnet
// @author         	brtkrbzhnv
// @include        	http://www.hemnet.se/bostad/*
// @include        	http://www.hemnet.se/resultat
// @include        	http://www.booli.se/*
// @run-at         	document-end
// @require        	https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

// 2012-12-14: Stöd för Booli.se tillagt.

function main(){
	if($('.realMonthlyCost').length) return;
	GM_config.init(settings.title, settings.settings, settings.functions);
	var interestRate = GM_config.get('InterestRate').replace(',','.');
	var site = $.grep(sites, function(site){return site.url.test(location.href);})[0];
	if(!site) return;
	$(site.mainSelector).each(function(i, element){addStuff(element, interestRate, site);});
	//GM_registerMenuCommand('Ändra räntesats', function(){GM_config.open();});
}

function addStuff(ul, interestRate, config){

	var price = getInt(config.priceSelector, ul);
	
	var monthly = getInt(config.monthlySelector, ul);
	
	var yearly = getInt(config.yearlySelector, ul);
	var place = $(config.placeSelector, ul);
	var newElements = config.makeElements(calculateMonthlyCost(price, monthly, yearly, interestRate));
	if (config.makeButton) newElements.last().append(config.makeButton(interestRate));
	place.append(newElements);
}

function calculateMonthlyCost(price, monthly, yearly, interestRate) {
	var interest =  interestRate * price / 100;
	var deduction = 0.21 * interest + 0.09 * (interest < 100000 ? interest : 100000);
	return Math.floor(monthly + (yearly + interest - deduction) / 12);
}

function getInt(selector, element){
	if(!selector) return 0;
	var selection = $(selector, element);
	return (selection.length == 1) ? parseInt(selection[0].innerHTML.replace(/\D/g,'')) : 0;
}

var sites = [ 
	{	// Hemnets söksida
		url:				/.*hemnet\.se\/resultat/,
		mainSelector:		'div.item.result.normal',
		priceSelector: 		'ul.attributes.prices>li.price>a',
		monthlySelector:	'ul.attributes.prices>li>a:contains("kr/mån")',
		yearlySelector: 	'ul.attributes.prices>li>a:contains("kr/år")',
		placeSelector:		'ul.attributes.prices',
		makeElements:		function(monthlyCost){
			return $('<li class="realMonthlyCost">' + monthlyCost + ' kr/mån</li>');
		}
	},
	{	// Hemnets objektsida
		url:				/.*hemnet\.se\/bostad\/.*/,
		mainSelector:		'div.column.small',
		priceSelector: 		'span.price',
		monthlySelector:	'dl.attributes>dd:contains("kr/mån")',
		yearlySelector:		'dl.attributes>dd:contains("kr/år")',
		placeSelector:		'dl.attributes',
		makeElements:		function(monthlyCost){
			return $('<dt class="realMonthlyCost">Boendekostnad<dt>').add(
				$('<dd>' + monthlyCost + ' kr/mån</dd>')
			);
		},
		makeButton:			function(interestRate){
			return $('<a> (vid '+interestRate+'%)<\a>').on('click', function(){GM_config.open();});
		}
	},
	{	// Boolis två lite olika sidor för sålda respektive osålda objekt
		url:				/.*booli.se\/bostad\//,
		mainSelector:		'div#leftContainer>div.section:first',
		// Kombinerad priceSelector för sålda och till salu:
		priceSelector: 		'dl#transactionsData>dd.big:first,div.address>span.bigPrice>span.orange',
		monthlySelector:	'div.data>dl>dd:contains("kr")',
		placeSelector:		'div.data>',
		makeElements:		function(monthlyCost){
			return '<dt>Boendekostnad:</dt><dd class="boendekostnad"><strong>'+monthlyCost+'</strong>&nbsp;kr/mån</dd>';
		}
	},
	{	//  Boolis söksidor
		url:				/.*booli.se/,
		mainSelector:		'tr.hit',
		priceSelector: 		'td:nth-child(3)>div',
		monthlySelector:	'td:nth-child(4)>p',
		placeSelector:		'td:nth-child(6)>p',
		makeElements:		function(monthlyCost){
			return monthlyCost + '<em>&nbsp;kr/mån</em>';
		}
	}
];

var settings = {
	title: "Settings",
	settings:	{
		'InterestRate': {
			'label': 'Räntesats (%)',
			'type': 'text',
			'default': '5'
		}
	},
	functions:	{
		open: function(){$('#GM_config').attr('style','position: fixed; top: 128px;');},
		save: function(){GM_config.close(); location.reload();}
	}
}
$(window).load(main); // Booli gör grejer efter ready.
$(window).bind('hashchange', function(){setTimeout(function(){main();}, 500);});

