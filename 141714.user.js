// ==UserScript==
// @version 1.2
// @name mql4.ignoreList
// @namespace garyka.mql4.ignorelist
// @author GaryKa
// @description Simple Ignore List for mql4.com forum 
// @include http://forum.mql4.com/*
// ==/UserScript==

var CAPTION_INCLUDE_IN_IGNORELIST = "↓";
var CAPTION_EXCLUDE_FROM_IGNORELIST = "↑";
//var CAPTION_INCLUDE_IN_IGNORELIST_WITH_ALL_TWINS = "↓↓";
var TITLE_INCLUDE_IN_IGNORELIST = "В игнор лист";
var TITLE_EXCLUDE_FROM_IGNORELIST = "Исключить из игнор листа";
//var TITLE_CAPTION_INCLUDE_IN_IGNORELIST_WITH_ALL_TWINS = "Всех двойников в игнор лист";

var CAPTION_COLLAPSE_MESSAGE = "-";
var CAPTION_EXPAND_MESSAGE = "+";
var TITLE_COLLAPSE_MESSAGE = "свернуть сообщение";
var TITLE_EXPAND_MESSAGE = "показать сообщение";
var TITLE_SHORT_IGNORE_MESSAGE_DISCRIPTION = " опять что-то написал";

var LOCATION = 'ru';
var MQL4_USER_LINK = 'http://www.mql4.com/'+LOCATION+'/users/';
var DATA_STORAGE_KEY_OF_IGNORELIST = 'mql4.ignore.list';
var LOCAL_STORAGE_USER_DELIMITER = ';';
	
var XPATH_MESSAGE = '//tr[td/div[@id="contentID"]]';
var XPATH_MESSAGE_HEADER = '//span/strong/a[contains(@href,"' + MQL4_USER_LINK + 'USERNAME")]';
var XPATH_MESSAGE_BODY = '//div[@id="contentID"]';
var XPATH_MESSAGE_AVATAR_CAPTION = '//td[div/a[@name="ID"]]/preceding-sibling::td/small';

function storeArrayAsStrToLocalStorage(key, array, delimiter){
	var data = array.join(delimiter);
	try { 
		window.localStorage.setItem(key, data);
		return (true);}
	catch(e) {
		alert ('Can not save data in HTML5 Local Storage');
		return (false);
  }
}

function getArrayFromLocalStorageStr(key, delimiter){
	var data = window.localStorage.getItem(key);
	if(data == null) data = '';
	return data.split(delimiter);
}

function getNodesByXPath(xpath){
	return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
}

function getNodeByXPath(xpath){
	return getNodesByXPath(xpath).snapshotItem(0);
}

function includeInIgnoreList(username){
	var ignoreUsers = getArrayFromLocalStorageStr(DATA_STORAGE_KEY_OF_IGNORELIST, LOCAL_STORAGE_USER_DELIMITER);
	if(ignoreUsers.indexOf(username) == -1)
		ignoreUsers[ignoreUsers.length] = username;
	storeArrayAsStrToLocalStorage(DATA_STORAGE_KEY_OF_IGNORELIST, ignoreUsers, LOCAL_STORAGE_USER_DELIMITER);
	window.location.reload();
}

function excludeFromIgnoreList(username){
	var ignoreUsers = getArrayFromLocalStorageStr(DATA_STORAGE_KEY_OF_IGNORELIST, LOCAL_STORAGE_USER_DELIMITER);
	if(ignoreUsers.indexOf(username) > -1)
		ignoreUsers.splice(ignoreUsers.indexOf(username), 1);
	storeArrayAsStrToLocalStorage(DATA_STORAGE_KEY_OF_IGNORELIST, ignoreUsers, LOCAL_STORAGE_USER_DELIMITER);
	window.location.reload();
}

function addExcludeButton(meddageID, username){ 
	var excludeButton = document.createElement('a');
		excludeButton.setAttribute('title', TITLE_EXCLUDE_FROM_IGNORELIST);
		excludeButton.setAttribute('style', 'padding:5px 5px; text-decoration: none');
		excludeButton.setAttribute('href','#' + meddageID);
		excludeButton.onclick =	function(){excludeFromIgnoreList(username);}
		excludeButton.innerHTML = CAPTION_EXCLUDE_FROM_IGNORELIST;
		getNodeByXPath(XPATH_MESSAGE_AVATAR_CAPTION.replace('ID', meddageID)).appendChild(excludeButton);
}

