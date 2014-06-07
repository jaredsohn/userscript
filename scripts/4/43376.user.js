// ==UserScript==
// @name           Autologin auf allen Gondalklonen
// @author         Bouvere
// @description    Automatisches Login auf Gondal.de, Artyria.de und Last-Emperor.de, insofern die Benutzerdaten gespeichert sind
// @include        http://*gondal*.de/signups/login
// @include        http://*artyria.com/signups/login
// @include        http://*artyria.de/signups/login
// @include        http://*last-emperor.de/signups/login
// ==/UserScript==

if(document.getElementById("SignupName").value != "" && document.getElementById("SignupPass").value != "") document.getElementsByTagName("form")[0].submit();