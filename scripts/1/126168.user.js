// ==UserScript==
// @name           Filmiveeb
// @namespace      http://userscripts.org/users/436650
// @description    Lisab www.filmiveeb.ee lehele lingi subclub.eu jutu otsingule.
// @version        1.1
// @include        http*://www.filmiveeb.ee/*
// ==/UserScript==

// function from http://osblues.com/2009/11/11/javascript-getelementsbycontent/
var gbc=function(contents,tag){
  var n=[];var s=tag||'*';
  var b=document.getElementsByTagName(s);
  var r=new RegExp(contents,'ig');
  for(var i=0;i<b.length;i++){
    for(var t=0;t<b[i].childNodes.length;t++){
      if(b[i].childNodes[t].nodeType==3&&r.test(b[i].childNodes[t].textContent)){
        n.push(b[i]);
        break;
      }
    }
  }
  return n;
}

var imdbUrl = ""+gbc('IMDB','a')+"";
var splitter = imdbUrl.split('/');
if (splitter[4]) {
	var lingid = document.getElementsByClassName('movies_share');
	var subclub = document.createElement("div");
	subclub.innerHTML = '<h1>Subtiitrid</h1><ul><li><a href="http://www.subclub.eu/jutud.php?otsing=' + splitter[4] + '&tp=kood" target="_blank">Subclub</a></li></ul>';
	lingid[0].parentNode.insertBefore(subclub, lingid[0].nextSibling);
}
