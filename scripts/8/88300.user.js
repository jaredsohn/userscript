// ==UserScript==
// @name           FW Auto Attack
// @namespace      FWAA
// @include        http://welt*.freewar.de/*/fight.php
// @include        http://welt*.freewar.de/*/fight.php*
// @include        http://welt*.freewar.de/*/main.php
// @include        http://welt*.freewar.de/*/main.php*
// ==/UserScript==
var npcs = new Array();
npcs[npcs.length] = new Array("Das Nebelwesen","6","100");
npcs[npcs.length] = new Array("Die Nebelkröte","1","2");
npcs[npcs.length] = new Array("Aasgeier","2","10");
npcs[npcs.length] = new Array("Abgesandter der Eiswelt","34","6000");
npcs[npcs.length] = new Array("Abgestürzter Weltraum-Kraken","13","200");
npcs[npcs.length] = new Array("Algenechse","6","60");
npcs[npcs.length] = new Array("Alte Grottenschlange","2710","420000");
npcs[npcs.length] = new Array("Alte Pilzwachtel","1","3");
npcs[npcs.length] = new Array("Alter Mann","1","3");
npcs[npcs.length] = new Array("Altes Kaklatron","2","7");
npcs[npcs.length] = new Array("Altstadtratte","3","12");
npcs[npcs.length] = new Array("Ameisenhügel","2","13");
npcs[npcs.length] = new Array("Angebissene Lianenechse","3","10");
npcs[npcs.length] = new Array("Aschenvogel","2","20");
npcs[npcs.length] = new Array("Aufgeregter Nebelhüpfer","5","15");
npcs[npcs.length] = new Array("Ausgestoßener Glypra","12","350");
npcs[npcs.length] = new Array("Baby-Einflügler","5","90");
npcs[npcs.length] = new Array("Baru-Giftegel","2","7");
npcs[npcs.length] = new Array("Berghund","5","45");
npcs[npcs.length] = new Array("Bergpilz","2","70");
npcs[npcs.length] = new Array("Bernstein-Falke","199","40000");
npcs[npcs.length] = new Array("Bernstein-Raupe","8","100");
npcs[npcs.length] = new Array("Blattalisk","5","50");
npcs[npcs.length] = new Array("Blattspinne","2","25");
npcs[npcs.length] = new Array("Blauer Stachelschuss-Igel","86","6000");
npcs[npcs.length] = new Array("Blauer Todesläufer","35","1200");
npcs[npcs.length] = new Array("Blaues Glühwürmchen","12","200");
npcs[npcs.length] = new Array("Blaukamm-Vogel","1","10");
npcs[npcs.length] = new Array("Blauwaldwurm","2","30");
npcs[npcs.length] = new Array("Blumenbeißer","2","7");
npcs[npcs.length] = new Array("Blutwurm","4","18");
npcs[npcs.length] = new Array("Borstenfisch","3","20");
npcs[npcs.length] = new Array("Brennendes Schaf","1","5");
npcs[npcs.length] = new Array("Bruder des Nebelbesens","3","15");
npcs[npcs.length] = new Array("Brummkäfer","1","10");
npcs[npcs.length] = new Array("Busch-Frul","5","55");
npcs[npcs.length] = new Array("Bücherwurm","1","5");
npcs[npcs.length] = new Array("Chiup-Vogel","2","15");
npcs[npcs.length] = new Array("Crim Garaank","40","10000");
npcs[npcs.length] = new Array("Deckenkleiber","3","10");
npcs[npcs.length] = new Array("Dicke, fette Strandkrabbe","4","20");
npcs[npcs.length] = new Array("Dicker Zukuvogel","2","15");
npcs[npcs.length] = new Array("Dilinug","1","2");
npcs[npcs.length] = new Array("Donnersandschlange","6","60");
npcs[npcs.length] = new Array("Donnerstier","9","180");
npcs[npcs.length] = new Array("Doppelköpfiger Riesenskorpion","8","100");
npcs[npcs.length] = new Array("Dreiäugiger Stier","3","3");
npcs[npcs.length] = new Array("Dunbrakatze","2","20");
npcs[npcs.length] = new Array("Dunkelgrottenpilz","9","120");
npcs[npcs.length] = new Array("Dunkelmorin-Skelett","311","45000");
npcs[npcs.length] = new Array("Dunkelsandkrebs","12","250");
npcs[npcs.length] = new Array("Dunkelstern-Arbeiter","4","30");
npcs[npcs.length] = new Array("Dunkelstern-Krieger","7","70");
npcs[npcs.length] = new Array("Dunkelstern-Magier","9","100");
npcs[npcs.length] = new Array("Dunkle Sandratte","2","7");
npcs[npcs.length] = new Array("Dunkler Sandtaprap","17","700");
npcs[npcs.length] = new Array("Dunkler Schamane","12","180");
npcs[npcs.length] = new Array("Durstige Riesenlibelle","2","10");
npcs[npcs.length] = new Array("Einflügler","400","60000");
npcs[npcs.length] = new Array("Einäugiger Stier","3","12");
npcs[npcs.length] = new Array("Eisbohrmaschine","7","90");
npcs[npcs.length] = new Array("Eisbohrmaschine-Prototyp","7","90");
npcs[npcs.length] = new Array("Eisvogel","8","60");
npcs[npcs.length] = new Array("Eiswurm","6","40");
npcs[npcs.length] = new Array("Ektofron","50","5000");
npcs[npcs.length] = new Array("Energiewurm","2","40");
npcs[npcs.length] = new Array("Enorme Stachelschildkröte","1800","350000");
npcs[npcs.length] = new Array("Entlaufene Geisterschabe","3","17");
npcs[npcs.length] = new Array("Erdfisch","4","25");
npcs[npcs.length] = new Array("Erdkäfer","1","2");
npcs[npcs.length] = new Array("Erdschlurch","2","13");
npcs[npcs.length] = new Array("Erdvogel","7","50");
npcs[npcs.length] = new Array("Erschöpfte Klauenratte","1","7");
npcs[npcs.length] = new Array("Ertrinkender Energiewurm","2","40");
npcs[npcs.length] = new Array("Exil-Nomade","5","50");
npcs[npcs.length] = new Array("Feldhase","1","2");
npcs[npcs.length] = new Array("Felsenwurm","4","20");
npcs[npcs.length] = new Array("Feuergeist","25","3000");
npcs[npcs.length] = new Array("Feuerlaub-Echse","6","70");
npcs[npcs.length] = new Array("Feuerlurch","15","150");
npcs[npcs.length] = new Array("Feuervogel","25","3000");
npcs[npcs.length] = new Array("Feuerwolf","2","9");
npcs[npcs.length] = new Array("Flammendes Glühwürmchen","1","2");
npcs[npcs.length] = new Array("Flammenwurm","2","15");
npcs[npcs.length] = new Array("Flecken-Wolf","2","18");
npcs[npcs.length] = new Array("Fleckfarbenfisch","25","800");
npcs[npcs.length] = new Array("Fleischfressende Sao-Pflanze","3","20");
npcs[npcs.length] = new Array("Fliegende Kuh","1","3");
npcs[npcs.length] = new Array("Fliegende Nebelkugel","20","200");
npcs[npcs.length] = new Array("Frierender Schneefisch","1","7");
npcs[npcs.length] = new Array("Frierender Schneekäfer","2","8");
npcs[npcs.length] = new Array("Frierender Schneewurm","2","35");
npcs[npcs.length] = new Array("Frierendes Schneewiesel","1","2");
npcs[npcs.length] = new Array("Frost-Wiesel","9","150");
npcs[npcs.length] = new Array("Frostaugen-Bestie","7","70");
npcs[npcs.length] = new Array("Frostdämon","65","12000");
npcs[npcs.length] = new Array("Frostgeist","14","250");
npcs[npcs.length] = new Array("Gefallener Spindelschreiter","5","15");
npcs[npcs.length] = new Array("Gefleckte Riesenlibelle","4","35");
npcs[npcs.length] = new Array("Gefrässiger Schattensalamander","35","3200");
npcs[npcs.length] = new Array("Gefräßige Schotterraupe","5","40");
npcs[npcs.length] = new Array("Geist der Depressionen","80","30000");
npcs[npcs.length] = new Array("Geist der Finsternis","5","15");
npcs[npcs.length] = new Array("Geist der Welt","5","40");
npcs[npcs.length] = new Array("Geist von Pur Pur","10","130");
npcs[npcs.length] = new Array("Geister-Undaron","10","5");
npcs[npcs.length] = new Array("Geisterschabe","3","17");
npcs[npcs.length] = new Array("Gelbbart-Yeti","23","2200");
npcs[npcs.length] = new Array("Gelbkatze","1","3");
npcs[npcs.length] = new Array("Gepforn","3","20");
npcs[npcs.length] = new Array("Geschwächter Abgesandter","10","300");
npcs[npcs.length] = new Array("Geschwächtes Kaklatron","1","7");
npcs[npcs.length] = new Array("Geysir-Schlucker","1200","200000");
npcs[npcs.length] = new Array("Giftbeißer","4","45");
npcs[npcs.length] = new Array("Giftgrabl","10","100");
npcs[npcs.length] = new Array("Giftschleimer","6","70");
npcs[npcs.length] = new Array("Giftsporenpilz","3","24");
npcs[npcs.length] = new Array("Gigantischer Spindelschreiter","1","225000");
npcs[npcs.length] = new Array("Gigantischer Todesläufer","1040","180000");
npcs[npcs.length] = new Array("Glaswasserfisch","7","150");
npcs[npcs.length] = new Array("Glibbriger Eiswurm","6","40");
npcs[npcs.length] = new Array("Glypra","12","350");
npcs[npcs.length] = new Array("Glypra-Späher","12","350");
npcs[npcs.length] = new Array("Glühende Staubechse","180","30000");
npcs[npcs.length] = new Array("Glühwürmchen","1","2");
npcs[npcs.length] = new Array("Goldflossenfisch","2","17");
npcs[npcs.length] = new Array("Goldkrebs","2","12");
npcs[npcs.length] = new Array("Goldwurm","6","40");
npcs[npcs.length] = new Array("Goldwächter","14","300");
npcs[npcs.length] = new Array("Grabfliege","2","7");
npcs[npcs.length] = new Array("Grabgeist der vermissten Toten","9","140");
npcs[npcs.length] = new Array("Grabwurm","3","18");
npcs[npcs.length] = new Array("Grasblatt-Schlange","6","55");
npcs[npcs.length] = new Array("Graswiesenschlange","2","17");
npcs[npcs.length] = new Array("Gratrat-Alien","20","800");
npcs[npcs.length] = new Array("Graubartechse","1","6");
npcs[npcs.length] = new Array("Graustein-Bär","10","4800");
npcs[npcs.length] = new Array("Grottenschlange","271","32000");
npcs[npcs.length] = new Array("Großer Bohnenschnapper","3","18");
npcs[npcs.length] = new Array("Großer Erdkäfer","2","20");
npcs[npcs.length] = new Array("Großer Laubbär","24","2600");
npcs[npcs.length] = new Array("Großer Lava-Käfer","8","120");
npcs[npcs.length] = new Array("Großer Schatten der Dunkelheit","630","85000");
npcs[npcs.length] = new Array("Großer Wurzelwurm","10","150");
npcs[npcs.length] = new Array("Grunulum","5","40");
npcs[npcs.length] = new Array("Hase","1","2");
npcs[npcs.length] = new Array("Hinterlistiger Stororaptor","710","105000");
npcs[npcs.length] = new Array("Holz-Maus","1","7");
npcs[npcs.length] = new Array("Holzplatten-Schildkröte","4","45");
npcs[npcs.length] = new Array("Hulnodar-Heiler","7","80");
npcs[npcs.length] = new Array("Hulnodar-Wächter","12","250");
npcs[npcs.length] = new Array("Hundertfüßiger Dilinug","1","2");
npcs[npcs.length] = new Array("Hyäne","2","13");
npcs[npcs.length] = new Array("Höhlenbär","12","170");
npcs[npcs.length] = new Array("Höhlenmensch","5","35");
npcs[npcs.length] = new Array("Insel-Schnapper","2","40");
npcs[npcs.length] = new Array("Itolos-Schrecke","5","30");
npcs[npcs.length] = new Array("Jerodar-Dieb","3","15");
npcs[npcs.length] = new Array("Jerodar-Lehrling","1","15");
npcs[npcs.length] = new Array("Junger Abgesandter","5","40");
npcs[npcs.length] = new Array("Junger Giftgrabl","9","100");
npcs[npcs.length] = new Array("Junger Graustein-Bär","1","100");
npcs[npcs.length] = new Array("Junger Schatten der Dunkelheit","3","25");
npcs[npcs.length] = new Array("Junger Stororaptor","25","330");
npcs[npcs.length] = new Array("Kaklatron","2","7");
npcs[npcs.length] = new Array("Kanal-Krake","3","10");
npcs[npcs.length] = new Array("Kanalqualle","50","10000");
npcs[npcs.length] = new Array("Klapperschlange","3","8");
npcs[npcs.length] = new Array("Klauenbartrein","22","2000");
npcs[npcs.length] = new Array("Klauenratte","1","7");
npcs[npcs.length] = new Array("Kleine Farbanomalie","3","25");
npcs[npcs.length] = new Array("Kleine Grottenschlange","9","120");
npcs[npcs.length] = new Array("Kleine Luftschnecke","1","6");
npcs[npcs.length] = new Array("Kleine Spinne","2","25");
npcs[npcs.length] = new Array("Kleine Stachelmade","1","1");
npcs[npcs.length] = new Array("Kleiner Laubbär","3","20");
npcs[npcs.length] = new Array("Kleiner Nebelkreischer","6","60");
npcs[npcs.length] = new Array("Kleiner Phasenbär","2","25");
npcs[npcs.length] = new Array("Kleiner Spindelschreiter","1","12");
npcs[npcs.length] = new Array("Kleiner Steingolem","6","160");
npcs[npcs.length] = new Array("Kleiner Waldschlurch","2","15");
npcs[npcs.length] = new Array("Kleines Haus-Schaf","1","5");
npcs[npcs.length] = new Array("Kleines Reen","1","10");
npcs[npcs.length] = new Array("Kleines Schaf","1","5");
npcs[npcs.length] = new Array("Kleines Schlangentier","1","8");
npcs[npcs.length] = new Array("Knochensammler","5","55");
npcs[npcs.length] = new Array("Knunglo","10","120");
npcs[npcs.length] = new Array("Koloa-Käfer","1","2");
npcs[npcs.length] = new Array("Kraftvoller Sporenträger","710","98000");
npcs[npcs.length] = new Array("Kranke Grottenschlange","271","2000");
npcs[npcs.length] = new Array("Kranke Milchkuh","1","3");
npcs[npcs.length] = new Array("Kranker Todesläufer","3","30");
npcs[npcs.length] = new Array("Kranker Wüstensalamander","1","12");
npcs[npcs.length] = new Array("Kriechlapf","4","12");
npcs[npcs.length] = new Array("Kristall-Orwane","7","80");
npcs[npcs.length] = new Array("Kristallfisch","3","6");
npcs[npcs.length] = new Array("Kristallwasserpflanze","20","2000");
npcs[npcs.length] = new Array("Krustenkäfer","3","12");
npcs[npcs.length] = new Array("Kräftiger Graustein-Bär","100","12800");
npcs[npcs.length] = new Array("Kurnotan - der dunkle Magier","14","500");
npcs[npcs.length] = new Array("Lablabkaktus","2","25");
npcs[npcs.length] = new Array("Langfaden-Spinne","2","25");
npcs[npcs.length] = new Array("Langzahnaffe","4","12");
npcs[npcs.length] = new Array("Larafstrauch","3","10");
npcs[npcs.length] = new Array("Larvennest","2","8");
npcs[npcs.length] = new Array("Lava Echse","2","20");
npcs[npcs.length] = new Array("Lava-Käfer","4","20");
npcs[npcs.length] = new Array("Lava-Wurm","2","20");
npcs[npcs.length] = new Array("Lawinengeist","14","250");
npcs[npcs.length] = new Array("Lebende Bergspitze","13","2500");
npcs[npcs.length] = new Array("Lebende Statue","10","240");
npcs[npcs.length] = new Array("Lebender Ast","3","30");
npcs[npcs.length] = new Array("Lebender Salzhügel","2","15");
npcs[npcs.length] = new Array("Lianenechse","3","10");
npcs[npcs.length] = new Array("Lichtpflanze","9","90");
npcs[npcs.length] = new Array("Lichtwurm","3","30");
npcs[npcs.length] = new Array("Magier des Schutzes","3","13");
npcs[npcs.length] = new Array("Magische Farbanomalie","47","7000");
npcs[npcs.length] = new Array("Manticore","5","30");
npcs[npcs.length] = new Array("Milchkuh","1","3");
npcs[npcs.length] = new Array("Moorgeist","7","70");
npcs[npcs.length] = new Array("Moosgeflecht","2","25");
npcs[npcs.length] = new Array("Mormdat","3","10");
npcs[npcs.length] = new Array("Morschgreifer","8","80");
npcs[npcs.length] = new Array("Morschwaldaffe","2","30");
npcs[npcs.length] = new Array("Mutiges Mormdat","3","10");
npcs[npcs.length] = new Array("Nachtfledermaus","10","120");
npcs[npcs.length] = new Array("Nachtgonk","7","80");
npcs[npcs.length] = new Array("Nachtgonk (Quest)","7","80");
npcs[npcs.length] = new Array("Nachtgonk im dunklen Haus","7","40");
npcs[npcs.length] = new Array("Narbiger Schneewurm","2","35");
npcs[npcs.length] = new Array("Naurofbusch","1","3");
npcs[npcs.length] = new Array("Nebelbesen","3","15");
npcs[npcs.length] = new Array("Nebelblume","1","1");
npcs[npcs.length] = new Array("Nebelhüpfer","3","15");
npcs[npcs.length] = new Array("Nebelkrebs","14","150");
npcs[npcs.length] = new Array("Nebelkreischer","18","250");
npcs[npcs.length] = new Array("Nebelkrähe","3","20");
npcs[npcs.length] = new Array("Nebelkröte","1","2");
npcs[npcs.length] = new Array("Nebelschleimer","20","500");
npcs[npcs.length] = new Array("Nebelschnecke","3","15");
npcs[npcs.length] = new Array("Nebelwesen","6","100");
npcs[npcs.length] = new Array("Nebelwiesel","1","2");
npcs[npcs.length] = new Array("Nomade","5","50");
npcs[npcs.length] = new Array("Onlo-Skelett","18","300");
npcs[npcs.length] = new Array("Parfugurn","400","15000");
npcs[npcs.length] = new Array("Pfeilschnecke","15","150");
npcs[npcs.length] = new Array("Phasenassel","5","45");
npcs[npcs.length] = new Array("Phasenfuchs","7","61");
npcs[npcs.length] = new Array("Phasengeier","9","90");
npcs[npcs.length] = new Array("Phasenkraken","370","39000");
npcs[npcs.length] = new Array("Phasenkrebs","3","25");
npcs[npcs.length] = new Array("Phasenkrokodil","14","160");
npcs[npcs.length] = new Array("Phasenkuh","2","15");
npcs[npcs.length] = new Array("Phasenlibelle","4","41");
npcs[npcs.length] = new Array("Phasenlurch","3","27");
npcs[npcs.length] = new Array("Phasenmade","5","35");
npcs[npcs.length] = new Array("Phasenmücke","1","18");
npcs[npcs.length] = new Array("Phasenratte","1","10");
npcs[npcs.length] = new Array("Phasensalamander","3","26");
npcs[npcs.length] = new Array("Phasenschaf","2","12");
npcs[npcs.length] = new Array("Phasenschlamm","1","20");
npcs[npcs.length] = new Array("Phasenschlange","8","80");
npcs[npcs.length] = new Array("Phasenschleim","4","36");
npcs[npcs.length] = new Array("Phasenschnecke","6","55");
npcs[npcs.length] = new Array("Phasenskorpion","231","23000");
npcs[npcs.length] = new Array("Phasenspinne","25","320");
npcs[npcs.length] = new Array("Phasentiger","59","5300");
npcs[npcs.length] = new Array("Phasenvogel","2","13");
npcs[npcs.length] = new Array("Phasenwiesel","1","8");
npcs[npcs.length] = new Array("Phasenwurm","3","30");
npcs[npcs.length] = new Array("Pilzwachtel","1","3");
npcs[npcs.length] = new Array("Reen","6","50");
npcs[npcs.length] = new Array("Reicher Wüstensalamander","3","12");
npcs[npcs.length] = new Array("Riesenhornisse","9","100");
npcs[npcs.length] = new Array("Riesenlibelle","2","10");
npcs[npcs.length] = new Array("Riesige Gift-Dschungelschlange","7","100");
npcs[npcs.length] = new Array("Riesige Landmuschel","43","9000");
npcs[npcs.length] = new Array("Riesige Schattenfledermaus","14","400");
npcs[npcs.length] = new Array("Rote Riesenlibelle","1","15");
npcs[npcs.length] = new Array("Rote Steinspinne","3","10");
npcs[npcs.length] = new Array("Roter Felswurm","2","30");
npcs[npcs.length] = new Array("Roter Sandhund","10","160");
npcs[npcs.length] = new Array("Rotpunkt-Tiger","8","200");
npcs[npcs.length] = new Array("Rotzahnhai","6","70");
npcs[npcs.length] = new Array("Ruinen-Wurm","1","6");
npcs[npcs.length] = new Array("Ruinenschleicher","5","30");
npcs[npcs.length] = new Array("Röhrenkrebs","6","90");
npcs[npcs.length] = new Array("Saftende Itolos-Schrecke","11","111");
npcs[npcs.length] = new Array("Salzsüchtiger Staubschleifer","5","35");
npcs[npcs.length] = new Array("Salzwasservogel","3","20");
npcs[npcs.length] = new Array("Sandalin","6","40");
npcs[npcs.length] = new Array("Sandechse","2","7");
npcs[npcs.length] = new Array("Sandfresserwurm","6","70");
npcs[npcs.length] = new Array("Sandgeist","4","20");
npcs[npcs.length] = new Array("Savannen-Vogel","2","12");
npcs[npcs.length] = new Array("Schachtelmesserfarn","37","700");
npcs[npcs.length] = new Array("Schatten der Dunkelheit","14","180");
npcs[npcs.length] = new Array("Schatten des Weltenwandlers","10","121");
npcs[npcs.length] = new Array("Schattenmoos","3","60");
npcs[npcs.length] = new Array("Schattensalamander","35","3200");
npcs[npcs.length] = new Array("Schattenwesen","2","10");
npcs[npcs.length] = new Array("Schattenwiesel","1","2");
npcs[npcs.length] = new Array("Schattenwolf","7","20");
npcs[npcs.length] = new Array("Schlammkaktus","33","800");
npcs[npcs.length] = new Array("Schneefisch","1","7");
npcs[npcs.length] = new Array("Schneehase","2","8");
npcs[npcs.length] = new Array("Schneehuhn","1","2");
npcs[npcs.length] = new Array("Schneekäfer","2","8");
npcs[npcs.length] = new Array("Schneekäfer-Kokon","1","8");
npcs[npcs.length] = new Array("Schneekäfer-Raupe","2","8");
npcs[npcs.length] = new Array("Schneewiesel","1","2");
npcs[npcs.length] = new Array("Schneewurm","2","35");
npcs[npcs.length] = new Array("Schotterraupe","5","40");
npcs[npcs.length] = new Array("Schwacher Sporenträger","3","10");
npcs[npcs.length] = new Array("Schwaches Stachelkrokodil","12","121");
npcs[npcs.length] = new Array("Schwangeres Schneehuhn","1","2");
npcs[npcs.length] = new Array("Schwarze Keitel-Spinne","4","18");
npcs[npcs.length] = new Array("Schwarzwespen","5","40");
npcs[npcs.length] = new Array("Schwimmendes Tentakel","6","40");
npcs[npcs.length] = new Array("Seeschlamm","9","100");
npcs[npcs.length] = new Array("Seichtwasserpilz","2","70");
npcs[npcs.length] = new Array("Seltsames Tier","1","2");
npcs[npcs.length] = new Array("Serbanthi","9","90");
npcs[npcs.length] = new Array("Siedestein-Dampfgeist","80","8000");
npcs[npcs.length] = new Array("Siedesteinkäfer","5","40");
npcs[npcs.length] = new Array("Silberfuchs","2","8");
npcs[npcs.length] = new Array("Silbergras-Spinne","1","10");
npcs[npcs.length] = new Array("Silberstein-Salamander","1","12");
npcs[npcs.length] = new Array("Silberwurmhaufen","2","25");
npcs[npcs.length] = new Array("Solarda-Fisch","3","20");
npcs[npcs.length] = new Array("Spindelschreiter","10","1500");
npcs[npcs.length] = new Array("Sporenträger","4","40");
npcs[npcs.length] = new Array("Sprungechse","2","7");
npcs[npcs.length] = new Array("Sprühregenwurm","3","25");
npcs[npcs.length] = new Array("Stabfisch","1","7");
npcs[npcs.length] = new Array("Stabkrebs","3","18");
npcs[npcs.length] = new Array("Stabschrecke","8","70");
npcs[npcs.length] = new Array("Stachelfisch","3","20");
npcs[npcs.length] = new Array("Stachelkrokodil","510","71000");
npcs[npcs.length] = new Array("Stachelkäfer","2","25");
npcs[npcs.length] = new Array("Stachelschildkröte","590","79000");
npcs[npcs.length] = new Array("Stachelschreck","7","80");
npcs[npcs.length] = new Array("Staub-Maus","1","7");
npcs[npcs.length] = new Array("Staub-Skelett","5","50");
npcs[npcs.length] = new Array("Staubassel","2","25");
npcs[npcs.length] = new Array("Staubflatterer","1","10");
npcs[npcs.length] = new Array("Staubgeist","16","800");
npcs[npcs.length] = new Array("Staubige Pilzwachtel","1","3");
npcs[npcs.length] = new Array("Staubschleifer","5","35");
npcs[npcs.length] = new Array("Stechmücken","2","15");
npcs[npcs.length] = new Array("Stegovar","2","17");
npcs[npcs.length] = new Array("Stein-Tentakel","6","40");
npcs[npcs.length] = new Array("Steingolem","12","320");
npcs[npcs.length] = new Array("Steinhuhn","2","30");
npcs[npcs.length] = new Array("Steinkatze","1","3");
npcs[npcs.length] = new Array("Steinkratzkäfer","2","25");
npcs[npcs.length] = new Array("Steinkäfer","2","20");
npcs[npcs.length] = new Array("Steinpicker-Vogel","3","20");
npcs[npcs.length] = new Array("Steinschalenkäfer","14","1200");
npcs[npcs.length] = new Array("Steinspinne","3","10");
npcs[npcs.length] = new Array("Steppenwolf","4","10");
npcs[npcs.length] = new Array("Sterbliche Waldratte","1","7");
npcs[npcs.length] = new Array("Sternenzerstörer","100","60000");
npcs[npcs.length] = new Array("Stororaptor","480","68000");
npcs[npcs.length] = new Array("Strandlokil","8","90");
npcs[npcs.length] = new Array("Strauchkäfer","2","8");
npcs[npcs.length] = new Array("Sumpflandkröte","2","15");
npcs[npcs.length] = new Array("Sumpfschrecke","12","170");
npcs[npcs.length] = new Array("Sumpfspinne","3","20");
npcs[npcs.length] = new Array("Teidam","5","50");
npcs[npcs.length] = new Array("Tempelhüpfer","3","20");
npcs[npcs.length] = new Array("Tentakel","6","40");
npcs[npcs.length] = new Array("Tentakel aus Gold","6","40");
npcs[npcs.length] = new Array("Thorom Logrid","7","50");
npcs[npcs.length] = new Array("Tiefenfinsterling","40","12000");
npcs[npcs.length] = new Array("Tiefsee-Aal","8","90");
npcs[npcs.length] = new Array("Todesmoor-Krokodil","8","90");
npcs[npcs.length] = new Array("Tonar-Reptil","800","130000");
npcs[npcs.length] = new Array("Totes Wawruz","2","10");
npcs[npcs.length] = new Array("Triefender Wandschleim","5","40");
npcs[npcs.length] = new Array("Trockenwurm","3","10");
npcs[npcs.length] = new Array("Tropfsteinwandler","15","150");
npcs[npcs.length] = new Array("Tropfsteinwurm","3","20");
npcs[npcs.length] = new Array("Umnebeltes Schlangentier","1","8");
npcs[npcs.length] = new Array("Unsterbliche Waldratte","1","7");
npcs[npcs.length] = new Array("Untoter Bürger","13","200");
npcs[npcs.length] = new Array("Untoter Winterbürger","13","200");
npcs[npcs.length] = new Array("Urwaldkuh","1","3");
npcs[npcs.length] = new Array("Urwaldschnecke","4","40");
npcs[npcs.length] = new Array("Verirrter Aasgeier","2","10");
npcs[npcs.length] = new Array("Verrückter Frostdämon","65","12000");
npcs[npcs.length] = new Array("Verstümmeltes Holzmonster","465","72000");
npcs[npcs.length] = new Array("Vertrockneter Seichtwasserpilz","1","70");
npcs[npcs.length] = new Array("Verwirrtes Schaf","1","5");
npcs[npcs.length] = new Array("Verwirrtes Sägezahnblatt","50000","3000000");
npcs[npcs.length] = new Array("Verwundete Nebelmaus","1","7");
npcs[npcs.length] = new Array("Verzauberte Nachtfledermaus","520","56213");
npcs[npcs.length] = new Array("Vorhof-Koordinator","10","160");
npcs[npcs.length] = new Array("Vulkandämon","30","5000");
npcs[npcs.length] = new Array("Waldratte","1","7");
npcs[npcs.length] = new Array("Waldschlurch","2","15");
npcs[npcs.length] = new Array("Waldschlurch-Skelett","3","21");
npcs[npcs.length] = new Array("Waldspinne","3","25");
npcs[npcs.length] = new Array("Waldvogel","2","10");
npcs[npcs.length] = new Array("Wandschleim","5","40");
npcs[npcs.length] = new Array("Wasserbär","4","35");
npcs[npcs.length] = new Array("Wasserkatze","1","3");
npcs[npcs.length] = new Array("Wasserschlange","1","8");
npcs[npcs.length] = new Array("Wassertentakel","5","60");
npcs[npcs.length] = new Array("Wawruz","2","10");
npcs[npcs.length] = new Array("Wegelagerer","10","280");
npcs[npcs.length] = new Array("Weltraum-Kraken","13","200");
npcs[npcs.length] = new Array("Wiesenschrecke","2","12");
npcs[npcs.length] = new Array("Windgeist","5","40");
npcs[npcs.length] = new Array("Wolf der Finsternis","4","30");
npcs[npcs.length] = new Array("Wolkenblume","1","6");
npcs[npcs.length] = new Array("Wolkenflatterer","35","6000");
npcs[npcs.length] = new Array("Wolkenschaf","2","8");
npcs[npcs.length] = new Array("Wucherwurzelbaum","90","10000");
npcs[npcs.length] = new Array("Wurzelwurm","2","25");
npcs[npcs.length] = new Array("Wächter der Zelle","6","120");
npcs[npcs.length] = new Array("Wächter des Vulkans","10","200");
npcs[npcs.length] = new Array("Wühlratte","2","20");
npcs[npcs.length] = new Array("Wüsten-Ektofron","52","5521");
npcs[npcs.length] = new Array("Wüstenmaus","1","2");
npcs[npcs.length] = new Array("Wüstenplankton","2","7");
npcs[npcs.length] = new Array("Wüstensalamander","1","12");
npcs[npcs.length] = new Array("Wüstenschreck","3","10");
npcs[npcs.length] = new Array("Wüstenspinne","2","7");
npcs[npcs.length] = new Array("Zauberer der Bergwiesen","14","300");
npcs[npcs.length] = new Array("Zielscheibe","1","40");
npcs[npcs.length] = new Array("Zukuvogel","2","15");
npcs[npcs.length] = new Array("Zweibeinige Waldspinne","3","25");
function known(npc) {
         var i = 0;
         var isknown = false;
         for(i = 0;i < npcs.length;i++) {
         	if(npcs[i][0].toLowerCase() == npc.toLowerCase()) {
                 	isknown = true;
                 	break;
                 }
         }
         return(isknown);
}
function cankill(npc) {
	var lp = localStorage.getItem("autoattack_lp");
	var atk = localStorage.getItem("autoattack_atk");
	var def = localStorage.getItem("autoattack_def");
         if(typeof(lp) == "undefined") {lp = 0;};
         if(typeof(atk) == "undefined") {atk = 0;};
         if(typeof(def) == "undefined") {def = 0;};
         var i = 0;
         for(i = 0;i < npcs.length;i++) {
         	if(npcs[i][0].toLowerCase() == npc.toLowerCase()) {
                 	npc = npcs[i];
                 	break;
                 }
         }
         var dmgprorunde = npc[1] - def;
         if(dmgprorunde < 1) {
         	dmgprorunde = 1;
         }
         var schaden = Math.ceil(npc[2] / atk) * dmgprorunde;
         if(schaden <= lp) {
         	return(true);
         }else{
		return(false);
         }
}
var u = window.location.href;
u = u.substr(7);
u = u.substr(0,u.indexOf("/"));
function sendAjax(url,target_sub) {
	var req = null;
	try{
		req = new XMLHttpRequest();
	}catch (ms){
		try{
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (nonms){
			try{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}catch (failed){
				req = null;
			}
		}
	}
	req.open("GET", url, true);
	req.onreadystatechange = function() {
         	if(req.readyState == 4 && req.status == 200) {
			target_sub(req.responseText);
         	}
         }
	req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         req.overrideMimeType('text/plain; charset=iso-8859-1')
	req.send(null);
}
function func2(s) {
	var source = s;
	source = source.substr(source.indexOf("fight.php?action=attacknpc&"));
         var url = source.substr(0,source.indexOf("\""));
	if(url.substr(0,2) != "ht") {
		url = "http://" + u + "/freewar/internal/" + url;
	}
	while(url.indexOf("&amp;") > -1) {
		url = url.replace("&amp;","&");
	}
         window.location = url;
}
function getstat(n) {
	var store = localStorage.getItem("attack_npc_list")
	if(store != null) {
		store = store.split("|");
	}else{
		store = new Array();
	}
         var r = false;
	for(var i = 0;i < store.length;i++) {
		if(store[i] == n) {
                 	r = true;
                 	break;
                 }
         }
         return(r);
}
function setstat(n,m) {
	var store = localStorage.getItem("attack_npc_list")
	if(store != null) {
		store = store.split("|");
	}else{
		store = new Array();
	}
         if(m == 1) {
         	var r = false;
		for(var i = 0;i < store.length;i++) {
			if(store[i] == n) {
                 		r = true;
                 		break;
                 	}
         	}
                 if(r == false) {
                 	store[store.length] = n;
                 }
                 var p = "";
                 for(var i = 0;i < store.length;i++) {
                 	if(p!="") {
				p += "|";
                         }
                         p += store[i];
                 }
                 localStorage.setItem("attack_npc_list",p);
         }else if(m == 0) {
         	var r = false;
		for(var i = 0;i < store.length;i++) {
			if(store[i] == n) {
                 		r = true;
                 		break;
                 	}
         	}
                 if(r == true) {
                 	var p = "";
                 	for(var i = 0;i < store.length;i++) {
                                 if(store[i] != n) {
                 			if(p != "") {
						p += "|";
                         		}
                         		p += store[i];
                                 }
                 	}
                 	localStorage.setItem("attack_npc_list",p);
                 }
         }
}
function t() {
	if(this.checked == true) {
                 setstat(this.value,1);
         }else{
                 setstat(this.value,0);
         }
}
function func1(s) {
	var source = s;
	source = source.substr(source.indexOf("\"personlistcaption"));
	source = source.substr(source.indexOf(">") + 1);
	var personen = source.substr(0,source.indexOf("<"));
if(localStorage.getItem("aa_config_drops") == 1) {
         if(source.indexOf("Nehmen") > -1) {
                	var regex = new RegExp("\<a href=\"([^\"]*)\"\>Nehmen\<\/a\>");
		var match = regex.exec(source);
                	if(match != null) {
                        	window.location = "http://" + u + "/freewar/internal/" + match[1];
                	}
         }
}
	var store = localStorage.getItem("attack_npc_list")
	if(store != null) {
		store = store.split("|");
	}else{
		store = new Array();
	}
         var gg = document.getElementsByTagName("p");
         var i = 0
	for(i = 0;i < gg.length;i++) {
		if(gg[i].className == "listusersrow") {
			var name = gg[i].firstChild.innerHTML.substr(0,gg[i].firstChild.innerHTML.length - 1);
			if(name.substr(0,1) != "<" && known(name)) {
				gg[i].appendChild(document.createElement("br"));
                         	var onoff = document.createElement("input");
                         	onoff.type = "checkbox";
                         	if(getstat(name) == true) {
                        			onoff.checked = "true";
                         	}
                         	onoff.value = name;
                         	onoff.addEventListener("click",t,true);
                                 if(cankill(name) == false) {
					gg[i].style.background = "#000000";
					gg[i].style.color = "white";
                                         // gg[i].style.display = "none";
                                         var bl = document.createElement("center");
                                         var g = document.createElement("span");
                                         g.style.color = "red";
                                         g.style.fontSize = "40px";

                                         bl.appendChild(g);
                                         g.appendChild(document.createTextNode("NICHT ANGREIFEN"));

                                         gg[i].appendChild(bl);
                                         gg[i].getElementsByTagName("a")[0].style.color = "yellow";
                                         gg[i].getElementsByTagName("a")[1].style.color = "yellow";
                                 }else{
                         		gg[i].appendChild(onoff);
                                 }
                         }
                 }
         }
	if(localStorage.getItem("aa_config_attack") == 1) {
		if(personen == "Du siehst folgende Personen an diesem Ort:") {
                 	var gg = document.getElementsByTagName("p");
                         var i = 0
                         for(i = 0;i < gg.length;i++) {
                         	if(gg[i].className == "listusersrow") {
                                 	var name = gg[i].firstChild.innerHTML;
                                         var tmp = "";
                                        	var attack_link = gg[i].getElementsByTagName("a")[0].href;
                                         name = name.substr(0,name.length - 1);
					if(getstat(name) && cankill(name)) {
						source = source.substr(source.indexOf("<a ") + 2);
						source = source.substr(source.indexOf("=") + 2);
						var url = source.substr(0,source.indexOf("\""));
                 				if(url.substr(0,2) != "ht") {
                 					url = "http://" + u + "/freewar/internal/" + url;
                 				}
                 				while(url.indexOf("&amp;") > -1) {
                 					url = url.replace("&amp;","&");
                 				}
						sendAjax(url,func2);
                 			}
                                 }
			}
		}
	}
}
sendAjax("http://" + u + "/freewar/internal/main.php",func1);