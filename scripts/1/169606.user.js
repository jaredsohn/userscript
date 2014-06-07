// ==UserScript==
// @name           Salary Cap Numbers 
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.2.13
// @include        http://pigskinempire.com/proteam.aspx?id=*
// @description    Salary Cap stuff
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
    
    var sal_table = document.createElement('table');

    sal_table.setAttribute('class','gridTbl');
    sal_table.setAttribute('border','0');
    sal_table.style.width = '100%';
    sal_table.style.marginTop = '8px';
    
    
    //ctl00_CPH1_lblSalaryCap - Salary Cap ID
    // Current Salary - ctl00_CPH1_lblCurrentSalary
    // Available - ctl00_CPH1_lblAvailable

    var html = "<tbody><tr class='genTtl'><th colspan='5'>Salary Cap</th></tr><tr class='genHd'>";
    html += "<td class='genHd' style='width:20%'>Cap</td>";
    html += "<td class='genHd' style='width:20%'>Current</td>";
    html += "<td class='genHd' style='width:20%'>Offers</td>";
    html += "<td class='genHd' style='width:20%'>Hits</td>";
    html += "<td class='genHd' style='width:20%'>Avail</td>";
    html += "</tr>";

    html += "<tr><td class='genA' id='sal_cap'></td>";
    html += "<td class='genA' id='team_current'></td>";
    html += "<td class='genA' id='current_offers'></td>";
    html += "<td class='genA' id='cap_hits'></td>";
    html += "<td class='genA' id='avail_cap'></td>";
    html +=  "</tr></tbody>";

    sal_table.innerHTML = html;
    
    var appender = document.getElementById('ctl00_CPH1_tblQkLeaders');
    $(sal_table).insertAfter(appender);
    
    $('#sal_cap').load('/contracts.aspx #ctl00_CPH1_lblSalaryCap');
    $('#team_current').load('/contracts.aspx #ctl00_CPH1_lblCurrentSalary');
    $('#current_offers').load('/contracts.aspx #ctl00_CPH1_lblOffers');
    $('#cap_hits').load('/contracts.aspx #ctl00_CPH1_lnkCapHits');
    $('#avail_cap').load('/contracts.aspx #ctl00_CPH1_lblAvailable');
    
}
 
// load jQuery and execute the main function
addJQuery(main);