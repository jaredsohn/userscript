// ==UserScript==
// @name        Nike Shoe Checkout Bot
// @namespace   http://localhost/
// @description Checkouts Nike Shoes automatically
// @include     *store.nike.com/us/*
// @version     2
// @grant       none
// ==/UserScript==

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main() {
    if (location.hash.substring(0,7)=="#NBGMS_") {
        console.log("NB 1");
        var params = new Object();
        var pd = eval("[" + document.getElementById("product-data").innerHTML + "][0]");
        var shoeSize = location.hash.substring(7).replace("d",".");
        console.log("NB 2");
        
        // URL Parameters
        params["base"] = "https://secure-store.nike.com/us/services/jcartService?";
        params["action"] = "addItem";
        params["lang_locale"] = "en_US";
        params["country"] = "US";
        params["catalogId"] = pd.catalogId;
        params["productId"] = pd.productId;
        params["price"] = pd.rawPrice;
        params["siteId"] = pd.siteId;
        params["passcode"] = "null";
        params["skuAndSize"] = "";
        params["qty"] = "1";
        params["rt"] = "json";
        params["view"] = "3";
        params["skuId"] = "";
        params["displaySize"] = "5";
        params["_"] = (new Date()).getTime();
        
        console.log(pd);
        
        // Is it out of stock?
        console.log("NB 3");
        var outofstock = !pd.inStock;
        
        console.log("NB 4");
        var jumpto;
        if (outofstock) { // Redirect to a new page
            for (var i=0; outofstock && i<pd.inStockColorways.length; i++) {
                if (pd.inStockColorways[i].productId!=pd.productId) {
                    jumpto = pd.inStockColorways[i].url + location.hash;
                    outofstock = false;
                }
            }
            if (outofstock) { // Still nothing
                alert("All out of stock, sorry =(");
            }
            else { // Redirect
                console.log("Redirecting: " + jumpto);
                //window.location.replace(jumpto);
            }
        }
        else { // Good
            console.log(shoeSize);
            // Find shoe size
            var found = false;
            var skus = pd.skuContainer.productSkus;
            for (var i=0; !found && i<skus.length; i++) {
                if (skus[i].displaySize==shoeSize) {
                    params["skuId"] = skus[i].sku;
                    params["displaySize"] = skus[i].displaySize;
                    params["skuAndSize"] = params["skuId"] + "%3A" + params["displaySize"];
                    found = true;
                }
            }
            if (!found) {
                console.log("Invalid shoe size");
            }
            else {
                jumpto = params["base"];
                for (var p in params) {
                    if (p!="base") {
                        jumpto += "&" + p + "=" + params[p];
                    }
                }
                console.log(jumpto);
                window.open(jumpto);
                setTimeout(gotoCheckout,1000);
            }
        }
        console.log("NB 5");
    }
}

function gotoCheckout() {
    console.log("Checkout");
    var checkout = "https://secure-store.nike.com/us/checkout/html/cart.jsp?country=US&l=cart&country=US&lang_locale=en_US";
    window.open(checkout);
}