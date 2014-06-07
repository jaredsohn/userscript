// ==UserScript==
// @name           The West Jobs
// @namespace      dschachtler.dssr.ch
// @description    Arbeiten Wahlhilfe für "The West"
// @include        http://de*.the-west.de/game.php
// ==/UserScript==

var e_body = document.getElementsByTagName('body')[0];
var prefix = 'ch_dssr_dschachtler_the_west_jobs_';
var freeattributepoints = 0;
var freeskillpoints = 0;
var skills = new Array(20);
var jobs = new Array();

// Load previous data from storage if possible
if (GM_getValue)
{
	freeattributepoints = GM_getValue('freeattributepoints', 0);
	freeskillpoints = GM_getValue('freeskillpoints', 0);
	skills = GM_getValue('skills', '').split(',');
}

// { 20xSkill, Diff, Name, Pay, Exp, Luck, Danger, Rewards }
jobs[00] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 1, 1, 0,   0, 0, 1, 0, 1,   0, "Schuhe Putzen"						,  3,  2,  3,  2, "Quarter (35%)");
jobs[01] = new Array(0, 0, 0, 1, 0,   1, 0, 0, 1, 0,   0, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, "Plakate anbringen"					,  2,  3,  0, 10, "Plakat (40%)");
jobs[02] = new Array(1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 1, 1, 0, 0,   0, 1, 0, 1, 0,   0, "Vögel vom Feld vertreiben"			,  1,  3,  2, 20, "Rabenfeder (20%)");
jobs[03] = new Array(0, 0, 1, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 1, 1, 0, 0,   0, "Tabak pflücken"					,  6,  1,  2,  2, "Tabackblätter (100%)");
jobs[04] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   1, 0, 0, 2, 0,   1, "Schweine hüten"					,  3,  1,  0,  1, "Schinken (20%)");
jobs[05] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   1, 0, 1, 0, 0,   1, "Baumwolle pflücken"				,  1,  4,  0,  3, "Baumwolle (50%)");
jobs[06] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 3,   0, 0, 0, 0, 1,   0, 0, 0, 0, 0,   3, "Angeln"							,  1,  0,  6,  2, "Forelle (50%), Angel (3%)");
jobs[07] = new Array(0, 1, 1, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 1,   0, 0, 1, 0, 0,   3, "Zuckerrohr schlagen"				,  5,  2,  4,  1, "Zucker (100%)");
jobs[08] = new Array(0, 0, 1, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 1,   0, 0, 0, 2, 0,   7, "Stall ausmisten"					,  4,  5,  2,  6, "Mistgabel (5%)");
jobs[09] = new Array(0, 0, 0, 0, 0,   2, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 2, 0, 1,   8, "Zeitung verkaufen"					,  6,  1,  2,  1, "Zeitung (60%)");
jobs[10] = new Array(0, 1, 1, 1, 0,   1, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 0, 0,   10, "Getreide ernten"					,  2,  6,  2,  4, "Getreide (55%)");
jobs[11] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   1, 0, 0, 2, 0,   11, "Schafe hüten"						,  3,  5,  0,  2, "Wolle (25%)");
jobs[12] = new Array(3, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 1,   1, 0, 0, 0, 0,   15, "Stadtausbau"						,  0,  5,  0,  0, "");
jobs[13] = new Array(0, 0, 2, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 2, 0,   0, 0, 0, 0, 0,   15, "Beeren sammeln"					,  2,  6,  5,  6, "Beeren (45%)");
jobs[14] = new Array(0, 1, 0, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 2, 0,   21, "Weide mähen"						,  5,  7,  3,  3, "Sichel (5 %)");
jobs[15] = new Array(0, 0, 1, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   1, 1, 0, 1, 0,   22, "Bohnen pflücken"					,  6,  7,  4,  5, "Bohnen (40%)");
jobs[16] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 1, 1, 1, 1,   22, "Mais pflücken"					,  4,  7,  8,  5, "Mais (25%)");
jobs[17] = new Array(0, 1, 1, 1, 0,   1, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 0, 0,   24, "Getreide mahlen"					, 11,  7,  0,  5, "Mehl (40 %)");
jobs[18] = new Array(0, 0, 0, 0, 0,   0, 1, 0, 0, 0,   0, 1, 0, 0, 0,   1, 0, 0, 0, 2,   24, "Fort bewachen"					,  3,  9,  2,  7, "Nordstaaten Fahne (2%)");
jobs[19] = new Array(0, 0, 1, 0, 0,   0, 1, 0, 0, 1,   0, 0, 0, 0, 0,   0, 0, 2, 0, 0,   30, "Gold schürfen"					, 11,  3,  5,  7, "Katzengold (17%)");
jobs[20] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 2,   0, 0, 0, 2, 0,   35, "Zäune reparieren"					,  7, 11,  5,  6, "Hammer (11%)");
jobs[21] = new Array(0, 0, 0, 0, 0,   2, 1, 0, 0, 0,   0, 0, 0, 0, 0,   0, 1, 0, 1, 0,   38, "Kühe treiben"						,  5, 17,  0, 11, "T-Bone Steak (15%)");
jobs[22] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 0, 1,   0, 0, 0, 1, 0,   0, 0, 1, 0, 0,   39, "Gerben"							, 12, 15,  5, 18, "Leder (15%)");
jobs[23] = new Array(0, 0, 0, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 1, 0,   1, 1, 1, 0, 0,   42, "Tomaten pflücken"					, 13, 12,  7, 11, "Tomate (33 %)");
jobs[24] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   42, "Truthähne jagen"					,  3, 14,  5, 21, "Truthahn (13%)");
jobs[25] = new Array(1, 0, 0, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 1,   1, 1, 0, 0, 0,   44, "Bewässerungsanlage bauen"			,  7, 13, 15,  6, "Spaten (6%)");
jobs[26] = new Array(2, 0, 0, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 1,   1, 0, 0, 0, 0,   44, "Gleise verlegen"					, 10, 18,  5, 10, "Glas Wasser (25%)");
jobs[27] = new Array(0, 2, 0, 1, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 1,   47, "Holz fällen"						, 18,  5,  2, 21, "Holz (25%)");
jobs[28] = new Array(0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   0, 0, 1, 0, 0,   0, 0, 0, 2, 0,   49, "Rinder branden"					,  0, 25,  0, 35, "Kuhhorn (13%)");
jobs[29] = new Array(0, 3, 0, 1, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   52, "Steinabbau"						, 17,  8,  9, 33, "Steine (22%)");
jobs[30] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 0, 0, 0,   0, 2, 0, 1, 0,   53, "Damm einreißen"					,  4, 18,  9, 41, "Biberfell (5%)");
jobs[31] = new Array(1, 0, 0, 1, 0,   0, 0, 0, 0, 1,   0, 0, 0, 0, 0,   0, 0, 1, 0, 1,   56, "Claim abstecken"					, 31,  4,  4, 29, "Fähnchen (25%)");
jobs[32] = new Array(1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 1, 2, 0,   0, 0, 0, 1, 0,   57, "Stacheldrahtzaun aufstellen"		, 17, 13,  6,  0, "Stacheldraht (10%)");
jobs[33] = new Array(0, 0, 0, 0, 0,   0, 2, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 1, 0, 0,   63, "Holz zersägen"					, 23, 12,  6, 32, "Säge (10 %)");
jobs[34] = new Array(0, 0, 0, 1, 0,   0, 1, 0, 0, 0,   0, 0, 1, 0, 1,   0, 1, 0, 0, 0,   66, "Orangen pflücken"					, 14, 25, 10, 24, "Orangen (21 %)");
jobs[35] = new Array(0, 0, 0, 0, 0,   2, 1, 0, 0, 0,   0, 0, 1, 0, 0,   0, 0, 0, 1, 0,   71, "Pferde einreiten"					, 13, 32, 10, 52, "Sattel (5%)");
jobs[36] = new Array(2, 1, 0, 0, 0,   0, 0, 0, 0, 1,   0, 0, 0, 0, 1,   0, 0, 0, 0, 0,   74, "Telegraphenmasten aufstellen"		, 21, 25,  3, 14, "Drahtrolle (14%)");
jobs[37] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 0, 1, 0,   0, 0, 2, 0, 0,   74, "Edelsteine schürfen"				, 25,  7,  8,  4, "Edelsteine (8%)");
jobs[38] = new Array(1, 1, 1, 1, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   75, "Gräber ausheben"					, 16, 12, 22,  9, "Spaten (8%)");
jobs[39] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 1,   1, 0, 0, 0, 0,   82, "Zeitung drucken"					, 30, 20,  5,  7, "Zeitung (40 %)");
jobs[40] = new Array(1, 0, 0, 0, 0,   0, 0, 0, 0, 3,   0, 0, 0, 0, 0,   0, 1, 0, 0, 0,   84, "Fluss begradigen"					,  8, 22, 15, 12, "Holzpflock (5 %)");
jobs[41] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 1, 0, 0,   0, 0, 2, 0, 2,   84, "Handeln"							, 15,  3, 25, 12, "Tuchballen (13%), Stück eines Zettels (Teil 2) (1%)");
jobs[42] = new Array(0, 2, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 1, 0, 0,   85, "Kohleabbau"						, 30, 14,  0, 23, "Kohle (37%)");
jobs[43] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 2, 0, 0,   1, 0, 0, 0, 0,   90, "Fischen"							,  6, 23, 23, 38, "Lachs (15%), Forelle (5%)");
jobs[44] = new Array(0, 1, 0, 0, 0,   2, 0, 0, 0, 0,   0, 0, 0, 0, 0,   1, 0, 0, 2, 0,   92, "Pferde beschlagen"				, 14, 28,  9, 23, "Hufeisen (22 %)");
jobs[45] = new Array(1, 0, 0, 1, 0,   0, 0, 0, 0, 1,   0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   102, "Brunnen bohren"					,  9, 33, 23, 19, "Krug (10%)");
jobs[46] = new Array(1, 0, 0, 1, 0,   0, 0, 0, 0, 2,   0, 0, 0, 0, 1,   0, 0, 0, 0, 0,   107, "Brücke bauen"					, 17, 33, 18, 53, "Vorschlaghammer (8%)");
jobs[47] = new Array(0, 0, 0, 1, 0,   1, 0, 0, 0, 1,   0, 1, 0, 0, 0,   1, 0, 0, 0, 0,   111, "Auf Erkundung gehen"				,  1, 47, 22, 37, "Landkarte (15%)");
jobs[48] = new Array(2, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 1,   1, 0, 0, 0, 0,   112, "Bahnhof bauen"					, 12, 47,  7, 15, "Zugticket (7%)");
jobs[49] = new Array(1, 0, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 0, 0, 1,   118, "Särge zimmern"					, 42,  8, 15, 20, "Hobel (25%)");
jobs[50] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 3, 0, 0,   0, 0, 0, 0, 0,   119, "Biberjagd"						, 32, 17,  6, 21, "Biberfell (17%), Biberfalle (13%)");
jobs[51] = new Array(0, 0, 0, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 2,   1, 0, 1, 0, 0,   133, "Planwagen reparieren"			,  5, 23, 42, 11, "Warme Mahlzeit (15%)");
jobs[52] = new Array(0, 0, 0, 1, 0,   2, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   134, "Pferde fangen"					, 29, 45,  0, 42, "Lasso (22%)");
jobs[53] = new Array(0, 0, 0, 0, 0,   0, 1, 0, 0, 3,   0, 0, 0, 0, 0,   0, 1, 0, 0, 0,   137, "Holz flößen"						, 23, 45,  0, 52, "Holz (30%)");
jobs[54] = new Array(0, 0, 0, 2, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0,   0, 0, 0, 0, 0,   140, "Kojoten jagen"					, 15, 43, 26, 45, "Kojotenzahn (6%)");
jobs[55] = new Array(0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   0, 1, 0, 1, 0,   0, 0, 0, 0, 1,   144, "Munition transportieren"			, 23, 12, 64, 93, "Dynamit (5%)");
jobs[56] = new Array(0, 1, 2, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 0, 0,   152, "Agaven pflücken"					, 25, 42, 12, 27, "Tequila (12%)");
jobs[57] = new Array(1, 0, 0, 1, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   163, "Windräder bauen"					, 42, 43,  6, 18, "Werkzeugkasten (5%)");
jobs[58] = new Array(1, 1, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 1, 1,   0, 0, 0, 0, 0,   176, "Eisenabbau"						, 52, 32, 15, 29, "Eisenstangen (38%), Spitzhacke (2 %)");
jobs[59] = new Array(0, 2, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   178, "Wald roden"						, 62,  8,  9, 16, "Holz (65%)");
jobs[60] = new Array(0, 0, 0, 0, 0,   1, 0, 0, 0, 0,   0, 0, 1, 0, 0,   1, 1, 0, 1, 0,   178, "Büffel jagen"					, 24, 62,  0, 72, "Büffelfell (14%)");
jobs[61] = new Array(0, 1, 1, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 2, 0, 0,   193, "Silberabbau"						, 76,  8,  0, 32, "Silber (17%)");
jobs[62] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 2, 0, 0,   0, 0, 0, 1, 0,   207, "Wölfe jagen"						, 21, 63, 15, 67, "Zahnhandband (11%)");
jobs[63] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 0, 0, 0,   2, 1, 0, 0, 0,   212, "Siedlertreck beschützen"			, 10, 60, 30, 33, "Kochtopf (12%)");
jobs[64] = new Array(2, 0, 0, 1, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   220, "Ranch errichten"					, 20, 61, 17, 24, "Nägel (45 %)");
jobs[65] = new Array(0, 1, 0, 0, 0,   0, 1, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 2,   221, "Gefängniswächter"				, 25, 35, 38,  4, "Handschellen (1%)");
jobs[66] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 1, 0, 0,   0, 0, 2, 0, 2,   223, "Mit Indianern handeln"			, 11, 14, 63, 34, "Zigarren (13%)");
jobs[67] = new Array(1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 1, 0, 1,   2, 0, 0, 0, 0,   224, "Fort errichten"					, 33, 71, 17, 35, "Südstaaten Fahne (3%)");
jobs[68] = new Array(0, 0, 0, 1, 0,   2, 0, 0, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 1, 0,   225, "Ponyexpress"						, 15, 48, 51, 44, "Posthorn (5%)");
jobs[69] = new Array(1, 0, 1, 0, 0,   0, 1, 0, 0, 0,   0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   228, "Feuer löschen"					, 15, 41, 65, 45, "Dokumente (2%)");
jobs[70] = new Array(0, 0, 1, 0, 0,   1, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 0, 1, 0, 2,   235, "Missionieren"					,  5, 61, 52, 77, "Gesangsbuch (9%)");
jobs[71] = new Array(0, 0, 0, 0, 0,   0, 1, 0, 1, 0,   0, 0, 2, 0, 0,   0, 0, 0, 1, 0,   237, "Pferde stehlen"					, 64, 34, 18, 43, "Sattel (13%)");
jobs[72] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 1, 0, 1, 0,   0, 0, 2, 0, 0,   257, "Gewehre an Indianer verkaufen"	, 15, 35, 72, 82, "Goldene Figur (4%)");
jobs[73] = new Array(0, 1, 0, 0, 0,   0, 0, 0, 1, 0,   0, 0, 0, 2, 1,   0, 0, 0, 0, 0,   265, "Leichen plündern"				, 14, 14, 90, 34, "Ring (1%), Stück eines Zettels (1%)");
jobs[74] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 1, 2, 0, 0,   0, 0, 0, 1, 0,   280, "Grizzlybären jagen"				, 25, 78, 35, 71, "Trophäe (3%)");
jobs[75] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 0, 0, 2,   0, 1, 0, 0, 0,   293, "Schatzsuche"						, 20, 20, 83, 24, "Aztekengold (1%)");
jobs[76] = new Array(1, 0, 1, 1, 0,   0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   1, 0, 1, 0, 0,   294, "Nach Öl bohren"					, 83, 25, 20,  7, "Öl (25%)");
jobs[77] = new Array(0, 0, 0, 1, 0,   0, 0, 0, 0, 1,   0, 1, 1, 0, 0,   0, 0, 0, 0, 1,   298, "Der Armee dienen"				, 55, 76, 17, 35, "Ehrenmedaille (2%)");
jobs[78] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0,   0, 0, 1, 0, 1,   315, "Als Quacksalber arbeiten"		, 65, 50, 52, 67, "Elixier (9%)");
jobs[79] = new Array(0, 0, 1, 0, 0,   0, 0, 0, 0, 1,   0, 1, 0, 0, 1,   0, 0, 0, 0, 1,   331, "Als Söldner arbeiten"			, 92, 52, 23, 85, "Whiskey (85%)");
jobs[80] = new Array(0, 1, 0, 0, 0,   0, 0, 0, 0, 2,   0, 0, 0, 0, 0,   2, 0, 0, 0, 0,   347, "Raddampfer steuern"				, 82, 35, 15, 14, "Schiffsglocke (12 %)");
jobs[81] = new Array(0, 0, 0, 1, 0,   0, 0, 0, 1, 0,   0, 1, 0, 0, 0,   0, 0, 1, 0, 1,   366, "Friedensverhandlungen"			, 33, 68, 76, 44, "Friedenspfeife (8 %)");
jobs[82] = new Array(0, 0, 0, 0, 0,   0, 1, 0, 1, 0,   0, 1, 1, 1, 0,   0, 0, 0, 0, 0,   371, "Leute bestehlen"					, 48, 50, 74, 66, "Taschenuhr (4%)");
jobs[83] = new Array(0, 0, 1, 1, 0,   0, 0, 0, 1, 0,   0, 0, 0, 0, 0,   1, 1, 0, 0, 0,   384, "Banditen jagen"					, 28, 75, 85, 83, "Schmuggelware (5%)");
jobs[84] = new Array(0, 0, 0, 0, 0,   1, 0, 0, 0, 0,   0, 1, 0, 0, 1,   2, 0, 0, 0, 0,   403, "Postkutsche bewachen"			, 34, 77, 45, 43, "Patronen (12%)");
jobs[85] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 1, 1,   0, 1, 0, 0, 0,   0, 0, 1, 0, 1,   410, "Schmuggeln"						, 62, 45, 83, 56, "Schmuggelware (22 %)");
jobs[86] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 2, 0,   0, 0, 1, 0, 0,   0, 1, 0, 0, 1,   421, "Überfall"						, 78, 27, 78, 86, "Damenschmuck (13%), Stück eines Zettels (2%)");
jobs[87] = new Array(0, 1, 0, 1, 0,   0, 0, 0, 0, 0,   0, 1, 1, 0, 0,   0, 0, 0, 0, 1,   425, "Kopfgeldjäger"					, 92, 32, 79, 72, "");
jobs[88] = new Array(0, 0, 0, 1, 0,   0, 1, 0, 1, 0,   0, 0, 0, 0, 0,   0, 2, 0, 0, 0,   437, "Gefangenentransport"				, 23, 69, 85, 44, "Fußfessel (4%)");
jobs[89] = new Array(0, 0, 0, 0, 0,   0, 0, 0, 0, 0,   0, 1, 1, 0, 0,   1, 1, 0, 0, 1,   475, "Postkutsche überfallen"			, 43, 73, 95, 67, "Packet (15%)");
jobs[90] = new Array(0, 0, 0, 1, 0,   0, 0, 0, 1, 0,   0, 1, 1, 0, 0,   0, 0, 1, 0, 0,   505, "Zug überfallen"					, 67, 87, 92, 96, "");
jobs[91] = new Array(0, 0, 0, 1, 0,   0, 0, 0, 2, 0,   0, 0, 0, 0, 0,   0, 1, 1, 0, 0,   517, "Einbruch"						, 80, 34, 81, 26, "Gemälde (12%)");


