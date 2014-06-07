// ==UserScript==
// @name           Hotkeys
// @namespace      Grease
// @description    Grepolis Shortcut
// @include        http://*.grepolis.*/game*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @icon           http://s7.directupload.net/images/120320/ullq32vn.jpg
// @version        ?
// ==/UserScript==

// JQuery
(function () {
    //access to window object cross-browser
    var uW;
    if (typeof unsafeWindow === 'object'){
        uW = unsafeWindow;
    } else {
        uW = window;
    }
    //get jQuery
    var $ = uW.jQuery;
}());


// Weltdaten einlesen
var nsfw = (typeof unsafeWindow !== 'undefined');
var A_ID = ((nsfw) ? unsafeWindow : window), $ = A_ID.jQuery;
var P_ID = ((nsfw) ? unsafeWindow : window), $ = P_ID.jQuery;
var T_ID = ((nsfw) ? unsafeWindow : window), $ = T_ID.jQuery;
var AllianzID = parseInt(A_ID.Game.alliance_id, 10);
var SpielerID = parseInt(P_ID.Game.player_id, 10);
var WeltID=/:\/\/([^./]+)/.exec(window.location.href)[1];
var SpracheID = WeltID.substr(0,2);
var StadtID = parseInt(T_ID.Game.townId, 10);
var currentpopulation = $('#pop_current').html();




