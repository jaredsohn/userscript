// ==UserScript==
// @name           OVS - Forum MO
// @namespace      peahi
// @include        http://marseille.onvasortir.com/vue_infos-vip.php
// @include        http://marseille.onvasortir.com/vue_profil_vip.php
// @include        http://marseille.onvasortir.com/vue_sortie_vip.php
// @include        http://marseille.onvasortir.com/vue_profil_visiteurs.php
// @include        http://marseille.onvasortir.com/vue_profil_like.php
// @include        http://marseille.onvasortir.com/forum_vip.php
// @include        http://marseille.onvasortir.com/forum_index.php?idf=5
// @include        http://marseille.onvasortir.com/forum_vip_read.php
// @description    Rajoute l'accès au forum MO sur le site OVS-Marseille
// ==/UserScript==

var debpag=document.getElementById('debutpage');
var tabl=debpag.childNodes[2];
var tbody=tabl.childNodes[1];
var tr=tbody.childNodes[2];
var td=tr.childNodes[1];
var geohdr=td.childNodes[1];
var divhd=geohdr.childNodes[1].childNodes[1];
var sousnav=divhd.childNodes[3];
var soushd=sousnav.childNodes[1].childNodes[1];
var ul=soushd.childNodes[1];

var ultxt = ul.innerHTML;
ultxt += '<li><span>|</span></li><li><span><a href="forum_index.php?idf=5">Forum MO</a></span></li>';
ul.innerHTML = ultxt;
