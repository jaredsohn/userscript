// ==UserScript==
// @name           MorandiMerdeMeter
// @author         antoine7692
// @include        http://www.jeanmarcmorandini.com/home*
// @include        http://www.jeanmarcmorandini.com/
// @version        0.2
// ==/UserScript==

//  CHANGELOG
//  V 0.2
// -Une nouvelle bannière plus dans l'esprit du site
// -Le retour du menu de droite pour permettre aux fans de se logger ;)
// -La notation des news même sur les pages précédentes et pas seulement sur la  page principale
// -Quelques ajouts de mots cles
// On définit la liste des termes sensibles qui augmenteront le potentiel merdique de la news : à compléter bien sur !!!

 var listeMarron = new Array("regardez","secret story","endemol","tf1","d&#233rapage","scandale","cliquez","people","morandini","direct8","direct 8","lamentable","scandaleux","exclusif","strip","tease","mort","meurt","accident","live","duplex","porno","sexe","string","sein","jeanmarcmorandini.com","nu", "sarkozy", "bidon","incroyable","exclusivit","gala","transsexuel","transexuel", "merde", "sexy");



    
    var banner=document.getElementsByTagName('div');
    banner[0].innerHTML = banner[0].innerHTML + '<div style="width: 950px;"><img src="http://hfr-rehost.net/http://self/pic/5a01526fd337cf316b40bdb471b88b6db1a83a01.jpeg" /></div>'
    
// On recupere la liste des ragots

    var newsListBig = document.getElementsByClassName('news-big');
    var newsList = document.getElementsByClassName('news-little');
    
// On evalue chaque news selon son degré de connerie   
//  
    function evaluer(news) {
     var compteur = 0;
        texte = news.getElementsByClassName('news-texte');
        texte2 = texte[0].innerHTML.toLowerCase();
        for (i in listeMarron) 
            if (texte2.match(listeMarron[i]) != null) compteur++;
        return compteur;
    }
    
 // On affiche
  
    for (i in newsListBig) {
        var tableau=newsListBig[i].getElementsByTagName('tr');
    
        var ajout='<td><span class="news-separateur">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td><td><img src="http://hfr-rehost.net/http://self/pic/d25e79fc07f301d6a79bbab042cfff068b56343d.jpeg" width="17" height="17" /></td><td><span class="news-texte"><font color="red"><b>'+evaluer(newsListBig[i])+'</b></font></span></td>';
        tableau[0].innerHTML=tableau[0].innerHTML+ajout;
       compteur=0;
    }
    
       for (i in newsList) {
        var tableau=newsList[i].getElementsByTagName('tr');
    
        var ajout='<td><span class="news-separateur">&nbsp;&nbsp;|&nbsp;&nbsp;</span></td><td><img src="http://hfr-rehost.net/http://self/pic/d25e79fc07f301d6a79bbab042cfff068b56343d.jpeg" width="17" height="17" /></td><td><span class="news-texte"><font color="red"><b>'+evaluer(newsList[i])+'</b></font></span></td>';
        tableau[0].innerHTML=tableau[0].innerHTML+ajout;
       compteur=0;
    }
    
 