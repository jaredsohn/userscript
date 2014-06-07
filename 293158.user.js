// ==UserScript==
// @name The-West Calc (SP)
// @version 0.6.8.10
// @description The-West Battle Calc, Notepad, Battle stats, Duel Calc, Duel list, Quest list, Craft list, Job list, Wardrobe, Tombola analyser
// @author theTim
// @include	http://*.the-west.*/game.php*
// @include	http://*.tw.innogames.*/game.php*
// @downloadURL http://tw-calc.net/script/TW-Calc.user.js
// ==/UserScript==

TWCalc_inject = function(){
if(document.getElementById('TWCalc_js')) return;
var TWCalcjs = document.createElement('script');
TWCalcjs.setAttribute('type', 'text/javascript');
TWCalcjs.setAttribute('language', 'javascript');
TWCalcjs.setAttribute('id', 'TWCalc_js');
TWCalcjs.innerHTML = "var _TWCalc_int = setInterval("+(function(){
clearInterval(_TWCalc_int);

TW_Calc = {
	scriptName: "The-West Calc",
	version: "0.6.8.10",
	gameMAX: Game.version.toString(),
	author: "MarcusJohnyEvans",
	gameMIN: "1.36",
	website: "http://tw-calc.net",
	updateURL: "http://tw-calc.net/script/TW-Calc.user.js",
	shortName: "tw-calc",
	bottomImg: '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',
};

TW_Calc.langs = {
	"en_US":{translator:"Laki235",craft:["Field coook","Tonic peddler","Blacksmith","Master Saddler","Crafting"],craft_lang:["Recipe","Required resources","Product","Effect","Estimated time",],day:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",],none:["nothing","Without gun",],month:["January","February","March","April","May","June","July","August","September","October","November","December",],quest:{lang_1:"Level",lang_2:"Quests",lang_3:"Character classes",lang_4:"All",lang_5:"Quests",lang_6:"Special quests",lang_7:"Free skills",lang_8:"Access",lang_9:"Finish",lang_10:"Reward",lang_11:"Have equiped",lang_12:"Other requirements",lang_13:"Job",},lang_0:"No",lang_1:"Yes",lang_2:"With premium",lang_3:"Settings",lang_4:"Skills",lang_5:"Leadership",lang_6:"Hiding",lang_7:"Stamina",lang_8:"Doging",lang_9:"Aim",lang_10:"Golden gun",lang_11:"Maya RoalstadÂ´s shawl",lang_12:"Sam HawkenÂ´s Knife",lang_13:"Soldier",lang_14:"Attack",lang_15:"Defence",lang_16:"Attack",lang_17:"Defence",lang_18:"Position on map",lang_19:"Worker ",lang_20:"The tower of your character",lang_21:"Grass",lang_22:"Tower - level 1",lang_23:"Tower - level 2",lang_24:"Tower - level 3",lang_25:"Tower - level 4",lang_26:"Tower - level 5",lang_27:"Calculate",lang_28:"Health",lang_29:"Health points",lang_30:"Level",lang_31:"Fortbattle attack",lang_32:"Character",lang_33:"Fortbattle defence",lang_34:"Other",lang_35:"Delete",lang_36:"Save",lang_37:"Set time",lang_38:"Greenhorn",lang_39:"Dueller",lang_40:"Adventurer",lang_41:"Soldier",lang_42:"Builder",lang_43:"Player name",lang_44:"Game world",lang_45:"Player level",lang_46:"Character class",lang_47:"Attack",lang_48:"Defense",lang_49:"Health",lang_50:"Attack",lang_51:"Defense",lang_52:"Gameworld",lang_53:"Player name",lang_54:"Character class",lang_55:"Fortbattle - attack",lang_56:"Fortbattle - defense",lang_57:"Attack",lang_58:"Defence",lang_59:"Attack",lang_60:"Defence",lang_61:"Health",lang_62:"Alarmclock settings ",lang_63:"Calculate the highest and lowest duelling level you are able to duel",lang_64:"Calculate the amount of experiences gained from a duel",lang_65:"Your duelling level",lang_66:"Your duelling level",lang_67:"Calculate",lang_68:"Highest possible duelling level",lang_69:"Lowest possible duelling level",lang_70:"Duelling level of your opponent",lang_71:"Duel motivation",lang_72:"How to write a date? Example:",lang_73:"Languague",lang_74:"Import skills",lang_75:"Health points",lang_76:"Create a languague pack",lang_77:"for The-West Calc is a new version available, please click ok to update the Userscript",lang_78:"TW-Calc Update needed",lang_79:"Current version",lang_80:"Later",lang_81:"Your note",lang_82:"Time",lang_83:"TW-Calc Alarm clock",lang_84:"Your languague",lang_85:"http://tw-calc.net/images/ico/flags/en.png",lang_86:"If you will win duel, you will gain",lang_87:"experience and",lang_88:"Successfully saved",lang_89:"Your notes has been successfully deleted",lang_90:"Alarm Clock not set (BAD SYNTAX)",lang_91:"Alarm clock set",lang_92:"Cancel",lang_93:"TW-Calc Alarm clock - settings",lang_94:"Alarm clock",lang_95:"Enter URL adress of your sound. For example: http://www.tw-calc.net/script/budik.mp3",lang_96:"Alarm clock set",lang_97:"Melody of alarm clock: Alarm1, Alarm2",lang_98:"Health points",lang_99:"Energy",lang_100:"Full energy for",lang_101:"hours and",lang_102:"minutes",lang_103:"Experience points",lang_104:"Full health for:",lang_105:"Transfer fee",lang_106:"Transfer fee",lang_107:"Transfer amount",lang_108:"Add bank fees calculator (during transfer) to the bank window",lang_109:"Add energy&health refill calculators",lang_110:"duel experience",lang_111:"New version",lang_112:"Whats new",lang_113:"Edit",lang_114:"Duelling level",lang_115:"Duleable",lang_116:"Distance",lang_117:"Center map",lang_118:"Town",lang_119:"Win duel",lang_120:"Job",lang_121:"Nothing",lang_122:"Note",lang_123:"Really?",lang_124:"Actually empty",lang_125:"To accept this quest you must finish the quest",lang_126:"To accept this quest you don",lang_127:"Date:",lang_128:"Day:",lang_129:"Kill:",lang_130:"Back to list of quests",lang_131:"Really?",lang_132:"Option",lang_133:"Add quest extension",lang_134:"Lost the duel",lang_135:"Server time",lang_136:"Month",lang_137:"Add TW-Calc to the game",lang_138:"Find the job on minimap",lang_139:"Natty Bumppo",lang_140:"Ressistance",lang_141:"Damage",lang_142:"Data loaded",lang_143:"Loading",lang_144: "Add jobs bar to UI",lang_145: "Add list of your favourite jobs",lang_146: "All your saved jobs will be removed. Are you sure you want to do it?",lang_147: "Close (Saved automatically)",lang_148: "RESET JOBS",lang_149: "RESET",lang_150: "Add/remove Jobs",lang_151: "Search for job",lang_152: "Job list",lang_153: "Replace native craft window in the menu by Westcalc crat window",lang_154:"Open duel window",lang_155:"Create your duel equipment",lang_156:"Create new",lang_157:"Name",lang_158:"Equip",lang_159:"Importing",lang_160:"Own skills",lang_161:"Add new set",lang_162:"Close",lang_163:"Add",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na 'PridaÅ¥'.",lang_165:"Successfull",lang_166:"Name..",lang_167:"Job",lang_168:"Create",lang_169:"Show configuration of this set",lang_170:"Wardrobe",lang_171:"Remove this set",lang_172:"Create",lang_173: "Tombola analyser",lang_174: "Travelling fair",lang_175: "Add wardrobe to the game",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},
	"sk_SK":{translator:"theTim",craft:["PoÄ¾nÃ½ kuchár","MastiÄkár","KováÄ","Majster sedla","Remeslo"],craft_lang:["Recept","PoÅ¾adované produkty","Produkt","Efekt","OdhadovanÃ½ Äas",],day:["Pondelok","Utorok","Streda","Å tvrtok","Piatok","Sobota","NedeÄ¾a",],none:["nothing","Without gun",],month:["January","February","March","April","May","June","July","August","September","October","November","December",],quest:{lang_1:"ÃšroveÅˆ",lang_2:"Ãšlohy",lang_3:"Trieda postavy",lang_4:"VÅ¡etky",lang_5:"Ãšlohy",lang_6:"Å peciálne úlohy",lang_7:"VoÄ¾né body schopnodtí",lang_8:"SprístupniÅ¥",lang_9:"UkonÄiÅ¥",lang_10:"Odmena",lang_11:"MaÅ¥ na sebe",lang_12:"Iné poÅ¾iadavky",lang_13:"Práca",},lang_0:"Nie",lang_1:"Ãno",lang_2:"S prémiom",lang_3:"Nastavenia",lang_4:"Schopnosti",lang_5:"Vodcovstvo",lang_6:"SkrÃ½vanie",lang_7:"VytrvalosÅ¥",lang_8:"UhÃ½banie",lang_9:"PresnosÅ¥",lang_10:"Zlatá puÅ¡ka",lang_11:"Å ál Márie Rolastad",lang_12:"NÃ´Å¾ Sama Hawkensa",lang_13:"Vojak",lang_14:"Å anca na zásah",lang_15:"Å anca na úhyb",lang_16:"Å anca na zásah",lang_17:"Å anca na úhyb",lang_18:"Pozícia na mape pevnosti",lang_19:"Pracovník ",lang_20:"VeÅ¾a tvojho charakteru",lang_21:"NebonusovÃ½ sektor",lang_22:"VeÅ¾a - úroveÅˆ 1",lang_23:"VeÅ¾a - úroveÅˆ 2",lang_24:"VeÅ¾a - úroveÅˆ 3",lang_25:"VeÅ¾a - úroveÅˆ 4",lang_26:"VeÅ¾a - úroveÅˆ 5",lang_27:"VypoÄítaj",lang_28:"Zdravie",lang_29:"Body zdravia",lang_30:"ÃšroveÅˆ",lang_31:"Ãštok",lang_32:"Postava",lang_33:"Obrana",lang_34:"Iné",lang_35:"ZmaÅ¾",lang_36:"UloÅ¾",lang_37:"Nastav budík",lang_38:"ZelenáÄ",lang_39:"Duelant",lang_40:"Dobrodruh",lang_41:"Vojak",lang_42:"Pracovník",lang_43:"Meno hráÄa",lang_44:"HernÃ½ svet",lang_45:"ÃšroveÅˆ hráÄa",lang_46:"Trieda postavy",lang_47:"Ãštok",lang_48:"Obrana",lang_49:"Zdravie",lang_50:"Å anca na zásah",lang_51:"Å anca na úhyb",lang_52:"HernÃ½ svet",lang_53:"Meno hráÄa",lang_54:"Trieda postavy",lang_55:"Ãštok",lang_56:"Obrana",lang_57:"Å anca na zásah",lang_58:"Å anca na úhyb",lang_59:"Å anca na zásah",lang_60:"Å anca na úhyb",lang_61:"Zdravie",lang_62:"Nastavenie budíka",lang_63:"Kalkulátor na vÃ½poÄet maximálnej a minimálnej duelovatelnej duelovej úrovne",lang_64:"Kalkulátor na vÃ½poÄet skúseností z duelu",lang_65:"Tvoja duelová úroveÅˆ",lang_66:"Tvoja duelová úroveÅˆ",lang_67:"VypoÄítaj",lang_68:"Maximálna duelová duelovateÄ¾ná úroveÅˆ",lang_69:"Minimálna duelová duelovateÄ¾ná úroveÅˆ",lang_70:"Duelová úroveÅˆ protivníka",lang_71:"Duelová motivácia",lang_72:"Ako správne zapísaÅ¥ Äas? Príklad:",lang_73:"Jazyk",lang_74:"Importuj aj schopnosti",lang_75:"Body zdravia",lang_76:"Vytvor si vlastnÃ½ jazykovÃ½ balíÄek",lang_77:"Pre TW-Calc je dostupná aktualizácia, klikni prosím na ok pre aktualizáciu scriptu",lang_78:"TW-Calc potrebuje aktualizáciu",lang_79:"Aktuálna verzia",lang_80:"NeskÃ´r",lang_81:"Tvoja poznámka",lang_82:"ÄŒas",lang_83:"TW-Calc Budík",lang_84:"Aktuálny jazyk",lang_85:"http://tw-calc.net/images/ico/flags/svk.png",lang_86:"Ak vyhráÅ¡ duel, získaÅ¡",lang_87:"skúseností a",lang_88:"ÃšspeÅ¡ne uloÅ¾ené",lang_89:"Tvoje poznámky boli úspeÅ¡ne zmazané",lang_90:"Budík nenastavenÃ½ (ZLÃ SYNTAX)",lang_91:"Budík nastavenÃ½",lang_92:"ZruÅ¡",lang_93:"TW-Calc Budík - nastavenia",lang_94:"Zvuk budíka",lang_95:"Zadajte url adresu zvuku. Príklad: http://www.tw-calc.net/script/budik.mp3",lang_96:"Budík nastavenÃ½",lang_97:"Budíky: Alarm1, Alarm2",lang_98:"Body zdravia",lang_99:"Energia",lang_100:"Plná energia za",lang_101:"hodín a",lang_102:"minút",lang_103:"Body skúsenosti",lang_104:"Plné zdravie za:",lang_105:"Poplatok za prevod",lang_106:"Poplatky",lang_107:"Prevedená suma",lang_108:"PridaÅ¥ do banky automatickÃ½ kalkulátor bankovÃ½ch poplatkov (pri prevode)",lang_109:"PridaÅ¥ do hry kalkulátory Äasu doplnenia energie a zdravia",lang_110:"duelovÃ½ch skúseností",lang_111:"Nová verzia",lang_112:"ÄŒo je nové",lang_113:"UpraviÅ¥ zoznam hráÄov",lang_114:"Duelová úroveÅˆ",lang_115:"Duel moÅ¾nÃ½",lang_116:"VzdialenosÅ¥",lang_117:"Vycentruj mapu",lang_118:"Mesto",lang_119:"Vyhraj duel proti",lang_120:"Práca",lang_121:"NiÄ",lang_122:"Poznámka",lang_123:"Naozaj chceÅ¡ vymazaÅ¥ poznámky?",lang_124:"Momentálne prázdne",lang_125:"Pre zobrazenie tejto úlohy musíÅ¡ dokonÄiÅ¥ úlohu/y:",lang_126:"Pre zobrazenie tejto úlohy nesmieÅ¡ dokonÄiÅ¥ úlohu/y",lang_127:"Dátum:",lang_128:"DeÅˆ:",lang_129:"Daj do kómy:",lang_130:"SpÃ¤Å¥ na zoznam úloh",lang_131:"Naozaj?",lang_132:"MoÅ¾nosÅ¥",lang_133:"PridaÅ¥ rozÅ¡írenie s úlohami",lang_134:"Prehraj duel proti",lang_135:"ServerovÃ½ Äas",lang_136:"Mesiac",lang_137:"Pridaj TW-Calc do hry",lang_138:"HÄ¾adaÅ¥ vhodnú prácu na minimape",lang_139:"Súprava Nattyho Bumppoa",lang_140:"Odpor",lang_141:"PoÅ¡kodenie zbrane",lang_142:"Dáta naÄítané",lang_143:"NaÄítava sa",lang_144:"PridaÅ¥ panel s odkazmi na práce",lang_145:"PridaÅ¥ do hry zoznam obÄ¾úbenÃ½ch prác",lang_146:"VÅ¡etky tvoje uloÅ¾ené práce budú zmazané, naozaj to chceÅ¡ tak urobiÅ¥?",lang_147:"ZatvoriÅ¥ (Ãšdaje budú uloÅ¾ené automaticky)",lang_148:"VynulovaÅ¥ práce",lang_149:"VynulovaÅ¥",lang_150:"Pridaj/vymaÅ¾ práce",lang_151:"HÄ¾adaj prácu",lang_152:"Zoznam prác",lang_153:"NahraÄ herné okno s remeslom remeselnÃ½m oknom Westcalcu v menu",lang_154:"Otvor duelové okno",lang_155:"Vytvor si duelové obleÄenie",lang_156:"VytvoriÅ¥ nové",lang_157:"Názov",lang_158:"ObliecÅ¥ si",lang_159:"Importujem",lang_160:"Vlastné atribúty",lang_161:"PridaÅ¥ novÃ½ set",lang_162:"ZatvoriÅ¥",lang_163:"PridaÅ¥",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na ",lang_165:"ÃšspeÅ¡né",lang_166:"Názov..",lang_167:"Práca",lang_168:"VytvoriÅ¥",lang_169:"Zobraz konfiguráciu tohoto setu",lang_170:"Å atník",lang_171:"VymaÅ¾ tento set",lang_172:"VytvoriÅ¥",lang_173:"Tombola analyzér",lang_174:"KoÄovnÃ½ cirkus",lang_175:"PridaÅ¥ do hry Å¡atník",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},
	"pt_BR":{translator:"MagnusIII",craft:["Cozinheiro","Vendedor de tÃ´nico","Ferreiro","Seleiro","Forjar"],craft_lang:["Receitas","Recursos necessários","Produto","Efeito","Tempo estimado",],day:["Segunda","TerÃ§a","Quarta","Quinta","Sexta","Sábado","Domingo",],none:["nada","Sem arma",],month:["Janeiro","Fevereiro","MarÃ§o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",],quest:{lang_1:"Nível",lang_2:"Aventuras",lang_3:"Classe do personagem",lang_4:"Todas",lang_5:"Aventuras",lang_6:"Aventuras especiais",lang_7:"Habilidades grátis",lang_8:"Acessar",lang_9:"Finalizar",lang_10:"Recompensa",lang_11:"Precisa equipar",lang_12:"Outros equipamentos",lang_13:"Trabalho",},lang_0:"NÃ£o",lang_1:"Sim",lang_2:"Com premium",lang_3:"ConfiguraÃ§Ãµes",lang_4:"Habilidades",lang_5:"LideranÃ§a",lang_6:"Esconder",lang_7:"TolerÃ¢ncia",lang_8:"EvasÃ£o",lang_9:"Mira",lang_10:"Espingarda Dourada",lang_11:"O xale Maya Roalstad",lang_12:"Faca do Sam Hawken",lang_13:"Soldado",lang_14:"Ataque",lang_15:"Defesa",lang_16:"Ataque",lang_17:"Defesa",lang_18:"PosiÃ§Ã£o no mapa",lang_19:"Trabalhador",lang_20:"A torre do seu personagem",lang_21:"ChÃ£o",lang_22:"Torre - nível 1",lang_23:"Torre - nível 2",lang_24:"Torre - nível 3",lang_25:"Torre - nível 4",lang_26:"Torre - nível 5",lang_27:"Calcular",lang_28:"Saúde",lang_29:"Pontos de Saúde",lang_30:"Nível",lang_31:"Batalha do forte (ataque)",lang_32:"Personagem",lang_33:"Batalha do forte (defesa)",lang_34:"Outro",lang_35:"Apagar",lang_36:"Salvar",lang_37:"Definir o tempo",lang_38:"Novato",lang_39:"Duelador",lang_40:"Aventureiro",lang_41:"Soldado",lang_42:"Construtor",lang_43:"Nome do jogador",lang_44:"Mundo",lang_45:"Nível do jogador",lang_46:"Classe do personagem",lang_47:"Ataque",lang_48:"Defesa",lang_49:"Saúde",lang_50:"Ataque",lang_51:"Defesa",lang_52:"Mundo",lang_53:"Nome do jogador",lang_54:"Classe do personagem",lang_55:"Batalha do forte - ataque",lang_56:"Batalha do forte - defesa",lang_57:"Ataque",lang_58:"Defesa",lang_59:"Ataque",lang_60:"Defesa",lang_61:"Saúde",lang_62:"ConfiguraÃ§Ãµes do alarme",lang_63:"Calcule o maior e o menor nível de duelo que está habilitado a duelar",lang_64:"Calcule a quantidade de experiÃªncia ganha no duelo",lang_65:"Seu nível de duelo",lang_66:"Seu nível de duelo",lang_67:"Calcular",lang_68:"Maior nível possível de duelo",lang_69:"Menor nível possível de duelo",lang_70:"Nível de duelo do seu oponente",lang_71:"MotivaÃ§Ã£o de duelo",lang_72:"Como escrever a data? Exemplo:",lang_73:"Linguaguem",lang_74:"Importar habilidades",lang_75:"Pontos de saúde",lang_76:"Criar um pacote de linguagem",lang_77:"há uma nova versÃ£o do The-West Calc disponível, por favor clique em OK para atualizar o script",lang_78:"AtualizaÃ§Ã£o do TW-Calc é necessária",lang_79:"VersÃ£o atual",lang_80:"Depois",lang_81:"Suas notas",lang_82:"Tempo",lang_83:"TW-Calc Despertador",lang_84:"Sua lingua",lang_85:"http://tw-calc.net/images/ico/flags/br.png",lang_86:"Se vocÃª ganhar o duelo, vocÃª vai ganhar",lang_87:"experiÃªncia e",lang_88:"Salvo com sucesso",lang_89:"Suas notas foram apagadas com sucesso",lang_90:"Despertador nÃ£o configurado (BAD SYNTAX)",lang_91:"Configurar despertador",lang_92:"Cancelar",lang_93:"TW-Calc Despertador - configuraÃ§Ãµes",lang_94:"Despertador",lang_95:"Coloque o endereÃ§o URL do som. Por exemplo: http://www.tw-calc.net/script/budik.mp3",lang_96:"ConfiguraÃ§Ãµes do despertador",lang_97:"Melodia do despertador: Alarm1, Alarm2",lang_98:"Pontos de saúde",lang_99:"Energia",lang_100:"Energia completa em:",lang_101:"horas e",lang_102:"minutos",lang_103:"Pontos de experiÃªncia",lang_104:"Saúde completa em:",lang_105:"Taxa de transferÃªncia",lang_106:"Taxa de transferÃªncia",lang_107:"Quantia para tranferir",lang_108:"Adiciona a calculadora de taxa bancária (durante transferÃªncia) para a janela do banco",lang_109:"Adiciona calculadora para recarga de energia e saúde",lang_110:"experiÃªncia de duelo",lang_111:"Nova versÃ£o",lang_112:"O que há de novo",lang_113:"Editar",lang_114:"Nível de duelo",lang_115:"Duelável",lang_116:"DistÃ¢ncia",lang_117:"Localizar no mapa",lang_118:"Cidade",lang_119:"Venceu duelo",lang_120:"Trabalho",lang_121:"Nada",lang_122:"Notas",lang_123:"Sério?",lang_124:"Atualmente vazio",lang_125:"Para aceitar essa aventura vocÃª precisa terminar a aventura",lang_126:"Para aceitar essa aventura vocÃª nÃ£o",lang_127:"Data:",lang_128:"Dia:",lang_129:"Matar:",lang_130:"Voltar para a lista de aventuras",lang_131:"Sérios?",lang_132:"OpÃ§Ãµes",lang_133:"Adicionar a extensÃ£o de aventura",lang_134:"Perdeu o duelo",lang_135:"Horário do servidor",lang_136:"MÃªs",lang_137:"Adicionar TW-Calc ao jogo",lang_138:"Encontrar o trabalho no minimapa",lang_139:"Natty Bumppo",lang_140:"ResistÃªncia",lang_141:"Dano",lang_142:"Data loaded",lang_143:"Loading",lang_144: "Add jobs bar to UI",lang_145: "Add list of your favourite jobs",lang_146: "All your saved jobs will be removed. Are you sure you want to do it?",lang_147: "Close (Saved automatically)",lang_148: "RESET JOBS",lang_149: "RESET",lang_150: "Add/remove Jobs",lang_151: "Search for job",lang_152: "Job list",lang_153: "Replace native craft window in the menu by Westcalc crat window",lang_154:"Open duel window",lang_155:"Create your duel equipment",lang_156:"Create new",lang_157:"Name",lang_158:"Equip",lang_159:"Importing",lang_160:"Own skills",lang_161:"Add new set",lang_162:"Close",lang_163:"Add",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na PridaÅ¥.",lang_165:"Successfull",lang_166:"Name..",lang_167:"Job",lang_168:"Create",lang_169:"Show configuration of this set",lang_170:"Wardrobe",lang_171:"Remove this set",lang_172:"Create",lang_173: "Tombola analyser",lang_174: "Travelling fair",lang_175: "Add wardrobe to the game",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},
	"cs_CZ":{translator:"Easter Bunny",craft:["KuchaÅ™","MastíÄkáÅ™","KováÅ™","JezdeckÃ½ mist","Å˜emeslo"],craft_lang:["Recept","PoÅ¾adované vÃ½sledky","Produkt","Efekt","Trvající Äas",],day:["PondÄ›lí","ÃšterÃ½","StÅ™eda","ÄŒtvrtek","Pátek","Sobota","NedÄ›le",],none:["Nic","Beze zbranÄ›",],month:["Leden","Ãšnor","BÅ™ezen","Duben","KvÄ›ten","ÄŒerven","ÄŒervenec","Srpen","ZáÅ™í","Å˜íjen","Listopad","Prosinec",],quest:{lang_1:"ÃšroveÅˆ",lang_2:"Ãškoly",lang_3:"Charakterová skupina",lang_4:"VÅ¡echny",lang_5:"Quests",lang_6:"Ãškoly",lang_7:"Volné schopnosti",lang_8:"PÅ™ístup",lang_9:"DokonÄit",lang_10:"OdmÄ›na",lang_11:"Mít obleÄeno",lang_12:"DalÅ¡í poÅ¾adavky",lang_13:"Práce",},lang_0:"Ne",lang_1:"Ano",lang_2:"S prémiem",lang_3:"Nastavení",lang_4:"Schopnosti",lang_5:"Vést",lang_6:"SkrÃ½vat se",lang_7:"Vytrvalost",lang_8:"UhÃ½bání",lang_9:"PÅ™esnost",lang_10:"Zlatá puÅ¡ka",lang_11:"Å ál Marie Roalstad",lang_12:"Sam HawkensÅ¯v nÅ¯Å¾",lang_13:"Voják",lang_14:"Ãštok",lang_15:"Obrana",lang_16:"Ãštok",lang_17:"Obrana",lang_18:"Pozice na mapÄ›",lang_19:"DÄ›lník",lang_20:"VÄ›Å¾ tvého charakteru",lang_21:"Tráva",lang_22:"VÄ›Å¾ - úroveÅˆ 1",lang_23:"VÄ›Å¾ - úroveÅˆ 2",lang_24:"VÄ›Å¾ - úroveÅˆ 3",lang_25:"VÄ›Å¾ - úroveÅˆ 4",lang_26:"VÄ›Å¾ - úroveÅˆ 5",lang_27:"SpoÄítat",lang_28:"Zdraví",lang_29:"PoÄet zdraví",lang_30:"ÃšroveÅˆ",lang_31:"Ãštok",lang_32:"Charakter",lang_33:"Obrana",lang_34:"DalÅ¡í",lang_35:"Smazat",lang_36:"UloÅ¾it",lang_37:"Nastav Äas",lang_38:"Greenhorn",lang_39:"Duelant",lang_40:"Dobrodruh",lang_41:"Voják",lang_42:"DÄ›lník",lang_43:"Jméno hráÄe",lang_44:"Herní svÄ›t",lang_45:"ÃšroveÅˆ hráÄe",lang_46:"Charakterová skupina",lang_47:"Ãštok",lang_48:"Obrana",lang_49:"Zdraví",lang_50:"Ãštok",lang_51:"Obrana",lang_52:"Herní svÄ›t",lang_53:"Jméno hráÄe",lang_54:"Charakterová skupina",lang_55:"Ãštok",lang_56:"Obrana",lang_57:"Ãštok",lang_58:"Obrana",lang_59:"Ãštok",lang_60:"Obrana",lang_61:"Zdraví",lang_62:"Nastavit pÅ™ipomínku",lang_63:"SpoÄítej nejvÄ›tÅ¡í a nejmenÅ¡í duelovou úroveÅˆ, kterou mÅ¯Å¾eÅ¡ vyzvat",lang_64:"SpoÄítej poÄet zkuÅ¡eností, kterÃ½ dostaneÅ¡ za duel",lang_65:"Tvá duelová úroveÅˆ",lang_66:"Tvá duelová úroveÅˆ",lang_67:"SpoÄítej",lang_68:"NejvÄ›tÅ¡í moÅ¾ná duelová úroveÅˆ",lang_69:"NejniÅ¾Å¡í moÅ¾nÃ½ duelovÃ½ level",lang_70:"Duelová úroveÅˆ protivníka",lang_71:"Duelová motivace",lang_72:"Jak napsat datum? PÅ™íklad:",lang_73:"Jazyk",lang_74:"Import schopností",lang_75:"Zdraví",lang_76:"VytvoÅ™it jazykovÃ½ balíÄek",lang_77:"Je k dispozici nová verze scriptu. Prosím kliknÄ›te pro aktualizaci.",lang_78:"TW-Calc potÅ™ebuje aktualizovat!",lang_79:"Stávající verze",lang_80:"PozdÄ›ji!",lang_81:"Tvé zápísky",lang_82:"ÄŒas",lang_83:"TW-Calc budík",lang_84:"TvÅ¯j jazyk",lang_85:"http://tw-calc.net/images/ico/flags/cz.png",lang_86:"KdyÅ¾ vyhrajeÅ¡ duel, dostaneÅ¡",lang_87:"zkuÅ¡eností a",lang_88:"ÃšspÄ›Å¡nÄ› uloÅ¾eno!",lang_89:"Tvé zápisky byly úspÄ›Å¡nÄ› uloÅ¾eny! Gratuluji",lang_90:"Budík nemohl bÃ½t nastaven. Å patná syntaxe!",lang_91:"Budík nastaven",lang_92:"ZruÅ¡it",lang_93:"TW-Calc budík - nastavení",lang_94:"Budík",lang_95:"Zadej URL tvého zvuku. KupÅ™íkladu: http://www.tw-calc.net/script/budik.mp3",lang_96:"Budík nastaven",lang_97:"Melodie budíku: Alarm1, Alarm2",lang_98:"Zdraví",lang_99:"Energie",lang_100:"Plná energie za",lang_101:"hodin a",lang_102:"minut",lang_103:"PoÄet zkuÅ¡enosti",lang_104:"Plné zdraví za:",lang_105:"Poplatek za pÅ™evod",lang_106:"Poplatek za pÅ™evod",lang_107:"ÄŒástka k pÅ™evodu",lang_108:"PÅ™idat kalkulátor bankovních poplatkÅ¯ do okna s bankou",lang_109:"PÅ™idat kalkulátor obnovy energie a zdraví",lang_110:"duelové zkuÅ¡enosti",lang_111:"Nová verze",lang_112:"Co je nového?",lang_113:"ZmÄ›nit",lang_114:"Duelová úroveÅˆ",lang_115:"MoÅ¾nost duelování",lang_116:"Vzdálenost",lang_117:"Vycentrovat mapu",lang_118:"MÄ›sto",lang_119:"Duel vyhrán",lang_120:"Práce",lang_121:"Nic",lang_122:"Zápisky",lang_123:"Opravdu?",lang_124:"MomentálnÄ› prázdnÃ½.",lang_125:"Pro akceptování úkolu musíÅ¡ úkol splnit.",lang_126:"Pro pÅ™ijetí úkolu musíÅ¡ udÄ›lat",lang_127:"Datum:",lang_128:"Den:",lang_129:"Zabít:",lang_130:"Zpátky do listu úkolÅ¯",lang_131:"Opravdu?",lang_132:"Nastavení",lang_133:"PÅ™idat duelové rozÅ¡íÅ™ení",lang_134:"Prohrát duel",lang_135:"ServerovÃ½ Äas",lang_136:"MÄ›síc",lang_137:"PÅ™idej TW-Calc do hry",lang_138:"Najdi práci na minimapÄ›",lang_139:"Nattyho Bumponovo",lang_140:"Odpor",lang_141:"PoÅ¡kození",lang_142:"Data loaded",lang_143:"Loading",lang_144: "Add jobs bar to UI",lang_145: "Add list of your favourite jobs",lang_146: "All your saved jobs will be removed. Are you sure you want to do it?",lang_147: "Close (Saved automatically)",lang_148: "RESET JOBS",lang_149: "RESET",lang_150: "Add/remove Jobs",lang_151: "Search for job",lang_152: "Job list",lang_153: "Replace native craft window in the menu by Westcalc crat window",lang_154:"Open duel window",lang_155:"Create your duel equipment",lang_156:"Create new",lang_157:"Name",lang_158:"Equip",lang_159:"Importing",lang_160:"Own skills",lang_161:"Add new set",lang_162:"Close",lang_163:"Add",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na PridaÅ¥.",lang_165:"Successfull",lang_166:"Name..",lang_167:"Job",lang_168:"Create",lang_169:"Show configuration of this set",lang_170:"Wardrobe",lang_171:"Remove this set",lang_172:"Create",lang_173: "Tombola analyser",lang_174: "Travelling fair",lang_175: "Add wardrobe to the game",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},
	"es_ES":{translator:"pepe100",craft:["Cocinero de campo","Vendedor de tónicos","Herrero","Maestro guarnicionero","Artesanía"],craft_lang:["Receta","Recursos requeridos","Producto","Efecto","Tiempo estimado",],day:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo",],none:["nada","Sin arma",],month:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",],quest:{lang_1:"Nivel",lang_2:"Búsquedas",lang_3:"Clases de personajes",lang_4:"Todo",lang_5:"Búsquedas",lang_6:"Búsquedas especiales",lang_7:"Habilidades gratis",lang_8:"Acceso",lang_9:"Finalizar",lang_10:"Recompensa",lang_11:"Tener equipado",lang_12:"Otros requisitos",lang_13:"Trabajo",},lang_0:"No",lang_1:"Sí",lang_2:"Con premium",lang_3:"Ajustes",lang_4:"Habilidades",lang_5:"Dirigir",lang_6:"Esconder",lang_7:"Condición",lang_8:"Eludir",lang_9:"Apuntar",lang_10:"Rifle de oro",lang_11:"Bufanda de María Roalstad",lang_12:"Cuchillo de Sam Hawken",lang_13:"Soldado",lang_14:"Ataque",lang_15:"Defensa",lang_16:"Ataque",lang_17:"Defensa",lang_18:"Posición en el mapa",lang_19:"Trabajador",lang_20:"La torre de su personaje",lang_21:"Hierba",lang_22:"Torre - nivel 1",lang_23:"Torre - nivel 2",lang_24:"Torre - nivel 3",lang_25:"Torre - nivel 4",lang_26:"Torre - nivel 5",lang_27:"Calcular",lang_28:"Salud",lang_29:"Puntos de salud",lang_30:"Nivel",lang_31:"Ataque de fuerte",lang_32:"Personaje",lang_33:"Defensa de fuerte",lang_34:"Otro",lang_35:"Borrar",lang_36:"Guardar",lang_37:"Ajustar hora",lang_38:"Novato",lang_39:"Duelista",lang_40:"Aventurero",lang_41:"Soldado",lang_42:"Trabajador",lang_43:"Nombre jugador",lang_44:"Mundo juego",lang_45:"Jugador nivel",lang_46:"Clase carácter",lang_47:"[COLOR=Red]Ataque[/COLOR]",lang_48:"[COLOR=Blue]Defensa[/COLOR]",lang_49:"[COLOR=Green]Salud[/COLOR]",lang_50:"Ataque",lang_51:"Defensa",lang_52:"Mundo juego",lang_53:"Nombre jugador",lang_54:"Clase carácter",lang_55:"Batalla fuerte - ataque",lang_56:"Batalla fuerte - defensa",lang_57:"Ataque",lang_58:"Defensa",lang_59:"Ataque",lang_60:"Defensa",lang_61:"Salud",lang_62:"Ajustes despertador",lang_63:"Calcular el mayor y el menor nivel de duelo que es capaz de duelear",lang_64:"Calcular la cantidad de experiencia obtenida de un duelo",lang_65:"Su nivel de duelo",lang_66:"Su nivel de duelo",lang_67:"Calcular",lang_68:"EL nivel más alto posible para hacerle duelo",lang_69:"El nivel más bajo posible para hacerle duelo",lang_70:"Nivel de duelo de su adversario",lang_71:"Motivación duelo",lang_72:"Â¿Cómo escribir una fecha? Ejemplo:",lang_73:"Idioma",lang_74:"Importar habilidades",lang_75:"Puntos de Salud",lang_76:"Crear un paquete de idioma",lang_77:"Hay una nueva versión disponible para The-West Calc, por favor haga click en aceptar para actualizar el script",lang_78:"TW-Calc actualización necesaria",lang_79:"Versión actual",lang_80:"Más tarde",lang_81:"Su nota",lang_82:"Hora",lang_83:"TW-Calc despertador",lang_84:"Su idioma",lang_85:"http://tw-calc.net/images/ico/flags/es.png",lang_86:"Si usted gana un duelo, ganará",lang_87:"de experiencia y",lang_88:"Guardado con éxito",lang_89:"Sus notas se han borrado correctamente",lang_90:"Despertador no fijado (MALA SINTAXIS)",lang_91:"Despertador fijado",lang_92:"Cancelar",lang_93:"TW-Calc Despertador - ajustes",lang_94:"Despertador",lang_95:"Introduzca la URL del sonido. Ejemplo: http://www.tw-calc.net/script/budik.mp3",lang_96:"Alarma de reloj",lang_97:"Melodía de alarma: Alarma1, Alarma2",lang_98:"Puntos de salud",lang_99:"Energía",lang_100:"Energía completa en",lang_101:"horas y",lang_102:"minutos",lang_103:"Puntos de experiencia",lang_104:"Salud completa en:",lang_105:"Tasa transferencia",lang_106:"Tasa transferencia",lang_107:"Importe de transferencia",lang_108:"Añadir calculadora automática de gastos (de tranferencia) al banco",lang_109:"Añadir calculadora de salud y de energía",lang_110:"experiencia de duelo",lang_111:"Nueva versión",lang_112:"Novedades",lang_113:"Editar",lang_114:"Nivel de duelo",lang_115:"Atacable",lang_116:"Distancia",lang_117:"Centrar mapa",lang_118:"Ciudad",lang_119:"Ganar duelo",lang_120:"Trabajo",lang_121:"Nada",lang_122:"Nota",lang_123:"¿De verdad?",lang_124:"En realidad vacío",lang_125:"Para aceptar esta búsqueda debe finalizar esta búsqueda",lang_126:"Para aceptar esta búqueda no",lang_127:"Fecha:",lang_128:"Día:",lang_129:"Matar:",lang_130:"Volver a la lista de búsquedas",lang_131:"¿De verdad?",lang_132:"Opción",lang_133:"Agregar extensión búsquedas",lang_134:"Perder el duelo",lang_135:"Hora del servidor",lang_136:"Mes",lang_137:"Agregar TW-Calc al juego",lang_138:"Encontrar el trabajo en el minimapa",lang_139:"Natty Bumppo",lang_140:"Resistencia",lang_141:"Daño",lang_142:"Datos cargados",lang_143:"Cargando",lang_144: "Agregar barra de trabajos a la interfaz de usuario",lang_145: "Agregar lista de tus trabajos favoritos",lang_146: "Todos los trabajos guardados serán borrados. ¿Está seguro que quiere hacerlo?",lang_147: "Cerrar (Guardado automático)",lang_148: "REINICIALIZAR TRABAJOS",lang_149: "REINICIALIZAR",lang_150: "Añadir/Quitar trabajos",lang_151: "Buscar trabajo",lang_152: "Lista de trabajo",lang_153: "Reemplazar ventana de oficios nativa en el menú por la ventana de oficios de Westcalc",lang_154:"Abrir ventana de duelo",lang_155:"Crear su equipo de duelo",lang_156:"Crear nuevo",lang_157:"Nombre",lang_158:"Equipo",lang_159:"Importando",lang_160:"Habilidades propias",lang_161:"Añadir nuevo conjunto",lang_162:"Cerrar",lang_163:"Añadir",lang_164:"La ropa que llevas puesta se añadirá como conjunto personalizado, para confirmar hacer clic en 'Añadir'.",lang_165:"Con éxito",lang_166:"Nombre..",lang_167:"Trabajo",lang_168:"Crear",lang_169:"Mostrar configuración de este conjunto",lang_170:"Armario",lang_171:"Quitar este conjunto",lang_172:"Crear",lang_173: "Analizador de tómbola",lang_174: "Feria Ambulante",lang_175: "Agregar armario al juego",lang_176:"Ver recetas que puedes producir"},
	"pl_PL":{translator:"el-Rysio",lang_0:"Nie", lang_1:"Tak", lang_2:"Z Premium", lang_3:"Ustawienia", lang_4:"UmiejÄ™tnoÅ›ci", lang_5:"Dowodzenie", lang_6:"Chowanie siÄ™", lang_7:"WytrzymaÅ‚oÅ›Ä‡", lang_8:"Unik", lang_9:"Celowanie", lang_10:"ZÅ‚ota strzelba", lang_11:"Szal Marii Roalstad", lang_12:"NóÅ¼ Sama Hawkena", lang_13:"Å»oÅ‚nierz", lang_14:"Atak", lang_15:"Obrona", lang_16:"Atak", lang_17:"Obrona", lang_18:"Pozycja na bitwie", lang_19:"Budowniczy ", lang_20:"Baszta twojej klasy postaci", lang_21:"Trawa", lang_22:"Baszta - poziom 1", lang_23:"Baszta - poziom 2", lang_24:"Baszta - poziom 3", lang_25:"Baszta - poziom 4", lang_26:"Baszta - poziom 5", lang_27:"Oblicz", lang_28:"Punkty Å»ycia", lang_29:"Punkty Å»ycia", lang_30:"Poziom", lang_31:"Atak na fort", lang_32:"Klasa postaci", lang_33:"Obrona fortu", lang_34:"Inne", lang_35:"UsuÅ„", lang_36:"Zapisz", lang_37:"Ustaw czas", lang_38:"Nowicjusz", lang_39:"Zawadiaka", lang_40:"Poszukiwacz przygód", lang_41:"Å»oÅ‚nierz", lang_42:"Budowniczy", lang_43:"Nazwa gracza", lang_44:"Åšwiat gry", lang_45:"Poziom postaci", lang_46:"Klasa postaci", lang_47: "[COLOR=Red]Atak[/COLOR]", lang_48:"[COLOR=Blue]Obrona[/COLOR]", lang_49:"[COLOR=Green]Punkty Å¼ycia[/COLOR]", lang_50:"Atak", lang_51:"Obrona", lang_52:"Åšwiat gry", lang_53:"Nazwa gracza", lang_54:"Klasa postaci", lang_55:"Bitwa - atak", lang_56:"Bitwa -  obrona", lang_57:"Atak", lang_58:"Obrona", lang_59:"Atak", lang_60:"Obrona", lang_61:"Punkty Å¼ycia", lang_62:"Ustawienia alarmu ", lang_63:"Oblicz  najwyÅ¼szy oraz najniÅ¼szy poziom pojedynków jaki jesteÅ› w stanie zaatakowaÄ‡", lang_64:"Oblicz sumÄ™ doÅ›wiadczenia zdobytego w pojedynku", lang_65:"Twój poziom pojedynków", lang_66:"Twój poziom pojedynków", lang_67:"Oblicz", lang_68:"NajwyÅ¼szy moÅ¼liwy poziom pojedynków", lang_69:"NajniÅ¼szy moÅ¼liwy poziom pojedynków", lang_70:"Poziom pojedynków twojego przeciwnika", lang_71:"Motywacja pojedynkowa", lang_72:"Jak napisaÄ‡ datÄ™? PrzykÅ‚ad:", lang_73:"JÄ™zyk", lang_74:"Importuj umiejÄ™tnoÅ›ci", lang_75:"Punkty zycia", lang_76:"Create a languague pack", lang_77:"Jest nowa wersja dla The-West Calc, naciÅ›nij ok Å¼eby zaktualizowaÄ‡", lang_78:"TW-Calc potrzebna aktualizacja", lang_79:"Aktualna wersja", lang_80:"PóÅºniej", lang_81:"Twoja notatka", lang_82:"Czas", lang_83:"TW-Calc Alarm ", lang_84:"Twój jÄ™zyk", lang_85:"http://tw-calc.net/images/ico/flags/pl.png", lang_86:"JeÅ›li wygrasz pojedynek, zyskasz", lang_87:"doswiadczenia oraz", lang_88:"Zapisano pomyÅ›lnie", lang_89:"Twoja notatka zostaÅ‚a pomyÅ›lnie usuniÄ™ta", lang_90:"Budzik nie ustawiony (zÅ‚a skÅ‚adnia)", lang_91:"Alarm clock set", lang_92:"WyjdÅº", lang_93:"TW-Calc alarm - ustawienia", lang_94:"Alarm", lang_95:"Wpisz adres URL dÅºwieku. PrzykÅ‚ad: http://www.tw-calc.net/script/budik.mp3", lang_96:"Alarm clock set", lang_97:"DÅºwiÄ™k alarmu : Alarm1, Alarm2", lang_98:"Punkty Å¼ycia", lang_99:"Energia", lang_100:"CaÅ‚a energia dla", lang_101:"Godziny i", lang_102:"minuty", lang_103:"Punkty doÅ›wiadczenia", lang_104:"CaÅ‚e HP dla:", lang_105:"OpÅ‚ata", lang_106:"OpÅ‚ata", lang_107:"PrzekaÅ¼ sumÄ™", lang_108:"Dodaj automatycznie kalkulator opÅ‚at bankowych (przekazu) do banku", lang_109:"Dodaj liczniki uzupeÅ‚nienia energii oraz HP", lang_110:"DoÅ›wiadczenie pojedynkowe", lang_111:"New version", lang_112:"Whats new", lang_113:"Edit", lang_114:"Duelling level", lang_115:"Duleable", lang_116:"Distance", lang_117:"Center map", lang_118:"Town", lang_119:"Win duel", lang_120:"Job", lang_121:"Nothing", lang_122:"Note", lang_123:"Really?", lang_124:"Actually empthy", lang_125:"To accept this quest you must finish the quest", lang_126:"To accept this quest you dont have to finish the quest", lang_127:"Date:", lang_128:"Day:", lang_129:"Kill:", lang_130:"Back to list of quests", lang_131:"Really?", lang_132:"Option", lang_133:"Add quest extension", lang_134:"Lost the duel", lang_135:"Server time", lang_136:"Month", lang_137:"Add TW-Calc to the game", lang_138:"HÄ¾adaÅ¥ vhodnú prácu na minimape", lang_139:"Súprava Nattyho Bumppoa", lang_140:"Odpor", lang_141:"PoÅ¡kodenie zbrane", "day":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "month":["January","February","March","April","May","June","July","August","September","October","November","December"], "none":["nothing","Without gun"], "attr":["Strength","Mobility","Dexterity","Charisma",], "craft":["Field coook","Tonic peddler","Blacksmith","Master Saddler","Crafting"], "craft_lang":["Recipe","Required resources","Product","Effect","Estimated time"], "quest":{ lang_1:"Level", lang_2:"Quests", lang_3:"Character classes", lang_4:"All", lang_5:"Quests", lang_6:"Special quests", vojak:"Soldier", pracovnik:"Worker", duelant:"Dueller", dobrodruh:"Adventurer", lang_7:"Free skills", lang_8:"Access", lang_9:"Finish", lang_10:"Reward", lang_11:"Have equiped", lang_12:"Other requirements", lang_13:"Job", },lang_142:"Data loaded",lang_143:"Loading",lang_144: "Add jobs bar to UI",lang_145: "Add list of your favourite jobs",lang_146: "All your saved jobs will be removed. Are you sure you want to do it?",lang_147: "Close (Saved automatically)",lang_148: "RESET JOBS",lang_149: "RESET",lang_150: "Add/remove Jobs",lang_151: "Search for job",lang_152: "Job list",lang_153: "Replace native craft window in the menu by Westcalc crat window",lang_154:"Open duel window",lang_155:"Create your duel equipment",lang_156:"Create new",lang_157:"Name",lang_158:"Equip",lang_159:"Importing",lang_160:"Own skills",lang_161:"Add new set",lang_162:"Close",lang_163:"Add",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na PridaÅ¥.",lang_165:"Successfull",lang_166:"Name..",lang_167:"Job",lang_168:"Create",lang_169:"Show configuration of this set",lang_170:"Wardrobe",lang_171:"Remove this set",lang_172:"Create",lang_173: "Tombola analyser",lang_174: "Travelling fair",lang_175: "Add wardrobe to the game",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},
	"hu_HU":{translator:"Jakovlev",craft:["Tábori szakács","Sarlatán","Kovács","Istállómester","Mesterség",],craft_lang:["Recept","SzÃ¼kséges termékek","Termék","Hatás","Használható",],day:["HétfÅ‘","Kedd","Szerda","CsÃ¼tÃ¶rtÃ¶k","Péntek","Szombat","Vasárnap",],none:["Semmi","Fegyver nélkÃ¼l",],month:["Január","Február","Március","Ãprilis","Május","Június","Július","Augusztus","Szeptember","Október","November","December",],quest:{lang_1:"Szint",lang_2:"Kalandok",lang_3:"Karakterosztály",lang_4:"Ã–sszes",lang_5:"Kalandok",lang_6:"Speciális kalandok",lang_7:"Szabad képességek",lang_8:"Elfogadáshoz szÃ¼kséges",lang_9:"Lezáráshoz szÃ¼kséges",lang_10:"Jutalom",lang_11:"Vedd fel",lang_12:"Egyéb kÃ¶vetelmények",lang_13:"Munka",},lang_0:"Nem",lang_1:"Igen",lang_2:"Karakterprémiummal",lang_3:"Beállítások",lang_4:"Képességek",lang_5:"Irányítás",lang_6:"RejtÅ‘zés",lang_7:"Kitartás",lang_8:"Kitérés",lang_9:"Célzás",lang_10:"Aranypuska",lang_11:"Maria Roalstad úti sálja",lang_12:"Sam Hawken kése",lang_13:"Katona",lang_14:"Támadás",lang_15:"Védekezés",lang_16:"Támadás",lang_17:"Védekezés",lang_18:"Hol állsz?",lang_19:"Munkás",lang_20:"Saját tornyodban állsz",lang_21:"FÃ¼vÃ¶n",lang_22:"1-es szintÅ± toronyban",lang_23:"2-es szintÅ± toronyban",lang_24:"3-mas szintÅ± toronyban",lang_25:"4-es szintÅ± toronyban",lang_26:"5-Ã¶s szintÅ± toronyban",lang_27:"Számítás",lang_28:"Ã‰leterÅ‘",lang_29:"Ã‰leterÅ‘ pont",lang_30:"Szint",lang_31:"ErÅ‘dharc - támadás",lang_32:"Karakterosztályod",lang_33:"ErÅ‘dharc - védekezés",lang_34:"Egyéb",lang_35:"TÃ¶rlés",lang_36:"Mentés",lang_37:"IdÅ‘ beállítása",lang_38:"ZÃ¶ldfÃ¼lÅ±",lang_39:"PárbajhÅ‘s",lang_40:"Kalandor",lang_41:"Katona",lang_42:"Munkás",lang_43:"Játékos neve",lang_44:"Szerver",lang_45:"Szint",lang_46:"Karakterosztály",lang_47:"Támadás",lang_48:"Védekezés",lang_49:"Ã‰leterÅ‘",lang_50:"Támadás",lang_51:"Védekezés",lang_52:"Szerver",lang_53:"Játékos neve",lang_54:"Karakterosztály",lang_55:"ErÅ‘dharc - támadás",lang_56:"ErÅ‘dharc - védekezés",lang_57:"Támadás",lang_58:"Védekezés",lang_59:"Támadás",lang_60:"Védekezés",lang_61:"Ã‰leterÅ‘",lang_62:"Riasztás beállításai",lang_63:"Legalacsonyabb és legmagasabb párbajszint kiszámítása amit párbajra hívhatsz",lang_64:"Párbajért kapott tapasztalati pont számítása",lang_65:"Párbajszinted",lang_66:"Párbajszinted",lang_67:"Számítás",lang_68:"Legmagasabb kihívható párbajszint",lang_69:"Legalacsonyabb kihívható párbajszint",lang_70:"Ellenfeled párbajszintje",lang_71:"Párbajmotiváció",lang_72:"Hogyan írj be dátumot? Példa:",lang_73:"Nyelv",lang_74:"Képességek importálása",lang_75:"Ã‰leterÅ‘ pont",lang_76:"Fordítás más nyelvre",lang_77:"A TW-Calc újabb verziója elérhetÅ‘, kérlek frissítsd a szkriptet",lang_78:"TW-Calc szkript frissítése szÃ¼kséges",lang_79:"Jelenlegi verzió",lang_80:"KésÅ‘bb",lang_81:"Jegyzeteid",lang_82:"IdÅ‘",lang_83:"TW-Calc riasztás",lang_84:"Használt nyelv",lang_85:"http://tw-calc.net/images/ico/flags/hu.png",lang_86:"Ha megnyered a párbajt, kapsz",lang_87:"tapasztalati pontot és",lang_88:"Sikeres mentés",lang_89:"Jegyzeteid tÃ¶rÃ¶lve lettek",lang_90:"Riasztás nincs beállítva (BAD SYNTAX)",lang_91:"Riasztás beállítva",lang_92:"Mégse",lang_93:"Megjegyzés a riasztáshoz",lang_94:"Riasztás",lang_95:"Jelenleg használt riasztási hang: http://www.tw-calc.net/script/budik.mp3",lang_96:"Riasztás beállítva",lang_97:"Riasztás hangja: alarm1, alarm2",lang_98:"Ã‰leterÅ‘ pont",lang_99:"Energia",lang_100:"Energia maximumon",lang_101:"óra és",lang_102:"perc múlva",lang_103:"Tapasztalati pont",lang_104:"Ã‰leterÅ‘ maximumon:",lang_105:"Ãtutalási díj",lang_106:"Ã–sszegbÅ‘l levonódik",lang_107:"Ã–sszeg amit megkap",lang_108:"Segítség az utalásnál a banki kÃ¶ltségek számításához",lang_109:"Ã‰leterÅ‘- és energiafeltÃ¶ltÅ‘dés számláló",lang_110:"párbaj tapasztalati pontot.",lang_111:"Ãšj verzió",lang_112:"Változások",lang_113:"Szerkesztés",lang_114:"Párbajszint",lang_115:"Kihívható",lang_116:"MenetidÅ‘",lang_117:"Mutatás a térképen",lang_118:"Város",lang_119:"Párbaj megnyerése",lang_120:"Munka",lang_121:"Semmi",lang_122:"Megjegyzés",lang_123:"Biztosan tÃ¶rlÃ¶d a jegyzeteid?",lang_124:"Ãœres",lang_125:"Hogy elfogadd ezt a kalandot, teljesítened kell ezt a kalandot",lang_126:"Hogy elfogadd a kalandot, nem kell befejezned ezt a kalandot",lang_127:"IdÅ‘pont:",lang_128:"Nap:",lang_129:"Ãœsd ki:",lang_130:"Vissza a kalandok listájához",lang_131:"Jegyzetek tÃ¶rlése",lang_132:"Opció",lang_133:"Kalandok listája",lang_134:"Párbaj elvesztése",lang_135:"SzerveridÅ‘",lang_136:"Hónap",lang_137:"TW-Calc script bekapcsolása",lang_138:"Munka mutatása a minitérképen",lang_139:"Natty Bumppo szettje",lang_140:"Ellenállás",lang_141:"Sebzés",lang_142:"Data loaded",lang_143:"Loading",lang_144: "Add jobs bar to UI",lang_145: "Add list of your favourite jobs",lang_146: "All your saved jobs will be removed. Are you sure you want to do it?",lang_147: "Close (Saved automatically)",lang_148: "RESET JOBS",lang_149: "RESET",lang_150: "Add/remove Jobs",lang_151: "Search for job",lang_152: "Job list",lang_153: "Replace native craft window in the menu by Westcalc crat window",lang_154:"Open duel window",lang_155:"Create your duel equipment",lang_156:"Create new",lang_157:"Name",lang_158:"Equip",lang_159:"Importing",lang_160:"Own skills",lang_161:"Add new set",lang_162:"Close",lang_163:"Add",lang_164:"ObleÄenie ktoré máÅ¡ obleÄené na sebe bude pridané ako vlastnÃ½ set, pre potvrdenie klikni na PridaÅ¥.",lang_165:"Successfull",lang_166:"Name..",lang_167:"Job",lang_168:"Create",lang_169:"Show configuration of this set",lang_170:"Wardrobe",lang_171:"Remove this set",lang_172:"Create",lang_173: "Tombola analyser",lang_174: "Travelling fair",lang_175: "Add wardrobe to the game",lang_176:"Zobraz recepry, ktoré mÃ´Å¾em vyrobiÅ¥"},	
	"tr_TR":{translator:"JohnCooper",craft:["Ordu AÅŸÃ§Ä±sÄ±","Åžarlatan","Demirci","At YetiÅŸtiricisi","UstalÄ±k",],craft_lang:["Tarif","Gerekli kaynaklar","ÃœrÃ¼n","Etki","Tahmini sÃ¼re",],day:["Pazartesi","SalÄ±","Ã‡arÅŸamba","PerÅŸembe","Cuma","Cumartesi","Pazar",],none:["hiÃ§bir ÅŸey","SilahsÄ±z",],month:["Ocak","Åžuban","Mart","Nisan","MayÄ±s","Haziran","Temmuz","AÄŸustos","EylÃ¼l","Ekim","KasÄ±m","AralÄ±k",],quest:{lang_1:"Seviye",lang_2:"GÃ¶revler",lang_3:"Karakter SÄ±nÄ±fÄ±",lang_4:"Hepsi",lang_5:"GÃ¶revler",lang_6:"Ã–zel GÃ¶revler",lang_7:"Bedava yenetek puanlarÄ±",lang_8:"GiriÅŸ",lang_9:"Bitirmek",lang_10:"Ã–dÃ¼l",lang_11:"DonanÄ±mlÄ±",lang_12:"DiÄŸer gereksimler",lang_13:"Ã‡alÄ±ÅŸma",},lang_0:"No",lang_1:"Yes",lang_2:"Premiumlu",lang_3:"Ayarlar",lang_4:"Yetenekler",lang_5:"YÃ¶netmek",lang_6:"Saklanmak",lang_7:"DayanÄ±klÄ±lÄ±k",lang_8:"Savulma",lang_9:"NiÅŸan",lang_10:"AltÄ±n TÃ¼fek",lang_11:"Maria Roalstad",lang_12:"Sam Hawken",lang_13:"Asker",lang_14:"SaldÄ±rÄ±",lang_15:"Savunma",lang_16:"SaldÄ±rÄ±",lang_17:"Savunma",lang_18:"Haritadaki pozisyonun",lang_19:"Ä°ÅŸÃ§i",lang_20:"Karakter kulen",lang_21:"Ã‡im",lang_22:"Kule - Seviye 1",lang_23:"Kule - Seviye 2",lang_24:"Kule - Seviye 3",lang_25:"Kule - Seviye 4",lang_26:"Kule - Seviye 5",lang_27:"Hesapla",lang_28:"Hayat PuanÄ±",lang_29:"Hayat PuanÄ±",lang_30:"Seviye",lang_31:"Kale SavaÅŸÄ± SaldÄ±rÄ±sÄ±",lang_32:"Karakter",lang_33:"Kale SavaÅŸÄ± SavunmasÄ±",lang_34:"DiÄŸer",lang_35:"Sil",lang_36:"Kaydet",lang_37:"Saati ayarla",lang_38:"Acemi",lang_39:"Duellocu",lang_40:"MaceracÄ±",lang_41:"Asker",lang_42:"Ä°ÅŸÃ§i",lang_43:"Oyunuc Ä°smi",lang_44:"Oyun DÃ¼nyasÄ±",lang_45:"Karakter Seviyesi",lang_46:"Karakter SÄ±nÄ±fÄ±",lang_47:"SaldÄ±rÄ±",lang_48:"Savunma",lang_49:"Hayat PuanÄ±",lang_50:"SaldÄ±rÄ±",lang_51:"Savunma",lang_52:"Oyun DÃ¼nyasÄ±",lang_53:"Oyuncu Ä°smi",lang_54:"Karakter SÄ±nÄ±fÄ±",lang_55:"Kale SavaÅŸÄ± - SaldÄ±rÄ±",lang_56:"Kale SavaÅŸÄ± - Savunma",lang_57:"SaldÄ±rÄ±",lang_58:"Savunma",lang_59:"SaldÄ±rÄ±",lang_60:"Savunma",lang_61:"Hayat PuanÄ±",lang_62:"Ã‡alar Saat AyarlarÄ±",lang_63:"Duello yapabileceÄŸin en dÃ¼ÅŸÃ¼k ve en yÃ¼ksek duello seviyelerini hesapla",lang_64:"YapacaÄŸÄ±n bir duellodan alacaÄŸÄ±n tecrÃ¼be puanÄ±nÄ± hesapla",lang_65:"Duello seviyen",lang_66:"Duello seviyen",lang_67:"Hesapla",lang_68:"Duello yapabileceÄŸin en yÃ¼ksek seviye",lang_69:"Duello yapabileceÄŸin en dÃ¼ÅŸÃ¼k seviye",lang_70:"SaldÄ±racaÄŸÄ±n kiÅŸinin duello seviyesi",lang_71:"Duello Motivasyonu",lang_72:"Tarih nasÄ±l yazÄ±lÄ±r? Ã–rnek:",lang_73:"Dil",lang_74:"Yetenek",lang_75:"Hayat PuanÄ±",lang_76:"Dil paketi oluÅŸturun",lang_77:"The-West Calc iÃ§in yeni sÃ¼rÃ¼m mevcut, scripti gÃ¼ncellemek iÃ§in tÄ±klayÄ±nÄ±z",lang_78:"TW-Calc GÃ¼ncelleme gerektiriyor",lang_79:"Åžimdiki SÃ¼rÃ¼m",lang_80:"Sonra",lang_81:"Notun",lang_82:"Zaman",lang_83:"TW-Calc Ã‡alar Saat",lang_84:"Diliniz",lang_85:"http://tw-calc.net/images/ico/flags/en.png",lang_86:"EÄŸer kazanÄ±rsanÄ±z, ",lang_87:"tecrÃ¼be ve",lang_88:"BaÅŸarÄ±yla kaydedildi",lang_89:"NotlarÄ±nÄ± baÅŸarÄ±yla silindi",lang_90:"Ã‡alar Saat AyarlanamadÄ±",lang_91:"Ã‡alar Saat AyarlandÄ±",lang_92:"Ä°ptal",lang_93:"TW-Calc Ã‡alar Saat - Ayarlar",lang_94:"Ã‡alar Saat",lang_95:"Zil sesinizin URL adresini girin. Ã–rneÄŸin: http://www.tw-calc.net/script/budik.mp3",lang_96:"Ã‡alar Saat AyarlandÄ±",lang_97:"Ã‡alar saati zil sesi: Alarm1, Alarm2",lang_98:"Hayat PuanÄ±",lang_99:"Enerji",lang_100:"TÃ¼m enerji dolum sÃ¼resi",lang_101:"saat ve",lang_102:"dakika.",lang_103:"TecrÃ¼be PuanlarÄ±",lang_104:"TÃ¼m hayat puanÄ± dolum sÃ¼resi",lang_105:"Transferi Ã¼creti",lang_106:"Transfer Ã¼creti",lang_107:"Transfer edilecek miktar",lang_108:"Bankara transfer Ã¼creti hesaplayÄ±cÄ±sÄ± ekle",lang_109:"Enerji ve hayat puanÄ± dolum sÃ¼resini hesaplama ekle",lang_110:"duello puanÄ± kazanacaksÄ±nÄ±z.",lang_111:"Yeni sÃ¼rÃ¼m",lang_112:"Yenilikler",lang_113:"DÃ¼zenle",lang_114:"Duello seviyesi",lang_115:"Duello yapÄ±labilirlik",lang_116:"Mesafe",lang_117:"HaritayÄ± ortala",lang_118:"Kasaba",lang_119:"DÃ¼ello kazan",lang_120:"Ã‡alÄ±ÅŸma",lang_121:"HiÃ§bir ÅŸey",lang_122:"Not",lang_123:"GerÃ§ekten mi?",lang_124:"GerÃ§ekten boÅŸ",lang_125:"Bu gÃ¶revi kabul edebilmen iÃ§in bitirmen gereken gÃ¶rev",lang_126:"Bu gÃ¶revi kabul edebilmen iÃ§in yapman gereken",lang_127:"Tarih:",lang_128:"GÃ¼n:",lang_129:"BayÄ±lma:",lang_130:"Ã‡alÄ±ÅŸmalar listesine geri dÃ¶n",lang_131:"GerÃ§ekten mi?",lang_132:"SeÃ§enekler",lang_133:"GÃ¶revler penceresi ekle",lang_134:"KayÄ±p Duello",lang_135:"Sunucu saati",lang_136:"Ay",lang_137:"TW-Calc Ã¶zelliklerini oyuna ekle",lang_138:"Ã‡alÄ±ÅŸmayÄ± kÃ¼Ã§Ã¼k haritada bul",lang_139:"Natty Bumppo",lang_140:"DirenÃ§",lang_141:"Hasar",lang_142:"YÃ¼klendi",lang_143:"YÃ¼kleniyor",lang_144:"Ekrana Ã§alÄ±ÅŸmalar Ã§ubuÄŸu ekle",lang_145:"Favori Ã§alÄ±ÅŸmalar listesi butonu ekle",lang_146:"TÃ¼m kaydedilmiÅŸ Ã§alÄ±ÅŸmalarÄ±nÄ±z kaldÄ±rÄ±lacaktÄ±r. Devam etmek istediÄŸinize emin misiniz?",lang_147:"Kapat (Otomatik kaydedildi)",lang_148:"Ã‡alÄ±ÅŸmalarÄ± SÄ±fÄ±rla",lang_149:"SÄ±fÄ±rla",lang_150:"Ã‡alÄ±ÅŸma Ekle/KaldÄ±r",lang_151:"Ã‡alÄ±ÅŸma ara",lang_152:"Ã‡alÄ±ÅŸma Listesi",lang_153:"Orijinal ustalÄ±k penceresini TW-Calc ustalÄ±k penceresi ile deÄŸiÅŸtir",lang_154:"Duelloar penceresini aÃ§",lang_155:"Duello ekipmanlarÄ±nÄ± oluÅŸtur",lang_156:"Yeni oluÅŸtur",lang_157:"Ä°sim",lang_158:"Giydir",lang_159:"YÃ¼kleme",lang_160:"Yeteneklerin",lang_161:"Yeni set ekle",lang_162:"Kapat",lang_163:"Ekle",lang_164:"Ekle tÄ±klayÄ±nca Ã¼zerinizdeki kÄ±yafetler set olarak kaydedilecektir.",lang_165:"BaÅŸarÄ±lÄ±",lang_166:"Ä°sim..",lang_167:"Ã‡alÄ±ÅŸma",lang_168:"OluÅŸtur",lang_169:"Bu setin konfigÃ¼rasyonunu gÃ¶ster",lang_170:"Gardrop",lang_171:"Bu seti kaldÄ±r",lang_172:"OluÅŸtur",lang_173:"Tombala analizÃ¶rÃ¼",lang_174:"Ä°lÃ§e Sirki",lang_175:"Oyuna gardrop ekle",}
};

TW_Calc.checkLang = function(){
	TW_Calc.getLang = function(){
		return TW_Calc.langs.hasOwnProperty(TW_Calc.getLocale()) ? Game.locale : "es_ES";
	};
	TW_Calc.getLocale = function(){return Game.locale;};
	var lang=TW_Calc.getLang();
	TW_Calc.lang=TW_Calc.langs[lang];
};

TW_Calc.showTab = function(id){
	if($(".TWcalc_window_ > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > ._tab_id_"+id).hasClass("tw2gui_window_tab_active")!=true){
		$(".TWcalc_window_ > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > *").each(function(){$(this).removeClass("tw2gui_window_tab_active")});
		$(".TWcalc_window_ > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > ._tab_id_"+id).addClass("tw2gui_window_tab_active");
		$(".TWcalc_window_ > div.tw2gui_window_content_pane > *").each(function(){$(this).hide()});
		$(".TWcalc_window_ > div.tw2gui_window_content_pane > #tab_"+id).fadeIn();
	}
};
	
TW_Calc.launch = function(){
	TW_Calc.checkLang();
	var tabclick=function(win,id){
		TW_Calc.showTab(id);
	};
	var id="TWcalc_window_";
	TW_Calc.functions.cookie.load();
	if(new Boolean(localStorage.getItem("TWCalc_budik"))!=false){
		var date = localStorage.getItem("TWCalc_budik");
	}else{
		var date = TW_Calc.info.actualtime();
	}
	var Tab1_HTML = '<div style="position:absolute;width:685x; height:250px; top:50px;"><span class="tw2gui_textarea" style="display:inline-block; "><div class="tw2gui_bg"></div><div class="tw2gui_bg_tl"></div><div class="tw2gui_bg_br"></div><div class="tw2gui_bg_tr"></div><div class="tw2gui_bg_bl"></div><div class="tw2gui_textarea_wrapper"><textarea id="TW_Calc_Block" style="width:675px; height: 295px; "></textarea></div></span></div>'
		+'<div style="position:absolute;top:15px;left:100px;" class="tw2gui_button" onclick="TW_Calc.functions.save_notepad_text();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_36+'</div></div><div style="position:absolute;top:15px;left:0px;" class="tw2gui_button" onclick="TW_Calc.functions.confirm_deleting();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_35+'</div></div>'
		+'<div style="position:absolute;width:50x;height:30px;top:15px;right:10px;"><img src="/images/icons/clock.png" width="20" height="20"><span class="tw2gui_textfield"><span><input type="text" size="12" value="'+date+'" id="Wt3"></span></span></span><img style="cursor:help;" src="http://cdn.beta.the-west.net/images/window/character/info.png" title="'+TW_Calc.lang.lang_72+' '+TW_Calc.info.actualtime()+'"><div class="tw2gui_button" onclick="TW_Calc.functions.budik();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold">'+TW_Calc.lang.lang_37+'</div></div><div class="tw2gui_button" onclick="TW_Calc.functions.edit_note();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_122+'</div></div></div>';
	var Tab2_HTML = '<div id="battle_calc" style="position:absolute;width:690px;height:355px;top:10px;"></div>';
	var Tab3_HTML ='<div id="block1" style="position:absolute;top:10px;left:0px;"></div><div id="block2" style="position:absolute;top:115px;right:5px;"></div><div id="block3" style="position:absolute;width:270px;top:115px;left:0px;"></div><div id="block4" style="position:absolute;top:320px;left:0px;"></div>';
	var Tab2_1='<div style="position: absolute;left: 80px;top: 0px;"><div style="position:absolute;width:88px;height:60px;top:20px;left:0px;"><img class="skillicon" src="/images/window/skills/skillicon_endurance.png" title=" '+TW_Calc.lang.lang_7+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vytrvalost_value" class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
		+'<div style="position:absolute;width:88px;height:60px;top:20px;left:86px;"><img class="skillicon" src="/images/window/skills/skillicon_dodge.png" title="'+CharacterSkills.skills["dodge"].name+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_uhybanie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
		+'<div style="position:absolute;width:88px;height:60px;top:20px;left:172px;"><img class="skillicon" src="/images/window/skills/skillicon_hide.png" title="'+CharacterSkills.skills["hide"].name+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_skryvanie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
		+'<div style="position:absolute;width:88px;height:60px;top:20px;left:258px;"><img class="skillicon" src="/images/window/skills/skillicon_aim.png" title="'+CharacterSkills.skills["aim"].name+'"><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_presnost_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
		+'<div style="position:absolute;width:88px;height:60px;top:20px;left:344px;"><img class="skillicon" src="/images/window/skills/skillicon_leadership.png" title="'+CharacterSkills.skills["leadership"].name+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vodcovstvo_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>'
		+'<div style="position:absolute;width:88px;height:60px;top:20px;left:430px;"><img class="skillicon" src="/images/window/skills/skillicon_health.png" title="'+CharacterSkills.skills["health"].name+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_zdravie_value"class="displayValueBonus text_green unselectable" style="display:inline-block;width:56px;"></span></div></div>';
	var Tab2_2='<div><span style="font-weight:bold;font-size:15px;color:red;width:100%;">'+TW_Calc.lang.lang_31+'</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t6">0</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_15+'</span><span id="tw_t7">0</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_140+'</span><span id="tw_odpor1">0</span></br><span style="font-weight:bold;font-size:15px;color:blue;width:50%;">'+TW_Calc.lang.lang_33+'</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t8">0</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_15+'</span><span id="TW_t9">0</span></br><span style="display:inline-block;font-weight:bold;width:50%;">'+TW_Calc.lang.lang_140+'</span><span id="tw_odpor2">0</span></br><span style="display:inline-block;font-weight:bold;font-size:15px;width:50%;">'+TW_Calc.lang.lang_28+': </span><span id="TW_t10">0</span></br><span style="display:inline-block;font-weight:bold;font-size:15px;width:50%;">'+TW_Calc.lang.lang_141+': </span><span id="TW_dmg_weapon">0</span></div></div>';
	var Tab2_3='<div style="font-size: 12px;"><span style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_43+'</span></br><span id="TWCalc_name"></span></br><span id="TWCalc_Lang_characlass" style="display:inline-block;font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_46+'</span></br><img width="25px" src="/images/class_choose/'+Character.charClass+'.png"><span id="TWCalc_charclass"></span></br><span id="TWCalc_Lang_level" style="font-weight:bold;font-size:large;width:190px;">'+TW_Calc.lang.lang_45+'</span></br><span id="TWCalc_level"></span></br><span id="TWCalc_Lang_server_info" style="font-weight:bold;display:inline-block;font-size:large;width:190px;">'+TW_Calc.lang.lang_52+'</span></br><span id="TWCalc_server_info" style="width:190px;display:inline-block"></span></div>';
	var Tab2_4='<div>BB Code: <input type="text" class="input_layout" readonly="readonly" style="text-align:center;" size="94" id="TWCalc_battle_bbcode" value="" onclick="this.select();"></div>';
	var Tab4_HTML = '<div style="position:absolute;width:100%;height:100%;top:5px"></div>';
	var Tab4_1='<span style="font-weight:bold;font-size:16px">'+TW_Calc.lang.lang_63+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_65+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level || 1)+'" id="twcalc_duel_level"></span></span>'
		+'</br><div style="width:200px;margin:5px;" class="tw2gui_button" onclick="TW_Calc.TWDuelCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div  class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div></br>'
		+'<span style="font-weight:bold;">'+TW_Calc.lang.lang_69+':</span><span id="TWCalc_minduellevel"></span></br><span style="font-weight:bold;">'+TW_Calc.lang.lang_68+':</span><span id="TWCalc_maxduellevel"></span></br>';
	var Tab4_2='<span style="font-weight:bold;font-size:16px">'+TW_Calc.lang.lang_64+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_66+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level1 || 1)+'" id="twcalc_duel_level1"></span></span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_70+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.level2 || 1)+'" id="twcalc_duel_level2"></span></span></br><img src="images/job/motivation.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_71+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TW_Calc.functions.cookie.data.motivation || 100)+'" id="twcalc_duel_motivation"></span></span></br></div>'
		+'<div style="width:200px;margin:5px;" class="tw2gui_button" onclick="TW_Calc.TWDuelCalc.vypocet2();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div></br><span style="font-weight:bold" id="TWCalc_exp"></span>';
	var Tab7_HTML = '<div id="TW_Calc_Api_Card" style="margin:10px 6px 6px 6px"></div>';
	var window = wman.open(id).setTitle("The-West Calc").setMiniTitle("TW-Calc");
	window.addTab("Libreta notas",'twcalc1',tabclick).addTab("Calc. Batalla","twcalc2",tabclick).addTab("Mis Estad. Batalla","twcalc3",tabclick).addTab("Calc. Duelos","twcalc4",tabclick).addTab("Importar","twcalc5",tabclick).addTab("Lista duelos","twcalc6",tabclick).addTab("Tómbola","twcalc8",tabclick).addTab("Ajustes","twcalc7",tabclick);
	window.appendToContentPane(jQuery('<div id="tab_twcalc1">'+Tab1_HTML+'</div><div id="tab_twcalc2" style="display:none;overflow:hidden">'+Tab2_HTML+'</div><div id="tab_twcalc3" style="display:none;overflow:hidden">'+Tab3_HTML+'</div><div id="tab_twcalc4" style="display:none;overflow:hidden">'+Tab4_HTML+'</div><div id="tab_twcalc5" style="display:none;overflow:hidden"></div><div id="tab_twcalc6" style="display:none;overflow:hidden"></div><div id="tab_twcalc7" style="display:none;overflow:hidden">'+Tab7_HTML+'</div><div id="tab_twcalc8" style="display:none;overflow:hidden;height:100%;margin-top:6px;margin-left:6px;margin-right:6px;"></div>'));
	$("#tab_twcalc3>#block1").append(new west.gui.Groupframe().appendToContentPane(Tab2_1).getMainDiv());
	$("#tab_twcalc3>#block2").append(new west.gui.Groupframe().appendToContentPane(Tab2_2).getMainDiv());
	$("#tab_twcalc3>#block3").append(new west.gui.Groupframe().appendToContentPane(Tab2_3).getMainDiv());
	$("#tab_twcalc3>#block4").append(new west.gui.Groupframe().appendToContentPane(Tab2_4).getMainDiv());
	$("#tab_twcalc4>div").append(new west.gui.Groupframe().appendToContentPane(Tab4_1).getMainDiv());
	$("#tab_twcalc4>div").append(new west.gui.Groupframe().appendToContentPane(Tab4_2).getMainDiv());
	$("#tab_twcalc3>#block1>.tw2gui_groupframe").css({"height":"105px","width":"695px"});
	$("#tab_twcalc3>#block2>.tw2gui_groupframe").css({"height":"205px","width":"345px"});
	$("#tab_twcalc3>#block3>.tw2gui_groupframe").css({"height":"205px","width":"345px"});
	$("#tab_twcalc3>#block4>.tw2gui_groupframe").css({"height":"48px","width":"695px"});
	TW_Calc.showTab("twcalc1");
	$(".tw2gui_window.tw2gui_win2.TWcalc_window_").addClass("noreload");
	try{
		TW_Calc.launch_card();
	}catch(e){
		new TW_Calc.Error(e,'launch(launch_card').show();
	};
	try{
		TW_Calc.TWBattleCalc.launch();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWBattleCalc.launch)').show();
	};
	try{
		TW_Calc.TWBattleCalc.vypocet();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWBattleCalc.vypocet)').show();
	};
	try{
		TW_Calc.TWCalcMyinfo.launch();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWCalcMyinfo.launch)').show();
	};
	try{
		TW_Calc.TWDuelCalc.launch();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWDuelCalc.launch)').show();
	};
	try{
		TW_Calc.TWDuelCalc.vypocet();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWDuelCalc.vypocet)').show();
	};
	try{
		TW_Calc.TWDuelCalc.vypocet2();
	}catch(e){
		new TW_Calc.Error(e,'launch(TWDuelCalc.vypocet2)').show();
	};
	try{
		TW_Calc.duel_list.launch();
	}catch(e){
		new TW_Calc.Error(e,'launch(duel_list.launch)').show();
	};
	try{
		TW_Calc.duel_list.f.css();
	}catch(e){
		new TW_Calc.Error(e,'launch(duel_list.f.css)').show();
	};
	try{
		TW_Calc.Settings.launch();
	}catch(e){
		new TW_Calc.Error(e,'launch(Settings.launch)').show();
	};
	$(".tw2gui_window_tab._tab_id_twcalc6").click(function(){
	TW_Calc.duel_list.f.duel_table();
	});
	$(".tw2gui_window_tab._tab_id_twcalc5").click(function(){
		TW_Calc.import_inf();
	});
	$(".tw2gui_window_tab._tab_id_twcalc8").click(function(){
		TW_Calc.TombolaExporter.Tab.launch();
	});
};
	
