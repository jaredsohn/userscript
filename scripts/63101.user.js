// ==UserScript==
// @name           Easy Lockerz
// @namespace      Akshay
// @include        http://www.lockerz.com/*
// ==/UserScript==
var email = ""; // Your Email
var pass = ""; // Your Password
function cache_date() {
    x = new Date();
    return x.getFullYear() + "-" + eval(x.getMonth() + 1) + "-" + x.getDate();
}



function $(a) {
    return document.getElementById(a);
}

if (document.body.innerHTML.indexOf("Remember me") > -1) {
    $("edit-name").value = email;
    $("edit-pass").value = pass;
    $("edit-submit").click();
}
if (location.href.indexOf("myLockerz") > -1) {
    window.location = "http://www.lockerz.com/dailies";
    document.title = "PTZ : " + $("theScore").innerHTML;
}
if (location.href.indexOf("dailies") > -1) {
    if ((t = document.getElementsByTagName("textarea")[0])) {
        i = t.id;
        text = Math.random();
        date = document.getElementsByTagName("h1")[0].innerHTML;
        cac = cache_date();

        xml = new XMLHttpRequest();
        xml.open("POST", "http://www.lockerz.com/check_bad_words", false);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send("id=" + i + "&text=" + text + "&date=" + date + "&cache_date=" + cacdate);

        xml = new XMLHttpRequest();
        xml.open("POST", "http://www.lockerz.com/add_free", false);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send("id=" + i + "&text=" + text + "&date=" + date + "&cache_date=" + cacdate);

        xml = new XMLHttpRequest();
        xml.open("GET", "http://www.lockerz.com/getptz", false);
        xml.send(null);
        $("theScore").innerHTML = xml.responseText;
    }
}