// ==UserScript==
// @name           Kolorowanie RW
// @description    K
// @include        *http://s1.infinite-wars.com/*
// ==/UserScript==

function ZamienWszystko(str, co, na_co){
  co = co.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return str.replace(new RegExp(co,"g"),na_co);
}

var Check = document.getElementById("msg_title").innerHTML;
if(Check == "Raport walki")
{ 
	document.getElementById("msg_text").innerHTML += '<br><br><br><center><form ID="oran"><textarea NAME=nazwa_pola rows="6" cols="60" ID="orange" WRAP=virtual>'+document.getElementById("msg_text").innerHTML+'</textarea><p><INPUT onclick=javascript:this.form.nazwa_pola.focus();this.form.nazwa_pola.select(); type=button value="Zaznacz wszystko"></p><br></form></center>';

		var tekst = document.getElementById("orange").innerHTML;
			tekst = ZamienWszystko(tekst, "&lt;/b&gt;", "");
			tekst = ZamienWszystko(tekst, "&lt;br&gt;", "\n");
			tekst = ZamienWszystko(tekst, "&lt;b&gt;", "");
			tekst = ZamienWszystko(tekst, "Runda : 1", "[b][size=115]Runda 1[/size][/b]");
			tekst = ZamienWszystko(tekst, "Runda : 2", "[b][size=115]Runda 2[/size][/b]");
			tekst = ZamienWszystko(tekst, "Runda : 3", "[b][size=115]Runda 3[/size][/b]");
			tekst = ZamienWszystko(tekst, "Runda : 4", "[b][size=115]Runda 4[/size][/b]");
			tekst = ZamienWszystko(tekst, "Runda : 5", "[b][size=115]Runda 5[/size][/b]");
			tekst = ZamienWszystko(tekst, "Obro\u0144ca", "[color=#008000][b][i][size=104]Obro\u0144ca[/size][/i][/b][/color]");
			tekst = ZamienWszystko(tekst, "Agresor", "[color=#cc0000][b][i][size=104]Agresor[/size][/i][/b][/color]");
			tekst = ZamienWszystko(tekst, "Zwyci\u0119stwo", "[color=#ff6600][b]Zwyci\u0119stwo[/b][/color]");
			tekst = ZamienWszystko(tekst, "Remis", "[color=#99ccff][b]Remis[/b][/color]");
			tekst = ZamienWszystko(tekst, "Przegrana", "[color=#996633][b]Przegrana[/b][/color]");
			tekst = ZamienWszystko(tekst, "Si\u0142a obro\u0144cy", "[color=#cc0000][b]Si\u0142a obro\u0144cy[/b][/color]");
			tekst = ZamienWszystko(tekst, "Si\u0142a agresora", "[color=#008000][b]Si\u0142a agresora[/b][/color]");
			tekst = ZamienWszystko(tekst, "Rezultat", "[b]Rezultat[/b]");
			tekst = ZamienWszystko(tekst, "Surowce zagarni\u0119te", "_______________________________\n\n[b]Surowce zagarni\u0119te[/b]");
			tekst = ZamienWszystko(tekst, "Wszystkich :", "[color=#0000CC][size=85]Wszystkich:[/size][b]");
			tekst = ZamienWszystko(tekst, "Zniszczonych :", "[color=#CC0099][size=85]Zniszczonych:[/size][b]");
			tekst = ZamienWszystko(tekst, "|", "[/color]|[/b]");
			tekst = ZamienWszystko(tekst, "(", "[/color][/b](");

	document.getElementById("orange").innerHTML = tekst;
}