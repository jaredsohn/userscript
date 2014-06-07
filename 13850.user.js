// ==UserScript==
// @name             Script de Gatsu35 Version 2 Add a link to NZB indexer
// @namespace      Gatsu35 @www.binnews.info
// @description    Script de Gatsu35 Version 2 Add a link to NZB indexer
// @include        http://www.binnews.info/_bin/*.php?*


//styles par defaut, mais chaque lien est configurable personnellement, sauf que si les styles présents ici, n'existe pas lors de la déclaration du lien, ils seronts appliqués
// ex : { color:'red'} // il n'y a que la couleur de texte déclarée, donc la couleur de fond sera rajoutée


var sty = document.styleSheets[document.styleSheets.length - 1];
    sty.insertRule("tr.searchLinkRow td.searchLinkCell a.binLink{display:none; position:relative; padding:1px;}", 0);
    sty.insertRule("tr.searchLinkRow:hover td.searchLinkCell a.binLink{display:inline}", 0);
    sty.insertRule("tr.searchLinkRow td.searchLinkCell a.binLink span {display:none; position:absolute; white-space:nowrap; padding:2px; left:20px; top:40px; color:#000; background:#FFFFAA; border:1px solid #000}", 0);
    sty.insertRule("tr.searchLinkRow td.searchLinkCell a.binLink:hover span {display:block}", 0);

var defaultStyles = {
    color : '#F5F5F5',
    backgroundColor : 'black',
    textDecoration : 'underline'
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
    a.innerHTML = label;
    a.className = 'binLink';
    var str = str.replace(/ /g, "+");
    a.href = url.replace(/\$\$STR\$\$/g,str);
    elm.appendChild(a);
    var span = a.appendChild(document.createElement('span'));
    span.innerHTML = title;
}

//generation des liens
var allLinks = document.getElementsByTagName('a');
var linksArray = []; //array pour eviter de se retrouver avec une nodeList dynamique, parce qu'en plus on va rajouter des liens dans la page
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
        //on teste si le lien n'existe pas déjà
        td = newTd;
        if (td.getAttribute('title')!='binName') {
            td.setAttribute('title', 'binName');
            td.parentNode.className+= ' searchLinkRow';
            td.className+= ' searchLinkCell';
            var str = td.innerHTML;
            
            
    /**
     * ici il suffit de rajouter le moteur de news que l'on veut, il ne faut pas toucher aux deux premiers parametres (td et str),
     * on peut aussi appliquer un dictionnaire de styles CSS : { color:'red',  backgroundColor: 'blue', fontWeight:'bold'}, si certains styles ne sont pas présents, ils seront pris depuis le dictionnaire de styles par défaut
     * utilisation :
    *  generateLink(td, str, 'texte a affiche', 'texte infobulle au dessus du lien', 'url de recherche pour le moteur avec $$STR$$ qui est la chaine qui sera remplacée par str', { color:'#FFF', backgroundColor:'black'} )
    */
    
    generateLink(td, str, '[BS]', 'binSearch', 'http://binsearch.info/?max=250&adv_age=&server=&q=$$STR$$');
    generateLink(td, str, '[BSO]', 'binSearch Other groups', 'http://binsearch.info/?max=250&adv_age=&server=2&q=$$STR$$');
    generateLink(td, str, '[NZL]', 'Newzleech', 'http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q=$$STR$$&mode=usenet&adv=', {backgroundColor:'orange', color:'#000'});
    generateLink(td, str, '[BinT]', 'BinTube', 'http://www.bintube.com/Default.aspx?q=$$STR$$&i=1&browse=&w=&opt=1&ctl00%24ContentPlaceHolder1%24sgroup=&ctl00%24ContentPlaceHolder1%24asmGroup%24hdnSelectedValue=&a=&r=200', {backgroundColor:'blue'});
    generateLink(td, str, '[iliT]', 'iliatou.com', 'http://www.iliatou.com/index.php?page=recherche.php&dem=$$STR$$&nbaffppagemax=100&rechgroup=&poster=&rechnbjour=60&trie=0&trieOrdre=0&button=Envoyer', {backgroundColor:'green'});
    

        }
    };
});

