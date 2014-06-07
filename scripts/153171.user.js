// ==UserScript==
// @name        Googlifix (Google INTERFACE LANGUAGE changer)
// @author      om467
// @namespace   com.googlifix.uilanguage
// @include     http://www.google.*/search*
// @include     https://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     https://www.google.*/webhp*
// @include     http://google.*/search*
// @include     https://google.*/search*
// @include     http://google.*/webhp*
// @include     https://google.*/webhp*
// @include     http://www.google.*/
// @include     https://www.google.*/
// @include     http://google.*/
// @include     https://google.*/
// @include     http://www.google.*/#*
// @include     https://www.google.*/#*
// @include     http://google.*/#*
// @include     https://google.*/#*
// @include     https://encrypted.google.com/search*
// @include     https://encrypted.google.com/webhp*
// @include     https://encrypted.google.com/
// @include     https://encrypted.google.com/#*
// @version     4
// @updateURL   https://userscripts.org/scripts/source/153171.meta.js
// @downloadURL https://userscripts.org/scripts/source/153171.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// ==/UserScript==

(function() {

//########################### START OF CONSTANTS ###########################//

var SCRIPT_VERSION = 4;
// Source: Search settings on Google (2012-11-27) + http://meta.wikimedia.org/wiki/List_of_Wikipedias
// List of codes
var GFUL_LANG_ISO_ARRAY = ['en','af','ak','sq','am','ar','hy','az','eu','be','bem','bn','bh','xx-bork',
'bs','br','bg','km','ca','chr','ny','zh-CN','zh-TW','co','hr','cs','da',
'nl','xx-elmer','eo','et','ee','fo','tl','fi','fr','fy','gaa','gl',
'ka','de','el','gn','gu','xx-hacker','ht','ha','haw','iw','hi','hu','is',
'ig','id','ia','ga','it','ja','jw','kn','kk','rw','rn','xx-klingon','kg',
'ko','kri','ku','ckb','ky','lo','la','lv','ln','lt','loz','lg','ach','mk',
'mg','ms','ml','mt','mi','mr','mfe','mo','mn','sr-ME','ne','pcm','nso',
'no','nn','oc','or','om','ps','fa','xx-pirate','pl','pt-BR','pt-PT','pa',
'qu','ro','rm','nyn','ru','gd','sr','sh','st','tn','crs','sn','sd','si',
'sk','sl','so','es','es-419','su','sw','sv','tg','ta','tt','te','th','ti',
'to','lua','tum','tr','tk','tw','ug','uk','ur','uz','vi','cy','wo','xh',
'yi','yo','zu'];
// English name equivalent to GFUL_LANG_ISO_ARRAY
var GFUL_LANG_ENGLISH_ARRAY = ['English','Afrikaans','Akan','Albanian','Amharic','Arabic','Armenian','Azerbaijani','Basque','Belarusian','Bemba','Bengali','Bihari','Bork, bork, bork!',
'Bosnian','Breton','Bulgarian','Cambodian','Catalan','Cherokee','Chichewa','Chinese (Simplified)','Chinese (Traditional)','Corsican','Croatian','Czech','Danish',
'Dutch','Elmer Fudd','Esperanto','Estonian','Ewe','Faroese','Filipino','Finnish','French','Frisian','Ga','Galician',
'Georgian','German','Greek','Guarani','Gujarati','Hacker','Haitian Creole','Hausa','Hawaiian','Hebrew','Hindi','Hungarian','Icelandic',
'Igbo','Indonesian','Interlingua','Irish','Italian','Japanese','Javanese','Kannada','Kazakh','Kinyarwanda','Kirundi','Klingon','Kongo',
'Korean','Krio (Sierra Leone)','Kurdish','Kurdish (Sorani)','Kyrgyz','Lao','Latin','Latvian','Lingala','Lithuanian','Lozi','Luganda','Luo','Macedonian',
'Malagasy','Malay','Malayalam','Maltese','Maori','Marathi','Mauritian Creole','Moldovan','Mongolian','Montenegrin','Nepali','Nigerian Pidgin','Northern Sotho',
'Norwegian','Norwegian (Nynorsk)','Occitan','Oriya','Oromo','Pashto','Persian','Pirate','Polish','Portuguese (Brazil)','Portuguese (Portugal)','Punjabi',
'Quechua','Romanian','Romansh','Runyakitara','Russian','Scots Gaelic','Serbian','Serbo-Croatian','Sesotho','Setswana','Seychellois Creole','Shona','Sindhi','Sinhalese',
'Slovak','Slovenian','Somali','Spanish','Spanish (Latin American)','Sundanese','Swahili','Swedish','Tajik','Tamil','Tatar','Telugu','Thai','Tigrinya',
'Tonga','Tshiluba','Tumbuka','Turkish','Turkmen','Twi','Uighur','Ukrainian','Urdu','Uzbek','Vietnamese','Welsh','Wolof','Xhosa',
'Yiddish','Yoruba','Zulu'];
// Native name equivalent to GFUL_LANG_ISO_ARRAY
var GFUL_LANG_NATIVE_ARRAY = ['English','','Akana','Shqip','አማርኛ','العربية','Հայերեն','Azərbaycanca','Euskara','Беларуская','','বাংলা','भोजपुरी','',
'Bosanski','Brezhoneg','Български','','Català','ᏣᎳᎩ','Chi-Chewa','简体字','簡體字','Corsu','Hrvatski','Čeština','Dansk',
'Nederlands','','Esperanto','Eesti','Eʋegbe','Føroyskt','','Suomi','Français','Frysk','','Galego',
'ქართული','Deutsch','Ελληνικά','Avañe\'ẽ','ગુજરાતી','','Krèyol ayisyen','هَوُسَ','Hawai`i','עברית','हिन्दी','Magyar','Íslenska',
'Igbo','Bahasa Indonesia','Interlingua','Gaeilge','Italiano','日本語','Basa Jawa','ಕನ್ನಡ','Қазақша','Ikinyarwanda','Kirundi','tlhIngan Hol','KiKongo',
'한국어','','Kurdî','Soranî','','ລາວ','Latina','Latviešu','Lingala','Lietuvių','','Luganda','','Македонски',
'Malagasy','Bahasa Melayu','മലയാളം','Malti','Māori','मराठी','','Молдовеняскэ','Монгол','','नेपाली','','Sesotho sa Leboa',
'Norsk (Bokmål)','Nynorsk','Occitan','ଓଡ଼ିଆ','Oromoo','پښتو','فارسی','','Polski','Português','Português','ਪੰਜਾਬੀ',
'Runa Simi','Română','Rumantsch','','Русский','Gàidhlig','Српски / Srpski','Srpskohrvatski / Српскохрватски','Sesotho','Setswana','','chiShona','سنڌي','සිංහල',
'Slovenčina','Slovenščina','Soomaaliga','Español','Español','Basa Sunda','Kiswahili','Svenska','Тоҷикӣ','தமிழ்','Tatarça / Татарча','తెలుగు','ไทย','ትግርኛ',
'faka Tonga','','chiTumbuka','Türkçe','تركمن / Туркмен','Twi','','Українська','اردو','O‘zbek','Tiếng Việt','Cymraeg','Wolof','isiXhosa',
'ייִדיש','Yorùbá','isiZulu'];

//############################ END OF CONSTANTS ############################//


//######################## START OF HELPER FUNCTIONS #######################//

// Shortcut to document.getElementById
function $(id)
{
	return document.getElementById(id);
}
// Shortcut to XPath
function $x(p, context, docObj)
{
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
	return arr;
}
// Shortcut to XPath[0]
function $x1(p, context, docObj)
{
	var nodeArray = $x(p, context, docObj);
	return (nodeArray.length > 0) ? nodeArray[0] : null;
}
// Shortcut to document.createElement
function $c(nodeName, attrList, eventsList, appendToNode, insertBeforeNode, insertAfterNode)
{
	var node = document.createElement(nodeName);
	if (attrList)
	{
		for (var attrName in attrList)
		{
			if (attrList.hasOwnProperty(attrName) && (attrName in node))
				node[attrName] = attrList[attrName];
			else if (attrList.hasOwnProperty(attrName))
				node.setAttribute(attrName, attrList[attrName]);
		}
	}
	if (eventsList)
	{
		for (var eventName in eventsList)
			node.addEventListener(eventName, eventsList[eventName]);
	}
	if (appendToNode && appendToNode.appendChild)
		appendToNode.appendChild(node);
	if (insertBeforeNode && insertBeforeNode.parentNode && insertBeforeNode.parentNode.insertBefore)
		insertBeforeNode.parentNode.insertBefore(node, insertBeforeNode);
	if (insertAfterNode && insertAfterNode.parentNode && insertAfterNode.parentNode.insertBefore)
		insertAfterNode.parentNode.insertBefore(node, insertAfterNode.nextSibling);
	return node;
}
// Shortcut to update of node
function $u(node, attrList, eventsList)
{
	if (attrList)
	{
		for (var attrName in attrList)
		{
			if (attrList.hasOwnProperty(attrName) && (attrName in node))
				node[attrName] = attrList[attrName];
			else if (attrList.hasOwnProperty(attrName))
				node.setAttribute(attrName, attrList[attrName]);
		}
	}
	if (eventsList)
	{
		for (var eventName in eventsList)
			node.addEventListener(eventName, eventsList[eventName]);
	}
}
// Shortcut to removeChild
function $r(targetNode) {
	var node = (typeof targetNode === "string") ? $(targetNode) : targetNode;
	if ((node) && (node.parentNode))
		return node.parentNode.removeChild(node);
	return null;
}
// Shortcut to Array.contains
function $ac(arr, obj)
{
    var i = arr.length;
    while (i--)
	{
        if (arr[i] === obj)
            return true;
    }
    return false;
}
// Shortcut to Element.addClass
function $ca(nodes, className)
{
	if (nodes)
	{
		if (!nodes.length)
		{
			nodes.className = (nodes.className.indexOf(className) != -1) ? nodes.className : nodes.className + " " + className;
		}
		else
		{
			for (var key in nodes)
			{
				if (nodes[key] && nodes[key].className)
					nodes[key].className = (nodes[key].className.indexOf(className) != -1) ? nodes[key].className : nodes[key].className + " " + className;
			}
		}
	}
}
// Shortcut to Element.toggleClass
function $ct(nodes, className, newClassName)
{
	var pattern = new RegExp("[ ]*" + className, "g");
	if (nodes && className)
	{
		if (!nodes.length)
		{
			nodes.className = (nodes.className.indexOf(className) != -1) ? nodes.className.replace(pattern, (newClassName ? " " + newClassName : "")) : nodes.className + " " + className;
		}
		else
		{
			for (var key in nodes)
			{
				if (nodes[key] && nodes[key].className)
					nodes[key].className = (nodes[key].className.indexOf(className) != -1) ? nodes[key].className.replace(pattern, (newClassName ? " " + newClassName : "")) : nodes[key].className + " " + className;
			}
		}
	}
}
// Shortcut to Element.removeClass
function $cr(nodes, className)
{
	var pattern = new RegExp("[ ]*" + className, "g");
	if (nodes)
	{
		if (!nodes.length)
		{
			nodes.className = (nodes.className.indexOf(className) != -1) ? nodes.className.replace(pattern, "") : nodes.className;
		}
		else
		{
			for (var key in nodes)
			{
				if (nodes[key] && nodes[key].className)
					nodes[key].className = (nodes[key].className.indexOf(className) != -1) ? nodes[key].className.replace(pattern, "") : nodes[key].className;
			}
		}
	}
}
// Shortcut to Element.hasClass
function $ch(node, className)
{
	if (node && !node.length)
		node.className = node.className.indexOf(className) != -1;
}
// Returns user language
function GetUserLanguage()
{
	var language = unsafeWindow.google.kHL;
	var languagePattern = new RegExp("/intl/([a-z]{2,3}(?:-[0-9A-Z]{2,3}|-[a-z]{4,})?)/policies/?fg=1", "");
	var anchors = document.getElementById("fsl").getElementsByTagName("a");
	for (var i = 0; i < anchors.length; i++)
	{
		if (anchors[i].getAttribute("href").match(languagePattern))
		{
			language = anchors[i].getAttribute("href").match(languagePattern)[1];
			break;
		}
	}	
	return language;
}
// Removes language from query
function RemoveGoogleLanguage(query)
{
	var urlLanguagePattern = new RegExp("hl=[a-z]{2,3}(?:-[0-9A-Z]{2,3}|-[a-z]{4,})?[&]?", "g");
	return query.replace(urlLanguagePattern, "");
}
// Adds language to query
function AddGoogleLanguage(query, language)
{
	if (query.indexOf("#") == -1) // document.location.search
		return query.indexOf("?") == -1 ? "?hl=" + language : [query.slice(0, 1), "hl=" + language + "&", query.slice(1)].join('');
	else // document.location.hash
		return [query.slice(0, 1), "hl=" + language + "&", query.slice(1)].join('');
}

// Update check for new script
function UpdateCheck()
{
	setTimeout(function()
	{
		var lastUpdateCheck = GM_getValue('com.googlifix.uilanguage.lastcheck', 0);
		var now = Math.round(new Date().getTime() / 1000);
		
		if (now > (lastUpdateCheck + 604800))
		{
			GM_setValue('com.googlifix.uilanguage.lastcheck', now);
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/153171.meta.js",
				onload: function(xhr)
				{
					var siteVersion = parseInt(xhr.responseText.match(/\/\/\s*@version\s*([\d]+).*/)[1]);
					if (siteVersion > SCRIPT_VERSION)
					{
						var box = document.createElement("div");
						box.id = "com-googlifix-updatebox";
						box.innerHTML = "New version of Googlifix INTERFACE LANGUAGE changer is available. <a href=\"http://userscripts.org/scripts/source/153171.user.js\" onclick=\"this.parentNode.style.display='none'\">Update now</a>.";
						document.querySelector("body").appendChild(box);
					}
				}
			});
		}
	}, 2000);
}

