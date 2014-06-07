// ==UserScript==

// @name           Alluc.org IMDB link adder

// @namespace      http://steeev.f2o.org

// @description    Add links to imdb.com + rottentomatoes.com on alluc.org listings pages
// @author         Steeev http://steeev.f2o.org
// @version        1.0 - 30th/apr/2007
// @include        http://*alluc.org/*
// @exclude        http://*alluc.org/alluc/movies.html?view=genres

// ==/UserScript==



ais=unsafeWindow.document.getElementsByTagName('a');
for (i=0;i<ais.length;i++) {//i<
  if (ais[i].textContent!=='') {
    if (ais[i].getAttribute('href').match(/\?action=getviewcategory/)) {  

      imdblinkspan=document.createElement('span');
      imdblink=' <a style="color:grey !important; font-size:9px !important" target=new href="http://imdb.com/find?s=tt&q=' +  encodeURIComponent(ais[i].textContent.replace("\n",'')) +'">' + 'IMDB'  + '</a>'; //ais[i].textContent + ' @ 
      imdblink+=' | <a style="color:grey !important; font-size:9px !important" target="new" href="http://www.rottentomatoes.com/search/full_search.php?search=' +  encodeURIComponent(ais[i].textContent) +'">' + 'RT'  + '</a>'; 
      //imdblink+=' | <a target="new" href="http://www.metacritic.com/search/process?sort=relevance&termType=all&ty=1&x=0&y=0&ts=' +  ais[i].textContent +'">' + 'MC'  + '</a>'; 

      imdblinkspan.innerHTML=imdblink;
      ais[i].parentNode.insertBefore(imdblinkspan, ais[i].nextSibling);
      //imdblink.setAttribute('style','filter:wave(add=true, freq=1, lightstrength=3, phase=0, strength=5)');
      //ais[i].parentNode.innerHTML+=imdblink;
    }
  }
}
