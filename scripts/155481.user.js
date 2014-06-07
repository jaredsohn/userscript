// ==UserScript==
//
// @name           Software lenting manage sort by dep.
// @description    sort user by dep.
// @namespace      Extend_Software_Admin
// @author         PinGu
// @authorURL      http://plurk.com/pingu8007
// @version        1.0
// @include        http://apserver.cc.ntnu.edu.tw/software/Admin/Admin?action=CheckList*
//
// ==/UserScript==
//And of course your code!!
depHPE = document.createElement('A');
depHPE.href="javascript:(function(){if(depHPE.innerHTML=='tr.HePingE{}'){depHPE.innerHTML='tr.HePingE{display:none}'}else if(depHPE.innerHTML=='tr.HePingE{display:none}'){depHPE.innerHTML='tr.HePingE{}'}})()";
depHPE.innerText="%E5%9C%96%E6%9B%B8%E9%A4%A8%E6%A0%A1%E5%8D%80";
document.getElementsByTagName('strong')[0].appendChild(depHPE);

depGG = document.createElement('A');
depGG.href="javascript:(function(){if(depGG.innerHTML=='tr.GongGuan{}'){depGG.innerHTML='tr.GongGuan{display:none}'}else if(depGG.innerHTML=='tr.GongGuan{display:none}'){depGG.innerHTML='tr.GongGuan{}'}})()";
depGG.innerText="%E5%85%AC%E9%A4%A8%E6%A0%A1%E5%8D%80";
document.getElementsByTagName('strong')[0].appendChild(depGG);

depLK = document.createElement('A');
depLK.href="javascript:(function(){if(depLK.innerHTML=='tr.LinKou{}'){depLK.innerHTML='tr.LinKou{display:none}'}else if(depLK.innerHTML=='tr.LinKou{display:none}'){depLK.innerHTML='tr.LinKou{}'}})()";
depLK.innerText="%E6%9E%97%E5%8F%A3%E6%A0%A1%E5%8D%80";
document.getElementsByTagName('strong')[0].appendChild(depLK);


depHPE = document.createElement('style');
depHPE.id='depHPE';
depHPE.innerHTML= 'tr.HePingE{}';
document.head.appendChild(depHPE);
depGG = document.createElement('style');
depGG.id='depGG';
depGG.innerHTML= 'tr.GongGuan{}';
document.head.appendChild(depGG);
depLK = document.createElement('style');
depLK.id='depLK';
depLK.innerHTML= 'tr.LinKou{}';
document.head.appendChild(depLK);


counter = document.getElementById('pl').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
for (i=0;i<counter;i++){
target = document.getElementById('pl').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
target.className="";
switch (target.getElementsByTagName('td')[8].innerText){
case "%E5%9C%96%E6%9B%B8%E9%A4%A8%E6%A0%A1%E5%8D%80":
target.classList.add("HePingE");
lastserial=target.getElementsByTagName('td')[1].innerText;
lastcase="HePingE";
break;
case "%E5%85%AC%E9%A4%A8%E6%A0%A1%E5%8D%80":
target.classList.add("GongGuan");
lastserial=target.getElementsByTagName('td')[1].innerText;
lastcase="GongGuan";
break;
case "%E6%9E%97%E5%8F%A3%E6%A0%A1%E5%8D%80":
target.classList.add("LinKou");
lastserial=target.getElementsByTagName('td')[1].innerText;
lastcase="LinKou";
break;
case "":
if (target.getElementsByTagName('td')[1].innerText==lastserial) {
target.classList.add(lastcase);
}
break;
}
}