//######################### END OF HELPER FUNCTIONS ########################//


//################################## INIT ##################################//

// CSS styles
GM_addStyle(" \
	#com-googlifix-uilanguage-menu-item-dialog {color:#777777; display:block; line-height:17px; padding:6px 44px 6px 30px; text-decoration:none; cursor:pointer;} \
	#com-googlifix-uilanguage-menu-item-dialog:hover {background-color:#F1F1F1;} \
	#com-googlifix-uilanguage-menu .hdtbSel, \
		#com-googlifix-uilanguage-menu a {text-overflow:ellipsis; overflow:hidden;} \
	.gful_mnu_act {display:block;} \
	.gful_bg {background-color:#FFFFFF; height:100%; left:0px; opacity:0.75; position:fixed; top:0px; width:100%; z-index:1000;} \
	.gful_dlg {background-color:#FFFFFF; overflow:hidden; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); position:fixed; left:100px; top:50px; bottom:50px; right:100px; z-index:1001;} \
	.gful_opt {position:fixed; left:120px; top:60px; right:160px;} \
	.gful_opt > div {display:inline-block;} \
	.gful_opt > div > span {margin-left:5px;} \
	.gful_opt > div > a {display:inline-block; color:#777 !important; padding:3px 5px; text-decoration:none; margin-left:5px;} \
	.gful_opt > div > a:hover {background-color:#F1F1F1;} \
	.gful_opt > div > a.gful_opt_act {border-bottom:solid 3px #D14836;} \
	.gful_opt > div > a.gful_opt_act:hover {background-color:transparent;} \
	.gful_cls { cursor:pointer; height:20px; position:absolute; right:11px; top:10px; width:20px; background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAElBMVEX////39/e9vb2zs7PCwsLv7++5ffrDAAAAL0lEQVQI12MIEWBgdGVwVmQQMmEQMhJUVmRgVFYyEmBgEDJWZICSEBGILEQlWBcAq64Ft1WDk9gAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	.gful_cnt {overflow-y:auto; position:fixed; left:120px; top:100px; bottom:70px; right:120px; z-index:1002;} \
	.gful_cnt_itm {display:inline-block; width:245px; padding-right:15px; padding-bottom:5px;} \
	.gful_cnt_itm > * {vertical-align:middle;} \
	.gful_cnt_itm > .gful_cnt_itm_lnk {display:inline-block; width:200px; color:#777 !important; line-height:17px; padding:6px 5px; text-decoration:none; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;} \
	.gful_cnt_itm > .gful_cnt_itm_lnk:hover {background-color:#F1F1F1;} \
	.gful_cnt_itm_sw {border-radius:2px; cursor:alias; display:inline-block; margin-right:5px; height:29px; width:30px; background:#f9f9f9 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVR42mNgQAOZmZkCQNwAxO+B+D8U3weJMRACUM3nkTTuh2IYfz4hA/qhCkGGKCCJGyC5qAGfAe+hWACLnAHMO/gMwOtMmHcoMeA8TgOQAoooTDcD5gPxenINOI8WO2S5wAGIEyjxQgHUG2QboADEAeQa8B6aqRoGNBoJGgAAJZ5LaB5ImjQAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	.gful_cnt_itm_swa {background:#D14836 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVR42mNgQAP///8XAOIGIH7/HwHug8QYCAGo5vNIGvdDMQzMJ2RAP1QhyBAFJHEDJBc14DPgPRQLYJEzgHkHnwF4nQnzDiUGnMdpwH8SAd0MmA/E68k14Dxa7JDlAgcgTqDECwVQb5BtgAIQB5BrwHtopmoY0GgkaAAAoIJdr71PtqkAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	/* update box */ \
	#com-googlifix-updatebox {z-index:10000; background-color:#FFFFFF; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); padding:10px 20px; position:fixed; top:10px; right:100px; color:#dd4b39; font-size:14px; font-weight:bold; } \
");
	
