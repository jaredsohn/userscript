?// ==UserScript==
// @name 	Travian AutoTask
// @author 	congxz6688
// @version 	1.2.4.1.6
// @description Ver 1.2.4.1.6
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

var crtVersion="Ver 1.2.4.1.6"
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

	case "my"://thanks felixz 
		allbuildwithid - ["Kawasan Pembalakan", "Kuari Tanah Liat", "Lombong Bijih Besi", "Ladang", "Kilang Papan", "Kilang Bata", "Faundri Besi", "Pengisar Bijian", "Kilang Roti", "Gudang", "Jelapang", "Kedai Senjata", "Kedai Perisai", "Gelanggang Latihan", "Bangunan Utama", "Titik Perhimpunan", "Pasar", "Kedutaan", "Berek", "Kandang Kuda", "Bengkel", "Akademi", "Gua", "Dewan Perbandaran", "Residen", "Istana", "Perbendaharaan", "Pejabat Dagangan", "Berek Besar", "Kandang Kuda Besar", "Tembok Bandar", "Tembok Tanah", "Pagar Kubu", "Kedai Tukang Batu", "Kilang Bir", "Pemerangkap", "Rumah Agam Wira", "Gudang Besar", "Jelapang Besar", "Dunia Keajaiban", "Palung Kuda"];
		allresindorf1=["Kawasan Pembalakan", "Kuari Tanah Liat", "Lombong Bijih Besi", "Ladang"]
addTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		TaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Tahap", "Pedagang", "ID", "Ibu Kota", "Waktu mula", "Ke", "Kampung", "Angkut", "Dari", "Angkut ke", "Angkut dari", "Balik dari", "sumber", "bangunan", "Bina bangunan", "Kosong", "Tahap"];
		raceName = ["Rom", "Teuton", "Gaul"];
		taskoftext = ["Schedule Upgrade", "Schedule NewBuild", "AutoResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans_In_limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition", "Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent", "Schedule Train","Train site","TrainTask done","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration","minutes","pausing","running","run","pause"];
		errorText = ["Terlalu sedikit sumber.", "Para pekerja sedang bekerja.", "Pembinaan selesai", "Pembinaan Bermulaan", "Dalam pembinaan", "Gudang anda terlalu kecil. Sila tingkatkan gudan anda untuk meneruskan pembinaan", "Jelapang anda terlalu kecil. Sila tingkatkan jelapang anda untuk meneruskan pembinaan", "Sumber cukup","kekurangan makanan: Lanjutkan ladang dahulu!","Perayaan sedang disambut"];
		otherText = ["Important note", "Only the resource fields of the capital can <br>be upgraded to level 20. Now your capital<br> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br>Visit your Profile to determine your race.<br>", "Please also visit your Hero's Mansion to determine<br> the speed and the type of your hero."];
		allsourceString = "Kawasan PembalakanKuari Tanah LiatLombong Bijih BesiLadang"
		resources=["kayu","tanah liat","besi","ladang"];
		allbuildString = "Kilang PapanKilang BataFaundri BesiPengisar BijianKilang RotiGudangJelapangKedai SenjataKedai PerisaiGelanggang LatihanBangunan UtamaTitik PerhimpunanpasarKedutaanBerekKandang KudaBengkelAkademiGuaDewan PerbandaranResidenIstanaPerbendaharaanPejabat DaganganBerek BesarKandang Kuda BesarTembok BandarTembok TanahPagar KubuKedai Tukang BatuKilang BirPemerangkapRumah Agam WiraGudang BesarJelapang BesarDunia KeajaibanPalung Kuda"
		
		var troops = [];
		troops[0] = ["Askar Legion", "Pengawal Pertahanan", "Askar Empayar", "Kesatria Diplomatik", "Kesatria Empayar", "Kesatria Jeneral", "Kereta Pelantak", "Tarbil Api", "Senator", "Peneroka", "wira"];
		troops[1] = ["Askar Belantan", "Askar Lembing", "Askar Kapak", "Peninjau", "Kesatria Santo", "Kesatria Teutonik", "Kereta Pelantak", "Tarbil", "Penghulu", "Peneroka", "Wira"];
		troops[2] = ["Falanks", "Askar Pedang", "Penjelajah", "Guruh Theutates", "Penunggang Druid", "Haeduan", "Kereta Pelantak", "Tarbil", "Pemimpin", "Peneroka", "Wira"];
		attacktype = ["Bantuan", "Serang", "Serbu"]
		break;

	case "uk":	
	case "in"://thanks Abhi J
	case "com"://thanks  ieyp
		allbuildwithid = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		allresindorf1=["Woodcutter", "Clay Pit", "Iron Mine", "Cropland"]
		addTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		TaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		gametext = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		raceName = ["Romans", "Teutons", "Gauls"];
		taskoftext = ["Schedule Upgrade", "Schedule NewBuild", "AutoResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans_In_limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition", "Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent", "Schedule Train","Train site","TrainTask done","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration","minutes","pausing","running","run","pause"];
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
