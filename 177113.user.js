// ==UserScript==
// @name           Children of Bhaal - Modyfikacja Forum
// @namespace      ALIEN
// @description    Modyfikacja forum klanu Children of Bhaal poprawiająca czytelność forum
// @include        http://athkatla.cob-bg.pl/*
// @include        http://www.athkatla.cob-bg.pl/*
// ==/UserScript==

var a=document.getElementsByTagName("a");
for (var i=0;i<a.length;i++) {
	html=a[i].innerHTML;
	html=html.replace("Candlekeep - nowa domena Klanu! Zapraszamy!!!","");
	html=html.replace("Dzielnica Rządowa (Klan)","Klan");
	html=html.replace("Bramy (Saga Baldur's Gate)","Saga Baldur's Gate");
	html=html.replace("Mosty (Tłumaczenia)","Tłumaczenia");
		html=html.replace("Scriptorium Mystry","Tłumaczenia Megamodyfikacji");
		html=html.replace("Copiarium Mystry","Tłumaczenia pozostałych modów");
		html=html.replace("Sanktuarium Mystry","Korekty");
	html=html.replace("Doki (Modowanie)","Modowanie");
	html=html.replace("Dzielnica Świątyń (Rozrywka)","Rozrywka");
	html=html.replace("Promenada Waukeen (Inne gry)","Inne gry");
	html=html.replace("Slumsy (Dyskusje)","Dyskusje");
	html=html.replace("Dzielnica Cmentarna (Archiwum)","Archiwum");
		
	if (a[i].title=="Komnata poświęcona wszelkim informacjom o nowościach w świecie BG. Dawniej Zwiastunem Świtu zowana") {
		html=html.replace("Candlekeep","Newsy");
	}
	if (a[i].title=="Komnata przeznaczona do zgłaszania wszelkich uwag dotyczących Forum, technikaliów, a także samego Klanu. Dawniej Woluminem Skarg i Zażaleń zowana") {
		html=html.replace("Athkatla","Uwagi do Forum");
	}
	if (a[i].title=="Komnata przeznaczona do zgłaszania wszelkich uwag co do działania i zawartości Strony Klanu") {
		html=html.replace("Wrota Baldura","Uwagi do Strony");
	}
	if (a[i].title=="Komnata przeznaczona do zgłaszania wszelkich uwag co do działania i zawartości Galerii Klanu") {
		html=html.replace("Wieża Durlaga","Uwagi do Galerii");
	}
	if (a[i].title=="Portal do Candlekeep, Strony Głównej Klanu CoB.") {
		html=html.replace("Candlekeep","cob-bg.pl");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Strony Klanu CoB") {
		html=html.replace("Wrota Baldura","baldur.cob-bg.pl");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Galerii Klanu CoB") {
		html=html.replace("Wieża Durlaga","durlag.cob-bg.pl ");
	}
	if (a[i].title=="Komnata poświęcona powitaniom i informacjom wstępnym, których poznanie zaleca się wszystkim odwiedzającym") {
		html=html.replace("Sala Audiencji","Dla początkujących");
	}
	if (a[i].title=="Komnata poświęcona naborowi do Klanu, który odbywa się poprzez rytuał Próby Bhaala...") {
		html=html.replace("Sala Rytuału","Nabór do klanu");
	}
	if (a[i].title=="Komnata poświęcona reklamie innych stron i for o zbliżonej tematyce") {
		html=html.replace("Sala Sojuszników","Linki do stron RPG");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Klanowych materiałów o Baldur's Gate I") {
		html=html.replace("Posiadłość Entara (materiały o BG I)","Materiały o BG I");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Listy modów Baldur's Gate I") {
		html=html.replace("Wieża Ramazitha (Modyfikacje BG I)","Mody dla BG I");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Klanowych materiałów o Baldur's Gate II") {
		html=html.replace("Spłoniona Syrena (materiały o BG II)","Materiały o BG II");
	}
	if (a[i].title=="Komnata poświęcona BGT i BG Tutu oraz modyfikacjom do nich") {
		html=html.replace("BGT/TuTu","BGT");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Listy m(i)odów Baldur's Gate II - największego przewodnika po modach do BG II") {
		html=html.replace("Świątynia Helma (Modyfikacje BG II)","BG II");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Listy m(i)odów Baldur's Gate Trilogy i BG1 TuTu") {
		html=html.replace("Zamek Książęcy (Modyfikacje BGT/TuTu)","BGT");
	}
	if (a[i].title=="Ten portal prowadzi wprost do kompletnego opracowania modyfikacji The Darkest Day") {
		//html=html.replace("TDD","Materiały o The Darkest Day");
		html=html.replace("TDD","TDD");
	}
	if (a[i].title=="Ten portal prowadzi wprost do kompletnego opracowania modyfikacji Tortured Souls") {
		//html=html.replace("TS","Materiały o Tortured Souls");
		html=html.replace("TS","TS");
	}
	if (a[i].title=="Komnata dokonywanych przez Gwiazdy Mystry tłumaczeń pomniejszych modyfikacji ") {
		html=html.replace("Opuscula","Pełne tłumaczenia od ekipy Gwiazdy Mystry");
	}
	if (a[i].title=="Komnata dokonanych przez osoby nie należące do Gwiazd Mystry tłumaczeń modyfikacji") {
		html=html.replace("Operatorium","Tłumaczenia - pełne");
	}
	if (a[i].title=="Komnata dokonywanych przez osoby nie należące do Gwiazd Mystry tłumaczeń modyfikacji ") {
		html=html.replace("Translatorium","Tłumaczenia - częściowe");
	}
	if (a[i].title=="Komnata pomocy w tłumaczeniach") {
		html=html.replace("Auxilium","Pomoc przy tłumaczeniach");
	}
	if (a[i].title=="Komnata spraw najróżniejszych związanych z tłumaczeniami") {
		html=html.replace("Varia","Pozostałe tematy dotyczące tłumaczeń");
	}
	if (a[i].title=="Komnata archiwaliów tłumaczeniowych") {
		html=html.replace("Tabularium","Archiwum tłumaczeń");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Strony (pracowni) SoM (Gwiazd Mystry)") {
		html=html.replace("Czarodziejskie Rozmaitości","Opisy i historia tłumaczeń");
	}
	if (a[i].title=="Komnata przeznaczona na dyskusje i ogłoszenia związane z modowaniem") {
		html=html.replace("Varia","Ogólnie o modowaniu");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Strony (pracowni) FoG (Uczniów Gonda)") {
		html=html.replace("Komnata Cudów","Księga Modowania");
	}
	if (a[i].title=="Komnata stanowiąca przybytek L`fa") {
		html=html.replace("Sanktuarium L`fa","Mody L`fa");
	}
	if (a[i].title=="Komnata stanowiąca przybytek Lavy Del`Vortela (Teatr Płonący Wrzos)") {
		html=html.replace("Teatr Lavy","Mody Lavy Del`Vortela");
	}
	if (a[i].title=="Komnata stanowiąca przybytek picolla") {
		html=html.replace("Zakątek picolla","Mody picolla");
	}
	if (a[i].title=="Komnata stanowiąca przybytek Yarpena") {
		html=html.replace("Archiwum Yarpena","Mody Yarpena");
	}
	if (a[i].title=="Komnata stanowiąca przybytek Zireael") {
		html=html.replace("Lasek Zireael","Mody Zireaela");
	}
	if (a[i].title=="Komnata poświęcona sieciówkom (Saga BG względnie IwD)") {
		html=html.replace("Sojusz","Gra przez sieć");
	}
	if (a[i].title=="Komnata poświęcona pojedynkom i turniejom") {
		html=html.replace("Arena","Turnieje");
	}
	if (a[i].title=="Ten portal prowadzi wprost do Strony Ligi Baldur's Gate") {
		html=html.replace("Saradush (Liga BG)","Strona Ligi");
	}
	if (a[i].title=="Komnata poświęcona Forgotten Realms i D&D") {
		html=html.replace("Dormitorium Zapomnianych Krain","Forgotten Realms i D&D");
	}
	if (a[i].title=="Komnata poświęcona wszelkim systemom RPG") {
		html=html.replace("Sala Wielkich Mistrzów","Systemy RPG");
	}
	if (a[i].title=="Komnata poświęcona forumowym sesjom RPG") {
		html=html.replace("Magiczny Portal (RPG Online)","Sesje RPG");
	}
	if (a[i].title=="Komnata poświęcona pozostałym grom") {
		html=html.replace("Inne historie","Inne gry");
	}
	if (a[i].title=="Komnata poświęcona rozważaniom dotyczącym dziejów") {
		html=html.replace("Muzeum (Historia)","Historia");
	}
	if (a[i].title=="Komnata poświęcona rozważaniom dotyczącym światopoglądów i filozofii") {
		html=html.replace("Loża (Filozofia)","Filozofia");
	}
	if (a[i].title=="Komnata poświęcona rozważaniom dotyczącym literatury") {
		html=html.replace("Biblioteka (Literatura)","Literatura");
	}
	if (a[i].title=="Komnata poświęcona twórczości własnej Forumowiczów") {
		html=html.replace("Scriptorium (Twórczość)","Twórczość");
	}
	if (a[i].title=="Komnata poświęcona pogawędkom na temat filmu") {
		html=html.replace("Sala Animatorów (Film)","Film");
	}
	if (a[i].title=="Komnata poświęcona pogawędkom na temat muzyki") {
		html=html.replace("Scena Trubadurów (Muzyka)","Muzyka");
	}
	if (a[i].title=="Komnata poświęcona pogawędkom na temat sportów zarówno oglądanych jak i uprawianych") {
		html=html.replace("Arena Gladiatorów (Sport)","Sport");
	}
	if (a[i].title=="Komnata poświęcona wszelkiego rodzaju spotkaniom Forumowiczów") {
		html=html.replace("Komnata Wędrowców (Zloty)","Zloty");
	}
	if (a[i].title=="Komnata poświęcona pogawędkom dotyczącym Forumowiczów") {
		html=html.replace("Zakątek Bractwa (Forumowicze)","Forumowicze");
	}
	if (a[i].title=="Komnata poświęcona pogawędkom na sporo innych tematów") {
		html=html.replace("Alkowa Gawędziarzy (Pozostałe)","Pozostałe");
	}
	if (a[i].title=="Komnata poświęcona wszelkim komentarzom do innych tematów") {
		html=html.replace("Ostoja Komentatorów (Opinie)","Opinie");
	}
	if (a[i].title=="Komnata poświęcona technikaliom komputerowo-elektronicznym") {
		html=html.replace("Błyskawiczna Cudowna Techno-pracownia Jana","Technikalia komputerowo-elektroniczne");
	}
	if (a[i].title=="Komnata pełniąca rolę Forumowego archiwum") {
		html=html.replace("Krypta Bodhi","Śmietnik");
	}
		a[i].innerHTML=html;
}