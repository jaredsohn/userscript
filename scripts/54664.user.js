// ==UserScript==
// @name           test
// @namespace      www.erepublik.com
// @description    test
// @version        0.1
// @include        http://www.erepublik.com/en/list/online_users/*
// ==/UserScript==

var VERSION = '0.54';
var LOCALE = 'en/'
var BASE_URL = 'http://www.erepublik.com/';
var MAP_URL = 'http://www.eGobba.de/index.htm?nation=';
var RANKS = ['private', 'corporal', 'sergeant', 'lieutenant', 'captain', 'colonel', 'general', 'fieldmarshal'];
var INDUSTRIES = ['', 'Food', 'Gift', 'Weapon', 'Moving Tickets'];
var SKILLS = ['all', 'manufacturing', 'land', 'constructions'];
var TOOLS = ['Badges', 'RSS Feed', 'ThirdParty', 'Forums', 'eRepPlusSettings'];
var SETTINGS_BITS = '11111111111111111111';
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

var xChangeImage = '<a id="currency_switch" href="javascript:void(0)" style=\
"display: inline; position:relative; left: 328px; top: -20px;"><img src="htt\
p://www.erepublik.com/images/parts/icon_show-off.gif"/>&nbsp;&nbsp;' + STRINGS[0] + '</a>';

var linkButton = '<br/><span style="font-size: 12px; border: 1px solid darkg\
rey; padding: 5px 15px; cursor: pointer" class="rightpadded padded" id="add_\
link2">' + STRINGS[1] + '</span>';

var boldButton = '<span style="font-size: 12px; font-weight: bold; border: 1\
px solid darkgrey; padding: 5px 15px; cursor: pointer" class="rightpadded pa\
dded" id="add_bold2">' + STRINGS[2] + '</span>';

var italicButton = '<span style="font-size: 12px; font-style: italic; border\
: 1px solid darkgrey; padding: 5px 15px; cursor: pointer" class="rightpadded\
 padded" id="add_italic">' + STRINGS[3] + '</span>';

var underlineButton = '<span style="font-size: 12px; text-decoration: underl\
ine; border: 1px solid darkgrey; padding: 5px 15px; cursor: pointer" class="\
rightpadded padded" id="add_underline">' + STRINGS[4] + '</span>';
 
var sizeButton = '<span style="font-size: 12px; border: 1px solid darkgrey; \
padding: 5px 15px; cursor: pointer" class="rightpadded padded" id="add_size"\
>' + STRINGS[5] + '</span>';

var imageButton = '<span style="font-size: 12px; border: 1px solid darkgrey;\
 padding: 5px 15px; cursor: pointer" class="rightpadded padded" id="add_imag\
e">' + STRINGS[6] + '</span><br/>';

function OnlineWellness() {
	var empArray = new Array();
	var citizenID = 0;
	
	$("table.bestof th:eq(5)").attr('width', '40px');
	$("table.bestof tr").each(function(i) {
		if (i == 0)
			$(this).find("th:eq(2)").after("<th width='70px'>Wellness</th>");
		else
		{
			empArray.push($(this).find("td:eq(1) div div a").attr("hreF").match(/\/citizen\/profile\/(\d+)/)[1]);
			$(this).find("td:eq(2)").after("<td><span class='special'><img id='employee_wellness_" + empArray[i - 1] + "' src='/images/parts/ajax-loader.gif'/></span></td>");
		}
	});
	
	$("table.bestof tr").each(function(i) {
		if (i != 0)
			getWellnessByID(empArray[i - 1]);
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

	if (getSetting(12) == '1')
		window.setTimeout(showQuickLinks, 0);

	$("#nav").ready(function() {
		if (getSetting(10) == '1')
			UpdateLinks();
	});

	var pagesFunctions = [
		{p: 'list/online_users/',	s:9, 	f: OnlineWellness},
	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p) && (getSetting(v.s) != '0' || v.s == '-1'))
			v.f();
	});
	
	$("#logo a").append(plusImage);
	$("#logo a").attr("title", "eRepublik Plus v" + VERSION);
};