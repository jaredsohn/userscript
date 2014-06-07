// ==UserScript==
// @name           MyVip_Nobanner_v2(By.Puma94)
// @namespace      MyVip_Nobanner_v2(By.Puma94)
// @include        http://myvip.hu/main.php*
// @include        http://myvip.com/main.php*
// @include        http://myvip.com/*
// @include        http://myvip.hu/*
// ==/UserScript==

//Reklámcsík eltüntetése
document.getElementsByTagName('frameset')[0].rows='*,0,0,0'; 