// ==UserScript==
// @name           Facebook Fixed Header (Always-At-Top)
// @namespace      http://skoshy.com
// @creator        Stefan Koshy
// @description    Keeps Facebook's header consistently visible (fixed header). Also adds some other features.
// @icon           http://i.imgur.com/df7Rz.png
// @version        2.8.5
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://blog.facebook.com/*
// @exclude        https://blog.facebook.com/*
// ==/UserScript==

// This script is (heavily) modified from Will Haynes's original script

/*
	Planned
	- Hoverable Tooltips with names (already partially started)
*/

var currentVersion = '2.8.5';
var scriptId = '103328';
var scriptIdentifier = 'fbfixedheader';

var accountDropdown;
var navAccount = document.getElementById('navAccount');
var user = getUserID('self');
var prefix = 'body:not(.fixedBody):not(.UIPage_LoggedOut)';

if (user !== false) {
    addStyle (
        '#fbFixedOptions {display: none; z-index: 10000; position: fixed; padding: 25px; background-color: rgba(255, 255, 255, .9); -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; border: 10px solid rgb(230, 230, 230); width: 700px; margin-left: -370px; height: 400px; margin-top: -220px; left: 50%; top: 50%;}' +
        '#fbFixedOptionsBG {display: none; z-index: 9999; opacity: .8; background-color: black; position: fixed; width: 100%; height: 100%; top: 0;}' +
        '#fbFixedProfPicSection {float: left;}' +
        '.fbFixedProfPics {display: none;}' +
        '.fbFixedProfPics a {padding: 0 !important; height: 28px !important; border: 1px solid #3B5998;}' +
	'.fbFixedProfPics a:hover {border: 1px solid #C8BDFF;}' +
	'#fbFixedForm {clear: both; border-top: 1px solid gray;}' +
	'#fbFixedForm input[type="text"] {width: 300px;}' +
	'#fbFixedOptionsHeader {padding-bottom: 8px;}' +
	'#fbFixedOptionsHeader h1 {float: left; font-size: 20px;}' +
	'#fbFixedOptionsHeader h2 {float: right;}' +
	'#fbFixedOptionsHeader h2 img {height: 20px; vertical-align: middle; padding-right: 5px;}' +
	'#fbFixedOptionsProfPicTable tr, #fbFixedOptionsProfPicTable input {margin: 0; padding: 0;}' +
	'#fbFixedOptionsSubmitPanel {margin-top: 10px;}' +
	// Prevents overflow if there are too many items in the header bar
	'  '+prefix+' #headNav .lfloat {position: absolute !important;}' +
	// TODO: Implement tooltips for the pictures
	//'.fbFixedTooltips {position: absolute;}' +
	//'.fbFixedProfPics:hover .fbFixedTooltips, .fbFixedProfPicSelf:hover .fbFixedTooltips {display: block;}' +
    '', 'fbFixedGeneralCSS');

    // From here: http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
        this.GM_deleteValue=function (key) {
            return delete localStorage[key];
        };
    }

    var node;
    accountDropdown = document.getElementById('navAccountInfo').parentNode;
    var profileLinkLi = document.getElementById('navHome').nextSibling;

    var options = new Array();
    getOptions();

    // To Top Button
    node = document.createElement('li');
    node.id = 'fbFixedTopButton';
    node.style.display = 'none';
    node.innerHTML = '<a id="fbFixedTopLink" href="javascript:scroll(0,0);document.getElementById(\'fbFixedTopLink\').blur();">Top</a>';
    document.getElementById('pageNav').insertBefore(node, document.getElementById('navHome'));

    // Options Link
    node = document.createElement('hr');
    accountDropdown.insertBefore(node, accountDropdown.children[1]);

    node = document.createElement('li');
    node.innerHTML = '<a id="fbFixedOptionsLink" onclick="return false;">Facebook Fixed Header Options</a>';
    accountDropdown.insertBefore(node, accountDropdown.children[1]);

    // Options BG
    node = document.createElement('div');
    node.id = 'fbFixedOptionsBG';
    document.body.appendChild(node);

    createProfPics();

    createOptions();
    applyOptions();
    updateProfPics();
	
	// If the script hasn't checked for an update in 12 hours, check for one (happens anytime the script is initiated)
	if ((GM_getValue('timeSinceLastUpdateCheck', time()-43210)+43200) < time())
		checkVersion();
}

