// ==UserScript==
// @name Facebook Profile Enhancer for Mafia Wars
// @namespace ProfileEnhancer
// @description Adds useful information and functions for Mafia Wars to the standard profile page of Facebook.
// @author Mewes Kochheim
// @contributor Metalpavel
// @include http://www.facebook.com/*
// @include http://mwfb.zynga.com/mwfb/*
// @require http://userscripts.org/scripts/source/62727.user.js
// @version 0.1.3.4
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////
// Global
////////////////////////////////////////////////////////////////////////////////
var fbHelpCount = 0;
var fbHelpResponse = [];
var fbUserID = 0;
var fbPageChangeMarker = createMarker();
//var fbMafiaHost = 'http://apps.facebook.com/inthemafia/remote/html_server.php?';
var fbMafiaHost = 'http://mwfb.zynga.com/mwfb/remote/html_server.php?skip_req_frame=1&';
var fbJobList =
[
	['New York', fbMafiaHost + 'xw_controller=job&xw_action=give_help&job_city=1&target_id=', handleGiveHelpResponse],
	['Cuba', fbMafiaHost + 'xw_controller=job&xw_action=give_help&job_city=2&target_id=', handleGiveHelpResponse],
	['Moscow', fbMafiaHost + 'xw_controller=episode&xw_action=give_help_moscow_social&job_city=3&target_id=', handleGiveHelpResponse],
	['Moscow Boss Fight', fbMafiaHost + 'xw_controller=episode&xw_action=give_help_moscow_boss&job_city=3&target_id=', handleGiveHelpResponse],
	['Money Laundering', fbMafiaHost + 'xw_controller=launder&xw_action=give_help&job_city=1&job=69&target_id=', handleGiveHelpResponse]
];

if (document.location.href.indexOf('http://mwfb.zynga.com/mwfb/') >= 0) 
{			
	GM_deleteValue('userTitle');
	GM_deleteValue('userName');
	GM_deleteValue('userLevel');
	GM_deleteValue('userType');
	GM_deleteValue('attackKey');	
	GM_deleteValue('punchKey');
	GM_deleteValue('hitlistKey');
	
	var titleDiv = $$('.//div[@class="title"]')[0];
	if (titleDiv != null)
	{
		var user = /.+([\S ]+){0,1} {0,1}\"([\S ]+)\", level ([0-9]+) (\S+).+/.exec(titleDiv.innerHTML);
		if (user != null)
		{	
			GM_setValue('userTitle', (user[1] != undefined) ? user[1] : '');
			GM_setValue('userName', user[2]);
			GM_setValue('userLevel', user[3]);
			GM_setValue('userType', user[4]);
		}
	}
	
	var attackLink = $$('.//a[contains(@href, "xw_controller=fight&xw_action=attack")]')[0];
	if (attackLink != null) 
	{
		var attack = /xw_controller=fight&amp;xw_action=attack&amp;.+?&amp;tmp=([a-z0-9]+)&amp;/.exec(attackLink);
		if (attack != null)
		{
			GM_setValue('attackKey', attack[1]);
		}
	}
	
	var punchLink = $$('.//a[contains(@href, "xw_controller=fight&xw_action=punch")]')[0];
	if (punchLink != null)
	{
		var punch = /xw_controller=fight&amp;xw_action=punch&amp;.+?&amp;tmp=([a-z0-9]+)&amp;/.exec(punchLink);
		if (punch != null)
		{
			GM_setValue('punchKey', punch[1]);
		}
	}
	
	var hitlistLink = $$('.//a[contains(@href, "xw_controller=hitlist&xw_action=set")]')[0];
	if (hitlistLink != null)
	{
		var hitlist = /xw_controller=hitlist&amp;xw_action=set&amp;.+?&amp;tmp=([a-z0-9]+)&amp;/.exec(hitlistLink);
		if (hitlist != null)
		{
			GM_setValue('hitlistKey', hitlist[1]);
		}
	}

	GM_setValue("info_ready", true); 
} 
else 
{
	GM_deleteValue('info_ready');
	var fbOnLoadchecker = setInterval(function() { if($('content')) { clearInterval(fbOnLoadchecker); handleContentInsert(); } }, 100);
}


