// ==UserScript==
// @name           Extended Navigation || DEV-VERSION
// @namespace      de
// @description    Navigation mal ganz anders...
// @include        http://www.itycoon2.de/*
// @exclude        http://chat.beta.itycoon2.de/*
// @author         eXidys
// @version        r19112010 BETA 0059 (Snowfall)
// @date           11-19-2010
// ==/UserScript==

// //////////////////// //
// Skript-Konfiguration //
// //////////////////// //

// Array der Hauptnavi, Sortierung kann geändert werden durch verschieben der einzelnen Elemente miteinander
var main_navi = new Array("trade","building","company","tycoon","help","logout");
// Array der Subnavi vom Reiter "Handel", Sortierung kann geändert werden durch verschieben der einzelnen Elemente miteinander
var sub_1 = new Array("index_tr","market","mail","town","organizer");
// Array der Subnavi vom Reiter "Unternehmen", Sortierung kann geändert werden durch verschieben der einzelnen Elemente miteinander
var sub_2 = new Array("index_c","building_c","financial_c","brands_licenses","settings_c");
// Array der Subnavi vom Reiter "Tycoon", Sortierung kann geändert werden durch verschieben der einzelnen Elemente miteinander
var sub_3 = new Array("index_ty","financial_t","skills","award","settings_t");

var scroll_timer = 10;		// Je kleiner der Wert desto schneller scrollt die Navi

// Wert "0" bedeutet deaktiviert
// Wert "1" bedeutet aktiviert

// Hauptnavi
var sort_trade = 1;				// Handel
var sort_company = 1;			// Unternehmen
var sort_tycoon = 1;			// Tycoon
var sort_building = 1;			// Gebäude
var sort_help = 1;				// Hilfe -- Einstellung in Abhängigkeit von den Einstellungen im Benutzerkonto, trotz aktivierter Hilfe ist es möglich über diese Einstellung diese auszublenden
var sort_logout = 1;			// Logout


// Sub-Navi Links "Handel"
var sort_index_tr = 1;			// Zentrale (bzw. Index-Seite)
var sort_market = 1;			// Handelsplatz bzw. Lagerverkauf
var sort_mail = 1;				// Post
var sort_town = 1;				// Stadt
var sort_organizer = 1;			// Organizer

// Sub-Navi Links "Unternehmen"
var sort_index_c = 1;			// Übersicht
var sort_building_c = 1;		// Gebäude
var sort_financial_c = 1;		// Finanzen
var sort_brands_licenses = 1;	// Marken und Lizenzen
var sort_settings_c = 1;		// Einstellungen

// Sub-Navi Links "Tycoon"
var sort_index_ty = 1;			// Übersicht
var sort_financial_t = 1;		// Finanzen
var sort_skills = 1;			// Fähigkeiten
var sort_award = 1;				// Auszeichnungen
var sort_settings_t = 1;		// Einstellungen

// ##################################### //
// NACHFOLGENDEN CODE NICHT MODIFIZIEREN //
// ##################################### //

