// ==UserScript==
			   // @name           SALMANTRAVELS_SBI NET BANKING_
			   // @namespace      salmantravels@ymail.com
			   // @description    Rapid State Bank Of India Gateway.
			   // @include        https://www.onlinesbi.com/merchant/merchantprelogin.htm*
			   // ==/UserScript==
				function itz()
				{
		var form = document.forms.namedItem('quickLookForm');
		if(form.elements.namedItem('userName')){
		form.elements.namedItem('userName').value='rajjayswal';
		form.elements.namedItem('password').value='*rajesh9322';
		var elmFoo = form.elements.namedItem('Button2');
		elmFoo.click();
		}
		
		}
		itz()