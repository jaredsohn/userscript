// ==UserScript==
// @name 	Travian AutoTask
// @author 	congxz6688
// @version 	1.2.4.1.8
// @description Ver 1.2.4.1.8
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

var crtVersion="Ver 1.2.4.1.8"
var cssStyle = "";
cssStyle += "table#tasklisttable th {border:0px !important;font-weight:bolder; margin:10px;padding-top:8px; }"
cssStyle += "table#tasklisttable tr td,table#mytablee tr td{border:0px !important;margin:20px;}";
cssStyle += ".floatClose {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#closeautran {position:relative;top:1px;left:150px}"
cssStyle += "#autoResdiv,#translimit,#resremain {padding:0px 3px; }";
cssStyle += "#createnewurl {margin: 0px 0px 0px 0px; position:relative; top:6px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#createUrl,#partylnk {margin: 0px 0px 0px 0px; position:relative; top:-5px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#partylnk { position:relative; top:-1px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn,#attackbtn,#trainlnk,#customtransbtn {margin: 0px 0px 0px  20px; position:relative; top:-4px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn:active,#attackbtn:active,#demolishlnk:active,#createUrl:active,#createnewurl:active,#trainlnk:active,#customtransbtn:active,#partylnk:active {border-style: groove; border-width:3px; }"
cssStyle += "#updataform, #printmsg,#transform,#translimitform,#demolistform,#attackform,#trainform,#customtransform,#resremainform,#partyform {padding:10px 30px; }";
cssStyle += "#resremain {padding:0px 3px 15px 3px;}";
cssStyle += "#mytablee {margin:10px 0px 10px 0px;}";
cssStyle += "#crtvill,#hero {margin:0px 0px 10px 0px;}";
cssStyle += "#demolishdiv {padding:10px 3px 3px 3px;}";
cssStyle += "#taskForm_wrapper,#MSG_wrapper,#tranForm_wrapper,#tranlmtform_wrapper,#demolistform_wrapper,#attackform_wrapper,#trainform_wrapper,#customtransform_wrapper,#resremainform_wrapper,#partyform_wrapper {position:fixed; max-width:900px !important; min-width:260px !important; min-height:50px !important; background-color:RGB(225, 255, 225); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#tasklisttable_wrapper {position:fixed; padding:10px 20px 10px 20px;min-width:260px !important; min-height:50px !important; background-color:RGB(180, 220, 220); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += ".handle {cursor: move;}";
cssStyle +="#autoResform1,#changeit,#changeit2,#deletealltask,#clicktostart,#verdisp {color:green;}";
cssStyle +="#autoResform2,#clicktopause {color:DarkGoldenRod;}";
cssStyle +="#demolishlnk {color:red;border-style: ridge; border-width:2px;}";
GM_addStyle(cssStyle);


Xlang="cn";
checkLang()

var deleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";
var movedownBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACXklEQVR42p2S20vTYRjH%2FTuCiEBLWwepoC4kLSWdxZrImBeri7IjokS6eaFikGCZHaxBB5DWPNVwREKm2GSz1FKHXghFsYFaJnP%2B3Obv9B6ep3ezgsKbenkv3ovv5%2F0%2Bz%2Fd50vAfT9p%2FARwRgHPKASmg%2FdZQY%2FuHGmfAfn%2F4Skt%2Fb2BBp2tCw1BFDn8AjAPh6BqRL7S%2BPX97vKJt%2FM7Lrx7%2FHGHyxgBloFG8ObBqaRq1NgfLmt%2FXdnx55gtTrmwAADBhIQBHz%2FzxhjFjfbC4fuzio9keX3hjh9%2BAEBXWvjtin8y3%2B22tY52Dn%2F920IQWOCMqIbJCFdvd2QOXBnMqRw9d9p%2B4Nu4eCQMhqCmUIVCeclAlVYcE4CrHmI6lTVM7T3r3nHq193RfQc2bdv%2FiMkcJMMqRMzkJgK5OhyN55W2mmtcWe8BcN2mwegyW3l1lvXkVQ6bq4eLq%2FlJH91Wnh2KqJAYYB%2BybiRQ7BjaXeDPNXZnm7vW7zdSZWeI5XBU41%2FBCJZigqcEBEd1IVI8%2F9s4UVPnSC93pRU%2B2H3NlGF0ZRe59Zzz5lc9VikiiMvBfKXEmnNYAG53e%2FWf9Weanu00Pth51Zlm92UV1UV1kmBDpiFrSfqaKYsq6iEsGtFa6cmxdm3Ifbim4l21uiWrJmpFzBE7Xd4kgUmEBmhiDpqnilVt6Y4fJbTBe%2F7SoMK4AASESRVDUUz0kd46rlMTi0tL8XOjjdGAilH6w3NkxPBGcCoVmI0uRRFxlVCApACkBjgSAUE5kRqm2EpOicenb9%2FnlpYWVhKKQpIKLjxn8ABAenc7LXVdbAAAAAElFTkSuQmCC";
var moveupBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAIAAADdWck9AAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACbElEQVR42pVT70tTURj2f4joexGrT0XfggqGrabUIrLol4FiOiiwMCxZzQyMROzDqMD8gShCiLQNdQi2cc1tZrrmls1i1lzLLFzzunbv7r3nx9u5Zw360Jdd7j3ncN7nOe97n%2Bc9ZVDiU1Y6gRI2Uf6yL5fbyGHoHhbSEs3kRAoEA%2BBitJhBh1OdSQhDj05F4yJ09npEzDeBFKC0kIFT2UGIYoIw9UbWfXGp6dns2JJ8xzGGCA9ixCb8D4Ew9KYC75KZ0ZDY4JirfrxgfRpxL%2BOO%2FilRBU3T8%2BDiP7A1wQQ%2BpdV7g4GLDwTL%2FZljbcGqzojFLjhjuNcVUhA%2FFAjPkJcVTVtH5OYT4VJ7qKI1YLLNmO2zZnuQrc0t4%2B3OzPD0SlZDNC%2FqhDyGtErqWp22odSNgbX6nsRxW8B463X57elznYt1PcvW59GWvmA4kVZ4TWUYlNjKdyGUmpj%2F6gonr%2FWnDjf6jE3BQ43eK45YlzsxFln1vF32BZdQUdYMgEQJxpTKCFm7Px%2BoGd9fPbmv2n2%2BYyGwKCuACdW4FyonEF1WShVCqapAreODoWpk75nxPWdHTrf5%2FXMIQZ5QmYmKQCmq9FcpYLuX26OGkwMGy9DuE%2F2nmv3CQjYPTJ%2BcPmD4D%2BHC3cjOo327TINsrLg%2B7XvzQ2UhKgF3nMvK7GcaU8yagBEqmye3Gx%2FtMHZtO%2FLw4NUXr%2FxfkE6QQYdRTtDNp5qm%2FM7KP9e3ymtcphpPZb3XVOupbPC8nJgVJVHTcgyGeHPoJbFqVDW%2FtSX92pDDH1fno8m5SDIUS72Pf1vbUDezaVWR9O4pOF3qffgDH4Xh0bQHBfwAAAAASUVORK5CYII%3D";
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var troopspeed = [];
troopspeed[0] = ["6", "5", "7", "16", "14", "10", "4", "3", "4", "5", ""];
troopspeed[1] = ["7", "7", "6", "9", "10", "9", "4", "3", "4", "5", ""];
troopspeed[2] = ["7", "6", "17", "19", "16", "13", "4", "3", "5", "5", ""];

