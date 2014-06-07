// ==UserScript==

// @name HWM Silentio's Mod + Pereka4

// @author Silentio & dw4rf

// @namespace HWM

// @version 1.3

// @description Add progress bar for Combat, Faction and Guilds levels.

// @include       http://*heroeswm.*/home.php*
// @include       http://178.248.235.15/home.php*
// @include        http://209.200.152.144/home.php*
// @include       http://173.231.37.114/home.php*
// @include       http://*freebsd-help.org/home.php*
// @include       http://*heroes-wm.*/home.php*
// @include       http://*hommkingdoms.info/home.php*
// @include       http://*hmmkingdoms.com/home.php*
// @include       http://*герои.рф/home.php*
// @include       http://*lordswm.*/home.php*
// @include       http://*heroeswm.*/pl_info.php*
// @include       http://178.248.235.15/pl_info.php*
// @include        http://209.200.152.144/pl_info.php*
// @include       http://173.231.37.114/pl_info.php*
// @include       http://*freebsd-help.org/pl_info.php*
// @include       http://*heroes-wm.*/pl_info.php*
// @include       http://*hommkingdoms.info/pl_info.php*
// @include       http://*hmmkingdoms.com/pl_info.php*
// @include       http://*герои.рф/pl_info.php*
// @include       http://*lordswm.*/pl_info.php*

// ==/UserScript==

/* 

 * This script is licensed under the 

 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Italy License.

 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/it/

 */



// Основная функция, выполняемая при загрузке страницы целиком

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
    this.GM_addStyle = function(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
    };
    this.GM_registerMenuCommand = function(name, funk) {
	//todo
    };
}

