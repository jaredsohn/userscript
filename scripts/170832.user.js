// ==UserScript==
// @id             e-sim_menu_mod
// @name           E-Sim Menu Mod
// @namespace      http://fenixinteractive.net
// @description    Zmienia pozycję menu w przeglądarkowej grze E-Sim
// @author         Fenix2412 <dygulski13@gmail.com>
// @homepage       http://fenixinteractive.net
// @version        0.7.3
// @include        http://*.e-sim.org/*
// @run-at         document-end
// ==/UserScript==
if(document.getElementById('bestTopBar') == undefined) {
var style = document.createElement('style');
style.innerHTML = "#navigationRow{ display: table; position: fixed; top: 0px; left: 50%; margin-left: -480px; background: rgba(255,255,255,0); width: 100%; height: 30px; z-index: 998; align: center;  }";
	var wypelniacz = document.createElement('div');
	wypelniacz.setAttribute('style', 'background: rgba(255,255,255,0.9); width: 100%; height: 53px; position: fixed; left: 0px; top: 0px; border-bottom: 1px solid #222; z-index: 997; box-shadow: 0 0 7px 7px rgba(20, 20, 20, 0.4);');
document.getElementById('container').setAttribute('style', 'top: 50px; width: 990px; margin: 0 auto; position: relative;');
	document.body.appendChild(wypelniacz);
	document.head.appendChild(style);
	document.getElementById('navigationRow').getElementsByTagName('div')[56].innerHTML = '';
}
