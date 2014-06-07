// ==UserScript==
// @name		eReplus lazul
// @version		0.58 - 00.1
// @description	eRepublik script that simplifies common tasks modificado por lllazulll
// @author		eCitizen PeeKaBooh 
// @namespace	eCitizenPeeKaBooh
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// Este software es una donacion-ware se agradeceria donar gold en el juego al autor
// del script. La cantidad de Gold 
// ===============================================================================

// Add 'missing' trim to the String class
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';

// Constants
var VERSION = '0.58';
// var LOCALE = 'en/';
var LOCALE = 'es/';
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
				'Current Damage (Full)',
				'Bare handed',
				'Weapon Quality Level ',
				'Top rated news',											//	10
				'Latest news',
				'Military news',
				'Please enter ',
				'Quick Links&nbsp;&nbsp;&nbsp;',
				'All comments and Translate to&nbsp;&nbsp;&nbsp;',
				'Interactive Map',
				'News description',
				'"Third Party Tools" and "National Pages and Forums"',
				'Wellness calculator on your profile',
				'Newspaper and Forum Article Editor',						//	20
				'Army page displays damage with various quality of weapon',
				'Job market filtering ',
				'Monetary market "Swap currencies" link',
				'Unit price of Products and Raw Materials',
				'Send message and/or offer gifts on Employees page',
				'Save Links&nbsp;&nbsp;&nbsp;',
				'Enabled',
				'Disabled',
				'Num',
				'Caption',													//	30
				'Link',
				'New window',
				'Third Party Tools',
				'National Pages and Forums',
				'Plus Settings',
				' (All) ',
				' Traduccíon ',
				'Quality of Hospitals on Social Stats',
				'Next Super Soldier Medal Calculator',
				'Trainings to next medal: ',								//	40
				'Salaries and Market Prices in Gold',
				' Deshacer Traducción',
				'All donations',
				'Offer a gift',
				'Send message',
				'You cannot offer a gift to yourself.',
				'Fights',
				'Stats',
				'Stats on Battle Page'
];

// Resources (images, strings, etc...)
var plusImage = '<img src="data:image/gif;base64,\
R0lGODlhsABrAOZ/ANvb29rDsr2Scc3NzdbW1vHx8cTExPLMrtZjDN6BPN2fcezMtPX19f39/dl+\
OcxnHN6hdPHp49B7PNVrHOKNTeHh4b6HXvb29uzs7NltHerq6tx3Lb2dhdV5NcdpJOGTWdx/OtZd\
A//aUPW7PeB8FuucKtttDdllCP3TS/CrM/rLR951EfXWv+qrffKzOOCEQPfDQuOEG+iUJeWMIO2k\
Lvv7+++/nPn5+eqtgPfezNd8N+KLS9hmEdtwIfj4+Prt4vrq3vzy6+CDPvTUvOSWW+WXXenp6efn\
5+WZYOOPUOmsf+ehbfno2723st6+puW+ou23j8t9QuPj48hxMfjj1P78+9N3MshqJsKiitGrjtuP\
VuGjdeOmeffh0Pfm2bx/UcSFVrttNNBkFOTXzL6lksuWbt+3mfDCoN16MM1wLPLUvc57PMu2psF0\
OubGrsd4Ps13OL+uodeCQteJT9+JSeipe9V4Mde3n9y0l+Ssg8VvL9a3obOah/338s6RY////yH5\
BAEAAH8ALAAAAACwAGsAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWm\
p6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f\
4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGi\
xYsYM2rcyJHUDwo8KNjo6GhHiJMhRpJUNCSECRQpQiBZqQhHiBIiXISgQDORTZwlQkDoiehAiBgi\
giqgBIQiixAkkgp9VMVGkR4nhVCR2CXECqlDi14t0ofJBpQuQwiZeBKsoBYv/9AsEWQSJREEUFOo\
ECHiJMIcUHIgaht0aN2TCZi4pKHixMkZKGaQkEEjBIiDROyCVNtCMOEQCoC4HAFjRYgzIWbwRRkZ\
bQg8BluEOCHDsesQOdqOCOFAtAkRKkJk8DJbxG6oIkighTPG4IsQI0SYIJEChXEZIRDwCIFit4On\
UWeEmFMDq4qgs1GgcFEihmM6BpOEcGEcZokUfMU/H7Fbh1GkpgXQwH5ByeGVC3uJgIIJKREkG3Qi\
pGDbUSLAEAIa0PX3U18hGPHHfjE5kABKJ+AU00wD7ceXaXp8IUYIMEh3En8h6LDhSRf8YR6Hf+Qh\
wYsZhpCAgyfhdJIBAGgRQv912QWpg3wu7GZFAzYUF1wGQyixgBl2QIfdUkRG5VgEf2AIg04dOLnf\
bh0scRJ+wU3g2lcMBlAQeMmFoIZsvymXJo067IcCWinAEKNpN5FAAmPipaHBncgpV8eMQT2gA4Qn\
yYYTDSeYcOYJNOQJI18uMIgAGzkShKdybx6HxVmHhtDSS3yJUNlNpZ50AqshTBHHEQatOpqEIYBR\
wXbWBaWESSuUIAOiaEnwAUpXWGCAETXEFoIMwI2AAnpvEHADBUfVFsICP4CAlgcC3KHAGhaIG8Ee\
BgxQAQMIqQgcogIQgO8PGaAURQGCuOGHBXwYUIEPN2BwBL5/1OBDAwrJhhRpdiFcwQEAqf4RxBNl\
kAGAD4I0wAAGGDBA8UTChtGEFDcUUkMBBZDMEZ4xhJBFASsTNQieQXHhsyFAh7DF0IXgudtlSA/y\
33mgNT1IEAGj5ITUU38wQRscPIq1IDVgUIERMX9t9tloBxMIADs=" style="position:relati\
ve; left:-25px; top:-75px"/>';

var xChangeImage = '<a id="currency_switch" href="javascript:void(0)" style=\
"display: inline; position:relative; left: 328px; top: -20px;"><img src="' +
BASE_URL + '"images/parts/icon_show-off.gif"/>&nbsp;&nbsp;' + STRINGS[0] + '</a>';

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

var languages = [
  {l: 'Albanian', s: 'sq'},
  {l: 'Arabic', s: 'ar'},
  {l: 'Bulgarian', s: 'bg'},
  {l: 'Chinese', s: 'zh'},
  {l: 'Chinese_simplified', s: 'zh-cn'},
  {l: 'Chinese_traditional', s: 'zh-tw'},
  {l: 'Croatian', s: 'hr'},
  {l: 'Czech', s: 'cs'},
  {l: 'Danish', s: 'da'},
  {l: 'Dutch', s: 'nl'}, 
  {l: 'English', s: 'en'},
  {l: 'Estonian', s: 'et'},
  {l: 'Filipino', s: 'tl'},
  {l: 'Finnish', s: 'fi'},
  {l: 'French', s: 'fr'},
  {l: 'Galician', s: 'gl'},
  {l: 'German', s: 'de'},
  {l: 'Greek', s: 'el'},
  {l: 'Hebrew', s: 'iw'},
  {l: 'Hindi', s: 'hi'},
  {l: 'Hungarian', s: 'hu'},
  {l: 'Indonesian', s: 'id'},
  {l: 'Italian', s: 'it'},
  {l: 'Japanese', s: 'ja'},
  {l: 'Korean', s: 'ko'},
  {l: 'Latvian', s: 'lv'},
  {l: 'Lithuanian', s: 'lt'},
  {l: 'Maltese', s: 'mt'},
  {l: 'Norwegian', s: 'no'},
  {l: 'Polish', s: 'pl'},
  {l: 'Portuguese', s: 'pt-pt'},
  {l: 'Romanian', s: 'ro'},
  {l: 'Russian', s: 'ru'},
  {l: 'Serbian', s: 'sr'},
  {l: 'Slovak', s: 'sk'},
  {l: 'Slovenian', s: 'sl'},
  {l: 'Spanish', s: 'es'},
  {l: 'Swedish', s: 'sv'},
  {l: 'Thai', s: 'th'},
  {l: 'Turkish', s: 'tr'},
  {l: 'Ukrainian', s: 'uk'},
  {l: 'Vietnamese', s: 'vi'}
];

var cID = '';
var tempList = null;

