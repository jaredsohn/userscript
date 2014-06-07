// ==UserScript==
// @name KingsAgeMod
// @version 0.41
// @include http://*.kingsage.*/*
// @include http://*.kingsage.*.*/*
// ==/UserScript==


//
//valoda
//

var buttonupdate='Atjaunot!';
var alertupdated='Ciemu saraksts Atjaunots!';
var textdistance='Distance';
var textatacker='Uzbrucējs:';
var texttarget='Mērķis:';
var textcount='Rēķināt';
var textsword='Templietis';
var textspear='Šķēpnesis';
var textaxe='Āvnesis';
var textbow='Lokšāvējs';
var textspy='Spiegs';
var textlight='Krustnesis';
var textheavy='Melnais bruņinieks';
var textram='Tarāns';
var textkata='Trebušē';
var textsnob='Grāfs';


//
//nosaku adresi bildeem.
//

var address = window.location.toString();
var addressarray = address.split("?");
addressarray = addressarray[0].split("game");
address=addressarray[0];



// 
//atjaunot ciemu sarakstu.
//

window.updateList = function(){
var li='';
var j = 0;
var slicedurl='';

do{
  j++;
  var om = j + 1;
  var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr["+om+"]/td/a";
  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
  var rst=resultLinks.iterateNext();
  if(rst!=null){
  GM_setValue('ciematsname['+om+']',rst.innerHTML);
  var findPatternpoints = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr["+om+"]/td[2]";
  var resultLinkspoints = document.evaluate( findPatternpoints, document, null, XPathResult.ANY_TYPE , null );
  var rstpoints=resultLinkspoints.iterateNext();
  GM_setValue('ciematspoints['+om+']',rstpoints.innerHTML);
  slicedurl=rst.getAttribute('href');
  slicedurl_array=slicedurl.split("&");
  GM_setValue('ciematsurl['+om+']',slicedurl_array[0]);
  GM_setValue('ciematsdaudz',om);
  li=li+'<tr><td class="marked"><a href="'+rst+'">'+rst.innerHTML+'</a></td></tr>';
  }else{
break;
  }
  }
while(rst!=null);

li=li+'';
GM_setValue('list',li.toString());
alert(alertupdated);
}


// 
// Nosaka s veertiibu.
//

var qs=new Array();
var loc=location.search;
if (loc){loc=loc.substring(1);
var parms=loc.split('&');
for(var i=0;i<parms.length;i++){
nameValue=parms[i].split('=');
qs[nameValue[0]]=unescape(nameValue[1]);
}
}


// 
// Nosaka   next un prev pogu veertiibas.
//


// prev
var nextval=1;
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/img";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var imgprew= rst.getAttribute('src');
var imgprew_array=imgprew.split("/");
if (imgprew_array[4]=='arrow_left_i.png'){
prew= " <img src='"+imgprew+"' alt=''> ";
}else{
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/a[1]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var prewurl= rst.getAttribute('href');
var prew= rst.innerHTML;
prew= " <a href='"+prewurl+"'>"+prew+"</a> ";
var nextval=2;
}
// next
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/img";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var imgnext= rst.getAttribute('src');
var imgnext_array=imgnext.split("/");
if (imgnext_array[4]=='arrow_right_i.png'){
next= " <img src='"+imgnext+"' alt=''> ";
}else{
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/a["+nextval+"]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var nexturl= rst.getAttribute('href');
var next= rst.innerHTML;
next= " <a href='"+nexturl+"'>"+next+"</a> ";
}


// 
// Saliek  izveelni pa gabaliniem kopaa.
//