// ///////////////////////////////////////// //
// Array mit den Definitionen der Verlinkung //        // Array ist notwendig um auf eventuelle Layout Veränderungen zu reagieren
// ///////////////////////////////////////// //
var def_array = new Array();
def_array[0] = new Object();	def_array[0]["name"] = "trade";				def_array[0]["href"] = "/";						def_array[0]["img_alt"] = "Coins";			def_array[0]["img_src"] = "coins.png";			def_array[0]["text"] = "Handel";
def_array[1] = new Object();	def_array[1]["name"] = "building";			def_array[1]["href"] = "/building";				def_array[1]["img_alt"] = "Building";		def_array[1]["img_src"] = "building.png";		def_array[1]["text"] = "Gebäude";
def_array[2] = new Object();	def_array[2]["name"] = "company";			def_array[2]["href"] = "/company";				def_array[2]["img_alt"] = "World";			def_array[2]["img_src"] = "world.png";			def_array[2]["text"] = "Unternehmen";
def_array[3] = new Object();	def_array[3]["name"] = "tycoon";			def_array[3]["href"] = "/avatar";				def_array[3]["img_alt"] = "User_suit";		def_array[3]["img_src"] = "user_suit.png";		def_array[3]["text"] = "Tycoon";
def_array[4] = new Object();	def_array[4]["name"] = "help";				def_array[4]["href"] = "";						def_array[4]["img_alt"] = "Help";			def_array[4]["img_src"] = "help.png";			def_array[4]["text"] = "Hilfe verfügbar";
def_array[5] = new Object();	def_array[5]["name"] = "logout";			def_array[5]["href"] = "/login/logout";			def_array[5]["img_alt"] = "Lock";			def_array[5]["img_src"] = "lock.png";			def_array[5]["text"] = "";
def_array[6] = new Object();	def_array[6]["name"] = "index_tr";			def_array[6]["href"] = "/";						def_array[6]["img_alt"] = "Computer";		def_array[6]["img_src"] = "computer.png";		def_array[6]["text"] = "Zentrale";
def_array[7] = new Object();	def_array[7]["name"] = "market";			def_array[7]["href"] = "/direct_sale";			def_array[7]["img_alt"] = "Coins";			def_array[7]["img_src"] = "coins.png";			def_array[7]["text"] = "Handelsplatz";
def_array[8] = new Object();	def_array[8]["name"] = "mail";				def_array[8]["href"] = "/message";				def_array[8]["img_alt"] = "Email";			def_array[8]["img_src"] = "email.png";			def_array[8]["text"] = "Post";
def_array[9] = new Object();	def_array[9]["name"] = "town";				def_array[9]["href"] = "/town";					def_array[9]["img_alt"] = "Map";			def_array[9]["img_src"] = "map.png";			def_array[9]["text"] = "Stadt";
def_array[10] = new Object();	def_array[10]["name"] = "organizer";		def_array[10]["href"] = "/organizer";			def_array[10]["img_alt"] = "Book";			def_array[10]["img_src"] = "book.png";			def_array[10]["text"] = "Organizer";
def_array[11] = new Object();	def_array[11]["name"] = "index_c";			def_array[11]["href"] = "/company";				def_array[11]["img_alt"] = "World";			def_array[11]["img_src"] = "world.png";			def_array[11]["text"] = "Übersicht";
def_array[12] = new Object();	def_array[12]["name"] = "building_c";		def_array[12]["href"] = "/building";			def_array[12]["img_alt"] = "Building";		def_array[12]["img_src"] = "building.png";		def_array[12]["text"] = "Gebäude";
def_array[13] = new Object();	def_array[13]["name"] = "financial_c";		def_array[13]["href"] = "/financial";			def_array[13]["img_alt"] = "Money_euro";	def_array[13]["img_src"] = "money_euro.png";	def_array[13]["text"] = "Finanzen";
def_array[14] = new Object();	def_array[14]["name"] = "brands_licenses";	def_array[14]["href"] = "/label";				def_array[14]["img_alt"] = "Tag_blue";		def_array[14]["img_src"] = "tag_blue.png";		def_array[14]["text"] = "Marken und Lizenzen";
def_array[15] = new Object();	def_array[15]["name"] = "settings_c";		def_array[15]["href"] = "/company/settings";	def_array[15]["img_alt"] = "Cog";			def_array[15]["img_src"] = "cog.png";			def_array[15]["text"] = "Einstellungen";
def_array[16] = new Object();	def_array[16]["name"] = "index_ty";			def_array[16]["href"] = "/avatar";				def_array[16]["img_alt"] = "User_Suit";		def_array[16]["img_src"] = "user_suit.png";		def_array[16]["text"] = "Übersicht";
def_array[17] = new Object();	def_array[17]["name"] = "financial_t";		def_array[17]["href"] = "/avatar/financial";	def_array[17]["img_alt"] = "Money_euro";	def_array[17]["img_src"] = "money_euro.png";	def_array[17]["text"] = "Finanzen";
def_array[18] = new Object();	def_array[18]["name"] = "skills";			def_array[18]["href"] = "/skills";				def_array[18]["img_alt"] = "Page_lightning";def_array[18]["img_src"] = "page_lightning.png";def_array[18]["text"] = "Fähigkeiten";
def_array[19] = new Object();	def_array[19]["name"] = "award";			def_array[19]["href"] = "/award";				def_array[19]["img_alt"] = "Medal_gold_1";	def_array[19]["img_src"] = "medal_gold_1.png";	def_array[19]["text"] = "Auszeichnungen";
def_array[20] = new Object();	def_array[20]["name"] = "settings_t";		def_array[20]["href"] = "/avatar/settings";		def_array[20]["img_alt"] = "Cog";			def_array[20]["img_src"] = "cog.png";			def_array[20]["text"] = "Einstellungen";

