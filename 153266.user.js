// ==UserScript==
// @name        Googlifix (IMAGE EXACT SIZE filter)
// @author      om467
// @namespace   com.googlifix.imageexactsize
// @include     http://www.google.*/*tbm=isch*
// @include     https://www.google.*/*tbm=isch*
// @include     http://google.*/*tbm=isch*
// @include     https://google.*/*tbm=isch*
// @version     7
// @updateURL   https://userscripts.org/scripts/source/153266.meta.js
// @downloadURL https://userscripts.org/scripts/source/153266.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function ()
{

//########################### START OF CONSTANTS ###########################//

var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var SCRIPT_VERSION = 7;
	
//############################ END OF CONSTANTS ############################//
	
	
//######################## START OF HELPER FUNCTIONS #######################//

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
// Shortcut to removeChild
function $r(targetNode) {
	var node = (typeof targetNode === "string") ? $(targetNode) : targetNode;
	if ((node) && (node.parentNode))
		return node.parentNode.removeChild(node);
	return null;
}

// Update check for new script
function UpdateCheck()
{
	setTimeout(function()
	{
		var lastUpdateCheck = GM_getValue('com.googlifix.imageexactsize.lastcheck', 0);
		var now = Math.round(new Date().getTime() / 1000);
		
		if (now > (lastUpdateCheck + 604800))
		{
			GM_setValue('com.googlifix.imageexactsize.lastcheck', now);
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/153266.meta.js",
				onload: function(xhr)
				{
					var siteVersion = parseInt(xhr.responseText.match(/\/\/\s*@version\s*([\d]+).*/)[1]);
					if (siteVersion > SCRIPT_VERSION)
					{
						var box = document.createElement("div");
						box.id = "com-googlifix-updatebox";
						box.innerHTML = "New version of Googlifix IMAGE EXACT SIZE filter is available. <a href=\"http://userscripts.org/scripts/source/153266.user.js\" onclick=\"this.parentNode.style.display='none'\">Update now</a>.";
						document.querySelector("body").appendChild(box);
					}
				}
			});
		}
	}, 2000);
}

//######################### END OF HELPER FUNCTIONS ########################//


//################################## INIT ##################################//

if (document.location.search.indexOf("tbm=isch") != -1 || document.location.hash.indexOf("tbm=isch") != -1)
{
	// CSS styles
	GM_addStyle(" \
		#isz_ex {padding:0px !important;} \
		#isz_ex:hover {background-color:transparent !important;} \
		#isz_ex .exylnk, \
			#isz_ex div.exybg, \
			#isz_ex div.exyttl, \
			#isz_ex div.exycls, \
			#isz_ex div.exyhlt {display:none !important;} \
		#isz_ex div.exycont {display:block !important;} \
		#isz_ex div.exydlg {position:relative !important; height:105px !important; background-color:transparent !important; border:0px !important; box-shadow:none !important; left:0px !important; margin-left:0px !important; outline:0px !important; top:0px !important;} \
		#isz_ex label {color:#777 !important;} \
		#isz_ex label.exywl {top:4px !important; left:30px !important;} \
		#isz_ex label.exywpx {top:4px !important;} \
		#isz_ex input.exyw {top:3px !important;} \
		#isz_ex label.exyhl {top:40px !important; left:30px !important;} \
		#isz_ex label.exyhpx {top:40px !important;} \
		#isz_ex input.exyh {top:39px !important;} \
		#isz_ex label.exypx {left:180px !important;} \
		#isz_ex div.exydlg {width:205px;} \
		@media screen and (min-width: 1400px){ \
			#isz_ex label.exypx {left:210px !important;} \
			#isz_ex div.exydlg {width:275px;} \
		} \
		#exygo {top:75px !important; left:90px !important;} \
		\
		#isz_ex.gfiesFallback input {height:17px !important; width:112px !important; font-size:11px !important; line-height:17px !important; padding:5px !important; left:86px !important;} \
		#isz_ex.gfiesFallback button {height:17px !important; line-height:17px !important; left:111px !important; padding:3px 15px !important;} \
		#isz_ex.gfiesFallback div.exyfrm > * {position:absolute !important;} \
		#isz_ex.gfiesFallback #exygo {left:85px !important;} \
		#isz_ex.gfiesFallback label.exywl {top:9px !important; left:30px !important;} \
		#isz_ex.gfiesFallback label.exywpx {top:9px !important; left:220px !important;} \
		#isz_ex.gfiesFallback label.exyhl {top:47px !important; left:30px !important;} \
		#isz_ex.gfiesFallback label.exyhpx {top:47px !important; left:220px !important;} \
		/* update box */ \
		#com-googlifix-updatebox {z-index:10000; background-color:#FFFFFF; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); padding:10px 20px; position:fixed; top:10px; right:100px; color:#dd4b39; font-size:14px; font-weight:bold; } \
	");
	
	var menuObserver = new MUTATION_OBSERVER(function(mutations)
	{
		if (!document.querySelector("#isz_ex > div.cdr_sep"))
			createFilter();
	});
	menuObserver.observe(document, { childList: true, subtree: true });

	// Adds class to HTML element for compatibility reasons, so that other userscripts know about this userscript
	document.querySelector("html").className += " com-googlifix-imageexactsize";
}
UpdateCheck();

