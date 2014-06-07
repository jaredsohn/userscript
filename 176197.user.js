    // ==UserScript==
    // @name Justin's Script
    // @namespace http://use.i.E.your.homepage/
    // @version 0.1
    // @description enter something useful
    // @match https://cha1-portal.amazon.com/gp/receive/dockmaster/appointment_view.html?apptId=*
    // @copyright 2012+, You
    // ==/UserScript==
     
    jQuery(document).ready(function() {
    var $ = jQuery;
    $('td.info').each(function(){
    if ($(this).text().match(/[A-Z]\d{7}/)) { // PO
    var $str = [];
    var $pos = $(this).text().split(', ');
    $pos.forEach(function($elem){
    $elem = $elem.replace(/\xA0/g, '');
    $str.push('<a href="https://buyingportal-us.amazon.com/gp/ors/po/summary.html?ie=UTF8&po='+$elem+'">'+$elem+'</a>');
    });
    $(this).html($str.join(', '));
    }
    if ($(this).text().match(/^[A-Z0-9]{5}($|\xA0|,)/)) { // Vendor
    var $str = [];
    var $pos = $(this).text().split(', ');
    $pos.forEach(function($elem){
    $elem = $elem.replace(/\xA0/g, '');
    $str.push('<a href="https://vendormaster.amazon.com/vm/jsp/VendorQueryHandler.jsp?vendorName=&wildcard-option=equals&businessGroup=&business-group-wildcard-option=equals&option=by-code&primaryVendorCode='+$elem+'&wildcard-option2=equals&id=&find=Find&target=VendorEditForm.jsp">'+$elem+'</a>');
    });
    $(this).html($str.join(', '));
    }
    });
    });