// //////////////////////////////////// //
// Ersetzen des Finanzlinks beim Tycoon //
// //////////////////////////////////// //
	
document.getElementsByClassName("data_money")[0].getElementsByTagName("a")[0].setAttribute("href", "/avatar/financial");

// ////////////////// //
// Positionserkennung //
// ////////////////// //

var div_position = document.getElementById("navigation");
var div_position_sub = document.getElementById("subnavigation");
var position = document.getElementsByClassName("content")[0];  // Positionsermittlung, Elternknoten
var clear = document.getElementsByClassName("content")[0].getElementsByClassName("clear")[0];  // Positionsermittlung, Element Maximalpreis

// /////////////////// //
// Erkennung der Hilfe //
// /////////////////// //

// Überprüfen ob Hilfe vorhanden, sowie erkennen welche Hilfe genau
var check_help = div_position.getElementsByTagName("ul")[0].getElementsByTagName("li")[3];			// Überprüfen der Anzahl der Links in der Haupt-Navigation
var help_href = 0;
if(check_help!=null) {
	var help_href = check_help.getElementsByTagName("a")[0].getAttribute("href");
}

// ///////////////////////// //
// Funktion Elemente Löschen //
// ///////////////////////// //
function del_elem(param) {
	var del = param.parentNode;
	del.removeChild(param);
}
del_elem(div_position);
del_elem(div_position_sub);
del_elem(clear);
var position_insert = document.getElementsByClassName("content")[0].firstChild;  // Positionsermittlung, Element Maximalpreis

// /////////////////////// //
// Neue Navigation erzeugen //
// /////////////////////// //

/*html_code.innerHTML = "<span class=\"label\">Preisrechner (Min. "+ min_per +"%):</span><form name=\"calculator\" id=\"calculator\"><input name=\"calculator_in\" type=\"text\" maxlength=\"5\" size=\"2\" id=\"calculator_in\" /> % <input class=\"submit\" type=\"button\" value=\"Berechnen\" onclick=\"window.per_input(document.calculator.calculator_in.value);\" /></form>";
position.insertBefore(html_code, position);
*/
var div= document.createElement("div");
/*	div.setAttribute ("id", "basic-accordian");
	div.setAttribute ("style", "width:100%;");
*/	div.innerHTML = "<div id=\"basic-accordian\" style=\"width:100%;\"><div class=\"tab_container\" style=\"width:100%;\"><div id=\"navigation\">";

