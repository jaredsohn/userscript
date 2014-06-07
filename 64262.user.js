// ==UserScript==
// @name          Amazon Prices for Ireland
// @namespace     http://www.17od.com/amazon-for-ireland
// @description   Show prices on amazon.co.uk in euros with the Irish VAT rate applied
// @version       1.6
// @author        Adrian Smith
// @homepage      http://github.com/adrian/Amazon-Prices-for-Ireland
// @include       http://www.amazon.co.uk/*
// @include       https://www.amazon.co.uk/*
// @include       http://amazon.co.uk/*
// @include       https://amazon.co.uk/*
// ==/UserScript==

(function() {

    var gbpToEurRate = GM_getValue("gbp_to_eur_rate");
    var dateRateLastRetrieved = GM_getValue("date_rate_last_retrieved");
    var todayDate = new Date();
    var todayAsString = todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear();

    var IRISH_VAT_RATE = 0.23;
    var UK_VAT_RATE = 0.20;

    function retrieveRate(callback) {
        GM_xmlhttpRequest({
                method: "GET",
                url: "http://download.finance.yahoo.com/d/quotes.csv?s=GBPEUR=X&f=l1&e=.csv",
                onload: function(responseDetails) {
                    var rate = parseFloat(responseDetails.responseText.replace(/[\r\n]/g, ""));
                    GM_log("retrieved the rate: " + rate);
                    // The amount added to rate below is to account for a
                    // difference between the GBP to EURO rate retrieved from 
                    // Yahoo and the one Amazon will use. It's not exact but
                    // reflects an average markup Amazon applies to the open 
                    // market rate
                    rate = rate + 0.04;
                    gbpToEurRate = rate;
                    GM_setValue("gbp_to_eur_rate", rate.toString());
                    GM_setValue("date_rate_last_retrieved", todayAsString);
                    callback();
                },
                onerror: function(responseDetails) {
                    alert("Error fetching currency data for " + coin);
                }
        });
    }

    function getNode(xpath) {
        var xpath_result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);    
        return xpath_result.singleNodeValue;
    }

    // Return a string containing the Irish price
    function calculateIrishPrice(gbpPrice) {

        var irishVatRate = IRISH_VAT_RATE;
        var ukVatRate = UK_VAT_RATE;
        // Amazon add on about .03% for something else.
        // Waste management charge perhaps (http://www.weeeregister.ie)?
        var extraCharge = 0.03;

        // Books don't have VAT
        if (isBook()) {
            irishVatRate = 0;
            ukVatRate = 0;
            extraCharge = 0;
        }

        GM_log("Using the irish VAT rate: " + irishVatRate);
        GM_log("Using the UK VAT rate: " + ukVatRate);
        GM_log("Using the \"extraCharge\" rate: " + extraCharge);
        GM_log("Using the GBP to EUR FX rate: " + gbpToEurRate);

        var gbpExVATPrice = gbpPrice * (1 - ukVatRate);
        var euroPrice = gbpExVATPrice * gbpToEurRate;
        var irishPrice = euroPrice * ((1 + irishVatRate) + extraCharge);

        return irishPrice.toFixed(2);
    }

    // Determine if the product listed on the current page is a book
    // This is done by searching for a node with the text "ISBN:"
    function isBook() {
        var elems = document.getElementsByTagName("b");
        var j = 0;
        var k = 0;
        var isBook = false;

        while (!isBook && j < elems.length) {
            var price = elems[j];
            k = 0;
            while (!isBook && k < price.childNodes.length) {
                var currNode = price.childNodes[k];
                if (currNode.nodeType == 3) {
                    if (currNode.nodeValue == "ISBN-10:") {
                        isBook = true;
                    }
                }
                k++;
            }
            j++;
        }

        return isBook;
    }

    function updatePageWithIrishPrice() {
        // Find the GBP price
        var gbpPriceNode = getNode("//*[@class='priceLarge']");
        if (gbpPriceNode != null) {
            // strip off the pound sign and comma
            var priceInGBP = parseFloat(gbpPriceNode.innerHTML.replace(/\u00A3/, "").replace(/,/, ""));
            GM_log("priceInGBP: " + priceInGBP);

            // Get the ex-VAT price, convert to EUR and add on the irish VAT
            var irishPrice = calculateIrishPrice(priceInGBP);
            GM_log("irishPrice: " + irishPrice);

            // Get the TR containing the GBP price. We're going to clone this node
            var gbpPriceTRNode = gbpPriceNode.parentNode;
            while (gbpPriceTRNode.nodeName.toLowerCase() != 'tr') {
                 gbpPriceTRNode = gbpPriceTRNode.parentNode;
            }
 
            // Get the TBODY node under which we're going to put a new TR with the irish price
            var pricingTBodyNode = gbpPriceTRNode.parentNode;
            while (pricingTBodyNode.nodeName.toLowerCase() != 'tbody') {
                pricingTBodyNode = pricingTBodyNode.parentNode;
            }

            // Create a new TR, populate it with the Irish price and add it to the TBODY
            var irishPriceNode = gbpPriceTRNode.cloneNode(true);
            irishPriceNode.cells[0].innerHTML = "Irish Price:";
            irishPriceNode.cells[1].innerHTML = "<b class=\"priceLarge\">\u20ac" + irishPrice + "</b> approximately. " + shippingMessage(priceInGBP);
            pricingTBodyNode.appendChild(irishPriceNode);
        }
    }

    function shippingMessage(priceInGBP) {
        message = "";
        if (priceInGBP >= 25) {
            message = "May be eligible for free delivery with <a href=\"http://www.amazon.co.uk/gp/help/customer/display.html/?nodeId=200355380\"><b>Super Saver Delivery</b></a>.";
        } else {
            message = "Not including <a href=\"http://www.amazon.co.uk/gp/help/customer/display.html?ie=UTF8&nodeId=200395880\">shipping</a>.";
        }
        return message;
    }

    // If we have no rate or the rate hasn't been retrieved today then retrieve
    // the latest rate
    if (gbpToEurRate === undefined || dateRateLastRetrieved !== todayAsString) {
        GM_log("need to retrieve a new rate");
        retrieveRate(updatePageWithIrishPrice);
    } else {
        updatePageWithIrishPrice();
    }

})();