switch (Xlang) {
	case "cn":
		allbuildwithid = ["???", "???", "???", "??", "", "???", "???", "???", "??", "???", "??", "??", "???", "???", "???", "?????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "??", "???", "???", "???", "????", "?????", "????", "???", "???", "???", "???", "???", "???", "????", "???"];
		allresindorf1=["???", "???", "???", "??"]
		addTaskText = ["????", "????", "???", "????", "??", "??", "????", "????", "??", "??", "??", "????", "??", "??????"];
		TaskKind = ["??", "??", "??", "??", "??", "??", "??", "??", "????"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["??", "??", "??", "??", "????", "?????????", "?", "??", "??", "??", "?", "???", "?", "??", "??", "??????", "?", "??"];
		raceName = ["???", "????", "???"];
		taskoftext = ["????", "????", "??????", "????", "????", "????", "????", "???????", "????", "????????", "???", "????", "????", "??????", "??", "??", "?/?/?", "??", "????", "????", "????", "??????", "????", "????", "00:00:00", "????", "??", "??", "?", "?", "?", "?????","????","????","???????","????","????????","?????????,?????????????????\n?????,????????????,?????????????\n???20??,?????????:\n\n","??????","????","????","????","???????????","??","???","???","??","??"];
		errorText = ["????", "?????????", "????", "?????????", "????", "??????????????,????????", "??????????????,????????", "??????????","??????: ?????????","?????????"];
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
		
	case "hk"://??sean3808
		allbuildwithid = ["???", "??", "???", "??","", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????", "????"];
		allresindorf1=["???", "??", "???", "??"]
		addTaskText = ["????", "????", "???", "????", "??", "??", "????", "????", "??", "??", "??", "????", "??", "??????"];
		TaskKind = ["??", "??", "??", "??", "??", "??", "??", "??", "??"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["??", "??", "??", "??", "????", "?????????", "?", "??", "??", "??", "???", "?", "?", "??", "??", "???????", "empty", "??"];
		raceName = ["???", "???", "???"];
		taskoftext = ["????", "????", "??????", "????", "????", "????", "????", "??????", "????", "????????", "???", "????", "????", "??????", "??", "??", "?/?/?", "??", "????", "????", "????", "??????", "????", "????", "00:00:00", "????", "??", "??", "?", "?", "?", "?????","????","????","???????","????","????????","?????????,?????????????????\n?????,????????????,?????????????\n???20??,?????????:\n\n","??????","????","????","????","???????????","??","???","???","??","??"];
		errorText = ["????", "????????", "?????", "?????????", "????", "??????", "??????", "??????????","??????: ?????????","?????"];
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

	case "tw"://??adobe?????ieyp
		allbuildwithid = ["???", "??", "???", "??", "??", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????", "????"];
		allresindorf1=["???", "??", "???", "??"]
		addTaskText = ["????", "????", "???", "????", "??", "??", "????", "????", "??", "??", "??", "????", "??", "??????"];
		TaskKind = ["??", "??", "??", "??", "??", "??", "??", "??", "??"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["??", "??", "??", "??", "????", "?????????", "?", "??", "??", "??", "???", "?", "?", "??", "??", "???????", "empty", "??"];
		raceName = ["???", "???", "???"];
		taskoftext = ["????", "????", "??????", "????", "????", "????", "????", "??????", "????", "????????", "???", "????", "????", "??????", "??", "??", "?/?/?", "??", "????", "????", "????", "??????", "????", "????", "00:00:00", "????", "??", "??", "?", "?", "?", "?????","????","????","???????","????","????????","?????????,?????????????????\n?????,????????????,?????????????\n???20??,?????????:\n\n","??????","????","????","????","???????????","??","???","???","??","??"];
		errorText = ["????", "?????????", "????", "?????????", "????", "??????????????,????????", "??????????????,????????", "??????????","??????: ?????????","?????"];
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

	
	case "fi"://thanks Christer82
		allbuildwithid = ["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "", "Saha", "Tiilitehdas", "Rautavalimo", "Mylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Tori", "Lähetystö", "Kasarmi", "Talli", "Työpaja", "Akatemia", "Kätkö", "Kaupungintalo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppavirasto", "Suuri kasarmi", "Suuri talli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Panimo", "Ansoittaja","Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme", "Hevostenjuottoallas"];
		allresindorf1=["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto"]
		addTaskText = ["Lisää tehtävä", "Tyyli", "Kohdistettu kylä", "Tehtävän kohde", "Minne:", "Tyyppi", "Rakennustuki", "Resurssien keskittäminen", "Siirry ylös", "Siirry alas", "Poista", "&#160;&#160;&#160;Tehtävän sisältö", "Siirry ", "Poista kaikki tehtävät"];
		TaskKind = ["Päivitä", "Uusi rakennus", "Hyökkäys", "Tutkimus", "Koulutus", "Kuljetus", "NPC", "Hajotus", "Juhla"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Taso", "Kauppiaat", "ID", "Pääkaupunki", "Aloitusaika", "Tätä aika-asetusta ei voi nyt käyttää.", "minne:", "Kylä", "kuljetus", "mistä", "Kuljeta kylään", "Kuljeta kylästä", "Palaa kylästä", "Resurssit", "rakennus", "Rakenna uusi rakennus", "tyhjä", "taso"];
		raceName = ["Roomalaiset", "Teutonit", "Gallialaiset"];
		taskoftext = ["Aseta kentän päivitys", "Aseta uusi rakennuskohde", "Automaattinen resurssipäivitys", "Ei toimintaa", "Aloita", "Aloitettu", "Keskeytä", "Tämän kylän resurssikenttien jakauma on ", "Automaattikuljetus", "automaattikuljetusta ei ole avattu", "Avattu", "Kuljetus onnistui", "Tehtäväluettelo", "Trans_In_limit", "Perusasetus", "Muokkaa", "Puu/Savi/Rauta", "vilja", "Tehtävälistan poisto", "Schedule attack", "Hyökkäystyyppi", "Kuljetusaika", "toistokerrat", "Hyökkäysaikaväli","00:00:00","Katapultin kohde","Satunnainen", "Tuntematon", "kertaa", "Kuukausi", "Päivä", "Joukot on lähetetty","Aseta koulutustehtävä","Koulutuskohde","Koulutustehtävä suoritettu","waitForTranslate","setup Hyökkäysaikaväli of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration","minutes","pausing","running","run","pause"];
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
	case "us":
                case "au":	
	case "uk":	
	case "it"://thanks Abhi J
	case "com"://thanks  ieyp
		allbuildwithid = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		allresindorf1=["Woodcutter", "Clay Pit", "Iron Mine", "Cropland"]
		addTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		TaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		raceName = ["Romans", "Teutons", "Gauls"];
		taskoftext = ["Schedule Upgrade", "Schedule NewBuild", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans In limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition", "Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent", "Schedule Train","Train site","TrainTask done","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration","minutes","pausing","running","run","pause"];
		errorText = ["Too few resources.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
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
                     
              case "ua":
                                allbuildwithid = ["?????????", "???????? ???'??", "??????? ????????", "?????", "", "?????????????? ?????", "???????? ?????", "?????????????? ?????", "????", "???????", "?????", "??????? ??????", "????? ?????", "????? ??????????", "?????", "??????? ???????", "????? ?????", "?????", "??????????", "???????", "??????", "?????????", "????????", "????????", "??????", "??????????", "?????", "?????????", "??????? ??????", "?????? ???????", "?????? ??????", "?????? ?????", "???????? ???", " ???????", "???????", "?????", "?????????","???????", "??????? ?????", "?????? ??????? ??????", "???? ?????", "???????"];
                                allresindorf1=["?????????", "???????? ???'??", "??????? ????????", "?????"]
                                addTaskText = ["?????? ????????", "??????", "??????? ?????????", "???? ????????", "| ????", "???", "????????? ???????????", "???????????? ????????", "?????", "????", "", "", "", "???????? ??? ????????"];
                                TaskKind = ["?????????:", "???? ????????:", "?????????:", "?????????:", " ??????:", "?????????? ???????:", "NPC:", "??????????:", "???????????:"];
                                maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
                                gametext = [" ?????? ", "????????", "ID", "???????", "??? ???????", "(????????? ?? ??????)", "?", "?????????", "???????????????", "?", "??????????????? ?", "??????????????? ??", "?????????? ?", "???????", "???????", "?????????? ???? ???????", "?????", "??????"];
                                raceName = ["???????", "????????", "?????"];
                                taskoftext = ["??????????? ?????????????", "??????????? ???? ????????", "?????? ??????", "????", "?????", "???", "????", "???????????? ????? ? ?????????: ", "????????????????", "???????????????? ????.", "???.", "??????? ????????????", "* ?????? *", "????????? ?????", "??", "??????? ", "??????/?????/??????", "?????", "??????????? ???????????", "??????????? ?????", "??? ?????", "??? ? ??????", "???????", "????????","00:00:00","???? ?????","?????????", "????????", " ???", "/", " :????/???: ", "??????", "??????????? ????","Train site","???????? ?????? ?????????","?????? ????????????","???????? ?????????","?? ???????? ????????? ???????? ,\n ?? ???????????? - 20 ??????, ??????? ?????? ???:\n\n","????????? ??????","??????????? ???????????","????? ????????","??????? ????????","???????????? ????????? ???????????? ????????","???????","????????","??????","?????","?????"];
                                errorText = ["??????????? ????????", "??? ???????????? ????? ???????", "?? ???????? ???????? ????????", "??????? ???????????", "?????? ????????", "?????????? ????????? ??????", "?????????? ????????? ???????? ??????", "????????? ????????","","?????????? ???????????"];
                                otherText = ["??????? ???????", "?????? ? ??????? ???? ?????? ???? ?? ????? 20. ??????? ?? ?????????.??????? ? ??????? ?????????", "?????? ??? ^_^", "????????? ?????????", "?????????", "?????? ????????", "????????????? ??????? ???????", "???????", "??? ????? ????????????.????????? ??????? ? ???????.", "????? ????????? ??????? ? ??????? ??? ?????????? ???? ?? ???????? ?????"];
                                allsourceString = "????????????????? ???'????????? ?????????????"
                                resources=["????????","?????","??????","?????"];
                                allbuildString = "?????????????? ????????????? ??????????????????? ???????????????????????????? ??????????? ?????????? ?????????????????????? ???????????? ??????????????????????????????????????????????????????????????????????????????????????????????? ???????????? ????????????? ???????????? ????????????? ????????????????????????????????????????????? ??????????? ??????? ?????????? ????????????"
                                var troops = [];
                                troops[0] = ["????????", "????????????", "???????????", "?????? ?????????", "??????? ??????????", "??????? ??????", "?????", "??????? ??????????", "???????", "??????????", "?????"];
                                troops[1] = ["????????", "???????", "????????", "?????", "???????", "??????????? ???????", "?????????? ????????", "??????????", "???????", "??????????", "?????"];
                                troops[2] = ["???????", "??????", "????????", "?????????? ????", "?????-???????", "???????? ???????", "?????", "??????????", "?????", "??????????", "?????"]; attacktype = ["????????????", "?????", "?????"]
                                break;

              case "tr"://
                	allbuildwithid = ["Orman", "Tugla Ocagi", "Demir Madeni", "Tarla", "", "Marangozhane", "Tugla Firini", "Demir Dökümhanesi", "Degirmen", "Ekmek Firini", "Hammadde Deposu", "Tahil Ambari", "Silah Dökümhanesi", "Zirh Dökümhanesi", "Turnuva Yeri", "Merkez Binasi", "Askeri Üs", "Pazar", "Elçilik", "Kisla", "Ahir", "Tamirhane", "Akademi", "Siginak", "Belediye", "Kösk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kisla", "Büyük Ahir", "Sur", "Toprak Siper", "Çit", "Tasçi", "Içecek Fabrikasi", "Tuzakçi","Kahraman Kislasi", "Büyük Hammadde Deposu", "Büyük Tahil Ambari", "Dünya Harikasi", "Yalak"];
                	allresindorf1=["Orman", "Tugla Ocagi", "Demir Madeni", "Tarla"]
                	addTaskText = ["Görev Ekle", "Stil", "Aktif Köy", "Görev Hedefi", "To", "Mode", "Construction support", "Hammadde karisimi", "Yukari Çik", "Asagi In", "Sil", "&nbsp;&nbsp;&nbsp;Görev içerigi", "Ilerle ", "Bütün görevleri sil"];
                	TaskKind = ["Güncelle", "Yeni Bina", "Hücum", "Arastir", "Egit", "Gönder", "NPC", "Yik", "Festival"];
                	maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
                	gametext = ["Seviye", "Tüccar", "ID", "Baskent", "Baslangiç zamani", "bu zaman ayari kullanilamaz.", "buraya", "köy", "gönder", "buradan", "Gönderiliyor", "Gönderildi", "Dönüs", "hammadde", "bina", "Yeni bina kur", "bos", "seviye"];
                	raceName = ["Romalilar", "Cermenler", "Galyalilar"];
                	Taskoftext = ["Güncellemeye zamanla", "Schedule Yeni Bina", "Otomatik hammadde güncelle", "Not_run", "Baslat", "Basladi", "Durdu", "Bu köyün kaynak alanlari dagilimidir ", "Otomatik Gönderme", "Otomatik gönderme açilmadi", "Açildi", "Gönderme Tamamladi", "Görev listesi", "Gönderme limiti", "Varsayilan", "Degistir", "odun/tugla/demir", "tahil", "Yikim zamanla", "Hücum zamanla", "Hücum türü", "Varis zamani", "tekrar zamani", "aralik süresi","00:00:00","Mancinik hedef","Rasgele", "Bilinmeyen", "zaman", "Ay", "Gün", "Asker gönder", "Egitim zamanla","Train site","Egitim görevi tamamlandi","customTransport","setup interval time of reload","sayfa araligi yeniden ,\n varsayilan olarak 20 dakikadir, Lütfen yeni zamani girin:\n\n","Trans Out Rmn","Festivalzamanla","Küçük festival","Büyük festival","konsantrasyon Araligi Kaynaklari kümesi","dakikalar","bekliyor","çalisiyor","çalis","bekle"];
                	errorText = ["Çok az kaynak.", "Isçi zaten is basinda.", "Insaat tamamlandi", "Insaat baslatiliyor", "Arastirma yapiliyor", "Hammadde Deposu çok küçük. Hammadde Deposunu gelistirip öyle devam edin insaata", "Tahil Ambarin çok küçük. Tahil Ambarini gelistirip öyle devam edin insaata", "Yeterli hammadde","Gida eksikligi: önce Tarlani gelistir!","Su anda bir festival yapiliyor zaten"];
                	otherText = ["Önemli not", "Sadece baskent için hammadde üretebilirsiniz <br>be Güncellendi seviye 20. Simdi Baskentin<br> tesbit edilemedi. Profilinizi ziyaret edin önce.", "Buraya kisa yol ^_^", "Kurulum tamamlandi", "Vazgeçildi", "Görevleri baslat", "Güncelleme tamamlandi", "Çalisma tamam", "Irkiniz bilinmediginden asker tütünüz belilenemedi <br>Profilinizi ziyaret edip irkinizi belirleyin<br>", "Ayrica kahraman kislasinida ziyaret edin<br> Kahramaninizin hizi ve tipi."];
                	allsourceString = "OrmanTugla OcagiDemir MadeniTarla"
                	resources=["odun","tugla","demir","tahil"];
                	allbuildString = "MarangozhaneTugla FiriniDemir DökümhanesiDegirmenEkmek FiriniHammadde DeposuTahil AmbariSilah DökümhanesiZirh DökümhanesiTurnuva YeriMerkez BinasiAskeri ÜsPazarElçilikKislaAhirTamirhaneAkademiSiginakBelediyeKöskSarayHazineTicari MerkezBüyük KislaBüyük AhirSurToprak SiperPalisadeTasçiIçecek FabrikasiTuzakçiKahraman KislasiBüyük Hammadde DeposuBüyük Tahil AmbariDünya HarikasiYalak"
                		
                	var troops = [];
                	troops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbasi", "Ates Mancinigi", "Senatör", "Göçmen", "Kahraman"];
                	troops[1] = ["Tokmak Sallayan", "Mizrakçi", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbasi", "Mancinik", "Reis", "Göçmen", "Kahraman"];
                	troops[2] = ["Phalanx", "Kiliçli", "Casus", "Toytatin Simsegi", "Druyid", "Heduan", "Koçbasi", "Mancinik", "Kabile Reisi", "Göçmen", "Kahraman"];
                	attacktype = ["Destek", "Saldiri: Normal", "Saldiri: Yagma"]
                	break;

		
	case "br":
		allbuildwithid = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serraria", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalaria", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalaria", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		allresindorf1=["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereal"]
		addTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		TaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		raceName = ["Romanos", "Teutões", "Gauleses"];
		taskoftext = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição", "Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas", "Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration","minutos","parado","ligado","ligar","parar"];
		errorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		otherText = ["Nota importante", "Apenas os campos de recursos da capital <br>podem ser elevados a nivel 20 . A sua capital <br> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br>Visite o seu perfil para determinar as raça.<br>", "Por favor visite a sua mansão do heroi para determinar<br> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		resources=["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerrariaAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		var troops = [];
		troops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		troops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		troops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		attacktype = ["Reforço", "Ataque", "Assalto"]
		break;


	case "pt"://thanks RASCO and Tuga
		allbuildwithid = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina ", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		allresindorf1=["Bosque", "Poço de barro", "Mina de ferro", "Campo de cereais"]
		addTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		TaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		raceName = ["Romanos", "Teutões", "Gauleses"];
		taskoftext = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição", "Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas", "Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration","minutos","parado","ligado","ligar","parar"];
		errorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		otherText = ["Nota importante", "Apenas os campos de recursos da capital <br>podem ser elevados a nivel 20 . A sua capital <br> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br>Visite o seu perfil para determinar as raça.<br>", "Por favor visite a sua mansão do heroi para determinar<br> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		resources=["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerraçãoAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariçaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariçaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		var troops = [];
		troops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		troops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		troops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		attacktype = ["Reforço", "Ataque", "Assalto"]
		break;

               case "se"://thanks to Arias
		allbuildwithid = ["Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "", "Sågverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stort stall", "Stadsmur", "Jordvall", "Palisad", "Stenmurare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder", "Vattenbrunn"]
                                     allresindorf1=["Skogshuggare", "Lergrop", "Järngruva", "Vetefält"]
		addTaskText = ["Lägg till uppgift", "Stil", "Aktiv by", "Task target", "Till", "Läge", "Kontruktions stöd", "Råvaro koncentration", "Flytta upp", "Flytta ner", "Radera", "Uppgifter", "Flytta ", "Radera alla uppgifterna"];
		TaskKind = ["Uppgradering:", "Ny byggnad:", "Attack:", "Forskning:", "Träning:", "Transport:", "NPC:", "Demolish:", "Celebration:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Nivå ", "Handel", "ID", "Capital", "Start time", "this timesetting is unuseful now.", "till", "By", "Transport", "från", "Transport till", "Transport från", "Återvänder från", "Råvaror", "Byggnad", "Konstruera en ny byggnad", "Tom", "Nivå"];
                                     raceName = ["Romare", "Germaner", "Galler"];
		taskoftext = ["Schemalägg uppgradering", "Schemalägg ny byggnad", "Uppgradera fält", "Ej Aktiv", "Starta", "Startad", "Avbryt", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport lyckades", "Uppgifter", "Trans_In_limit", "Standard", "Ändra ", "Trä/Lera/Järn", "Vete", "Schemalägg demolition", "Schemalägg attack", "Attack type", "Res tid", "antal upprepningar", "interval time","00:00:00","Catapult target","Random", "Okänd", "times", "Månad", "Dag", "Trupper skickade", "Schemalägg Träning","Tränings plats","Träningen klar","Anpassad transport","Sätt intervallen för omladdning av sidan","Detta är intevallen för omladdning av sida,\n standard är 20 minuter, vänligen ange ny intervall:\n\n","Trans_Out_Rmn","Schemalägg fest","Liten fest","Stor fest","Sätt intervall av råvarukoncentration","minuter","Pausad","Kör","Aktivera","Inaktivera"];
		errorText = ["För få råvaror", "Dina arbetare är redan ute på jobb", "Byggnad klar", "Påbörjar byggnad", "Under utveckling", "Ditt magasin är för litet. Vänligen uppgradera ditt magasin för att fortsätta ditt byggnadsarbete.", "Din silo är för liten. Vänligen uppgradera din silo för att fortsätta ditt byggnadsarbete.", "Tillräckligt med resurser", "Brist på mat: utöka vetefälten först!", "En fest pågår redan."];
		otherText = ["Important note", "Only the resource fields of the capital can <br>be upgraded to level 20. Now your capital<br> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup klar", "Avbruten", "Starta uppgifterna", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br>Visit your Profile to determine your race.<br>", "Please also visit your Hero's Mansion to determine<br> the speed and the type of your hero."];
		allsourceString = "SkogshuggareLergropJärngruvaVetefält"
		resources=["Trä","Lera","Järn","Vete"];
		allbuildString = "SkogshuggareLergropJärngruvaVetefältSågverkMurbrukJärngjuteriVetekvarnBageriMagasinSiloSmedjaVapenkammareTornerplatsHuvudbyggnadSamlingsplatsMarknadsplatsAmbassadBarackerStallVerkstadAkademiGrottaStadshusResidens PalatsSkattkammareHandelskontorStor barackStort stallStadsmurJordvallPalissadStenhuggareBryggeriFällaHjältens egendom"
                		
		var troops = [];
		troops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Spårare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];
		troops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];
		troops[2] = ["Falanx", "Svärdskämpe", "Spårare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];
		attacktype = ["Förstärkning", "Normal", "Plundring"]
		break;

                     case "itt"://thanks Hamkrik 
                                     allbuildwithid = ["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "", "Falegnameria", "Fabbrica di Mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Camera del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura Cittadine", "Fortificazioni", "Palizzata", "Genio civile", "Birrificio", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia", "Fonte Equestre"]; 
                                     allresindorf1=["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano"] 
                                     addTaskText = ["Aggiungere Compito", "Stilo", "Villaggio Attivo", "Obiettivo del Compito", "Alla", "Mode", "Supporto di Costruzione", "Resource concentration", "SU", "JU", "Cancella", "   Contenuto di Compito", "Movere", "Cancella tutti i Compiti"]; 
                                     TaskKind = ["Amplia", "Nuovo Edificio", "Attacco", "Ricerca", "Addestra", "Trasporto", "NPC", "Demolire", "Festa"]; 
                                     maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"]; 
                                     gametext = ["Livelo", "Mercanti", "ID", "Capitala", "Tempo di Inizio", "questa impostazione di timpo non si usa.", "alla", "Villaggio", "transporto", "dalla", "Transporto alla", "Transporto dalla", "Retorno dalla", "risorse", "edifici", "Costruisci nuovo edificio", "vuoto", "livelo"]; 
                                     raceName = ["Romani", "Teutoni", "Galli"]; 
                                     taskoftext = ["Programma Ampliamento", "Programma Nuovo Efificio", "AutoResUpD", "Non_attivo", "Start", "Iniziato", "Sospeso", "The resource fields distribution of this village is ", "Autotransporto", "Autotransporto non e aperto", "Aperto", "Transportato successo", "Lista Compiti", "Trans_In_limit", "Default", "Modificare", "Legno/Argilla/Ferro", "Grano", "Demolire", "Programma Attacco", "Tipo Attacco", "Tempo Percorso", "ripeti", "intervalo di tempo","00:00:00","Obiettivo Catapulta", "Random", "Scunosciuto", "volte", "Mese", "Giorno", "Truppe Inviate", "Programma Addestramento", "Addestra site", "Addestramento Finito","Transporto Diverso","ripeti numero volte","questo è intervalo di ricarica pagina,\n default è 20 minute, per favore inserisce nuovo tempo:\n\n","Trans_Out_Rmn","Programma la Festa","festa picola","festa grande","Imposta il Intervalo di Concentrazione di Resurse","minute","in attesa","corrente","fare","pausa"]; 
                                     errorText = ["Mancano le resurce.", "I Lavoratori Sono Pronti per Lavorare", "Edificio Completo", "Inizia Edificio", "Nella Ricerca", "Il tuo Magazzino e Picolo. Per favore Amplia il Magazzino per continuare la costructione", "Il tuo Granaio e Picolo. Per favore Amplia il Granaio per continuare la costructione", "Resurse sufficientemente","Mancanza di Cibo: Amplia Campo di grano!","Pronta la Fiesta"]; 
                                     otherText = ["Nota Importante ", "Solo i Campi della Capitale possono essere ampliate al livelo 20. La tua capitale non è determinata. Visita il tuo Profile per favore.", "Shortcut here ^_^", "Setup compiuto", "Cancellato", "Inizia i Compiti", "Ampliamento con successo", "Iniziato con successo", "La tua rasa è sconosciuta, anche il tipo di truppe.Visita il tuo Profile per determinare la rasa.", "Per favore visita Circolo degli eroi per determinare la velocita e tipo di eroe."];
                                     allsourceString = "SegheriaPozzo d'argillaMiniera di ferroCampo di grano" 
                                     resources=["legno","argilla","ferro","grano"]; 
                                     allbuildString = "FalegnameriaFabbrica di MattoniFonderiaMulinoFornoMagazzinoGranaioFabbroArmeriaArenaCentro del villaggioCasermaMercatoAmbasciataCampo d'addestramentoScuderiaOfficinaAccademiaDeposito SegretoMunicipioResidenceCastelloCamera del tesoroUfficio commercialeGrande casermaGrande scuderiaMura CittadineFortificazioniPalizzataGenio civileBirrificioEsperto di trappoleCircolo degli eroiGrande MagazzinoGrande GranaioMeravigliaFonte Equestre" 
                                     var troops = []; 
                                     troops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria Romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"]; 
                                     troops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria Teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"]; 
                                     troops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria Gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribù", "Decurione", "Eroe"]; 
                                     attacktype = ["Rinforzi", "Attacco", "Raid"] 
                                     break;
                
	case "fr"://thanks Tuga
		allbuildwithid = ["Bûcherons", "Carrière de terre", "Mine de fer", "Ferme", "", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place de tournois", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Ecurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre aux trésors", "Comptoir de commerce", "Grande Caserne", "Grande Écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de Pierres", "Brasserie", "Fabricant de pièges","Manoir du héros", "Grand dépôt de ressources", "Grand silo de céréales", "Merveille du monde", "Abreuvoir"];
		allresindorf1=["Bûcheron", "Carrière de Terre", "Mine de fer", "Ferme de céréales"]
		addTaskText = ["Ajouter tache", "stile", "Village actif", "Cible", "Vers", "Mode", "Aide a la construction", "Quantité de ressources", "Bouger vers le haut", "bouger vers le bas", "Effacer", "&#160;&#160;&#160;Taches", "Bouger ", "Eleminer toutes les taches"];
		TaskKind = ["Évolution ", "Nouvelle construction ", "Attaque", "Recherche", "Entreiner", "Transport", "NPC", "Démolition", "Fête"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Niveau", "Marchands", "Identification", "Capitale", "Inicio", "this timeseting is unuseful now.", "Vers", "Village", "Transport", "de", "Transport vers", "Transport de", "Retour de", "Ressources", "Bâtiment", "Construire un nouveau bâtiment", "Vazio", "Niveau"];
		raceName = ["Romains", "Germains","Gaulois"];
		taskoftext = ["Planifier evolution", "Planifier nouvelle construction", "ResourcesUpD", "OFF", "Comencer", "ON", "Arreter", "La distribution des champs de ce village est ", "Autotransport", "Auto transport n est pas ouvert", "Ouvert", "Transport avec succès", "Liste de planification", "Limit", "Defaut", "Modifier", "Bois/Terre/Fer", "Céréales", "Planification de demolition", "Planification d´un attaque", "Type d´attaque", "Temps de voyage", "Repeter numero de fois", "Temps de intervales","00:00:00","Cible catapulte","Aléatoire", "Inconnu", "Fois", " Mois", " Jour", "Troupes envoyées", "Planification d´entrainement","Train ubication","Planification d´entrainement fini","Transport personaliser","Setup Interval Time of Reload","This is the interval of page reload ,\n default sont 20 minutes, Insérer nouveau temps:\n\n","Remain","Planifier fête","petite fête","grande fête","Set Interval of Resources concentration","minutes","arrêté","lié","lier","arrêter"];
		errorText = ["Pas assez de ressources", "Les ouvriers sont déjà au travail", "Construction complète", "Début de la construction", "Dans développement", "Son Dépôt de ressources est petit. Évolue son Dépôt de ressources pour continuer sa construction", "Son silo de céréales est petit. Évolue son Silo de céréales pour continuer sa construction", "Ressources suffisantes","Une fête est déjà organisée"];
		otherText = ["Il remarque important", "Seulement les champs de ressources du capitale <br>peuvent être élevés à niveau 20. Son capital <br> n'est pas décelable. S'il vous plaît il visite son profil.", "Raccourci ici ^_^", "Installation conclue", "Annulé", "Initier les tâches", "Upgrade avec succès", "Exécuter avec succès", "Sa race est inconnue, et son type de troupe aussi. <br>Il visite son profil pour déterminer la race.<br>", "S'il vous plaît il visite sa Manoir du héros pour déterminer<br>la vitesse et le type de héros."];
		allsourceString = "BûcheronCarrière de TerreMine de ferFerme de céréales"
		resources=["Bois","Terre","Fer","Céréales"];
		allbuildString = "ScierieUsine de poteriesFonderieMoulinBoulangerieDépôt de ressourcesSilo de céréalesArmurerieUsine d'armuresPlace de tournoisBâtiment principalPlace de rassemblementPlace du MarchéAmbassadeCaserneEcurieAtelierAcadémieCachetteHôtel de villeRésidencePalaisChambre aux trésorsComptoir de commerceGrande CaserneGrande ÉcurieMur d'enceinteMur de terrePalissadeTailleur de PierresBrasserieFabricant de piègesManoir du hérosGrand dépôt de ressourcesGrand silo de céréalesMerveille du mondeAbreuvoir"
		var troops = [];
		troops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapulte de feu", "Sénateur", "Colon", "Héros"];
		troops[1] = ["Combattant au gourdin", "Combattant à la lance", "Combattant à la hache", "Eclaireur", "Paladin", "Cavalier Teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Héros"];
		troops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de Guerre", "Chef", "Colon", "Héros"];
		attacktype = ["Assistance", "Attaque", "Pillage"]
		break;
		
	case "si": //thanks Bananana and Tuga
		allbuildwithid = ["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišce", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišce", "Gradbeni ceh", "Zbirališce", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palaca", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Pivnica", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišce", "Velika žitnica", "Cudež sveta"]; 
		allresindorf1=["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje"] 
		addTaskText = ["Dodaj nalogo", "Style", "Aktivna vas", "Nadgradi", "Na", "Mode", "Construction support", "Resources concentration", "Prestavi gor", "Prestavi dol", "Izbriši", "   Naloge", "Premakni ", "Izbriši vse naloge"]; 
		TaskKind = ["Nadgradi", "Zazidljiva parcela", "Napad", "Razišci", "Uri", "Transport", "NPC", "Demolish", "Festival"]; 
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"]; 
		gametext = ["Stopnja", "Merchants", "ID", "Prestolnica", "Zacetek ob", "Nastavitev casa ni pomembna.", "to", "Vas", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Postavi nov objekt", "empty", "level"]; 
		raceName = ["Rimljani", "Tevtoni", "Galci"]; 
		taskoftext = ["Nadgradi kasneje", "Postavi nov objekt", "Surovine gor", "Pauza", "Zacetek", "Zaceto", "Preklici", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Naloge", "Trans_In_limit", "Osnovno", "Spremeni", "Les/Glina/Železo", "Crop", "Podri kasneje", "Napadi kasneje", "Tip napada", "Do napada", "Ponovi", "Vrnitev cez","00:00:00","Tarca katapultov","Nakljucno", "Unknown", "times", "Month", "Day", "Enote poslane", "Uri kasneje","Mesto urjenja","Urjenje koncano","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","mali festival","veliki festival","setInterval of Resources concentration","minute","Pavza","Vklopljeno","Vklop","Pavza"]; 
		errorText = ["Primankljaj surovin.", "Delavci so že na delu.", "Zgrajeno", "Zacnem z gradnjo", "V razvoju", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"]; 
		otherText = ["Pomembno!", "Samo polja v prestolnicigredo do stopnje 20 . A sua capitalnao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Naloga uspešno dodana", "Preklicano", "Zacni z nalogo", "Uspešno nadgrajeno", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também.Visite o seu perfil para determinar as raça.", "Por favor visite a sua mansão do heroi para determinara velocidade e o tipo de heroi."]; 
		allsourceString = "GozdarGlinokopRudnik železaŽitno polje" 
		resources=["Les","Glina","Železo","Žito"]; 
		allbuildString = "ŽagaOpekarnaTalilnica železaMlinPekarnaSkladišceŽitnicaIzdelovalec orožjaIzdelovalec oklepovVadbišceGradbeni cehZbirališceTržnicaAmbasadaBarakeKonjušnicaAkademijaŠpranjaMestna hišaRezidencaPalacaZakladnicaTrgovski centerVelikebarakeVelika konjušnicaMestno obzidjeZemljeni zidPalisardaKamnosekPivovarnaPostavljalec pastiHerojeva rezidencaVeliko skladišceVelika žitnicaCudež svetaNapajališce" 
		var troops = []; 
		troops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist", "Heroj"]; 
		troops[1] = ["Gorjacar", "Sulicar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist", "Heroj" ]; 
		troops[2] = ["Falanga", "Mecevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist", "Heroj"]; attacktype = ["Okrepitev", "Napad", "Ropanje"] 
		break;
		
	case "vn"://thanks Tuga
		allbuildwithid = ["Ti?u Phu", "M? Ð?t Sét", "M? s?t", "Ru?ng lúa", "", "Xu?ng G?", "Lò G?ch", "Lò Rèn", "Nhà Xay Lúa", "Lò Bánh", "Nhà Kho", "Kho Lúa", "Th? Rèn", "Lò Luy?n Giáp", "Võ Ðài", "Nhà Chính", "Binh Tru?ng", "Ch?", "Ð?i S? Quán", "Tr?i Lính", "Chu?ng Ng?a", "Xu?ng", "H?c Vi?n", "H?m Ng?m", "Tòa Th? Chính", "Lâu Ðài", "Cung Ði?n", "Kho B?c", "Phòng Thuong M?i", "Doanh Tr?i L?n", "Tr?i Ng?a", "Tu?ng Thành", "Tu?ng Ð?t", "Tu?ng Rào", "Th? Xây Ðá", "Quán bia", "H? B?y","Lâu dài tu?ng", "Nhà Kho L?n", "Kho Lúa L?n", "K? Quan", "Tàu ng?a"];
		allresindorf1=["Ti?u phu", "M? Ð?t Sét", "M? s?t", "Ru?ng Lúa"]
		addTaskText = ["Thêm nhi?m v?", "Lo?i", "T?i làng", "M?c tiêu", "T?i", "Phuong th?c", "T? d?ng", "Tùy ch?nh", "Di chuy?n lên", "Di chuy?n xu?ng", "Xóa", "&#160;&#160;&#160;N?i dung công vi?c", "Di chuy?n", "Xóa t?t c? danh m?c"];
		TaskKind = ["Nâng c?p", "Ki?n Trúc M?i", "T?n công", "Nghiên c?u", "Hu?n luy?n", "V?n chuy?n", "NPC", "Phá h?y", "an m?ng"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["C?p ", "Lái Buôn", "T?i v? trí", "Th? dô", "B?t d?u t?i", "Chua dùng du?c ch?c nang này.", "d?n", "Làng", "v?n chuy?n", "t?", "V?n chuy?n d?n", "V?n chuy?n t?", "Tr? v? t?", "Tài nguyên", "Ki?n trúc", "Xây Ki?n Trúc M?i", "không có gì", "C?p"];
		raceName = ["T?c Romans", "T?c Teutons", "T?c Gauls"];
		taskoftext = ["Lên l?ch nâng c?p ki?n trúc này", "Lên l?ch xây ki?n trúc này", "T? d?ng nâng c?p các m?", "Chua kích ho?t", "Kích ho?t", "Ðã kích ho?t", "H?y", "Ðây là làng lo?i ", "T? d?ng g?i tài nguyên", "T? d?ng g?i tài nguyên chua du?c kích ho?t", "Ðã du?c kích ho?t", "G?i thành công", "Danh m?c", "Tài nguyên b?n mu?n nh?n", "M?c d?nh", "Tùy ch?nh ", "G?/Ð?t sét/S?t", "Lúa", "Lên l?ch phá h?y công trình", "Lên l?ch t?n công làng này", "Lo?i t?n công", "Th?i gian d? d?n noi", "S? l?n l?p l?i", "Kho?ng cách gi?a các l?n l?p l?i","00:00:00","M?c tiêu cata","Ng?u nhiên", "Chua bi?t", "Gi?", "Tháng", "Ngày", "Ðã g?i lính", "Lên l?ch hu?n luy?n lính này","Train ubication","Lính dang du?c hu?n luy?n","Tùy ch?nh g?i tài nguyên","Thi?t l?p th?i gian t?i l?i trang web","Ðây là kho?ng th?i gian t?i l?i trang web ,\n M?c d?nh là 20 phút, hãy di?n vào s? phút b?n mu?n thay d?i:\n\n","Tài nguyên b?n mu?n ch?a l?i","Lên l?ch an m?ng","An m?ng nh?","An m?ng l?n","Thi?t l?p kho?ng th?i gian b?n mu?n g?i tài nguyên","Phút","Ðang t?m d?ng","Ðang thi hanh","Thi hành","T?m d?ng"];
		errorText = ["Quá ít tài nguyên.", "Công nhân dang làm nhi?m v? khác.", "Ki?n trúc dã hoàn thiên", "B?t d?u xây d?ng", "Ðang xây d?ng", "Nhà kho quá nh?. Hãy nâng c?p nhà kho m?i xây d?ng du?c ki?n trúc", "Kho lúa quá nh?. Hãy nâng c?p kho lúa m?i xây du?c ki?n trúc", "Quá ít tài nguyên","","Hi?n dang có bu?i l? an m?ng"];
		otherText = ["Chú thích quan tr?ng", "Ch? th? dô m?i có th?<br>nâng c?p các m? lên level 20. TH? dô c?a b?n<br> chua th?y. hãy vào ph?n h? so c?a b?n.", "Click vào dây", "Cài d?t hoàn t?t", "Ðã h?y", "B?t d?u công vi?c", "Nâng c?p thành công", "Kích ho?t thành công", "CHua bi?t b?n thu?c t?c nào. <br>Vì v?y b?n nên vào h? so d? c?p nh?t thông tin.<br>", "B?n cung nên vào Lâu Ðài Tu?ng d? c?p nh?t<br> t?c d? và lo?i tu?ng."];
		allsourceString = "Ti?uPhuM? Ð?t SétM? S?tRu?ng Lúa"
		resources=["G?","Ð?t sét","S?t","Lúa"];
		allbuildString = "Xu?ng G?Lò G?chLò RènNhà Xay LúaLò BánhNhà KhoKho LúaTh? RènLò Luy?n GiápVõ ÐàiNhà ChínhBinh Tru?ngCh?Ð?i S? QuánTr?i LínhChu?ng Ng?aXu?ngH?c Vi?nH?m Ng?mTòa Th? ChínhLâu ÐàiCung Ði?nKho B?cPhòng Thuong M?iDoanh Tr?i L?nTr?i Ng?aTu?ng ThànhTu?ng Ð?tTu?ng RàoTh? Xây ÐáQuán biaH? B?yLâu dài tu?ngNhà Kho L?nKho Lúa L?nK? QuanTàu ng?a"
		
		var troops = [];
		troops[0] = ["Lính Lê Duong", "Th? V?", "Chi?n Binh Tinh Nhu?", "K? Binh Do Thám", "K? Binh", "K? Binh Tinh Nhu?", "Xe Công Thành", "Máy Phóng L?a", "Nguyên Lão", "Dân Khai Hoang", "Tu?ng"];
		troops[1] = ["Lính Chùy", "Lính Giáo", "Lính Rìu", "Do Thám", "Hi?p Si Paladin", "K? Si Teutonic", "Ð?i Công Thành", "Máy B?n Ðá", "Th? Linh", "Dân Khai Hoang", "Tu?ng"];
		troops[2] = ["Lính Pha Lang", "Ki?m Si", "Do Thám", "K? Binh S?m Sét", "Tu Si", "K? Binh", "Máy N?n", "Máy B?n Ðá", "Tù Tru?ng", "Dân Khai Hoang", "Tu?ng"];
		attacktype = ["Ti?p vi?n", "T?n công", "Cu?p bóc"]
		break;

                 case "ru":
                                     allbuildwithid = ["?????????", "???????? ??????", "???????? ??????", "?????", "", "??????????? ?????", "????????? ?????", "?????????????? ?????", "??????????? ????????", "???????", "?????", "?????", "??????? ??????", "??????? ????????", "?????", "??????? ??????", "????? ?????", "?????", "??????????", "???????", "???????", "??????????", "????????", "??????", "??????", "??????????", "??????", "????????????", "???????? ??????", "??????? ???????", "??????? ???????", "????????? ?????", "???????? ???", " ????????", "?????????", "??????", "?????????","???????", "??????? ?????", "??????? ?????", "???? ?????", "???????"];
                                     allresindorf1=["?????????", "???????? ??????", "???????? ??????", "?????"]
                                     addTaskText = ["???????? ???????", "??????", "???????? ???????", "???? ???????", "| ????", "???", "????????? ?????????????", "???????????? ????????", "?????", "????", "", "", "", "??????? ??? ???????"];
                                     TaskKind = ["????????:", "????? ??????:", "?????????:", "???????????:", " ??????:", "????????? ???????:", "NPC:", "?????????:", "?????????:"];
                                     maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
                                     gametext = [" ??????? ", "????????", "ID", "???????", "????? ??????", "(???????? ?? ????????)", "?", "???????", "???????????????", "??", "??????????????? ?", "??????????????? ??", "??????????? ??", "???????", "??????", "????????? ????? ??????", "?????", "???????"];
                                     raceName = ["???????", "????????", "?????"];
                                     taskoftext = ["????????????? ?????????", "????????????? ????? ??????", "?????? ???????", "????", "?????", "???", "????", "????????????? ????? ? ???????: ", "????????????", "???????????? ????.", "???.", "??????? ??????????", "* ??????? *", "??????????? ?????", "???", "???????? ", "??????/?????/??????", "?????", "????????????? ??????????", "????????????? ?????", "??? ?????", "????? ? ????", "???????", "??????????","00:00:00","???? ?????","????????", "??????????", " ???", "/", " :????/?????: ", "??????", "????????????? ????","Train site","???????? ????? ?????????","??????? ????????","???????? ??????????","??? ???????? ?????????? ???????? ,\n ?? ????????? - 20 ?????, ??????? ????? ?????:\n\n","??????????? ??????","????????????? ????????????","????? ????????","??????? ????????","????????? ????????? ???????????? ?????","??????","???????????","????????","?????","?????"];
                                     errorText = ["???????????? ?????", "??? ????????? ?????? ??????", "??? ?????? ????????? ?????????", "??????? ?????????????", "??????? ????????", "???????????? ??????????? ??????", "???????????? ??????????? ??????", "?????????? ????????","","?????????? ?????????"];
                                     otherText = ["?????? ???????", "?????? ? ??????? ???? ????? ???? ?? ?????? 20. ??????? ?? ??????????.??????? ? ??????? ??????????", "?????? ??? ^_^", "????????? ?????????", "????????", "?????? ??????", "????????? ?????? ???????", "???????", "??? ????? ???????????.?????????? ??????? ? ???????.", "????? ?????????? ??????? ? ??????? ??? ??????????? ???? ? ???????? ?????"];
                                     allsourceString = "????????????????? ?????????????? ???????????"
                                     resources=["?????????","?????","??????","?????"];
                                     allbuildString = "??????????? ?????????????? ??????????????????? ???????????????? ???????????????????????????????? ????????????? ???????????????????? ??????????? ???????????????????????????????????????????????????????????????????????????????????????????????????? ????????????? ?????????????? ???????????????? ????????????? ????????????????????????????????????????????????? ???????????? ????????? ????????????"
                                     var troops = [];
                                     troops[0] = ["????????", "???????????", "??????????", "?????? ?????????", "??????? ??????????", "??????? ??????", "?????", "???????? ??????????", "???????", "?????????", "?????"];
                                     troops[1] = ["????????", "??????????", "????????", "?????", "???????", "?????????? ???????", "??????????? ??????", "??????????", "?????", "?????????", "?????"];
                                     troops[2] = ["???????", "??????", "????????", "?????????? ????", "?????-???????", "???????? ???????", "?????", "????????", "????????????", "?????????", "?????"]; attacktype = ["????????????", "?????????", "?????"]
                                     break;  

               case "ba"://thanks  ieyp
	                allbuildwithid = ["Drvosjeca", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje", "", "Pilana", "Ciglana", "Livnica", "Mlin", "Pekara", "Skladište", "Silos", "Oruzarnica", "Kovacnica oklopa", "Mejdan", "Glavna zgrada", "Mesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Stala", "Radionica", "Akademija", "Skloniste", "Opstina", "Rezidencija", "Palata", "Riznica", "Trgovacki centar", "Velika kasarna", "Velika stala", "Gradski zid", "Zemljani zid", "Taraba", "Kamenorezac", "Pivnica", "Zamkar","Dvorac heroja", "Veliko skladiste", "Veliki silos", "WW", "Pojiliste"];
	               	allresindorf1=["Drvosjeca", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje"]
		addTaskText = ["Dodaj zadatak", "Nacin", "Aktivna sela", "Zadata meta", "Prema", "Mod", "Podrska izgradnje", "Koncentracija resursa", "Pomeri gore", "Pomeri dole", "Del", "&#160;&#160;&#160;Task contents", "Pomeri ", "Obrisi sve zadatke"];
		TaskKind = ["Unapredi", "Nova izgradnja", "Napad", "Istrazivanje", "Obuci", "Transport", "NPC", "Rusiti", "Zabava"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Trgovci", "ID", "Glavni grad", "Vreme pocetka", "ovo vremensko podesavanje je beskorisno", "prema", "Selo", "transport", "iz", "Prebacivanje prema", "Prebacivanje iz", "povratak iz", "resursi", "izgradnja", "Napravi novu zgradu", "prazno", "nivo"];
		raceName = ["Rimljani", "Teutonci", "Gali"];
		taskoftext = ["Raspored za nadogradnju", "Napravi novi raspored", "AutoResUpD", "Not_run", "Pokreni", "Pokrenuto", "Zaustavi", "Distribucija resursnih polja ovog sela je ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Transport sa limitom", "Podrazumevano", "Izmeni", "Drvo/Glina/Gvozdje", "Njiva", "Lista rusenja", "Lista napada", "Vrsta napada", "Vreme prevoza", "broj ponavljanja", "Vremenski interval","00:00:00","Meta katapulta","Nasumicno", "Nepoznat", "times", "Mesec", "Dan", "Slanje trupa", "Lista obuke","Mesto obuke","TreningZadatak uraditi","prilagodenTransport","podesi vreme ponovnog ucitavanja "," ovo je interval ponovnog ucitavanja strane, \n podrazumevan vrednost je 20 minuta, molimo vas ubacite novo vreme:\n  \n","Trans_Out_Rmn","Lista zabava","mala zabava","velika zabava"," Podesite interval koncentracie resursa ","minuti","zaustavljanje","pokrece se","pokreni","pauza"];
		errorText = ["Premalo resursa. Buahaha :D", "Radnici su vec na poslu :P", "Izgradnja zavrsena", "Pokretanje izgradnje", "U izgradnji", "Skladiste je premalo. Prosirite skladiste kako bi nastavili sa izgradnjom", "Silos je malecak. Prosirite silos kako bi nastavili sa izgradnjom", "Dovoljno resursa","Premalo zita, prvo prosiri njive!","Proslava je u toku"];
		otherText = ["Vazna napomena", "Samo u glavnom gradu mozete <br> prosiriti resursna polja preko nivoa 10. Tvoj glavni grad <br> nije otkriven, poseti svoj profil.", "Precica ovde ^^", "Podesavanja gotova", "Otkazano", "Pokreni zadatke", "Nadogradnja uspesna", "Pokretanje uspesno", "Vase pleme je nepoznato, stoga I tip trupa. Posetite <br> svoj profil da vidite pleme. <br>","Posetite dvorac heroja da saznate <br> brzinu I tip svog heroja "];
		allsourceString = "DrvosecaRudnik glineRudnik gvozjdaNjiva"
		resources=["drvo","glina","gvozdje","zito"];
		allbuildString = "PilanaCiglanaLivnica GvozdjaMlin PekaraSkladišteSilosOruzarnicaKovancina OklopaMejdan ZgradaMesto OkupljanjaPijacaAmbasadaKasarnaStalaRadionicaAkademijaSklonisteOpstinaRezidencijaPalataRiznicaTrgovacki CentarVelika KasarnaVelika StalaGradski ZidZemljani ZidTarabaKamenorezacPivnicaZamkarDvorac HerojaVeliko SkladisteVeliki SilosWWPojiliste"
		var troops = [];
		troops[0] = ["Legionar", "Pretorijanac", "Imperijanac", "Izvidjac", "Imperatorova konjica", "Cezareva konjica", "Ovan", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"];
		troops[1] = ["Batinar", "Kopljanik", "Sekiras", "Izvidjac", "Paladin", "Tetutonski vitez", " Ovan ", "Katapult", "Poglavica", "Naseljenik", "Heroj"];
		troops[2] = ["Falanga", "Macevalac", "Izvidjac", "Teutateov grom", "Druid", "Heduan", " Ovan ", "Katapult", "Staresina", "Naseljenik", "Heroj"];
		attacktype = ["Pojacanje", "Normalan", "Pljacka"]
		break;

case "ir"://nekooee
		allbuildwithid = ["???? ???", "???????", "???? ???", "???? ???", "", "??? ???", "??? ???", "??? ???", "?????", "???????", "?????", "????? ???", "????? ????", "??? ????", "????? ?????", "??????? ????", "???????", "?????", "?????????", "?????????", "?????", "??????", "?????????", "???????", "????? ???", "????????", "???", "?????", "???? ?????", "????????? ????", "????? ????", "????? ???", "????? ???", "?????", "????????", "????????", "??? ???","????? ??????", "????? ????", "????? ???? ???", "????? ????", "?????? ??? ??"];
		allresindorf1=["???? ???", "???? ???", "??? ????", "???? ???"]
		addTaskText = ["????? ???? ?????", "????", "????? ????", "??? ????", "?? ???", "???", "???????? ?? ???? ??", "????? ?????? (????? ?????)", "???? ????", "????? ?????", "???", "&#160;&#160;&#160;?????? ?????", "???? ????", "??? ???? ???? ?????"];
		TaskKind = ["?????? ????", "???? ????", "????", "?????", "????? ????", "?????? ????", "????? ?????", "????? ????", "??????? ???"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["???", "?????????", "?????", "????", "???? ????", "??? ????? ???? ?? ??? ???? ?? ????? ???.", "?? ???", "?????", "?????? ????", "??", "?????? ??", "?????? ??", "?????? ??", "?????", "???????", "???? ??????? ????", "???? ????", "???"];
		raceName = ["???? ??" ,"???? ??" ,"??? ??"];
		taskoftext = ["?????? ??????", "?????? ??????? ????", "????? ???????? ?????", "?? ??? ???? ??? ????", "????", "???? ???", "???? ????", "???? ????? ????? ?? ??? ????? ??? ", "????? ?????? ?????", "??? ? ??? ?????? ??? ??? ????", "??? ???", "??? ? ??? ?? ??????", "???? ?????", "??????? ??????", "??????", "????? ????", "???/???/???", "????", "?????? ?????", "?????? ????", "??? ????", "???? ???", "???? ?????", "????? ?????","00:00:00","??? ??????","??????", "???????", "????", "???", "???", "??????? ??????? ????", "?????? ?????","??? ?????","????? ????? ????? ??","????? ?????? ?????"," ????? ????? ?? ???? ??? ?????? ????"," ??? ????? ????? ?? ???? ???????? ??? ???,\n ?????? 20 ????? ?? ????, ???? ????? ???? ?? ???? ???? ????:\n\n","Trans_Out_Rmn","?????? ???","??? ????","??? ????"," ????? ????? ????? ??? ?????? ?? ???? ????? ??????","?????","?? ??? ???","?? ????","????? ????","???"];
		errorText = ["????? ?????.", "??????? ????? ??? ?? ?????.", "???? ? ??? ????? ?????", "???? ? ??? ???? ??", "?? ??? ?????", "????? ??? ???? ??? ???? ????? ?? ?????? ???? ?? ???? ? ??? ????? ???? ???", "????? ???? ??? ???? ??? ???? ????? ??? ?? ?????? ???? ?? ???? ? ??? ????? ????", "????? ????","????? ???? ?????: ????? ???? ??? ?? ?????? ????!","?? ??? ???? ?? ??? ?? ??? ??????? ???"];
		otherText = ["???? ????? ?????", "??? ????? ?? ????? ?????? ?? ?????? <br>?? ??? 20 ?????? ?????. ????? ?????? ???<br> ????? ???? ???? ???. ???? ?? ??????? ??? ???? ????.", "?????? ???? ?? ????? ^_^", "??????? ???? ??", "??? ??", "????? ???? ??", "?????? ?? ?????? ????? ??", "???? ?? ?????? ????? ??", "???? ??? ????? ????, ???????? ??? ??????? ???? ????. <br>???? ???? ??? ??????? ?? ??????? ??? ???? ????.<br>", "?????? ???? ???? ???? ?? ????? ?????? ???? ???? ??? <br> ??? ? ??? ??."];
		allsourceString = "???? ??? ??? ???? ???? ??? ???? ???"
		resources=["????","???","???","???"];
		allbuildString = "??? ??? ?????? ??? ??? ????? ??????? ????? ????? ??? ????? ???? ??? ???? ????? ????? ??????? ???? ??????? ????? ????? ????????? ????? ?????? ????????? ??????? ???????? ??? ????? ???? ????? ????? ???? ???? ????? ??? ????? ??? ????? ??? ????? ??? ????? ???? ???? ??? ??? ????? ?????? ????? ???? ????? ???? ???? ????? ???? ?????? ??? ??"
		var troops = [];
		troops[0] = ["??????", "?????", "???????", "??????", "??????", "?????? ????", "?????", "?????? ?????", "??????", "?????", "??????"];
		troops[1] = ["??????", "???? ???", "?????", "?????", "?????", "?????? ????", "?????", "??????", "????", "?????", "??????"];
		troops[2] = ["????? ?????", "???????", "?????", "???", "???? ?????", "?????? ???", "?????", "??????", "???? ?????", "?????", "??????"];
		attacktype = ["????????", "???? ????", "???? ????"]
		break;


case "ae": // By Dream1
		allbuildwithid =  ["??????", "???? ?????", "???? ????", "??? ?????", "", "???? ???????", "???? ?????", "???? ????", "???????", "????", "??????", "???? ??????", "??????", "?????? ???????", "???? ???????", "?????? ???????", "???? ??????", "?????", "???????", "??????", "???????", "??????? ???????", "?????????? ???????", "??????", "???????", "?????", "?????", "??????", "?????? ???????", "?????? ???????", "??????? ??????", "???? ???????", "?????? ??????", "??????", "???????", "???????", "??????","??? ???????", "?????? ??????", "???? ?????? ??????", "????? ??????", "????? ??????"];
		allresindorf1=["??????", "???? ?????", "???? ????", "??? ?????"]
		addTaskText = ["????? ????", "?????", "?????? ??????", "?????? ?????????", "???", "???", "??? ??????", "????? ???????", "????? ??????", "????? ??????", "???", "&#160;&#160;&#160;????? ??????", "????? ", "??? ???? ??????"];
		TaskKind = ["?????", "????? ????", "????", "???", "?????", "???", "???? ????????", "???", "????????"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["?????", "??????", "??????", "???????", "????? ?????", "??? ??????? ?? ????? ?????? ???? ???????.", " ???", "??????", "???", "??", "??? ???", "??? ??", "?????? ??", "???????", "???????", "????? ???? ????", "????", "???????"];
		raceName = ["???????", "???????", "???????"];
		taskoftext = ["?????? ?????? ???????", "?????? ?????? ????? ????", "??????? ????????", "??????", "???", "??????", "???? ?????", "?????? / ??????? ????? ????? ", "????? ????????", "?? ??? ??? ????? ????????", "???", "?? ????? ?????", "????? ??????", "Trans_In_limit", "???????", "?????", "???/???/????", "???", "?????? ?????? ?????", "?????? ?????? ??????", "??? ??????", "??? ??????", "??? ???? ???????", "?????? ??????","00:00:00","??? ????????","??????", "??? ?????", "????", "???", "???", "?????? ?????", "?????? ?????? ???????","???? ?????","???? ??????? ???","?????? ?????? ?????","????? ?????? ?????? ???????","??? ?? ?????? ?????? ?????? ?????? ,\n ????????? ?? 20 ?????,???? ??? ???? ???? ????:\n\n","Trans_Out_Rmn","?????? ?????? ????????","?????? ????","?????? ????","????? ?????? ?????? ?????? ???????","?????","?????","????","?????","?????"];
		errorText = ["??????? ????? ????.", "?????? ??????? ????.", "?????? ????", "??? ??????", "?? ???????", "??? ??? ????? ?????? ????? ", "??? ??? ????? ???? ?????? ????? ", "??????? ?????","","???? ?????? ????? ??????"];
		otherText = ["??????? ????", "??? ???? ??????? ?? ??????? <br>??? ??????? ??? ????? 20 .<br> ?? ??? ????? ???????. ????? ????? ????? ???????.", "???????? ??? ^_^", "?????? ?????????", "????", "??? ??????", "?? ??????? ?????", "?? ??????? ?????", "??????? ??? ??????, ???? ?? ????? ??? ??????. <br>????? ????? ????? ??????? ?????? ??? ???????.<br>", "????? ????? ????? ??? ???????<br> ?????? ???? ???? ????."];
		allsourceString = "???????????????????????????????"
		resources=["?????","?????","??????","?????"];
		allbuildString = "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"

		var troops = [];
		troops[0] = ["???? ???", " ???? ??????????", "???? ?????", "???? ????", "???? ???????", "????? ??????", "?????", "??????? ??????", "????", "??????", "?????"]; //???????
		troops[1] = ["????? ??????", "????? ????", "????? ????", "??????", "????? ??????", "????? ???????", "????? ???????", "???????", "??????", "??????", "?????"]; //???????
		troops[2] = ["???????", "?????", "????????", "??? ???????", "????? ?????", "????? ?????????", "????? ??????? ???????", "??????? ??????", "????", "??????", "?????"]; //???????
		attacktype = ["??????", "????: ????", "????: ?????"]
		break;

}
allString = allsourceString + allbuildString;
var mts = new Array();
mts[0]	= 16;
mts[1]	= 12;
mts[2]	= 24;
myhost="http://" + window.location.hostname

var inputs = document.evaluate('//form/descendant::input[@type="password"]', document, null, 7, null);
if (inputs.snapshotLength == 1 && 0 < inputs.snapshotItem(0).value.length) {
	inputs.snapshotItem(0).form.submit()
}


	getSingleVillageNum()
	if (!GM_getValue(myacc() + "_doing")) {
		GM_setValue(myacc() + "_doing", "1");
		GM_log("can't find doing, set doing = 1")
	}
	var taskdoing=GM_getValue(myacc() + "_doing");

	if (!GM_getValue(myacc() + "_option")) {
		GM_setValue(myacc() + "_option", "");
	}
	getTaskCookies()
	
	var pagefreshInterval=GM_getValue(myacc() + "_FreshInterval","20")
	var transsInterval = GM_getValue(myacc() + "_TransInterval", "30")
	
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
	
	function h1in(){
		return document.getElementsByTagName("h1")[0]
	}
		
	function herere(){
		return currentServer() + "_" + getuid() + "_" + currentID()
	}
	
	function myacc(){
		return currentServer() + "_" + getuid()
	}
	
	function currentID(){
		var theboys = document.evaluate("//table[@id='vlist']/descendant::td[@class='dot hl']", document, null, 9, null);
		if (theboys.singleNodeValue!=null) {
			theUrl = theboys.singleNodeValue.nextSibling.innerHTML.match(/newdid=\d{1,}/)
			getit = theUrl.toString().match(/\d{1,}/)
			return getit
		}
		else{
			return GM_getValue(myacc() + '_singleTownNEWDID')
		}
	}
	
	
	function currentVillageName(){
		var theVillageName = document.evaluate("//table[@id='vlist']/descendant::a[contains(@href,"+ currentID()+")]", document, null, 9, null);
		if (theVillageName.singleNodeValue != null) {
			return theVillageName.singleNodeValue.innerHTML
		}
		else{
			return GM_getValue(myacc() + "_mainvillageName")
		}
	}
	
	
	function getAllVillageNewdids(){
		var allNewdids = new Array();
		var allvillages = document.evaluate('id("vlist")/descendant::a[@href]', document, null, 6, null);
		if (allvillages.snapshotLength > 0) {//multi-villages
			for (var i = 0; i < allvillages.snapshotLength; i++) {
				if (allvillages.snapshotItem(i).href.indexOf("newdid") != -1) {
					newdiddd = allvillages.snapshotItem(i).href.match(/\d{3,}(?!\.)/);
					thenewlength = allNewdids.push(newdiddd);//+ ":" + thevillagenum
				}
			}
		}
		else {//single village
			allNewdids[0] = (GM_getValue(myacc() + '_singleTownNEWDID')) ? GM_getValue(myacc() + '_singleTownNEWDID') : ""
		}
		return allNewdids
	}
	
	
	
	function getSingleVillageNum(){
		if (!GM_getValue(myacc() + '_singleTownNEWDID')) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: myhost + "/dorf3.php",
				onload: function(result){
					var theString = result.responseText.match(/newdid=\d{1,}/)
					var villageNum = theString.toString().match(/\d{1,}/);
					GM_setValue(myacc() + '_singleTownNEWDID', villageNum.toString())
				}
			});
		}
	}
	
	
	
	function getErrorInfor(){
		var errors = GM_getValue(herere() + "_currentError")
			return errors
	}
	
	
	
	function getuid(){
		var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
		var privatea = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
		privateea=(privatee.singleNodeValue)?privatee:privatea
		return privateea.singleNodeValue.href.split("uid=")[1]
	}
	
	
	
	function getthebuildUrl(vil, task){
		GM_log("come into getthebuildUrl(), task= "+task)
		var url = myhost + "/build.php?newdid=" + vil + "&id=" + task[1];
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
					
					switch (task[0]) {//0_id_level_time_name   upgrade
						case "0":
							var leee=aDoc.getElementsByTagName("h1")[0].innerHTML.split(" ");
							level = leee[leee.length-1]
							GM_setValue(myacc() + "_" + vil + "_crtBuildlevel", level)
							var allanchors = aDoc.evaluate('id("content")//a[contains(@href,"?a=")]', aElem, null, 9, null);
							if (allanchors.singleNodeValue) {
								GM_log("i get the url ,it is " + allanchors.singleNodeValue.href)
								return allanchors.singleNodeValue.href
							}
							else {
								var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, 9, null); 
								GM_setValue(herere() + "_currentError",errors.singleNodeValue.innerHTML)
							    GM_log("oh No! I can't get the url, but i get the error infor ")
								return false
							}
							break;
						case "1"://1_id_level_gid_time_name   newbuild
							var newbdurl = aDoc.evaluate('id("content")//a[contains(@href,"?a='+task[3]+'")]', aElem, null, 9, null);
							if (newbdurl.singleNodeValue) {
								GM_log("i get the newbuild url ,it is " + newbdurl.singleNodeValue.href)
								return newbdurl.singleNodeValue.href
							}
							else {
								var h1i = aDoc.getElementsByTagName("h1")[0].innerHTML;
								if (h1i == gametext[15]) {
									var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, 9, null);
									GM_setValue(herere() + "_currentError", errors.singleNodeValue.innerHTML)
									GM_log("oh No! I can't get the url, but i get the error infor ")
									return false
								}
								else{
									GM_setValue(herere() + "_currentError", "newBuild can't run, something is here.")
									GM_log("oh No! newBuild can't run, something is here.")
									return false
								}
							}
							break;
					}
				}
			}
		}
		return callback()
	}
	
	
	function getcrtlevel(){
		var theTitle = h1in().innerHTML.split(" ");
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
				var mainvi = document.evaluate('//table[@id="villages"]/descendant::span[@class="none3"]', document, null, 9, null);
				themainv = mainvi.singleNodeValue.parentNode.firstChild.innerHTML
				mainpos=mainvi.singleNodeValue.parentNode.firstChild.href.match(/\d{2,}(?=&)/)
				GM_setValue(myacc() + "_mainvillageName", themainv);
				GM_setValue(myacc() + "_mainvillageId", getDidFromVillage(themainv));
				for (oo in raceName) {
					therace = new RegExp(raceName[oo])
					if (document.getElementsByTagName("body")[0].innerHTML.match(therace)) {
						GM_setValue(myacc() + "_raceID", oo.toString());
						break;
					}
				}
				coordx=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/\(-?\d{1,3}/g)[0].match(/-?\d{1,3}/)
				coordy=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/-?\d{1,3}\)/g)[0].match(/-?\d{1,3}/)
				GM_setValue(myacc() + "_mainVillageCoord", coordx+"/"+coordy)
				GM_setValue(myacc() + "_mainVillagePosition", mainpos.toString())
				GM_deleteValue(myacc() + "_undefined_WarehouseCap")
				GM_deleteValue(myacc() + "_undefined_ResourceNow")
				GM_deleteValue(myacc() + "_undefined_GranaryCap") 
			}
		}
	}
	
	function getResourceCap(){
		resource = [$("l4").innerHTML.split("/")[0], $("l3").innerHTML.split("/")[0], $("l2").innerHTML.split("/")[0], $("l1").innerHTML.split("/")[0]]
		resstring = resource.join("/")
		WarehouseCap = $("l4").innerHTML.split("/")[1];
		GranaryCap = $("l1").innerHTML.split("/")[1];
		GM_setValue(herere() + "_WarehouseCap", WarehouseCap);
		GM_setValue(herere() + "_GranaryCap", GranaryCap);
		GM_setValue(herere() + "_ResourceNow", resstring);
	}


	function HttpRequire(url, v, ta, k, l){
		GM_log("come into HttpRequire(), at "+getvillagefromdid(v)+" to build "+ta[ta.length-1])
		if (url) {
			nurl=url.split(".php?")[0]+".php?newdid="+v+"&"+url.split(".php?")[1]
			GM_xmlhttpRequest({
				method: 'GET',
				url: nurl,
				headers: "",
				onload: function(){
					switch (k) {
						case "0"://resource updata
							GM_deleteValue(myacc() + "_" + v + "_ResourceUpdataTime")
							GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1])
							if (l >= ta[2]) {
								deleteTaskFromCookie(v, ta)
							}
							break;
						case "1"://build task
							GM_deleteValue(myacc() + "_" + v + "_BuildingUpdataTime")

							switch (ta[0]) {
								case "0"://build updata
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									break;
								case "1"://new build
									if (l >= ta[2]) {
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
							GM_deleteValue(myacc() + "_" + v + "_UpdataTime")
							GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1])

							switch (ta[0]) {
								case "0":
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta)
									}
									break;
								case "1":
									if (l >= ta[2]) {
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
					calldoing1()
					printMSG(gametext[7] + getvillagefromdid(v) + otherText[6]);
					window.location.href=myhost + "/dorf1.php"
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
					GM_setValue(myacc() + "_" + v + "_ResourceUpdataTime",nextt)
					break;
				case "1":
					GM_setValue(myacc() + "_" + v + "_BuildingUpdataTime",nextt)
					break;
				case "2":
					GM_setValue(myacc() + "_" + v + "_UpdataTime",nextt)
					break;
			}
			calldoing1()
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
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		document.body.removeChild($("taskForm_wrapper"));
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
		var options = GM_getValue(myacc() + "_option");
		if (options & options != '' & options != null) {
			options = options.split(",");
		}
		else {
			GM_setValue(myacc() + "_option", "")
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
		GM_setValue(myacc() + "_option", options);
	}
	
	function getOption(key, defaultValue, type){
		var options = GM_getValue(myacc() + "_option");
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
		var errors = document.evaluate('//p[@class="none"]', document, null, 9, null);
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
		var allnewbuilds = document.evaluate('//div[@id="build"]/table[@class="new_building"]', document, null, 6, null);
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
		mainv1 = GM_getValue(myacc() + "_mainvillageId");
		h1inner = h1in().innerHTML.split(" ");
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
				var rere = document.evaluate('id("textmenu")/descendant::a[@href]', document, null, 9, null);
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
		var options=document.evaluate('//select[@name="abriss"]/descendant::option', document, null, 6, null);
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
	
	function createPartylnk(){
		var thePosi=document.getElementsByClassName("gid24")[0]
		var Partylnk = document.createElement("a");
		Partylnk.id = "partylnk";
		Partylnk.href = "#";
		Partylnk.innerHTML = "&#160;&#160;" + taskoftext[39] + "&#160;&#160;";
		Partylnk.addEventListener("click", createPartyFloat, false)
		thePosi.appendChild(Partylnk)
	}
	
	function createPartyFloat(){
		var partyForm = document.createElement("form");
		partyForm.id = "partyform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"partyform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		partyForm.innerHTML = floatClose;

		var partyid=document.getElementsByTagName("input")[0].value
		var h1inn = h1in().innerHTML.split(" ")
		bblevel = h1inn[h1inn.length - 1]

		partyForm.innerHTML += "<br />" + taskoftext[39].big() + "<br /><br />";
		partyForm.innerHTML += addTaskText[2] + ":  <select id='crtvv' disabled=true><option value='" + partyid + "'>" + currentVillageName() + "</option></select><br />";

		if (parseInt(bblevel)<10){
			partyForm.innerHTML += addTaskText[1] + ":<select id='partykind'  disabled=true><option value='1'>" + taskoftext[40] + "</option>"
		}
		else{
			partyForm.innerHTML += addTaskText[1] + ":<select id='partykind' ><option value='1'>" + taskoftext[40] + "</option><option value='2'>" + taskoftext[41] + "</option>"
		}

		partyForm.innerHTML +="</select><br /><br />";
		
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
		partyForm.innerHTML += gametext[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br />"
		partyForm.innerHTML += taskoftext[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' /><br /><br />"
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setPartyCookies, true);
		partyForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "partyform_wrapper";
		tWrapper.appendChild(partyForm);
		
		var formCoords = getOption("PARTY_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("partyform"));
	}
	
	
	function setPartyCookies(){
		partyid=$("crtvv").value
		partykind =$("partykind").value
		repeat=$("repeat").value
		var startt=new Date($("startime").value)
		startTime=startt.getTime()
	//------------------------------------------------		//6_1_1000_1245413194000_id
		thisTask = "6_" + partykind + "_" + repeat + "_"+ startTime+"_"+partyid;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("partyform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[39].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	
	function setDemoCookies(){
		selecteddemo = $("selecteddemo").value;
		theID=selecteddemo.split(". ")[0]
		adesa=selecteddemo.split(". ")[1].split(" ")
		crtlevel=adesa[adesa.length-1]
		regexp11=new RegExp(" "+crtlevel)
		theBuild=selecteddemo.split(". ")[1].replace(regexp11,"")
		thisTask = "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
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
		var producee = $("production");
		var autoResDiv = document.createElement("div");
		autoResDiv.id = "autoResdiv";
		autoResDiv.innerHTML = taskoftext[2].bold() + ":&#160;&#160;";
		producee.parentNode.insertBefore(autoResDiv, producee.nextSibling);

		
		var autoResStatus = GM_getValue(herere() + "_autoResource", "0")
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
		
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false")
		transLimit.innerHTML+=(userTranSetup=="false")?taskoftext[14]:userTranSetup
		transLimit.innerHTML+="&#160;&#160;";
		
		var changeIt=document.createElement("a");
		changeIt.id="changeit";
		changeIt.href="#";
		changeIt.innerHTML=taskoftext[15]
		changeIt.addEventListener("click", createTranLimitFlt, false)
		transLimit.appendChild(changeIt);
/***********************************transport limit here***************************************************/
/***********************************transport remain here***************************************************/
		var resRemain=document.createElement("div");
		resRemain.id="resremain";
		resRemain.innerHTML=taskoftext[38].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(resRemain, transLimit.nextSibling);
		
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false")
		resRemain.innerHTML+=(userRemainSetup=="false")?taskoftext[14]:userRemainSetup
		resRemain.innerHTML+="&#160;&#160;";
		
		var changeIt2=document.createElement("a");
		changeIt2.id="changeit2";
		changeIt2.href="#";
		changeIt2.innerHTML=taskoftext[15]
		changeIt2.addEventListener("click", createResRemainFlt, false)
		resRemain.appendChild(changeIt2);
/***********************************transport remain here***************************************************/
	} 
	
	function createResRemainFlt(){
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false")
		usersetup2=(userRemainSetup=="false")?taskoftext[14]:userRemainSetup 
		var resRemainForm = document.createElement("form");
		resRemainForm.id="resremainform"
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"resremainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		resRemainForm.innerHTML = floatClose;
		resRemainForm.innerHTML += "<br />" + taskoftext[15].big() +taskoftext[38].big()+"<br /><br />";
		resRemainForm.innerHTML += gametext[7] + ":  <select id='crtvi'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br /><br />";
		resRemainForm.innerHTML += taskoftext[38]+":  <select id='crtremain'><option value='" + usersetup2 + "'>" + usersetup2 + "</option></select><br /><br />";
		resRemainForm.innerHTML += taskoftext[15]+gametext[6]+":  <select id='resrrremain'>"+resLimitOption() + "</select>";
		resRemainForm.innerHTML += "  "+"<select id='cropremain'>"+cropLimitOption() + "</select><br /><br />";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setResRmnCookies, true);
		resRemainForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "resremainform_wrapper";
		tWrapper.appendChild(resRemainForm);
		
		var formCoords = getOption("RESREMAIN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("resremainform"));		
	}
	
	function setResRmnCookies(){
		var userSet = new Array()
		userSet[0] = $("resrrremain").value;
		userSet[1] = $("cropremain").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(herere() + "_userRemainSetup")
		}
		else {
			GM_setValue(herere() + "_userRemainSetup", userSet.join("/"))
		}
		document.body.removeChild($("resremainform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		$("resremain").parentNode.removeChild($("resremain"))
		createAutoResLink()
		msg = taskoftext[38].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function createTranLimitFlt(){
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false")
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
			GM_deleteValue(herere() + "_userTranSetup")
		}
		else {
			GM_setValue(herere() + "_userTranSetup", userSet.join("/"))
		}
		document.body.removeChild($("tranlmtform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		$("resremain").parentNode.removeChild($("resremain"))
		createAutoResLink()
		msg = taskoftext[13].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function resLimitOption(){
		var WareCap = GM_getValue(herere() + "_WarehouseCap");
		WareCap=parseInt(WareCap)
		var string="<option value='"+WareCap*0.8+"'>"+taskoftext[16]+"</option><option value='default'>"+taskoftext[14]+"</option>"
		for(i=10; i<101; i=i+10){
			cnm=(WareCap*i/100).toString()
			string += "<option value='" + cnm + "'>" + cnm + "</option>"
		}
		return string
	}
	
	
	function cropLimitOption(){
		var GranCap = GM_getValue(herere() + "_GranaryCap");
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
		
		if (!GM_getValue(myacc() + "_raceID")) { 
			AttackForm.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[8] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee

			AttackForm.innerHTML += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
			AttackForm.innerHTML +=otherText[9] + "<br /><br />";
		}
		else {
			AttackForm.innerHTML += "<br />" + taskoftext[19].big() + "<br /><br />";
			AttackForm.innerHTML += addTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br />";
			AttackForm.innerHTML += addTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "' /><br />"
			
			var attackTse = null;
			var attacktypes = document.evaluate('//table[@ id="coords"]/descendant::input[@type="radio"]', document, null, 6, null);
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				if (attacktypes.snapshotItem(i).checked) {
					attackTse = i + 2;
				}
			}
			if(document.getElementsByName("t8")[0].value!="" && attackTse==4){
				attackTse=3;
			}
			AttackForm.innerHTML += taskoftext[20] + ":  <select id='attacktype'><option value='" + attackTse + "'>" + attacktype[attackTse - 2] + "</option></select>";
			
			ra = GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			var mytable = document.createElement("table");
			mytable.id = "mytablee"
			mytable.innerHTML += "<tr><td>" + troops[ra][0] + "</td><td><input type='text' id='tt1' style='width:40px' value='" + document.getElementsByName("t1")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][1] + "</td><td><input type='text' id='tt2' style='width:40px' value='" + document.getElementsByName("t2")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][2] + "</td><td><input type='text' id='tt3' style='width:40px' value='" + document.getElementsByName("t3")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][3] + "</td><td><input type='text' id='tt4' style='width:40px' value='" + document.getElementsByName("t4")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][4] + "</td><td><input type='text' id='tt5' style='width:40px' value='" + document.getElementsByName("t5")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][5] + "</td><td><input type='text' id='tt6' style='width:40px' value='" + document.getElementsByName("t6")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][6] + "</td><td><input type='text' id='tt7' style='width:40px' value='" + document.getElementsByName("t7")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][7] + "</td><td><input type='text' id='tt8' style='width:40px' value='" + document.getElementsByName("t8")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + troops[ra][8] + "</td><td><input type='text' id='tt9' style='width:40px' value='" + document.getElementsByName("t9")[0].value + "' ></td><td>&#160;&#160;" + troops[ra][9] + "</td><td><input type='text' id='tt10' style='width:40px' value='" + document.getElementsByName("t10")[0].value + "' /></td></tr>"
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
			herosp = GM_getValue(myacc() + "_heroSpeed", "false")
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
		if (h1in().innerHTML.indexOf(allbuildwithid[37])!=-1){
			var myhero=document.evaluate('//table[@id="distribution"]/descendant::span[@class="info"]', document, null, 9, null);
			var herokind=myhero.singleNodeValue.innerHTML.split("(")[1].split(")")[0]
			
			var ra=GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			for(i in troops[ra]){
				if (troops[ra][i]==herokind){
					GM_setValue(myacc() + "_heroSpeed",troopspeed[ra][i])
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
			troopss[0]=($("tt1").value=="")?"0":$("tt1").value
			troopss[1]=($("tt2").value=="")?"0":$("tt2").value
			troopss[2]=($("tt3").value=="")?"0":$("tt3").value
			troopss[3]=($("tt4").value=="")?"0":$("tt4").value
			troopss[4]=($("tt5").value=="")?"0":$("tt5").value
			troopss[5]=($("tt6").value=="")?"0":$("tt6").value
			troopss[6]=($("tt7").value=="")?"0":$("tt7").value
			troopss[7]=($("tt8").value=="")?"0":$("tt8").value
			troopss[8]=($("tt9").value=="")?"0":$("tt9").value
			troopss[9]=($("tt10").value=="")?"0":$("tt10").value
			troopss[10]=($("hero").value=="")?"0":$("hero").value
		troopsoo=troopss.join(",")
	//------------------------------------------------
		kata1=($("firetarget1"))? $("firetarget1").value : "0"
		kata2=($("firetarget2"))? $("firetarget2").value : "0"
	//---------------------------------------------------------------------------------------------------------------
		thisTask = taskkindss + "_" + targetPosition + "_" + attackkind + "_" + repeat + "_" + startTime + "_" + interval + "_" + troopsoo + "_" + kata1 + "_" +kata2;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("attackform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = taskoftext[19].bold() + " " + otherText[3]
		printMSG(msg)
	}
	
	function createAttackBtn(){
		var bposition = document.evaluate('id("btn_ok")', document, null, 9, null);
		AttackBtn = document.createElement("a");
		AttackBtn.id = "attackbtn";
		AttackBtn.href = "#";
		AttackBtn.innerHTML = "&#160;&#160;"+taskoftext[19]+"&#160;&#160;";
		AttackBtn.addEventListener("click", createAttackFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AttackBtn);
	}
	
	function createTrainLnk(){
		var bposition = document.evaluate('id("btn_train")', document, null, 9, null);
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
		var h1inn = h1in().innerHTML.split(" ")
		switch (h1inn.length) {
			case 3:
				bbName = h1inn[0];
				break;
			case 4:
				bbName = h1inn[0] +" "+ h1inn[1]
				break;
		}

		if (!GM_getValue(myacc() + "_raceID")) {
			trainForm.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[8] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			trainForm.innerHTML += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
		}
		else {
			ra = GM_getValue(myacc() + "_raceID");
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
		ra = GM_getValue(myacc() + "_raceID");
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
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
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
		var bposition = document.evaluate('id("btn_ok")', document, null, 9, null);
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
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
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
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
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
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		allTarget = (GM_getValue(herere() + "_autoTransTo")) ? GM_getValue(herere() + "_autoTransTo") + "|" + targetVid : targetVid;
		GM_setValue(herere() + "_autoTransTo", allTarget)
		document.body.removeChild($("tranForm_wrapper"));
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
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
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
		if (window.location.href.indexOf("spieler.php?") < 0) {
			allposition = new Array();
			var allX = document.getElementsByClassName("cox")
			var allY = document.getElementsByClassName("coy")
			var allN = document.evaluate('id("vlist")/descendant::a[contains(@href,"newdid")]', document, null, 6, null);
			if (allN.snapshotLength > 0) {
				for (i in allX) {
					xx = (allX[i].innerHTML.split("(")[1]) ? allX[i].innerHTML.split("(")[1] : allX[i].nextSibling.innerHTML
					yy = (allY[i].innerHTML.split(")")[0]) ? allY[i].innerHTML.split(")")[0] : allY[i].previousSibling.innerHTML
					na = allN.snapshotItem(i).innerHTML + ":" + getCoordfromXY(xx, yy)
					gugaga = allposition.push(na)
				}
			}
			else {
				allposition[0] = GM_getValue(myacc() + "_mainvillageName") + ":" + GM_getValue(myacc() + "_mainVillagePosition")
			}
			GM_setValue(myacc() + "_allVillagePos", allposition.join())
		}
	}
	
	
	function getVillFromPos(position){
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[1] == position) {
				return getDidFromVillage(allVillagePos[i].split(":")[0]);
				break;
			}
		}
	}
	
	function getPosFromVill(vi){
		if (!$("vlist")&&GM_getValue(myacc() + "_mainvillageName")==vi) {
			return GM_getValue(myacc() + "_mainVillagePosition")
		}
		else {
			allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
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
		var nowtaskstring = GM_getValue(herere() + "_waitTask", "false");
		var autoTask = "0_50_100"
		if (GM_getValue(myacc() + "_mainvillageId", "false") == "false") {
			msg0 = otherText[0].big() + "!!!<br /><br />" + otherText[1] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			msg0 += otherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br /><br />";
			printMSG(msg0);
		}
		else {
			var msg1 = gametext[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br /><br/ >" + taskoftext[2].bold() + ":&#160;&#160;" + otherText[3] + "<br /><br/ >" ;
			if (nowtaskstring != "false" && nowtaskstring.indexOf(autoTask) != -1) {
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
				createAutoResLink()
				printMSG(msg1);
			}
			else {
				autoResT = autoTask + "_" + "00000000"
				allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + autoResT : autoResT
				GM_setValue(herere() + "_waitTask", allTask)
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
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
		Task[3] = "00000000";
		GM_deleteValue(herere() + "_autoResource");
		GM_deleteValue(herere() + "_CorpRemain");
		GM_deleteValue(herere() + "_minLevelId");
		GM_deleteValue(herere() + "_minLevelCropId");
		GM_deleteValue(herere() + "_ResourceUpdataTime");
		deleteTaskFromCookie(villaa, Task)
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList() 
		printMSG(msg);
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
		if (bidid < 19 && !GM_getValue(myacc() + "_mainvillageId")) {
			updataform.innerHTML += "<br />" + otherText[0].big() + "!!!<br /><br />" + otherText[1] + "<br /><br />";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, 9, null);
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
		var getitit = document.evaluate('id("vlist")//a[contains(@href,"' + did + '")]', document, null, 9, null);
		return (getitit.singleNodeValue) ? getitit.singleNodeValue.innerHTML : GM_getValue(myacc() + "_mainvillageName")
	}
	
	
	function getDidFromVillage(vil){
		var getfoots = document.evaluate('id("vlist")/descendant::a[@href]', document, null, 6, null);
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
			return GM_getValue(myacc() + '_singleTownNEWDID')
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
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_waitTask", "false")
			if (whatever != "false"&&taskdoing=="1") {
				allTasks = whatever.split("|")
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					
					switch (thisTask[0]) {
					
						case "0":// 0 is update
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var resourceTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (thisTask[1] < 19) {//resource
									if (resourceTimepoint == "false") {
										calldoing0()
										taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
										GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
										calldoing1()
									}
								}
								else 
									if (thisTask[1] > 18 && thisTask[1] < 42) { //build in village
										if (buildTimepoint == "false") {
											calldoing0()
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
											GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
											calldoing1()
										}
									}
									else {//if >=42, it is autoResourceModel
										if (resourceTimepoint == "false") {
											calldoing0()
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
											GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
											calldoing1()
										}
									}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
								}
							}
							break;
							
							
						case "1"://"1" is new building 
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (buildTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
								}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									GM_log("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
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
							var hereRemain=GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_userRemainSetup","0/0")
							var hereResource = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceNow", "false")
							var tarResource = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceNow", "false")
							var resTraning = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceTraning", "0/0/0/0")
							var userTranSetup = GM_getValue(myacc() + "_" + thisTask[2] + "_userTranSetup", "false")
							var WareCap = GM_getValue(myacc() + "_" + thisTask[2] + "_WarehouseCap", "false");
							var GranCap = GM_getValue(myacc() + "_" + thisTask[2] + "_GranaryCap", "false");
							var tranTimePoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_to_" + thisTask[3] + "_autoTransTime", "false")
							if (tarResource == "false" || WareCap == "false" || GranCap == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + thisTask[2])
							}
							if (hereResource == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + getAllVillageNewdids()[e])
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
							var hereremainn=hereRemain.split("/")
							hereremainn[0]=parseInt(hereremainn[0])
							hereremainn[1]=parseInt(hereremainn[1])
							if (tranTimePoint == "false") {
								if (userTranSetup == "false") {
									switch (thisTask[1]) {
										case "0"://building surport model.
											if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
												var transtarget1 = WareCap * 0.8
												var transtarget2 = GranCap * 0.8
											}
											else {//15000 and 16000 remain
												var transtarget1 = 15000;
												var transtarget2 = 16000;
											}
											break;
											
										case "1":
											var transtarget1 = WareCap * 0.9
											var transtarget2 = GranCap * 0.9
											break;
									}
								}
								else {
									var transtarget1 = parseInt(userTranSetup.split("/")[0]);
									var transtarget2 = parseInt(userTranSetup.split("/")[1]);
								}
								
								if ((resnow[0] + restran[0] + 200) < transtarget1 && (reshere[0] - hereremainn[0]) > 500 || (resnow[1] + restran[1] + 200) < transtarget1 && (reshere[1] - hereremainn[0]) > 500 || (resnow[2] + restran[2] + 200) < transtarget1 && (reshere[2] - hereremainn[0]) > 500 || (resnow[3] + restran[3] + 200) < transtarget2 && (reshere[3] - hereremainn[1]) > 500) {
									calldoing0()
									trantime = startTransOrSetTime(getAllVillageNewdids()[e], thisTask)
									GM_log("the autotrantime back from startTransOrSetTime() is " + trantime)
									calldoing1()
								}
							}
						break;
							
					/*	
					 case TaskKind[6]:
					 break;*/
					
					
					 case "7"://"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
					 	var demoTime = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_demolishTime", "false");
						if(demoTime=="false"){
							calldoing0()
							demotimee=startDemoOrSetTime(getAllVillageNewdids()[e], thisTask)
							GM_log("the demotime back from startDemoOrSetTime() is " + demotimee)
							calldoing1()
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
		var turl= myhost + "/build.php?newdid=" + vi + "&gid=15"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					GM_log("here is startDemoOrSetTime callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					
					var ddg=new Date();
					if(aDoc.getElementById("demolish")){
						gettime=aDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
						demot = gettime.toString().split(":")
						endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000+30000;
						ddg.setTime(endt)
						GM_log("some demolish is doing, next demo start at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
					else{
						endt = ddg.getTime() +30000;
						ddg.setTime(endt)
						GM_log("No demolish is doing, next demo start soon, just at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
				}
			}
		}
		return callback()
	}

	
	function startTransOrSetTime(vi, tTask){
		GM_log("come into startTransOrSetTime() from " + getvillagefromdid(vi) + " to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
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
					GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
					resource[0] = parseInt(resource[0])
					resource[1] = parseInt(resource[1])
					resource[2] = parseInt(resource[2])
					resource[3] = parseInt(resource[3])
					var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
					var hereremainn = hereRemain.split("/")
					hereremainn[0] = parseInt(hereremainn[0])
					hereremainn[1] = parseInt(hereremainn[1])
					
					var ma = "0"//this is just a mark,if transing is found ,it is "1", else "0".
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = gametext[10] //to
					var reg222 = gametext[12] //back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, 6, null);
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
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var oioi = new Date(lastTrantime)
						GM_log("the traning will arrive at " + oioi)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						GM_log("all resources on transporting are " + transing.join("/"))
					}
					else {
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
					}
					
					var tarResource = GM_getValue(myacc() + "_" + tTask[2] + "_ResourceNow")
					var WareCap = GM_getValue(myacc() + "_" + tTask[2] + "_WarehouseCap");
					var GranCap = GM_getValue(myacc() + "_" + tTask[2] + "_GranaryCap");
					var userTranSetup = GM_getValue(myacc() + "_" + tTask[2] + "_userTranSetup", "false")
					
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
					var qq = aDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', aElem, null, 9, null);
					comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
					GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
					comm[0] = parseInt(comm[0])
					comm[1] = parseInt(comm[1])
					if (userTranSetup == "false") {
						switch (tTask[1]) {
							case "0"://building surport model.
								if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
									var transtarget1 = WareCap * 0.8
									var transtarget2 = GranCap * 0.8
								}
								else {//15000 and 16000 remain
									var transtarget1 = 15000;
									var transtarget2 = 16000;
								}
								break;
								
							case "1":
								var transtarget1 = WareCap * 0.9
								var transtarget2 = GranCap * 0.9
								break;
						}
					}
					else {//user setup
						var transtarget1 = parseInt(userTranSetup.split("/")[0]);
						var transtarget2 = parseInt(userTranSetup.split("/")[1]);
					}
					
					var ddg = new Date();
					if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
						if (comm[0] > 0) {
							Tasktime = ddg.getTime() + 10000
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							GM_log("next transport begin from " + d)
							return Tasktime
						}
						else {
							var waitTimee = 1500000000000;
							var allback = aDoc.evaluate('//table//a[contains(@href,"php?d=")]', aElem, null, 6, null);
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
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							GM_log("next transport begin from " + d)
							return Tasktime
						}
					}
					else {
						return "1500000000000"
						GM_deleteValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime")
						GM_log("resource is enough, delete _autoTransTime in startTransOrSetTime")
					}
				}
			}
		}
		return callback()
	}
	
	
	function fleshTraning(vi, tTask){
		GM_log("come into fleshTraning in " + getvillagefromdid(vi) + "; to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
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
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, 6, null);
					
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
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
							GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var ggr = new Date(lastTrantime)
						GM_log("next reflesh start at " + ggr)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						GM_log("all resources on transporting are " + transing.join("/"))
						getTargetResource(tTask[2])
						return Transtime
					}
					else {
						GM_log("No transport at all...")
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
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
		url = myhost + "/build.php" + "?newdid=" + vi
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
				GM_setValue(myacc() + "_" + vi + "_WarehouseCap", WarehouseCap);
				GM_setValue(myacc() + "_" + vi + "_GranaryCap", GranaryCap);
				GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
				GM_log("refleshCOOKIE  in getTargetResource() to " + resstring)
				calldoing1()
			}
		})
	}
	
	function getMerchanTime(vi, positionnum){
		xRace = GM_getValue(myacc() + "_raceID")
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
		var turl = myhost + "/dorf1.php?newdid=" + Villageid
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
					if (task[0] == "0" && task[1] > 42) {//autoResource date get from here
						var CorpRemain = aDoc.evaluate("id('res')/descendant::td", aElem, null, 6, null);
						hehe = CorpRemain.snapshotLength - 1
						corpcost = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[0]
						corpprod = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[1]
						GM_setValue(myacc() + "_" + Villageid + "_CorpRemain", (corpprod - corpcost))
						
						var mainVI = GM_getValue(myacc() + "_mainvillageId");
						var maxreslevel = (mainVI == Villageid) ? 20 : 10
						var doneID = GM_getValue(myacc() + "_" + Villageid + "_autoResourceDone", "20")
						var allRess = aDoc.evaluate('id("rx")//area[contains(@href,"build.php?id=")]', aElem, null, 6, null);
						var numm = 20;
						var numm2 = 20;
						for (var i = 0; i < allRess.snapshotLength; i++) {//get the min level 
							temppp = allRess.snapshotItem(i).title.split(" ")
							ddq = parseInt(temppp[temppp.length - 1])
							numm = Math.min(numm, ddq);
						}
						sounttt = "0";//this is just a mark....found XXX, change to "1", no found remain "0"
						for (j = 0; j < allRess.snapshotLength; j++) {
							temppp = allRess.snapshotItem(j).title.split(" ")
							if (parseInt(temppp[temppp.length - 1]) == numm && allRess.snapshotItem(j).href.split("id=")[1].toString() != doneID) {
								myid = allRess.snapshotItem(j).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
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
									temppp = allRess.snapshotItem(n).title.split(" ")
									if (parseInt(temppp[temppp.length - 1]) == (numm + 1) && allRess.snapshotItem(n).href.split("id=")[1].toString() != doneID) {
										myid = allRess.snapshotItem(n).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
										break;
									}
								}
							}
						}
						
						for (k = 0; k < allRess.snapshotLength; k++) {//collect all Crop level ,find the lowest one
							temsps = allRess.snapshotItem(k).title.split(" ")
							switch (temsps.length) {
								case 3:
									resNa = temsps[0]
									break;
								case 4:
									resNa = temsps[0] + " " + temsps[1]
									break;
								case 5:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2]
									break;
								case 6:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2] + " " + temsps[3]
									break;
							}
							if (resNa == allresindorf1[3]) {
								ffq = parseInt(temsps[temsps.length - 1])
								numm2 = Math.min(numm2, ffq);
							}
						}
						mouu = "0"//this is a mark too, to find the minlevel crop
						for (l = 0; l < allRess.snapshotLength; l++) {
							temspp = allRess.snapshotItem(l).title.split(" ")
							switch (temspp.length) {
								case 3:
									resNaa = temspp[0]
									break;
								case 4:
									resNaa = temspp[0] + " " + temspp[1]
									break;
								case 5:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2]
									break;
								case 6:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2] + " " + temspp[3]
									break;
							}
							if (parseInt(temspp[temspp.length - 1]) == numm2 && resNaa == allresindorf1[3] && allRess.snapshotItem(l).href.split("id=")[1].toString() != doneID) {
								myids = allRess.snapshotItem(l).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
								mouu = "1";
								break;
							}
						}
						if (mouu == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm2 < maxreslevel - 1) {
								for (m = 0; m < allRess.snapshotLength; m++) {
									temspsp = allRess.snapshotItem(m).title.split(" ")
									switch (temspsp.length) {
										case 3:
											resNasa = temspsp[0]
											break;
										case 4:
											resNasa = temspsp[0] + " " + temspsp[1]
											break;
										case 5:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2]
											break;
										case 6:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2] + " " + temspsp[3]
											break;
									}
									if (parseInt(temspsp[temspsp.length - 1]) == (numm2 + 1) && resNasa == allresindorf1[3] && allRess.snapshotItem(m).href.split("id=")[1].toString() != doneID) {
										myids = allRess.snapshotItem(m).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
										break;
									}
								}
							}
						}
					}//autoResouce data end here
					
					var aValue = aDoc.evaluate('id("building_contract")/descendant::td', aElem, null, 6, null);
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
								arriveTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  6000
								ddg = new Date()
								Tasktime = ddg.getTime() + arriveTime

								switch (str) {
									case allsourceString:
										GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
										GM_log("startBuildOrSetTime(Villageid):resource is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										GM_log("next task begin from " + d)
										return Tasktime
										break;
									case allbuildString:
										GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
										GM_log("startBuildOrSetTime(Villageid):building is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										GM_log("next task begin from " + d)
										return Tasktime
										break;
									case allString:
										GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
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
									GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
									GM_log("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
									return Tasktime
									break;
								case allbuildString:
									GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
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
								GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
								GM_log("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allbuildString:
								GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
								GM_log("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allString:
								GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
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
		whatever = GM_getValue(myacc() + "_" + vill + "_waitTask", "false")
		allTasks = whatever.split("|")
		switch (kind) {
			case "0"://Romans Resource
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] < 19) {
						b = getthebuildUrl(vill, thisTask)
						if (b) {
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor() == errorText[8]) {
								GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
							else {
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
								GM_log(getErrorInfor() + ", updata delay 30 minutes")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 42) {//Romans autoResource
							thisTask[1] = getAutoResourceId(vill)
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;//greasemonkey.scriptvals.userscripts.org/Travian AutoTask.s7cn_23311_116685_minLevelCropId
							}
							else 
								if (getErrorInfor().indexOf(errorText[2]) != -1) {
									GM_deleteValue(myacc() + "_" + vill + "_autoResourceDone")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelId")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelCropId")
									GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
									calldoing1()
								}
								else 
									if (getErrorInfor() == errorText[5]) {
										GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
										calldoing1()
										addtaskbefore(vill, "10", kind);
									}
									else 
										if (getErrorInfor() == errorText[6]) {
											calldoing1()
											GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
											addtaskbefore(vill, "11", kind);
										}
										else 
											if (getErrorInfor() == errorText[0] || getErrorInfor().indexOf(errorText[7]) != -1) {
												var dtime = new Date();
												delaytime = dtime.getTime() + 1800000;
												dtime.setTime(delaytime);
												GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
												GM_log(getErrorInfor() + ", updata delay 30 minutes")
												calldoing1()
												window.location.href = myhost + "/dorf1.php"
												break;
											}
											else {
												GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
												GM_log("No resource updata task found, delete ResourceUpdataTime in startBuildnow()")
												calldoing1()
												window.location.href = myhost + "/dorf1.php"
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
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
							GM_log(getErrorInfor() + ", updata delay 30 minutes")
							calldoing1()
							window.location.href=myhost + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "1") {//Romans new build
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else if(getErrorInfor() =="newBuild can't run, something is here."){
								var changeToUP=new Array();
								changeToUP[0]="0"
								changeToUP[1]=thisTask[1]
								changeToUP[2]=thisTask[2]
								changeToUP[3]=thisTask[4]
								changeToUP[4]=thisTask[5]
								GM_log("newBuild can't run, something is here. change to upgrade")
								deleteTaskFromCookie(vill, thisTask, changeToUP)
								calldoing1()
								window.location.href=myhost + "/dorf1.php"
								break;
							}
							else{
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
								GM_log(getErrorInfor() + ", updata delay 30 minutes")
								calldoing1()
								window.location.href=myhost + "/dorf1.php"
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
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							GM_log("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
							GM_log(getErrorInfor() + ", updata delay 30 minutes")
							calldoing1()
							window.location.href=myhost + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 41) {//autoResource
							thisTask[1] = getAutoResourceId(vill)
							b = getthebuildUrl(vill, thisTask)
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								GM_log("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == errorText[5]) {
									GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
									calldoing1()
									addtaskbefore(vill, "10", kind);
								}
								else 
									if (getErrorInfor() == errorText[6]) {
										GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
										calldoing1()
										addtaskbefore(vill, "11", kind);
									}
									else 
										if (getErrorInfor() == errorText[0]|| getErrorInfor().indexOf(errorText[7]) != -1) {
											var dtime = new Date();
											delaytime = dtime.getTime() + 1800000;
											dtime.setTime(delaytime);
											GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
											GM_log(getErrorInfor() + ", updata delay 30 minutes")
											calldoing1()
											window.location.href=myhost + "/dorf1.php"
											break;
										}
										else {
											GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
											GM_log("No updata task found, delete UpdataTime in startBuildnow()")
											calldoing1()
											window.location.href=myhost + "/dorf1.php"
											break;
										}
						}
						else 
							if (thisTask[0] == "1") {//new build
								b = getthebuildUrl(vill, thisTask)
								if (b) {
									buildurl = myhost + "/" + b;
									thislevel = 1;
									GM_log("start Require now");
									HttpRequire(buildurl, vill, thisTask, kind, thislevel)
									break;
								}
								else if(getErrorInfor() =="newBuild can't run, something is here."){
									var changeToUP=new Array();
									changeToUP[0]="0"
									changeToUP[1]=thisTask[1]
									changeToUP[2]=thisTask[2]
									changeToUP[3]=thisTask[4]
									changeToUP[4]=thisTask[5]
									GM_log("newBuild can't run, something is here. change to upgrade")
									deleteTaskFromCookie(vill, thisTask, changeToUP)
									calldoing1()
									window.location.href=myhost + "/dorf1.php"
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
									GM_log(getErrorInfor() + ", updata delay 30 minutes")
									calldoing1()
									window.location.href=myhost + "/dorf1.php"
									break;
								}
							}
				}
				break;
		}
	}
	
	
	function startAttacknow(vi, ATask){//2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		GM_log("come into startAttacknow(), at " + getvillagefromdid(vi))
		url = myhost + "/a2b.php" + "?newdid=" + vi
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
					randominter=Math.ceil(Math.random()*300000)
					var newTask = new Array()//|2_241654_3_0_1248014400000_0_0,0,0,0,0,5,0,0,0,0,0_0_0
					var nowt=new Date();
					newTask[0] = ATask[0];
					newTask[1] = ATask[1];
					newTask[2] = ATask[2];
					temp = Number(ATask[3]) - 1
					newTask[3] = temp.toString();
					if (ATask[5] == "0") {
						temp2 = nowt.getTime() + 24 * 60 * 60 * 1000 + randominter
					}
					else {
						temp2 = nowt.getTime() + Number(ATask[5]) + randominter
					}
					newTask[4] = temp2.toString();
					newTask[5] = ATask[5];
					newTask[6] = ATask[6];
					newTask[7] = ATask[7];
					newTask[8] = ATask[8];
					
					deleteTaskFromCookie(vi, ATask,newTask)
				}
				calldoing1()
				printMSG(taskoftext[31])
				window.location.replace("dorf1.php?newdid=" + vi)
			}
		})
	}
	
	
	function getTrainData(vi, task){
		GM_log("come into getTrainData(vi,idd), at " + getvillagefromdid(vi))
		var url = myhost + "/build.php?newdid=" + vi + "&id=" + task[1];
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
		url = myhost + "/build.php" + "?newdid=" + vi
		daa =getTrainData(vi,tTask)
		dataa = encodeURI(daa)
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
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
					var newTask = new Array();//4_25_10_1250261897000_600000_0,0,10,0,0,0,0,0,0,0_??
					var nowt=new Date();
					newTask[0] = tTask[0];
					newTask[1] = tTask[1];
					temp = Number(tTask[2]) - 1
					newTask[2] = temp.toString();
					if (tTask[4] == "0") {
						temp2 = nowt.getTime() + 3 * 60 * 60 * 1000
					}
					else {
						temp2 = nowt.getTime() + Number(tTask[4])
					}
					newTask[3] = temp2.toString();
					newTask[4] = tTask[4];
					newTask[5] = tTask[5];
					newTask[6] = tTask[6];
					
					deleteTaskFromCookie(vi, tTask,newTask)
				}
				calldoing1()
				printMSG(taskoftext[34])
				window.location.replace("dorf1.php?newdid=" + vi)
			}
		})
	}

function startCustomTranNow(vi, task){//8_241654_500,500,500,500_0_1245413194000_interval
	GM_log("come into startCustomTranNow() at " + getvillagefromdid(vi))
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
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
			resource[0] = parseInt(resource[0])
			resource[1] = parseInt(resource[1])
			resource[2] = parseInt(resource[2])
			resource[3] = parseInt(resource[3])
			
			var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
			var hereremainn = hereRemain.split("/")
			hereremainn[0] = parseInt(hereremainn[0])
			hereremainn[1] = parseInt(hereremainn[1])
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, 9, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, 9, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, 9, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if ((resource[0] - hereremainn[0]) > 500 || (resource[1] - hereremainn[0]) > 500 || (resource[2] - hereremainn[0]) > 500 || (resource[3] - hereremainn[1]) > 500) {
				if (comm[0] > 0) {
					balance = task[2].split(",")
					balance[0] = Number(balance[0])
					balance[1] = Number(balance[1])
					balance[2] = Number(balance[2])
					balance[3] = Number(balance[3])
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(task, baalaa, vi, theid)
				}
				else {
					if (task[3] == "0") {
						calldoing1()
						deleteTaskFromCookie(vi, task)
						GM_log("No merchant now, deleted the autoTransTime in startTrannow()")
					}
					else {
						var newTask = new Array();
						newTask[0] = task[0];
						newTask[1] = task[1];
						newTask[2] = task[2];
						temp = Number(task[3]) - 1
						newTask[3] = temp.toString();
						if (task[5] == "0") {
							temp2 = ddg.getTime() + 6 * 60 * 60 * 1000
						}
						else {
							temp2 = ddg.getTime() + Number(task[5])
						}
						newTask[4] = temp2.toString();
						newTask[5] = task[5];
						
						calldoing1()
						deleteTaskFromCookie(vi, task, newTask)
						GM_log("No merchant now, delay Transport")
					}
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				var newTask = new Array()
				newTask[0] = task[0];
				newTask[1] = task[1];
				newTask[2] = task[2];
				temp = Number(task[3]) - 1
				newTask[3] = temp.toString();
				if (task[5] == "0") {
					temp2 = ddg.getTime() + 6 * 60 * 60 * 1000
				}
				else {
					temp2 = ddg.getTime() + Number(task[5])
				}
				newTask[4] = temp2.toString();
				newTask[5] = task[5];
				
				calldoing1()
				deleteTaskFromCookie(vi, task, newTask)
				GM_log("No enough resource, delay Transport")
			}
		}
	});
}


function startPartyNow(vi, Task){//6_1_1000_1245413194000_id
	GM_log("come into startPartyNow() at "+getvillagefromdid(vi))
	var partyurl=getPartyUrl(vi,Task);
	if (partyurl){
		url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[4]+"&a="+Task[1]
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "",
			onload: function(responseDetails){
				GM_log("here is startPartyNow callback function")
				var ssDoc = document.implementation.createDocument("", "", null);
				var ssElem = document.createElement('DIV');
				ssElem.innerHTML = responseDetails.responseText;
				ssDoc.appendChild(ssElem);	

				finiTime=ssDoc.getElementsByClassName("dur")[0].innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					ttar = finiTime.toString().split(":")
					finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  180000
					ddg = new Date()
					Tasktime = ddg.getTime() + finTime
				
					if (Task[2] == "0") {
						deleteTaskFromCookie(vi, Task)
					}
					else {
						var newTask = new Array()//6_1_1000_1245413194000_id
						newTask[0] = Task[0];
						newTask[1] = Task[1];
						temp = Number(Task[2]) - 1
						newTask[2] = temp.toString();
						newTask[3] = Tasktime.toString();
						newTask[4] = Task[4];
						GM_log("Party hold ok!!!!!!!!!!!!!!!!!!!!!!get text time here!")						
						deleteTaskFromCookie(vi, Task, newTask)
					}
				calldoing1()
				printMSG(taskoftext[39]+taskoftext[5])
				window.location.replace("build.php?newdid=" + vi+"&id="+Task[4])
			}
		})		
	}
}


function getPartyUrl(vi, Task){//6_1_1000_1245413194000_id
	GM_log("come into getPartyUrl() at " + getvillagefromdid(vi))
	var url = myhost + "/build.php?newdid=" + vi + "&gid=24";
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
				
				theinner = aDoc.getElementsByClassName("act")//[0].firstChild
				var ddg=new Date()
				switch (Task[1]) {
					case "1":
						if (theinner[0].firstChild.href) {
							GM_log("i get the smallParty url ,it is " + theinner[0].firstChild.href)
							return theinner[0].firstChild.href
						}
						else {
							partyError = theinner[0].firstChild.innerHTML
							switch (partyError) {
								case errorText[9]:
									GM_log("at "+ getvillagefromdid(vi) + "; "+errorText[9]+", smallparty delay to endTime")
									finiTime = aDoc.getElementById("timer1").innerHTML
									ttar = finiTime.split(":")
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000
									Tasktime = ddg.getTime() + finTime
									break;
								case errorText[0]:
									GM_log("at "+ getvillagefromdid(vi) + "; "+errorText[0]+", smallparty delay 3 hours")
									Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
									break;
							}
							var newTask = new Array()//6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
					case "2":
						if (theinner[1].firstChild.href) {
							GM_log("i get the bigParty url ,it is " + theinner[1].firstChild.href)
							return theinner[1].firstChild.href
						}
						else {
							partyError = theinner[1].firstChild.innerHTML
							switch (partyError) {
								case errorText[9]:
									GM_log("at "+ getvillagefromdid(vi) + "; "+errorText[9]+", bigparty delay to endTime")
									finiTime = aDoc.getElementById("timer1").innerHTML
									ttar = finiTime.split(":")
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000
									Tasktime = ddg.getTime() + finTime
									break;
								case errorText[0]:
									GM_log("at "+ getvillagefromdid(vi) + "; "+errorText[0]+", bigparty delay 3 hours")
									Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
									break;
							}
							var newTask = new Array()//6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
				}
			}
		}
	}
	return callback()
}
	
	
function startTrannow(vi, tranTask){//8_241654_500,500,500,500_0_1245413194000_interval
	GM_log("come into startTrannow() at " + getvillagefromdid(vi))
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
	var tarResource = GM_getValue(myacc() + "_" + tranTask[2] + "_ResourceNow", "false")
	var WareCap = GM_getValue(myacc() + "_" + tranTask[2] + "_WarehouseCap", "false");
	var GranCap = GM_getValue(myacc() + "_" + tranTask[2] + "_GranaryCap", "false");
	var userTranSetup = GM_getValue(myacc() + "_" + tranTask[2] + "_userTranSetup", "false")
	var WareCap = parseInt(WareCap)
	var GranCap = parseInt(GranCap)
	var resnow = tarResource.split("/");
	resnow[0] = parseInt(resnow[0])
	resnow[1] = parseInt(resnow[1])
	resnow[2] = parseInt(resnow[2])
	resnow[3] = parseInt(resnow[3])
	var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
	var hereremainn = hereRemain.split("/")
	hereremainn[0] = parseInt(hereremainn[0])
	hereremainn[1] = parseInt(hereremainn[1])
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
			var alltranTo = ssDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', ssElem, null, 6, null);
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
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, 9, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, 9, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, 9, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			GM_log("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if (userTranSetup == "false") {
				switch (tranTask[1]) {
					case "0"://building surport model.
						if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
							var transtarget1 = WareCap * 0.8
							var transtarget2 = GranCap * 0.8
						}
						else {//15000 and 16000 remain
							var transtarget1 = 15000;
							var transtarget2 = 16000;
						}
						break;
						
					case "1":
						var transtarget1 = WareCap * 0.9
						var transtarget2 = GranCap * 0.9
						break;
				}
			}
			else {//user setup
				var transtarget1 = parseInt(userTranSetup.split("/")[0]);
				var transtarget2 = parseInt(userTranSetup.split("/")[1]);
			}
			if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
				if (comm[0] > 0) {
					balance = [0, 0, 0, 0]
					balance[0] = ((transtarget1 - (resnow[0] + transing[0])) > 0) ? (transtarget1 - (resnow[0] + transing[0])) : 0
					balance[1] = ((transtarget1 - (resnow[1] + transing[1])) > 0) ? (transtarget1 - (resnow[1] + transing[1])) : 0
					balance[2] = ((transtarget1 - (resnow[2] + transing[2])) > 0) ? (transtarget1 - (resnow[2] + transing[2])) : 0
					balance[3] = ((transtarget2 - (resnow[3] + transing[3])) > 0) ? (transtarget2 - (resnow[3] + transing[3])) : 0
					
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(tranTask, baalaa, vi, theid)
				}
				else {
					calldoing1()
					GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
					GM_log("No merchant now, deleted the autoTransTime in startTrannow()")
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				calldoing1()
				GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
				GM_log("resource is enough, deleted the autoTransTime in startTrannow()")
				window.location.href = myhost + "/dorf1.php"
			}
		}
	});
}

	
	function startDemonow(vi, demotask){//"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		GM_log("come into startDemonow at "+getvillagefromdid(vi) +", to demolish "+demotask[4])
		var turl = myhost + "/build.php?newdid=" + vi
		demodate = "&gid=15&a=" + vi + "&abriss=" + demotask[1]
		dataa = encodeURI(demodate)
		GM_xmlhttpRequest({
			method: 'POST',
			url: turl,
			headers: {
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
					endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000 + 30000;
					ddg.setTime(endt)
					GM_log("some demolish is doing, next demo start at " + ddg)
					GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
				}
				else {
					GM_deleteValue(myacc() + "_" + vi + "_demolishTime");
					deleteTaskFromCookie(vi, demotask)
				}
				calldoing1()
				printMSG(TaskKind[7]+" "+demotask[4]+" "+ otherText[7]+"!")
				window.location.href=myhost + "/dorf1.php"
			},
		})
	}
	
	
	function getWholeNumber(resArray){
		for(xx in resArray){
			resArray[xx]=Math.floor(resArray[xx]/100)*100
		}
		return resArray
	}
	
	function getTranAmount(bala,resource,hereremainn){
		GM_log("come into getTranAmount(),bala=" + bala)
		resource[0] = (parseInt(resource[0])>hereremainn[0])?(parseInt(resource[0])-hereremainn[0]):0
		resource[1] = (parseInt(resource[1])>hereremainn[0])?(parseInt(resource[1])-hereremainn[0]):0
		resource[2] = (parseInt(resource[2])>hereremainn[0])?(parseInt(resource[2])-hereremainn[0]):0
		resource[3] = (parseInt(resource[3])>hereremainn[1])?(parseInt(resource[3])-hereremainn[1]):0
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
		url = myhost + "/build.php" + "?newdid=" + vi
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
		url = myhost + "/build.php" + "?newdid=" + vi
		dataa = encodeURI(getRequireData(tranTask, resArray, vi, id))
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
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

				var gugagaa = new Date()				
				switch (tranTask[0]) {
					case "5":
						var ma = "0"
						var transing = [0, 0, 0, 0]
						var Transtime = 1500000000000;
						var reg111 = gametext[10]//to
						var alltranTo = auDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', auElem, null, 6, null);
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
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
							}
							lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
							var yyyu = new Date()
							yyyu.setTime(lastTrantime)
							
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", lastTrantime.toString())
							GM_log("the traning will arrive after " + lastTrantime + ", at " + yyyu)
							GM_setValue(myacc() + "_" + tranTask[2] + "_ResourceTraning", transing.join("/"))
							GM_log("all resources on transporting are " + transing.join("/"))
						}
						else {
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
						}
						
						okk = taskoftext[8].big() + "<br /><br />" + gametext[12] + " " + getvillagefromdid(vi) + " " + gametext[6] + " " + getvillagefromdid(tranTask[2]) + "<br /><br />" + taskoftext[11] + "!"
						printMSG(okk)
						switch (tranTask[1]) {
						
							case "0":
								GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
								break;
								
							case "1":
								var saspa = new Date();
								nextTime = saspa.getTime() + Number(transsInterval)*60*1000;
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime", nextTime.toString())
								saspa.setTime(nextTime)
								GM_log("next transport start at "+saspa)
								break;
						}
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
								temp2 = gugagaa.getTime() + 6 * 60 * 60 * 1000
							}
							else {
								temp2 = gugagaa.getTime() + Number(tranTask[5])
							}
							newTask[4] = temp2.toString();
							newTask[5] = tranTask[5];
							
							deleteTaskFromCookie(vi, tranTask, newTask)
						}
						okk = taskoftext[35].bold() + " " + taskoftext[11] + "!"
						printMSG(okk)
						break;
				}
				calldoing1()
				window.location.replace("dorf1.php")
			}
		})
	}


	function showTaskList(){
		GM_log("come into showTaskList()")
		tasks = GM_getValue(herere() + "_waitTask", "false")
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
		taskss = GM_getValue(herere() + "_waitTask", "false")
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
							taskStr = attacktype[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[3]) + 1) + taskoftext[28];
						}
						else {
							taskStr = attacktype[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + month + taskoftext[29] + days + taskoftext[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + taskoftext[28];
						}
						var troopse=thisTask[6].split(",")
						troopsss="";
						ra = GM_getValue(myacc() + "_raceID");
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
						ra = GM_getValue(myacc() + "_raceID");
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
								aTd3.title=taskoftext[23]+":"+transsInterval+taskoftext[43];
								break;
						}
						break;
					case "6"://6_1_1000_1245413194000
						var taskname=(thisTask[1]=="1")?taskoftext[40]:taskoftext[41]
						var starttime= new Date(Number(thisTask[3]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							taskStr =taskname + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + taskoftext[28];
						}
						else {
							taskStr = taskname + "&#160;&#160;" + month + taskoftext[29] + days + taskoftext[30] +"&#160;"+ starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + taskoftext[28];
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
						
						var asTime = parseInt(thisTask[5])
						hh=Math.floor(asTime/3600000);
						if(hh<10){hh="0"+hh}
						mm=Math.floor((asTime-hh*3600000)/60000);
						if(mm<10){mm="0"+mm}
						ss=Math.ceil((asTime-hh*3600000-mm*60000)/1000);
						if(ss<10){ss="0"+ss}
						intervalt= hh+":"+mm+":"+ss
						aTd3.title=thisTask[2]+" | "+taskoftext[23]+" "+intervalt
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
			
				var enderTable = document.createElement("table");	

				aTr8 = document.createElement("tr");
				aTd8 = document.createElement("td");
				aTd8.align="left"
				deleteAllTask = document.createElement("a");
				deleteAllTask.href = "#"
				deleteAllTask.id="deletealltask"
				deleteAllTask.title = addTaskText[13]
				deleteAllTask.innerHTML = " "+addTaskText[13]+"&#160;&#160;"
				aTd8.appendChild(deleteAllTask);
				aTr8.appendChild(aTd8)
				
				aTd9 = document.createElement("td");
				aTd9.align="center"
				pausekey=document.createElement("a");
				pausekey.href = "#"
				switch (taskdoing){
					case "0":
						aTd9.innerHTML="&#160;"+taskoftext[44].fontcolor("red") +"&#160;"
						pausekey.id="clicktostart"
						pausekey.innerHTML=taskoftext[46]+"&#160;"
					break;
					case "1":
						aTd9.innerHTML="&#160;"+taskoftext[45].fontcolor("green")+"&#160;"
						pausekey.id="clicktopause"
						pausekey.innerHTML=taskoftext[47]+"&#160;"
					break;
				}
				aTd9.appendChild(pausekey);
				aTr8.appendChild(aTd9)

				aTd7 = document.createElement("td");
				aTd7.align="right"
				aTd7.innerHTML="&#160;&#160;"+"<a href='http://userscripts.org/scripts/show/54964' id='verdisp'  target='_blank'>"+crtVersion+"</a>"
				aTr8.appendChild(aTd7);

				enderTable.appendChild(aTr8)

			aTd5.appendChild(enderTable)
			aTr5.appendChild(aTd5);
			taskListTable.appendChild(aTr5)
			deleteAllTask.addEventListener('click', deleteAllTasks, true);
			pausekey.addEventListener("click", pauseandstart, false)
		}
		return taskListTable
	}
	
	function pauseandstart(){
		if ($("clicktostart")) {
			calldoing1()
		}
		if ($("clicktopause")) {
			calldoing0()
		}
		document.body.removeChild($("tasklisttable_wrapper"))
		showTaskList()
	}
	
	function deleteTaskCookie(j){
		return function(){
			taskss = GM_getValue(herere() + "_waitTask");
			thisTask = taskss.split("|")[j].split("_")
			switch (thisTask[0]) {
				
				case "0":
					if (thisTask[1] < 42) {
						GM_deleteValue(herere() + "_ResourceUpdataTime")
						GM_deleteValue(herere() + "_BuildingUpdataTime")
						GM_deleteValue(herere() + "_UpdataTime")
					}
					else {//autoResource
						GM_deleteValue(herere() + "_autoResource");
						GM_deleteValue(herere() + "_CorpRemain");
						GM_deleteValue(herere() + "_minLevelId");
						GM_deleteValue(herere() + "_minLevelCropId");
					}
					break;
					
				case "1"://new build
					GM_deleteValue(herere() + "_BuildingUpdataTime")
					GM_deleteValue(herere() + "_UpdataTime")
					break;
					
				case "5"://auto transport
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_TraningTime")
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_autoTransTime")
					auTranTo=GM_getValue(herere() + "_autoTransTo")
					auTrans=auTranTo.split("|")
					if (auTrans.length > 1) {
						for (a in auTrans) {
							if (auTrans[a] == thisTask[2]) {
								auTrans.splice(a, 1)
								break;
							}
						}
						GM_setValue(herere() + "_autoTransTo",auTrans.join("|"))
					}
					else {
						GM_deleteValue(herere() + "_autoTransTo")
					}
					break;
					
				case "7"://demolish
					GM_deleteValue(herere() + "_demolishTime");
					break;
					
			}
			deleteTaskFromCookie(currentID(), thisTask)
		}
	}




	function deleteAllTasks(){
		GM_deleteValue(herere() + "_waitTask")
		GM_deleteValue(herere() + "_BuildingUpdataTime")
		GM_deleteValue(herere() + "_ResourceUpdataTime")
		GM_deleteValue(herere() + "_UpdataTime")
		GM_deleteValue(herere() + "_autoTransTime")
		GM_deleteValue(herere() + "_TraningTime")
		GM_deleteValue(herere() + "_autoTransTo")
		GM_deleteValue(herere() + "_autoResource")
		GM_deleteValue(herere() + "_demolishTime")
		GM_setValue(myacc() + "_doing", "1");
		GM_log("set doing to 1");
		document.body.removeChild($("tasklisttable_wrapper"))
	}
	
	function addtaskbefore(vi, gid, ki){
		//ki="0" is Romans autoResource, ki="2" is other race autoResource
		thebuildid = getbuildfromdorf2(vi, gid)
		addtask = "0_" + thebuildid + "_000000000"
		newTaskstring = addtask + "|" + GM_getValue(myacc() + "_" + vi + "_waitTask");
		GM_setValue(myacc() + "_" + vi + "_waitTask", newTaskstring);
		switch (ki) {
			case "0":
				GM_deleteValue(myacc() + "_" + vi + "_BuildingUpdataTime");
				break;
			case "2":
				GM_deleteValue(myacc() + "_" + vi + "_UpdataTime");
				break;
		}
		window.location.href=myhost + "/dorf1.php";
	}
	
	
	function getbuildfromdorf2(vil, gid){
		var turl = myhost + "/dorf2.php?newdid=" + vil
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
					
					var thebuild = aDoc.evaluate('id("map2")//area[contains(@title,"' + allbuildwithid[gid] + '")]', aElem, null, 9, null);
					temmp=thebuild.singleNodeValue.title.split(" ")
					level = parseInt(temmp[temmp.length-1]) + 1
					return thebuild.singleNodeValue.href.split("id=")[1] + "_" + level.toString();
				}
			}
		}
		return callback()
	}
	
	
	
	function getAutoResourceId(vi){
		corpremain = GM_getValue(myacc() + "_" + vi + "_CorpRemain")
		minlevelid = GM_getValue(myacc() + "_" + vi + "_minLevelId")
		minlevelcropid = GM_getValue(myacc() + "_" + vi + "_minLevelCropId")
		if (GM_getValue(myacc() + "_" + vi + "_ResourceRate")== "1:1:1:15") {
			GM_log("in 15corps mainvillage, just upgrade corpfield, so return id is " + minlevelcropid)
			return minlevelcropid
		}
		else {
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
	}
	
	
	 function getResourceRate(){
	 	if (window.location.href.indexOf("dorf1") != -1) {
	 		mydiv = $("rx");
	 		rate = new Array()
	 		for (i = 0; i < 4; i++) {
	 			reg = new RegExp(allresindorf1[i], "g");
	 			mysearch = mydiv.innerHTML.match(reg)
	 			newlength = rate.push(mysearch.length);
	 		}
	 		GM_setValue(herere()+ "_ResourceRate", rate.join(":"));
	 	}
	 }
	
	
	function deleteTaskFromCookie(Vii, Taa,newTa){
		GM_log("come into deleteTaskFromCookie(Vii, Taa)")
		taskcook = GM_getValue(myacc() + "_" + Vii + "_waitTask")
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
			GM_setValue(myacc() + "_" + Vii + "_waitTask", newCook)
			GM_log("ok,i delete a task")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
		else {
			GM_deleteValue(myacc() + "_" + Vii + "_waitTask")
			if (GM_getValue(myacc() + "_" + Vii + "_ResourceUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_ResourceUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_BuildingUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_BuildingUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_UpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_UpdataTime")
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
			var ubC = GM_getValue(myacc() + "_" + vi + "_waitTask");
			var arrUbC = ubC.split("|");
			var tmpUb = arrUbC[i + updown];
			arrUbC[i + updown] = arrUbC[i];
			arrUbC[i] = tmpUb;
			ubC = arrUbC.join("|");
			GM_setValue(myacc() + "_" + vi + "_waitTask", ubC)
			document.body.removeChild($("tasklisttable_wrapper"))
			showTaskList()
		}
	}

	function promptFreshInterval(){
		curentSetup = GM_getValue(myacc() + "_FreshInterval", "20")
		var newSetup = prompt(taskoftext[37],curentSetup);
		GM_setValue(myacc() + "_FreshInterval", newSetup)
	}

	function promptTranInterval(){
		curentSetup2 = GM_getValue(myacc() + "_TransInterval", "30")
		var newSetup2 = prompt(taskoftext[42],curentSetup2);
		GM_setValue(myacc() + "_TransInterval", newSetup2)
	}

	function calldoing1(){
		taskdoing = "1"
		GM_setValue(myacc() + "_doing", "1");
		GM_log("set doing to 1");
	}

	function calldoing0(){
		taskdoing = "0"
		GM_setValue(myacc() + "_doing", "0");
		GM_log("set doing to 0");
	}

	ccclock = 0;
	function eachTimedo(){
		ccclock = ccclock + 6000
		if (ccclock > Number(pagefreshInterval)*60*1000) {
			GM_log("reload in eachTimedo() ,  each "+pagefreshInterval+" minutes")
			GM_deleteValue(myacc() + "_doing");
			window.location.replace(myhost + "/dorf1.php")
		}
		
		var now = new Date();
		nowmillse = now.getTime();
		
		for (v in getAllVillageNewdids()) {
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_waitTask", "false")
			if (whatever != "false"&&taskdoing=="1") {
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
						if(remainA<1000&&taskdoing=="1"){
							calldoing0()
							startAttacknow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "4"){
						TrainT=Number(thisTask[3])
						remainT=TrainT- nowmillse;
						if(remainT<1000&&taskdoing=="1"){
							calldoing0()
							startTrainNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "8"){//8_241654_500,500,500,500_0_1245413194000_interval
						customTransT=Number(thisTask[4])
						remainCu=customTransT- nowmillse;
						if(remainCu<1000&&taskdoing=="1"){
							calldoing0()
							startCustomTranNow(getAllVillageNewdids()[v], thisTask)
						}
					}
					if (thisTask[0] == "6"){//6_1_1000_1245413194000
						partyT=Number(thisTask[3])
						remainPa=partyT- nowmillse;
						if(remainPa<1000&&taskdoing=="1"){
							calldoing0()
							startPartyNow(getAllVillageNewdids()[v], thisTask)
						}
					}
				}
				if (allTran.length > 0) {
					for (i in allTran) {
						TranT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_autoTransTime", "1500000000000");
						TraningT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_TraningTime", "1500000000000")
						
						if ((parseInt(TranT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							startTrannow(getAllVillageNewdids()[v], allTran[i])
						}
						if ((parseInt(TraningT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							ki = fleshTraning(getAllVillageNewdids()[v], allTran[i])
							GM_log("here is eachTimedo(), return from Fleshtraning is " + ki)
						}
					}
				}
				
				resT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_ResourceUpdataTime", "false");
				buiT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_BuildingUpdataTime", "false");
				upT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_UpdataTime", "false");
				DemoT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_demolishTime", "false");
		
				
				if (resT != "false") {
					remainTime1 = parseInt(resT) - nowmillse
					if (remainTime1 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "0")
						break;
					}
				}
				if (buiT != "false") {
					remainTime2 = parseInt(buiT) - nowmillse
					if (remainTime2 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "1")
						break;
					}
				}
				if (upT != "false") {
					remainTime3 = parseInt(upT) - nowmillse
					if (remainTime3 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "2")
						break;
					}
				}
				if (DemoT != "false") {
					remainTime4 = parseInt(DemoT) - nowmillse;
					for (lk in allTasks) {
						mytask = allTasks[lk].split("_");
						if (mytask[0] == "7" && remainTime4 < 1000&&taskdoing=="1") {
							calldoing0()
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
	GM_registerMenuCommand(taskoftext[42], promptTranInterval);

if (GM_getValue(myacc() + "_raceID", "false") == "false") {
	window.location.replace(myhost + "/spieler.php?uid=" + getuid())
}

	showTaskList()
	getMainVillageid()
	getResourceCap()
	getResourceRate()
	
	if (window.location.href.indexOf("&s=4") == -1) {
		getallVillagePos()
	}
	
	if(window.location.href.indexOf("a2b.php") != -1 && window.location.href.match(/[\?&]d=/)==null){
		createAttackBtn()
	}

	var h1innerr=h1in().innerHTML.split(" ")
	switch (h1innerr.length){
		case 3:
			bName=h1innerr[0];
		break;
		case 4:
			bName=h1innerr[0]+" "+h1innerr[1]
		break;
		case 5:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2]
		break;
		case 6:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2]+" "+h1innerr[3]
		break;
		default:
		bName=""
		break;
	}
	if (bName==allbuildwithid[24]){
		createPartylnk()
	}
	
	if(h1in().innerHTML.indexOf(allbuildwithid[15])!=-1&&h1innerr[h1innerr.length-1]>9&&(!$("demolish"))){
		createDemolishlnk()
	}
	
	if (bName==allbuildwithid[19]||bName==allbuildwithid[20]||bName==allbuildwithid[21]||bName==allbuildwithid[25]||bName==allbuildwithid[26]||bName==allbuildwithid[29]||bName==allbuildwithid[30]){
		createTrainLnk()
	}

	if (window.location.href.indexOf("build") != -1 && window.location.href.match(/[^gd]id/) != null && !isNaN(h1innerr[h1innerr.length-1]) && window.location.href.indexOf("&t=") == -1) {
		createbuildlink()
	}
	
	if(h1in().innerHTML==gametext[15]){
		createNewbuildLnk()
	}
	
	if (window.location.href.indexOf("dorf1") != -1) {
		createAutoResLink()
	}
	
	if (bName == allbuildwithid[17] && window.location.href.indexOf("t=") == -1) {
		createAutoTransBtn()
	}
	
	if (h1in().innerHTML.indexOf(allbuildwithid[37])!=-1) {
		getHeroSpeed()
	}
	window.addEventListener("keydown", cleartime, false)
	window.addEventListener("mousemove", cleartime, false)
	
	myower = setInterval(eachTimedo, 6000)
	
//mybar.innerHTML=taskoftext[42]