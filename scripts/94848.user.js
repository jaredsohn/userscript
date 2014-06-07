// ==UserScript==
// @name           Weblabor - Hozzászólás szám
// @namespace      http://userscripts.org/users/278811
// @description    Elõzöleg látott hozzászólások száma a nyitó lapon
// @include        http://weblabor.hu/
// @include        http://weblabor.hu/forumok/temak/*
// @exclude        http://weblabor.hu/forumok/temak/*/hozzaszolas*
// @include        http://weblabor.hu/blogmarkok/*
// @exclude        http://weblabor.hu/blogmarkok/*/hozzaszolas*
// @include        http://www.weblabor.hu/
// @include        http://www.weblabor.hu/forumok/temak/*
// @exclude        http://www.weblabor.hu/forumok/temak/*/hozzaszolas*
// @include        http://www.weblabor.hu/blogmarkok/*
// @exclude        http://www.weblabor.hu/blogmarkok/*/hozzaszolas*
// @version        0.3
// ==/UserScript==

// a hivatkozások után írandó szöveg stílusa
GM_addStyle(
  'a.ujhozzaszolas,span.ismeretlen { font-size: smaller; margin-left: 5px; }'+
  'a.ujhozzaszolas { color: black; font-weight: bold; }'+
  'span.ismeretlen { color: gray; }'
)

// mennyi idõ után törlödjenek az elmentett hozzászólás számok (ezredmásodpercben)
var elevules=3*30.5*24*60*60*1000 // úgy 3 hónap

// aktuális lapnak megfelelõ mûvelet
if (document.location.pathname=='/') { // nyító lap - hozzászólás szám megjelenítés

// forum
  var lista=document.querySelectorAll('div#block-forum-0 ul a, div#block-forum-1 ul a')
  for (var i=0,l=lista.length;i<l;i++) {
    if (!lista[i].title) continue // egyáltalán nincs hozzászólás

    var szal=lista[i].href.replace(/.*\/forumok\/temak\//,'')
    var ertek=GM_getValue('szal_'+szal)
    if (ertek==undefined) { // nincs elmentett hozzászólás szám
      var span=document.createElement('span')
      lista[i].parentNode.appendChild(span)
      span.className='ismeretlen'
      span.innerHTML='(?)'
      continue
    }

    var [szam,datum]=ertek.split(' ')
    var most=lista[i].title.replace(/\D/g,'')
    if (most==szam) continue // nincs új hozzászólás

    var a=document.createElement('a')
    lista[i].parentNode.appendChild(a)
    a.className='ujhozzaszolas'
    a.href=lista[i].href.substring(location.href.length-1)+'#new'
    a.title=new Date(parseInt(datum,10))+' óta'
    a.innerHTML='('+(most-szam)+' új)'
  }

// blogmark
  lista=document.querySelectorAll('div#block-blogmark-0 ul a.comment-count')
  for (var i=0,l=lista.length;i<l;i++) {
    if (lista[i].textContent=='(0)') continue // egyáltalán nincs hozzászólás

    var mark=lista[i].href.replace(/.*\/blogmarkok\//,'')
    var ertek=GM_getValue('mark_'+mark)
    if (ertek==undefined) { // nincs elmentett hozzászólás szám
      var span=document.createElement('span')
      lista[i].parentNode.appendChild(span)
      span.className='ismeretlen'
      span.innerHTML='(?)'
      continue
    }

    var [szam,datum]=ertek.split(' ')
    var most=lista[i].textContent.replace(/\D/g,'')

    if (most==szam) continue // nincs új hozzászólás

    var a=document.createElement('a')
    lista[i].parentNode.appendChild(a)
    a.className='ujhozzaszolas'
    a.href=lista[i].href.substring(location.href.length-1)+'#new'
    a.title=new Date(parseInt(datum,10))+' óta'
    a.innerHTML='('+(most-szam)+' új)'
  }

} else if (document.location.pathname.substring(0,15)=='/forumok/temak/') { // fórum szál - hozzászólás szám mentés

  var szal=document.location.pathname.substring(15)
  var szam=document.querySelectorAll('div.commentnum').length
  var most=new Date().getTime()
  GM_setValue('szal_'+szal,szam+' '+most)

} else if (document.location.pathname.substring(0,12)=='/blogmarkok/') { // blogmark - hozzászólás szám mentés

  var szal=document.location.pathname.substring(12)
  var szam=document.querySelectorAll('div.commentnum').length
  var most=new Date().getTime()
  GM_setValue('mark_'+szal,szam+' '+most)

}

// elévült hozzászólás számok törlése
var most=new Date().getTime()
var torles=GM_getValue('torles')
if (torles!=undefined && most-torles<24*60*60*1000) return // kevesebb mint 1 napja volt törlés

torles=parseInt(torles,10)
var lista=GM_listValues()
for (var i=0,l=lista.length;i<l;i++) {
  if (lista[i].substring(0,5)!='szal_' && lista[i].substring(0,5)!='mark_') continue // ez nem hozzászólás szám

  var ertek=GM_getValue(lista[i])
  var datum=ertek.replace(/.* /,'')
  if (most-datum<elevules) continue // még nem évült el

  GM_deleteValue(lista[i])
}

GM_setValue('torles',''+most)
