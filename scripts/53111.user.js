// ==UserScript==
// @name	Team Future
// @namespace	Butsa
// @description	Team Future
// @include	http://butsa.ru/xml/players/roster.php?id=9431&act=abilities
// @include http://butsa.ru/xml/players/roster.php?id=xy4&act=abilities
// ==/UserScript==

//Поиск минимального умения
var plr_id=0;
var main_body="";
var plr_type="";
var vinos=0;
var prof_umen1=0;
var prof_umen2=0;
var mast=0;
var mastI=170;
var mastE=0;
var umenI=21;
var umen_total=0;
var umenE=0;
var koefE=0;
var temp_effect=0;
var effect = new Array();
var talant=0;
var talantI=9;
var talantE=0;
var age=0;
var ageI=20;
var ageE=0;
var koefP=0;
var temp_persp=0;
var persp = new Array();
var plr_type_base="";
var temp="";
var plr_href = new Array();
var find_plr_begin=112;
var gk_count=0;
var plr_begin=0;
var plr_end=0;
var td_plr_type=76;
var td_age=74;
var td_tal=104;
var td_mast=72;
var d_td_prof1=55;
var d_td_prof2=57;
var m_td_prof1=65;
var m_td_prof2=61;
var f_td_prof1=67;
var f_td_prof2=69;
var td_vinos=63;
var td_sms=46;
var plr_name = new Array();
var plr_pos = new Array();
var plr_number = new Array();
var plr_need_now = new Array();
var plr_need_fut = new Array();
var out="";
var effect_srd=0;
var plr_kol=0;
var effect_minis_effect_srd=0;
var raznica_effecta_pr=0;
var plr_bonus = new Array();
var bonus  = new Array();
var bonusI=9;
var bonusE=0;
var temp_bonus="";
var bonus_kol=0;
var td_bonus=86;
window.addEventListener("load",but,false);
function but()
{
 for(i=find_plr_begin;;i=i+14)
{
 if(document.getElementsByTagName("td")[i+2].getElementsByTagName("center")[0].innerHTML!="Gk")
 {
  if(document.getElementsByTagName("td")[i].innerHTML!="")
  {
   plr_href[i]=document.getElementsByTagName("td")[i].getElementsByTagName("a")[0].href;
   temp=plr_href[i].substring(plr_href[i].indexOf("players/")+8,plr_href[i].length);
   plr_href[i]=temp;
   plr_name[i]=document.getElementsByTagName("td")[i].getElementsByTagName("font")[0].innerHTML;
   plr_number[i]=document.getElementsByTagName("td")[i-1].innerHTML;
   plr_pos[i]=document.getElementsByTagName("td")[i+2].getElementsByTagName("center")[0].innerHTML
  }
  else 
  {
   plr_end=i;
   break;
  }
 }
 else
 {
  gk_count++;
 }
}
plr_begin=find_plr_begin+gk_count*14;
for(i=plr_begin;i<plr_end;i=i+14)
{
td_plr_type=76;
td_age=74;
td_tal=104;
td_mast=72;
d_td_prof1=55;
d_td_prof2=57;
m_td_prof1=65;
m_td_prof2=61;
f_td_prof1=67;
f_td_prof2=69;
td_vinos=63;
td_sms=46;
td_bonus=86;
bonus_kol=0;
temp_bonus="";
//Ajax Req
function getXmlHttp(){
  var xmlhttp;
  	try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}
var xmlhttp = getXmlHttp();
xmlhttp.open('GET', 'http://butsa.ru/players/'+plr_href[i], false);
xmlhttp.send(null);
if(xmlhttp.status == 200) {
  document.body.innerHTML=xmlhttp.responseText;
}
if(document.getElementsByTagName("table")[16].className=="transfer-left-1")
{
td_plr_type=td_plr_type+13;
td_age=td_age+13;
td_tal=td_tal+13;
td_mast=td_mast+13;
d_td_prof1=d_td_prof1+13;
d_td_prof2=d_td_prof2+13;
m_td_prof1=m_td_prof1+13;
m_td_prof2=m_td_prof2+13;
f_td_prof1=f_td_prof1+13;
f_td_prof2=f_td_prof2+13;
td_vinos=td_vinos+13;
td_bonus=td_bonus+13;
}
if(!document.getElementsByTagName("td")[td_plr_type].getElementsByTagName("b")[0])
{ 
 td_plr_type=td_plr_type+1;
 td_age=td_age+1;
 td_tal=td_tal+1;
 td_mast=td_mast+1;
 d_td_prof1=d_td_prof1+1;
 d_td_prof2=d_td_prof2+1;
 m_td_prof1=m_td_prof1+1;
 m_td_prof2=m_td_prof2+1;
 f_td_prof1=f_td_prof1+1;
 f_td_prof2=f_td_prof2+1;
 td_vinos=td_vinos+1;
 td_bonus=td_bonus+1;
}
plr_type=document.getElementsByTagName("td")[td_plr_type].getElementsByTagName("b")[0].innerHTML;
plr_type_base=plr_type.substring(0,2);
temp=plr_type_base.substring(1,2);
 switch(temp)
 {
  case "d":
   prof_umen1=document.getElementsByTagName("td")[d_td_prof1].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[d_td_prof1].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen1=prof_umen1.substring(prof_umen1.indexOf("t>")+2,prof_umen1.length);
   }
   prof_umen1=prof_umen1-0;
   prof_umen2=document.getElementsByTagName("td")[d_td_prof2].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[d_td_prof2].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen2=prof_umen2.substring(prof_umen2.indexOf("t>")+2,prof_umen2.length);
   }
   prof_umen2=prof_umen2-0;
   break;
   case "m":
   prof_umen1=document.getElementsByTagName("td")[m_td_prof1].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[m_td_prof1].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen1=prof_umen1.substring(prof_umen1.indexOf("t>")+2,prof_umen1.length);
   }
   prof_umen1=prof_umen1-0;
   prof_umen2=document.getElementsByTagName("td")[m_td_prof2].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[m_td_prof2].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen2=prof_umen2.substring(prof_umen2.indexOf("t>")+2,prof_umen2.length);
   }
   prof_umen2=prof_umen2-0;
   break;
   case "w":
   prof_umen1=document.getElementsByTagName("td")[m_td_prof1].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[m_td_prof1].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen1=prof_umen1.substring(prof_umen1.indexOf("t>")+2,prof_umen1.length);
   }
   prof_umen1=prof_umen1-0;
   prof_umen2=document.getElementsByTagName("td")[m_td_prof2].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[m_td_prof2].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen2=prof_umen2.substring(prof_umen2.indexOf("t>")+2,prof_umen2.length);
   }
   prof_umen2=prof_umen2-0;
   break;
   case "f":
   prof_umen1=document.getElementsByTagName("td")[f_td_prof1].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[f_td_prof1].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen1=prof_umen1.substring(prof_umen1.indexOf("t>")+2,prof_umen1.length);
   }
   prof_umen1=prof_umen1-0;
   prof_umen2=document.getElementsByTagName("td")[f_td_prof2].getElementsByTagName("b")[0].innerHTML;
   if(document.getElementsByTagName("td")[f_td_prof2].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    prof_umen2=prof_umen2.substring(prof_umen2.indexOf("t>")+2,prof_umen2.length);
   }
   prof_umen2=prof_umen2-0;
   break;
 }
