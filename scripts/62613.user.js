// ==UserScript==
// @name           Easy Lockerz
// @namespace      MohitC
// @include        http://www.lockerz.com/*
// ==/UserScript==


// ------------ Login Details ------------
var email = ""; // Your Email
var pass = ""; // Your Password

// ------------ Redemption Autofill Form Details ------------
var fname = ""; // Your First Name
var lname = ""; // Your Last Name
var street = ""; // The street where you live.
var city = ""; // The city in which you live.
var state = ""; // The state in which you live.
var zip = ""; // The zip code.

// Don't edit below!
// Function to return today's date
function cache_date() {
    x = new Date();
    return x.getFullYear() + "-" + eval(x.getMonth() + 1) + "-" + x.getDate();
}

// Function to return the Element by ID. Makes code shorter.
function $(a) {
    return document.getElementById(a);
}

// If its the login page then login.
if (document.body.innerHTML.indexOf("Remember me") > -1) {
    $("edit-name").value = email;
    $("edit-pass").value = pass;
    $("edit-submit").click();
}

// Redirect to dailies page.
if (location.href.indexOf("myLockerz") > -1) {
    window.location = "http://www.lockerz.com/dailies";
    document.title = "PTZ : " + $("theScore").innerHTML;
}

// If its the dailies page then do the following.
if (location.href.indexOf("dailies") > -1) {
    // If today's daily is not answered then answer it.
    if ((t = document.getElementsByTagName("textarea")[0])) {
        if (GM_getValue("dailie", "1")
        i = t.id;
        date = document.getElementsByTagName("h1")[0].innerHTML;
        cac = cache_date();
        text = String(new Date()).match(/[\d:]{8}/)[0];
        i.value = text;
        s = "id=" + i + "&text=" + text + "&date=" + date + "&cache_date=" + cac;

        xml = new XMLHttpRequest();
        xml.open("POST", "http://www.lockerz.com/check_bad_words", false);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send(s);

        xml = new XMLHttpRequest();
        xml.open("POST", "http://www.lockerz.com/add_free", false);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send(s);

        xml = new XMLHttpRequest();
        xml.open("GET", "http://www.lockerz.com/getptz", false);
        xml.send(null);
        $("theScore").innerHTML = xml.responseText;
        document.title = "PTZ : " + $("theScore").innerHTML;
        window.location = "http://www.lockerz.com/connect_landing";
    } else {
        window.location = "http://www.lockerz.com/connect_landing";
    }
}

// If its the Delivery page then fill the form.
if (location.href.indexOf("edelivery") > -1) {
    $("fName").value = fname;
    $("lname").value = lname;
    $("street").value = street;
    $("city").value = city;
    $("state").value = state;
    $("zipcode").value = zip;
}