////////////////////////////////////////////////////////////////////////////////
// Resources
////////////////////////////////////////////////////////////////////////////////

var mafiaIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAIAAAAmzuBxAAAACXBIWXMAAAsTAAALEwEAmpwYAAABPklEQVR4nC2OMcuCUBSGzzn3SkgpEdjSKiER0dLSEAjRL3D1pzYUBQ1BoEU5pTQUEoIEdaPrvd/gtz3D+7w86LruaDRqNBpEtN1u0zTt9Xqz2QwR3+/35XLhz+fT87zFYiGESJIkTVPHcYIgsG17tVptNhv++/0QsdvtMsZ834+iaDqduq6rlDIMQwjBa7JtGxHn8/l6vfZ9v91uV1XVarUYYxwRTdO0LKuqquFwGIbheDyuhU6nwzknIrIsyzTNOI6FEEEQENHxeKw1IiLOebPZBICyLK/Xq+M4WZbd73cAUEoppYgxZhgGIgJAFEVSytPppJQCAAAgIpJSfj4fAPh+v7vdLsuy/X4vpUTE/wgA0FrX8/P5vFwuD4dD/aG11lqzyWTS7/eLosjzPEmS2+0mpRwMBq/XK8/zx+PxB1Zin9k0XZMTAAAAAElFTkSuQmCC';
var loadIcon = 'data:image/gif;base64,R0lGODlhEAALALMLALnE2qOyz6CvzrO/17K+1pury9HY5srS4/T2+Zioyaaz0P///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwALACwAAAAAEAALAAAEK3DJSau9tChVpObepiWJIimkuaAlq7pnCq9p3NZ0aW/47H6dBTAEwhiPlAgAIfkECQsACwAsAAAAAAQACwAABA3wICSPpNdOjXf+HrVFACH5BAkLAAsALAAAAAAQAAsAAAQwcMl5EDpzAmOAvFUmGcNgfEcokiaqZuy5gIi4xG69ljJt47OUDsbL2TYdo01UudgiACH5BAkLAAsALAAAAAAQAAsAAAQ9cMlJ5UHo1AWMAVJ2BQQRSMYwGOFxEYJAoCq7iAgs02v7xrNFqndz5YA8G04XHCqNJFPSh9h0PtTN5pKJAAAh+QQJCwALACwAAAAAEAALAAAEPXDJSau9wBhQlCpSQBCBZAyDoSSJIhGCQJioyroLLNPp2r6x2eLUuwF3w5oPpxMSDZ1PaFRKpi6VzAaLjQAAIfkEBQsACwAsAAAAABAACwAABDNwyUmrvbQoVaTmUkAQgZIkimSiEiEIxJoucvvG51wvLrzvPRyLlrPBPp0FMjQKYJ7QSgQAIfkEBRQACwAsDAACAAQABwAABAywKCVTmhZflfmVVAQAOw%3D%3D';

////////////////////////////////////////////////////////////////////////////////
// Event handler
////////////////////////////////////////////////////////////////////////////////

// @author sizzlemctwizzle
function handleContentInsert()
{
	var content = $('content');
	content.removeEventListener('DOMNodeInserted', handleContentInsert, false);
	if (!$(fbPageChangeMarker.id)) 
		setTimeout(handleFacebookLoad, 0);
	content.appendChild(fbPageChangeMarker);
	content.addEventListener('DOMNodeInserted', handleContentInsert, false);
}

