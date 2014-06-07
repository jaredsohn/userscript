// ==UserScript==
// @name       Paytm Choose free Coupon Automatically
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This script is written by Shivesh Chandra to choose all Free coupons automatically when it loads.
// @match      https://paytm.com/coupons*
// @copyright  2014+, Shivesh96
// ==/UserScript==
setInterval(function(){
var payA = document.getElementsByTagName("a");
    for(i=0;i<payA.length;i++){    
    if(payA[i].getAttribute("class") == "btn proceed active linkactive" && payA[i].innerHTML.trim() == "Free" && payA[i].getAttribute("style") != "display: none;")    {
        document.getElementById(payA[i].getAttribute("id")).click();
    }
}
},1000);