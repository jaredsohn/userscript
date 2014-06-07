// ==UserScript==
// @name The-West Calc
// @version 0.6.3
// @description The-West Battle Calc, Notepad, Battle stats, Duel Calc, Duel list, Quest list
// @author theTim
// @include	http://*.the-west.*/game.php*
// @include	http://*.tw.innogames.*/game.php*
// @updateURL http://userscripts.org/scripts/source/141924.user.js
// @downloadURL http://userscripts.org/scripts/source/141924.user.js
// ==/UserScript==

TWCalc_inject = function(){if(document.getElementById('TWCalc_js')) return; var TWCalcjs = document.createElement('script'); TWCalcjs.setAttribute('type', 'text/javascript'); TWCalcjs.setAttribute('language', 'javascript'); TWCalcjs.setAttribute('id', 'TWCalc_js'); TWCalcjs.innerHTML = "var _TWCalc_int = setInterval("+(function(){
clearInterval(_TWCalc_int);
	
TW_Calc = {
scriptName: "The-West Calc",
version: "0.6.3",
langs:{
"en_US":{
translator: "Laki235",
lang_0:"No",
lang_1:"Yes",
lang_2:"With premium",
lang_3:"Settings",
lang_4:"Skills",
lang_5:"Leadership",
lang_6:"Hiding",
lang_7:"Stamina",
lang_8:"Doging",
lang_9:"Aim",
lang_10:"Golden gun",
lang_11:"Maya Roalstad´s shawl",
lang_12:"Sam Hawken´s Knife",
lang_13:"Soldier",
lang_14:"Attack",
lang_15:"Defence",
lang_16:"Attack",
lang_17:"Defence",
lang_18:"Position on map",
lang_19:"Worker ",
lang_20:"The tower of your character",
lang_21:"Grass",
lang_22:"Tower - level 1",
lang_23:"Tower - level 2",
lang_24:"Tower - level 3",
lang_25:"Tower - level 4",
lang_26:"Tower - level 5",
lang_27:"Calculate",
lang_28:"Health",
lang_29:"Health points",
lang_30:"Level",
lang_31:"Fortbattle attack",
lang_32:"Character",
lang_33:"Fortbattle defence",
lang_34:"Other",
lang_35:"Delete",
lang_36:"Save",
lang_37:"Set time",
lang_38:"Greenhorn",
lang_39:"Dueller",
lang_40:"Adventurer",
lang_41:"Soldier",
lang_42:"Builder",
lang_43:"Player name",
lang_44:"Game world",
lang_45:"Player level",
lang_46:"Character class",
lang_47:'[COLOR="Red"]Attack[/COLOR]',
lang_48:'[COLOR="Blue"]Defense[/COLOR]',
lang_49:'[COLOR="Green"]Health[/COLOR]',
lang_50:"Attack",
lang_51:"Defense",
lang_52:"Gameworld",
lang_53:"Player name",
lang_54:"Character class",
lang_55:"Fortbattle - attack",
lang_56:"Fortbattle -  defense",
lang_57:"Attack",
lang_58:"Defence",
lang_59:"Attack",
lang_60:"Defence",
lang_61:"Health",
lang_62:"Alarmclock settings ",
lang_63:"Calculate the highest and lowest duelling level you are able to duel",
lang_64:"Calculate the amount of experiences gained from a duel",
lang_65:"Your duelling level",
lang_66:"Your duelling level",
lang_67:"Calculate",
lang_68:"Highest possible duelling level ",
lang_69:"Lowest possible duelling level",
lang_70:"Duelling level of your opponent",
lang_71:"Duel motivation",
lang_72:"How to write a date? Example:",
lang_73:"Languague",
lang_74:"Import skills",
lang_75:"Health points",
lang_76:"Create a languague pack",
lang_77:"for The-West Calc is a new version available, please click ok to update the Userscript",
lang_78:"TW-Calc Update needed",
lang_79:"Aktuálna verzia",
lang_80:"Later",
lang_81:"Your note",
lang_82:"Time",
lang_83:"TW-Calc Alarm clock",
lang_84:"Your languague",
lang_85:"http://tw-calc.net/images/ico/flags/en.png",
lang_86:"If you will win duel, you will gain",
lang_87:"experience and",
lang_88:"Successfully saved",
lang_89:"Your notes has been successfully deleted",
lang_90:"Alarm Clock not set (BAD SYNTAX)",
lang_91:"Alarm clock set",
lang_92:"Cancel",
lang_93:"TW-Calc Alarm clock - settings",
lang_94:"Alarm clock",
lang_95:"Zadajte url adresu zvuku. Príklad: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Alarm clock set",
lang_97:"Melody of alarm clock: Alarm1, Alarm2",
lang_98:"Health points",
lang_99:"Energy",
lang_100:"Full energy for",
lang_101:"hours and",
lang_102:"minutes",
lang_103:"Experience points",
lang_104:"Full health for:",
lang_105:"Transfer fee",
lang_106:"Transfer fee",
lang_107:"Transfer amount",
lang_108:"Pridať automatický kalkulátor bankových poplatkov (pri prevode) do banky",
lang_109:"Pridať kalkulátory času doplnenia energie a zdravia",
lang_110:"duel experience",
lang_111:"New version",
lang_112:"Whats new",
lang_113:"Edit",
lang_114:"Duelling level",
lang_115:"Duleable",
lang_116:"Distance",
lang_117:"Center map",
lang_118:"Town",
lang_119:"Win duel",
lang_120:"Job",
lang_121:"Nothing",
lang_122:"Note",
lang_123:"Really?",
lang_124:"Actually empthy",
lang_125:"To accept this quest you must finish the quest",
lang_126:"To accept this quest you dont have to finish the quest",
lang_127:"Date:",
lang_128:"Day:",
lang_129:"Kill:",
lang_130:"Back to list of quests",
lang_131:"Really?",
lang_132:"Option",
lang_133:"Add quest extension",
"quest":{
lang_1:"Level",
lang_2:"Quests",
lang_3:"Character classes",
lang_4:"All",
lang_5:"Quests",
lang_6:"Special quests",
vojak:"Soldier",
pracovnik:"Worker",
duelant:"Dueller",
dobrodruh:"Adventurer",
lang_7:"Free skills",
lang_8:"Access",
lang_9:"Finish",
lang_10:"Reward",
lang_11:"Have equiped",
lang_12:"Other requirements",
lang_13:"Job",
},
},
"sk_SK":{
translator: "theTim",
lang_0:"Nie",
lang_1:"Áno",
lang_2:"S prémiom",
lang_3:"Nastavenia",
lang_4:"Schopnosti",
lang_5:"Vodcovstvo",
lang_6:"Skrývanie",
lang_7:"Vytrvalosť",
lang_8:"Uhýbanie",
lang_9:"Presnosť",
lang_10:"Zlatá puška",
lang_11:"Šál Márie Rolastad",
lang_12:"Nôž Sama Hawkensa",
lang_13:"Vojak",
lang_14:"Šanca na zásah",
lang_15:"Šanca na úhyb",
lang_16:"Šanca na zásah",
lang_17:"Šanca na úhyb",
lang_18:"Pozícia na mape pevnosti",
lang_19:"Pracovník ",
lang_20:"Veža tvojho charakteru",
lang_21:"Tráva",
lang_22:"Veža - úroveň 1",
lang_23:"Veža - úroveň 2",
lang_24:"Veža - úroveň 3",
lang_25:"Veža - úroveň 4",
lang_26:"Veža - úroveň 5",
lang_27:"Vypočítaj",
lang_28:"Zdravie",
lang_29:"Body zdravia",
lang_30:"Úroveň",
lang_31:"Útok",
lang_32:"Postava",
lang_33:"Obrana",
lang_34:"Iné",
lang_35:"Zmaž",
lang_36:"Ulož",
lang_37:"Nastav budík",
lang_38:"Zelenáč",
lang_39:"Duelant",
lang_40:"Dobrodruh",
lang_41:"Vojak",
lang_42:"Pracovník",
lang_43:"Meno hráča",
lang_44:"Herný svet",
lang_45:"Úroveň hráča",
lang_46:"Trieda postavy",
lang_47:'[COLOR="Red"]Útok[/COLOR]',
lang_48:'[COLOR="Blue"]Obrana[/COLOR]',
lang_49:'[COLOR="Green"]Zdravie[/COLOR]',
lang_50:"Šanca na zásah",
lang_51:"Šanca na úhyb",
lang_52:"Herný svet",
lang_53:"Meno hráča",
lang_54:"Trieda postavy",
lang_55:"Útok",
lang_56:"Obrana",
lang_57:"Šanca na zásah",
lang_58:"Šanca na úhyb",
lang_59:"Šanca na zásah",
lang_60:"Šanca na úhyb",
lang_61:"Zdravie",
lang_62:"Nastavenie budíka",
lang_63:"Kalkulátor na výpočet maximálnej a minimálnej duelovatelnej duelovej úrovne",
lang_64:"Kalkulátor na výpočet skúseností z duelu",
lang_65:"Tvoja duelová úroveň",
lang_66:"Tvoja duelová úroveň",
lang_67:"Vypočítaj",
lang_68:"Maximálna duelová duelovateľná úroveň ",
lang_69:"Minimálna duelová duelovateľná úroveň",
lang_70:"Duelová úroveň protivníka",
lang_71:"Duelová motivácia",
lang_72:"Ako správne zapísať čas? Príklad:",
lang_73:"Jazyk",
lang_74:"Importuj aj schopnosti",
lang_75:"Body zdravia",
lang_76:"Vytvor si vlastný jazykový balíček",
lang_77:"Pre TW-Calc je dostupná aktualizácia, klikni prosím na ok pre aktualizáciu scriptu",
lang_78:"TW-Calc potrebuje aktualizáciu",
lang_79:"Aktuálna verzia",
lang_80:"Neskôr",
lang_81:"Tvoja poznámka",
lang_82:"Čas",
lang_83:"TW-Calc Budík",
lang_84:"Aktuálny jazyk",
lang_85:"http://tw-calc.net/images/ico/flags/svk.png",
lang_86:"Ak vyhráš duel, získaš",
lang_87:"skúseností a",
lang_88:"Úspešne uložené",
lang_89:"Tvoje poznámky boli úspešne zmazané",
lang_90:"Budík nenastavený (ZLÁ SYNTAX)",
lang_91:"Budík nastavený",
lang_92:"Zruš",
lang_93:"TW-Calc Budík - nastavenia",
lang_94:"Zvuk budíka",
lang_95:"Zadajte url adresu zvuku. Príklad: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Budík nastavený",
lang_97:"Budíky: Alarm1, Alarm2", 
lang_98:"Body zdravia",
lang_99:"Energia",
lang_100:"Plná energia za",
lang_101:"hodín a",
lang_102:"minút",
lang_103:"Body skúsenosti",
lang_104:"Plné zdravie za:",
lang_105:"Poplatok za prevod",
lang_106:"Poplatky",
lang_107:"Prevedená suma",
lang_108:"Pridať do banky automatický kalkulátor bankových poplatkov (pri prevode)",
lang_109:"Pridať do hry kalkulátory času doplnenia energie a zdravia",
lang_110:"duelových skúseností",
lang_111:"Nová verzia",
lang_112:"Čo je nové",
lang_113:"Upraviť zoznam hráčov",
lang_114:"Duelová úroveň",
lang_115:"Duel možný",
lang_116:"Vzdialenosť",
lang_117:"Vycentruj mapu",
lang_118:"Mesto",
lang_119:"Vyhraj duel proti",
lang_120:"Práca",
lang_121:"Nič",
lang_122:"Poznámka",
lang_123:"Naozaj chceš vymazať poznámky?",
lang_124:"Momentálne prázdne",
lang_125:"Pre zobrazenie tejto úlohy musíš dokončiť úlohu/y:",
lang_126:"Pre zobrazenie tejto úlohy nesmieš dokončiť úlohu/y",
lang_127:"Dátum:",
lang_128:"Deň:",
lang_129:"Daj do kómy:",
lang_130:"Späť na zoznam úloh",
lang_131:"Naozaj?",
lang_132:"Možnosť",
lang_133:"Pridať rozšírenie s úlohami",
"quest":{
lang_1:"Úroveň",
lang_2:"Úlohy v sérii",
lang_3:"Trieda postavy",
lang_4:"Všetky",
lang_5:"Úlohy",
lang_6:"Špeciálne úlohy",
vojak:"Vojak",
pracovnik:"Pracovník",
duelant:"Duelant",
dobrodruh:"Dobrodruh",
lang_7:"Voľné bod/y schopností",
lang_8:"Sprístupniť",
lang_9:"Ukončiť",
lang_10:"Odmena",
lang_11:"Mať na sebe",
lang_12:"Iné požiadavky",
lang_13:"Práca",
},
},
"cs_CZ":{
translator: "*Tramp*",
lang_0:"Ne",
lang_1:"Ano",
lang_2:"S prémiom",
lang_3:"Nastavenia",
lang_4:"Schopnosti",
lang_5:"Vést",
lang_6:"Skrývání",
lang_7:"Vytrvalost",
lang_8:"Uhýbání",
lang_9:"Přesnost",
lang_10:"Zlatá puška",
lang_11:"Cestovní šál Marie Roalstad",
lang_12:"Sam Hawkensovo nůž",
lang_13:"Voják",
lang_14:"Šance na zásah",
lang_15:"Šance na úhyb",
lang_16:"Šance na zásah",
lang_17:"Šance na úhyb",
lang_18:"Pozice na mapě pevnosti",
lang_19:"Dělník ",
lang_20:"Věž tvého charakteru",
lang_21:"Tráva",
lang_22:"Věž - úroveň 1",
lang_23:"Věž - úroveň 2",
lang_24:"Věž - úroveň 3",
lang_25:"Věž - úroveň 4",
lang_26:"Věž - úroveň 5",
lang_27:"Vypočítat",
lang_28:"Zdraví",
lang_29:"Body Zdraví",
lang_30:"Úroveň",
lang_31:"Útok",
lang_32:"Postava",
lang_33:"Obrana",
lang_34:"Jiné",
lang_35:"Smazat",
lang_36:"Uložit",
lang_37:"Nastavit budík",
lang_38:"Zelenáč",
lang_39:"Duelant",
lang_40:"Dobrodruh",
lang_41:"Voják",
lang_42:"Dělník",
lang_43:"Jméno hráče",
lang_44:"Herní svět",
lang_45:"Úroveň hráče",
lang_46:"Charakter postavy",
lang_47:'[COLOR="Red"]Útok[/COLOR]',
lang_48:'[COLOR="Blue"]Obrana[/COLOR]',
lang_49:'[COLOR="Green"]Zdraví[/COLOR]',
lang_50:"Šance na zásah",
lang_51:"Šance na úhyb",
lang_52:"Herní svět",
lang_53:"Meno hráče",
lang_54:"Charakter postavy",
lang_55:"Útok",
lang_56:"Obrana",
lang_57:"Šance na zásah",
lang_58:"Šance na úhyb",
lang_59:"Šance na zásah",
lang_60:"Šance na úhyb",
lang_61:"Zdravie",
lang_62:"Nastavenie budíka",
lang_63:"Kalkulátor na výpočet maximální a minimální duelovatelné duelové úrovně",
lang_64:"Kalkulátor na výpočet zkušeností z duelu",
lang_65:"Tvoje duelová úroveň",
lang_66:"Tvoje duelová úroveň",
lang_67:"Vypočítej",
lang_68:"Maximální duelová duelovatelná úroveň ",
lang_69:"Minimální duelová duelovatelná úroveň",
lang_70:"Duelová úroveň protivníka",
lang_71:"Duelová motivace",
lang_72:"Jak správně napsat čas? Příklad:",
lang_73:"Jazyk",
lang_74:"Importuj aj schopnosti",
lang_75:"Body zdravia",
lang_76:"Vytvor si vlastný jazykový balíček",
lang_77:"Pre TW-Calc je dostupná aktualizácia, klikni prosím na ok pre aktualizáciu scriptu",
lang_78:"TW-Calc potrebuje aktualizáciu",
lang_79:"Aktuálna verzia",
lang_80:"Neskôr",
lang_81:"Tvoja poznámka",
lang_82:"Čas",
lang_83:"TW-Calc Budík",
lang_84:"Aktuálny jazyk",
lang_85:"http://tw-calc.net/images/ico/flags/cze.png",
lang_86:"Když vyhraješ duel, získáš",
lang_87:"zkušeností a",
lang_88:"Úspešne uložené",
lang_89:"Tvoje poznámky boli úspešne zmazané",
lang_90:"Budík nenastavený (ZLÁ SYNTAX)",	
lang_91:"Budík nastavený",
lang_92:"Zruš",
lang_93:"TW-Calc Budík - nastavenia",
lang_94:"Zvuk budíka",
lang_95:"Zadajte url adresu zvuku. Príklad: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Budík nastavený",
lang_97:"Budíky: Alarm1, Alarm2",
lang_98:"Body zdravia",
lang_99:"Energia",
lang_100:"Plná energia za",
lang_101:"hodín a",
lang_102:"minút",
lang_103:"Body skúsenosti",
lang_104:"Plné zdravie za:",
lang_105:"Poplatok za prevod",
lang_106:"Poplatky",
lang_107:"Prevedená suma",
lang_108:"Pridať do banky automatický kalkulátor bankových poplatkov (pri prevode)",
lang_109:"Pridať do hry kalkulátory času doplnenia energie a zdravia",
lang_110:"duelových skúseností",
lang_111:"Nová verzia",
lang_112:"Čo je nové",
lang_113:"Edit",
lang_114:"Duelling level",
lang_115:"Duleable",
lang_116:"Distance",
lang_117:"Center map",
lang_118:"Town",
lang_119:"Vyhraj duel proti",
lang_120:"Práca",
lang_121:"Nič",
lang_122:"Poznámka",
lang_123:"Naozaj chceš vymazať poznámky?",
lang_124:"Momentálne prázdne",
lang_125:"Pre zobrazenie tejto úlohy musíš dokončiť úlohu/y:",
lang_126:"Pre zobrazenie tejto úlohy nesmieš dokončiť úlohu/y",
lang_127:"Dátum:",
lang_128:"Deň:",
lang_129:"Daj do kómy:",
lang_130:"Späť na zoznam úloh",
lang_131:"Naozaj?",
lang_132:"Možnosť",
lang_133:"Pridať rozšírenie s úlohami",
"quest":{
lang_1:"Úroveň",
lang_2:"Úlohy v sérii",
lang_3:"Trieda postavy",
lang_4:"Všetky",
lang_5:"Úlohy",
lang_6:"Špeciálne úlohy",
vojak:"Vojak",
pracovnik:"Pracovník",
duelant:"Duelant",
dobrodruh:"Dobrodruh",
lang_7:"Voľné bod/y schopností",
lang_8:"Sprístupniť",
lang_9:"Ukončiť",
lang_10:"Odmena",
lang_11:"Mať na sebe",
lang_12:"Iné požiadavky",
lang_13:"Práca",
},
},
"es_ES":{
translator: "pepe100",
lang_0:"No",
lang_1:"Sí",
lang_2:"Con premium",
lang_3:"Ajustes",
lang_4:"Habilidades",
lang_5:"Dirigir",
lang_6:"Esconder",
lang_7:"Condición",
lang_8:"Eludir",
lang_9:"Apuntar",
lang_10:"Rifle de oro",
lang_11:"Bufanda de María Roalstad",
lang_12:"Cuchillo de Sam Hawken",
lang_13:"Soldado",
lang_14:"Ataque",
lang_15:"Defensa",
lang_16:"Ataque",
lang_17:"Defensa",
lang_18:"Posición en mapa",
lang_19:"Trabajador",
lang_20:"La torre de su personaje",
lang_21:"Hierba",
lang_22:"Torre - nivel 1",
lang_23:"Torre - nivel 2",
lang_24:"Torre - nivel 3",
lang_25:"Torre - nivel 4",
lang_26:"Torre - nivel 5",
lang_27:"Calcular",
lang_28:"Salud",
lang_29:"Puntos de salud",
lang_30:"Nivel",
lang_31:"Ataque de fuerte",
lang_32:"Personaje",
lang_33:"Defensa de fuerte",
lang_34:"Otro",
lang_35:"Borrar",
lang_36:"Guardar",
lang_37:"Ajustar hora",
lang_38:"Novato",
lang_39:"Duelista",
lang_40:"Aventurero",
lang_41:"Soldado",
lang_42:"Trabajador",
lang_43:"Nombre jugador",
lang_44:"Mundo juego",
lang_45:"Jugador nivel",
lang_46:"Clase carácter",
lang_47:'[COLOR="Red"]Ataque[/COLOR]',
lang_48:'[COLOR="Blue"]Defensa[/COLOR]',
lang_49:'[COLOR="Green"]Salud[/COLOR]',
lang_50:"Ataque",
lang_51:"Defense",
lang_52:"Mundo juego",
lang_53:"Nombre jugador",
lang_54:"Clase carácter",
lang_55:"Batalla fuerte - ataque",
lang_56:"Batalla fuerte - defensa",
lang_57:"Ataque",
lang_58:"Defensa",
lang_59:"Ataque",
lang_60:"Defensa",
lang_61:"Salud",
lang_62:"Ajustes despertador  ",
lang_63:"Calcular el mayor y el menor nivel de duelo que es capaza de duelear",
lang_64:"Calcular la cantidad de experiencia obtenida de un duelo",
lang_65:"Su nivel de duelo",
lang_66:"Su nivel de duelo",
lang_67:"Calcular",
lang_68:"EL nivel más alto posible de duelo  ",
lang_69:"El nivel mas bajo posible de duelo",
lang_70:"Nivel de duelo de su adversario",
lang_71:"Motivación duelo",
lang_72:"¿Cómo escribir una fecha? Ejemplo:",
lang_73:"Idioma",
lang_74:"Importar habilidades",
lang_75:"Puntos de Salud",
lang_76:"Crear un paquete de idioma",
lang_77:"Hay una nueva versión disponible para The-West Calc, por favor haga click en aceptar para actualizar el script",
lang_78:"TW-Calc actualización necesaria",
lang_79:"Versión actual",
lang_80:"Más tarde",
lang_81:"Su nota",
lang_82:"Hora",
lang_83:"TW-Calc despertador",
lang_84:"Su idioma",
lang_85:"http://tw-calc.net/images/ico/flags/es.png",
lang_86:"Si usted gana un duelo, ganará",
lang_87:"de experiencia y",
lang_88:"Guardado con éxito",
lang_89:"Sus notas se han borrado correctamente",
lang_90:"Despertador no fijado (MALA SINTAXIS)",
lang_91:"Despertador fijado",
lang_92:"Cancelar",
lang_93:"TW-Calc Despertador - ajustes",
lang_94:"Despertador",
lang_95:"Introduzca la URL del sonido. Ejemplo: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Alarma de reloj",
lang_97:"Melodía de alarma: Alarma1, Alarma2",
lang_98:"Puntos de salud",
lang_99:"Energía",
lang_100:"Energía completa en",
lang_101:"horas y",
lang_102:"minutos",
lang_103:"Puntos de experiencia",
lang_104:"Salud completa en:",
lang_105:"Tasa transferencia",
lang_106:"Tasa transferencia",
lang_107:"Importe de transferencia",
lang_108:"Añadir calculadora automática de gastos (la tranferencia) al banco",
lang_109:"Añadir calculadora de salud y de energía",
lang_110:"experiencia de duelo",
lang_111:"New version",
lang_112:"Whats new",
lang_113:"Edit",
lang_114:"Duelling level",
lang_115:"Duleable",
lang_116:"Distance",
lang_117:"Center map",
lang_118:"Town",
lang_119:"Win duel",
lang_120:"Job",
lang_121:"Nothing",
lang_122:"Note",
lang_123:"Really?",
lang_124:"Actually empthy",
lang_125:"To accept this quest you must finish the quest",
lang_126:"To accept this quest you dont have to finish the quest",
lang_127:"Date:",
lang_128:"Day:",
lang_129:"Kill:",
lang_130:"Back to list of quests",
lang_131:"Really?",
lang_132:"Option",
lang_133:"Add quest extension",
"quest":{
lang_1:"Level",
lang_2:"Quests",
lang_3:"Character classes",
lang_4:"All",
lang_5:"Quests",
lang_6:"Special quests",
vojak:"Soldier",
pracovnik:"Worker",
duelant:"Dueller",
dobrodruh:"Adventurer",
lang_7:"Free skills",
lang_8:"Access",
lang_9:"Finish",
lang_10:"Reward",
lang_11:"Have equiped",
lang_12:"Other requirements",
lang_13:"Job",
},
},
"pl_PL":{
translator: "el-Rysio",
lang_0:"Nie",
lang_1:"Tak",
lang_2:"Z Premium",
lang_3:"Ustawienia",
lang_4:"Umiejętności",
lang_5:"Dowodzenie",
lang_6:"Chowanie się",
lang_7:"Wytrzymałość",
lang_8:"Unik",
lang_9:"Celowanie",
lang_10:"Złota strzelba",
lang_11:"Szal Marii Roalstad",
lang_12:"Nóż Sama Hawkena",
lang_13:"Żołnierz",
lang_14:"Atak",
lang_15:"Obrona",
lang_16:"Atak",
lang_17:"Obrona",
lang_18:"Pozycja na bitwie",
lang_19:"Budowniczy ",
lang_20:"Baszta twojej klasy postaci",
lang_21:"Trawa",
lang_22:"Baszta - poziom 1",
lang_23:"Baszta - poziom 2",
lang_24:"Baszta - poziom 3",
lang_25:"Baszta - poziom 4",
lang_26:"Baszta - poziom 5",
lang_27:"Oblicz",
lang_28:"Punkty Życia",
lang_29:"Punkty Życia",
lang_30:"Poziom",
lang_31:"Atak na fort",
lang_32:"Klasa postaci",
lang_33:"Obrona fortu",
lang_34:"Inne",
lang_35:"Usuń",
lang_36:"Zapisz",
lang_37:"Ustaw czas",
lang_38:"Nowicjusz",
lang_39:"Zawadiaka",
lang_40:"Poszukiwacz przygód",
lang_41:"Żołnierz",
lang_42:"Budowniczy",
lang_43:"Nazwa gracza",
lang_44:"Świat gry",
lang_45:"Poziom postaci",
lang_46:"Klasa postaci",
lang_47:'[COLOR="Red"]Atak[/COLOR]',
lang_48:'[COLOR="Blue"]Obrona[/COLOR]',
lang_49:'[COLOR="Green"]Punkty życia[/COLOR]',
lang_50:"Atak",
lang_51:"Obrona",
lang_52:"Świat gry",
lang_53:"Nazwa gracza",
lang_54:"Klasa postaci",
lang_55:"Bitwa - atak",
lang_56:"Bitwa -  obrona",
lang_57:"Atak",
lang_58:"Obrona",
lang_59:"Atak",
lang_60:"Obrona",
lang_61:"Punkty życia",
lang_62:"Ustawienia alarmu ",
lang_63:"Oblicz  najwyższy oraz najniższy poziom pojedynków jaki jesteś w stanie zaatakować",
lang_64:"Oblicz sumę doświadczenia zdobytego w pojedynku",
lang_65:"Twój poziom pojedynków",
lang_66:"Twój poziom pojedynków",
lang_67:"Oblicz",
lang_68:"Najwyższy możliwy poziom pojedynków ",
lang_69:"Najniższy możliwy poziom pojedynków",
lang_70:"Poziom pojedynków twojego przeciwnika",
lang_71:"Motywacja pojedynkowa",
lang_72:"Jak napisać datę? Przykład:",
lang_73:"Język",
lang_74:"Importuj umiejętności",
lang_75:"Punkty zycia",
lang_76:"Create a languague pack",
lang_77:"Jest nowa wersja dla The-West Calc, naciśnij ok żeby zaktualizować",
lang_78:"TW-Calc potrzebna aktualizacja",
lang_79:"Aktualna wersja",
lang_80:"Później",
lang_81:"Twoja notatka",
lang_82:"Czas",
lang_83:"TW-Calc Alarm ",
lang_84:"Twój język",
lang_85:"http://tw-calc.net/images/ico/flags/en.png",
lang_86:"Jeśli wygrasz pojedynek, zyskasz",
lang_87:"doswiadczenia oraz",
lang_88:"Zapisano pomyślnie",
lang_89:"Twoja notatka została pomyślnie usunięta",
lang_90:"Budzik nie ustawiony (zła składnia)",
lang_91:"Alarm clock set",
lang_92:"Wyjdź",
lang_93:"TW-Calc alarm - ustawienia",
lang_94:"Alarm",
lang_95:"Wpisz adres URL dźwieku. Przykład: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Alarm clock set",
lang_97:"Dźwięk alarmu : Alarm1, Alarm2",
lang_98:"Punkty życia",
lang_99:"Energia",
lang_100:"Cała energia dla",
lang_101:"Godziny i",
lang_102:"minuty",
lang_103:"Punkty doświadczenia",
lang_104:"Całe HP dla:",
lang_105:"Opłata",
lang_106:"Opłata",
lang_107:"Przekaż sumę",
lang_108:"Dodaj automatycznie kalkulator opłat bankowych (przekazu) do banku",
lang_109:"Dodaj liczniki uzupełnienia energii oraz HP",
lang_110:"Doświadczenie pojedynkowe",
lang_111:"New version",
lang_112:"Whats new",
lang_113:"Edit",
lang_114:"Duelling level",
lang_115:"Duleable",
lang_116:"Distance",
lang_117:"Center map",
lang_118:"Town",
lang_119:"Win duel",
lang_120:"Job",
lang_121:"Nothing",
lang_122:"Note",
lang_123:"Really?",
lang_124:"Actually empthy",
lang_125:"To accept this quest you must finish the quest",
lang_126:"To accept this quest you dont have to finish the quest",
lang_127:"Date:",
lang_128:"Day:",
lang_129:"Kill:",
lang_130:"Back to list of quests",
lang_131:"Really?",
lang_132:"Option",
lang_133:"Add quest extension",
"quest":{
lang_1:"Level",
lang_2:"Quests",
lang_3:"Character classes",
lang_4:"All",
lang_5:"Quests",
lang_6:"Special quests",
vojak:"Soldier",
pracovnik:"Worker",
duelant:"Dueller",
dobrodruh:"Adventurer",
lang_7:"Free skills",
lang_8:"Access",
lang_9:"Finish",
lang_10:"Reward",
lang_11:"Have equiped",
lang_12:"Other requirements",
lang_13:"Job",
},
},
},
checkLang: function(){TW_Calc.getLang = function(){return TW_Calc.langs.hasOwnProperty(TW_Calc.getLocale()) ? Game.locale : "en_US";};TW_Calc.getLocale = function(){return Game.locale;};var lang=TW_Calc.getLang();TW_Calc.lang=TW_Calc.langs[lang];},
launch: function(){TW_Calc.checkLang(); open_TWCalc_Window();
try{TW_Calc.launch_card();} catch(e){alert(e.message);};
try{TW_Calc.TWBattleCalc.launch();} catch(e){alert(e.message);};
try{TW_Calc.TWBattleCalc.vypocet();} catch(e){alert(e.message);};
try{TW_Calc.TWCalcMyinfo.launch();} catch(e){};
try{TW_Calc.TWDuelCalc.launch();} catch(e){alert(e.message);};
try{TW_Calc.TWDuelCalc.vypocet();} catch(e){alert(e.message);};
try{TW_Calc.TWDuelCalc.vypocet2();} catch(e){alert(e.message);};
try{TW_Calc.Settings.launch();} catch(e){alert(e.message);};
try{TW_Calc.duel_list.launch();} catch(e){alert(e.message)};
try{TW_Calc.duel_list.f.css();} catch(e){alert(e.message);};
$("#TWcalc_window_tab6_bt").click(function(){TW_Calc.duel_list.f.css()});},
launch_card: function(){var notepad_text=localStorage.getItem("TWCalc_notepad");document.getElementById("TW_Calc_Block").innerHTML=notepad_text;},
budik: function(){
var title=TW_Calc.lang.lang_83; var mytime=localStorage.getItem("TWCalc_budik"); var poznamka=localStorage.getItem("TWCalc_alarm"); var hudba=localStorage.getItem("TWCalc_budik_sound"); 
datum = new Date();	mo = datum.getMonth() + 1; d = datum.getDate(); h = datum.getHours(); m = datum.getMinutes(); 
if (m < 10) m = "0" + m; if (h < 10) h = "0" + h; if (mo < 10) mo = "0" + mo; if (d < 10) d = "0" + d;
var actualtime =d+"."+mo+". "+h+":"+m;
var msg = '<div><embed src="'+hudba+'" autostart="true" width="0" height="0"><span>'+TW_Calc.lang.lang_82+'</span>:<span>'+actualtime+'</span><br /><span>'+TW_Calc.lang.lang_81+'</span><br /><span>'+poznamka+'</span></div>';
var ok = function(){}
if(mytime==actualtime){new tw2gui.dialog(title,msg,tw2gui.dialog.SYS_WARNING).addButton('ok', ok).show(); localStorage.setItem("TWCalc_budik", "");}
},
exp_hp_enrgy: function(){var rozdiel= Character.getExperience4Level() - Character.getMaxExperience4Level();
var rozdiel1='('+rozdiel+')'
switch(Character.getMaxExperience4Level()){case '<img src="http://www.the-west.sk/images/xp_inf_000.png" />': var rozdiel1 = ''; break;};  
$('#ui_experience_bar').addMousePopup(' '+TW_Calc.lang.lang_103+':'+' '+Character.getExperience4Level()+' / '+Character.getMaxExperience4Level()+' '+rozdiel1+' ');
var regen_hp = Character.healthRegen * Character.maxHealth;var hp_max = Character.maxHealth;var actual_hp = Character.health;var hp_left = hp_max - actual_hp;var hp_time = hp_left / regen_hp;var hp_hour = Math.floor(hp_time);var hp_minute = Math.floor((hp_time - hp_hour) * 60);
var rozdiel_zdravia = Character.health-Character.maxHealth;
$('#ui_character_container > .health_bar').text(Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+')').attr('title',s(' '+TW_Calc.lang.lang_98+': '+Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+'), '+TW_Calc.lang.lang_104+' '+hp_hour+' '+TW_Calc.lang.lang_101+' '+hp_minute+' '+TW_Calc.lang.lang_102));
var regen_energy=0.03; if(regen_energy===Character.energyRegen){regen_energy=3;}; if(regen_energy<Character.energyRegen){regen_energy=Math.floor(Character.energyRegen*100);};
var energy = Character.energy; var energy_max = Character.maxEnergy; var energy_left = energy_max - energy; var c = Character.energyRegen * 100; var time = energy_left / regen_energy; var hour = Math.floor(time); var minute = Math.floor((time - hour) * 60); 
var rozdiel_energie = Character.energy-Character.maxEnergy;
$('#ui_character_container > .energy_bar').text(Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+')').attr('title',s('Energia: '+Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+'), '+TW_Calc.lang.lang_100+': '+hour+' '+TW_Calc.lang.lang_101+' '+minute+' '+TW_Calc.lang.lang_102));},
addCalcFees: function(){
var bank_fee= amount.value /100 * BankWindow.Transfer.fee; var transfered_amout =  amount.value - bank_fee;
var str1=bank_fee.toString();var n1=  str1.lastIndexOf(".");var k1 = str1.substring(n1+1);
if(k1.length=0){var ltest="00000"+k1;};if(k1.length=1){var ltest="0000"+k1;};if(k1.length=2){var ltest="000"+k1;};if(k1.length=3){var ltest="00"+k1;};if(k1.length=4){var ltest="0"+k1;};if(k1.length=5){var ltest=k1;};
var str2=transfered_amout.toString();var n2=str2.lastIndexOf(".");var k2 =str2.substring(n2+1);
if(k2.length=0){var ltest2="00000"+k2;};if(k2.length=1){var ltest2="0000"+k2;};if(k2.length=2){var ltest2="000"+k2;};if(k2.length=3){var ltest2="00"+k2;};if(k2.length=4){var ltest2="0"+k2;};if(k2.length=5){var ltest2=k2;};
if(ltest2<ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.round(transfered_amout)};if(ltest2>ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.round(transfered_amout)};if(ltest2==ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.floor(transfered_amout)};
$('div.bank-transfer-info div.tw2gui_groupframe_content_pane',BankWindow.DOM).empty().append(s(TW_Calc.lang.lang_105+': '+BankWindow.Transfer.fee+'% <span style="font-size: 9px">('+TW_Calc.lang.lang_106+': -$ '+bank_fee+', '+TW_Calc.lang.lang_107+': $ '+transfered_amout+')</span>'));},
addCalcFee: function(){try{TW_Calc.addCalcFees()}catch(e){}},
info:{
open_forum:"'http://forum.the-west.sk/member.php?u=6556'",
open_twcalc:"'http://tw-calc.net/'",
name:"The-West Calc",
actualtime: function(){datum = new Date(); mo = datum.getMonth() + 1; d = datum.getDate(); h = datum.getHours(); m = datum.getMinutes(); if (m < 10) m = "0" + m; if (h < 10) h = "0" + h; if (mo < 10) mo = "0" + mo; if (d < 10) d = "0" + d; var actualtime =d+"."+mo+". "+h+":"+m; return actualtime;},},
tabs:{
tab:{
Tab1_name:"Notepad",
Tab2_name:"Battle Calc",
Tab3_name:"My Battle stats",
Tab4_name:"Duel calc",
Tab5_name:"Import",
Tab6_name:"Duel list",
Tab7_name:"Settings",},
},
main: {zaskrtni: function(id_prvku){if(document.getElementById(id_prvku).className == "tw2gui_checkbox"){document.getElementById(id_prvku).className = "tw2gui_checkbox tw2gui_checkbox_checked"; } else {document.getElementById(id_prvku).className = "tw2gui_checkbox";}},
zaskrtni_radio: function(id_prvku, id_prvku2, id_prvku3, id_prvku4){
if(document.getElementById(id_prvku).className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){document.getElementById(id_prvku).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked"; }
document.getElementById(id_prvku2).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
document.getElementById(id_prvku3).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
document.getElementById(id_prvku4).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";},
twcalc_reload: function(){open_TWCalc_Window(); try{TW_Calc.launch_card();} catch(e){alert(e.message);}; try{TW_Calc.TWBattleCalc.launch();} catch(e){alert(e.message);}; try{TW_Calc.TWBattleCalc.vypocet();} catch(e){alert(e.message);}; try{TW_Calc.TWCalcMyinfo.launch();} catch(e){alert(e.message);}; try{TW_Calc.TWDuelCalc.launch();} catch(e){alert(e.message);}; try{TW_Calc.TWDuelCalc.vypocet();} catch(e){alert(e.message);}; try{TW_Calc.TW_Calc.TWDuelCalc.vypocet2();} catch(e){alert(e.message);}},
settingsCalc: function(){
if(document.getElementById("TWcalc_checkobox").className == "tw2gui_checkbox"){var pole1="0";}else{var pole1="1";}
if(document.getElementById("TWcalc_checkbox_calcFees").className == "tw2gui_checkbox"){var pole2="0";}else{var pole2="1";}
if(document.getElementById("TWcalc_checkbox_calcHPenergyXP").className == "tw2gui_checkbox"){var pole3="0";}else{var pole3="1";}
if(document.getElementById("TWcalc_checkbox_quest").className == "tw2gui_checkbox"){var pole4="0";}else{var pole4="1";}
pole_nastaveni = pole1+pole2+pole3+pole4;
localStorage.setItem("TWCalc_settings", pole_nastaveni);
MessageSuccess(TW_Calc.lang.lang_88).show();},},
TWBattleCalc: {
launch: function(){
var html='<div style="position:absolute;width:200px;height:200px;top:10px;"><span style="font-weight:bold;font-size:large;">'+TW_Calc.lang.lang_4+'</span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_7+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t3 || 0)+'" id="t3"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_29+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t11 || 0)+'" id="t11"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_8+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t4 || 0)+'" id="t4"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_6+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t2 || 0)+'" id="t2"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_9+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t5 || 0)+'" id="t5"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_5+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t1 || 0)+'" id="t1"></span></span></span></div>'
+'<div style="position:absolute;width:320px;height:150px;top:220px;left:0px;"><span style="font-weight:bold;font-size:large;color:black;width:190px;">'+TW_Calc.lang.lang_34+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_gg" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_gg+\)"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_10+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_shawl" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_shawl\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_11+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_knife" style="padding-right:5px" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_knife\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_12+'</span></br><span style="display:inline-block;font-weight:bold;width:170px;">'+TW_Calc.lang.lang_18+'</span><div id="tw_calc_combox" style="display:inline-block"></div></br><div style="padding-right:5px" class="tw2gui_checkbox" id="TWcalc_checkobox_tower" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_tower\')"></div><span style="font-weight:bold;display:inline-block;font-weight: width:230px;">'+TW_Calc.lang.lang_20+'</span></div>'
+'<div style="position:absolute;width:400px;height:100px;top:10px;left:330px;"><span style="font-weight:bold; font-size:large;width:190px;">'+TW_Calc.lang.lang_32+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_30+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t12 || 1)+'" id="t12"></span></span></span></br><img src="/images/class_choose/class_soldier.png""><span style="font-weight:bold;">'+TW_Calc.lang.lang_13+'</span></br><img src="/images/class_choose/class_worker.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_19+'</span></br></div></div>'
+'<div style="position:absolute;width:200px;height:20px;top:80px;left:450px;"><div id="radio_worker1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker1\', \'radio_worker2\', \'radio_worker3\')" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_worker2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker2\', \'radio_worker1\', \'radio_worker3\')" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_worker3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker3\', \'radio_worker1\', \'radio_worker2\')" title="'+TW_Calc.lang.lang_2+'"></div></div>' 
+'<div style="position:absolute;width:200px;height:20px;top:60px;left:450px;"><div id="radio_soldier1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier1\', \'radio_soldier2\', \'radio_soldier3\')" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_soldier2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier2\', \'radio_soldier1\', \'radio_soldier3\')" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_soldier3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier3\', \'radio_soldier1\', \'radio_soldier2\')" title="'+TW_Calc.lang.lang_2+'"></div></div>' 
+'<div style="position:absolute;top:110px;left:330px;" class="tw2gui_button" onclick="TW_Calc.TWBattleCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button" class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_27+'</div></div>'
+'<div style="position:absolute;width:270px;height:200px;top:150px;left:330px;"><span style="font-weight:bold; font-size:large;color:red;width:100px;">'+TW_Calc.lang.lang_31+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_58+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><img src="/images/fort/battle/attacker_primary.png"></span></span><span id="t6">0</span></br><span id="TWCalc_Lang_FAD" style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display:inline-block;font-weight:bold; width:20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t7">0</span></br><span style="font-weight:bold;font-size:large;color:blue;width:100px;">'+TW_Calc.lang.lang_33+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><img src="/images/fort/battle/attacker_primary.png"></span><span id="t8">0</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_15+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t9">0</span></br><span style="display:inline-block;font-weight:bold;font-size:large;width:150px;">'+TW_Calc.lang.lang_28+'</span></br><span id="t10">0</span></div>';
$("#battle_calc").html(html);
var combox=new tw2gui.combobox('TWCalc_Place').setWidth(100).addItem(1,TW_Calc.lang.lang_21).addItem(2,TW_Calc.lang.lang_22).addItem(3,TW_Calc.lang.lang_23).addItem(4,TW_Calc.lang.lang_24).addItem(5,TW_Calc.lang.lang_25).addItem(6,TW_Calc.lang.lang_26).select(1).getMainDiv();$("#tw_calc_combox").append(combox);jQuery('#t1').change(function(){ TW_Calc.functions.cookie.data.t1 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t2').change(function(){ TW_Calc.functions.cookie.data.t2 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t3').change(function(){ TW_Calc.functions.cookie.data.t3 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t4').change(function(){ TW_Calc.functions.cookie.data.t4 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t5').change(function(){ TW_Calc.functions.cookie.data.t5 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t11').change(function(){ TW_Calc.functions.cookie.data.t11 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t12').change(function(){ TW_Calc.functions.cookie.data.t12 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); })},
vypocet: function(){
var BHP = 10;
if(document.getElementById("radio_soldier1").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BHP=10};
if(document.getElementById("radio_soldier2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BHP=15};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BHP=20};
var HPskills = t11.value; var HP = 90 + (HPskills*BHP) + (t12.value * 10);
var a = t1.value;var c = Math.pow(t1.value, 0.4);var f = Math.pow(t2.value, 0.4);var i = Math.pow(t3.value, 0.4);var l = Math.pow(t4.value, 0.4);var o = Math.pow(t5.value, 0.4);var GG = 0;
var PlaceDef = 0; var PlaceOf = 0;
switch(Number(document.getElementById("TWCalc_Place_value").value)){case 1: PlaceOf=0; PlaceDef=0;break;case 2: PlaceOf=15; PlaceDef=11;break;case 3: PlaceOf=21; PlaceDef=15;break;case 4: PlaceOf=24; PlaceDef=18;break;case 5: PlaceOf=27; PlaceDef=20;break;case 6: PlaceOf=28; PlaceDef=21;break;};
var VBBB=100;var CharBonus=0;
if(document.getElementById("TWcalc_checkobox_tower").className == "tw2gui_checkbox")CharBonus=0; else CharBonus=PlaceDef+0;
var BuilderBonus = 0; var BuilderBonus1 = 0;
if(document.getElementById("radio_worker1").className=="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BuilderBonus=PlaceDef/100*0};
if(document.getElementById("radio_worker2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{uilderBonus=PlaceDef/100*30};
if(document.getElementById("radio_worker3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BuilderBonus=PlaceDef/100*60};
if(document.getElementById("radio_worker1").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BuilderBonus1=PlaceOf/100*0};
if(document.getElementById("radio_worker2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BuilderBonus1=PlaceOf/100*30};
if(document.getElementById("radio_worker3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{BuilderBonus1=PlaceOf/100*60};  
var VBBB = 100;
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{VBBB=100};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{VBBB=125};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){}else{VBBB=150};
var VBB = a/100*VBBB; var VB = Math.pow(VBB, 0.4) - Math.pow(a, 0.4) 
if(document.getElementById("TWcalc_checkobox_gg").className == "tw2gui_checkbox") GG=0; else GG = 5;
if(document.getElementById("TWcalc_checkobox_shawl").className == "tw2gui_checkbox") S=0; else S = 5;
if(document.getElementById("TWcalc_checkobox_knife").className == "tw2gui_checkbox") SHK=0; else SHK = 2;
var usz = 25 + c + o + i + GG + SHK + VB + PlaceOf + CharBonus + BuilderBonus1;
var usu = 10 + c + l + i + GG + S + SHK + VB + PlaceDef + CharBonus + BuilderBonus;
var osz = 25 + c + o + f + GG + SHK + VB + PlaceOf + CharBonus + BuilderBonus1;
var osu = 10 + c + l + f + GG + S + SHK + VB + PlaceDef + CharBonus + BuilderBonus;
document.getElementById("t10").innerHTML=" "+HP+" HP";
document.getElementById("t6").innerHTML=" "+usz+" ";
document.getElementById("t7").innerHTML=" "+usu+" ";
document.getElementById("t8").innerHTML=" "+osz+" ";
document.getElementById("t9").innerHTML=" "+osu+" ";},},
functions:{
edit_note: function(){
var zrus=function(){};var ok = function(){var poznamka=document.getElementById("tw_calc_note").value;localStorage.setItem("TWCalc_alarm", poznamka);MessageSuccess(TW_Calc.lang.lang_96).show();};if(new Boolean(localStorage.getItem("TWCalc_alarm"))!=false){var p=localStorage.getItem("TWCalc_alarm");}else{var p ="";}
new tw2gui.dialog(TW_Calc.lang.lang_93,'<span class="tw2gui_textarea" style="display:inline-block; "><div class="tw2gui_bg"></div><div class="tw2gui_bg_tl"></div><div class="tw2gui_bg_br"></div><div class="tw2gui_bg_tr"></div><div class="tw2gui_bg_bl"></div><div class="tw2gui_textarea_wrapper"><textarea id="tw_calc_note" style="width:380px;height:100px;">'+p+'</textarea></div></span>').addButton('ok', ok).addButton(TW_Calc.lang.lang_92, zrus).show();},
budik: function(){
var all_text = document.getElementById("Wt3").value; localStorage.setItem("TWCalc_budik", all_text); all_text.toString()
var tw_calc_test_1 = "";var tw_calc_test_2 = "";var tw_calc_test_3 = "";var tw_calc_test_4 = "";var tw_calc_test_5 = "";var tw_calc_test_6 = "";var tw_calc_test_7 = "";var tw_calc_test_8 = "";var tw_calc_test_a = all_text.charAt(2);
if(tw_calc_test_a !="."){tw_calc_test_1 = 0;}else{tw_calc_test_1 = 1;};
var tw_calc_test_b = all_text.charAt(5);
if(tw_calc_test_b !="."){tw_calc_test_2 = 0;}else{tw_calc_test_2 = 1;};
var tw_calc_test_c = all_text.charAt(9); 
if(tw_calc_test_c !=":"){tw_calc_test_3 = 0;}else{tw_calc_test_3 = 1;};
var tw_calc_test_d = all_text.charAt(6);
if(tw_calc_test_d !=" "){tw_calc_test_4 = 0;}else{tw_calc_test_4 = 1;};
var aa = all_text.charAt(0); var ab = all_text.charAt(1); var ac = aa+""+ab;
if(ac<32){tw_calc_test_5 = 1;} else {tw_calc_test_5 = 0;};
var ba = all_text.charAt(3); var bb = all_text.charAt(4); var bc = ba+""+bb;
if(bc<13){tw_calc_test_6 = 1;} else {tw_calc_test_6 = 0;};
var ca = all_text.charAt(7); var cb = all_text.charAt(8); var cc = ca+""+cb;
if(cc<24){tw_calc_test_7 = 1;} else {tw_calc_test_7 = 0;};
var da = all_text.charAt(10); var db = all_text.charAt(11); var dc = da+""+db; 
if(dc<60){tw_calc_test_8 = 1;} else {tw_calc_test_8 = 0;};
if(tw_calc_test_1 + tw_calc_test_2 + tw_calc_test_3 + tw_calc_test_4 + tw_calc_test_5 + tw_calc_test_6 + tw_calc_test_7 + tw_calc_test_8==8){MessageSuccess(TW_Calc.lang.lang_91).show();} else {MessageError(TW_Calc.lang.lang_90).show();} }, 
save_notepad_text: function(){var all_text = document.getElementById("TW_Calc_Block").value; localStorage.setItem("TWCalc_notepad", all_text); MessageSuccess(TW_Calc.lang.lang_88).show();},
confirm_deleting: function(){var ok = function(){TW_Calc.functions.delete_notepad_text()};new tw2gui.dialog(TW_Calc.lang.lang_131,TW_Calc.lang.lang_123).addButton('ok', ok).addButton('cancel').show();},											 
delete_notepad_text: function(){localStorage.setItem("TWCalc_notepad", "");document.getElementById("TW_Calc_Block").value = ""; MessageSuccess(TW_Calc.lang.lang_89).show();},							 
settings: function(){
var budik1 =localStorage.getItem("TWCalc_budik_sound");
if(budik1 == "http://www.tw-calc.net/script/budik.mp3"){budik1="Alarm1";}
if(budik1 == "http://www.tw-calc.net/script/budik2.mp3"){budik1="Alarm2";}    				
var ok = function(){
var all_text1 = document.getElementById("tw_calc_budik").value; 
localStorage.setItem("TWCalc_budik_sound", all_text1);
if(all_text1 =="Alarm1"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik.mp3");}
if(all_text1 =="Alarm2"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik2.mp3");}
MessageSuccess(TW_Calc.lang.lang_96).show();}
var zrus = function(){}
var msg = '<div><span>'+TW_Calc.lang.lang_94+'<span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" id="tw_calc_budik" size="20" value="'+budik1+'"></span></span></span></br><span>'+TW_Calc.lang.lang_95+'</span></div></br><span>'+TW_Calc.lang.lang_97+'</span>';
new tw2gui.dialog(TW_Calc.lang.lang_93,msg).addButton('ok', ok).addButton(TW_Calc.lang.lang_92, zrus).show();},
cookie:{data: {}, 
save: function(){var date = new Date(); date.setFullYear(date.getFullYear()+1); document.cookie = 'TWCalc='+encodeURIComponent(JSON.stringify(this.data))+'; expires='+date.toUTCString();},
load: function(){this.data = JSON.parse(decodeURIComponent(((document.cookie+';').match(/TWCalc=([^;]*);/) || {})[1] || "%7B%7D"));},},
isWearing: function(id){var t = Wear.get(ItemManager.get(id).type);return (t && t.obj && t.obj.item_id == id);},}, 
TWCalcMyinfo:{launch: function(){TW_Calc.functions.cookie.load();
var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus();
var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus();
var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus();
var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();
var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus();
var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
document.getElementById("twcalc_vytrvalost_value").innerHTML=" "+vytrvalost+" "; document.getElementById("twcalc_uhybanie_value").innerHTML=" "+uhybanie+" "; document.getElementById("twcalc_skryvanie_value").innerHTML=" "+skryvanie+" "; document.getElementById("twcalc_presnost_value").innerHTML=" "+presnost+" "; document.getElementById("twcalc_vodcovstvo_value").innerHTML=" "+vodcovstvo+" "; document.getElementById("twcalc_zdravie_value").innerHTML=" "+zdravie+" ";
var vod = Math.pow(vodcovstvo, 0.4); var vyt = Math.pow(vytrvalost, 0.4); var skr = Math.pow(skryvanie, 0.4); var uhy = Math.pow(uhybanie, 0.4); var pre = Math.pow(presnost, 0.4);
var HP = Character.maxHealth; var VBB = 0; var VB = 0; var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.4) - Math.pow(vodcovstvo, 0.4);
if(TW_Calc.functions.isWearing(136)){var Golden_gun = 5;} else {var Golden_gun = 0;}; if(TW_Calc.functions.isWearing(576)){var MR_Shawl = 5;} else {var MR_Shawl = 0;}; if(TW_Calc.functions.isWearing(59)){var SHKnife = 2;} else {var SHKnife = 0;};
var Ausz = 25 + vod + vyt + pre + VB + Golden_gun + SHKnife; var Ausu = 10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl; var Aosz = 25 + vod + skr + pre + VB + Golden_gun + SHKnife; var Aosu = 10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
document.getElementById("tw_t6").innerHTML=" "+Ausz+" "; document.getElementById("tw_t7").innerHTML=" "+Ausu+" "; document.getElementById("tw_t8").innerHTML=" "+Aosz+" "; document.getElementById("TW_t9").innerHTML=" "+Aosu+" "; document.getElementById("TW_t10").innerHTML=" "+HP+" "; document.getElementById("TWCalc_name").innerHTML=" "+Character.name+" ( id= "+Character.playerId+" )";
function my_charClass(){switch(Character.charClass){case "greenhorn": var char_class = TW_Calc.lang.lang_38; break; case "soldier": var char_class = TW_Calc.lang.lang_41; break; case "duelist": var char_class = TW_Calc.lang.lang_39; break; case "worker":  var char_class = TW_Calc.lang.lang_42; break; case "adventurer": var char_class = TW_Calc.lang.lang_40; break;};return char_class;};
document.getElementById("TWCalc_charclass").textContent = my_charClass();
document.getElementById("TWCalc_charclass").innerHTML=" "+my_charClass()+" ";
document.getElementById("TWCalc_level").innerHTML=" "+Character.level+" ";
document.getElementById("TWCalc_server_info").innerHTML=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
var worldinfo = window.location.host.split('.',1)[0];
TWCalc_battle_bbcode.value = "[QUOTE][LIST][*][B]"+TW_Calc.lang.lang_43+":[/B] "+Character.name+"[*][B]"+TW_Calc.lang.lang_44+":[/B] "+worldinfo+" "+Game.worldName+",   ("+window.location.host+")[*][B]"+TW_Calc.lang.lang_45+":[/B] "+Character.level+"[*][B]"+TW_Calc.lang.lang_46+":[/B] "+Character.charClass+"[*]••••••••••••••••[*][B]"+TW_Calc.lang.lang_47+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Ausz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Ausu+"[*][B]"+TW_Calc.lang.lang_48+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Aosz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Aosu+"[*][B]"+TW_Calc.lang.lang_49+":[/B]"+HP+"[/LIST][/QUOTE]";
},},
Settings:{
launch: function(){
if(new Boolean(localStorage.getItem("TWCalc_settings"))!=false){
var n = localStorage.getItem("TWCalc_settings"); n.toString();
if(n.charAt(0)!=0){document.getElementById("TWcalc_checkobox").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
if(n.charAt(1)!=0){document.getElementById("TWcalc_checkbox_calcFees").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
if(n.charAt(2)!=0){document.getElementById("TWcalc_checkbox_calcHPenergyXP").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
if((n.charAt(3)!=0)||(n.charAt(3)=="")){document.getElementById("TWcalc_checkbox_quest").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
}
},},
TWDuelCalc:{
launch: function(){TW_Calc.functions.cookie.load(); 
jQuery('#twcalc_duel_level').change(function(){TW_Calc.functions.cookie.data.level = jQuery(this).val() * 1; TW_Calc.functions.cookie.save();});				  
jQuery('#twcalc_duel_level1').change(function(){TW_Calc.functions.cookie.data.level1 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save();});
jQuery('#twcalc_duel_level2').change(function(){TW_Calc.functions.cookie.data.level2 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save();});
jQuery('#twcalc_duel_motivation').change(function(){TW_Calc.functions.cookie.data.motivation = jQuery(this).val() * 1; TW_Calc.functions.cookie.save();});}, 
vypocet: function(){var levelval = twcalc_duel_level.value; var maxduel = (7*levelval-1)/5; var minduel = (5*levelval-1)/7; var maxduel2 = Math.round(maxduel); var minduel2 = Math.round(minduel); if (minduel2 < 1){var minduel1 = 1;} else {var minduel1 = minduel2}; document.getElementById("TWCalc_maxduellevel").innerHTML=" "+maxduel2+" "; document.getElementById("TWCalc_minduellevel").innerHTML=" "+minduel1+" ";},
vypocet2: function(){var level1 = twcalc_duel_level1.value; var level2 = twcalc_duel_level2.value; var motivation = twcalc_duel_motivation.value;var exp3 = (( 7 * level2 ) - ( 5 * level1 ) + 5) *( motivation / 100 );var exp = (( 7 * level2 ) - ( 5 * level1 ) + 5) * 3 *( motivation / 100 ); var exp1 = Math.round(exp); var exp2 = Math.round(exp3); document.getElementById("TWCalc_exp").innerHTML=" "+TW_Calc.lang.lang_86+" "+exp1+" "+TW_Calc.lang.lang_87+" "+exp2+" "+TW_Calc.lang.lang_110+" ";},
},
import_inf: function(){
var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus(); var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus(); var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus(); var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();	var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus(); var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
var vod = Math.pow(vodcovstvo, 0.4); var vyt = Math.pow(vytrvalost, 0.4); var skr = Math.pow(skryvanie, 0.4); var uhy = Math.pow(uhybanie, 0.4); var pre = Math.pow(presnost, 0.4); var HP = Character.maxHealth; var VBB = 0; var VB = 0; var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.4) - Math.pow(vodcovstvo, 0.4);
if(TW_Calc.functions.isWearing(136)){var Golden_gun = 5;} else {var Golden_gun = 0;}; if(TW_Calc.functions.isWearing(576)){var MR_Shawl = 5;} else {var MR_Shawl = 0;}; if(TW_Calc.functions.isWearing(59)){var SHKnife = 2;} else {var SHKnife = 0;}; 
var Ausz = 25 + vod + vyt + pre + VB + Golden_gun + SHKnife; var Ausu = 10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl; var Aosz = 25 + vod + skr + pre + VB + Golden_gun + SHKnife;var Aosu = 10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
var serverinfo=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
var tw_id =window.location.host.split('.',1)[0]+"-"+Character.playerId;
if(document.getElementById("TWcalc_checkobox").className == "tw2gui_checkbox"){var zobraz = 0;}else{var zobraz = 1;}
var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus(); var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus(); var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus(); var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();	var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus(); var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
if(TW_Calc.functions.isWearing(136)){var Golden_gun ="true";} else {var Golden_gun ="false";}; if(TW_Calc.functions.isWearing(576)){var MR_Shawl ="true";} else {var MR_Shawl ="false";}; if(TW_Calc.functions.isWearing(59)){var SHKnife ="true";} else {var SHKnife ="false";};
var code1=window.location.host.split('.',1)[0];var code2=Character.playerId;var rand_code=code1+"0"+code2;
var HPM = "0"+Character.maxHealth;var health_pre_tabulku1 = HPM.length;if(health_pre_tabulku1==3){var health_pre_tabulku="0000"+Character.maxHealth};if(health_pre_tabulku1==4){var health_pre_tabulku="000"+Character.maxHealth};if(health_pre_tabulku1==5){var health_pre_tabulku="00"+Character.maxHealth};if(health_pre_tabulku1==6){var health_pre_tabulku="0"+Character.maxHealth};if(health_pre_tabulku1==7){var health_pre_tabulku=Character.maxHealth};var player123 = Character.name;
var webpage='http://tw-calc.net/'; page=window.open(webpage+'import.php'); page.document.write('<head><meta charset="utf-8"></head><body style="background-image:url('+webpage+'/pozadie1.jpg);"><table style="width:99%;height:99%;text-align:center;font-size:28px;color:white;"><center><h1><strong><font color="white"><b>importujem...</b></font></strong></center></h1></td></tr></table><form style="display:none;" name="data_post" action="'+webpage+'import.php" method="post"><input name="nick" value="'+Character.name+'"><input name="level" value="'+Character.level+'"><input name="charclass" value="'+Character.charClass+'"><input name="gameworld" value="'+serverinfo+'"><input name="attack1" value="'+Ausz+'"><input name="defense1" value="'+Ausu+'"><input name="attack2" value="'+Aosz+'"><input name="defense2" value="'+Aosu+'"><input name="health" value="'+HP+'"><input name="tw_id" value="'+tw_id+'"><input name="vytrvalost" value="'+vytrvalost+'"><input name="uhybanie" value="'+uhybanie+'"><input name="skryvanie" value="'+skryvanie+'"><input name="presnost" value="'+presnost+'"><input name="vodcovstvo" value="'+vodcovstvo+'">'
+'<input name="craft" value="'+Character.professionId+'">'
+'<input name="craft_points" value="'+Character.professionSkill+'"><input name="health_pre_tabulku" value="'+zobraz+'"><input name="zdravie" value="'+zdravie+'"><input name="goldengun" value="'+Golden_gun+'"><input name="mrshawl" value="'+MR_Shawl+'"><input name="shknife" value="'+SHKnife+'"><input name="xp" value="'+Character.experience+'"></form><script>setTimeout("document.forms.data_post.submit()", 1000);</script></body>');
$("#TWcalc_window_tab5").append('<table style="width:100%;height:350px;vertical-align:middle"><tbody><tr style="text-align:center;vertical-align:middle;font-weight:bold;font-size:20px"><td style="text-align:center;vertical-align:middle;font-weight:bold;font-size:20px">Import úspešný!</td></tr></tbody></table>');
},
duel_list:{
launch: function(){
var maindiv = document.getElementById("duel_list"); var table = new tw2gui.table(); table.setId('duel_list').createEmptyMessage('Duelový list je zatiaľ prázdny').appendTo(maindiv);
table.addColumn("player_name").addColumn("player_level").addColumn("duel_level").addColumn("town").addColumn("duelable").addColumn("distance").addColumn("xp").addColumn("duel");
var footer = '<div class="tw2gui_button" onclick="TW_Calc.duel_list.f.edit();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_113+'</div></div>';
table.appendToCell('head','player_name', TW_Calc.lang.lang_43).appendToCell('head','player_level','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_30+'">').appendToCell('head','duel_level','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_114+'">').appendToCell('head','town',TW_Calc.lang.lang_118).appendToCell('head','duelable',TW_Calc.lang.lang_115).appendToCell('head','distance',TW_Calc.lang.lang_116).appendToCell('head','xp','XP'.escapeHTML()).appendToCell('head','duel','Duel'.escapeHTML());
table.appendToFooter('player_name', footer); var player = "";
if(new Boolean(localStorage.getItem("TWCalc_duellist"))!=false){var player = localStorage.getItem("TWCalc_duellist").split(",");} var i = 0;
while(new Boolean(player[i])!=false){
TW_Calc.duel_list.f.getPlayerAlliance(player[i],function(id, alliance, name, level, dlevel, town, tx, ty, x, y, isDuelable, postava){
if(isDuelable==true){var duelable = '<img src="http://tw-calc.net/images/ico/ine/true.png">';}else{var duelable = '<img src="http://tw-calc.net/images/ico/ine/false.png">';}
switch(postava){case 'greenhorn': var myinfo_obrazok ="/images/class_choose/class_greenhorn.png"; break;
case 'soldier': var myinfo_obrazok ="/images/class_choose/class_soldier.png"; break;
case 'duelist': var myinfo_obrazok ="/images/class_choose/class_duelist.png"; break;
case 'worker': var myinfo_obrazok ="/images/class_choose/class_worker.png"; break;
case 'adventurer': var myinfo_obrazok ="/images/class_choose/class_adventurer.png"; break;};
var distance = Character.calcWayTo(x,y); distance = distance.formatDuration();
var mylv = TW_Calc.duel_list.f.getPlayerAlliance(Character.name,function(id, alliance, name, level, dlevel, town, tx, ty, x, y, isDuelable, postava){TW_Calc.info.level = Number(dlevel)});
var xp = Math.round((( 7 * dlevel ) - ( 5 * TW_Calc.info.level ) + 5) * Character.duelMotivation * 3);
table.appendRow().appendToCell(-1,"player_name", '<img src="images/icons/center.png" title="'+TW_Calc.lang.lang_117+'" style="cursor: pointer" onclick="Map.center('+x+','+y+')"><img src="'+myinfo_obrazok+'" style=""><a href="javascript: PlayerProfileWindow.open('+id+');">'+name+'</a>').appendToCell(-1,"player_level", level).appendToCell(-1,"duel_level", dlevel).appendToCell(-1,"town", '<a href="javascript: TownWindow.open('+tx+','+ty+')">'+town+'</a>').appendToCell(-1,"duelable", duelable).appendToCell(-1,"distance", distance).appendToCell(-1,"xp", xp).appendToCell(-1,"duel", '<a href="javascript: TaskQueue.add(new TaskDuel('+id+'));">Duel</a>')
;})
var i = i + 1;
}
$("#TWcalc_window_tab6").append('<span style="display:inline-block; width:100%; font-weight: bold">'+TW_Calc.lang.lang_71+'</span>');
$("#TWcalc_window_tab6").append(new tw2gui.progressbar(Character.duelMotivation,1).showPercentOnly(true).getMainDiv());
},
f:{
getPlayerAlliance: function(name, callback){$.post('game.php?window=profile&mode=init',{name:encodeURIComponent(name)},function(r){callback.call(window, r.playerid, (r.town && r.town.alliance_id >= 0 ? r.town.alliance_id : -1), r.playername, r.level, r.duelLevel, r.town.name, r.town.town_x, r.town.town_y, r.x, r.y, r.isDuelable, r.classKey);},'json');},
css: function(){$(".cell.cell_0.player_name").css({"width":"190px"}); $(".cell.cell_1.player_level").css({"width":"30px"}); $(".cell.cell_2.duel_level").css({"width":"30px"}); $(".cell.cell_3.town").css({"width":"150px"}); $(".cell.cell_4.duelable").css({"width":"50px"}); $(".cell.cell_5.distance").css({"width":"80px"}); $(".cell.cell_6.xp").css({"width":"80px"}); $(".cell.cell_7.duel").css({"width":"40px"});},
obr: "data:image/png;base64,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",
edit: function(){
function zrus(){}; function save(){var i = 0; var save_text = "";
while(new Boolean(document.getElementById("list"+i))!=false){var value = document.getElementById("list"+i).value; save_text = save_text+''+value+','; i++}
localStorage.setItem("TWCalc_duellist",save_text);
MessageSuccess(TW_Calc.lang.lang_88).show();
TW_Calc.launch();
};
if(new Boolean(localStorage.getItem("TWCalc_duellist"))!=false){var zoznam = localStorage.getItem("TWCalc_duellist"); zoznam = zoznam.split(",");}else{var zoznam = ""; var err_msg = TW_Calc.lang.lang_124;} 
var i = 0; var msg = '<div id="list_players">';
while(new Boolean(zoznam[i])!=false){msg  = msg+'<span id="_list'+i+'" class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield"><span><input type="text" size="50" value="'+zoznam[i]+'" id="list'+i+'"></span></span></span>';
i++}; var r = i - 1;  
new tw2gui.dialog(TW_Calc.lang.lang_113,msg+'<a title="Delete" id="list_duels_delete" style="font-weight:bold; font-size: 25px" href="javascript: TW_Calc.duel_list.f.del('+r+')">-</a></br></div><a title="add" id="list_duels_click" style="font-weight:bold; font-size: 25px" href="javascript: TW_Calc.duel_list.f.add('+i+')">+</a>').addButton('Ulož', save).addButton("Späť", zrus).show();
},
add: function(i){var p = document.getElementById("list_players"); var c = document.getElementById("list_duels_delete"); p.removeChild(c);
var a = '<a title="Delete" id="list_duels_delete" style="font-weight:bold; font-size: 25px" href="javascript: TW_Calc.duel_list.f.del('+i+')">-</a></br>';
$("#list_players").append('<span id="_list'+i+'" class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield"><span><input type="text" size="50" value="" id="list'+i+'"></span></span></span>'+a); i = i + 1;
document.getElementById("list_duels_click").href = 'javascript: TW_Calc.duel_list.f.add('+i+')';},
del: function(i){var p = document.getElementById("list_players"); var c = document.getElementById("_list"+i); p.removeChild(c);
i = i - 1; document.getElementById("list_duels_delete").href = 'javascript: TW_Calc.duel_list.f.del('+i+')'; var r = i + 1;
document.getElementById("list_duels_click").href = 'javascript: TW_Calc.duel_list.f.add('+r+')';},
},
},
quest:{
window:{launch: function(){var id = "TW-CALC-QUEST"; var tab = TW_Calc.lang.quest.lang_5; var html='<div style="position: absolute; width: 510px; height: 100%; top: 0px; left: 10px;" id="quest_content">Quest plugin is not installed! Please install it to see all quest. <a href="http://userscripts.org/scripts/source/163590.user.js">DOWNLOAD<a></div>';
wman.open(id).setTitle(tab).setMiniTitle("TW-Calc "+tab).appendToContentPane(jQuery('<div id="'+id+'">'+html+"</div>"));
TW_Calc.quest.quests() 
}},
quests:function(d,id,r){
var access_data="";var finish_data="";var end_data="";var equip_data="";var others_data="";var job_data="";
switch(d){
case 2:$("#quest_navigation").remove();$("#quest_content").animate({width:'675px'}); 
TW_Calc.q="";var i=0;var data=Quest_TW_Calc.quests;
while(new Boolean(data.quests.series[id].quests[i])!=false){
var quest = data.quests.series[id].quests[i];access_data="";finish_data="";end_data="";equip_data="";var quest_text="";var dec="";var dec_display="";
if(new Boolean(quest.q)!=false){quest_text=TW_Calc.lang.lang_125+': id '+quest.q}
if(new Boolean(quest.noq)!=false){quest_text='&nbsp;'+TW_Calc.lang.lang_126+': id '+quest.noq}
if(new Boolean(quest.dec)!=false){dec=quest.dec;dec_display="inline-block";}else{dec_display="none";dec="";}
/*ACCESS DATA*/
if(new Boolean(quest.access.map)!=false){access_data=access_data+'<span class="quest_mmaplink" title="Center map" onclick="javascript:window[&quot;Map&quot;].center('+quest.access.map.x+','+quest.access.map.y+');void(0);"><img style="padding:2px" src="http://www.the-west.sk/images/icons/compass.png"></span><b>'+quest.access.map.name+'</b>';}
if(new Boolean(quest.access.none)!=false){access_data=access_data+'</br><b>'+quest.access.none.text+'</b></br>';}
if(new Boolean(quest.access.date)!=false){access_data=access_data+'</br><b>'+TW_Calc.lang.lang_127+': '+quest.access.date[0]+' - '+quest.access.date[1]+'</b></br>';}
if(new Boolean(quest.access.day)!=false){access_data=access_data+'</br><b>'+TW_Calc.lang.lang_128+': '+quest.access.day+'</b></br>';}
if(new Boolean(quest.access.quest)!=false){access_data=access_data+'<img style="padding:2px" src="http://tw-calc.net/images/ico/ine/true.png"><a href="javascript:TW_Calc.quest.quests(3,'+quest.access.quest.serie+','+quest.access.quest.quest+')">'+quest.access.quest.value+'</a></br>';}
if(new Boolean(quest.access.noquest)!=false){access_data=access_data+'<img style="padding:2px" src="http://tw-calc.net/images/ico/ine/false.png"><a href="javascript:TW_Calc.quest.quests(3,'+quest.access.noquest.serie+','+quest.access.noquest.quest+')">'+quest.access.noquest.value+'</a></br>';}
if(new Boolean(quest.access.level)!=false){access_data=access_data+'</br>'+TW_Calc.lang.lang_30+': <b>'+quest.access.level+'</b></br>';}
if(new Boolean(quest.access.item)!=false){var a=quest.access;var u=new ItemPopup(ItemManager.get(Number(a.item.id)));access_data=access_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';}
if(new Boolean(quest.access.item2)!=false){var a=quest.access;var u=new ItemPopup(ItemManager.get(Number(a.item2.id)));access_data=access_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item2.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item2.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item2.action+'.png"></div></div>';}
/*FINISH DATA*/
if(new Boolean(quest.finish.map)!=false){finish_data=finish_data+'<span class="quest_mmaplink" title="Center map" onclick="javascript:window[&quot;Map&quot;].center('+quest.finish.map.x+','+quest.finish.map.y+');void(0);"><img style="padding:2px" src="http://www.the-west.sk/images/icons/compass.png"></span><b>'+quest.finish.map.name+'</b>';}
if(new Boolean(quest.finish.none)!=false){finish_data=finish_data+'<b>'+quest.finish.none.text+'</b>';}
if(new Boolean(quest.finish.duel)!=false){finish_data=finish_data+'</br>'+TW_Calc.lang.lang_119+': <b>'+quest.finish.duel.npc+'<b>';}
if(new Boolean(quest.finish.koma)!=false){finish_data=finish_data+'</br>'+TW_Calc.lang.lang_129+' <b>'+quest.finish.koma.npc+'<b>';}
if(new Boolean(quest.finish.job)!=false){if(quest.finish.job.i!="0"){var e='('+quest.finish.job.i+'x)</br>';}else{var e="</br>";};finish_data=finish_data+'</br><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(Quest.minimapLinkClicked(&quot;'+quest.finish.job.name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://www.the-west.sk/images/icons/compass.png"></span>'+quest.finish.job.name+' '+e;}
if(new Boolean(quest.finish.job2)!=false){if(quest.finish.job2.i!="0"){var e='('+quest.finish.job2.i+'x)</br>';}else{var e="</br>";};finish_data=finish_data+'</br><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(Quest.minimapLinkClicked(&quot;'+quest.finish.job2.name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://www.the-west.sk/images/icons/compass.png"></span>'+quest.finish.job2.name+' '+e;}
if(new Boolean(quest.finish.job3)!=false){if(quest.finish.job3.i!="0"){var e='('+quest.finish.job3.i+'x)</br>';}else{var e="</br>";};finish_data=finish_data+'</br><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(Quest.minimapLinkClicked(&quot;'+quest.finish.job3.name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://www.the-west.sk/images/icons/compass.png"></span>'+quest.finish.job3.name+' '+e;}
if(new Boolean(quest.finish.item)!=false){var a=quest.finish;var u=new ItemPopup(ItemManager.get(Number(a.item.id)));finish_data=finish_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';}
if(new Boolean(quest.finish.item2)!=false){var a=quest.finish;var u=new ItemPopup(ItemManager.get(Number(a.item2.id)));finish_data=finish_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item2.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item2.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item2.action+'.png"></div></div>';}
if(new Boolean(quest.finish.item3)!=false){var a=quest.finish;var u=new ItemPopup(ItemManager.get(Number(a.item3.id)));finish_data=finish_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item3.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item3.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item3.action+'.png"></div></div>';}
if(new Boolean(quest.finish.item4)!=false){var a=quest.finish;var u=new ItemPopup(ItemManager.get(Number(a.item4.id)));finish_data=finish_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item4.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item4.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item4.action+'.png"></div></div>';}
if(new Boolean(quest.finish.dollar)!=false){finish_data=finish_data+'<div title="$'+quest.finish.dollar.value+'" style="display:inline-block;padding:3px;width:60px;height:60px"><div title="" class="reward_dollar reward"><span class="count" style="left:0px"><p>'+quest.finish.dollar.value+'</p></span></div></div>';}
if(new Boolean(quest.finish.skill_name)!=false){finish_data=finish_data+'<div class="pm_skillbox" style="padding:3px"><img class="skillicon" title="" src="http://www.the-west.sk/images/window/skills/skillicon_'+quest.finish.skill_name.name+'.png"><div class="skb_plusminus"><div class="tw2gui_plusminus" id="pmbut_skill_repair"><span unselectable="on" class="displayValue unselectable" style="width: 56px; display: none;">'+quest.finish.skill_name.count+'</span><span unselectable="on" class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px;">'+quest.finish.skill_name.count+'</span></div></div></div>';}
/*REWARD DATA*/
if(new Boolean(quest.reward.none)!=false){end_data=end_data+'</br><b>'+quest.reward.none.text+'</b></br>';}
if(new Boolean(quest.reward.exp)!=false){end_data=end_data+'<div title="'+quest.reward.exp.value+' XP" style="display:inline-block;padding:3px;width:60px;height:60px;"><div title="" class="reward_exp reward"><span class="count" style="left:0px"><p>'+quest.reward.exp.value+'</p></span></div></div>';}
if(new Boolean(quest.reward.dollar)!=false){end_data=end_data+'<div title="$'+quest.reward.dollar.value+'" style="display:inline-block;padding:3px;width:60px;height:60px"><div title="" class="reward_dollar reward"><span class="count" style="left:0px"><p>'+quest.reward.dollar.value+'</p></span></div></div>';}
if(new Boolean(quest.reward.bond)!=false){end_data=end_data+'<div title="'+quest.reward.bond.value+' UPB" style="display:inline-block;padding:3px;width:60px;height:60px"><div title="" class="reward_bond reward"><span class="count" style="left:0px"><p>'+quest.reward.bond.value+'</p></span></div></div>';}
if(new Boolean(quest.reward.skill)!=false){end_data=end_data+'<div style="display:inline-block;width:27px;height:27px;padding:3px"><div style="width:27px;height:27px;background:url(\'http://www.the-west.sk/images/window/skills/attr_label.png\')" title="'+quest.reward.skill.count+'x '+quest.reward.skill.typ+'"></div></div>';}
if(new Boolean(quest.reward.skill_name)!=false){end_data=end_data+'<div class="pm_skillbox" style="padding:3px"><img class="skillicon" title="" src="http://www.the-west.sk/images/window/skills/skillicon_'+quest.reward.skill_name.name+'.png"><div class="skb_plusminus"><div class="tw2gui_plusminus" id="pmbut_skill_repair"><span unselectable="on" class="displayValue unselectable" style="width: 56px; display: none;">'+quest.reward.skill_name.count+'</span><span unselectable="on" class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px;">'+quest.reward.skill_name.count+'</span></div></div></div>';}
if(new Boolean(quest.reward.attr)!=false){end_data=end_data+'<div style="display:inline-block;width:27px;height:27px;padding:3px"><div style="width:27px;height:27px;background:url(\'http://www.the-west.sk/images/window/skills/skill_label.jpg\')" title="'+quest.reward.attr.count+'x '+quest.reward.attr.typ+'"></div></div>';}
if(new Boolean(quest.reward.attr2)!=false){end_data=end_data+'<div style="display:inline-block;width:27px;height:27px;padding:3px"><div style="width:27px;height:27px;background:url(\'http://www.the-west.sk/images/window/skills/skill_label.jpg\')" title="'+quest.reward.attr2.count+'x '+quest.reward.attr2.typ+'"></div></div>';}
if(new Boolean(quest.reward.item)!=false){var a=quest.reward;var u=new ItemPopup(ItemManager.get(Number(a.item.id)));end_data=end_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';}
if(new Boolean(quest.reward.item2)!=false){var a=quest.reward;var u=new ItemPopup(ItemManager.get(Number(a.item2.id)));end_data=end_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item2.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item2.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item2.action+'.png"></div></div>';}
if(new Boolean(quest.reward.option)!=false){var a=quest.reward.option[0];var u=new ItemPopup(ItemManager.get(Number(a.item.id)));var b=quest.reward.option[1];var v=new ItemPopup(ItemManager.get(Number(b.item.id)));end_data=end_data+'<fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 1</legend><div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend><div class="item item_inventory" title="'+v.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(b.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+b.item.count+'</p></span></div></fieldset>';}
if(new Boolean(quest.reward.option3)!=false){var a=quest.reward.option3[0];var u=new ItemPopup(ItemManager.get(Number(a.item.id)));var b=quest.reward.option3[1];var v=new ItemPopup(ItemManager.get(Number(b.item.id)));var c=quest.reward.option3[2];var uv=new ItemPopup(ItemManager.get(Number(c.item.id)));end_data=end_data+'<fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 1</legend><div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend><div class="item item_inventory" title="'+v.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(b.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+b.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 3</legend><div class="item item_inventory" title="'+uv.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(c.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+c.item.count+'</p></span></div></fieldset>';}
if(new Boolean(quest.equip)!=false){if(new Boolean(quest.equip.item)!=false){var a=quest.equip;var u=new ItemPopup(ItemManager.get(Number(a.item.id)));equip_data=equip_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';}}
if(quest.clas=="quest_table_light"){var dat = '<table class="'+quest.clas+'"><tr style="width:168px"><td><span id="span1" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_11+'</span><span>'+equip_data+'</span></td><td style="width:168px"><span id="span2" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_12+'</span><span>'+access_data+'</span></td><td style="width:168px"><span id="span3" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_13+'</span><span>'+finish_data+'</span></td><td style="width:168px"><span id="span4" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_10+'</span><span>'+end_data+'</span></td></table>';}else{var dat = '<table class="'+quest.clas+'"><tr><td id="img_q_t1" style="width:100px"><div style="position:relative"><img title="'+quest_text+'" src="http://tw-calc.net/script/quest/img/givers/'+quest.giver+'.png"><span style="display:'+dec_display+';position:absolute;top:0px;right:0px;width:27px;height: 27px;background-image:url(\'http://tw-calc.net/script/quest/img/decisions.png\');background-position:'+dec+'px"></span></div></td><td style="width:139px"><span id="span1" class="quest_table_span">Id: '+quest.id+'</span><span>'+quest.name+'</span></td><td style="width:139px"><span id="span2" class="quest_table_span">'+TW_Calc.lang.quest.lang_8+'</span><span>'+access_data+'</span></td><td style="width:139px"><span id="span3" class="quest_table_span">'+TW_Calc.lang.quest.lang_9+'</span><span>'+finish_data+'</span></td><td style="width:139px"><span id="span4" class="quest_table_span">'+TW_Calc.lang.quest.lang_10+'</span><span>'+end_data+'</span></td></table>';}
TW_Calc.q=TW_Calc.q+''+dat;
i++;}TW_Calc.q='<div class="tw2gui_button" onclick="TW_Calc.quest.quests();" style="padding:5px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;font-style:normal;font-variant:normal;font-size:10pt;line-height:normal;font-family:Arial;">'+TW_Calc.lang.lang_130+'</div></div>'+TW_Calc.q+'<div class="tw2gui_button" onclick="TW_Calc.quest.quests();" style="padding:5px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_130+'</div></div>'; 
var title = TW_Calc.lang.quest.lang_5+'- '+data.quests.series[id].name;
wman.getById("TW-CALC-QUEST").setTitle(title)
break;
case 4: var data=Quest_TW_Calc.quests; var e=0;var n=0;switch(Number(document.getElementById("quest_level_value").value)){case 0: u=0; n=120; break; case 1: u=0; n=9; break; case 2: u=10; n=19; break;case 3: u=20; n=29;break;case 4: u=30; n=49;break;case 5: u=50; n=69;break;case 6: u=70; n=89;break;case 7: u=90; n=120;break;}
TW_Calc.q="";for(e=0;e<999;e++){if(new Boolean(data.quests.series[e])==false){break;};if(data.quests.series[e].level<u){continue;};if(data.quests.series[e].level>n){break;};TW_Calc.q = TW_Calc.q+'<div class="twcalc_quest" onclick="TW_Calc.quest.quests(2,'+e+')"><div class="twcalc_quest_nadpis">'+data.quests.series[e].name+'</div><div class="twcalc_quest_level">'+TW_Calc.lang.quest.lang_1+': '+data.quests.series[e].level+'</div><div class="twcalc_quest_quests">'+TW_Calc.lang.quest.lang_2+': '+data.quests.series[e].q+'</div><div class="twcalc_quest_trieda">'+TW_Calc.lang.quest.lang_3+': '+data.quests.series[e].clas+'</div><div class="twcalc_quest_giver"><img src="http://tw-calc.net/script/quest/img/givers/'+data.quests.series[e].giver+'.png" style="width: 100%; height: 100%"></div></div>';} 
break;
default: $("#TW-CALC-QUEST").append('<div id="quest_navigation" style="position:absolute;width:160px;height:376px;top:0px;left:525px;"><div id="combox"></div><div id="others"></div></div>');
var qlevel=new tw2gui.combobox('quest_level').setWidth(120).addItem(0,'Všetky úlohy').addItem(1,'Level 1-9').addItem(2,'Level 10-19').addItem(3,'Level 20-29').addItem(4,'Level 30-49').addItem(5,'Level 50-69').addItem(6,'Level 70-89').addItem(7,'Level 90+').select(0).getMainDiv();$("#quest_navigation > #combox").append(qlevel);$("#quest_navigation > #others").html('<div class="tw2gui_button" onclick="TW_Calc.quest.quests(4);" style="padding:2px;width:150px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;font-style:normal;font-variant:normal;font-size:10pt;line-height:normal;font-family:Arial;">Prejdi</div>')
var title = TW_Calc.lang.quest.lang_5;wman.getById("TW-CALC-QUEST").setTitle(title);$("#quest_content").animate({width:'510px'});var data = Quest_TW_Calc.quests;var i=0;TW_Calc.q = "";while(new Boolean(data.quests.series[i])!=false){TW_Calc.q = TW_Calc.q+'<div class="twcalc_quest" onclick="TW_Calc.quest.quests(2,'+i+')"><div class="twcalc_quest_nadpis">'+data.quests.series[i].name+'</div><div class="twcalc_quest_level">'+TW_Calc.lang.quest.lang_1+': '+data.quests.series[i].level+'</div><div class="twcalc_quest_quests">'+TW_Calc.lang.quest.lang_2+': '+data.quests.series[i].q+'</div><div class="twcalc_quest_trieda">'+TW_Calc.lang.quest.lang_3+': '+data.quests.series[i].clas+'</div><div class="twcalc_quest_giver"><img src="http://tw-calc.net/script/quest/img/givers/'+data.quests.series[i].giver+'.png" style="width: 100%; height: 100%"></div></div>'; i = i+1;} 
}
$("#quest_content").html(new tw2gui.scrollpane().appendContent(TW_Calc.q).getMainDiv());$(".twcalc_quest").hover(function(){this.style.opacity="0.7";}, function(){this.style.opacity="1";});$(".quest_table > tbody > tr").addClass("quest_table_row");$("#img_q_t1").css("width","100px");$(".quest_table > tbody > tr > td").addClass("quest_table_col");$(".quest_table > tbody > tr > td > img").addClass("quest_img");$(".quest_table > tbody > tr > #img_q_t1").addClass("quest_table_img_box");
},
}
};

TW_Calc.getLang = function(){return TW_Calc.langs.hasOwnProperty(TW_Calc.getLocale()) ? Game.locale : "en_US";}; 
TW_Calc.getLocale = function(){return Game.locale;};
var lang = TW_Calc.getLang();
TW_Calc.lang = TW_Calc.langs[lang];

$("head").append("<script src='http://tw-calc.net/script/update.js'></script>"); 
setInterval(TW_Calc.budik, 1000);

if(new Boolean(localStorage.getItem("TWCalc_settings"))!=false){
var n = localStorage.getItem("TWCalc_settings"); n.toString();
if(n.charAt(1)!=0){addCalc = setInterval(TW_Calc.addCalcFee , 1000);};
if(n.charAt(2)!=0){xp_hp_enrgy = setInterval(TW_Calc.exp_hp_enrgy, 1000);};
if((n.charAt(3)!=0)||(n.charAt(3)=="")){$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_quest"></div>').append( $('<div class="menulink" title="'+TW_Calc.lang.quest.lang_5+'" '+'onclick="TW_Calc.quest.window.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>'));};
}else{addCalc = setInterval(TW_Calc.addCalcFee , 1000); xp_hp_enrgy = setInterval(TW_Calc.exp_hp_enrgy, 1000);$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_quest"></div>').append( $('<div class="menulink" title="'+TW_Calc.lang.quest.lang_5+'" '+'onclick="TW_Calc.quest.window.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>')); }

function open_TWCalc_Window(){
switch(Character.charClass){case 'greenhorn': var myinfo_obrazok ="/images/class_choose/class_greenhorn.png"; break; case 'soldier': var myinfo_obrazok ="/images/class_choose/class_soldier.png"; break; case 'duelist': var myinfo_obrazok ="/images/class_choose/class_duelist.png"; break; case 'worker': var myinfo_obrazok ="/images/class_choose/class_worker.png"; break; case 'adventurer': var myinfo_obrazok ="/images/class_choose/class_adventurer.png"; break;};
TW_Calc.functions.cookie.load(); if(new Boolean(localStorage.getItem("TWCalc_budik"))!=false){var date = localStorage.getItem("TWCalc_budik");}else{var date = TW_Calc.info.actualtime();}     
var Tab1_HTML = '<div style="position:absolute;width:685x; height:250px; top:50px;"><span class="tw2gui_textarea" style="display:inline-block; "><div class="tw2gui_bg"></div><div class="tw2gui_bg_tl"></div><div class="tw2gui_bg_br"></div><div class="tw2gui_bg_tr"></div><div class="tw2gui_bg_bl"></div><div class="tw2gui_textarea_wrapper"><textarea id="TW_Calc_Block" style="width:675px; height: 295px; "></textarea></div></span></div>'
+'<div style="position:absolute;top:15px;left:100px;" class="tw2gui_button" onclick="TW_Calc.functions.save_notepad_text();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_36+'</div></div><div style="position:absolute;top:15px;left:0px;" class="tw2gui_button" onclick="TW_Calc.functions.confirm_deleting();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_35+'</div></div>'
+'<div style="position:absolute;width:50x;height:30px;top:15px;right:10px;"><img src="/images/icons/clock.png" width="20" height="20"><span class="tw2gui_textfield"><span><input type="text" size="12" value="'+date+'" id="Wt3"></span></span></span><img style="cursor:help;" src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_72+' '+TW_Calc.info.actualtime()+'"><div class="tw2gui_button" onclick="TW_Calc.functions.budik();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold">'+TW_Calc.lang.lang_37+'</div></div><div class="tw2gui_button" onclick="TW_Calc.functions.edit_note();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_122+'</div></div></div>';
var Tab2_HTML = '<div id="battle_calc" style="width:698px;height:355px"></div>';
var Tab3_HTML ='<div style="position:absolute;width:430px;height:60px;top: px; left: 87px;"><div style="position:absolute;width:88px; height:60px;top: 20px; left: 0px;"><img onclick="publishskill();" class="skillicon" src="http://www.the-west.sk/images/window/skills/skillicon_endurance.png" title=" '+TW_Calc.lang.lang_7+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vytrvalost_value" class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
+'<div style="position:absolute;width:88px;height:60px;top:20px;left:86px;"><img class="skillicon" src="/images/window/skills/skillicon_dodge.png" title="'+TW_Calc.lang.lang_8+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_uhybanie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
+'<div style="position:absolute;width:88px;height:60px;top:20px;left:172px;"><img class="skillicon" src="/images/window/skills/skillicon_hide.png" title="'+TW_Calc.lang.lang_6+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_skryvanie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
+'<div style="position:absolute;width:88px;height:60px;top:20px;left:258px;"><img class="skillicon" src="/images/window/skills/skillicon_aim.png" title="'+TW_Calc.lang.lang_9+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_presnost_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
+'<div style="position:absolute;width:88px;height:60px;top:20px;left:344px;"><img class="skillicon" src="/images/window/skills/skillicon_leadership.png" title="'+TW_Calc.lang.lang_5+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vodcovstvo_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
+'<div style="position:absolute;width:88px;height:60px;top:20px;left:430px;"><img class="skillicon" src="/images/window/skills/skillicon_health.png" title="'+TW_Calc.lang.lang_75+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_zdravie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div></div>'
+'<div style="position:absolute;width:200px;height:250px;top:90px;right:130px;"><span id="TWBCalc_Lang_FA" style="font-weight:bold;font-size:large;color:red; width:100%;">'+TW_Calc.lang.lang_31+'</span></br><span id="TWBCalc_Lang_FAA" style="display:inline-block;font-weight:bold;width:100%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t6">0</span></br><span id="TWBCalc_Lang_FAD" style="display:inline-block;font-weight:bold; width:100%;">'+TW_Calc.lang.lang_15+'</span><span id="tw_t7">0</span></br><span id="TWBCalc_Lang_FD" style="font-weight:bold; font-size:large; color: blue; width:100%;">'+TW_Calc.lang.lang_33+'</span></br><span id="TWBCalc_Lang_FDA" style="display:inline-block;font-weight:bold; width:100%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t8">0</span></br><span id="TWBCalc_Lang_FDD" style="display:inline-block;font-weight:bold; width:100%;">'+TW_Calc.lang.lang_15+'</span><p><span id="TW_t9">0</span></p><span id="TWBCalc_Lang_HP" style="display:inline-block;font-weight:bold; font-size:large; width:100%;">'+TW_Calc.lang.lang_28+'</span></p><span id="TW_t10">0</span></div></div>'
+'<div style="position:absolute;width:270px;height:200px;top:90px;left:87px;"><span style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_43+'</span></br><span id="TWCalc_name"></span></br><span id="TWCalc_Lang_characlass" style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_46+'</span></br><img src="'+myinfo_obrazok+'"><span id="TWCalc_charclass"></span></br><span id="TWCalc_Lang_level" style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_45+'</span></br><span id="TWCalc_level"></span></br><span id="TWCalc_Lang_server_info" style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_52+'</span></br><span id="TWCalc_server_info"></span></div>'
+'<div style="position:absolute;width:670px;height:32px;top:345px;left:86px;">BB Code: <input type="text" class="input_layout" readonly="readonly" style="text-align:center;" size="71" id="TWCalc_battle_bbcode" value="" onclick="this.select();"></div>';
var Tab4_HTML = '<div style="position:absolute;width:600px;height:60px;top:10px;left:0px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_63+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_65+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level || 1)+'" id="twcalc_duel_level"></span></span></div><div style="position:absolute;width:450px; height:60px;top: 30px; left: 360px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_69+'</span><span id="TWCalc_minduellevel"></span></br><span style="font-weight:bold;">'+TW_Calc.lang.lang_68+'</span><span id="TWCalc_maxduellevel"></span></br></div>'
+'<div style="position:absolute;width:100px;height:30px;top:30px;left:250px;" class="tw2gui_button" onclick="TW_Calc.TWDuelCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_Lang_button2" class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div>'
+'<div style="position:absolute;width:450px;height:60px;top:80px;left:0px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_64+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_66+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level1 || 1)+'" id="twcalc_duel_level1"></span></span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_70+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level2 || 1)+'" id="twcalc_duel_level2"></span></span></br><img src="images/job/motivation.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_71+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.motivation || 100)+'" id="twcalc_duel_motivation"></span></span></br></div><div style="position:absolute;width:300px; height:60px;top: 150px; left: 360px;"><span id="TWCalc_exp"></span></div>'
+'<div style="position:absolute;width:100px;height:30px;top:100px;left:290px;" class="tw2gui_button" onclick="TW_Calc.TWDuelCalc.vypocet2();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_Lang_button2" class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div>';
var Tab5_HTML = ''; var Tab6_HTML = '<div style="margin: 6px 6px 6px 6px;width:680px;" id="duel_list"></div>';
var Tab7_HTML = '<div style="position:absolute;width:680px; height: 300px; top: 15px; left: 0px;"><div id="TWcalc_checkobox" class="tw2gui_checkbox" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox\');"></div> '+TW_Calc.lang.lang_74+' </br>'
+'<div id="TWcalc_checkbox_calcFees" class="tw2gui_checkbox"  onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkbox_calcFees\')"></div> '+TW_Calc.lang.lang_108+' </br>'
+'<div id="TWcalc_checkbox_calcHPenergyXP" class="tw2gui_checkbox" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkbox_calcHPenergyXP\')"></div> '+TW_Calc.lang.lang_109+' </br>'
+'<div id="TWcalc_checkbox_quest" class="tw2gui_checkbox" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkbox_quest\')"></div> '+TW_Calc.lang.lang_133+' </br>'
+'<img style="cursor:pointer;width:20px;height:20px" onclick="TW_Calc.functions.settings();" src="data:image/png;base64,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"> '+TW_Calc.lang.lang_62+' </br> '
+'<div style="font-weight:bold">'+TW_Calc.lang.lang_84+'  <img src="'+TW_Calc.lang.lang_85+'"> (Translated by '+TW_Calc.lang.translator+')</div>'
+'<div style=​"position:​ absolute;​width:​718px;​height:​32px;top:​335px;left:0px;​" class=​"txcenter">​<div style="position:absolute;width:718px;height:32px;top:335px;left:0px;" class="txcenter"><span style="font-weight:bold;">.: by<a onclick="window.open('+TW_Calc.info.open_forum+')"> MarcusJohnyEvans  </a>~ </span><span><a onclick="window.open('+TW_Calc.info.open_twcalc+')">tw-calc.net</a></span><span style="font-weight:bold;"> :.</span></div>'
+'<div style="position:absolute;width:100px;height:32px;top:0px;right:0px;" class="tw2gui_button" onclick="TW_Calc.main.settingsCalc();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button" class="textart_title" style="font-weight:bold">'+TW_Calc.lang.lang_36+'</div></div>'
+'</div>';

function tw2gui_with_cards(TWcalc_window_title, TWcalc_window_tab1_title, TWcalc_window_tab2_title, TWcalc_window_tab3_title, TWcalc_window_tab4_title, TWcalc_window_tab5_title, TWcalc_window_tab6_title, TWcalc_window_tab7_title, TWcalc_window_tab1_html, TWcalc_window_tab2_html, TWcalc_window_tab3_html, TWcalc_window_tab4_html, TWcalc_window_tab5_html, TWcalc_window_tab6_html, TWcalc_window_tab7_html){
var TWcalc_window = wman.open("TWcalc_window_"); TWcalc_window.setTitle(TW_Calc.info.name); TWcalc_window.setMiniTitle(TW_Calc.info.name);
var TWcalc_window_html = '<span id="TWcalc_window_tab1">'+TWcalc_window_tab1_html+'</span>'+
'<span id="TWcalc_window_tab2" style="display:none;">'+TWcalc_window_tab2_html+'</span>'+    
'<span id="TWcalc_window_tab3" style="display:none;">'+TWcalc_window_tab3_html+'</span>'+
'<span id="TWcalc_window_tab4" style="display:none;">'+TWcalc_window_tab4_html+'</span>'+
'<span id="TWcalc_window_tab5" style="display:none;">'+TWcalc_window_tab5_html+'</span>'+'<span id="TWcalc_window_tab6" style="display:none;">'+TWcalc_window_tab6_html+'</span>'+
'<span id="TWcalc_window_tab7" style="display:none;">'+TWcalc_window_tab7_html+'</span>';
TWcalc_window.addTab("").appendToContentPane(TWcalc_window_html);
(document.getElementsByClassName("tw2gui_window tw2gui_win2 TWcalc_window_ active_tab_id_undefined")[0]).getElementsByClassName("tw2gui_window_tabbar_tabs")[0].innerHTML = '<div id="TWcalc_window_tab1_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt tw2gui_window_tab_active"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab1_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab2_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab2_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab3_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab3_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab4_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab4_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab5_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab5_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab6_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab6_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab7_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab7_title+'</div><div class="tw2gui_window_tab_terminator"></div></div>';
((window_minimize = (document.getElementsByClassName("tw2gui_window tw2gui_win2 TWcalc_window_")[0]).getElementsByClassName("tw2gui_window_buttons_reload")[0]).parentNode.removeChild(window_minimize));
$("#TWcalc_window_tab5_bt").click(function(){TW_Calc.import_inf();})
document.getElementById("TWcalc_window_tab1_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "block";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "none";};
document.getElementById("TWcalc_window_tab2_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "block";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "none";};
document.getElementById("TWcalc_window_tab3_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "block";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "none";};
document.getElementById("TWcalc_window_tab4_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "block";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "none";};
document.getElementById("TWcalc_window_tab5_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "block";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "none";};	 
document.getElementById("TWcalc_window_tab6_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "block";
document.getElementById("TWcalc_window_tab7").style.display = "none";};
document.getElementById("TWcalc_window_tab7_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab6_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab6_bt";
document.getElementById("TWcalc_window_tab7_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab7_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";
document.getElementById("TWcalc_window_tab6").style.display = "none";
document.getElementById("TWcalc_window_tab7").style.display = "block";};  
};
tw2gui_with_cards(TW_Calc.info.name, TW_Calc.tabs.tab.Tab1_name, TW_Calc.tabs.tab.Tab2_name, TW_Calc.tabs.tab.Tab3_name, TW_Calc.tabs.tab.Tab4_name, TW_Calc.tabs.tab.Tab5_name, TW_Calc.tabs.tab.Tab6_name, TW_Calc.tabs.tab.Tab7_name,Tab1_HTML, Tab2_HTML, Tab3_HTML, Tab4_HTML, Tab5_HTML, Tab6_HTML, Tab7_HTML);  
};

$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_launch_button"></div>').append( $('<div class="menulink" title="The-West Calc" '+'onclick="TW_Calc.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>')); 	
var apitwcalc = TheWestApi.register("tw-calc", "The-West Calculator", "1.36", "2.03", "MarcusJohnyEvans", "http://tw-calc.net/"); apitwcalc.setGui("Visit our website!");

$("head").append('<style>.twcalc_quest {position: relative; width: 246px; height: 100px; background: url("http://tw-calc.net/script/quest/img/quest_bg.png"); cursor: pointer; display: inline-block}'
+'.twcalc_quest_nadpis {position: absolute; left: 8px; color: Tan; width: 235px; overflow: hidden; top: 8px; font-weight: bold}'
+'.twcalc_quest_level {width: 160px; position: absolute; left: 73px; top: 28px; color: Tan}'
+'.twcalc_quest_giver {position: absolute; width: 58px; left: 8px; height: 58px; top: 28px; border: solid; border-width: 2px; border-color:}'
+'.twcalc_quest_quests {width: 160px; position: absolute; left: 73px; top: 44px; color: Tan}'
+'.twcalc_quest_trieda {width: 160px; position: absolute; left: 73px; top: 60px; color: Tan}'
+'.quest_img {width: 100px; height: 100px;} .quest_table_img_box {width: 100px; height: 100px}'
+'.quest_table_span {font-weight: bold; display: inline-block; width: 100%; height: 20px; background: url("http://tw-calc.net/script/quest/img/bg3.png");}'
+'.quest_table_span_light {font-weight: bold; display: inline-block; width: 100%; height: 20px; background: url("http://tw-calc.net/script/quest/img/bg1.png");}'
+'.quest_table {margin-bottom:5px;border-spacing: 0px; border: solid; border-width: 1.5px; width: 657px; text-align: center; background: url("http://tw-calc.net/script/quest/img/bg3.png"); background-repeat: repeat}'
+'.quest_table_light {margin-bottom:5px;border-spacing: 0px; border: solid; border-width: 1.5px; width: 657px; text-align: center; background: url("http://tw-calc.net/script/quest/img/bg1.png"); background-repeat: repeat}'
+'.quest_table_col {border:solid;border-width:1px;border-color:rgb(54, 53, 44)}</style>');
}).toString()+", 100); ";
document.getElementsByTagName('body')[0].appendChild(TWCalcjs);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWCalc_inject();