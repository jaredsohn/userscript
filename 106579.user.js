// FB Chat Sidebar Fix
// version 1.9
// 2011-07-10
// Created by: Joris Griffioen
// Released under the beerware license.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FB Chat Sidebar Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	FB Chat Sidebar Fix
// @namespace     	
// @description   	Script to fix the new and annoying chat sidebar on Facebook.
// @require			http://code.jquery.com/jquery-1.6.2.min.js
// @include       	http://*.facebook.com/*
// @include       	https://*.facebook.com/*
// ==/UserScript==

//register user commands
GM_registerMenuCommand('Hide offline people', hideInitCmdHandler, '');
GM_registerMenuCommand('Show offline people', hideStopCmdHandler, '');
GM_registerMenuCommand('Order by online', orderInitCmdHandler, '');
GM_registerMenuCommand("Don't order", orderStopCmdHandler, '');
//GM_registerMenuCommand("Change sidebar position", setSidebarPosCmdHandler, '');
GM_registerMenuCommand("Show settings", getChatSettingsCmdHandler, '');

//create global vars and retrieve settings
var hideTimer = 0;
var orderTimer = 0;
var repeat = 0;
var orderSave = localStorage['order'];
var hideSave = localStorage['hide'];;
//check retrieved settings
checkAndRun();

//user action handlers
function orderInitCmdHandler(){
	orderSave = 'true';
	saveSettings();
	orderByOnlineTimer();
}
function orderStopCmdHandler(){
	orderSave = 'false';
	saveSettings();
	stopOrder();
}
function hideInitCmdHandler(){
	hideSave = 'true';
	saveSettings();
	hideOfflineTimer();
}
function hideStopCmdHandler(){
	hideSave = 'false';
	saveSettings();
	showOffline();
}
function setSidebarPosCmdHandler(){
	$('.fbChatSidebar').css('right', 'auto');
	$('#globalContainer').wrap('<globalContainerContainer class="containerWrapper"/>');
	
	$('.containerWrapper').css('position','relative !important');
	$('.containerWrapper').css('left','100px !important');
	
	
	//$('.leftSidebarMode').css('left','60px !important')
	//$('#globalContainer .sidebarMode').css('left','60px !important')
	
}

function getChatSettingsCmdHandler(){
	var orderCheck = localStorage['order'];
	var hideCheck = localStorage['hide'];
	alert('Order by online: '+orderCheck+' \n Hide offline: '+hideCheck);
}
//save settings
function saveSettings(e){
	localStorage['order'] = orderSave;
	localStorage['hide'] = hideSave;
}
//check settings and take appropriate actions
function checkAndRun(){
	if(orderSave == 'true'){
		orderByOnlineTimer();
	}else{
		stopOrder();
	}
	if(hideSave == 'true'){
		hideOfflineTimer();
	}else{
		showOffline();
	}
}

//start hiding timer
function hideOfflineTimer(){
	hideOffline();
	var interval        = 7500;
	hideTimer       = setInterval (function() {hideOffline(); }, interval);
}
//hide offline people
function hideOffline(e){
	$('.fbChatOrderedList .item').not('.active').not('.idle').hide(800);
	$('.fbChatOrderedList .item').filter('.active').show(800);
	$('.fbChatOrderedList .item').filter('.idle').show(800);
}
//show offline people & stop hiding timer
function showOffline(e){
	clearInterval (hideTimer);
	$('.fbChatOrderedList .item').not('.active').show(800);
}

//start ordering timer
function orderByOnlineTimer(){
	orderByOnline();
    var interval        = 7500;
	orderTimer       = setInterval (function() {orderByOnline(); }, interval);
}
//stop ordering timer
function stopOrder(){	
	clearInterval (orderTimer);
}
//order people by: online-idle-offline
function orderByOnline(e){
	$('.fbChatOrderedList .item').not('.active').insertAfter('.fbChatOrderedList .active:last');
	$('.fbChatOrderedList .item').filter('.idle').insertAfter('.fbChatOrderedList .active:last');
}

//listen for mouseover on chat menu button
function addOverlistener(){
	document.addEventListener('mouseover', function(event) {
		// do whatever you want here
		var target = event.target;
		var classN = $(target).attr('class');
		var parentClass = $(target).parent().parent().attr('class');
		var parentID = $(target).parent().parent().attr('class');
		
		//GM_log(classN);
		
		if(classN == 'uiSelectorButton uiCloseButton' && parentClass == 'uiSelector fbChatSidebarDropdown uiSelectorBottomUp uiSelectorRight'){
			target.click();
		}else if(classN == 'uiSelector fbChatSidebarDropdown uiSelectorBottomUp uiSelectorRight'){
			target.click();
		}
	}, true);
}
addOverlistener();


function addButton(){
	if($('.rNubContainer')){
		$('.rNubContainer').append(
			'<div id="fbDockChatHide" class="fbNubGroup clearfix">'+
				'<div class="fbNubGroup clearfix">'+
					'<div id="fbDockChatTabsWrapper" class="fbNubGroup clearfix">'+
						'<div id="fbDockChatTabs" class="fbNubGroup clearfix">'+
							//'<div class="fbNub">'+
								'<a id="fbDockChatHideA" class="fbNubButton">'+
									'<div class="clearfix fbChatTab fbChatUserTab">'+
										'<div class="wrapWrapper">'+
											'<div class="wrap">'+
												'<div id="hideText" class="name fwb">Hide Sidebar</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</a>'+
							//'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		)		
	}
}
//listen for clicks on the page, to intercept those on chatNub and Hide sidebar
listenClicks();
function listenClicks(){
	document.addEventListener('click', function(event) {
		var target = event.target;
		var id = $(target).attr('id');
		var parentData = $(target).parent().attr('data-label');
		
		//custom added togglebutton
		if(id == 'hideText' || id == 'fbDockChatHideA'){
			event.stopPropagation();
			event.preventDefault();
			location.href = "javascript:void(ChatSidebar.toggle());";
			$('#fbDockChatHide').remove();
			GM_log('removeCustom');
		}
		//native FB chatlist Hide sidebar btn
		/*if(parentData = 'Hide sidebar'){
			$('#fbDockChatHide').remove();
			GM_log('remove');
		}*/
		//native FB chatlist button
		if($(target).isChildOf("#fbDockChatBuddylistNub")){
			GM_log('chatBTN');
			addButton();
		}
	}, true);
}
//check if an element is a child of another, credit: blog.pengoworks.com
jQuery.fn.isChildOf = function(b){
    return (this.parents(b).length > 0);
};