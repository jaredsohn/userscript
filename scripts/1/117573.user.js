/* tab:4 */
// ==UserScript==
// @name           bomond_moswar
// @namespace      http://bitbucket.org/gudik/
// @description    BOT for online brouser game http://sofiawars.com/
// @include        http://www.sofiawars.com/*
// @include        http://example.org/
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_common.js
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_gui.js
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_log.js
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_battle.js
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_digger.js
// @require        https://bitbucket.org/gudik/moswar/raw/1.0.2/bomond_moswar_core.js
// ==/UserScript==

/**
 * Имя переменной GM в которой храниться лог
 */
var BOMOND_MW_LOG = "bomond_mw_log";
/**
 * Имя переменной GM в которой храниться значение итератора
 */
var BOMOND_MW_LOG_I = "bomond_mw_log_iter";
/**
 * Ротация лога(максимальное значение итератора), количество хранимых строк в логе
 */
var BOMOND_MW_LOG_ROTATION = 30;
/**
 * Использовать мажорский поиск. (тукещий уровень героя)
 */
var BOMOND_MW_MAJOR = 1; // 1 0
/**
 * Указывает боту кого искать в простом поиске
 * Не учитывается если BOMOND_MW_MAJOR = 1
 * weak     - слабые
 * equal    - равные
 * strong   - сильные
 * enemy    - из списка врагов
 * victim   - из списка жертв
 **/
_gms("BOMOND_MW_TYPE", _gmg("BOMOND_MW_TYPE", "weak"));
/**
 * Включен/выключен бот
 */
_gms("BOMOND_MW_ON", _gmg("BOMOND_MW_ON", false));
/**
 * Показать/скрыть меню бота
 */
_gms("BOMOND_MW_SHOW", _gmg("BOMOND_MW_SHOW", true));
/**
 * Очередь действий
 */
_gms("BOMOND_MW_QUEUE", "graft,heal,search,attack");
/*
 * Указатель на текущее действие
 */
//GM_deleteValue("BOMOND_MW_QUEUE_ITER");
_gms("BOMOND_MW_QUEUE_ITER", _gmg("BOMOND_MW_QUEUE_ITER", 0));
/**
 * Имя функции в которой последний раз вызывалась функция setLocation()
 */
_gms("BOMOND_MW_LAST_FUNC", _gmg("BOMOND_MW_LAST_FUNC", ""));
/**
 * Ошибки
 */
var BOMOND_MW_ERRORS = {
	0: "Штатное завершение работы"
	,1: "Ненайден элемент searchForm"
	,2: "Ненайден подходящий элемент option"
	,3: "Ненайдена кнопка [Напасть!]"
	,4: "Время не вышло"
    ,5: "Не найден элемент: playerHpBar"
    ,6: "Не выбрано действие"
    ,7: "setLocation() повторное выполнение. Страница обновлена."
}

/**
 * Запуск скрипта
 */

var gui = new bomondGUI();

if( _gmg("BOMOND_MW_ON") ){

    //digger();

    battle();

}

