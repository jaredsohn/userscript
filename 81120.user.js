// ==UserScript==
// @name          eRepublik Rising Hellenic Quick Menu
// @version       2.0
// @description	  eRepublik Quick Menu (Greek)
// @description   Display special menu
// @author        DiMiTRiS
// @namespace     erepublik.Greece
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// @exclude	      http://ads*.erepublik.com/*
// @exclude       http://www.erepublik.com/xd_receiver*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


// current language, should work at /en/ and /GR/

var LANG = document.location.href.split('/');
LANG = (LANG[3]== null) ? 'en' : LANG[3];
var BASE_URL = 'http://www.erepublik.com/' + LANG;
var ECONOMY_URL = 'http://economy.erepublik.com/' + LANG;

// user name, url and id
var citizen_name = $("A.citizen_name").text();
var citizen_url = $("A.citizen_name").attr('href');

var regExp = new RegExp("/profile/([0-9]+)/?", "ig");
var RegExpRes = regExp.exec(citizen_url);
var citizen_id = (RegExpRes == null) ? '' : RegExpRes[1];

// User variables
var avatar 	= $(".backwhite A IMG").attr('src');
var avatar_url	= 'http://www.erepublik.com/en/citizen/profile/' + citizen_id;
var company_url	= $("#menu2 UL LI:eq(1) A").attr('href');
var experience	= $("#sidebar .xprank").text();
var wellness	= $("#sidebar #wellnessvalue").text();
var gold		= $("#side_bar_gold_account_value").html();
var money		= $("#accountdisplay .item:eq(1)").html();

Menu = {
	dropdown : [
		{
			'name' : 'Φαγητό',
			'items' : [
				{ 'name' : 'Φαγητό Q1', 		'url' : ECONOMY_URL + '/market/44/1/10/10/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q2', 		'url' : ECONOMY_URL + '/market/44/1/20/20/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q3', 		'url' : ECONOMY_URL + '/market/44/1/30/30/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q4', 		'url' : ECONOMY_URL + '/market/44/1/40/40/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q5', 		'url' : ECONOMY_URL + '/market/44/1/50/50/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q6', 		'url' : ECONOMY_URL + '/market/44/1/60/60/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q7', 		'url' : ECONOMY_URL + '/market/44/1/70/70/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q8', 		'url' : ECONOMY_URL + '/market/44/1/80/80/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q9', 		'url' : ECONOMY_URL + '/market/44/1/90/90/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Φαγητό Q10', 		'url' : ECONOMY_URL + '/market/44/1/100/100/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Υγεία +5 ', 	'url' : ECONOMY_URL + '/market/44/1/50/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Υγεία +10 ', 	'url' : ECONOMY_URL + '/market/44/1/100/0/0/0/citizen/0/price_asc/1'},
			]
		},

		{
			'name' : 'Εισιτήριο',
			'items' : [
				{ 'name' : '1 Ζώνη', 		'url' : ECONOMY_URL + '/market/44/2/0/0/20/0/citizen/0/price_asc/1'},
				{ 'name' : '2 Ζώνες', 		'url' : ECONOMY_URL + '/market/44/2/0/0/40/0/citizen/0/price_asc/1'},
				{ 'name' : '3 Ζώνες', 		'url' : ECONOMY_URL + '/market/44/2/0/0/60/0/citizen/0/price_asc/1'},
				{ 'name' : '4 Ζώνες', 		'url' : ECONOMY_URL + '/market/44/2/0/0/80/0/citizen/0/price_asc/1'},
				{ 'name' : '5 Ζώνες', 		'url' : ECONOMY_URL + '/market/44/2/0/0/100/0/citizen/0/price_asc/1'},
			]
		},

		{
			'name' : 'Όπλο',
			'items' : [
				{ 'name' : 'Τουφέκι', 		'url' : ECONOMY_URL + '/market/44/6/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Aρμα', 		'url' : ECONOMY_URL + '/market/44/7/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Πυροβολικό', 	'url' : ECONOMY_URL + '/market/44/8/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Ελικόπτερο', 	'url' : ECONOMY_URL + '/market/44/9/0/0/0/0/citizen/0/price_asc/1'},
			]
		}
	],
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				{ 'name' : 'Προφίλ', 	'url' : citizen_url },
//				{ 'name' : 'Εταιρία', 	'url' : company_url },
				{ 'name' : 'Εταιρία', 	'url' : ECONOMY_URL +'/work'  },
				{ 'name' : 'Εκπαίδευση', 	'url' : ECONOMY_URL +'/train' },

			]
		},

		{
			'name' : 'Εμπόριο',
			'items' : [
				{ 'name' : 'Αγορά Προϊόντων', 	'url' : ECONOMY_URL + '/market/44' },
				{ 'name' : 'Συναλλάγμα', 	'url' : BASE_URL + '/exchange' },
				{ 'name' : 'Πώληση Χρυσού', 	'url' : BASE_URL + '/exchange#buy_currencies=44;sell_currencies=62;page=1' },
			],
		},
	],

	promo : [
		{
			'name' : 'Πληροφορίες',
			'items' : [
				{ 'name' : 'Η Εφημερίδα Μου', 		'url' : BASE_URL + '/my-places/newspaper' },
				{ 'name' : 'Οι Οργανισμοί Μου', 	'url' : BASE_URL + '/my-places/organizations' },
				{ 'name' : 'Τελευταία Νέα', 	        'url' : BASE_URL + '/news/latest/1/44' },
				{ 'name' : 'Σημαντικές ειδήσεις', 	'url' : BASE_URL + '/news/rated/1/44' },
				{ 'name' : 'Παγκόσμιες ειδήσεις', 	'url' : BASE_URL + '/news/military/1/0' },
			],
		},

		{
			'name' : '<img src="http://www.erepublik.com/images/flags/L/Greece.gif" align="absmiddle"/> Ελλάδα',
			'items' : [
				{ 'name' : 'Κοινωνία', 			'url' : BASE_URL + '/country/society/Greece'},
				{ 'name' : 'Νόμοι', 			'url' : BASE_URL + '/Greece/country-administration/1' },
				{ 'name' : 'Διαθέσιμες Μάχες', 		'url' : BASE_URL + '/battles/mybattlelist' },
				{ 'name' : 'Εύρεση εργασίας', 	        'url' : BASE_URL + '/human-resources/country-44' },
			],
		},

		{
			'name' : 'Επιπρόσθετα',
			'items' : [
				{ 'name' : 'Παγκόσμιος χάρτης',        'url' : BASE_URL + '/map'},
                                { 'name' : 'Υπουρ. Αμύνης (BO)',       'url' : BASE_URL + '/newspaper/ethniki-amina-188284/1'},
				{ 'name' : 'Χάρτης Θησαυρού', 	       'url' : BASE_URL + '/treasure-map' },
                                { 'name' : 'Ελληνικό Chat', 	       'url' : 'http://www.erepublik.gr/chat' },
				{ 'name' : 'Ελληνικό Forum', 	       'url' : 'http://egreece.forumotion.com/' },
                                { 'name' : 'Erepublik.gr', 	       'url' : 'http://erepublik.gr/' },
			],
		},

		{
			'name' : 'Πολιτική',
			'items' : [
				{ 'name' : 'Το Κόμμα μου', 		'url' : BASE_URL + '/my-places/party'},
				{ 'name' : 'Εκλογές', 			'url' : BASE_URL + '/elections/current/1'},
				{ 'name' : 'Κόμματα', 	                'url' : BASE_URL + '/rankings/parties/1/44'},
			],
		},
	]

};


