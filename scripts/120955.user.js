// ==UserScript==
// @name Digger
// @namespace escilon.ru
// @version 3.01
// @description Dig-IT!
// @include http://escilon.ru/caves/72*
// @include http://escilon.ru/caves/112*
// ==/UserScript==

// Math.floor( Math.random( ) * (n - m + 1) ) + m // îò m äî n
var r = Math.floor( Math.random( )*3)+1;
var x = Math.floor( Math.random( )*2);

var a = document.getElementsByTagName('input')[4];
var c = document.getElementsByTagName('input')[5];
var b = document.getElementsByTagName('form')[0];
if (a.type == 'radio')
   {if (a.value == 'mushroom')
       {a.checked = 1;
       document.getElementById('captcha_value').value = r;
       //alert(r);
       //setTimeout(";", 3000);
       document.getElementById('resource_form').submit();
	   }
    else
       if (c.type == 'radio')
          {if (c.value == 'mushroom')
             {c.checked = 1;
             document.getElementById('captcha_value').value = r;
             //alert(r);
             //setTimeout(";", 3000);
             document.getElementById('resource_form').submit();
	         }
           else
               {b.submit();}
	      }
       else
           {b.submit();}
	}
else
 {b.submit();}
 
