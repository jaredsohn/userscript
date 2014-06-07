// ==UserScript==
// @name           armées
// @namespace      armées
// @description    Décompte des armées
// @include        http://s*.travian.*/build.php?*id=39*
// @include       http://s*.travian.*/build.php?*gid=16*
// @version     3.5
// ==/UserScript==


var cadre = document.getElementById('build'); //lmid2 //content 
var p=cadre.getElementsByTagName("thead")[0].getElementsByTagName("p")

//alert(document.getElementsByTagName("body")[0].innerHTML)
//alert(document.getElementById("content").innerHTML);
document.getElementById("mfoot").innerHTML=document.getElementById("mfoot").innerHTML+"<div id='___bernard'><br /><p class='b f16'><span class='c0'>Bilan des troupes</class></p></div>" //lright1=>content
//lmid1

var tab_p_lien=new Array();
//var tab_p_place=new Array();
var tab_t_lien=new Array();
var tab_t_place=new Array();
var tab_t_ident=new Array();
var armee_ga=new Array(0,0,0,0,0,0,0,0,0,0);
var armee_ge=new Array(0,0,0,0,0,0,0,0,0,0);
var armee_ro=new Array(0,0,0,0,0,0,0,0,0,0);
var armeev_ga=new Array(0,0,0,0,0,0,0,0,0,0);
var armeev_ge=new Array(0,0,0,0,0,0,0,0,0,0);
var armeev_ro=new Array(0,0,0,0,0,0,0,0,0,0);
var armeeh_ga=new Array(0,0,0,0,0,0,0,0,0,0);
var armeeh_ge=new Array(0,0,0,0,0,0,0,0,0,0);
var armeeh_ro=new Array(0,0,0,0,0,0,0,0,0,0);
var ville_chemin=new Array();
var ville_nom=new Array();
var nb_ville=0;
var peuple="";

ident="vide"
x="vide"
y="vide"
tr=document.getElementById('vlist').getElementsByTagName("tr") // lright1 //vlist //sright ???
for(i=1;i<tr.length;i++)
{
 a=tr[i].getElementsByTagName("a")
 b=tr[i].getElementsByTagName("td")
 if (a.length>0)
 {
// alert(a[0].innerHTML +" -=- "+tr[i].getAttribute("class"))
  //if (tr[i].getAttribute("class")=="sel") //a[0].getAttribute("class")
  {  
   //ville=a[0].innerHTML
   td=tr[i].getElementsByTagName("td")
   //for (j=0;j<td.length;j++)
   { // repérage de la ville sélectionnée
    if (td[0].getAttribute("class")=="dot hl")
    /* x=eval(td[j].innerHTML.substring(1))
    else if (td[j].getAttribute("class")=="y")
     y=eval(td[j].innerHTML.substring(0,td[j].innerHTML.length-1))*/
    {
     tddiv=td[2].getElementsByTagName("div")
     x=eval(tddiv[0].innerHTML.substring(1))
     y=eval(tddiv[2].innerHTML.substring(0,tddiv[2].innerHTML.length-1))
     ident=(x+401+(400-y)*801)
     ville=a[0].innerHTML
//alert(ville+" => "+x+","+y);
    }
   }
  }
  ville_chemin[nb_ville]=a[0].getAttribute("href")
  ville_nom[nb_ville]=a[0].innerHTML
//alert(nb_ville+" "+ville_nom[nb_ville])
  nb_ville++
 }
}

nb_p=-1;
nb_t=0;
point=cadre.childNodes
for (i=0;i<point.length;i++)
{
 //if (point[i].nodeName=="TABLE")
 //if (point[i].nodeName=="P")
 // alert(i+" => "+point[i].nodeName+" -=- "+point[i].getAttribute("class")+" -=- "+point[i].innerHTML +" => "+ nb_p)
 /*else
  alert(i+" => "+point[i].nodeName+" -=- "+point[i].innerHTML)*/
 //alert(i+" =>"+p[i].innerHTML+" et "+ p[i].offsetTop)
 //alert(p[i].getAttribute("class"));
 //document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+i+" => "+point[i].nodeName+" <pre>"+point[i].innerHTML+"</pre><br />";
//alert(point[i].nodeName);
 if  (point[i].nodeName=="H4")// (point[i].nodeName=="P" && (point[i].getAttribute("class")=="v_troops b" || point[i].getAttribute("class")=="b"))
 {
  nb_p++
  tab_p_lien[nb_p]=point[i]
 }
 if (point[i].nodeName=="TABLE" && point[i].getAttribute("class")=="troop_details") // tbg // std troop_details
 {
//alert(nb_t +" => "+nb_p);
  tab_t_lien[nb_t]=point[i]
  tab_t_place[nb_t]=nb_p
  tab_t_ident[nb_t]=point[i].getElementsByTagName("a")[0].getAttribute("href").substring(12);
  tab_t_ident[nb_t]=tab_t_ident[nb_t].substring(0,tab_t_ident[nb_t].length-5)
  nb_t++
 }
}


