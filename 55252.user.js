// ==UserScript==
// @name           LoginBourso
// @namespace      bourso
// @description    Permet de se loger automatiquement a boursorama
// en tant que client
// @include        https://www.boursorama.com/connexion*
// ==/UserScript==

var identifiant = document.getElementById('bloc_membre_d');
var entree = identifiant.getElementsByTagName('td');
document.getElementById("login").value = ""

// On fait apparaitre le boitier
entree[5].firstChild.click();

// On remplit le mot de passe
identifiant = document.getElementById('bloc_client_d');
entree = identifiant.getElementsByTagName('td');
entree[18].innerHTML = '<input type="password" name="password" id="password" maxLength="11" autocomplete="off" readonly style=" width:120px ; height:25px ; font-size:23px ; text-align:center" value="">';

//document.getElementById("identification_client").submit();  
