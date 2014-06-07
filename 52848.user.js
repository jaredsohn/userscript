// ==UserScript==
// @name Pennergame StadtPortal blockt bild und stellt wieder das menü her
// @namespace   1334769[Bande:Arschbackenhoernchen]by newman by basti1012
// @description    Zeigt im StadtPortal wieder das Seitenmenue an und blockt das schöne bild die tolle erfindung von pennergame
// @include        http://*pennergame.de/city/
// ==/UserScript==

document.getElementsByClassName('listshop')[0].removeChild(document.getElementsByClassName('listshop')[0].getElementsByTagName('script')[0]);
document.getElementById('content').removeChild(document.getElementById('content').getElementsByTagName('script')[0]);
document.getElementsByClassName('listshop')[0].removeChild(document.getElementsByClassName('listshop')[0].getElementsByTagName("object")[0]);
for(i=0;i<document.getElementsByTagName('table').length;i++){
   document.getElementsByTagName('table')[i].style.width = "565px";
   document.getElementsByTagName('td')[0].style.width = "565px";
   document.getElementById('Layer').style.width = "548px";
}
document.getElementById('content').innerHTML =
'<br><div class="submenu_shop"><div class="submenu_shop"><div class="top"></div><div class="content">'+
'<ul>'+
'<li><a href="/city/map/" alt="Stadtkarte" title="Stadtkarte">Stadtkarte</a></li>'+
'<li><a href="/city/district/" alt="Stadtteile" title="Stadtteile">Stadtteile</a></li>'+
'<li><a href="/city/home/" alt="Eigenheim" title="Eigenheim">Eigenheim</a></li>'+
'<li><a href="/city/scrounge/" alt="Schnorrplatz" title="Schnorrplatz">Schnorrplatz</a></li>'+
'<li><a href="/city/games/" alt="Gl&uuml;cksspiele" title="Gl&uuml;cksspiele">Gl&uuml;cksspiele</a></li> '+
'<li><a href="/city/weapon_store/" alt="Waffenladen" title="Waffenladen">Waffenladen</a></li>'+
'<li><a href="/city/pet_store/" alt="Tierhandlung" title="Tierhandlung">Tierhandlung</a></li>'+
'<li><a href="/city/supermarket/" alt="Supermarkt" title="Supermarkt">Supermarkt</a></li>'+
'<li><a href="/city/music_store/" alt="Musikladen" title="Musikladen">Musikladen</a></li>'+
'<li><a href="/city/stuff/" alt="Zubeh&ouml;r" title="Zubeh&ouml;r">Zubeh&ouml;r</a></li>'+
'<li><a href="/city/medicine/" alt="Medizin" title="Medizin">Medizin</a></li>'+
'<li><a href="/city/washhouse/" alt="Waschhaus" title="Waschhaus">Waschhaus</a></li>'+
'</ul>'+
'</div><div class="buttom"></div></div></div>'+
document.getElementById('content').innerHTML;
// copyright by diamonddog  by newman  und by bast1012