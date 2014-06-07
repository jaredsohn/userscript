// ==UserScript==
// @name          eRepublik v2 中国 快捷链接
// @version       1.0
// @description	  eRepublik Quick Menu 
// @description   Display special menu
// @author        jiqimaono2
// @namespace     erepublik.china
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
var avatar_url	= 'http://www.erepublik.com/en/citizen/profile/' + citizen_id;
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

				{ 'name' : '旅行', 	'url' : BASE_URL + '/citizen/change-residence'},

				{ 'name' : '个人信息', 	'url' : citizen_url},

				{ 'name' : '个人账户', 	'url' : ECONOMY_URL + '/accounts/' + citizen_id },
//				{ 'name' : '公司', 	'url' : company_url },

				{ 'name' : '今日工作成果', 	'url' : ECONOMY_URL +'/work/results' },
				{ 'name' : '今日工作成果', 	'url' : ECONOMY_URL +'/train/results' },

                              			]
		},
		
		{
			'name' : '汇市相关',
			'items' : [
				
				{ 'name' : '购买Gold', 	'url' : BASE_URL + '/exchange#buy_currencies=62;sell_currencies=14;page=1' },
				{ 'name' : '购买cny', 	'url' : BASE_URL + '/exchange#buy_currencies=14;sell_currencies=62;page=1' },
				{ 'name' : '我的挂单', 	'url' : BASE_URL + '/exchange/myOffers?account_type=citizen-#buy_currencies=0;sell_currencies=0;page=1' },
				{ 'name' : '出售cny', 	'url' : BASE_URL + '/exchange/create?account_type=citizen#buy_currencies=62;sell_currencies=14;' },
				{ 'name' : '出售Gold', 	'url' : BASE_URL + '/exchange/create?account_type=citizen#buy_currencies=14;sell_currencies=62;' },
                              			]
		},
		{
			'name' : '买面包',
			'items' : [
				
				{ 'name' : '恢复体力2', 		'url' : ECONOMY_URL + '/market/14/1/1/citizen/0/price_asc/1'},
				{ 'name' : '恢复体力4', 		'url' : ECONOMY_URL + '/market/14/1/2/citizen/0/price_asc/1'},
				{ 'name' : '恢复体力6', 		'url' : ECONOMY_URL + '/market/14/1/3/citizen/0/price_asc/1'},
				{ 'name' : '恢复体力8', 		'url' : ECONOMY_URL + '/market/14/1/4/citizen/0/price_asc/1'},
				{ 'name' : '恢复体力10', 		'url' : ECONOMY_URL + '/market/14/1/5/citizen/0/price_asc/1'},
				
			]
		},

		{
			'name' : '买机票',
			'items' : [
				{ 'name' : '距离>1', 		'url' : ECONOMY_URL + '/market/14/2/1/citizen/0/price_asc/1'},
				{ 'name' : '距离>2', 		'url' : ECONOMY_URL + '/market/14/2/2/citizen/0/price_asc/1'},
				{ 'name' : '距离>3', 		'url' : ECONOMY_URL + '/market/14/2/3/citizen/0/price_asc/1'},
				{ 'name' : '距离>4', 		'url' : ECONOMY_URL + '/market/14/2/4/citizen/0/price_asc/1'},
				{ 'name' : '距离>5', 		'url' : ECONOMY_URL + '/market/14/2/5/citizen/0/price_asc/1'},
                              			]
		},


		{
			'name' : '买武器',
			'items' : [
				{ 'name' : 'q1武器', 		'url' : ECONOMY_URL + '/market/14/15/1/citizen/0/price_asc/1'},
				{ 'name' : 'q5武器', 			'url' : ECONOMY_URL + '/market/14/15/5/citizen/0/price_asc/1'},
				
			]
		},

		{
			'name' : '房子,原料',
			'items' : [
				{ 'name' : '房子', 		'url' : ECONOMY_URL + '/market/14/3/1/citizen/0/price_asc/1'},
                                { 'name' : '麦子', 		'url' : ECONOMY_URL + '/market/14/10/1/citizen/0/price_asc/1'}, 
				{ 'name' : '铁', 		'url' : ECONOMY_URL + '/market/14/14/1/citizen/0/price_asc/1'},
				{ 'name' : '石头', 		'url' : ECONOMY_URL + '/market/14/13/1/citizen/0/price_asc/1'},
				{ 'name' : '油', 		'url' : ECONOMY_URL + '/market/14/11/1/citizen/0/price_asc/1'},
				

			]
		},

{
			'name' : '劳工市场',
			'items' : [
				{ 'name' : '12级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/12'},
				{ 'name' : '11级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/11'},
				{ 'name' : '10级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/10'},
				{ 'name' : '9级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/9'},
				{ 'name' : '8级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/8'},
				{ 'name' : '7级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/7'},
				{ 'name' : '6级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/6'},
				{ 'name' : '5级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/5'},
				{ 'name' : '4级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/4'},
				{ 'name' : '3级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/3'},
				{ 'name' : '2级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/2'},
				{ 'name' : '1级薪水', 		'url' : ECONOMY_URL + '/market/job/14/0/1'},

			]
		},


	],
	// now order and place the menu
	sidebar : [
		{
			'name' : '',
			'items' : [
				
				{ 'name' : '工作', 	'url' : ECONOMY_URL +'/work'  },
				{ 'name' : '训练', 	'url' : ECONOMY_URL +'/train' },
				{ 'name' : '国防部军令', 			'url' : BASE_URL + '/newspaper/ministry-of-sinodefence-196717/1'},

				{ 'name' : '能参与的战斗', 	'url' : BASE_URL +'/battles/mybattlelist' },
				{ 'name' : '仓库', 	'url' : BASE_URL +'/economy/inventory' },	

			]
		},

	],

	promo : [
		{
			'name' : '信息',
			'items' : [
				{ 'name' : '我的报纸', 		'url' : BASE_URL + '/my-places/newspaper' },
				{ 'name' : '组织', 			'url' : BASE_URL + '/my-places/organizations' },
				
				{ 'name' : 'EC最新报纸', 	'url' : BASE_URL + '/news/latest/1/14' },
				{ 'name' : 'EC最火报纸', 		'url' : BASE_URL + '/news/rated/1/14' },
				{ 'name' : 'ROC最新报纸', 	'url' : BASE_URL + '/news/latest/1/81' },
				{ 'name' : 'ROC最火报纸', 		'url' : BASE_URL + '/news/rated/1/81' },
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
				{ 'name' : '中国党派', 	'url' : BASE_URL + '/rankings/parties/1/14'},
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

$("#sidebar").prepend('</span></p>' + sidebar_text + dropdown_text);

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


//update market

