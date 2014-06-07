// Block Retweets User Script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2009, Oleg Chiruhin, olegchir.ru
// Released under the new BSD license
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Retweet Blocker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Retweet Blocker
// @namespace     olegchir.ru
// @description   script for blocking retweets of specified users
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

//Эта часть текста невозбранно взята отсюда:
//http://www.red-bean.com/decklin/userscripts/
const path_iter_type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const tweet_path = '//li[starts-with(@id, "status_")]';

var s = document.evaluate(tweet_path, document, null, path_iter_type, null);
var ids = [];

for (var i = 0; node = s.snapshotItem(i); i++)
    ids.push(node.id.replace('status_', ''));

document.getElementById('pagination').innerHTML =
    '<a rel="next" class="round more" href="' + window.location.pathname +
    '?max_id=' + (ids.pop() - 1) + '">next »</a>';
//Конец невозбранно стибренного кусочка

/*Скрипт ищет этот элемент и добавляет туда кнопочку блокировки*/
var actionListIdPrefix = "sidebar_actions_for_user_";
/*ID элемента списка, в котором расположена кнопочка блокировки*/
var switchButtonId = "blockRTSwitchAction";
/*ID кнопки в состоянии "заблокировать ретвиты"*/
var switchActionBlockId = "blockRTActionBlock";
/*ID кнопки в состоянии "разблокировать ретвиты"*/
var switchActionUnblockId = "blockRTActionUnblock";

/*Надписи на кнопке*/    
var blockTextBlock = "Заблокировать ретвиты";
var blockTextUnblock = "Разблокировать ретвиты";

/*Название параметра в Firefox, который отвечает за хранение настроек Greasemonkey*/
var gmSettings = "blockRTBannedUsersList";

/*Функция, выполняющаяся при щелчке на кнопке в состоянии "заблокировать"*/
function onclickRTBanButton() {
    /*Читаем настройки Greasemonkey, это будет JSON, и делаем из них массив*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");
    /*Добавляем текущего пользователя в массив заблокированных*/
    blockedUsers[blockedUsers.length] = getCurrentUser();
    /*Сохраняем настройки Greasemonkey*/
    GM_setValue(gmSettings, blockedUsers.toSource());
    /*Перерисовываем кнопочку (ее состояние изменилось)*/
    addRTBanButton();
    /*На всякий случай перерисовываем твиты в поисках заблокированных*/
    removeBanned();
}

/*Функция, выполняющаяся при щелчке на кнопке в состоянии "разблокировать"*/
function onclickRTUnbanButton() {
    /*Читаем настройки Greasemonkey, это будет JSON, и делаем из них массив*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");
    
    /*Пролетаем по массиву, ищем нужное имя пользователя*/
    var counter=0;
    var currentUser = getCurrentUser();
    for (counter=0;counter<blockedUsers.length;counter++) {
        if (blockedUsers[counter]==currentUser) {
            /*и удаляем его. Заметьте как это делается*/
            blockedUsers.splice(counter,1);
            break;
        }
    }
    /*Сохраняем настройки Greasemonkey*/
    GM_setValue(gmSettings, blockedUsers.toSource());
    /*Перерисовываем кнопочку (ее состояние изменилось)*/
    addRTBanButton();
    /*На всякий случай перерисовываем твиты в поисках заблокированных*/
    removeBanned();   
}


/*Получает имя текущего юзера.
И хотя это можно сделать более цивилизованно, вытащив имя из DOM,
сейчас это делается просто парсингом адреса странички*/
function getCurrentUser() {
    /*Получаем всё что после домена*/
    var currUserName = window.location.pathname.substring(1);
    /*Ищем, есть ли в конце строки слеш*/
    var slashIndex = currUserName.indexOf('/');
    /*И если да, то обрезаем строку с начала вплоть до этого слеша*/
    if (slashIndex!=-1) {
        currUserName = currUserName.substring(0,slashIndex);
    }

    return currUserName;
}

/*Функция проверяет, забанен ли пользователь,
то есть есть ли его имя в списке забаненных,
сохраненных в настройках Greasemonkey*/
function userBanned() {
    /*Получаем текущего открытого пользователя*/
    var currentUser = getCurrentUser();
    
    /*Парсим настройки Greasemonkey в массив (десериализуем JSON)*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")"); 
    
    /*Пробегаемся по массиву, и ищем, есть ли пользователь в списке забаненых*/
    var counter = 0;
    for (counter = 0; counter<blockedUsers.length; counter++) {
        if (blockedUsers[counter]==currentUser) {
            return 1;
        }
    }
    
    return 0;
}

/*Создание ссылки на блокировку пользователя*/
function createBlockLink () {
    
    /*Создаем новый элемент DOM*/
    var childItemAction = document.createElement('a');
    /*Устанавливаем ему идентификатор из глобальных переменных*/
    childItemAction.id = switchActionBlockId;
    /*Добавляем прослушиватель события - нельзя просто указать onclick,
    это особенность Greasemonkey*/
    childItemAction.addEventListener(
        'click',
        function (evt) {
            onclickRTBanButton();
            return false;
        },
        false
        );          
    /*Устанавливаем правильный текст ссылки*/
    childItemAction.innerHTML = blockTextBlock;
    /*Устанавливаем курсор в виде руки*/
    childItemAction.style.cursor = 'pointer';
    return childItemAction;
}