// Obtains the user ID and start the HTTP request to Mafia Wars
function handleFacebookLoad()
{
	// Obtain user ID
	var shareLink = $$('.//a[contains(@href, "ajax/share_dialog.php")]')[0];
	if (shareLink == null) 
		return;
	
	var regex = /p\[\]=(\d+)/.exec(shareLink);
	if (regex == null) 
		return;
	
	fbUserID = regex[1];
	
	// Add user ID
	$('profile_name').appendChild(document.createTextNode(' (ID: ' + fbUserID + ')'));
	
	// Request Mafia Wars profile
	var url= 'http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22' + escape(Base64.encode(fbUserID)) + '%22%7D';
	//var url = 'http://apps.facebook.com/inthemafia/index.php?next_params=' + escape(Base64.encode('a:3:{i:0;s:5:"stats";i:1;s:4:"view";i:2;s:18:"&user=' + Base64.encode(fbUserID) + '";}')) + '&_fb_q=1';
	
	var iframe = makeElement('iframe', $$('.//body')[0], { 'src':url, 'id':'fakeFrame', 'style':'width:0px; height:0px' });
	var mwOnLoadchecker = setInterval(function() { if(GM_getValue("info_ready")) { clearInterval(mwOnLoadchecker); $$('.//body')[0].removeChild($('fakeFrame')); handleProfileResponse(); } }, 100);
}

// Creates all additional GUI components
function handleProfileResponse(_result, _attribute)
{
	var profileActions = $$('.//div[@class="profile_actions"]')[0];
	var profileConnect = $('profile_connect_text');
	var profileIcon = $$('.//span[@class="profile_icon"]')[0];

	if (profileActions == null) // || _result.responseText == null || _result.responseText == '' || _result.responseText.lastIndexOf('This mafia member was not found') >= 0)
		return;

	var userTitle = GM_getValue('userTitle');
	var userName = GM_getValue('userName');
	var userLevel = GM_getValue('userLevel');
	var userType = GM_getValue('userType');
	
	var attackKey = GM_getValue('attackKey');	
	var punchKey = GM_getValue('punchKey');
	var hitlistKey = GM_getValue('hitlistKey');
		
	var infoBox = createInfoBox(userTitle, userName, userLevel, userType);
	profileActions.parentNode.insertBefore(infoBox, profileActions.nextSibling);
	
	// Create profile actions
	profileActions.appendChild(createProfileAction('View profile', 'actionViewProfile', fbMafiaHost + 'xw_controller=stats&xw_action=view&user=' + fbUserID));
	//profileActions.appendChild(createProfileAction('Sucker Punch', 'actionSuckerPunch', fbMafiaHost + 'xw_controller=fight&xw_action=punch&tmp=' + punchKey + '&opponent_id=' + fbUserID));
	//profileActions.appendChild(createProfileAction('Add to Hitlist', 'actionAddToHitlist', fbMafiaHost + 'xw_controller=hitlist&xw_action=set&tmp=' + hitlistKey + '&target_id=' + fbUserID));
	
	// if friend
	if (!profileConnect && !profileIcon)
	{
		//profileActions.appendChild(createProfileAction('Declare War', 'actionDeclareWar', fbMafiaHost + 'xw_controller=war&xw_action=view&leader_id=' + fbUserID));
		//profileActions.appendChild(createProfileAction('Give Help', 'actionGiveHelp', 'javascript:', function () { handleGiveHelpClick(); }));
		//profileActions.appendChild(createProfileAction('Send Gift', 'actionSendGift', fbMafiaHost + 'xw_controller=gift&xw_action=view&target_id=' + fbUserID));
		//profileActions.appendChild(createProfileAction('Promote', 'actionPromote', fbMafiaHost + 'xw_controller=group&xw_action=view&promote=yes&uid=' + fbUserID));
		
		// if not mafia member
		if (_result.responseText.lastIndexOf('xw_action=remove') < 0)
		{
			//profileActions.appendChild(createProfileAction('Add to Mafia', 'actionAddToMafia', 'javascript:', function () { handleAddToMafiaClick(); }));
		}
		//if mafia member
		else
		{
			//profileActions.appendChild(createProfileAction('Remove from Mafia', 'actionRemoveFromMafia', 'javascript:', function () { handleRemoveFromMafiaClick(attackKey); }));
		}
	}
	// if not friend
	else
	{
		//profileActions.appendChild(createProfileAction('Attack', 'actionAttack', fbMafiaHost + 'xw_controller=fight&xw_action=attack&tmp=' + attackKey + '&opponent_id=' + fbUserID));
	}
}

