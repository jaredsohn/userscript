// ==UserScript==
                                                // @name           Travian překlad ee --> CZ
                                                // @namespace      TT ee-->cz
                                                // @description    Překlad estonského Travianu do češtiny
                                                // @version 0.1
                                             
                                                // @include        http://*.travian.co.ee/*
						// @include        http://travian.co.ee/*
                                               
                                                // ==/UserScript==
                                                
                                                //Styles
                                                var cssStyle = "";
                                                cssStyle += "body{font-family:tahoma;}";
                                                cssStyle += "h1{font-family:arial;font-size:190%;}";
                                                cssStyle += ".p1 label{float:right;}";
                                                cssStyle += "#ltbw0{right:284px;}";
                                                GM_addStyle(cssStyle);
                                                
                                                var loc=window.location.href; // the current page href
                                                var keys, str;
                                                var lang_from = new Array();
                                                var lang_hu = new Array();
                                                var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ );
                                                
                                                //alert('fos');
                                                
                                                if(!lang) {
                                                  lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop();
                                                } else {
                                                  lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
                                                }
                                                
                                                switch(lang){
                                                case '.ee':
                                                //*/
lang_from[1]   = 'Avaleht';
lang_from[2]   = 'Juhendid';
lang_from[3]   = 'Õpetus';
lang_from[4]   = 'Sisene';
lang_from[5]   = 'Registreeri';
lang_from[6]   = 'Mängijaid kokku:';
lang_from[7]   = 'Aktiivseid mängijaid:';
lang_from[8]   = 'Hetkel mängib:';
lang_from[9]   = 'Mängijaid:';
lang_from[10]   = 'Nimi';
lang_from[11]   = 'Salasõna';
lang_from[12]   = 'Esileht';
lang_from[13]   = 'Välju';
lang_from[14]   = 'Küla omanik';
lang_from[15]   = 'Tootmine:';
lang_from[16]   = 'Puit:';
lang_from[17]   = 'Savi:';
lang_from[18]   = 'Raud:';
lang_from[19]   = 'Vili:';
lang_from[20]   = 'tunnis';
lang_from[21]   = 'Sõdurid';
lang_from[22]   = 'pole';
lang_from[23]   = 'Mängija profiil';
lang_from[24]   = 'Ülevaade';
lang_from[25]   = 'Profiil';
lang_from[26]   = 'Eelistus';
lang_from[27]   = 'Konto';
lang_from[28]   = 'Graafikapakk';
lang_from[29]   = 'Koht tabelis';
lang_from[30]   = 'Rahvus';
lang_from[31]   = 'Liit';
lang_from[32]   = 'Külad';
lang_from[33]   = 'Populatsioon';
lang_from[34]   = 'Muuda profiil';                                               
lang_from[35]   = 'Elanikke'; 
lang_from[36]   = 'Koordinaadid'; 
lang_from[37]   = 'Kirjeldus'; 
lang_from[38]   = 'Mängija'; 
lang_from[39]   = 'Detailid'; 
lang_from[40]   = 'Pealinn'; 
lang_from[41]   = 'Sünnipäev'; 
lang_from[42]   = 'Sugu'; 
lang_from[43]   = 'Elukoht'; 
lang_from[44]   = 'Külanimi';
lang_from[45]   = 'Kellaaja eelistus';
lang_from[46]   = 'Siin saad sobitada ajatsooni.';
lang_from[47]   = 'Ajatsoonid';
lang_from[48]   = 'Kuupäev';
lang_from[49]   = 'Muuda salasõna';
lang_from[50]   = 'Vana salasõna';
lang_from[51]   = 'Uus salasõna';
lang_from[52]   = 'Muuda e-mail';
lang_from[53]   = 'Palun kirjuta siia oma vana ja uus e-mail, sest mõlemale saadetakse kood.';
lang_from[54]   = 'Vana e-mail';
lang_from[55]   = 'Uus e-mail';
lang_from[56]   = 'Konto asendajad';
lang_from[57]   = 'Asendaja saab sisselogida sinu nime ja oma salasõna sisestades.';
lang_from[58]   = 'Asendaja nimi';
lang_from[59]   = 'Sind on lisatud asendajaks alljärgnevatel kontodel. Sa saad seda tühistada, kui vajutada punasele X -le.';
lang_from[60]   = 'Sama arvuti kasutus';
lang_from[61]   = 'Kui selles arvutis mängib mitu mängijat Traviani, siis peaksid sisestama siia ka teise mängija nime. See kehtib ühe arvuti kohta, mitte arvutivõrgu kohta.';
lang_from[62]   = 'Mängija nimi:';    
lang_from[63]   = 'Kustuta konto'; 
lang_from[64]   = 'Siin saad kustutada oma konto. Kinnitamise hetkest alates võtab täielik konto kustumine aega kolm päeva.'; 
lang_from[65]   = 'kustutatakse'; 
lang_from[66]   = 'Esimese 24 tunni jooksul saad veel kustutamise tühistada.'; 
lang_from[67]   = 'Sul võib olla kuni 2 asendajat.'; 
lang_from[68]   = 'Kaart';
lang_from[69]   = 'Elanikud:';
lang_from[70]   = 'Omanik';
lang_from[71]   = 'Informatsioon';
lang_from[72]   = 'Valikud';
lang_from[73]   = 'Kaardi keskkoht';
lang_from[74]   = 'Raja uus küla (Ehita kogunemispunkt)';
lang_from[75]   = 'Maa-ala jaotus';
lang_from[76]   = 'Puuraidurit';
lang_from[77]   = 'Savikarjääri';
lang_from[78]   = 'Rauakaevandust';
lang_from[79]   = 'Viljapõldu';
lang_from[80]   = 'Okupeeritud oaas';
lang_from[81]   = 'Saada sõdurid (Ehita kogunemispunkt)';
lang_from[82]   = 'Saada kaupmehed (Ehita turg)';
lang_from[83]   = 'saadaval';
lang_from[84]   = 'Rüüsta okupeerimata oaasi (Ehita kogunemispunkt)';
lang_from[85]   = 'Kasutajatunnus:';
lang_from[86]   = 'Roomlased';
lang_from[87]   = 'Teutoonid';
lang_from[88]   = 'Keldid';
lang_from[89]   = 'Juhuslik';
lang_from[90]   = 'Loodesse';
lang_from[91]   = 'Edelasse';
lang_from[92]   = 'Kirdesse';
lang_from[93]   = 'Kagusse';
lang_from[94]   = 'Igal mängijal võib olla ainult ÜKS konto serveri kohta!';
lang_from[95]   = 'Raportid';
lang_from[96]   = 'Kõik';
lang_from[97]   = 'Kauplemine';
lang_from[98]   = 'Abivägi';
lang_from[99]   = 'Rünnakud';
lang_from[100]   = 'Mitmesugune';
lang_from[101]   = 'Teema';
lang_from[102]   = 'saadetud';
lang_from[103]   = 'Pole ühtegi raportit';
lang_from[104]   = 'Sõnumid';
lang_from[105]   = 'Saabunud';
lang_from[106]   = 'Kirjuta';
lang_from[107]   = 'Saadetud';
lang_from[108]   = 'Pole saadetud sõnumeid';
lang_from[109]   = 'Saatja';
lang_from[110]   = 'Saaja';
lang_from[111]   = 'Tugi';
lang_from[112]   = 'Mängijate edetabel';
lang_from[113]   = 'Liidud';
lang_from[114]   = 'Rünne';
lang_from[115]   = 'Kaitse';
lang_from[116]   = 'Üldine';
lang_from[117]   = 'Suurimad külad';
lang_from[118]   = 'Küla';
lang_from[119]   = 'Elanikud';
lang_from[120]   = 'Suurimad liidud';
lang_from[121]   = 'Punkte';
lang_from[122]   = 'Edukaimad ründajad';
lang_from[123]   = 'Edukaimad kaitsjad';
lang_from[124]   = 'Registracenud mängijaid:';
lang_from[125]   = 'Rahvused';
lang_from[126]   = 'registreerinud';
lang_from[127]   = 'Protsent';
lang_from[128]   = 'Mitmesugust';
lang_from[129]   = 'Rünnakuid';
lang_from[130]   = 'Ohvreid';
lang_from[131]   = 'Nädala ründajad';
lang_from[132]   = 'Nädala kaitsjad';
lang_from[133]   = 'Nädala pürgijad';
lang_from[134]   = 'Kohti';
lang_from[135]   = 'Nädala rüüstajad';
lang_from[136]   = 'Varusid';
lang_from[137]   = 'Foorum';
lang_from[138]   = 'Jututuba';
lang_from[139]   = 'valmib kell';
lang_from[140]   = 'Puuraidur';
lang_from[141]   = 'Viljapõld';
lang_from[142]   = 'Hetke tootmine:';
lang_from[143]   = 'Tootmine';
lang_from[144]   = 'Varude kulu uuendamiseks tasemele';
lang_from[145]   = 'Travian Games GmbH';
lang_from[146]   = 'Rauakaevandus';
lang_from[147]   = 'Savikarjäär';
lang_from[148]   = 'tasemele';
lang_from[149]   = 'tasemel';
lang_from[150]   = 'tase';
lang_from[151]   = 'Varude kulu';
lang_from[152]   = 'uuendamiseks';
lang_from[153]   = 'Viljapõld toodab vilja, mis on kõige tähtsam varuliik mängus. Viljast sõltub kogu sinu küla.';
lang_from[154]   = 'Puuraidur langetab puid. Mida rohkem puuraiduri taset arendada, seda rohkem puid tema abiga saad.';
lang_from[155]   = 'Rauakaevanduses kaevandatakse rauda. Tõstes kaevanduse taset saab küla rohkem rauda tunnis.';
lang_from[156]   = 'Savikarjääris kaevandatakse savi. Taseme suurendamine tõstab tootlikkust.';
lang_from[157]   = 'Arvutatud';
lang_from[158]   = 'Serverikell';
lang_from[159]   = 'Ehitised';
lang_from[160]   = 'Varud';
lang_from[161]   = 'Militaar';
lang_from[162]   = 'Tsiviil';
lang_from[163]   = 'Traviani KKK';
lang_from[164]   = 'See mänguabi annab sulle võimaluse igal ajal otsida sulle vajalikku informatsiooni.';
lang_from[165]   = 'See mänguabi annab sulle lühikese kokkuvõtte mängust. Rohkem infot saad Traviani KKK-st.';
lang_from[166]   = 'Töölised töötavad juba.';
lang_from[167]   = 'Saekaater';
lang_from[168]   = 'Tellisetehas';
lang_from[169]   = 'Rauatöökoda';
lang_from[170]   = 'Veski';
lang_from[171]   = 'Pagar';
lang_from[172]   = 'Ladu';
lang_from[173]   = 'Viljaait';
lang_from[174]   = 'Sepikoda';
lang_from[175]   = 'Rüü sepp';
lang_from[176]   = 'Staadion';
lang_from[177]   = 'Kogunemispunkt';
lang_from[178]   = 'Kasarmud';
lang_from[179]   = 'Tall';
lang_from[180]   = 'Töökoda';
lang_from[181]   = 'Akadeemia';
lang_from[182]   = 'Suured kasarmud';
lang_from[183]   = 'Suur tall';
lang_from[184]   = 'Püünisemeister';
lang_from[185]   = 'Kindlus';
lang_from[186]   = 'Peamaja';
lang_from[187]   = 'Turg';
lang_from[188]   = 'Saatkond';
lang_from[189]   = 'Peidik';
lang_from[190]   = 'Raekoda';
lang_from[191]   = 'Residents';
lang_from[192]   = 'Palee';
lang_from[193]   = 'Varakamber';
lang_from[194]   = 'Kaubanduskoda';
lang_from[195]   = 'Kivitöökoda';
lang_from[196]   = 'Suur ladu';
lang_from[197]   = 'Suur viljaait';
lang_from[198]   = 'Põhitingimused';
lang_from[199]   = 'ei ole';
lang_from[200]   = 'Ehita uus hoone';
lang_from[201]   = 'kuva ehitised, mis on varsti kättesaadavad';
lang_from[202]   = 'peida ehitised, mis on varsti kättesaadavad';
lang_from[203]   = 'Ehita hoone';
lang_from[204]   = 'peida ülejäänud';
lang_from[205]   = 'Ehitamise aeg hetkel';
lang_from[206]   = 'Ehitamise aeg';
lang_from[207]   = 'Ehita';
lang_from[208]   = 'Leegionär';
lang_from[209]   = 'Praetoorian';
lang_from[210]   = 'Impeerian';
lang_from[211]   = 'Skaut-ratsanik';
lang_from[212]   = 'Imperaatori ratsanik';
lang_from[213]   = 'Caesari ratsanik';
lang_from[214]   = 'Müürilõhkuja';
lang_from[215]   = 'Katapult';
lang_from[216]   = 'Senaator';
lang_from[217]   = 'Asunik';
lang_from[218]   = 'Nuiameest';
lang_from[219]   = 'Odamees';
lang_from[220]   = 'Kirvemees';
lang_from[221]   = 'Maakuulaja';
lang_from[222]   = 'Paladiin';
lang_from[223]   = 'Teutooni rüütel';
lang_from[224]   = 'Taraan';
lang_from[225]   = 'Pealik';
lang_from[226]   = 'Faalanks';
lang_from[227]   = 'Mõõgamees';
lang_from[228]   = 'Rajaleidja';
lang_from[229]   = 'Theutaatese pikne';
lang_from[230]   = 'Druiid-ratsanik';
lang_from[231]   = 'Aeduaan';
lang_from[232]   = 'Ülemkelt';
lang_from[233]   = 'Liikumiskiirus';
lang_from[234]   = 'Ruutu';
lang_from[235]   = 'Tunnis';
lang_from[236]   = 'Suudab kanda';
lang_from[237]   = 'ühikut';
lang_from[238]   = 'Elus hoidmine';
lang_from[239]   = 'Treeningu pikkus';
lang_from[240]   = 'Toidupuudus: Arenda viljapõlde';
lang_from[241]   = 'Ootejärjekord';
lang_from[242]   = 'Sõdurite liikumine';
lang_from[243]   = 'Hetke mahutavus';
lang_from[244]   = 'Mahutavus';
lang_from[245]   = 'Puuraidurilt saab külarahvas puid. Mida rohkem puuraiduri taset arendada, seda rohkem puid temalt saab.';
lang_from[246]   = 'Savikarjääris kaevandatakse savi. Arendamine tõstab tootmismahtu.';
lang_from[247]   = 'Rauakaevanduses kaevandatakse rauda. Tõstes kaevanduse taset saab küla rohkem rauda tunnis.';
lang_from[248]   = 'Viljast sõltub kogu sinu küla, kuna elanike toit tuleb siit, siis tuleks põldusid aegajalt arendada.';
lang_from[249]   = 'Ehitades veski ja pagari saad viljatootlikkust veelgi suurendada.';
lang_from[250]   = 'Saekaatris valmib kvaliteetne saematerjal. Saekaatri taset tõstes tõuseb puidu tootlikkus kuni 25 protsenti.';
lang_from[251]   = 'Tehases valmistatakse savist kvaliteetseid telliseid. Arendamine tõstab tootmismahtu kuni 25 protsenti.';
lang_from[252]   = 'Rauatöökojas sulatatakse rauda. Arendamine tõstab tootmismahtu kuni 25 protsenti.';
lang_from[253]   = 'Veski toodab jahu ning vilja tootlikkus suureneb kuni 25 protsenti.';
lang_from[254]   = 'Pagar küpsetab viljajahust maitsvat leiba. Arendamine tõstab viljatootlikkust kuni 50 protsenti.';
lang_from[255]   = 'Laos saad hoida puitu, savi ja rauda. Lao taseme suurendamisega mahub sinna rohkem varusid.';
lang_from[256]   = 'Viljaaidas hoitakse vilja. Aida arendamisega suureneb selle mahutavus.';
lang_from[257]   = 'Vanus';
lang_from[258]   = 'Kirjuta sõnum';
lang_from[259]   = 'Hetkel on su kullakogus:';
lang_from[260]   = 'Turul saad vahetada oma varusid teistega. Turgu arendades saad suuremaid koguseid vahetada.';
lang_from[261]   = 'Saada varud';
lang_from[262]   = 'Osta';
lang_from[263]   = 'Paku';
lang_from[264]   = 'NPC vahetus';
lang_from[265]   = 'Kaupmehi';
lang_from[266]   = 'Küla:';
lang_from[267]   = 'või';
lang_from[268]   = 'Iga sinu kaupmees suudab kanda';
lang_from[269]   = 'ühikut kaupa.';
lang_from[270]   = 'Pakkumised turul';
lang_from[271]   = 'Pakkumine';
lang_from[272]   = 'Ostmine';
lang_from[273]   = 'Kestab';
lang_from[274]   = 'Tegevus';
lang_from[275]   = 'Liiga vähe varusid';
lang_from[276]   = 'Max. aeg transpordiks:';
lang_from[277]   = 'tundi';
lang_from[278]   = 'Sum:';
lang_from[279]   = 'Järel:';
lang_from[280]   = 'Jaga varud';
lang_from[281]   = 'Saada kaupmehed';
lang_from[282]   = 'Saada sõdurid';
lang_from[283]   = 'See on sinu küla sõdurite kogunemispunkt. Siit marsitakse lahingusse, rüüsteretkele ja abivajajateni.';
lang_from[284]   = 'Sõdureid külas';
lang_from[285]   = 'Ülalpidamine';
lang_from[286]   = 'Saabuvad sõdurid';
lang_from[287]   = 'Saabumisaeg';
lang_from[288]   = 'kestvus';
lang_from[289]   = 'kell';
lang_from[290]   = 'Piisavalt varusid täna';
lang_from[291]   = 'Rünnak: Normaalne';
lang_from[292]   = 'Rünnak: Rüüsteretk';
lang_from[293]   = 'Lahingusimulaator';
lang_from[294]   = 'Ründaja';
lang_from[295]   = 'Kaitsja';
lang_from[296]   = 'Rünnaku tüüp';
lang_from[297]   = 'Loodus';
lang_from[298]   = 'Normaalne';
lang_from[299]   = 'Rüüste';
lang_from[300]   = 'Lahingu simulaator';
lang_from[301]   = 'Rüüsta okupeerimata oaasi';
lang_from[302]   = 'Raja uus küla';
lang_from[303]   = 'Saadaval asunikud)';
lang_from[304]   = 'Telliskivitehas';
lang_from[305]   = 'Peidikusse peidavad külaelanikud osa oma varudest, et vaenlane ründe korral neid endale ei saaks. Peidikusse peidetud varusi ei saa röövida.';
lang_from[306]   = 'Kasarmutes saad treenida erinevaid jalaväelasi. Hoone taseme tõstmine annab võimaluse treenida neid kiiremini.';
lang_from[307]   = 'Saatkond on koht, kus töötavad diplomaadid. Mida kõrgem on tase, seda enam saad liidus liikmete jaoks kohti juurde.';
lang_from[308]   = 'Kindluses saate treenida väejuhti ja hoone 10-ndast levelist saate temaga läheduses asuvaid oaase okupeerida.';
lang_from[309]   = 'Piisavalt varusid ülehomme';
lang_from[310]   = 'Akademies arendatakse uusi väeliike. Taseme tõstmisel saad tutvust teha uute väeliikidega, neid arendada ja hiljem kasutada oma sõjategevuses.';
lang_from[311]   = 'Sepikojas taotakse mõõka ja lihvitakse oda. Mida kõrgem on sepikoja tase, seda tugevamaid relvi neile valmistatakse.';
lang_from[312]   = 'hoolitseb, et sinu sõdurite kaitsevarustus oleks vastupidav vaenlase löökidele.';
lang_from[313]   = 'Residentsis elab kuningas või kuninganna ajal, kui ta külastab oma rahvast. Kuniks pole Residentsi hävitatud, kaitseb see küla vaenlase poolt ülevõtmise eest.';
lang_from[314]   = 'Palees elab kuningas või kuninganna, kes valitseb kogu sinu impeeriumi. Palee ehitusega saad määrata selle küla oma valduste pealinnaks.';
lang_from[315]   = 'Kivitöökojas töötavad kiviraidurid teavad täpselt kuidas kivi töödelda, et maja seisaks turvaliselt püsti. Suurendades töökoja taset muutuvad külas olevad majad stabiilsemaks.';
lang_from[316]   = 'Siin saavad jalad alla mängu kiireimad üksused - ratsavägi.';
lang_from[317]   = 'Veski toodab jahu ning vilja tootlikkus suureneb kuni 25 protsenti.';
lang_from[318]   = 'Saekaatris valmib kvaliteetne saematerjal. Saekaatri taset tõstes tõuseb puidutootlikkus kuni 25 protsenti.';
lang_from[319]   = 'Tehases valmistatakse savist kvaliteetseid telliseid. Arendamine tõstab tootlikkust kuni 25 protsenti.';
lang_from[320]   = 'Rauatöökojas sulatatakse rauda. Arendamine tõstab raua tootmismahtu kuni 25 protsenti.';
lang_from[321]   = 'Pagar küpsetab viljajahust maitsvat leiba. Juurdeehitus ja selle arendamine tõstab viljatootlikust kuni 50 protsenti.';
lang_from[322]   = 'Töökojas valmistatakse sõjamasinaid (nt. katapulte, taraane ja müürilõhkujaid). Mida kõrgem on tase, seda kiiremini sõjamasinad valmistatakse.';
lang_from[323]   = 'Raekojas saad oma külaelanike rõõmuks pidada suurejoonelisi pidustusi. Sellised peod aitavad koguda kultuuripunkte.';
lang_from[324]   = 'Kaubanduskoda hoolitseb kauba liikumise eest. Kaupmeestele muretsetakse uued ning mahukad vankrid ja ette rakendatakse jõulised hobused.';
lang_from[325]   = 'Staadionil treenivad sõdurid end sitkemateks ja vastupidavamateks. Hoone taseme uuendamine annab sõduritele võimaluse liikuda kiiremini minimaalselt 30-ne ruudu taha.';
lang_from[326]   = 'Oled edukalt välja loginud!';
lang_from[327]   = 'Tänan, et meid külastasid';
lang_from[328]   = 'Juhul kui sellest arvutist mängivad ka teised, siis turvalisuse huvides kustuta küpsised:';
lang_from[329]   = 'Kustuta küpsised';
lang_from[330]   = 'Sa pead lubama brauseril kasutada küpsiseid (cookies), et sisse logida. Juhul, kui sama arvutit kasutavad ka teised mängijad, pead iga kord mängimise lõpetamisel ennast korralikult välja logima, et keegi ei satuks tahtlikult nebo tahtmatult sinu mängukontole.';
lang_from[331]   = 'Travian on brauserimäng, mis liidab tuhandeid reaalseid mängijaid ühte maailma, pannes nad alguses juhtima üht väikest küla.';
lang_from[332]   = 'võtab aega umbes 60sek';
lang_from[333]   = 'Sa ei pea midagi kusagilt tõmbama, mäng on juba valmis mängimiseks.';
lang_from[334]   = 'Sa oled vastamisi reaalsete mängijatega eelajaloolises maailmas.';
lang_from[335]   = 'Ehita üles küla, astu julgelt sõjatandrile või kaubitse oma naabritega .';
lang_from[336]   = 'Juhul kui soovite aega veeta teiste Traviani mängijate keskel, külastage meie jutukat #travian.ee, mis asub serveris irc.travian.org:6667';
lang_from[337]   = 'käivitus';
lang_from[338]   = 'Sinu sõdurid';
lang_from[339]   = 'Piisavalt varusid homme';
lang_from[340]   = 'Päeva';
lang_from[341]   = 'kohe';
lang_from[342]   = 'Kuld';
lang_from[343]   = 'aktiveeri';
lang_from[344]   = 'Turule';
lang_from[345]   = 'Rünnakuboonus';
lang_from[346]   = 'Defboonus';
lang_from[347]   = 'Kauple NPC kaupmehega';
lang_from[348]   = 'Viib lõpule koheselt ehitus- ja arendustegevuse külas. (ei mõju Residentsile ja Paleele)';
lang_from[349]   = 'liiga vähe';
lang_from[350]   = 'Plus funktsioon';
lang_from[351]   = 'Kestvus';
lang_from[352]   = 'Hinnad';
lang_from[353]   = 'Mõjuaeg';
lang_from[354]   = 'konto';
lang_from[355]   = 'Peamajas elavad küla kõige tähtsamad tegelased - ehitajad. Peamaja arendamine motiveerib ehitajaid kiiremini ehitama.';
lang_from[356]   = 'Kivimüür';
lang_from[357]   = 'Kivimüür on tähtsaim kaitserajatis vaenlase vastu võideldes. Mida kõrgemal on tase, seda enam kaitseboonust saavad sinu sõdurid.';
lang_from[358]   = 'Metssiga';
lang_from[359]   = 'Hunti';
lang_from[360]   = 'Karu';
lang_from[361]   = 'Rotti';
lang_from[362]   = 'Ämblikku';
lang_from[363]   = 'Nahkhiirt';
lang_from[364]   = 'Hüljatud ala';
lang_from[365]   = 'Ussi';
lang_from[366]   = 'Krokodilli';
lang_from[367]   = 'Tiigrit';
lang_from[368]   = 'Rott';
lang_from[369]   = 'Hetkel:';
lang_from[370]   = 'Arv';
lang_from[371]   = 'maks.';
lang_from[372]   = 'Sinu kaupmehed on teel:';
lang_from[373]   = 'Saabuvad';
lang_from[374]   = 'saatis karavani külasse';
lang_from[375]   = 'saatis abijõud külale';
lang_from[376]   = 'Falangait';
lang_from[377]   = 'aega kulub';
lang_from[378]   = 'Rünnak';
lang_from[379]   = '(uus)';
lang_from[380]   = 'külast';
lang_from[381]   = 'Sõdureid';
lang_from[382]   = 'Hukkunuid';
lang_from[383]   = 'Saak';
lang_from[384]   = 'Sihtmärk:';
lang_from[385]   = 'Rüüsteretk külasse';
lang_from[386]   = '(lugemata)';
lang_from[387]   = 'kutsu tagasi';
lang_from[388]   = 'saada laiali';
lang_from[389]   = 'Sõdureid teistes külades';
lang_from[390]   = 'täiusta';
lang_from[391]   = 'Tase';
lang_from[392]   = 'Hoone:';
lang_from[393]   = 'Lammuta hoone:';
lang_from[394]   = 'Nõustu pakkumisega';
lang_from[395]   = 'Pakutakse';
lang_from[396]   = 'Ostetakse';
lang_from[397]   = 'Väejuhtide nimekiri';
lang_from[398]   = 'Ründe-boonus:';
lang_from[399]   = 'Def-boonus:';
lang_from[400]   = 'Elu taastamine:';
lang_from[401]   = 'Kogemus:';
lang_from[402]   = 'Väejuht omab';
lang_from[403]   = 'löögijõudu.';
lang_from[404]   = 'päevas';
lang_from[405]   = 'Imperaatori ratsanikku';
lang_from[406]   = 'Rajaleidjat';
lang_from[407]   = 'Püünised';
lang_from[408]   = 'vabasta';
lang_from[409]   = 'Sõdurid on teel';
lang_from[410]   = 'saada tagasi';
lang_from[411]   = 'püünist';
lang_from[412]   = 'Suudab hetkel maksimaalselt valmistada';
lang_from[413]   = 'Püüniste arv';
lang_from[414]   = 'Sul on hetkel';
lang_from[415]   = 'püünist ning';
lang_from[416]   = 'on sellest hõivatud.';






                                          
                                                break;

                                                }






