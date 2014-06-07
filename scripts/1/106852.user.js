// ==UserScript==
// @name World of Tanks statistics improvements
// @description Adds percentage of wins per tanks in player's statistic.
// @namespace wot
// @match http://challenge.worldoftanks.ru/uc/accounts/*
// @match http://uc.worldoftanks.com/uc/accounts/*
// @match http://uc.worldoftanks.eu/uc/accounts/*
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// @include http://uc.worldoftanks.com/uc/accounts/*
// @include http://uc.worldoftanks.eu/uc/accounts/*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main(){
    $(".t-statistic:eq(1) tr:eq(0)").append('<th class=\"right\">%</th>');
    $.each($(".t-statistic:eq(1) tr"), function(){
        if($("td", this).length > 0) {
            var str = parseFloat($("td:nth-child(4)", this).html().replace("&nbsp;", "") / $("td:nth-child(3)", this).html().replace("&nbsp;", "") * 100).toFixed(1) + "%";
            $(this).append("<td class=\"right value\">"+str+"</td>");
        }
    })
};

addJQuery(main);