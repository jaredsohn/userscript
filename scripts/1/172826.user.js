// ==UserScript==
// @name        K37
// @description Nike ta mère
// @include     http://www.team-esg.com/site/index.php?file=Forum&page=*
// @run-at      document-end
// @version     1.0.0
// ==/UserScript==

// http://www.jokconcept.net/codes-couleurs-hexdecimal.php -> Fait mumuse.
var couleur = "#FFFFFF";

// Taille: 8 - 9 - 10 - 11 - 12 - 14 - 16 - 18 - 20 - 22 - 24 - 26 - 28 - 36 - 48 - 72
var taille = '14';

// true ou false pour activer le gras.
var act = true;

function tamere(couleur)
{
	// Nique ta grand mère K37
	setTimeout(function()
	{
	CKEDITOR.tools.callFunction(146, this);
	CKEDITOR.tools.callFunction(146, this);
	CKEDITOR.tools.callFunction(171,couleur,'fore')
	},500);
};

function grospd(taille)
{
	// Plus jamais tu me demande de script
	setTimeout(function()
	{
		document.getElementById("cke_62").childNodes[1].click();
		document.getElementById("cke_62").childNodes[1].click();
		CKEDITOR.tools.callFunction(173,taille);
	},500);
};

function foutrepuant()
{
	// Comment tu sers à rien...
	setTimeout(function()
	{
		CKEDITOR.tools.callFunction(65, this);
	},500);
};

tamere(couleur);
grospd(taille);
if(act){foutrepuant();}