vinos=document.getElementsByTagName("td")[td_vinos].getElementsByTagName("b")[0].innerHTML;
if(document.getElementsByTagName("td")[td_vinos].getElementsByTagName("b")[0].getElementsByTagName("font")[0])
   {
    vinos=vinos.substring(vinos.indexOf("t>")+2,vinos.length);
   }
vinos=vinos-0;
temp_bonus=document.getElementsByTagName("td")[td_bonus].getElementsByTagName("b")[0].innerHTML;
bonus=temp_bonus.split(" ");
for(y=0;y<bonus.length;y++)
{
 if(bonus[y].length==2) bonus_kol++;
 if(bonus[y].length==3)
 {
  temp_bonus=bonus[y].substring(bonus[y].length-1,bonus[y].length);
  temp_bonus=temp_bonus-0;
  bonus_kol=bonus_kol+temp_bonus;
 }
}
temp_bonus=bonus_kol;
bonusE=temp_bonus/bonusI;
bonusE=bonusE.toFixed(2);
bonusE=bonusE-0;
mast=document.getElementsByTagName("td")[td_mast].getElementsByTagName("b")[0].innerHTML;
mast-mast-0;
mastE=mast/mastI;
mastE=mastE.toFixed(2);
mastE=mastE-0;
umen_total=(prof_umen1+prof_umen2+vinos)/3;
umen_total=umen_total.toFixed(2);
umen_total=umen_total-0;
umenE=umen_total/umenI;
umenE=umenE.toFixed(2);
umenE=umenE-0;
koefE=mastE+umenE+bonusE;
temp_effect=(koefE/2.5)*100;
temp_effect=temp_effect.toFixed(2);
temp_effect=temp_effect-0;
effect[i]=temp_effect;
//
age=document.getElementsByTagName("td")[td_age].getElementsByTagName("b")[0].innerHTML;
age=age-0;
ageE=ageI/age;
ageE=ageE.toFixed(2);
ageE=ageE-0;
talant=document.getElementsByTagName("td")[td_tal].getElementsByTagName("b")[0].innerHTML;
talant=talant-0;
talantE=talant/talantI;
talantE=talantE.toFixed(2);
talantE=talantE-0;
koefP=talantE+ageE;
temp_persp=(koefP/2)*100;
temp_persp=temp_persp.toFixed(2);
temp_persp=temp_persp-0;
persp[i]=temp_persp;
}
temp=0;
for(i=plr_begin;i<plr_end;i=i+14)
{
 temp=temp+effect[i];
 plr_kol++;
}
effect_srd=temp/plr_kol;
effect_srd=effect_srd.toFixed(2);
effect_srd=effect_srd-0;
for(i=plr_begin;i<plr_end;i=i+14)
{
 if(persp[i]>=88)
 {
  plr_need_fut[i]="<font color=blue><b>Да, очень перспективный игрок</b></font>";
 }
 if((persp[i]>75)&&(persp[i]<88))
 {
  plr_need_fut[i]="<font color=\"#6699CC\"><b>Перспектива есть, но не идеал</b></font>";
 }
 if((persp[i]>=70)&&(persp[i]<=75))
 {
  plr_need_fut[i]="<font color=orange><b>Может пригодится если не появится альтернатива</b></font>";
 }
 if((persp[i]>=65)&&(persp[i]<70))
 {
  plr_need_fut[i]="<font color=\"#FF0066\"><b>Врядли такой игрок пригодится в будущем</b></font>";
 }
 if(persp[i]<65)
 {
  plr_need_fut[i]="<font color=red><b>Будущего у этого игрока в Вашей команде нет</b></font>";
 }
 effect_minis_effect_srd=effect_srd-effect[i];
 if(effect[i]>effect_srd)
 {
  plr_need_now[i]="<font color=blue><b>Да, игрок основы</b></font>";
 }
 raznica_effecta_pr=(effect_minis_effect_srd/effect_srd)*100;
 raznica_effecta_pr=raznica_effecta_pr.toFixed(2);
 raznica_effecta_pr=raznica_effecta_pr-0;
 if((raznica_effecta_pr>=0)&&(raznica_effecta_pr<=5))
 {
  plr_need_now[i]="<font color=orange><b>Игрока можно подпускать к игре за основу</b></font>";
 }
 if((raznica_effecta_pr>5)&&(raznica_effecta_pr<=10))
 {
  plr_need_now[i]="<font color=\"#FF0066\"><b>Дублер</b></font>";
 }
 if(raznica_effecta_pr>10)
 {
  plr_need_now[i]="<font color=red><b>Сейчас он команде не помошник</b></font>";
 }
}
out="<table border=1 cellpadding=0 cellspacing=0 width=1200px><tr><td align=center>№</td><td align=center>Позиция</td><td align=center>Игрок</td><td align=center>Эффективность (%)</td><td align=center>Перспективность (%)</td><td align=center>Надобность в игроке сейчас</td><td align=center>Надобность в игроке в будущем</td></tr>";
for(i=plr_begin;i<plr_end;i=i+14)
{
 out=out+"<tr><td align=center>"+plr_number[i]+"</td><td align=center>"+plr_pos[i]+"</td><td width=150px>"+plr_name[i]+"</td><td align=center>"+effect[i]+"%</td><td align=center>"+persp[i]+"%</td><td align=center>"+plr_need_now[i]+"</td><td align=center>"+plr_need_fut[i]+"</td></tr>";
}
out=out+"</table>";
document.write(out);
}