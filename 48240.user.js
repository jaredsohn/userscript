// ==UserScript==
// @name           KI style switcher
// @namespace      foo
// @description    change dynamiquement le CSS de kraland.org
// @include        http://www.kraland.org/*
// ==/UserScript==

/* a remplacer par l'url menant vers le dossier contenant
 * les feuilles de style utilisees par le site; ie main.css, steps.css, game.css, etc. */
var stylePath = "http://scoaz.net/kraland/";

var styles = new Array();
var head = document.getElementsByTagName('head')[0];
var link = document.getElementsByTagName('link')[0];

/* ajoute dans styles un element link a ajouter au document */
function saveStyle(file){
    var style = document.createElement('link');
    style.href = stylePath+file;
    style.rel = "stylesheet";
    style.type = "text/css";
    style.media = "all";
    styles.push(style);
}

/* ajoute le contenu de styles au document */
function appendStyles(){
    if (styles[0]){
	head.appendChild(styles.pop());
	appendStyles();
    }else{
	return 0;
    }
}

/* tant qu'il reste une CSS linkee, on la supprime du document
 * et on ajoute dans un tableau notre feuille de style correspondants */
while (link){
    saveStyle(link.href.substring(link.href.lastIndexOf('/')+1, link.href.length));
    head.removeChild(link);
    link = document.getElementsByTagName('link')[0];
}

appendStyles();

