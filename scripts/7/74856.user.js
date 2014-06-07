// ==UserScript==
// @name Diferentes Horarios Ikariam
// @namespace 
// @description Poner varios horarios en el ikariam
// @include     http://s2.ikariam.es/index.php*
// ==/UserScript==

function dezInt(num,size,prefix){prefix=(prefix)?prefix:"0";var minus=(num<0)?"-":"",result=(prefix=="0")?minus:"";num=Math.abs(parseInt(num,10));size-=(""+num).length;for(var i=1;i<=size;i++){result+=""+prefix;}
result+=((prefix!="0")?minus:"")+num;return result;}

function getFormattedDate(timestamp,format){var currTime=new Date();currTime.setTime(timestamp);str=format;str=str.replace('d',dezInt(currTime.getDate(),2));str=str.replace('m',dezInt(currTime.getMonth()+1,2));str=str.replace('Y',currTime.getFullYear());str=str.replace('y',currTime.getFullYear().toString().substr(2,4));str=str.replace('G',currTime.getHours());str=str.replace('H',dezInt(currTime.getHours(),2));str=str.replace('i',dezInt(currTime.getMinutes(),2));str=str.replace('s',dezInt(currTime.getSeconds(),2));return str;}


function cambiarHorario() {
 var d = new Date();
 d.setMinutes(d.getMinutes()+d.getTimezoneOffset()-10*60);
 var strHoraGt = "Col: "+ getFormattedDate(d, 'd/G:i');
 d = new Date();
 d.setMinutes(d.getMinutes()+d.getTimezoneOffset()-8*60);
 var strHoraArg = "Arg: "+ getFormattedDate(d, 'd/G:i');
 document.getElementById('servertime').nextSibling.innerHTML=" | "+strHoraGt+" | "+strHoraArg;
}

iniciaCambioHorario = function() {
 var servertime,detalleHoras;
 servertime = document.getElementById('servertime');
 if (servertime) {
  detalleHoras = document.createElement('span');
  detalleHoras.innerHTML="";
  servertime.parentNode.insertBefore(detalleHoras, servertime.nextSibling);
 } 
 cambiarHorario();
}

iniciaCambioHorario();