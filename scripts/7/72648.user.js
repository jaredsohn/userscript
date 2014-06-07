// ==UserScript==
// @name           Apfelkuchen
// @namespace      sdgsdgserg
// @include        http://*.die-staemme.de/game.php*screen=overview*
// @include        http://*.die-staemme.de/game.php*screen=place*
// ==/UserScript==
if(document.URL.search(/screen=overview\b/) != -1 && document.URL.search(/game.php/) != -1)
{
 var welches = 1;
 while(document.getElementsByClassName("vis")[welches].innerHTML.search(/Ankunft/) == -1)
 {
  welches++;
 }
 var urlaubsv = "";
 var welt = document.URL.split("//")[1].split(".")[0];
 durl = this.location.href;
 var dorf = document.URL.search(/village=(\d+)/);
 dorf = RegExp.$1;
 var jetzt = document.URL.search(/&jetzt=X(.*)X&/);
 jetzt = RegExp.$1.replace(/\%20/g," ").replace(/\%C3\%BC/,"ü");
 if(durl.search(/angriff/) != -1)
 {
  var angriffc = /&angriff=(labelText\[\d+\])/;
  var angriff = angriffc.exec(durl);
  angriff = angriff[angriff.length-1];
  if(typeof GM_getValue(angriff) != "undefined")
  {
   GM_setValue(angriff, prompt("Wie?",GM_getValue(angriff)));
  }
  else
  {
   GM_setValue(angriff, prompt("Wie?",jetzt));
  }
 }
 if(typeof document.getElementsByClassName("vis")[welches] != "undefined")
 {
  for(var i=1;i>0;i++)
  {
   if(document.URL.search(/&t=(\d+)/) != -1)
   {
    urlaubsv = "&t="+RegExp.$1;
   }
   if(document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1] != 'undefined')
   {
    id = document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].id;
    if(typeof GM_getValue(id) == "undefined")
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=overview&jetzt=X"+document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML+"X&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
    else
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML = GM_getValue(id);
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=overview&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
   }
   else
   {
    i = -1;
   }
  }
 }
}
else if(document.URL.search(/screen=place/) != -1 && document.URL.search(/game.php/) != -1)
{
 var welches = 6;
 var urlaubsv = ""; 
 var welt = document.URL.split("//")[1].split(".")[0];
 durl = this.location.href;
 var dorf = document.URL.search(/village=(\d+)/);
 dorf = RegExp.$1;
 var jetzt = document.URL.search(/&jetzt=(.*)&/);
 jetzt = RegExp.$1.replace(/\%20/g," ").replace(/\%C3\%BC/,"ü");
 if(durl.search(/angriff/) != -1)
 {
  var angriffc = /&angriff=(labelText\[\d+\])/;
  var angriff = angriffc.exec(durl);
  angriff = angriff[angriff.length-1];
  if(typeof GM_getValue(angriff) != "undefined")
  {
   GM_setValue(angriff, prompt("Wie?",GM_getValue(angriff)));
  }
  else
  {
   GM_setValue(angriff, prompt("Wie?",jetzt));
  }
 }
 if(typeof document.getElementsByClassName("vis")[welches] != "undefined")
 {
  for(var i=1;i>0;i++)
  {
   if(document.URL.search(/&t=(\d+)/) != -1)
   {
    urlaubsv = "&t="+RegExp.$1;
   }
   if(typeof document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i] == "undefined")
   {
    i = -1;
   }
   else if(document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1])
   {
    id = document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].id;
    if(typeof GM_getValue(id) == "undefined")
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=place&jetzt="+document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML+"&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
    else
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML = GM_getValue(id);
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=place&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
   }
  }
 }
}
if(document.URL.search(/screen=place/) != -1 && document.URL.search(/game.php/) != -1)
{
 var welches = 5;
 var urlaubsv = "";
 var welt = document.URL.split("//")[1].split(".")[0];
 durl = this.location.href;
 var dorf = document.URL.search(/village=(\d+)/);
 dorf = RegExp.$1;
 var jetzt = document.URL.search(/&jetzt=(.*)&/);
 jetzt = RegExp.$1.replace(/\%20/g," ").replace(/\%C3\%BC/,"ü");
 if(typeof document.getElementsByClassName("vis")[welches] != "undefined")
 {
  for(var i=1;i>0;i++)
  {
   if(document.URL.search(/&t=(\d+)/) != -1)
   {
    urlaubsv = "&t="+RegExp.$1;
   }
   if(document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1])
   {
    id = document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].id;
    if(typeof GM_getValue(id) == "undefined")
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=place&jetzt="+document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML+"&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
    else
    {
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML = GM_getValue(id);
     document.getElementsByClassName("vis")[welches].getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerHTML += " - <a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=place&angriff="+id+""+urlaubsv+"'><font color='black'>U</font></a>";
    }
   }
   else
   {
    i = -1;
   }
  }
 }
}