// ING.pl - pobieranie nr konta na liscie przelewow.
// version 0.1
// 2010-03-11
// Copyright (c) 2010, UNK
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ING.pl pobierania nr konta na liscie przelewow
// @description   Dzieki pobieraniu numeru konta, na liscie przelewow mamy dostep do nr konta z ktorego przelew zostal zrobiony, w przypadku osoby robiacej przelew pokazuje jej nr konta, w przypadku naszego przelewu pokazuje z jakiego nr konta zostal on zrobiony.
// @include       https://ssl.bsk.com.pl/bskonl/account/history/*
// ==/UserScript==

var dataod = document.getElementById('fromDate').value;
var datado = document.getElementById('toDate').value;
var klucz = document.location.search.match( /&key=(.*)/gi );
klucz = klucz+"";
klucz = klucz.substr( 5 );
var strona = new XMLHttpRequest();
for (i=0;i<=29;i++)
{
	strona.open("GET", "https://ssl.bsk.com.pl/bskonl/account/history/histtrans.html?fromDate="+dataod+"&toDate="+datado+"&accountNumHash=1191611639&listIndex="+i+"&form=true&key="+klucz, false);
	strona.send(null);
	var przetwarzana = strona.responseText;
	var nrkonto = przetwarzana.match(/[0-9]{26}/);
	document.getElementById('confirmation_'+i).parentNode.innerHTML+=nrkonto;
}