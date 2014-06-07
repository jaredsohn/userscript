// ==UserScript==
// @name        违规商品删除1
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://notice.taobao.com/down.htm?spm=a1z0e.1.10032.1.B6bGs1&source=shopPunish
// @version     1
// ==/UserScript==

//start checkbox
window.setInterval(main,5000)

//function deleteItem(){
//			if( true ){
//				document.forms['open'].event_submit_do_delete.value=1;
//				document.forms['open'].submit();
//			}
//		}


//main();

function main(){
//location.href="http://notice.taobao.com/down.htm?spm=a1z0e.1.10032.1.B6bGs1&source=shopPunish";


var allButtons,thisButton; 
allButtons = document.getElementsByName('event_submit_do_delete_item'); 
//alert(document.getElementsByName('event_submit_do_delete_item')[0].type);
thisButton = allButtons[1]; 
    // 使用 thisbutton
    //thisButton.onclick= deleteItem;
thisButton.click();



   // thisButton.click();
   
}
