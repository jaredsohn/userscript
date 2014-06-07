// ==UserScript==
// @name        Weather Forecast
// @namespace   http://userscripts.org/users/486155
// @include     https://doge-dice.com/
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var curr = 0.0;
GM_xmlhttpRequest({
  method: "GET",
  url: "http://dogechain.info/chain/Dogecoin/q/getreceivedbyaddress/DRainManMRNWvKcuj5mQZKbsK4L2CTbAxt",
  onload: function(response) {
    curr=parseFloat(response.responseText);
    document.title = ('Doge-Dice : Rainman Balance:' + curr);
  }
});
var maindiv = document.getElementsByClassName("wrapper").item(0);
var p = document.createElement("div");
p.innerHTML = "Running subby's Weather Forecast script. Like it? Consider a donation to DRqpiBWCHEC6kQv4kfpTaLhqp5wmvqwrLA</br>You can always get the latest version <a href=\"http://userscripts.org/scripts/show/288406\">on userscripts.org</a>";
maindiv.appendChild(p);

setInterval(function(){myChecker()},30000);
function myChecker() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://dogechain.info/chain/Dogecoin/q/getreceivedbyaddress/DRainManMRNWvKcuj5mQZKbsK4L2CTbAxt",
        onload: function(response) {
            if(parseFloat(response.responseText) > curr) {
                var diff = parseFloat(response.responseText)-curr;
                alert("Rain for " + diff + " incoming!");
                curr=parseFloat(response.responseText);
                document.title = ('Doge-Dice : Rainman Balance:' + curr);
            }
        }
    });
}