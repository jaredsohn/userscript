// ==UserScript==
// @name        Googlifix (IMAGE SEARCH INFO)
// @author      om467
// @namespace   com.googlifix.imagesearchinfo
// @include     http://www.google.*/search*tbm=isch*
// @include     https://www.google.*/search*tbm=isch*
// @updateURL   https://userscripts.org/scripts/source/166887.meta.js
// @downloadURL https://userscripts.org/scripts/source/166887.user.js
// @version     5
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function ()
{

//########################### START OF CONSTANTS ###########################//

var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var SCRIPT_VERSION = 5;
var FLAG_A = 1; // Dimension
var FLAG_B = 2; // Domain
var FLAG_C = 4; // File name
var UPDATE_CHECK_INTERVAL = 604800; // week
var UPDATE_CHECK_DELAY = 5000;

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

// Update check for new script
function UpdateCheck()
{
	setTimeout(function()
	{
		var lastUpdateCheck = GM_getValue('com.googlifix.imagesearchinfo.lastcheck', 0);
		var now = Math.round(new Date().getTime() / 1000);
		
		if (now > (lastUpdateCheck + UPDATE_CHECK_INTERVAL))
		{
			GM_setValue('com.googlifix.imagesearchinfo.lastcheck', now);
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/166887.meta.js",
				onload: function(xhr)
				{
					var siteVersion = parseInt(xhr.responseText.match(/\/\/\s*@version\s*([\d]+).*/)[1]);
					if (siteVersion > SCRIPT_VERSION)
					{
						var box = document.createElement("div");
						box.id = "com-googlifix-updatebox";
						box.innerHTML = "New version of Googlifix IMAGE SEARCH INFO is available. <a href=\"http://userscripts.org/scripts/source/166887.user.js\" onclick=\"this.parentNode.style.display='none'\">Update now</a>.";
						document.querySelector("body").appendChild(box);
					}
				}
			});
		}
	}, UPDATE_CHECK_DELAY);
}

//######################### END OF HELPER FUNCTIONS ########################//

//################################## INIT ##################################//
	
// CSS styles
GM_addStyle(" \
	.rg_ilsm { display: initial !important; }\
	#com-googlifix-imagesearchinfo-menu li {padding-top:0px !important; padding-bottom:0px !important; padding-left:30px !important; } \
	#com-googlifix-imagesearchinfo-menu a {padding-left:0px !important; } \
	/* update box */ \
	#com-googlifix-updatebox {z-index:10000; background-color:#FFFFFF; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); padding:10px 20px; position:fixed; top:10px; right:100px; color:#dd4b39; font-size:14px; font-weight:bold; } \
");
	
// Variables
var requestLock = null;
var imagesCount = 0;

// Init
var creationCallback = null;
function init()
{	
	initMenu();

	var pageObserver = new MUTATION_OBSERVER(function(mutations, observer)
	{
		for (var i = 0; i < mutations.length; i++)
		{
			if ((mutations[i].target.id || "") == "rg_s" || (mutations[i].target.id || "") == "search")
			{
				checkImageList();
				return;
			}
		}
	});
	pageObserver.observe(document.querySelector("#search"), { attributes: false, childList: true, subtree: true });
	
	setTimeout(checkImageList, 1);

	// Adds class to HTML element for compatibility reasons, so that other userscripts know about this userscript
	document.querySelector("html").className += " com-googlifix.imagesearchinfo";
		
	UpdateCheck();
}
function initMenu()
{
	if ($("hdtbMenus") && $("hdtbMenus").childNodes.length == 1 && $x("//div[@id='com-googlifix-imagesearchinfo-header']").length == 0 && $x("//ul[@id='com-googlifix-imagesearchinfo-menu']").length == 0)
	{
		if (creationCallback == null) // GM functions are not available in DOMSubtreeModified event, so setTimeout is a workaround
		{
			creationCallback = setTimeout(function()
			{
				if ($x("//div[@id='com-googlifix-imagesearchinfo-header']").length == 0 && $x("//ul[@id='com-googlifix-imagesearchinfo-menu']").length == 0) // double check (for Chrome), that something was not faster
				{		
					createMenuHeader();
					createMenuList();
					creationCallback = null;
				}
			}, 1);
		}
	}
}

// Functions

