// ==UserScript==
// @name           Weblabor - Tag jelölés
// @namespace      http://userscripts.org/users/278811
// @description    Az írók közt kiemeli a kérdezőt és a vezetőség tagjait
// @include        http://weblabor.hu/blog/*
// @include        http://weblabor.hu/blogmarkok/*
// @include        http://weblabor.hu/cikkek/*
// @include        http://weblabor.hu/forumok/temak/*
// @include        http://www.weblabor.hu/blog/*
// @include        http://www.weblabor.hu/blogmarkok/*
// @include        http://www.weblabor.hu/cikkek/*
// @include        http://www.weblabor.hu/forumok/temak/*
// ==/UserScript==

// ==állítás=

// lehetséges értékek:
// - linear: díszítés linear-gradient() segítségével
// - radial: díszítés radial-gradient() segítségével
// - shadow: díszítés box-shadow() és text-shadow() segítségével
var stilus='shadow'

// ==/állítás==

GM_addStyle('span.rang { color: gray; font-weight: bold; font-style: italic; margin-left: 10px; }')

GM_addStyle('div.belepve_linear { background-image: -moz-linear-gradient(left, rgba(0,127,0,0), lime 25%, rgba(0,127,0,0.5) 50%, rgba(0,127,0,0)); background-size: 25px 100%; background-repeat: no-repeat; }')
GM_addStyle('div.kerdezo_linear { background-image: -moz-linear-gradient(left, rgba(127,0,0,0), red 25%, rgba(127,0,0,0.5) 50%, rgba(127,0,0,0)); background-size: 25px 100%; background-repeat: no-repeat; }')
GM_addStyle('div.fomufti_linear div.meta { background-image: -moz-linear-gradient(rgba(255,0,0,0), rgba(255,0,0,.25) 50%, rgba(255,0,0,0) 75%); }')
GM_addStyle('div.szerkeszto_linear div.meta { background-image: -moz-linear-gradient(rgba(0,255,0,0), rgba(0,255,0,.25) 50%, rgba(0,255,0,0) 75%); }')
GM_addStyle('div.tarsszerkeszto_linear div.meta { background-image: -moz-linear-gradient(rgba(0,0,255,0), rgba(0,0,255,.25) 50%, rgba(0,0,255,0) 75%); }')
GM_addStyle('div.node.belepve_linear,div.node.kerdezo_linear { padding-left: 15px; }')

GM_addStyle('div.belepve_radial { background-image: -moz-radial-gradient(right top, circle, rgba(63,255,63,.5), rgba(63,255,63,0) 100px); }')
GM_addStyle('div.kerdezo_radial { background-image: -moz-radial-gradient(right top, circle, rgba(255,63,63,.5), rgba(255,63,63,0) 100px); }')
GM_addStyle('div.fomufti_radial div.meta { background-image: -moz-radial-gradient(50px 10px, closest-corner, rgba(255,63,63,.75), rgba(255,63,63,0)); }')
GM_addStyle('div.szerkeszto_radial div.meta { background-image: -moz-radial-gradient(50px 10px, closest-corner, rgba(63,255,63,.75), rgba(63,255,63,0)); }')
GM_addStyle('div.tarsszerkeszto_radial div.meta { background-image: -moz-radial-gradient(50px 10px, closest-corner, rgba(63,63,255,.75), rgba(63,63,255,0)); }')

GM_addStyle('div.belepve_shadow { box-shadow: green 0 0 15px inset; }')
GM_addStyle('div.kerdezo_shadow { box-shadow: red 0 0 15px inset; }')
GM_addStyle('div.fomufti_shadow span.rang { text-shadow: red 1px 1px 0; }')
GM_addStyle('div.szerkeszto_shadow span.rang { text-shadow: green 1px 1px 0; }')
GM_addStyle('div.tarsszerkeszto_shadow span.rang { text-shadow: blue 1px 1px 0; }')
GM_addStyle('div.node { padding: 10px; }')

// az információk innen származnak: http://weblabor.hu/blog/20110227/tarsszerkesztok
var rang=[ // bocs, ha valakinek nem ez a hivatalos rangja
  { rang:'főmufti',        stilus:'fomufti' },
  { rang:'szerkesztő',     stilus:'szerkeszto' },
  { rang:'társszerkesztő', stilus:'tarsszerkeszto' },
]
var tag={ // bocs, ha valaki kimaradt
  1401:{ rang:0, bece:'Török Gábor',        nev:'Török Gábor' },
  3756:{ rang:1, bece:'Joó Ádám',           nev:'Joó Ádám' },
  821: { rang:1, bece:'Bártházi András',    nev:'Bártházi András' },
  1741:{ rang:2, bece:'fmate14',            nev:'Farkas Máté' },
  1519:{ rang:2, bece:'Poetro',             nev:'Galiba Péter' },
  3800:{ rang:2, bece:'inf3rno',            nev:'Jánszky László Lajos' },
  1956:{ rang:2, bece:'zila',               nev:'Kókai László' },
  5050:{ rang:2, bece:'Tyrael',             nev:'Kovács Ferenc' },
  3563:{ rang:2, bece:'janoszen I proclub', nev:'Pásztor János' },
  934: { rang:2, bece:'tiku',               nev:'Tikász Vince' },
}

var belepve=document.querySelector('div#userpanel a:not([href="/tagok/belepes"]):not([href="/tagok/regisztracio"])')
if (belepve) belepve=belepve.getAttribute('href')

var kerdezo=document.querySelector('a.wlavatar').getAttribute('href')

var iras=document.querySelectorAll('div.node,div.comment')
for (var i=0,l=iras.length;i<l;i++) {
  var avatar=iras[i].querySelector('div.meta a.wlavatar')
  var juzer=avatar.getAttribute('href')
  var szam=juzer.replace(/.*\//,'')

  if (juzer==kerdezo) iras[i].classList.add('kerdezo_'+stilus)
  else if (juzer==belepve) iras[i].classList.add('belepve_'+stilus)

  if (!(szam in tag)) continue

  iras[i].classList.add(rang[tag[szam].rang].stilus+'_'+stilus)

  var cimke=document.createElement('span')
  cimke.className='rang'
  cimke.innerHTML=rang[tag[szam].rang].rang
  avatar.parentNode.insertBefore(cimke,avatar.nextSibling)
}
