// ==UserScript==
// @name        YOTSbot
// @namespace   YOTSbot
// @description YOTS Bot
// @include     http://www.eastbay.com/product/model:95723/sku:4894107/vans-authentic-mens/grey/white/?cm=GLOBAL%20SEARCH%3A%20KEYWORD%20SEARCH#sku=4894107&size=09.0
// @grant       none
// @version     1
// ==/UserScript==window.addEventListener('load'
window.addEventListener('load', 
function() {

    var added = false;
    
    function interval1(){
        return  window.setInterval(function(){
                if(document.getElementById("AddToCartWrapper") !=  null){

                    if(document.getElementById("AddToCart_error") ==  null){
                        added = true;
                        window.location = "http://www.eastbay.com/checkout/";

                    }
                    else{
                        var errorClose = document.getElementById("miniAddToCart_close");
                        miniAddToCart.closeMiniAddToCart();
                    }

                }
                else if(added == false || document.getElementById("miniAddToCartError") !=  null){
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