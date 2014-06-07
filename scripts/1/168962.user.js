// ==UserScript==
// @name        淘宝在售宝贝删除
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://sell.taobao.com/auction/goods/goods_on_sale.htm
// @version     1
// ==/UserScript==



//start checkbox
function deleteItem(){
			if( true ){
				document.forms['open'].event_submit_do_delete.value=1;
				document.forms['open'].submit();
			}
		}

	

window.setInterval(main,6000)

function main(){
//location.href="http://sell.taobao.com/auction/goods/goods_on_sale.htm";
var  all_select1CheckBoxElement,thisElement; 
all_select1CheckBoxElement = document.getElementsByTagName('selectedIds'); 
//end checkbox
//start button
var allButtons,thisButton; 
allButtons = document.getElementsByTagName('button'); 
thisButton = allButtons[2]; 
    // 使用 thisbutton
for (var i = 0; i < document.getElementsByName("selectedIds").length; i++) 
{
   document.getElementsByName("selectedIds")[i].checked =true;
  }
thisButton.onclick= deleteItem;
    thisButton.click();
}
//end button