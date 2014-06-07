// ==UserScript==
// @name         Request Page Auto-processor for Mafia Wars Users
// @description  Automates most request page tasks (accept friends, ignore groups, etc)
// @namespace    Facebook
// @version      0.2.14
// @include      http://www.facebook.com/reqs.php?doAuto
// @homepage     http://userscripts.org/scripts/show/54845
// ==/UserScript==

/*****	config	*****/
/*****
    boolAcceptGifts     Accept MW gift requests.
                        Default: true
                        true|false
    boolIgnoreEtcNotes  Ignore other requests like page recomendations, groups, etc
                        Default: true
                        true|false
    strNextURL          Where to you want your browser to go once the script completes?
                        Default: http://www.facebook.com/home.php?filter=app_10979261223
                        URL|'' to disable
    intNextURLDelay     How long to wait before loading the next URL (in seconds)?
						Default: 10
    intLogThreshold     How much info do you want logged?
                        Default: 10
                        < 10 = script start/stop entries
                        10 = basic info
                        20 = process level actions (friends added, button clicks, etc)
                        30 = everything relevant
                        > 50 = for debugging/dev only...will spam the log real well (=
*****/
var	boolAcceptGifts = true,
	boolIgnoreEtcNotes = true,
	strNextURL = 'http://www.facebook.com/home.php?filter=app_10979261223',
	intNextURLDelay = 1,
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
// awesome sauce