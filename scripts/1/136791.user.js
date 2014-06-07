// ==UserScript==
// @name           countVIPcost
// @namespace      zongheng.com
// @include        book.zongheng.com/buy.do*
// @include        book.zongheng.com/vip/book/*
// ==/UserScript==


//2012-08-20 更新纵横新版

var $ = function(id){
	return document.getElementById(id);
}
var table =    document.evaluate('//div[8]/div/div/div/table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
//$('title_list').parentNode.parentNode;
var totalCost = 0;
var totalPaid = 0;


//选择接口
function selectBoard(){
	var h = location.href;
	//var domain = h.subString(h.indexOf("\/\/")+2,location.href.indexOf("\/")); //.match(\w*\.?(.)\.\w{2,4})[1];
	if(h.match("^https?:\/\/[a-zA-Z]*\.zongheng\.com")){
		var zhBoard = new board();
		zhBoard.domain = 'www.zongheng.com';
		zhBoard.id = 'zongheng';
		zhBoard.count = countVIPCost;
		return zhBoard;
	}else{
	 
	}
}
//控制面板
var board = function(){
	this.domain = '';
	this.id = '';
	this.dashboard = null;
	this.paid = null;
	this.cost = null;
	this.init = function(){
		var div = document.createElement('div');
		div.style.cssText = "position:absolute;z-index:1;width:200px;height:123px;background-color:#FFFFFF;color:blue;left:5%;top:20%;";			
		var pCost = document.createElement('p');
		pCost.innerHTML = 'test';
		div.appendChild(pCost);
		this.cost = pCost;
		
		var pPaid = document.createElement('p');
		pPaid.innerHTML = 'test';
		div.appendChild(pPaid);
		this.paid = pPaid;
		
		var btnCount = document.createElement('input');
		btnCount.type = 'button';
		btnCount.value = '计算';
		btnCount.addEventListener('click',countVIPCost,false);
		div.appendChild(btnCount);
		
		document.body.appendChild(div);
		this.dashboard = div;
		this.countPaid();
	};
	this.countSum = function(){
		var sum = 0;
		for(var i=1,j=table.rows.length;i<j;i++){
			var row = table.rows[i];
			var isChecked = row.cells[0].childNodes[1].checked;
			if(isChecked){
				var amt = table.rows[i].childNodes[11].innerHTML.match(/\d+\.0/)/1;
				sum += amt;
			}
		}
		this.cost.innerHTML = '所选章节的消耗点数：'+sum;
	};
	
	this.countPaid = function(){
			var sum = 0;
			for(var i=1,j=table.rows.length;i<j;i++){
				var row = table.rows[i];
				var isPaid = (row.cells[0].childNodes[0].disabled);
				
				if(isPaid){
					var amt = row.cells[5].firstChild.innerHTML.match(/\d+\.0/)/1;
					sum += amt;
				}
			}
			this.paid.innerHTML = '已订阅章节的消耗点数：' + sum;
	};
	
	
}
//计算消费-通用接口
function countVIPCost(){
	var sum = 0;
	for(var i=1,j=table.rows.length;i<j;i++){
		var row = table.rows[i];
		var isPaid = (row.cells[0].childNodes[0].disabled);
		var isChecked = row.cells[0].childNodes[0].checked;
		if(!isPaid && isChecked){
			var amt = row.cells[5].firstChild.innerHTML.match(/\d+\.0/)/1;
			sum += amt;
		}
	}
	currentBoard.cost.innerHTML = '所选章节的消耗点数：'+sum;
}

var currentBoard = selectBoard();
if(currentBoard != null){
	currentBoard.init();
}
//zhBoard.init();

//alert('total cost:'+sum);


