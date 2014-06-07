// ==UserScript==
// @name          boolee4us
// @version       1.0
// @description	  interna modifikacija
// @description   Display special menu
// @author        boolee interna modifikacija
// @namespace     erepublik.serbia
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// @exclude	      http://ads*.erepublik.com/*
// @exclude       http://www.erepublik.com/xd_receiver*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//   V e r s i o n  H i s t o r y
// ================================
// 0.4.0   modified all links for eRepublik Rising aka v2
// 0.3.0   sligntly better organization and Menu object
// 0.2.1   more small fixes + typos
// 0.2.0   Small fixes
// --------------------------------
// 0.1     Base function
// --------------------------------

// current language, should work at /en/ and /rs/
var LANG = document.location.href.split('/');
LANG = (LANG[3]== null) ? 'en' : LANG[3];
var BASE_URL = 'http://www.erepublik.com/' + LANG;
var ECONOMY_URL = 'http://economy.erepublik.com/' + LANG;
var OUT_URL = 'http://' ;

// user name, url and id
var citizen_name = $("A.citizen_name").text();
var citizen_url = $("A.citizen_name").attr('href');

var regExp = new RegExp("/profile/([0-9]+)/?", "ig");
var RegExpRes = regExp.exec(citizen_url);
var citizen_id = (RegExpRes == null) ? '' : RegExpRes[1];

// User variables
var avatar 		= $(".backwhite A IMG").attr('src');
var avatar_url	= 'http://www.erepublik.com/citizen/images?id=' + citizen_id;
var company_url	= $("#menu2 UL LI:eq(1) A").attr('href');
var experience	= $("#sidebar .xprank").text();
var wellness	= $("#sidebar #wellnessvalue").text();
var gold		= $("#side_bar_gold_account_value").html();
var money		= $("#accountdisplay .item:eq(1)").html();

