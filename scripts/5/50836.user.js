// ==UserScript==
// @name           Kraland Profil ++
// @namespace      kraland
// @version        1.2
// @description    Améliore la page de profil en rajoutant des liens vers le nom du conjoint et celui de la ville de domiciliation
// @include        http://www.kraland.org/main.php?page=5;1;3;0;0&p2=*
// @include        http://www.kraland.org/main.php?page=5;1;3;1;0&p2=*
// ==/UserScript==

var trophee = function()
{
    var strong = document.getElementsByTagName('strong');
    if (strong.lentgh == 0) return 0;
    for (var i=0;i<strong.length;i++)
    {
        //alert(strong[i].firstChild.innerHTML);
        if(strong[i].firstChild.innerHTML.search('Trophées') != -1)
        {
            strong[i].firstChild.innerHTML = '<a href="http://kraland.trophee.free.fr/" target="_blank">Trophées</a>';
        }
    }
    
    var cases = document.getElementsByTagName('td');
    if (cases.lentgh == 0) return 0;
    for (var i=0;i<cases.length;i++)
    {
        //alert(strong[i].firstChild.innerHTML);
        var pos = cases[i].innerHTML.search(/mari[ée]+\savec\s(.*)/);
        if(pos != -1)
        {
            var origin_name = RegExp.$1;
            var name = origin_name.replace(/<.*>/,' ');
            cases[i].innerHTML = '<a href="http://www.tourniaire.org/~mouton/kraland/stats/names.php?id='+name+'">'+origin_name+'</a>';
            //alert(RegExp.$1);
            //alert(name);
            //strong[i].firstChild.innerHTML = '<a href="http://kraland.trophee.free.fr/" target="_blank">Trophées</a>';
            continue;
        }
        
        if(cases[i].innerHTML.search('Domiciliation') != -1)
        {
            var villes = new Array();
villes[0] = new Array("Abandon",27);
villes[1] = new Array("Abayok",70);
villes[2] = new Array("Abelia",296);
villes[3] = new Array("Abjectia",437);
villes[4] = new Array("Adalbograd",89);
villes[5] = new Array("Adam",77);
villes[6] = new Array("Agüsire",38);
villes[7] = new Array("Aïniro",337);
villes[8] = new Array("Aire Ratum",250);
villes[9] = new Array("Alcoolisséo",283);
villes[10] = new Array("Alecto",347);
villes[11] = new Array("Alexène",33);
villes[12] = new Array("Altheim-Neufra",182);
villes[13] = new Array("Antagône",360);
villes[14] = new Array("Anthracite",40);
villes[15] = new Array("Antre du Loup",118);
villes[16] = new Array("Aphrodisia",124);
villes[17] = new Array("Arcania",302);
villes[18] = new Array("Atlantis",199);
villes[19] = new Array("Auguste Perspective",44);
villes[20] = new Array("Avalon",297);
villes[21] = new Array("Babouna Bananou",204);
villes[22] = new Array("Bagdad",72);
villes[23] = new Array("Bamboutopia",186);
villes[24] = new Array("Banque-Route",178);
villes[25] = new Array("Base des Froques Brunes",9);
villes[26] = new Array("Basilik",309);
villes[27] = new Array("Bergerie 51",429);
villes[28] = new Array("Billou",46);
villes[29] = new Array("Bisouville",56);
villes[30] = new Array("Blofeldopolis",106);
villes[31] = new Array("Bordure",134);
villes[32] = new Array("Bottine",67);
villes[33] = new Array("Boulet-City",123);
villes[34] = new Array("Box",116);
villes[35] = new Array("Brilla",193);
villes[36] = new Array("Bug",153);
villes[37] = new Array("Butte Rouge",75);
villes[38] = new Array("Caer O'Saurus",290);
villes[39] = new Array("Cafay Nwaar",524);
villes[40] = new Array("Calisse",166);
villes[41] = new Array("Camp des Bagnards",103);
villes[42] = new Array("Campus Lunaire",171);
villes[43] = new Array("Campus Solaire",175);
villes[44] = new Array("Cap Kranaveral",343);
villes[45] = new Array("Caps",115);
villes[46] = new Array("Caps Lock",188);
villes[47] = new Array("Carapace",251);
villes[48] = new Array("Carapace de la Tortue",117);
villes[49] = new Array("Carcéral",87);
villes[50] = new Array("Carmin",141);
villes[51] = new Array("Céladon",113);
villes[52] = new Array("Cénacle",164);
villes[53] = new Array("Cerberus",425);
villes[54] = new Array("Cerisier caché",353);
villes[55] = new Array("Champ de Fleurs",127);
villes[56] = new Array("Chapelle",159);
villes[57] = new Array("ChiKhago",285);
villes[58] = new Array("Cité de MidGard",191);
villes[59] = new Array("Cité des Warriors",168);
villes[60] = new Array("Cité Funeste",277);
villes[61] = new Array("Cité Portuaire",91);
villes[62] = new Array("Cité Universitaire Brune",8);
villes[63] = new Array("CLaPoz Village",177);
villes[64] = new Array("Club Pampardiladada",462);
villes[65] = new Array("Colisée",161);
villes[66] = new Array("Colonos",207);
villes[67] = new Array("Corne d'Or",136);
villes[68] = new Array("Coronessan",213);
villes[69] = new Array("Coupe Gorge",7);
villes[70] = new Array("Coupiville",200);
villes[71] = new Array("Crève Coeur",276);
villes[72] = new Array("Cristal",110);
villes[73] = new Array("Crypte",156);
villes[74] = new Array("Cyrakuse",377);
villes[75] = new Array("Démograd",158);
villes[76] = new Array("Desperado",222);
villes[77] = new Array("Déstructural",155);
villes[78] = new Array("Diegesys",215);
villes[79] = new Array("Diocèse de l'Abondance",21);
villes[80] = new Array("Diocèse de l'Inquisition",20);
villes[81] = new Array("Diocèse de l'Omniscience",23);
villes[82] = new Array("Diocèse de la Foi",22);
villes[83] = new Array("Diocèse du Châtiment",19);
villes[84] = new Array("Diocèse Tutélaire",24);
villes[85] = new Array("Dionaea",216);
villes[86] = new Array("Dograde",83);
villes[87] = new Array("Dôjo des Mille Saveurs",104);
villes[88] = new Array("Doroville",68);
villes[89] = new Array("Drakie",88);
villes[90] = new Array("Écaille du Serpent",120);
villes[91] = new Array("Ecclesia",184);
villes[92] = new Array("Edoria",327);
villes[93] = new Array("Effrak",51);
villes[94] = new Array("Ekazur",140);
villes[95] = new Array("Eldorado City",201);
villes[96] = new Array("Elektron",231);
villes[97] = new Array("Elevage",59);
villes[98] = new Array("Elision",306);
villes[99] = new Array("Elméroville",42);
villes[100] = new Array("Eragone",338);
villes[101] = new Array("Erjuggergrad",108);
villes[102] = new Array("Esquiville",86);
villes[103] = new Array("Evangel",488);
villes[104] = new Array("Fabrike Kollektivisée De Chocapics.",541);
villes[105] = new Array("Faux Bourg",206);
villes[106] = new Array("Felvie",125);
villes[107] = new Array("Fey-Eryndenn",376);
villes[108] = new Array("Flammes de Tristesse",225);
villes[109] = new Array("Fongus",34);
villes[110] = new Array("Fort Mégalo",426);
villes[111] = new Array("Fort-Emouchet",157);
villes[112] = new Array("Forteresse de Redgrad",439);
villes[113] = new Array("Forum",84);
villes[114] = new Array("Forum d'Hiver",180);
villes[115] = new Array("Fraternograd",248);
villes[116] = new Array("Ftagh'n City",226);
villes[117] = new Array("Gaerall",295);
villes[118] = new Array("Galbée",147);
villes[119] = new Array("Garinaville",25);
villes[120] = new Array("Gecko City",173);
villes[121] = new Array("Ghoultown",372);
villes[122] = new Array("Glendalough",310);
villes[123] = new Array("GoldTown",208);
villes[124] = new Array("GoldTown Marina Beach",259);
villes[125] = new Array('Golf National "Le Swing du Dr."',234);
villes[126] = new Array("Gradoplage",253);
villes[127] = new Array("Gradoville",149);
villes[128] = new Array("Grand Dôme",57);
villes[129] = new Array("Grand Sayaman",165);
villes[130] = new Array("Gueule du Lézard",122);
villes[131] = new Array("Gymnase",163);
villes[132] = new Array("Gynerak",81);
villes[133] = new Array("Habana",94);
villes[134] = new Array("Holmganga",424);
villes[135] = new Array("Honolulu-Centre",73);
villes[136] = new Array("Igloo",29);
villes[137] = new Array("Ile de Gaïa",257);
villes[138] = new Array("Imprenable",63);
villes[139] = new Array("Iréelle",48);
villes[140] = new Array("Ivresse",65);
villes[141] = new Array("Jade",126);
villes[142] = new Array("Jadeite",92);
villes[143] = new Array("Jardin des Bruyères",129);
villes[144] = new Array("Jardin des Jasmins",130);
villes[145] = new Array("Jardin des Jonquilles",128);
villes[146] = new Array("Jardin des Myosotis",132);
villes[147] = new Array("Jardin des Oeillets",131);
villes[148] = new Array("Jardin des Roses",133);
villes[149] = new Array("Jouy l'abbé",267);
villes[150] = new Array("Joyeuse Porte",135);
villes[151] = new Array("Kaline",144);
villes[152] = new Array("Kamarak",82);
villes[153] = new Array("Kamp 333",214);
villes[154] = new Array("Kanardville",99);
villes[155] = new Array("Kap Horn",389);
villes[156] = new Array("Kasbah Muad'Dib",506);
villes[157] = new Array("Kattleya",367);
villes[158] = new Array("Ker'Keneil",305);
villes[159] = new Array("Koma",431);
villes[160] = new Array("Koukouroukoukou",80);
villes[161] = new Array("Kouyan",194);
villes[162] = new Array("Koyaba",292);
villes[163] = new Array("Kradistan",143);
villes[164] = new Array("Krakenopolis",181);
villes[165] = new Array("Krakov",148);
villes[166] = new Array("Krollywood",192);
villes[167] = new Array("Kyslev",190);
villes[168] = new Array("l'Enclave",466);
villes[169] = new Array("L'Esprit de Mind",361);
villes[170] = new Array("La Cache aux Trésors",342);
villes[171] = new Array("La Grande Allée avec plein de Statues",262);
villes[172] = new Array("La Porte DesMontsNiak",335);
villes[173] = new Array("Laboratoire mobile en kit",539);
villes[174] = new Array("Lac de la Dame",373);
villes[175] = new Array("Lampe du Génie",96);
villes[176] = new Array("Lantenac-du-Lac",154);
villes[177] = new Array("Le bord du Nil",368);
villes[178] = new Array("Le Bunker Secret Qui n'Existe Pas",287);
villes[179] = new Array("Le Coeur de Sabrina",363);
villes[180] = new Array("Le coin du Cybermonde",260);
villes[181] = new Array("Le Corps de Nacht-Wölf",362);
villes[182] = new Array("Le Pays Imaginaire",284);
villes[183] = new Array("Le Village Gaulois",378);
villes[184] = new Array("Léprosie",101);
villes[185] = new Array("Les Îles Sandwich",107);
villes[186] = new Array("Les Sens d'Eyelith",364);
villes[187] = new Array("LexPointCom",311);
villes[188] = new Array("Lilith",69);
villes[189] = new Array("Locke Ness",291);
villes[190] = new Array("Lunargent",298);
villes[191] = new Array("Maison de Nobanion",210);
villes[192] = new Array("Maison Saori",71);
villes[193] = new Array("Mâle-in-Ville",346);
villes[194] = new Array("Marché Noir",10);
villes[195] = new Array("Maudite",288);
villes[196] = new Array("Melun-Centre",62);
villes[197] = new Array("Méta-Concept",97);
villes[198] = new Array("Métalville",102);
villes[199] = new Array("Moldatown",249);
villes[200] = new Array("Mont Saint-Mauvais",422);
villes[201] = new Array("Monte-Oktavio",195);
villes[202] = new Array("Mousse",139);
villes[203] = new Array("Myrtille",187);
villes[204] = new Array("NaarDeath",428);
villes[205] = new Array("Naaropolis",41);
villes[206] = new Array("Naartican",185);
villes[207] = new Array("Nablacité",74);
villes[208] = new Array("Napleone",196);
villes[209] = new Array("Napline",49);
villes[210] = new Array("Necrograd",273);
villes[211] = new Array("Nécropolis-sur-mer",212);
villes[212] = new Array("Nerv",93);
villes[213] = new Array("Nicolie",30);
villes[214] = new Array("Nid du Hibou",121);
villes[215] = new Array("Noyau",64);
villes[216] = new Array("Num Lock",54);
villes[217] = new Array("Nymphea",366);
villes[218] = new Array("Oasis Féline",209);
villes[219] = new Array("Ocha",137);
villes[220] = new Array("Oecumenia",472);
villes[221] = new Array("Orinia",145);
villes[222] = new Array("Oshiriville",32);
villes[223] = new Array("Ovéah",47);
villes[224] = new Array("Ovule'Opolis",227);
villes[225] = new Array("Paglop",26);
villes[226] = new Array("Palairme",39);
villes[227] = new Array("Palais Popesque",100);
villes[228] = new Array("Palla Vegas",525);
villes[229] = new Array("Panthéon",162);
villes[230] = new Array("Parrine",50);
villes[231] = new Array("Paskajie",138);
villes[232] = new Array("Pâturage",60);
villes[233] = new Array("Peamak-City",52);
villes[234] = new Array("Pénitence",205);
villes[235] = new Array("Petograd",176);
villes[236] = new Array("Pickham",397);
villes[237] = new Array("Pingouin-Ville",36);
villes[238] = new Array("Pirée",160);
villes[239] = new Array("Plénitude",183);
villes[240] = new Array("Poing de la Grande Déesse",109);
villes[241] = new Array("Portail de l'Enfer",11);
villes[242] = new Array("Pouf",55);
villes[243] = new Array("Poulpe",167);
villes[244] = new Array("Pourproville",151);
villes[245] = new Array("Punkistan",217);
villes[246] = new Array("Quartier du Bonheur",3);
villes[247] = new Array("Quartier du Savoir",5);
villes[248] = new Array("Quartier Fortifié",2);
villes[249] = new Array("Quartier Saint",4);
villes[250] = new Array("Quartier Suprême",6);
villes[251] = new Array("Quartier sur les Eaux",1);
villes[252] = new Array("Quasar",35);
villes[253] = new Array("Quiétude",174);
villes[254] = new Array("R'lyeh sous Magmor",497);
villes[255] = new Array("Racoon City",219);
villes[256] = new Array("Rédemption",303);
villes[257] = new Array("Réunion",66);
villes[258] = new Array("Rhysode Island",446);
villes[259] = new Array("Romène",37);
villes[260] = new Array("Rouge Promesse",390);
villes[261] = new Array("Rouille",146);
villes[262] = new Array("Route 69",423);
villes[263] = new Array("Ruines de l'elbuche",512);
villes[264] = new Array("Rùna",536);
villes[265] = new Array("Ruthvenville",90);
villes[266] = new Array("Safari",78);
villes[267] = new Array("Sanatorium de requiem",505);
villes[268] = new Array("Santa Banana City",12);
villes[269] = new Array("Sbleunatérak",28);
villes[270] = new Array("Secteur Commercial",15);
villes[271] = new Array("Secteur Militaire",14);
villes[272] = new Array("Secteur Portuaire",13);
villes[273] = new Array("Secteur Religieux",16);
villes[274] = new Array("Secteur Restreint",18);
villes[275] = new Array("Secteur Scientifique",17);
villes[276] = new Array("Seeburg",179);
villes[277] = new Array("Serra",114);
villes[278] = new Array("Shadock",43);
villes[279] = new Array("Sherwood",247);
villes[280] = new Array("Shikrit",79);
villes[281] = new Array("Sibia",197);
villes[282] = new Array("Sixtine",324);
villes[283] = new Array("Smallville",325);
villes[284] = new Array("St-Pethrus-Les-Deux-Eglises",211);
villes[285] = new Array("Station de ski",457);
villes[286] = new Array("Stock de bière du Cybermonde",484);
villes[287] = new Array("Stock de moteurs du Staff",471);
villes[288] = new Array("Structural",152);
villes[289] = new Array("Superfétatown",172);
villes[290] = new Array("Survivance",31);
villes[291] = new Array("Syndic City",323);
villes[292] = new Array("Tabris",85);
villes[293] = new Array("Teldrassil",198);
villes[294] = new Array("Temple Noir",487);
villes[295] = new Array("Tepes City",218);
villes[296] = new Array("Tequila",95);
villes[297] = new Array("Tétosia",341);
villes[298] = new Array("Thalisséo",278);
villes[299] = new Array("Todai",202);
villes[300] = new Array("Tradiland",268);
villes[301] = new Array("Trésorville",58);
villes[302] = new Array("Tribunal Cybermondial",98);
villes[303] = new Array("Trou Perdu",61);
villes[304] = new Array("Tunnel de Fourmi",119);
villes[305] = new Array("Urbe Voluptae",203);
villes[306] = new Array("Vacuité",105);
villes[307] = new Array("Venice",252);
villes[308] = new Array("Venin",53);
villes[309] = new Array("Verglie",111);
villes[310] = new Array("Vice",150);
villes[311] = new Array("Village maudit des démons",433);
villes[312] = new Array("Ville Refuge",142);
villes[313] = new Array("Vladivostrok",345);
villes[314] = new Array("Volupté",76);
villes[315] = new Array("Wabylone",189);
villes[316] = new Array("Yabon",45);
villes[317] = new Array("Yabon-la-Forêt",170);
villes[318] = new Array("Yggdrasil",328);

            for (var y=0; y<villes.length;y++)
            {
                if (cases[i].nextSibling.innerHTML.search(villes[y][0]) != -1) cases[i].nextSibling.innerHTML = '<a href="http://www.kraland.org/map.php?map=1;0;'+villes[y][1]+'" target="_blank">'+cases[i].nextSibling.innerHTML+'</a>';
            }
        }
    }
}

window.addEventListener('load', trophee, true) ;

aaus_50836={
i:'50836', // Script id on Userscripts.org
d:3, // Days to wait between update checks
n:'Kraland Profil ++',v:'11',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_50836.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_50836.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50836.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50836.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_50836.ch();