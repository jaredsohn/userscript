// ==UserScript==
// @name       SuchCoins Local Time
// @namespace  https://www.suchcoins.com/
// @version    0.1
// @description  Changes SuchCoins Transaction times to local time
// @match      https://www.suchcoins.com/index.php?page=account&action=transactions
// @copyright  2014, Mataniko
// ==/UserScript==
 
var times = $('article.width_3_quarter .tablesorter tr td:nth-child(2)');
times.each(function(index,value) { 
    var date = new Date($(value).text());
    date.setHours(date.getHours()-1);
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()));
    $(times[index]).text(utcDate.toLocaleString());
});