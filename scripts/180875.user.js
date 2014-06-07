// ==UserScript==
// @name       SalesForce UI enhancements
// @namespace  http://www.paymill.com
// @version    0.6
// @description  SalesForce UI enhancements
// @match      https://eu2.salesforce.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// @copyright  2013+, Klaus Glückert, PAYMILL.com
// ==/UserScript==

$(document).ready(function()
{
//change background color of editable fields to light green
$("td.inlineEditWrite").css({"background-color": "#d9ead3"});
$("#acc2_ilecell").css({"background-color": "#ffffff"});
$("#j_id0:j_id1:j_id2:j_id24:theButton").css({"display": "none"});

    
//flag key Account as red
if (document.getElementById('00Nb0000007iDnd_chkbox').getAttribute('title') == "Checked") { 
    $("#00Nb0000007iDnd_ileinner").css({"background-color": "red"});
}   


//function increase size of inline edit
function adding(jNode) {
$("select[multiple]").css({"height": "500px"}); 
}

 
// execute function increase multipicklist
if ($("#00Nb0000002IgGU_ileinner").length > 0){
waitForKeyElements ("select[multiple]", adding);
}
   
    
    
});