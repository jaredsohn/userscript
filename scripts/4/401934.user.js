// ==UserScript==
// @name       GooglePortfolioSmallCharts
// @namespace  http://use.i.E.your.homepage/
// @version    0.5
// @description adds small charts to Google Finance portfolio view
// @match      https://www.google.com/finance/portfolio?action=view*
// @grant          GM_addStyle
// @copyright  2014, Emery Lapinski
// @require    http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==

console.log("GooglePortfolioSmallCharts");
//unsafeWindow.jQ = jQuery;

function doit()
{
	GM_addStyle("img.gpsmallcharts { vertical-align:middle;/*makes the TEXT vertical aligned???*/; max-height:95px; }");

    loopOn("table.gf-table tbody tr", function(trs)
            {
//                console.log("tds.length=" + tds.length + " tds=", tds);
                
                trs.each(function(index, tr)
                         {
                             tr = $(tr);	// jqueryify
                             
                             var tdsymbol = $(".pf-table-s", tr);
                             var tdlastprice = $(".pf-table-lp", tr);
                             var tdchange = $(".pf-table-cp", tr);
                             
                             var symbol = tdsymbol.text();
                             if(!symbol)
                                 	return;
                             
                             var imgurl = "http://ichart.finance.yahoo.com/c/bb/m/" + symbol;
                             tdlastprice.prepend("<img class='gpsmallcharts' src='" + imgurl + "'>");
                             
                             var imgurl = "http://ichart.yahoo.com/t?s=" + symbol;
                             tdchange.append("<img class='gpsmallcharts' src='" + imgurl + "' >");
                         });
            });
}

function loopOn(selector, callback)
{
    var elements = $(selector).not(".GooglePortfolioSmallCharts");
    
    if(elements.length > 0)
    {
	    elements.addClass("GooglePortfolioSmallCharts");
        callback(elements);
    }
    
    setTimeout(function()
               {
                   loopOn(selector, callback);
               }, 1000);
}

$(document).ready(doit);