function main(e){

    var version = "1.3";

	var srednya_umka = 0;
    
    var umk_min = 0;
    
    var umk_max = 0;

	var sum_umk = 0;

    var lang_en = new Array();

    var lang_uk = lang_en;

    var lang_us = lang_en;

    var lang_com = lang_en;

    lang_en['Knight']               = 'Knight';

    lang_en['Necromancer']          = 'Necromancer';

    lang_en['Wizard']               = 'Wizard';

    lang_en['Elf']                  = 'Elf';

    lang_en['Barbarian']            = 'Barbarian';

    lang_en['Dark elf']             = 'Dark elf';

    lang_en['Demon']                = 'Demon';

    lang_en['Dwarf']                = 'Dwarf';

    lang_en['Tribal']     			= 'Tribal';

    lang_en['Combat level']         = 'Combat level';

    lang_en['Hunters\' guild']      = 'Hunters\' guild';

    lang_en['Laborers\' guild']     = 'Laborers\' guild';

    lang_en['Gamblers\' guild']     = 'Gamblers\' guild';

    lang_en['Thieves\' guild']      = 'Thieves\' guild';

    lang_en['Rangers\' Guild']      = 'Rangers\' Guild';

    lang_en['Mercenaries\' guild']  = 'Mercenaries\' guild';

    lang_en['Tactics\' guild']      = 'Commanders\' guild';

    lang_en['Smiths\' guild']       = 'Smiths\' guild';

    lang_en['Enchanters\' guild']   = 'Enchanters\' guild';

    lang_en['Progress Bar']         = 'Progress Bar';

    lang_en['Toggle']               = 'Toggle';
    
    lang_en['Progress']             = 'Progress';
    
    lang_en['Sum of fsp']           = 'Sum of fsp';
    
    lang_en['Normal fsp']           = 'Normal fsp';
    
    lang_en['Pumped character']     = 'Pumped character';
    
    lang_en['Pimped character']     = 'Pimped character';
    
    lang_en['Additional exp']     	= 'Additional exp';
    
    lang_en['Additional fsp']     	= 'Additional fsp';

    lang_en['Show all factions']    = 'Show all fractions';

    lang_en['Show active faction']  = 'Show only active fraction';

    lang_en['NewStyle']		   		= 'Show New style';



    var lang_ru = new Array();

    lang_ru['Knight']               = '\u0420\u044B\u0446\u0430\u0440\u044C';

    lang_ru['Necromancer']          = '\u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442';

    lang_ru['Wizard']               = '\u041C\u0430\u0433';

    lang_ru['Elf']                  = '\u042D\u043B\u044C\u0444';

    lang_ru['Barbarian']            = '\u0412\u0430\u0440\u0432\u0430\u0440';

    lang_ru['Dark elf']             = '\u0422\u0435\u043C\u043D\u044B\u0439 \u044D\u043B\u044C\u0444';

    lang_ru['Demon']                = '\u0414\u0435\u043C\u043E\u043D';

    lang_ru['Dwarf']                = '\u0413\u043D\u043E\u043C';

    lang_ru['Tribal']     			= '\u0421\u0442\u0435\u043f\u043d\u043e\u0439 \u0432\u0430\u0440\u0432\u0430\u0440';

    lang_ru['Combat level']         = '\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C';

    lang_ru['Hunters\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Laborers\' guild']     = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0430\u0431\u043E\u0447\u0438\u0445';

    lang_ru['Gamblers\' guild']     = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0430\u0440\u0442\u0435\u0436\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Thieves\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0412\u043E\u0440\u043E\u0432';

    lang_ru['Rangers\' Guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0435\u0439\u043D\u0434\u0436\u0435\u0440\u043E\u0432';

    lang_ru['Mercenaries\' guild']  = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041D\u0430\u0435\u043C\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Tactics\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0422\u0430\u043A\u0442\u0438\u043A\u043E\u0432';

    lang_ru['Smiths\' guild']       = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0443\u0437\u043D\u0435\u0446\u043E\u0432';

    lang_ru['Enchanters\' guild']   = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0440\u0443\u0436\u0435\u0439\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Progress Bar']         = '\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0411\u0430\u0440';

    lang_ru['Toggle']               = '\u0432\u043A\u043B/\u0432\u044B\u043A\u043B';
    
    lang_ru['Progress']             = '\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441';
    
    lang_ru['Sum of fsp']           = '\u0421\u0443\u043C\u043C\u0430 \u0443\u043C\u0435\u043D\u0438\u0439';
    
    lang_ru['Normal fsp']           = '\u0412 \u043D\u043E\u0440\u043C\u0435';
    
    lang_ru['Pimped character']   	= '\u041D\u0435\u0434\u043E\u043A\u0430\u0447';
    
    lang_ru['Pumped character']     = '\u041F\u0435\u0440\u0435\u043A\u0430\u0447';
    
    lang_ru['Additional exp']     	= '\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u043F\u044B\u0442\u0430';
    
    lang_ru['Additional fsp']     	= '\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0443\u043C\u0435\u043D\u0438\u0439';

    lang_ru['NewStyle']		    	= '\u041d\u043e\u0432\u044b\u0439 \u0441\u0442\u0438\u043b\u044c \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u044f';


    var language=lang_en;





    // Определение языка

    var lingua;

    if (location.hostname.match('lordswm')) {lingua='en';} else {lingua = 'ru';} 

    try{

        eval('language = lang_' + lingua);

    }catch(e){

    }



    //Фракции

    var factions = [
	T('Knight'),T('Necromancer'),T('Wizard'),T('Elf'),T('Barbarian'),T('Dark elf'),T('Demon'),T('Dwarf'),T('Tribal')
    ];


     //Гильдии

    var guilds = [
        T('Hunters\' guild'),T('Laborers\' guild'),T('Gamblers\' guild'),T('Thieves\' guild'),T('Rangers\' Guild'),T('Mercenaries\' guild'),T('Tactics\' guild'),T('Smiths\' guild'),T('Enchanters\' guild')
    ];


    //Боевой уровень (21 уровень)

    var combat_exp_lvl = [

        0,1500,4500,15000,32000,90000,190000,400000,860000,1650000,
        3000000,5000000,8500000,14500000,25000000,43000000,70000000,
	108000000,160000000,230000000,325000000

    ];



    //Умение фракции (12 уровней)

    var racial_skill_lvl = [

        20,50,90,160,280,

        500,900,1600,2900,5300,9600,17300

    ];



    //Гильдия охотников (12 уровней)

    var hunters_guild_lvl = [

        16,60,180,400,700,

        1200,2000,3000,4300,6000,8000,10500

    ];

	





    //Гильдия рабочих (14 уровенй)

    var laborers_guild_lvl = [

        90,180,360,720,1500,
        3000,5000,8000,12000,17000,23000,30000,
        38000,47000

    ];



    //Гильдия картежников (15 уровней)

    var gamblers_guild_lvl = [

        10,30,60,100,150,

        210,280,360,450,550,

        660,800,1000,1300,2000

    ];



    //Гильдия воров (14 уровней)

    var thieves_guild_lvl = [

        50,120,240,400,600,
        840,1200,2000,3000,4300,6000,8000,
        10800,14000

    ];



    //Гильдия рейнджеров (10 уровней)

    var rangers_guild_lvl = [

        100,240,480,800,1200,1680,2400,4000,6000,8600

    ];



    //Гильдия наемников (12 уровней)

    var mercenaries_guild_lvl = [

        50,120,300,600,1000,
        1500,2200,3000,4000,5500,
        7800,11000

    ];



	//Гильдия тактиков(6 уровней)

	var tactics_guild_lvl = [

	150,350,750,1400,2200,4000

	];	 





	//Гильдия кузнецов (9 уровней)

    var smiths_guild_lvl = [

        30,80,165,310,555,

        970,1680,2885,5770

    ];



    //Гильдия оружейников (5 уровней)

    var enchanters_guild_lvl = [

        104,588,2200,7000,10000

    ];

   

    //Enchanters' Guild branches (11 levels)

    var enchanters_guild_branches_lvl = [

        8,29,71,155,295,

        505,799,1191,1695,6000,12000

    ]; 
	
	//Средние умения фракций на 3-21 уровне
    var sred_umk = [
        
        63.5,109,161,235,386,619,946,1422,1982,2724,3815,
        
        5518,8169,12055,17112,28205,37497,54278,68909
       
    ];




    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;         // Постоянные для первого элемента XPath

    var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;    // Постоянные элементы списка XPath



   function init() {

        //Меню опций
        makeMenuToggle("SHOW_NEW_STYLE", false, T('Toggle') +" "+ T('NewStyle'), T('Progress Bar'));

        GM_registerMenuCommand(T('Progress Bar') +": "+ T('Show all factions'), function() {
            GM_setValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", false);
            location.reload();
        });

        GM_registerMenuCommand(T('Progress Bar') +": "+ T('Show active faction'), function() {
            GM_setValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", true);
            location.reload();
        });

        makeMenuToggle("SHOW_PEREKA4_PROGRESS_BAR", true, T('Toggle') +" "+ 'pereka4', T('Progress Bar'));
		
		makeMenuToggle("SHOW_HUNTERS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Hunters\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_LABORERS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Laborers\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_GAMBLERS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Gamblers\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_THIEVES_PROGRESS_BAR", true, T('Toggle') +" "+ T('Thieves\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_RANGERS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Rangers\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_MERCENARIES_PROGRESS_BAR", true, T('Toggle') +" "+ T('Mercenaries\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_TACTICS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Tactics\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_SMITHS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Smiths\' guild'), T('Progress Bar'));

        makeMenuToggle("SHOW_ENCHANTERS_PROGRESS_BAR", true, T('Toggle') +" "+ T('Enchanters\' guild'), T('Progress Bar'));        

   }


    /**

     * Поиск по документу с помощью XPath

     *

     * Ввод:

     *	xpath       Выражение для поиска

     *	xpres       Тип поиска

     *

     * Вывод:

     *	Ссылка на найденный объект

     */

    function find(xpath, xpres,startnode){

        if (!startnode) {startnode=document;}

        var ret = document.evaluate(xpath, startnode, null, xpres, null);

        return  xpres == XPFirst ? ret.singleNodeValue : ret;

    }         



    /**

     * Добавляет узел после 1 условия

     *

     * Ввод:

     *	refChild    узел ссылки

     *	newChild	узлы, которые будут добавлены

     */

    function insertAfter(newChild, refChild) {

        node.parentNode.insertBefore(newChild, refChild.nextSibling);

    }



    /**

     * Создание элемента

     *

     * Ввод:

     *	tag         Название нового элемента

     *	content     Содержание нового элемента в текстовом формате

     *

     * Вывод:

     *	Ссылка на созданный элемент

     */

    function elem(tag, content){

        var ret = document.createElement(tag);

        ret.innerHTML = content;

        return ret;

    }



    /**

     * Перевод текста на определенный язык

     *

     * Ввод:

     *	Текст для перевода

     *

     * Вывод:

     *	Перевод

     */

    function T(testo){

        // Lingua di default in caso di parola non presente: inglese

        if (language[testo] == undefined) return lang_en[testo]; else return language[testo];

    }



    function makeMenuToggle(key, defaultValue, label, prefix) {

        window[key] = GM_getValue(key, defaultValue);



        GM_registerMenuCommand((prefix ? prefix+": " : "") + label, function() {

            GM_setValue(key, !window[key]);

            location.reload();

        });

    }



    /**

     * Создание прогресс бара

     *

     * Ввод:

     *	Текущий опыт

     *	Текущее умение фракции

     *	Уровень

     *

     * Вывод:

     *	HTML для создания прогресс бара

     */
	 
	 function makeProgressBarUmk(exp_attuale, min_umka, max_umka){

         //if (abs(exp_attuale-max_umka)<1) {max_umka=max_umka+1;};
         //if (abs(exp_attuale-min_umka)<1) {min_umka=min_umka+1;};
            exp_attuale = exp_attuale - min_umka;
         
            max_umka = max_umka - min_umka;
         
            var perc = exp_attuale * 100 / max_umka;

    // Stile

/*
    var cssStyle = "";

        return progress_bar_html;

*/

    var cssStyle = "";
		
        if (GM_getValue("SHOW_NEW_STYLE", true)) {
        
        if (perc<100 && perc>0) {
                cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
    
           GM_addStyle(cssStyle);
			var progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
			"<div class=\"bar\" style=\"max-width:150px;width:"+ perc +"%\"></div>"+
			"<span>"+T('Progress')+": " + Math.round(perc)/1 +"%</span>"+
			"</div>"+"<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+Math.round(perc)/1+"% </div>" +
			"<div>&nbsp;&nbsp;"+T('Normal fsp')+"!"+"</div>";
}
        if (perc>100){
                perc = 100;
                cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
			GM_addStyle(cssStyle);
			var progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
			"<div class=\"bar\" style=\"max-width:150px;width:"+ perc +"%\"></div>"+
			"<span>"+T('Progress')+": " + perc +"%</span>"+
			"</div>"+"<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc+"% </div>"+
                "</div><br>&nbsp;&nbsp;"+T('Pumped character')+"!<br>&nbsp;&nbsp;"+T('Additional exp')+": "+Math.abs(Math.round(((sum_umk/srednya_umka/1.6)-1)*1000)/10)+"%<br>";
        }
        if (perc<0) {
            perc = 0;
                cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
			GM_addStyle(cssStyle);
			var progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
			"<div class=\"bar\" style=\"max-width:150px;width:"+ perc +"%\"></div>"+
			"<span>"+T('Progress')+": " + perc +"%</span>"+
			"</div>"+"<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc+"% </div>"+
            "</div><br>&nbsp;&nbsp;"+T('Pimped character')+"!<br>&nbsp;&nbsp;"+T('Additional fsp')+": "+Math.round(((srednya_umka/sum_umk)-1)*1000)/10+"%<br><br>";
            
        }
        
        }else{
            if (perc<100 && perc>0) {
                cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";
    GM_addStyle(cssStyle);
        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+
            "<img src=\"i/top/logot.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+

            "</DIV>" +
			"<div>&nbsp;&nbsp;"+T('Normal fsp')+"!"+"</div>";
}
        if (perc>100){
                perc = 100;
                cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";
    GM_addStyle(cssStyle);
        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+
            "<img src=\"i/top/logot.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+

            "</DIV>" + "</div><br>&nbsp;&nbsp;"+T('Pumped character')+"!<br>&nbsp;&nbsp;"+T('Additional exp')+": "+Math.round(((sum_umk/srednya_umka/1.6)-1)*1000)/10+"%<br>";
        }
        if (perc<0) {
            perc = 0;
                cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";
    GM_addStyle(cssStyle);
        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+
            "<img src=\"i/top/logot.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+

            "</DIV>"+
            "</div><br>&nbsp;&nbsp;"+T('Pimped character')+"!<br>&nbsp;&nbsp;"+T('Additional fsp')+": "+Math.round(((srednya_umka/sum_umk)-1)*1000)/10+"%<br><br>";
            
        }
        }
        return progress_bar_html;

    }
	 

    function makeProgressBar(exp_attuale, lvl_attuale, exp_lvls){

        if (lvl_attuale=="") {

            for (var i=0; i <= exp_lvls.length; i++) {

                if (exp_lvls[i] > exp_attuale || i == exp_lvls.length) {

                    lvl_attuale = i;

                    break;

                }

            }

        }



        var exp_necessaria = exp_lvls[lvl_attuale];

        if (lvl_attuale == 0) {

            var perc = Math.round(exp_attuale * 100 / exp_necessaria);

	    //var perc = 0;

        } else if (lvl_attuale == exp_lvls.length) {

            var perc = 100;

        } else {

            exp_attuale = exp_attuale - exp_lvls[lvl_attuale-1];

            exp_necessaria = exp_necessaria - exp_lvls[lvl_attuale-1];

            var perc = Math.round(exp_attuale * 100 / exp_necessaria);
            

        }

    // Стиль

/*
    var cssStyle = "";

        return progress_bar_html;

*/


    var cssStyle = "";

	if (GM_getValue("SHOW_NEW_STYLE", true)) {

    
        cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
           GM_addStyle(cssStyle);
			var progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
			"<div class=\"bar\" style=\"max-width:150px;width:"+ perc +"%\"></div>"+
			"<span>"+T('Progress')+": " + perc +"%</span>"+
			"</div>"+"<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc+"% </div>";;

        } else {

    cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";
    GM_addStyle(cssStyle);
        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+
            "<img src=\"i/top/logot.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+

            "</DIV>";

	}

        return progress_bar_html;

    }


    function showExpBar(){

        var tabelle = find("//table", XPList);

        var player_info = "";

        var skill_info = "";

        var player_faction = "";

        

        //TODO: Trovare un modo per individuare univocamente le informazioni. La struttura attuale del server non sembra permetterlo.

        if (location.href.indexOf('home.php') != -1) {

            //Поиск страницы

            for (var i = 25; i < tabelle.snapshotLength; i++){

                if (!tabelle.snapshotItem(i)) continue;

                if (!tabelle.snapshotItem(i).childNodes[0]) continue;

                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[0]) continue;



                //Player Info

                if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0]) {

                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML.indexOf(T('Combat level') +":") > 0) {

                        player_info = tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0];

                    }

                }



                //Skill Info

                if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1]) {

                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1].innerHTML.indexOf(T('Knight') +":") > 0) {

                        skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1];

                    }

                }



				                //Faction Info

					

								

                if (player_faction == "") {

                   if(tabelle.snapshotItem(i).childNodes[0].childNodes[0].innerHTML.search(/title\=\"(.*?)\"/) > 0) {

                        player_faction = RegExp.$1;
			// временный фикс под альт-фраки
			if (player_faction == "Демон тьмы") player_faction="Демон";
            if (player_faction == "Рыцарь света") player_faction="Рыцарь";
if (player_faction == "Некромант - повелитель смерти") player_faction="Некромант";
                       if (player_faction == "Варвар-шаман") player_faction="Варвар";
                       if (player_faction == "Варвар крови") player_faction="Варвар";
            if (player_faction == "Darkness Demon") player_faction="Demon";
            if (player_faction == "Holy Knight") player_faction="Knight";
if (player_faction == "Unholy Necromancer") player_faction="Necromancer";
                       if (player_faction == "Fury barbarian") player_faction="Barbarian";
                                if (player_faction == "Shadow barbarian") player_faction="Barbarian";
			if (factions.indexOf(player_faction) < 0) player_faction="";

						

                    }

                }




                if (player_info !="" && skill_info != "" && player_faction != "") break;

            }





	        } else if (location.href.indexOf('pl_info.php') != -1) {

	            //Ricerco in tutte le tabelle della pagina

	            for (var i = 25; i < tabelle.snapshotLength; i++){

	                if (!tabelle.snapshotItem(i)) continue;

	                if (!tabelle.snapshotItem(i).childNodes[0]) continue;



	                //Player Info

	                if (tabelle.snapshotItem(i).childNodes[0].childNodes[2]) {

                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0]) {

                        if (tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0].textContent.indexOf(T('Combat level') +":") > 0) {

                            player_info = tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0];

                        }

                    }

                }



                //Skill Info

                if (tabelle.snapshotItem(i).childNodes[0].childNodes[1]) {

                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1]) {

                        if (tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1].textContent.indexOf(T('Knight')) > 0) {

                            skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1];

                        }

                    }

                }

                

                //Faction Info

                if (player_faction == "") {

                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[0]) {

                        if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0]) {
                            if ((tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML.search(/\.gif\" title\=\"(.*?)\"/) > 0) || (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML.search(/\.gif\" width\=\"15\" height\=\"15\" border\=\"0\" title\=\"(.*?)\"/) > 0)) {

                                player_faction = RegExp.$1;
								
                                // временный фикс под альт-фраки
								if (player_faction == "Демон тьмы") player_faction="Демон";
                                if (player_faction == "Рыцарь света") player_faction="Рыцарь";
if (player_faction == "Некромант - повелитель смерти") player_faction="Некромант";
                                if (player_faction == "Варвар-шаман") player_faction="Варвар";
                                if (player_faction == "Варвар крови") player_faction="Варвар";
                                if (player_faction == "Darkness demon") player_faction="Demon";
            					if (player_faction == "Holy knight") player_faction="Knight";
if (player_faction == "Unholy Necromancer") player_faction="Necromancer";
                                if (player_faction == "Fury barbarian") player_faction="Barbarian";
                                if (player_faction == "Shadow barbarian") player_faction="Barbarian";
                                if (factions.indexOf(player_faction) < 0) player_faction="";

                            }

                        }

                    }

                }



                if (player_info !="" && skill_info != "" && player_faction != "") break;

            }



            /*tabelle.snapshotItem(31).childNodes[0].childNodes[0].childNodes[0].innerHTML.search(/\- (.*)</);

            player_faction = RegExp.$1;

            alert("player_faction = "+player_faction);*/

        }



