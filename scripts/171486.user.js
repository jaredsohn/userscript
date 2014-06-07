// ==UserScript==
 // @name        LinkedIn dock badge for Fluid
 // @namespace   http://www.linkedin.com/ 
 // @description LinkedIn dock badge (Fluid SSB only) 
 // @include     http://*.linkedin.com/* 
 // @version     1.0
// ==/UserScript==

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
	var newBadge = '';

	var messagesEl = document.getElementById('header-messages-count');
	var messageTxt = '';
	if (messagesEl) {
		messageTxt = ''+ messagesEl.innerText;
		//window.console.log('messageTxt:'+ messageTxt);
	}
	var nrMessages = 0;
	if (messageTxt.length) {
		nrMessages = parseInt(messageTxt);
	}
	
	//window.console.log('nrMessages:'+ nrMessages);
	
	
	var notificationsEl = document.getElementById('nav-primary-inbox-item-total');
	var notificationsTxt = '';	
	if (notificationsEl) {
		notificationsTxt = ''+ notificationsEl.innerText;
		//window.console.log('notificationsTxt:'+ notificationsTxt);
	}
	
	var nrNotifications = 0;
	if (notificationsTxt.length) {
		nrNotifications = parseInt(notificationsTxt);
	}
	//window.console.log('nrNotifications:'+ nrNotifications);
	
	var total = nrMessages + nrNotifications;
	//window.console.log('total: '+ total);
	if (total > 0) {
			newBadge = total;
	}

	window.fluid.dockBadge = newBadge;
}
