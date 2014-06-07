// ==UserScript==
// @name        WTK EB
// @namespace   http://userscripts.org/
// @include     http://www.eastbay.com/product/model:194958/sku:35438800#sku=35438800&size=10.0
// @version     1
// ==/UserScript==

window.addEventListener('load'
, function() {

    var added = false;
    
    function interval1(){
        return  window.setInterval(function(){
                if(document.getElementById("miniAddToCartWrapper") !=  null){
                    added = true;
                    window.location = "http://www.eastbay.com/checkout/";
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


