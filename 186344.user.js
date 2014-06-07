// ==UserScript==
// @name Sustitu.CAT
// @namespace http://naroh.es/sustitucat/
// @author Chuso Perez
// @version 1.0
// @description ¡Elimina el independentismo catalán de tu navegador!
// @run-at document_end
// @grant none
// ==/UserScript==

// Inspired by http://naroh.es/sustitucat/

// Expect performance impact
// I tried to use DOMSubtreeModified event, but since browser support sucks
// (only Chrome does it right) I had to use slower events

// Tested in: Chrome, Firefox, Opera
// Not tested in: Internet Explorer

var events_enabled = true;
var initialized = false;

function make_ponies(str)
{
	return str
		.replace(/\b[cC]atal(?:onia|unya|uña)\b/g, "Ponilandia")
		.replace(/\b[sS]oberanista\b/g, "mágica")
		.replace(/\bconsulta (?:independentista|soberanista|secesionista)\b/g, "gran adoración al bizcocho de chocolate")
		.replace(/\bconsulta catalana\b/g, "gran adoración al bizcocho de chocolate")
		.replace(/\b[iI]ndepend(?:ent:iente:entista)\b/g, "brillante como la purpurina")
		.replace(/\bindepend[eè]ncia\b/g, "fiesta parda")
		.replace(/\bIndepend[eè]ncia\b/g, "Fiesta Parda")
		.replace(/\bla v[ií]a catalana\b/g, "el corro de la patata")
		.replace(/\bv[ií]a catalana\b/g, "corro de la patata")
		.replace(/\bla V[ií]a Catalana\b/g, "el Corro de la Patata")
		.replace(/\bV[ií]a Catalana\b/g, "Corro de la Patata")
		.replace(/\bindependentismo catalán\b/g, "conjuro mágico")
		.replace(/\bIndependentismo [cC]atalán\b/g, "Conjuro Mágico")
		.replace(/\bcatalanes\b/g, "ponies")
		.replace(/\bArtur Mas\b/g, "Jefe Supremo de los Ponies")
		.replace(/\bDerecho a [dD]ecidir\b/g, "Derecho a comer pasteles")
		.replace(/\bderecho a decidir\b/g, "derecho a comer pasteles");
}

function checkNode(node)
{
	if (typeof node != 'object') return;

	if (node instanceof Text)
		node.textContent = make_ponies(node.textContent);
	else if (typeof node.childNodes == 'object')
		for (var i=0; i<node.childNodes.length; i++)
			checkNode(node.childNodes[i]);
}

function handle_event(node)
{
	// Poor people's semaphore
	if (!events_enabled) return;
	events_enabled = false;
	checkNode(node);
	events_enabled = true;
}

function initialize()
{
	if (initialized) return;
	initialized = true;
	document.title = make_ponies(document.title);
	handle_event(document);
}

document.addEventListener("DOMNodeInserted", function(e) {
	handle_event(e.target);
}, false);

document.addEventListener("DOMCharacterDataModified", function(e) {
	handle_event(e.target);
}, false);

document.addEventListener("load", function(e) {
	initialize();
}, false);

// Google Chrome doesn't run document.onload
initialize();