//################################ END INIT ################################//
	
function createFilter()
{	
	if (document.querySelector("#isz_ex"))
	{
		// separator
		$c("div", { "class": "cdr_sep" }, null, null, document.querySelector("#isz_ex div.exycont"));
	}
	else // fallback
	{
		var isExactSize = document.location.hash != "" && document.location.hash.indexOf("iszw:") != -1 || document.location.hash == "" && document.location.search.indexOf("iszw:") != -1;
		$c("li", {
			"id": "isz_ex",
			"class": "hdtbItm gfiesFallback" + (isExactSize ? " hdtbSel" : ""),
			"innerHTML": '<div class="cdr_sep"></div><div class="exycont"><div class="exydlg"><div class="exyfrm"><label class="exymml exywl" for="exyw">Width:</label><label class="exymml exyhl" for="exyh">Height:</label><label class="exypx exywpx" for="exyw">px</label><label class="exypx exyhpx" for="exyh">px</label><input class="ktf mini exymm exyw" value="" autocomplete="off" type="text"><input class="ktf mini exymm exyh" value="" autocomplete="off" type="text"><button class="ksb mini" id="exygo">Go</button></div><div class="exycls"></div></div></div>'
		}, null, null, null, document.querySelector("#isz_lt"));
		if (isExactSize)
		{
			var iszw = document.querySelector("#isz_ex input.exyw");
			var iszh = document.querySelector("#isz_ex input.exyh");
			document.querySelector("#isz_").className = document.querySelector("#isz_").className.replace("hdtbSel", "");
			document.querySelector("#isz_").innerHTML = '<a href="' + removeSize(document.querySelector("#isz_l > a").getAttribute("href")).replace("&tbs=", "") + '" class="q qs">' + document.querySelector("#isz_").innerHTML + '</a>';
			if (document.location.hash != "" && document.location.hash.indexOf("iszw:") != -1)
			{
				iszw.value = document.location.hash.match(/iszw:([\d]+)/i)[1];
				iszh.value = document.location.hash.match(/iszh:([\d]+)/i)[1];
			}
			else if (document.location.hash == "" && document.location.search.indexOf("iszw:") != -1)
			{
				iszw.value = document.location.search.match(/iszw:([\d]+)/i)[1];
				iszh.value = document.location.search.match(/iszh:([\d]+)/i)[1];
			}
		}
	}
		
	// assign click event to button
	var searchButton = document.querySelector("#exygo");
	searchButton.addEventListener("click", redirect);
	
	// assign keyup event
	var inputs = document.querySelectorAll("#isz_ex input.exyw, #isz_ex input.exyh");
	for (var i = 0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("keyup", function(e)
		{
			if ((e.keyCode || e.which || e.charCode || 0) === 13)
				redirect();
		});
	}
}

function redirect()
{
	var iszw = document.querySelector("#isz_ex input.exyw");
	var iszh = document.querySelector("#isz_ex input.exyh");

	document.location.href = window.location.protocol
		+ "//"
		+ window.location.hostname
		+ window.location.pathname
		+ (window.location.search == "" ? "" : addSize(removeSize(window.location.search), iszw.value != "" ? parseInt(iszw.value) : 0, iszh.value != "" ? parseInt(iszh.value) : 0))
		+ (window.location.hash == "" ? "" : addSize(removeSize(window.location.hash), iszw.value != "" ? parseInt(iszw.value) : 0, iszh.value != "" ? parseInt(iszh.value) : 0));
}

function removeSize(query)
{
	if (query.indexOf("tbs=") != -1)
		return query.replace(/(,)?(iszw|iszh|isz):([\d]+|ex|l|m|i|lt)/g, "");
	else
		return query;
}

function addSize(query, width, height)
{
	if (query.indexOf("tbs=") != -1)
		return query.replace("tbs=", "tbs=isz:ex,iszw:" + width + ",iszh:" + height);
	else
		return query + "&tbs=isz:ex,iszw:" + width + ",iszh:" + height;
}
	
})();