////////////////////////////////////////////////////////////////////////////////
// Action response events
////////////////////////////////////////////////////////////////////////////////

function handleAddToMafiaResponse(_result, _attribute)
{
	var message = '', title = '', regex = /<td class=\"message_body\">([\S ]+)<\/td>/.exec(_result.responseText);
	
	if (regex == null)
	{
		title = 'Attack: Error';
		message = 'An error occurred!';	
	} 
	else 
	{
		title = 'Attack: Success';
		message = cleanMessage(regex[1]);	
	}
	
	createPopupBox('Add to Mafia', [message]);
	$('actionAddToMafia').setAttribute('style', ''); 
	$('actionAddToMafiaWait').setAttribute('style', 'visibility:hidden;');
	$$('.//div[@class="profile_actions"]')[0].removeChild($('actionAddToMafia'));
	
//	var removeButton = createProfileAction('Remove from Mafia', 'javascript:', 'actionRemoveFromMafia', handleRemoveFromMafiaClick);
//	$$('.//div[@class="profile_actions"]')[0].replaceChild(null, $('actionAddToMafia'));
}

function handleRemoveFromMafiaResponse(_result, _attribute)
{
	var message = '', title = '', regex = /<td class=\"message_body\">([\S ]+)<\/td>/.exec(_result.responseText);
	
	if (regex == null)
	{
		title = 'Attack: Error';
		message = 'An error occurred!';	
	} 
	else 
	{
		title = 'Attack: Success';
		message = cleanMessage(regex[1]);	
	}
	
	createPopupBox('Remove from Mafia', [message]);
	$('actionRemoveFromMafia').setAttribute('style', ''); 
	$('actionRemoveFromMafiaWait').setAttribute('style', 'visibility:hidden;');
	$$('.//div[@class="profile_actions"]')[0].removeChild($('actionRemoveFromMafia'));
	
//	var addButton = createProfileAction('Add to Mafia', 'javascript:', 'actionAddToMafia', handleAddToMafiaClick);
//	$$('.//div[@class="profile_actions"]')[0].replaceChild(addButton, $('actionRemoveFromMafia'));
}

function handleGiveHelpResponse(_result, _attribute)
{
	fbHelpCount++;
	
	if (_result != null)
	{
		// delete line breaks
		_result.responseText = _result.responseText.replace(/\n/g, '');
		
		// find message body
		var message = '', regex = /<td class=\"message_body\">(.+?)<\/td>/im.exec(_result.responseText);

		if (regex == null)
		{
			message = 'An error occurred!';	
		} 
		else 
		{
			message = cleanMessage(regex[1]);	
		}

		var cityTitle = makeElement('b').appendChild(document.createTextNode(_attribute + ':'));
		fbHelpResponse.push(cityTitle);
		fbHelpResponse.push(makeElement('br'));
		fbHelpResponse.push(message);

		if (fbHelpCount == fbJobList.length) 
		{
			$('actionGiveHelp').setAttribute('style', ''); 
			$('actionGiveHelpWait').setAttribute('style', 'visibility:hidden;');
//			$$('.//div[@class="profile_actions"]')[0].removeChild($('actionGiveHelp'));
			createPopupBox('Give Help', fbHelpResponse);
		}
		else
		{
			fbHelpResponse.push(makeElement('br'));
			fbHelpResponse.push(makeElement('br'));
		}
	}
}
function handleAttackResponse(_result, _attribute)
{
	var message = '', title = '', regex = /<td class=\"message_body\">([\S ]+)<\/td>/.exec(_result.responseText);
	
	if (regex == null)
	{
		title = 'Attack: Error';
		message = 'An error occurred!';	
	} 
	else 
	{
		title = 'Attack: Success';
		message = cleanMessage(regex[0]);	
	}
	
	createPopupBox(title, [message]);
	$('actionAttack').setAttribute('style', ''); 
	$('actionAttack').setAttribute('style', 'visibility:hidden;');
}
function handleSuckerPunchResponse(_result, _attribute)
{
	var message = '', title = '', regex = /<td class=\"message_body\">([\S ]+)<\/td>/.exec(_result.responseText);
	
	if (regex == null)
	{
		title = 'Sucker Punch: Error';
		message = 'An error occurred!';	
	} 
	else 
	{
		title = 'Sucker Punch: Success';
		message = cleanMessage(regex[1]);	
	}
	
	createPopupBox(title, [message]);
	$('actionSuckerPunch').setAttribute('style', ''); 
	$('actionSuckerPunch').setAttribute('style', 'visibility:hidden;');
}

