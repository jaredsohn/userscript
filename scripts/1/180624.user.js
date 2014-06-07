// ==UserScript==
// @name       WorkingHoliday Auto_Pay_3
// @namespace  http://use.i.E.your.homepage/
// @version    1.0_Beta
// @description  
// @match      https://www.immigration.govt.nz/PaymentGateway/OnLinePayment.aspx?SourceUrl=https://www.immigration.govt.nz/WorkingHoliday/Application/SubmitConfirmation*          
// @copyright  香炉小姐
// ==/UserScript==

var pay_name = 'XiangLu';//信用卡姓名

document.getElementById('ctl00_ContentPlaceHolder1_payorNameTextBox').value = pay_name;
document.getElementById('ctl00_ContentPlaceHolder1_okImageButton').click();

