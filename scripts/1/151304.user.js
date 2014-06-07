// ==UserScript==
// @name          Geocaching.com compact listing
// @namespace     geocaching.local
// @description   Enhances page with cache listing - removes banners, disclaimers and other space wasting elements
// @include       http://www.geocaching.com/*
// @include       https://www.geocaching.com/*
// @version       0.0.2
// ==/UserScript==


// CACHE LISTING PAGE FUNCTIONS //

// * remove banner "upgrade to PREMIUM"
var elemPremiumUpg = document.evaluate('//div[@id="ctl00_divSignedIn"]/p[@class="SignedInText"]/a[@id="hlUpgrade"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemPremiumUpg) {
    elemPremiumUpg.parentNode.removeChild(elemPremiumUpg);
}

// * remove tracking javascript belonging to "upgrade to PREMIUM"
var elemPremiumUpg = document.evaluate('//div[@id="ctl00_divSignedIn"]/p[@class="SignedInText"]/script',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemPremiumUpg) {
    elemPremiumUpg.parentNode.removeChild(elemPremiumUpg);
}

// * disable GC Code Widget - show GC URL directly
var elemGCCodeName = document.evaluate('//span[@id="ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemGCCodeName) {
    var GCCode = elemGCCodeName.innerHTML;

    var elemGCCodeWidget = document.evaluate('//div[@id="ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoLinkPanel"]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (elemGCCodeWidget) {
        elemGCCodeWidget.innerHTML = 'http://coord.info/<span style="color: #717073 !important; font-size: 150%; font-weight: bold; padding-right: 20px;">' + GCCode + '</span>';
        elemGCCodeWidget.style.fontWeight = 'normal';
    }
}

// * remove header "navigation"
var elemNavigWidget = document.evaluate('//h3[@class="WidgetHeader"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemNavigWidget) {
    elemNavigWidget.parentNode.removeChild(elemNavigWidget);
}

// * remove video + image banner when not logged in
var elemNotLogBan = document.evaluate('//div[@style="position: relative;height:257px;"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemNotLogBan) {
    elemNotLogBan.parentNode.removeChild(elemNotLogBan);
}

// * add link to geocaching maps to cache coordinates
var elemLatLon = document.evaluate('//span[@id="uxLatLon"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemLatLon) {
    // get span text
    var textLatLon = elemLatLon.innerHTML;

    // get geocaching map url
    var gglHref = document.evaluate('//span[@id="ctl00_ContentBody_MapLinks_MapLinks"]/li/a',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (gglHref) {
        // create new element
        var newElement = document.createElement('a');
        newElement.href=gglHref.href;
        newElement.target='_blank';
        newElement.innerHTML=textLatLon;
        newElement.style.fontWeight='bold';

        // replace span to href
        elemLatLon.parentNode.replaceChild(newElement, elemLatLon);
    }
}

// * add text Other conversions AND MAPS
var elemConv = document.evaluate('//a[@id="ctl00_ContentBody_lnkConversions"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemConv) {
    elemText = elemConv.innerHTML + ' and Maps';
    elemConv.innerHTML = elemText;
}

// * remove UTM coordinates
var elemUtm = document.evaluate('//span[@id="ctl00_ContentBody_LocationSubPanel"]/small',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemUtm) {
    elemUtm.parentNode.removeChild(elemUtm);
}

// * remove UTM/br element
var elemUtm = document.evaluate('//span[@id="ctl00_ContentBody_LocationSubPanel"]/br',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemUtm) {
    elemUtm.parentNode.removeChild(elemUtm);
}

// * remove print/br element
var elemPrint = document.evaluate('//div[@id="Print"]/p[@class="NoBottomSpacing"]/br',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemPrint) {
    elemPrint.parentNode.removeChild(elemPrint);
}

// * remove "read about waypoint downloads"
var elemDown = document.evaluate('//div[@id="Download"]/p[@class="NoBottomSpacing"]/small',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDown) {
    elemDown.parentNode.style.display = 'inline';
    elemDown.parentNode.removeChild(elemDown);
}

var elemCss = document.evaluate('//div[@id="Download"]/p[@class="NoBottomSpacing TopSpacing"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemCss) {
    elemCss.style.display = 'inline';
}

// * shorten LOC button text
var elemLocBut = document.getElementById('ctl00_ContentBody_btnLocDL');
if(elemLocBut) {
    elemLocBut.value = 'LOC file';
}

// * hide disclaimer in cache page
var elemDel = document.evaluate('//fieldset[@class="DisclaimerWidget"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}

// * hide decryption key in cache page
var elemDel = document.evaluate('//div[@id="dk"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}

// * hide "What are Attributes?"
var elemDel = document.evaluate('//div[@class="WidgetBody"]/p[@class="NoBottomSpacing"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}

// * hide Ad
var elemDel = document.evaluate('//div[@id="ctl00_ContentBody_uxBanManWidget"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}

// * hide "Advertising with us"
var elemDel = document.evaluate('//div[@id="ctl00_ContentBody_divContentSide"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}

// * hide "What is a travelbug?"
var elemDel = document.evaluate('//a[@id="ctl00_ContentBody_uxTravelBugList_uxWhatIsATravelBug"]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemDel) {
    elemDel.parentNode.removeChild(elemDel);
}
