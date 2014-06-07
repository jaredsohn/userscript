// ==UserScript==
// @name        COE Home
// @namespace   coe_tool
// @include     http*://dev-wued002/COE/Home.aspx*
// @version     0.0.9
// @updateUrl   https://userscripts.org/scripts/source/178231.meta.js
// @downloadUrl https://userscripts.org/scripts/source/178231.user.js
// @grant       none
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{
var oldURL = document.referrer;

setTimeout(function(){location.reload();},2*60*60000);
//alert (oldURL.toLowerCase());
    if(oldURL.toLowerCase().indexOf('dev-wued002/coe/login.aspx')>=0){
    //if(!confirm('refreshnout?')){return false;}
    var val = "15", sel = document.getElementById("ddlCountry");
    for(var i, j = 0; i = sel.options[j]; j++) {
        if(i.value == val) {
            sel.selectedIndex = j;
            break;
        }
    }
   document.evaluate("//input[@value='Search' and @type='submit' and contains(@class, 'yellowbutton-Search')]", document, null, 9, null).singleNodeValue.click();

}
}