TW_Calc.launch_card = function(){
		var notepad_text=localStorage.getItem("TWCalc_notepad");
		document.getElementById("TW_Calc_Block").innerHTML=notepad_text;
};
	
TW_Calc.budik = function(){
	var title=TW_Calc.lang.lang_83;
	var mytime=localStorage.getItem("TWCalc_budik");
	var note=(new Boolean(localStorage.getItem("TWCalc_alarm"))!=false ? localStorage.getItem("TWCalc_alarm"): "-");
	var hudba=localStorage.getItem("TWCalc_budik_sound");
	datum = new Date();
	mo = datum.getMonth() + 1;
	d = datum.getDate();
	h = datum.getHours();
	m = datum.getMinutes();
	if (m < 10) m = "0" + m;
	if (h < 10) h = "0" + h;
	if (mo < 10) mo = "0" + mo;
	if (d < 10) d = "0" + d;
	var actualtime =d+"."+mo+". "+h+":"+m;
	var msg = '<div><embed src="'+hudba+'" autostart="true" width="0" height="0"><span>'+TW_Calc.lang.lang_82+'</span>:<span>'+actualtime+'</span><br /><span>'+TW_Calc.lang.lang_81+'</span><br /><span>'+note+'</span></div>';
	if(mytime==actualtime){
		new west.gui.Dialog(title,msg,west.gui.Dialog.SYS_WARNING).addButton('ok', function(){}).show();
		localStorage.setItem("TWCalc_budik", "");
	}
};

