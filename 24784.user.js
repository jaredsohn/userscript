// ==UserScript==
// @name           Dampfer.NET | [Crews-Link] Made by =tObI=
// @namespace      Dampfer.NET
// @description    In der Loginbox erscheint ein Crews-Link.
// @include        http://*dampfer.net/*
// ==/UserScript==

document.getElementById("text_normal_klein").innerHTML = document.getElementById("text_normal_klein").innerHTML + "<div class='bau_stop'><hr id='dashed_line'></div><span id='link_list'><img src='images/mini_pfeil_1.gif' align='absmiddle'>&nbsp;<a href='http://dresden.dampfer.net/index.php?pool,crews' alt='Crews' target='_self'><span id='text_klein'>Crews</span></a></span>";