// ==UserScript==
// @name           Megaupload pirexia skip
// @version        0.0.1
// @namespace      pirexia
// @description    skippa il countdown
// @include        http://megaupload.com/*
// @include        http://www.megaupload.com/*
// ==/UserScript==

                                                            
                                                            

                                                            document.getElementById('downloadlink').style.display = '';
                                                            document.getElementById('downloadcounter').style.display = 'none';



/*var tempo = prompt('Inserisci quanto tempo deve attendere prima di aprire il link, nel caso in cui il valore è uguale a 0 allora lo script si fermera; ricordiamo che il tempo di attesa è espresso in secondi', '0');
tempo=tempo*1000;
if (tempo != "0")
{
 
window.setTimeout("var l = document.links[13];document.location.href=l;",tempo);
}
*/
var l = document.links[13];
alert("wget -c --load-cookies ./megaupload " +l);