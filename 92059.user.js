// ==UserScript==
			   // @name           King Electronic_SBI NET BANKING_
			   // @namespace      salmantravels@ymail.com
			   // @description    Rapid State Bank Of India Gateway.
			   // @include        https://www.onlinesbi.com/merchant/merchantprelogin.htm*
			   // ==/UserScript==
				function itz()
				{
		var form = document.forms.namedItem('quickLookForm');
		if(form.elements.namedItem('userName')){
		form.elements.namedItem('userName').value='         ';
		form.elements.namedItem('password').value='         ';
		var elmFoo = form.elements.namedItem('Button2');
		elmFoo.click();
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm');
		elmFoo1.click();
		}
		}
		itz();