// ==UserScript==
// @name 		Wykop one-click login
// @description 	Login with one click
// @author		Dziudek
// @version 		0.1
// @include 		http://*wykop.pl*
// ==/UserScript==

// podaj swoje dane
var login = '';
var haslo = '';

var d=document.getElementById("navlog").childNodes[3].childNodes[0];
if(d.href == "http://www.wykop.pl/zaloguj"){
d.addEventListener("click",function(e){
e.preventDefault();
var x = new XMLHttpRequest();
if (!x) alert('Błąd tworzenia XHR');
x.onreadystatechange = function(){if(x.readyState == 4)(x.status == 200)?window.location=window.location:alert('Błąd zapytania');};
x.open('POST','http://www.wykop.pl/zaloguj.php', true)
x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
x.send('username='+login+'&password='+haslo+'&remember_me=remember_me')},false);}