// ==UserScript==
// @name            Total Cost for Chrome
// @description     Take the manual work of adding costs of several tickets out.
// @author          Stepan Grigoryan
// @match         https://bloomspot.codebasehq.com/bloomspot/milestones/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
  (function(){
  pointsHash = {};
  $('h4').next().each(function(index, table){
    table = $(table);
    var points = 0;
    $(".summary", table).each(function(i, summary){
      var cost = summary.innerText && summary.innerText.match(/\(cost:\s*(\d)\)/i);
      if(cost){
        points = points + parseInt(cost[1]);
      }
    });
    pointsHash[index] = points;
  });
  $('h4').each(function(index, name){
    name.innerText = name.innerText + " (Total Cost: "+pointsHash[index]+")";
  }); 
})();
}
addJQuery(main);