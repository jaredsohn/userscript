// ==UserScript==
// @name          xiaomi
// @namespace     http://weibo.com/gerodan10
// @author        Gerodan <gerodan10@gmail.com>
// @description   xiaomi
// @homepage      http://weibo.com/gerodan10
// @include       http://p.www.xiaomi.com/open/index.html
// @require       http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @version       0.1
// ==/UserScript==
//页面加载完成执行JS
setTimeout(PaymentAnchor,0);

function PaymentAnchor(){
	
    if($(".btn1").length>0){
		//alert("find!");
        var btn1 = jQuery(jQuery(".btn1")[0]);
        btn1.trigger("click");
    }
    
	var seconds = getRandom(7000);
    
    alert(seconds/1000 + " seconds!");
    
    seconds = seconds + 3000;
    alert(seconds/1000 + " seconds!");
    
    setTimeout("window.location.reload()",seconds);
    alert("find!");
	//reback
}

function getRandom(n){
    return Math.floor(Math.random()*n+1)
}