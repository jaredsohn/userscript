// ==UserScript==
// @name           Realtor.ca Show Square Footage
// @namespace      http://martin.drashkov.com
// @description    Shows the total square footage of a property listing, including price per square foot
// @include        http://www.realtor.ca/propertyDetails.aspx*
// ==/UserScript==

var gd = document.getElementsByClassName('PropDetailsRemarksText')[0];
var tds = document.getElementsByClassName('PropDetailsSpecValue');
var total = 0;

for (var i = 0; i <tds.length; i++) {

    var regmatch = tds[i].innerHTML.match(/(\d+\.\d+)/ig);
    
    if (regmatch != null && regmatch.length == 2 && !tds[i].innerHTML.match("FT")) {
        total += regmatch[0]*regmatch[1];
    }
}


var spans = document.getElementsByTagName('span');
var price = 0;
for (var j = 0; spans.length; j++) {
    if (spans[j].innerHTML.match("For Sale")) {
        price = parseInt(spans[j].innerHTML.match(/(\d+,\d+)/i)[0].replace(",", ""));
        break;
    }
}

var sqft = total*10.7639104;

gd.innerHTML += "<br/>"+
    Math.round(total)+" m²<br/>"+
    "$"+Math.round(price/total)+"/m²<br/>"+
    Math.round(sqft)+" ft²<br/>"+
    "$"+Math.round(price/sqft)+"/ft²<br/>"
