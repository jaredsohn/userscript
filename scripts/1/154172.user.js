// ==UserScript==
// @name          sysu-jwxt-ff-login
// @namespace     http://userscripts.org/scripts/show/154172
// @description   Bypass login issues in SYSU school affair system for Firefox
// @include       http://uems.sysu.edu.cn/jwxt/*
// @version       0.2
// ==/UserScript==

var j_username = document.getElementsByName("j_username");
if (j_username) {
    j_username[0].onkeydown = "";
    j_username[0].setAttribute("required", "");
}

var j_password = document.getElementsByName("j_password");
if (j_password) {
    j_password[0].onkeydown = "";
    j_password[0].setAttribute("required", "");
}

var btnImg = document.getElementById("btnImg");
if (btnImg) {
    var newInput = document.createElement("input");
    newInput.type = "image";
    newInput.src = btnImg.src;
    btnImg.parentNode.appendChild(newInput);
    btnImg.parentNode.removeChild(btnImg);
}
