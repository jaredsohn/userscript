// ==UserScript==
// @name        UnMod
// @namespace   http://mega.szajb.us/juenizer/unmod/
// @description Advanced Bloodwars MODIFICATIONS
// @include     http://r*.bloodwars.interia.pl/*
// @include     http://r*.bloodwars.net/*
// @include     http://beta.bloodwars.net/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// ==/UserScript==

// made by juen @ o2 . pl
// zapraszam: http://nakoz.org, http://szajb.us, http://cdlabel.info
//

var UM_VER = 20140306.3;
var a = location.search;
var id = location.host.split(".")[0];

	function addevent_rem2(item_id) {
					document.getElementById('uz_'+item_id).addEventListener('click', 
						function() {
							GM_deleteValue(id+'UM_UZ_'+item_id);
							window.location.reload();
						}, false);
	}

	function addevent_add(item_id,item_name) {
						document.getElementById('UM_UZ_'+item_id).addEventListener('click', 
						function() {
							GM_setValue(id+'UM_UZ_'+item_id,item_name);
							window.location.reload();
						}, false);
	}


	function addevent_rem(item_id,item_name) {
					document.getElementById('UM_UZ_'+item_id).addEventListener('click', 
						function() {
							GM_deleteValue(id+'UM_UZ_'+item_id);
							window.location.reload();
						}, false);
	}
	


    var scriptCode = new Array();   // this is where we are going to build our new script
    scriptCode.push('function onSboxRead(type,msg){'        );    
    scriptCode.push("var msghtml= document.createElement('span'); msghtml.innerHTML= msg; ");  
    		scriptCode.push('li = msghtml.getElementsByTagName("LI"); for (t = 0; t < li.length; t++) {	test = li[t].getElementsByTagName("a")[0].href;	uid = test.substring(test.indexOf("&")+5,test.indexOf("&")+10);	trole = "'+GM_getValue(id+"UM_trole","60 52858 37931")+'"; trole=trole.split(" ");	for (x = 0; x<trole.length;x++) if (uid==parseInt(trole[x])) li[t].style.display="none";}');

	scriptCode.push("$$('sbox_'+type+'_container').innerHTML += msghtml.innerHTML;");
	scriptCode.push('scrollSbox(type);');
	scriptCode.push('return true;	');
    scriptCode.push('}'                                 );
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    document.getElementsByTagName('head')[0].appendChild(script); 



	
if (a=="?a=settings") {
	div = document.getElementsByClassName('hr720')[0];
	opcje="<br /><br /><span style=\"color: #fff; text-shadow: 0px -1px 4px white, 0px -2px 10px yellow, 0px -10px 20px #ff8000, 0px -18px 40px red; font: 28px 'BlackJackRegular'\";><b>UnMod</b> ver: "+UM_VER+" - <i>simply made by JUEN/gg:1008732</i></span><br><b>Autor robi to za FRAJER, ale powaznie ucieszy sie obdarowaniem kodem premium jako wyraz wdziecznosci ;)</b><BR>";
	opcje+='<iframe scrolling=no src="http://mega.szajb.us/juenizer/unmod/ver.php?ver='+UM_VER+'" width="90%" style="margin-top: 3px; box-shadow: 10px 10px 5px #888888; border-radius: 20px; " frameborder=0 	 height="33"></iframe><BR><BR>';
	opcje+='<center><table width="90%" style="text-align: left; margin-top: 5px; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Helvetica, Arial;">';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_unmodon", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_unmodon"> unmod aktywny (można go wyłączyć dla tego konkretnego serwera)</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort"> sortuj stronę rankingu, na której się znajduję wg. dostępności ataku</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_shop1", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_shop1"> wyświetlaj od razu informacje o właściwościach jednorazów</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_ukryj", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_ukryj"> ukrywaj publiczny opis klanu, w którym się znajdujesz</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_ukryj2", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_ukryj2"> ukrywaj prywatny opis klanu, w którym się znajdujesz</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_youtube", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_youtube"> zamieniaj linki youtube w shoutboxie na playera</td></tr>';
		
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort1", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort1"> sortuj pierwszą stronę rankingu wg. dostępności ataku</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort2", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort2"> sortuj drugą stronę rankingu wg. dostępności ataku</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_mysort3", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_mysort3"> sortuj wszystkie strony rankingu</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_taximax", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_taximax"> auto taxi max</td></tr>';
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_fastzk", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_fastzk"> szybkie klikanie przedmiotów w zbrojowni</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_wyparch", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_wyparch"> anonimowe zbieranie statystyk z wypraw - <a target="_new" href="http://mega.szajb.us/juenizer/unmod/">http://mega.szajb.us/juenizer/unmod/</a></td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_klansort", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_klansort"> sortowanie klanowiczów według punktów</td></tr>'
	
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_shoutboxclan", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_shoutboxclan"> automatycznie otwieraj okno chatu klanowego & przeźroczystość</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_linkluck", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_linkluck"> pokazuj odnośnik do zapisów na lucka w menu bw</td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_donesound", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_donesound"> odgrywaj dźwięk po zakończonej wyprawie/ataku <input type="text" id="UM_urlsound" value="'+GM_getValue(id+'UM_urlsound','http://soundimpress.pl/audio/download/103/soundimpress.pl_click_sfx_synth_a01.mp3')+'"></td></tr>';
		
	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_zkkrew", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_zkkrew"> wyszczególniaj przedmioty do krwi w zbrojowni</td></tr>';

	opcje+='<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	opcje+='(po kliknięciu CZYŚĆ obok SPRZEDAJ) czyszczenie najniższej półki do (PLN): <input type="text" id="UM_zkclean" value="'+GM_getValue(id+'UM_zkclean','2000')+'"></td></tr>';

	opcje+='<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	opcje+='BLOKUJ TROLI NA SB (podaj id, lub parę oddzielając spacjami): <input type="text" id="UM_trole" value="'+GM_getValue(id+'UM_trole','60 52858 37931')+'"></td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_spiszk", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_spiszk"> numer zbrojowni klanowej wygenerowany przez http://zk.nakoz.org: <input type="text" id="UM_zk" value="'+GM_getValue(id+'UM_zk','')+'"></td></tr>';

	opcje+='<tr><td><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_alarm", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_alarm"> alarm o godzinie: ';
	opcje+='<select id="UM_OP_alarm_h"><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select>';
	opcje+='&nbsp;:&nbsp;<select id="UM_OP_alarm_m">';
	for (i=0; i<60;i++) { if (i<10) i2="0"+i; else i2=i; opcje+='<option value="'+i+'">'+i2+'</option>'; }
	opcje+='</select> (by alarm się uruchomił musisz mieć zostawioną otwartą stronę z bw)';
	opcje+='</td></tr>';

	opcje+='<tr><td style="text-align: left;">';
	opcje+='<tr><td><br><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_polki", false)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_polki"> ';
	opcje+='własne nazwy półek: <br><br>';
	opcje+='10:<input type="text" style="width: 100px;" id="UM_OP_polka10" value="'+GM_getValue(id+"UM_OP_polka10", "Półka 10")+'">';
	opcje+='&nbsp;9: <input type="text" style="width: 100px;" id="UM_OP_polka9" value="'+GM_getValue(id+"UM_OP_polka9", "Półka 9")+'">';
	opcje+='&nbsp;8: <input type="text" style="width: 100px;" id="UM_OP_polka8" value="'+GM_getValue(id+"UM_OP_polka8", "Półka 8")+'">';
	opcje+='&nbsp;7: <input type="text" style="width: 100px;" id="UM_OP_polka7" value="'+GM_getValue(id+"UM_OP_polka7", "Półka 7")+'">';
	opcje+='&nbsp;6: <input type="text" style="width: 100px;" id="UM_OP_polka6" value="'+GM_getValue(id+"UM_OP_polka6", "Półka 6")+'">';
	opcje+='<br>&nbsp;5: <input type="text" style="width: 100px;" id="UM_OP_polka5" value="'+GM_getValue(id+"UM_OP_polka5", "Półka 5")+'">';
	opcje+='&nbsp;4: <input type="text" style="width: 100px;" id="UM_OP_polka4" value="'+GM_getValue(id+"UM_OP_polka4", "Półka 4")+'">';
	opcje+='&nbsp;3: <input type="text" style="width: 100px;" id="UM_OP_polka3" value="'+GM_getValue(id+"UM_OP_polka3", "Półka 3")+'">';
	opcje+='&nbsp;2: <input type="text" style="width: 100px;" id="UM_OP_polka2" value="'+GM_getValue(id+"UM_OP_polka2", "Półka 2")+'">';
	opcje+='&nbsp;1: <input type="text" style="width: 100px;" id="UM_OP_polka1" value="'+GM_getValue(id+"UM_OP_polka1", "Półka 1")+'">';
	opcje+='</td></tr>';	

	opcje+='<tr><td style="text-align: left;">';
	opcje+='<tr><td><BR><input type="checkbox"';
	if (GM_getValue(id+"UM_OP_skroty", true)) opcje+=' checked="checked"';
	opcje+=' id="UM_OP_skroty"> skróty klawiszowe - klawisz ALT oraz liczba:<br><br>';
	opcje+='&nbsp;1: <input type="text" style="width: 100px;" id="UM_OP_key_1" value="'+GM_getValue(id+"UM_OP_key_1", "msg")+'">';
	opcje+='&nbsp;2: <input type="text" style="width: 100px;" id="UM_OP_key_2" value="'+GM_getValue(id+"UM_OP_key_2", "aliance")+'">';
	opcje+='&nbsp;3: <input type="text" style="width: 100px;" id="UM_OP_key_3" value="'+GM_getValue(id+"UM_OP_key_3", "equip")+'">';
	opcje+='&nbsp;4: <input type="text" style="width: 100px;" id="UM_OP_key_4" value="'+GM_getValue(id+"UM_OP_key_4", "ambush")+'">';
	opcje+='&nbsp;5: <input type="text" style="width: 100px;" id="UM_OP_key_5" value="'+GM_getValue(id+"UM_OP_key_5", "quest")+'">';
	opcje+='<br>&nbsp;6: <input type="text" style="width: 100px;" id="UM_OP_key_6" value="'+GM_getValue(id+"UM_OP_key_6", "cevent")+'">';
	opcje+='&nbsp;7: <input type="text" style="width: 100px;" id="UM_OP_key_7" value="'+GM_getValue(id+"UM_OP_key_7", "swr")+'">';
	opcje+='&nbsp;8: <input type="text" style="width: 100px;" id="UM_OP_key_8" value="'+GM_getValue(id+"UM_OP_key_8", "rank")+'">';
	opcje+='&nbsp;9: <input type="text" style="width: 100px;" id="UM_OP_key_9" value="'+GM_getValue(id+"UM_OP_key_9", "townview")+'">';
	opcje+='&nbsp;0: <input type="text" style="width: 100px;" id="UM_OP_key_0" value="'+GM_getValue(id+"UM_OP_key_0", "auction")+'">';
	opcje+='</td></tr>';	

	opcje+='<tr><td style="color: red;"><BR><b><center>Używając tej modyfikacji pamiętaj wyłączyć pozostałe skrypty GreaseMonkey do BW, także moje poprzednie!</center>';
	opcje+='</td></tr>';	
	opcje+='<tr><td style=""><BR><b style=""><center>Spis funkcjonalności (od najnowszych i najświeższych do najstarszych)</center></b><BR>';
	opcje+='- zliczanie ewo (od dreamerman) <br>';
	opcje+='- mozliwosc wylaczenia taxi max <br>';
	opcje+='<br>';
	opcje+='- automatyczny max taksówki przy ataku <br>';
	opcje+='- dodano pole do wprowadzenia numerów uid graczy, których wiadomości nie chcemy czytać na sb ogólnym<br>';
	opcje+='- dodano dzialanie na beta serwerze<br>';
	opcje+='- magiczna nie konczaca sie polka<br>';
	opcje+='- licznik czasu do konca najblizszej aukcji<br>';
	opcje+='- poprawiono bug w sprzedazy na opera<br>';
	opcje+='- przy licytowaniu zlomu jest informacja ile wyjdzie za jedna sztuke zlomu<br>';
	opcje+='- podmieniono link do chatu bw na lepszy z webchat quakenetu<br>';
	opcje+='- w profilu gracza w przypadku atakowania go w dniu dzisiejszym dwa razy, napis napadnij zostaje przekreslony<br>';
	opcje+='- ikona ataku w rankingu zanika mniej lub bardziej w zaleznosci czy atakowalismy gracza raz lub dwa razy<br>';
	opcje+='- podswietlanie w zbrojowni przedmiotow do szeroko rozumianej krwi<br>';
	opcje+='- informacje jak ukonczyc zadania<br>';
	opcje+='- ukrywanie opisu prywatnego i publicznego klanu, w ktorym sie znajdujemy<br>';
	opcje+='- szybkie przebieranie zapisanych zestawow<br>';
	opcje+='- wyświetlanie informacji o jednorazach<br>';
	opcje+='- poprawka widoku miasta i zbrojowni (przerywaly skrypt i wyswietlanie czasu exp/kw)<br>';
	opcje+='- zamiana linkow youtube.com na playera w shoutboxach<br>';
	opcje+='- przy braku ofert w zlomie podawana jest cena startowa za 1 sztuke<br>';
	opcje+='- obsługa klawiatury ALT + cyfy od 0 do 9 (możliwość ustawień skrótów)<br>';
	opcje+='- obsługa klawiatury ALT + strzałki lewo/prawo: strona rankingu<br>';
	opcje+='- dodano w placu budowy dokładną datę zakończenia budowy budynku<br>';
	opcje+='- przy exp i kw podana ilość wolnego miejsca w poziomach<br>';
	opcje+='- cena minimalna na aukcji zlomu obok ilosci sztuk<br>';
	opcje+='- szybkie zaznaczanie określonego typu wiadomości<br>';
	opcje+='- wszystkie czasy uwzględniają rożnice w strefach czasowych<br>';
	opcje+='- czas do konca budowy budynki w kwadracie na kazdej stronie bw<br>';
	opcje+='- alarm<br>';
	opcje+='- na aukcjach w zakupie złomu jeśli jest podana oferta mamy informacje ile pr wychodzi za 1 szt złomu<br>';
	opcje+='- możliwość wyłączenia unmoda dla konkretnego serwera pozostawiając włączonego dla reszty<br>';
	opcje+='- zbieranie informacji o wyprawach w celach anonimowych statystyk<br>';
	opcje+='- zakładka w menu głównym bw - zapisy (do lucka/wilki - by Lilith_Devlin)<br>';
	opcje+='- zakładka w menu głównym bw - spis zk, w ustawieniach należy podać numer zbrojowni wygenerowany przez http://zk.nakoz.org<br>';
	opcje+='- szybkie zaznaczanie zlomu z najnizszej polki (standardowo od 2000pln w dol)<br>';
	opcje+='- sortowanie pozostalych stron rankingu<br>';
	opcje+='- wlasne nazwy polek takze w elemencie do wybrania docelowej<br>';
	opcje+='- poprawka wyswietlania E(wo) dla chrome<br>';
	opcje+='- podswietlanie legendarnych itemow w aukcjach<br>';
	opcje+='- w rankingu po najechaniu mycha na nicka pojawiają się notatki<br>';
	opcje+='- w rankingu/widoku miasta obok nicka jest litera E jeśli za niego dostajemy pkt-y ewo<br>';
	opcje+='- suma treningu - ladniejsze wyswietlanie<br>';
	opcje+='- info o exp i kw zostalo poprawione wyswietlanie, juz winno byc widoczne wszedzie<br>';
	opcje+='- info o aktualizacji otrzymalo tlo dla czytelnosci<br>';
	opcje+='- ogolnie dodalem w widoku miasta jak widzimy siebie to w polu dzialamie zamiast "-" mamy link do strefy, ktora zarzadzamy<br>';
	opcje+='- expy juz nie beda swirowac (kw juz bylo wczesniej poprawione)<br>';
	opcje+='- możliwość podania ścieżki URL do sygnały dźwiękowego<br>';
	opcje+='- na każdej podstronie o ile to możliwe jest wyświetlony czas do końc exp i kw<br>';
	opcje+='- zakładki kw i exp otrzymały na wzór ataków i wypraw odliczanie w tytule karty<br>';
	opcje+='- liczba porządkowa w spisie klanowiczów w przypadku wybranego sortowania (zamiast liczenia ile w klanie mam np. 72+)<br>';
	opcje+='- w zakładce trening wypisany jest łączny koszt wartości treningu w punktach rozwoju<br>';
	opcje+='- opcja automatycznego otwierania chatu klanowego<br>';
	opcje+='- ustawienia sa juz niezalezne dla roznych serwerow<br>';
	opcje+='- dodano indywidualne notatki do profilów graczy!<br>';
	opcje+='- poprawiono i przyśpieszono działanie zmiany nazw półek<br>';
	opcje+='- dodano opcję odegrania dźwięku przy zakończonej wyprawie (jeśli jesteśmy w zakładce wyprawy)<br>';
	opcje+='</td></tr>';	
	opcje+='<tr><td style=""><BR><b><center>Polecam!</center><BR><span style="">';
	opcje+='- pomysły i dyskusje o unmod: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=1187656">http://forum.bloodwars.interia.pl/thread.php?threadid=1187656</a><br>';	
	opcje+='- szybka zbrojownia dla całego klanu: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=841787">http://forum.bloodwars.interia.pl/thread.php?threadid=841787</a><br>';	
	opcje+='- generator sygnatur bw on-line: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=949855">http://forum.bloodwars.interia.pl/thread.php?threadid=949855</a><br>';
	opcje+='- odstresuj się dobrym dropem: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=926110">http://forum.bloodwars.interia.pl/thread.php?threadid=926110</a><br>';
	opcje+='- automatyczny ranking r12: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=1068988">http://forum.bloodwars.interia.pl/thread.php?threadid=1068988</a><br>';
	opcje+='- wyciągnij spis budynków: <a target="_new" href="http://mega.szajb.us/juen/budynki.php">http://mega.szajb.us/juen/budynki.php</a>';
	opcje+='</span></td></tr>';	
	
	opcje+='</table></center><BR><BR>';
	
	div.innerHTML+=opcje;
	wyb = GM_getValue(id+"UM_OP_alarm_h", 0);
	if (parseInt(wyb)>=12) wyb-=12; else wyb=parseInt(wyb)+12;
	document.getElementById("UM_OP_alarm_h").options[wyb].selected=true;
	wyb = GM_getValue(id+"UM_OP_alarm_m", 0);
	document.getElementById("UM_OP_alarm_m").options[wyb].selected=true;

	document.getElementById('content-mid').style.minHeight="2000px";
	document.getElementById('UM_OP_youtube').addEventListener('click', function() {GM_setValue(id+"UM_OP_youtube",this.checked);}, false);
	document.getElementById('UM_OP_shoutboxclan').addEventListener('click', function() {GM_setValue(id+"UM_OP_shoutboxclan",this.checked);}, false);
	document.getElementById('UM_OP_donesound').addEventListener('click', function() {GM_setValue(id+"UM_OP_donesound",this.checked);}, false);
	document.getElementById('UM_OP_unmodon').addEventListener('click', function() {GM_setValue(id+"UM_OP_unmodon",this.checked);}, false);
	document.getElementById('UM_OP_shop1').addEventListener('click', function() {GM_setValue(id+"UM_OP_shop1",this.checked);}, false);
	document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",this.checked);}, false);
	document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",this.checked);}, false);
	document.getElementById('UM_OP_zkkrew').addEventListener('click', function() {GM_setValue(id+"UM_OP_zkkrew",this.checked);}, false);
	document.getElementById('UM_OP_mysort').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort",this.checked);}, false);
	document.getElementById('UM_OP_mysort1').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort1",this.checked);}, false);
	document.getElementById('UM_OP_mysort2').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort2",this.checked);}, false);
	document.getElementById('UM_OP_mysort3').addEventListener('click', function() {GM_setValue(id+"UM_OP_mysort3",this.checked);}, false);
	document.getElementById('UM_OP_taximax').addEventListener('click', function() {GM_setValue(id+"UM_OP_taximax",this.checked);}, false);
	document.getElementById('UM_OP_fastzk').addEventListener('click', function() {GM_setValue(id+"UM_OP_fastzk",this.checked);}, false);
	document.getElementById('UM_OP_alarm').addEventListener('click', function() {GM_setValue(id+"UM_OP_alarm",this.checked);}, false);
	document.getElementById('UM_OP_alarm_h').addEventListener('change', function() {GM_setValue(id+"UM_OP_alarm_h",this.value);}, false);
	document.getElementById('UM_OP_alarm_m').addEventListener('change', function() {GM_setValue(id+"UM_OP_alarm_m",this.value);}, false);
	document.getElementById('UM_OP_polki').addEventListener('click', function() {GM_setValue(id+"UM_OP_polki",this.checked);}, false);
	document.getElementById('UM_OP_skroty').addEventListener('click', function() {GM_setValue(id+"UM_OP_skroty",this.checked);}, false);
	document.getElementById('UM_OP_wyparch').addEventListener('click', function() {GM_setValue(id+"UM_OP_wyparch",this.checked);}, false);
	document.getElementById('UM_OP_klansort').addEventListener('click', function() {GM_setValue(id+"UM_OP_klansort",this.checked);}, false);
	document.getElementById('UM_OP_spiszk').addEventListener('click', function() {GM_setValue(id+"UM_OP_spiszk",this.checked);}, false);
	document.getElementById('UM_OP_linkluck').addEventListener('click', function() {GM_setValue(id+"UM_OP_linkluck",this.checked);}, false);
	document.getElementById('UM_OP_key_0').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_0",this.value);}, false);
	document.getElementById('UM_OP_key_1').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_1",this.value);}, false);
	document.getElementById('UM_OP_key_2').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_2",this.value);}, false);
	document.getElementById('UM_OP_key_3').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_3",this.value);}, false);
	document.getElementById('UM_OP_key_4').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_4",this.value);}, false);
	document.getElementById('UM_OP_key_5').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_5",this.value);}, false);
	document.getElementById('UM_OP_key_6').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_6",this.value);}, false);
	document.getElementById('UM_OP_key_7').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_7",this.value);}, false);
	document.getElementById('UM_OP_key_8').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_8",this.value);}, false);
	document.getElementById('UM_OP_key_9').addEventListener('change', function() {GM_setValue(id+"UM_OP_key_9",this.value);}, false);
	document.getElementById('UM_OP_key_0').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_0",this.value);}, false);
	document.getElementById('UM_OP_key_1').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_1",this.value);}, false);
	document.getElementById('UM_OP_key_2').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_2",this.value);}, false);
	document.getElementById('UM_OP_key_3').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_3",this.value);}, false);
	document.getElementById('UM_OP_key_4').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_4",this.value);}, false);
	document.getElementById('UM_OP_key_5').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_5",this.value);}, false);
	document.getElementById('UM_OP_key_6').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_6",this.value);}, false);
	document.getElementById('UM_OP_key_7').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_7",this.value);}, false);
	document.getElementById('UM_OP_key_8').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_8",this.value);}, false);
	document.getElementById('UM_OP_key_9').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_key_9",this.value);}, false);
	document.getElementById('UM_OP_polka1').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka1",this.value);}, false);
	document.getElementById('UM_OP_polka2').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka2",this.value);}, false);
	document.getElementById('UM_OP_polka3').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka3",this.value);}, false);
	document.getElementById('UM_OP_polka4').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka4",this.value);}, false);
	document.getElementById('UM_OP_polka5').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka5",this.value);}, false);
	document.getElementById('UM_OP_polka6').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka6",this.value);}, false);
	document.getElementById('UM_OP_polka7').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka7",this.value);}, false);
	document.getElementById('UM_OP_polka8').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka8",this.value);}, false);
	document.getElementById('UM_OP_polka9').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka9",this.value);}, false);
	document.getElementById('UM_OP_polka10').addEventListener('keyup', function() {GM_setValue(id+"UM_OP_polka10",this.value);}, false);
	document.getElementById('UM_urlsound').addEventListener('keyup', function() {GM_setValue(id+"UM_urlsound",this.value);}, false);
	document.getElementById('UM_urlsound').addEventListener('change', function() {GM_setValue(id+"UM_urlsound",this.value);}, false);
	document.getElementById('UM_zkclean').addEventListener('keyup', function() {GM_setValue(id+"UM_zkclean",this.value);}, false);
	document.getElementById('UM_trole').addEventListener('keyup', function() {GM_setValue(id+"UM_trole",this.value);}, false);
	document.getElementById('UM_zk').addEventListener('keyup', function() {GM_setValue(id+"UM_zk",this.value);}, false);
	document.getElementById('UM_zk').addEventListener('change', function() {GM_setValue(id+"UM_zk",this.value);}, false);

}




