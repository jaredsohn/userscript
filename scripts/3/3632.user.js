// ==UserScript==
// @name            Preview Posts for StumbleUpon
// @namespace       thlayli.detrave.net
// @description     Adds a preview button to StumbleUpon forums and contact pages
// @include         http://*.group.stumbleupon.com/forum/*
// @include         http://*.stumbleupon.com/contact/
// @license         http://www.gnu.org/copyleft/gpl.html
// @version         2.0.2
// @contributor     StrangeJ
// ==/UserScript==
//
// You may add some info manually in order to preview forum posts with your avatar.
// Adjust the prefString to include your details. You can enter multiple accounts seperated by semicolons.
// 
// Format: "NAME,ID,FANS,SPONSOR"
// NAME - Your SU user name. Case sensitive.
// ID - You can find your ID# by looking at the URL of your avatar image.
// FANS - How full is your "fan box" in the forums? A number from 1-4.
// SPONSOR - Are you a sponsor? Yes or no.
//
// e.g. prefString = "Thlayli,347013,4,yes;StrangeJ,176894,4,yes;aNoob,000000,0,no";

var prefString = "";

// Don't edit below this line.

var editFlag = false;
var draftFlag = false;
var realSubmit = false;

var draftWarnings = GM_getValue('draftWarnings', true);
GM_setValue('draftWarnings', draftWarnings);
var prefSet = prefString.replace(" ","").split(';');
var url = document.location.href.split('.');

// auto-update variables
var script_title = 'Preview Posts for StumbleUpon';
var source_location = 'http://thlayli.detrave.net/su-preview.user.js';
var version_holder = 'http://thlayli.detrave.net/su-preview.version.txt';
var current_version = '2.0.2';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');
GM_registerMenuCommand('Update - '+script_title, CheckVersion);
CheckForUpdate();

// get user name
var publicLink = xpath(document, "//a[contains(@href, '.stumbleupon.com/public/')]").snapshotItem(0);
var userName = publicLink.href.match('/http:\/\/([^\.]+)\.stumbleupon\.com\/public\//');
var thisStumbler = publicLink.textContent;

if(url[1] == 'group'){ //forum
	var field = document.getElementById('posttext').wrappedJSObject;
	if(field)
		if(field.value == ''){
			var msg = 'You have drafted a Post. Changes will be lost.';
		}else{
			var msg = 'You have drafted an Edit. Changes will be lost.';
			var originalPost = field.value;
		}
	if(document.getElementsByTagName('textarea').length > 0 && document.getElementsByTagName('textarea').item(0).className != 'darkbox'){
		var multiLine = false;
		var postButton = document.forms.item(document.forms.length-1).elements.item(document.forms.item(document.forms.length-1).elements.length-1);
		var finalPost = document.getElementsByTagName('table').item(document.getElementsByTagName('table').length-4).parentNode.parentNode;
		var buttonName = postButton.value.substr(0,4);
		var space = document.createTextNode(' ');
		var previewButton = document.createElement('input');
		previewButton.type = 'button';
		previewButton.className = 'bold';
		previewButton.value = 'Preview ' + buttonName;
		var submitProxyButton = postButton.cloneNode(true);
		postButton.style.display = 'none';
		submitProxyButton.id = 'proxy';
		postButton.parentNode.insertBefore(previewButton,postButton.nextSibling);
		postButton.parentNode.insertBefore(submitProxyButton,previewButton);
		postButton.parentNode.insertBefore(space,previewButton);
		previewButton.addEventListener('click', forumPreview, false);
		if(document.getElementsByTagName('table').item(8).rows.length>3){
			var multiLine = true;
			var finalBar = document.getElementsByTagName('table').item(8).rows.item(document.getElementsByTagName('table').item(8).rows.length-4);
		}
		if(buttonName == 'Post'||buttonName == 'Edit'){
			var userName = postButton.value.split(' ');
			userName = userName[2];
		}
		var nameStop = false;
		for(i=0;i<prefSet.length;i++){
			prefSplit = prefSet[i].split(',');
			if(nameStop == false){
				if(userName.toLowerCase() == prefSplit[0].toLowerCase()){
					nameStop = true;
					var stumbleName = prefSplit[0];
					var avatar = 'superminipics/' + prefSplit[1] + '.jpg'; 
					if(prefSplit[3] == 'yes'){
						var gb = 'd.gif'
						var sponsorMarkup = "<span class=mini><a href='http://stumbleupon.com/sponsor.php'>Sponsor</a>";
					}else{
						var gb = '.gif';
						var sponsorMarkup = '';
					}
					var rankBox = 'arank' + prefSplit[2] + gb;
				}else{
					var stumbleName = userName;
					var avatar = 'images/nopic_small.jpg';
					var rankBox = 'arank0.gif';
					var sponsorMarkup = '';
				}
			}
		}
		unsafeWindow.onbeforeunload = unloadPreview;
		document.getElementById('proxy').wrappedJSObject.onclick = submitProxy;
		field.onkeyup = function() {draftFlag = true;};
	}
} else { //contact
	var userId = xpath(document, "//input[contains(@name, 'auth_user')]").snapshotItem(0).value;
	if(document.getElementById('msgContent')){
		var field = document.getElementById('msgContent').wrappedJSObject;
		var msg = 'You have drafted a Message. Changes will be lost.';
		var postButton = xpath(document, "//input[@value='Send Message >']").snapshotItem(0);
		var avatar = 'superminipics/' + userId + '.jpg'; 
		var previewButton = document.createElement('input');
		previewButton.className = 'btnGreen';
		previewButton.type = 'button';
		previewButton.style.marginLeft = '6px';
		previewButton.value = 'Preview Message';
		if(postButton){
			var submitProxyButton = postButton.cloneNode(true);
			postButton.style.display = 'none';
			submitProxyButton.id = 'proxy';
			postButton.parentNode.insertBefore(previewButton,postButton.nextSibling);
			postButton.parentNode.insertBefore(submitProxyButton,previewButton);
			previewButton.addEventListener('click', contactPreview, false);
			document.getElementById('proxy').wrappedJSObject.onclick = submitProxy;
			unsafeWindow.onbeforeunload = unloadPreview;
			field.onkeyup = function() {if(draftFlag != true) draftFlag = true;};
		}
	}
}

