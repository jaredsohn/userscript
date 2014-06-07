// ==UserScript==
// @name          eRepublik Rising Serbian Quick Menu
// @version       1.0
// @description	  eRepublik Quick Menu (Serbian)
// @description   Display special menu
// @author        bluesman
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
			'name' : 'Хлеб',
			'items' : [
				{ 'name' : 'Хлеб Q1', 		'url' : ECONOMY_URL + '/market/65/1/10/10/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q2', 		'url' : ECONOMY_URL + '/market/65/1/20/20/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q3', 		'url' : ECONOMY_URL + '/market/65/1/30/30/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q4', 		'url' : ECONOMY_URL + '/market/65/1/40/40/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q5', 		'url' : ECONOMY_URL + '/market/65/1/50/50/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q6', 		'url' : ECONOMY_URL + '/market/65/1/60/60/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q7', 		'url' : ECONOMY_URL + '/market/65/1/70/70/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q8', 		'url' : ECONOMY_URL + '/market/65/1/80/80/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q9', 		'url' : ECONOMY_URL + '/market/65/1/90/90/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хлеб Q10', 		'url' : ECONOMY_URL + '/market/65/1/100/100/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Happy 5 :))', 	'url' : ECONOMY_URL + '/market/65/1/0/50/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Happy 10 :))', 	'url' : ECONOMY_URL + '/market/65/1/0/100/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Well 5 :))', 	'url' : ECONOMY_URL + '/market/65/1/50/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Well 10 :))', 	'url' : ECONOMY_URL + '/market/65/1/100/0/0/0/citizen/0/price_asc/1'},
			]
		},

		{
			'name' : 'Карта',
			'items' : [
				{ 'name' : '1 зона', 		'url' : ECONOMY_URL + '/market/65/2/0/0/20/0/citizen/0/price_asc/1'},
				{ 'name' : '2 зоне', 		'url' : ECONOMY_URL + '/market/65/2/0/0/40/0/citizen/0/price_asc/1'},
				{ 'name' : '3 зоне', 		'url' : ECONOMY_URL + '/market/65/2/0/0/60/0/citizen/0/price_asc/1'},
				{ 'name' : '4 зоне', 		'url' : ECONOMY_URL + '/market/65/2/0/0/80/0/citizen/0/price_asc/1'},
				{ 'name' : '5 зонa', 		'url' : ECONOMY_URL + '/market/65/2/0/0/100/0/citizen/0/price_asc/1'},
			]
		},

		{
			'name' : 'Оружје',
			'items' : [
				{ 'name' : 'Пушка', 		'url' : ECONOMY_URL + '/market/65/6/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Тенк', 			'url' : ECONOMY_URL + '/market/65/7/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Артиљерија', 	'url' : ECONOMY_URL + '/market/65/8/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : 'Хеликоптер', 	'url' : ECONOMY_URL + '/market/65/9/0/0/0/0/citizen/0/price_asc/1'},
			]
		}
	],
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				{ 'name' : 'Профил', 	'url' : citizen_url },
//				{ 'name' : 'Посао', 	'url' : company_url },
				{ 'name' : 'Посао', 	'url' : ECONOMY_URL +'/work'  },
				{ 'name' : 'Тренинг', 	'url' : ECONOMY_URL +'/train' },
				{ 'name' : 'Учење', 	'url' : ECONOMY_URL +'/study' },
				{ 'name' : 'Одмор', 	'url' : ECONOMY_URL +'/entertain' },
			]
		},

		{
			'name' : 'Трговина',
			'items' : [
				{ 'name' : 'Продавница', 	'url' : ECONOMY_URL + '/market/65' },
				{ 'name' : 'Мењачница', 	'url' : BASE_URL + '/exchange' },
				{ 'name' : 'Продај злато', 	'url' : BASE_URL + '/exchange#buy_currencies=65;sell_currencies=62;page=1' },
			],
		},
	],

	promo : [
		{
			'name' : 'Информације',
			'items' : [
				{ 'name' : 'Моје Новине', 		'url' : BASE_URL + '/my-places/newspaper' },
				{ 'name' : 'Мој ОРГ', 			'url' : BASE_URL + '/my-places/organizations' },
				{ 'name' : 'Наређења', 			'url' : BASE_URL + '/newspaper/vojska-srbije-182217/1'},
				{ 'name' : 'Најновије вести', 	'url' : BASE_URL + '/news/latest/1/my' },
				{ 'name' : 'Важне вести', 		'url' : BASE_URL + '/news/rated/1/my' },
				{ 'name' : 'Светске вести', 	'url' : BASE_URL + '/news/military/1/0' },
			],
		},

		{
			'name' : '<img src="http://www.erepublik.com/images/flags/L/Serbia.gif" align="absmiddle"/> Србија',
			'items' : [
				{ 'name' : 'Србија', 			'url' : BASE_URL + '/country/society/Serbia'},
				{ 'name' : 'Закони', 			'url' : BASE_URL + '/Serbia/country-administration/1' },
				{ 'name' : 'Ко је online', 		'url' : BASE_URL + '/list/online_users/Serbia/all/1' },
				{ 'name' : 'Битке', 			'url' : BASE_URL + '/battles/mybattlelist' },
				{ 'name' : 'Пронађи посао', 	'url' : BASE_URL + '/human-resources/country-0' },
			],
		},

		{
			'name' : 'Додатно',
			'items' : [
				{ 'name' : 'Мапа света', 		'url' : BASE_URL + '/map'},
				{ 'name' : 'Познати еСрби', 	'url' : BASE_URL + '/rankings/citizens/country/1/65' },
				{ 'name' : 'Најбоље новине', 	'url' : BASE_URL + '/rankings/news/1/65' },
				{ 'name' : 'Бонус злата', 		'url' : BASE_URL + '/gold-bonus/1' },
				{ 'name' : 'Мапа са благом', 	'url' : BASE_URL + '/treasure-map' },
				{ 'name' : 'Форум', 			'url' : 'http://forum.erepublik.com/' },
			],
		},

		{
			'name' : 'Ако морате',
			'items' : [
				{ 'name' : 'Партија', 			'url' : BASE_URL + '/my-places/party'},
				{ 'name' : 'Избори', 			'url' : BASE_URL + '/elections/current/1'},
				{ 'name' : 'Најјаче партије', 	'url' : BASE_URL + '/rankings/parties/1/65'},
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