// Hotkeys
$(window).keydown(
    function(hk){
        var notTheseOnes = ['textarea','input'];
        var target = hk.target.tagName.toLowerCase();
		// Stadt vor und zurck
        if (hk.which == 37 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Layout.townSwitch(ITowns.getPrevTownId(Game.townId))';
        }
		if (hk.which == 39 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Layout.townSwitch(ITowns.getNextTownId(Game.townId))';
        }
		// 관리자
		if (hk.which == 49 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("trade_overview")';
        }
		if (hk.which == 50 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("command_overview")';
        }
		if (hk.which == 51 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("recruit_overview")';
        }		
		if (hk.which == 52 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("unit_overview")';
        }
		if (hk.which == 53 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("outer_units")';
        }
		if (hk.which == 54 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("building_overview")';
        }
		if (hk.which == 55 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("culture_overview")';
        }
		if (hk.which == 56 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("gods_overview")';
        }
		if (hk.which == 57 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("hides_overview")';
        }
		if (hk.which == 48 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("town_group_overview","town_group_overviews")';
        }
		if (hk.which == 63 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("towns_overview")';
        }	
		if (hk.which == 192 && $.inArray(target,notTheseOnes) < 0){ // Angriffsplaner
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(14);
		}	
		// 기타
        if (hk.which == 00 && $.inArray(target,notTheseOnes) < 0){
            $("#helpdiv").toggle();
        }	
        if (hk.which == 00 && $.inArray(target,notTheseOnes) < 0){
            $("#idWWRankBtn").toggle();
        }
		if (hk.which == 83 && $.inArray(target,notTheseOnes) < 0){ // Stadtbersicht
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(1);
        }
		if (hk.which == 82 && $.inArray(target,notTheseOnes) < 0){ // Rangliste
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(12);
        }
		if (hk.which == 66 && $.inArray(target,notTheseOnes) < 0){ // Berichte
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(16);
        }	
		if (hk.which == 78 && $.inArray(target,notTheseOnes) < 0){
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(15);
		}	
		if (hk.which == 65 && $.inArray(target,notTheseOnes) < 0){ // Allianz
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(6);
		}	
		if (hk.which == 70 && $.inArray(target,notTheseOnes) < 0){ // Allianz Forum
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(7);
		}	
		if (hk.which == 69 && $.inArray(target,notTheseOnes) < 0){
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(25);
		}	
		if (hk.which == 80 && $.inArray(target,notTheseOnes) < 0){
            var uw=unsafeWindow;
            uw.Layout.wnd.Create(23);
		}	
		if (hk.which == 88 && $.inArray(target,notTheseOnes) < 0){
            var uw=unsafeWindow;
            var inhalt = $('<div class="inner_box"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div>Vorwort</div><div id="vorwort" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><table width="100%" border="0" cellspacing="0"><tr><td width="10%" style="text-align:center"><img src="http://s1.directupload.net/images/120726/vaatg5wd.png" width="100" height="100" /><b>Quackmaster</b></td><td width="90%">Wenn ihr meine Arbeit untersttzen wollt, freue ich ber jeden Klick auf   die normalen Links mit dem jeweiligen Namen des Statistiktools oder des Skriptes. Ihr werdet lediglich   kurz zu einer Seite weitergeleitet, die ihr nach 5 Sekunden berspringen   knnt. Wer keine Zeit dafr aufbringen mchte, findet den Direktlink direkt darunter. Es sind nur die in der deutschen Version von Grepolis erlaubten Skripte verzeichnet.</td></tr></table></div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div><div class="inner_box" style="margin-top:20px;"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div><table width="100%" border="0" cellspacing="0"><tr><td width="95%">Statistiken</td><td width="5%"><div id="Stats_Export"></div></td></tr></table></div><div id="Stats" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><a href="http://adf.ly/B7C8k" target="_blank">Grepolis Stats</a> <small>von <a href="http://www.clashrank.com/contact/" rel="nofollow" target="_blank">Clash Rank</a></small><br /><small><a href="http://www.grepostats.com" target="_blank">Direktlink</a></small><br />Bietet Statistiken und bersichten ber Spieler, Allianzen, Stdte und vielem mehr<br /><br /><a href="http://adf.ly/B7BlJ" target="_blank">Grepolis Maps</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=105" rel="nofollow" target="_blank">Gehirnpfirsich</a></small><br /><small><a href="http://www.grepolismaps.org" target="_blank">Direktlink</a></small><br />Kartentool - Weltkarten aller Server<br /><br /><a href="http://adf.ly/B6HBW" target="_blank">Bashrangliste</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=1643" rel="nofollow" target="_blank">quert</a></small><br /><small><a href="http://www.grepobash.de" target="_blank">Direktlink</a></small><br />Allianzinterne Bashrangliste<br /><br /><a href="http://adf.ly/B7CYV" target="_blank">Polissuche</a> <small> von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=83" rel="nofollow" target="_blank">Faark</a> (Quelltext: Tonda)</small><br /><small><a href="http://grepo.faark.de/tondasPolisSuche/townSearch.php" target="_blank">Direktlink</a></small><br />Suchen von Stdten mit bestimmten Filteroptionen. Ntzlich um Geisterstdte und Inaktive zu finden<br /><br /><a href="http://adf.ly/B7Cry" target="_blank">Grepolis - Einheiten Vergleich</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=11342" rel="nofollow" target="_blank">Quackmaster</a></small><br /><small><a href="https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE" target="_blank">Direktlink</a></small><br />Eine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen<br /><br /><a href="http://adf.ly/B7CyQ" target="_blank">Abakus - Der Grepolis Rechner</a>  <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=781" rel="nofollow" target="_blank">Aerials</a></small><br /><small><a href="http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner" target="_blank">Direktlink</a></small><br />Rechner und Planer rund um Grepolis zum Download auf den Computer<br /><br /><a href="http://adf.ly/BKCfU" target="_blank">YouScreen</a>  <small>von <a href="mailto:webmaster@youscreen.de" rel="nofollow" target="_blank">Lukas Ruschitzka</a></small><br /><small><a href="http://www.youscreen.de/" target="_blank">Direktlink</a></small><br />Screenshot Tool - mit der &quot;Druck&quot; Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung mglich)</div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div><div class="inner_box" style="margin-top:20px;"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div><table width="100%" border="0" cellspacing="0"><tr><td width="95%">Skripte</td><td width="5%"><div id="Skripte_Export"></div></td></tr></table></div><div id="Skripte" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><a href="http://adf.ly/AAMwY" target="_blank">Quack Toolsammlung</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=11342" rel="nofollow">Quackmaster</a></small><br /><small><a href="http://userscripts.org/scripts/show/128637" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />- Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo<br />- berschssiges Silber bis 15k wird in das Formfeld in der Hhle vorab eingetragen<br />- In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet<br />- Anzeige von Punkten fr bestimmte Gebude im Senat<br />- Buttonleiste mit Links zu allen wichtigen Toolseiten: grepostats.com,   grepobash.de, grepolismaps.org, tondas Polissuche (hosted by faark) und   einem Link zum Allyforum (maximiert)<br />- Vollbild Funktion<br />- BB Code Ausgabe der stationierten Truppen in einer Stadt fr das Forum oder Nachrichten<br />- Kein berladen der Schiffe im Angriffs-/Untersttzungsfenster<br />- Erweiterung der Kulturbersicht (G.Tio2.0Tools)<br />- Erweiterung der Befehlsbersicht (Anzahl von Bewegungen wird angezeigt)<br />- Hotkeys zu verschiedenen Funktionen<br />- Durchblttern der Stdte mit den Pfeiltasten<br />- Grepo Wiki Direktsuche<br />- bersicht ber smtliche erlaubten Statistiken und Skripte<br />- Transport Rechner<br /><br /><a href="http://adf.ly/AAYLL" target="_blank">WW-Ranks</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=4532" rel="nofollow">ReinerCY</a></small><br /><small><a href="www.g2.b0x.info/wwranks.user.js" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />Fgt einen Button hinzu, welcher bei Klick ein Fenster ffnet, welches eine Schtzung der zeitlichen Entwicklung der WW anzeigt.<br /><br /><a href="http://adf.ly/AARtm" target="_blank">GrepoTownList</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=8531" rel="nofollow">GTeauDFAdGTio</a></small><br /><small><a href="http://userscripts.org/scripts/show/84608" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />Zusatzfunktionen fr die Seite &quot;Grepolis Stats&quot;. Ermglicht die Umwandlung der Stdte eines Spielers in BB-Code.<br /><br /><a href="http://adf.ly/AAWLF" target="_blank">G.Tio2.0Tools</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=8531" rel="nofollow">GTeauDFAdGTio</a></small><br /><small><a href="http://www.gtiopolis.de/index.php?page=gtio2-0tools" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />- Anzeige Town-ID<br />- Grepostats Button in der Stadtinfo und Spielerinfo<br />- Erweiterung Kulturbersicht<br />- Erweiterung Befehlsbersicht<br />- Kein berladen der Schiffe<br /></div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div>');
                           var win = uw.Layout.wnd.Create(0,"bersicht Statistiken und Skripte");
            win.setWidth(740);
            win.setHeight(520);
            win.setContent(inhalt);
            var mo_Export = "Liste als BB-Code fr das Forum";
            $('<a id="BTN_Stats_Export" style="" href="#"><img src="http://s1.directupload.net/images/120731/temp/cji8kxhb.png" style="border-width: 0px" /></a>').appendTo('#Stats_Export');
            $('<a id="BTN_Skripte_Export" style="" href="#"><img src="http://s1.directupload.net/images/120731/temp/cji8kxhb.png" style="border-width: 0px" /></a>').appendTo('#Skripte_Export');
            uw.$('#BTN_Stats_Export').mousePopup(new uw.MousePopup(mo_Export));		
            uw.$('#BTN_Skripte_Export').mousePopup(new uw.MousePopup(mo_Export));
            var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>"
                var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 165px; width: 99%;\">"
                    var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>"
                        var expTitel = "Copy and Paste"
                            
                            $('#BTN_Stats_Export').click(function ()  {
                                var expWin = uw.Layout.wnd.Create(0,"Statistiken");
                                expWin.setWidth(740);
                                var expInhalt_Stats = "[quote][font=sansserif][center][size=20][b]Statistiken:[/b][/size][/center][/font][/quote]\n[quote][font=sansserif][size=10][url=http://adf.ly/B7C8k]Grepolis Stats[/url][/size] [size=6]von [url=http://www.clashrank.com/contact/]Clash Rank[/url]\n[url=http://www.grepostats.com/]Direktlink[/url][/size]\nBietet Statistiken und bersichten ber Spieler, Allianzen, Stdte und vielem mehr\n\n[size=10][url=http://adf.ly/B7BlJ]Grepolis Maps[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=105]Gehirnpfirsich[/url]\n[url=http://www.grepolismaps.org/]Direktlink[/url][/size]\nKartentool - Weltkarten aller Server\n\n[size=10][url=http://adf.ly/B6HBW]Bashrangliste[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=1643]quert[/url]\n[url=http://www.grepobash.de/]Direktlink[/url][/size]\nAllianzinterne Bashrangliste\n\n[size=10][url=http://adf.ly/B7CYV]Polissuche[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=83]Faark[/url] (Quelltext: Tonda)\n[url=http://grepo.faark.de/tondasPolisSuche/townSearch.php]Direktlink[/url][/size]\nSuchen von Stdten mit bestimmten Filteroptionen. Ntzlich um Geisterstdte und Inaktive zu finden.\n\n[size=10][url=http://adf.ly/B7Cry]Grepolis - Einheiten Vergleich[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=11342]Quackmaster[/url]\n[url=https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE]Direktlink[/url][/size]\nEine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen.\n\n[size=10][url=http://adf.ly/B7CyQ]Abakus - Der Grepolis Rechner[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=781]Aerials[/url]\n[url=http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner]Direktlink[/url][/size]\nRechner und Planer rund um Grepolis zum Download auf den Computer\n\n[size=10][url=http://adf.ly/BKCfU]YouScreen[/url][/size] [size=6]von [url=mailto:webmaster@youscreen.de]Lukas Ruschitzka[/url]\n[url=http://www.youscreen.de/]Direktlink[/url][/size]\nScreenshot Tool - mit der Druck-Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung mglich)\n[/font][/quote]"
                                    expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Stats +expRahmen_c);
                                $("#expTextarea").focus(function(){var that = this; setTimeout(function(){$(that).select();},10);});
                            });
            $('#BTN_Skripte_Export').click(function ()  {
                var expWin = uw.Layout.wnd.Create(0,"Skripte");
                expWin.setWidth(740);
                var expInhalt_Skripte = "[quote][font=sansserif][center][size=20][b]Skripte:[/b][/size]\nAdd-ons installieren um die Skripte zum laufen zu bringen:\n[b]Firefox:[/b] [url=https://addons.mozilla.org/de/firefox/addon/greasemonkey/]Greasemonkey[/url] ; [b]Chrome:[/b] [url=https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo]Tampermonkey[/url][/center][/font][/quote]\n[quote][font=sansserif][size=10][url=http://adf.ly/AAMwY]Quack Toolsammlung[/url][/size]\n[size=6][url=http://userscripts.org/scripts/show/128637]Direktlink[/url][/size]\n[b]Funktionen:[/b]\n- Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo\n- berschssiges Silber bis 15k wird in das Formfeld in der Hhle vorab eingetragen\n- In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet\n- Anzeige von Punkten fr bestimmte Gebude im Senat\n- Buttonleiste mit Links zu allen wichtigen Toolseiten: grepostats.com, grepobash.de, grepolismaps.org, tondas Polissuche (hosted by faark) und einem Link zum Allyforum (maximiert)\n- Vollbild Funktion\n- BB Code Ausgabe der stationierten Truppen in einer Stadt fr das Forum oder Nachrichten\n- Kein berladen der Schiffe im Angriffs-/Untersttzungsfenster\n- Erweiterung der Kulturbersicht (G.Tio2.0Tools)\n- Erweiterung der Befehlsbersicht (Anzahl von Bewegungen wird angezeigt)\n- Hotkeys zu verschiedenen Funktionen\n- Durchblttern der Stdte mit den Pfeiltasten\n- Grepo Wiki Direktsuche[/font][/quote]\n[quote][font=sansserif][size=10][url=http://adf.ly/AARtm]GrepoTownList[/url][/size]\n[size=6][url=http://userscripts.org/scripts/show/84608]Direktlink[/url][/size]\n[b]Funktionen:[/b]\nZusatzfunktionen fr die Seite GrepoStats. Ermglicht die Umwandlung der Stdte eines Spielers in BB-Code.[/font][/quote]\n[quote][font=sansserif][size=10][url=http://adf.ly/AAYLL]WW-Ranks[/url][/size]\n[size=6][url=www.g2.b0x.info/wwranks.user.js]Direktlink[/url][/size]\n[b]Funktionen:[/b]\nFgt einen Button hinzu, welcher bei Klick ein Fenster ffnet, welches eine Schtzung der zeitlichen Entwicklung der WW anzeigt.[/font][/quote]\n[quote][font=sansserif][size=10][url=http://adf.ly/AAWLF]G.Tio2.0Tools[/url][/size]\n[size=6][url=http://www.gtiopolis.de/index.php?page=gtio2-0tools]Direktlink[/url][/size] \n[b]Funktionen:[/b]\n- Anzeige Town-ID\n- Grepostats Button in der Stadtinfo und Spielerinfo\n- Erweiterung Kulturbersicht\n- Erweiterung Befehlsbersicht\n- Kein berladen der Schiffe[/font][/quote]"
                    expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Skripte +expRahmen_c);
                $("#expTextarea").focus(function(){var that = this; setTimeout(function(){$(that).select();},10);});
            });
		}			
    });

