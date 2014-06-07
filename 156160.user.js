// ==UserScript==
// @name 京东夺宝岛助手
// @author Tobar
// @description 京东夺宝岛自动竞标脚本
// @create 2013-01-10
// @lastmodified 17:51 2013/1/10
// @version 1.1.0
// @run-at document-end
// @include http://auction.360buy.com/detail/*
// ==/UserScript==


//http://g.mozest.com/viewthread.php?tid=41509
function getUnsafeWindow() {
        if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
                return this.unsafeWindow;
        } else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
                var node = document.createElement("div");
                node.setAttribute("onclick", "return window;");
                return node.onclick();
        } else {//Opera, IE7Pro, etc.
                return window;
        }
}
var win = getUnsafeWindow();

var $ = win.$;

var dealId;
var targetPrice;

var user;
var interval;
var startBtn;
var logText;

var g = function(){
	return {
		init:function(){
			var reg = /(\d+)#?$/;
			var result = reg.exec(document.location.href);
			dealId = result[1];
			
			user = win.memberId;
			getBidRecords(function(status){
				if(status <= 1){
					initBtn();
				}
			});
		}
	}
}();


function initBtn(){
	
	var e = $('.list-info');
	
	var li = document.createElement('li');
	li.setAttribute('class','fore6');
	e.append(li);
		
	li.appendChild(document.createTextNode('目标价格：'));
	
	var price;
	
	$('.fore4').each(function(index, ele){
		if(ele.innerHTML.indexOf('京东价') != -1){
			var reg = /\d+/;
			var result = reg.exec(ele.innerHTML);
			if(result != null && result.length > 0){
				price = result[0];
			}
		}
	});

	var targetPriceEle = document.createElement('input');
	targetPriceEle.setAttribute('type','text');
	targetPriceEle.setAttribute('id','targetPrice');
	if(price != null){
		targetPriceEle.setAttribute('value',price / 2);
	}
	li.appendChild(targetPriceEle);
		
	startBtn = document.createElement('input');
	startBtn.setAttribute('type','button');
	startBtn.setAttribute('id','startBtn');
	startBtn.setAttribute('value','开始');
	startBtn.onclick = function(){
		toggleBid();
	};
	li.appendChild(startBtn);
	
	logText = document.createElement('span');
	logText.setAttribute('type','button');
	logText.setAttribute('id','logText');
	logText.setAttribute('value','开始');
	li.appendChild(logText);
}

//callback(status, firstPrice, firstUser);
function getBidRecords(callback){
	var url = "../json/paimai/bid_records";
	var param = {t: win.getTimeStamp(), dealId: dealId, pageNo: 0, pageSize: 1};
	
	$.getJSON(url, param, function (response) {
    	bidRecords = response.datas;
    	var buyerName = response.trxBuyerName;
    	var trxPrice = response.trxPrice;
    	var status = response.auctionStatus;
    	var totalBidNumber = response.totalItem||bidRecords.length ;

    	if (status == null || status == undefined) {
        	status = win.dealModel['auctionStatus'];
    	}
    	
    	var firstPrice;
    	var firstUser;
    	if(bidRecords.length > 0){
    		var first = bidRecords[0];
    		firstPrice = first.price;
    		firstUser = first.userNickName;
    	}
    	callback(status, firstPrice, firstUser);
    });
}

var stop = true;

function toggleBid(){
	if(stop){
		if($('#targetPrice').attr('value') != null && $('#targetPrice').attr('value').length > 0){
			targetPrice = parseInt($('#targetPrice').attr('value'));
			startBtn.value = '停止';
			stop = false;
			logText.innerHTML = '';
			setTimeout(_startBid, 0);
		}
	}else{
		startBtn.value = '开始';
		logText.innerHTML = '';
		stop = true;
	}
}

function _startBid(){
	if(stop){
		return;
	}
	getBidRecords(function(s,currentPrice, currentUser){
		if(s > 1){
			stopBid('竞拍结束');
			return;
		}
		var status;
		if(currentUser != user && currentPrice <= targetPrice){
			status = '出价' + (currentPrice + 1) + '元';
			bid(currentPrice + 1);
		}else if(currentUser != user && currentPrice > targetPrice){
			//超出目标价,停止竞标
			stopBid('超出目标价, 停止竞标');
			return;
		}else if(currentUser == null && currentPrice == null){
			status = '出价' + 1 + '元';
			bid(1);
		}else{
			status = '最高价';
		}
		var restTime = win.dealModel.endTimeMili - (new Date());
		var delay = restTime / 10;
		
		//最后一分钟不再延迟刷新
		if(restTime <= 10000){
			delay = 0;
		}
		if(delay != 0){
			var refreshDate = new Date();
			refreshDate = new Date(refreshDate.getTime() + delay);
			status = status + ' 刷新: ' + refreshDate.toTimeString();
		}
		showStatus(status);
		setTimeout(_startBid, delay);
	});
}

function stopBid(text){
	stop = true;
	startBtn.value = '开始';
	showStatus(text);
}

function showStatus(text, append){
	if(append){
		logText.innerHTML = logText.innerHTML + text;
	}else{
		logText.innerHTML = text;
	}
}

function bid(price){
	var url = "../json/paimai/bid?t=" + win.getTimeStamp();
    var pars = {dealId:dealId, price:price};
    $.getJSON(url, pars, function (response) {
        win.loadBidRecord(dealId);
    });
}

setTimeout(g.init,100);