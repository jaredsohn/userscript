// ==UserScript==
// @name 	Travian AutoTask
// @author 	congxz6688
// @version 	1.2.1.1
// @description ???by congxz6688, ?????????(The is 3x ) by???
// @include 	http://*.travian*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==


var cssStyle = "";
cssStyle += "table#tasklisttable th {border:0px !important;font-weight:bolder; margin:10px;padding-top:8px; }"
cssStyle += "table#tasklisttable tr td,table#mytablee tr td{border:0px !important;margin:20px;}";
cssStyle += ".floatClose {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#closeautran {position:relative;top:1px;left:150px}"
cssStyle += "#autoResdiv,#translimit {padding:0px 3px; }";
cssStyle += "#createnewurl {margin: 0px 0px 0px 0px; position:relative; top:6px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#createUrl {margin: 0px 0px 0px 0px; position:relative; top:-6px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn,#attackbtn,#trainlnk,#customtransbtn {margin: 0px 0px 0px  20px; position:relative; top:-4px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn:active,#attackbtn:active,#demolishlnk:active,#createUrl:active,#createnewurl:active,#trainlnk:active,#customtransbtn:active {border-style: groove; border-width:3px; }"
cssStyle += "#updataform, #printmsg,#transform,#translimitform,#demolistform,#attackform,#trainform,#customtransform {padding:10px 30px; }";
cssStyle += "#translimit {padding:0px 3px 15px 3px;}";
cssStyle += "#mytablee {margin:10px 0px 10px 0px;}";
cssStyle += "#crtvill,#hero {margin:0px 0px 10px 0px;}";
cssStyle += "#demolishdiv {padding:10px 3px 3px 3px;}";
cssStyle += "#taskForm_wrapper,#MSG_wrapper,#tranForm_wrapper,#tranlmtform_wrapper,#demolistform_wrapper,#attackform_wrapper,#trainform_wrapper,#customtransform_wrapper {position:fixed; max-width:900px !important; min-width:260px !important; min-height:50px !important; background-color:RGB(255, 255, 192); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#tasklisttable_wrapper {position:fixed; padding:10px 20px 10px 20px;min-width:260px !important; min-height:50px !important; background-color:RGB(200, 240, 200); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += ".handle {cursor: move;}";
cssStyle +="#autoResform1,#changeit {color:green;}";
cssStyle +="#autoResform2 {color:red;}";
cssStyle +="#demolishlnk {color:red;border-style: ridge; border-width:2px;}";
GM_addStyle(cssStyle);


Xlang="com";
checkLang()

var deleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";
var movedownBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACXklEQVR42p2S20vTYRjH%2FTuCiEBLWwepoC4kLSWdxZrImBeri7IjokS6eaFikGCZHaxBB5DWPNVwREKm2GSz1FKHXghFsYFaJnP%2B3Obv9B6ep3ezgsKbenkv3ovv5%2F0%2Bz%2Fd50vAfT9p%2FARwRgHPKASmg%2FdZQY%2FuHGmfAfn%2F4Skt%2Fb2BBp2tCw1BFDn8AjAPh6BqRL7S%2BPX97vKJt%2FM7Lrx7%2FHGHyxgBloFG8ObBqaRq1NgfLmt%2FXdnx55gtTrmwAADBhIQBHz%2FzxhjFjfbC4fuzio9keX3hjh9%2BAEBXWvjtin8y3%2B22tY52Dn%2F920IQWOCMqIbJCFdvd2QOXBnMqRw9d9p%2B4Nu4eCQMhqCmUIVCeclAlVYcE4CrHmI6lTVM7T3r3nHq193RfQc2bdv%2FiMkcJMMqRMzkJgK5OhyN55W2mmtcWe8BcN2mwegyW3l1lvXkVQ6bq4eLq%2FlJH91Wnh2KqJAYYB%2BybiRQ7BjaXeDPNXZnm7vW7zdSZWeI5XBU41%2FBCJZigqcEBEd1IVI8%2F9s4UVPnSC93pRU%2B2H3NlGF0ZRe59Zzz5lc9VikiiMvBfKXEmnNYAG53e%2FWf9Weanu00Pth51Zlm92UV1UV1kmBDpiFrSfqaKYsq6iEsGtFa6cmxdm3Ifbim4l21uiWrJmpFzBE7Xd4kgUmEBmhiDpqnilVt6Y4fJbTBe%2F7SoMK4AASESRVDUUz0kd46rlMTi0tL8XOjjdGAilH6w3NkxPBGcCoVmI0uRRFxlVCApACkBjgSAUE5kRqm2EpOicenb9%2FnlpYWVhKKQpIKLjxn8ABAenc7LXVdbAAAAAElFTkSuQmCC";
var moveupBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAIAAADdWck9AAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACbElEQVR42pVT70tTURj2f4joexGrT0XfggqGrabUIrLol4FiOiiwMCxZzQyMROzDqMD8gShCiLQNdQi2cc1tZrrmls1i1lzLLFzzunbv7r3nx9u5Zw360Jdd7j3ncN7nOe97n%2Bc9ZVDiU1Y6gRI2Uf6yL5fbyGHoHhbSEs3kRAoEA%2BBitJhBh1OdSQhDj05F4yJ09npEzDeBFKC0kIFT2UGIYoIw9UbWfXGp6dns2JJ8xzGGCA9ixCb8D4Ew9KYC75KZ0ZDY4JirfrxgfRpxL%2BOO%2FilRBU3T8%2BDiP7A1wQQ%2BpdV7g4GLDwTL%2FZljbcGqzojFLjhjuNcVUhA%2FFAjPkJcVTVtH5OYT4VJ7qKI1YLLNmO2zZnuQrc0t4%2B3OzPD0SlZDNC%2FqhDyGtErqWp22odSNgbX6nsRxW8B463X57elznYt1PcvW59GWvmA4kVZ4TWUYlNjKdyGUmpj%2F6gonr%2FWnDjf6jE3BQ43eK45YlzsxFln1vF32BZdQUdYMgEQJxpTKCFm7Px%2BoGd9fPbmv2n2%2BYyGwKCuACdW4FyonEF1WShVCqapAreODoWpk75nxPWdHTrf5%2FXMIQZ5QmYmKQCmq9FcpYLuX26OGkwMGy9DuE%2F2nmv3CQjYPTJ%2BcPmD4D%2BHC3cjOo327TINsrLg%2B7XvzQ2UhKgF3nMvK7GcaU8yagBEqmye3Gx%2FtMHZtO%2FLw4NUXr%2FxfkE6QQYdRTtDNp5qm%2FM7KP9e3ymtcphpPZb3XVOupbPC8nJgVJVHTcgyGeHPoJbFqVDW%2FtSX92pDDH1fno8m5SDIUS72Pf1vbUDezaVWR9O4pOF3qffgDH4Xh0bQHBfwAAAAASUVORK5CYII%3D";
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var troopspeed = [];
troopspeed[0] = ["12", "10", "14", "32", "28", "20", "8", "6", "8", "10", ""];
troopspeed[1] = ["14", "14", "12", "18", "20", "18", "8", "6", "8", "10", ""];
troopspeed[2] = ["14", "12", "34", "38", "32", "26", "8", "6", "10", "10", ""];