TW_Calc.exp_hp_enrgy = function(){
	var rozdiel= Character.getExperience4Level() - Character.getMaxExperience4Level();
	var rozdiel1='('+rozdiel+')';
	if(Boolean(rozdiel)==false){
		rozdiel1='';
	}
	$('#ui_experience_bar').addMousePopup(TW_Calc.lang.lang_103+':'+' '+Character.getExperience4Level()+' / '+Character.getMaxExperience4Level()+' '+rozdiel1);
	var regen_hp = Character.healthRegen * Character.maxHealth;var hp_max = Character.maxHealth;
	var actual_hp = Character.health;
	var hp_left = hp_max - actual_hp;
	var hp_time = hp_left / regen_hp;
	var hp_hour = Math.floor(hp_time);
	var hp_minute = Math.floor((hp_time - hp_hour) * 60);
	var rozdiel_zdravia = Character.health-Character.maxHealth;
	$('#ui_character_container > .health_bar').text(Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+')').addMousePopup(TW_Calc.lang.lang_98+': '+Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+'), '+TW_Calc.lang.lang_104+' '+hp_hour+' '+TW_Calc.lang.lang_101+' '+hp_minute+' '+TW_Calc.lang.lang_102);
	var regen_energy=0.03;
	if(regen_energy===Character.energyRegen){
		regen_energy=3;
	};
	if(regen_energy<Character.energyRegen){
		regen_energy=Math.floor(Character.energyRegen*100);
	};
	var energy = Character.energy;
	var energy_max = Character.maxEnergy;
	var energy_left = energy_max - energy;
	var c = Character.energyRegen * 100;
	var time = energy_left / regen_energy;
	var hour = Math.floor(time);
	var minute = Math.floor((time - hour) * 60);
	var rozdiel_energie = Character.energy-Character.maxEnergy;
	$('#ui_character_container > .energy_bar').text(Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+')').addMousePopup('Energia: '+Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+'), '+TW_Calc.lang.lang_100+': '+hour+' '+TW_Calc.lang.lang_101+' '+minute+' '+TW_Calc.lang.lang_102);
};
	
TW_Calc.addCalcFees = function(){
	var bank_fee= $("#amount").val() /100 * BankWindow.Transfer.fee;
	var transfered_amout =  $("#amount").val() - bank_fee;
	bank_fee = Math.round(bank_fee);
	transfered_amout = Math.round(transfered_amout);
	$('div.bank-transfer-info div.tw2gui_groupframe_content_pane',BankWindow.DOM).empty().append(s(TW_Calc.lang.lang_105+': '+BankWindow.Transfer.fee+'% <span style="font-size: 9px">('+TW_Calc.lang.lang_106+': -$ '+bank_fee+', '+TW_Calc.lang.lang_107+': $ '+transfered_amout+')</span>'));
};
	
TW_Calc.addCalcFee = function(){
	try{
		TW_Calc.addCalcFees();
	}catch(e){}
};
	
TW_Calc.info = {
	open_forum:"'http://forum.the-west.sk/member.php?u=6556'",
	open_twcalc:"'http://tw-calc.net/'",
	name:"The-West Calc",
	actualtime: function(){
		datum = new Date();
		mo = datum.getMonth() + 1;
		d = datum.getDate();
		h = datum.getHours();
		m = datum.getMinutes();
		if(m < 10) m = "0"+m;
		if(h < 10) h = "0"+h;
		if(mo < 10) mo = "0"+mo;
		if(d < 10) d = "0"+d;
		var actualtime =d+"."+mo+". "+h+":"+m;
		return actualtime;
	}
};

TW_Calc.tabs = {
	tab:{
	Tab1_name:"Libreta notas",
	Tab2_name:"Calc. Batallas",
	Tab3_name:"Mis Estad. Batalla",
	Tab4_name:"Calc. Duelos",
	Tab5_name:"Importar",
	Tab6_name:"Lista Duelos",
	Tab7_name:"Ajustes",
	Tab8_name:"Tómbola",		
	}
};
	
TW_Calc.main = {
	zaskrtni: function(id_prvku){
		if(document.getElementById(id_prvku).className == "tw2gui_checkbox"){
			$("#"+id_prvku).addClass("tw2gui_checkbox_checked");
		}else{
			$("#"+id_prvku).removeClass("tw2gui_checkbox_checked");
		}
	},
	zaskrtni_radio: function(id_prvku, id_prvku2, id_prvku3, id_prvku4){
		if(document.getElementById(id_prvku).className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){
			document.getElementById(id_prvku).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked";
		}
		document.getElementById(id_prvku2).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
		document.getElementById(id_prvku3).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
		document.getElementById(id_prvku4).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
	},
};

TW_Calc.TWBattleCalc = new Object();