function DisplayDamage() {
	var wellness = $("#wellnessvalue").text().trim();
	var strenght = $("#content table td:eq(1)").text().trim();
	var rank = $("#content table td:eq(3) img").attr("src").split('_')[3].split('.')[0];
	var rankBonus = (RANKS.indexOf(rank) + 1) * 0.2 + 1;
	var BaseDamage = 2 * (1 + (wellness - 25) / 100) * strenght * rankBonus;
	var BaseDamageFull = 3.5 * strenght * rankBonus; 

	var htmlDamage = '<tr><td valign="middle" nowrap="nowrap">' + STRINGS[7] + '</td>';
	htmlDamage += '<td valign="middle">';
	htmlDamage += '<a alt="' + STRINGS[8] + '" title="' + STRINGS[8] +'" href="/' + LOCALE + 'market/country-0-industry-' + INDUSTRIES.indexOf('Weapon') + '-quality-0">';
	htmlDamage += '<span class="qlsmallmeter" style="float: left; height: 15px; vertical-align: middle; margin-right: 14px">';
	htmlDamage += '<span class="qlsmalllevel" width: 0%">';
	htmlDamage += '</span></span></a><strong>' + Math.ceil(BaseDamage / 2) + ' ('+ (Math.ceil(BaseDamageFull / 2)) +')</strong><br/>';

	for (i=1; i<=5; i++)
	{
		htmlDamage += '<a onclick="location.href = this.href;" style="background-color: red" alt="' + STRINGS[9] + i + '" title="' + STRINGS[9] + i + '" href="/' + LOCALE + 'market/country-0-industry-' + INDUSTRIES.indexOf('Weapon') + '-quality-' + i + '">';
		htmlDamage += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
		htmlDamage += '<span class="qlsmalllevel" style="width: ' + (i * 2) + '0%">';
		htmlDamage += '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
		htmlDamage += '</span></span></a><strong>' + Math.ceil(BaseDamage * (i / 5 + 1)) + ' ('+ (Math.ceil(BaseDamageFull * (i / 5 + 1))) + ')</strong><br/>';
	}

	htmlDamage += '</td></tr>';
	htmlDamage = $("#content table tbody").html() + htmlDamage;
	$("#content table tbody").html(htmlDamage);
	
}

function UpdateLinks() {
	var updateData = [
		{c: 'eR_RM', el: '#menu3 li:eq(0) a', 					p: /^market/},
		{c: 'eR_MM', el: '#menu3 li:eq(1) a', 					p: /^exchange/},
		{c: 'eR_JM', el: '#menu3 li:eq(2) a', 					p: /^human/},
		{c: 'eR_CM', el: '#menu3 li:eq(3) a', 					p: /^companies/},
		{c: 'eR_Ra', el: '#menu4 li:eq(0) a', 					p: /^ranking/},
		{c: 'eR_Co', el: '#menu4 li:eq(1) a', 					p: /^country\/(?!economy|politics|military)/},
		{c: 'eR_Ce', el: '#menu4 li:eq(2) a', 					p: /^country\/econ/},
		{c: 'eR_Cp', el: '#menu4 li:eq(3) a', 					p: /^country\/poli/},
		{c: 'eR_Cm', el: '#menu4 li:eq(4) a', 					p: /^country\/mili/},
		{c: 'eR_El', el: '#menu5 li a:contains("Elections")', 	p: /^election/},
		{c: 'eR_To', el: '#menu5 li a:contains("Tools")', 		p: /^badges/},
		{c: 'eR_To', el: '#menu5 li a:contains("Tools")', 		p: /^rss_menu/},
		{c: 'eR_Ne', el: '#menu5 li a:contains("News")', 		p: /^news\//}
	];
	
	
	var currURL = location.href;
	var token = currURL.substr(BASE_URL.length);
	
	updateData.forEach(function(v) {
		if (token.match(v.p) != null)
			GM_setValue(cID + v.c, currURL);
	});
	
	updateData.forEach(function(v) {
		if (GM_getValue(cID + v.c) != undefined)
			$(v.el).attr("href", GM_getValue(cID + v.c));
	});
}

function AddJobMarketLinks() {

	var currURL = location.href.split('/');
	var skillURL = currURL[5].split('-');
	
	var skillsLinks = [
		{t: 'img:eq(0)', t2: 'p:eq(0)', l: SKILLS[1]},
		{t: 'img:eq(1)', t2: 'p:eq(1)', l: SKILLS[2]},
		{t: 'img:eq(2)', t2: 'p:eq(2)', l: SKILLS[3]}
	];
	skillsLinks.forEach(function (p){
		skillURL[3] = p.l;
		skillURL[5] = 0;
		currURL[5] = skillURL.join('-');
		$("div.rightfilters " + p.t).wrap('<a class="linkhighlight" href="/' + LOCALE + 'human-resources/' + currURL[5] + '"></a>');
		var currSkill = Math.floor($("div.rightfilters " + p.t2).text());
		currSkill += 1;
		currSkill = (currSkill > 8) ? 8 : currSkill;
		skillURL[5] = currSkill;
		currURL[5] = skillURL.join('-');
		$("div.rightfilters " + p.t2).wrap('<a class="linkhighlight" href="/' + LOCALE + 'human-resources/' + currURL[5] + '"></a>');
	});
	if (getSetting(15) == '1') 
		AddSalaryInGold();
}

function AddSalaryInGold() {
	var currency = $("table.offers tr:eq(1) td:eq(3) span.currency").text();
	var sReq = "http://api.erepublik.com/v1/feeds/exchange/GOLD/" + currency + ".json";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq,
		onload: function (json) {
			eval("jsonObj = " + json.responseText);
			var rate = jsonObj[0]["offer"]["for"];
			var salary = 0;
			var goldSalary = 0;

			$("table.offers tr:eq(0) th:eq(2)").attr("width", "70");
			$("table.offers tr:eq(0) th:eq(2)").after("<th width='60'><img title='Gold' alt='Gold' src='/images/parts/icon-gold.gif'/></th>");
			$("table.offers tr").each(function(i) {
				if (i != 0) 
				{
					$(this).find("td:eq(2)").attr("width", "70");
					salary = $(this).find("td:eq(3) span:eq(0)").text() + $(this).find("td:eq(3) sup").text(); 
					goldSalary = Math.round(parseFloat(salary) / parseFloat(rate) * 10000) / 10000;
					$(this).find("td:eq(2)").after("<td>" + goldSalary + "</td>");
				}
			});
		}
	});
}

function AddNewsTitle() {
	
	var currURL = location.href.split('/');
	var newsDesc = '';
	
	switch (currURL[5])
	{
		case 'rated':
		case undefined:
			newsDesc = STRINGS[10];
			break;
		case  'latest':
			newsDesc = STRINGS[11];
			break;
		case 'military':
			newsDesc = STRINGS[12];
			break;
	}
	
	try {
		var flashVars = null;
		if (typeof(window.opera) == 'undefined')
		{
			flashVars = $("h1 embed").attr("flashvars");
			flashVars = flashVars.replace("txt=News", "txt=" + newsDesc);
			$("h1 embed").attr("flashvars", flashVars);
		}
		else
		{
			flashVars = $("h1 object param:eq(3)").attr("value");
			flashVars = flashVars.replace("txt=News", "txt=" + newsDesc);
			$("h1 object param:eq(3)").attr("value", flashVars);
		}
		$("h1 span").text(newsDesc);
		$("h1").clone().replaceAll("h1");

	}
	catch(err)
	{
		$("h1").text(newsDesc);
	}
}

