// ==UserScript==
// @name           Yodlee MoneyCenter Ticker Linker
// @namespace      http://www.curlybrace.com/projects/greasemonkey/yodlee/
// @description    Converts ticker symbols into clickable Google Finance links within the Yodlee MoneyCenter Portfolio View page.
// @include        https://moneycenter.yodlee.com/moneycenter/*
// ==/UserScript==

//-----------------------------------------------------------------------------
// Information
//-----------------------------------------------------------------------------
// Written by Jeff Fitzsimons on 2/19/2008.
//    * Updated for Yodlee layout changes 3/16/2008.
//
// This Greasemonkey script converts symbol names into clickable links in 
// Yodlee MoneyCenter's Portfolio Manager page.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Options
//-----------------------------------------------------------------------------

// Change these values to customize linkified link appearances:

var bNewWindow = true;	// Set target="_blank" so that links open up in a new window or tab.

//-----------------------------------------------------------------------------
// Helper functions
//-----------------------------------------------------------------------------
 
// getElementsByClass, from http://www.anyexample.com/webdev/javascript/javascript_getelementsbyclass_function.xml
function getElementsByClass( searchClass, domNode, tagName) {
    if (domNode === null) {
        domNode = document;
    }
    if (tagName === null) {
        tagName = '*';
    }
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " "+searchClass+" ";
    for(i=0,j=0; i<tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1) {
            el[j++] = tags[i];
        }
    }
    return el;
}

function BuildClickableTicker(sTicker)
{
    var sLink = '<a href="http://finance.google.com/finance?q=' + sTicker + '"';
    if (bNewWindow)
    {
        sLink += ' target="_blank"';
    }
    sLink += '>' + sTicker + '</a>';
    return sLink;
}

function main()
{
    if (document.URL.indexOf("portfolio.moneycenter.do") != -1)
    {
        // This is the Portfolio Manager main page.
        var index = 1, symbol;
        do
        {
            symbol = document.getElementById("SymbolValue" + index);

            if (symbol)
            {
                symbol.innerHTML = BuildClickableTicker(symbol.innerHTML);
            }
            
            index += 1;
        } while (symbol);
    }
    else if (document.URL.indexOf("chart.moneycenter.do") != -1)
    {
        // This is the Portfolio Chart page.
        
        // There are several tables with the ID 'tableBean', but only the first
        // one contains the ticker names.
        var firstTable = document.getElementById("tableBean");
        if (firstTable)
        {
            var symbols = getElementsByClass("lcell", firstTable, null);
            if (symbols)
            {
                // The first row will be 'Holding' and the final row will be 
                // 'Total', so start at the 2nd element and process through
                // length - 1.
                for (i = 1; i < (symbols.length - 1); i++)
                {
                    symbols[i].innerHTML = BuildClickableTicker(symbols[i].innerHTML);
                }
            }
        }
    }
    else if (document.URL.indexOf("accountDetails.moneycenter.do") != -1)
    {
        // Yodlee seems to have changed behavior, now everything appears
        // under the 'accountDetails' page...?

        // The table we need is stored under a DIV with the ID "contents"...
        var contents = document.getElementById("contents");
        if (contents)
        {
            // Walk all the children looking for the Investment Accounts Overview
            // table.  Sadly, this breaks internationalization, eh?
            for (var i = 0; i < contents.childNodes.length; i++)
            {
                if (contents.childNodes[i].summary == "Investment Accounts Overview")
                {
                    // Find the table's body element, then enumerate its
                    // rows...
                    var table = contents.childNodes[i];
                    var tbody = table.getElementsByTagName("tbody")[0];
                    var rows = tbody.getElementsByTagName("tr");
                    for (var j = 0; j < rows.length; j++)
                    {
                        var cells = rows[j].childNodes;
                        
                        // For now, we'll assume that if it's all-caps, it's
                        // a ticker symbol...
                        var ticker = cells[1].innerHTML;
                        if (ticker.match(/^[A-Z]+$/))
                        {
                            cells[1].innerHTML = BuildClickableTicker(ticker);
                        }
                    }
                }
            }
        }
    }

}

main();