switch (Xlang) {
	case "cn":
		allbuildwithid = ["???", "???", "???", "??", "", "???", "???", "???", "??", "???", "??", "??", "???", "???", "???", "?????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "??", "???", "???", "???", "????", "?????", "????", "???", "???", "???", "???", "???", "???", "????", "???"];
		addTaskText = ["????", "????", "???", "????", "??", "??", "????", "????", "??", "??", "??", "????", "??", "??????"];
		TaskKind = ["??", "??", "??", "??", "??", "??", "??", "??", "??"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["??", "??", "??", "??", "????", "?????????", "?", "??", "??", "??", "?", "???", "?", "??", "??", "??????", "?", "??"];
		raceName = ["???", "????", "???"];
		taskoftext = ["????", "????", "??????", "????", "????", "????", "????", "???????", "????", "????????", "???", "????", "????", "????", "??", "??", "?/?/?", "??", "????", "????", "????", "??????", "????", "????", "00:00:00", "????", "??", "??", "?", "?", "?", "?????","????","????","???????","????","????????","?????????,?????????????????\n?????,????????????,?????????????\n???20??,?????????:\n\n"];
		errorText = ["????", "?????????", "????", "?????????", "????", "??????????????,????????", "??????????????,????????", "??????????","??????: ?????????"];
		otherText = ["????", "?????????????20,<br>????????,??????<br>??????????", "??????^_^", "??????", "????", "??????", "????", "?????", "??????,????????,<br>?????????,??????", "??,????????,????<br>?????????<br>"];
		allsourceString = "???????????";
		resources=["??","??","??","??"];
		allbuildString = "??????????????????????????????????????????????????????????????????????????????????????????????????????????";
		
		var troops = [];
		troops[0] = ["?????", "???", "???", "????", "????", "????", "???", "?????", "???", "???", "??"];
		troops[1] = ["???", "??", "???", "???", "???", "?????", "???", "???", "???", "???", "??"];
		troops[2] = ["???", "??", "???", "???", "?????", "?????", "???", "???", "??", "???", "??"];
		attacktype = ["??", "??", "??"]
		break;
		
		
	case "tw":
		allbuildwithid = ["???", "??", "???", "??", "??", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????", "????"];
		addTaskText = ["????", "????", "???", "????", "??", "??", "????", "????", "??", "??", "??", "????", "??", "??????"];
		TaskKind = ["??", "??", "??", "??", "??", "??", "??", "??", "??"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["??", "??", "??", "??", "????", "?????????", "?", "??", "??", "??", "???", "?", "?", "??", "??", "???????", "?", "??"];
		raceName = ["???", "???", "???"];
		taskoftext = ["????", "????", "??????", "????", "????", "????", "????", "??????", "????", "????????", "???", "????", "????", "????", "??", "??", "?/?/?", "??", "????", "????", "????", "??????", "????", "????", "00:00:00", "????", "??", "??", "?", "?", "?", "?????","????","????","???????","????","????????","?????????,?????????????????\n?????,????????????,?????????????\n???20??,?????????:\n\n"];
		errorText = ["????", "?????????", "????", "?????????", "????", "??????????????,????????", "??????????????,????????", "??????????"];
		otherText = ["????", "?????????????20,<br>????????,??????<br>??????????", "??????^_ ^", "??????", "????", "??????", "????", "?????", "??????,????????,<br>?????????,??????", "??,????????,????<br>?????????<br>"];
		allsourceString = "??????????";
		resources=["??","??","??","??"];
		allbuildString = "??????????????????????????????????????????????????????????????????????????????????????????????????????";
		
		var troops = [];
		troops[0] = ["?????", "???", "???", "????", "????", "????", "???", "?????", "???", "???", "??"];
		troops[1] = ["???", "??", "???", "???", "??", "????", "???", "???", "???", "???", "??"];
		troops[2] = ["???", "??", "???", "???", "?????", "????", "???", "???", "??", "???", "??"];
		attacktype = ["??", "??", "??"]
		break;

	
	case "fi":
		allbuildwithid = ["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "", "Saha", "Tiilitehdas", "Rautavalimo", "Mylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Tori", "Lähetystö", "Kasarmi", "Talli", "Työpaja", "Akatemia", "Kätkö", "Kaupungintalo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppavirasto", "Suuri kasarmi", "Suuri talli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Panimo", "Ansoittaja","Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme", "Hevostenjuottoallas"];
		addTaskText = ["Lisää tehtävä", "Tyyli", "Kohdistettu kylä", "Tehtävän kohde", "Minne:", "Tyyppi", "Rakennustuki", "Resurssien keskittäminen", "Siirry ylös", "Siirry alas", "Poista", "&#160;&#160;&#160;Tehtävän sisältö", "Siirry ", "Poista kaikki tehtävät"];
		TaskKind = ["Päivitä", "Uusi rakennus", "Hyökkäys", "Tutkimus", "Koulutus", "Kuljetus", "NPC", "Hajotus", "Juhla"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Taso", "Kauppiaat", "ID", "Pääkaupunki", "Aloitusaika", "Tätä aika-asetusta ei voi nyt käyttää.", "minne:", "Kylä", "kuljetus", "mistä", "Kuljeta kylään", "Kuljeta kylästä", "Palaa kylästä", "Resurssit", "rakennus", "Rakenna uusi rakennus", "tyhjä", "taso"];
		raceName = ["Roomalaiset", "Teutonit", "Gallialaiset"];
		taskoftext = ["Aseta kentän päivitys", "Aseta uusi rakennuskohde", "Automaattinen resurssipäivitys", "Ei toimintaa", "Aloita", "Aloitettu", "Keskeytä", "Tämän kylän resurssikenttien jakauma on ", "Automaattikuljetus", "automaattikuljetusta ei ole avattu", "Avattu", "Kuljetus onnistui", "Tehtäväluettelo", "Max kuljetusmäärä", "Perusasetus", "Muokkaa", "Puu/Savi/Rauta", "vilja", "Tehtävälistan poisto", "Schedule attack", "Hyökkäystyyppi", "Kuljetusaika", "toistokerrat", "Hyökkäysaikaväli","00:00:00","Katapultin kohde","Satunnainen", "Tuntematon", "kertaa", "Kuukausi", "Päivä", "Joukot on lähetetty","Aseta koulutustehtävä","Koulutuskohde","Koulutustehtävä suoritettu","waitForTranslate","setup Hyökkäysaikaväli of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n"];
		errorText = ["Liian vähän resursseja", "Työntekijät ovat jo töissä.", "Rakennuskohde valmis", "Aloitetaan rakentaminen", "Työ kesken", "Varastosi on liian pieni. Suurenna varastoa aloittaaksesi rakentamisen", "Viljasiilosi on liian pieni. Suurenna viljasiiloa aloittaaksesi rakentamisen", "Riittävästi resursseja"];
		otherText = ["Tärkeä huomautus", "Vain pääkaupungin resurssikenttiä voidaan <br>päivittää tasolle 20. Nyt pääkaupunkia<br> ei voida todentaa. Päivitä profiiliasi, kiitos.", "Pikalinkki tähän ^_^", "Asennus valmis", "Peruttu", "Aloita tehtävät", "Päivitys valmis", "Tehty onnistuneesti", "Heimosi on määrittämätön, siksi joukkojesi tyyppiä <br>Päivitä profiiliasi heimon määrittämiseksi.<br>", "Käy Sankarin kartanossa määrittääksesi<br> sankarisi tyypin ja nopeuden."];
		allsourceString = "PuunhakkaajaSavimonttuRautakaivosviljapelto"
		resources=["waitTranslate","waitTranslate","waitTranslate","waitTranslate"];
		allbuildString = "SahaTiilitehdasRautavalimoMyllyLeipomoVarastoViljasiiloAseseppäHaarniskapajaTurnausareenaPäärakennusKokoontumispisteToriLähetystöKasarmiTalliTyöpajaAkatemiaKätköKaupungintaloVirka-asuntoPalatsiAarrekammioKauppavirastoSuuri kasarmiSuuri talliKaupungin muuriMaamuuriPaaluaitaKivenhakkaajaPanimoAnsoittajaSankarin kartanoSuuri varastoSuuri viljasiiloMaailmanihmeHevostenjuottoallas"
		
		var troops = [];
		troops[0] = ["Legioonalainen", "Pretoriaani", "Imperiaani", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Muurinmurtaja", "Tulikatapultti", "Senaattori", "Uudisasukas", "Sankari"];
		troops[1] = ["Nuijamies", "Keihäsmies", "Kirvessoturi", "Tiedustelija", "Paladiini", "Teutoniritari", "Muurinmurtaja", "Katapultti", "Päällikkö", "Uudisasukas", "Sankari"];
		troops[2] = ["Falangi", "Miekkasoturi", "Tunnustelija", "Teutateksen salama", "Druidiratsastaja", "Haeduaani", "Muurinmurtaja", "Heittokone", "Päällikkö", "Uudisasukas", "Sankari"];
		attacktype = ["Vahvistus", "Hyökkäys", "Ryöstö"]
		break;

		
	case "com":
		allbuildwithid = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		addTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Delete", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		TaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		raceName = ["Romans", "Teutons", "Gauls"];
		taskoftext = ["Schedule Upgrade", "Schedule NewBuild", "AutoResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans_limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition", "Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent", "Schedule Train","Train ubication","TrainTask done","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n"];
		errorText = ["Too few resources.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources"];
		otherText = ["Important note", "Only the resource fields of the capital can <br>be upgraded to level 20. Now your capital<br> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br>Visit your Profile to determine your race.<br>", "Please also visit your Hero's Mansion to determine<br> the speed and the type of your hero."];
		allsourceString = "WoodcutterClay PitIron MineCropland"
		resources=["lumber","clay","iron","crop"];
		allbuildString = "SawmillBrickyardIron FoundryGrain MillBakeryWarehouseGranaryBlacksmithArmouryTournament SquareMain BuildingRallypointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool"
		
		var troops = [];
		troops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		troops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		troops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];
		attacktype = ["Reinforce", "Attack", "Raid"]
		break;
}
allString = allsourceString + allbuildString;
var mts = new Array();
mts[0]	= 16;
mts[1]	= 12;
mts[2]	= 24;


var inputs = document.evaluate('//form/descendant::input[@type="password"]', document, null, 7, null);
if (inputs.snapshotLength == 1 && 0 < inputs.snapshotItem(0).value.length) {
	inputs.snapshotItem(0).form.submit()
}


	getSingleVillageNum()
	if (!GM_getValue(currentServer() + "_" + getuid() + "_option")) {
		GM_setValue(currentServer() + "_" + getuid() + "_option", "");
	}
	getTaskCookies()
	
	var pagefreshInterval=GM_getValue(currentServer() + "_" + getuid() + "_FreshInterval","20")
	
	var mybar = document.createElement("div");
	mybar.style.width = "100%"
	mybar.style.backgroundColor = "silver"
	mybar.style.position = "fixed"
	mybar.style.bottom = "0"
	mybar.style.textAlign = "center"
	document.body.insertBefore(mybar, document.body.lastChild.nextSibling);
	
	
	function checkLang(){
		var host = window.location.hostname;
    	hosts = host.split(".");
        Xlang=hosts[hosts.length-1];
	}
	
	function $(id){
		return document.getElementById(id);
	}
	
	
	function currentID(){
		var theboys = document.evaluate("//table[@id='vlist']/descendant::td[@class='dot hl']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (theboys.singleNodeValue!=null) {
			theUrl = theboys.singleNodeValue.nextSibling.innerHTML.match(/newdid=\d{1,}/)
			getit = theUrl.toString().match(/\d{1,}/)
			return getit
		}
		else{
			return GM_getValue(currentServer() + "_" + getuid() + '_singleTownNEWDID')
		}
	}
	
	
	function currentVillageName(){
		var theVillageName = document.evaluate("//table[@id='vlist']/descendant::a[contains(@href,"+ currentID()+")]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (theVillageName.singleNodeValue != null) {
			return theVillageName.singleNodeValue.innerHTML
		}
		else{
			return GM_getValue(currentServer() + "_" + getuid() + "_mainvillageName")
		}
	}
	
	
	function getAllVillageNewdids(){
		var allNewdids = new Array();
		var allvillages = document.evaluate('id("vlist")/descendant::a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (allvillages.snapshotLength > 0) {//multi-villages
			for (var i = 0; i < allvillages.snapshotLength; i++) {
				if (allvillages.snapshotItem(i).href.indexOf("newdid") != -1) {
					newdiddd = allvillages.snapshotItem(i).href.match(/\d{3,}(?!\.)/);
					thenewlength = allNewdids.push(newdiddd);//+ ":" + thevillagenum
				}
			}
		}
		else {//single village
			allNewdids[0] = (GM_getValue(currentServer() + '_' + getuid() + '_singleTownNEWDID')) ? GM_getValue(currentServer() + '_' + getuid() + '_singleTownNEWDID') : ""
		}
		return allNewdids
	}
	
	
	
	function getSingleVillageNum(){
		if (!GM_getValue(currentServer() + "_" + getuid() + '_singleTownNEWDID')) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://" + window.location.hostname + "/dorf3.php",
				onload: function(result){
					var theString = result.responseText.match(/newdid=\d{1,}/)
					var villageNum = theString.toString().match(/\d{1,}/);
					GM_setValue(currentServer() + "_" + getuid() + '_singleTownNEWDID', villageNum.toString())
				}
			});
		}
	}
	
	
	
	function getErrorInfor(){
		var errors = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_currentError")
			return errors
	}
	
	
	
	function getuid(){
		var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var privatea = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		privateea=(privatee.singleNodeValue)?privatee:privatea
		return privateea.singleNodeValue.href.split("uid=")[1]
	}
	
	
	
	function getthebuildUrl(vil, task){
		var myower = window.clearInterval(myower);	
		GM_log("come into getthebuildUrl(), task= "+task)
		var url = "http://" + window.location.hostname + "/build.php?newdid=" + vil + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback(){
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getbuildurl.responseText;
					aDoc.appendChild(aElem);
					
					switch (task[0]) {//0_id_level_time_name
						case "0":
							var leee=aDoc.getElementsByTagName("h1")[0].innerHTML.split(" ");
							level = leee[leee.length-1]
							GM_setValue(currentServer() + "_" + getuid() + "_" + vil + "_crtBuildlevel", level)
							var allanchors = aDoc.evaluate('id("content")//a[contains(@href,"?a=")]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
							if (allanchors.singleNodeValue) {
								GM_log("i get the url ,it is " + allanchors.singleNodeValue.href)
								return allanchors.singleNodeValue.href
							}
							else {
								var errors = aDoc.evaluate('//span[@class="none"]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
								GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_currentError",errors.singleNodeValue.innerHTML)
							    GM_log("oh No! I can't get the url, but i get the error infor ")
								return false
							}
							break;
						case "1"://1_id_level_gid_time_name
							var newbdurl = aDoc.evaluate('id("content")//a[contains(@href,"?a='+task[3]+'")]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
							if (newbdurl.singleNodeValue) {
								GM_log("i get the newbuild url ,it is " + newbdurl.singleNodeValue.href)
								return newbdurl.singleNodeValue.href
							}
							else {
								var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
								GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_currentError",errors.singleNodeValue.innerHTML)
							    GM_log("oh No! I can't get the url, but i get the error infor ")
								return false
							}
							break;
					}
				}
			}
		}
		return callback()
	}
	
	
	function getcrtlevel(){
		var theTitle = document.getElementsByTagName("h1")[0].innerHTML.split(" ");
		if (theTitle.length>2) {
			return theTitle[theTitle.length-1]
		}
	}
	
	
	
	function currentServer(){
		var serverr = window.location.hostname.replace(/\.travian\./, "")
		return serverr
	}
	
	
	
	function getMainVillageid(){
		if (window.location.href.split("?uid=")[1] == getuid()) {
			if (window.location.href.indexOf("spieler.php") != -1) {
				var mainvi = document.evaluate('//table[@id="villages"]/descendant::span[@class="none3"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				themainv = mainvi.singleNodeValue.parentNode.firstChild.innerHTML
				mainpos=mainvi.singleNodeValue.parentNode.firstChild.href.match(/\d{2,}(?=&)/)
				GM_setValue(currentServer() + "_" + getuid() + "_mainvillageName", themainv);
				GM_setValue(currentServer() + "_" + getuid() + "_mainvillageId", getDidFromVillage(themainv));
				for (oo in raceName) {
					therace = new RegExp(raceName[oo])
					if (document.getElementsByTagName("body")[0].innerHTML.match(therace)) {
						GM_setValue(currentServer() + "_" + getuid() + "_raceID", oo.toString());
						break;
					}
				}
				coordx=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/\(-?\d{1,3}/g)[0].match(/-?\d{1,3}/)
				coordy=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/-?\d{1,3}\)/g)[0].match(/-?\d{1,3}/)
				GM_setValue(currentServer() + "_" + getuid() + "_mainVillageCoord", coordx+"/"+coordy)
				GM_setValue(currentServer() + "_" + getuid() + "_mainVillagePosition", mainpos.toString())
			}
		}
	}
	
	function getResourceCap(){
		resource = [document.getElementById("l4").innerHTML.split("/")[0], document.getElementById("l3").innerHTML.split("/")[0], document.getElementById("l2").innerHTML.split("/")[0], document.getElementById("l1").innerHTML.split("/")[0]]
		resstring = resource.join("/")
		WarehouseCap = document.getElementById("l4").innerHTML.split("/")[1];
		GranaryCap = document.getElementById("l1").innerHTML.split("/")[1];
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_WarehouseCap", WarehouseCap);
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_GranaryCap", GranaryCap);
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_ResourceNow", resstring);
	}


	function HttpRequire(url, v, ta, k, l){
		GM_log("come into HttpRequire(), at "+getvillagefromdid(v)+" to build "+ta[ta.length-1])
		var myower = window.clearInterval(myower)
		if (url) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: "",
				onload: function(){
					switch (k) {
						case "0"://resource updata
							GM_deleteValue(currentServer() + "_" + getuid() + "_" + v + "_ResourceUpdataTime")
							GM_setValue(currentServer() + "_" + getuid() + "_" + v + "_autoResourceDone", ta[1])
							if (l == ta[2]) {
								deleteTaskFromCookie(v, ta)
							}
							break;
						case "1"://build task
							GM_deleteValue(currentServer() + "_" + getuid() + "_" + v + "_BuildingUpdataTime")

							switch (ta[0]) {
								case "0"://build updata
									if (l == ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									break;
								case "1"://new build
									if (l == ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
										var changeToUP=new Array();
										changeToUP[0]="0"
										changeToUP[1]=ta[1]
										changeToUP[2]=ta[2]
										changeToUP[3]=ta[4]
										changeToUP[4]=ta[5]
										deleteTaskFromCookie(v, ta,changeToUP)
									}
									break;
							}
						
							break;
						case "2":
							GM_deleteValue(currentServer() + "_" + getuid() + "_" + v + "_UpdataTime")
							GM_setValue(currentServer() + "_" + getuid() + "_" + v + "_autoResourceDone", ta[1])

							switch (ta[0]) {
								case "0":
									if (l == ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									break;
								case "1":
									if (l == ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
										var changeToUP=new Array();
										changeToUP[0]="0"
										changeToUP[1]=ta[1]
										changeToUP[2]=ta[2]
										changeToUP[3]=ta[4]
										changeToUP[4]=ta[5]
										deleteTaskFromCookie(v, ta,changeToUP)
									}
									break;
							}
							break;
					}
					printMSG(gametext[7] + getvillagefromdid(v) + otherText[6]);
					window.location.href="http://" + window.location.hostname + "/dorf1.php"
					GM_log("built ok!!!!lalalalala!!!!!!!!!!!!!!!!!!!")
				},
			})
		}
		else {
			var nextt=new Date();
			tt=nextt.getTime()+1800000;
			nextt.setTime(tt)
			switch (k){
				case "0":
					GM_setValue(currentServer() + "_" + getuid() + "_" + v + "_ResourceUpdataTime",nextt)
					break;
				case "1":
					GM_setValue(currentServer() + "_" + getuid() + "_" + v + "_BuildingUpdataTime",nextt)
					break;
				case "2":
					GM_setValue(currentServer() + "_" + getuid() + "_" + v + "_UpdataTime",nextt)
					break;
			}
		}
	}
	
	
	
	function setTaskCookies(){//1_25_1_undefined_1248453089000_Hero
		taskkindss = $("taskkindss").value;
		crtvillagee = $("crtvillagee").value;
		buildnamee = $("buildNamee").value;
		bidid = $("bidid").value;
		levelselect = $("levelselect").value;
		taskTimee = $("userSetTime").value;
		todday = new Date(taskTimee)
		userSetTime = todday.getTime()
		
		switch (taskkindss) {
			case "0":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + userSetTime+"_"+buildnamee
				
				break;
			case "1":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + getGidFromName(buildnamee) + "_" + userSetTime+"_"+buildnamee
				break;
		}
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
		document.body.removeChild(document.getElementById("taskForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
	}
	
	
	
	/****************************************************************************/
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;
	
	
	function setOption(key, value){
		var options = GM_getValue(currentServer() + "_" + getuid() + "_option");
		if (options & options != '' & options != null) {
			options = options.split(",");
		}
		else {
			GM_setValue(currentServer() + "_" + getuid() + "_option", "")
			options = [];
		}
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			options.push(key);
			options.push(value);
		}
		else {
			options[myOption + 1] = value;
		}
		options = options.join(",");
		GM_setValue(currentServer() + "_" + getuid() + "_option", options);
	}
	
	function getOption(key, defaultValue, type){
		var options = GM_getValue(currentServer() + "_" + getuid() + "_option");
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			return defaultValue;
		}
		switch (type) {
			case "boolean":
				var myOption = (options[myOption + 1] == "true") ? true : false;
				break;
			case "integer":
				var myOption = parseInt(options[myOption + 1]);
				break;
			case "string":
			default:
				var myOption = options[myOption + 1];
				break;
		}
		return myOption;
	}
	
	function mouseCoords(ev){
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	
	function makeClickable(object){
		object.onmousedown = function(){
			dragObject = this;
		}
	}
	
	function getMouseOffset(target, ev){
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {
			x: mousePos.x - docPos.x,
			y: mousePos.y - docPos.y
		};
	}
	
	function getPosition(e){
		var left = 0;
		var top = 0;
		while (e.offsetParent) {
			left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
			top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
			e = e.offsetParent;
		}
		left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
		return {
			x: left,
			y: top
		};
	}
	
	function mouseMove(ev){
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		
		if (dragObject) {
			dragObject.style.position = 'fixed';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + "px";
			dragObject.style.left = (mousePos.x - mouseOffset.x) + "px";
		}
		lMouseState = iMouseDown;
		return false;
	}
	
	function mouseUp(ev){//
		if (dragObject) {
			switch (dragObject.id) {
				case "demolistform_wrapper":
					var key = "DEMOLISH_POSITION";
					break;
				case "tranlmtform_wrapper":
					var key = "TRANLMT_POSITION";
					break;
				case "tasklisttable_wrapper":
					var key = "TASKLIST_POSITION";
					break;				
				case "taskForm_wrapper":
					var key = "FORM_POSITION";
					break;
				case "tranForm_wrapper":
					var key = "TRAN_POSITION";
					break;
				case "MSG_wrapper":
					var key = "MSG_POSITION";
					break;
				default:
					var key = "LIST_POSITION";
					break;
			}
			setOption(key, dragObject.style.top + "_" + dragObject.style.left);
		}
		dragObject = null;
		iMouseDown = false;
	}
	
	function mouseDown(ev){
		var mousePos = mouseCoords(ev);
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')) {
			return false;
		}
	}
	
	
	function makeDraggable(item){
		if (!item) 
			return;
		item.addEventListener("mousedown", function(ev){
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		}, false);
	}
	
	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("mousedown", mouseDown, false);
	document.addEventListener("mouseup", mouseUp, false);


	/****************************************************************************/

	function createDemolishlnk(){
		var nposi=$("contract");
		var errors = document.evaluate('//p[@class="none"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		nextposition=(nposi)?nposi:errors.singleNodeValue
		var demolishdiv=document.createElement("div");
		demolishdiv.id="demolishdiv"
		var demolishlnk=document.createElement("a");
		demolishlnk.id="demolishlnk";
		demolishlnk.href="#";
		demolishlnk.innerHTML="&#160;&#160;"+taskoftext[18] +"&#160;&#160;";
		demolishlnk.addEventListener("click", createDemolishFloat, false);
		demolishdiv.appendChild(demolishlnk);
		nextposition.parentNode.insertBefore(demolishdiv,nextposition);
	}
	
	
	
	function createNewbuildLnk(){
		crtvillagedid = currentID();
		buildnextlevel="1";
		buildidss = window.location.href.match(/[^d]id=\d{1,2}/);
		buildidid = buildidss.toString().match(/\d{1,2}/);		
		var allnewbuilds = document.evaluate('//div[@id="build"]/table[@class="new_building"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allnewbuilds.snapshotLength; i++) {
			buildName=allnewbuilds.snapshotItem(i).previousSibling.previousSibling.innerHTML;
			buildName=(buildName.indexOf(allbuildwithid[10])!=-1)?allbuildwithid[10]:((buildName.indexOf(allbuildwithid[11])!=-1)?allbuildwithid[11]:buildName)
			buildgid=getGidFromName(buildName);
			buildmaxlevel = maxlevel[buildgid]
			theposition = allnewbuilds.snapshotItem(i).lastChild
			
			var createUrl = document.createElement("a");
			createUrl.id = "createnewurl";
			createUrl.href = "#";
			createUrl.innerHTML = "&#160;&#160;" + taskoftext[1]+"&#160;&#160;" ;
			createUrl.setAttribute("crtvillage", crtvillagedid);
			createUrl.setAttribute("buildName", buildName);
			createUrl.setAttribute("buildnextlevel", buildnextlevel);
			createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
			createUrl.setAttribute("buildgid", buildgid);
			createUrl.setAttribute("buildidid", buildidid);
			createUrl.addEventListener("click", createUpdateFloat, false)
			theposition.appendChild(createUrl)	
		}
	}

	
	function createbuildlink(){
		crtvillagedid = currentID();
		mainv1 = GM_getValue(currentServer() + "_" + getuid() + "_mainvillageId");
		h1inner = document.getElementsByTagName("h1")[0].innerHTML.split(" ");
		crtlevel = parseInt(h1inner[h1inner.length-1]);
		switch (h1inner.length) {
			case 3:
				buildName = h1inner[0];
				break;
			case 4:
				buildName = h1inner[0] + " " + h1inner[1]
				break;
			case 5:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2]
				break;
			case 6:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2] + " " + h1inner[3]
				break;
		}
		for (yyy in allbuildwithid) {
			if (buildName == allbuildwithid[yyy]) {
				buildmaxlevel = maxlevel[yyy];
				if (crtvillagedid == mainv1 && yyy < 5) {
					buildmaxlevel *= 2 //mainvillage resource level 20
				}
			}
		}
		if (crtlevel < buildmaxlevel) {
			buildnextlevel = crtlevel + 1;
			if (window.location.href.indexOf("&gid=17") != -1) {
				var rere = document.evaluate('id("textmenu")/descendant::a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				buildidid = rere.singleNodeValue.href.split("id=")[1]
			}
			else {
				buildidss = window.location.href.match(/[^dg]id=\d{1,2}/);
				buildidid = buildidss.toString().match(/\d{1,2}/);
			}
			
			if ($("contract")) {
				theposition = $("contract").nextSibling
				var createUrl = document.createElement("a");
				createUrl.id = "createUrl";
				createUrl.href = "#";
				createUrl.innerHTML = "&#160;&#160;" + taskoftext[0] + "&#160;&#160;";
				createUrl.setAttribute("crtvillage", crtvillagedid);
				createUrl.setAttribute("buildName", buildName);
				createUrl.setAttribute("buildnextlevel", buildnextlevel);
				createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
				createUrl.setAttribute("buildidid", buildidid);
				createUrl.addEventListener("click", createUpdateFloat, false)
				theposition.parentNode.insertBefore(createUrl, theposition.nextSibling)
			}
		}
	}
	
	function createDemolishFloat(){
		var options=document.evaluate('//select[@name="abriss"]/descendant::option', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		GM_log(options.snapshotItem(0).innerHTML)
		myoptions=""
		for (var i=0; i<options.snapshotLength; i++) {
			if(options.snapshotItem(i).innerHTML.indexOf(gametext[16])!=-1){continue;}
			myoptions+="<option value='"+options.snapshotItem(i).innerHTML+"'>"+options.snapshotItem(i).innerHTML+"</option>"
		}
		var DemoListForm=document.createElement("form");
		DemoListForm.id="demolistform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"demolistform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		DemoListForm.innerHTML = floatClose;
		DemoListForm.innerHTML += "<br />" + taskoftext[18].big() +"<br /><br />";
		DemoListForm.innerHTML+=  gametext[7] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br /><br />";		
		DemoListForm.innerHTML+=taskoftext[18]+": <select id='selecteddemo'>"+myoptions+"</select><br /><br />"

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setDemoCookies, true);
		DemoListForm.appendChild(tSubmitBtn);
		
		var doWrapper = document.createElement("div");
		doWrapper.id = "demolistform_wrapper";
		doWrapper.appendChild(DemoListForm);
		
		var formCoords = getOption("DEMOLISH_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		doWrapper.style.top = formCoords[0];
		doWrapper.style.left = formCoords[1];
		
		document.body.appendChild(doWrapper);
		makeDraggable($("demolistform"));		
	}
	
	function setDemoCookies(){
		selecteddemo = $("selecteddemo").value;
		theID=selecteddemo.split(". ")[0]
		theBuild=selecteddemo.split(". ")[1].split(" ")[0]
		crtlevel=selecteddemo.split(". ")[1].split(" ")[1]
		
		thisTask = "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
		document.body.removeChild($("demolistform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
	}
	
	function getGidFromName(name){
		for (i in allbuildwithid) {
			if (allbuildwithid[i]==name) {
				return i
			}
		}		
	}
	
	
	function createAutoResLink(){
		var producee = document.getElementById("production");
		var autoResDiv = document.createElement("div");
		autoResDiv.id = "autoResdiv";
		autoResDiv.innerHTML = taskoftext[2].bold() + ":&#160;&#160;";
		producee.parentNode.insertBefore(autoResDiv, producee.nextSibling);

		
		var autoResStatus = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource", "0")
		if (autoResStatus == "0") {
			autoResDiv.innerHTML += taskoftext[3].fontcolor("gray") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform1"
			autoResLnk.href = "#";
			autoResLnk.innerHTML = taskoftext[4];
			autoResLnk.addEventListener("click", createAutoResFloat, false)
		}
		else {
			autoResDiv.innerHTML += taskoftext[5].fontcolor("green") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform2"
			autoResLnk.href = "#";
			autoResLnk.innerHTML = taskoftext[6];
			autoResLnk.addEventListener("click", closeAutoRes, false)
		}
		autoResDiv.appendChild(autoResLnk);

/***********************************transport limit here***************************************************/
		var transLimit=document.createElement("div");
		transLimit.id="translimit";
		transLimit.innerHTML=taskoftext[13].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(transLimit, autoResDiv.nextSibling);
		
		var userTranSetup = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_userTranSetup", "false")
		transLimit.innerHTML+=(userTranSetup=="false")?taskoftext[14]:userTranSetup
		transLimit.innerHTML+="&#160;&#160;";
		
		var changeIt=document.createElement("a");
		changeIt.id="changeit";
		changeIt.href="#";
		changeIt.innerHTML=taskoftext[15]
		changeIt.addEventListener("click", createTranLimitFlt, false)
		transLimit.appendChild(changeIt);
/***********************************transport limit here***************************************************/
	} 
	
	function createTranLimitFlt(){
		var userTranSetup = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_userTranSetup", "false")
		usersetup=(userTranSetup=="false")?taskoftext[14]:userTranSetup 
		var TransLimitForm = document.createElement("form");
		TransLimitForm.id="translimitform"
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranlmtform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		TransLimitForm.innerHTML = floatClose;
		TransLimitForm.innerHTML += "<br />" + taskoftext[15].big() +taskoftext[13].big()+"<br /><br />";
		TransLimitForm.innerHTML += gametext[7] + ":  <select id='crtvillagee'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br /><br />";
		TransLimitForm.innerHTML += taskoftext[13]+":  <select id='crtlimit'><option value='" + usersetup + "'>" + usersetup + "</option></select><br /><br />";
		TransLimitForm.innerHTML += taskoftext[15]+gametext[6]+":  <select id='reslimitto'>"+resLimitOption() + "</select>";
		TransLimitForm.innerHTML += "  "+"<select id='croplimitto'>"+cropLimitOption() + "</select><br /><br />";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranLmtCookies, true);
		TransLimitForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranlmtform_wrapper";
		tWrapper.appendChild(TransLimitForm);
		
		var formCoords = getOption("TRANLMT_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("translimitform"));		
	}
	
	function setTranLmtCookies(){
		var userSet = new Array()
		userSet[0] = $("reslimitto").value;
		userSet[1] = $("croplimitto").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_userTranSetup")
		}
		else {
			GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_userTranSetup", userSet.join("/"))
		}
		document.body.removeChild($("tranlmtform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		createAutoResLink()
		msg = taskoftext[13].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function resLimitOption(){
		var WareCap = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_WarehouseCap");
		WareCap=parseInt(WareCap)
		var string="<option value='"+WareCap*0.8+"'>"+taskoftext[16]+"</option><option value='default'>"+taskoftext[14]+"</option>"
		for(i=10; i<101; i=i+10){
			cnm=(WareCap*i/100).toString()
			string += "<option value='" + cnm + "'>" + cnm + "</option>"
		}
		return string
	}
	
	
	function cropLimitOption(){
		var GranCap = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_GranaryCap");
		GranCap=parseInt(GranCap)
		var string="<option value='"+GranCap*0.8+"'>"+taskoftext[17]+"</option><option value='default'>"+taskoftext[14]+"</option>"
		for(i=10;i<101;i=i+10){
			rpy=(GranCap*i/100).toString()
			string += "<option value='" + rpy + "'>" + rpy + "</option>"
		}
		return string
	}
	
	
	function createAttackFloat(){
		var AttackForm = document.createElement("form");
		AttackForm.id = "attackform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"attackform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		AttackForm.innerHTML = floatClose;
		
		if (!GM_getValue(currentServer() + "_" + getuid() + "_raceID")) { 
			AttackForm.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[8] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee

			AttackForm.innerHTML += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
			AttackForm.innerHTML +=otherText[9] + "<br /><br />";
		}
		else {
			AttackForm.innerHTML += "<br />" + taskoftext[19].big() + "<br /><br />";
			AttackForm.innerHTML += addTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br />";
			AttackForm.innerHTML += addTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "' /><br />"
			
			var attackTse = null;
			var attacktypes = document.evaluate('//table[@ id="coords"]/descendant::input[@type="radio"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				if (attacktypes.snapshotItem(i).checked) {
					attackTse = i + 2;
				}
			}
			if(document.getElementsByName("t8")[0].value!="" && attackTse==4){
				attackTse=3;
			}
			AttackForm.innerHTML += taskoftext[20] + ":  <select id='attacktype'><option value='" + attackTse + "'>" + attacktype[attackTse - 2] + "</option></select>";
			
			ra = GM_getValue(currentServer() + "_" + getuid() + "_raceID");
			ra = parseInt(ra);
			var mytable = document.createElement("table");
			mytable.id = "mytablee"
			mytable.innerHTML += "<tr><td>" + troops[ra][0] + "</td><td><input type='text' id='t1' style='width:40px' value='" + document.getElementsByName("t1")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][1] + "</td><td><input type='text' id='t2' style='width:40px' value='" + document.getElementsByName("t2")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][2] + "</td><td><input type='text' id='t3' style='width:40px' value='" + document.getElementsByName("t3")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][3] + "</td><td><input type='text' id='t4' style='width:40px' value='" + document.getElementsByName("t4")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][4] + "</td><td><input type='text' id='t5' style='width:40px' value='" + document.getElementsByName("t5")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][5] + "</td><td><input type='text' id='t6' style='width:40px' value='" + document.getElementsByName("t6")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][6] + "</td><td><input type='text' id='t7' style='width:40px' value='" + document.getElementsByName("t7")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][7] + "</td><td><input type='text' id='t8' style='width:40px' value='" + document.getElementsByName("t8")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][8] + "</td><td><input type='text' id='t9' style='width:40px' value='" + document.getElementsByName("t9")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][9] + "</td><td><input type='text' id='t10' style='width:40px' value='" + document.getElementsByName("t10")[0].value + "' /></td></tr>"
			if(document.getElementsByName("t8")[0].value!="" && attackTse!=2){
				mytable.innerHTML += "<tr><td colspan='4'><hr /></td>"
				mytable.innerHTML += "<tr><td colspan='2'>" + taskoftext[25] + ":</td><td colspan='2'>&#160;&#160;" + taskoftext[25] + ":</td></tr>"
				mytable.innerHTML += "<tr><td colspan='2'><select id='firetarget1'>" + getFireTarget() + "</select></td><td colspan='2'>&#160;&#160;<select id='firetarget2'><option value='0'>"+gametext[16]+"</option>" + getFireTarget() + "</select></td></tr>"
				mytable.innerHTML += "<tr><td colspan='4'><hr /></td>"
			}
			AttackForm.appendChild(mytable);
			
			if (document.getElementsByName("t11").length>0 && document.getElementsByName("t11")[0].value!="") {
				AttackForm.innerHTML += troops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' selected='selected'>Yes</option></select><br />"
			}
			else {
			AttackForm.innerHTML += troops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' >Yes</option></select><br />"
			}
			
			if(document.getElementsByName("x")[0].value!=""&&document.getElementsByName("y")[0].value!=""){
				AttackForm.innerHTML += taskoftext[21]+":&#160;&#160;<input type='text' id='troopstime' style='width:120px' readOnly= 'true' value='"+getTroopsTime()+"' /><br />"
			}
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth()+1;
			dat = tod.getDate();
			hou = tod.getHours();
			if(hou<10){hou="0"+hou}
			minu = tod.getMinutes();
			if(minu<10){minu="0"+minu}
			sec = tod.getSeconds();
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			AttackForm.innerHTML +=gametext[4]+":&#160;&#160;<input type='text' id='startime' style='width:146px' value='"+nowtime+"' /><br />"
			
			AttackForm.innerHTML += taskoftext[22]+":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;"+taskoftext[23]+":&#160;<input type='text' id='interval' style='width:60px' value='"+taskoftext[24]+"' /><br /><br />"
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setAttackCookies, true);
			AttackForm.appendChild(tSubmitBtn);
		}
		var aWrapper = document.createElement("div");
		aWrapper.id = "attackform_wrapper";
		aWrapper.appendChild(AttackForm);
		
		var formCoords = getOption("ATTACK_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("attackform"));
		if($("troopstime")){
			$("interval").value=doublee($("troopstime").value)
		}
	}
	
	
	function doublee(t){
		if (t == taskoftext[27]) {
			return taskoftext[27]
		}
		hh=Number(t.split(":")[0])
		mm=Number(t.split(":")[1])
		ss=Number(t.split(":")[2])
		all=hh*3600000+mm*60000+ss*1000
		aTime=all*2+10000;
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
		return hh+":"+mm+":"+ss		
	}
	
	function getFireTarget(){
		var thetarget="<option value='99'>"+taskoftext[26]+"</option>"
		for (i in allbuildwithid){
			if (i==4){continue;}
			thetarget+="<option value='"+i+"'>"+allbuildwithid[i]+"</option>"
		}
		return thetarget
	}
	
	function getTroopsTime(){
		theSlow = 30;
		for (u = 0; u < 10; u++) {
			x = u + 1;
			if (document.getElementsByName("t" + x)[0].value == "") {
				continue;
			}
			theSlow = Math.min(theSlow, parseInt(troopspeed[ra][u]))
		}
		if (document.getElementsByName("t11").length >0 && document.getElementsByName("t11")[0].value!="") {
			herosp = GM_getValue(currentServer() + "_" + getuid() + "_heroSpeed", "false")
			if (herosp != "false") {
				theSlow = Math.min(theSlow, parseInt(herosp))
			}
			else {
				printMSG(otherText[9] + "<br /><br />")
			}
		}
		if(theSlow==30){
			return taskoftext[27]
		}
		
		posi1 = getPosFromVill(currentVillageName()); 
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = document.getElementsByName("x")[0].value
		sy2 = document.getElementsByName("y")[0].value

		qDist = getDistance(sx1, sy1, sx2, sy2)
		var aTime = Math.round(qDist * 3600000 / theSlow);
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
		return hh+":"+mm+":"+ss
	}
	
	
	function getHeroSpeed(){
		if (document.getElementsByTagName("h1")[0].innerHTML.indexOf(allbuildwithid[37])!=-1){
			var myhero=document.evaluate('//table[@id="distribution"]/descendant::span[@class="info"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var herokind=myhero.singleNodeValue.innerHTML.split("(")[1].split(")")[0]
			
			var ra=GM_getValue(currentServer() + "_" + getuid() + "_raceID");
			ra = parseInt(ra);
			for(i in troops[ra]){
				if (troops[ra][i]==herokind){
					GM_setValue(currentServer() + "_" + getuid() + "_heroSpeed",troopspeed[ra][i])
					break;
				}
			}
		}
	}

	function 	setAttackCookies(){//2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		taskkindss = "2"
	//------------------------------------------------		
		cX = $("xcoord").value
		cY = $("ycoord").value
		targetPosition=getCoordfromXY(cX,cY);
	//------------------------------------------------		
		attackkind=$("attacktype").value
	//------------------------------------------------	
		repeat=$("repeat").value
	//------------------------------------------------	
		var startt=new Date($("startime").value)
		startTime=startt.getTime()
	//------------------------------------------------		
		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0]
			mm=interv.split(":")[1]
			ss=interv.split(":")[2]
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000
		}
		else{
			interval=0;
		}
	//------------------------------------------------		2_241654_3_0_1245413194000_50922000_0,0,21,9,0,12,1,40,0,0,0_99_0
		var troopss=new Array()
			troopss[0]=($("t1").value=="")?"0":$("t1").value
			troopss[1]=($("t2").value=="")?"0":$("t2").value
			troopss[2]=($("t3").value=="")?"0":$("t3").value
			troopss[3]=($("t4").value=="")?"0":$("t4").value
			troopss[4]=($("t5").value=="")?"0":$("t5").value
			troopss[5]=($("t6").value=="")?"0":$("t6").value
			troopss[6]=($("t7").value=="")?"0":$("t7").value
			troopss[7]=($("t8").value=="")?"0":$("t8").value
			troopss[8]=($("t9").value=="")?"0":$("t9").value
			troopss[9]=($("t10").value=="")?"0":$("t10").value
			troopss[10]=($("hero").value=="")?"0":$("hero").value
		troopsoo=troopss.join(",")
	//------------------------------------------------
		kata1=($("firetarget1"))? $("firetarget1").value : "0"
		kata2=($("firetarget2"))? $("firetarget2").value : "0"
	//---------------------------------------------------------------------------------------------------------------
		thisTask = taskkindss + "_" + targetPosition + "_" + attackkind + "_" + repeat + "_" + startTime + "_" + interval + "_" + troopsoo + "_" + kata1 + "_" +kata2;
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild(document.getElementById("attackform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[19].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function createAttackBtn(){
		var bposition = document.evaluate('id("btn_ok")', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		AttackBtn = document.createElement("a");
		AttackBtn.id = "attackbtn";
		AttackBtn.href = "#";
		AttackBtn.innerHTML = "&#160;&#160;"+taskoftext[19]+"&#160;&#160;";
		AttackBtn.addEventListener("click", createAttackFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AttackBtn);
	}
	
	function createTrainLnk(){
		var bposition = document.evaluate('id("btn_train")', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (bposition.singleNodeValue) {
			TrainLnk = document.createElement("a");
			TrainLnk.id = "trainlnk";
			TrainLnk.href = "#";
			TrainLnk.innerHTML = "&#160;&#160;" + taskoftext[32] + "&#160;&#160;";
			TrainLnk.addEventListener("click", createTrainFloat, false);
			bposition.singleNodeValue.parentNode.appendChild(TrainLnk);
		}
	}
	
	function createTrainFloat(){
		var trainForm = document.createElement("form");
		trainForm.id = "trainform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"trainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		trainForm.innerHTML = floatClose;
		var buidd=document.getElementsByName("id")[0].value
		var h1inn = document.getElementsByTagName("h1")[0].innerHTML.split(" ")
		switch (h1inn.length) {
			case 3:
				bbName = h1inn[0];
				break;
			case 4:
				bbName = h1inn[0 + h1inn[1]]
				break;
		}

		if (!GM_getValue(currentServer() + "_" + getuid() + "_raceID")) {
			trainForm.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[8] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			trainForm.innerHTML += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
		}
		else {
			ra = GM_getValue(currentServer() + "_" + getuid() + "_raceID");
			ra = parseInt(ra);
			trainForm.innerHTML += "<br />" + taskoftext[32].big() + "<br /><br />";
			trainForm.innerHTML += addTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br />";
			trainForm.innerHTML += taskoftext[33]+":<select id='trainid' disabled=true><option value='" + buidd + "'>" + bbName + "</option></select><br />";
			trainForm.innerHTML += getTraintable()
			
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth() + 1;
			dat = tod.getDate();
			hou = tod.getHours();
			if (hou < 10) {
				hou = "0" + hou
			}
			minu = tod.getMinutes();
			if (minu < 10) {
				minu = "0" + minu
			}
			sec = tod.getSeconds();
			if (sec < 10) {
				sec = "0" + sec
			}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			trainForm.innerHTML += gametext[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br />"
			trainForm.innerHTML += taskoftext[22]+":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;"+taskoftext[23] + ":&#160;<input type='text' id='interval' style='width:60px' value='" + taskoftext[24] + "' /><br /><br />"
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setTrainCookies, true);
			trainForm.appendChild(tSubmitBtn);
		}
		var tWrapper = document.createElement("div");
		tWrapper.id = "trainform_wrapper";
		tWrapper.appendChild(trainForm);
		
		var formCoords = getOption("TRAIN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("trainform"));
	}
	
	
	function getTraintable(){
		ra = GM_getValue(currentServer() + "_" + getuid() + "_raceID");
		ra = parseInt(ra);
		stainstring = "<table id = 'mytablee'><tr><td>"+TaskKind[4]+":</td><td>&#160;</td></tr><tr><td colspan='2'><hr /></td></tr>"
		switch (ra) {
			case 0:
				switch (bbName){
					case allbuildwithid[19]:
					case allbuildwithid[29]:
						stainstring+="<tr><td style='width:80px'>"+troops[0][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[20]:
					case allbuildwithid[30]:
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[25]:
					case allbuildwithid[26]:
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[0][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 1:
				switch (bbName){
					case allbuildwithid[19]:
					case allbuildwithid[29]:
						stainstring+="<tr><td style='width:80px'>"+troops[1][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[20]:
					case allbuildwithid[30]:
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[25]:
					case allbuildwithid[26]:
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[1][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 2:
				switch (bbName){
					case allbuildwithid[19]:
					case allbuildwithid[29]:
						stainstring+="<tr><td style='width:80px'>"+troops[2][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[20]:
					case allbuildwithid[30]:
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case allbuildwithid[25]:
					case allbuildwithid[26]:
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+troops[2][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break
		}
		stainstring +="<tr><td colspan='2'><hr /></td></tr></table>"
		return stainstring
	}
	
	
	function setTrainCookies(){
		taskkindss = "4"
	//------------------------------------------------	
		trainid=$("trainid").value
	//------------------------------------------------	
		var trooss=new Array();
		trooss[0]=($("t1"))?$("t1").value:"0"
		trooss[1]=($("t2"))?$("t2").value:"0"
		trooss[2]=($("t3"))?$("t3").value:"0"
		trooss[3]=($("t4"))?$("t4").value:"0"
		trooss[4]=($("t5"))?$("t5").value:"0"
		trooss[5]=($("t6"))?$("t6").value:"0"
		trooss[6]=($("t7"))?$("t7").value:"0"
		trooss[7]=($("t8"))?$("t8").value:"0"
		trooss[8]=($("t9"))?$("t9").value:"0"
		trooss[9]=($("t10"))?$("t10").value:"0"
		troopses=trooss.join(",")
	//------------------------------------------------	
		repeat=$("repeat").value
	//------------------------------------------------	
		var startt=new Date($("startime").value)
		startTime=startt.getTime()
	//------------------------------------------------		
		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0]
			mm=interv.split(":")[1]
			ss=interv.split(":")[2]
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000
		}
		else{
			interval=0;
		}
	//------------------------------------------------	
		TrainBuild=bbName
	//------------------------------------------------	
		thisTask = taskkindss + "_" + trainid + "_" +repeat+ "_" +startTime+ "_" +interval+ "_" + troopses + "_" + TrainBuild;
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
	//------------------------------------------------	
		document.body.removeChild($("trainform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[32].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function createAutoTransBtn(){
		var bposition = document.evaluate('id("btn_ok")', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		AutoTransBtn = document.createElement("a");
		AutoTransBtn.id = "autotransbtn";
		AutoTransBtn.href = "#";
		AutoTransBtn.innerHTML = "&#160;&#160;"+taskoftext[8] +"&#160;&#160;";
		AutoTransBtn.addEventListener("click", createAutoTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AutoTransBtn);
		
		customTransBtn= document.createElement("a");
		customTransBtn.id = "customtransbtn";
		customTransBtn.href = "#";
		customTransBtn.innerHTML = "&#160;&#160;"+taskoftext[35] +"&#160;&#160;";
		customTransBtn.addEventListener("click", customTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(customTransBtn);
	}
	
	function customTransFloat(){
		var customTransForm = document.createElement("form");
		customTransForm.id = "customtransform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"customtransform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		customTransForm.innerHTML = floatClose;
		
		customTransForm.innerHTML += "<br />" + taskoftext[35].big() + "<br /><br />";
		customTransForm.innerHTML += addTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br />";
		
		
		var targetPosition = getCoordfromXY(document.getElementsByName("x")[0].value, document.getElementsByName("y")[0].value)
		found = "0"
		allVillagePos=GM_getValue(currentServer() + "_" + getuid() + "_allVillagePos").split(",")
		for (i in allVillagePos) {
			if (allVillagePos[i].split(":")[1] == targetPosition) {
				customTransForm.innerHTML += addTaskText[4] + ":  <select id='targetPosition' disabled=true><option value='" + targetPosition + "'>" + allVillagePos[i].split(":")[0] + "</option></select><br />"
				found = "1"
				break;
			}
		}
		if (found == "0") {
			customTransForm.innerHTML += addTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "' /><br />"
		}
		var mytable = document.createElement("table");
		mytable.id = "mytablee"
		mytable.innerHTML += "<tr><td style='width:60px'>" + resources[0] + ":</td><td><input type='text' id='rr1' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r1")[0].value + "' ></td></tr>"
		mytable.innerHTML += "<tr><td style='width:60px'>" + resources[1] + ":</td><td><input type='text' id='rr2' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r2")[0].value + "' ></td></tr>"
		mytable.innerHTML += "<tr><td style='width:60px'>" + resources[2] + ":</td><td><input type='text' id='rr3' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r3")[0].value + "' ></td></tr>"
		mytable.innerHTML += "<tr><td style='width:60px'>" + resources[3] + ":</td><td><input type='text' id='rr4' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r4")[0].value + "' ></td></tr>"
		
		customTransForm.appendChild(mytable);
		
		tod = new Date();
		ye = tod.getFullYear();
		mon = tod.getMonth() + 1;
		dat = tod.getDate();
		hou = tod.getHours();
		if (hou < 10) {			hou = "0" + hou		}
		minu = tod.getMinutes();
		if (minu < 10) {			minu = "0" + minu		}
		sec = tod.getSeconds();
		if (sec < 10) {			sec = "0" + sec		}
		nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
		customTransForm.innerHTML += gametext[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br />"
		
		
		if (document.getElementsByName("x")[0].value != "" && document.getElementsByName("y")[0].value != "") {
			aTime = getMerchanTime(currentID(), targetPosition)
			hh = Math.floor(aTime / 3600000);
			if (hh < 10) {hh = "0" + hh}
			mm = Math.floor((aTime - hh * 3600000) / 60000);
			if (mm < 10) {	mm = "0" + mm;	}
			ss = Math.ceil((aTime - hh * 3600000 - mm * 60000) / 1000);
			if (ss < 10) {	ss = "0" + ss}
			totime=hh + ":" + mm + ":" + ss
			MerchanTime = doublee(totime)
		}
		else {
			MerchanTime = taskoftext[24];
		}
		customTransForm.innerHTML += taskoftext[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;" + taskoftext[23] + ":&#160;<input type='text'  id='interval' style='width:60px' value='" + MerchanTime + "' /><br /><br />"
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setCustomTranCookies, true);
		customTransForm.appendChild(tSubmitBtn);
		
		var aWrapper = document.createElement("div");
		aWrapper.id = "customtransform_wrapper";
		aWrapper.appendChild(customTransForm);
		
		var formCoords = getOption("CUSTOMTRAN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("customtransform"));
	}
	
	
	function setCustomTranCookies(){
		targetPosition = ($("targetPosition"))?$("targetPosition").value:getCoordfromXY($("xcoord").value,$("ycoord").value)

		repeat=$("repeat").value

		var startt=new Date($("startime").value)
		startTime=startt.getTime()

		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0]
			mm=interv.split(":")[1]
			ss=interv.split(":")[2]
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000
		}
		else{
			interval=0;
		}
	//------------------------------------------------		//8_241654_500,500,500,500_0_1245413194000_interval
		var res=new Array()
			res[0]=($("rr1").value=="")?"0":$("rr1").value
			res[1]=($("rr2").value=="")?"0":$("rr2").value
			res[2]=($("rr3").value=="")?"0":$("rr3").value
			res[3]=($("rr4").value=="")?"0":$("rr4").value
		resourcessss=res.join(",")
	//---------------------------------------------------------------------------------------------------------------
		thisTask = "8_" + targetPosition + "_" + resourcessss + "_" + repeat + "_" + startTime + "_" + interval;
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("customtransform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[35].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	
	function createAutoTransFloat(){
		var TransForm = document.createElement("form");
		TransForm.id = "transform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		TransForm.innerHTML = floatClose;
		TransForm.innerHTML += "<br />" + addTaskText[0].big() + "<br /><br />";
		TransForm.innerHTML += addTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='5'>" + TaskKind[5] + "</option></select><br /><br />";
		TransForm.innerHTML += addTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br /><br />";
		TransForm.innerHTML += addTaskText[5] + ":  <select id='tranmodel'><option value='0'>" + addTaskText[6] + "</option><option value='1'>" + addTaskText[7] + "</option></select><br /><br />"
		TransForm.innerHTML += addTaskText[3] + ":  <select id='villageposition'>" + VillagePosOption() + "</select><br /><br />";
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.id = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranCookies, true);
		TransForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranForm_wrapper";
		tWrapper.appendChild(TransForm);
		
		var formCoords = getOption("TRAN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("transform"));
	}
	
	function setTranCookies(){
		taskkindss = "5"
		tranmodel = $("tranmodel").value
		villageposition = $("villageposition").value;
		targetVid = getVillFromPos(villageposition);
		
		thisTask = taskkindss + "_" + tranmodel + "_" + targetVid + "_" + villageposition;
		allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
		allTarget = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo") + "|" + targetVid : targetVid;
		GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo", allTarget)
		document.body.removeChild(document.getElementById("tranForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[8].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	
	function VillagePosOption(){
		string = "";
		allVillagePos=GM_getValue(currentServer() + "_" + getuid() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[0] == currentVillageName()) {
				continue;
			}
			name = allVillagePos[i].split(":")[0];
			position = allVillagePos[i].split(":")[1];
			string += "<option value='" + position + "'>" + name + "</option>"
		}
		return string
	}
	
	
	function getallVillagePos(){
		allposition = new Array();
		var allX =document.getElementsByClassName("cox")
		var allY =document.getElementsByClassName("coy")
		var allN = document.evaluate('id("vlist")/descendant::a[contains(@href,"newdid")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i in allX) {
			xx = (allX[i].innerHTML.split("(")[1]) ? allX[i].innerHTML.split("(")[1]:allX[i].nextSibling.innerHTML
			yy = (allY[i].innerHTML.split(")")[0]) ? allY[i].innerHTML.split(")")[0]:allY[i].previousSibling.innerHTML
			na = allN.snapshotItem(i).innerHTML + ":" + getCoordfromXY(xx, yy)
			gugaga = allposition.push(na)
		}
		GM_setValue(currentServer() + "_" + getuid() + "_allVillagePos",allposition.join())
	}
	
	
	function getVillFromPos(position){
		allVillagePos=GM_getValue(currentServer() + "_" + getuid() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[1] == position) {
				return getDidFromVillage(allVillagePos[i].split(":")[0]);
				break;
			}
		}
	}
	
	function getPosFromVill(vi){
		if (!$("vlist")&&GM_getValue(currentServer() + "_" + getuid() + "_mainvillageName")==vi) {
			return GM_getValue(currentServer() + "_" + getuid() + "_mainVillagePosition")
		}
		else {
			allVillagePos=GM_getValue(currentServer() + "_" + getuid() + "_allVillagePos").split(",")
			for (i = 0; i < allVillagePos.length; i++) {
				if (allVillagePos[i].split(":")[0] == vi) {
					return allVillagePos[i].split(":")[1];
					break;
				}
			}
		}
	}
	
	
	
	function getCoordfromXY(x, y){
		x = parseInt(x);
		y = parseInt(y);
		var coordZ = (x + 401) + ((400 - y) * 801);
		return coordZ;
	}
	
	function getXfromCoord(z){
		z = parseInt(z);
		var x = ((z - 1) % 801) - 400;
		return x;
	}
	
	function getYfromCoord(z){
		z = parseInt(z);
		var y = 400 - (parseInt(((z - 1) / 801)));
		return y;
	}
	
	
	function createAutoResFloat(){
		var nowtaskstring = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", "false");
		var autoTask = "0_50_100"
		if (GM_getValue(currentServer() + "_" + getuid() + "_mainvillageId", "false") == "false") {
			msg0 = otherText[0].big() + "!!!<br /><br />" + otherText[1] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			msg0 += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
			printMSG(msg0);
		}
		else {
			var msg1 = gametext[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br /><br/ >" + taskoftext[2].bold() + ":&#160;&#160;" + otherText[3] + "<br /><br/ >" + taskoftext[7].bold() + ":<br />" + allbuildwithid[0] + " : " + allbuildwithid[1] + " : " + allbuildwithid[2] + " : " + allbuildwithid[3] + " = " + getResourceRate() + "<br />";
			if (nowtaskstring != "false" && nowtaskstring.indexOf(autoTask) != -1) {
				GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				createAutoResLink()
				printMSG(msg1);
			}
			else {
				autoResT = autoTask + "_" + getResourceRate()
				allTask = (GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")) ? GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask") + "|" + autoResT : autoResT
				GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", allTask)
				GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				createAutoResLink()
				printMSG(msg1);
			}
		}
	}
	
	function closeAutoRes(){
		var msg = gametext[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br /><br/ >" + taskoftext[2].bold() + ":&#160;&#160;" + otherText[4] + "<br />";
		villaa = currentID();
		Task = new Array();
		Task[0] = "0";
		Task[1] = "50";
		Task[2] = "100";
		Task[3] = getResourceRate();
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource");
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_CorpRemain");
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_minLevelId");
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_minLevelCropId");
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_ResourceUpdataTime");
		deleteTaskFromCookie(villaa, Task)
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		createAutoResLink()
		printMSG(msg);
	}
	
	
	function getResourceRate(){
		mydiv = document.getElementById("rx");
		rate = new Array()
		for (i = 0; i < 4; i++) {
			reg = new RegExp(allbuildwithid[i], "g");
			mysearch = mydiv.innerHTML.match(reg)
			newlength = rate.push(mysearch.length);
		}
		return rate.join(":")
	}
	
	
	function printMSG(msg){
		var printmsg = document.createElement("form");
		printmsg.id = "printmsg";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"MSG_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		printmsg.innerHTML = floatClose;
		printmsg.innerHTML += "<br/ >";
		printmsg.innerHTML += msg + "<br /><br/ >";
		
		var mWrapper = document.createElement("div");
		mWrapper.id = "MSG_wrapper";
		mWrapper.appendChild(printmsg);
		
		var formCoords = getOption("MSG_POSITION", "300px_500px");
		formCoords = formCoords.split("_");
		mWrapper.style.top = formCoords[0];
		mWrapper.style.left = formCoords[1];
		
		document.body.appendChild(mWrapper);
		makeDraggable($("printmsg"));
	}
	
	
	function createUpdateFloat(eventt){ //this eventt is the "click" on the TaskUrl. it is a event object.
		myUrl = eventt.target; //by this method, define the event object and get the <a> that call this function. 
		crtvillagee = myUrl.getAttribute("crtvillage");//then the Attributes of the <a> are usable.
		buildNamee = myUrl.getAttribute("buildName");
		bnextlevel = parseInt(myUrl.getAttribute("buildnextlevel"));
		bmaxlevel = parseInt(myUrl.getAttribute("buildmaxlevel"));
		buildgid=(myUrl.getAttribute("buildgid"))?myUrl.getAttribute("buildgid"):"";
		bidid = myUrl.getAttribute("buildidid");
		
		var taskKind=(buildgid=="")?"0":"1"
		var updataform = document.createElement("form");
		updataform.id = "updataform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"taskForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		updataform.innerHTML = floatClose;
		if (bidid < 19 && !GM_getValue(currentServer() + "_" + getuid() + "_mainvillageId")) {
			updataform.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[1] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			updataform.innerHTML += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
		}
		else {
			updataform.innerHTML += "<br />" + addTaskText[0].big() + "<br /><br />";
			updataform.innerHTML += addTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='" + taskKind + "'>" + TaskKind[taskKind] + "</option></select><br /><br />";
			updataform.innerHTML += addTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + crtvillagee + "'>" + getvillagefromdid(crtvillagee) + "</option></select><br /><br />";
			updataform.innerHTML += addTaskText[3] + ':  <select id="buildNamee" disabled=true><option value=\"' + buildNamee + "\">" + buildNamee + "</option></select><br /><br />";
			updataform.innerHTML += gametext[2] + ":  <select id='bidid' disabled=true><option value='" + bidid + "'>" + bidid + "</option></select>&#160;&#160;&#160;";
			updataform.innerHTML += addTaskText[4] + ":  " + levelselect(bnextlevel, bmaxlevel) + "<br /><br />";
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth()+1;
			dat = tod.getDate();
			hou = tod.getHours();
			minu = tod.getMinutes();
			sec = tod.getSeconds();
			if(hou<10){hou="0"+hou}
			if(minu<10){minu="0"+minu}
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			updataform.innerHTML += gametext[4] + ":  <input type='text' id='userSetTime' readOnly= 'true' style='width:130px' value='" + nowtime + "' /><br />";
			updataform.innerHTML += "(" + gametext[5] + ")<br /><br />"
			
			
			var oSubmitBtn = document.createElement("input");
			oSubmitBtn.name = "submitBtn";
			oSubmitBtn.id = "submitBtn";
			oSubmitBtn.value = "OK";
			oSubmitBtn.type = "button";
			oSubmitBtn.addEventListener('click', setTaskCookies, true);
			//			oSubmitBtn.addEventListener('click', addToTasklist, true);
			updataform.appendChild(oSubmitBtn);
		}
		var oWrapper = document.createElement("div");
		oWrapper.id = "taskForm_wrapper";
		oWrapper.appendChild(updataform);
		
		var formCoords = getOption("FORM_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		oWrapper.style.top = formCoords[0];
		oWrapper.style.left = formCoords[1];
		
		document.body.appendChild(oWrapper);
		makeDraggable($("updataform"));
	}
	
	
	function getvillagefromdid(did){
		var getitit = document.evaluate('id("vlist")//a[contains(@href,"' + did + '")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return (getitit.singleNodeValue) ? getitit.singleNodeValue.innerHTML : GM_getValue(currentServer() + "_" + getuid() + "_mainvillageName")
	}
	
	
	function getDidFromVillage(vil){
		var getfoots = document.evaluate('id("vlist")/descendant::a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (getfoots.snapshotLength > 0) {
			for (var i = 0; i < getfoots.snapshotLength; i++) {
				if (getfoots.snapshotItem(i).innerHTML==vil) {
					longstring = getfoots.snapshotItem(i).href.match(/newdid=\d{3,}/);
					break;
				}
			}
			return longstring.toString().match(/\d{3,}/).toString()
		}
		else {
			return GM_getValue(currentServer() + "_" + getuid() + '_singleTownNEWDID')
		}
	}
	
	
	function levelselect(min, max){
		var levelsel = '<select id="levelselect" name="levelselect">'
		for (min; min <= max; min++) {
			levelsel += '<option value="' + min + '">'  + ' ' + gametext[0] + ' ' + min + '</option>'
		}
		levelsel += '</select>';
		return levelsel
	}
	
	
	function getTaskCookies(){
		for (e in getAllVillageNewdids()) { //check all villages task cookies
			whatever = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_waitTask", "false")
			if (whatever != "false") {
				allTasks = whatever.split("|")
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					
					switch (thisTask[0]) {
					
						case "0":// 0 is update
							var buildTimepoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var resourceTimepoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_ResourceUpdataTime", "false")
							var updataTimepoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(currentServer() + "_" + getuid() + "_raceID") == "0") { //Romans double build
								if (thisTask[1] < 19) {//resource
									if (resourceTimepoint == "false") {
										taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
										GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
									}
								}
								else 
									if (thisTask[1] > 18 && thisTask[1] < 42) { //build in village
										if (buildTimepoint == "false") {
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
											GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
										}
									}
									else {//if >=42, it is autoResourceModel
										if (resourceTimepoint == "false") {
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
											GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
										}
									}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
								}
							}
							break;
							
							
						case "1"://"1" is new building 
							var buildTimepoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var updataTimepoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(currentServer() + "_" + getuid() + "_raceID") == "0") { //Romans double build
								if (buildTimepoint == "false") {
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
								}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
								}
							}
							break;
							
							
						case "2":
					 		break;
							
							
/*					 case TaskKind[3]:
					 break;*/
					
					
					 	case "4"://4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_??
					 		break;
							
							
							
						case "5"://"5" is auto transport  5_model_toid_toposition//5_2_0_241654_500,500,500,500_0_1245413194000_interval
							var hereResource = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_ResourceNow", "false")
							var tarResource = GM_getValue(currentServer() + "_" + getuid() + "_" + thisTask[2] + "_ResourceNow", "false")
							var resTraning = GM_getValue(currentServer() + "_" + getuid() + "_" + thisTask[2] + "_ResourceTraning", "0/0/0/0")
							var userTranSetup = GM_getValue(currentServer() + "_" + getuid() + "_" + thisTask[2] + "_userTranSetup", "false")
							var WareCap = GM_getValue(currentServer() + "_" + getuid() + "_" + thisTask[2] + "_WarehouseCap", "false");
							var GranCap = GM_getValue(currentServer() + "_" + getuid() + "_" + thisTask[2] + "_GranaryCap", "false");
							var tranTimePoint = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_to_" + thisTask[3] + "_autoTransTime", "false")
							if (tarResource == "false" || WareCap == "false" || GranCap == "false") {
								window.location.replace("http://" + window.location.hostname + "/dorf2.php?newdid=" + thisTask[2])
							}
							if (hereResource == "false") {
								window.location.replace("http://" + window.location.hostname + "/dorf2.php?newdid=" + getAllVillageNewdids()[e])
							}
							var WareCap = parseInt(WareCap)
							var GranCap = parseInt(GranCap)
							var resnow = tarResource.split("/");
							resnow[0] = parseInt(resnow[0])
							resnow[1] = parseInt(resnow[1])
							resnow[2] = parseInt(resnow[2])
							resnow[3] = parseInt(resnow[3])
							var restran = resTraning.split("/");
							restran[0] = parseInt(restran[0])
							restran[1] = parseInt(restran[1])
							restran[2] = parseInt(restran[2])
							restran[3] = parseInt(restran[3])
							var reshere = hereResource.split("/");
							reshere[0] = parseInt(reshere[0])
							reshere[1] = parseInt(reshere[1])
							reshere[2] = parseInt(reshere[2])
							reshere[3] = parseInt(reshere[3])
							if (tranTimePoint == "false") {
								switch (thisTask[1]) {
									case "0"://building surport model.
										if (userTranSetup == "false") {
											if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
												var transtarget1 = WareCap * 0.8
												var transtarget2 = GranCap * 0.8
											}
											else {//15000 and 16000 remain
												var transtarget1 = 15000;
												var transtarget2 = 16000;
											}
										}
										else {
											var transtarget1 = parseInt(userTranSetup.split("/")[0]);
											var transtarget2 = parseInt(userTranSetup.split("/")[1]);
										}
										break;
										
									case "1":
										var transtarget1 = WareCap * 0.9
										var transtarget2 = GranCap * 0.9
										break;
								}
								if ((resnow[0] + restran[0]+200) < transtarget1 && reshere[0] > 500 || (resnow[1] + restran[1]+200) < transtarget1 && reshere[1] > 500 || (resnow[2] + restran[2]+200) < transtarget1 && reshere[2] > 500 || (resnow[3] + restran[3]+200) < transtarget2 && reshere[3] > 500) {
									trantime = startTransOrSetTime(getAllVillageNewdids()[e], thisTask)
									GM_log("the autotrantime back from startTransOrSetTime() is " + trantime)
								}
							}
						break;
							
					/*	
					 case TaskKind[6]:
					 break;*/
					
					
					 case "7"://"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
					 	var demoTime = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[e] + "_demolishTime", "false");
						if(demoTime=="false"){
							demotimee=startDemoOrSetTime(getAllVillageNewdids()[e], thisTask)
							GM_log("the demotime back from startDemoOrSetTime() is " + demotimee)
						}
						 break;
					 
					 
					 case "8":
					 	break;
					/* case TaskKind[9]:
					 break;  */
					}
				}
			}
		}
	}
	
	function startDemoOrSetTime(vi){
		GM_log("come into startDemoOrSetTime() at " + getvillagefromdid(vi) )
		var myower = window.clearInterval(myower);
		var turl= "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&gid=15"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					GM_log("here is startTransOrSetTime callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					
					var ddg=new Date();
					if(aDoc.getElementById("demolish")){
						gettime=aDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
						demot = gettime.toString().split(":")
						endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000+10000;
						ddg.setTime(endt)
						GM_log("some demolish is doing, next demo start at "+ddg)
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
					else{
						endt = ddg.getTime() +10000;
						ddg.setTime(endt)
						GM_log("No demolish is doing, next demo start soon, just at "+ddg)
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
				}
			}
		}
		return callback()
	}

	
	function startTransOrSetTime(vi, tTask){
		GM_log("come into startTransOrSetTime() from " + getvillagefromdid(vi) + " to " + getvillagefromdid(tTask[2]))
		var myower = window.clearInterval(myower)
		var turl = "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					GM_log("here is startTransOrSetTime callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					
					resource = [aDoc.getElementById("l4").innerHTML.split("/")[0], aDoc.getElementById("l3").innerHTML.split("/")[0], aDoc.getElementById("l2").innerHTML.split("/")[0], aDoc.getElementById("l1").innerHTML.split("/")[0]]
					resstring = resource.join("/")
					GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_ResourceNow", resstring);
					resource[0] = parseInt(resource[0])
					resource[1] = parseInt(resource[1])
					resource[2] = parseInt(resource[2])
					resource[3] = parseInt(resource[3])
					
					var ma = "0"//this is just a mark,if transing is found ,it is "1", else "0".
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = gametext[10] //to
					var reg222 = gametext[12] //back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (alltranTo.snapshotLength > 0) {
						for (var z = 0; z < alltranTo.snapshotLength; z++) {
							if (alltranTo.snapshotItem(z).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var oioi = new Date(lastTrantime)
						GM_log("the traning will arrive at " + oioi)
						GM_setValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						GM_log("all resources on transporting are " + transing.join("/"))
					}
					else {
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
					}
					
					var tarResource = GM_getValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_ResourceNow")
					var WareCap = GM_getValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_WarehouseCap");
					var GranCap = GM_getValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_GranaryCap");
					var userTranSetup = GM_getValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_userTranSetup", "false")
					
					var WareCap = parseInt(WareCap)
					var GranCap = parseInt(GranCap)
					var resnow = tarResource.split("/");
					resnow[0] = parseInt(resnow[0])
					resnow[1] = parseInt(resnow[1])
					resnow[2] = parseInt(resnow[2])
					resnow[3] = parseInt(resnow[3])
					
					var comm = [0, 0]
					var pp = getDelayTime.responseText.match(/<b>\d{3,4}<\/b>/)
					comm[1] = pp.toString().match(/\d{3,4}/)
					var qq = aDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
					GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
					comm[0] = parseInt(comm[0])
					comm[1] = parseInt(comm[1])
					
					switch (tTask[1]) {
						case "0"://building surport model.
							if (userTranSetup == "false") {
								if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
									var transtarget1 = WareCap * 0.8
									var transtarget2 = GranCap * 0.8
								}
								else {//15000 and 16000 remain
									var transtarget1 = 15000;
									var transtarget2 = 16000;
								}
							}
							else {//user setup
								var transtarget1 = parseInt(userTranSetup.split("/")[0]);
								var transtarget2 = parseInt(userTranSetup.split("/")[1]);
							}
							break;
							
						case "1":
							var transtarget1 = WareCap * 0.9
							var transtarget2 = GranCap * 0.9
							break;
					}

					
					var ddg = new Date();
					if ((resnow[0] + transing[0]+200) < transtarget1 || (resnow[1] + transing[1]+200) < transtarget1 || (resnow[2] + transing[2]+200) < transtarget1 || (resnow[3] + transing[3]+200) < transtarget2) {
						if (comm[0] > 0) {
							Tasktime = ddg.getTime() + 10000
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							GM_log("next transport begin from " + d)
							return Tasktime
						}
						else {
							var waitTimee = 1500000000000;
							var allback = aDoc.evaluate('//table//a[contains(@href,"php?d=")]', aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							if (allback.snapshotLength > 0) {
								for (var j = 0; j < allback.snapshotLength; j++) {
									if (allback.snapshotItem(j).innerHTML.indexOf(reg111) != -1) {
										ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
										tttar = ttt.toString().split(":")
										gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
										alltimeback = gotime + getMerchanTime(vi, tTask[3])
										waitTimee = Math.min(waitTimee, alltimeback)
										GM_log("the transout will came back after " + waitTimee)
									}
									else 
										if (allback.snapshotItem(j).innerHTML.indexOf(reg222) != -1) {
											ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
											tttar = ttt.toString().split(":")
											gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
											waitTimee = Math.min(waitTimee, gotime)
											GM_log("the comebacks will come back after..." + waitTimee)
										}
								}
							}
							Tasktime = ddg.getTime() + waitTimee + 10000;
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							GM_log("next transport begin from " + d)
							return Tasktime
						}
					}
					else {
						return "1500000000000"
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime")
						GM_log("resource is enough, delete _autoTransTime in startTransOrSetTime")
					}
				}
			}
		}
		return callback()
	}
	
	
	function fleshTraning(vi, tTask){
		GM_log("come into fleshTraning in " + getvillagefromdid(vi) + "; to " + getvillagefromdid(tTask[2]))
		var myower = window.clearInterval(myower)
		var turl = "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					GM_log("transporting flesh Require callback here")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					var ma = "0"
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = gametext[10]//to
					var reg222 = gametext[12]//back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					
					if (alltranTo.snapshotLength > 0) {
						for (var g = 0; g < alltranTo.snapshotLength; g++) {
							if (alltranTo.snapshotItem(g).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							GM_log("some transport on road, but no out just back...")
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
							GM_setValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var ggr = new Date(lastTrantime)
						GM_log("next reflesh start at " + ggr)
						GM_setValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						GM_log("all resources on transporting are " + transing.join("/"))
						getTargetResource(tTask[2])
						return Transtime
					}
					else {
						GM_log("No transport at all...")
						GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						GM_setValue(currentServer() + "_" + getuid() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						getTargetResource(tTask[2])
						return "1500000000000"
					}
				}
			}
		}
		return callback()
	}
	
	function getTargetResource(vi){
		GM_log("come into getTargetResource at "+getvillagefromdid(vi))
		var myower = window.clearInterval(myower)
		url = "http://" + window.location.hostname + "/build.php" + "?newdid=" + vi
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: "",
			onload: function(response){
				GM_log("getTargetResource Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				resource = [auDoc.getElementById("l4").innerHTML.split("/")[0], auDoc.getElementById("l3").innerHTML.split("/")[0], auDoc.getElementById("l2").innerHTML.split("/")[0], auDoc.getElementById("l1").innerHTML.split("/")[0]]
				resstring = resource.join("/")
				WarehouseCap = auDoc.getElementById("l4").innerHTML.split("/")[1];
				GranaryCap = auDoc.getElementById("l1").innerHTML.split("/")[1];
				GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_WarehouseCap", WarehouseCap);
				GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_GranaryCap", GranaryCap);
				GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_ResourceNow", resstring);
				GM_log("refleshCOOKIE  in getTargetResource() to " + resstring)
			}
		})
	}
	
	function getMerchanTime(vi, positionnum){
		xRace = GM_getValue(currentServer() + "_" + getuid() + "_raceID")
		posi1 = getPosFromVill(getvillagefromdid(vi));
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = getXfromCoord(positionnum)
		sy2 = getYfromCoord(positionnum)
		qDist = getDistance(sx1, sy1, sx2, sy2)
		xRace=parseInt(xRace);
		var aTime = Math.round(qDist * 3600000 / mts[xRace]);
		return aTime;
	}
	
	
	function getDistance(sx1, sy1, sx2, sy2){
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);
		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}
	
	
	function startBuildOrSetTime(Villageid, str, task){
		GM_log("come into startBuildOrSetTime() at "+getvillagefromdid(Villageid))
		var myower = window.clearInterval(myower)
		var turl = "http://" + window.location.hostname + "/dorf1.php?newdid=" + Villageid
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					GM_log("startBuildOrSetTime callback here!")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					if (task[0] == "0" && task[1] > 42) {//autoResource date get
						var CorpRemain = aDoc.evaluate("id('res')/descendant::td", aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						hehe = CorpRemain.snapshotLength - 1
						corpcost = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[0]
						corpprod = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[1]
						GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_CorpRemain", (corpprod - corpcost))
						
						var mainVI=GM_getValue(currentServer() + "_" + getuid() + "_mainvillageId");
						var maxreslevel=(mainVI==Villageid)?20:10
						var doneID = GM_getValue(currentServer() + "_" + getuid() + "_" + Villageid + "_autoResourceDone", "20")
						var allRess = aDoc.evaluate('id("rx")//area[contains(@href,"build.php?id=")]', aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						var numm = 20;
						var numm2 = 20;
						for (var i = 0; i < allRess.snapshotLength; i++) {//get the min level 
							temppp=allRess.snapshotItem(i).title.split(" ")
							ddq = parseInt(temppp[temppp.length-1])
							numm = Math.min(numm, ddq);
						}
						sounttt = "0";//this is just a mark....found XXX, change to "1", no found remain "0"
						for (j = 0; j < allRess.snapshotLength; j++) {
							temppp=allRess.snapshotItem(j).title.split(" ")
							if (parseInt(temppp[temppp.length-1]) == numm && allRess.snapshotItem(j).href.split("id=")[1].toString() != doneID) {
								myid = allRess.snapshotItem(j).href.split("id=")[1];
								GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_minLevelId", myid)
								sounttt = "1";
								break;
							}
						}
						if (sounttt == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm >= maxreslevel - 1) {//all resources updats are finished
								closeAutoRes();
							}
							else {
								for (n = 0; n < allRess.snapshotLength; n++) {
									temppp=allRess.snapshotItem(n).title.split(" ")
									if (parseInt(temppp[temppp.length-1]) == (numm + 1) && allRess.snapshotItem(n).href.split("id=")[1].toString() != doneID) {
										myid = allRess.snapshotItem(n).href.split("id=")[1];
										GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_minLevelId", myid)
										break;
									}
								}
							}
						}
						
						for (k = 0; k < allRess.snapshotLength; k++) {//collect all Crop level ,find the lowest one
							if (allRess.snapshotItem(k).title.split(" ")[0] == allbuildwithid[3]) {
								ffq = parseInt(allRess.snapshotItem(k).title.split(" ")[2])
								numm2 = Math.min(numm2, ffq);
							}
						}
						mouu = "0"//this is a mark too, to find the minlevel crop
						for (l = 0; l < allRess.snapshotLength; l++) {
							if (parseInt(allRess.snapshotItem(l).title.split(" ")[2]) == numm2 && allRess.snapshotItem(l).title.split(" ")[0] == allbuildwithid[3] && allRess.snapshotItem(l).href.split("id=")[1].toString() != doneID) {
								myids = allRess.snapshotItem(l).href.split("id=")[1];
								GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_minLevelCropId", myids)
								mouu = "1";
								break;
							}
						}
						if (mouu == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm2 < maxreslevel - 1) {
								for (m = 0; m < allRess.snapshotLength; m++) {
									if (parseInt(allRess.snapshotItem(m).title.split(" ")[2]) == (numm2 + 1) && allRess.snapshotItem(m).title.split(" ")[0] == allbuildwithid[3] && allRess.snapshotItem(m).href.split("id=")[1].toString() != doneID) {
										myids = allRess.snapshotItem(m).href.split("id=")[1];
										GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_minLevelCropId", myids)
										break;
									}
								}
							}
						}
					}//autoResouce data end here
					
					var aValue = aDoc.evaluate('id("building_contract")/descendant::td', aElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (aValue.snapshotLength > 0) {
						var testttt = "0"//this is a mark for search result, default is 0 ,if found ,change to 1
						for (var i = 0; i < aValue.snapshotLength; i++) {
							thestring = aValue.snapshotItem(i).innerHTML.split(" (")[0]
							if (thestring!=null &&str.indexOf(thestring) != -1) {//index resource name from the resourcestring
								GM_log("which in building is " + thestring)
								testttt = "1"
								var tt = aValue.snapshotItem(i).parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								GM_log("i get the building time "+tt)
								ttar = tt.toString().split(":")
								arriveTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 6000
								ddg = new Date()
								Tasktime = ddg.getTime() + arriveTime
								switch (str) {
									case allsourceString:
										GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
										GM_log("startBuildOrSetTime(Villageid):resource is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										GM_log("next task begin from " + d)
										return Tasktime
										break;
									case allbuildString:
										GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
										GM_log("startBuildOrSetTime(Villageid):building is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										GM_log("next task begin from " + d)
										return Tasktime
										break;
									case allString:
										GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
										GM_log("startBuildOrSetTime(Villageid):something is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										GM_log("next task begin from " + d)
										return Tasktime
										break;
								}
							}
						}
						if (testttt == "0") {//another kinds of building is building
							GM_log("oh,another kinds of building is building, i can updata immediately")
							ddg = new Date()
							Tasktime = ddg.getTime() + 6000 //10 seconds later start build.
							switch (str) {
								case allsourceString:
									GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
									GM_log("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
									return Tasktime
									break;
								case allbuildString:
									GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
									GM_log("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
									return Tasktime
									break;
								case allString: //it is impossible.
									GM_log("only if allsourceString or allbuildString is wrong, this will be displayed.")
									break;
							}
						}
					}
					else {
						GM_log("now,i find no build is building")
						ddg = new Date()
						Tasktime = ddg.getTime() + 5000
						switch (str) {
							case allsourceString:
								GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
								GM_log("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allbuildString:
								GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
								GM_log("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allString:
								GM_setValue(currentServer() + "_" + getuid() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
								GM_log("startBuildOrSetTime(Villageid):something will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
						}
					}
				}
			}
		}
		return callback()
	}
	
	
	function startBuildnow(vill, kind){
		GM_log("come into startBuildnow() at " + getvillagefromdid(vill))
		var myower = window.clearInterval(myower)
		whatever = GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_waitTask", "false")
		allTasks = whatever.split("|")
		switch (kind) {
			case "0"://Romans Resource
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] < 19) {
						b = getthebuildUrl(vill, thisTask)
						if (b) {
							buildurl = "http://" + window.location.hostname + "/" + b
							thislevel = parseInt(GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor() == errorText[8]) {
								GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime")
								window.location.href="http://" + window.location.hostname + "/dorf1.php"
								break;
							}
							else {
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
								GM_log(getErrorInfor() + ", updata delay 30 minutes")
								window.location.href="http://" + window.location.hostname + "/dorf1.php"
								break;
							}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 42) {//Romans autoResource
							thisTask[1] = getAutoResourceId(vill)
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = "http://" + window.location.hostname + "/" + b
								thislevel = parseInt(GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_crtBuildlevel")) + 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == errorText[5]) {
									GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime")
									addtaskbefore(vill, "10", kind);
								}
								else 
									if (getErrorInfor() == errorText[6]) {
										GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime")
										addtaskbefore(vill, "11", kind);
									}
									else 
										if (getErrorInfor() == errorText[0] || getErrorInfor().indexOf(errorText[7]) != -1) {
											var dtime = new Date();
											delaytime = dtime.getTime() + 1800000;
											dtime.setTime(delaytime);
											GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
											GM_log(getErrorInfor() + ", updata delay 30 minutes")
											window.location.href="http://" + window.location.hostname + "/dorf1.php"
											break;
										}
										else {
											GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_ResourceUpdataTime")
											GM_log("No resource updata task found, delete ResourceUpdataTime in startBuildnow()")
											window.location.href="http://" + window.location.hostname + "/dorf1.php"
											break;
										}
							break;
						}
				}
				break;
			case "1"://Romans building
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] > 18 && thisTask[1] < 42) {
						b = getthebuildUrl(vill, thisTask)
						if (b) {
							buildurl = "http://" + window.location.hostname + "/" + b
							thislevel = parseInt(GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
							GM_log(getErrorInfor() + ", updata delay 30 minutes")
							window.location.href="http://" + window.location.hostname + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "1") {//Romans new build
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = "http://" + window.location.hostname + "/" + b
								thislevel = 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else {
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
								GM_log(getErrorInfor() + ", updata delay 30 minutes")
								window.location.href="http://" + window.location.hostname + "/dorf1.php"
								break;
							}
						}
				}
				break;
			case "2"://other race every updata
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_");
					if (thisTask[0] == "0" && thisTask[1] < 42) {
						b = getthebuildUrl(vill, thisTask)
						if (b) {
							buildurl = "http://" + window.location.hostname + "/" + b
							thislevel = parseInt(GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime", delaytime.toString())
							GM_log(getErrorInfor() + ", updata delay 30 minutes")
							window.location.href="http://" + window.location.hostname + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 41) {//autoResource
							thisTask[1] = getAutoResourceId(vill)
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = "http://" + window.location.hostname + "/" + b
								thislevel = parseInt(GM_getValue(currentServer() + "_" + getuid() + "_" + vill + "_crtBuildlevel")) + 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == errorText[5]) {
									GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime")
									addtaskbefore(vill, "10", kind);
								}
								else 
									if (getErrorInfor() == errorText[6]) {
										GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime")
										addtaskbefore(vill, "11", kind);
									}
									else 
										if (getErrorInfor() == errorText[0]) {
											var dtime = new Date();
											delaytime = dtime.getTime() + 1800000;
											dtime.setTime(delaytime);
											GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime", delaytime.toString())
											GM_log(getErrorInfor() + ", updata delay 30 minutes")
											window.location.href="http://" + window.location.hostname + "/dorf1.php"
											break;
										}
										else {
											GM_deleteValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime")
											GM_log("No updata task found, delete UpdataTime in startBuildnow()")
											window.location.href="http://" + window.location.hostname + "/dorf1.php"
											break;
										}
						}
						else 
							if (thisTask[0] == "1") {//new build
								b = getthebuildUrl(vill, thisTask)
								if (b) {
									buildurl = "http://" + window.location.hostname + "/" + b;
									thislevel = 1;
									GM_log("start Require now");
									HttpRequire(buildurl, vill, thisTask, kind, thislevel)
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(currentServer() + "_" + getuid() + "_" + vill + "_UpdataTime", delaytime.toString())
									GM_log(getErrorInfor() + ", updata delay 30 minutes")
									window.location.href="http://" + window.location.hostname + "/dorf1.php"
									break;
								}
							}
				}
				break;
		}
	}
	
	
	function startAttacknow(vi, ATask){//2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		GM_log("come into startAttacknow(), at " + getvillagefromdid(vi))
		var myower = window.clearInterval(myower)
		url = "http://" + window.location.hostname + "/a2b.php" + "?newdid=" + vi
		randomm=Math.ceil(Math.random()*60000)
		troo = ATask[6].split(",")
		if (troo[7] > 0) {
			kata = ATask[7]
			kata2 = ATask[8]
			daa = "id=39&a="+randomm+"&c=" + ATask[2] + "&kid=" + ATask[1] + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5] + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10] + "&kata=" + ATask[7] + "&kata2=" + ATask[8];
		}
		else {
			daa = "id=39&a="+randomm+"&c=" + ATask[2] + "&kid=" + ATask[1] + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5] + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10];
		}
		dataa = encodeURI(daa)
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				GM_log("autoTranRequire Require callback here")
				if (ATask[3] == "0") {
					deleteTaskFromCookie(vi, ATask)
				}
				else {
					var newTask = new Array()//|2_241654_3_0_1248014400000_0_0,0,0,0,0,5,0,0,0,0,0_0_0
					newTask[0] = ATask[0];
					newTask[1] = ATask[1];
					newTask[2] = ATask[2];
					temp = Number(ATask[3]) - 1
					newTask[3] = temp.toString();
					if (ATask[5] == "0") {
						temp2 = Number(ATask[4]) + 24 * 60 * 60 * 1000
					}
					else {
						temp2 = Number(ATask[4]) + Number(ATask[5])
					}
					newTask[4] = temp2.toString();
					newTask[5] = ATask[5];
					newTask[6] = ATask[6];
					newTask[7] = ATask[7];
					newTask[8] = ATask[8];
					
					deleteTaskFromCookie(vi, ATask,newTask)
				}
				printMSG(taskoftext[31])
				window.location.replace("build.php?newdid=" + vi+"&gid=16&id=39")
			}
		})
	}
	
	
	function getTrainData(vi, task){
		var myower = window.clearInterval(myower);
		GM_log("come into getTrainData(vi,idd), at " + getvillagefromdid(vi))
		var url = "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback(){
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
					GM_log("here is getTrainData() callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getbuildurl.responseText; //4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_??
					aDoc.appendChild(aElem);
					
					troo=task[5].split(",")
					var maxx = aDoc.getElementsByClassName("max")
					var texts=	aDoc.getElementsByClassName("text")

					for(i in texts){
						maxNum = maxx[i].innerHTML.split("(")[1].split(")")[0]
						maxNum =Number(maxNum)
						troNum=Number(texts[i].name.split("t")[1])-1
						troo[troNum]=(troo[troNum]<maxNum)?troo[troNum]:maxNum
					}
					
					var input = aDoc.getElementsByTagName("input")
					for (var m = 0; m < input.length; m++) {
						if (input[m].getAttribute("name") == "z") {
							z = input[m].getAttribute("value");
							break;
						}
					}
					trainstring=	"id="+task[1]+"&z="+z+"&a=2" + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5] + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9];
					return trainstring
				}
			}
		}
		return callback()
	}
	
	function startTrainNow(vi,tTask){//4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_??
		GM_log("come into startTrainNow(), at " + getvillagefromdid(vi))
		var myower = window.clearInterval(myower)
		url = "http://" + window.location.hostname + "/build.php" + "?newdid=" + vi
		daa =getTrainData(vi,tTask)
		dataa = encodeURI(daa)
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				GM_log("startTrainNow(vi,tTask) Require callback here")
				if (tTask[2] == "0") {
					deleteTaskFromCookie(vi, tTask)
				}
				else {
					var newTask = new Array()//|2_241654_3_0_1248014400000_0_0,0,0,0,0,5,0,0,0,0,0_0_0
					newTask[0] = tTask[0];
					newTask[1] = tTask[1];
					temp = Number(tTask[2]) - 1
					newTask[2] = temp.toString();
					if (tTask[4] == "0") {
						temp2 = Number(tTask[3]) + 3 * 60 * 60 * 1000
					}
					else {
						temp2 = Number(tTask[3]) + Number(tTask[4])
					}
					newTask[3] = temp2.toString();
					newTask[4] = tTask[4];
					newTask[5] = tTask[5];
					newTask[6] = tTask[6];
					
					deleteTaskFromCookie(vi, tTask,newTask)
				}
				printMSG(taskoftext[34])
				window.location.replace("build.php?newdid=" + vi+"&id="+tTask[1])
			}
		})
	}

