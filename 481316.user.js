// ==UserScript==
// @name       Flappy2048 Helper
// @namespace  http://ethaizone.com/
// @version    0.1
// @description  Hide block that our bird should go to it.
// @match      http://flappy2048.com/
// @copyright  2012+, EThaiZone
// ==/UserScript==


var oldNumber = 0;
setInterval(function () {
    var e = document.querySelectorAll("div.cellol > div");
    var t = 0;
    Array.prototype.forEach.call(e, function (e, n) {
        t = e.parentNode.textContent
    });
    var n = document.querySelectorAll("div.cellol");
    Array.prototype.forEach.call(n, function (e, t) {
        if (e.innerHTML == oldNumber && !e.querySelector("div")) {
            e.style.display = ""
        }
    });
    var n = document.querySelectorAll("div.cellol");
    Array.prototype.forEach.call(n, function (e, n) {
        if (e.innerHTML == t && !e.querySelector("div")) {
            e.style.display = "none"
        }
    });
    if (oldNumber != t) {
        oldNumber = t
    }
}, 1e3);
console.log("Made by ethaizone.com")
