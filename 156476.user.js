// ==UserScript==
// @name        法杖的虚拟强化计算
// @namespace   hentaiversegamexn
// @icon         http://g.e-hentai.org/favicon.ico
// @match       http://hentaiverse.org/pages/showequip.php*
// @version     1
// ==/UserScript==

var eqpan = document.createElement('xnjs');
eqpan.onclick=jsgc
eqpan.innerHTML='虚拟强化值计算'
eqpan.style.cssText = "font-size:15px;color:black; left:110px ;text-align:left";
equ=document.getElementById('equipment')
document.body.appendChild(eqpan);
temp=document.querySelector("#equipment").innerHTML
function jsgc(){
c=''
yuanshi=prompt("要替换的数值是多少?")
c+='当前值:'+yuanshi
yuandengji=prompt("现在强化多少级了?如果没有强化过请填0")
xunidengji=prompt("你希望强化到多少级?")
tihuan=yuanshi/(1+yuandengji/100)*(1+xunidengji/100)
tihuan=tihuan.toFixed(2)
c+='虚拟值:'+tihuan+'\n'
tihuan='>'+tihuan
yuanshi='>'+yuanshi
temp=temp.replace(yuanshi,tihuan)
document.querySelector("#equipment").innerHTML=temp
document.body.appendChild(eqpan);
}