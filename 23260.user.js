// ==UserScript==
// @name           Ajout de Binsearch et Newsleech 
// @namespace      Merci à Gatsu @http://www.binnews.in/
// @description    Ajout de Binsearch et Newsleech sur la page http://www.binnews.in  couleurs adaptées au site (orange et bleu)
// @include        http://www.binnews.in/*


//styles par défaut, mais chaque lien est configurable individuellement, le style par defaut sera appliqué s'il n'est pas définit dans le lien
// ex : { color:'red'} // il n'y a que la couleur de texte déclarée, donc la couleur de fond sera rajoutée
var defaultStyles = {
    color : '#F5F5F5',
    backgroundColor : 'black',
    textDecoration : ''
	
	
}

function initializeStyles(styles) {
    
    return styles;
}

function generateLink(elm, str, label, title, url, styles) {
    //initialize les styles du lien
    styles = styles || {};
    for (var i in defaultStyles) {
        if (!styles[i]) styles[i] = defaultStyles[i];
    }
    
    elm.appendChild(document.createTextNode(' ')); //espace
    var a = document.createElement('a');
    for (var i in styles) { //applique les styles
        a.style[i] = styles[i];
    }
    a.target = '_blank';
    a.title = title;
    a.innerHTML = label;
    var str = str.replace(/ /g, "+");
    a.href = url.replace(/\$\$STR\$\$/g,str);
    elm.appendChild(a);
}

//génération des liens
var allLinks = document.getElementsByTagName('a');
var linksArray = []; //array pour éviter de se retrouver avec une nodeList dynamique, parce qu'en plus on va ajouter des liens dans la page
for (var i=0; i<allLinks.length; i++) {
    linksArray.push(allLinks[i]);
}

//parcours de tous les liens
linksArray.forEach(function(link) {
    if (link.href.match(/ng_id=/)) {
        //on remonte jusqu'au TD
        var td = link;
        while(td.nodeName!="TD") {
            td = td.parentNode;
        }
        if (!td) return;
        
        var newTd = td.parentNode.cells[td.cellIndex+1];
        //passe au td suivant :
        if (!newTd) {
            while(td) {
                if (td.parentNode.className.match(/\bligne/)) {
                    break;
                }
                td = td.parentNode;
            }
            newTd = td.parentNode.cells[td.cellIndex+1];
        }
        if (!newTd) return;
        //ajout du lien
        //on teste si le lien existe déjà
        td = newTd;
        if (td.getAttribute('title')!='binName') {
            td.setAttribute('title', 'binName');
            
            var str = td.innerHTML;
            
            
    /**
     * ici il suffit de rajouter le moteur de news que l'on veut, il ne faut pas toucher aux deux premiers paramètres (td et str),
     * on peut aussi appliquer un dictionnaire de styles CSS : { color:'red',  backgroundColor: 'blue', fontWeight:'bold'}, si certains styles ne sont pas présents, ils seront pris depuis le dictionnaire de styles par défaut
     * utilisation :
    *  generateLink(td, str, 'texte a affiche', 'texte info-bulle au dessus du lien', 'url de recherche pour le moteur avec $$STR$$ qui est la chaine qui sera remplacée par str', { color:'#FFF', backgroundColor:'black'} )
    */
    
    
    generateLink(td, str, 'Newzleech', 'Newzleech', 'http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q=$$STR$$&mode=usenet&adv=', {color: '#FF8800', backgroundColor:'#5881c3'});
	generateLink(td, str, 'BinSearch', 'BinSearch', 'https://binsearch.info/?max=250&adv_age=&server=&q=$$STR$$', {color: '#5881c3', backgroundColor:'#FF8800', fontWeight:'bold'});
	
      

        }
    };
});