function startCustomTranNow(vi, task){//8_241654_500,500,500,500_0_1245413194000_interval
	GM_log("come into startCustomTranNow() at " + getvillagefromdid(vi))
	var myower = window.clearInterval(myower)
	var turl = "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&gid=17"
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
			GM_log("here is startCustomTranNow callback function")
			var ssDoc = document.implementation.createDocument("", "", null);
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
			ssDoc.appendChild(ssElem);
			
			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			GM_log("resource=" + resource)
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if (comm[0] > 0) {
				balance = task[2].split(",")
				balance[0] = Number(balance[0])
				balance[1] = Number(balance[1])
				balance[2] = Number(balance[2])
				balance[3] = Number(balance[3])
				baalaa = getTranAmount(balance, resource)
				autoTranRequire(task, baalaa, vi, theid)
			}
			else {
				if (task[3] == "0") {
					deleteTaskFromCookie(vi, task)
					GM_log("No merchant now, deleted the autoTransTime in startTrannow()")
				}
				else {
					var newTask = new Array()
					newTask[0] = task[0];
					newTask[1] = task[1];
					newTask[2] = task[2];
					temp = Number(task[3]) - 1
					newTask[3] = temp.toString();
					if (task[5] == "0") {
						temp2 = Number(task[4]) + 6 * 60 * 60 * 1000
					}
					else {
						temp2 = Number(task[4]) + Number(task[5])
					}
					newTask[4] = temp2.toString();
					newTask[5] = task[5];
					
					deleteTaskFromCookie(vi, task, newTask)
					GM_log("No merchant now, delay Transport")
				}
				window.location.href="http://" + window.location.hostname + "/dorf1.php"
			}
		}
	});
}
	
	
function startTrannow(vi, tranTask){//8_241654_500,500,500,500_0_1245413194000_interval
	GM_log("come into startTrannow() at " + getvillagefromdid(vi))
	var myower = window.clearInterval(myower)
	var turl = "http://" + window.location.hostname + "/build.php?newdid=" + vi + "&gid=17"
	var tarResource = GM_getValue(currentServer() + "_" + getuid() + "_" + tranTask[2] + "_ResourceNow", "false")
	var WareCap = GM_getValue(currentServer() + "_" + getuid() + "_" + tranTask[2] + "_WarehouseCap", "false");
	var GranCap = GM_getValue(currentServer() + "_" + getuid() + "_" + tranTask[2] + "_GranaryCap", "false");
	var userTranSetup = GM_getValue(currentServer() + "_" + getuid() + "_" + tranTask[2] + "_userTranSetup", "false")
	var WareCap = parseInt(WareCap)
	var GranCap = parseInt(GranCap)
	var resnow = tarResource.split("/");
	resnow[0] = parseInt(resnow[0])
	resnow[1] = parseInt(resnow[1])
	resnow[2] = parseInt(resnow[2])
	resnow[3] = parseInt(resnow[3])
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
			GM_log("here is startTrannow callback function")
			var ssDoc = document.implementation.createDocument("", "", null);
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
			ssDoc.appendChild(ssElem);
			
			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			GM_log("resource=" + resource)
			
			var transing = [0, 0, 0, 0]
			var reg111 = gametext[10] //to
			var reg222 = gametext[12] //back from
			var alltranTo = ssDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', ssElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (alltranTo.snapshotLength > 0) {
				for (var i = 0; i < alltranTo.snapshotLength; i++) {
					if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
						ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
						transing[0] += parseInt(ress[0].split(">")[1])
						transing[1] += parseInt(ress[1].split(">")[1])
						transing[2] += parseInt(ress[2].split(">")[1])
						transing[3] += parseInt(ress[3].split(">")[1])
						GM_log("in startTrannow(vi,tranTask), transing=" + transing)
					}
				}
			}
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			switch (tranTask[1]) {
				case "0"://building surport model.
					if (userTranSetup == "false") {
						if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
							var transtarget1 = WareCap * 0.8
							var transtarget2 = GranCap * 0.8
						}
						else {//15000 and 16000 remain
							var transtarget1 = 15000;
							var transtarget2 = 16000;
						}
					}
					else {//user setup
						var transtarget1 = parseInt(userTranSetup.split("/")[0]);
						var transtarget2 = parseInt(userTranSetup.split("/")[1]);
					}
					break;
					
				case "1":
					var transtarget1 = WareCap * 0.9
					var transtarget2 = GranCap * 0.9
					break;
					
				case "2":
					break;
			}
			
			if ((resnow[0] + transing[0] + 200) < transtarget1 || (resnow[1] + transing[1] + 200) < transtarget1 || (resnow[2] + transing[2] + 200) < transtarget1 || (resnow[3] + transing[3] + 200) < transtarget2) {
				if (comm[0] > 0) {
					balance = [0, 0, 0, 0]
					balance[0] = ((transtarget1 - (resnow[0] + transing[0])) > 0) ? (transtarget1 - (resnow[0] + transing[0])) : 0
					balance[1] = ((transtarget1 - (resnow[1] + transing[1])) > 0) ? (transtarget1 - (resnow[1] + transing[1])) : 0
					balance[2] = ((transtarget1 - (resnow[2] + transing[2])) > 0) ? (transtarget1 - (resnow[2] + transing[2])) : 0
					balance[3] = ((transtarget2 - (resnow[3] + transing[3])) > 0) ? (transtarget2 - (resnow[3] + transing[3])) : 0
					
					baalaa = getTranAmount(balance, resource)
					autoTranRequire(tranTask, baalaa, vi, theid)
				}
				else {
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
					GM_log("No merchant now, deleted the autoTransTime in startTrannow()")
					window.location.href="http://" + window.location.hostname + "/dorf1.php"
				}
			}
			else {
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
				GM_log("resource is enough, deleted the autoTransTime in startTrannow()")
				window.location.href="http://" + window.location.hostname + "/dorf1.php"
			}
		}
	});
}

	
	function startDemonow(vi, demotask){//"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		GM_log("come into startDemonow at "+getvillagefromdid(vi) +", to demolish "+demotask[4])
		var myower = window.clearInterval(myower)
		var turl = "http://" + window.location.hostname + "/build.php?newdid=" + vi
		demodate = "&gid=15&a=" + vi + "&abriss=" + demotask[1]
		dataa = encodeURI(demodate)
		GM_xmlhttpRequest({
			method: 'POST',
			url: turl,
			headers: {
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				GM_log("startDemonow Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				var newdemoTask = new Array();
				if (parseInt(demotask[2]) > 1) {
					newdemoTask[0] = demotask[0]
					newdemoTask[1] = demotask[1]
					newdemoTask[2] = (parseInt(demotask[2])-1).toString()
					newdemoTask[3] = demotask[3]
					newdemoTask[4] = demotask[4]
					deleteTaskFromCookie(vi, demotask, newdemoTask)
					
					var ddg = new Date();
					gettime = auDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					demot = gettime.toString().split(":")
					endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000 + 10000;
					ddg.setTime(endt)
					GM_log("some demolish is doing, next demo start at " + ddg)
					GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_demolishTime", endt.toString());
				}
				else {
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_demolishTime");
					deleteTaskFromCookie(vi, demotask)
				}
				printMSG(TaskKind[7]+" "+demotask[4]+" "+ otherText[7]+"!")
				window.location.href="http://" + window.location.hostname + "/dorf1.php"
			},
		})
	}
	
	
	function getWholeNumber(resArray){
		for(xx in resArray){
			resArray[xx]=Math.floor(resArray[xx]/100)*100
		}
		return resArray
	}
	
	function getTranAmount(bala,resource){
		GM_log("come into getTranAmount(),bala=" + bala)
		resource[0] = parseInt(resource[0])
		resource[1] = parseInt(resource[1])
		resource[2] = parseInt(resource[2])
		resource[3] = parseInt(resource[3])
		bala[0] = (resource[0] >= bala[0]) ? bala[0] : resource[0]
		bala[1] = (resource[1] >= bala[1]) ? bala[1] : resource[1]
		bala[2] = (resource[2] >= bala[2]) ? bala[2] : resource[2]
		bala[3] = (resource[3] >= bala[3]) ? bala[3] : resource[3]
		all = bala[0] + bala[1] + bala[2] + bala[3]
		if (all < comm[0] * comm[1]) {
			return getWholeNumber(bala)
		}
		else {
			balaa = [0, 0, 0, 0]
			maxer = Math.max(bala[0], bala[1], bala[2], bala[3])//1st maxer
			if (maxer >= comm[0] * comm[1]) {
				for (i = 0; i < 4; i++) {
					if (bala[i] == maxer) {
						balaa[i] = comm[0] * comm[1];
						break;
					}
				}
				return getWholeNumber(balaa)
			}
			else {
				for (d = 0; d < 4; d++) {
					if (bala[d] == maxer) {
						balaa[d] = bala[d];
						bala[d] = 0;
						remain = comm[0] * comm[1] - balaa[d]
						break;
					}
				}
				maxer = Math.max(bala[0], bala[1], bala[2], bala[3])//2th maxer
				if (maxer >= remain) {
					for (j = 0; j < 4; j++) {
						if (bala[j] == maxer) {
							balaa[j] = remain;
							break;
						}
					}
					return getWholeNumber(balaa)
				}
				else {
					for (s = 0; s < 4; s++) {
						if (bala[s] == maxer) {
							balaa[s] = bala[s];
							bala[s] = 0;
							remain = remain - balaa[s]
							break;
						}
					}
					maxer = Math.max(bala[0], bala[1], bala[2], bala[3])//3th maxer
					if (maxer >= remain) {
						for (k = 0; k < 4; k++) {
							if (bala[k] == maxer) {
								balaa[k] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
					else {
						for (n = 0; n < 4; n++) {
							if (bala[n] == maxer) {
								balaa[n] = bala[n];
								bala[n] = 0;
								remain = remain - balaa[n];
								break;
							}
						}
						maxer = Math.max(bala[0], bala[1], bala[2], bala[3])
						for (l = 0; l < 4; l++) {
							if (bala[l] == maxer) {
								balaa[l] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
				}
			}
		}
	}
	
	
	function getRequireData(tranTask, resArray, vi, id){//8_241654_500,500,500,500_0_1245413194000_interval
		GM_log("come into getRequireData() " + "resArray=" + resArray)
		var myower = window.clearInterval(myower)
		switch (tranTask[0]) {
			case "5":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[3]) + "&y=" + getYfromCoord(tranTask[3]);
				break;
			case "8":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[1]) + "&y=" + getYfromCoord(tranTask[1]);
				break;
		}
		GM_log("in getRequireData:   " + param)
		data = encodeURI(param);
		url = "http://" + window.location.hostname + "/build.php" + "?newdid=" + vi
		var getTranData = new XMLHttpRequest();
		getTranData.open('POST', url, false);
		getTranData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		getTranData.setRequestHeader("Content-length", data.length);
		getTranData.setRequestHeader("Connection", "close");
		getTranData.onreadystatechange = callback;
		getTranData.send(data);
		function callback(){
			if (getTranData.readyState == 4) {
				if (getTranData.status == 200) {
					GM_log("getRequireData callback here!")
					
					var abDoc = document.implementation.createDocument("", "", null);
					var abElem = document.createElement('DIV');
					abElem.innerHTML = getTranData.responseText;
					abDoc.appendChild(abElem);
					
					var aR = new Array()
					sid = ""
					a = ""
					sz = ""
					kid = ""
					
					var input = abDoc.getElementsByTagName("input")
					for (var m = 0; m < input.length; m++) {
						if (input[m].getAttribute("name") == "id") {
							sid = input[m].getAttribute("value");
						}
						else 
							if (input[m].getAttribute("name") == "a") {
								a = input[m].getAttribute("value");
							}
							else 
								if (input[m].getAttribute("name") == "sz") {
									sz = input[m].getAttribute("value");
								}
								else 
									if (input[m].getAttribute("name") == "kid") {
										kid = input[m].getAttribute("value");
									}
									else 
										if (input[m].getAttribute("name") == "r1") {
											aR[0] = input[m].getAttribute("value");
										}
										else 
											if (input[m].getAttribute("name") == "r2") {
												aR[1] = input[m].getAttribute("value");
											}
											else 
												if (input[m].getAttribute("name") == "r3") {
													aR[2] = input[m].getAttribute("value");
												}
												else 
													if (input[m].getAttribute("name") == "r4") {
														aR[3] = input[m].getAttribute("value");
													}
					}
					var paramm = "id=" + sid + "&a=" + a + "&sz=" + sz + "&kid=" + kid + "&r1=" + aR[0] + "&r2=" + aR[1] + "&r3=" + aR[2] + "&r4=" + aR[3];
					GM_log(paramm)
					return paramm
				}
			}
		}
		return callback()
	}
	
	
	function autoTranRequire(tranTask, resArray, vi, id){
		GM_log("come into autoTranRequire(), the resArray=" + resArray)
		var myower = window.clearInterval(myower)
		url = "http://" + window.location.hostname + "/build.php" + "?newdid=" + vi
		dataa = encodeURI(getRequireData(tranTask, resArray, vi, id))
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				GM_log("autoTranRequire Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				switch (tranTask[0]) {
					case "5":
						var ma = "0"
						var transing = [0, 0, 0, 0]
						var Transtime = 1500000000000;
						var reg111 = gametext[10]//to
						var gugagaa = new Date()
						var alltranTo = auDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', auElem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						if (alltranTo.snapshotLength > 0) {
							for (var i = 0; i < alltranTo.snapshotLength; i++) {
								if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
									var ma = "1"
									ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
									transing[0] += parseInt(ress[0].split(">")[1])
									transing[1] += parseInt(ress[1].split(">")[1])
									transing[2] += parseInt(ress[2].split(">")[1])
									transing[3] += parseInt(ress[3].split(">")[1])
									
									resttt = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
									restttttt = resttt.toString().split(":")
									gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
									Transtime = Math.min(Transtime, gobacktime)
								}
							}
							if (ma == "0") {
								GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
							}
							lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
							var yyyu = new Date()
							yyyu.setTime(lastTrantime)
							
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", lastTrantime.toString())
							GM_log("the traning will arrive after " + lastTrantime + ", at " + yyyu)
							GM_setValue(currentServer() + "_" + getuid() + "_" + tranTask[2] + "_ResourceTraning", transing.join("/"))
							GM_log("all resources on transporting are " + transing.join("/"))
						}
						else {
							GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
						}
						
						okk = taskoftext[8].big() + "<br /><br />" + gametext[12] + " " + getvillagefromdid(vi) + " " + gametext[6] + " " + getvillagefromdid(tranTask[2]) + "<br /><br />" + taskoftext[11] + "!"
						printMSG(okk)
						switch (tranTask[1]) {
						
							case "0":
								GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
								break;
								
							case "1":
								var saspa = new Date();
								nextTime = saspa.getTime() + 3600000;
								GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime", nextTime.toString())
								break;
						}
						window.location.replace(url)
						break;
					case "8"://8_241654_500,500,500,500_0_1245413194000_interval
						if (tranTask[3] == "0") {
							deleteTaskFromCookie(vi, tranTask)
						}
						else {
							var newTask = new Array()
							newTask[0] = tranTask[0];
							newTask[1] = tranTask[1];
							newTask[2] = tranTask[2];
							temp = Number(tranTask[3]) - 1
							newTask[3] = temp.toString();
							if (tranTask[5] == "0") {
								temp2 = Number(tranTask[4]) + 6 * 60 * 60 * 1000
							}
							else {
								temp2 = Number(tranTask[4]) + Number(tranTask[5])
							}
							newTask[4] = temp2.toString();
							newTask[5] = tranTask[5];
							
							deleteTaskFromCookie(vi, tranTask, newTask)
						}
						okk = taskoftext[35].bold() + " " + taskoftext[11] + "!"
						printMSG(okk)
						window.location.replace(url)
						break;
				}
			}
		})
	}


	function showTaskList(){
		GM_log("come into showTaskList()")
		tasks = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", "false")
		if (tasks != "false") {
			aTable = createTaskListTable()
			var tlWrapper = document.createElement("div");
			tlWrapper.id = "tasklisttable_wrapper";
			tlWrapper.appendChild(aTable);
			
			var formCoords = getOption("TASKLIST_POSITION", "120px_930px");
			formCoords = formCoords.split("_");
			tlWrapper.style.top = formCoords[0];
			tlWrapper.style.left = formCoords[1];
			
			document.body.appendChild(tlWrapper);
			makeDraggable($("tasklisttable"));
		}
	}

	
	function createTaskListTable(){
		taskss = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask", "false")
		if (taskss != "false") {
			tasks = taskss.split("|")
			var taskListTable = document.createElement("table");
			taskListTable.id = "tasklisttable";
			taskListTable.border = "0"
			taskListTable.innerHTML += "<caption>" + gametext[7].big() + ":  " + currentVillageName().big() + "&#160;&#160;&#160;" + taskoftext[12].big() + "</caption>"
			taskListTable.innerHTML += "<tr><th colspan='2'>" + addTaskText[12] + "</th><th>" + addTaskText[11] + "</th><th>" + addTaskText[10] + "</th></tr>"
			taskListTable.innerHTML += "<tr><td colspan='4'><hr /></td></tr>"
			for (i in tasks) {
				thisTask = tasks[i].split("_");
				aTr = document.createElement("tr");
				taskListTable.appendChild(aTr);
				
				aTd1 = document.createElement("td");
				aTd1.width = "18px"
				if (i == 0) {
					aTd1.innerHTML = "&#160;"
				}
				else 
					if (i > 0) {
						taskup = document.createElement("a");
						taskup.href = "#"
						taskup.title = addTaskText[8]
						nimg = document.createElement("img");
						nimg.setAttribute("src", moveupBtn);
						taskup.appendChild(nimg);
						aTd1.appendChild(taskup);
						taskup.addEventListener('click', moveTask(currentID(), i, -1), false);
					}
				aTr.appendChild(aTd1);
				
				aTd2 = document.createElement("td");
				aTd2.width = "28px"
				if (i < tasks.length - 1) {
					taskdown = document.createElement("a");
					taskdown.href = "#"
					taskdown.title = addTaskText[9] 
					mimg = document.createElement("img")
					mimg.setAttribute("src", movedownBtn);
					taskdown.appendChild(mimg);
					aTd2.appendChild(taskdown);
					taskdown.addEventListener('click', moveTask(currentID(), i, 1), false);
				}
				else 
					if (i == tasks.length - 1) {
						aTd2.innerHTML = "&#160;"
					}
				aTr.appendChild(aTd2);
				
				
				aTd3 = document.createElement("td");
				taskStr = "";
				switch (thisTask[0]) {
					case "0"://0_id_level_time_name
						if (thisTask[1] < 19) {
							taskStr = TaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + gametext[2] + ":" + thisTask[1] + "&#160;&#160;" + addTaskText[4] + ":" + gametext[0] + thisTask[2]
						}
						else 
							if (thisTask[1] > 18 && thisTask[1] < 42) {
								taskStr = TaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + gametext[2] + ":" + thisTask[1] + "&#160;&#160;" + addTaskText[4] + ":" + gametext[0] + thisTask[2]
							}
							else {
								taskStr = taskoftext[2]
							}
						break;
					case "1"://1_id_level_gid_time_name
						
						taskStr = TaskKind[1] +"&#160;" +allbuildwithid[parseInt(thisTask[3])] + "&#160;&#160;" + gametext[2] + ":" + thisTask[1] + "&#160;&#160;" + addTaskText[4] + ":" + gametext[0] + thisTask[2]
						break;
					case "2"://2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2    
						targetcoord="(" + getXfromCoord(thisTask[1])+"|"+getYfromCoord(thisTask[1])+")";
						var starttime= new Date(Number(thisTask[4]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com") {
							taskStr = attacktype[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + starttime.toLocaleString()+ "&#160;&#160;" + (Number(thisTask[3]) + 1) + taskoftext[28];
						}
						else {
							taskStr = attacktype[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + month + taskoftext[29] + days + taskoftext[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + taskoftext[28];
						}
						var troopse=thisTask[6].split(",")
						troopsss="";
						ra = GM_getValue(currentServer() + "_" + getuid() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0"){continue;}
							troopsss+=troops[ra][w]+troopse[w]+" "
						}
						aTd3.title=troopsss
						break;
					case "4"://4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_??
						var starttime= new Date(Number(thisTask[3]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							taskStr =TaskKind[4] +" in "+ thisTask[6] + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + taskoftext[28];
						}
						else {
							taskStr = thisTask[6] + TaskKind[4] + "&#160;&#160;" + month + taskoftext[29] + days + taskoftext[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + taskoftext[28];
						}
						var troopse=thisTask[5].split(",")
						troopsss="";
						ra = GM_getValue(currentServer() + "_" + getuid() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0"){continue;}
							troopsss+=troops[ra][w]+troopse[w]+" "
						}
						aTd3.title=troopsss
						break;
					case "5":
						switch(thisTask[1]){
							case "0":
								taskStr = taskoftext[8] + " " + gametext[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + addTaskText[5] + ":" + addTaskText[6]
								break;
							case "1":
								taskStr = taskoftext[8] + " " + gametext[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + addTaskText[5] + ":" + addTaskText[7]
								break;
						}
						break;
					case "7":	//"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
						taskStr=TaskKind[7]+" "+thisTask[4]+"&#160;&#160;&#160;&#160;"+gametext[17]+thisTask[2]+"&#160;&#160;"+gametext[6]+"&#160;&#160;"+gametext[17]+"0"
						break;
					case "8"://8_241654_500,500,500,500_0_1245413194000_interval
						tarVil="("+getXfromCoord(thisTask[1])+"/"+getYfromCoord(thisTask[1])+")"
						var starttime= new Date(Number(thisTask[4]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						taskStr = taskoftext[35] + " " + gametext[6] + " " + tarVil +  "&#160;&#160;"  + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + taskoftext[28];
						aTd3.title=thisTask[2]
						break;
				}
				aTd3.innerHTML = taskStr
				aTr.appendChild(aTd3);
				
				aTd4 = document.createElement("td");
				aTd4.width = "28px"
				aTd4.align="right"
				deleteTaskk = document.createElement("a");
				deleteTaskk.setAttribute("title", addTaskText[10]);
				deleteTaskk.href = "#"
				limg = document.createElement("img")
				limg.setAttribute("src", deleteBtn);
				deleteTaskk.appendChild(limg);
				deleteTaskk.addEventListener("click", deleteTaskCookie(i), false);
				aTd4.appendChild(deleteTaskk);
				aTr.appendChild(aTd4);
			}
			aTr6 = document.createElement("tr");
			aTd6 = document.createElement("td");
			aTd6.setAttribute("colspan", "4");
			aTd6.innerHTML="<hr />"
			aTr6.appendChild(aTd6);
			taskListTable.appendChild(aTr6)

			aTr5 = document.createElement("tr");
			aTd5 = document.createElement("td");
			aTd5.setAttribute("colspan", "4");
			deleteAllTask = document.createElement("a");
			deleteAllTask.href = "#"
			deleteAllTask.title = addTaskText[13]
			deleteAllTask.innerHTML = addTaskText[13]
			aTd5.appendChild(deleteAllTask);
			aTr5.appendChild(aTd5);
			taskListTable.appendChild(aTr5)
			deleteAllTask.addEventListener('click', deleteAllTasks, true);
		}
		return taskListTable
	}
	
	function deleteTaskCookie(j){
		return function(){
			taskss = GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask");
			thisTask = taskss.split("|")[j].split("_")
			switch (thisTask[0]) {
				
				case "0":
					if (thisTask[1] < 42) {
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_ResourceUpdataTime")
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_BuildingUpdataTime")
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_UpdataTime")
					}
					else {//autoResource
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource");
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_CorpRemain");
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_minLevelId");
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_minLevelCropId");
					}
					break;
					
				case "1"://new build
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_BuildingUpdataTime")
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_UpdataTime")
					break;
					
				case "5"://auto transport
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_to_" + thisTask[3] + "_TraningTime")
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_to_" + thisTask[3] + "_autoTransTime")
					auTranTo=GM_getValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo")
					auTrans=auTranTo.split("|")
					if (auTrans.length > 1) {
						for (a in auTrans) {
							if (auTrans[a] == thisTask[2]) {
								auTrans.splice(a, 1)
								break;
							}
						}
						GM_setValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo",auTrans.join("|"))
					}
					else {
						GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo")
					}
					break;
					
				case "7"://demolish
					GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_demolishTime");
					break;
					
			}
			deleteTaskFromCookie(currentID(), thisTask)
		}
	}




	function deleteAllTasks(){
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_waitTask")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_BuildingUpdataTime")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_ResourceUpdataTime")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_UpdataTime")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTime")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_TraningTime")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoTransTo")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_autoResource")
		GM_deleteValue(currentServer() + "_" + getuid() + "_" + currentID() + "_demolishTime")
		document.body.removeChild($("tasklisttable_wrapper"))
	}
	
	function addtaskbefore(vi, gid, ki){
		//ki="0" is Romans autoResource, ki="2" is other race autoResource
		thebuildid = getbuildfromdorf2(vi, gid)
		addtask = "0_" + thebuildid + "_000000000"
		newTaskstring = addtask + "|" + GM_getValue(currentServer() + "_" + getuid() + "_" + vi + "_waitTask");
		GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_waitTask", newTaskstring);
		switch (ki) {
			case "0":
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_BuildingUpdataTime");
				break;
			case "2":
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + vi + "_UpdataTime");
				break;
		}
		window.location.href="http://" + window.location.hostname + "/dorf1.php";
	}
	
	
	function getbuildfromdorf2(vil, gid){
		var turl = "http://" + window.location.hostname + "/dorf2.php?newdid=" + vil
		var getsomeid = new XMLHttpRequest();
		getsomeid.open('GET', turl, false);
		getsomeid.onreadystatechange = callback;
		getsomeid.send(null);
		function callback(){
			if (getsomeid.readyState == 4) {
				if (getsomeid.status == 200) {
					GM_log("getbuildfromdorf2_callback is here")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getsomeid.responseText;
					aDoc.appendChild(aElem);
					
					var thebuild = aDoc.evaluate('id("map2")//area[contains(@title,"' + allbuildwithid[gid] + '")]', aElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					temmp=thebuild.singleNodeValue.title.split(" ")
					level = parseInt(temmp[temmp.length-1]) + 1
					return thebuild.singleNodeValue.href.split("id=")[1] + "_" + level.toString();
				}
			}
		}
		return callback()
	}
	
	
	
	function getAutoResourceId(vi){
		corpremain = GM_getValue(currentServer() + "_" + getuid() + "_" + vi + "_CorpRemain")
		minlevelid = GM_getValue(currentServer() + "_" + getuid() + "_" + vi + "_minLevelId")
		minlevelcropid = GM_getValue(currentServer() + "_" + getuid() + "_" + vi + "_minLevelCropId")
		GM_log("come into getAutoResourceId(vi) and corpremain=" + corpremain)
		if (corpremain < 20) {
			GM_log("because of corpremain<20, return id is " + minlevelcropid)
			return minlevelcropid
		}
		else {
			GM_log("because of corpremain>=20, return id is " + minlevelid)
			return minlevelid
		}
	}
	
	
	function deleteTaskFromCookie(Vii, Taa,newTa){
		GM_log("come into deleteTaskFromCookie(Vii, Taa)")
		taskcook = GM_getValue(currentServer() + "_" + getuid() + "_" + Vii + "_waitTask")
		tasks = taskcook.split("|")
		taaa = Taa.join("_")
		for (x in tasks) {
			if (tasks[x] == taaa) {
				if (newTa) {
					newTa=newTa.join("_")
					tasks.splice(x, 1, newTa)
					break;
				}
				else{
					tasks.splice(x, 1)
					break;					
				}
			}
		}
		if (tasks.length > 0) {
			newCook = tasks.join("|")
			GM_setValue(currentServer() + "_" + getuid() + "_" + Vii + "_waitTask", newCook)
			GM_log("ok,i delete a task")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
		else {
			GM_deleteValue(currentServer() + "_" + getuid() + "_" + Vii + "_waitTask")
			if (GM_getValue(currentServer() + "_" + getuid() + "_" + Vii + "_ResourceUpdataTime", "flase") != "false") 
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + Vii + "_ResourceUpdataTime")
			if (GM_getValue(currentServer() + "_" + getuid() + "_" + Vii + "_BuildingUpdataTime", "flase") != "false") 
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + Vii + "_BuildingUpdataTime")
			if (GM_getValue(currentServer() + "_" + getuid() + "_" + Vii + "_UpdataTime", "flase") != "false") 
				GM_deleteValue(currentServer() + "_" + getuid() + "_" + Vii + "_UpdataTime")
			GM_log("ok I delete the whole cookie")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
	}
	
	
	function moveTask(vi, i, updown){
		return function(){
			updown=parseInt(updown)
			i=parseInt(i)
			var ubC = GM_getValue(currentServer() + "_" + getuid() + "_" + vi + "_waitTask");
			var arrUbC = ubC.split("|");
			var tmpUb = arrUbC[i + updown];
			arrUbC[i + updown] = arrUbC[i];
			arrUbC[i] = tmpUb;
			ubC = arrUbC.join("|");
			GM_setValue(currentServer() + "_" + getuid() + "_" + vi + "_waitTask", ubC)
			document.body.removeChild($("tasklisttable_wrapper"))
			showTaskList()
		}
	}

	function promptFreshInterval(){
		curentSetup = GM_getValue(currentServer() + "_" + getuid() + "_FreshInterval", "20")
		var newSetup = prompt(taskoftext[37],curentSetup);
		GM_setValue(currentServer() + "_" + getuid() + "_FreshInterval", newSetup)
	}





	ccclock = 0;
	function eachTimedo(){
		ccclock = ccclock + 6000
		if (ccclock > Number(pagefreshInterval)*60*1000) {
			GM_log("reload in eachTimedo() ,  each "+pagefreshInterval+" minutes")
			window.location.href="http://" + window.location.hostname + "/dorf1.php"
		}
		
		var now = new Date();
		nowmillse = now.getTime();
		
		for (v in getAllVillageNewdids()) {
			whatever = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_waitTask", "false")
			if (whatever != "false") {
				allTasks = whatever.split("|")
				allTran = new Array()
				TranT = new Array()
				TraningT = new Array()
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "5") {
							ll = allTran.push(thisTask)							
					}
					if(thisTask[0] == "2"){
						attackT=Number(thisTask[4])
						remainA=attackT- nowmillse;
						if(remainA<1000){
							startAttacknow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "4"){
						TrainT=Number(thisTask[3])
						remainT=TrainT- nowmillse;
						if(remainT<1000){
							startTrainNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "8"){//8_241654_500,500,500,500_0_1245413194000_interval
						customTransT=Number(thisTask[4])
						remainCu=customTransT- nowmillse;
						if(remainCu<1000){
							startCustomTranNow(getAllVillageNewdids()[v], thisTask)
						}
					}
				}
				if (allTran.length > 0) {
					for (i in allTran) {
						TranT[i] = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_autoTransTime", "1500000000000");
						TraningT[i] = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_TraningTime", "1500000000000")
						
						if ((parseInt(TranT[i]) - nowmillse) < 1000) {
							startTrannow(getAllVillageNewdids()[v], allTran[i])
						}
						if ((parseInt(TraningT[i]) - nowmillse) < 1000) {
							ki = fleshTraning(getAllVillageNewdids()[v], allTran[i])
							GM_log("here is eachTimedo(), return from Fleshtraning is " + ki)
						}
					}
				}
				
				resT = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_ResourceUpdataTime", "false");
				buiT = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_BuildingUpdataTime", "false");
				upT = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_UpdataTime", "false");
				DemoT = GM_getValue(currentServer() + "_" + getuid() + "_" + getAllVillageNewdids()[v] + "_demolishTime", "false");
				
				
				
				if (resT != "false") {
					remainTime1 = parseInt(resT) - nowmillse
					if (remainTime1 < 1000) {
						startBuildnow(getAllVillageNewdids()[v], "0")
						break;
					}
				}
				if (buiT != "false") {
					remainTime2 = parseInt(buiT) - nowmillse
					if (remainTime2 < 1000) {
						startBuildnow(getAllVillageNewdids()[v], "1")
						break;
					}
				}
				if (upT != "false") {
					remainTime3 = parseInt(upT) - nowmillse
					if (remainTime3 < 1000) {
						startBuildnow(getAllVillageNewdids()[v], "2")
						break;
					}
				}
				if (DemoT != "false") {
					remainTime4 = parseInt(DemoT) - nowmillse;
					for (lk in allTasks) {
						mytask = allTasks[lk].split("_");
						if (mytask[0] == "7" && remainTime4 < 1000) {
							startDemonow(getAllVillageNewdids()[v], mytask);
							break;
						}
					}
				}
			}
		}
	}

	
	
	
	function cleartime(){
		ccclock = 0;
	}
	
	/****************************************main function start***********************************************/
	GM_registerMenuCommand(taskoftext[36], promptFreshInterval);

	showTaskList()
	getMainVillageid()
	getResourceCap()
	if (window.location.href.indexOf("&s=4") == -1) {
		getallVillagePos()
	}
	
	if(window.location.href.indexOf("a2b.php") != -1 && window.location.href.match(/[\?&]d=/)==null){
		createAttackBtn()
	}

	var h1inner=document.getElementsByTagName("h1")[0].innerHTML.split(" ")
	switch (h1inner.length){
		case 3:
			bName=h1inner[0];
		break;
		case 4:
			bName=h1inner[0+h1inner[1]]
		break;
		default:
		bName=""
		break;
	}
	if(document.getElementsByTagName("h1")[0].innerHTML.indexOf(allbuildwithid[15])!=-1&&h1inner[h1inner.length-1]>9&&(!document.getElementById("demolish"))){
		createDemolishlnk()
	}
	
	if (bName==allbuildwithid[19]||bName==allbuildwithid[20]||bName==allbuildwithid[21]||bName==allbuildwithid[25]||bName==allbuildwithid[26]||bName==allbuildwithid[29]||bName==allbuildwithid[30]){
		createTrainLnk()
	}

	if (window.location.href.indexOf("build") != -1 && window.location.href.match(/[^gd]id/) != null && !isNaN(h1inner[h1inner.length-1]) && window.location.href.indexOf("&t=") == -1) {
		createbuildlink()
	}
	
	if(document.getElementsByTagName("h1")[0].innerHTML==gametext[15]){
		createNewbuildLnk()
	}
	
	if (window.location.href.indexOf("dorf1") != -1) {
		createAutoResLink()
	}
	
	if (document.getElementsByTagName("h1")[0].innerHTML.split(" ")[0] == allbuildwithid[17] && window.location.href.indexOf("t=") == -1) {
		createAutoTransBtn()
	}
	
	if (document.getElementsByTagName("h1")[0].innerHTML.indexOf(allbuildwithid[37])!=-1) {
		getHeroSpeed()
	}
	window.addEventListener("keydown", cleartime, false)
	window.addEventListener("mousemove", cleartime, false)
	
	myower = setInterval(eachTimedo, 6000)
	
//mybar.innerHTML=getallVillagePos()