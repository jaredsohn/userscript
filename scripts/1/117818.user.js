// ==UserScript==

// @name HWM Silentio's Mod

// @author Silentio

// @namespace HWM

// @version 0.9.1.4 20110831

// @description Add progress bar for Combat, Faction and Guilds levels.

// @include http://*.heroeswm.*/home.php*

// @include http://*.heroeswm.*/pl_info.php*

// ==/UserScript==

/* 

 * This script is licensed under the 

 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Italy License.

 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/it/

 */



// Funzione principale, eseguita al caricamento di tutta la pagina

function main(e){      

    var version = "0.9.1.5";



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

    lang_en['Combat level']         = 'Combat level';

    lang_en['Hunters\' guild']      = 'Hunters\' guild';

    lang_en['Laborers\' guild']     = 'Laborers\' guild';

    lang_en['Gamblers\' guild']     = 'Gamblers\' guild';

    lang_en['Thieves\' guild']      = 'Thieves\' guild';

    lang_en['Rangers\' guild']      = 'Rangers\' guild';

    lang_en['Mercenaries\' guild']  = 'Mercenaries\' guild';

    lang_en['Tactics\' guild']      = 'Tactics\' guild';

    lang_en['Smiths\' guild']       = 'Smiths\' guild';

    lang_en['Enchanters\' guild']   = 'Enchanters\' guild';

    lang_en['Progress Bar']         = 'Progress Bar';

    lang_en['Toggle']               = 'Toggle';

    lang_en['Show all factions']    = 'Show all factions';

    lang_en['Show active faction']  = 'Show only active faction';





    var lang_ru = new Array();

    lang_ru['Knight']               = '\u0420\u044B\u0446\u0430\u0440\u044C';

    lang_ru['Necromancer']          = '\u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442';

    lang_ru['Wizard']               = '\u041C\u0430\u0433';

    lang_ru['Elf']                  = '\u042D\u043B\u044C\u0444';

    lang_ru['Barbarian']            = '\u0412\u0430\u0440\u0432\u0430\u0440';

    lang_ru['Dark elf']             = '\u0422\u0435\u043C\u043D\u044B\u0439 \u044D\u043B\u044C\u0444';

    lang_ru['Demon']                = '\u0414\u0435\u043C\u043E\u043D';

    lang_ru['Dwarf']                = '\u0413\u043D\u043E\u043C';

    lang_ru['Combat level']         = '\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C';

    lang_ru['Hunters\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Laborers\' guild']     = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0430\u0431\u043E\u0447\u0438\u0445';

    lang_ru['Gamblers\' guild']     = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0430\u0440\u0442\u0435\u0436\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Thieves\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0412\u043E\u0440\u043E\u0432';

    lang_ru['Rangers\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0435\u0439\u043D\u0434\u0436\u0435\u0440\u043E\u0432';

    lang_ru['Mercenaries\' guild']  = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041D\u0430\u0435\u043C\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Tactics\' guild']      = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0422\u0430\u043A\u0442\u0438\u043A\u043E\u0432';

    lang_ru['Smiths\' guild']       = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0443\u0437\u043D\u0435\u0446\u043E\u0432';

    lang_ru['Enchanters\' guild']   = '\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0440\u0443\u0436\u0435\u0439\u043D\u0438\u043A\u043E\u0432';

    lang_ru['Progress Bar']         = '\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0411\u0430\u0440';

    lang_ru['Toggle']               = '\u0432\u043A\u043B/\u0432\u044B\u043A\u043B';



    var language=lang_en;





    // Prova ad utilizzare la lingua identificata, altrimenti utilizza l'inglese

    location.href.search(/http:\/\/(.*)\.(.*)\.(.*)\//);

    var lingua =  RegExp.$3;

    try{

        eval('language = lang_' + lingua);

    }catch(e){

    }



    //Factions

    var factions = [

        T('Knight'),T('Necromancer'),T('Wizard'),T('Elf'),T('Barbarian'),

        T('Dark elf'),T('Demon'),T('Dwarf')

    ];



    //Combat experience table (17 levels)

    var combat_exp_lvl = [

        0,1500,4500,15000,32000,

        90000,190000,400000,860000,1650000,

        3000000,5000000,8500000,14500000,25000000,43000000,70000000

    ];



    //Racial skill table (12 levels)

    var racial_skill_lvl = [

        20,50,90,160,280,

        500,900,1600,2900,5300,9600,17300

    ];



    //Hunters' Guild (12 levels)

    var hunters_guild_lvl = [

        16,60,180,400,700,

        1200,2000,3000,4300,6000,8000,10500

    ];

	





    //Laborers' Guild (12 levels)

    var laborers_guild_lvl = [

        90,180,360,720,1500,

        3000,5000,8000,12000,17000,23000,30000

    ];



    //Gamblers' Guild (15 levels)

    var gamblers_guild_lvl = [

        10,30,60,100,150,

        210,280,360,450,550,

        660,800,1000,1300,2000

    ];



    //Thieves' Guild (12 levels)

    var thieves_guild_lvl = [

        50,120,240,400,600,

        840,1200,2000,3000,4300,6000,8000

    ];



    //Rangers' Guild (5 levels)

    var rangers_guild_lvl = [

        100,240,480,800,1200

    ];



    //Mercenaries' Guild (8 levels)

    var mercenaries_guild_lvl = [

        50,120,300,600,1000,

        1500,2200,3000,4000,5500

    ];



	//Tactics Guild

	var tactics_guild_lvl = [

	150,350,750,1400 

	];	 





	//Smiths' Guild (9 levels)

    var smiths_guild_lvl = [

        30,80,165,310,555,

        970,1680,2885,5770

    ];



    //Enchanters' Guild (5 levels)

    var enchanters_guild_lvl = [

        104,588,2200,7000,10000

    ];

   

    //Enchanters' Guild branches (11 levels)

    var enchanters_guild_branches_lvl = [

        8,29,71,155,295,

        505,799,1191,1695,6000,12000

    ]; 





   



    // Stile

    var cssStyle = "";

    cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";

    GM_addStyle(cssStyle);





    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;         // Costante per il primo elemento per XPath

    var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;    // Costante per una lista di elementi per XPath



    function init() {

        //Option Menu

        GM_registerMenuCommand(T('Progress Bar') +": "+ T('Show all factions'), function() {

            GM_setValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", false);

            location.reload();

        });



        GM_registerMenuCommand(T('Progress Bar') +": "+ T('Show active faction'), function() {

            GM_setValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", true);

            location.reload();

        });



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

     * Effettua una ricerca all'interno del documento usando XPath

     *

     * Input:

     *	xpath       Espressione da ricercare

     *	xpres       Tipo di ricerca

     *

     * Output:

     *	Riferimento all'oggetto trovato

     */

    function find(xpath, xpres,startnode){

        if (!startnode) {startnode=document;}

        var ret = document.evaluate(xpath, startnode, null, xpres, null);

        return  xpres == XPFirst ? ret.singleNodeValue : ret;

    }         



    /**

     * Aggiunge un nodo dopo quello fornito

     *

     * Input:

     *	refChild    Nodo di riferimento

     *	newChild	Nodo da aggiungere

     */

    function insertAfter(newChild, refChild) {

        node.parentNode.insertBefore(newChild, refChild.nextSibling);

    }



    /**

     * Crea un elemento

     *

     * Input:

     *	tag         Etichetta del nuovo elemento

     *	content     Contenuto del nuovo elemento in formato testuale

     *

     * Output:

     *	Riferimento all'elemento creato

     */

    function elem(tag, content){

        var ret = document.createElement(tag);

        ret.innerHTML = content;

        return ret;

    }



    /**

     * Traduce il testo usato la lingua identificata

     *

     * Input:

     *	testo:	Testo da tradurre

     *

     * Output:

     *	Testo tradotto

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

     * Crea una progress bar

     *

     * Input:

     *	exp_attuale     Attuale esperienza

     *	lvl_attuale     Livello attuale (facoltativo)

     *	exp_lvls        Array dei livelli

     *

     * Output:

     *	HTML per generare la progress bar

     */

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



        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+

            "<img src=\"i/top/logot.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+

            "</DIV>";

        

        return progress_bar_html;

    }



    function showExpBar(){

        var tabelle = find("//table", XPList);

        var player_info = "";

        var skill_info = "";

        var player_faction = "";

        

        //TODO: Trovare un modo per individuare univocamente le informazioni. La struttura attuale del server non sembra permetterlo.

        if (location.href.indexOf('home.php') != -1) {

            //Ricerco in tutte le tabelle della pagina

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

                            if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML.search(/\.gif\" title\=\"(.*?)\"/) > 0) {

                                player_faction = RegExp.$1;

								//alert(player_faction+'\n\n'+tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML);

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



        //========== Combat Level

        var lvl_info = player_info.textContent.split("\u00BB")[1];

        lvl_info.search(/(.*)\((.*)\)(.*)/);

        var lvl_attuale = eval(RegExp.$1.replace(T('Combat level') +": ",""));



        lvl_info.search(/\((.*)\)/);

        var exp_attuale = eval(RegExp.$1);



        var progress_bar_html = makeProgressBar(exp_attuale, lvl_attuale, combat_exp_lvl);

        player_info.innerHTML = player_info.innerHTML.replace("</font><br><br>", "</font>"+ progress_bar_html +"<br>");

        player_info.innerHTML = player_info.innerHTML.replace("</font><br>", "</font>"+ progress_bar_html +"<br>");



        var skills = skill_info.innerHTML.split(">&nbsp;&nbsp;");



        //========== Player Faction(s)

        var active_faction_index = factions.indexOf(player_faction);



        if (GM_getValue("SHOW_ONLY_ACTIVE_FACTION_PROGRESS_BAR", true)) { // show current faction only

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

        } else { // show ALL factions

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

            }

        }





        //========== Hunters' guild

        if (GM_getValue("SHOW_HUNTERS_PROGRESS_BAR", true)) {

            lvl_info = skills[8];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", hunters_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Laborers\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Laborers\' guild'));

        }





        //========== Laborers' guild

        if (GM_getValue("SHOW_LABORERS_PROGRESS_BAR", true)) {

            lvl_info = skills[9];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", laborers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Gamblers\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Gamblers\' guild'));

        }





        //========== Gamblers' guild

        if (GM_getValue("SHOW_GAMBLERS_PROGRESS_BAR", true)) {

            lvl_info = skills[10];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", gamblers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Thieves\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Thieves\' guild'));

        }





        //========== Thieves' guild

        if (GM_getValue("SHOW_THIEVES_PROGRESS_BAR", true)) {

            lvl_info = skills[11];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", thieves_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Rangers\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Rangers\' guild'));

        }



        //========== Rangers' guild

        if (GM_getValue("SHOW_RANGERS_PROGRESS_BAR", true)) {

            lvl_info = skills[12];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", rangers_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Mercenaries\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Mercenaries\' guild'));

        }





       //========== Mercenaries' guild

        if (GM_getValue("SHOW_MERCENARIES_PROGRESS_BAR", true)) {

            lvl_info = skills[13];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", mercenaries_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Tactics\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Tactics\' guild'));

        }



		

        //========== Tactics' guild

        if (GM_getValue("SHOW_TACTICS_PROGRESS_BAR", true)) {

		    lvl_info = skills[14];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", tactics_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ T('Smiths\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Smiths\' guild'));

        }



        //========== Smiths' guild

        if (GM_getValue("SHOW_SMITHS_PROGRESS_BAR", true)) {

            lvl_info = skills[15];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

    

            progress_bar_html = makeProgressBar(exp_attuale, "", smiths_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("&nbsp;&nbsp;"+ T('Enchanters\' guild'), progress_bar_html +"&nbsp;&nbsp;"+ T('Enchanters\' guild'));

        }





        //========== Enchanters' guild

        if (GM_getValue("SHOW_ENCHANTERS_PROGRESS_BAR", true)) {

            lvl_info = skills[16];

            lvl_info.search(/\((\d*.?\d*)\)/);

            exp_attuale = RegExp.$1;

			progress_bar_html = makeProgressBar(exp_attuale, "", enchanters_guild_lvl);

            skill_info.innerHTML = skill_info.innerHTML.replace("<div id=\"mod_guild\">", progress_bar_html +"<div id=\"mod_guild\">");

        }

		





 		

		

    }



    init();



    // Azioni specifiche per alcune pagine

    if (location.href.indexOf('home.php') != -1)        showExpBar();

    if (location.href.indexOf('pl_info.php') != -1)     showExpBar();

};



window.addEventListener('load', main, false);

