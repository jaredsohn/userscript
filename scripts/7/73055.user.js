// ==UserScript==
// @name           Erdbeertorte
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=overview_villages*
// ==/UserScript==
 var urlaubsv = "";
 var welt = document.URL.split("//")[1].split(".")[0];
 durl = this.location.href;
 var dorf = document.URL.search(/village=(\d+)/);
 dorf = RegExp.$1;
 var urlo = document.URL.replace(/&umbenennen=label_text_\d+/,"");
 var th = document.createElement("th");
 th.innerHTML = "<center>Notiz <a onclick='javascript:localStorage.clear();window.location.href=\""+urlo+"\";' href='#'><font style='font-weight:normal;'>(Notizen löschen)</font></a></center>";
 document.getElementById("production_table").getElementsByTagName("tr")[0].appendChild(th);
 for(var i=1;i>0;i++)
 {
  if(document.URL.search(/&t=(\d+)/) != -1)
  {
   urlaubsv = "&t="+RegExp.$1;
  }
  if(typeof document.getElementById("production_table").getElementsByTagName("tr")[i] != 'undefined')
  {
   id = document.getElementById("production_table").getElementsByTagName("tr")[i].getElementsByTagName("span")[1].id;
   if(localStorage.getItem(id) == null)
   {
    var td = document.createElement("td");
    td.innerHTML = "<center><a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=overview_villages&umbenennen="+id+""+urlaubsv+"'><font color='black' style='font-weight:normal;'><i>Noch keine Notiz</i></font></a></center>";
    document.getElementById("production_table").getElementsByTagName("tr")[i].appendChild(td);
   }
   else
   {
    var td = document.createElement("td");
    td.innerHTML = "<center><a href='http://"+welt+".die-staemme.de/game.php?village="+dorf+"&screen=overview_villages&umbenennen="+id+""+urlaubsv+"'><font color='black' style='font-weight:normal;'>"+localStorage.getItem(id)+"</font></a></center>";
    document.getElementById("production_table").getElementsByTagName("tr")[i].appendChild(td);
   }
  }
  else
  {
   i = -1;
  }
 }
if(durl.search(/umbenennen/) != -1)
{
 var umbenennenc = /&umbenennen=(label_text_\d+)/;
 var umbenennen = umbenennenc.exec(durl);
 umbenennen = umbenennen[umbenennen.length-1];
 if(localStorage.getItem(umbenennen) != null)
 {
  localStorage.setItem(umbenennen, prompt("Notiz:",localStorage.getItem(umbenennen)));
 }
 else
 {
  localStorage.setItem(umbenennen, prompt("Notiz:"));
 }
 if(localStorage.getItem(umbenennen) == "")
 {
  localStorage.setItem(umbenennen, "<i>Noch keine Notiz</i>");
 }
 window.location.href = urlo;
}