// Returns unix time in seconds
function time() {
	var foo = new Date; // Generic JS date object
	var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
	return parseInt(unixtime_ms / 1000);
}

function checkVersion() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(response) {
			var newVersion = response.responseText.match(/[\/]*[\t ]@version[\t ]*[\d\w\.]*/)[0].match(/[\d]+[\d\.\w]+/);
			if (newVersion != currentVersion) {
				var node = document.createElement('li');
				node.id = scriptIdentifier+'update';
				node.setAttribute('data-scriptid', scriptId);
				node.style.backgroundColor = '#D7DCFA';
				node.innerHTML = '<a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Update Available ('+newVersion+')</a>';
				accountDropdown.insertBefore(node, accountDropdown.children[2]);
				
				// Turn navigation link yellow
				navAccount.style.backgroundColor = '#A7AED9';
			}
			// Update the "update-check" time
			GM_setValue('timeSinceLastUpdateCheck', time());
		}
	});
}

function addFixedHeaderCSS() {
	if (document.getElementById('fbFixedHeaderCSS') == null) {
		addStyle (
			'  '+prefix+' #blueBar { position : fixed !important; top : 0px !important; z-index: 13 !important ; } ' +
			// Pads the main content from the header
			'  '+prefix+' #content{ padding-top : 41px !important } ' +
			// Makes sure the fbchat sidebar is above the header
			'  '+prefix+' .fbChatSidebar { z-index: 15; } ' +
			'  '+prefix+' #ConfirmBannerOuterContainer {display: none;}'
			
		, 'fbFixedHeaderCSS');
	}
}

function removeFixedHeaderCSS() {
	if (document.getElementById('fbFixedHeaderCSS') != null) {
		document.getElementById('fbFixedHeaderCSS').parentNode.removeChild(document.getElementById('fbFixedHeaderCSS'));
	}
}

// Function to add style

function addStyle(css, id) {
    var heads = document.getElementsByTagName('head');
	var style = document.createElement('style');
	try { style.innerHTML = css; }
	catch(x) { style.innerText = css; }
	style.type = 'text/css';
	style.id = id;
	heads[0].appendChild(style);
}

function getUserID(target) {
	if (target == 'self') {
		var firstString = ['Presence(\\"'];
		var secondString = ['\\"'];
		var subject = document.getElementsByTagName('script');
	}
	else {
		// First check to see if it's your own profile
		for (var i = 0; i < document.getElementsByClassName('uiButtonText').length; i++) {
			if (document.getElementsByClassName('uiButtonText')[i].innerHTML == 'Edit Profile')
				return user;
		}
		var firstString = ['cid=', 'p[]='];
		var secondString = ['&', ''];
		if (document.getElementById('profile-friends-footer') == null)
			return false;
		var subject = document.getElementById('profile-friends-footer').getElementsByTagName('a');
	}
    
    if (target == 'self') {
		for (var i = 0; i < subject.length; i++) {
			if (stripText(firstString[0], secondString[0], subject[i].innerHTML)) {
				return stripText(firstString[0], secondString[0], subject[i].innerHTML);
			}
		}
	} else {
		var count = -1;
		
		while (count < firstString.length) {
			count++;
			for (var i = 0; i < subject.length; i++) {
				if (stripText(firstString[count], secondString[count], subject[i].href)) {
					return stripText(firstString[count], secondString[count], subject[i].href);
				}
			}
		}
	}
	
	return false;
}

function stripText(firstString, secondString, subject) {
	var firstPos = subject.indexOf(firstString);
	if (firstPos != -1) {
		if (secondString != '')
			return subject.substring(subject.indexOf(firstString)+firstString.length, subject.indexOf(secondString, subject.indexOf(firstString)+firstString.length));
		else
			return subject.substring(subject.indexOf(firstString)+firstString.length);
	} else 
		return '';
}

