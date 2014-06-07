// ==UserScript==
// @name           vu_omni
// @version        8.35
// @namespace      vegzetur
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @include        http://*.vegzetur.hu/*
// @include        http://*.vladcaosudu.sk/*
// @include        http://*.doomlord.ru/*
// @include        http://*.doomlord.eu/*
// ==/UserScript==

var version = "8.35";

// Támadás gomb paraméterek
	var v1_scarabeusz=[2426/*Zander*/,4144/*The Joker*/,4366/*Kgyusz*/,1292/*Jarod Ronkar*/,11929/*Hlegba*/,875/*Graham Treefrog*/,43407/*Fejsze*/,740/*Donga*/,2294/*Black Panther*/,3212/*Ardun mork*/,1155/*Arkhroth Croa'khyn*/,3946/*Morduk*/,4931/*Gaborn*/,7404/*Texex*/,21488/*Miguel*/,280/*blakehu*/,1324/*Mernalie*/,21256/*Shinymind*/,8809/*Zsolesz555*/,3642/*Water*/,4672/*Roger Hooker*/,3752/*Bogdan*/,7153/*SigaDragon*/,40877/*F3rcsu*/,37700/*Buttgerit*/,29575/*Shodi*/,18851/*Kupek*/,19594/*Brutikusz*/,51694/*Pindur pandur*/,23939/*Aravis*/,41255/*KisMuki*/,1210/*Holtsárkány*/,6050/*AzZaZeL*/,];
	var v1_zan=[3757/*Demo*/,7504/*Atu'*/]; //A zan néha átalakulhat Scarabeusszá!
	var v2_scarabeusz=[580/*Miller*/,7268/*Daedelus*/,4071/*Siku*/,5134/*Seligen*/,1147/*Mohinder*/,3971/*Lonyuzo*/,2716/*Bogdan12*/,1939/*BikeSzte*/,4637/*Galuppi*/,1409/*PaSy*/,282/*Drisan*/,8122/*Berengar*/,8332/*Gauron*/,9289/*FikuszQukisz*/,10683/*Drakoma*/,11054/*Sárkány karom*/,10727/*Spityu*/,26938/*Don Gatto*/,529/*Elen*/,18339/*Vadiati*/,6698/*Csirkeláb*/,7875/*Angyalka*/,2998/*Keyprice*/,21767/*Gagac86*/,9330/*Tryxike*/,6710/*Cian*/,12545/*Cerebrus*/,8268/*Geog*/,15063/*Ada1974*/];
	var v2_zan=[99998/*Név1*/,99999/*Név2*/];
	var v3_scarabeusz=[1597/*Hercegnő*/,311/*Pumur2*/,1338/*Impopo*/,3784/*Bryan1717*/,318/*Kistoth*/,620/*Zééé*/,1151/*IV_Ulrich*/,1214/*Valdimir*/,145/*Kockás Abrosz*/,600/*Hagen*/,18773/*Kos'*/,18774/*Böbebaba01*/,162/*Dzskar El Khebir*/,1148/*_Ryu_*/,4421/*Memo*/,6656/*Jashmine*/,32/*Shogun*/,10988/*Odite*/,7948/*Lost95*/,16/*Blade*/,1574/*Darklady117*/,4086/*Merlina*/,49/*MatykoIV*/,76/*PATAHÁZI*/,9759/*Gainmaster*/,9129/*Bandus*/,12561/* Lord Edmund Feketevipera*/,7778/*Harlekino*/,68/*Tyityu*/,22436/*Boszika*/,12267/*Rumc*/,11405/*Kormi*/];
	var v3_zan=[128/*Eroot ibn Shienkai*/,16991/*Bruti*/];
	var napirutin = true; // Auto napirutin gomb megnyomás, ha lehet. (true/false)
	var keszrutinrejtes = true; // Az elvégzett napi dolgok elrejtése. (true/false)
	var force_host_nyelv = -1; // Amennyiben fordító scriptet használsz és magyarul akarod, hogy működjön az omni, állítsd át 0-ra.

// Nyelvi szövegek
	var omni_nyelv=0; // 0 - Magyar, 1 - Szlovák, 2 - Angol, 3 - Orosz, 4 - Francia
	
	var dis_1=['Sajnos elfogyott az epikus ütéshez megjelölt gyógyitalod, így az autmata epikus ütés leáll!','Žiaľ už nemáš zvolené liečivé nápoje pre epické boje a preto sú automatické útoky na eposa zastavené!'];
	var dis_2=['Omni beállítások','Nastavenia Omni', 'Omni settings', 'Omni настройки'];
	var dis_3=['Mentés','Uložiť'];
	var dis_4=['Van újabb omni verzió!\nHozzá tartozó lapot megnyitottam!','Existuje novšia verzia Omni!\nK tomu patriacu stránku som otvoril!'];
	var dis_5=['Állatsebzés','Poškodenie zveru'];
	var dis_6=['Állatsebződés','Poškodený zver'];
	var dis_7=['MNT','NAP'];
	var dis_8=['Idő','Čas'];
	var dis_9=['Szint/TP','Úrov/XP'];
	var dis_10=['Bezárás','Zavrieť'];
	var dis_11=['Üzenet!','Správy'];
	var dis_12=['Kihívás!','Výzva'];
	var dis_13=['Támadás!','Útok'];
	var dis_14=['SzubTám!','SubÚtok'];
	var dis_15=['Kennelkalk','Brlohkalk'];
	var dis_16=['Klikk','Stlač'];
	var dis_17=['Végzet Temploma','Chrám osudu'];
	var dis_18=['Lady Alvariel','Lady Alvariel'];
	var dis_19=['Épület statisztikák','Štatistiky stavania'];
	var dis_20=['Toplista pozíció','Skontroluj umiestnenie'];
//	var dis_21=['Xeno beállítások','Nastavenia Xeno', 'Xeno settings', 'Xeno настройки'];
	var dis_21=['Xeno statisztikák törlése','Xeno delete stat'];
	var dis_22=['LE', 'DE', 'SE'];
	var dis_23=['Xeno statisztikák törölve.', 'Xeno stats have been deleted.', 'Xeno stats have been deleted.'];
	var dis_24=['Támadások', 'Počet útokov'];
	var dis_25=['Statisztikák törlése', 'Vymaž štatistiku'];
	var dis_26=['Biztos törlöd a statisztikát?', 'Si si istý, že vymažeš štatistiku?'];
	var dis_27=['Statisztikák törölve.', 'Štatistiky mazané'];
	var dis_28=['Össz', 'Celkový'];
	var dis_29=['TP', 'XP'];
	var dis_30=['LE/támadás', 'DE/útokov'];
	var dis_31=['LE/TP', 'DE/XP'];
	var dis_32=['Sebzés', 'Spôsobené poranenie'];
	var dis_33=['Sebződés', 'Utŕžené poranenie'];
	var dis_34=['Sajtolás', 'Vysaté zvieratá'];
	var dis_35=['Ősdrágakő', 'Arcidrahokam'];
	var dis_36=['Ital', 'Nápoj'];
	var dis_37=['Kaland', 'Dobrodružstvá'];
	var dis_38=['Szubplazma', 'Subplazma'];
	var dis_39=['Részletes statisztikák', 'Podrobná štatistika'];
	var dis_40=['PP', 'SB'];
	var dis_41=['CSP', 'AB'];
	var dis_42=['', ''];

// Kereső szövegek
	var host_nyelv=0; // 0 - Magyar, 1 - Szlovák

	var ker_1=['Portyázás','Súboj'];
	var ker_2=['Jutalomrelikviák','Award-relics'];
	var ker_3=['motivációs jogar','motivačný bič'];
	var ker_4=['Platina motivációs jogar','Platinový motivačný bič'];
	var ker_5=['Arany motivációs jogar','Zlatý motivačný bič'];
	var ker_6=['Ezüst motivációs jogar','Strieborný motivačný bič'];
	var ker_7=['Bronz motivációs jogar','Bronzový motivačný bič'];
	var ker_8=['Alapszint','Základná úroveň'];
	var ker_9=['Nevet adok neki','Pomenujem ho'];
	var ker_10=['Új nevet adok neki','Premenovať'];
	var ker_11=['Felszerelés','Vybavenie'];
	var ker_12=['Alapszint','Základná úroveň'];
	var ker_13=['Felszerelés:','Vybavenie:'];
	var ker_14=['Üdvözlünk','Vítame Ťa'];
	var ker_15=['Tárgylista - ','Inventár predmetov - '];
	var ker_16=['ÉP','HP'];
	var ker_17=['VP','Mana'];
	var ker_18=['TP','XP'];
	var ker_19=['LE/TP','DE/XP'];
	var ker_20=['Hűségbónusz','Bonus vernosti'];
	var ker_21=['Átveszem','Vyžiadať'];
	var ker_22=['Vadászat','Lov'];
	var ker_23=['Szövetség','Aliancia'];
	var ker_24=['Prémium tagság','Prémiový účet'];
	var ker_25=['Őskövek','Prakamene'];
	var ker_26=['Támadás','Útok'];
	var ker_27=['intelligens kedvenc','inteligentné zviera'];
	var ker_28=['Megittad a gyógyitalt, gyógyultál','Vypil si liečivý nápoj, uzdravil si'];
	var ker_29=['Nem veheted fel, mert nincs nálad ilyen tárgy!','Nemôžeš ho použiť, lebo nemáš u seba takýto predmet!'];
	var ker_30=['idő múlva csatázhatsz legközelebb','Ešte musí uplynúť'];
	var ker_31=['A csata során elloptál ellenfeledtől \(\\d+\) kiégett őskövet!','Elloptál $ kiégett őskövet!','Počas boja si ukradol od protivníka \(\\d+\) vyhorených prakameňov!', 'V súboji si získal $ vyhorené prakamene!'];
	var ker_32=['A csata hevében ellenfeled ellopott tőled \(\\d+\) kiégett őskövet!','Ellopott tőled $ kiégett őskövet!','Počas boja tvoj súper od teba ukradol \(\\d+\) vyhorených prakameňov.','V súboji si stratil $ vyhorené prakamene!'];
	var ker_33=['Kiszabadultál ellenfeled kínzókamrájából','Kiszabadultál ellenfeled kínzókamrájából!','Tvoj súper ťa odvliekol do mučiarne.','Tvoj súper ťa odvliekol do mučiarne.'];
	var ker_34=['Elhurcoltad ellenfeledet a kínzókamrába.','Elhurcoltad ellenfeledet a kínzókamrába.','Odvliekol si svojho súpera do mučiarne','Odvliekol si svojho súpera do mučiarne'];
	var ker_35=['Te nyerted a csatát, jutalmad ','Jutalmad ','Vyhral si boj, tvojou odmenou je','Zvíťazil si:'];
	var ker_36=['Ellenfeled nyerte a csatát, e','E','Boj vyhral tvoj súper, okradol ťa o','Zvíťazil súper:'];
	var ker_37=['Ellenfeled állatai \(\\d+\) életpontot sebződtek.','Zvieratá tvojho súpera boli poranené \(\\d+\) HP.'];
	var ker_38=['Ellenfeled állata \(\\d+\) életpontot sebződött.','Zviera tvojho súpera bolo poranené \(\\d+\) HP.'];
	var ker_39=['Az állatod \(\\d+\) életpontot sebződött.','Tvoje zviera bolo poranené \(\\d+\) HP.'];
	var ker_40=['Az állataid \(\\d+\) életpontot sebződtek.','Tvoje zvieratá boli poranené \(\\d+\) HP.'];
	var ker_41=['Ellenfeled bosszúsan így kiált feléd:','Tvoj protivník na teba nasrdený\(á\) zvrieskne:'];
	var ker_42=['Kennel \(\\d+\).','Brloh \(\\d+\).'];
	var ker_43=['[^\\d]\(\\d+\)\\. SzintAlap','[^\\d]\(\\d+\)\\. ÚroveňZákladná'];
	var ker_44=['\([\\d\\.]+\) \\/ \([\\d\\.]+\) TP','\([\\d\\.]+\) \\/ \([\\d\\.]+\) XP'];
	var ker_45=['intelligencia\(\\d+\)','inteligencia\(\\d+\)'];
	var ker_46=['\\+\(\\d+\) TP győz','\\+\(\\d+\) XP\/víťazstvo'];
	var ker_47=['Gyakorlás','Výcvik'];
	var ker_48=['Relikviák','Jutalomrelikviák', 'Kisebb térkapus fk.', 'Nagyobb térkapus fk.', 'Relikvie', 'Award-relics', 'smaller dim. gate crystals', 'greater dim. gate crystals', 'Bonusové relikvie', 'menšie kryštály ČPB', 'väčšie kryštály ČPB'];
	var ker_49=['5 egymás utáni napon nézd meg a Lady Alvariel verseny állását \\(Egyéb gomb\\)!','Počas 5 nasledujúcich dní skontroluj stav súťaže Lady Alvariel \\(tlačítko Iné\\)!'];
	var ker_50=['5 egymást követő napon nézd meg a szövetségedben egy épület statisztikáit!','Počas 5 nasledujúcich dní skontroluj štatistiku jednej budovy v aliancii!'];
	var ker_51=['5 egymást követő napon nézd meg a Toplistában a karaktered helyezését!','Počas 5 nasledujúcich dní si skontroluj umiestnenie v rebríčku!'];
	var ker_52=['jutalmad \(\\d+\) lélekenergia és \(\\d+\) TP!','tvojou odmenou je \(\\d+\) duševnej energie a \(\\d+\) XP!'];
	var ker_53=['-1 ősdrágakő','-1 Arcidrahokam'];
	var ker_54=['A csata végén a következő italt találtad: \([\\D\\s]+\)\\.','Na konci boja si našiel nasledujúci nápoj: \([\\D\\s]+\)\\.'];
	var ker_55=['div class="success">Munkád jutalma: 2 aranydukát','div class="success">Odmenou za tvoju prácu je 2 zlatých dukátov'];
	var ker_56=['div class="success">Megvetted a következő italokat:','div class="success">Kúpil si si nasledujúce nápoje:'];
	var ker_57=['',''];
	var ker_58=['',''];
	var ker_59=['',''];

