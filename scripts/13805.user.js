// ==UserScript==
// @name Search for Nzb in newzleech.com
// @namespace www.binnews.info
// @description Merci à Gatsu35
// @include http://www.binnews.in/*
// 
// ==/UserScript==

// pour chaque lien, on cherche si c'est un lien qui contient "ng_id="
// si c'est le cas, c'est la case suivante qui nous intéresse

var allLinks = document.getElementsByTagName('a');
var linksArray = []; //array pour eviter de se retrouver avec une nodeList dynamique, parce qu'en plus on va rajouter des liens dans la page
for (var i=0; i<allLinks.length; i++) {
    linksArray.push(allLinks[i]);
}

linksArray.forEach(function(link) {

    if (link.href.match(/ng_id=/)) {
        //on remonte jusqu'au TD
        var td = link;
        while(td && td.nodeName!='TD') td = td.parentNode;
        if (!td) return;
        
        //passe au td suivant :
        td = td.parentNode.cells[td.cellIndex+1];
        if (!td) return;
        
        //ajout du lien
        //on teste si le lien n'existe pas déjà
        if (td.innerHTML.match(/Newsleech/gi)) return;
        
        var space = document.createTextNode(' ');
        td.appendChild(space);
        var a = document.createElement('a');
        a.style.color = '#4653FF';
        a.style.backgroundColor = '#FF9B30';
        a.target = '_blank';
        a.title = 'Newsleech';
        a.innerHTML = '[Newsleech]';
        a.href = 'http://www.newzleech.com/?q=' + td.innerHTML.replace(/ /g, "+") + "&mode=usenet&adv=";
        td.appendChild(a);
    };
});