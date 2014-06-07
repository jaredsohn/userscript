// ==UserScript==
// @name       Debuff
// @namespace  kuai_lai_shi_shi_zhe_dui_ce.org
// @version    0.1
// @description  对策
// @match      http://hentaiverse.org/*
// @copyright  nobody
// ==/UserScript==
var alive_monsters = document.querySelectorAll('.btm1[onmouseout="battle.unhover_target()"]');
var mon_name = new Array();
var alive_mon_ID = new Array();
var t = 0
for (var a =0; a<alive_monsters.length; a++)
{
    var name = alive_monsters[a].getElementsByClassName("btm3")[0].innerText;
    mon_name[t] = name;
    t++;
    alive_mon_ID[a]= alive_monsters[a].id;
}

for(var b=0; b<alive_monsters.length; b++)
{
    var weakened = alive_monsters[b].getElementsByClassName("btm6")[0].innerHTML.indexOf("'Weakened'");
    var silenced = alive_monsters[b].getElementsByClassName("btm6")[0].innerHTML.indexOf("'Silenced'");
    if(mon_name[b].indexOf("In Memory Of")>=0)
    {
        if(document.getElementById(232).style.opacity !=0.5 && silenced<0)
        {
          document.getElementById(232).click();
          document.getElementById(alive_mon_ID[b]).click();
        }
        else if(weakened<0)
        {
            document.getElementById(212).click();
            document.getElementById(alive_mon_ID[b]).click();
            console.log(alive_mon_ID[b]);
        }
    } 
}
