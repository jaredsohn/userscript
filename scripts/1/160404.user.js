// ==UserScript==
// @name        Andaloria Max FoV
// @description Setzt den main content nach oben und vergrößert das Sichtfeld der Map durch das ausblenden einiger Elemente. Entfernt scroll Leisten auf der Map und fügt Rechtsklick drag and scroll hinzu. 
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     http://marsh-mellow.de/anda/jquery.overscroll.js
// @include     http://game1.andaloria.de/*
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

GM_registerMenuCommand( "####Andaloria Max FuV####" );
GM_registerMenuCommand( "Ganze Seite maximieren" , function(){changeWhole()} );
GM_registerMenuCommand( "Nur Map maximieren" , function(){changeMap()} );


function changeWhole(){
GM_setValue('AndaMax', '1')
}

function changeMap(){
GM_setValue('AndaMax', '0')
}

AnMax = GM_getValue('AndaMax', '0');

ressback = 'data:image/png;base64,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';
food     = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAC/VBMVEVAQEDpl2lnUUaSQzLolnnalW1uOCxNRTL4//pvY0tXAAq6iW5jAxCEVUVbKSC6eV+cd1aPYj3NqJWuqJvoooJ0WTlJAwWRZlXUiGqRcV17SjvKhWulfGuugHhVBBHojmiPYl2Nb1RpWD7wnWtjMhyHbkhXFxRVPxxdQi2Of2BOCxRPHBnU2+HTlnrwn3DEhXNgISHAfGVqEhl4ZD5OEAbhjl9YEApnZFiSloheaDa9lY2pq6BtSzLr7eqxbVBMLQ1BQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///+U+mkSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVBhUUAjhnu6SBAAAA70lEQVR42tWQ63KCMBBGpYWEbhMCFqJGDAJiwN7QIr3Ymvd/q6aVzij6At2f35n5dvcMBv9niuJyHmnl+2gRnRM1SmMWhk6g+uQlrTlHU9vKb/UpqUohAdprx8pD55dlWbc4oxwIgZY52+3TD8PV7uaANAICAFyMTaVli3Lnfr12fS3hICVvmJ0nif08dN2HDiFJJLoHIsVjMmY0w3fu2wEV5ojVbC6BL6b7faBVhvGfBsGh/ohNZ8NYcHJ9IZaczhDfQLue9P769BrqLVcAm3XZUxX5w5hSz9T2ZRhRSuto4tUjlV5yX+Grefl+nHwDwUwYju8w+CYAAAAASUVORK5CYII=';
wood     = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAC/VBMVEVAQEC4hTyyejqFRBR2XEmsaTqihVOqfESokGWXZjxHLCFYORurhUtnVDmZe0e3iFajWTdaQC6laC+tfDuTVSSGRyCLW0KEaTqGTDeudD17QRmVhVtkSTi7e0uyfkFkTCh7aTyYSSp4SSeKc1gwFBCYVDKQdEVKHhSugzyyfkyEaUaMTyR8OBVmOypxVzuvcjS4fUCunW2kbjyReVeJVDSldjGxZyq2bD20fCmaYTGdcyeUaE2xd0VxUSKzg0RtLAhBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///+h5qX6AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVBhUUAhElCTztAAABJUlEQVR42rXQ2XaCMBAGYANilEVIAkoiBHFhkQhoa1u6JO//VrUXtsB9527Ol5yZfyaT/6h5nTiWtVrtku2YpmmaCmVTarDTiJzU81QHJTV2yZhC76hKCDSPrbMh7cMVq7gkTcDc9ZA201DQO2FRlcuRRVbQAiJ90VF7PR8QshaaRkomjBbOhgGcWrY3flXKaMhse+nTGRb8s8VKD2Iq7f6004dbSFhWOtYNTuysNw3Z9q3gLus03ZekyP5O8uQUUgKyUBj4+j0EzDa/S+yBBt5AoBqAWcc5h49NLmgPr7yJhf4CeODHrUaz5eObed4tnkPhvQL3yGKKm3kvt2nleWAc390q93wdZ1+zXoA6ipCJTDM/HEzzgIaHtFAd1dMI3d84P/03rvofaqXeOJgAAAAASUVORK5CYII=';
stone    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAC/VBMVEVAQEB3dHn59vrn5eucjGOEcldXVlprXVBqZnSFeGXa1uLm2dPOzNiFgYfY1NZ8ZkmmmY67t7zQzdJIRUR4a1WnpazKyc5zZ2ri3eNjYVzFw8t7cl1jYmZeWGJram5kY3DEwsXDuMBxb3VRTlVfVUONipHWy8uJgHZ3ckt8eX9qbWJLSk5fXF/OxMVqZGxQPyltZ2E/PUI1LzGgnqOVlJnY0MXs6e7z6OxAR0ZZUE/Nw8uenaWyrLbEu7wKBwpaTDVBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////lobo9AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVBhUUAhkr0rTfAAABJklEQVR42qWSy3qCMBCFDeggSESIIJcQaQBtFFGwpdpLeP+3sl1Aq7Wrzvb/zsyZMzMY/K9GWTu6D1qxU56z32CozVbOu+186Notsl5V1fES+2G6mt+gdvlmNNNk5xv+ZGZdqzBFXjN1bcc01TC+MoEFBuEptm0Yvumuh99oj4TgBeRKaIaJY6wf+3b6AoCUjAL2Qs97KkmHrMlL4x3LiiK+rZY5ItUh6uxNFMVX1CNHmENdBQWgDu0D4fqN0jCKOdumG8oXeqcScGJuwmUtEKNsE+RxrzqwZfE5oJYMC1TEvNR6VVugMVS8kiQXnECKo6hfKyMxUAZSjinACXLtR5BtGhyCWsozTRnfkki/Cliff7VO03F+bu9e9FzXi+yPN7Dm/RdcAJaoIItlIAeuAAAAAElFTkSuQmCC';
iron     = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAC/VBMVEVAQEBTSDhMTEwpKClTU1J3aUpIQjdaUkRCQkEUFBRcXV1jYVY7PDtkY2VqbGo7QTlyc2xMS0NmVz00MjVnXEo6NCc8O0UzLCZXS0ECAgFES0MvLzBpaWZESkxfYV1cWmJPUFA5ODptcWlaW1kzMj42OTVMRkM8RkJWVlc5OTJVSDAdHRw/PkBQT1RISEd3c4GBgYF0YkMjHA1KUjsiIiJwcHGEbklXWVtfVTpdV1NrZEplYm1vbW1mZ2NIPCp4eHlBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///9IvDu4AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVBhUUAix9YXD8AAABKklEQVR42qXS23KCMBAAUEm4JIiFiHIRxESlRpOm1UKtrcD//1VpH6Lt8NZ92pkzs5fZHY3+F9NDkrTWICWPYMHaITm2F1qunMF68+tD8Tl+HxK767rnzpn9lXkMLy4/rybkdPrdz4hZmBdNPcnXcRxP78Sasyiq843pFg/eNrTv6JCBKGqCdRcE6+V2G9/R60t35QJjISCWQWOPtXz4BVCywmmKIQwVsG/bOWrCXa7KNJVlKBEht2YGd4FCwBTYRIArRcibptWGUwC4RLlJn84u2R91QVllHoMiFaLKIBS40mTtYeghINN+jqzHKtNLWz6lFNR1P2LpMoYYO+hLSW/pNmaBUrGg/m6589vbESnykEcQlKapVJ9rmhoXx5k5iW0b39G2xs8ffAH69x9o0pENTgAAAABJRU5ErkJggg==';
goldimg  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAC/VBMVEVAQEB8RQOLcTzWrCqziiCldjnWpjlXOBHJmDbksUihdSLUq05iShv0yWh6XjaLWQm1jTOdZhpqRQ5wPANYNARkSSp2UBF/ZzPLmlblqkXHjDOKZRhyVSdaPxJGJQd/TQi1fTadbg/uu1SGVh1HMgQ8HQJ/TxlRKQLBhSTElCjgsS7SniTJojHYsDu6iA26kjOqgSnQnDm+lEZ0UTltUBxhQSpAHwNUNx7npFWugTeJUSJrUyL21oHCkB2ufRaVeUxBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8D0oGhAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVBhUUAjPwaX0JAAAA+klEQVR42t3Q2XKCMBQGYGIgYKIGEnBtDIvs4Ipa2ya+/1v1omqdTvsCPXfnfPPPmfkN4z/M1c5F8DvZiZecz4fjaTV5Pk/s1Sp9Az5LczZh/uBbXsYL7Y2XDJuaM2uL/Yf0WKSLOQZYR4UjwxDwwyNkbTWQnDulLkzJqara4eiLRhbli4vFvVmxczl47a/Vx42MUxdO+xBJSgHPw7hCqB7eSFwKMt1v9n4yjyloYFXB3o06jGBjuoRqiFoalTWMxT1FauSQZiPxWukom7o4u/8akHjXoNiTpaqVtwzen9oQhMDWSndKlbPsR7WdEGfDOFp40f1RfiCe10+59BoadbEZqgAAAABJRU5ErkJggg==';


