// ==UserScript==
// @name           Clear source input box on click OGame Redesign
// @namespace      http://userscripts.org/users/175359
// @include        http://*.ogame.pl/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
  if (window.location.href.indexOf("/game/index.php?page=fleet3") == -1)
    return;
  
  function reset(e)
  {
    this.value = "";
    this.focus();
  }

  var metal = document.getElementById("resource1");
  metal.addEventListener("click", reset, false);

  var crystal = document.getElementById("resource2");
  crystal.addEventListener("click", reset, false);

  var deuterium = document.getElementById("resource3");
  deuterium.addEventListener("click", reset, false);
})();