// ==UserScript==
          // @name         Pennerbar seitenmenue berlin by basti1012 versin 1.3 einstellbare farben und Position
          // @namespace    Autor: zeigt ein menue am rand man sieht alles an daten was man wissen muss.Version fuer berlin. ab den 5.5.2009 ein neues menue 2 in 1 beide penner in ein menue besere kontrolle ohne hin und her gezeppe  recht links wahl
          // @author	 http://basti1012.okbb.de/forum.html    neue adresse ab juni
          // @homepage	 http://pennergame-basti1012.foren-city.de/  
          // @description  Fuegt ein infpormations menue am rand ein wird alles angezeigt was man ueber sein penner wissen muss _____multi script fuer beide penner in ein script ist in bau__________________
          // @include      *berlin.pennergame.de*
          // @exclude      *w.pennergame.de*
          // ==UserScript==
          // --------------menueoptionen-------------------------------------------
          //Hintergrundfarbe (#1006F8)
          var MenueBG = GM_getValue("MenueBGColorIn");       // muss in englisch geschrieben sein oder hex zahlen
          if (MenueBG == null){MenueBG = "black";};
          
          //Border Farbe (#99B200)
          var BorderColor = GM_getValue("MenueBorderColorIn");     // muss in englisch geschrieben sein oder hex zahlen
          if (BorderColor == null){BorderColor = "blue";};
          
          //position von Oben (in Pixel) (100)
          var MenueTop = GM_getValue("MenueTopIn");       // in pixel 10 pixel ca 0,5 milimeter
          if (MenueTop == null){MenueTop = "10";};
          
          //position von links (in Pixel) (4)
          var MenueLeft = GM_getValue("MenueLeftIn");    // in pixel 10 pixel ca 0,5 milimeter
          if (MenueLeft == null){MenueLeft = "10";};
          
          //Borderbreite (in Pixel)
          var BorderSize = GM_getValue("MenueBorderSizeIn");       // in pixel 10 pixel ca 0,5 milimeter
          if (BorderSize == null){BorderSize = "10";};
          
          //infoschrift (#1006F8)
          var SchriftBG = GM_getValue("MenueBGschriftIn");       // muss in englisch geschrieben sein oder hex zahlen
          if (SchriftBG == null){SchriftBG = "green";};
          
          //Ergebnisschrift (#1006F8)
          var SBG = GM_getValue("MenueBGergebnisschriftIn");        // muss in englisch geschrieben sein oder hex zahlen
          if (SBG == null){SBG = "red";};
          
          //Rechtslinks (#1006F8)
          var RL = GM_getValue("MenueBGrechtslinksIn");            // left oder right sonst geht es nicht
          if (RL == null){RL = "left";};
          
          //Transparent (#1006F8)
          var Tran = GM_getValue("MenueBGtranIn");          // transparent minimum 0.4 eingeben nie wenniger nach speichern konnte das menue so transparent sein das ihr es nicht mehr sieht eine enderung geht dann nur noch im script
          if (Tran == null){Tran = "0.8";};
          
          // ----------------- Farben auswahl -----------------
          // Ihr koennt waehlen zwischen hex codes oder normale englischer farb eingabe aussuchen,bei hex codes drauf achten das es die auch gibt fuer unerfahrene kann ich die englische art empfehlen also hier die moeglich keiten
          // yellow
          // blue         //die hex codes fangen mit # an und haben danach ein 6 steligen zahlen und buchstaben code
          // red          // 5.5.2009 neue version fuer berlin und hamburg 2 in 1 beide penner in ein menue zu vollen kontrolle immer in sicht was los ist   
          // black
          // whitw
          // ja oder hex codes die findet man im internet zb unter  http://www.frank-schlotterbeck.de/seite1.htm   da koent ihr die faben aussuchen und kriegt den hex-code dann
          // -----------------------------------------------------------------------------------------------------------------------------
          //_______________________________Wichtig!!!!!!!!!!!!!!_____________--Wichtig ab hier nix mehr endern nur wer weiss was er tut_---MFG basti1012
          GM_xmlhttpRequest({    // Penner details abfragen 
            method: 'GET',
            url: "http://berlin.pennergame.de/overview/",
                onload: function( response ) {
                var content = response.responseText;
                var skill = content.split('<li><span class="att">')[1].split('</span> ATT</li>')[0];
                var skill1 = content.split('<li><span class="def">')[1].split('</span> DEF</li>')[0];
                var skill2 = content.split('<li><span class="mitleid">')[1].split('</span>  Mitleid</li>')[0];
                var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
                var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
                var att = content.split('<span class="att">')[1].split('</span>')[0];
                var def = content.split('<span class="def">')[1].split('</span>')[0];
                var platz = content.split('<span class="v">')[1].split('</span>')[0];
                var geld = content.split('<span class="v">')[2].split('</span>')[0];
                var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
                var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
                var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
          	  var kurs = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1].split('</span> Cent</a>')[0];
          	var Alk = prom2
          	var Benoetigtprozent = 299 - Alk;
          	var Benoetigtbier = Math.floor(Benoetigtprozent/35);
          	var Benoetigtbrot = Math.ceil(Alk/35);
          
          GM_xmlhttpRequest({   // bandenid und namen
                method: 'GET',
                url: 'http://berlin.pennergame.de/dev/api/user.'+userid+'.xml',
                onload: function(responseDetails) {
                     var content = responseDetails.responseText;
                   var bandenid = content.split('<id>')[2].split('</id>')[0];
                   var bandenname = content.split('<name>')[2].split('</name>')[0];
                   var hs2 = content.split('<points>')[1].split('</points>')[0];
          
          GM_xmlhttpRequest({   // att minimum und maximim abfrage
          	method: 'GET',
          	url: "http://berlin.pennergame.de/fight/overview/",
          		onload: function( response ) {
          		var lf = response.responseText;
          		var attmin = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
          		var attmax = lf.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
          
          var hslink = 'http://berlin.pennergame.de/highscore/range/?max_points='+attmax+'&min_points='+attmin+'&serverload=low'
          var maxspenden = "<span style=\"color:"+SchriftBG+"\"><big><b>10</b></big></span>" //hier kann man die spenden hoehe einstellen zur teit sind es 10
          if (spendenbisherpur>9) {
           var spendenbisher = "<span style=\"color:red\"><big><b>"+spendenbisherpur+"</b></big></span>";
          }
           else {
           var spendenbisher = spendenbisherpur;
          } 
          var maxflaschen = "1"
          // Menuekette das was angezeigt wird // hier wird die hauptkette fuer das menue zusammen gebaut
          var ZBerlin = "<li><a href=\"http://www.berlin.pennergame.de\" title=\"nach Berlin\"<span style=\"color:blue\"><b>Berlin</b></span></a></li>";
          var ZHamburg = "<li><a href=\"http://www.pennergame.de\" title=\"nach Hamburg\"<span style=\"color:"+SchriftBG+"\"><b>Hamburg</b></span></a></li>";
          var ZBasti = "<li><a target=\"_blank\" href=\"http://pennergame-basti1012.foren-city.de/\" title=\"basti homepage\"><span style=\"color:blue\"><b>Basti1012</span></a></li>";
          var ZSpendenstatistik = "<li><a href=\"/change_please/statistics/\"  title=\"Spenden-Statistik\"><span style=\"color:"+SchriftBG+"\"><b>Spenden: </span><span style=\"color:"+SBG+"\"<middle>"+spendenbisher+"</b></middle></span> / "+maxspenden+"</a></li>";
          var ZSauber = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/city/washhouse/\" title=\"Spenden-Statistik\"><span style=\"color:"+SchriftBG+"\"><b>Sauber: </span><span style=\"color:"+SBG+"\"<middle>"+clean+"%</b></middle></span></a></li>";
          var ZPromille = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/city/supermarket/\" title=\"bier kaufen\"><span style=\"color:"+SchriftBG+"\"><b>Promille: </span><span style=\"color:"+SBG+"\"<middle>"+prom2+"?</b></middle></span></a></li>";
          var ZApi = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/dev/api/user."+userid+".xml\" title=\"penner api\"><span style=\"color:"+SchriftBG+"\"><b>Pennerid: </span><span style=\"color:"+SBG+"\"<middle>"+userid+"</b></middle></span></a></li>";
          var ZName = "<li><a href=\"http://berlin.pennergame.de/overview/\" title=\"pennername\"><span style=\"color:"+SchriftBG+"\"><b></span><span style=\"color:"+SBG+"\"<middle>"+Name+"</b></middle></span></a></li>";
          var ZAtt = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"att\"><span style=\"color:"+SchriftBG+"\"><b>ATT:<span style=\"color:"+SBG+"\"<middle>"+att+"</b></middle></span></a></li>";
          var ZDef = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"def\"><span style=\"color:"+SchriftBG+"\"><b>DEF:<span style=\"color:"+SBG+"\"<middle>"+def+"</middle></span></a></li>"; 
          var ZBande =  "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/gang/\" title=\"bandenmane\"><span style=\"color:"+SchriftBG+"\"><b></span><span style=\"color:"+SBG+"\"<middle>"+bandenname+"</b></middle></span></a></li>";
          var ZPunkte = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/overview/\" title=\"punkte\"><span style=\"color:"+SchriftBG+"\"><b>Punkte: </span><span style=\"color:"+SBG+"\"<middle>"+hs2+"</b></middle></span></a></li>";
          var ZAtmin = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"aattmin\"><span style=\"color:"+SchriftBG+"\"><b>ATT MIN: </span><span style=\"color:"+SBG+"\"<middle>"+attmin+"</b></middle></span></a></li>";
          var ZAtmax = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"attmax\"><span style=\"color:"+SchriftBG+"\"><b>ATT MAX: </span><span style=\"color:"+SBG+"\"<middle>"+attmax+"</b></middle></span></a></li>"; 
          var ZPlatz = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"platz\"><span style=\"color:"+SchriftBG+"\"><b>Platz: </span><span style=\"color:"+SBG+"\"<middle>"+platz+"</b></middle></span></a></li>"; 
          var ZGeld = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/overview/\" title=\"geld\"><span style=\"color:"+SchriftBG+"\">GELD:</span><span style=\"color:"+SBG+"\"<middle>"+geld+"</middle></span></a></li>";
          var ZSkill = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/pet/\" title=\"Skill\"><span style=\"color:"+SchriftBG+"\"><b>ATT tier: </span><span style=\"color:"+SBG+"\"<middle>"+skill+"</b></middle></span></a></li>";
          var ZSkill1 = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/pet/\" title=\"skill1\"><span style=\"color:"+SchriftBG+"\"><b>DEF tier: </span><span style=\"color:"+SBG+"\"<middle>"+skill1+"</b></middle></span></a></li>";
          var ZSkill2 = "<li><a target=\"_blank\" href=\"http://berlin.pennergame.de/fight/pet/\" title=\"skill2\"><span style=\"color:"+SchriftBG+"\"><b>MIT tier: </span><span style=\"color:"+SBG+"\"<middle>"+skill2+"</b></middle></span></a></li>";
          var ZEinstellungen = "<li><a name=\"EinstellungenExtraMenue\">[<span style=\"color:blue;\">Einstellungen</span>]</a></li>";
          var ZSpeichern = "<li><div align=\"center\">_______________________<br><input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
          var ZSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>&nbsp;</li></div>";
          if (kurs <= 1) {
           var ZFlaschen = "<a href=\"http://berlin.pennergame.de/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\">Pfandflaschen <small><b>("+kurs+"ct)</b></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
          }
          else {
           var ZFlaschen = "<a href=\"http://berlin.pennergame.de/stock/bottle/\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\"><span style=\"color:"+SchriftBG+"\"><b>Pfandflaschen <small>(<big><span style=\"color:"+SBG+"\"><b>"+kurs+"ct</b></span></big>)</small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\""+kurs+"\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value="+maxflaschen+" /><input type=\"submit\" value=\"Verkaufen\"/></form></li>";
          }   // hier ensteht das hauptmenue
          var Linkkette = ""+ZBasti + ZBerlin + ZHamburg + ZName + ZBande + ZApi + ZPlatz + ZPunkte + ZSpendenstatistik + ZSauber + ZPromille + ZAtt + ZDef + ZAtmin + ZAtmax + ZGeld + ZFlaschen + ZSkill + ZSkill1 + ZSkill2 + ""
          document.getElementById("footer").innerHTML += "<span name=\"Menue\" style=\"position:fixed;top:"+MenueTop+"px;"+RL+":"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:"+Tran+";opacity:"+Tran+";border:"+BorderSize+"px solid "+BorderColor+"; background-color:"+MenueBG+"\"><div class=\"content\" style=\"padding-top:0px\"><ul>"+Linkkette+ZEinstellungen+"</ul></div></span>";
          //--------------------------------------------------------------------------------------------------
          // hier wird das menue zum einstellen erstellt und zussammengefasst
          var CMenueBGColor = "<div align=\"center\"><a><span style=\"color:blue;\"><b> Hintergrund Farbe</a><input name=\"MenueBGColorIn\" type=\"text\" size=\"10\" value=\""+MenueBG+"\" /></div>";
          var CMenueBorderColor = "<div align=\"center\"><a><span style=\"color:blue;\"><b> Border Farbe</a><input name=\"MenueBorderColorIn\" type=\"text\" maxlength=\"7\" size=\"10\" value=\""+BorderColor+"\" /></div>";
          var CMenueTop = "<div align=\"center\"><a><span style=\"color:blue;\"><b>Abstand von Oben</a><input name=\"MenueTopIn\" size=\"10\" type=\"text\" value=\""+MenueTop+"\" />&nbsp<span style=\"color:blue;\">(Pixel)</span></div>";
          var CMenueLeft = "<div align=\"center\"><a><span style=\"color:blue;\"><b>Abstand von Links</a><input name=\"MenueLeftIn\" type=\"text\" size=\"10\" value=\""+MenueLeft+"\" />&nbsp<span style=\"color:blue;\">(Pixel)</span></div>";
          var CBorderSize = "<div align=\"center\"><a><span style=\"color:blue;\"><b> Borderbreite</a><input name=\"MenueBorderSizeIn\" type=\"text\" size=\"10\" value=\""+BorderSize+"\" />&nbsp<span style=\"color:blue;\">(Pixel)</span></div>";
          var CMenueBGschriftIn = "<div align=\"center\"><a><span style=\"color:blue;\"><b> schrift Farbe</a><input name=\"MenueBGschriftIn\" type=\"text\" maxlength=\"7\" size=\"10\" value=\""+SchriftBG+"\" /></div>";
          var CMenueBGergebnisschriftIn = "<div align=\"center\"><a><span style=\"color:blue;\"><b>Ergebnisschrift Farbe</a><input name=\"MenueBGergebnisschriftIn\" type=\"text\" maxlength=\"7\" size=\"10\" value=\""+SBG+"\" /></div>";
          var CMenueBGrechtslinksIn = "<div align=\"center\"><a><span style=\"color:blue;\"><b>left or rirht</a><input name=\"MenueBGrechtslinksIn\" type=\"text\" maxlength=\"5\" size=\"10\" value=\""+RL+"\" /></div>";
          var CMenueBGtranIn = "<div align=\"center\"><a><span style=\"color:blue;\"><b>transparent 0.4--2.0</a><a><span style=\"color:red;\"><b>!! Niemals unter 0.4</a><span style=\"color:red;\"><b>eingeben !!!!!</a><input name=\"MenueBGtranIn\" type=\"text\" maxlength=\"3\" size=\"10\" value=\""+Tran+"\" /></div>";
          var HauptLinkkete = ""+CMenueBGColor + CMenueBorderColor + CMenueTop + CMenueLeft + CBorderSize + CMenueBGschriftIn + CMenueBGergebnisschriftIn + CMenueBGrechtslinksIn + CMenueBGtranIn; 
          //--------------------------------------------------------------------------------------------------
          // Wurde Einstellungen geklickt dann............................................................
          document.getElementsByName('EinstellungenExtraMenue')[0].addEventListener('click', function EinstellungenExtraMenue () {
          // Einstellungs Menu einfuigen
          document.getElementsByName('Menue')[0].innerHTML = "<span name=\"Menue\" style=\"position:fixed;top:"+MenueTop+"px;"+RL+":"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:"+Tran+";opacity:"+Tran+";border:"+BorderSize+"px solid "+BorderColor+"; background-color:"+MenueBG+"\"><div class=\"content\" style=\"padding-top:0px\"><ul><li><div align=\"center\"><span style=\"color:blue; font-size:0px;\"></span></div></li>"+HauptLinkkete+ZSpeichern+ZSchliessen+"</ul></div></span>";
          // Wurde Speichern geklickt dann...
          document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {
          // Speichern ----------
          GM_setValue("MenueBGColorIn", document.getElementsByName('MenueBGColorIn')[0].value);
          GM_setValue("MenueBorderColorIn", document.getElementsByName('MenueBorderColorIn')[0].value);
          GM_setValue("MenueTopIn", document.getElementsByName('MenueTopIn')[0].value);
          GM_setValue("MenueLeftIn", document.getElementsByName('MenueLeftIn')[0].value);
          GM_setValue("MenueBorderSizeIn", document.getElementsByName('MenueBorderSizeIn')[0].value);
          GM_setValue("MenueBGschriftIn", document.getElementsByName('MenueBGschriftIn')[0].value);
          GM_setValue("MenueBGergebnisschriftIn", document.getElementsByName('MenueBGergebnisschriftIn')[0].value);
          GM_setValue("MenueBGrechtslinksIn", document.getElementsByName('MenueBGrechtslinksIn')[0].value);
          GM_setValue("MenueBGtranIn", document.getElementsByName('MenueBGtranIn')[0].value);
          // Seite neu laden ----------
          window.location.reload();
          
          },false);
          //.................................
          // Wurde Schliessen geklickt dann...
          document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
          // Seite neu laden
          window.location.reload();
          
          },false);
          //.................................
          
          },false);
          //................................................................................................
          
          }
          }
          )
          }
          }
          )
          }
          }
          )
          // copiright by basti1012 erste version multianzeigen menue berlin 24.4.2009
          // copiright by basti1012 ertse version mit banden menue berlin 26.4.2009
          // copiright by basti1012 erste version multianzeige hamburg mit rechts link auswahl in menue 1.5.2009
          // copiright by basti1012 An 2.5.2009 herstellung +optimirung der neuen version anpassung beider version fuer berlin und hamburg gleichzeuitiger anzeige
          // copiright by basti1012 beide version test abgeschlossen keine fehler mehr gefunden beide version sind start klar 
          // fuer oefentlichen download beide versionen koennen von beiden spielen gesteuert und eingestellt werden daten der penner trotzdem korekt angezeigt
          // copiright by basti1012 3.5.2009 diese version darf sich jeder fuer sein eigenen gebrauch anpassen wie er es selber moechte
          // mfg basti1012 by http://pennergame-basti1012.foren-city.de
// ==/UserScript==