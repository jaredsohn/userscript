// Create links from product pages on multiple sites that go to krillion local
// availability page. This version verifies the product using krillion api.
// If the product is supported by krillion, we add a button with link
// to the appropriate where-to-buy page on the Krillion site.
//
// version 0.61 BETA!
// 2008-08-13
// Copyright (c) 2008, Krillion
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Krillion StockCheck", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Krillion StockCheck
// @namespace     http://www.krillion.com
// @description   Adds "Check Local Availability" buttons to products on the web.
// @exclude       http://*.krillion.com/*
// ==/UserScript==

// --------------------------------------------------------------------
// This section is common code that should not need to change when
// adding support for another product site.

var krillion_host = "http://www.krillion.com";
var krillion_GM_account_key = 'AB4D2DA1-0380-4843-907E-C412765FD6DD';
var krillion_GM_account_code = 'Mashup';

// These settings can be controlled by extension options in the future
var krillion_is_widget = false;
var krillion_show_prices = true;

var krillion_sites = new Array();

// Useful helper function for trimming whitespace at start/end of strings
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/, '');
};

function krillion_getProductUrl(brand, node) {
    if (krillion_is_widget) {
        if (krillion_show_prices) {
            return krillion_host + "/widget/xANPV-simpleAvailability-" + brand + "-" + this.getSku(node) + "-showPrices/?partner=" + krillion_GM_account_code;
        } else {
            return krillion_host + "/widget/xANP-simpleAvailability-" + brand + "-" + this.getSku(node) + "/?partner=" + krillion_GM_account_code;
        }
    } else {
        return krillion_host + "/xNP-" + brand + "-" + this.getSku(node) + "/?partner=" + krillion_GM_account_code;
    }
}

function krillion_getProductNodes(query) {
    return document.evaluate(query, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
}

function krillion_createPostProductVerificationCall(site, node) {
    // Return a reference to an anonymous inner function created
    // with a function expression.
    return (function(responseDetails){
        var brand = site.getBrand(node);
        var sku = site.getSku(node);
        if(responseDetails.responseText == "true") {
            site.showButton(node);
            GM_log("Verified product for " + brand + " " + sku);
        } else {
            GM_log("Product not found for " + brand + " " + sku);
        }
    });
}

function krillion_processSite() {
    var nodes = krillion_getProductNodes(this.query);
    if (nodes) {
        for (var i = 0; i < nodes.snapshotLength; i++) {
            var node = nodes.snapshotItem(i);
            var verifyUrl = this.getVerifyUrl(node);
            var onload_function = krillion_createPostProductVerificationCall(this, node);
            GM_xmlhttpRequest({
                method: 'GET',
                url: verifyUrl,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                },
                onload: onload_function
            });

        }
    }
}

function krillion_createDefaultPostProductVerificationCall(site, node) {
    // Return a reference to an anonymous inner function created
    // with a function expression.
    return (function(responseDetails){
        var brand = site.getBrand(node);
        var sku = site.getSku(node);
        if(responseDetails.responseText == "true") {
            site.updateLink(node);
            GM_log("Verified product for " + brand + " " + sku);
        } else {
            site.replaceNode(node);
            GM_log("Product not found for " + brand + " " + sku);
        }
    });
}

function krillion_processDefaultSite() {
    var nodes = krillion_getProductNodes(this.query);
    if (nodes) {
        for (var i = 0; i < nodes.snapshotLength; i++) {
            var node = nodes.snapshotItem(i);
            var verifyUrl = this.getVerifyUrl(node);
            var onload_function = krillion_createDefaultPostProductVerificationCall(this, node);
            GM_xmlhttpRequest({
                method: 'GET',
                url: verifyUrl,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                },
                onload: onload_function
            });

        }
    }
}

// --------------------------------------------------------------------
// Special logic for default site goes here