Menu = {
	dropdown : [
		{

'name' : 'Job Market',
			'items' : [
				{ 'name' : 'Harvester', 		'url' : ECONOMY_URL + '/market/job/65/11/9'},
				{ 'name' : 'Producer', 		'url' : ECONOMY_URL + '/market/job/65/1/9'},
				{ 'name' : 'Mar.Menadzer', 		'url' : ECONOMY_URL + '/market/job/65/2/9'},
				{ 'name' : 'Engineer', 		'url' : ECONOMY_URL + '/market/job/65/7/9'},
				{ 'name' : 'Mechanic', 		'url' : ECONOMY_URL + '/market/job/65/8/9'},
				{ 'name' : 'Fitter', 		'url' : ECONOMY_URL + '/market/job/65/9/9'},
				{ 'name' : 'Technician', 		'url' : ECONOMY_URL + '/market/job/65/10/9'},
				
			]
		},
{

'name' : 'Cene sve',
			'items' : [
				{ 'name' : 'Hleb nas SRB', 		'url' : ECONOMY_URL + '/market/65/1/0/100/0/0/citizen/0/price_asc/1'},
{ 'name' : 'Hleb nas FRA', 		'url' : ECONOMY_URL + '/market/11/1/0/100/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Tenk nas', 		'url' : ECONOMY_URL + '/market/65/7/45/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Zito', 		'url' : ECONOMY_URL + '/market/65/10/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Gvozdje', 		'url' : ECONOMY_URL + '/market/65/14/0/0/0/0/citizen/0/price_asc/1'},
				
			]
		},

		{

			'name' : 'Svi mi',
			'items' : [
				{ 'name' : 'boolee', 		'url' : BASE_URL + '/citizen/profile/2385727'},
				{ 'name' : 'Uros Dr', 		'url' : BASE_URL + '/citizen/profile/2392883'},
				{ 'name' : 'Kekovicka', 		'url' : BASE_URL + '/citizen/profile/2437678'},
				{ 'name' : 'Tama Stajic', 		'url' : BASE_URL + '/citizen/profile/2492961'},
				{ 'name' : 'Fenix sm', 		'url' : BASE_URL + '/citizen/profile/2508879'},
			]
		},

		{
			'name' : 'Nase firme',
			'items' : [
				{ 'name' : 'Firma Tenak', 		'url' : ECONOMY_URL + '/company/tenak-vojvodeurosadrenovica/214191'},
				{ 'name' : 'Firma Hleb', 			'url' : ECONOMY_URL + '/company/rasprodaja-srece10-zdravlje2-/216209'},
				{ 'name' : 'Firma gvozdje', 	'url' : ECONOMY_URL + '/company/gvozdje-vojvodeurosadrenovica/216824'},
				{ 'name' : 'Firma zito', 	'url' : ECONOMY_URL + '/company/zito-vojvodeurosadrenovica/228871'},
			]
		}
	],
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				{ 'name' : 'Profil', 	'url' : citizen_url } ,
				{ 'name' : 'Posao', 	'url' : ECONOMY_URL +'/time-management#scene1' },
				{ 'name' : 'Chat eSrbije', 	'url' : OUT_URL +'wbe04.mibbit.com/?channel=%23eserbia' },
				{ 'name' : 'Naredjenja za rat', 	'url' : OUT_URL +'www.erepublik.com/en/newspaper/vojska-srbije-182217/1' },
				{ 'name' : 'Uputstva za igru', 	'url' : OUT_URL +'www.erepublik.com/en/article/-1-1456068/1/20' },
			]
		},

		{
			'name' : 'Trgovina',
			'items' : [
				{ 'name' : 'Prodavnica', 	'url' : ECONOMY_URL + '/market/65' },
				{ 'name' : 'Menjacnica', 	'url' : BASE_URL + '/exchange' },
				{ 'name' : 'Prodaj zlato', 	'url' : BASE_URL + '/exchange#buy_currencies=65;sell_currencies=62;page=1' },
			],
		},
	],

	promo : [
		{
			'name' : 'Razno',
			'items' : [
				{ 'name' : 'boolee novine', 		'url' : OUT_URL + 'www.erepublik.com/en/newspaper/brees-online-214994/1' },
				
				{ 'name' : 'Najnovije vesti', 	'url' : BASE_URL + '/news/latest/1/my' },
				{ 'name' : 'Vazne vesti', 		'url' : BASE_URL + '/news/rated/1/my' },
				
			],
		},

		{
			'name' : '<img src="http://www.erepublik.com/images/flags/L/Serbia.gif" align="absmiddle"/> Србија',
			'items' : [
				{ 'name' : 'Srbija', 			'url' : BASE_URL + '/country/society/Serbia'},
				{ 'name' : 'Zakoni', 			'url' : BASE_URL + '/Serbia/country-administration/1' },
				{ 'name' : 'Ko je online', 		'url' : BASE_URL + '/list/online_users/Serbia/all/1' },
				{ 'name' : 'Bitke', 			'url' : BASE_URL + '/battles/mybattlelist' },
				
			],
		},

		{
			'name' : 'Dodatno',
			'items' : [
				{ 'name' : 'Mapa sveta', 		'url' : BASE_URL + '/map'},
				
				{ 'name' : 'Top novine', 	'url' : BASE_URL + '/rankings/news/1/65' },
				{ 'name' : 'Bonus zlata', 		'url' : BASE_URL + '/gold-bonus/1' },
				{ 'name' : 'Mapa sa blagom', 	'url' : BASE_URL + '/treasure-map' },
				{ 'name' : 'Forum', 			'url' : 'http://forum.erepublik.com/forumdisplay.php/76-National-Forum-of-Serbia' },
			],
		},

		{
			'name' : 'Politika',
			'items' : [
				{ 'name' : 'Partija', 			'url' : BASE_URL + '/my-places/party'},
				{ 'name' : 'Izbori', 			'url' : BASE_URL + '/elections/current/1'},
				
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