var vilage=document.getElementById('settlement').innerHTML;
var vilage_array=vilage.split("|");
var curname= vilage_array[2];
var curcord= '('+vilage_array[0]+'|'+vilage_array[1]+')';
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
rst.innerHTML='<b>'+prew+next+'&nbsp;&nbsp;<a href="#" onclick="switchDisplay(\'village_drop_down\')" />'+curname+'</a>&nbsp;&nbsp;<img src="'+address+'img/arrow_drop_down.png" alt="" onclick="switchDisplay(\'village_drop_down\')" />';
rst.innerHTML=rst.innerHTML+'&nbsp;&nbsp;&nbsp;<a href="#" onmouseover="switchDisplay(\'group_drop_down\')" onmouseout="switchDisplay(\'group_drop_down\')" /><font color=black>'+curcord+'</font></a> ';
rst.innerHTML=rst.innerHTML+'</b>&nbsp;&nbsp;&nbsp;<img src="'+address+'img/command/attack.png" alt="" onmouseover="switchDisplay(\'villageinfo_drop_down\')" onmouseout="switchDisplay(\'villageinfo_drop_down\')" />';

// 
// Saliek ciemus neredzamaa DIV.
//

var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/div/table/tbody";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var mylist='';
for(var i=2;i<GM_getValue('ciematsdaudz')+1;i++){
mylist = mylist+'<tr><td class="marked"><a href="'+GM_getValue('ciematsurl['+i+']')+'&s='+qs['s']+'">'+GM_getValue('ciematsname['+i+']')+'</a>&nbsp;&nbsp;&nbsp;('+GM_getValue('ciematspoints['+i+']')+')</td></tr>';
}
rst.innerHTML=mylist;

// 
// Ieliek  Minikarti  neredzamaa DIV.
//

var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[5]/div/table/tbody";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var mapinfo='<table class="borderlist" ><tbody>';
mapinfo=mapinfo+'<tr><td class="marked" style="padding:5px;">';
mapinfo=mapinfo+'<iframe scrolling="no" width="226" height="226" frameborder="0" src="'+address+'minimap.php?x='+vilage_array[0]+'&y='+vilage_array[1]+'">';
mapinfo=mapinfo+'</td></tr>';
mapinfo=mapinfo+'</tbody></table>';
rst.innerHTML=mapinfo;

// 
// Ieliek kareivju info neredzamaa DIV
//

var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[5]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
var vilageinfo='<div id="container_villageinfo_drop_down"><div id="villageinfo_drop_down" style="display: none;">';
vilageinfo=vilageinfo+'<table class="borderlist" style="width: 403px;"><tbody>';
vilageinfo=vilageinfo+'<tr><td class="marked" style="padding:5px;">';
vilageinfo=vilageinfo+'<table class="borderlist" style="width: 400px;">';
vilageinfo=vilageinfo+'<tbody><tr>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_sword.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_spear.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_axe.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_bow.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_spy.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_light.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_heavy.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_ram.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_kata.png"></th>';
vilageinfo=vilageinfo+'    <th style="text-align: center; width: 40px;"><img src="'+address+'img/units/unit_snob.png"></th>';
vilageinfo=vilageinfo+'</tr>';
vilageinfo=vilageinfo+'<tr>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[4]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[5]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[6]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[7]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[8]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[9]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[10]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[11]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[12]+'</td>';
vilageinfo=vilageinfo+'    <td style="text-align: right;">'+vilage_array[13]+'</td>';
vilageinfo=vilageinfo+'</tr>';
vilageinfo=vilageinfo+'</tbody>';
vilageinfo=vilageinfo+'</table>';
vilageinfo=vilageinfo+'</td></tr>';
vilageinfo=vilageinfo+'</tbody></table>';
vilageinfo=vilageinfo+'</div></div>';
rst.innerHTML=rst.innerHTML+vilageinfo;

// 
// Ja izveeleets ciematu paarskats  ieliek  update pogu.
//


if(qs['s'].toString()=='overview_villages'.toString()){
var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/b";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
rst.innerHTML=rst.innerHTML+'<input type="button" value="'+buttonupdate+'"/>';
var buttonxpath ='/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/b/input';
var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
button=buttons.iterateNext()
button.addEventListener('click',
function (event) {
window.updateList();
},true);
}

