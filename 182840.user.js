// ==UserScript==
// @name       chek2
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  enter something useful
// @include      http://*unify_seller_detail.htm*
// @require    http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  2012+, You
// ==/UserScript==
var k=0;

$(document).ready(function(){
    
//    $("#logistics-tab-title").click(function(){
    
    
    
    //    
        
        $("div.quantity").each(function(){
            
            if ((this.innerHTML-0)>1) {
                this.innerHTML="<h1 style='color:red'>"+this.innerHTML+"</h1>";
                k=1;
            }
            
            
        });       
        
        
$("#logistics-tab-title").click(function(){
//    alert($("a[data-tracelog='announceSendGoods']:first").length);
//    alert(k && ($("a[data-tracelog='announceSendGoods']:first").text()=="发货"));
    if(k && ($("a[data-tracelog='announceSendGoods']:first").text()=="发货")){
    alert("本订单有产品为多件，请注意！");
    
    }
    });
    
    
});