function FixMMUpdate() {
	if (typeof unsafeWindow.$j == 'undefined')
		window.setTimeout(FixMMUpdate, 100);
	else {
		unsafeWindow.$j("body").ajaxSuccess(function(ev, request, settings) {
			if (getSetting(10) == '1')
				window.setTimeout(UpdateLinks, 100);
				
			window.setTimeout(function() {
				var sell_currency = $('#sell_currency').val();
				var buy_currency = $('#buy_currency').val();
				
				if ($("#sell_currencies_selector a[id='" + buy_currency + "']").size() != 0)
				{
					var newLink = $("a[href*='/" + LOCALE + "exchange/create']").attr("href");
					newLink = newLink.replace(/#buy_currencies=(\d+)/, '#buy_currencies=' + sell_currency);
					newLink = newLink.replace(/;sell_currencies=(\d+)/, ';sell_currencies=' + buy_currency);
					$("a[href*='/" + LOCALE + "exchange/create']").attr("href", newLink);
				
					if (settings.url.match(/selectAccount/) && !settings.url.match(/listMyOffers/))
					{
						{
							$("#filters").append(xChangeImage);
							$("#currency_switch").attr("href", "#buy_currencies=" + sell_currency + ";sell_currencies=" + buy_currency + ";page=1");
						}
					}
				}
			}, 100);
		});	
	}
}

function EmployeeMessageAndGifts() {
	var empArray = new Array();
	var citizenID = 0;
	
	$("div.ctools h2").after('<div id="messagealert" style="display:none;"><p class="regular"></p></div>');

	$("table.employees_details tr").each(function(i) {
		if (i > 0)
		{
			citizenID = $(this).find("td:eq(0) div div:eq(0) a").attr("hreF").match(/\/citizen\/profile\/(\d+)/)[1];
			var where = $(this).find("span.tdots2");
			if (where.html() == null)
				where = $(this).find("td:eq(0) div div:eq(2)");
			else
				where = where.parent();
			
			where.append('<br/><a title="' + STRINGS[45] + '" href="/' + LOCALE + 'messages/compose/' + citizenID + '"><img alt="' + STRINGS[45] + '" src="/images/parts/btn-icon_send-message.gif"></a>');
			where.append('<a id="donate_link_' + citizenID + '" style="position: relative; top: 5px; display: inline" title="' + STRINGS[44] + '" href="javascript:void(0);"><img alt="' + STRINGS[44] + '" src="/images/parts/icon_industry_gift.gif" width="25px" height="25px">').click(function() {
				var citID = $(this).find("a:eq(0)").attr("hreF").match(/\/citizen\/profile\/(\d+)/)[1];
				$('#donate_link_' + citID).hide('fast');
				jQuery.post(
					'/citizen/offergift/'+citID,
					{
						_token: $("#_token").val(),
						id:     citID
					},
					function (data, textStatus) {
						var pp = 1;
						if (data.donated.status == "false") {
							$("#messagealert").css("display", "block");
							$("#messagealert").attr("class","invalidicon");
						} else if (data.donated.status == "true") {
							$("#messagealert").css("display","none").fadeIn('fast');
							$("#messagealert").css("display","block");
							$("#messagealert").attr("class","validicon success_message");
						} else if (data.donated.status == "captcha") {
							document.location = data.donated.back_url;
							pp = 0;
						}
						else {
							$("#messagealert").css("display", "block");
							$("#messagealert").attr("class","invalidicon");
							data.donated.message = STRINGS[46];
						}
						if (pp == 1) {
							$('#donate_link_' + citID).show().css('display', 'inline');
							$("#messagealert").children("p").html(data.donated.message);
						}
					},
					"json"
				);
			});
		}
	});
}

function getCurrentSelection(obj) {
	return (obj.value.substring(obj.selectionStart, obj.selectionEnd));
}

function updateTextarea(object, wrapped) {
	var len = object.value.length;
	var scrollTop = object.scrollTop;
	var scrollLeft = object.scrollLeft;
	object.value = object.value.substring(0, object.selectionStart) + wrapped + object.value.substring(object.selectionEnd, len);
	object.scrollTop = scrollTop;
	object.scrollLeft = scrollLeft;
}

function addAttr(attr) {
	var object = document.getElementById('body');
	var attrValue = null;
	do 	{
		attrValue = prompt(STRINGS[13] + attr + ': ');
	} while (attrValue == '');
	
	if (attrValue != null)
	{
		var wrapped = "[" + attr + "=" + attrValue + "]" + getCurrentSelection(object)  + "[/" + attr + "]";
		updateTextarea(object, wrapped);
	}
}

function addStyle(styleTag) {
	var object = document.getElementById('body');
	var wrapped = "["+ styleTag + "]" + getCurrentSelection(object) + "[/" + styleTag + "]";
	updateTextarea(object, wrapped);
}

function AddArticleButtons() {
	if (typeof $("textarea#body") != undefined)
	{
		$("#show_link").css('display', 'none');
		$("#add_bold").css('display', 'none');
		
		$("#link_input").css("visibility", "hidden");
		$("#add_link").css("visibility", "hidden");
		$("#add_link").after("<br/>");

		$("#add_bold").after(imageButton);
		$("#add_bold").after(sizeButton);
		$("#add_bold").after(underlineButton);
		$("#add_bold").after(italicButton);
		$("#add_bold").after(boldButton);
		$("#add_bold").after(linkButton);
		
		$("#add_link2").click(function() { addAttr('url') });
		$("#add_bold2").click(function() { addStyle('b') });
		$("#add_italic").click(function() { addStyle('i') });
		$("#add_underline").click(function() { addStyle('u') });
		$("#add_size").click(function() { addAttr('size') });
		$("#add_image").click(function() { addStyle('img') });
	}
}

function calculateUnitPrice() {
	var industryIndex = location.href.split('/')[5].split('-')[3];
	var unitPrice = 0;
	var price = 0;
	var quality = 0;
	
	$("table.offers tr").each(function(i) {
		if (i != 0) 
		{
			quality = $(this).find("td:eq(1) span span").css("width");
			quality = quality.substr(0, quality.length - 1) / 20;
			price = $(this).find("td:eq(3) span:eq(0)").text() + $(this).find("td:eq(3) sup").text(); 
			if (quality > 1)
			{
				price = $(this).find("td:eq(3) span:eq(0)").text() + $(this).find("td:eq(3) sup").text(); 
				unitPrice = (Math.round((price / quality) * 1000) / 1000).toString().split('.');
				if (unitPrice[1] == undefined)
					unitPrice[1] = '';
				else
					unitPrice[1] = '.' + unitPrice[1];
				$(this).find("td:eq(3) span:eq(1)").after('<br/><span class="special" style="color: #5FAE34;">' + unitPrice[0] + '</span><sup style="color: #5FAE34;">' + unitPrice[1] + '</sup><span class="special"></span>');
			}
		}
	});
	if (getSetting(15) == '1') 
		calculateMarketPricesInGold();
}

function calculateMarketPricesInGold() {
	
	var currency = $("table.offers tr:eq(1) td:eq(3) span.currency").text();
	var sReq = "http://api.erepublik.com/v1/feeds/exchange/" + currency + "/GOLD.json";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq,
		onload: function (json) {
			eval("jsonObj = " + json.responseText);
			var rate = jsonObj[0]["offer"]["for"];
			var goldPrice = 0;
			var price = 0;
			var goldUnitPrice = 0;
			var unitPrice = 0;

			$("table.offers tr:eq(0) th:eq(0)").attr("width", "200");
			$("table.offers tr:eq(0) th:eq(2)").after("<th width='60'><img title='Gold' alt='Gold' src='/images/parts/icon-gold.gif'/></th>");
			$("table.offers tr").each(function(i) {
				if (i != 0) 
				{
					$(this).find("td:eq(0)").attr("width", "200");
					quality = $(this).find("td:eq(1) span span").css("width");
					quality = quality.substr(0, quality.length - 1) / 20;
					
					price = $(this).find("td:eq(3) span:eq(0)").text() + $(this).find("td:eq(3) sup").text(); 
					goldPrice = Math.round(parseFloat(price) * parseFloat(rate) * 10000) / 10000;
					$(this).find("td:eq(2)").after("<td>" + goldPrice + "</td>");
					if (quality > 1)
					{
						unitPrice = (Math.round((price / quality) * 1000) / 1000).toString().split('.');
						if (unitPrice[1] == undefined)
							unitPrice[1] = '';
						else
							unitPrice[1] = '.' + unitPrice[1];
							
						goldUnitPrice = Math.round(parseFloat(price) / quality * parseFloat(rate) * 10000) / 10000;
						$(this).find("td:eq(3)").append('<br/><span style="color: #5FAE34;">' + goldUnitPrice + '</span>');
						$(this).find("td:eq(3) span:eq(1)").after('<br/><span class="special" style="color: #5FAE34;">' + unitPrice[0] + '</span><sup style="color: #5FAE34;">' + unitPrice[1] + '</sup><span class="special"></span>');
					}
				}
			});
		}
	});
}