function addIncludeButton(meddageID, username){
	var includeButton = document.createElement('a');
		includeButton.setAttribute('title', TITLE_INCLUDE_IN_IGNORELIST);
		includeButton.setAttribute('style', 'padding:5px 5px; text-decoration: none');
		includeButton.setAttribute('href','#' + meddageID);
		includeButton.onclick =	function(){includeInIgnoreList(username);}                 
		includeButton.innerHTML = CAPTION_INCLUDE_IN_IGNORELIST;
		getNodeByXPath(XPATH_MESSAGE_AVATAR_CAPTION.replace('ID', meddageID)).appendChild(includeButton);
}	
	
function addCollapseExpandeHeader(meddageID, username){
	var message = getNodeByXPath(XPATH_MESSAGE.replace('ID', meddageID));
	var expandButton = document.createElement('a');
	var collapseButton = document.createElement('a');
	
	expandButton.setAttribute('title', TITLE_EXPAND_MESSAGE);
	expandButton.setAttribute('id', 'expandButton'+ meddageID);
	expandButton.setAttribute('style', 'padding:5px 5px; text-decoration: none');
	expandButton.setAttribute('href','#' + meddageID);
	expandButton.innerHTML = CAPTION_EXPAND_MESSAGE;
	expandButton.onclick =	function(){
			expandButton.setAttribute('style', 'visibility: hidden; display: none');
			collapseButton.setAttribute('style', 'padding:5px 5px; text-decoration: none');
			message.removeAttribute('style');
		}

	collapseButton.setAttribute('title', TITLE_COLLAPSE_MESSAGE);
	collapseButton.setAttribute('id', 'collapseButton'+ meddageID);
	collapseButton.setAttribute('style', 'visibility: hidden; display: none');
	collapseButton.setAttribute('href','#' + meddageID);
	collapseButton.innerHTML = CAPTION_COLLAPSE_MESSAGE;
	collapseButton.onclick = function(){
			collapseButton.setAttribute('style', 'visibility: hidden; display: none');
			expandButton.setAttribute('style', 'padding:5px 5px; text-decoration: none');
			message.setAttribute('style', 'visibility: hidden; display: none');
		}
	
	var infoBar = document.createElement('div');
		infoBar.setAttribute('title', username + TITLE_SHORT_IGNORE_MESSAGE_DISCRIPTION);
		infoBar.setAttribute('style', 'margin:2px 0px 2px 0px;background:#F4F9FB; border:2px solid #c5d5db;');
		infoBar.appendChild(expandButton);
		infoBar.appendChild(collapseButton);
	
	message.setAttribute('style', 'visibility: hidden; display: none');
	message.parentNode.parentNode.parentNode.insertBefore(infoBar, message.parentNode.parentNode);
}


(function(){
	
	var ignoreUsers = getArrayFromLocalStorageStr(DATA_STORAGE_KEY_OF_IGNORELIST, LOCAL_STORAGE_USER_DELIMITER);
	
	document.addEventListener('DOMContentLoaded', function(e){	
		if(!ignoreUsers.length) return;
		
		var messageHeaders = getNodesByXPath(XPATH_MESSAGE_HEADER.replace('USERNAME',''));
		if(!messageHeaders.snapshotLength) return;
	
		for(var i = 0; i < messageHeaders.snapshotLength; i++){	
			var id = messageHeaders.snapshotItem(i).getAttribute('id').replace(/_/g,'').replace(/authorinfo/g,'');
			var username = messageHeaders.snapshotItem(i).getAttribute('href').replace(MQL4_USER_LINK,'');
			
			if(ignoreUsers.indexOf(username) > -1){
				addExcludeButton(id, username);
				addCollapseExpandeHeader(id, username)
			}
			else
				addIncludeButton(id, username);
		}
	}
 , false)
})()
