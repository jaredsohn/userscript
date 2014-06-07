// ==UserScript==
// @name           Watch-Movies.net IMDB link adder
// @namespace      http://steeev.freehostia.com
// @description    Add links to imdb.com + rottentomatoes.com on watch-movies.net listings pages
// @author         Steeev http://steeev.freehostia.com
// @version        1.11 - 7th/dec/2007
// @include        http://*watch-movies.net/*
// ==/UserScript==

ais=unsafeWindow.document.getElementsByTagName('a');
//alert(ais.length);

for (i=0;i<ais.length;i++) {
  if (ais[i].textContent!='' && (ais[i].textContent.replace("\"",'','g').length > 1) && (!ais[i].href.match(/#comments/))) {
    if (ais[i].getAttribute('href').match(/\/movies\//)) {  
        mtitle=encodeURIComponent(ais[i].textContent.replace("\"",'','g'));
     
      imdblinkspan=document.createElement('span');
      imdblink=' <a style="color:grey !important; font-size:9px !important" target=new href="http://imdb.com/find?s=tt&q=' +  mtitle +'">' + 'IMDB'  + '</a>'; //ais[i].textContent + ' @ 
      imdblink+=' | <a style="color:grey !important; font-size:9px !important" target="new" href="http://www.rottentomatoes.com/search/full_search.php?search=' +  mtitle +'">' + 'RT'  + '</a>'; 
      //imdblink+=' | <a target="new" href="http://www.metacritic.com/search/process?sort=relevance&termType=all&ty=1&x=0&y=0&ts=' +  mtitle +'">' + 'MC'  + '</a>'; 

      imdblinkspan.innerHTML=imdblink;
      ais[i].parentNode.insertBefore(imdblinkspan, ais[i].nextSibling);
    }
  }
}