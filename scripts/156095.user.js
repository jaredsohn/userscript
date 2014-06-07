// ==UserScript==
// @name        Résolveur ECLI
// @namespace   http://userscripts.org/users/488111
// @description Création de liens à partir des numéros ECLI pour le Conseil d'Etat et le Conseil constitutionnel
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
document.body.innerHTML = document.body.innerHTML.replace(/ECLI:FR:CE([A-Z]{3}):([0-9]{4}):([0-9]{1,7}).([0-9]{4})([0-9]{1,9})/g,'<a href="http://www.juricaf.org/arret/FRANCE-CONSEILDETAT-$2$5-$3" target="_blank">ECLI:FR:CE$1:$2:$3.$4$5 -> Voir sur Juricaf</a>');
document.body.innerHTML = document.body.innerHTML.replace(/(ECLI:FR:CC):([0-9]{1,4}):([0-9]{1,4}).([0-9]{1,4}).([A-Z]{1,4})/g,'<a href="http://www.juricaf.org/recherche/$3-$4/facet_pays_juridiction%3AFrance_%7C_Conseil_constitutionnel" target="_blank">$1:$2:$3:$4.$5 -> Voir sur Juricaf</a>');
//document.body.innerHTML = document.body.innerHTML.replace(/(ECLI:FR:CCASS):([0-9]{1,4}):([0-9C]{1,9})/g,'<a href="http://www.juricaf.org/recherche/num_decision:$3" target="_blank">$1:$2:$3 -> Voir sur Juricaf</a>');