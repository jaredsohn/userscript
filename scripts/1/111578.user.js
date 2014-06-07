// ==UserScript==
// @name          Youtube Main Ad Remover
// @version       1.1
// @description   Removes main youtube ad
// @match         http://www.youtube.com/*
// ==/UserScript==

var Ad, Ad2, Ad3, Login;

Ad = document.getElementById("ad_creative_1")

if (Ad && Ad.parentNode)
    Ad.parentNode.removeChild(Ad);

Ad2 = document.getElementById("ad_creative_2")

if (Ad2 && Ad2.parentNode)
    Ad2.parentNode.removeChild(Ad2);

Ad3 = document.getElementById("ad_creative_3")

if (Ad3 && Ad3.parentNode)
    Ad3.parentNode.removeChild(Ad3);

Login = document.getElementById("iyt-login-suggest-box")

if (Login && Login.parentNode)
    Login.parentNode.removeChild(Login);