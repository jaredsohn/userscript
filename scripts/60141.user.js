// ==UserScript==
// @author         Derek Featherstone
// @version        0.1
// @name           LinkedInvite
// @namespace      http://userscripts.org/users/67390/
// @description    Change the default LinkedIn Invite Message
// @include        http://www.linkedin.com/inviteFromProfile*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {

	// get the person's name
	var pName = $('h1 strong').text();
	
	// get my name from my vcard
	var myName = $('#vcard .given-name').text();

	// feel free to change this text to whatever you want
	
	$('#greetingText-iweReconnect').html("Hi " + pName + ",\n\nJust a quick note -- I saw you are here on LinkedIn and thought it would be good to connect. Hope you're well.\n\nCheers,\n" + myName);
	
}());


