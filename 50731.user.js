// ==UserScript==
// @name           plemiona/tribalwars - Podświetlanie surowców w przeglądzie
// @description    ...
// @include        http://*.plemiona.pl/game.php*screen=overview_villages*
// @include        http://*.tribalwars.net/game.php*screen=overview_villages*
// ==/UserScript==


// wykonał zegarek84
// mail:gn84@interia.pl



({
color:{
  20:'black',
  40:'green',
  60:'blue',
  80:'orange',
  90:'pink',
  100:'red'
  },

podaj_color:function(surowiec,max){procent=~~(surowiec*100/max);for(p in this.color)if(p>=procent) return this.color[p];},
zmien:function(liczba){text=''+liczba,znakow=text.length-3;return (znakow<=0)?liczba:text.substr(0,znakow)+'.'+text.substr(-3);},
start:function(){
      dl=''+document.location.href;
      d=document;
      ile_tabel=d.getElementsByClassName('vis').length;
 for(i=0;i<ile_tabel;++i)if(typeof(d.getElementsByClassName('vis')[i].getElementsByTagName('th')[0])=='object'){tabela=d.getElementsByClassName('vis')[i];break;}; 

      tr=tabela.getElementsByTagName('tr');    
      ile_wsi= tr.length; 
  for(j=1;j<ile_wsi;++j){
    surka=tr[j].getElementsByTagName('td')[2];
    spichlerz=~~tr[j].getElementsByTagName('td')[3].firstChild.nodeValue;      
    sur_string=surka.innerHTML.replace(/(?:<.+?>|\.)/g,'');
    surowce=/([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)/.exec(sur_string);delete(surowce[0]);
    for(i=1;i<=3;++i)surowce[i]=~~surowce[i];
    surka.innerHTML='<img src="/graphic/holz.png?1" title="Drewno" alt="" /><span style="color:'+this.podaj_color(surowce[1],spichlerz)+'">'+this.zmien(surowce[1])+'</span> <img src="/graphic/lehm.png?1" title="Glina" alt="" /><span style="color:'+this.podaj_color(surowce[2],spichlerz)+'">'+this.zmien(surowce[2])+'</span> <img src="/graphic/eisen.png?1" title="Żelazo" alt="" /><span style="color:'+this.podaj_color(surowce[3],spichlerz)+'">'+this.zmien(surowce[3])+'</span>';}
 }
}).start()