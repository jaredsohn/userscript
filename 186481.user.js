// ==UserScript==
// @name 	          Wall Manager Sidekick (FarmVille2)
// @description     Assists Wall Manager with 'FarmVille2' posts
// @include		https://apps.facebook.com/farmville-two/viral.php?*
// @include		http://apps.facebook.com/farmville-two/viral.php?*
// @include		https://fb1.farm2.zynga.com/viral.php?*
// @include		http://fb1.farm2.zynga.com/viral.php?*
// @include		http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require		http://userscripts.org/scripts/source/123889.user.js
// @grant		     GM_getValue
// @grant		     GM_setValue
// @version		0.5.2a
// @copyright		Ch4mp
// ==/UserScript== 



(function() {
	//prevent reading data from top page because it does not contain useful information and can trick the sidekick

	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return; //comment this line out if you A) do not get your accept/fail messages from an iframe, or B) the game ticker does not affect you or draw to your collection pages.

	//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "0.5.2a";
	var appID="321574327904696";
	var scriptID="149439";
	var appName="FarmVille2";
	var appIcon="https://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v85005/104/321574327904696/app_2_321574327904696_1179950008.gif"; 

	//attempt to dock with the WM host script
	function dock(){

		//enter material names here as objects
		//each object takes a name, id and event
		//id defaults to name - spaces and lowercase
		//event defaults to "Unsorted"
		//flags defaults to null
		var materials = [
		{name:"Fertilizer", event:"basics", flags:"basics"},
		{name:"Coins", event:"basics", flags:"basics"},
		{name:"Feed", event:"basics", flags:"basics"},
		{name:"Level", event:"basics", flags:"basics"},
		{name:"Water", event:"basics", flags:"basics"},
		{name:"Power", event:"basics", flags:"basics"},
		{name:"Milk", event:"basics", flags:"basics"},
		{name:"Butter", event:"basics", flags:"basics"},
		
		//Flavors of the month:
		{name:"Candy", event:"other", flags:"other"},
		{name:"Kaki", event:"other", flags:"other"},
		{name:"Exotic Egg", event:"other", flags:"other"},
		{name:"GrocerPoints", event:"other", flags:"other"},
		
		{name:"Give", event:"other", flags:"other"},
		
	  //{name:"Play", event:"excluded", flags:"other"}, the "come play" messages are now excluded (see "var test")

		//	{name:"clue"}, //creates a material called clue and found by searching for clue, listed under "unsorted"
		//	{name:"nail gun", id:"nailgun"}, 
		//creates a material called "nail gun", found by searching for "nailgun", listed under "unsorted"
		//	{name:"spackle", event:"basics"}, 
		//creates a material called "spackle", found by searching for "spackle", listed under "basics"
		//	{name:"xp", flags:"basics"}, 
		//this material can be later searched for using the matchByParam function
		];

		//mark all these as new while building the menus
		//these items will appear highlighted in the options menu
		var newItems=[
		//	"exoticegg",
		//	"kaki",
		];

		//these words generally denote a send type bonus
		//modify this list to fit your needs
		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		//manage accept texts here
		var accTextGet={}, accTextSend={};
		accTextGet = accTextFromData(materials); //omit this line if you will only be sending stuff
		accTextSend = accTextFromData(materials,"send"); //omit this line if you will only be getting stuff
		var accTextCustoms = {
			doUnknown:"Unknown", //needed if your script contains the menu item "doUnknown"
			send:"Unknown", //needed if your script returns just "send" without a material name and "sendall" is used in the menu

			//add any other custom texts you want here, or rewrite texts generated above in accTextGet or accTextSend
			//example: 
			//xp:"XP", //instead of something accTextGet might contain such as xp:"Xp". Note the case difference.

			//here are the other entries for menu items below
			//coins:"Coins", energy:"Energy",
		};
		
		//get a list of search terms from the materials object. These terms are built specifically for text searches
		//there is no need to worry about case because the searchable portion and the search terms are all converted to lower case in the WM host
		var searchList = searchFromData(materials);
		var searchListNoSpaces = searchList.noSpaces(); //this version contains no spaces in each element

		//manage tests here
		var tests=[

		//exclude non-item links (mostly happens when people change clothes ingame).
		//translation				English		Dutch		German						  French		Spanish		Portuguese		Italian			Turkish			Indonesian			Danish Swedish Norwegian	Japanese	Chinese					
			{search:["link"],find:["Come Play","Kom Spelen","Komm Spielen","Spiel jetzt","venir jouer","ven a jugar","venha jogar","ciotola giochi","kase oyunları","mangkuk permainan","spil","spel","spill", 					"\u4f86\u73a9"],ret:"exclude"}, 
			
			//basic ingredients
	//translation	English			Dutch		German			French		Spanish		Portuguese		Italian		Turkish			Indonesian		Danish			Swedish		Norwegian	Japanese						Chinese						Thais						Placeholder
			{either:["Fertilizer",	"mest",		"Dünger",		"engrais",	"fertilizante","concime","estiércol",	"gübre",		"pupuk", 		"gødning", 		"gödsel", 	"gjødsel",	"\u9818\u53d6\u80a5\u6599",																"PLACEHOLDER"	],ret:"fertilizer"},
			{either:["Milk Bottle",	"melk",		"milch",		"lait", 	"leche", 	"mamadeira", 	"latte",	"süt", 			"susu", 		"mælk", 		"mjölk", 	"melk",										"\u5976\u74f6",				"\u0e19\u0e21\u0e02\u0e27\u0e14"			],ret:"milk"},
			{either:["Coins",		"munten",	"münzen",		"pièces", 	"monedas", 	"moedas", 		"monete", 	"madeni para",	"koin", 		"mønter", 		"mynt", 	"mynter",									"\u62ff\u91d1\u5e63"													],ret:"coins"},	
			{either:["Feed",		"voer",		"nourriture",	"nourrir", 	"ración", 	"ração",		"razione",	"beslemek",		"makan", 		"fodre", 		"foder", 	"mate",		"\u98fc",						"\u53bb\u9818\u98fc\u6599", "\u0e2d\u0e32\u0e2b\u0e32\u0e23"			],ret:"feed"},
			{either:["Level",		"niveau",	"aufsteigen",	"progresser","nível", 	"nivel",		"livello", 	"seviye", 		"tingkat", 		"nivå",																	"\u5feb\u901f\u5347\u7d1a", "\u0e40\u0e25\u0e40\u0e27"					],ret:"level"},
			{either:["Power","energie","stroom",				"énergie", 	"energía",	"energia", 					"enerji",		"energi",																				"\u80fd\u6e90"															],ret:"power"},
			{either:["Water",					"wasser",		"eaux", 	"agua", 	"pouco de água","acqua",	"su", 			"air", 			"vand", 		"vatten", 		"vann",	"\u6c34",													"\u0e19\u0e49\u0e33"						],ret:"water"},
			
			//Temp ingredients
			{either:["kaki"																																																																			],ret:"kaki"},
			{either:["candy", 		"snoep", 	"Süßigkeiten", 	"bonbons",				"doces",																															"\u7cd6\u679c",				"\u0e25\u0e39\u0e01\u0e01\u0e27\u0e32\u0e14"],ret:"candy"},
			{either:["butter", 		"boter", 																																																														],ret:"butter"},
			{either:["points", 		"punten", 	"punkten",					"puntos",	"pegue",		"punti",	"makas",		"poin",			"point",		"poäng",	"poeng"																												],ret:"grocerpoints"},
			
			//Exotic ingredients
			{either:["Exotic Egg","exotisch ei",				"œuf exotique",			"ovo exótico","Dê e receba",											"eksotisk æg","exotiska ägg","eksotiske egg",							"\u7a00\u6709\u86cb"										],ret:"exoticegg"}, 
			//Give one Get one
			{either:["Give",		"Geef",		"Geben",		"donner", 	"dar",				 		"dare", 	"vermek", 		"memberikan",	"giver", 		"ge", 		"gi", 			"\u6709\u9001\u6709\u5f97","\u9001\u4e00\u5f97\u4e00"												],ret:"give"},
			
			
			//catch stuff that will be missed by material name searches here
			//{url:["VRL_ASK_ENERGY"],ret:"sendenergy"},
			//{url:["VRL_HIGH_SCORE"],ret:"energy"},

			//if send words are found, but material does not exist in the list, returns just "send" so sendall picks it up
			{either:sendWords,ret:"send",kids:[
				//otherwise return the actual material name prefixed with "send". Example: "sendnailgun"
				{url:"{%1}",ret:"send{%1}",subTests:searchList}, //search first in the url
				{either:"{%1}",ret:"send{%1}",subTests:searchList}, //search second in the post link and body
			]},

			//check for getting of materials by id
			{url:"{%1}",ret:"{%1}",subTests:searchList}, //search first in the url
			{either:"{%1}",ret:"{%1}",subTests:searchList}, //search second in the post link and body

			//you will want to change the previous send and get tests to fit your specific needs
			//make use of the link, body, title, and html searches as well as the many other types documented on the wiki

			//you may want to toss in some link text catch alls for stuff missed by previous searches
			//below are several examples
			//{link:["xp"], ret:"xp"}, //get xp
			//{link:["coins","monedas","pièces","münzen"], ret:"coins"}, //get coins
			//{link:["clue","indice","pista"], ret:"clue"}, //get clues
			//{link:["energ"], ret:"energy"}, //get energy

		];

		//manage your menu here
		menu={
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				sep_GET:{type:'separator',label:'Get Items',kids:{

					//Basic
					water:{type:"checkbox",label:"Water"},
					fertilizer:{type:"checkbox",label:"Fertilizer"},
					level:{type:"checkbox",label:"Experience"},
					power:{type:"checkbox",label:"Power"},
					coins:{type:"checkbox",label:"Coins"},
					feed:{type:"checkbox",label:"Feed"},
					milk:{type:"checkbox",label:"Milk Bottle"},
					butter:{type:"checkbox",label:"Butter"},
					
					//FOTM
					butter:{type:"checkbox",label:"Butter"},
					kaki:{type:"checkbox",label:"Kaki fruit"},
					candy:{type:"checkbox",label:"Candy"},
					grocerpoints:{type:"checkbox",label:"Grocer Points"},
					
					//Exotic
					exoticegg:{type:"checkbox",label:"Exotic Eggs"},
					//Give one Get one
					give:{type:"checkbox",label:"Give one Get one items"},
					//Unknown links
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},
				sep_SEND:{type:"separator",label:"Send Items",kids:{
 					sendall:{type:'checkbox',label:'Send All (or select from options below)'},
					send:{type:'checkbox',label:'Send Unrecognized Items'},
				}},
			}},
		};

		//attach material lists to the menu
		//menuFromData(materials,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,""); //attach a list of materials to the GET block
		//menuFromData(materials,menu["section_main"]["kids"]["sep_SEND"]["kids"],newItems,"send"); //attach a list of materials to the SEND block

		//send all this information in to the WM script
		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			flags:{},
			alterLink:{},
			icon:appIcon,
			desc:null,
			accText:mergeJSON(accTextGet,accTextSend,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
	};
	

	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(read,1000);return;} 

		/* **************************************************
		Modify this section so it catches your exact
		accept or failure texts returned by the target
		app/game

		Anything goes, as long as a status code
		is returned to the main WM host.

		Defaults are in RegExp format, but you can 
		change to simple if/then/else or switches
		if you have something better in mind

		The WM script can recieve and act on the following statusCode values:

			"2":"Responseless Collection",			//normally handled inside WM host
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed", 					//use for reason unknown
			"-2":"None Left", 				//use for reason of already taken
			"-3":"Over Limit",
			"-4":"Over Limit, Sent One Anyway",		//registers as a type of acceptance
			"-5":"Server Error",
			"-6":"Already Got",				//registers as a type of acceptance
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link", 		//used only with special flags
			"-9":"Final Request Returned Null Page", 	//normally handled inside WM host
			"-10":"Final Request Failure",			//normally handled inside WM host
			"-11":"Expired",
			"-12":"Not a Neighbor",				//neighborship required to accept post
			"-13":"Requirements not met",			//level or building requirement
			"-15":"Unrecognized Response",			//prevent waiting for timeout if you know to watch for some known issue

			additional codes may now exist, please check the wiki support site for information

		*************************************************** */

		//Dutch, English, German, French, Spanish, Portuguese, Italian, Turkish, Indonesian, Danish, Swedish, Norsk
		
		//accepts
		if (text.match(/(het volgende geaccepteerd|just accepted|(F|f)olgendes angenommen|viens d'accepter|de aceptar|de aceitar|appena accettato|kabul ettin|saja menerima|netop modtaget|just accepterat|har akkurat tatt imot)/)) statusCode=1;
		//NL, EN, GER, FR, ES, Portuguese, Italian, Turkish, Indonesian, Danish, Swedish, Norsk
		
		//already claimed
		else if (text.match(/(al geaccepteerd|already (claimed|accepted)|schon angenommen|déjà accepté|has aceptado este|já aceitou|già accettato|önce almıştın|sudah menerima|har allerede|redan accepterat)/)) statusCode=-6; 
		//NL, EN, GER, FR, ES, Portuguese, Italian, Turkish, Indonesian, Danish, Swedish, Norsk (same as Danish)
		
		//over-limits
		else if (text.match(/(te veel|too many|zu viele|accepté trop|últimamente|ultimamente|Ultimamente|çok fazla|terlalu banyak|har modtaget|har accepterat|i det siste)/)) statusCode=-3; 
 		//NL, EN, GER, FR, ES, Portuguese, Italian, Turkish, Indonesian, Danish, Swedish, Norsk
		
		//all-outs
		else if (text.match(/(andere boeren hebben|early bird|Chi dorme non)/)) statusCode=-2; 
		//NL, EN, Italian
		
		//generic fails 
		else if (text.match(/(can't claim this reward|niet gevonden|not found|nicht gefunden|pas trouvé|que no se encuentra|não encontrado|non trovato|bulunamadı|tidak ditemukan|ikke fundet|hittades inte)/))statusCode=-1;
		//NL, EN, GER, FR, ES, Portuguese, Italian, Turkish, Indonesian, Danish, Swedish, Norsk (same as Danish)
		
		//expired fail
		else if (text.match(/(this reward has expired)/))statusCode=-11;

		//server errors
		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;

		
		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.host=='www.facebook.com') dock(); else read();

})(); // anonymous function wrapper end
