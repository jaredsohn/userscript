// ==UserScript==
// @name           twitter starwar Id create follow me
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
  var first=["Abe","Darth","Mace","Master","Sith","Shaw","Kreine","Count","Moses", "David"],
  last = ["Maul","Vader","Windu","Jedi", "Lord", "Saber", "Silvershot", ""];
  return any(first)+" "+any(last);
}
function mkusername() {
  var p1=["dark","the","sith","jedi","galatic","rebel],
      p2=["side","force","lord","knight","empire","alliance"];
  return any(p1)+any(p2)+some(2e9);
}
function mkpassword() {
   var r1=["star"],
       r2=["wars3"];
  return (r1)+(r2)();
}
function mkemail() {
  return mkusername()+"@"+any(["yahoo.com","gmail.com","msn.com","hotmail.com","comcast.net"]);
}

if (location.href=="http://twitter.com/" || location.href=="https://twitter.com/") {
  location.href="https://twitter.com/signup?follow=vegasmoneygirl&commit=Join+today!";
} else if (location.href=="https://twitter.com/signup?follow=vegasmoneygirl&commit=Join+today!") {
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
else if (location.href=="https://twitter.com/") {
  GM_setValue("fuck",Number(GM_getValue("fuck",0))+1);
  $("sign_out_form").submit();
}