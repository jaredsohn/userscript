// ==UserScript==
// @name        K37
// @description Nike ta mère
// @include     http://www.team-esg.com/site/index.php?file=Forum&page=*
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==

// CHROME ONLY.

// http://www.jokconcept.net/codes-couleurs-hexdecimal.php -> Fait mumuse.
var couleur = "#FFFFFF";

// Taille: 8 - 9 - 10 - 11 - 12 - 14 - 16 - 18 - 20 - 22 - 24 - 26 - 28 - 36 - 48 - 72
var taille = '14';

// true ou false pour activer le gras.
var act = true;

// lag de merde FF tu augmentes si ça merde 1000 = 1 seconde.
var lag = 1000;

function tamere(couleur,lag)
{
	// Nique ta grand mère K37
	setTimeout(function()
	{
	CKEDITOR.tools.callFunction(146, this);
	CKEDITOR.tools.callFunction(146, this);
	CKEDITOR.tools.callFunction(171,couleur,'fore')
	},lag);
};

function grospd(taille,lag)
{
	// Plus jamais tu me demande de script
	setTimeout(function()
	{
		document.getElementById("cke_62").childNodes[1].click();
		document.getElementById("cke_62").childNodes[1].click();
		CKEDITOR.tools.callFunction(173,taille);
	},lag);
};

function foutrepuant(lag)
{
	// Comment tu sers à rien...
	setTimeout(function()
	{
		CKEDITOR.tools.callFunction(65, this);
	},lag);
};

tamere(couleur);
grospd(taille);
if(act){foutrepuant();}