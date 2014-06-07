// ==UserScript==
			   // @name           Amit anand
			   // @namespace      www.vally.in
			   // @description    Rapid ITZ Cash Card Gateway.
			   // @include        http://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/AccountAuthenticationServlet*
			   // @include        http://www.itzcash.com/payment/servlet/AccountAuthenticationServlet*
			   // ==/UserScript==
				function itz()
				{
		var form = document.forms.namedItem('accountform');
		if(form.elements.namedItem('accountno')){
		form.elements.namedItem('accountno').value='nnnnnnn';
		form.elements.namedItem('accountpass').value='nnnnnn';
		var elmFoo = form.elements.namedItem('continue');
		elmFoo.click();
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm');
		elmFoo1.click();
		}
		}
		itz();