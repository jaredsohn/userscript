// ==UserScript==
	// @name           sbi
	// @namespace      www.icicibank .co.in
	// @description    icici bank Gateway.
	// @include        https://infinity.icicibank.co.in*
	// @include        https://www.axisbiconnect.co.in*
	// @include        https://www.billdesk.com*
	// @include        https://netbanking.netpnb.com*
			   // ==/UserScript==

				function itz()
				{
		var urlst = window.location.href;

if(urlst.indexOf('infinity.icicibank.co.in')!=-1)
			{
			var form1 = document.forms.namedItem('SignOn');
                if (form1) 
				{
				form1.elements.namedItem('11111111').value='-----';
				form1.elements.namedItem('222222').value='-----';
				}
				var form2 = document.forms.namedItem('frm');
				if(form2){
					form2.elements.namedItem('333333333333').value='NA';
					form2.elements.namedItem('Action.ShoppingMall.MakePayment.Pay').click();
					}

