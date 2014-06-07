// ==UserScript==
// @name        Googlifix (Google DOMAIN changer)
// @author      om467
// @namespace   com.googlifix.domain
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
// @version     12
// @updateURL   https://userscripts.org/scripts/source/152839.meta.js
// @downloadURL https://userscripts.org/scripts/source/152839.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// ==/UserScript==

(function() {

//########################### START OF CONSTANTS ###########################//

var SCRIPT_VERSION = 12;
// Source: http://en.wikipedia.org/wiki/List_of_Google_domains
// Google TLD list
var GF_TLD_ARRAY = ['com','ac','ad','ae','am','as','at','az','ba','be','bf','bg',
'bi','bj','bs','by','ca','cat','cc','cd','cf','cg','ci','cl','cm','cn','co.ao','co.bw','co.ck','co.cr','co.id','co.il','co.in','co.jp','co.ke','co.kr','co.ls','co.ma','co.mz','co.nz',
'co.th','co.tz','co.ug','co.uk','co.uz','co.ve','co.vi','co.za','co.zm','co.zw','com.af','com.ag','com.ai','com.ar','com.au','com.bd','com.bh','com.bn','com.bo','com.br',
'com.bz','com.co','com.cu','com.cy','com.do','com.ec','com.eg','com.et','com.fj','com.gh','com.gi','com.gt','com.hk','com.jm','com.kh','com.kw','com.lb','com.lc','com.ly',
'com.mt','com.mx','com.my','com.na','com.nf','com.ng','com.ni','com.np','com.om','com.pa','com.pe','com.ph','com.pk','com.pr','com.py','com.qa','com.sa','com.sb','com.sg','com.sl',
'com.sv','com.tj','com.tr','com.tw','com.ua','com.uy','com.vc','com.vn','cv','cz','de','dj','dk','dm','dz','ee','es','fi','fm','fr','ga','ge','gg','gl','gm','gp',
'gr','gy','hn','hr','ht','hu','ch','ie','im','iq','is','it','je','jo','kg','ki','kz','la','li','lk','lt','lu','lv','md','me','mg','mk','ml','mn','ms','mu','mv','mw',
'ne','nl','no','nr','nu','pl','pn','ps','pt','ro','rs','ru','rw','sc','se','sh','si','sk','sm','sn','so','st','td','tg','tk','tl','tm','tn','to','tt','vg','vu','ws'];
// Equivalent Country list to GF_TLD_ARRAY
var GF_COUNTRY_ARRAY = ['Worldwide','Ascension Island','Andorra','United Arab Emirates','Armenia','American Samoa','Austria','Azerbaijan','Bosnia and Herzegovina','Belgium','Burkina Faso','Bulgaria','Burundi',
'Benin','Bahamas','Belarus','Canada','Catalan Countries','Cocos (Keeling) Islands','Democratic Republic of the Congo','Central African Republic','Republic of the Congo','Ivory Coast','Chile',
'Cameroon','China','Angola','Botswana','Cook Islands','Costa Rica','Indonesia','Israel','India','Japan','Kenya','South Korea','Lesotho','Morocco','Mozambique','New Zealand','Thailand','Tanzania',
'Uganda','United Kingdom','Uzbekistan','Venezuela','United States Virgin Islands','South Africa','Zambia','Zimbabwe','Afghanistan','Antigua and Barbuda','Anguilla','Argentina','Australia',
'Bangladesh','Bahrain','Brunei','Bolivia','Brazil','Belize','Colombia','Cuba','Cyprus','Dominican Republic','Ecuador','Egypt','Ethiopia','Fiji','Ghana','Gibraltar','Guatemala',
'Hong Kong','Jamaica','Cambodia','Kuwait','Lebanon','Saint Lucia','Libya','Malta','Mexico','Malaysia','Namibia','Norfolk Island','Nigeria','Nicaragua','Nepal','Oman','Panama',
'Peru','Philippines','Pakistan','Puerto Rico','Paraguay','Qatar','Saudi Arabia','Solomon Islands','Singapore','Sierra Leone','El Salvador','Tajikistan','Turkey','Taiwan','Ukraine',
'Uruguay','Saint Vincent and the Grenadines','Vietnam','Cape Verde','Czech Republic','Germany','Djibouti','Denmark','Dominica','Algeria','Estonia','Spain','Finland','Federated States of Micronesia',
'France','Gabon','Georgia','Guernsey','Greenland','Gambia','Guadeloupe','Greece','Guyana','Honduras','Croatia','Haiti','Hungary','Switzerland','Ireland','Isle of Man',
'Iraq','Iceland','Italy','Jersey','Jordan','Kyrgyzstan','Kiribati','Kazakhstan','Laos','Liechtenstein','Sri Lanka','Lithuania','Luxembourg','Latvia',
'Moldova','Montenegro','Madagascar','Macedonia','Mali','Mongolia','Montserrat','Mauritius','Maldives','Malawi','Niger','Netherlands','Norway','Nauru','Niue','Poland','Pitcairn Islands',
'Palestinian territories','Portugal','Romania','Serbia','Russia','Rwanda','Seychelles','Sweden','Saint Helena, Ascension and Tristan da Cunha','Slovenia','Slovakia','San Marino','Senegal','Somalia',
'Sao Tomé and Príncipe','Chad','Togo','Tokelau','Timor-Leste','Turkmenistan','Tunisia','Tonga','Trinidad and Tobago','British Virgin Islands','Vanuatu','Samoa'];
// Equivalent primary language to GF_TLD_ARRAY
var GF_TLD_LANG_ARRAY = ['en','en','ca','ar','hy','en','de','az','bs','nl','fr','bg',
'fr','fr','en','be','en','ca','en','fr','fr','fr','fr','es-419','fr','zh-CN','pt-PT','tn','en','es-419','id','ar','en','ja','sw','ko','st','fr','pt-PT','en',
'th','sw','lg','en','uz','es-419','en','af','en','en','fa','en','en','es-419','en','bn','ar','ms','es-419','pt-BR',
'es-419','es-419','es-419','en','es-419','es-419','ar','am','en','en','en','es-419','zh-TW','en','km','ar','ar','en','ar',
'mt','es-419','ms','en','en','en','es-419','ne','ar','es-419','es-419','tl','en','es-419','es-419','ar','ar','en','en','en',
'es-419','tg','tr','zh','uk','es-419','en','vi','pt-PT','cs','de','fr','da','en','fr','et','es','fi','en','fr','fr','ka','en','da','en','fr',
'el','en','es-419','hr','fr','hu','de','en','en','ckb','is','it','fr','ar','ky','en','kk','lo','de','en','lt','de','lv','mo','sr-ME','mg','mk','fr','mn','en','en','en','ny',
'fr','nl','no','en','nu','pl','en','ar','pt-PT','ro','sr','ru','en','crs','sv','en','sl','sk','it','fr','so','pt-PT','fr','fr','en','pt-PT','tk','ar','en','en','en','en','en'];

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
// Returns Google's TLD
function GetTLD()
{
	var pattern = new RegExp("^(?:www\.)?google\.([a-z.]+)$", "i");
	return window.location.hostname.match(pattern)[1].toLowerCase();
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
		var lastUpdateCheck = GM_getValue('com.googlifix.domain.lastcheck', 0);
		var now = Math.round(new Date().getTime() / 1000);
		
		if (now > (lastUpdateCheck + 604800))
		{
			GM_setValue('com.googlifix.domain.lastcheck', now);
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/152839.meta.js",
				onload: function(xhr)
				{
					var siteVersion = parseInt(xhr.responseText.match(/\/\/\s*@version\s*([\d]+).*/)[1]);
					if (siteVersion > SCRIPT_VERSION)
					{
						var box = document.createElement("div");
						box.id = "com-googlifix-updatebox";
						box.innerHTML = "New version of Googlifix DOMAIN changer is available. <a href=\"http://userscripts.org/scripts/source/152839.user.js\" onclick=\"this.parentNode.style.display='none'\">Update now</a>.";
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
	#com-googlifix-domain-menu-item-dialog {color:#777777; display:block; line-height:17px; padding:6px 44px 6px 30px; text-decoration:none; cursor:pointer;} \
	#com-googlifix-domain-menu-item-dialog:hover {background-color:#F1F1F1;} \
	#com-googlifix-domain-menu .hdtbSel, \
		#com-googlifix-domain-menu a {text-overflow:ellipsis; overflow:hidden;} \
	#hdtb .hdtbItm a.q {padding-right:44px !important;} \
	#hdtb .hdtbItm a.gfd_translate_icon {padding-right:28px !important;} \
	.gfd_mnu_act {display:block;} \
	.gfd_translate_icon {position:absolute !important; right:0px !important; color:#777 !important; line-height:17px; text-decoration:none; margin-top:-29px !important; padding:6px 28px 6px 6px !important; font-style:italic !important; background:white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQxODZDNjQzQkIzMTFFMjkyMEZENzM1MUYwQUYwQjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQxODZDNjUzQkIzMTFFMjkyMEZENzM1MUYwQUYwQjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDE4NkM2MjNCQjMxMUUyOTIwRkQ3MzUxRjBBRjBCNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDE4NkM2MzNCQjMxMUUyOTIwRkQ3MzUxRjBBRjBCNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi8ZHsQAAAFCSURBVHjalFLLbYNAFFwMJy4gIeCYdBCnA0pwByEdUEJuXOkguAOnA6cDSuAKXIwQEhK/zEQYbRDYzpOGt9r3Zt7usEoYhuIaruu+IfmAJ/5GAkRZlh0X+0Ljx7ZtA+k8DMNerAf3Y/QFFC+KorwWdpZlGSD+kgFxB+w5kzMLYCN4kCyLBLPAOI4BIP6JWUCDmim248K70x9FUbgmmf0HWWCLfALJr6qqXKl9yQIp8rNcBTGu6/rdcRxD1/XPaaIpnerEa+R5XtLEeGFSSjKcfuG673sfMAExgWufNfbQxHhhUMQxaIgWxCVM9mgrjyeZBDxxPzwKHNYqnPJIUIBvP50mJzAwmQQuknFbkWq4syLv0Icp84HFt9j8zbutYtM0R/qAkyRbRnZdt9duTWjb9hvpVd5TVfUJJ6NvPvLHjwADAOUcYK3owrJoAAAAAElFTkSuQmCC) no-repeat scroll 18px center;} \
	.gfd_bg {background-color:#FFFFFF; height:100%; left:0px; opacity:0.75; position:fixed; top:0px; width:100%; z-index:1000;} \
	.gfd_dlg {background-color:#FFFFFF; overflow:hidden; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); position:fixed; left:100px; top:50px; bottom:50px; right:100px; z-index:1001;} \
	.gfd_opt {position:fixed; left:120px; top:60px; right:160px;} \
	.gfd_opt > div {display:inline-block; margin-right:40px;} \
	.gfd_opt > div > span {margin-left:5px;} \
	.gfd_opt > div > a {display:inline-block; color:#777 !important; padding:3px 5px; text-decoration:none; margin-left:5px;} \
	.gfd_opt > div > a:hover {background-color:#F1F1F1;} \
	.gfd_opt > div > a.gfd_opt_act {border-bottom:solid 3px #D14836;} \
	.gfd_opt > div > a.gfd_opt_act:hover {background-color:transparent;} \
	.gfd_cls { cursor:pointer; height:20px; position:absolute; right:11px; top:10px; width:20px; background:transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAElBMVEX////39/e9vb2zs7PCwsLv7++5ffrDAAAAL0lEQVQI12MIEWBgdGVwVmQQMmEQMhJUVmRgVFYyEmBgEDJWZICSEBGILEQlWBcAq64Ft1WDk9gAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	.gfd_cnt {overflow-y:auto; position:fixed; left:120px; top:100px; bottom:70px; right:120px; z-index:1002;} \
	.gfd_cnt_itm {display:inline-block; width:150px; padding-right:15px; padding-bottom:5px; position:relative;} \
	.gfd_cnt_itm.gfd_cnt_itm_cntry {width:245px;} \
	.gfd_cnt_itm > * {vertical-align:middle;} \
	.gfd_cnt_itm > .gfd_cnt_itm_lnk {display:inline-block; width:105px; color:#777 !important; line-height:17px; padding:6px 5px; text-decoration:none; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;} \
	.gfd_cnt_itm.gfd_cnt_itm_cntry > .gfd_cnt_itm_lnk {width:200px;} \
	.gfd_cnt_itm.gfd_cnt_itm_rdrct_icn {width:220px;} \
	.gfd_cnt_itm.gfd_cnt_itm_cntry.gfd_cnt_itm_rdrct_icn {width:305px;} \
	.gfd_cnt_itm.gfd_cnt_itm_rdrct_icn a.gfd_translate_icon {position:static !important; right:auto !important;} \
	.gfd_cnt_itm > .gfd_cnt_itm_lnk:hover, \
		.gfd_cnt_itm > .gfd_translate_icon:hover{background-color:#F1F1F1;} \
	.gfd_cnt_itm_sw {border-radius:2px; cursor:alias; display:inline-block; margin-right:5px; height:29px; width:30px; background:#f9f9f9 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVR42mNgQAOZmZkCQNwAxO+B+D8U3weJMRACUM3nkTTuh2IYfz4hA/qhCkGGKCCJGyC5qAGfAe+hWACLnAHMO/gMwOtMmHcoMeA8TgOQAoooTDcD5gPxenINOI8WO2S5wAGIEyjxQgHUG2QboADEAeQa8B6aqRoGNBoJGgAAJZ5LaB5ImjQAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	.gfd_cnt_itm_swa {background:#D14836 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVR42mNgQAP///8XAOIGIH7/HwHug8QYCAGo5vNIGvdDMQzMJ2RAP1QhyBAFJHEDJBc14DPgPRQLYJEzgHkHnwF4nQnzDiUGnMdpwH8SAd0MmA/E68k14Dxa7JDlAgcgTqDECwVQb5BtgAIQB5BrwHtopmoY0GgkaAAAoIJdr71PtqkAAAAASUVORK5CYII=') no-repeat scroll center center;} \
	/* update box */ \
	#com-googlifix-updatebox {z-index:10000; background-color:#FFFFFF; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); padding:10px 20px; position:fixed; top:10px; right:100px; color:#dd4b39; font-size:14px; font-weight:bold; } \
");
	
// EVENTS
var creationCallback = null;
function init()
{
	if ($("hdtbMenus") && $("hdtbMenus").childNodes.length == 1 && $x("//div[@id='com-googlifix-domain-header']").length == 0 && $x("//ul[@id='com-googlifix-domain-menu']").length == 0)
	{
		if (creationCallback == null) // GM functions are not available in DOMSubtreeModified event, so setTimeout is a workaround
		{
			creationCallback = setTimeout(function()
			{
				if ($x("//div[@id='com-googlifix-domain-header']").length == 0 && $x("//ul[@id='com-googlifix-domain-menu']").length == 0) // double check (for Chrome), that something was not faster
				{
					// adds class to HTML element for compatibility reasons, so that other userscripts know about this userscript
					$ca(document.getElementsByTagName("html")[0], " com-googlifix-domain");
					
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
	var userDisplayTLD = GM_getValue("com.googlifix.domain.displaytld", true);
	var header = $c("div", { "class": "hdtb-mn-hd", "id": "com-googlifix-domain-header" }, {
		"click": function()
		{
			var menu = $("com-googlifix-domain-menu");
			$ct(menu, "gfd_mnu_act");
			if (!$ch(document.getElementsByTagName("html")[0], "com-googlifix"))
			{
				menu.style.left = this.offsetLeft + "px";
				menu.style.top = "27px";
			}
		}
	}, $("hdtbMenus").childNodes[0]);	
	$c("span", { "class": "mn-hd-txt", "innerHTML": (userDisplayTLD ? "google." + GetTLD().toUpperCase() : GF_COUNTRY_ARRAY[GF_TLD_ARRAY.indexOf(GetTLD())]) }, null, header);	
	$c("span", { "class": "mn-dwn-arw" }, null, header);
}
	
// MENU-list
function createMenuList()
{
	var userList = GM_getValue("com.googlifix.domain.userlist", "com").split(",");
	var userRedirect = GM_getValue("com.googlifix.domain.redirect", 1);
	
	var menu = $c("ul", { "class": "hdtbU hdtb-mn-c", "id": "com-googlifix-domain-menu" }, null, $("hdtbMenus").childNodes[0]);	
	
	for (var key in userList)
		menu.appendChild(createMenuListItem(userList[key], userList[key] == GetTLD(), userRedirect));
	if ($x("//ul[@id='com-googlifix-domain-menu']/li[@data-tld='" + GetTLD() + "']").length == 0)
	{
		if (menu.childNodes.length == 0)
			menu.appendChild(createMenuListItem(GetTLD(), true, userRedirect));
		else
			menu.insertBefore(createMenuListItem(GetTLD(), true, userRedirect), menu.childNodes[0]);
	}
	
	menu.appendChild(createMenuListDialogItem());
}
	
// MENU-list.item
function createMenuListItem(tld, isSelected, redirectType)
{	
	var item = $c("li");
	if (isSelected)
	{
		$u(item, {
			"class": "hdtbItm hdtbSel",
			"data-tld": tld,
			"innerHTML": (GM_getValue("com.googlifix.domain.displaytld", true) ? "google." + tld.toUpperCase() : GF_COUNTRY_ARRAY[GF_TLD_ARRAY.indexOf(tld)])
		});
	}
	else
	{
		$u(item, { "class": "hdtbItm", "data-tld": tld, "data-redirect": redirectType });
		$c("a", {
			"href": "javascript:;",
			"class": "q qs",
			"text": (GM_getValue("com.googlifix.domain.displaytld", true) ? "google." + tld.toUpperCase() : GF_COUNTRY_ARRAY[GF_TLD_ARRAY.indexOf(tld)]),
			"innerHTML": (GM_getValue("com.googlifix.domain.displaytld", true) ? "google." + tld.toUpperCase() : GF_COUNTRY_ARRAY[GF_TLD_ARRAY.indexOf(tld)]),
			"title": "Go to " + (GM_getValue("com.googlifix.domain.displaytld", true) ? "google." + tld.toUpperCase() : GF_COUNTRY_ARRAY[GF_TLD_ARRAY.indexOf(tld)]) + (redirectType == 2 ? " + interface language [" + GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(tld)].toUpperCase() + "]" : "")
		}, {
			"click": function()
			{
				var redirectLanguage = this.parentNode.getAttribute("data-redirect") == 2 ? GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(this.parentNode.getAttribute("data-tld"))] : GetUserLanguage();
				document.location.href = window.location.protocol + "//www.google." + this.parentNode.getAttribute("data-tld")
					+ window.location.pathname
					+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), redirectLanguage))
					+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), redirectLanguage));
			}
		}, item);
		if (redirectType == 3)
		{
			$c("a", {
				"href": "javascript:;",
				"class": "gfd_translate_icon",
				"text": "+",
				"innerHTML": "+",
				"title": "Change domain + interface language [" + GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(tld)].toUpperCase() + "]"
			}, {
				"click": function()
				{
					var redirectLanguage = GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(this.parentNode.getAttribute("data-tld"))];
					document.location.href = window.location.protocol + "//www.google." + this.parentNode.getAttribute("data-tld")
						+ window.location.pathname
						+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), redirectLanguage))
						+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), redirectLanguage));
				}
			}, item);
		}
	}
	return item;
}

// MENU-list.dialog_item
function createMenuListDialogItem()
{
	var item = $c("li", { "class": "hdtbItm" });
	$c("div", { "class": "cdr_sep" }, null, item);
	$c("span", { "id": "com-googlifix-domain-menu-item-dialog", "class": "q", "innerHTML": "More..." }, {
		"click": createDialog
	}, item);
	return item;
}

// DIALOG
function createDialog()
{
	var top_nav = $("top_nav");
	
	var wrap = $c("div", { "id": "com-googlifix-domain-dialog" }, null, top_nav);
	$c("div", { "class": "gfd_bg" }, {
		"click": function()
		{
			$r("com-googlifix-domain-header");
			$r("com-googlifix-domain-menu");
			createMenuHeader();
			createMenuList();
			$r("com-googlifix-domain-dialog");
		}
	}, wrap);
	
	var dialog = $c("div", { "class": "gfd_dlg" }, null, wrap);	
	$c("div", { "class": "gfd_cls" }, {
		"click": function()
		{
			$r("com-googlifix-domain-header");
			$r("com-googlifix-domain-menu");
			createMenuHeader();
			createMenuList();
			$r("com-googlifix-domain-dialog");
		}
	}, dialog);
	
	var options = $c("div", { "class": "gfd_opt" }, null, dialog);
	createDialogOptions(options);
	
	var content = $c("div", { "id": "com-googlifix-domain-dialog-content", "class": "gfd_cnt" }, null, dialog);	
	createDialogList(content);
}

// DIALOG-list
function createDialogList(content)
{
	var userList = GM_getValue("com.googlifix.domain.userlist", "com").split(",");
	var userDisplayTLD = GM_getValue("com.googlifix.domain.displaytld", true);
	var userRedirect = GM_getValue("com.googlifix.domain.redirect", 1);
	var listArray;
	if (!userDisplayTLD)
	{
		listArray = GF_COUNTRY_ARRAY.slice();
		listArray.splice(0, 1);
		listArray.sort();
		listArray.unshift("Worldwide");
	}
	else
		listArray = GF_TLD_ARRAY;

	for (var key in listArray)
	{
		var tld = userDisplayTLD ? GF_TLD_ARRAY[key] : GF_TLD_ARRAY[GF_COUNTRY_ARRAY.indexOf(listArray[key])];
		var country = userDisplayTLD ? GF_COUNTRY_ARRAY[key] : listArray[key];
		
		var item = $c("div", {
			"class": "gfd_cnt_itm" + (userDisplayTLD ? " gfd_cnt_itm_tld" : " gfd_cnt_itm_cntry") + (userRedirect == 3 ? " gfd_cnt_itm_rdrct_icn" : ""),
			"data-tld": tld,
			"data-redirect": userRedirect
		}, null, content);		
		$c("span", {
			"class": "gfd_cnt_itm_sw" + ($ac(userList, tld) ? " gfd_cnt_itm_swa" : ""),
			"title": "Lock"
		}, {
			"click": function()
			{
				$ct(this, "gfd_cnt_itm_swa");				
				var selectedItems = $x("//span[contains(@class, 'gfd_cnt_itm_swa')]");
				var newUserList = [];
				for (var key in selectedItems)
					newUserList.push(selectedItems[key].parentNode.getAttribute("data-tld"));
				GM_setValue("com.googlifix.domain.userlist", newUserList.join(","));
			}
		}, item);
		$c("a", {
			"href": "javascript:;",
			"class": "gfd_cnt_itm_lnk",
			"text": (userDisplayTLD ? "google." + tld.toUpperCase() : country),
			"innerHTML": (userDisplayTLD ? "google." + tld.toUpperCase() : country),
			"title": (userDisplayTLD ? "Go to google." + tld.toUpperCase() : "Go to Google " + country) + (userRedirect == 2 ? " + interface language [" + GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(tld)].toUpperCase() + "]" : "")
		}, {
			"click": function()
			{
				var redirectLanguage = this.parentNode.getAttribute("data-redirect") == 2 ? GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(this.parentNode.getAttribute("data-tld"))] : GetUserLanguage();
				document.location.href = window.location.protocol + "//www.google." + this.parentNode.getAttribute("data-tld")
					+ window.location.pathname
					+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), redirectLanguage))
					+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), redirectLanguage));
			}
		}, item);
		if (userRedirect == 3)
		{
			$c("a", {
				"href": "javascript:;",
				"class": "gfd_translate_icon",
				"text": "+",
				"innerHTML": "+",
				"title": "Change domain + interface language [" + GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(tld)].toUpperCase() + "]"
			}, {
				"click": function()
				{
					var redirectLanguage = GF_TLD_LANG_ARRAY[GF_TLD_ARRAY.indexOf(this.parentNode.getAttribute("data-tld"))];
					document.location.href = window.location.protocol + "//www.google." + this.parentNode.getAttribute("data-tld")
						+ window.location.pathname
						+ (window.location.search == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.search), redirectLanguage))
						+ (window.location.hash == "" ? "" : AddGoogleLanguage(RemoveGoogleLanguage(window.location.hash), redirectLanguage));
				}
			}, item);
		}
	}
}