function changeOptions() {
    if (document.getElementById('fbFixedForm').elements.namedItem('enableFixedHeader').checked)
			GM_setValue('enableFixedHeader_'+user, 't');
		else
			GM_setValue('enableFixedHeader_'+user, 'f');
	
	if (document.getElementById('fbFixedForm').elements.namedItem('topButtonEnabled').checked)
			GM_setValue('topButtonEnabled_'+user, 't');
		else
			GM_setValue('topButtonEnabled_'+user, 'f');
	
	if (document.getElementById('fbFixedForm').elements.namedItem('profPicForSelf').checked)
			GM_setValue('profPicForSelf_'+user, 't');
		else
			GM_setValue('profPicForSelf_'+user, 'f');
			
	if (document.getElementById('fbFixedForm').elements.namedItem('disableFindFriendsLink').checked)
			GM_setValue('disableFindFriendsLink_'+user, 't');
		else
			GM_setValue('disableFindFriendsLink_'+user, 'f');
	
	for (var i = 0; i < document.getElementsByClassName('fbFixedProfPicInput').length; i++) {
		if (parseInt(document.getElementById('fbFixedForm').elements.namedItem('profPic'+i).value).toString() == document.getElementById('fbFixedForm').elements.namedItem('profPic'+i).value)
			GM_setValue('profPic'+i+'Name_'+user, 'f');
		else
			GM_setValue('profPic'+i+'Name_'+user, 't');
		if (document.getElementById('fbFixedForm').elements.namedItem('profPic'+i).value == '')
			GM_setValue('profPic'+i+'_'+user, 'none');
		else
			GM_setValue('profPic'+i+'_'+user, document.getElementById('fbFixedForm').elements.namedItem('profPic'+i).value);
	}
	
    document.getElementById('fbFixedOptions').style.display = 'none';
    document.getElementById('fbFixedOptionsBG').style.display = 'none';
    
    getOptions();
    applyOptions();
    updateProfPics();
    updateOptions();
}

function cancelOptions() {
    document.getElementById('fbFixedOptions').style.display = 'none';
    document.getElementById('fbFixedOptionsBG').style.display = 'none';
    
    updateOptions();
}

function getOptions() {
    options.enableFixedHeader = GM_getValue('enableFixedHeader_'+user, 't');
	options.topButtonEnabled = GM_getValue('topButtonEnabled_'+user, 't');
    options.profPicForSelf = GM_getValue('profPicForSelf_'+user, 't');
	options.disableFindFriendsLink = GM_getValue('disableFindFriendsLink_'+user, 't');
    options.profPic0 = GM_getValue('profPic0_'+user, 'zuck');
    options.profPic1 = GM_getValue('profPic1_'+user, '20531316728');
    options.profPic2 = GM_getValue('profPic2_'+user, 'firefox');
    options.profPic3 = GM_getValue('profPic3_'+user, 'googlechrome');
	options.profPic4 = GM_getValue('profPic4_'+user, 'none');
	options.profPic5 = GM_getValue('profPic5_'+user, 'none');
	options.profPic6 = GM_getValue('profPic6_'+user, 'none');
	options.profPic0Name = GM_getValue('profPic0Name_'+user, 't');
    options.profPic1Name = GM_getValue('profPic1Name_'+user, 'f');
    options.profPic2Name = GM_getValue('profPic2Name_'+user, 't');
    options.profPic3Name = GM_getValue('profPic3Name_'+user, 't');
	options.profPic4Name = GM_getValue('profPic4Name_'+user, 'f');
	options.profPic5Name = GM_getValue('profPic5Name_'+user, 'f');
	options.profPic6Name = GM_getValue('profPic6Name_'+user, 'f');
}

