// ==UserScript==
// @name           PPCWAutoPremium
// @namespace      PPCWAP
// @include        *.ppcwarez.org/*
// @author         Rullaf
// ==/UserScript==
for(var link in document.body.getElementsByTagName("a"))
{
  var newlink = document.body.getElementsByTagName("a")[link].href;
  var premium = "http://forum.ppcwarez.org/qvga/index.php?premium_url=";
  if(newlink.indexOf("rapidshare.com",0)!=-1){newlink = premium+newlink;} 
  else if(newlink.indexOf("megaupload.com",0)!=-1){newlink = premium+newlink;}
  document.body.getElementsByTagName("a")[link].href = newlink;
  //alert(link);
}