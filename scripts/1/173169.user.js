// ==UserScript==
// @name        Retro1
// @namespace   Retro1
// @description Josh Bot
// @include     http://www.footaction.com/product/model:190074/sku:55088014/?SID=7040&cm_mmc=Footaction-_-twitter-_-jordanretro1og-_-shadow#sku=55088014&size=11.5
// @grant       none
// @version     1
// ==/UserScript==window.addEventListener('load'
window.addEventListener('load', 
function() {

    var added = false;
    
    function interval1(){
        return  window.setInterval(function(){
                if(document.getElementById("miniAddToCartWrapper") !=  null){

                    if(document.getElementById("miniAddToCart_error") ==  null){
                        added = true;
                        window.location = "http://www.footaction.com/checkout/";

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