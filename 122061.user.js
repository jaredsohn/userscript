// ==UserScript==
// @name           Grepolis Report Converter
// @namespace      http://www.westtax.info/grepolis/RepConvJS.js
// @include        http://*.grepolis.com/*
// @exclude        view-source://*
// @version		   2.0.6
// ==/UserScript==
//

var RepConvChanges = {
		"2.0.6"	: {
			'date' : "2011.11.14",
					added : {
						pl : ['Dodanie emotek podczas pisania postu na forum lub wiadomości',
						      'Generowanie listy miast gracza w formacie BBCode',
						      'Generowanie listy graczy z danego sojuszu w formacie BBCode',
						      'Dodanie odliczania, po jakim czasie będzie możliwe użycie czaru, jeżeli brakuje łask'],
						en : ['The addition of emotes when posting on the forum or message',
						      'Generate a list of cities the player in BBCode format',
						      'Generate a list of players from the alliance in BBCode format',
						      'Adding a countdown, after which time it will be possible to use a spell, if there is no grace']
					}
		},
		"2.0.5"	: {
			'date' : "2011.11.08",
					fixed : {
						pl : ['Poprawiono gdy wyrocznia wykryła szpiega',
						      'Poprawiono konwersję raportu dot. skarbów podziemnego królestwa - deweloperzy zapomnieli wyświetlać ilość otrzymanego srebra',
						      'Korekta wielkości okna rozkazu, aby się pozbyć scroll\'a z prawej',
						      'Dodanie brakującego parametru do generowania podglądu'],
						en : ['Corrected when discovered, says the spy',
						      'Improved conversion of the report regarding the underground treasures of the kingdom - the developers forgot to show the quantity of the silver',
						      'Correction made to the command window to get rid of scroll from the right',
						      'Adding missing parameter to generate the preview']
					}
		},
		"2.0.4"	: {
			'date' : "2011.10.04",
					fixed : {
						pl : ['Poprawiono zaznaczanie aktualnego miasta w farmieniu wiosek',
						      'Poprawiono konwersję nadchodzącego ataku'],
						en : ['Improved current selection of the city in farmieniu villages',
						      'Improved conversion of the upcoming attack']
					}
		},
		"2.0.3"	: {
			'date' : "2011.10.04",
					fixed : {
						pl : ['Kocham deweloperów Grepolis! Poprawienie kodu wywoływania okien.'],
						en : ['I love developers Grepolis! Improving the code to call the windows.']
					}
		},
		"2.0.2"	: {
			'date' : "2011.10.04",
					fixed : {
						pl : ['Poprawiono konwersję rozkazu, gdy atakowana jest farma',
						      'Poprawiono konwersję raportu związanego z budową nowego miasta'],
						en : ['Fixed a conversion command when it is attacked farm',
						      'Improved conversion of the report related to the construction of a new city']
					}
		},
		"2.0.1"	: {
			'date' : "2011.09.26",
					fixed : {
						pl : ['Poprawiono konwersję czaru "Mądrość"'],
						en : ['Fixed conversion spell "Wisdom"']
					}
		},
		"2.0.0"	: {
					'date' : "2011.09.25",
					added : {
						pl : ['Rozdzielenie konwertera na dwie ścieżki: dla Grepolis v.1 (już nie rozwijane) i dla Grepolis v.2',
						      'Dla posiadaczy konta premium "Kapitan", w podglądzie wiosek automatycznie zaznacza się bieżące polis'],
						en : ['Separation of the converter on two paths: for Grepolis v.1 (closed) and for Grepolis v.2',
						      'For a premium account holders "Captain", in preview  the villages automatically selects of current town']
					},
					fixed : {
						pl : ['Podczas konwersji rozkazu, zamiast danych o miastach pojawiało się "undefined"'],
						en : ['During the conversion command, data about the cities appeared "undefined"']
					}
		},
		"1.0.4"	: {
					'date' : "2011.08.24",
					fixed : {
						pl : ['Drobna zmiana, dostosowanie do zmiany mechanizmu na BETA'],
						en : ['Small fix - adapt to changes in the mechanism of BETA']
					}
		},
		"1.0.3"	: {
					'date' : "2011.08.12",
					fixed : {
						pl : ['Podczas konwersji rozkazu, zamiast danych o miastach pojawiało się "undefined"'],
						en : ['During the conversion command, data about the cities appeared "undefined"']
					}
		},
		"1.0.2"	: {
					'date' : "2011.08.11",
					added : {
						pl : ['Wgląd do statystyk gracza w informacji o mieście (Grepolis v.2)',
						      'Konwersja pojedynczego rozkazu (Grepolis v.2)',
						      'Generowanie rezerwacji miasta',
						      'Dodanie możliwości ograniczenia zakresu konwertowanego muru miasta'],
						en : ['Access to statistics, player information about the city (Grepolis v.2)',
						      'Converting a single command (Grepolis v.2)',
						      'Generate claim of city',
						      'Added the possibility to limit the scope of the city wall of the converted']
					},
					fixed : {
						pl : ['Czasami po przełączaniu między oknami, nie dział konwerter'],
						en : ['Sometimes when switching between windows, not guns converter']
					}
		},
		"1.0.1"	: {
					'date' : "2011.08.01",
					fixed : {
						pl : ['Uwzględnienie raportu ataku z przebiciem'],
						en : ['Taking the report of the attack with breakthrough']
					}
		},
		"1.0.0"	: {
			'date' : "2011.08.01",
			added : {
				pl : ['Konwersja agory - kto i ile przysłał wsparcia',
				      'Funkcjonalność ukrywania miasta obrońcy / agresora'],
				en : ['Convert Agora - who sent support and how much',
				      'Functionality to hide the city defender / attacker']
			},fixed : {
				pl : ['Skrypt w większości napisany od nowa.', 
				      'Poprawienie raportów (nie pojawiają się obrazy "undefined")',
				      'Poprawiona konwersja muru miejskiego - działa poprawnie na Chrome i Firefox',
				      'Poprawiony wygląd raportu, gdy zaatakowane zostało nasze wsparcie'],
				en : ['Script written mostly from scratch.',
				      'Improving the reports (no images appear "undefined")',
				      'Improved conversion of the city wall - works fine in Chrome and Firefox',
				      'Improved appearance of the report, when our support has been attacked']
			}
		},
		"0.6.8"	: {
					'date' : "2011.06.08",
					fixed : {
						pl : ['Poprawienie raportu, gdy nie powiodła się misja szpiegowska.'],
						en : ['Improving the report when failed spy mission.']
					}
		},
		"0.6.7"	: {
					'date' : "2011.06.02",
					added : {
						pl : ['Funkcjonalność umożliwiająca zmianę wersji językowych. Obecnie dostępne: <i>en</i>, <i>pl</i>, <i>de</i>. Chcesz, aby konwerter był w Twoim języku? Napisz na adres <a href="mailto:potusek@westtax.info">potusek@westtax.info</a>'],
						en : ['The functionality to change the language versions. Currently available: <i>en</i>, <i>pl</i>, <i>de</i>. Want to make a converter in your language? Write to <a href="mailto:potusek@westtax.info">potusek@westtax.info</a>']
					},
					fixed : {
						pl : ['gdy szpiegowane było opuszczone miasto, zamiast nazwy gracza i sojuszu pojawiało się "undefined"'],
						en : ['the abandoned city was spied on, instead of the name of the player and the alliance appeared "undefined"']
					}
		},
		"0.6.6"	: {
					'date' : "2011.05.25",
					fixed : {
						pl : ['Poprawienie pobierania identyfikatora miasta w Grepolis v2.0'],
						en : ['Improving the collection of ID cities in Grepolis v2.0']
					}
		},
		"0.6.5"	: {
					'date' : "2011.05.16",
					added : {
						pl : ['Zapis muru umożliwiając porównanie po ataku/obronie.'],
						en : ['Record of the wall allowing the comparison after the attack / defense.']
					}
		},
		"0.6.4"	: {
					'date' : "2011.05.03",
					fixed : {
						pl : ['Usunięcie dodatkowego przycisku [Konwertuj] na raporcie szpiegowania w Grepolis v1.0'],
						en : ['Removal of extra button [Convert] to report spying in Grepolis v1.0']
					}
		},
		"0.6.3"	: {
					'date' : "2011.05.03",
					fixed : {
						pl : ['Błąd generowania raportu, gdy nie widać jednostek wroga (znak "?")'],
						en : ['Generate an error report when you do not see the enemy (symbol "?")']
					},
					added	 :  {
						pl : ['Zakładkę "Pomoc" - to okno'],
						en : ['The "Help" - this window']
					}
		},
		"0.6.2"	: {		
					'date' : "2011.04.24",
					fixed : {
						pl : ['Poprawienie konwersji muru dla Grepolis v1.0'],
						en : ['Improving the conversion of the wall for Grepolis v1.0']
					}
		},
		"0.6.1"	: {		
					'date' : "2011.04.23",
					added : {
						pl : ['Dodanie konwersji muru dla Grepolis v1.0'],
						en : ['Adding the conversion of the wall for Grepolis v1.0']
					}
		},
		"0.6.0"	: {		
					'date' : "2011.04.18",
					fixed : {
					  	pl : ['Rozbieżności pomiędzy wcześniejszym a obecnym kodem HTML gry'],
					  	en : ['Discrepancies between the earlier and the current code HTML the game']
				  	},
					added : {
					  	pl : ['Konwersja muru',
					  	      'Podgląd wygenerowanego kodu'],
						en : ['Converting wall',
						      'Preview of the generated code']
					}
		},
		"0.55"	: {		
						'date' : "2011.01.25",
						fixed : {
						  	pl : ['Dodano brakujący obrazek, gdy atak poległ i nie widać jednostek obrońcy',
						  	      'Usunięto powiązanie z firebug - powodowało zawieszenie konwertera'],
						  	en : ['Added missing image, where the attack was killed, and you do not see the defenders of units',
						  	      'Removed link with firebug - resulted in the suspension of the converter']
					  	},
						added : {
						  	pl : ['Konwersja muru'],
							en : ['Converting wall']
						}
		},
		"0.54"	: {		
			'date' : "2011.01.24",
			fixed : {
			  	pl : ['Zmiana sposobu generowania obrazów jednostek'],
			  	en : ['Changing the way we image generation unit']
		  	},
			added : {
			  	pl : ['Straty jednostek przeliczone na surowce (na prośbę Ponury Zniviarz)'],
				en : ['Loss of units converted into raw materials (at the request of Ponury Zniviarz)']
			}
		},
		"0.53"	: {		
			'date' : "2011.01.23",
			added : {
			  	pl : ['Tytuł raportu (na prośbę Ponury Zniviarz)',
			  	      'Raport użycia sił boskich, dodanie logo (na prośbę Ponury Zniviarz)',
			  	      'Wybór, gdzie ma być raport udostępniony tj. forum wewnętrzne/wiadomość czy też zewnętrzne (na prośbę Squnqs)',
			  	      'Działa na Grepolis w wersji 2.0 (Beta "world3")'],
				en : ['title of the report (on request Ponury Zniviarz)',
				      'report the use of divine power, adding a logo (at the request of Ponury Zniviarz)',
				      'Select where you want to report a forum that is available to internal / external message, or (at the request of Squnqs)',
				      'Grepolis Works on version 2.0 (Beta "world3")']
			}
		},
		"0.52"	: {		
			'date' : "2011.01.14",
			added : {
			  	pl : ['brakującej informacji o podburzaniu do buntu.'],
				en : ['the missing information about the incitement to rebellion.']
			}
		},
		"0.51"	: {		
			'date' : "2011.01.13",
			added : {
			  	pl : ['brakującej informacji, jakim czarem był wspierany atak.'],
				en : ['the missing information, which was supported by an attack spell']
			}
		},
		"0.5"	: {		
			'date' : "2011.01.14",
			added : {
			  	pl : ['Skrypt konwertuje raporty: rzucony czar, atak/obrona, szpiegowanie'],
				en : ['The script converts the reports: cast a spell, attack / defense, spy']
			}
		}
};


var RepConv = { 
		Scripts_name 	: "Grepolis Report Converter",
		Scripts_nameS	: "GRC",
		Scripts_url 	: "http://www.westtax.info/grepolis/",
		Scripts_link 	: "[url="+this.Scripts_url+"]"+this.Scripts_name+"[/url]",
		Scripts_version : "2.0.6",
		Const 			: {
							IdWindowName 	: 'repConvWindow',
							IdWindowHelp 	: 'repConvWindowHelp',
							IdWindowView 	: 'repConvWindowView',
							IdWindowClone	: 'repConvClone',
							IdParent 		: '#report_report',	//content_box',
							wood			: "http://static.grepolis.com/images/game/res/wood.png",
							stone			: "http://static.grepolis.com/images/game/res/stone.png",
							iron			: "http://static.grepolis.com/images/game/res/iron.png",
							bunt			: "http://static.grepolis.com/images/game/unit_overview/revolt_arising.png",
							footer			: this.Scripts_link+' - ver. '+this.Scripts_version+' created by Potusek',
							staticImg		: "http://www.westtax.info/grepolis/img/",
							morale			: "morale.png",
							luck			: "luck.png",
							oldwall			: "oldwall.png",
							nightbonus		: "nightbonus.png",
							unitImg			: "http://www.westtax.info/grepolis/static/",
							dataUrl			: "http://www.westtax.info/grepolis/data/stats.php",
							langUrl			: "http://www.westtax.info/scripts/",
							langUrl2		: "http://puw.homelinux.com/others/west.westy/chrome_grepolis/",
							textareastyle	: "width:717px; height:219px; font-size : 75%;",//"width:725px; height:240px; border: 1px solid; font-size : 75%; margin-top: 5px;",
							generator		: "http://www.westtax.info/grepolis/generuj.php"
						},
		Debug 			: false,
		LangLoaded		: false,
//		Grepolis2 		: true,

		Log				: function (value){
							if(RepConv.Debug)
								console.log(value);
						  },
		LangEnv			: Game.market_id, 
		LangEnvOld		: /*Game.locale_lang.replace(/([a-z*])_.*AQQ/,'$1'), */location.host.match(/([a-z]+)([0-9]+).*\.grepolis.*/i)[1],
		LangAvailable	: {'pl':'PL','en':'EN'},
		Cookie			: Game.player_name+"_"+location.host.split('.')[0],
		CookieNew		: Game.player_name+"_"+location.host.split('.')[0]+"_new",
		Lang 			: {},
		HelpTabs 		: {},
		RepType 		: "",
		Btn				: function (label){
							return $('<div/>')
									.append(($('<a/>', { 'class' : "button", 'href' : "#", 'style' : 'display:inline-block; vertical-align: middle;'})) 
									.append(($('<span/>', { 'class' : "left" })) 
									.append(($('<span/>', { 'class' : "right" })) 
									.append(($('<span/>', { 'class' : "middle"})).text(label)))))
									.html();
						},
		RCFormat		: String.prototype.RCFormat = function() {
						    var args = arguments;
						    return this.replace(/\{(\d+)\}/g, function() {
						        return args[arguments[1]];
						    });
						},
		strip_tags 		: String.prototype.strip_tags = function(){
							tags = this;
							stripped = tags.replace(/<\/?[^>]+>/gi, '');
							return stripped;
						},
		PublChanges		: function (lang){
							var resultHTML = $('<div/>');
							$.each(RepConvChanges, function(ver, detail) {
								resultHTML.append($('<h4/>').html(RepConvLangArray[lang].HLPVERSION+"&nbsp;"+ver+"&nbsp;"+detail.date));
								try {
									var lists = $('<ul/>', {'style' : "list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px"});
									$.each(detail.fixed[lang], function(id, text) {
										$('<li/>').html(text).appendTo(lists);
									});
									resultHTML.append($('<p/>', {'style' : "margin-bottom: 0px"}).html(RepConvLangArray[lang].HLPFIXED));
									resultHTML.append(lists);
								} catch (exp) {
								}
								try {
									var lists = $('<ul/>', {'style' : "list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px"});
									$.each(detail.added[lang], function(id, text) {
										$('<li/>').html(text).appendTo(lists);
									});
									resultHTML.append($('<p/>', {'style' : "margin-bottom: 0px"}).html(RepConvLangArray[lang].HLPADDED));
									resultHTML.append(lists);
								} catch (exp) {
								}
								resultHTML.append($('<hr/>'));
							});
							return resultHTML.html();
						},
			init		: function(){
							this.Scripts_link = "[url="+this.Scripts_url+"]"+this.Scripts_name+"[/url]";
							this.Const.footer = this.Scripts_link+' - ver. '+this.Scripts_version+' created by Potusek';
							if(RepConv.LangAvailable[RepConv.LangEnv] == undefined){
								RepConv.LangEnv = 'en';
							}
						},
			err404		: 0,
			AQQ			: {},
			currTown 	: ''
};

var RepConvLangArray = {};
var RepConvHelpTabs = {};
RepConv.init();

//var RepConvRepType = "";

RepConvLangArray.en = {
			INFO 		: ['Potusek', 'potusek@westtax.info'],
			WEBSITE 	: 'Website',
			AUTHOR		: 'Author',
			BTNCONV		: "Convert",
			BTNGENER	: "Generate",
			BTNSRC		: "Source",
			BTNVIEW		: "Preview",
			BTNSAVE		: "Save",
			MSGTITLE	: "Convert report",
			MSGQUEST	: "Which of the data you want to publish?",
			MSGALL		: "All",
			MSGBBCODE	: "Following the publication of the report, you can pair it with news and forums using the BBCode.",
			MSGRESOURCE	: "Loot",
			MSGUNITS	: "Units",
			MSGBUILD	: "Buildings",
			MSGUSC		: "Used silver coins",
			MSGRAW		: "Raw materials",
			SUPPORT		: "Support",
			SPY			: "Spying",
			CONQUER		: "Conquered",
			LOSSES		: "Losses",
			HIDDEN		: "Hidden",
			NOTUNIT		: "[i]None[/i]",
			TOWN		: "[i]Town:[/i] ",
			PLAYER		: "[i]Player:[/i] ",
			ALLY		: "[i]Ally:[/i] ",
			CAST		: "cast:",
			ONTOWER		: "On the town:",
			MSGHIDAD	: "Hide cities",
			MSGFORUM	: "The report will be published",
			BBALLY		: "alliance forums / in the message",
			BBFORUM		: "external forum",
			ERRGETSRC	: "An error occurred! Please, generate the source and send as an attachment to  potusek@westtax.info",
			ICOCLOSE	: "Close",
			ICOHELP		: "About converter",
			MSGPREVIEW	: "<b>Report preview</b>",
			HELPTAB1	: "About",
			HELPTAB2	: "How does it work",
			HELPTAB3	: "Changes",
			HLPVERSION	: "Version",
			HLPFIXED	: "Fixed",
			HLPADDED	: "Added",
			MSGHUMAN	: { 
							OK 		: "The information has been saved", 
							ERROR 	: "An error occurred while writing"
						  },
			STATS		: "Player stats",
			STATSPOINT	: "Points",
			STATSRANK	: "Rank",
			LABELS		: {
								attack : {
											ATTACKER	: "Attacker",
											DEFENDER	: "Defender",
											MSGHIDAT	: "attacker",
											MSGHIDDE	: "defender",
											MSGATTUNIT	: "Army attacking",
											MSGDEFUNIT	: "Army defenders"

										 },
								support : {
											ATTACKER	: "Supporting",
											DEFENDER	: "Supported",
											MSGHIDAT	: "supporting",
											MSGHIDDE	: "supported",
											MSGATTUNIT	: "Army supporting",
											MSGDEFUNIT	: "Army defenders"
										 },
								espionage : {
											ATTACKER	: "Spy",
											DEFENDER	: "Spied",
											MSGHIDAT	: "spy",
											MSGHIDDE	: "spied",
											MSGATTUNIT	: "",
											MSGDEFUNIT	: ""
										 }
							  },
			MSGDETAIL	: "command details",
			MSGRETURN	: "(return)",
			MSGCLAIM	: "city ​​reserves",
			MSGCLAIMPPUP: "Generate reservation",
			MSGGENBBCODE: "Generate a list of BBCode",
			MSGDEFSITE	: "Defeated...",
			MSGLOSSITE	: "Losses...",
			MSGASATT	: "...as an attacker",
			MSGASDEF	: "...as a defender",
			MSGDIFF1	: "do not show differences",
			MSGDIFF2	: "show differences",
			MSGDIFF3	: "show only the differences",
			BBCODELIMIT	: "In view of the limited amount of text in one post, in the case of a long list, the data were divided into groups. Each group paste as a separate entry."
				

};

//RepConv.Debug = true;
RepConv.Debug = false;
RepConv.Log(RepConv.LangEnv);

