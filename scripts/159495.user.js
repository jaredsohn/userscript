// ==UserScript==
// @name        gMail Unread Label Menu Item
// @namespace   unequal-solutions
// @description Adds a new menu item to gmail to display unread mails
// @include     *mail.google.com/*
// @grant       unsafeWindow
// @version     0.051
// ==/UserScript==

/*
**	
**	(C) 2013 unequal-solutions, Lothar Geisinger
**				 -- free to use --
**	
**	Internet: http://www.unequal-solutions.de
**	
*/

function fUnreadLabelGetQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function fUnreadLabelEnabler() {

	if (document.getElementById("unreadLabel") == null) {


		var aUnreadLabelLngUnreadMails = {
			fr: "Non lus",
			de: "Ungelesen",
			en: "Unreaded",
			undefined: "Unreaded"
		};

		var sUnreadLabelHTML = "";	
		var oUnreadLabelContainer = document.getElementsByClassName("TK")[0];
		
		
		if (oUnreadLabelContainer != null) {	
		
			var oUnreadLabelURLQuery = fUnreadLabelGetQueryParams(document.location.search);
			var sUnreadLabelOriginal = oUnreadLabelContainer.innerHTML;

			sUnreadLabelHTML += '<div id="unreadLabel" style="padding-left:18px;font-weight:bold;">';
			sUnreadLabelHTML += '	<a href="#search/label%3Aunread" style="text-decoration:none; color:black; " onclick="window.location.href=\'#search/label%3Aunread\';">';
			sUnreadLabelHTML += '		' + aUnreadLabelLngUnreadMails[oUnreadLabelURLQuery.hl] + '';
			sUnreadLabelHTML += '	</a>';
			sUnreadLabelHTML += '</div>';
			sUnreadLabelHTML += '';
			sUnreadLabelHTML += '';
			sUnreadLabelHTML += '';
			sUnreadLabelHTML += sUnreadLabelOriginal;

			oUnreadLabelContainer.innerHTML=sUnreadLabelHTML;
		
		}

	}
	window.setTimeout(fUnreadLabelEnabler, 1000);
}
window.setTimeout(fUnreadLabelEnabler, 1000);

