// ==UserScript==
// @name          Speedshare-Download
// @namespace     By Infernus
// @description	  Speedshare-Download
// @include       *speedshare.org/*
// ==/UserScript==

function speedscript()
{

if ((unsafeWindow.secs != null) && (unsafeWindow.wart != null))
{
  //unsafeWindow.secs = 0;
  //unsafeWindow.wart = 0;
  unsafeWindow.document.form.dl.value = "Download";
  unsafeWindow.document.form.dl.disabled = false;
  unsafeWindow.document.form.submit();
}
else
{
  if(unsafeWindow.window.weiterleitung)
  {
    setTimeout("window.weiterleitung()",10000);

  }
}
}


window.addEventListener("load", speedscript(), false);