if ((location.pathname.indexOf("game") != -1) && (RepConv.LangEnv != "en") && (RepConv.LangEnv != "zz")){
	try{
		var RepConvLandScript = RepConv.Const.langUrl+'v2/RepConvV2'+(RepConv.LangEnv.toUpperCase())+'.user.js'; 
		RepConv.LangEnv = "en";
		$.ajax({ type: "GET",
				 url: RepConvLandScript,
				 dataType: "script",
				 async : false,
				 complete : function() { 
						RepConv.Log("complete");
						RepConv.LangLoaded = true;
				 }
		});
	} catch (ex) {
		RepConv.Log('Not Load!!');
		RepConv.LangEnv = "en";
		RepConv.LangLoaded = true;
	}
}

if ((RepConv.LangEnv == "en") || (RepConv.LangEnv == "zz")){
	RepConv.LangEnv = "en";
	RepConv.LangLoaded = true;
}

if (RepConvLangArray[RepConv.LangEnv] == undefined){
	RepConv.LangEnv = "en";
	RepConv.LangLoaded = true;
}


RepConv.Log(RepConv.LangEnv);
RepConv.Lang = RepConvLangArray[RepConv.LangEnv];

RepConvHelpTabs = {
		en : {
			HELPTAB1 : 	'<p>The converter was created partially out of boredom, and partially to make mine and other people\'s life on Grepolis easier. '+
						'Because the game doesn\'t offer a publication of all the reports, only some (and publication is available only for a few days), '+
						'I wrote a report converter.</p>'+ 
						'<p style="margin-bottom: 0px">As of now it converts:</p>'+ 
						'<ul style="list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px">'+ 
						'	<li>use of godly powers</li>'+ 
						'	<li>attack/deffense</li>'+ 
						'	<li>spying</li>'+ 
						'	<li>wall</li>'+
						'</ul>'+ 
						'<p>Additional functions are:</p>'+ 
						'<ul style="list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px">'+ 
						'	<li>genereation of reservations</li>'+ 
						'	<li>a look into player\'s statistics (graphs)</li>'+ 
						'	<li>saving the wall for the given moment</li>'+
						'</ul>'+ 
						'<p>The project is continously developed and other news will be posted in "Changes" as they come.</p>',
			HELPTAB2 : 	'<p>The converter translates the game\'s reports into BBCode format, making it possible to include it '+
						'in the body of a message, or post it on the game\'s forum or an external one.</p>'+ 
						'<p>When on a given screen the convertion is possible, in the lower part of the window a '+RepConv.Btn(RepConv.Lang.BTNCONV)+' '+ 
						'button becomes visible. After clicking the mentioned button, a window shows up, making it '+ 
						'possible to convert.</p>'+ 
						'<p>Because the generated code differs depending on it\'s purpose (a different one is used inside the game, '+
						'e.g. for an attachment to a message or internal forum, and a different one if we want to post it on an external '+
						'forum), the right correct type needs to be chosen. Default setting is "alliances forum / in a message."</p>'+ 
						'<p>As of now, it is possible to generate a wall (number of units killed and lost), and also a row reports.</p>'+ 
						'<p style="margin-bottom: 0px">Depending on the type of the converted report, it is possible to choose additional options, e.g:'+ 
						'<ul style="list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px">'+ 
						'	<li>for reports in regards to attack/deffence:'+ 
						'		<ul style="list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px">'+
						'			<li>whether the attacker\'s troops are to be vissible</li>'+ 
						'			<li>whether the deffender\'s troops are to be vissible</li>'+ 
						'			<li>whether the losses of goods are to be vissible</li>'+
						'		</ul>'+
						'	</li>'+
						'	<li>for reports in regards to spying'+
						'		<ul style="list-style-type:square; padding: 0 0 0 18px; margin: 0 0 0 18px">'+
						'			<li>whether the buildings are to be vissible</li>'+ 
						'			<li>whether the units are to be vissible</li>'+ 
						'			<li>whether the goods are to be vissible</li>'+ 
						'			<li>whether the number of silver coins used is to be vissible</li>'+ 
						'		</ul>'+
						'	</li>'+
						'</ul>'+
						'<p>After choosing the appropriate options, push the '+RepConv.Btn(RepConv.Lang.BTNGENER)+' button, and in the lower part a preview'+ 
						'of the final code shows up. To copy the generated code, it\'s enough to go to the generated code'+ 
						'by pushing the '+RepConv.Btn('BBCode')+' button and highlight entire generated code, click it once with the left'+ 
						'mouse button. Next, it\'s possible to copy to the clipboard (combination of <b>[Ctrl]+[C]</b> keys)'+ 
						'and then paste it all (combination of <b>[Ctrl]+[V]</b> keys) in the appropriate spot, which is body of a '+ 
						'message or a forum post.</p>',
			HELPTAB3 : 	RepConv.PublChanges("en")
		}
};

