// ==UserScript==
// @name           Spis ID - Grande Armee
// @author				 Mikipa
// @namespace      mikipa o2 pl
// @include        http://pl56.plemiona.pl/game.php?village=*&screen=info_command&id=*&type=*
// ==/UserScript==

var adres=window.location.href.replace(/&/gi,"%26");
dodajSkroty();
function dodajSkroty() {
miejsce=document.getElementsByTagName('table');
dodaj0=document.createElement('form');
dodaj0.setAttribute("action", "http://plemiona.mikipa.eu/ga/"); 
dodaj0.setAttribute("method", "post"); 
dodaj0.setAttribute("id", "wyslijid"); 
dodaj0.setAttribute("target", "_blank"); 
dodaj0.innerHTML='<input name="id" type="hidden" value="'+window.location.href+'" />';
dodaj=document.createElement('tr');
dodaj.innerHTML='<td colspan="3"><a href="http://plemiona.mikipa.eu/ga/" onclick="document.forms[\'wyslijid\'].submit(); return false">» Prześlij ID</a></form></td>';
dodaj1=document.createElement('tr');
dodaj1.innerHTML='<td colspan="3"><a href="http://plemiona.mikipa.eu/ga/?id='+adres+'" target="_blank">» Sprawdź ID</a></td>';
miejsce[14].appendChild(dodaj0);
miejsce[14].appendChild(dodaj);
miejsce[14].appendChild(dodaj1);
}
