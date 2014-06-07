// ==UserScript==
// @name           Weblabor - Friss tartalom
// @namespace      http://userscripts.org/users/278811
// @description    Friss tartalom értesítés az RSS alapján.
// @include        http://weblabor.hu/
// @include        http://www.weblabor.hu/
// ==/UserScript==

// == állítás ==

var rss=[
  {
    nev:'írás',
    url:'http://weblabor.hu/node/feed',
    ido:3*60*60*1000, // 3 óránként
  },
  {
    nev:'téma',
    url:'http://weblabor.hu/rss/forumok',
    ido:60*60*1000, // 1 óránként
  },
  {
    nev:'hozzászólás',
    url:'http://weblabor.hu/rss/hozzaszolas',
    ido:20*60*1000, // 20 percenként
  },
]

// == /állítás ==

GM_addStyle('div#ujcimke { text-align: center; background-color: lightgray; cursor: pointer; }')

var belepve=document.querySelector('div#userpanel a:not([href="/tagok/belepes"]):not([href="/tagok/regisztracio"])')
if (belepve) belepve=belepve.textContent

// kezdeti állapot
var betolt=new Date(document.lastModified).getTime()
var cimke=focim=undefined

// kérések ütemezése
for (var feed in rss) {
  rss[feed].uj=[]
  setInterval(ker,rss[feed].ido,feed)
}

// egy kérés
function ker(feed)
{
  GM_xmlhttpRequest({
    method: 'GET',
    url: rss[feed].url,
    onload: function(valasz) { feldolgoz(valasz,feed) }
  })
}

// egy kérés eredményének a feldolgozása
function feldolgoz(valasz,feed)
{
  var xml=valasz.responseXML?valasz.responseXML:new DOMParser().parseFromString(valasz.responseText,'text/xml')

  var lista=xml.querySelectorAll('item')
  var uj=0,tmp
  for (var i=0,l=lista.length;i<l;i++) {
    var ido=lista[i].querySelector('pubDate')
    if (!ido) continue
    if (tmp=ido.querySelector('value')) ido=tmp

    ido=new Date(ido.textContent).getTime()
    if (ido<=betolt) continue

    if (belepve) {
//      var iro=lista[i].querySelector('dc:creator') // ugye milyen szép volna?
      var iro=lista[i].getElementsByTagName('dc:creator')
      iro=iro.length?iro[0]:undefined
      if (iro) {
        if (tmp=iro.querySelector('value')) iro=tmp
        if (iro.textContent==belepve) continue
      }
    }

    var id=lista[i].querySelector('guid')
    if (!id) continue
    if (tmp=id.querySelector('value')) id=tmp

    id=id.textContent
    if (rss[feed].uj.indexOf(id)==-1) {
      rss[feed].uj.push(id)
      uj++
    }
  }

  if (uj) frissito()
}

// friss tartalom kijelzése
function frissito()
{
  if (!cimke) {
    cimke=document.createElement('div')
    cimke.id='ujcimke'
    cimke.addEventListener('click',function(e) { e.preventDefault(); location.reload(true) },false)

    var tarto=document.getElementById('content')
    tarto.insertBefore(cimke,tarto.firstChild)

    focim=document.title
  }

  var uj=[]
  for (var i=0,l=rss.length;i<l;i++) if (rss[i].uj.length) uj.push(rss[i].uj.length+' új '+rss[i].nev)
  cimke.textContent=uj.join(', ')

  uj=[]
  for (var i=0,l=rss.length;i<l;i++) uj.push(rss[i].uj.length)
  document.title='('+uj.join('/')+') '+focim
}
