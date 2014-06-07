// ==UserScript==
// @name           Bungie PM Sentbox
// @author		Paul Maravelias (paulmarv)
// @namespace     http://www.bungie.net
// @description   Adds a sentbox to the message center.
// @include       http://*bungie.net/Account/Profile.aspx*
// ==/UserScript==

//                                           //
/* Declarations, Headers, and Tool Functions */
//                                           //

var sentbox = new Array();
var msg = document.createElement('div');
var mainContent = document.getElementById('ctl00_mainContent_mp1');
var main;

var SENT_TABLE_HEADER = '<table class="grid" style="margin: 0px;"><tr><th><h3></h3></th><th><h4>To</h4></th><th><h4>Subject</h4></th><th style="width:135px;"><h4>Sent</h4></th></tr>        ';
var SENT_TABLE_FOOTER = '</table><div class="formgroup3" >' + printButton('sentPMDeleteSelectedButton', 'Delete Selected') + '&nbsp;&nbsp;&nbsp;&nbsp;' + printButton('sentPMDeleteAllButton', 'Delete All') + '<div class="clear" ></div></div>';

function sentMessage() {
	this.to = "";
	this.body = "";
	this.subject = "";
	this.time = "";
}

function getUrlParameter(name){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if(results == null) {
    return "";
  } else {
    return results[1];
  }
}
function twoDigitStr(i) {
	var s = "" + i;
	if(s.length > 1) {
		return i;
	} else {
		return "0" + i;
	}
}
function isSentbox() {
 	return getUrlParameter('sentbox') == 'true';
}
function isPMPage() {
 	return getUrlParameter('page') == 'PostMsg' || getUrlParameter('act') == 'reply' || getUrlParameter('act') == 'msg';
}

function trimStr(str) {
	return str.replace(/^\s+|\s+$/g, "");
}
function nl2br(str, is_xhtml) {
    breakTag = '<br />';
    if (typeof is_xhtml != 'undefined' && !is_xhtml) {
        breakTag = '<br>';
    }
 
    return (str + '').replace(/([^>]?)\n/g, '$1'+ breakTag +'\n');
}
function translateForumMarkup(str) {
	str = str.replace(/\x5Bquote\x5D/gi, '<span class="IBBquotedtable">');
	str = str.replace(/\x5B\x2Fquote\x5D/gi, '</span>');
	str = str.replace(/\x5Bb\x5D/gi, '<b>');
	str = str.replace(/\x5B\x2Fb\x5D/gi, '</b>');
	str = str.replace(/\x5Bi\x5D/gi, '<i>');
	str = str.replace(/\x5B\x2Fi\x5D/gi, '</i>');
	str = str.replace(/\x5Bu\x5D/gi, '<u>');
	str = str.replace(/\x5B\x2Fu\x5D/gi, '</u>');
	return str;
}
function getDateStr() {
	var nowDate = new Date();
	
	var hours = nowDate.getHours();
	var minutes = nowDate.getMinutes();
	var meridian = "AM";
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	if(hours > 11){
		meridian = "PM";
		hours = hours - 12;
	}
	if(hours == 0) {
		hours = 12;
	}
	var dateStr = (nowDate.getMonth() + 1) + "/" + nowDate.getDate() + "/" + nowDate.getFullYear() + " " + hours + ":" + minutes + " " + meridian;
	return dateStr;
}
function subjectLimit(str)
{
	if(str.length > 20)
	{
		str = str.substr(0, 20) + '...';
	}
	return str;
}
function writeSentMessageItem(i, message, even) {
	var cString;
	cString = 'odd';
	if(even) {
		cString = 'even';
	}
	return '<tr class="' + cString +'" ><td style="text-align: center;"><input id="ctl00_mainContent_msgRepeater1_ctl' + twoDigitStr(i) + '_ctl00_checkFlag" type="checkbox" name="ctl00$mainContent$msgRepeater1$ctl' + twoDigitStr(i) + '$ctl00$checkFlag" /></td><td><p class="mListItem"><span class="mListItem_a"><a id="ctl00_mainContent_msgRepeater1_ctl' + twoDigitStr(i) + '_ctl00_hFromUser">' + message.to + '</a></span></p></td><td><p class="mListItem"><a id="ctl00_mainContent_msgRepeater1_Click_ctl' + twoDigitStr(i) + '_ctl00_hSubject" href="javascript:"\>' + subjectLimit(message.subject) + '</a></p></td><td><p class="mListItem"><a id="ctl00_mainContent_msgRepeater1_Click_ctl' + twoDigitStr(i) + '_ctl00_hLastPost">' + message.time + '</a></p></td></tr>    ';
}
function writeSentMessage(message) {
	return ' <div class="colLast" style="width:413px" ><div class="block-b"><div id="ctl00_mainContent_readMessagePanel"><div class="messagebg"> <span id="ctl00_mainContent_msgDisplay"><div class="forumpost"><div class="messageheader"><h4>Subject: ' + message.subject + '<br />To: ' + message.to + '</h4></div>  <div class="messagebody" id="postbodyDiv"><p id="PostBlock" class="message_text">' + translateForumMarkup(nl2br(message.body)) + '</p></div><div class="message-actions" id="postactionsDiv" ><br class="clear" /><ul><li></li></ul></div></div></span></div></div></div></div> </div>';
}
function printButton(id, value) {
	return "<input id='" + id + "' style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"document.getElementById('" + id + "').style.borderColor='#56AACD';document.getElementById('" + id + "').style['background']='#17668a';document.getElementById('" + id + "').style['color']='#FFFFFF'\" onmouseout=\"document.getElementById('" + id + "').style['background']='#1b1d1f';document.getElementById('" + id + "').style.borderColor='#5c5d5f';document.getElementById('" + id + "').style['color']='#a3a3a4'\" type='button' value='" + value + "'/>";
}

