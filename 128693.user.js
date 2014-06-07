// ==UserScript==
// @name           LGeL : Compo Auto
// @namespace      http://userscripts.org/users/heaven
// @description    Autofill de la compo d'une nouvelle partie LGeL
// @include        http://www.loups-garous-en-ligne.com/jeu/index.php?premier=true
// @include        http://www.loups-garous-en-ligne.com/jeu/index.php?do=compoSet
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
 
//Dans les différents .attr('checked', ###)
//remplacé les ### par true si vous voulez ce rôle
//remplacé les ### par false si vous ne souhaitez pas ce rôle
//Cela aura pour effet de cocher les rôles désignés pour chaque composition de jeu quand l'on clique sur le bouton correspondant.
//Si certaines Radio restent vides, le role ne seras pas présent dans la compo, car ce sont uniquement les radio "Oui" qui sont prises en compte.

//Gestion de la composition n°1

function Compo1() {
	$('input[name=voy][value=1]').attr('checked', false);			//Voyante 			(true; false)
	$('input[name=sal][value=1]').attr('checked', true);			//Salvalvateur			(true; false)
	$('input[name=sor][value=1]').attr('checked', false);			//Sorcière			(true; false)
	$('input[name=cha][value=1]').attr('checked', true);			//Chasseur			(true; false)
	$('input[name=cup][value=1]').attr('checked', false);			//Cupidon			(true; false)
	$('input[name=anc][value=1]').attr('checked', false);			//Ancien			(true; false)
	$('input[name=lgb][value=1]').attr('checked', false);			//Loup Garou Blanc		(true; false)
	$('input[name=chm][value=1]').attr('checked', true);			//Chaman			(true; false)
};

//Gestion de la composition n°2

function Compo2() {
	$('input[name=voy][value=1]').attr('checked', false);			//Voyante 			(true; false)
	$('input[name=sal][value=1]').attr('checked', false);			//Salvalvateur			(true; false)
	$('input[name=sor][value=1]').attr('checked', true);			//Sorcière			(true; false)
	$('input[name=cha][value=1]').attr('checked', false);			//Chasseur			(true; false)
	$('input[name=cup][value=1]').attr('checked', false);			//Cupidon			(true; false)
	$('input[name=anc][value=1]').attr('checked', true);			//Ancien			(true; false)
	$('input[name=lgb][value=1]').attr('checked', false);			//Loup Garou Blanc		(true; false)
	$('input[name=chm][value=1]').attr('checked', true);			//Chaman			(true; false)
};

//Gestion de la composition n°3

function Compo3() {
	$('input[name=voy][value=1]').attr('checked', false);			//Voyante 			(true; false)
	$('input[name=sal][value=1]').attr('checked', true);			//Salvalvateur			(true; false)
	$('input[name=sor][value=1]').attr('checked', false);			//Sorcière			(true; false)
	$('input[name=cha][value=1]').attr('checked', true);			//Chasseur			(true; false)
	$('input[name=cup][value=1]').attr('checked', true);			//Cupidon			(true; false)
	$('input[name=anc][value=1]').attr('checked', true);			//Ancien			(true; false)
	$('input[name=lgb][value=1]').attr('checked', false);			//Loup Garou Blanc		(true; false)
	$('input[name=chm][value=1]').attr('checked', false);			//Chaman			(true; false)
};

//Gestion de la composition n°4

function Compo4() {
	$('input[name=voy][value=1]').attr('checked', true);			//Voyante 			(true; false)
	$('input[name=sal][value=1]').attr('checked', false);			//Salvalvateur			(true; false)
	$('input[name=sor][value=1]').attr('checked', true);			//Sorcière			(true; false)
	$('input[name=cha][value=1]').attr('checked', true);			//Chasseur			(true; false)
	$('input[name=cup][value=1]').attr('checked', true);			//Cupidon			(true; false)
	$('input[name=anc][value=1]').attr('checked', false);			//Ancien			(true; false)
	$('input[name=lgb][value=1]').attr('checked', false);			//Loup Garou Blanc		(true; false)
	$('input[name=chm][value=1]').attr('checked', false);			//Chaman			(true; false)
};

//Bouton de la compostion n°1

$('input[value="Mettre à jour"]').after(
	'<input type="button" id="Compo 1" value="Compo 1>'
)

document.getElementById('Compo 1').addEventListener('click', function() {
		Compo1();
	}, true);

//Bouton de la compostion n°2

$('input[id="Compo 1"]').after(
	'<input type="button" id="Compo 2" value="Compo 2">'
)

document.getElementById('Compo 2').addEventListener('click', function() {
		Compo2();
	}, true);

//Bouton de la compostion n°3

$('input[id="Compo 2"]').after(
	'<input type="button" id="Compo 3" value="Compo 3">'
)

document.getElementById('Compo 3').addEventListener('click', function() {
		Compo3();
	}, true);

//Bouton de la compostion n°4

$('input[id="Compo 3"]').after(
	'<input type="button" id="Compo 4" value="Compo 4">'
)

document.getElementById('Compo 4').addEventListener('click', function() {
		Compo4();
	}, true);