function addThirdPartyTools() {
	var thirdPartyTools = [
		{aname: 'PeeKaBooh',	aid: '1408159',	name: 'eRepublik Plus',					url: BASE_URL + 'article/erepublik-plus-grand-tutorial-807662/1/20', img: 'http://static.erepublik.com/uploads/avatars/Newspapers/2009/05/15/81f97d040a2b499d539e0a7f61ce3788_55x55.jpg'},
		{aname: 'Sanya18',		aid: '1223208',	name: 'Gecko Ltd eRepublik Tools', 		url: 'http://erepmarket.co.cc/', 					img: 'http://www.erepmarket.co.cc/images/gltd55x55.png'},
		{aname: 'Kumnaa',		aid: '673541', 	name: 'CCCP Group tools',				url: 'http://www.cccp-group.org/', 					img: 'http://images.cccp-group.org/CCCP-55.png'},
		{aname: 'Big Brother',	aid: '557922', 	name: 'eRepublik.ws',					url: 'http://erepublik.ws/', 						img: 'http://static.erepublik.com/uploads/avatars/Newspapers/2008/08/22/e905766ec3489e1a8e2275541ba80c94_55x55.jpg'},
		{aname: 'Zhunder',		aid: '691372', 	name: 'Neat Battle Stats',				url: 'http://neatbattlestats.net16.net/',			img: 'http://static.erepublik.com/uploads/avatars/Newspapers/2008/09/17/0ff5b89a7ce562b6281fb0d5ea4c15d3_55x55.jpg'},
		{aname: 'carbon',		aid: '1124061',	name: 'eRepublik Tools (eRepTools)',	url: 'http://www.ereptools.net/', 					img: 'http://ereptools.net/images/logo_ereptools.png'},
		{aname: 'aVie',			aid: '1288990',	name: 'eGovernment',					url: 'http://www.aviecreative.com/egovernment/', 	img: 'http://static.erepublik.com/uploads/avatars/Newspapers/2009/02/14/9b5707af19283ac1f3620530966f1759_55x55.jpg'},
		{aname: 'Gobba',		aid: '1226399',	name: 'eRepublik Map & Tools',			url: 'http://www.egobba.de/', 						img: 'http://www.egobba.de/images/gobba_link_tiny.jpg'}
	];

	$("div.bordersep").hide();
	$("div.holder").hide();
	$("a.on").removeClass('on');
	$("a#third_party_tools").addClass('on');
	
	thirdPartyTools.forEach(function(p) {
		
		var toolItem = '<div class="bordersep"><p>';
		toolItem += '<a target="blank" href="' + p.url + '">'
		
		if (p.img != '')
			toolItem += '<img src="' + p.img + '" class="iconsoft" />';
		
		toolItem += '&nbsp;&nbsp;&nbsp;' + p.name + '</a>'
		
		if (p.aid != '')
			toolItem += ' by <a href="/' + LOCALE + 'citizen/profile/' + p.aid + '">' + p.aname + '</a></p></div>';
		else
			toolItem += p.aname + '</a></p></div>';
		
		$("ul.tabs").after(toolItem);
	});

	GM_setValue(cID + 'eR_T2', TOOLS[2]);
}

function addNationalForums() {
	var nationalForums = [
		{country: 'Venezuela', 			url: 'http://erepublik.ath.cx/', 					name: 'Erepublik Venezuela'},
		{country: 'Uruguay', 			url: 'http://erepublikuy.forosactivos.com/', 		name: 'eRepublik eUruguay'},
		{country: 'USA', 				url: 'http://eusforum.com/', 						name: 'Discussion Forum of the eUnited States of America - Index'},
		{country: 'United-Kingdom', 	url: 'http://forums.erepublik.co.uk/', 				name: 'eRepublik UK &bull; Index page'},
		{country: 'Ukraine',			url: 'http://eRepublik.in.ua/', 					name: 'eRepublik.in.UA - ????? ?????? ???? eRepublik - Index page'},
		{country: 'Turkey',				url: 'http://www.erepublik.gen.tr', 				name: 'Erepublik Türkiye &bull; Pano anasayfasi'},
		{country: 'Sweden', 			url: 'http://www.erepublik.se/', 					name: 'Erepublik.se - Index page'},
		{country: 'Spain', 				url: 'http://erepublikspain.superforos.com/', 		name: 'Foro Erepublik eEspaña :: Indice'},
		{country: 'South-Africa',		url: 'http://z6.invisionfree.com/eSouth_Africa/',	name: 'Log In'},
		{country: 'Slovenia', 			url: 'http://www.erepublik.si/', 					name: 'Erepublik.si - Dobrodošli'},
		{country: 'Slovakia', 			url: 'http://eslovensko.forumotion.net', 			name: 'eSlovensko - Portál'},
		{country: 'Singapore',		 	url: 'http://esingapore.50.forumer.com/index.php', 	name: 'eSingapore &bull; Index page'},
		{country: 'Serbia',			 	url: 'http://www.eserbia.iz.rs/index.php', 			name: 'eSerbia | The new world...'},
		{country: 'Russia', 			url: 'http://www.erespublika.ru/forum/', 			name: 'eRepublik • ????????????? ?????????? - ??????? ????????'},
		{country: 'Romania', 			url: 'http://romaniavirtuala.info/', 				name: 'RomaniaVirtuala.info | Comunitatea romanilor din eRepublik'},
		{country: 'Portugal',		 	url: 'http://www.erepublikpt.com/', 				name: 'eRepublik PT &bull; Índice'},
		{country: 'Poland', 			url: 'http://erepublik.com.pl/', 					name: 'eRepublik.com.PL | Polskie Centrum Erepublik'},
		{country: 'Philippines',		url: 'http://ephilippines.forummotion.com/', 		name: 'ePhilippines'},
		{country: 'Peru',				url: 'http://erepublikperu.foroactivo.com/', 		name: 'Erepublik Peru'},
		{country: 'Paraguay',			url: 'http://eparaguay.foroactivo.com/', 			name: 'Foro gratis : eParaguay'},
		{country: 'Norway',			 	url: 'http://www.erepublik.no/', 					name: 'Erepublik Norge - Index page'},
		{country: 'Netherlands', 		url: 'http://www.enetherlands.nl/', 				name: 'De Verenigde Nederlanden / The United Netherlands &bull; Portal'},
		{country: 'Mexico', 			url: 'http://erepublikmx.athoim.com/', 				name: 'Official Forum of Mexico. &bull; Página principal'},
		{country: 'Japan', 				url: 'http://nipponblog.net/forum/', 				name: 'eJapan National Forum &bull; Index page'},
		{country: 'Italy', 				url: 'http://www.eitalyforum.altervista.org ', 		name: 'eITALY Community &bull; Indice'},
		{country: 'Israel',				url: 'http://erandia.net/tjc/index.php', 			name: 'Official Israeli Forum - Index'},
		{country: 'Ireland', 			url: 'http://forum.erepublik-ie.com/', 				name: 'eIreland Official Forums &bull; Index page'},
		{country: 'Iran', 				url: 'http://erepublik.ir/forum/', 					name: 'eRepublik.ir - ???? ????'},
		{country: 'Indonesia',		 	url: 'http://www.erepublikindonesia.com/',			name: 'ERepublik Indonesia &bull; Index page'},
		{country: 'India', 				url: 'http://forum.erepublikindia.com/', 			name: 'eIndian Forums &bull; Index page'},
		{country: 'Hungary', 			url: 'http://erepublikhu.info/', 					name: 'Köszöntjük weblapunkon'},
		{country: 'Greece', 			url: 'http://egreece.forumotion.com/', 				name: 'eGreece'},
		{country: 'Germany', 			url: 'http://www.egermany.de.vu/', 					name: 'eGermany Board - www.eRepublik.com'},
		{country: 'France', 			url: 'http://forum.erepublik.fr/', 					name: 'forum.eRepublik.fr &bull; Forum de l’eFrance'},
		{country: 'Finland', 			url: 'http://www.erepublik.fi/', 					name: 'eRepublik.fi &bull; Index page'},
		{country: 'Estonia', 			url: 'http://www.foorum.e-eesti.eu/',				name: 'eEesti foorum &bull; Index page'},
		{country: 'Denmark', 			url: 'http://www.erepublik.dk/', 					name: 'Erepublik.dk - Index page'},
		{country: 'Croatia', 			url: 'http://www.edomovina.com/', 					name: 'eDomovina.com - Službene web stranice eHrvatske'},
		{country: 'Colombia',	 		url: 'http://www.erepublikcolombia.com/', 			name: 'Erepublik Colombia'},
		{country: 'China',				url: 'http://echina.hostei.com/forum/index.php',	name: 'e?? &bull; Index page'},
		{country: 'Chile',	 			url: 'http://echile.foroactivo.net/', 				name: 'Foro gratis : foro de todos los echile de erepubli'},
		{country: 'Canada', 			url: 'http://ecanada.ws/home.html', 				name: 'eCanada Home'},
		{country: 'Bulgaria',			url: 'http://ebulgaria-forum.info',					name: 'ebulgaria-forum.info - ?????'},
		{country: 'Brazil',				url: 'http://www.erepublikbrasil.com/',				name: 'Erepublik Brasil'},
		{country: 'Bosnia-Herzegovina',	url: 'http://ebih.niceboard.net/forum.htm',			name: 'Free forum : eBosna i Hercegovina'},
		{country: 'Bolivia',			url: 'http://www.erepublikbolivia.com/foro/',		name: 'Foro Oficial de eBolivia - Índice'},
		{country: 'Belgium',			url: 'http://s1.zetaboards.com/eBelgium/index/',	name: 'eBelgium.tk'},
		{country: 'Australia',			url: 'http://www.auserepublik.com/',				name: 'eAustralian eRepublik - Official Website'},
		{country: 'Argentina',			url: 'http://erepublikar.forosactivos.com/',		name: 'Foro Oficial eRepublik Argentina'}
	];
	$("div.bordersep").hide();
	$("div.holder").hide();
	$("a.on").removeClass('on');
	$("a#national_forums").addClass('on');
	
	nationalForums.forEach(function(p) {
		$("ul.tabs").after('<div class="bordersep"><p><a target="blank" href="' + p.url + '"><img class="flag" src="/images/flags/L/' + p.country + '.gif" alt="' + p.country.replace(/-/, ' ') + '" title="' + p.country.replace(/-/, ' ') + '"/>' + p.name + '</a></p></div>');
	});

	GM_setValue(cID + 'eR_T2', TOOLS[3]);
}

