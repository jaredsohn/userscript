// ==UserScript==
// @name        Minethings Checker
// @description Here you go, noeatnosleep. Hope this works well enough for you
// @author  TheLastProject
// @license UNLICENSE
// @grand   none
// @namespace   http://www.reddit.com/r/bitcoinbeg/comments/1q441t/i_will_write_a_basic_script_in_any_free/
// @include     http*://*.minethings.com/*
// @version     2
// ==/UserScript==

// Enter your username and password here
var username = "noeatnosleep";
var password = "ep45onelfb";

// Log the user in if a login form is visible on the page
if(username && password && document.getElementById("MinerName") && document.getElementById("MinerPassword"))
{
  loginfield = document.getElementById("MinerName");
  loginfield.value = username;
  passwordfield = document.getElementById("MinerPassword");
  passwordfield.value = password;
  document.getElementById("MinerLoginForm").submit();
}

// The refreshing seems silly as MineThings seems to already use some Javascript to auto-refresh
// Then again, I don't know this game, so *shrugs*
// The page isn't displayed anywhere, but the "Findings" page seems to have a "discoveries" element
// So I'm going to just hope it won't be on other page too
if(document.getElementById("discoveries"))
{
  setTimeout("location.reload(true);", 24*60*60*1000); //Reload after 24 hours
}