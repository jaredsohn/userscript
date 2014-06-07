// ==UserScript==
// @name       RP.Me Sign In
// @namespace  something here idk
// @version    0.1
// @description  The many "sign up" links on http://www.roleplayer.me become "sign in".
// @require	http://www.w3schools.com/jquery/jquery.js
// @include http://www.roleplayer.me/*
// @include http://www.roleplayer.me
// @match http://www.roleplayer.me/mobile.php
// @copyright  2012+, fallenfirebender
// ==/UserScript==
$(document).ready(function(){
  $("a[href='join_us.php']").attr("href","login.php");
  $("a:contains(Sign Up!)").text("Sign In!");
});