// make eR menu a bit nicer
GM_addStyle("#menu #nav LI UL { -moz-box-shadow:0 0 10px #ccc; } ");

// new css
GM_addStyle("UL.babyMenu { margin:0.5em 0; padding:0; } ");
GM_addStyle("UL.babyMenu LI { margin:0; padding:0; border-bottom:1px solid #e0e0e0; } ");
GM_addStyle("UL.babyMenu LI A { display:block; padding:0.3em 0; } ");
GM_addStyle("UL.babyMenu LI A:hover { color:#000; } ");
GM_addStyle(".babyMenuHead { border-bottom:1px solid #a0a0a0; } ");
GM_addStyle(".babyMenuHead A { font-size:1.3em; } ");
GM_addStyle(".babyMenuHead SPAN { font-size:1.0em; padding:0.2em; background:#d0e0f0; float:right; } ");
GM_addStyle(".babyMenuTitle { clear:both; padding:0.3em 0; margin:0; } ");
GM_addStyle(".babyMenuTitle SPAN { cursor:pointer; color:#666; } ");
GM_addStyle(".babySelect { width:100%; display:block; margin:0.2em 0; color:#666; border:1px solid #e0e0e0; } ");


// add sidebar first
var sidebar_text = '';
for (i = 0; i < Menu.sidebar.length; i++)
{
	if (Menu.sidebar[i]['name'] != '')
	{
		sidebar_text += '<p>' + Menu.sidebar[i]['name'] + '</p>';
	}

	sidebar_text += '<ul class="babyMenu">';
	for (j = 0; j < Menu.sidebar[i]['items'].length; j++)
	{
		sidebar_text += '<li><a href="' + Menu.sidebar[i]['items'][j]['url'] + '">' + Menu.sidebar[i]['items'][j]['name'] + '</a></li>';
	}
	sidebar_text += '</ul>'
}

var dropdown_text = '';
for (i = 0; i < Menu.dropdown.length; i++)
{
	dropdown_text += '<select class="babySelect" onchange="if(this.value != \'\') { self.location.href=this.value; }">';
	if (Menu.dropdown[i]['name'] != '')
	{
		dropdown_text += '<option value="">' + Menu.dropdown[i]['name'] + '</option>';
	}
	for (j = 0; j < Menu.dropdown[i]['items'].length; j++)
	{
		dropdown_text += '<option value="' + Menu.dropdown[i]['items'][j]['url'] + '">' + Menu.dropdown[i]['items'][j]['name'] + '</option>';
	}
	dropdown_text += '</select>'
}

$("#sidebar").prepend('<p class="babyMenuHead"><a target="_blank" href="' + avatar_url + '">' + citizen_name + '</a> <span>' + experience +'</span></p>' + sidebar_text + dropdown_text);

// add promo next
var promo_text = '';
for (i = 0; i < Menu.promo.length; i++)
{
	if (Menu.promo[i]['name'] != '')
	{
		promo_text += '<p>' + Menu.promo[i]['name'] + '</p>';
	}

	promo_text += '<ul class="babyMenu">';
	for (j = 0; j < Menu.promo[i]['items'].length; j++)
	{
		promo_text += '<li><a href="' + Menu.promo[i]['items'][j]['url'] + '">' + Menu.promo[i]['items'][j]['name'] + '</a></li>';
	}
	promo_text += '</ul>'
}

$("#promo").prepend(promo_text);

