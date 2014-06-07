// ==UserScript==
// @id             www.serebii.net-pokedex-dropdowns@greasemonkey
// @name           Serebii Alphabetical Pokedex Dropdowns
// @version        1.6
// @namespace      PokedexDropdowns
// @author         einSyndication
// @description    Provides alphabetic dropdown boxes on the individual pokemon pages for all generations. Updated for X/Y. Also copies the next/previous pokemon links to the top.
// @include        http://serebii.net/pokedex*/*
// @include        http://www.serebii.net/pokedex*/*
// @exclude        http://serebii.net/pokedex*/
// @exclude        http://www.serebii.net/pokedex*/
// @grant		   none
// @run-at         document-end
// @downloadURL	   http://einsynd.pw/files/Serebii-Alphabet-Dropdowns.user.js
// @updateURL      http://einsynd.pw/files/Serebii-Alphabet-Dropdowns.meta.js
// ==/UserScript==

//Moves X/Y's previous/next pokemon buttons from the bottom of the page to just above the current pokemon's name.

var copyLinks = 1; // Set this to 0 to disable.
if(copyLinks == 1){
	var topTable  = document.getElementsByTagName('p')[0].parentNode;
	var linkTable = document.getElementsByTagName('p')[0].parentNode.lastChild.children[0];

	topTable.insertBefore(linkTable.cloneNode(true), topTable.children[0]);
}

function getOption(gen, poke){ // Given the pokedex set, return the full <option> tag for a pokemon
    var dex = "pokedex";
    if(gen == 3){ dex = dex + "-rs"; } 
        else if(gen == 4){ dex = dex + "-dp"; }
        else if(gen == 5){ dex = dex + "-bw"; }
        else if(gen == 6){ dex = dex + "-xy"; }
        
    var info = poke.split(" "); // Split pokemon from format "Name ID" into an array for easier parsing
    return '<option value="/' + dex + '/' + info[1] + '.shtml">' + info[0] + '</option>';
}

function newDropdown(formID){ // Return the beginning form parts of a new dropdown box, removes clutter
    var form = '<FORM NAME="atoz' + formID + '"><DIV>';
    form = form + '<SELECT NAME="SelectURL" onChange="document.location.href=document.atoz' + formID + '.SelectURL.options[document.atoz' + formID + '.SelectURL.selectedIndex].value" style="color:#383838; font-size: 8pt; background:#CEBC77" size=1>';
    
    return form;
}