function addeRepPlusSettings() {
	var htmlSettings = '';
	var strSettings = (GM_getValue(cID + 'eR_Se') == undefined) ? SETTINGS_BITS : GM_getValue(cID + 'eR_Se');

	
	var eRepPlusSettings = [
		{name: STRINGS[14], pos: 12},
		{name: STRINGS[15], pos: 0},
		{name: STRINGS[41], pos: 15},
		{name: STRINGS[38], pos: 13},
		{name: STRINGS[39], pos: 14},
		{name: STRINGS[16], pos:  11},
		{name: STRINGS[17], pos: 1},
		{name: STRINGS[18], pos: 2},
		{name: STRINGS[19], pos: 3},
		{name: STRINGS[20], pos: 4},
		{name: STRINGS[21], pos: 5},
		{name: STRINGS[22], pos: 6},
		{name: STRINGS[23], pos: 7},
		{name: STRINGS[24], pos:  8},
		{name: STRINGS[25], pos:  9},
		{name: STRINGS[26], pos:  10}
	];
	
	$("div.bordersep").hide();
	$("div.holder").hide();
	$("a.on").removeClass('on');
	$("a#erep_plus_settings").addClass('on');
	
	eRepPlusSettings.forEach(function(p) {
		htmlSettings = '<div class="bordersep">';
		if (strSettings.substr(p.pos, 1) == '1')
			htmlSettings += '<div title="' + STRINGS[27] + '" id="feature_on_' + p.pos + '" style="cursor: pointer; float: left; height: 25px; width: 25px; background:url(/images/parts/btn-weekly_on.gif) 0 0 no-repeat"></div>';
		else
			htmlSettings += '<div title="' + STRINGS[28] + '" id="feature_off_' + p.pos + '" style="cursor: pointer; float: left; height: 25px; width: 25px; background:url(/images/parts/btn-weekly_off.gif) 0 0 no-repeat"></div>';
		htmlSettings += '<div style="float: left; line-height: 25px;">&nbsp;&nbsp;&nbsp;' + p.name + '</div>';
		
		if (p.pos == 0) {
			htmlSettings += '<select id="lang_select">';
			languages.forEach(function(p2) {
				htmlSettings += '<option value="' + p2.s +'"';
				
				if (GM_getValue(cID + 'eR_LG') == p2.s)
					htmlSettings += ' selected="selected"';
					
				htmlSettings += '>' + p2.l + '</option>';
			});
			htmlSettings += '</select>';
		}
		
		if (p.pos == 12) {
			htmlSettings += '<table class="offers"><thead><tr><th style="text-align: center;" width="40">Num</th><th width="150">Caption</th><th width="300">Link</th><th style="text-align: center" width="120">New window</th></tr></thead>';
			htmlSettings += '<tbody>';
			for (var i=1; i<=10; i++)
			{
				htmlSettings += '<tr><td style="text-align: center"> ' + i + '</td>';
				htmlSettings += '<td ><input type="text" id="ql_caption_' + i + '" value="' + getLink(i, 0) + '"></td>';
				htmlSettings += '<td><input type="text" size="45" id="ql_url_' + i + '" value="' + getLink(i, 1) +'"></td>';
				if (getLink(i, 2) == "true")
					htmlSettings += '<td style="text-align: center"><input type="checkbox" id="ql_cb_' + i + '" checked="checked"></td></tr>';
				else
					htmlSettings += '<td style="text-align: center"><input type="checkbox" id="ql_cb_' + i + '"></td></tr>';
			}
			htmlSettings += '</tbody></table>';
		}
		
		if (p.pos == 10) {
			htmlSettings += '<input type="button" id="reset_saved_links" value="Reset saved links" />';
		}
		htmlSettings += '</div>';

		$("ul.tabs").after(htmlSettings);
		$("#feature_on_" + p.pos).click(function() {toggleFeature(this);});
		$("#feature_off_" + p.pos).click(function() {toggleFeature(this);});
		
		if (p.pos == 0) {
			$("#lang_select").change(function () {
				GM_setValue(cID + 'eR_LG', $(this).attr('value'));
			});
		}
		
		if (p.pos == 12) {
			for (var i = 1; i <= 10; i++) {
				$("#ql_caption_" + i).change(function() {
					saveLink(this, 0);
				});
				
				$("#ql_url_" + i).change(function() {
					saveLink(this, 1);
				});
				
				$("#ql_cb_" + i).change(function() {
					saveLink(this, 2);
				});
			}
		}
		
		if(p.pos == 10) {
			$("#reset_saved_links").click(function() {
				var savedLinks = ['eR_RM', 'eR_MM', 'eR_JM', 'eR_CM', 'eR_Ra', 'eR_Co', 'eR_Ce', 'eR_Cp', 'eR_Cm', 'eR_El', 'eR_To', 'eR_To', 'eR_Ne'];
				for (var i = 0; i < savedLinks.length; i++) {
					GM_deleteValue(cID + savedLinks[i]);
				}
				UpdateLinks();
				location.reload();
				alert('Reset of Saved Links finished successfully!');
			});
		}
	});
	
	GM_addStyle("table.offers {width: 570px !important; float: right !important; font-size: 12px !important; padding: 0px 0px !important'}");
	GM_addStyle("table.offers th { border-bottom: 1px solid #bebebe; padding: 5px 0px !important;}");

	GM_setValue(cID + 'eR_T2', TOOLS[4]);
}

function saveLink(obj, what) {
	
	var lLinks = null;
	var value = obj.value.replace(/\n/, '');
	var index = obj.id.split('_')[2] - 1;
	if (GM_getValue(cID + 'eR_QL') != undefined)
		lLinks = GM_getValue(cID + 'eR_QL').split('\n');
	else
		lLinks = ['Link 1', '', '', 'Link 2', '', '', 'Link 3', '', '', 'Link 4', '', '', 'Link 5', '', '', 'Link 6', '', '', 'Link 7', '', '', 'Link 8', '', '', 'Support eRep+', BASE_URL + 'citizen/donate/items/1408159', 'false', 'eRepublik Plus', BASE_URL + 'newspaper/erepublik-plus-187657/1', 'false'];
	
	if (what == 2)
		lLinks[index * 3 + what] = obj.checked;
	else
		lLinks[index * 3 + what] = value;
		
	GM_setValue(cID + 'eR_QL', lLinks.join('\n'));
}

function getLink(index, what) {
	var lLinks = null;
	var retVal = '';
	if (GM_getValue(cID + 'eR_QL') != undefined)
		lLinks = GM_getValue(cID + 'eR_QL').split('\n');
	else
		lLinks = ['Link 1', '', '', 'Link 2', '', '', 'Link 3', '', '', 'Link 4', '', '', 'Link 5', '', '', 'Link 6', '', '', 'Link 7', '', '', 'Link 8', '', '', 'Support eRep+', BASE_URL + 'citizen/donate/items/1408159', 'false', 'eRepublik Plus', BASE_URL + 'newspaper/erepublik-plus-187657/1', 'false'];
	
	retVal = lLinks[(index - 1) * 3 + what];
	
	if (retVal == '' && what == 0)
		return ('Link ' + index);
	else
		return (retVal);
		
	return (retVal);
}

function toggleFeature(obj) {
	var sett = obj.id.split('_');
	if (getSetting(sett[2]) == '1') 
		saveSetting(sett[2], 0);
	else
		saveSetting(sett[2], 1);
	addeRepPlusSettings();	
}

function saveSetting(sett, value) {
	var strSettings = (GM_getValue(cID + 'eR_Se') == undefined) ? SETTINGS_BITS : GM_getValue(cID + 'eR_Se');
	strSettings = strSettings.substr(0, sett) + value + strSettings.substring(parseInt(sett)+1);
	GM_setValue(cID + 'eR_Se', strSettings);
}

function getSetting(sett) {
	var strSettings = (GM_getValue(cID + 'eR_Se') == undefined) ? SETTINGS_BITS : GM_getValue(cID + 'eR_Se');
	return (strSettings.substr(sett, 1));
}

