// ==UserScript==
// @name             Free Mines Scanner [GW]
// @namespace        GW
// @description      Сканер бесхозных уранок на [Z] типа http://www.gw-zone.ru/lightmap/2/free/
// @include          http://www.ganjawars.ru/me/*
// @version          0.3
// @author           z0man
// ==/UserScript==
(function (){
var root=typeof unsafeWindow!='undefined'?unsafeWindow:window;
var responses=new Array();
var k=0;
var kEnd=0;
var findMines=0;
var freeMines=new Array();
var sector=new String();
var sectors=('sx=150&sy=149,Crystal Sector,sx=150&sy=150,Cyborg Capital,sx=152&sy=148,Cygnus Base,sx=151&sy=150,Energy One,sx=152&sy=151,Firecloud,sx=151&sy=152,Freedom End,sx=149&sy=152,Grand Port,sx=149&sy=150,Katenian,sx=152&sy=149,Kintull,sx=151&sy=149,Mind`s Eye,sx=149&sy=149,Power Lost,sx=149&sy=151,Surfear,sx=151&sy=151,Tyranny land,sx=150&sy=151,Victoria,sx=152&sy=152,Waterping').split(',');
for (var i=0;i<sectors.length;i++){
  sector=sectors[i+1];
  responses[k]=new XMLHttpRequest();
  responses[k].open('GET','http://www.ganjawars.ru/map.php?'+sectors[i]+'&bt=mine_uran');
  stateChange(k,sector);
  responses[k].send(null);
  i++;
  k++;
}
setTimeout(function(){insertInfo()},1000);
function insertInfo(){
  if (findMines>0 && k==kEnd){
    var td=root.document.getElementsByTagName('td');
    for (var i=0;i<td.length;i++){
      if (td[i].bgColor=='#d0eed0' && td[i].textContent.indexOf('Новости')!=-1){
        td[i].innerHTML='<div align="center"><nobr><b>Бесхозных уранок: '+findMines+'</b></nobr></div>';
        td[i].parentNode.nextSibling.nextSibling.childNodes[1].innerHTML=(freeMines.toString()).replace(/\,/ig,'<br>');
      }
    }
  } else {
    setTimeout(function(){insertInfo()},1000);
  }
}
function stateChange(i,sector){
  responses[i].onreadystatechange=function (){
    if (responses[i].readyState==4){
      if(responses[i].status==200){
        isFreeMines(responses[i].responseText,sector);
        kEnd++;
      } else {
        responses[i].abort();
      }
    }
  }
}
function isFreeMines(text,sector){
  var span=root.document.createElement('span');
  span.innerHTML=text;
  var tr=span.getElementsByTagName('tr');
  for (var i=0;i<tr.length;i++){
    if (tr[i].bgColor=='#ddffdd' && tr[i].textContent.indexOf('Клетки')!=-1){
      if (/<td class="wb" colspan="2"><a href="\/object.php\?id=\d+">.*?<\/a><\/td>/i.test(tr[i].parentNode.innerHTML)){
        sectorMines=tr[i].parentNode.innerHTML.match(/<td class="wb" colspan="2"><a href="\/object.php\?id=\d+">.*?<\/a><\/td>/ig);
        for (var j=0;j<sectorMines.length;j++){
          freeMines.push(/<a.*?<\/a>/i.exec(sectorMines[j].replace(/Урановый рудник/ig,'Урановый рудник в секторе '+sector)));
          findMines++; 
        }
      }
    }
  }
}
}());