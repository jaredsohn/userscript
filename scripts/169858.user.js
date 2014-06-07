// ==UserScript==
// @name       IT Estate fix stupid links
// @namespace  http://buck.ly/
// @version    0.1
// @description  fixes the annoying un-tab-friendly links on ITestate.com.au
// @match      http://*.itestate.com.au/*
// @copyright  2012+, Scott Buckley
// ==/UserScript==

jQuery(document).ready(function($) {
    var url_pref = "http://www.itestate.com.au/pages/product/pdt_product_detail.faces?BeanName=productDetailAction&pcode=";
    $("a[href='#']").each(function() {
        var octext = $(this).attr("onclick");
        if (octext.indexOf("openwin")==0) {
            var pnumber = octext.split("'")[1];
            $(this).attr("href", url_pref+pnumber);
            $(this).attr("onclick", "");
        }
    });
});
