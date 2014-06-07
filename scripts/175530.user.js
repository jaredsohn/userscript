// ==UserScript==
// @name        RemoveSartMattNews
// @namespace   http://macbidouille.com
// @description Do not display SartMatt news on macbidouille.com
// @include     http://*.macbidouille.com/*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       none
// ==/UserScript==


if ($(".info > a").attr("href") == "mailto:sartmatt@macbidouille.com")
{
    $("#newsFull").text("News écrite par SartMatt, vous pouvez passer votre chemin :");
}