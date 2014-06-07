// ==UserScript==
// @name          Swyter Tweaks for Series.ly
// @description   Puts direct links in the series.ly site.
// @match         http://series.ly/*
// @grant         none
// @run-at        document-end
// @version       2014.04.11
// @author        Swyter
// ==/UserScript==

function when_external_loaded()
{
  console.log("Binding Swyter Tweaks for Series.ly...");

  function navLink(idc,idv,host,mediaType,linkPoints)
  {
    window.open('/scripts/media/gotoLink.php?idv='+idv);
  
    /* mark entry as selected, lifted from the original function */
    $("#reportLink-"+idv).show();
    $("#link_"+idv).addClass("lastSelected");
  
    /* mark episode as seen */
    onEpisode(idc);
  }
}


// Ugly as hell so it stays crossplatform! :-)
document.head.appendChild(
  inject_fn = document.createElement("script")
);

inject_fn.innerHTML = when_external_loaded.toString().match(/{([\s\S]+)}/)[1];