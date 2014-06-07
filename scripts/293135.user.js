// ==UserScript==
// @name           Портал Neverwinter - Прокачка профессий
// @description    Автоматический выбор профессий для пустых слотов
// @namespace      http://userscripts.org/scripts/show/293135
// @include        https://gateway.nw.ru.perfectworld.eu/
// @include        https://gateway.nw.ru.perfectworld.eu/* 
// @include        http://gateway.nw.ru.perfectworld.eu/
// @include        http://gateway.nw.ru.perfectworld.eu/* 
// @updateURL      https://userscripts.org/scripts/source/293135.meta.js
// @downloadURL    https://userscripts.org/scripts/source/293135.user.js
// @originalAuthor Mustex
// @modifiedBy     iROOT
// @version        0.2.0.1.8
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/us/
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/* Примечания к выпуску
0.2.0.1.8
    - Added pause button to allow easy on/off switching
0.2.0.1.7
    - Added option to enable/disable filling optional asset slots
    - Added batch potions tasks to be skipped in ingredient selection
    - Added timer to reload page if stuck loading for too long
    - Added option to disable page sounds
    - Updated license to by-nc-sa
0.2.0.1.6
    - Add configurable option for excluding rare tasks
0.2.0.1.5
    - Add ability to specify specific level for tasks and configure same named artificing resource tasks to request correct level of task
    - Remove purchase notification that never times out
0.2.0.1.4
    - Added functionality to purchase required resources from gateway shop
0.2.0.1.3
    - Add Artificing and Weaponsmithing to Robot
      (Artificing will not work properly yet as all three tiers of gather and craft tasks have the same task name) 
0.2.0.1.2
    - Update reload process
    - Fix optional asset selector with gateway update
0.2.0.1.1
    - Simplify asset selection after they fixed bug in previous gateway update
    - Update level 20 leadership tasks
    - Update with changes in Mustex's script (version 15)
        * Added a secondary timer that will reload the gateway every few hours. This should help with disconnects from the server
        * Implemented tooltips for settings panel
0.1.9.1.15
    - Repeat task reordering for +2 armor
0.1.9.1.14
    - Fix selection of assets after gateway update
    - Skip intensive gather tasks added after gateway update
0.1.9.1.13
    - Change ordering of tasks and ingredient checks
      The purpose of this is to allow crafting of +4 armors if you have +2 ingredients in your inv but to not create them if you don't.
      Creating the ingredients for them is less efficient than crafting ingredients for штаны but is more efficient if you already have the ingredients from earlier tasks.
0.1.9.1.12
    - Optimise crafting tasks for highest exp/min gains due to ingredient requirements
0.1.9.1.11
    - Add extra craft tasks for when residuum runs out
0.1.9.1.10
    - Only allow rare tasks to be selected for Leadership
      This avoids craft loops where higher quality rare crafts require ingredients with the same name
0.1.9.1.9
    - Alter craft tasks to favour armor to optimise inventory space
0.1.9.1.8
    - Fix script restart bug when no tasks found
0.1.9.1.7
    - Update search string for Potions (After the task names for elxiirs have been changed)
    - Remove logon error skips to avoid logons sometimes failing on first load (ensure logon details are correct!)
0.1.9.1.6
    - Update tasks for all professions
    - Update ingredient search lists for all professions
0.1.9.1.5
    - Fix regular expression used in potion ingredient search
0.1.9.1.4
    - Alter default timeouts (makes script a lot more stable and less prone to errors)
    - Remove unused variable
    - Add extra logging for task ingredient searches
0.1.9.1.3
    - Fix bug with required resource checks getting stuck on non craftable resources
0.1.9.1.2
    - Added method to check for required task ingredients and choose tasks to create them
      Method is currently hard coded to specify certain search strings for ingredient types
      Currently working for all Alchemy tasks
      There is a current problem that if you have the required potion ingredient but it is in your belt slots
      the task is uncraftable but the ingredients show as available and it will not craft a new one
0.1.9.1
    - Update with changes in Mustex's script (version 12)
        * Added tasks for Platesmithing, Leatherworking, Tailoring
        * Added detection for the gateway being down
0.1.8.3.8
    - Update asset selection to avoid using coloured assets in junk slots for leadership
0.1.8.3.7
    - Update leadership tasks table due to task reward/duration alterations
0.1.8.3.6
    - Add option to enable/disable automation process
    - Update alchemy tasks some more
0.1.8.3.5
    - Add ability to select from multiple tasks with same name (eg Алхимические исследования)
    - Add craft options for alchemy potions (need to be manually switched since they use the same ingredients)
0.1.8.3.4
    - Add alchemy tasks up to level 20
0.1.8.3.3
    - Change task slot selection to be user configurable options in settings window
    - Add level 1 Алхимические исследования
0.1.8.3.2
    - Added ability to specify how many tasks of each profession to train multiple professions at once
    - Updated mailsmithing level 0 tasks
0.1.8.3.1
    - Changed asset selection to only update Junk assets
    - Leadership asset selection for bronze tier picks lowest asset first
    - Modified Leadership tasks
0.1.8.3
    - Tweaked Leadership tasks grid
    - Added task grid for Alchemy (Partial) 
0.1.8.2
    - onsave handlers for settings are now called before the settings values are saved
    - Added onsave handler for console to enable/disable using the window console
0.1.8.1
    - Added checking for errors (using the window title) and will navigate back to the main login page if autologin is enabled
0.1.8
    - Added popup for altering settings
    - Settings are saved to script cache
    - Added mailsmithing tasks to task grid
0.1.7
    - Added lower level leadership tasks to grid
    - Added hiring tasks to leadership task
    - Uses saved values to determine which profession type to level (Defaults to Leadership, currently no way to change it)

0.1.5
    - Is now able to recover from missing assets
    - Uses a configurable grid to determine what the next task is to complete

0.1.0
    - Is now able to select some hard coded leadership tasks
    - Can now collect from any completed slot
*/

/* Востребованные функции
 * - Add settings to restrict types of optional assets selected
 * - Add logic to determine when to 'hire' more assets (Depends on number of open slots, profession level, and current assets of the correct level)
 * - Add settings for defining a minimum amount of resources to attempt to keep in stock (When the rare tasks come up we will need to have some resources available)
 */

// Убедиттся, что он работаем на главной странице, без фреймов
if(window.self !== window.top) {
    throw "";
}