function applyOptions() {
    if (options.enableFixedHeader == 't')
        addFixedHeaderCSS();
    else
        removeFixedHeaderCSS();
	if (options.topButtonEnabled == 't')
        document.getElementById('fbFixedTopButton').style.display = 'block';
    else
        document.getElementById('fbFixedTopButton').style.display = 'none';
    if (options.profPicForSelf == 't')
        profileLinkLi.style.display = 'none';
    else
        profileLinkLi.style.display = 'block';
	if (options.disableFindFriendsLink == 't')
		document.getElementById('headNav').getElementsByClassName('rfloat')[0].firstChild.children[document.getElementById('headNav').getElementsByClassName('rfloat')[0].firstChild.children.length-2].style.display = 'none';
	else
		document.getElementById('headNav').getElementsByClassName('rfloat')[0].firstChild.children[document.getElementById('headNav').getElementsByClassName('rfloat')[0].firstChild.children.length-2].style.display = 'block';
}

function createProfPics() {
    tempNode = document.createElement('div');
    tempNode.id = 'fbFixedProfPicSection';
    tempNode.innerHTML = '<li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li class="fbFixedProfPics"><a href=""><img src="" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="fbFixedTooltipsText uiTooltipText uiTooltipNoWrap"></span></span></a></li><li id="fbFixedProfPicSelf" class="fbFixedProfPics"><a href="https://www.facebook.com/profile.php?id='+user+'"><img src="https://graph.facebook.com/'+user+'/picture?type=square" height="100%"/><span class="fbFixedTooltips uiTooltipWrap bottom left leftbottom"><span class="uiTooltipText uiTooltipNoWrap">Your Profile</span></span></a></li>';
    document.getElementById('pageNav').insertBefore(tempNode, document.getElementById('pageNav').firstChild);
}

function updateProfPics() {
    profPicNode = document.getElementById('fbFixedProfPicSection');
    if (options.profPicForSelf == 't') {
        document.getElementById('fbFixedProfPicSelf').style.display = 'block';
    } else {
        document.getElementById('fbFixedProfPicSelf').style.display = 'none';
    }
    
    for (var i = 0; i < profPicNode.children.length-1; i++) {
        if (options['profPic'+i] != 'none') {
            profPicNode.children[i].style.display = 'block';
			if (options['profPic'+i+'Name'] == 't')
				profPicNode.children[i].firstChild.href = 'https://www.facebook.com/'+options['profPic'+i];
			else
				profPicNode.children[i].firstChild.href = 'https://www.facebook.com/profile.php?id='+options['profPic'+i];
            profPicNode.children[i].firstChild.firstChild.src = 'https://graph.facebook.com/'+options['profPic'+i]+'/picture?type=square';
        } else {
            profPicNode.children[i].style.display = 'none';
        }
    }
}

function createOptions() {
    tempNode = document.createElement('div');
    tempNode.id = 'fbFixedOptions';
    tempNode.innerHTML = '<div id="fbFixedOptionsMain"><div id="fbFixedOptionsHeader"><h1>Facebook Fixed Header Options</h1><h2></h2></div><form id="fbFixedForm" name="fbFixedForm"></div><div id="fbFixedOptionsSubmitPanel"><input style="float: left;" id="fbFixedOptionsSubmit" onclick="return false;" type="submit" value="Submit" /><input style="float: left;" type="submit" value="Cancel" onclick="return false;" id="fbFixedOptionsCancel"><p style="float: right; margin: 6px 0 0;">Created by <a target="_blank" href="http://skoshy.com">Stefan Koshy</a> | Current Version: <b>'+currentVersion+'</b> | <a href="http://userscripts.org/scripts/show/103328" target="_blank">Check here for updates</a></p></div>';
    document.body.appendChild(tempNode);
    updateOptions();
    
    var submitListener = document.getElementById('fbFixedOptionsSubmit').addEventListener("click", changeOptions, true);
    var cancelListener = document.getElementById('fbFixedOptionsCancel').addEventListener("click", cancelOptions, true);
	var optLinkListener = document.getElementById('fbFixedOptionsLink').addEventListener("click", showOptions, true);
}

