// ==UserScript==
// @name           Are You Interested Fixer
// @namespace      http://userscripts.org/users/productionm
// @include        http://apps.facebook.com/areyouinterested/*
// @require        http://code.jquery.com/jquery-1.3.2.js
// ==/UserScript==

function matchesHandler() {
	var upgradeDivArray = $('div[id*="upsell-modal-frame"]');
	if (upgradeDivArray.length == 0) {
		alert('The upgradeDiv array is empty!');
	} else if (upgradeDivArray.length > 1) {
		alert('The upgradeDiv array has more than 1 element');
	} else {
		var upgradeDiv = upgradeDivArray[0];
		upgradeDiv.parentNode.removeChild(upgradeDiv);
	}
};

function otherHandler() {
	// do nothing
}

var Action = {
	MATCHES : {
		handler: matchesHandler
	},
	OTHER:  {
		handler: otherHandler
	}
};

try {
	var url = new String(window.location);
	var action = getAction(url);
	action.handler();
} catch (err) {
	var txt="There was an error on this page.\n\n";
	txt+="Error description: " + err.message + "\n\n";
	txt+="Click OK to continue.\n\n";
	alert(txt);	
}

function getAction(url) {
	if (url.indexOf('action=like_state&like_state=match') > 0 
	      || url.indexOf('action=match') > 0) {
		return Action.MATCHES;
	} else {
	   return Action.OTHER;
	}
}