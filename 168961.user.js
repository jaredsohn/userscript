// ==UserScript==
// @name        淘宝爱心宝贝辅助程序进入下一页
// @namespace   http://diveintogreasemonkey.org/download/
// @include     http://sell.taobao.com/auction/goods/goods_on_sale.htm?spm=0.0.0.0.zOwnPC&mytmenu=csbb&utkn=g%2Co4ztimrsge4dgmzs1364351850395&scm=1028.1.1.103
// @version     1
// ==/UserScript==

function gotoApplyCharity(){
		var listPostagesUrl = "http://tcc.taobao.com/charity/list_charity.htm?is_from_my=true";
		var auctionids = getSelectedActionids();
		if(auctionids == ''){
			alert("请选择要加入公益捐赠的宝贝。");
			return;
		}
		listPostagesUrl += "&auctionids=" + auctionids;
		window.open(listPostagesUrl);
		return;
	}

var  all_select1CheckBoxElement,thisElement; //
all_select1CheckBoxElement = document.getElementsByTagName('selectedIds');//end checkbox
//start button
window.scroll(0,2000); //2000代表定位到这个页面距离顶端2000px;
var allButtons,thisButton//
allButtons = document.getElementsByTagName('button'); 
    thisButton=allButtons[3]; 
    // 使用 thisbutton
for (var i = 0; i < document.getElementsByName("selectedIds").length; i++) 
{
   document.getElementsByName("selectedIds")[i].checked =true;
  }
thisButton.onclick= gotoApplyCharity;
   thisButton.click();
    

   