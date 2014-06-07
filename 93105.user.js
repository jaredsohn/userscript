// ==UserScript==
			   // @name           SHAGUNTRAVELS_ITZ Master Card
			   // @namespace      dharmu20012001@gmail.com
			   // @description    Rapid I Cash Card Gateway.
			   // @include        http://www.icashcard.com/payment/servlet/IcashcardPaymentServlet*
			   // @include        https://www.icashcard.com/payment/servlet/PGChargesServlet
			   // @include        https://www.icashcard.com/payment/servlet/IcashcardPaymentServlet*
			   // @include        https://www.icashcard.com/payment/servlet/AccountAuthenticationServlet*
			   // @include        http://localhost/vally/IcashcardPaymentServlet.htm*
			   // @include        http://localhost/vally/AccountAuthenticationServlet.htm*
			   // ==/UserScript==
				function itz()
				{
				var startform = document.forms.namedItem('modeform');
		if(startform){
			startform.elements.namedItem('continue').click();
			}
			else{
		var form = document.forms.namedItem('accountform');
		if(form.elements.namedItem('accountno')){
		form.elements.namedItem('accountno').value='SHAGUNTRAVELS';
		form.elements.namedItem('accountpass').value='SHAGUNTRAVELS';
		var elmFoo = form.elements.namedItem('continue');
		elmFoo.click();
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm');
		elmFoo1.click();
		}
		}}
		Icashcard();