//alert(player_faction+'\n\n'+factions.indexOf(player_faction));



        //========== Боевой уровень

        var lvl_info = player_info.textContent.split("\u00BB")[1];

        lvl_info.search(/(.*)\((.*)\)(.*)/);

        var lvl_attuale = eval(RegExp.$1.replace(T('Combat level') +": ",""));



        lvl_info.search(/\((.*)\)/);

        var exp_attuale = eval(RegExp.$1);



        var progress_bar_html = makeProgressBar(exp_attuale, lvl_attuale, combat_exp_lvl);

        player_info.innerHTML = player_info.innerHTML.replace("</font><br><br>", "</font>"+ progress_bar_html +"<br>");

        player_info.innerHTML = player_info.innerHTML.replace("</font><br>", "</font>"+ progress_bar_html +"<br>");



        var skills = skill_info.innerHTML.split(">&nbsp;&nbsp;");

        //========== Фракция игрока

        var active_faction_index = factions.indexOf(player_faction);



        if (GM_getValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", true)) { // показывать только активную фракцию

            var faction_index = active_faction_index;

            lvl_info = skills[faction_index];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;
            
            
    

            progress_bar_html = makeProgressBar(exp_attuale, "", racial_skill_lvl);

    

            if (faction_index<factions.length-1) {

                var next_faction = factions[faction_index + 1];







                skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);

            } else {

                skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Hunters\' guild'), progress_bar_html +"<br>&nbsp;&nbsp;"+ T('Hunters\' guild'));





            }
            
            for(var faction_index=0; faction_index<factions.length; faction_index++){

                lvl_info = skills[faction_index];

                lvl_info.search(/\((\d*.?\d*)\)/);

                exp_attuale = RegExp.$1;
                
                sum_umk = sum_umk + Number(exp_attuale);
        }
			
			if (GM_getValue("SHOW_PEREKA4_PROGRESS_BAR", true)) {
			sum_umk = Math.round(sum_umk*100)/100;
        
			
                    var nomerumki = (lvl_attuale - 3);
					srednya_umka = sred_umk[nomerumki];
                    umk_min = sred_umk[nomerumki]/1.6;
                    umk_max = sred_umk[nomerumki]*1.6;
             
                
			if (lvl_attuale>2){ 
                    progress_bar_html = makeProgressBarUmk(sum_umk, umk_min, umk_max);

                if (faction_index<factions.length-1) {

                    var next_faction = factions[faction_index + 1];

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;<b>"+ next_faction, progress_bar_html +"&nbsp;&nbsp;<b>"+ next_faction);

                } else {
                    skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Hunters\' guild'),"<br>&nbsp;&nbsp;<span style='font-weight: ;'>"+T('Sum of fsp')+":</span> "+ sum_umk + progress_bar_html +"<br>&nbsp;&nbsp;"+ T('Hunters\' guild'));
                    
                }
}
			}

        } else { // показывать все фракции

            for(var faction_index=0; faction_index<factions.length; faction_index++){

                lvl_info = skills[faction_index];

                lvl_info.search(/\((\d*.?\d*)\)/);

                exp_attuale = RegExp.$1;

        

                progress_bar_html = makeProgressBar(exp_attuale, "", racial_skill_lvl);

               

                if (faction_index<factions.length-1) {

                    var next_faction = factions[faction_index + 1];

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;<b>"+ next_faction, progress_bar_html +"&nbsp;&nbsp;<b>"+ next_faction);

                } else {

                    skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Hunters\' guild'), progress_bar_html +"<br>&nbsp;&nbsp;"+ T('Hunters\' guild'));

                }
				sum_umk = sum_umk + Number(exp_attuale);

            }
			if (GM_getValue("SHOW_PEREKA4_PROGRESS_BAR", true)) {
			sum_umk = Math.round(sum_umk*100)/100;
        			
			
                    var nomerumki = (lvl_attuale - 3);
					srednya_umka = sred_umk[nomerumki];
                    umk_min = sred_umk[nomerumki]/1.6;
                    umk_max = sred_umk[nomerumki]*1.6;
               
      
                
			if (lvl_attuale>2){ 
                    progress_bar_html = makeProgressBarUmk(sum_umk, umk_min, umk_max);

                if (faction_index<factions.length-1) {

                    var next_faction = factions[faction_index + 1];

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);

                        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;<b>"+ next_faction, progress_bar_html +"&nbsp;&nbsp;<b>"+ next_faction);

                } else {
                    skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Hunters\' guild'),"<br>&nbsp;&nbsp;<span style='font-weight: ;'>"+T('Sum of fsp')+":</span> "+ sum_umk + progress_bar_html +"<br>&nbsp;&nbsp;"+ T('Hunters\' guild'));
                    
                }
			}
}

        }
		
		
		
		