////////////////////////////////////////////////////////////////////////////////
// Action click events
////////////////////////////////////////////////////////////////////////////////

function handleAddToMafiaClick() 
{ 
	$('actionAddToMafia').setAttribute('style', 'color: #ffffff; background-color: #3B5998;'); 
	$('actionAddToMafiaWait').setAttribute('style', 'float: right; visibility: visible;'); 
	getRequest(fbMafiaHost + 'xw_controller=war&xw_action=add&friend_id=' + fbUserID, handleAddToMafiaResponse); 
}
function handleRemoveFromMafiaClick(_attribute) 
{
	$('actionRemoveFromMafia').setAttribute('style', 'color: #ffffff; background-color: #3B5998;'); 
	$('actionRemoveFromMafiaWait').setAttribute('style', 'float: right; visibility: visible;');
	getRequest(fbMafiaHost + 'xw_controller=group&xw_action=remove&xw_city=1&' + _attribute + '&target_id=' + fbUserID, handleRemoveFromMafiaResponse); 
}
function handleGiveHelpClick() 
{
	$('actionGiveHelp').setAttribute('style', 'color: #ffffff; background-color: #3B5998;'); 
	$('actionGiveHelpWait').setAttribute('style', 'float: right; visibility: visible;'); 
	
	fbHelpCount = 0;
	fbHelpResponse = [];
	
	for (var i in fbJobList) 
	{ 
		getRequest(fbJobList[i][1] + fbUserID, fbJobList[i][2], fbJobList[i][0]); 
	}
}
function handleAttackClick(_attribute) 
{ 
	$('actionAttack').setAttribute('style', 'color: #ffffff; background-color: #3B5998;'); 
	$('actionAttack').setAttribute('style', 'float: right; visibility: visible;'); 
	getRequest(fbMafiaHost + 'xw_controller=fight&xw_action=attack&' + _attribute + '&opponent_id=' + fbUserID, handleAttackResponse); 
}
function handleSuckerPunchClick(_attribute) 
{ 
	$('actionSuckerPunch').setAttribute('style', 'color: #ffffff; background-color: #3B5998;'); 
	$('actionSuckerPunch').setAttribute('style', 'float: right; visibility: visible;'); 
	getRequest(fbMafiaHost + 'xw_controller=fight&xw_action=punch&' + _attribute + '&opponent_id=' + fbUserID, handleSuckerPunchResponse); 
}

////////////////////////////////////////////////////////////////////////////////
// Functions to create GUI elements
////////////////////////////////////////////////////////////////////////////////

// Creates the box for the left column
function createInfoBox(_userTitle, _userName, _userLevel, _userType) 
{
	_userName = cleanString(_userName);
	
	var box = makeElement('div', null, {'class':'box basic_info_summary'});
	var boxTitle = makeElement('h5', box, {'class':'box_header UITitle UITitle_h5'}).appendChild(document.createTextNode('Mafia Wars Information'));
	var inside = makeElement('div', box, {'class':'inside'});
	var info = makeElement('dl', inside, {'class':'info'});
	
	if (_userTitle.length > 0) {
		makeElement('dt', info).appendChild(document.createTextNode('Title:'));
		makeElement('dd', info).appendChild(document.createTextNode(_userTitle));
	}
	
	makeElement('dt', info).appendChild(document.createTextNode('Name:'));
	makeElement('dd', info).appendChild(document.createTextNode(_userName));
	makeElement('dt', info).appendChild(document.createTextNode('Level:'));
	makeElement('dd', info).appendChild(document.createTextNode(_userLevel));
	makeElement('dt', info).appendChild(document.createTextNode('Type:'));
	makeElement('dd', info).appendChild(document.createTextNode(_userType));
	
	return box;
}

