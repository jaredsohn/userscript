// ==UserScript==
// @name		eRepublik UA Preview
// @version		0.01
// @description	Ukrainian tasks
// @author		eCitizen Maximko
// @namespace		eCitizenMaximko
// @include		http://www.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==


// Constants
var VERSION = '0.55';
var LOCALE = 'en/'
var BASE_URL = 'http://www.erepublik.com/';
var MAP_URL = 'http://www.eGobba.de/index.htm?nation=';
var RANKS = ['private', 'corporal', 'sergeant', 'lieutenant', 'captain', 'colonel', 'general', 'fieldmarshal'];
var INDUSTRIES = ['', 'Food', 'Gift', 'Weapon', 'Moving Tickets'];
var SKILLS = ['all', 'manufacturing', 'land', 'constructions'];
var TOOLS = ['Badges', 'RSS Feed', 'ThirdParty', 'Forums', 'eRepPlusSettings'];
var SETTINGS_BITS = '11111111111111111111';
var UKRAINIAN_COMPANIES = [
190713,
185963,
185970,
184839,
187432,
188592,
186613,
184954,
191099,
190165,
185906,
194435,
197002,
188487,
187472,
187316,
193321,
186266,
195756,
188561,
184729,
192460,
189693,
198375
	
];
var STRINGS = [	'Swap currencies',
				'Link',
				'Bold',
				'Italic',
				'Underline',
				'Size',
				'Image',
				'Damage',
				'Empty handed',
				'Weapon Quality Level ',
				'Top rated news',
				'Latest news',
				'Military news',
				'Please enter ',
				'Quick Links&nbsp;&nbsp;&nbsp;',
				'All comments and Translate to&nbsp;&nbsp;&nbsp;',
				'Interactive Map',
				'News description',
				'"Third Party Tools" and "National Pages and Forums"',
				'Wellness calculator on your profile',
				'Newspaper and Forum Article Editor',
				'Army page displays damage with various quality of weapon',
				'Job market filtering ',
				'Monetary market "Swap currencies" link',
				'Unit price of Products and Raw Materials',
				'Wellness shown on All employees page',
				'Save Links&nbsp;&nbsp;&nbsp;',
				'Enabled',
				'Disabled',
				'Num',
				'Caption',
				'Link',
				'New window',
				'Third Party Tools',
				'National Pages and Forums',
				'Plus Settings',
				' (All) ',
				' Translate ',
				'Quality of Hospitals on Social Stats',
				'Next Super Soldier Medal Calculator',
				'Trainings to next medal: '
];

Array.prototype.contains = function (element) {
for (var i = 0; i < this.length; i++) {
if (this[i] == element) {
return true;
}
}
return false;
}


function calculateUnitPrice() {
	var industryIndex = location.href.split('/')[5].split('-')[3];
	var unitPrice = 0;
	var price = 0;
	var quality = 0;

	$("table.offers tr").each(function(i) {
		if (i == 0) return;
		var link = $(this).find("td(0) a");
		var regex = /(http\:\/\/www\.erepublik\.com\/en\/company\/.+?\-)(\d+)$/;
		var num = link.get(0).href.replace(regex, "$2");
		if (UKRAINIAN_COMPANIES.contains(num)) {
		$(this).css("background-color", "#ffff9b");
}	
	});
}


function Main(e) {

	try {
		cID = $("div.core div.avatarholder a").attr("href").split('/')[4] + "_";
	} catch (e) {}
	
	if (typeof unsafeWindow == 'undefined')
		unsafeWindow = window;
	
	var currURL = location.href;
	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, subURL.indexOf('/')) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);


	var pagesFunctions = [
		{p: 'market/', 				s:8, 	f: calculateUnitPrice},

	];
	
	pagesFunctions.forEach(function(v) {
//		if ((subURL.substr(0, v.p.length) == v.p) && (getSetting(v.s) != '0' || v.s == '-1'))
			v.f();
	});
};


var $ = jQuery.noConflict();
window.addEventListener('load', Main, false);