var RepConvTool = {
	GetLabel	  : function(label){
		return RepConv.Lang[label];
	},
	getUnitDetail : function(result, item){
		for ( var ai = 0; ai < $(item + ' div.report_unit').length; ai++){
			if(result.unit_list.length > 0){
				result.unit_list += ".";
			}
			var RCunit = $(item + ' div.report_unit')[ai].getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_40x40.png','');
			var RCcost = RepConvTool.GetUnitCost(RCunit);
			var RClost = $(item + ' span.report_losts')[ai].innerHTML.replace("-","");
			if (RClost == "?"){
				RClost = 0;
			} else {
				result.w += RCcost.w * parseInt(RClost);
				result.s += RCcost.s * parseInt(RClost);
				result.i += RCcost.i * parseInt(RClost);
				result.p += RCcost.p * parseInt(RClost);
				result.f += RCcost.f * parseInt(RClost);
			}
			result.unit_list	+= RepConvTool.GetUnit(RCunit); 
			result.unit_img		+= RepConvTool.GetUnit(RCunit);
			
			if ($(item + ' div.report_unit span.place_unit_black')[ai] 		!= undefined){
				result.unit_send 	+= RepConvTool.Unit($(item + ' div.report_unit span.place_unit_black')[ai].innerHTML,"000")+RepConvType.separator;
			} else {
				result.unit_send 	+= RepConvTool.Unit($(item + ' div.report_unit span.bold')[ai].innerHTML,"000")+RepConvType.separator;
			}
			result.unit_lost 	+= RepConvTool.Unit($(item + ' span.report_losts')[ai].innerHTML.replace("-",""),"b50307")+RepConvType.separator;
			
		}
		
		if (result.unit_list.length > 0){
			result.unit_img = RepConvTool.Adds((RepConv.Const.genImg).RCFormat(RepConvType.sign, result.unit_list),"img");
		}
		return result;
	},
	getUnit : function(result, item, counts){
		var list = -1;
		for ( var ai = 0; ai < $(item).length; ai++){
			if (ai % counts == 0){
				if(list>-1){
					if (result[list].unit_list.length > 0){
						result[list].unit_img = RepConvTool.Adds((RepConv.Const.genImg).RCFormat(RepConvType.sign, result[list].unit_list),"img");
					}
				}
				list++;
				result.Count=list;
			}
			if(result[list].unit_list.length > 0){
				result[list].unit_list += ".";
			}
			var RCunit = $(item)[ai].getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');

			result[list].unit_list	+= RepConvTool.GetUnit(RCunit); 
			result[list].unit_img	+= RepConvTool.GetUnit(RCunit);
			result[list].unit_send 	+= RepConvTool.Unit($(item + ' span.place_unit_black')[ai].innerHTML,"000")+RepConvType.separator;
		}
		if(list>-1){
			if (result[list].unit_list.length > 0){
				result[list].unit_img = RepConvTool.Adds((RepConv.Const.genImg).RCFormat(RepConvType.sign, result[list].unit_list),"img");
			}
		}
		return result;
	},
	getUnitArray : function(result, array, counts){
		var list = -1;
		var ai = 0;
		$.each(array, function(ARunit, ARcount){
			if (ARunit.indexOf('_diff') > 0){
				result[list].unit_diff 	+= RepConvTool.Unit(ARcount,"060")+RepConvType.separator;
			} else {
				if (ai % counts == 0){
					if(list>-1){
						if (result[list].unit_list.length > 0){
							result[list].unit_img = RepConvTool.Adds((RepConv.Const.genImg).RCFormat(RepConvType.sign, result[list].unit_list),"img");
						}
					}
					list++;
					result.Count=list;
				}
				if(result[list].unit_list.length > 0){
					result[list].unit_list += ".";
				}
				//var RCunit = $(item)[ai].getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');
	
				result[list].unit_list	+= RepConvTool.GetUnit(ARunit); 
				result[list].unit_img	+= RepConvTool.GetUnit(ARunit);
				result[list].unit_send 	+= RepConvTool.Unit(ARcount,"000")+RepConvType.separator;
				RepConv.Log('result[list]='+result[list]);
				RepConv.Log('ARunit='+ARunit);
				ai++;
			}
		});
		if(list>-1){
			if (result[list].unit_list.length > 0){
				result[list].unit_img = RepConvTool.Adds((RepConv.Const.genImg).RCFormat(RepConvType.sign, result[list].unit_list),"img");
			}
		}
		return result;
	},
	REPORTS		: 'report',
	WALL		: 'wall',
	AGORA		: 'agora',
	COMMANDLIST	: 'commandList',
	COMMAND		: 'command',
	CONQUER		: 'conquerold',
 	groupsUnit	: {
					 defAtt : 'div#building_wall li:nth-child(4) div.list_item_left div.wall_unit_container div.wall_report_unit',
					 defDef	: 'div#building_wall li:nth-child(6) div.list_item_left div.wall_unit_container div.wall_report_unit',
					 losAtt	: 'div#building_wall li:nth-child(4) div.list_item_right div.wall_unit_container div.wall_report_unit',
					 losDef	: 'div#building_wall li:nth-child(6) div.list_item_right div.wall_unit_container div.wall_report_unit'
				},
	typUnits 	: {1:['defAtt','losAtt'], 2:['defDef','losDef']},
	saveWall	: function(){
		try{
			var cookie = {'defAtt':{},'losAtt':{}, 'defDef':{}, 'losDef':{}};
			$.each($('div#building_wall li.odd'), function(indLi, elemLi){
				if(indLi > 0){
					$.each(elemLi.getElementsByClassName('list_item_left'), function(indGr, elemGr){
						$.each(elemGr.getElementsByClassName('wall_report_unit'), function(indUn, elemUn){
							unitName = elemUn.getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');
							unitKill = elemUn.getElementsByClassName('place_unit_black')[0].innerHTML;
							cookie[RepConvTool.typUnits[indLi][indGr]][unitName] = unitKill; 
						});
					});
					$.each(elemLi.getElementsByClassName('list_item_right'), function(indGr, elemGr){
						$.each(elemGr.getElementsByClassName('wall_report_unit'), function(indUn, elemUn){
							unitName = elemUn.getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');
							unitKill = elemUn.getElementsByClassName('place_unit_black')[0].innerHTML;
							cookie[RepConvTool.typUnits[indLi][indGr+1]][unitName] = unitKill; 
						});
					});
				}
			});
			$.cookie(RepConv.Cookie, JSON.stringify(cookie), { expires : 300, path : '/'});
			HumanMessage.success(RepConv.Lang.MSGHUMAN.OK);
			if($('#'+RepConv.Const.IdWindowClone).length == 1){
				$('#'+RepConv.Const.IdWindowClone).remove();
			}
			RepConvTool.loadWall();
		} catch (err) {
			HumanMessage.error(RepConv.Lang.MSGHUMAN.ERROR);
		}
	},
	loadWall	: function(){
		RepConv.Log('Load wall...');
		if ( $.cookie(RepConv.Cookie) != null ){
			var units = JSON.parse($.cookie(RepConv.Cookie));
			$('div#building_wall.game_inner_box div.wall_report_unit')
				.css('margin-bottom','20px');
			$('div#building_wall.game_inner_box div.wall_report_unit div.RepConvDiff')
				.remove();
			$('div#building_wall.game_inner_box div.wall_report_unit')
				.append($('<div/>', {
										'class' : 'RepConvDiff', 
										'style' : 'position: absolute; top: 50px; right: 2px; font-weight: bold; color: green'})
										.html("-"));
			RepConv.Log('Load wall...');
			$.each($('div#building_wall li.odd'), function(indLi, elemLi){
				if(indLi > 0){
					RepConv.Log(elemLi.getElementsByClassName('list_item_left').length);
					$.each(elemLi.getElementsByClassName('list_item_left'), function(indGr, elemGr){
						RepConv.Log(RepConvTool.typUnits[indLi][indGr]);
						RepConv.Log(elemGr.getElementsByClassName('wall_report_unit').length);
						$.each(elemGr.getElementsByClassName('wall_report_unit'), function(indUn, elemUn){
							unitName = elemUn.getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');
							unitKill = elemUn.getElementsByClassName('place_unit_black')[0].innerHTML;
							unitSave = units[RepConvTool.typUnits[indLi][indGr]][unitName];
							RepConv.Log(unitName+' '+unitSave+'/'+unitKill);
							unitDiff = unitKill;
							if (unitSave != undefined){
								unitDiff = unitKill - unitSave;
							}
							RepConv.Log('unitDiff = '+unitDiff);
							elemUn.getElementsByClassName('RepConvDiff')[0].innerHTML = (unitDiff != 0) ? unitDiff : '';
						});
					});
					RepConv.Log(elemLi.getElementsByClassName('list_item_right').length);
					$.each(elemLi.getElementsByClassName('list_item_right'), function(indGr, elemGr){
						RepConv.Log(RepConvTool.typUnits[indLi][indGr+1]);
						RepConv.Log(elemGr.getElementsByClassName('wall_report_unit').length);
						$.each(elemGr.getElementsByClassName('wall_report_unit'), function(indUn, elemUn){
							unitName = elemUn.getAttribute('style').replace(/.*url\(['"]?([^'"]*)['"]?\);.*/, '$1').split('/')[6].replace('_50x50.png','');
							unitKill = elemUn.getElementsByClassName('place_unit_black')[0].innerHTML;
							unitSave = units[RepConvTool.typUnits[indLi][indGr+1]][unitName];
							unitDiff = unitKill;
							RepConv.Log(unitName+' '+unitSave+'/'+unitKill);
							if (unitSave != undefined){
								unitDiff = unitKill - unitSave;
							}
							RepConv.Log('unitDiff = '+unitDiff);
							elemUn.getElementsByClassName('RepConvDiff')[0].innerHTML = (unitDiff != 0) ? unitDiff : ''; 
						});
					});
				}
			});
		}
	},
	newVersion	: function(){
		var lastVersion = "";
		if ( $.cookie(RepConv.CookieNew) != null ){
			lastVersion = JSON.parse($.cookie(RepConv.CookieNew));
		}
		if ( lastVersion != RepConv.Scripts_version ){
			setTimeout("RepConvAdds.Help('HELPTAB3')",3000);
		}
	},

	Adds	: function(value, adds){
		if (value != undefined){
			if (value.length > 0){
				return "["+adds+"]"+value+"[/"+adds+"]";
			}
		}
		return value;
	},


	AddSize	: function(value, size){
		if (value.length > 0 && $('#BBCODEA').attr('checked'))
			return "[size="+size+"]"+value+"[/size]";
		return value;
	},
	AddFont	: function(value, font){
		if (value.length > 0 && font != "")
			return "[font="+font+"]"+value+"[/font]";
		return value;
	},
	White	: function(value, length){
//		if ($('#BBCODEA').attr('checked')){
//			return RepConvTool.Color((RepConvType.blank).slice(1,length-value.length),"FFF");
//		} else {
			return (RepConvType.blank).slice(1,length-value.length);
//		}
	},

	Color	: function(value, color){
		return "[color=#"+color+"]"+value+"[/color]";
	},

	Unit	: function(value, color){
		RepConv.Log(value);
		//return RepConvTool.White(value, RepConvType.unitDigits)+RepConvTool.Color(value, color);
		return RepConvTool.White(value, RepConvType.unitDigits)+value;
	},

	Value	: function(value, len){
		return RepConvTool.White(String(value), len)+String(value);
	},

	GetUnit	: function(attr){
		switch(attr){
			case "sword" 				: return "A1"; break;
			case "slinger" 				: return "B1"; break;
			case "archer" 				: return "C1"; break;
			case "hoplite" 				: return "D1"; break;
			case "rider" 				: return "E1"; break;
			case "chariot" 				: return "F1"; break;
			case "catapult" 			: return "G1"; break;
			case "big_transporter" 		: return "A2"; break;
			case "bireme" 				: return "B2"; break;
			case "attack_ship" 			: return "C2"; break;
			case "demolition_ship" 		: return "D2"; break;
			case "small_transporter" 	: return "E2"; break;
			case "trireme" 				: return "F2"; break;
			case "colonize_ship" 		: return "G2"; break;
			case "zyklop" 				: return "A3"; break;
			case "sea_monster" 			: return "B3"; break;
			case "harpy" 				: return "C3"; break;
			case "medusa" 				: return "D3"; break;
			case "minotaur" 			: return "E3"; break;
			case "manticore" 			: return "F3"; break;
			case "centaur" 				: return "G3"; break;
			case "pegasus" 				: return "H3"; break;
			case "cerberus" 			: return "I3"; break;
			case "fury" 				: return "J3"; break;
			case "militia" 				: return "A4"; break;
			case "unkown"				: return "XX"; break;
			case "unknown"				: return "XX"; break;
		}
	},

	GetUnitCost	: function(attr){
		switch(attr){
			case "sword" 				: return {	w:	   95,	s:	    0,	i:	   85,	p:	  1,	f:	  0}; break;
			case "slinger" 				: return {	w:	   55,	s:	  100,	i:	   40,	p:	  1,	f:	  0}; break;
			case "archer" 				: return {	w:	  120,	s:	    0,	i:	   75,	p:	  1,	f:	  0}; break;
			case "hoplite" 				: return {	w:	    0,	s:	   75,	i:	  150,	p:	  1,	f:	  0}; break;
			case "rider" 				: return {	w:	  240,	s:	  120,	i:	  360,	p:	  3,	f:	  0}; break;
			case "chariot" 				: return {	w:	  200,	s:	  440,	i:	  320,	p:	  4,	f:	  0}; break;
			case "catapult" 			: return {	w:	 1200,	s:	 1200,	i:	 1200,	p:	 15,	f:	  0}; break;
			case "big_transporter" 		: return {	w:	  500,	s:	  500,	i:	  400,	p:	  7,	f:	  0}; break;
			case "bireme" 				: return {	w:	  800,	s:	  700,	i:	  180,	p:	  8,	f:	  0}; break;
			case "attack_ship" 			: return {	w:	 1300,	s:	  300,	i:	  800,	p:	 10,	f:	  0}; break;
			case "demolition_ship" 		: return {	w:	  500,	s:	  750,	i:	  150,	p:	  8,	f:	  0}; break;
			case "small_transporter" 	: return {	w:	  800,	s:	    0,	i:	  400,	p:	  5,	f:	  0}; break;
			case "trireme" 				: return {	w:	 2000,	s:	 1300,	i:	  900,	p:	 16,	f:	  0}; break;
			case "colonize_ship" 		: return {	w:	10000,	s:	10000,	i:	10000,	p:	170,	f:	  0}; break;
			case "zyklop" 				: return {	w:	 2000,	s:	 4200,	i:	 3360,	p:	 40,	f:	360}; break;
			case "sea_monster" 			: return {	w:	 5400,	s:	 2800,	i:	 3800,	p:	 50,	f:	400}; break;
			case "harpy" 				: return {	w:	 1600,	s:	  400,	i:	 1360,	p:	 14,	f:	130}; break;
			case "medusa" 				: return {	w:	 1500,	s:	 3800,	i:	 2200,	p:	 18,	f:	210}; break;
			case "minotaur" 			: return {	w:	 1400,	s:	  600,	i:	 3100,	p:	 30,	f:	202}; break;
			case "manticore" 			: return {	w:	 4400,	s:	 3000,	i:	 3400,	p:	 45,	f:	405}; break;
			case "centaur" 				: return {	w:	 1740,	s:	  300,	i:	  700,	p:	 12,	f:	100}; break;
			case "pegasus" 				: return {	w:	 2800,	s:	  360,	i:	   80,	p:	 20,	f:	180}; break;
			case "cerberus" 			: return {	w:	 1250,	s:	 1500,	i:	 3000,	p:	 30,	f:	230}; break;
			case "fury" 				: return {	w:	 2500,	s:	 5000,	i:	 5000,	p:	 55,	f:	480}; break;
			case "militia" 				: return {	w:	    0,	s:	    0,	i:	    0,	p:	  0,	f:	  0}; break;
			default						: return {	w:	    0,	s:	    0,	i:	    0,	p:	  0,	f:	  0}; break;
		}
	},

	GetBuild	: function(attr){
		switch(attr){
			case "main" 				: return "A9"; break;
			case "storage" 				: return "B9"; break;
			case "hide" 				: return "C9"; break;
			case "farm" 				: return "D9"; break;
			case "place" 				: return "E9"; break;
			case "lumber" 				: return "F9"; break;
			case "stoner" 				: return "G9"; break;
			case "ironer" 				: return "H9"; break;
			case "market" 				: return "I9"; break;
			case "docks" 				: return "J9"; break;
			case "wall" 				: return "K9"; break;
			case "academy" 				: return "L9"; break;
			case "temple" 				: return "M9"; break;
			case "barracks" 			: return "N9"; break;
			case "theater" 				: return "O9"; break;
			case "thermal" 				: return "P9"; break;
			case "library" 				: return "R9"; break;
			case "lighthouse" 			: return "S9"; break;
			case "tower" 				: return "T9"; break;
			case "statue" 				: return "U9"; break;
			case "oracle" 				: return "V9"; break;
			case "trade_office" 		: return "W9"; break;
		}
	},
	AddBtn		: function(pId, pWndName){
			WndName = pWndName || '';
			
			RepConv.Log(WndName);
			return $('<a/>', { 
								'id' : pId+pWndName, 
								'class' : "button", 
								'href' : "#", 
								'style' : "float: right; ", 
								'rel' : '#'+pWndName
							}) 
							.append((jQuery('<span/>', { 'class' : "left" }))
						    .append((jQuery('<span/>', { 'class' : "right" })) 
						    .append((jQuery('<span/>', { 'class' : "middle"})).text(RepConvTool.GetLabel(pId)))) 
						    .append(jQuery('<span/>', { 'style' : "clear: both; " })));
		},
	AddsBtns	: function(that){
		var RepConvGPWindow = that;
		var RepConvForm = false;
		RepConv.AQQ = that;
		if (typeof RepConvGPWindow != 'undefined') {
			switch (RepConvGPWindow.type){
				case Layout.wnd.TYPE_CUSTOM:/*0*/				
					break;
				case Layout.wnd.TYPE_TOWNINDEX:/*1*/			
					break;
				case Layout.wnd.TYPE_FARM_TOWN:/*2*/
					RepConvGPWindow.setPosition(["center","center"]);
					break;
				case Layout.wnd.TYPE_WONDERS:/*3*/				
					break;
				case Layout.wnd.TYPE_TOWN:/*4*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_ISLAND:/*5*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_ALLIANCE:/*6*/				
					break;
				case Layout.wnd.TYPE_ALLIANCE_FORUM:/*7*/
					RepConvTool.addsEmots(RepConvGPWindow, '.bb_button_wrapper', '#forum_post_textarea');
					break;
				case Layout.wnd.TYPE_ALLIANCE_PROFILE:/*8*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_QUEST:/*9*/				
					break;
				case Layout.wnd.TYPE_BUILDING:/*10*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_MARKET:/*11*/				
					break;
				case Layout.wnd.TYPE_PHOENICIANSALESMAN:/*12*/	
					break;
				case Layout.wnd.TYPE_RANKING:/*13*/				
					break;
				case Layout.wnd.TYPE_TOWN_OVERVIEWS:/*14*/	// lista rozkazów	
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_ATTACK_PLANER:/*15*/		
					break;
				case Layout.wnd.TYPE_MESSAGE:/*16*/
					RepConvTool.addsEmots(RepConvGPWindow, 
											'.bb_button_wrapper', 
											((RepConvGPWindow.getJQElement()).find('#message_new_message').length > 0 ) 
											? '#message_new_message'
											: '#message_reply_message');
					break;
				case Layout.wnd.TYPE_REPORT:/*17*/	// raporty
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_DIALOG:/*18*/
					break;
				case Layout.wnd.TYPE_UNINHABITED_PLACE:/*19*/	
					break;
				case Layout.wnd.TYPE_MEMO:/*20*/				
					break;
				case Layout.wnd.TYPE_PREMIUM:/*21*/				
					break;
				case Layout.wnd.TYPE_PLAYER_PROFILE_EDIT:/*23*/	
					break;
				case Layout.wnd.TYPE_PLAYER_PROFILE:/*24*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_PLAYER_SETTINGS:/*25*/		
					break;
				case Layout.wnd.TYPE_PUBLISH_REPORT:/*26*/		
					break;
				case Layout.wnd.TYPE_COLOR_TABLE:/*27*/			
					break;
				case Layout.wnd.TYPE_CONQUEST:/*28*/
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_ATK_COMMAND:/*29*/ // pojedynczy rozkaz
					RepConvGPWindow.setHeight(400); // korekta, aby się pozbyć scroll'a z prawej
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_CONQUEROR:/*30*/ // stary system podboju
					RepConvForm = true;
					break;
				case Layout.wnd.TYPE_CHAT:/*31*/				
					break;
//				case Layout.wnd.TYPE_DAILY_REWARD:/*30*/		
//					break;
				case Layout.wnd.TYPE_DIRECTION_XSELLING:/*32*/
					break;
				case Layout.wnd.TYPE_FARM_TOWN_OVERVIEWS:/*33*/
					(RepConvGPWindow.getJQElement()).find($('#fto_town_list li')).attr('style', 'border-right:0px');// solid #D0BE97');
					(RepConvGPWindow.getJQElement()).find($('#fto_town_list li.town'+Game.townId)).attr('style', 'border-right: 5px solid green');
					if(((RepConvGPWindow.getJQElement()).find($('#fto_town_list li.town'+Game.townId+'.active'))).length == 0 && RepConv.currTown != Game.townId){
						RepConv.currTown = Game.townId;
						((RepConvGPWindow.getJQElement()).find($('#fto_town_list li.town'+Game.townId))).click();
					}
					break;
				case Layout.wnd.TYPE_ACK_CHOOSE_TOWN: /*34*/ 	
					break;
			}
			if (RepConvForm){
				var WndName = (RepConvGPWindow).getName();
				var WndId   = '#'+WndName;
				
				// wyspa
				if ( RepConvGPWindow.type == Layout.wnd.TYPE_ISLAND ){
					if ((RepConvGPWindow.getJQElement()).find($('#RepConvIsland')).length == 0){
						(RepConvGPWindow.getJQElement()).find($('.center1')).toggle();
						$.each((RepConvGPWindow.getJQElement()).find($('.game_list')), function(ind,elem){
							$(elem).animate({'height':'+=86'});
						});

						RepConvGPWindow.appendContent(
							$('<a/>', { 
								'id' 	: 'RepConvIsland', 
								'class' : 'unit_order_show',
								'style'	: 'position : absolute; top: 495px; right: 0px',
								'rel' 	: '-'
							}).click(function(){
								(RepConvGPWindow.getJQElement()).find($('.center1')).toggle(200);
								var zn = this.getAttribute('rel');
								$.each((RepConvGPWindow.getJQElement()).find($('.game_list')), function(ind,elem){
									$(elem).animate({'height':zn+'=86'},200);
								});
								if (this.getAttribute('rel') == '+'){
									$(this).removeClass('unit_order_hide');
								} else {
									$(this).addClass('unit_order_hide');
								}
								this.setAttribute('rel', (this.getAttribute('rel') == '+') ? '-' : '+');
							})
						);
					}
				}

				// info o graczu - dodanie listy miast w BBCode
				if (RepConvGPWindow.type == Layout.wnd.TYPE_PLAYER_PROFILE){ 
					if ( (RepConvGPWindow.getJQElement()).find($(WndId+'RepConvTownButton')).length == 0 ) {
						$('<a/>', { 'class' : "button", 
									'href' 	: "#", 
									'style' : "position:absolute; top:-2px; right:0px;",
									'id' 	: WndName+'RepConvTownButton',
									'rel' 	: WndId+'RepConvTownArea',
									'parent': WndId+' #player_towns'
						}) 
							.append(($('<span/>', { 'class' : "left" })) 
							.append(($('<span/>', { 'class' : "right" })) 
							.append(($('<span/>', { 'class' : "middle"})).text("BBCode"))) 
							.append($('<span/>', { 'style' : "clear: both; " })))
						.click(function(){
							//---------------
							var TmpTextArray = {};
							var currArray = 0;
							
							var TmpTextTown = '';
							TmpTextTown = '[player]';
							TmpTextTown += (RepConvGPWindow.getJQElement()).find($('#player_info h3')).html();
							TmpTextTown += '[/player]';
							if ($('#player_info>a').length > 0){
								TmpTextTown += ' ([ally]';
								TmpTextTown += $('#player_info>a').html();
								TmpTextTown += '[/ally])';
							}
							TmpTextTown += '\n[table]\n';
							$.each((RepConvGPWindow.getJQElement()).find($('#player_towns ul.game_list li')), function(ind,elem){
								tmp = $(elem).find('a.gp_town_link').attr('href').split(/#/);
								tmpArray={};
								eval('tmpArray=' + atob(tmp[1]||tmp[0]));
								TmpText  = '[*]'+(ind+1)+'.[|][town]';
								TmpText += tmpArray['id'].toString();
								TmpText += '[/town][|]';
								TmpText += '[b]M'+Math.floor(tmpArray['ix']/100).toString()+Math.floor(tmpArray['iy']/100).toString()+'[/b][|]';
								TmpText += ''+$(elem).find('span').html().trim();
								TmpText += '[/*]\n';
								if ((TmpTextTown+TmpText).length > 3000){
									TmpTextArray[currArray] = TmpTextTown+'[/table]';
									currArray++;
									TmpTextTown = '[player]';
									TmpTextTown += (RepConvGPWindow.getJQElement()).find($('#player_info h3')).html();
									TmpTextTown += '[/player]';
									if ($('#player_info>a').length > 0){
										TmpTextTown += ' ([ally]';
										TmpTextTown += $('#player_info>a').html();
										TmpTextTown += '[/ally])';
									}
									TmpTextTown += '\n[table]\n';
								} else {
									TmpTextTown += TmpText; 
								}
							});
							TmpTextArray[currArray] = TmpTextTown+'[/table]';
							//---------------
							if (typeof RepConvParamWnd != 'undefined')
								RepConvParamWnd.close(); 
							RepConvParamWnd = Layout.dialogWindow.open('',RepConv.Scripts_name,500,580,null,false);
							RepConvParamWnd.setHeight(480);
							RepConvParamWnd.setPosition(["center","center"]);
							RepConvParamWnd.appendContent($('<div/>',{'style':'width:100%'}).html(RepConv.Lang.BBCODELIMIT));
							$.each(TmpTextArray, function(ind,elem){
								RepConvParamWnd.appendContent(
										$('<textarea/>',{
															'class' 	: 'message_post_content',
															'style' 	: 'height: 160px; width: 98%; border: 1px solid #D1BF91',
															'readonly'	: 'readonly'
										}).text(elem)
										.click(function(){
											this.select();
										})
								);
							});
						})
						.insertBefore(WndId+' #player_towns div.game_border_top');
						//.appendTo(WndId+' #player_towns ');
					}
				}

				// info o graczach w sojuszu - dodanie listy w BBCode
				if (RepConvGPWindow.type == Layout.wnd.TYPE_ALLIANCE_PROFILE){
					if ( (RepConvGPWindow.getJQElement()).find($(WndId+'RepConvTownButton')).length == 0 ) {
						$('<a/>', { 'class' : "button", 
							'href' 	: "#", 
							'style' : "position:absolute; top:-2px; right:0px;",
							'id' 	: WndName+'RepConvTownButton',
							'rel' 	: WndId+'RepConvTownArea',
							'parent': WndId+' #player_towns'
						}) 
							.append(($('<span/>', { 'class' : "left"})) 
							.append(($('<span/>', { 'class' : "right"})) 
							.append(($('<span/>', { 'class' : "middle"})).text("BBCode"))) 
							.append($('<span/>', { 'style' : "clear: both; "})))
						.click(function(){
							//---------------
							var TmpTextArray = {};
							var currArray = 0;
							
							var TmpTextTown = '';
							TmpTextTown = TmpTextTown = '[ally]';
							TmpTextTown += (RepConvGPWindow.getJQElement()).find($('#player_info h3')).html();
							TmpTextTown += '[/ally]';
							TmpTextTown += '\n[table]\n';
							$.each((RepConvGPWindow.getJQElement()).find($('#ally_towns ul.members_list>li:nth-child(2) ul li')), function(ind,elem){
								TmpText  = '[*]'+(ind+1)+'.[|][player]';
								TmpText += $(elem).find('a.gp_player_link').html();
								TmpText += '[/player][|]';
								TmpText += $(elem).find('div.small-descr').html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").replace(',','[|]');
								TmpText += '[/*]\n';
								if ((TmpTextTown+TmpText).length > 3000){
									TmpTextArray[currArray] = TmpTextTown+'[/table]';
									currArray++;
									TmpTextTown = TmpTextTown = '[ally]';
									TmpTextTown += (RepConvGPWindow.getJQElement()).find($('#player_info h3')).html();
									TmpTextTown += '[/ally]';
									TmpTextTown += '\n[table]\n';
								} else {
									TmpTextTown += TmpText; 
								}
							});
							TmpTextArray[currArray] = TmpTextTown+'[/table]';
							//---------------
							if (typeof RepConvParamWnd != 'undefined')
								RepConvParamWnd.close(); 
							RepConvParamWnd = Layout.dialogWindow.open('',RepConv.Scripts_name,500,580,null,false);
							RepConvParamWnd.setHeight(480);
							RepConvParamWnd.setPosition(["center","center"]);
							RepConvParamWnd.appendContent($('<div/>').html(RepConv.Lang.BBCODELIMIT));
							$.each(TmpTextArray, function(ind,elem){
								RepConvParamWnd.appendContent(
										$('<textarea/>',{
															'class' 	: 'message_post_content',
															'style' 	: 'height: 160px; width: 98%; border: 1px solid #D1BF91',
															'readonly'	: 'readonly'
										}).text(elem)
										.click(function(){
											this.select();
										})
								);
							});
						})
						.insertBefore(WndId+' #ally_towns div.game_border_top');

//					if ( (RepConvGPWindow.getJQElement()).find($(WndId+'RepConvTownButton')).length == 0 ) {
//						
//						var TmpTextTown = '[ally]';
//						TmpTextTown += (RepConvGPWindow.getJQElement()).find($('#player_info h3')).html();
//						TmpTextTown += '[/ally]';
//						//TmpTextTown += '\n══════════════════════════════════\n';
//						TmpTextTown += '\n[table]\n';
//						$.each((RepConvGPWindow.getJQElement()).find($('#ally_towns ul.members_list>li:nth-child(2) ul li')), function(ind,elem){
//							TmpTextTown += '[*]'+(ind+1)+'.[|][player]';
//							TmpTextTown += $(elem).find('a.gp_player_link').html();
//							TmpTextTown += '[/player][|]';
//							TmpTextTown += $(elem).find('div.small-descr').html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").replace(',','[|]');
//							TmpTextTown += '[/*]\n';
//						});
//						TmpTextTown += '[/table]';	
//						//TmpTextTown = '[quote]'+TmpTextTown+'[/quote]';
//							
//						$('<div/>', {
//								'id' : WndName+'RepConvTownArea', 
//								'style' : 'position: absolute; top: 19px; right: 16px; display: none; height: 150px;'
//						})
//						.append(
//								$('<div/>', {'class' : 'message_poster message_partner','style' : 'width: 100%'})
//						)
//						.append(
//								$('<textarea/>', {'class' 		: 'message_post_content',
//												  'style' 		: 'height: 100%; width: 100%; border: 1px solid #D1BF91',
//												  'readonly'	: 'readonly'
//								}).html(TmpTextTown)
//								.click(function(){
//									this.select();
//								})
//						)
//						.appendTo(WndId+' #ally_towns');
//							
//						$('<a/>', { 
//							'id' 	: WndName+'RepConvTownButton', 
//							'class' : 'farm_town_status_0',//add_entry', 
//							'style' : 'float: right; background-position: -401px -16px; background-repeat: no-repeat;',
//							'rel' 	: WndId+'RepConvTownArea',
//							'parent': WndId+' #ally_towns'
//						})
//						.mousePopup(new MousePopup(RepConv.Lang.MSGGENBBCODE))
//						.click(function(){
//							console.log($(this.getAttribute('parent')).height());
//							$(this.getAttribute('rel')).width($(this.getAttribute('parent')).width()-22);
//							$(this.getAttribute('rel')).height($(this.getAttribute('parent')).height()-47);
//							$(this.getAttribute('rel')+' textarea').height($(this.getAttribute('parent')).height()-47);
//							$(this.getAttribute('rel')).toggle(300);
//						})
//						.appendTo(WndId+' #ally_towns div.game_header');
					}
				}

				
				// info o graczu - dodanie rezerwacji
				if ( (RepConvGPWindow.getJQElement()).find($(WndId+'RepConvClaimButton')).length == 0 ) {
					var TmpTextClaim = 	RepConv.Lang.PLAYER+' [player]'+Game.player_name+'[/player] '+
										RepConv.Lang.MSGCLAIM+': [town]'+RepConvTool.TownObj.id+'[/town]';
						
					if ($(WndId+' #towninfo_towninfo a.gp_player_link').html() != null)
						TmpTextClaim += ' [player]'+$(WndId+' #towninfo_towninfo a.gp_player_link').html()+'[/player]';
						
					if ($(WndId+' #towninfo_towninfo li.clearfix a').html() != null)
						TmpTextClaim += ' ([ally]'+$(WndId+' #towninfo_towninfo li.clearfix a').html()+'[/ally])';
						
					$('<div/>', {
							'id' : WndName+'RepConvClaimArea', 
							'style' : 'position: absolute; top: 19px; right: 16px; display: none; height: 75px;'
					})
					.append(
							$('<div/>', {'class' : 'message_poster message_partner','style' : 'width: 100%'})
					)
					.append(
							$('<textarea/>', {'class' 		: 'message_post_content',
											  'style' 		: 'height: 100%; width: 100%; border: 1px solid #D1BF91',
											  'readonly'	: 'readonly'
							}).html(TmpTextClaim)
							.click(function(){
								this.select();
							})
					)
					.appendTo(WndId+' #info_tab_content');
						
					$('<a/>', { 
						'id' 	: WndName+'RepConvClaimButton', 
						'class' : 'farm_town_status_0',//add_entry', 
						'style' : 'float: right; background-position: -401px -16px; background-repeat: no-repeat;',
						'rel' 	: WndId+'RepConvClaimArea',
						'parent': WndId+' #towninfo_towninfo'
					})
					//.mousePopup(new MousePopup(RepConv.Lang.MSGCLAIMPPUP))
					.click(function(){
						$(this.getAttribute('rel')).width($(this.getAttribute('parent')).width()-22);
						$(this.getAttribute('rel')).height($(this.getAttribute('parent')).height()-47);
						$(this.getAttribute('rel')+' textarea').height($(this.getAttribute('parent')).height()-47);
						$(this.getAttribute('rel')).toggle(300);
					})
					.appendTo(WndId+' #towninfo_towninfo div.game_header');
				}
				
				
				// przycisk dla raportu
				$(WndId+' #report_report div.game_list_footer').ready(function(){
					if ($(WndId+' #report_arrow').length > 0){
						if (($(WndId+' #report_report #BTNCONV'+WndName).length) == 0) {
							(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
							    	RepConvTool.parentId = this.getAttribute('rel');
							    	RepConv.Log('GPW='+RepConvTool.parentId);
							    	RepConvData(RepConvGPWindow);
							    })
							    .appendTo(WndId+' #report_report div.game_list_footer');
						}
					}
				});
				// przyciski dla murku
				$(WndId+' #building_wall').ready(function() {
					if (($(WndId+' #building_wall div.game_border #BTNCONV'+WndName).length) == 0) {
						(RepConvGPWindow.getJQElement()).find('#building_wall ul.game_list').css('max-height', '455px');
//						if((RepConvGPWindow.getJQElement()).find('#building_wall ul.game_list').height() > 400){
//							(RepConvGPWindow.getJQElement()).find('#building_wall ul.game_list').height((RepConvGPWindow.getJQElement()).find('ul.game_list').height()-15);
//						}
						//konwersja
						(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
						    	RepConvTool.parentId = this.getAttribute('rel');
						    	RepConv.Log('GPW='+RepConvTool.parentId);
						    	RepConvData(RepConvGPWindow);
						}).appendTo(WndId+' #building_wall div.game_border');
					}
					if (($(WndId+' #building_wall div.game_border #BTNSAVE'+WndName).length) == 0) {
						//zapis
						(RepConvTool.AddBtn('BTNSAVE',WndName)).click(function(){
					    	RepConvTool.saveWall();
					    }).appendTo(WndId+' #building_wall div.game_border');
						RepConvTool.loadWall();
					}
				});
				// przyciski dla placu
				$(WndId+' #place_defense #defense_header').ready(function(){
					RepConv.Log('Sie placuje');
					if($(WndId+' #place_defense #defense_header').length > 0){
						if (($(WndId+' #place_defense #BTNCONV'+WndName).length) == 0) {
							(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
							    	RepConvTool.parentId = this.getAttribute('rel');
							    	RepConv.Log('GPW='+RepConvTool.parentId);
							    	RepConvData(RepConvGPWindow);
						    })
						    .appendTo(WndId+' #place_defense div.game_list_footer');
						}
					}
				});
		
		 		// przyciski listy rozkazów
				$(WndId+' #place_defense #command_filter').ready(function(){
					if ($(WndId+' #place_defense #command_filter').length > 0){
						if (($(WndId+' #place_defense #command_filter #BTNCONV'+WndName).length) == 0) {
							(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
							    	RepConvTool.parentId = this.getAttribute('rel');
							    	RepConv.Log('GPW='+RepConvTool.parentId);
							    	RepConvData(RepConvGPWindow);
						    })
						    .appendTo(WndId+' #place_defense #command_filter');
						}
					}
				});
		
				// pojedyncze rozkazy
				$(WndId+' div.command_info').ready(function(){
					if ($(WndId+' div.command_info').length > 0){ // rozkazy, a nie agora ;)
						if (($(WndId+' div.command_info #BTNCONV'+WndName).length) == 0) {
							(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
								RepConv.Log(w(this));
						    	RepConvTool.parentId = this.getAttribute('rel');
						    	RepConvData(RepConvGPWindow);
							})
							.appendTo(WndId+' div.command_info');
							if ( $(WndId+' div.command_info a.button').length > 1 ){
								$('#BTNCONV'+WndName).css('margin-right','125px');
							}
						}
					}
				});
		
				// zajmowanie miasta (stary system)
				$(WndId+' #conqueror_units_in_town').ready(function(){
					if (($(WndId+' #conqueror_units_in_town #BTNCONV'+WndName).length) == 0) {
						(RepConvTool.AddBtn('BTNCONV',WndName)).click(function(){
							    	RepConvTool.parentId = this.getAttribute('rel');
							    	RepConv.Log('GPW='+RepConvTool.parentId);
							    	RepConvData(RepConvGPWindow);
						})
						.attr('style', 'position: absolute; right: 5px; bottom: 5px;')
						.appendTo(WndId+' #conqueror_units_in_town');
					}
				});
			}
		}
	},
	TownObj : '',
	addStats : function (){
				if ($('div#context_menu div.context_icon').length == 7) {
					if ($('div#context_menu div#attack').css('left') != '60px'){
						setTimeout("RepConvTool.addStats()",100);
					} else {
						if ($('#context_menu #info').css('left') == "0px"){
							$('div#context_menu div#attack').animate({left :'60px', top :'0px'});
							$('div#context_menu div#support').animate({left :'37px', top :'47px'});
							$('div#context_menu div#trading').animate({left :'-13px', top :'58px'});
							$('div#context_menu div#espionage').animate({left :'-54px', top :'26px'});
							$('div#context_menu div#god').animate({left :'-54px', top :'-26px'});
							$('div#context_menu div#jump_to').animate({left :'-13px', top :'-58px'});
							$('<div/>', {'id' : 'stats', 'class' : 'context_icon', 'style' : 'width: 50px; height: 50px; left: 37px; top: -47px; background-image : url('+RepConv.Const.staticImg+'/stats2.png)'})
								.html('&nbsp;')
								.bind('mousedown', function() {
									RepConvAdds.Stats();
								})
								.fadeIn(1000)
								.append($('<span/>', {'class' : 'text'}).html(RepConv.Lang.STATS)
									.append($('<span/>', {'class' : 'bottom'})))
								
							 	.appendTo('div#context_menu');
						} else if ($('#context_menu #goToTown').css('left') == "0px"){
							$('div#context_menu div#attack').animate({left :'60px', top :'0px'});
							$('div#context_menu div#support').animate({left :'37px', top :'47px'});
							$('div#context_menu div#trading').animate({left :'-13px', top :'58px'});
							$('div#context_menu div#god').animate({left :'-54px', top :'26px'});
							$('div#context_menu div#info').animate({left :'-54px', top :'-26px'});
							$('div#context_menu div#jump_to').animate({left :'-13px', top :'-58px'});
							$('<div/>', {'id' : 'stats', 'class' : 'context_icon', 'style' : 'width: 50px; height: 50px; left: 37px; top: -47px; background-image : url('+RepConv.Const.staticImg+'/stats2.png)'})
								.html('&nbsp;')
								.bind('mousedown', function() {
									RepConvAdds.Stats();
								})
								.fadeIn(1000)
								.append($('<span/>', {'class' : 'text'}).html(RepConv.Lang.STATS)
									.append($('<span/>', {'class' : 'bottom'})))
								
							 	.appendTo('div#context_menu');
						}
					}
				}
			},
	Ramka 		: function(title, body, height){
					var tmpheight = height || 300;
					var ramka = $('<div/>', {'class' : 'game_border'});
					$(ramka).append($('<div/>',{'class' : 'game_border_top'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_bottom'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_left'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_right'}));
					
					$(ramka).append($('<div/>',{'class' : 'game_border_corner corner1'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_corner corner2'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_corner corner3'}));
					$(ramka).append($('<div/>',{'class' : 'game_border_corner corner4'}));
					
					$(ramka).append($('<div/>',{'class' : 'game_header bold', 'style' : 'height:18px;'})
								.append($('<div/>',{'style' : 'float:left; padding-right:10px;'}).html(title))
							);
					tmpheight -= 18; 	// nagłówek
					tmpheight -= (2*4); // marginesy
					tmpheight -= (2*4); // ramki górna i dolna
					$(ramka).append(
							$('<div/>',{'style' : 'overflow-x: hidden; padding-left: 5px; position: relative;'})
								.html(body)
								.height(tmpheight||300)
							);
					$(ramka).append(
							$('<div/>', {'class' : "game_list_footer", 'id' : 'RepConvBtns', 'style' : 'display: none;'})
							);
					return $('<div/>', {'class' : 'inner_box'}).append(ramka);
					//return ramka;
				},
	RamkaLight : function(title, body) {
					var ramka = $('<div/>');
					$(ramka).append($('<div/>', {'class' : 'box top left'})
									.append($('<div/>', {'class' : 'box top right'})
											.append($('<div/>', {'class' : 'box top center'}))
									)
							);
					$(ramka).append($('<div/>', {'class' : 'box middle left'})
									.append($('<div/>', {'class' : 'box middle right'})
											.append($('<div/>', {'class' : 'box middle center'})
													.append($('<span/>', {'class' : 'town_name'}).html(title))	//small
													.append($('<div/>', {'class' : 'box_content'}).html(body))
											)
									)
							);

					$(ramka).append($('<div/>', {'class' : 'box bottom left'})
									.append($('<div/>', {'class' : 'box bottom right'})
											.append($('<div/>', {'class' : 'box bottom center'}))
									)
							);
					return ramka;
				},
	insertBBcode : function (startTag, endTag, elementid) {
					  var input = elementid;
					  input.focus();
					  if (typeof document.selection != 'undefined') {
						  var range = document.selection.createRange();
						  var insText = range.text;
						  range.text = startTag + insText + endTag;

						  range = document.selection.createRange();
						  if (insText.length == 0) {
							  range.move('character', -endTag.length);
						  } else {
							  range.moveStart('character', startTag.length + insText.length + endTag.length);
						  }
						  range.select();
					  }
					  else if (typeof input.selectionStart != 'undefined') {
						  input.focus();
						  var start = input.selectionStart;
						  var end = input.selectionEnd;
						  var sts = input.scrollTop;
						  var ste = input.scrollHeight;
						  var insText = input.value.substring(start, end);
						  input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
						  var pos;
						  if(insText.length == 0){
							  pos = start + startTag.length;
						  }
						  else{
							  pos = start + startTag.length + insText.length + endTag.length;
						  }
						  input.selectionStart = pos;
						  input.selectionEnd = pos;
						  input.scrollTop = sts + input.scrollHeight - ste;
					  }
				},
		addsEmots : function(RepConvGPWindow, wraper, area){
					if ((RepConvGPWindow.getJQElement()).find('#emots_popup_'+RepConvGPWindow.type).length == 0){
						(RepConvGPWindow.getJQElement()).find($('.bb_button_wrapper')).append(
							$('<div/>',{'id':'emots_popup_'+RepConvGPWindow.type, 'class' : 'bb_sizes'})
								.append($('<div/>',{'class' : 'bbcode_box middle_center'})
									.append($('<div/>',{'class' : 'bbcode_box top_left'}))
									.append($('<div/>',{'class' : 'bbcode_box top_right'}))
									.append($('<div/>',{'class' : 'bbcode_box top_center'}))
									.append($('<div/>',{'class' : 'bbcode_box bottom_center'}))
									.append($('<div/>',{'class' : 'bbcode_box bottom_right'}))
									.append($('<div/>',{'class' : 'bbcode_box bottom_left'}))
									.append($('<div/>',{'class' : 'bbcode_box middle_left'}))
									.append($('<div/>',{'class' : 'bbcode_box middle_right'}))
									.append($('<div/>',{'class' : 'bbcode_box content clearfix', 'style' : 'max-height:80px; overflow-y:scroll'})
								)
							).css({'position':'absolute','top':'27px','left':'455px','width':'300px'})
						);
						
						var emots = [
						             {'img':'http://westtax.info/grepolis/emots/usmiech.gif', 'title':':)'},
						             {'img':'http://westtax.info/grepolis/emots/ostr.gif', 'title':':>'},
						             {'img':'http://westtax.info/grepolis/emots/kwadr.gif', 'title':':]'},
						             {'img':'http://westtax.info/grepolis/emots/smutny2.gif', 'title':':('},
						             {'img':'http://westtax.info/grepolis/emots/yyyy.gif', 'title':':|'},
						             {'img':'http://westtax.info/grepolis/emots/uoeee.gif', 'title':'<uoee>'},
						             {'img':'http://westtax.info/grepolis/emots/lol.gif', 'title':'<lol>'},
						             {'img':'http://westtax.info/grepolis/emots/rotfl.gif', 'title':'<rotfl>'},
						             {'img':'http://westtax.info/grepolis/emots/oczko.gif', 'title':';)'},
						             {'img':'http://westtax.info/grepolis/emots/jezyk.gif', 'title':':P'},
						             {'img':'http://westtax.info/grepolis/emots/jezyk_oko.gif', 'title':';P'},
						             {'img':'http://westtax.info/grepolis/emots/stres.gif', 'title':'<stres>'},
						             {'img':'http://westtax.info/grepolis/emots/nerwus.gif', 'title':'<nerwus>'},
						             {'img':'http://westtax.info/grepolis/emots/zly.gif', 'title':':['},
						             {'img':'http://westtax.info/grepolis/emots/w8.gif', 'title':'<w8>'},
						             {'img':'http://westtax.info/grepolis/emots/wesoly.gif', 'title':':))'},
						             {'img':'http://westtax.info/grepolis/emots/bezradny.gif', 'title':'<bezradny>'},
						             {'img':'http://westtax.info/grepolis/emots/krzyk.gif', 'title':'<krzyk>'},
//						             {'img':'http://westtax.info/grepolis/emots/', 'title':''},
//						             {'img':'http://westtax.info/grepolis/emots/', 'title':''},
//						             {'img':'http://westtax.info/grepolis/emots/', 'title':''},
//						             {'img':'http://westtax.info/grepolis/emots/', 'title':''},
						            ];
//						var emots = ['http://emoty.blox.pl/resource/dobani.gif',
//						             'http://emoty.blox.pl/resource/foch.gif',
//						             'http://emoty.blox.pl/resource/nerwus.gif',
//						             'http://emoty.blox.pl/resource/paluszkiem.gif',
//						             'http://emoty.blox.pl/resource/cwaniak.gif',
//						             'http://emoty.blox.pl/resource/dokuczacz.gif',
//						             'http://emoty.blox.pl/resource/figielek.gif',
//						             'http://emoty.blox.pl/resource/jezyk_oko.gif',
//						             'http://emoty.blox.pl/resource/mniam.gif',
//						             'http://emoty.blox.pl/resource/oczko.gif',
//						             'http://emoty.blox.pl/resource/zmeczony.gif',
//						             'http://emoty.blox.pl/resource/cry.gif',
//						             'http://emoty.blox.pl/resource/glupek.gif',
//						             'http://emoty.blox.pl/resource/beczy.gif',
//						             'http://emoty.blox.pl/resource/wink.gif',
//						             'http://emoty.blox.pl/resource/buziak.gif', 
//						             'http://emoty.blox.pl/resource/buzki.gif', 
//						             'http://emoty.blox.pl/resource/zawstydzony1.gif',
//						             'http://emoty.blox.pl/resource/loveit.gif',
//						             'http://emoty.blox.pl/resource/oups.gif',
//						             'http://emoty.blox.pl/resource/dance.gif',
//						             'http://emoty.blox.pl/resource/friends.gif',
//						             'http://emoty.blox.pl/resource/th_0girlchant.gif',
//						             'http://emoty.blox.pl/resource/th_0girl_curtsey.gif',
//						             'http://emoty.blox.pl/resource/th_0girl_dance.gif',
//						             'http://emoty.blox.pl/resource/th_0girl_spruce_up.gif',
//						             'http://emoty.blox.pl/resource/th_0girl_witch.gif',
//						             'http://emoty.blox.pl/resource/th_connieswatfly.gif',
//						             'http://emoty.blox.pl/resource/biggrin.gif',
//						             'http://emoty.blox.pl/resource/cii.gif',
//						             'http://emoty.blox.pl/resource/Great.gif',
//						             'http://emoty.blox.pl/resource/Happy2.gif',
//						             'http://emoty.blox.pl/resource/lol.gif',
//						             'http://emoty.blox.pl/resource/mdr.gif',
//						             'http://emoty.blox.pl/resource/oui.gif',
//						             'http://emoty.blox.pl/resource/nosze.gif',
//						             'http://emoty.blox.pl/resource/23_134_3.gif',
//						             ];
						$.each(emots, function(ind, emot){
							((RepConvGPWindow.getJQElement()).find('#emots_popup_'+RepConvGPWindow.type+' .content'))
								.append(
									$('<img/>',{'src':emot.img, 'title': emot.title})
										.click(function(){
											RepConvTool.insertBBcode('[img]'+$(this).attr('src')+'[/img]', 
												'', 
												(RepConvGPWindow.getJQElement()).find(area)[0]);
											$('#emots_popup_'+RepConvGPWindow.type).toggle();
											})

								);
						});
//							.append($('<br/>',{'style':'clear:both'}));
						
						(RepConvGPWindow.getJQElement()).find(wraper).append(
								$('<a/>',
										{'style':'width:20px; height:20px; background:url(http://westtax.info/grepolis/emots/usmiech.gif) no-repeat;'}
								).click(function(){
									if (((RepConvGPWindow.getJQElement()).find('#emots_popup_'+RepConvGPWindow.type+' .content')).height() < 80){
										((RepConvGPWindow.getJQElement()).find('#emots_popup_'+RepConvGPWindow.type+' .content')).css('overflow-y','hidden');
									} else {
										((RepConvGPWindow.getJQElement()).find('#emots_popup_'+RepConvGPWindow.type+' .content')).css('overflow-y','scroll');
									}
									$('#emots_popup_'+RepConvGPWindow.type).toggle();
								})
						);
					}
				},
		loadPower: function(){
					// gods power load...
					if ($('#powers_wrapper').css('display') == 'block'){
						 powers = {
								 	'divine_sign'   		: {'god' : 'zeus', 'cost' : 50},
								 	'bolt'     				: {'god' : 'zeus', 'cost' : 200},
								 	'fair_wind'   			: {'god' : 'zeus', 'cost' : 250},
								 	'transformation' 		: {'god' : 'zeus', 'cost' : 300},
						    
								 	'kingly_gift'   		: {'god' : 'poseidon', 'cost' : 25},
								 	'call_of_the_ocean' 	: {'god' : 'poseidon', 'cost' : 60},
								 	'earthquake'   			: {'god' : 'poseidon', 'cost' : 350},
								 	'sea_storm'   			: {'god' : 'poseidon', 'cost' : 280},
								 	
								 	'wedding'   			: {'god' : 'hera', 'cost' : 30},
								 	'happiness'   			: {'god' : 'hera', 'cost' : 120},
								 	'fertility_improvement' : {'god' : 'hera', 'cost' : 80},
								 	'desire'   				: {'god' : 'hera', 'cost' : 140},
								 	
								 	'patroness'   			: {'god' : 'athena', 'cost' : 60},
								 	'wisdom'   				: {'god' : 'athena', 'cost' : 140},
								 	'town_protection'   	: {'god' : 'athena', 'cost' : 130},
								 	'strength_of_heroes' 	: {'god' : 'athena', 'cost' : 200},
								 	
								 	'pest'   				: {'god' : 'hades', 'cost' : 250},
								 	'resurrection'   		: {'god' : 'hades', 'cost' : 400},
								 	'underworld_treasures' 	: {'god' : 'hades', 'cost' : 30},
								 	'cap_of_invisibility'  	: {'god' : 'hades', 'cost' : 120}
						    	  };
						  $.each($('#powers_wrapper a.power_icon.disabled div[name=counter]'), function(ind,elem){
							  $(elem).remove();  
						  });
						  $.each($('#powers_wrapper a.power_icon.disabled'), function(ind,elem){
							  var power = powers[$(elem).attr('name')];
							  var god = Layout.favor[power.god];
							  $(elem).append(
									  $('<div/>',
											  { 'style':'margin-top:40px;color:white;font-size:70%', 
										  		'name':'counter'
										  	  })
										 .countdown(
												 (Timestamp.server()+(((power.cost-god.current)/god.production)*60*60))
										 )
							  );
						  });
					}
				}
};


var RepConvAdds = {
		init : function(){
					if (RepConv.LangLoaded == false){
						setTimeout("RepConvAdds.init()",100);
					} else if (typeof Layout == 'undefined'){
						setTimeout("RepConvAdds.init()",100);
					} else {
						RepConv.Log(RepConv.Grepolis2);
						if (location.pathname.indexOf("game") != -1) {
							$('<div/>', { 'id' : 'RepConvMetka', 'style' : "background: url(http://static.grepolis.com/images/game/layout/top_bar.jpg) -326px -163px no-repeat; position: absolute; width:138px; height: 13px; top: 276px; padding: 0; text-align: center; left: 12px; color: #FC6; font-size: 9px;"}).appendTo('div#links');
					
							$('<a/>', { 'href' : '#', 'style' : 'color: #FC6;font-size: 9px;line-height:12px;'})
								.html(RepConv.Scripts_nameS+" "+RepConv.Scripts_version+" ["+RepConv.LangEnv+"]")
								.click(function(){RepConvAdds.Help('HELPTAB1');})
								.appendTo('div#RepConvMetka');
						}
						var RepConvOK = false;
						// nowa wersja słuchacza
						$('body').ajaxComplete(function() {
							RepConvTool.loadPower();
						});
						$('body').ajaxSuccess(function() {
							$.each(Layout.wnd.getAllOpen(), function(ind, elem){
								RepConvTool.AddsBtns(Layout.wnd.GetByID((elem).getID()));
								RepConv.Log('łokienko='+(elem).getID());
							});
						});
						// statystyki dla Greopolis 2
						if ((typeof orgContextMenu == 'undefined') && (typeof Layout.contextMenu != 'undefined')){
							RepConv.Log('Podmianka');
							var orgContextMenu = Layout.contextMenu;
							Layout.contextMenu = function(ev,type,town){
								RepConvTool.TownObj = town;
								orgContextMenu(ev,type,town);
								RepConv.Log(ev);
								RepConv.Log(type);
								RepConv.Log(town);
								setTimeout("RepConvTool.addStats()",100);
							};
						}
						RepConvTool.newVersion();
						$('#toggle_powers').click(function(){
							RepConvTool.loadPower();
						});
					}
				},
	 verLang : function(){
					if (RepConv.err404 < 10 && jqxhr.status == undefined){
						RepConv.err404++;
						setTimeout("RepConvAdds.verLang()",200);
					} else {
						if (jqxhr.status == undefined){
							RepConv.Log('Not Load!!');
							RepConv.LangEnv = "en";
							RepConv.LangLoaded = true;
						}
					}
				},
	Help	: function(current){
				if (typeof RepConvAboutWnd != 'undefined')
					RepConvAboutWnd.close(); 
				RepConvAboutWnd = Layout.dialogWindow.open('',RepConv.Scripts_name+'  ver.'+RepConv.Scripts_version,750,490,RepConvAdds.HelpClose,false);
				RepConvAboutWnd.setHeight([490]);
				RepConvAboutWnd.setPosition(['center','center']);
				//RepConvAboutWnd.getJQElement().find('div.gpwindow_content').css('overflow', 'visible');
				//RepConvAboutWnd.getJQElement().find('div.gpwindow_content').css('overflow', 'none');
				function RepConvAboutLi(name, title){
					
					return $('<li/>')
						     .append($('<a/>', {'class' : "submenu_link", 'href' : "#", 'id' : 'help-'+name, 'rel' : name})
						       .click(function(){
						    	   RepConv.CQQ = RepConvAboutWnd;
						    	   RepConvAboutWnd.getJQElement().find('li a.submenu_link').removeClass('active');
						    	   var height = RepConvAboutWnd.getJQElement().find('div.gpwindow_content').height();
						    	   RepConv.Log(this);
						    	   $(this).addClass('active');
						    	   RepConvAboutWnd.setContent(RepConvTool.Ramka(RepConv.Lang[$(this).attr('rel')], RepConvHelpTabs[RepConv.LangEnv][$(this).attr('rel')], 428).html());
						    	   ((RepConvAboutWnd).getJQElement().find($('#RepConvBtns'))).remove();
							   })
							   .append($('<span/>', {'class' : "left"})
							     .append($('<span/>', {'class' : "right"})
								   .append($('<span/>', {'class' : "middle", 'title' : title}).html(title)
								   )
								 )
							   )
						     );
				}
			    RepConvAboutWnd.getJQElement()
			    	.append(
			    			$('<div/>', {
			    				'class':'menu_wrapper', 'style': 'left: 78px; right: 14px'
			    			}).append(
			    					$('<ul/>', {
			        					'class' : 'menu_inner', 'style' : 'width: 450px;'
			    					})
			    						.prepend(RepConvAboutLi("HELPTAB1", RepConv.Lang.HELPTAB1))
			    						.prepend(RepConvAboutLi("HELPTAB2", RepConv.Lang.HELPTAB2))
			    						.prepend(RepConvAboutLi("HELPTAB3", RepConv.Lang.HELPTAB3))
			    						
			    					
			    			)
			    );
			    var tmpWidth = 0;
			    $.each(RepConvAboutWnd.getJQElement().find($('ul.menu_inner li')), function(ind, elem){
			    	tmpWidth+=$(elem).width();
			    });
			    RepConvAboutWnd.getJQElement().find($('ul.menu_inner')).width(tmpWidth);
			    if(current == null){
			    	current = 'HELPTAB1';
			    }
			    $('#help-'+current).click();
				},
	HelpClose : function(){
					$.cookie(RepConv.CookieNew, JSON.stringify(RepConv.Scripts_version), { expires : 999, path : '/'});
				},
	Stats	: function(){
					RepConvNode = $('<div/>', {'id' : 'RepConvNode'});
					RepConvNode.append($('<h4/>')
						.html(RepConv.Lang.STATSPOINT)
					);
					RepConvNode.append($('<img/>', { 'src' : RepConv.Const.dataUrl + 
											'?type=points&world=' + 
											(location.host.match(/([a-z]+[0-9]+.*).*\.grepolis.*/i)[1]) + //Game.world_id 
											'&town_id=' + RepConvTool.TownObj.id,
											'style' : 'width: 340px; height: 130px; background: url(http://static.grepolis.com/images/game/ajax-loader.gif) no-repeat center center;'
						})
					);
					RepConvNode.append($('<h4/>', {'style' : 'margin-top: 15px;'})
						.html(RepConv.Lang.STATSRANK)
					);
					RepConvNode.append($('<img/>', { 'src' : RepConv.Const.dataUrl + 
											'?type=rank&world=' + 
											(location.host.match(/([a-z]+[0-9]+.*).*\.grepolis.*/i)[1]) + //Game.world_id
											'&town_id=' + RepConvTool.TownObj.id,
											'style' : 'width: 340px; height: 130px; background: url(http://static.grepolis.com/images/game/ajax-loader.gif) no-repeat center center;'
						})
					);

					Layout.dialogWindow.open(RepConvNode.html().toString(),RepConv.Lang.STATS,340,380,null,false);
				}				
};


var RepConvType = {};

var RepConvTypes = {
	A : {
			outside		: false,
			town		: "town",
			player		: "player",
			ally		: "ally",
			tag			: "quote",
			fonttag		: "monospace",
			blank		: "˙˙˙˙˙˙˙˙˙˙", //				"          ",
			separator	: "˙",
			separator3	: "˙˙˙",
			unitDigits	: 7,
			sign		: "u",
			textTown	: "",
			textPlayer	: "",
			textAlly	: "",
			unitSize	: "8",
			getTown		: 'id',
			morale		: RepConvTool.Adds(RepConv.Const.staticImg+RepConv.Const.morale,"img")+' ',
			luck		: RepConvTool.Adds(RepConv.Const.staticImg+RepConv.Const.luck,"img")+' ',
			nightbonus	: RepConvTool.Adds(RepConv.Const.staticImg+RepConv.Const.nightbonus,"img")+' ',
			oldwall		: RepConvTool.Adds(RepConv.Const.staticImg+RepConv.Const.oldwall,"img")+' ',
			genImg		: "http://www.westtax.info/grepolis/imgdyn.php?size=37&margin=5&type={0}&list={1}",
			doubleline	: '[color=#0000ff]══════════════════════════════════════════════════════════════════════════════════════════════════════[/color]',
			singleline	: '[color=#0000ff]──────────────────────────────────────────────────────────────────────────────────────────────────────[/color]'

	},
	E : {
			outside		: true,
			town		: "b",
			player		: "b",
			ally		: "b",
			tag			: "code",
			fonttag		: "Courier New",
			blank		: "          ",
			separator	: " ",
			separator3	: "   ",
			unitDigits	: 6,
			sign		: "f",
			textTown	: RepConv.Lang.TOWN,
			textPlayer	: RepConv.Lang.PLAYER,
			textAlly	: RepConv.Lang.ALLY,
			unitSize	: "8",
			getTown		: 'name',
			morale		: "",
			luck		: "",
			nightbonus	: "",
			oldwall		: "",
			genImg		: "http://www.westtax.info/grepolis/img.php?type={0}&list={1}",
			doubleline	: '[color=#0000ff]═════════════════════════════════════════════════════════[/color]',
			singleline	: '[color=#0000ff]─────────────────────────────────────────────────────────[/color]'
	}
};

function RepConvData(that) {
	var RepConvGPWindow = that;
	var ReportType 		= '';
	RepConv.Log('RepConvGPWindow.type='+RepConvGPWindow.type);
	switch (RepConvGPWindow.type){
		case Layout.wnd.TYPE_CUSTOM:/*0*/				
			break;
		case Layout.wnd.TYPE_TOWNINDEX:/*1*/			
			break;
		case Layout.wnd.TYPE_FARM_TOWN:/*2*/			
			break;
		case Layout.wnd.TYPE_WONDERS:/*3*/				
			break;
		case Layout.wnd.TYPE_TOWN:/*4*/					
			break;
		case Layout.wnd.TYPE_ISLAND:/*5*/				
			break;
		case Layout.wnd.TYPE_ALLIANCE:/*6*/				
			break;
		case Layout.wnd.TYPE_ALLIANCE_FORUM:/*7*/		
			break;
		case Layout.wnd.TYPE_ALLIANCE_PROFILE:/*8*/		
			break;
		case Layout.wnd.TYPE_QUEST:/*9*/				
			break;
		case Layout.wnd.TYPE_BUILDING:/*10*/
			if ((RepConvGPWindow.getJQElement()).find($('div#building_wall')).length>0 ){
				ReportType		= "wall";
			} else if ((RepConvGPWindow.getJQElement()).find($('div#defense_header')).length>0 ){
				ReportType		= "agora";
			}
			break;
		case Layout.wnd.TYPE_MARKET:/*11*/				
			break;
		case Layout.wnd.TYPE_PHOENICIANSALESMAN:/*12*/	
			break;
		case Layout.wnd.TYPE_RANKING:/*13*/				
			break;
		case Layout.wnd.TYPE_TOWN_OVERVIEWS:/*14*/	// lista rozkazów	
			ReportType 		= "commandList";
			break;
		case Layout.wnd.TYPE_ATTACK_PLANER:/*15*/		
			break;
		case Layout.wnd.TYPE_MESSAGE:/*16*/				
			break;
		case Layout.wnd.TYPE_REPORT:/*17*/	// raporty
			ReportType 		= (RepConvGPWindow.getJQElement()).find($('div#report_arrow img')).attr('src').replace(/.*\/([a-z_]*)\.png.*/, '$1');
			break;
		case Layout.wnd.TYPE_DIALOG:/*18*/				
			break;
		case Layout.wnd.TYPE_UNINHABITED_PLACE:/*19*/	
			break;
		case Layout.wnd.TYPE_MEMO:/*20*/				
			break;
		case Layout.wnd.TYPE_PREMIUM:/*21*/				
			break;
		case Layout.wnd.TYPE_PLAYER_PROFILE_EDIT:/*22*/	
			break;
		case Layout.wnd.TYPE_PLAYER_PROFILE:/*23*/		
			break;
		case Layout.wnd.TYPE_PLAYER_SETTINGS:/*24*/		
			break;
		case Layout.wnd.TYPE_PUBLISH_REPORT:/*25*/		
			break;
		case Layout.wnd.TYPE_COLOR_TABLE:/*26*/			
			break;
		case Layout.wnd.TYPE_CONQUEST:/*27*/			
			break;
		case Layout.wnd.TYPE_ATK_COMMAND:/*28*/ // pojedynczy rozkaz
			ReportType 		= "command";
			break;
		case Layout.wnd.TYPE_CONQUEROR:/*29*/ // stary system podboju
			ReportType 		= "conquerold";
			break;
		case Layout.wnd.TYPE_CHAT:/*30*/				
			break;
		case Layout.wnd.TYPE_DAILY_REWARD:/*31*/		
			break;
		case Layout.wnd.TYPE_DIRECTION_XSELLING:/*32*/	
			break;
		case Layout.wnd.TYPE_FARM_TOWN_OVERVIEWS:/*33*/	
			break;
		case Layout.wnd.TYPE_ACK_CHOOSE_TOWN: /*34*/ 	
			break;
	}
	RepConv.Log('ReportType='+ReportType);
	var report 			= {};
	var breakline 		= $('<br/>', {'style':'clear:both;'});
	var formbody		= $('<div/>',{'style':'margin-top: 3px'});
	var labelArray 		= "attack";
	if((ReportType == "attack") && ((RepConvGPWindow.getJQElement()).find($('#report_report #report_booty_bonus_fight')).length == 0)){
		ReportType 	= "attackSupport";
	}
	var ramkaHeight = 225;

	function _template(){
		var result;
		var head 		= '[b]<%=RepConvTool.AddSize(time+title,9)%>[/b]\\n';
		var foot 		= '<%=RepConv.Const.footer%>';
		var double		= '<%=RepConvType.doubleline%>\\n';
		var single		= '<%=RepConvType.singleline%>\\n';
		var attacker 	= '\
[b]<%=RepConvTool.AddSize(RepConv.Lang.ATTACKER,10)%>[/b]: \
<%=attacker.town%> \
<%=attacker.player%> \
<%=attacker.ally%> \
<%=RepConvTool.AddSize(morale+\' \'+luck,8)%>\\n\
';
		var attUnit		= '\
<%if($(\'#MSGATTUNIT\').attr(\'checked\')){%>\
<%=attacker.unit_img%><%=power%>\\n\
<%=RepConvTool.AddSize(attacker.unit_send + \'\\n\' + RepConvTool.Color(attacker.unit_lost,"b50307"),RepConvType.unitSize)%>\\n\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
';
		var defender 	= '\
[b]<%=RepConvTool.AddSize(RepConv.Lang.DEFENDER,10)%>[/b]: \
<%=defender.town%> \
<%=defender.player%> \
<%=defender.ally%> \
<%=RepConvTool.AddSize(oldwall+\' \'+nightbonus,8)%>\\n\
';
		var defUnit		= '\
<%if($(\'#MSGDEFUNIT\').attr(\'checked\')){%>\
<%  if (defender.unit_send != ""){%>\
<%=defender.unit_img%>\\n\
<%=RepConvTool.AddSize(defender.unit_send + \'\\n\' + RepConvTool.Color(defender.unit_lost,"b50307"),RepConvType.unitSize)%>\\n\
<%  }else{%>\
<%=RepConv.Lang.NOTUNIT%>\\n\
<%  }%>\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
';
		var spyUnit		= '\
<%if (defender.title != null){%>\
<%=defender.title%>\\n\
<%  if($(\'#MSGUNITS\').attr(\'checked\')){%>\
<%    if (defender.unit_send != ""){%>\
<%=defender.unit_img%>\\n\
<%=RepConvTool.AddSize(defender.unit_send,RepConvType.unitSize)%>\\n\
<%    }else{%>\
<%=RepConv.Lang.NOTUNIT%>\\n\
<%    }%>\
<%  }else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%  }%>\
<%}%>\
';
		var spyBuild		= '\
<%if (build.title != null){%>\
<%=build.title%>\\n\
<%  if($(\'#MSGBUILD\').attr(\'checked\')){%>\
<%    if (build.unit_send != ""){%>\
<%=build.unit_img%>\\n\
<%=RepConvTool.AddSize(build.unit_send,RepConvType.unitSize)%>\\n\
<%    }else{%>\
<%=RepConv.Lang.NOTUNIT%>\\n\
<%    }%>\
<%  }else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%  }%>\
<%}%>\
';
		var spyIron		= '\
<%=iron.title%>\\n\
<%if(iron.count!=""){%>\
<%  if($(\'#MSGUSC\').attr(\'checked\')){%>\
<%=RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")%> <%=RepConvTool.AddSize(iron.count,8)%>\\n\
<%  }else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%  }%>\
<%}%>\
';
		var spyResource	= '\
<%if (resources.title != ""){%>\
<%  if($(\'#MSGRAW\').attr(\'checked\')){%>\
<%=RepConvTool.AddSize(resources.title,8)%>\\n\
<%    if (resources.count.length > 0){%>\
<%=resources.detail%>\\n\
<%    }%>\
<%  }%>\
<%}%>\
';
		var resource	= '\
<%if($(\'#MSGRESOURCE\').attr(\'checked\')){%>\
<%=RepConvType.singleline%>\\n\
<%=RepConvTool.AddSize(resources.title,9)%>\\n\
<%  if (resources.count.length > 0){%>\
<%=resources.detail%>\\n\
<%  }%>\
<%}%>\
';
		var resource2	= '\
<%=RepConvTool.AddSize(resources.title,9)%>\\n\
<%=resources.count.length%>\
';
		var bunt		= '\
<%if ( bunt.length > 0){%>\
<%=RepConvType.singleline%>\\n\
<%=RepConvTool.Adds(RepConv.Const.bunt,"img")%> <%=bunt%>\\n\
<%}%>\
';
		var cost		= '\
<%=RepConvType.separator3%><%=RepConvTool.Adds(RepConv.Const.unitImg+RepConvType.sign+"Z1Z2Z3Z4Z5.png","img")%><%=RepConvType.separator3%>[b]<%=RepConvTool.AddSize(RepConv.Lang.LOSSES,9)%>[/b]\\n\
<%=RepConvTool.AddSize(RepConvTool.Value(attacker.w,10)+RepConvTool.Value(attacker.s,10)+RepConvTool.Value(attacker.i,10)+RepConvTool.Value(attacker.p,10)+RepConvTool.Value(attacker.f,10)+" [b]"+RepConv.Lang.ATTACKER+"[/b]",8)%>\\n\
<%=RepConvTool.AddSize(RepConvTool.Value(defender.w,10)+RepConvTool.Value(defender.s,10)+RepConvTool.Value(defender.i,10)+RepConvTool.Value(defender.p,10)+RepConvTool.Value(defender.f,10)+" [b]"+RepConv.Lang.DEFENDER+"[/b]",8)%>\\n\
';
        var commandLine = '\
<%for(ind in linia){%>\
<%  if (ind > 0){%>\
<%=RepConvType.singleline%>\\n\
<%  }%>\
<%=linia[ind].img%> <%=linia[ind].time%> <%=linia[ind].townIdA%> <%=linia[ind].inout%> <%=linia[ind].townIdB%>\\n\
<%  if($(\'#MSGDETAIL\').attr(\'checked\')){%>\
<%    if (linia[ind].unit_img != \'\') {%>\
<%=linia[ind].unit_img%>   <%=linia[ind].power%>\\n\
<%=RepConvTool.AddSize(linia[ind].unit_send,RepConvType.unitSize)%>\\n\
<%    }%>\
<%    if (linia[ind].spy != \'\') {%>\
<%=linia[ind].spy%>\\n\
<%    }%>\
<%  }%>\
<%}%>\
';
		var conquerold = '\
<%=defender.town%> <%=defender.player%>\\n\
<%=RepConvType.singleline%>\\n\
<%=attacker.units_title%>\\n\
<%if($(\'#MSGATTUNIT\').attr(\'checked\')){%>\
<%  if (attacker.unit_img != \'\') {%>\
<%=attacker.unit_img%>\\n\
<%=RepConvTool.AddSize(attacker.unit_send,RepConvType.unitSize)%>\\n\
<%  }else{%>\
<%=RepConv.Lang.NOTUNIT%>\\n\
<%  }%>\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
';
		var supUnit		= '\
<%if($(\'#MSGATTUNIT\').attr(\'checked\')){%>\
<%=attacker.unit_img%>\\n\
<%=RepConvTool.AddSize(attacker.unit_send,RepConvType.unitSize)%>\\n\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
';
		var command = '\
<%=attacker.town%> <%=attacker.player%>\\n\
<%=detail.time_title%> <%=detail.time_time%>\\n\
<%=attacker.units_title%>\\n\
<%if($(\'#MSGATTUNIT\').attr(\'checked\')){%>\
<%  if (attacker.unit_img != \'\') {%>\
<%=attacker.unit_img%> <%=detail.power_img%>\\n\
<%=RepConvTool.AddSize(attacker.unit_send,RepConvType.unitSize)%>\\n\
<%  }else{%>\
<%=RepConv.Lang.NOTUNIT%>\\n\
<%  }%>\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
<%=RepConvType.singleline%>\\n\
<%=defender.town%> <%=defender.player%>\\n\
<%if($(\'#MSGRESOURCE\').attr(\'checked\')){%>\
<%  if(resources.title!=null){%>\
<%=RepConvType.singleline%>\\n\
<%=RepConvTool.AddSize(resources.title,9)%>\\n\
<%=resources.detail%>\\n\
<%  }%>\
<%}%>\
';
		var agoraLine = '\
<%for(ind in linia){%>\
<%  if (ind > 0){%>\
<%=RepConvType.singleline%>\\n\
<%  }%>\
<%=linia[ind].title%>\\n\
<%if($(\'#MSGDEFUNIT\').attr(\'checked\')){%>\
<%=linia[ind].unit_img%>\\n\
<%=RepConvTool.AddSize(linia[ind].unit_send,RepConvType.unitSize)%>\\n\
<%}else{%>\
[i]<%=RepConv.Lang.HIDDEN%>[/i]\\n\
<%}%>\
<%}%>\
';
		var powerDet = '\
<%=power%>\\n\
<%=efekt.title%>\\n\
<%if (efekt.detail != null){%>\
<%=efekt.detail%>\\n\
<%}%>\
<%if (type == 1){%>\
<%}else if (type == 2){%>\
<%=resources.image%>\\n\
<%=RepConvTool.AddSize(resources.count,RepConvType.unitSize)%>\\n\
<%}else if (type == 3){%>\
<%=resources.image%>\\n\
<%=resources.count%>\\n\
<%}else if (type == 4){%>\
<%}%>\
';
		var wallHead = '\
<%=title%>\\n\
';
		var wallDet = '\
<%if (defeated.title != ""){%>\
<%=RepConvTool.AddSize(defeated.title,10)%>\\n\
<%  if(defeated.titleAttacker != ""){%>\
<%=RepConvTool.AddSize(defeated.titleAttacker,8)%>\\n\
<%    for(ind in defeated.attacker){%>\
<%=defeated.attacker[ind].unit_img%>\\n\
<%      if(!$(\'#MSGDIFF3\').attr(\'checked\')){%>\
<%=RepConvTool.AddSize(defeated.attacker[ind].unit_count,RepConvType.unitSize)%>\\n\
<%      }%>\
<%      if(!$(\'#MSGDIFF1\').attr(\'checked\')){%>\
<%=RepConvTool.Color(RepConvTool.AddSize(defeated.attacker[ind].unit_diff,RepConvType.unitSize),"060")%>\\n\
<%      }%>\
<%    }%>\
<%  }%>\
<%  if(defeated.titleDefender != ""){%>\
<%=RepConvTool.AddSize(defeated.titleDefender,8)%>\\n\
<%    for(ind in defeated.defender){%>\
<%=defeated.defender[ind].unit_img%>\\n\
<%      if(!$(\'#MSGDIFF3\').attr(\'checked\')){%>\
<%=RepConvTool.AddSize(defeated.defender[ind].unit_count,RepConvType.unitSize)%>\\n\
<%      }%>\
<%      if(!$(\'#MSGDIFF1\').attr(\'checked\')){%>\
<%=RepConvTool.Color(RepConvTool.AddSize(defeated.defender[ind].unit_diff,RepConvType.unitSize),"060")%>\\n\
<%      }%>\
<%    }%>\
<%  }%>\
<%}%>\
<%if (losses.title != ""){%>\
<%  if (defeated.title != ""){%>\
<%=RepConvType.doubleline%>\\n\
<%  }%>\
<%=RepConvTool.AddSize(losses.title,10)%>\\n\
<%  if(losses.titleAttacker != ""){%>\
<%=RepConvTool.AddSize(losses.titleAttacker,8)%>\\n\
<%    for(ind in losses.attacker){%>\
<%=losses.attacker[ind].unit_img%>\\n\
<%      if(!$(\'#MSGDIFF3\').attr(\'checked\')){%>\
<%=RepConvTool.AddSize(losses.attacker[ind].unit_count,RepConvType.unitSize)%>\\n\
<%      }%>\
<%      if(!$(\'#MSGDIFF1\').attr(\'checked\')){%>\
<%=RepConvTool.Color(RepConvTool.AddSize(losses.attacker[ind].unit_diff,RepConvType.unitSize),"060")%>\\n\
<%      }%>\
<%    }%>\
<%  }%>\
<%  if(losses.titleDefender != ""){%>\
<%=RepConvTool.AddSize(losses.titleDefender,8)%>\\n\
<%    for(ind in losses.defender){%>\
<%=losses.defender[ind].unit_img%>\\n\
<%      if(!$(\'#MSGDIFF3\').attr(\'checked\')){%>\
<%=RepConvTool.AddSize(losses.defender[ind].unit_count,RepConvType.unitSize)%>\\n\
<%      }%>\
<%      if(!$(\'#MSGDIFF1\').attr(\'checked\')){%>\
<%=RepConvTool.Color(RepConvTool.AddSize(losses.defender[ind].unit_diff,RepConvType.unitSize),"060")%>\\n\
<%      }%>\
<%    }%>\
<%  }%>\
<%}%>\
';
		var conquer = '\
<%=detail%>\\n\
';

		result = 	head +
					double;

		switch (ReportType){
			case "command" 		:
				result +=	command;
				break;
            case "raise" 		:
            	result += 	attacker +
							attUnit +
							single +
							defender +
							defUnit +
							single +
							cost;
				break;
            case "breach" 		:
            case "attack" 		:
            case "take_over" 	:
            	result += 	attacker +
            				attUnit +
            				single +
            				defender +
            				defUnit +
            				resource +
            				bunt +
            				single +
            				cost;
            	break;
            case "commandList" 	:
            	result += 	commandLine;
            	break;
            case "conquerold"	:
            	result += 	conquerold;
            	break;
            case "support" 	:
            	result += 	attacker +
            				defender +
            				single +
            				supUnit;
            	break;
            case "attackSupport":
            	result += 	attacker +
							single +
							defender +
							defUnit +
            				single +
            				cost;
            	break;
            case "agora" 	:
            	result += 	agoraLine;
            	break;
            case "espionage" 		:
            	result += 	attacker +
							single +
							defender +
							spyUnit +
							spyBuild +
							spyIron +
							spyResource;
				break;
            case "powers"			:
            	result += 	attacker +
							single +
							defender +
							powerDet;
            	break;
            case "wall"			:
            	result = 	wallHead +
							double +
							wallDet;
            	break;
            case "conquer" 		:
            case "found"		:
            	result += 	attacker +
            				defender +
            				single +
            				conquer;
            	break;
		}
		result += 	double +
					foot;
		return result;
	}
	function getPlayerInfo(item) {
		result = {};
		result.town 		= _getTown(item);
		result.player 		= _getPlayer(item);
		result.ally 		= _getAlly(item);
		result.townName 	= _getTownName(item);
		result.playerName 	= _getPlayerName(item);

		return result;
	}
	function _getTownName(item) {
		if ($(item).find($('li.town_name a')).length > 0) {
			return $(item).find($('li.town_name a')).html().trim();
		}
		return '';
	}
	function _getPlayerName(item) {
		if ($(item).find($('li.town_owner a')).length > 0) {
			return $(item).find($('li.town_owner a')).html().trim();
		}
		return '';
	}
	function _getTown(item) {
		if ($(item).find($('li.town_name a')).length > 0) {
			return RepConvTool.Adds(eval('tmpArray=' + Atob($(item).find($('li.town_name a')).attr('href')))[RepConvType.getTown].toString(),RepConvType.town);
		} else if ($(item).find($('li.town_name')).length > 0) {
			return RepConvTool.Adds($(item).find($('li.town_name')).html().trim(),RepConvType.town);
		}
		return '';
	}
	function _getPlayer(item) {
		if ($(item).find($('li.town_owner a')).length > 0) {
			return RepConvTool.Adds($(item).find($('li.town_owner a')).html(),RepConvType.player);
		} else {
			return RepConvTool.Adds($(item).find($('li.town_owner')).html().trim(),RepConvType.player);
		}
		return '';
	}
	function _getAlly(item) {
		if ($(item).find($('li.town_owner_ally a')).length > 0) {
			return RepConvTool.Adds($(item).find($('li.town_owner_ally a')).html(),RepConvType.ally);
		}
		return '';
	}
	function getUnitDetail(result, item){
		$.each((RepConvGPWindow.getJQElement()).find($(item)), function(ind, elem){
			if(result.unit_list.length > 0){
				result.unit_list += ".";
			}
			RepConv.BBB = elem;
			if(elem.childElementCount > 0){
				var RCunit = elem.children[0].getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, '$1');
				var RCcost = RepConvTool.GetUnitCost(RCunit);
				var RClost = elem.children[1].innerHTML.replace("-","");
				if (RClost == "?"){
					RClost = 0;
				} else {
					result.w += RCcost.w * parseInt(RClost);
					result.s += RCcost.s * parseInt(RClost);
					result.i += RCcost.i * parseInt(RClost);
					result.p += RCcost.p * parseInt(RClost);
					result.f += RCcost.f * parseInt(RClost);
				}
				result.unit_list	+= RepConvTool.GetUnit(RCunit); 
				result.unit_img		+= RepConvTool.GetUnit(RCunit);
				result.unit_send 	+= RepConvTool.Unit(elem.children[0].children[0].innerHTML,"000")+RepConvType.separator;
				result.unit_lost 	+= RepConvTool.Unit(RClost.toString(),"b50307")+RepConvType.separator;
			}
		});
		if (result.unit_list.length > 0){
			result.unit_img = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result.unit_list),"img");
		}
		return result;
	}
	function getUnit(result, item){
		$.each((RepConvGPWindow.getJQElement()).find($(item)), function(ind, elem){
			if(result.unit_list.length > 0){
				result.unit_list += ".";
			}
			var RCunit = elem.getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, '$1');
			result.unit_list	+= RepConvTool.GetUnit(RCunit); 
			result.unit_img		+= RepConvTool.GetUnit(RCunit);
			result.unit_send 	+= RepConvTool.Unit( (elem.childElementCount > 0) ? elem.children[0].innerHTML : "?","000")+RepConvType.separator;
		});
		if (result.unit_list.length > 0){
			result.unit_img = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result.unit_list),"img");
		}
		return result;
	}
	function getBuild(result, item){
		$.each((RepConvGPWindow.getJQElement()).find($(item)), function(ind, elem){
			if(result.unit_list.length > 0){
				result.unit_list += ".";
			}
			var RCunit = elem.getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, '$1');
			result.unit_list	+= RepConvTool.GetBuild(RCunit); 
			result.unit_img		+= RepConvTool.GetBuild(RCunit);
			result.unit_send 	+= RepConvTool.Unit(elem.children[0].innerHTML,"000")+RepConvType.separator;
		});
		if (result.unit_list.length > 0){
			result.unit_img = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result.unit_list),"img");
		}
		return result;
	}
	function getUnitWall(result, item){
		var line = -1;
		var count = 0;

		$.each($(item).find($('div.wall_report_unit')), function(ind, elem){
			if ( count % 15 == 0 ){
				if (line > -1){
					if (result[line]['unit_list'].length > 0){
						result[line]['unit_img'] = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result[line]['unit_list']),"img");
					}
				}
				line++;
				result[line] = {};
				result[line]['unit_img']  	= '';
				result[line]['unit_list'] 	= '';
				result[line]['unit_count'] = '';
				result[line]['unit_diff'] 	= '';
			}
			if(result[line]['unit_list'].length > 0){
				result[line]['unit_list'] += ".";
			}
			var RCunit = $(elem).css('background-image').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*.*/,'$1');
			result[line]['unit_list']	+= RepConvTool.GetUnit(RCunit); 
			result[line]['unit_img']	+= RepConvTool.GetUnit(RCunit);
			result[line]['unit_count'] += RepConvTool.Unit($(elem).find($('span.place_unit_black')).html(),"000")+RepConvType.separator;
			if($(elem).find($('div.RepConvDiff')).length>0){
				result[line]['unit_diff'] 	+= RepConvTool.Unit($(elem).find($('div.RepConvDiff')).html(),"000")+RepConvType.separator;
			}
			count++;
		});
		if (line > -1){
			if (result[line]['unit_list'].length > 0){
				result[line]['unit_img'] = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result[line]['unit_list']),"img");
			}
		}
