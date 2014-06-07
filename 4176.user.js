// ==UserScript==
// @name           PrinceCharlesCinema IMDB link adder
// @namespace      http://steeev.f2o.org
// @description    Add links to imdb.com + rottentomatoes.com on PCC (prince charles cinema, london) listings pages
// @author         Stephen Fernandez http://steeev.f2o.org
// @version        2.0 - 14/dec/2006
// @include        http://www.princecharlescinema.com/*
// @include        http://princecharlescinema.com/*
// ==/UserScript==

/*
 include        http://www.princecharlescinema.com/scripts/daily.php/*
 include        http://princecharlescinema.com/scripts/daily.php/*
*/

ais=unsafeWindow.document.getElementsByTagName('a');
for (i=0;i<ais.length;i++) {//i<
  if (ais[i].textContent!=='') {
    if (ais[i].getAttribute('href').match(/display\.php/)) {  

      imdblinkspan=document.createElement('span');
      imdblink=' (<a target=new href="http://imdb.com/find?s=tt&q=' +  ais[i].textContent.replace("\n",'') +'">' + 'IMDB'  + '</a>'; //ais[i].textContent + ' @ 
      imdblink+=' | <a target=new href="http://www.rottentomatoes.com/search/full_search.php?search=' +  ais[i].textContent +'">' + 'RT'  + '</a>)'; 
      imdblinkspan.innerHTML=imdblink;
      ais[i].parentNode.insertBefore(imdblinkspan, ais[i].nextSibling);
      //imdblink.setAttribute('style','filter:wave(add=true, freq=1, lightstrength=3, phase=0, strength=5)');
      //ais[i].parentNode.innerHTML+=imdblink;
    }
  }
}