// Alap funkciók

function id(elem){
	return document.getElementById(elem);
}

function tag(tagname){
	return document.getElementsByTagName(tagname);
}
	
function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function getByClass2(where, tag, classname){
	items = [];
	elems = where.getElementsByTagName(tag);
	for (var i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function getByName(tag, name){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].name==name) {
			items.push(elems[i]);
		}
	}
	return items;
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function systimetick(){
 id('systime').innerHTML = id('rendszerido').innerHTML;
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

//  MENÜ FUNKCIÓK

function configure(){
	window.scrollBy(0,150);
	style = document.createElement('style');
	style.innerHTML = '#omnilayer {display: block; opacity: .85; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9; text-align: center;} #omnilayer div {background-color: #101; text-align: left; padding: 20px; border: double gray 4px; position: relative; top: 5%; margin-right: auto; margin-left: auto; width: 730px;} #omnilayer h1 {margin: 25px} #omnilayer label {width: 100px; display: block; float: left; line-height: 20px;} #omnilayer input {float: left; width: 30px; margin: 3px 0px;} #omnilayer br {clear: both} #omnilayer #bezaras {cursor: pointer; position: absolute; right: 0px; top: -2px; width: 20px; height: 20px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer}';
	document.getElementsByTagName('body')[0].appendChild(style);

	omnilayer = document.createElement('div');
	omnilayer.id = 'omnilayer';
	omnilayer.style.overflow='auto';
	belsodiv = document.createElement('div');
	cim = document.createElement('h2');
	cim.innerHTML = dis_2[omni_nyelv];
		
	document.getElementsByTagName('body')[0].appendChild(omnilayer);
	omnilayer.appendChild(belsodiv);
	belsodiv.appendChild(cim);
	
	chval = ' checked="checked" ';
	if (omni_nyelv == 0 || omni_nyelv == 2 || omni_nyelv == 3) {
	belsodiv.innerHTML += '<br /><table><tr><td><input type="checkbox"'+(aukcios?chval:'')+' id="aukcios_csekk"> Mosogatás az Aukciós házban, ha lehet (5CSP->2AD)</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(autint?chval:'')+' id="autint_csekk"> Automata állat intelligencia növelés</input></td></tr>'
	+ '<tr><td><input type="checkbox"'+(ital?chval:'')+' id="ital_csekk"> Kényelmi funkciós "Prémes" ital vásárlás aznapi első belépésnél</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(targycompact?chval:'')+' id="targycompact_csekk"> Minimalizált tárgy képek</td></tr>'
	+ '<tr><td><input type="checkbox"'+(hideads?chval:'')+' id="hideads_csekk"> Fölös elemek eltávolítása (Reklámok, flash, bannerek stb.)</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(hideheader?chval:'')+' id="hideheader_csekk"> Fejléc eltávolítása</td></tr>'
	+ '<tr><td><input type="checkbox"'+(idofel?chval:'')+' id="idofel_csekk"> Rendszeridő megjelenítése a karakternév fölött is</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(szazalek?chval:'')+' id="szazalek_csekk"> ÉP/VP/TP %-os kijelzése</td></tr>'
	+ '<tr><td><input type="checkbox"'+(totp?chval:'')+' id="totp_csekk"> %-os TP kijelzés helyett szinthez szükséges TP kijelzés</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(csatastat?chval:'')+' id="csatastat_csekk">Portya összegzés a lap tetejére</td></tr>'
	+ '<tr><td><input type="checkbox"'+(tevgomb?chval:'')+' id="tevgomb_csekk"> Üzenet/Kihívás/Támadás gombosítása mások karakterlapján</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(kalandproba?chval:'')+' id="kalandproba_csekk">Kalandpróbák kinyitása a kalandokban</td></tr>'
	+ '<tr><td><input type="checkbox"'+(kalandszoveg?chval:'')+' id="kalandszoveg_csekk">Kaland szövegek eltüntetése</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(portyagomb?chval:'')+' id="portyagomb_csekk">Portyázás gomb eltüntetése</td></tr></table><p />'
	+ '<table><tr><td><input type="checkbox"'+(epikutes?chval:'')+' id="epikutes_csekk"> Automata Epikus támadás, ha van támadás gomb az epik oldalon</td></tr></table><p />';
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=6% ALIGN=center><input type="checkbox"'+(egyogy?chval:'')+' id="egyogy_csekk"></TD><TD WIDTH=30% ALIGN=center> Közben gyógyítson ' + '</TD><TD WIDTH=1% ALIGN=center><input style="width: 18px" type="text" id="eszazalek_csekk" maxlength="2" value="'+eszazalek+'"></TD><TD WIDTH=17% ALIGN=left>% életerőre'+'</TD><TD WIDTH=6% ALIGN=center><input style="width: 32px" type="text" id="eital_csekk" maxlength="4" align="right" value="'+eital+'"></TD><TD WIDTH=40% ALIGN=left> számú gyógyitalból'+'</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD ALIGN=center>Következő gombok ne színeződjenek:</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(vadaszgomb?chval:'')+' id="vadaszgomb_csekk"> Vadászat ' + '</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(szovigomb?chval:'')+' id="szovigomb_csekk"> Szövetség '+'</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(premgomb?chval:'')+' id="premgomb_csekk"> Prémium '+'</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(oskogomb?chval:'')+' id="oskogomb_csekk"> Őskő </TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD ALIGN=center>Következő állat gyakorlás gombok meg se jelenjenek:</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(gomb1?chval:'')+' id="gomb1_csekk">Minden állat' + '</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(gomb2?chval:'')+' id="gomb2_csekk">Minden nem harcoló' + '</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(gomb3?chval:'')+' id="gomb3_csekk">Minden harcoló</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD align="right">'+vilag_disp+' MNT:</TD><TD><input style="width: 375px" type="text" id="peace_csekk" value="'+peace+'"></TD></TR>';
	belsodiv.innerHTML += '<P><TABLE WIDTH=61%><TR><TD align="center">Kennelkalk-ban mennyi fiktív szintet szeretnél látni pluszban?</TD><TD align="left"><input style="width: 18px" type="text" id="extkennel_csekk" maxlength="2" value="'+extkennel+'"></TD></TR>';
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=25% ALIGN=left><input type="checkbox"'+(letpall?chval:'')+' id="letpall_csekk">LE/TP számláló NE nullázódjon!' + '</TD><TD WIDTH=25% ALIGN=left><input type="checkbox"'+(letpreset?chval:'')+' id="letpreset_csekk">LÉ/TP számláló RESET</TR>'; 
	} else if (omni_nyelv == 1) {
	belsodiv.innerHTML += '<br /><table><tr><td><input type="checkbox"'+(aukcios?chval:'')+' id="aukcios_csekk"> Umývanie riadu v Aukčnom dome, ak je možné (5AB->2ZD)</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(targycompact?chval:'')+' id="targycompact_csekk"> Minimalizované obrazy objektov</td></tr>'
	+ '<tr><td><input type="checkbox"'+(hideads?chval:'')+' id="hideads_csekk"> Odstránenie zbytočných položiek (reklamy, flash, bannery, atď)</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(hideheader?chval:'')+' id="hideheader_csekk"> Odstránenie hlavičky</td></tr>'
	+ '<tr><td><input type="checkbox"'+(idofel?chval:'')+' id="idofel_csekk"> Zobrazenie systémového času aj nad názvom charakteru</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(szazalek?chval:'')+' id="szazalek_csekk"> Percentuálne vyjadrenie HP/Mana/XP</td></tr>'
	+ '<tr><td><input type="checkbox"'+(tevgomb?chval:'')+' id="tevgomb_csekk"> Zmena Správy/Výzvy/Útoku na tlačidlo na karte inej postavy</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(csatastat?chval:'')+' id="csatastat_csekk">Sumár súboja na hlavičky strany</td></tr>'
	+ '<tr><td><input type="checkbox"'+(kalandproba?chval:'')+' id="kalandproba_csekk">Otvorenie skúšky dobrodružstiev v dobrodružstvách</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(kalandszoveg?chval:'')+' id="kalandszoveg_csekk">Schovať texty dobrodružstiev</td></tr>'
	+ '<tr><td><input type="checkbox"'+(epikutes?chval:'')+' id="epikutes_csekk"> Automatický epický útok, ak je tlačidlo na strane epik</td>'
	+ '<td style="border-left:thick double;"><input type="checkbox"'+(portyagomb?chval:'')+' id="portyagomb_csekk">Schovať tlačidlo súboja</td></tr></table><p />';
	belsodiv.innerHTML += '<table><tr><td><input type="checkbox"'+(ital?chval:'')+' id="ital_csekk"> Komfortné nakupovanie nápoja "5 PK" po prvom vstupe daný deň</td></tr>'
	+ '<tr><td><input type="checkbox"'+(totp?chval:'')+' id="totp_csekk"> Vyznačenie XP potrebné na danú úroveň, namiesto vyznačenia XP v %</td></tr>'
	+ '<tr><td><input type="checkbox"'+(autint?chval:'')+' id="autint_csekk"> Automatické navýšenie inteligencie zvierat </td></tr></table><p />';
	belsodiv.innerHTML += '<P><TABLE WIDTH=92%><TR><TD align="right">'+vilag_disp+' Dohoda o nezaútočení (NAP):</TD><TD><input style="width: 375px" type="text" id="peace_csekk" value="'+peace+'"></TD></TR>';
	belsodiv.innerHTML += '<P><TABLE WIDTH=66%><TR><TD WIDTH=6% ALIGN=center><input type="checkbox"'+(egyogy?chval:'')+' id="egyogy_csekk"></TD><TD WIDTH=24% ALIGN=center> Dolieč sa na ' + '</TD><TD WIDTH=1% ALIGN=center><input style="width: 18px" type="text" id="eszazalek_csekk" maxlength="2" value="'+eszazalek+'"></TD><TD WIDTH=43% ALIGN=left>% HP s liečivým nápojom č.'+'</TD><TD WIDTH=6% ALIGN=center><input style="width: 32px" type="text" id="eital_csekk" maxlength="4" align="right" value="'+eital+'"></TD><TD WIDTH=20% ALIGN=left /></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD ALIGN=center>Nasledovné tlačidla nech nevyfarbia:</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(vadaszgomb?chval:'')+' id="vadaszgomb_csekk"> Lov ' + '</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(szovigomb?chval:'')+' id="szovigomb_csekk"> Aliancia '+'</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(premgomb?chval:'')+' id="premgomb_csekk"> Prémiový účet '+'</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(oskogomb?chval:'')+' id="oskogomb_csekk"> Prakamene </TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD ALIGN=center>Nasledovné tlačidlá na výcvik zvierat nech nezobrazujú:</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=20% ALIGN=center><input type="checkbox"'+(gomb1?chval:'')+' id="gomb1_csekk">Každé zviera' + '</TD><TD WIDTH=30% ALIGN=center><input type="checkbox"'+(gomb2?chval:'')+' id="gomb2_csekk">Zviera, ktoré nebojuje' + '</TD><TD WIDTH=25% ALIGN=center><input type="checkbox"'+(gomb3?chval:'')+' id="gomb3_csekk">Zviera, ktoré bojuje</TD></TR>'; 
	belsodiv.innerHTML += '<P><TABLE WIDTH=54%><TR><TD align="left">&nbsp&nbsp&nbspKoľko fiktívnych úrovní by si chcel vidieť v Brlohkalk-u?</TD><TD align="left"><input style="width: 18px" type="text" id="extkennel_csekk" maxlength="2" value="'+extkennel+'"></TD></TR>';
	belsodiv.innerHTML += '<P><TABLE WIDTH=72%><TR><TD WIDTH=55% ALIGN=left><input type="checkbox"'+(letpall?chval:'')+' id="letpall_csekk">DE/XP počítadlo nech sa nevynuluje!' + '</TD><TD WIDTH=45% ALIGN=left><input type="checkbox"'+(letpreset?chval:'')+' id="letpreset_csekk">Resetovanie počítadla DE/XP</TR>'; 
	}
	belsodiv.innerHTML += '<P><TABLE WIDTH=100%><TR><TD WIDTH=25% ALIGN=center><input type="radio" name="omni_nyelv" value="0"'+(omni_nyelv == 0 ? ' checked':'')+' id="langhu_csekk"> Magyar </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="omni_nyelv" value="1"'+(omni_nyelv == 1 ? ' checked':'')+' id="langsk_csekk"> Slovenský </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="omni_nyelv" value="2"'+(omni_nyelv == 2 ? ' checked':'')+' id="langen_csekk"> English </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="omni_nyelv" value="3"'+(omni_nyelv == 3 ? ' checked':'')+' id="langru_csekk"> русский </TD></TR>'; 

	bezargomb = document.createElement('input');
	bezargomb.type = 'button';
	bezargomb.value = 'X';
	bezargomb.title = dis_3[omni_nyelv];
	bezargomb.id = 'bezaras';
	bezargomb.addEventListener('click',function(){
		omnilayer.style.display='none';
		aukcios = document.getElementById('aukcios_csekk').checked;
		autint = document.getElementById('autint_csekk').checked;
		ital = document.getElementById('ital_csekk').checked;
		vadaszgomb = document.getElementById('vadaszgomb_csekk').checked;
		szovigomb = document.getElementById('szovigomb_csekk').checked;
		premgomb = document.getElementById('premgomb_csekk').checked;
		oskogomb = document.getElementById('oskogomb_csekk').checked;
		targycompact = document.getElementById('targycompact_csekk').checked;
		hideads = document.getElementById('hideads_csekk').checked;
		hideheader = document.getElementById('hideheader_csekk').checked;
		epikutes = document.getElementById('epikutes_csekk').checked;
		egyogy = document.getElementById('egyogy_csekk').checked;
		eszazalek = parseInt(document.getElementById('eszazalek_csekk').value);
		eital = parseInt(document.getElementById('eital_csekk').value);
		idofel = document.getElementById('idofel_csekk').checked;
		szazalek = document.getElementById('szazalek_csekk').checked;
		totp = document.getElementById('totp_csekk').checked;
		tevgomb = document.getElementById('tevgomb_csekk').checked;
		csatastat = document.getElementById('csatastat_csekk').checked;
		kalandproba = document.getElementById('kalandproba_csekk').checked;
		kalandszoveg = document.getElementById('kalandszoveg_csekk').checked;
		portyagomb = document.getElementById('portyagomb_csekk').checked;
		gomb1 = document.getElementById('gomb1_csekk').checked;
		gomb2 = document.getElementById('gomb2_csekk').checked;
		gomb3 = document.getElementById('gomb3_csekk').checked;
		vx_peace = document.getElementById('peace_csekk').value;
		extkennel = parseInt(document.getElementById('extkennel_csekk').value);
		letpall = document.getElementById('letpall_csekk').checked;
		letpreset = document.getElementById('letpreset_csekk').checked;
		if (document.getElementById('langhu_csekk').checked) {
			omni_nyelv = 0;
		} else if (document.getElementById('langsk_csekk').checked) {
			omni_nyelv = 1;
		} if (document.getElementById('langen_csekk').checked) {
			omni_nyelv = 2;
		} if (document.getElementById('langru_csekk').checked) {
			omni_nyelv = 3;
		} 
		
		GM_setValue(azonosito+"_aukcios", aukcios);
		GM_setValue(azonosito+"_autint", autint);
		GM_setValue(azonosito+"_ital", ital);
		GM_setValue(azonosito+"_vadaszgomb", vadaszgomb);
		GM_setValue(azonosito+"_szovigomb", szovigomb);
		GM_setValue(azonosito+"_premgomb", premgomb);
		GM_setValue(azonosito+"_oskogomb", oskogomb);
		GM_setValue(azonosito+"_targycompact", targycompact);
		GM_setValue(azonosito+"_hideads", hideads);
		GM_setValue(azonosito+"_hideheader", hideheader);
		GM_setValue(azonosito+"_epikutes", epikutes);
		GM_setValue(azonosito+"_egyogy", egyogy);
		GM_setValue(azonosito+"_eszazalek", eszazalek);
		GM_setValue(azonosito+"_eital", eital);
		GM_setValue(azonosito+"_idofel", idofel);
		GM_setValue(azonosito+"_szazalek", szazalek);
		GM_setValue(azonosito+"_totp", totp);
		GM_setValue(azonosito+"_tevgomb", tevgomb);
		GM_setValue(azonosito+"_csatastat", csatastat);
		GM_setValue(azonosito+"_kalandproba", kalandproba);
		GM_setValue(azonosito+"_kalandszoveg", kalandszoveg);
		GM_setValue(azonosito+"_portyagomb", portyagomb);
		GM_setValue(azonosito+"_gomb1", gomb1);
		GM_setValue(azonosito+"_gomb2", gomb2);
		GM_setValue(azonosito+"_gomb3", gomb3);
		GM_setValue(vilag+"_peace", vx_peace);
		GM_setValue("extkennel", extkennel);
		GM_setValue(azonosito+"_letpall", letpall);
		GM_setValue(azonosito+"_letpreset", letpreset);	
		GM_setValue(azonosito+"_nyelv", omni_nyelv);
		GM_setValue(azonosito+"_templom_last", templom_last);
		window.location.reload();
	}, false);
	belsodiv.appendChild(bezargomb);
}

function clearClass(str){
	li = tag('li');
	for (i=0; i<li.length; i++){
		if (str.indexOf(li[i].textContent) >= 0) {
			li[i].className = '';
		}
	}
}


function rgbepsz(szazalek){
	r = szazalek>50 ? Math.round(255-2*255*(szazalek-50)/100) : 255;
	g = szazalek>50 ? 255 : Math.round(2*255*szazalek/100);
	b = 0;
	return 'rgb('+r+','+g+','+b+')';
}

function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

function separate(num){
var str = num.toString();
var str_sep = '';
for (var i=0; i<str.length; i++){
 if (str.length%3==i%3 && str_sep!='') str_sep += '.';
 str_sep += str[i];
}
return str_sep;
}

//  FUNKCIÓK VÉGE

var now = Math.floor(new Date().getTime()/1000/3600/24);
var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var hostnev = window.location.hostname;
var orszag = hostnev.substring(hostnev.lastIndexOf('.')+1 ,hostnev.length);
if (force_host_nyelv == -1) {
	if (orszag == 'hu') {
		host_nyelv = 0;
	} else if (orszag == 'sk') {
		host_nyelv = 1;
	}else if (orszag == 'eu') {
		host_nyelv = 2;
	}else if (orszag == 'ru') {
		host_nyelv = 3;
	}else if (orszag == 'fr') {
		host_nyelv = 4;
	}
} else {
	host_nyelv = force_host_nyelv;
}
var vilag = strcut('//','.',window.location.href);
var vilag_disp = vilag;
if (vilag == 'www' && orszag == 'hu') {vilag_disp = 'vilag1';}
if (vilag == 'www' && orszag == 'sk') {vilag_disp = 'svet1'; vilag = 'svet1';}
if (vilag == 'www' && orszag == 'eu') {vilag_disp = 'world1'; vilag = 'world1';}
if (vilag == 'www' && orszag == 'ru') {vilag_disp = 'mir1'; vilag = 'mir1';}
if (vilag == 'www' && orszag == 'fr') {vilag_disp = 'monde1'; vilag = 'monde1';}
var azonosito = vilag + "_" + username;
//alert("hostnev: "+hostnev+"\norszag: "+orszag+"\nhost_nyelv: "+host_nyelv+"\nvilag: "+vilag);
var aukcios = GM_getValue(azonosito+"_aukcios",false);
var autint = GM_getValue(azonosito+"_autint",false);
var ital = GM_getValue(azonosito+"_ital",false);
var vadaszgomb = GM_getValue(azonosito+"_vadaszgomb",false);
var szovigomb = GM_getValue(azonosito+"_szovigomb",false);
var premgomb = GM_getValue(azonosito+"_premgomb",false);
var oskogomb = GM_getValue(azonosito+"_oskogomb",false);
var targycompact = GM_getValue(azonosito+"_targycompact",false);
var hideads = GM_getValue(azonosito+"_hideads",false);
var hideheader = GM_getValue(azonosito+"_hideheader",false);
var epikutes = GM_getValue(azonosito+"_epikutes",false);
var egyogy = GM_getValue(azonosito+"_egyogy",false);
var eszazalek = GM_getValue(azonosito+"_eszazalek",15);
var eital = GM_getValue(azonosito+"_eital",102);
var idofel = GM_getValue(azonosito+"_idofel",false);
var szazalek = GM_getValue(azonosito+"_szazalek",false);
var totp = GM_getValue(azonosito+"_totp",false);
var tevgomb = GM_getValue(azonosito+"_tevgomb",true);
var kalandproba = GM_getValue(azonosito+"_kalandproba",false);
var kalandszoveg = GM_getValue(azonosito+"_kalandszoveg",false);
var portyagomb = GM_getValue(azonosito+"_portyagomb",false);
var gomb1 = GM_getValue(azonosito+"_gomb1",false);
var gomb2 = GM_getValue(azonosito+"_gomb2",false);
var gomb3 = GM_getValue(azonosito+"_gomb3",false);
var aukcios_last = GM_getValue(azonosito+"_aukcios_last",0);
var ital_last = GM_getValue(azonosito+"_ital_last",0);
var csatastat = GM_getValue(azonosito+"_csatastat",0);
var ver_check = GM_getValue("ver_check",0);
var peace = GM_getValue(vilag+"_peace",0);
var extkennel = GM_getValue("extkennel",3);
var letpall = GM_getValue(azonosito+"_letpall",false);
var letpreset = GM_getValue(azonosito+"_letpreset",false);
omni_nyelv = GM_getValue(azonosito+"_nyelv",-1);
if (omni_nyelv == -1) {
	omni_nyelv = host_nyelv;
}
var alvariel_last = GM_getValue(azonosito+"_alvariel_last",0);
var epuletstat_last = GM_getValue(azonosito+"_epuletstat_last",0);
var helyezes_last = GM_getValue(azonosito+"_helyezes_last",0);
var templom_last = GM_getValue(azonosito+"_templom_last",0);
var xenocsp = eval(GM_getValue(azonosito+"_xenocsp",
		'({db: 0, sebzes: 0, sebzodes: 0, LE: 0, kvizLE: 0, TP: 0, sajtolas: 0, osdragako: 0, szubplazma: 0, kaland: 0, ital: 0 })'));
var xenopp = eval(GM_getValue(azonosito+"_xenopp",
		'({db: 0, sebzes: 0, sebzodes: 0, LE: 0, kvizLE: 0, TP: 0, sajtolas: 0, osdragako: 0, szubplazma: 0, kaland: 0, ital: 0 })'));
var xenoadat = eval(GM_getValue(azonosito+"_xenoadat",
		'({db: 0, sebzes: 0, sebzodes: 0, LE: 0, kvizLE: 0, TP: 0, sajtolas: 0, osdragako: 0, szubplazma: 0, kaland: 0, ital: 0 })'));

function pad(n){return n<10 ? '0'+n : n};

var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
var today = ""+year+pad(month)+pad(day);

//Thnx to Jerikó a kóddarabért!
if (today > ver_check) {
var url = 'http://userscripts.org/scripts/source/82415';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/82415');
		alert (dis_4[omni_nyelv]);
	 }	
   });
   GM_setValue("ver_check", today);
}