TW_Calc.TWBattleCalc.launch = function(){
	var Tab1='<span style="font-weight:bold;font-size:large;">'+TW_Calc.lang.lang_4+'</span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_7+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t3 || 0)+'" id="t3"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_29+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t11 || 0)+'" id="t11"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_8+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t4 || 0)+'" id="t4"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_6+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t2 || 0)+'" id="t2"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_9+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t5 || 0)+'" id="t5"></span></span></span></br><span style="display:inline-block;font-weight:bold;width:100px;">'+TW_Calc.lang.lang_5+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t1 || 0)+'" id="t1"></span></span></span>';
	var Tab2='<span style="font-weight:bold;font-size:large;color:black;width:190px;">'+TW_Calc.lang.lang_34+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_gg" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_gg\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_10+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_shawl" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_shawl\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_11+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_knife" style="padding-right:5px" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_knife\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_12+'</span></br><div class="tw2gui_checkbox" style="padding-right:5px" id="TWcalc_checkobox_nb" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_nb\')"></div><span style="font-weight:bold;">'+TW_Calc.lang.lang_139+'</span></br><span style="display:inline-block;font-weight:bold;width:170px;">'+TW_Calc.lang.lang_18+'</span><div id="tw_calc_combox" style="display:inline-block"></div></br><div style="padding-right:5px" class="tw2gui_checkbox" id="TWcalc_checkobox_tower" onclick="TW_Calc.main.zaskrtni(\'TWcalc_checkobox_tower\')"></div><span style="font-weight:bold;display:inline-block;font-weight: width:230px;">'+TW_Calc.lang.lang_20+'</span><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_141+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="0" id="weapon_dmg"></span></span></span></br>';
	var worker='<div id="radio_worker1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker1\', \'radio_worker2\', \'radio_worker3\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_worker2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker2\', \'radio_worker1\', \'radio_worker3\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_worker3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_worker3\', \'radio_worker1\', \'radio_worker2\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_2+'"></div>';
	var soldier='<div id="radio_soldier1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier1\', \'radio_soldier2\', \'radio_soldier3\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_soldier2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier2\', \'radio_soldier1\', \'radio_soldier3\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_soldier3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="TW_Calc.main.zaskrtni_radio(\'radio_soldier3\', \'radio_soldier1\', \'radio_soldier2\')" style="padding-left: 6px;" title="'+TW_Calc.lang.lang_2+'"></div>';
	var button='<div class="tw2gui_button" style="width:100%;margin-bottom: 10px;" onclick="TW_Calc.TWBattleCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button" class="textart_title" style="font-weight:bold;">'+TW_Calc.lang.lang_27+'</div></div>';
	var Tab3='<span style="font-weight:bold; font-size:large;width:190px;">'+TW_Calc.lang.lang_32+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_30+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TW_Calc.functions.cookie.data.t12 || 1)+'" id="t12"></span></span></span></br><img src="/images/class_choose/class_soldier.png" style="margin-right: 5px"><span style="font-weight:bold;display:inline-block;width:150px">'+TW_Calc.lang.lang_13+'</span>'+soldier+'</br><img src="/images/class_choose/class_worker.png" style="margin-right: 5px;"><span style="font-weight:bold;display:inline-block;width:150px">'+TW_Calc.lang.lang_19+'</span>'+worker+'</br></div>';
	var Tab4='<span style="font-weight:bold; font-size:large;color:red;width:100px;">'+TW_Calc.lang.lang_31+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><img src="/images/fort/battle/attacker_primary.png"></span></span><span id="t6">0</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_58+'</span></br><span style="display:inline-block;font-weight:bold; width:20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t7">0</span></br><span style="font-weight:bold;font-size:large;color:blue;width:100px;">'+TW_Calc.lang.lang_33+'</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><img src="/images/fort/battle/attacker_primary.png"></span><span id="t8">0</span></br><span style="display:inline-block;font-weight:bold;width:150px;">'+TW_Calc.lang.lang_15+'</span></br><span style="display:inline-block;font-weight:bold;width:20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t9">0</span></br><span style="display:inline-block;font-weight:bold;font-size:large;width:150px;">'+TW_Calc.lang.lang_28+'</span></br><span id="t10">0</span></br><span style="display:inline-block;font-weight:bold;font-size:large;width:150px;">'+TW_Calc.lang.lang_140+'</span></br><span style="display:inline-block;font-weight:bold;width:80px;">'+TW_Calc.lang.lang_31+'</span><span id="odpor1">0</span></br><span style="display:inline-block;font-weight:bold;width:80px;">'+TW_Calc.lang.lang_33+'</span><span id="odpor2">0</span><span style="display:inline-block;font-weight:bold;font-size:large;width:250px;">'+TW_Calc.lang.lang_141+'</span></br><span id="damage1">0</span>';
	var html='<div id="Tab1" style="position: relative;"></div>'+'<div id="Tab3" style="position: relative;"></div>'+'<div id="Tab2" style="position:relative;"></div>';
	var html2='<div id="Tab4" style="position: relative;">'+button+'</div>';
	$("#battle_calc").html("<div id='div1' style='width: 350px;height: 100%;position: absolute; top: 0px;  left: 0px;'></div><div id='div2' style='width: 340px;height: 100%;position: absolute;  top: 0px;  right: 0px;'></div>");
	$("#battle_calc>#div1").append(new west.gui.Scrollpane().appendContent(html).getMainDiv())
	$("#battle_calc>#div2").append(new west.gui.Scrollpane().appendContent(html2).getMainDiv());
	$("#battle_calc>#div1>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane>div#Tab1").append(new west.gui.Groupframe().appendToContentPane(Tab1).getMainDiv());
	$("#battle_calc>#div1>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane>div#Tab2").append(new west.gui.Groupframe().appendToContentPane(Tab2).getMainDiv());
	$("#battle_calc>#div1>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane>div#Tab3").append(new west.gui.Groupframe().appendToContentPane(Tab3).getMainDiv());
	$("#battle_calc>#div2>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane>div#Tab4").prepend(new west.gui.Groupframe().appendToContentPane(Tab4).getMainDiv());
	var combox=new west.gui.Combobox('TWCalc_Place').setWidth(100).addItem(1,TW_Calc.lang.lang_21).addItem(2,TW_Calc.lang.lang_22).addItem(3,TW_Calc.lang.lang_23).addItem(4,TW_Calc.lang.lang_24).addItem(5,TW_Calc.lang.lang_25).addItem(6,TW_Calc.lang.lang_26).select(1).getMainDiv();$("#tw_calc_combox").append(combox);jQuery('#t1').change(function(){ TW_Calc.functions.cookie.data.t1 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t2').change(function(){ TW_Calc.functions.cookie.data.t2 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t3').change(function(){ TW_Calc.functions.cookie.data.t3 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t4').change(function(){ TW_Calc.functions.cookie.data.t4 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t5').change(function(){ TW_Calc.functions.cookie.data.t5 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t11').change(function(){ TW_Calc.functions.cookie.data.t11 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); }); jQuery('#t12').change(function(){ TW_Calc.functions.cookie.data.t12 = jQuery(this).val() * 1; TW_Calc.functions.cookie.save(); });
};
	
TW_Calc.TWBattleCalc.vypocet = function(){
	var BHP = 10;
	if($("#radio_soldier2").hasClass("tw2gui_checkbox_checked")){BHP=15};
	if($("#radio_soldier3").hasClass("tw2gui_checkbox_checked")){BHP=20};
	var HPskills = Number($('#t11').val());
	var HP = 90 + (HPskills*BHP) + (Number(t12.value) * 10);
	var a = Number($('#t1').val());
	var c = Math.pow(Number($('#t1').val()), 0.5);
	var f = Math.pow(Number($('#t2').val()), 0.6);
	var i = Math.pow(Number($('#t3').val()), 0.6);
	var l = Math.pow(Number($('#t4').val()), 0.4);
	var o = Math.pow(Number($('#t5').val()), 0.4);
	var odpor1=Math.round(300 * Number($('#t3').val()) / HP * 100)/100;
	var odpor2=Math.round(300 * Number($('#t2').val()) / HP * 100)/100;
	var damage1=Number(weapon_dmg.value);
	var damage2=Number(weapon_dmg.value) * Number(Number($('#t1').val())) / HP;
	var damage3=Math.round(Number(damage1) + Number(damage2));
	var GG = 0;var PlaceDef = 0; var PlaceOf = 0;
	switch(Number(document.getElementById("TWCalc_Place_value").value)){
		case 1:
			PlaceOf=0; PlaceDef=0;
		break;
		case 2:
			PlaceOf=15; PlaceDef=11;
		break;
		case 3:
			PlaceOf=21; PlaceDef=15;
		break;
		case 4:
			PlaceOf=24; PlaceDef=18;
		break;
		case 5:
			PlaceOf=27; PlaceDef=20;
		break;
		case 6:
			PlaceOf=28; PlaceDef=21;
		break;
	};
	var VBBB=100;
	var CharBonus=0;
	if($("#TWcalc_checkobox_tower").hasClass("tw2gui_checkbox_checked")==false){
		CharBonus=0;
	}else{
		CharBonus=PlaceDef+0;
	}
	var BuilderBonus = 0;
	var BuilderBonus1 = 0;
	if($("#radio_worker1").hasClass("tw2gui_checkbox_checked")){BuilderBonus=PlaceDef/100*0};
	if($("#radio_worker2").hasClass("tw2gui_checkbox_checked")){uilderBonus=PlaceDef/100*30};
	if($("#radio_worker3").hasClass("tw2gui_checkbox_checked")){BuilderBonus=PlaceDef/100*60};
	if($("#radio_worker1").hasClass("tw2gui_checkbox_checked")){BuilderBonus1=PlaceOf/100*0};
	if($("#radio_worker2").hasClass("tw2gui_checkbox_checked")){BuilderBonus1=PlaceOf/100*30};
	if($("#radio_worker3").hasClass("tw2gui_checkbox_checked")){BuilderBonus1=PlaceOf/100*60};
	var VBBB = 100;
	if($("#radio_soldier1").hasClass("tw2gui_checkbox_checked")){VBBB=100};
	if($("#radio_soldier2").hasClass("tw2gui_checkbox_checked")){VBBB=125};
	if($("#radio_soldier3").hasClass("tw2gui_checkbox_checked")){VBBB=150};
	var VBB = a/100*VBBB; var VB = Math.pow(VBB, 0.5) - Math.pow(a, 0.5)
	if($("#TWcalc_checkobox_gg").hasClass("tw2gui_checkbox_checked")==false) GG=0; else GG = 5;
	if($("#TWcalc_checkobox_shawl").hasClass("tw2gui_checkbox_checked")==false) S=0; else S = 5;
	if($("#TWcalc_checkobox_knife").hasClass("tw2gui_checkbox_checked")==false) SHK=0; else SHK = 2;
	if($("#TWcalc_checkobox_nb").hasClass("tw2gui_checkbox_checked")==false){
		var uszP=0;
		var usuP=0;
		var oszP=0;
		var osuP=0;
	}else{
		var uszP=(25 + c + o + i)/100*3;
		var usuP=(10 + c + l + i)/100*3;
		var oszP=(25 + c + o + f)/100*3;
		var osuP=(10 + c + l + f)/100*3;
	}
	var usz = 25 + c + o + i + GG + SHK + VB + PlaceOf + CharBonus + BuilderBonus1 + uszP;
	var usu = 10 + c + l + i + GG + S + SHK + VB + PlaceDef + CharBonus + BuilderBonus + usuP;
	var osz = 25 + c + o + f + GG + SHK + VB + PlaceOf + CharBonus + BuilderBonus1 + oszP;
	var osu = 10 + c + l + f + GG + S + SHK + VB + PlaceDef + CharBonus + BuilderBonus + osuP;
	document.getElementById("t10").innerHTML=" "+HP+" HP";
	document.getElementById("t6").innerHTML=" "+usz+" ";
	document.getElementById("t7").innerHTML=" "+usu+" ";
	document.getElementById("t8").innerHTML=" "+osz+" ";
	document.getElementById("t9").innerHTML=" "+osu+" ";
	document.getElementById("odpor1").innerHTML=" "+odpor1+" ";
	document.getElementById("odpor2").innerHTML=" "+odpor2+" ";
	document.getElementById("damage1").innerHTML=" "+damage3+" ";
};

TW_Calc.functions = new Object();
	
TW_Calc.functions.edit_note = function(){
	var zrus=function(){};
	var ok = function(){
		var poznamka=document.getElementById("tw_calc_note").value;
		localStorage.setItem("TWCalc_alarm", poznamka);
		MessageSuccess(TW_Calc.lang.lang_96).show();
	};
	if(new Boolean(localStorage.getItem("TWCalc_alarm"))!=false){
		var p=localStorage.getItem("TWCalc_alarm");
	}else{
		var p ='';
	}
	new west.gui.Dialog(TW_Calc.lang.lang_93,'<span class="tw2gui_textarea" style="display:inline-block;"><div class="tw2gui_bg"></div><div class="tw2gui_bg_tl"></div><div class="tw2gui_bg_br"></div><div class="tw2gui_bg_tr"></div><div class="tw2gui_bg_bl"></div><div class="tw2gui_textarea_wrapper"><textarea id="tw_calc_note" style="width:380px;height:100px;">'+p+'</textarea></div></span>').addButton('ok', ok).addButton(TW_Calc.lang.lang_92, zrus).show();
};

TW_Calc.functions.budik = function(){
	var all_text = document.getElementById("Wt3").value;
	localStorage.setItem("TWCalc_budik", all_text);
	all_text.toString();
	var status = true;
	if(all_text.charAt(2)!='.'){status = false;}
	if(all_text.charAt(5)!="."){status = false;}
	if(all_text.charAt(9)!=":"){status = false;};
	if(all_text.charAt(6)!=" "){status = false;};
	if(Number(all_text.substr(0,2))>31){status = false;};
	if(Number(all_text.substr(3,2))>12){status = false;};
	if(Number(all_text.substr(7,2))>23){status = false;};
	if(Number(all_text.substr(10,2))>59){status = false;};
	if(status==true){
		MessageSuccess(TW_Calc.lang.lang_91).show();
	}else{
		MessageError(TW_Calc.lang.lang_90).show();
	};
};

TW_Calc.functions.save_notepad_text = function(){
	var all_text = document.getElementById("TW_Calc_Block").value;
	localStorage.setItem("TWCalc_notepad", all_text);
	MessageSuccess(TW_Calc.lang.lang_88).show();
};

TW_Calc.functions.confirm_deleting = function(){
	var ok = function(){TW_Calc.functions.delete_notepad_text()};
	new west.gui.Dialog(TW_Calc.lang.lang_131,TW_Calc.lang.lang_123).addButton('ok', ok).addButton('cancel').show();
};

TW_Calc.functions.delete_notepad_text = function(){
	localStorage.setItem("TWCalc_notepad", "");
	document.getElementById("TW_Calc_Block").value = "";
	MessageSuccess(TW_Calc.lang.lang_89).show();
};

TW_Calc.functions.settings = function(){
	var budik1 = localStorage.getItem("TWCalc_budik_sound");
	if(budik1 == null){budik1 = '';}
	if(budik1 == "http://www.tw-calc.net/script/budik.mp3"){budik1="Alarm1";}
	if(budik1 == "http://www.tw-calc.net/script/budik2.mp3"){budik1="Alarm2";}
	var ok = function(){
		var all_text1 = document.getElementById("tw_calc_budik").value;
		localStorage.setItem("TWCalc_budik_sound", all_text1);
		if(all_text1 =="Alarm1"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik.mp3");}
		if(all_text1 =="Alarm2"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik2.mp3");}
		MessageSuccess(TW_Calc.lang.lang_96).show();
	}
	var zrus = function(){}
	var msg = '<div><span>'+TW_Calc.lang.lang_94+'<span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" id="tw_calc_budik" size="20" value="'+budik1+'"></span></span></span></br><span>'+TW_Calc.lang.lang_95+'</span></div></br><span>'+TW_Calc.lang.lang_97+'</span>';
	new west.gui.Dialog(TW_Calc.lang.lang_93,msg).addButton('ok', ok).addButton(TW_Calc.lang.lang_92, zrus).show();
};

TW_Calc.functions.cookie = {
	data: {},
	save: function(){
		var date = new Date();
		date.setFullYear(date.getFullYear()+1);
		document.cookie = 'TWCalc='+encodeURIComponent(JSON.stringify(this.data))+'; expires='+date.toUTCString();
	},
	load: function(){
		this.data = JSON.parse(decodeURIComponent(((document.cookie+';').match(/TWCalc=([^;]*);/) || {})[1] || "%7B%7D"));
	}
};

TW_Calc.functions.isWearing = function(id){
	return WearSet.hasItem(id);
};

TW_Calc.TWCalcMyinfo = new Object();
	
TW_Calc.TWCalcMyinfo.launch = function(){
	TW_Calc.functions.cookie.load();
	var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus();
	var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus();
	var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus();
	var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();
	var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus();
	var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
	document.getElementById("twcalc_vytrvalost_value").innerHTML=" "+vytrvalost+" ";
	document.getElementById("twcalc_uhybanie_value").innerHTML=" "+uhybanie+" ";
	document.getElementById("twcalc_skryvanie_value").innerHTML=" "+skryvanie+" ";
	document.getElementById("twcalc_presnost_value").innerHTML=" "+presnost+" ";
	document.getElementById("twcalc_vodcovstvo_value").innerHTML=" "+vodcovstvo+" ";
	document.getElementById("twcalc_zdravie_value").innerHTML=" "+zdravie+" ";
	var vod = Math.pow(vodcovstvo, 0.5);
	var vyt = Math.pow(vytrvalost, 0.6);
	var skr = Math.pow(skryvanie, 0.6);
	var uhy = Math.pow(uhybanie, 0.4);
	var pre = Math.pow(presnost, 0.4);
	var HP = Character.maxHealth;
	var VBB = 0;
	var VB = 0;
	var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.5) - Math.pow(vodcovstvo, 0.5);
	if(TW_Calc.functions.isWearing(136)){
		var Golden_gun = 5;
	}else{
		var Golden_gun = 0;
	};
	if(TW_Calc.functions.isWearing(576)){
		var MR_Shawl = 5;
	}else{
		var MR_Shawl = 0;
	};
	if(TW_Calc.functions.isWearing(59)){
		var SHKnife = 2;
	}else{
		var SHKnife = 0;
	};
	if(TW_Calc.functions.isWearing(41029) && TW_Calc.functions.isWearing(42017) && TW_Calc.functions.isWearing(40058) && TW_Calc.functions.isWearing(11191) && TW_Calc.functions.isWearing(10202) && TW_Calc.functions.isWearing(491)){
		var o = 35;	
	}else{
		var o=0;
	}
	var odpor1 = Math.round(((300 * CharacterSkills.skills['endurance'].getPointsWithBonus() / Character.maxHealth) + o) * 100) / 100;
	var odpor2 = Math.round(((300 * CharacterSkills.skills['hide'].getPointsWithBonus() / Character.maxHealth) + o) * 100) / 100;
	if(Wear.loaded==true && Wear.get("left_arm")!=undefined){
		var damagemax=Wear.get("left_arm").obj.damage.damage_max;
		var damagemin=Wear.get("left_arm").obj.damage.damage_min;
	}else{
		var damagemax=110;
		var damagemin=55			
	}
	var dmg = (TW_Calc.functions.isWearing(41028) && TW_Calc.functions.isWearing(42016) && TW_Calc.functions.isWearing(40057) && TW_Calc.functions.isWearing(11190) && TW_Calc.functions.isWearing(10201) && TW_Calc.functions.isWearing(490) ? 35 : 0) + (TW_Calc.functions.isWearing(68) && TW_Calc.functions.isWearing(152) ? 30 : 0) + (TW_Calc.functions.isWearing(879) && TW_Calc.functions.isWearing(152) ? 30 : 0) + (TW_Calc.functions.isWearing(898) && TW_Calc.functions.isWearing(186) ? 25 : 0) + (TW_Calc.functions.isWearing(895) && TW_Calc.functions.isWearing(183) ? 15 : 0) + (TW_Calc.functions.isWearing(90) && TW_Calc.functions.isWearing(186) ? 25 : 0) + (TW_Calc.functions.isWearing(87) && TW_Calc.functions.isWearing(183) ? 15 : 0) + (TW_Calc.functions.isWearing(136) ? 15 : 0);
	var dmg1= Math.round((damagemin + (damagemin * vodcovstvo / Character.maxHealth) + dmg));
	var dmg2= Math.round((damagemax + (damagemax * vodcovstvo / Character.maxHealth) + dmg));
	var Ausz = Math.round((25 + vod + vyt + pre + VB + Golden_gun + SHKnife) * 100) / 100;
	var Ausu = Math.round((10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl) * 100) / 100;
	var Aosz = Math.round((25 + vod + skr + pre + VB + Golden_gun + SHKnife) * 100) / 100;
	var Aosu = Math.round((10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl) * 100) / 100;
	document.getElementById("tw_t6").innerHTML=" "+Ausz+" ";
	document.getElementById("tw_t7").innerHTML=" "+Ausu+" ";
	document.getElementById("tw_t8").innerHTML=" "+Aosz+" ";
	document.getElementById("TW_t9").innerHTML=" "+Aosu+" ";
	document.getElementById("TW_t10").innerHTML=" "+HP+" ";
	document.getElementById("TWCalc_name").innerHTML=" "+Character.name+" (id= "+Character.playerId+")";
	function my_charClass(){
		switch(Character.charClass){
			case "greenhorn": var char_class = TW_Calc.lang.lang_38; break;
			case "soldier": var char_class = TW_Calc.lang.lang_41; break;
			case "duelist": var char_class = TW_Calc.lang.lang_39; break;
			case "worker":  var char_class = TW_Calc.lang.lang_42; break;
			case "adventurer": var char_class = TW_Calc.lang.lang_40; break;
		};
		return char_class;
	};
	document.getElementById("tw_odpor1").textContent = " "+odpor1;
	document.getElementById("tw_odpor2").textContent = " "+odpor2;
	document.getElementById("TW_dmg_weapon").textContent = " "+dmg1+' - '+dmg2;
	document.getElementById("TWCalc_charclass").textContent = my_charClass();
	document.getElementById("TWCalc_charclass").innerHTML=" "+my_charClass()+" ";
	document.getElementById("TWCalc_level").innerHTML=" "+Character.level+" ";
	document.getElementById("TWCalc_server_info").innerHTML=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
	var worldinfo = window.location.host.split('.',1)[0];
	$("#TWCalc_battle_bbcode").val("[QUOTE][LIST][*][B]"+TW_Calc.lang.lang_43+":[/B] "+Character.name+"[*][B]"+TW_Calc.lang.lang_44+":[/B] "+worldinfo+" "+Game.worldName+",   ("+window.location.host+")[*][B]"+TW_Calc.lang.lang_45+":[/B] "+Character.level+"[*][B]"+TW_Calc.lang.lang_46+":[/B] "+Character.charClass+"[*]â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢[*][B]"+TW_Calc.lang.lang_47+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Ausz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Ausu+"[*][B]"+TW_Calc.lang.lang_48+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Aosz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Aosu+"[*][B]"+TW_Calc.lang.lang_49+":[/B]"+HP+"[/LIST][/QUOTE]");
};

TW_Calc.Settings = new Object();	
	
TW_Calc.Settings.launch = function(){
	try{
		var div = "#TW_Calc_Api_Card";
		$(div).empty();
		var i = 0;
		for(i;i < TW_Calc.Settings.list.length;i++){
			$(div).append(new west.gui.Checkbox().setId(TW_Calc.Settings.list[i][0]).setSelected(TW_Calc.Settings.get(TW_Calc.Settings.list[i][0])).getMainDiv()).append('&nbsp;'+TW_Calc.Settings.list[i][1]+'</br>');
		}
		$(div).append('</br>');
		$(div).append(new west.gui.Button().setCaption(TW_Calc.lang.lang_36).click(function(){TW_Calc.Settings.save()}).getMainDiv());
		$(div).append(new west.gui.Button().setCaption(TW_Calc.lang.lang_62).click(function(){TW_Calc.functions.settings()}).getMainDiv());
		$(div).append(new west.gui.Button().setCaption(TW_Calc.lang.lang_152).click(function(){TW_Calc.nearestJob.open()}).getMainDiv());
		$(div).append(new west.gui.Button().setCaption('Errorlog').click(function(){TW_Calc.ErrorLog.open()}).getMainDiv());
		$(div).append('</br><div style="margin-top:5px;font-weight:bold;">Translated by '+TW_Calc.lang.translator+'.&nbsp; Thanks for Translation! :) Script version: '+TW_Calc.version+'</div>');
	}catch(e){new TW_Calc.Error(e,'Settings.launch').show()};
};

TW_Calc.Settings.open = function(){
	try{
		TW_Calc.launch();
		TW_Calc.showTab('twcalc7');
	}catch(e){
		new TW_Calc.Error(e,'Settings.open').show();
	};
};

TW_Calc.Settings.get = function(name){
	try{
		if(new Boolean(localStorage.getItem("TWCalc_Settings"))!=false){
			var data = localStorage.getItem("TWCalc_Settings");
			data = $.parseJSON(data);
			if(data.hasOwnProperty(name)){
				return data[name];
			}else{
				return true;
			}
		}else{	
				return true;
		}
	}catch(e){
		new TW_Calc.Error(e,'Settings.get').show()
	};
};

TW_Calc.Settings.save = function(){
	try{
		var i = 0;
		function val(d){
			var selector = "#"+d+".tw2gui_checkbox";
			if($(selector).hasClass("tw2gui_checkbox_checked")){
				return true;
			}else{
				return false;
			}
		}
		var data = '{';
		for(i;i < TW_Calc.Settings.list.length;i++){
			data+='"'+TW_Calc.Settings.list[i][0]+'":'+val(TW_Calc.Settings.list[i][0])+'';
			if(i!=(TW_Calc.Settings.list.length - 1)){
				data+=',';
			}
		}
		data+='}';
		localStorage.setItem("TWCalc_Settings",data);
		MessageSuccess(TW_Calc.lang.lang_88).show();
	}catch(e){
		new TW_Calc.Error(e,'Settings.save').show();
	};
};
	
TW_Calc.TWDuelCalc = new Object();	

TW_Calc.TWDuelCalc.launch = function(){
	try{
		TW_Calc.functions.cookie.load();
		jQuery('#twcalc_duel_level').change(function(){
			TW_Calc.functions.cookie.data.level = jQuery(this).val() * 1;
			TW_Calc.functions.cookie.save();
		});
		jQuery('#twcalc_duel_level1').change(function(){
			TW_Calc.functions.cookie.data.level1 = jQuery(this).val() * 1;
			TW_Calc.functions.cookie.save();
		});
		jQuery('#twcalc_duel_level2').change(function(){
			TW_Calc.functions.cookie.data.level2 = jQuery(this).val() * 1;
			TW_Calc.functions.cookie.save();
		});
		jQuery('#twcalc_duel_motivation').change(function(){
			TW_Calc.functions.cookie.data.motivation = jQuery(this).val() * 1;
			TW_Calc.functions.cookie.save();
		});
	}catch(e){
		new TW_Calc.Error(e,'TWDuelCalc.launch').show();
	};
};

TW_Calc.TWDuelCalc.vypocet = function(){
	var levelval = Number($("#twcalc_duel_level").val());
	var maxduel = (7*levelval-1)/5;
	var minduel = (5*levelval-1)/7;
	var maxduel2 = Math.round(maxduel);
	var minduel2 = Math.round(minduel);
	if(minduel2 < 1){
		var minduel1 = 1;
	}else{
		var minduel1 = minduel2;
	};
	$("#TWCalc_maxduellevel").html(" "+maxduel2+" ");
	$("#TWCalc_minduellevel").html(" "+minduel1+" ");
};

TW_Calc.TWDuelCalc.vypocet2 = function(){
	var level1 = Number($("#twcalc_duel_level1").val());
	var level2 = Number($("#twcalc_duel_level2").val());
	var motivation = Number($("#twcalc_duel_motivation").val());
	var exp3 = (( 7 * level2 ) - ( 5 * level1 ) + 5) *( motivation / 100 );
	var exp = (( 7 * level2 ) - ( 5 * level1 ) + 5) * 3 *( motivation / 100 );
	var exp1 = Math.round(exp);
	var exp2 = Math.round(exp3);
	$("#TWCalc_exp").html(" "+TW_Calc.lang.lang_86+" "+exp1+" "+TW_Calc.lang.lang_87+" "+exp2+" "+TW_Calc.lang.lang_110+" ");
};
	
TW_Calc.import_inf = function(){
	$("#tab_twcalc5").html('<div style="position:absolute;top:15px;width:699px;height:340px;border:none;background-color:transparent;text-align:center"><h1><strong><font><b>Waiting for '+window.location.origin+'...</b></font></strong></h1></div>');
	var w = {};
	for(var t in Wear.wear) w[Wear.wear[t].obj.item_id]=1;
	for(var t in Bag.items)
	for(var i in Bag.items[t])
	w[i] = (w[i] || 0) + Bag.items[t][i].count;
	TW_Calc.importInvString = JSON.stringify(w).replace("{", "").replace("}", "").replace(/['"]+/g, '');
	$.getJSON("/game.php?window=crafting",complete=function(data){
		var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus();
		var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus();
		var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus();
		var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();
		var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus();
		var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
		var vod = Math.pow(vodcovstvo, 0.5);
		var vyt = Math.pow(vytrvalost, 0.6);
		var skr = Math.pow(skryvanie, 0.6);
		var uhy = Math.pow(uhybanie, 0.4);
		var pre = Math.pow(presnost, 0.4);
		var HP = Character.maxHealth;
		var VBB = 0;
		var VB = 0;
		var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.4) - Math.pow(vodcovstvo, 0.4);
		if(TW_Calc.functions.isWearing(136)){
			var Golden_gun = 5;
		}else{
			var Golden_gun = 0;
		};
		if(TW_Calc.functions.isWearing(576)){
			var MR_Shawl = 5;
		}else{
			var MR_Shawl = 0;
		}; 
		if(TW_Calc.functions.isWearing(59)){
			var SHKnife = 2;
		}else{
			var SHKnife = 0;
		};
		var Ausz = 25 + vod + vyt + pre + VB + Golden_gun + SHKnife;
		var Ausu = 10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
		var Aosz = 25 + vod + skr + pre + VB + Golden_gun + SHKnife;
		var Aosu = 10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
		var serverinfo=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
		var tw_id =window.location.host.split('.',1)[0]+"-"+Character.playerId;
		if(TW_Calc.Settings.get("ImportSkills")){var zobraz = 0;}else{var zobraz = 1;};
		var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus();
		var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus();
		var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus();
		var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();
		var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus();
		var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
		if(TW_Calc.functions.isWearing(136)){
			var Golden_gun ="true";
		}else{
			var Golden_gun ="false";
		};
		if(TW_Calc.functions.isWearing(576)){
			var MR_Shawl ="true";
		}else{
			var MR_Shawl ="false";
		};
		if(TW_Calc.functions.isWearing(59)){
			var SHKnife ="true";
		}else{
			var SHKnife ="false";
		};
		$("#tab_twcalc5").html('<iframe id="importframe" style="width:699px;height:360px;border:none;background-color:transparent"></iframe>');
		var page = document.getElementById("importframe");
		var pagec=(page.contentWindow || page.contentDocument);
		var ids="";var p=0;
		if(Character.professionId!=null){
			while(Boolean(data.recipes_content[p])!=false){
				ids+=data.recipes_content[p].item_id+',';p++
			};
		}
		if(Character.avatarConfig==null){
			var avatar = '<input name="avatar_html" value="'+Character.avatar+'">';
		}else{
			var avatar = '<input name="avatar_html" value="null"><input name="accessoires_1" value="'+Character.avatarConfig.accessoires_1+'">'+'<input name="accessoires_2" value="'+Character.avatarConfig.accessoires_2+'">'+'<input name="background" value="'+Character.avatarConfig.background+'">'+'<input name="beards1" value="'+Character.avatarConfig.beards1+'">'+'<input name="beards2" value="'+Character.avatarConfig.beards2+'">'+'<input name="clothing" value="'+Character.avatarConfig.clothing+'">'+'<input name="eyes" value="'+Character.avatarConfig.eyes+'">'+'<input name="hair" value="'+Character.avatarConfig.hair+'">'+'<input name="hatsa" value="'+Character.avatarConfig.hatsa+'">'+'<input name="hatsb" value="'+Character.avatarConfig.hatsb+'">'+'<input name="head" value="'+Character.avatarConfig.head+'">'+'<input name="mouth" value="'+Character.avatarConfig.mouth+'">'+'<input name="nose" value="'+Character.avatarConfig.nose+'">'+'<input name="pose" value="'+Character.avatarConfig.pose+'">'+'<input name="skin_1" value="'+Character.avatarConfig.skin_1+'">'+'<input name="skin_2" value="'+Character.avatarConfig.skin_2+'">';
		}
		pagec.document.write('<head><meta charset="utf-8"></head><body style="background-color:transparent"><table style="width:99%;height:99%;text-align:center;font-size:28px;"><center><h1><strong><font><b>'+TW_Calc.lang.lang_159+'...</b></font></strong></center></h1></td></tr></table>'+'<form style="display:none;" name="data_post" action="http://tw-calc.net/doImport.php" method="post">'
		+'<input name="tombola_3" value="'+TW_Calc.TombolaExporter.getString(3)+'"><input name="nick" value="'+Character.name+'"><input name="level" value="'+Character.level+'"><input name="charclass" value="'+Character.charClass+'"><input name="gameworld" value="'+serverinfo+'"><input name="attack1" value="'+Ausz+'"><input name="defense1" value="'+Ausu+'"><input name="attack2" value="'+Aosz+'"><input name="defense2" value="'+Aosu+'"><input name="health" value="'+HP+'"><input name="tw_id" value="'+tw_id+'"><input name="vytrvalost" value="'+vytrvalost+'"><input name="uhybanie" value="'+uhybanie+'"><input name="skryvanie" value="'+skryvanie+'"><input name="presnost" value="'+presnost+'"><input name="vodcovstvo" value="'+vodcovstvo+'">'+'<input name="craft" value="'+Character.professionId+'">'+'<input name="craft_points" value="'+Character.professionSkill+'"><input name="health_pre_tabulku" value="'+zobraz+'"><input name="zdravie" value="'+zdravie+'"><input name="goldengun" value="'+Golden_gun+'"><input name="mrshawl" value="'+MR_Shawl+'"><input name="shknife" value="'+SHKnife+'"><input name="xp" value="'+Character.experience+'">'+avatar+'<input name="strength" value="'+CharacterSkills.attributes.strength.getPoints()+'">'+'<input name="mobility" value="'+CharacterSkills.attributes.flexibility.getPoints()+'">'+'<input name="dexterity" value="'+CharacterSkills.attributes.dexterity.getPoints()+'">'+'<input name="charisma" value="'+CharacterSkills.attributes.charisma.getPoints()+'">'+'<input name="construction" value="'+CharacterSkills.skills["build"].getPoints()+'">'+'<input name="vigor" value="'+CharacterSkills.skills["punch"].getPoints()+'">'+'<input name="toughness" value="'+CharacterSkills.skills["tough"].getPoints()+'">'+'<input name="stamina" value="'+CharacterSkills.skills["endurance"].getPoints()+'">'+'<input name="health_points" value="'+CharacterSkills.skills["health"].getPoints()+'">'+'<input name="horseback_riding" value="'+CharacterSkills.skills["ride"].getPoints()+'">'+'<input name="reflex" value="'+CharacterSkills.skills["reflex"].getPoints()+'">'+'<input name="doging" value="'+CharacterSkills.skills["dodge"].getPoints()+'">'+'<input name="hiding" value="'+CharacterSkills.skills["hide"].getPoints()+'">'+'<input name="swimming" value="'+CharacterSkills.skills["swim"].getPoints()+'">'+'<input name="aiming" value="'+CharacterSkills.skills["aim"].getPoints()+'">'+'<input name="shooting" value="'+CharacterSkills.skills["shot"].getPoints()+'">'+'<input name="setting_traps" value="'+CharacterSkills.skills["pitfall"].getPoints()+'">'+'<input name="fine_motor_skills" value="'+CharacterSkills.skills["finger_dexterity"].getPoints()+'">'+'<input name="repairing" value="'+CharacterSkills.skills["repair"].getPoints()+'">'+'<input name="leadership" value="'+CharacterSkills.skills["leadership"].getPoints()+'">'+'<input name="tactics" value="'+CharacterSkills.skills["tactic"].getPoints()+'">'+'<input name="trading" value="'+CharacterSkills.skills["trade"].getPoints()+'">'+'<input name="animal_instinct" value="'+CharacterSkills.skills["animal"].getPoints()+'">'+'<input name="appearance" value="'+CharacterSkills.skills["appearance"].getPoints()+'">'+'<input name="reciepes" value="'+ids+'">'
		+'<input name="inventory" value="'+TW_Calc.importInvString+'">'
		+'</form><script>setTimeout("document.forms.data_post.submit()", 1000);</script></body>');
	})
};

TW_Calc.duel_list = new Object();

TW_Calc.duel_list.f = new Object();

TW_Calc.duel_list.launch = function(){			
		$("#tab_twcalc6").css({height:"100%","margin-top":"6px","margin-left":"6px","margin-right":"6px"}).html(new west.gui.Scrollpane().appendContent('<div id="tab_twcalc6_scrollpane"></div>').getMainDiv())
		$("div#tab_twcalc6_scrollpane").append('<div id="duel_list" style="margin-top:5px"></div><div id="progressbar"></div>');
		$("div#progressbar").append(new west.gui.Groupframe().appendToContentPane('<div style="font-weight:bold">'+TW_Calc.lang.lang_71+'</div>').appendToContentPane(new west.gui.Progressbar(Character.duelMotivation,1).showPercentOnly(true).getMainDiv()).getMainDiv());
		TW_Calc.duel_list.f.css();				
};

TW_Calc.duel_list.f.getPlayerAlliance = function(name, callback){
	$.post('game.php?window=profile&mode=init',{name:encodeURIComponent(name)},function(r){callback.call(window, r.playerid, (r.town && r.town.alliance_id >= 0 ? r.town.alliance_id : -1), r.playername, r.level, r.duelLevel, r.town.name, r.town.town_x, r.town.town_y, r.x, r.y, r.isDuelable, r.classKey);},'json');
};
	
TW_Calc.duel_list.f.duel_table = function(){
	wman.getById("TWcalc_window_").showLoader();
	$.post('game.php?window=profile&mode=init',{name:encodeURIComponent(Character.name)},function(r){
		TW_Calc.info.level = Number(r.duelLevel);
		var maindiv = $("#duel_list");
		$(maindiv).empty();
		var table = new west.gui.Table();
		table.setId('duel_list').createEmptyMessage('Empty').appendTo(maindiv);
		table.addColumn("player_name").addColumn("player_level").addColumn("duel_level").addColumn("town").addColumn("duelable").addColumn("distance").addColumn("xp").addColumn("doduel");
		table.appendToCell('head','player_name', TW_Calc.lang.lang_43).appendToCell('head','player_level','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_30+'">').appendToCell('head','duel_level','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_114+'">').appendToCell('head','town',TW_Calc.lang.lang_118).appendToCell('head','duelable','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_115+'">').appendToCell('head','distance','<img src="'+TW_Calc.duel_list.f.obr+'" title="'+TW_Calc.lang.lang_116+'">').appendToCell('head','xp','XP'.escapeHTML()).appendToCell('head','doduel','Duel'.escapeHTML());
		table.appendToFooter('player_name',new west.gui.Button(TW_Calc.lang.lang_113,function(){TW_Calc.duel_list.f.edit();}).getMainDiv());
		table.appendToFooter('player_level',new west.gui.Button(TW_Calc.lang.lang_154,function(){DuelsWindow.open();}).getMainDiv());
		var player = "";
		if(new Boolean(localStorage.getItem("TWCalc_duellist"))!=false){
			var player = localStorage.getItem("TWCalc_duellist").split(",");
		}
		var i = 0;
		while(new Boolean(player[i])!=false){
			TW_Calc.duel_list.f.getPlayerAlliance(player[i],function(id, alliance, name, level, dlevel, town, tx, ty, x, y, isDuelable, postava){
				if(isDuelable==true){var duelable = '<img src="/images/window/dailyactivity/positive.png">';}else{var duelable = '<img src="/images/window/dailyactivity/negative.png">';}
				var distance = Character.calcWayTo(x,y); distance = distance.formatDuration();
				var xp = Math.round((( 7 * dlevel ) - ( 5 * TW_Calc.info.level ) + 5) * Character.duelMotivation * 3);
				table.appendRow().appendToCell(-1,"player_name", '<img src="images/icons/center.png" title="'+TW_Calc.lang.lang_117+'" style="cursor:pointer;margin-right:5px;margin-left:2px;" onclick="Map.center('+x+','+y+')"><img style="margin-right:2px" width="20px" src="/images/class_choose/'+postava+'.png" style=""><a href="javascript: PlayerProfileWindow.open('+id+');">'+name+'</a>').appendToCell(-1,"player_level", level).appendToCell(-1,"duel_level", dlevel).appendToCell(-1,"town", '<a href="javascript: TownWindow.open('+tx+','+ty+')">'+town+'</a>').appendToCell(-1,"duelable", duelable).appendToCell(-1,"distance", distance).appendToCell(-1,"xp", xp).appendToCell(-1,"doduel", '<a href="javascript: TaskQueue.add(new TaskDuel('+id+'));">Duel</a>');
				TW_Calc.duel_list.f.css();
			})
		var i = i + 1;
		}
		TW_Calc.duel_list.f.css();
		wman.getById("TWcalc_window_").hideLoader();
	},'json');
};	
	
TW_Calc.duel_list.f.css = function(){
	$(".cell.cell_0.name").css({"width":"50%"});
	$(".cell.cell_1.dowear").css({"width":"30%"});
	$(".cell.cell_2.deletewear").css({"width":"20%"});
	$(".cell.cell_0.player_name").css({"width":"190px"});
	$(".cell.cell_1.player_level").css({"width":"30px"});
	$(".cell.cell_2.duel_level").css({"width":"30px"});
	$(".cell.cell_3.town").css({"width":"150px"});
	$(".cell.cell_4.duelable").css({"width":"50px"});
	$(".cell.cell_5.distance").css({"width":"70px"});
	$(".cell.cell_6.xp").css({"width":"70px"});
	$(".cell.cell_7.doduel").css({"width":"40px"});
};

TW_Calc.duel_list.f.obr = "data:image/png;base64,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",
TW_Calc.duel_list.f.edit = function(){
	function zrus(){}; function save(){
		var i = 0;
		var save_text = "";
		while(new Boolean(document.getElementById("list"+i))!=false){
			var value = document.getElementById("list"+i).value;
			save_text = save_text+''+value+','; i++
		}
		localStorage.setItem("TWCalc_duellist",save_text);
		MessageSuccess(TW_Calc.lang.lang_88).show();
		TW_Calc.duel_list.f.duel_table();
	};
	if(new Boolean(localStorage.getItem("TWCalc_duellist"))!=false){
		var zoznam = localStorage.getItem("TWCalc_duellist");
		zoznam = zoznam.split(",");
	}else{
		var zoznam = "";
		var err_msg = TW_Calc.lang.lang_124;
	}
	var i = 0;
	var msg = '<div id="list_players">';
	while(new Boolean(zoznam[i])!=false){
		msg = msg+'<div id="_list'+i+'" class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield"><span><input type="text" size="50" value="'+zoznam[i]+'" id="list'+i+'"></span></span></div>';
		i++
	};
	var r = i - 1;
	new west.gui.Dialog(TW_Calc.lang.lang_113,msg+TW_Calc.duel_list.AddRemoveImg(r)+'</div>').addButton(TW_Calc.lang.lang_36, save).addButton(TW_Calc.lang.lang_92, zrus).show();
};

TW_Calc.duel_list.AddRemoveImg = function(i){
	return '<a title="'+TW_Calc.lang.lang_35+'" id="list_duels_delete" style="bottom: -20px;left: 0px;display:inline-block;margin-right:5px;background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;background-position: -48px 0px;" href="javascript: TW_Calc.duel_list.f.del('+i+')"></a><a title="'+TW_Calc.lang.lang_163+'"" id="list_duels_click" style="bottom: -20px;left: 20px;display:inline-block;margin-right:5px;background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;background-position: -16px 65px;" href="javascript: TW_Calc.duel_list.f.add('+(i + 1)+')"></a>';
}

TW_Calc.duel_list.f.add = function(i){
	var p = document.getElementById("list_players");
	$("#list_duels_delete").remove();
	$("#list_duels_click").remove();
	var a = TW_Calc.duel_list.AddRemoveImg(i);
	$("#list_players").append('<div id="_list'+i+'" class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield"><span><input type="text" size="50" value="" id="list'+i+'"></span></span></div>'+a);
	var i=i+1;
	document.getElementById("list_duels_click").href = 'javascript: TW_Calc.duel_list.f.add('+i+')';
	$("#list_players>br").remove();
};
	
TW_Calc.duel_list.f.del = function(i){
	var p = document.getElementById("list_players");
	var c = document.getElementById("_list"+i);
	p.removeChild(c);
	i = i - 1; document.getElementById("list_duels_delete").href = 'javascript: TW_Calc.duel_list.f.del('+i+')';
	var r = i + 1;
	document.getElementById("list_duels_click").href = 'javascript: TW_Calc.duel_list.f.add('+r+')';
	$("#list_players>br").remove();
};

TW_Calc.craft = new Object();
	
TW_Calc.craft.openMyProffesion = function(){
	TW_Calc.quest.window.launch();TW_Calc.quest.window.showTab('craft'+(Character.professionId - 1),function(){TW_Calc.craft.launch(Character.professionId - 1)})
};

TW_Calc.craft.professionsCache = [
	[
		{"r":"20000","o":["0","50","100"]},
		{"r":"20001","o":["0","50","100"]},
		{"r":"20002","o":["0","50","100"]},
		{"r":"20083","o":["0","100","100"]},
		{"r":"20084","o":["0","10","10"]}, 
		{"r":"20085","o":["10","20","20"]},
		{"r":"20086","o":["20","40","40"]},
		{"r":"20003","o":["50","100","100"]},
		{"r":"20004","o":["50","100","100"]},
		{"r":"20005","o":["100","150","200"]},
		{"r":"20006","o":["100","150","200"]},
		{"r":"20007","o":["100","150","200"]},
		{"r":"20008","o":["150","225","300"]},
		{"r":"20009","o":["150","225","300"]},
		{"r":"20010","o":["150","225","300"]},
		{"r":"20011","o":["250","300","300"]},
		{"r":"20012","o":["250","300","300"]},
		{"r":"20013","o":["250","300","300"]},
		{"r":"20014","o":["300","350","400"]},
		{"r":"20015","o":["350","425","500"]},
		{"r":"20016","o":["350","425","500"]},
		{"r":"20017","o":["350","425","500"]},
		{"r":"20116","o":["350","425","500"]},
		{"r":"20018","o":["400","500","500"]},
		{"r":"20120","o":["450","475","500"]},
		{"r":"20019","o":["450","500","500"]},
		{"r":"20096","o":["500","525","550"]},
		{"r":"20124","o":["500","525","550"]},
		{"r":"20097","o":["525","550","575"]},
		{"r":"20098","o":["550","575","600"]},
		{"r":"20099","o":["600","625","650"]},
		{"r":"20100","o":["600","625","650"]}
	],
	[
		{"r":"20020","o":["0","50","100"]},
		{"r":"20021","o":["0","50","100"]},
		{"r":"20022","o":["0","100","100"]},
		{"r":"20081","o":["0","50","100"]},
		{"r":"20087","o":["0","10","10"]},
		{"r":"20088","o":["10","20","20"]},
		{"r":"20089","o":["20","40","40"]},
		{"r":"20023","o":["50","100","100"]},
		{"r":"20024","o":["50","100","100"]},
		{"r":"20025","o":["100","150","200"]},
		{"r":"20026","o":["100","150","200"]},
		{"r":"20027","o":["100","150","200"]},
		{"r":"20028","o":["150","225","300"]},
		{"r":"20029","o":["150","225","300"]},
		{"r":"20030","o":["150","225","300"]},
		{"r":"20031","o":["250","300","300"]},
		{"r":"20032","o":["250","300","300"]},
		{"r":"20033","o":["250","300","300"]},
		{"r":"20034","o":["300","350","400"]},
		{"r":"20035","o":["350","425","500"]},
		{"r":"20036","o":["350","425","500"]},
		{"r":"20037","o":["350","425","500"]},
		{"r":"20119","o":["350","425","500"]},
		{"r":"20038","o":["400","500","500"]},
		{"r":"20123","o":["450","475","500"]},
		{"r":"20039","o":["450","500","500"]},
		{"r":"20101","o":["500","525","550"]},
		{"r":"20127","o":["500","525","550"]},
		{"r":"20102","o":["525","550","575"]},
		{"r":"20103","o":["500","575","600"]},
		{"r":"20104","o":["600","625","650"]},
		{"r":"20105","o":["600","625","650"]}
	],
	[
		{"r":"20040","o":["0","50","100"]},
		{"r":"20041","o":["0","50","100"]},
		{"r":"20042","o":["0","100","100"]},
		{"r":"20082","o":["0","50","100"]},
		{"r":"20090","o":["0","10","10"]},
		{"r":"20091","o":["10","20","20"]},
		{"r":"20092","o":["20","40","40"]},
		{"r":"20043","o":["50","100","100"]},
		{"r":"20044","o":["50","100","100"]},
		{"r":"20045","o":["100","150","200"]},
		{"r":"20046","o":["100","150","200"]},
		{"r":"20047","o":["100","150","200"]},
		{"r":"20048","o":["150","225","300"]},
		{"r":"20049","o":["150","225","300"]},
		{"r":"20050","o":["150","225","300"]},
		{"r":"20051","o":["250","300","300"]},
		{"r":"20052","o":["250","300","300"]},
		{"r":"20053","o":["250","300","300"]},
		{"r":"20054","o":["300","350","400"]},
		{"r":"20055","o":["350","425","500"]},
		{"r":"20056","o":["350","425","500"]},
		{"r":"20057","o":["350","425","500"]},
		{"r":"20118","o":["350","425","500"]},
		{"r":"20058","o":["400","500","500"]},
		{"r":"20059","o":["450","500","500"]},
		{"r":"20122","o":["450","475","500"]},
		{"r":"20111","o":["500","525","550"]},
		{"r":"20126","o":["500","525","550"]},
		{"r":"20112","o":["525","550","575"]},
		{"r":"20113","o":["500","575","600"]},
		{"r":"20114","o":["600","625","650"]},
		{"r":"20115","o":["600","625","650"]}
	],
	[
		{"r":"20060","o":["0","50","100"]},
		{"r":"20061","o":["0","50","100"]},
		{"r":"20062","o":["0","100","100"]},
		{"r":"20080","o":["0","50","100"]},
		{"r":"20093","o":["0","10","10"]},
		{"r":"20094","o":["10","20","20"]},
		{"r":"20095","o":["20","40","40"]},
		{"r":"20063","o":["50","100","100"]},
		{"r":"20064","o":["50","100","100"]},
		{"r":"20065","o":["100","150","200"]},
		{"r":"20066","o":["100","150","200"]},
		{"r":"20067","o":["100","150","200"]},
		{"r":"20068","o":["150","225","300"]},
		{"r":"20069","o":["150","225","300"]},
		{"r":"20070","o":["150","225","300"]},
		{"r":"20071","o":["250","300","300"]},
		{"r":"20072","o":["250","300","300"]},
		{"r":"20073","o":["250","300","300"]},
		{"r":"20074","o":["300","350","400"]},
		{"r":"20075","o":["350","425","500"]},
		{"r":"20076","o":["350","425","500"]},
		{"r":"20077","o":["350","425","500"]},
		{"r":"20117","o":["350","425","500"]},
		{"r":"20078","o":["400","500","500"]},
		{"r":"20121","o":["450","475","500"]},
		{"r":"20079","o":["450","500","500"]},
		{"r":"20106","o":["500","525","550"]},
		{"r":"20125","o":["500","525","550"]},
		{"r":"20107","o":["525","550","575"]},
		{"r":"20108","o":["500","575","600"]},
		{"r":"20109","o":["600","625","650"]},
		{"r":"20110","o":["600","625","650"]}
	]
]

TW_Calc.craft.toggleReciepes = function(u){
	var selector = ".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+u+" > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > div > .tw2gui_scrollpane_clipper > div >";
	if($(selector+".recipe_title>.recipe_title_inner>.recipe_collapse").html()=='+'){
		$(selector+".recipe_title>.recipe_title_inner>.recipe_collapse").html("-");
		$(selector+".recipe_content").slideDown();
	}else{
		$(selector+".recipe_title>.recipe_title_inner>.recipe_collapse").html("+");$
		(selector+".recipe_content").slideUp();
	}
};
			
TW_Calc.craft.startCraft = function(recipe_id){
	Ajax.remoteCall('crafting','start_craft',{recipe_id:recipe_id},
		function(resp){
		if(resp.error)return new MessageError(resp.msg).show();
			var data=resp.msg;
			Character.setProfessionSkill(data.profession_skill);
			$('#recipe_difficult_'+recipe_id).removeClass('middle hard easy').addClass(Crafting.getRecipeColor(ItemManager.get(recipe_id)));
			EventHandler.signal("inventory_changed");
			Character.updateDailyTask('crafts',data.count);
			TW_Calc.craft.reload();
			$.getJSON("?window=inventory&action=inventory_changed&h="+Player.h,complete=function(){TW_Calc.craft.reload();})
			return new MessageSuccess(data.msg).show();
		}
	);
};
		
TW_Calc.craft.reload = function(){
	try{
		for(var p=0;p<4;p++){
			if($(".TW-CALC-QUEST > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > .tw2gui_window_tab_active").hasClass("_tab_id_craft"+p)){var id = p;}
		}
		var u = "craft"+id;
		TW_Calc.craft.craft = [];
		if(TW_Calc.craft.input != null){
			TW_Calc.craft.craft[id] = TW_Calc.craft.input;
		}else{
			TW_Calc.craft.craft[id] = TW_Calc.craft.professionsCache[id];
		}
		var selector = ".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+u+" > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > div > .tw2gui_scrollpane_clipper > div";
		var t = 0;
		while(new Boolean(TW_Calc.craft.craft[id][t])!=false){
			var mats_available=true;
			var craft=TW_Calc.craft.craft[id][t];
			var reciepeId = Number(craft.r);
			var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
			$(s).empty();
			var craftable = true;
			var resources = ItemManager.get(reciepeId).resources;
			if(Boolean(ItemManager.get(reciepeId).resources[0])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[0];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[1])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[1];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[2])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[2];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[3])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[3];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[4])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[4];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[5])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[5];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(Boolean(ItemManager.get(reciepeId).resources[6])!=false){
				var itemObj = ItemManager.get(reciepeId).resources[6];
				var item = {};
				if(typeof(itemObj.item)=="object"){
					item.item=itemObj.item.item_id;
					item.count=itemObj.count;
				}else{
					item.item=itemObj.item;
					item.count=itemObj.count;
				}
				var bag_count=Bag.getItemCount(item.item);			
				var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
				if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
				$(s).append(mainDiv);
				if(bag_count<item.count){craftable=false;}
			};
			if(craftable==false){$("#recipe_craft_"+craft.r).empty();}
			t++
		}
		TW_Calc.craft.progressbar.setValue(Character.professionSkill);
	}catch(e){
		new TW_Calc.Error(e,'craft.reload');
	};
};
		
TW_Calc.craft.sortName = function(){
	var id = Character.professionId - 1;
	var val = $('#TW_Calc_Sort_Name').val();
	var input = [];
	var x = 0;
	while(new Boolean(TW_Calc.craft.nameListArray[x])!=false){
		if(TW_Calc.craft.nameListArray[x].search(val.toLowerCase())!=-1){
			input.push(TW_Calc.craft.nameList[TW_Calc.craft.nameListArray[x]])
		}
		x++
	}
	TW_Calc.craft.launch(id, input);
	$('#TW_Calc_Sort_Name').val(val);
	$('#TW_Calc_Sort_Name').focus()
	return input;			
};
		
TW_Calc.craft.sort = function(){
	var id = Character.professionId - 1;
	var input = [];
	var checked = false;
	if($('#TW_Calc_Sort_Craftable').hasClass('tw2gui_checkbox_checked')){
		input = input.concat(TW_Calc.craft.craftableList);
		TW_Calc.craft.TW_Calc_Sort_Craftable = 'tw2gui_checkbox_checked';
		 checked = true;
	}else{
		TW_Calc.craft.TW_Calc_Sort_Craftable = '';
	}
	if($('#TW_Calc_Sort_High').hasClass('tw2gui_checkbox_checked')){
		input = input.concat(TW_Calc.craft.difficulutHardList);
		TW_Calc.craft.TW_Calc_Sort_High = 'tw2gui_checkbox_checked';
		checked = true;
	}else{
		TW_Calc.craft.TW_Calc_Sort_High = '';
	}
	if($('#TW_Calc_Sort_Easy').hasClass('tw2gui_checkbox_checked')){
		input = input.concat(TW_Calc.craft.difficulutEasyList);
		TW_Calc.craft.TW_Calc_Sort_Easy = 'tw2gui_checkbox_checked';
		checked = true;
	}else{
		TW_Calc.craft.TW_Calc_Sort_Easy = '';
	}
	if($('#TW_Calc_Sort_Medium').hasClass('tw2gui_checkbox_checked')){
		input = input.concat(TW_Calc.craft.difficulutMediumList);
		TW_Calc.craft.TW_Calc_Sort_Medium = 'tw2gui_checkbox_checked';
		checked = true;
	}else{
		TW_Calc.craft.TW_Calc_Sort_Medium = '';
	}
	if(checked == false){
		input = TW_Calc.craft.professionsCache[id];
	}
	TW_Calc.craft.launch(id, input);
	return input;	
};

TW_Calc.craft.launch = function(id, input){
	try{
		TW_Calc.craft.craft = [[],[],[],[]];
		var u = "craft"+id;
		var i=0;
		var de = ".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+u+" > #craft_content";
		$(de).html('');
		var progressbar = new west.gui.Progressbar().setValue(Character.professionSkill).setMaxValue(650);
		TW_Calc.craft.progressbar = progressbar;
		if(Character.professionId == (id + 1)){
			$(de).append(new west.gui.Groupframe().setId("TWCalc_craft_progressbar").appendToContentPane(progressbar.getMainDiv()).getMainDiv());
			var h = 280;
		}else{
			var h = 325;
		}
		if(typeof(input)=="array" || typeof(input)=="object"){
			TW_Calc.craft.craft[id] = input;
			TW_Calc.craft.input = input;
		}else{
			TW_Calc.craft.craft[id] = TW_Calc.craft.professionsCache[id];
			TW_Calc.craft.input = null;
			TW_Calc.craft.TW_Calc_Sort_Craftable = '';
			TW_Calc.craft.TW_Calc_Sort_Name = '';
		}
		var allR = (typeof(input)=="array" || typeof(input)=="object" ? false : true);
		if(allR){
			TW_Calc.craft.nameList = {};
			TW_Calc.craft.difficulutMediumList = [];
			TW_Calc.craft.difficulutEasyList = [];
			TW_Calc.craft.difficulutHardList = [];
			TW_Calc.craft.craftableList = [];
			TW_Calc.craft.nameListArray = [];
		};
		var myProfession = (Character.professionId == (id + 1) ? true : false);
		var scrollpane = new west.gui.Scrollpane();
		TW_Calc.craft.scrollpane = scrollpane;
		var ContentDiv = new west.gui.Groupframe().setId("TWCalc_craft_content").appendToContentPane(scrollpane.getMainDiv()).getMainDiv();			
		$(de).append(ContentDiv);
		$("#TWCalc_craft_content>.tw2gui_groupframe_content_pane").css({"height":h,"text-align":"center"});
		var selector = ".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+u+" > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > div > .tw2gui_scrollpane_clipper > div";
		$(selector).append('<div id="recipe_title_" onclick="TW_Calc.craft.toggleReciepes(&quot;'+u+'&quot;)" class="recipe_title" style="display:inline-block;text-align:left;"><div class="recipe_title_inner"><div id="recipe_collapse_all" class="recipe_collapse">+'+'</div><div id="recipe_difficult_" class="recipe_difficult title=""></div><div id="recipe_name" class="recipe_name" style="text-align:left">Toggle all recipes</div></div><div id="recipe_craft_" class="recipe_craft" style="color:white"></div></div>')
		while(new Boolean(TW_Calc.craft.craft[id][i])!=false){
				var craft=TW_Calc.craft.craft[id][i];
				var effect, product, recept, items_data = new String();
				var reciepeId = Number(craft.r);
				var reciepe = ItemManager.get(reciepeId);
				var reciepeName = reciepe.name;
				var craftable = true;
				if(reciepe.min_level > Character.professionSkill){
					var reciepeColor = '';
				}else{
					var reciepeColor = (Character.professionId == (id + 1) ? Crafting.getRecipeColor(ItemManager.get(reciepeId)) : '');
				}
				var selector = ".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+u+" > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > div > .tw2gui_scrollpane_clipper > div";
				$(selector).append('<div id="recipe_title_'+craft.r+'" class="recipe_title" style="display:inline-block;text-align:left;"><div class="recipe_title_inner"><div id="recipe_collapse_'+craft.r+'" class="recipe_collapse" onclick="$(&quot;#TW_CALC_recipe_content_'+craft.r+'&quot;).slideToggle();if($(this).html()==&quot;+&quot;){$(this).html(&quot;-&quot;)}else{$(this).html(&quot;+&quot;)}">+'
				+'</div><div id="recipe_difficult_'+craft.r+'" class="recipe_difficult '+reciepeColor+'" title=""></div><div id="recipe_name'+craft.r+'" class="recipe_name" style="text-align:left">'+reciepeName+'&nbsp;|&nbsp;<span style="color:rgb(196, 163, 103">'+reciepe.min_level+'</span>/<span style="color:rgb(88, 185, 88)">'+craft.o[1]+'</span>/<span style="color:#55CDDD">'+reciepe.max_level+'</span></div></div><div id="recipe_craft_'+craft.r+'" class="recipe_craft" style="color:white">'+(Character.professionId == (id + 1) ? 'Craft' : '')+'</div></div><div id="TW_CALC_recipe_content_'+craft.r+'" class="recipe_content" style="margin-left:auto;margin-right:auto;display:none"><div id="recipe_craftitem_'+craft.r+'" class="recipe_craftitem"></div><div id="recipe_resources_content_'+craft.r+'" class="recipe_resources"></div></div></div>');
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[0])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[0];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[1])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[1];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[2])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[2];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[3])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[3];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[4])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[4];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			if(Boolean(ItemManager.get(reciepeId).resources)!=false){
				if(Boolean(ItemManager.get(reciepeId).resources[5])!=false){
					var itemObj = ItemManager.get(reciepeId).resources[5];
					var item = {};
					if(typeof(itemObj.item)=="object"){
						item.item=itemObj.item.item_id;
						item.count=itemObj.count;
					}else{
						item.item=itemObj.item;
						item.count=itemObj.count;
					}
					var bag_count=Bag.getItemCount(item.item);
					var s = selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_resources_content_'+craft.r;
					var mainDiv = new tw2widget.CraftingItem(ItemManager.get(item.item)).setRequired(bag_count,item.count).getMainDiv();
					if(ItemManager.get(item.item).spec_type == "mapdrop"){$(mainDiv).attr("item_id",item.item).click(function(){var id = $(this).attr("item_id");MinimapWindow.clickQuicklink(ItemManager.get(Number(id)).name)})}
					$(s).append(mainDiv);
					if(bag_count<item.count){craftable=false;}
				};
			}
			$("#recipe_craft_"+craft.r).attr("item_id",craft.r).click(function(){var id=$(this).attr("item_id");TW_Calc.craft.startCraft(id);TW_Calc.craft.reload();});
			if(reciepe.min_level > Character.professionSkill){
					$("#recipe_craft_"+craft.r).empty();
					$("#recipe_craft_"+craft.r).unbind('click');
				}else if(craftable==false){
				$("#recipe_craft_"+craft.r).empty();
				$("#recipe_craft_"+craft.r).unbind('click');
			} 
			if(craftable==true && reciepe.min_level <= Character.professionSkill && allR==true){
				TW_Calc.craft.craftableList.push(craft);
			}
			if(reciepeColor=='easy' && allR==true){
				TW_Calc.craft.difficulutEasyList.push(craft);
			}
			if(reciepeColor=='medium' && allR==true){
				TW_Calc.craft.difficulutMediumList.push(craft);
			}
			if(reciepeColor=='hard' && allR==true){
				TW_Calc.craft.difficulutHardList.push(craft);
			}
			if(allR==true){
				TW_Calc.craft.nameList[reciepeName.toLowerCase()] = craft;
				TW_Calc.craft.nameListArray.push(reciepeName.toLowerCase());
			}
			var productId=ItemManager.get(craft.r).craftitem;	
			var productDiv = new tw2widget.CraftingItem(ItemManager.get(productId)).setCount(Bag.getItemCount(productId)).getMainDiv();
			$(selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_craftitem_'+craft.r).append(productDiv);
			$(selector+'>#TW_CALC_recipe_content_'+craft.r+'>#recipe_craftitem_'+craft.r).attr("item_id",productId);
			i++
		};
		if(myProfession){
			$('.TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_'+u+' > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > .tw2gui_scrollpane').css("width",590);
			var rightPanel = $('.TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_'+u+' > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane');
			rightPanel.append('<div class="TW_Calc_rightPanel" style="position:absolute;top:15px;right:15px;width:65px;text-align:center"></div>');
			var rightPanelContent = $('.TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_'+u+' > #craft_content > #TWCalc_craft_content.tw2gui_groupframe > .tw2gui_groupframe_content_pane > .TW_Calc_rightPanel');
			rightPanelContent.append(new west.gui.Textfield().setWidth(50).setPlaceholder('Search...').setId('TW_Calc_Sort_Name').getMainDiv().keyup(TW_Calc.craft.sortName));
			rightPanelContent.append(new west.gui.Checkbox().setCallback(TW_Calc.craft.sort).setTooltip(TW_Calc.lang.lang_176).setId('TW_Calc_Sort_Craftable').getMainDiv().addClass(TW_Calc.craft.TW_Calc_Sort_Craftable)).append('</br>');
			rightPanelContent.append(new west.gui.Checkbox().setCallback(TW_Calc.craft.sort).setTooltip('<div class="recipe_difficult easy" style="margin:0px;padding:0;float:left"></div>').setId('TW_Calc_Sort_Easy').getMainDiv().addClass(TW_Calc.craft.TW_Calc_Sort_Easy)).append('</br>');
			rightPanelContent.append(new west.gui.Checkbox().setCallback(TW_Calc.craft.sort).setTooltip('<div class="recipe_difficult middle" style="margin:0px;padding:0;float:left"></div>').setId('TW_Calc_Sort_Medium').getMainDiv().addClass(TW_Calc.craft.TW_Calc_Sort_Medium)).append('</br>');
			rightPanelContent.append(new west.gui.Checkbox().setCallback(TW_Calc.craft.sort).setTooltip('<div class="recipe_difficult hard" style="margin:0px;padding:0;float:left"></div>').setId('TW_Calc_Sort_High').getMainDiv().addClass(TW_Calc.craft.TW_Calc_Sort_High)).append('</br>');
			rightPanelContent.append($('<a href="javascript:TW_Calc.craft.openMyProffesion()">Reload</a>'));
		}
		wman.getById("TW-CALC-QUEST").setTitle(TW_Calc.lang.craft[4]+' - '+TW_Calc.lang.craft[id]);
	}catch(e){
		new TW_Calc.Error(e,'craft.launch').show();
	};
};

