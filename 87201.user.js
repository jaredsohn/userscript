// ==UserScript==
// @name           FFS TEST1 Cheat
// @description    TEST1 FFS
// @namespace      http://userscripts.org/scripts/show/87201
// @include        http://apps.facebook.com/friendsforsale/users?filter*
// @implementation pineflower
// ==/UserScript==

function stripNonNumeric( str )
 {
   str += '';
   var rgx = /^\d|\.|-$/;
   var out = '';
   for( var i = 0; i < str.length; i++ )
   {
     if( rgx.test( str.charAt(i) ) ){
       if( !( ( str.charAt(i) == '.' && out.indexOf( '.' ) != -1 ) ||
              ( str.charAt(i) == '-' && out.length != 0 ) ) ){
         out += str.charAt(i);
       }
     }
   }
   return out;
 }

function recarga(nuevaubica) {
window.location.href=nuevaubica;
}
function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
   }
function readCookie(name) {
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
     }
     return null;
   }

Array.prototype.inArray = function (value) {
	var i;
	for (i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};

var ubicacion=location.href;
var splitubica=ubicacion.split("=");
// var nactual=parseInt(splitubica[2]);
//var nactual=parseInt(splitubica[2].split("&")[0]);
var nactual=parseInt(splitubica[5].split("&")[0]);
var pagina=parseInt(splitubica[3].split("&")[0]);
if (pagina <= 0) {pagina = 1;}
else if(pagina >= 3) {pagina = 1;}
else {pagina = pagina + 1;}

//var nuevaubica=splitubica[0] + "=" + splitubica[1] + "=" + (nactual + 1);
var nuevaubica=splitubica[0] + "=" + splitubica[1] + "=" + splitubica[2] + "=" + pagina + "&suppress_tutorial" + "=" + splitubica[4] + "=" + (nactual + 1);
// var nuevaubica=splitubica[0] + "=" + splitubica[1] + "=" + (nactual + 1) + "&suppress_tutorial" + "=" + splitubica[3];

// toppets.innerHTML='<a href="'+nuevaubica+'">Refresh Location '+(parseInt(splitubica[2]) + 1)+'</a>';

var alltags=document.getElementsByTagName("*"); 
var lista2="";
 for (i=0; i<alltags.length; i++) { 
 //Pick out the tags with our class name 
   if (alltags[i].className=="user-item") { 
    if (alltags[i].innerHTML.indexOf("Hottest Pet") >= 0) {
      var temp1=alltags[i].innerHTML.split("onclick")[0];
      temp1=temp1.split("show/")[1]; 
      temp1=temp1.split('"')[0];
      lista2=lista2 + temp1 + ","; 
    }
   } else
   if (alltags[i].className=="network") { 
      alltags[i].innerHTML='<a href="'+nuevaubica+'"><span style="font-size:150%;">Refresh Location '+(nactual+ 1)+'</span></a>&nbsp;&nbsp;<span style="font-size:200%;">'+(pagina - 1)+'</span><br /><br />';
      var punteronetwork = i;
   } else

if (alltags[i].className=="top_big gam" || alltags[i].className=="bottom gam") { 
      alltags[i].innerHTML='<a href="'+nuevaubica+'"><span style="font-size:250%;">Refresh Location '+(nactual+ 1)+'</span></a><br /><br />';
   }  

 }

lista3=lista2.split(",");
lista = "";
for (i=0; i<lista3.length; i++) {
    lista = lista + lista3[i];
    if (i < lista3.length - 2) lista = lista + ",";
}
// HASTA AQUI OK

if (lista!=""){
 alert("RESET!!!!!!!!!!!!!!!!");
}
else {
  alltags[punteronetwork].innerHTML="Loading... " + alltags[punteronetwork].innerHTML;  
  var buscacash=document.getElementById("app7019261521_my_monies");
  var cash=parseInt(stripNonNumeric(buscacash.innerHTML.split('<span class="money">$')[1].split("</span>")[0]));
  if (cash < 1500000 || cash > 10000000){

    window.setTimeout(recarga(nuevaubica), 8000+Math.floor(Math.random() * 3000));
  }
  else {
    window.setTimeout(recarga(nuevaubica), 100+Math.floor(Math.random() * 3000));
  }
}