(function() {
    
    /**
     * Добавить CSS строку на главную страницу
     *
     * @param {String} cssString Добавить CSS на главную страницу
     */
    function AddCss(cssString) {
        var head = document.getElementsByTagName('head')[0];
        if(!head)
            return;
        var newCss = document.createElement('style');
        newCss.type = "text/css";
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }
    function countLeadingSpaces(str) {
        return str.match(/^(\s*)/)[1].length;
    }
    
    
    var image_pause = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAY" +
        "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" +
        "BNp57TyT3+MAAAAASUVORK5CYII="
    var image_play = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYA" +
        "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"
    var image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
        "aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
        "koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
        "f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
        "QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
        "/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
        "1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
        "WdWHfmAAAAAElFTkSuQmCC";
    var image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
        "BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
        "KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
        "UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
        "Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
        "pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
        "6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
        "85FH/WkOkaHQAAAABJRU5ErkJggg==";
    
    
    // Настройка глобальных переменных задержек
    var fouxConsole = {log:function(){},info:function(){},error:function(){},warn:function(){}};
    var console = unsafeWindow.console || fouxConsole;
    var $ = unsafeWindow.jQuery;
    var timerHandle = 0;
    var loadingTimerHandle = 0; // Используется для перезагрузки страницы, если страница загружается слишком долго
    var loadingTimer = 300000; // 5 минут
    var reloadTimerHandle = 0; // Используется для таймера который перезагружает портал каждые несколько часов
    var reloadNeeded = false;
    var reloadDelay = 3600000; // 1 час
    var longDelay = 300000; // 5 минут
    var delay = 20000; // 20 секунд
    var delayShort = 5000;; // 5 секунд
    var dfdNextRun = $.Deferred();
    
    /*
     * Список может быть изменен, чтобы настроить задачи, которые необходимо выполнить. 
     * Окно настроек позволяет утсновить сколько слотов Вы хотите использовать для каждой профессии.
     * Массив уровней ниже для каждого профессий определяет задачи вы хотите выполнять на каждом уровне профессии.
     * В каждый слот будет выбрана первая задача которая отвечает требованиям.
     */
    var tasklist = [
        {
            // Лидерство
            taskName:"Leadership",
            level: {
                0:["Hire Your First Mercenary"],
                1:["Complete Advanced Training", "Protect Grateful Merchant","Pick Up Package", "Basic Training"],
                2:["Исследуйте район"],
                3:["Исследуйте район","Наем"],
                4:["Защита каравана","Наем"],
                5:["Защита каравана","Исследование местности","Наем"],
                6:["Защита каравана","Исследование местности","Наем"],
                7:["Защита каравана","Исследование местности","Наем"],
                8:["Защита каравана","Исследование местности","Защита рынка","Наем"],
                9:["Защита каравана","Карта региона","Исследование местности","Защита рынка","Наем"],
                10:["Защита каравана","Карта региона","Исследование местности","Бой с нежитью","Защита рынка","Наем"],
                11:["Защита каравана","Карта региона","Исследование местности","Бой с нежитью","Защита рынка","Наем"],
                12:["Защита каравана","Карта региона","Исследование местности","Бой с нежитью","Защита рынка","Наем"],
                
                // Текущая модель
                13:["Патрулирование рудников","Карта региона","Защита каравана","Исследование местности","Защита рынка","Бой с нежитью","Наем"],
                14:["Патрулирование рудников","Карта региона","Защита каравана","Исследование местности","Защита рынка","Бой с нежитью","Наем"],
                15:["Патрулирование рудников","Карта региона","Защита каравана","Исследование местности","Защита рынка","Бой с нежитью","Наем"],
                16:["Патрулирование рудников","Карта региона","Защита каравана","Исследование местности","Защита рынка","Бой с нежитью","Наем"],
                17:["Патрулирование рудников","Карта региона","Доставка металлов","Защита каравана","Исследование местности","Сбор налогов","Защита рынка","Бой с нежитью","Наем"],
                18:["Патрулирование рудников","Карта региона","Доставка металлов","Защита каравана","Исследование местности","Сбор налогов","Защита рынка","Бой с нежитью","Наем"],
                19:["Патрулирование рудников","Карта региона","Доставка металлов","Защита каравана","Исследование местности","Сбор налогов","Защита рынка","Бой с нежитью","Наем"],
                20:["Assault Enemy Stronghold","Follow Map to an Unknown Location","Recover Large Mineral Claim","Destroy Enemy Camp","Доставка металлов","Protect Diamond Shipment","Сбор налогов","Give Refugees a Home","Бой с нежитью","Защита каравана","Патрулирование рудников","Карта региона","Исследование местности"],
                
                // Режим обучения
                /*
                13:["Обучение пехотинца","Защита рынка","Наем"],
                14:["Обучение пехотинца","Защита рынка","Наем"],
                15:["Обучение пехотинца","Защита рынка","Наем"],
                16:["Обучение пехотинца","Защита рынка","Наем"],
                17:["Обучение пехотинца","Защита рынка","Наем"],
                */
            },
        },
        {
            // Плетение кольчуг
            taskName:"Armorsmithing_Med",
            level: {
                0:["Hire your first Prospector"],
                1:["Кольчужные сапоги","Кольчужная рубаха"],
                2:["Кольчужный доспех","Кольчужные штаны","Наймите дополнительного старателя"],
                3:["Кольчужный доспех","Кольчужные сапоги +1","Наймите дополнительного старателя"],
                4:["Кольчужный доспех","Кольчужные сапоги +1","Наймите дополнительного старателя"],
                5:["Кольчужный доспех +1","Кольчужные сапоги +1","Наймите дополнительного старателя"],
                6:["Кольчужный доспех +1","Кольчужные сапоги +1","Наймите дополнительного старателя"],
                7:["Кольчужный доспех +1","Кольчужные сапоги +2","Качественные кольчужные рубаха","Улучшить старателя","Наймите дополнительного старателя"],
                8:["Кольчужный доспех +2","Качественные кольчужные штаны","Кольчужные сапоги +2","Качественные кольчужные рубаха","Улучшить старателя","Наймите дополнительного старателя"],
                9:["Кольчужный доспех +2","Качественные кольчужные штаны","Кольчужные сапоги +2","Качественные кольчужные рубаха","Улучшить старателя","Наймите дополнительного старателя"],
                10:["Кольчужный доспех +2","Качественные кольчужные штаны","Кольчужные сапоги +2","Превосходные кольчужные рубаха","Улучшить старателя","Наймите дополнительного старателя"],
                11:["Кольчужный доспех +2","Превосходные кольчужные штаны","Кольчужные сапоги +2","Превосходные кольчужные рубаха","Качественные кольчужные штаны","Улучшить старателя","Наймите дополнительного старателя"],
                12:["Кольчужный доспех +2","Превосходные кольчужные штаны","Кольчужные сапоги +2","Превосходные кольчужные рубаха","Качественные кольчужные штаны","Улучшить старателя","Наймите дополнительного старателя"],
                13:["Кольчужный доспех +2","Превосходные кольчужные штаны","Кольчужные сапоги +2","Превосходные кольчужные рубаха","Качественные кольчужные штаны","Улучшить старателя","Наймите дополнительного старателя"],
                14:["Кольчужный доспех +2","Превосходные кольчужные штаны","Нарядные кольчужные рубаха","Кольчужные сапоги +4","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                15:["Кольчужный доспех +4","Нарядные кольчужные штаны","Пестрые кольчужные рубаха","Кольчужные сапоги +4","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                16:["Кольчужный доспех +4","Пестрые кольчужные штаны","Пестрые кольчужные рубаха","Кольчужный шлем +4","Нарядные кольчужные штаны","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                17:["Кольчужный доспех +4","Пестрые кольчужные штаны","Пестрые кольчужные рубаха","Кольчужный шлем +4","Нарядные кольчужные штаны","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                18:["Кольчужный доспех +4","Пестрые кольчужные штаны","Пестрые кольчужные рубаха","Кольчужный шлем +4","Нарядные кольчужные штаны","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                19:["Кольчужный доспех +4","Пестрые кольчужные штаны","Пестрые кольчужные рубаха","Кольчужный шлем +4","Нарядные кольчужные штаны","Улучшить кузнеца","Улучшить старателя","Наймите дополнительного старателя"],
                20:[],
            },
        },
        {
            // Изготовление лат
            taskName:"Armorsmithing_Heavy",
            level: {
                0:["Hire your first Miner"],
                1:["Латные сапоги","Латная рубаха","Железный щит"],
                2:["Латный доспех","Латные штаны","Наймите дополнительного рудокопа"],
                3:["Латный доспех","Латные сапоги +1","Наймите дополнительного рудокопа"],
                4:["Латный доспех","Латные сапоги +1","Наймите дополнительного рудокопа"],
                5:["Латный доспех +1","Латные сапоги +1","Наймите дополнительного рудокопа"],
                6:["Латный доспех +1","Латные сапоги +1","Наймите дополнительного рудокопа"],
                7:["Латный доспех +1","Латные сапоги +2","Качественная латная рубаха","Стальной щит +2","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                8:["Латный доспех +2","Качественные латные штаны","Латные сапоги +2","Качественная латная рубаха","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                9:["Латный доспех +2","Качественные латные штаны","Латные сапоги +2","Качественная латная рубаха","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                10:["Латный доспех +2","Качественные латные штаны","Латные сапоги +2","Превосходная латная рубаха","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                11:["Латный доспех +2","Превосходные латные штаны","Латные сапоги +2","Превосходная латная рубаха","Качественные латные штаны","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                12:["Латный доспех +2","Превосходные латные штаны","Латные сапоги +2","Превосходная латная рубаха","Качественные латные штаны","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                13:["Латный доспех +2","Превосходные латные штаны","Латные сапоги +2","Превосходная латная рубаха","Качественные латные штаны","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                14:["Латный доспех +2","Превосходные латные штаны","Нарядная латная рубаха","Латные сапоги +4","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                15:["Латный доспех +4","Нарядные латные штаны","Пестрая латная рубаха","Латные сапоги +4","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                16:["Латный доспех +4","Пестрые латные штаны","Пестрая латная рубаха","Латный шлем +4","Нарядные латные штаны","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                17:["Латный доспех +4","Пестрые латные штаны","Пестрая латная рубаха","Латный шлем +4","Нарядные латные штаны","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                18:["Латный доспех +4","Пестрые латные штаны","Пестрая латная рубаха","Латный шлем +4","Нарядные латные штаны","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                19:["Латный доспех +4","Пестрые латные штаны","Пестрая латная рубаха","Латный шлем +4","Нарядные латные штаны","Улучшить бронника","Улучшить рудокопа","Наймите дополнительного рудокопа"],
                20:[],
            },
        },
        {
            // Обработка кожи
            taskName:"Leatherworking",
            level: {
                0:["Hire your first Skinner"],
                1:["Кожаные сапоги","Кожаная рубаха"],
                2:["Кожаный доспех","Кожаные штаны","Наймите дополнительного дубильщика"],
                3:["Кожаный доспех","Кожаные сапоги +1","Наймите дополнительного дубильщика"],
                4:["Кожаный доспех","Кожаные сапоги +1","Наймите дополнительного дубильщика"],
                5:["Кожаный доспех +1","Кожаные сапоги +1","Наймите дополнительного дубильщика"],
                6:["Кожаный доспех +1","Кожаные сапоги +1","Наймите дополнительного дубильщика"],
                7:["Кожаный доспех +1","Кожаные сапоги +2","Качественная кожаная рубаха","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                8:["Кожаный доспех +2","Качественные кожаные штаны","Кожаные сапоги +2","Качественная кожаная рубаха","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                9:["Кожаный доспех +2","Качественные кожаные штаны","Кожаные сапоги +2","Качественная кожаная рубаха","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                10:["Кожаный доспех +2","Качественные кожаные штаны","Кожаные сапоги +2","Превосходная кожаная рубаха","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                11:["Кожаный доспех +2","Превосходные кожаные штаны","Кожаные сапоги +2","Превосходная кожаная рубаха","Качественные кожаные штаны","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                12:["Кожаный доспех +2","Превосходные кожаные штаны","Кожаные сапоги +2","Превосходная кожаная рубаха","Качественные кожаные штаны","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                13:["Кожаный доспех +2","Превосходные кожаные штаны","Кожаные сапоги +2","Превосходная кожаная рубаха","Качественные кожаные штаны","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                14:["Кожаный доспех +2","Превосходные кожаные штаны","Нарядная кожаная рубаха","Кожаные сапоги +4","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                15:["Кожаный доспех +4","Нарядные кожаные штаны","Пестрая кожаная рубаха","Кожаные сапоги +4","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                16:["Кожаный доспех +4","Пестрые кожаные штаны","Пестрая кожаная рубаха","Кожаный шлем +4","Нарядные кожаные штаны","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                17:["Кожаный доспех +4","Пестрые кожаные штаны","Пестрая кожаная рубаха","Кожаный шлем +4","Нарядные кожаные штаны","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                18:["Кожаный доспех +4","Пестрые кожаные штаны","Пестрая кожаная рубаха","Кожаный шлем +4","Нарядные кожаные штаны","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                19:["Кожаный доспех +4","Пестрые кожаные штаны","Пестрая кожаная рубаха","Кожаный шлем +4","Нарядные кожаные штаны","Улучшить кожевника","Улучшить дубильщика","Наймите дополнительного дубильщика"],
                20:[],
            },
        },
        {
            // Кройка и шитье
            taskName:"Tailoring",
            level: {
                0:["Hire your first Weaver"],
                1:["Тканые сапоги","Тканая рубаха"],
                2:["Тканая мантия","Тканые штаны","Наймите дополнительного ткача"],
                3:["Тканая мантия","Тканые сапоги +1","Наймите дополнительного ткача"],
                4:["Тканая мантия","Тканые сапоги +1","Наймите дополнительного ткача"],
                5:["Тканая мантия +1","Тканые сапоги +1","Наймите дополнительного ткача"],
                6:["Тканая мантия +1","Тканые сапоги +1","Наймите дополнительного ткача"],
                7:["Тканая мантия +1","Тканые сапоги +2","Качественная тканая рубаха","Улучшить ткача","Наймите дополнительного ткача"],
                8:["Тканая мантия +2","Качественные полотняные брюки","Тканые сапоги +2","Качественная тканая рубаха","Улучшить ткача","Наймите дополнительного ткача"],
                9:["Тканая мантия +2","Качественные полотняные брюки","Тканые сапоги +2","Качественная тканая рубаха","Улучшить ткача","Наймите дополнительного ткача"],
                10:["Тканая мантия +2","Качественные полотняные брюки","Тканые сапоги +2","Превосходная тканая рубаха","Улучшить ткача","Наймите дополнительного ткача"],
                11:["Тканая мантия +2","Превосходные тканые штаны","Тканые сапоги +2","Превосходная тканая рубаха","Качественные полотняные брюки","Улучшить ткача","Наймите дополнительного ткача"],
                12:["Тканая мантия +2","Превосходные тканые штаны","Тканые сапоги +2","Превосходная тканая рубаха","Качественные полотняные брюки","Улучшить ткача","Наймите дополнительного ткача"],
                13:["Тканая мантия +2","Превосходные тканые штаны","Тканые сапоги +2","Превосходная тканая рубаха","Качественные полотняные брюки","Улучшить ткача","Наймите дополнительного ткача"],
                14:["Тканая мантия +2","Превосходные тканые штаны", "Нарядная тканая рубаха","Тканые сапоги +4","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                15:["Тканая мантия +4","Нарядные тканые штаны","Пестрая тканая рубаха","Тканые сапоги +4","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                16:["Тканая мантия +4","Пестрые тканые штаны","Пестрая тканая рубаха","Тканая шапка +4","Нарядные тканые штаны","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                17:["Тканая мантия +4","Пестрые тканые штаны","Пестрая тканая рубаха","Тканая шапка +4","Нарядные тканые штаны","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                18:["Тканая мантия +4","Пестрые тканые штаны","Пестрая тканая рубаха","Тканая шапка +4","Нарядные тканые штаны","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                19:["Тканая мантия +4","Пестрые тканые штаны","Пестрая тканая рубаха","Тканая шапка +4","Нарядные тканые штаны","Улучшить галантерейщика","Улучшить ткача","Наймите дополнительного ткача"],
                20:[],
            },
        },
        {
            // Нанесение узоров
            taskName:"Artificing",
            level: {
                0:["Hire your first Carver"],
                1:["Virtuous Symbol +1"],
                2:["Символ добродетели +1","Наймите дополнительного резчика"],
                3:["Символ добродетели +1","Наймите дополнительного резчика"],
                4:["Символ добродетели +2","Наймите дополнительного резчика"],
                5:["Символ добродетели +2","Наймите дополнительного резчика"],
                6:["Символ добродетели +2","Наймите дополнительного резчика"],
                7:["Символ добродетели +2","Наймите дополнительного резчика"],
                8:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                9:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                10:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                11:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                12:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                13:["Символ добродетели +3","Улучшить резчика","Наймите дополнительного резчика"],
                14:["Символ добродетели +4","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                15:["Символ добродетели +4","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                16:["Символ добродетели +4","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                17:["Символ добродетели +5","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                18:["Символ добродетели +5","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                19:["Символ добродетели +5","Улучшить гравера","Улучшить резчика","Наймите дополнительного резчика"],
                20:[],
            },
        },
        {
            // Изготовление оружия
            taskName:"Weaponsmithing",
            level: {
                0:["Hire your first Smelter"],
                1:["Кинжал +1"],
                2:["Кинжал +1","Наймите дополнительного плавильщика"],
                3:["Кинжал +1","Наймите дополнительного плавильщика"],
                4:["Кинжал +2","Наймите дополнительного плавильщика"],
                5:["Кинжал +2","Наймите дополнительного плавильщика"],
                6:["Кинжал +2","Наймите дополнительного плавильщика"],
                7:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                8:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                9:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                10:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                11:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                12:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                13:["Кинжал +3","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                14:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                15:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                16:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                17:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                18:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                19:["Кинжал +4","Улучшить шлифовальщика","Улучшить плавильщика","Наймите дополнительного плавильщика"],
                20:[],
            },
        },
        {
            // Алхимия
            taskName:"Alchemy",
            level: {
                0:["Hire your first Apothecary"],
                1:["Алхимические исследования","Эксперимент уровня 1",],
                2:["Алхимические исследования","Эксперимент уровня 2","Наймите дополнительного аптекаря"],
                3:["Алхимические исследования","Эксперимент уровня 3","Наймите дополнительного аптекаря"],
                4:["Алхимические исследования","Эксперимент уровня 4","Наймите дополнительного аптекаря"],
                5:["Алхимические исследования","Эксперимент уровня 5","Наймите дополнительного аптекаря"],
                6:["Алхимические исследования","Эксперимент уровня 6","Наймите дополнительного аптекаря"],
                7:["Алхимические исследования","Эксперимент уровня 7","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                8:["Исследование преобразования","Эксперимент уровня 8","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                9:["Алхимические исследования","Эксперимент уровня 9","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                10:["Исследование преобразования","Эксперимент уровня 10","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                11:["Алхимические исследования","Эксперимент уровня 11","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                12:["Алхимические исследования","Эксперимент уровня 12","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                13:["Алхимические исследования","Эксперимент уровня 13","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                14:["Алхимические исследования","Эксперимент уровня 14","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                15:["Алхимические исследования","Эксперимент уровня 15","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                16:["Алхимические исследования","Эксперимент уровня 16","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                17:["Алхимические исследования","Эксперимент уровня 17","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                18:["Алхимические исследования","Эксперимент уровня 18","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                19:["Алхимические исследования","Эксперимент уровня 19","Улучшить мастера смешивания","Улучшить аптекаря","Наймите дополнительного аптекаря"],
                20:["Эксперимент уровня 20"],
            },
        },
    ];
    // Загрузить настройки
    var settingnames = [
        {name: 'paused',              title: 'Остановить скрипт',                         def: false, type:'checkbox', tooltip:'Отключить всю автоматизацию'},
        {name: 'debug',               title: 'Включить отладку',                          def: false, type:'checkbox', tooltip:'Вывод отладочной информации на консоль', onsave: function(newValue, oldValue) {console=newValue?unsafeWindow.console||fouxConsole:fouxConsole;}},
        {name: 'disablesound',        title: 'Выключить звук',                            def: true,  type:'checkbox', tooltip:'Выключить звук веб-браузере'},
        {name: 'autoreload',          title: 'Периодическая перезагрузка',                         def: false, type:'checkbox', tooltip:'Включение этой функции будет переодически перезагружать браузер'},
        {name: 'autologin',           title: 'Автоматический вход в систему',             def: false, type:'checkbox', tooltip:'Автоматический вход в систему при потери соединения'},
        {name: 'nw_username',         title: '  Имя пользователя',                        def: '',    type:'text',     tooltip:''},
        {name: 'nw_password',         title: '  Пароль',                                  def: '',    type:'password', tooltip:''},
        {name: 'nw_charname',         title: '  Персонаж',                                def: '',    type:'text',     tooltip:''},
        {name: 'Leadership',          title: 'Лидерство........................',          def: '9',   type:'text',     tooltip:'Количество слотов для Лидерства'},
        {name: 'Armorsmithing_Med',   title: 'Плетение кольчуг..........',                def: '0',   type:'text',     tooltip:'Количество слотов для Плетение кольчуг'},
        {name: 'Armorsmithing_Heavy', title: 'Изготовление лат..........',                def: '0',   type:'text',     tooltip:'Количество слотов для Изготовление лат'},
        {name: 'Leatherworking',      title: 'Обработка кожи............',                def: '0',   type:'text',     tooltip:'Количество слотов для Обработки кожи'},
        {name: 'Tailoring',           title: 'Кройка и шитье..............',              def: '0',   type:'text',     tooltip:'Количество слотов для Кройки и шитья'},
        {name: 'Artificing',          title: 'Нанесение узоров.........',                 def: '0',   type:'text',     tooltip:'Количество слотов для Нанесения узоров'},
        {name: 'Weaponsmithing',      title: 'Изготовление оружия...',                    def: '0',   type:'text',     tooltip:'Количество слотов для Изготовления оружия'},
        {name: 'Alchemy',             title: 'Алхимия............................',       def: '0',   type:'text',     tooltip:'Количество слотов для Алхимии'},
        {name: 'optionals',           title: 'Использовать дополнительные средства',                      def: true,  type:'checkbox', tooltip:'Включите для использования Дополнительных средств в задачах'},
        {name: 'autopurchase',        title: 'Автопокупка припасов',                     def: true,  type:'checkbox', tooltip:'Автоматическое приобретение необходимых припасов из у Торговца товарами по профессиям (20 за раз)'},
        {name: 'excluderare',         title: 'Не выполнять редкие задачи',                def: true,  type:'checkbox', tooltip:'Исключить редкие задачи, чтобы избежать выбора неправильное задачи во время прокачки профессий. При отключении выбор конкретных задач может быть выполнено с указанием уровня в имени задачи (например, "4: Кожаный Доспех +1" будет выполнена только редкая задача).'},
    ];
    // Загрузите локальный кэш настроек (необеспеченные)
    var settings = {};
    for (var i = 0; i < settingnames.length; i++) {
        // Ignore label types
        if(settingnames[i].type === 'label') {
            continue;
        } 
        settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
        // call the onsave for the setting if it exists
        if(typeof(settingnames[i].onsave) === "function") {
            console.log("Вызов 'onsave' для", settingnames[i].name);
            settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
        }
    }
    
    // Настройки страницы
    var PAGES = Object.freeze({
        LOGIN : { name: "Login", path: "div#login"},
        GUARD : { name: "Account Guard", path: "div#page-accountguard"},
        CHARSELECT : { name: "Character Select", path: "div.page-characterselect"},
        FRONTPAGE : { name: "Front Page", path: "div.page-front"},
        PROFESSIONS : { name: "Professions", path: "div.page-professions"},
    });
    
    /**
     * Использовать параметры страницы, чтобы определить, какая страница отображается в данный момент
     */
    function GetCurrentPage() {
        for each(var page in PAGES) {
            if($(page["path"]).filter(":visible").length) {
                return page;
            }
        }
    }
    
    function page_DEFAULT() {
        dfdNextRun.resolve(false);
    }
    function page_LOGIN() {
        //if(!$("form > p.error:visible").length && settings["autologin"]) {
        // No previous log in error - attempt to log in
        console.log("Ввод имени пользователя");
        $("input#user").val(settings["nw_username"]);
        console.log("Ввод пароля");
        $("input#pass").val(settings["nw_password"]);
        console.log("Нажатие на кнопку Login");
        $("div#login > input").click();
        //}
        dfdNextRun.resolve(false);
    }
    function page_GUARD() {
        // Do nothing on the guard screen
        dfdNextRun.resolve(false);
    }
    function page_CHARSELECT() {
        // Выбрать персонажа если он установлен
        var charname = settings["nw_charname"];
        if(charname.length) {
            $(".char-list-name:contains('"+settings["nw_charname"]+"')").click()
        }
        dfdNextRun.resolve(false);
    }
    function page_FRONTPAGE() {
        // Перейдите на вкладку профессий
        $("a.professions").click();
        dfdNextRun.resolve(false);
    }
    function page_PROFESSIONS() {
        // Выключить звук
        if(settings["disablesound"]) {
            unsafeWindow.client.sounds.toggle(false);
        }
        
        // Перейти отслеживанию страницы
        $("a.professions-overview").click();
        WaitForState("").done(function() {
            // Отслеживаемые кнопки
            var completedSlotButtons = $("div.panel-content button").filter(":contains('Забрать результат')").filter(":visible");
            var openSlotButtons = $("div.panel-content button").filter(":contains('Выбрать поручение')").filter(":visible");
            
            // Проверить если есть какие-либо завершенные задачи
            if(completedSlotButtons.length) {
                completedSlotButtons[0].click();
                WaitForState("div.professions-rewards-modal button:contains('Забрать результат')").done(function() {
                    $("div.professions-rewards-modal button:contains('Забрать результат')").click();
                    WaitForState("").done(function() {
                        dfdNextRun.resolve(true);
                    });
                });
            }
            // Проверить если есть какие-либо пустые слоты
            else if(openSlotButtons.length) {
                var foundTask = false;
                // Не переходить на выбор задачи пока соответствующие слоты используются
                for (var i = 0; i < tasklist.length; i++) {
                    var currentTasks = $("div.professions-slot-icon." + tasklist[i].taskName);
                    if(currentTasks.length < settings[tasklist[i].taskName]) {
                        foundTask = true;
                        openSlotButtons[0].click();
                        WaitForState("div#content_professions:visible").done(function() {
                            // Переключиться на правильный тип
                            $("a.professions-" + tasklist[i].taskName).click();
                            WaitForState("").done(function() {
                                createNextTask(tasklist[i], 0, dfdNextRun);
                            });
                        });
                        break;
                    }
                }
                if(!foundTask) {
                    console.log("Все слоты заполнены");
                    dfdNextRun.resolve(false);
                }
            }
                else {
                    dfdNextRun.resolve(false);
                }
        });
    }
    
    /**
     * Iterative approach to finding the next task to assign to an open slot.
     *
     * @param {Array} list The list of task names to try in order of precedence
     * @param {int} i The current attempt number. Will try to find the i'th task.
     * @param {Deferred} dff The deffered object to resolve when a task is found or if all tasks were not found
     */
    function createNextTask(prof, i, dff) {
        // Check level
        var level = parseInt($("a.professions-"+prof.taskName).closest("span").prevAll("div:first").find("span").text());
        console.log(prof.taskName, "уровень", level);
        var list = prof.level[level];
        console.log("Выбрать новую задачу", list.length, i);
        if(list.length <=i) {
            console.log("Ничего не найдено");
            dff.resolve(false);
            return;
        }
        
        var taskName = list[i];
        console.log("Поиск задачи:", taskName);
        var task = SearchForTaskByName(taskName, prof.taskName);
        if(task == null) {
            console.log("Пропустить выбор задачи для покупки ресурсов");
            dff.resolve(false);
            return;
        }
        if(task) {
            console.log('Задача найдена');
            task.click();
            WaitForState("div.page-professions-taskdetails").done(function() {
                // Click all buttons and select an item to use in the slot
                var def = $.Deferred();
                var buttonList = $("h3:contains('Дополнительные средства:')").closest("div").find("button");
                if(buttonList.length && settings["optionals"]) {
                    SelectItemFor(buttonList, 0, def, prof);
                }
                else {
                    def.resolve();
                }
                def.done(function() {
                    // All items are populated
                    console.log("Items Populated");
                    // Нажать кнопку Начать поручение
                    // Нажать на кнопку Начать поручение, если она активна
                    var enabledButton = $("div.footer-body > div.input-field.button:not('.disabled') > button:contains('Начать поручение')");
                    if(enabledButton.length) {
                        console.log("Нажатие кнопка Начать поручение");
                        enabledButton.click();
                        WaitForState("").done(function() {
                            // Выполнено
                            dff.resolve(true);
                        });
                    }
                    else { // Кнопка не активна, что необходимо было, вероятно, отсутствует
                        // Вернутья назад
                        $("div.footer-body > div.input-field.button > button:contains('Назад')").click();
                        WaitForState("").done(function() {
                            // Перейти к следующей задачи в списке
                            console.log('Поиск следующей задачи');
                            createNextTask(prof, i+1, dff);
                        });
                    }
                });
            });
        }
        else {
            console.log('Поиск следующей задачи');
            createNextTask(prof, i+1, dff);
        }
    }
    /**
     * Selects the highest level asset for the i'th button in the list. Uses an iterative approach
     * in order to apply a sufficient delay after the asset is assigned
     *
     * @param {Array} The list of buttons to use to click and assign assets for
     * @param {int} i The current iteration number. Will select assets for the i'th button
     * @param {Deferred} jQuery Deferred object to resolve when all of the assets have been assigned
     */
    function SelectItemFor(buttonListIn, i, def, prof) {
        buttonListIn[i].click();
        WaitForState("").done(function() {
            var specialItems = $("div.modal-item-list a.Special");
            var goldItems = $("div.modal-item-list a.Gold");
            var silverItems = $("div.modal-item-list a.Silver");
            var bronzeItems = $("div.modal-item-list a.Bronze");
            var clicked = false;
            
            // Try to avoid using up higher rank assets needlessly Старайтесь избегать использования до более высокого ранга активы неоправданно
            if(prof.taskName === "Leadership") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Пехотинец')");
                var guards = $("div.modal-item-list a.Bronze:contains('Странник')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Герой')");
                
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                    else if(footmen.length) { clicked = true; footmen[0].click(); }
                    }
            // TODO: add remaining professions in the same way for bronze tier assets.
            
            if (!clicked) {
                // Click the highest slot
                if(specialItems.length)     { specialItems[0].click(); }
                else if(goldItems.length)   { goldItems[0].click(); }
                    else if(silverItems.length) { silverItems[0].click(); }
                    else if(bronzeItems.length) { bronzeItems[0].click(); }
                        else { $("button.close-button").click(); }
            }
            
            console.log("Clicked item");
            WaitForState("").done(function() {
                // Get the new set of select buttons created since the other ones are removed when the asset loads
                var buttonList = $("h3:contains('Дополнительные средства:')").closest("div").find("button");
                if(i < buttonList.length - 1) {
                    SelectItemFor(buttonList, i+1, def, prof);
                }
                else {
                    // Let main loop continue
                    def.resolve();
                }
            });
        });
    }
    /**
     * Given a task name and that the search pane is active, will attempt to search for the given task
     * and return the button element if the level and resource criteria are met.
     *
     * @param {String} taskname The name of the task to search within the search pane for
     */
    function SearchForTaskByName(taskname, profName) {
        var tasklevel = 0;
        if(taskname.indexOf(":") > -1) {
            // split task with level requirement
            tasklevel=taskname.split(":",2)[0];
            taskname=taskname.split(":",2)[1];
        }
        // Filter the results
        var filterDiv = $("div#tasklist_filter input");
        console.log("Searching for:", taskname);
        filterDiv.val(taskname);
        filterDiv.keyup();
        
        // Find the result
        var taskTitle = $("table#tasklist tr h4 span").filter(function() {
            return $(this).text() === taskname;
        });
        if(taskTitle.length) {
            for (var i = 0; i < taskTitle.length; i++) {
                if($(taskTitle[i]).closest("div.rare").length && profName != "Leadership" && settings["excluderare"]) {
                    // Avoid rare tasks unless profession is Leadership
                    console.log("Avoiding rare craft: ", taskname);
                }
                else if($(taskTitle[i]).closest("div.higherlevel").length) {
                    // Too high level
                    console.log("Task level is too high: ", taskname);
                }
                else if(tasklevel > 0 && $(taskTitle[i]).closest("div").find("span.level-pip").text() != tasklevel) {
                    // Task level doesn't match
                    console.log("Task level does not match requirement: ", taskname, tasklevel);
                }
                else if($(taskTitle[i]).closest("div.unmet").length) {
                    // Check for required ingredients
                    console.log("Checking for craftable ingredients for", taskname);
                    var requires = $(taskTitle[i]).closest("div.unmet").find("div.task-requirements div.icon-slot.red").filter("[data-tt-item]");
                    for (var j = 0; j < requires.length; j++) {
                        var ingName = $(requires[j]).attr("data-tt-item");
                        console.log("Found", ingName);
                        var searchStr = ingName;
        
                        // Specify task search string depending on type of ingredient required
                        // Add here any ingredient types you want to check tasks for
                        
                        // Resources
                        if     (ingName.indexOf("Resource_Charcoal")         > -1
                             || ingName.indexOf("Resource_Rocksalt")         > -1
                             || ingName.indexOf("Resource_Spool_Thread")     > -1
                             || ingName.indexOf("Resource_Porridge")         > -1
                             || ingName.indexOf("Resource_Solvent")          > -1
                             || ingName.indexOf("Resource_Brimstone")        > -1
                             || ingName.indexOf("Resource_Coal")             > -1
                             || ingName.indexOf("Resource_Moonseasalt")      > -1
                             || ingName.indexOf("Resource_Quicksilver")      > -1
                             || ingName.indexOf("Resource_Spool_Threadsilk") > -1) {
                            if (settings["autopurchase"]) {
                                BuyResource(ingName);
                                return null;
                            }
                            else {
                                console.log("Auto resource purchasing disabled");
                                continue;
                            }
                        }
                        
                        else if(ingName.indexOf("Resource_Wood_Carved")      > -1
                             || ingName.indexOf("Resource_Ornaments")        > -1
                             || ingName.indexOf("Resource_Weapon")           > -1) { searchStr = "Craft"; }
                        else if(ingName.indexOf("Resource_Pelt")             > -1
                             || ingName.indexOf("Resource_Wood")             > -1
                             || ingName.indexOf("Resource_Ore")              > -1
                             || ingName.indexOf("Resource_Clothscraps")      > -1) { searchStr = "Gather"; }
                        else if(ingName.indexOf("Resource_Leather")          > -1) { searchStr = "Cure Pelt"; }
                        else if(ingName.indexOf("Resource_Rings")            > -1) { searchStr = "Forge Ring"; }
                        else if(ingName.indexOf("Resource_Clothbolt")        > -1) { searchStr = "Weave Cloth"; }
                        else if(ingName.indexOf("Resource_Ingot")            > -1) { searchStr = "Forge Plate"; }
                        
                        // Alchemy
                        else if(ingName.indexOf("Aquavitae")                 > -1) { searchStr = "Aqua Vitae"; }
                        else if(ingName.indexOf("Aquaregia")                 > -1) { searchStr = "Aqua Regia"; }
                        else if(ingName.indexOf("Vitriol")                   > -1) { searchStr = "Vitriol Extraction"; }
                        else if(ingName.indexOf("Potion")                    > -1) { searchStr = ingName.replace(/Potion_/,"").replace(/_[0-9]+$/,""); }
                        
                        // Shirts
                        else if(ingName.indexOf("Chain_Shirt")               > -1) { searchStr = "Chain Shirt"; }
                        else if(ingName.indexOf("Scale_Shirt")               > -1
                             || ingName.indexOf("Med_Armorsmithing_Shirt")   > -1) { searchStr = "Scale Shirt"; }
                        else if(ingName.indexOf("Shirt")                     > -1) { searchStr = "Shirt"; }
                        
                        // Pants
                        else if(ingName.indexOf("Chain_Pants")               > -1) { searchStr = "Chain Pants"; }
                        else if(ingName.indexOf("Scale_Pants")               > -1
                             || ingName.indexOf("Med_Armorsmithing_Pants")   > -1) { searchStr = "Scale Pants"; }
                        else if(ingName.indexOf("Pants")                     > -1) { searchStr = "Pants"; }

                        // Armor
                        else if(ingName.indexOf("T1_Chain_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Chain_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Chain_Armor")               > -1) { searchStr = "Chain Armor"; }
                        else if(ingName.indexOf("T1_Scale_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Scale_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Scale_Armor")               > -1) { searchStr = "Scale Armor"; }
                        else if(ingName.indexOf("T1_Cloth_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Cloth_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Cloth_Armor")               > -1) { searchStr = "Cloth Robes"; }
                        else if(ingName.indexOf("T1_Leather_Armor")          > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Leather_Armor")          > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Leather_Armor")             > -1) { searchStr = "Leather Armor"; }
                        else if(ingName.indexOf("T1_Plate_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Plate_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Plate_Armor")               > -1) { searchStr = "Plate Armor"; }

                        // Helms
                        else if(ingName.indexOf("Chain_Helm")                > -1) { searchStr = "Chain Helm"; }
                        else if(ingName.indexOf("Med_Armorsmithing_T2_Helm") > -1) { searchStr = "Scale Helm"; }
                        else if(ingName.indexOf("Tailoring_T2_Helm")         > -1) { searchStr = "Cloth Cap"; }
                        else if(ingName.indexOf("Helm")                      > -1) { searchStr = "Helm"; }

                        // Arms
                        else if(ingName.indexOf("T1_Chain_Gloves")           > -1) { searchStr = "Chain Gloves +1"; }
                        else if(ingName.indexOf("T2_Chain_Gloves")           > -1) { searchStr = "Chain Gloves +2"; }
                        else if(ingName.indexOf("Chain_Gloves")              > -1) { searchStr = "Chain Gloves"; }
                        else if(ingName.indexOf("T1_Scale_Gloves")           > -1) { searchStr = "Scale Gauntlets +1"; }
                        else if(ingName.indexOf("T2_Scale_Gloves")           > -1) { searchStr = "Scale Gauntlets +2"; }
                        else if(ingName.indexOf("Scale_Gloves")              > -1) { searchStr = "Scale Gauntlets"; }
                        else if(ingName.indexOf("T1_Cloth_Gloves")           > -1) { searchStr = "Cloth Sleeves +1"; }
                        else if(ingName.indexOf("T2_Cloth_Gloves")           > -1) { searchStr = "Cloth Sleeves +2"; }
                        else if(ingName.indexOf("Cloth_Gloves")              > -1) { searchStr = "Cloth Sleeves"; }
                        else if(ingName.indexOf("T1_Leather_Gloves")         > -1) { searchStr = "Leather Gloves +1"; }
                        else if(ingName.indexOf("T2_Leather_Gloves")         > -1) { searchStr = "Leather Bracers +2"; }
                        else if(ingName.indexOf("Leather_Gloves")            > -1) { searchStr = "Leather Bracers"; }
                        else if(ingName.indexOf("T1_Plate_Gloves")           > -1) { searchStr = "Plate Gauntlets +1"; }
                        else if(ingName.indexOf("T2_Plate_Gloves")           > -1) { searchStr = "Plate Gauntlets +2"; }
                        else if(ingName.indexOf("Plate_Gloves")              > -1) { searchStr = "Plate Gauntlets"; }

                        // Boots
                        else if(ingName.indexOf("T1_Chain_Boots")            > -1) { searchStr = "Chain Boots +1"; }
                        else if(ingName.indexOf("T2_Chain_Boots")            > -1) { searchStr = "Chain Boots +2"; }
                        else if(ingName.indexOf("Chain_Boots")               > -1) { searchStr = "Chain Boots"; }
                        else if(ingName.indexOf("T1_Scale_Boots")            > -1) { searchStr = "Scale Boots +1"; }
                        else if(ingName.indexOf("T2_Scale_Boots")            > -1) { searchStr = "Scale Boots +2"; }
                        else if(ingName.indexOf("Scale_Boots")               > -1) { searchStr = "Scale Boots"; }
                        else if(ingName.indexOf("T1_Cloth_Boots")            > -1) { searchStr = "Cloth Boots +1"; }
                        else if(ingName.indexOf("T2_Cloth_Boots")            > -1) { searchStr = "Cloth Boots +2"; }
                        else if(ingName.indexOf("Cloth_Boots")               > -1) { searchStr = "Cloth Boots"; }
                        else if(ingName.indexOf("T1_Leather_Boots")          > -1) { searchStr = "Leather Boots +1"; }
                        else if(ingName.indexOf("T2_Leather_Boots")          > -1) { searchStr = "Leather Boots +2"; }
                        else if(ingName.indexOf("Leather_Boots")             > -1) { searchStr = "Leather Boots"; }
                        else if(ingName.indexOf("T1_Plate_Boots")            > -1) { searchStr = "Plate Boots +1"; }
                        else if(ingName.indexOf("T2_Plate_Boots")            > -1) { searchStr = "Plate Boots +2"; }
                        else if(ingName.indexOf("Plate_Boots")               > -1) { searchStr = "Plate Boots"; }

                        // Daggers
                        else if(ingName.indexOf("T2_Dagger_3")               > -1) { searchStr = "Dagger +3"; }
                        else if(ingName.indexOf("T2_Dagger_2")               > -1) { searchStr = "Dagger +2"; }
                        else if(ingName.indexOf("T1_Dagger_1")               > -1) { searchStr = "Dagger +1"; }

                        // Icons
                        else if(ingName.indexOf("T3_Icon_Virtuous_4")        > -1) { searchStr = "Virtuous Icon +4"; }
                        else if(ingName.indexOf("T2_Icon_Virtuous_3")        > -1) { searchStr = "Virtuous Icon +3"; }
                        else if(ingName.indexOf("T1_Icon_Virtuous_2")        > -1) { searchStr = "Virtuous Icon +2"; }
                        else if(ingName.indexOf("T1_Icon_Virtuous_1")        > -1) { searchStr = "Virtuous Icon +1"; }

                        // Shields
                        else if(ingName.indexOf("T2_Shield")                 > -1) { searchStr = "Steel Shield"; }
                        else if(ingName.indexOf("T1_Shield")                 > -1) { searchStr = "Iron Shield"; }
            
                        else {
                            console.log("Found unhandled ingredient", ingName);
                            continue;
                        }
        
                        console.log("Searching for tasks for:", searchStr);
                        filterDiv.val(searchStr);
                        filterDiv.keyup();
                        // Find the ingredient task
                        var ingTaskIcon = $("table#tasklist div.task-rewards div.icon-slot").filter(function() {
                            return $(this).attr("data-tt-item") === ingName;
                        });
        
                        // Check ingredient task for requirements and return task if valid
                        if (ingTaskIcon.length) {
                            for (var k = 0; k < ingTaskIcon.length; k++) {
                                var ingTitle = $($(ingTaskIcon[k]).closest("div.task-list-entry").find("h4 span")).text();
                                
                                console.log("Found ingredient task",ingTitle);
                                // Skip batch potion tasks
                                if(ingTitle.indexOf("Batch ") == 0) { continue; }
                                // Skip mass production tasks
                                if(ingTitle.indexOf("Mass ") == 0) { continue; }
                                // Skip deep gathering tasks
                                if(ingTitle.indexOf("Deep ") == 0) { continue; }
                                // Skip intensive gathering tasks
                                if(ingTitle.indexOf("Intensive ") == 0) { continue; }
                                
                                // Search for correct level task for same named Artificing gather tasks
                                if(ingTitle.indexOf("Gather Ore and Wood") > -1 || ingTitle.indexOf("Craft Ornamental metal and Carved Wood") > -1) {
                                    if     (ingName.indexOf("_T1") > -1) { ingTitle = "1:" + ingTitle }
                                    else if(ingName.indexOf("_T2") > -1) { ingTitle = "7:" + ingTitle }
                                    else if(ingName.indexOf("_T3") > -1) { ingTitle = "14:" + ingTitle }
                                }
                                
                                var ingTask = SearchForTaskByName(ingTitle, profName);
                                console.log("Requesting required ingredient task", ingTitle);
                                return ingTask;
                            }
                        }
                        else { console.log("No ingredient tasks available:", taskname); }
                    }
                    
                    // Not enough resources
                    console.log("Not enough resources:", taskname);
                }
                else {
                    return $(taskTitle[i]).closest("tr").find("button");
                }
            }
            console.log("No valid tasks found:", taskname);
        }
        return false;
    }
    
    /**
     * Will buy a given purchasable resource
     *
     * @param {String} item The data-tt-item id of the Resource to purchase
     */
    function BuyResource(item) {
        console.log("Purchasing resources:", item);
        // Switch to overview
        $("a.professions-overview").click();
        WaitForState("").done(function() {
            // Enter resource shop
            $("button").filter(function() { return $(this).attr("data-url") === "/professions/vendor"; }).click();
            WaitForState("ul.vendor-group.resources li.vendor-entry div").done(function() {
                // Get shop section for required item
                var shopItem = $("ul.vendor-group.resources li.vendor-entry div").filter(function() {
                    return $(this).attr("data-tt-item") === item;
                }).closest("li");
                shopItem.find("button").click();
                WaitForState("input[name='inventoryBuyQty']").done(function() {
                    // Set purchase amount to 20 and buy
                    $("input[name='inventoryBuyQty']").val(20);
                    $("button:contains('OK')").click();
                    console.log("Resources purchased");
                    // Close the notification that never times out
                    WaitForState("button.closeNotification").done(function() {
                        $("button.closeNotification").click();
                    });
                });
            });
        });
    }
    
    /**
     * Waits for the loading symbol to be hidden.
     *
     * @return {Deferred} A jQuery defferred object that will be resolved when loading is complete
     */
    function WaitForLoad() {
        return WaitForState("");
    }
    /**
     * Creates a deferred object that will be resolved when the state is reached
     *
     * @param {string} query The query for the state to wait for
     * @return {Deferred} A jQuery defferred object that will be resolved when the state is reached
     */
    function WaitForState(query) {
        var dfd = $.Deferred();
        window.setTimeout(function() {AttemptResolve(query, dfd);}, delayShort); // Doesn't work without a short delay
        return dfd;
    }
    /**
     * Will continually test for the given query state and resolve the given deferred object when the state is reached
     * and the loading symbol is not visible
     *
     * @param {string} query The query for the state to wait for
     * @param {Deferred} dfd The jQuery defferred object that will be resolved when the state is reached
     */
    function AttemptResolve(query, dfd) {
        if((query === "" || $(query).length) && $("div.loading-image:visible").length == 0) {
            dfd.resolve();
        }
        else {
            window.setTimeout(function() {AttemptResolve(query, dfd);}, delayShort); // Try again in a little bit
        }
    }
    
    /**
     * Основной цикл процесса:
     * - Определить на каких страницах вызывать специфическую логику
     * - Когда обработка завершена, вызвать снова с задержкой
     *   - Использовать короткий таймер, когда что-то изменилось в последний раз через
     *   - Использовать большой таймер при ожидании завершения задачи
     */
    function process() {
        // Убедиться что кнопка настроек существует
        addSettings();
        
        // Проверить остановку скрипта
        if(settings["paused"]) {
            // Просто продолжить позже - процесс по прежнему работает и ничего не делает, пока не будет выключена пауза
            var timerHandle = window.setTimeout(function() {process();}, delay);
            return;
        } 
        
        // Проверить на наличие ошибок
        if($("title").text() == "Error" && settings["autologin"]) {
            console.log("Error detected - relogging");
            unsafeWindow.location.href = "http://gateway.nw.ru.perfectworld.eu";
            return;
        }
        
        // Проверить если загрузка занимает больше времени, чем таймер перезагрузки страницу
        if( $("div.loading-image:visible").length ){
            var loadingTimerHandle = window.setTimeout(function() {
                if( $("div.loading-image:visible").length ){
                    console.log("Loading timeout reached. Reloading gateway");
                    unsafeWindow.location.href = "http://gateway.nw.ru.perfectworld.eu";
                }
            },loadingTimer);
        }
        
        // Проверить неоходимость перезагрузки
        if(reloadNeeded && settings["autologin"] && settings["autoreload"]) {
            console.log("Перезагрузка портала");
            unsafeWindow.location.href = "http://gateway.nw.ru.perfectworld.eu/";
            reloadNeeded = false;
            return;
        } 
        
        // Проверить что портал отключился
        if(window.location.href.indexOf("gatewaysitedown") > -1) {
            // После задержки перезагружить сайт
            console.log("Gateway down detectedОбнаружено отключение портала - перезагрузка через " + (longDelay/1000) + " секунд");
            window.setTimeout(function() {unsafeWindow.location.href = "http://gateway.nw.ru.perfectworld.eu";}, longDelay);
            return;
        }
        
        // Определить какая страница отображается
        var currentPage = GetCurrentPage();
        if(currentPage == PAGES.LOGIN)       { page_LOGIN();       }
        else if(currentPage == PAGES.GUARD)       { page_GUARD();       }
            else if(currentPage == PAGES.CHARSELECT)  { page_CHARSELECT();  }
            else if(currentPage == PAGES.FRONTPAGE)   { page_FRONTPAGE();   }
                else if(currentPage == PAGES.PROFESSIONS) { page_PROFESSIONS(); }
                else                                      { page_DEFAULT();     }
        
        // Продолжить позже
        dfdNextRun.done(function(useShortDelay) {
            dfdNextRun = $.Deferred();
            timerHandle = window.setTimeout(function() {process();}, useShortDelay===true?delayShort:delay);
            if(!reloadTimerHandle) {
                reloadTimerHandle = window.setTimeout(function() { reloadNeeded = true; }, reloadDelay);
            }
        });
    }
    
    function addSettings() {
        if($("#settingsButton").length)
            return;
        // Добавить CSS таблицу
        AddCss("\
#settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
#pauseButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 23px; top: 0px; padding: 3px; z-index: 1000;}\
#settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; right: 0px; top: 0px; width: 350px; font: 12px sans-serif; text-align: left; display: block; z-index: 1000;}\
#settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
#settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
#settingsPanel label.purple {font-weight:bold;color:#7C37F6}\
#settingsPanel label.blue {font-weight:bold;color:#007EFF}\
#settingsPanel label.green {font-weight:bold;color:#8AFF00}\
#settingsPanel label.white {font-weight:bold;color:#FFFFFF}\
");
        
        // Добавить панель настроек в тело страницы
        $("body").append(
            '<div id="settingsPanel">\
<div id="settings_title">\
<img src='+image_prefs+' style="float: left; vertical-align: text-bottom;"\>\
<img id="settings_close" src='+image_close+' title="Скрыть настройки" style="float: right; vertical-align: text-bottom; cursor: pointer; display: block;"\>\
<span style="margin:3px">Настройки</span>\
</div>\
<form style="margin: 0px; padding: 0px">\
<ul style="list-style: none outside none; max-height: 500px; overflow: auto; margin: 3px; padding: 0px;">\
</ul>\
</form>\
</div>'
        );
        
        // Добавить все поля ввода
        var settingsList = $("#settingsPanel form ul");
        for (var i=0;i<settingnames.length;i++) {
            var id = 'settings_' + settingnames[i].name;
            var indent = countLeadingSpaces(settingnames[i].title) * 2;
            switch(settingnames[i].type) {
                case "checkbox":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><input style="margin:4px" name="'+id+'" id="'+id+'" type="checkbox" /><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>')
                    $('#'+id).prop('checked', settings[settingnames[i].name]);
                    break;
                case "text":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "password":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="password" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "select":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" style="padding-left:4px" for="'+id+'">'+settingnames[i].title+'</label><select style="margin:4px" name="'+id+'" id="'+id+'" /></li>')
                    var options = settingnames[i].opts;
                    var select = $('#'+id);
                    for(var j=0;j<options.length;j++) {
                        if(settings[settingnames[i].name] == options[j].path)
                            select.append('<option value="'+options[j].path+'" selected="selected">'+options[j].name+'</option>');
                        else 
                            select.append('<option value="'+options[j].path+'">'+options[j].name+'</option>');
                    }
                    break;
                case "label":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em;><label class="'+settingnames[i].class+'">'+settingnames[i].title+'</label></li>')
                    break; 
            }
        }
        // Добавить кнопки сохранить/отмена на панель
        $("#settingsPanel form").append('\
<div id="settingsPanelButtonContainer">\
<input id="settings_save" type="button" value="Сохранить и применить">\
<input id="settings_close" type="button" value="Закрыть">\
</div>');
        
        // Добавить кнопку настроек на страницу
        $("body").append('<div id="settingsButton"><img src="'+image_prefs+'" title="Показать настройки" style="cursor: pointer; display: block;"></div>');
        
        // Добавить кнопку паузы на страницу
        $("body").append('<div id="pauseButton"><img src="'+(settings["paused"]?image_play:image_pause)+'" title="'+(settings["paused"]?"Продолжить":"Остановить")+' выполнение скрипта" style="cursor: pointer; display: block;"></div>');
        
        // Добавить JavaScript
        $("#settingsPanel").hide();
        $("#settingsButton").click(function() {
            $("#settingsButton").hide();
            $("#pauseButton").hide();
            $("#settingsPanel").show();
        });
        $("#settings_close,settings_cancel").click(function() {
            $("#settingsButton").show();
            $("#pauseButton").show();
            $("#settingsPanel").hide();
        });
        $("#pauseButton").click(function() {
            settings["paused"] = !settings["paused"]
            GM_setValue("paused", settings["paused"]);
            $("#settings_paused").prop("checked", settings["paused"]);
            $("#pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
            $("#pauseButton img").attr("title",(settings["paused"]?"Продолжить":"Остановить")+" выполнение скрипта");
        });
        
        // Использовать setTimeout чтобы обойти проблемы с разрешениями при вызове функций GM от главного окна
        $("#settings_save").click(function() { setTimeout(function() { SaveSettings();}, 0)});
    }
    
    function SaveSettings() {
        // Получить каждое значение из пользовательского интерфейса
        for (var i=0;i<settingnames.length;i++) {
            var name = settingnames[i].name;
            var el = $('#settings_' + name);
            var value = false;
            switch(settingnames[i].type) {
                case "checkbox":
                    value = el.prop("checked");
                    break;
                case "text":
                    value = el.val();
                    break;
                case "password":
                    value = el.val();
                    break;
                case "select":
                    value = el.val();
                    break;
                case "label": // Labels don't have values
                    continue;
            }
            if(typeof(settingnames[i].onsave) === "function") {
                console.log("Calling 'onsave' for", name);
                settingnames[i].onsave(value, settings[name]);
            }
            settings[name] = value; // Сохранить в локальном кэше
            GM_setValue(name, value); // Сохранить в GM кэш
        }
        // Закрыть панель
        $("#settingsButton").show();
        $("#pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
        $("#pauseButton img").attr("title",(settings["paused"]?"Продолжить":"Остановить")+" выполнение скрипта");
        $("#pauseButton").show();
        $("#settingsPanel").hide();
    }
    
    // Добавить кнопку настройки и запустить таймер процесса
    addSettings();
    timerHandle = window.setTimeout(function() {process();}, delayShort);
})();