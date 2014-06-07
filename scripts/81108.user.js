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
			'name' : '生活常用',
			'items' : [
				{ 'name' : '求职', 	'url' : ECONOMY_URL + '/market/job/14' },
				{ 'name' : '用cny买g', 	'url' : BASE_URL + '/exchange#buy_currencies=62;sell_currencies=14;page=1' },
				{ 'name' : '用g买cny', 	'url' : BASE_URL + '/exchange#buy_currencies=14;sell_currencies=62;page=1' },
                              			]
		},
		{
			'name' : '买面包',
			'items' : [
				{ 'name' : '体力>1', 		'url' : ECONOMY_URL + '/market/14/1/10/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>2', 		'url' : ECONOMY_URL + '/market/14/1/20/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>3', 		'url' : ECONOMY_URL + '/market/14/1/30/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>4', 		'url' : ECONOMY_URL + '/market/14/1/40/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>5', 		'url' : ECONOMY_URL + '/market/14/1/50/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>7', 		'url' : ECONOMY_URL + '/market/14/1/70/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '体力>10', 		'url' : ECONOMY_URL + '/market/14/1/100/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>1', 		'url' : ECONOMY_URL + '/market/14/1/0/10/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>2', 		'url' : ECONOMY_URL + '/market/14/1/0/20/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>3', 		'url' : ECONOMY_URL + '/market/14/1/0/30/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>4', 	'url' : ECONOMY_URL + '/market/14/1/0/40/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>5', 	'url' : ECONOMY_URL + '/market/14/1/0/50/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>7', 	'url' : ECONOMY_URL + '/market/14/1/0/70/0/0/citizen/0/price_asc/1'},
				{ 'name' : '快乐>10', 	'url' : ECONOMY_URL + '/market/14/1/0/100/0/0/citizen/0/price_asc/1'},
				
			]
		},

		{
			'name' : '买机票',
			'items' : [
				{ 'name' : '1 距离', 		'url' : ECONOMY_URL + '/market/14/2/0/0/20/0/citizen/0/price_asc/1'},
				{ 'name' : '2 距离', 		'url' : ECONOMY_URL + '/market/14/2/0/0/40/0/citizen/0/price_asc/1'},
				{ 'name' : '3 距离', 		'url' : ECONOMY_URL + '/market/14/2/0/0/60/0/citizen/0/price_asc/1'},
				{ 'name' : '4 距离', 		'url' : ECONOMY_URL + '/market/14/2/0/0/80/0/citizen/0/price_asc/1'},
				{ 'name' : '5 距离', 		'url' : ECONOMY_URL + '/market/14/2/0/0/100/0/citizen/0/price_asc/1'},
                              			]
		},


		{
			'name' : '买武器,伤害>50',
			'items' : [
				{ 'name' : '枪', 		'url' : ECONOMY_URL + '/market/14/6/0/0/0/50/citizen/0/price_asc/1'},
				{ 'name' : '坦克', 			'url' : ECONOMY_URL + '/market/14/7/0/0/0/50/citizen/0/price_asc/1'},
				{ 'name' : '高炮', 	'url' : ECONOMY_URL + '/market/14/8/0/0/0/50/citizen/0/price_asc/1'},
				{ 'name' : '飞机', 	'url' : ECONOMY_URL + '/market/14/9/0/0/0/50/citizen/0/price_asc/1'},
			]
		},

		{
			'name' : '房子,原料',
			'items' : [
				{ 'name' : '房子', 		'url' : ECONOMY_URL + '/market/14/3/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '石头', 		'url' : ECONOMY_URL + '/market/14/13/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '油', 		'url' : ECONOMY_URL + '/market/14/11/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '麦子', 		'url' : ECONOMY_URL + '/market/14/10/0/0/0/0/citizen/0/price_asc/1'},
				{ 'name' : '钛', 		'url' : ECONOMY_URL + '/market/14/12/0/0/0/0/citizen/0/price_asc/1'},
                                { 'name' : '铁', 		'url' : ECONOMY_URL + '/market/14/14/0/0/0/0/citizen/0/price_asc/1'},
			]
		},


	],
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				{ 'name' : '个人信息', 	'url' : citizen_url },
//				{ 'name' : '公司', 	'url' : company_url },
				{ 'name' : '物品栏', 	'url' : ECONOMY_URL +'/inventory' },
				{ 'name' : '工作', 	'url' : ECONOMY_URL +'/work'  },
				{ 'name' : '训练', 	'url' : ECONOMY_URL +'/train' },
				{ 'name' : '学习', 	'url' : ECONOMY_URL +'/study' },
				{ 'name' : '休息', 	'url' : ECONOMY_URL +'/entertain' },
				{ 'name' : '能参与的战斗', 	'url' : ECONOMY_URL +'/battles/mybattlelist' },

			]
		},

	],

	promo : [
		{
			'name' : '信息',
			'items' : [
				{ 'name' : '我的报纸', 		'url' : BASE_URL + '/my-places/newspaper' },
				{ 'name' : '组织', 			'url' : BASE_URL + '/my-places/organizations' },
				{ 'name' : '国防部军令', 			'url' : BASE_URL + '/newspaper/ministry-of-sinodefence-196717/1'},
				{ 'name' : '最新报纸', 	'url' : BASE_URL + '/news/latest/1/my' },
				{ 'name' : '最火报纸', 		'url' : BASE_URL + '/news/rated/1/my' },
				{ 'name' : '最新事件', 	'url' : BASE_URL + '/news/military/1/0' },
			],
		},

		{
			'name' : '<img src="http://www.erepublik.com/images/flags/L/china.gif" align="absmiddle"/> 国家',
			'items' : [
				{ 'name' : '中国国情', 			'url' : BASE_URL + '/country/society/china'},
				{ 'name' : '议案情况', 			'url' : BASE_URL + '/china/country-administration/1' },
				{ 'name' : '在线玩家', 		'url' : BASE_URL + '/list/online_users/china/all/1' },
				{ 'name' : '战争情况', 			'url' : BASE_URL + '/country/military/china' },
				
			],
		},

		{
			'name' : '其他',
			'items' : [
				{ 'name' : '地图', 		'url' : BASE_URL + '/map'},
				{ 'name' : '玩家排名', 	'url' : BASE_URL + '/rankings/citizens/country/1/14' },
				{ 'name' : '报纸排名', 	'url' : BASE_URL + '/rankings/news/1/14' },
				{ 'name' : '下线奖励', 		'url' : BASE_URL + '/gold-bonus/1' },
				{ 'name' : '藏宝图抽奖', 	'url' : BASE_URL + '/treasure-map' },
				{ 'name' : 'cwg论坛', 			'url' : 'http://bbs.cwebgame.com/forum-312-1.html' },
			],
		},

		{
			'name' : '党派',
			'items' : [
				{ 'name' : '我的党派', 			'url' : BASE_URL + '/my-places/party'},
				{ 'name' : '目前选举', 			'url' : BASE_URL + '/elections/current/1'},
				{ 'name' : '中国党派', 	'url' : BASE_URL + '/rankings/parties/1/65'},
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

