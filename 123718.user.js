// ==UserScript==
	// @name           sbi
	// @namespace      www.sbi.in
	// @description    Rapid State Bank Of India Gateway.
    // @include        https://securepg.fssnet.co.in*
	// @include        https://www.onlinesbi.com*
	// @include        https://netbanking.hdfcbank.com/netbanking/merchant
	// @include        https://netbanking.netpnb.com/*
    // @include        https://www.unionbankonline.co.in/corp/BANKAWAY*
    // @include        http://www.unionbankonline.co.in/corp/BANKAWAY*	
    // @include        https://www.unionbankonline.co.in/corp*
	// @include        https://infinity.icicibank.co.in*
	// @include        https://www.axisbiconnect.co.in*
	// @include        https://www.billdesk.com*
	// @include        https://netbanking.netpnb.com*
			   // ==/UserScript==

				function itz()
				{
		var urlst = window.location.href;
//------------------------------  SBI DEBIT CARD --------------------------
		if(urlst.indexOf('securepg.fssnet.co.in/pgway')!=-1){
		var p=document.getElementsByTagName('input');
		var p1=document.getElementsByTagName('select');
		p1[0].value='--';
		p1[1].value='----';
		p[4].value='----';
		p[5].value='-------';
		p[7].value='---';
		}
		//------------------------------ ICICI BANK --------------------------------
		if(urlst.indexOf('infinity.icicibank.co.in')!=-1)
			{
			var form1 = document.forms.namedItem('SignOn');
                if (form1) 
				{
				form1.elements.namedItem('CorporateSignonCorpId').value='user id';
				form1.elements.namedItem('CorporateSignonPassword').value='password';
				}
				var form2 = document.forms.namedItem('frm');
				if(form2){
					form2.elements.namedItem('ValCorpTxnPwdTxnPwd').value='Txn password';
					form2.elements.namedItem('Action.ShoppingMall.MakePayment.Pay').click();
					}
		}
		//------------------------- ICICI BANK CLOSE ------------------------------
		//-------------------------- AXIS BANK START ----------------------------
				if(urlst.indexOf('axisbiconnect.co.in')!=-1){
					var formaxis = document.forms[0];
 					formaxis.elements.namedItem('CorporateSignonCorpId').value='----';
 					formaxis.elements.namedItem('CorporateSignonPassword').value='----';
					formaxis.elements.namedItem('Action.ShoppingMall.Signon').click();
					}
		//------------------------ AXIS BANK COMPLETE
		//------------------------ PUNJAB NATIONAL BANK START -----------------
		if(urlst.indexOf('billdesk.com')!=-1 || urlst.indexOf('netbanking.netpnb')!=-1){
					if(document.forms.namedItem('form1')){
					var pnbform = document.forms.namedItem('form1');
					if(pnbform.elements.namedItem('txtBankID')){
					pnbform.elements.namedItem('txtBankID').click();
				}
					else{
						pnbform.elements.namedItem('CorporateSignonCorpId').value='-----';
						pnbform.elements.namedItem('CorporateSignonPassword').value='------';
						pnbform.elements.namedItem('Action.ShoppingMall.Signon').click();
						}
					}
					else if(document.forms.namedItem('ShoppingMall')){
					var pnbform2=document.forms.namedItem('ShoppingMall');
					pnbform2.elements.namedItem('Action.Bills.ShoppingMall.MakePayment.Pay').click();
						}
					else{
					var pnbform3 = document.forms[0];
					pnbform3.elements.namedItem('ValCorpTxnPwdUserName').value='------';
					pnbform3.elements.namedItem('ValCorpTxnPwdTxnPwd').value='------';
					pnbform3.elements.namedItem('Action.bills.ShoppingMall.TxnLogin.Ok').click();
						}
		}
		//------------------------- PUNJAB NATIONAL BANK COMPLETE --------------
		// SBI NET BANKING START --------------------------------------
		if(urlst.indexOf('onlinesbi')!=-1){
		var sbiform1=document.forms.namedItem('quickLookForm');
		if(sbiform1){
			sbiform1.elements.namedItem(KAMLESHSA76).value='-----';
			sbiform1.elements.namedItem(RRGENERAL_1999).value='-----';
			//sbiform1.elements.namedItem('Button2').click();
			}
			}
				}


		itz();