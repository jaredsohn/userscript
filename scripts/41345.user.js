// Version 2.0
// kaarekrakk@gmail.com
// Edited by lisamariet@gmail.com

// ==UserScript==
// @name           Testscript
// @description    Adds price history to realestate ads on finn.no. Also adds history on renting realestate ads on finn.no
// @include        http://www.finn.no/finn/realestate/object?finnkode=*
// ==/UserScript==


function insertPriceHistory(documentstring, href) 
{ 
    var pricehistory = document.createElement('A');
    pricehistory.href = href;
    pricehistory.innerHTML = "Salgshistorikk";
    
    var price = document.getElementsByClassName('price')[0];
    // Check if node found if not look for node on a rent page
    if (!price) {
        price = document.getElementsByClassName('price_small')[0];
    }
    price.parentNode.insertBefore(pricehistory, price.nextSibling);

    var omsattyear = documentstring.match(/Omsatt \d{4}/g);
    var omsattprice = documentstring.match(/(Pris: kr. )+((0)|(\d{1,3},\d{3},\d{3})|(\d{1,3},\d{3}))/g);

    var omsattinfo = "";

    if (!omsattyear) {
        omsattinfo = "Det ble ikke funnet opplysninger om tidligere salg av denne boligen.";
    } else {
        for (var i = 0; i < omsattyear.length; i++) {
            omsattinfo += omsattyear[i] + " " + omsattprice[i] + "<br>";
        }
    }

    var pricehistory = document.createElement('div');
    pricehistory.innerHTML = omsattinfo;
    price.parentNode.insertBefore(pricehistory, price.nextSibling.nextSibling);
}

function buildPriceHistoryURL() 
{
    // add whitespace trim function to string class
    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
    

    var tableheaders = document.getElementsByTagName('th');
    var knr, gnr, bnr, fnr, snr;

    for (var i = 0; i < tableheaders.length; i++) {
        tableheader = tableheaders[i];
        if (tableheader.textContent == 'Kommune') {
            knr = tableheader.nextSibling.innerHTML.trim();
        }
        if (tableheader.textContent == 'Gnr') {
            gnr = tableheader.nextSibling.innerHTML.trim();
        }
        if (tableheader.textContent == 'Bnr') {
            bnr = tableheader.nextSibling.innerHTML.trim();
        }
        if (tableheader.textContent == 'Fnr') {
            fnr = tableheader.nextSibling.innerHTML.trim();
        }
        if (tableheader.textContent == 'Snr') {
            snr = tableheader.nextSibling.innerHTML.trim();
        }
    }
        
    var url = 
        "http://www.bt.no/eiendom/?mode=matrikkel&cmd=true" +
        "&knr=" + knr +
        "&gnr_matr=" + gnr +
        "&bnr_matr=" + bnr;

    if (snr) { url += "&snr_matr=" + snr; }
    if (fnr) { url += "&fnr_matr=" + fnr; }

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