a_ge=0
a_ga=0
a_ro=0
av_ge=0
av_ga=0
av_ro=0
ah_ge=0
ah_ga=0
ah_ro=0
j=1;
for (i=0;i<nb_t;i++)
{
//alert(tab_p_lien[tab_t_place[i]].innerHTML)
 place=tab_p_lien[tab_t_place[i]].innerHTML.substr(0,16);
 
 teste=tab_t_lien[i].getElementsByTagName("a")[0].getAttribute("href")
 teste=teste.substring(teste.indexOf("d=", 0)+2)
 teste=teste.substring(0,teste.indexOf("&", 0))
//alert(teste+"=="+ident)
//alert(tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"));
//alert(place + " -=- " + teste +" -=- " +ident)
 if (place!="Troupes dans les" && (place!="Troupes arrivant" || teste==ident))
 {
  switch (tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  {
   case "Combattant au gourdin" :
    for (k=0;k<10;k++)
    {
     armee_ge[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML) // k+1 => k
     a_ge+=armee_ge[k]
    }
    break;
   case "Phalange" :
    for (k=0;k<10;k++)
    {
     armee_ga[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
     a_ga+=armee_ga[k]
     
    }
    break;
   case "Légionnaire" :
    for (k=0;k<10;k++)
    {
     armee_ro[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
     a_ro+=armee_ro[k]
    }
    break;
   default : peuple="Erreur";
	     alert(tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  }
 
 }
 if (teste==ident)
 {
  switch (tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  {
   case "Combattant au gourdin" :
    peuple="ge";
    for (k=0;k<10;k++)
    {
     armeev_ge[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
     av_ge+=armeev_ge[k]
    }
    break;
   case "Phalange" :
    peuple="ga";
    for (k=0;k<10;k++)
    {
     armeev_ga[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
     av_ga+=armeev_ga[k]
     
    }
    break;
   case "Légionnaire" :
    peuple="ro";
    for (k=0;k<10;k++)
    {
     armeev_ro[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
     av_ro+=armeev_ro[k]
    }
    break;
   default : peuple="Erreur";
	     alert(tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  }

 }
 else
 {
  switch (tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  {
   case "Combattant au gourdin" :
//alert(i +" => " + tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML +" => "+ tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML)
    for (k=0;k<10;k++)
    {
     if (tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML!="?")
     {
      armeeh_ge[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
      ah_ge+=armeeh_ge[k]
     }
    }
    break;
   case "Phalange" :
    for (k=0;k<10;k++)
    {
     if (tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML!="?")
     {
      armeeh_ga[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
      ah_ga+=armeeh_ga[k]
     }
    }
    break;
   case "Légionnaire" :
    for (k=0;k<10;k++)
    {
     if (tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML!="?")
     {
      armeev_ro[k]+=eval(tab_t_lien[i].getElementsByTagName("tr")[2].getElementsByTagName("td")[k].innerHTML)
      ah_ro+=armeeh_ro[k]
     }
    }
    break;
   default : peuple="Erreur";
	     alert(tab_t_lien[i].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("title"))
  }

 }
}
 if ((a_ge+a_ga+a_ro)!=0)
 {
  document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<p class="b">Troupes à nourrir</p>'
  
  if (a_ge!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg" id="tata_nounou">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Germaines</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/11.gif" title="Combattant au gourdin"></td><td><img src="img/un/u/12.gif" title="Combattant à la lance"></td><td><img src="img/un/u/13.gif" title="Combattant à la hache"></td><td><img src="img/un/u/14.gif" title="Eclaireur"></td><td><img src="img/un/u/15.gif" title="Paladin"></td><td><img src="img/un/u/16.gif" title="Cavalier Teuton"></td><td><img src="img/un/u/17.gif" title="Bélier"></td><td><img src="img/un/u/18.gif" title="Catapulte"></td><td><img src="img/un/u/19.gif" title="Chef de tribu"></td><td><img src="img/un/u/20.gif" title="Colon"></td>\n </tr>\n <tr id="ta_nou_ge">\n  <td>'+armee_ge[0]+'</td><td>'+armee_ge[1]+'</td><td>'+armee_ge[2]+'</td><td>'+armee_ge[3]+'</td><td>'+armee_ge[4]+'</td><td>'+armee_ge[5]+'</td><td>'+armee_ge[6]+'</td><td>'+armee_ge[7]+'</td><td>'+armee_ge[8]+'</td><td>'+armee_ge[9]+'</td>\n </tr></table><p><br /></p>'
  if (a_ga!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+ '\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Gauloises</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/21.gif" title="Phalange"></td><td><img src="img/un/u/22.gif" title="Combattant à l\'épée"></td><td><img src="img/un/u/23.gif" title="Eclaireur"></td><td><img src="img/un/u/24.gif" title="Eclair de Toutatis"></td><td><img src="img/un/u/25.gif" title="Cavalier druide"></td><td><img src="img/un/u/26.gif" title="Hédouin"></td><td><img src="img/un/u/27.gif" title="Bélier"></td><td><img src="img/un/u/28.gif" title="Catapulte de Guerre"></td><td><img src="img/un/u/29.gif" title="Chef"></td><td><img src="img/un/u/30.gif" title="Colon"></td>\n </tr>\n <tr id="ta_nou_ga">\n  <td>'+armee_ga[0]+'</td><td>'+armee_ga[1]+'</td><td>'+armee_ga[2]+'</td><td>'+armee_ga[3]+'</td><td>'+armee_ga[4]+'</td><td>'+armee_ga[5]+'</td><td>'+armee_ga[6]+'</td><td>'+armee_ga[7]+'</td><td>'+armee_ga[8]+'</td><td>'+armee_ga[9]+'</td>\n </tr></table><p><br /></p>'
  if (a_ro!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Romaines</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/1.gif" title="Légionnaire"></td><td><img src="img/un/u/2.gif" title="Prétorien"></td><td><img src="img/un/u/3.gif" title="Impérian"></td><td><img src="img/un/u/4.gif" title="Equites Legati"></td><td><img src="img/un/u/5.gif" title="Equites Imperatoris"></td><td><img src="img/un/u/6.gif" title="Equites Caesaris"></td><td><img src="img/un/u/7.gif" title="Bélier"></td><td><img src="img/un/u/8.gif" title="Catapulte de feu"></td><td><img src="img/un/u/9.gif" title="Sénateur"></td><td><img src="img/un/u/10.gif" title="Colon"></td>\n </tr>\n <tr id="ta_nou_ro">\n  <td>'+armee_ro[0]+'</td><td>'+armee_ro[1]+'</td><td>'+armee_ro[2]+'</td><td>'+armee_ro[3]+'</td><td>'+armee_ro[4]+'</td><td>'+armee_ro[5]+'</td><td>'+armee_ro[6]+'</td><td>'+armee_ro[7]+'</td><td>'+armee_ro[8]+'</td><td>'+armee_ro[9]+'</td>\n </tr></table><p><br /></p>'
  
 }
 if ((av_ge+av_ga+av_ro)!=0)
 {
  document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<p class="b">Troupes crées par le village</p>'
  
  if (av_ge!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Germaines</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/11.gif" title="Combattant au gourdin"></td><td><img src="img/un/u/12.gif" title="Combattant à la lance"></td><td><img src="img/un/u/13.gif" title="Combattant à la hache"></td><td><img src="img/un/u/14.gif" title="Eclaireur"></td><td><img src="img/un/u/15.gif" title="Paladin"></td><td><img src="img/un/u/16.gif" title="Cavalier Teuton"></td><td><img src="img/un/u/17.gif" title="Bélier"></td><td><img src="img/un/u/18.gif" title="Catapulte"></td><td><img src="img/un/u/19.gif" title="Chef de tribu"></td><td><img src="img/un/u/20.gif" title="Colon"></td>\n </tr>\n <tr id="ta_cre_ge">\n  <td>'+armeev_ge[0]+'</td><td>'+armeev_ge[1]+'</td><td>'+armeev_ge[2]+'</td><td>'+armeev_ge[3]+'</td><td>'+armeev_ge[4]+'</td><td>'+armeev_ge[5]+'</td><td>'+armeev_ge[6]+'</td><td>'+armeev_ge[7]+'</td><td>'+armeev_ge[8]+'</td><td>'+armeev_ge[9]+'</td>\n </tr>\n</table>\n<p><br /></p>'
  if (av_ga!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+ '\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Gauloises</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/21.gif" title="Phalange"></td><td><img src="img/un/u/22.gif" title="Combattant à l\'épée"></td><td><img src="img/un/u/23.gif" title="Eclaireur"></td><td><img src="img/un/u/24.gif" title="Eclair de Toutatis"></td><td><img src="img/un/u/25.gif" title="Cavalier druide"></td><td><img src="img/un/u/26.gif" title="Hédouin"></td><td><img src="img/un/u/27.gif" title="Bélier"></td><td><img src="img/un/u/28.gif" title="Catapulte de Guerre"></td><td><img src="img/un/u/29.gif" title="Chef"></td><td><img src="img/un/u/30.gif" title="Colon"></td>\n </tr>\n <tr id="ta_cre_ga">\n  <td>'+armeev_ga[0]+'</td><td>'+armeev_ga[1]+'</td><td>'+armeev_ga[2]+'</td><td>'+armeev_ga[3]+'</td><td>'+armeev_ga[4]+'</td><td>'+armeev_ga[5]+'</td><td>'+armeev_ga[6]+'</td><td>'+armeev_ga[7]+'</td><td>'+armeev_ga[8]+'</td><td>'+armeev_ga[9]+'</td>\n </tr>\n</table>\n<p><br /></p>'
  if (av_ro!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Romaines</td>\n </tr> \n <tr class="unit">\n  <td><img src="img/un/u/1.gif" title="Légionnaire"></td><td><img src="img/un/u/2.gif" title="Prétorien"></td><td><img src="img/un/u/3.gif" title="Impérian"></td><td><img src="img/un/u/4.gif" title="Equites Legati"></td><td><img src="img/un/u/5.gif" title="Equites Imperatoris"></td><td><img src="img/un/u/6.gif" title="Equites Caesaris"></td><td><img src="img/un/u/7.gif" title="Bélier"></td><td><img src="img/un/u/8.gif" title="Catapulte de feu"></td><td><img src="img/un/u/9.gif" title="Sénateur"></td><td><img src="img/un/u/10.gif" title="Colon"></td>\n </tr>\n <tr id="ta_cre_ro">\n  <td>'+armeev_ro[0]+'</td><td>'+armeev_ro[1]+'</td><td>'+armeev_ro[2]+'</td><td>'+armeev_ro[3]+'</td><td>'+armeev_ro[4]+'</td><td>'+armeev_ro[5]+'</td><td>'+armeev_ro[6]+'</td><td>'+armeev_ro[7]+'</td><td>'+armeev_ro[8]+'</td><td>'+armeev_ro[9]+'</td>\n </tr>\n</table>\n<p><br /></p>'
  
 }
 if ((ah_ge+ah_ga+ah_ro)!=0)
 {
  document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<p class="b">Troupes nourries par le village non crées par le village</p>'
  
  if (ah_ge!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Germaines</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/11.gif" title="Combattant au gourdin"></td><td><img src="img/un/u/12.gif" title="Combattant à la lance"></td><td><img src="img/un/u/13.gif" title="Combattant à la hache"></td><td><img src="img/un/u/14.gif" title="Eclaireur"></td><td><img src="img/un/u/15.gif" title="Paladin"></td><td><img src="img/un/u/16.gif" title="Cavalier Teuton"></td><td><img src="img/un/u/17.gif" title="Bélier"></td><td><img src="img/un/u/18.gif" title="Catapulte"></td><td><img src="img/un/u/19.gif" title="Chef de tribu"></td><td><img src="img/un/u/20.gif" title="Colon"></td>\n </tr>\n <tr>\n  <td>'+armeeh_ge[0]+'</td><td>'+armeeh_ge[1]+'</td><td>'+armeeh_ge[2]+'</td><td>'+armeeh_ge[3]+'</td><td>'+armeeh_ge[4]+'</td><td>'+armeeh_ge[5]+'</td><td>'+armeeh_ge[6]+'</td><td>'+armeeh_ge[7]+'</td><td>'+armeeh_ge[8]+'</td><td>'+armeeh_ge[9]+'</td>\n </tr>\n</table><p><br /></p>'
  if (ah_ga!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+ '\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Gauloises</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/21.gif" title="Phalange"></td><td><img src="img/un/u/22.gif" title="Combattant à l\'épée"></td><td><img src="img/un/u/23.gif" title="Eclaireur"></td><td><img src="img/un/u/24.gif" title="Eclair de Toutatis"></td><td><img src="img/un/u/25.gif" title="Cavalier druide"></td><td><img src="img/un/u/26.gif" title="Hédouin"></td><td><img src="img/un/u/27.gif" title="Bélier"></td><td><img src="img/un/u/28.gif" title="Catapulte de Guerre"></td><td><img src="img/un/u/29.gif" title="Chef"></td><td><img src="img/un/u/30.gif" title="Colon"></td>\n </tr>\n <tr>\n  <td>'+armeeh_ga[0]+'</td><td>'+armeeh_ga[1]+'</td><td>'+armeeh_ga[2]+'</td><td>'+armeeh_ga[3]+'</td><td>'+armeeh_ga[4]+'</td><td>'+armeeh_ga[5]+'</td><td>'+armeeh_ga[6]+'</td><td>'+armeeh_ga[7]+'</td><td>'+armeeh_ga[8]+'</td><td>'+armeeh_ga[9]+'</td>\n </tr>\n</table><p><br /></p>'
  if (ah_ro!=0)
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+'\n<table cellspacing="1" cellpadding="2" class="tbg">\n <tr class="cbg1">\n  <td colspan="10" class="b">Troupes Romaines</td>\n </tr>\n <tr class="unit">\n  <td><img src="img/un/u/1.gif" title="Légionnaire"></td><td><img src="img/un/u/2.gif" title="Prétorien"></td><td><img src="img/un/u/3.gif" title="Impérian"></td><td><img src="img/un/u/4.gif" title="Equites Legati"></td><td><img src="img/un/u/5.gif" title="Equites Imperatoris"></td><td><img src="img/un/u/6.gif" title="Equites Caesaris"></td><td><img src="img/un/u/7.gif" title="Bélier"></td><td><img src="img/un/u/8.gif" title="Catapulte de feu"></td><td><img src="img/un/u/9.gif" title="Sénateur"></td><td><img src="img/un/u/10.gif" title="Colon"></td>\n </tr>\n <tr>\n  <td>'+armeeh_ro[0]+'</td><td>'+armeeh_ro[1]+'</td><td>'+armeeh_ro[2]+'</td><td>'+armeeh_ro[3]+'</td><td>'+armeeh_ro[4]+'</td><td>'+armeeh_ro[5]+'</td><td>'+armeeh_ro[6]+'</td><td>'+armeeh_ro[7]+'</td><td>'+armeeh_ro[8]+'</td><td>'+armeeh_ro[9]+'</td>\n </tr>\n</table><p><br /></p>'
  
 }
 ro="&"
 ge=""
 ga="&"
 for (i=0;i<10;i++)
 {
  ge=ge+"&ge"+i+"="+armeev_ge[i];
  ga=ga+"&ga"+i+"="+armeev_ga[i];
  ro=ro+"&ro"+i+"="+armeev_ro[i];
 }
 
 document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"\n<p class='b'>Troupes nourries par les villages</p>\n<table id='ta_nou' cellspacing='1' cellpadding='2' class='tbg'>\n <tr class='cbg1'>\n  <td rowspan='2'>&nbsp;</td><td colspan='10' class='b'>Troupes Germaines</td><td colspan='10' class='b'>Troupes Gauloises</td><td colspan='10' class='b'>Troupes Romaines</td></tr><tr class='unit'><td><img src='img/un/u/11.gif' title='Combattant au gourdin'></td><td><img src='img/un/u/12.gif' title='Combattant à la lance'></td><td><img src='img/un/u/13.gif' title='Combattant à la hache'></td><td><img src='img/un/u/14.gif' title='Eclaireur'></td><td><img src='img/un/u/15.gif' title='Paladin'></td><td><img src='img/un/u/16.gif' title='Cavalier Teuton'></td><td><img src='img/un/u/17.gif' title='Bélier'></td><td><img src='img/un/u/18.gif' title='Catapulte'></td><td><img src='img/un/u/19.gif' title='Chef de tribu'></td><td><img src='img/un/u/20.gif' title='Colon'></td><td><img src='img/un/u/21.gif' title='Phalange'></td><td><img src='img/un/u/22.gif' title='Combattant à l\'épée'></td><td><img src='img/un/u/23.gif' title='Eclaireur'></td><td><img src='img/un/u/24.gif' title='Eclair de Toutatis'></td><td><img src='img/un/u/25.gif' title='Cavalier druide'></td><td><img src='img/un/u/26.gif' title='Hédouin'></td><td><img src='img/un/u/27.gif' title='Bélier'></td><td><img src='img/un/u/28.gif' title='Catapulte de Guerre'></td><td><img src='img/un/u/29.gif' title='Chef'></td><td><img src='img/un/u/30.gif' title='Colon'></td><td><img src='img/un/u/1.gif' title='Légionnaire'></td><td><img src='img/un/u/2.gif' title='Prétorien'></td><td><img src='img/un/u/3.gif' title='Impérian'></td><td><img src='img/un/u/4.gif' title='Equites Legati'></td><td><img src='img/un/u/5.gif' title='Equites Imperatoris'></td><td><img src='img/un/u/6.gif' title='Equites Caesaris'></td><td><img src='img/un/u/7.gif' title='Bélier'></td><td><img src='img/un/u/8.gif' title='Catapulte de feu'></td><td><img src='img/un/u/9.gif' title='Sénateur'></td><td><img src='img/un/u/10.gif' title='Colon'></td>\n </tr>\n</table>\n<p>&nbsp;</p><p class='b'>Troupes crées par les villages</p>"
 
switch (peuple)
{
 case "ga":
  document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"\n<table id='ta_cre' cellspacing='1' cellpadding='2' class='tbg'>\n <tr class='unit'>\n  <td>&nbsp;</td><td><img src='img/un/u/21.gif' title='Phalange'></td><td><img src='img/un/u/22.gif' title='Combattant à l\'épée'></td><td><img src='img/un/u/23.gif' title='Eclaireur'></td><td><img src='img/un/u/24.gif' title='Eclair de Toutatis'></td><td><img src='img/un/u/25.gif' title='Cavalier druide'></td><td><img src='img/un/u/26.gif' title='Hédouin'></td><td><img src='img/un/u/27.gif' title='Bélier'></td><td><img src='img/un/u/28.gif' title='Catapulte de Guerre'></td><td><img src='img/un/u/29.gif' title='Chef'></td><td><img src='img/un/u/30.gif' title='Colon'></td>\n </tr>\n</table>"
  break;
 case "ro":
   document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"\n<table id='ta_cre' cellspacing='1' cellpadding='2' class='tbg'>\n <tr class='unit'>\n  <td>&nbsp;</td><td><img src='img/un/u/1.gif' title='Légionnaire'></td><td><img src='img/un/u/2.gif' title='Prétorien'></td><td><img src='img/un/u/3.gif' title='Impérian'></td><td><img src='img/un/u/4.gif' title='Equites Legati'></td><td><img src='img/un/u/5.gif' title='Equites Imperatoris'></td><td><img src='img/un/u/6.gif' title='Equites Caesaris'></td><td><img src='img/un/u/7.gif' title='Bélier'></td><td><img src='img/un/u/8.gif' title='Catapulte de feu'></td><td><img src='img/un/u/9.gif' title='Sénateur'></td><td><img src='img/un/u/10.gif' title='Colon'></td>\n </tr>\n</table>"
  break;
 case "ge" :
 document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"\n<table id='ta_cre' cellspacing='1' cellpadding='2' class='tbg'>\n <tr class='unit'>\n  <td>&nbsp;</td><td><img src='img/un/u/11.gif' title='Combattant au gourdin'></td><td><img src='img/un/u/12.gif' title='Combattant à la lance'></td><td><img src='img/un/u/13.gif' title='Combattant à la hache'></td><td><img src='img/un/u/14.gif' title='Eclaireur'></td><td><img src='img/un/u/15.gif' title='Paladin'></td><td><img src='img/un/u/16.gif' title='Cavalier Teuton'></td><td><img src='img/un/u/17.gif' title='Bélier'></td><td><img src='img/un/u/18.gif' title='Catapulte'></td><td><img src='img/un/u/19.gif' title='Chef de tribu'></td><td><img src='img/un/u/20.gif' title='Colon'></td>\n </tr>\n</table>"
  break;
   default :
 document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"\n<table id='ta_cre' cellspacing='1' cellpadding='2' class='tbg'>\n</table>"
} 
 
astuce=""

fonction="i=0;document.getElementById(\"val2_bernard_\").innerHTML=\"Charge\";document.getElementById(\"ta_nou\").innerHTML=document.getElementById(\"ta_nou\").innerHTML+\"<tr id=\\\"ta_nou_"+ville_nom[0]+"\\\"><th>"+ville_nom[0]+"</th></tr>\";document.getElementById(\"ta_cre\").innerHTML=document.getElementById(\"ta_cre\").innerHTML+\"<tr id=\\\"ta_cre_"+ville_nom[0]+"\\\"><th>"+ville_nom[0]+"</th></tr>\";msg_s8=window.open(\"http://s6.travian.fr/build.php"+ville_chemin[0]+"\",\"S8\");i=1;while(i<6 && document.getElementById(\"val2_bernard_\").innerHTML==\"Charge\"){alert(\"Mise à jour de "+ville_nom[0]+"\"); setTimeout(\"i++\",10000*i);i++}"+astuce+"document.getElementById(\"val2_bernard_\").innerHTML=\"Charge\";msg_s8.close();"
for (v=1;v<nb_ville;v++)
{
 fonction=fonction+"document.getElementById(\"ta_nou\").innerHTML=document.getElementById(\"ta_nou\").innerHTML+\"<tr id=\\\"ta_nou_"+ville_nom[v]+"\\\"><th>"+ville_nom[v]+"</th></tr>\";document.getElementById(\"ta_cre\").innerHTML=document.getElementById(\"ta_cre\").innerHTML+\"<tr id=\\\"ta_cre_"+ville_nom[v]+"\\\"><th>"+ville_nom[v]+"</th></tr>\";msg_s8=window.open(\"http://s6.travian.fr/build.php"+ville_chemin[v]+"\",\"S8\");i=1;while(i<3 && document.getElementById(\"val2_bernard_\").innerHTML==\"Charge\") {i++;alert(\"Mise à jour de "+ville_nom[v]+"\");setTimeout(\"i++\",10000*i);}"+astuce+";document.getElementById(\"val2_bernard_\").innerHTML=\"Charge\";msg_s8.close();"
}


//alert(document.getElementById("tata_nounou").innerHTML);
//alert(ville)
//alert(peuple)
//alert("ge="+a_ge+" ; ga="+a_ga+" ; ro="+a_ro);


if (window.opener==null)
{
 document.getElementById("___bernard").innerHTML=document.getElementById("___bernard").innerHTML+"<p>Validation automatique des villages : <a id='val2_bernard_' href='#' onclick='"+fonction+"'>Cliquez ici</a></p>";
}
else
{
 //alert("pas null : "+a)
 if (astuce=="")
  window.opener.document.getElementById("val2_bernard_").innerHTML="fin"
 else
 {
  window.opener.document.getElementById("val2_bernard_").innerHTML=document.getElementById("val_bernard_").getAttribute("href")
  window.opener.document.getElementById("val_bernard_").setAttribute("href",document.getElementById("val_bernard_").getAttribute("href"))
 }
 if (peuple!="")
 {
alert(ville)
 if (a_ge!=0)
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+document.getElementById("ta_nou_ge").innerHTML
 else
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+'<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>'
 if (a_ga!=0)
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+document.getElementById("ta_nou_ga").innerHTML
 else
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+'<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>'
 if (a_ro!=0)
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+document.getElementById("ta_nou_ro").innerHTML
 else
  window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+'<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>'
 if ((av_ge+av_ga+av_ro)!=0)
  window.opener.document.getElementById("ta_cre_"+ville).innerHTML=window.opener.document.getElementById("ta_cre_"+ville).innerHTML+document.getElementById("ta_cre_"+peuple).innerHTML
 else
  window.opener.document.getElementById("ta_cre_"+ville).innerHTML=window.opener.document.getElementById("ta_cre_"+ville).innerHTML+'<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>'
 }
 else
 {
   window.opener.document.getElementById("ta_nou_"+ville).innerHTML=window.opener.document.getElementById("ta_nou_"+ville).innerHTML+'<td colspan="30">Pas de place de rassemblement</td>'
  window.opener.document.getElementById("ta_cre_"+ville).innerHTML=window.opener.document.getElementById("ta_cre_"+ville).innerHTML+'<td colspan="10">Pas de place de rassemblement</td>'

 }
}
 