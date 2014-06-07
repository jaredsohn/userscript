// ==UserScript==
// @name           ACF todo
// @namespace      m
// @description    a todo list, specific to each forum.
// @include        http://acforums.megadoomer.com/index.php*
// @include        http://acforums.megadoomer.com/viewforum.php*
// @include        http://acforums.megadoomer.com/viewtopic.php*
// @include        http://acforums.megadoomer.com/posting.php*
// ==/UserScript==

ibox=document.createElement("div");
ibox.style.position='fixed';
ibox.style.top='9px;';
ibox.style.right='9px;';
ibox.style.backgroundColor='#FFFAFA';
ibox.style.color='#000';
ibox.style.padding='15px';
ibox.innerHTML='<div id="hbox"><style type="text/css">.removeitem{position:absolute;top:7px;right:-12px;display:block;width:10px;height:10px;background-color:red;vertical-align:bottom;}#ibox span{padding:2px;}.todoitem{position:relative;}.todowhere{color:#FFF;background:#2F4F4F}</style><div id="dbox"></div><br><input type="text" id="tbox"><button id="btn">Add item</button></div><a href="#" id="hlink">toggle display</a>&nbsp;<a href="#" id="rlink">reset list</a>';
ibox.id='ibox';

var fid;
fid=0;


document.body.insertBefore(ibox, document.body.firstChild);
document.getElementById('btn').addEventListener('click',function(){addItem();},true);
document.getElementById('hlink').addEventListener('click',function(){toggleBox();},true);
document.getElementById('rlink').addEventListener('click',function(){resetList();},true);

if (document.location.toString().match(/\?f/)){
fid=document.location.toString().match(/f\=\d+/)
fid=fid+'';
fid=fid.replace(/f\=/,'');
}
else {if(document.location.toString().match(/index\.php/)){fid='index'}}
if (fid==0){
wdata=document.getElementsByTagName('a');
for (a in wdata){
wdata2=wdata[a].href;
if (wdata2!=null){
if (wdata2.match(/http:\/\/acforums\.megadoomer\.com\/posting.php\?mode\=newtopic&f\=\d+/)){

wdata2=wdata2.match(/f\=\d+/);
wdata2=wdata2+'';
wdata2=wdata2.replace(/f\=/,'');
fid=wdata2;

}
}
}
}

function addItem(){
setCookie('todo',oo+fid+';'+document.getElementById('tbox').value+';',365);
updateBox();
}

function getCookie(c_name)
{
if (document.cookie.length>0)
{ 
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1)
{ 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}

oo=getCookie('todo');
if (oo==null || oo==""){setCookie('todo','',365)}

updateBox();



function updateBox(){

dbox=document.getElementById('dbox');
oo=getCookie('todo');
if (oo==null || oo==""){setCookie('todo','',365);dbox.innerHTML='No items to display'}else{
wdata=oo.split(";")

dbox.innerHTML='';
if (fid!='index'){
for (o in wdata){

if (o%2==1 && wdata[o]!='' && wdata[o-1]==fid){

dbox.innerHTML+='<span class="todoitem">'+wdata[o]+'<a href="#" class="removeitem" id="lq'+o+'"></a></span><br>';

}

}


for (o in wdata){

if (o%2==1 && wdata[o]!='' && wdata[o-1]==fid){

document.getElementById('lq'+o).name=wdata[o-1]+";"+wdata[o];
document.getElementById('lq'+o).addEventListener('click',function(){removeItem(this)},false);

}

}

}

else{

for (o in wdata){

if (o%2==1 && wdata[o]!=''){

switch(parseInt(wdata[o-1])){
case 3:
wdata2='Announcements';
break
case 4:
wdata2='Animal Crossing'
break
case 2:
wdata2='Animal Crossing: Wild World'
break
case 5:
wdata2='Textures'
break
case 6:
wdata2='The Future of Animal Crossing'
break
case 8:
wdata2='Animal Crossing: Wild World Research'
break
case 7:
wdata2='Animal Crossing: Wild World WI-FI Help'
break
case 10:
wdata2='General Board'
break
case 11:
wdata2='Newbie Forum'
break
case 13:
wdata2='Off-Topic'
break
case 14:
wdata2='Ye Olde Message Board'
break
case 15:
wdata2='#Megadoomer'
break
case 16:
wdata2='Homework'
break
case 12:
wdata2='Creativity Outlet'
break
case 26:
wdata2='Computers and Technology Forum'
break
case 22:
wdata2='Spamalicious'
break
case 58:
wdata2='Forum Troubles'
break
case 27:
wdata2='Entertainment - General'
break
case 30:
wdata2='Video Games'
break
case 31:
wdata2='Sports'
break
case 28:
wdata2='All Things Retro'
break
case 29:
wdata2='Top-notch Tomes'
break
case 32:
wdata2='PAL Video Gaming'
break
case 49:
wdata2='Trades and Meetings Announcements'
break
case 50:
wdata2='Furniture'
break
case 46:
wdata2='User Diaries'
break
case 51:
wdata2='Clothing'
break
case 52:
wdata2='Rare Items'
break
case 53:
wdata2='Miscellaneous'
break
case 54:
wdata2='Meetings (Animal Crossing: Wild World)'
break
case 55:
wdata2='Meetings (Other Online Games)'
break
case 57:
wdata2='Trade Reports'
break
case 56:
wdata2='Bells'
break
default:
wdata2=wdata[o-1]
}

dbox.innerHTML+='<span class="todowhere">'+wdata2+'</span>'+'<span class="todoitem">'+wdata[o]+'<a href="#" class="removeitem" id="lq'+o+'"></a></span><br>';

}

}


for (o in wdata){

if (o%2==1 && wdata[o]!=''){

document.getElementById('lq'+o).name=wdata[o-1]+";"+wdata[o];
document.getElementById('lq'+o).addEventListener('click',function(){removeItem(this)},false);

}

}

}

}


}

function toggleBox(){

wdiv=document.getElementById('hbox');

if (wdiv.style.display!='none'){wdiv.style.display='none'}else{wdiv.style.display='block;'}

}

function removeItem(o){
wdata=oo.replace(o.name,'');
wdata=wdata.replace(/;;/g,';');
wdata=wdata.replace(/^;/,'');
setCookie('todo',wdata,365);
updateBox();
}

function resetList(){
setCookie('todo','',365);
updateBox();
}