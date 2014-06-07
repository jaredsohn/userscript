// ==UserScript==
// @name        taobao仓库中宝贝已售完删除
// @namespace   http://diveintogreasemonkey.org/download/
// @description  taobao仓库中宝贝已售完删除
// @include     http://sell.taobao.com/auction/goods/goods_in_stock.htm?spm=0.0.0.0.jXFHVI&banner=5
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
location.href="http://sell.taobao.com/auction/goods/goods_in_stock.htm?spm=0.0.0.0.STH2rS&banner=5";
var  all_select1CheckBoxElement,thisElement; 
all_select1CheckBoxElement = document.getElementsByTagName('selectedIds'); 
//end checkbox
//start button
var allButtons,thisButton; 
allButtons = document.getElementsByTagName('button'); 
thisButton = allButtons[5]; 
    // 使用 thisbutton
for (var i = 0; i < document.getElementsByName("selectedIds").length; i++) 
{
   document.getElementsByName("selectedIds")[i].checked =true;
  }
thisButton.onclick= deleteItem;
    thisButton.click();
}
//end button