window.setInterval(check_skills, 1000);
function check_skills()
{
	var skillwindow = document.getElementById('window_skill');
	if (skillwindow)
	{
		freeattributepoints = document.getElementById('attribute_points').firstChild.firstChild.nodeValue;
		freeskillpoints = document.getElementById('skill_points').firstChild.firstChild.nodeValue;
		
		skills[00] = document.getElementById('skill_build').childNodes[1].firstChild.nodeValue;
		skills[01] = document.getElementById('skill_punch').childNodes[1].firstChild.nodeValue;
		skills[02] = document.getElementById('skill_tough').childNodes[1].firstChild.nodeValue;
		skills[03] = document.getElementById('skill_endurance').childNodes[1].firstChild.nodeValue;
		skills[04] = document.getElementById('skill_health').childNodes[1].firstChild.nodeValue;
		
		skills[05] = document.getElementById('skill_ride').childNodes[1].firstChild.nodeValue;
		skills[06] = document.getElementById('skill_reflex').childNodes[1].firstChild.nodeValue;
		skills[07] = document.getElementById('skill_dodge').childNodes[1].firstChild.nodeValue;
		skills[08] = document.getElementById('skill_hide').childNodes[1].firstChild.nodeValue;
		skills[09] = document.getElementById('skill_swim').childNodes[1].firstChild.nodeValue;
		
		skills[10] = document.getElementById('skill_aim').childNodes[1].firstChild.nodeValue;
		skills[11] = document.getElementById('skill_shot').childNodes[1].firstChild.nodeValue;
		skills[12] = document.getElementById('skill_pitfall').childNodes[1].firstChild.nodeValue;
		skills[13] = document.getElementById('skill_finger_dexterity').childNodes[1].firstChild.nodeValue;
		skills[14] = document.getElementById('skill_repair').childNodes[1].firstChild.nodeValue;
		
		skills[15] = document.getElementById('skill_leadership').childNodes[1].firstChild.nodeValue;
		skills[16] = document.getElementById('skill_tactic').childNodes[1].firstChild.nodeValue;
		skills[17] = document.getElementById('skill_trade').childNodes[1].firstChild.nodeValue;
		skills[18] = document.getElementById('skill_animal').childNodes[1].firstChild.nodeValue;
		skills[19] = document.getElementById('skill_appearance').childNodes[1].firstChild.nodeValue;

		// Save new data to storage if possible
		if (GM_setValue)
		{
			GM_setValue('freeattributepoints', freeattributepoints);
			GM_setValue('freeskillpoints', freeskillpoints);
			GM_setValue('skills', skills.join(','));
		}
	}
	
	var workwindowcontent = document.getElementById('window_work_content');
	if (workwindowcontent && !document.getElementById(prefix + 'jobfind'))
	{
		var e_jobfind = document.createElement('div');
		e_jobfind.setAttribute('id', prefix + 'jobfind');

		var e_config = document.createElement('div');
		e_config.innerHTML = 'Was ist der beste Job für mich? Gib hier ein wie wichtig dir die einzelnen Attribute sind:<br />\
		<img src="/images/job/dollar.png" title="Lohn" /><input type="text" size="1" value="0" id="' + prefix + 'dollar" />&nbsp;\
		<img src="/images/job/experience.png" title="Erfahrung" /><input type="text" size="1" value="0" id="' + prefix + 'experience" />&nbsp;\
		<img src="/images/job/luck.png" title="Glück" /><input type="text" size="1" value="0" id="' + prefix + 'luck" />&nbsp;\
		<img src="/images/job/danger.png" title="Gefahr" /><input type="text" size="1" value="0" id="' + prefix + 'danger" />&nbsp;\
		<img src="/images/attribute_points/attribute_points.png" height="23" width="23" title="Zus. Attribute" /><input type="text" size="1" value="0" id="' + prefix + 'addattr" />&nbsp;\
		<img src="/images/skill_points/skill_points.png" height="23" width="23" title="Zus. Fertigkeiten" /><input type="text" size="1" value="0" id="' + prefix + 'addpt" />&nbsp;';
		var e_input = document.createElement('input');
		e_input.type = 'button';
		e_input.value = 'Suchen';
		e_input.addEventListener("click", search_jobs, true);
		e_config.appendChild(e_input);
		e_config.appendChild(document.createTextNode(' '));
		var e_input = document.createElement('input');
		e_input.type = 'button';
		e_input.value = 'Hilfe';
		e_input.addEventListener("click", showHelp, true);
		e_config.appendChild(e_input);
		e_config.appendChild(document.createElement('br'));
		e_jobfind.appendChild(e_config);
		
		var e_result = document.createElement('div');
		e_result.innerHTML = '<table id="' + prefix + 'foundlist">\
			<tr><th>Rang</th><th>Gewicht</th><th>Arbeit</th><th>Punkte</th><th>Lohn</th><th>Erfahrung</th><th>Glück</th><th>Gefahr</th><th>Gegenstände</th></tr>\
			<tr id="' + prefix + 'job0"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job1"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job2"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job3"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job4"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job5"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job6"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job7"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job8"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
			<tr id="' + prefix + 'job9"><td align="right"> </td><td align="right"> </td><td> </td><td align="center"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td align="right"> </td><td> </td></tr>\
		<table>';
		e_jobfind.appendChild(e_result);
		
		workwindowcontent.appendChild(document.createElement('hr'));
		workwindowcontent.appendChild(e_jobfind);
	}
}

