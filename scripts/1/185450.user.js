// ==UserScript==
// @name          Swyter Tweaks for Steamcloud
// @description   Gets rid of all the hurdles and directly plays the video in an immersive player.
// @match         http://streamcloud.eu/*
// @grant         none
// @version       2013.12.07
// @author        Swyter
// ==/UserScript==

if(btn=document.getElementById("btn_download"))
{
  /* the countdown is capped server-side -- that's actually pretty good */
  btn.addEventListener("DOMSubtreeModified",function(e){
    if (e.target.classList.contains("blue"))
    {
       console.log("Go!",e); e.target.click();
    }
  });
}

else
{
  /* fantastic, heroic, huge, mad skills right here! */
  document.getElementById("turnon").click();

  /* get rid of the huge useless thing on the top and avoid scrolling */
  (header=document.getElementById("header")).parentNode.removeChild(header);
  (footer=document.getElementById("footer")).parentNode.removeChild(footer);
}