for (var r = 0; r < 4 ; r++) {
	if(r==0) {
		var sel_array = main_navi;
	} else if(r >= 1 && r < 4) {
		var sel_array = eval("sub_"+r+"");
	};
	for (var i = 0; i < sel_array.length ; i++) {		// Erste Schleife | Abfrage der Sortierung der Menüs
		var eval_sort = eval("sort_"+sel_array[i]+"");	// Variable draus generieren um den Status abzufragen
		if(eval_sort == 1) {							// Bei Übereinstimmung gehts weiter.... Ansonsten wird versucht den nächsten aktiven Menüpunkt zu finden
			def_array_for:for (var n = 0; n < def_array.length; n++) {	// Auflistung des Definitions-Arrays
				def_array_for_in:for (var arg in def_array[n]) {		// For-In Schleife um alle Werte abzufragen
					if(sel_array[i]==def_array[n][arg]) {				// auf Gleichheit des Menüpunktes und der Definition prüfen Wert "name" wird als Vergleich benutzt
						if(r==0) {
							//position = div_position; // Position Hauptnavi
							if(sel_array[i] == "trade") {
								div.innerHTML += "<div id=\"main1-header\" class=\"navigation\" style=\"float:left;\"><img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" /> "+def_array[n]["text"]+"</div>";
							} else if(sel_array[i] == "company") {
								div.innerHTML += "<div id=\"main2-header\" class=\"navigation\" style=\"float:left;\"><img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" /> "+def_array[n]["text"]+"</div>";
							} else if(sel_array[i] == "tycoon") {
								div.innerHTML += "<div id=\"main3-header\" class=\"navigation\" style=\"float:left;\"><img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" /> "+def_array[n]["text"]+"</div>";
							} else if(sel_array[i] == "help" && help_href!=0) {
								div.innerHTML += "<div id=\"\" class=\"navigation help\" style=\"float:left;\"><a href=\""+help_href+"\" onclick=\"window.open(this.href,'help','height=500, width=500, scrollbars=yes');return false;\" title=\""+def_array[n]["text"]+"\">&nbsp;<img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;</div>";
							} else if(sel_array[i] == "logout") {
								div.innerHTML += "<div id=\"\" class=\"navigation help\" style=\"float:left;\"><a href=\""+def_array[n]["href"]+"\" title=\""+def_array[n]["text"]+"\">&nbsp;<img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;</div>";
							} else {
								if(sel_array[i] != "help") {
									div.innerHTML += "<div id=\"\" class=\"navigation\" style=\"float:left;\"><a href=\""+def_array[n]["href"]+"\" title=\"\"><img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;"+def_array[n]["text"]+"</a></div>";
								};
							};
						} else {
/*							position = div_position_sub;	// Position Subnavi
							// Menülink erzeugen
							var menulink = document.createElement("a");
							menulink.href = def_array[n]["href"];
							menulink.innerHTML = "<img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;"+def_array[n]["text"]+"&nbsp;";
							// li-Element erzeugen
							var li = document.createElement("li");
							if(main_navi[i]=="help" || main_navi[i] == "logout") { li.className = "help"; };		// Logout und Hilfe richtig anzeigen
							li.appendChild(menulink);
						*/};

				/*		// Menüpunkt einfügen
						// position.appendChild(li);
						break def_array_for_in;							// Schleife sofort abbrechen7
						if(r==0) {
							position = div_position; // Position Hauptnavi
							div.innerHTML = "<div id=\"basic-accordian\" style=\"width:100%;\"><div class=\"tab_container\" style=\"width:100%;\"><div id=\"navigation\">";

							if(sel_array[i] == "trade" || sel_array[i] == "company" || sel_array[i] == "tycoon") {
								var menulink = document.createElement("div");
							};
							if(sel_array[i] == "trade") {
								menulink.setAttribute("id", "test-header");
							} else if(sel_array[i] == "company") {
								menulink.setAttribute("id", "test1-header");
							} else if(sel_array[i] == "tycoon") {
								menulink.setAttribute("id", "test2-header");
							} else {
								var menulink = document.createElement("a");
								menulink.href = def_array[n]["href"];
								if(main_navi[i]=="help" || main_navi[i] == "logout") { menulink.className = "help"; };		// Logout und Hilfe richtig anzeigen
								menulink.setAttribute("accesskey", n);
							};
							menulink.innerHTML = "<img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;"+def_array[n]["text"]+"&nbsp;";
							// li-Element erzeugen
							var li = document.createElement("li");
							if(main_navi[i]=="help" || main_navi[i] == "logout") { li.className = "help"; };		// Logout und Hilfe richtig anzeigen
							li.appendChild(menulink);
						} else {
							position = div_position_sub;	// Position Subnavi
							// Menülink erzeugen
							var menulink = document.createElement("a");
							menulink.href = def_array[n]["href"];
							menulink.innerHTML = "<img alt=\""+def_array[n]["img_alt"]+"\" border=\"false\" class=\"icon\" src=\"/images/icons/"+def_array[n]["img_src"]+"\" title=\"\" />&nbsp;"+def_array[n]["text"]+"&nbsp;";
							// li-Element erzeugen
							var li = document.createElement("li");
							if(main_navi[i]=="help" || main_navi[i] == "logout") { li.className = "help"; };		// Logout und Hilfe richtig anzeigen
							li.appendChild(menulink);
						};
						// Menüpunkt einfügen
						// position.appendChild(li);
						break def_array_for_in;							// Schleife sofort abbrechen7
*/
					};
				};
			};
/*			var ul = document.createElement("ul");
			if(r==0) { ul.className = "navigation"; }
			else if(r>=1 && r<4) { ul.className = "subnavigation"; };
			ul.appendChild(li);
			if(r>=1 &&r<4) {
				var div = document.createElement("div");
				if(r==1) {
					div.setAttribute("id", "test-content");
				} else if(r==2) {
					div.setAttribute("id", "test1-content");
				} else if(r==3) {
					div.setAttribute("id", "test2-content");
				};
				div.appendChild(ul);
				position.appendChild(div);
			};
			// Menüpunkt einfügen
			if(r==0) { position.appendChild(ul); };*/
		};
	};
};
							div.innerHTML +="<div class=\"clear\"></div></div></div>";
							div.innerHTML +="                <div style=\"float:left; width:100%;\">";
                 div.innerHTML +=" <div id=\"main1-content\">";
                    div.innerHTML +="<div class=\"accordion_child\">";
                        div.innerHTML +="<div style=\"padding: 4px; background-image: url(\"http://www.itycoon2.de/images/content_bg_q.png\");\">";
                            div.innerHTML +="<div style=\"padding:2px; height: 32px; background: transparent url(\"http://www.itycoon2.de/images/box_bg_q.png\"); text-transform: uppercase; font-size: 13px;\">";
                                div.innerHTML +="<ul style=\"text-decoration: none;  list-style-type: none; padding: 0; margin: 6px 0 0 0;\">";
                                    div.innerHTML +="<li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Computer\" border=\"false\" class=\"icon\" src=\"/images/icons/computer.png\" title=\"\" /> <a href=\"/\">Zentrale</a></li>";
                                    div.innerHTML +="<li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Coins\" border=\"false\" class=\"icon\" src=\"/images/icons/coins.png\" title=\"\" /> <a href=\"/direct_sale\">Handelsplatz</a></li>";
                                   div.innerHTML +=" <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Email\" border=\"false\" class=\"icon\" src=\"/images/icons/email.png\" title=\"\" /> <a href=\"/message\">Post</a></li>";
                                   div.innerHTML +=" <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Map\" border=\"false\" class=\"icon\" src=\"/images/icons/map.png\" title=\"\" /> <a href=\"/town\">Stadt</a></li>";
                              div.innerHTML +="  </ul>";
                           div.innerHTML +=" </div>";
                      div.innerHTML +="  </div>";
                   div.innerHTML +="     <div class=\"clear\"></div>";
                  div.innerHTML +="  </div>";
               div.innerHTML +="   </div>";
               div.innerHTML +="   <div id=\"main2-content\" style=\"width:100%;\">";
                div.innerHTML +="    <div class=\"accordion_child\">";
                    div.innerHTML +="    <div class=\"body_2\" style=\"padding: 4px; background-image: url(\"http://www.itycoon2.de/images/content_bg_q.png\");\">";
                        div.innerHTML +="    <div style=\"padding:2px; height: 32px; background: transparent url(\"http://www.itycoon2.de/images/box_bg_q.png\"); text-transform: uppercase; font-size: 13px;\">";
                           div.innerHTML +="     <ul style=\"text-decoration: none;  list-style-type: none; padding: 0; margin: 6px 0 0 0;\">";
                             div.innerHTML +="       <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"World\" class=\"icon\" src=\"/images/icons/world.png\" title=\"\" border=\"false\"> <a href=\"http://www.itycoon2.de/company\">Übersicht</a></li>";
                              div.innerHTML +="      <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><a href=\"http://www.itycoon2.de/building\" accesskey=\"5\"><img alt=\"Building\" class=\"icon\" src=\"/images/icons/building.png\" title=\"\" border=\"false\"> Gebäude</a></li>";
                               div.innerHTML +="     <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Money_euro\" class=\"icon\" src=\"/images/icons/money_euro.png\" title=\"\" border=\"false\"> <a href=\"http://www.itycoon2.de/financial\">Finanzen</a></li>";
                                 div.innerHTML +="   <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Tag_blue\" class=\"icon\" src=\"/images/icons/tag_blue.png\" title=\"\" border=\"false\"> <a href=\"http://www.itycoon2.de/label\">Marken &amp; Lizenzen</a></li>";
                                 div.innerHTML +="   <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Cog\" class=\"icon\" src=\"/images/icons/cog.png\" title=\"\" border=\"false\"> <a href=\"http://www.itycoon2.de/company/settings\">Einstellungen</a></li>";
                              div.innerHTML +="  </ul>";
                           div.innerHTML +=" </div>";
                      div.innerHTML +="  </div>";
                     div.innerHTML +="   <div class=\"clear\"></div>";
                   div.innerHTML +=" </div>";
                div.innerHTML +="  </div>";
                div.innerHTML +="  <div id=\"main3-content\" style=\"width:100%;\">";
                div.innerHTML +="    <div class=\"accordion_child\">";
                 div.innerHTML +="       <div style=\"padding: 4px; background-image: url(\"http://www.itycoon2.de/images/content_bg_q.png\");\">";
                    div.innerHTML +="        <div style=\"padding:2px; height: 32px; background: transparent url(\"http://www.itycoon2.de/images/box_bg_q.png\"); text-transform: uppercase; font-size: 13px;\">";
                      div.innerHTML +="          <ul style=\"text-decoration: none;  list-style-type: none; padding: 0; margin: 6px 0 0 0;\">";
                         div.innerHTML +="           <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"User_suit\" border=\"false\" class=\"icon\" src=\"/images/icons/user_suit.png\" title=\"\" /> <a href=\"/avatar\">Übersicht</a></li>";
                           div.innerHTML +="         <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Money_euro\" border=\"false\" class=\"icon\" src=\"/images/icons/money_euro.png\" title=\"\" /> <a href=\"/avatar/financial\">Finanzen</a></li>";
                         div.innerHTML +="           <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Page_lightning\" border=\"false\" class=\"icon\" src=\"/images/icons/page_lightning.png\" title=\"\" /> <a href=\"/skills\">Fähigkeiten</a></li>";
                           div.innerHTML +="         <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Medal_gold_1\" border=\"false\" class=\"icon\" src=\"/images/icons/medal_gold_1.png\" title=\"\" /> <a href=\"/award\">Auszeichnungen</a></li>";
                          div.innerHTML +="          <li style=\"display: block; float: left; padding: 2px;  margin-left: 5px;padding-bottom: 4px;\"><img alt=\"Cog\" border=\"false\" class=\"icon\" src=\"/images/icons/cog.png\" title=\"\" /> <a href=\"/avatar/settings\">Einstellungen</a></li>";
                         div.innerHTML +="       </ul>";
                       div.innerHTML +="     </div>";

                     div.innerHTML +="   </div>";
                    div.innerHTML +="    <div class=\"clear\"></div>";
                  div.innerHTML +="  </div>";
                div.innerHTML +="  </div>";
              div.innerHTML +="  </div>";
