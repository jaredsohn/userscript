// ==UserScript==
// @namespace       heroeswm
// @name            HWM Transfers
// @description     Помощь в протоколе игрока.
// @version         0.8.5
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_listValues 
// @grant           GM_info 
// @grant           GM_log  
// @grant           GM_xmlhttpRequest
// @include         http://www.heroeswm.ru/pl_transfers.php*
// @require         http://code.jquery.com/jquery.min.js
// @require         ../module/purl.js
// @require         lib/libString.js
// @require         lib/libTime.js
// @require         lib/libXpath.js
// @require         lib/libGreaseMonkey.js
// @require         lib/libUserScriptGUI.js
// @require         lib/libTransfers.js
// ==/UserScript==


// Создаем интерфейс
if (window === top) {
    
    var desc = {
        'details':
              '<ul>'
            + '<li>Пока нализ работает только для купли/продажи артефактов через аукцион.</li>'
            + '<li>Для запуска анализа воспользуйтесь кнопкой "Анализировать" в правом верхнем углу.</li>'
            + '</ul>',
        'homepage': {'title': 'userscripts.org', 'link': 'http://userscripts.org/users/362572/scripts'},
        'author': {'title': 'hotamateurxxx', 'link': 'http://userscripts.org/users/hotamateurxxx'},
        'updated': '2013.01.22'
    };
    
    var conf = {
        'disabled': {'type': 'bool', 'title': 'Отключение', 'def': false, 'desc': 'Отключение работы скрипта.'},
        'maxDepth': {'title': 'Глубина', 'def': 0, 'desc': 'Дополнительная глубина отображаемого лога в страницах.'},
        'timeBegin': {'title': 'Начальная дата', 'desc': 'Дополнительная фильтрация по датам. Начальный штамп даты в формате "ДД-ММ-ГГ".'},
        'timeEnd': {'title': 'Конечная дата', 'desc': 'Дополнительная фильтрация по датам. Конечный штамп даты в формате "ДД-ММ-ГГ".'},
    }
    
    var gui = UserScriptGUI(document);
    gui.createDefaultSet(desc, conf);
    
}


/** Разбор страницы транзакций
* @global Document document
* @param Document doc
* @param Number playerId
* @param Number pageId
* @param Number maxDepth
* @param Number depth
* @param Date timeBegin
* @param Date timeEnd
* @param Array trans
*/
function parseTransfers(doc, playerId, pageId, maxDepth, depth, timeBegin, timeEnd, trans) {
    
    /** Проверяет наличие следующей страницы
    * @param Document doc
    * @param Number pageId
    */
    function getMaxPageId(doc) {
        try {
            var xpath = '/html/body/center/table/tbody/tr/td/center[2]';
            var center = XPath.findFirst(xpath, doc); 
            var b = center.getElementsByTagName('b')[0];
            var links = center.getElementsByTagName('a');
            var res = /&page=(\d+)/ig.exec(links[links.length - 1].href);
            return Math.max(parseInt(res[1]), parseInt(b.textContent) - 1);
        } catch (e) {
            return 0;
        }
    }    
    
    /** Отмечает страницу как загруженную
    * @param Document doc
    * @param Number pageId
    */
    function markPageLoaded(doc, pageId) {
        var xpath = '/html/body/center/table/tbody/tr/td/center[2]';
        var links = XPath.findFirst(xpath, doc).getElementsByTagName('a');
        for (var i = 0; i < links.length; i++)
            if (links[i].textContent == pageId + 1) {
                links[i].innerHTML = '<font color="red">' + links[i].textContent + '</font>';
            }
    }
    
    /** Обработчик загрузки дополнительной страницы
    * @param Object resp
    */
    function onPageLoad(resp) {
        //GM_log(Time.toString() + ' Загружена дополнительная страница протокола транзакций №' + nextPageId + ' (' + (depth + 1) + '/' + maxDepth + ').');
        //GM_log('topDocument == ' + topDocument);
        
        var parser = new DOMParser();
        var doc = parser.parseFromString(resp.responseText, 'text/html');
        Transfers.importRecords(topDocument, doc);
        
        // Помечаем страницу как загруженную
        markPageLoaded(topDocument, nextPageId);
        
        // Разбираем следущую страницу
        parseTransfers(doc, playerId, pageId, maxDepth, depth + 1, timeBegin, timeEnd, trans);
    }
    
    
    //GM_log(Time.toString() + ' getPage(' + playerId + ', ' + pageId + ', ' + maxDepth + ', ' + depth + ')');
    
    var nextPageId = pageId + depth + 1;
    var maxPageId = getMaxPageId(doc);
    var maxPageId = Math.min(pageId + maxDepth, maxPageId);
    var nextUrl = 'http://' + topDocument.location.hostname + '/pl_transfers.php?id=' + playerId + '&page=' + nextPageId;
    
    
    // Парсим документ
    if (trans === undefined)
        trans = [];
    trans = trans.concat(Transfers.parseDoc(doc));
    var transMaxTime = trans[trans.length - 1].time;
    transe = Transfers.transFilter(trans, timeBegin, timeEnd);
    
    // Выводим в лог результаты анализа
    //var str = String.fromObjects(trans, undefined, undefined, ['playerId', 'lotId']);
    //GM_log(Time.toString() + ' Протокол пользователя:\n' + str);

    
    try {
        
        if (timeEnd !== undefined)
            if (transMaxTime < timeEnd)
                throw new Error('timeEnd');
        
        if (nextPageId > maxPageId)
            throw new Error('maxPageId');
        
        // Загружаем дополнительную страницу
        GreaseMonkey.xmlhttpRequest({method: 'GET', url: nextUrl, onload: onPageLoad});        
        
    } catch (e) {
        
        // Группируем транзакции
        var groups = Transfers.calcGroups(trans);
        
        // Считаем статистику торговли артефактами
        var artStats = Transfers.calcArtStats(groups);
        
        // Выводим статистику в лог
        Transfers.logArtStats(
            artStats, 
            Transfers.getDocPlayer(topDocument),
            trans[0].time, 
            trans[trans.length - 1].time
        );
        
    }
    
}


var disabled = GM_getValue('disabled', false);
if (!disabled) {
    
    // Кнопка начала анализа
    if (window === top) {
    
        var bParse = gui.createMenuButton(['Parse'], 'Анализировать');
        bParse.click(function() {
            
            topDocument = document;
            var maxDepth = parseInt(GM_getValue('maxDepth', 0));
            
            var res = /0?(\d+)-0?(\d+)-(\d+)/ig.exec(GM_getValue('timeBegin', ''));
            var timeBegin = (res !== null) ? new Date(2000 + parseInt(res[3]), parseInt(res[2]) - 1, parseInt(res[1])) : undefined;
            
            var res = /0?(\d+)-0?(\d+)-(\d+)/ig.exec(GM_getValue('timeEnd', ''));
            var timeEnd = (res !== null) ? new Date(2000 + parseInt(res[3]), parseInt(res[2]) - 1, parseInt(res[1])) : undefined;
            
            // Извлекаем playerId и pageId
            var url = topDocument.location.href;
            var res = /\?id=(\d+)/ig.exec(url);
            var playerId = parseInt(res[1]);
            var res = /\&page=(\d+)/ig.exec(url);
            var pageId = (res !== null) ? parseInt(res[1]) : 0;
            
            // Разбираем страницу
            parseTransfers(topDocument, playerId, pageId, maxDepth, 0, timeBegin, timeEnd);
            
        });
    
    }
    
}