/*Создание ссылки на разблокировку пользователя*/
function createUnblockLink () {
    /*Создаем новый элемент DOM*/
    var childItemAction = document.createElement('a');
    /*Устанавливаем ему идентификатор из глобальных переменных*/
    childItemAction.id = switchActionUnblockId;
    /*Добавляем прослушиватель события - нельзя просто указать onclick,
    это особенность Greasemonkey*/
    childItemAction.addEventListener(
        'click',
        function (evt) {
            onclickRTUnbanButton();
            return false;
        },
        false
        );
    /*Устанавливаем правильный текст ссылки*/         
    childItemAction.innerHTML = blockTextUnblock;
    /*Устанавливаем курсор в виде руки*/
    childItemAction.style.cursor = 'pointer';
    return childItemAction;
}

/*Функция удаляет выбранный элемент из DOM, если он есть*/
function removeEl(elId) {
    /*Ищем элемент DOM*/
    var target = document.getElementById(elId);
    
    /*Проверяем, найдено ли что-нибудь*/
    if ((target != "") && (null!=target)) {
        /*Удаляем если что-то найдено*/
        target.parentNode.removeChild(target);    
    }
}
/*Удаляем все дополнительные кнопки*/
function cleanupButtons () {
    removeEl(switchActionUnblockId);
    removeEl(switchActionBlockId);
    removeEl(switchButtonId);
}

/*Перерисовка (добавление) кнопочки заблокировать-разблокировать*/
function addRTBanButton() {  
    /*Ищем все элементы в документе*/
    var allHTMLTags=document.getElementsByTagName("*");

    /*Чистим результаты наших предыдущих похождений*/
    cleanupButtons();

    /*Пробегаем все элементы*/
    for (i=0; i<allHTMLTags.length; i++) {
        /*Если начало одного из элементов совпадает с названием
        блока со ссылочками*/
        if (allHTMLTags[i].id.indexOf(actionListIdPrefix)!=-1) {

            var parentActionsList = allHTMLTags[i];
            
            /*Добавляем новый элемент списка, с именем из глобальных переменных*/
            var childListItem = document.createElement('li');
            childListItem.id = switchButtonId;
                    
 
            /*В зависимости от того, заблокирован или разблокирован текущий пользователь,
            создаем ему нужную кнопочку*/
            var childItemAction;
            if (userBanned()) {
                childItemAction = createUnblockLink();
            } else {
                childItemAction = createBlockLink();
            }
            
            /*И добавляем эту кнопочку на панельку*/
            childListItem.appendChild(childItemAction);
            parentActionsList.appendChild(childListItem);
        }
    }
}

function removeBanned() {

/*Здесь можно указать способ поведения
0 - нормальный режим (сообщение исчезает)
1 - режим НЛО
любое другое число - ничего не делать.*/

banMode = 1;

/*Здесь можно указать, каким цветом будет писать НЛО*/
var nloColor='#D3D3D3';

/*Здесь можно указать, что именно говорит НЛО*/
var nloMsg='НЛО прилетело и опубликовало эту надпись здесь';

/*---------------------------------------*/
/*Подгружаем заблокированных пользователей из настроек Greasemonkey*/
var bannedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");

/*Подкрашиваем чо говорит НЛО*/
var nloFull='<span style="color:'+nloColor+';">'+nloMsg+'</span>';

/*В этом тэге лежит всё зло! Зло не требует отлагательств!!11*/
var theClass="entry-content";

/*Пихаем в массив все элементы странички разом.
Жестоко и беспощадно.*/
var allHTMLTags=document.getElementsByTagName("*");

/*А потом перемалываем их все подряд*/
for (i=0; i<allHTMLTags.length; i++) {

    /*Если нашли пост, смотрим что там внутри*/
    if (allHTMLTags[i].className==theClass) {

        /*Пересохраним в отдельную переменную.
        Моя религия требует жертв, юзернейм! */
        var currText = allHTMLTags[i].innerHTML;
    
        /*Пролистываем весь список забаненных*/
        for (i2=0; i2<bannedUsers.length;i2++) {
    
            /*Зло выражается в следующей строке. Никогда не произносите ее вслух!*/
            var currBanText = 'RT @<a class="tweet-url username" href="/'+bannedUsers[i2]+'">'+bannedUsers[i2]+'</a>';
           
            /*Выбираем как выжигать спам: просто, или изощренно*/
            if (currText.indexOf(currBanText)!=-1) {
                if (banMode == 0) {
                    /*в простом случае просто убираем этот блок текста (точнее, на два блока выше по иерархии)*/
                    allHTMLTags[i].parentNode.parentNode.style.display='none';
                }
                if (banMode == 1) {
                    /*в изощренном за дело берется НЛО*/
                    allHTMLTags[i].parentNode.innerHTML=nloFull;
                }
            }

        }
    }
}
/*Дефайн тру фолс, приятного вечера, ребятки.*/

}

addRTBanButton();
removeBanned();