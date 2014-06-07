// ==UserScript==
// @name        SBICARD
// @namespace   ANAND
// @include     https://*securepg.fssnet.co.in/pgwayb/gateway/payment/payment.jsp?*
// @version     1
// @grant       none
// ==/UserScript==
form1.Ecom_Payment_Card_Number.value = 'CARD NO'; 
form1.Ecom_Payment_Card_ExpDate_Month.value = "CARD EXP MONTH";
form1.Ecom_Payment_Card_ExpDate_Year.value = "YEAR";
form1.Ecom_Payment_Card_Name.value = "NAME";
form1.testPin.value = "PIN NO";
form1.Ecom_Captcha_Value.focus();
