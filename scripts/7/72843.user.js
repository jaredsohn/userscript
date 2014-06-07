// ==UserScript==
// @name           Clearance
// @namespace      FFSFAST
// @description    Clearance
// @include        http://apps.facebook.com/friendsforsale/users/clearance*
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
function formatCurrency(num) {
num = num.toString().replace(/\$|\,/g,'');
if(isNaN(num))
num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
//return (((sign)?'':'-') + '$' + num + '.' + cents);
return (((sign)?'':'-') + '$' + num);
}

function recarga() {
window.location.reload();
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

Window.abc = function() {

var tiempo;
var idtimeout;
var cookie = readCookie("C");
var nuevalista=0;
 if (cookie==null) {
//   createCookie("C",lista,2);
   alert("NEW LIST");
   cookie = "";
   nuevalista=1;
 }

var alltags=document.getElementsByTagName("*"); 
var lista=new Array();
var j=0;
var hay=0;
var cualquiera=0;
var topindex;
var currcash=-1;
var origcash= 0; 
for (i=0; i<alltags.length; i++) { 
 //Pick out the tags with our class name 
   if (alltags[i].className=="user-item on_sale") { 
      var temp1=alltags[i].innerHTML.split("onclick")[0];
      temp1=temp1.split("show/")[1]; 
      temp1=temp1.split('"')[0];
      temp1=temp1.split("?")[0];

      lista[j]=temp1;
      j=j+1;
      if (cookie.split(",").inArray(temp1)) {
        cualquiera=i;
        alltags[i].innerHTML='X';
        alltags[i].style.display='none';
      }
      else {
//powerbid link        alltags[i].innerHTML=alltags[i].innerHTML + '<a href="http://apps.facebook.com/friendsforsale/users/show/'+temp1+'?pb=on">===&gt;POWERBID '+temp1+'</a>';
        cookie=temp1 + "," + cookie;
        hay = hay + 1;
        var cash=parseInt(stripNonNumeric(alltags[i].innerHTML.split('<span class="money">$')[1].split("</span>")[0]));
        if ((cash==1100000) || (cash==750000) || (cash==562500) || (cash==421875)) {
          alltags[i].innerHTML = '<span style="background-color:red;font-size:200%;">' + alltags[i].innerHTML + "</span>";
           alert("RESET!!!!");
        } else
        if (cash>=800000 && cash<=1100000) {
          alltags[i].innerHTML = '<span style="background-color:red;font-size:200%;">' + alltags[i].innerHTML + "</span>";
        }
      }
   } else
if (alltags[i].className=="top_big gam") { 
      alltags[i].innerHTML='<a href="http://apps.facebook.com/friendsforsale/users/clearance"><span style="background-color:red;font-size:150%;">**** PAGE ERROR ***** . PLEASE RELOAD MANUAL HERE =====&gt; HOT BUYS &lt;=====</span></a>';
      topindex = i;
//      alltags[i].style.display='none';
   }  else
if (alltags[i].className=="bottom gam") { 
      alltags[i].innerHTML='<a href="http://apps.facebook.com/friendsforsale/users/clearance">=====&gt; HOT BUYS &lt;=====</a>';
   }  else
if (alltags[i].className=="money" && currcash==-1) {
    currcash=alltags[i].innerHTML;
   }
}
var arrcookie=cookie.split(",");
var newarrcookie=new Array();
var newcookie="";
for (i=0; i<arrcookie.length; i++) { 
 if (i < 70){
    newarrcookie[i] = arrcookie[i];
 }
}
for (i=0; i<newarrcookie.length; i++) { 
 newcookie = newcookie + newarrcookie[i]; 
 if (i < newarrcookie.length - 2) newcookie = newcookie + ",";
}
createCookie("C",newcookie,2);
if (nuevalista == 1) {
createCookie("CM",currcash,2);
 origcash = currcash;
} else {
 origcash = readCookie("CM");
 if (origcash == null) {
   origcash = currcash;
   createCookie("CM",currcash,2);
 } 
}
//alert(lista);


if (hay == 0) {
   tiempo = 2000+Math.floor(Math.random() * 3000);
   alltags[cualquiera].innerHTML='<div style="font-size:200%;">RELOADING ON '+(tiempo/1000)+' SECONDS.........</div>';
   alltags[cualquiera].style.display='block';
   idtimeout=window.setTimeout(function() recarga(),tiempo);
} else
if (hay == 1 || hay == 2 || hay == 3) {
   tiempo = 4000+Math.floor(Math.random() * 3000);
   alltags[cualquiera].innerHTML='<div style="font-size:200%;">RELOADING ON '+(tiempo/1000)+' SECONDS.........</div>';
   alltags[cualquiera].style.display='block';
   idtimeout=window.setTimeout(function() recarga(), tiempo);
}

alltags[topindex].innerHTML=currcash + " - " + origcash + " = " + formatCurrency(parseInt(stripNonNumeric(currcash)) - parseInt(stripNonNumeric(origcash))) +" profit<br /><br />";
alltags[topindex].innerHTML=alltags[topindex].innerHTML+'<a href="http://apps.facebook.com/friendsforsale/users/clearance">=====&gt; HOT BUYS &lt;=====</a>';

}
Window.abc();