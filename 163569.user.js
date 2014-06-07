// ==UserScript==
// @name        Mint.com Fixes
// @namespace   ChinhDo
// @description Fixes Mint.Com issues. Author: Chinh Do (www.chinhdo.com).
// @include     https://wwws.mint.com/investment.event*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

if(!window.jQuery)
{
   var script = document.createElement('script');
   script.type = "text/javascript";
   script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
   document.getElementsByTagName('head')[0].appendChild(script);
}

setTimeout(function () {updateBalance();}, 1000);
window.chinhDoMintFixerCounter = 0;

function updateBalance() {
    window.chinhDoMintFixerCounter++;
    if (window.chinhDoMintFixerCounter>=10) {
        console.log("All done.");
        return;
    }

    var totalMktValTd = $("table.portfolio tfoot tr.up td:eq(2)");
    console.log("MktVal: " + totalMktValTd.text());
    if (totalMktValTd.text().match(/Fixed/ig)) {     
        setTimeout(function () {updateBalance();}, 1000);
        return;
    }

    var totalMargin = 0;
    var totalPricesPaid = 0;
    var entries = $("#portfolio-entries tr.cash");
    entries.each(function(idx) {
        var entryType = $(this).children("th:eq(0)").text().trim();
        // console.log(entryType);
        if (entryType == "Margin") {
            var marginAmt = $(this).children("td:eq(3)").text();
            var pricePaidAmt = $(this).children("td:eq(2)").text();
            var newHtml = "<span style='color: #C0C0C0; text-decoration: line-through;'>" + marginAmt + "</span>";
            $(this).children("td:eq(3)").html(newHtml);
            $(this).children("td:eq(2)").html(newHtml);
            var str = $(this).children("td:eq(3)").text();
            var amt = Number(str.replace(/[^0-9\.]+/g,""));
            totalMargin += amt;
            
            str = $(this).children("td:eq(3)").text();
            amt = Number(str.replace(/[^0-9\.]+/g,""));
            totalPricesPaid += amt;
            // console.log(amt);
        }
    });
    console.log("Total Margin: " + totalMargin);
    
    // Update TOTAL    
    var totalMktValStr = totalMktValTd.text();
    var totalMktVal = Number(totalMktValStr.replace(/[^0-9\.]+/g,""));
    
    console.log("Total Mkt Val: " + totalMktVal);
    var fixedMktVal = "$" + (totalMktVal - totalMargin).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    
    console.log("Fixed Market Value: " + fixedMktVal);
    totalMktValTd.html(totalMktValTd.text() + "<br/>Fixed: <b>" + fixedMktVal + "</b>");
    
    var totalPricesPaidTd = $("table.portfolio tfoot tr.up td:eq(1)");
    var totalPricesPaidText = totalPricesPaidTd.text();
    var totalPricesPaidVal = Number(totalPricesPaidText.replace(/[^0-9\.]+/g,""));
    var fixedPricesPaid = "$" + (totalPricesPaidVal - totalPricesPaid).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    totalPricesPaidTd.html(totalPricesPaidText + "<br/>Fixed: <b>" + fixedPricesPaid + "</b>");
    
    $("#account-accounts h3").html(fixedMktVal + " <span style='font-size:10px'>(fixed)</span>");
    
    setTimeout(function () {updateBalance();}, 1000);
}