// EVENTS
var creationCallback = null;
function init()
{
	if ($("hdtbMenus") && $("hdtbMenus").childNodes.length == 1 && $x("//div[@id='com-googlifix-uilanguage-header']").length == 0 && $x("//ul[@id='com-googlifix-uilanguage-menu']").length == 0)
	{
		if (creationCallback == null) // GM functions are not available in DOMSubtreeModified event, so setTimeout is a workaround
		{
			creationCallback = setTimeout(function()
			{
				if ($x("//div[@id='com-googlifix-uilanguage-header']").length == 0 && $x("//ul[@id='com-googlifix-uilanguage-menu']").length == 0) // double check (for Chrome), that something was not faster
				{
					// adds class to HTML element for compatibility reasons, so that other userscripts know about this userscript
					$ca(document.getElementsByTagName("html")[0], " com-googlifix-uilanguage");
					
					createMenuHeader();
					createMenuList();
					creationCallback = null;
				}
			}, 1);
		}
	}
	UpdateCheck();
}
window.addEventListener("load", init, false);
$("gsr").addEventListener("DOMSubtreeModified", init, false);

//################################ END INIT ################################//

// MENU-header
function createMenuHeader()
{
	var userDisplayType = GM_getValue("com.googlifix.uilanguage.display", 1);
	var domainHeader = $x("//div[@id='com-googlifix-domain-header']");
	var header = $c("div", { "class": "hdtb-mn-hd", "id": "com-googlifix-uilanguage-header" }, {
			"click": function()
			{
				var menu = $("com-googlifix-uilanguage-menu");
				$ct(menu, "gful_mnu_act");
				if (!$ch(document.getElementsByTagName("html")[0], "com-googlifix"))
				{
					menu.style.left = this.offsetLeft + "px";
					menu.style.top = "27px";
				}
			}
		},
		domainHeader.length == 0 ? $("hdtbMenus").childNodes[0] : null,
		domainHeader.length == 0 ? null : domainHeader[0]);
	
	$c("span", { "class": "mn-hd-txt", "innerHTML": GetLabel(GetUserLanguage(), userDisplayType) }, null, header);	
	$c("span", { "class": "mn-dwn-arw" }, null, header);
}
	
