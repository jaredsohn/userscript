// ==UserScript==
// @name        footsizebotv2
// @namespace   sizeBot
// @description Foot Size bot V2
// @include     http://www.footaction.com/product/model:157742/sku:15121112/nike-air-force-1-high-mens/?cm=GLOBAL%20SEARCH%3A%20KEYWORD%20SEARCH#sku=15121112&size=09.0
// @version     1
// ==/UserScript==


window.addEventListener('load'
, function() {

    var added = false;
    
    function interval1(){
        return  window.setInterval(function(){
                if(document.getElementById("miniAddToCartWrapper") !=  null){
                    added = true;
                    window.location = "http://www.footaction.com/checkout/";
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