$('<a id="BTN_HK" style="z-index:5;position:absolute;top:0px;left:466px;" href="#"><img src="http://s1.directupload.net/images/120629/6a9xx5bw.png" style="border-width: 0px" /></a>').appendTo('body');

// Sprache ändern
var uw=unsafeWindow;
switch(SpracheID){
    default: // default = en
        var mo_HK = "<b>단축키:</b> <p> <u>도시 선택:</u> <br> 왼쪽 커서키 - 이전 도시 <br> 오른쪽 커서키 - 다음도시 <p> <u>관리자:</u> <br> 1 - 거래 개요 <br> 2 - 명령 개요 <br> 3 - 모집 개요 <br> 4 - 부대 개요 <br> 5 - 외곽 부대 개요 <br> 6 - 건설 개요 <br> 7 - 문화 개요 <br> 8 - 신 개요 <br> 9 - 동굴 개요 <br> 0 - 도시 그룹 개요 <br> - - 도시리스트 <p> <u>메뉴:</u> <br> S - 도시 개요 <br> N - 메세지 <br> B - 보고서 <br> A - 동맹 <br> F - 동맹 포럼 <br> E - 세팅 <br> P - 프로필 <br> R - 랭킹 <p>";
};


uw.$('#BTN_HK').mousePopup(new uw.MousePopup(mo_HK));