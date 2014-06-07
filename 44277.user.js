// Title:	MessageUpdater
// Version: 	0.1b (beta version)
// Date:	14-March-2009
// Author:	Diado
// URL:	http://diado.deviantart.com/
// Note:	This is a beta version of MessageUpdater, so please report any bugs or feature requests to Diado at the above URL.
// Disclaimer:	This script is provided 'as is', without any warranty or guarantee of any kind.
//
// ==UserScript==
// @name          MessageUpdater v0.1b
// @namespace     MessageUpdater
// @description   Updates the Messages link on dAmn pages with any new messages without having to leave or refresh the page
// @include       http://chat.deviantart.com/*
// @exclude       http://chat.deviantart.com/global/*
// ==/UserScript==

GM_log('MessageUpdater initialisation commencing...');

var ma_GM, ma_inboxID;

function ma_GMObj() {

	this.getFolderIdByDiFi = function (folderName, isInbox) {
		if (isInbox == true) {
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://chat.deviantart.com/global/difi.php?c[0]=MessageCenter;get_folders;&t=xml',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
					var status, contentElements, inboxID, folderID, isInbox;
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText, 'application/xml');
					var statusElements = dom.getElementsByTagName('status');
					if (statusElements.length > 0) {
						status = true;
						for (var i = 0; i < statusElements.length; i++) {
							if (statusElements[i].textContent != 'SUCCESS') {
								status = false;
								break;
							}
						}
						if (status == true) {
							contentElements = dom.getElementsByTagName('content');
							if (contentElements.length > 0) {
								for (var i = 0; i < contentElements.length; i++) {
									folderID = contentElements[i].getElementsByTagName('folderid')[0].textContent;
									isInbox = contentElements[i].getElementsByTagName('is_inbox')[0].textContent;
									if (isInbox = '1') {
										GM_setValue('ma_inboxID', folderID);
										el_inboxID.value = folderID;
										break;
									}
								}
							} else {
								alert('MessageUpdater: Error retrieving inbox ID (code 3)');
							}
						} else {
							alert('MessageUpdater: Error retrieving inbox ID (code 2)');
						}
					} else {
						alert('MessageUpdater: Error retrieving inbox ID (code 1)');
					}
			    }
			});		
		} else {
		}
	}
	
	this.insertScript = function () {
		var ma_script = document.createElement('script');
		ma_script.appendChild(document.createTextNode((<r><![CDATA[
		
			var xmlhttp = new XMLHttpRequest();
			var ma_parseMessageXML = function () {
				var parser, dom, responseElements, msgCount, msgClass, rockDock, linkSuffix, msgTotal;
				var linkTitle = '';
				var msgsNews = 0;
				var msgsJournals = 0;
				var msgsPolls = 0;
				var msgsAdmin = 0;
				var msgsNotices = 0;
				var msgsContests = 0;
				var msgsComments = 0;
				var msgsReplies = 0;
				var msgsActivities = 0;
				var msgsDeviations = 0;
				var msgsNotes = 0;
				var isMessages = false;
				if (xmlhttp.readyState==4) {
					if (xmlhttp.status==200) {
						parser = new DOMParser();
						dom = parser.parseFromString(xmlhttp.responseText, 'application/xml');
						responseElements = dom.getElementsByTagName('response');
						for (var i = 0; i < responseElements.length; i++) {
							msgCount = parseInt(responseElements[i].getElementsByTagName('matches')[0].textContent);
							if (msgCount > 0) {
								msgClass = responseElements[i].getElementsByTagName('msgclass')[0].textContent;
								switch (msgClass) {
									case 'dw_news':
										msgsNews = msgCount;
										isMessages = true;
										break;
									case 'dw_journals':
										msgsJournals = msgCount;
										isMessages = true;
										break;
									case 'dw_pollblogs':
										msgsPolls = msgCount;
										isMessages = true;
										break;
									case 'admin':
										msgsAdmin = msgCount;
										isMessages = true;
										break;
									case 'notices':
										msgsNotices = msgCount;
										isMessages = true;
										break;
									case 'contests':
										msgsContests = msgCount;
										isMessages = true;
										break;
									case 'fb_comments':
										msgsComments = msgCount;
										isMessages = true;
										break;
									case 'fb_replies':
										msgsReplies = msgCount;
										isMessages = true;
										break;
									case 'fb_activity':
										msgsActivities = msgCount;
										isMessages = true;
										break;
									case 'dw_deviations':
										msgsDeviations = msgCount;
										isMessages = true;
										break;
									case 'notes_unread':
										msgsNotes = msgCount;
										isMessages = true;
										break;
								}
							}
						}
						rockDock = document.getElementById('rockdock-message-count');
						rockDock.innerHTML = '';
						if (isMessages == true) {
							msgTotal = msgsComments + msgsReplies + msgsActivities + msgsNews + msgsPolls + msgsContests + msgsNotices + msgsAdmin + msgsJournals;
							if (msgsDeviations > 0) {
								linkSuffix = (msgsDeviations > 1) ? 's' : '';
								rockDock.innerHTML = '<a href="http://my.deviantart.com/messages/#view=deviations">' + msgsDeviations +' Deviation' + linkSuffix + '</a>, ';
							}
							if (msgTotal > 0) {
								linkSuffix = (msgTotal > 1) ? 's' : '';
								if (msgsComments > 0) {
									linkTitle += msgsComments + 'C ';
								}
								if (msgsReplies > 0) {
									linkTitle += msgsReplies + 'R ';
								}
								if (msgsActivities > 0) {
									linkTitle += msgsActivities + 'A ';
								}
								if (msgsNews > 0) {
									linkTitle += msgsNews + 'NW ';
								}
								if (msgsPolls > 0) {
									linkTitle += msgsPolls + 'P ';
								}
								if (msgsNotices > 0) {
									linkTitle += msgsNotices + 'N ';
								}
								if (msgsAdmin > 0) {
									linkTitle += msgsComments + 'Am '; //?????????
								}
								if (msgsJournals > 0) {
									linkTitle += msgsJournals + 'J ';
								}
								if (msgsContests > 0) {
									linkTitle += msgsContests + 'Co '; //?????????
								}
								rockDock.innerHTML += '<a href="http://my.deviantart.com/messages" title="' + linkTitle + '">' + msgTotal +' Message' + linkSuffix + '</a>';
							} else {
								if (msgsNotes == 0) {
									rockDock.innerHTML += '<a href="http://my.deviantart.com/messages">No Messages</a>';
								}
							}
							if (msgsNotes > 0) {
								linkSuffix = (msgsNotes > 1) ? 's' : '';
								if (msgTotal > 0) {
									rockDock.innerHTML += ', ';
								}
								rockDock.innerHTML += '<a href="http://my.deviantart.com/notes">' + msgsNotes +' Note' + linkSuffix + '</a>';
							}
						} else {
							rockDock.innerHTML = '<a href="http://my.deviantart.com/messages">No Messages</a>';
						}
					} else {
						alert("MessageUpdater: Problem retrieving message data (code 4)");
					}
				}
			};

			var ma_checkMessages = function () {
				var interval = parseInt(document.getElementById('ma_interval').value);
				var inboxID = document.getElementById('ma_inboxID').value;
				var url = 'http://chat.deviantart.com/global/difi.php?c[0]=MessageCenter;get_views;' + inboxID + ',oq:dw_news:0:40:f&t=xml';
				url += '&c[1]=MessageCenter;get_views;' + inboxID + ',oq:dw_journals:0:40:f&t=xml';
				url += '&c[2]=MessageCenter;get_views;' + inboxID + ',oq:dw_pollblogs:0:40:f&t=xml';
				url += '&c[3]=MessageCenter;get_views;' + inboxID + ',oq:admin:0:40:f&t=xml';
				url += '&c[4]=MessageCenter;get_views;' + inboxID + ',oq:notices:0:40:f&t=xml';
				url += '&c[5]=MessageCenter;get_views;' + inboxID + ',oq:contests:0:40:f&t=xml';
				url += '&c[6]=MessageCenter;get_views;' + inboxID + ',oq:fb_comments:0:40:f&t=xml';
				url += '&c[7]=MessageCenter;get_views;' + inboxID + ',oq:fb_replies:0:40:f&t=xml';
				url += '&c[8]=MessageCenter;get_views;' + inboxID + ',oq:fb_activity:0:40:f&t=xml';
				url += '&c[9]=MessageCenter;get_views;' + inboxID + ',oq:dw_deviations:0:40:f&t=xml';
				url += '&c[10]=MessageCenter;get_views;' + inboxID + ',oq:notes_unread:0:40:f&t=xml';
				xmlhttp.onreadystatechange = ma_parseMessageXML;
				xmlhttp.open("GET", url, true);
				xmlhttp.send(null);
				window.setTimeout('ma_checkMessages()', interval);
			}

			var interval = parseInt(document.getElementById('ma_interval').value);
			window.setTimeout('ma_checkMessages()', interval);

		]]></r>).toString()));
		document.getElementsByTagName('head')[0].appendChild(ma_script);
	}

	var el_inboxID = document.createElement('input');
	el_inboxID.type = 'hidden';
	el_inboxID.id = 'ma_inboxID';
	var inboxID = GM_getValue('ma_inboxID', '0');
	if (inboxID == '0') {
		this.getFolderIdByDiFi('', true);
	} else {
		el_inboxID.value = inboxID;
	}
	document.body.appendChild(el_inboxID);

	var el_interval = document.createElement('input');
	el_interval.type = 'hidden';
	el_interval.id = 'ma_interval';
	var interval = GM_getValue('ma_interval', '120000');
	el_interval.value = interval;
	document.body.appendChild(el_interval);
	
}

ma_GM = new ma_GMObj();
ma_GM.insertScript();
GM_log('MessageUpdater initialisation successful.');