GM_addStyle("#rohstoffe {box-shadow: inset 1px 8px 4px -6px #000; color:white; text-shadow: 2px 2px 2px #000;  position: absolute; top:50px; left:0px; padding-left: 2px; padding-right: 2px; font-weight:bold; background-image: url('"+ressback+"'); background-color: white; z-Index:1;}");

jQuery.noConflict();


// map sichtfeld maximieren
scrHe = window.innerHeight;


if(AnMax=='1' || document.getElementById('map')){
document.getElementById('top').style.display = 'none';
document.getElementById('menu').style.top = '0px';
document.getElementById('body').style.top = '50px';
document.getElementById('left').style.display = 'none';
document.getElementById('right').style.display = 'none';
   }

if(document.getElementById('map')){
document.getElementById('map').style.height = scrHe+'px';
document.getElementById('map').style.top = '0px';
document.getElementById('map').style.padding = '50px 0px 0px 70px';
document.getElementById('map').style.margin = '0px 0px 80px 0px';


// map zentrieren
jQuery("document").ready(function(){
jQuery("#map").scrollTop(jQuery("#map").scrollTop() - 110);
jQuery("#map").scrollLeft(jQuery("#map").scrollLeft() - 50);
})


// scrolling
jQuery("document").ready(function(){
jQuery("#map").overscroll();
});


// rechtsklick menu entfernen
if(document.getElementById('map')){
jQuery("document").ready(function(){
  document.oncontextmenu = function() {return false;};

  jQuery("document").mousedown(function(e){
    if( e.button == 2 ) { 
      return false;
    } 
    return true;
  }); 
});
  }

}


   if(AnMax=='1' || document.getElementById('map')){
// rohstoffe
nahrung = document.getElementById('towngoods4').innerHTML;
holz    = document.getElementById('towngoods5').innerHTML;
stein   = document.getElementById('towngoods6').innerHTML;
eisen   = document.getElementById('towngoods7').innerHTML;
gold    = document.getElementById('towngoods8').innerHTML;


var goods = "";
goods += "<div width='100%' height='100%' style='cellspacing='0px' cellpadding='0px'> ";
goods += "<table width='130%'>";
goods += "<tr><td id='rohstoffe' align='center'> &nbsp;<img src='"+food+"'> " +nahrung+ " <img src='"+wood+"'> "+holz+" <img src='"+stone+"'> "+stein+" <img src='"+iron+"'> "+eisen+" <img src='"+goldimg+"'> "+gold+ " &nbsp;</td></tr>";
goods += "</table>";
goods += "</div>";
divgoods = document.createElement('div');
divgoods.id = 'goods';
divgoods.style.display = "block";
divgoods.innerHTML = goods;
document.body.appendChild(divgoods);
   }

