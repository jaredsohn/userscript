// ==UserScript== 
// @name Outlook.com TO Outlook
// @namespace By Kreshnik HASANI
// @description Sent Emails from Outlook.com Contacts using Outlook desktop software
// @author Kreshnik HASANI
// @include *mail.live.com/mail/contacts* 
// ==/UserScript== 
  
// Click listener
document.addEventListener('click', function(event) {

	// Get the parent element of the clicked element
	var email_brut = event.target.parentNode.innerHTML;
	
	if ((email_brut.indexOf('<span>@') > -1) && (email_brut.length < 1000))
	{
		// Format to email adress
		var reg=new RegExp("<span>", "g");
		var email = email_brut.replace(reg,"");
		reg=new RegExp("</span>", "g");
		email = email.replace(reg,"");
		
		// Launch default email manager
		location.href="mailto:" + email;
		
		// Stop Propagation
		event.stopPropagation();
		event.preventDefault();
	}

}, true);