TW_Calc.quest = new Object();

TW_Calc.quest.window = new Object();

TW_Calc.quest.window.showTab = function(id,callback){
	try{
		if($(".TW-CALC-QUEST > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > ._tab_id_"+id).hasClass("tw2gui_window_tab_active")!=true){
			callback();
			$(".TW-CALC-QUEST > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > *").each(function(){$(this).removeClass("tw2gui_window_tab_active")});
			$(".TW-CALC-QUEST > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > ._tab_id_"+id).addClass("tw2gui_window_tab_active");
			$(".TW-CALC-QUEST > div.tw2gui_window_content_pane > *").each(function(){$(this).hide()});
			$(".TW-CALC-QUEST > div.tw2gui_window_content_pane > #tab_"+id).fadeIn();
		}
	}catch(e){
		new TW_Calc.Error(e,'quest.window.showTab').show()
	};
};

TW_Calc.quest.window.launch = function(){
	try{
		var id="TW-CALC-QUEST";
		var tab=TW_Calc.lang.quest.lang_5;
		var html='<div style="position:absolute;width:680px;height:98%;top:10px;left:10px;" id="quest_content">Quest plugin is not installed! Please install it to see all quest. <a href="http://tw-calc.net/script/TW_Calc-sk_SK-questlist.user.js">DOWNLOAD</a></div>';var html2 = '<div id="craft_content" style="position:absolute;width:685px;height:98%;top:10px;left:7px;">Quest plugin is not installed! Please install it to see all quest. <a href="http://tw-calc.net/script/TW_Calc-sk_SK-questlist.user.js">DOWNLOAD</a></div>';
		var tabclick=function(win,id){
			TW_Calc.quest.window.showTab(id,function(){
				switch(id){
					case "quests":TW_Calc.quest.window.launch();break;
					case "craft0":TW_Calc.craft.launch(0);break;
					case "craft1":TW_Calc.craft.launch(1);break;
					case "craft2":TW_Calc.craft.launch(2);break;
					case "craft3":TW_Calc.craft.launch(3);break;
				};
			});
		};
		wman.open(id).setTitle(tab).setMiniTitle("TW-Calc "+tab).addTab(tab,'quests',tabclick).addTab(TW_Calc.lang.craft[0],"craft0",tabclick).addTab(TW_Calc.lang.craft[1],"craft1",tabclick).addTab(TW_Calc.lang.craft[2],"craft2",tabclick).addTab(TW_Calc.lang.craft[3],"craft3",tabclick).appendToContentPane(jQuery('<div id="tab_quests">'+html+'</div><div id="tab_craft0" style="display:none">'+html2+'</div><div id="tab_craft1" style="display:none">'+html2+'</div><div id="tab_craft2" style="display:none">'+html2+'</div><div id="tab_craft3" style="display:none">'+html2+'</div>'));
		TW_Calc.quest.quests();
		TW_Calc.quest.window.showTab("quests");
		$(".tw2gui_window.tw2gui_win2.TW-CALC-QUEST").addClass("noreload");
	}catch(e){
		new TW_Calc.Error(e,'quest.window.launch').show();
	};
};

