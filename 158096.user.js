// ==UserScript==
// @name           Conrad.de Lagerstatus
// @namespace      http://code-bude.net
// @description	   Shows a small information box, which tells you if a product is locally available in a Conrad store
// @icon           http://code-bude.net/downloads/conradstatus/conrad_status_logo.png
// @updateURL	   https://userscripts.org/scripts/source/158096.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/158096.user.js
// @version        1.2
// @grant          metadata
// @require        https://userscripts.org/scripts/source/49700.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include        htt*://*.conrad.de/*
// @match          http://*.conrad.de/*
// @match          https://*.conrad.de/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var storeIds = new Array('2010', '2049', '2032', '2027', '2018', '2046', '2085', '2035', '2025', '2017', '2092', '2047', '2037', '2091', '2021', '2016', '2048', '2028', '2038', '2030', '2020', '2077', '2060', '2070', '2050');

$(document).ready(function() {
   
    GM_config.init('Conrad.de Lagerstatus - Optionen' ,  
    {
        'conrad_store': 
        {
                'label': 'Für welchen Store soll der Lagerbestand ermittelt werden?',
                'type': 'select',
                'options': { 0 : 'Berlin Kreuzberg', 1 : 'Berlin Schöneberg', 2 : 'Berlin Steglitz', 3 : 'Bonn Weststadt', 4 : 'Braunschweig', 5 : 'Bremen Habenhausen', 6 : 'Dortmund', 7 : 'Dresden', 8 : 'Düsseldorf', 9 : 'Essen', 10 : 'Frankfurt', 11 : 'Hamburg Altona', 12 : 'Hamburg Wandsbek', 13 : 'Hannover', 14 : 'Kiel', 15 : 'Leipzig', 16 : 'Mainz', 17 : 'Mannheim', 18 : 'München Moosach', 19 : 'München Tal', 20 : 'Nürnberg', 21 : 'Regensburg', 22 : 'Saarbrücken', 23 : 'Stuttgart', 24 : 'Wernberg' }, // List of possible options
                'default': 9
        }
    });

    

    $( ".list-product-item" ).each(function( index ) {
       
        var pid = /\/product\/(\d+)\//.exec($(this).html())[1];
       
        var rating = $(this).find(".rating-availability")[0];
        $(rating).append('<p id="in-shop-available_'+pid+'"></p>');
        productAvailable('in-shop-available_'+pid, pid, storeIds[GM_config.get('conrad_store')]);
      
    });


});



function productAvailable(modEl, productId, shopId)
{

    var url = 'http://www.conrad.de/ce/RetailStoreInventoryCheck.html?productcode='+productId+'&chainstoreId='+shopId;
    $.get(url, function(data) {   
        var dataArr = data.split(',');
        dataArr = jQuery.map(dataArr, function(n){
            n = n.replace(/(\\r|\\n)*/, "")
            return $.trim(n);
        });
        dataArr = dataArr.splice(0,5);
        var settingHtml = '&nbsp;|&nbsp;<a href="javascript:void(0)" id="settings_'+productId+'"><img style="vertical-align:middle;width:12px; height: 12px" src="http://code-bude.net/downloads/conradstatus/settings.png"/></a>';
        //var settingHtml = '&nbsp;|&nbsp;<button onclick="alert(\'a\');"><img style="vertical-align:middle;width:12px; height: 12px" src="http://code-bude.net/downloads/conradstatus/settings.png"/></button>';
        if (dataArr[1]=="false")
        {
            var statusCode = '<div style="padding:2px;border: 1px dashed black;background-color:#F5A9A9"><img style="vertical-align:middle;width:12px; height: 12px" src="http://code-bude.net/downloads/conradstatus/false.gif"/>'
                            +'<span style="vertical-align:middle;color:#B40404">0x vorr&auml;tig in ' + dataArr[3] + '</span>'+settingHtml+'</div>';
            $('#'+modEl).html(statusCode);
        }
        else
        {
            var statusCode = '<div style="padding:2px;border: 1px dashed black;background-color:#9FF781"><img style="vertical-align:middle;width:12px; height: 12px" src="http://code-bude.net/downloads/conradstatus/true.gif"/>'
                            +'<span style="vertical-align:middle;color:#0B3B0B">' + dataArr[0] + 'x vorr&auml;tig in ' + dataArr[3] + '</span>'+settingHtml+'</div>';
            $('#'+modEl).html(statusCode);
        }
        
        $('#settings_'+productId).click(function() {
            GM_config.open();
        });
        

    });
    $('#'+modEl).html("Fehler beim Abrufen des Lagerbestands.");
}