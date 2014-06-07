// ==UserScript==
// @name        Marketplace Improvement
// @namespace   erepublik.no/marketplace
// @description Marketplace Improvements
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @version     0.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==

// -----------------------------------------------------------------------------
String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)}
// -----------------------------------------------------------------------------

var currentproduct = 
{
    valid : false,
    country: 0,
    industry: 0,
    quality: 0
}

function main_marketplace()
{
    //if(!document.location.toString().startsWith("http://economy.erepublik.com/")) { return; }
    
    params = document.location.toString().split("/");
    
    currentproduct.country = params[6];
    currentproduct.industry = params[7];
    currentproduct.quality = params[8];
    
    html = '<div class="sattr"><small>Compare to</small><div><select id="compareToCountry">';
    options = $("#countryId option").each(function() {
        html+= '<option value="'+$(this).attr('value')+'" >';
        html+= $(this).text()+'</option>';
    });
    
    html+= '</select></div></div>';
    $("#filters_summary .sactual").append(html);
    
    $("#compareToCountry").change(function() {
        countryId = $(this).attr('value');
        page = 'http://www.erepublik.com/en/economy/market/'+countryId+'/'+currentproduct.industry+'/'+currentproduct.quality+'/citizen/0/price_asc/1';
        
        $(".compare_other").fadeOut('fast');
        $(".compare_other").remove();
        
        GM_xmlhttpRequest({
            method: "GET",
            url: page,
            onload: function (b) {
                
                rowCounter = 0;
                
                $(b.responseText).find("#marketplace .price_sorted tr").each(function() {
                    num = $(this).find(".m_stock").text();
        
                    price_major = $(this).find(".m_price strong:eq(0)").text().trim();
                    price_minor = $(this).find(".m_price sup").text();
                    price_minor = price_minor.replace(".","").split(" ")[0].trim();
                    price = price_major + "." + price_minor;
                    
                    // add amount in target country
                    current = $("#marketplace .price_sorted tr:eq("+rowCounter+") .m_stock");
                    html = $(current).html();
                    //alert(html); 
                    html2 = "<div style='float:right;display:none;' class='compare_other'>/ "+num+"</div>";
                    html = html2+"<div>"+html+"</div>";
                    $(current).html(html);
                    
                    // add price in target country
                    current = $("#marketplace .price_sorted tr:eq("+rowCounter+") .m_price");
                    html = $(current).html();
                    //alert(html); 
                    html2 = "<div style='float:right;display:none;' class='compare_other'><strong>"+price_major+"</strong><sup>."+price_minor+"<strong>NOK</strong> </sup></div>"
                    html = html2+"<div>"+html+"</div>";
                    $(current).html(html);
                    
                    rowCounter++;
                });
                
                $(".compare_other").fadeIn('slow');
                
            }
        });
    });
    //alert(currentproduct.country + "," + currentproduct.industry + "," + currentproduct.quality);
    $("#marketplace .price_sorted tr").each(function() 
    {
        num = $(this).find(".m_stock").text();
        
        price_major = $(this).find(".m_price strong:eq(0)").text().trim();
        price_minor = $(this).find(".m_price sup").text();
        price_minor = price_minor.replace(".","").split(" ")[0].trim();
        price = price_major + "." + price_minor;
        //alert(price);
    });
}


// -----------------------------------------------------------------------------
// startup
// -----------------------------------------------------------------------------
function main()
{
    main_marketplace();
}

// -----------------------------------------------------------------------------
// ready to go?
// -----------------------------------------------------------------------------
$(document).ready(main());