TW_Calc.quest.quests = function(d,id,r){
	try{
		if(typeof(Quest_TW_Calc)=="object"){
		TW_Calc.quest.d = d;
		TW_Calc.quest.r = r;
		TW_Calc.quest.id = id;
		switch(d){
			case 2:
				$("#quest_navigation").remove();
				$("#quest_content").animate({width:'675px'},function(){
				var access_data, finish_data, end_data, equip_data, others_data, quest_text, job_data='';
				TW_Calc.q='';
				d = TW_Calc.quest.d;
				r = TW_Calc.quest.r;
				id = TW_Calc.quest.id;
				var i=0;
				var data=Quest_TW_Calc.quests;
				if(new Boolean(data.quests.series[id].ready)!=false){
					if(data.quests.series[id].ready=="false"){TW_Calc.q='<span style="display:inline-block;width:100%"><b>Esta tarea no ha sido procesada<b></span>';};
				}else{
				while(new Boolean(data.quests.series[id].quests[i])!=false){
					var quest = data.quests.series[id].quests[i];
					var access_data = '';
					var finish_data = '';
					var end_data = '';
					var equip_data = '';
					var others_data = '';
					var quest_text = '';
					var job_data = '';
					if(new Boolean(quest.q)!=false){
						quest_text=TW_Calc.lang.lang_125+': id '+quest.q
					};
					if(new Boolean(quest.noq)!=false){
						quest_text='&nbsp;'+TW_Calc.lang.lang_126+': id '+quest.noq
					};
					if(new Boolean(quest.dec)!=false){
						dec=quest.dec;
						dec_display="inline-block";
					}else{
						dec_display="none";
						dec='';
					};
					var img_up = 'false';
					if(new Boolean(TW_Calc.quest.solved)!=false){
						if(TW_Calc.quest.solved.indexOf(quest.id)!=-1){
							img_up = 'positive';
						}else{
							img_up = 'negative';
						}
					}
					if(new Boolean(quest.access.map)!=false){
						access_data+='<div><span class="quest_mmaplink" title="Center map" onclick="javascript:window[&quot;Map&quot;].center('+quest.access.map.x+','+quest.access.map.y+');void(0);"><img style="padding:2px" src="http://cdn.beta.the-west.net/images/icons/compass.png"></span><b>'+quest.access.map.name+'</b></div>';
					}
					if(new Boolean(quest.access.attr)!=false){
						access_data+='<div style="display:inline-block;margin:3px">'+new tw2widget.reward.AttributeReward(quest.access.attr.typ,quest.access.attr.count).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.access.none)!=false){
						switch(quest.access.none.text){
							case "1": var none =TW_Calc.lang.none[1]; break;
							case "2": var none =TW_Calc.lang.none[2]; break;
							default: var none = quest.access.none.text;};
						if(quest.access.none.text=="niÄ"){
							var none=TW_Calc.lang.lang_121;
						}else{
							var none=quest.access.none.text;
						};
						access_data+='<div><b>'+none+'</b></div>';
					}
					if(new Boolean(quest.access.date)!=false){
						access_data+='<div><b>'+TW_Calc.lang.lang_127+': '+quest.access.date[0]+' - '+quest.access.date[1]+'</b></div>';
					}
					if(new Boolean(quest.access.day)!=false){
						access_data+='<div><b>'+TW_Calc.lang.lang_128+' '+TW_Calc.lang.day[Number(quest.access.day)]+'</b><div>';
					}
					if(new Boolean(quest.access.month)!=false){
						access_data+='<div><b>'+TW_Calc.lang.lang_136+' '+TW_Calc.lang.month[Number(quest.access.month)]+'</b></div>';
					}
					if(new Boolean(quest.access.time)!=false){
						access_data+='<div><b>'+TW_Calc.lang.lang_135+': '+quest.access.time.from+' - '+quest.access.time.to+'</b></div>';
					}
					if(new Boolean(quest.access.quest)!=false){
						access_data+='<div><img style="padding:1px" src="http://cdn.beta.the-west.net/images/window/dailyactivity/positive.png">'+quest.access.quest.value+'</div>';
					}
					if(new Boolean(quest.access.quest2)!=false){
						access_data+='<div><img style="padding:1px" src="http://cdn.beta.the-west.net/images/window/dailyactivity/positive.png">'+quest.access.quest2.value+'</div>';
					}
					if(new Boolean(quest.access.quest3)!=false){
						access_data+='<div><img style="padding:1px" src="http:/cdn.beta.the-west.net/images/window/dailyactivity/positive.png">'+quest.access.quest3.value+'</div>';
					}
					if(new Boolean(quest.access.quest4)!=false){
						access_data+='<div><img style="padding:1px" src="http://cdn.beta.the-west.net/images/window/dailyactivity/positive.png">'+quest.access.quest4.value+'</div>';
					}
					if(new Boolean(quest.access.noquest)!=false){
						access_data+='<div><img style="padding:1px" src="http://cdn.beta.the-west.net/images/window/dailyactivity/negative.png">'+quest.access.noquest.value+'</div>';
					}
					if(new Boolean(quest.access.level)!=false){
						access_data+='<div>'+TW_Calc.lang.lang_30+':&nbsp;<b>'+quest.access.level+'</b></div>';
					}
					if(new Boolean(quest.access.item)!=false){
						var a=quest.access.item;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item2)!=false){
						var a=quest.access.item2;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item3)!=false){
						var a=quest.access.item3;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item4)!=false){
						var a=quest.access.item4;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item5)!=false){
						var a=quest.access.item5;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item6)!=false){
						var a=quest.access.item6;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item7)!=false){
						var a=quest.access.item7;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.access.item8)!=false){
						var a=quest.access.item8;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						access_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.time)!=false){
						finish_data+='<div><b>'+TW_Calc.lang.lang_135+': '+quest.finish.time.from+' - '+quest.finish.time.to+'</b></div>';
					}
					if(new Boolean(quest.finish.day)!=false){
						finish_data+='<div><b>'+TW_Calc.lang.lang_128+' '+TW_Calc.lang.day[Number(quest.finish.day)]+'</b></div>';
					}
					if(new Boolean(quest.finish.map)!=false){
						finish_data+='<div><span class="quest_mmaplink" title="Center map" onclick="javascript:window[&quot;Map&quot;].center('+quest.finish.map.x+','+quest.finish.map.y+');void(0);"><img style="padding:2px" src="http:/cdn.beta.the-west.net/images/icons/compass.png"></span><b>'+quest.finish.map.name+'</b></div>';
					}
					if(new Boolean(quest.finish.none)!=false){
						if(quest.finish.none.text=="niÄ"){
							var nonetext=TW_Calc.lang.lang_121;
						}else{
							var nonetext=quest.finish.none.text;
						};
						finish_data+='<div><b>'+nonetext+'</b></div>';
					}
					if(new Boolean(quest.finish.duel)!=false){
						finish_data+='<div>'+TW_Calc.lang.lang_119+':&nbsp;<b>'+quest.finish.duel.npc+'</b></div>';
					}
					if(new Boolean(quest.finish.lost)!=false){
						finish_data+='<div>'+TW_Calc.lang.lang_134+':&nbsp;<b>'+quest.finish.lost.npc+'</b></div>';
					}
					if(new Boolean(quest.finish.koma)!=false){
						finish_data+='<div>'+TW_Calc.lang.lang_129+'&nbsp;<b>'+quest.finish.koma.npc+'</b></div>';
					}
					if(new Boolean(quest.finish.job)!=false){
						if(new Boolean(quest.finish.job.id)!=false){
							var name=JobList.getJobById(quest.finish.job.id).name;
						}else{
							var name=quest.finish.job.name;
						};
						if(quest.finish.job.i!="0"){
							var e='('+quest.finish.job.i+'x)</div>';
						}else{
							if(Boolean(quest.finish.job.t)!=false){
								if(Boolean(quest.finish.job.t[2])!=false){
									var yy=quest.finish.job.t[2];
								}else{
									var yy="0";
								};
								var e="(<b>"+quest.finish.job.t[0]+"</b>h <b>"+quest.finish.job.t[1]+"</b>m <b>"+yy+"</b>s)</div>";
							}else{
								var e="</div>";
							}
						};
						finish_data+='<div><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://cdn.beta.the-west.net/images/icons/compass.png"></span>'+name+' '+e;
					}
					if(new Boolean(quest.finish.job2)!=false){
						if(new Boolean(quest.finish.job2.id)!=false){
							var name=JobList.getJobById(quest.finish.job2.id).name;
						}else{
							var name=quest.finish.job2.name;
						};
						if(quest.finish.job2.i!="0"){
							var e='('+quest.finish.job2.i+'x)</div>';
						}else{
							if(Boolean(quest.finish.job2.t)!=false){
								if(Boolean(quest.finish.job2.t[2])!=false){
									var yy=quest.finish.job2.t[2];
								}else{
									var yy="0";
								};
								var e="(<b>"+quest.finish.job2.t[0]+"</b>h <b>"+quest.finish.job2.t[1]+"</b>m <b>"+yy+"</b>s)</div>";
							}else{
								var e="</div>";
							}
						};
						finish_data+='<div><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://cdn.beta.the-west.net/images/icons/compass.png"></span>'+name+' '+e;
					}
					if(new Boolean(quest.finish.job3)!=false){
						if(new Boolean(quest.finish.job3.id)!=false){
							var name=JobList.getJobById(quest.finish.job3.id).name;
						}else{
							var name=quest.finish.job3.name;
						};
						if(quest.finish.job3.i!="0"){
							var e='('+quest.finish.job3.i+'x)</div>';
						}else{
							if(Boolean(quest.finish.job3.t)!=false){
								if(Boolean(quest.finish.job3.t[2])!=false){
									var yy=quest.finish.job3.t[2];
								}else{
									var yy="0";
								};
								var e="(<b>"+quest.finish.job3.t[0]+"</b>h <b>"+quest.finish.job3.t[1]+"</b>m <b>"+yy+"</b>s)</div>";
							}else{
								var e="</div>";
							}
						};
						finish_data+='<div><b>'+TW_Calc.lang.lang_120+'</b>: <span class="quest_mmaplink" title="" onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+name+'&quot;, &quot;task-finish-job&quot;))"><img style="padding:2px" src="http://cdn.beta.the-west.net/images/icons/compass.png"></span>'+name+' '+e;
					}
					if(new Boolean(quest.finish.item)!=false){
						var a=quest.finish.item;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item2)!=false){
						var a=quest.finish.item2;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item3)!=false){
						var a=quest.finish.item3;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item4)!=false){
						var a=quest.finish.item4;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item5)!=false){
						var a=quest.finish.item5;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item6)!=false){
						var a=quest.finish.item6;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item7)!=false){
						var a=quest.finish.item7;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item8)!=false){
						var a=quest.finish.item8;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}if(new Boolean(quest.finish.item9)!=false){
						var a=quest.finish.item9;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item10)!=false){
						var a=quest.finish.item10;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item11)!=false){
						var a=quest.finish.item11;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item12)!=false){
						var a=quest.finish.item12;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item12)!=false){
						var a=quest.finish.item12;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item13)!=false){
						var a=quest.finish.item13;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item14)!=false){
						var a=quest.finish.item14;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item15)!=false){
						var a=quest.finish.item15;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.item16)!=false){
						var a=quest.finish.item16;
						if(ItemManager.get(Number(a.id)).spec_type == "mapdrop"){
							var cursor = "pointer";
							var search ='onclick="javascript:void(MinimapWindow.clickQuicklink(&quot;'+a.id+'&quot;,&quot;inventory_changed&quot;))" ';
						}else{
							var cursor = "auto";
							var search='';
						};
						var u=new ItemPopup(ItemManager.get(Number(a.id)));
						var in_inventory = Bag.getItemCount(Number(a.id));
						finish_data+='<div '+search+' class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:'+cursor+';margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+in_inventory+'/'+a.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.action+'.png"></div></div>';
					}
					if(new Boolean(quest.finish.dollar)!=false){
						finish_data+='<div title="$'+quest.finish.dollar.value+'" style="display:inline-block;padding:3px;width:60px;height:60px"><div title="" class="game-reward reward_dollar"><span class="count" style="left:0px"><p>'+quest.finish.dollar.value+'</p></span><div class="reward-border"></div></div></div>';
					}
					if(new Boolean(quest.finish.skill_name)!=false){
						finish_data+='<div style="padding:3px;">'+new tw2widget.reward.SkillReward(quest.finish.skill_name.name,quest.finish.skill_name.count).getMainDiv().jq2Html()+'</div>'
					}
					if(new Boolean(quest.reward.none)!=false){
						if(quest.reward.none.text=="niÄ"){
							var nonetext=TW_Calc.lang.lang_121;
						}else{
							var nonetext=quest.reward.none.text;
						};
						end_data+='<div><b>'+nonetext+'</b></div>';
					}
					if(new Boolean(quest.reward.exp)!=false){
						end_data+='<div style="display:inline-block;padding:3px;">'+new tw2widget.reward.ExpReward(Number(quest.reward.exp.value)).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.dollar)!=false){
						end_data+='<div style="display:inline-block;padding:3px;">'+new tw2widget.reward.DollarReward(Number(quest.reward.dollar.value)).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.bond)!=false){
						end_data+='<div style="display:inline-block;padding:3px;">'+new tw2widget.reward.BondReward(Number(quest.reward.bond.value)).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.skill)!=false){
						end_data+='<div style="display:inline-block;padding:3px">'+new tw2widget.reward.SkillPointReward(quest.reward.skill.count).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.premium)!=false){
						end_data+='<div style="display:inline-block;padding:3px">'+new tw2widget.reward.PremiumReward(quest.reward.premium.premium,Number(quest.reward.premium.day)).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.skill_name)!=false){
						end_data+='<div style="padding:3px;">'+new tw2widget.reward.SkillReward(quest.reward.skill_name.name,quest.reward.skill_name.count).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.attr)!=false){
						end_data+='<div style="display:inline-block;margin:3px">'+new tw2widget.reward.AttributeReward(quest.reward.attr.typ,quest.reward.attr.count).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.attr2)!=false){
						end_data+='<div style="display:inline-block;margin:3px">'+new tw2widget.reward.AttributeReward(quest.reward.attr2.typ,quest.reward.attr2.count).getMainDiv().jq2Html()+'</div>';
					}
					if(new Boolean(quest.reward.item)!=false){
						var a=quest.reward;
						var u=new ItemPopup(ItemManager.get(Number(a.item.id)));
						end_data+='<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="cursor:default;position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';
					}
					if(new Boolean(quest.reward.item2)!=false){
						var a=quest.reward;
						var u=new ItemPopup(ItemManager.get(Number(a.item2.id)));
						end_data+='<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item2.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item2.count+'</p></span><div style="cursor:default;position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.item2.action+'.png"></div></div>';
					}
					if(new Boolean(quest.reward.item3)!=false){
						var a=quest.reward;
						var u=new ItemPopup(ItemManager.get(Number(a.item3.id)));
						end_data+='<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item3.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item3.count+'</p></span><div style="cursor:default;position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.item3.action+'.png"></div></div>';
					}
					if(new Boolean(quest.reward.option)!=false){
						var a=quest.reward.option[0];
						var u=new ItemPopup(ItemManager.get(Number(a.item.id)));
						var b=quest.reward.option[1];
						var v=new ItemPopup(ItemManager.get(Number(b.item.id)));
						end_data+='<fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 1</legend><div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend><div class="item item_inventory" title="'+v.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(b.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+b.item.count+'</p></span></div></fieldset>';
					}
					if(new Boolean(quest.reward.option3)!=false){
						var a=quest.reward.option3[0];
						var u=new ItemPopup(ItemManager.get(Number(a.item.id)));
						var b=quest.reward.option3[1];
						var v=new ItemPopup(ItemManager.get(Number(b.item.id)));
						var c=quest.reward.option3[2];
						var uv=new ItemPopup(ItemManager.get(Number(c.item.id)));
						end_data+='<fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 1</legend><div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend><div class="item item_inventory" title="'+v.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(b.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+b.item.count+'</p></span></div></fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 3</legend><div class="item item_inventory" title="'+uv.getXHTML().escapeHTML()+'" style="cursor:default;vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(c.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+c.item.count+'</p></span></div></fieldset>';
					}
					if(new Boolean(quest.reward.option_skill)!=false){
						var skillone='<div style="display:inline-block;margin:3px">'+new tw2widget.reward.AttributeReward(quest.reward.option_skill[0].attr.typ,quest.reward.option_skill[0].attr.count).getMainDiv().jq2Html()+'</div>';
						var skilltwo='<div style="display:inline-block;margin:3px">'+new tw2widget.reward.AttributeReward(quest.reward.option_skill[1].attr.typ,quest.reward.option_skill[1].attr.count).getMainDiv().jq2Html()+'</div>';
						end_data+='<fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend>'+skillone+'</fieldset><fieldset style="border-color: rgba(58, 49, 19, 0);"><legend>'+TW_Calc.lang.lang_132+' 2</legend>'+skilltwo+'</fieldset>';}
					if(new Boolean(quest.equip)!=false){
						if(new Boolean(quest.equip.item)!=false){
							var a=quest.equip;
							var u=new ItemPopup(ItemManager.get(Number(a.item.id)));
							equip_data=equip_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.item.action+'.png"></div></div>';
						}
						if(new Boolean(quest.equip.item2)!=false){
							var a=quest.equip;
							var u=new ItemPopup(ItemManager.get(Number(a.item2.id)));
							equip_data=equip_data+'<div class="item item_inventory" title="'+u.getXHTML().escapeHTML()+'" style="vertical-align:top;float:center;display:inline-block;padding:3px;width:54px;height:54px"><img width="53" height="53" src="'+ItemManager.get(Number(a.item.id)).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="cursor:default;margin-left:0px;margin-top:0px;"><span class="count" style="display: block;"><p>'+a.item2.count+'</p></span><div style="position:absolute;top:0px;left:0px"><img style="cursor:default" src="http://tw-calc.net/script/quest/img/bag_'+a.item2.action+'.png"></div></div>';
						}
					}
					if(quest.clas=="quest_table_light"){
						var dat = '<table class="'+quest.clas+'"><tr style="width:168px"><td><span id="span1" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_11+'</span><span>'+equip_data+'</span></td><td style="width:168px"><span id="span2" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_12+'</span><span>'+access_data+'</span></td><td style="width:168px"><span id="span3" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_13+'</span><span>'+finish_data+'</span></td><td style="width:168px"><span id="span4" class="quest_table_span_light">'+TW_Calc.lang.quest.lang_10+'</span><span>'+end_data+'</span></td></table>';
					}else{
						var dat = '<table class="'+quest.clas+'"><tr><td id="img_q_t1" style="width:100px"><div style="position:relative"><img title="'+quest_text+'" src="http://cdn.beta.the-west.net/images/quest/employer/'+quest.giver+'.png"><span style="display:'+dec_display+';position:absolute;top:0px;right:0px;width:27px;height:27px;background-image:url(\'http://tw-calc.net/script/quest/img/decisions.png\');background-position:'+dec+'px"></span><span style="display:inline-block;position:absolute;bottom:0px;left:0px;width:24px;height:24px;background-image:url(\'http://cdn.beta.the-west.net/images/window/dailyactivity/'+img_up+'.png\');"></span></div></td><td style="width:129px"><span id="span1" class="quest_table_span">Id: '+quest.id+'</span><span>'+quest.name+'</span></td><td style="width:134px"><span id="span2" class="quest_table_span">'+TW_Calc.lang.quest.lang_8+'</span><span>'+access_data+'</span></td><td style="width:131px"><span id="span3" class="quest_table_span">'+TW_Calc.lang.quest.lang_9+'</span><span>'+finish_data+'</span></td><td style="width:134px"><span id="span4" class="quest_table_span">'+TW_Calc.lang.quest.lang_10+'</span><span>'+end_data+'</span></td></table>';
					}
					TW_Calc.q=TW_Calc.q+''+dat;
					i++;
				};
				}
				TW_Calc.q='<div class="tw2gui_button" onclick="TW_Calc.quest.quests();" style="padding:5px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;font-style:normal;font-variant:normal;font-size:10pt;line-height:normal;font-family:Arial;">'+TW_Calc.lang.lang_130+'</div></div>'+TW_Calc.q+'<div class="tw2gui_button" onclick="TW_Calc.quest.quests();" style="padding:5px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_130+'</div></div>';
				var title = TW_Calc.lang.quest.lang_5+'- '+data.quests.series[id].name;
				wman.getById("TW-CALC-QUEST").setTitle(title)
				$("#quest_content").html(new west.gui.Scrollpane().appendContent(TW_Calc.q).getMainDiv());
				$(".twcalc_quest").hover(function(){this.style.opacity="0.7";},function(){this.style.opacity="1";});
				$(".quest_table > tbody > tr").addClass("quest_table_row");
				$("#img_q_t1").css("width","100px");
				$(".quest_table > tbody > tr > td").addClass("quest_table_col");
				$(".quest_table > tbody > tr > td > img").addClass("quest_img");
				$(".quest_table > tbody > tr > #img_q_t1").addClass("quest_table_img_box");
				});
			break;
			case 4: 
				var data=Quest_TW_Calc.quests;
				var e=0;
				var n=0;
				switch(Number(document.getElementById("quest_level_value").value)){
					case 0: u=0; n=120; break;
					case 1: u=0; n=9; break;
					case 2: u=10; n=19; break;
					case 3: u=20; n=29; break;
					case 4: u=30; n=39; break;
					case 5: u=40; n=49; break;
					case 6: u=50; n=59; break;
					case 7: u=60; n=69; break;
					case 8: u=70; n=79; break;
					case 9: u=80; n=89; break;
					case 10: u=90; n=99; break;
					case 11: u=100; n=120; break;
				};
				var fpos ="";
				TW_Calc.q="";
				for(e=0;e<999;e++){
					if(new Boolean(data.quests.series[e])==false){
						break;
					};
					if(data.quests.series[e].level<u){
						continue;
					};
					if(data.quests.series[e].level>n){
						break;
					};
					if(new Boolean(TW_Calc.quest.series_solved)!=false){
						if(TW_Calc.quest.series_solved.indexOf(e)!=-1){fpos="positive";}else{fpos="negative";}
					}else{
						fpos="negative";
					};
					TW_Calc.q=TW_Calc.q+'<div class="twcalc_quest" onclick="TW_Calc.quest.quests(2,'+e+')"><div style="position:absolute;top:6px;right:6px;width:24px;height:24px;background: url(/images/window/dailyactivity/'+fpos+'.png);"></div><div class="twcalc_quest_nadpis">'+data.quests.series[e].name+'</div><div class="twcalc_quest_level">'+TW_Calc.lang.quest.lang_1+': '+data.quests.series[e].level+'</div><div class="twcalc_quest_quests">'+TW_Calc.lang.quest.lang_2+': '+data.quests.series[e].q+'</div><div class="twcalc_quest_trieda">'+TW_Calc.lang.quest.lang_3+': '+data.quests.series[e].clas+'</div><div class="twcalc_quest_giver"><img src="http://cdn.beta.the-west.net/images/quest/employer/'+data.quests.series[e].giver+'.png" style="width: 100%; height: 100%"></div></div>';
				};
				$("#quest_content").html(new west.gui.Scrollpane().appendContent(TW_Calc.q).getMainDiv());$(".twcalc_quest").hover(function(){this.style.opacity="0.7";}, function(){this.style.opacity="1";});
				$(".quest_table > tbody > tr").addClass("quest_table_row");
				$("#img_q_t1").css("width","100px");$(".quest_table > tbody > tr > td").addClass("quest_table_col");
				$(".quest_table > tbody > tr > td > img").addClass("quest_img");
				$(".quest_table > tbody > tr > #img_q_t1").addClass("quest_table_img_box");
			break;
			default:
				wman.getById("TW-CALC-QUEST").setTitle(TW_Calc.lang.quest.lang_5);
				$("#tab_quests").append('<div id="quest_navigation" style="position:absolute;width:160px;height:376px;top:10px;left:525px;"><div id="combox"></div><div id="others"></div></div>');
				var qlevel=new west.gui.Combobox('quest_level').setWidth(120).addItem(0,'All quests').addItem(1,'Level 1-9').addItem(2,'Level 10-19').addItem(3,'Level 20-29').addItem(4,'Level 30-39').addItem(5,'Level 40-49').addItem(6,'Level 50-59').addItem(7,'Level 60-69').addItem(8,'Level 70-79').addItem(9,'Level 80-89').addItem(10,'Level 90-99').addItem(11,'Level 100+').select(0).getMainDiv();
				$("#quest_navigation > #combox").append(qlevel);
				$("#quest_navigation > #others").html('<div class="tw2gui_button" onclick="TW_Calc.quest.quests(4);" style="padding:2px;width:150px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;font-style:normal;font-variant:normal;font-size:10pt;line-height:normal;font-family:Arial;">Go</div></div><div class="tw2gui_button" onclick="TW_Calc.quest.up();" style="padding:2px;width:150px"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="textart_title" style="font-weight:bold;font-style:normal;font-variant:normal;font-size:10pt;line-height:normal;font-family:Arial;">Update</div></div>')
				var title = TW_Calc.lang.quest.lang_5;
				wman.getById("TW-CALC-QUEST").setTitle(title);
				$("#quest_content").animate({width:'510px'});
				var data = Quest_TW_Calc.quests;
				var i=0;
				TW_Calc.q="";
				var fpos ="negative";
				while(new Boolean(data.quests.series[i])!=false){
					if(new Boolean(TW_Calc.quest.series_solved)!=false){
						if(TW_Calc.quest.series_solved.indexOf(i)!=-1){
							fpos="positive";
						}else{
							fpos="negative";
						}
					}else{
						fpos="negative";
					};
					switch(data.quests.series[i].clas){
						case "VÅ¡etky": var questclass = TW_Calc.lang.quest.lang_4; break;
						case "PracovnÃ­k": var questclass = TW_Calc.lang.lang_42; break;
						case "Duelant": var questclass = TW_Calc.lang.lang_39; break;
						case "Dobrodruh": var questclass = TW_Calc.lang.lang_40; break;
						case "Vojak": var questclass = TW_Calc.lang.lang_41; break;
					}
				TW_Calc.q = TW_Calc.q+'<div class="twcalc_quest" onclick="TW_Calc.quest.quests(2,'+i+')"><div style="position:absolute;top:6px;right:6px;width:24px;height:24px;background: url(/images/window/dailyactivity/'+fpos+'.png);"></div><div class="twcalc_quest_nadpis">'+data.quests.series[i].name+'</div><div class="twcalc_quest_level">'+TW_Calc.lang.quest.lang_1+': '+data.quests.series[i].level+'</div><div class="twcalc_quest_quests">'+TW_Calc.lang.quest.lang_2+': '+data.quests.series[i].q+'</div><div class="twcalc_quest_trieda">'+TW_Calc.lang.quest.lang_3+': '+questclass+'</div><div class="twcalc_quest_giver"><img src="http://cdn.beta.the-west.net/images/quest/employer/'+data.quests.series[i].giver+'.png" style="width: 100%; height: 100%"></div></div>';
				i = i+1;
				}
			$("#quest_content").html(new west.gui.Scrollpane().appendContent(TW_Calc.q).getMainDiv());
			$(".twcalc_quest").hover(function(){this.style.opacity="0.7";}, function(){this.style.opacity="1";});
			$(".quest_table > tbody > tr").addClass("quest_table_row");
			$("#img_q_t1").css("width","100px");
			$(".quest_table > tbody > tr > td").addClass("quest_table_col");
			$(".quest_table > tbody > tr > td > img").addClass("quest_img");
			$(".quest_table > tbody > tr > #img_q_t1").addClass("quest_table_img_box");
		}
	}
	}catch(e){
		new TW_Calc.Error(e,'quests').show();
	};
};
	
TW_Calc.quest.up = function(){
	$.getJSON("game.php?window=building_quest&mode=get_solved_quests",complete=function(data){
		TW_Calc.quest.solved = "";
		for(i in data.solved){TW_Calc.quest.solved = TW_Calc.quest.solved+','+data.solved[i].id;};
		TW_Calc.quest.solved=TW_Calc.quest.solved.split(",");
		localStorage.setItem("TWCalc_quests",TW_Calc.quest.solved);
		var dtc = Quest_TW_Calc.quests;
		var o=0;
		TW_Calc.q = "";
		TW_Calc.quest.series_solved ="";
		while(new Boolean(dtc.quests.series[o])!=false){
			var l = dtc.quests.series[o].quests.length;
			if(l!=0){
				if(dtc.quests.series[o].quests[l-1].clas != "quest_table_light"){
					var id = dtc.quests.series[o].quests[l-1].id;
					function add(){TW_Calc.quest.series_solved=TW_Calc.quest.series_solved+','+o;};
					if(dtc.quests.series[o]==dtc.quests.series[30]){
						var id1 = dtc.quests.series[30].quests[4].id;
						var id2 = dtc.quests.series[30].quests[6].id;
						if(TW_Calc.quest.solved.indexOf(id1)!=-1){add();};
						if(TW_Calc.quest.solved.indexOf(id2)!=-1){add();}
					};
					if(dtc.quests.series[o]==dtc.quests.series[42]){
						var id1 = dtc.quests.series[42].quests[5].id;
						var id2 = dtc.quests.series[42].quests[4].id;
						if(TW_Calc.quest.solved.indexOf(id1)!=-1){add();};
						if(TW_Calc.quest.solved.indexOf(id2)!=-1){add();}
					};
					if(dtc.quests.series[o]==dtc.quests.series[53]){
						var id1 = dtc.quests.series[53].quests[10].id;
						var id2 = dtc.quests.series[53].quests[21].id;
						if(TW_Calc.quest.solved.indexOf(id1)!=-1){add();};
						if(TW_Calc.quest.solved.indexOf(id2)!=-1){add();}
					};
					if(new Boolean(dtc.quests.series[o].quests[l-1].dec)!=false){
						switch(dtc.quests.series[o].quests[l-1].dec){
							case "0": if(TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-1].id)!=-1){add();};break;
							case "-27": if((TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-1].id)!=-1)||(TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-2].id)!=-1)){add();};break;
							case "-54": if((TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-1].id)!=-1)||(TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-2].id)!=-1)||(TW_Calc.quest.solved.indexOf(dtc.quests.series[o].quests[l-3].id)!=-1)){add();};break;
						}
					}
					if(TW_Calc.quest.solved.indexOf(id)!=-1){TW_Calc.quest.series_solved=TW_Calc.quest.series_solved+','+o;}
				}else{
					if(new Boolean(dtc.quests.series[o].quests[l-2])!=false){
						var id = dtc.quests.series[o].quests[l-2].id;
						if(TW_Calc.quest.solved.indexOf(id)!=-1){
							TW_Calc.quest.series_solved=TW_Calc.quest.series_solved+','+o;
						}
					}
				};
			}
			o++
		};
		TW_Calc.quest.series_solved = TW_Calc.quest.series_solved.split(",");
		localStorage.setItem("TWCalc_quests_series",TW_Calc.quest.series_solved)
		new UserMessage(TW_Calc.lang.lang_142,"success").show();
		},
		function(){
			new UserMessage(TW_Calc.lang.lang_143,"success").show();
		}
	);
	new UserMessage(TW_Calc.lang.lang_143,"success").show();
};

OnGoingWestcalcErrorEntry = function(f){
	this.init("",f);
	this.setTooltip("Westcalc error");
	this.setImageClass("hint");
};

OnGoingWestcalcErrorEntry.prototype=new OnGoingEntry();

TW_Calc.Error = function(error,d){
	this.e = error;
	this.d = d;
	this.show = function(){
		var that = this;
		TW_Calc.ErrorLog.add(that.e.message,that.d);
		WestUi.NotiBar.add(new OnGoingWestcalcErrorEntry(function(){
		wman.open("TW-Calc-Error").appendToContentPane(that.e.message+'</br>'+that.d).setTitle("TW-Calc Error").setMiniTitle("TW-Calc Error").setSize(400,300);
		},"TW Calc Error accoured","hint"))
	}
}

TW_Calc.ErrorLog = {};
TW_Calc.ErrorLog.sendError = function(errorCode){
	if(TW_Calc.Settings.get("sendErrors")){
		$.get("http://tw-calc.net/sendError.php",{errorCode:errorCode,name:Character.name,id:Character.playerId,server:Game.gameURL,locale:Game.locale,WestcalcVersion:TW_Calc.version,GameVersion:Game.version},function(data){},"jsonp");
	}
}
TW_Calc.ErrorLog.create = function(){
	TW_Calc.ErrorLog.log = [];
};
TW_Calc.ErrorLog.add = function(e,d){
	TW_Calc.ErrorLog.sendError(e+' | '+d);
	TW_Calc.ErrorLog.log.push([e,d]);
}
TW_Calc.ErrorLog.open = function(){
	var c = '';
	var k = 0;
	while(TW_Calc.ErrorLog.log[k]){
		c+= TW_Calc.ErrorLog.log[k][0]+' | '+TW_Calc.ErrorLog.log[k][1]+'\n';
		k++
	}
	wman.open("TW-Calc Errorlog").appendToContentPane(new west.gui.Textarea().setReadonly().setContent(c).setWidth(675).setHeight(355).getMainDiv()).setTitle("TW-Calc Errorlog").setMiniTitle("TW-Calc Errorlog");
}
TW_Calc.ErrorLog.create();

TW_Calc.checkLang()
TW_Calc.Settings.list = [["topBar","Alternar entre la parte superior e inferior de la barra de trabajos"], ["wardrobe",TW_Calc.lang.lang_175],["MenuCraftButton",TW_Calc.lang.lang_153],["bottomBar",TW_Calc.lang.lang_144],["nearestJob",TW_Calc.lang.lang_145],["ImportSkills",TW_Calc.lang.lang_74],["TransferFeeCalc",TW_Calc.lang.lang_108],["XP_HP_Energy_Calc",TW_Calc.lang.lang_109],["questlist",TW_Calc.lang.lang_133],["westcalc",TW_Calc.lang.lang_137]];

try{
	if(new Boolean(localStorage.getItem("TWCalc_quests"))!=false){
		TW_Calc.quest.solved = localStorage.getItem("TWCalc_quests").split(",")
	};
	if(new Boolean(localStorage.getItem("TWCalc_quests_series"))!=false){
		TW_Calc.quest.series_solved = localStorage.getItem("TWCalc_quests_series").split(",")
	}
}
catch(err){new TW_Calc.Error(err,'Creating quest series array').show()};

TW_Calc.nearestJob = new Object();
TW_Calc.nearestJob.list = new Array();
TW_Calc.nearestJob.map = null;
TW_Calc.nearestJob.getMap = function(){
	Ajax.get("map","get_minimap",{},function(q){
		TW_Calc.nearestJob.map = q;
	})
}
TW_Calc.nearestJob.lastPos = function(){
	var e=Character.position.x;
	var t=Character.position.y;
	var n=TaskQueue.queue;
	for(var r=0;r<n.length;r++){
		var i=n[r].wayData;
		if(i.x){e=i.x;t=i.y}
	}
	return[e,t]
}
TW_Calc.nearestJob.find = function(e, dataType){
		TW_Calc.nearestJob.j = e;
		if(TW_Calc.nearestJob.map!=null){		
			var q = TW_Calc.nearestJob.map;
		}else{
			TW_Calc.nearestJob.getMap();
		}
		if(new Boolean(q)==false){
			new UserMessage(TW_Calc.lang.lang_143,"success").show()
		}
		var u= q.job_groups;
		var e = Number(TW_Calc.nearestJob.j);
		var t = TW_Calc.nearestJob;
		var n = JobList.getJobById(e);
		var r = u[n.groupid];
		if(!r){return[]}
		var i=[];
		var s=t.lastPos();
		for(var o=0;o<r.length;o++){
			var a=r[o][0]-s[0];
			var f=r[o][1]-s[1];
			var l=Math.sqrt(a*a+f*f);
			i.push({dist:l,x:r[o][0],y:r[o][1]})
		}
		var p=function(e,t){
			return e.dist*1>t.dist*1?1:-1
		};
		i.sort(p);
		var job = i[0];
		switch(dataType.type){
			case "startJob":
				TaskQueue.add(new TaskJob(e,Number(job.x),Number(job.y),dataType.duration));
			break;
			default: new JobWindow(e,Number(job.x),Number(job.y));
		}
}

