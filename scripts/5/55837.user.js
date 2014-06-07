// ==UserScript==
// @name         Fake 
// @namespace      Die Staemme
// @description    Fügt in der Dorfübersicht einen Link ein um mit einem faketrupp anzugreifen
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=info_village&id=*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=place&mode=command&target=*
// @author        
// ==/UserScript==

//alert(document.URL);

var goOn = true;
var i = 0;
var l,s,a,t;

var truppen = new Array();
truppen[0] = 0; //spear
truppen[1] = 0; //sword
truppen[2] = 0; //axe
truppen[3] = 0; //archer
truppen[4] = 0; //spy
truppen[5] = 0; //light
truppen[6] = 0; //marcher
truppen[7] = 0; //heavy
truppen[8] = 1; //ram
truppen[9] = 0; //catapult
truppen[10] = 0; //knight
truppen[11] = 0; //snob

var RegExVlgInfo = /screen=info_village/;

if(RegExVlgInfo.test(document.URL))
{
  GM_setValue("Fake",false);
  for(i = 0, goOn = true; i < document.getElementsByTagName("a").length && goOn; i++)
  {
    l = document.getElementsByTagName("a")[i];
    if(l.hasChildNodes())
    {
      if(l.firstChild.nodeValue == "» ارسال الجيوش")
        goOn = false;
      //alert(l.firstChild.nodeValue);
    }
  }
  //alert(l.href);
  a = document.createElement("a");
  s = document.createTextNode(" ");
  t = document.createTextNode("» ارسل هجوم وهمي ((plapl.com)) ");
  l.parentNode.appendChild(s);
  l.parentNode.appendChild(a);
  a.appendChild(t);
  a.setAttribute("href",l.href);
  a.addEventListener("click",function() {setVal();},true);
}
else if(GM_getValue("Fake",false))
{
  for(i = 0; i < 12; i++)
    document.getElementsByTagName("input")[i].value = truppen[i];
  GM_setValue("Fake",false); 
}

//alert(GM_getValue("Fake"));

function setVal()
{
  //alert("TEST");
  GM_setValue('Fake',true);
}