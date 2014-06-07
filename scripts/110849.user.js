/* tab:4 */
// ==UserScript==
// @name           mw_zakoulki
// @namespace      bomond
// @description    hunter
// @include        http://www.sofiawars.com/*
// @require        http://userscripts.org/scripts/source/90509.user.js
// ==/UserScript==

/**
 * Использовать мажорский поиск. (тукещий уровень героя)
 */
var BOMOND_MW_MAJOR = 0; // 1 0

/**
 * Указывает боту кого искать в простом поиске
 * Не учитывается если BOMOND_MW_MAJOR = 1
 *
 * weak     - слабые
 * equal    - равные
 * strong   - сильные
 * enemy    - из списка врагов 
 * victim   - из списка жертв
 **/
var BOMOND_MW_TYPE = "weak";

/**
 * Ошибки
 */
var BOMOND_MW_ERRORS = {
	0: "Штатное завершение работы"
	,1: "Ненайден элемент searchForm"
	,2: "Ненайден подходящий элемент option"
	,3: "Ненайдена кнопка [Напасть!]"
	,4: "Время не вышло"
    ,5: "Не найден эдемент: playerHpBar"
    ,6: "Не выбрано действие"
}

/** НАЧАЛО СКРИПТА **/ 
GM_log("MW: START");

var timer = document.getElementById("timeout");
    
if( timer.getAttribute("timer") &&  timer.getAttribute("timer") > 0 ){

    var time_rand = getRandomInt(5000, 10000);
    var time = timer.getAttribute("timer");

    GM_log("MW: detect timer. Sleep to: " + ((time_rand + time*1000)/1000)  );

    setInterval(function(){document.location = "http://www.sofiawars.com/alley/";}, (time_rand + time*1000) );

}else{

	/** CODE HERE **/

    doGraft(); // Если высокий розыск( больше 40%), то ф-ция дает взятку
    doHeal(); // Если необходимо, то лечимся
    main();

}

GM_log("END");
/** КОНЕЦ СКРИПТА **/ 

function main(){
    GM_log("MW/main: start");

	if( document.location == "http://www.sofiawars.com/alley/" ){

		MW_log( searchOpponent() );

	}else{

        document.location = "http://www.sofiawars.com/alley/";
    }

    var cond = "http://www.sofiawars.com/alley/search/type/";

    if( BOMOND_MW_MAJOR ){
        cond = "http://www.moswar.ru/alley/search/type/"
    }
	if(document.location == cond){

		MW_log( attack() );

	}

	return 0;	
}

function attack(){

    GM_log("MW/main/attack: start");

	var result = document.evaluate("//div[@id='content']//a[@class='f' and @onclick and  @href='#']", document, null, XPathResult.ANY_TYPE, null);
	var link = result.iterateNext();

	if( ! link ){return 3;}

	jscode = link.getAttribute("onclick");

	regexp = /[0-9]{1,}/g;

	var player_id = regexp.exec(jscode) ;

    GM_log("MW/main/attack: player - " + player_id);

    unsafeWindow.alleyAttack(player_id,1,0);

	return 0;
}

function searchOpponent(){

    GM_log("MW/main/searchOpponent: start");

    var form_name = BOMOND_MW_MAJOR?"searchLevelForm":"searchForm";

	if( ! document.getElementById(form_name) ){return 1;}

	search_form =  document.getElementById(form_name).wrappedJSObject;

    if( ! BOMOND_MW_MAJOR){

	    option = getOptionByValue(search_form["type"].options, BOMOND_MW_TYPE);

	    if( ! option ){return 2;}

	    option.selected = true;
    
    }

    GM_log("MW/main/searchOpponent: search_form.submit");
	search_form.submit();

	return 0;
}
/**
 * Дать взятку
 **/
function doGraft(){
    GM_log("MW/doGraft: start");
    var result = document.evaluate("//div[@id='personal']//div[@class='wanted']//div[@class='bar']/div[@class='percent']", document, null, XPathResult.ANY_TYPE, null);
    var node = result.iterateNext();
    rozisk  = parseInt(node.style.width, 10);
    GM_log("MW/doGraft: " + rozisk);

    if( rozisk > 40 ){
        GM_log("MW/doGraft: do");
        document.location ="http://www.moswar.ru/police/fine/";
    }
} 

function doHeal(){

    var element = xpathfirst("//div[@id='playerHpBar' and @class='percent']").wrappedJSObject;

    if( ! element ){return 4;}

    var heal = parseInt(element.style.width, 10);

    switch( heal ){
        case heal > 80:
            // ничего неделаем
        break;
        case heal > 49:
            GM_log("MW/doHeal: " + heal + "hp, лечим: 50%");
            document.location = "http://www.sofiawars.com/player/use/16965273/";
            return 0;
        break;
        case heal < 50:
            GM_log("MW/doHeal: " + heal + "hp, лечим: 100%");
            document.location = "http://www.moswar.ru/home/heal/";
            return 0;
        break;
    }

    return 6;
}

/** LIB FUNCTION  v 0.1 **/

/**
 * Возращает первый результат xpath запроса query
 */
function xpathfirst(query, startingPoint){

    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0){return false;}

    return res.snapshotItem(0);
}
/**
 * Обертка для xpath запроса
 */
function xpath(query, startingPoint){
    
    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    return retVal;
}


function getOptionByValue(options, value){

	len = options.length;

	for(var i = 0; i < len; i++){
		if( options[i].value == value ){
			return options[i];
		}
	}

	return false;
}


function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function MW_log(result){

	GM_log([result, BOMOND_MW_ERRORS[result]]);

}

function log(line){
    GM_setValue("bomond_log", line);
}
