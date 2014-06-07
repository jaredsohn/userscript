// ==UserScript==
// @name           VentePriveeAmeliorationUI
// @namespace      jda
// @description	   Apporte quelques modifications à l'interface de vente-privee.com afin d'ameliorer la navigation
// @include        http://fr.vente-privee.com/*
// ==/UserScript==

// trie les articles selon la disponibilite ; grise les articles indisponibles
function sortArticlesByAvailability(list)
{
    // classe du span contenant l'etat des articles
    STATUS_CLASS = "artState";
    // etat des articles epuises
    NOT_AVAILABLE_STATUS="Epuisé";

    // le nombre d'article
    nArticles = list.childElementCount;
    // le nombre d'indisponible
    nUnavail = 0;
    for( n = 0 ; n < nArticles ; n++)
    {
        // on passe les articles au crible ; la disponibilite est dans un span de l'article
        for each ( span in list.children[n - nUnavail].getElementsByTagName("span") )
        {
            if( span.className == STATUS_CLASS
            &&  span.firstChild.data == NOT_AVAILABLE_STATUS )
            {
                // l'article est indisponible ; on va mettre l'article a la fin de la liste
                article = list.children[n - nUnavail];
                list.removeChild(article);
                list.appendChild(article);
                nUnavail++;

                // on modifie l'aspect de l'article
                for(nChild = 0; nChild < article.childElementCount; nChild++)
                {
                    article.children[nChild].style.opacity = "0.4";
                }
                // on change la couleur de fond
                article.style.backgroundColor="#A0A0A0";
            }
         }
    }
}

// inverse le tri des ventes en cours pour avoir les plus recentes en premier
function sortSales(list)
{
    // on recupere les ventes
    sales = list.getElementsByTagName("li");
    // on place les ventes de l'avant-derniere a la premiere a la fin de la liste
    for ( saleIndex = sales.length - 2; saleIndex >= 0; saleIndex --)
    {
	sale = list.children[saleIndex];
	list.removeChild(sale);
	list.appendChild(sale);
    }
}

// classe de la liste d'article
ARTICLE_LIST_CLASS="artList";
// classe de la liste des ventes en cours
CURRENTLY_SALES_CLASS="currentlySales";

// recherche des listes dans la page
for each ( list in document.getElementsByTagName("ul") )
{
    if( list.className == ARTICLE_LIST_CLASS )
    {
        sortArticlesByAvailability(list);
    }
    else if( list.className == CURRENTLY_SALES_CLASS )
    {
	sortSales(list);
    }

}

