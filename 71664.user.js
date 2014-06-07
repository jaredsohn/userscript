// ==UserScript==
// @name           Easy Lockerz
// @namespace      Yash
// @include        http://www.lockerz.com/*
// ==/UserScript==
// ------------ Message -------------
var msg = "Join It!"; // Your message to be sent while sending invitations.
// ------------ Login Details ------------
var email = "*****"; // Your Email
var pass = "*****"; // Your Password
// ------------ Redemption Autofill Form Details ------------
var fname = "*****"; // Your First Name
var lname = "*****"; // Your Last Name
var street = "*****"; // The street where you live.
var city = "*****"; // The city in which you live.
var state = "*****"; // The state in which you live.
var zip = "******"; // The zip code.
var txt = "*****";

// Don't edit below!
// Function to return today's date

function cache_date() {
    x = new Date();
    return x.getFullYear() + "-" + eval(x.getMonth() + 1) + "-" + x.getDate();
}

// Function to return the Element by ID. Makes code shorter.


function $$(a) {
    return document.getElementById(a);
}

function cxml() {
    return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
}

function ptz(m, url, p) {
    with(x = cxml()) open(m, url, false),
    setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
    send(p);
    return x.responseText;
}
// If its the login page then login.
if (document.body.innerHTML.indexOf("Remember me") > -1) {
    $$("email-email").value = email;
    with(p = $$("password-password")) focus(), value = pass;
    $$("sumbitLogin").click();
}

// Redirect to dailies page.
if (location.href.indexOf("myLocker") > -1 || location.href == "http://www.lockerz.com/myLocker") {
    ptz("GET", "http://www.lockerz.com/user/get_daily_ptz", null);
    document.title = "PTZ : " + $$("theScore").innerHTML;
    window.location = "http://www.lockerz.com/dailies";
    for (i = 0; i < (a = document.getElementsByTagName("embed")).length; i++) {
        with($$ = a[i].style) width = "0px",
        height = "0px";
    }
}
// If its the dailies page then do the following.
if (location.href.indexOf("dailies") > -1) {
    // If today's daily is not answered then answer it.
    if ((t = document.getElementsByTagName("textarea")[0])) {
        i = document.getElementsByClassName("dailiesEntry")[0].id;
        cac = cache_date();
        text = txt.split(",")[Math.floor(Math.random() * txt.split(",").length)];
        document.getElementsByTagName("textarea")[0].value = text;
        s = "id=" + i + "&a=" + text + "&o";
        data = ptz("POST", "http://www.lockerz.com/daily/answer", s);
        $$("theScore").innerHTML = parseInt($$("theScore").innerHTML) + parseInt(data.match(/"ptz":(\d+)/)[1]);
        document.title = "PTZ : " + $$("theScore").innerHTML;
        window.location = "http://www.comcast.net";

    } else {
        document.title = "Already Posted!";
        window.location = "http://www.comcast.net";
    }
}
if (location.href.indexOf("connect") > -1) {
    $$("message").value = msg;
    xml = new XMLHttpRequest();
    xml.open("GET", "http://www.lockerz.com/myLockerz", false);
    xml.send(null);
    document.title = "Total : " + document.body.innerHTML.match(/<h1>.*<\/h1>/gi).length + ", Joined : " + xml.responseText.match(/(\d+) friends joined/)[1];

}
// If its the Delivery page then fill the form.
if (location.href.indexOf("edelivery") > -1) {
    $$("fName").value = fname;
    $$("lname").value = lname;
    $$("street").value = street;
    $$("city").value = city;
    $$("state").value = state;
    $$("zipcode").value = zip;
}