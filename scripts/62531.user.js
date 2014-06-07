// ==UserScript==
// @name           CIC - Autologin
// @namespace      https://www.cic.fr/*
// @description    Connexion automatique (Remplacez "IDENTIFIANT" et "MOTDEPASSE" par vos codes d'accès - pensez à laisser les guillemets)
// @include        https://www.cic.fr/*

Login="IDENTIFIANT";	//User
Pass="MOTDEPASSE";	//Password

document.getElementById('e_identifiant').value=Login;
document.getElementById('e_mdp').value=Pass;
//document.getElementsByTagName('submit')[0].submit(); //NE MARCHE PAS ENCORE - IL FAUDRAIT SIMULER UN CLICK COMME DANS LE SCRIPT 'CIC - Autologin complement'

// ==/UserScript==
