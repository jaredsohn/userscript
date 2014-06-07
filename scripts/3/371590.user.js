// ==UserScript==
			   // @name           ICW
			   // @namespace      www.vally.in
			   // @description    ICW click 
			   // @include        http://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://www.itzcash.com/payment/servlet/ITZPaymentServlet*
			   // @include        https://*itzcash.com/*
			   // @include        http://*itzcash.com/*
			   // ==/UserScript==
				function itz()
				{
		var form = document.forms.namedItem('modeform');
		if(form.elements.namedItem('mode')){
		form.elements.namedItem('mode').value='ICW';
		var elmFoo = form.elements.namedItem('continue')
		elmFoo.click()
		}
		else{
		var elmFoo1 = form.elements.namedItem('confirm')
		elmFoo1.click();
		}
		}
		itz();