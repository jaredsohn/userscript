// ==UserScript==
// @name           Weblabor - Lapozótlanítás
// @namespace      http://userscripts.org/users/278811
// @description    Összevonja a több lapra aprított üzenetváltásokat.
// @include        http://weblabor.hu/forumok/temak/*
// @exclude        http://weblabor.hu/forumok/temak/*/hozzaszolas*
// ==/UserScript==

var lapozo=document.querySelector('ul.pager')
if (!lapozo) return

var hozzaszolas=document.querySelector('div#comments')
var lista=lapozo.querySelectorAll('li.pager-item a,li.pager-current')
var ezelott=hozzaszolas.firstChild

// többi lap betöltése
for (var i=0,l=lista.length;i<l;i++) {
  if (lista[i].nodeName.toLowerCase()=='li') {
    ezelott=null
    continue
  }

  var valasz=GM_xmlhttpRequest({
    method: 'GET',
    url: lista[i].href,
    synchronous:true,
  })

  var html=new DOMParser().parseFromString(valasz.responseText,'text/xml')
  var folytatas=html.querySelector('div#comments')

  var tovabb=folytatas.querySelector('ul.pager')
  tovabb.parentNode.removeChild(tovabb)

  while (folytatas.childNodes.length)
    if (ezelott) hozzaszolas.insertBefore(folytatas.childNodes[0],ezelott)
    else hozzaszolas.appendChild(folytatas.childNodes[0])
}

// lapozók eltûntetése - lehet késõbb benthagyom csak kidíszítem elválasztónak
lapozo.parentNode.removeChild(lapozo)

lista=document.querySelectorAll('div.item-list')
for (i=0;i<lista.length;i++) lista[i].parentNode.removeChild(lista[i])