function showOptions() {
	document.getElementById('fbFixedOptions').style.display = 'block';
	document.getElementById('fbFixedOptionsBG').style.display = 'block';
	navAccount.classList.toggle('openToggler');
	var otherUserID = getUserID('other');
	if (!otherUserID) 
		document.getElementById('fbFixedOptionsHeader').getElementsByTagName('h2')[0].innerHTML = '<span style="color: maroon;">Not viewing a profile: go to a Profile/Page to get its ID.</span>';
	else
		document.getElementById('fbFixedOptionsHeader').getElementsByTagName('h2')[0].innerHTML = '<img src="https://graph.facebook.com/'+otherUserID+'/picture?type=square"> <b>'+document.getElementsByClassName('profileName')[0].innerHTML+'</b>\'s ID -- <textarea style="font-weight: bold; padding: 0; margin: 0; width: 150px; height: 14px; border: 1px solid black; background: transparent; text-align: center; font-size: 12px; color: red;" readonly="true">' + otherUserID + '</textarea>';
}

function updateOptions() {
    optionsNode = document.getElementById('fbFixedForm');
    var text = '<table style="width: 100%;"><tr><td style="width: 50%;"><p><input type="checkbox" name="topButtonEnabled" ';
    if (options.topButtonEnabled == 't')
        text += 'checked ';
    text += 'value="topButtonEnabled" /> Enable "Top" link</p></td><td style="width: 50%;"><p><input type="checkbox" name="profPicForSelf" ';
    if (options.profPicForSelf == 't')
        text += 'checked ';
    text += 'value="profPicForSelf" /> Enable a profile picture link instead of the "Profile" link</p></td></tr><tr><td style="width: 50%;"><p><input type="checkbox" name="enableFixedHeader" ';
	if (options.enableFixedHeader == 't')
        text += 'checked ';
	text += 'value="enableFixedHeader" /> Enable the fixed header</p></td><td style="width: 50%;"><p><input type="checkbox" name="disableFindFriendsLink" ';
	if (options.disableFindFriendsLink == 't')
        text += 'checked ';
	text += 'value="disableFindFriendsLink" /> Disable the <a href="http://i.imgur.com/ssFJ5.png" target="_blank">"Find Friends" link</a></p></td></tr></table><div style="display: table;"><table id="fbFixedOptionsProfPicTable" style="display: table-cell;"><tr><th>#</th><th>Profile Username/ID</th></tr><tr><td>1</td><td><input type="text" name="profPic0" class="fbFixedProfPicInput" value="'+options.profPic0+'"/></td></tr><tr><td>2</td><td><input type="text" name="profPic1" class="fbFixedProfPicInput" value="'+options.profPic1+'"/></td></tr><tr><td>3</td><td><input type="text" name="profPic2" class="fbFixedProfPicInput" value="'+options.profPic2+'"/></td></tr><tr><td>4</td><td><input type="text" name="profPic3" class="fbFixedProfPicInput" value="'+options.profPic3+'"/></td></tr><tr><td>5</td><td><input type="text" name="profPic4" class="fbFixedProfPicInput" value="'+options.profPic4+'"/></td></tr><tr><td>6</td><td><input type="text" name="profPic5" class="fbFixedProfPicInput" value="'+options.profPic5+'"/></td></tr><tr><td>7</td><td><input type="text" name="profPic6" class="fbFixedProfPicInput" value="'+options.profPic6+'"/></td></tr></table><p style="vertical-align: middle; background-color: rgba(255, 255, 100, 0.3); border: 1px solid #FFFF5A; padding: 10px; margin-top: 0; display: table-cell;"><b>Profile Picture Bookmarks Instructions</b><br/><br/>To modify/delete/add bookmarks to the Facebook header, change the values in the table below.<br/>A <b>username</b> is like http://facebook.com/<b>john.doe</b>. A <b>user ID</b> is like http://facebook.com/profile.php?id=<b>100438743</b>.<br/><br/>To get a friend\'s/Page\'s user ID easily, go to their profile and open up this options panel. Their user ID will display in the top right.</p></div>';
    optionsNode.innerHTML = text;
	
	for (var i = 0; i < document.getElementsByClassName('fbFixedProfPicInput').length; i++) {
		if (options['profPic'+i] == 'none')
			document.getElementsByClassName('fbFixedProfPicInput')[i].value = '';
	}
}