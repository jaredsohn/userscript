// ==UserScript==
// @name       京东夺宝岛自动出价并提交
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://auction.360buy.com/*
// @copyright  2012+, EDU
// ==/UserScript==
 

    
function $(id){
    return document.getElementById(id);
}
 
//提交频率
var delays = 5000;

//时间戳
function getTimeStamp(){
	var date=new Date();
	return date.getTime();
}

 
//获取参数 //detail.action?dealId=2807478
var str=location.href;
var num=str.indexOf("?")
str=str.substr(num+1); 
 
var t= getTimeStamp();

//通过JSON获取最新出价
GM_xmlhttpRequest({
            method: "GET",
            url: "http://auction.360buy.com/json/paimai/bid_records?t="+t+"&"+str+"&pageNo=1&pageSize=1",
            onload: function(response) {
                var bidRecords=JSON.parse(response.responseText); 
                var price=bidRecords.datas[0].price;
                
                if(price<100)
                {
                    $("TextPrice").value=price+1;
                }
                else
                { 
                    $("TextPrice").value="超过100不建议竞拍"; 
                   
                    setTimeout(function(){
                         $("buy-btn").click(); //document.forms["mainform"].submit();
                    }, delays);
                }
            }
});

//通过页面获取最新出价
$("cur_price").innerText.replace(/￥/,"");

 

                