// Store all pokemon in strings by generation in format "name ID" separated by commas to split later
var gen1 = "Bulbasaur 001,Ivysaur 002,Venusaur 003,Charmander 004,Charmeleon 005,Charizard 006,Squirtle 007,Wartortle 008,Blastoise 009,Caterpie 010,Metapod 011,Butterfree 012,Weedle 013,Kakuna 014,Beedrill 015,Pidgey 016,Pidgeotto 017,Pidgeot 018,Rattata 019,Raticate 020,Spearow 021,Fearow 022,Ekans 023,Arbok 024,Pikachu 025,Raichu 026,Sandshrew 027,Sandslash 028,Nidoran-F 029,Nidorina 030,Nidoqueen 031,Nidoran-M 032,Nidorino 033,Nidoking 034,Clefairy 035,Clefable 036,Vulpix 037,Ninetales 038,Jigglypuff 039,Wigglytuff 040,Zubat 041,Golbat 042,Oddish 043,Gloom 044,Vileplume 045,Paras 046,Parasect 047,Venonat 048,Venomoth 049,Diglett 050,Dugtrio 051,Meowth 052,Persian 053,Psyduck 054,Golduck 055,Mankey 056,Primeape 057,Growlithe 058,Arcanine 059,Poliwag 060,Poliwhirl 061,Poliwrath 062,Abra 063,Kadabra 064,Alakazam 065,Machop 066,Machoke 067,Machamp 068,Bellsprout 069,Weepinbell 070,Victreebel 071,Tentacool 072,Tentacruel 073,Geodude 074,Graveler 075,Golem 076,Ponyta 077,Rapidash 078,Slowpoke 079,Slowbro 080,Magnemite 081,Magneton 082,Farfetch'd 083,Doduo 084,Dodrio 085,Seel 086,Dewgong 087,Grimer 088,Muk 089,Shellder 090,Cloyster 091,Gastly 092,Haunter 093,Gengar 094,Onix 095,Drowzee 096,Hypno 097,Krabby 098,Kingler 099,Voltorb 100,Electrode 101,Exeggcute 102,Exeggutor 103,Cubone 104,Marowak 105,Hitmonlee 106,Hitmonchan 107,Lickitung 108,Koffing 109,Weezing 110,Rhyhorn 111,Rhydon 112,Chansey 113,Tangela 114,Kangaskhan 115,Horsea 116,Seadra 117,Goldeen 118,Seaking 119,Staryu 120,Starmie 121,Mr.Mime 122,Scyther 123,Jynx 124,Electabuzz 125,Magmar 126,Pinsir 127,Tauros 128,Magikarp 129,Gyarados 130,Lapras 131,Ditto 132,Eevee 133,Vaporeon 134,Jolteon 135,Flareon 136,Porygon 137,Omanyte 138,Omastar 139,Kabuto 140,Kabutops 141,Aerodactyl 142,Snorlax 143,Articuno 144,Zapdos 145,Moltres 146,Dratini 147,Dragonair 148,Dragonite 149,Mewtwo 150,Mew 151";
var gen2 = "Chikorita 152,Bayleef 153,Meganium 154,Cyndaquil 155,Quilava 156,Typhlosion 157,Totodile 158,Croconaw 159,Feraligatr 160,Sentret 161,Furret 162,Hoothoot 163,Noctowl 164,Ledyba 165,Ledian 166,Spinarak 167,Ariados 168,Crobat 169,Chinchou 170,Lanturn 171,Pichu 172,Cleffa 173,Igglybuff 174,Togepi 175,Togetic 176,Natu 177,Xatu 178,Mareep 179,Flaaffy 180,Ampharos 181,Bellossom 182,Marill 183,Azumarill 184,Sudowoodo 185,Politoed 186,Hoppip 187,Skiploom 188,Jumpluff 189,Aipom 190,Sunkern 191,Sunflora 192,Yanma 193,Wooper 194,Quagsire 195,Espeon 196,Umbreon 197,Murkrow 198,Slowking 199,Misdreavus 200,Unown 201,Wobbuffet 202,Girafarig 203,Pineco 204,Forretress 205,Dunsparce 206,Gligar 207,Steelix 208,Snubbull 209,Granbull 210,Qwilfish 211,Scizor 212,Shuckle 213,Heracross 214,Sneasel 215,Teddiursa 216,Ursaring 217,Slugma 218,Magcargo 219,Swinub 220,Piloswine 221,Corsola 222,Remoraid 223,Octillery 224,Delibird 225,Mantine 226,Skarmory 227,Houndour 228,Houndoom 229,Kingdra 230,Phanpy 231,Donphan 232,Porygon 2 233,Stantler 234,Smeargle 235,Tyrogue 236,Hitmontop 237,Smoochum 238,Elekid 239,Magby 240,Miltank 241,Blissey 242,Raikou 243,Entei 244,Suicune 245,Larvitar 246,Pupitar 247,Tyranitar 248,Lugia 249,Ho-oh 250,Celebi 251";
var gen3 = "Treecko 252,Grovyle 253,Sceptile 254,Torchic 255,Combusken 256,Blaziken 257,Mudkip 258,Marshtomp 259,Swampert 260,Poochyena 261,Mightyena 262,Zigzagoon 263,Linoone 264,Wurmple 265,Silcoon 266,Beautifly 267,Cascoon 268,Dustox 269,Lotad 270,Lombre 271,Ludicolo 272,Seedot 273,Nuzleaf 274,Shiftry 275,Taillow 276,Swellow 277,Wingull 278,Pelipper 279,Ralts 280,Kirlia 281,Gardevoir 282,Surskit 283,Masquerain 284,Shroomish 285,Breloom 286,Slakoth 287,Vigoroth 288,Slaking 289,Nincada 290,Ninjask 291,Shedinja 292,Whismur 293,Loudred 294,Exploud 295,Makuhita 296,Hariyama 297,Azurill 298,Nosepass 299,Skitty 300,Delcatty 301,Sableye 302,Mawile 303,Aron 304,Lairon 305,Aggron 306,Meditite 307,Medicham 308,Electrike 309,Manectric 310,Plusle 311,Minun 312,Volbeat 313,Illumise 314,Roselia 315,Gulpin 316,Swalot 317,Carvanha 318,Sharpedo 319,Wailmer 320,Wailord 321,Numel 322,Camerupt 323,Torkoal 324,Spoink 325,Grumpig 326,Spinda 327,Trapinch 328,Vibrava 329,Flygon 330,Cacnea 331,Cacturne 332,Swablu 333,Altaria 334,Zangoose 335,Seviper 336,Lunatone 337,Solrock 338,Barboach 339,Whiscash 340,Corphish 341,Crawdaunt 342,Baltoy 343,Claydol 344,Lileep 345,Cradily 346,Anorith 347,Armaldo 348,Feebas 349,Milotic 350,Castform 351,Kecleon 352,Shuppet 353,Banette 354,Duskull 355,Dusclops 356,Tropius 357,Chimecho 358,Absol 359,Wynaut 360,Snorunt 361,Glalie 362,Spheal 363,Sealeo 364,Walrein 365,Clamperl 366,Huntail 367,Gorebyss 368,Relicanth 369,Luvdisc 370,Bagon 371,Shelgon 372,Salamence 373,Beldum 374,Metang 375,Metagross 376,Regirock 377,Regice 378,Registeel 379,Latias 380,Latios 381,Kyogre 382,Groudon 383,Rayquaza 384,Jirachi 385,Deoxys 386";
var gen4 = "Turtwig 387,Grotle 388,Torterra 389,Chimchar 390,Monferno 391,Infernape 392,Piplup 393,Prinplup 394,Empoleon 395,Starly 396,Staravia 397,Staraptor 398,Bidoof 399,Bibarel 400,Kricketot 401,Kricketune 402,Shinx 403,Luxio 404,Luxray 405,Budew 406,Roserade 407,Cranidos 408,Rampardos 409,Shieldon 410,Bastiodon 411,Burmy 412,Wormadam 413,Mothim 414,Combee 415,Vespiquen 416,Pachirisu 417,Buizel 418,Floatzel 419,Cherubi 420,Cherrim 421,Shellos 422,Gastrodon 423,Ambipom 424,Drifloon 425,Drifblim 426,Buneary 427,Lopunny 428,Mismagius 429,Honchkrow 430,Glameow 431,Purugly 432,Chingling 433,Stunky 434,Skuntank 435,Bronzor 436,Bronzong 437,Bonsly 438,Mime Jr. 439,Happiny 440,Chatot 441,Spiritomb 442,Gible 443,Gabite 444,Garchomp 445,Munchlax 446,Riolu 447,Lucario 448,Hippopotas 449,Hippowdon 450,Skorupi 451,Drapion 452,Croagunk 453,Toxicroak 454,Carnivine 455,Finneon 456,Lumineon 457,Mantyke 458,Snover 459,Abomasnow 460,Weavile 461,Magnezone 462,Lickilicky 463,Rhyperior 464,Tangrowth 465,Electivire 466,Magmortar 467,Togekiss 468,Yanmega 469,Leafeon 470,Glaceon 471,Gliscor 472,Mamoswine 473,Porygon-Z 474,Gallade 475,Probopass 476,Dusknoir 477,Froslass 478,Rotom 479,Uxie 480,Mesprit 481,Azelf 482,Dialga 483,Palkia 484,Heatran 485,Regigigas 486,Giratina 487,Cresselia 488,Phione 489,Manaphy 490,Darkrai 491,Shaymin 492,Arceus 493";
var gen5 = "Victini 494,Snivy 495,Servine 496,Serperior 497,Tepig 498,Pignite 499,Emboar 500,Oshawott 501,Dewott 502,Samurott 503,Patrat 504,Watchog 505,Lillipup 506,Herdier 507,Stoutland 508,Purrloin 509,Liepard 510,Pansage 511,Simisage 512,Pansear 513,Simisear 514,Panpour 515,Simipour 516,Munna 517,Musharna 518,Pidove 519,Tranquill 520,Unfezant 521,Blitzle 522,Zebstrika 523,Roggenrola 524,Boldore 525,Gigalith 526,Woobat 527,Swoobat 528,Drilbur 529,Excadrill 530,Audino 531,Timburr 532,Gurdurr 533,Conkeldurr 534,Tympole 535,Palpitoad 536,Seismitoad 537,Throh 538,Sawk 539,Sewaddle 540,Swadloon 541,Leavanny 542,Venipede 543,Whirlipede 544,Scolipede 545,Cottonee 546,Whimsicott 547,Petilil 548,Lilligant 549,Basculin 550,Sandile 551,Krokorok 552,Krookodile 553,Darumaka 554,Darmanitan 555,Maractus 556,Dwebble 557,Crustle 558,Scraggy 559,Scrafty 560,Sigilyph 561,Yamask 562,Cofagrigus 563,Tirtouga 564,Carracosta 565,Archen 566,Archeops 567,Trubbish 568,Garbodor 569,Zorua 570,Zoroark 571,Minccino 572,Cinccino 573,Gothita 574,Gothorita 575,Gothitelle 576,Solosis 577,Duosion 578,Reuniclus 579,Ducklett 580,Swanna 581,Vanillite 582,Vanillish 583,Vanilluxe 584,Deerling 585,Sawsbuck 586,Emolga 587,Karrablast 588,Escavalier 589,Foongus 590,Amoonguss 591,Frillish 592,Jellicent 593,Alomomola 594,Joltik 595,Galvantula 596,Ferroseed 597,Ferrothorn 598,Klink 599,Klang 600,Klinklang 601,Tynamo 602,Eelektrik 603,Eelektross 604,Elgyem 605,Beheeyem 606,Litwick 607,Lampent 608,Chandelure 609,Axew 610,Fraxure 611,Haxorus 612,Cubchoo 613,Beartic 614,Cryogonal 615,Shelmet 616,Accelgor 617,Stunfisk 618,Mienfoo 619,Mienshao 620,Druddigon 621,Golett 622,Golurk 623,Pawniard 624,Bisharp 625,Bouffalant 626,Rufflet 627,Braviary 628,Vullaby 629,Mandibuzz 630,Heatmor 631,Durant 632,Deino 633,Zweilous 634,Hydreigon 635,Larvesta 636,Volcarona 637,Cobalion 638,Terrakion 639,Virizion 640,Tornadus 641,Thundurus 642,Reshiram 643,Zekrom 644,Landorus 645,Kyurem 646,Keldeo 647,Meloetta 648,Genesect 649";
var gen6 = "Chespin 650,Quilladin 651,Chesnaught 652,Fennekin 653,Braixen 654,Delphox 655,Froakie 656,Frogadier 657,Greninja 658,Bunnelby 659,Diggersby 660,Fletchling 661,Fletchinder 662,Talonflame 663,Scatterbug 664,Spewpa 665,Vivillon 666,Litleo 667,Pyroar 668,Flabébé 669,Floette 670,Florges 671,Skiddo 672,Gogoat 673,Pancham 674,Pangoro 675,Furfrou 676,Espurr 677,Meowstic 678,Honedge 679,Doublade 680,Aegislash 681,Spritzee 682,Aromatisse 683,Swirlix 684,Slurpuff 685,Inkay 686,Malamar 687,Binacle 688,Barbaracle 689,Skrelp 690,Dragalge 691,Clauncher 692,Clawitzer 693,Helioptile 694,Heliolisk 695,Tyrunt 696,Tyrantrum 697,Amaura 698,Aurorus 699,Sylveon 700,Hawlucha 701,Dedenne 702,Carbink 703,Goomy 704,Sliggoo 705,Goodra 706,Klefki 707,Phantump 708,Trevenant 709,Pumpkaboo 710,Gourgeist 711,Bergmite 712,Avalugg 713,Noibat 714,Noivern 715,Xerneas 716,Yveltal 717,Zygarde 718";

