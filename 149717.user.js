// ==UserScript==
// @name        VCDQ - Nzbindex + Binsearch + Torrentz.eu
// @namespace   Gentox
// @description Adds a "U" and "T" button to a release's line on the main page, and the release's page itself, on VCDQ.com - Search for releases on usenet (via Nzbindex.nl, Binsearch.info) or torrents (via Torrentz.eu, UnblockedPirateBay.com) - Based on the script by PutterPlace *http://userscripts.org/scripts/show/148980* and Dink *http://userscripts.org/scripts/show/7083* 
// @include     http://www.vcdq.com/*
// @version     1.0
// @grant       none
// ==/UserScript==


var uicon = "data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%00%00%00%FF%FF%FF%3FA%3Fx%7Bx%92%95%92%5C%5E%5C%05%06%00%07%08%00%1A%1C%05%EC%F2%AB%EA%F0%AB%E4%E9%AB%F2%F7%BB%ED%F2%BA%EC%F1%BB%E9%ED%BA%1D%1F%05%F8%FE%94%F4%FA%93%E9%EE%94%F7%FD%AA%F7%FC%AB%F5%FA%AA%D3%DA%00%CA%D1%00%BF%C6%00%BE%C5%00rv%00lp%00X%5C%00X%5B%00VY%00SV%00RU%0068%00%1C%1D%00%17%18%00%18%19%01%F5%FD%0C%F6%FE%0D%DC%E3%0D%F7%FF%0F%F6%FF%24%F2%FA%24%F7%FF%26%F7%FF'%F7%FF)%D6%DC%24%F7%FE%3F%F8%FFA%EB%F1%3F%F5%FD%5D%F7%FF_%EC%F3%5C%F8%FDx%F7%FE%7B%EE%F2x%C8%CE%00%BC%C2%00%9B%A0%00%96%9A%00%95%99%00jm%00_a%00%5C%5E%00%EB%F1%0C%E5%EB%24%17%17%00%03%03%00%02%02%00%19%19%05%15%15%06%2C)%0073%05-'%07%05%05%05%04%04%04%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00M%00%2C%00%00%00%00%0C%00%0C%00%00%07%7F%80M%82L%08II%10L%82%8A%06%1E%3C%1A%3A%3D%40%07%8AD%1C%0E%0C%98%0D%0F%1B%06MK%1E%0A%16%14%15%15%16%09%0B%3F%00F%3C%12%11%04%A4%04%12%13%3C%23J967%037%B978%3A%22J%1834%054%C445%19%22G%3D01%02%D0%0202%3C%24K%20B%2C-..*%2B%2F%1D%00ME%3EA)''%26(%1CD%94!%3B%17%17%3B%1F%9D%8AM%00CHH%25%E2%82%81%00%3B";
var nicon = "data:image/gif,GIF89a%0C%00%0C%00%E3%0C%00%1A%1C%05%1A%1C%8E%1A%1C%FF.4%3DR%5Cn%1Ad%FF%1A%8D%FFq%80%98%1A%96%FF%1A%A0%FF%1A%AF%FF%1A%BE%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%0C%00%0C%00%00%04A%F0I%40%AB%BC%20%88RD%00X%B0%8C%E4%F7dd%BA%7C%80%A0(%C7%1B%2B%02U%24%09A%E4xa%23%88AP%88%F0%B5%0C%06%00Ri%A8e%0A%C8%A8%A1%60zJ%A9%A0%89%86%E3%C9b*%94K%04%00%3B";
var ticon = "data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%00%00%00%FF%FF%FF%3F%3FAxx%7B%92%92%95%5C%5C%5E%00%04%05%00%06%07%B0%E0%E4%BF%EE%F2%BE%E9%ED%BF%E9%ED%02%15%16%03%16%17%07%19%1A%B0%F2%F6%B0%E8%EC%B0%E6%EA%BE%E6%E9%06MO%06LN%02%19%1A%0F%B2%B6%0F%B1%B5%07SU%07RT%07PR5%E9%EE4%E4%E9%07%1C%1DN%EB%EFP%EC%F0M%DF%E3i%EB%F0k%ED%F2h%E3%E7%82%EF%F2%85%EF%F4%9C%F1%F5%9B%EE%F2%9B%E4%E7%B1%F2%F5%B0%F0%F3%0C%90%93%08cd%07XY%07UV%0423%11%C5%C9%10%BC%C0%10%BB%BE%0F%B0%B3%0C%8C%8E%0C%8B%8D%09km%09eg%1F%E6%EA%20%E7%EB%1E%DC%DF%1D%CE%D2%22%E8%EC7%EA%EE3%D8%DB8%EA%EE2%CA%CD%81%E6%E8%00%03%03%00%02%02%02%15%15%06%17%17%07%14%14%03(%25%093%2F%0A*%24%05%05%05%04%04%04%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00L%00%2C%00%00%00%00%0C%00%0C%00%00%07%7F%80L%82K%0EHH%1DK%82%8A%06%194%1735.%07%8AB7%0B%09%98%0A%126%06LJ%19%11*%0F))*%10%08-%00E4'%26%04%AF%04'(4%15I2%24%25%03%BA%03%25A3%2FI1!%22%22%05%05%C4%23%16%2FF5%1E%1F%1F%02%02%1E%1E%204%0CJ%13%3E%3D%3F%D1%1B%1C%40%18%00LC%2C%3A%3C998%3B7B%94%14%2B00%2B%1A%9D%8AL%00DGG%0D%E2%82%81%00%3B";
var picon = "data:image/gif,GIF89a%0C%00%0C%00%E3%0E%00%1A%1C%05.4%3D%1AI%058%3FK%1A%5E%05%1A%7B%05U%60s%1A%97%05%1A%A0%05q%80%99%1A%AF%05%1A%B9%05%1A%C8%05%1A%D7%05%FF%FF%FF%FF%FF%FF!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%0C%00%0C%00%00%04E%F0I%40%AB%BC%40%90R%88%00%98P4dS%7CO6%96%E4I%11%0C%93%CCILP%C5%B2%18%3A%BF%148%85b%40%1C%08%81%00%02%02%11X%3Ao%AAC%E0%40%3D%B8R%A2%AA%155%D1p%3C%A0K%AAB%B9D%00%00%3B";
//VCDQ
//<td class="titleField">
if(document.location.href.indexOf('vcdq.com') > -1)
{
    var releases = document.evaluate('//td[@class="titleField"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var releasepage = document.evaluate('//dd[contains(@id, "title-")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    function addLinks(link)
    {
        thelink = link.getElementsByTagName("a").item(0);
        fulltitle = thelink.innerHTML;
        searchurl = 'http://binsearch.info/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        searchurl2 = 'http://www.nzbindex.nl/search/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        torrenturl = 'http://torrentz.eu/search?f=$1'.replace("$1", encodeURIComponent(fulltitle));
        torrenturl2 = 'http://unblockedpiratebay.com/index.php?loadurl=/search/$1'.replace("$1", encodeURIComponent(fulltitle));
        var newTD = document.createElement("td");
        unlink = document.createElement("a");
        unlink.href = searchurl;
        unlink.setAttribute("target","_blank");
        unlink.innerHTML = "<img title='Search binsearch.info for " + fulltitle + "' src=" + uicon + " border='0'>";
        unlink2 = document.createElement("a");
        unlink2.href = searchurl2;
        unlink2.setAttribute("target","_blank");
        unlink2.innerHTML = "<img title='Search nzbindex.nl for " + fulltitle + "' src=" + nicon + " border='0'>";
        torlink = document.createElement("a");
        torlink.href = torrenturl;
        torlink.setAttribute("target","_blank");
        torlink.innerHTML = "<img title='Search torrentz.eu for " + fulltitle + "' src=" + ticon + " border='0'>";
        torlink2 = document.createElement("a");
        torlink2.href = torrenturl;
        torlink2.setAttribute("target","_blank");
        torlink2.innerHTML = "<img title='Search unblockedpiratebay.com for " + fulltitle + "' src=" + picon + " border='0'>";
        newTD.appendChild(unlink2);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(unlink);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(torlink);
        newTD.appendChild(torlink2);
        link.innerHTML += newTD.innerHTML;
    }

    function addSingleLinks(link)
    {
        if(link.innerText !== undefined)
            fulltitle = link.innerText;
        else
            fulltitle = link.textContent;
        searchurl = 'http://binsearch.info/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        searchurl = 'http://www.nzbindex.nl/search/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        torrenturl = 'http://torrentz.eu/search?f=$1'.replace("$1", encodeURIComponent(fulltitle));
        torrenturl2 = 'http://unblockedpiratebay.com/index.php?loadurl=/search/$1'.replace("$1", encodeURIComponent(fulltitle));
        var newTD = document.createElement("td");
        unlink = document.createElement("a");
        unlink.href = searchurl;
        unlink.setAttribute("target","_blank");
        unlink.innerHTML = "<img title='Search binsearch.info for " + fulltitle + "' src=" + uicon + " border='0'>";
        unlink2 = document.createElement("a");
        unlink2.href = searchurl2;
        unlink2.setAttribute("target","_blank");
        unlink2.innerHTML = "<img title='Search nzbindex.nl for " + fulltitle + "' src=" + nicon + " border='0'>";
        torlink = document.createElement("a");
        torlink.href = torrenturl;
        torlink.setAttribute("target","_blank");
        torlink.innerHTML = "<img title='Search torrentz.eu for " + fulltitle + "' src=" + ticon + " border='0'>";
        torlink2 = document.createElement("a");
        torlink2.href = torrenturl;
        torlink2.setAttribute("target","_blank");
        torlink2.innerHTML = "<img title='Search unblockedpiratebay.com for " + fulltitle + "' src=" + picon + " border='0'>";
        newTD.appendChild(unlink2);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(unlink);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(torlink);
        newTD.appendChild(torlink2);
        link.innerHTML += newTD.innerHTML;
    }

    function addDoubleLinks(link)
    {
        if(link.innerText !== undefined)
            fulltitle = link.innerText;
        else
            fulltitle = link.textContent;
        searchurl = 'http://binsearch.info/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        searchurl = 'http://www.nzbindex.nl/search/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        torrenturl = 'http://torrentz.eu/search?f=$1'.replace("$1", encodeURIComponent(fulltitle));
        torrenturl2 = 'http://unblockedpiratebay.com/index.php?loadurl=/search/$1'.replace("$1", encodeURIComponent(fulltitle));
        var newTD = document.createElement("td");
        unlink = document.createElement("a");
        unlink.href = searchurl;
        unlink.setAttribute("target","_blank");
        unlink.innerHTML = "<img title='Search binsearch.info for " + fulltitle + "' src=" + uicon + " border='0'>";
        unlink2 = document.createElement("a");
        unlink2.href = searchurl2;
        unlink2.setAttribute("target","_blank");
        unlink2.innerHTML = "<img title='Search nzbindex.nl for " + fulltitle + "' src=" + nicon + " border='0'>";
        torlink = document.createElement("a");
        torlink.href = torrenturl;
        torlink.setAttribute("target","_blank");
        torlink.innerHTML = "<img title='Search torrentz.eu for " + fulltitle + "' src=" + ticon + " border='0'>";
        torlink2 = document.createElement("a");
        torlink2.href = torrenturl;
        torlink2.setAttribute("target","_blank");
        torlink2.innerHTML = "<img title='Search unblockedpiratebay.com for " + fulltitle + "' src=" + picon + " border='0'>";
        newTD.appendChild(unlink2);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(unlink);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(torlink);
        newTD.appendChild(torlink2);
        link.innerHTML += newTD.innerHTML;
    }
    
    function addTripleLinks(link)
    {
        if(link.innerText !== undefined)
            fulltitle = link.innerText;
        else
            fulltitle = link.textContent;
        searchurl = 'http://binsearch.info/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        searchurl = 'http://www.nzbindex.nl/search/?q=$1&max=100&adv_age=365&server='.replace("$1", encodeURIComponent(fulltitle));
        torrenturl = 'http://torrentz.eu/search?f=$1'.replace("$1", encodeURIComponent(fulltitle));
        torrenturl2 = 'http://unblockedpiratebay.com/index.php?loadurl=/search/$1'.replace("$1", encodeURIComponent(fulltitle));
        var newTD = document.createElement("td");
        unlink = document.createElement("a");
        unlink.href = searchurl;
        unlink.setAttribute("target","_blank");
        unlink.innerHTML = "<img title='Search binsearch.info for " + fulltitle + "' src=" + uicon + " border='0'>";
        unlink2 = document.createElement("a");
        unlink2.href = searchurl2;
        unlink2.setAttribute("target","_blank");
        unlink2.innerHTML = "<img title='Search nzbindex.nl for " + fulltitle + "' src=" + nicon + " border='0'>";
        torlink = document.createElement("a");
        torlink.href = torrenturl;
        torlink.setAttribute("target","_blank");
        torlink.innerHTML = "<img title='Search torrentz.eu for " + fulltitle + "' src=" + ticon + " border='0'>";
        torlink2 = document.createElement("a");
        torlink2.href = torrenturl;
        torlink2.setAttribute("target","_blank");
        torlink2.innerHTML = "<img title='Search unblockedpiratebay.com for " + fulltitle + "' src=" + picon + " border='0'>";
        newTD.appendChild(unlink2);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(unlink);
        newTD.appendChild(document.createTextNode(' '));
        newTD.appendChild(torlink);
        newTD.appendChild(torlink2);
        link.innerHTML += newTD.innerHTML;
    }
    
    if(releases.snapshotLength > 0)
    {
        for (var i=0; i<releases.snapshotLength; i++)
            addLinks(releases.snapshotItem(i));
    }

    if(releasepage.snapshotLength > 0)
    {
        for (var i=0; i<releasepage.snapshotLength; i++)
            addSingleLinks(releasepage.snapshotItem(i));
    }
}