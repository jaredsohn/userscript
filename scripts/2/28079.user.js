// ==UserScript==

// @name           o2.pl

// @include        http://www.o2.pl/

// @include        http://o2.pl/

// ==/UserScript==
//window.addEventListener("load", function(){



function byId(id){

  return document.getElementById(id);

}

function deleteIds(idout){

  for(var i=idout.length-1; i>=0; i--){

    byId(idout[i]).parentNode.removeChild(byId(idout[i]));

  }

}





byId("col_r").insertBefore(byId("sportfan"), byId("wiadomosci"));



ids = Array("header", "logowanie", "mbank", "naj", "pagefoot", "pgb");



deleteIds(ids);


//},false);