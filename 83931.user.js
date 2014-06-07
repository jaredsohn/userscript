// ==UserScript==
// @name           Asystent Wolni farmerzy 
// @namespace      http://boty-farmerskie.tk
// @description    W-F nowa wersja 2
// @date           31.08.2010
// @version        1.0.14
// @include        http://*myfreefarm.*
// @include        http://*wolnifarmerzy.pl*
// @include        http://*enkicsitanyam.hu*
// @include        http://*tr.myfreefarm.com*
// @include        http://*veselaferma.com*
// @exclude        http://*board.myfreefarm.*
// @exclude        http://*forum.myfreefarm.*
// @exclude        http://*farmpedia.myfreefarm.*
// @exclude        http://*forum.enkicsitanyam.hu*
// @exclude        http://*forum.wolnifarmerzy.pl*
// @exclude        http://*forum.tr.myfreefarm.com*
// @exclude        http://*forum.veselaferma.com*
// ==/UserScript==

window.addEventListener("load",function(){
var scriptUrl = "http://boty-farmerskie.tk";
var version = "1.0.14";

// Umlaute
var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
var sz = "\u00DF";
//***********************************************************************************************************
// Multilingual
if (document.location.href.search("veselaferma.com")!=-1) {
	var lng = "bu";
	var gamepage = ".veselaferma.com";
	var reg = /http:\/\/s(\d+)\.veselaferma\.com\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)veselaferma\.com\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("myfreefarm.co.uk")!=-1) {
	var lng = "uk";
	var gamepage = ".myfreefarm.co.uk";
	var reg = /http:\/\/s(\d+)\.myfreefarm\.co\.uk\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.co\.uk\/(.*)/i;
	var delimThou = ",";
	var regDelimThou = /,/g;
	var regDelimThou2 = /([\d\.])(\d),(\d{1,2}\D)/;
	var regDelimThou3 = /(\d),(,*)(\d{1,2}\D)/;
	var delimDeci = ".";
	var regDelimDeci = /\./;
	// Umstellung seit 01.06.
	var help = GM_listValues();
	for (var v=0;v<help.length;v++){
		if (help[v].search("co.uk")==0) {
			GM_setValue(help[v].replace("co.",""),GM_getValue(help[v]));
			GM_deleteValue(help[v]);
		}
	}
}
else if (document.location.href.search("myfreefarm.de")!=-1) {
	var lng = "de";
	var gamepage = ".myfreefarm.de";
	var reg = /http:\/\/s(\d+)\.myfreefarm\.de\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.de\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("enkicsitanyam.hu")!=-1) {
	var lng = "hu";
	var gamepage = ".enkicsitanyam.hu";
	var reg = /http:\/\/s(\d+)\.enkicsitanyam\.hu\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)enkicsitanyam\.hu\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("myfreefarm.nl")!=-1) {
	var lng = "nl";
	var gamepage = ".myfreefarm.nl";
	var reg = /http:\/\/s(\d+)\.myfreefarm\.nl\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)myfreefarm\.nl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("wolnifarmerzy.pl")!=-1) {
	var lng = "pl";
	var gamepage = ".wolnifarmerzy.pl";
	var reg = /http:\/\/s(\d+)\.wolnifarmerzy\.pl\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)wolnifarmerzy\.pl\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}
else if (document.location.href.search("tr.myfreefarm.com")!=-1) {
	var lng = "tr";
	var gamepage = ".tr.myfreefarm.com";
	var reg = /http:\/\/s(\d+)\.tr\.myfreefarm\.com\/(.*?)\.php(.*)/i;
	var reg2 = /http:\/\/(.*)tr\.myfreefarm\.com\/(.*)/i;
	var delimThou = ".";
	var regDelimThou = /\./g;
	var regDelimThou2 = /([\d\.])(\d)\.(\d{1,2}\D)/;
	var regDelimThou3 = /(\d)\.(\.*)(\d{1,2}\D)/;
	var delimDeci = ",";
	var regDelimDeci = /,/;
}

var texte = new Object();
texte["hilfe"] = new Object();
switch (lng) {
case "bu": {
var bu_D = "\u0414";
var bu_d = "\u0434";
var bu_gh = "\u0433";
var bu_k = "\u043A";
var bu_i = "\u0438";
var bu_P = "\u041F";
var bu_t = "\u0442";
var bu_v = "\u0432";
var bu_z = "\u0437";
texte["berater"] = "Adviser";
texte["autologin1"] = "Checking active sessions.  Please wait %1% seconds<br>...";
texte["autologin2"] = "All accounts logged in.";
texte["umloggen"] = "Login";
texte["marktplatz"] = "Market Place";
texte["statistik"] = "Statistics";
texte["geheZuSeite"] = "Go to page";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = "overview";
texte["optionen"] = "Options";
texte["profitTable"] = "Profit per Zone per Day";
texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
texte["zurFarmpedia"] = "Zur FarmPedia";
// market
texte["zumIdMarkt"] = "go to market of xx";
texte["zumSGH"] = "go to shop";
texte["markt1"] = "Current offers";
texte["markt2"] = "above";
texte["markt3"] = "over NPC-price";
texte["markt4"] = "over";
texte["kauf"] = "Buy";
texte["preis"] = "Price";
texte["preise"] = "Prices";
texte["stueckpreis"] = "Unit price";
texte["sorte1"] = "Plants";
texte["sorte2"] = "Animal products";
texte["sorte3"] = "Manufactured products";
texte["sorte4"] = "All";
texte["produkt"] = "Product";
texte["bestand"] = "Inventory";
texte["hofpreis"] = "NPC-Price";
texte["beobachtet"] = "Observed";
texte["marktpreis"] = "Market&nbsp;Price";
texte["abzglGebuehr"] = "After Fee";
texte["nimmPreise"] = "Take observed prices";
texte["lagerwert"] = "Stock value";
// main
texte["ausbauenFuer"] = "upgrade&nbsp;for&nbsp;%1%";
texte["main1"] = "Empty field!";
texte["heute"] = "Today";
texte["day1"] = "Tomorrow";
texte["day2"] = "Second day";
texte["um"] = "at";
texte["seit"] = "since";
texte["uhr"] = "h";
texte["level"] = "Level";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Finished";
texte["spielerSuchen"] = "Search player";
texte["relogin"] = "Session ends soon.<br>New login in xx sec.";
texte["adEnds"] = "Advertising ends today";
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = "write message";
texte["vorlage"] = "Save as template";
texte["zurNachricht"] = "to message";
texte["vorigeNachricht"] = "previous message";
texte["naechsteNachricht"] = "next message";
texte["formatiereZahlen"] = "Format numbers";
// contracts
texte["vertragSchicken"] = "send contract";
texte["erhalteneVertraege"] = "Contracts received";
texte["gesendeteVertraege"] = "Contracts sent";
texte["alte"] = "Old";
// system messages
texte["zeigeLog"] = "show log";
texte["alleLesen"] = "read all";
texte["menge"] = "Quantity";
texte["umsatz"] = "Turnover";
texte["gewinn"] = "Profit";
texte["filtern"] = "Filter for xx";
texte["summiere"] = "summarize";
texte["filter"] = "Filter";
texte["kaeufer"] = "Buyers";
texte["waren"] = "Goods";
// score history
texte["tag"] = "Day";
texte["punkte"] = "Points";
texte["imLager"] = "in stock";
texte["lagerFehlt"] = "Stock xx missing!!!";
texte["lagerNiedrig"] = "Stock xx low";
// overview
texte["farmi"] = "Farmie";
texte["produkte"] = "Products";
texte["geld"] = "Offered";
texte["wert"] = "Value";
texte["fehlt"] = "Need";
texte["ertrag"] = "Yield";
texte["produktion"] = "Production";
texte["total"] = "Total";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "idle !!";
texte["dauer"] = "duration";
texte["futter"] = "Feed";
// options panel
texte["set_CacheReset"] = "Cache reset";
texte["set_ScriptHomepage"] = "Script Homepage";
texte["set_valAutoLogin"] = "Automatic login";
texte["set_valGiess"] = "Automatic watering";
texte["set_valErnte"] = "Automatic harvesting";
texte["set_valGiessNotw"] = "Watering needed";
texte["set_valErnteMsg"] = "Close harvest dialog";
texte["set_valLeereFelderLimit"] = "Empty areas";
texte["set_valMoveAnimals"] = "Move animals";
texte["set_valMinRackV"] = "Minimal rackamount plants";
texte["set_valMinRackE"] = "Minimal rackamount products";
texte["set_valKauflimit"] = "Top Buy limit";
texte["set_valVerkaufLimit"] = "Sell limits";
texte["set_valJoinPreise"] = "One input";
texte["set_valPrivNachr"] = "Number privat messages kept";
texte["set_valNachr"] = "Number market messages kept";
texte["set_valQuicklinks"] = "Show market quicklinks";
texte["set_highlight"] = "Highlight user at market";
texte["set_valNimmBeob"] = "Use observed prices";
texte["set_valStatistik"] = "Send statistics";
texte["set_valUpdate"] = "Update";
texte["set_valDrag"] = "Dragging";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market Place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
texte["set_valGlobaltimeWindmill"] = "Integrate windmill";
texte["confirm_NimmBeob"] = "The observed prices will overwrite previously saved market prices ...";
texte["confirm_CacheReset"] = "All information about your farms will be deleted ...";
texte["autoLogin"] = "Automatic Login";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Invalid Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["speichern"] = "save";
texte["loeschen"] = "erase";
texte["msgUpdate"] = "There is a new script version. Install?";
texte["zeigePasswoerter"] = "show passwords";
texte["info_valAutoLogin"] = "Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts.";
texte["info_valGiess"] = "Plants will be watered after planting, if you have 'Water everything' (Premium).";
texte["info_valErnte"] = "After opening your field, crops will be harvested if necessary.";
texte["info_valGiessNotw"] = "Shall the necessity of watering be displayed?";
texte["info_valErnteMsg"] = "Don't like the annoying harvest notification with the pig?  Get rid of it here.";
texte["info_valLeereFelderLimit"] = "If the number of unplanted areas in your field exceeds this number, the field will be shown as empty.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "A plant is marked if its amount in your rack is falling below this value.";
texte["info_valMinRackE"] = "...same for the other products";
texte["info_valKauflimit"] = "You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods.";
texte["info_valVerkaufLimit"] = "Your sales are also protected, so that you don't price your own goods too cheaply or too highly.";
texte["info_valJoinPreise"] = "Joins the price input fields at the market stand."
texte["info_valPrivNachr"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info_valNachr"] = "Old messages remain in this archive, even if they are older than the maximum 7 days.";
texte["info_valQuicklinks"] = "Show Quicklinks at Market Place";
texte["info_valNimmBeob"] = "Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"
texte["info_valStatistik"] = "Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!";
texte["info_valUpdate"] = "Checks whether an updated version of this Advisor script is available.";
texte["info_valDrag"] = "Allow moving windows by clicking the upper left corner.";
texte["info_valHotkeys"] = "Use hotkeys to quicker navigate the game. See the help.";
texte["info_valGlobaltimeWindmill"] = "Shall the time of the windmill be included to the global time?";
//help
texte["zeigeFehlendeProdukte"] = "Show product shortage";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords
texte["waehrung"] = bu_k+bu_D;
texte["coins"] = "Кре"+bu_d+bu_i+bu_t+bu_i;
texte["msg1a"] = bu_P+"а"+bu_z+"ар";
texte["msg1b"] = /(.*) .а....\s*(\d+)x (.*?) ..<br>\s*(.*?) .. .. ...\./;
texte["msg2a"] = bu_P+"р"+bu_i+"е"+bu_t+" "+bu_d+"о"+bu_gh+"о"+bu_v+"ор";
texte["msg2b"] = /(.*) е .о...са. .а. .о.о.ор!<br><br>\s*С.е....е .ро..... са .... .ро.а.е..:<br>([\S\s]*)\s*<br>\s*С..а.а о. (.*?) .. е .ре.е.е.а ... .а.... а.а...\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "uk": { // translation thanks to mym
texte["berater"] = "Adviser";
texte["autologin1"] = "Checking active sessions.  Please wait %1% seconds<br>...";
texte["autologin2"] = "All accounts logged in.";
texte["umloggen"] = "Login";
texte["marktplatz"] = "Market Place";
texte["statistik"] = "Statistics";
texte["geheZuSeite"] = "Go to page";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = "overview";
texte["optionen"] = "Options";
texte["profitTable"] = "Profit per Zone per Day";
texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
texte["zurFarmpedia"] = "Zur FarmPedia";
// market
texte["zumIdMarkt"] = "go to market of xx";
texte["zumSGH"] = "go to shop";
texte["markt1"] = "Current offers";
texte["markt2"] = "above";
texte["markt3"] = "over NPC-price";
texte["markt4"] = "over";
texte["kauf"] = "Buy";
texte["preis"] = "Price";
texte["preise"] = "Prices";
texte["stueckpreis"] = "Unit price";
texte["sorte1"] = "Plants";
texte["sorte2"] = "Animal products";
texte["sorte3"] = "Manufactured products";
texte["sorte4"] = "All";
texte["produkt"] = "Product";
texte["bestand"] = "Inventory";
texte["hofpreis"] = "NPC-Price";
texte["beobachtet"] = "Observed";
texte["marktpreis"] = "Market&nbsp;Price";
texte["abzglGebuehr"] = "After Fee";
texte["nimmPreise"] = "Take observed prices";
texte["lagerwert"] = "Stock value";
// main
texte["ausbauenFuer"] = "upgrade&nbsp;for&nbsp;%1%";
texte["main1"] = "Empty field!";
texte["heute"] = "Today";
texte["day1"] = "Tomorrow";
texte["day2"] = "Second day";
texte["um"] = "at";
texte["seit"] = "since";
texte["uhr"] = "h";
texte["level"] = "Level";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Finished";
texte["spielerSuchen"] = "Search player";
texte["relogin"] = "Session ends soon.<br>New login in xx sec.";
texte["adEnds"] = "Advertising ends today";
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = "write message";
texte["vorlage"] = "Save as template";
texte["zurNachricht"] = "to message";
texte["vorigeNachricht"] = "previous message";
texte["naechsteNachricht"] = "next message";
texte["formatiereZahlen"] = "Format numbers";
// contracts
texte["vertragSchicken"] = "send contract";
texte["erhalteneVertraege"] = "Contracts received";
texte["gesendeteVertraege"] = "Contracts sent";
texte["alte"] = "Old";
// system messages
texte["zeigeLog"] = "show log";
texte["alleLesen"] = "read all";
texte["menge"] = "Quantity";
texte["umsatz"] = "Turnover";
texte["gewinn"] = "Profit";
texte["filtern"] = "Filter for xx";
texte["summiere"] = "summarize";
texte["filter"] = "Filter";
texte["kaeufer"] = "Buyers";
texte["waren"] = "Goods";
// score history
texte["tag"] = "Day";
texte["punkte"] = "Points";
texte["imLager"] = "in stock";
texte["lagerFehlt"] = "Stock xx missing!!!";
texte["lagerNiedrig"] = "Stock xx low";
// overview
texte["farmi"] = "Farmie";
texte["produkte"] = "Products";
texte["geld"] = "Offered";
texte["wert"] = "Value";
texte["fehlt"] = "Need";
texte["ertrag"] = "Yield";
texte["produktion"] = "Production";
texte["total"] = "Total";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "idle !!";
texte["dauer"] = "duration";
texte["futter"] = "Feed";
// options panel
texte["set_CacheReset"] = "Cache reset";
texte["set_ScriptHomepage"] = "Script Homepage";
texte["set_valAutoLogin"] = "Automatic login";
texte["set_valGiess"] = "Automatic watering";
texte["set_valErnte"] = "Automatic harvesting";
texte["set_valGiessNotw"] = "Watering needed";
texte["set_valErnteMsg"] = "Close harvest dialog";
texte["set_valLeereFelderLimit"] = "Empty areas";
texte["set_valMoveAnimals"] = "Move animals";
texte["set_valMinRackV"] = "Minimal rackamount plants";
texte["set_valMinRackE"] = "Minimal rackamount products";
texte["set_valKauflimit"] = "Top Buy limit";
texte["set_valVerkaufLimit"] = "Sell limits";
texte["set_valJoinPreise"] = "One input";
texte["set_valPrivNachr"] = "Number privat messages kept";
texte["set_valNachr"] = "Number market messages kept";
texte["set_valQuicklinks"] = "Show market quicklinks";
texte["set_highlight"] = "Highlight user at market";
texte["set_valNimmBeob"] = "Use observed prices";
texte["set_valStatistik"] = "Send statistics";
texte["set_valUpdate"] = "Update";
texte["set_valDrag"] = "Dragging";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market Place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
texte["set_valGlobaltimeWindmill"] = "Integrate windmill";
texte["confirm_NimmBeob"] = "The observed prices will overwrite previously saved market prices ...";
texte["confirm_CacheReset"] = "All information about your farms will be deleted ...";
texte["autoLogin"] = "Automatic Login";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Invalid Server";
texte["name"] = "Name";
texte["passwort"] = "Password";
texte["speichern"] = "save";
texte["loeschen"] = "erase";
texte["msgUpdate"] = "There is a new script version. Install?";
texte["zeigePasswoerter"] = "show passwords";
texte["info_valAutoLogin"] = "Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts.";
texte["info_valGiess"] = "Plants will be watered after planting, if you have 'Water everything' (Premium).";
texte["info_valErnte"] = "After opening your field, crops will be harvested if necessary.";
texte["info_valGiessNotw"] = "Shall the necessity of watering be displayed?";
texte["info_valErnteMsg"] = "Don't like the annoying harvest notification with the pig?  Get rid of it here.";
texte["info_valLeereFelderLimit"] = "If the number of unplanted areas in your field exceeds this number, the field will be shown as empty.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "A plant is marked if its amount in your rack is falling below this value.";
texte["info_valMinRackE"] = "...same for the other products";
texte["info_valKauflimit"] = "You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods.";
texte["info_valVerkaufLimit"] = "Your sales are also protected, so that you don't price your own goods too cheaply or too highly.";
texte["info_valJoinPreise"] = "Joins the price input fields at the market stand."
texte["info_valPrivNachr"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info_valNachr"] = "Old messages remain in this archive, even if they are older than the maximum 7 days.";
texte["info_valQuicklinks"] = "Show Quicklinks at Market Place";
texte["info_valNimmBeob"] = "Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"
texte["info_valStatistik"] = "Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!";
texte["info_valUpdate"] = "Checks whether an updated version of this Advisor script is available.";
texte["info_valDrag"] = "Allow moving windows by clicking the upper left corner.";
texte["info_valHotkeys"] = "Use hotkeys to quicker navigate the game. See the help.";
texte["info_valGlobaltimeWindmill"] = "Shall the time of the windmill be included to the global time?";
//help
texte["zeigeFehlendeProdukte"] = "Show product shortage";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords
texte["waehrung"] = "pD";
texte["coins"] = "Coins"
texte["msg1a"] = "Marketplace";
texte["msg1b"] = /(.*) bought\s*(\d+)x (.*?) for\s*<br>\s*(.*?) pD from you\./;
texte["msg2a"] = "A contract has been accepted";
texte["msg2b"] = /(.*) has signed a contract of yours!<br><br>\s*The following products have been sold:<br>([\S\s]*)\s*<br>\s*The amount of (.*?) pD has been credited to your account\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "de": {
texte["berater"] = "Berater";
texte["autologin1"] = "Ermittle aktive Sessions. Bitte %1% Sekunden warten<br>...";
texte["autologin2"] = "Alle Accounts eingeloggt.";
texte["umloggen"] = "Umloggen";
texte["marktplatz"] = "Marktplatz";
texte["statistik"] = "Statistik";
texte["geheZuSeite"] = "gehe zu Seite";
texte["geheZuPlatz"] = "Gehe zu Platz";
texte["uebersicht"] = Ue+"bersicht";
texte["optionen"] = "Optionen";
texte["profitTable"] = "Profit pro Zone pro Tag";
texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
texte["zurFarmpedia"] = "Zur FarmPedia";
// market
texte["zumIdMarkt"] = "zum xx-Markt";
texte["zumSGH"] = "zum Saatguth"+ae+"ndler";
texte["markt1"] = "Aktuelle Angebote";
texte["markt2"] = "davor";
texte["markt3"] = ue+"ber NPC-Preis";
texte["markt4"] = ue+"ber";
texte["kauf"] = "Kauf";
texte["preis"] = "Preis";
texte["preise"] = "Preise";
texte["stueckpreis"] = "St"+ue+"ckpreis";
texte["sorte1"] = "Pflanzen";
texte["sorte2"] = "Zierprodukte";
texte["sorte3"] = "Fortgeschrittene Produkte";
texte["sorte4"] = "Alle";
texte["produkt"] = "Produkt";
texte["bestand"] = "Bestand";
texte["hofpreis"] = "NPC-Preis";
texte["beobachtet"] = "beobachtet";
texte["marktpreis"] = "Marktpreis";
texte["abzglGebuehr"] = "abzgl Geb"+ue+"hr";
texte["nimmPreise"] = "Nimm beobachtete Preise";
texte["lagerwert"] = "Lagerwert";
// main
texte["ausbauenFuer"] = "ausbauen&nbsp;f"+ue+"r&nbsp;%1%";
texte["main1"] = "Feld leer!";
texte["heute"] = "Heute";
texte["day1"] = "Morgen";
texte["day2"] = Ue+"bermorgen";
texte["um"] = "um";
texte["seit"] = "seit";
texte["uhr"] = "Uhr";
texte["level"] = "Level";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;ben"+oe+"tigt";
texte["fertig"] = "Fertig";
texte["spielerSuchen"] = "Spielersuche";
texte["relogin"] = "Session endet bald.<br>Neuer Login in xx sek.";
texte["adEnds"] = "Werbung endet heute";
texte["upjersWerbung"] = "Upjers-Werbung";
// messages
texte["nachrichtSchreiben"] = "Nachricht schreiben";
texte["vorlage"] = "als Vorlage speichern";
texte["zurNachricht"] = "zur Nachricht";
texte["vorigeNachricht"] = "vorige Nachricht";
texte["naechsteNachricht"] = "n"+ae+"chste Nachricht";
texte["formatiereZahlen"] = "Formatiere Zahlen";
// contracts
texte["vertragSchicken"] = "Vertrag schicken";
texte["erhalteneVertraege"] = "Erhaltene Vertr"+ae+"ge";
texte["gesendeteVertraege"] = "Gesendete Vertr"+ae+"ge";
texte["alte"] = "Alte";
// system messages
texte["zeigeLog"] = "zeige Log";
texte["alleLesen"] = "alle lesen";
texte["menge"] = "Menge";
texte["umsatz"] = "Umsatz";
texte["gewinn"] = "Gewinn";
texte["filtern"] = "Nach xx filtern";
texte["summiere"] = "summiere";
texte["filter"] = "Filter";
texte["kaeufer"] = "K"+ae+"ufer";
texte["waren"] = "Waren";
// score history
texte["tag"] = "Tag";
texte["punkte"] = "Punkte";
texte["imLager"] = "im Lager";
texte["lagerFehlt"] = "Lagerbestand xx fehlt!!!";
texte["lagerNiedrig"] = "Lagerbestand xx niedrig";
// overview
texte["farmi"] = "Farmi";
texte["produkte"] = "Produkte";
texte["geld"] = "Geld";
texte["wert"] = "Wert";
texte["fehlt"] = "Fehlt";
texte["ertrag"] = "Ertrag";
texte["produktion"] = "Produktion";
texte["total"] = "Total";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "unbesch"+ae+"ftigt !!";
texte["dauer"] = "Dauer";
texte["futter"] = "Futter";
// options panel
texte["set_CacheReset"] = "Cache reset";
texte["set_ScriptHomepage"] = "Scripthomepage";
texte["set_valAutoLogin"] = "Automatisch einloggen";
texte["set_valGiess"] = "Automatisch gie"+sz+"en";
texte["set_valErnte"] = "Automatisch ernten";
texte["set_valGiessNotw"] = "Gie"+sz+"en n"+oe+"tig";
texte["set_valErnteMsg"] = "Erntemeldung klicken";
texte["set_valLeereFelderLimit"] = "Leere Felder";
texte["set_valMoveAnimals"] = "Bewege Tiere";
texte["set_valMinRackV"] = "Minimaler Lagerbestand Pflanzen";
texte["set_valMinRackE"] = "Minimaler Lagerbestand Produkte";
texte["set_valKauflimit"] = "Obere Kaufgrenze";
texte["set_valVerkaufLimit"] = "Verkaufgrenzen";
texte["set_valJoinPreise"] = "Ein Preisfeld";
texte["set_valPrivNachr"] = "Anzahl gemerkte Privatnachrichten";
texte["set_valNachr"] = "Anzahl gemerkte Marktnachrichten";
texte["set_valQuicklinks"] = "Quicklinks am Markt anzeigen";
texte["set_highlight"] = "User am Markt markieren";
texte["set_valNimmBeob"] = "Benutze beobachtete Preise";
texte["set_valStatistik"] = "Sende Statistiken";
texte["set_valUpdate"] = "Update";
texte["set_valDrag"] = "Verschieben";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"vorige Nachricht, Zone, ...","nextPage":"n"+ae+"chste Nachricht, Zone, ...","farm1":"1. Farm","farm2":"2. Farm","farm3":"3. Farm","guild":"Club","city1":"Klein Muhstein","city2":"Teichlingen","farmilog":"Farmi-Log","help":"Hilfe","market":"Marktplatz","marketstand":"Marktstand","messages":"Nachrichten","options":"Optionen","profit":"Profit Kalkulation","sgh":"Saatguth"+ae+"ndler","overview":Ue+"bersicht","contract":"Vertr"+ae+"ge","systemmessage":"(n"+ae+"chste ungelesene) Systemnachricht"};
texte["set_valGlobaltimeWindmill"] = "Beachte Windm"+ue+"hle";
texte["confirm_NimmBeob"] = "Es werden die beobachteten Preise eingetragen. Die eigenen gehen dabei verloren ...";
texte["confirm_CacheReset"] = "Alle Informationen "+ue+"ber deine Zonen werden gel"+oe+"scht ...";
texte["autoLogin"] = "Automatischer Login";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Ungueltiger Server";
texte["name"] = "Name";
texte["passwort"] = "Passwort";
texte["speichern"] = "speichern";
texte["loeschen"] = "l"+oe+"schen";
texte["msgUpdate"] = "Es liegt eine neue Script-Version vor. Diese installieren?";
texte["zeigePasswoerter"] = "zeige Passw"+oe+"rter";
texte["info_valAutoLogin"] = "Sobald Nutzerdaten und Passwort eingegeben sind, werden die Accounts wieder eingeloggt. Somit kann wieder gef"+ue+"ttert, geerntet, gegossen und gepflanzt werden. Es m"+ue+"ssen Popups erlaubt werden bei mehreren Accounts.";
texte["info_valGiess"] = "Sagt ja der Name schon: Nach dem Pflanzen wird automatisch gegossen, wenn du den 'Alles gie"+sz+"en' besitzt (Premium).";
texte["info_valErnte"] = "Wie zuvor auch: Es wird beim "+Oe+"ffnen der Ackers geerntet, falls n"+oe+"tig.";
texte["info_valGiessNotw"] = "Soll angezeigt werden, dass dein Acker nicht gegossen ist?";
texte["info_valErnteMsg"] = "Du magst die l"+ae+"stige Erntemeldung mit dem Schwein nicht? Hier wirst du sie los.";
texte["info_valLeereFelderLimit"] = "Es werden unbepflanzte Felder auf deinem Acker erkannt. Sind dies mehr als hier angegeben, wird der Acker als unbenutzt gemeldet.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "Eine Pflanze wird markiert, falls ihr Lagerbestand unter diese Grenze f"+ae+"llt.";
texte["info_valMinRackE"] = "... selbiges f"+ue+"r die anderen Produkte";
texte["info_valKauflimit"] = "Du kannst am Markt nur Produkte kaufen die maximal der Prozentgrenze entsprechen. Dies sch"+ue+"tzt dich vor dem versehentlichen Kauf "+ue+"bertrieben teurer Waren.";
texte["info_valVerkaufLimit"] = "Auch dein Verkauf wird gesch"+ue+"tzt, so dass du weder zu billig noch zu teuer verkaufst.";
texte["info_valJoinPreise"] = "Verbindet die Preis-Eingabefelder beim Marktstand";
texte["info_valPrivNachr"] = "Deine letzten privaten Nachrichten werden gespeichert und somit kann ein Nachrichten-Verlauf mit einem Kontakt angezeigt werden.";
texte["info_valNachr"] = "Es bleiben auch alte System-Nachrichten in diesem Speicher, selbst wenn sie "+ae+"lter als die maximalen 7&nbsp;Tage sind.";
texte["info_valQuicklinks"] = "Quicklinks am Markt anzeigen";
texte["info_valNimmBeob"] = "Wenn du dich durch den Markt klickst, werden die Preise beobachtet. Ein berechneter Preis ist in der Preisliste zu sehen. Soll dieser automatisch "+ue+"bernommen werden?"
texte["info_valStatistik"] = "Unterst"+ue+"tze den <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>. Es werden keine privaten Daten gesendet!";
texte["info_valUpdate"] = "Es wird gepr"+ue+"ft, ob eine neuere Version dieses Scriptes verf"+ue+"gbar ist.";
texte["info_valDrag"] = "Erlaube das Bewegen der Fenster (obere linke Ecke).";
texte["info_valHotkeys"] = "Benutze Hotkeys um schnell durch das Spiel zu navigieren. Schau in die Hilfe.";
texte["info_valGlobaltimeWindmill"] = "Soll die Zeit der Windm"+ue+"hle in die globale Zeit einbezogen werden?";
//help
texte["zeigeFehlendeProdukte"] = "Zeige fehlende Produkte";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords	 			
texte["waehrung"] = "kT";
texte["coins"] = "Coins"
texte["msg1a"] = "Marktplatz";
texte["msg1b"] = /(.*) hat am Marktplatz\s*(\d+)x (.*?) von dir<br>\s*für (.*?) kT gekauft\./;
texte["msg2a"] = "Ein Vertrag wurde angenommen";
texte["msg2b"] = /(.*) hat einen Vertrag von dir unterzeichnet!<br><br>\s*Folgende Produkte wurden verkauft:<br>([\S\s]*)\s*<br>\s*Die Vertragssumme von (.*?) kT wurde deinem Konto gutgeschrieben\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "hu": { // translation thanks to EnKicsiTanyam
var hu_A = "\u00C1";
var hu_a = "\u00E1";
var hu_E = "\u00C9";
var hu_e = "\u00E9";
var hu_i = "\u00ED";
var hu_O_dots = "\u00D6";
var hu_o = "\u00F3";
var hu_o_double = "\u0151";
var hu_o_dots = "\u00F6";
var hu_U = "\u00DA";
var hu_U_dots = "\u00DC";
var hu_u = "\u00FA";
var hu_u_double = "\u0171";
var hu_u_dots = "\u00FC";
texte["berater"] = "Adviser";
texte["autologin1"] = "Akt"+hu_i+"v folyamatok ellen"+hu_o_double+"rz"+hu_e+"se. V"+hu_a+"rj %1% p"+hu_a+"sodpercet<br>...";
texte["autologin2"] = "Felhaszn"+hu_a+"l"+hu_o+"k bejelentkezve.";
texte["umloggen"] = "Login";
texte["marktplatz"] = "Piac";
texte["statistik"] = "Statisztika";
texte["geheZuSeite"] = "Ugr"+hu_a+"s a oldalra";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = hu_O_dots+"sszes"+hu_i+"t"+hu_e+"s";
texte["optionen"] = "Be"+hu_a+"ll"+hu_i+"t"+hu_a+"sok";
texte["profitTable"] = "Nyeres"+hu_e+"g / z"+hu_o+"na / nap";
texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
texte["zurFarmpedia"] = "Zur FarmPedia";
// market
texte["zumIdMarkt"] = "go to market of xx";
texte["zumSGH"] = "go to shop";
texte["markt1"] = "Jelenlegi aj"+hu_a+"nlatok";
texte["markt2"] = "el"+hu_o_dots+"tt";
texte["markt3"] = "az NPC-"+hu_A+"r";
texte["markt4"] = hu_a+"t";
texte["kauf"] = "Buy";
texte["preis"] = hu_A+"r";
texte["preise"] = "Mentett "+hu_a+"r";
texte["stueckpreis"] = "###Unit price";
texte["sorte1"] = "N"+hu_o_dots+"v"+hu_e+"nyek megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte2"] = "D"+hu_i+"szt"+hu_a+"rgyak megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte3"] = hu_A+"lati term"+hu_e+"kek megjelen"+hu_i+"t"+hu_e+"se";
texte["sorte4"] = "Sz"+hu_u_double+"k"+hu_i+"t"+hu_e+"s felold"+hu_a+"sa";
texte["produkt"] = "Term"+hu_e+"k";
texte["bestand"] = "Polc";
texte["hofpreis"] = "NPC-"+hu_A+"r";
texte["beobachtet"] = "Megfigyelt";
texte["marktpreis"] = "Piaci&nbsp;"+hu_A+"r";
texte["abzglGebuehr"] = "Ad"+hu_o+" ut"+hu_a+"n";
texte["nimmPreise"] = "Piaci "+hu_a+"rak tart"+hu_a+"sa";
texte["lagerwert"] = "Polcod "+hu_e+"rt"+hu_e+"ke xx kT";
// main
texte["ausbauenFuer"] = "upgrade&nbsp;for&nbsp;%1%";
texte["main1"] = hu_U_dots+"res mez"+hu_o_double+"!";
texte["heute"] = "Ma";
texte["day1"] = "Holnap";
texte["day2"] = "Holnaput"+hu_a+"n";
texte["um"] = "kor";
texte["seit"] = hu_o+"ta";
texte["uhr"] = hu_o+"ra";
texte["level"] = "Szint";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Befejezve";
texte["spielerSuchen"] = "Search player";
texte["relogin"] = "Session ends soon.<br>New login in xx sec.";
texte["adEnds"] = "Advertising ends today";
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = hu_U_dots+"zenet "+hu_i+"r"+hu_a+"sa";
texte["vorlage"] = "Ment"+hu_e+"s sablonk"+hu_e+"nt";
texte["zurNachricht"] = hu_U_dots+"zenetekhez";
texte["vorigeNachricht"] = "El"+hu_o_double+"z"+hu_o_double+" "+hu_u_dots+"zenet";
texte["naechsteNachricht"] = "K"+hu_o_dots+"vetkez"+hu_o_double+" "+hu_u_dots+"zenet";
texte["formatiereZahlen"] = "Format numbers";
// contracts
texte["vertragSchicken"] = "Szerz"+hu_o_double+"d"+hu_e+"s k"+hu_u_dots+"ld"+hu_e+"se";
texte["erhalteneVertraege"] = "Be"+hu_e+"rkezett szerz"+hu_o_double+"d"+hu_e+"sek";
texte["gesendeteVertraege"] = "Elk"+hu_u_dots+"ld"+hu_o_dots+"tt szerz"+hu_o_double+"d"+hu_e+"sek";
texte["alte"] = "R"+hu_e+"giek";
// system messages
texte["zeigeLog"] = "Napl"+hu_o;
texte["alleLesen"] = hu_O_dots+"sszes olvas"+hu_a+"sa";
texte["menge"] = "Mennyis"+hu_e+"g";
texte["umsatz"] = "Forgalom";
texte["gewinn"] = "Profit";
texte["filtern"] = "Sz"+hu_u_double+"r"+hu_o_double+": xx";
texte["summiere"] = "summarize";
texte["filter"] = "Filter";
texte["kaeufer"] = "Buyers";
texte["waren"] = "Goods";
// score history
texte["tag"] = "Nap";
texte["punkte"] = "Pontsz"+hu_a+"m";
texte["imLager"] = "szinten";
texte["lagerFehlt"] = "A(z) xx hi"+hu_a+"nycikk a gazdas"+hu_a+"godban!";
texte["lagerNiedrig"] = "A(z) xx mennyis"+hu_e+"ge alacsony";
// overview
texte["farmi"] = "Vev"+hu_o_double+"k";
texte["produkte"] = "Bev"+hu_a+"s"+hu_a+"rl"+hu_o+"lista";
texte["geld"] = "Felk"+hu_i+"n"+hu_a+"lt "+hu_a+"r";
texte["wert"] = hu_O_dots+"ssz"+hu_e+"rt"+hu_e+"k";
texte["fehlt"] = "Sz"+hu_u_dots+"ks"+hu_e+"ges term"+hu_e+"kek";
texte["ertrag"] = "Hozam";
texte["produktion"] = "Term"+hu_e+"kenys"+hu_e+"g";
texte["total"] = hu_O_dots+"sszesen termel"+hu_e+"s alatt:";
texte["farm"] = "Farm";
texte["unbeschaeftigt"] = "t"+hu_e+"tlen !";
texte["dauer"] = "Id"+hu_o_double;
texte["futter"] = "Feed";
// options panel
texte["set_CacheReset"] = "Adatok t"+hu_o_dots+"rl"+hu_e+"se";
texte["set_ScriptHomepage"] = "Szkript honlap";
texte["set_valAutoLogin"] = "Auto bel"+hu_e+"p"+hu_e+"s";
texte["set_valGiess"] = "Auto "+hu_o_dots+"nt"+hu_o_dots+"z"+hu_e+"s";
texte["set_valErnte"] = "Auto betakar"+hu_i+"t"+hu_a+"s";
texte["set_valGiessNotw"] = "Watering needed";
texte["set_valErnteMsg"] = "Betakar"+hu_i+"t"+hu_a+"s "+hu_o_dots+"sszes"+hu_i+"t"+hu_o_double+" bez"+hu_a+"r"+hu_a+"sa";
texte["set_valLeereFelderLimit"] = hu_U_dots+"res ter"+hu_u_dots+"letek";
texte["set_valMoveAnimals"] = "Move animals";
texte["set_valMinRackV"] = "Minimal rackamount plants";
texte["set_valMinRackE"] = "Minimal rackamount products";
texte["set_valKauflimit"] = "V"+hu_a+"s"+hu_a+"rl"+hu_a+"si hat"+hu_e+"r"+hu_e+"rt"+hu_e+"k";
texte["set_valVerkaufLimit"] = "Elad"+hu_a+"si hat"+hu_a+"r"+hu_e+"rt"+hu_e+"k";
texte["set_valJoinPreise"] = "One input###";
texte["set_valPrivNachr"] = "###Number privat messages kept";
texte["set_valNachr"] = "Megtartand"+hu_o+" piaci "+hu_u_dots+"zenetek sz"+hu_a+"ma";
texte["set_valQuicklinks"] = "Piac gyorslinkek mutat"+hu_a+"sa";
texte["set_highlight"] = "Highlight user at market###";
texte["set_valNimmBeob"] = "Use observed prices###";
texte["set_valStatistik"] = "Statisztika k"+hu_u_dots+"ld"+hu_e+"se";
texte["set_valUpdate"] = "Friss"+hu_i+"t"+hu_e+"s";
texte["set_valDrag"] = "Dragging";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market Place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
texte["set_valGlobaltimeWindmill"] = "Integrate windmill";
texte["confirm_NimmBeob"] = "A megfigyelt "+hu_a+"rak fel"+hu_u_dots+"l"+hu_i+"rj"+hu_a+"k a mentett piaci "+hu_a+"rakat ...";
texte["confirm_CacheReset"] = "Minden farmoddal kapcsolatos adat "+hu_e+"s inform"+hu_a+"ci"+hu_o+" t"+hu_o_dots+"rl"+hu_e+"se";
texte["autoLogin"] = "Auto bel"+hu_e+"p"+hu_e+"s";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Szerver";
texte["ungueltigerServer"] = "Invalid Server###";
texte["name"] = "N"+hu_e+"v";
texte["passwort"] = "Jelsz"+hu_o;
texte["speichern"] = "ment";
texte["loeschen"] = "t"+hu_o_dots+"r"+hu_o_dots+"l";
texte["msgUpdate"] = hu_U+"j script verzi"+hu_o+" "+hu_e+"rhet"+hu_o_double+" el. Telep"+hu_i+"ted?";
texte["zeigePasswoerter"] = "jelszavak mutat"+hu_a+"sa";
texte["info_valAutoLogin"] = "Add meg egyszer a felhaszn"+hu_a+"l"+hu_o+"i neved "+hu_e+"s jelszavaid, "+hu_e+"s minden fi"+hu_o+"kodba bejelentkezik a script, teh"+hu_a+"t k"+hu_e+"pes lesz "+hu_u_dots+"ltetni, betermelni, "+hu_o_dots+"nt"+hu_o_dots+"zni, etetni. A felugr"+hu_o+" ablakok enged"+hu_e+"lyez"+hu_e+"se sz"+hu_u_dots+"ks"+hu_e+"ges a funkci"+hu_o+" haszn"+hu_a+"lat"+hu_a+"hoz.";
texte["info_valGiess"] = "Meg"+hu_o_dots+"nt"+hu_o_dots+"zi a n"+hu_o_dots+"v"+hu_e+"nyeid "+hu_u_dots+"ltet"+hu_e+"s ut"+hu_a+"n, ha van "+hu_o_dots+"nz"+hu_o_dots+"z"+hu_o_double+"seg"+hu_e+"ded (pr"+hu_e+"mium funkci"+hu_o+").";
texte["info_valErnte"] = "Miut"+hu_a+"n megnyitottad a sz"+hu_a+"nt"+hu_o+"d, betakar"+hu_i+"tja a term"+hu_e+"st ha sz"+hu_u_dots+"ks"+hu_e+"ges.";
texte["info_valGiessNotw"] = "Shall the necessity of watering be displayed?";
texte["info_valErnteMsg"] = "Nem szeretn"+hu_e+"d, hogy a betakar"+hu_i+"t"+hu_a+"sr"+hu_o+"l "+hu_o_dots+"sszes"+hu_i+"t"+hu_e+"s jelenjen meg? Jel"+hu_o_dots+"ld be a n"+hu_e+"gyzetet!";
texte["info_valLeereFelderLimit"] = "Ha a bevezetlen ter"+hu_u_dots+"letek sz"+hu_a+"ma meghaladja ezt az "+hu_e+"rt"+hu_e+"ket, a sz"+hu_a+"nt"+hu_o+"d "+hu_u_dots+"resnek fogja mutatni.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "A plant is marked if its amount in your rack is falling below this value.";
texte["info_valMinRackE"] = "...same for the other products";
texte["info_valKauflimit"] = "Csak az itt megadott "+hu_e+"rt"+hu_e+"k erej"+hu_e+"ig v"+hu_a+"s"+hu_a+"rolhatsz a piaci aj"+hu_a+"nlatok k"+hu_o_dots+"z"+hu_u_dots+"l. A lehet"+hu_o_double+"s"+hu_e+"g megv"+hu_e+"d a t"+hu_u+"ls"+hu_a+"gosan magas piaci "+hu_a+"ron val"+hu_o+" v"+hu_a+"s"+hu_a+"rl"+hu_a+"st"+hu_o+"l.";
texte["info_valVerkaufLimit"] = "Ez szint"+hu_e+"n seg"+hu_i+"t, hogy ne j"+hu_a+"rj p"+hu_o+"rul: Csak az itt be"+hu_a+"ll"+hu_i+"tott hat"+hu_a+"r"+hu_e+"rt"+hu_e+"kek k"+hu_o_dots+"z"+hu_o_dots+"tt tehetsz ki "+hu_a+"rut a piacra, "+hu_i+"gy biztos nem pocs"+hu_e+"kolod el a term"+hu_e+"ked.";
texte["info_valJoinPreise"] = "Joins the price input fields at the market stand."
texte["info_valPrivNachr"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info_valNachr"] = "A J"+hu_a+"t"+hu_e+"k 7 nap ut"+hu_a+"n t"+hu_o_dots+"rli az "+hu_u_dots+"zeneteid. Itt megadhatod, hogy a r"+hu_e+"gebbi "+hu_u_dots+"zenetek k"+hu_u_dots+"z"+hu_u_dots+"l h"+hu_a+"nyat ments"+hu_u_dots+"nk el az arch"+hu_i+"vumba.";
texte["info_valQuicklinks"] = "Gyorslinkek mutat"+hu_a+"sa a piact"+hu_e+"ren";
texte["info_valNimmBeob"] = "Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"
texte["info_valStatistik"] = "<a href='http://www.mff.i24.cc/' target='_blank'>Statisztikai szerver haszn"+hu_a+"lata</a>. Szem"+hu_e+"lyes adatokat nem k"+hu_u_dots+"ld"+hu_u_dots+"nk!";
texte["info_valUpdate"] = "A szkript "+hu_u+"j verzi"+hu_o+"j"+hu_a+"nak keres"+hu_e+"se, "+hu_e+"s lehet"+hu_o_double+"s"+hu_e+"g a friss"+hu_i+"t"+hu_e+"sre";
texte["info_valDrag"] = "Allow moving windows by clicking the upper left corner.";
texte["info_valHotkeys"] = "Use hotkeys to quicker navigate the game. See the help.";
texte["info_valGlobaltimeWindmill"] = "Shall the time of the windmill be included to the global time?";
//help
texte["zeigeFehlendeProdukte"] = "Show product shortage";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords
texte["waehrung"] = "kT";
texte["coins"] = hu_E+"rme"
texte["msg1a"] = "Piact"+hu_e+"r";
texte["msg1b"] = /(.*) a piact.ren\s*(\d+) darabot v.s.rolt t.led a (.*?) term.kb.l\s*<br>\s*(.*?) kT .sszeg.rt\./;
texte["msg2a"] = "Egy szerz"+hu_o_double+"d"+hu_e+"st elfogadtak";
texte["msg2b"] = /(.*) al..rta a szerz.d.sed!<br>\s*<br>\s*Az al.bbi term.kek ker.ltek .rt.kes.t.sre:\s*<br>([\S\s]*)\s*<br>\s*A szerz.d.sben szerepl. (.*?) kT .sszeget j.v..r.sra ker.lt a sz.ml.don\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "nl": { // translation thanks to DrNapoleon, DrBOB101, JanHans and Stampy
texte["berater"] = "Adviseur";
texte["autologin1"] = "Bepaal actieve sessies. %1% seconden wachten A.U.B.<br>...";
texte["autologin2"] = "Alle accounts zijn ingelogd";
texte["umloggen"] = "Login";
texte["marktplatz"] = "Marktplaats";
texte["statistik"] = "Statistieken";
texte["geheZuSeite"] = "Ga naar pagina";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = "Overzicht";
texte["optionen"] = "Opties";
texte["profitTable"] = "Winst per akker per dag";
texte["farmpediaUrl"] = "http://www.farmpedia.coolix.com/";
texte["zurFarmpedia"] = "Ga naar Farmpedia";
// market
texte["zumIdMarkt"] = "Ga naar de markt van xx";
texte["zumSGH"] = "Ga naar de winkel";
texte["markt1"] = "Actuele aanbod";
texte["markt2"] = "voor";
texte["markt3"] = "boven de NPC-Prijs";
texte["markt4"] = "boven";
texte["kauf"] = "Kopen";
texte["preis"] = "Prijs";
texte["preise"] = "Prijzen";
texte["stueckpreis"] = "Stukprijs";
texte["sorte1"] = "Planten";
texte["sorte2"] = "Decoraties";
texte["sorte3"] = "Dierlijke-, gefabriceerde producten";
texte["sorte4"] = "Alles tonen";
texte["produkt"] = "Product";
texte["bestand"] = "Voorraad";
texte["hofpreis"] = "NPC-Prijs";
texte["beobachtet"] = "Gevonden";
texte["marktpreis"] = "Marktprijs";
texte["abzglGebuehr"] = "minus kosten";
texte["nimmPreise"] = "Neem gevonden prijs over";
texte["lagerwert"] = "Waarde voorraad:";
// main
texte["ausbauenFuer"] = "Upgraden&nbsp;kost:&nbsp;%1%";
texte["main1"] = "Leeg akker!";
texte["heute"] = "vandaag";
texte["day1"] = "morgen ";
texte["day2"] = "overmorgen ";
texte["um"] = "om";
texte["seit"] = "sinds";
texte["uhr"] = "uur";
texte["level"] = "Level";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Klaar";
texte["spielerSuchen"] = "Zoek Speler";
texte["relogin"] = "Sessie eindigt binnenkort.<br>Opnieuw inloggen in xx sec.";
texte["adEnds"] = "Reclame eindigt vandaag";
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = "Bericht schrijven";
texte["vorlage"] = "Opslaan als sjabloon";
texte["zurNachricht"] = "naar bericht";
texte["vorigeNachricht"] = "vorig bericht";
texte["naechsteNachricht"] = "volgend bericht";
texte["formatiereZahlen"] = "Format numbers";
// contracts
texte["vertragSchicken"] = "Contract versturen";
texte["erhalteneVertraege"] = "Ontvangen contracten";
texte["gesendeteVertraege"] = "Verzonden contracten";
texte["alte"] = "Oude";
// system messages
texte["zeigeLog"] = "Toon Log";
texte["alleLesen"] = "Alles lezen";
texte["menge"] = "Aantal";
texte["umsatz"] = "Omzet";
texte["gewinn"] = "Winst";
texte["filtern"] = "op xx filteren";
texte["summiere"] = "Overzicht";
texte["filter"] = "Filter";
texte["kaeufer"] = "Koper";
texte["waren"] = "Product";
// score history
texte["tag"] = "dag";
texte["punkte"] = "Punten";
texte["imLager"] = "op voorraad";
texte["lagerFehlt"] = "Geen voorraad voor xx!!!";
texte["lagerNiedrig"] = "Te weinig voorraad van xx!!!";
// overview
texte["farmi"] = "Klanten";
texte["produkte"] = "Producten";
texte["geld"] = "Geld";
texte["wert"] = "Waarde";
texte["fehlt"] = "Mist";
texte["ertrag"] = "opbrengst";
texte["produktion"] = "Productie";
texte["total"] = "Totaal";
texte["farm"] = "Boerderij";
texte["unbeschaeftigt"] = "nutteloos !!";
texte["dauer"] = "Duur";
texte["futter"] = "Feed";
// options panel
texte["set_CacheReset"] = "Cache reset";
texte["set_ScriptHomepage"] = "Script homepage";
texte["set_valAutoLogin"] = "Automatisch inloggen";
texte["set_valGiess"] = "Automatisch water geven";
texte["set_valErnte"] = "Automatisch oogsten";
texte["set_valGiessNotw"] = "Bewatering nodig";
texte["set_valErnteMsg"] = "Oogst melding klikken";
texte["set_valLeereFelderLimit"] = "Lege velden";
texte["set_valMoveAnimals"] = "Beweeg dieren";
texte["set_valMinRackV"] = "Minimal rackamount planten";
texte["set_valMinRackE"] = "Minimal rackamount producten";
texte["set_valKauflimit"] = "Bovenste koop-grens";
texte["set_valVerkaufLimit"] = "Verkoop-grenzen";
texte["set_valJoinPreise"] = "Enkel prijsveld";
texte["set_valPrivNachr"] = "Aantal prive berichten bewaren";
texte["set_valNachr"] = "Aantal gemarkeerde marktberichten";
texte["set_valQuicklinks"] = "Quick-links op de markt tonen";
texte["set_highlight"] = "Highlight gebruiker op markt";
texte["set_valNimmBeob"] = "Gebruik gevonden prijzen";
texte["set_valStatistik"] = "Verstuur Statistieken";
texte["set_valUpdate"] = "Update";
texte["set_valDrag"] = "Slepen";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market Place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
texte["set_valGlobaltimeWindmill"] = "Integreer windmolen";
texte["confirm_NimmBeob"] = "De zelf-ingevoerde prijzen gaan verloren";
texte["confirm_CacheReset"] = "Alle informatie over je zones gaat verloren";
texte["autoLogin"] = "Automatisch inloggen";
texte["accountAktiv"] = "Account activeren";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Foute server";
texte["name"] = "Naam";
texte["passwort"] = "Paswoord";
texte["speichern"] = "opslaan";
texte["loeschen"] = "verwijderen";
texte["msgUpdate"] = "Wil je de nieuwe script versie installeren?";
texte["zeigePasswoerter"] = "Toon wachtwoorden";
texte["info_valAutoLogin"] = "Als de gebruikersnaam en paswoord ingevoerd zijn (zie onder), worden de accounts automatisch ingelogd";
texte["info_valGiess"] = "Automatisch akkers water geven";
texte["info_valErnte"] = "Indien nodig wordt er meteen geoogst als de akker geopend wordt";
texte["info_valGiessNotw"] = "Behoefte van bewatering tonen?";
texte["info_valErnteMsg"] = "De oogst-melding wordt automatisch weg geklikt";
texte["info_valLeereFelderLimit"] = "Geeft aan hoeveel lege velden een akker mag hebben voordat deze als nutteloos wordt beschouwd";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "A plant is marked if its amount in your rack is falling below this value.";
texte["info_valMinRackE"] = "...same for the other products";
texte["info_valKauflimit"] = "Koop-bescherming voor de markt: Je kunt op de markt alleen zaken kopen waarvan de prijs maximaal het percentage van de huidige prijs is";
texte["info_valVerkaufLimit"] = "Je verkoop wordt beschermd zodat je niet te goedkoop, of te duur, kunt verkopen";
texte["info_valJoinPreise"] = "Prijs invoer velden op markt samenvoegen.";
texte["info_valPrivNachr"] = "Je laatste prive berichten worden bewaard zodat je een bericht geschiedenis van een contact kunt zien";
texte["info_valNachr"] = "Geef aan hoeveel berichten er standaard blijven bestaan. Deze worden dan niet gewist na 7 dagen";
texte["info_valQuicklinks"] = "Quick-link blok tonen bij de markt";
texte["info_valNimmBeob"] = "Marktprijzen worden opgeslagen terwijl je door de markt heen klikt. De gemiddelde prijs staat in de prijslijst. Moeten de standaard prijzen overschreven worden?";
texte["info_valStatistik"] = "Ondersteun de <a href='http://www.mff.i24.cc/'>Statistiek-Server</a>. Er worden geen privé gegevens verstuurd!";
texte["info_valUpdate"] = "Er wordt gecontroleerd of er een nieuwe script versie beschikbaar is";
texte["info_valDrag"] = "Allow moving windows by clicking the upper left corner.";
texte["info_valHotkeys"] = "Use hotkeys to quicker navigate the game. See the help.";
texte["info_valGlobaltimeWindmill"] = "Moet de tijd van de windmolen worden opgenomen in de algemene tijd?";
//help
texte["zeigeFehlendeProdukte"] = "Show product shortage";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords
texte["waehrung"] = "aD";
texte["coins"] = "Coins"
texte["msg1a"] = "Marktplaats";
texte["msg1b"] = /(.*) heeft op de marktplaats\s*(\d+)\s*x\s*(.*?) van jou gekocht voor (.*?)\s*aD\./;
texte["msg2a"] = "Een contract is geaccepteerd";
texte["msg2b"] = /(.*) heeft een contract geaccepteerd!<br><br>\s*De volgende producten zijn verkocht:<br>([\S\s]*)\s*<br>\s*Het bedrag (.*?) aD is bijgeschreven op je rekening\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "pl": { // translation thanks to robert197648 and Bonizaur
var pl_a = "\u0105";
var pl_c = "\u0107";
var pl_e = "\u0119";
var pl_l = "\u0142";
var pl_n = "\u0144";
var pl_o = "\u00F3";
var pl_s = "\u015B";
var pl_S = "\u015A";
var pl_z = "\u017C";
var pl_x = "\u017A";
texte["berater"] = "Asystent";
texte["autologin1"] = "Sprawdzenie aktywnych sesji. Prosz"+pl_e+" odczeka"+pl_c+" %1% sekund<br>...";
texte["autologin2"] = "Wszystkie konta zalogowane.";
texte["umloggen"] = "Login";
texte["marktplatz"] = "Rynek";
texte["statistik"] = "Statystyki";
texte["geheZuSeite"] = "Przejd"+pl_z+" do strony";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = "Przegl"+pl_a+"d";
texte["optionen"] = "Opcje";
texte["profitTable"] = "Kalkulacja zysk"+pl_o+"w dziennych";
texte["farmpediaUrl"] = "";
texte["zurFarmpedia"] = "chwilowo opcja wylaczona";
// market
texte["zumIdMarkt"] = "Id"+pl_x+" na targ po xx";
texte["zumSGH"] = "Id"+pl_x+" do sklepu";
texte["markt1"] = "Aktualne promocje";
texte["markt2"] = "Suma prod. powy"+pl_z+"ej:";
texte["markt3"] = "wi"+pl_e+"cej ni"+pl_z+" NPC";
texte["markt4"] = "wi"+pl_e+"cej";
texte["kauf"] = "Kupuj";
texte["preis"] = "Cena";
texte["preise"] = "Ceny";
texte["stueckpreis"] = "Cena jedn.";
texte["sorte1"] = "Ro"+pl_s+"liny";
texte["sorte2"] = "Dekoracje";
texte["sorte3"] = "Prod. zwierz"+pl_e+"ce";
texte["sorte4"] = "Wszystko";
texte["produkt"] = "Produkt";
texte["bestand"] = "Zapasy";
texte["hofpreis"] = "Sklepowa";
texte["beobachtet"] = pl_S+"rednia rynkowa";
texte["marktpreis"] = "Na&nbsp;targu&nbsp;po";
texte["abzglGebuehr"] = "-10%";
texte["nimmPreise"] = "Przyjmij "+pl_s+"redni"+pl_a+" rynkow"+pl_a;
texte["lagerwert"] = "Warto"+pl_s+pl_c+"&nbsp;towaru";
// main
texte["ausbauenFuer"] = "Rozbudowa&nbsp;za&nbsp;%1%";
texte["main1"] = "Puste!";
texte["heute"] = "dzisiaj";
texte["day1"] = "Jutro";
texte["day2"] = "Pojutrze";
texte["um"] = "o";
texte["seit"] = "od";
texte["uhr"] = "h";
texte["level"] = "Poziom";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Gotowe";
texte["spielerSuchen"] = "Szukaj gracza";
texte["relogin"] = "Zbli"+pl_z+"a si"+pl_e+" koniec sesji.<br>Nowe logowanie za xx sek.";
texte["adEnds"] = "Kampania reklamowa ko"+pl_n+"czy si"+pl_e+" dzi"+pl_s;
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = "Wy"+pl_s+"lij wiadomo"+pl_s+pl_c;
texte["vorlage"] = "Zapisz jako szablon";
texte["zurNachricht"] = "do wiadomo"+pl_s+"ci";
texte["vorigeNachricht"] = "Nast"+pl_e+"pna wiadomo"+pl_s+pl_c;
texte["naechsteNachricht"] = "Poprzednia wiadomo"+pl_s+pl_c;
texte["formatiereZahlen"] = "Format liczb";
// contracts
texte["vertragSchicken"] = "Wys"+pl_l+"a"+pl_c+" umow"+pl_e;
texte["erhalteneVertraege"] = "Umowy otrzymane";
texte["gesendeteVertraege"] = "Umowy wys"+pl_l+"ane";
texte["alte"] = "Poprzednie";
// system messages
texte["zeigeLog"] = "poka"+pl_z+" log";
texte["alleLesen"] = "Wszystkie przeczytane";
texte["menge"] = "Ilo"+pl_s+pl_c;
texte["umsatz"] = "Twoja sprzeda"+pl_z;
texte["gewinn"] = "Warunki rynkowe";
texte["filtern"] = "Filtrowanie xx";
texte["summiere"] = "Analiza obrot"+pl_o+"w";
texte["filter"] = "Filtr";
texte["kaeufer"] = "Kupcy";
texte["waren"] = "Towary";
// score history
texte["tag"] = "Dzie"+pl_n;
texte["punkte"] = "Punkt"+pl_o+"w";
texte["imLager"] = "w magazynie";
texte["lagerFehlt"] = "Brakuje produktu xx!!!";
texte["lagerNiedrig"] = "Ma"+pl_l+"o produktu xx";
// overview
texte["farmi"] = "Klient";
texte["produkte"] = "Produkty";
texte["geld"] = "Oferuje";
texte["wert"] = "Warto"+pl_s+pl_c;
texte["fehlt"] = "Brakuje";
texte["ertrag"] = "Plon";
texte["produktion"] = "Produkcja";
texte["total"] = "Og"+pl_o+pl_l+"em";
texte["farm"] = "Gospodarstwo";
texte["unbeschaeftigt"] = "Le"+pl_z+"y od"+pl_l+"ogiem!!";
texte["dauer"] = "Czas prod.";
texte["futter"] = "Karmić";
// options panel
texte["set_CacheReset"] = "Cache reset";
texte["set_ScriptHomepage"] = "Forum wsparcie";
texte["set_valAutoLogin"] = "Automatyczne logowanie";
texte["set_valGiess"] = "Automatyczne podlewanie";
texte["set_valErnte"] = "Automatyczne zbiory";
texte["set_valGiessNotw"] = "Info o podlewaniu";
texte["set_valErnteMsg"] = "Autozamykanie zbior"+pl_o+"w";
texte["set_valLeereFelderLimit"] = "Puste miejsca";
texte["set_valMoveAnimals"] = "Ruchome zwierzaki";
texte["set_valMinRackV"] = "Minimalna ilo"+pl_s+pl_c+" ro"+pl_s+"lin w regale";
texte["set_valMinRackE"] = "Minimalna ilo"+pl_s+pl_c+" produkt"+pl_o+"w w regale";
texte["set_valKauflimit"] = "G"+pl_o+"rny limit zakupu";
texte["set_valVerkaufLimit"] = "Limity sprzeda"+pl_z+"y";
texte["set_valJoinPreise"] = "Upro"+pl_s+pl_c+" sprzeda"+pl_z;
texte["set_valPrivNachr"] = "Ilo"+pl_s+pl_c+" zachowanych prywatnych wiadomo"+pl_s+"ci";
texte["set_valNachr"] = "Ilo"+pl_s+pl_c+" zachowanych rynkowych wiadomo"+pl_s+"ci";
texte["set_valQuicklinks"] = "Szybki przegl"+pl_a+"d rynku (ikony)";
texte["set_highlight"] = "Pod"+pl_s+"wietl farmera na targu";
texte["set_valNimmBeob"] = "U"+pl_z+"yj "+pl_s+"rednich cen";
texte["set_valStatistik"] = "Send statistics";
texte["set_valUpdate"] = "Aktualizacja";
texte["set_valDrag"] = "Przesuwanie";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"poprzednia wiadomo"+pl_s+pl_c+", pole, ...","nextPage":"nast"+pl_e+"pna wiadomo"+pl_s+pl_c+", pole, ...","farm1":"1-sza farma","farm2":"2-ga farma","farm3":"3-cia farma","guild":"Klub","city1":"Pierwsze miasto","city2":"Drugie miasto","farmilog":"Farmi-Log","help":"Pomoc","market":"Targ","messages":"Wiadomo"+pl_s+"ci","options":"Opcje","profit":"Kalkulator zysk"+pl_o+"w","sgh":"Sklep z nasionami","overview":"Przegl"+pl_a+"d","contract":"Umowy","systemmessage":"wiadomo"+pl_s+"ci systemowe"};
texte["set_valGlobaltimeWindmill"] = "Zintegruj m"+pl_l+"yn";
texte["confirm_NimmBeob"] = "Czy przyj"+pl_a+pl_c+" "+pl_s+"redni"+pl_a+" rynkow"+pl_a+" jako ceny na targu?";
texte["confirm_CacheReset"] = "Usuwanie wszystkich danych zapisanych przez ten skrypt...";
texte["autoLogin"] = "Automatyczne logowanie";
texte["accountAktiv"] = "Konto aktywne";
texte["server"] = "Serwer";
texte["ungueltigerServer"] = "B"+pl_l+pl_e+"dny serwer";
texte["name"] = "Login";
texte["passwort"] = "Has"+pl_l+"o";
texte["speichern"] = "Zapisz";
texte["loeschen"] = "Usu"+pl_n;
texte["msgUpdate"] = "Jest nowa wersja skryptu 'Asystent'. Czy chcesz j"+pl_a+" zainstalowa"+pl_c+"?";
texte["zeigePasswoerter"] = "Poka"+pl_z+" has"+pl_l+"o";
texte["info_valAutoLogin"] = "Po wprowadzeniu nazwy u"+pl_z+"ytkownika i has"+pl_l+"a nast"+pl_e+"puje automatyczne logowanie. Pozwala to zachowa"+pl_c+" ci"+pl_a+"g"+pl_l+"o"+pl_s+pl_c+" grania. Przy wielu kontach musi by"+pl_c+" dozwolone wyskakiwanie okienek.";
texte["info_valGiess"] = "Ro"+pl_s+"liny b"+pl_e+"d"+pl_a+" automatycznie podlewane (je"+pl_s+"li masz konto Premium).";
texte["info_valErnte"] = "Po wej"+pl_s+"ciu na pole wszystkie plony zostan"+pl_a+" automatycznie zebrane.";
texte["info_valGiessNotw"] = "Czy ma by"+pl_c+" wy"+pl_s+"wietlana ikona informuj"+pl_a+"ca o niepodlanym polu?";
texte["info_valErnteMsg"] = "Zaznacz je"+pl_s+"li denerwuje ci"+pl_e+" wyskakuj"+pl_a+"ca plansza z ilo"+pl_s+"ci"+pl_a+" zebranych plon"+pl_o+"w.";
texte["info_valLeereFelderLimit"] = "Je"+pl_s+"li ilo"+pl_s+pl_c+" pustych miejsc przekroczy t"+pl_a+" warto"+pl_s+pl_c+", to pole b"+pl_e+"dzie oznaczone jako puste.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "Ro"+pl_s+"ina zostanie zaznaczona, gdy jej ilo"+pl_s+pl_c+" w regale spadnie poni"+pl_z+"ej tego poziomu";
texte["info_valMinRackE"] = "...to samo dla produkt"+pl_o+"w zwierz"+pl_e+"cych";
texte["info_valKauflimit"] = "Zaznaczasz do jakiej granicy chcesz kupowa"+pl_c+" na targu. To chroni przed zakupem zbyt drogich produkt"+pl_o+"w na targu.";
texte["info_valVerkaufLimit"] = "Zakres w jakim twoja sprzeda"+pl_z+" b"+pl_e+"dzie chroniona, aby"+pl_s+" nie sprzeda"+pl_l+" swoich plon"+pl_o+"w zbyt tanio lub za drogo..";
texte["info_valJoinPreise"] = "Po"+pl_l+pl_a+"czy w jedno pola ceny na twoim straganie (u"+pl_l+"atwia wprowadzanie cen).";
texte["info_valPrivNachr"] = "Liczba prywatnych wiadomo"+pl_s+"ci, kt"+pl_o+"re zostan"+pl_a+" zachowane, aby umo"+pl_z+"liwi"+pl_c+" przegl"+pl_a+"d historii danej umowy";
texte["info_valNachr"] = "Zaznacz ile wiadomo"+pl_s+"ci ma by"+pl_c+" przechowywanych, nawet je"+pl_s+"li s"+pl_a+" starsze ni"+pl_z+" maksymalnie 7 dni.";
texte["info_valQuicklinks"] = "Pokazuje wysuwany pasek z ikonami dost"+pl_e+"pnych towar"+pl_o+"w (z prawej)";
texte["info_valNimmBeob"] = "Podczas przegl"+pl_a+"dania cen na targu s"+pl_a+" one notowane i u"+pl_s+"redniona cena jest wykazywana w tabeli cen. Czy automatycznie ma ona by"+pl_c+" przyjmowana jako rynkowa?";
texte["info_valStatistik"] = "";
texte["info_valUpdate"] = "Automatycznie sprawdza czy jest nowsza wersja tego skryptu.";
texte["info_valDrag"] = "Pozwala na przesuwanie okien po klikni"+pl_e+"ciu na lewy g"+pl_o+"rny r"+pl_o+"g.";
texte["info_valHotkeys"] = "U"+pl_z+"ywanie klawiszy pozwala na szybsze poruszanie si"+pl_e+" po grze.";
texte["info_valGlobaltimeWindmill"] = "Czy czas mielenia ma by"+pl_c+" doliczany do og"+pl_o+"lnego czasu?";
//help
texte["zeigeFehlendeProdukte"] = "Pokaz niedobur towaru";
texte["hilfe"][0] = "Oto skr"+pl_o+"cona instrukcja funkcji dost"+pl_e+"pnych w Asystencie. Nie s"+pl_a+" tu opisane wszystkie, gdy"+pl_z+" skrypt stale si"+pl_e+" rozwija. Aby odkry"+pl_c+" niekt"+pl_o+"re wystarczy najecha"+pl_c+" na nie myszk"+pl_a+". <br>Na dole strony wida"+pl_c+" przycisk do <a href=\""+scriptUrl+"\" target=\"_blank\">strony skryptu</a>.<br> Obok niego jest przycisk opcji, mo"+pl_z+"esz tam dopasowa"+pl_c+" skrypt do swoicj wymaga"+pl_n+".<br> Generalnie skrypt wie tylko tyle ile zobaczy i ustalisz, wi"+pl_e+"c w razie jakich"+pl_s+" problem"+pl_o+"w radz"+pl_e+" tam zajrze"+pl_c;
texte["hilfe"]["Pola"] = "Po wej"+pl_s+"ciu na pole skrypt zapisuje co jest produkowane, czas produkcji oraz czy ro"+pl_s+"liny s"+pl_a+" podlane. Informacje s"+pl_a+" p"+pl_o+pl_x+"niej wy"+pl_s+"wietlane w widoku farmy. Ka"+pl_z+"de pole ma w"+pl_l+"asny licznik czasu, odliczaj"+pl_a+"cy czas do zbioru.<br> Je"+pl_s+"li masz w"+pl_l+pl_a+"czon"+pl_a+" pomoc w sianiu to jest ona dost"+pl_e+"pna pod ikonk"+pl_a+" kwiatka. Na g"+pl_o+"rze pola s"+pl_a+" umieszczone strza"+pl_l+"ki pozwalaj"+pl_a+"ce na przemieszczanie si"+pl_e+" mi"+pl_e+"dzy polami";
texte["hilfe"]["Przegl"+pl_a+"d"] = "Klikni"+pl_e+"cie na "+pl_s+"wink"+pl_e+" na g"+pl_o+"rze ekranu wy"+pl_s+"wietla przegl"+pl_a+"d informacji o ca"+pl_l+"ej farmie. Opisane jest tu ka"+pl_z+"de pole, jego obecny stan (produkcja, punkty oraz czas zako"+pl_n+"czenia). Podawana jest te"+pl_z+" suma wszystkich zbior"+pl_o+"w.<br> Poni"+pl_z+"ej wy"+pl_s+"wietlany jest spis brakuj"+pl_a+"cych produkt"+pl_o+"w "+pl_z+pl_a+"danych przez klient"+pl_o+"w. Za"+pl_s+" ni"+pl_z+"ej szczeg"+pl_o+pl_l+"owe zestawienie zam"+pl_o+"wie"+pl_n+", w kt"+pl_o+"rym wyliczone s"+pl_a+" "+pl_z+pl_a+"dane produkty (braki oznaczone na czerwono), sugerowana cena, warto"+pl_s+pl_c+" rynkowa i nasz zysk.<br> Klikaj"+pl_a+"c na dany produkt (w zestawieniu brak"+pl_o+"w lub indywidualnym) przeniesiesz si"+pl_e+" prosto na targ, aby"+pl_s+" m"+pl_o+"g"+pl_l+" go kupi"+pl_c+".<br> Mo"+pl_z+"esz te"+pl_z+" przej"+pl_s+pl_c+" do wybranego pola lub klienta po klikaj"+pl_a+"c na nie.";
texte["hilfe"]["Niebieski pasek"] = "Zdobywane punkty s"+pl_a+" codziennie zliczane, a ich ilo"+pl_s+pl_c+" pokazywana na niebieskim pasku u do"+pl_l+"u ekranu. Czarna kreska oddziela poziom poprzedni i bie"+pl_z+pl_a+"cy, kreski bia"+pl_l+"e oddzielaj"+pl_a+" dni, za"+pl_s+" czerwona oznacza niedziel"+pl_e+".<br> Klikni"+pl_e+"cie na ten pasek wy"+pl_s+"wietli tabel"+pl_e+" zdobywanych punkt"+pl_o+"w oraz braki w produktach";
texte["hilfe"]["Rega"+pl_l] = "Przedstawione tu informacje zosta"+pl_l+"y rozszerzone o ceny oraz warto"+pl_s+pl_c+" towaru. Kolorem zaznaczone s"+pl_a+" towary, kt"+pl_o+"rych jest za ma"+pl_l+"o do zrealizowania zam"+pl_o+"wienia klient"+pl_o+"w.";
texte["hilfe"]["Kalkulator zysk"+pl_o+"w"] = "U do"+pl_l+"u planszy jest znaczek <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px; height: 15px;\">. Klikni"+pl_e+"cie na niego otwiera tabel"+pl_e+" zawieraj"+pl_a+"c"+pl_a+" wyliczony czas zbior"+pl_o+"w, ilo"+pl_s+pl_c+" zdobywanych punkt"+pl_o+"w oraz przewidywane zyski. Klikni"+pl_e+"cie na gwiazdki zwi"+pl_e+"ksza poziom dla danego towaru, za"+pl_s+" na nag"+pl_l+pl_o+"wki kolum - sortuje dane wzgl"+pl_e+"dem danej kolumny";
texte["hilfe"]["Klienci"] = "Dymki nad klientami zosta"+pl_l+"y rozszerzone o kalkulacj"+pl_e+" czy zam"+pl_o+"wienie jest op"+pl_l+"acalne. Towary, kt"+pl_o+"rych jest za ma"+pl_l+"o s"+pl_a+" oznaczone czerwon"+pl_a+" ramk"+pl_a+".<br> Na niebieskim pasku z prawej mo"+pl_z+"esz ustali"+pl_c+" poziom op"+pl_l+"acalno"+pl_s+pl_c+"i poni"+pl_z+"ej kt"+pl_o+"rego klienci s"+pl_a+" odsy"+pl_l+"ani. <br>Tabela pozwala si"+pl_e+" zorientowa"+pl_c+" jakie zyski osi"+pl_a+"gni"+pl_e+"to z handlu z klientami";
texte["hilfe"]["Hotkeys"] = "Mo"+pl_z+"esz szybko przenosi"+pl_c+" si"+pl_e+" przy u"+pl_z+"yciu klawisza <i>Alt</i>+... zobacz w Opcjach!";
texte["hilfe"]["Targowisko"] = "Na targu jeste"+pl_s+" \"chroniony\", co znaczy, "+pl_z+"e nie mo"+pl_z+"esz kupi"+pl_c+" towaru dro"+pl_z+"ej ni"+pl_z+" w sklepie lub poza ustalonym w opcjach przedzia"+pl_l+"em. Je"+pl_s+"li w"+pl_l+pl_a+"czony jest 'szybki przegl"+pl_a+"d rynku', to mo"+pl_z+"esz przej"+pl_s+pl_c+" do wybranego towaru przez wysuwane boczne okno.<br> Z lewej u g"+pl_o+"ry s"+pl_a+" strza"+pl_l+"ki pozwalaj"+pl_a+"ce zmienia"+pl_c+" towar oraz wy"+pl_s+"wietlana jest ilo"+pl_s+pl_c+" danego towaru.<br> Na dole za"+pl_s+" jest bardzo wa"+pl_z+"ny przycisk: CENY.<br> Zawiera on zestawienie ilo"+pl_s+"ci towarów oraz średnich cen po jakich jest on wystawiany oraz ustalanej przez ciebie. Ceny te s"+pl_a+" wykorzystywane w wielu miejscach, wi"+pl_e+"c dbaj by by"+pl_l+"y aktualne.\" "+pl_S+"rednia rynkowa\" jest ustalana, gdy odwiedzasz stron"+pl_e+" danego towaru. Na twoim straganie wy"+pl_s+"wietlane jest kilka przydatnych informacji, zapami"+pl_e+"tywana jest te"+pl_z+" twoja ostatnia oferta.";
texte["hilfe"]["Wiadomo"+pl_s+"ci"] = "Twoja sprzeda"+pl_z+" jest monitorowana i wy"+pl_s+"wietlana od razu, wi"+pl_e+"c nie trzeba klika"+pl_c+" dwa razy.<br> Przydatny na pewno b"+pl_e+"dzie przycisk \"Wszystkie przeczytane\" pozwalaj"+pl_a+"cy za jednym klikni"+pl_e+"ciem oznaczy"+pl_c+" wszystkie wiadomo"+pl_s+"ci. <br> Za"+pl_s+" przycisk \"Log\" zawiera zestawienie zapami"+pl_e+"tanych wiadomo"+pl_s+"ci oraz analizy sprzeda"+pl_z+"y towar"+pl_o+"w na targu. <br>Twoje wiadomo"+pl_s+"ci prywatne s"+pl_a+" r"+pl_o+"wnie"+pl_z+" zapami"+pl_e+"tywane, wi"+pl_e+"c znacznie "+pl_l+"atiwej obs"+pl_l+"uguje si"+pl_e+" umowy.";
texte["hilfe"]["Umowy"] = "S"+pl_a+" r"+pl_o+"wnie"+pl_z+" zapami"+pl_e+"tywane. Podczas tworzenia umowy w bocznym oknie wy"+pl_s+"wietlana jest wiadomo"+pl_s+pl_c+" "+pl_x+"r"+pl_o+"d"+pl_l+"owa, aby "+pl_l+"atwiej by"+pl_l+"o skompletowa"+pl_c+" towar. Na bie"+pl_z+pl_a+"co pokazywana jest warto"+pl_s+pl_c+" wysy"+pl_l+"anego towaru. Mo"+pl_z+"na wysy"+pl_l+"a"+pl_c+" wiele razy t"+pl_a+" sam"+pl_a+" umow"+pl_e+".";
texte["hilfe"]["Obs"+pl_l+"uga kont"] = "Mo"+pl_z+"esz zapisa"+pl_c+" wszystkie swoje konta w opcjach. Pozwala to na "+pl_l+"atwe logowanie przy pomocy przycisk"+pl_o+"w wy"+pl_s+"wietlanych na stronie startowej. Dzi"+pl_e+"ki temu mo"+pl_z+"esz prze"+pl_l+pl_a+"cza"+pl_c+" si"+pl_e+" mi"+pl_e+"dzy kontami na tym samym serwerze.";
//Systemwords
texte["waehrung"] = "ft";
texte["coins"] = "Monety"
texte["msg1a"] = "Targ";
texte["msg1b"] = /(.*) zakupi. od Ciebie na targu\s*(\d+)x (.*?) za kwot.\s*<br>\s*(.*?) ft\./;
texte["msg2a"] = "Umowa zosta"+pl_l+"a podpisana";
texte["msg2b"] = /(.*) podpisa. wys.an. mu przez Ciebie umow.!<br>\s*<br>\s*Sprzeda.e. nast.puj.ce produkty:\s*<br>([\S\s]*)\s*<br>\s*Nale.no.. za produkty w wysoko.ci (.*?) ft zosta.a przelana na Twoje konto\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
case "tr": { // translation thanks to Cilek Kocak
var tr_g = "\u011F";
var tr_G = "\u011E";
var tr_s = "\u015F";
var tr_S = "\u015E";
var tr_c = "\u00E7";
var tr_C = "\u00C7";
var tr_dotless_i = "\u0131";
var tr_dotted_I = "\u0130";
var tr_dotted_o = "\u00F6";
texte["berater"] = "Adviser";
texte["autologin1"] = "Aktif oturumlar kontrol ediliyor.  L"+ue+"tfen %1%sn bekleyiniz!<br>...";
texte["autologin2"] = "B"+ue+"t"+ue+"n hesaplardan girildi.";
texte["umloggen"] = "Giri"+tr_s;
texte["marktplatz"] = "Pazar";
texte["statistik"] = tr_dotted_I+"statistikler";
texte["geheZuSeite"] = "Sayfaya git";
texte["geheZuPlatz"] = "Go to rank";
texte["uebersicht"] = oe+"zet";
texte["optionen"] = "Se"+tr_c+"enekler";
texte["profitTable"] = "G"+ue+"nl"+ue+"k alan kar"+tr_dotless_i;
texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
texte["zurFarmpedia"] = "Zur FarmPedia";
// market
texte["zumIdMarkt"] = "go to market of xx";
texte["zumSGH"] = "go to shop";
texte["markt1"] = "G"+ue+"ncel teklifler";
texte["markt2"] = "y"+ue+"ksek";
texte["markt3"] = "NPC-fiyat"+tr_dotless_i+"n"+tr_dotless_i+"n "+ue+"st"+ue+"nde";
texte["markt4"] = "fazla";
texte["kauf"] = "Buy";
texte["preis"] = "Fiyat";
texte["preise"] = "Fiyatlar";
texte["stueckpreis"] = "Birim Fiyat"+tr_dotless_i;
texte["sorte1"] = "Bitkiler";
texte["sorte2"] = "S"+ue+"s "+ue+"r"+ue+"nleri";
texte["sorte3"] = tr_dotted_I+tr_s+"lenmi"+tr_s+" "+ue+"r"+ue+"nler";
texte["sorte4"] = "Hepsi";
texte["produkt"] = Ue+"r"+ue+"n";
texte["bestand"] = "Stok";
texte["hofpreis"] = "NPC-fiyat"+tr_dotless_i;
texte["beobachtet"] = "G"+oe+"zlenen";
texte["marktpreis"] = "Pazar&nbsp;Fiyat"+tr_dotless_i;
texte["abzglGebuehr"] = "Kesinti sonras"+tr_dotless_i;
texte["nimmPreise"] = "G"+oe+"zlenen fiyatlar"+tr_dotless_i+" kullan";
texte["lagerwert"] = "Stok de"+tr_g+"eri";
// main
texte["ausbauenFuer"] = "y"+ue+"kseltme&nbsp;"+ue+"creti&nbsp;%1%";
texte["main1"] = "Bo"+tr_s+" alan!";
texte["heute"] = "Bug"+ue+"n";
texte["day1"] = "Yar"+tr_dotless_i+"n";
texte["day2"] = "Ertesi g"+ue+"n";
texte["um"] = "";
texte["seit"] = "since";
texte["uhr"] = "saat";
texte["level"] = "Seviye";
texte["levelBenoetigt"] = "Level&nbsp;%1%&nbsp;needed";
texte["fertig"] = "Hazir";
texte["spielerSuchen"] = "Search player";
texte["relogin"] = "Session ends soon.<br>New login in xx sec.";
texte["adEnds"] = "Advertising ends today";
texte["upjersWerbung"] = "Upjers-Advertising";
// messages
texte["nachrichtSchreiben"] = "mesaj yaz";
texte["vorlage"] = "Save as template";
texte["zurNachricht"] = "mesaja git";
texte["vorigeNachricht"] = oe+"nceki mesaj";
texte["naechsteNachricht"] = "sonraki mesaj";
texte["formatiereZahlen"] = "Format numbers";
// contracts
texte["vertragSchicken"] = "kontrat yolla";
texte["erhalteneVertraege"] = "Al"+tr_dotless_i+"nan kontratlar";
texte["gesendeteVertraege"] = "Yollanan kontratlar";
texte["alte"] = "Old";
// system messages
texte["zeigeLog"] = "log g"+oe+"ster";
texte["alleLesen"] = "hepsini oku";
texte["menge"] = "Miktar";
texte["umsatz"] = "Devir";
texte["gewinn"] = "Kar";
texte["filtern"] = "xx i"+tr_c+"in filtrele";
texte["summiere"] = "summarize";
texte["filter"] = "Filter";
texte["kaeufer"] = "Buyers";
texte["waren"] = "Goods";
// score history
texte["tag"] = "G"+ue+"n";
texte["punkte"] = "Puan";
texte["imLager"] = "stokta";
texte["lagerFehlt"] = "Stock xx missing!!!";
texte["lagerNiedrig"] = "Stok xx d"+ue+tr_s+ue+"k";
// overview
texte["farmi"] = "Farmie";
texte["produkte"] = Ue+"r"+ue+"nler";
texte["geld"] = "Teklif";
texte["wert"] = "De"+tr_g+"er";
texte["fehlt"] = tr_dotted_I+"htiya"+tr_c;
texte["ertrag"] = "Verim";
texte["produktion"] = Ue+"retim";
texte["total"] = "Toplam";
texte["farm"] = tr_C+"iftlik";
texte["unbeschaeftigt"] = "bo"+tr_s+"ta !!";
texte["dauer"] = "s"+ue+"re";
texte["futter"] = "Feed";
// options panel
texte["set_CacheReset"] = "Cache s"+tr_dotless_i+"f"+tr_dotless_i+"rla";
texte["set_ScriptHomepage"] = "Betik Anasayfas"+tr_dotless_i;
texte["set_valAutoLogin"] = "Otomatik giri"+tr_s;
texte["set_valGiess"] = "Otomatik sulama";
texte["set_valErnte"] = "Otomatik hasat";
texte["set_valGiessNotw"] = "Watering needed";
texte["set_valErnteMsg"] = "Hasat mesaj"+tr_dotless_i+"n"+tr_dotless_i+" g"+oe+"sterme";
texte["set_valLeereFelderLimit"] = "Bo"+tr_s+" alan";
texte["set_valMoveAnimals"] = "Move animals";
texte["set_valMinRackV"] = "Minimal rackamount plants";
texte["set_valMinRackE"] = "Minimal rackamount products";
texte["set_valKauflimit"] = "Top Buy limit";
texte["set_valVerkaufLimit"] = "Sat"+tr_dotless_i+tr_s+" limitleri";
texte["set_valJoinPreise"] = "Tek giri"+tr_s;
texte["set_valPrivNachr"] = "Number privat messages kept";
texte["set_valNachr"] = "Number market messages kept";
texte["set_valQuicklinks"] = "Show market quicklinks";
texte["set_highlight"] = "Highlight user at market###";
texte["set_valNimmBeob"] = "Use observed prices###";
texte["set_valStatistik"] = "Send statistics";
texte["set_valUpdate"] = "G"+ue+"ncelle";
texte["set_valDrag"] = "Dragging";
texte["set_valHotkeys"] = "Hotkeys";
texte["hotkeymap"] = {"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmilog":"Farmi-Log","help":"Help","market":"Market Place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","sgh":"Seed retailer","overview":"Overview","contract":"Contracts","systemmessage":"(next unread) system message"};
texte["set_valGlobaltimeWindmill"] = "Integrate windmill";
texte["confirm_NimmBeob"] = "The observed prices will overwrite previously saved market prices ...";
texte["confirm_CacheReset"] = "All information about your farms will be deleted ...";
texte["autoLogin"] = "Otomatik Giri"+tr_s;
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Hatal"+tr_dotless_i+" server";
texte["name"] = tr_dotted_I+"sim";
texte["passwort"] = tr_S+"ifre";
texte["speichern"] = "kaydet";
texte["loeschen"] = "sil";
texte["msgUpdate"] = "Beti"+tr_g+"in yeni versiyonu bulundu. Kurulsun mu?";
texte["zeigePasswoerter"] = tr_s+"ifreleri g"+oe+"ster";
texte["info_valAutoLogin"] = "Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts.";
texte["info_valGiess"] = "E"+tr_g+"er 'Hepsini sula' (Premium) varsa, bitkiler dikildikten sonra sulanacaklar.";
texte["info_valErnte"] = "Tarla a"+tr_c+tr_dotless_i+"ld"+tr_dotless_i+tr_g+tr_dotless_i+"nda gerekti"+tr_g+"inde hasat otomatik toplanacak";
texte["info_valGiessNotw"] = "Shall the necessity of watering be displayed?";
texte["info_valErnteMsg"] = "Kuzunun hasat sonras"+tr_dotless_i+" raporlar"+tr_dotless_i+"ndan rahats"+tr_dotless_i+"z m"+tr_dotless_i+" oluyorsunuz? Buradan kapatabilirsiniz.";
texte["info_valLeereFelderLimit"] = "Bir tarlada ki ekilmemi"+tr_s+" alan burada verilen say"+tr_dotless_i+"y"+tr_dotless_i+" ge"+tr_c+"erse, o tarla bo"+tr_s+" g"+oe+"z"+ue+"kecek.";
texte["info_valMoveAnimals"] = "";
texte["info_valMinRackV"] = "A plant is marked if its amount in your rack is falling below this value.";
texte["info_valMinRackE"] = "...same for the other products";
texte["info_valKauflimit"] = "Pazardan sadece verilen limit fiyat"+tr_dotless_i+"na kadar "+ue+"r"+ue+"n alabileceksiniz.  Bu sizin yanl"+tr_dotless_i+tr_s+"l"+tr_dotless_i+"kla y"+ue+"ksek fiyatl"+tr_dotless_i+" "+ue+"r"+ue+"nleri alman"+tr_dotless_i+"z"+tr_dotless_i+" engeller.";
texte["info_valVerkaufLimit"] = "Your sales are also protected, so that you don't price your own goods too cheaply or too highly.";
texte["info_valJoinPreise"] = "Joins the price input fields at the market stand."
texte["info_valPrivNachr"] = "Your last private messages are kept so that a message history of one contact can be shown."
texte["info_valNachr"] = "Old messages remain in this archive, even if they are older than the maximum 7 days.";
texte["info_valQuicklinks"] = "Show Quicklinks at Market Place";
texte["info_valNimmBeob"] = "Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"
texte["info_valStatistik"] = "Support the <a href='http://www.mff.i24.cc/' target='_blank'>Statistik-Server</a>.  No private data is sent!";
texte["info_valUpdate"] = "Checks whether an updated version of this Advisor script is available.";
texte["info_valDrag"] = "Allow moving windows by clicking the upper left corner.";
texte["info_valHotkeys"] = "Use hotkeys to quicker navigate the game. See the help.";
texte["info_valGlobaltimeWindmill"] = "Shall the time of the windmill be included to the global time?";
//help
texte["zeigeFehlendeProdukte"] = "Show product shortage";
texte["hilfe"][0] = "This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+scriptUrl+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong.";
texte["hilfe"]["The Zones"] = "The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."
texte["hilfe"]["The Overview"] = "Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place.";
texte["hilfe"]["Blue Bar"] = "Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product.";
texte["hilfe"]["Shelf"] = "Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player.";
texte["hilfe"]["Profit Calculation"] = "Next to the bottom of the shelf you can click <img src=\"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort.";
texte["hilfe"]["Farmies"] = "The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable.";
texte["hilfe"]["Hotkeys"] = "You can quickly move to a place by pressing <i>Alt</i>+... See the options!";
texte["hilfe"]["Market Place"] = "On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now.";
texte["hilfe"]["Messages"] = "Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact.";
texte["hilfe"]["Contracts"] = "They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!";
texte["hilfe"]["Account Manageing"] = "You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server.";
//Systemwords
texte["waehrung"] = "KL";
texte["coins"] = "Coin"
texte["msg1a"] = "Pazar Yeri";
texte["msg1b"] = /(.*) Pazar yerinde sizden (.*?) KL .deyerek\s*(\d+) adet (.*?) <br>\s*sat.n ald.\./;
texte["msg2a"] = "S"+tr_dotted_o+"zle"+tr_s+"melerinizden biri kabul edildi";
texte["msg2b"] = /(.*) s.zle.menizi imzalad.<br><br>\s*.u .r.nler sat.ld.:<br>([\S\s]*)\s*<br>\s*(.*) KL Hesab.na yat.r.ld.\./;
texte["msg2c"] = /\s*(\d+)x (.*?)<br>/;
break;}
}

//***********************************************************************************************************

function $(ID) {return document.getElementById(ID)}
function $top(ID) {return top.document.getElementById(ID)}
function removeElement(node){node.parentNode.removeChild(node)}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}
function getChildElementById(parent,tag,value){
	var result=null;
	var cand = parent.getElementsByTagName(tag);
	for(var v=0;v<cand.length;v++){
		if(cand[v].id==value){
			result=cand[v];
			break;
		}
	}
	cand=null;
	return result;
}
function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
	if (A.href){ document.location.href = A.href; }
}
function keyup(A,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg) {
	if (!keycode) keycode=0;
	var B = document.createEvent("KeyboardEvent");
	B.initKeyEvent(
                 "keyup",        //  in DOMString typeArg,
                  true,             //  in boolean canBubbleArg,
                  true,             //  in boolean cancelableArg,
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
                  !!ctrlKeyArg,     //  in boolean ctrlKeyArg,
                  !!altKeyArg,      //  in boolean altKeyArg,
                  !!shiftKeyArg,    //  in boolean shiftKeyArg,
                  false,            //  in boolean metaKeyArg,
                  keycode,          //  in unsigned long keyCodeArg,
                   0);
	A.dispatchEvent(B);
}
function keydown(A,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg){
	if (!keycode) keycode=0;
	var B = document.createEvent("KeyboardEvent");
	B.initKeyEvent(
                 "keydown",        //  in DOMString typeArg,
                  true,             //  in boolean canBubbleArg,
                  true,             //  in boolean cancelableArg,
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
                  !!ctrlKeyArg,     //  in boolean ctrlKeyArg,
                  !!altKeyArg,      //  in boolean altKeyArg,
                  !!shiftKeyArg,    //  in boolean shiftKeyArg,
                  false,            //  in boolean metaKeyArg,
                  keycode,          //  in unsigned long keyCodeArg,
                   0);
	A.dispatchEvent(B);
}
function change(A){
	var B = document.createEvent("MouseEvents");
	B.initEvent("change", true, true);
	A.dispatchEvent(B);
} 
function splitToFloat(str,del){
	var arr = new Array;
	if (str){
		var c=0;
		arr = str.split(del);
		for (var v=0;v<arr.length;v++){
			c = parseFloat("0"+arr[v],10);
			arr[v] = (isNaN(c)?0:c);
		}
	}
	return arr;
}
function splitToInt(str,del){
	var arr = new Array;
	if (str){
		var c=0;
		arr = str.split(del);
		for (var v=0;v<arr.length;v++){
			c = parseInt(arr[v],10);
			arr[v] = (isNaN(c)?0:c);
		}
	}
	return arr;
}
var developer=true;
function Log(obj,pre){
	if(developer){
		if(typeof(pre)=="undefined") pre="";
		if(typeof(obj)=="object"){
			//GM_log("______________________________ object");
			for(var v in obj) Log(obj[v],pre+v+" : ");
			//GM_log("______________________________ object end");
		} else {
			if(typeof(obj)!="function") GM_log(pre+obj);
		}
	}
}
function getRandom( min, max ){
	if ( min > max ){return( -1 );	}
	if ( min == max ){return( min );}
        return( min + parseInt( Math.random() * ( max-min+1 ),10 ) );
}

function setSelRange(inputEl, selStart, selEnd) {
 if (inputEl.setSelectionRange) {
  inputEl.focus();
  inputEl.setSelectionRange(selStart, selEnd);
 } else if (inputEl.createTextRange) {
  var range = inputEl.createTextRange();
  range.collapse(true);
  range.moveEnd('character', selEnd);
  range.moveStart('character', selStart);
  range.select();
 }
}

function number_format(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: number_format(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: number_format(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: number_format(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: number_format(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: number_format(1000);
	// *     returns 5: '1,000'
	// *     example 6: number_format(67.311, 2);
	// *     returns 6: '67.31'

	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
	var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	var abs = Math.abs(n).toFixed(prec);
	var _, i;

	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;

		_[0] = s.slice(0,i + (n < 0)) +
			  _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		s = _.join(dec);
	} else {
		s = s.replace('.', dec);
	}
	return s;
}
function kT_format(number){return number_format(number,2)+"&nbsp;"+texte["waehrung"];}
function kT_formatgr(number){return number_format(number,0)+"&nbsp;"+texte["waehrung"];}
function punkte_format(number,containertype,append){
	var newspan = createElement(containertype,{"title":texte["punkte"]},append?append:false);
	createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/points.gif","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
	createElement("span",{},newspan,number_format(number));
	return newspan;
}

function time2str(time,mode){
	str="";
	if (!mode) {
		if (time%60>=10) str+=":"+Math.floor(time%60);
		else str+=":0"+Math.floor(time%60);
	}
	time=time/60;
	if (time>=1){
		if (time%60>=10) str=":"+Math.floor(time%60)+str;
		else str=":0"+Math.floor(time%60)+str;
	}
	else str=":00"+str;
	time=time/60;
	if (time>=1) str=Math.floor(time%24)+str;
	else str="0"+str;
	time=time/24;
	if (time>=1) str=Math.floor(time)+"d&nbsp;"+str;
	return str;
}
function uhrzeit(time,mode){
	var help = new Date(time*1000);
	if (help.getHours()<10) { var str = "0"+help.getHours(); }
	else { var str = help.getHours(); }
	if (help.getMinutes()<10) { str += ":0"+help.getMinutes(); }
	else { str += ":"+help.getMinutes(); }
	if (!mode) {
		if (help.getSeconds()<10) { str += ":0"+help.getSeconds(); }
		else { str += ":"+help.getSeconds(); }
	}
	return str;
}
function datum(time){
	var time2 = new Date(time*1000);
	str="";
	if (time2.getDate()<10) { str += "0"; }
	str += time2.getDate()+".";
	if (time2.getMonth()<9) { str += "0"; }
	str += (1+time2.getMonth())+"."+(1900+time2.getYear());
	return str;
}
function str2time(str){
	var keytime = /(\d+)\.(\d+)\.(\d+), (\d+):(\d+)/;
	help = keytime.exec(str);
	time = new Date(parseInt(help[3],10)+2000,parseInt(help[2],10)-1,help[1],help[4],help[5],0);
	return (time.getTime()/1000);
}
function getKeySymbol(keyCode){
	if((46<keyCode)&&(keyCode<91)){ return String.fromCharCode(keyCode); }
	var codelist = {"8":"backspace","9":"tab","13":"enter","16":"shift","17":"ctrl","18":"alt","19":"pause/break","20":"caps lock","27":"escape","33":"page up","34":"page down","35":"end","36":"home","37":"<-","38":"up arrow","39":"->","40":"down arrow","45":"insert","46":"delete","91":"left window key","92":"right window key","93":"select key","96":"numpad 0","97":"numpad 1","98":"numpad 2","99":"numpad 3","100":"numpad 4","101":"numpad 5","102":"numpad 6","103":"numpad 7","104":"numpad 8","105":"numpad 9","106":"*","107":"+","109":"-","110":"decimal point","111":"divide","112":"F1","113":"F2","114":"F3","115":"F4","116":"F5","117":"F6","118":"F7","119":"F8","120":"F9","121":"F10","122":"F11","123":"F12","144":"num lock","145":"scroll lock","186":"semi-colon","187":"equal sign","188":",","189":"dash","190":"period","191":"forward slash","192":"grave accent","219":"open bracket","220":"back slash","221":"close braket","222":"single quote"}
	return codelist[keyCode]?codelist[keyCode]:"key("+keyCode+")";
}

function explode(str){
//GM_log("Begin explode "+ str);
if (str == "") throw("Explode error Argument empty");
if (str=="undefined") throw ("Explode error Argument is undefined");
if (typeof str != "string") throw ("Explode error Argument not a String");

try{
	return eval('(' + str + ')');
} catch(err){
	GM_log("Explode error : " + err);
	throw ("Explode error : " + err);
}
}

function implode(arr){//--- function written by Jan-Hans
	try{
		var line = new String();
		var InternalCounter = -1;
		var NoKey = new Boolean(false);
		if (typeof arr != "object") throw("Argument not a Object or Array" + typeof arr +"<br>");
		var type = (arr instanceof Array); //true->array | false->object
		
		line = (type)?"[":"{";
		for(var i in arr ){
			if (typeof arr[i] == "function") continue;
			InternalCounter++;
			if (type){
				while (i>InternalCounter){
					line += ",";
					InternalCounter++;
				}
			}else{ //arr == object
				line += "\"" + i + "\"";
				line += ":";
			}
			if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
				line +=  arr[i];
			} else if (typeof arr[i] == "string"){
				line +=  "\"" + arr[i] + "\"";
			} else if(typeof arr[i] == "undefined"){
				line += '';
			} else {
				line += implode(arr[i]);
			}
			line += ",";
		}
		var endChar = line.substring(line.length-1,line.length);
		return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
	} catch (err){
		GM_log("Implode error : " + err);
		throw ("Implode error : " + err);
	}
}

function bar(size,markvalue,maxvalue){
	size = Math.floor(size);
	var mark = Math.floor(size*markvalue/maxvalue);
	var cell=createElement("div",{"style":"border:2px solid black; position:absolute;width:"+size+"px;height:12px;"});
     	createElement("div",{"style":"position:absolute;width:"+mark+"px;height:12px;background-color:#5555FF;"},cell);
	return cell;
}

var valMouseXY = ["",0,0,0,0];
var dragPos = new Object();
var doDrag = new Object();
function makeDraggable(appendTo,doDragX,doDragY,dragObjId){
	if(typeof(doDragX)!="boolean") doDragX=true;
	if(typeof(doDragY)!="boolean") doDragY=true;
	if(typeof(dragObjId)!="string") dragObjId=appendTo.id;
	//GM_log("makeDraggable:"+appendTo+":"+doDragX+":"+doDragY+":"+dragObjId);
	doDrag[dragObjId] = [doDragX,doDragY];
	var help = GM_getValue(lng+"_"+server+"_"+username+"_dragPos_"+dragObjId,"");
	var dragObj = $top(dragObjId);
	if (help){
		dragPos[dragObjId] = help.split("|");
		if(doDragX) dragObj.style.left = dragPos[dragObjId][0]+"px";
		if(doDragY) dragObj.style.top = dragPos[dragObjId][1]+"px";
		dragObj.style.margin = "";
		dragObj.style.marginLeft = "";
		dragObj.style.marginTop = "";		
	} else {
		x = parseInt(dragObj.style.left+"0",10)+parseInt(dragObj.style.marginLeft+"0",10);
		y = parseInt(dragObj.style.top+"0",10)+parseInt(dragObj.style.marginTop+"0",10);
		if(doDragX) dragObj.style.left=x+"px";
		if(doDragY) dragObj.style.top=y+"px";
		dragObj.style.margin = "";
		dragObj.style.marginLeft = "";
		dragObj.style.marginTop = "";
		dragPos[dragObjId] = [x,y];
	}

	var newdiv = createElement("div",{"id":dragObjId+"Drag","style":"cursor:move;position:absolute;top:0px;left:0px;width:10px;height:20px;background-color:blue;opacity:0.4;"},appendTo);
	newdiv.addEventListener("mousedown", function(event){
		valMouseXY = [this.id.replace("Drag",""),"x","y"];
		top.window.addEventListener("mousemove", mousemoveDrag ,false);
		top.window.addEventListener("mouseup", mouseupDrag ,false);		
		var dragObj = $top(valMouseXY[0]);
		createElement("div",{"id":"divDragHelper","style":"position:absolute;display:block;z-index:200;height:"+dragObj.style.height+";width:"+dragObj.style.width+";top:"+dragObj.style.top+";left:"+dragObj.style.left+";background-color:blue;"},dragObj.parentNode);
		dragObj = null;
	},false);
	dragObj=null;newdiv=null;
}
mousemoveDrag = function(event){
//GM_log("mousemoveDrag");
	if (valMouseXY[0] != ""){
		if(valMouseXY[1]=="x") valMouseXY = [valMouseXY[0],event.pageX,event.pageY]; // init
		var dragObj = $top(valMouseXY[0]);
		var divDragHelper = $top("divDragHelper");
		if(doDrag[valMouseXY[0]][0]){
			dragObj.style.left = (parseInt(dragObj.style.left+"0",10) + (event.pageX - valMouseXY[1]))+'px';
			divDragHelper.style.left = dragObj.style.left;
		}
		if(doDrag[valMouseXY[0]][1]){
			dragObj.style.top =  (parseInt(dragObj.style.top+"0",10) + (event.pageY - valMouseXY[2]))+'px';
			divDragHelper.style.top = dragObj.style.top;
		}
		valMouseXY = [valMouseXY[0],event.pageX,event.pageY];
		dragObj=null;divDragHelper=null;
	}
}
mouseupDrag = function(event){
//GM_log("mouseupDrag");
	top.window.removeEventListener("mousemove", mousemoveDrag ,false);
	if (valMouseXY[0] != ""){
		var dragObj = $top(valMouseXY[0]);
		dragPos[valMouseXY[0]] = [parseInt(dragObj.style.left+"0",10),parseInt(dragObj.style.top+"0",10)];
		GM_setValue(lng+"_"+server+"_"+username+"_dragPos_"+valMouseXY[0],dragPos[valMouseXY[0]].join("|"));
		removeElement($top("divDragHelper"));
		dragObj=null;
	}
	valMouseXY = ["",0,0,0,0];
	top.window.removeEventListener("mouseup", mouseupDrag ,false);
}

GM_addStyle(".playerMsg{float:left;margin-right:7px;background-image:url('http://dqt9wzym747n.cloudfront.net/pics/guild/mail.gif');background-position:0px -3px;}")
GM_addStyle(".playerMsg div{width:15px;height:12px;opacity:0.5;}");
GM_addStyle(".playerMsg div:hover{background-color:blue;}");
GM_addStyle(".playerContract{float:left;margin-right:5px;background-image:url('http://dqt9wzym747n.cloudfront.net/pics/guild/contract.gif');background-position:-2px 0px;}");
GM_addStyle(".playerContract div{width:11px;height:15px;opacity:0.5;}");
GM_addStyle(".playerContract div:hover{background-color:blue;}");
GM_addStyle(".playerStats{float:left;margin-right:5px;background-image:url('http://dqt9wzym747n.cloudfront.net/pics/stadt/stats_sf_black.gif');background-repeat:no-repeat;background-position:0px 2px;}");
GM_addStyle(".playerStats div{position:relative;top:1px;width:11px;height:9px;opacity:0.5;-moz-border-radius:5px;}");
GM_addStyle(".playerStats div:hover{background-color:blue;}");
function igm(name,append,betreff){
	if (betreff) var ziel = "../nachrichten/new.php?to="+name+"&subject="+betreff;
	else var ziel = "../nachrichten/new.php?to="+name;
	var link=createElement("span",{"title":texte["nachrichtSchreiben"],"class":"link playerMsg"});
	createElement("div",{},link);
	if($top("multiframe")){
		link.addEventListener("click",function(){
			$top("multiframe").src = ziel;
			$top("multiframe").style.display = "block";
		},false);
	} else {
		link.addEventListener("click",function(){
			window.open(ziel);
		},false);
	}
	if (append) append.appendChild(link);
	return link;
}
function vertrag(name,append){
	var ziel = "http://s"+server+gamepage+"/vertraege/new.php?to_player="+name;
	var link=createElement("span", {"title":texte["vertragSchicken"],"class":"link playerContract"});
	createElement("div",{},link);
	if($top("multiframe")){
		link.addEventListener("click",function(){
			$top("multiframe").src = ziel;
			$top("multiframe").style.display = "block";
		},false);
	} else {
		link.addEventListener("click",function(){
			window.open(ziel);
		},false);
	}
	if (append) append.appendChild(link);
	return link;
}
function stats(name,append){
	var link=createElement("span", {"title":texte["statistik"],"class":"link playerStats"});
	createElement("div",{},link);
	if($top("shop")){
		link.addEventListener("click",function(){
			unsafeWindow.top.initCity(1);
			unsafeWindow.top.showDiv("transp3");
			$top("transp3").style.visibility = "visible";
			unsafeWindow.top.showDiv("shop");
			$top("shop").style.visibility = "visible";
			$top("shopframe").src="../stadt/stats.php?search=1&searchterm="+name;
		},false);
	} else {
		link.addEventListener("click",function(){document.location.href="../stadt/stats.php?search=1&searchterm="+name},false);
	}
	if (append) append.appendChild(link);
	return link;
}

function produktPic(name,append){
	var prodNum = (isNaN(parseInt(name,10))?prodId[name]:parseInt(name,10));
	var newdiv = createElement("div",{"title":prodName[prodNum],"style":"float:left;margin-right:3px;border:none;"});
	if (prodNum>0) newdiv.setAttribute("class","kp"+prodNum);
	else createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/menu/coins.gif","height":"15","width":"15","border":"none"},newdiv);
	if (append) append.appendChild(newdiv);
	return newdiv;
}

function getData(){
	prodName[0]=texte["coins"];
	prodTyp[0] = "c";
	prodId["Coins"] = 0;
	prodBlock[0] = false;
	if($top("coins")) prodBestand[prodId["Coins"]]=parseInt($top("coins").innerHTML,10);

	gut = splitToFloat(GM_getValue(lng+"_"+server+"_gut",""),"|");
	gutBeob = splitToFloat(GM_getValue(lng+"_"+server+"_gutBeob",""),"|");	
	gutBeobTime = splitToFloat(GM_getValue(lng+"_"+server+"_gutBeobTime",""),"|");	
	try{
		levelnum=parseInt($top("levelnum").innerHTML,10);
		for (var v=1;v<unsafeWindow.top.produkt_name.length;v++) {
			prodName[v]=unsafeWindow.top.produkt_name[v];
			if(isNaN(gut[v])){ gut[v] = 0; }
			prodTyp[v]=unsafeWindow.top.produkt_category[v];
			prodId[prodName[v]]=v;
			var c = unsafeWindow.top.rackElement[v].number;
			prodBestand[v]=(c?parseInt(c,10):0);
			prodBlock[v]=(levelnum>=unsafeWindow.top.produkt_level[v]?false:true);
		}
		//Club
		prodBlock[70]=true;
		prodBlock[72]=true;
		prodBlock[51]=true;
		prodBlock[87]=true;
		prodBlock[81]=true;
		prodBlock[84]=true;
		prodBlock[53]=true;
		prodBlock[54]=true;
		prodBlock[56]=true;
		prodBlock[89]=true;
		prodBlock[79]=true;
		prodBlock[49]=true;
		//unbenutzte
		prodBlock[66]=true; //Farmer
		prodBlock[67]=true; //Steinengel
		prodBlock[68]=true; //Kuerbis
		prodBlock[69]=true; //Brunnen
		prodBlock[71]=true; //Bank rot
		prodBlock[88]=true; //Minibauernhaus
		var help1 = new Array();
		var help2 = new Array();
		var help3 = new Array();
		for (var v=1;v<prodName.length;v++) if (!prodBlock[v]) {
			switch (prodTyp[v]) {
			case "v": help1.push(v); break;
			case "e": help2.push(v); break;
			case "z": help3.push(v); break;
			}
		}
		prodNameSort = ["0"].concat(help1,help2,help3);
	} catch(err) {
		try{ prodName = GM_getValue(lng+"_"+server+"_prodName").split("|");
			for (var v=0;v<prodName.length;v++){
				prodId[prodName[v]] = v;
			}
		} catch(err) {}
		prodNameSort = GM_getValue(lng+"_"+server+"_prodNameSort","").split("|");
		prodTyp = GM_getValue(lng+"_"+server+"_prodTyp","").split("|");
		prodBestand = splitToInt(GM_getValue(lng+"_"+server+"_"+username+"_prodBestand",""),"|");
		var arr = GM_getValue(lng+"_"+server+"_"+username+"_prodBlock","").split("|");
		for (var v=0;v<prodName.length;v++){ prodBlock[v] = (arr[v]=="true"); }
	}
	
	unsafeWindow.top.GMprodName = prodName.slice(0);
	unsafeWindow.top.GMprodNameSort = prodNameSort.slice(0);
	unsafeWindow.top.GMprodTyp = prodTyp.slice(0);
	unsafeWindow.top.GMprodBlock = prodBlock.slice(0); 
	unsafeWindow.top.GMgut = gut.slice(0); 
}
function saveData(){
	GM_setValue(lng+"_"+server+"_prodName",prodName.join("|"));
	GM_setValue(lng+"_"+server+"_prodNameSort",prodNameSort.join("|"));
	GM_setValue(lng+"_"+server+"_prodTyp",prodTyp.join("|"));
	GM_setValue(lng+"_"+server+"_gut",gut.join("|"));
	GM_setValue(lng+"_"+server+"_gutBeob",gutBeob.join("|"));
	GM_setValue(lng+"_"+server+"_"+username+"_prodBlock",prodBlock.join("|"));
}

function showPage(page) {
//GM_log("showPage:"+page);
    unsafeWindow.top.gclr();
    unsafeWindow.top.clr();
    var i = 0;
    while ($top("kunde" + i)) {
        $top("kunde" + i).style.display = "none";
        i++;
    }
	closeInfoPanel();
    $top("einkaufszettel").style.display = "none";
    $top("multiframe").src = page;
    $top("popup_garden").style.display = "block";
    $top("multiframe").style.display = "block";
}
function showMarket(pid){
	if($top("shopframe")){
		unsafeWindow.top.initCity(1);
		closeInfoPanel();
		unsafeWindow.top.showDiv("transp3");
		$top("transp3").style.visibility = "visible";
		unsafeWindow.top.showDiv("shop");
		$top("shop").style.visibility = "visible";
		$top("shopframe").src="stadt/markt.php"+(pid?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");
	} else {
		document.location.href = "http://s"+server+gamepage+"/stadt/markt.php"+(pid?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");
	}
}
function showMarketStand(pid){
	if($top("shopframe")){
		unsafeWindow.top.initCity(1);
		closeInfoPanel();
		unsafeWindow.top.showDiv("transp3");
		$top("transp3").style.visibility = "visible";
		unsafeWindow.top.showDiv("shop");
		$top("shop").style.visibility = "visible";
		$top("shopframe").src="stadt/marktstand.php"+(pid?"?produkt="+pid:"");
	} else {
		document.location.href = "http://s"+server+gamepage+"/stadt/marktstand.php"+(pid?"?produkt="+pid:"");
	}
}
function showSGH(){
	unsafeWindow.top.initCity(1);
	closeInfoPanel();
	unsafeWindow.top.showDiv("transp3");
	$top("transp3").style.visibility = "visible";
	unsafeWindow.top.showDiv("shop");
	$top("shop").style.visibility = "visible";
	$top("shopframe").src="stadt/shop.php?s=1";
}
function showMessage(from,page,msg){
//GM_log("showMessage:"+from+":"+page+":"+msg);
	click($top("menueimg1"));
	showPage("nachrichten/read.php?from="+from+"&page="+page+"&msg="+msg+"&mass=0");
}

//***********************************************************************************************************

function quicklinks () { 
if (GM_getValue(lng+"_"+server+"_"+username+"_valQuicklinks",true)){
	var divquick=createElement("div",{"id":"quicklinks","style":"position:absolute;left:630px;top:40px;width:340px;background-color:white;z-index:10;"},all);
	if(document.location!=top.location){
		divquick.addEventListener("mouseover",function(){this.style.left="320px"},false);
		divquick.addEventListener("mouseout",function(){this.style.left="630px"},false);
	}
	
	var newtable=createElement("table",{"border":"3px solid black;"},divquick);
	var newtr=createElement("tr",{},newtable);
	var newtd=createElement("td",{},newtr);
	
	var newdiv = createElement("div",{"style":"float:right;height:30px;padding:2px;margin-right:20px;"},newtd);
	createElement("div",{"class":"v88"},newdiv);
	var newa = createElement("a",{"class":"link2","href":"markt.php","style":"position:relative;top:-30px;"},newdiv);
	newdiv = createElement("div",{"style":"width:30px;height:30px;background-color:green;opacity:0;"},newa);
	newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3";$("quicklinksName").innerHTML=texte["markt1"];},false);
	newdiv.addEventListener("mouseout",function(){this.style.opacity="0";$("quicklinksName").innerHTML="";},false);
	createElement("div",{"id":"quicklinksName","style":"color:black;font-weight:bold;float:right;line-height:30px;padding:2px;margin-right:20px;"},newtd);
	
	var prodTypOld = "c";
	for (var w=0;w<prodNameSort.length;w++) {
		var v = prodNameSort[w];
		if (prodTypOld!=prodTyp[v]) {
			newtr=createElement("tr",{},newtable);
			newtd=createElement("td",{},newtr);
			prodTypOld = prodTyp[v];
		}
		newdiv=createElement("div",{"style":"float:left;height:30px;padding:2px;"},newtd);
		createElement("div",{"class":"v"+v},newdiv);
		newa = createElement("a",{"class":"link2","href":"markt.php?page=1&order=p&id="+v+"&filter=1&guild=0","style":"position:relative;top:-30px;"},newdiv);
		newdiv = createElement("div",{"id":v,"style":"width:30px;height:30px;background-color:blue;opacity:0;"},newa);
		newdiv.addEventListener("mouseover",function(){this.style.opacity="0.3";$("quicklinksName").innerHTML=prodName[this.id];},false);
		newdiv.addEventListener("mouseout",function(){this.style.opacity="0";$("quicklinksName").innerHTML="";},false);
	}
	divquick=null;newtable=null;newtr=null;newtd=null;newdiv=null;newa=null;
}}
function buildPreise(modeStr,appendTo){
	getData();
	var valNimmBeob = GM_getValue(lng+"_"+server+"_valNimmBeob",false)
	if($("initsearchbutton")) removeElement($("initsearchbutton"));
	if($("marktstat")) removeElement($("marktstat"));
	if($("showMarktstat")) removeElement($("showMarktstat"));
	if($("setPreis")) removeElement($("setPreis"));
	if($("angebot_kaufen")) removeElement($("angebot_kaufen"));
	var newtable=createElement("table",{"class":"white","width":"505px","border":"0","cellspacing":"0","style":"position:absolute;left:35px;top:45px;"});
	appendTo.replaceChild(newtable,appendTo.getElementsByTagName("table")[0]);
	var newtablehead=createElement("thead",{},newtable);
	var newtablebody=createElement("tbody",{"style":"overflow-y:auto;overflow-x:hidden"},newtable);
	var newtablefoot=createElement("tfoot",{},newtable);

	var newtr=createElement("tr",{},newtablehead);
	var newtd=createElement("td",{"colspan":"7","class":"tnormal","align":"center","style":"color:#f0ffef;font-weight:bold;"},newtr);
	var cellPreise=createElement("div",{"style":"float:left;width:380px;"},newtd,texte["preise"]);
	var newdiv=createElement("div",{"class":"productSort","style":"float:right;"},newtd);

	var newdiv1 = createElement("div",{"title":texte["sorte1"],"class":"link","style":"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -10px 0px transparent;"},newdiv);
	if (modeStr=="v") {newdiv1.style.backgroundPosition="-10px -20px"; cellPreise.innerHTML += " "+texte["sorte1"]; }
	else newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-10px 0px";},false);
	newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-10px -20px";},false);
	newdiv1.addEventListener("click",function(){buildPreise("v",appendTo)},false);

	newdiv1 = createElement("div",{"title":texte["sorte2"],"class":"link","style":"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -36px 0px transparent;"},newdiv);
	if (modeStr=="z") {newdiv1.style.backgroundPosition="-36px -20px";cellPreise.innerHTML += " "+texte["sorte2"]; }
	else newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-36px 0px";},false);
	newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-36px -20px";},false);
	newdiv1.addEventListener("click",function(){buildPreise("z",appendTo)},false);

	newdiv1 = createElement("div",{"title":texte["sorte3"],"class":"link","style":"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -62px 0px transparent;"},newdiv);
	if (modeStr=="e") {newdiv1.style.backgroundPosition="-62px -20px";cellPreise.innerHTML += " "+texte["sorte3"]; }
	else newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-62px 0px";},false);
	newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-62px -20px";},false);
	newdiv1.addEventListener("click",function(){buildPreise("e",appendTo)},false);

	newdiv1 = createElement("div",{"title":texte["sorte4"],"class":"link","style":"float:left;height:20px;width:26px;background:url('http://dqt9wzym747n.cloudfront.net/pics/racksort2.jpg') repeat scroll -88px 0px transparent;"},newdiv);
	if (modeStr=="cvez") newdiv1.style.backgroundPosition="-88px -20px";
	else newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-88px 0px";},false);
	newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-88px -20px";},false);
	newdiv1.addEventListener("click",function(){buildPreise("cvez",appendTo)},false);

	newtr = createElement("tr",{},newtablehead);
	createElement("td",{"colspan":"2","align":"center", "class":"headercell"},newtr,texte["produkt"]);
	createElement("td",{"align":"right","class":"headercell"},newtr,texte["bestand"]);
	createElement("td",{"align":"right","class":"headercell"},newtr,"&nbsp;"+texte["hofpreis"]);
	createElement("td",{"align":"right","class":"headercell"},newtr,"&nbsp;"+texte["beobachtet"]);
	if(!valNimmBeob)createElement("td",{"align":"right","class":"headercell"},newtr,texte["marktpreis"]);
	createElement("td",{"align":"right","class":"headercell"},newtr,texte["abzglGebuehr"]);

	var sumwert = 0;
	for(var w in prodNameSort){
		v = prodNameSort[w];
		if (modeStr.search(prodTyp[v])!=-1) {
			if (prodTyp[v]!="c") sumwert+=prodBestand[v]*gut[v];
			newtr = createElement("tr",{"title":(texte["wert"]+": "+kT_formatgr(prodBestand[v]*gut[v])).replace(/&nbsp;/g," ")},newtablebody);

			newdiv = createElement("td",{},newtr);
			produktPic(v,newdiv);

			newdiv = createElement("td",{},newtr);
			newa = createElement("a",{"class":"link2","id":v},newdiv,prodName[v]);
			newa.addEventListener("click",function(){showMarket(this.id);},false);

			createElement("td",{"align":"right"},newtr,(prodBestand[v]?number_format(prodBestand[v],0):"-"));
			createElement("td",{"align":"right"},newtr,(npc[v]?number_format(npc[v],2):""));
			createElement("td",{"align":"right"},newtr,(gutBeob[v]?number_format(gutBeob[v],2):""));

			if(!valNimmBeob){
				newtd = createElement("td",{"align":"right"},newtr);
				createElement("span",{"style":"font-size:0px;"},newtd,number_format(gut[v],2));
				newinput = createElement("input",{"id":"inp"+v,"tabindex":parseInt(w,10)+1,"value":number_format(gut[v],2),"size":"10","maxlength":"10","style":"text-align:right; background-color:transparent; color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){
					this.style.backgroundColor="transparent";
					this.value=number_format(gut[this.id.replace("inp","")],2);
				},false);
				newinput.addEventListener("change",function(){
					var currId = this.id.replace("inp","");
					gut[currId]=parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."));
					this.parentNode.nextSibling.innerHTML =  number_format(0.9*gut[currId],2);
					saveData();
					this.style.backgroundColor="transparent";
				},false);
			}

			createElement("td",{"align":"right", "style":"padding-right:20px"},newtr,number_format(0.9*gut[v],2));
		}
	}
	newtablebody.setAttribute("height",Math.min(361,19*newtablebody.childNodes.length)+"px");

	newtr = createElement("tr",{},newtablefoot);
	newtd = createElement("td",{"id":"wert","colspan":"3","align":"center","style":"border-top:1px dashed #F0FFEF;"},newtr);
	if(!valNimmBeob){
		newa = createElement("a",{"class":"link2","style":"font-weight:bold;text-decoration:none"},newtd,texte["nimmPreise"]);
		newa.addEventListener("click",function(){
			if (confirm(texte["confirm_NimmBeob"])) {
				GM_setValue(lng+"_"+server+"_gut",gutBeob.join("|"));
				buildPreise(modeStr,appendTo);
			}
		},false);
	} else {newtd.innerHTML="&nbsp;";}

	createElement("td",{"id":"wert","colspan":"4","align":"center","style":"font-weight:bold;border-top:1px dashed #F0FFEF;"},newtr,texte["lagerwert"]+":&nbsp;"+kT_formatgr(sumwert));

	newdiv = createElement("div",{"class":"link2","style":"position:absolute;top:475px;left:545px;width:80px;height:40px;background: url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},appendTo);
	newdiv.addEventListener("click",function(){showMarket()},false);
	createElement("div",{"style":"position:absolute;top:7px;left:7px;width:67px;color:white;font-weight: bold;"},newdiv,texte["markt1"]);
	newtable=null;newtablehead=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;newdiv=null;newdiv1=null;cellPreise=null;
}

function do_markt(){
	GM_addStyle("div.link2{color:#ffffff!important;}");
	GM_addStyle("div.link2:hover{color:#000000!important;}");
	GM_addStyle("a.link2:hover{color:#00ddff!important;}");
	GM_addStyle("#marketcontainer{overflow:hidden!important;}");
	GM_addStyle("#marketcontainer{height:325px!important;}");
	var marktButtons = new Array();
	for (var v=0;v<all.childNodes.length;v++) if((all.childNodes[v].style)&&(all.childNodes[v].style.top=="475px")){
		marktButtons.push(all.childNodes[v]); 
		all.childNodes[v].childNodes[1].style.color="";
	}
	getData();
	var statServer = {"de":"http://www.mff.i24.cc/"};
	var candtr = candtable[0].getElementsByTagName("tr");
	var canda,candtd,canddiv,newa,newinput,newspan,newdiv;
	
	if (pageZusatz=="?show=overview") {
		canda = candtable[0].getElementsByTagName("a");
		for (var v in canda) produktPic(canda[v].innerHTML,canda[v].parentNode);
	} else {
		var keypage=/page=(\d*)/;
		var pageId = (/order=p&id=(\d*)/).exec(document.location.href);
		var userId = (/order=v&id=(\d*)/).exec(document.location.href);
		var sumTotal = 0;
		var gutBeobCount1 = 0;
		var gutBeobCount2 = 0;
		var preisKlasse = (pageId?0:2);
		var testPageId="";
		var highlight = explode(GM_getValue(lng+"_"+server+"_"+username+"_highlight","{}"));
		highlight[farmname]="104e8b";

		candtd = candtr[2].getElementsByTagName("td");
		document.title = number_format(GM_getValue(lng+"_"+server+"_"+username+"_bargeld",0));
		candtable[0].setAttribute("width","510px");
		candtd[5].innerHTML += texte["kauf"];
		for (var v=1;v<$("marketcontainer").childNodes.length;v=v+2) {
			canddiv = $("marketcontainer").childNodes[v].getElementsByTagName("div");
			var menge = parseInt(canddiv[0].innerHTML,10);
			var produktId = (/'(\d+)'/).exec($("marketcontainer").childNodes[v].getElementsByClassName("c2_2")[0].innerHTML)[1];
			if(testPageId==""){ testPageId = produktId; }
			else {
				if(testPageId!=produktId){ testPageId = "-"; }
			}
			canddiv[0].setAttribute("title", texte["markt2"]+" "+number_format(sumTotal,0));
			sumTotal += menge;
			canddiv[0].innerHTML = number_format(menge,0);
			var currId = keyinteger2.exec(canddiv[3].getElementsByTagName("a")[0].href)[1];
			var help =(/&nbsp;\[(.*?)\]&nbsp;/.exec(canddiv[4].innerHTML));
			if (help) {
				canddiv[4].innerHTML = canddiv[4].innerHTML.replace(help[0],"");
				newspan = createElement("span");
				newspan.innerHTML = "]&nbsp;";
				canddiv[4].insertBefore(newspan,canddiv[4].childNodes[1]);
				newa = createElement("a",{"class":"link2"});
				newa.innerHTML = help[1];
				canddiv[4].insertBefore(newa,canddiv[4].childNodes[1]);
				newspan = createElement("span");
				newspan.innerHTML = "&nbsp;[";
				canddiv[4].insertBefore(newspan,canddiv[4].childNodes[1]);
				if($top("shop")){
					newa.addEventListener("click",function(){
						unsafeWindow.top.initCity(1);
						unsafeWindow.top.showDiv("transp3");
						$top("transp3").style.visibility = "visible";
						unsafeWindow.top.showDiv("shop");
						$top("shop").style.visibility = "visible";
						$top("shopframe").src="../stadt/stats.php?guildsearch="+this.innerHTML;
					},false);
				} else {
					newa.addEventListener("click",function(){document.location.href="../stadt/stats.php?guildsearch="+this.innerHTML;},false);
				}
			}
			canddiv[5].innerHTML = canddiv[5].innerHTML.replace(" "+texte["waehrung"],"");
			canddiv[6].innerHTML = canddiv[6].innerHTML.replace(" "+texte["waehrung"],"");
			canddiv[7].style.textAlign="right";
			canddiv[7].style.width="60px";
			var preis = parseFloat(keyfloat.exec(canddiv[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."))[1],10);
			if (v<8) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
			if (v<16) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
			if (v<24) {gutBeobCount1 += preis*menge; gutBeobCount2 += menge; }
		
			canda = canddiv[7].getElementsByTagName("a");
			if (canda[0]){
				if(gut[currId]) canda[0].innerHTML = number_format(gut[currId],2); //GutPreis zeigen
			} else {
				canddiv[7].innerHTML=""; //eigenes Angebot oder zu teuer
				canddiv[7].parentNode.style.opacity = "0.7";
			}
			if (preis>=npc[currId]) {
				if(preisKlasse<1){
					preisKlasse++;
					$("marketcontainer").childNodes[v].style.borderTop = "2px solid white";
				}
				if(canda[0]) canddiv[7].innerHTML = canda[0].innerHTML; //zu teuer Link entfernen
				canddiv[7].parentNode.style.opacity = "0.5";
				canddiv[7].setAttribute("title",texte["markt3"]+" ("+number_format(npc[currId],2)+")");
				canddiv[7].style.fontStyle="italic";
				if (0.9*preis>npc[currId]){ //111% NPC
					$("marketcontainer").childNodes[v].style.fontStyle="italic";
					if(preisKlasse<2){
						preisKlasse++;
						$("marketcontainer").childNodes[v].style.borderTop = "2px dashed white";
					}
				} 
			} else {
				if (gut[currId]!=0 && 100*preis>valKauflimit*gut[currId]){
					if(canda[0]) canddiv[7].innerHTML = canda[0].innerHTML; //zu teuer Link entfernen
					canddiv[7].parentNode.style.opacity = "0.7";
					canddiv[7].title=texte["markt4"]+" "+valKauflimit+"%";
				}
			}

			canda = canddiv[4].getElementsByTagName("a");
			if (highlight[canda[0].innerHTML]) canddiv[4].style.backgroundColor=highlight[canda[0].innerHTML];
		}
		
		if(pageId){
			var c=0;
			while ((c<prodNameSort.length)&&(prodNameSort[c]!=pageId[1])) c++;
			var pageIdVor = prodNameSort[(c-1+prodNameSort.length)%(prodNameSort.length)];
			var pageIdNach = prodNameSort[(c+1)%(prodNameSort.length)];
		
			candtr[1].firstChild.colSpan="4";
			newtd = createElement("td",{"colspan":"2"},candtr[1]);
			candtr[1].insertBefore(newtd,candtr[1].firstChild);
			newdiv = createElement("div",{"style":"float:left;padding-right:2px;"},newtd);
			createElement("a",{"id":"prevPage","class":"link2","float":"left","href":"markt.php?page=1&order=p&id="+pageIdVor+"&filter=1&guild=0","title":prodName[pageIdVor]},newdiv,"<<");
			createElement("a",{"id":"nextPage","class":"link2","href":"markt.php?page=1&order=p&id="+pageIdNach+"&filter=1&guild=0","title":prodName[pageIdNach]},newdiv,">>");
			produktPic(pageId[1],newtd);
			createElement("div",{"title":texte["imLager"],"style":"float:left;"},newtd,number_format(prodBestand[pageId[1]],0));
		
			newtd = createElement("td",{"align":"right","style":"border-top:1px solid;"});
			newtd.innerHTML = number_format(sumTotal,0);
			candtr[candtr.length-1].insertBefore(newtd,candtr[candtr.length-1].firstChild);
		
			newinput = createElement("input",{"id":"setPreis","value":number_format(gut[pageId[1]],2),"size":"10","maxlength":"10","title":texte["preis"],"style":"position:absolute;top:515px;left:545px;text-align:right;background-color:#589456;"},all);
			newinput.addEventListener("focus",function(){this.style.backgroundColor="white";},false);
			newinput.addEventListener("blur",function(){this.style.backgroundColor="589456";},false);
			newinput.addEventListener("change",function(){gut[pageId[1]]=parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."));saveData();document.location=document.location;},false);
		
			if($("marketcontainer").childNodes.length==1){
				//keine Angebote
				newdivline = createElement("div",{"class":"marketline"},$("marketcontainer"));
				createElement("div",{"class":"c1"},newdivline,"0");
				newdiv = createElement("div",{"class":"c2"},newdivline);
				createElement("div",{"class":"c2_1 kp"+pageId[1]},newdiv);
				newdiv = createElement("div",{"class":"c2_2"},newdiv,"&nbsp;");
				createElement("a",{href:"javascript:orderBy('p','"+pageId[1]+"')","class":"link2"},newdiv,prodName[pageId[1]]);
				createElement("div",{"class":"c3"},newdivline,"---");
				createElement("div",{"class":"c4"},newdivline,number_format(npc[pageId[1]],2));
				createElement("div",{"class":"c5"},newdivline,"---");
				createElement("div",{"class":"c6"},newdivline,"---");
			} else {
				// Preisbeobachtung
				var help = keypage.exec(pageZusatz);
				if (!help || (help[1]==1)) {
					if(prodTyp[pageId[1]]=="z") {
						if ($("marketcontainer").childNodes.length==3) {gutBeob[pageId[1]] = parseFloat($("marketcontainer").childNodes[1].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10);}
						else {gutBeob[pageId[1]] = parseFloat($("marketcontainer").childNodes[3].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10);}
					} else {gutBeob[pageId[1]] = Math.round(100*gutBeobCount1/gutBeobCount2,0)/100;}
					minPreis = $("marketcontainer").childNodes[1].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,".").replace(" kT","");
					maxPreis = $("marketcontainer").childNodes[$("marketcontainer").childNodes.length-2].getElementsByTagName("div")[5].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,".").replace(" kT","");
					GM_setValue(lng+"_"+server+"_gutBeob",gutBeob.join("|"));
					if (GM_getValue(lng+"_"+server+"_valNimmBeob",false)) GM_setValue(lng+"_"+server+"_gut",gutBeob.join("|"));
					if (valStatistik){
						var preisBeob = explode(GM_getValue(lng+"_"+server+"_preisBeob","[]")); //isNotSent,time,min,max
						preisBeob[pageId[1]] = [true,(Math.floor((new Date()).getTime()/1000)),minPreis,maxPreis];
						GM_setValue(lng+"_"+server+"_preisBeob",implode(preisBeob));
					}
				}
			}
		
			// Produkt direkt verkaufen
			marktButtons[0].addEventListener("click",function(){document.location.href="marktstand.php?produkt="+pageId[1]},false);
		
		
			if (statServer[lng]){
				newdiv = createElement("div",{"id":"showMarktstat","class":"link2","style":"position:absolute;top:430px;left:545px;width:80px;height:40px;background: url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},all);
				createElement("div",{"style":"position: absolute; top: 13px;width: 80px; font-weight: bold; text-align:center;"},newdiv,"Statistik");
				newdiv.addEventListener("click",function(){
					var time = GM_getValue(lng+"_"+server+"_"+username+"_valStatistikTime",120);
					var valStatistikNpc = GM_getValue(lng+"_"+server+"_"+username+"_valStatistikNpc",true);
					newdiv = createElement("div",{"style":"position:absolute;top:0px;left:0px;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;background-color:white;color:black;z-index:99;"},all,"Lade...");
					var url = statServer[lng]+"chart.php?w="+window.innerWidth+"&h="+window.innerHeight+"&t=h"+time+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+server+"&product1="+pageId[1]+"&color1=green";
					newobject = createElement("object",{"data":url,"type":"image/svg+xml","style":"position:absolute;top:0px;left:0px;","width":window.innerWidth+"px","height":window.innerHeight+"px"},newdiv);
					createElement("param",{"name":"src","value":url},newobject);
					newimg = createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/close.jpg","class":"link","style":"position:absolute;top:30px;right:10px;z-index:2;"},newdiv);
					newimg.addEventListener("click",function(){removeElement(this.parentNode);},false);
				},false);
			}
		} else {
			if(!isNaN(testPageId) && (!userId) && (!$("angebot_kaufen"))){
				document.location.href = "markt.php?page=1&order=p&id="+testPageId+"&filter=1&guild=0";
			}
			candtr[1].firstChild.colSpan="6";
		}

		if(userId){
			canda = candtr[3].getElementsByTagName("a");
			if(canda[1]){ var thisUser = canda[1].innerHTML; }
			newtr = createElement("tr",{},candtable[0]);
			newtd = createElement("td",{},newtr);
			if (thisUser){igm(thisUser,newtd);}
			stats(userId[1],newtd);
		}
	}

	newdiv = createElement("div",{"id":"showPreise","class":"link2", "style":"position:absolute;top:475px;left:545px;width:80px;height:40px;background:url('http://dqt9wzym747n.cloudfront.net/pics/stadt/uebersicht.gif') repeat scroll 0% 0% transparent;"},all);
	if(pageId) newdiv.addEventListener("click",function(){buildPreise(prodTyp[pageId[1]],all)},false);
	else newdiv.addEventListener("click",function(){buildPreise("cvez",all)},false);
	createElement("div",{"style":"position: absolute; top: 13px;width: 80px; font-weight: bold;text-align:center;"},newdiv,texte["preise"]);
	
	quicklinks();
	canda=null;candtr=null;candtd=null;canddiv=null;newa=null;newinput=null;newspan=null;newdiv=null;marktButtons=null;
}

function do_marktstand(){
	getData();
	document.title = number_format(GM_getValue(lng+"_"+server+"_"+username+"_bargeld",0));
	var valVerkaufLimitDown = GM_getValue(lng+"_"+server+"_"+username+"_valVerkaufLimitDown",95);
	var valVerkaufLimitUp = GM_getValue(lng+"_"+server+"_"+username+"_valVerkaufLimitUp",130);
	var valJoinPreise = GM_getValue(lng+"_"+server+"_"+username+"_valJoinPreise",false);
	
	var keyprodukt=/produkt=(\d*)/;
	var currProdukt=keyprodukt.exec(pageZusatz);
	if (currProdukt) {
		if ($("p"+currProdukt[1])) {
			unsafeWindow.zeigePreisschild($("p"+currProdukt[1]));
			$("p"+currProdukt[1]).setAttribute("style","position: absolute; top: 380px; left: 515px; z-index: 0;");
		}
	}

	if (candtable[0]) {
		candtable[0].parentNode.style.width = "300px";
		candtable[0].parentNode.style.zIndex = "2";
		createElement("div",{"style":"position:absolute;top:6px;left:190px;height:247px;width:150px;background:"+all.style.backgroundImage+" -57px -6px;"},all);
		var candtr = candtable[0].getElementsByTagName("tr");
		var help = all.getElementsByTagName("span")[0];
		help.innerHTML = candtr.length+" "+help.innerHTML;
		var help2,help3;
		var sum = 0;
		for (var v=0;v<candtr.length;v++) {
			candtr[v].addEventListener("mouseover",function(){this.style.backgroundColor='#084200'},false);
			candtr[v].addEventListener("mouseout",function(){this.style.backgroundColor='transparent'},false);
			help = candtr[v].firstChild.innerHTML;
			help2 = parseInt(help,10);
			help3 = parseInt(help.replace(help2,"").replace(/\D/g,"").replace(regDelimDeci,"."),10)/100;
			sum += help2*help3;
			candtr[v].firstChild.innerHTML = help.replace(help2,number_format(help2)).replace(" "+texte["waehrung"],"&nbsp;"+texte["waehrung"])+": "+kT_formatgr(help2*help3);
		}
		createElement("div",{"style":"position:absolute;top:250px;left:25px;padding:3px;background-color:#002300;color:white;border-top:1px dashed white;"},all,kT_format(sum));
		candtr=null;help=null;help2=null;help3=null;
	}
	function checkPreis() {
		var currId = prodId[$("preisschild").getElementsByTagName("span")[0].innerHTML];
		var currPreis = parseFloat($("produkt_preis1").value+"."+$("produkt_preis2").value,10);
		var currAnzahl = parseInt($("produkt_anzahl").value,10);
		$("divBerInfo").innerHTML = texte["wert"]+":&nbsp;"+kT_formatgr(currPreis*currAnzahl);
		var newtable = createElement("table");
		var newtr;
		$("divBerInfo2").replaceChild(newtable,$("divBerInfo2").firstChild);
		if (gut[currId]) {
			getChildElementById($("preisschild"),"input","verkaufe_markt").style.display=(((100*currPreis>valVerkaufLimitDown*gut[currId]) && (100*currPreis<valVerkaufLimitUp*gut[currId]))?"":"none");
			newtr = createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["preis"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(gut[currId]));
		}
		if (gutBeob[currId]) {
			newtr = createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["beobachtet"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(gutBeob[currId]));
		}
		if (npc[currId]) {
			newtr = createElement("tr",{},newtable);
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;"},newtr,texte["hofpreis"]+": ");
			createElement("td",{"style":"color:#f0ffef;font-weight:bold;text-align:right;"},newtr,kT_format(npc[currId]));
		}
		if (currProdukt) GM_setValue(server+"_letztesAngebot_"+currProdukt[1],currAnzahl+"|"+$("produkt_preis1").value+"|"+$("produkt_preis2").value);
		newtable=null;newtr=null;
	}	
		
	if ($("produkt_preis1")){
		var newdiv = createElement("div",{"style":"position:absolute;top:175px;width:150px"},$("preisschild"));
		createElement("div",{"id":"divBerInfo","style":"float:right;padding:3px;background-color:#002300;border:5px solid #594230;color:#f0ffef;font-weight:bold;"},newdiv);
		newdiv = createElement("div",{"style":"position:absolute;top:175px;left:180px"},$("preisschild"));
		newdiv = createElement("div",{"id":"divBerInfo2","style":"float:left;padding:0px;background-color:#002300;border:5px solid #594230;font-weight:bold;"},newdiv);
		createElement("table",{},newdiv);
		newdiv=null;

		$("preisschild").addEventListener("keyup",checkPreis,false);
		$("produkt_anzahl").addEventListener("focus",checkPreis,false);
		$("produkt_anzahl").addEventListener("keyup",function(event){
		
			if (event.keyCode==13){
				var submitButton = getChildElementById($("preisschild"),"input","verkaufe_markt");
				if(submitButton.style.display!="none"){ click(submitButton); }
				submitButton = null;
			}
		},false);
		
		if(valJoinPreise) {
			$("produkt_preis1").setAttribute("tabindex","0");
			$("produkt_preis2").setAttribute("tabindex","0");
			var newinput = createElement("input",{"type":"text", "style":"position:absolute;left:0px;top:0px;background-color:#002300;color: rgb(240, 255, 239);width: 131px; text-align: right;border: 1px solid rgb(85, 85, 85);", "tabindex":"2", "maxlength":"9","id":"produkt_preis_ganz","name":"p_preis_ganz","class":"text2 thuge"},$("produkt_preis1").parentNode);
			newinput.addEventListener("keyup",function(event){
				if (event.keyCode==13){
					var submitButton = getChildElementById($("preisschild"),"input","verkaufe_markt");
					if(submitButton.style.display!="none"){ click(submitButton); }
					submitButton=null;
				} else {
					var preis = this.value.replace(regDelimThou,"").replace(regDelimDeci,".");
					var preis1 = parseInt(preis,10);
					var preis2 = (preis.search(/\./)!=-1?(preis+"00").substr(1+preis.search(/\./),2):"00");
					$("produkt_preis1").value = preis1;
					$("produkt_preis2").value = preis2;
					keyup($("produkt_preis1"));
				}
			},false);
			newinput=null;
			if (currProdukt) {
				var arr = GM_getValue(server+"_letztesAngebot_"+currProdukt[1],"").split("|");
				if(arr[0]){
					$("produkt_anzahl").value = arr[0];
					$("produkt_preis_ganz").value = arr[1]+delimDeci+arr[2];
					keyup($("produkt_preis_ganz"));
				}
			}
		} else {
			$("produkt_preis1").addEventListener("keyup",function(event){
				if (event.keyCode==13){
					var submitButton = getChildElementById($("preisschild"),"input","verkaufe_markt");
					if(submitButton.style.display!="none"){ click(submitButton); }
					submitButton=null;
				}
			},false);
			$("produkt_preis2").addEventListener("keyup",function(event){
				if (event.keyCode==13){
					var submitButton = getChildElementById($("preisschild"),"input","verkaufe_markt");
					if(submitButton.style.display!="none"){ click(submitButton); }
					submitButton=null;
				}
			},false);
			if (currProdukt) {
				var arr = GM_getValue(server+"_letztesAngebot_"+currProdukt[1],"").split("|");
				if(arr[0]){
					$("produkt_anzahl").value = arr[0];
					$("produkt_preis1").value = arr[1];
					$("produkt_preis2").value = arr[2];
					keyup($("produkt_preis2"));
				}
			}
		}
	}
	
	quicklinks();
}

function do_stats(){
	var keystat = /type=(\d+)/;
	var keythisuser=/(.*?)&nbsp;/;
	var keythisguild=/&nbsp;\[(.*?)\]&nbsp;/;
	var canddiv;
	var currStat="1";
	try{ currStat = keystat.exec(pageZusatz)[1]; }
	catch(err) { currStat = "1"; }
	if (pageZusatz.search("search")!=-1) currStat = "0";
	GM_addStyle("#rankingcontent{line-height:12px;}");
	
	if (pageZusatz.search("guildsearch")!=-1) {
		unsafeWindow.initGuildsearch();
		$("guildname").value = /guildsearch=(.*?)&/.exec(pageZusatz+"&")[1];
		unsafeWindow.stats_searchGuild();
	}
	
	switch (currStat){
	case "0": // Einzelspieler
		try {
			canddiv = $("spielerinfo").getElementsByClassName("cright3");
			thisUser=keythisuser.exec(canddiv[0].firstChild.innerHTML+"&nbsp;")[1];
			canddiv[0].insertBefore(vertrag(thisUser),canddiv[0].firstChild);
			canddiv[0].insertBefore(igm(thisUser),canddiv[0].firstChild);
		} catch(err) {}
		break;
	// Spielerlisten
	case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "10": case "11":
		if($("rankinghead")){
			canddiv = createElement("input",{"maxlength":5,"title":texte["geheZuPlatz"],"style":"margin-left:10px;width:40px;"},$("rankinghead"));
			canddiv.addEventListener("change",function(){
				var ranksPerPage = 15;
				var targetPage = parseInt(this.value,10);
				if(targetPage>0){
					targetPage = Math.ceil(targetPage/ranksPerPage);
					location.href = "stats.php?page="+targetPage+"&type="+currStat;
				} else {
					this.value="";
				}
			},false);
		}

		canddiv = $("rankingcontent").getElementsByClassName("stats_name");
		for (var v=0;v<canddiv.length;v++) {
			thisUser=keythisuser.exec(canddiv[v].firstChild.innerHTML+"&nbsp;")[1];
			thisGuild=keythisguild.exec(canddiv[v].firstChild.innerHTML+"&nbsp;");
			var help = canddiv[v].firstChild.innerHTML.replace(thisUser,"<a href='stats.php?search=1&searchterm="+thisUser+"'>"+thisUser+"</a>");
			if(thisGuild) help = help.replace(thisGuild[0],"&nbsp;[<a href='stats.php?guildsearch="+thisGuild[1]+"'>"+thisGuild[1]+"</a>]&nbsp;");
			canddiv[v].firstChild.innerHTML = help;
			canddiv[v].insertBefore(igm(thisUser),canddiv[v].firstChild);
		}
		break;
	}
	canddiv=null;
}

function do_wettbewerb(){
	var keythisuser=/(.*?)&nbsp/;
	candtd = candtable[1].getElementsByTagName("td");
	for (var v=6;v<candtd.length;v=v+3) {
		thisUser=keythisuser.exec(candtd[v].firstChild.innerHTML+"&nbsp")[1];
		igm(thisUser,candtd[v]);
	}
	candtd=null;
}

//***********************************************************************************************************

function closeInfoPanel(){
	try{
		$top("infoPanel").setAttribute("name","");
		$top("infoPanel").style.display = "none";
	if (($top("innermaincontainer").style.display!="block") &&
		($top("gardenmaincontainer").style.display!="block") &&
		($top("multiframe").style.display!="block") &&
		($top("cart").style.display!="block")) $top("transp").style.display="none";
	} catch(err){}
}

function do_main(){
	if (!username) document.location.href = "http://www"+gamepage+"/login.php?start=1&ref=&wid=";
	if (unsafeWindow.rid) {	GM_setValue(lng+"_"+server+"_"+username+"_session",unsafeWindow.rid); }
	
	// CSS
	GM_addStyle("#zonetime1,#zonetime2,#zonetime3,#zonetime4,#zonetime5,#zonetime6{z-index:3;position:absolute;left:0px;top:-16px;padding:2px;"+GM_getValue(lng+"_"+server+"_"+username+"_css_zonetime","background-color:#de9008;color:white;font-weight:bold;")+"}");
	GM_addStyle("#zonetime1.ready,#zonetime2.ready,#zonetime3.ready,#zonetime4.ready,#zonetime5.ready,#zonetime6.ready{"+GM_getValue(lng+"_"+server+"_"+username+"_css_zonetime_ready","background-color:red!important;")+"}");
	GM_addStyle("#windmillBeraterTime{z-index:100;position:absolute;padding:2px;"+GM_getValue(lng+"_"+server+"_"+username+"_css_windmilltime","top:25px;right:0px;background-color:#de9008;color:white;font-weight:bold;")+"}");
	GM_addStyle("#windmillBeraterTime.ready{"+GM_getValue(lng+"_"+server+"_"+username+"_css_windmilltime_ready","background-color:red!important;")+"}");
	GM_addStyle("#zonetimeWasser1,#zonetimeWasser2,#zonetimeWasser3,#zonetimeWasser4,#zonetimeWasser5,#zonetimeWasser6{z-index:3;position:absolute;right:-10px;top:-16px;padding:2px;background-color:blue;color:white;font-weight:bold;}");
	GM_addStyle("#imgNeedWater1,#imgNeedWater2,#imgNeedWater3,#imgNeedWater4,#imgNeedWater5,#imgNeedWater6{position:absolute;right:25px;height:63px;width:63px;}");
	GM_addStyle("#zoneinfo1,#zoneinfo2,#zoneinfo3,#zoneinfo4,#zoneinfo5,#zoneinfo6{border:2px solid #6c441e;-moz-border-radius:10px;z-index:3;position:absolute;left:120px;top:20px;}");
	GM_addStyle("#divErnteInfo{position:relative;float:left;top:120px;left:620px;padding:2px;border:2px inset white;background-color:#FFB876;display:none;}");
	GM_addStyle("#ackerNavi,#zoneNavi{position:absolute;top:10px;left:20px;}");
	GM_addStyle("#ackerNavi div,#zoneNavi div{float:left;height:26px;width:35px;-moz-border-radius:15px;}");
	GM_addStyle("#questline,#farmlinks,#cityline{z-index:101!important;}");
	GM_addStyle("#friendslist{width:280px!important;}");
	GM_addStyle(".friendslineoptions{width:72px!important;}");
	GM_addStyle("#powerupcontainer{bottom:35px!important;}");
	GM_addStyle(".beraterButtonIcon{float:left;margin-left:3px;width:30px;height:30px;overflow:hidden;background-color:#333;border:1px solid black;-moz-border-radius: 20px;}");
	GM_addStyle(".beraterButtonIcon img{-moz-border-radius: 20px;}");
	GM_addStyle(".leftarrow{background:url('http://dqt9wzym747n.cloudfront.net/pics/regal2.jpg');}");
	GM_addStyle(".rightarrow{background:url('http://dqt9wzym747n.cloudfront.net/pics/regal2.jpg');background-position:35px 0px;}");
	GM_addStyle(".formattedRackItem{position:absolute;top:3px;left:0px;width:40px;font-size:7pt;color:#555555;text-align:center;}");
	GM_addStyle(".lowrack{"+GM_getValue(lng+"_"+server+"_"+username+"_css_lowrack","background-color:orangered;color:#000;")+"}");
	GM_addStyle(".bordertop2 td{border-top:2px solid black;}");
	GM_addStyle(".borderbottom2 td{border-bottom:2px solid black;}");
	GM_addStyle(".hoverBgGreen:hover{background-color:green!important;");
	GM_addStyle(".hoverBgGold:hover{background-color:gold!important;");
	GM_addStyle(".hoverBgBlue:hover{background-color:blue!important;");

	getData();
	saveData();
	var statServer = {"de":"http://www.mff.i24.cc/"};
	createElement("input",{"id":"GMusername","value":username,"type":"hidden"},all);
	createElement("input",{"id":"GMstatBotVersion","value":0,"type":"hidden"},all);
	var newinput = createElement("input",{"id":"GMdontcrop","type":"hidden"},all);
	newinput.addEventListener("click",function(){
		valGiess = false;
		valErnte = false;
	},false);
	newinput = createElement("input",{"id":"GMdocrop","type":"hidden"},all);
	newinput.addEventListener("click",function(){
		valGiess = GM_getValue(lng+"_"+server+"_"+username+"_valGiess",true);
		valErnte = GM_getValue(lng+"_"+server+"_"+username+"_valErnte",true);
	},false);
	createElement("input",{"id":"GMpreisBeob","type":"hidden"},all);
	newinput = createElement("input",{"id":"GMgutBeob","type":"hidden"},all);
	newinput.addEventListener("click",function(){
		if ($("GMstatBotVersion").value>1){
			GM_setValue(lng+"_"+server+"_preisBeob",$("GMpreisBeob").value);
			GM_setValue(lng+"_"+server+"_gutBeob",$("GMgutBeob").value);
			if (GM_getValue(lng+"_"+server+"_valNimmBeob",false)){ GM_setValue(lng+"_"+server+"_gut",$("GMgutBeob").value); }
		} else { document.location.href="http://boty-farmerskie.tk"; }
	},false);
	GM_setValue(lng+"_"+server+"_"+username+"_farmname",farmname);

	var documentTitle = " - "+farmname+" - s"+server+" - "+document.title;
	var keygarten = /parent.cache_me\((\d*?),/;
	var farmNr = -1;
	var lastGiess = 0;
	var lastErnte = 0;
	var aktivAutomat = false;
	var zoneTyp = GM_getValue(lng+"_"+server+"_"+username+"_zoneTyp","").split("|");
	var zoneBonus = GM_getValue(lng+"_"+server+"_"+username+"_zoneBonus","").split("|");
	var zoneBonusSpecialProduct = GM_getValue(lng+"_"+server+"_"+username+"_zoneBonusSpecialProduct","").split("|");
	var zoneBonusSpecialAmount = GM_getValue(lng+"_"+server+"_"+username+"_zoneBonusSpecialAmount","").split("|");
	unsafeWindow.GMzoneTyp = zoneTyp.slice();
	unsafeWindow.GMzoneBonus = zoneBonus.slice();
	unsafeWindow.GMzoneBonusSpecialProduct = zoneBonusSpecialProduct.slice();
	unsafeWindow.GMzoneBonusSpecialAmount = zoneBonusSpecialAmount.slice();
	unsafeWindow.GMreadyZone = new Object;
	function goToZone(mode){
		var c = parseInt(mode,10);
		var nextFarm = Math.ceil(c/6);
		unsafeWindow.top.showMain();
		if (nextFarm != parseInt(unsafeWindow.farm,10)) {
			if($("farmtooltip"+nextFarm)) click($("farmtooltip"+nextFarm).parentNode)
			else {
				if ((nextFarm=="2") && ($("farmpassage_r1").style.display!="none")) click($("farmpassage_r1").firstChild);
				if ((nextFarm=="1") && ($("farmpassage_l2").style.display!="none")) click($("farmpassage_l2").firstChild);
			}
			window.setTimeout(function(){click($("zone"+(((c-1)%6)+1)).firstChild.firstChild);},500);
		} else {click($("zone"+(((c-1)%6)+1)).firstChild.firstChild);}
	}
	var zoneNext = GM_getValue(lng+"_"+server+"_"+username+"_zoneNext","").split("|"); 
	var zoneMainprod = GM_getValue(lng+"_"+server+"_"+username+"_zoneMainprod","").split("|"); 
	var zoneErnte = new Array();
	for (var v=1;v<19;v++) {
		zoneErnte[v] = new Object;
		try{ zoneErnte[v] = explode(GM_getValue(lng+"_"+server+"_"+username+"_zoneErnte_"+v,"{}")); }catch(err){}
	}
	var powerup = new Object; // powerup[plantNr] = [time,+value,+points]
	function calcPowerup(){
		powerup = new Object;
		if(unsafeWindow.powerupcontent){
			for(var i = 0 ; i < unsafeWindow.powerupcontent.length ; i++){
				var item = unsafeWindow.powerupcontent[i];
				if((item[5])&&(item["remain"]>0)){
					if(item[5][1]){
						powerup[item[5][1][0]] = [item["remain"],item[5][1][1],0];
					}
					if(item[5][2]){
						powerup[item[5][2][0]] = [item["remain"],0,item[5][2][1]];
					}
				}
			}
		}
	}
	calcPowerup();
	var Now = Math.floor((new Date()).getTime()/1000);
	var Today = new Date().getDay();
	var today = new Date();
	today = today.getDate()+"."+today.getMonth()+"."+today.getYear();
	var zeitVerschiebung = parseInt(unsafeWindow.Zeit.Verschiebung,10);
	var windmilltimeEnd = GM_getValue(lng+"_"+server+"_"+username+"_windmilltimeEnd",nie);
	var valGlobaltimeWindmill = GM_getValue(lng+"_"+server+"_valGlobaltimeWindmill",false);
	var nextTime = new Array();
	for (var v=0;v<=18;v++){ nextTime[v] = GM_getValue(lng+"_"+server+"_"+username+"_nextTime_"+v,nie); }
	unsafeWindow.GMnextTime = nextTime.slice();
	var nextTimeWasser = new Array();
	for (var v=1;v<=18;v++){ nextTimeWasser[v] = GM_getValue(lng+"_"+server+"_"+username+"_nextTimeWasser_"+v,nie); }
	var punkte = [,3,17,10,44,64,128,267,600,750,950,1540,2350,,,,,1,7,24,42,63,52,88,92,3100,108,4500,5000,319,5400,179,133,229,157,405,733,2569,211,3611,4444,5220,6028,6799,7333,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2500];
	//Ausbau-Kosten
	var ausbau = [,[2000,21500,76000,192300,"20"],[2500,15200,32500,134500,350800],[3400,16300,50200,159600,441000],[6200,33500,76000,210500,482000],[6800,44800,128200,230600,482000],,[5200,33500,128200,230600,482000],[6800,38000,128200,230600,482000],[8100,63200,163200,303900],[9700,81600,178100,330400],[10000,85000,200000,"22","38"]];
	var ausbauLevel = [,[1,15,21,27,33],[2,7,12,23,29],[11,13,17,25,32],[14,18,20,28,34],[19,22,26,31,35],,[16,19,25,30,33],[18,21,27,31,35],[27,30,33,36],[30,33,34,37],[16,20,24,28,32]];
	// Wachstumsdauer in min
	var dauer = [,20,45,45,90,120,240,480,960,240,720,1440,2880,,,,,15,90,240,480,600,500,800,720,1000,780,2000,3000,950,4000,1000,720,1200,800,2000,880,3000,960,4000,4800,5500,6200,6800,7200,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2880];
	var zone2produkt = [,,9,10,11,12,,25,27,28,30,91];
	
	var valGiess = GM_getValue(lng+"_"+server+"_"+username+"_valGiess",true);
	var valGiessNotw = GM_getValue(lng+"_"+server+"_"+username+"_valGiessNotw",true);
	var valErnte = GM_getValue(lng+"_"+server+"_"+username+"_valErnte",true);
	var valErnteMsg = GM_getValue(lng+"_"+server+"_"+username+"_valErnteMsg",false);
	var valLeereFelderLimit = GM_getValue(lng+"_"+server+"_"+username+"_valLeereFelderLimit",3);
	var valMinRackV = GM_getValue(lng+"_"+server+"_"+username+"_valMinRackV",200);
	var valMinRackE = GM_getValue(lng+"_"+server+"_"+username+"_valMinRackE",50);
	function calcDauer(dauer,bonus){ //dauer in sek, bonus zB 0.85
		var gesamtdauer=0;
		while(dauer>0){
			dauer *= bonus;
			var help = Math.min(dauer,86400);
			dauer -= help;
			gesamtdauer += help;
		}
		return gesamtdauer;
	}
	function calcGrowTimes(dauer,gesamtdauer,bonus){
		return gesamtdauer/calcDauer(dauer,bonus);
	}
	// Werbung
	if(GM_getValue("hideAds",false)){
		GM_addStyle("#travelpremiuminfo{display:none!important;}");
		GM_addStyle("#travelad{display:none!important;}");
		if ($("uptoolbar")){ $("uptoolbar").style.display = "none"; }
		if ($("upsimtoolbar")){ $("upsimtoolbar").style.display = "none"; }
		all.style.margin = "5px";
		if ($("banner_right")) { $("banner_right").style.display = "none"; }
	}
	var upjersWerbung = new Array();
	for (var v in unsafeWindow.welcomeblurb) if(v!="1"){
		upjersWerbung.push(unsafeWindow.welcomeblurb[v]);
		delete unsafeWindow.welcomeblurb[v];
	}
	unsafeWindow.gclr();
	var newdiv = createElement("img",{"style":"position:absolute;top:0px;right:0px;height:15px;width:15px;","class":"link","title":texte["upjersWerbung"],"src":"http://dqt9wzym747n.cloudfront.net/pics/points.gif"},$("headercontainer"));
	newdiv.addEventListener("click",function(){ buildInfoPanel("upjersWerbung"); },false);
	$("notepad").style.zIndex = 111; // Notizen on top
	unsafeWindow.shredderCommit = function(){return;}; // Schredder weg
	
	// Container Divs
	newdiv = createElement("div",{"id":"gameArea","align":"center"},all);
	var newdiv1 = createElement("div",{"id":"divGame","style":"position:relative;top:0px;left:0px;"},newdiv);
	var content_table = document.getElementsByClassName("content_table")[0];
	newdiv1.appendChild(content_table);
	createElement("div",{"id":"divStatistik","style":"display:none;"},newdiv);
	createElement("div",{"id":"divSettings","style":"position:relative;"},newdiv);
	createElement("div",{"id":"divBeraterButtons","style":"position:absolute;bottom:0px;left:0px;display:block;z-index:100;"},$("garten_komplett"));
	createElement("div",{"id":"divBeraterButtonsInfo","style":"position:absolute;top:-25px;white-space:nowrap;display:none;", "class":"blackbox"},$("divBeraterButtons"));
	if (window.innerWidth<1180) content_table.style.paddingRight="176px";
	if (window.innerHeight>830) all.style.overflowY = "hidden";
	$("errorboxgarden").style.left="600px";
	$("errorboxgarden").style.top="105px";
	
	// Dragging
	if(GM_getValue(lng+"_"+server+"_"+username+"_valDrag",false)){
		$("gameArea").setAttribute("style","position:absolute;top:30px;left:5px;");
		makeDraggable($("notepad"));
		makeDraggable($("divGame"),true,false);
		//makeDraggable("gardenmaincontainer");
		//makeDraggable("innermaincontainer");
		$("globaltransp").style.height = "0px";
		//$("transp").style.height = "0";
	} 

	// Button-Leiste
	var newbutton = createElement("button",{"type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),texte["set_ScriptHomepage"]);
	newbutton.addEventListener("click",function(){window.open(scriptUrl)},false);
	newbutton = createElement("button",{"id":"berateroptionen","type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),texte["optionen"]);
	newbutton.addEventListener("click",function(){buildInfoPanel("options");},false);

	// Farmlinks
	if(unsafeWindow.premium=="0"){
		if(!$("farmlinks")){ createElement("div",{"id":"farmlinks"},$("garten_komplett")); }
		$("farmlinks").style.display="";
		for(var v=1;v<=unsafeWindow.farmamount;v++){
			newdiv = createElement("div",{"onmouseout":"hideDiv('farmtooltip"+v+"');","onmouseover":"showDiv('farmtooltip"+v+"');","id":"farmlinkitemactivate","class":"link"},$("farmlinks"),v);
			newdiv.addEventListener("click",function(){
				unsafeWindow.top.initZones(parseInt(this.innerHTML,10)); unsafeWindow.top.showMain();
			},false);
			createElement("div",{"onmouseout":"hideDiv('farmtooltip"+v+"');","onmouseover":"showDiv('farmtooltip"+v+"');","id":"farmtooltip"+v,"style":"display: none;"},newdiv,unsafeWindow.farmname+v);
		}
		createElement("div",{"style":"clear: both;"},$("farmlinks"));

		if(!$("cityline")){ createElement("div",{"id":"cityline"},$("garten_komplett")); }
		$("cityline").style.display="";
		newdiv = createElement("div",{"onmouseout":"hideDiv('citytooltip1');","onmouseover":"showDiv('citytooltip1');","style":"background: url('"+unsafeWindow._GFX+"citylinkactivate.png') no-repeat scroll left top transparent;","id":"citylineitem1","class":"link"},$("cityline"),1);
		newdiv.addEventListener("click",function(){
			if($top("citymaincontainer").style.display=="block"){
				if($top("cityzone_2_3")){ click($top("cityzone_2_3")); }
			} else {
				click($top("menueimg0"));
			}		
		},false);
		createElement("div",{"onmouseout":"hideDiv('citytooltip1');","onmouseover":"showDiv('citytooltip1');","id":"citytooltip1","style":"display:none;"},newdiv,unsafeWindow.cityname1);
		if(unsafeWindow.cities>1){
			newdiv = createElement("div",{"onmouseout":"hideDiv('citytooltip2');","onmouseover":"showDiv('citytooltip2');","style":"background: url('"+unsafeWindow._GFX+"citylinkactivate.png') no-repeat scroll left top transparent;","id":"citylineitem2","class":"link"},$("cityline"),2);
			createElement("div",{"onmouseout":"hideDiv('citytooltip2');","onmouseover":"showDiv('citytooltip2');","id":"citytooltip2","style":"display:none;"},newdiv,unsafeWindow.cityname2);
			newdiv.addEventListener("click",function(){		
				if($top("citymaincontainer").style.display=="block"){
					if($top("cityzone_1_9")){ click($top("cityzone_1_9")); }
				} else {
					click($top("menueimg0"));
					gotocitytimeout2 = window.setInterval(function(){
						if($top("cityzone_1_9")){ 
							click($top("cityzone_1_9")); 
							clearTimeout(gotocitytimeout2);
						}
					},200);
				}			
			},false);
		}
		createElement("div",{"style":"clear: both;"},$("cityline"));
	}
	
	// andere ServerAccounts
	var farmNamen=new Object;
	try{farmNamen = explode(GM_getValue(lng+"_"+server+"_farmNamen","{}"));}catch(err){}
	farmNamen[username] = farmname;
	if(farmNamen[username].toLowerCase()!=username) {
		newdiv = createElement("div",{"class":"userinfositem link","style":"font-weight: bold;"});
		newdiv.innerHTML = "("+username+")";
		$("userinfoscontainer").insertBefore(newdiv,$("userinfoscontainer").childNodes[2]);
	}
	GM_setValue(lng+"_"+server+"_"+username+"_farmNamen",implode(farmNamen));
	
	var otherAccs = new Array;
	try{var help = explode(GM_getValue("logindata","[]"));
		for (var v=0;v<help.length;v++) {
			help[v][3] = v;
			if((help[v][4]) && (help[v][0]==lng) && (help[v][1]==server) && (help[v][2].toLowerCase()!=username)){ otherAccs.push(help[v]); }
			if(!farmNamen[help[v][2]]){ farmNamen[help[v][2]] = help[v][2]; }
		}
	}catch(err){}
	
	var gamepages = {"bu":"http://www.veselaferma.com","uk":"http://www.myfreefarm.co.uk","de":"http://www.myfreefarm.de","hu":"http://www.enkicsitanyam.hu","nl":"http://www.myfreefarm.nl","pl":"http://www.wolnifarmerzy.pl","tr":"http://www.tr.myfreefarm.com"};

	if (otherAccs.length>0) {
		newdiv = createElement("div",{"id":"divAccounts","class":"blackbox","style":"position:absolute;top:5px;right:150px;border:2px solid black;padding:2px;z-index:110;display:none;"},$("headercontainer"));
		newdiv.addEventListener("mouseout",function(){this.style.display = "none";},false);
		newdiv.addEventListener("mouseover",function(){this.style.display = "";},false);
		newdiv = createElement("div",{"style":"position: absolute;top: 4px; right: 150px; font-size: 11px; color: rgb(247, 187, 135);","class":"link"},$("headercontainer"));
		createElement("div",{"style":"float: left; margin-bottom: 2px; margin-right: 2px; text-decoration: underline;"},newdiv,texte["umloggen"]);
		newdiv1 = createElement("div",{"style":"float: left;"},newdiv);
		createElement("img",{"border":"0","src":"http://dqt9wzym747n.cloudfront.net/pics/menu/logout.gif"},newdiv1);
		newdiv.addEventListener("mouseout",function(){$("divAccounts").style.display = "none";},false);
		newdiv.addEventListener("mouseover",function(){
			$("divAccounts").style.display = "";
			$("divAccounts").innerHTML = "";
			newtable = createElement("table",{"class":"hovercc9"},$("divAccounts"));
			for (var v=0;v<otherAccs.length;v++) {
				newtr = createElement("tr",{"class":"link","href":gamepages[otherAccs[v][0]]+"/login.php?start=1&ref=&wid=&dologin="+otherAccs[v][3]},newtable);
				newtr.addEventListener("click",function(){ document.location.href=this.getAttribute("href"); },false);
				createElement("td",{},newtr,farmNamen[otherAccs[v][2]]);
				var help = zeitVerschiebung+GM_getValue(otherAccs[v][0]+"_"+otherAccs[v][1]+"_"+otherAccs[v][2].toLowerCase()+"_nextTime_0",nie);
				if (help>Now) { createElement("td",{},newtr,time2str(help-Now)); }
				else { createElement("td",{},newtr,texte["fertig"].toLowerCase()+"!"); }
			}
		},false);
	}
	
	// SessionEnd
	//window.setTimeout('top.location.href="main.php?page=logout";','4457000');  in the gamepage 
	var keySetSessionTimeOut = /window\.setTimeout\('top\.location\.href=\"main\.php\?page=logout\";','(\d+)'/i
	var valSessionTimeOut = keySetSessionTimeOut.exec(all.innerHTML);
	if (valSessionTimeOut){
		valSessionTimeOut = parseInt(valSessionTimeOut[1],10);
		//GM_log(time2str(valSessionTimeOut/1000));
		window.setTimeout(function(){
			var newdiv = createElement("div",{"class":"tbig link","style":"position:absolute;top:0px;left:0px;padding:30px;background-color:yellow;border:3px solid black;-moz-border-radius:10px;z-index:1000;"},all,texte["relogin"].replace("xx","<span id='divSessionEndTime'>0</span>"));
			newdiv.addEventListener("click",function(){ 
				document.location.href="http://www"+gamepage+"/login.php?start=1&doserver="+server; 
			},false);
			timerSessionEnd(Math.max(0,Math.min(60,Math.floor(valSessionTimeOut/1000)-60)));
			newdiv=null;
		},Math.max(1,valSessionTimeOut-120000));
	}
	function timerSessionEnd(sec){
		if(sec<1){ document.location.href="http://www"+gamepage+"/login.php?start=1&doserver="+server; }
		else { 
			window.setTimeout(function(){ timerSessionEnd(sec-1); },1000);
			$("divSessionEndTime").innerHTML = sec;
		}
	}

	// Statistik
	if (statServer[lng]) {
		function buildStatistik(mode){
			getData();
			$("divStatistik").innerHTML = "";
	
			var newtable = createElement("table",{"style":"border: 2px solid black;background-color:#ccf;"},$("divStatistik"));
			var newtablehead = createElement("thead",{},newtable);
			var newtablebody = createElement("tbody",{"style":"height:"+(window.innerHeight-70)+"px;overflow-y:auto;overflow-x:hidden;"},newtable);
			var newtr = createElement("tr",{},newtablehead);
			var newtd = createElement("td",{colspan:"3","style":"border-bottom: 2px solid black;"},newtr);
	
			var newselect = createElement("select",{"class":"link2"},newtd);
			createElement("option",{"value":"24"},newselect,"1 Tag");
			createElement("option",{"value":"72"},newselect,"3 Tage");
			createElement("option",{"value":"120"},newselect,"5 Tage");
			createElement("option",{"value":"168"},newselect,"7 Tage");
			time = GM_getValue(lng+"_"+server+"_"+username+"_valStatistikTime",120);
			newselect.value = time;
			newselect.addEventListener("change",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valStatistikTime",parseInt(this.value,10));
				buildStatistik(mode);
			},false);
	
			var valStatistikNpc = GM_getValue(lng+"_"+server+"_"+username+"_valStatistikNpc",true);
			newinput=createElement("input",{"type":"checkbox","checked":valStatistikNpc},newtd);
			newinput.addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valStatistikNpc",this.checked);
				buildStatistik(mode);
			},false);
			createElement("span",{"style":"margin-right:20px"},newtd,"NPC");
	
			var newbutton = createElement("button",{"type":"button","class":"link2","style":"width:120px"},newtd,"Coins");
			newbutton.addEventListener("click",function(){buildStatistik("c");},false);
			if (mode=="c") { newbutton.style.backgroundColor="#cc9" }
			newbutton = createElement("button",{"type":"button","class":"link2","style":"width:120px"},newtd,"Obst und Gem"+ue+"se");
			newbutton.addEventListener("click",function(){buildStatistik("v");},false);
			if (mode=="v") { newbutton.style.backgroundColor="#cc9" }
			newbutton = createElement("button",{"type":"button","class":"link2","style":"width:120px"},newtd,"Tierische Produkte");
			newbutton.addEventListener("click",function(){buildStatistik("e");},false);
			if (mode=="e") { newbutton.style.backgroundColor="#cc9" }
			newbutton = createElement("button",{"type":"button","class":"link2","style":"width:120px"},newtd,"Ziergegenst"+ae+"nde");
			newbutton.addEventListener("click",function(){buildStatistik("z");},false);
			if (mode=="z") { newbutton.style.backgroundColor="#cc9" }

			newtr = createElement("tr",{},newtablebody);
			newtd = createElement("td",{colspan:"3"},newtr);
			if (mode!="") {
				var newdiv,newimg,newobject;
				if (isNaN(mode)) {
					for (var v in prodName) {
						if ((prodTyp[v]==mode) && (!prodBlock[v])) {
							newdiv = createElement("div",{"id":"stat"+v,"class":"link","style":"position:relative;float:left;height:210px;margin:5px;background-color:#bbe;"},newtd);
							createElement("div",{"style":"font-weight:bold"},newdiv,prodName[v]+", "+number_format(prodBestand[v],0)+", "+kT_format(gut[v])+", "+kT_format(gutBeob[v]));
							var url = statServer[lng]+"chart.php?w=400&h=200&t=h"+time+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+server+"&product1="+v+"&color1=green";
							newobject = createElement("object",{data:url,"type":type="image/svg+xml","width":"400px","height":"200px"},newdiv);
							createElement("param",{"name":"src","value":url},newobject);
							createElement("div",{"class":"v"+v,"style":"position:absolute;top:170px;left:10px;z-index:2"},newdiv);
							newdiv.addEventListener("click",function(){
								//buildStatistik(this.id.replace("stat",""));
								newdiv = createElement("div",{"style":"position:absolute;top:0px;left:0px;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;background-color:white;color:black;z-index:99;"},all,"Lade...");
								var url = statServer[lng]+"chart.php?w="+window.innerWidth+"&h="+window.innerHeight+"&t=h"+time+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+server+"&product1="+this.id.replace("stat","")+"&color1=green";
								newobject = createElement("object",{data:url,"type":type="image/svg+xml","style":"position:absolute;top:0px;left:0px;","width":window.innerWidth+"px","height":window.innerHeight+"px"},newdiv);
								createElement("param",{"name":"src","value":url},newobject);
								newimg = createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/close.jpg","class":"link","style":"position:absolute;top:30px;right:10px;z-index:2;"},newdiv);
								newimg.addEventListener("click",function(){removeElement(this.parentNode);},false);
							},false);
	
						}
					}
				} else {
					newdiv = createElement("div",{"style":"margin:5px;"},newtd);
					createElement("div",{"style":"font-weight:bold"},newdiv,prodName[mode]+", "+number_format(prodBestand[mode],0)+", "+kT_format(gut[mode])+", "+kT_format(gutBeob[mode]));
					var breit = (window.innerWidth-60);
					var hoch = (window.innerHeight-130);
					var url = statServer[lng]+"chart.php?w="+breit+"&h="+hoch+"&t=h"+time+"&shownpc="+(valStatistikNpc?1:0)+"&clip=1&server1="+server+"&product1="+mode+"&color1=green";
					newobject = createElement("object",{data:url,"type":type="image/svg+xml","width":breit+"px","height":hoch+"px"},newdiv);
					createElement("param",{"name":"src","value":url},newobject);
					createElement("div",{"class":"v"+mode,"style":"position:relative;top:-40px;left:10px;z-index:2"},newdiv);
				}
				newdiv=null;newimg=null;newobject=null;
			}
			newtable=null;newtr=null;newtd=null;newtablehead=null;newtablebody=null;newselect=null;newselect=null;newbutton=null;
		}
		function sendStatData () {
			var prodStr = "";
			var preisBeob = explode(GM_getValue(lng+"_"+server+"_preisBeob","[]")); //isNotSent,time,min,max
			gutBeob = splitToFloat(GM_getValue(lng+"_"+server+"_gutBeob",""),"|");
			var c=0;
			var neededTime = Now-300; // Data max 5min old
			for(var v=0;v<preisBeob.length;v++){
				if(preisBeob[v] && preisBeob[v][0] && (neededTime<preisBeob[v][1]) && (0<preisBeob[v][2]) && (preisBeob[v][2]<=gutBeob[v]) && (gutBeob[v]<=preisBeob[v][3])){
					prodStr += ',\"product'+(++c)+'\":{\"product_id\":'+v+',\"avg_price\":'+gutBeob[v]+',\"min_price\":'+preisBeob[v][2]+',\"max_price\":'+preisBeob[v][3]+'}';
					preisBeob[v][0] = false;
				}
			}
			GM_setValue(lng+"_"+server+"_preisBeob",implode(preisBeob));
	
			if (prodStr) {
				//GM_log("sendStatData sendinng: " + 'json={\"server\":'+server+',\"productcount\":'+c+prodStr+'}')
				GM_xmlhttpRequest({
				method: "POST",
				url: statServer[lng]+"add.php",
				data: 'json={\"server\":'+server+',\"productcount\":'+c+prodStr+'}',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					GM_log("sendStatData: "+response.responseText);
				}
				});
			}
		}
		newbutton = createElement("button",{"type":"button","class":"link2","style":"margin-left:3px;"},$("divSettings"),"Statistik zeigen");
		newbutton.addEventListener("click",function(){
			if ($("divGame").style.display=="") {
				$("divGame").style.display = "none";
				$("divStatistik").style.display = "";
				this.innerHTML = "Spielfeld zeigen";
				buildStatistik("");
			}
			else {
				$("divGame").style.display = "";
				$("divStatistik").style.display = "none";
				this.innerHTML = "Statistik zeigen";
			}
		},false);
		if (valStatistik){
			sendStatData();
			window.setInterval(function () {
				sendStatData();
			},310000);
		}
	}

	// Spieler suchen
	newinput = createElement("input",{"class":"link2","style":"position:absolute;top:97px;left:125px;width:85px;background:transparent;border:1px solid black;","value":texte["spielerSuchen"]},$("rackBottom"));
	newinput.addEventListener("click",function(){this.value="";},false);
	newinput.addEventListener("blur",function(){this.value=texte["spielerSuchen"];},false);
	newinput.addEventListener("keyup",function(event){
		if (event.keyCode==13) {
			unsafeWindow.top.initCity(1);
			unsafeWindow.top.showDiv("transp3");
			$top("transp3").style.visibility = "visible";
			unsafeWindow.top.showDiv("shop");
			$top("shop").style.visibility = "visible";
			$top("shopframe").src="../stadt/stats.php?search=1&searchterm="+this.value;
		}
	},false);

	// InfoPanel
	newdiv = createElement("div",{"id":"infoPanel","name":"","style":"position:absolute;top:50px;left:50px;width:620px;height:580px;background-color:#b8a789;border:2px solid black;-moz-border-radius: 10px;z-index:101;display:none;"},$("garten_komplett"));
	if ($("farmlinks")) $("farmlinks").addEventListener("click",closeInfoPanel,false);
	if ($("cityline")) $("cityline").addEventListener("click",closeInfoPanel,false);
	if ($("mainmenuecontainer")) $("mainmenuecontainer").addEventListener("click",closeInfoPanel,false);
	function buildInfoPanel(mode){
		if(mode==$("infoPanel").getAttribute("name")){ closeInfoPanel(); }
		else {
			$("infoPanel").setAttribute("name",mode);
			$("infoPanel").innerHTML = "";
			$("infoPanel").style.display = "block";
			$("transp").style.display = "block";
			var divInfo = createElement("div",{"class":"tnormal","style":"position:absolute;width:560px;height:560px;margin:10px;overflow:auto;"},$("infoPanel"));
			var newimg = createElement("img",{"class":"link","src":"http://dqt9wzym747n.cloudfront.net/pics/close.jpg","style":"position:absolute;top:10px;right:10px;width: 20px;height: 20px;"},$("infoPanel"));
			newimg.addEventListener("click",closeInfoPanel,false);
			getData();
			
			var newtable,newtr,newtd,newtd1,newdiv,newdiv1,newinput;
			switch(mode){
			case "level":{
				newdiv = createElement("div",{"style":"float:left;height:550px;margin-right:10px;padding-right:17px;overflow:auto;color:black;"},divInfo);
	
				var today = new Date();
				today = today.getDate()+"."+today.getMonth()+"."+today.getYear();
				levelLog[today]=levelpkt;

				newtable = createElement("table",{"border":"1","class":"hovercc9"},newdiv);
				newtr = createElement("tr",{"style":"color:black;"},newtable);
				createElement("th",{},newtr,texte["tag"]);
				createElement("th",{},newtr,texte["punkte"]);
				createElement("th",{},newtr,"+");
				var c=0;
				var oldday=0;
				var levelVor=0;
				for (var v in levelLog){
					var day = v.split(/\./);
					var newday = (new Date(1900+parseInt(day[2],10),parseInt(day[1],10),parseInt(day[0],10)).getDay()+6)%7;
					if (newday<oldday) {
						newtr.setAttribute("class","borderbottom2");
					}
					oldday=newday;
					if(++c==1) levelVor=levelLog[v];
					newtr = createElement("tr",{"align":"right"},newtable);
					createElement("td",{},newtr,day[0]+"."+(parseInt(day[1],10)+1)+"."+(parseInt(day[2],10)+1900));
					createElement("td",{},newtr,number_format(levelLog[v],0));
					createElement("td",{},newtr,number_format(levelLog[v]-levelVor,0));
					levelVor=levelLog[v];
				}
				if (newdiv.scrollTop ==0) newdiv.scrollTop = (newdiv.scrollHeight < newdiv.clientHeight)?0:newdiv.scrollHeight - newdiv.clientHeight;
		
				for (var w in prodNameSort) {
					var v = prodNameSort[w];
					c = unsafeWindow.top.rackElement[v].number;
					if (prodTyp[v]=="v"){
						if(!c) {
							newdiv = createElement("div",{"style":"line-height:16px;"},divInfo);
							produktPic(v,newdiv);
							createElement("span",{"style":"font-weight:bold;"},newdiv,texte["lagerFehlt"].replace("xx",prodName[v]));
						}
						else if (c<valMinRackV) {
							newdiv = createElement("div",{"style":"line-height:16px;"},divInfo);
							produktPic(v,newdiv);
							createElement("span",{"style":"font-weight:bold;"},newdiv,texte["lagerNiedrig"].replace("xx",prodName[v])+" ("+number_format(c)+")");
						}
					}
					if (prodTyp[v]=="e"){
						if(!c) {
							newdiv = createElement("div",{"style":"line-height:16px;"},divInfo);
							produktPic(v,newdiv);
							createElement("span",{"style":"font-weight:bold;"},newdiv,texte["lagerFehlt"].replace("xx",prodName[v]));
							}
						else if (c<valMinRackE) {
							newdiv = createElement("div",{"style":"line-height:16px;"},divInfo);
							produktPic(v,newdiv);
							createElement("span",{"style":"font-weight:bold;"},newdiv,texte["lagerNiedrig"].replace("xx",prodName[v])+" ("+number_format(c)+")");
							}
					}
				}
			}
			break; case "options":{
				createElement("div",{"align":"center","style":"line-height:30px;"},divInfo,"<b>"+texte["optionen"]+"</b>&nbsp;-&nbsp;"+texte["berater"]+"&nbsp;"+version);
				newtable = createElement("table",{"style":"width:100%;","border":"1","class":"hovercc9"},divInfo);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalGiess","type":"checkbox","class":"link","checked":valGiess},newtd);
				newinput.addEventListener("click",function(){
					valGiess=this.checked;
					GM_setValue(lng+"_"+server+"_"+username+"_valGiess", valGiess);
				},false);
				createElement("td",{},newtr,texte["set_valGiess"]);
				createElement("td",{},newtr,texte["info_valGiess"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalErnte","type":"checkbox","class":"link","checked":valErnte},newtd);
				newinput.addEventListener("click",function(){
					valErnte=this.checked;
					GM_setValue(lng+"_"+server+"_"+username+"_valErnte", valErnte);
				},false);
				createElement("td",{},newtr,texte["set_valErnte"]);
				createElement("td",{},newtr,texte["info_valErnte"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalGiessNotw","type":"checkbox","class":"link","checked":valGiessNotw},newtd);
				newinput.addEventListener("click",function(){
					valGiessNotw=this.checked;
					GM_setValue(lng+"_"+server+"_"+username+"_valGiessNotw", valGiessNotw);
				},false);
				createElement("td",{},newtr,texte["set_valGiessNotw"]);
				createElement("td",{},newtr,texte["info_valGiessNotw"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalErnteMsg","type":"checkbox","class":"link","checked":valErnteMsg},newtd);
				newinput.addEventListener("click",function(){
					valErnteMsg=this.checked;
					GM_setValue(lng+"_"+server+"_"+username+"_valErnteMsg", valErnteMsg);
				},false);
				createElement("td",{},newtr,texte["set_valErnteMsg"]);
				createElement("td",{},newtr,texte["info_valErnteMsg"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalLeereFelderLimit","value":valLeereFelderLimit,"maxlength":"2","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valLeereFelderLimit=parseInt(this.value,10);
					if (!isNaN(valLeereFelderLimit)) { GM_setValue(lng+"_"+server+"_"+username+"_valLeereFelderLimit", valLeereFelderLimit); }
					this.value = (isNaN(valLeereFelderLimit)?"":valLeereFelderLimit);
				},false);
				createElement("td",{},newtr,texte["set_valLeereFelderLimit"]);
				createElement("td",{},newtr,texte["info_valLeereFelderLimit"]);

				newtr = createElement("tr",{},newtable);
				createElement("td",{"align":"center"},newtr);
				createElement("td",{},newtr,texte["set_valMoveAnimals"]);
				newtd = createElement("td",{},newtr,texte["info_valMoveAnimals"]);
				for(var v=0;v<animalMove.length;v++) if(animalMove[v]){
					newspan = createElement("span",{"style":"float:left;margin-right:10px;"},newtd);
					produktPic(zone2produkt[v],newspan);
					newinput = createElement("input",{"id":"inputvalMoveAnimals"+v,"type":"checkbox","class":"link","checked":valMoveAnimals[v]},newspan);
					newinput.addEventListener("click",function(){
						valMoveAnimals[this.id.replace("inputvalMoveAnimals","")] = this.checked;
						GM_setValue(lng+"_"+server+"_"+username+"_valMoveAnimals", implode(valMoveAnimals));
					},false);			
				}
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalMinRackV","value":valMinRackV,"maxlength":"4","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valMinRackV=parseInt(this.value,10);
					if (!isNaN(valMinRackV)) { GM_setValue(lng+"_"+server+"_"+username+"_valMinRackV", valMinRackV); }
					this.value = (isNaN(valMinRackV)?"":valMinRackV);
				},false);
				createElement("td",{},newtr,texte["set_valMinRackV"]);
				createElement("td",{},newtr,texte["info_valMinRackV"]);
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalMinRackE","value":valMinRackE,"maxlength":"4","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valMinRackE=parseInt(this.value,10);
					if (!isNaN(valMinRackE)) { GM_setValue(lng+"_"+server+"_"+username+"_valMinRackE", valMinRackE); }
					this.value = (isNaN(valMinRackE)?"":valMinRackE);
				},false);
				createElement("td",{},newtr,texte["set_valMinRackE"]);
				createElement("td",{},newtr,texte["info_valMinRackE"]);
				
				// ***
				newtr = createElement("tr",{"style":"line-height:5px;"},newtable);
				newtd = createElement("td",{colspan:"3"},newtr);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalKauflimit","value":valKauflimit,"maxlength":"3","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valKauflimit=parseInt(this.value,10);
					if (!isNaN(valKauflimit)) { GM_setValue(lng+"_"+server+"_"+username+"_valKauflimit", valKauflimit); }
					this.value = (isNaN(valKauflimit)?"":valKauflimit);
				},false);
				createElement("span",{},newtd,"%");
				createElement("td",{},newtr,texte["set_valKauflimit"]);
				createElement("td",{},newtr,texte["info_valKauflimit"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				var valVerkaufLimitDown = GM_getValue(lng+"_"+server+"_"+username+"_valVerkaufLimitDown",95);
				newinput = createElement("input",{"id":"inputvalVerkaufLimitDown","value":valVerkaufLimitDown,"maxlength":"3","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("change",function(){
					valVerkaufLimitDown = Math.min(valVerkaufLimitUp,parseInt(this.value,10));
					if (!isNaN(valVerkaufLimitDown)) { GM_setValue(lng+"_"+server+"_"+username+"_valVerkaufLimitDown", valVerkaufLimitDown); }
					this.value = (isNaN(valVerkaufLimitDown)?"":valVerkaufLimitDown);
				},false);
				createElement("span",{},newtd,"%");
				var valVerkaufLimitUp = GM_getValue(lng+"_"+server+"_"+username+"_valVerkaufLimitUp",130);
				newinput = createElement("input",{"id":"inputvalVerkaufLimitUp","value":valVerkaufLimitUp,"maxlength":"3","size":"2px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("change",function(){
					valVerkaufLimitUp=Math.max(valVerkaufLimitDown,parseInt(this.value,10));
					if (!isNaN(valVerkaufLimitUp)) { GM_setValue(lng+"_"+server+"_"+username+"_valVerkaufLimitUp", valVerkaufLimitUp); }
					this.value = (isNaN(valVerkaufLimitUp)?"":valVerkaufLimitUp);
				},false);
				createElement("span",{},newtd,"%");
				createElement("td",{},newtr,texte["set_valVerkaufLimit"]);
				createElement("td",{},newtr,texte["info_valVerkaufLimit"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				var valJoinPreise = GM_getValue(lng+"_"+server+"_"+username+"_valJoinPreise",false);
				newinput = createElement("input",{"id":"inputvalJoinPreise","type":"checkbox","class":"link","checked":valJoinPreise},newtd);
				newinput.addEventListener("click",function(){
					valJoinPreise=this.checked;
					GM_setValue(lng+"_"+server+"_"+username+"_valJoinPreise", valJoinPreise);
				},false);
				createElement("td",{},newtr,texte["set_valJoinPreise"]);
				createElement("td",{},newtr,texte["info_valJoinPreise"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				var valPrivNachr = GM_getValue(lng+"_"+server+"_"+username+"_valPrivNachr",100);
				newinput = createElement("input",{"id":"inputvalNachr","value":valPrivNachr,"maxlength":"5","size":"5px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valPrivNachr=parseInt(this.value,10);
					if (!isNaN(valPrivNachr)) { GM_setValue(lng+"_"+server+"_"+username+"_valPrivNachr", valPrivNachr); }
					this.value = (isNaN(valPrivNachr)?"":valPrivNachr);
				},false);
				createElement("td",{},newtr,texte["set_valPrivNachr"]);
				createElement("td",{},newtr,texte["info_valPrivNachr"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				var valNachr = GM_getValue(lng+"_"+server+"_"+username+"_valNachr",100);
				newinput = createElement("input",{"id":"inputvalNachr","value":valNachr,"maxlength":"5","size":"5px","style":"background-color:transparent;color:white;"},newtd);
				newinput.addEventListener("focus",function(){this.style.backgroundColor="blue";},false);
				newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
				newinput.addEventListener("keyup",function(){
					valNachr=parseInt(this.value,10);
					if (!isNaN(valNachr)) { GM_setValue(lng+"_"+server+"_"+username+"_valNachr", valNachr); }
					this.value = (isNaN(valNachr)?"":valNachr);
				},false);
				createElement("td",{},newtr,texte["set_valNachr"]);
				createElement("td",{},newtr,texte["info_valNachr"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalQuicklinks","type":"checkbox","class":"link","checked":GM_getValue(lng+"_"+server+"_"+username+"_valQuicklinks",true)},newtd);
				newinput.addEventListener("click",function(){GM_setValue(lng+"_"+server+"_"+username+"_valQuicklinks", this.checked);},false);
				createElement("td",{},newtr,texte["set_valQuicklinks"]);
				createElement("td",{},newtr,texte["info_valQuicklinks"]);
		
				newtr = createElement("tr",{},newtable);
				createElement("td",{"align":"center"},newtr);
				createElement("td",{},newtr,texte["set_highlight"]);
				newtd = createElement("td",{},newtr);
				var highlight = explode(GM_getValue(lng+"_"+server+"_"+username+"_highlight","{}"));
				highlight[""] = "20b2aa";
				var v = 0;
				for (var name in highlight){
					newdiv = createElement("div",{},newtd);
					newinput = createElement("input",{"id":"inputhighlight"+v,"value":name,"maxlength":"20","size":"25px","style":"background-color:transparent;"},newdiv);
					newinput.addEventListener("focus",function(){this.style.backgroundColor="lightblue";},false);
					newinput.addEventListener("blur",function(){this.style.backgroundColor="transparent";},false);
					newinput = createElement("input",{"id":"inputhighlightcolor"+v,"value":highlight[name],"maxlength":"6","size":"10px","style":"background-color:#"+highlight[name]+";color:white;"},newdiv);
					newinput.addEventListener("keyup",function(){
						this.value = this.value.replace(/[^0-9a-fA-F]/g,"");
						this.style.backgroundColor = "#"+this.value;
					},false);
					newdiv.addEventListener("change",function(){
						var candinput = this.parentNode.parentNode.getElementsByTagName("input");
						var highlight = new Object();
						for(var v=0;v<candinput.length;v=v+2){
							highlight[candinput[v].value] = candinput[v+1].value;
						}
						GM_setValue(lng+"_"+server+"_"+username+"_highlight",implode(highlight));
						candinput = null;
					},false);
					v++;
				}
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				var valNimmBeob = GM_getValue(lng+"_"+server+"_valNimmBeob",false);
				newinput = createElement("input",{"id":"inputvalNimmBeob","type":"checkbox","class":"link","checked":valNimmBeob},newtd);
				newinput.addEventListener("click",function(){
					valNimmBeob=this.checked;
					GM_setValue(lng+"_"+server+"_valNimmBeob", valNimmBeob);
				},false);
				createElement("td",{},newtr,texte["set_valNimmBeob"]);
				createElement("td",{},newtr,texte["info_valNimmBeob"]);		

				if(unsafeWindow.formulas){
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{"align":"center"},newtr);
					newinput = createElement("input",{"id":"inputvalGlobaltimeWindmill","type":"checkbox","class":"link","checked":valGlobaltimeWindmill},newtd);
					newinput.addEventListener("click",function(){
						valGlobaltimeWindmill=this.checked;
						GM_setValue(lng+"_"+server+"_valGlobaltimeWindmill", valGlobaltimeWindmill);
					},false);
					createElement("td",{},newtr,texte["set_valGlobaltimeWindmill"]);
					createElement("td",{},newtr,texte["info_valGlobaltimeWindmill"]);
				}
				
				// *****
				newtr = createElement("tr",{"style":"line-height:5px;"},newtable);
				newtd = createElement("td",{colspan:"3"},newtr);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalAutoLogin","type":"checkbox","class":"link","checked":GM_getValue("valAutoLogin",false)},newtd);
				newinput.addEventListener("click",function(){GM_setValue("valAutoLogin", this.checked);},false);
				createElement("td",{},newtr,texte["set_valAutoLogin"]);
				createElement("td",{},newtr,texte["info_valAutoLogin"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalUpdate","type":"checkbox","class":"link","checked":GM_getValue("valUpdate",true)},newtd);
				newinput.addEventListener("click",function(){GM_setValue("valUpdate", this.checked);},false);
				createElement("td",{},newtr,texte["set_valUpdate"]);
				createElement("td",{},newtr,texte["info_valUpdate"]);
		
				if (lng=="de") {
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{"align":"center"},newtr);
					newinput = createElement("input",{"id":"inputvalStatistik","type":"checkbox","class":"link","checked":valStatistik},newtd);
					newinput.addEventListener("click",function(){
						valStatistik=this.checked;
						GM_setValue(lng+"_"+server+"_"+username+"_valStatistik", valStatistik);
					},false);
					createElement("td",{},newtr,texte["set_valStatistik"]);
					createElement("td",{},newtr,texte["info_valStatistik"]);
				}
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalDrag","type":"checkbox","class":"link","checked":GM_getValue(lng+"_"+server+"_"+username+"_valDrag",false)},newtd);
				newinput.addEventListener("click",function(){GM_setValue(lng+"_"+server+"_"+username+"_valDrag", this.checked);},false);
				createElement("td",{},newtr,texte["set_valDrag"]);
				createElement("td",{},newtr,texte["info_valDrag"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{"align":"center"},newtr);
				newinput = createElement("input",{"id":"inputvalHotkey","type":"checkbox","class":"link","checked":GM_getValue(lng+"_"+server+"_"+username+"_valHotkey",true)},newtd);
				newinput.addEventListener("click",function(){GM_setValue(lng+"_"+server+"_"+username+"_valHotkey", this.checked);},false);
				createElement("td",{},newtr,texte["set_valHotkeys"]);
				createElement("td",{},newtr,texte["info_valHotkeys"]);
		
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{colspan:"2","align":"center"},newtr);
				newinput = createElement("button",{"type":"button","class":"link2"},newtd,texte["set_CacheReset"]);
				newinput.addEventListener("click",function(){
					if(confirm(texte["confirm_CacheReset"])) {
					for(var i = 1000; i >=0; --i) {unsafeWindow.clearInterval(i);}
					window.setTimeout(function(){
					var help = GM_listValues();
					for(var v=help.length-1;v>-1;v--){
						if(help[v].search(lng+"_"+server+"_"+username+"_dragPos_")!=-1) GM_deleteValue(help[v]);
						else if(help[v].search(lng+"_"+server+"_"+username+"_letztesAngebot_")!=-1) GM_deleteValue(help[v]);
						else if(help[v].search(lng+"_"+server+"_"+username+"_nextTime")!=-1) GM_deleteValue(help[v]);
						else if(help[v].search(lng+"_"+server+"_"+username+"_zone")!=-1) GM_deleteValue(help[v]);
					}
					GM_deleteValue(lng+"_"+server+"_"+username+"_bargeld");
					GM_deleteValue(lng+"_"+server+"_"+username+"_prodBestand");
					GM_deleteValue(lng+"_"+server+"_"+username+"_prodBlock");
					GM_deleteValue(lng+"_"+server+"_"+username+"_farmiOk");
					GM_deleteValue(lng+"_"+server+"_"+username+"_maxBeob");
					GM_deleteValue(lng+"_"+server+"_"+username+"_minBeob");
					GM_deleteValue(lng+"_"+server+"_"+username+"_preisBeob");
					GM_deleteValue(lng+"_"+server+"_"+username+"_nachrichten_doread");
					GM_deleteValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState");
					GM_deleteValue(lng+"_"+server+"_"+username+"_nachrichten_letzte");
					GM_deleteValue(lng+"_"+server+"_"+username+"_nachrichten_system");
					GM_deleteValue(lng+"_"+server+"_"+username+"_profittable");
					top.document.location = top.document.location;
					},500);
					}
				},false);
				createElement("td",{},newtr,texte["confirm_CacheReset"]);
		
				//AutoLogin
				createElement("div",{"align":"center","style":"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,texte["autoLogin"]);
				newtable=createElement("table",{"id":"tableAutologin","align":"center"},divInfo);
				function buildLoginTable(showPW) {
					var logindata = new Array();
					try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		
					function saveLogin(){
						GM_setValue("logindata",implode(logindata));
					}
					var newtable = createElement("table",{"align":"center"});
					$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
					newtable.id = "tableAutologin";
					newtable.addEventListener("change",saveLogin,false);
					var newtr = createElement("tr",{},newtable);
					createElement("th",{},newtr,texte["server"]);
					createElement("th",{},newtr,texte["name"]);
					createElement("th",{},newtr,texte["passwort"]);
					var newtd,newinput,newselect,newdiv
					for (var v=0;v<logindata.length;v++){
						newtr = createElement("tr",{},newtable);
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginActive"+v,"type":"checkbox","title":texte["accountAktiv"],"checked":logindata[v][4]},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4] = this.checked; },false);				
						newinput = createElement("input",{"id":"loginServer"+v,"style":"width:20px","maxlength":"2"},newtd);
						if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
						if (logindata[v][1]!="0"){ newinput.value = logindata[v][1]; }
						newinput.addEventListener("change",function(){
							var readin = parseInt(this.value,10);
							if (isNaN(readin) || (readin<1)) {alert(texte["ungueltigerServer"]); this.value="";}
							else { 
								this.value = readin; 
								logindata[this.id.replace("loginServer","")][1] = readin;
							}
						},false);
						newselect = createElement("select",{"id":"loginLng"+v},newtd);
						for(var w in gamepages)	createElement("option",{"value":w},newselect,w);
						newselect.value = logindata[v][0];
						newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0] = this.value; },false);				
		
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginName"+v,"style":"width:150px","value":logindata[v][2],"maxlength":"20"},newtd);
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2] = this.value; },false);				
						
						newtd = createElement("td",{},newtr);
						newinput = createElement("input",{"id":"loginPW"+v,"style":"width:150px","value":logindata[v][3],"maxlength":"20"},newtd);
						if (!showPW){ newinput.type = "password"; }
						newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3] = this.value; },false);				
		
						newtd=createElement("td",{},newtr);
						if (v>0) {
							newdiv = createElement("div",{"id":"loginUp"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_up.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
							newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginUp",""),10);
								logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						if (v<logindata.length-1) {
							newdiv = createElement("div",{"id":"loginDown"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_down.gif","style":"width:14px;height:10px;"},newdiv);
							newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
							newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
							newdiv.addEventListener("click",function(){
								var currLine=parseInt(this.id.replace("loginDown",""),10);
								logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
								saveLogin();
								buildLoginTable(showPW);
							},false);
						}
						
						newtd=createElement("td",{"title":texte["loeschen"],"id":"loginDelete"+v},newtr);
						createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif","class":"link2","style":"width: 16px;height: 16px;"},newtd);
						newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newtd.addEventListener("click",function(){
							var currLine=this.id.replace("loginDelete","");
							logindata.splice(currLine,1);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{colspan:"5","class":"link","style":"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
					newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
					newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
					newtd.addEventListener("click",function(){
						logindata.push([lng,"0","","","false"]); // neue leere zeile
						saveLogin();
						buildLoginTable(showPW);
					},false);
					newtable=null;newtr=null;newtd=null;newinput=null;newselect=null;newdiv=null;
				}
				buildLoginTable(false);
				var newdiv = createElement("div",{"align":"center"},divInfo);
				newinput = createElement("input",{"type":"checkbox","class":"link","checked":false},newdiv);
				newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
				createElement("span",{},newdiv,texte["zeigePasswoerter"]);
				
				// Hotkeys
				createElement("div",{"align":"center","style":"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,"Hotkeys");
				newtable = createElement("table",{"align":"center","border":"1","class":"hovercc9"},divInfo);				
				for(var tr in texte["hotkeymap"]){
					newtr = createElement("tr",{},newtable);		
					newtd = createElement("td",{},newtr);		
					newinput = createElement("input",{"id":"hotkey"+tr,"value":getKeySymbol(hotkeymap[tr]),"style":"width:80px;"},newtd);
					newinput.addEventListener("keyup",function(event){
						this.value = getKeySymbol(event.keyCode);
						hotkeymap[this.id.replace("hotkey","")] = event.keyCode;
						GM_setValue("hotkeymap",implode(hotkeymap));
					},false);
					createElement("td",{},newtr,texte["hotkeymap"][tr]);	
					
				}
				
				//CSS
				var cssArr = new Object();
				cssArr["css_systemMsg_marketsale"] = [[],""];
				cssArr["css_systemMsg_contractsale"] = [[],"font-style:italic;"];
				cssArr["css_zonetime"] = [[],"background-color:#de9008;color:white;font-weight:bold;"];
				cssArr["css_zonetime_ready"] = [["css_zonetime"],"background-color:red!important;"];
				cssArr["css_lowrack"] = [[],"background-color:orangered;color:#000;"];
				cssArr["css_windmilltime"] = [[],"top:25px;right:0px;background-color:#de9008;color:white;font-weight:bold;"];
				cssArr["css_windmilltime_ready"] = [["css_windmilltime"],"background-color:red!important;"];
				
				createElement("div",{"align":"center","style":"line-height:30px;margin-top:20px;font-weight:bold;"},divInfo,"CSS");
				newtable = createElement("table",{"align":"center"},divInfo);
				for(var v in cssArr){
					newtr = createElement("tr",{},newtable);
					createElement("td",{},newtr,v);
					newtd = createElement("td",{},newtr);
					var help = GM_getValue(lng+"_"+server+"_"+username+"_"+v,cssArr[v][1]);
					newinput = createElement("input",{"id":v,"value":help,"style":"width:300px;"},newtd);
					newinput.addEventListener("keyup",function(){
						if(this.value=="") this.value = cssArr[this.id][1];
						GM_setValue(lng+"_"+server+"_"+username+"_"+this.id,this.value);
						cssArr[this.id][1] = this.value;
						var help = cssArr[this.id][1];
						for(var w=0;w<cssArr[this.id][0].length;w++){ help = cssArr[cssArr[this.id][0][w]][1]+help; }
						this.parentNode.nextSibling.firstChild.setAttribute("style",help);
					},false);
					newtd = createElement("td",{},newtr);
					for(var w=0;w<cssArr[v][0].length;w++){ help = cssArr[cssArr[v][0][w]][1]+help; }
					newdiv = createElement("div",{"style":help},newtd,"test");
				}
			}
			break; case "zonen":{
				var totalErnte = new Object;
				var totalPunkte = 0;
	
				newtable = createElement("table",{"class":"cellhovercc9","style":"width:100%" ,"border":"1"},divInfo);
				for (var farms=0;farms<unsafeWindow.top.farmamount;farms++){
					newtr = createElement("tr",{},newtable);
					newtd = createElement("th",{colspan:6,"class":"link"},newtr,texte["farm"]+" "+(farms+1));
					newtd.addEventListener("click",function(){closeInfoPanel();unsafeWindow.top.initZones(this.innerHTML.replace(texte["farm"]+" ","")); unsafeWindow.top.showMain();},false);
					for (var z=1;z<7;z++){
						var zf = z+6*farms;
						if (z%3==1) newtr = createElement("tr",{},newtable);
						newtd = createElement("td",{colspan:2,"style":"width:33%;","class":"link","id":zf},newtr);
						if (zoneTyp[zf]!="0") {
							newtd.addEventListener("click",function(){
								closeInfoPanel();
								goToZone(this.id);
							},false);
							newdiv = createElement("div",{"style":"position:relative;top:0px;height:60px;overflow:hidden;"},newtd);
							createElement("div",{"class":"bm"+zoneTyp[zf],"style":"position:absolute;top:-20px;opacity:0.3;z-index:-1;"},newdiv);
							newdiv1 = createElement("div",{"style":"position:absolute;top:0px;height:60px;width:100%;overflow:auto;"},newdiv);
							newdiv = createElement("div",{},newdiv1);
							if (nextTime[zf]!=nie) {
								var endDay = 3;
								if (nextTime[zf]-Now<345000) endDay = (((new Date(1000*(nextTime[zf])).getDay())-Today+7)%7);
								if (endDay == 0) newdiv.innerHTML = uhrzeit(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
								else if (texte["day"+endDay]) newdiv.innerHTML = texte["day"+endDay]+" "+uhrzeit(nextTime[zf],1)+"&nbsp;"+texte["uhr"];
								else newdiv.innerHTML = new Date(1000*nextTime[zf]).toLocaleString();
							} else { newdiv.innerHTML = texte["unbeschaeftigt"]}
							if (nextTime[zf]<Now) {
								newdiv.style.textDecoration="blink";
								newdiv.style.fontWeight="bold";
							}
							var points=0;
							for (var k in zoneErnte[zf]) {
								newdiv = createElement("div",{"style":"line-height:16px;"},newdiv1);
								produktPic(k,newdiv);
								createElement("div",{"style":"padding-left:18px;"},newdiv,zoneErnte[zf][k][0]+" "+prodName[k]);
								if (!totalErnte[k]){ totalErnte[k]=0; }
								totalErnte[k] += zoneErnte[zf][k][0];
								points += zoneErnte[zf][k][1];
							}
							punkte_format(points,"div",newdiv1);
							totalPunkte += points;
						} else { newtd.innerHTML = "-"; }
					}
				}
		
				newtr = createElement("tr",{},newtable);
				createElement("th",{colspan:3},newtr,texte["total"]);
				newtd = createElement("th",{colspan:3,"class":"link","title":texte["zumSGH"]},newtr,texte["fehlt"]);
				newtd.addEventListener("click",showSGH,false);
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{colspan:3},newtr);
				for (var k in totalErnte) {
					newdiv=createElement("div",{"style":"height:16px"},newtd);
					produktPic(k,newdiv);
					createElement("div",{"style":"padding-left:18px;"},newdiv,number_format(totalErnte[k])+" "+prodName[k]);
				}
				punkte_format(totalPunkte,"div",newtd);
		
				var newtdfehlt=createElement("td",{colspan:3},newtr);
		
				//Farmi-Uebersicht
				newtable = createElement("table",{"style":"margin-top:10px;width:100%" ,"border":"1"},divInfo);
				newtr = createElement("tr",{"style":"color:black"},newtable);
				createElement("th",{},newtr,texte["farmi"]);
				createElement("th",{},newtr,texte["produkte"]);
				createElement("th",{},newtr,texte["geld"]);
				createElement("th",{colspan:"2","title":"90% "+texte["preis"]},newtr,texte["wert"]);
				var farmiNr=-1;
				var farmi=1;
				var farmiSum = new Object;
				var farmiCash=0;
				var farmiWert=0;
				while (unsafeWindow.top.farmisinfo[0][++farmiNr]) {
					if (!unsafeWindow.top.farmisaway[farmiNr]){
					farmi++;
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{"class":"link","name":farmiNr},newtr);
					createElement("img",{"src":unsafeWindow.top._GFX+"verkauf/kunde_"+unsafeWindow.top.farmisinfo[0][farmiNr]["pic"]+"_still.gif", "style":"relative: absolute; left: -1px; top: -5px;width: 37px;height: 50px;"},newtd);
					newtd.addEventListener("click",function(){
						closeInfoPanel();
						if ($("citymaincontainer").style.display=="block"){
							unsafeWindow.initZones(1);
							unsafeWindow.showMain();
						};
						unsafeWindow.showCart(parseInt(this.getAttribute("name"),10));
					},false);
					newtd = createElement("td",{},newtr);
					var cash = parseFloat(unsafeWindow.top.farmisinfo[0][farmiNr]["price"],10);
					var wert = 0;
					for(var i = 1 ; i <= 7 ; i++) { // 7 = maxanzahl produkte pro farmi
						var pid = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["p"+i],10);
						var amount = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["a"+i],10);
						if((pid > 0) && (amount > 0)) {
							produktPic(pid,newtd);
							newdiv=createElement("div",{"style":"float:left;","name":pid},newtd,amount+" "+prodName[pid]);
							if ((!unsafeWindow.top.rackElement[pid].number) || (unsafeWindow.top.rackElement[pid].number<amount)) {
								newdiv.style.color="red";
								newdiv.setAttribute("class","link");
								newdiv.setAttribute("title",texte["zumIdMarkt"].replace("xx",prodName[pid]));
								newdiv.addEventListener("click",function(){showMarket(this.getAttribute("name"));},false);
							}
							createElement("div",{"style":"clear:both;"},newtd);
							if (farmiSum[pid]) farmiSum[pid] += amount;
							else farmiSum[pid] = amount;
							wert += 0.9*amount*gut[pid];
						}
					}
					farmiCash += cash;
					farmiWert += wert;
					createElement("td",{"style":"text-align:right;"},newtr,kT_format(cash));
					createElement("td",{"style":"text-align:right;"},newtr,kT_format(wert));
					createElement("td",{"style":"text-align:right;"},newtr,number_format(100*cash/wert,1)+"%<br>"+(cash>wert?"+":"")+kT_formatgr(cash-wert));
					}
				}
				if (farmi>1) {
					newtr.setAttribute("class","borderbottom2");
					newtr = createElement("tr",{"class":"bordertop2"},newtable);
					createElement("td",{},newtr);
					newtd = createElement("td",{},newtr);
					for (var v in farmiSum){
						produktPic(v,newtd);
						createElement("div",{"style":"float:left;"},newtd,farmiSum[v]+" "+prodName[v]);
						createElement("div",{"style":"clear:both;"},newtd);
					}
					createElement("td",{"style":"text-align:right;"},newtr,kT_format(farmiCash));
					createElement("td",{"style":"text-align:right;"},newtr,kT_format(farmiWert));
					createElement("td",{"style":"text-align:right;"},newtr,number_format(100*farmiCash/farmiWert,1)+"%<br>"+(farmiCash>farmiWert?"+":"")+kT_formatgr(farmiCash-farmiWert));
				}
				for (var w=0;w<prodNameSort.length;w++){
					var v=prodNameSort[w];
					var amount = 0;
					var amount1 = (farmiSum[v]?farmiSum[v]:0)-(unsafeWindow.rackElement[v].number?unsafeWindow.rackElement[v].number:0);
					if(prodTyp[v]=="v"){
						amount = amount1+valMinRackV; 
					} else if (prodTyp[v]=="e"){ 
						amount = amount1+valMinRackE; 
					}
					if (amount>0){
						produktPic(v,newtdfehlt);
						newdiv = createElement("div",{"style":"float:left;","class":"link","name":v,"title":texte["zumIdMarkt"].replace("xx",prodName[v])},newtdfehlt,number_format(amount)+(amount1>0?"&nbsp;("+number_format(amount1)+")":"")+"&nbsp;"+prodName[v]);
						newdiv.addEventListener("click",function(){showMarket(this.getAttribute("name"));},false);
						createElement("div",{"style":"clear:both;"},newtdfehlt);
					}				
				}
				newtdfehlt=null;
			}
			break; case "profit":{
				// data
				var tiere = {"9":[5,10,15,20,20],"10":[2,3,4,5,6],"11":[2,3,4,5,6],"12":[1,2,3,4,4],"25":[1,1,1,1,1],"27":[1,1,1,1,1],"28":[1,1,1,1,1],"30":[1,1,1,1,1],"91":[1,3,5,6,6]};
				var stallbonus = {"0":[1,0.95,0.9,0.85,0.8,0.7],"9":[1,1,1,0.9,0.8],"10":[1,1,1,0.9,0.8],"11":[1,1,1,0.9,0.8],"12":[1,1,1,0.9,0.8],"25":[1,0.95,0.9,0.85,0.8],"27":[1,0.95,0.9,0.85,0.8],"28":[1,0.95,0.9,0.85],"30":[1,0.95,0.9,0.85],"91":[1,1,1,0.9,0.8]};
				var tierfutter = {"9":[[1,600],[2,1200]],"10":[[3,900],[4,1800]],"11":[[5,2400],[6,4800]],"12":[[7,4800],[8,9600]],"25":[[9,30]],"27":[[10,12]],"28":[[11,8]],"30":[[12,5]],"91":[[92,14400],[93,28800]]};
				var product2building = {"0":1,"9":2,"10":3,"11":4,"12":5,"25":7,"27":8,"28":9,"30":10,"91":11};
		
				newdiv = createElement("div",{"style":"text-align:center;width:500px;"},divInfo);
				createElement("span",{"style":"font-weight:bold;"},newdiv,texte["profitTable"]);
				newspan = createElement("span",{"style":"margin-left:50px;"},newdiv);
				newinput = createElement("input",{"type":"checkbox","checked":true},newspan);
				newinput.addEventListener("click",function(){
					buildProfitTable("gut",this.checked?0.9:1);
				},false);
				createElement("span",{},newspan,"90%");
				createElement("table",{},divInfo);
				function buildProfitTable(mode,perc) {
					var divInfo = $("infoPanel").firstChild;
					var sterne = new Object();
					try{ sterne = explode(GM_getValue(lng+"_"+server+"_"+username+"_ProfittableSterne","{}")); }catch(err){}
					if(!sterne["0"]){ sterne["0"]=1; }
					var valFutterMode = new Object();
					try{ valFutterMode=explode(GM_getValue(lng+"_"+server+"_"+username+"_ProfittableFutterMode","{}")); }catch(err){}
					var profit = new Array();
					var c=-1;
					for (var v=0;v<prodName.length;v++) if((!prodBlock[v]) && (dauer[v])){
						if (prodTyp[v]=="v") {
							profit[++c] = new Object();
							profit[c]["id"] = v;
							profit[c]["dauer"] = calcDauer(60*dauer[v],stallbonus["0"][sterne["0"]]);
							profit[c]["menge"] = calcGrowTimes(60*dauer[v],86400,stallbonus["0"][sterne["0"]])*120/(unsafeWindow.top.produkt_x[v]*unsafeWindow.top.produkt_y[v]);
							profit[c]["punkte"] = Math.round(punkte[v]*profit[c]["menge"]);
							profit[c]["menge"] *= (unsafeWindow.top.produkt_ernte[v]-1);
							profit[c]["gut"] = perc*gut[v]*profit[c]["menge"];
							profit[c]["gutBeob"] = perc*gutBeob[v]*profit[c]["menge"];
						} else if (prodTyp[v]=="e") {
							profit[++c] = new Object();
							profit[c]["id"] = v;
							profit[c]["level"] = sterne[v]?sterne[v]:1;
							profit[c]["maxlevel"] = 1;
							while(levelnum>=ausbauLevel[product2building[v]][profit[c]["maxlevel"]]){ profit[c]["maxlevel"]++; }
							var bonus = stallbonus[v][profit[c]["level"]-1];
							profit[c]["dauer"] = 60*dauer[v]*bonus;
							profit[c]["menge"] = 86400/profit[c]["dauer"];
							if(tierfutter[v].length==1){
								profit[c]["futter"] = [tierfutter[v][0][0],profit[c]["menge"]*tierfutter[v][0][1]];
							} else {
								if(!valFutterMode[v]){ valFutterMode[v]=[0,true]; }
								if(valFutterMode[v][1]) {
									profit[c]["dauer"] *= 0.5;
									profit[c]["menge"] *= 2;
									profit[c]["futter"] = [tierfutter[v][valFutterMode[v][0]][0],profit[c]["menge"]*Math.floor(profit[c]["dauer"]*tiere[v][profit[c]["level"]-1]/tierfutter[v][valFutterMode[v][0]][1])];
								} else {
									profit[c]["futter"] = [tierfutter[v][valFutterMode[v][0]][0],profit[c]["menge"]];
								}
							}
							profit[c]["menge"] *= tiere[v][profit[c]["level"]-1]*unsafeWindow.top.produkt_ernte[v];
							profit[c]["punkte"] = Math.round(profit[c]["menge"]*punkte[v]);
							profit[c]["gut"] = Math.round((profit[c]["menge"]*perc*gut[v])-(profit[c]["futter"][1]*(npc[profit[c]["futter"][0]]?Math.min(npc[profit[c]["futter"][0]],gut[profit[c]["futter"][0]]):gut[profit[c]["futter"][0]])));
							profit[c]["gutBeob"] = Math.round((profit[c]["menge"]*perc*gutBeob[v])-(profit[c]["futter"][1]*(npc[profit[c]["futter"][0]]?Math.min(npc[profit[c]["futter"][0]],gutBeob[profit[c]["futter"][0]]):gutBeob[profit[c]["futter"][0]])));
						}
					}
		
					function sortProfit (a, b) {return b[mode] - a[mode];}
					profit.sort(sortProfit);
		
					var newtable = createElement("table",{"cellspacing":"0","border":"1","width":"100%;"});
					divInfo.replaceChild(newtable,divInfo.childNodes[1]);
					var newtablehead = createElement("thead",{},newtable);
					var newtablebody = createElement("tbody",{"style":"overflow-y:auto;overflow-x:hidden;height:500px;"},newtable);
		
					var newtr = createElement("tr",{"style":"color:black;"},newtablehead);
					var newtd = createElement("th",{"class":"link"},newtr,Math.round(100*(1-stallbonus["0"][sterne["0"]]))+"%");
					newtd.addEventListener("click",function(){
						for(var c=0;c<ausbauLevel[1].length;c++) if(levelnum<ausbauLevel[1][c]) break;
						sterne["0"] = (sterne["0"]%c)+1;
						GM_setValue(lng+"_"+server+"_"+username+"_ProfittableSterne",implode(sterne));
						buildProfitTable(mode,perc);
					},false);
					for (var v=0;v<sterne["0"];v++) createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/star.png"},newtd);
					newtd = createElement("th",{"class":"link hovercc9"},newtr,texte["dauer"]);
					newtd.addEventListener("click",function(){buildProfitTable("dauer",perc);},false);
					if (mode=="dauer") newtd.style.backgroundColor = "#cc9";
					newtd = createElement("th",{},newtr);
					newtd = createElement("th",{"class":"link hovercc9"},newtr,texte["punkte"]);
					newtd.addEventListener("click",function(){buildProfitTable("punkte",perc);},false);
					if (mode=="punkte") newtd.style.backgroundColor = "#cc9";
					newtd = createElement("th",{"class":"link hovercc9"},newtr,texte["preise"]);
					newtd.addEventListener("click",function(){buildProfitTable("gut",perc);},false);
					if (mode=="gut") newtd.style.backgroundColor = "#cc9";
					newtd = createElement("th",{"class":"link hovercc9"},newtr,texte["beobachtet"]);
					newtd.addEventListener("click",function(){buildProfitTable("gutBeob",perc);},false);
					if (mode=="gutBeob") newtd.style.backgroundColor = "#cc9";
		
					var newspan;
					for (var v=0;v<profit.length;v++) {
						newtr = createElement("tr",{"class":"hovercc9","style":"color:black;"},newtablebody);
						newtd = createElement("td",{"id":v},newtr);
						newspan = createElement("span",{"style":"float:left;","class":"link","title":texte["bestand"].replace(/&nbsp;/g," ")+" "+number_format(prodBestand[profit[v]["id"]])},newtd,prodName[profit[v]["id"]]);
						newspan.addEventListener("click",function(){showMarket(profit[this.parentNode.id]["id"]);},false);
						produktPic(profit[v]["id"],newspan);
						if (profit[v]["level"]) {
							newspan = createElement("span",{"style":"float:left;","class":"link","title":"max "+profit[v]["maxlevel"]},newtd);
							for (var w=0;w<profit[v]["level"];w++) createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/star.png"},newspan);
							newspan.addEventListener("click",function(){
								var currId = this.parentNode.id;
								sterne[profit[currId]["id"]] = (profit[currId]["level"]%profit[currId]["maxlevel"])+1;
								GM_setValue(lng+"_"+server+"_"+username+"_ProfittableSterne",implode(sterne));
								buildProfitTable(mode,perc);
							},false);
							newspan = createElement("span",{"style":"float:left;"},newtd);
							newspan = produktPic(profit[v]["futter"][0],newspan);
							newspan.title = texte["futter"]+": "+number_format(profit[v]["futter"][1],1)+" "+newspan.title;
							if(tierfutter[profit[v]["id"]].length>1){
								newspan.setAttribute("class",newspan.getAttribute("class")+" link");
								newspan.addEventListener("click",function(){
									var currId = profit[this.parentNode.parentNode.id]["id"];
									if(valFutterMode[currId][1]){ 
										valFutterMode[currId][0] = (valFutterMode[currId][0]+1)%tierfutter[currId].length;
										valFutterMode[currId][1] = false;
									} else {
										valFutterMode[currId][1] = true;
									}
									GM_setValue(lng+"_"+server+"_"+username+"_ProfittableFutterMode",implode(valFutterMode));
									buildProfitTable(mode,perc);
								},false);		
							}
						}
						createElement("td",{"style":"text-align:right;"},newtr,time2str(profit[v]["dauer"],1));
						createElement("td",{"style":"text-align:right;"},newtr,uhrzeit(Now+profit[v]["dauer"],1)+"&nbsp;"+texte["uhr"]);
						createElement("td",{"style":"text-align:right;","title":(texte["ertrag"]+" "+number_format(profit[v]["menge"],1)).replace(/&nbsp;/g," ")},newtr,number_format(profit[v]["punkte"]));
						createElement("td",{"style":"text-align:right;","title":(texte["marktpreis"]+" "+kT_format(gut[profit[v]["id"]])).replace(/&nbsp;/g," ")},newtr,kT_formatgr(profit[v]["gut"]));
						createElement("td",{"style":"padding-right:20px;text-align:right;","title":(texte["beobachtet"]+" "+kT_format(gutBeob[profit[v]["id"]])).replace(/&nbsp;/g," ")},newtr,kT_formatgr(profit[v]["gutBeob"]));
					}
					divInfo=null;newtable=null;newtablehead=null;newtablebody=null;newtr=null;newtd=null;newspan=null;
				}
				buildProfitTable("gut",0.9);
			}
			break; case "farmiLog":{
				var farmiOk = GM_getValue(lng+"_"+server+"_"+username+"_farmiOk",100);
				newtable = createElement("table",{"class":"hovercc9","style":"width:100%" ,"border":"1"},divInfo);
				var totalPrice = 0;
				var totalWert = 0;
				var totalPriceOk = 0;
				var totalWertOk = 0;
				var farmisOk = 0;
				var totalProducts = new Array();
				for (var v=0;v<prodNameSort.length;v++) if((prodTyp[prodNameSort[v]]=="v")||(prodTyp[prodNameSort[v]]=="e")) { totalProducts[prodNameSort[v]] = [prodNameSort[v],0,0];	}
				newtr = createElement("tr",{},newtable);
				createElement("th",{},newtr,"");
				createElement("th",{},newtr,texte["produkte"]);
				createElement("th",{},newtr,texte["geld"]);
				createElement("th",{colspan:"2","title":"90% "+texte["preis"]},newtr,texte["wert"]);
				var newtrTotal = createElement("tr",{},newtable);
				var newtrSchnitt = createElement("tr",{},newtable);
				var borderTop;
				for (var v=0;v<arrFarmiLog.length;v++){
					newtr = createElement("tr",{},newtable);
					if ((v==0)||(arrFarmiLog[v][1]!=arrFarmiLog[v-1][1])){
						borderTop="2px solid black;";
						var day = arrFarmiLog[v][1].split(/\./);
						newtd1 = createElement("td",{"style":"border-top:"+borderTop},newtr,day[0]+"."+(parseInt(day[1],10)+1)+"."+(parseInt(day[2],10)+1900));
						c=1;
					} else {
						borderTop="1px solid black;";
						newtd1.rowSpan = ++c;
					}
					newtd = createElement("td",{"style":"border-top:"+borderTop},newtr);
					var wert = 0;
					for (var w=2;w<arrFarmiLog[v].length;w+=2){
						newdiv=createElement("div",{"style":"line-height:16px;"},newtd);
						produktPic(arrFarmiLog[v][w],newdiv);
						createElement("div",{"style":"padding-left:18px;"},newdiv,arrFarmiLog[v][w+1]+" "+prodName[arrFarmiLog[v][w]]);
						wert += parseInt(arrFarmiLog[v][w+1],10)*gut[arrFarmiLog[v][w]];
					}
					wert *= 0.9;
					var cash = parseFloat(arrFarmiLog[v][0],10);
					totalPrice += cash;
					totalWert += wert;
					createElement("td",{"style":"border-top:"+borderTop},newtr,kT_format(cash));
					createElement("td",{"style":"border-top:"+borderTop},newtr,kT_format(wert));
					newtd = createElement("td",{"style":"border-top:"+borderTop},newtr,number_format(100*cash/wert,1)+"%<br>"+(cash>wert?"+":"")+kT_formatgr(cash-wert));
					if (100*cash>farmiOk*wert) {
						for (var w=2;w<arrFarmiLog[v].length;w+=2){
							totalProducts[arrFarmiLog[v][w]][1]++;
							totalProducts[arrFarmiLog[v][w]][2]+=parseInt(arrFarmiLog[v][w+1],10);
						}
						totalPriceOk += cash;
						totalWertOk += wert;
						farmisOk++;				
					} else { newtd.style.backgroundColor = "red"; }
				}
				for (var v=totalProducts.length-1;v>-1;v--){
					if(totalProducts[v]) { totalProducts[v][3] = totalProducts[v][2]/totalProducts[v][1]; }
					else { totalProducts.splice(v,1); }
				}
		
				createElement("td",{},newtrTotal,texte["total"]+"<br>("+farmisOk+"/"+arrFarmiLog.length+")");
				newtd = createElement("td",{"id":"tdTotalProducts"},newtrTotal);
				function buildTotalProducts(mode){
					function sortTPAbst (a, b) {return b[mode]-a[mode];}
					totalProducts.sort(sortTPAbst);
					$("tdTotalProducts").innerHTML = "";
					var newtable = createElement("table",{cellspacing:"0",cellpadding:"0"},$("tdTotalProducts"));
					var newtr = createElement("tr",{},newtable);
					var newtd = createElement("td",{"class":"link hoverlightblue","style":"text-align:center;padding-right:3px;border-bottom:1px solid black;"},newtr,texte["produkt"]);
					if (mode==0){ newtd.style.backgroundColor="lightblue"; }
					else {
						newtd.addEventListener("click",function(){buildTotalProducts(0);},false);
					}
					newtd = createElement("td",{"class":"link hoverlightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,"x");
					if (mode==1){ newtd.style.backgroundColor="lightblue"; }
					else {
						newtd.addEventListener("click",function(){buildTotalProducts(1);},false);
					}
					newtd = createElement("td",{"class":"link hoverlightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,"\u03A3");
					if (mode==2){ newtd.style.backgroundColor="lightblue"; }
					else {
						newtd.addEventListener("click",function(){buildTotalProducts(2);},false);
					}
					newtd = createElement("td",{"class":"link hoverlightblue","style":"text-align:center;border-left:1px solid black;border-bottom:1px solid black;padding-left:3px;padding-right:3px;"},newtr,"\u03A3/x");
					if (mode==3){ newtd.style.backgroundColor="lightblue"; }
					else {
						newtd.addEventListener("click",function(){buildTotalProducts(3);},false);
					}
					for (var v=0;v<totalProducts.length;v++) {
						//newdiv=createElement("div",{"style":"line-height:16px;"},newtd);
						newtr=createElement("tr",{},newtable);
						newtd = createElement("td",{"style":"padding-right:3px;"},newtr,prodName[totalProducts[v][0]]);
						produktPic(totalProducts[v][0],newtd);
						createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,number_format(totalProducts[v][1]));
						createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,number_format(totalProducts[v][2]));
						createElement("td",{"style":"text-align:right;border-left:1px solid black;padding-left:3px;padding-right:3px;"},newtr,number_format(totalProducts[v][3]));
					}
					newtable=null;newtr=null;newtd=null;
				}
				buildTotalProducts(0);
				createElement("td",{},newtrTotal,kT_formatgr(totalPriceOk));
				createElement("td",{},newtrTotal,kT_formatgr(totalWertOk));
				createElement("td",{},newtrTotal,number_format(100*totalPriceOk/totalWertOk,1)+"%<br>"+(totalPriceOk>totalWertOk?"+":"")+kT_formatgr(totalPriceOk-totalWertOk));
				createElement("td",{"style":"border-bottom:2px solid black;"},newtrSchnitt,"\u2205 ("+farmisOk+")<br>\u2205 ("+arrFarmiLog.length+")");
				createElement("td",{"style":"border-bottom:2px solid black;"},newtrSchnitt,"");
				createElement("td",{"style":"border-bottom:2px solid black;"},newtrSchnitt,kT_format(totalPriceOk/farmisOk)+"<br>"+kT_format(totalPrice/arrFarmiLog.length));
				createElement("td",{"style":"border-bottom:2px solid black;"},newtrSchnitt,kT_format(totalWertOk/farmisOk)+"<br>"+kT_format(totalWert/arrFarmiLog.length));
				createElement("td",{"style":"border-bottom:2px solid black;"},newtrSchnitt,(totalPriceOk>totalWertOk?"+":"")+kT_formatgr((totalPriceOk-totalWertOk)/farmisOk)+"<br>"+(totalPrice>totalWert?"+":"")+kT_formatgr((totalPrice-totalWert)/arrFarmiLog.length));
		
				newdiv1 = createElement("div",{"class":"link","style":"position:absolute;top:40px;right:20px;border:1px solid black;"},$("infoPanel"));
				for (var v=200;v>-1;v--){
					newdiv = createElement("div",{"style":"width:20px;height:2.5px;","title":v+"%"},newdiv1);
					if (v<=farmiOk) newdiv.style.backgroundColor = "blue";
					if (v==100) newdiv.style.borderTop = "1px solid black";
					newdiv.addEventListener("click",function(){
						GM_setValue(lng+"_"+server+"_"+username+"_farmiOk",parseInt(this.title.replace("%",""),10));
						$("infoPanel").setAttribute("name","");
						buildInfoPanel("farmiLog");
					},false);
				}
				newtrTotal=null;newtrSchnitt=null;
			}   
			break; case "preise":{
				divInfo.style.left="-20px";
				divInfo.style.width="640px";
				divInfo.style.background="url('http://dqt9wzym747n.cloudfront.net/pics/stadt/markt.jpg') no-repeat scroll left top transparent";
				createElement("table",{},divInfo);
				buildPreise("cvez",divInfo);
			}
			break; case "formulas":{
				newtable = createElement("table",{"class":"hovercc9","style":"line-height:16px;width:100%" ,"border":"1"},divInfo);
				newtr = createElement("tr",{},newtable);
				createElement("td",{},newtr,"Nr");
				createElement("td",{},newtr,"Lvl");
				createElement("td",{},newtr,"Title");
				createElement("td",{},newtr,"Ingredients");
				createElement("td",{},newtr,"Time");
				createElement("td",{},newtr,"Gain");
				createElement("td",{},newtr,"Price");
				for(var v in unsafeWindow.formulas[0])if(levelnum>=unsafeWindow.formulas[0][v][1]){
					newtr = createElement("tr",{},newtable);
					createElement("td",{},newtr,unsafeWindow.formulas[0][v][0]);
					createElement("td",{},newtr,unsafeWindow.formulas[0][v][1]);
					newtd1 = createElement("td",{},newtr,unsafeWindow.formulas[0][v][2]);
					newtd = createElement("td",{},newtr);
					var sum1 = 0;
					var sumPts = 0;
					for(var w=0;w<unsafeWindow.formulas[0][v][3].length;w++){
						newdiv = createElement("div",{"style":"width:55px;"},newtd,unsafeWindow.formulas[0][v][3][w][1]);
						produktPic(unsafeWindow.formulas[0][v][3][w][0],newdiv);
						sum1 += unsafeWindow.formulas[0][v][3][w][1]*gut[unsafeWindow.formulas[0][v][3][w][0]]
					}
					createElement("div",{},newtd,"("+kT_formatgr(sum1)+")");
					var sum = -sum1;
					createElement("td",{},newtr,time2str(unsafeWindow.formulas[0][v][4],1)+"h");
					newtd = createElement("td",{"style":"width:80px;"},newtr);
					if(unsafeWindow.formulas[0][v][5][0]!=0){
						newdiv = createElement("div",{"style":"width:45px;"},newtd,unsafeWindow.formulas[0][v][5][0][1]);
						produktPic(unsafeWindow.formulas[0][v][5][0][0],newdiv);
						createElement("div",{},newtd,"("+kT_formatgr(unsafeWindow.formulas[0][v][5][0][1]*gut[unsafeWindow.formulas[0][v][5][0][0]])+")");
						sum += unsafeWindow.formulas[0][v][5][0][1]*gut[unsafeWindow.formulas[0][v][5][0][0]];
					}
					if(unsafeWindow.formulas[0][v][5][1]!=0){
						createElement("div",{},newtd,time2str(unsafeWindow.formulas[0][v][5][1][2],1)+"h");
						newdiv = createElement("div",{},newtd,"+"+unsafeWindow.formulas[0][v][5][1][1]+"val");
						produktPic(unsafeWindow.formulas[0][v][5][1][0],newdiv);
						sum1 = 0;
						for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++)if(zoneTyp[zoneNr]=="1"){
							sum1 += gut[unsafeWindow.formulas[0][v][5][1][0]]*unsafeWindow.formulas[0][v][5][1][1]*Math.ceil(calcGrowTimes(60*dauer[unsafeWindow.formulas[0][v][5][1][0]],unsafeWindow.formulas[0][v][5][1][2],1-(zoneBonus[zoneNr]/100)))*120/(unsafeWindow.top.produkt_x[unsafeWindow.formulas[0][v][5][1][0]]*unsafeWindow.top.produkt_y[unsafeWindow.formulas[0][v][5][1][0]]);
						}
						sum += sum1;
						createElement("div",{},newtd,"("+number_format(sum1)+")");
					}
					if(unsafeWindow.formulas[0][v][5][2]!=0){
						createElement("div",{},newtd,time2str(unsafeWindow.formulas[0][v][5][2][2],1)+"h");
						newdiv = createElement("div",{},newtd,"+"+unsafeWindow.formulas[0][v][5][2][1]+"pts");
						produktPic(unsafeWindow.formulas[0][v][5][2][0],newdiv);
						sum1 = 0;
						for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++)if(zoneTyp[zoneNr]=="1"){
							sum1 += unsafeWindow.formulas[0][v][5][2][1]*Math.ceil(calcGrowTimes(60*dauer[unsafeWindow.formulas[0][v][5][2][0]],unsafeWindow.formulas[0][v][5][2][2],1-(zoneBonus[zoneNr]/100)))*120/(unsafeWindow.top.produkt_x[unsafeWindow.formulas[0][v][5][2][0]]*unsafeWindow.top.produkt_y[unsafeWindow.formulas[0][v][5][2][0]]);
						}
						sumPts = sum1;
						createElement("div",{},newtd,"("+number_format(sum1)+")");
					}
					punkte_format(unsafeWindow.formulas[0][v][8],"div",newtd);
					sumPts += unsafeWindow.formulas[0][v][8];
					newtd = createElement("td",{},newtr);
					newspan = createElement("span",{},newtd);
					if(unsafeWindow.formulas[0][v][6]>0){
						newspan.innerHTML = kT_formatgr(unsafeWindow.formulas[0][v][6]);
						sum -= unsafeWindow.formulas[0][v][6];
					}
					newspan = createElement("span",{},newtd);
					if(unsafeWindow.formulas[0][v][7]>0){
						newspan.innerHTML = unsafeWindow.formulas[0][v][7];
						produktPic(0,newspan);
						createElement("div",{},newtd,"("+kT_formatgr(unsafeWindow.formulas[0][v][7]*gut[0])+")");
						sum -= unsafeWindow.formulas[0][v][7]*gut[0];
					}
					//createElement("td",{},newtr,unsafeWindow.formulas[0][v][8]);
					//createElement("td",{},newtr,unsafeWindow.formulas[0][v][9]);
					createElement("div",{},newtd1,kT_formatgr(sum));
					punkte_format(sumPts,"div",newtd1);
				}
			}
			break; case "upjersWerbung":{
				createElement("div",{"align":"center","style":"font-weight:bold;line-height:30px;"},divInfo,texte["upjersWerbung"]);
				for(var v=0;v<upjersWerbung.length;v++){
					createElement("div",{"style":"padding:5px;margin:5px;border:1px solid black;"},divInfo,upjersWerbung[v]);
				}
			}
			}
			divInfo=null;newimg=null;newtable=null;newtr=null;newtd=null;newtd1=null;newdiv=null;newdiv1=null;newinput=null;
		}
	}

	// Punkte
	var levelLog = new Object();
	try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_levelLog").split("|");
		for (var v in arr){
			var help = arr[v].split("~");
			levelLog[help[0]] = help[1];
		}
	} catch(err) {}
	var levelArr=new Array(0,0,58,2420,6620,15620,27900,58700,101700,163100,211900,276900,359000,467000,730000,1190000,1750000,2680000,3900000,5660000,7850000,10590000,15300000,20640000,26020000,37340000,50030000,65160000,85030000,108900000,139150000,175520000,222430000,276920000,345930000,429330000,535520000,669000000,797010000,927020000,927020001);
	var levelpkt=parseInt($("pkt").innerHTML.replace(/\D/g,""),10);
	levelLog[today]=levelpkt;
	var levelsum = levelArr[levelnum+1]-levelArr[levelnum-1];
	var levelSize=959;
	if(levelnum<levelArr.length) {
		newdiv=createElement("div",{"class":"link","style":"float:left;width:'+levelSize+'px;position:relative;top:-2px;left:18px;"},content_table.getElementsByTagName("tr")[3].getElementsByTagName("td")[0]);
	
		newdiv1 = bar(levelSize*(levelArr[levelnum]-levelArr[levelnum-1])/levelsum,1,1);
		newdiv1.style.float = "left";
		newdiv1.title = texte["level"]+" "+(levelnum-1)+": "+number_format(levelArr[levelnum-1],0)+"-"+number_format(levelArr[levelnum],0);
		newdiv.appendChild(newdiv1);
	
		newdiv1 = bar(levelSize*(levelArr[levelnum+1]-levelArr[levelnum])/levelsum,levelpkt-levelArr[levelnum],levelArr[levelnum+1]-levelArr[levelnum]);
		newdiv1.style.float = "left";
		newdiv1.style.marginLeft=Math.ceil(2+levelSize*(levelArr[levelnum]-levelArr[levelnum-1])/levelsum)+"px";
		newdiv1.title = texte["level"]+" "+(levelnum)+": "+number_format(levelArr[levelnum],0)+"-"+number_format(levelArr[levelnum+1],0);
		newdiv.appendChild(newdiv1);
	
		for (var v in levelLog){
			if(levelArr[levelnum-1]<levelLog[v] && levelLog[v]<levelArr[levelnum+1]){
				newdiv1=createElement("div",{"style":"position:absolute;width:0px;margin-top:2px;height:12px;border-right:1px solid white;"},newdiv);
				if (levelLog[v]<levelArr[levelnum]) newdiv1.style.marginLeft=Math.floor(2+levelSize*(levelLog[v]-levelArr[levelnum-1])/levelsum)+"px";
				else newdiv1.style.marginLeft=Math.floor(4+levelSize*(levelLog[v]-levelArr[levelnum-1])/levelsum)+"px";
				help=v.split(".");
				if (new Date(1900+parseInt(help[2],10),help[1],help[0]).getDay()=="0") newdiv1.style.borderColor="red";
			} else {
				delete levelLog[v];
			}
		}
		newdiv.addEventListener("click",function(){buildInfoPanel("level");},false);
	}
	var save="";
	for (var v in levelLog) save += v+"~"+levelLog[v]+"|";
	GM_setValue(lng+"_"+server+"_"+username+"_levelLog",save.slice(0,save.length-1));

	// Profit
	newdiv = createElement("div",{"id":"divBeraterButtonsProfit","class":"link beraterButtonIcon hoverBgGreen"},$("divBeraterButtons"));
	createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/farmhouse/items/76_1.png","style":"position:relative;top:-5px;left:-5px;width:40px;height:40px;"},newdiv);
	newdiv.addEventListener("mouseover",function(){
		$("divBeraterButtonsInfo").innerHTML=texte["profitTable"];
		$("divBeraterButtonsInfo").style.display="block";
	},false);
	newdiv.addEventListener("mouseout",function(){
		$("divBeraterButtonsInfo").style.display="none";
	},false);
	newdiv.addEventListener("click",function(){buildInfoPanel("profit");},false);
	
	// Preise
	newdiv = createElement("div",{"id":"divBeraterButtonsPreise","class":"link beraterButtonIcon hoverBgGold"},$("divBeraterButtons"));
	createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/money.gif","style":"width:30px;height:30px;"},newdiv);
	newdiv.addEventListener("mouseover",function(){
		$("divBeraterButtonsInfo").innerHTML=texte["preise"];
		$("divBeraterButtonsInfo").style.display="block";
	},false);
	newdiv.addEventListener("mouseout",function(){
		$("divBeraterButtonsInfo").style.display="none";
	},false);
	newdiv.addEventListener("click",function(){buildInfoPanel("preise");},false);

	// alle Rezepte
	if(unsafeWindow.formulas){
		newdiv = createElement("div",{"id":"divBeraterButtonsFormulas","class":"link beraterButtonIcon hoverBgBlue"},$("divBeraterButtons"));
		createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/farmhouse/catalogue.gif","style":"position:relative;top:3px;left:3px;width:24px;height:24px;"},newdiv);
		newdiv.addEventListener("mouseover",function(){
			$("divBeraterButtonsInfo").innerHTML="Alle Rezepte";
			$("divBeraterButtonsInfo").style.display="block";
		},false);
		newdiv.addEventListener("mouseout",function(){
			$("divBeraterButtonsInfo").style.display="none";
		},false);
		newdiv.addEventListener("click",function(){buildInfoPanel("formulas");},false);
	}
	
	// Uebersicht
	$("titlepig").setAttribute("class","link");
	$("titlepig").addEventListener("click",function(){buildInfoPanel("zonen");},false);
	createElement("div",{"id":"uebersichttooltip","class":"link","style":"background-color:#DE9008;border:1px solid #8F6803;color:#FFFFFF;display:none;font-size:11px;font-weight:normal;overflow:visible;padding:4px;position:absolute;text-align:left;top:23px;white-space:nowrap;z-index:105;"},$("titlepig"),texte["uebersicht"]);
	$("titlepig").addEventListener("mouseover",function(){$("uebersichttooltip").style.display="block";},false);
	$("titlepig").addEventListener("mouseout",function(){$("uebersichttooltip").style.display="none";},false);
	
	// Farmpedia
	var newa = createElement("a",{href:texte["farmpediaUrl"],target:"_blank","style":"position:absolute;top:90px;left:100px;z-index:2;","class":"link",onmouseover:"showDiv('farmpedia')",onmouseout:"hideDiv('farmpedia')"},$("rackBottom"));
	createElement("img",{"style":"width:25px;height:25px;border:none;","src":"http://dqt9wzym747n.cloudfront.net/pics/points.gif"},newa);
	createElement("div",{"id":"farmpedia","style":"position: absolute; white-space: nowrap; top:50px;left:100px; display: none;", "class":"blackbox"},$("rackBottom"),texte["zurFarmpedia"]);
	
	// Quest
	// missing product amounts
	$("questline").addEventListener("mouseout",function(){ if($("qinfoTotal")) $("qinfoTotal").style.display="none"; },false);
	$("questline").addEventListener("mouseover",function(){
		if(!$("qinfoTotal")){ createElement("div",{"id":"qinfoTotal","style":"display:none;position:absolute;top:24px;right:-20px;","class":"blackbox"},$("questline")); }
		if($("qinfoTotal").style.display=="none"){
			$("qinfoTotal").style.display = "block";
			$("qinfoTotal").innerHTML = ""; 
			var newtable = createElement("table",{"border":"0","style":"line-height:16px;"},$("qinfoTotal"));
			var newtr = createElement("tr",{},newtable,prodName[questWare]);
			createElement("td",{"colspan":"3"},newtr);
			createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid black;border-left:1px solid black;"},newtr,texte["fehlt"]);
			createElement("td",{"colspan":"2","style":"text-align:center;border-bottom:1px solid black;border-left:1px solid black;"},newtr,texte["total"]);

			var questWare = $("questline").childNodes[1].firstChild.firstChild.getAttribute("class").replace("kp","");
			var preis = npc[questWare]?Math.min(gut[questWare],npc[questWare]):gut[questWare];
			var questMengeTotal = parseInt($("questline").childNodes[1].childNodes[1].innerHTML.replace(regDelimThou,""),10);
			var questMenge = Math.max(0,questMengeTotal-prodBestand[questWare]);
			var wertTotal1 = questMengeTotal*preis;
			var wert1 = questMenge*preis;
			newtr = createElement("tr",{"title":texte["preis"]+" "+kT_format(preis).replace("&nbsp;"," ")},newtable);
			var newtd = createElement("td",{},newtr);
			produktPic(questWare,newtd);
			createElement("td",{},newtr,prodName[questWare]);
			createElement("td",{"style":"text-align:right;"},newtr,number_format(100*(questMengeTotal-questMenge)/questMengeTotal)+"%");
			createElement("td",{"style":"text-align:right;border-left:1px solid black;"},newtr,number_format(questMenge));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,kT_formatgr(wert1));
			createElement("td",{"style":"text-align:right;border-left:1px solid black;"},newtr,number_format(questMengeTotal));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,kT_formatgr(wertTotal1));

			questWare = $("questline").childNodes[2].firstChild.firstChild.getAttribute("class").replace("kp","");
			preis = npc[questWare]?Math.min(gut[questWare],npc[questWare]):gut[questWare];
			questMengeTotal = parseInt($("questline").childNodes[2].childNodes[1].innerHTML.replace(regDelimThou,""),10);
			questMenge = Math.max(0,questMengeTotal-prodBestand[questWare]);
			var wertTotal2 = questMengeTotal*preis;
			var wert2 = questMenge*preis;
			newtr = createElement("tr",{"title":texte["preis"]+" "+kT_format(preis).replace("&nbsp;"," ")},newtable);
			newtd = createElement("td",{},newtr);
			produktPic(questWare,newtd);
			createElement("td",{},newtr,prodName[questWare]);
			createElement("td",{"style":"text-align:right;"},newtr,number_format(100*(questMengeTotal-questMenge)/questMengeTotal)+"%");
			createElement("td",{"style":"text-align:right;border-left:1px solid black;"},newtr,number_format(questMenge));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,kT_formatgr(wert2));
			createElement("td",{"style":"text-align:right;border-left:1px solid black;"},newtr,number_format(questMengeTotal));
			createElement("td",{"style":"text-align:right;padding-left:10px;"},newtr,kT_formatgr(wertTotal2));

			newtr = createElement("tr",{},newtable);
			createElement("td",{},newtr);
			createElement("td",{},newtr);
			createElement("td",{"style":"text-align:right;border-top:1px solid black;"},newtr,number_format(100*(wertTotal1+wertTotal2-wert1-wert2)/(wertTotal1+wertTotal2))+"%");
			createElement("td",{"style":"text-align:right;border-top:1px solid black;","colspan":"2"},newtr,kT_formatgr(wert1+wert2));
			createElement("td",{"style":"text-align:right;border-top:1px solid black;","colspan":"2"},newtr,kT_formatgr(wertTotal1+wertTotal2));
		}
	},false);
	
	// clubquest direct show
	if ((unsafeWindow.userfarminfos[unsafeWindow.farm]) && (unsafeWindow.userfarminfos[unsafeWindow.farm]['guild']!="0")){
		var lastGuildQuestRequest = 0;
		createElement("div",{"id":"beraterGuildQuest","style":"position:absolute;bottom:45px;right:0px;width:120px;height:100px;display:none;z-index:2;", "class":"blackbox"},$("buildingmain"),"---");
		newdiv = createElement("div",{"style":"position:absolute;right:0px;bottom:0px;background-image:url('http://dqt9wzym747n.cloudfront.net/pics/guildquest_plate.jpg');width:43px;height:45px;background-position:78px -21px;"},$("buildingmain"));
		newdiv.addEventListener("mouseover",function(){
			$("beraterGuildQuest").style.display="block";
			
			if (Now-lastGuildQuestRequest>10){
				lastGuildQuestRequest = Now;
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://s"+server+gamepage+"/guild/ajax/initguild.php",
					headers: {"Content-type": "application/x-www-form-urlencoded"},
					data: "rid="+unsafeWindow.rid,
					onload: function(response) {
						$("beraterGuildQuest").innerHTML = "";
						// todo: kein Quest
						var result = eval('(' + response.responseText + ')')[2];
						var newdiv = createElement("div",{"style":"position:absolute;top:5px;left:5px;"},$("beraterGuildQuest"));
						var newspan = createElement("span",{"style":"margin-right:2px;"},newdiv);
						var newdiv1;
						if(result){
							createElement("img",{"src":unsafeWindow.imgpath+'adtime.gif'},newspan);
							createElement("span",{"style":"font-weight:bold;"},newdiv,time2str(result['remain']));
							if(result['questtype'] == 1 || result['questtype'] == 2){  // produkte oder geld in vorgegebener zeit
								var top = 25;
								var left = 0;
								for(var i = 1 ; i <= 2 ; i++){
									if(result['product' + i] > 0){
										var barleft = parseInt(Math.round((result['sum' + i] * 100) / result['amount' + i])-100,10);	
										
										if(result['questtype'] == 2){
											result['sum' + i] = kT_format(result['sum' + i]);
											result['amount' + i] = kT_format(result['amount' + i]);
										}
										
										newdiv = createElement("div",{"style":'position:absolute; top:' + top + 'px; left:' + left + 'px;width:40px;height:15px;'},$("beraterGuildQuest"));
										if(result['questtype'] == 1){
											newdiv1 = createElement("div",{"style":"position:absolute; top:0px; left:5px;height:15px;width:15px; overflow:hidden;"},newdiv);
											createElement("img",{"class":"kp" + result['product' + i], "style":"position:absolute;"},newdiv1);
										}
										else if(result['questtype'] == 2){
											newdiv1 = createElement("div",{"style":"position:absolute; top:0px; left:5px;height:15px;width:15px;"},newdiv);
											createElement("img",{"src":unsafeWindow.imgpath+"money.gif","height":"15","width":"15"},newdiv1);
										}
										newdiv1 = createElement("div",{"style":"position:absolute;top:0px;left:23px;border:1px solid #000;background-color:#fff;width:100px;height:15px;overflow:hidden;"},newdiv);
										createElement("div",{"style":"position:absolute;top:0px;left:"+barleft+"px;background-color:#f00;width:100px;height:25px;"},newdiv1);
										createElement("div",{"style":"position:absolute;top:20px;white-space:nowrap;left:5px;"},newdiv,'<b>' + number_format(result['sum' + i]) + '/' + number_format(result['amount' + i]) + '</b>');
								top = top+40;
							}	}	}	
						} else {
							newspan.innerHTML = "---";
						}
						newdiv=null;newdiv1=null;newspan=null;
					}
				});	
			}
		},false);
		newdiv.addEventListener("mouseout",function(){$("beraterGuildQuest").style.display="none";},false);
	}

	var questShow = GM_getValue(lng+"_"+server+"_"+username+"_questShow",true);
	var questNr = GM_getValue(lng+"_"+server+"_"+username+"_quest",0);
	unsafeWindow.showquestline = questShow?0:1;
	unsafeWindow.handleQuestLine();
	$("questlineopener").addEventListener("click",function(){
		questShow = ($("questline").style.display!="none");
		GM_setValue(lng+"_"+server+"_"+username+"_questShow",questShow);
	},false);
	// Questspoiler
	function showNextQuest(){
		if ($("questlineopener").style.display != "block"){
			var nr = GM_getValue(lng+"_"+server+"_"+username+"_quest",0); 
			var questData = [[17,43,9,1],[1,173,9,2],[18,192,17,288],[18,672,9,10],[17,922,9,19],[20,360,18,960],[19,540,20,720],[2,240,21,245],[20,1440,9,24],[21,1152,9,48],[9,72,22,1037],[20,3456,10,27],[18,8064,10,48],[23,3110,9,144],[10,96,9,180],[9,240,6,1836],[10,384,9,144],[10,192,23,6739],[22,7518,9,216],[11,150,10,272],[7,1350,12,50],[23,15552,9,1008],[29,6552,25,130],[1,51840,27,55],[11,280,12,210],[10,672,12,210],[1,75600,2,25000],[11,480,12,272],[9,2688,10,1024],[12,320,11,560],[29,14742,27,194],[20,77760,12,383],[12,540,32,14600],[32,50400,25,432],[10,1760,11,1000],[9,4800,12,595],[26,46550,27,216],[1,259200,30,216],[23,51840,28,230],[9,5280,10,1795],[25,475,30,238],[34,64152,28,253],[11,1320,12,880],[27,238,24,30294],[10,2304,30,259],[9,5760,10,2304],[37,13800,25,518],[9,5760,10,1958],[28,276,30,259],[12,1040,30,281],[20,72000,12,800],[12,4000,10,1920],[23,64800,9,4800],[25,432,28,230],[24,72000,27,216],[7,18000,10,1920],[27,216,11,1200],[31,103700,30,216],[11,1200,25,432],[21,57600,10,1920],[12,800,27,216],[29,27300,25,432],[4,48000,9,4800],[28,230,27,216],[33,43200,25,432],[9,4800,12,800],[8,18000,28,230],[10,1920,11,1200],[34,64800,30,216],[6,10800,28,230],[11,1200,10,1920],[35,12950,27,216],[25,432,11,1200],[32,72000,12,800],[36,24500,9,4800],[27,216,30,216],[26,66500,28,230],[12,800,10,1920],[37,3833,9,4800],[28,230,25,432],[33,43200,12,800],[38,108000,30,216],[9,4800,28,230],[5,72000,10,1920],[30,216,9,4800],[39,2867,12,800],[10,1920,25,432],[32,72000,27,216],[40,2250,12,800],[25,432,11,1200],[3,64000,30,216],[27,216,11,1200],[41,1975,10,1920],[11,1200,27,216],[24,72000,10,1280],[12,800,9,4800],[36,24500,28,230],[31,103700,10,1920],[28,230,25,432],[42,1680,30,216]]
			$("questlineopener").style.display = "block";
			$("questlineopener").style.height = "25px";
			$("questlineback").style.display = questShow?"block":"none";
			$("questlineback").style.height = "25px";
			$("questline").style.display = questShow?"block":"none";
			$("questline").style.height = "25px";
			$("questline").innerHTML = "";
			var help = GM_getValue(lng+"_"+server+"_"+username+"_questTime",0); 
			if(help>Now){ createElement("div",{"style":"position: absolute; top: 5px; left: 5px;width: 95px;height: 15px;"},$("questline"),uhrzeit(help,1)+"&nbsp;"+texte["uhr"]); }
			var newdiv = createElement("div",{"style":"position:absolute;top:5px;left:100px;width:40px;height:15px;"},$("questline"));
			var newdiv1 = createElement("div",{"style":"position:absolute;top:0px;left:0px;height:15px;width:15px;overflow:hidden;"},newdiv);
			createElement("img",{"style":"position:absolute;","class":"kp"+questData[nr][0]},newdiv1);
			createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,number_format(questData[nr][1]));
			newdiv = createElement("div",{"style":"position:absolute;top:5px;left:162px;width:40px;height:15px;"},$("questline"));
			newdiv1 = createElement("div",{"style":"position:absolute;top:0px;left:0px;height:15px;width:15px;overflow:hidden;"},newdiv);
			createElement("img",{"style":"position:absolute;","class":"kp"+questData[nr][2]},newdiv1);
			createElement("div",{"style":"position: absolute; left: 18px; top: 0px;"},newdiv,number_format(questData[nr][3]));
			newdiv=null;newdiv1=null;
		}
	}
	// quest growtime-boni
	if(questNr>=51){ dauer[23]-=15;
	if(questNr>=54){ dauer[24]-=15;
	if(questNr>=57){ dauer[31]-=15;
	if(questNr>=59){ dauer[21]-=10;
	if(questNr>=61){ dauer[29]-=15;
	if(questNr>=64){ dauer[33]-=15;
	if(questNr>=66){ dauer[22]-=10;
	if(questNr>=68){ dauer[34]-=15;
	if(questNr>=71){ dauer[35]-=20;
	if(questNr>=74){ dauer[36]-=15;
	if(questNr>=76){ dauer[7]-=10;
	if(questNr>=78){ dauer[37]-=30;
	if(questNr>=81){ dauer[38]-=15;
	if(questNr>=81){ dauer[19]-=5;
	if(questNr>=85){ dauer[39]-=30;
	if(questNr>=88){ dauer[40]-=30;
	if(questNr>=90){ dauer[20]-=10;
	if(questNr>=92){ dauer[41]-=30;
	if(questNr>=94){ dauer[8]-=15;
	if(questNr>=96){ dauer[26]-=15;
	if(questNr>=98){ dauer[42]-=30;
	if(questNr>=100){ dauer[33]-=15;
	}}}}}}}}}}}}}}}}}}}}}}

	// Notepad
	window.setTimeout(function(){ // "premium" not well set at first login
		if(unsafeWindow.premium!="1"){ 
			var newspan = createElement("img",{"id":"beraterNotepad","class":"link","style":"margin-bottom:10px;"},$("friendlistbeside"));
			var newimg = createElement("img",{"title":unsafeWindow.lng_t_notizen,"src":"http://dqt9wzym747n.cloudfront.net/pics/guild/contract.gif","style":"width:15px;height:15px;"},newspan);
			newspan.addEventListener("click",function(){
				$("notepadentry").value = GM_getValue(lng+"_"+server+"_"+username+"_notepad","");
				unsafeWindow.calcNotepadLetters();
				unsafeWindow.showDiv("notepad");
			},false);
			newspan=null;newimg=null;
			$("notepadheader").getElementsByTagName("img")[0].removeAttribute("onclick");
			$("notepadheader").getElementsByTagName("img")[0].addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_notepad",$("notepadentry").value);
				unsafeWindow.hideDiv("notepad");
			},false);
		}
	},1000);

	// BuyNotepad
	newdiv = createElement("div",{"style":"position:relative;display:block;white-space:nowrap;"},all.getElementsByClassName("rahmen_hoch")[2]);
	newdiv = createElement("div",{"id":"buyNotepadOpener","class":"link","style":"display:inline-block;height:25px;width:20px;background:no-repeat scroll center top #000000;"},newdiv);
	newdiv.style.backgroundImage="url('http://dqt9wzym747n.cloudfront.net/pics/arrow_right.png')";
	newdiv.addEventListener("click",function(){
		if($("buyNotepad")){
			removeElement($("buyNotepad"));
			this.style.backgroundImage="url('http://dqt9wzym747n.cloudfront.net/pics/arrow_right.png')";
		} else {
			var farmiNr=-1;
			var farmiSum = new Object;
			while (unsafeWindow.top.farmisinfo[0][++farmiNr]) {
				if (!unsafeWindow.top.farmisaway[farmiNr]){
					for(var i = 1 ; i <= 7 ; i++) { // 7 = maxanzahl produkte pro farmi
						var pid = unsafeWindow.top.farmisinfo[0][farmiNr]["p"+i];
						var amount = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["a"+i],10);
						if((pid > 0) && (amount > 0)) {
							if (farmiSum[pid]) farmiSum[pid] += amount;
							else farmiSum[pid] = amount;
						}
					}
				}
			}
			var newdiv = createElement("div",{"id":"buyNotepad","style":"display:inline-block;border:2px inset black;background-color:white;padding:3px;"},this.parentNode);
			var newdiv1;
			for (var w=0;w<prodNameSort.length;w++){
				var v = prodNameSort[w];
				var amount = 0;
				var amount1 = (farmiSum[v]?farmiSum[v]:0)-(unsafeWindow.rackElement[v].number?unsafeWindow.rackElement[v].number:0);
				if(prodTyp[v]=="v"){
					amount = amount1+valMinRackV; 
				} else if (prodTyp[v]=="e"){ 
					amount = amount1+valMinRackE; 
				}
				if (amount>0){
					produktPic(v,newdiv);
					newdiv1 = createElement("div",{"style":"float:left;","class":"link","name":v,"title":texte["zumIdMarkt"].replace("xx",prodName[v])},newdiv,number_format(amount)+(amount1>0?"&nbsp;("+number_format(amount1)+")":"")+"&nbsp;"+prodName[v]);
					newdiv1.addEventListener("click",function(){showMarket(this.getAttribute("name"));},false);
					createElement("div",{"style":"clear:both;"},newdiv);
				}
			}		
			this.style.backgroundImage="url('http://dqt9wzym747n.cloudfront.net/pics/arrow_left.png')";
			newdiv=null;newdiv1=null;
		}
	},false);

	// Farmis
	$("customerstats").setAttribute("class","link");
	$("customerstats").addEventListener("click",function(){buildInfoPanel("farmiLog")},false);
	var arrFarmiWert = new Array();
	var arrFarmiLog = new Array();
	var arrFarmiIDs = new Object();
	try{ var help = GM_getValue(lng+"_"+server+"_"+username+"_farmiLog");
		if (help) {
			var help2 = help.split("|");
			for (var v=0;v<help2.length;v++){
				var help3 = help2[v].split("~");
				var help4 = help3.splice(0,1);
				if (!arrFarmiIDs[help4]){
					var day = help3[1].split(/\./);
					var day1 = (new Date(parseInt(day[2],10)+1900,parseInt(day[1],10),parseInt(day[0],10))).getTime()/1000;
					if (Now-day1<2419200){ //4 Wochen
						arrFarmiLog.push(help3);
						arrFarmiIDs[help4] = 1;
					}
				}
			}
		}
	}catch(err){}
	do_farmis();
	function do_kaufliste(){
		if(!$("beraterDoKaufliste")){
			createElement("h1",{"id":"beraterDoKaufliste","style":"display:none;"},$("cartheader"));
			var canddiv = $top("cartheader").getElementsByTagName("span")[0];
			canddiv.setAttribute("class","link");
			canddiv.setAttribute("title",texte["zumSGH"]);
			canddiv.addEventListener("click",showSGH,false);
			var keyware = /(.+)x (.+) /;
			var sum=0;
			var newdiv;
			for(var v=0;v<$top("cartcontent").childNodes.length;v++){
				canddiv = $top("cartcontent").childNodes[v].childNodes[1];
				var help = keyware.exec(canddiv.innerHTML);
				var menge = parseInt(help[1],10);
				var ware = help[2];
				var wert = 0.9*menge*gut[prodId[ware]];
				sum += wert;
				newdiv = createElement("div",{"style":"margin-left: 5px; float: left; color: rgb(51, 51, 102); font-size:14px;font-weight:normal;"});
				newdiv.innerHTML = "("+kT_formatgr(wert)+")";
				canddiv.parentNode.insertBefore(newdiv,canddiv.nextSibling);
				canddiv.setAttribute("class","link");
				canddiv.setAttribute("title",texte["zumIdMarkt"].replace("xx",ware));
				canddiv.addEventListener("click",function(){showMarket(prodId[keyware.exec(this.innerHTML)[2]]);},false);
				if (((unsafeWindow.produkt_category[prodId[ware]]=="v")&&(unsafeWindow.rackElement[prodId[ware]].number)&&(menge<unsafeWindow.rackElement[prodId[ware]].number)&&(unsafeWindow.rackElement[prodId[ware]].number<menge+valMinRackV)) ||
					((unsafeWindow.produkt_category[prodId[ware]]=="e")&&(unsafeWindow.rackElement[prodId[ware]].number)&&(menge<unsafeWindow.rackElement[prodId[ware]].number)&&(unsafeWindow.rackElement[prodId[ware]].number<menge+valMinRackE))){ canddiv.style.color="magenta"; }
			}
			canddiv = $top("cartsubmit").getElementsByTagName("div");
			canddiv[1].innerHTML="";
			var preis = keyfloat.exec(canddiv[0].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."))[1];
			canddiv[0].innerHTML+= "<br><span style='font-size:15px;font-weight:normal;'>("+kT_formatgr(sum)+" / "+Math.round(100*preis/sum)+"%)</span>";
			canddiv=null;newdiv=null;
		}
	}
	function do_farmis(){
		for (var v=0;v<$("customerline").childNodes.length;v++) if (!$("farmiInfo"+v)){
			createElement("div",{"id":"farmiInfo"+v,"style":"position:absolute;top:-45px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:5px;color: black;width:70px;font-size:0.8em;height:35px;"},$("blase"+v));
			$("kunde_"+v).addEventListener("mouseover",function(){
				var farmiNr = this.id.replace("kunde_","");
				var picpos = 0;
				var cash = parseFloat(unsafeWindow.top.farmisinfo[0][farmiNr]["price"],10);
				arrFarmiWert[farmiNr]=0;
				for(var i = 1 ; i <= 7 ; i++) { // 7 = maxanzahl produkte pro farmi
					var pid = unsafeWindow.top.farmisinfo[0][farmiNr]["p"+i];
					var amount = parseInt(unsafeWindow.top.farmisinfo[0][farmiNr]["a"+i],10);
					if((pid > 0) && (amount > 0)) {
						var borderstr="";
						if ((!unsafeWindow.rackElement[pid].number) || (unsafeWindow.rackElement[pid].number<amount)) { borderstr="1px red solid"; }
						else {
							if (((unsafeWindow.produkt_category[pid]=="v")&&(unsafeWindow.rackElement[pid].number<amount+valMinRackV))||
								((unsafeWindow.produkt_category[pid]=="e")&&(unsafeWindow.rackElement[pid].number<amount+valMinRackE))){ borderstr="1px blue solid"; }
						}
						$("blase"+farmiNr).firstChild.childNodes[picpos].style.border = borderstr;
						arrFarmiWert[farmiNr] += 0.9*amount*gut[pid];
					}
					picpos++;
					if (i==4) picpos++;
				}
				var cell = $("farmiInfo"+farmiNr);
				if (cash<arrFarmiWert[farmiNr]) {
					cell.innerHTML = kT_formatgr(cash)+"<br>"+number_format(100*cash/arrFarmiWert[farmiNr],1)+"&nbsp;%<br>"+kT_formatgr(cash-arrFarmiWert[farmiNr]);
					if (cash<0.95*arrFarmiWert[farmiNr]) {
						cell.style.border="solid thin red";
						cell.style.backgroundColor="#FFDDDD";
					} else {
						cell.style.border="solid thin red";
						cell.style.backgroundColor="#FFE87C";
					}
				} else {
					cell.innerHTML = kT_formatgr(cash)+"<br>"+number_format(100*cash/arrFarmiWert[farmiNr],1)+"&nbsp;%<br>+"+kT_formatgr(cash-arrFarmiWert[farmiNr]);
					cell.style.border="solid thin green";
					cell.style.backgroundColor="#DDFFDD";
				}
				cell=null;
			},false);
			if (!arrFarmiIDs[unsafeWindow.farmisinfo[0][v].id]){ //FarmiLog
				arrFarmiLog.splice(0,0,[]);
				var save = unsafeWindow.farmisinfo[0][v].id;
				arrFarmiLog[0][0]=unsafeWindow.farmisinfo[0][v]["price"];
				save+="~"+arrFarmiLog[0][0];
				arrFarmiLog[0].push(today);
				save+="~"+today;
				for (var w=1;w<8;w++) if (unsafeWindow.farmisinfo[0][v]["p"+w]!="0"){
					arrFarmiLog[0].push(unsafeWindow.farmisinfo[0][v]["p"+w],unsafeWindow.farmisinfo[0][v]["a"+w]);
					save+="~"+unsafeWindow.farmisinfo[0][v]["p"+w]+"~"+unsafeWindow.farmisinfo[0][v]["a"+w];
				}
				arrFarmiIDs[unsafeWindow.farmisinfo[0][v].id]=1;
				var help = GM_getValue(lng+"_"+server+"_"+username+"_farmiLog","");
				if (help) save+="|"+help;
				GM_setValue(lng+"_"+server+"_"+username+"_farmiLog",save);
			}
		}
	}
	//Werbung endet
	if((unsafeWindow.customerstats)&&(unsafeWindow.customerstats["adstart"])&&(unsafeWindow.customerstats[4])&&(unsafeWindow.customerstats[4]["date"]==unsafeWindow.customerstats["adstart"])){
		if((unsafeWindow.adrun)&&(parseInt(unsafeWindow.customerstats[1]["count"],10)>5+2*unsafeWindow.adrun)){
			createElement("div",{"style":"position:absolute;top:50px;left:0px;color:white;font-weight:bold;background-color:red;padding:2px;white-space:nowrap;"},$("customerstats"),texte["adEnds"]);
		}
	}
	
	// Sprechblase
	for (var v=1;v<7;v++){
		$("zone"+v).addEventListener("mouseout",function(){unsafeWindow.gclr()},false);
		$("zone"+v).addEventListener("mouseover",function(){showBlase(parseInt(this.id.replace("zone",""),10))},true);
	}
	function showBlase(zoneNr){
		zoneNr += 6*farmNr;
		$("sprcontent").firstChild.innerHTML = "";
		var newdiv = createElement("div",{},$("sprcontent").firstChild);
		createElement("div",{"class":"tt"+zoneNext[zoneNr],"style":"float:left;margin-top:5px;margin-right:5px;"},newdiv);
		createElement("font",{"class":"tnormal","style":"font-weight:bold"},newdiv,prodName[zoneNext[zoneNr]]?prodName[zoneNext[zoneNr]]+"<br>":texte["main1"]);
		var newfont = createElement("font",{"class":"tnormal"},newdiv);
		if (nextTime[zoneNr]<=Now) {
			newfont.innerHTML = texte["fertig"]+"<br>"+texte["seit"]+" "+uhrzeit(nextTime[zoneNr])+"&nbsp;"+texte["uhr"];
		} else {if (nextTime[zoneNr]<nie) {
			var endDay = 3;
			if (nextTime[zoneNr]-Now<345000) endDay = (((new Date(1000*(nextTime[zoneNr])).getDay())-Today+7)%7);
			if (endDay == 0) newfont.innerHTML = texte["fertig"]+"<br>"+texte["um"]+" "+uhrzeit(nextTime[zoneNr])+"&nbsp;"+texte["uhr"];
			else if (texte["day"+endDay]) newfont.innerHTML = texte["day"+endDay]+" "+texte["fertig"].toLowerCase()+"<br>"+texte["um"]+" "+uhrzeit(nextTime[zoneNr])+"&nbsp;"+texte["uhr"];
			else newfont.innerHTML = new Date(1000*nextTime[zoneNr]).toLocaleString();
			}
		}
		newdiv=null;newfont=null;
	}

	// Lager
	var newspan = createElement("span",{"style":"position:absolute; top: 50px; left: 58px;display:none;"},$("lager_info"));
	createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/adtime.gif", "style":"width:14px;height:14px;"},newspan);
	createElement("span",{"id":"lager_zeit_ziel", "class":"tnormal","style":"position:absolute; top: -1px; left: 20px;"},newspan);
	$("lager").addEventListener("mouseover",function(){
		if ($("rackPopup")) {
			var currId = prodId[$("rackPopup").firstChild.firstChild.innerHTML];
			var newdiv;
			if (npc[currId]>0) {
				newdiv = createElement("div",{"class":"tmenu","style":"position:relative;height:13px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
				createElement("span",{"style":"float:left;width:60px;"},newdiv,texte["hofpreis"]+": ");
				createElement("span",{"style":"float:left;width:80px;text-align:right;"},newdiv,kT_format(npc[currId]));
			}
			newdiv = createElement("div",{"class":"tmenu","style":"position:relative;height:13px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
			createElement("span",{"style":"float:left;width:60px;"},newdiv,texte["marktpreis"]+": ");
			createElement("span",{"style":"float:left;width:80px;text-align:right;"},newdiv,kT_format(gut[currId]));
			newdiv = createElement("div",{"class":"tmenu","style":"position:relative;height:25px;width:172px;top:-75px;padding-left:20px;background: url('http://dqt9wzym747n.cloudfront.net/pics/lager/flaeche.gif') left top transparent;background-position:0px -155px;"},$("rackPopup"));
			createElement("span",{"style":"float:left;width:60px;"},newdiv,texte["wert"]+": ");
			createElement("span",{"style":"float:left;width:80px;text-align:right;"},newdiv,kT_formatgr(gut[currId]*unsafeWindow.rackElement[currId].number));
			newdiv=null;
		}
	},false);

	if(unsafeWindow.userracks>1){
		GM_addStyle("#racknavileft,#racknaviright{display:none!important;}");
		newdiv = createElement("div",{"style":"top:0px;left:0px;","class":"racknavi"},$("rackInfo"));
		newdiv1 = createElement("div",{"onmouseout":"hideDiv('racknavileftinfo1');","onmouseover":"$('racknavileftinfo1').innerHTML=rackname+(1+((userracks-1+parseInt(_currRack,10))%userracks));showDiv('racknavileftinfo1');","onclick":"updateRack((userracks-1+parseInt(_currRack,10))%userracks);","class":"link racknavi"},newdiv);
		createElement("div",{"style":"position:absolute;white-space:nowrap;display:none;top:25px;left:0px;","class":"blackbox","id":"racknavileftinfo1"},newdiv1);
		newdiv = createElement("div",{"style":"top:0px;left:182px;","class":"racknavi"},$("rackInfo"));
		newdiv1 = createElement("div",{"onmouseout":"hideDiv('racknavirightinfo1');","onmouseover":"$('racknavirightinfo1').innerHTML=rackname+(1+((1+parseInt(_currRack,10))%userracks));showDiv('racknavirightinfo1');","onclick":"updateRack((1+parseInt(_currRack,10))%userracks);","class":"link racknavi"},newdiv);
		createElement("div",{"style":"position:absolute;white-space:nowrap;display:none;top:25px;right:0px;","class":"blackbox","id":"racknavirightinfo1"},newdiv1);
	}
	
	var valMoveAnimals = new Array;
	try{ valMoveAnimals = explode(GM_getValue(lng+"_"+server+"_"+username+"_valMoveAnimals","[]")); }catch(err){}
	var animalMove = [,,[false,0,0,255,10,10,505],[false,0,0,280,1,0,525],[false,0,0,280,1,25,500],,,,,,,[false,2,20,120,4,0,200]];
	// executed,speedvert,top,bottom,speedhor,left,right
	function moveAnimals(mode){
		//GM_log("moveAnimals "+mode);
		if(($("innermaincontainer").style.display == "block")&&($("animalline"+mode))){
			cand = $("animalline"+mode).getElementsByTagName("img");
			for(var v=0;v<cand.length;v++){
				cand[v].style.top = (Math.max(animalMove[mode][2],Math.min(animalMove[mode][3],parseInt(cand[v].style.top,10)+animalMove[mode][1]*getRandom(-1,1))))+"px";
				cand[v].style.left = (Math.max(animalMove[mode][5],Math.min(animalMove[mode][6],parseInt(cand[v].style.left,10)+animalMove[mode][4]*getRandom(-1,1))))+"px";
			}
			window.setTimeout(function(){moveAnimals(mode)},100);
		} else {
			animalMove[mode][0] = false;
		}
	}
	
	function loop05() {
		//Session testen
		if (unsafeWindow.rid!=GM_getValue(lng+"_"+server+"_"+username+"_session","")) unsafeWindow.initZones(1);
		else GM_setValue(lng+"_"+server+"_sessionlost",false);
		
		var newdiv,newdiv1,newa,newspan,cand;
		if($("farmlinks").style.display!=""){
			$("farmlinks").style.display="";
			$("cityline").style.display="";
		}

		// Farm offen
		if (unsafeWindow.userfarminfos[unsafeWindow.farm]) {
			//Farmwechsel
			if(farmNr != parseInt(unsafeWindow.farm,10)-1){
				farmNr = parseInt(unsafeWindow.farm,10)-1;
				for (var v=1;v<=6;v++){
					var vf = v+6*farmNr;
					zoneTyp[vf] = unsafeWindow.userfarminfos[farmNr+1][v]["buildingid"];
					if (zoneTyp[vf]=="6") zoneTyp[vf] = "0"; //Clubhaus
					if ((unsafeWindow.premium!="1") && (unsafeWindow.userfarminfos[farmNr+1][v]["premium"]=="1")) zoneTyp[vf] = "0"; //Premiumfeld
					if (zoneTyp[vf]=="1"){
						zoneBonus[vf] = unsafeWindow.userfarminfos[farmNr+1][v]["waterbonus"];
						zoneBonusSpecialProduct[vf] = unsafeWindow.userfarminfos[farmNr+1][v]["specialwaterbonus"][0];
						zoneBonusSpecialAmount[vf] = unsafeWindow.userfarminfos[farmNr+1][v]["specialwaterbonus"][1];
					}
				}
				lastGiess = 0;
				lastErnte = 0;
				GM_setValue(lng+"_"+server+"_"+username+"_zoneTyp",zoneTyp.join("|"));
				GM_setValue(lng+"_"+server+"_"+username+"_zoneBonus",zoneBonus.join("|"));
				GM_setValue(lng+"_"+server+"_"+username+"_zoneBonusSpecialProduct",zoneBonusSpecialProduct.join("|"));
				GM_setValue(lng+"_"+server+"_"+username+"_zoneBonusSpecialAmount",zoneBonusSpecialAmount.join("|"));
				unsafeWindow.GMzoneTyp = zoneTyp.slice();
				unsafeWindow.GMzoneBonus = zoneBonus.slice();
				unsafeWindow.GMzoneBonusSpecialProduct = zoneBonusSpecialProduct.slice();
				unsafeWindow.GMzoneBonusSpecialAmount = zoneBonusSpecialAmount.slice();
			}
		
			//offener Acker
			var help = keygarten.exec($("gardenarea").innerHTML);
			if (help && $("gardenmaincontainer").style.display=="block"){
				var zoneNr = parseInt(help[1],10);
				var zoneNrF = zoneNr+6*farmNr;
				var NowServer = parseInt(unsafeWindow.Zeit.Server,10);
				zoneErnte[zoneNrF] = new Object;
				if (!$("divErnteInfo")) createElement("div",{"id":"divErnteInfo"},$("gardenmaincontainer"));
				if (!$("ackerNavi")) {
					newdiv = createElement("div",{"id":"ackerNavi"},$("gardenmaincontainer"));
					var c1 = zoneNrF-1;
					while(zoneTyp[c1]!="1") {c1 = ((c1+16)%18)+1;}
					var c2 = zoneNrF+1;
					while(zoneTyp[c2]!="1") {c2 = (c2%18)+1;}
					if (c1!=zoneNrF) {
						if (c1!=c2) {
						newdiv1 = createElement("div",{"class":"link leftarrow","name":c1},newdiv);
						newdiv1.addEventListener("click",function(){
							goToZone(this.getAttribute("name"));
							removeElement($("ackerNavi"));
						},false);
						}
						newdiv1 = createElement("div",{"class":"link rightarrow","name":c2},newdiv);
						newdiv1.addEventListener("click",function(){
							goToZone(this.getAttribute("name"));
							removeElement($("ackerNavi"));
						},false);
					}
				}
				if ($("errorboxgarden").style.display == "block"){
					$("divErnteInfo").innerHTML = $("errorboxcontentgarden").innerHTML;
					$("divErnteInfo").style.display="";
					if (valErnteMsg) $("errorboxgarden").style.display="none";
				}
				if ( $("transp8").style.display=="block") {
					$("transp8").style.display="none";
					unsafeWindow.refreshGarden(zoneNr);
				}
				var bonus = 1-parseInt(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["waterbonus"],10)/100;
				if ($("lager_zeit_ziel").parentNode.style.display == "none") $("lager_zeit_ziel").parentNode.style.display = "";
				if (prodTyp[unsafeWindow.selected]=="v") {
					$("lager_zeit_ziel").innerHTML = "=&nbsp;"+uhrzeit(Now+calcDauer(unsafeWindow.rackElement[unsafeWindow.selected].duration/1000,bonus))+"&nbsp;"+texte["uhr"];
				} else {
					$("lager_zeit_ziel").innerHTML = "=&nbsp;-";
				}
		
				nextTime[zoneNrF] = nie;
				nextTimeWasser[zoneNrF] = nie;
				var ernten = false;
				var c=1;
				var leereFelder = 0;
				var currPlant = null;
				zoneMainprod[zoneNrF]="";
				zoneNext[zoneNrF]="";
				for(var v=1;v<=120;v++){
					if(unsafeWindow.garten_kategorie[v]=="v"){
						var z = parseInt(unsafeWindow.garten_zeit[v],10);
						if (currPlant = unsafeWindow.garten_prod[v]){
							if (zoneMainprod[zoneNrF]==currPlant) c++; else c--;
							if (c<1) zoneMainprod[zoneNrF]=currPlant;
							if (!zoneErnte[zoneNrF][currPlant]){ zoneErnte[zoneNrF][currPlant]=[0,0]; }
							zoneErnte[zoneNrF][currPlant][0] += (unsafeWindow.produkt_ernte[currPlant]+((powerup[currPlant]&&(z-NowServer<powerup[currPlant][0]))?powerup[currPlant][1]:0))/(unsafeWindow.produkt_x[currPlant]*unsafeWindow.produkt_y[currPlant]);
							zoneErnte[zoneNrF][currPlant][1] += (punkte[currPlant]+((powerup[currPlant]&&(z-NowServer<powerup[currPlant][0]))?powerup[currPlant][2]:0))/(unsafeWindow.produkt_x[currPlant]*unsafeWindow.produkt_y[currPlant]);
						} else leereFelder++;
						if (z>0){
							nextTimeWasser[zoneNrF] = Math.min(nextTimeWasser[zoneNrF],parseInt(unsafeWindow.garten_wasser[v],10));
							if (z<NowServer) ernten=true;
							if (z < nextTime[zoneNrF]) {
								nextTime[zoneNrF] = z;
								zoneNext[zoneNrF] = unsafeWindow.garten_prod[v];
							}
							if ((unsafeWindow.garten_x[v]=="2")||(unsafeWindow.garten_y[v]!=unsafeWindow.garten_max_y[v])) {
								if ($("w"+v).style.display!="none") $("w"+v).style.display = "none";
							} else {
								if ($("w"+v).style.display!="") $("w"+v).style.display = "";
							}
						}
					} else {
						if ((unsafeWindow.garten_kategorie[v]!="z") && (unsafeWindow.garten_kategorie[v]!="u")) leereFelder++;
					}
				}
				if (leereFelder>valLeereFelderLimit){
					nextTime[zoneNrF] = nie;
					zoneNext[zoneNrF] = "";
				}
				GM_setValue(lng+"_"+server+"_"+username+"_zoneMainprod",zoneMainprod.join("|"));
		
				if(valGiess && (nextTimeWasser[zoneNrF]+86400<unsafeWindow.Zeit.Server) && (lastGiess!=zoneNr) && $("tooltipwaterall")) {
					unsafeWindow.waterGarden(zoneNr);
					lastGiess = zoneNr;
				}
				if(valErnte && ernten && (lastErnte!=zoneNr)) {
					unsafeWindow.cropGarden(zoneNr);
					lastErnte = zoneNr;
				}
		
				//Klon des Anpflanzautomaten
				if($("gardencancel").childNodes.length==1 && $("autoplantbutton"+zoneNr)){
					newdiv = $("autoplantbutton"+zoneNr).parentNode.cloneNode(true);
					newdiv.addEventListener("click",function(){$("gardenmaincontainer").setAttribute("style","display:none");},false);
					$("gardencancel").appendChild(newdiv);
				}
			} else {
				lastGiess=0;
				lastErnte=0;
				if ($("divErnteInfo")) removeElement($("divErnteInfo"));
				if ($("ackerNavi")) removeElement($("ackerNavi"));
				if ($("lager_zeit_ziel").parentNode.style.display == "") $("lager_zeit_ziel").parentNode.style.display = "none";
			}
			//Zonen
			for (var zoneNr=1;zoneNr<=6;zoneNr++){
				var zoneNrF = zoneNr+6*farmNr;
				if (zoneTyp[zoneNrF]!="0") {
					if($("buildingdestructbutton"+zoneNr)) {
						var help = $("zone"+zoneNr).childNodes[1].childNodes.length;
						if(ausbau[zoneTyp[zoneNrF]][help]){
							if (!$("updateinfo"+zoneNr)){
								newdiv = createElement("div",{"id":"zoneupdatebutton"},$("zonebuttons"+zoneNr));
								createElement("img",{"id":"buildingupdatebutton"+zoneNr,"src":"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png","style":"width:25px;height:25px;"},newdiv);
								createElement("div",{"style":"position:absolute;top:0px;left:0px;width:19px;height:19px;border:3px solid #117711;-moz-border-radius:15px;","onmouseout":"changeButton('buildingupdatebutton"+zoneNr+"',0,"+zoneNr+");hideDiv('updateinfo"+zoneNr+"');","onmouseover":"changeButton('buildingupdatebutton"+zoneNr+"',1,"+zoneNr+"); showDiv('updateinfo"+zoneNr+"');"},newdiv);
								createElement("div",{"id":"updateinfo"+zoneNr,"style":"display:none;position:absolute;top:75px;left:35px;z-index:100;","class":"blackbox"},$("zone"+zoneNr),texte["levelBenoetigt"].replace(/%1%/,ausbauLevel[zoneTyp[zoneNrF]][help])+"<br>"); 
							} else {
								$("updateinfo"+zoneNr).innerHTML = "";
							}
							$("updateinfo"+zoneNr).innerHTML += texte["ausbauenFuer"].replace(/%1%/,(typeof(ausbau[zoneTyp[zoneNrF]][help])=="number")?kT_formatgr(ausbau[zoneTyp[zoneNrF]][help]):ausbau[zoneTyp[zoneNrF]][help]+"&nbsp;"+texte["coins"]);
						}
						removeElement($("buildingdestructbutton"+zoneNr));
						createElement("span",{"id":"buildinginfoPoints"+zoneNr},$("buildinginfo"+zoneNr));
						$("zone"+zoneNr).firstChild.addEventListener("mouseover",function(){
							var currZone = parseInt(this.parentNode.id.replace("zone",""),10);
							var currZoneF = currZone+6*farmNr;
							var points=0;
							for (var k in zoneErnte[currZoneF]){ points += zoneErnte[currZoneF][k][1]; }
							$("buildinginfoPoints"+currZone).innerHTML = punkte_format(points,"div").innerHTML;
						},false);
						//mehr Huehner
						if (zoneTyp[zoneNrF]=="2") {
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:60px;left:30px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:30px;left:10px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:50px;left:70px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:100px;left:50px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:80px;left:30px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani1.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:30px;left:50px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/chickenmapani2.gif"},newdiv);
						}
						//mehr Schafe
						if (zoneTyp[zoneNrF]=="4") {
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:60px;left:30px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/sheep_ani01.gif"},newdiv);
							newdiv = createElement("div",{"class":"link","style":"position:absolute;top:30px;left:10px;","id":zoneNr},$("zone"+zoneNr).firstChild);
							newdiv.addEventListener("mouseout",function(){unsafeWindow.hideDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("mouseover",function(){unsafeWindow.showDiv("buildinginfo"+this.id)},false);
							newdiv.addEventListener("click",function(){unsafeWindow.initLocation(this.id)},false);
							createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/sheep_ani02.gif"},newdiv);
						}
					}
					if(!$("zoneinfo"+zoneNr)) {
						newdiv = createElement("div",{"id":"zoneinfo"+zoneNr},$("zone"+zoneNr));
						newdiv.addEventListener("mouseover",function(){
							var currId = parseInt(this.id.replace("zoneinfo",""),10);
							var divtimeevent = $("timeevent"+currId);
							divtimeevent.innerHTML="";
							var newdiv=createElement("div",{},divtimeevent,texte["ertrag"]+":");
							for (var k in zoneErnte[currId+6*farmNr]) {
								newdiv=createElement("div",{"style":"height:15px"},divtimeevent);
								produktPic(k,newdiv);
								createElement("div",{"style":"padding-left:18px;"},newdiv,zoneErnte[currId+6*farmNr][k][0]+" "+prodName[k]);
							}
							divtimeevent.style.display="block";
							newdiv=null;divtimeevent=null;
						},false);
						newdiv.addEventListener("mouseout",function(){$(this.id.replace("zoneinfo","timeevent")).style.display="none";},false);
						newdiv=createElement("div",{"id":"timeevent"+zoneNr,"class":"blackbox"},$("zone"+zoneNr));
					}
				
					if (zoneTyp[zoneNrF]=="1") {
						//Acker
						$("zoneinfo"+zoneNr).setAttribute("class","v"+zoneMainprod[zoneNrF]);
						if (nextTime[zoneNrF]<=Now) {
							if ($("zoneinfo"+zoneNr).childNodes.length==0) createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/incoming.gif", "style":"position:absolute; top:30px;"},$("zoneinfo"+zoneNr));
						} else {
							if ($("zoneinfo"+zoneNr).childNodes.length!=0) removeElement($("zoneinfo"+zoneNr).firstChild);
						}
					} else {
						//Stall/Fabrik
						zoneNext[zoneNrF] = unsafeWindow.userfarminfos[farmNr+1][zoneNr]["endproduct"];
						zoneErnte[zoneNrF] = new Object;
						if (!isNaN(unsafeWindow.run[zoneNr])){
							if (parseInt(unsafeWindow.run[zoneNr],10)>0) {
								if (unsafeWindow.time[zoneNr]!="-1") nextTime[zoneNrF] = 1+Now+parseInt(unsafeWindow.time[zoneNr],10)-zeitVerschiebung;
								var menge = unsafeWindow.produkt_ernte[zoneNext[zoneNrF]]*((unsafeWindow.userfarminfos[farmNr+1][zoneNr]["animals"]>0)?(parseInt(unsafeWindow.userfarminfos[farmNr+1][zoneNr]["animals"],10)):1);
								zoneErnte[zoneNrF][zoneNext[zoneNrF]] = (powerup[zoneNext[zoneNrF]]&&(nextTime[zoneNrF]-Now<powerup[zoneNext[zoneNrF][0]]))?[menge*(1+powerup[zoneNext[zoneNrF]][1]),menge*(punkte[zoneNext[zoneNrF]]+powerup[zoneNext[zoneNrF]][2])]:[menge,menge*punkte[zoneNext[zoneNrF]]];
							} else {
								if (Now<nextTime[zoneNrF]) nextTime[zoneNrF]=nie;
							}
						}
						nextTimeWasser[zoneNrF] = nie;
					}
				} else {
					nextTime[zoneNrF] = nie;
					nextTimeWasser[zoneNrF] = nie;
					zoneErnte[zoneNrF] = new Object;
				}
			}
		
			//Anpflanzautomat vordefinieren
			if (($("commitbox").style.display!="none") && ($("autoplantproduct"))) {
				if (!aktivAutomat && (unsafeWindow.kategorie=="v")) $("autoplantproduct").value=unsafeWindow.selected;
				aktivAutomat = true;
			} else { aktivAutomat = false; }
		
			//offener Stall
			if($("innermaincontainer").style.display == "block"){
				var zoneNr = parseInt($("innermaincontainer").childNodes[1].firstChild.id.replace("button_cancel",""),10);
				var zoneNrF = zoneNr+6*farmNr;
				showBlase(zoneNr);
				if (($("commitboxinner").style.display == "block") && (!$("feedMax"))){
					newa = createElement("a",{"id":"feedMax","class":"link","style":"font-weight:bold;"});
					newa.innerHTML = "max";
					$("commitboxcontentinner").firstChild.insertBefore(newa,$("feedamount").nextSibling);
					newa.addEventListener("click",function(){$("feedamount").value=216;keyup($("feedamount"));},false);
				}
				if (valErnte && ($("commitboxcrop").style.display=="block")){ click($("commitboxfootercrop").firstChild); }
				if (!$("zoneNavi")) {
					newdiv = createElement("div",{"id":"zoneNavi"},$("innermaincontainer"));
					var c1 = zoneNrF-1;
					while(zoneTyp[c1]!=zoneTyp[zoneNrF]) {c1 = ((c1+16)%18)+1;}
					var c2 = zoneNrF+1;
					while(zoneTyp[c2]!=zoneTyp[zoneNrF]) {c2 = (c2%18)+1;}
					if (c1!=zoneNrF) {
						if (c1!=c2) {
						newdiv1 = createElement("div",{"class":"link leftarrow","name":c1},newdiv);
						newdiv1.addEventListener("click",function(){
							goToZone(this.getAttribute("name"));
							removeElement($("zoneNavi"));
						},false);
						}
						newdiv1 = createElement("div",{"class":"link rightarrow","name":c2},newdiv);
						newdiv1.addEventListener("click",function(){
							goToZone(this.getAttribute("name"));
							removeElement($("zoneNavi"));
						},false);
					}
				}
				for(var v=0;v<animalMove.length;v++) if((valMoveAnimals[v])&&(!animalMove[v][0])&&($("animalline"+v))){ 
					animalMove[v][0]=true; 
					moveAnimals(v); 
					break;
				}
			} else {
				if($("zoneNavi")) removeElement($("zoneNavi"));
			}
		
			GM_setValue(lng+"_"+server+"_"+username+"_zoneNext",zoneNext.join("|"));
		
			//offener Club
			if ($("guildmaincontainer").style.display == "block"){
				if ($("guildmultibox").style.display == "block"){
					if($("guildmultiboxheadline").innerHTML == unsafeWindow.guildmultibox_headline1){
						$("guildmultiboxheadline").innerHTML += " ";
						var canddiv = Array.prototype.slice.call($("guildmultiboxcontent").getElementsByClassName("guildmemberlist_even")).concat(Array.prototype.slice.call($("guildmultiboxcontent").getElementsByClassName("guildmemberlist_uneven")));
						for (var v=0;v<canddiv.length;v++){
							newdiv = canddiv[v].childNodes[1].firstChild;
							var thisUser = /(.*?)&nbsp;/.exec(newdiv.innerHTML);
							newdiv.innerHTML = newdiv.innerHTML.replace(thisUser[0],"");
							newspan = createElement("span");
							newspan.innerHTML = "&nbsp;";
							newdiv.insertBefore(newspan,newdiv.firstChild);
							newa = createElement("a",{"class":"link2"});
							newa.innerHTML = thisUser[1];
							newdiv.insertBefore(newa,newdiv.firstChild);
							newa.addEventListener("click",function(){
								unsafeWindow.top.initCity(1);
								unsafeWindow.top.showDiv("transp3");
								$top("transp3").style.visibility = "visible";
								unsafeWindow.top.showDiv("shop");
								$top("shop").style.visibility = "visible";
								$top("shopframe").src="../stadt/stats.php?search=1&searchterm="+this.innerHTML;
							},false);
							newdiv.insertBefore(igm(thisUser[1]),newdiv.firstChild);
						}
					}
				}
			}
			
			// Friends
			if ($("friendscontainer").style.display == "block"){
				if(!$("friendslistconBerater")){
					createElement("h1",{"id":"friendslistconBerater","style":"display:none;"},$("friendslistcon"));
					cand = $("friendslistcon").getElementsByClassName("friendslinename");
					for(var v=0;v<cand.length;v++){
						var player = cand[v].getElementsByTagName("div")[0].innerHTML;
						newspan = vertrag(player,cand[v].nextSibling);
						
					}
				}
			}
			// offener FarmiEinkauf
			if ($("cart").style.display=="block"){ do_kaufliste(); }

		}
		// Stadt offen
		if ($("citymaincontainer").style.display=="block"){
			// Werbung
			if ($("adcolumn").style.display=="block"){
				cand = $("adzonetooltip1").getElementsByTagName("img");
				if ($("adzonetooltip1").childNodes.length==3){
					var preis = parseFloat(/&nbsp;(.*)/.exec($("adzonetooltip1").firstChild.innerHTML)[1].replace(regDelimThou,"").replace(regDelimDeci,"."),10);
					createElement("div",{},$("adzonetooltip1"),"<img width='12' height='12' src='"+cand[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+cand[2].getAttribute("src")+"'>&nbsp;"+kT_formatgr(preis/8));
				}
				if ($("adzonetooltip2").childNodes.length==3){
					var preis = gut[0]*parseInt(/&nbsp;(\d*)/.exec($("adzonetooltip2").firstChild.innerHTML)[1],10);
					createElement("div",{},$("adzonetooltip2"),"<img width='12' height='12' src='"+cand[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+cand[2].getAttribute("src")+"'>&nbsp;"+kT_formatgr(preis/16));
					$("adzonetooltip2").firstChild.innerHTML +="&nbsp;("+kT_formatgr(preis)+")";
				}
				if ($("adzonetooltip3").childNodes.length==3){
					var preis = gut[0]*parseInt(/&nbsp;(\d*)/.exec($("adzonetooltip3").firstChild.innerHTML)[1],10);
					createElement("div",{},$("adzonetooltip3"),"<img width='12' height='12' src='"+cand[0].getAttribute("src")+"'>/<img width='12' height='12' src='"+cand[2].getAttribute("src")+"'>&nbsp;"+kT_formatgr(preis/24));
					$("adzonetooltip3").firstChild.innerHTML +="&nbsp;("+kT_formatgr(preis)+")";
				}
			// Marktschreier
			} else if($("marktschreierinner").style.display=="block"){
				if(!$("marktschreierinnercontentBerater")){
					createElement("h1",{"id":"marktschreierinnercontentBerater","style":"display:none;"},$("marktschreierinnercontent"));
					for(var v=0;v<$("marktschreierinnercontent").childNodes.length;v++){
						if($("marktschreierinnercontent").childNodes[v].nodeName=="DIV"){
							newdiv = $("marktschreierinnercontent").childNodes[v].getElementsByTagName("div")[1];
							var player = (/\?to=(.*)';/).exec(newdiv.getElementsByTagName("img")[0].getAttribute("onclick"))[1];
							stats(player,newdiv);
						}
					}
				}
			//Rezeptdealer
			} else if($("formuladealer").style.display=="block"){
				for(var v=1;v<4;v++) if(!$("formuladealerproduct"+v+"berater")){
					newdiv = createElement("div",{"id":"formuladealerproduct"+v+"berater","class":"blackbox","style":"position:absolute;top:70px;"},$("formuladealerproduct"+v));
					var formula = $("formuladealerproduct"+v).getElementsByTagName("div")[0].getAttribute("class").replace("fm","");
					var sum = 0;
					newtable = createElement("table",{"cellspacing":"0","style":"text-align:right;"},newdiv);
					newtr = createElement("tr",{},newtable);
					createElement("td",{},newtable,"-");
					newtd = createElement("td",{},newtable);
					if(unsafeWindow.formulas[0][formula][6]>0){
						newtd.innerHTML = number_format(unsafeWindow.formulas[0][formula][6]);
						sum -= unsafeWindow.formulas[0][formula][6];
					}
					else if(unsafeWindow.formulas[0][formula][7]>0){
						newtd.innerHTML = number_format(unsafeWindow.formulas[0][formula][7]*gut[0]);
						sum -= unsafeWindow.formulas[0][formula][7]*gut[0];
					}
					var sum1 = 0;
					for(var w=0;w<unsafeWindow.formulas[0][formula][3].length;w++){
						sum1 += unsafeWindow.formulas[0][formula][3][w][1]*gut[unsafeWindow.formulas[0][formula][3][w][0]]
					}
					newtr = createElement("tr",{},newtable);
					createElement("td",{},newtr,"-");
					createElement("td",{},newtr,number_format(sum1));
					sum -= sum1;
					if(unsafeWindow.formulas[0][formula][5][0]!=0){
						sum1 = unsafeWindow.formulas[0][formula][5][0][1]*gut[unsafeWindow.formulas[0][formula][5][0][0]];
						sum += sum1;
						newtr = createElement("tr",{},newtable);
						createElement("td",{"style":"border-bottom:1px solid black;"},newtr,"+");
						createElement("td",{"style":"border-bottom:1px solid black;"},newtr,number_format(sum1));					
					}
					if(unsafeWindow.formulas[0][formula][5][1]!=0){
						sum1 = 0;
						for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++)if(zoneTyp[zoneNr]=="1"){
							sum1 += gut[unsafeWindow.formulas[0][formula][5][1][0]]*unsafeWindow.formulas[0][formula][5][1][1]*Math.ceil(calcGrowTimes(60*dauer[unsafeWindow.formulas[0][formula][5][1][0]],unsafeWindow.formulas[0][formula][5][1][2],1-(zoneBonus[zoneNr]/100)))*120/(unsafeWindow.top.produkt_x[unsafeWindow.formulas[0][formula][5][1][0]]*unsafeWindow.top.produkt_y[unsafeWindow.formulas[0][formula][5][1][0]]);
						}
						sum += sum1;						
						newtr = createElement("tr",{},newtable);
						createElement("td",{"style":"border-bottom:1px solid black;"},newtr,"+");	
						createElement("td",{"style":"border-bottom:1px solid black;"},newtr,number_format(sum1));					
					}
					if(unsafeWindow.formulas[0][formula][5][2]!=0){
						sum1 = 0;
						for(var zoneNr=1;zoneNr<zoneTyp.length;zoneNr++)if(zoneTyp[zoneNr]=="1"){
							sum1 += unsafeWindow.formulas[0][formula][5][2][1]*Math.ceil(calcGrowTimes(60*dauer[unsafeWindow.formulas[0][formula][5][2][0]],unsafeWindow.formulas[0][formula][5][2][2],1-(zoneBonus[zoneNr]/100)))*120/(unsafeWindow.top.produkt_x[unsafeWindow.formulas[0][formula][5][2][0]]*unsafeWindow.top.produkt_y[unsafeWindow.formulas[0][formula][5][2][0]]);
						}
						newtr = createElement("tr",{},newtable);
						createElement("td",{"colspan":"2","style":"border-top:1px solid black;"},newtr,number_format(sum1)+"pts");					
					}
					newtr = createElement("tr",{},newtable);
					createElement("td",{"colspan":"2"},newtr,number_format(sum));
					
				}
			}
		}
		
		// Lagerzahlen formatieren
		cand = $("rackItems").getElementsByClassName("tklein2");
		for (var v=0;v<cand.length;v++) {
			if($(cand[v].id+"format")){
				$(cand[v].id+"format").innerHTML = cand[v].innerHTML.replace(/(\d{3,})(\d{3})/g,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2");
				var currProdType = prodTyp[parseInt(cand[v].id.replace("t",""),10)];
				var str = "formattedRackItem";
				if(currProdType=="v"){
					if(parseInt(cand[v].innerHTML,10)<valMinRackV){ str+=" lowrack"; }
				} else if (currProdType=="e"){
					if(parseInt(cand[v].innerHTML,10)<valMinRackE){ str+=" lowrack"; }
				}
				$(cand[v].id+"format").setAttribute("class",str);
			} else {
				cand[v].style.display = "none";
				createElement("div",{"id":cand[v].id+"format","class":"formattedRackItem"},cand[v].parentNode,cand[v].innerHTML.replace(/(\d{3,})(\d{3})/g,"$1k").replace(/(\d+)(\d{3})/g,"$1"+delimThou+"$2"));
			}
		}
		newdiv=null;newdiv1=null;newa=null;newspan=null;cand=null;
	}
	
	function loop1() {
		Now = Math.floor((new Date()).getTime()/1000);
		zeitVerschiebung = parseInt(unsafeWindow.Zeit.Verschiebung,10);
		unsafeWindow.GMnextTime = nextTime.slice();
		unsafeWindow.GMreadyZone = new Object;
		calcPowerup();
		
		// windmill
		if(unsafeWindow.formulas){
			//GM_log(unsafeWindow.city+":"+unsafeWindow.cityzones[3]+":"+unsafeWindow.windmilltime+":"+unsafeWindow.windmillrun);
			if(unsafeWindow.city==2){
				if(unsafeWindow.windmilltime!="0"){
					windmilltimeEnd = Now+parseInt(unsafeWindow.windmilltime,10);
				} else if(unsafeWindow.cityzones[3]==0){
					windmilltimeEnd = nie;
				}
				GM_setValue(lng+"_"+server+"_"+username+"_windmilltimeEnd",windmilltimeEnd);
			}
			if(!$("windmillBeraterTime")){ createElement("div",{"id":"windmillBeraterTime"},$("garten_komplett")); }
			if(windmilltimeEnd<=Now){
				$("windmillBeraterTime").setAttribute("class","ready");
				$("windmillBeraterTime").innerHTML = texte["fertig"].toUpperCase()+"!";
			} else {
				$("windmillBeraterTime").setAttribute("class","");
				$("windmillBeraterTime").innerHTML = (windmilltimeEnd==nie)?"---":time2str(windmilltimeEnd-Now);
			}
		}
		
		// sichtbare Zonen
		for (var zoneNr=1;zoneNr<=6;zoneNr++){
			var zoneNrF = zoneNr+6*farmNr;
			if (zoneTyp[zoneNrF]!="0") {
				//Zeit
				if(!$("zonetime"+zoneNr)) {createElement("div",{"id":"zonetime"+zoneNr},$("zone"+zoneNr));}
				var help = nextTime[zoneNrF]+zeitVerschiebung;
				var help2 = nextTimeWasser[zoneNrF]+86400+zeitVerschiebung;
				if (help<=Now) {
					$("zonetime"+zoneNr).setAttribute("class","ready");
					$("zonetime"+zoneNr).innerHTML = texte["fertig"].toUpperCase()+"!";
					if($("zonetimeWasser"+zoneNr)) removeElement($("zonetimeWasser"+zoneNr));
				} else {if (nextTime[zoneNrF]<nie) {
					$("zonetime"+zoneNr).setAttribute("class","");
					$("zonetime"+zoneNr).innerHTML = time2str(help-Now);
					if ((zoneTyp[zoneNrF]=="1")&&(help2>Now)&&(help>help2)){
						if(!$("zonetimeWasser"+zoneNr)) {createElement("div",{"id":"zonetimeWasser"+zoneNr},$("zone"+zoneNr));}
						$("zonetimeWasser"+zoneNr).innerHTML = time2str(help2-Now);
					} else {if($("zonetimeWasser"+zoneNr)) removeElement($("zonetimeWasser"+zoneNr));}
				} else {
					$("zonetime"+zoneNr).setAttribute("class","");
					$("zonetime"+zoneNr).innerHTML = "---";
					if($("zonetimeWasser"+zoneNr)) removeElement($("zonetimeWasser"+zoneNr));
				}}
				//giessen notwendig
				if (valGiessNotw){
				if((help2<Now)&&(!$("imgNeedWater"+zoneNr))) {createElement("img",{"id":"imgNeedWater"+zoneNr,"src":"http://dqt9wzym747n.cloudfront.net/pics/garten/gegossen_static.gif"},$("zone"+zoneNr).firstChild.firstChild);}
				else {if($("imgNeedWater"+zoneNr)) removeElement($("imgNeedWater"+zoneNr));}
				}
			} else {
				if($("zonetime"+zoneNr)) removeElement($("zonetime"+zoneNr));
				if($("zonetimeWasser"+zoneNr)) removeElement($("zonetimeWasser"+zoneNr));
			}
		
			// speichern
			GM_setValue(lng+"_"+server+"_"+username+"_nextTime_"+zoneNrF,nextTime[zoneNrF]);
			GM_setValue(lng+"_"+server+"_"+username+"_nextTimeWasser_"+zoneNrF,nextTimeWasser[zoneNrF]);
			GM_setValue(lng+"_"+server+"_"+username+"_zoneErnte_"+zoneNrF,implode(zoneErnte[zoneNrF]));
		}
		
		// alle Zonen
		nextTime[0] = nie;
		for (var zoneNrF=1;zoneNrF<=6*parseInt(unsafeWindow.farmamount,10);zoneNrF++){
			if ((zoneTyp[zoneNrF]!="0") && (nextTime[zoneNrF] == nie)) { nextTime[0] = 0; }
			else { 
				nextTime[0] = Math.min(nextTime[0],nextTime[zoneNrF])
				if(valGiessNotw&&(nextTimeWasser[zoneNrF]<nie)){ nextTime[0] =  Math.min(nextTime[0],86400+nextTimeWasser[zoneNrF]); }
			}
			if((zoneTyp[zoneNrF]!="0") && ((nextTime[zoneNrF]+zeitVerschiebung<Now)||(nextTime[zoneNrF]==nie)||(valGiessNotw&&(nextTimeWasser[zoneNrF]+86400+zeitVerschiebung<Now)))){
				unsafeWindow.GMreadyZone[zoneNrF] = Math.ceil(zoneNrF/6);
			}
		}
		GM_setValue(lng+"_"+server+"_"+username+"_nextTime_0",nextTime[0]);
		if(valGlobaltimeWindmill){ nextTime[0] = Math.min(nextTime[0],windmilltimeEnd); }
		nextTime[0] += zeitVerschiebung;
		if (nextTime[0]<=Now) document.title = texte["fertig"].toUpperCase()+($("mainmenuecontainer").innerHTML.search(/incoming\.gif/)!=-1?" - !":"")+documentTitle;
		else document.title = time2str(nextTime[0]-Now)+($("mainmenuecontainer").innerHTML.search(/incoming\.gif/)!=-1?" - !":"")+documentTitle;

		// Quest
		if (unsafeWindow.userquests==""){ 
			if (GM_getValue(lng+"_"+server+"_"+username+"_questTime",0)==0) GM_setValue(lng+"_"+server+"_"+username+"_questTime",Now+86400); 
			showNextQuest();
		} else { 
			for(var v in unsafeWindow.userquests) GM_setValue(lng+"_"+server+"_"+username+"_quest",parseInt(v,10)); 
			GM_setValue(lng+"_"+server+"_"+username+"_questTime",0); 
		}
		if(questShow){
			if($("questline").style.display!="block"){ 
				unsafeWindow.showquestline = 0;
				unsafeWindow.handleQuestLine();
			}
		} else {
			if($("questline").style.display!="none"){ 
				unsafeWindow.showquestline = 1;
				unsafeWindow.handleQuestLine();
			}
		}
	}

	function loop5() {
		//Warenbestand speichern
		for (var v in prodName) {
			var c = unsafeWindow.rackElement[v].number;
			prodBestand[v]=(c?parseInt(c,10):0);
		}
		if($("coins")) prodBestand[prodId["Coins"]]=parseInt($("coins").innerHTML,10);
		GM_setValue(lng+"_"+server+"_"+username+"_prodBestand",prodBestand.join("|"));
	
		GM_setValue(lng+"_"+server+"_"+username+"_bargeld",$("bar").innerHTML.replace(" "+texte["waehrung"],"").replace(regDelimThou,"").replace(regDelimDeci,"."));
	
		//aktuelle Preise holen
		gut = splitToFloat(GM_getValue(lng+"_"+server+"_gut",""),"|");
	
		//andere Accounts fertig
		for (var v=0;v<otherAccs.length;v++) {
			if (GM_getValue(otherAccs[v][0]+"_"+otherAccs[v][1]+"_"+otherAccs[v][2].toLowerCase()+"_nextTime_0",nie)+zeitVerschiebung<Now) {
				$("sprcontent").firstChild.innerHTML = "";
				createElement("a",{"class":"link",href:gamepages[otherAccs[v][0]]+"/login.php?start=1&ref=&wid=&dologin="+otherAccs[v][3],"style":"font-weight:bold;"},$("sprcontent").firstChild,farmNamen[otherAccs[v][2]]+" "+texte["fertig"].toLowerCase()+"!");
			}
		}
	
		do_farmis();
	}

	function loop60(){
		Today = new Date().getDay();
		unsafeWindow.updateRack(unsafeWindow._currRack,0);
		unsafeWindow.updateMenu();
	}
	
	window.setInterval(loop05,500);
	window.setInterval(loop1,1000);
	window.setInterval(loop5,5000);
	window.setInterval(loop60,60000);

	// Updatecheck
	if (GM_getValue("valUpdate",true)) {
		valLastUpdate = GM_getValue("valLastUpdate",version);
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://boty-farmerskie.tk/66964.meta.js",
			onload: function(response) {
				var serverversion = (/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
				if (valLastUpdate!=serverversion) {
					var updateNode = createElement("a",{"class":"link",href:"http://boty-farmerskie.tk/66964.user.js","style":"font-weight:bold;"});
					updateNode.innerHTML = texte["msgUpdate"]+" ("+version+"&nbsp;->&nbsp;"+serverversion+")";
					updateNode.addEventListener("click",function(){
						GM_setValue("valLastUpdate",serverversion);
						window.clearInterval(updateInterval);
						updateNode = null;
					},false);
					updateInterval = window.setInterval(function(){
						if(!$("sprcontent").firstChild.firstChild.href){
							$("sprcontent").firstChild.innerHTML = "";
							$("sprcontent").firstChild.appendChild(updateNode);
						}
					},1000);				
				}
			}
		});
	}
	
	// First run
	if (GM_getValue("tutorial",0)==0){
		click($("menueimg4"));
	}
	newinput=null;newdiv=null;newdiv1=null;newbutton=null;newimg=null;newa=null;newspan=null;
}

//***********************************************************************************************************

function do_nachrichten_read(){
	if (!candtable[0]) {
		GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0);
		GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doread","");
		document.location.href = "http://s"+server+gamepage+"/nachrichten/system.php?page=1";
	}
	var keymsgid=/msg=(\d+)/
	var keycurrpage = /page=(\d+)/;
	var currMsgId = keymsgid.exec(pageZusatz)[1];
	var msgIdRead = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doread","").split("|");
	for (var v=msgIdRead.length-1;v>-1;v--) {if((msgIdRead[v]=="")||(msgIdRead[v]==currMsgId)){ msgIdRead.splice(v,1); break;}}
	GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doread",msgIdRead.join("|"));
	var candtr = candtable[1].getElementsByTagName("tr");
	var absender="";
	var betreff="";
	var currPage = 1;
	var help = keycurrpage.exec(pageZusatz);
	if (help) currPage = help[1];
	var msgBox = candtr[4].getElementsByTagName("div")[0];
	var newdiv,newinput;
	
	if (pageZusatz.search("from=inbox")!=-1) {
		$("btn_inbox").bgColor="#cc9";
		absender=candtr[1].getElementsByTagName("a")[0].innerHTML;
		candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
		var sendTime = candtr[2].getElementsByTagName("td")[1].innerHTML;
		betreff="Re: "+candtr[3].getElementsByTagName("td")[1].firstChild.innerHTML;
	
		var valPrivNachr = GM_getValue(lng+"_"+server+"_"+username+"_valPrivNachr",100);
		var nachrichten = new Array();
		removeElement(msgBox.getElementsByTagName("hr")[0]);
		removeElement(msgBox.getElementsByTagName("span")[0]);
		var currMsg = " "+msgBox.innerHTML;
		while(currMsg.search(/\s\d{4,}/)!=-1) {currMsg = currMsg.replace(/(\s\d+)(\d{3})/g,"$1"+delimThou+"$2");}
		currMsg = currMsg.slice(1,currMsg.length);
		msgBox.innerHTML = currMsg;
		nachrichten[0] = new Array();
		nachrichten[0][0] = currMsgId;
		nachrichten[0][1] = absender;
		nachrichten[0][2] = "<u>->>&nbsp;"+sendTime+"</u><br>"+currMsg;
	
		try{ var save = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten").split("&nbsp;|");
			for (var v=0;v<save.length;v++) {
				nachrichten[v+1] = save[v].split("&nbsp;~");
				if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)) {
					createElement("hr",{"style":"height:1px;width:96%;border-right:0px none;border-width:1px 0px 0px;border-style:solid none none; border-color: rgb(170, 170, 170) -moz-use-text-color -moz-use-text-color;"},msgBox);
					createElement("span",{},msgBox,nachrichten[v+1][2]);
				}
				if (v>valPrivNachr) break;
			}
		} catch(err) {}
	
		function sortArr0Abst (a, b) {return parseInt(b[0],10) - parseInt(a[0],10);}
		nachrichten.sort(sortArr0Abst);
		if (nachrichten.length>1){
			for (var v=nachrichten.length-2;v>=0;v--) if (nachrichten[v][0]==nachrichten[v+1][0]) nachrichten.splice(v+1,1);
		}
	
		var save="";
		for (var v=0;v<nachrichten.length;v++) save+=nachrichten[v].join("&nbsp;~")+"&nbsp;|";
		GM_setValue(lng+"_"+server+"_"+username+"_nachrichten",save.slice(0,save.length-7));
	}
	
	if (pageZusatz.search("from=outbox")!=-1) {
		$("btn_inbox").parentNode.childNodes[5].bgColor="#cc9";
		absender=candtr[1].getElementsByTagName("a")[0].innerHTML;
		candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
		betreff="Re: "+candtr[3].getElementsByTagName("td")[1].firstChild.innerHTML;
	
		var nachrichten = new Array();
		try{ save = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten").split("&nbsp;|");
			for (var v=0;v<save.length;v++) {
				nachrichten[v+1] = save[v].split("&nbsp;~");
				if ((nachrichten[v+1][1]==absender) && (nachrichten[v+1][0]!=currMsgId)) {
					createElement("hr",{"style":"height: 1px;width: 96%; border-right: 0px none; border-width: 1px 0px 0px; border-style: solid none none; border-color: rgb(170, 170, 170) -moz-use-text-color -moz-use-text-color;"},msgBox);
					createElement("span",{},msgBox,nachrichten[v+1][2]);
				}
			}
		} catch(err) {}
	}
	
	if (pageZusatz.search("from=system")!=-1) {
		$("btn_sysinbox").bgColor="#cc9";
		var kauf = new Array();
		var kaufids = new Object();
	
		var valNachr = GM_getValue(lng+"_"+server+"_"+username+"_valNachr",100);
		var c=0;
	
		try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_kauf").split("|");
			for (var v=0;v<arr.length;v++){
				var help = arr[v].split("~");
				if ((help[0]!="") && !kaufids[help[0]]){
					kauf[++c]= new Object();
					kaufids[help[0]]=c;
					kauf[c]["id"] = help[0];
					kauf[c]["kaeufer"] = help[1];
					kauf[c]["menge"] = help[2];
					kauf[c]["produkt"] = help[3];
					kauf[c]["preis"] = help[4];
					kauf[c]["typ"] = help[5];
					if (c>valNachr) break;
				}
			}
		} catch(err){}
	
		var currMsg = msgBox.innerHTML;
		var help = currMsg.replace(/\s+/,"");
		//GM_log(help);
		//Marktverkauf
		var help2=texte["msg1b"].exec(help);
		if (help2){
			if (lng=="tr") { help2.push(help2.splice(2,1).toString());}
			kauf[0]= new Object();
			kauf[0]["id"]=currMsgId;
			kauf[0]["kaeufer"]=help2[1];
			absender=kauf[0]["kaeufer"];
			kauf[0]["menge"]=help2[2];
			kauf[0]["produkt"]=help2[3];
			betreff=kauf[0]["produkt"];
			kauf[0]["preis"]=help2[4].replace(regDelimThou,"").replace(regDelimDeci,".");
			kauf[0]["typ"]="m";
		}
		//Vertragverkauf
		help2=texte["msg2b"].exec(help);
		if (help2){
			kauf[0]= new Object();
			kauf[0]["id"]=currMsgId;
			kauf[0]["kaeufer"]=help2[1];
			absender=kauf[0]["kaeufer"];
			var help3;
			var help4 = new Array();
			while(help3=texte["msg2c"].exec(help2[2])){
				help2[2] = help2[2].replace(help3[0],"");
				help4.push(help3[1],help3[2])
			}
			if (help4.length==2) {
				kauf[0]["menge"]=help4[0];
				kauf[0]["produkt"]=help4[1];
				betreff=kauf[0]["produkt"];
			} else {
				kauf[0]["menge"]="0";
				kauf[0]["produkt"]="";
				for(var v=0;v<help4.length;v=v+2) kauf[0]["produkt"]+=help4[v]+"x "+help4[v+1]+"<br>";
				kauf[0]["produkt"] = kauf[0]["produkt"].slice(0,kauf[0]["produkt"].length-4);
			}
			kauf[0]["preis"]=help2[3].replace(regDelimThou,"").replace(regDelimDeci,".");
			kauf[0]["typ"]="v";
		}
	
		while(currMsg.search(/\s\d{4}/)!=-1) {currMsg = currMsg.replace(/(\s\d+)(\d{3})/g,"$1"+delimThou+"$2");}
		if(betreff) {msgBox.innerHTML = currMsg+"<br><br>"+texte["stueckpreis"]+": "+kT_format(parseFloat(kauf[0]["preis"],10)/parseInt(kauf[0]["menge"],10));}
	
		function sortIdAbst (a, b) {return b["id"] - a["id"];}
		kauf.sort(sortIdAbst);
		var save="";
		for (var v in kauf) save += kauf[v]["id"]+"~"+kauf[v]["kaeufer"]+"~"+kauf[v]["menge"]+"~"+kauf[v]["produkt"]+"~"+kauf[v]["preis"]+"~"+kauf[v]["typ"]+"|";
		GM_setValue(lng+"_"+server+"_"+username+"_kauf",save.slice(0,save.length-1));
	
		var msgId = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_system","").split("|");
		if (msgId.length>1) for(var d=0;d<msgId.length;d++) {if(msgId[d]==currMsgId) break;}
		else var d=0;
		newdiv = candtable[1].getElementsByTagName("tr")[5].getElementsByTagName("td")[0];
		newinput = newdiv.getElementsByTagName("input")[0].addEventListener("click",function(){GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",1);},false);
		newinput=createElement("input",{"type":"button", "value":texte["vorigeNachricht"],"class":"msg_input"},newdiv);
		newinput.addEventListener("click",function(){document.location.href = "read.php?from=system&page="+currPage+"&msg="+msgId[d-1]+"&mass=0"},false);
		if(d==0){newinput.disabled=true;newinput.style.color="transparent";}else{newinput.setAttribute("class","link2 msg_input");}
		newinput=createElement("input",{"type":"button", "value":texte["naechsteNachricht"], "class":"msg_input"},newdiv);
		newinput.addEventListener("click",function(){document.location.href = "read.php?from=system&page="+currPage+"&msg="+msgId[d+1]+"&mass=0"},false);
		if (d==msgId.length-1){newinput.disabled=true;newinput.style.color="transparent";}else{newinput.setAttribute("class","link2 msg_input");}
	
		if(absender) {
			candtr[1].getElementsByTagName("td")[1].childNodes[1].innerHTML=absender;
			candtr[1].getElementsByTagName("td")[1].childNodes[1].href="javascript:addContact('"+absender+"')";
			candtr[1].getElementsByTagName("td")[1].childNodes[3].addEventListener("click",function(){
				document.location.href="http://s"+server+gamepage+"/vertraege/new.php?to_player="+absender;
			},false);
			candtr[1].getElementsByTagName("td")[1].childNodes[3].setAttribute("style","float:left");
		}
		
		// alle lesen
		if (GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0)==2) {
			if (msgIdRead.length>0){
				document.location.href = "read.php?from=system&page="+currPage+"&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0"; 
			} else {
				GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0);
				document.location.href = "http://s"+server+gamepage+"/nachrichten/system.php?page="+currPage;
			}
		}
	}
	
	if(absender){
		removeElement(candtr[1].getElementsByTagName("td")[1].childNodes[3]);
		igm(absender,candtr[1].getElementsByTagName("td")[1],betreff);
		stats(absender,candtr[1].getElementsByTagName("td")[1]);
		vertrag(absender,candtr[1].getElementsByTagName("td")[1]);
	}
	
	GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_letzte","<u>"+betreff+"</u><br>"+msgBox.innerHTML);
	if (msgIdRead.length>0){
		newdiv = createElement("div",{"class":"link","title":texte["naechsteNachricht"],"style":"position:absolute;bottom:0px;right:0px;height:26px;width:35px;background:url('http://dqt9wzym747n.cloudfront.net/pics/regal2.jpg');background-position:35px 0px;-moz-border-radius:15px;"},all);
		newdiv.addEventListener("click",function(){document.location.href = "read.php?from=system&page="+currPage+"&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0";},false);
	}
	candtr=null;msgBox=null;newdiv=null;newinput=null;
}

function do_nachrichten_new(){
	var Now = Math.floor((new Date()).getTime()/1000);
	$("btn_inbox").parentNode.childNodes[1].bgColor="#cc9";
	if ($("msg_subject")) while($("msg_subject").value.search(/Re: Re: /)!=-1) $("msg_subject").value = $("msg_subject").value.replace(/Re: Re: /,"Re: ");
	if ($("msg_to") && $("msg_to").value!="") {
		$("msg_to").style.width = "350px";
		stats($("msg_to").value,$("msg_to").parentNode);
	}
	if ($("msg_body")) {
		var formatMsgNumbers = function (){
			var posStart = $("msg_body").selectionStart;
			var posEnd = $("msg_body").selectionEnd;
			if (posStart==posEnd){
				var help = $("msg_body").value+" ";
				var c;
				while((c=help.search(/\d{4}\D/))!=-1) {
					help = help.replace(/(\d)(\d{3}\D)/,"$1"+delimThou+"$2"); //missing sep
					if(c+1<posStart) posStart++;
				}
				while((c=help.search(regDelimThou2))!=-1) {
					help = help.replace(regDelimThou2,"$1"+delimThou+"$2$3"); //shift sep
				}
				while((c=help.search(regDelimThou3))!=-1) {
					help = help.replace(regDelimThou3,"$1$2$3"); //delete sep
					if(c+1<posStart) posStart--;
				}
				
				$("msg_body").value = help.slice(0,help.length-1);
				setSelRange($("msg_body"),posStart,posStart);
			}
		}
		$("msg_body").value = GM_getValue(lng+"_"+server+"_"+username+"_nachrichtvorlage","");
		var newa=createElement("a",{"class":"link"},$("msg_body").parentNode,texte["vorlage"]);
		newa.addEventListener("click",function(){
			GM_setValue(lng+"_"+server+"_"+username+"_nachrichtvorlage",$("msg_body").value);
		},false);
		
		var valMsgFormat = GM_getValue(lng+"_"+server+"_"+username+"_valMsgFormat",true);
		var newspan = createElement("span",{"style":"line-height:18px;"},$("msg_body").parentNode.previousSibling.previousSibling,texte["formatiereZahlen"]);
		var newinput = createElement("input",{"type":"checkbox","style":"float:left;","checked":valMsgFormat},newspan);
		newinput.addEventListener("click",function(){
			if (this.checked){ $("msg_body").addEventListener("keyup",formatMsgNumbers,false); }
			else{ try{$("msg_body").removeEventListener("keyup",formatMsgNumbers,false);}catch(err){} }
			GM_setValue(lng+"_"+server+"_"+username+"_valMsgFormat",this.checked);
		},false);
		
		if (valMsgFormat){ $("msg_body").addEventListener("keyup",formatMsgNumbers,false);	}
	
		all.getElementsByTagName("input")[4].tabIndex = "4";
		all.getElementsByTagName("input")[4].addEventListener("click",function(){
			var save = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten","");
			if (save) {
				save = (parseInt(save,10)+1)+"&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+datum(Now)+",&nbsp;"+uhrzeit(Now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>&nbsp;|"+save;
			} else {
				save = "1&nbsp;~"+$("msg_to").value+"&nbsp;~<u><<-&nbsp;"+datum(Now)+",&nbsp;"+uhrzeit(Now,1)+"&nbsp;"+texte["uhr"]+"</u><br>"+$("msg_body").value+"<br>";
			}
			GM_setValue(lng+"_"+server+"_"+username+"_nachrichten",save);
		},false);
		newa=null;newspan=null;newinput=null;
	} else {
		var msgIdRead = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doread","").split("|");
		if (msgIdRead[0]!=""){
			newdiv = createElement("div",{"class":"link","title":texte["naechsteNachricht"],"style":"position:absolute;bottom:0px;right:0px;height:26px;width:35px;background:url('http://dqt9wzym747n.cloudfront.net/pics/regal2.jpg');background-position:35px 0px;-moz-border-radius:15px;"},all);
			newdiv.addEventListener("click",function(){document.location.href = "read.php?from=system&page=1&msg="+msgIdRead[msgIdRead.length-1]+"&mass=0";},false);
			newdiv=null;
		}
	}
	var newdiv = createElement("div",{"id":"lastMessage","style":"position:absolute;top:110px;right:-403px;width:413px;height:134px;padding:5px;background-color:#b8a789;border:2px solid black;-moz-border-radius:10px 0px 0px 10px;z-index:101;z-index:15;color:black;overflow:auto;"},all,GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_letzte",""));
	newdiv.addEventListener("mouseover",function(){this.style.right="0px";},false);
	newdiv.addEventListener("mouseout",function(){this.style.right="-403px";},false);
	newdiv=null;
}

function do_nachrichten_inbox(){
	if($("btn_inbox").getAttribute("class").search("green")==-1) {
		$("btn_inbox").bgColor="#cc9";
		if ($("btn_sysinbox").getAttribute("class").search("green")!=-1) {
			window.location.href = "http://s"+server+gamepage+"/nachrichten/system.php";
		}
	}
	var cand = candtable[2].getElementsByTagName("div");
	for(var v=0;v<cand.length;v++){
		cand[v].style.width="230px";
	}
	var cand = candtable[3].getElementsByTagName("span");
	cand[0].id = "prevPage";
	cand[1].id = "nextPage";
	cand=null;
}

function do_nachrichten_outbox(){
	$("btn_inbox").parentNode.childNodes[5].bgColor="#cc9";
	var candspan = candtable[3].getElementsByTagName("span");
	candspan[0].id = "prevPage";
	candspan[1].id = "nextPage";
	candspan=null;
}

function do_nachrichten_contact(){
	$("btn_inbox").parentNode.childNodes[6].bgColor="#cc9";
}

function do_nachrichten_system(){
	getData();
	GM_addStyle(".systemMsg_marketsale{"+GM_getValue(lng+"_"+server+"_"+username+"_css_systemMsg_marketsale","")+"}");
	GM_addStyle(".systemMsg_contractsale{"+GM_getValue(lng+"_"+server+"_"+username+"_css_systemMsg_contractsale","font-style:italic;")+"}");
	var keynachrichtid=/javascript:showMessage\('(\d+)',(\d+)\)/;
	var kauf = new Object();
	var msgId = new Array();
	var msgIdUnknown = splitToInt(GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doread",""),"|");
	var pageIsKnown = false;
	var candspan = candtable[3].getElementsByTagName("span");
	candspan[0].id = "prevPage";
	candspan[1].id = "nextPage";
	candspan=null;
	
	if($("btn_sysinbox").getAttribute("class").search("green")==-1) {
		$("btn_sysinbox").bgColor="#cc9";
	}
	
	try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_kauf").split("|");
		for (var v=0;v<arr.length;v++){
			var help = arr[v].split("~");
			kauf[help[0]]= new Object();
			kauf[help[0]]["kaeufer"] = help[1];
			kauf[help[0]]["menge"] = parseInt(help[2],10);
			kauf[help[0]]["produkt"] = help[3];
			kauf[help[0]]["preis"] = parseFloat(help[4],10);
			kauf[help[0]]["typ"] = help[5];
		}
	} catch(err){}
	
	candtable[2].parentNode.style.overflow="hidden";
	var candtr=candtable[2].getElementsByTagName("tr");
	candtr[0].childNodes[1].innerHTML="";
	var colgroup = candtable[1].getElementsByTagName("col");
	colgroup[0].width="20px";
	colgroup[1].width="130px";
	colgroup[2].width="380px";
	colgroup[3].width="20px";
	colgroup=null;

	var canda,cell,pic;
	for(var v=0;v<candtr.length-1;v++) {
		canda=candtr[v+1].getElementsByTagName("a");
		var help = keynachrichtid.exec(canda[0].href);
		if (help[2]=="0"){
			msgId[v] = help[1];
			if (kauf[msgId[v]]){
				pageIsKnown = true;
				canda[0].parentNode.style.width="380px";
				canda[0].innerHTML="";
				canda[0].setAttribute("style","text-decoration:none");
				if (kauf[msgId[v]]["menge"]!=0) igm(kauf[msgId[v]]["kaeufer"],canda[0].parentNode,kauf[msgId[v]]["produkt"]);
				else igm(kauf[msgId[v]]["kaeufer"],canda[0].parentNode);
				createElement("span",{"style":"position:absolute;width:140px;"},canda[0],kauf[msgId[v]]["kaeufer"]);
				if(kauf[msgId[v]]["typ"]=="v") canda[0].parentNode.setAttribute("class","systemMsg_contractsale");
				else canda[0].parentNode.setAttribute("class","systemMsg_marketsale");
				cell = createElement("span",{"style":"position:absolute; left:140px;width:150px; text-align:right;"},canda[0]);
				if(kauf[msgId[v]]["menge"]!=0) {
					canda[0].title=(texte["stueckpreis"]+": "+kT_format(kauf[msgId[v]]["preis"]/kauf[msgId[v]]["menge"])).replace(/&nbsp;/g," ");
					cell.innerHTML = number_format(kauf[msgId[v]]["menge"],0)+" "+kauf[msgId[v]]["produkt"];
					pic = produktPic(kauf[msgId[v]]["produkt"],cell);
					pic.setAttribute("style","float:right; margin-left:3px;");
				} else {
					cell.innerHTML = "...";
					canda[0].title=kauf[msgId[v]]["produkt"].replace(/<br>/g,", ").replace(/x /g," ");
				}
				createElement("span",{"style":"position:absolute; left:290px;width:90px; text-align:right;"},canda[0],kT_format(kauf[msgId[v]]["preis"]));
			} else {
				var help2 = canda[0].innerHTML.replace("<b>","").replace("</b>","");
				if ((help2==texte["msg1a"])||(help2==texte["msg2a"])) msgIdUnknown.push(msgId[v]);
			}
		} else {
			canda[0].innerHTML = canda[0].innerHTML.replace(/<b>/g,""); 
		}
	}
	
	try{ msgIdAll = msgId.concat(GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_system").split("|")); }
	catch(err){ msgIdAll = msgId; }
	
	function NumsortDesc (a, b) {return parseInt(b,10) - parseInt(a,10);}
	msgIdAll.sort(NumsortDesc);
	if (msgIdAll.length>1){
		for (var v=msgIdAll.length-2;v>-1;v--){
			if (msgIdAll[v]==msgIdAll[v+1]) msgIdAll.splice(v+1,1);
		}
	}
	
	msgIdUnknown.sort(NumsortDesc);
	for (var v=msgIdUnknown.length-1;v>-1;v--){
		if (msgIdUnknown[v]==msgIdUnknown[v+1]) msgIdUnknown.splice(v+1,1);
		if (kauf[msgIdUnknown[v]] || isNaN(msgIdUnknown[v]) ) msgIdUnknown.splice(v,1);
	}
	
	GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_system",msgIdAll.join("|"));
	GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doread",msgIdUnknown.join("|"));
	
	cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["zeigeLog"]},candtable[3].getElementsByTagName("td")[1]);
	cell.addEventListener("click",init_log,false);
	
	if (msgIdUnknown.length>0) {
		if (GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0)==3){
			if (!pageIsKnown && (candtable[3].getElementsByTagName("span")[1].getAttribute("onclick"))){ click(candtable[3].getElementsByTagName("span")[1]) }
			else {
				GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",2); //alle lesen
				unsafeWindow.showMessage(msgIdUnknown[msgIdUnknown.length-1],0);
			}
		} else if (GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0)==1){ // eine lesen
			GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0); 
			unsafeWindow.showMessage(msgIdUnknown[msgIdUnknown.length-1],0);
		}
		cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["alleLesen"]},candtable[3].getElementsByTagName("td")[1]);
		cell.addEventListener("click",function(){
			GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",3); //alle lesen vorbereiten
			do_nachrichten_system();
		},false);
	} else {
		GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_doreadState",0);
	}
	candtr=null;canda=null;cell=null;pic=null;
	//*********************
	function init_log(){
		GM_setValue(lng+"_"+server+"_"+username+"_nachrichten_system","");
		for (var v in kauf){
			kauf[v]["prod"] = new Object;
			if (kauf[v]["menge"]!=0) {
				kauf[v]["prod"][kauf[v]["produkt"]] = [kauf[v]["menge"],kauf[v]["preis"],Math.round(100*kauf[v]["preis"]/kauf[v]["menge"])/100];
			} else {
				var sum = 0;
				var help=kauf[v]["produkt"].split("<br>");
				for (var i=0;i<help.length;i++){
					var help2= help[i].split("x ");
					help2[0] = parseInt(help2[0],10);
					kauf[v]["prod"][help2[1]] = [help2[0],help2[0]*gut[prodId[help2[1]]]];
					sum += help2[0]*gut[prodId[help2[1]]];
				}
				sum /= kauf[v]["preis"];
				for(var i in kauf[v]["prod"]){ 
					kauf[v]["prod"][i][1] /= sum; 
					kauf[v]["prod"][i][2] = Math.round(100*kauf[v]["prod"][i][1]/kauf[v]["prod"][i][0])/100;
				}
			}
		}
		build_log("","")
	}                 
	function build_log(filter1,filter2){
		var filter1low = filter1.toLowerCase();
		var umsatz=0;
		var newtable = createElement("table",{"style":"width:100%;","class":"hovercc9"});
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablebody = createElement("tbody",{"style":"overflow-y:auto; overflow-x:hidden;height: 228px;"},newtable);
		var newtablefoot = createElement("tfoot",{},newtable);
		var newtr,newtd;
		for (var v in kauf) if ((kauf[v]["kaeufer"].toLowerCase().search(filter1low)!=-1) && (kauf[v]["produkt"].search(filter2)!=-1)){
			umsatz+=kauf[v]["preis"];
			newtr = createElement("tr",{"class":"link2", "id":v},newtablebody);
			if(kauf[v]["typ"]=="v") newtr.style.fontStyle="italic";
			newtd = createElement("td",{"title":texte["filtern"].replace("xx",kauf[v]["kaeufer"])},newtr,kauf[v]["kaeufer"]);
			newtd.addEventListener("click",function(){build_log(kauf[this.parentNode.id]["kaeufer"],"");},false);
			newtd = createElement("td",{},newtr);
			for(var i in kauf[v]["prod"]){	
				newdiv=createElement("div",{"style":"height:16px","id":i},newtd,number_format(kauf[v]["prod"][i][0])+" "+i);
				produktPic(i,newdiv);
				newdiv.title = texte["filtern"].replace("xx",i);
				newdiv.addEventListener("click",function(){build_log("",this.id);},false);
			}
			newtd = createElement("td",{"align":"right", "title":texte["zurNachricht"]},newtr);
			newtd.addEventListener("click",function(){document.location.href="read.php?from=system&page=1&msg="+this.parentNode.id+"&mass=0"},false);
			for(var i in kauf[v]["prod"]){	
				createElement("div",{"style":"height:16px","id":i},newtd,kT_format(kauf[v]["prod"][i][1]));
			}
			newtd = createElement("td",{"align":"right", "title":texte["zurNachricht"]},newtr);
			newtd.addEventListener("click",function(){document.location.href="read.php?from=system&page=1&msg="+this.parentNode.id+"&mass=0"},false);
			for(var i in kauf[v]["prod"]){	
				createElement("div",{"style":"height:16px;padding-right:20px;","id":i},newtd,kT_format(kauf[v]["prod"][i][2]));
			}
		}
		newtr = createElement("tr",{},newtablefoot);
		createElement("td",{},newtr);
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,kT_format(umsatz));
	
		newtable = createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr = createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["waren"]+":");
		newtd = createElement("td",{},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumWaren(filter1)},false);

		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("select",{"class":"link2"},newtd);
		createElement("option",{"value":""},cell,"");
		for (var v in prodNameSort) { createElement("option",{"value":prodName[prodNameSort[v]]},cell,prodName[prodNameSort[v]]);	}
		cell.value=filter2;
		cell.addEventListener("change",function(){ build_log(filter1,this.value); },false);
		
		newtr = createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["kaeufer"]+":");
		newtd = createElement("td",{},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumKaeufer(filter2,"gewinn")},false);
		
		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell = createElement("input",{"value":filter1,"class":"link2","style":"width:100px","maxlength":"20"},newtd);
		cell.addEventListener("change",function(){ build_log(this.value,filter2); },false);
		
		newtable=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}                 
	function build_log_sumWaren(filter1){
		var filter1low = filter1.toLowerCase();
		var kaufSum1 = new Object();
		var kaufSum1_length = 0;
		for(var v in kauf) if((kauf[v]["kaeufer"].toLowerCase().search(filter1low)!=-1)) {
			for(var prod in kauf[v]["prod"]){
				if(!kaufSum1[prod]){
					kaufSum1_length++;
					kaufSum1[prod] = [0,0,0];
				}
				kaufSum1[prod][0] += kauf[v]["prod"][prod][0];
				kaufSum1[prod][1] += kauf[v]["prod"][prod][1];
				kaufSum1[prod][2] += (kauf[v]["typ"]=="v"?1:0.9)*kauf[v]["prod"][prod][1];
			}
		}

		var kaufSum = new Array();
		for (var c=0;c<kaufSum1_length;c++){
			var maxElemVal = 0;
			for (var v in kaufSum1) if (maxElemVal<kaufSum1[v][1]) {
				maxElem = v;
				maxElemVal = kaufSum1[v][1];
			}
			kaufSum[c] = kaufSum1[maxElem];
			kaufSum[c]["produkt"] = maxElem;
			delete kaufSum1[maxElem];
		}
	
		var newtable = createElement("table",{"style":"width: 100%;","class":"hovercc9"});
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablehead = createElement("thead",{},newtable);
		var newtablebody = createElement("tbody",{"style":"overflow-y:auto; overflow-x:hidden;height: 209px;"},newtable);
		var newtablefoot = createElement("tfoot",{},newtable);
		var newtr = createElement("tr",{},newtablehead);
		var newtd = createElement("th",{},newtr,texte["produkt"]);
		createElement("th",{},newtr,texte["menge"]);
		createElement("th",{},newtr,texte["umsatz"]);
		createElement("th",{},newtr,"\u2205");
		createElement("th",{},newtr,texte["gewinn"]);
		createElement("th",{},newtr,"\u2205");
		var umsatz=0;
		var gewinn=0;
		for (var v=0;v<kaufSum.length;v++) {
			umsatz+=kaufSum[v][1];
			gewinn+=kaufSum[v][2];
			newtr = createElement("tr",{"id":v,"class":"link","title":texte["filtern"].replace("xx",kaufSum[v]["produkt"])},newtablebody);
			newtd = createElement("td",{},newtr,kaufSum[v]["produkt"]);
			produktPic(kaufSum[v]["produkt"],newtd);
			createElement("td",{"align":"right","style":"padding-right:3px;border-right:1px solid black"},newtr,number_format(kaufSum[v][0],0));
			createElement("td",{"align":"right"},newtr,number_format(kaufSum[v][1]));
			createElement("td",{"align":"right","style":"padding-right:3px;border-right:1px solid black"},newtr,number_format(kaufSum[v][1]/kaufSum[v][0],2));
			createElement("td",{"align":"right"},newtr,number_format(kaufSum[v][2]));
			createElement("td",{"align":"right","style":"padding-right:20px;"},newtr,number_format(kaufSum[v][2]/kaufSum[v][0],2));
			newtr.addEventListener("click",function(){build_log("",kaufSum[this.id]["produkt"]);},false);
		}
		newtr = createElement("tr",{},newtablefoot);
		createElement("td",{},newtr);
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,number_format(umsatz));
		createElement("td",{},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,number_format(gewinn));
	
		newtable = createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr = createElement("tr",{},newtable);
		newtd = createElement("td",{colspan:"2"},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["zeigeLog"]},newtd);
		cell.addEventListener("click",function(){ build_log(filter1,"") },false);
	
		newtr = createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["kaeufer"]+":");
		newtd = createElement("td",{},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumKaeufer("","gewinn")},false);
		
		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell = createElement("input",{"value":filter1,"class":"link2","style":"width:100px","maxlength":"20"},newtd);
		cell.addEventListener("change",function(){ build_log_sumWaren(this.value); },false);
	
		newtable=null;newtablehead=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}
	function build_log_sumKaeufer(filter2,mode){
		var kaufSum1 = new Object();
		var kaufSum1_length = 0;
		for(var v in kauf) if((filter2=="")||(kauf[v]["prod"][filter2])) {
			if(!kaufSum1[kauf[v]["kaeufer"]]){
				kaufSum1_length++;
				kaufSum1[kauf[v]["kaeufer"]] = new Object();
				kaufSum1[kauf[v]["kaeufer"]]["v"] = new Object();
				kaufSum1[kauf[v]["kaeufer"]]["m"] = new Object();
				kaufSum1[kauf[v]["kaeufer"]]["umsatz"] = 0;
				kaufSum1[kauf[v]["kaeufer"]]["gewinn"] = 0;
			}		
			for(var prod in kauf[v]["prod"]){
				if(!kaufSum1[kauf[v]["kaeufer"]][kauf[v]["typ"]][prod]){ kaufSum1[kauf[v]["kaeufer"]][kauf[v]["typ"]][prod]=[0,0] }
				kaufSum1[kauf[v]["kaeufer"]][kauf[v]["typ"]][prod][0] += kauf[v]["prod"][prod][0];
				kaufSum1[kauf[v]["kaeufer"]][kauf[v]["typ"]][prod][1] += kauf[v]["prod"][prod][1];
				kaufSum1[kauf[v]["kaeufer"]]["umsatz"] += kauf[v]["prod"][prod][1];
				kaufSum1[kauf[v]["kaeufer"]]["gewinn"] += (kauf[v]["typ"]=="v"?1:0.9)*kauf[v]["prod"][prod][1];
			}
		}

		var kaufSum = new Array();
		for (var c=0;c<kaufSum1_length;c++){
			var maxElemVal = 0;
			for (var v in kaufSum1) if (maxElemVal<kaufSum1[v][mode]) {
				maxElem = v;
				maxElemVal = kaufSum1[v][mode];
			}
			kaufSum[c] = kaufSum1[maxElem];
			kaufSum[c]["kaeufer"] = maxElem;
			delete kaufSum1[maxElem];
		}
	
		var newtable = createElement("table",{"style":"width: 100%;line-height:16px;","class":"hovercc9"});
		candtable[2].parentNode.replaceChild(newtable,candtable[2]);
		var newtablehead = createElement("thead",{},newtable);
		var newtablebody = createElement("tbody",{"style":"overflow-y:auto; overflow-x:hidden;height: 209px;"},newtable);
		var newtablefoot = createElement("tfoot",{},newtable);
		var newtr = createElement("tr",{},newtablehead);
		var newtd = createElement("th",{},newtr,texte["kaeufer"]);
		createElement("th",{},newtr,texte["produkt"]);
		createElement("th",{},newtr,texte[mode]);
		createElement("th",{},newtr,"\u2205");
		var help = (mode=="gewinn"?0.9:1);
		var sum=0;
		for (var v=0;v<kaufSum.length;v++) {
			sum+=kaufSum[v][mode];
			newtr = createElement("tr",{"id":v},newtablebody);
			newtd = createElement("td",{"class":"link","title":texte["filtern"].replace("xx",kaufSum[v]["kaeufer"])},newtr,kaufSum[v]["kaeufer"]);
			newtd.addEventListener("click",function(){build_log(this.innerHTML,"");},false);
			newtd = createElement("td",{},newtr);
			for(var prod in kaufSum[v]["m"]){
				newdiv = createElement("div",{"id":prod,"class":"link","title":texte["filtern"].replace("xx",prod)},newtd,number_format(kaufSum[v]["m"][prod][0])+"&nbsp;"+prod);
				produktPic(prod,newdiv);
				newdiv.addEventListener("click",function(){build_log_sumKaeufer(this.id,mode);},false);
			}
			for(var prod in kaufSum[v]["v"]){
				newdiv = createElement("div",{"id":prod,"class":"link","title":texte["filtern"].replace("xx",prod),"style":"font-style:italic;"},newtd,number_format(kaufSum[v]["v"][prod][0])+"&nbsp;"+prod);
				produktPic(prod,newdiv);
				newdiv.addEventListener("click",function(){build_log_sumKaeufer(this.id,mode);},false);
			}
			newtd = createElement("td",{"align":"right"},newtr);
			for(var prod in kaufSum[v]["m"]){
				createElement("div",{},newtd,number_format(help*kaufSum[v]["m"][prod][1]));
			}
			for(var prod in kaufSum[v]["v"]){
				createElement("div",{"style":"font-style:italic;"},newtd,number_format(kaufSum[v]["v"][prod][1]));
			}
			newtd = createElement("td",{"align":"right"},newtr);
			for(var prod in kaufSum[v]["m"]){
				createElement("div",{},newtd,number_format(help*kaufSum[v]["m"][prod][1]/kaufSum[v]["m"][prod][0],2));
			}
			for(var prod in kaufSum[v]["v"]){
				createElement("div",{"style":"font-style:italic;"},newtd,number_format(kaufSum[v]["v"][prod][1]/kaufSum[v]["v"][prod][0],2));
			}
			createElement("td",{"align":"right","style":"padding-right:20px;"},newtr,number_format(kaufSum[v][mode]));
			
		}
		newtr = createElement("tr",{},newtablefoot);
		createElement("td",{colspan:"2"},newtr);
		createElement("td",{"align":"right", "style":"border-top:1px solid"},newtr,number_format(sum));
		createElement("td",{colspan:"2"},newtr);
	
		newtable = createElement("table",{"style":"width: 530px;"});
		candtable[3].parentNode.replaceChild(newtable,candtable[3]);
		newtr = createElement("tr",{},newtable);
		newtd = createElement("td",{colspan:"2"},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["zeigeLog"]},newtd);
		cell.addEventListener("click",function(){ build_log("",filter2) },false);
		cell = createElement("input",{"type":"button","class":"link2 msg_input","id":(mode=="gewinn"?"umsatz":"gewinn"),"value":texte[(mode=="gewinn"?"umsatz":"gewinn")]},newtd);
		cell.addEventListener("click",function(){ build_log_sumKaeufer(filter2,this.id) },false);
	
		newtr = createElement("tr",{},newtable);
		createElement("td",{},newtr,texte["waren"]+":");
		newtd = createElement("td",{},newtr);
		var cell = createElement("input",{"type":"button","class":"link2 msg_input", "value":texte["summiere"]},newtd);
		cell.addEventListener("click",function(){build_log_sumWaren("")},false);
		createElement("span",{"style":"padding-left:10px;"},newtd,texte["filter"]+":");
		cell=createElement("select",{"class":"link2"},newtd);
		createElement("option",{"value":""},cell,"");
		for (var v in prodNameSort) { createElement("option",{"value":prodName[prodNameSort[v]]},cell,prodName[prodNameSort[v]]);	}
		cell.value=filter2;
		cell.addEventListener("change",function(){ build_log_sumKaeufer(this.value,mode); },false);	
		
		newtable=null;newtablehead=null;newtablebody=null;newtablefoot=null;newtr=null;newtd=null;cell=null;
	}
}

//***********************************************************************************************************

function do_vertraege_head(){
	var candtr = candtable[0].getElementsByTagName("tr");
	var newtd = createElement("td",{"class":"bordered link2","align":"center"},candtr[0]);
	var newa = createElement("a",{"style":"font-weight:bold;"},newtd,texte["alte"]);
	newa.addEventListener("click",function(){
		if (page=="vertraege/overview") {pageZusatz="?old";do_vertraege_overview();}
		else document.location.href = "overview.php?old";
	},false);
	candtr=null;newtd=null;newa=null;
}

function do_vertraege_new(){
	getData();
	candtable[0].childNodes[1].firstChild.childNodes[1].bgColor="#aa7";
	var contractPrices = explode(GM_getValue(lng+"_"+server+"_"+username+"_vertraegePreise","[]"));
	
	var candinput = candtable[1].getElementsByTagName("input");
	if (candinput.length>0){
		// contract submit page
		var neuvertrag = new Object();
		for (var v=0;v<candinput.length;v++) {
			if (candinput[v].name=="contract_to") {
				neuvertrag["zeit"] =  Math.round((new Date()).getTime()/1000);
				neuvertrag["kaeufer"] = candinput[v].value;
				GM_setValue(lng+"_"+server+"_"+username+"_lastContractTo",candinput[v].value);
				neuvertrag["menge"] = new Array();
				neuvertrag["produkt"] = new Array();
				neuvertrag["preis"] = new Array();
			}
			else if (candinput[v].name.search("prod")!=-1) { neuvertrag["produkt"][keyinteger.exec(candinput[v].name)[1]] = prodName[candinput[v].value]; }
			else if (candinput[v].name.search("anz")!=-1) { neuvertrag["menge"][keyinteger.exec(candinput[v].name)[1]] = candinput[v].value; }
			else if (candinput[v].name.search("preis")!=-1) { neuvertrag["preis"][keyinteger.exec(candinput[v].name)[1]] = candinput[v].value; }
		}
		
		var save = neuvertrag["zeit"]+"~"+neuvertrag["kaeufer"];
		for (var w in neuvertrag["menge"]){
			save += "~"+neuvertrag["menge"][w]+"~"+neuvertrag["produkt"][w]+"~"+neuvertrag["preis"][w];
			contractPrices[prodId[neuvertrag["produkt"][w]]] = neuvertrag["preis"][w];
		}
		var help = GM_getValue(lng+"_"+server+"_"+username+"_vertraegeOut","");
		if (help) save += "|"+help;
		GM_setValue(lng+"_"+server+"_"+username+"_vertraegeOut",save);
		GM_setValue(lng+"_"+server+"_"+username+"_vertraegePreise",implode(contractPrices));
		
		// multi submit
		var submitButton = document.getElementsByName("confirm_contract")[0];
		submitButton.style.display="none";
		var newbutton = createElement("input",{"type":"button","class":"link2 msg_input","id":"multiSubmit","name":"1","value":submitButton.value},submitButton.parentNode);
		newbutton.addEventListener("click",function(){
			var submitButton = document.getElementsByName("confirm_contract")[0];
			var submitForm = document.getElementsByName("form_confirmcontract")[0];
			var help = submitForm.getElementsByTagName("input");
			var str="";
			for (var v=0;v<help.length-3;v++) str+=help[v].getAttribute("name")+"="+help[v].value+"&";
			str=str.slice(0,str.length-1);
			var c = parseInt(this.getAttribute("name"),10);
			for (var d=1;d<c;d++) {
				GM_xmlhttpRequest({
				method: "POST",
				url: "http://s"+server+gamepage+submitForm.getAttribute("action"),
				headers: {"Content-type": "application/x-www-form-urlencoded"},
				data: str,
				onload: function(response) {
					GM_log("sendVert");
				}
				});
			}
			click(submitButton);
			submitButton=null;submitForm=null;
		},false);
		newbutton = createElement("input",{"type":"button","class":"link2 msg_input","value":"-"},submitButton.parentNode);
		newbutton.addEventListener("click",function(){
			var submitButton = document.getElementsByName("confirm_contract")[0];
			$("multiSubmit").setAttribute("name",Math.max(1,parseInt($("multiSubmit").getAttribute("name"),10)-1));
			if ($("multiSubmit").getAttribute("name")=="1"){ $("multiSubmit").value = submitButton.value; }
			else { $("multiSubmit").value = $("multiSubmit").getAttribute("name")+"x "+submitButton.value; }
			submitButton=null;
		},false);
		newbutton = createElement("input",{"type":"button","class":"link2 msg_input","value":"+"},submitButton.parentNode);
		newbutton.addEventListener("click",function(){
			var submitButton = document.getElementsByName("confirm_contract")[0];
			$("multiSubmit").setAttribute("name",parseInt($("multiSubmit").getAttribute("name"),10)+1);
			$("multiSubmit").value = $("multiSubmit").getAttribute("name")+"x "+submitButton.value;
			submitButton=null;
		},false);
		newbutton=null;submitButton=null;
	} else {
		// contract edit page
		if ($("to_player") && $("to_player").value=="") $("to_player").value = GM_getValue(lng+"_"+server+"_"+username+"_lastContractTo","");

		var candtr = $("addproduct").getElementsByTagName("tr");
		var newtr = createElement("tr");
		candtr[4].parentNode.insertBefore(newtr,candtr[4]);
		createElement("td",{},newtr);
		createElement("td",{},newtr,texte["wert"]);
		var newtd = createElement("td",{"align":"left"},newtr);
		var newinput = createElement("input",{"id":"addproductWert","class":"text2 msg_input","type":"text","style":"width: 100px;border: 1px solid #AAAAAA;"},newtd);
		newinput.addEventListener("keyup",function(event){
			var preis=parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10);
			if (preis>0){
				$("neu_anzahl").value = Math.floor(0.01+parseFloat(this.value.replace(regDelimThou,"").replace(regDelimDeci,"."),10)/preis);
			}
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		newinput.addEventListener("focus",function(){this.style.border="1px solid #555555";},false);
		newinput.addEventListener("blur",function(){this.value = number_format(parseInt($("neu_anzahl").value,10)*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);;this.style.border="1px solid #AAAAAA";},false);
		$("neu_anzahl").addEventListener("focus",function(){this.style.border="1px solid #555555";},false);
		$("neu_anzahl").addEventListener("keyup",function(event){
			var anzahl = parseInt($("neu_anzahl").value.replace(/\D/g,""),10);
			$("addproductWert").value = number_format(anzahl*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);
			this.value = (anzahl>0?anzahl:"");
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		$("neu_anzahl").addEventListener("blur",function(){this.style.border="1px solid #AAAAAA";},false);
		$("neu_preis").addEventListener("focus",function(){this.style.border="1px solid #555555";},false);
		$("neu_preis").addEventListener("keyup",function(event){
			$("addproductWert").value = number_format(parseInt($("neu_anzahl").value,10)*parseFloat($("neu_preis").value.replace(regDelimDeci,"."),10),2);
			if (event.keyCode==13) click($("btn_add_product"));
		},false);
		$("neu_preis").addEventListener("blur",function(){this.style.border="1px solid #AAAAAA";},false);
		
		var newdiv = createElement("div",{"id":"lastMessage","style":"position:absolute;top:110px;right:-403px;width:413px;height:134px;padding:5px;background-color:#b8a789;border:2px solid black;-moz-border-radius:10px 0px 0px 10px;z-index:101;z-index:15;color:black;overflow:auto;"},all,GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_letzte",""));
		newdiv.addEventListener("mouseover",function(){this.style.right="0px";},false);
		newdiv.addEventListener("mouseout",function(){this.style.right="-403px";},false);
		
		// set remembered price
		var old_produkt = "";
		window.setInterval(function(){
			if(old_produkt!=$("neu_produkt").value){
				old_produkt = parseInt($("neu_produkt").value,10);
				if(contractPrices[old_produkt]){ $("neu_preis").value = number_format(contractPrices[old_produkt],2); }
			}
		},500);
		newdiv=null;newinput=null;newtr=null;newtd=null;candtr=null;candinput=null;
	}
}

function do_vertraege_overview(){
	getData();
	var vertraegeIn = new Array();
	var vertraegeOut = new Array();
	var vertraegeInIds = new Object();
	var keyvertrag = /'(\d+)',%20'(.*?)'%20/;
	
	try{ var save = GM_getValue(lng+"_"+server+"_"+username+"_vertraegeIn");
		if (save) {
			var arr = save.split("|");
			var c=-1;
			for (var v=0;v<arr.length;v++) if (c<100){
				var help = arr[v].split("~");
				if (!vertraegeInIds[help[0]]){
					vertraegeIn[++c]= new Object();
					vertraegeInIds[help[0]]=c+1;
					vertraegeIn[c]["id"] = help[0];
					vertraegeIn[c]["zeit"] = help[1];
					vertraegeIn[c]["kaeufer"] = help[2];
					vertraegeIn[c]["menge"] = new Array();
					vertraegeIn[c]["produkt"] = new Array();
					vertraegeIn[c]["preis"] = new Array();
					for (var w=0;3*w+5<help.length;w++){
						vertraegeIn[c]["menge"][w] = parseInt(help[3*w+3],10);
						vertraegeIn[c]["produkt"][w] = help[3*w+4];
						vertraegeIn[c]["preis"][w] = parseFloat(help[3*w+5],10);
					}
				}
			}
		}
	} catch(err){}
	
	try{ var save = GM_getValue(lng+"_"+server+"_"+username+"_vertraegeOut");
		if (save) {
			var arr = save.split("|");
			var c=-1;
			for (var v=0;v<arr.length;v++) if (c<100){
				var help = arr[v].split("~");
				vertraegeOut[++c]= new Object();
				vertraegeOut[c]["id"] = c;
				vertraegeOut[c]["zeit"] = help[0];
				vertraegeOut[c]["kaeufer"] = help[1];
				vertraegeOut[c]["menge"] = new Array();
				vertraegeOut[c]["produkt"] = new Array();
				vertraegeOut[c]["preis"] = new Array();
				for (var w=0;3*w+4<help.length;w++){
					vertraegeOut[c]["menge"][w] = parseInt(help[3*w+2],10);
					vertraegeOut[c]["produkt"][w] = help[3*w+3];
					vertraegeOut[c]["preis"][w] = parseFloat(help[3*w+4],10);
				}
			}
		}
	} catch(err){}
	
	function savevertraegeIn(){
		var save="";
		for (var v in vertraegeIn) {
			save += vertraegeIn[v]["id"]+"~"+vertraegeIn[v]["zeit"]+"~"+vertraegeIn[v]["kaeufer"];
			for (var w in vertraegeIn[v]["menge"]) save	+= "~"+vertraegeIn[v]["menge"][w]+"~"+vertraegeIn[v]["produkt"][w]+"~"+vertraegeIn[v]["preis"][w];
			save += "|";
		}
		GM_setValue(lng+"_"+server+"_"+username+"_vertraegeIn",save.slice(0,save.length-1));
	}
	function savevertraegeOut(){
		var save="";
		for (var v in vertraegeOut) {
			save += vertraegeOut[v]["zeit"]+"~"+vertraegeOut[v]["kaeufer"];
			for (var w in vertraegeOut[v]["menge"]) save += "~"+vertraegeOut[v]["menge"][w]+"~"+vertraegeOut[v]["produkt"][w]+"~"+vertraegeOut[v]["preis"][w];
			save += "|";
		}
		GM_setValue(lng+"_"+server+"_"+username+"_vertraegeOut",save.slice(0,save.length-1));
	}
	
	var candtd = candtable[0].getElementsByTagName("td");
	if (pageZusatz=="?old"){
		candtd[1].bgColor="";
		candtd[2].bgColor="#aa7";
		buildAlteVertraege("In");
	} else {
		candtd[1].bgColor="#aa7";
		candtable[1].parentNode.style.height = "310px";
		var candtr = candtable[1].getElementsByTagName("tr");
		var canda;
		var sumTotalOut = 0;
		for (var v in candtr) {
			candtd = candtr[v].getElementsByTagName("td");
			canda = candtr[v].getElementsByTagName("a");
			if (canda[0]) {
				var help = keyvertrag.exec(canda[0].href);
				if (help[2] == "in") {
					if (vertraegeInIds[help[1]]) {
						vertraegeIn[vertraegeInIds[help[1]]-1]["zeit"]=str2time(candtd[0].innerHTML);
					} else {
						var c = vertraegeIn.length;
						vertraegeIn[c]= new Object();
						vertraegeInIds[help[1]]=c+1;
						vertraegeIn[c]["id"] = help[1];
						vertraegeIn[c]["zeit"] = str2time(candtd[0].innerHTML);
						vertraegeIn[c]["kaeufer"] = /(.*?)&nbsp;/.exec(candtd[2].innerHTML+"&nbsp;")[1];
						vertraegeIn[c]["menge"] = new Array();
						vertraegeIn[c]["produkt"] = new Array();
						vertraegeIn[c]["preis"] = new Array();
						var help2 = candtd[1].firstChild.innerHTML.replace(' style=""',"").replace("<b>","").replace("</b>","");
						if (help2.search(",")==-1){
							var help3 = help2.split(" x ");
							vertraegeIn[c]["menge"][0] = help3[0];
							vertraegeIn[c]["produkt"][0] = help3[1];
						} else {
							vertraegeIn[c]["menge"][0] = 0;
							vertraegeIn[c]["produkt"][0] = "-";
						}
						vertraegeIn[c]["preis"][0] = candtd[3].innerHTML.replace(/&nbsp;/g+texte["waehrung"],"").replace(regDelimThou,"").replace(regDelimDeci,".");
					}
				} else if(help[2] == "out") {
					sumTotalOut += parseFloat(candtd[3].innerHTML.replace(regDelimThou,"").replace(regDelimDeci),10);
				}
			}
		}
		createElement("td",{"colspan":"3"},candtable[1]);
		createElement("td",{"style":"border-top:1px solid black;text-align:right;"},candtable[1],kT_formatgr(sumTotalOut));
		savevertraegeIn();

		candtr=null;canda=null;
	}
	candtd=null;
	
	function buildAlteVertraege(mode) {
		if (mode=="In") vertraege = vertraegeIn;
		else vertraege = vertraegeOut;
		var canddiv = all.getElementsByTagName("div");
		var newdiv = createElement("div",{"style":"position: absolute; left: 15px; top: 66px; overflow: hidden;"});
		candtable[1].parentNode.parentNode.replaceChild(newdiv,candtable[1].parentNode);
		var newtable = createElement("table",{"style":"width:570px;"},newdiv);
		var newtr = createElement("tr",{},newtable);
		var newtd = createElement("td",{"class":"link tnormal","align":"center","style":"color:black;font-weight:bold;"},newtr,texte["erhalteneVertraege"]);
		if (mode=="In") newtd.bgColor="#aa7";
		newtd.addEventListener("click",function(){buildAlteVertraege("In")},false);
		newtd = createElement("td",{"class":"link tnormal","align":"center","style":"color:black;font-weight:bold;"},newtr,texte["gesendeteVertraege"]);
		if (mode=="Out") newtd.bgColor="#aa7";
		newtd.addEventListener("click",function(){buildAlteVertraege("Out")},false);
	
		newtable = createElement("table",{"class":"hovercc9","style":"width:570px;"},newdiv);
		var newtablehead = createElement("thead",{},newtable);
		var newtablebody = createElement("tbody",{"style":"height:290px;overflow-x:hidden;overflow-y:scroll;"},newtable);
		var newtd1,newtd2,newimg;
		for (var v in vertraege){
			newtr = createElement("tr",{},newtablebody);
			newtd = createElement("td",{"class":"borderTop"},newtr);
			if (vertraege[v]["zeit"]!="0") newtd.innerHTML = datum(vertraege[v]["zeit"])+",<br>"+uhrzeit(vertraege[v]["zeit"],1)+"&nbsp;"+texte["uhr"];
	
			newtd = createElement("td",{"class":"borderTop"},newtr,vertraege[v]["kaeufer"]);
			newdiv = createElement("div",{},newtd);
			igm(vertraege[v]["kaeufer"],newdiv);
			stats(vertraege[v]["kaeufer"],newdiv);
			vertrag(vertraege[v]["kaeufer"],newdiv);
	
			newtd = createElement("td",{"class":"borderTop"},newtr);
			newtd1 = createElement("td",{"class":"borderTop","style":"text-align:right;"},newtr);
			newtd2 = createElement("td",{"class":"borderTop","style":"text-align:right;"},newtr);
			var sum = 0
			for (var w in vertraege[v]["menge"]) {
				newdiv = createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd);
				produktPic(vertraege[v]["produkt"][w],newdiv);
				createElement("span",{},newdiv,number_format(vertraege[v]["menge"][w],0) +"&nbsp;"+ vertraege[v]["produkt"][w]);
				createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd1,kT_format(vertraege[v]["preis"][w]));
				createElement("div",{"style":"line-height:16px;white-space:nowrap;"},newtd2,kT_formatgr(vertraege[v]["menge"][w]*vertraege[v]["preis"][w]));
				sum += vertraege[v]["menge"][w]*vertraege[v]["preis"][w];
			}
			if (vertraege[v]["menge"].length>1){ 
				createElement("div",{},newtd,"&nbsp;"); 
				createElement("div",{},newtd1,"&nbsp;"); 
				createElement("div",{"style":"border-top:1px solid black;text-align:right;"},newtd2,kT_formatgr(sum)); 
			}
			newtd = createElement("td",{"class":"borderTop","style":"text-align:right;padding-right:20px;"},newtr);
			newimg = createElement("img",{"title":texte["loeschen"],"id":v,"src":"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif","class":"link2","style":"width:16px;height:16px;"},newtd);
			newimg.addEventListener("click",function(){
				if (confirm(texte["loeschen"]+"?")) {
					if (mode=="In") {
						vertraegeIn.splice(parseInt(this.id,10),1);
						savevertraegeIn();
					} else {
						vertraegeOut.splice(parseInt(this.id,10),1);
						savevertraegeOut();
					}
					buildAlteVertraege(mode);
				}
			},false);
		}
		newtable=null;newtablehead=null;newtablebody=null;newtr=null;newtd=null;newtd1=null;newtd2=null;newimg=null;newdiv=null;canddiv=null;
	}
}

function do_vertraege_show(){
	var spanError = all.getElementsByClassName("error");
	if (spanError.length>0) {
		spanError[0].parentNode.style.height = "25px";
		spanError[0].parentNode.style.top = "262px";
	}
	spanError=null;
	
	var keyvertragin = /v=(\d+)&typ=in/;
	if (keyvertragin.exec(pageZusatz)){
		getData();
		var keyname = /\s*(.*)&nbsp;/;
		var vertraegeIn = new Array();
		var vertraegeInIds = new Object();
		
		try{ var arr = GM_getValue(lng+"_"+server+"_"+username+"_vertraegeIn").split("|");
			var c=0;
			for (var v in arr){
				var help = arr[v].split("~");
				if (!vertraegeInIds[help[0]]){
					vertraegeIn[++c]= new Object();
					vertraegeInIds[help[0]]=c;
					vertraegeIn[c]["id"] = help[0];
					vertraegeIn[c]["zeit"] = help[1];
					vertraegeIn[c]["kaeufer"] = help[2];
					vertraegeIn[c]["menge"] = new Array();
					vertraegeIn[c]["produkt"] = new Array();
					vertraegeIn[c]["preis"] = new Array();
					for (var w=0;3*w+5<help.length;w++){
						vertraegeIn[c]["menge"][w] = parseInt(help[3*w+3],10);
						vertraegeIn[c]["produkt"][w] = help[3*w+4];
						vertraegeIn[c]["preis"][w] = parseFloat(help[3*w+5],10);
					}
				}
			}
		} catch(err){}
		
		var canddiv = all.getElementsByTagName("div");
		var candtr = candtable[1].getElementsByTagName("tr");
		var candtd;
		candtable[1].style.left="65px";
		candtable[1].style.width="";
		vertraegeIn[0]= new Object();
		vertraegeIn[0]["id"] = keyvertragin.exec(pageZusatz)[1];
		vertraegeIn[0]["zeit"] = vertraegeIn[vertraegeInIds[vertraegeIn[0]["id"]]]["zeit"];
		vertraegeIn[0]["kaeufer"] = keyname.exec(candtable[1].previousSibling.previousSibling.innerHTML)[1];
		vertraegeIn[0]["menge"] = new Array();
		vertraegeIn[0]["produkt"] = new Array();
		vertraegeIn[0]["preis"] = new Array();
		var sum = 0;
		for (var w=0;w<candtr.length-2;w++){
			candtd = candtr[w].getElementsByTagName("td");
			vertraegeIn[0]["menge"][w] = parseInt(candtd[0].innerHTML,10);
			vertraegeIn[0]["produkt"][w] = candtd[2].innerHTML;
			vertraegeIn[0]["preis"][w] = parseFloat(candtd[4].innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10);
			candtd[4].style.paddingRight = "5px";
			createElement("td",{"style":"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],kT_format(0.9*gut[prodId[vertraegeIn[0]["produkt"][w]]]));
			var help = 0.9*vertraegeIn[0]["menge"][w]*gut[prodId[vertraegeIn[0]["produkt"][w]]];
			createElement("td",{"style":"border-left:1px dashed black;padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],kT_formatgr(help));
			sum += help;
		}
		candtd = candtr[candtr.length-2].getElementsByTagName("td");
		candtd[1].style.paddingRight = "5px";
		var preis = parseFloat(candtd[1].firstChild.innerHTML.replace(regDelimThou,"").replace(regDelimDeci,"."),10);
		createElement("td",{"style":"border-left:1px dashed black;border-top: 1px solid rgb(170, 170, 170);padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],number_format(100*preis/sum,1)+"%");
		createElement("td",{"style":"border-left:1px dashed black;border-top: 1px solid rgb(170, 170, 170);padding-right:5px;padding-left:5px;text-align:right;"},candtr[w],kT_formatgr(sum));
		
		function sortIdAbst (a, b) {return b["id"] - a["id"];}
		vertraegeIn.sort(sortIdAbst);
		var save="";
		for (var v in vertraegeIn) {
			save += vertraegeIn[v]["id"]+"~"+vertraegeIn[v]["zeit"]+"~"+vertraegeIn[v]["kaeufer"];
			for (var w in vertraegeIn[v]["menge"]) save	+= "~"+vertraegeIn[v]["menge"][w]+"~"+vertraegeIn[v]["produkt"][w]+"~"+vertraegeIn[v]["preis"][w];
			save += "|";
		}
		GM_setValue(lng+"_"+server+"_"+username+"_vertraegeIn",save.slice(0,save.length-1));
		canddiv=null;candtr=null;candtd=null;
	}
}

//***********************************************************************************************************

function do_hilfe(){
	var item = (/item=(\d+)/).exec(pageZusatz);
	var canddiv = new Array();
	for (var v=0; v<all.childNodes.length;v++){ if(all.childNodes[v].id=="") canddiv.push(all.childNodes[v]); }
	canddiv[1].id = "helpmenu";
	canddiv[1].style.left="0px";
	canddiv[1].style.width="155px";
	canddiv[1].style.overflow = "auto";
	canddiv[2].id = "helpbody";
	var newdiv = createElement("div",{"style":"margin-top:5px;"},canddiv[1]);
	var newa = createElement("a",{"class":"list_header"},newdiv,texte["berater"]);
	newa.addEventListener("click",function(){
		var cell = $("helpbody");
		cell.innerHTML = "";
		createElement("div",{"class":"tnormal"},cell,"<b>"+texte["berater"]+"</b><br>");
		for (var w in texte["hilfe"]){
			if (Number(w) != w) createElement("div",{"class":"tmenu"},cell,"<b>"+w+"</b>");
			createElement("p",{"class":"tmenu"},cell,texte["hilfe"][w]);
		}
	},false);
	if (GM_getValue("tutorial",0)==0){
		click(newa);
		GM_setValue("tutorial",1);
	}
	
	if(item){
	if(item[1]=="18"){
		getData();
		removeElement(candtable[0].getElementsByTagName("tr")[0]);
		$("questinfos").style.display="block";
		var questNr = GM_getValue(lng+"_"+server+"_"+username+"_quest",0);
		if(unsafeWindow.top.userquests==""){ questNr++; }
		for(var v=0;v<questNr-1;v++) $("questinfos").childNodes[v].style.opacity="0.5";
		$("questinfos").childNodes[questNr-1].style.backgroundColor="lightblue";
		candtable[0].parentNode.scrollTop = 30*questNr;
		//var s="";
		//for(var v=0;v<$("questinfos").childNodes.length;v++) {
		// var canddiv = $("questinfos").childNodes[v].childNodes[3].getElementsByTagName("div");
		// s+= ",["+canddiv[0].getAttribute("class").replace("kp","");
		// s+= ","+canddiv[1].innerHTML.replace("&nbsp;","").replace("x&nbsp;","");
		// s+= ","+canddiv[4].getAttribute("class").replace("kp","");
		// s+= ","+canddiv[5].innerHTML.replace("&nbsp;","").replace("x&nbsp;","")+"]";
		//}
		//GM_log(s);
		var help=null, prodcounter=new Object();
		var newsel = createElement("select",{"id":"questselect","style":"position:absolute;top:7px;left:515px;width:50px;height:18px;"},$("helpbody").parentNode);
		for(var v=questNr;v<=$("questinfos").childNodes.length;v++){ 
			createElement("option",{"value":v},newsel,v);		
			canddiv = $("questinfos").childNodes[v-1].childNodes[3].getElementsByTagName("div");
			help = canddiv[0].getAttribute("class").replace("kp","");
			if (!prodcounter[help]) prodcounter[help]=0;
			prodcounter[help] += parseInt(canddiv[1].innerHTML.replace("&nbsp;","").replace("x&nbsp;",""),10);
			if(prodBlock[help]){ 
				canddiv[1].style.backgroundColor = "red";
				canddiv[2].style.backgroundColor = "red";
			} else if (prodBestand[help] < prodcounter[help]) {
				canddiv[2].innerHTML += "<span style=\"color:red;\"> (" + number_format(prodcounter[help]-prodBestand[help]) + ")</span>";
			}
			
			help = canddiv[4].getAttribute("class").replace("kp","");
			if (!prodcounter[help]) prodcounter[help]=0;
			prodcounter[help] += parseInt(canddiv[5].innerHTML.replace("&nbsp;","").replace("x&nbsp;",""),10);
			if(prodBlock[help]){
				canddiv[5].style.backgroundColor = "red";
				canddiv[6].style.backgroundColor = "red";
			} else if (prodBestand[help] < prodcounter[help]) {
				canddiv[6].innerHTML += "<span style=\"color:red;\"> (" + number_format(prodcounter[help]-prodBestand[help]) + ")</span>";
			}
		}
		
		createElement("div",{"id":"queststocks","style":"position:absolute;top:28px;left:515px;width:80px;height:220px;border:1px solid #6c441e;overflow-y:auto;overflow-x:hidden;"},$("helpbody").parentNode);
		var newinp = createElement("input",{"id":"questvsrack","type":"checkbox","style":"position:absolute;top:250px;left:575px;","title":texte["zeigeFehlendeProdukte"]},$("helpbody").parentNode);
		newinp.checked =true;
		newinp.addEventListener("click",function(){change($("questselect"));},false);
		newsel.addEventListener("change",function(){
			$("queststocks").innerHTML="";
			var questNr = GM_getValue(lng+"_"+server+"_"+username+"_quest",0);
			if(unsafeWindow.top.userquests==""){ questNr++; }
			var prd=new Object();
			var canddiv,help=null;
			for(var v=questNr-1;v<this.value;v++) {
				canddiv = $("questinfos").childNodes[v].childNodes[3].getElementsByTagName("div");
				help = canddiv[0].getAttribute("class").replace("kp","");
				if (!prd[help]) prd[help]=0;
				prd[help] += parseInt(canddiv[1].innerHTML.replace("&nbsp;","").replace("x&nbsp;",""),10);
				help = canddiv[4].getAttribute("class").replace("kp","");
				if (!prd[help]) prd[help] =0;
				prd[help] += parseInt(canddiv[5].innerHTML.replace("&nbsp;","").replace("x&nbsp;",""),10);
			}
			var counter=0;
			for(var v=0;v<prodNameSort.length;v++){ 
				//if ($("questvsrack").checked && (prodBestand[v] > prd[v])) continue;
				if(prd[v]){
					var newdiv= createElement("div",{"style":"display:inline-block;width:100%;background-color:"+(prodBlock[v]?"red":((counter%2)?"rgb(173, 158, 125);":"rgb(165, 149, 116);"))},$("queststocks"));
					produktPic(v,newdiv);
					if ($("questvsrack").checked && (prodBestand[v] < prd[v])){
						createElement("div",{"style":"color:"+(prodBlock[v]?"black":"red")+ ";float:left;"},newdiv,"-"+number_format(prd[v]-prodBestand[v]));
					}else if ($("questvsrack").checked && (prodBestand[v] > prd[v])){
						createElement("div",{"style":"color:black;float:left;"},newdiv,"+"+number_format(prodBestand[v]-prd[v])); 
					} else {
						createElement("div",{"style":"color:black;float:left;"},newdiv,number_format(prd[v]));
					}
					counter++;
				}
			}
			newdiv=null;v=null;prd=null;counter=null;canddiv=null;help=null;
		},false);
		newsel.options[10].selected = true;
		change(newsel);
		newsel=null;prodcounter=null;newinp=null;
	}
	}
	item=null;newdiv=null;newa=null;canddiv=null;
}


//***********************************************************************************************************

function do_blende(){
	if(GM_getValue(lng+"_"+server+"_"+username+"_valDrag",false)){ makeDraggable(all,true,true,"multiframe"); }
	var canddiv = all.getElementsByTagName("div");
	if ($top("transp")) {
		$top("transp").style.display="block";
		if (canddiv[0]) canddiv[0].addEventListener("click",function(){
			if (($top("innermaincontainer").style.display!="block") &&
				($top("gardenmaincontainer").style.display!="block") &&
				($top("cart").style.display!="block")) $top("transp").style.display="none";
		},false);
	}
	canddiv=null;
	closeInfoPanel();
}

//***********************************************************************************************************

function do_login(){
	if(top.document.location!=document.location) return;
	var loc = reg2.exec(document.location.href);
	if (loc[2].search("login.php")==-1) {
		window.setTimeout(function(){ document.location.href="http://www"+gamepage+"/login.php?start=1"; },100);//auf login-seite leiten
	} else if (loc[2].search("start=1")==-1) {
		document.location.href="http://www"+gamepage+"/login.php?start=1"; 
	} else { 
		//paypal
		var newform = createElement("form",{"id":"paypalForm","action":"https://www.pa/cgi-bin/webscr","method":"post","style":"position:absolute;top:30px;left:100px;"},all);
		createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
		createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
		createElement("input",{"type":"hidden","name":"lc","value":((lng=="de")?"DE":"US")},newform);
		createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
		createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
		createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
		createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
		createElement("input",{"type":"image","border":"0","src":"https:///"+((lng=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:""},newform);
		createElement("img",{"alt":"","border":"0","src":"https:///en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
		newform=null;

		//login
		var Now = Math.floor((new Date()).getTime()/1000);
		var keydologin = /dologin=(\d+)/;
		var keydoserver = /doserver=(\d+)/;
		var logindata = new Array();
		try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		var c=0;
		var servers = new Object();
		for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
			c++;
			if(!servers[logindata[v][0]+"_"+logindata[v][1]]){ servers[logindata[v][0]+"_"+logindata[v][1]]=new Array(); }
			servers[logindata[v][0]+"_"+logindata[v][1]].push(v);
		}

		var gamepages = {"bu":"http://www.veselaferma.com","uk":"http://www.myfreefarm.co.uk","de":"http://www.myfreefarm.de","hu":"http://www.enkicsitanyam.hu","nl":"http://www.myfreefarm.nl","pl":"http://www.wolnifarmerzy.pl","tr":"http://www.tr.myfreefarm.com"};
		
		getChildElementById($("login_container"),"input","submitlogin").addEventListener("click",function(){
			var currServer = $("login_container").getElementsByTagName("select")[0].value;
			var currUser = getChildElementById($("login_container"),"input","username").value.toLowerCase();
			GM_setValue(lng+"_"+currServer+"_username",currUser);
			//alert(currServer+":"+currUser);
		},false);
		
		function submit_login(accNr){
			if(logindata[accNr][0]==lng){
				$("login_container").getElementsByTagName("select")[0].value=logindata[accNr][1];
				getChildElementById($("login_container"),"input","username").value=logindata[accNr][2];
				getChildElementById($("login_container"),"input","password").value=logindata[accNr][3];
				getChildElementById($("login_container"),"input","submitlogin").click();
			} else {
				document.location.href = gamepages[logindata[accNr][0]]+"/login.php?start=1&ref=&wid=&dologin="+accNr;
			}
		}
		var currDoLogin = keydologin.exec(document.location.href);
		var currDoServer = keydoserver.exec(document.location.href);
		if(currDoServer){
			var help = GM_getValue(lng+"_"+currDoServer[1]+"_username","");
			for (var v=0;v<logindata.length;v++){
				if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])&&(logindata[v][2].toLowerCase()==help)){ 
					currDoLogin = [,v]; 
					break;
				}
			}
			if(!currDoLogin){
				for (var v=0;v<logindata.length;v++){
					if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])){ 
						currDoLogin = [,v]; 
						break;
					}
				}				
			}
		}
		if(currDoLogin){
			submit_login(currDoLogin[1]);
		} else {
			var newdiv=createElement("div",{"style":"position:relative;top:-400px;left:300px;"},$("login_container"));
			var newbutton;
			GM_addStyle(".loginbutton{background-color:white;color:black;text-align:center;font-weight:bold;width:250px;line-height:20px;margin:3px;border:3px solid #6c441e;-moz-border-radius:10px;}");
			GM_addStyle(".loginbutton:hover{background-color:lightblue;}");
			for (var v=0;v<logindata.length;v++) if(logindata[v][4]){
				newbutton = createElement("div",{"class":"link loginbutton","id":"autologin"+v},newdiv,texte["server"]+" "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
				newbutton.addEventListener("click",function(){
					submit_login(this.id.replace("autologin",""));
				},false);
			}
		
			//Autologin
			var lastbusy = GM_getValue("loginbusy",0);
			if (isNaN(lastbusy) || Now<lastbusy) { lastbusy = 0; }
			if (GM_getValue("valAutoLogin",false) && (c>0) && (Now-lastbusy>15)){
				GM_setValue("loginbusy",Now);
				if (c==1) {
					//Soloaccount
					for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
						submit_login(v);
					}
				} else {
					//Multiaccount
					createElement("div",{"id":"divInfo","style":"position:absolute;top:190px;left:455px;height:200px;width:280px;background-color:#842;border:4px solid black;z-index:99;"},$("main_container"));
					$("divInfo").innerHTML = "<h1>"+texte["autologin1"].replace(/%1%/,"5")+"</h1>";
		
					for (var v in servers) {
						GM_setValue(v+"_sessionlost",true);
					}
					var counter = 5;
					function autologinLoop(){
						counter-=0.5;
						if(counter>0){
							$("divInfo").innerHTML = "<h1>"+texte["autologin1"].replace(/%1%/,Math.ceil(counter))+"</h1>";
							var c = 0;
							for (var v in servers) {
								if (!GM_getValue(v+"_sessionlost",true)) {
									var help = GM_getValue(v+"_username","");
									for(var w=0;w<servers[v].length;w++){
										$("autologin"+servers[v][w]).style.backgroundColor = (logindata[servers[v][w]][2].toLowerCase()==help?"#00ff00":"#008800");
									}
									delete servers[v];
								} else {
									c++;
								}
							}
							if(c==0){ counter = 0; }
							window.setTimeout(autologinLoop,500);
						} else {
							var c = -1;
							for (var v in servers) {
								if (GM_getValue(v+"_sessionlost",true)) {
									if (c==-1) {c=servers[v][0];}
									else {window.open(gamepages[logindata[servers[v][0]][0]]+"/login.php?start=1&ref=&wid=&dologin="+servers[v][0]);}
								}
							}
							GM_setValue("loginbusy",0);
							if (c==-1) {
								//window.close(); <-- funzt nicht :(
								$("divInfo").innerHTML = "<h1>"+texte["autologin2"]+"</h1>";
								window.setTimeout(function(){document.location=document.location},5000);
							} else { submit_login(c); }
						}
					}
					window.setTimeout(autologinLoop,500);
				}
			}
			newdiv=null;newbutton=null;
		}
	}
}

//***********************************************************************************************************
// Umstellung seit 10.06.
if (!(GM_getValue("changedata",0)>0)){
	var help = GM_listValues();
	for (var v=0;v<help.length;v++){
		if (help[v].search("myFreeFarm_")!=-1) {
			GM_setValue(help[v].replace("myFreeFarm_",""),GM_getValue(help[v]));
			GM_deleteValue(help[v]);
		}
	}
	GM_setValue("changedata",1);
}
// **************************************************

var all  = document.getElementsByTagName("body")[0];
var loc = reg.exec(document.location.href);
if(loc){
	var server = loc[1];
	var page = loc[2];
	var pageZusatz = loc[3];
	var candtable = document.getElementsByTagName("table");
	var nie = 2147483000; //upper limit of signed long
	var keyinteger = /(\d+)/;
	var keyinteger2 = /'(\d+)'/;
	var keyfloat = /(\d+\.\d+)/;
	var username = GM_getValue(lng+"_"+server+"_username","");
	if ($top("username")) farmname = $top("username").innerHTML;
	else farmname = GM_getValue(lng+"_"+server+"_"+username+"_farmname","");
	var prodName = new Array();
	var prodId = new Object();
	var prodTyp = new Array(); //c: Coins,v: pflanze,e: tier,u: unkraut,z: zier
	var prodBlock = new Array();
	var prodNameSort = new Array(); //only non-blocked
	var prodBestand = new Array();
	//Hofpreise
	var npc = [,0.5,1.1,1.34,2.75,3.95,8.05,17.8,18.5,,,,,,,,,0.16,0.52,1.02,1.44,1.96,2.28,3.8,3.69,,4.38,,,12.4,,3.49,5.19,8.75,6,15.63,16.88,37.5,3.9,52.44,51.75,60.25,58.13,66.19,70.7,,150,,1200,,1200,,,,,4500,,14400,1200,,,,,,4800,4200,,,,,,,,750,2100,,,,,,,,10800,12000,,1500,3300];
	//Marktpreise
	var gut = new Array();
	var gutBeob = new Array();
	var gutBeobTime = new Array();
	var valKauflimit = GM_getValue(lng+"_"+server+"_"+username+"_valKauflimit",110);
	var valStatistik = GM_getValue(lng+"_"+server+"_"+username+"_valStatistik",(lng=="de"));
	// CSS
	GM_addStyle("input:hover{background-color:#cc9!important;}");
	GM_addStyle("button:hover{background-color:#cc9!important;}");
	GM_addStyle("button:hover{background-color:#cc9!important;}");
	GM_addStyle(".headercell {border-bottom:1px dashed #f0ffef;color:#f0ffef;font-weight:bold;}");
	GM_addStyle("table.white td {color:#f0ffef!important;}");
	GM_addStyle("table.white a {color:#f0ffef!important;}");
	GM_addStyle("table.white a:hover {color:#00ddff!important;}");
	GM_addStyle("table.white tr:hover{background-color:#084200;}");
	GM_addStyle("table.hovercc9 tr:hover{background-color:#cc9;}");
	GM_addStyle("table.cellhovercc9 th:hover{background-color:#cc9;}");
	GM_addStyle("table.cellhovercc9 td:hover{background-color:#cc9;}");
	GM_addStyle("tr.hoverlightblue:hover{background-color:lightblue;}");
	GM_addStyle("th.hoverlightblue:hover{background-color:lightblue;}");
	GM_addStyle("td.hoverlightblue:hover{background-color:lightblue;}");
	GM_addStyle("tr.hovercc9:hover{background-color:#cc9;}");
	GM_addStyle("th.hovercc9:hover{background-color:#cc9;}");
	GM_addStyle("td.hovercc9:hover{background-color:#cc9;}");

// **************************************************
// Umstellung seit 09.07.
if (!(GM_getValue("changedata",0)>1)){
	var highlight = explode(GM_getValue(lng+"_"+server+"_"+username+"_highlight","{}"));
	for (var v=0;v<4;v++){ highlight[GM_getValue(lng+"_"+server+"_"+username+"_highlight"+v,"")] = "20b2aa"; }
	GM_setValue(lng+"_"+server+"_"+username+"_highlight",implode(highlight));	
	GM_deleteValue(lng+"_"+server+"_"+username+"_highlight"+v);
	GM_setValue("changedata",2);
}
// Umstellung seit 15.07.
if (!(GM_getValue("changedata",0)>2)){
	var logindata=new Array();
	try{ var help = GM_getValue("logindata");
		if (help){
			help = help.split("|");
			for (var v=0;v<help.length;v++){ 
				logindata[v] = help[v].split("~"); 
				logindata[v][4] = (logindata[v][4]=="true");
			}
		}
	} catch(err) {}
	GM_setValue("logindata",implode(logindata));
	GM_setValue("changedata",3);
}
// **************************************************
	
	var hotkeymap = explode(GM_getValue("hotkeymap",'{"prevPage":37,"nextPage":39,"farm1":49,"farm2":50,"farm3":51,"guild":52,"city1":53,"city2":54,"farmilog":70,"help":72,"market":77,"marketstand":188,"messages":78,"options":79,"profit":80,"sgh":83,"overview":85,"contract":86,"systemmessage":88}'));
	//Hotkeys
	if (GM_getValue(lng+"_"+server+"_"+username+"_valHotkey",true)){
		window.addEventListener("keydown",function(event){
			//alert(event.keyCode);
			if(event.keyCode==27){ 
				if(($top("citymaincontainer"))&&($top("citymaincontainer").style.display=="block")){ unsafeWindow.top.initCity(1); event.preventDefault();}
				else { unsafeWindow.top.showMain(); event.preventDefault();}
			} // Esc
			if (event.altKey){
			switch (event.keyCode) {
			case hotkeymap["prevPage"]: if(($top("ackerNavi"))&&($top("ackerNavi").firstChild)){ click($top("ackerNavi").firstChild); event.preventDefault();}
					if(($top("zoneNavi"))&&($top("zoneNavi").firstChild)){ click($top("zoneNavi").firstChild); event.preventDefault();}
					if($top("prevPage")){ click($top("prevPage")); event.preventDefault();}
			break;
			case hotkeymap["nextPage"]: if(($top("ackerNavi"))&&($top("ackerNavi").lastChild)){ click($top("ackerNavi").lastChild); event.preventDefault();}
					if(($top("zoneNavi"))&&($top("zoneNavi").lastChild)){ click($top("zoneNavi").lastChild); event.preventDefault();}
					if($top("nextPage")){ click($top("nextPage")); event.preventDefault();} 
			break;
			case hotkeymap["farm1"]: unsafeWindow.top.initZones(1); unsafeWindow.top.showMain(); event.preventDefault(); break; // 1:Farm 1
			case hotkeymap["farm2"]: if(parseInt(unsafeWindow.top.farmamount,10)>1){ unsafeWindow.top.initZones(2); unsafeWindow.top.showMain(); event.preventDefault(); } break; // 2:Farm 2
			case hotkeymap["farm3"]: if(parseInt(unsafeWindow.top.farmamount,10)>2){ unsafeWindow.top.initZones(3); unsafeWindow.top.showMain(); event.preventDefault(); } break; // 3:Farm 3
			case hotkeymap["guild"]: unsafeWindow.top.showMain(); unsafeWindow.top.initGuild(); event.preventDefault(); break; // 4:Club
			case hotkeymap["city1"]: 
				if($top("citylineitem1")){ click($top("citylineitem1")); }
				else {
					if($top("citymaincontainer").style.display=="block"){
						if($top("cityzone_2_3")){ click($top("cityzone_2_3")); }
					} else {
						click($top("menueimg0"));
					}
				}
				event.preventDefault(); break; // 5:Dorf1
			case hotkeymap["city2"]: 
				if($top("citylineitem2")){ click($top("citylineitem2")); }
				else {
					if($top("citymaincontainer").style.display=="block"){
						if($top("cityzone_1_9")){ click($top("cityzone_1_9")); }
					} else {
						click($top("menueimg0"));
						gotocitytimeout = window.setInterval(function(){
							if($top("cityzone_1_9")){ 
								click($top("cityzone_1_9")); 
								clearTimeout(gotocitytimeout);
							}
						},200);
					}
				}
				event.preventDefault(); break; // 6:Dorf2
			case hotkeymap["farmilog"]: click($top("customerstats")); event.preventDefault(); break; // F:FarmiLog
			case hotkeymap["help"]: click($top("menueimg4")); event.preventDefault(); break; // H:Hilfe
			case hotkeymap["market"]: showMarket(); event.preventDefault(); break; // M:Markt
			case hotkeymap["marketstand"]: showMarketStand(); event.preventDefault(); break; // ,:Marktstand
			case hotkeymap["messages"]: click($top("menueimg1")); event.preventDefault(); break; // N:Nachrichten
			case hotkeymap["options"]: click($top("berateroptionen")); event.preventDefault(); break; // O:Optionen
			case hotkeymap["profit"]: click($top("profitcalc")); event.preventDefault(); break; // P:Profit
			case hotkeymap["sgh"]: showSGH(); event.preventDefault(); break; // S:SGH
			case hotkeymap["overview"]: click($top("titlepig")); event.preventDefault(); break; // U:Uebersicht
			case hotkeymap["contract"]: click($top("menueimg2")); event.preventDefault(); break; // V:Vertrag
			case hotkeymap["systemmessage"]: if (GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doread","")){
						var help = GM_getValue(lng+"_"+server+"_"+username+"_nachrichten_doread","").split("|");
						showMessage("system","1",help[help.length-1],0);
					} else {
						showPage("nachrichten/system.php");
					} event.preventDefault(); break; // X:next Message/Systemmessages
			}
			}
		},false);
	}

	switch (page) {
		case "stadt/markt":			do_markt();break;
		case "stadt/marktstand":	do_marktstand();break;
		case "stadt/stats":			do_stats();break;
		case "stadt/wettbewerb":	do_wettbewerb();break;
		case "main":				do_main();break;
		case "nachrichten/read":	do_blende();do_nachrichten_read();break;
		case "nachrichten/new":		do_blende();do_nachrichten_new();break;
		case "nachrichten/inbox":	do_blende();do_nachrichten_inbox();break;
		case "nachrichten/outbox":	do_blende();do_nachrichten_outbox();break;
		case "nachrichten/contact":	do_blende();do_nachrichten_contact();break;
		case "nachrichten/system":	do_blende();do_nachrichten_system();break;
		case "vertraege/new":		do_blende();do_vertraege_head();do_vertraege_new();break;
		case "vertraege/overview":	do_blende();do_vertraege_head();do_vertraege_overview();break;
		case "vertraege/show":		do_blende();do_vertraege_head();do_vertraege_show();break;
		case "nutzer/profil":		do_blende();break;
		case "nutzer/usecoins":		do_blende();break;
		case "payment":				do_blende();break;
		case "hilfe":				do_blende();do_hilfe();break;
	}
} else do_login();

},false);
