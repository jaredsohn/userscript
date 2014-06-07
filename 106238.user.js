// ==UserScript==
// @name HQHQHQHQHQHQHQH
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==
var tmpCnt =    getCountdown({
        enddate: 1309973450,
        currentdate: 1309973450,
        el: "cityCountdown"
        });
    tmpCnt.subscribe("finished", function() {
        top.document.title = "إيكاريام Ikariam" + " - عالم Alpha";
        setTimeout(function() {
        location.href="?view=city&id=717892";
            },2000);
        });