function ModifyTools() {
	$("a[href='/" + LOCALE + "badges']").click(function() { GM_setValue(cID + 'eR_T2', TOOLS[0]) });
	$("a[href='/" + LOCALE + "rss_menu']").click(function () { GM_setValue(cID + 'eR_T2', TOOLS[1]) });
	
	if (getSetting(2) == '1') {
		$("ul.tabs").append('<li><a id="third_party_tools" href="#"><span>' + STRINGS[33] + '</span></a></li>');
		$("a#third_party_tools").click(function() { addThirdPartyTools() });
	
		$("ul.tabs").append('<li><a id="national_forums" href="#"><span>' + STRINGS[34] + '</span></a></li>');
		$("a#national_forums").click(function() { addNationalForums() });
	}
	
	$("ul.tabs").append('<li><a id="erep_plus_settings" href="#"><span>' + STRINGS[35] + '</span></a></li>');
	$("a#erep_plus_settings").click(function() { addeRepPlusSettings() });
	
	if (GM_getValue(cID + 'eR_T2') != undefined)
	{
		if (getSetting(2) == '1') {
			if (GM_getValue(cID + 'eR_T2') == TOOLS[2])
				addThirdPartyTools();
			else if (GM_getValue(cID + 'eR_T2') == TOOLS[3])
				addNationalForums();
		}
		
		if (GM_getValue(cID + 'eR_T2') == TOOLS[4])
			addeRepPlusSettings();
	}
}

function addAllCommentsAndTranslate() {
	var commentLink = '';
	var allCommentsLink = '';
	var linkArray = null;
	
	var translated = '';
	var arrToTranslate = null;
	
	var tr = null;

	$("div.articlecontent div.largepadded a.dotted").each(function(i) {
		commentLink = $(this).attr('href');
		numOfComments = $(this).text().match(/(\d+)\D+/)[1];
		if (numOfComments > 20)	{
			linkArray = commentLink.split('/');
			linkArray[5] = 'all';
			allCommentsLink = linkArray.join('/');
			$(this).after('<a class="dotted" href="' + allCommentsLink + '">' + STRINGS[36] + '</a>');
		}
		$(this).parent().append('<span class="rightbordered"> </span>');
		$(this).parent().append('<a class="dotted" id="translate_news_' + i + '" href="#">' + STRINGS[37] + '</a>');
		$("#translate_news_" + i).click(function() {
			$("#translate_news_" + i).text(STRINGS[42]);
			$("#translate_news_" + i).click(function() { location.reload(); });
			tr = new Translator(doTranslate);
			tr.sync = false;
			tr.traverse($("div.article div.articlecontent")[i]);
			tr.traverse($("#comments_div")[i]);
		});
	});
}

function arrSplit(strToSplit, arrToSave) {
	var arr = strToSplit.split(" ");
	var str500 = '';
	for (var i = 0; i < arr.length; i++)
	{
		arr[i] = encodeURIComponent(arr[i]);
		if (str500.length + arr[i].length < 497) {
			str500 += '%20'  + arr[i];
			if (i == arr.length - 1) {
				arrToSave.push(str500);
			}
		}
		else {
			arrToSave.push(str500);
			str500 = arr[i];
		}
	}
	return (arrToSave.length);
}

function doTranslate(text, replace) {
	var strArray = new Array();
	var arrSize = arrSplit(text, strArray);
//	var langTranslate = 'en';
	var langTranslate = 'es';
	
	if (GM_getValue(cID + 'eR_LG') != undefined)
		langTranslate = GM_getValue(cID + 'eR_LG');
	
	doRequest(strArray, 0, 0, replace, langTranslate);
}

function doRequest(arr, i, count, rep, lang) {
	
	if (arr[i] == undefined)
		return;
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&langpair=%7C' + lang + '&q=' + arr[i],
		onload: function(response) {
			eval('var jsonObj = (' + decodeURIComponent(response.responseText.replace(/%/g, "%25")) + ')');

			if (jsonObj["responseData"] != null)
				arr[i] = ' ' + ((jsonObj["responseData"]["translatedText"])) + ' ';
			else
				arr[i] = ' ';
				
			count++;

			if (count < arr.length) {
				doRequest(arr, i + 1, count, rep, lang);
			}
			else {
				rep(decodeHTMLEntities(arr.join(' ')));
			}		
		}
	});
}