// Make an array of the final Pokemon in each generation's numbers, might need it, I don't know.
var genMax = new Array(151, 251, 386, 493, 649, 718);

var whatGen = 2;

if (document.URL.search("pokedex-rs")!= -1){ whatGen = 3; }
else if (document.URL.search("pokedex-dp")!= -1){ whatGen = 4; }
else if (document.URL.search("pokedex-bw")!= -1){ whatGen = 5; }
else if (document.URL.search("pokedex-xy")!= -1){ whatGen = 6; }

var firstSelect = document.getElementsByTagName('select').item(0);
var linkTable = firstSelect.parentNode.parentNode.parentNode.parentNode.parentNode;

// If it's one of the generations before generation 5, add columns to make the table 5 columns long.
// Turns out, it makes very little difference keeping it as three dropdowns, so only mess with gen 2.
// Might as well keep for if later there's reason to want more than three dropdowns.
if(whatGen == 2){
    var mainRow=linkTable.parentNode;
    mainRow = mainRow.getElementsByTagName("tr")[0];
    
    if(whatGen == 2){
        mainRow.insertCell(1);
    }
}

// Parse the strings into a full array of all of the pokemon up to the selected generation
var genArray = new Array();
genArray = genArray.concat(gen1.split(","),gen2.split(","));
if(whatGen >= 3){ genArray = genArray.concat(gen3.split(",")); }
if(whatGen >= 4){ genArray = genArray.concat(gen4.split(",")); }
if(whatGen >= 5){ genArray = genArray.concat(gen5.split(",")); }
if(whatGen >= 6){ genArray = genArray.concat(gen6.split(",")); }
genArray.sort();

