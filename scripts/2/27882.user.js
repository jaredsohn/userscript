// ==UserScript==
// @name HWM Silentio's ProgressBar Mod
// @author Silentio
// @namespace HWM
// @version 0.6
// @description Add progress bar for Combat, Player faction, Hunters' Guild, Laborers' Guild and Gamblers' Guild levels
// @include http://www.heroeswm.ru/home.php*
// @include http://www.heroeswm.ru/pl_info.php*
// ==/UserScript==
// $Revision: 005 $
/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Italy License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/it/
 */

 //alert("HWM Silentio's Mod");
 
 
 // ================ USER VARIABLES (edit to show/hide optional bars) =========================
 // By default, only combat level, current faction, Hunters' and Laborers' guilds are shown
 // uncomment flag variables below to show more.
 // ===
 
 var showAllFactions = false;
showAllFactions = true; // uncomment to show all factions

var show_gamblers = false;
//show_gamblers = true; // uncomment to show Gamblers' Guild

var show_mercenaries = false;
show_mercenaries = true; // uncomment to show Mercenaries' Guild

var show_thieves = false;
show_thieves = true; // uncomment to show Thieves' Guild

var show_smiths = false;
//show_smiths = true; // uncomment to show Smiths' Guild
 
 // ================ ================ =========================
 
 
 
