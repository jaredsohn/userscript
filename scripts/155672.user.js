// ==UserScript==
// @name Remove Shipping Information
// @namespace aaaa
// @description automatically fill in textbox
// @include http://www.omix-ada.com/dealers/billShipInfo.asp
// ==/UserScript==
window.onload = function() {
document.getElementsByName('_shipName')[0].value="";
    document.getElementsByName('shipContact')[0].value="";
    document.getElementsByName('shipaddress')[0].value="";
    document.getElementsByName('_shipaddress2')[0].value="";
    document.getElementsByName('shipcity')[0].value="";
    document.getElementsByName('_shipstate')[0].value="";
    document.getElementsByName('_shipProvince')[0].value="";
    document.getElementsByName('shipzipcode')[0].value="";
    document.getElementsByName('shipCountry')[0].value=".USA";
        document.getElementsByName('shipphoneno')[0].value="";
    document.getElementsByName('_shipfaxno')[0].value="";
    document.getElementsByName('shipemail')[0].value="";
        document.getElementsByName('emailTracking')[0].checked="true";
}