// 
// Ja izveeleets Riiki saliek visas tur iespeejamaas fiichas.
//

if(qs['s'].toString()=='tools'.toString()){

// 
// Ja izveeleets Veiksanas laika kalkulators.
//

if(qs['m'].toString()=='runtime_calculator'.toString()){
printinputtable = function(){
var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/p";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
rst.innerHTML='';
var inputatable = '<table class="borderlist">';
inputatable = inputatable +'<tbody>';
inputatable = inputatable +'<tr>';
inputatable = inputatable +'    <th>'+textatacker+': </th>';
inputatable = inputatable +'    <td>x</td>';
inputatable = inputatable +'    <td><input id="uzbruc_counter_x" name="uzbruc_counter_x" value="" onkeyup="splitxy(\'uzbruc_counter_x\', \'uzbruc_counter_y\')" style="width: 50px;"></td>';
inputatable = inputatable +'    <td>y</td>';
inputatable = inputatable +'    <td><input id="uzbruc_counter_y" name="uzbruc_counter_y" value="" style="width: 50px;"></td>';
inputatable = inputatable +'</tr>';
inputatable = inputatable +'<tr>';
inputatable = inputatable +'    <th>'+texttarget+' </th>';
inputatable = inputatable +'    <td>x</td>';
inputatable = inputatable +'    <td><input id="merk_counter_x" name="merk_counter_x" value="" onkeyup="splitxy(\'merk_counter_x\', \'merk_counter_y\')"  style="width: 50px;"></td>';
inputatable = inputatable +'    <td>y</td>';
inputatable = inputatable +'    <td><input id="merk_counter_y" name="merk_counter_y" value="" style="width: 50px;"></td>';
inputatable = inputatable +'</tr>';
inputatable = inputatable +'</tbody>';
inputatable = inputatable +'</table>';
inputatable = inputatable +'<input type="button" value="'+textcount+'"/><div id=rezultats></div>';
rst.innerHTML=inputatable;
var buttonpath ='/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/p/input';
var buttons = document.evaluate(buttonpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
button=buttons.iterateNext()
button.addEventListener('click',
function (event) {
countruntime();
},true);
}
countruntime = function(){
var findPattern_count = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/p/div";
var resultLinks = document.evaluate( findPattern_count, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
rst.innerHTML='';
var uzbr_x=parseInt(document.getElementById('uzbruc_counter_x').value);
var uzbr_y=parseInt(document.getElementById('uzbruc_counter_y').value);
var merk_x=parseInt(document.getElementById('merk_counter_x').value);
var merk_y=parseInt(document.getElementById('merk_counter_y').value);
var distance = Math.sqrt(Math.pow(uzbr_x-merk_x,2)+Math.pow(uzbr_y-merk_y,2));
var i = 0;
var speeds = new Array(22,18,18,18,9,10,11,30,30,35);
var hours = new Array();
var minutes = new Array();
var seconds = new Array();
while(i < 10){
  var time = speeds[i]*60*distance;
  hours[i] = Math.floor(time/3600);
  minutes[i] = Math.floor((time%3600)/60);
  if (minutes[i].toString().length==1){minutes[i]='0'+minutes[i].toString();}
  seconds[i] = Math.ceil((time%3600)%60);
  if (seconds[i].toString().length==1){seconds[i]='0'+seconds[i].toString();}
  i++;
}
var result='<br><br><table class="borderlist" style="width: 220px;"><tbody>';
result=result+'  <tr><th style="text-align: center; width: 220px;" colspan="3">'+textdistance+' <b>'+Math.round(distance*100)/100+'</b></th></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_sword.png"></td><td>'+textsword+'</td><td style="text-align: right;">'+ hours[0]+':'+minutes[0]+':'+seconds[0]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_spear.png"></td><td>'+textspear+'</td><td style="text-align: right;">'+ hours[1]+':'+minutes[1]+':'+seconds[1]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_axe.png"></td><td>'+textaxe+'</td><td style="text-align: right;">'+     hours[2]+':'+minutes[2]+':'+seconds[2]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_bow.png"></td><td>'+textbow+'</td><td style="text-align: right;">'+     hours[3]+':'+minutes[3]+':'+seconds[3]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_spy.png"></td><td>'+textspy+'</td><td style="text-align: right;">'+     hours[4]+':'+minutes[4]+':'+seconds[4]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_light.png"></td><td>'+textlight+'</td><td style="text-align: right;">'+ hours[5]+':'+minutes[5]+':'+seconds[5]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_heavy.png"></td><td>'+textheavy+'</td><td style="text-align: right;">'+ hours[6]+':'+minutes[6]+':'+seconds[6]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_ram.png"></td><td>'+textram+'</td><td style="text-align: right;">'+     hours[7]+':'+minutes[7]+':'+seconds[7]+'</td></tr>';
result=result+'  <tr><td><img src="'+address+'img/units/unit_kata.png"></td><td>'+textkata+'</td><td style="text-align: right;">'+   hours[8]+':'+minutes[8]+':'+seconds[8]+'</td></tr>';
if(distance > 70){
  result=result+'  <tr><td><img src="'+address+'img/units/unit_snob.png"></td><td>'+textsnob+'</td><td style="text-align: right;"><strong><font color="red">'+   hours[9]+':'+minutes[9]+':'+seconds[9]+'</font></strong></td></tr>';
}else{
  result=result+'  <tr><td><img src="'+address+'img/units/unit_snob.png"></td><td>'+textsnob+'</td><td style="text-align: right;">'+   hours[9]+':'+minutes[9]+':'+seconds[9]+'</td></tr>';
}
result=result+'</tbody></table>';
rst.innerHTML=rst.innerHTML+result;
}
printinputtable();
}//end Veiksanas laika kalkulators 


// 
// Ja izveeleets Uzbrukumu plānotājs.
//

if(qs['m'].toString()=='attack_planer'.toString()){
var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/p";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();

rst.innerHTML='Te buus plānotājs';

}// end Uzbrukumu plānotājs	 

}// end riiki


//
// Ja izveeleets Alianse saliek visas tur iespeejamaas fiichas.
//

if(qs['s'].toString()=='ally'.toString()){

// 
// Ja izveeleets Uzbrukumi.
//

if(qs['m'].toString()=='attacks'.toString()){

var j = 0;
do{
  j++;
  var om = j + 1;
  var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr["+om+"]/td";
  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
  var rst=resultLinks.iterateNext();
  if(rst!=null){

//te merka koardinaates
var findPatternmerkis = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr["+om+"]/td[2]/a[2]";
var resultLinksmerkis = document.evaluate( findPatternmerkis, document, null, XPathResult.ANY_TYPE , null );
var rstmerkis=resultLinksmerkis.iterateNext();
merkisarray=rstmerkis.innerHTML.split(' ');
merkiscount=merkisarray.length;
merkiscoardinates=merkisarray[merkiscount-2];
merkiscoardinatesarray=merkiscoardinates.split('|');
merkisxarray=merkiscoardinatesarray[0].split('(');
merkisyarray=merkiscoardinatesarray[1].split(')');
merkisx=merkisxarray[1];
merkisy=merkisyarray[0];

//te uzbruceja koardinaates
  var findPatternuzbrucejs = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr["+om+"]/td[3]/a[3]";
  var resultLinksuzbrucejs = document.evaluate( findPatternuzbrucejs, document, null, XPathResult.ANY_TYPE , null );
  var rstuzbrucejs=resultLinksuzbrucejs.iterateNext();
uzbrucejsarray=rstuzbrucejs.innerHTML.split(' ');
uzbrucejscount=uzbrucejsarray.length;
uzbrucejscoardinates=uzbrucejsarray[uzbrucejscount-2];
uzbrucejscoardinatesarray=uzbrucejscoardinates.split('|');
uzbrucejsxarray=uzbrucejscoardinatesarray[0].split('(');
uzbrucejsyarray=uzbrucejscoardinatesarray[1].split(')');
uzbrucejsx=uzbrucejsxarray[1];
uzbrucejsy=uzbrucejsyarray[0];

var distance = Math.sqrt(Math.pow(uzbrucejsx-merkisx,2)+Math.pow(uzbrucejsy-merkisy,2));
var i = 0;
var speeds = new Array(22,18,18,18,9,10,11,30,30,35);
var hours = new Array();
var minutes = new Array();
var seconds = new Array();
while(i < 10){
  var time = speeds[i]*60*distance;
  hours[i] = Math.floor(time/3600);
  minutes[i] = Math.floor((time%3600)/60);
  if (minutes[i].toString().length==1){minutes[i]='0'+minutes[i].toString();}
  seconds[i] = Math.ceil((time%3600)%60);
  if (seconds[i].toString().length==1){seconds[i]='0'+seconds[i].toString();}
  i++;
}
var infodiv='<span onclick="switchDisplay(\'atackinfo_'+om+'_drop_down\')"><img src="'+address+'img/command/attack.png" /> info</span>';
infodiv= infodiv+'<div id="container_atackinfo_'+om+'_drop_down" style="position: absolute;"><div id="atackinfo_'+om+'_drop_down" style="display: none;">';
infodiv = infodiv+'<table class="borderlist" style="width: 220px;"><tbody>';
infodiv = infodiv+'  <tr><th style="text-align: center; width: 220px;" colspan="3">'+textdistance+' <b>'+Math.round(distance*100)/100+'</b></th></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_sword.png"></td><td>'+textsword+'</td><td style="text-align: right;">'+ hours[0]+':'+minutes[0]+':'+seconds[0]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_spear.png"></td><td>'+textspear+'</td><td style="text-align: right;">'+ hours[1]+':'+minutes[1]+':'+seconds[1]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_axe.png"></td><td>'+textaxe+'</td><td style="text-align: right;">'+     hours[2]+':'+minutes[2]+':'+seconds[2]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_bow.png"></td><td>'+textbow+'</td><td style="text-align: right;">'+     hours[3]+':'+minutes[3]+':'+seconds[3]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_spy.png"></td><td>'+textspy+'</td><td style="text-align: right;">'+     hours[4]+':'+minutes[4]+':'+seconds[4]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_light.png"></td><td>'+textlight+'</td><td style="text-align: right;">'+ hours[5]+':'+minutes[5]+':'+seconds[5]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_heavy.png"></td><td>'+textheavy+'</td><td style="text-align: right;">'+ hours[6]+':'+minutes[6]+':'+seconds[6]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_ram.png"></td><td>'+textram+'</td><td style="text-align: right;">'+     hours[7]+':'+minutes[7]+':'+seconds[7]+'</td></tr>';
infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_kata.png"></td><td>'+textkata+'</td><td style="text-align: right;">'+   hours[8]+':'+minutes[8]+':'+seconds[8]+'</td></tr>';
if(distance > 70){
  infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_snob.png"></td><td>'+textsnob+'</td><td style="text-align: right;"><strong><font color="red">'+   hours[9]+':'+minutes[9]+':'+seconds[9]+'</font></strong></td></tr>';
}else{
  infodiv = infodiv+'  <tr><td><img src="'+address+'img/units/unit_snob.png"></td><td>'+textsnob+'</td><td style="text-align: right;">'+   hours[9]+':'+minutes[9]+':'+seconds[9]+'</td></tr>';
}
infodiv = infodiv+'</tbody></table>';
infodiv= infodiv+ '</div></div>';
rst.innerHTML=infodiv;
  


  }else{
break;
  }
  }
while(rst!=null);


  
  
  
  



}//end 	Uzbrukumi


}//end riiki
