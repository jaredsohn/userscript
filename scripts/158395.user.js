// ==UserScript==
// @name The-West Calc - PT-PT by Louro
// @version 0.4.4
// @description The-West Battle Calc, Notepad, Battle stats, Duel Calc
// @author theTim
// @include	http://*.the-west.*/game.php*
// @include	http://*.tw.innogames.*/game.php*
// ==/UserScript==

TWCalc_inject = function(){if(document.getElementById('TWCalc_js')) return; var TWCalcjs = document.createElement('script'); TWCalcjs.setAttribute('type', 'text/javascript'); TWCalcjs.setAttribute('language', 'javascript'); TWCalcjs.setAttribute('id', 'TWCalc_js'); TWCalcjs.innerHTML = "var _TWCalc_int = setInterval("+(function(){
    clearInterval(_TWCalc_int);

TW_Calc = {
scriptName: "The-West Calc",
version: "0.4.4",
};

TW_Calc.langs = {
"pt_PT":{
lang_0:"Não",
lang_1:"Sim",
lang_2:"com premium",
lang_3:"Configurações",
lang_4:"Habilidades",
lang_5:"Liderança",
lang_6:"Esconder",
lang_7:"Energia",
lang_8:"Evasão",
lang_9:"Mira",
lang_10:"Espingarda dourada",
lang_11:"O xaile da Diana Roalstad",
lang_12:"Faca do Sam Hawken",
lang_13:"Soldado",
lang_14:"Ataque",
lang_15:"Defesa",
lang_16:"Ataque",
lang_17:"Defesa",
lang_18:"Posição no mapa",
lang_19:"Trabalhador",
lang_20:"Na torre da sua personagem",
lang_21:"Chão",
lang_22:"Torre - nível 1",
lang_23:"Torre - nível 2",
lang_24:"Torre - nível 3",
lang_25:"Torre - nível 4",
lang_26:"Torre - nível 5",
lang_27:"Calcular",
lang_28:"Saúde",
lang_29:"Pontos de saúde",
lang_30:"Nível",
lang_31:"Ataque numa batalha de forte",
lang_32:"Personagem",
lang_33:"Defesa numa batalha de forte",
lang_34:"Outro",
lang_35:"Apagar",
lang_36:"Guardar",
lang_37:"Colocar horas",
lang_38:"Novato",
lang_39:"Duelista",
lang_40:"Aventureiro",
lang_41:"Soldado",
lang_42:"Construtor",
lang_43:"Nome do jogador",
lang_44:"Game world",
lang_45:"Nível do jogador",
lang_46:"Classe da personagem",
lang_47:'[COLOR="Red"]Ataque[/COLOR]',
lang_48:'[COLOR="Blue"]Defesa[/COLOR]',
lang_49:'[COLOR="Green"]Saúde[/COLOR]',
lang_50:"Ataque",
lang_51:"Defesa",
lang_52:"Nome do Mundo",
lang_53:"Nome do jogador",
lang_54:"Classe da personagem",
lang_55:"Batalha de Forte - ataque",
lang_56:"Batalha de Forte - defesa",
lang_57:"Ataque",
lang_58:"Defesa",
lang_59:"Ataque",
lang_60:"Defesa",
lang_61:"Saúde",
lang_62:"Configuração do despertador ",
lang_63:"Calcular o máximo e o mínimo nível de duelo que tu és capaz de duelar",
lang_64:"Calcular a quantidade de experiencia que ganhas num duelo",
lang_65:"O teu nível de duelo",
lang_66:"O teu nível de duelo",
lang_67:"Calcular",
lang_68:"Nível máximo para duelar ",
lang_69:"Nível mínimo para duelar",
lang_70:"Nível de duelo do seu adversário",
lang_71:"Motivação de duelo",
lang_72:"Como escrever a data? Exemplo:",
lang_73:"Língua",
lang_74:"Importar habilidades",
lang_75:"Pontos de saúde",
lang_76:"Criar uma linguagem",
lang_77:"existe uma nova actualização para o The-West Calc, por favor clica OK para actualizar",
lang_78:"Actualização TW-Calc precisa",
lang_79:"Versão actual",
lang_80:"Mais tarde",
lang_81:"As tuas notas",
lang_82:"Horas",
lang_83:"Alarme do TW-Calc",
lang_84:"A tua língua",
lang_85:"http://tw-calc.net/images/ico/flags/pt.png",
lang_86:"Se tu ganhares esse duelo, tu ganharás",
lang_87:"experiência e",
lang_88:"Guardado com sucesso",
lang_89:"As tuas notas foram apagadas com sucesso",
lang_90:"Despertador não activado (Má colocação da data e hora)",
lang_91:"Configurar Despertador",
lang_92:"Cancelar",
lang_93:"Despertador TW-Calc - configurar",
lang_94:"Despertador",
lang_95:"Digite o URL do som. Exemplos: http://www.tw-calc.net/script/budik.mp3",
lang_96:"Configurar Despertador",
lang_97:"Melodia do Despertador: Alarm1, Alarm2",
lang_98:"Pontos de Saúde",
lang_99:"Energia",
lang_100:"Energia cheia em",
lang_101:"horas e",
lang_102:"minutos",
lang_103:"Pontos de Experiência",
lang_104:"Saúde cheia em:",
lang_105:"Taxa de transferência",
lang_106:"Taxa de transferência",
lang_107:"Montante da transferência",
lang_108:"Adicionar calculadora de pontos de energia",
lang_109:"Adicionar calculadora de pontos de saúde",
lang_110:"Experiência de duelo",
},
"sk_SK":{
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
},
"cs_CZ":{
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
},
"es_ES":{
/*Translated by pepe100*/
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
},
};

TW_Calc.getLang = function() {return TW_Calc.langs.hasOwnProperty(TW_Calc.getLocale()) ? Game.locale : "pt_PT";}; 
TW_Calc.getLocale = function() {return Game.locale;};
var lang = TW_Calc.getLang();
TW_Calc.lang = TW_Calc.langs[lang];
	
TWCalc_updaterCallback = function(version){
var title = TW_Calc.lang.lang_78; var currentVersion ='0.4.4'; var msg = '<div class="txcenter">'+TW_Calc.lang.lang_77+'</div><div><br />'+TW_Calc.lang.lang_79+':'+currentVersion+'<br /></div>';
var ok = function(){window.open("http://userscripts.org/scripts/source/141924.user.js");}; var later = function(){}
if(version.version != currentVersion ) new MessageDialog(title,msg,MessageDialog.SYS_WARNING).addButton('ok', ok).addButton(TW_Calc.lang.lang_80, later).show();}
	
function budik(){
var title = TW_Calc.lang.lang_83; var mytime = localStorage.getItem("TWCalc_budik"); var poznamka = localStorage.getItem("TWCalc_notepad"); var hudba = localStorage.getItem("TWCalc_budik_sound"); 
datum = new Date();	mo = datum.getMonth() + 1; d = datum.getDate(); h = datum.getHours(); m = datum.getMinutes(); 
if (m < 10) m = "0" + m; if (h < 10) h = "0" + h; if (mo < 10) mo = "0" + mo; if (d < 10) d = "0" + d;
var actualtime =d+"."+mo+". "+h+":"+m;
var msg = '<div><embed src="'+hudba+'" autostart="true" width="0" height="0"><span>'+TW_Calc.lang.lang_82+'</span>:<span>'+actualtime+'</span><br /><span>'+TW_Calc.lang.lang_81+'</span><br /><span>'+poznamka+'</span></div>';
var ok = function(){}
if(mytime==actualtime){new MessageDialog(title,msg,MessageDialog.SYS_WARNING).addButton('ok', ok).show(); localStorage.setItem("TWCalc_budik", "");}
};

jQuery.ajax('http://tw-calc.net/script/updater.js',{dataType:'jsonp',jsonpCallback:'TWCalc_updaterCallback'});

function addCalcFee(){try{main.addCalcFees()}catch(e){}};

function exp_hp_enrgy(){
var rozdiel= Character.getExperience4Level() - Character.getMaxExperience4Level();
var rozdiel1='('+rozdiel+')'
switch(Character.getMaxExperience4Level()){case '<img src="http://www.the-west.sk/images/xp_inf_000.png" />': var rozdiel1 = ''; break;};  
$('#ui_experience_bar').addMousePopup(' '+TW_Calc.lang.lang_103+':'+' '+Character.getExperience4Level()+' / '+Character.getMaxExperience4Level()+' '+rozdiel1+' ');

var regen_hp = Character.healthRegen * Character.maxHealth;var hp_max = Character.maxHealth;var actual_hp = Character.health;var hp_left = hp_max - actual_hp;var hp_time = hp_left / regen_hp;var hp_hour = Math.floor(hp_time);var hp_minute = Math.floor((hp_time - hp_hour) * 60);

var rozdiel_zdravia = Character.health-Character.maxHealth;
$('#ui_character_container > .health_bar').text(Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+')').attr('title',s(' '+TW_Calc.lang.lang_98+': '+Character.health+' / '+Character.maxHealth+' ('+rozdiel_zdravia+'), '+TW_Calc.lang.lang_104+' '+hp_hour+' '+TW_Calc.lang.lang_101+' '+hp_minute+' '+TW_Calc.lang.lang_102));

var regen_energy=0.03; if(regen_energy===Character.energyRegen){regen_energy=3;}; if(regen_energy<Character.energyRegen){regen_energy=Math.floor(Character.energyRegen*100);};
var energy = Character.energy; var energy_max = Character.maxEnergy; var energy_left = energy_max - energy; var c = Character.energyRegen * 100; var time = energy_left / regen_energy; var hour = Math.floor(time); var minute = Math.floor((time - hour) * 60); 

var rozdiel_energie = Character.energy-Character.maxEnergy;
$('#ui_character_container > .energy_bar').text(Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+')').attr('title',s('Energia: '+Character.energy+' / '+Character.maxEnergy+' ('+rozdiel_energie+'), '+TW_Calc.lang.lang_100+': '+hour+' '+TW_Calc.lang.lang_101+' '+minute+' '+TW_Calc.lang.lang_102));
};

setInterval(budik, 1000);

var pole_nastaveni = "0"+localStorage.getItem("TWCalc_settings");
if(pole_nastaveni!="0null"){
pole_nastaveni.toString();
if(pole_nastaveni.charAt(2)==0){}else{addCalc = setInterval(addCalcFee , 1000);};
if(pole_nastaveni.charAt(3)==0){}else{xp_hp_enrgy = setInterval(exp_hp_enrgy, 1000);};};

function open_TWCalc_Window(){
var tw_calc_title = "The-West Calc";
var Tab1_name = "Bloco Notas";
var Tab2_name = "Calcular Batalhas";
var Tab3_name = "Estatística Batalhas";
var Tab4_name = "Calcular Duelo";
var Tab5_name = TW_Calc.lang.lang_3;

var tw_checkbox="'TWcalc_checkobox'"; var radio_lang1="'radio_lang1'"; var radio_lang2="'radio_lang2'"; var radio_lang3="'radio_lang3'"; var radio_lang4="'radio_lang4'"; var open_forum="'http://forum.the-west.sk/member.php?u=6556'"; var open_twcalc="'http://tw-calc.net/'";
if(Character.charClass == 'greenhorn'){var myinfo_obrazok ="/images/class_choose/class_greenhorn.png";}; if(Character.charClass == 'soldier'){var myinfo_obrazok ="/images/class_choose/class_soldier.png";}; if(Character.charClass == 'duelist'){var myinfo_obrazok ="/images/class_choose/class_duelist.png";}; if(Character.charClass == 'worker'){var myinfo_obrazok ="/images/class_choose/class_worker.png";}; if(Character.charClass == 'adventurer'){var myinfo_obrazok ="/images/class_choose/class_adventurer.png";};
var tw_checkbox_gg = "'TWcalc_checkobox_gg'"; var tw_checkbox_shawl = "'TWcalc_checkobox_shawl'";var tw_checkbox_knife = "'TWcalc_checkobox_knife'";var tw_checkbox_tower = "'TWcalc_checkobox_tower'"; var radio_worker1="'radio_worker1'"; var radio_worker2="'radio_worker2'"; var radio_worker3="'radio_worker3'"; var radio_soldier1="'radio_soldier1'"; var radio_soldier2="'radio_soldier2'"; var radio_soldier3="'radio_soldier3'";
datum = new Date(); mo = datum.getMonth() + 1; d = datum.getDate(); h = datum.getHours(); m = datum.getMinutes(); if (m < 10) m = "0" + m; if (h < 10) h = "0" + h; if (mo < 10) mo = "0" + mo; if (d < 10) d = "0" + d; var actualtime =d+"."+mo+". "+h+":"+m;

TWCalc.cookie.load();     
var Tab1_HTML = 
'<div style="position: absolute; width: 685x; height: 250px; top: 50px; left: 0px;"><span class="tw2gui_textarea" style="display: inline-block; "><div class="tw2gui_bg"></div><div class="tw2gui_bg_tl"></div><div class="tw2gui_bg_br"></div><div class="tw2gui_bg_tr"></div><div class="tw2gui_bg_bl"></div><div class="tw2gui_textarea_wrapper"><textarea id="TW_Calc_Block" style="width: 675px; height: 295px; "></textarea></div></span></div>'
+'<div style="position: absolute; width: 100px; height: 50px; top: 15px; left: 100px;" class="tw2gui_button" onclick="TWCalc.save_notepad_text();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button_notepad_save" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_36+'</div></div><div style="position: absolute; width: 100px; height: 50px; top: 15px; left: 0px;" class="tw2gui_button" onclick="TWCalc.confirm_deleting();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button_notepad_delete" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_35+'</div></div>'
+'<div style="position: absolute; width: 50x; height: 30px; top: 15px; right: 10px;"><img src="/images/icons/clock.png" width="20" height="20"><span class="tw2gui_textfield"><span><input type="text" size="12" value="'+localStorage.getItem("TWCalc_budik")+'" id="Wt3"></span></span></span><img style="cursor:help;" src="data:image/png;base64,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" title=" '+TW_Calc.lang.lang_72+' '+actualtime+' "><div class="tw2gui_button" onclick="TWCalc.budik();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_settime" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_37+'</div></div></div>';
 
var Tab2_HTML =
'<div style="position: absolute; width: 200px; height: 200px; top: 10px; left: px;"><span id="TWCalc_Lang_YourSkills" style="font-weight: bold; font-size: large;">'+TW_Calc.lang.lang_4+'</span></p><p><span id="TWCalc_Lang_Stamina" style="display: inline-block; font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_7+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t3 || 0)+'" id="t3" name="t3"></span></span></span></p><p><span id="TWCalc_Lang_HealthPoints" style="display: inline-block;font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_29+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t11 || 0)+'" id="t11" name="t11"></span></span></span></p><p><span id="TWCalc_Lang_Doging" style="display: inline-block; font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_8+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t4 || 0)+'" id="t4" name="t4"></span></span></span></p><p><span id="TWCalc_Lang_Hiding" style="display: inline-block; font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_6+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t2 || 0)+'" id="t2" name="t2"></span></span></span></p><p><span id="TWCalc_Lang_Aim" style="display: inline-block; font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_9+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t5 || 0)+'" id="t5" name="t5"></span></span></span></p><p><span id="TWCalc_Lang_Leadership" style="display: inline-block; font-weight: bold; width: 100px;">'+TW_Calc.lang.lang_5+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t1 || 0)+'" id="t1" name="t1"></span></span></span></p></div>'
+'<div style="position: absolute; width: 300px; height: 150px; top: 220px; left: 0px;"><p><span id="TWCalc_Lang_Other" style="font-weight: bold; font-size: large; color: black; width: 190px;">'+TW_Calc.lang.lang_34+'</span></br><div class="tw2gui_checkbox" id="TWcalc_checkobox_gg" onclick="main.zaskrtni('+tw_checkbox_gg+')"></div>  <span id="TW_Lang_GoldenGun" style="font-weight: bold;">'+TW_Calc.lang.lang_10+'</span></p><p><div class="tw2gui_checkbox" id="TWcalc_checkobox_shawl" onclick="main.zaskrtni('+tw_checkbox_shawl+')"></div>  <span id="TW_Lang_Shawl" style="font-weight: bold;">'+TW_Calc.lang.lang_11+'</span></p><p><div class="tw2gui_checkbox" id="TWcalc_checkobox_knife" onclick="main.zaskrtni('+tw_checkbox_knife+')"></div>  <span id="TW_Lang_Knife" style="font-weight: bold;">'+TW_Calc.lang.lang_12+'</span></p><p><span id="TWCalc_Lang_Postition" style="display: inline-block; font-weight: bold; width: 170px;">'+TW_Calc.lang.lang_18+' </span><select name="Miesto"><option id="TWCalc_Place_Grass" value="0" selected="selected">'+TW_Calc.lang.lang_21+'</option><option id="TWCalc_Place_Tower1" value="1">'+TW_Calc.lang.lang_22+'</option><option id="TWCalc_Place_Tower2" value="1">'+TW_Calc.lang.lang_23+'</option><option id="TWCalc_Place_Tower3" value="1">'+TW_Calc.lang.lang_24+'</option><option id="TWCalc_Place_Tower4" value="1">'+TW_Calc.lang.lang_25+'</option><option id="TWCalc_Place_Tower5" value="1">'+TW_Calc.lang.lang_26+'</option></select></p><p><div class="tw2gui_checkbox" id="TWcalc_checkobox_tower" onclick="main.zaskrtni('+tw_checkbox_tower+')"></div>  <span id="TWCalc_Lang_Char" style="font-weight: bold; display: inline-block;font-weight: width: 230px;">  '+TW_Calc.lang.lang_20+'</span></p></div>'
+'<div style="position: absolute; width: 400px; height: 100px; top: 10px; left: 330px;"><p><span id="TWCalc_Lang_Character" style="font-weight: bold; font-size: large; color: black; width: 190px;">'+TW_Calc.lang.lang_32+'</span></br><span id="TWCalc_Lang_Level" style="display: inline-block;font-weight: bold; width: 150px;">'+TW_Calc.lang.lang_30+'</span><span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" size="5" value="'+(TWCalc.cookie.data.t12 || 1)+'" id="t12" name="t12"></span></span></span></p><p><img src="/images/class_choose/class_soldier.png""><span id="TW_Lang_LeadershipBonus" style="font-weight: bold;" >'+TW_Calc.lang.lang_13+'</span></p><p><img src="/images/class_choose/class_worker.png"><span id="TWCalc_Lang_Worker" style="font-weight: bold;">'+TW_Calc.lang.lang_19+'</span></p></div></div>'
+'<div style="position: absolute; width: 200px; height: 20px; top: 80px; left: 450px;"><div id="radio_worker1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="main.zaskrtni_radio('+radio_worker1+', '+radio_worker2+', '+radio_worker3+')" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_worker2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="main.zaskrtni_radio('+radio_worker2+', '+radio_worker1+', '+radio_worker3+')" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_worker3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="main.zaskrtni_radio('+radio_worker3+', '+radio_worker1+', '+radio_worker2+')" title="'+TW_Calc.lang.lang_2+'"></div></div>' 
+'<div style="position: absolute; width: 200px; height: 20px; top: 60px; left: 450px;"><div id="radio_soldier1" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked" onclick="main.zaskrtni_radio('+radio_soldier1+', '+radio_soldier2+', '+radio_soldier3+')" title="'+TW_Calc.lang.lang_0+'"></div><div id="radio_soldier2" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="main.zaskrtni_radio('+radio_soldier2+', '+radio_soldier1+', '+radio_soldier3+')" title="'+TW_Calc.lang.lang_1+'"></div><div id="radio_soldier3" class="tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton" onclick="main.zaskrtni_radio('+radio_soldier3+', '+radio_soldier1+', '+radio_soldier2+')" title="'+TW_Calc.lang.lang_2+'"></div></div>' 
+'<div style="position: absolute; width: 100px; height: 50px; top: 110px; left: 330px;" class="tw2gui_button" onclick="TWBattleCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_27+'</div></div>'
+'<div style="position: absolute; width: 270px; height: 200px; top: 150px; left: 330px;"><span id="TWCalc_Lang_FA" style="font-weight: bold; font-size: large; color: red; width: 100px;">'+TW_Calc.lang.lang_31+'</span></br><span id="TWCalc_Lang_FAA" style="display: inline-block;font-weight: bold; width: 150px;">'+TW_Calc.lang.lang_58+'</span></br><span style="display: inline-block;font-weight: bold; width: 20px;"><img src="/images/fort/battle/attacker_primary.png"></span></span><span id="t6">0</span></br><span id="TWCalc_Lang_FAD" style="display: inline-block;font-weight: bold; width: 150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display: inline-block;font-weight: bold; width: 20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t7">0</span></br><span id="TWCalc_Lang_FD" style="font-weight: bold; font-size: large; color: blue; width: 100px;">'+TW_Calc.lang.lang_33+'</span></br><span id="TWCalc_Lang_FDA" style="display: inline-block;font-weight: bold; width: 150px;">'+TW_Calc.lang.lang_14+'</span></br><span style="display: inline-block;font-weight: bold; width: 20px;"><img src="/images/fort/battle/attacker_primary.png"></span><span id="t8">0</span></br><span id="TWCalc_Lang_FDD" style="display: inline-block;font-weight: bold; width: 150px;">'+TW_Calc.lang.lang_15+'</span></br><span style="display: inline-block;font-weight: bold; width: 20px;"><center><img src="/images/fort/battle/defender_secondary.png"></center></span><span id="t9">0</span></br><span id="TWCalc_Lang_HP" style="display: inline-block;font-weight: bold; font-size: large; width: 150px;">'+TW_Calc.lang.lang_28+'</span></br><span id="t10">0</span></div>';

var Tab3_HTML =
'<div style="position: absolute; width: 430px; height: 60px; top: px; left: 87px;"><div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 0px;"><img onclick="publishskill();" class="skillicon" src="http://www.the-west.sk/images/window/skills/skillicon_endurance.png" title=" '+TW_Calc.lang.lang_7+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vytrvalost_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div>'
+'<div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 86px;"><img class="skillicon" src="/images/window/skills/skillicon_dodge.png" title=" '+TW_Calc.lang.lang_8+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_uhybanie_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div>'
+'<div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 172px;"><img class="skillicon" src="/images/window/skills/skillicon_hide.png" title=" '+TW_Calc.lang.lang_6+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_skryvanie_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div>'
+'<div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 258px;"><img class="skillicon" src="/images/window/skills/skillicon_aim.png" title=" '+TW_Calc.lang.lang_9+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_presnost_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div>'
+'<div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 344px;"><img class="skillicon" src="/images/window/skills/skillicon_leadership.png" title=" '+TW_Calc.lang.lang_5+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_vodcovstvo_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div>'
+'<div style="position: absolute; width: 88px; height: 60px; top: 20px; left: 430px;"><img class="skillicon" src="/images/window/skills/skillicon_health.png" title=" '+TW_Calc.lang.lang_75+' "><div class="tw2gui_plusminus"><span unselectable="on" id="twcalc_zdravie_value"class="displayValueBonus text_green unselectable" style="display: inline-block; width: 56px; "></span></div></div></div> '
+'<div style="position: absolute; width: 200px; height: 250px; top: 90px; right: 130px;"><span id="TWBCalc_Lang_FA" style="font-weight: bold; font-size: large; color: red; width: 100%;">'+TW_Calc.lang.lang_31+'</span></br><span id="TWBCalc_Lang_FAA" style="display: inline-block;font-weight: bold; width: 100%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t6">0</span></br><span id="TWBCalc_Lang_FAD" style="display: inline-block;font-weight: bold; width: 100%;">'+TW_Calc.lang.lang_15+'</span><span id="tw_t7">0</span></br><span id="TWBCalc_Lang_FD" style="font-weight: bold; font-size: large; color: blue; width: 100%;">'+TW_Calc.lang.lang_33+'</span></br><span id="TWBCalc_Lang_FDA" style="display: inline-block;font-weight: bold; width: 100%;">'+TW_Calc.lang.lang_14+'</span><span id="tw_t8">0</span></br><span id="TWBCalc_Lang_FDD" style="display: inline-block;font-weight: bold; width: 100%;">'+TW_Calc.lang.lang_15+'</span><p><span id="TW_t9">0</span></p><span id="TWBCalc_Lang_HP" style="display: inline-block;font-weight: bold; font-size: large; width: 100%;">'+TW_Calc.lang.lang_28+'</span></p><span id="TW_t10">0</span></div></div>'
+'<div style="position: absolute; width: 270px; height: 200px; top: 90px; left: 87px;"><span id="TWCalc_Lang_name" style="font-weight: bold; font-size: large; width: 190px;">'+TW_Calc.lang.lang_43+'</span><p><span id="TWCalc_name"></span><p><span id="TWCalc_Lang_characlass" style="font-weight: bold; font-size: large; width: 190px;">'+TW_Calc.lang.lang_46+'</span><p><img src="'+myinfo_obrazok+'"><span id="TWCalc_charclass"></span><p><span id="TWCalc_Lang_level" style="font-weight: bold; font-size: large; width: 190px;">'+TW_Calc.lang.lang_45+'</span><p><span id="TWCalc_level"></span><p><span id="TWCalc_Lang_server_info" style="font-weight: bold; font-size: large; width: 190px;">'+TW_Calc.lang.lang_52+'</span><p><span id="TWCalc_server_info"></span></div>'
+'<div style="position: absolute; width: 670px; height: 32px; top: 345px; left: 86px;">BB Code: <input type="text" class="input_layout" readonly="readonly" style="text-align: center;" size="71" id="TWCalc_battle_bbcode" value="" onclick="this.select();"></div>'
+'<div style="position: absolute; width: 120px; height: 200px; top: 90px; left: 545px;"><img src="http://tw-calc.net/img/tooltipBG.png" onclick="TWCalcMyinfo.import_inf();" style="cursor:pointer;width: 60px; height: 240px;"></div>'
;
		
var Tab4_HTML =
'<div style="position: absolute; width: 600px; height: 60px; top: 10px; left: 0px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_63+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_65+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TWCalc.cookie.data.level || 1)+'" id="twcalc_duel_level"></span></span></div><div style="position: absolute; width: 450px; height: 60px; top: 30px; left: 360px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_69+'</span><span id="TWCalc_minduellevel"></span></br><span style="font-weight:bold;">'+TW_Calc.lang.lang_68+'</span><span id="TWCalc_maxduellevel"></span></br></div>'
+'<div style="position: absolute; width: 100px; height: 30px; top: 30px; left: 250px;" class="tw2gui_button" onclick="TWDuelCalc.vypocet();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_Lang_button2" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div>'
+'<div style="position: absolute; width: 450px; height: 60px; top: 80px; left: 0px;"><span style="font-weight:bold;">'+TW_Calc.lang.lang_64+'</span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_66+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TWCalc.cookie.data.level1 || 1)+'" id="twcalc_duel_level1"></span></span></br><img src="/images/icons/user.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_70+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TWCalc.cookie.data.level2 || 1)+'" id="twcalc_duel_level2"></span></span></br><img src="images/job/motivation.png"><span style="font-weight:bold;">'+TW_Calc.lang.lang_71+'</span><span class="tw2gui_textfield"><span><input type="text" size="3" value="'+(TWCalc.cookie.data.motivation || 100)+'" id="twcalc_duel_motivation"></span></span></br></div><div style="position: absolute; width: 300px; height: 60px; top: 150px; left: 360px;"><span id="TWCalc_exp"></span></div>'
+'<div style="position: absolute; width: 100px; height: 30px; top: 100px; left: 290px;" class="tw2gui_button" onclick="TWDuelCalc.vypocet2();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_Lang_button2" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_67+'</div></div>'
;
var tw_checkbox_calcFees = "'TWcalc_checkbox_calcFees'"; var tw_checkbox_calcHPenergyXP = "'TWcalc_checkbox_calcHPenergyXP'";                
var Tab5_HTML = '<div style="position: absolute; width: 680px; height: 300px; top: 15px; left: 0px;"><div id="TWcalc_checkobox" class="tw2gui_checkbox" onclick="main.zaskrtni('+tw_checkbox+');"></div> '+TW_Calc.lang.lang_74+' </br>'
+'<div id="TWcalc_checkbox_calcFees" class="tw2gui_checkbox"  onclick="main.zaskrtni('+tw_checkbox_calcFees+')"></div> '+TW_Calc.lang.lang_108+' </br>'
+'<div id="TWcalc_checkbox_calcHPenergyXP" class="tw2gui_checkbox" onclick="main.zaskrtni('+tw_checkbox_calcHPenergyXP+')"></div> '+TW_Calc.lang.lang_109+' </br>'
+'<img style="cursor:pointer;width:20px;height:20px" onclick="TWCalc.settings();" src="data:image/png;base64,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"> '+TW_Calc.lang.lang_62+' </br> '
+'<div style="font-weight:bold">'+TW_Calc.lang.lang_84+'  <img src="'+TW_Calc.lang.lang_85+'"></div>'
+'<div style=​"position:​ absolute;​ width:​ 718px;​ height:​ 32px;​ top:​ 335px;​ left:​ 0px;​" class=​"txcenter">​<div style="position: absolute; width: 718px; height: 32px; top: 335px; left: 0px;" class="txcenter"><span style="font-weight: bold;">.: by<a onclick="window.open('+open_forum+')"> MarcusJohnyEvans  </a>~ </span><span><a onclick="window.open('+open_twcalc+')">tw-calc.net</a></span><span style="font-weight: bold;"> :.</span></div>'
+'<div style="position: absolute; width: 100px; height: 32px; top: 0px; right: 0px;" class="tw2gui_button" onclick="main.settingsCalc();"><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div id="TWCalc_lang_button" class="textart_title" style="font-weight: bold; font-style: normal; font-variant: normal; font-size: 10pt; line-height: normal; font-family: Arial; ">'+TW_Calc.lang.lang_36+'</div></div>'
+'</div>';

function tw2gui_with_cards(TWcalc_window_title, TWcalc_window_tab1_title, TWcalc_window_tab2_title, TWcalc_window_tab3_title, TWcalc_window_tab4_title, TWcalc_window_tab5_title, TWcalc_window_tab1_html, TWcalc_window_tab2_html, TWcalc_window_tab3_html, TWcalc_window_tab4_html, TWcalc_window_tab5_html){
var TWcalc_window = wman.open("TWcalc_window_");
TWcalc_window.setTitle(TWcalc_window_title);
TWcalc_window.setMiniTitle(TWcalc_window_title);
var TWcalc_window_html = '<span id="TWcalc_window_tab1">'+TWcalc_window_tab1_html+'</span>'+
                         '<span id="TWcalc_window_tab2" style="display:none;">'+TWcalc_window_tab2_html+'</span>'+    
                         '<span id="TWcalc_window_tab3" style="display:none;">'+TWcalc_window_tab3_html+'</span>'+
                         '<span id="TWcalc_window_tab4" style="display:none;">'+TWcalc_window_tab4_html+'</span>'+
						 '<span id="TWcalc_window_tab5" style="display:none;">'+TWcalc_window_tab5_html+'</span>';
                         TWcalc_window.addTab("").appendToContentPane(TWcalc_window_html);
(document.getElementsByClassName("tw2gui_window tw2gui_win2 TWcalc_window_ active_tab_id_undefined")[0]).getElementsByClassName("tw2gui_window_tabbar_tabs")[0].innerHTML = '<div id="TWcalc_window_tab1_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt tw2gui_window_tab_active"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab1_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab2_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab2_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab3_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab3_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab4_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab4_title+'</div><div class="tw2gui_window_tab_terminator"></div></div><div id="TWcalc_window_tab5_bt" class="tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt"><div class="tw2gui_window_tab_text">'+TWcalc_window_tab5_title+'</div><div class="tw2gui_window_tab_terminator"></div></div>';
((window_minimize = (document.getElementsByClassName("tw2gui_window tw2gui_win2 TWcalc_window_")[0]).getElementsByClassName("tw2gui_window_buttons_reload")[0]).parentNode.removeChild(window_minimize));
document.getElementById("TWcalc_window_tab1_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab1").style.display = "block";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";};
document.getElementById("TWcalc_window_tab2_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "block";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";};
document.getElementById("TWcalc_window_tab3_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "block";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "none";};
document.getElementById("TWcalc_window_tab4_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "block";
document.getElementById("TWcalc_window_tab5").style.display = "none";};
document.getElementById("TWcalc_window_tab5_bt").onclick = function(){
document.getElementById("TWcalc_window_tab1_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab1_bt";
document.getElementById("TWcalc_window_tab2_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab2_bt";
document.getElementById("TWcalc_window_tab3_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab3_bt";
document.getElementById("TWcalc_window_tab4_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab4_bt";
document.getElementById("TWcalc_window_tab5_bt").className = "tw2gui_window_tab _tab_id_TWcalc_window_tab5_bt tw2gui_window_tab_active";
document.getElementById("TWcalc_window_tab1").style.display = "none";
document.getElementById("TWcalc_window_tab2").style.display = "none";
document.getElementById("TWcalc_window_tab3").style.display = "none";
document.getElementById("TWcalc_window_tab4").style.display = "none";
document.getElementById("TWcalc_window_tab5").style.display = "block";};	   
};
tw2gui_with_cards(tw_calc_title, Tab1_name, Tab2_name, Tab3_name, Tab4_name, Tab5_name, Tab1_HTML, Tab2_HTML, Tab3_HTML, Tab4_HTML, Tab5_HTML);  
};

main = {
zaskrtni: function(id_prvku){if(document.getElementById(id_prvku).className == "tw2gui_checkbox"){document.getElementById(id_prvku).className = "tw2gui_checkbox tw2gui_checkbox_checked"; } else {document.getElementById(id_prvku).className = "tw2gui_checkbox";}},
zaskrtni_radio: function(id_prvku, id_prvku2, id_prvku3, id_prvku4){
if(document.getElementById(id_prvku).className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){document.getElementById(id_prvku).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton tw2gui_checkbox_checked"; }
document.getElementById(id_prvku2).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
document.getElementById(id_prvku3).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";
document.getElementById(id_prvku4).className = "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton";},
twcalc_reload: function(){open_TWCalc_Window(); try{TWCalc.launch();} catch(e){alert(e.message);}; try{TWBattleCalc.launch();} catch(e){alert(e.message);}; try{TWBattleCalc.vypocet();} catch(e){alert(e.message);}; try{TWCalcMyinfo.launch();} catch(e){alert(e.message);}; try{TWDuelCalc.launch();} catch(e){alert(e.message);}; try{TWDuelCalc.vypocet();} catch(e){alert(e.message);}; try{TWDuelCalc.vypocet2();} catch(e){alert(e.message);}},
settingsCalc: function(){
if(document.getElementById("TWcalc_checkobox").className == "tw2gui_checkbox"){var pole1 = "0";}else{var pole1 = "1";}
if(document.getElementById("TWcalc_checkbox_calcFees").className == "tw2gui_checkbox"){var pole2 = "0";}else{var pole2 = "1";}
if(document.getElementById("TWcalc_checkbox_calcHPenergyXP").className == "tw2gui_checkbox"){var pole3 = "0";}else{var pole3 = "1";}
pole_nastaveni = pole1+pole2+pole3;
localStorage.setItem("TWCalc_settings", pole_nastaveni);
new HumanMessage(TW_Calc.lang.lang_88,{type:'success'});
},
addCalcFees: function(){
var bank_fee= amount.value /100 * BankWindow.Transfer.fee; var transfered_amout =  amount.value - bank_fee;
var str1=bank_fee.toString();var n1=  str1.lastIndexOf(".");var k1 = str1.substring(n1+1);
if(k1.length=0){var ltest="00000"+k1;};if(k1.length=1){var ltest="0000"+k1;};if(k1.length=2){var ltest="000"+k1;};if(k1.length=3){var ltest="00"+k1;};if(k1.length=4){var ltest="0"+k1;};if(k1.length=5){var ltest=k1;};
var str2=transfered_amout.toString();var n2=  str2.lastIndexOf(".");var k2 = str2.substring(n2+1);
if(k2.length=0){var ltest2="00000"+k2;};if(k2.length=1){var ltest2="0000"+k2;};if(k2.length=2){var ltest2="000"+k2;};if(k2.length=3){var ltest2="00"+k2;};if(k2.length=4){var ltest2="0"+k2;};if(k2.length=5){var ltest2=k2;};
if(ltest2<ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.round(transfered_amout)};if(ltest2>ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.round(transfered_amout)};if(ltest2==ltest){bank_fee = Math.round(bank_fee); transfered_amout = Math.floor(transfered_amout)};
$('div.bank-transfer-info div.tw2gui_groupframe_content_pane',BankWindow.DOM).empty().append(s(TW_Calc.lang.lang_105+': '+BankWindow.Transfer.fee+'% <span style="font-size: 9px">('+TW_Calc.lang.lang_106+': -$ '+bank_fee+', '+TW_Calc.lang.lang_107+': $ '+transfered_amout+')</span>'));},
};

TWBattleCalc = {
launch: function(){jQuery('#t1').change(function(){ TWCalc.cookie.data.t1 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t2').change(function(){ TWCalc.cookie.data.t2 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t3').change(function(){ TWCalc.cookie.data.t3 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t4').change(function(){ TWCalc.cookie.data.t4 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t5').change(function(){ TWCalc.cookie.data.t5 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t11').change(function(){ TWCalc.cookie.data.t11 = jQuery(this).val() * 1; TWCalc.cookie.save(); }); jQuery('#t12').change(function(){ TWCalc.cookie.data.t12 = jQuery(this).val() * 1; TWCalc.cookie.save(); })},
vypocet: function(){
var BHP = 10;
if(document.getElementById("radio_soldier1").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BHP = 10};
if(document.getElementById("radio_soldier2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BHP = 15};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BHP = 20};
var HPskills = t11.value; var HP = 90 + (HPskills*BHP) + (t12.value * 10);
var a = t1.value; var c = Math.pow(t1.value, 0.4); var f = Math.pow(t2.value, 0.4); var i = Math.pow(t3.value, 0.4); var l = Math.pow(t4.value, 0.4); var o = Math.pow(t5.value, 0.4); var GG = 0;
var PlaceDef = 0; var PlaceOf = 0;
if(jQuery("#TWCalc_Place_Grass").is(":selected")) PlaceOf= 0, PlaceDef= 0;
if(jQuery("#TWCalc_Place_Tower1").is(":selected")) PlaceOf= 15, PlaceDef= 11 ;
if(jQuery("#TWCalc_Place_Tower2").is(":selected")) PlaceOf= 21, PlaceDef= 15 ;
if(jQuery("#TWCalc_Place_Tower3").is(":selected")) PlaceOf= 24, PlaceDef= 18 ;
if(jQuery("#TWCalc_Place_Tower4").is(":selected")) PlaceOf= 27, PlaceDef= 20 ;
if(jQuery("#TWCalc_Place_Tower5").is(":selected")) PlaceOf= 28, PlaceDef= 21 ;
var VBBB = 100; var CharBonus = 0;
if(jQuery("#TWCalc_CharBonus").is(":checked")) CharBonus= PlaceDef+0;
var BuilderBonus = 0; var BuilderBonus1 = 0;
if(document.getElementById("radio_worker1").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BuilderBonus= PlaceDef/100*0};
if(document.getElementById("radio_worker2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {uilderBonus= PlaceDef/100*30};
if(document.getElementById("radio_worker3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BuilderBonus= PlaceDef/100*60};
if(document.getElementById("radio_worker1").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BuilderBonus1= PlaceOf/100*0};
if(document.getElementById("radio_worker2").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BuilderBonus1= PlaceOf/100*30};
if(document.getElementById("radio_worker3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {BuilderBonus1= PlaceOf/100*60};  
var VBBB = 100;
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {VBBB=100};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {VBBB=125};
if(document.getElementById("radio_soldier3").className == "tw2gui_checkbox tw2gui_checkbox_labeled tw2gui_radiobutton"){} else {VBBB=150};
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
document.getElementById("t9").innerHTML=" "+osu+" "; 			
},
}; 

TWCalc = {
launch: function(){var notepad_text = localStorage.getItem("TWCalc_notepad"); document.getElementById("TW_Calc_Block").innerHTML=notepad_text;},
				
budik: function(){
var all_text = document.getElementById("Wt3").value; localStorage.setItem("TWCalc_budik", all_text); all_text.toString()
var tw_calc_test_1 = "";var tw_calc_test_2 = "";var tw_calc_test_3 = "";var tw_calc_test_4 = "";var tw_calc_test_5 = "";var tw_calc_test_6 = "";var tw_calc_test_7 = "";var tw_calc_test_8 = "";var tw_calc_test_a = all_text.charAt(2);
if(tw_calc_test_a !="."){tw_calc_test_1 = 0;} else {tw_calc_test_1 = 1;};
var tw_calc_test_b = all_text.charAt(5);
if(tw_calc_test_b !="."){tw_calc_test_2 = 0;} else {tw_calc_test_2 = 1;};
var tw_calc_test_c = all_text.charAt(9); 
if(tw_calc_test_c !=":"){tw_calc_test_3 = 0;} else {tw_calc_test_3 = 1;};
var tw_calc_test_d = all_text.charAt(6);
if(tw_calc_test_d !=" "){tw_calc_test_4 = 0;} else {tw_calc_test_4 = 1;};
var aa = all_text.charAt(0); var ab = all_text.charAt(1); var ac = aa+""+ab;
if(ac<32){tw_calc_test_5 = 1;} else {tw_calc_test_5 = 0;};
var ba = all_text.charAt(3); var bb = all_text.charAt(4); var bc = ba+""+bb;
if(bc<13){tw_calc_test_6 = 1;} else {tw_calc_test_6 = 0;};
var ca = all_text.charAt(7); var cb = all_text.charAt(8); var cc = ca+""+cb;
if(cc<24){tw_calc_test_7 = 1;} else {tw_calc_test_7 = 0;};
var da = all_text.charAt(10); var db = all_text.charAt(11); var dc = da+""+db; 
if(dc<60){tw_calc_test_8 = 1;} else {tw_calc_test_8 = 0;};
if(tw_calc_test_1 + tw_calc_test_2 + tw_calc_test_3 + tw_calc_test_4 + tw_calc_test_5 + tw_calc_test_6 + tw_calc_test_7 + tw_calc_test_8==8){new HumanMessage(TW_Calc.lang.lang_91,{type:'success'});} else {new HumanMessage(TW_Calc.lang.lang_90,{type:'unsuccess'});} 
}, 
				
save_notepad_text: function(){var all_text = document.getElementById("TW_Calc_Block").value; localStorage.setItem("TWCalc_notepad", all_text); new HumanMessage(TW_Calc.lang.lang_88,{type:'success'});},
confirm_deleting: function(){var ok = function(){TWCalc.delete_notepad_text()}; new MessageDialog("Naozaj?","Naozaj chceš vymazať poznámky?").addButton('ok', ok).addButton('cancel').show();},											 
delete_notepad_text: function(){localStorage.setItem("TWCalc_notepad", "");document.getElementById("TW_Calc_Block").value = ""; new HumanMessage(TW_Calc.lang.lang_89,{type:'success'});},							 
                 				
settings: function(){
var budik1 = localStorage.getItem("TWCalc_budik_sound");
if(budik1 == "http://www.tw-calc.net/script/budik.mp3"){budik1="Alarm1";}
if(budik1 == "http://www.tw-calc.net/script/budik2.mp3"){budik1="Alarm2";}    				
var ok = function(){
var all_text1 = document.getElementById("tw_calc_budik").value; 
localStorage.setItem("TWCalc_budik_sound", all_text1);
if(all_text1 =="Alarm1"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik.mp3");}
if(all_text1 =="Alarm2"){localStorage.setItem("TWCalc_budik_sound", "http://www.tw-calc.net/script/budik2.mp3");}
new HumanMessage(TW_Calc.lang.lang_96,{type:'success'});}
var zrus = function(){}
var msg = '<div><span>'+TW_Calc.lang.lang_94+'<span class="tw2gui_textfield_wrapper"><span class="tw2gui_textfield_label"></span><span class="tw2gui_textfield"><span><input type="text" id="tw_calc_budik" size="20" value="'+budik1+'"></span></span></span></br><span>'+TW_Calc.lang.lang_95+'</span></div></br><span>'+TW_Calc.lang.lang_97+'</span>';
new MessageDialog(TW_Calc.lang.lang_93,msg).addButton('ok', ok).addButton(TW_Calc.lang.lang_92, zrus).show();},
				
cookie: {
data: {}, 
save: function(){var date = new Date(); date.setFullYear(date.getFullYear()+1); document.cookie = 'TWCalc='+encodeURIComponent(JSON.stringify(this.data))+'; expires='+date.toUTCString();},
load: function(){this.data = JSON.parse(decodeURIComponent(((document.cookie+';').match(/TWCalc=([^;]*);/) || {})[1] || "%7B%7D"));},
}
};
				
TWCalcMyinfo = {
isWearing: function(id){var t = Wear.get(ItemManager.get(id).type);return (t && t.obj && t.obj.item_id == id);},
launch: function(){TWCalc.cookie.load();
if(localStorage.getItem("TWCalc_lang") == 1){var twcalczelenac = "Greenhorn"; var twcalcduelant = "Dueller"; var twcalcdobrodruh = "Adventurer"; var twcalcvojak = "Soldier"; var twcalcstavbar = "Builder"; var twcalccharname = "Player name"; var twcalcworldname = "Game world"; var twcalccharlevel = "Player level"; var twcalccharclass = "Character class"; var twcalcattack = '[COLOR="Red"]Attack[/COLOR]'; var twcalcdefense = '[COLOR="Blue"]Defense[/COLOR]'; var twcalchealth = '[COLOR="Green"]Health[/COLOR]'; var twsz = "Attack"; var twsu = "Defense"; var Gameworld = "Gameworld"; var Playername = "Player name"; var Characterclass = "Character class"; var Level = "Level"; var Fortbattleattack = "Fortbattle - attack"; var fortbattledefense = "Fortbattle -  defense"; var Attack = "Attack"; var Defence = "Defence"; var Attack = "Attack"; var Defence = "Defence"; var Health = "Health";}
if(localStorage.getItem("TWCalc_lang") == 2){var twcalczelenac = "Zelenáč"; var twcalcduelant = "Duelant"; var twcalcdobrodruh = "Dobrodruh"; var twcalcvojak = "Vojak"; var twcalcstavbar = "Stavbár"; var twcalccharname = "Meno hráča"; var twcalcworldname = "Herný svet"; var twcalccharlevel = "Úroveň hráča"; var twcalccharclass = "Trieda postavy"; var twcalcattack = '[COLOR="Red"]Útok[/COLOR]'; var twcalcdefense = '[COLOR="Blue"]Obrana[/COLOR]'; var twcalchealth = '[COLOR="Green"]Zdravie[/COLOR]'; var twsz = "Šanca na zásah"; var twsu = "Šanca na úhyb"; var Gameworld = "Herný svet"; var Playername = "Meno hráča"; var Characterclass = "Trieda postavy"; var Level = "Úroveň"; var Fortbattleattack = "Útok"; var fortbattledefense = "Obrana"; var Attack = "Šanca na zásah"; var Defence = "Šanca na úhyb"; var Attack = "Šanca na zásah"; var Defence = "Šanca na úhyb"; var Health = "Zdravie"}			
if(localStorage.getItem("TWCalc_lang") == 3){var twcalczelenac = "Zelenáč"; var twcalcduelant = "Duelant"; var twcalcdobrodruh = "Dobrodruh"; var twcalcvojak = "Vojak"; var twcalcstavbar = "Stavbár"; var twcalccharname = "Jméno hráče"; var twcalcworldname = "Herní svět"; var twcalccharlevel = "Úroveň hráče"; var twcalccharclass = "Charakter postavy"; var twcalcattack = '[COLOR="Red"]Útok[/COLOR]'; var twcalcdefense = '[COLOR="Blue"]Obrana[/COLOR]'; var twcalchealth = '[COLOR="Green"]Zdraví[/COLOR]'; var twsz = "Šance na zásah"; var twsu = "Šance na úhyb"; var Gameworld = "Herní svět"; var Playername = "Jméno hráče"; var Characterclass = "Charakter postavy"; var Level = "Úroveň"; var Fortbattleattack = "Útok"; var fortbattledefense = "Obrana"; var Attack = "Šance na zásah"; var Defence = "Šance na úhyb"; var Attack = "Šance na zásah"; var Defence = "Šance na úhyb"; var Health = "Zdraví"}
var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus(); var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus(); var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus(); var presnost = CharacterSkills.skills['aim'].getPointsWithBonus(); var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus(); var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
document.getElementById("twcalc_vytrvalost_value").innerHTML=" "+vytrvalost+" "; document.getElementById("twcalc_uhybanie_value").innerHTML=" "+uhybanie+" "; document.getElementById("twcalc_skryvanie_value").innerHTML=" "+skryvanie+" "; document.getElementById("twcalc_presnost_value").innerHTML=" "+presnost+" "; document.getElementById("twcalc_vodcovstvo_value").innerHTML=" "+vodcovstvo+" "; document.getElementById("twcalc_zdravie_value").innerHTML=" "+zdravie+" ";
var vod = Math.pow(vodcovstvo, 0.4); var vyt = Math.pow(vytrvalost, 0.4); var skr = Math.pow(skryvanie, 0.4); var uhy = Math.pow(uhybanie, 0.4); var pre = Math.pow(presnost, 0.4);
var HP = Character.maxHealth; var VBB = 0; var VB = 0; var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.4) - Math.pow(vodcovstvo, 0.4);
if(TWCalcMyinfo.isWearing(136)){var Golden_gun = 5;} else {var Golden_gun = 0;}; if(TWCalcMyinfo.isWearing(576)){var MR_Shawl = 5;} else {var MR_Shawl = 0;}; if(TWCalcMyinfo.isWearing(59)){var SHKnife = 2;} else {var SHKnife = 0;};
var Ausz = 25 + vod + vyt + pre + VB + Golden_gun + SHKnife; var Ausu = 10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl; var Aosz = 25 + vod + skr + pre + VB + Golden_gun + SHKnife; var Aosu = 10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
document.getElementById("tw_t6").innerHTML=" "+Ausz+" "; document.getElementById("tw_t7").innerHTML=" "+Ausu+" "; document.getElementById("tw_t8").innerHTML=" "+Aosz+" "; document.getElementById("TW_t9").innerHTML=" "+Aosu+" "; document.getElementById("TW_t10").innerHTML=" "+HP+" "; document.getElementById("TWCalc_name").innerHTML=" "+Character.name+" ( id= "+Character.playerId+" )";
function my_charClass(){switch(Character.charClass){case "greenhorn": var char_class = TW_Calc.lang.lang_38; break; case "soldier": var char_class = TW_Calc.lang.lang_41; break; case "duelist": var char_class = TW_Calc.lang.lang_39; break; case "worker":  var char_class = TW_Calc.lang.lang_42; break; case "adventurer": var char_class = TW_Calc.lang.lang_40; break;};return char_class;};
document.getElementById("TWCalc_charclass").textContent = my_charClass();
document.getElementById("TWCalc_charclass").innerHTML=" "+my_charClass()+" ";
document.getElementById("TWCalc_level").innerHTML=" "+Character.level+" ";
document.getElementById("TWCalc_server_info").innerHTML=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
var worldinfo = window.location.host.split('.',1)[0];
TWCalc_battle_bbcode.value = "[QUOTE][LIST][*][B]"+TW_Calc.lang.lang_43+":[/B] "+Character.name+"[*][B]"+TW_Calc.lang.lang_44+":[/B] "+worldinfo+" "+Game.worldName+",   ("+window.location.host+")[*][B]"+TW_Calc.lang.lang_45+":[/B] "+Character.level+"[*][B]"+TW_Calc.lang.lang_46+":[/B] "+Character.charClass+"[*]••••••••••••••••[*][B]"+TW_Calc.lang.lang_47+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Ausz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Ausu+"[*][B]"+TW_Calc.lang.lang_48+"[/B][*][B]"+TW_Calc.lang.lang_50+"[/B][*]"+Aosz+"[*][B]"+TW_Calc.lang.lang_51+"[/B][*]"+Aosu+"[*][B]"+TW_Calc.lang.lang_49+":[/B]"+HP+"[/LIST][/QUOTE]";
},
		
import_inf: function(){
var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus(); var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus(); var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus(); var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();	var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus(); var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();
var vod = Math.pow(vodcovstvo, 0.4); var vyt = Math.pow(vytrvalost, 0.4); var skr = Math.pow(skryvanie, 0.4); var uhy = Math.pow(uhybanie, 0.4); var pre = Math.pow(presnost, 0.4); var HP = Character.maxHealth; var VBB = 0; var VB = 0; var VB = Math.pow(vodcovstvo * (Character.charClass == 'soldier' ? (Premium.hasBonus('character') ? 1.5 : 1.25) : 1), 0.4) - Math.pow(vodcovstvo, 0.4);
if(TWCalcMyinfo.isWearing(136)){var Golden_gun = 5;} else {var Golden_gun = 0;}; if(TWCalcMyinfo.isWearing(576)){var MR_Shawl = 5;} else {var MR_Shawl = 0;}; if(TWCalcMyinfo.isWearing(59)){var SHKnife = 2;} else {var SHKnife = 0;}; 
var Ausz = 25 + vod + vyt + pre + VB + Golden_gun + SHKnife; var Ausu = 10 + vod + vyt + uhy + VB + Golden_gun + SHKnife + MR_Shawl; var Aosz = 25 + vod + skr + pre + VB + Golden_gun + SHKnife;var Aosu = 10 + vod + skr + uhy + VB + Golden_gun + SHKnife + MR_Shawl;
var serverinfo=" "+window.location.host.split('.',1)[0]+" "+Game.worldName+",   ("+window.location.host+") ";
var tw_id =window.location.host.split('.',1)[0]+"-"+Character.playerId;
if(document.getElementById("TWcalc_checkobox").className == "tw2gui_checkbox"){var vytrvalost="-"; var skryvanie="-"; var uhybanie="-"; var presnost="-"; var vodcovstvo="-"; var zdravie="-";} else {var vytrvalost = CharacterSkills.skills['endurance'].getPointsWithBonus(); var uhybanie = CharacterSkills.skills['dodge'].getPointsWithBonus(); var skryvanie = CharacterSkills.skills['hide'].getPointsWithBonus(); var presnost = CharacterSkills.skills['aim'].getPointsWithBonus();	var vodcovstvo = CharacterSkills.skills['leadership'].getPointsWithBonus(); var zdravie = CharacterSkills.skills['health'].getPointsWithBonus();};
if(TWCalcMyinfo.isWearing(136)){var Golden_gun ="true";} else {var Golden_gun ="false";}; if(TWCalcMyinfo.isWearing(576)){var MR_Shawl ="true";} else {var MR_Shawl ="false";}; if(TWCalcMyinfo.isWearing(59)){var SHKnife ="true";} else {var SHKnife ="false";};
var code1=window.location.host.split('.',1)[0];var code2=Character.playerId;var rand_code=code1+"0"+code2;
var HPM = "0"+Character.maxHealth;var health_pre_tabulku1 = HPM.length;if(health_pre_tabulku1==3){var health_pre_tabulku="0000"+Character.maxHealth};if(health_pre_tabulku1==4){var health_pre_tabulku="000"+Character.maxHealth};if(health_pre_tabulku1==5){var health_pre_tabulku="00"+Character.maxHealth};if(health_pre_tabulku1==6){var health_pre_tabulku="0"+Character.maxHealth};if(health_pre_tabulku1==7){var health_pre_tabulku=Character.maxHealth};var player123 = Character.name;
var webpage='http://tw-calc.net/'; page=window.open(webpage+'import.php'); page.document.write('<head><meta charset="utf-8"></head><body style="background-image:url('+webpage+'/pozadie1.jpg);"><table style="width:99%;height:99%;text-align:center;font-size:28px;color:white;"><center><h1><strong><font color="white"><b>importujem...</b></font></strong></center></h1></td></tr></table><form style="display:none;" name="data_post" action="'+webpage+'import.php" method="post"><input name="nick" value="'+Character.name+'"><input name="level" value="'+Character.level+'"><input name="charclass" value="'+Character.charClass+'"><input name="gameworld" value="'+serverinfo+'"><input name="attack1" value="'+Ausz+'"><input name="defense1" value="'+Ausu+'"><input name="attack2" value="'+Aosz+'"><input name="defense2" value="'+Aosu+'"><input name="health" value="'+HP+'"><input name="tw_id" value="'+tw_id+'"><input name="vytrvalost" value="'+vytrvalost+'"><input name="uhybanie" value="'+uhybanie+'"><input name="skryvanie" value="'+skryvanie+'"><input name="presnost" value="'+presnost+'"><input name="vodcovstvo" value="'+vodcovstvo+'">'
+'<input name="craft" value="'+Character.professionId+'">'
+'<input name="craft_points" value="'+Character.professionSkill+'"><input name="zdravie" value="'+zdravie+'"><input name="goldengun" value="'+Golden_gun+'"><input name="mrshawl" value="'+MR_Shawl+'"><input name="shknife" value="'+SHKnife+'"><input name="xp" value="'+Character.experience+'"></form><script>setTimeout("document.forms.data_post.submit()", 1000);</script></body>');
},};
	  	        
TWDuelCalc = {
launch: function(){TWCalc.cookie.load(); 
jQuery('#twcalc_duel_level').change(function(){ TWCalc.cookie.data.level = jQuery(this).val() * 1; TWCalc.cookie.save(); });				  
jQuery('#twcalc_duel_level1').change(function(){ TWCalc.cookie.data.level1 = jQuery(this).val() * 1; TWCalc.cookie.save(); });
jQuery('#twcalc_duel_level2').change(function(){ TWCalc.cookie.data.level2 = jQuery(this).val() * 1; TWCalc.cookie.save(); });
jQuery('#twcalc_duel_motivation').change(function(){ TWCalc.cookie.data.motivation = jQuery(this).val() * 1; TWCalc.cookie.save(); });  						  
}, 
                    
vypocet: function(){var levelval = twcalc_duel_level.value; var maxduel = (7*levelval-1)/5; var minduel = (5*levelval-1)/7; var maxduel2 = Math.round(maxduel); var minduel2 = Math.round(minduel); if (minduel2 < 1){var minduel1 = 1;} else {var minduel1 = minduel2}; document.getElementById("TWCalc_maxduellevel").innerHTML=" "+maxduel2+" "; document.getElementById("TWCalc_minduellevel").innerHTML=" "+minduel1+" ";},
vypocet2: function(){var level1 = twcalc_duel_level1.value; var level2 = twcalc_duel_level2.value; var motivation = twcalc_duel_motivation.value;var exp3 = (( 7 * level2 ) - ( 5 * level1 ) + 5) *( motivation / 100 );var exp = (( 7 * level2 ) - ( 5 * level1 ) + 5) * 3 *( motivation / 100 );var exp1 = Math.round(exp); var exp2 = Math.round(exp3); document.getElementById("TWCalc_exp").innerHTML=" "+TW_Calc.lang.lang_86+" "+exp1+" "+TW_Calc.lang.lang_87+" "+exp2+" "+TW_Calc.lang.lang_110+" ";},
};   

Settings = {
launch: function(){
var pole_nastaveni = "0"+localStorage.getItem("TWCalc_settings");
if(pole_nastaveni!="0null"){
pole_nastaveni.toString();
if(pole_nastaveni.charAt(1)==1){document.getElementById("TWcalc_checkobox").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
if(pole_nastaveni.charAt(2)==1){document.getElementById("TWcalc_checkbox_calcFees").className = "tw2gui_checkbox tw2gui_checkbox_checked";};
if(pole_nastaveni.charAt(3)==1){document.getElementById("TWcalc_checkbox_calcHPenergyXP").className = "tw2gui_checkbox tw2gui_checkbox_checked";};}
},};

TWCALC_SCRIPT = {
launch: function(){
open_TWCalc_Window();
try{TWCalc.launch();} catch(e){alert(e.message);};
try{TWBattleCalc.launch();} catch(e){alert(e.message);};
try{TWBattleCalc.vypocet();} catch(e){alert(e.message);};
try{TWCalcMyinfo.launch();} catch(e){};
try{TWDuelCalc.launch();} catch(e){alert(e.message);};
try{TWDuelCalc.vypocet();} catch(e){alert(e.message);};
try{TWDuelCalc.vypocet2();} catch(e){alert(e.message);};
try{Settings.launch();} catch(e){alert(e.message);};
}
};
	
$('#ui_menubar').append($('<div class="ui_menucontainer" id="TWCalc_launch_button"></div>').append( $('<div class="menulink" title="The-West Calc" '+'onclick="TWCALC_SCRIPT.launch();" '+'style="background-position:0 0; background-image: url(data:image/png;data:;base64,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);"'+'>').hover(function(){$(this).css('background-position','-25px 0');}, function(){$(this).css('background-position','0 0');}))
.append('</div><div class="menucontainer_bottom"></div>')); 	
}).toString()+", 100); ";
document.getElementsByTagName('body')[0].appendChild(TWCalcjs);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWCalc_inject();

