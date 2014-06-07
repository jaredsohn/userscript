// ==UserScript==
// @name       Структура кораблей FO
// @version    1.1
// @description  Структура кораблей флота в ФО
// @match      http://founders.icedice.org/g.php?m=fleet&a=ships_fleet&flid=*
// @copyright  2013+, LostAngel
// ==/UserScript==

var Div = document.getElementById("gamemiddle");
var Li = Div.getElementsByTagName("li");
var i, j, S;
var iOk, iNotOk, spans, iShipOk, iShipNotOk, damage;

for(i = 0; i < Li.length; i++) {
    spans = Li[i].getElementsByTagName("span");
    iNotOk = 0;
    iOk = 0;
    for(j = 0; j < spans.length; j++) {
        if(spans[j].getAttribute("class") == "ts-notok") {iNotOk = parseInt(spans[j].textContent, 10);}
        if(spans[j].getAttribute("class") == "ts-ok") {iOk = parseInt(spans[j].textContent,10);}
    }
    if(iNotOk == 0) {
        damage = 0;
    } else {
    	damage = iOk - iNotOk;
    }
    S = Li[i].innerHTML;
    j = S.indexOf('(');
    if(j >= 0) {
        iShipOk = parseInt(S.substr(j+1), 10);
        iShipNotOk = iShipOk - damage;
        if(damage ==0) {
        	S = S.substr(0, j)+'(<b><span class="ts-ok" title="для ремонта необходимо '+Math.ceil(damage/15000)+' дроидов">'+iShipNotOk+'</span>/<span class="ts-ok">'+iShipOk+"</span></b>)";
        } else {
        	S = S.substr(0, j)+'(<b><span class="ts-notok" title="для ремонта необходимо '+Math.ceil(damage/15000)+' дроидов">'+iShipNotOk+'</span>/<span class="ts-ok">'+iShipOk+"</span></b>)";
        }
        Li[i].innerHTML = S;
    }
}