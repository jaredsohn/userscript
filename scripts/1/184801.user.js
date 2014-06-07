// ==UserScript==
// @name        忽略违规商品
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://notice.taobao.com/down.htm?spm=a1z0e.1.0.0.xGlASa_0.0.0.0.99LN0r_0.0.0.0.HUYSvR
// @version     1
// ==/UserScript==


window.setInterval(main,5000)
function main(){
//location.href="http://notice.taobao.com/down.htm?spm=a1z0e.1.10032.1.B6bGs1&source=shopPunish";


var allButtons,thisButton; 
allButtons = document.getElementsByName('event_submit_do_hulue_record'); 
//alert(document.getElementsByName('event_submit_do_delete_item')[0].type);
thisButton = allButtons[0]; 
    // 使用 thisbutton
    //thisButton.onclick= deleteItem;
thisButton.click();
allButtons[1].click();



   // thisButton.click();
   
}
