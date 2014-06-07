// ==UserScript==
// @name           MultiMessageCE
// @namespace      Pook
// @description    permet d'envoyer un message a plusieurs destinataires.
// @include        http://www.chaudron-empoisonne.fr/mp_ajouter.php*
// ==/UserScript==


alert("doubitest");


var newElement = document.createElement("div"); // On crée un nouvelle élément div
alert("doubitest2");

newElement.innerHTML = 'Essayons d\'afficher ça'; // On écrit le code source qu'il contient
alert("doubitest3");

document.getElementById('contenu_texte').insertBefore(newElement, document.getElementById('message')); // On l'affiche

alert("doubitest4");


/*var textzone= document.createElement("div"); // On cr?e un nouvelle ?l?ment div
textzone.innerHTML = '<TEXTAREA name="namebox" rows=5 cols=30>Valeur par défaut</TEXTAREA>'
parent.document.getElementById("sujet").insertBefore(textzone, document.getElementById("textareaId"));*/