function decodeHTMLEntities(strToDecode) {
	var entities = [
		{e: /&quot;/g,	r: '"'},
		{e: /&apos;/g,	r: "'"},
		{e: /&gt;/g,	r: ">"},
		{e: /&lt;/g,	r: "<"},
		{e: /&#39;/g,	r: "'"},
		{e: /&amp;/g,	r: '&'}	];
	
	entities.forEach(function (p) {
		strToDecode = strToDecode.replace(p.e, p.r);
	});
	
	return (strToDecode);
}

function CalcTomorrowWellness() {

	if ($("div.xprank").text() == 'Or')
		return;
	
	if (getSetting(14) == '1')
		CalcSSMedal();
	
	if ($("#owninv").size() == 0)
	{
		$("#user_menu").append('<li><a href="' + location.href.replace(/profile/, 'donate/list') + '">' + STRINGS[43] + '</a></li>');
		$("#user_menu").append('<li><a target="_blank" href="http://neatbattlestats.net16.net/search.php?by=citizen&name=' + $("h1").text() + '">' + STRINGS[47] + '</a></li>');
		return;
	}
		
	var maxFoodQ = 0;
	var foodQ = 0;
	var maxHouseQ = 0;
	var houseQ = 0;
	var wellChange = 0;
	var wellness = $("#wellnessvalue").text().trim();
	var style = "cursor: default; padding: 3px 3px 3px 3px; height: 15px; width: 63px; text-align:center; float: left; font-size: 12px; font-weight: bold; color: #FFF; background-color: ";
	
	$("li[id^='personalitem']:has(img[src $=\'food.gif\']) span span").each(function(i) {
		foodQ = $(this).css("width").replace(/\D+/, '') / 20;
		if (foodQ > maxFoodQ)
			maxFoodQ = foodQ;
	});
	
	$("li[id^='personalitem']:has(img[src $=\'house.gif\']) span span").each(function(i) {
		houseQ = $(this).css("width").replace(/\D+/, '') / 20;
		if (houseQ > maxHouseQ)
			maxHouseQ = houseQ;
	});
	
	if (maxFoodQ == 0) {
		if (wellness > 0 && wellness <= 10)
			wellChange = -1;
		else if (wellness > 10 && wellness <= 50)
			wellChange = -2;
		else if (wellness > 50 && wellness <= 80)
			wellChange = -3;
		else if (wellness > 80 && wellness <= 100)
			wellChange = -4;
	}
	else {
		wellChange = Math.round((1.5 - (wellness/100)) * (maxFoodQ + maxHouseQ) * 100) / 100;
	}
	
	if (wellChange < 0)
		style += "#F64846;";
	else if (wellChange == 0)
		style += "#43B7ED;";
	else
		style += "#5FAE34;";

	tomorrowWellness = parseFloat(wellness) + parseFloat(wellChange);
	tomorrowWellness = Math.round(tomorrowWellness * 100) / 100;

	if (parseFloat(tomorrowWellness) > 100)
		tomorrowWellness = '100 (!)';
	
	$("#wellnessvalue").after('<div title="' + wellChange + '" style="'+ style + '">' + tomorrowWellness + '</div>');

	var foodCalcHtml = "";
	for (var i=1; i<=5; i++)
	{
		wellChange = Math.round((1.5 - (wellness/100)) * (i + maxHouseQ) * 100) / 100;
		tomorrowWellness = parseFloat(wellness) + parseFloat(wellChange);
		tomorrowWellness = Math.round(tomorrowWellness * 100) / 100;
		if (parseFloat(tomorrowWellness) > 100)
			tomorrowWellness = '100 (!)';
		foodCalcHtml += '<div title="' + wellChange + '" style="'+ style + 'background-color: white; font-weight: normal;"><a href="/' + LOCALE + 'market/country-0-industry-' + INDUSTRIES.indexOf('Food') + '-quality-' + i + '">' + 'q' + i + ': ' + tomorrowWellness + '</a></div>';
	}
	
	foodCalcHtml = '<div id="food_wellness" style="float: left; display: none;">' + foodCalcHtml + '</div>';
	$("#wellnessvalue").after(foodCalcHtml);
	$("#wellnessvalue").click(function(){ $('#food_wellness').slideToggle("fast");});
	$("#wellnessvalue").css("cursor", "pointer");
}

function addInteractiveMap() {
	var countryName = $("#profileholder p:eq(1) a:eq(0)").attr("href").split('/')[4];
	var htmlMap = '<a href="#" onclick="javascript:window.open(\''; 
	htmlMap += MAP_URL + countryName.replace(/-/, '_');
	htmlMap += '\',\'mywindow\',\'location=0,status=0,scrollbars=1,fullscreen=1\');" title="" class="vroundbtnh25-start rightpadded">';
	htmlMap += '<span class="vroundbtnh25-end"><span class="vroundbtnh25-core_large"> Interactive Map </span></span></a>';
	$("#profileholder p:eq(1)").css("width", "500px");
	$("#profileholder p:eq(1) a:eq(1)").addClass('rightpadded');
	$("#profileholder p:eq(1)").append(htmlMap);
	if (getSetting(13) == '1')
		getCountryRegions(countryName);
}

function showQuickLinks() {
	var htmlQuickLinks = '<ul style="height: auto !important;">';
	
	for (var i=1; i<=10; i++) {
	
		var currentLinkNAME = getLink(i, 0);
		var currentLinkURL = getLink(i, 1);
		
		if ( currentLinkURL == '' ) {
			htmlQuickLinks += '<li class="quick_links_empty"><a href="#">&nbsp;</a></li>';
		}
		else {
			if (currentLinkURL.substr(0, 11) == 'javascript:')
				htmlQuickLinks += '<li class="quick_links"><a href="#" onclick="' + currentLinkURL + '">' + currentLinkNAME + '</a></li>';
			else
				if (getLink(i, 2) == 'true')
					htmlQuickLinks += '<li class="quick_links"><a href="' + currentLinkURL + '" target="_blank">' + currentLinkNAME + '</a></li>';
				else
					htmlQuickLinks += '<li class="quick_links"><a href="' + currentLinkURL + '">' + currentLinkNAME + '</a></li>';
		}
	}
	htmlQuickLinks += '</ul>';
	$("#menu").append(htmlQuickLinks);
	GM_addStyle("li.quick_links a {width: 85px !important; height: auto !important; float: left; background-color: #E9F5FA; padding: 5px 5px 5px 5px !important; }");
	GM_addStyle("li.quick_links a:hover {width: 85px !important; float: left; color: white; background-color: #53B3D3; padding: 5px 5px 5px 5px !important; }");
	GM_addStyle("li.quick_links_empty a {width: 85px !important; height: auto !important; float: left; cursor: default; background-color: #E9F5FA; padding: 5px 5px 5px 5px !important; }");
	GM_addStyle("li.quick_links_empty a:hover {width: 85px !important; float: left; cursor: default; background-color: #E9F5FA; padding: 5px 5px 5px 5px !important; }");	
}

function getCountryRegions(countryName) {
	var sCountriesReq = "http://api.erepublik.com/v1/feeds/countries.json";
	var sCountryReq = "http://api.erepublik.com/v1/feeds/countries/";
	var sRegionReq = "http://api.erepublik.com/v1/feeds/regions/";
	$("table.regions tr th:eq(0)").after('<th></th><th width="150"></th>');
	GM_xmlhttpRequest({
		method: 'GET',
		url: sCountriesReq,
		onload: function (json) {
			eval("tempList = " + json.responseText);
			$.each(tempList, function(i, val) {
				if (countryName == val["permalink"]) {
					GM_xmlhttpRequest({
						method: 'GET',
						url: sCountryReq + val["id"] + ".json",
						onload: function (json) {
							eval("tempList = " + json.responseText + ";");
							var strHtml = new Array();
							$.each(tempList["regions"], function(i, val) {
								GM_xmlhttpRequest({
									method: 'GET',
									url: sRegionReq + val["id"] + ".json",
									onload: function (json) {
										eval("tempList = " + json.responseText + ";");
										strHtml[i] = "<td><img src='/images/parts/icon_industry_hospital.gif' style='float: left;'/></td><td>";
										if (tempList["constructions"] != null)
										{
											$.each(tempList["constructions"], function(j, val) {
												if (val["name"] == "hospital")
													strHtml[i] += '<span class="qlmeter" style="float: left;"><span class="qllevel" style="width: ' + (val["quality"] * 20) + '%;"><img src="/images/parts/ql-indicator_full.gif" alt="Quality Level" title="Quality"></span></span>';
												else if (tempList["constructions"].length == 1)
													strHtml[i] += '<span class="qlmeter"><span class="qllevel" style="width: 0%;"><img src="/images/parts/ql-indicator_full.gif" alt="Quality Level" title="Quality"></span></span>';										
											});
										}
										else
											strHtml[i] += '<span class="qlmeter"><span class="qllevel" style="width: 0%;"><img src="/images/parts/ql-indicator_full.gif" alt="Quality Level" title="Quality"></span></span>';										
										strHtml[i] += "</td>";
										$("table.regions").find("a.fakeheight[href='/" + LOCALE + "region/" + tempList["permalink"] + "']").css("float", "left");
										$("table.regions").find("a.fakeheight[href='/" + LOCALE + "region/" + tempList["permalink"] + "']").css("text-height", "55px");
										$("table.regions").find("td:has(a.fakeheight[href='/" + LOCALE + "region/" + tempList["permalink"] + "'])").after(strHtml[i]);
									}
								});
							});
						}
					});
				}
			});
		}
	});
}

function CalcSSMedal() {
	var Strength = parseFloat($('img[src $= "icon_skill_strenght.gif"]').parent().text());
	var trainingsNeeded = 0;
	var nextStrength = (Math.floor(Strength / 5) + 1) * 5;
	
	if (Strength >= 4) {
		trainingsNeeded = Math.floor((nextStrength - Strength) / 0.04);
		if (((trainingsNeeded * 0.04) + Strength) < nextStrength)
			trainingsNeeded++;
	}
	else if (Strength >= 3 && Strength < 4)	{
		trainingsNeeded = 25 + Math.floor((4 - Strength) / 0.1);
		if (((trainingsNeeded * 0.2) + Strength + 25) < nextStrength)
			trainingsNeeded++;
	}
	else if (Strength >= 2 && Strength < 3) {
		trainingsNeeded = 35 + Math.floor((3 - Strength) / 0.2);
		if (((trainingsNeeded * 0.1) + Strength + 35) < nextStrength)
			trainingsNeeded++;
	}
	else if (Strength >= 1 && Strength < 2)	{
		trainingsNeeded = 40 + Math.floor((2 - Strength) / 0.5);
		if (((trainingsNeeded * 0.5) + Strength + 40) < nextStrength)
			trainingsNeeded++;
	}
	$('#achievment li:eq(6) span p:eq(1)').append(".<br/>" + STRINGS[40] + "<strong>" + trainingsNeeded + "</strong>");
}

function addBattleStats() {
	var battleID = location.href.substr(location.href.lastIndexOf('/') + 1);
	$("div.defender:eq(0)").append('<ul class="profilemenu"><li><a class="goright" target="_blank" href="http://neatbattlestats.net16.net/showbattle.php?id=' + battleID + '">' + STRINGS[48] + '</a></li></ul>');
}

function Main(e) {

	try {
		cID = $("div.core div.avatarholder a").attr("href").split('/')[4] + "_";
	} catch (e) {}
	
	if (typeof unsafeWindow == 'undefined')
		unsafeWindow = window;
	
	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, 2) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);

	if (getSetting(12) == '1')
		window.setTimeout(showQuickLinks, 0);

	$("#nav").ready(function() {
		if (getSetting(10) == '1')
			UpdateLinks();
	});

	var pagesFunctions = [
		{p: 'my-places/army', 		s:5, 	f: DisplayDamage},
		{p: 'human-resources/',		s:6, 	f: AddJobMarketLinks},
		{p: 'news/', 				s:1, 	f: AddNewsTitle},
		{p: 'exchange', 			s:7, 	f: FixMMUpdate},
		{p: 'company-employees/',	s:9, 	f: EmployeeMessageAndGifts},
		{p: 'write-article', 		s:4, 	f: AddArticleButtons},
		{p: 'edit-article/',		s:4, 	f: AddArticleButtons},
		{p: 'forum',				s:4, 	f: AddArticleButtons},
		{p: 'market/', 				s:8, 	f: calculateUnitPrice},
		{p: 'badges',				s:-1, 	f: ModifyTools},
		{p: 'rss_menu', 			s:-1, 	f: ModifyTools},
		{p: 'article/',				s:0, 	f: addAllCommentsAndTranslate},
		{p: 'newspaper/',			s:0, 	f: addAllCommentsAndTranslate},
		{p: 'citizen/profile/',		s:3, 	f: CalcTomorrowWellness},
		{p: 'country',				s:11, 	f: addInteractiveMap},
		{p: 'battles/show/',		s:16,	f: addBattleStats}
	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p) && (getSetting(v.s) != '0' || v.s == '-1'))
			v.f();
	});
	
	$("#logo a").append(plusImage);
	$("#logo a").attr("title", "eRepublik Plus v" + VERSION);
};

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);


