// Copyright (c) 2006, Perberos
// http://perberos.tk/

// ==UserScript==
// @name		  Kings of Chaos Head Remover
// @namespace	 kingsofchaosheadremover
// @description   Quira el logo superior de Kings of Chaos
// @include	   http://www.kingsofchaos.com/*.php
// @exclude	   
// ==/UserScript==    

//Quita el logo enorme de arriba
(function() {
	var tables = document.getElementsByTagName('table');
	var attribs = "";
		for (var i = tables.length - 1; i >= 0; i--) {
			attribs = tables[i].getAttribute('background');
			if(attribs == "http://images.kingsofchaos.com/main/repeater.jpg"){
				tables[i].parentNode.removeChild(tables[i]);
			}
		}
	}
)();

//kingsofchaosheadremover.user.js

