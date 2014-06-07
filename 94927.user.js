// ==UserScript==
// @name           Weblabor - Hozzászólás lista
// @namespace      http://userscripts.org/users/278811
// @description    Tartalomjegyzékszerû áttekintõ listát készít a hozzászólásokról
// @include        http://weblabor.hu/blog/*
// @include        http://weblabor.hu/blogmarkok/*
// @include        http://weblabor.hu/cikkek/*
// @include        http://weblabor.hu/forumok/temak/*
// @include        http://www.weblabor.hu/blog/*
// @include        http://www.weblabor.hu/blogmarkok/*
// @include        http://www.weblabor.hu/cikkek/*
// @include        http://www.weblabor.hu/forumok/temak/*
// ==/UserScript==

// a hivatkozás lista stílusa
GM_addStyle(
  'div#attekint { position: fixed; right: 0; top: 55px; max-height: 85%; overflow-x: hidden; font-size: small; line-height: normal; white-space: nowrap; background-color: white; padding: 5px; }'+
  'div#attekint span { font-weight: bold; margin-right: 5px; }'+
  'div#attekint span.uj { color: green; }'+
  'div.ugras { float: right; color: transparent; line-height: 1; }'+
  'div.ugras a { text-decoration: none !important; }'
)

// a hozzászólások rekúrzív körbejárása
function bejar(elem,szint)
{
  var bekezd=''
  for (var i=0;i<szint;i++) bekezd+='&nbsp; '

  var lista=elem.childNodes
  for (var i=0,l=lista.length;i<l;i++) {
    var elem=lista[i]
    if (elem.nodeType!=1) continue // nem HTML tag
    if (elem.nodeName.toLowerCase()!='div') continue // nem div tag
    if (elem.className=='indented') { // válaszok hozzászólásra
      bejar(elem,szint+1)
      continue
    }

    if (elem.className.indexOf('comment')==-1) continue // ajaj, nem stimmel a szerkezet

    var szam=hiv=undefined
    var uj=false
    for (var j=0,l2=elem.childNodes.length;j<l2;j++) {
      var alelem=elem.childNodes[j]
      if (alelem.nodeType!=1) continue // nem HTML tag
      if (alelem.nodeName.toLowerCase()=='div' && alelem.className.indexOf('commentnum')!=-1) // hozzászólás szám
        szam=alelem.innerHTML
      else if (alelem.nodeName.toLowerCase()=='span' && alelem.className.indexOf('marker')!=-1) // új hozzászólás bigyó
        uj=true
      else if (alelem.nodeName.toLowerCase()=='h3') { // hozzászólás cím
        hiv=alelem.innerHTML
        break
      }
    }

    if (uj) ujdonsag.push(elem)

    if (szam!=undefined && hiv!=undefined)
      tartalom+=bekezd+'<span'+(uj?' class="uj"':'')+'>'+szam+'</span>'+hiv+'<br>\n'
  }
}

// tartalom összeállítása körbejárással
var tartalom=''
var ujdonsag=[]
bejar(document.getElementById('comments'),0)

// hozzászólás lista beillesztése a dokumentumba
var attekint=document.createElement('div')
attekint.id='attekint'
attekint.innerHTML=tartalom
attekint.addEventListener('dblclick',function() { attekint.style.display='none' },false)
document.body.appendChild(attekint)

// ugrás elõzõ / következõ új hozzászólásra
for (var i=0,l=ujdonsag.length;i<l;i++) {
  var ugras=document.createElement('div')
  ugras.className='ugras'

  if (i) {
    var hivatkoz=ujdonsag[i-1].getElementsByTagName('h3')[0].getElementsByTagName('a')[0]
    ugras.innerHTML+='<a href="'+hivatkoz.getAttribute('href')+'" title="Elõzõ új: '+hivatkoz.innerHTML+'">&#x25b2;</a>'
  } else ugras.innerHTML+='&#x25b3;'
  ugras.innerHTML+='<br>'
  if (i<l-1) {
    var hivatkoz=ujdonsag[i+1].getElementsByTagName('h3')[0].getElementsByTagName('a')[0]
    ugras.innerHTML+='<a href="'+hivatkoz.getAttribute('href')+'" title="Következõ új: '+hivatkoz.innerHTML+'">&#x25bc;</a>'
  } else ugras.innerHTML+='&#x25bd;'

  ujdonsag[i].insertBefore(ugras,ujdonsag[i].getElementsByClassName('commentnum')[0].nextSibling)
}