//		if (result.unit_list.length > 0){
//			result.unit_img = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, result.unit_list),"img");
//		}
	}
	function getFromPopup(item){
		$('#map_jump_to_current_town_button').mouseover();
		var RepConvpopupPre = $('#popup_content').html();
		$(item).mouseover();
		var RepConvpopupPost = $('#popup_content').html();
		$(item).mouseout();
		
		return (RepConvpopupPre != RepConvpopupPost) ? RepConvpopupPost : '';
	}
	String.prototype.strip_tags2 = function(){
		tags = this;
		stripped = tags.replace(/<\/?[^>]+>/gi, '');
		return stripped;
	};
	function Atob(value){
		var href = value.split(/#/);
		return atob(href[1]||href[0]);
	};
	function bbcode2html(value, destination){
		var params = {message : value};
		Layout.ajax(
					'message',
					'preview',
					params,
					true,
					function(data) {
						RepConv.Log(data.message);
						$(destination).html(data.message); 
					},
					'get');
	}
	function addCHBX(name, checked, label){
		var chkbxOn 	= '-353px -48px';
		var chkbxOff 	= '-367px -48px';
		var result 		= $('<div/>'); 
		if (name != ''){
			(result)
				.append($('<input/>', { 'type' : 'checkbox', 'name' : name, 'id' : name, 'checked': checked, 'style' : 'display: none;'}))
				.append($('<a/>', {
							'class' : 'farm_town_status_0',//add_entry', 
							'style' : 'background-repeat: no-repeat; width: 14px; height: 14px;',
							'rel'	: name
						})
						.bind('click', function() {
							$(this).css('background-position', !$('#'+this.getAttribute('rel')).attr('checked')? chkbxOn : chkbxOff);
							$('#'+this.getAttribute('rel')).attr('checked', !$('#'+this.getAttribute('rel')).attr('checked'));
							if($('#repConvArea').length == 1){
								$('#repConvArea').remove();
							}
							if($('#RepConvDivPrev').length == 1){
								$('#RepConvDivPrev').remove();
							}
						})
						.css('background-position', ((checked) ? chkbxOn : chkbxOff))
				)
				.append($('<label/>', { 'for' : name}).text(RepConv.Lang[label||name]))
				.append($('<br/>', {'style':'clear:both'}));
		} else {
			(result)
					.append($('<input/>', { 'type' : 'checkbox', 'style' : 'width: 0px; height: 18px; display: none;'}))
					.append($('<br/>'));
		}
		return result;
	}
	function addRADIO(name, checked, value, group, label){
		var chkbxOn 	= '-353px -48px';
		var chkbxOff 	= '-367px -48px';
		var result 		= $('<span/>'); 
		(result)
			.append($('<input/>', { 'type' : 'radio', 'name' : group, 'id' : name, 'value' : value, 'checked': checked, 'style' : 'display: none;'}))
			.append($('<a/>', {
						'class' : 'farm_town_status_0',//add_entry', 
						'style' : 'background-repeat: no-repeat; width: 14px; height: 14px;',
						'name'	: group,
						'rel'	: name
					})
					.click(function(){
						$.each($(formbody).find($('input[name='+group+']')), function(ind,elem){
							$(elem).attr('checked', false);
						});
						$.each($(formbody).find($('a[name='+group+']')), function(ind,elem){
							$(elem).css('background-position', chkbxOff);
						});
						$(this).css('background-position', chkbxOn);
						$('#'+this.getAttribute('rel')).attr('checked', true);
						if($('#repConvArea').length == 1){
							$('#repConvArea').remove();
						}
						if($('#RepConvDivPrev').length == 1){
							$('#RepConvDivPrev').remove();
						}
					})
					.css('background-position', ((checked) ? chkbxOn : chkbxOff))
			)
			.append($('<label/>', { 'for' : name }).text(RepConv.Lang[label||value]));
		return result;
	}
	function _fight() {
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.type 		= (RepConvGPWindow.getJQElement()).find($('#report_arrow img')).attr('src').replace(/.*\/([a-z_]*)\..*/, '$1');
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.morale 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).length == 0) ? '' 
								: RepConvType.morale+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).html().strip_tags().trim();
		report.luck 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).length == 0) ? '' 
								: RepConvType.luck+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).html().strip_tags().trim();
		if(report.luck.indexOf("-") > -1){
			report.luck = "[color=#b50307]"+report.luck+"[/color]";
		}
		report.oldwall 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).length == 0) ? ''
								: RepConvType.oldwall+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).html().strip_tags().trim();
		report.nightbonus 	= ((RepConvGPWindow).getJQElement().find($('span.fight_bonus.nightbonus')).length == 0) ? ''
								: RepConvType.nightbonus+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.nightbonus')).html().strip_tags().trim();
		
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));
		report.power		= ((RepConvGPWindow.getJQElement()).find($('div.report_power')).length == 0 ) ? ''
								: RepConvTool.Adds(RepConv.Const.staticImg+(RepConvGPWindow.getJQElement()).find($('div.report_power')).attr('id')+'_30x30.png',"img");

		report.attacker.unit_img = ''; 
		report.attacker.unit_send = ''; 
		report.attacker.unit_lost = ''; 
		report.attacker.unit_list =  ''; 
		report.attacker.w = 0; 
		report.attacker.s = 0; 
		report.attacker.i = 0; 
		report.attacker.p = 0; 
		report.attacker.f = 0;  
		
		report.defender.unit_img =  ''; 
		report.defender.unit_send = ''; 
		report.defender.unit_lost = ''; 
		report.defender.unit_list = '';
		report.defender.w = 0;
		report.defender.s = 0; 
		report.defender.i = 0; 
		report.defender.p = 0; 
		report.defender.f = 0;
		
		if ( ReportType == "attackSupport"){
			if($('#MSGDEFUNIT').attr('checked')){
				report.defender = getUnitDetail(report.defender, 'div.report_side_attacker_unit');
			}
		} else {
			if($('#MSGATTUNIT').attr('checked')){
				report.attacker = getUnitDetail(report.attacker, 'div.report_side_attacker_unit');
			}
			if($('#MSGDEFUNIT').attr('checked')){
				report.defender = getUnitDetail(report.defender, 'div.report_side_defender_unit');
			}
		}
		
		report.resources = {};
		report.resources.title = '';
		report.resources.detail = '';
		report.resources.image = '';
		report.resources.count = '';
		report.resources.wood = '';
		report.resources.stone = '';
		report.resources.iron = '';
		
		report.resources.title = ((RepConvGPWindow.getJQElement()).find($('div#resources h4')).length == 0) 
									? (RepConvGPWindow.getJQElement()).find($('div#resources p')).html()
									: (RepConvGPWindow.getJQElement()).find($('div#resources h4')).html();
		
		$.each((RepConvGPWindow.getJQElement()).find($('div#resources li.res_background span.bold')), function(ind, elem){
			report.resources.count += RepConvTool.Unit(elem.innerHTML,"000")+RepConvType.separator;
			switch (ind){
			case 0:
				report.resources.wood = elem.innerHTML;
				break;
			case 1:
				report.resources.stone = elem.innerHTML;
				break;
			case 2:
				report.resources.iron = elem.innerHTML;
				break;
			}
		});
		
		if (RepConvType.outside){
			report.resources.detail = 	RepConvTool.Adds(RepConvType.unitImg+RepConvType.sign+"S1S2S3.png","img")+"\n"+
										RepConvTool.AddSize(report.resources.count,9);
		}else{
			report.resources.detail = 	RepConvTool.AddSize(
											RepConvTool.Value(parseInt(report.resources.wood),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"wood.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.stone),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"stone.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.iron),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")
										,8);
		}
		report.bunt = '';
		if(((RepConvGPWindow.getJQElement()).find($('div#resources p')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 1)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span')).html();
		} else if (((RepConvGPWindow.getJQElement()).find($('div#resources h4')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 5)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span'))[4].innerHTML;
		}
	}
	function _raise() {
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.type 		= (RepConvGPWindow.getJQElement()).find($('#report_arrow img')).attr('src').replace(/.*\/([a-z_]*)\..*/, '$1');
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.morale 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).length == 0) ? '' 
								: RepConvType.morale+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).html().strip_tags().trim();
		report.luck 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).length == 0) ? '' 
								: RepConvType.luck+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).html().strip_tags().trim();
		if(report.luck.indexOf("-") > -1){
			report.luck = "[color=#b50307]"+report.luck+"[/color]";
		}
		report.oldwall 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).length == 0) ? ''
								: RepConvType.oldwall+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).html().strip_tags().trim();
		report.nightbonus 	= ((RepConvGPWindow).getJQElement().find($('span.fight_bonus.nightbonus')).length == 0) ? ''
								: RepConvType.nightbonus+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.nightbonus')).html().strip_tags().trim();
		
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));
		report.power		= ((RepConvGPWindow.getJQElement()).find($('div.report_power')).length == 0 ) ? ''
								: RepConvTool.Adds(RepConv.Const.staticImg+(RepConvGPWindow.getJQElement()).find($('div.report_power')).attr('id')+'_30x30.png',"img");

		report.attacker.unit_img = ''; 
		report.attacker.unit_send = ''; 
		report.attacker.unit_lost = ''; 
		report.attacker.unit_list =  ''; 
		report.attacker.w = 0; 
		report.attacker.s = 0; 
		report.attacker.i = 0; 
		report.attacker.p = 0; 
		report.attacker.f = 0;  
		
		report.defender.unit_img =  ''; 
		report.defender.unit_send = ''; 
		report.defender.unit_lost = ''; 
		report.defender.unit_list = '';
		report.defender.w = 0;
		report.defender.s = 0; 
		report.defender.i = 0; 
		report.defender.p = 0; 
		report.defender.f = 0;
		
		if ( ReportType == "attackSupport"){
			if($('#MSGDEFUNIT').attr('checked')){
				report.defender = getUnitDetail(report.defender, 'div#left_side>div');// div.report_side_attacker_unit');
			}
		} else {
			if($('#MSGATTUNIT').attr('checked')){
				report.attacker = getUnitDetail(report.attacker, 'div#left_side>div');// div.report_side_attacker_unit');
			}
			if($('#MSGDEFUNIT').attr('checked')){
				report.defender = getUnitDetail(report.defender, 'div#right_side>div');// div.report_side_defender_unit');
			}
		}
		
		report.resources = {};
		report.resources.title = '';
		report.resources.detail = '';
		report.resources.image = '';
		report.resources.count = '';
		report.resources.wood = '';
		report.resources.stone = '';
		report.resources.iron = '';
		
		report.resources.title = ((RepConvGPWindow.getJQElement()).find($('div#resources h4')).length == 0) 
									? (RepConvGPWindow.getJQElement()).find($('div#resources p')).html()
									: (RepConvGPWindow.getJQElement()).find($('div#resources h4')).html();
		
		$.each((RepConvGPWindow.getJQElement()).find($('div#resources li.res_background span.bold')), function(ind, elem){
			report.resources.count += RepConvTool.Unit(elem.innerHTML,"000")+RepConvType.separator;
			switch (ind){
			case 0:
				report.resources.wood = elem.innerHTML;
				break;
			case 1:
				report.resources.stone = elem.innerHTML;
				break;
			case 2:
				report.resources.iron = elem.innerHTML;
				break;
			}
		});
		
		if (RepConvType.outside){
			report.resources.detail = 	RepConvTool.Adds(RepConvType.unitImg+RepConvType.sign+"S1S2S3.png","img")+"\n"+
										RepConvTool.AddSize(report.resources.count,9);
		}else{
			report.resources.detail = 	RepConvTool.AddSize(
											RepConvTool.Value(parseInt(report.resources.wood),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"wood.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.stone),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"stone.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.iron),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")
										,7);
		}
		report.bunt = '';
		if(((RepConvGPWindow.getJQElement()).find($('div#resources p')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 1)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span')).html();
		} else if (((RepConvGPWindow.getJQElement()).find($('div#resources h4')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 5)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span'))[4].innerHTML;
		}
	}
	function _powers(){
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));
		report.morale 		= '';
		report.luck 		= '';
		report.oldwall 		= '';
		report.nightbonus 	= '';

		report.efekt		= {};
		report.type 		= -1;
		report.resources	= {};
		report.power		= RepConvTool.Adds(RepConv.Const.staticImg+(RepConvGPWindow.getJQElement()).find($('div#report_power_symbol')).css('background-image').replace(/.*\/power_([a-z_]*)\.png.*/, '$1')+'_30x30.png',"img");

		switch((RepConvGPWindow.getJQElement()).find($('div#report_power_symbol')).css('background-image').replace(/.*\/([a-z_]*\.png).*/, '$1')){
			case "power_happiness.png"				:		
			case "power_fertility_improvement.png"	:	
			case "power_bolt.png"					:	
			case "power_earthquake.png"				:	
			case "power_call_of_the_ocean.png"		:	
			case "power_town_protection.png"		:
			case "power_cap_of_invisibility.png"	:
				report.type = 1;
				break;

			case 'power_sea_storm.png'				:
			case 'power_divine_sign.png'			:
			case 'power_wisdom.png'					:
			case 'power_transformation.png'			:
			case 'power_patroness.png'				:
			case "power_resurrection.png"			:
				report.type = 2;
				break;
			
			case 'power_kingly_gift.png'			:
			case 'power_wedding.png'				:
				report.type = 3;
				break;
				
			case 'power_fair_wind.png'				:
			case 'power_strength_of_heroes.png'		:
			case 'power_desire.png'					:
			case "power_pest.png"					:
			case "power_underworld_treasures.png"	:	// Hades srebro - źle działa
				report.type = 4;
				break;
		}
		report.efekt.title = (RepConvGPWindow.getJQElement()).find($('div#left_side h4')).html();
		switch(report.type){
			case 1:
				report.efekt.detail	= (RepConvGPWindow.getJQElement()).find($('#right_side p')).html().strip_tags().trim();
				break;
//			case 22:
//				report.efekt.detail	= (RepConvGPWindow.getJQElement()).find($('#report_result')).html();
//				report.resources.image = ''; 
//				report.resources.count = '';
//				report.resources.unit_list = ''; 
//				report.resources.unit_img = '';
//				$.each((RepConvGPWindow.getJQElement()).find($('#report_gift .report_unit')), function(ind, elem){
//					var RCunit = elem.getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*.*/,'$1');
//					if(report.resources.unit_list.length > 0){
//						report.resources.unit_list += ".";
//					}
//					report.resources.unit_list	+= RepConvTool.GetUnit(RCunit);
//					report.resources.count 		+= RepConvTool.Unit(elem.children[0].innerHTML,"000")+RepConvType.separator;
//				});
//				if (report.resources.unit_list.length > 0){
//					report.resources.image = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, report.resources.unit_list),"img");
//				}
//				break;
			case 2:
				report.efekt.detail	= (RepConvGPWindow.getJQElement()).find($('#right_side h4')).html();
				report.resources.image = ''; 
				report.resources.count = '';
				report.resources.unit_list = ''; 
				report.resources.unit_img = '';
				$.each((RepConvGPWindow.getJQElement()).find($('#right_side div.report_unit')), function(ind, elem){
					var RCunit = elem.getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*.*/,'$1');
					if(report.resources.unit_list.length > 0){
						report.resources.unit_list += ".";
					}
					report.resources.unit_list	+= RepConvTool.GetUnit(RCunit);
					report.resources.count 		+= RepConvTool.Unit(elem.children[0].innerHTML,"000")+RepConvType.separator;
				});
				if (report.resources.unit_list.length > 0){
					report.resources.image = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, report.resources.unit_list),"img");
				}
				break;
			case 3:
				report.efekt.detail	= (RepConvGPWindow.getJQElement()).find($('#report_result')).html();
				report.resources.image   = report.resources.count = "";
				report.resources.image	+= RepConvType.separator+RepConvTool.Adds(RepConv.Const.wood,"img")+RepConvType.separator+RepConvType.separator;
				report.resources.image	+= RepConvType.separator+RepConvTool.Adds(RepConv.Const.stone,"img")+RepConvType.separator+RepConvType.separator;
				report.resources.image	+= RepConvType.separator+RepConvTool.Adds(RepConv.Const.iron,"img")+RepConvType.separator+RepConvType.separator;
				$.each((RepConvGPWindow.getJQElement()).find($('.res_background>span')), function(ind, elem){
					report.resources.count += RepConvTool.Unit(elem.innerHTML,"000")+RepConvType.separator+RepConvType.separator;
				});
				break;
		}
	}
	function _support() {
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.type 		= (RepConvGPWindow.getJQElement()).find($('#report_arrow img')).attr('src').replace(/.*\/([a-z_]*)\..*/, '$1');
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.morale 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).length == 0) ? '' 
								: RepConvType.morale+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.morale')).html().strip_tags().trim();
		report.luck 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).length == 0) ? '' 
								: RepConvType.luck+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.luck')).html().strip_tags().trim();
		if(report.luck.indexOf("-") > -1){
			report.luck = "[color=#b50307]"+report.luck+"[/color]";
		}
		report.oldwall 		= ((RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).length == 0) ? ''
								: RepConvType.oldwall+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.oldwall')).html().strip_tags().trim();
		report.nightbonus 	= ((RepConvGPWindow).getJQElement().find($('span.fight_bonus.nightbonus')).length == 0) ? ''
								: RepConvType.nightbonus+(RepConvGPWindow.getJQElement()).find($('span.fight_bonus.nightbonus')).html().strip_tags().trim();
		
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));
		report.power		= ((RepConvGPWindow.getJQElement()).find($('div.report_power')).length == 0 ) ? ''
								: RepConvTool.Adds(RepConv.Const.staticImg+(RepConvGPWindow.getJQElement()).find($('div.report_power')).attr('id')+'_30x30.png',"img");

		report.attacker.unit_img = ''; 
		report.attacker.unit_send = ''; 
		report.attacker.unit_list =  ''; 
		
		if($('#MSGATTUNIT').attr('checked')){
			report.attacker = getUnit(report.attacker, 'div.report_unit');
		}
	}
	function _command(){
		RepConv.Log('aaaaa');
		report.title 		= (RepConvGPWindow.getJQElement()).parent().children('div.ui-dialog-titlebar').children('span.ui-dialog-title').html();
		report.time 		= ''; 
		report.back 		= ((RepConvGPWindow.getJQElement()).find($('.command_icon_wrapper img')).length == 1);
		report.detail 		= {};
		report.attacker 	= {};
		report.defender 	= {};
		report.ret 			= ((RepConvGPWindow.getJQElement()).find($('div.return')).length > 0);
		report.farm			= ((RepConvGPWindow.getJQElement()).find($('.command_icon_wrapper img')).length>1 && (RepConvGPWindow.getJQElement()).find($('.command_icon_wrapper img')).attr('src').match(/.*\/(farm).*/)) ? true : false;
		//RepConv.Log('aaaaa'+report.farm);
		RepConv.Log('aaaaa');
		if (!report.ret){
			if(!report.back){
//				report.attacker = getPlayerInfo((RepConvGPWindow.getJQElement()).find($('div.attacker')));
				report.attacker.town 			= RepConvTool.Adds((eval("arrA = "+Atob((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
				report.attacker.townName 		= (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).html();
				report.attacker.player		 	= RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html(),RepConvType.player);
				report.attacker.playerName 	= (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html();
			}
			
//			report.defender = getPlayerInfo((RepConvGPWindow.getJQElement()).find($('div.defender')));
			report.defender.town 			= (report.farm) 
												? RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.defender li')).html(), RepConvType.town)
												: RepConvTool.Adds((eval("arrD = "+Atob((RepConvGPWindow.getJQElement()).find($('div.defender a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
			
			report.defender.townName 		= (report.farm) 
												? RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.defender li')).html(), RepConvType.town)
												: (RepConvGPWindow.getJQElement()).find($('div.defender a.gp_town_link')).html();
			report.defender.player  		= (report.farm)
												? ''
												: RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.defender a.gp_player_link')).html(),RepConvType.player);
			report.defender.playerName 		= (report.farm)
												? ''
												: (RepConvGPWindow.getJQElement()).find($('div.defender a.gp_player_link')).html();
		} else {
			if(!report.back){
//				report.defender = getPlayerInfo((RepConvGPWindow.getJQElement()).find($('div.attacker')));
				report.defender.town 			= (report.farm) 
								? RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.attacker li')).html(), RepConvType.town)
								: RepConvTool.Adds((eval("arrD = "+Atob((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
				
				report.defender.townName 		= (report.farm) 
								? RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.attacker li')).html(), RepConvType.town)
								: (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).html();
				report.defender.player  		= (report.farm)
								? ''
								: RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html(),RepConvType.player);
				report.defender.playerName 		= (report.farm)
								? ''
								: (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html();

//				report.defender.town 			= RepConvTool.Adds((eval("arrA = "+Atob((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
//				report.defender.townName 		= (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_town_link')).html();
//				report.defender.player		 	= RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html(),RepConvType.player);
//				report.defender.playerName 		= (RepConvGPWindow.getJQElement()).find($('div.attacker a.gp_player_link')).html();
			}
			
//			report.attacker = getPlayerInfo((RepConvGPWindow.getJQElement()).find($('div.defender')));
			report.attacker.town 			= RepConvTool.Adds((eval("arrD = "+Atob((RepConvGPWindow.getJQElement()).find($('div.defender a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
			report.attacker.townName 		= (RepConvGPWindow.getJQElement()).find($('div.defender a.gp_town_link')).html();
			report.attacker.player  		= RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.defender a.gp_player_link')).html(),RepConvType.player);
			report.attacker.playerName 		= (RepConvGPWindow.getJQElement()).find($('div.defender a.gp_player_link')).html();
		}

		if (report.attacker.playerName == null){
			report.attacker.player 	= "";
			report.attacker.playerName = "";
		}
		if (report.defender.playerName == null){
			report.defender.player 	= "";
			report.defender.playerName = "";
		}
		if ($('#MSGHIDAT').attr('checked')){
			report.attacker.town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
			report.title = report.title.replace(" ("+report.attacker.playerName+")", "");
			report.title = report.title.replace(report.attacker.townName, report.attacker.playerName);
		}
		if ($('#MSGHIDDE').attr('checked')){
			report.defender.town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
			report.title = report.title.replace(" ("+report.defender.playerName+")", "");
			report.title = report.title.replace(report.defender.townName, report.defender.playerName);
		}
		
		report.detail.time_title = (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_time legend')).html();
		report.detail.time_time = (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_time .arrival_time')).html();

		report.attacker.units_title = (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_units legend')).html();
		report.attacker.unit_img = ''; 
		report.attacker.unit_send = ''; 
		report.attacker.unit_list = '';
		report.attacker = getUnit(report.attacker, (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_units div.index_unit')));

		//cast_power
		report.detail.power_title = (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_casted_powers legend')).html();
		report.detail.power_img = (report.detail.power_title == null) ? ''
									: RepConvTool.Adds(RepConv.Const.staticImg+(RepConvGPWindow.getJQElement()).find($('fieldset.command_info_casted_powers div.index_town_powers')).attr('style').replace(/.*url.*\/([a-z_]*)\.png.*/, '$1')+'_30x30.png',"img");
			
		report.resources = {};
		report.resources.title = '';
		report.resources.detail = '';
		report.resources.image = '';
		report.resources.count = '';
		report.resources.wood = '';
		report.resources.stone = '';
		report.resources.iron = '';
		
		report.resources.title = (RepConvGPWindow.getJQElement()).find($('fieldset.command_info_res legend')).html();
		
		$.each((RepConvGPWindow.getJQElement()).find($('fieldset.command_info_res li.res_background span')), function(ind, elem){
			report.resources.count += RepConvTool.Unit(elem.innerHTML,"000")+RepConvType.separator;
			switch (ind){
			case 0:
				report.resources.wood = elem.innerHTML;
				break;
			case 1:
				report.resources.stone = elem.innerHTML;
				break;
			case 2:
				report.resources.iron = elem.innerHTML;
				break;
			}
		});
		
		if (RepConvType.outside){
			report.resources.detail = 	RepConvTool.Adds(RepConvType.unitImg+RepConvType.sign+"S1S2S3.png","img")+"\n"+
										RepConvTool.AddSize(report.resources.count,9);
		}else{
			report.resources.detail = 	RepConvTool.AddSize(
											RepConvTool.Value(parseInt(report.resources.wood),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"wood.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.stone),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"stone.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.iron),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")
										,7);
		}
		report.bunt = '';
		if(((RepConvGPWindow.getJQElement()).find($('div#resources p')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 1)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span')).html();
		} else if (((RepConvGPWindow.getJQElement()).find($('div#resources h4')).length == 1) && ((RepConvGPWindow.getJQElement()).find($('div#resources span')).length == 5)){
			report.bunt = (RepConvGPWindow.getJQElement()).find($('div#resources span'))[4].innerHTML;
		}
		
	}
	function _commandList(){
		report.title 		= (RepConvGPWindow.getJQElement()).find($('div.game_header')).html();
		report.time			= '';
		report.linia		= {};
		if((RepConvGPWindow.getJQElement()).find($('#tab_all ul#command_overview li img')).length > 0){
			var ind = 0;
			$.each((RepConvGPWindow.getJQElement()).find($('#tab_all ul#command_overview li')), function(ind2, parent){
				if ($(parent).css('display') != 'none'){
					report.linia[ind] = {};
					var parentId = '#gpwnd_'+RepConvGPWindow.getID()+' #'+parent.getAttribute('id');
					report.linia[ind].img = RepConvTool.Adds($(parentId+' div img').attr('src'),'img');
					var type = $(parentId+' div img').attr('src').replace(/.*\/([a-z_]*)\.png/,'$1');
					$.each($(parentId+' a.gp_town_link'), function(indA, elemA){
						if (indA == 0){
							report.linia[ind].townIdA = RepConvTool.Adds((eval("decodeArray="+Atob(elemA.getAttribute('href'))))[RepConvType.getTown].toString(),RepConvType.town);
						} else {
							report.linia[ind].townIdB = RepConvTool.Adds((eval("decodeArray="+Atob(elemA.getAttribute('href'))))[RepConvType.getTown].toString(),RepConvType.town);
						}
						report.linia[ind].inout = RepConvTool.Adds(RepConv.Const.staticImg+(($(parentId+' .overview_incoming').length == 0) ? 'out' : 'in')+'.png', 'img'); 
					});
					report.linia[ind].power = ($(parentId+' .casted_power').length == 0) ? ''
												: RepConvTool.Adds(RepConv.Const.staticImg + 
														$(parentId+' .casted_power').attr('style').replace(/.*power_([a-z_]*)_[0-9]*x[0-9]*\.png.*/, '$1')+ "_30x30.png",
												  "img");
					report.linia[ind].unit_img = ''; 
					report.linia[ind].unit_send = ''; 
					report.linia[ind].unit_list =  '';
					report.linia[ind].spy = '';
					switch(type){
					case "attack_spy" :
						report.linia[ind].spy = RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")+'  '+$('#gpwnd_'+RepConvGPWindow.getID()+' #tab_all #'+parent.getAttribute('id')+' span.resource_iron_icon').html(); 
						break;
					default:
						report.linia[ind] = getUnit(report.linia[ind], $('#gpwnd_'+RepConvGPWindow.getID()+' #tab_all #'+parent.getAttribute('id')+' div.place_unit'));
						break;
					}
					report.linia[ind].time = $(parentId+' .troops_arrive_at').html();//getFromPopup($(parentId+' .countdown'));
					ind++;
				}
			});
		}
		RepConv.Log(report);
		
	}
	function _espionage() {
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.morale 		= '';
		report.luck 		= '';
		report.oldwall 		= '';
		report.nightbonus 	= '';
		
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));

		report.defender.title =  (RepConvGPWindow.getJQElement()).find($('div#left_side>h4')).html();
		report.defender.unit_img =  ''; 
		report.defender.unit_send = ''; 
		report.defender.unit_list = '';
		report.defender = getUnit(report.defender, 'div#left_side>div.report_unit');

		report.build = {};
		report.build.title =  (RepConvGPWindow.getJQElement()).find($('div#spy_buildings>h4')).html();
		report.build.unit_img =  ''; 
		report.build.unit_send = ''; 
		report.build.unit_list = '';
		report.build = getBuild(report.build, 'div#spy_buildings>div.report_unit');

		report.iron = {};
		if ((RepConvGPWindow.getJQElement()).find($('div#right_side>h4')).length > 0) {
			report.iron.title = (RepConvGPWindow.getJQElement()).find($('div#right_side>h4'))[0].innerHTML;
		} else if ((RepConvGPWindow.getJQElement()).find($('div#right_side>p')).length > 0) {
			report.iron.title = (RepConvGPWindow.getJQElement()).find($('div#right_side>p'))[0].innerHTML.replace(/(.*:).*/,'$1');
		} else {
			report.iron.title = (RepConvGPWindow.getJQElement()).find($('div#report_game_body>div>p')).html().trim();
		}

		
		report.iron.count = ((RepConvGPWindow.getJQElement()).find($('div#right_side')).length > 0)
							? (RepConvGPWindow.getJQElement()).find($('#payed_iron span')).html() 
							|| (RepConvGPWindow.getJQElement()).find($('div#right_side>p'))[0].innerHTML.replace(/.*:([0-9]*)/,'$1').trim()
							: '';
		
		report.resources = {};
		report.resources.title = '';
		report.resources.detail = '';
		report.resources.image = '';
		report.resources.count = '';
		report.resources.wood = '';
		report.resources.stone = '';
		report.resources.iron = '';
		
		report.resources.title = ((RepConvGPWindow.getJQElement()).find($('div#right_side>h4')).length > 0) 
								 ? (RepConvGPWindow.getJQElement()).find($('div#right_side>h4'))[1].innerHTML
								 : '';
		
		$.each((RepConvGPWindow.getJQElement()).find($('div#resources li.res_background span.bold')), function(ind, elem){
			report.resources.count += RepConvTool.Unit(elem.innerHTML,"000")+RepConvType.separator;
			switch (ind){
			case 0:
				report.resources.wood = elem.innerHTML;
				break;
			case 1:
				report.resources.stone = elem.innerHTML;
				break;
			case 2:
				report.resources.iron = elem.innerHTML;
				break;
			}
		});
		
		if (RepConvType.outside){
			report.resources.detail = 	RepConvTool.Adds(RepConvType.unitImg+RepConvType.sign+"S1S2S3.png","img")+"\n"+
										RepConvTool.AddSize(report.resources.count,9);
		}else{
			report.resources.detail = 	RepConvTool.AddSize(
											RepConvTool.Value(parseInt(report.resources.wood),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"wood.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.stone),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"stone.png","img")+'  '+
											RepConvTool.Value(parseInt(report.resources.iron),6)+
											RepConvTool.Adds(RepConv.Const.unitImg+"iron.png","img")
										,7);
		}

	}
	function _conquerOld(){
		report.title 	= (RepConvGPWindow.getJQElement()).find($('#conqueror_units_in_town>span')).html();
		report.time		= (RepConvGPWindow.getJQElement()).find($('div.clearfix'))[0].innerHTML.strip_tags().trim().replace(/\n/gi,'').replace(/.*(\(.*\)).*/, '$1');
		report.attacker = {};
		report.defender = {};

		report.defender.town 		= RepConvTool.Adds((eval("arrD = "+Atob((RepConvGPWindow.getJQElement()).find($('div.clearfix a.gp_town_link')).attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
		report.defender.townName 	= (RepConvGPWindow.getJQElement()).find($('div.clearfix a.gp_town_link')).html();
		report.defender.player  	= RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('div.clearfix a.gp_player_link')).html(),RepConvType.player);
		report.defender.playerName 	= (RepConvGPWindow.getJQElement()).find($('div.clearfix a.gp_player_link')).html();

		if (report.defender.player == null){
			report.defender.player  	= "";
			report.defender.playerName = "";
		}
		
		if ($('#MSGHIDDE').attr('checked')){
			report.defender.town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
		}
		
		report.attacker.units_title = (RepConvGPWindow.getJQElement()).find($('div.clearfix div.bold')).html();
		report.attacker.unit_img = ''; 
		report.attacker.unit_send = ''; 
		report.attacker.unit_list = '';
		report.attacker = getUnit(report.attacker, (RepConvGPWindow.getJQElement()).find($('div.clearfix div.index_unit')));
		RepConv.Log(report);
	}
	function _conquer(){
		report.title 		= (RepConvGPWindow.getJQElement()).find($('#report_report_header')).html().strip_tags().replace('&nbsp;', ' ').trim();
		report.type 		= (RepConvGPWindow.getJQElement()).find($('#report_arrow img')).attr('src').replace(/.*\/([a-z_]*)\..*/, '$1');
		report.time 		= '('+(RepConvGPWindow.getJQElement()).find($('#report_date')).html()+') ';
		report.morale 		= '';
		report.luck 		= '';
		report.oldwall 		= '';
		report.nightbonus 	= '';
		report.attacker 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_sending_town')));
		report.defender 	= getPlayerInfo((RepConvGPWindow.getJQElement()).find($('#report_receiving_town')));
		var town 	= (RepConvGPWindow.getJQElement()).find($('#report_game_body p a.gp_town_link')).length == 0
						? ''
						: RepConvTool.Adds((eval("arrD = "+Atob(((RepConvGPWindow.getJQElement()).find($('#report_game_body p a.gp_town_link')).attr('href')))))[RepConvType.getTown].toString(), RepConvType.town);
		var player 	= ((RepConvGPWindow.getJQElement()).find($('#report_game_body p a.gp_player_link')).length == 0) ? '' 
						: RepConvTool.Adds((RepConvGPWindow.getJQElement()).find($('#report_game_body p a.gp_player_link')).html(), RepConvType.player);
		report.detail		= (RepConvGPWindow.getJQElement()).find($('#report_game_body p')).html().trim()
								.replace(/\(<a.*gp_player_link.*\/a>\)/,'('+player+')')
								.replace(/<a.*gp_town_link.*\/a>/,town); 
	}
	function _agora(){
		report.title 	= (RepConvGPWindow.getJQElement()).find($('#place_defense #defense_header')).html();
		report.time 	= '';
		report.linia	= {};
		$.each((RepConvGPWindow.getJQElement()).find($('li.place_units')), function(ind, parent){
			var town = '';
			if($(parent).children('h4').children('a.gp_town_link').length > 0){
				town = RepConvTool.Adds((eval("arrD = "+Atob($(parent).children('h4').children('a.gp_town_link').attr('href'))))[RepConvType.getTown].toString(), RepConvType.town);
			}
			if ($('#MSGHIDAT').attr('checked')){
				town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
			}
			report.linia[ind] = {};
			report.linia[ind].titleOrg = $(parent).children('h4').html();
			report.linia[ind].title		= $(parent).children('h4').html().replace(/(.*)<a.*\/a>/,'$1')+ town;
			report.linia[ind].unit_img 	= ''; 
			report.linia[ind].unit_send = ''; 
			report.linia[ind].unit_list =  '';
			$.each($(parent).children('div'), function(ind2, elem){
				if(report.linia[ind].unit_list.length > 0){
					report.linia[ind].unit_list += ".";
				}
				var RCunit = elem.getAttribute('style').replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, '$1');
				report.linia[ind].unit_list	+= RepConvTool.GetUnit(RCunit); 
				report.linia[ind].unit_img		+= RepConvTool.GetUnit(RCunit);
				report.linia[ind].unit_send 	+= RepConvTool.Unit(elem.children[0].innerHTML,"000")+RepConvType.separator;
			});
			if (report.linia[ind].unit_list.length > 0){
				report.linia[ind].unit_img = RepConvTool.Adds((RepConvType.genImg).RCFormat(RepConvType.sign, report.linia[ind].unit_list),"img");
			}
		});
	}
	function _wall(){
		report.title 	= (RepConvGPWindow.getJQElement()).find($('.game_header')).html();
		report.defeated = {};
		report.losses	= {};
		
		report.defeated.title 				= '';
		report.defeated.titleAttacker 		= '';
		report.defeated.titleDefender 		= '';
		report.losses.title 				= '';
		report.losses.titleAttacker 		= '';
		report.losses.titleDefender 		= '';
		report.defeated.attacker			= {};
		report.defeated.defender			= {};
		report.losses.attacker				= {};
		report.losses.defender				= {};
		
		if ($('#MSGASATTDEF').attr('checked') || $('#MSGASDEFDEF').attr('checked')){
			report.defeated.title 			= (RepConvGPWindow.getJQElement()).find($('div.list_item_left h3')).html();
			if ($('#MSGASATTDEF').attr('checked')){
				report.defeated.titleAttacker 	= $((RepConvGPWindow.getJQElement()).find($('div.list_item_left h4'))[0]).html().strip_tags().trim();
				getUnitWall(report.defeated.attacker, (RepConvGPWindow.getJQElement()).find($('div.list_item_left .wall_unit_container'))[0]);
			}
			if ($('#MSGASDEFDEF').attr('checked')){
				report.defeated.titleDefender 	= $((RepConvGPWindow.getJQElement()).find($('div.list_item_left h4'))[1]).html().strip_tags().trim();
				getUnitWall(report.defeated.defender, (RepConvGPWindow.getJQElement()).find($('div.list_item_left .wall_unit_container'))[1]);
			}
		}
		
		if ($('#MSGASATTLOS').attr('checked') || $('#MSGASDEFLOS').attr('checked')){
			report.losses.title 			= (RepConvGPWindow.getJQElement()).find($('div.list_item_right h3')).html();
			if ($('#MSGASATTLOS').attr('checked')){
				report.losses.titleAttacker 	= $((RepConvGPWindow.getJQElement()).find($('div.list_item_right h4'))[0]).html().strip_tags().trim();
				getUnitWall(report.losses.attacker, (RepConvGPWindow.getJQElement()).find($('div.list_item_right .wall_unit_container'))[0]);
			}
			if ($('#MSGASDEFLOS').attr('checked')){
				report.losses.titleDefender 	= $((RepConvGPWindow.getJQElement()).find($('div.list_item_right h4'))[1]).html().strip_tags().trim();
				getUnitWall(report.losses.defender, (RepConvGPWindow.getJQElement()).find($('div.list_item_right .wall_unit_container'))[1]);
			}
		}
		RepConv.Log(report);
	}
	function optionsReport(){
		var tag1 = $('<div/>', {'id' : 'publish_report_options1'});
		var tag2 = $('<div/>', {'id' : 'publish_report_options2'});
		var tag3 = $('<div/>', {'id' : 'publish_report_options3'});
		var chbxlist1 = {};
		var chbxlist2 = ['MSGHIDAT','MSGHIDDE'];
		var ramka1 = RepConvTool.RamkaLight(RepConv.Lang.MSGQUEST, tag1);
		var ramka2 = RepConvTool.RamkaLight(RepConv.Lang.MSGHIDAD, tag2);
			$(ramka2).attr('style','width: 50%; float:right;');

		RepConv.Log('ReportType='+ReportType);
		switch (ReportType){
			case "command" 		:
				labelArray = "attack";
				chbxlist1 = ['MSGATTUNIT','MSGRESOURCE'];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE'];
				break;
			case "breach" 		:
			case "attack" 		:
			case "take_over" 	:
				labelArray = "attack";
				chbxlist1 = ['MSGATTUNIT','MSGDEFUNIT','MSGRESOURCE'];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE',''];
				break;
			case "espionage"	:
				labelArray = "espionage";
				chbxlist1 = ['MSGUNITS','MSGBUILD','MSGUSC','MSGRAW'];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE','',''];
				break;
			case "commandList" 	:
				labelArray = "attack";
				chbxlist1 = ['MSGDETAIL'];
				chbxlist2 = {};
				break;
			case "conquerold"	:
				labelArray = "attack";
				chbxlist1 = ['MSGATTUNIT'];
				chbxlist2 = ['MSGHIDDE'];
				break;
			case "attackSupport":
				labelArray = "attack";
				chbxlist1 = ['MSGDEFUNIT',''];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE'];
				break;
			case "support":
				labelArray = "support";
				chbxlist1 = ['MSGATTUNIT',''];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE'];
				break;
			case "agora"		:
				labelArray = "support";
				chbxlist1 = ['MSGDEFUNIT'];
				chbxlist2 = ['MSGHIDAT'];
				break;
			case "powers":
				labelArray = "attack";
				chbxlist1 = {};
				chbxlist2 = ['MSGHIDDE'];
				break;
			case "raise" 		:
				labelArray = "attack";
				chbxlist1 = ['MSGATTUNIT','MSGDEFUNIT'];
				chbxlist2 = ['MSGHIDAT','MSGHIDDE'];
				break;
			case "conquer"		:
			case "found"		:
				labelArray = "attack";
				chbxlist1 = {};
				chbxlist2 = ['MSGHIDAT'];
				break;
		}
		switch(Math.max(chbxlist1.length||0,chbxlist2.length||0)){
			case 1:
				ramkaHeight = 273;
				break;
			case 2:
				ramkaHeight = 258;
				break;
			case 3:
				ramkaHeight = 236;
				break;
			case 4:
				ramkaHeight = 214;
				break;
		}
		RepConv.Lang.ATTACKER = RepConv.Lang.LABELS[labelArray].ATTACKER;
		RepConv.Lang.DEFENDER = RepConv.Lang.LABELS[labelArray].DEFENDER;
		RepConv.Lang.MSGHIDAT = RepConv.Lang.LABELS[labelArray].MSGHIDAT;
		RepConv.Lang.MSGHIDDE = RepConv.Lang.LABELS[labelArray].MSGHIDDE;
		RepConv.Lang.MSGATTUNIT = RepConv.Lang.LABELS[labelArray].MSGATTUNIT;
		RepConv.Lang.MSGDEFUNIT = RepConv.Lang.LABELS[labelArray].MSGDEFUNIT;

		$.each(chbxlist1, function(ind, elem){
			tag1.append(addCHBX(elem,true));
		});

		$.each(chbxlist2, function(ind, elem){
			tag2.append(addCHBX(elem,false));
		});
		if((chbxlist1.length > 0) && (chbxlist2.length > 0)){
			$(ramka1).attr('style','width: 50%; float:left;');
			$(ramka2).attr('style','width: 50%; float:left;');
		} else if (chbxlist1.length > 0) {
			$(ramka1).attr('style','clear: both; top: 10px;');
			$(ramka2).attr('style','display: none');
		} else if (chbxlist2.length > 0) {
			$(ramka1).attr('style','display: none');
			$(ramka2).attr('style','clear: both; top: 10px;');
		} else {
			$(ramka1).attr('style','display: none');
			$(ramka2).attr('style','display: none');
		}
		formbody.append(ramka1);
		formbody.append(ramka2);
	}	
	function optionsWall(){
		var tag = $('<div/>')
		.append(
			$('<fieldset/>',{'id' : 'publish_report_options_group_1L', 'style' : 'width:46%; float: left; border : 0px;'})
				.append($('<legend/>').html(RepConv.Lang.MSGDEFSITE))
				.append(addCHBX('MSGASATTDEF', true, 'MSGASATT'))
				.append(addCHBX('MSGASDEFDEF', true, 'MSGASDEF'))
		)
		.append(
			$('<fieldset/>',{'id' : 'publish_report_options_group_1R', 'style' : 'width:46%; float: right; border : 0px;'})
				.append($('<legend/>').html(RepConv.Lang.MSGLOSSITE))
				.append(addCHBX('MSGASATTLOS', true, 'MSGASATT'))
				.append(addCHBX('MSGASDEFLOS', true, 'MSGASDEF'))
				
		)
		.append(
			$('<div/>', {'style' : 'width: 100%; text-align: center; clear: both;'})
				.append(addRADIO('MSGDIFF1', ((RepConvGPWindow.getJQElement()).find($('div.RepConvDiff')).length == 0), 'MSGDIFF1', 'MSGDIFF', 'MSGDIFF1'))
				.append('&nbsp;&nbsp;')
				.append(addRADIO('MSGDIFF2', ((RepConvGPWindow.getJQElement()).find($('div.RepConvDiff')).length != 0), 'MSGDIFF2', 'MSGDIFF', 'MSGDIFF2'))
				.append('&nbsp;&nbsp;')
				.append(addRADIO('MSGDIFF3', false, 'MSGDIFF3', 'MSGDIFF', 'MSGDIFF3'))
				.append($('<br/>'))
		);
		if ((RepConvGPWindow.getJQElement()).find($('div.RepConvDiff')).length == 0){
			$(tag).find($('a[rel=MSGDIFF2]')).css('display', 'none');
			$('a[rel=MSGDIFF3]').css('display', 'none');
			$('label[for=MSGDIFF2]').css('display', 'none');
			$('label[for=MSGDIFF3]').css('display', 'none');
		}
		var ramka = RepConvTool.RamkaLight(RepConv.Lang.MSGQUEST, tag, 125);
		formbody.append(ramka);
	}
	function publBB(){
		var chkbxOn 	= '-353px -48px';
		var chkbxOff 	= '-367px -48px';
		var tag = $('<div/>');
		tag.append(addRADIO('BBCODEA', true, 'BBALLY', 'BBCODE'));
		tag.append('&nbsp;&nbsp;');
		tag.append(addRADIO('BBCODEE', false, 'BBFORUM', 'BBCODE'));

		var ramka = RepConvTool.RamkaLight(RepConv.Lang.MSGFORUM, tag,120);
		$(ramka).attr('style','clear: both; top: 10px');
		formbody.append(ramka);
	}
	function setTextArea (repconvValue){
		if($('#repConvArea').length == 1){
			$('#repConvArea').remove();
		}
		if($('#RepConvDivPrev').length == 1){
			$('#RepConvDivPrev').remove();
		}
		
		
		var bbCode = $('<textarea/>', { 
							'style'		: RepConv.Const.textareastyle, 
							'id'		: 'repConvArea',
							'readonly'	: 'readonly',
							'value' 	: RepConvTool.Adds(
															RepConvTool.AddFont(repconvValue,RepConvType.fonttag)
															,RepConvType.tag)
							}
						).click(function(){
							this.select();
						})
						.height(ramkaHeight-6)
						.hide()
						;
		var bbCodeViewS = $('<span/>', {'class' : "monospace", 'id' : 'RepConvSpanPrev'});
		var bbCodeView = $('<div/>', { 
							'style'		: 'background-color: #fff; height: 225px; width: 724px; overflow-y: scroll;',
							'id' 		: 'RepConvDivPrev',
							'class'		: 'quote_message small'
						})
						.height(ramkaHeight)
						.append(bbCodeViewS)
						;
		bbcode2html(repconvValue, bbCodeViewS);
		$('#RepConvAreas div.box_content').append(bbCode);
		$('#RepConvAreas div.box_content').append(bbCodeView);
	}
	function btns(){
		var repconvValue = '';
		$('<a/>', { 'class' : "button", 'href' : "#", 'style' : "float: right; "}) 
			.append(($('<span/>', { 'class' : "left" })) 
			.append(($('<span/>', { 'class' : "right" })) 
			.append(($('<span/>', { 'class' : "middle"})).text(RepConv.Lang.BTNGENER))) 
			.append($('<span/>', { 'style' : "clear: both; " }))).click(function(){
				$('#BTNVIEWBB').hide();
				$('#BTNVIEWVW').show();
				if ($('#BBCODEE').attr('checked')) {
					RepConvType = RepConvTypes.E;
				} else {
					RepConvType = RepConvTypes.A;
				}
				RepConv.Log('btns');
				switch (ReportType){
					case "command" 		:
						_command();
						break;
					case "breach" 		:
					case "attack" 		:
					case "attackSupport":
					case "take_over" 	:
						_fight();
						break;
					case "espionage"	:
						_espionage();
						break;
					case "commandList" 	:
						_commandList();
						break;
					case "conquerold"	:
						_conquerOld();
						break;
					case "support"		:
						_support();
						break;
					case "agora"		:
						_agora();
						break;
					case "powers" 		:
						_powers();
						break;
					case "raise" 		:
						_raise();
						break;
					case "wall" 		:
						_wall();
						break;
					case "conquer"		:
					case "found"		:
						_conquer();
						break;
				}
				RepConv.Log(report);
				if ($('#MSGHIDAT').length > 0 && report.attacker != undefined ){
					if ($('#MSGHIDAT').attr('checked')){
						report.attacker.town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
						report.title = report.title.replace(" ("+report.attacker.playerName+")", "");
						report.title = report.title.replace(report.attacker.townName, report.attacker.playerName);
					}
				}
				if ($('#MSGHIDDE').length > 0 && report.defender != undefined){
					if ($('#MSGHIDDE').attr('checked')){
						report.defender.town = RepConvTool.Adds(RepConv.Lang.HIDDEN, RepConvType.town);
						report.title = report.title.replace(" ("+report.defender.playerName+")", "");
						report.title = report.title.replace(report.defender.townName, report.defender.playerName);
					}
				}
				repconvValue = tmpl2(_template(),report);
				setTextArea(repconvValue);
				//$('#BTNVIEWBB').click();
			})
		.appendTo('#RepConvBtns'); 
		$('<a/>', { 'class' : "button", 'href' : "#", 'style' : "float: right; ", 'id' : "BTNVIEW"}) 
			.append(($('<span/>', { 'class' : "left" })) 
			.append(($('<span/>', { 'class' : "right" }))
			.append(($('<span/>', { 'class' : "middle", 'id' : "BTNVIEWBB"})).text(RepConv.Lang.BTNVIEW).hide())
			.append(($('<span/>', { 'class' : "middle", 'id' : "BTNVIEWVW"})).text("BBCode"))
			)
			.append($('<span/>', { 'style' : "clear: both; " }))).click(function(){
				if($('#repConvArea').length>0){
					$('#repConvArea').slideToggle();//.toggle(200);
					$('#RepConvDivPrev').slideToggle();//.toggle(200);
					$('#BTNVIEWBB').toggle();
					$('#BTNVIEWVW').toggle();
				}
			})
		.appendTo('#RepConvBtns');

		$('#RepConvBtns').css('display','block');
	}
	function form() {
		if (typeof RepConvParamWnd != 'undefined')
			RepConvParamWnd.close(); 
		RepConvParamWnd = Layout.dialogWindow.open('',RepConv.Scripts_name,760,580,null,false);
		//RepConvParamWnd.getJQElement().find('div.gpwindow_content').css('overflow', 'hidden');
		RepConvParamWnd.setHeight([580]);
		RepConvParamWnd.setPosition("center","center");
		RepConv.Log('Typ='+(RepConvGPWindow).type);
		switch (ReportType){
			case "command" 		:
			case "breach" 		:
			case "attack" 		:
			case "attackSupport":
			case "raise" 		:
			case "take_over" 	:
			case "commandList" 	:
			case "conquerold"	:
			case "support"		:
			case "agora"		:
			case "powers"		:
			case "espionage"	:
			case "conquer"		:
			case "found"		:
				optionsReport();
				break;
			case "wall"	:
				optionsWall();
				ramkaHeight = 208;
				break;
		}
		publBB();
		var ramka = RepConvTool.RamkaLight(RepConv.Lang.MSGBBCODE, '');
			$(ramka).attr('id','RepConvAreas');
		RepConv.ZaZa = ramka;
		$(formbody).append(ramka);
		RepConvParamWnd.appendContent(RepConvTool.Ramka(RepConv.Lang.MSGTITLE, formbody, 485));
		$('#RepConvAreas div.box_content').height(ramkaHeight);
		btns();
		RepConv.BQQ = RepConvParamWnd;
		(RepConvGPWindow.getJQCloseButton()).bind('click', function(event) {
			RepConvParamWnd.close();
		 });
	}
	form();
	return report;
}

$(document).ready(function(){
	setTimeout("RepConvAdds.init()",100);
});
// GA
if (typeof RepConvDevel == 'undefined' && typeof _gat != 'undefined'){
	var RepConvTracker = RepConvTracker || _gat._getTracker('UA-6635454-10');
	RepConvTracker._setDomainName('.grepolis.com');
	RepConvTracker._trackPageview();
}
//
