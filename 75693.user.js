// ==UserScript==
// @name           Groups IM Fucker
// @namespace      System
// @description    Fuck GrouIM redirect, ads, and whatever
// @include        http://share.groups.im/share/*
// ==/UserScript==

document.body.className = "";
document.body.setAttribute("style", "text-align: center; background: black; margin-top: 50px;");
var x = document.getElementById("mainPhoto");
document.body.innerHTML = "";
document.body.appendChild(x);

try
{
	var emb = document.body.getElementsByTagName("embed")[0];
	var url = emb.src.match(/v\/([^&]+)/i);
	url = "http://www.youtube.com/watch?v=" + url[1];
	window.location.href = url;
}
catch (ex)
{
}

x = document.createElement("style");
x.innerHTML = "#uservoice-feedback { display: none !important; }";
document.getElementsByTagName("head")[0].appendChild(x);