// Funzione principale, eseguita al caricamento di tutta la pagina
function main(e){      
	var version = "0.5";

    //Factions
	/*
    var factions = [
        'Knight','Necromancer','Wizard','Elf','Barbarian',
        'Dark elf','Demon'
    ]
	*/
	var factions = [
        '\u0420\u044B\u0446\u0430\u0440\u044C','\u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442','\u041C\u0430\u0433','\u042D\u043B\u044C\u0444','\u0412\u0430\u0440\u0432\u0430\u0440',
        '\u0422\u0435\u043C\u043D\u044B\u0439 \u044D\u043B\u044C\u0444','\u0414\u0435\u043C\u043E\u043D'
    ];

    //Combat experience table (13 levels)
    var combat_exp_lvl = [
        0,1500,4500,15000,32000,
        90000,190000,400000,860000,1650000,
        3000000,5000000,8500000,14500000
    ];

    //Racial skill table (9 levels)
    var racial_skill_lvl = [
        20,50,90,160,280,
        500,900,1600,2900,2900
    ];

    //Hunters' Guild (8 levels)
    var hunters_guild_lvl = [
        16,60,180,400,700,
        1200,2000,3000,4300,6000
    ];

    //Laborers' Guild (8 levels)
    var laborers_guild_lvl = [
        90,180,360,720,1500,
        3000,5000,8000,12000
    ];

    //Gamblers' Guild (15 levels)
    var gamblers_guild_lvl = [
        10,30,60,100,150,
        210,280,360,450,550,
        660,800,1000,1300,2000
    ];

    //Thieves' Guild (7 levels)
    var thieves_guild_lvl = [
        50,120,240,400,600,
        840,1200,2000,3000
    ];

    //Mercenaries' Guild (6 levels)
    var mercenaries_guild_lvl = [
        50,120,300,600,1000,
        1500,2200
    ];

    //Smiths' Guild (8 levels)
    var smiths_guild_lvl = [
        30,80,165,310,555,
        970,1680,2885
    ];

    //Enchanters' Guild (3 levels)
    var enchanters_guild_lvl = [
        104,588,2200
    ];

    // Stile
    var cssStyle = "";
    cssStyle += ".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black;}";
    GM_addStyle(cssStyle);


    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		    // Costante per il primo elemento per XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Costante per una lista di elementi per XPath


	/**
	 * Realiza una busqueda en el documento usando XPath
	 *
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 *
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres,startnode){
		if (!startnode) {startnode=document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}         

	/**
	 * Inserta un nodo despues de otro
	 * 
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**
	 * Crea un elemento cualquiera con un contenido
	 *
	 * Params:
	 *	tag	Etiqueta del nuevo elemento
	 *	content	Contenido del nuevo elemento en formato texto
	 *
	 * Returns:
	 *	Referencia al nuevo elemento creado
	 */
	function elem(tag, content){
		var ret = document.createElement(tag);
		ret.innerHTML = content;
		return ret;
	}
	
	function makeProgressBar(exp_attuale, lvl_attuale, exp_lvls){
        if (lvl_attuale=="") {
            for (var i=0; i < exp_lvls.length; i++) {
                if (exp_lvls[i] > exp_attuale) {
                    lvl_attuale = i;
                    break;
                }
            }
        }

        var exp_necessaria = exp_lvls[lvl_attuale];
        if (lvl_attuale > 0) {
            exp_attuale = exp_attuale - exp_lvls[lvl_attuale-1];
            exp_necessaria = exp_necessaria - exp_lvls[lvl_attuale-1];
        }
		exp_necessaria = (exp_necessaria>0)?exp_necessaria : 1;
        var perc = Math.round(exp_attuale * 100 / exp_necessaria);
		perc = (perc<100)? perc : 100;
        var progress_bar_html = "<DIV class=\"table_progress\" title=\""+ perc +"%\">"+
            "<img src=\"i/top/logob.jpg\" height=\"3\" width=\""+ perc +"\" title=\""+ perc +"%\" alt\""+ perc +"%\">"+
            "</DIV>";
        
        return progress_bar_html;
    }

    function showExpBar(){
        var tabelle = find("//table", XPList);
        
        //TODO: Trovare un modo per individuare univocamente le informazioni. La struttura attuale del server non sembra permetterlo.
        if (location.href.indexOf('home.php') != -1) {
            player_info = tabelle.snapshotItem(32).childNodes[0].childNodes[0].childNodes[0];
				//alert("player_info = "+player_info.innerHTML);
            //skill_info = tabelle.snapshotItem(32).childNodes[0].childNodes[0].childNodes[1];
            //Ricerco in tutte le tabelle della pagina quella contenente le Skills
            for (var i = 32; i < tabelle.snapshotLength; i++){
                if (!tabelle.snapshotItem(i)) continue;
                if (!tabelle.snapshotItem(i).childNodes[0]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[0]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1]) continue;
    
                if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1].innerHTML.indexOf("\u0420\u044B\u0446\u0430\u0440\u044C:") > 0) {
                    skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1];
                    break;
                }
            }

            tabelle.snapshotItem(31).childNodes[1].childNodes[0].childNodes[0].innerHTML.search(/title\=\"(.*?)\"/);
            player_faction = RegExp.$1;
				//alert("player_faction = "+player_faction);
        } else if (location.href.indexOf('pl_info.php') != -1) {
            //player_info = tabelle.snapshotItem(36).childNodes[0].childNodes[2].childNodes[0]; // ???
			var combat_lvl_str = "\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C";
			
			for (var i = 30; i < tabelle.snapshotLength; i++){
				if (!tabelle.snapshotItem(i)) continue;
                if (!tabelle.snapshotItem(i).childNodes[0]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[2]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0]) continue; 
				
				if (tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0].innerHTML.indexOf(combat_lvl_str) !=-1) {
                    player_info = tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0];
						//alert("i="+i+"    player_info = "+player_info.innerHTML);
                    break;
                }
				
			}
            //skill_info = tabelle.snapshotItem(39);
            //Ricerco in tutte le tabelle della pagina quella contenente le Skills
            for (var i = 39; i < tabelle.snapshotLength; i++){
                if (!tabelle.snapshotItem(i)) continue;
                if (!tabelle.snapshotItem(i).childNodes[0]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[1]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1]) continue; 

                if (tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1].innerHTML.indexOf("\u0420\u044B\u0446\u0430\u0440\u044C") > 0) {
                    skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1];
                    break;
                }
            }

            tabelle.snapshotItem(31).childNodes[0].childNodes[0].childNodes[0].innerHTML.search(/\- (.*)</);
            player_faction = RegExp.$1;
        }


        // Combat Level
        var lvl_info = player_info.textContent.split("»")[1];

        lvl_info.search(/(.*)\((.*)\)(.*)/);
        //var lvl_attuale = eval(RegExp.$1.replace("Combat level: ",""));
        var lvl_attuale = eval(RegExp.$1.replace("\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: ",""));

        lvl_info.search(/\((.*)\)/);
        var exp_attuale = eval(RegExp.$1);

        var progress_bar_html = makeProgressBar(exp_attuale, lvl_attuale, combat_exp_lvl);
        player_info.innerHTML = player_info.innerHTML.replace("</font><br><br>", "</font>"+ progress_bar_html +"<br>"); // up to 13 lvl
        player_info.innerHTML = player_info.innerHTML.replace(")&nbsp;<br><br>", ")"+ progress_bar_html +"<br>"); // 14 lvl only


        var skills = skill_info.innerHTML.split("<br>&nbsp;&nbsp;");

		
		
        // ========= Player Faction(s)
        var faction_index;
		var next_faction;
		if(!showAllFactions){ // show current faction only
        faction_index = factions.indexOf(player_faction);
        lvl_info = skills[faction_index];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", racial_skill_lvl);

        if (faction_index<factions.length-1) {
            next_faction = factions[faction_index + 1];
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);
        } else {
            //skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;Hunters", progress_bar_html +"<br>&nbsp;&nbsp;Hunters");
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432", progress_bar_html +"<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432");
        }
		
		
		}else{ // show ALL factions
		for(var i=0;i<factions.length;i++){
		faction_index = i;
        lvl_info = skills[faction_index];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", racial_skill_lvl);

        if (faction_index<factions.length-1) {
            next_faction = factions[faction_index + 1];
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);
			// in case next one is current and in bold font...
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;<b>"+ next_faction, progress_bar_html +"&nbsp;&nbsp;<b>"+ next_faction);
        } else {
            //skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;Hunters", progress_bar_html +"<br>&nbsp;&nbsp;Hunters");
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432", progress_bar_html +"<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432");
        }
		}
		
		}

		
		
        // ========== Hunters' guild
        lvl_info = skills[7];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", hunters_guild_lvl);
        //skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;Laborers", progress_bar_html +"&nbsp;&nbsp;Laborers");
        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0430\u0431\u043E\u0447\u0438\u0445", progress_bar_html +"&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0420\u0430\u0431\u043E\u0447\u0438\u0445");

        // Laborers' guild
        lvl_info = skills[8];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", laborers_guild_lvl);
        //skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;Gamblers", progress_bar_html +"&nbsp;&nbsp;Gamblers");
        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0430\u0440\u0442\u0435\u0436\u043D\u0438\u043A\u043E\u0432", progress_bar_html +"&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0430\u0440\u0442\u0435\u0436\u043D\u0438\u043A\u043E\u0432");

        // Gamblers' guild
		if(show_gamblers){
        lvl_info = skills[9];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", gamblers_guild_lvl);
        //skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;Thieves", progress_bar_html +"&nbsp;&nbsp;Thieves");
        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0412\u043E\u0440\u043E\u0432", progress_bar_html +"&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u0412\u043E\u0440\u043E\u0432");
		}
		
		// Thieves' guild
		if(show_thieves){
        lvl_info = skills[10];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", thieves_guild_lvl);
        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041D\u0430\u0435\u043C\u043D\u0438\u043A\u043E\u0432", progress_bar_html +"&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041D\u0430\u0435\u043C\u043D\u0438\u043A\u043E\u0432");
		}
		
		// Mercenary guild
		if(show_mercenaries){
        lvl_info = skills[11];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", mercenaries_guild_lvl);
        skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0443\u0437\u043D\u0435\u0446\u043E\u0432", progress_bar_html +"&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041A\u0443\u0437\u043D\u0435\u0446\u043E\u0432");
		}
		
		// Smiths' guild
		if(show_smiths){
        lvl_info = skills[12];
        lvl_info.search(/\((\d?\d?\d?\d?\d\.?\d?\d?)\)/);
        exp_attuale = RegExp.$1;

        progress_bar_html = makeProgressBar(exp_attuale, "", smiths_guild_lvl);
        skill_info.innerHTML = skill_info.innerHTML.replace('<div id="home_2">&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0440\u0443\u0436\u0435\u0439\u043D\u0438\u043A\u043E\u0432', progress_bar_html +'<div id="home_2">&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0440\u0443\u0436\u0435\u0439\u043D\u0438\u043A\u043E\u0432');
		}
		
    }

	/* Azioni specifiche per alcune pagine */
   	if (location.href.indexOf('home.php') != -1)        showExpBar();
   	if (location.href.indexOf('pl_info.php') != -1)     showExpBar();
};

window.addEventListener('load', main, false);