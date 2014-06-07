// ==UserScript==
// @name        F1 hír elrejtő
// @namespace   http://userscripts.org
// @description Elrejti a Forma1-es híreket (sportgeza.hu-s) az index.hu kezdőoldaláról. (Ha lemaradtál volna az élő adásról, de nem bírod ki addig hírolvasás nélkül)
// @include     http://index.hu/*
// @include     http://www.index.hu/*
// @version     1.04
// @grant       none
// ==/UserScript==

/*

var cRegiClass=null,cRegiStyle=null;if(document.URL.indexOf('cross_site')==-1&&document.URL.indexOf('http://index.hu/index2')==-1){F1HirCreate();}
function F1HirCreate(){var oStyle=document.createElement('style');oStyle.setAttribute('type','text/css');oStyle.innerHTML='.tiltottHir{transition:text-shadow 1s;color:rgba(0,0,0,0);text-shadow: 0px 0px 4px #000, 0px 0px 10px #000;}'+'.tiltottHir:hover{text-shadow: 0px 0px 0px #000;}'+'.tiltottHir > .ajanlo {display:none;}';document.getElementsByTagName('head')[0].appendChild(oStyle);var dDate=new Date(),lMutat=true;do{continue;}while(!document.getElementById('content'))
if(dDate.getDay()==5||dDate.getDay()==0){f1HirElrejto();lMutat=false;}
do{continue;}while(!document.getElementById('page_wrapper'))
F1HirCreatePanel(lMutat);}
function F1HirCreatePanel(lMutat){var oF1Opciok=document.createElement('div'),cColor,cInnerHTML;if(lMutat){cColor='green';cInnerHTML='F1 megjelenítve'}else{cColor='red';cInnerHTML='F1 elrejtve'}
oF1Opciok.setAttribute('style','position:absolute; left:-2.6em; top:70px; height:2.6em; padding-left:0.8em; padding-right:1em; width:0.8em;'+'background-color:#dedede; text-align:left; line-height:2.6em; color:'+cColor+'; font-size:1.4em; font-style:italic; overflow:hidden;'+'transition: width 0.2s ease-out, left 0.2s ease-out; -webkit-transition: width 0.2s ease-out, left 0.2s ease-out; cursor:pointer; z-index:99;');oF1Opciok.innerHTML=cInnerHTML;oF1Opciok.onmouseover=function(){if(oF1Opciok.style.color=='red'){oF1Opciok.style.width='5em';oF1Opciok.style.left='-6.8em';}else{oF1Opciok.style.width='8em';oF1Opciok.style.left='-9.8em';}};oF1Opciok.onmouseout=function(){oF1Opciok.style.width='0.8em';oF1Opciok.style.left='-2.6em';};oF1Opciok.onclick=function(){if(oF1Opciok.style.color=='red'){oF1Opciok.style.color='green';oF1Opciok.innerHTML='F1 megjelenítve';oF1Opciok.style.width='8em';oF1Opciok.style.left='-9.8em';f1HirMutato();}else{oF1Opciok.style.color='red';oF1Opciok.innerHTML='F1 elrejtve';oF1Opciok.style.width='5em';oF1Opciok.style.left='-6.8em';f1HirElrejto();}};document.getElementById('page_wrapper').appendChild(oF1Opciok);}
function f1HirElrejto(){var cTiltoURL="forma1",aHirek=document.getElementsByClassName('anyag'),nLen=aHirek.length,nLen2=null;for(var i=0;i<nLen;i++){var aAktGyerek=aHirek[i].getElementsByTagName('a');nLen2=aAktGyerek.length;if(nLen2<1)continue;var cHref=aAktGyerek[0].getAttribute('href');if(cHref.indexOf(cTiltoURL)>-1){cRegiClass=cRegiClass||(aHirek[i].getAttribute('class')||'');aHirek[i].setAttribute('class',cRegiClass+' tiltottHir');cRegiStyle=cRegiStyle||(aHirek[i].getAttribute('style')||'');aAktGyerek[0].setAttribute('style',cRegiStyle+' color:rgba(0,0,0,0);');}}}
function f1HirMutato(){var aHirek=document.getElementsByClassName('tiltottHir'),nLen=aHirek.length,aAktGyerek=null,nLen2=null;for(var i=0;i<aHirek.length;){aAktGyerek=aHirek[i].getElementsByTagName('a');nLen2=aAktGyerek.length;if(nLen2<1)continue;aAktGyerek[0].setAttribute('style',cRegiStyle);aHirek[i].setAttribute('class',aHirek[i].getAttribute('class').replace('tiltottHir',''));}}


*/