// ==UserScript==
// @name           hideFoundAndOwnCaches
// @namespace      http://www.geocaching.com/map/*
// @description    Hides own and found caches on the geocaching.com map
// @include        http://www.geocaching.com/map/*
// ==/UserScript==

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent += '';
  script.textContent += 'setTimeout(function(){$("li.ct_mf.pt_toggle").click();}, 1); '; //hide found caches
  script.textContent += 'setTimeout(function(){$("li.ct_mo.pt_toggle").click();}, 1); '; //hide own caches
  document.body.appendChild(script);