lang_hu[416]   = 'plné zajmutými jednotkami.';
lang_hu[415]   = 'pastí jsou';
lang_hu[414]   = 'Z celkových';
lang_hu[413]   = 'Počet pastí při';
lang_hu[412]   = 'Aktuální možný počet pastí';
lang_hu[411]   = 'pastí';
lang_hu[410]   = 'odeslat zpět';
lang_hu[409]   = 'Jednotky na cestě';
lang_hu[408]   = 'propustit';
lang_hu[407]   = 'Past';
lang_hu[406]   = 'Slídičů';
lang_hu[405]   = 'Equites Imperátorisů';
lang_hu[404]   = 'den';
lang_hu[403]   = 'života.';
lang_hu[402]   = 'Váš hrdina má';
lang_hu[401]   = 'Zkušenosti';
lang_hu[400]   = 'Regenerace:';
lang_hu[399]   = 'Def-Bonus:';
lang_hu[398]   = 'Off-Bonus:';
lang_hu[397]   = 'Seznam hrdinů k vytrénování';
lang_hu[396]   = 'Sháním';
lang_hu[395]   = 'Nabízím';
lang_hu[394]   = 'Přijmout nabídku';
lang_hu[393]   = 'Bourání budov:';
lang_hu[392]   = 'Ve výstavbě:';
lang_hu[391]   = 'úroveň';
lang_hu[390]   = 'vylepši';
lang_hu[389]   = 'Jednotky v jiných vesnicích';
lang_hu[388]   = 'rozpustit jednotky';
lang_hu[387]   = 'stáhnout zpátky';
lang_hu[386]   = '(nepřečtené)';
lang_hu[385]   = 'Loupež proti';
lang_hu[384]   = 'Cíl:';
lang_hu[383]   = 'Kořist';
lang_hu[382]   = 'Ztráty';
lang_hu[381]   = 'Jednotky';
lang_hu[380]   = 'z vesnice';
lang_hu[379]   = '(nové)';
lang_hu[378]   = 'Útok';
lang_hu[377]   = 'za';
lang_hu[376]   = 'Falangů';
lang_hu[375]   = 'podpořil';
lang_hu[374]   = 'zásobil';
lang_hu[373]   = 'Příchod';
lang_hu[372]   = 'Vlastní obchodníci na cestě:';
lang_hu[371]   = 'max';
lang_hu[370]   = 'Počet';
lang_hu[369]   = 'K dispozici:';
lang_hu[368]   = 'Krysa';
lang_hu[367]   = 'Tygrů';
lang_hu[366]   = 'Krokodýlů';
lang_hu[365]   = 'Hadů';
lang_hu[364]   = 'Opuštěné údolí';
lang_hu[363]   = 'Netopýrů';
lang_hu[362]   = 'Pavouků';
lang_hu[361]   = 'Krys';
lang_hu[360]   = 'Medvědů';
lang_hu[359]   = 'Vlků';
lang_hu[358]   = 'Divočáků';
lang_hu[357]   = 'Městská zeď chrání vesnici proti drancujícím hordám nepřátel. Čím vyšší úroveň, tím vyšší dostávají tvé jednotky bonus k obraně.';
lang_hu[356]   = 'Městská zeď';
lang_hu[355]   = 'V hlavní budově bydlí stavitelé vesnice. Čím vyšší úroveň, tím rychleji stavíte nebo zvyšujete úrovně budov ve vesnici.';
lang_hu[354]   = 'účet';
lang_hu[353]   = 'Akce';
lang_hu[352]   = 'Cena';
lang_hu[351]   = 'Doba';
lang_hu[350]   = 'Plus funkce';
lang_hu[349]   = 'nedostatek';
lang_hu[348]   = 'Všechny rozpracované stavby a výzkumy v této vesnici okamžitě dokončit.';
lang_hu[347]   = 'obchod s NPC-obchodníkem';
lang_hu[346]   = 'Obrana';
lang_hu[345]   = 'Útok';
lang_hu[344]   = 'obchodovat';
lang_hu[343]   = 'aktivovat';
lang_hu[342]   = 'zlatých';
lang_hu[341]   = 'ihned';
lang_hu[340]   = 'dní';
lang_hu[339]   = 'Dostatek surovin zítra';
lang_hu[338]   = 'Vlastní jednotky';
lang_hu[337]   = 'spuštěn';
lang_hu[336]   = 'Pokud si chcete užít Travian ještě více, navštivte náš kanál # travian.ee umístěný na serveru irc.travian.org: 6667.';
lang_hu[335]   = 'Buduj vesnice, bojuj nebo bezstarostně obchoduj se svými sousedy.';
lang_hu[334]   = 'Hraješ s tisíci reálnými hráči ve stálém starodávném světě.';
lang_hu[333]   = 'Žádné stahování, hra je dostupná okamžitě.';
lang_hu[332]   = 'nezabere ani 60 sek.';
lang_hu[331]   = 'Travian je online hra pro kterou stačí mít obyčejný prohlížeč. Hraješ s tisíci hráči jako náčelník malé vesnice a vedeš obyvatele ke slavě a vítězství.';
lang_hu[330]   = 'Pro přihlášení do systému musíš aktivovat cookies. Z bezpečnostních důvodu zruš volbu automatické přihlášení v budoucnu pokud další lidi užívají tento počítač.';
lang_hu[329]   = 'Vymazat cookies';
lang_hu[328]   = 'Pokud další lidé užívají tento počítač, můžeš vymazat cookies pro vlastní bezpečnost:';
lang_hu[327]   = 'Děkujeme za tvou návštěvu';
lang_hu[326]   = 'Odhlášení bylo úspěšné!';
lang_hu[325]   = 'Na turnajovém hříšti můžou tví vojáci trénovat jejich výdrž. Čím větší úroveň, tím rychlejší tví vojáci jsou od vzdálenosti 30 políček.';
lang_hu[324]   = 'V obchodní kanceláři dostávají vozíky vylepšení a jsou vybavený silnějšími koňmi. Čím větší úroveň, tím více surovin obchodníci unesou.';
lang_hu[323]   = 'Na radnici máš možnost pro své obyvatele pořádat nádherné slavnosti. Tyto slavnosti přinášejí další kulturní body.';
lang_hu[322]   = 'V dílně můžeš vyrábět beranidla a katapulty. Čím větší úroveň, tím rychleji probíhá výroba.';
lang_hu[321]   = 'Mouka produkována v mlýně je zde užívána k pečení chleba. Podle úrovně se produkce obilí ve vesnici zvětší společně s mlýnem až o 50 procent.';
lang_hu[320]   = 'Zde probíhá tavení a vylepšování železa. Podle úrovně se produkce železa ve vesnici zvětší až o 25 procent.';
lang_hu[319]   = 'V cihelně se zpracovává hlína pro výrobu cihel. Podle úrovně se produkce hlíny ve vesnici zvětší až o 25 procent.';
lang_hu[318]   = 'Zde probíhá zpracovaní dřeva které dodávají dřevorubci. Podle úrovně se produkce dřeva ve vesnici zvětší až o 25 procent.';
lang_hu[317]   = 'Obilí donášené z polí je zde mleté na mouku. Podle úrovně se produkce obilí ve vesnici zvětší až o 25 procent.';
lang_hu[316]   = 'Ve stájích se cvičí jezdecké jednotky.';
lang_hu[315]   = 'Kameník je expert v zacházení s kamenem. Čím vyšší úroveň, tím stabilnější budou budovy v tvé vesnici.';
lang_hu[314]   = 'V paláci bydlí král nebo královna. Palác může být postaven jen v hlavní vesnici. Čím větší úroveň, tím těžší pro nepřátele převzít tuto vesnici.';
lang_hu[313]   = 'Rezidence je malý palác, kde bydlí král nebo královna při návštěvě této vesnice. Rezidence chrání vesnici před případným pokusem o dobytí tvé vesnice.';
lang_hu[312]   = 'je místo, kde probíhá vylepšování zbroje vojáků.';
lang_hu[311]   = 'Zde probíhá vylepšování zbraní vojáků. Čím větší úroveň, tím lepší zbraně můžou být ukovány. ';
lang_hu[310]   = 'V akademii máš možnost provádět výzkum lepších jednotek. Čím větší úroveň, tím dokonalejší jednotky máš k dispozici.';
lang_hu[309]   = 'Dostatek surovin';
lang_hu[308]   = 'V hrdinském dvoře můžeš vycvičit hrdinu, a od desáté úrovně budovy můžeš anektovat sousední oázy.';
lang_hu[307]   = 'Ambasáda je místo pro diplomaty. Čím větší úroveň, tím více možností má král otevřených.';
lang_hu[306]   = 'V kasárnách se trénují pěší jednotky. Čím větší úroveň, tím rychleji se trénují nové jednotky.';
lang_hu[305]   = 'Pro případ útoku na tvou vesnici máš možnost část surovin schovat do úkrytu. Tyto suroviny nemůžou loupežníci ukrást.';
lang_hu[304]   = 'Cihelna';
lang_hu[303]   = 'osadníků dostupných)';
lang_hu[302]   = 'Založit novou vesnici';
lang_hu[301]   = 'Prozkoumat opuštěné údolí';
lang_hu[300]   = 'Bitevní simulátor';
lang_hu[299]   = 'Loupež';
lang_hu[298]   = 'Normální';
lang_hu[297]   = 'Příroda';
lang_hu[296]   = 'Typ útoku';
lang_hu[295]   = 'Obránce';
lang_hu[294]   = 'Útočník';
lang_hu[293]   = 'Bitevní simulátor';
lang_hu[292]   = 'Útok: loupež';
lang_hu[291]   = 'Útok: normální';
lang_hu[290]   = 'Dostatek surovin';
lang_hu[289]   = 'v';
lang_hu[288]   = 'za';
lang_hu[287]   = 'Příchod';
lang_hu[286]   = 'Příchozí jednotky';
lang_hu[285]   = 'Výživa';
lang_hu[284]   = 'Jednotky ve vesnici';
lang_hu[283]   = 'Na shromaždišti se setkává vojsko vesnice. Odtud je možné odeslat jednotky k útoku, podpoře nebo k dobytí cizí vesnice.';
lang_hu[282]   = 'Poslat jednotky';
lang_hu[281]   = 'Poslat obchodníky';
lang_hu[280]   = 'Suroviny rozdělit';
lang_hu[279]   = 'Zůstatek:';
lang_hu[278]   = 'Součet:';
lang_hu[277]   = 'hod.';
lang_hu[276]   = 'Max. doba transportu:';
lang_hu[275]   = 'Nedostatek surovin';
lang_hu[274]   = 'Akce';
lang_hu[273]   = 'Doba';
lang_hu[272]   = 'Hledám';
lang_hu[271]   = 'Nabízím';
lang_hu[270]   = 'Nabídky na trhu';
lang_hu[269]   = 'surovin.';
lang_hu[268]   = 'Každý tvůj obchodník unese';
lang_hu[267]   = 'nebo';
lang_hu[266]   = 'Vesnice:';
lang_hu[265]   = 'Obchodníci';
lang_hu[264]   = 'Obchod s NPC';
lang_hu[263]   = 'Prodat';
lang_hu[262]   = 'Koupit';
lang_hu[261]   = 'Poslat suroviny';
lang_hu[260]   = 'Na tržišti můžeš obchodovat s jinými hráči. Čím větší úroveň, tím více obchodníků máš k dispozici.';
lang_hu[259]   = 'Počet zlatých:';
lang_hu[258]   = 'Psát zprávu';
lang_hu[257]   = 'Věk';
lang_hu[256]   = 'Obilí sklizené z polí se skladuje v sýpce. Čím vyšší úroveň, tím je její kapacita větší. Na úrovni 20 pak můžeš postavit další přídavné sýpky.';
lang_hu[255]   = 'Dříví, hlína a železo se hromadí ve skladu. Čím vyšší úroveň, tím je kapacita skladu větší. Na úrovni 20 pak můžeš postavit další přídavné sklady.';
lang_hu[254]   = 'Mouka je z Mlýna převezena do Pekárny, kde se z ní peče chléb. Spojení Pekárny a Mlýna zvýší tvoji produkci obilí až o 50%.';
lang_hu[253]   = 'V Mlýně se obilí mele na mouku. Každá další úroveň zvyšuje produkci obilí. Maximum je 25%.';
lang_hu[252]   = 'Železo se taví ve Slévárně. Každá další úroveň zvyšuje produkci železa. Maximum je 25%.';
lang_hu[251]   = 'V Cihelně se z hlíny pálí cihly. Každá další úroveň zvyšuje produkci hlíny. Maximum je 25%.';
lang_hu[250]   = 'Ze dřeva shromážděného Dřevorubcem se na Pile vyrábějí prkna. Každá další úroveň zvyšuje produkci dřeva. Maximum je 25%.';
lang_hu[249]   = 'Jídlo pro obyvatelstvo se pěstuje na obilných polích. Čím vyšší úroveň, tím více obilí je produkováno. Produkci obilných polí můžeš ještě zvýšit postavením Mlýnu a Pekárny.';
lang_hu[248]   = 'Jídlo pro obyvatelstvo se pěstuje na polích s pšenicí. Čím vyšší úroveň, tím více pšenice je produkováno.';
lang_hu[247]   = 'Železo se těží v železných dolech.Čím vyšší úroveň, tím více železa je produkováno.';
lang_hu[246]   = 'Hlína se hromadí v hliněných dolech. Čím vyšší úroveň hliněných dolů, tím více hlíny je produkováno.';
lang_hu[245]   = 'Dřevorubec kácí stromy a shromažďuje dřevo. Čím vyšší úroveň Dřevorubce, tím více dřeva vytěží.';
lang_hu[244]   = 'Kapacita';
lang_hu[243]   = 'Aktuální kapacita';
lang_hu[242]   = 'Pohyb jednotek';
lang_hu[241]   = 'Vyčkávací smyčka';
lang_hu[240]   = 'Nedostatek potravy';
lang_hu[239]   = 'Doba výcviku';
lang_hu[238]   = 'Výživa';
lang_hu[237]   = 'suroviny';
lang_hu[236]   = 'Nosnost';
lang_hu[235]   = 'hod.';
lang_hu[234]   = 'polí';
lang_hu[233]   = 'Rychlost';
lang_hu[232]   = 'Náčelník';
lang_hu[231]   = 'Haeduan';
lang_hu[230]   = 'Druid jezdec';
lang_hu[229]   = 'Theutates Blesk';
lang_hu[228]   = 'Slídič';
lang_hu[227]   = 'Šermíř';
lang_hu[226]   = 'Falanga';
lang_hu[225]   = 'Kmenový vůdce';
lang_hu[224]   = 'Beranidlo';
lang_hu[223]   = 'Teuton jezdec';
lang_hu[222]   = 'Rytíř';
lang_hu[221]   = 'Zvěd';
lang_hu[220]   = 'Sekerník';
lang_hu[219]   = 'Oštěpař';
lang_hu[218]   = 'Pálkař';
lang_hu[217]   = 'Osadník';
lang_hu[216]   = 'Senátor';
lang_hu[215]   = 'Katapult';
lang_hu[214]   = 'Římanské beranidlo';
lang_hu[213]   = 'Equites Caesaris';
lang_hu[212]   = 'Equites Imperatoris';
lang_hu[211]   = 'Equites Legáti';
lang_hu[210]   = 'Imperián';
lang_hu[209]   = 'Pretorián';
lang_hu[208]   = 'Legionář';
lang_hu[207]   = 'Rozšířit';
lang_hu[206]   = 'Doba stavby';
lang_hu[205]   = 'Aktuální doba stavby';
lang_hu[204]   = 'zobrazit další';
lang_hu[203]   = 'Postavit budovu';
lang_hu[202]   = 'skrýt brzy dostupné';
lang_hu[201]   = 'zobrazit brzy dostupné';
lang_hu[200]   = 'Postavit novou budovu';
lang_hu[199]   = 'žádné';
lang_hu[198]   = 'Požadavky';
lang_hu[197]   = 'Velká sýpka';
lang_hu[196]   = 'Velký sklad';
lang_hu[195]   = 'Kameník';
lang_hu[194]   = 'Obchodní kancelář';
lang_hu[193]   = 'Pokladnice';
lang_hu[192]   = 'Palác';
lang_hu[191]   = 'Rezidence';
lang_hu[190]   = 'Radnice';
lang_hu[189]   = 'Úkryt';
lang_hu[188]   = 'Ambasáda';
lang_hu[187]   = 'Tržiště';
lang_hu[186]   = 'Hlavní budova';
lang_hu[185]   = 'Hrdinský dvůr';
lang_hu[184]   = 'Pasti';
lang_hu[183]   = 'Velká stáj';
lang_hu[182]   = 'Velké kasárny';
lang_hu[181]   = 'Akademie';
lang_hu[180]   = 'Dílna';
lang_hu[179]   = 'Stáje';
lang_hu[178]   = 'Kasárny';
lang_hu[177]   = 'Shromaždiště';
lang_hu[176]   = 'Turnajové hřiště';
lang_hu[175]   = 'Zbrojnice';
lang_hu[174]   = 'Kovárna';
lang_hu[173]   = 'Sýpka';
lang_hu[172]   = 'Sklad surovin';
lang_hu[171]   = 'Pekárna';
lang_hu[170]   = 'Mlýn';
lang_hu[169]   = 'Slévárna';
lang_hu[168]   = 'Cihelna';
lang_hu[167]   = 'Pila';
lang_hu[166]   = 'Stavitelé mají momentálně hodně práce';
lang_hu[165]   = 'Tento návod neobsahuje všechny informace. Pro více informací se koukni do manuálu.';
lang_hu[164]   = 'V tomto návodě rychle najdeš základní informace které potřebuješ.';
lang_hu[163]   = 'Manuál';
lang_hu[162]   = 'Infrastruktura';
lang_hu[161]   = 'Vojenské';
lang_hu[160]   = 'Surovinové';
lang_hu[159]   = 'Budovy';
lang_hu[158]   = 'Čas serveru';
lang_hu[157]   = 'Vynegerováno za';
lang_hu[156]   = 'Zde se produkuje hlína. Čím větší úroveň, tím více hlíny je produkováno.';
lang_hu[155]   = 'Zde horníci získávají cennou surovinu železo. Čím větší úroveň, tím více železa je produkováno.';
lang_hu[154]   = 'Dřevorubec těží dřevo. Čím větší úroveň má, tím více dřeva natěží.';
lang_hu[153]   = 'Zde farmáři produkují obilí pro výživu obyvatel. Čím větší úroveň, tím více obilí je produkováno.';
lang_hu[152]   = 'pro rozšíření';
lang_hu[151]   = 'Potřebné suroviny';
lang_hu[150]   = 'úroveň';
lang_hu[149]   = 'při úrovni';
lang_hu[148]   = 'na úroveň';
lang_hu[147]   = 'Hliněný důl';
lang_hu[146]   = 'Železný důl';
lang_hu[145]   = 'Travian Games GmbH, do CZ z estonštiny přeloženo Cakenem';
lang_hu[144]   = 'Potřebné suroviny pro rozšíření na úroveň';
lang_hu[143]   = 'Produkce';
lang_hu[142]   = 'Aktuální produkce:';
lang_hu[141]   = 'Obilné pole';
lang_hu[140]   = 'Dřevorubec';
lang_hu[139]   = 'Hotovo v';
lang_hu[138]   = 'Chat';
lang_hu[137]   = 'Fórum';
lang_hu[136]   = 'Suroviny';
lang_hu[135]   = 'Zloději týdne';
lang_hu[134]   = 'Postup';
lang_hu[133]   = 'Stavitelé týdne';
lang_hu[132]   = 'Obránci týdne';
lang_hu[131]   = 'Útočníci týdne';
lang_hu[130]   = 'Ztráty';
lang_hu[129]   = 'Útoky';
lang_hu[128]   = 'Jiný';
lang_hu[127]   = 'procent';
lang_hu[126]   = 'registrováno';
lang_hu[125]   = 'Národy';
lang_hu[124]   = 'Registrovaných hráčů:';
lang_hu[123]   = 'Nejúspěšnější obránci';
lang_hu[122]   = 'Nejúspěšnější útočníci';
lang_hu[121]   = 'Body';
lang_hu[120]   = 'Největší aliance';
lang_hu[119]   = 'Obyvatel';
lang_hu[118]   = 'Vesnice';
lang_hu[117]   = 'Největší vesnice';
lang_hu[116]   = 'Všeobecně';
lang_hu[115]   = 'Def';
lang_hu[114]   = 'Off';
lang_hu[113]   = 'Aliance';
lang_hu[112]   = 'Největší hráči';
lang_hu[111]   = 'Support';
lang_hu[110]   = 'Příjemce';
lang_hu[109]   = 'Odesílatel';
lang_hu[108]   = 'Nemáte žádné odeslané zprávy.';
lang_hu[107]   = 'Odeslané';
lang_hu[106]   = 'Psát';
lang_hu[105]   = 'Doručené';
lang_hu[104]   = 'Zprávy';
lang_hu[103]   = 'Nejsou žádna hlášení';
lang_hu[102]   = 'Odesláno';
lang_hu[101]   = 'Předmět';
lang_hu[100]   = 'Ostatní';
lang_hu[99]   = 'Útoky';
lang_hu[98]   = 'Podpora';
lang_hu[97]   = 'Obchod';
lang_hu[96]   = 'Všechny';
lang_hu[95]   = 'Hlášení';
lang_hu[94]   = 'Každý hráč by měl mít JEN JEDEN ÚČET! Ale na to vám každej sere :-D';
lang_hu[93]   = 'Jiho-východ';
lang_hu[92]   = 'Severo-východ';
lang_hu[91]   = 'Jiho-západ';
lang_hu[90]   = 'Severo-západ';
lang_hu[89]   = 'Náhodně';
lang_hu[88]   = 'Galové';
lang_hu[87]   = 'Germáni';
lang_hu[86]   = 'Římané';
lang_hu[85]   = 'Jméno';
lang_hu[84]   = 'Prozkoumat opuštěné údolí (Vybudovat shromáždiště)';
lang_hu[83]   = 'informace';
lang_hu[82]   = 'Poslat obchodníky (Vybudovat tržiště)';
lang_hu[81]   = 'Poslat jednotky (Vybudovat shromáždiště)';
lang_hu[80]   = 'Obsazené údolí';
lang_hu[79]   = 'Obilná pole';
lang_hu[78]   = 'Železná ruda';
lang_hu[77]   = 'Hliniště';
lang_hu[76]   = 'Dřevorubci';
lang_hu[75]   = 'Rozdělení půdy';
lang_hu[74]   = 'Založit novou vesnici (Vybudovat shromáždiště)';
lang_hu[73]   = 'Vycentrovat mapu';
lang_hu[72]   = 'Volby';
lang_hu[71]   = 'Nejsou dostupné';
lang_hu[70]   = 'Majitel';
lang_hu[69]   = 'Obyvatelé:';
lang_hu[68]   = 'Mapa';
lang_hu[67]   = 'Můžeš určit maximálně 2 zástupce.';
lang_hu[66]   = 'Prvních 24 hodin máš možnost zrušit tento proces.';
lang_hu[65]   = 'bude smazán za';
lang_hu[64]   = 'Tady máš možnost smazat svůj účet. Po potvrzení potrvá 3 dny do konečného smazáni.';
lang_hu[63]   = 'Smazat účet';
lang_hu[62]   = 'Jméno hráče:';
lang_hu[61]   = 'Pokud pravidelně používáš stejné PC s jiným hráčem, musíš sem zadat jméno jeho účtu.';
lang_hu[60]   = 'Společné užívání PC';
lang_hu[59]   = 'U následujících hráčů jsi zapsán jako zástupce. Toto zastoupení můžeš zrušit kliknutím na červené X.';
lang_hu[58]   = 'Jméno zástupce';
lang_hu[57]   = 'Zástupce účtu může, za použití tvého jména a jeho hesla, přihlásit se do tvého účtu.';
lang_hu[56]   = 'Zástupce účtu';
lang_hu[55]   = 'Nový email';
lang_hu[54]   = 'Starý email';
lang_hu[53]   = 'Zadej prosím svoji starou a novou e-mailovou adresu. Dostaneš na každou z nich kus kódu, který zde musíš zadat.';
lang_hu[52]   = 'Změna emailu';
lang_hu[51]   = 'Nové heslo';
lang_hu[50]   = 'Staré heslo';
lang_hu[49]   = 'Změna hesla';
lang_hu[48]   = 'Datum';
lang_hu[47]   = 'Časové pásmo';
lang_hu[46]   = 'Zde můžeš změnit čas svého časového pásma';
lang_hu[45]   = 'Časové předvolby';
lang_hu[44]   = 'Název vesnice';
lang_hu[43]   = 'Bydliště';
lang_hu[42]   = 'Pohlaví';
lang_hu[41]   = 'Den narození';
lang_hu[40]   = 'Hlavní vesnice';
lang_hu[39]   = 'Detaily';
lang_hu[38]   = 'Hráč';
lang_hu[37]   = 'Popis';
lang_hu[36]   = 'Souřadnice';
lang_hu[35]   = 'Obyvatelé';
lang_hu[34]   = 'úprava profilu';
lang_hu[33]   = 'Populace';
lang_hu[32]   = 'Vesnic';
lang_hu[31]   = 'Aliance';
lang_hu[30]   = 'Národ';
lang_hu[29]   = 'Místo';
lang_hu[28]   = 'Grafické balíky';
lang_hu[27]   = 'Účet';
lang_hu[26]   = 'Nastavení';
lang_hu[25]   = 'Profil';
lang_hu[24]   = 'Přehled';
lang_hu[23]   = 'Profil';
lang_hu[22]   = 'žádné';
lang_hu[21]   = 'Jednotky';
lang_hu[20]   = 'za hodinu';
lang_hu[19]   = 'Obilí';
lang_hu[18]   = 'Železo';
lang_hu[17]   = 'Hlína';
lang_hu[16]   = 'Dřevo';
lang_hu[15]   = 'Produkce:';
lang_hu[14]   = 'Vesnice:';
lang_hu[13]   = 'Odhlášení';
lang_hu[12]   = 'Úvod';
lang_hu[11]   = 'Heslo';
lang_hu[10]   = 'Jméno';
lang_hu[9]   = 'Registrovaných:';  
lang_hu[8]   = 'Online';
lang_hu[7]   = 'Aktivních:';
lang_hu[6]   = 'Registrovaných:';
lang_hu[5]   = 'Registrace';
lang_hu[4]   = 'Login';
lang_hu[3]   = 'Tutorial'; 
lang_hu[2]   = 'Manuál';
lang_hu[1]   = 'Úvod';

                                                //lang_
                                                
                                                
                                                var textnodes = document.evaluate(
                                                    "//text()",
                                                    document,
                                                    null,
                                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                                    null);
                                                
                                                var titlenodes = document.evaluate(
                                                    "//area[@href]",
                                                    document,
                                                    null,
                                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                                    null);
                                                
                                                
                                                for (var i = 0; i < textnodes.snapshotLength; i++) {
                                                    node = textnodes.snapshotItem(i);
                                                    str = node.data;
                                                    for (keys in lang_from) {
                                                			  if (str == lang_from[keys]){
                                                          str = str.replace(lang_from[keys],lang_hu[keys]);
                                                        }
                                                    }
                                                    node.data = str;
                                                }
                                                
                                                for (var i = 0; i < textnodes.snapshotLength; i++) {
                                                    node = textnodes.snapshotItem(i);
                                                    str = node.data;
                                                    for (keys in lang_from) {
                                                          str = str.replace(lang_from[keys],lang_hu[keys]);
                                                    }
                                                    node.data = str;
                                                }
                                                
                                                
                                                for (var i = 0; i < titlenodes.snapshotLength; i++) {
                                                    node = titlenodes.snapshotItem(i);
                                                    str = node.getAttribute("title");
                                                    //alert(str);
                                                    for (keys in lang_from) {
                                                        if (str == lang_from[keys]){
                                                          str = str.replace(lang_from[keys],lang_hu[keys]);
                                                        }
                                                    }
                                                    node.setAttribute("title",str);
                                                }
                                                
                                                for (var i = 0; i < titlenodes.snapshotLength; i++) {
                                                    node = titlenodes.snapshotItem(i);
                                                    str = node.getAttribute("title");
                                                    //alert(str);
                                                    for (keys in lang_from) {
                                                          str = str.replace(lang_from[keys],lang_hu[keys]);
                                                    }
                                                    node.setAttribute("title",str);
                                                }
                                                
                                              
        
        //Code
        var menu = document.getElementById('lright1');
        if(menu == null) { //Just one village
          menu = document.createElement('div');
          menu.setAttribute('id','lright1');
          document.getElementById('lmidall').appendChild(menu);
        }
        menu.appendChild(document.createElement('br'));
        
        var elemB, elemBa, elemUL, elemLI, elemA;
        
        /* Links Menu */
        elemB  = document.createElement('b');
        
        elemB.setAttribute("style", "font-size:8pt; color:blue");
        menu.appendChild(elemB)
        
        /* Links Menu */
        elemBa  = document.createElement('b');
        
        elemBa.setAttribute("style", "font-size:8pt; color:Red");
        menu.appendChild(elemBa)
        
        elemUL = document.createElement('ul');
        elemUL.setAttribute('class','dl');
        menu.appendChild(elemUL)
        
        for each ( var link in links ){
            elemLI = document.createElement('li');
            elemLI.setAttribute('class','dl');
        
            elemA = document.createElement('a');
            elemA.href = link[1];
            elemA.appendChild(document.createTextNode(link[0]));
        
            elemLI.appendChild(elemA);
            elemUL.appendChild(elemLI);
        }

                                        