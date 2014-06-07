// ==UserScript==
// @name       nCore Reklámszűrő
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Leszedi a felső és alsó reklám Bannereket, a kinyíló füleket is állandóan pásztázza.
// @match      https://ncore.cc/torrents.php*
// @copyright  2012+, Szombathelyi Béla
// ==/UserScript==

//2014-01-11-kor működött

var div_ek=document.getElementsByTagName('div');
for (i in div_ek)
	if(div_ek[i].className!= undefined && div_ek[i].className=="banner")
    	div_ek[i].parentNode.removeChild(div_ek[i]);

var str="http://2coal.com/";
var hossz=str.length;
var a_k;

function urit(){
     a_k=document.getElementsByTagName('a');
        for (i in a_k) {
            if(a_k[i].href != undefined && a_k[i].href.substring(0,hossz)==str){
               a_k[i].parentNode.removeChild(a_k[i]);
            }
        }
}
//Ha szaggatna a géped akkor azt a 10-est írd át nagyobbra
setInterval(function(){urit();},10);