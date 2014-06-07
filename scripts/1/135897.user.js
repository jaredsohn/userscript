// ==UserScript==
// @name          BAds_Hider
// @namespace     http://userscripts.org/scripts/show/135897
// @description   Blok ads di kaskus
// @include       http://www.kaskus.us/*
// @include       http://www.kaskus.com/*
// @include       http://www.kaskus.co.id/*
// @include       http://livebeta.kaskus.co.id/*
// @version       1.0.4
// @author        Boule, the ultimate junker nubitol
// ==/UserScript==
var patA = new Array();
var patT = new Array();

//--------- patA Section ---------
patA[0]=/http:\/\/www.obattinggi.com/;
patA[1]=/http:\/\/www.peninggi.com/;
patA[2]=/http:\/\/www.pastitinggi.com/;
patA[3]=/WWW . BERATKU . COM/;
patA[4]=/www.bersihwajah.com/;
patA[5]=/http:\/\/jssarea.blogspot.com/;
patA[6]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14244889/;
patA[7]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14513237/;
patA[8]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14535488/;
patA[9]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14535533/;
patA[10]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14626564/;
patA[11] =/http:\/\/www.kaskus.co.id\/showthread.php\?p=695676748/;
patA[12]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=695677986/;
patA[13]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=695678626/;
patA[14]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=695685734/;
patA[15]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=695686428/;
patA[16]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=696116706/;
patA[17]=/http:\/\/www.kaskus.co.id\/showthread.php\?p=696195757/;
patA[18]=/http:\/\/www.tokoobatku.com/;
patA[19]=/http:\/\/www.kaskus.co.id\/showthread.php\?t=14843011/;
patA[20]=/http:\/\/www.supergoodgrow.com/;
//--------- patT Section ---------
patT[0]=/http:\/\/birotiket.com/;
patT[1]=/http:\/\/f8adei3itd0s7k6f23t8kd87tr.hop.clickbank.net\/\?tid=MOBILETV/;
//--------- End Section ---------


//--------- Kaskus Old ---------
try
{
  var ads = document.getElementById("floatlayer");

  if(ads.innerHTML.match(/switch.php/gi) == null)
  {
    ads.style.display = "none";
  }
}
catch (e) { };

try
{
  var ads = document.getElementsByClassName("container_atas");
  ads[0].style.display = "none";
}
catch (e) { };

/*
try
{
  var ads = document.getElementsByClassName("tborder");
  for(i=0;i<ads.length;i++)
  {
    if(ads[i].innerHTML.match(/http:\/\/kad.kaskus.co.id\/banner/))
    {
      ads[i].style.display = "none";
    }
  }
}
catch (e) { };
*/

try
{
  var ads = document.getElementsByClassName("alt2");
  for(i=0; i<ads.length; i++)
  {
    for(j=0; j<patA.length; j++)
    {
      if(ads[i].innerHTML.match(patA[j]))
      {
        ads[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
      }
    }
  }
}
catch (e) { };

try
{
  var ads = document.getElementsByTagName("table");
  for(i=0; i<ads.length; i++)
  {
    for(j=0; j<patT.length; j++)
    {
      if(ads[i].innerHTML.match(patT[j]))
      {
        ads[i].style.display = "none";
      }
    }
  }
}
catch (e) { };

//--------- Kaskus Beta ---------
try
{
  if(document.URL.match(/livebeta.kaskus.co.id\/forum\//gi) != null)
  {
    var ads = document.getElementsByClassName("col grid-12");
    ads[0].parentNode.style.display = "none";
  }
}
catch (e) { };

try
{
  var ads = document.getElementsByClassName("notice-featured");
  ads[0].style.display = "none";
}
catch (e) { };

try
{
  var ads = document.getElementsByClassName("l-link")[0];
      ads.parentNode.removeChild(ads);
      ads = document.getElementsByClassName("r-link")[0];
      ads.parentNode.removeChild(ads);
      ads = document.getElementsByClassName("skin")[0];
      ads.parentNode.removeChild(ads);
}
catch (e) { };

try
{
  var ads = document.getElementsByClassName("post-quote");
  for(i=0; i<ads.length; i++)
  {
    for(j=0; j<patA.length; j++)
    {
      if(ads[i].innerHTML.match(patA[j]))
      {
        ads[i].style.display = "none";
      }
    }
  }
}
catch (e) { };

try
{
  var ads = document.getElementsByClassName("post-wrapper ");
  for(i=0; i<ads.length; i++)
  {
    for(j=0; j<patT.length; j++)
    {
      if(ads[i].innerHTML.match(patT[j]))
      {
        ads[i].style.display = "none";
      }
    }
  }
}
catch (e) { };
