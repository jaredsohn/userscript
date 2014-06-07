// ==UserScript==
// @name        Gmail Vacation Responder Massage Remover (not fix)
// @author      Ali Nowruzi
// @namespace   you can remove Gmail vacation responder massage on top of your gmail page using this script
// @include     https://mail.google.com/mail/*
// @include     http://mail.google.com/mail/*
// @version     0.1
// ==/UserScript==
/**
document.innerHTML = document.innerHTML.replace("Vacation Settings", "<td id=\"infotiptag\"></td>");

var element = document.getElementById("infotiptag");
// ":qo"	/\x3a\w\w/			":qg"

element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

//EOF
**/