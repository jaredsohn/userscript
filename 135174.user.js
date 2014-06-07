// ==UserScript==
// @name       Sum number of installs on userscripts.org
// @version    0.2
// @description  Sum number of installs on userscripts.org user's scripts pages
// @include      http://userscripts.org/users/*
// @include      http://www.userscripts.org/users/*
// @include      http://userscripts.org/home/scripts*
// @include      http://www.userscripts.org/home/scripts*
// @copyright  Aviem Zur
// ==/UserScript==

var main = document.getElementById("main");
var sum=0;

var installsA = document.evaluate("//tr[contains(@id,'scripts-')]/td[6]",
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var installsB = document.evaluate("//tr[contains(@id,'scripts-')]/td[5]",
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < installsB.snapshotLength; i++) {
    var sumBak=sum;
    var installs = installsA.snapshotItem(i).innerHTML;
    sum+=parseFloat(installs);
    if (isNaN(sum)) {
        sum = sumBak;
        var installs = installsB.snapshotItem(i).innerHTML;
        sum+=parseFloat(installs);
    }
}

main.innerHTML = "Total Number of Installs: " + sum + main.innerHTML;