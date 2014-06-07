// ==UserScript==
// @name        慎用，搞定
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://sell.taobao.com/*
// @version     1
// ==/UserScript==
//start checkbox


	//删除 add by daotong
	function deleteItem(){
		if( true ){
			document.forms['open'].event_submit_do_delete_goods_on_sale.value=1;
			document.getElementById("setVal").value = "1";
			document.forms['open'].submit();
		}
	}
	

window.setInterval(main,6000)

function main(){
location.href="http://sell.taobao.com/auction/goods/goods_on_sale.htm?spm=686.1000925.0.231.wzcXlk&mytmenu=csbb&utkn=g,o4ztimrsge4dgmzs1365683405567&scm=1028.1.1.103";
var  all_select1CheckBoxElement,thisElement; 
all_select1CheckBoxElement = document.getElementsByTagName('selectedIds'); 
//end checkbox
//start button
var allButtons,thisButton; 
allButtons = document.getElementsByTagName('button'); 
thisButton = allButtons[6]; 
    // 使用 thisbutton
for (var i = 0; i < document.getElementsByName("selectedIds").length; i++) 
{
   document.getElementsByName("selectedIds")[i].checked =true;
  }
thisButton.onclick= deleteItem;
    thisButton.click();
}
//end button
