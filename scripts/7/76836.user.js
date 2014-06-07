// Skrypt ma za zadanie podmiane linkow w liscie przelewow do ZUS wersja na stronie, na linki bezposrednio do drukowania
// version 0.1
// 2010-03-11
// Copyright (c) 2010, UNK
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MultiBank - przycisk drukowania
// @description   MultiBank przycisk drukowania na liscie przelewow
// @include       https://moj.multibank.pl/*
// ==/UserScript==

var nowylink = new Array();
var przelewy = document.getElementById('MainTable').innerHTML;

var numery = przelewy.match( /iNumber=\d+/gi );

for( i=0; i<numery.length; i++ )
{
	nowylink[i] = "doSubmit('/printout_operation_details_z.aspx','','POST','"+numery[i]+"##cCodeOper=153',false,false,false,null); return false;";
}

var linki = document.getElementsByTagName('a');
z=0;
for( i=0; i<linki.length; i++ )
{
	if ( linki[i].attributes[2] != undefined )
	{
		if ( linki[i].attributes[2].value.match( /account_operation_details_z/i ) != null )
		{
			linki[i].attributes[2].value = nowylink[z];
			z++;
		}
	}
}