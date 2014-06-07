// ==UserScript==
// @name       WorkingHoliday Auto_Pay_6
// @namespace  http://use.i.E.your.homepage/
// @version    1.0_Beta
// @description  enter something useful
// @match      https://webcomm.paymark.co.nz/hosted/?rm=*
// @copyright  香炉小姐
// ==/UserScript==

var success_flag = false;
var card_number = 123456789;//卡号
var verify_code = 789;//CVV号码
var expiry_month = 0; //信用卡到期月份（0:一月份 ---- 11:十二月份） 
var expiry_year =  13; //信用卡到期年份（0:2013 ---- 13:2027） 

try{
    document.getElementById('cardnumber ').value = card_number;
    document.getElementById('cardverificationcode ').value = verify_code;
    document.getElementById('expirymonth ').selectedIndex = expiry_month;
    document.getElementById('expiryyear ').selectedIndex = expiry_year;
    document.getElementById('pay_now ').click(); 
    success_flag = true;
}catch(e){
 	 window.location.href='https://www.immigration.govt.nz/secure/default.htm';
 }

if(success_flag){
	alert('payment is successful!');
}