function search_jobs()
{
	var e_foundlist = document.getElementById(prefix + 'foundlist');
	var results = new Array();
	var weights = new Array();
	var addpt = document.getElementById(prefix + 'addpt').value;
	var addattr = document.getElementById(prefix + 'addattr').value;
	if (parseInt(addpt) > parseInt(freeskillpoints) || parseInt(addattr) > parseInt(freeattributepoints))
	{
		var searchanyway = window.confirm("Du hast zur Zeit nicht so viele zusätzliche Attribut- oder Fertigkeitspunkte frei. Willst du die Suche trotzdem durchführen?");
		if (!searchanyway) return;
	}
	weights[0] = document.getElementById(prefix + 'dollar').value;
	weights[1] = document.getElementById(prefix + 'experience').value;
	weights[2] = document.getElementById(prefix + 'luck').value;
	weights[3] = document.getElementById(prefix + 'danger').value;
	
	for (var job = 0; job < jobs.length; job++)
	{
		var skillmatch = 0;
		var maxskillocc = 1;
		var groupocc = new Array(0, 0, 0, 0);
		var maxgroupocc = 0;
		for (var skill = 0; skill < skills.length; skill++)
		{
			skillmatch += jobs[job][skill] * skills[skill];
			if (jobs[job][skill] > maxskillocc) maxskillocc = jobs[job][skill];
			groupocc[Math.floor(skill / 5)] += jobs[job][skill];
		}
		maxgroupocc = Math.max(Math.max(groupocc[0],groupocc[1]), Math.max(groupocc[2],groupocc[3]));
		//window.alert(jobs[job][21] + ": have " + skillmatch + " need " + jobs[job][20]);
		if (skillmatch + maxskillocc * addpt + maxgroupocc * addattr > jobs[job][20])
		{
			var matchweight = 0;
			for (var weight = 0; weight < weights.length; weight++)
			{
				matchweight += weights[weight] * jobs[job][weight + 22];
			}
			results[results.length] = new Array(job, matchweight, skillmatch);
		}
	}
	
	results = sort(results, 1, false);
	
	for (var job = 0; job < results.length && job < 10; job++)
	{
		var e_jobrow = document.getElementById(prefix + 'job' + job);
		e_jobrow.childNodes[0].firstChild.nodeValue = (job + 1);
		e_jobrow.childNodes[1].firstChild.nodeValue = results[job][1];
		e_jobrow.childNodes[2].firstChild.nodeValue = jobs[results[job][0]][21];
		e_jobrow.childNodes[3].firstChild.nodeValue = results[job][2] + " - " + jobs[results[job][0]][20];
		e_jobrow.childNodes[4].firstChild.nodeValue = jobs[results[job][0]][22] + '%';
		e_jobrow.childNodes[5].firstChild.nodeValue = jobs[results[job][0]][23] + '%';
		e_jobrow.childNodes[6].firstChild.nodeValue = jobs[results[job][0]][24] + '%';
		e_jobrow.childNodes[7].firstChild.nodeValue = jobs[results[job][0]][25] + '%';
		e_jobrow.childNodes[8].firstChild.nodeValue = jobs[results[job][0]][26];
	}
}

