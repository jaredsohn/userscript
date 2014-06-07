// ==UserScript==
// @name       STO News Sidebar Remover
// @version    0.1
// @description  Removes sidebar from STO News site
// @match      http://sto.perfectworld.com/news/*
// @copyright  Public Domain
// ==/UserScript==


if (e=document.getElementById("col02")) {
    e.parentNode.removeChild(e);
}
if (e=document.getElementById("col01")) {
    e.setAttribute("style", "width:100% !important");
}