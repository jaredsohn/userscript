// ==UserScript==
			   // @name           King Electronic_ITZ Master Card
			   // @namespace      salmantravels@ymail.com
			   // @description    Rapid ITZ Cash Card Gateway.
			   // @include        http://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/PGChargesServlet
			   // @include        https://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/AccountAuthenticationServlet*
			   // @include        http://localhost/vally/ITZPaymentServlet.htm*
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
		form.elements.namedItem('accountno').value='SALMANTRAVELS';
		form.elements.namedItem('accountpass').value='SALMANTRAVELS';
		var elmFoo = form.elements.namedItem('continue');
		elmFoo.click();
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm');
		elmFoo1.click();
		}
		}}
		itz();