if (GM_getValue(id+"UM_OP_unmodon", true)) {
	// mod notki everywhere
	x = document.createElement('span');
	x.id="x";
	x.style.display="none";
	y = document.createElement('span');
	y.id="y";
	y.style.display="none";
	document.getElementsByTagName('body')[0].appendChild(x); 
	document.getElementsByTagName('body')[0].appendChild(y); 	
	chmurka = document.createElement('div');
	chmurka.id="chmurka";
	chmurka.style.display="none";
	chmurka.style.x="300px";
	chmurka.style.zIndex="30000";
	chmurka.style.position="fixed";
	chmurka.style.borderColor="white";
	chmurka.style.borderWidth="2px";
	chmurka.style.borderStyle="solid";
	chmurka.style.padding="4px";
	chmurka.style.backgroundColor="black";
	document.getElementsByTagName('body')[0].appendChild(chmurka); 
	var scriptCode = new Array();
	scriptCode.push('	function getMouseXY(e) {');
	scriptCode.push('		document.getElementById(\'x\').innerHTML=e.clientX;');
	scriptCode.push('		document.getElementById(\'y\').innerHTML=e.clientY+10;');
	scriptCode.push('	}');
	scriptCode.push('	document.onmousemove = getMouseXY;');
	var script = document.createElement('script');
	script.innerHTML = scriptCode.join('\n');
	scriptCode.length = 0;
	document.getElementsByTagName('head')[0].appendChild(script); 

	//mod zapisy na lucka
	menu = document.getElementsByClassName('menu');
	if (menu.length>11) {
		menu=menu[12]; 
		if (GM_getValue(id+"UM_OP_linkluck", true)) menu.innerHTML+='<li class="menu"><a target=_new href="http://www.lil-it.net/bw/" class="menulink">Zapisy ZK</a>';
		if (GM_getValue(id+"UM_OP_spiszk", true)) { menu.innerHTML+='<li class="menu"><a target=_new href="http://zk.nakoz.org/'+GM_getValue(id+'UM_zk','61672692')+'" class="menulink">Spis zbrojowni</li>'; }
	}
	
	test = document.getElementsByClassName('menulink');
	for (t = 0; t < test.length; t++) {
		if (test[t].innerHTML=='Live Chat') { test[t].href='http://webchat.quakenet.org/?channels=bloodwars'; break; }
	}
	
	if (a.substring(0,8)=="?a=equip") {
	//mod unlimited zk
	tid=new Array();
	tidn=0;
	var unlimited="<center><b>NIESKOŃCZONA PÓŁKA :-)</b></center><BR>";


var keys = GM_listValues();
for (var val=0; val < keys.length; val++) {
		if (keys[val].search(id+"UM_UZ_")!=-1) {
		temp_id = keys[val].replace(id+"UM_UZ_",'');
		 			unlimited+='<div class="item"><table cellspacing="0"><tr><td class="itemdesc itemshop even"><div id="back_'+temp_id+'" align="left" onclick="clk_stock(event, '+temp_id+');"><div align="center"><span class="item-link">'+GM_getValue(keys[val])+'</span></div><table cellspacing="0" cellpadding="0" style="width: 100%; border: 0px;"><tr><td width="18%"><input class="checkbox" type="checkbox" id="itemid_'+temp_id+'" name="itemid['+temp_id+']" onclick="onCheckBoxSelect(this, '+temp_id+', 63900, \''+GM_getValue(keys[val])+'\', $$(\'back_'+temp_id+'\'));" /></td><td width="70%"></td><td></td></tr></table></div></td><td align="right" width="18%"><a href="#" id="uz_'+temp_id+'" style="color:red; font-weight: bold;">-UNL.ZBR</a><br><BR><a class="enabled" href="?eq='+temp_id+'&amp;a=equip">EKWIPUJ</a></td></tr></table></div><script type="text/javascript">box[3]['+temp_id+'] = $$(\'itemid_'+temp_id+'\');</script></div>';

		 			tid[tidn++]=temp_id;
		}
	}
	
	if (tidn>0) {
	var sp1 = document.createElement("div");
	sp1.innerHTML = unlimited;
	var tu = document.getElementsByClassName('stashhdr')[0];
	var parentDiv = tu.parentNode;
	parentDiv.insertBefore(sp1, tu);
	
	for (x in tid) 
		addevent_rem2(tid[x]);
	}
	
	
	items = document.getElementsByClassName('enabled');
	for (x in items) {
		var it = items[x];
		if (it.href) {
		it = it.href.toString();
			var pos = it.search("equip&eq=");
			if (pos != -1) {
				item_id = it.substring(pos+9,it.length);
							
				test = GM_getValue(id+'UM_UZ_'+item_id, "0");
				var sp1 = document.createElement("a");
				sp1.style.cursor="pointer";
				sp1.style.fontWeight="bold";
				var parentDiv = items[x].parentNode;
				sp1.id='UM_UZ_'+item_id;
				
				div = document.getElementById('back_'+item_id);
				span = div.getElementsByTagName('SPAN')[0];
				item_name = span.innerHTML.replace(' *','');
				if (test=="0") {		
					sp1.innerHTML='+UNL.ZBR<br><br>';		 
					sp1.style.color="green";				
					parentDiv.insertBefore(sp1, items[x]);
					addevent_add(item_id,item_name);
				} else {
					sp1.innerHTML='-UNL.ZBR<br><br>';		 
					sp1.style.color="red";
					parentDiv.insertBefore(sp1, items[x]);
					addevent_rem(item_id,item_name);
				}
			}
		}
	}


	
		if (GM_getValue(id+"UM_OP_polki", false)) {
			// mod wlasne nazwy polek

			sel = document.getElementById('newTab');
			options = sel.getElementsByTagName('option');
			options[0].innerHTML=GM_getValue(id+"UM_OP_polka10", "10");
			options[1].innerHTML=GM_getValue(id+"UM_OP_polka9", "9");
			options[2].innerHTML=GM_getValue(id+"UM_OP_polka8", "8");
			options[3].innerHTML=GM_getValue(id+"UM_OP_polka7", "7");
			options[4].innerHTML=GM_getValue(id+"UM_OP_polka6", "6");
			options[5].innerHTML=GM_getValue(id+"UM_OP_polka5", "5");
			options[6].innerHTML=GM_getValue(id+"UM_OP_polka4", "4");
			options[7].innerHTML=GM_getValue(id+"UM_OP_polka3", "3");
			options[8].innerHTML=GM_getValue(id+"UM_OP_polka2", "2");
			options[9].innerHTML=GM_getValue(id+"UM_OP_polka1", "1");

			el = document.getElementsByClassName('itemTab');
			for (l=0; l<el.length; l++) {

				el[l].innerHTML = el[l].innerHTML.replace("Półka 10",GM_getValue(id+"UM_OP_polka10", "Półka 10"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 9",GM_getValue(id+"UM_OP_polka9", "Półka 9"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 8",GM_getValue(id+"UM_OP_polka8", "Półka 8"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 7",GM_getValue(id+"UM_OP_polka7", "Półka 7"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 6",GM_getValue(id+"UM_OP_polka6", "Półka 6"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 5",GM_getValue(id+"UM_OP_polka5", "Półka 5"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 4",GM_getValue(id+"UM_OP_polka4", "Półka 4"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 3",GM_getValue(id+"UM_OP_polka3", "Półka 3"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 2",GM_getValue(id+"UM_OP_polka2", "Półka 2"));
				el[l].innerHTML = el[l].innerHTML.replace("Półka 1",GM_getValue(id+"UM_OP_polka1", "Półka 1"));

				el[l].innerHTML = el[l].innerHTML.replace("Shelf 10",GM_getValue(id+"UM_OP_polka10", "Shelf 10"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 9",GM_getValue(id+"UM_OP_polka9", "Shelf 9"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 8",GM_getValue(id+"UM_OP_polka8", "Shelf 8"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 7",GM_getValue(id+"UM_OP_polka7", "Shelf 7"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 6",GM_getValue(id+"UM_OP_polka6", "Shelf 6"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 5",GM_getValue(id+"UM_OP_polka5", "Shelf 5"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 4",GM_getValue(id+"UM_OP_polka4", "Shelf 4"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 3",GM_getValue(id+"UM_OP_polka3", "Shelf 3"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 2",GM_getValue(id+"UM_OP_polka2", "Shelf 2"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 1",GM_getValue(id+"UM_OP_polka1", "Shelf 1"));

				el[l].innerHTML = el[l].innerHTML.replace("Shelf 10",GM_getValue(id+"UM_OP_polka10", "Étagère 10"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 9",GM_getValue(id+"UM_OP_polka9", "Étagère 9"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 8",GM_getValue(id+"UM_OP_polka8", "Étagère 8"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 7",GM_getValue(id+"UM_OP_polka7", "Étagère 7"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 6",GM_getValue(id+"UM_OP_polka6", "Étagère 6"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 5",GM_getValue(id+"UM_OP_polka5", "Étagère 5"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 4",GM_getValue(id+"UM_OP_polka4", "Étagère 4"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 3",GM_getValue(id+"UM_OP_polka3", "Étagère 3"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 2",GM_getValue(id+"UM_OP_polka2", "Étagère 2"));
				el[l].innerHTML = el[l].innerHTML.replace("Shelf 1",GM_getValue(id+"UM_OP_polka1", "Étagère 1"));
				}
		}

		if (GM_getValue(id+"UM_OP_fastzk", true)) {
			// mod fast zk
			
			unsafeWindow.clk_stock = function(event, stock) {
			} 
			unsafeWindow.clk_zk = function(event, stock) {
			} 
			unsafeWindow.clk_equip = function(event, stock) {
			} 
			
			var itemS = document.getElementsByClassName('item');

			for (var i=0; i<itemS.length; i++) {
				ta = itemS[i].getElementsByTagName('table');
				krew = false;
				if (GM_getValue(id+"UM_OP_zkkrew", true)) if (ta[0].innerHTML.search('Niedźwie')>0 || ta[0].innerHTML.search('Szamań')>0 || ta[0].innerHTML.search('Kościan')>0 || ta[0].innerHTML.search('Elastyczn')>0 || ta[0].innerHTML.search('Amulet Krwi')>0 || ta[0].innerHTML.search('Naszyjnik Krwi')>0 || ta[0].innerHTML.search('Łańcuch Krwi')>0  || ta[0].innerHTML.search('Apaszka Krwi')>0  || ta[0].innerHTML.search('Pierścień Krwi')>0  || ta[0].innerHTML.search('Sygnet Krwi')>0 || ta[0].innerHTML.search('Bransoleta Krwi')>0 || ta[0].innerHTML.search('Krawat Krwi')>0) { 
					ta[0].style.backgroundColor="#aa0000";
					if (itemS[i].innerHTML.search('Właściciel')!=-1) krew=true; 
				} 

				if (krew==true) {
					ta[0].addEventListener('mousedown', function() {
						var itemS = document.getElementsByClassName('item');
						for (var i=0; i<itemS.length; i++) {
							var ta = itemS[i].getElementsByTagName('table');
							if (ta[0].style.backgroundColor=="rgb(170, 0, 0)" && ta[0].innerHTML.search('Właściciel')!=-1) {
								ta[0].getElementsByClassName('checkbox')[0].click();
							}
						}
					}, false);
				}
				if (!krew) ta[0].addEventListener('mousedown', function() {this.getElementsByClassName('checkbox')[0].click();}, false);
				itemS[i].getElementsByTagName('td')[1].width="13%";	
			}
			var itemS = document.getElementsByClassName('checkbox');
			for (var i=0; i<itemS.length; i++) itemS[i].style.display="none";
		}	

		// mod clean-zk
		polka = document.getElementById('hc_c0');
		if (document.getElementById('hc_c0')) {
		input = polka.getElementsByTagName('input')[0];
		input.value="ODWRÓĆ";
		input.style.width="90px";
		
		nowy = document.createElement("INPUT");
		nowy.type="button";
		nowy.value="CZYŚĆ";
		nowy.className="button";
		nowy.style.width="90px";
		nowy.style.marginLeft="10px";
		nowy.id="nowy";

		if (input.nextSibling) input.parentNode.insertBefore(nowy, input.nextSibling); else input.parentNode.appendChild(nowy);
		document.getElementById('nowy').addEventListener('click', function() { 
			polka = document.getElementById('hc_c0');
			itemS = polka.getElementsByClassName('item');
			for (i=0; i<itemS.length; i++) {
				itemLink = itemS[i].getElementsByTagName('TD')[2].innerHTML;
				itemLink = itemLink.replace(/&lt;/gi,"<");
				itemLink = itemLink.replace(/&gt;/gi,">");
				itemLink = itemLink.replace("PLN","");
				koszt = (itemLink.substring((itemLink.search('<b>')+3),itemLink.search('</b>')).replace(/ /gi,""));
				if (parseInt(koszt)<GM_getValue(id+'UM_zkclean','2000') && parseInt(koszt)>49) {
					sellItem = itemS[i].getElementsByTagName('TD')[1].getElementsByTagName('INPUT')[0];
					sellItem.click();
				}
			}
			document.getElementsByClassName('sellButton')[1].click();
		}, false);
		}
	} 
	if (a.substring(0,9)=="?a=ambush") {
	
		if (GM_getValue(id+"UM_OP_taximax", true)) {
			unsafeWindow.taxiClickMax();
		}
	}
	if (a=="?a=swr") {
		table = document.getElementsByTagName('table')[4];
		if (table.innerHTML.length<500) table = document.getElementsByTagName('table')[5];
		kw = false;
		tr = table.getElementsByTagName('tr');
			for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[5];
			sum= tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum= parseInt(sum.innerHTML.substring(sum.innerHTML.length-8,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
			if (td.innerHTML.length<135 && td.innerHTML.length>100 || td.innerHTML.length==410 || td.innerHTML.length==250 || td.innerHTML.length==247 || td.innerHTML.length==249 || td.innerHTML.length==145) {
				t = td.getElementsByTagName('input');
				if (t.length==0) {
					kw = true;
					break;
				}
			}
		}
		if (kw) {
			czas = tr[i].getElementsByClassName('itemstacked1');
			if (czas.length) {
				czas = tr[i].getElementsByClassName('itemstacked1')[0].innerHTML; 
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);
			} else {
				c = tr[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].innerHTML;
				go=c.split(':')[0];
				mi=c.split(':')[1];
				se=c.split(':')[2];
				mi++; mi--; se++; se--; go++; go--;
				pozniej = new Date();
				pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
				if (go>0) pozniej.setHours(pozniej.getHours()+go); 
				if (mi>0) pozniej.setMinutes(pozniej.getMinutes()+mi); 
				if (se>0) pozniej.setSeconds(pozniej.getSeconds()+se); 
				rok = pozniej.getFullYear();
				miesiac = pozniej.getMonth()+1;
				dzien = pozniej.getDate();
				godzina = pozniej.getHours();
				minuty = pozniej.getMinutes();
				sekundy = pozniej.getSeconds();
			}
			var teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			GM_setValue(id+'UM_krok',rok);
			GM_setValue(id+'UM_kmiesiac',miesiac);
			GM_setValue(id+'UM_kdzien',dzien);
			GM_setValue(id+'UM_kgodzina',godzina);
			GM_setValue(id+'UM_kminuty',minuty);
			GM_setValue(id+'UM_ksekundy',sekundy);
			var roznica = pozniej.getTime() - teraz.getTime();
			var i = setInterval(function () {
					roznica-=1000;
					if (roznica<=0) {
						document.title=id.replace('r','R')+' - FINISH!';
						roznica=0;
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				},1000);
		} else {
			GM_setValue(id+'UM_krok',-1);
			GM_setValue(id+'UM_kmiesiac',0);
			GM_setValue(id+'UM_kdzien',0);
			GM_setValue(id+'UM_kgodzina',0);
			GM_setValue(id+'UM_kminuty',0);
			GM_setValue(id+'UM_ksekundy',0);
		}
		
	} 
	if (a=="?a=townshop" && GM_getValue(id+"UM_OP_shop1", true)) {
		sklep = document.getElementsByClassName('item-link');
		for (i=sklep.length-1; i>sklep.length-46; i--) {
			txt = String(sklep[i].onclick);
			txt = txt.substring(txt.search('<table'),txt.search('</table')+8);
			sklep[i].innerHTML+=txt.replace(/\\/g,"").replace(/Przedmiot jednorazowego użytku/g,"").replace("<br>","");
		}
	}
	if (a=="?a=arena") {
		table = document.getElementsByTagName('table')[4];
		tr = table.getElementsByTagName('tr');
		for (i=1; i<tr.length; i++) {
			sum= tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum= parseInt(sum.innerHTML.substring(sum.innerHTML.length-7,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
		}		
	}
	if (a=="?a=cevent" || a=="?a=cevent&do=current") {
		table = document.getElementsByTagName('table')[4];
		exp = false;
		tr = table.getElementsByTagName('tr');
		for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[5];
			sum= tr[i].getElementsByTagName('td')[2];
			akt = parseInt(sum.getElementsByTagName('SPAN')[sum.getElementsByTagName('SPAN').length-1].innerHTML);
			sum= parseInt(sum.innerHTML.substring(sum.innerHTML.length-8,sum.innerHTML.length));
			if (sum-akt) { 
				tr[i].getElementsByTagName('td')[2].innerHTML+=" (<span class=\"lnk\">"+(sum-akt)+"</span>)";
				tr[i].getElementsByTagName('td')[2].style.width="100px";
			}
			if ((td.innerHTML.length<135 && td.innerHTML.length>100) || td.innerHTML.length==250 || td.innerHTML.length==413 || td.innerHTML.length==414 || td.innerHTML.length==249 || td.innerHTML.length== 145) {
				t = td.getElementsByTagName('input');
				if (t.length==0) {
					exp = true;
					break;
				}
			}
		}
		if (exp) {
			czas = tr[i].getElementsByClassName('itemstacked1');
			if (czas.length) {
				czas = tr[i].getElementsByClassName('itemstacked1')[0].innerHTML; 
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);
			} else {
				c = tr[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].innerHTML;
				go=c.split(':')[0];
				mi=c.split(':')[1];
				se=c.split(':')[2];
				go++; go--; mi++; mi--; se++; se--;
				pozniej = new Date();
				pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
				if (go>0) pozniej.setHours(pozniej.getHours()+go); 
				if (mi>0) pozniej.setMinutes(pozniej.getMinutes()+mi); 
				if (se>0) pozniej.setSeconds(pozniej.getSeconds()+se); 
				rok = pozniej.getFullYear();
				miesiac = pozniej.getMonth()+1;
				dzien = pozniej.getDate();
				godzina = pozniej.getHours();
				minuty = pozniej.getMinutes();
				sekundy = pozniej.getSeconds();
			}

			var teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			GM_setValue(id+'UM_erok',rok);
			GM_setValue(id+'UM_emiesiac',miesiac);
			GM_setValue(id+'UM_edzien',dzien);
			GM_setValue(id+'UM_egodzina',godzina);
			GM_setValue(id+'UM_eminuty',minuty);
			GM_setValue(id+'UM_esekundy',sekundy);
			var roznica = pozniej.getTime() - teraz.getTime();
			var i = setInterval(function () {
					roznica-=1000;
					if (roznica<=0) {
						document.title=id.replace('r','R')+' - FINISH!';
						roznica=0;
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				},1000);
		} else {
			GM_setValue(id+'UM_erok',-1);
			GM_setValue(id+'UM_emiesiac',0);
			GM_setValue(id+'UM_edzien',0);
			GM_setValue(id+'UM_egodzina',0);
			GM_setValue(id+'UM_eminuty',0);
			GM_setValue(id+'UM_esekundy',0);
		}
		
	} 
	if (a=="?a=aliance") {

		if (GM_getValue(id+"UM_OP_ukryj", true)) {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[0];
				opis.innerHTML='<center><a id="UM_OP_ukryj" href="javascript:">UKRYWANIE OPISU PUBLICZNEGO AKTYWNE, KLIKNIJ BY WYŁĄCZYĆ TĄ OPCJE!</a></center>';
				document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",false); location.reload();}, false);
			}
		} else {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[0];
				opis.innerHTML='<center><a id="UM_OP_ukryj" href="javascript:">(kliknij aby ukryć opis)</a></center>'+opis.innerHTML;
				document.getElementById('UM_OP_ukryj').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj",true); location.reload();}, false);
			}

		}
		if (GM_getValue(id+"UM_OP_ukryj2", true)) {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[1];
				opis.innerHTML='<center><a id="UM_OP_ukryj2" href="javascript:">UKRYWANIE OPISU PRYWATNEGO AKTYWNE, KLIKNIJ BY WYŁĄCZYĆ TĄ OPCJE!</a></center>';
				document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",false); location.reload();}, false);
			}
		} else {
			opis = document.getElementsByClassName('clan-desc');
			if (opis.length) {
				opis = opis[1];
				opis.innerHTML='<center><a id="UM_OP_ukryj2" href="javascript:">(kliknij aby ukryć opis)</a></center>'+opis.innerHTML;
				document.getElementById('UM_OP_ukryj2').addEventListener('click', function() {GM_setValue(id+"UM_OP_ukryj2",true); location.reload();}, false);
			}		
		}
		
		if (GM_getValue(id+"UM_OP_klansort", true)) {
			// mod sort klan
			var nowe = new Array(); var x=0; var cells = document.getElementsByTagName("tr");
			for (var i = 0; i < cells.length; i++) {
					cel_tst = cells[i].innerHTML; 
					tst = cel_tst.search(' do kolejnej ekspedycji ');
					if (tst==-1) tst = cel_tst.search('to join an expedition in');
					if (tst==-1) tst = cel_tst.search(' de lancer la prochaine ');
					if (tst!=-1) {
						tds=cells[i].getElementsByTagName("td");
						nowe[x]= new Array(7);
						pkt = tds[5].innerHTML;
						for (pkts = 6 - pkt.length;pkts>0; pkts--) pkt="0"+pkt;
						nowe[x][0]=pkt;
						nowe[x][1]=tds[0].innerHTML;
						nowe[x][2]=tds[1].innerHTML;
						nowe[x][3]=tds[3].innerHTML;
						nowe[x][4]=tds[2].innerHTML;
						nowe[x][5]=tds[4].innerHTML;
						nowe[x++][6]=tds[6].innerHTML;
					}
			}
			nowe.sort();
			nowe.reverse();
			tabela="                                <tr class=\"tblheader\">\
													<td>&nbsp;&nbsp;LP&nbsp;&nbsp;</td>\
													<td>POZIOM</td>\
													<td width=\"130\" style=\"padding: 5px;\">Imię</td>\
													<td width=\"60\">On-line</td>\
													<td width=\"110\">Ranga</td>\
													<td width=\"80\">ADRES</td>\
													<td width=\"50\">PUNKTY</td>\
													<td width=\"150\">Data dołączenia</td></tr>"
			lp = 1;
			for (var i = 0; i < nowe.length; i++) {
				if (i%2==0) tabela+="<tr align=center>"; else  tabela+="<tr align=center class=even>";
				tabela+="<td style=\"color: gray;\">"+lp+"</td>";
				lp++;
				tabela+="<td>"+nowe[i][5]+"</td>";
				tabela+="<td>"+nowe[i][1]+"</td>";
				tabela+="<td>"+nowe[i][2]+"</td>";
				tabela+="<td>"+nowe[i][3]+"</td>";
				tabela+="<td>"+nowe[i][4]+"</td>";
				tabela+="<td>"+(nowe[i][0]-0)+"</td>";
				tabela+="<td>"+nowe[i][6]+"</td>";
				tabela+="</tr>";
			}
			miejsce=document.getElementsByTagName('table');
			miejsce[5].innerHTML=tabela;
		} 
	} 
		if (a=="?a=training&do=evo") {
		// mod zliczanie kosztu ewolucji
		suma=0; koszty = [['Skrzydła',150,300+150,450+300+150,600+300+450+150],['Pancerz',150,300+150,450+300+150,600+450+300+150],['Kły//Pazury//Kolce',150,300+150,450+300+150,600+300+450+150],['Gruczoły jadowe',150,300+150,450+300+150,600+450+300+150],['Wzmocnione ścięgna',150,300+150,450+300+150,600+450+300+150],['Dodatkowa komora',150,300+150,450+300+150,600+450+300+150],['Krew demona',150,300+150,450+300+150,600+450+300+150],['Mutacje DNA',150,300+150,450+300+150,600+300+450+150],['Oświecony',150,300+150,450+300+150,600+450+300+150],['Szósty zmysł',150,300+150,450+300+150,600+450+300+150],['Absorpcja',150,300+150,450+300+150,600+450+300+150],['Harmonijny rozwój',150,300+150,450+300+150,600+450+300+150],['Skażenie Maną',250,1000+250,2000+1000+250,4000+2000+100+250],['Pamięć przodków',300,600+300,900+600+300,1200+900+600+300],['Potęga',300,750+300,2000+750+300,5000+2000+750+300]];
		ewo = document.getElementsByClassName("training-evo-title");
		for (var i=0; i<ewo.length; i++) {
			czs = ewo[i].innerHTML;
			for (var i2=0; i2<koszty.length; i2++) {
				if (czs.search(koszty[i2][0])>-1) {
					if (czs.search("poziom ")>-1) {
						lvl = parseInt(czs.substr(czs.search("poziom ")+7,1)); suma+=koszty[i2][lvl];
					}
				}
			}
		}
		t = 0; suma2="";
		suma=suma+"";
		for (i=suma.length-1; i>=0; i--) {
			suma2=suma[i]+suma2;
			t++;
			if (t==3) { t=0; suma2=" "+suma2; }
		}
		version = document.getElementById('content-mid');
		ver2 = document.createElement('SPAN');
		ver2.innerHTML='<br><center>W SUMIE W TRENINGU: &nbsp;&nbsp;&nbsp;<b>'+suma2+'</b></center>';
		version.appendChild(ver2,version.firstChild);
	}
	
	if (a=="?a=auction" || a.substr(0,21)=="?a=auction&do=watched") {
		test = document.getElementsByClassName('tblheader')[document.getElementsByClassName('tblheader').length-1];
		test.getElementsByTagName('td')[4].style.width="";
		aukcja = false;
		test = document.getElementsByTagName('TR');
		GM_setValue(id+'UM_arok',-1);
		GM_setValue(id+'UM_amiesiac',0);
		GM_setValue(id+'UM_adzien',0);
		GM_setValue(id+'UM_agodzina',0);
		GM_setValue(id+'UM_aminuty',0);
		GM_setValue(id+'UM_asekundy',0);
		for (xi in test) {
			if (test[xi].id.substr(0,3)=='au_') {
				tst = test[xi].getElementsByTagName('TD');
				if (tst[4].className=='error') continue;
				czas = tst[4].innerHTML.replace('<br>',' ');
				var rok = czas.split('-')[0];
				var miesiac = czas.split('-')[1];
				var dzien = czas.split('-')[2].split(' ')[0];
				var godzina = czas.split(' ')[1].split(':')[0];
				var minuty = czas.split(' ')[1].split(':')[1];
				var sekundy= czas.split(' ')[1].split(':')[2];
				pozniej = new Date(rok,miesiac-1,dzien,godzina,minuty,sekundy);

				tst[4].innerHTML=tst[4].innerHTML.replace('<br>',' ')+'<br>'+'<span id="aukcjaLicznik'+xi+'">&nbsp;</span>';
				var teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				var roznica = pozniej.getTime() - teraz.getTime();

				GM_setValue(id+'UM_arok',rok);
				GM_setValue(id+'UM_amiesiac',miesiac);
				GM_setValue(id+'UM_adzien',dzien);
				GM_setValue(id+'UM_agodzina',godzina);
				GM_setValue(id+'UM_aminuty',minuty);
				GM_setValue(id+'UM_asekundy',sekundy);
			
				function aukcjeLicz(xi) { 
					roznica-=1000;
					if (roznica<=0) {
						roznica=0;						
						GM_setValue(id+'UM_arok',-1);
						GM_setValue(id+'UM_amiesiac',0);
						GM_setValue(id+'UM_adzien',0);
						GM_setValue(id+'UM_agodzina',0);
						GM_setValue(id+'UM_aminuty',0);
						GM_setValue(id+'UM_asekundy',0);
					} else {
						time=roznica;
						var days = Math.floor(time / 86400000);
						var hours = Math.floor( (time - (86400000 * days)) / 3600000); 
						if (hours<10) hours="0"+hours;
						var minutes = Math.floor( (time - (86400000 * days) - (3600000 * hours)) / 60000); 
						if (minutes<10) minutes="0"+minutes;
						var seconds = ( time - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
						seconds=Math.floor(seconds);
						if (seconds<10) seconds="0"+seconds;
						document.getElementById('aukcjaLicznik'+xi).innerHTML=hours+':'+minutes+':'+seconds;
						document.title=id.replace('r','R')+' - '+hours+':'+minutes+':'+seconds;
					}
				}
				var i = setInterval(function() { aukcjeLicz(xi); },1000);					
				break;
			}
		}
	}
	if (a.substring(0,22)=="?a=auction&do=itemlist") {
		itemS = document.getElementsByClassName('item-link');
		for (i=0; i<itemS.length; i++) {
			itemS[i].innerHTML=itemS[i].innerHTML.replace('Legendarny','<span class="enabled">Legendarny</span>');
			itemS[i].innerHTML=itemS[i].innerHTML.replace('Legendarna','<span class="enabled">Legendarna</span>');
			itemS[i].innerHTML=itemS[i].innerHTML.replace('Legendarne','<span class="enabled">Legendarne</span>');
		}
	}
	if ((a.substring(0,7)=="?a=rank" && GM_getValue(id+"UM_OP_mysort3", false)) || (a=="?a=rank" && GM_getValue(id+"UM_OP_mysort", true)) || (a=="?a=rank&page=1" && GM_getValue(id+"UM_OP_mysort1", true)) || (a=="?a=rank&page=2" && GM_getValue(id+"UM_OP_mysort2", true)) ) {
		// mod sort rank
		table = document.getElementsByClassName('rank')[0];
		poz = table.getElementsByTagName('tr');
		nowe = new Array();
		for (x=1; x<poz.length; x++) {
			nowe[x-1]=new Array(10);
			td = poz[x].getElementsByTagName('td');
			yes = td[4].getElementsByTagName('img')[0].alt;
			if (yes<0 || yes>8) yes=9;
			nowe[x-1][0]=yes;
			nowe[x-1][9]=td[0].innerHTML;
			nowe[x-1][1]=td[0].innerHTML; 
			if (nowe[x-1][1].length<3) nowe[x-1][1]='0'+nowe[x-1][1]
			if (nowe[x-1][1].length<4) nowe[x-1][1]='0'+nowe[x-1][1]

			nowe[x-1][2]=td[1].innerHTML;
			nowe[x-1][3]=td[2].innerHTML;
			if (td[3].innerHTML=="M") nowe[x-1][4]='<span style="color: #006BAD;">'+td[3].innerHTML+'</span>';
			else nowe[x-1][4]='<span style="color: #AD00A5;">'+td[3].innerHTML+'</span>';
			nowe[x-1][5]=td[4].innerHTML;
			nowe[x-1][6]=td[5].innerHTML;
			nowe[x-1][7]=td[6].innerHTML;
			nowe[x-1][8]=td[7].innerHTML;
		}
		nowe.sort();
		table.innerHTML='<tr class="tblheader"><td width="60">MIEJSCE</td><td width="160">NICK</td><td width="120">RASA</td><td width="50">SEX</td><td><img src="http://r12.bloodwars.interia.pl/gfx/msg3.gif" alt="NAPADNIJ"></td><td width="80">ADRES</td><td width="90">KLAN</td><td width="70">PUNKTY</td></tr>';
		for (x=0; x<nowe.length; x++) {
			if (x%2==0) even="even"; else even="";
			uid = nowe[x][2].substring(nowe[x][2].search('uid=')+4,nowe[x][2].search('">'));
			
			teraz = new Date();
			teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
			teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();

			testa = GM_getValue(id+'UM_1_'+uid, "A:B").split(':')[1];
			testb = GM_getValue(id+'UM_2_'+uid, "A:B").split(':')[1];
			atakowany = "";
			if (testa == testb && testb == teraz) atakowany='style="filter: alpha(opacity=10); opacity: .1;"';
			else if (testa == teraz || testb == teraz && testa != testb) atakowany='style="filter: alpha(opacity=65); opacity: .65;"';
			table.innerHTML+='<tr class="'+even+'" onmouseover="this.className=\'selectedItem\';" onmouseout="this.className=\''+even+'\';" align="center"><td class="townview" style="text-align: center;">'+nowe[x][9]+'</td><td>'+nowe[x][2]+'</td><td>'+nowe[x][3]+'</td><td>'+nowe[x][4]+'</td><td '+atakowany+'>'+nowe[x][5]+'</td><td>'+nowe[x][6]+'</td><td>'+nowe[x][7]+'</td><td>'+nowe[x][8]+'</td></tr>';
		}	
	}
	if (a.substring(0,7)=="?a=rank") {
		window.addEventListener('keydown', 	function (e) {
			var KeyID = (window.event) ? event.keyCode : e.keyCode;
			if (a.search('page=')>0) {
				page = a.substring(a.search('page=')+5,a.length);
				page = parseInt(page);
				if (page == 0) page = 1;
			} else page = 1;
			if (e.altKey) switch(KeyID) {
				case 37:
				if (page>1) page--;
				window.location="?a=rank&page="+page;
				break;
				case 39:	
				page++;
				window.location="?a=rank&page="+page;
				break;
			}
		}, true);
	}
	function zaznaczacz(txt,check) {
		tr = document.getElementsByTagName('TR');
		for (i=0; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('TD');
			if (td.length==4) if (td[3].innerHTML.length==19) if (td[1].innerHTML.search(txt)>0) td[0].getElementsByTagName('input')[0].checked=check;
		}
	}
	function zaznaczacz_res(check) {
		tr = document.getElementsByTagName('TR');
		for (i=0; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('TD');
			if (td.length==4) if (td[3].innerHTML.length==19) if (td[1].innerHTML.search('zasadzkę')<1 && td[1].innerHTML.search(' ofertę handlową')<1 && td[1].innerHTML.search('Wygrana licytacja!')<1 && td[1].innerHTML.search('Twoja aukcja została')<1 && td[1].innerHTML.search('Twoja oferta została')<1 && td[1].innerHTML.search('Raport z wyprawy.')<1 && td[1].innerHTML.search('Raport z ekspedycji - ')<1 && td[1].innerHTML.search('Król Wzgórza - ')<1 && td[1].innerHTML.search('Oblężenie na ')<1 && td[1].innerHTML.search('Walka na Arenie ')<1) td[0].getElementsByTagName('input')[0].checked=check;
		}
	}
	if ("?a=msg"==a.substring(0,6) || "?mid="==a.substring(0,5)) {
		rlc = document.getElementsByClassName('rlc');
		if (rlc.length) {
			var stan = new Array();
			var wyprowadzonych = new Array();
			var kolor = new Array();
			var unik = new Array();
			var kryty = new Array();
			var otrzymane = new Array();
			var uniknione = new Array();
			s=-1;
			rlc=rlc[0];

			walka = rlc.getElementsByClassName('atkHit');
			for (i=0; i<walka.length; i++) {
				kto=walka[i].getElementsByTagName('B')[0].innerHTML;
				if (s==-1) { s=0; } else {
					for (s=0;s<stan.length;s++) {
						if (stan[s]==kto) break;
					}
				}
				stan[s]=kto; 
				if (walka[i].innerHTML.search('Żar Krwi')<1) {
					if (wyprowadzonych[s] == undefined) wyprowadzonych[s]=1; else wyprowadzonych[s]++;
					if (unik[s] == undefined) unik[s]=0;
					if (walka[i].innerHTML.search(' zostaje zranion')>0) { 
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-2].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="defHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (otrzymane[d] == undefined) otrzymane[d]=0;
						otrzymane[d]++;					
					} else
					if (walka[i].innerHTML.search(' unika ')>0) { 
						unik[s]++;
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-1].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="defHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (uniknione[d] == undefined) uniknione[d]=0;
						uniknione[d]++;
					}
					if (kryty[s] == undefined) kryty[s]=0;
					if (walka[i].innerHTML.search('cios krytyczny')>0) kryty[s]++; 
				}
				kolor[s]="atkHit";
			}

			walka = rlc.getElementsByClassName('defHit');
			for (i=0; i<walka.length; i++) {
				kto=walka[i].getElementsByTagName('B')[0].innerHTML;
				if (s==-1) { s=0; } else {
					for (s=0;s<stan.length;s++) {
						if (stan[s]==kto) break;
					}
				}
				stan[s]=kto; 
				if (walka[i].innerHTML.search('Żar Krwi')<1) {
					if (wyprowadzonych[s] == undefined) wyprowadzonych[s]=1; else wyprowadzonych[s]++;
					if (unik[s] == undefined) unik[s]=0;
					if (walka[i].innerHTML.search(' zostaje zranion')>0) { 
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-2].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="atkHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (otrzymane[d] == undefined) otrzymane[d]=0;
						otrzymane[d]++;					
					} else
					if (walka[i].innerHTML.search(' unika ')>0) {
						unik[s]++;
						komu=walka[i].getElementsByTagName('b')[walka[i].getElementsByTagName('b').length-1].innerHTML;
						for (d=0;d<stan.length;d++) {
							if (stan[d]==komu) break;
						}
						stan[d]=komu;
						kolor[d]="atkHit";
						if (wyprowadzonych[d] == undefined) wyprowadzonych[d]=0;
						if (kryty[d] == undefined) kryty[d]=0;
						if (unik[d] == undefined) unik[d]=0;
						if (uniknione[d] == undefined) uniknione[d]=0;
						uniknione[d]++;
					}
					if (kryty[s] == undefined) kryty[s]=0;
					if (walka[i].innerHTML.search('cios krytyczny')>0) kryty[s]++; 
				}
				kolor[s]="defHit";
			}

			sum=document.getElementsByClassName('ambsummary');
			if (!sum.length) {
				sum=document.getElementsByClassName('result')[document.getElementsByClassName('result').length-1];
				raport="<br><table border=\"0\" style=\"border-collapse: collapse; background: black; text-align: center;\" width=\"100%\"><tr>";
			} else { 
				raport="<br><table border=\"0\" style=\"border-collapse: collapse; text-align: center;\" width=\"95%\"><tr>";
				sum=sum[0];
			}
			for (i=0; i<stan.length; i++) {
				if (i%3==0) raport+="</tr><tr>";
				niceOne="";
				niceKryty=true;
				niceIlosc=true;
				for (x=0; x<stan.length; x++) {
					if (x!=i) {
						if (kryty[x]>kryty[i]) niceKryty=false;
						if (wyprowadzonych[x]>wyprowadzonych[i]) niceIlosc=false;
					}
				}
				if (niceKryty || niceIlosc) niceOne="border: 2px white dotted;";
				raport+="<td style=\""+niceOne+" padding: 6px; text-align: center;\"><b class=\""+kolor[i]+"\">"+stan[i]+"</b><BR>";
				raport+="Trafione: <b>"+(parseInt(wyprowadzonych[i])-parseInt(unik[i]))+"</b> / <b>"+wyprowadzonych[i]+"</b> ";
				if ((wyprowadzonych[i]-unik[i])/wyprowadzonych[i]*100) raport+="("+(((wyprowadzonych[i]-unik[i])/wyprowadzonych[i]*100).toFixed(2))+"%)";
				raport+="<br>Krytycznych: <b>"+kryty[i]+"</b> ";
				if (kryty[i]) raport+="("+(((kryty[i])/(wyprowadzonych[i]-unik[i])*100).toFixed(2))+"%)";
				if (uniknione[i] == undefined) uniknione[i]=0;
				if (otrzymane[i] == undefined) otrzymane[i]=0;
				raport+="<br>Otrzymane: <b>"+otrzymane[i]+"</b> / <b>"+(otrzymane[i]+uniknione[i])+"</b>";
				if (otrzymane[i]/(otrzymane[i]+uniknione[i])*100) raport+=" ("+(otrzymane[i]/(otrzymane[i]+uniknione[i])*100).toFixed(2)+"%)";
				raport+="</td>";
			}
			sum.innerHTML+=raport+"</tr></table>";
		}
	}
	if ("?a=msg"==a.substring(0,6) || "?mid="==a.substring(0,5)) {
		add = document.getElementsByClassName('top-options')[0];
		add2 = document.createElement('SPAN');
		add2.innerHTML='<br><br><center>ZAZNACZ: <input type="checkbox" id="zaz_wyp"> WYPRAWY <input type="checkbox" id="zaz_ata"> ATAKI <input type="checkbox" id="zaz_exp"> EXPY-OBLEGI <input type="checkbox" id="zaz_han"> HANDEL <input type="checkbox" id="zaz_res"> POZOSTAŁE</center>';
		add.appendChild(add2);
		document.getElementById('zaz_han').addEventListener('click', function() { 
			zaznaczacz(' ofertę handlową',this.checked); 
			zaznaczacz('Wygrana licytacja!',this.checked); 
			zaznaczacz('Twoja aukcja została',this.checked); 
			zaznaczacz('Twoja oferta została',this.checked); 
		}, false);
		document.getElementById('zaz_ata').addEventListener('click', function() { zaznaczacz('zasadzkę',this.checked); }, false);
		document.getElementById('zaz_res').addEventListener('click', function() { zaznaczacz_res(this.checked); }, false);
		document.getElementById('zaz_wyp').addEventListener('click', function() { zaznaczacz('Raport z wyprawy.',this.checked); }, false);
		document.getElementById('zaz_exp').addEventListener('click', function() { zaznaczacz('Raport z ekspedycji - ',this.checked); zaznaczacz('Król Wzgórza - ',this.checked); zaznaczacz('Oblężenie na ',this.checked); zaznaczacz('Walka na Arenie ',this.checked); }, false);
		
	}
	if ("?a=rank"==a.substring(0,7)) {
		stats = document.getElementsByClassName('stats-player')[0].innerHTML;
		stats = stats.replace(/&lt;/gi,"<");
		stats = stats.replace(/&gt;/gi,">");
		pts = (stats.substring((stats.search('<strong>')+8),stats.search('</strong>')).replace(/ /gi,"")) / 1000;
		lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));
		table = document.getElementsByClassName('rank')[0];
		poz = table.getElementsByTagName('tr');
		t_lev = Math.ceil(lev / 100 * 84.5);
		for (x=1; x<poz.length; x++) {
			td = poz[x].getElementsByTagName('td');
			e_pts = td[7].innerHTML;
			e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));
			if (e_lev>=t_lev) td[1].getElementsByTagName('b')[0].innerHTML+=' <span style="color: gray; float: right;">E</span>';
			taga = td[1].getElementsByTagName('a')[0];
			taga.onmouseover=function() {
				document.getElementById('chmurka').style.display="";
				document.getElementById('chmurka').style.left=parseInt(document.getElementById('x').innerHTML)+"px";
				document.getElementById('chmurka').style.top=parseInt(document.getElementById('y').innerHTML)+10+"px";
				document.getElementById('chmurka').innerHTML='NOTATKI: '+this.innerHTML+"<br/><br/>"+GM_getValue(id+"UM_notka"+this.id.substring(1), "brak (dodaj w profilu gracza)").replace(/\n/g,'<br />');
			}
			taga.onmouseout=function() {
			document.getElementById('chmurka').style.display="none";			
			}
		}
	}
	if (a.substring(0,11)=="?a=auction&" && a.search('&t=69')>0) {
		if (a.search('addfav=')>0) 
			table = document.getElementsByTagName('TABLE')[6];
		else
			table = document.getElementsByTagName('TABLE')[5];
		
		if (document.getElementsByTagName('TABLE')[3].innerHTML.search('Twoja oferta zo')>0) {
			table = document.getElementsByTagName('TABLE')[6];
		}
		tr = table.getElementsByTagName('TR');
		for (i=1; i<tr.length; i++) {
			td = tr[i].getElementsByTagName('TD');
			sztuk = td[1].innerHTML.substring(td[1].innerHTML.search(':')+1).replace('</span>','');
			oferta = td[3].innerHTML.replace(' ','');

			bid = td[6].innerHTML.substring(td[6].innerHTML.search('showBidForm')+12);
			bid = bid.substr(0,bid.search(';')-1);
			if (td[2].innerHTML=="0") 
				td[1].innerHTML+=" ("+unsafeWindow.auData[parseInt(bid)].minPrize+" - "+(Math.round(unsafeWindow.auData[parseInt(bid)].minPrize/sztuk))+"/szt)";
			else
				td[1].innerHTML+=" ("+unsafeWindow.auData[parseInt(bid)].minPrize+")";
			
			if (parseInt(oferta)>0) {
				td[3].innerHTML+=' - '+(Math.round(oferta/sztuk))+'/szt';
				td[6].innerHTML=td[6].innerHTML.replace(/LICYTUJ/g,'LICYTUJ <b>'+(Math.round(oferta/sztuk*1.05))+'</b>/szt');
			}
		}
	}
	if (a.substring(0,11)=="?a=townview") {
		var scriptCode = new Array();
		scriptCode.push('function showSector(str, sec) {');
		scriptCode.push('	if (str < 1) str = 1;');
		scriptCode.push('	if (str > 5) str = 5;');
		scriptCode.push('	var maxSectors = getMaxSectors(str);');
		scriptCode.push('	if (sec < 1) sec = maxSectors;');
		scriptCode.push('	if (sec > maxSectors) sec = 1;');
		scriptCode.push('	if (str == strefa && sec == sektor) return false;');
		scriptCode.push('	strefa = str;');
		scriptCode.push('	sektor = sec;');
		scriptCode.push('	document.getElementById(\'please_wait\').style.visibility = \'visible\';');
		scriptCode.push('	for (x = 1; x <= 5; x++) document.getElementById(\'btn_\'+x).disabled = true;');
		scriptCode.push('	getFile(\'_ajaxTownView.php?strefa=\'+strefa+\'&sektor=\'+sektor);');
		
		scriptCode.push('	setTimeout(function () { stats = document.getElementsByClassName(\'stats-player\')[0].innerHTML;');
		scriptCode.push('	stats = stats.replace(/&lt;/gi,"<");');
		scriptCode.push('	stats = stats.replace(/&gt;/gi,">");');
		scriptCode.push('	pts = (stats.substring((stats.search(\'<strong>\')+8),stats.search(\'</strong>\')).replace(/ /gi,"")) / 1000;');
		scriptCode.push('	lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));');
		scriptCode.push('	t_lev = Math.ceil(lev / 100 * 84.5);');
		scriptCode.push('	s = document.getElementsByClassName(\'panel-cell\')[0].innerHTML;');
		scriptCode.push('	aj = parseInt(s.split(\'/\')[0])+1;');
		scriptCode.push('	ns = ((parseInt((s.split(\'/\')[1]-1)*12))+parseInt(s.split(\'/\')[2]));');
		scriptCode.push('	tr = document.getElementsByTagName(\'tr\');');
		scriptCode.push('	for (i=0; i<tr.length; i++) {');
		scriptCode.push('		if (tr[i].style.height=="16px") {');
		scriptCode.push('			td = tr[i].getElementsByTagName(\'td\');');
		scriptCode.push('			if (td[3].getElementsByTagName(\'b\').length) {');
		scriptCode.push('				e_pts = td[3].getElementsByTagName(\'b\')[0].innerHTML;');
		scriptCode.push('				e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));');
		scriptCode.push('				if (e_lev>=t_lev) td[1].innerHTML+=\' <span style="color: gray; float: right;">E</span>\';');
		scriptCode.push('				if (s.split(\'/\')[0]!=5) if (td[8].innerHTML.length==27) td[8].innerHTML=\'<a href="?a=townview&amp;strefa=\'+aj+\'&amp;sektor=\'+ns+\'">\'+aj+\'/\'+ns+\'</a>\';');
		scriptCode.push('			}');
		scriptCode.push('		}');
		scriptCode.push('	} },250);');
		scriptCode.push('}');
		var script = document.createElement('script');
		script.innerHTML = scriptCode.join('\n');
		scriptCode.length = 0;
		document.getElementsByTagName('head')[0].appendChild(script); 
		
		stats = document.getElementsByClassName('stats-player')[0].innerHTML;
		stats = stats.replace(/&lt;/gi,"<");
		stats = stats.replace(/&gt;/gi,">");
		pts = (stats.substring((stats.search('<strong>')+8),stats.search('</strong>')).replace(/ /gi,"")) / 1000;
		lev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));
		t_lev = Math.ceil(lev / 100 * 84.5);
		s = document.getElementsByClassName('panel-cell')[0].innerHTML;
		aj = parseInt(s.split('/')[0])+1;
		ns = ((parseInt((s.split('/')[1]-1)*12))+parseInt(s.split('/')[2]));		
		tr = document.getElementsByTagName('tr');
		for (i=0; i<tr.length; i++) {
			if (tr[i].style.height=="16px") {
				td = tr[i].getElementsByTagName('td');
				if (td[3].getElementsByTagName('b').length) {
				e_pts = td[3].getElementsByTagName('b')[0].innerHTML;
				e_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));
				if (e_lev>=t_lev) td[1].innerHTML+=' <span style="color: gray; float: right;">E</span>';
				if (s.split('/')[0]!=5) if (td[8].innerHTML.length==27) td[8].innerHTML='<a href="?a=townview&amp;strefa='+aj+'&amp;sektor='+ns+'">'+aj+'/'+ns+'</a>';
				taga = td[1].getElementsByTagName('a');
				if (taga.length) {
					taga = taga[0];
					taga.onmouseover=function() {
						document.getElementById('chmurka').style.display="";
						document.getElementById('chmurka').style.left=parseInt(document.getElementById('x').innerHTML)+"px";
						document.getElementById('chmurka').style.top=parseInt(document.getElementById('y').innerHTML)+10+"px";
						document.getElementById('chmurka').innerHTML='NOTATKI: '+this.innerHTML+"<br/><br/>"+GM_getValue(id+"UM_notka"+this.id.substring(1), "brak (dodaj w profilu gracza)");
					}
					taga.onmouseout=function() {
						document.getElementById('chmurka').style.display="none";			
					}
				}
				}
			}
		}
	} 
	if ("?a=build"==a.substring(0,8)) {
		bld = document.getElementsByClassName('bldprogress');
		if (bld.length) {
			GM_setValue(id+"UM_bld",true);
			script = bld[0].getElementsByTagName('SCRIPT')[0];
			bldtime = script.innerHTML.substring(script.innerHTML.search('timeFields.bld_action = ')+24,script.innerHTML.search(';'));
			var pozniej = new Date();
			pozniej.setTime(pozniej.getTime()+unsafeWindow.timeDiff*1000);
			pozniej.setSeconds(pozniej.getSeconds()+parseInt(bldtime)); 
			rok = pozniej.getFullYear();
			miesiac = pozniej.getMonth()+1;
			dzien = pozniej.getDate();
			godzina = pozniej.getHours();
			minuty = pozniej.getMinutes();
			sekundy = pozniej.getSeconds();
			GM_setValue(id+'UM_brok',rok);
			GM_setValue(id+'UM_bmiesiac',miesiac);
			GM_setValue(id+'UM_bdzien',dzien);
			GM_setValue(id+'UM_bgodzina',godzina);
			GM_setValue(id+'UM_bminuty',minuty);
			GM_setValue(id+'UM_bsekundy',sekundy);

			pozniej = new Date();
			pozniej.setTime(pozniej.getTime()+(unsafeWindow.timeDiff*1000)+(unsafeWindow.timeFields.bld_action*1000));
			bld[0].innerHTML+="<br>Data ukończenia: <span class=\"bldtimeleft\">"+pozniej+"</span>";
		} else {
			GM_setValue(id+'UM_brok',-1);
			GM_setValue(id+'UM_bmiesiac',0);
			GM_setValue(id+'UM_bdzien',0);
			GM_setValue(id+'UM_bgodzina',0);
			GM_setValue(id+'UM_bminuty',0);
			GM_setValue(id+'UM_bsekundy',0);
			GM_setValue(id+"UM_bld",false);
		}		
	}
	if ("t"!=a[a.length-1] && "?a=profile&uid="==a.substring(0,15)) {
		divs = document.getElementsByTagName('div');
		user = a.substring(15);
		i=29;
		if(divs[i].innerHTML.length<400) i++;
		divs[i].innerHTML+='<fieldset class="profile" style="text-align: center; height: 150px;"><legend class="profile">NOTATKI</legend><textarea id="UM_notka'+user+'" style="width: 100%; height: 96%;">'+GM_getValue(id+"UM_notka"+user, "")+'</textarea></fieldset>';
		teraz = new Date();
		teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
		teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();
		testa = GM_getValue(id+'UM_1_'+user, "A:B").split(':')[1];
		testb = GM_getValue(id+'UM_2_'+user, "C:D").split(':')[1];
		if (testa == testb && testb == teraz) document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace('NAPADNIJ','<s>NAPADNIJ</s>');
		else if (testa == teraz || testb == teraz && testa != testb) document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace('NAPADNIJ','NAPADNIJ 2GI RAZ');
			
		document.getElementById('UM_notka'+user).addEventListener('keyup', function() {GM_setValue(id+"UM_notka"+user,this.value);}, false);
	} 
	if (a=="?a=training" || a=="?a=training&do=stats") {
		// mod zliczanie kosztu trenu
		suma=0;
		for (var i=1; i<=document.getElementById('stat_0').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_1').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_2').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_3').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_4').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_5').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_6').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_7').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		for (var i=1; i<=document.getElementById('stat_8').innerHTML; i++) suma+=Math.ceil(10*Math.pow(1.2, i-1));
		t = 0; suma2="";
		suma=suma+"";
		for (i=suma.length-1; i>=0; i--) {
			suma2=suma[i]+suma2;
			t++;
			if (t==3) { t=0; suma2=" "+suma2; }
		}
		version = document.getElementById('content-mid');
		ver2 = document.createElement('SPAN');
		ver2.innerHTML='<br><center>W SUMIE W TRENINGU: &nbsp;&nbsp;&nbsp;<b>'+suma2+'</b></center>';
		version.appendChild(ver2,version.firstChild);
	}
	if (GM_getValue(id+"UM_OP_donesound",false)) {
		unsafeWindow.refLinks.quest_timeleft+='<embed src=\"'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'\" hidden=true autostart=true loop=false>';
		unsafeWindow.refLinks.atkTime+='<embed src=\"'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'\" hidden=true autostart=true loop=false>';
	}
	if (GM_getValue(id+"UM_OP_shoutboxclan", false)) {
		// mod shoutboxa
		document.getElementById('sbox_icons_clan').click();
		document.getElementById('sbox_msg_clan').style.opacity="0.85";
		document.getElementById('sbox_msg_global').style.opacity="0.85";
	}
	// mod czas exp i kw wszedzie
	krok = GM_getValue(id+'UM_krok',-1);
	k = false;
	var teraz = new Date();
	teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
	if (krok!=-1) {		
		pozniejk = new Date(GM_getValue(id+'UM_krok',0),GM_getValue(id+'UM_kmiesiac',0)-1,GM_getValue(id+'UM_kdzien',0),GM_getValue(id+'UM_kgodzina',0),GM_getValue(id+'UM_kminuty',0),GM_getValue(id+'UM_ksekundy',0));
		var roznicak = pozniejk.getTime() - teraz.getTime();
		if (roznicak>0) {
			k = true;
			var i2 = setInterval(function () {
				roznicak-=1000;
				if (roznicak<=0) {
					document.getElementById('kw').innerHTML='FINISH!';
					roznicak=0;
				} else {
					timek=roznicak;
					var days = Math.floor(timek / 86400000);
					var hours = Math.floor( (timek - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timek - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timek - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
					document.getElementById('kw').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	erok = GM_getValue(id+'UM_erok',-1);
	e = false;
	if (erok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_erok',0),GM_getValue(id+'UM_emiesiac',0)-1,GM_getValue(id+'UM_edzien',0),GM_getValue(id+'UM_egodzina',0),GM_getValue(id+'UM_eminuty',0),GM_getValue(id+'UM_esekundy',0));
		var roznicae = poznieje.getTime() - teraz.getTime();
		if (roznicae>0) {
			e = true;
			var i = setInterval(function () {
				roznicae-=1000;
				if (roznicae<=0) {
					document.getElementById('exp').innerHTML='FINISH!';
					roznicae=0;
				} else {
					timee=roznicae;
					var days = Math.floor(timee / 86400000);
					var hours = Math.floor( (timee - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timee - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timee - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
					document.getElementById('exp').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	brok = GM_getValue(id+'UM_brok',-1);
	b = false;
	if (brok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_brok',0),GM_getValue(id+'UM_bmiesiac',0)-1,GM_getValue(id+'UM_bdzien',0),GM_getValue(id+'UM_bgodzina',0),GM_getValue(id+'UM_bminuty',0),GM_getValue(id+'UM_bsekundy',0));
		var roznicab = poznieje.getTime() - teraz.getTime();
		if (roznicab>0) {
			b = true;
			var i = setInterval(function () {
				roznicab-=1000;
				if (roznicab<=0) {
					document.getElementById('unmodbld').innerHTML='FINISH!';
					roznicab=0;
				} else {
					timeb=roznicab;
					var days = Math.floor(timeb / 86400000);
					var hours = Math.floor( (timeb - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timeb - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timeb - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
						if (days) document.getElementById('unmodbld').innerHTML=days+'d '+hours+':'+minutes+':'+seconds;
						else document.getElementById('unmodbld').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	arok = GM_getValue(id+'UM_arok',-1);
	au = false;
	if (arok!=-1) {		
		poznieje = new Date(GM_getValue(id+'UM_arok',0),GM_getValue(id+'UM_amiesiac',0)-1,GM_getValue(id+'UM_adzien',0),GM_getValue(id+'UM_agodzina',0),GM_getValue(id+'UM_aminuty',0),GM_getValue(id+'UM_asekundy',0));
		var roznicaa = poznieje.getTime() - teraz.getTime();
		if (roznicaa>0) {
			au = true;
			var i = setInterval(function () {
				roznicaa-=1000;
				if (roznicaa<=0) {
					document.getElementById('unmodauk').innerHTML='FINISH?';
					roznicaa=0;
				} else {
					timea=roznicaa;
					var days = Math.floor(timea / 86400000);
					var hours = Math.floor( (timea - (86400000 * days)) / 3600000); 
					if (hours<10) hours="0"+hours;
					var minutes = Math.floor( (timea - (86400000 * days) - (3600000 * hours)) / 60000); 
					if (minutes<10) minutes="0"+minutes;
					var seconds = ( timea - (86400000 * days) - (3600000 * hours) - (60000 * minutes) ) / 1000; 
					seconds=Math.floor(seconds);
					if (seconds<10) seconds="0"+seconds;
						if (days) document.getElementById('unmodauk').innerHTML=days+'d '+hours+':'+minutes+':'+seconds;
						else document.getElementById('unmodauk').innerHTML=hours+':'+minutes+':'+seconds;
				}
			},1000);
		}
	}

	div = document.getElementsByClassName('remark')[0];
	div.innerHTML+='&nbsp;';
	if (e) div.innerHTML+='<a href="?a=cevent"><span style="color: red;">&nbsp;EXP:</span> <span style="color: red;" id="exp">00:00:00</span></a>&nbsp;&nbsp;';
	if (k) div.innerHTML+='<a href="?a=swr"><span style="color: red;">KW:</span> <span style="color: red;" id="kw">00:00:00</span></a>&nbsp;&nbsp;';
	if (b) div.innerHTML+='<a href="?a=build"><span style="color: red;">BUDOWA:</span> <span style="color: red;" id="unmodbld">00:00:00</span></a>&nbsp;&nbsp;';
	if (au) div.innerHTML+='<a href="?a=auction"><span style="color: red;">AUKCJA:</span> <span style="color: red;" id="unmodauk">00:00:00</span></a>&nbsp;&nbsp;';
	if (GM_getValue(id+'UM_OP_alarm',false)) {
		i0=""; if (GM_getValue(id+'UM_OP_alarm_h',0)<10) i0="0";
		i1=""; if (GM_getValue(id+'UM_OP_alarm_m',0)<10) i1="0";
		div.innerHTML+='<span id="alarm" style="color: red;">ALARM: '+i0+GM_getValue(id+'UM_OP_alarm_h',0)+':'+i1+GM_getValue(id+'UM_OP_alarm_m',0)+'</span>';
		setInterval( function () { 
			if (GM_getValue(id+'UM_OP_alarm',false)) {
				teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				h=teraz.getHours(); 	
				m=teraz.getMinutes(); 	
				if (parseInt(h)==GM_getValue(id+'UM_OP_alarm_h',0) && GM_getValue(id+'UM_OP_alarm_m',0)==parseInt(m)) {
					GM_setValue(id+'UM_OP_alarm_on',true);
					GM_setValue(id+'UM_OP_alarm',false);
				}
			}
		}, 1000);
	}
	if (a=="?a=training&do=evo") {
		
	}
	if (a=="?a=tasks") {

		function juenOpis(text,text2) {
			document.getElementsByTagName('BODY')[0].innerHTML=document.getElementsByTagName('BODY')[0].innerHTML.replace(text,'<span class="lnk" onmouseover="return overlib(\''+text2+'\',HAUTO,WIDTH,500,CAPTIONFONTCLASS,\'action-caption\',TEXTFONTCLASS,\'overlibText overlibExtended\',VAUTO,CAPTION,\'OPIS ZADANIA\');" onmouseout="nd();">'+text+'</span>');
		}
		
		// s2 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1	
		juenOpis('Zdobądź poziom 80.','W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
		juenOpis('Udowodnij swój zmysł do biznesu. Wybuduj Cmentarz oraz Bank Krwi.','Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
		juenOpis('Zdobądź serca i umysły tłumu. Osiągnij 50 pkt. charyzmy.','Gdy mamy już wymaganą wartość cechy, wystarczy podnieść o 1, bądź awansować o 1 poziom,  by zaliczyło zadanie.');
		juenOpis('Zakon Świętego Benedykta wysłał przeciwko Tobie skrytobójcę. Znajdź go w Okolicach Miasta.','Na przeciwnika trafiamy na bliskiej wyprawie, dosyć łatwe to zaliczenia.');
		juenOpis('Zostań władcą ciemnych zaułków Miasta. Osiągnij 55 pkt. wpływów.','Gdy mamy już wymaganą wartość cechy, wystarczy podnieść o 1.');
		juenOpis('Twój kwadrat został najechany przez paladynów z Zakonu Świętego Benedykta. Przygotuj się na ostateczną bitwę między Światłem i Ciemnością...','Zadanie oblężeniowe - NIE wbijamy arkan gdyż przeciwnicy mają wyssanie mocy na poziomie +10.');
		juenOpis('Wielki Mistrz Zakonu uszedł z życiem z poprzedniej batalii. Znajdziesz go gdzieś na zakazanym pustkowiu. Udaj się tam i ofiaruj mu szansę spotkania z jego bogiem...','Pielgrzymka - mocny pajac do ubicia, 10% że na niego trafimy.');
		juenOpis('Zostań Władcą Miasta. Tu i teraz.','Należy awansować do pierwszej strefy.');
		juenOpis('Pan Ciemności wymaga, aby w jego Katedrze nigdy nie brakowało krwi. Jako członek Wewnętrznego Kręgu jesteś zobowiązany do złożenia ofiary. Zgromadź 800 000 litrów krwi, po czym złóż ofiarę 10% tej wartości.','Zbieramy zasoby, klikamy link, zadanie wykonane.');
		juenOpis('Pan Ciemności wymaga, aby w jego Katedrze nigdy nie brakowało krwi. Jako członek Wewnętrznego Kręgu jesteś zobowiązana do złożenia ofiary. Zgromadź 800 000 litrów krwi, po czym złóż ofiarę 10% tej wartości.','Zbieramy zasoby, klikamy link, zadanie wykonane.');
		juenOpis('Prawdziwe doświadczenie można zdobyć tylko przemierzając niebezpieczne szlaki. Wykonaj co najmniej 15 udanych pielgrzymek w nieznane.','Wykonujemy 15 udanych pielgrzymek będąc na 2s. Licznik jest podany przy zadaniu. ');
		juenOpis('Dotarły do Ciebie plotki o dziwnej anomalii, znajdującej się gdzieś na pustkowiach. Znajdź i wyjaśnij tajemnicze zjawisko.','Pielgrzymka, gdzie wynik jest średnią testu inteligencji i wiedzy.');
		juenOpis('Twoi ludzie donieśli, że przy rabusiu zabitym w okolicach miasta znaleziono list. Z listu wynika, że twoja prawnuczka Anhala więziona jest na Polach Lęgowych. Zorganizuj ekspedycję ratunkową.','Zakładamy Ekspedycję na Lokację zwaną Pola Lęgowe (losowa lokacja) gdzie ubić mamy Gargulce. Podobnie jak z Duchem jest 10% ze na nie trafimy');
		juenOpis('Całe miasto patrzy na członków Rady. Daj znak swej wielkości i zapewnij krew dla swoich poddanych. Rozbuduj Szpital na poziom 7 oraz Rzeźnie na poziom 22.','Gdy oba mamy wybudowane, wystarczy podnieść z nich o 1 poziom by zaliczyło zadanie.');
		juenOpis('Sława to nie wszystko, wampiry podążą tylko za kimś naprawdę potężnym. Zdobądź 84 poziom.','W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');

		// s3 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1
		juenOpis('Wykonaj wszystkie Pielgrzymki w Nieznane.','W przypadku, gdy są już wykonane, wystarczy zaliczyć dowolną by zaliczyło zadanie.');	
		juenOpis('W nieznanych zakątkach pustkowia Wilczy Król zbiera stada, by się z Tobą rozprawić. Zakradnij się do jego siedliska i skróć jego męki. Legendy głoszą, że zabić go można tylko srebrną kulą...','Na Wilczego Króla idziemy na pielgrzymkę. Bunkier + mocna broń palna polecane.');
		juenOpis('Zdobądź poziom 50.','W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
		juenOpis('Wybuduj wszystkie budynki z trzeciej strefy.','Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
		juenOpis('Od dawna wiadomo, że najlepszą obroną jest atak. Rozbuduj Sklep z Bronią do 5 poziomu.','Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
		juenOpis('Ostatnio przeciwnicy zawsze są o krok przed Tobą. Rozbuduj Dziennik Lokalny do 4 poziomu, by skutecznie przeciwdziałać wrogim szpiegom.','Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
		juenOpis('Twoi agenci odkryli kryjówkę wrogiej szajki szpiegowskiej. Zajmują jedną z kamienic w Twoim kwadracie. Zorganizuj oblężenie i wybij ich jak robaki.','Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
		juenOpis('Od samego początku byłeś pewny, że ten czas kiedyś nastanie... Dostań się do Rady, awansując do Drugiej Strefy!','Ze strefy 3 należy udać się do strefy 2.');
		juenOpis('Od samego początku byłaś pewna, że ten czas kiedyś nastanie... Dostań się do Rady, awansując do Drugiej Strefy!','Ze strefy 3 należy udać się do strefy 2.');
		juenOpis('Obowiązkiem każdego wampira wysokiej rangi jest dostarczenie ludzi do posługi w Katedrze. Zbierz 500 000 ludzi i oddaj Katedrze w ofierze 10% z nich.','Zbieramy ludzi, klikamy w link, zadanie wykonane :)');
		juenOpis('Minęło już wiele dni, odkąd Twój syn wyruszył na wyprawę w nieznane, a Ty nadal nie otrzymałeś od niego żadnych wieści. Pełen niepokoju postanawiasz udać się na poszukiwania.','Pielgrzymka ze testem gdzie wynik procentowy jest średnią wiedzy i inteligencjii, mamy 10% szans że trafimy na ten test.');
		juenOpis('Minęło już wiele dni, odkąd Twój syn wyruszył na wyprawę w nieznane, a Ty nadal nie otrzymałaś od niego żadnych wieści. Pełna niepokoju postanawiasz udać się na poszukiwania.','Pielgrzymka ze testem gdzie wynik procentowy jest średnią wiedzy i inteligencjii, mamy 10% szans że trafimy na ten test.');
		juenOpis('Wpływy, władza, splendor... aby to wszystko utrzymać, potrzebujesz pieniędzy. Aby pokryć swoje zwiększone wydatki, musisz zwiększyć swoje dochody. Rozbuduj dom publiczny na poziom 14.','Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
		juenOpis('Twoja pozycja, sława i bogactwo sprawiły, że jesteś uważany za jednego z bardziej wpływowych wampirów w mieście. Jeden z członków Rady poprosił Ciebie o pomoc w zniszczeniu szajki mutantów pustoszących szlaki handlowe do miasta.','Daleka wyprawa - należy zgładzić mutanta (Czy trafi się herszt, czy jeden z popleczników to loteria. Dużo sposta/zwinki + ogrom dmg zalecane), 10% że trafimy na przeciwnika.');
		juenOpis('Twoja pozycja, sława i bogactwo sprawiły, że jesteś uważana za jednego z bardziej wpływowych wampirów w mieście. Jeden z członków Rady poprosił Ciebie o pomoc w zniszczeniu szajki mutantów pustoszących szlaki handlowe do miasta.','Daleka wyprawa - należy zgładzić mutanta (Czy trafi się herszt, czy jeden z popleczników to loteria. Dużo sposta/zwinki + ogrom dmg zalecane), 10% że trafimy na przeciwnika.');
		juenOpis('Dokonaj heroicznego czynu. Tylko to przyciągnie pod Twój sztandar potężne wampiry.','Należy zaliczyć dowolną pielgrzymkę.');

		// s4 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1	
		juenOpis('Jest kilka sposobów zdobywania reputacji w świecie umarlaków. Jednym z nich jest posiadanie potężnych artefaktów. Ukończ łącznie 4 Pielgrzymki w Nieznane.','Zaliczyć 4 pielgi. W wypadku gdy mamy już zaliczone więcej, a dopiero odblokowaliśmy zadanie wystarczy zaliczyć dowolną pielgrzymkę');
		juenOpis('Masz pieniądze i wiesz jak je zdobywać. Teraz musisz zyskać reputację wśród Trzody. Podnieś poziom Pośredniaka do 15 poziomu.','Gdy zadanie nie jest zaliczone, wystarczy podnieść o 1 poziom pośredniak.');
		juenOpis('Przywódca okolicznego stada wilkołaków poprzysiągł Ci zemstę za zniszczenie watahy w Twoim kwadracie. Najlepiej zrobisz, znajdując jego kryjówkę gdzieś Daleko od Miasta i kończąc jego mizerną egzystencję.','Należy zgładzić przeciwnika na Dalekiej Wyprawie.');
		juenOpis('Ludzie w Twoim kwadracie zaczęli zapadać na dziwną chorobę. Twoi szpiedzy sugerują, byś szukał odpowiedzi w Okolicach Miasta.','Walka z Ghullami - ze zwględu na wysoką odporność zaleca się ponad 50zwinki oraz broń biała, min 6 ataków. ');
		juenOpis('Ludzie w Twoim kwadracie zaczęli zapadać na dziwną chorobę. Twoi szpiedzy sugerują, byś szukała odpowiedzi w Okolicach Miasta.','Walka z Ghullami - ze zwględu na wysoką odporność zaleca się ponad 50zwinki oraz broń biała, min 6 ataków. ');
		juenOpis('Zdobądź poziom 35.','W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
		juenOpis('Gdy byłeś na wyprawie, wampir-uzurpator zajął Twoją siedzibę. Odbij ją wraz z członkami klanu.','Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
		juenOpis('Gdy byłaś na wyprawie, wampir-uzurpator zajął Twoją siedzibę. Odbij ją wraz z członkami klanu.','Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
		juenOpis('Wybuduj wszystkie budynki ze strefy czwartej.','Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
		juenOpis('Władza!! Awansuj do strefy Trzeciej. I zasiądź w Wewnętrznym Kręgu.','Ze strefy 4 należy udać się do strefy 3.');
		juenOpis('Jak nakazuje wampirza tradycja, każdy nowo mianowany Inkwizytor wyprawia wystawną ucztę, na którą zaprasza wszystkich mieszkańców miasta. Wampir twojej rangi musi wykazać się bogactwem i hojnością. Zgromadź na swoim koncie 5 000 000 PLN i złóż ofiarę w wysokości 10% tej sumy.','Zbieramy kasę, klikamy w link i zalicza zadanie.');
		juenOpis('Twoi zwiadowcy poinformowali Cię o dziwnych zjawiskach zachodzących na Wielkim Stepie. Sugerują, żebyś zbadał sytuację zanim będzie za późno.','Expedycja na Wielki Step (lokacja Hydry) - mamy 10% na trafienie na Ducha (minimum 140zwinki 70 sposta 8000HP)');
		juenOpis('Twoi zwiadowcy poinformowali Cię o dziwnych zjawiskach zachodzących na Wielkim Stepie. Sugerują, żebyś zbadała sytuację zanim będzie za późno.','Expedycja na Wielki Step (lokacja Hydry) - mamy 10% na trafienie na Ducha (minimum 140zwinki 70 sposta 8000HP)');
		juenOpis('Ważne osobistości mają zawsze wielu wrogów, dlatego przydaje się dodatkowa ochrona. Rozbuduj Posterunek Policji na 18 poziom i Schronisko na 14 poziom.','Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
		juenOpis('Kolejne zmasakrowane ciała, ludzie okrutnie pozbawieni wnętrzności, korpusy bez głów. Co się dzieje? Wyślij szpiegów do swojego kwadratu i sprawdź kto za tym stoi.','Należy przeszpiegować skutecznie swój kwadrat (dowolna opcja, szansa na udane szpiegowanie i tak wynosi JEDEN procent), powtarzać do skutku.');
		juenOpis('Informacje uzyskane od młodego człowieka prowadzą do karczmy na przedmieściach miasta. Wraz z grupą innych wampirów sprawdźcie, co tam się dzieje.','Oblężenie na Miecz Inkwizycji - liczba przeciwników to 26-28 (mocna ekipa białasów 180 zwinki i palniaków 110 sposta).');
		juenOpis('Gdy obudziłeś się wieczorem, na biurku znalazłeś dziwny list. Poznaczony śladami krwi, zawierał w sobie tylko słowa: "Ratuj", "Uwięziona" i "Daleko". Pisane w pośpiechu, w różnych miejscach pergaminu. Cóż to może oznaczać?','Należy wykonać udaną daleką (10% szans ze trafimy na ten test), gdzie testem jest średnia Zwinności i Intela.');
		juenOpis('Gdy obudziłaś się wieczorem, na biurku znalazłeś dziwny list. Poznaczony śladami krwi, zawierał w sobie tylko słowa: "Ratuj", "Uwięziona" i "Daleko". Pisane w pośpiechu, w różnych miejscach pergaminu. Cóż to może oznaczać?','Należy wykonać udaną daleką (10% szans ze trafimy na ten test), gdzie testem jest średnia Zwinności i Intela.');
		juenOpis('Wykaż się męstwem. Tylko to przyciągnie pod Twój sztandar wytrawnych łowców.','Wykonaj daleką wyprawę');

		// s5 
		juenOpis('Twój stan majątkowy budzi nasz niepokój, Akolito. Masz za zadanie rozbudować Dom Publiczny do 3 poziomu.','Jeśli nie spełniasz wymagań, może warto jest skorzystać z opcji burzenia?');
		juenOpis('Krew jest źródłem naszej siły. Dokonaj rozbudowy Rzeźni do 5 poziomu. ','Należy wybudować rzeźnie na piąty poziom, jeśli mamy już taki osiągniety wystarczy wybudować poziom wyżej.');
		juenOpis('Zdobądź 10 poziom.','Osiągnij 10 poziom swojej postaci. Wystarczy wykonywać ataki oraz wyprawy.');
		juenOpis('Groźny mutant przedostał się ze strefy zewnętrznej, trzeba go znaleźć i powstrzymać zanim wyrządzi więcej szkód. Na jego trop możesz wpaść, przeszukując Okolice Miasta.','Masz szanse na trafienie tego przeciwnika na bliskich wyprawach.');
		juenOpis('Zbadaj dokładnie Okolice Miasta. ','Wykonaj (pozytywnie) wszystkie wyprawy bliskie,');
		juenOpis('Każdy szanujący się wampir powinien posiadać kolekcję artefaktów. Ukończ wszystkie Dalekie Wyprawy. ','Każdy szanujący się wampir powinien posiadać kolekcję artefaktów. Ukończ wszystkie Dalekie Wyprawy.');
		juenOpis('Tylko najlepsi z najlepszych są warci tego zadania i tylko oni posiadają przedmioty Mocy. Odbądź udaną Pielgrzymkę w Nieznane. ','Wykonaj jedną udaną Pielgrzymkę w nieznane ');
		juenOpis('W naszym kwadracie grasuje wataha wilkołaków. Trzeba je zabić, atakując je we własnej kryjówce. ','Załóż oblężenie na swój kwadrat [urząd zasadzkę --> przygotuj oblężenie]. Warto jest zabrać ze sobą klanowiczy.');
		juenOpis('Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację, rozbudowując Dom Publiczny na 10 poziom oraz stawiając Stary Rynek.','Wybuduj Dom publiczny na poziom 10 oraz postaw budynek Stary Rynek. Jeśli już masz te budynki, wystarczy podnieść jeden z nich o poziom ');
		juenOpis('Urodziłeś się po to, by awansować. Udowodnij to, awansując do IV strefy.','Załóż oblężenie na kwadrat w IV strefie. Zajmując terytorium wykonasz to zadanie.');
		juenOpis('Urodziłaś się po to, by awansować. Udowodnij to, awansując do IV strefy.','Załóż oblężenie na kwadrat w IV strefie. Zajmując terytorium wykonasz to zadanie.');
		juenOpis('Rozszerz swoje wpływy w świecie mroku zdobywając wasala (możesz tego dokonać korzystając z linka ref. w Sali Tronowej). ','Zaproś przyjaciela do gry używając linku referencyjnego z Sali Tronowej.');

		// moria/necro mix (+s1)
		juenOpis('Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację, rozbudowując Dom Publiczny na 8 poziom oraz Postój Taxi na 2 poziom.','Wybuduj Dom publiczny na poziom 8 oraz Postój Taxi na poziom 2. Jeśli już masz te budynki, wystarczy podnieść jeden z nich o poziom');
		juenOpis('Prestiż wśród wampirów to nie tylko bogactwo i władza. Tylko wielki wojownik wzbudza prawdziwy respekt.','Wygraj 15 walk pod rząd urządzając zasadzkę. Walki w obronie się nie liczą.');
		juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłeś młodym wampirem, który przybył do miasta marząc o sławie i władzy.','Należy pokonać assasyna na bliskiej wyprawie');
		juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłaś młodym wampirem, który przybył do miasta marząc o sławie i władzy.','Należy pokonać assasyna na bliskiej wyprawie');
		juenOpis('Zdobądź 89 poziom.','Zdobądź 89 poziom.');
		juenOpis('Wszystkie zagadkowe historie nagle stały się jasne. U wrót miasta stanęła armia potężnych magów, mających przed sobą tylko jeden cel - doszczętne zniszczenie miasta i "wyzwolenie" ludzi od gnębiących ich wampirów. Czas, by wszystkie wampiry zjednoczyły się w walce przeciwko wspólnemu wrogowi.','Oblężenie na własny kwadrat przeciw Bractwu Chaosu.');
		
	}
	if (a=="?a=profile") {
		ref = document.getElementsByClassName('content-mid')[0].getElementsByTagName('A')[1].innerHTML;
		num = ref.substring(ref.search('uid=')+4);
		div = document.getElementsByClassName('profile')[0];
		div.innerHTML+='<BR>Sygnaturka <a href="http://zk.nakoz.org/'+num+id+'p1.png">http://zk.nakoz.org/'+num+id+'p1.png</a>:<br><img width="328" src="http://zk.nakoz.org/'+num+id+'p1.png">';
	}
	if (a=="?a=quest") {
		version = document.getElementById('content-mid');
		ver2 = document.createElement('SPAN');
		ver2.innerHTML='<br><center><iframe scrolling=no src="http://mega.szajb.us/juenizer/unmod/ver.php?mini=yes&ver='+UM_VER+'" width="240" style="margin-top: -20px;" frameborder=0 height="28"></iframe></center>';
		version.insertBefore(ver2,version.firstChild);
	}
	if (a=="?a=ambush") {
		test = document.getElementsByClassName('players');
		if (test.length) {
			uid = test[0].href.substr(test[0].href.search('uid=')+4);			
			sid=6;
			for (sid=6; sid<document.getElementsByTagName('script').length; sid++) {
				if (document.getElementsByTagName('script')[sid].innerHTML.search("refLinks.atkTime")!=-1) break;
			}
			
			if (document.getElementsByTagName('script')[sid].innerHTML.search("refLinks.atkTime")!=-1) {
			
				suid = document.getElementsByTagName('table');
				for (i=0; i<suid.length; i++) {
					if (suid[i].innerHTML.search('VS.')>0) {
						pl = suid[i].getElementsByClassName('players')[0].href;
						uid = pl.substr(pl.search('uid=')+4);
					}
				}
			
				mid = document.getElementsByTagName('script')[sid].innerHTML.substr(document.getElementsByTagName('script')[sid].innerHTML.search('a=msg&do=view&mid=')+18);
				mid = mid.substr(0,mid.search('"'));
				teraz = new Date();
				teraz.setTime(teraz.getTime()+unsafeWindow.timeDiff*1000);
				teraz = teraz.getDate()+'/'+(teraz.getMonth()+1)+'/'+teraz.getFullYear();
				if (GM_getValue(id+'UM_1_'+uid, "A:B")!=mid+':'+teraz && GM_getValue(id+'UM_2_'+uid, "A:B")!=mid+':'+teraz) {			
					GM_setValue(id+'UM_2_'+uid, GM_getValue(id+'UM_1_'+uid, "A:B"));
					GM_setValue(id+'UM_1_'+uid, mid+':'+teraz);
				}
			}
		}
		
	}
	if ("?a=msg&do=view&mid="==a.substring(0,19) && GM_getValue(id+'UM_OP_wyparch',true)) {
		mid = a.replace('?a=msg&do=view&mid=','').replace('&type=1','');
		c = document.getElementById('content-mid');
		if (c.innerHTML.search("msg-content msg-quest")>0) {
			divs = c.getElementsByTagName('DIV');
			for (i=0; i<divs.length; i++) {
				if (divs[i].style.marginTop=="10px") {
					//raport z wyprawy
					link = divs[i].getElementsByTagName('A')[0].innerHTML;
					key = link.substring(link.search('key=')+4);
					c.innerHTML+='<iframe width=100% frameborder="0" height="28" scrolling="no" src="http://mega.szajb.us/juenizer/unmod/staty_wypraw.php?id='+id+'&key='+key+'&mid='+mid+'"></iframe>';
				}
			}
		}
	}
	// dupa, pozdrawiam czytaczy kodów ;)

	setInterval( function () { 
		if (GM_getValue(id+'UM_OP_alarm_on',false)) {
			if (document.getElementById('alm')) {
			} else {
				d = document.getElementById('content-mid');
				span = document.createElement('SPAN');
				span.id="alm";
				span.innerHTML='<center style="font-size: 20px; font-weight: bold;"><a class="active" id="_alarm" href="javascript:">ALARM (kliknij by wyłączyć)</a><embed src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" hidden=true autostart=true loop=true></center><br>';

				d.insertBefore(span,d.firstChild);
				document.getElementById('_alarm').addEventListener('click', function() {GM_setValue(id+"UM_OP_alarm_on",false); document.getElementById('alm').innerHTML=""; document.getElementById('alm').style.display="none";}, false);
			}
		} else {
			if (document.getElementById('alm')) {
				document.getElementById('alm').innerHTML=""; document.getElementById('alm').style.display="none";
			}
		}
	}, 2000);

	window.addEventListener('keydown', 	function (e) {
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		if (e.altKey) switch(KeyID) {
			case 48:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_0',"auction");
			break;
			case 49:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_1',"msg");
			break;
			case 50:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_2',"aliance");
			break;
			case 51:	3
			window.location="?a="+GM_getValue(id+'UM_OP_key_3',"equip");
			break;
			case 52:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_4',"ambush");
			break;
			case 53:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_5',"quest");
			break;
			case 54:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_6',"cevent");
			break;
			case 55:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_7',"swr");
			break;
			case 56:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_8',"rank");
			break;
			case 57:	
			window.location="?a="+GM_getValue(id+'UM_OP_key_9',"townview");
			break;
		}
	}, true);

	if (GM_getValue(id+"UM_OP_youtube", true)) {
	var i = setInterval(function () {
	sb = document.getElementById('sbox_global_container');
	a = sb.getElementsByTagName('a');
	for (i=0; i<a.length; i++) {
		if (a[i].href.substring(0,22)=="http://www.youtube.com" && a[i].id != "done") {
			a[i].id="done";
			iframe = document.createElement('IFRAME');
			iframe.width="265";
			iframe.height="199";
			iframe.frameBorder="0";
			iframe.allowfullscreen=true;
			iframe.src="http://www.youtube.com/embed/" + a[i].href.substring(a[i].href.search("v=")+2,a[i].href.search("v=")+2+11);
			a[i].appendChild(iframe);
			unsafeWindow.scrollSbox('global');
		}
	}		
	sb = document.getElementById('sbox_clan_container');
	a = sb.getElementsByTagName('a');
	for (i=0; i<a.length; i++) {
		if (a[i].href.substring(0,22)=="http://www.youtube.com" && a[i].id != "done") {
			a[i].id="done";
			iframe = document.createElement('IFRAME');
			iframe.width="265";
			iframe.height="199";
			iframe.frameBorder="0";
			iframe.allowfullscreen=true;
			iframe.src="http://www.youtube.com/embed/" + a[i].href.substring(a[i].href.search("v=")+2,a[i].href.search("v=")+2+11);
			a[i].appendChild(iframe);
			unsafeWindow.scrollSbox('clan');
		}
	}			
	},1000);
	}
	div='<div id="quick_tools" style="width: auto; float: right; border: 1px solid gray; padding: 2px 10px; margin: 2px; cursor: pointer;"><select style="height: 20px; font-size: 10px;" name="toolbar" onchange="document.location.href=\'?a=equip&amp;eqset=\'+this.value;"><option value="0">&gt;</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>';
	divs = document.getElementsByTagName('DIV');
	mydiv=divs[divs.length-4];
	if (mydiv.innerHTML.search("&nbsp;")!=-1) mydiv=divs[divs.length-3];
	mydiv.innerHTML+=div;

} //unmodon