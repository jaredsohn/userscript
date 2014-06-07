// ==UserScript==
// @name       WorkingHoliday Auto_Pay_5
// @namespace  http://use.i.E.your.homepage/
// @version    1.0_Beta
// @description  enter something useful
// @match      https://webcomm.paymark.co.nz/hosted*
// @copyright  香炉小姐
// ==/UserScript==

var card_type = 1;//0：万事达，1：威士

try{
    if(card_type == 1){
         document.getElementById('card_type_VISA').click();
    }else if(card_type == 0){
         document.getElementById('card_type_MASTERCARD ').click();
    }
   }catch(e){
 	 window.location.href='https://www.immigration.govt.nz/secure/default.htm';
 }