// Creates a profile action link
function createProfileAction(_text, _id, _href, _handler)
{
	var link = makeElement('a', null, {
		'id':_id, 
		'class':'profile_action actionspro_a', 
		'href':_href
	});
	
	if (_handler != null)	link.addEventListener('click', _handler, false);
		
	var icon = makeElement('img', link, {
		'src':mafiaIcon, 
		'style':'width: 11px; height:11px; margin-right: 3px; border: 0;'
	});
	
	link.appendChild(document.createTextNode(_text));
	
	var wait = makeElement('img', link, {
		'id':_id+'Wait',
		'src':loadIcon, 
		'style':'width: 16px; height: 11px; margin-right: 3px; border: 0; visibility: hidden;'
	});
	
	return link;
}

function createPopupBox(_title, _content)
{
	var popBorder1 = makeElement('div', $$('.//body')[0], {'id':'popupMafiaWars', 'class':'generic_dialog pop_dialog'});
	var popBorder2 = makeElement('div', popBorder1, {'class':'generic_dialog_popup', 'style':('top:' + (window.innerHeight / 2 + window.pageYOffset - 100) + 'px;')});
	var popContainer = makeElement('div', popBorder2, {'class':'pop_container_advanced'});
	var popContent = makeElement('div', popContainer, {'class':'pop_content'});
	var dialogTitle = makeElement('h2', popContent, {'class':'dialog_title'});
	var dialogTitleInner = makeElement('span', dialogTitle).appendChild(document.createTextNode(_title));
	var dialogContent = makeElement('div', popContent, {'class':'dialog_content'});
	var dialogBody = makeElement('div', dialogContent, {'class':'dialog_body'})
	
	if (_content != null) {
		for (var i in _content) {
			if (typeof _content[i] == 'object')
				dialogBody.appendChild(_content[i]);			
			else if (typeof _content[i] == 'string')
				dialogBody.appendChild(document.createTextNode(_content[i]));
		}
	}
	makeElement('br', dialogBody);
	makeElement('br', dialogBody);
	var dialogButtons = makeElement('div', dialogContent, {'class':'dialog_buttons'});
	var cancelButton = makeElement('input', dialogButtons, {'id':'cancelButton', 'class':'inputsubmit', 'type':'button', 'value':'OK'});					
	cancelButton.addEventListener('click', function() {$$('.//body')[0].removeChild($('popupMafiaWars'));}, false);	
}

// Creates a marker with a random ID
// @author sizzlemctwizzle
function createMarker()
{
	var s = '';
	for (i = 0; i <= 5; i++)
		s += String.fromCharCode(Math.floor(Math.random() * 75) + 48);
	return makeElement('div', null, {'id':'fbPageChangeMarker_' + s});
}

////////////////////////////////////////////////////////////////////////////////
// Utility functions
////////////////////////////////////////////////////////////////////////////////
 
// Get element by ID
function $(_id) 
{ 
	return document.getElementById(_id); 
}

// Get elements by XPath
function $$(_query, _element) { 
	var result = [];
	var element, elements = document.evaluate(_query, _element || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while (element = elements.iterateNext()) 
		result.push(element);
	return result;
}

function makeElement(type, appendto, attributes) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (appendto != null) {
    appendto.appendChild(element);
  }
  return element;
}

function getRequest(_url, _function, _attribute, _referer) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: _url,
		headers: { 
			'Referer' : _referer
		},
		onload: function(_result) {
			if(_function)
				 _function(_result, _attribute);
		}
	});
}

// delete popups and remove html tags
function cleanMessage(_message) 
{
	return cleanString(_message.replace(/<div.+<\/div>/g, '').replace(/<script.+<\/script>/g, '').replace(/<(?:.|\s)*?>/g, ''));
}

// replace special html characters
function cleanString(_string)
{
	return _string.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		return output;
 
	}
}