function forumPreview(){
	var m = ' ' + document.getElementById('posttext').value;
	var n = "$1<a href='$2$3$4$5$6$7'>$4$5$6</a> <a href='http://www.stumbleupon.com/url/$3$4$5$6$7'><span class='mini'><span class='text2'>[$5]</span></span></a>";
	postText = m.replace(/([^="'])(http:\/\/)(www\.)?([[^\d\s]*?\.])?([^\/\s\?]*)(\S[^\?\s]+)?(\?[^"'\r\n\s]+)?([^\r\n\s\?])?/gi, n);
	postText = postText.replace(/^\s/,'');
	postText = postText.replace(/\r|\n/g,'<br>');
	if(buttonName == 'Post'){
		var postText = '<td id="preview" class="lightbg" align="center" valign="top"><a href="http://' + stumbleName.toLowerCase() + '.stumbleupon.com/"><img src="http://www.stumbleupon.com/' + avatar + '" border="0" hspace="4"></a><br>' + sponsorMarkup + '</td><td class="lightbg" valign="top" width="100%"><table cellpadding="2" cellspacing="0" width="100%"><tbody><tr><td class="lightbg"><a name="end"></a><a target="_top" href="http://' + stumbleName.toLowerCase() + '.stumbleupon.com/"><img alt="' + stumbleName.toLowerCase() + '" src="http://www.stumbleupon.com/images/' + rankBox + '" border="0"> ' + stumbleName + '</a></td><td class="lightbg" align="right"><span class="date"><b>Preview</b></span></td></tr><tr><td colspan="2" class="lightbg">' + postText + '</td></tr></tbody></table><br><br style="font-size: 4px;"></td>';
		if(!document.getElementById('preview')){
			var previewPost = finalPost.cloneNode(true);
			var previewBarRow = document.createElement('tr');
			var previewBar = document.createElement('td');
			finalPost.parentNode.insertBefore(previewPost,finalPost.nextSibling);
			finalPost.parentNode.insertBefore(previewBarRow,previewPost);
			previewBarRow.appendChild(previewBar);
			previewBar.innerHTML = '<hr class=bg style="margin-bottom: 5px;">';
			previewBar.id = 'bar';
			previewBar.colSpan = '2';
			previewPost.innerHTML = postText;
		} else {
			document.getElementById('preview').parentNode.innerHTML = postText;
		}
	}
	if(buttonName == 'Edit'){
		finalPost.firstChild.nextSibling.firstChild.firstChild.firstChild.nextSibling.innerHTML = "<td colspan='2' class='lightbg'>" + postText + '</td>';
		finalPost.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.innerHTML = '<b>Preview</b>';
		editFlag = true;
	}
	previewButton.value = 'Update Preview';
}

function contactPreview(){
	var messageText = document.getElementById('msgContent').value;
	messageText = messageText.replace(/\r|\n/g,'<br>');

	if(!document.getElementById('preview')){
		var msgDiv = xpath(document, "//div[@class='listMsgs' and last()]").snapshotItem(0);
		var previewDl = document.createElement('dl');
		previewDl.className = "dlPM";
		previewDl.innerHTML = '<dd class="thumbnail"><a style="background-image: url(http://www.stumbleupon.com/' + avatar + ');" title="' + thisStumbler + '" href="http://' + thisStumbler.toLowerCase() + '.stumbleupon.com/"><img src="http://cdn.stumble-upon.com/images/s.gif"/></a></dd><dt class="message_00000000"><a href="http://' + thisStumbler.toLowerCase() + '.stumbleupon.com/" class="textEm">' + thisStumbler + '</a> <span id="preview">' + messageText + '</span></dt><dd><span class="message_00000000"><span class="right textUncolor">Preview</span></span><span onclick="javascript:void(0);" style="display: none;" id="undelete_message_00000000">Message Deleted. <a href="javascript:void(0);">Click to un-delete</a>.</span></dd>';
		if(topMsg = msgDiv.firstChild.nextSibling)
			topMsg.parentNode.insertBefore(previewDl,topMsg);
		else
			msgDiv.appendChild(previewDl);
		previewButton.value = 'Update Preview';
	}else{
		document.getElementById('preview').innerHTML = messageText;
	}
}

function unloadPreview(){
	if(realSubmit != true && draftWarnings == true){
		if(document.getElementById('preview')){
			if(url[1] == 'group'){
				return 'You have previewed a Post. Changes will be lost.';
			} else {
				return 'You have previewed a Message. Changes will be lost.';
			}
		}else{
			originalPost = (originalPost) ? originalPost : '';
			if(draftFlag == true){
				if(field.value != '' && originalPost != field.value){
					return msg;
				}
			}
		}
		if(editFlag == true){
			return 'You have previewed an Edit. Changes will be lost.';
		}
	}
}

function submitProxy(){
	realSubmit = true;
	if(url[1] == 'group'){
		document.forms.item(document.forms.length-1).submit();
	}else{
		unsafeWindow.submitForm('sendMessageForm');
	}
}
function xpath(obj, query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						if(current_version == latest_version[1] && manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                    SkipWeeklyUpdateCheck();
                }
                   
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}