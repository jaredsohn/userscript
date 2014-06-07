// ==UserScript==
// @name           Mailinator Append Domain Name
// @namespace      iamai.pip.verisign.com
// @description    Appends a user set domain name to the username
// @include        http://mailinator.com/maildir.jsp?*
// @include        http://mailinator.com/showmail.jsp?*
// @include        http://mailinator.com/displayemail.jsp?*
// @include        http://*.mailinator.com/maildir.jsp?*
// @include        http://*.mailinator.com/showmail.jsp?*
// @include        http://*.mailinator.com/displayemail.jsp?*
// ==/UserScript==

// The name of the Greasemonkey property to store the domain name
const DOMAIN_GM_PROP = "domain";
const USERNAME = location.search.match(/email=([A-Z0-9._+-]*)/i)[1];

// Add a GM menu command for updating the domain name
GM_registerMenuCommand("Set domain name...", promptForDomain, 'd', "control alt", 's');

addDomainToPage();

function promptForDomain() {
	var domain = prompt("Enter domain name:", GM_getValue(DOMAIN_GM_PROP, ''));
	GM_setValue(DOMAIN_GM_PROP, domain);
	addDomainToPage();
}

function addDomainToPage() {
	var node = document.getElementById("mainCol").childNodes[1];
	var domain = GM_getValue(DOMAIN_GM_PROP, '')
	var email = USERNAME + ((domain != '') ? "@" + domain : '');
	
	if (node.childNodes[1].tagName == "A" &&
		node.childNodes[1].href == ("http://" + document.domain +
		"/maildir.jsp?email=" + USERNAME))
	{
		node.childNodes[1].textContent = email;
	} else {
		node.firstChild.nodeValue = "Inbox for: " + email;
	}
}