// ==UserScript==
// @name		Quitar banner publicidad Ogame by [THC]Fever
// @author	       	[THC]Fever
// @description	Quita el banner que sale en la página de Visión General que dice "OGame es para los líderes... ¡Hazte Comandante!"
// @include         	http://*.ogame.com.es/game/index.php?page=overview*

// ==/UserScript==

window.addEventListener("load", function() { script() }, false);

function script() {
	borra_esto(window.document,document.getElementById('combox_container'));
};

function borra_esto(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};