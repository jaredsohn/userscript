// ==UserScript==
// @name        比对数量不一致，下架
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://sell.taobao.com/*
// @version     1
// @grant       none
// ==/UserScript==

//start checkbox
function offShelf(){
		if( confirmOffShelf() ){
			document.forms['open'].event_submit_do_off_shelf.value=1;
			document.getElementById("setVal").value = "1";
			document.forms['open'].submit();
		}
	}
window.setInterval(main,6000)

function main(){
location.href="http://sell.taobao.com/auction/goods/goods_on_sale.htm?spm=686.1000925.0.0.1fG5Q1&mytmenu=csbb&utkn=g,ys5mtk6hwpalm1381293225231&scm=1028.1.1.103";
var  all_select1CheckBoxElement,thisElement; 
all_select1CheckBoxElement = document.getElementsByTagName('selectedIds'); 
//end checkbox
//start button
var allButtons,thisButton; 
allButtons = document.getElementsByTagName('button'); 
thisButton = allButtons[7]; 
    // 使用 thisbutton
for (var i = 0; i < document.getElementsByName("selectedIds").length; i++) 
{
   document.getElementsByName("selectedIds")[i].checked =true;
  }

    thisButton.click();
}
//end button