function sort(arr, subIndex, ascending)
{
	var arrayIn = arr;
	var swap;
	
	do
	{
		swap = false;
		var arrayOut = new Array();
		var entryTemp = arrayIn[0];
		
		for (var entry = 1; entry < arrayIn.length; entry++)
		{
			if ((entryTemp[subIndex] < arrayIn[entry][subIndex]) ^ !ascending)
			{
				// take temp entry, make new entry to temp entry
				arrayOut[arrayOut.length] = entryTemp;
				entryTemp = arrayIn[entry];
			}
			else
			{
				// take new entry, keep temp entry
				arrayOut[arrayOut.length] = arrayIn[entry];
				swap = true;
			}
		}
		
		arrayOut[arrayOut.length] = entryTemp;
		arrayIn = arrayOut;
	} while (swap);
	
	return arrayOut;
}

function showHelp()
{
	var e_divHelp = document.getElementById(prefix + 'help');
	if (!e_divHelp)
	{
		e_divHelp = document.createElement('div');
		e_divHelp.setAttribute('id', prefix + 'help');
		e_divHelp.style.width = '600px';
		e_divHelp.style.position = 'absolute';
		e_divHelp.style.top = '50%';
		e_divHelp.style.left = '50%';
		e_divHelp.style.marginTop = '-300px';
		e_divHelp.style.marginLeft = '-300px';
		e_divHelp.style.zIndex = 999;
		e_divHelp.style.textAlign = 'left';
		e_divHelp.style.background = '#DED8C8';
		e_divHelp.style.padding = '4px';
		e_divHelp.style.border = '4px solid black';
		
		e_divHelp.innerHTML = '<div style="position: absolute; top: 0px; right: 0px;"><a href="#" onclick="this.parentNode.parentNode.style.display = \'none\'">Close</a></div>\
			<big><b>The West Jobs</b> (Version 5)</big><br /><br />\
			<div style="overflow: scroll; height: 570px;">\
			<b>Anleitung</b><br /><br />\
			<p>"The West Jobs" ist ein kleines Script für die deutsche Version von "The West". Das Script hilft dem Spieler die optimale Arbeit auszuwählen je nachdem ob Lohn, Erfahrung oder Gegenstände finden gewünscht sind.</p><br />\
			<b><i>Verwendung:</i></b>\
			<ol><li>Fenster "Fertigkeiten" öffnen und eine gute Sekunde warten damit das Script die Fertigkeiten Werte auslesen kann.</li>\
			<li>Fenster "Arbeiten" öffnen. Nach einer Sekunde erscheinen die Eingabefelder.</li>\
			<li>In den Eingabefeldern die Suchgewichtung eingeben.</li>\
			<li>Zusätzliche Attribut- und Fertigkeitspunkte eingeben die in der Suche berücksichtigt werden sollen.</li>\
			<li>Auf "Suchen" klicken und in der Tabelle die Top 10 Arbeiten ablesen.</li></ol>\
			<b><i>Erklärung der Suchgewichtung:</i></b>\
			<ul><li>Wer nur an Geld interessiert ist gibt bei "Lohn" einen positiven Wert ein und setzt den Rest auf Null.</li>\
			<li>Wer Geld und Erfahrung sucht gibt bei den entsprechenden Feldern das gewünschte Verhältnis ein und setzt alle anderen Felder auf Null.</li>\
			<li>Negative Werte sind auch möglich.</li></ul>\
			<b><i>Beispiel:</i></b><br /><br />\
			<p>Lohn 2, Erfahrung 1, Glück 0, Gefahr -1<br />\
			Lohn wird doppelt so stark gewertet wie Erfahrung und gefährlichere Arbeiten erhalten eine geringere Wertung.</p><br />\
			<b><i>Erklärung der Felder für Attribut- und Fertigkeitspunkte</b><br /><br />\
			<p>Das Script zeigt nicht nur Arbeiten an, die der Spieler jetzt schon erfüllen kann sondern auch alle Arbeiten die er durch investieren der angegebenen Attribut- und Fertigkeitspunkten erreichen kann. Dies kann bei der Vergabe der Punkte helfen indem man besser auf besonders lukrative Arbeiten hinarbeiten kann.</p><br />\
			<b><i>Achtung!</i></b><br /><br />\
			<p>Keine Gewähr auf Richtigkeit der Angaben. Daten basieren auf <a href="http://twtool.ath.cx/">http://twtool.ath.cx</a> und wurden von Hand übernommen. Fehlermeldungen sind willkommen.<br />\
			Das Script berücksichtigt nicht wie viele Arbeitspunkte der Spieler in eine Arbeit investieren kann.</p><br />\
			<b>Version History</b><br /><br />\
			<b><i>Version 5:</i></b><br />\
			<ul><li>Daten werden nun zwischengespeichert und müssen nicht mehr nach jedem Seitenaufruf neu gelesen werden.</li>\
			<li>Hilfe / Version History hinzugefügt.</li></ul>\
			<b><i>Version 4:</i></b><br />\
			<ul><li>Auslesen der freien Attributs- und Fertigkeitenpunkte korrigiert</li>\
			<li>Die freien Punkte können nun in der Suche berücksichtigt werden.</li></ul>\
			<b><i>Version 3:</i></b><br />\
			<ul><li>Fehler in Arbeitenliste korrigiert.</li>\
			<li>Beinhaltet alle Arbeiten im Spiel.</li></ul>\
			<b><i>Version 2:</i></b><br />\
			<ul><li>Beinhaltet nur 72 Arbeiten.</li></ul>\
			<b><i>Version 1:</i></b><br />\
			<ul><li>Beinhaltet nur 55 Arbeiten.</li></ul></div>';
		document.getElementsByTagName('body')[0].appendChild(e_divHelp);
	}
	else
	{
		e_divHelp.style.display = 'block';
	}
}