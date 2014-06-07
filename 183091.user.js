// ==UserScript==
// @id http://Lunchy.us/GreeseMonkey/RedditUserRenamer
// @name Reddit User Renamer
// @namespace http://Lunchy.us/GreeseMonkey
// @description Renames various users on reddit
// @version 1.0.3
// @updateURL http://userscripts.org/scripts/source/183091.meta.js
// @downloadURL http://userscripts.org/scripts/source/183091.user.js
// @author /u/RubyPinch
// @match http://*.reddit.com/*
// @grant unsafeWindow
// ==/UserScript==

var $=unsafeWindow.jQuery;
var r={
 "08G8V8":"Vroom-Vroom \"Defeater 'Feet'\" Trips",
 "0x_":"just ox",
 "10z20Luka":"Titty-slickers, God of Thunder and Lord of the Dance",
 "31eipekili":":I The whispering Jew",
 "442B8AEF9":"Socialery",
 "andresonic1":"Fake",
 "Andysonic-1":"Tiny Andy",
 "andysonic0":"Mini Andy",
 "andysonic2":"andysonic1",
 "andysonic3":"Chibi Andy",
 "anonpon3":"Artful",
 "ArtfulPon":"WildPlastic",
 "Articulate_Angel":"?rt?kj?l?t'e?n??l (se hara hit bringeþ þára friþhengesta pintelum)",
 "AttackTheMoon":"SpookPaul420",
 "Avebone":"Ambassador of Foodmanes",
 "Avngr75":"Ted",
 "Backupusername":"Cocksucker Shittytits",
 "Bflat13":"BECAUSE OF THE MOTHER FUCKING SUGAR!",
 "BlockJuice_4":"[deleted]",
 "Boibi":"Dr. Boibi, M.D.",
 "bryvood":"Ezreal",
 "CarlosAmuroRay":"ChuckAmuroRay",
 "Catharsis25":"Catharsis",
 "cheesemoo":"Cheesemeow",
 "Chillusion":"Cchhiilllluussiioonn",
 "Chinch335":"Chillusion",
 "Chiv_Cortland":"Chivvypoop",
 "CodenameToon":"Coggler",
 "Conky_":"Conky",
 "DarkSideOfTheSun":"DickSideOfTheSun",
 "DarqWolff":"[](/DarqWolff)",
 "DaylightDarkle":"Twilight Sparkle",
 "derram_2":"derram",
 "DiscordDraconequus":"The Real Chrysalis",
 "Edriss562":"Shadowy Overlord",
 "EvanMacIan":"Ewan McGregor",
 "EvilHom3r":"FutaHom3r",
 "Ezreal":"Ezreal",
 "FUCKING_HATE_REDDIT":"Freakin' Dislike Webplace",
 "fwinest_JediThug":"Wincest_JediThug",
 "Generic_Builder":"Genewic Bwuilda",
 "Greenie_Lye":"Greenie_Lye (Green Derram)", 
 "herabek":"420 BLAZE IT FGT",
 "IllusionOf_Integrity":"Chillusion",
 "IncidentalUnicorn2":"theclinger",
 "Jeroknite":"JokerTine",
 "jimmpony":"sirtophat",
 "JustAnotherGDB":"Just Another Face in the Clouds",
 "Juz16":"Jizz",
 "kcirvam":"mavrick45",
 "Lazeraze":"Snowlily",
 "Lord_Ninka":"Ninka",
 "MisanthropicCat":"MisanthropicPone",
 "mrjoker7854":"Pinkie Scratchtacularin",
 "Nagashizuri":"Maga",
 "nekoningen":"Scatman",
 "NeonSequitur":"Hunter x Hunter",
 "numberlock":"BeerPony",
 "OneOfTheseDaysLuna":"OneOfTheseMoonAsses",
 "PartOfAShoe":"Welt",
 "Phei":"Pheilight Sparkle",
 "PinkiePie2012":"Empress Pie",
 "pr0n0tr0n":"theodoreajhooker",
 "Princess_Molestia_":"Molestia",
 "PUBLIQclopAccountant":"The Public Clop Accounting Firm, LLC",
 "QdwachMD":"Queen QdwacgMD II",
 "Qwerty439":"Asdfgh439",
 "raritie":"Rarity",
 "RetardVomitPussyCunt":"RainbowViolinPancakesCider",
 "Rudicorn":"Grumpledick",
 "Ruuch":"Escort Sluthooves",
 "Ryskillz101":"Ryrity",
 "scriptea":"scriptease",
 "shawa666":"Slowpoke666",
 "SirCinnamon":"KingCinnamon",
 "SkiidrowDash":"Ski iDrow Toity",
 "slippy0":"emily",
 "socially_broken":"3p",
 "SolarLuna96":"Fluttershy's Wrath",
 "Speedingturtle":"Ambidextrous Tortoise",
 "Sponce":"Space",
 "StabbyTheLlama":"StabbyTheBOOBS",
 "supercrunchy":"Crumcju",
 "Swiftskii":"FairyFacedWizardFelcher",
 "tailcalled":"Tail Call",
 "Taiokoshinketsu":"Tia",
 "tehz":"Tail Call",
 "theclinger_4":"The Cringler",
 "thedarklordkyp":"A_Drunk_Changeling",
 "theodorejhooker":"theodoreajhooker",
 "thezooman123":"Actual Racist",
 "trypsonite":"Who",
 "tyl3rdurden":"Belgium",
 "Typhron":"Tiffany",
 "Unsinkablesam":"The Go-Go Train",
 "V17Ds":"Plounger",
 "viper9172":"Sidelong",
 "volcano_bakemeats":"Madam Le Bake",
 "XelNaga":"Twi`Naga",
 "Zovistograt":"[](/ww20 \"Needy Bitch\")",
 "ZZW30":"CaptChuckles"
}

var s=$('a.author')
for(var i=0;i<s.length;i++)
 if(r.hasOwnProperty(s[i].textContent))
  s[i].textContent=r[s[i].textContent]
var s=$('body.profile-page .pagename')
if(s.length!=0 && r.hasOwnProperty(s[0].textContent))
 s.text(r[s[0].textContent])