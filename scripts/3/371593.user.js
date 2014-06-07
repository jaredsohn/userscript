// ==UserScript==
			   // @name           ITZ ICW 
			   // @namespace      Made By Rajjayswal
			   // @description    ICW MASTER CARD.
			   // @include        http://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/PGChargesServlet
			   // @include        https://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/AccountAuthenticationServlet*
			   // ==/UserScript==
				function itz()
				{
				var form = document.forms.namedItem('modeform');
				if(form){form.elements.namedItem('mode').value='ICW';
		var elmFoo = form.elements.namedItem('continue')
		}
			else{
		var form = document.forms.namedItem('accountform');
		if(form.elements.namedItem('accountno')){
		form.elements.namedItem('accountno').value='857140115401';
		form.elements.namedItem('accountpass').value='1582';
		var elmFoo = form.elements.namedItem('continue');
		elmFoo.click();
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm');
		elmFoo1.click();
		}
		}}
		itz();