if (aukcios && today > aukcios_last) {
	if (!(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')
			&& parseInt(getByClass2(document.getElementById('infobox'),'div', 'vadaszat_info')[0].textContent.match(/(\d+)/)[1]) >= 5) {
		GM_xmlhttpRequest({
			method: 'GET', 
			url: "http://"+hostnev+"/index.php?m=aukcioshaz&sub=aranydukat&tev=munka2", 
			onload: function(data){
				if (data.responseText.match(ker_55[host_nyelv])){
					GM_setValue(azonosito+"_aukcios_last", today);
				}
			}
		});
	}
} 
/* Ha valami miatt a fenti kód túl sokszor próbálkozna feleslegesen, akkor be kell építeni egy számlálót, 
   ami ha elérte a 3-at, akkor a fenti kód deaktiválódik és helyette az alábbi fut le.
if (aukcios && GM_getValue(azonosito+"_aukcios_szamlalo",0) >= 3
						&& (strpos('aukcioshaz',window.location.href) || strpos('napi_rutinok',window.location.href))
						&& document.body.innerHTML.match('tev=munka2') {
		GM_xmlhttpRequest({
			method: 'GET', 
			url: "http://"+hostnev+"/index.php?m=aukcioshaz&sub=aranydukat&tev=munka2", 
			onload: function(data){
				if (data.responseText.match(ker_55[host_nyelv])){
					GM_setValue(azonosito+"_aukcios_last", today);
		      GM_deleteValue(azonosito+'_aukcios_szamlalo');
				}
			}
		});
}
*/
if (ital && today > ital_last) {
	if (!(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')) {
		GM_xmlhttpRequest({
			method: 'GET', 
			url: "http://"+hostnev+"/index.php?m=lelekkufar&tev=italvasarlas", 
			onload: function(data){
				if (data.responseText.match(ker_56[host_nyelv])){
					GM_setValue(azonosito+"_ital_last", today);
				}
			}
		});
	}
}
var gomblista = [];
if (vadaszgomb){gomblista.push(ker_22[host_nyelv]);}
if (szovigomb){gomblista.push(ker_23[host_nyelv]);}
if (premgomb){gomblista.push(ker_24[host_nyelv]);}
if (oskogomb){gomblista.push(ker_25[host_nyelv]);}
clearClass(gomblista);

if (portyagomb){
	menugombok = document.getElementById('fomenu').getElementsByTagName('li');
	for (i=0; i<menugombok.length; i++){
			elem = menugombok[i];
			if (elem.textContent == ker_1[host_nyelv]){
				elem.innerHTML="";
			}
	}
}

	var targylistak = getByClass('div','targylista_tipus');
	for (i=0; i<targylistak.length; i++){
		if (targylistak[i].innerHTML.indexOf(ker_2[host_nyelv])>0){
			var jogar = 0;
			if (targylistak[i].innerHTML.indexOf(ker_3[host_nyelv])>0){
				if (targylistak[i].innerHTML.indexOf(ker_4[host_nyelv])>0){jogar=20;}
				if (targylistak[i].innerHTML.indexOf(ker_5[host_nyelv])>0){jogar=15;}
				if (targylistak[i].innerHTML.indexOf(ker_6[host_nyelv])>0){jogar=10;}
				if (targylistak[i].innerHTML.indexOf(ker_7[host_nyelv])>0){jogar=5;}
			}
			GM_setValue(azonosito+"_jogar", jogar);
		}
	}

if (targycompact && !strpos('relikviak',window.location.href)){
	style = document.createElement('style');
	style.innerHTML = '#targy_popup .targy_kep {height: 50px !important} #targy_popup .targy_kep img {max-height: 50px !important; width: inherit !important;} .esszencia_talal {text-decoration: blink; color: #FF7733} .harcolo_leny img {width: 30% !important} .harcolo_leny {font-size: 10px} .harcolo_leny .felszereles_kep {width: 10% !important; height: 10% !important} .parameterek {width: 220px !important; font-size: 10px !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out {display: none !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out{display: none !important} .nevadas .gomblink {clear: both;}';	
	if(!strpos('targylista',window.location.href) && !strpos('lelekkufar',window.location.href)){
		style.innerHTML += '.relikvia {width: 72px !important;} .relikvia .targy_kep img {width: 72px !important;} .karakterlap .targylista .egytargy {height: 92px !important} .viselheto .targy_kep img {width: 45% !important;} .viselheto img.fk_kep {width: 15% !important;} .targylista .egytargy .targy_kep img {width: 45% !important;} .targylista .egytargy .targy_kep img.fk_kep {width: 15% !important;}';	
	}
	if(strpos('targylista',window.location.href)){
		style.innerHTML += '.targy_kep img {width: 67% !important;} img.fk_kep {width: 30% !important; float: right;}';	
	}
	if(strpos('lelekkufar',window.location.href)){
		style.innerHTML += '.targy_kep img {width: 25% !important;} img.fk_kep {width: 10% !important;}';	
	}
	if(strpos('allatok',window.location.href)){
		style.innerHTML = '.text {display: none !important} .esszencia_talal {text-decoration: blink; color: #FF7733} .targy_kep {position: relative !important} .targy_kep img {width: 25% !important;} #targy_popup .targy_kep img{width: 50% !important;} .harcolo_leny img {width: 30% !important} .harcolo_leny {font-size: 10px} .harcolo_leny .felszereles_kep {width: 10% !important; height: 10% !important} img.fk_kep {width: 10% !important; position: absolute !important; bottom: 5px !important; right: 72px !important;} .fk_torlese {position: absolute !important; width: 50px !important; height: 40px !important; background: none; display: block !important; right: 42px; bottom: 5px; font-size: 0px } .fk_torlese a {display: block; height: 50px; background: none; bottom: 0px; right: 25px; position: absolute; width: 50px; font-size: 0px}  .parameterek {width: 220px !important; font-size: 10px !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out {display: none !important} .egytargy div:not([class]), .targyak_block .h3_out, .targylista_block .h3_out{display: none !important} .nevadas .gomblink {clear: both;}';
	}
	if (strpos('index.php?m=allatok', window.location.href)){
	
		kepek = tag('img');
		for(i=0; i<kepek.length; i++){
			if (strpos('creature',kepek[i].src)) {
				kepek[i].width = 85;
				kepek[i].width = 68;
			}
		}
		/*szaki_kinyit = getByClass('a', 'gomblink2');
		for(i=0; i<szaki_kinyit.length; i++){
			if (szaki_kinyit[i].textContent == "Szakértelmek") {
				szaki_kinyit[i].setAttribute('style','display: none');
			}
		}*/
		var felkialtojelek = getByClass('td', 'center');
		for (i=0; i<felkialtojelek.length; i++) {
			felkialtojelek[i].innerHTML = felkialtojelek[i].innerHTML.replace(/<a href.*help\.gif.*\/a>/,"");
		}
		felszkepek = getByClass('img', 'felszereles_kep');
		for (i=0; i<felszkepek.length; i++) {
			felszkepek[i].parentNode.parentNode.setAttribute('style','display: none');
			sib = felszkepek[i].parentNode.parentNode.previousSibling;
			if (!strpos(ker_8[host_nyelv],sib.textContent)) sib = sib.previousSibling;   
			if (!strpos(ker_8[host_nyelv],sib.textContent)) sib = sib.previousSibling;   
			elem = sib.getElementsByTagName('td')[1];
			splitpos = sib.getElementsByTagName('td')[1].innerHTML.indexOf('<br>');
			elem.width = 200;
			if(strpos(ker_9[host_nyelv],elem.innerHTML)){elem.innerHTML = elem.innerHTML.substring(0,splitpos) + '<br style="width: 200px; clear: both" /><img src="'+felszkepek[i].src + '" style="width: 50px; height: 50px; float: right; margin-top: 5px;"/>'+ elem.innerHTML.substring(splitpos+4);}
			else{elem.innerHTML = elem.innerHTML.substring(0,splitpos) + '<br style="width: 200px; clear: both" /><img src="'+felszkepek[i].src + '" style="width: 50px; height: 50px; float: right; margin-top: 5px;"/>'+ elem.innerHTML.substring(splitpos+4)+((sib.innerHTML.indexOf(ker_9[host_nyelv])==-1) && (sib.innerHTML.indexOf(ker_10[host_nyelv])==-1)?'<a class="gomblink" style="width: 150px;"><span>&nbsp</span></a>':'');}
			}
		forms = document.getElementsByTagName('form');
		for (i=0; i<forms.length; i++){
			if (!strpos(ker_11[host_nyelv],forms[i].textContent)) continue;
			sib = forms[i].parentNode.parentNode.previousSibling;
			if (!strpos(ker_8[host_nyelv],sib.textContent)) sib = sib.previousSibling;
			if (!strpos(ker_8[host_nyelv],sib.textContent)) sib = sib.previousSibling;
			forms[i].setAttribute('style','width: 170px; margin-left: 3px;');
			forms[i].innerHTML = forms[i].innerHTML.replace(ker_13[host_nyelv],'');
			forms[i].innerHTML = forms[i].innerHTML.replace('<br>','');
			sib.getElementsByTagName('td')[2].appendChild(forms[i]);
		}

	}
	
	if(strpos('targylista',window.location.href)){
		targylistak = getByClass('div','targylista_tipus');
		var kategoria_num = 0;
		var kat_nev = [];
		function listen_click () {
			var nr = parseInt(this.childNodes[0].getAttribute('nr'));
			kategoria = getByClass2(this.parentNode,'div', 'h5_out')[0];
			if(kategoria) {
				kategoria.childNodes[0].innerHTML = kat_nev[nr];
				kategoria.innerHTML = kategoria.innerHTML.replace("h5", "h4");
				kategoria.className = "h4_out";
				divek = this.parentNode.getElementsByTagName('div');
				for (i=1; i<divek.length; i++){
						divek[i].style.display = "block";
				}
			}
		}
		for (i=0; i<targylistak.length; i++){
			divek = targylistak[i].getElementsByTagName('div');
			kategoria = getByClass2(targylistak[i],'div', 'h4_out')[0];
			if (divek.length>3 && ker_48.indexOf(kategoria.textContent) >= 0){ 
				kat_nev[kategoria_num] = kategoria.childNodes[0].innerHTML;
				kategoria.childNodes[0].innerHTML = kategoria.childNodes[0].innerHTML.substring(0,10)+' ('+dis_16[omni_nyelv]+')';
				kategoria.innerHTML = kategoria.innerHTML.replace("h4", "h5");
				kategoria.className = "h5_out";
				kategoria.childNodes[0].setAttribute('nr',kategoria_num);

				kategoria.addEventListener('click',listen_click,true);
				
				for (j=1; j<divek.length; j++){
					divek[j].style.display = "none";
				}				
				kategoria_num++;
			}
		}
	}
	document.getElementsByTagName('body')[0].appendChild(style);
}

if (autint && strpos('index.php?m=allatok', window.location.href)){
	szakik = document.getElementsByTagName('a');
	for(i=0; i<szakik.length; i++){
		if (szakik[i].href.match('ossz=1') && szakik[i].href.match('szakertelem=7')){
			window.location.href = szakik[i].href;
			i=szakik.length;
		}
	}
}
		
if (hideads){
	style = document.createElement('style');
	style.innerHTML = '#linklista, .fb_like, .hr, .alsomenu, .banner, .bannerek, .fust, .google_adsense, #harmonet, #harmonet_linksor, #hirblock, #fo_flash, .also_banner {display: none !important} .battle .hr {display: block !important}';
	document.getElementsByTagName('body')[0].appendChild(style);
	if (!strpos('alkimista_labor',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.help {display: none !important}'; 
	document.getElementsByTagName('body')[0].appendChild(style);
	}
}

if (hideheader){
	style = document.createElement('style');
	style.innerHTML = '#header {height: 0px !important; background: none !important;} .fust, .banner, #harmonet_linksor, #header h1 {display: none !important}';
	document.getElementsByTagName('body')[0].appendChild(style);
}

if (kalandproba){
	style = document.createElement('style');
	style.innerHTML = '.kaland_proba {display: block !important}';
	document.getElementsByTagName('body')[0].appendChild(style);
}

if (idofel){
	systime = document.createElement('span');
	systime.id = 'systime';
	id('welcome').insertBefore(systime,id('welcome').firstChild);
	id('welcome').innerHTML = id('welcome').innerHTML.replace(ker_14[host_nyelv],'');
	setInterval(systimetick, 500);
}

if ((document.title.indexOf(username)>-1) && !strpos(ker_15[host_nyelv],id('header').textContent)
		 && !strpos('beallitasok',window.location.href)) {
	maxok = getByClass('span','csik_szoveg');
	if (maxok.length > 0) {
		maxe = maxok[0].textContent.match(/\/ [\.\d]+/g);
		maxep = parseInt(maxe[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		maxv = maxok[1].textContent.match(/\/ [\.\d]+/g);
		maxvp = parseInt(maxv[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		maxt = maxok[2].textContent.match(/\/ [\.\d]+/g);
		maxtp = parseInt(maxt[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
		GM_setValue(azonosito+"_maxvp", maxvp);
		GM_setValue(azonosito+"_maxtp", maxtp);
	}
}

var maxep = GM_getValue(azonosito+"_maxep",0);
karilap = id('welcome').innerHTML;
var matches = document.getElementById('karakter_ep').innerHTML;
ep = parseInt(matches.replace(".","").replace(".","").replace(".",""));
epsz = Math.round(ep/maxep*10000)/100;

if (szazalek){
	var maxvp = GM_getValue(azonosito+"_maxvp",0);
	var maxtp = GM_getValue(azonosito+"_maxtp",0);
	var matches = document.getElementById('karakter_vp').innerHTML;
	vp = parseInt(matches.replace(".","").replace(".","").replace(".",""));
	vpsz = Math.round(vp/maxvp*10000)/100;
	var matches = document.getElementById('karakter_tp').innerHTML;
	tp = parseInt(matches.replace(".","").replace(".","").replace(".",""));	
	tpsz = Math.round(tp/maxtp*10000)/100;
	megtp = separate(maxtp-tp);
	var matches = document.getElementById('karakter_le').innerHTML;
	le = parseInt(matches.replace(".","").replace(".","").replace(".",""));
	le += '';
	var lastle = parseInt(GM_getValue(azonosito+"_lastle",le));
	GM_setValue(azonosito+"_lastle",le);
	var lasttp = parseInt(GM_getValue(azonosito+"_lasttp",tp));
	GM_setValue(azonosito+"_lasttp",tp);
	var tpdif = parseInt(GM_getValue(azonosito+"_tpdif",0));
	var ledif = parseInt(GM_getValue(azonosito+"_ledif",0));
	if (lasttp<tp && lastle<le){
		ledif=parseInt(ledif)+parseInt(le)-parseInt(lastle);
		ledif +='';
		GM_setValue(azonosito+"_ledif",ledif);
		tpdif=parseInt(tpdif)+parseInt(tp)-parseInt(lasttp);
		tpdif +='';
		GM_setValue(azonosito+"_tpdif",tpdif);
	}
	else if (lastle<le){
		ledif=parseInt(ledif)+parseInt(le)-parseInt(lastle);
		ledif +='';
		GM_setValue(azonosito+"_ledif",ledif);
	}
	if ((lasttp>tp && !letpall) || ledif<0 || letpreset){
		GM_setValue(azonosito+"_ledif",0);
		ledif=0;
		GM_setValue(azonosito+"_tpdif",0);
		tpdif=0;
		GM_setValue(azonosito+"_letpreset", false);
		window.location.reload();
	}
	LETP = Math.round(parseInt(ledif)/parseInt(tpdif)*100)/100;
	id('welcome').innerHTML = id('welcome').innerHTML.replace(ker_16[host_nyelv]+'</span> / ',ker_16[host_nyelv]+'</span><br>');
	getByClass('span','ep')[0].innerHTML = getByClass('span','ep')[0].innerHTML.replace(ker_16[host_nyelv],ker_16[host_nyelv]+' <span style="color: '+rgbepsz(epsz)+'">('+epsz+'%)</span>');
	getByClass('span','vp')[0].innerHTML = getByClass('span','vp')[0].innerHTML.replace(ker_17[host_nyelv],ker_17[host_nyelv]+' <span style="color: '+rgbepsz(vpsz)+'">('+vpsz+'%)');
	if(!totp){id('welcome').innerHTML = id('welcome').innerHTML.replace(ker_18[host_nyelv]+'</span><div class="linke',ker_18[host_nyelv]+' <span style="color: '+rgbepsz(100-tpsz)+'">('+tpsz+'%)</span><br><span style="color: darkgrey">'+LETP+' '+ker_19[host_nyelv]+'</span><div class="linke');}
	if(totp){id('welcome').innerHTML = id('welcome').innerHTML.replace(ker_18[host_nyelv]+'</span><div class="linke',ker_18[host_nyelv]+' <span style="color: '+rgbepsz(100-tpsz)+'">('+megtp+')</span><br><span style="color: darkgrey">'+LETP+' '+ker_19[host_nyelv]+'</span><div class="linke');}
}

if (csatastat && getByClass('div','battle').length>0){
	p = document.createElement('p');
	var battle0 = getByClass('div','battle')[0];
	matches = battle0.textContent.match(new RegExp(ker_31[host_nyelv*2]));
	if (matches) {
		p.innerHTML += (ker_31[host_nyelv*2+1]).replace('$',matches[1])+'<br />';
	}
	matches = battle0.textContent.match(new RegExp(ker_32[host_nyelv*2]));
	if (matches) {
		p.innerHTML += (ker_32[host_nyelv*2+1]).replace('$',matches[1])+'<br />';
	}
	matches = battle0.textContent.match(new RegExp(ker_33[host_nyelv*2]));
	if (matches) {
		p.innerHTML += (ker_33[host_nyelv*2+1])+'<br />';
	}
	matches = battle0.textContent.match(new RegExp(ker_34[host_nyelv*2]));
	if (matches) {
		p.innerHTML += (ker_34[host_nyelv*2+1])+'<br />';
	}
	matches = battle0.textContent.match(new RegExp(ker_54[host_nyelv]));
	if (matches) {
		p.innerHTML += matches[1]+'<br />';
	}
	if (getByClass2(battle0,'div','result_win').length>0){
		p.className = 'result_win';
		p.innerHTML += getByClass2(battle0,'div','result_win')[0].textContent.replace(ker_35[host_nyelv*2],ker_35[host_nyelv*2+1]) + '<br />';
	} 
	else {
		p.className = 'result_loss';
		p.innerHTML += getByClass2(battle0,'div','result_loss')[0].textContent.replace(ker_36[host_nyelv*2],ker_36[host_nyelv*2+1]) + '<br />';
	}
	asebzes = 0;
	asebzesek = battle0.textContent.match(new RegExp(ker_37[host_nyelv], 'g'));
	if(asebzesek) {
		asebzesek = asebzesek.join().match(/ (\d+) /g);
		for (i=0; i<asebzesek.length; i++) {
			asebzes += parseInt(asebzesek[i]);
		}
	}
	asebzesek = battle0.textContent.match(new RegExp(ker_38[host_nyelv], 'g'));
	if(asebzesek) {
		asebzesek = asebzesek.join().match(/ (\d+) /g);
		for (i=0; i<asebzesek.length; i++) {
			asebzes += parseInt(asebzesek[i]);
		}
	}
	asebzodes = 0;
	asebzodesek = battle0.textContent.match(new RegExp(ker_39[host_nyelv], 'g'));
	if(asebzodesek) {
		asebzodesek = asebzodesek.join().match(/ (\d+) /g);
		for (i=0; i<asebzodesek.length; i++) {
			asebzodes += parseInt(asebzodesek[i]);
		}
	}
	asebzodesek = battle0.textContent.match(new RegExp(ker_40[host_nyelv], 'g'));
	if(asebzodesek) {
		asebzodesek = asebzodesek.join().match(/ (\d+) /g);
		for (i=0; i<asebzodesek.length; i++) {
			asebzodes += parseInt(asebzodesek[i]);
		}
	}
	
	if(!strpos('baratsagos',window.location.href)){
	p.innerHTML += dis_5[omni_nyelv]+' : <span style="color: blue">' + asebzes + ' <span style="color: white">'+dis_6[omni_nyelv]+' : <span style="color: yellow">' + asebzodes + '<br />';
	}
	
	sajtle = '';
	if (getByClass2(battle0,'span','kaland').length>0){
		if (getByClass2(battle0,'span','le').length>0) {
			if (getByClass2(battle0,'span','kaland').length>1){
				sajtle = '<BR>' + getByClass2(battle0,'span','kaland')[1].textContent + ' ' + getByClass2(battle0,'span','le')[0].textContent + ' ' + dis_22[omni_nyelv];
			} else {
				sajtle = ' ' + getByClass2(battle0,'span','le')[0].textContent + ' ' + dis_22[omni_nyelv];
			}
		}
//		sajtle += getByClass2(battle0,'span','le').length>0 ? ' ' + getByClass2(battle0,'span','le')[0].textContent : '';
		p.innerHTML += '<span style="color: yellow">' + getByClass2(battle0,'span','kaland')[0].textContent + sajtle + '<br />';
	}

	if (getByClass2(battle0,'div','esszencia_talal').length>0){
		p.innerHTML += '<span style="color: yellow">' + getByClass2(battle0,'div','esszencia_talal')[0].textContent + '<br />';
	}

	if (getByClass2(battle0,'div','message_center').length>0 && !strpos('epikus',window.location.href)){
		p.innerHTML += '<span style="color: orange">' + getByClass2(battle0,'div','message_center')[0].textContent.replace(ker_41[host_nyelv],'') + '<br />';
	}
	
	if (getByClass2(battle0,'div','sebzeskompenzacio').length>0){
		p.innerHTML += '<font style="color: green">' + getByClass2(battle0,'div','sebzeskompenzacio')[0].innerHTML + '<br />';
	}

	if (getByClass2(battle0,'span','osdragako').length>0){
		p.innerHTML += '<span style="color: #00FF55">' + getByClass2(battle0,'span','osdragako')[0].textContent + '<br />';
	}
	matches = getByClass2(battle0,'div','xeno_csataveg');
	if (matches.length > 0 && matches[0].innerHTML.match(ker_53[host_nyelv])){
		p.innerHTML += ker_53[host_nyelv] + '<br />';
	}

	if (getByClass2(battle0,'span','szubplazma').length>0){
		p.innerHTML += '<span style="color: #00FF55">' + getByClass2(battle0,'span','szubplazma')[0].textContent + '<br />';
	}
	if (getByClass2(battle0,'span','sisakszilank').length>0){
		p.innerHTML += '<span style="color: orange">' + getByClass2(battle0,'span','sisakszilank')[0].textContent + '<br />';
	}
	
	battle_head = getByClass('div','battle')[0];
	battle_head.insertBefore(p, battle_head.childNodes[0]);
}

	if (strpos('portyazas',window.location.href)) {
    var charData = document.evaluate('//div[@class="portyazas"]/div[@class="table_650"]/table[@class="csatalista"]/tbody/tr/td/a/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<charData.snapshotLength; i++) if (charData.snapshotItem(i).innerHTML===ker_26[host_nyelv]) {
      var link = charData.snapshotItem(i).parentNode.href;
      link = link.match(/\&ellenfel=(\d+)$/);
      if (vilag=="www"){
				for (j in v1_scarabeusz){
					if (link[1]==v1_scarabeusz[j]) charData.snapshotItem(i).innerHTML='<font style="color: yellow">Scara!!!</font>';
				}
				for (j in v1_zan){
					if (link[1]==v1_zan[j]) charData.snapshotItem(i).innerHTML='<font style="color: orange">Scara?</font>';
				}
		  }
		  if (vilag=="vilag2"){
				for (j in v2_scarabeusz){
					if (link[1]==v2_scarabeusz[j]) charData.snapshotItem(i).innerHTML='<font style="color: yellow">Scara!!!</font>';
				}
				for (j in v2_zan){
					if (link[1]==v2_zan[j]) charData.snapshotItem(i).innerHTML='<font style="color: orange">Scara?</font>';
				}
		  }
		  if (vilag=="vilag3"){
				for (j in v3_scarabeusz){
					if (link[1]==v3_scarabeusz[j]) charData.snapshotItem(i).innerHTML='<font style="color: yellow">Scara!!!</font>';
				}
				for (j in v3_zan){
					if (link[1]==v3_zan[j]) charData.snapshotItem(i).innerHTML='<font style="color: orange">Scara?</font>';
				}
		  }
		  peace_list = peace ? peace.split(','):[];
			for (j in peace_list){
				if (link[1]==peace_list[j]) charData.snapshotItem(i).innerHTML='<font style="color: red">'+dis_7[omni_nyelv]+'</font>';
			}
		}
	}
 
if (strpos('epuletek',window.location.href)) {
	epuletek = getByClass('div','epulet_leiras');
	epuletkepek = getByClass('div','epulet_kep');
	epitheto = getByClass('div','allapot');
	egyepulet = getByClass('div','egyepulet');
	if (epitheto.length>0){
		for (i=0; i<epuletek.length; i++){
			epuletek[i].innerHTML = epuletek[i].innerHTML.substring(epuletek[i].innerHTML.indexOf('<div class'));
		}
	} else {
		for (i=0; i<epuletek.length; i++){
			epuletek[i].innerHTML = ' ';
		}
		for (i=0; i<epuletkepek.length; i++){
			epuletkepek[i].innerHTML = ' ';
		}
		for (i=0; i<egyepulet.length; i++){
			egyepulet[i].className = ' ';
		}
		
	}
}

if (kalandszoveg && strpos('kalandok&',window.location.href)){
probak = getByClass('div','text');
	for (i=0; i<probak.length; i++){
		probak[i].innerHTML = '<hr style="color: grey">';
	}
}

if (strpos('allatok',window.location.href)){
	gyakform = document.getElementById('gyakform');
	if (gyakform) {
		gombok = gyakform.getElementsByTagName('a');
		if(gombok.length>0){
		if (gomb1){gombok[0].style.display = 'none';}
		if (gomb2){gombok[1].style.display = 'none';}
		if (gomb3){gombok[2].style.display = 'none';}
		}
	}
}

if (strpos('szakertelmek',window.location.href)) {
intkedvenc = eval(document.evaluate("//tr[contains(@onmouseover,\"intelligens\")]/td[last()-1]", document, null, XPathResult.STRING_TYPE, null).stringValue);
/*intkedvenc = 0;
matches = document.body.innerHTML.match(new RegExp ('<tr class="link_sor" onmouseover="szakertelem_szoveg\\('+"'<strong>"+ker_27[host_nyelv]+'.*\n.*<td class="center">\(\\d+\)<span class="turbo">\\+\(\\d+\)<\\/span><\\/td>'));
if (matches) {
	intkedvenc = parseInt(matches[1]) + parseInt(matches[2]);
}
matches = document.body.innerHTML.match(new RegExp ('<tr class="link_sor" onmouseover="szakertelem_szoveg\\('+"'<strong>"+ker_27[host_nyelv]+'.*\n.*<td class="center">\(\\d+\)<\\/td>'));
if (matches) {
	intkedvenc = parseInt(matches[1]);
}*/
GM_setValue(azonosito+"_intkedvenc", intkedvenc);
}

if (strpos('epuletek',window.location.href)) {
	epuletlist = document.getElementsByTagName('h3');
	epuletreg = new RegExp(ker_42[host_nyelv]);
	for (var i=0; i<epuletlist.length; i++){
		if (epuletlist[i].textContent.match(epuletreg) != null){
			kennel=parseInt(epuletlist[i].textContent.match(epuletreg)[1]);
			GM_setValue(azonosito+"_kennel", kennel);
		}
	}
}

//Thnx to Jerikó a kóddarabért!

function TPfromLVL(level) {
  tp=0;
  if (level<6) {tp=level*100;}
  else {tp=500;}  
  if (level>=20) {tp=level*50-450;}
  if (level==0) {tp=99999;}
  return tp;
}

var pic_base = '';
if (document.head) {
	pic_base = document.head.getElementsByTagName('base')[0].getAttribute('href');
} else {
	pic_base = document.getElementsByTagName("head")[0].getElementsByTagName('base')[0].getAttribute('href');
}
//if (document.location.href.substr(-9) == 'm=allatok') {
if (strpos('m=allatok',window.location.href) && !strpos('allatok_felszereles',window.location.href)) {
	fomenu = document.getElementById('fomenu');
	notepad_block = document.createElement('li');
	notepad = document.createElement('div');
	style = document.createElement('style');
	style.innerHTML = '.kennelkalk {display:block; font-weight:bold; width:154px; height:17px; background:url('+pic_base+'pic/design_uj/menu_back_new.png) no-repeat; padding-top:4px; text-align:center; color:#E9C347; font-size:11px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	notepad.innerHTML = '<div class="kennelkalk">'+dis_15[omni_nyelv]+'</div>';
	notepad_block.appendChild(notepad);
	fomenu.insertBefore(notepad_block, fomenu.firstChild);
	notepad.addEventListener('click',
		function kennelkalk(){
			var animdata = new Array(); var animno = 0;
			var animals = document.evaluate('//div[@class="allatok"]/table/tbody/tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			ker43_reg = new RegExp(ker_43[host_nyelv]);
			ker44_reg = new RegExp(ker_44[host_nyelv]);
			ker45_reg = new RegExp(ker_45[host_nyelv]);
			ker46_reg = new RegExp(ker_46[host_nyelv]);
			ker47_reg = new RegExp(ker_47[host_nyelv]);
			for (var animrow=0; animrow<animals.snapshotLength; animrow++) {
			temp = animals.snapshotItem(animrow).textContent;
			if (i = temp.match(ker43_reg)) { animdata[++animno] = Array(i[1], 0, 0, 0, 0); }
			if (i = temp.match(ker44_reg)) animdata[animno][1] = parseInt(i[1].replace('.',''));
			if (i = temp.match(ker45_reg)) animdata[animno][2] = parseInt(i[1]);
			if (i = temp.match(ker46_reg)) animdata[animno][3] = parseInt(i[1]);
			if (i = temp.match(ker47_reg)) animdata[animno][4] = 1;
			}
			kennel = GM_getValue(azonosito+"_kennel",24);
			if (kennel>24) {kennel=24;}
			intkedv = GM_getValue(azonosito+"_intkedvenc",0);
			jogar = GM_getValue(azonosito+"_jogar",0);
			style = document.createElement('style');
			var width = 0;
			fontElem = "";
			fondHead = "";
			szellosseg = 1;
			width = 60;
			height = 14;
			if (document.documentElement.clientWidth < 1100) {
				width = 60;
				height = 14;
				fontElem = "font-size: 11px; ";
				fondHead = " font-size: 10px;";
			} else if (document.documentElement.clientWidth >= 1100 && document.documentElement.clientWidth < 1140 ) {
				width = 60;
				height = 14;
				szellosseg = 1;
			} else if (document.documentElement.clientWidth >= 1140 && document.documentElement.clientWidth < 1220 ) {
				width = 60;
				height = 14;
				szellosseg = 1.05;
			} else if (document.documentElement.clientWidth >= 1220 ) {
				width = 70;
				height = 16;
				szellosseg = 1.12;
			}
			width = 65+width*animno;
			height = 48+(kennel+extkennel)*height;
			style.innerHTML = '#kennellayer {display: block; '+fontElem+'; opacity: .95; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9; text-align: center; overflow-x: auto;} #kennellayer div {background-color: #101; text-align: left; padding: 20px; border: double gray 4px; margin-left: auto; margin-right: auto; width: 30%; position: relative; top: 5%;} #kennellayer h1 {margin: 25px} #kennellayer label {width: 100px; display: block; float: left; line-height: 20px;} #kennellayer input {float: left; width: 30px; margin: 0px 0px;} #kennellayer br {clear: both} #kennellayer #bezaras {cursor: pointer; position: absolute; top: 2px; right: 0; width: 19px; height: 19px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer} .mytable, .mytable td, .mytable th {border-collapse: collapse; border-width: 1px; border-style: solid; border-color: gray; margin: 0px; padding: 0px;}';
			kennelstyle = document.getElementsByTagName('body')[0].appendChild(style);
			kennellayer = document.createElement('div');
			kennellayer.id = 'kennellayer';
			kenneldiv = document.createElement('div');
			document.getElementsByTagName('body')[0].appendChild(kennellayer);
			kennellayer.appendChild(kenneldiv);
			
			fejlec = '<table class="mytable" id="kenneltable" WIDTH=100%><thead><TR style="color:yellowgreen;'+fondHead+'" align="center"><TH>'+dis_8[omni_nyelv]+'</TH>';
			for (i=1; i<=animno; i++) {fejlec+='<TH>&nbsp</TH><TH>'+dis_9[omni_nyelv]+'</TH>';}
			fejlec+='<TH>&nbsp</TH><TH>'+dis_8[omni_nyelv]+'</TH></TR></thead>';
			
			var tablaalap='<TR align="center" style="color:yellow"><TD>&nbsp</TD>';
			for (i=1;i<=animno;i++) {tablaalap+='<TD>&nbsp</TD><TD><B>'+animdata[i][0]+'</B>/'+animdata[i][1]+'</TD>';}
			tablaalap+='<TD>&nbsp</TD><TD>&nbsp</TD></TR>';
			
			var tabla='';
			var exttabla='';
			
			if (kennel){
				for (j=0; j<kennel; j++) {
					tabla+='<TR align="center"><TD style="color:lightgreen">'+(j+1)*2+'</TD>';
					for (i=1; i<=animno; i++) {
						TPgain = ((10+1*animdata[i][3])*(1+0.03*intkedv+0.01*animdata[i][2]+jogar/100)*(1+(kennel-1)/100));
						animdata[i][1] = animdata[i][1]+TPgain;
						if (animdata[i][0]==0) { animdata[i][1]=0; TPgain=0; }
						if (animdata[i][1]>=TPfromLVL(animdata[i][0])) { animdata[i][1] -= TPfromLVL(animdata[i][0]); animdata[i][0]++; tabla+='<TD>&nbsp</TD><TD style="color:orange"><B>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</B></TD>';}
						else if (animdata[i][4]==1) {tabla+='<TD>&nbsp</TD><TD style="color:white">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
						else {tabla+='<TD>&nbsp</TD><TD>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
					}
					tabla+='<TD>&nbsp</TD><TD style="color:lightgreen">'+(j+1)*2+'</TD></TR>';
				}
			}
			if (kennel && extkennel>=1){
				for (j=kennel; j<(kennel+extkennel); j++) {
					exttabla+='<TR align="center"><TD style="color:IndianRed">'+(j+1)*2+'</TD>';
					for (i=1; i<=animno; i++) {
						TPgain = ((10+1*animdata[i][3])*(1+0.03*intkedv+0.01*animdata[i][2])*(1+(kennel-1)/100));
						animdata[i][1] = animdata[i][1]+TPgain;
						if (animdata[i][0]==0) { animdata[i][1]=0; TPgain=0; }
						if (animdata[i][1]>=TPfromLVL(animdata[i][0])) { animdata[i][1] -= TPfromLVL(animdata[i][0]); animdata[i][0]++; exttabla+='<TD>&nbsp</TD><TD style="color:orange"><B>'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</B></TD>';}
						else if (animdata[i][4]==1) {exttabla+='<TD>&nbsp</TD><TD style="color:AntiqueWhite">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
						else {exttabla+='<TD>&nbsp</TD><TD style="color:PeachPuff">'+animdata[i][0]+'/'+parseInt(animdata[i][1])+'</TD>';}
					}
					exttabla+='<TD>&nbsp</TD><TD style="color:IndianRed">'+(j+1)*2+'</TD></TR>';
				}
			}
			
			lezaras = '</table>';
			kenneldiv.innerHTML = fejlec + tablaalap + tabla + exttabla + lezaras;
			kennelbezar = document.createElement('input');
			kennelbezar.type = 'button';
			kennelbezar.value = 'X';
			kennelbezar.title = dis_10[omni_nyelv];
			kennelbezar.id = 'bezaras';
			kennelbezar.addEventListener('click',function(){
				document.getElementsByTagName('body')[0].removeChild(kennellayer);
				document.getElementsByTagName('body')[0].removeChild(kennelstyle);
				}
			, false);
			kenneldiv.appendChild(kennelbezar);
			newheight = (document.getElementById("kenneltable").offsetWidth+40)*szellosseg;
			kennelstyle.innerHTML = kennelstyle.innerHTML.replace('width: 30%', 'width: '+newheight+'px');
		}
	, true);
}

if (epikutes){

tartalom = document.getElementById('content_r3')
page = tartalom.innerHTML;

function epiklink(){
	if (strpos('epikus_csata',window.location.href)) {
 		window.location.href = "http://"+hostnev+"/index.php?m=szovetseg&sub=epikus_csata&tev=tamadas";
 	}
}
	if (egyogy){
		var epikoldalrol = GM_getValue(azonosito+"_epikoldalrol",false);
	
		function eplink(){
			GM_setValue(azonosito+"_epikoldalrol", true);
			window.location.href = "http://"+hostnev+"/index.php?m=karakterlap&sub=targylista&tev=visel&targy="+eital;
		}

		function epikoldal(){
			window.location.href = "http://"+hostnev+"/index.php?m=szovetseg&sub=epikus_csata";
		}

		if(strpos('karakterlap&sub=targylista',window.location.href) && epikoldalrol){
			GM_setValue(azonosito+"_epikoldalrol", false);
			if (page.match(ker_28[host_nyelv])){
				setTimeout(epikoldal, 2000+Math.round(Math.random()*5000));
			}
			else if (page.match(ker_29[host_nyelv])){
				GM_setValue(azonosito+"_epikutes", false);
				alert(dis_1[omni_nyelv]);
				window.location.reload();
			}
		}

		if(strpos('epikus_csata',window.location.href)){
			if(epsz<eszazalek && !page.match(ker_30[host_nyelv])){
				setTimeout(eplink, 2000+Math.round(Math.random()*5000));
			}	
			if (page.match('<span>'+ker_26[host_nyelv]+'</span>') && epsz>=eszazalek){
				setTimeout(epiklink, 2000+Math.round(Math.random()*5000));
			}
		}
	}
	else if (strpos('epikus_csata',window.location.href) && page.match('<span>'+ker_26[host_nyelv]+'</span>')){
				setTimeout(epiklink, 2000+Math.round(Math.random()*5000)); 
			}
}	
	
if(strpos('karakterlap&user',window.location.href) && tevgomb){
	var uzenet = '';
	var tamadas = '';
	var kihivas = '';
	var szubtam = '';
	var tmp = '';
	elem = getByClass('td','avatargomb');
	if (elem && elem.length > 0) {
		if (elem[0].getElementsByTagName('a').length > 0) {
			uzenet=elem[0].getElementsByTagName('a')[0].getAttribute('href');
		}
	}	
	elem = getByClass('td','avatargomb2');
	if (elem && elem.length > 0) {
		if (elem[0].getElementsByTagName('a').length > 0) {
			elem2=elem[0].getElementsByTagName('a');
			for (i=0; i<elem2.length; i++){
				if (strpos('szubplazma', elem2[i].getAttribute('href'))) {
					szubtam=elem2[i].getAttribute('href');
				} else if (strpos('kihivas_start', elem2[i].getAttribute('href'))) {
					kihivas=elem2[i].getAttribute('href');
				} else if (strpos('portyazas', elem2[i].getAttribute('href'))) {
					tamadas=elem2[i].getAttribute('href');
				}
			}
		}
	}

	avatar = getFirstByClass('div','karakter_avatar');
	if(tamadas || kihivas || uzenet || szubtam){
		gombok_block = document.createElement('table');
		gombok_block.setAttribute('align','center');
		tr = document.createElement('tr');
		gombok_block.appendChild(tr);		
		if(uzenet){
			td1 = document.createElement('td');
			gomb1 = document.createElement("a");
			gomb1.setAttribute('class','gomblink');
			gomb1.style.width = '80px';
			gomb1.setAttribute('text-align','center');
			gomb1.setAttribute('href',uzenet);
			sp1 = document.createElement('span');
			sp1.style.padding = '4px 10px 6px 23px';
			sp1.innerHTML = dis_11[omni_nyelv];
			gomb1.appendChild(sp1);
			td1.appendChild(gomb1);
			tr.appendChild(td1);
		}
		if(kihivas){
			td2 = document.createElement('td');
			gomb2 = document.createElement("a");
			gomb2.setAttribute('class','gomblink');
			gomb2.style.width = '80px';
			gomb2.setAttribute('text-align','center');
			gomb2.setAttribute('href',kihivas);
			gomb2.setAttribute('onclick','return confirm("Biztos kihívod?");');
			sp2 = document.createElement('span');
			sp2.style.padding = '4px 10px 6px 23px';
			sp2.innerHTML = dis_12[omni_nyelv];
			gomb2.appendChild(sp2);
			td2.appendChild(gomb2);
			tr.appendChild(td2);
		}
		if(tamadas){
			td3 = document.createElement('td');
			gomb3 = document.createElement("a");
			gomb3.setAttribute('class','gomblink');
			gomb3.style.width = '80px';
			gomb3.setAttribute('href',tamadas);
			gomb3.setAttribute('onclick','return confirm("Biztos megtámadod?");');
			sp3 = document.createElement('span');
			sp3.style.padding = '4px 10px 6px 18px';
			sp3.innerHTML = dis_13[omni_nyelv];
			gomb3.appendChild(sp3);
			td3.appendChild(gomb3);
			tr.appendChild(td3);
		}
		if(szubtam && tamadas){
			tr2 = document.createElement('tr');
			td4 = document.createElement('td');
			td5 = document.createElement('td');
			td6 = document.createElement('td');
			gomb6 = document.createElement("a");
			gomb6.setAttribute('class','gomblink');
			gomb6.style.width = '80px';
			gomb6.style.color ='orange';
			gomb6.setAttribute('href',szubtam);
			gomb6.setAttribute('onclick','return confirm("Biztos megtámadod?");');
			sp6 = document.createElement('span');
			sp6.style.padding = '4px 10px 6px 18px';
			sp6.innerHTML = '<td>'+dis_14[omni_nyelv];
			gomb6.appendChild(sp6);
			td6.appendChild(gomb6);
			tr2.appendChild(td4);
			tr2.appendChild(td5);
			tr2.appendChild(td6);
			gombok_block.appendChild(tr2);
		}
		else if (szubtam){
			td4 = document.createElement('td');
			gomb4 = document.createElement("a");
			gomb4.setAttribute('class','gomblink');
			gomb4.style.width = '80px';
			gomb4.style.color ='orange';
			gomb4.setAttribute('href',szubtam);
			gomb4.setAttribute('onclick','return confirm("Biztos megtámadod?");');
			sp4 = document.createElement('span');
			sp4.style.padding = '4px 10px 6px 18px';
			sp4.innerHTML = dis_14[omni_nyelv];
			gomb4.appendChild(sp4);
			td4.appendChild(gomb4);
			tr.appendChild(td4);
		}
		avatar.insertBefore(gombok_block, avatar.firstChild);
		getFirstByClass('td','avatargomb').style.display = "none";
		getFirstByClass('td','avatargomb2').style.display = "none";
	}
}

function napilink(){
	window.location.href = "http://"+hostnev+"/index.php?m=napi_rutinok&tev=jutalmak_atvesz";
}

if(strpos('napi_rutinok',window.location.href) || (window.location.href.match(/index.php$/) && document.getElementById('napi_rutin_bal'))){
	var tomb = document.getElementById('napi_rutin_bal');
	var elemek = getByClass2(tomb,'div', 'h3_out');
	for (j=0; j<elemek.length; j++){
		tomb.innerHTML=tomb.innerHTML.replace('<div class="h3_out">','</div><div class="tev"><div class="h3_outtev">');
	}
	for (j=0; j<elemek.length; j++){
		tomb.innerHTML=tomb.innerHTML.replace('<div class="h3_outtev">','<div class="h3_out">');
	}
	var elemek2 = getByClass2(tomb,'div','tev');
	for (j=0; j<4; j++){
		if (napirutin && elemek2[j].innerHTML.match(ker_20[host_nyelv]) && elemek2[j].innerHTML.match(ker_21[host_nyelv])){
			setTimeout(napilink, 1000+Math.round(Math.random()*2000));
		}
		if (keszrutinrejtes) {
			if (elemek2[j].innerHTML.match('gomblink_off') && elemek2[j].innerHTML.match('Hűségbónusz')){
				elemek2[j].style.display = "none";
			}
			if (!elemek2[j].innerHTML.match('class="gomblink"') && elemek2[j].innerHTML.match('Napi ajánlat')){
				elemek2[j].style.display = "none";
			}
			if (!elemek2[j].innerHTML.match('gomblink2') && elemek2[j].innerHTML.match('Gyorsgombok')){
				elemek2[j].style.display = "none";
			}
		}
	}
	var templomfej = document.createElement('div');
	templomfej.setAttribute('class','h3_out');
	templomfej.innerHTML='<h3>'+dis_17[omni_nyelv]+'</h3>';
	document.getElementById('napi_rutin_bal').appendChild(templomfej);
	var table = document.createElement('table');
	table.setAttribute('align','center');
	var templomlist = document.getElementById('napi_rutin_bal').appendChild(table);
	var tbody = templomlist.appendChild(document.createElement('tbody'));
	var tr = tbody.appendChild(document.createElement('tr'));
	var td = tr.appendChild(document.createElement('td'));
	td.setAttribute('class','templom_kep');
	td.innerHTML = '<img src="pic/avegzettemploma/'+(alvariel_last == today ? 'temp39.gif' : 'szurke39.gif')+'" height="25">';
	td = tr.appendChild(document.createElement('td'));
	if (alvariel_last == today) {
		td.setAttribute('class','szilank_megvan');
		td.innerHTML = dis_18[omni_nyelv];
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/tick.png">';
	} else {
		td.innerHTML = '<a href="http://'+hostnev+'/index.php?m=ladyalvariel">'+dis_18[omni_nyelv]+'</a>';
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/cross.png">';
	}
	tr = tbody.appendChild(document.createElement('tr'));
	td = tr.appendChild(document.createElement('td'));
	td.setAttribute('class','templom_kep');
	td.innerHTML = '<img src="pic/avegzettemploma/'+(epuletstat_last == today ? 'temp16.gif' : 'szurke16.gif')+'" height="25">';
	td = tr.appendChild(document.createElement('td'));
	if (epuletstat_last == today) {
		td.setAttribute('class','szilank_megvan');
		td.innerHTML = dis_19[omni_nyelv];
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/tick.png">';
	} else {
		td.innerHTML = '<a href="http://'+hostnev+'/index.php?m=szovetseg&sub=statisztikak&epulet=6">'+dis_19[omni_nyelv]+'</a>';
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/cross.png">';
	}
	tr = tbody.appendChild(document.createElement('tr'));
	td = tr.appendChild(document.createElement('td'));
	td.setAttribute('class','templom_kep');
	td.innerHTML = '<img src="pic/avegzettemploma/'+(helyezes_last == today ? 'temp16.gif' : 'szurke16.gif')+'" height="25">';
	td = tr.appendChild(document.createElement('td'));
	if (helyezes_last == today) {
		td.setAttribute('class','szilank_megvan');
		td.innerHTML = dis_20[omni_nyelv];
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/tick.png">';
	} else {
		td.innerHTML = '<a href="http://'+hostnev+'/index.php?m=toplistak&sub=&order=szint&tev=mutat_sajat">'+dis_20[omni_nyelv]+'</a>';
		td = tr.appendChild(document.createElement('td'));
		td.innerHTML = '<img src="pic/cross.png">';
	}
}

if (strpos('ladyalvariel',window.location.href) && today > alvariel_last
		&& !(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')) {
	GM_setValue(azonosito+"_alvariel_last", today);
}

if (strpos('statisztikak&epulet',window.location.href) && today > epuletstat_last
		&& !(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')) {
	GM_setValue(azonosito+"_epuletstat_last", today);
}

if (strpos('mutat_sajat',window.location.href) && today > helyezes_last
		&& !(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')) {
	GM_setValue(azonosito+"_helyezes_last", today);
}

if (napirutin && today > templom_last
		&& !(currentTime.getHours() == 0 && id('rendszerido').innerHTML.substring(0,2) == '23')) {
	GM_xmlhttpRequest({
		method: 'GET', 
		url: "http://"+hostnev+"/index.php?m=avegzettemploma", 
		onload: function(data){
			GM_setValue(azonosito+"_templom_last", today);
			templomnapi(data);
		}
	});
}

function templomnapi (data){
	matches = data.responseText.match(new RegExp('<strong>'+ker_49[host_nyelv]+'</strong>.*\n\s*\\D+\\s+\\d+\\s+\\((\\d+)%\\)'));
	if ((matches && (matches[1] == 100)) || (matches == null)) {
		if (today != alvariel_last) {
			GM_setValue(azonosito+"_alvariel_last", today);
		}
	}
	matches = data.responseText.match(new RegExp('<strong>'+ker_50[host_nyelv]+'</strong>.*\n\s*\\D+\\s+\\d+\\s+\\((\\d+)%\\)'));
	if ((matches && (matches[1] == 100)) || (matches == null)) {
		if (today != epuletstat_last) {
			GM_setValue(azonosito+"_epuletstat_last", today);
		}
	}
	matches = data.responseText.match(new RegExp('<strong>'+ker_51[host_nyelv]+'</strong>.*\n\s*\\D+\\s+\\d+\\s+\\((\\d+)%\\)'));
	if ((matches && (matches[1] == 100)) || (matches == null)) {
		if (today != helyezes_last) {
			GM_setValue(azonosito+"_helyezes_last", today);
		}
	}
}

if(strpos('m=xeno_haboruk#csata',window.location.href)) {
	var tamadastipus = new Object();
	tamadastipus.csp = false;
	tamadastipus.pp = false;
	var xenostat = xenoadat;
	if (strpos('m=xeno_haboruk#csata_csp',window.location.href)) {
		xenostat = xenocsp;
		tamadastipus.csp = true;
	} else if (strpos('m=xeno_haboruk#csata_pp',window.location.href)) {
		xenostat = xenopp;
		tamadastipus.pp = true;
	}
	var battle0 = getByClass('div','battle')[0];
	xenostat.db += 1;
	matches = getByClass2(battle0,'span','sebzes');
	if (matches.length > 0) {
		matches = matches[matches.length-1].innerHTML.match(/(\d+)/);
		xenostat.sebzes += parseInt(matches[1]);
	}
	matches = getByClass2(battle0,'span','sebzodes');
	if (matches.length > 0) {
		matches = matches[matches.length-1].innerHTML.match(/(\d+)/);
		xenostat.sebzodes += parseInt(matches[1]);
	}
	matches = getByClass2(battle0,'div','result_win');
	if (matches.length > 0) {
		matches = matches[0].innerHTML.match(new RegExp (ker_52[host_nyelv]) );
		if (getByClass2(battle0,'span','le').length>0) {
			xenostat.LE += parseInt(getByClass2(battle0,'span','le')[0].textContent);
		} else {
			xenostat.LE += parseInt(matches[1]);
		}
		xenostat.TP += parseInt(matches[2]);
	}
	matches = getByClass2(battle0,'span','jovalasz');
	if (matches.length > 0) {
		matches = matches[0].innerHTML.match(/(\d+)/);
		xenostat.kvizLE += parseInt(matches[1]);
	}
	matches = getByClass2(battle0,'div','xeno_csataveg');
	if (matches.length > 0 && matches[0].innerHTML.match(ker_53[host_nyelv])) {
		xenostat.osdragako -= 1;
	}
	matches = getByClass2(battle0,'span','szubplazma');
	if (matches.length > 0) {
		xenostat.szubplazma += 1;
	}
	matches = getByClass2(battle0,'span','osdragako');
	if (matches.length > 0) {
		xenostat.osdragako += 1;
	}
	matches = getByClass2(battle0,'span','kaland');
	if (matches.length > 0) {
		if (getByClass2(battle0,'span','le').length>0) {
			xenostat.sajtolas += 1;
		} else {
			xenostat.kaland += 1;
		}
	}
	matches = getByClass2(battle0,'div','xeno_csataveg');
	if (matches.length > 0 && matches[0].innerHTML.match(new RegExp(ker_54[host_nyelv]))) {
		xenostat.ital += 1;
	}
	
	if (tamadastipus.csp) {
		GM_setValue(azonosito+'_xenocsp', xenostat.toSource());	
	} else if (tamadastipus.pp) {
		GM_setValue(azonosito+'_xenopp', xenostat.toSource());	
	} else {
		GM_setValue(azonosito+'_xenoadat', xenostat.toSource());	
	}		
}

if(strpos('m=xeno_haboruk&sub=statisztikak',window.location.href)) {
	table = getByClass('table', 'xeno_sajat_stat')[0];
	table.childNodes[0].childNodes[0].appendChild(table.childNodes[0].childNodes[0].removeChild(table.childNodes[0].childNodes[0].childNodes[0]));
	elem = document.createElement('td');
	elem.setAttribute('width','33%');
	table.setAttribute('width','88%');
	table.childNodes[0].childNodes[0].childNodes[0].setAttribute('width','33%');
	table.childNodes[0].childNodes[0].childNodes[1].setAttribute('width','33%');
	table2 = document.createElement('table');
	table2.innerHTML += '<tr><th></th><th style="text-align:center">'+dis_40[omni_nyelv]+'</th><th style="text-align:center">'+dis_41[omni_nyelv]+'</th><th style="text-align:center">'+dis_28[omni_nyelv]+'</th></tr>';
	table2.innerHTML += '<tr><td>'+dis_24[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.db+'</td><td style="text-align:center">'+xenocsp.db+'</td><td style="text-align:center">'+(xenopp.db+xenocsp.db)+'</td></tr>';
	table2.innerHTML += '<tr><td>'+dis_31[omni_nyelv]+'</td><td style="text-align:center">'+(isNaN(parseInt(xenopp.LE/xenopp.TP))?'-':Math.round(xenopp.LE/xenopp.TP*10)/10)+'</td><td style="text-align:center">'
		+(isNaN(parseInt(xenocsp.LE/xenocsp.TP))?'-':Math.round(xenocsp.LE/xenocsp.TP*10)/10)+'</td><td style="text-align:center">'
		+(isNaN(parseInt((xenopp.LE+xenocsp.LE)/(xenopp.TP+xenocsp.TP)))?'-':Math.round((xenopp.LE+xenocsp.LE)/(xenopp.TP+xenocsp.TP)*10)/10)+'</td></tr>';
	table2.innerHTML += '<tr><td>'+dis_30[omni_nyelv]+'</td><td style="text-align:center">'+(isNaN(parseInt(xenopp.LE/xenopp.db))?'-':Math.round(xenopp.LE/xenopp.db))+'</td><td style="text-align:center">'
		+(isNaN(parseInt(xenocsp.LE/xenocsp.db))?'-':Math.round(xenocsp.LE/xenocsp.db))+'</td><td style="text-align:center">'
		+(isNaN(parseInt((xenopp.LE+xenocsp.LE)/(xenopp.db+xenocsp.db)))?'-':Math.round((xenopp.LE+xenocsp.LE)/(xenopp.db+xenocsp.db)))+'</td></tr>';
  gomb = document.createElement('a');
  gomb.className="gomblink";
  gomb.innerHTML="<span>"+dis_25[omni_nyelv]+"</span>";
	gomb.setAttribute('style','margin-top: 10px; display: none');
  gomb.addEventListener('click',function(){
    if (confirm(dis_26[omni_nyelv])){
      GM_deleteValue(azonosito+'_xenocsp');
      GM_deleteValue(azonosito+'_xenopp');
      alert(dis_27[omni_nyelv]);
      table2.style.display = 'none';
      table4.style.display = 'none';
    }
  },true);
 	table4 = document.createElement('table');
	table4.innerHTML += '<tr><th></th><th style="text-align:center">'+dis_40[omni_nyelv]+'</th><th style="text-align:center">'+dis_41[omni_nyelv]+'</th><th style="text-align:center">'+dis_28[omni_nyelv]+'</th></tr>';
	table4.innerHTML += '<tr><td>'+dis_24[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.db+'</td><td style="text-align:center">'+xenocsp.db+'</td><td style="text-align:center">'+(xenopp.db+xenocsp.db)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_31[omni_nyelv]+'</td><td style="text-align:center">'+(isNaN(parseInt(xenopp.LE/xenopp.TP))?'-':Math.round(xenopp.LE/xenopp.TP*10)/10)+'</td><td style="text-align:center">'
		+(isNaN(parseInt(xenocsp.LE/xenocsp.TP))?'-':Math.round(xenocsp.LE/xenocsp.TP*10)/10)+'</td><td style="text-align:center">'
		+(isNaN(parseInt((xenopp.LE+xenocsp.LE)/(xenopp.TP+xenocsp.TP)))?'-':Math.round((xenopp.LE+xenocsp.LE)/(xenopp.TP+xenocsp.TP)*10)/10)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_30[omni_nyelv]+'</td><td style="text-align:center">'+(isNaN(parseInt(xenopp.LE/xenopp.db))?'-':Math.round(xenopp.LE/xenopp.db))+'</td><td style="text-align:center">'
		+(isNaN(parseInt(xenocsp.LE/xenocsp.db))?'-':Math.round(xenocsp.LE/xenocsp.db))+'</td><td style="text-align:center">'
		+(isNaN(parseInt((xenopp.LE+xenocsp.LE)/(xenopp.db+xenocsp.db)))?'-':Math.round((xenopp.LE+xenocsp.LE)/(xenopp.db+xenocsp.db)))+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_22[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.LE+'</td><td style="text-align:center">'+xenocsp.LE+'</td><td style="text-align:center">'+(xenopp.LE+xenocsp.LE)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_29[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.TP+'</td><td style="text-align:center">'+xenocsp.TP+'</td><td style="text-align:center">'+(xenopp.TP+xenocsp.TP)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_32[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.sebzes+'</td><td style="text-align:center">'+xenocsp.sebzes+'</td><td style="text-align:center">'+(xenopp.sebzes+xenocsp.sebzes)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_33[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.sebzodes+'</td><td style="text-align:center">'+xenocsp.sebzodes+'</td><td style="text-align:center">'+(xenopp.sebzodes+xenocsp.sebzodes)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_34[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.sajtolas+'</td><td style="text-align:center">'+xenocsp.sajtolas+'</td><td style="text-align:center">'+(xenopp.sajtolas+xenocsp.sajtolas)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_35[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.osdragako+'</td><td style="text-align:center">'+xenocsp.osdragako+'</td><td style="text-align:center">'+(xenopp.osdragako+xenocsp.osdragako)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_36[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.ital+'</td><td style="text-align:center">'+xenocsp.ital+'</td><td style="text-align:center">'+(xenopp.ital+xenocsp.ital)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_37[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.kaland+'</td><td style="text-align:center">'+xenocsp.kaland+'</td><td style="text-align:center">'+(xenopp.kaland+xenocsp.kaland)+'</td></tr>';
	table4.innerHTML += '<tr><td>'+dis_38[omni_nyelv]+'</td><td style="text-align:center">'+xenopp.szubplazma+'</td><td style="text-align:center">'+xenocsp.szubplazma+'</td><td style="text-align:center">'+(xenopp.szubplazma+xenocsp.szubplazma)+'</td></tr>';
	table4.style.display = 'none';
	gomb2 = document.createElement('a');
  gomb2.className="gomblink";
  gomb2.innerHTML="<span>"+dis_39[omni_nyelv]+"</span>";
  gomb2.addEventListener('click',function(){
      table2.style.display = 'none';
      table4.style.display = 'block';
      gomb.style.display = 'block';
  },true);
	table3 = document.createElement('table');
	table3.appendChild(table2);
	table3.appendChild(table4);
	table3.appendChild(gomb2);
	table3.appendChild(gomb);

	table.childNodes[0].childNodes[0].appendChild(table3);
}

/*	xenostat = ({db: 0, sebzes: 0, sebzodes: 0, LE: 0, kvizLE: 0, TP: 0, sajtolas: 0, osdragako: 0, szubplazma: 0, kaland: 0, ital: 0 });
	GM_setValue(azonosito+'_xenocsp', xenostat.toSource());	
	GM_setValue(azonosito+'_xenopp', xenostat.toSource());	*/

style = document.createElement('style');
style.innerHTML = 'a.support_alert { background: transparent url('+pic_base+'pic/design_uj/gomb_szurke11_szel.png) no-repeat scroll top right; } a.support_alert span { background: transparent url('+pic_base+'pic/design_uj/gomb_szurke11.png) no-repeat; color:#777; } a.support_alert:hover { background: transparent url('+pic_base+'pic/design_uj/gomb_szurke11_szel.png) right -23px no-repeat; } a.support_alert:hover span { background: transparent url('+pic_base+'pic/design_uj/gomb_szurke11.png) 0 -23px no-repeat; color:#CCC;}';
document.getElementsByTagName('body')[0].appendChild(style);
	
GM_registerMenuCommand(dis_2[omni_nyelv], configure);
