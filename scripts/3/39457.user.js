// Version 2.1
// foijord@gmail.com
// modified 2009/09/21 by IT-Konsulenten Kåre Knutsen

// ==UserScript==
// @name           Salgshistorikk
// @description    Adds price history to real estate ads on finn.no
// @include        http://www.finn.no/finn/realestate/homes/object?finnkode=*
// ==/UserScript==


function insertPriceHistory(documentstring, href) 
{ 
    var pricehistorylink = document.createElement('A');
    pricehistorylink.href = href;
    pricehistorylink.innerHTML = "Salgshistorikk";
    
    var priceelement = document.getElementsByClassName('price_suggestion')[0];
    priceelement.parentNode.insertBefore(pricehistorylink, priceelement.nextSibling);

    var startindex = documentstring.indexOf('<h3>Søkeresultater gårds/bruksnummer</h3>');
    var endindex = documentstring.indexOf('<div class="ads">');

    var pricehistory = document.createElement('div');

    if (startindex != -1 && endindex != -1) {
    	pricehistory.innerHTML = documentstring.substring(startindex, endindex - 1);
    } else {
    	pricehistory.innerHTML = "Det ble ikke funnet opplysninger om tidligere salg.";
    }
    priceelement.parentNode.insertBefore(pricehistory, priceelement.nextSibling.nextSibling);
}

function buildPriceHistoryURL() 
{
    // add whitespace trim function to string class
    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

    var knr, gnr, bnr, fnr, snr;

    knr = document.getElementById("mapmatrix_knr_0");
    gnr = document.getElementById("mapmatrix_gnr_0");
    bnr = document.getElementById("mapmatrix_bnr_0");

    fnr = document.getElementById("mapmatrix_fnr_0");
    snr = document.getElementById("mapmatrix_snr_0");

    var url = 
        "http://www.bt.no/forbruker/husoghjem/eiendomssok/?mode=matrikkel&cmd=true" +
        "&knr=" + knr.innerHTML.trim() +
        "&gnr_matr=" + gnr.innerHTML.trim() +
        "&bnr_matr=" + bnr.innerHTML.trim();
    
    if (snr) { url += "&snr_matr=" + snr.innerHTML.trim(); }
    if (fnr) { url += "&fnr_matr=" + fnr.innerHTML.trim(); }

    return url;
}

function fetchPriceHistoryData() 
{
    var url = buildPriceHistoryURL();
    GM_xmlhttpRequest({
            method: 'GET',
                url: url,
                onload: function(responseDetails) 
                {
                    insertPriceHistory(responseDetails.responseText, url);
                }
        });
}

fetchPriceHistoryData();