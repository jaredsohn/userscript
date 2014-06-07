// My Yahoo Maps Link
// version 0.1 BETA
// 2005-05-28
// Copyright (c) 2005 Josh Staiger, josh@joshstaiger.org
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "My Yahoo Maps Link", and click Uninstall.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Adds a Yahoo! Maps link to the My Yahoo! nav bar.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          My Yahoo Maps Link
// @namespace     http://joshstaiger.org/projects/myyahoomapslink
// @description	  Adds a Yahoo! Maps link to the My Yahoo nav bar.
// @include       http://my.yahoo.com/
// @include       http://my.yahoo.com/index.html
// @include       https://my.secure.yahoo.com/
// @include       https://my.secure.yahoo.com/index.html
// ==/UserScript==


// Simplify XPath calls

function xpath(query, node) {
    return document.evaluate(query, node, null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add maps icon link

function addMapsLink() {

    addMapsIcon();
    addMapsText();

}


// Add linked maps globe icon

function addMapsIcon() {

    var ygmaDiv = document.getElementById('ygma');

    if (!ygmaDiv) {return;}
    
    var moreIconTd = xpath('//td[a/img[@alt="See more Yahoo!"]]', ygmaDiv).snapshotItem(0);
    
    if (!moreIconTd) {return;}

    var mapsIconTd = document.createElement('td');
    mapsIconTd.setAttribute('class', 'ymicon');
    mapsIconTd.setAttribute('align', 'center');

    mapsIconTd.innerHTML = '<a href="http://maps.yahoo.com"><img src="' + getMapsIconSrc() + '" alt="Yahoo! Maps" height="36" width="36" /></a>';

    moreIconTd.parentNode.insertBefore(mapsIconTd, moreIconTd);  
}

// Data encoded Maps icon

function getMapsIconSrc() {
    var mapsIconSrc = 'data:image/gif,GIF89a%24%00%24%00%D5%3F%00%ACKr%8E%CE%8Ef%A3%CA%B9j%8Ei%D5v%91%E9q%2C%8A%BA%ADNV%91%D7%AAU%CAn%92%87%A5%D2%D0%D4%FC%FD%FD%E3%E3%E3%95%E0%91s%E4m%F5%FCR%D6%9B%8F%CC%A3%B7%B0Q%13R%A7%B6%D8%B7%C5%9E%C5%DD%94%BC%D6x%C9%A8z%D9%83%D5%90k%40%BFk%D5z2%C8%DB%E9%B9bw%1B%8E%B6%EA%EA%EAI%BD%81%C0%87%A1%18%A5%B9%A6%E7x%CF%EEgt%CC%82%E7%CF%DAk%D3%8Bc%C6%7Cz%D4%9B%B9_E%83%DFu%1C%80%B9Z%C1%A9c%B5%B5%40%B0%B3%A7%E7%88%F3%EF%F2G%98%BE%C3o%3C%ED%E4%EAZ%C1%90%F2%E7%ED%E4%DE%E5%3C%B6%7F%BF%83h%D2%E2%EC%CC%AD%91%7B%A7%C8%DC%DC%DC%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%24%00%24%00%00%06%FF%C0%9FpH%2C%1A%8F%C8%A4r%C9D%9E%06%80Ss%3A%AC%88%00%AB%C3%80%3A%AD%60W%00%C0%E0%D4%B9%98%B9%C7%CA%40w%90%9CN%00%83%7CFo%09%3A%E8%9FZ%E3%A9%C9%16%3D%2F%08%83%18%180%14%1F-%17h%03%11%7D7%023%24%01.6%19%0E%0E%08.%2F--%3DTjc23%14%25%01%19(%97%19%97%0E%18%89%06%16S%8D%12%20%3D%06%25%26(%26%26%19%04%0F%0F%2C1*.%23%23%06M%12%03%222%15%06%01%259%BC%09%09%BF%2C%24%2C%0E%C3%C6%B1J%20%B38%B6%10%01%26)%26%D4%0F%05%24%BF%97*0%1F%02%DD%3E%8D\'5%02%14%1069%1B%09%2C%E8%05%BF%0F%08%60%22%D6%22I%03%1F%F2%22%C8%F0!%00%03%84%14%FA6%B0(%F0%EF%C1%B4%04%97%0868%02%02aB%06%3Ef%04%80%60%22%04%81%02%13-nXY%0E%01%86%11-%7C%800%E21%E1%C2%19%2F%20%90%20%97%40%22%81%FF%95%1Bv%85P%81%60%C4%0C%84E%0Ez%9C%D7%20%12%84%12%BD%00%16%D8%97%01%A2%8DB%9E%10n%1CR3!%AD%0B%06%1C%40%88%91A*%0B%16%09r%E4%40%81%00F%8B%05%1E%87t%AC%D9h%80%8C%06%06%EEAp%90a%22%09%8A%04r%D8%18%F4%AE%E6%CC%1FJ%3D%26%A3!%01%07%D8%9110%B1%20%A0jp%5B%03p%3Dn%ED%8Ap%C0%0A%0F\'j9%C3%80%C0%01%8A%D3%97%5C%CAQ%E0%A1%AB%10%CE%3E%16%83%C6a%A1%85%A0A%B8%11%BC0%20%60%80%16%D7%3F%60%C7%06%40%03%40%05%06%20%2C%D0%A1%C0%7C%06%2C%05X%00H%00.%7C8%8D%15%03*%F8a%C0%40%C6%8E%0EWV%80%99%0E%3C1%E7%0A%1E%0E%5C%3F%10%06%0A%80%03%E2%C5d%AE%B9u%AE%F0%05%22%3C%60%A1q%7D%BD%98%0A%C2%1D%16%5Cu%1E%5D%01%80~a%880%1FlD%98%07%5Bv%12h%C0%C0%04%22%0C%E0%01y%B0m%C5Uu%12x%20Y%E1%84%13L%A0%83%07%1E%2CX%93%11%F6qfa%23%11%B4%18%01%144%88%00%9B%80%0D%0A%97%DE%81%24%E6x%00%072v%A5!%8A%B0%E9%F0%DE%01D%16I%24%80%86-%91%A2G%3C%E80%81%91%2B%E8%60%22%8DJ8H%A0fyX)%DC%8Fy%C8%00%82%95%0D%80%20%03%13A%00%00%3B';
    
    return mapsIconSrc;
    
}


// Add linked maps text

function addMapsText() {

    var ygmaDiv = document.getElementById('ygma');

    if (!ygmaDiv) {return;}

    var moreTextTd = xpath('//td[starts-with(a, "More")]', ygmaDiv).snapshotItem(0);
    
    if (!moreTextTd) {return;}

    var mapsTextTd = document.createElement('td');

    mapsTextTd.setAttribute('align', 'center');
    mapsTextTd.innerHTML = '<a href="http://maps.yahoo.com">Maps</a>';
    moreTextTd.parentNode.insertBefore(mapsTextTd, moreTextTd);
}


addMapsLink();
