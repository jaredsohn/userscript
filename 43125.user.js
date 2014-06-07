// ==UserScript==

// @name           Avatar to Profile

// @namespace      a2p@kw.com

// @description    Transforms the link in your avatar so it takes you to your profile page.

// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*

// ==/UserScript==



(function() {

    //replace ID#GOESHERE with the id number for your RT account

    var uid = "357517";

    

    var userInfo = document.getElementById("userInfo");

    var td1 = userInfo.getElementsByTagName("td")[1];

    var link = td1.getElementsByTagName("a")[0];

    link.href = "/members/profile.php?uid=" + uid;

})();