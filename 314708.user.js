// ==UserScript==
// @name       Wing's EH AutoWatch
// @namespace  http://blog.wingao.me
// @version    0.1
// @description  enter something useful
// @include http://g.e-hentai.org/g/*
// @copyright  2014, wing
// ==/UserScript==

function main() {
    var btn = document.createElement("button");
    btn.textContent = "EHR";
    btn.onclick = function () {
        document.location.href = "http://127.0.0.1:8000/ehr/g/" + document.location.href;
    };
    document.getElementById("gdc").appendChild(btn);
}

main();