// MENU-list
function createMenuList()
{
	var domainHeader = $x("//div[@id='com-googlifix-domain-header']");
	var languageHeader = $x("//div[@id='com-googlifix-uilanguage-header']");
	var menu = $c("ul", { "class": "hdtbU hdtb-mn-c", "id": "com-googlifix-uilanguage-menu" }, null,
		domainHeader.length == 0 ? $("hdtbMenus").childNodes[0] : null,
		null,
		domainHeader.length == 0 ? null : languageHeader[0]);
	
	var userList = GM_getValue("com.googlifix.uilanguage.userlist", "en").split(",");
	for (var key in userList)
		menu.appendChild(createMenuListItem(userList[key], userList[key] == GetUserLanguage()));
	if ($x("//ul[@id='com-googlifix-uilanguage-menu']/li[@data-lang='" + GetUserLanguage() + "']").length == 0)
	{
		if (menu.childNodes.length == 0)
			menu.appendChild(createMenuListItem(GetUserLanguage(), true));
		else
			menu.insertBefore(createMenuListItem(GetUserLanguage(), true), menu.childNodes[0]);
	}
	menu.appendChild(createMenuListDialogItem());
}
	
// MENU-list.item
function createMenuListItem(lang, isSelected)
{	
	var item = $c("li");
	if (isSelected)
	{
		$u(item, {
			"class": "hdtbItm hdtbSel",
			"data-lang": lang,
			"innerHTML": GetLabel(lang, GM_getValue("com.googlifix.uilanguage.display", 1))
		});
	}
	else
	{
		$u(item, { "class": "hdtbItm", "data-lang": lang });
		$c("a", {
			"href": "javascript:;",
			"class": "q qs",
			"text": GetLabel(lang, GM_getValue("com.googlifix.uilanguage.display", 1)),
			"innerHTML": GetLabel(lang, GM_getValue("com.googlifix.uilanguage.display", 1))
		}, {
			"click": function()
			{
				document.location.href = window.location.protocol
					+ "//" + window.location.hostname
					+ window.location.pathname
					+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), this.parentNode.getAttribute("data-lang")))
					+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), this.parentNode.getAttribute("data-lang")));
			}
		}, item);
	}
	return item;
}