// DIALOG-options
function createDialogOptions(options)
{
	var userDisplayTLD = GM_getValue("com.googlifix.domain.displaytld", true);
	var userRedirect = GM_getValue("com.googlifix.domain.redirect", 1);
	
	// Display TLD
	var itemDisplay = $c("div", null, null, options);
	$c("span", { "innerHTML": "Display:" }, null, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (userDisplayTLD ? "gfd_opt_act" : ""),
		"text": "TLD",
		"innerHTML": "TLD",
		"title": "Display TLD"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.domain.displaytld", true);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	$c("a", {
		"href": "javascript:;",
		"class": (!userDisplayTLD ? "gfd_opt_act" : ""),
		"text": "Country",
		"innerHTML": "Country",
		"title": "Display country"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.domain.displaytld", false);
			createDialogOptionsSave(this);
		}
	}, itemDisplay);
	
	// Redirect
	var itemRedirect = $c("div", null, null, options);
	$c("span", { "innerHTML": "Redirection:" }, null, itemRedirect);
	$c("a", {
		"href": "javascript:;",
		"class": (userRedirect == 1 ? "gfd_opt_act" : ""),
		"text": "TLD",
		"innerHTML": "TLD",
		"title": "Change TLD + Keep interface language"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.domain.redirect", 1);
			createDialogOptionsSave(this);
		}
	}, itemRedirect);
	$c("a", {
		"href": "javascript:;",
		"class": (userRedirect == 2 ? "gfd_opt_act" : ""),
		"text": "TLD + Language",
		"innerHTML": "TLD + Language",
		"title": "Change TLD + Change interface language to TLD's primary language"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.domain.redirect", 2);
			createDialogOptionsSave(this);
		}
	}, itemRedirect);
	$c("a", {
		"href": "javascript:;",
		"class": (userRedirect == 3 ? "gfd_opt_act" : ""),
		"text": "Allow both options",
		"innerHTML": "Allow both options",
		"title": "Standard link changes TLD and keeps interface language + Enables icon which changes TLD and interface language"
	}, {
		"click": function()
		{
			GM_setValue("com.googlifix.domain.redirect", 3);
			createDialogOptionsSave(this);
		}
	}, itemRedirect);
}
function createDialogOptionsSave(obj)
{
	$r("com-googlifix-domain-dialog-content");
	$cr(obj.parentNode.childNodes, "gfd_opt_act");
	$ca(obj, "gfd_opt_act");			
	var content = $c("div", { "id": "com-googlifix-domain-dialog-content", "class": "gfd_cnt" }, null, $x1("//div[@id='com-googlifix-domain-dialog']/div[@class='gfd_dlg']"));	
	createDialogList(content);
}
})();