function krillion_site_default() {
    this.process = krillion_processDefaultSite;
    this.query = "//a[@class='krillion']";

    this.getBrand = function (node) {
        return node.getAttribute("brand");
    }

    this.getSku = function (node) {
        return node.getAttribute("model").replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getPartner = function (node) {
        var partner = node.getAttribute("partner");
        if (!partner || partner == "") {
            partner = "Mashup";
        }
        return partner;
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = function (node) {
        if (krillion_is_widget) {
            if (krillion_show_prices) {
                return krillion_host + "/widget/xANPV-simpleAvailability-" + this.getBrand(node) + "-" + this.getSku(node) + "-showPrices/?partner=" + this.getPartner(node);
            } else {
                return krillion_host + "/widget/xANP-simpleAvailability-" + this.getBrand(node) + "-" + this.getSku(node) + "/?partner=" + this.getPartner(node);
            }
        } else {
            return krillion_host + "/xNP-" +  this.getBrand(node) + "-" + this.getSku(node) + "/?partner=" + this.getPartner(node);
        }
    }

    this.updateLink = function (node) {
        var productUrl = this.getProductUrl(node);
        node.setAttribute("href", productUrl);
    }

    this.replaceNode = function (node) {
        var span = document.createElement("SPAN");
        span.setAttribute("class", "krillion");
        span.setAttribute("brand", this.getBrand(node));
        span.setAttribute("sku", this.getSku(node));
        span.setAttribute("partner", this.getPartner(node))
        var text = document.createTextNode(node.textContent);
        span.appendChild(text);
        node.parentNode.replaceChild(span, node);
    }
}

// --------------------------------------------------------------------
// Special logic for AMAZON site goes here

function krillion_site_amazon() {
    this.process = krillion_processSite;
    this.query = "//td[@id='prodImageCell']/a/img[@id='prodImage']";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.getAttribute("alt").split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.getAttribute("alt").split(" ");
        return words[1].replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.getBrand(node), node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("src", imageSrc);
        image.setAttribute("border", "0");

        anchor.appendChild(image);

        node.parentNode.parentNode.appendChild(anchor);
     }
}

krillion_sites["www.amazon.com"] = krillion_site_amazon;

// --------------------------------------------------------------------
// Special logic for BLACK & DECKER site goes here

function krillion_site_black_decker() {
    this.brand = "Black+Decker";
    this.process = krillion_processSite;
    this.query = "//span[@id='ProductDetails_ProductModelNumber']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand.replace("+", "_"), node);

        var lineBreak = document.createElement("BR");
        node.appendChild(lineBreak);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "5");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.appendChild(anchor);
    }
}

krillion_sites["www.blackanddecker.com"] = krillion_site_black_decker;

// --------------------------------------------------------------------
// Special logic for BUZZILLIONS site goes here

function krillion_site_buzzillions() {
    this.process = krillion_processSite;
    this.query = "//div[@class='bzProductContent']/div[@class='bzReviewSummary']/div[@class='bzSnapshot']/div[@class='bzSnapshotWrap']/h1";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=1; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.getBrand(node), node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var lineBreak = document.createElement("BR");
        node.appendChild(lineBreak);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("hspace", "10");
        image.setAttribute("vspace", "5");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.appendChild(anchor);
    }
}

krillion_sites["www.buzzillions.com"] = krillion_site_buzzillions;

// --------------------------------------------------------------------
// Special logic for CANON site goes here

function krillion_site_canon() {
    this.brand = "Canon";
    this.process = krillion_processSite;
    this.query = "//table[@id='prod_info_tbl']//td[@class='prod_sub_info']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        return words[2].replace("Suggested", "").replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var tableRow = document.createElement("TR");
        var tableData = document.createElement("TD");

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "5");
        image.setAttribute("hspace", "5");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        tableData.appendChild(anchor);
        tableRow.appendChild(tableData);

        node.parentNode.parentNode.parentNode.appendChild(tableRow);
    }
}

krillion_sites["www.usa.canon.com"] = krillion_site_canon;

// --------------------------------------------------------------------
// Special logic for CASIO site goes here

