// ==UserScript==
// @name	Proteger-vos-liens.com Skipper
// @version	1.1
// @date	2011-08-19
// @description	Ce script ouvre automatiquement les liens créés par Proteger-vos-liens.com sans temps d'attente.
// @creator	Source Sascha Heldt <sascha@softcreatr.de>
// @include        http://protegez-vos-liens.com*
// ==/UserScript==

var link = document.getElementById('Protect');
link.click()