// ==UserScript==
// @name           Gentoo Portage
// @include        http://www.gentoo-portage.com/*
// ==/UserScript==

if (document.getElementById("searchbox"))
{
  document.getElementById("searchbox").focus();
}

if (document.getElementById("packageid"))
{
  packagename = document.getElementById("packageid").innerHTML;
  document.getElementById("packageid").innerHTML = "<a href=\"http://packages.gentoo.org/package/"+packagename+"\">"+packagename+"<\a>";
}