//                            //
/* GUI and Core Functionality */
//                            //

function displayMsg(i) {
	var messages = document.getElementById('ctl00_mainContent_messagesPanel');
	msg.innerHTML = writeSentMessage(sentbox[i]);
	messages.parentNode.insertBefore(msg, messages.nextSibling);
}
function renderNavBar() {
	mainNavContent = document.getElementById('ctl00_mainContent_mp1').getElementsByTagName('div')[0];
	var navbarSource;
	if(isSentbox()) {
		navbarSource = "<center><a href='http://www.bungie.net/Account/Profile.aspx?page=Messages&sentbox=false'>Inbox</a> | Sentbox</center>";
	} else {
		navbarSource = "<center>Inbox | <a href='http://www.bungie.net/Account/Profile.aspx?page=Messages&sentbox=true'>Sentbox</a></center>";
	}
	if(isSentbox()) {
		mainNavContent.innerHTML = navbarSource;
		mainContent.parentNode.parentNode.getElementsByClassName('first_previous_arrows')[0].style.display = 'none';
		mainContent.parentNode.parentNode.getElementsByClassName('last_next_arrows')[0].style.display = 'none';
		mainContent.parentNode.parentNode.getElementsByClassName('list-j')[0].style.display = 'none';
		document.getElementById('ctl00_mainContent_mp2').style.display = 'none';
	} else {
		mainNavContent.innerHTML = navbarSource + "<hr />" + mainNavContent.innerHTML;	
	}
}
function renderListEx(evenIndex) {
	tableSource = SENT_TABLE_HEADER;
	if(sentbox == null || sentbox.length == 0) {
		tableSource = tableSource + '<tr class="odd" ><td style="text-align: center;"></td><td><p class="mListItem"><span class="mListItem_a"><a id="ctl00_mainContent_msgRepeater1_ctl01_ctl00_hFromUser">    &nbsp;<p></p></a></span></p></td><td><br />---NO MESSAGES HAVE BEEN SENT---<br /></td><td></td></tr>    ';
	} else {
		for(i=sentbox.length-1;i>=0;i--) {
			tableSource = tableSource + writeSentMessageItem(i, sentbox[i], (i == evenIndex));
		}
	}
	tableSource = tableSource + SENT_TABLE_FOOTER;
	mainContent.parentNode.parentNode.getElementsByTagName('table')[0].innerHTML = tableSource;
	mainContent.parentNode.parentNode.getElementsByClassName('formgroup3')[1].style.display = 'none';
}
function renderList() {
	renderListEx(-1);
}
function addMessage(to, subject, body, time) {
	
	sentbox[sentbox.length] = new sentMessage();
	sentbox[sentbox.length - 1].to = to;
	sentbox[sentbox.length - 1].subject = subject;
	sentbox[sentbox.length - 1].body = body;
	sentbox[sentbox.length - 1].time = time;
}
function deleteSelectedMessages() {
	var cbElement;
	var sentboxDummy = new Array();
	for(i=0;i<sentbox.length;i++) {
		cbElement = document.getElementById('ctl00_mainContent_msgRepeater1_ctl' + twoDigitStr(i) + '_ctl00_checkFlag');
		if(cbElement != null) {
			if(!cbElement.checked) {
				sentboxDummy[sentboxDummy.length] = sentbox[i];
			}
		}		
	}
	sentbox.length = 0;
	sentbox = sentboxDummy;
}
function click_event(e) {
	var el=e.target;
	if (!el) return;
	if (!el.id) return;
	if((isPMPage()) && (el.id == 'ctl00_mainContent_messageForm_skin_submitButton') && (trimStr(document.getElementById('ctl00_mainContent_messageForm_skin_subject').value) != '') && 
		(trimStr(document.getElementById('ctl00_mainContent_messageForm_skin_body').value) != '')) {
		sentbox = eval(localStorage.getitem('sent_box_data'));
		if(sentbox == null) {
			sentbox = new Array();
		}
		addMessage(document.getElementById('ctl00_mainContent_header_lblUsername').innerHTML, document.getElementById('ctl00_mainContent_messageForm_skin_subject').value, 
																											   document.getElementById('ctl00_mainContent_messageForm_skin_body').value, 
																											   getDateStr());
		localStorage.setitem('sent_box_data', uneval(sentbox));
	} else if(el.id.indexOf('ctl00_mainContent_msgRepeater1_Click_ctl') > -1) {
		var msgIndex = el.id.substr('ctl00_mainContent_msgRepeater1_Click_ctl'.length, el.id.length-('ctl00_mainContent_msgRepeater1_Click_ctl'.length));
		msgIndex = msgIndex.substr(0, msgIndex.indexOf('_'));
		displayMsg(parseInt(msgIndex));
		renderListEx(parseInt(msgIndex));
	} else if((el.id == 'sentPMDeleteSelectedButton') && (confirm('This will delete the selected sent messages. Would you still like to continue?'))) {
		deleteSelectedMessages()
		renderList();
		localStorage.setitem('sent_box_data', uneval(sentbox));
	} else if((el.id == 'sentPMDeleteAllButton') && (confirm('This will permanently delete ALL your sent messages. Would you still like to continue?'))) {
		sentbox.length = 0; //OMG NO!
		renderList();
		localStorage.setitem('sent_box_data', uneval(sentbox));
	}
}

//                                               //
/* Entry Point, Initialization, and Finalization */
//     

main = document.getElementById('ctl00_mainContent_messagesPanel');
window.addEventListener('click', click_event, true);
if (main) {	
	renderNavBar();
	if(isSentbox()) {
		sentbox = eval(localStorage.getitem('sent_box_data'));
		renderList();
	}
} else {
	if(isPMPage()) {
		//document.getElementById('ctl00_mainContent_messageForm_skin_submitButton').innerHTML = '';
	}
}
//This script is not a natural formation. Someone built it.