// MENU-list.dialog_item
function createMenuListDialogItem()
{
	var item = $c("li", { "class": "hdtbItm" });
	$c("div", { "class": "cdr_sep" }, null, item);
	$c("span", { "id": "com-googlifix-uilanguage-menu-item-dialog", "class": "q", "innerHTML": "More..." }, {
		"click": createDialog
	}, item);
	return item;
}

// DIALOG
function createDialog()
{
	var top_nav = $("top_nav");
	
	var wrap = $c("div", { "id": "com-googlifix-uilanguage-dialog" }, null, top_nav);
	$c("div", { "class": "gful_bg" }, {
		"click": function()
		{
			$r("com-googlifix-uilanguage-header");
			$r("com-googlifix-uilanguage-menu");
			createMenuHeader();
			createMenuList();
			$r("com-googlifix-uilanguage-dialog");
		}
	}, wrap);
	
	var dialog = $c("div", { "class": "gful_dlg" }, null, wrap);	
	$c("div", { "class": "gful_cls" }, {
		"click": function()
		{
			$r("com-googlifix-uilanguage-header");
			$r("com-googlifix-uilanguage-menu");
			createMenuHeader();
			createMenuList();
			$r("com-googlifix-uilanguage-dialog");
		}
	}, dialog);
	
	var options = $c("div", { "class": "gful_opt" }, null, dialog);
	createDialogOptions(options);
	
	var content = $c("div", { "id": "com-googlifix-uilanguage-dialog-content", "class": "gful_cnt" }, null, dialog);	
	createDialogList(content);
}