// MENU-header
function createMenuHeader()
{
	var settingsHeader = $x("//div[@id='com-googlifix-imagesearchinfo-header']");
	var header = $c("div", { "class": "hdtb-mn-hd", "id": "com-googlifix-imagesearchinfo-header" }, {
			"click": function()
			{
				var menu = $("com-googlifix-imagesearchinfo-menu");
				$ct(menu, "gful_mnu_act");
				if (!$ch(document.getElementsByTagName("html")[0], "com-googlifix"))
				{
					menu.style.left = this.offsetLeft + "px";
					menu.style.top = "27px";
				}
			}
		},
		settingsHeader.length == 0 ? $("hdtbMenus").childNodes[0] : null,
		settingsHeader.length == 0 ? null : settingsHeader[0]);
	
	$c("span", { "class": "mn-hd-txt", "innerHTML": "Image info settings" }, null, header);	
	$c("span", { "class": "mn-dwn-arw" }, null, header);
}
	
// MENU-list
function createMenuList()
{
	var flags = GM_getValue("com.googlifix.imagesearchinfo.flags", FLAG_A | FLAG_B | FLAG_C);
	var menu = $c("ul", { "class": "hdtbU hdtb-mn-c", "id": "com-googlifix-imagesearchinfo-menu" }, null, $("hdtbMenus").childNodes[0]);
	menu.appendChild(createMenuListItem("Dimension", FLAG_A, flags & FLAG_A));
	menu.appendChild(createMenuListItem("Domain", FLAG_B, flags & FLAG_B));
	menu.appendChild(createMenuListItem("File name", FLAG_C, flags & FLAG_C));
}
	
// MENU-list.item
function createMenuListItem(label, flag, isSelected)
{	
	var item = $c("li", {
		"class": "hdtbItm " + (isSelected ? "hdtbSel" : ""),
		"data-flag": flag
	});
	
	$c("a", {
		"href": "",
		"class": "q qs",
		"text": label,
		"innerHTML": label
	}, {
		"click": function()
		{
			var flags = GM_getValue("com.googlifix.imagesearchinfo.flags", FLAG_A | FLAG_B | FLAG_C);
			GM_setValue("com.googlifix.imagesearchinfo.flags", flags ^ parseInt(this.parentNode.getAttribute("data-flag")));
		}
	}, item);
	
	return item;
}

function checkImageList()
{
	var images = document.querySelectorAll("div.rg_di");
	if (images.length != imagesCount)
	{
		processImageList();
		imagesCount == images.length;
	}
}

function processImageList()
{
	if (requestLock == null)
	{
		requestLock = new Object();
		
		var flags = GM_getValue("com.googlifix.imagesearchinfo.flags", FLAG_A | FLAG_B | FLAG_C);
		var images = document.querySelectorAll("div.rg_di");

		for (var requestIndex = 0; requestIndex < images.length; requestIndex++)
		{
			var image = images[requestIndex];
			var json = JSON.parse(image.querySelector("div.rg_meta").innerHTML);
			
			if (image.querySelector("div.rg_ilsm") == null)
			{
				var rg_ilsm = $c("div",
				{
					"class": "rg_ilm rg_ilsm",
					"style": "width: 100%; display: none;"
				}, null, image.querySelector("a.rg_l"));
				
				var rg_ilmbg = $c("div",
				{
					"class": "so_text rg_ilmbg",
					"style": (flags & (FLAG_A | FLAG_B | FLAG_C) ? "" : "opacity:0;")
				}, null, rg_ilsm);
				
				var rg_ilmn = $c("span",
				{
					"class": "son rg_ilmn"
				}, null, rg_ilmbg);
			
				rg_ilmn.innerHTML = 
					(flags & FLAG_A ? json.is : "") +
					(flags & FLAG_A && flags & FLAG_B ? " - " : "") +
					(flags & FLAG_B ? json.isu : "") +
					(flags & (FLAG_A | FLAG_B) && flags & FLAG_C ? "<br>" : "") +
					(flags & FLAG_C ? json.fn : "");
			}
			else
			{
				var imageText = 
					(flags & FLAG_A ? json.is : "") +
					(flags & FLAG_A && flags & FLAG_B ? " - " : "") +
					(flags & FLAG_B ? json.isu : "") +
					(flags & (FLAG_A | FLAG_B) && flags & FLAG_C ? "<br>" : "") +
					(flags & FLAG_C ? json.fn : "");
				
				var rg_ilmn = image.querySelector(".rg_ilmn");
				if (imageText.length != unescape(rg_ilmn.innerHTML).replace("×", "&#215;").length)
					rg_ilmn.innerHTML = imageText;
			}

			if (requestIndex == images.length - 1)
			{
				images = document.querySelectorAll("div.rg_di");
				if (requestIndex == images.length - 1)
					requestLock = null;
			}
		}
	}
}

window.addEventListener("load", init, false);
$("gsr").addEventListener("DOMSubtreeModified", initMenu, false);
})();