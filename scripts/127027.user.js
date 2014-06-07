// ==UserScript==
// @name          KingsAge Navigator
// @namespace     http://userscripts.org
// @description   Navigate in kingsage using links
// @include  http://s*.kingsage.*/*
// ==/UserScript==

src = function(villageID){
  village=document.URL.match("(village=[0-9]+)")[0]; 
  newVillage=document.URL.replace(village,"village=" + villageID);
  return newVillage;
}

doit = function(){

clusters = {c1 : {Zamboria:812,Snipers:656,Treadmill:986},
            c2 : {Spikes:1154,Flutes:2243,Venice:1596},
            c3 : {Ghost:1400,Strikes:932,Exile:726}};

  d = document;
  container = d.createElement('div');
  container.id = "container";
  container.setAttribute("style", "position:fixed;top:10px;width: 130px;height: 610px;z-index: 100;left: 10px;");
  d.getElementsByTagName('body')[0].appendChild(container);
  for( var c in clusters ){
    for( var v in clusters[c] ){
      name = v;
      id = clusters[c][v];
      link = src( id );
      a = d.createElement('a');
      a.setAttribute("style", "background-color: wheat;position: relative;z-index: 200;font-size: 14px;color: blue; float:left;line-height: 15px; clear:left;");
      a.href=link;
      a.innerHTML=name;
      container.appendChild(a);
      container.appendChild( d.createElement('br') );
    }
    container.appendChild( d.createElement('br') );
  }

}

if( window.top == window ) doit();