// DIALOG-list
function createDialogList(content)
{
	var userList = GM_getValue("com.googlifix.uilanguage.userlist", "en").split(",");
	var userDisplayType = GM_getValue("com.googlifix.uilanguage.display", 1);

	for (var key in GFUL_LANG_ISO_ARRAY)
	{
		var lang = GFUL_LANG_ISO_ARRAY[key];
		var label = GetLabel(lang, userDisplayType);
		
		var item = $c("div", {
			"class": "gful_cnt_itm",
			"data-lang": lang
		}, null, content);
		$c("span", {
			"class": "gful_cnt_itm_sw" + ($ac(userList, lang) ? " gful_cnt_itm_swa" : ""),
			"title": "Lock"
		}, {
			"click": function()
			{
				$ct(this, "gful_cnt_itm_swa");				
				var selectedItems = $x("//span[contains(@class, 'gful_cnt_itm_swa')]");
				var newUserList = [];
				for (var key in selectedItems)
					newUserList.push(selectedItems[key].parentNode.getAttribute("data-lang"));
				GM_setValue("com.googlifix.uilanguage.userlist", newUserList.join(","));
			}
		}, item);
		$c("a", {
			"href": "javascript:;",
			"class": "gful_cnt_itm_lnk",
			"text": label,
			"innerHTML": label,
			"title": label
		}, {
			"click": function()
			{
				document.location.href = window.location.protocol
					+ "//" + window.location.hostname
					+ window.location.pathname
					+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), this.parentNode.getAttribute("data-lang")))
					+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), this.parentNode.getAttribute("data-lang")));
			}
		}, item);
	}
}

