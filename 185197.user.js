// ==UserScript==
// @name       Buttcoin
// @require    http://code.jquery.com/jquery-1.10.2.min.js
// @require	   http://cdnjs.cloudflare.com/ajax/libs/bignumber.js/1.3.0/bignumber.min.js
// @namespace  http://cattes.us/
// @version    0.1
// @description  Displays wallet value on directory.io
// @match      *://directory.io/*
// @copyright  2013, elgruntox
// ==/UserScript==

console.log("= BUTTCOIN ACTIVATED =");

function getRandomArbitary (min, max) {
    var min = BigNumber(min);
    var max = BigNumber(max);
    return Math.random() * max.minus(min) + min;
}

$("a[href^='https://blockchain.info']").each(function(i) {
    var link = $(this);
    var addy = link.text();
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://blockexplorer.com/q/addressbalance/' + addy,
        onload: function(response) {
        	//console.log(response);
            var data = response.response;
            if (parseInt(data) > 0) {
                alert("YOU FOUND SOME FUCKING BITCOINS!!!! " + link.text());
            };
            link.text(addy + " (" + data + ")");
        }
    });
});

var rand = new BigNumber(getRandomArbitary('1', '904625697166532776746648320380374280103671755200316906558262375061821325312')).toString().replace(/[a-z, ]/gi,'').replace(".", "").replace("+", "");
var rand = "<a href='http://directory.io/" + rand + "'>SPIN THE BITCOIN WHEEL BABY</a><br \><br \>";
$(".keys").prepend(rand);
$(".keys").append(rand);