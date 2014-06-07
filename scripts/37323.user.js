// ==UserScript==
// @name           ZZscript Signature
// @exclude        http://www.koreus.com/modules/newbb/edit.php*
// @exclude        http://www.koreus.com/modules/newbb/post.php
// @include        http://www.koreus.com/modules/newbb/*
// @include        http://www.koreus.com/modules/newbb/reply.php*
// ==/UserScript==

var signature = "\n\nZZ&#169;";

window.addEventListener("load", function(e) {


function setsignature(domname)
{
var editbar = document.getElementById(domname);

    editbar.innerHTML += signature;
}

setsignature("message");

 }, false);