// DIALOG-options
function createDialogOptions(options)
{
	var userDisplayType = GM_getValue("com.googlifix.uilanguage.display", 1);
	var itemDisplay = $c("div", null, null, options);
	$c("span", { "innerHTML": "Display:" }, null, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 1 ? "gful_opt_act" : ""),
		"text": "English",
		"innerHTML": "English",
		"title": "English name"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 1);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 2 ? "gful_opt_act" : ""),
		"text": "Native",
		"innerHTML": "Native",
		"title": "Native name"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 2);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 3 ? "gful_opt_act" : ""),
		"text": "English + Native",
		"innerHTML": "English + Native",
		"title": "English name + Native name"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 3);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 4 ? "gful_opt_act" : ""),
		"text": "English + ISO",
		"innerHTML": "English + ISO",
		"title": "English name + ISO"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 4);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 5 ? "gful_opt_act" : ""),
		"text": "Native + ISO",
		"innerHTML": "Native + ISO",
		"title": "Native name + ISO"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 5);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayType == 6 ? "gful_opt_act" : ""),
		"text": "English + Native + ISO",
		"innerHTML": "English + Native + ISO",
		"title": "English name + Native name + ISO"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.uilanguage.display", 6);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
}
function createDialogOptionsSave(obj)
{
	$r("com-googlifix-uilanguage-dialog-content");
	$cr(obj.parentNode.childNodes, "gful_opt_act");
	$ca(obj, "gful_opt_act");
	var content = $c("div", { "id": "com-googlifix-uilanguage-dialog-content", "class": "gful_cnt" }, null, $x1("//div[@id='com-googlifix-uilanguage-dialog']/div[@class='gful_dlg']"));	
	createDialogList(content);
}

// format lang label
function GetLabel(lang, displayType)
{
	var index = GFUL_LANG_ISO_ARRAY.indexOf(lang);
	if (index == -1 || index >= GFUL_LANG_ISO_ARRAY.length) index = 0;
	
	switch (displayType)
	{
		case 1: return GFUL_LANG_ENGLISH_ARRAY[index]; // English name
		case 2: return GFUL_LANG_NATIVE_ARRAY[index] == "" ? GFUL_LANG_ENGLISH_ARRAY[index] : GFUL_LANG_NATIVE_ARRAY[index]; // Native name
		case 3: return GFUL_LANG_ENGLISH_ARRAY[index] + (GFUL_LANG_NATIVE_ARRAY[index] == "" ? "" : " (" + GFUL_LANG_NATIVE_ARRAY[index] + ")"); // English name + Native name
		case 4: return GFUL_LANG_ENGLISH_ARRAY[index] + " [" + lang.toUpperCase() + "]"; // English name + ISO
		case 5: return (GFUL_LANG_NATIVE_ARRAY[index] == "" ? GFUL_LANG_ENGLISH_ARRAY[index] : GFUL_LANG_NATIVE_ARRAY[index]) + " [" + lang.toUpperCase() + "]"; // Native name + ISO
		case 6: return GFUL_LANG_ENGLISH_ARRAY[index] + (GFUL_LANG_NATIVE_ARRAY[index] == "" ? "" : " (" + GFUL_LANG_NATIVE_ARRAY[index] + ")") + " [" + lang.toUpperCase() + "]"; // English name + Native name + ISO
		default: return GFUL_LANG_ENGLISH_ARRAY[index]; // English name
	}
}
})();