TW_Calc.nearestJob.search = function(id){
	TW_Calc.nearestJob.find(id, {type:"window"});
}

TW_Calc.nearestJob.save = function(div){
	if(new Boolean(localStorage.getItem("TWCalc_jobList"))!=false){
		var data = localStorage.getItem("TWCalc_jobList").split(",");
	}else{
		var data = new Array();
	}
	var l = data.length;
	var id = div.attr("job_id");
	var opacity = div.css("opacity");
	if(opacity==1){
		var n = data.indexOf(id);
		data.splice(n,1);
	}else{
		if(data.indexOf(id)==-1){
			data[l] = id;
		}
	}
	if(data!=''){
		var val = data.join();
	}else{
		var val = '';
	}
	localStorage.setItem("TWCalc_jobList",val);
	TW_Calc.nearestJob.build();
	TW_Calc.nearestJob.fade(div);
	TW_Calc.nearestJob.loadBottomBar();
}
TW_Calc.nearestJob.build = function(){
	if(new Boolean(localStorage.getItem("TWCalc_jobList"))!=false){
		if(localStorage.getItem("TWCalc_jobList")!=''){
			TW_Calc.nearestJob.list = localStorage.getItem("TWCalc_jobList").split(",");
		}else{
			TW_Calc.nearestJob.list = [];
		}
	}else{
		TW_Calc.nearestJob.list = [];
	}
}

TW_Calc.nearestJob.fade = function(s){
	if(s.css("opacity")==1){
		s.css("opacity",0.5);
	}else{
		s.css("opacity",1);
	}
}

TW_Calc.nearestJob.searchInWindow = function(name){
	var selector = $("#twcalc_nearjob_dialog");
	selector.empty();
	var i = 0;
	var d = new west.gui.Scrollpane();
	while(new Boolean(JobList.getSortedJobs("id")[i])!=false){
		var job = JobList.getSortedJobs("id")[i];
		if(job.name.toLowerCase().search(name.toLowerCase())!=-1){
			if(TW_Calc.nearestJob.list.indexOf(job.id)!=-1){
				var o = '1';
			}else{
				var o = '0.5';
			}
			var jobicon='<div class="job twcalc_job" style="opacity:'+o+';position:relative !important;display:inline-block !important" title="'+job.name+'" job_id="'+job.id+'" onclick="TW_Calc.nearestJob.save($(this));"><div class="featured"></div>'+'<img src="http://cdn.beta.the-west.net/images/jobs/'+job.shortname+'.png" class="job_icon" /></div>';
			d.appendContent(jobicon);
		}
		i++
	}
	selector.append(d.getMainDiv());
}

TW_Calc.escapeHTML = function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

TW_Calc.nearestJob.open = function(index){
	var html = '<div id="twcalc_nearjob_dialog" style="width:615px;height:325px"></div><div id="twcalc_nearjob_dialog_search_div" style="width:615px;"></div>';
	new west.gui.Dialog(TW_Calc.lang.lang_152,html).addButton(TW_Calc.lang.lang_149,function(){
		new west.gui.Dialog(TW_Calc.lang.lang_148,TW_Calc.lang.lang_146).addButton(TW_Calc.lang.lang_149,function(){
			localStorage.setItem('TWCalc_jobList','');
			TW_Calc.nearestJob.build();
			TW_Calc.nearestJob.loadBottomBar();
		}).addButton(TW_Calc.lang.lang_92,function(){}).show();
	}).addButton(TW_Calc.lang.lang_147,function(){}).show()
	var selector = $("#twcalc_nearjob_dialog");
	var i = 0;
	var d = new west.gui.Scrollpane();
	while(new Boolean(JobList.getSortedJobs("id")[i])!=false){
		var job = JobList.getSortedJobs("id")[i];
		if(TW_Calc.nearestJob.list.indexOf(job.id.toString())!=-1){
			var o = '1';
		}else{
			var o = '0.5';
		}
		var jobicon='<div class="job twcalc_job" style="opacity:'+o+';position:relative !important;display:inline-block !important" title="'+TW_Calc.escapeHTML(TW_Calc.nearestJob.jobPopup(job.id))+'" job_id="'+job.id+'" onclick="TW_Calc.nearestJob.save($(this));">'+'<img src="http://cdn.beta.the-west.net/images/jobs/'+job.shortname+'.png" class="job_icon" /></div>';
		d.appendContent(jobicon);
		i++
	}
	selector.append(d.getMainDiv());
	$('#twcalc_nearjob_dialog_search_div').append(new west.gui.Textfield().setId('twcalc_nearjob_dialog_search').setWidth(600).setPlaceholder(TW_Calc.lang.lang_151).getMainDiv());
	$('#twcalc_nearjob_dialog_search').keyup(function(){TW_Calc.nearestJob.searchInWindow($(this).val())});
}

TW_Calc.nearestJob.jobPopup = function(el){
	if(ItemManager.isLoaded()==true){
		TW_Calc.nearestJob.bottomBarPopups = true;
		return Map.PopupHandler.getJobPopup(JobList.getJobById(el));
	}else{
		return JobList.getJobById(el).name;
	}
}

try{
	TW_Calc.nearestJob.build();
}catch(e){
	new TW_Calc.Error(e).show();
};

setInterval(TW_Calc.budik,1000);

TW_Calc.nearestJob.start = function(jobid, duration){
	TW_Calc.nearestJob.find(jobid, {type:"startJob",duration:duration});
}

TW_Calc.nearestJob.posY = 97;

TW_Calc.nearestJob.loadBottomBar = function(){
	if(TW_Calc.Settings.get("bottomBar")){
		TW_Calc.nearestJob.bottomBar = new west.gui.Scrollpane();
		TW_Calc.nearestJob.bottomBar.verticalBar.hide()
		$("#Westcalc_bottomBar").remove();
		if(TW_Calc.Settings.get("topBar")){
			$('#ui_bottombar').append('<div id="Westcalc_bottomBar" style="overflow:hidden;left:20px;width:487px;height:59px;position:absolute;bottom:'+TW_Calc.nearestJob.posY+'px;"></div>');
		}else{
			$('#user-interface').append('<div id="Westcalc_bottomBar" style="overflow:hidden;left:50%;width:487px;height:59px;position:absolute;top:44px;"></div>');
		}
		var i = 0;
		var bottomBar = $('#Westcalc_bottomBar');
		data = TW_Calc.nearestJob.list;
		var selector = TW_Calc.nearestJob.bottomBar;
		while(new Boolean(data[i])!=false){
			var job = JobList.getJobById(data[i]);
			var html = '<div class="instantwork-short" title="15s - '+job.name+'" onclick="TW_Calc.nearestJob.start($($(this).parent()).attr(&quot;job_id&quot;),15);"></div><div class="instantwork-middle" title="10m - '+job.name+'" onclick="TW_Calc.nearestJob.start($($(this).parent()).attr(&quot;job_id&quot;),600);"></div><div class="instantwork-long" title="1h - '+job.name+'" onclick="TW_Calc.nearestJob.start($($(this).parent()).attr(&quot;job_id&quot;),3600);"></div>';
			selector.appendContent('<div class="job twcalc_job" style="position:relative !important;display:inline-block !important;margin-top:5px" job_id="'+job.id+'"><div class="featured" title="'+TW_Calc.escapeHTML(TW_Calc.nearestJob.jobPopup(job.id))+'" onclick="TW_Calc.nearestJob.search($($(this).parent()).attr(&quot;job_id&quot;));"></div>'+(Premium.hasBonus("automation") == true ? html : '')+'<img src="http://cdn.beta.the-west.net/images/jobs/'+job.shortname+'.png" class="job_icon" /></div>');
			i++
		}
		selector.appendContent('<div class="job twcalc_job" style="position:relative !important;display:inline-block !important" title="'+TW_Calc.lang.lang_150+'" onclick="TW_Calc.nearestJob.open()"><div class="featured"></div>'+'<img src="data:image/png;data:;base64,'+TW_Calc.bottomImg+'" class="job_icon" /></div>');
		bottomBar.append(TW_Calc.nearestJob.bottomBar.getMainDiv());
	}
	if(ItemManager.isLoaded()==true){
		TW_Calc.nearestJob.bottomBarPopups = true;
	}
}

TW_Calc.nearestJob.Barresize = function(){
	if(TW_Calc.Settings.get("bottomBar")){
		if(TW_Calc.nearestJob.bottomBar.verticalBar.visible()){
			if(TW_Calc.Settings.get("topBar")){
				$('#Westcalc_bottomBar').css({left:10,width:507});
			}else{
				$('#Westcalc_bottomBar').css({width:620,"margin-left":75 + Number($("#ui_topbar").css("margin-left").split("px")[0])});
			}
		}
	}
}

setInterval(TW_Calc.nearestJob.Barresize,1000);

TW_Calc.nearestJob.loadedPopups = function(){
	if(TW_Calc.nearestJob.bottomBarPopups == false || TW_Calc.nearestJob.bottomBarPopups == undefined){
		TW_Calc.nearestJob.loadBottomBar();
		setTimeout(TW_Calc.nearestJob.loadedPopups, 1000);
	}else{
		TW_Calc.nearestJob.bottomBarPopups == true;
	}
}

try{
	if(TW_Calc.Settings.get("BottomBar")){
		TW_Calc.nearestJob.loadBottomBar();
		TW_Calc.nearestJob.loadedPopups();
		TW_Calc.nearestJob.intTimer = 500;
		TW_Calc.nearestJob.int = setInterval(function(){
			if(TW_Calc.Settings.get("topBar")){
				if($("#ui_windowdock").css("display")=="none" || $('.windowbar_frames').html()==''){
					var n = 15 + $("div#ui_bottombar").height() + 5 + (Game.version <= 2.06 ? 0 : 14) + ($(".friendsbar").height() > 0 ? $(".friendsbar").height() : 0);
					$('#Westcalc_bottomBar').stop();
					TW_Calc.nearestJob.posY = n;
					$('#Westcalc_bottomBar').animate({"bottom":n},TW_Calc.nearestJob.intTimer);
				}else{
					var n = 47 + $("div#ui_bottombar").height()+ 5 + (Game.version <= 2.06 ? 0 : 14) + ($(".friendsbar").height() > 0 ? $(".friendsbar").height() : 0);
					$('#Westcalc_bottomBar').stop();
					TW_Calc.nearestJob.posY = n;
					$('#Westcalc_bottomBar').animate({"bottom":n},TW_Calc.nearestJob.intTimer);
				}
			}
		},TW_Calc.nearestJob.intTimer);
		TW_Calc.nearestJob.getMap();
	}
	if(TW_Calc.Settings.get("TransferFeeCalc")){
		addCalc = setInterval(TW_Calc.addCalcFee,1000);
	};
	if(TW_Calc.Settings.get("XP_HP_Energy_Calc")){
		xp_hp_enrgy = setInterval(TW_Calc.exp_hp_enrgy,1000);
	};
	if(TW_Calc.Settings.get("questlist")){
		$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_quest"></div>').append($('<div class="menulink" title="'+TW_Calc.lang.quest.lang_5+'" '+'onclick="TW_Calc.quest.window.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>'));
	};
	if(TW_Calc.Settings.get("westcalc")){
		$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_launch_button"></div>').append($('<div class="menulink" title="The-West Calc" '+'onclick="TW_Calc.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>'));
	};
	if(TW_Calc.Settings.get("nearestJob")){
		$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_NearestJob"></div>').append($('<div class="menulink" title="'+TW_Calc.lang.lang_152+'" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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AAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAGAAAAAAAAOEJJTQQwAAAAAAADAQEBADhCSU0ELQAAAAAABgABAAAAAjhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANHAAAABgAAAAAAAAAAAAAAGgAAADIAAAAJAG0AZQBuAHUAaQBjAG8AbgBzAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAyAAAAGgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAGgAAAABSZ2h0bG9uZwAAADIAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcA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b3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSI5M0I5NzlDMjRGNzAyQkREODkzMDJERDgyRjRBRjc4QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNzExRDk4OEZFMjRFMzExOTY5MkQ5RDZDQkZDOTE2NSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSI5M0I5NzlDMjRGNzAyQkREODkzMDJERDgyRjRBRjc4QiIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxMy0wOS0yNFQxMTozODowMyswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTMtMDktMjRUMTE6NDg6NTgrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTMtMDktMjRUMTE6NDg6NTgrMDI6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNjExRDk4OEZFMjRFMzExOTY5MkQ5RDZDQkZDOTE2NSIgc3RFdnQ6d2hlbj0iMjAxMy0wOS0yNFQxMTo0ODo1OCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MTFEOTg4RkUyNEUzMTE5NjkyRDlENkNCRkM5MTY1IiBzdEV2dDp3aGVuPSIyMDEzLTA5LTI0VDExOjQ4OjU4KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uACFBZG9iZQBkAAAAAAEDABADAgMGAAAAAAAAAAAAAAAA/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQcHBw0MDRgQEBgUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wgARCAAaADIDAREAAhEBAxEB/8QAqgAAAwEBAQAAAAAAAAAAAAAABAUGAgcDAQADAQEAAAAAAAAAAAAAAAABAgMEABAAAQMEAQMDBQAAAAAAAAAAAQACBRIDBAYREDEyIhQ1EzM0FQcRAAIBAgMGAgYHCQAAAAAAAAECAxIEABEyMSJCEzMFITRBUmJyFDXwQ2OjREU2UZHRgpJTkwYWEgACAgIBBAMAAAAAAAAAAAAAARExECEgUXGhMhIicv/aAAwDAQECEQMRAAAA4jj2vVCbjU56sWQdHMm8Hql1yXSzlSlOmRI7mOVk2rLjiHzOE46b6FFFZeDKnsKfO+Jmd0I/mbbHf//aAAgBAgABBQBrWhENVFtAhopLkRT0c3hC6ai4uTG+kv4LrtY+k5XWEhtscBpDqXFlARYSuSsbxudj2t+LkOn/2gAIAQMAAQUAcXlVuC9fBLnKqlAuK5cmgpzeQG0gu4dxyLdmg1Jrgq0XNpBbyHEF1wAcNWR3s9rfe6rfX//aAAgBAQABBQCZk53IlIXRP6hJ4mZk7tFyshcD5GF0+Uk8aZjZiNzfcMWRk3r0nrEPFaJH75uOHsIkJuzYndfhsS1Z3ba7c8z9xBqA2KLhdmk9vkJTMyLsO+OxZiIx9qmdszJOQv5mrOte4wFt3zEd5RPze2fmYP3R5L//2gAIAQICBj8APXyRBJusXiFRCQn3JNLZWLgbkSjGnwd8f//aAAgBAwIGPwAslfYh6Lx6+Trh70OD4ov9cXm8oXD/2gAIAQEBBj8Au6JxFbxyPAioqshWFqQ2+Gbeyq3tNXCuILntcMrJMKrdUW1hZ1yqBVWoYhtqnLTg/H3N2k9k4EtrLVDnl4MpMZUrWvGvDvVYubYhjDatykZi3MKsqsebmx3xnS1O7UuOb26zZkLFYytEVbZ5buZWrx3d3iwbW/W8tZ7fJjG7yJkRsOaOAf2VDixpvfI/H+Yn6/8Ak6H23X9rF1HawGWq8nzK71QMzAUrtLHhXEH+yd6lK9+cpJaWSqsnLQkHxUlc5GXYwdfe5e9KO491RLbu7By0wLFWiXMqvLUZV+OVVO/T71Xc2gTngXEZhkJqRsoY9QOW3L+bH/R95Js5plA7dasAHkfILXMhJ3ahTy6vvquVLd92khXlTGK1uULAKnoWRFzzfw9NbJp31po+Yfk3N0n+P3OrF7fzxiadJroKklu9SyPISsj1Zb2XB/UtOJ5rpGuEkqCsTTIC+RObZyA/uxlNDPFciN4qitQVXzIOea16tNGJ769AmdJYZuS9tJVIvIQKahlSgYbtPq6sfFJKbhEoaNShRVy8FpXOkBcslHCvD6wne0ukkjUPywC0YYamrLjTnqp3qeHHm2+V/A+V+q9bV1fYxe+T6cXX830xt+mjA+WbfxO3ZxY7Z+nOsNGr06fa9T2sWvk/KfX6tR6P2f8Abx+C2/iNu36U4tf07102++Mfl/zDH//Z)"'+'>').hover(function(){$(this).css('background-position','-25px 0');},function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>'))
		$('#TWCalc_NearestJob').click(function(e){
			TW_Calc.nearestJob.s = new west.gui.Selectbox().setHeader(TW_Calc.lang.lang_152);
			TW_Calc.nearestJob.s.divMain.find(".arrow").remove()
			var i = 0;
			var sBox = TW_Calc.nearestJob.s;
			data = TW_Calc.nearestJob.list;
			sBox.addItem(0,TW_Calc.lang.lang_150);	
			while(new Boolean(data[i])!=false){
				sBox.addItem(data[i],JobList.getJobById(data[i]).name);
				i++
			}
			sBox.addListener(function(id){
				if(id!=0){
					TW_Calc.nearestJob.search(id)
				}else{
					TW_Calc.nearestJob.open();
				}
			});
			sBox.show(e);
		});
		TW_Calc.nearestJob.getMap();
	}
	TW_Calc.api = TheWestApi.register(TW_Calc.shortName, TW_Calc.info.name, TW_Calc.gameMIN, TW_Calc.gameMAX, TW_Calc.author, TW_Calc.website);
	TW_Calc.api.setGui('Visit our website! :)</br><a href="javascript:TW_Calc.Settings.open()">'+TW_Calc.lang.lang_3+'</a>');
}
catch(e){new TW_Calc.Error(e,'Applying Westcalc Settings').show()};

if(TW_Calc.Settings.get("MenuCraftButton")){
	$('.button.crafting.background').unbind('click').click(function(){
		TW_Calc.craft.openMyProffesion();
	}
	)
}

/*WARDROBE*/
TW_Calc.Wardrobe = {};
TW_Calc.Wardrobe.id = 'TW_Calc_Wardrobe';
TW_Calc.Wardrobe.img = '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UHJjQFkAAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgACOEJJTQQCAAAAAAAGAAAAAAAAOEJJTQQwAAAAAAADAQEBADhCSU0ELQAAAAAABgABAAAAAzhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANHAAAABgAAAAAAAAAAAAAAGgAAADIAAAAJAG0AZQBuAHUAaQBjAG8AbgBzAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAyAAAAGgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAGgAAAABSZ2h0bG9uZwAAADIAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAA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ZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iOTNCOTc5QzI0RjcwMkJERDg5MzAyREQ4MkY0QUY3OEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzkxMUQ5ODhGRTI0RTMxMTk2OTJEOUQ2Q0JGQzkxNjUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iOTNCOTc5QzI0RjcwMkJERDg5MzAyREQ4MkY0QUY3OEIiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTMtMDktMjRUMTE6Mzg6MDMrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDEzLTA5LTI0VDExOjUyKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDEzLTA5LTI0VDExOjUyKzAyOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6QzgxMUQ5ODhGRTI0RTMxMTk2OTJEOUQ2Q0JGQzkxNjUiIHN0RXZ0OndoZW49IjIwMTMtMDktMjRUMTE6NTIrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOTExRDk4OEZFMjRFMzExOTY5MkQ5RDZDQkZDOTE2NSIgc3RFdnQ6d2hlbj0iMjAxMy0wOS0yNFQxMTo1MiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAhQWRvYmUAZAAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEHBwcNDA0YEBAYFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAGgAyAwERAAIRAQMRAf/EAL0AAAIDAQEAAAAAAAAAAAAAAAUGAQIDBAcBAAMBAQAAAAAAAAAAAAAAAAECAwQAEAACAQMCBAUFAAAAAAAAAAABAgMABAURBhAxEjIhIhMUNSMzNBUHEQACAQIDBQMJBgcAAAAAAAABAgMSBAARIjEyMzQFIRMUQWFCUmJyRDUG8FEjQ2NFwdGCU5OjNhIAAQEFAwkIAwAAAAAAAAAAAAERITECEhDwMiBBUaEiUpKisnGBscFCYoLCAxMj/9oADAMBAQIRAxEAAADxXDtvNsmDbGkoY7iasFrNiXhAfYNq8ykaA2cBpym5Nxt1SSEz1zZf0DBlD2DPnekyu6EPzLtjv//aAAgBAgABBQAdCAyxUvpEBgqmRTSuvCZNKRS1ICWdPpq3SXiZG9JqlQkKughRlJRiieUiNq1NW3bJyPKPtahw/9oACAEDAAEFAG62oCSiHFEs1KjCtGrVqQeDaUNAuvm6dTbkMOqkYUSKLjQMoJWgwWtFq45w8o+ctR8f/9oACAEBAAEFAMjc7myOYTGb4jjmvN62N3edU+UixEqrcxX6j3CVtHJhNwWG757fIbvyVrPhcFlbcf0CLc19Jb5bPWOUx37jB1i8zY4/OpupRNu7OYfJxQ5jH226I83JIuT3Bjb2D3FhW7vmMd3Yn5vdn5lj90d1f//aAAgBAgIGPwB5m4xw0eqMHERO0WRGVT7Es25NPNiFYmgRb4h6IuLwp0fIpjNKlPCQEcKiytanneUeIjB6Nj03myVjk//aAAgBAwIGPwAjqGxGK63DrFF7/wAvw/psX3ZR4rBm/h9tH66uP7TDcy2x9VXVsc3JYor408tPVTzjyNqCZH//2gAIAQEBBj8Au4rRmaON3hSGCMSBkhamrJg76sqtW7V6K4VkS7QrsWOzC7PdjHlxDdXdxeqsZDrDMJLcOo7GXNaGWoaal1YuLNI3dLd+6i3jKysitlICTm4zpakU1LghbSeMgkgJC4z8+ar/ABwkknjYo0yKlzNEAw7RsZfv7Mbt7yPj+Yn4/wDk4H63H9rHW3jeS3yg6my3cBIdSCxV48jGa1yqj1x6vSxaX03Xetz2yTRyPas7UyLBkzxnO8IAkyyOnHSJrq/muX8PdEXd4XaZyLhhk4qnzYKKE/EbTT7qyRxgyRteRiOarSQIEzq8vb5sRuPqXroAVIS1TZlj21c792Jr2e+uDbzdSuZIvHMzNArJG0cC5PNnFHXopo1Vfh+t8w/Zu93T/P8A072OoztcSW87PeRGRIZEmRpmYCQt2axUHo0f0Y76H6h6iGVkZQySSICgz7Vaahg22lhT62ELG6dooXiSWWuQqZiXfLvWZu7qamGN5JnVKK5XbVia/mkPiI5oJ1Xw8iyOghQAh8jQvYQunVhaPqDqZZYwpYCXIkk6+Y82Imvzd3TQl53kcME700pVGrMwhipWt0EjR94z92kMTKkfNt8r8Dyv5Xrb3F9jF7yfDi4/N8MbftuYHyzb8Tt2eljpn/OcYbm95d32vU9rFryfKfn728eD+n/bx8Ft+I27ftTi1/53jpt98Y/b/mGP/9k=';
TW_Calc.Wardrobe.lang = [
TW_Calc.lang.lang_170,
TW_Calc.lang.lang_160,
TW_Calc.lang.lang_161,
TW_Calc.lang.lang_162,
TW_Calc.lang.lang_163,
TW_Calc.lang.lang_164,
TW_Calc.lang.lang_165,
TW_Calc.lang.lang_166,
TW_Calc.lang.lang_171,
TW_Calc.lang.lang_167,
TW_Calc.lang.lang_160,
TW_Calc.lang.lang_172,
TW_Calc.lang.lang_169
]

TW_Calc.Wardrobe.bannedLocales = ["hu_HU"];

if(TW_Calc.Settings.get("wardrobe")){
	$('#'+TW_Calc.Wardrobe.id).remove();
	$('#ui_menubar').append($('<div class="ui_menucontainer" id="'+TW_Calc.Wardrobe.id+'"></div>').append($('<div class="menulink" title="'+TW_Calc.Wardrobe.lang[0]+'" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,'+TW_Calc.Wardrobe.img+')"'+'>').hover(function(){$(this).css('background-position','-25px 0');},function(){$(this).css('background-position','0 0');})).append('</div><div class="menucontainer_bottom"></div>'));
}

TW_Calc.Wardrobe.window = {};
$('#TW_Calc_Wardrobe').click(function(){
	TW_Calc.Wardrobe.window.launch();
})

TW_Calc.Wardrobe.window.launch = function(){
	if(typeof(wman.getById('wear'))=="undefined"){
		Wear.open();
	}else{
		wman.getById('wear').bringToTop();
	}
	if(typeof(wman.getById('inventory'))!=undefined){
		wman.getById('inventory').destroy();
	}
	TW_Calc.Wardrobe.window.open();
	if(TW_Calc.Wardrobe.Wardrobe.getAll().length != 0){
		TW_Calc.Wardrobe.Wardrobe.show(0)
	}
}

TW_Calc.Wardrobe.window.getPos = function(k){
	var win = $('.tw2gui_window.tw2gui_win2.tw2gui_window_notabs.wear');
	var l = Number(win.css("left").split('px')[0]);
	var t = Number(win.css("top").split('px')[0]);
	var w = Number(win.css("width").split('px')[0]);
	var s = l + w;
	var m = t;
	obj = {x:s,y:m};
	return obj[k];
}

TW_Calc.Wardrobe.window.moveTo = function(x,y){
	$('.tw2gui_window.tw2gui_win2.'+TW_Calc.Wardrobe.id).css('left',TW_Calc.Wardrobe.window.getPos('x')).css('top',TW_Calc.Wardrobe.window.getPos('y'));
}

TW_Calc.Wardrobe.alert = function(){
	if(TW_Calc.Wardrobe.bannedLocales.indexOf(Game.locale)!=-1){
		if(localStorage.getItem("TWCalc_Wardrobe_Status")==null){
			new west.gui.Dialog().setText("TW-Calc Wardrobe is disabled because is not allowed by support in your game locale.").setTitle("TW-Calc Wardrobe is disabled").show().addButton("ok");
		}
	}
}

TW_Calc.Wardrobe.window.title = {
	wardrobe: TW_Calc.Wardrobe.lang[0],
	OwnCalc: TW_Calc.Wardrobe.lang[1],
	job: TW_Calc.Wardrobe.lang[9]
}

TW_Calc.Wardrobe.window.open = function(){
	var win = wman.open(TW_Calc.Wardrobe.id);
	win.setTitle(TW_Calc.Wardrobe.lang[0]).setMiniTitle(TW_Calc.Wardrobe.lang[0]).setSize(328,383);
	var tabclick = function(win,id){
		TW_Calc.Wardrobe.window.showTab(id);
	};
	if(TW_Calc.Wardrobe.bannedLocales.indexOf(Game.locale)==-1){
		win.addTab(TW_Calc.Wardrobe.lang[0],'wardrobe',tabclick);
	}
	win.addTab(TW_Calc.Wardrobe.lang[1],'OwnCalc',tabclick);
	$('.tw2gui_window.tw2gui_win2.'+TW_Calc.Wardrobe.id).addClass("noreload");
	win.appendToContentPane($('<div id="wardrobe" class="TW_Calc" style="display:none;margin-top:5px;"></div><div id="OwnCalc" class="TW_Calc" style="display:none;margin-top:5px;"></div><div id="job" class="TW_Calc" style="display:none;margin-top:5px;"></div>'));
	TW_Calc.Wardrobe.window.moveTo(TW_Calc.Wardrobe.window.getPos('x'),TW_Calc.Wardrobe.window.getPos('y'));
	TW_Calc.Wardrobe.OwnCalc.launch();
	if(TW_Calc.Wardrobe.bannedLocales.indexOf(Game.locale)==-1){
		TW_Calc.Wardrobe.Wardrobe.launch();
	}
	$('#TW_Calc_Wardrobe_Head > #TW_Calc_Caption').remove();
}

TW_Calc.Wardrobe.Wardrobe = {};

TW_Calc.Wardrobe.OwnCalc = {};

TW_Calc.Wardrobe.OwnCalc.show = function(id){
	$('#TW_Calc_Wardrobe_OwnCalc_del').css('display','inline-block');
	$('#TW_Calc_Wardrobe_OwnCalc_config').css('display','inline-block');
	$('#TW_Calc_OwnCalc_Items>.tw2gui_groupframe_content_pane').empty();
	var s = TW_Calc.Wardrobe.OwnCalc.get(id);
	$('#TW_Calc_Wardrobe_OwnCalc_del').unbind('click');
	$('#TW_Calc_Wardrobe_OwnCalc_del').attr('remove_id',id).click(function(){
		TW_Calc.Wardrobe.OwnCalc.remove($(this).attr('remove_id'));
	});
	$('#TW_Calc_Wardrobe_OwnCalc_config').unbind('click');
	$('#TW_Calc_Wardrobe_OwnCalc_config').attr('config_id',id).click(function(){
		TW_Calc.Wardrobe.OwnCalc.seeConfiguration($(this).attr('config_id'));
	});
	var i = 0;
	var name = s['name'].toString();
	if(name==''){name = 'Unnamed';}	
	delete s.name;
	if(Bag.loaded){
		var items = west.item.Calculator.getBestSet(s).getItems();
	}
	if(Bag.loaded){
		for(i;i < (items.length);i++){
			var item = new tw2widget.InventoryItem(ItemManager.get(Number(items[i])));
			$('#TW_Calc_OwnCalc_Items>.tw2gui_groupframe_content_pane').append($(item.getMainDiv()).attr('item_id',items[i]).click(function(){TW_Calc.Wardrobe.Wardrobe.wear($(this).attr('item_id'));}));
		}
	}else{
		Bag.loadItems();
	}
	TW_Calc.Wardrobe.Wardrobe.fadeAll();
	$('#TW_Calc_OwnCalc_Head > #TW_Calc_Caption').remove();
	$('#TW_Calc_OwnCalc_Head').append('<span id="TW_Calc_Caption" style="position:absolute;top:14px;left:50px;font-weight:bold;font-size:18px;height:22px;width:160px;overflow:hidden;">'+name+'</span>');
}

TW_Calc.Wardrobe.OwnCalc.seeConfiguration = function(id){
	var data = TW_Calc.Wardrobe.OwnCalc.get(Number(id));	
	var dialog = new west.gui.Dialog((data['name'] == '' ? 'Unnamed' : data['name']),'<div id="TW_Calc_Wardrobe_OwnCalc_Dialog_Div"></div>').setId('TW_Calc_Wardrobe_OwnCalc_Dialog');
	dialog.addButton(TW_Calc.Wardrobe.lang[3],function(){});
	dialog.show();
	$("div#TW_Calc_Wardrobe_OwnCalc_Dialog_Div").append(new west.gui.Groupframe().appendToContentPane('<div id="Skills" style="width:432px;margin-left:auto;margin-right:auto;text-align:center;"></div><div></div>').getMainDiv());
	var skills = CharacterSkills.allSkillKeys;
	var k = 0;
	for(k;k<skills.length;k++){
		$("#Skills").append(CharacterSkills.getSkill(skills[k]).getSkillPMBox("TW_Calc_Wardrobe_OwnCalc_"+skills[k],{},{id:"TW_Calc_Wardrobe_OwnCalc_"+skills[k]+"_id",min_value:0,start_value:data[skills[k]],max_value:data[skills[k]],extra_points:0,callbackPlus:function(){},callbackMinus:function(){}}))
	}
	$('#TW_Calc_Wardrobe_OwnCalc_Dialog').css('top',(($('body').height() - $('#TW_Calc_Wardrobe_OwnCalc_Dialog_Div').height()) / 2))
}

