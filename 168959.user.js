// ==UserScript==
// @name        仓库中宝贝删除
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://sell.taobao.com/*
// @version     1
// ==/UserScript==

function deleteItem(){
			if( true ){
				document.forms['open'].event_submit_do_delete.value=1;
				document.forms['open'].submit();
			}
		}

	

window.setInterval(main,6000)

function main(){
location.href="http://sell.taobao.com/auction/goods/goods_in_stock.htm?spm=a1z0e.1.0.211.Q1rTYp&mytmenu=ckbb&utkn=g,o4ztimrsge4dgmzs1365768671248&scm=1028.1.1.105";
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
