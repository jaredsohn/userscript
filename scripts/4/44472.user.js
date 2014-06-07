// ==UserScript==
// @name           OWA 2007 New Mail Popup Notifier
// @namespace      OWA.newmailpopupnotifyer
// @description    This script is a replacement for "OWA Unread Message Counter" (http://userscripts.org/scripts/show/44388). It includes popup notification of new email. The two scripts both refresh the page every minute so do not run both.
// @include        *
// ==/UserScript==

var resfreshIntevalInMinutes = 1;
var popupTimeoutInSeconds = 5;

// Add jQuery
var JQInclude = document.createElement('script');
JQInclude.src = 'http://jquery.com/src/jquery-latest.js';
JQInclude.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(JQInclude);

// Check if jQuery's loaded
function waitForJQuery() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJQuery,100); }
	else { $ = unsafeWindow.jQuery; runJQuery(); }
}
waitForJQuery();
	
// All your GM code must be inside this function
function runJQuery() {

	// Make sure we're in the inbox
	if (-1 !== document.title.indexOf('Inbox')) {

		var divClone = $('.dv:last').clone();
		divClone.insertAfter($('#lnkHdrcheckmessages').parent());

		var notifyStatus = GM_getValue("notifyStatus", "noStatus");

		if (notifyStatus == "noStatus") {
			notifyStatus = "On";
			GM_setValue("notifyStatus", notifyStatus);
		}

		var notifyToggle = createNotifyButton(notifyStatus);
		notifyToggle.insertAfter(divClone);

		var unreadMessages = $(".sI[alt='Message: Unread']");
		var numRows = unreadMessages.length;
		var sender = getLatestUnreadSender();
		document.title = '(' + (numRows) + ') Inbox - ' + sender;

		var pageNumber = $('table.tbft .pTxt:not(table.tbft .pTxt:has(a))').text();
		if (pageNumber == 1) {
                        // if the popup notification is enabled
			if (GM_getValue("notifyStatus") == "On") {
				var topMessageAlt = $(".sI").eq(0).attr("alt");
                                // if it is not the same email as last time and it is unread then activate popup
				if (GM_getValue("sender") != sender && topMessageAlt == "Message: Unread") {
					newMailWindow = window.open("", "newmail", "width=330,height=40,screenX=" + GM_getValue('popupX') + ",screenY=" + GM_getValue('popupY'));
					newMailWindow.document.write('<html><head><title>New Mail</title></head><body>');
					newMailWindow.document.write('You have new mail from: <br>'+sender+'</body>');
			
					var popupTimeout = popupTimeoutInSeconds * 1000;
					var winHTML = "<script type='application/x-javascript'>";
					winHTML = winHTML + "window.setTimeout((function(){window.close()}), "+popupTimeout+");"
					winHTML = winHTML + "<\/script>";
					newMailWindow.document.write(winHTML);
					window.setTimeout((function(){GM_setValue('popupX', newMailWindow.screenX); GM_setValue('popupY', newMailWindow.screenY);}), popupTimeout-100);
				}
			}
			GM_setValue("sender", sender);
		}
		
		// Refresh page
  		window.setTimeout((function(){
			unsafeWindow.chkMsgs();
     		}), resfreshIntevalInMinutes * 60000);
	}

}

function createNotifyButton(status) {
	var button = $('<td nowrap=""><a id="lnkHdrnotifyToggle" title="Notify" class="btn" href="#">Popup Notification: '+status+'</a></td>', window.document);
	button.click(toggleNotifyStatus);
	return button;
}

function toggleNotifyStatus() {
	window.setTimeout(function(){
		if (GM_getValue("notifyStatus") == "On") {
			GM_setValue("notifyStatus", "Off");
		} else {
			GM_setValue("notifyStatus", "On");
		}

		$('#lnkHdrnotifyToggle').parent().replaceWith(createNotifyButton(GM_getValue("notifyStatus")));
	}, 0);
}

function getLatestUnreadSender() {
	var firstUnreadIndex =  $(".sI").index($(".sI[alt='Message: Unread']:first"));
	return $.trim($("table.lvw tbody tr").eq(firstUnreadIndex + 3).text()); 
}
