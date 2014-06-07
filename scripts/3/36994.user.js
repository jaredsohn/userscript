// ==UserScript==
// @name           marchands
// @namespace      marchands
// @description    décompte des ressources arrivantes
// @include        http://s8.travian.fr/build.php?*id=33*
// @include        http://s8.travian.fr/build.php?*gid=17*
// @exclude        http://s8.travian.fr/build.php?*t=1*
// @exclude        http://s8.travian.fr/build.php?*t=3*
// ==/UserScript==

var cadre = document.getElementsByTagName('FORM')[0];
var p=cadre.getElementsByTagName("p")

document.getElementById("lmid1").innerHTML=document.getElementById("lmid1").innerHTML+"<div id='bernard_marchand'><br /></div>" //lright1

var tab_p_lien=new Array();
var tab_t_lien=new Array();
var tab_t_place=new Array();
var ressource=new Array(0,0,0,0);



if(cadre.getAttribute("name")=="snd")
{
 nb_p=-1;
 nb_t=0;
 point=cadre.childNodes
 
 for (i=0;i<point.length;i++)
 {
 if (point[i].nodeName=="P" && point[i].getAttribute("class")=="b")
  {
   nb_p++
   tab_p_lien[nb_p]=point[i]
  }
  if (point[i].nodeName=="TABLE" && point[i].getAttribute("class")=="tbg")
  {
   tab_t_lien[nb_t]=point[i]
   tab_t_place[nb_t]=nb_p
   nb_t++
  }
 }

 for (i=0;i<nb_t;i++)
 {
  place=tab_p_lien[tab_t_place[i]].innerHTML.substr(0,16);
  if (place=="Marchands arriva")
  {
   ch=tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML
   ch=ch.substring(ch.indexOf(">")+1)
   for (k=0;k<3;k++)
   {
    ch=ch.substring(ch.indexOf(">")+1)
    ressource[k]=ressource[k]+eval(ch.substring(0,ch.indexOf("|")-1))
   }
   ch=ch.substring(ch.indexOf(">")+1)
   ressource[3]=ressource[3]+eval(ch.substring(0,ch.indexOf("<")))
  }
 }
 ch="Arrivée de ressources"
}
else
{
 ta=cadre.childNodes
 
 for (i=0;i<ta.length;i++)
  if  (ta[i].nodeName=="TABLE" && ta[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML=="<b>Vos offres</b>" )
  {
   tr=ta[i].getElementsByTagName('tr')
   for (j=2;j<tr.length;j++)
   {
    ch=tr[j].getElementsByTagName('td')[2].innerHTML
    if (tr[j].getElementsByTagName('td')[2].getElementsByTagName('img').length>0)
     switch (tr[j].getElementsByTagName('td')[2].getElementsByTagName('img')[0].getAttribute("src"))
     {
      // 4 => céréales, 3 ==> fer, 2 ==> terre , 1 ==> bois
      case "img/un/r/1.gif" :
       ressource[0]=ressource[0]+eval(ch.substring(ch.indexOf(">")+1));
       break
      case "img/un/r/2.gif" : ressource[1]=ressource[1]+eval(ch.substring(ch.indexOf(">")+1));break
      case "img/un/r/3.gif" : ressource[2]=ressource[2]+eval(ch.substring(ch.indexOf(">")+1));break
      case "img/un/r/4.gif" : ressource[3]=ressource[3]+eval(ch.substring(ch.indexOf(">")+1));break
      default : alert("problème : "+ch)
     }
   }
  }
 ch="Ressources demandées"
}
 
if ((ressource[0]+ressource[1]+ressource[2]+ressource[3])!=0)
{
 document.getElementById("bernard_marchand").innerHTML=document.getElementById("bernard_marchand").innerHTML+'<p class="b">'+ch+'</p><table id="ta_nou_ge" cellspacing="1" cellpadding="2" class="tbg"><tr class="cbg1"><td class="b"><img class="res" src="img/un/r/1.gif" /></td><td class="b"><img class="res" src="img/un/r/2.gif"></td><td class="b"><img class="res" src="img/un/r/3.gif"></td><td class="b"><img class="res" src="img/un/r/4.gif"></td></tr><tr><td>'+ressource[0]+'</td><td>'+ressource[1]+'</td><td>'+ressource[2]+'</td><td>'+ressource[3]+'</td></tr></table>'
}