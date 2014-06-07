// ==UserScript==
// @name           fs-degreener
// @namespace      formspring
// @description    Return to a more pleasant color scheme
// @include        http://www.formspring.me/*
// ==/UserScript==

// Replace lime green with an approximation to the old scheme
GM_addStyle('#header #main #inboxCount {background: #0C507E; color: #DDDDDD; !important;}');


var unread = document.getElementById('inboxCount');
// Get the current inbox count, that currently behaves as an unread notification. Hidden if 0
var quickHost = document.createElement('div');
GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.formspring.me/account/inbox',
		onload: function(response) {		
			var res = /id="content">[\s\S]*?href="http:\/\/www.formspring.me\/sent\/box"/.exec(response.responseText);
			// Parse only the relevant bit of page. Would be better with access to API
			quickHost.innerHTML = '<div '+res;
			quickHost.id = 'inboxPage';
			quickHost.setAttribute('style', 'display: none'); //Hide the required page
			document.body.appendChild(quickHost);
			try {
				var total = document.getElementById('inboxPage').getElementsByClassName('count')[0].textContent; // Total inbox count
				unread.textContent = total;
				unread.removeAttribute('style');
			}
			catch (e) {unread.textContent = ';_;';} // easter egg
			
		}
	});

