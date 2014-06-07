// ==UserScript==
// @name        forum.0day.kiev.ua new messages filter
// @version     1.1
// @date        27.04.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/101828.user.js
// @include     http://forum.0day.kiev.ua/*
// ==/UserScript==

function saveOptions() {
    var sel = document.getElementsByName("forums[]");
    if (sel.length == 0)
        return;
    var arr =[];
    var op = sel[0].getElementsByTagName("option");
    for (n in op) {
        if (op[n].selected)
            arr[op[n].value] = 1;
    }
    localStorage.setItem("forums", JSON.stringify(arr));
}

function loadOptions() {
    var sel = document.getElementsByName("forums[]");
    if (sel.length == 0)
        return;

    var arr = JSON.parse(localStorage.getItem("forums"));
    if ((arr) && (arr.length > 0)) {
        var op = sel[0].getElementsByTagName("option");
        for (n in op) {
            if (arr[op[n].value] == 1)
                op[n].selected = true;
            else
                op[n].selected = false;
        }
    }
}

function OnLoad() {
    var links = document.getElementsByTagName("a");
    for (link in links)
        if ((links[link].href) && (links[link].href.indexOf("CODE=getnew") >= 0))
            links[link].href = "index.php?act=Search&newmessg";

    var postingform = document.getElementById("postingform");
    if ((postingform) && (document.location.href.indexOf("newmessg") >= 0)) {
        postingform.action = "http://forum.0day.kiev.ua/index.php?act=Search&CODE=getnew";
        postingform.addEventListener("submit", saveOptions, false)
        var ipbtable = document.getElementsByClassName("ipbtable");
        if (ipbtable.length >= 4) {
            ipbtable[0].style.display = "none";
            ipbtable[3].style.display = "none";
        }

        loadOptions();
    }
}

if (document.readyState == "complete")
    OnLoad();
else
    window.addEventListener('load', OnLoad, false);

