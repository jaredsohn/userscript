// ==UserScript==
// @name        Zalando Umsatz
// @namespace   lolnickname
// @include     https://www.zalando.de/benutzerkonto/bestellungen/*
// @version     0.1
// ==/UserScript==

var n =  document.getElementsByClassName('amount')[0].textContent.match(/von (\d+) gesamt/);
var opt = document.createElement("option");
opt.text = n[1];
opt.value = n[1];
document.getElementsByTagName('select')[0].add(opt, null);
document.getElementsByTagName('select')[0].selectedIndex = 3;
n = document.getElementsByClassName('amount')[0].textContent.match(/(\d+) von (\d+) gesamt/);
if (n[1] != n[2])
{
	document.getElementsByClassName('limiter')[0].parentNode.submit();
}

var sum = 0.0;
for (var i = 1; i < document.getElementsByClassName('oTotal').length; i++)
{
	var s = document.getElementsByClassName('oTotal')[i].textContent;
	s = s.replace(/\s/,"");
	s = s.replace("€","");
	s = s.replace(",",".");
	sum += parseFloat(s);
	sum = myRound(sum, 2);
	}

document.getElementsByClassName('oTotal')[0].textContent = "Umsatz = " + sum;

function myRound(zahl,n)
{
    var faktor;
    faktor = Math.pow(10,n);
    return(Math.round(zahl * faktor) / faktor);
}