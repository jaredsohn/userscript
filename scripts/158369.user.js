// ==UserScript==
// @name        Boursorama Simple Login
// @namespace   sputnick
// @description Permet de se loguer sur boursorama sans le clavier virtuel
// @include     https://www.boursorama.com/connexion*
// @include     https://www.boursorama.com/xhtml/*
// @version     20130204
// ==/UserScript==

function GM_log(element) {
    unsafeWindow.console && unsafeWindow.console.log(element);
}


if (document.location.href.search(/connexion\.phtml/) > 0 ) {
    document.location.href = "https://www.boursorama.com/xhtml/?Connexion&package=auth&fromAppli=&org=%2Fxhtml%2Findex.phtml%3FListeComptes%26package%3Dclients&niveau=CUSTOMER"
}

if (document.location.href.search(/\/xhtml\/index\.phtml/) > 0) {
    document.location.href = "https://www.boursorama.com/comptes/synthese.phtml";
}
