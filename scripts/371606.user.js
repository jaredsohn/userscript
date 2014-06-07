
               // ==UserScript==
			   // @name           I Cash Card 
			   // @namespace      oxiraj@gmail.com
			   // @description    I Cash Card Payment Gateway.
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        http://www.icashcard.in/pggateway/icccheckcard.aspx*
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx?TransDetails*
			   // @include        https://www.icashcard.in/pggateway/icccheckcard.aspx
			   // @include        https://www.icashcard.in/pggateway/ICCPaySuccess.aspx*
			   // @include        http://icc.donecard.com/PaymentGatewayASP/DoneCardPaymentGateway.asp
			   // @include        http://icc.onestopshop.in/PaymentGatewayASP/OSSPaymentGateway.asp
			   // @include        http://www.icashcard.in/pggateway/valuecardLogin.aspx?ccode=MTAwMDQ=&customparam=MQ==
			   // ==/UserScript==

		function raj()
 {

 var gate1='I Cash Card';
 var cardusername='331545503478';
 var cardpassword='1212';
 var urlRegex = window.location.href;
 var len=urlRegex.substr(0,66);
 if(len=='https://www.icashcard.in/pggateway/ICCPaySuccess.aspx?TransDetails'){
 var form2 = document.forms.namedItem('form1');
 form2.elements.namedItem('submit').click();
 }
 if(urlRegex=='http://www.icashcard.in/pggateway/valuecardLogin.aspx?ccode=MTAwMDQ=&customparam=MQ==' ){
 var form2 = document.forms.namedItem('theTimer');
 form2.elements.namedItem('txtCard').value=cardusername;
 form2.elements.namedItem('txtPin').value=cardpassword;
 var form = document.forms.namedItem('form1');
 var elmNewContentbut6 = document.createElement('input');
 var elmFoo3 = form.elements.namedItem('__VIEWSTATE');
 elmFoo3.parentNode.insertBefore(elmNewContentbut6, elmFoo3);
 elmNewContentbut6.style.backgroundColor ='pink';
 elmNewContentbut6.type='hidden';
 elmNewContentbut6.name='btnBuy.x';
 elmNewContentbut6.value='91';
 elmNewContentbut6.style.borderColor ='white';
 elmNewContentbut6.style.height ='20';
 elmNewContentbut6.style.color ='black';
 elmNewContentbut6.style.fontWeight ='bold';
 elmNewContentbut6.style.fontSize ='10';
 var elmNewContentbut7 = document.createElement('input');
 var elmFoo7 = form.elements.namedItem('__VIEWSTATE');
 elmFoo7.parentNode.insertBefore(elmNewContentbut7, elmFoo7);
 elmNewContentbut7.style.backgroundColor ='pink';
 elmNewContentbut7.type='hidden';
 elmNewContentbut7.name='btnBuy.y';
 elmNewContentbut7.value='12';
 elmNewContentbut7.style.borderColor ='white';
 elmNewContentbut7.style.height ='20';
 elmNewContentbut7.style.color ='black';
 elmNewContentbut7.style.fontWeight ='bold';
 elmNewContentbut7.style.fontSize ='10';
 document.forms.namedItem('theTimer').submit();
 }
 if(urlRegex=='http://www.icashcard.in/pggateway/icccheckcard.aspx' && gate1=='V Card'){
 var form = document.forms.namedItem('form1');
 var elmNewContentbut6 = document.createElement('input');
 var elmFoo3 = form.elements.namedItem('__VIEWSTATE');
 elmFoo3.parentNode.insertBefore(elmNewContentbut6, elmFoo3);
 elmNewContentbut6.style.backgroundColor ='pink';
 elmNewContentbut6.type='hidden';
 elmNewContentbut6.name='imgvcaAgtlogin.x';
 elmNewContentbut6.value='35';
 elmNewContentbut6.style.borderColor ='white';
 elmNewContentbut6.style.height ='20';
 elmNewContentbut6.style.color ='black';
 elmNewContentbut6.style.fontWeight ='bold';
 elmNewContentbut6.style.fontSize ='10';

 var elmNewContentbut7 = document.createElement('input');
 var elmFoo7 = form.elements.namedItem('__VIEWSTATE');
 elmFoo7.parentNode.insertBefore(elmNewContentbut7, elmFoo7);
 elmNewContentbut7.style.backgroundColor ='pink';
 elmNewContentbut7.type='hidden';
 elmNewContentbut7.name='imgvcaAgtlogin.y';
 elmNewContentbut7.value='27';
 elmNewContentbut7.style.borderColor ='white';
 elmNewContentbut7.style.height ='20';
 elmNewContentbut7.style.color ='black';
 elmNewContentbut7.style.fontWeight ='bold';
 elmNewContentbut7.style.fontSize ='10';
 document.forms.namedItem('form1').submit();
 }
 if(urlRegex=='http://www.icashcard.in/pggateway/icccheckcard.aspx' && gate1=='DoneCard'){
 var form = document.forms.namedItem('form1');
 var elmNewContentbut6 = document.createElement('input');
 var elmFoo3 = form.elements.namedItem('__VIEWSTATE');
 elmFoo3.parentNode.insertBefore(elmNewContentbut6, elmFoo3);
 elmNewContentbut6.style.backgroundColor ='pink';
 elmNewContentbut6.type='hidden';
 elmNewContentbut6.name='ImgDONECARDLogin.x';
 elmNewContentbut6.value='38';
 elmNewContentbut6.style.borderColor ='white';
 elmNewContentbut6.style.height ='20';
 elmNewContentbut6.style.color ='black';
 elmNewContentbut6.style.fontWeight ='bold';
 elmNewContentbut6.style.fontSize ='10';

 var elmNewContentbut7 = document.createElement('input');
 var elmFoo7 = form.elements.namedItem('__VIEWSTATE');
 elmFoo7.parentNode.insertBefore(elmNewContentbut7, elmFoo7);
 elmNewContentbut7.style.backgroundColor ='pink';
 elmNewContentbut7.type='hidden';
 elmNewContentbut7.name='ImgDONECARDLogin.y';
 elmNewContentbut7.value='38';
 elmNewContentbut7.style.borderColor ='white';
 elmNewContentbut7.style.height ='20';
 elmNewContentbut7.style.color ='black';
 elmNewContentbut7.style.fontWeight ='bold';
 elmNewContentbut7.style.fontSize ='10';
 document.forms.namedItem('form1').submit();
 }
 if(urlRegex=='http://www.icashcard.in/pggateway/icccheckcard.aspx' && gate1=='One Stop Shop RDS'){
 var form = document.forms.namedItem('form1');

 var elmNewContentbut6 = document.createElement('input');
 var elmFoo3 = form.elements.namedItem('__VIEWSTATE');
 elmFoo3.parentNode.insertBefore(elmNewContentbut6, elmFoo3);
 elmNewContentbut6.style.backgroundColor ='pink';
 elmNewContentbut6.type='hidden';
 elmNewContentbut6.name='ImgOSSLogin.x';
 elmNewContentbut6.value='38';
 elmNewContentbut6.style.borderColor ='white';
 elmNewContentbut6.style.height ='20';
 elmNewContentbut6.style.color ='black';
 elmNewContentbut6.style.fontWeight ='bold';
 elmNewContentbut6.style.fontSize ='10';

 var elmNewContentbut7 = document.createElement('input');
 var elmFoo7 = form.elements.namedItem('__VIEWSTATE');
 elmFoo7.parentNode.insertBefore(elmNewContentbut7, elmFoo7);
 elmNewContentbut7.style.backgroundColor ='pink';
 elmNewContentbut7.type='hidden';
 elmNewContentbut7.name='ImgOSSLogin.y';
 elmNewContentbut7.value='38';
 elmNewContentbut7.style.borderColor ='white';
 elmNewContentbut7.style.height ='20';
 elmNewContentbut7.style.color ='black';
 elmNewContentbut7.style.fontWeight ='bold';
 elmNewContentbut7.style.fontSize ='10';
 document.forms.namedItem('form1').submit();
 }
 if(urlRegex=='http://icc.donecard.com/PaymentGatewayASP/DoneCardPaymentGateway.asp'){
var form2 = document.forms.namedItem('frmLogin');
 form2.elements.namedItem('txtCardNo').value=cardusername;
 form2.elements.namedItem('txtPINNo').value=cardpassword;
 var elmFoo = form2.elements.namedItem('btnSubmit');
 elmFoo.click();
 }
 if(urlRegex=='http://icc.onestopshop.in/PaymentGatewayASP/OSSPaymentGateway.asp'){
 var form4 = document.forms.namedItem('frmLogin');
 form4.elements.namedItem('txtDistributorCode').value=cardusername;
 form4.elements.namedItem('txtTranPswd').value=cardpassword;
 var elmFoo = form4.elements.namedItem('btnSubmit');
 elmFoo.click();
 }
 else if(urlRegex=='http://www.icashcard.in/pggateway/icccheckcard.aspx' && gate1=='I Cash Card'){
 var form = document.forms.namedItem('form1');
 if(form.elements.namedItem('txtCard')){
 form.elements.namedItem('txtCard').value=cardusername;
 form.elements.namedItem('txtPin').value=cardpassword;
 document.elements.getElementByID('btnBuy').click();
 }
 }
 }
 raj();