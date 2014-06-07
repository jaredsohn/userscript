// ==UserScript==
// @name           Facebook - Many Facebook Things To help With Mafia Wars
// @namespace      Facebook
// @description    This Script will Reload on error page 
// @version        1.0
// @include        http://*.facebook.com/*
// @include        http://www.facebook.com/reqs.php*
// @include        *http://www.facebook.com/common/error.html*
// ==/UserScript==

///// ERROR RELOAD /////
if (document.URL == "http://www.facebook.com/common/error.html") {
	history.go(-1);
}

///// REMOVE FACEBOOK ADDS /////
(function() {
var head = document.getElementsByTagName('head')[0], style = document.createElement('style'), css = '#right_column { width: 77% !important; } .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor, div[id^="emu_"], .social_ad, .sponsor, .footer_ad,  #home_sponsor, .house_sponsor, #home_sponsor_nile, .PYMK_Reqs_Sidebar { display: none !important; } #wallpage { width: 700px !important; }';
if (!head) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();


///// AUTO PROCESSOR /////

var	boolAcceptGifts = true,
	boolIgnoreEtcNotes = true,
	strNextURL = '',
	intNextURLDelay = 5,
	intLogThreshold = 30,
	intLogLength = 20
	
	
/*****	global vars *****/	
var	// used in development...spams logs a lot (=
	boolIsDebugMode = false,
	// this is the settimeout que length
	intCurDelay = 0;
	
/*****	inits and processing vars *****/
// see if we need to init the GM vars
if(!GM_getValue('boolInitialized', false) || boolIsDebugMode)
	handleScriptInit();

try
{
	var	// current user's FB id
		strThisFBId = getSnapShot(GM_getValue('strFBIdPat')).snapshotItem(0).getAttribute('href'),
		// xpath friend request results
		objFriendResults = getSnapShot(GM_getValue('strFRPat')),
		// xpath MW family invite text results
		objMWInviteTextResults = getSnapShot(GM_getValue('strMWITPat')),
		// xpath MW family invite button results
		objMWInviteButtonResults = getSnapShot(GM_getValue('strMWIBPat')),
		// xpath mafia wars gift notice results
		objGiftTextResults = getSnapShot(GM_getValue('strGTPat')),
		// xpath mafia wars gift button results
		objGiftButtonResults = getSnapShot(GM_getValue('strGBPat')),
		// xpath group invite, page share, etc results
		objEtcResults = getSnapShot(GM_getValue('strEPat')),
		// xpath event invite results
		objEventResults = getSnapShot(GM_getValue('strEIPat'));
		
	if(/.+[\?&]id=\d+&?.*/.test(strThisFBId))
		strThisFBId = strThisFBId.replace(/.+[\?&]id=(\d+)&?.*/, '$1')
	else
		strThisFBId.replace(/.+\.com\/([\w\.%]+)\??.*/, '$1')
	
}
catch(objErr)
{
	logError('An error occured while creating global variables', objErr);
}

	
/*****	script management methods *****/
// register GM menu commands
GM_registerMenuCommand('Request Page Processor: Reinitialize script level variables', menu_HandleReinit);

function menu_HandleReinit()
{
	if(window.confirm('Are you sure you want to reinitialize your script variables?'))
	{
		handleScriptInit();
		window.location.reload();
	}
}

// initialized script variables
function handleScriptInit()
{
	if(boolIsDebugMode)
		intLogThreshold = 30;
		
	logThis('Initializing...', 10);
	// waits are used to delay settimeouts and added to the intCurDelay que timer
	GM_setValue('intDefaultWait', 1000);
	GM_setValue('intAddToMafiaWait', 2500);
	// URL references
	GM_setValue('strMWBaseURL', 'http://apps.facebook.com/inthemafia/');
	GM_setValue('strZyngaBaseURL', 'http://mwfb.zynga.com/mwfb/');
	GM_setValue('strHeaderInfo', '{ "User-Agent": "Mozilla/5.0", "Accept": "text/xml" }');
	// xpath patterns
	/******
	 	strFBIdPat	used to get the current user's Facebook Id
		strFRPat	friend requests
		strMWITPat	the text found in join somebody's mafia
		strMWIBPat	the button found in join somebody's mafia
		strGTPat	the area in gift notices that contain the accept/ignore buttons
		strGBPat	the buttons in the gift area
		strEPat		the ignore buttons in unwanted invites, notices, etc
		strEIPat	the anchor to remove from "my events"
	*****/
	GM_setValue('strFBIdPat', "//li[@class='fb_menu' and @id='fb_menu_profile']/a");
	GM_setValue('strFRPat', "//div[@id='friend_connect']//form");
	
	GM_setValue('strMWITPat', "//div[@class='confirm_boxes' and contains(@id, 'confirm_10979261223_')]//td[@class='info' and contains(., 'join their crew')]");
	GM_setValue('strMWIBPat', GM_getValue('strMWITPat').concat("//div[@class='buttons']/input[contains(@value , 'Join')]"));
	
	GM_setValue('strGTPat', "//div[@class='confirm_boxes' and contains(@id, 'confirm_10979261223_') and contains(., 'mafia wars gift request')]//div[@class='buttons']");
	GM_setValue('strGBPat', GM_getValue('strGTPat').concat("//input[contains(@value, 'Accept')]"));

	GM_setValue('strEPat', "//div[@id='group_invite' or @id='fbpage_fan_confirm']//input[@value='Ignore']");
	GM_setValue('strEIPat', "//div[@class='confirm_boxes' and @id='event_invite']//div[@class='buttons']/input[@value='No']");
		
	// holds the over written FB JS methods needed to click buttons correctly
	GM_setValue('strNewFBMethods', getNewFBMethods());
	
	// logging info
	GM_setValue('strLogTable', '');
	
	GM_setValue('boolInitialized', true);
}

// logging
function logThis(_strSource, _intLevel, _strMessage, _boolToScreenLog)
{
	if(intLogThreshold >= _intLevel)
		GM_log('Source: ' + _strSource + '\r\nMessage: ' + _strMessage);
}

function logError(_strSource, _strMessage, _objErr, _boolToScreenLog)
{
	logThis(_strSource, 30, 'ERROR: ' + _strMessage.concat('Details:\r\n', _objErr.message), false);
}

// dev stuff
function dump(_strContent, _boolToScreen)
{
	GM_log('dumping:\r\n' + _strContent);
	
	if(_boolToScreen == true && _strContent.toString().length > 0)
	{
		var objDiv = document.createElement('div');
		objDiv.setAttribute('style', 'border:1px solid red;position:absolute;bottom:0px;z-index:9999;width: 99%;color:white;background:black;overflow:auto;max-height:300px;');
		objDiv.id = 'RPAP_DevDump';
		objDiv.innerHTML = '<pre>' + _strContent.replace(/\</g, '\n&lt;').replace(/>/g, '&gt;\n\t') + '</pre>';
		document.getElementsByTagName('body').item(0).appendChild(objDiv);
	}
}

/*****	top level methods *****/
// xpath results
function getSnapShot(_strPattern)
{
	var objSnapshot;
	try
	{
		objSnapshot = document.evaluate(_strPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	catch(objErr)
	{
		logError('An error ocured while trying to get XPath results from ' + _strPattern + '.', objErr);
		procComplete();
	}
	return objSnapshot;
}

// gets the current timestamp in minutes
function getCurrentTime()
{
	return Math.round(new Date().getTime() / 1000 / 60);
}

// gets a remote URL
function getURL(_strURL, _fnCallback)
{
	try
	{
		GM_xmlhttpRequest
		(
			{
				method:"GET", 
				url: _strURL, 
				headers : GM_getValue('strHeaderInfo'), 
				onload : function(responseDetails)
				{
					if(typeof _fnCallback == 'function')
						_fnCallback(responseDetails);
					
					var strToLog = 'getURL: ' + _strURL;
					strToLog = strToLog.concat('\r\nwith headers: ', GM_getValue('strHeaderInfo'));
					strToLog = strToLog.concat('\r\nresponse text:\r\n', responseDetails.responseText);
					logThis('getURL()', 50, strToLog, false);
				}
			}
		);
	}
	catch(objErr)
	{
		logError('An error ocured while trying to retrieve a URL (' + _strURL + ')', objErr);
		procComplete();
	}
}

// adds time to the global delay cue
function addDelay(_intNewDelay)
{
	intCurDelay = intCurDelay + _intNewDelay;
	return intCurDelay;
}

// used to stuff a new script block methods on the page
function putScriptMethods(_strScriptText)
{
	var objScript = document.createElement('script');
	objScript.type = 'text/javascript';
	objScript.text = _strScriptText;
	document.getElementsByTagName('head').item(0).appendChild(objScript);
}

// these methods are FB methods that need to be overwritten to be sure they stay on their best behavior
function getNewFBMethods()
{
	function click_add_platform_app(req_id, app_id, type_index, from_id, is_invite, req_type, url) {
		var obj_type = 'app_' + app_id + '_' + type_index;
		update_request_status_msg(obj_type, req_id, _tx("Loading..."));
		new AsyncRequest().setURI('/ajax/reqs.php').setData({
			'type': 'platform_request',
			'id': req_id,
			'action': (url ? 'accept' : 'reject'),
			'params': {
				'from_id': from_id,
				'req_type': req_type,
				'app_id': app_id,
				'is_invite': is_invite
			}
		}).setHandler(function (response) {
			handle_async_response(obj_type, req_id, response.getPayload(), (url ? true : false));
		}).send();
	}
	function handle_async_response(obj_type, obj_id, payload, accepted) {
		if (payload.request_labels) {
			update_request_labels(obj_type, obj_id, payload.request_labels, accepted);
		}
		if (payload.msg) {
			payload.msg = accepted ? payload.msg.replace('ignored', 'accepted') : payload.msg;
			update_request_status_msg(obj_type, obj_id, payload.msg, true);
		}
		if (payload.final_lists) {
			if (window.FriendAddingTool) {
				FriendAddingTool.updateMasterLists(payload.final_lists);
			}
		}
	}
	function update_request_labels(obj_type, id, request_labels, accepted) {
		if (request_labels['main']) {
			var label_span = $(obj_type + '_label');
			set_inner_html(
			label_span, (accepted ? request_labels['main'].replace('ignored', 'accepted') : request_labels['main']));
		}
		if (request_labels['sidebar']) {
			var sidebar_text_div = $(obj_type + '_sidebar_text');
			if (sidebar_text_div) {
				set_inner_html(sidebar_text_div, (accepted ? request_labels['sidebar'].replace('ignored', 'accepted') : request_labels['sidebar']));
			}
		} else {
			var sidebar_div = $(obj_type + '_sidebar');
			hide(sidebar_div);
		}
	}
	function bounceHome()
	{
		if (!window.adding_friend_details && strNextURL)
			window.location.href = strNextURL;
	}
	var arrReturnMethods = new Array();
	arrReturnMethods.push('/*****	FB JS METHOD REWRITES	*****/');
	arrReturnMethods.push(click_add_platform_app);
	arrReturnMethods.push(handle_async_response);
	arrReturnMethods.push(bounceHome);
	
	return arrReturnMethods.join('').replace(/\s+/g, ' ');
}


/*****	processing logic *****/
logThis('', 0, 'Starting to auto-process the requests page...', true);
// find out what to process
var boolProcFriends = objFriendResults.snapshotLength > 0 ? true : false;
var boolProcMWInvites = objMWInviteTextResults.snapshotLength > 0 ? true : false;
var boolProcGifts = boolAcceptGifts && objGiftTextResults.snapshotLength > 0 ? true : false;
var boolProcEtcNotices = boolIgnoreEtcNotes && objEtcResults.snapshotLength > 0 ? true : false;
var boolProcEventNotices = boolIgnoreEtcNotes && objEventResults.snapshotLength > 0 ? true : false;

// load the FB button click over-writes
putScriptMethods(GM_getValue('strNewFBMethods'));

// start processing
if(boolProcFriends){ procFriendRequests() }
else{ logThis('Processing logic', 10, 'No friend requests found.'); }
// family invites
if(boolProcMWInvites){ procMWInvites() }
else{ logThis('Processing logic', 10, 'No Mafia Wars family invites found.'); }
// gifts
if(boolProcGifts){ procGiftNotices() }
else{ logThis('Processing logic', 10, 'Not processing gift notices (' + objGiftTextResults.snapshotLength + ' found).'); }
// trash (ground, etc) invites
if(boolProcEtcNotices){ procEtcNotices() }
else{ logThis('Processing logic', 10, 'Not processing etc notices (' + objEtcResults.snapshotLength + ' found).'); }
// calendar/event invites
if(boolProcEventNotices){ procEtcNotices() }
else{ logThis('Processing logic', 10, 'Not processing event invite notices (' + objEventResults.snapshotLength + ' found).'); }

// cue the completion method
setTimeout(procComplete, addDelay(GM_getValue('intDefaultWait', 1000)));

// this makes sure we are only going to the MW news feed...the req page has a habit of wanting to go 'home.php'
if(strNextURL.length)
	unsafeWindow.onbeforeunload = function(){ window.location.href = strNextURL; };

/*****	processing methods *****/
// accepts friend requests, adds to mafia
function procFriendRequests()
{
	var strSection = 'Family invite processing';
	logThis(strSection, 10, 'Processing ' + objFriendResults.snapshotLength + ' friend request(s).');
	
	function doTimeout(_intCurItem)
	{
		try
		{
			//accepting friend requests
			var	objSnapshotItem = objFriendResults.snapshotItem(_intCurItem),
				strAddToMafiaURL_FB = GM_getValue('strMWBaseURL'),
				strAddToMafiaURL_Zy = GM_getValue('strZyngaBaseURL'),
				strHelpURL = GM_getValue('strMWBaseURL'),
				elemAcceptButton,
				intFriendId = 0,
				fnSendToTimeout_FRClick,
				fnSendToTimeout_MafiaAdd,
				fnSendToTimeout_JobCalls;
				
			
			for(var elem in objSnapshotItem.elements)
			{
				if(objSnapshotItem.elements[elem].type)
				{
					if
					(
					   	objSnapshotItem.elements[elem].type.toLowerCase() == 'button' &&
						objSnapshotItem.elements[elem].value.toLowerCase() == 'confirm'
					)
					{
						elemAcceptButton = objSnapshotItem.elements[elem];
						for(var i in objSnapshotItem.elements[elem].getAttribute('onclick').split('"'))
						{
							if(/[\d]+/.test(objSnapshotItem.elements[elem].getAttribute('onclick').split('"')[i]))	
								intFriendId = objSnapshotItem.elements[elem].getAttribute('onclick').split('"')[i];
						}
					}
				}
			}
			
			// adding new friends to mafia
			strAddToMafiaURL_FB = strAddToMafiaURL_FB.concat('status_invite.php?from=', intFriendId);
			strAddToMafiaURL_Zy = strAddToMafiaURL_FB.replace(GM_getValue('strMWBaseURL'), GM_getValue('strZyngaBaseURL'));
			
			// this is temp until i get vanity URL's sorted out
			if(!/[^\d]+/.test(strThisFBId))
				strAddToMafiaURL_Zy += '&fb_sig_added=1&fb_sig_user=' + strThisFBId;
			else
				strAddToMafiaURL_Zy += '&fb_sig_added=0';
			
			// checking for help requests
			strHelpURL += '/index.php?xw_controller=job&xw_action=give_help&skip_interstitial=1';
			strHelpURL = strHelpURL.concat('&target_id=', intFriendId);
			strHelpURL += '&job_city=';
		}
		catch(objErr)
		{
			logError(strSection, 'The values needed to process a friend request have an error.', objErr);
			return false;
		}
		fnSendToTimeout_FRClick = function()
		{
			logThis(strSection, 20, 'Accepting a friend request (Id: ' + intFriendId + ').');
			elemAcceptButton.click();
		};
		fnSendToTimeout_MafiaAdd = function()
		{
			logThis(strSection, 20, 'Adding a new friend to your mafia (Id: ' + intFriendId + ').');
			getURL(strAddToMafiaURL_FB);
			getURL(strAddToMafiaURL_Zy);
			
		};
		fnSendToTimeout_JobCalls = function()
		{
			logThis(strSection, 20, 'Checking for available jobs (Id: ' + intFriendId + ').');
			// NY
			getURL(strHelpURL + '1');
			// Cuba
			getURL(strHelpURL + '2');
		};
		
		setTimeout(fnSendToTimeout_FRClick, addDelay(GM_getValue('intDefaultWait', 1000)));
		setTimeout(fnSendToTimeout_MafiaAdd, addDelay(GM_getValue('intAddToMafiaWait', 2500)));
		setTimeout(fnSendToTimeout_JobCalls, addDelay(GM_getValue('intDefaultWait', 1000)));
	}
	
	for(var i = 0; i < objFriendResults.snapshotLength; i++)
	{
		if(objFriendResults.snapshotItem(i) == null)
			continue;
		else
			doTimeout(i);
	}
		
	setTimeout(function(){ logThis(strSection, 20, 'Friend request processing complete.', false); }, addDelay(1));
}

// loads the FB and Zynga confirm URL's, click the ignore buttons
function procMWInvites()
{
	var strSection = 'Family invite processing';
	logThis(strSection, 10, 'Processing ' + objMWInviteTextResults.snapshotLength + ' mafia family invite notice(s).', false);
	function doTimeout(_intCurItem)
	{
		var fnSendToTimeout = function()
		{
			try
			{
				var	objSnapshotItem = objMWInviteTextResults.snapshotItem(_intCurItem),
					strConfURL_FB = objSnapshotItem.innerHTML.split("'")[3].replace(/&amp;/g, '&'),
					strConfURL_Zy = strConfURL_FB.replace(GM_getValue('strMWBaseURL'), GM_getValue('strZyngaBaseURL')),
					elemClickThis = objMWInviteButtonResults.snapshotItem(_intCurItem);
				
				// this is temp until i get vanity URL's sorted out
				if(!/[^\d]+/.test(strThisFBId))
					strConfURL_Zy = strConfURL_Zy.concat('&fb_sig_added=1&fb_sig_user=', strThisFBId);
				else
					strConfURL_Zy += '&fb_sig_added=0';
				
			}
			catch(objErr)
			{
				logError(strSection, 'The values needed to process a mafia family invite have an error.', objErr, true);
				return false;
			}
			logThis(strSection, 20, 'Joining a mafia family...', true);
			// the url from the accept button (goes to FB)
			getURL(strConfURL_FB);
			// next URL
			getURL(strConfURL_Zy);
			// clicks the ignore button to remove it from the req's page
			elemClickThis.click();
		}
		setTimeout(fnSendToTimeout, addDelay(GM_getValue('intDefaultWait')));
	}
	
	for(var i = 0; i < objMWInviteTextResults.snapshotLength; i++)
	{
		if(objMWInviteTextResults.snapshotItem(i) == null)
			continue;
		else
			doTimeout(i);
	}
	setTimeout(function(){ logThis(strSection, 20, 'Mafia Wars family invite processing complete.', false); }, addDelay(1));
}

// loads the FB and Zynga gift accept urls, click the ignore button to remove it from the FB page
function procGiftNotices()
{
	var strSection = 'Family invite processing';
	logThis(strSection, 10, 'Processing ' + objGiftTextResults.snapshotLength + ' gift notice(s).', false);
	
	function doTimeout(_intCurItem)
	{
		var fnSendToTimeout = function()
		{
			try
			{
				var	strConfirmURL = objGiftTextResults.snapshotItem(_intCurItem).innerHTML.split("'")[3],
					intFriendId = strConfirmURL.split('from_user%22%3A%22')[1].split('%')[0],
					intTimeId = strConfirmURL.split('time_id%22%3A%22')[1].split('%')[0],
					strGiftURL = GM_getValue('strMWBaseURL'),
					elemClickThis = objGiftButtonResults.snapshotItem(_intCurItem);
				
				strConfirmURL = strConfirmURL.replace(/&amp;/g, '&');
				strGiftURL += 'index.php?xw_controller=interstitial&xw_action=accept_gift';
				strGiftURL = strGiftURL.concat('&from_user=', intFriendId, '&time_id=', intTimeId);
			}
			catch(objErr)
			{
				logError(strSection, 'The values needed to process a gift notice have an error.', objErr, true);
				return false;
			}
			logThis(strSection, 20, 'Accepting a Mafia Wars gift (Id: ' + intFriendId + ').', true);
			// the url from the accept button (goes to zynga)
			getURL(strConfirmURL);
			// the next url (since it's a page redir after loading the first)
			getURL(strGiftURL);
			// clicks the ignore button to remove it from the req's page
			elemClickThis.click();
		}
		setTimeout(fnSendToTimeout, addDelay(GM_getValue('intDefaultWait', 1000)));
	}
	
	for(var i = 0; i < objGiftTextResults.snapshotLength; i++)
	{
		if(!objGiftTextResults.snapshotItem(i))
			continue;
		else
			doTimeout(i);
	}
	
	setTimeout(function(){ logThis(strSection, 10, 'All gift notices processed.', false); }, addDelay(1));
}

// pretty basic...it just clicks ignore buttons
// this can include more things to ignore by adding more strings to the strEPat var
function procEtcNotices()
{
	var strSection = 'Etc notice processing';
	logThis(strSection, 10, 'Processing ' + objEtcResults.snapshotLength + ' etc invite(s).', false);
	
	function doTimeout(_elemClickThis)
	{
		var fnSendToTimeout = function()
		{
			logThis(strSection, 20, 'Ignoring etc request.', true);
			_elemClickThis.click();
		}
		setTimeout(fnSendToTimeout, addDelay(GM_getValue('intDefaultWait', 1000)));
	}
	
	if(boolProcEtcNotices)
	{
		for(var i = 0; i < objEtcResults.snapshotLength; i++)
		{
			if(!objEtcResults.snapshotItem(i))
				continue;
			else
				doTimeout(objEtcResults.snapshotItem(i));
		}
	}
	if(boolProcEventNotices)
	{
		for(var i = 0; i < objEventResults.snapshotLength; i++)
		{
			if(!objEventResults.snapshotItem(i))
				continue;
			else
				doTimeout(objEventResults.snapshotItem(i));
		}
	}
	
	setTimeout(function(){ logThis(strSection, 10, 'All etc requests ignored.', false); }, addDelay(1));
}

// end processing
function procComplete()
{
	var strSection = 'Finalization';
	// complete, write the event in the log
	logThis('', 0, 'Processes complete.', true);
	
	if(strNextURL.length)
	{
		logThis(strSection, 20, 'Loading the next URL in ' + (intNextURLDelay ? intNextURLDelay : 10) + ' seconds.', false);
		setTimeout
		(
			function()
			{
				logThis('Loading the next URL now.', 10);
				window.location.href = strNextURL;
			}, 
			intNextURLDelay ? intNextURLDelay * 1000 : 5000
		);
	}
}


///// MASS ADD (BULK OPTIONS) /////

/*

window.friendsWithAppList = List of friends with this app.
window.friendsWithAppNotInvited = List of friends with this app we can invite.
window.friendsWithAppId = The app id where we retreived the list of friends from.
window.friendsInInviteDialog = friends in the invite dialog

*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


var nHtml={
FindByAttr:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
VisitUrl:function(url) {
	window.setTimeout(function() {
		document.location.href=url;
	},500+Math.floor(Math.random()*500));
},
ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	return this.ClickWin(window,obj,'click');
},
ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
},
ClickUp:function(obj) {
	this.ClickWin(window,obj,'mousedown');
	this.ClickWin(window,obj,'mouseup');
	this.ClickWin(window,obj,'click');
},
GetText:function(obj,depth) {
	var txt='';
	if(depth==undefined) { depth=0; }
	if(depth>40) { return; }
	if(obj.textContent!=undefined) { return obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child,depth+1);
	}
	return txt;
}

};

FacebookInvites={
addMeUpto:0,
addMeUptoMax:0,    // how many users do we try to add as friends on this page. Only 1 when we're on profile page.
addMeDone:{},
waitForAddMe:null,
waitForAddMeStarted:null,
bulkAddMeTimeout:null,
messObj:null,
allAppsId:"0ALLAPPS",
bulkAddOptions:{},

SetMessage:function(mess) {
	if(!this.messObj) {
		var content=document.getElementById('content');
		if(content) {
			var div=document.createElement('div');
			div.style.paddingTop='48px';
			div.innerHTML=mess;
			content.insertBefore(div,content.childNodes[0]);
			this.messObj=div;
		} else {
			GM_log('cannot find content div');
		}
	}
	this.messObj.innerHTML=mess;
},

IsTooManySelected:function() {
	var toomany=nHtml.FindByXPath(document,"//div[@class='toomany_selected']");
	if(toomany && toomany.style.display!='none') {
		GM_log('Too many friends selected');
		return true; 
	}
	return false;
},

InviteFriendsCheckBox:function(div,friendsHash,click) {
	var inps=div.getElementsByTagName('input');
	var friendsClicked=0;
	var selected={};

	for(var i=0; i<inps.length; i++) {
		var inp=inps[i];
		var val=""+inp.value;
		if(inp.id!="ids[]") {
			continue;
		}
		if(friendsHash!=null && !friendsHash[val]) {
			continue;
		}
		if(selected[val]) { continue; }
		var sel=true;
		if(inp.parentNode.parentNode.className=="unselected_list") {
			sel=false;
		}
		if(inp.parentNode.style.display=='none') { continue; }
		if(click(sel,val)) {
			selected[val]=1;
			nHtml.Click(inp.parentNode);
			friendsClicked++;
			if(this.IsTooManySelected()) {
				break;
			}
		}
	}
	return friendsClicked;
},
InviteFriendsPictures:function(div,friendsHash,click) {
	var lis=div.getElementsByTagName('li');
	var selected=0;
	for(var l=0; l<lis.length; l++) {
		var li=lis[l];
		var as=li.getElementsByTagName('a');
		if(as.length<1) { continue; }
		var userid=""+li.getAttributeNode('userid').value;
		if(friendsHash!=null && !friendsHash[userid]) {
			continue;
		}
		if(click(li.className=='selected',userid)) {
			nHtml.Click(as[0]);
			selected++;
			if(this.IsTooManySelected()) {
				break;
			}
		}
	}
	return selected;
},
InviteFriendsClick:function(div,friendsHash,click) {
	if(!this.IsFriendsDivPictures(div)) {
		return this.InviteFriendsCheckBox(div,friendsHash,click);
	}
	return this.InviteFriendsPictures(div,friendsHash,click);
},

IsFriendsDivPictures:function(div) {
	if(div.className.indexOf("condensed_multi_friend_selector")>=0) {
		return false;
	}
	return true;
},
GetFriendsDiv:function() {
	var friends2=nHtml.FindByClassName(document.body,"div","condensed_multi_friend_selector");
	if(friends2) { return friends2; }
	var friends=document.getElementById("friends");
	return friends;
},

DoIFrame:function(url) {
	var f=document.getElementById('FBInvitesFrame');
	if(!f) {
		f=document.createElement('iframe');
		f.style.display='none';
		f.id='FBInvitesFrame';
		document.body.appendChild(f);
	}
	f.src=url;
	return f;
},

previousStr:'this',
InviteFriends:function() {
	if(document.getElementById('InviteFriendRefresh')) {
		// we've already done this page.
		return;
	}

	var friends=this.GetFriendsDiv();
	if(!friends) {
		return false;
	}

	var link=document.createElement('a');
	link.href='javascript:;';
	link.id='InviteFriendRefresh';
	this.previousStr='this';

	var appId=this.GetAppId();
	var oldAppId=GM_getValue('appid','');
	var linkMess=document.createElement('span');
	linkMess.innerHTML='';

	link.innerHTML="&bull; Refresh your list of friends who are using this application.";
	link.title="Go to the 'friends who are using this applications' page. This needs to be done before new friends will be selected here.";
	if(!appId && !oldAppId) {
		linkMess.innerHTML="Need to visit an application's invite page to collect a list of friends first!";
	} else if(!appId) {
		// we're in the facebook friends list or some other non-app thing.
		link.innerHTML="";
		this.previousStr='previous';
	}

	var friendsHash=this.GetFriendsWithApp();
	var appFriendsHash=null;
	if(appId && oldAppId) {
		var lastSync=GM_getValue('FriendsWithAppSyncTime_'+appId,'');
		if(lastSync!='') {
			appFriendsHash=this.GetFriendsWithApp(appId);
			friendsHash=appFriendsHash;
			var lastSyncD=new Date();
			lastSyncD.setTime(lastSync);
			var alertStyle='';
			var now=new Date().getTime();
			if(lastSync<(now-86400*1000*3))  {
				alertStyle="style='color: #f00'";
			}
			linkMess.innerHTML+=" <b "+alertStyle+">Friends list last refreshed on: "+lastSyncD.toString()+"</b><br />";
		} else if(appId!=oldAppId) {
			linkMess.innerHTML+=" <b>Warning! The list of friends are from another app.</b><br />";
			this.previousStr='previous';
		}
	}

	if(appFriendsHash==null && appId) {
		// don't have anything in the memory for this app, first time user...
//		this.VisitFriendsList();
//		link.innerHTML="Important: "+link.innerHTML;
		link.style.fontSize='15pt';
	}
	

	var css=document.createElement('style');
	css.type='text/css';
	css.innerHTML='#InviteFriendsDiv a { color: #008;  } #InviteFriendsDiv a:hover { text-decoration: underline; }';
	document.getElementsByTagName('head')[0].appendChild(css);

	var managementDiv=document.createElement('div');
	managementDiv.innerHTML="You can also grab the users from any page via the greasemonkey icon under 'user script commands'<br />";
	if(appId) {
		// we're in an app, not facebook. let's hide the friends management section.
		managementDiv.style.display='none';
	}
	managementDiv.style.marginLeft='10px';
	var managementLink=document.createElement('a');
	managementLink.innerHTML='&bull; Friends management';
	managementLink.title='Open up the friends management area.  More functions to handle friends ';
	managementLink.addEventListener('click',function() {
		managementDiv.style.display=managementDiv.style.display=='none'?'block':'none';
	},false);

	var linkDiv=document.createElement('div');
	this.messObj=document.createElement("div");
	this.messObj.style.fontSize='14pt';
	linkDiv.id='InviteFriendsDiv';
	linkDiv.appendChild(this.messObj);
	linkDiv.appendChild(linkMess);
	linkDiv.appendChild(link);
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(managementLink);
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(managementDiv);
	linkDiv.style.border='2px solid #888';
	linkDiv.style.padding='4px';
	linkDiv.style.color='#444';
	linkDiv.style.backgroundColor='#fff';	

	var clearLink=document.createElement('a');
	clearLink.href='javascript:;';
	clearLink.id='InviteFriendClear';
	clearLink.innerHTML='Deselect';

	var selectAllLink=document.createElement('a');
	selectAllLink.innerHTML='Select';

	var bull=document.createElement("font")
	bull.innerHTML="&bull; ";
	linkDiv.appendChild(bull);
	linkDiv.appendChild(selectAllLink);
	linkDiv.appendChild(document.createTextNode(" / "));
	linkDiv.appendChild(clearLink);
	linkDiv.appendChild(document.createTextNode(" all friends."));
	linkDiv.appendChild(document.createElement("br"));

	var removeLink=document.createElement('a');
	removeLink.innerHTML='Deselect';
	var unionLink=document.createElement('a');
	unionLink.innerHTML='Join';
	unionLink.title='Only select friends using '+this.previousStr+' application and friends currently selected here.';

	var addLink=document.createElement('a');
	addLink.innerHTML='Select';
	var bull=document.createElement("font")
	bull.innerHTML="&bull; ";
	managementDiv.appendChild(bull);
	managementDiv.appendChild(addLink);
	managementDiv.appendChild(document.createTextNode(" / "));
	managementDiv.appendChild(removeLink);
	managementDiv.appendChild(document.createTextNode(" / "));
	managementDiv.appendChild(unionLink);
	managementDiv.appendChild(document.createTextNode(' Friends from the current list.'));

	var copyLink=document.createElement('a');
	copyLink.innerHTML='&bull; Use the selected friends below as the current list.';
	managementDiv.appendChild(document.createElement("br"));
	managementDiv.appendChild(copyLink);

	var useBufferLink=null;
	if(appFriendsHash!=null) {
		useBufferLink=document.createElement('a');
		useBufferLink.innerHTML="&bull; Use the previous application's friends list for select/deselect/join.";
		managementDiv.appendChild(document.createElement("br"));
		managementDiv.appendChild(useBufferLink);
	}

	joinRecentLink=document.createElement('a');
	joinRecentLink.innerHTML="&bull; Only include friends who are also in the first page of 'recently added friends'.";
	linkDiv.appendChild(joinRecentLink);
	linkDiv.appendChild(document.createElement("br"));

	var randomLink=document.createElement('a');
	randomLink.href='javascript:;';
	randomLink.innerHTML='&bull; Add random friends who are using '+this.previousStr+' application.';
	linkDiv.appendChild(randomLink);

	var detachLink=document.createElement('a');
	detachLink.innerHTML='&bull; Move this block to the top';
	detachLink.title="If you're having visibility problems";
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(detachLink);


	var contentDiv=document.getElementById('content');
	var randomDialog=document.createElement('div');
	randomDialog.innerHTML="<br /><br /><form><input type='checkbox' id='AddRandomFriendsAnyFriends' />Add any friends, not just people who're using the app.<br />Friends to add: <input id='AddRandomFriendsNum' size='4' value='1' /><input id='AddRandomFriendsButton' type='button' value='Add Random Friends' /></form>";
	randomDialog.style.border="2px solid #888";
	randomDialog.style.padding='4px';
	randomDialog.style.position='fixed';
	randomDialog.style.backgroundColor='#fff';
	randomDialog.style.color='#000';
	randomDialog.style.left=0;
	randomDialog.style.top=0;
	randomDialog.style.display="none";
	contentDiv.appendChild(randomDialog);

	var randomButton=document.getElementById('AddRandomFriendsButton');


	if(!this.IsFriendsDivPictures(friends)) {
		friends.parentNode.insertBefore(linkDiv,friends);
	} else {
		friends.parentNode.insertBefore(linkDiv,friends);
	}
	link.addEventListener('click',function() { FacebookInvites.VisitFriendsList(); },false);

	copyLink.addEventListener('click',function() { 
		var friendsList=[];
		friendsHash={};
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) { 
			if(c) {
				friendsHash[id]=1; 
				friendsList.push(id); 
			}
			return false; 
		});
		var friendsListStr=friendsList.join(',');
		GM_setValue('FriendsWithApp',friendsListStr);
		FacebookInvites.SetMessage("The list we're using now has "+friendsList.length+" friends.");
	},false);
	selectAllLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c) { return c?false:true; });
	},false);
	clearLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c) { return c?true:false; });
	},false);
	removeLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,friendsHash,function(c) { return c?true:false; });
	},false);
	unionLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) { 
			if(c) return friendsHash[id]?false:true;
			return false;
		});
	},false);

	if(useBufferLink!=null) {
		useBufferLink.addEventListener('click',function() { 
			friendsHash=FacebookInvites.GetFriendsWithApp();
			FacebookInvites.CalcInvitedHash(friendsHash);
		},false);
	}

	joinRecentLink.addEventListener('click',function() { 
		// visit recent added friends in iframe, 
		var iframe=FacebookInvites.DoIFrame('http://www.facebook.com/friends/?added&ref=tn');

		GM_log('Waiting for recent friends to load');
		unsafeWindow.joinRecentLoadedLink=function() { 
			GM_log('Recent friends loaded');
			var recentFriends=FacebookInvites.GetFriendsFromPage(iframe.contentDocument.body);
			var ids=[];
			for(var id in friendsHash) { ids.push(id); }
			var t=0;
			ids.forEach(function(id) {
				if(!recentFriends[id]) {
					friendsHash[id]=undefined;
				} else {
					t++;
				}
			});
			FacebookInvites.InviteFriendsClick(friends,null,function(c) {
				if(c) {
					return true; 
				}
			});
			FacebookInvites.InviteFriendsClick(friends,null,function(c,id) {
				var r=friendsHash[id]?true:false;
				if(c) { r=r?false:true; GM_log('huh? something is still selected?'); }
				return r;
			});
			FacebookInvites.SetMessage("The list we're using now has "+t+" friends.");
			iframe.src='about:blank';
			document.body.removeChild(joinRecentLoadedLink);
		};
	},false);
	addLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,friendsHash,function(c) { return c?false:true; });
	},false);
	randomLink.addEventListener('click',function() {
		randomDialog.style.display='block';
	},false);
	detachLink.addEventListener('click',function() {
		FacebookInvites.DetachDiv();
	},false);


	randomButton.addEventListener('click',function() {
		randomDialog.style.display='none';
		var randomNum=document.getElementById('AddRandomFriendsNum');
		var wanted=parseInt(randomNum.value);
		var friendsHashRandom={};
		var added=0;

		var anyFriends=document.getElementById('AddRandomFriendsAnyFriends').checked;
		var friendsInDialog={}; // friends that are not selected in the dialog
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) {  if(!c) { friendsInDialog[id]=1; } return false; } );

		var friendsArr=[];
		var hashToUse=friendsHash;
		if(anyFriends) {
			hashToUse=friendsInDialog;
		}
		for(var f in hashToUse) {
			friendsArr.push([f,Math.random()]);
		}

		friendsArr.sort(function(a,b) { return a[1]-b[1]; });

		for(var fUpto=0; fUpto<friendsArr.length; fUpto++)
		{
			if(added>=wanted) {
				break;
			}
			var f=friendsArr[fUpto][0];
			if(!friendsInDialog[f]) { continue; }
			friendsHashRandom[f]=""+friendsHash[f];
			added++;
		}
		FacebookInvites.InviteFriendsClick(friends,friendsHashRandom,function(c,id) { GM_log('fff'+id+","+c); return c?false:true; });
	},false);


	window.friendsWithAppId=oldAppId;
	this.CalcInvitedHash(friendsHash);
	this.InviteFriendsClick(friends,friendsHash,function(c,id) { 
		var r=c?false:true;

		if(!appId) {
			// can't find app id, we're in facebook, lets' not auto add all the friends.
			return false;
		}
		return r;
	});
	return true;
},

GetInviteFriendsDiv:function() {
	return document.getElementById('InviteFriendsDiv');
},
DetachDiv:function() {
	var linkDiv=this.GetInviteFriendsDiv();
	if(!linkDiv) { return; }
	linkDiv.style.position='fixed';
	linkDiv.style.left=0;
	linkDiv.style.top='24px';
},
CalcInvitedHash:function(friendsHash) {
	var friendsDiv=this.GetFriendsDiv();
	var totalFriendsWithApp=0;
	for(var f in friendsHash) {
		totalFriendsWithApp++;
	}
	var invited=0;
	var invitedHash={};
	var friendsInInviteDialog={};
	this.InviteFriendsClick(friendsDiv,null,function(c,id) { 
		if(friendsHash[id]) {
			var r=c?false:true;
			if(r) invitedHash[id]=1;
			if(r) { invited++; }
		}
		friendsInInviteDialog[id]=1;
		return false;
	});
	window.friendsWithAppList=friendsHash;
	window.friendsWithAppNotInvited=invitedHash;
	window.friendsInInviteDialog=friendsInInviteDialog;
	this.SetMessage(" (Friends with "+this.previousStr+"  application that you can invite:"+invited+" out of "+totalFriendsWithApp+")");
},


idRe:new RegExp('[^a-z]id=([0-9]+)','i'),
GetAppId:function() {
	var builtBy=nHtml.FindByClassName(document.body,"span","page_built_by");
	if(!builtBy) { return null; }
	var as=builtBy.getElementsByTagName("a");
	if(as.length>0) {
		var m=this.idRe.exec(as[0].href);
		if(m && m.length>0) {
			var id=m[1];
			return id;
		}
	}
	return null;
},

VisitFriendsList:function() {
	var appid=this.GetAppId();
	GM_setValue('appid',appid);
	GM_setValue('FriendsWithApp','');
	GM_setValue('InviteUrl',document.location.href);

	document.location.href="http://www.facebook.com/s.php?k=100004000&app_id="+appid;
	return true;
},

GetFriendsWithApp:function(appId) {
	var friends=GM_getValue('FriendsWithApp'+(appId!=undefined?("_"+appId):''),'').split(/,/);
	var friendsHash={};
	for(var f=0; f<friends.length; f++) {
		var n=friends[f];
		if(n=="") { continue; }
		friendsHash[n]=1;
	}
	return friendsHash;
},

AddFriendsWithApp:function() {
	var inviteUrl=GM_getValue('InviteUrl','');
	if(inviteUrl=='') { return; }
	var content=document.getElementById('content');
	if(!content) { return; }
	var as=content.getElementsByTagName('a');
	var nextUrl=null;
	var friends=this.GetFriendsWithApp();
	var ss=document.evaluate("//a[contains(@href,'/s.php') and contains(@href,'s=')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(ss.snapshotLength>0) {
		var lastpager=ss.snapshotItem(ss.snapshotLength-1);
		var numberRe=/^[\\s0-9]+$/;
		if(!numberRe.exec(lastpager.innerHTML)) {
			// we still have a "next" button.
			nextUrl=lastpager.href;
		}
	}

	var friendsAdded=0;
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
		if(a.href.indexOf("/profile.php")<0) {
			continue;
		}
		var id;
		var m=this.idRe.exec(a.href);
		if(m && m.length>0) {
			id=m[1];
		} else { continue; }
		if(friends[id]) { continue; }
		var name=a.innerHTML;
		friends[""+id]=1;
		friendsAdded++;
	}

	var friendsListStr=this.SaveFriendsFromHash(friends);

	var appid=GM_getValue('appid',0);
	GM_setValue('FriendsWithApp_'+appid,friendsListStr);
	GM_setValue('FriendsWithAppSyncTime_'+appid,(new Date()).getTime().toString() );

	if(nextUrl!=null) {
		nHtml.VisitUrl(nextUrl);
	} else {
		// cannot find "next" button, lets go back to app.
		GM_setValue('InviteUrl','');
		nHtml.VisitUrl(inviteUrl);
	}
	return friendsAdded>0?true:false;
},
SaveFriendsFromHash:function(friends) {
	var friendsList=[];
	for(var n in friends) {
		if(n=="") {continue; }
		friendsList.push(n);
	}
	var friendsListStr=friendsList.join(',');
	GM_setValue('FriendsWithApp',friendsListStr);
	return friendsListStr;
},


StartBulkAddMe:function() {
	this.addMeUpto=0;
	this.RestartAddMe();
},

AddMeLink:function(lp) {
	if(document.getElementById("AddMeLinkDiv")) { return; }
	if(!lp) lp=document.getElementById("all_threads");
//	if(!lp) {   lp=document.getElementById("see_all_posts"); }
	if(!lp) {
		return false;
	}
	var div=document.createElement('div');
	div.id='AddMeLinkDiv';
	var autoBulkAdd=FacebookInvites.GetAutoBulkAdd();
	div.innerHTML="<form id='BulkAddMe'>Comment:<textarea id='bulkAddComment' name='comment' cols='40' rows='4' /></textarea><br />"+
		"Friend List:<input id='bulkAddFriendList' />(exactly with capital letters)<br />"+
		"<input id='bulkAddDelay'  value='10' size='4' />seconds between adds<br />"+
		"<input type='checkbox' id='BulkAddNewsFeed' />Publish to news feed<br />"+
		"<input type='checkbox' id='BulkAddMeButtonPages' />Bulk add everyone here and the previous pages of this discussion board<br />"+
		"<input type='checkbox' id='testBulkAddMeButton' title='Test Only, do not add, just go through the process.' />Test only<br />"+
		"<input type='checkbox' id='BulkAddIgnoreErrors' />Ignore errors, continue even when facebook returns an errors<br />"+
		"<input type='button' id='BulkAddMeButton' value='Bulk Add Everyone here' /><br />"+
		"<input type='button' id='BulkAddMeProfileButton' value='"+(autoBulkAdd?"Disable ":"Enable")+" auto add on profile Page' title='Useful for pages that do not have the add friend feature or is outside of facebook.' />(Once enabled, you can click with the middle mouse button on any profile link to add them)<br />"+
		"</form>";
	div.style.border='1px solid #000';
	div.style.padding='10px';
	lp.parentNode.insertBefore(div,lp);

	var bulkAddMeButton=document.getElementById('BulkAddMeButton');
	bulkAddMeButton.addEventListener('click',function() {
		FacebookInvites.StartBulkAddMe();
	},false);

	var bulkAddMeProfile=document.getElementById('BulkAddMeProfileButton');
	bulkAddMeProfile.addEventListener('click',function() {
		FacebookInvites.SetAutoBulkAdd(autoBulkAdd?false:true);
	},false);

	return true;
},


AddMeLinkAnyPage:function() {
	if(document.getElementById("AddMeLinkDiv")) { return; }
	var content=document.getElementById('content');
	var p=document.createElement('p');
	p.innerHTML="<br /><br />";
	content.insertBefore(p,content.childNodes[0]);
	return FacebookInvites.AddMeLink(content.childNodes[1]);
},


RestartAddMe:function() {
	if(this.bulkAddMeTimeout!=null) {
		window.clearTimeout(this.bulkAddMeTimeout);
		this.bulkAddMeTimeout=null;
	}
	this.SetWaitForAddMe(null);
	this.addMeDone={};
	var o={};
	o.friendList=document.getElementById('bulkAddFriendList').value.trim();
	o.comment=document.getElementById('bulkAddComment').value;
	o.delay=document.getElementById('bulkAddDelay').value;
	o.testAddMe=document.getElementById('testBulkAddMeButton').checked;
	o.ignoreErrors=document.getElementById('BulkAddIgnoreErrors').checked;
	o.doPrevPages=document.getElementById('BulkAddMeButtonPages').checked;
	o.newsFeed=document.getElementById('BulkAddNewsFeed').checked;
	this.bulkAddOptions=o;

	this.BulkAddMe();
},

HasAddFriendDialog:function(a) {
	var addFriendDialog=false;
	if(a.href && a.href.indexOf('profile')>=0) {
		addFriendDialog=true;
	}
/*
	var oncl=a.getAttribute('onclick');
	if(oncl && oncl.indexOf('show_addfriend_dialog')>=0) {
		addFriendDialog=true;
	}
*/
	return addFriendDialog;
},

FindNthPost:function(nth) {
	var as=document.getElementsByTagName('a');
	var upto=0;
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
		var addFriendDialog=this.HasAddFriendDialog(a);

		if(!addFriendDialog && a.href.indexOf('k=')<0) { 
			// this person is already our friend.
			continue; 
		}

		// author_post: used in discussions
		// profile_link: used in reviews
		if(!addFriendDialog && a.className!="author_post" && a.className!="profile_link") {
			continue; 
		}
		if(a.parentNode.className.indexOf("fb_menu")>=0 || a.innerHTML.indexOf('<img')>=0) {
			continue;
		}
		var pn=a;
		var presence=false;
		while(pn && pn.tagName!="BODY") {
			if(pn.id=="presence") {
				presence=true;
			}
			pn=pn.parentNode;
		}
		if(presence) { continue; }
		if(nth==upto++) { return a; }
	}
	return null;
},


ClickFriendListDropDown:function() {
	var friendAdd=nHtml.FindByAttr(document,'span','class','FriendAddingTool_Menu');
	if(friendAdd) {
		var friendAddDropDown=nHtml.FindByAttr(friendAdd,'span','class','UIActionMenu_Text');

		// show the drop down for friends' lists
		if(friendAddDropDown) {
			nHtml.ClickUp(friendAddDropDown);
		} else {
			GM_log('cannot find friend list drop down');
		}
	} else {
		GM_log('cannot find the friends list drop down');
	}
},
GetFriendListDropDown:function(div) {
	if(!div) { GM_log('GetFriendListDropDown: no div'); }
	return nHtml.FindByAttr(div,'div','class','FriendAddingTool_InnerMenu');
},
SelectFriendListDropDown:function(friendAddSelect,friendList) {
	if(!friendAddSelect) { GM_log('Bad!, no friendAddSelect'); }
	var friendListItem=nHtml.FindByXPath(friendAddSelect,".//a[string()='"+friendList+"']");
	if(friendListItem) {
		nHtml.ClickUp(friendListItem);
	}
},

SkipButton:function() {
	// skip reported suggest a friend dialogs from facebook.
	var skip=document.getElementById('skip');
	if(skip && skip.tagName=="INPUT") { 
		GM_log('Clicking skip button');
		nHtml.Click(skip);
		return true;
	}
	return false;
},

SetWaitForAddMe:function(v) {
	this.waitForAddMe=v;
	this.waitForAddMeStarted=(new Date()).getTime();	
},
BulkAddMe:function() {
	var waitMillis=150;
	var error=document.getElementById('error');
	if(error && !this.bulkAddOptions.ignoreErrors) {
		var visible=true;
		while(error.tagName!="BODY") {
			if(error.style.display=="none") {
				visible=false;
				break;
			}
			error=error.parentNode;
		}
		if(visible) {
			
			GM_log('Error found, bulk add aborted');
			this.SetAutoBulkAdd(false);
			return;
		}
	}
//GM_log(this.waitForAddMe+","+this.addMeUpto);
	var captcha=document.getElementById('captcha_session');
	var popDialog=document.getElementById("pop_content");
	if(this.SkipButton()) {
		// LoveYou43v3r reported that it got stuck in some skip dialogs.
		waitMillis=10000;
	} else if(captcha && popDialog) {
		// yuck captcha, wait for the user to do something.
		waitMillis=2000;
	} else if(this.waitForAddMe=="add") {
		if(popDialog) {
			var a=nHtml.FindByXPath(popDialog,".//a[contains(@href,'/addfriend.php')]");
			if(!a) {
				// maybe we've already added this friend.
				var close=nHtml.FindByAttr(popDialog,"input","name","close");
				if(close) {
					this.waitForAddMe=null;
					nHtml.Click(close);
				} else {
					GM_log('waiting for add friend popup');
				}
			} else {
				nHtml.Click(a);
				this.SetWaitForAddMe("message");
			}
		}
	} else if(this.waitForAddMe=="message") {
		var add=null;
		if(popDialog) {
			add=nHtml.FindByAttr(popDialog,"input","name",'connect');
			var ok=nHtml.FindByAttr(popDialog,"input","name",'ok');
			
			var ss=document.evaluate(".//input",popDialog,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if(ss.snapshotLength==1 && ok) {
				// maybe the you are already connected message, just click ok
				GM_log('Click ok button');
				nHtml.Click(ok);
			}
		}
		if(popDialog && add) {
			var friendAddSelect=this.GetFriendListDropDown(document);
			var friendList=this.bulkAddOptions.friendList;
			if(!friendAddSelect && friendList.length>0) {
				this.ClickFriendListDropDown();
			} else {
				if(friendList.length>0) {
					this.SelectFriendListDropDown(friendAddSelect,friendList);
				}
				var newsFeed=nHtml.FindByXPath(popDialog,".//input[contains(@id,'news_feed_')]");
				newsFeed.checked=this.bulkAddOptions.newsFeed;

				var showComment=nHtml.FindByXPath(popDialog,".//a[contains(@onclick,'showMessage')]");
				nHtml.Click(showComment);
				var tas=popDialog.getElementsByTagName('textarea');
				if(tas.length>0) {
					tas[0].value=this.bulkAddOptions.comment;
				}
				var messLink=nHtml.FindByXPath(popDialog,".//a[contains(@onclick,'addMsgBox')]");
				if(messLink) {
					nHtml.Click(messLink);
				}
				if(this.bulkAddOptions.testAddMe) {
					add=nHtml.FindByAttr(popDialog,"input","name","cancel");
				}
				if(add) {
					var delay=this.bulkAddOptions.delay;
					this.SetWaitForAddMe(null); 
					// this means that it goes into the else loop after clicking on connect which means that it ignores the "already connected" error
					// therefore i've added the code to click on already connected in the else part of the if statement
					waitMillis=1000*delay;
					window.setTimeout(function() {
						nHtml.Click(add);
					},this.bulkAddOptions.testAddMe?1500:0);
				}
			}
		}
		if(this.waitForAddMe=="message" && (this.waitForAddMeStarted+15000)<  ((new Date()).getTime()) ) {
			var b1=document.getElementById('dialog_button1');
			var b2=document.getElementById('dialog_button2');
			if(b1 && !b2) {
				GM_log('We are already friends with this person');
				nHtml.Click(b1);
			} else {
				// 15 secs is up, still no dialog found.
				GM_log('Skipping this user cause no add friend dialog is showing up.');
			}
			this.SetWaitForAddMe(null);
		}
	} else 	{
		while(1) {
			if(this.addMeUptoMax>0 && this.addMeUpto>=this.addMeUptoMax) {
				GM_log('FinishedBulkAddMe, max added:'+this.addMeUptoMax);
				return;
			}
			var a=this.FindNthPost(this.addMeUpto++);
			if(a==null) {
				if(!this.BulkAddMePrevPage()) {
					this.SetAutoBulkAdd(false);
					GM_log('FinishedBulkAddMe');
					return;
				}
				this.addMeUpto=0;
				waitMillis=12000;
				break;
			}
    //error checking for already connected dialog - added by VX
		var add=null;
		if(popDialog) {
			add=nHtml.FindByAttr(popDialog,"input","name",'connect');
			var ok=nHtml.FindByAttr(popDialog,"input","name",'ok');
			
			var ss=document.evaluate(".//input",popDialog,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if(ss.snapshotLength==1 && ok) {
				// maybe the you are already connected message, just click ok
				GM_log('Click ok button');
				nHtml.Click(ok);
			}
			//click cancel on old dialog
    	popDialog=document.getElementById("pop_content");
		  if(popDialog) {
		    var cancel=nHtml.FindByAttr(popDialog,"input","name","cancel");
		    nHtml.Click(cancel);
		  }
		}
		// finished edit by vx
//			var hasAddFriendDialog=this.HasAddFriendDialog(a);
//			var ref=hasAddFriendDialog?a.getAttribute('onclick'):a.href;
			var ref=a.href;
			var idm=this.idRe.exec(a.href);
			if(!idm) { continue; }

			if(this.addMeDone[ref]) { continue; }
			this.addMeDone[ref]=1;

			this.ShowAddFriendDialog(idm[1]);
			this.SetWaitForAddMe("message");
			this.waitForAddMeStarted=(new Date()).getTime();
/*
			nHtml.Click(a);
			if(hasAddFriendDialog) {
				this.waitForAddMe="message";
			} else {
				this.waitForAddMe="add";
			}
*/
			break;
		}
	}
	if(this.bulkAddOptions.testAddMe && waitMillis<2000) { waitMillis=2000; }
	this.bulkAddMeTimeout=window.setTimeout(function() { FacebookInvites.BulkAddMe(); },waitMillis);
},

ShowAddFriendDialog:function(uid) {
/*
	if(!unsafeWindow.show_addfriend_dialog) {
		GM_log('no add friend dialog available, lets go to the profile page:'+uid);
		GM_openInTab('http://www.facebook.com/profile.php?id='+uid);
		this.SetMessage('Facebook has not included the javascript to add friends from this page, have to open the profile page in a new tab.'+
			"Enable auto add on the profile page if you have not done it.");
	} else 
*/
{
		var a=document.createElement('script');
		GM_log('showfriend:'+uid);
		a.innerHTML='new ConnectDialog("'+uid+'", "friend_other", null, this, 0, "", -1.000000, "", "").show();';
//		a.innerHTML='show_addfriend_dialog("'+uid+'", this, undefined, undefined, undefined, undefined, undefined, "profile_others");';
		document.body.appendChild(a);
	}
},

BulkAddMePrevPage:function() {
	if(!this.bulkAddOptions.doPrevPages) {
		return false;
	}
	var ss=document.evaluate("//a[contains(@onclick,'start')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	var numberRe=/^[\\s0-9]+$/;
	var onclickRe=new RegExp("start[\"\\s]*:\\s*[0-9]+");
	var foundUpto=0;
	var firstPagerLink=null;

	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		var oncl=a.getAttribute('onclick');
		if(!oncl) { continue; }
		if(!onclickRe.exec(oncl)) {
			continue;
		}
		if(numberRe.exec(a.textContent)) {
			if(foundUpto>0) {
				// only 1 pager link, it must be "prev" on the 2nd page, there won't be a "first" link.
				nHtml.Click(firstPagerLink);
				return true;
			}
			break;
		}
		if(foundUpto==0) {
			firstPagerLink=a;
		}
		if(foundUpto==1) {
			// the 2nd pager link with text
			nHtml.Click(a);
			return true;
		}
		foundUpto++;
	}
	GM_log('No previous link found');
	return false;
},

ClearFriendsBuffer:function() {
	this.SetMessage("0 Friends in the current list.");
	this.SaveFriendsFromHash({});
},

GetFriendsFromPage:function(doc,profileRe) {
	var as=doc.getElementsByTagName('a');
	var imgRe=new RegExp("http://profile.ak.facebook.com/.*/[a-z]([0-9]+)_.*\\.jpg");
	if(!profileRe) {
		profileRe=new RegExp('.facebook.com.*profile.php.*id=([0-9]+)');
	}
	var friendsFromPage={};
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
		var ppid=a.parentNode.parentNode.id;
		var ppclass=a.parentNode.parentNode.className;
		// ignore profile links in the status update and notifications areas.
		if(ppid.indexOf('notification_')>=0 || ppclass=='status_updates' || a.parentNode.className=='fb_menu_title' || a.parentNode.id=='friend_guesser') { continue; }
		var profileM=profileRe.exec(unescape(a.href));

		var id=null;
		if(profileM && profileM.length>1) {
			id=profileM[1];
		} else {
			var imgs=a.getElementsByTagName('img');
			if(imgs && imgs.length>0) {
				var imgM=imgRe.exec(imgs[0].src);
				if(imgM && imgM.length>1) {
					id=imgM[1];
				}
			}
		}
		if(id && !friendsFromPage[id]) {
			GM_log('add friend to list:'+id);
			friendsFromPage[id]=1;
		}
	}
	return friendsFromPage;
},

/*
ShowAddFriendsFromPage:function() {
	var div=document.createElement('div');
	div.style.position='fixed';
	div.style.left=0;
	div.style.top=0;
	div.innerHTML="<form>"+
		"Next button: <input value='.facebook.com.*profile.php.*id=([0-9]+)' id='AddFriendsFromPageButton' />"+
		"<input type='button' value='Go' id='AddFriendsFromPageButton' /><br /></form>";
	document.body.appendChild(div);
	var AddFriendsFromPageButton=document.getElementById('AddFriendsFromPageButton');
	AddFriendsFromPageButton.addEventListener(function() {
		var re=new RegExp(document.getElementById('AddFriendsFromPageButton').value);
		FacebookInvites.GetFriendsFromPage(re,true);
	},false);
},
*/

// add friends from any page
AddFriendsFromPage:function(info) {
	if(info.pageUpto==undefined) {info.pageUpto=0; }
	var friends=this.GetFriendsWithApp();
	var addedFriends=0;
	var friendsFromPage=this.GetFriendsFromPage(info.doc,info.profileRe);
	for(var id in friendsFromPage) {
		if(!friends[id]) {
			friends[id]=1;
			addedFriends++;
		}
	}

	this.SaveFriendsFromHash(friends);
	var totalFriends=0; for(var f in friends) { totalFriends++; }
	GM_log('added '+addedFriends);
	this.SetMessage("Added "+addedFriends+" to the current list, total:"+totalFriends);
	if(info.doNextPage) {
		var nextPage=nHtml.FindByXPath(document,".//a[contains(@class,'UIPager_ButtonForward')]");

		if(nextPage) {
			nHtml.Click(nextPage);
			if(nextPage.parentNode.className.indexOf('Disabled')>=0) {
				// no more next buttons
				GM_log("No more next page buttons");
				info.doNextPage=false;
			}
		} else {
			var ss=document.evaluate("//a[contains(@onclick,'b:appfriends')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if(ss && ss.snapshotLength>0) {
				var lastItem=ss.snapshotItem(ss.snapshotLength-1);
				var numberRe=/^[\\s0-9]+$/;
				var m=numberRe.exec(lastItem.innerHTML.trim());
				if(!m) {
					// last one is not a number so it's a "next" button.
					nHtml.Click(lastItem);
				} else {
					GM_log("No more next page buttons");
					info.doNextPage=false;
				}
			} else if(info.pageUpto==0) {
				// we can't even find a next button on the first page, let's not click 'next'
				GM_log('No next button on first page, do not do multiple pages.');
				info.doNextPage=false;
			}
		}
		if(info.doNextPage) {
			GM_log('Wait for Next button');
			window.setTimeout(function() {
				info.pageUpto++;
				FacebookInvites.AddFriendsFromPage(info);
			},2000);
		}
	}
},


//////////////////////////////////////

profileIdRe:new RegExp('id=([0-9]+)'),

IterateButtons:function(func) {
	var ss=document.evaluate("//*[contains(@class,'confirm_boxes') or contains(@class,'inputbutton') or @class='confirm']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var info={
		'func':func,
		'ss':ss,
		'sUpto':0,
		'currentApp':'Unknown',
		'currentAname':'',
		'confirmUpto':0,
		'nthButton':0
	}
	this.IterateButtonsNext(info);
},

IterateButtonsNext:function(info) {
	var donext=this.IterateButtonsNext2(info);
	if(donext)
		this.IterateButtonsNext(info);
},

IterateButtonsNext2:function(info) {
//	var ss=document.evaluate("//*[contains(@class,'confirm_boxes') or contains(@class,'inputbutton') or @class='confirm']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//	var currentApp='Unknown';
//	var currentAname='';
//	var confirmUpto=0;
//	var nthButton=0;

	var ss=info.ss;
	if(info.sUpto>=ss.snapshotLength) { return; }

//	for(var s=0; s<ss.snapshotLength; s++) {
	var sObj=ss.snapshotItem(info.sUpto);
	info.sUpto++;

	if(sObj.className.indexOf('BulkAddButton')>=0) {
		return true;
	}
	if(sObj.className=='confirm') {
		info.nthButton=0;
		info.confirmUpto++;
		return true;
	}
	if(sObj.className.indexOf('confirm_boxes')>=0) {
		var aname=sObj.id;
		var spans=sObj.getElementsByTagName('span');
		if(spans.length>0) {
			info.currentApp=spans[0].textContent.trim();
			info.currentAname=aname;
		}
		return true;
	}

	var buttonValue=sObj.value;
	var parent=sObj.parentNode;
	while(parent && (parent.className==undefined || parent.className.indexOf('info')<0)) {
		parent=parent.parentNode;
	}
	var profileHref=null;
	var profileId=null;
	if(parent) {
		profileHref=nHtml.FindByXPath(parent,".//a[contains(@href,'profile.php')]");

		if(profileHref) {
			var pm=this.profileIdRe.exec(profileHref.href);
			if(pm && pm.length>1) {
				profileId=pm[1];
			}
			var nameInfo=profileHref.innerHTML.trim().split(new RegExp('\\s+'),2);
			buttonValue=buttonValue.replace(profileHref.innerHTML+"'s",'');
			buttonValue=buttonValue.replace(profileHref.innerHTML,'');
			buttonValue=buttonValue.replace(nameInfo[0]+"'s",'');
			buttonValue=buttonValue.replace(nameInfo[0],'');
			
		}
	} else {
		GM_log('Cannot find parent to button: '+sObj.value);
	}

	var donext=false;
	if(sObj.className.indexOf('inputbutton')>=0) {
		donext=info.func(
			{
			'aname':info.currentAname,
			'app':info.currentApp,
			'obj':sObj,
			'info':info,
			'value':buttonValue,
			'parent':parent,
			'profileId':profileId,
			'confirmUpto':info.confirmUpto,
			'nthButton':info.nthButton
		});
	}
	info.nthButton++;

	return donext;
},

IsTest:function() {
	var testBox=document.getElementById('BulkRequestsTest');
	if(!testBox) { return false;  }
	var test=testBox?testBox.checked:false;
	return test;
},

ClickAutoAcceptButton:function(obj) {
	if(this.IsTest()) {
		obj.style.border='3px solid #f00';
	} else {
		var onclick=obj.getAttribute('onclick');
		if(onclick && document.getElementById('BulkRequestsNewTab').checked) {
			var platformRe=new RegExp("click_add_platform_app[^;]+'(http[^']+)'");
			var m=platformRe.exec(onclick);
			if(m) {
				var url=m[1];
				GM_openInTab(url);
			}
		}
		nHtml.Click(obj);
	}
},

ClickAutoAccept:function(e) {
	var target=e.target;
	var appInfo=target.parentNode.id.split('_',2);
	var app=appInfo[1];
	app=unescape(app);
	var nth=null;
	var button=null;
	var byText=null;

	if(target.id=='BulkClickByTextButton') {
		byText=document.getElementById('BulkClickByText').value.toLowerCase();
	} else {
		if(e.target.value.substring(e.target.value.length-6)=='button') {
			var nthM=/^([0-9]+)/.exec(e.target.value);
			nth=parseInt(nthM[1])-1;
		} else {
			var buttonInfo=e.target.value.split(' x ',2);
			button=buttonInfo[1];
		}
	}
	var friendsClicked={};
	this.IterateButtons(function(info) {
		FacebookInvites.SkipButton();
		var ok=false;
		if(byText!=null && info.value.toLowerCase().indexOf(byText)>=0) {
			ok=true;
		}
		if(( 
			(app==FacebookInvites.allAppsId || info.app==app) 
			&& (info.value==button || info.nthButton==nth)
		) || ok) {
			if(info.profileId) {
				friendsClicked[info.profileId]=1;
			}

			var friendList=document.getElementById('AcceptFriendList').value;
			var friendAddSelect=FacebookInvites.GetFriendListDropDown(info.parent);
			if(friendList.length>0) {
				FacebookInvites.ClickFriendListDropDown(friendAddSelect);
				window.setTimeout(function() {
					// wait for the drop down.
					friendAddSelect=FacebookInvites.GetFriendListDropDown(info.parent);
					if(friendAddSelect) {
						// we have a drop down
						FacebookInvites.SelectFriendListDropDown(friendAddSelect,friendList);
					}
					window.setTimeout(function() {
						FacebookInvites.ClickAutoAcceptButton(info.obj);
						FacebookInvites.IterateButtonsNext(info.info);
					},1000);
				},3000);
				return false;
			}

			FacebookInvites.ClickAutoAcceptButton(info.obj);
		}
		return true;
	});
	this.SaveFriendsFromHash(friendsClicked);
},

ClickBlockButton:function() {
	var blockDiv=nHtml.FindByXPath(document,".//div[contains(@class,'dialog_buttons')]");
	if(!blockDiv) { return; }
	var block=nHtml.FindByXPath(blockDiv,".//input[@type='button']");
	if(block) {
		GM_log('block button pressed');
		nHtml.Click(block);
		return true;
	}
	return false;
},
SetBlockUpto:function(clicked,s) {
	var clickedStr='';
	for(var click in clicked) {
		clickedStr+=click+"###";
	}
	GM_setValue('blockLinkClicked',clickedStr);
	GM_setValue('blockLinkUpto',s);
},
GetBlockUpto:function(clicked) {
	var clickedStr=GM_getValue('blockLinkClicked','');
	var clickedArr=clickedStr.split('###');
	for(var c=0; c<clickedArr.length; c++) {
		clicked[clickedArr[c]]=1;
	}
	return GM_getValue('blockLinkUpto',-1);
},
BlockAllApps:function() {
	var clicked={};
	var s=this.GetBlockUpto(clicked);
	if(s<0) { return; }

	var stopBlockAll=document.getElementById('StopBlockAllApps');
	if(!stopBlockAll) {
		this.SetMessage("<a id='StopBlockAllApps'>Stop block all applications</a>");
		stopBlockAll=document.getElementById('StopBlockAllApps');
		stopBlockAll.addEventListener('click',function() {
			FacebookInvites.SetBlockUpto({},-1);
		},false);
	}

	var s=0;

	var test=this.IsTest();
	var ss=document.evaluate("//a[contains(@onclick,'block_app_dialog')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var obj=null;
	while(1) {
		if(s>=ss.snapshotLength) {
			this.SetMessage('Done block all');
			this.SetBlockUpto({},-1);
			window.setTimeout(function() {
				this.ClickBlockButton();
			},5000);
			return;
		}
		obj=ss.snapshotItem(s);
		var onclick=obj.getAttribute('onclick');
		if(!clicked[onclick]) {
			clicked[onclick]=1;
			break;
		}
		s++;
		continue;
	}
	this.SetBlockUpto(clicked,s); 
	window.setTimeout(function() {
		GM_log('click block:'+obj.getAttribute('onclick'));
		if(test) {
			obj.style.border='3px solid #f00';
		} else {
			nHtml.Click(obj);
		}
		window.setTimeout(function() {
			if(!FacebookInvites.ClickBlockButton()) {
				// clicking the block button will reload the page, we will run again when the page reloads.
				FacebookInvites.BlockAllApps();
			}
		},3000);
	},1000);
},

// add a link to auto accept all the friend requests on the page.
AddAutoAccept:function() {
	var event=document.getElementById('friend_suggestion');
	if(!event) event=document.getElementById('friend_add');
	if(!event) event=document.getElementById('event_invite');
	if(!event) { return; }
	var mDiv=document.getElementById('BulkRequestsDiv');
	if(mDiv) { return; }
	mDiv=document.createElement('div');

	var buttonTypes={};
	var buttonsCount={};
	var maxButtons={};
	var appTypes={};
	this.IterateButtons(function(info) {
		var app=info.app;
		var buttonValue=info.value;
		appTypes[app]={'hash':info.aname};
		if(buttonTypes[app]==undefined) {
			buttonTypes[app]={};
		}

		if(buttonTypes[app][buttonValue]==undefined) {
			buttonTypes[app][buttonValue]=0;	
		}
		buttonTypes[app][buttonValue]++;
		appTypes[FacebookInvites.allAppsId]={'hash':'','desc':'All Applications'};
		var buttonUpto=info.nthButton;
		if(!maxButtons[app] || buttonUpto>=maxButtons[app]) { 
			maxButtons[app]=buttonUpto+1; 
			if(!maxButtons[FacebookInvites.allAppsId] || buttonUpto>=maxButtons[FacebookInvites.allAppsId])
				maxButtons[FacebookInvites.allAppsId]=buttonUpto+1;
		}
		return true;
	});

	mDiv.id='BulkRequestsDiv';
	mDiv.innerHTML="<b>Bulk click requests...</b><br />"+
		"Warning: buttons that take you to other places, you'll only go to one of those places, but all the buttons will be clicked and disappear.<br />"+
		"Clicking on a bulk button here will save a list of those users, which can be used in the friends list page.<br />"+
		"<input type='checkbox' id='BulkRequestsTest' />Test only(only highlights the buttons to be clicked)<br />"+
		"<input type='checkbox' id='BulkRequestsNewTab' title='Open up new tab.' checked />Open up a new tab when clicking on something (Some applications need this to confirm that you've accepted)<br />"+
		"Friend list: <input type='text' id='AcceptFriendList' /> (for when you're accepting friends)<br />"+
		"<input id='BulkClickByTextButton' type='button' value='Click all buttons with this text:' /> <input type='text' id='BulkClickByText' /> <br />"+
		"<a href='javascript:;' onclick='document.getElementById(\"nthConfirmDiv\").style.display=\"block\";'>Click by nth buttons.</a><br />"
		;

	mDiv.appendChild(document.createElement('br'));
	mDiv.appendChild(document.createElement('br'));
	var blockAllApps=document.createElement('A');
	blockAllApps.innerHTML="Click on all 'Block application' links (becareful, facebook has no list of blocked applications)";
	blockAllApps.addEventListener('click',function() {
		FacebookInvites.SetBlockUpto({},0); 
		FacebookInvites.BlockAllApps();
	},false);
	mDiv.appendChild(blockAllApps);
	mDiv.appendChild(document.createElement('br'));
	mDiv.appendChild(document.createElement('br'));



	var nthDiv=document.createElement('div');
	nthDiv.id='nthConfirmDiv';
	nthDiv.style.display='none';
	var appsArr=[];
	for(var app in appTypes) {
		appsArr.push(app);
	}
	appsArr=appsArr.sort();
	for(var a=0; a<appsArr.length; a++) {
		var app=appsArr[a];
		var d=document.createElement('div');
		var appInfo=appTypes[app];
		if(appInfo.desc) { appDesc=appInfo.desc; }
		else { appDesc=app; }
		d.innerHTML="<a href='#"+appInfo.hash+"'>"+appDesc+"</a> ";
		var divId='ButtonApp_'+escape(app);
		d.id=divId;
		var buttons=buttonTypes[app];
		
		var buttonsAdded=0;
		if(buttons) {
			for(var button in buttons) {
				var count=buttons[button];
				if(count<=1) { continue; }
				var inp=document.createElement('input');
				inp.type='button';
				inp.className='inputbutton BulkAddButton';
				inp.value=count+" x "+button;
				inp.addEventListener('click',function(e) {
					FacebookInvites.ClickAutoAccept(e);
				},false);
				d.appendChild(inp);
				d.appendChild(document.createTextNode(' '));
				buttonsAdded++;
			}
		}

		var nthApp=document.createElement('DIV');
		nthApp.id=divId;
		nthApp.innerHTML=appDesc;
		var maxButton=maxButtons[app];
		for(var b=0; b<maxButton; b++) {
			var inp=document.createElement('input');
			inp.type='button';
			inp.className='inputbutton BulkAddButton';
			
			var suffix="th";
			var b10=b%10;
			if(b10==0) { suffix="st"; }
			else if(b10==1) { suffix="nd"; }
			else if(b10==3) { suffix="rd"; }
			inp.value=(b+1)+suffix+" button";
			inp.addEventListener('click',function(e) {
				FacebookInvites.ClickAutoAccept(e);
			},false);
			nthApp.appendChild(inp);
			nthApp.appendChild(document.createTextNode(' '));
		}
		nthApp.appendChild(document.createElement('BR'));
		nthDiv.appendChild(nthApp);

		if(buttonsAdded>0) {
			mDiv.appendChild(d);
		}
	}
	mDiv.appendChild(nthDiv);


	event.parentNode.insertBefore(mDiv,event);

	var BulkClickByTextButton=document.getElementById('BulkClickByTextButton');
	BulkClickByTextButton.addEventListener('click',function(e) {
		FacebookInvites.ClickAutoAccept(e);
	},false);

},


// auto bulk add when we get to the profile page.
SetAutoBulkAdd:function(enabled) {
	GM_setValue('autoBulkAdd_Enabled',enabled);
	if(document.getElementById('bulkAddComment')) {
		GM_setValue('autoBulkAdd_Comment',document.getElementById('bulkAddComment').value);
		GM_setValue('autoBulkAdd_FriendList',document.getElementById('bulkAddFriendList').value);
		GM_setValue('autoBulkAdd_Test',document.getElementById('testBulkAddMeButton').checked);

	}
},

GetAutoBulkAdd:function() {
	var enabled=GM_getValue('autoBulkAdd_Enabled',false);
	if(enabled && document.getElementById('bulkAddComment')) {
		document.getElementById('bulkAddComment').value=GM_getValue('autoBulkAdd_Comment','');
		document.getElementById('bulkAddFriendList').value=GM_getValue('autoBulkAdd_FriendList','');
		document.getElementById('testBulkAddMeButton').checked=GM_getValue('autoBulkAdd_Test',false);
	}
	return enabled;
},






//////////////////////////
UncheckShowNews:function() {
chks = document.evaluate("/html[@id='facebook']/body//input[@value='news_feed']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i =0; i < chks.snapshotLength; i++) { chks.snapshotItem(i).checked=false;}
},


CheckPage:function() {
	if(unsafeWindow.top.joinRecentLoadedLink!=undefined && unsafeWindow.joinRecentLoadedLink==undefined) {
		window.setTimeout(function() {
			unsafeWindow.top.joinRecentLoadedLink();
		},5000);
		return;
	}

	var href=document.location.href+document.location.hash;
	var ok=false;
	if(href.indexOf("/reqs.php")>=0) {
		this.UncheckShowNews();
		this.AddAutoAccept();
	}
//	if(href.indexOf("/profile.php")>=0) {
	var profileStream=document.getElementById('profile_stream_container');
	if(document.getElementById('profile_top_bar') && !profileStream) {
		// we're not friends yet.
		if(this.AddMeLinkAnyPage()) {
			if(this.GetAutoBulkAdd()) {
				// auto add this person.
				this.addMeUptoMax=1;
				this.StartBulkAddMe();
			}
		}
	}

	if(href.indexOf("/s.php")>=0) {
		ok=this.AddFriendsWithApp();
	} else {
		this.AddMeLink();
		ok=this.InviteFriends();
	}
	window.setTimeout(function() { FacebookInvites.CheckPage() },5000);
}


};


GM_registerMenuCommand('FB Invites - Show Bulk add friends dialog',function() {
	FacebookInvites.AddMeLinkAnyPage();
});

GM_registerMenuCommand('FB Invites - Add all the friends on this page',function() {
	FacebookInvites.AddFriendsFromPage({'doc':document.getElementById('content'),'doNextPage':true});
});
GM_registerMenuCommand('FB Invites - Clear the current list of friends',function() {
	FacebookInvites.ClearFriendsBuffer();
});
GM_registerMenuCommand('FB Invites - Detach the block if it is not visible',function() {
	FacebookInvites.DetachDiv();
});

window.addEventListener("load", function(e) {
	window.GetFacebookInvites = function() {
		return FacebookInvites;
	}
	FacebookInvites.CheckPage();
	FacebookInvites.BlockAllApps();
}, false);

//// Lets Give This A Go ~ Les ////