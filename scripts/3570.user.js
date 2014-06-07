// Copyright (c) 2006, Perberos
// http://perberos.tk/

// ==UserScript==
// @name		  BiteFight Head Remover
// @namespace	 bitefightheadremover
// @description   Quira el logo superior de BiteFight
// @include	   http://*.bitefight.*/*
// @exclude	   
// ==/UserScript==    

//Quita el logo enorme de arriba
(function() {
	var trs = document.getElementsByTagName('tr');
		for (var i = trs.length - 1; i >= 0; i--) {
			if (trs[i].innerHTML.indexOf('header.jpg') != -1){
				trs[i].parentNode.removeChild(trs[i]);
			}
		}
	}
)();

//bitefightheadremover.user.js

