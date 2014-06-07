// ==UserScript==
// @name           Wiadomosc do sojuszu - Fixed
// @namespace      Pussty
// @include        http://*ogame*/game/index.php?page=showmessage*
// ==/UserScript==

var tablica = document.getElementsByClassName("note");
var notka, gracz, wiadomosc, i;
var wzor_bezwww = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
var wzor_zwww = /(^|[^\/])(www\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

for(i = 0; i < tablica.length; i++){
	notka = tablica[i].innerHTML;
	if(notka.indexOf(" informuje") != -1){
		gracz = notka.substring(notka.indexOf("Gracz")+6, notka.indexOf(" informuje"));
		wiadomosc = notka.substring(notka.indexOf("e :&lt;br&gt;")+13, notka.indexOf("            <br>"));
		wiadomosc = wiadomosc.replace(wzor_bezwww, '<a href="$1" target="_blank">$1</a>');
		wiadomosc = wiadomosc.replace(wzor_zwww, '$1<a href="http://$2" target="_blank">$2</a>');
		tablica[i].innerHTML = "Gracz <b>"+gracz+"</b> informuje cię, że:<div style=background-color:#13181D;margin-top:15px;padding:10px;>"+wiadomosc+"</div>";
	}
}