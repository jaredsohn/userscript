// ==UserScript==
// @name        Microsoft Account Login Paste Password
// @description Allows to paste password in Microsoft's login forms (former Windows Live ID)
// @author      Jonas Sourlier / Yolp Softwaredesign GmbH <j dot sourlier at yolp dot ch>
// @include     http*://login.live.com/*
// ==/UserScript==

document.getElementById("i0118").setAttribute("autocomplete", "on");
