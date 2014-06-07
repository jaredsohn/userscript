// ==UserScript==
// @name           FromTricTracToBGGPages
// @namespace       
// @description    Add a link to BoardGameGeek games pages in trictrac.net games pages
// @include        http://trictrac.net/index.php3?id=jeux&rub=detail&inf=detail&jeu=*
// ==/UserScript==


function add_things() {
              var eltPost = document.getElementsByTagName('body')[0].getElementsByTagName('body')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('tr')[0].getElementsByTagName('table')[3].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].getElementsByTagName('table')[0];
              var liste = document.createElement('span');    
              liste.id = "lien";
              liste.innerHtml = '<a href="http://www.boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=julius%20caesar&B1=Go">aaa</a>';
	}
}

add_things(); 