// =============================================================================================================
// 	Version		Date			Change Log
//	0.58		7 Oct 2009		- HotFix release: Changed URL mask to cover for different eRep URLs
//								
//	0.57		6 Oct 2009		- New Features:
//								1)	Advanced wellness calculator (now shows tomorrow wellness for all q of food)
//								2)	Added links to all donations and fights on player profile page
//								3)	Added send message and offer gift to all employees page
//								4)	Added Neat Battle Stats to Third Party Tools
//								5)	Added link to stats on Battle Page
//								6) 	Added full damage to Army page
//
//								- Updates:
//								1)	Added Turkey and Slovakia national forums
//								2)	Updated Estonia, Russia, Singapore national forum
//
//	0.56		01 Sep 2009		- New Features:
//								1)	Added calculation of market prices and salaries in gold
//								- Updates:
//								1) Added Ukraine Forum
//								2) Updated forum URLs for Canada and Iran
//								- Fixes:
//								1) 	Translations now work in Opera too
//								2) 	Fixed issue with News in Opera
//								3)	Fixed issue with translation of multiple articles on newspaper page
//						
//	0.55		21 Aug 2009		- Fixes:
//								1) 	Changed url of jQuery library (now it is part of Google API)
//								- Updates:			
//								1)	Changed URLs of the following Pages: Bolivia, Canada, Colombia
//								2)	Added URL of South African and Chinese official forums
//
//	0.54		10 Jul 2009		- Fixes:
//								1) 	Fixed serious defect with donations under Opera
//
//	0.53		10 Jul 2009		- New Features:
//								1) 	Added Trainings till next Super Soldier medal Feature
//								2) 	Added Quality of Hospital in Social Stats Feature
//								- Updates:
//								1) 	Added India and Japan official forum links
//								2) 	Redesigned code for easier localization
//								3) 	Updated Italian official forum link
//								4) 	Code changes to support Opera browser
//
//	0.52		10 Jun 2009		- Updates:
//								1)	Added links to following National Pages and Forums:
//									Mexico, Chile, Venezuela, Argentina, Colombia, Peru, 
//									Uruguay, Paraguay, Bolivia and Philippines
//								2) 	Cleaner code for Damage in Army code
//								3)	Minor tweaks to support Spanish version of eRepublik
//								4)	Added 'Reset saved links' button in Plus Settings
//								5)	Fixed MM defect when currency offer was made by company
//
//
//	0.51		02 Jun 2009		- New features:
//								1) 	Added Interactive Map Feature
//								2)	Added Quick Links Feature
//								3)	Added Bulgaria, Russia and Singapore forum links
//								4)	Started adoption to support future Spanish version of eRepublik
//
//								- Fixes:
//								1)	Fixed URL of Spanish Forum
//
//
//	0.50		01 Jun 2009		- New features:
//								1) 	Added eRepublik Plus Settings 
//									(from now on you can turn eRepublik features on and off)						
//								2) 	Added translation support for OVER 40 languages
//								3)	Added erepTools logo
//								4)	Expanded Unit price to all products in Marketplace
//								5)	Added forum of Bosnia and Herzegovina
//								- Fixes:
//								1) 	Cosmetic bug with spaces after and before bb tags in translations is fixed now
//
//	0.42		29 May 2009		- New features:
//								1)	eRepublik Plus is now able to translate newspaper
//									articles to english. Comments also included into
//									translation process.
//
//								- Fixes:
//								1) 	Fixed bug with Save Links when used under Organization account
//								2)	Fixed bug with Save Links on Monetary Market. Now it remembers
//									your last combination of currencies when these are changed using
//									selectors
//								3) 	From now on, citizen and organization(s) accounts do not share 
//									same Saved Links, these are entirely separated
//								4)	Changed the way of signaling that your wellness will exceed 100
//								5)	Fixed minor bug with wellness calculator, it attempted to
//									calculate wellness for Organizations :), now fixed
//							
//	0.41		26 May 2009		- Updates & fixes:
//								1) 	Added logo to Third Party Tools for two tools 
//								2) 	Added eSerbia and eIsraeli Forums to National Pages and Forums
//								3) 	Fixed minor bug with wellness rounding
//								4) 	Fixed bug with wrong calculation of wellness when more houses 
//									or foods with various Q were in inventory
//
//	0.40		25 May 2009		- New features release
//								1)	Rudimental wellness calculator (shows tomorrow's wellness)
//								2)	Tools got 'Third Party Tools' and 'National Forums' tabs
//								3)	'All comments' link to show all the comments in Newspaper
//
//	0.31		23 May 2009		- Bug fixes release:
//								1) 	Removed functionality of 'Update' button in Monetary market
//									as it does not make any sense any longer. There was an non-announced 
//									change to eRepublik base code and from now on, you can delete or update
//									your offer only after 5 minutes elapsed. This change caused bug in 
//									eRepublik Plus so that your offer was deleted after 5 minutes but new one
//									was not posted. All of that functionality is now gone. 
//
// 	0.30		21 May 2009		- New features release:
//								1) 	Calculates and shows unit price of raw materials 
//									(price per quality level)
//								2)	Article editor now available for forum posts too.
//								3)	Article editor rewritten from scratch to avoid ugly
//									functions overrides and to be less 'jumpy'.
//
//	0.21		18 May 2009		- Bug fixes release (thanks to those who reported)
//								1) 	When new article created, buttons were not shown, now fixed
//
//	0.20		18 May 2009		- New features release:
//								1) 	Added buttons to help edit newspapers
//								2) 	When you put your pointer over the eRepublik Logo, 
//									version of eRepublik Plus is shown (this is to help you
//									find out what version you are using)
//
//	0.12		16 May 2009		- Bug fixes release (Again, thanks to those who reported it :))		
//								1)	Save Links made more robust to avoid some quirks
//								2)	Added version meta tag to the script so you know what version
//									you have installed
//
//	0.11		16 May 2009		- Bug fixes release (Thanks to those who reported defects :))
//								1)	Field Marshals had incorrectly calculated damage, now fixed
//								2)	7+ working skills were not correctly filtered, now fixed
//
//	0.10		15 May 2009		- Initial release with the following features:
//								1) 	Links are preserved for Marketplace, Monetary market, Job market,
//									Companies for sale, Rankings, Social, Economic, Political and	
//									Military stats, Elections, News and Tools
//								2)	All Employees page shows wellness of each employee
//								3)	Army page calculates and displays damage done with various quality
//									level of weapon. Click on Quality stars shows local Marketpace offer
//									for that quality level.
//								4)	Monetary market has added 'Swap currencies' feature as well as Update offer
//								5)	Job market page has added links to quickly filter offer 
//									by Skill type and Skill value
//								6)	News page shows type of news (latest, top ranked...)
//								7)	Added Plus icon near eRepublik logo when eRepublik Plus script is active

/**
 * Translator
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 5/26/2008
 *
 * @projectDescription JS Class to translate text nodes.
 * @author Ariel Flesler
 * @version 1.0.1
 */
 
/**
 * The constructor must receive the parsing function, which will get the text as parameter
 * To use it, call the method .traverse() on the starting (root) node.
 * If the parsing is asynchronous (f.e AJAX), set sync to false on the instance.
 * When doing so, the parser function receives an extra argument, which is a function
 * that must be called passing it the parsed text.
 */
function Translator( parser, filter ){
	this.parse = parser; // function that parses the original string
	this.filter = filter; // optional filtering function that receives the node, and returns true/false
};
Translator.prototype = {
	translate:function( old ){ // translates a text node
		if( this.sync )
			this.replace( old, this.parse(old.nodeValue) );
		else{
			var self = this;
			this.parse( old.nodeValue, function( text ){
				self.replace( old, text );
			});
		}
	},
	makeNode:function( data ){
		if( data && data.split ) // replacing for a string
			data = document.createTextNode(data);
		return data;
	},
	replace:function( old, text ){ // Replaces a text node with a new (string) text or another node
		if( text != null && text != old.nodeValue ){
			var parent = old.parentNode;
			if( text.splice ){ // Array
				for( var i = 0, l = text.length - 1; i < l; )
					parent.insertBefore( this.makeNode(text[i++]), old );
				text = this.makeNode(text[l] || ''); // Last
			}else
				text = this.makeNode(text);
			parent.replaceChild( text, old );
		}
	},
	valid:/\S/, // Used to skip empty text nodes (modify at your own risk)
	sync:true, // If the parsing requires a callback, set to false
	traverse:function( root ){ // Goes (recursively) thru the text nodes of the root, translating
		var children = root.childNodes,
			l = children.length,
			c = children.length,
			node;
		
		while( l-- ){
			node = children[c - l - 1];
			if( node.nodeType == 3 ){ // Text node
				if( this.valid.test(node.nodeValue) ) // Skip empty text nodes
					this.translate( node );
			}else if( node.nodeType == 1 && (!this.filter || this.filter(node)) ) // Element node
				this.traverse( node );
		}
	}
};