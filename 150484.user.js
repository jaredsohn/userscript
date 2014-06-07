// ==UserScript==
// @name        360buy Auction
// @namespace   http://diveintogreasemonkey.org/download/
// @description 京东拍卖自动加价脚本，天南电脑专用脚本
// @include     http://auction.360buy.com/detail.action?dealId=*
// @version     1.2.3
// @grant       none
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.8.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

window.maxPrice = 0;
window.myPrice = 0;

window.getCurPrice = function(){
        synTimeFromServer();//主动读取新价格
        console.log('读取新价格完成。');
	var curPriceDom = $('#cur_price');
	if(curPriceDom.length == 0) return -1;
	var curPriceText = curPriceDom.text();
	var reg = /\d+/g;
	var iCurPrice = reg.exec(curPriceText);
	return Number(iCurPrice);
}

window.runAuction = function(){
	var curPrice = getCurPrice();
	if(curPrice==-1){
		console.log('拍卖已结束。');
		clearInterval(interval);
		return;
	}
	if(myPrice>maxPrice){
		console.log('已超过最高出价，退出拍卖。');
		clearInterval(interval);
		return;
	}
	console.log('当前出价：'+curPrice+'元。');
	if(curPrice<myPrice){ 
		console.log('无需出价。');
		return;
	}
	//开始出价
	var newPrice = curPrice + 1;
	$('#TextPrice').val(newPrice);
	console.log('出价：'+newPrice+'元。');
	$('#buy-btn').click();
}

// *** put your code inside letsJQuery: ***
function letsJQuery()
{
	$(function(){
		do{
			var curPrice = getCurPrice();
			if(curPrice==-1) return;
			maxPrice = prompt('请输入心理最高价位，\n程序将在当前价格至心理最高价位之间进行自动加价。\n出价不得低于'+curPrice+'元。\n默认出价为当前价加10元。',curPrice+10);
		}while(maxPrice<=curPrice && maxPrice!=null);
		if(maxPrice==null || maxPrice=='') return;
                window.interval=window.setInterval(runAuction,500);
	});
}

//window.interval=window.setInterval(runAuction,500);