function krillion_site_casio() {
    this.brand = "Casio";
    this.process = krillion_processSite;
    this.query = "//table[@class='proHDR']//th[@class='image']//img";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.getAttribute("alt").replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var tableRow = document.createElement("TR");
        var tableData = document.createElement("TD");

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "top");
        image.setAttribute("hspace", "15");
        image.setAttribute("vspace", "15");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        tableData.appendChild(anchor);
        tableRow.appendChild(tableData);

        node.parentNode.parentNode.parentNode.appendChild(tableRow);
    }
}

krillion_sites["www.casio.com"] = krillion_site_casio;

// --------------------------------------------------------------------
// Special logic for CHAR-BROIL site goes here

function krillion_site_char_broil() {
    this.brand = "Char+Broil";
    this.process = krillion_processSite;
    this.query = "//span[@id='ctl00_ContentPlaceHolder1_lblModelNumber']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand.replace("+", "_"), node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("hspace", "15");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.appendChild(anchor);
    }
}

krillion_sites["www.charbroil.com"] = krillion_site_char_broil;

// --------------------------------------------------------------------
// Special logic for COBY site goes here

function krillion_site_coby() {
    this.brand = "Coby";
    this.process = krillion_processSite;
    this.query = "//div[@id='main_content']/div[@id='xsnazzy']/div[@class='xboxcontent2']/div/h1";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.getBrand(node), node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("src", imageSrc);
        image.setAttribute("border", "0");
        image.setAttribute("hspace", "10");
        image.setAttribute("align", "texttop");

        anchor.appendChild(image);
        node.appendChild(anchor);
     }
}

krillion_sites["www.cobyusa.com"] = krillion_site_coby;

// --------------------------------------------------------------------
// Special logic for CONSUMER REPORTS site goes here

function krillion_site_consumer_reports() {
    this.process = krillion_processSite;
    this.query = "//div[@id='container']/div[@id='rr_midcol']/table//table//td[@class='hed-brand-model']";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.replace(/\u00A0/g," ").split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.replace(/\u00A0/g," ").split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=1; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.getBrand(node), node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "5");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.appendChild(anchor);
    }
}

krillion_sites["www.consumerreports.org"] = krillion_site_consumer_reports;

// --------------------------------------------------------------------
// Special logic for EPINIONS site goes here

function krillion_site_epinions() {
    this.process = krillion_processSite;
    this.query = "//div[@class='xkb']/table//table//table//table//td/h1[@class='title']";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=1; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.getBrand(node), node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("hspace", "10");
        image.setAttribute("vspace", "10");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.epinions.com"] = krillion_site_epinions;
krillion_sites["www99.epinions.com"] = krillion_site_epinions;

// --------------------------------------------------------------------
// Special logic for GARMIN site goes here

function krillion_site_garmin() {
    this.brand = "Garmin";
    this.process = krillion_processSite;
    this.query = "//div[@id='product']/div/div[@id='productcopy']/div[@class='priceDropdown']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
	    var words = new Array();
	    words = node.textContent.split(" ");
        return words[2].replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.parentNode.parentNode.appendChild(anchor);
    }
}

krillion_sites["buy.garmin.com"] = krillion_site_garmin;

// --------------------------------------------------------------------
// Special logic for GOOGLE site goes here

function krillion_site_google() {
    this.process = krillion_processSite;
    this.query = "//div[@id='res']//div[@class='g']/h2[@class='r']/a/b";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        var sku = "NoSkuFound";
        if (words.length > 1) {
            sku = words[1].replace(/[^A-Za-z0-9]+/g, ""); 
        }
        return sku;
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.getBrand(node), node);

        var div = document.createElement('DIV');

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);

        var image = document.createElement('IMG');
        image.setAttribute("src", imageSrc);
        image.setAttribute("align", "middle");
        image.setAttribute("vspace", "10");
        image.setAttribute("border", "0");

        anchor.appendChild(image);
        div.appendChild(anchor);

        var span = document.createElement('SPAN');
        span.setAttribute("class", "a");
        span.setAttribute("style", "font-size: 84%;");

        var text = document.createTextNode(" Powered by Krillion");
        
        span.appendChild(text);
        div.appendChild(span)

        node.parentNode.parentNode.appendChild(div);
     }
}

