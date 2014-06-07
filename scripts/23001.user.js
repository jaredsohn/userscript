// ==UserScript==
// @name           Fix WAMU Check Viewer
// @namespace      WaMu
// @description    Reworks WAMU check preview by opening preview in new tab
// @include        *online.wamu.com/Servicing/*
// ==/UserScript==

window.fixWamuCheckView = function() {
	window.showCheckImage = function(
                hdnAccountDropDown,
                AccountName,
                TransactionDate,
                Amount,
                TransactionDesc,
                RefNumber,
                TranCode,
                CheckNumber)
        {
	        if ("undefined" != typeof hdnAccountDropDown)
	            {
	                if (hdnAccountDropDown != null)
	                {
	                    accountDropDown = document.getElementById(hdnAccountDropDown).value;
	                }
	            }
	
	        if ("undefined" != typeof accountDropDown)
	            {
	                if (accountDropDown != null)
	                {
	                    productCodeAndIndex = document.getElementById(accountDropDown).value; 
	                }
	            }   


	        if(productCodeAndIndex != null)
	        {           
	            if(productCodeAndIndex.length > 3)
	            {
	                accountIndex = productCodeAndIndex.substring(3);
	            }   
	        }
	        var oForm1 = document.getElementById('frmCheckImage');
	        document.getElementById('hdnAccountIndex').value = accountIndex;
	        document.getElementById('hdnAccountName').value = AccountName;        
	        document.getElementById('hdnTransactionDate').value=TransactionDate;
	        document.getElementById('hdnAmount').value=Amount;
	        document.getElementById('hdnTransactionDesc').value=TransactionDesc.replace( /&apos;/g,"'");
	        document.getElementById('hdnRefNumber').value=RefNumber;
	        document.getElementById('hdnTranCode').value=TranCode;
	        document.getElementById('hdnChkNum').value = CheckNumber;
	        document.getElementById('hdnImageAvail').value="true";
	        oForm1.action = "/TransactionDetail/TransactionHistoryDetail.aspx";
	        oForm1.target = "_blank";
	        oForm1.submit();
	}
}

window.addEventListener("load", function(e) {
	window.fixWamuCheckView();
	var links = document.getElementsByTagName('a');
	for (var i=0; i<links.length; i++) {
		if (links[i].getAttribute('id') == 'checkImageLink') {
			var prams = links[i].getAttribute('href')
					     .replace(/^javascript:showcheckimage\(/i,'')
					     .replace(/\)(;)?$/i,'');
			links[i].href = '#';
			links[i].rel = prams;
			links[i].addEventListener('click',function(e) {
				eval('showCheckImage(' + this.rel + ');');
			},true);
		}
	}
}, false);