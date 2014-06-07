// ==UserScript==
// @name           Mensajes Ikariam
// @namespace      Mail-ika
// @description    Diferencia los Globales de los personales en colores, muestra la primera linea del mensaje
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==

javascript:d=document;pretty=function(t){ c=t.id.substring(7); 
m=d.getElementById('tbl_mail'+c); or=m.style.display; 
m.style.display=''; x=m.innerText || m.textContent; x=x.replace(/ +/g, ' ').replace(/(^ )|( $)/g, ''); 
tds=t.getElementsByTagName('td'); 
tt=tds[3]; h = tt.innerHTML.substring(0,1); if (h!='M') {h="<span style='color: red'>"+h+"</span>";} 
tt.innerHTML = h + " : <span style='color: " + (h == 'M' ? 'red' : 'blue') + "'>" + x.substring(0,45) + "</span>"; 
m.style.display=or; for(j=0; j<tds.length; j++)  
tds[5].style.fontSize='10px'};
t=d.getElementsByClassName('entry');for(i=0;i<t.length;i++) { pretty(t[i]); };