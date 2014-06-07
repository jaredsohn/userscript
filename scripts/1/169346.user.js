// ==UserScript==
// @name           College Team bar Numbers 
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.1.13
// @include        http://*pigskinempire.com/team.aspx?id=*
// @include 	   http://*pigskinempire.com/proteam.aspx?id=*
// @description    Shows the bar numbers on top of the ars on the teams page.
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
    
    //academics
    var academics = $('#ctl00_CPH1_lblTeamGPA');
    var academics_value = academics.text();
    academics_value = parseFloat(academics_value).toFixed(2);
    academics.css({
        'color':'white', 
        'padding-left': '5px'
    });
    academics.html(academics_value);
    
    //Budget    
    var budget = document.getElementById('ctl00_CPH1_cBudg');
    var budget_value = budget.style.width;
    budget_value = parseInt(budget_value);
    var budget_span = document.createElement('span');
    budget_span.style.color = "white";
    budget_span.innerHTML = budget_value;
    
    budget.appendChild(budget_span);
    
    
    //Talent
    var talent = document.getElementById('ctl00_CPH1_cUnit');
    var talent_value = talent.style.width;
    talent_value = parseInt(talent_value);
    var talent_span = document.createElement("span");
    talent_span.style.color = "white";
    talent_span.innerHTML = talent_value;
    talent.appendChild(talent_span);
    
    //Prestige
    var prestige = document.getElementById('ctl00_CPH1_cPres');
    var prestige_value = prestige.style.width;
    prestige_value = parseInt(prestige_value);
    var prestige_span = document.createElement("span");
    prestige_span.style.color = "white";
    prestige_span.innerHTML = prestige_value;
    prestige.appendChild(prestige_span);
}
 
// load jQuery and execute the main function
addJQuery(main);