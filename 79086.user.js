// ==UserScript==
// @name          eRepublik PT Quick Menu
// @version       0.1.0
// @description	  eRepublik Quick Menu (PT)
// @description   Display special menu
// @author        xandr2
// @include       http://www.erepublik.com/*
// @exclude	      http://ads*.erepublik.com/*
// @exclude       http://www.erepublik.com/xd_receiver*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//   V e r s i o n  H i s t o r y
// ================================
// --------------------------------
// 0.1     Base function
// --------------------------------

// current language, should work at /en/ and /rs/
var LANG = document.location.href.split('/');
LANG = (LANG[3]== null) ? 'en' : LANG[3];
var BASE_URL = 'http://www.erepublik.com/' + LANG;

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
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				{ 'name' : 'Perfil', 	'url' : citizen_url },
				{ 'name' : 'Trabalho', 	'url' : company_url },
				{ 'name' : 'Treino', 	'url' : BASE_URL +'/my-places/army' },
			]
		},

		{
			'name' : 'Informações',
			'items' : [
				{ 'name' : 'Boletim FA', 			'url' : BASE_URL + '/newspaper/boletim-do-md-187528/1'},
				{ 'name' : 'Últimas Notícias', 	'url' : BASE_URL + '/news/latest/1/my' },
				{ 'name' : 'Notícias TOP', 		'url' : BASE_URL + '/news/rated/1/my' },
				{ 'name' : 'World News', 	'url' : BASE_URL + '/news/military/1/0' },
			],
		},

		{
			'name' : 'Comércio',
			'items' : [
				{ 'name' : 'Comprar food', 	'url' : BASE_URL + '/market/country-53-industry-1-quality-0-citizen_account-1'},
				{ 'name' : 'Comprar gifts', 	'url' : BASE_URL + '/market/country-53-industry-2-quality-0-citizen_account-1' },
				{ 'name' : 'Comprar armas', 	'url' : BASE_URL + '/market/country-53-industry-3-quality-0-citizen_account-1' },
				{ 'name' : 'Câmbios', 	'url' : BASE_URL + '/exchange' },
				{ 'name' : 'Vemder gold', 	'url' : BASE_URL + '/exchange#buy_currencies=53;sell_currencies=62;page=1' },
			],
		},
	],

	promo : [
		{
			'name' : '<img src="http://www.erepublik.com/images/flags/L/Portugal.gif" align="absmiddle"/> Portugal',
			'items' : [
				{ 'name' : 'Portugal', 			'url' : BASE_URL + '/country/society/Portugal'},
				{ 'name' : 'Leis', 			'url' : BASE_URL + '/Portugal/country-administration/1' },
				{ 'name' : 'Jogadores ON', 		'url' : BASE_URL + '/list/online_users/Portugal/all/1' },
				{ 'name' : 'Batalhas', 			'url' : BASE_URL + '/battles/mybattlelist' },
				{ 'name' : 'Arranjar Emprego', 	'url' : BASE_URL + '/human-resources/country-0' },
			],
		},

		{
			'name' : 'Adicional',
			'items' : [
				{ 'name' : 'Mapa', 		'url' : BASE_URL + '/map'},
				{ 'name' : 'Ranking Portugal', 	'url' : BASE_URL + '/rankings/citizens/country/1/53' },
				{ 'name' : 'Ranking Jornais', 	'url' : BASE_URL + '/rankings/news/1/53' },
				{ 'name' : 'Extras (gold)', 		'url' : BASE_URL + '/gold-bonus/1' },
				{ 'name' : 'Mapas do Tesouro', 	'url' : BASE_URL + '/treasure-map' },
				{ 'name' : 'Fórum', 			'url' : 'http://forum.erepublik.com/' },
			],
		},

		{
			'name' : 'Carreira',
			'items' : [
				{ 'name' : 'Partido', 			'url' : BASE_URL + '/my-places/party'},
				{ 'name' : 'Eleições PP', 			'url' : BASE_URL + '/elections/current/1'},
				{ 'name' : 'Ranking Partidos', 	'url' : BASE_URL + '/rankings/parties/1/65'},
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

$("#sidebar").prepend('<p class="babyMenuHead"><a target="_blank" href="' + avatar_url + '">' + citizen_name + '</a> <span>' + experience +'</span></p>' + sidebar_text);

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

