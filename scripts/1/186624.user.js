// ==UserScript==
// @name        FTLadd
// @namespace   sizeBot
// @description Foot Size bot V2
// @include     http://www.eastbay.com/product/model:189959/sku:54724013/jordan-aj1-mid-mens/black/gold/?cm=supercatshoes#sku=54724013&size=13.0
// @version     1
// ==/UserScript==


window.addEventListener('load'
, function() {

    var added = false;
    
    function interval1(){
        return  window.setInterval(function(){
                if(document.getElementById("miniAddToCartWrapper") !=  null){
                    added = true;
                    window.location = "https://www.eastbay.com/checkout/";
                }
                else if(added == false){
                    var cartbtn = document.getElementById("addToCartLink");
                    cartbtn.click();
                }
            }, 1000);
    }
    
    var id1 = interval1();
    
    window.setInterval(function(){
        if(added == true){
            window.clearInterval(id1);
        }
    }, 100);
    
}, false);