krillion_sites["www.google.com"] = krillion_site_google;

// --------------------------------------------------------------------
// Special logic for MAGELLAN site goes here

function krillion_site_magellan() {
    this.brand = "Magellan";
    this.process = krillion_processSite;
    this.query = "//ul[@class='products']/li[@class='clearfix']/h3/span";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        if (  words[1] == "Maestro"
           || words[1] == "Triton"
           || words[1] == "RoadMate" ) {
            return words[1].toUpperCase() + words[2].replace(/[^A-Za-z0-9]+/g, "");
        } else {
            return words[2].replace(/[^A-Za-z0-9]+/g, "");
        }
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "middle");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.appendChild(anchor);
    }
}

krillion_sites["www.magellangps.com"] = krillion_site_magellan;

// --------------------------------------------------------------------
// Special logic for MICROSOFT Live Product Search site goes here

function krillion_site_microsoft() {
    this.process = krillion_processSite;
    this.query = "//div[@id='sw_page']//div[@id='sw_content']//div[@id='results_area']/div[@class='prod_title']/h1";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=1; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.getBrand(node), node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var lineBreak = document.createElement("BR");
        node.parentNode.appendChild(lineBreak);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("hspace", "10");
        image.setAttribute("vspace", "5");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["search.live.com"] = krillion_site_microsoft;

// --------------------------------------------------------------------
// Special logic for NIKON site goes here

function krillion_site_nikon() {
    this.brand = "Nikon";
    this.process = krillion_processSite;
    this.query = "//div[@id='contentsWrapper']/div[@id='contentsArea']/div[@class='section1']/h1";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/Nikon/,"").replace(/COOLPIX/,"").replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "top");
        image.setAttribute("hspace", "25");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.appendChild(anchor);
    }
}

krillion_sites["imaging.nikon.com"] = krillion_site_nikon;

// --------------------------------------------------------------------
// Special logic for PRICE GRABBER site goes here

function krillion_site_pricegrabber() {
    this.process = krillion_processSite;
    this.query = "//div[@id='pgPageContent']//td[@class='prodinfo_content']/h1";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.trim().split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=1; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.getBrand(node), node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var linebreak = document.createElement("BR");
        node.parentNode.appendChild(linebreak);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "25");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["appliances.pricegrabber.com"] = krillion_site_pricegrabber;
krillion_sites["cameras.pricegrabber.com"] = krillion_site_pricegrabber;
krillion_sites["computers.pricegrabber.com"] = krillion_site_pricegrabber;
krillion_sites["electronics.pricegrabber.com"] = krillion_site_pricegrabber;

// --------------------------------------------------------------------
// Special logic for SAMSUNG site goes here

function krillion_site_samsung() {
    this.brand = "Samsung";
    this.process = krillion_processSite;
    this.query = "//div[@id='content']/div[@class='mainlt']/h1[@class='d']/a";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "top");
        image.setAttribute("vspace", "10");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.samsung.com"] = krillion_site_samsung;

// --------------------------------------------------------------------
// Special logic for SHOPPING.com site goes here

function krillion_site_shopping() {
    this.process = krillion_processSite;
    this.query = "//table[@class='lgImgSpaceHolder']//td[@class='wrap']/img";

    this.getBrand = function (node) {
        var words = new Array();
        words = node.getAttribute("alt").split(" ");
        return words[0];
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.getAttribute("alt").split(" ");
        return words[1].replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.getBrand(node), node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("src", imageSrc);
        image.setAttribute("border", "0");

        anchor.appendChild(image);

        node.parentNode.appendChild(anchor);
     }
}

krillion_sites["www.shopping.com"] = krillion_site_shopping;

// --------------------------------------------------------------------
// Special logic for SONY site goes here

