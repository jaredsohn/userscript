// ==UserScript==
// @name     		STS Helper
// @namespace		iFantz7E.StsHelper
// @version			0.6
// @description		In Steam Translation Server, add many features to make translate easier.
// @match      		http://translation.steampowered.com/*
// @match      		https://translation.steampowered.com/*
// @icon      		http://translation.steampowered.com/public/favicon.ico
// @updateURL   	http://userscripts.org:8080/scripts/source/325610.meta.js
// @downloadURL		http://userscripts.org:8080/scripts/source/325610.user.js
// @grant       	GM_addStyle
// @copyright		2014, 7-elephant
// ==/UserScript==

function attachOnLoad(callback)
{
	window.addEventListener("load", function (e) {
		callback();
	});
}

function attachOnReady(callback) {
	document.addEventListener("DOMContentLoaded", function (e) {
		callback();
	});
}

function main() {

	var url = document.documentURI; console.log(url);

	GM_addStyle(
		"#logout { position: fixed; z-index: 1001; right: 12px; top: 12px; } "
		+ "#suggestionmain > div:nth-child(4) > form:nth-child(2) > div:nth-child(1) "
		+ "{ text-align: left; } "
		+ "form.lbAction:nth-child(2) > div:nth-child(2) > input:nth-child(1) "
		+ "{ width: 97%; height: 30px; margin-top: 5px; } "
		+ "form.lbAction:nth-child(1) > div:nth-child(2) > input:nth-child(1) "
		+ "{ width: 90%; margin-top: 5px; } "
		+ ".progress td { vertical-align: top; } "
		+ "div#suggestions_nav { z-index: 3; position: absolute; right: 6px; top: 4px; text-align: right; line-height: 26px; } "
		+ ".btnHelper { width: 90px; } "
		+ ".btnHelperLong { width: 130px; } "
		+ ".user_suggestion { color: #A4B23C;} "
	);
	
	// Clean links
	{
		var pattT1 = /\?t=[0-9]{6,}&/g;
		var pattT2 = /\&t=[0-9]{6,}&/g;
		
		var as = document.querySelectorAll("a");
		for (var i = 0; i < as.length; i++)
		{
			var href = as[i].href;
			if (pattT1.test(href))
			{
				as[i].href = href.replace(pattT1,"?");
			}
			else if (pattT2.test(href))
			{
				as[i].href = href.replace(pattT2,"&");
			}
		}
	}	

	var eleLogout = document.querySelector("#logout");
	if (eleLogout != null)
	{
		eleLogout.innerHTML = ' <input value="My Profile" type="button" onclick="window.open(\'/user_activity.php\',\'_blank\'); return false;" /> '
			+ ' <input name="login_button" value="Logout?" type="submit" onclick="return confirm(\'Logout?\');" /> ';
	}

	if (url.indexOf("Us_And_Them.php") > -1)
	{
		var container = "\"";
		var tdEng = document.querySelector("#leftAreaContainer > table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)");
		if (tdEng != null)
		{
			tdEng.innerHTML = container + tdEng.innerHTML + container;
		}
	} // End Us_And_Them.php

	if (url.indexOf("suggestions.php") > -1)
	{
		var ele = document.querySelector("#suggestionmain > div:nth-child(4) > form:nth-child(2) > div:nth-child(1) > textarea:nth-child(1)");
		if (ele != null)
		{
			ele.style.width = "960px";
			ele.style.height = "64px";
			ele.style.marginLeft = "3px";
		}
		
		var input = document.querySelector("form.lbAction:nth-child(2) > div:nth-child(2) > input:nth-child(2)");
		if	(input == null)
		{
			input = document.querySelector("form.lbAction:nth-child(2) > div:nth-child(3) > input:nth-child(2)");
		}
		if (input != null)
		{
			input.value += " (Ctrl+Enter)"; 
		}
		
		var form = document.querySelector("form.lbAction:nth-child(2)");
		if (form != null)
		{
			form.addEventListener("keydown", function (e) {
				if (e.ctrlKey && e.keyCode == 13) {
					if (input != null)
					{
						input.click();
						return false;
					}
				}
			});
		}
		
		var inputClose = document.querySelector("#suggestions_nav > input:nth-child(3)");
		if (inputClose != null)
		{
			inputClose.value = "Close (Esc)"; 
		}
		
		var td = document.querySelector(".progress > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)");
		if (td != null && td.textContent.trim() == "")
		{
			td.innerHTML = ' <input value="Move Suggestion Box Here" type="button" onclick="moveSuggestionBox(); return false;" /> ';
		}
		
		var textarea = document.querySelector("form.lbAction > div:nth-child(1) > textarea:nth-child(1)");
		if (textarea != null)
		{
			textarea.focus();
			textarea.style.height = textarea.scrollHeight + "px";
		}
		
		var br = document.querySelector("form.lbAction:nth-child(2) > div:nth-child(2) > br:nth-child(1)");
		if (br != null)
		{
			br.parentElement.removeChild(br);
		}
		
		var divNav = document.querySelector("div#suggestions_nav");
		if (divNav != null)
		{
			var key = "";
			var keyGroup = "";
			var text = "";
			var insert = "";
			var spliter = "_";
			var regApp = /[0-9]{2,}/;
			
			var aKey = document.querySelector(".smallcopy > font:nth-child(2) > a:nth-child(1)");
			if (aKey != null)
			{
				insert += ' <br/> &nbsp; ';
				key = encodeURIComponent(aKey.textContent.trim());
				
				if (key == "token-key")
				{
					aKey = document.querySelector(".smallcopy > a:nth-child(3)");
					if (aKey != null)
					{
						key = encodeURIComponent(aKey.textContent.trim());
					}
				}
				
				if (key != "")
				{
					if (key.split(spliter).length > 1)
					{
						var lastSpliter = key.lastIndexOf(spliter);
						keyGroup = key.substring(0, lastSpliter);
						insert += ' <input value="Search by Group" type="button" onclick="window.open(\'/translate.php?search_input=' 
							+ keyGroup + '\',\'_blank\'); return false;"> ';
					}
					insert += ' <input value="Search by Key" type="button" onclick="window.open(\'/translate.php?search_input=' 
						+ key + '\',\'_blank\'); return false;"> ';
				}
			}
			
			var tdText = document.querySelector(".progress > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(1)");
			if (tdText != null)
			{
				text = encodeURIComponent(tdText.textContent.trim()).replace(/%20/g,"+").replace(/'/g,"\\'");
				if (text != "")
				{
					insert += ' <br/> &nbsp; <input value="Search by String" type="button" onclick="window.open(\'/translate.php?search_input=' 
						+ text + '\',\'_blank\'); return false;"> ';
				}
			}
			
			var app = regApp.exec(key.replace("%23",""));
			if (key.indexOf("faq") < 0 && app != null)
			{
				insert += ' <br/> &nbsp; <input value="View App" type="button" onclick="window.open(\'http://steamdb.info/app/' 
					+ app + '\',\'_blank\'); return false;"> ';
			}
			
			divNav.innerHTML = divNav.innerHTML
				.replace('<input value="Previous','&nbsp;&nbsp;<input value="Previous')
				.replace('<input value="Close','&nbsp;&nbsp;<input value="Close')
				+ insert;
		}
		
		var divSgts = document.querySelectorAll("body > div > div.suggestions_list");
		if (divSgts.length > 0)
		{
			var noResult = "No results";
			var br = "<br>";
			var brSpace = " <br> ";
			var tag = "<";
			var colon = ":";
			var comma = ",";
			var isEdit = false;
			
			var p = divSgts[divSgts.length - 1].nextSibling;
			var glossaries = p.innerHTML.split(br);
			for (var i = 0; i < glossaries.length; i++)
			{
				var glossary = glossaries[i].trim();
				if (glossary.length > 0 && glossary.indexOf(tag) != 0 && glossary != noResult)
				{
					var colonIndex = glossary.indexOf(colon);
					var contentHead = glossary.substr(0, colonIndex + 2);
					var contentAll = glossary.substr(colonIndex + 1);
					var contents = contentAll.split(comma).sort();
					
					var contentsNew = contents.filter(function(elem, pos) 
					{
						return contents.indexOf(elem) == pos;
					});
					
					glossaries[i] = contentHead + contentsNew.join(comma);
					isEdit = true;
				}
			}
			
			if (isEdit)
			{
				p.innerHTML = glossaries.join(brSpace);
			}
		}
		
		var regUrl = /http[^ "]+/ig;
		var eleComments = document.querySelectorAll("div.suggestion > div:nth-child(2) > i:nth-child(3)");
		for (var i = 0; i < eleComments.length; i++)
		{
			var comment = eleComments[i].textContent + " ";
			var commentUrls = comment.match(regUrl) || [];
			for (var j = 0; j < commentUrls.length; j++)
			{
				var commentUrl = commentUrls[j] + " ";
				comment = comment.replace(commentUrl,"<a target='_blank' href='" + commentUrls[j] + "' >" + commentUrls[j] + "</a> ");
			}
			eleComments[i].innerHTML = comment;
		}
	} // End suggestions.php
	
	if (url.indexOf("translate.php") > -1)
	{
		if (url.indexOf("search_input=") > -1)
		{
			var searchText = decodeURIComponent(url.replace(/^.*search_input=/i,"").replace(/&.*$/i,"")).replace(/\+/g," ").trim();
			if (searchText != "")
			{
				document.title = searchText + " - " + document.title;
			}
		}
		
		var outer = document.getElementById("suggestions_box_outer");
		if (outer != null)
		{
			outer.setAttribute("onclick","hideSuggestionsBox();");
		}
		
		var divBtn = document.createElement("div");
		document.body.appendChild(divBtn);
		divBtn.innerHTML = ' \
<div style="position: fixed; z-index: 3; right: 12px; top: 84px; line-height: 24px; text-align: right;"> \
	&nbsp; <input value="Hide App" class="btnHelper" type="button" onclick="hideKeyAppInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide Game" class="btnHelper" type="button" onclick="hideKeyGameInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide FAQ" class="btnHelper" type="button" onclick="hideKeyFaqInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide Support" class="btnHelper" type="button" onclick="hideKeySupportInterval(); return false;" /> \
	<br/> \
	<br/> &nbsp; <input value="Hide not similar" class="btnHelperLong" type="button" onclick="hideStrNotMatchInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide very long" class="btnHelperLong" type="button" onclick="hideStrLongInterval(); return false;" /> \
	<br/> \
	<br/> &nbsp; <input value="Hide no Suggestion" class="btnHelperLong" type="button" onclick="hideSgtNoneInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide Suggested" class="btnHelperLong" type="button" onclick="hideSgtSuggestedInterval(); return false;" /> \
	<br/> &nbsp; <input value="Hide Translated" class="btnHelperLong" type="button" onclick="hideSgtTranslatedInterval(); return false;" /> \
	<br/> \
	<br/> &nbsp; <input value="Sort by Key" class="btnHelper" type="button" onclick="sortKeyInterval(); return false;" /> \
	<br/> \
	<br/> &nbsp; <input value="Refresh" class="btnHelper" type="button" onclick="hideSuggestionsBox(); return false;" /> \
	<br/> &nbsp; <input value="Show All" class="btnHelper" type="button" onclick="showKey(); return false;" /> \
	<br/><br/> &nbsp; <span id="spanShowing" style="color: white;"></span> \
</div> \
';

		function countShowing()
		{
			var trKeys = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr");
			var countAll = trKeys.length;
			var countShow = 0;
			for (var i = 0; i < trKeys.length; i++)
			{
				if (trKeys[i].style.display != "none")
				{
					countShow++
				}
			}
			var spanShowing = document.getElementById("spanShowing");
			if (spanShowing != null)
			{
				spanShowing.textContent = "Showing " + countShow + " of " + countAll;
			}
		}
		setInterval(countShowing, 500);
	} // End translate.php

	if (url.indexOf("user_activity.php") > -1)
	{		
		var aAvatars = document.querySelectorAll(".friend_block_avatar > a");
		for (var i = 0; i < aAvatars.length; i++)
		{
			aAvatars[i].href = aAvatars[i].href.replace("https://steamcommunity.com","http://steamcommunity.com");
		}

		var h3s = document.querySelectorAll("#leftAreaContainer h3");
		if(h3s.length == 2)
		{
			try
			{
				var td = h3s[1].parentElement;
				var user = url.replace("http://translation.steampowered.com/user_activity.php?user=","");
				var name = td.innerHTML.match(/<\/h3>.+<br>/i)[0].replace("</h3>-","").replace("-<br>","");
				td.innerHTML = td.innerHTML.replace(/<\/h3>.+<br>/i,
					"</h3><a target='_blank' href='http://steamcommunity.com/profiles/"
						+user+"'>"+name+"</a><br>");
			}
			catch (ex)
			{
			}
		}
			
		var sug = document.body.textContent;
		
		var regComment = /VIEW COMMENT/g;
		var regSuggest = /VIEW SUGGESTION/g;
		
		var startComment = sug.indexOf("...RECEIVED A MODERATOR COMMENT");
		var startPending = sug.indexOf("...ARE PENDING");
		var startApproved = sug.indexOf("...WERE APPROVED");
		var startDeclined = sug.indexOf("...WERE DECLINED");
		var startApplied = sug.indexOf("...HAVE BEEN APPLIED WITHIN THE LAST 14 DAYS");
		var startRemoved = sug.indexOf("...HAVE BEEN REMOVED WITHIN THE LAST 14 DAYS");
		
		var sugComment = sug.substring(startComment,startPending);
		var sugPending = sug.substring(startPending,startApproved);
		var sugApproved = sug.substring(startApproved,startDeclined);
		var sugDeclined = sug.substring(startDeclined,startApplied);
		var sugApplied = sug.substring(startApplied,startRemoved);
		var sugRemoved = sug.substring(startRemoved);
		
		var countComment = (sugComment.match(regComment) || []).length;
		var countPending = (sugPending.match(regSuggest) || []).length;
		var countApproved = (sugApproved.match(regSuggest) || []).length;
		var countDeclined = (sugDeclined.match(regSuggest) || []).length;
		var countApplied = (sugApplied.match(regSuggest) || []).length;
		var countRemoved = (sugRemoved.match(regSuggest) || []).length;
		
		var divBtn = document.createElement("div");
		document.body.appendChild(divBtn);
		divBtn.innerHTML = ' \
<div style="position: fixed; z-index: 3; right: 12px; top: 84px; line-height: 24px; text-align: right;"> \
	&nbsp; <input value="To Comment (' + countComment + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionComment\'); return false;" /> \
	<br/> &nbsp; <input value="To Pending (' + countPending + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionPending\'); return false;" /> \
	<br/> &nbsp; <input value="To Approved (' + countApproved + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionApproved\'); return false;" /> \
	<br/> &nbsp; <input value="To Declined (' + countDeclined + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionDeclined\'); return false;" /> \
	<br/> &nbsp; <input value="To Applied (' + countApplied + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionApplied\'); return false;" /> \
	<br/> &nbsp; <input value="To Removed (' + countRemoved + ')" class="btnHelperLong" type="button" onclick="scrollToId(\'sectionRemoved\'); return false;" /> \
	<br/> \
	<br/> &nbsp; <input value="Hide Suggestions" class="btnHelperLong" type="button" onclick="hideSuggestion(); return false;" /> \
	<br/> &nbsp; <input value="Show Suggestions" class="btnHelperLong" type="button" onclick="showSuggestion(); return false;" /> \
</div> \
';
		
		document.body.innerHTML = document.body.innerHTML
			.replace("...RECEIVED A MODERATOR COMMENT","<span id='sectionComment' class='user_suggestion'>...RECEIVED A MODERATOR COMMENT (" + countComment + ")</span>")
			.replace("...ARE PENDING","<span id='sectionPending' class='user_suggestion'>...ARE PENDING (" + countPending + ")</span>")
			.replace("...WERE APPROVED","<span id='sectionApproved' class='user_suggestion'>...WERE APPROVED (" + countApproved + ")</span>")
			.replace("...WERE DECLINED","<span id='sectionDeclined' class='user_suggestion'>...WERE DECLINED (" + countDeclined + ")</span>")
			.replace("...HAVE BEEN APPLIED WITHIN THE LAST 14 DAYS","<span id='sectionApplied' class='user_suggestion'>...HAVE BEEN APPLIED WITHIN THE LAST 14 DAYS (" + countApplied + ")</span>")
			.replace("...HAVE BEEN REMOVED WITHIN THE LAST 14 DAYS","<span id='sectionRemoved' class='user_suggestion'>...HAVE BEEN REMOVED WITHIN THE LAST 14 DAYS (" + countRemoved + ")</span>");
	
		
	} // End user_activity.php
}

var clientScript = ' \
 \
var itvTime = 300; \
var itvIdHideKeyApp = 0; \
var itvIdHideKeyGame = 0; \
var itvIdHideKeyFaq = 0; \
var itvIdHideKeySupport = 0; \
var itvIdHideStrNotMatch = 0; \
var itvIdHideStrLong = 0; \
var itvIdHideSgtNone = 0; \
var itvIdHideSgtSuggested = 0; \
var itvIdHideSgtTranslated = 0; \
var itvIdSortKey = 0; \
 \
function setVisibleKey(startKey, visible) \
{ \
	var display = visible != true ? "none" : ""; \
	var eleKeys = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)"); \
	for (var i = 0; i < eleKeys.length; i++) \
	{ \
		try \
		{ \
			if (eleKeys[i].textContent.trim().indexOf(startKey) == 0) \
			{ \
				eleKeys[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = display; \
			} \
		} \
		catch (ex) \
		{ \
		} \
	} \
} \
 \
function hideKeyGame() \
{ \
	setVisibleKey("GAMES", false); \
} \
 \
function hideKeyApp() \
{ \
	setVisibleKey("STEAM/STORE # storefront_english_apps.txt #", false); \
	setVisibleKey("STEAM # community_english.txt # SharedFiles_App_", false); \
} \
 \
function hideKeyFaq() \
{ \
	setVisibleKey("STEAM # support_faq_english.txt #", false); \
} \
 \
function hideKeySupport() \
{ \
	setVisibleKey("STEAM # supportui_english.txt #", false); \
} \
 \
function showKey() \
{ \
	clearInterval(itvIdHideKeyApp); \
	clearInterval(itvIdHideKeyGame); \
	clearInterval(itvIdHideKeyFaq); \
	clearInterval(itvIdHideKeySupport); \
	clearInterval(itvIdSortKey); \
	clearInterval(itvIdHideStrNotMatch); \
	clearInterval(itvIdHideStrLong); \
	clearInterval(itvIdHideSgtNone); \
	clearInterval(itvIdHideSgtSuggested); \
	clearInterval(itvIdHideSgtTranslated); \
	setVisibleKey("", true); \
	 \
	hideSuggestionsBox(); \
} \
 \
function sortKey() \
{ \
	var keyArr = new Array(); \
	var valArr = new Array(); \
	 \
	var eleKeys = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)"); \
	for (var i = 0; i < eleKeys.length; i++) \
	{ \
		try \
		{ \
			key = eleKeys[i].textContent.trim(); \
			keyArr.push(key); \
			valArr[key] = eleKeys[i].parentElement.parentElement.parentElement \
				.parentElement.parentElement.parentElement.outerHTML.trim(); \
		} \
		catch (ex) \
		{ \
		} \
	} \
	 \
	var keyArrTmp = keyArr.slice(); \
	keyArr.sort(); \
	 \
	var isSame = true; \
	for (var i = 0; i < keyArr.length; i++) \
	{ \
		if (keyArr[i] != keyArrTmp[i]) \
		{ \
			isSame = false; \
		} \
	} \
	 \
	if (!isSame) \
	{ \
		var eleTable = document.querySelector("#keylist > table:nth-child(1) > tbody:nth-child(1)"); \
		if (eleTable != null) \
		{ \
			var newInner = ""; \
			 \
			for (var i = 0; i < keyArr.length; i++) \
			{ \
				newInner += valArr[keyArr[i]]; \
			} \
			 \
			eleTable.innerHTML = newInner; \
		} \
	} \
} \
 \
function scrollToId(id) \
{ \
	var ele = document.getElementById(id); \
	if (ele != null) \
	{ \
		ele.scrollIntoView(true); \
		window.scrollBy(0,-20); \
	} \
} \
 \
function setVisibleSuggestion(visible) \
{ \
	var display = visible != true ? "none" : ""; \
	var els = document.querySelectorAll(".copy"); \
	for (var i = 0; i < els.length; i++) \
	{ \
		if (els[i].id != "showwalletkeys") \
		{ \
			els[i].style.display = display; \
		} \
	} \
} \
 \
function showSuggestion() \
{ \
	setVisibleSuggestion(true); \
} \
 \
function hideSuggestion() \
{ \
	setVisibleSuggestion(false); \
} \
 \
function hideKeyAppInterval() \
{ \
	clearInterval(itvIdHideKeyApp); \
	itvIdHideKeyApp = setInterval(hideKeyApp, itvTime); \
} \
 \
function hideKeyGameInterval() \
{ \
	clearInterval(itvIdHideKeyGame); \
	itvIdHideKeyGame = setInterval(hideKeyGame, itvTime); \
} \
 \
function hideKeyFaqInterval() \
{ \
	clearInterval(itvIdHideKeyFaq); \
	itvIdHideKeyFaq = setInterval(hideKeyFaq, itvTime); \
} \
 \
function hideKeySupportInterval() \
{ \
	clearInterval(itvIdHideKeySupport); \
	itvIdHideKeyFaq = setInterval(hideKeySupport, itvTime); \
} \
 \
function sortKeyInterval() \
{ \
	clearInterval(itvIdSortKey); \
	itvIdSortKey = setInterval(sortKey, itvTime); \
} \
 \
function pressHideSuggestion() \
{ \
	document.addEventListener("keydown", function(e) { \
		if (e.keyCode == 27) { \
			if (parent != null) \
			{ \
				parent.hideSuggestionsBox(); \
			} \
			else \
			{ \
				hideSuggestionsBox(); \
			} \
		} \
		return false; \
	}); \
} \
pressHideSuggestion(); \
 \
function moveSuggestionBox() \
{ \
	var td = document.querySelector(".progress > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)"); \
	if (td != null && td.textContent.trim() == "") \
	{ \
		td.innerHTML = ""; \
		var div = document.querySelector("#suggestionmain > div:nth-child(4)"); \
		if (div != null) \
		{ \
			var br = div.querySelector("br"); \
			if (br != null) \
			{ \
				div.removeChild(br); \
			} \
			td.innerHTML = div.outerHTML; \
			td.style.padding = "0px"; \
			div.innerHTML = ""; \
			 \
			var textarea = document.querySelector("form.lbAction > div:nth-child(1) > textarea:nth-child(1)"); \
			if (textarea != null) \
			{ \
				textarea.focus(); \
				textarea.style.height = textarea.scrollHeight + "px"; \
				textarea.style.width = "98%"; \
				textarea.style.marginLeft = "0px"; \
			} \
		} \
	} \
} \
 \
function hideStrNotMatch() \
{ \
	var display = "none"; \
	 \
	var searchStr = decodeURIComponent(document.documentURI.replace(/^.*search_input=/i,"").replace(/&.*$/i,"")) \
		.replace(/\\+/g," ").trim(); \
	searchStr = searchStr.toLowerCase(); \
	 \
	var eleStrs = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(1)"); \
	for (var i = 0; i < eleStrs.length; i++) \
	{ \
		try \
		{ \
			var valStr = eleStrs[i].textContent.trim().toLowerCase(); \
			if (valStr != searchStr) \
			{ \
				eleStrs[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = display; \
			} \
		} \
		catch (ex) \
		{ \
		} \
	} \
} \
 \
function hideStrNotMatchInterval() \
{ \
	clearInterval(itvIdHideStrNotMatch); \
	itvIdHideStrNotMatch = setInterval(hideStrNotMatch, itvTime); \
} \
 \
function hideStrLong() \
{ \
	var display = "none"; \
	var dot = "..."; \
	var dotLengthMinus = 0 - dot.length; \
	 \
	var eleStrs = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(1)"); \
	for (var i = 0; i < eleStrs.length; i++) \
	{ \
		try \
		{ \
			var valStr = eleStrs[i].textContent.trim(); \
			if (valStr.substr(dotLengthMinus) == dot) \
			{ \
				eleStrs[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = display; \
			} \
		} \
		catch (ex) \
		{ \
		} \
	} \
} \
 \
function hideStrLongInterval() \
{ \
	clearInterval(itvIdHideStrLong); \
	itvIdHideStrLong = setInterval(hideStrLong, itvTime); \
} \
 \
function hideSgt(isTranslated, isSuggested) \
{ \
	var display = "none"; \
	var notTranslated = "NOT TRANSLATED"; \
	 \
	var eleSgts = document.querySelectorAll("#keylist > table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)"); \
	for (var i = 0; i < eleSgts.length; i++) \
	{ \
		try \
		{ \
			var isEdit = false; \
			var valSgt = eleSgts[i].textContent.trim(); \
			if (!isTranslated && valSgt == notTranslated) \
			{ \
				var eleSgtCount = eleSgts[i].parentElement.parentElement.querySelector("tr:nth-child(1) > td:nth-child(3)"); \
				var sgtCountLen = eleSgtCount.textContent.trim().length; \
				if (!isSuggested && sgtCountLen == 0) \
				{ \
					isEdit = true; \
				} \
				else if (isSuggested && sgtCountLen > 0) \
				{ \
					isEdit = true; \
				} \
			} \
			else if (isTranslated && valSgt != notTranslated) \
			{ \
				isEdit = true; \
			} \
			 \
			if (isEdit) \
			{ \
				eleSgts[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = display; \
			} \
		} \
		catch (ex) \
		{ \
		} \
	} \
} \
 \
function hideSgtNone() \
{ \
	hideSgt(false, false); \
} \
 \
function hideSgtSuggested() \
{ \
	hideSgt(false, true); \
} \
 \
function hideSgtTranslated() \
{ \
	hideSgt(true, false); \
} \
 \
function hideSgtNoneInterval() \
{ \
	clearInterval(itvIdHideSgtNone); \
	itvIdHideSgtNone = setInterval(hideSgtNone, itvTime); \
} \
 \
function hideSgtSuggestedInterval() \
{ \
	clearInterval(itvIdHideSgtSuggested); \
	itvIdHideSgtSuggested = setInterval(hideSgtSuggested, itvTime); \
} \
 \
function hideSgtTranslatedInterval() \
{ \
	clearInterval(itvIdHideSgtTranslated); \
	itvIdHideSgtTranslated = setInterval(hideSgtTranslated, itvTime); \
} \
 \
';

var eleClientScript = document.createElement("script");
eleClientScript.innerHTML = clientScript;
document.head.appendChild(eleClientScript);

attachOnReady(main);

// End