//							div.innerHTML +="</div>";
						position.insertBefore(div, position_insert);

function newCSS () {
  for (var i = 0; i < window.document.getElementsByClassName("body_2").length; i++) {
    window.document.getElementsByClassName("body_2")[i].style.backgroundImage = "../images/content_bg_q.png";
    window.document.getElementsByClassName("body_2")[i].style.padding = "4px";
  };
};
newCSS();
//document.getElementsByClassName("body").style.removeAttribute("min-height", false);
//document.getElementsByClassName("body").style.removeAttribute("_height", false);

// ////////////// //
// Accordian-Menu //
// ////////////// //
document.body.setAttribute("onload", "window.new Accordian('basic-accordian',"+scroll_timer+",'header_highlight');");
unsafeWindow.Accordian = Accordian;
//window.onload = new Accordian("basic-accordian", scroll_timer,"main_active"); //,'header_highlight'

/*
DezinerFolio.com Simple Accordians.

Author  : G.S.Navin Raj Kumar
Website : http://dezinerfolio.com

*/
function $(d){ return document.getElementById(d); };
function dsp(d,v){ if(v==undefined){ return d.style.display; }else{ d.style.display=v; }; };
function sh(d,v){ if(v==undefined){ if(dsp(d)!='none'&& dsp(d)!=''){ return d.offsetHeight; }; viz = d.style.visibility; d.style.visibility = 'hidden'; o = dsp(d); dsp(d,'block'); r = parseInt(d.offsetHeight); dsp(d,o); d.style.visibility = viz; return r; }else{ d.style.height=v; }; };
/* Variable 'S' defines the speed of the accordian || Variable 'T' defines the refresh rate of the accordian */
s=7; t=10;
function ct(d){ d = $(d); if(sh(d)>0){ v = Math.round(sh(d)/d.s); v = (v<1) ? 1 :v ; v = (sh(d)-v); sh(d,v+'px'); d.style.opacity = (v/d.maxh); d.style.filter= 'alpha(opacity='+(v*100/d.maxh)+');'; }else{ sh(d,0); dsp(d,'none'); clearInterval(d.t); }; };
function et(d){ d = $(d); if(sh(d)<d.maxh){ v = Math.round((d.maxh-sh(d))/d.s); v = (v<1) ? 1 :v ; v = (sh(d)+v); sh(d,v+'px'); d.style.opacity = (v/d.maxh); d.style.filter= 'alpha(opacity='+(v*100/d.maxh)+');'; }else{ sh(d,d.maxh); clearInterval(d.t); }; };
function cl(d){ if(dsp(d)=='block'){ clearInterval(d.t); d.t=setInterval('ct("'+d.id+'")',t); }; };
function ex(d){ if(dsp(d)=='none'){ dsp(d,'block'); d.style.height='0px'; clearInterval(d.t); d.t=setInterval('et("'+d.id+'")',t); }; };
function cc(n,v){ s=n.className.split(/\s+/); for(p=0;p<s.length;p++){ if(s[p]==v+n.tc){ s.splice(p,1); n.className=s.join(' '); break; }; }; };
function Accordian(d,s,tc){ l=$(d).getElementsByTagName('div'); c=[]; for(i=0;i<l.length;i++){ h=l[i].id; if(h.substr(h.indexOf('-')+1,h.length)=='content'){c.push(h);}; }; sel=null; for(i=0;i<l.length;i++){ h=l[i].id; if(h.substr(h.indexOf('-')+1,h.length)=='header'){ d=$(h.substr(0,h.indexOf('-'))+'-content'); d.style.display='none'; d.style.overflow='hidden'; d.maxh =sh(d); d.s=(s==undefined)? 7 : s; h=$(h); h.tc=tc; h.c=c; h.onclick = function(){ for(i=0;i<this.c.length;i++){ cn=this.c[i]; n=cn.substr(0,cn.indexOf('-')); if((n+'-header')==this.id){ ex($(n+'-content')); n=$(n+'-header'); cc(n,'__'); n.className=n.className+' '+n.tc; }else{ cl($(n+'-content')); cc($(n+'-header'),''); }; }; }; if(h.className.match(/selected+/)!=undefined){ sel=h; }; }; }; if(sel!=undefined){sel.onclick();}; };

// ////////////////// //
// END ACCORDIAN-MENU //
// ////////////////// //

/*
Below is the snippet to control the accordion.
<body onload=”new Accrodian(’my-menu’,5,’heighlight’);”>

which is in form of:
<body onload=”new Accordian(’container of your accordion’,speed,’highlighted accordion class name’);”>
*/