TW_Calc.Wardrobe.OwnCalc.launch = function(){
	TW_Calc.Wardrobe.window.showTab('OwnCalc');
	var maindiv = '#OwnCalc.TW_Calc';
	var c = '<div onclick="TW_Calc.Wardrobe.OwnCalc.AddDialog()" title="'+TW_Calc.Wardrobe.lang[11]+'" style="position:absolute;right:44px;background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;display:inline-block;background-position: -16px 64px;cursor:pointer"></div><div id="TW_Calc_Wardrobe_OwnCalc_del" style="background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;display:none;background-position: -48px 0px;cursor:pointer;" title="'+TW_Calc.Wardrobe.lang[8]+'"></div><div id="TW_Calc_Wardrobe_OwnCalc_config" title="'+TW_Calc.Wardrobe.lang[12]+'" style="display:none;background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;display:inline-block;background-position: -32px 64px;cursor:pointer"></div><div id="TW_Calc_OwnCalc_Selectbox" style="position: absolute;right: 14px;top: 14px;background:url(http://cdn.beta.the-west.net/images/window/character/title_editbtn.jpg) no-repeat;width:24px;height:18px;cursor:pointer;background-position: -2px -1px;border: 1px solid"></div>';
	$(maindiv).html(new west.gui.Groupframe().setId('TW_Calc_OwnCalc_Head').appendToContentPane(c).getMainDiv())
	$('#TW_Calc_OwnCalc_Selectbox').click(function(e){
		TW_Calc.Wardrobe.OwnCalc.Selectbox = new west.gui.Selectbox().setHeader(TW_Calc.Wardrobe.lang[10]);
		var sBox = TW_Calc.Wardrobe.OwnCalc.Selectbox;
		var i = 0;
		var s = TW_Calc.Wardrobe.OwnCalc.getAll();
		for(i;i < s.length;i++){
			if(s[i]['name']==''){
				var name = 'Unnamed';
			}else{
				var name = s[i]['name'];
			}
			sBox.addItem(i,name);
		}
		sBox.addListener(function(id){
			TW_Calc.Wardrobe.OwnCalc.show(id);
		});
		TW_Calc.Wardrobe.OwnCalc.Selectbox.show(e);
	});
	$(maindiv).append(new west.gui.Groupframe().setId('TW_Calc_OwnCalc_Items').getMainDiv());
	$('#TW_Calc_OwnCalc_Items').css('height',220);
	if(TW_Calc.Wardrobe.OwnCalc.getAll().length != 0){
		TW_Calc.Wardrobe.OwnCalc.show(0);
	}
};

TW_Calc.Wardrobe.OwnCalc.remove = function(id){
	var item = TW_Calc.Wardrobe.OwnCalc.getAll();
	item.splice(id,1);
	TW_Calc.Wardrobe.OwnCalc.Save(item);
	new UserMessage(TW_Calc.Wardrobe.lang[6],UserMessage.TYPE_SUCCESS).show();
	TW_Calc.Wardrobe.OwnCalc.launch();
	TW_Calc.Wardrobe.OwnCalc.show((TW_Calc.Wardrobe.OwnCalc.getAll().length - 1));
}

TW_Calc.Wardrobe.OwnCalc.getAll = function(){
	if(new Boolean(localStorage.getItem('TWCalc_OwnCalc'))!=false){
		var data = localStorage.getItem('TWCalc_OwnCalc');
	}else{
		var data = '[]';
	}
	return $.parseJSON(data);
}

TW_Calc.Wardrobe.OwnCalc.get = function(i){
	if(new Boolean(localStorage.getItem('TWCalc_OwnCalc'))!=false){
		var data = localStorage.getItem('TWCalc_OwnCalc');
	}else{
		var data = '[]';
	}
	return $.parseJSON(data)[i];
}

TW_Calc.Wardrobe.OwnCalc.AddDialog = function(){
	var dialog = new west.gui.Dialog(TW_Calc.Wardrobe.lang[11],'<div id="TW_Calc_Wardrobe_OwnCalc_Dialog_Div"></div>').setId('TW_Calc_Wardrobe_OwnCalc_Dialog');
	dialog.addButton(TW_Calc.lang.lang_36,function(){
		TW_Calc.Wardrobe.OwnCalc.Add(TW_Calc.Wardrobe.OwnCalc.createObject());
	}).addButton(TW_Calc.lang.lang_92,function(){}).show();
	$("div#TW_Calc_Wardrobe_OwnCalc_Dialog_Div").append(new west.gui.Groupframe().appendToContentPane('<div id="Skills" style="width:432px;margin-left:auto;margin-right:auto;text-align:center;"></div><div></div>').getMainDiv());
	var skills = CharacterSkills.allSkillKeys;
	var k = 0;
	var logicPlusMinus = function(event){
		var butObj=event.data.obj;
		if($(event.currentTarget).hasClass('butPlus')){
			var v = $(".tw2gui_plusminus#"+butObj.id+">.displayValue").html();
			$(".tw2gui_plusminus#"+butObj.id+">.displayValue").html(Number(v) + 1);
		}
		if($(event.currentTarget).hasClass('butMinus')){
			var v = $(".tw2gui_plusminus#"+butObj.id+">.displayValue").html();
			if((Number(v) - 1)>=0){$(".tw2gui_plusminus#"+butObj.id+">.displayValue").html(Number(v) - 1);}
		}
	}
	for(k;k<skills.length;k++){
		$("#Skills").append(CharacterSkills.getSkill(skills[k]).getSkillPMBox("TW_Calc_Wardrobe_OwnCalc_"+skills[k],{},{id:"TW_Calc_Wardrobe_OwnCalc_"+skills[k]+"_id",min_value:0,start_value:0,max_value:1000,extra_points:0,callbackPlus:logicPlusMinus,callbackMinus:logicPlusMinus}))
	}
	$("#TW_Calc_Wardrobe_OwnCalc_Dialog_Div").append(new west.gui.Textfield().setWidth(440).setPlaceholder(TW_Calc.lang.lang_157).setId("TW_Calc_Wardrobe_OwnCalc_Name").getMainDiv());
	$('#TW_Calc_Wardrobe_OwnCalc_Dialog').css('top',(($('body').height() - $('#TW_Calc_Wardrobe_OwnCalc_Dialog_Div').height()) / 2))
}

TW_Calc.Wardrobe.OwnCalc.createObject = function(){
	var skills = CharacterSkills.allSkillKeys;
	var i = 0;
	var data = {};
	for(i;i < skills.length;i++){
		var t = $("#TW_Calc_Wardrobe_OwnCalc_"+skills[i]+"_id>.displayValue").text();
		data[skills[i]] = Number(t);
	}
	data['name'] = $('#TW_Calc_Wardrobe_OwnCalc_Name').val();	
	return data;
}

TW_Calc.Wardrobe.OwnCalc.Add = function(k){
	var data = TW_Calc.Wardrobe.OwnCalc.getAll();
	data.push(k);
	TW_Calc.Wardrobe.OwnCalc.Save(data);
	return data;
}

TW_Calc.Wardrobe.OwnCalc.Save = function(s){
	var k = '[';
	var i = 0;
	for(i;i < s.length;i++){
		if(i!=(s.length - 1)){
			var l = ',';
		}else{
			var l = '';
		}
		var skills = CharacterSkills.allSkillKeys.join().split(',');
		skills.push('name');
		var m = 0;
		var o = '{';
		for(m;m < skills.length;m++){
			if(m!=(skills.length - 1)){
				var q = ',';
			}else{
				var q = '';
			}
			o+='"'+skills[m]+'":"'+s[i][skills[m]]+'"'+q;
		}
		o+='}';
		k+=o+l;
	}
	k+=']';
	localStorage.setItem('TWCalc_OwnCalc',k);
	new UserMessage(TW_Calc.Wardrobe.lang[6],UserMessage.TYPE_SUCCESS).show();
	TW_Calc.Wardrobe.OwnCalc.show(TW_Calc.Wardrobe.OwnCalc.getLength());
}

TW_Calc.Wardrobe.OwnCalc.getLength = function(){
	return (TW_Calc.Wardrobe.OwnCalc.getAll().length - 1);
}

TW_Calc.Wardrobe.Wardrobe.remove = function(id){
	var item = TW_Calc.Wardrobe.Wardrobe.getAll();
	item.splice(id,1);
	TW_Calc.Wardrobe.Wardrobe.Save(item);
	new UserMessage(TW_Calc.Wardrobe.lang[6],UserMessage.TYPE_SUCCESS).show();
	TW_Calc.Wardrobe.Wardrobe.launch();
	TW_Calc.Wardrobe.Wardrobe.show((TW_Calc.Wardrobe.Wardrobe.getAll().length - 1));
}

TW_Calc.Wardrobe.Wardrobe.show = function(id){
	$('#TW_Calc_Wardrobe_Wardrobe_del').css('display','inline-block');
	$('#TW_Calc_Wardrobe_Items>.tw2gui_groupframe_content_pane').empty();
	var s = TW_Calc.Wardrobe.Wardrobe.get(id);
	$('#TW_Calc_Wardrobe_Wardrobe_del').unbind('click');
	$('#TW_Calc_Wardrobe_Wardrobe_del').attr('remove_id',id).click(function(){
		TW_Calc.Wardrobe.Wardrobe.remove($(this).attr('remove_id'));
	});
	var i = 0;
	if(Bag.loaded){
		for(i;i < (s.length - 1);i++){
			if(s[i]!=null){
				var item = new tw2widget.InventoryItem(ItemManager.get(s[i]));
				$('#TW_Calc_Wardrobe_Items>.tw2gui_groupframe_content_pane').append($(item.getMainDiv()).attr('item_id',s[i]).click(function(){TW_Calc.Wardrobe.Wardrobe.wear($(this).attr('item_id'));}));
			}
		}
	}else{
		Bag.loadItems()
	}
	TW_Calc.Wardrobe.Wardrobe.fadeAll();
	$('#TW_Calc_Wardrobe_Head > #TW_Calc_Caption').remove();
	$('#TW_Calc_Wardrobe_Head').append('<span id="TW_Calc_Caption" style="position:absolute;top:14px;left:32px;font-weight:bold;font-size:18px;height:22px;width:160px;overflow:hidden;">'+(s[(s.length - 1)] == '' ? 'Unnamed' : s[(s.length - 1)])+'</span>');
}

TW_Calc.Wardrobe.Wardrobe.wear = function(id){
	if(Bag.getItemByItemId(Number(id))!=null){
		Wear.carry(Bag.getItemByItemId(Number(id)));
	}
	$('.item.item_inventory[item_id='+id+']').css('opacity','0.5');
}

TW_Calc.Wardrobe.Wardrobe.fadeAll = function(){
	if(Bag.loaded){
		var s = WearSet.setItems;
		var i = 0;
		for(i;i < s.length;i++){
			var id = WearSet.setItems[i];
			$('.item.item_inventory[item_id='+id+']').css('opacity','0.5');
		}
	}
}

TW_Calc.Wardrobe.Wardrobe.launch = function(){
	try{
		TW_Calc.Wardrobe.window.showTab('wardrobe');
		var maindiv = '#wardrobe.TW_Calc';
		var c = '<div onclick="TW_Calc.Wardrobe.Wardrobe.AddDialog()" title="'+TW_Calc.Wardrobe.lang[2]+'" style="position:absolute;right:44px;background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;display:inline-block;background-position: -16px 65px;cursor:pointer"></div><div style="display:inline-block;width:1px;height:15px;"></div><div id="TW_Calc_Wardrobe_Wardrobe_del" style="background:url(http://cdn.beta.the-west.net/images/tw2gui/iconset.png);width:16px;height:16px;display:none;background-position: -48px 0px;cursor:pointer;" title="'+TW_Calc.Wardrobe.lang[8]+'"></div><div id="wardrobe_selector" style="position: absolute;right: 14px;top: 14px;background:url(http://cdn.beta.the-west.net/images/window/character/title_editbtn.jpg) no-repeat;width:24px;height:18px;cursor:pointer;background-position: -2px -1px;border: 1px solid"></div>';
		$(maindiv).html(new west.gui.Groupframe().setId('TW_Calc_Wardrobe_Head').appendToContentPane(c).getMainDiv())
		$('#wardrobe_selector').click(function(e){
			TW_Calc.Wardrobe.Wardrobe.Selectbox = new west.gui.Selectbox().setHeader(TW_Calc.Wardrobe.lang[0]);
			var sBox = TW_Calc.Wardrobe.Wardrobe.Selectbox;
			var i = 0;
			var s = TW_Calc.Wardrobe.Wardrobe.getAll();
			for(i;i < s.length;i++){
				sBox.addItem(i,(s[i][10] == '' ? 'Unnamed' : s[i][10]));
			}
			sBox.addListener(function(id){
				TW_Calc.Wardrobe.Wardrobe.show(id);
			});
			TW_Calc.Wardrobe.Wardrobe.Selectbox.show(e);
		});
		$(maindiv).append(new west.gui.Groupframe().setId('TW_Calc_Wardrobe_Items').getMainDiv());
		$('#TW_Calc_Wardrobe_Items').css('height',220);
	}catch(e){}
};

TW_Calc.Wardrobe.Wardrobe.getAll = function(){
	if(new Boolean(localStorage.getItem('TWCalc_Wardrobe'))!=false){
		var data = localStorage.getItem('TWCalc_Wardrobe');
	}else{
		var data = '[]';
	}
	return $.parseJSON(data);
}

TW_Calc.Wardrobe.Wardrobe.get = function(i){
	if(new Boolean(localStorage.getItem('TWCalc_Wardrobe'))!=false){
		var data = localStorage.getItem('TWCalc_Wardrobe');
	}else{
		var data = '[]';
	}
	return $.parseJSON(data)[i];
}

TW_Calc.Wardrobe.Wardrobe.AddDialog = function(){
	new west.gui.Dialog().setTitle(TW_Calc.Wardrobe.lang[2]).setId('TW_Calc_Wardrobe_Add').setText(TW_Calc.Wardrobe.lang[5]).addButton(TW_Calc.Wardrobe.lang[4],function(){
		TW_Calc.Wardrobe.Wardrobe.AddMyWear($('#TW_Calc_Wardrobe_Wardrobe_Add').val());
	}).addButton(TW_Calc.Wardrobe.lang[3],function(){}).show();
	$('#TW_Calc_Wardrobe_Add>.tw2gui_dialog_content>.tw2gui_dialog_text').append('</br>').append(new west.gui.Textfield().setWidth("400px").setPlaceholder(TW_Calc.Wardrobe.lang[7]).setId("TW_Calc_Wardrobe_Wardrobe_Add").getMainDiv())
}

TW_Calc.Wardrobe.Wardrobe.Save = function(s){
	var k = '[';
	var i = 0;
	for(i;i < s.length;i++){
		if(i!=(s.length - 1)){
			var l = ',';
		}else{
			var l = '';
		}
		k+='['+s[i][0]+','+s[i][1]+','+s[i][2]+','+s[i][3]+','+s[i][4]+','+s[i][5]+','+s[i][6]+','+s[i][7]+','+s[i][8]+','+s[i][9]+',"'+s[i][10]+'"]'+l;
	}
	k+=']';
	localStorage.setItem('TWCalc_Wardrobe',k);
}

TW_Calc.Wardrobe.Wardrobe.Add = function(data){
	var m = TW_Calc.Wardrobe.Wardrobe.getAll();
	m.push(data);
	TW_Calc.Wardrobe.Wardrobe.Save(m);
	new UserMessage(TW_Calc.Wardrobe.lang[6],UserMessage.TYPE_SUCCESS).show();
	TW_Calc.Wardrobe.Wardrobe.launch();
	TW_Calc.Wardrobe.Wardrobe.show((TW_Calc.Wardrobe.Wardrobe.getAll().length - 1));
}

TW_Calc.Wardrobe.Wardrobe.AddMyWear = function(name){
	var data = [];
	var i = 0;	
	var s = ['animal','belt','body','foot','head','left_arm','neck','pants','right_arm','yield','name'];
	for(i;i < s.length;i++){
		if(s[i]!='name'){
			if(new Boolean(Wear.wear[s[i]])!=false){
				data.push(Wear.wear[s[i]].getId());
			}else{
				data.push('null');
			}
		}else{
			data.push(name);
		}
	}
	TW_Calc.Wardrobe.Wardrobe.Add(data);
}

TW_Calc.Wardrobe.window.showTab = function(id){
	$("."+TW_Calc.Wardrobe.id+" > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > *").each(function(){
		$(this).removeClass("tw2gui_window_tab_active")
	});
	$("."+TW_Calc.Wardrobe.id+" > div.tw2gui_window_tabbar > .tw2gui_window_tabbar_tabs > ._tab_id_"+id).addClass("tw2gui_window_tab_active");
	$("."+TW_Calc.Wardrobe.id+" > div.tw2gui_window_content_pane > *").each(function(){
		$(this).hide();
	});
	$("."+TW_Calc.Wardrobe.id+" > div.tw2gui_window_content_pane > #"+id).fadeIn();
	wman.getById(TW_Calc.Wardrobe.id).setTitle(TW_Calc.Wardrobe.window.title[id]).setMiniTitle(TW_Calc.Wardrobe.window.title[id]);
}
/*WARDROBE*/

try{
/*Tombola*/
TW_Calc.TombolaExporter = {}

TW_Calc.TombolaExporter.modify = function(){
	TW_Calc.TombolaExporter.Tombola();
}

TW_Calc.TombolaExporter.Tombola = function(){
	west.wof.WheelofFortune.prototype.process = function(action, data, callback, context, window){
		data = data || {};
		data.action = action;
		data.wofid = this.id;
		var that = this;
		Ajax.remoteCall("wheeloffortune", "gamble", data, function(resp){
			if(resp.error) {
				return new UserMessage(resp.msg, UserMessage.TYPE_ERROR).show();
			}else{
				TW_Calc.TombolaExporter.createData(resp, data.wofid);
			}
			EventHandler.signal("inventory_changed");
			typeof callback === "function" && callback.call(context || this, resp);
		}, window);
	}
}

TW_Calc.TombolaExporter.createData = function(a,b){
	console.log(a);
	console.log(b);
	if(b == 3){
		var prize = a.picked[0];
		var category = a.picked[1];
		TW_Calc.TombolaExporter.exportData(prize,b,category);
		TW_Calc.TombolaExporter.saveData(prize,b,category);
	}
	if(b == 6){
		var prize = a.prize.itemId;
		var category = 0;
		var c = true;
		if(a.free == 0){
			var s = false;
		}
		TW_Calc.TombolaExporter.ValentineSpins(s);
		TW_Calc.TombolaExporter.exportData(prize,b,category);
		TW_Calc.TombolaExporter.saveData(prize,b,category);
	}
}

TW_Calc.TombolaExporter.ValentineSpins = function(s){
	if(localStorage.getItem("TWCalc_Tombola_Spins_6")==null){
		var a = new Object();
		a["total"] = 0;
		a["free"] = 0;
	}else{
		var a = $.parseJSON(localStorage.getItem("TWCalc_Tombola_Spins_6"));
	}
	a["total"] = a["total"] + 1;
	if(s == true){
		a["free"] = a["free"] + 1;
	}
	localStorage.setItem("TWCalc_Tombola_Spins_6", JSON.stringify(a));
}

TW_Calc.TombolaExporter.exportData = function(prize,id,category){
	$.get(TW_Calc.website+'/tombolaExport.php',{tombolaId:id,prize:prize,category:category},function(data){},"jsonp");
}

TW_Calc.TombolaExporter.modify();

TW_Calc.TombolaExporter.createObjectFromStorage = function(tombolaId){
	var d = localStorage.getItem('TWCalc_Tombola_'+tombolaId);
	return $.parseJSON(d);
}

TW_Calc.TombolaExporter.keyExistInObject = function(k,o){
	var i = 0;
	var s = false;
	for(i;i < o.length;i++){
		if(Number(o[i].id) == Number(k)){
			s = true;
			break;
		}
	}
	return [s,i];
}

TW_Calc.TombolaExporter.saveData = function(prize,tombolaId,category){
	try{
		if(tombolaId == 3){
			if(TW_Calc.TombolaExporter.existStorageItem(tombolaId)==true){
				var o = TW_Calc.TombolaExporter.createObjectFromStorage(tombolaId);
			}else{
				var o = [[],[],[],[]];
			}
			var n = o[category].length;
			var q = TW_Calc.TombolaExporter.keyExistInObject(prize,o[category]);
			if(q[0] == true){
				var n = q[1];
				var val = Number(o[category][n]['count']);
				o[category][n].count = Number(val) + 1;
			}else{
				o[category][n] = {id:0,count:0};
				o[category][n]['count'] = 1;
			}
			o[category][n]['id'] = prize;
			TW_Calc.TombolaExporter.Save(o,tombolaId);
		}else if(tombolaId == 6){
			if(TW_Calc.TombolaExporter.existStorageItem(tombolaId)==true){
				var o = TW_Calc.TombolaExporter.createObjectFromStorage(tombolaId);
			}else{
				var o = new Object();
			}
			if(o.hasOwnProperty(prize)==true){
				o[prize] = o[prize] + 1;
			}else{
				o[prize] = 1;
			}
			TW_Calc.TombolaExporter.Save(o,tombolaId);
		}
		
	}catch(e){
		new TW_Calc.Error(e,'TombolaExporter.saveData').show();
	}
}

TW_Calc.TombolaExporter.Save = function(o,tombolaId){
	try{
		if(tombolaId == 3){
			var i = 0;
			var data = '[';
			for(i;i < o.length;i++){
				var k = 0;
				data+= '[';
				for(k;k < o[i].length;k++){
					var id = o[i][k].id;
					var count = o[i][k].count;
					data+='{"id":"'+id+'","count":"'+count+'"}'
					if(k != (o[i].length - 1)){
						data+=',';
					}
				}
				data+= ']';
				if(i != (o.length - 1)){
					data+=',';
				}
			}
			data+=']';
			localStorage.setItem('TWCalc_Tombola_'+tombolaId,data);
		}else if(tombolaId == 6){
			var data = JSON.stringify(o);
			localStorage.setItem('TWCalc_Tombola_'+tombolaId,data);
		}
	}catch(e){
		new TW_Calc.Error(e,'TombolaExporter.Save').show();
	}
}

TW_Calc.TombolaExporter.existStorageItem = function(tombolaId){
	if(new Boolean(localStorage.getItem('TWCalc_Tombola_'+tombolaId))!=false){
		var status = true;
	}else{
		var status = false;
	}
	return status;
}

TW_Calc.TombolaExporter.wof = {3:TW_Calc.lang.lang_174}

TW_Calc.TombolaExporter.get = function(tombolaId){
	var d = localStorage.getItem('TWCalc_Tombola_'+tombolaId);
	return d;
}

TW_Calc.TombolaExporter.getString = function(tombolaId){
	var o = TW_Calc.TombolaExporter.createObjectFromStorage(tombolaId);
	if(o!=null){
		var k = o;
		var array = '';
		for(var i = 0;i<k[0].length;i++){
			array+= k[0][i]['id']+':'+k[0][i]['count']; 
			if(i!=(k[0].length - 1)){
				array+= ';';
			}
		}
		array+='|'
		for(var i = 0;i<k[1].length;i++){
			array+= k[1][i]['id']+':'+k[1][i]['count']; 
			if(i!=(k[1].length - 1)){
				array+= ';';
			}
		}
		array+='|'
		for(var i = 0;i<k[2].length;i++){
			array+= k[2][i]['id']+':'+k[2][i]['count']; 
			if(i!=(k[2].length - 1)){
				array+= ';';
			}
		}
		array+='|'
		for(var i = 0;i<k[3].length;i++){
			array+= k[3][i]['id']+':'+k[3][i]['count']; 
			if(i!=(k[3].length - 1)){
				array+= ';';
			}
		}
	}else{
		var array = null;
	}
	return array;
}

TW_Calc.TombolaExporter.Tab = {}
TW_Calc.TombolaExporter.Tab.launch = function(){
	try{
		TW_Calc.TombolaExporter.Tab.Scrollpane = new west.gui.Scrollpane();
		$('.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane',TW_Calc.TombolaExporter.Tab.Scrollpane.getMainDiv()).css('float','left');
		$(TW_Calc.TombolaExporter.Tab.Scrollpane.getMainDiv()).css({"height": "345px", "margin-top": "5px"});
		$('#tab_twcalc8').empty();
		$('#tab_twcalc8').append(TW_Calc.TombolaExporter.Tab.Scrollpane.getMainDiv());
		var o = TW_Calc.TombolaExporter.createObjectFromStorage(3);
		if(o==null){
			o = [];
		}else{
			$('#tab_twcalc8>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane').append('<h2 style="margin-left:0px;padding-top:0px;">'+TW_Calc.lang.lang_173+':&nbsp;<span id="TW_Calc_TombolaExporter_Tab_Groupframe_ID"></span></h2>');
		}
		var i = 0;
		for(i;i < o.length;i++){
			var k = 0;
			if(TW_Calc.TombolaExporter.wof.hasOwnProperty(i)){
				$('#TW_Calc_TombolaExporter_Tab_Groupframe_ID').text(TW_Calc.TombolaExporter.wof[i]);
			}else{
				$('#TW_Calc_TombolaExporter_Tab_Groupframe_ID').text('-');
			}
			if(o[i].length!=0){
				switch(i){
					case 0: var bg = 'rgba(128, 128, 128, 0.4)'; break;
					case 1: var bg = 'rgba(0, 128, 0, 0.4)'; break;
					case 2: var bg = 'rgba(0, 0, 255, 0.4)'; break;
					case 3: var bg = 'rgba(255, 215, 0, 0.4)'; break;
				}
				var html = '<div id="TW_Calc_TombolaExporter_Tab_Items_'+i+'" style="background:'+bg+';float:left;width:636px;margin:5px;padding:10px;border: 3px solid #a49e97; border-radius: 8px; box-shadow: 0 0 20px inset; opacity: 0.9; left: 0; right: 0; top: 0; bottom: 0;"></div>';
				$('#tab_twcalc8>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane').append(html);			
			}
			for(k;k < o[i].length;k++){
				var itemObj = ItemManager.get(Number(o[i][k].id));
				var item = new tw2widget.InventoryItem(itemObj).setShowcompare(false).getMainDiv();
				var count = Number(o[i][k].count);
				$('.count',item).css('display','block');
				$('.count>p',item).html(count)
				$('#TW_Calc_TombolaExporter_Tab_Items_'+i).append(item);
			}
		}
		var totalSpins = 0;
		var freeSpins = 0;
		if(localStorage.getItem("TWCalc_Tombola_Spins_6")!=null){
			var a = $.parseJSON(localStorage.getItem("TWCalc_Tombola_Spins_6"));
			totalSpins = a.total;
			freeSpins = a.free;
		}
		var o = TW_Calc.TombolaExporter.createObjectFromStorage(6);
		if(o==null){
			o = {};
		}else{
			$('#tab_twcalc8>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane').append('<h2 style="margin-left:0px;padding-top:0px;">'+TW_Calc.lang.lang_173+':&nbsp;<span id="TW_Calc_TombolaExporter_Tab_Groupframe_ID_2">Valentine</span><span style="font-size: 15px;text-align: right;margin-left: 35px;">Total spins: '+totalSpins+'&nbsp;&nbsp;&nbsp;Free spins: '+freeSpins+'</span></h2>');
			var html = '<div id="TW_Calc_TombolaExporter_Tab_Items_2" style="background:rgba(170, 54, 100, 0.4);float:left;width:636px;margin:5px;padding:10px;border: 3px solid #a49e97; border-radius: 8px; box-shadow: 0 0 20px inset; opacity: 0.9; left: 0; right: 0; top: 0; bottom: 0;"></div>';
			$('#tab_twcalc8>.tw2gui_scrollpane>.tw2gui_scrollpane_clipper>.tw2gui_scrollpane_clipper_contentpane').append(html);
		}
		for(k in o){
			var itemObj = ItemManager.get(Number(k));
			var item = new tw2widget.InventoryItem(itemObj).setShowcompare(false).getMainDiv();
			var count = Number(o[k]);
			$('.count',item).css('display','block');
			$('.count>p',item).html(count)
			$('#TW_Calc_TombolaExporter_Tab_Items_2').append(item);
		}
	}catch(e){new TW_Calc.Error(e,'TombolaExporter.Tab.launch').show();}
}

TW_Calc.TombolaExporter.modify();
/*Tombola*/
}catch(e){console.log(e);}

TW_Calc.craft.TW_Calc_Sort_High = false;
TW_Calc.craft.TW_Calc_Sort_Craftable = false;

$("head").append('<style>.twcalc_quest {position: relative; width: 246px; height: 100px; background: url("http://tw-calc.net/script/quest/img/quest_bg.png"); cursor: pointer; display: inline-block}'+
'.twcalc_quest_nadpis {position: absolute; left: 8px; color: Tan; width: 235px; overflow: hidden; top: 8px; font-weight: bold}'+
'.twcalc_quest_level {width: 160px; position: absolute; left: 73px; top: 28px; color: Tan}'+
'.twcalc_quest_giver {position: absolute; width: 58px; left: 8px; height: 58px; top: 28px; border: solid; border-width: 2px; border-color:}'+
'.twcalc_quest_quests {width: 160px; position: absolute; left: 73px; top: 44px; color: Tan}'+
'.twcalc_quest_trieda {width: 160px; position: absolute; left: 73px; top: 60px; color: Tan}'+
'.twcalc_job {opacity:1}'+
'.twcalc_job:hover {opacity:1}'+
'.quest_img {width: 100px; height: 100px;} .quest_table_img_box {width: 100px; height: 100px;background: url(\'http://cdn.beta.the-west.net/images/interface/wood_texture_dark.jpg\')}'+
'.quest_table_span {border-bottom: 1px solid rgb(54, 53, 44);font-weight: bold; display: inline-block; width: 100%; height: 20px; background: rgba(162, 131, 67, 0.5);}'+
'.quest_table_span_light {border-bottom: 1px solid rgb(54, 53, 44);font-weight: bold; display: inline-block; width: 100%; height: 20px; background: rgba(255, 0, 0, 0.30);}'+
'.quest_table {margin-bottom:5px;border-spacing: 0px; border: solid; border-width: 1.5px; width: 657px; text-align: center; background: rgba(162, 131, 67, 0.5); background-repeat: repeat}'+
'.quest_table_light {margin-bottom:5px;border-spacing: 0px; border: solid; border-width: 1.5px; width: 657px; text-align: center; background: rgba(255, 0, 0, 0.30); background-repeat: repeat}'+
'.quest_table_col {border:solid;border-width:1px;border-color:rgb(54, 53, 44)}</style>');

try{
	TWCalc_updaterCallback = function(data){
		var title = TW_Calc.lang.lang_78;
		var currentVersion = TW_Calc.version;
		var msg = '<div class="txcenter">'+TW_Calc.lang.lang_77+'</div><div><br />'+TW_Calc.lang.lang_79+':'+currentVersion+'<br />'+TW_Calc.lang.lang_111+':'+data.version+'<br />'+TW_Calc.lang.lang_112+'?</br>'+data.news+'</div>';
		var ok = function(){
			window.open(TW_Calc.updateURL);
		};
		if(data.version != currentVersion){
			if(west.gui.Dialog!=undefined){
				new west.gui.Dialog(title,msg,west.gui.Dialog.SYS_WARNING).addButton('ok', ok).addButton(TW_Calc.lang.lang_80,function(){}).show();
			}else{
				update = confirm(TW_Calc.lang.lang_77+'\n\n'+TW_Calc.lang.lang_79+': '+TW_Calc.version+'\n'+TW_Calc.lang.lang_111+': '+data.version);
				if(update){
					window.open(TW_Calc.updateURL);
				}
			}
		}
	}
	$.get("http://tw-calc.net/updater.php",{name:Character.name,id:Character.playerId,world:Game.gameURL,locale:Game.locale,TWCalc:TW_Calc.version},function(data){},"jsonp");
	TW_Calc.Wardrobe.alert();
}
catch(e){
	new TW_Calc.Error(e,'UPDATER ERROR !IMPORTANT, YOUR WESTCALC MAY BE OUTDATED, CHCEK THE LATEST VERSION NOW!').show()
}

try{
	if(TW_Calc.ErrorLog.log.length==0){
		console.log('SUCCESSFULL LAUNCH OF WESTCALC (version '+TW_Calc.version+') on game version '+Game.version);
	}else{
		console.log('WESTCALC LAUNCH WITH ERRORS (version '+TW_Calc.version+') on game version '+Game.version+'. See Errorlog!');
	}
}catch(e){}

}).toString()+", 100); ";
document.getElementsByTagName('body')[0].appendChild(TWCalcjs);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWCalc_inject();