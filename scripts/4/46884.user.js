// ==UserScript==
// @name           Follow Britney
// @namespace      *.twitter.com
// @include https://twitter.com/*
// @include http://twitter.com/*
// ==/UserScript==

function $(e){return document.getElementById(e);}

function any(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
function some(v) {
  return Math.floor(Math.random()*v).toString(36);
}

function mkfullname() {
  var first=["Albert","Bob","Dick","Paul","John","Jon","Mary","Peter","Jesus", "George"],
  last = ["Christ","Paulson","Obama","Percival", "Cheney", "Bush", "Casper", "Washington"];
  return any(first)+" "+any(last);
}
function mkusername() {
  var p1=["mega","duck","rick","dur","fart"],
      p2=["roll","rock","durr","bob","clown"];
  return any(p1)+any(p2)+some(2e9);
}
function mkpassword() {
  return mkusername();
}
function mkemail() {
  return mkusername()+"@"+any(["yahoo.com","gmail.com","msn.com","hotmail.com","comcast.net"]);
}

if (location.href=="http://twitter.com/" || location.href=="https://twitter.com/") {
  location.href="https://twitter.com/signup?follow=britneyspears&commit=Join+today!";
} else if (location.href=="https://twitter.com/signup?follow=britneyspears&commit=Join+today!") {
  $("header").innerHTML = "Pwn Score: "+(GM_getValue("fuck",0));
  $("user_name").value = mkfullname();
  $("user_screen_name").value=mkusername();
  $("user_user_password").value=mkpassword();
  $("user_email").value=mkemail();
  $("recaptcha_response_field").focus();
} else if (location.href=="https://twitter.com/account/create") {
  // typo
  $("recaptcha_response_field").focus();
} else if (location.href=="https://twitter.com/invitations/find_on_other_networks") {
  GM_setValue("fuck",Number(GM_getValue("fuck",0))+1);
  $("sign_out_form").submit();
}