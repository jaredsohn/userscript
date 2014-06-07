// ==UserScript==
// @name			Idziennik
// @version			1.0
// @namespace		GigantV12
// @description		Odświerza stronę przed 10s przed czasem
// @include			http://*.idziennik.edu.*/*
// @include			https://*.idziennik.edu.*/*
// @include			https://idziennik.edu.*/*
// @include			http://idziennik.edu.*/*
// ==/UserScript==
function ReloadSystem(){
document.location.reload();
}

function DownLastTime() {
var time = document.getElementById('sc_timeleft').innerHTML;

if(time === "Wylogowanie za 0:10<br>"){
ReloadSystem();
}
}
window.setInterval("DownLastTime()",500);