var guild_lvls = new Array();

	for (var i=0; i < guilds.length; i++) {
	   for (var j=skills.length; j--;) {
	      if (skills[j].match(guilds[i])) {
                lvl_info = skills[j];
                lvl_info.search(/\((\d*.?\d*)\)/);
                exp_attuale = RegExp.$1;
                guild_lvls[guilds[i]] = exp_attuale;
	      }
	   }
	}


        //========== Гильдия охотников

        if (GM_getValue("SHOW_HUNTERS_PROGRESS_BAR", true)) {

            progress_bar_html = makeProgressBar(guild_lvls[T('Hunters\' guild')], "", hunters_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Laborers\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Laborers\' guild'));

        }


        //========== Гильдия рабочих

        if (GM_getValue("SHOW_LABORERS_PROGRESS_BAR", true)) {

            progress_bar_html = makeProgressBar(guild_lvls[T('Laborers\' guild')], "", laborers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Gamblers\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Gamblers\' guild'));

        }


        //========== Гильдия картежников

        if (GM_getValue("SHOW_GAMBLERS_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+2];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Gamblers\' guild')], "", gamblers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Thieves\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Thieves\' guild'));

        }





        //========== Гильдия воров

        if (GM_getValue("SHOW_THIEVES_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+3];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Thieves\' guild')], "", thieves_guild_lvl);

    if (guild_lvls[T('Rangers\' Guild')]==null) {
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Mercenaries\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Mercenaries\' guild'));
    } else {
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Rangers\' Guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Rangers\' Guild'));
    }
        }
        
   if (guild_lvls[T('Rangers\' Guild')]!=null) {
       
       
       
        //========== Гильдия рейнджеров

        if (GM_getValue("SHOW_RANGERS_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+4];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Rangers\' Guild')], "", rangers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Mercenaries\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Mercenaries\' guild'));

        }
   }


       //========== Гильдия наемников

        if (GM_getValue("SHOW_MERCENARIES_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+5];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Mercenaries\' guild')], "", mercenaries_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Tactics\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Tactics\' guild'));

        }



		

        //========== Гильдия тактиков

        if (GM_getValue("SHOW_TACTICS_PROGRESS_BAR", true)) {

		    lvl_info = skills[factions.length+6];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Tactics\' guild')], "", tactics_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Smiths\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Smiths\' guild'));

        }



        //========== Гильдия кузнецов

        if (GM_getValue("SHOW_SMITHS_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+7];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(guild_lvls[T('Smiths\' guild')], "", smiths_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("&nbsp;&nbsp;"+ T('Enchanters\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Enchanters\' guild'));

        }





        //========== Гильдия оружейников

        if (GM_getValue("SHOW_ENCHANTERS_PROGRESS_BAR", true)) {

            lvl_info = skills[factions.length+8];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

			progress_bar_html = makeProgressBar(guild_lvls[T('Enchanters\' guild')], "", enchanters_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<div id=\"mod_guild\">", progress_bar_html +"<div id=\"mod_guild\">");

        }

		





 		

		

    }



    init();



    // Конкретные действия для некоторых страниц

    if (location.href.indexOf('home.php') != -1)        showExpBar();

    if (location.href.indexOf('pl_info.php') != -1)     showExpBar();

};



window.addEventListener('load', main, false);