function krillion_site_sony() {
    this.brand = "Sony";
    this.process = krillion_processSite;
    this.query = "//div[@class='product_info']/H3/A/STRONG";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        return node.textContent.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.brand, node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "top");
        image.setAttribute("vspace", "10");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.parentNode.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.sonystyle.com"] = krillion_site_sony;

// --------------------------------------------------------------------
// Special logic for TOMTOM site goes here

function krillion_site_tomtom() {
    this.brand = "TomTom";
    this.process = krillion_processSite;
    this.query = "//div[@id='content-main']/div[@class='section']/div[@class='one-col']/div[@class='category-item']/div[@class='column-2']/div/strong";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        if (  words[1] == "GO"
           || words[1] == "XL" ) {
            return words[1] + words[2].replace(/[^A-Za-z0-9]+/g, "");
        } else {
            return words[2].replace(/[^A-Za-z0-9]+/g, "");
        }
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";
        var productUrl = this.getProductUrl(this.brand, node);

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "middle");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);
        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.tomtom.com"] = krillion_site_tomtom;

// --------------------------------------------------------------------
// Special logic for TOSHIBA site goes here

function krillion_site_toshiba() {
    this.brand = "Toshiba";
    this.process = krillion_processSite;
    this.query = "//table//h1[@class='prodTitle']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        return words[1].replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.brand, node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("align", "top");
        image.setAttribute("vspace", "10");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.toshibadirect.com"] = krillion_site_toshiba;

// --------------------------------------------------------------------
// Special logic for VIZIO site goes here

function krillion_site_vizio() {
    this.brand = "Vizio";
    this.process = krillion_processSite;
    this.query = "//div[@id='main']/div[@id='content']/div[@class='title-bar']";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=0; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.brand, node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "5");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.appendChild(anchor);
    }
}

krillion_sites["www.vizio.com"] = krillion_site_vizio;

// --------------------------------------------------------------------
// Special logic for XBOX site goes here

function krillion_site_xbox() {
    this.brand = "Microsoft";
    this.process = krillion_processSite;
    this.query = "//div[@id='XbcShellBody']//td[@class='XbcLayoutCell']/div[@class='XbcChrome']/div[@class='XbcWpColumn']/div[@class='XbcChrome']/div[@class='XbcWpFreeForm2']/div/h6/a";

    this.getBrand = function (node) {
        return this.brand;
    }

    this.getSku = function (node) {
        var words = new Array();
        words = node.textContent.replace("Xbox 360 Arcade", "XGX-00001").split(" ");
        var digitRegEx = /[0-9]+/;
        var sku = "NoSkuFound";
        for (var i=0; i<words.length; i++) {
            if (words[i].search(digitRegEx) >= 0) {
                sku = words[i];
                break;
            }
        }
        return sku.replace(/[^A-Za-z0-9]+/g, "");
    }

    this.getVerifyUrl = function (node) {
        return krillion_host + '/api/request?account=' + krillion_GM_account_key + '&action=verify_product&brand=' + this.getBrand(node) + '&sku=' + this.getSku(node);
    }

    this.getProductUrl = krillion_getProductUrl;

    this.showButton = function (node) {
        var productUrl = this.getProductUrl(this.brand, node);
        var imageSrc = krillion_host + "/static/images/button_widgetCheckLocal.gif";

        var anchor = document.createElement('A');
        anchor.setAttribute("href", productUrl);
        anchor.setAttribute("target", "_blank");

        var image = document.createElement('IMG');
        image.setAttribute("vspace", "5");
        image.setAttribute("border", "0");
        image.setAttribute("src", imageSrc);

        anchor.appendChild(image);

        node.parentNode.parentNode.appendChild(anchor);
    }
}

krillion_sites["www.xbox.com"] = krillion_site_xbox;

// --------------------------------------------------------------------
// Process site when site lookup by page host is successful ...

var siteObject = krillion_sites[window.location.host];

if (siteObject) {
    var site = new siteObject();
    site.process();
} else {
    GM_log("Using default user script for site " + window.location.host);
    var site = new krillion_site_default();
    site.process();
}