var newRow = linkTable.insertRow(1);

// Add a spacer to Gen 5's start so it looks nice and centered.
var start = 0;
if(whatGen == 5){
    newRow.insertCell(0);
    start = 1;
}

var AtoG = newRow.insertCell(start);
var HtoR = newRow.insertCell(start+1);
var StoZ = newRow.insertCell(start+2);

AtoG.setAttribute('align', 'center');
HtoR.setAttribute('align', 'center');
StoZ.setAttribute('align', 'center');
// Sets Gen6's colspan to 2, just like the capture location dropdowns
// Makes it look nice and centered, if a little spaced out.
if(whatGen == 6){
    AtoG.colSpan = 2;
    HtoR.colSpan = 2;
    StoZ.colSpan = 2;
}

var startH = startS = 0;
genArray.forEach(function(ele,ind){
    if(startH == 0){
        if(ele.substring(0,1)=="H"){
            startH = ind;
        }
    } else if(startS == 0){
        if(ele.substring(0,1)=="S"){
            startS = ind;
        }
    }
});

var AtoGlist = newDropdown(1);
var AtoGlist = AtoGlist + "<option><b>Pokédex: A - G</option>";
for(i=0; i<startH; i++){
    AtoGlist = AtoGlist + getOption(whatGen, genArray[i]);
}
AtoGlist = AtoGlist + '</SELECT><DIV> </FORM>';

var HtoRlist = newDropdown(2);
var HtoRlist = HtoRlist + "<option><b>Pokédex: H - R</option>";
for(i=startH; i<startS; i++){
    HtoRlist = HtoRlist + getOption(whatGen, genArray[i]);
}
HtoRlist = HtoRlist + '</SELECT><DIV> </FORM>';

var StoZlist = newDropdown(3);
var StoZlist = StoZlist + "<option><b>Pokédex: S - Z</option>";
for(i=startS; i<genArray.length; i++){
    StoZlist = StoZlist + getOption(whatGen, genArray[i]);
}
StoZlist = StoZlist + '</SELECT><DIV> </FORM>';

AtoG.innerHTML=AtoGlist;
HtoR.innerHTML=HtoRlist;
StoZ.innerHTML=StoZlist;