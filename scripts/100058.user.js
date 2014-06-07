// ==UserScript==
// @name           Leni_sleep_in_fort
// @namespace      http://w1.public.beta.the-west.net
// @description    West: LenivetZ
// @description    Иконки зданий города, Лучшие_вещи - ver2
// @include        http://*.beta.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://forum.the-west.*     
// ==/UserScript==

add_kazarm = function (mir, id){
num = location.host.substr(0,4);
if (num!=mir) return;
fml = document.getElementById('footer_minimap_icon');
if (fml) fml = fml.parentNode;
if (fml) fml = fml.parentNode;
if (!fml) {setTimeout(add_kazarm,1000,mir,id);return}
var link = document.createElement('a');
link.setAttribute('href','javascript:AjaxWindow.show(\'fort_building_barracks\',{fort_id:'+id+'},\''+id+'\');');
link.innerHTML = "<img id=\"ico_kazarm_"+id+"\" alt=\"Спать в форте\" title=\"<B>Спать в форте</B>\" src=\"http://m1.weststats.com/images/jobs/con_artist.png\" />";
fml.appendChild(link);
};

add_kazarm('w1.p',62);