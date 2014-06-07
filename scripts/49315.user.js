// ==UserScript==
// @name          Show Meaning 
// @namespace     http://www.usturlap.com/gm/userscripts
// @description   Shows a given word's meaning in a specified languge at the top of the page.
// @include       http://dictionary.reference.com/browse*
// @include       http://dictionary.reference.com/search*
// ==/UserScript==

var LANG = "Turkish";
var LANG_LABEL = "Turkcesi";
var NOTFOUND_LABEL = "Bulunamadi!";
var meanings = new Array();
var div = document.getElementById("primary");
var innerDivs = div.getElementsByTagName("div");
for (i=0; i < innerDivs.length; i++) { 
    bodyDiv = innerDivs[i]; 
    if(bodyDiv.getAttribute("class") == "body") {
        str = bodyDiv.innerHTML.replace(/<[^>]+>/g,""); 
        //alert(str);
        var match = str.match(LANG + ": (.*)");
        //alert(match);
        if (match) {
            meanings.push(match[1].replace(/^\s+|\s+$/, ''));
        }
    } 
}

var result = NOTFOUND_LABEL;
if (meanings.length > 0) {
    result = meanings[0];
    for(i=1; i < meanings.length; i++) {
        result += ", " + meanings[i];
    }
    result += ".";
}
//alert(LANG + ": " + result);

// create banner.
var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #FF0000; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    LANG_LABEL + ': ' + result +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin
document.body.style.margin = '0px';



