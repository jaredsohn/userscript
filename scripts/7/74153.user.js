// ==UserScript==
// @name           Fobo.ru Translator (English)
// @namespace      JackJack
// @description    Translates forum Fobo.ru into English (so far major messages only)
// @include        http://fobo.ru/*
// @include        http://www.fobo.ru/*
// ==/UserScript==

var awi = new Array();
awi[","] = true;
awi["|"] = true;
awi["\u00A0"] = true;
awi["RSS"] = true;
awi["Picture Bank"] = true;
awi["FoBo.ru © 1999-2006"] = true;
awi["Powered by: One-Of-A-Kind Board Engine"] = true;

var tmi=new Array();
tmi["СМС-сервисы"]="SMS-services";
tmi["Получить фобрики"]="Buy fobriks";
tmi["Выйграть фобрики"]="Win fobriks";
tmi["Выиграть фобрики"]="Win fobriks";
tmi["Мой FoBo.ru"]="My FoBo.ru";
tmi["Контакты"]="Contacts";
tmi["Личные данные"]="Personal information";
tmi["Подписка"]="Subscriptions";
tmi["Кошелек"]="Purse";
tmi["Фото"]="Photographs";
tmi["Сообщения"]="Messages";
tmi["Новое сообщение"]="New message";
tmi["Входящие"]="Incoming ";
tmi["Исходящие"]="Outgoing";
tmi["Пользователи"]="Users";
tmi["Фотобанк"]="Photobank ";
tmi["Сообщества"]="Communities";
tmi["Интересы (beta)"]="Interests (beta)";
tmi["Сервисы"]="Services";
tmi["Поиск"]="Search";
tmi["Магазин (beta)"]="Shop (beta)";
tmi["Галерея"]="Gallery";
tmi["Торрент трекер"]="Torrent-tracker";
tmi["Правила"]="Forum Rules";

var pgl=new Array();
pgl["Профиль"]="Profile";
pgl["Приват"]="Write PM";
pgl["В друзья"]="to Friends";
pgl["Цитировать"]="Quote";
pgl["Редактировать"]="Edit";
pgl["Удалить"]="Delete";
pgl["Сообщить о нарушении"]="Complain about this post";

var sfdt=new Array();
sfdt["С нами с"]="With us since ";
sfdt["Оставил"]="Wrote ";
sfdt["сообщений"]=" posts";
sfdt["Состоит в сообществах:"]="Member of communities:";
sfdt["| Написано"]=" | Written ";
sfdt["№"]=" #";
sfdt["Автор:"]="Author: ";
sfdt["от"]="by ";
sfdt["Цитата:"]="Quote:";

var tct=new Array();
tct["Автор"]="Author";
tct["Тема"]="Subject";
tct["Форум"]="Subforum";
tct["Сообщений"]="Posts";
tct["Тем"]="Threads";
tct["Последнее"]="Last";
tct["Ответов"]="Posts";
tct["Название сообщества"]="Community Name";
tct["Участников"]="Members\u00A0Num";
tct["Описание сообщества"]="Description";
tct["Популярные сообщества"]="Popular Communities";
tct["Новые сообщества"]="New Communities";
tct["Интересы пользователей"]="Users' Interests";
tct["Пользователь"]="User";
tct["Наименование"]="Name";
tct["Цена"]="Price";
tct["Операция"]="Operation";
tct["Имя участника"]="Memebers' Names";
tct["Связь"]="Contact";
tct["Статус"]="Status";
tct["Сообщение"]="Message";
tct["Заголовок Сообщения"]="Message Subject";
tct["Sender"]="Sender";
tct["Дата/Время отправки"]="Date/Time Sent";
tct["Покупка фобриков"]="Buying fobriks";
tct["Ваш баланс"]="Your balance";
tct["Текст правил"]="Text of the Rules";


// ==========================  Utility  Functions  ==========================

String.prototype.trim=function(){var w=" \n\r\t";var e=this.length-1;for(;e>=0;--e)if(w.indexOf(this[e])<0)break;var s=0;for(;s<=e;++s)if(w.indexOf(this[s])<0)break;return(s>e)?"":((s!=0||e+1!=this.length)?this.substr(s,e+1-s):this);}

function selectSingleNode(p,c){var n=document.evaluate(p,(c!=null&&c!=undefined)?c:document,null,XPathResult.ANY_TYPE,null).iterateNext();return(n!=undefined)?n:null;}
function isAlwaysIgnored(t){return(t.length>0)?((awi[t]!=null)?awi[t]:false):true;}

// ==========================================================================


function ttc(/*String*/ textToFind, /*String*/ translation, /*String*/ insiderNode) {
    if (insiderNode != null && insiderNode != undefined && insiderNode.length > 0) {
        insiderNode += "/";
    } else {
        insiderNode = "";
    }

    var textNodesResult = document.evaluate("//" + insiderNode + "text()[.='" + textToFind +
            "']|//" + insiderNode + "@*[.='" + textToFind + "']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < textNodesResult.snapshotLength; ++i) {
        var node = textNodesResult.snapshotItem(i);

        node.nodeValue = translation;
    }
}

function translateTextContents() {
    ttc("Ответить", "Respond", "h3/");
    ttc("Картинки", "Images", "h3/");
    ttc("О, это клёвый комментарий!", "This is such a good post!", "a");
    ttc("Какая дрянь, ужаc!", "What a rubbish, terrible!", "a");
    ttc("рейтинг", "rating", "div/span");
    ttc("отсутствует", "absent", "div/span");
    ttc("Использует Driver4Fobo.ru", "Uses Driver4Fobo.ru", "img");
    ttc("Важно:", "Important:", "td/div/span");
    ttc("Для контактов", "For Contacts", "div[@class='footer']/div/a");
    ttc("FoBo.ru :: форум для общения", "FoBo.ru :: forum for communication", "body/div//a");
    ttc("Сейф", "Safe", "td/div[2][starts-with(@id, 'postText_')]//div[@class='safeBox']/");
    ttc("Открыть ячейку", "Unlock the cell", "td/div[2][starts-with(@id, 'postText_')]//div[@class='safeBox']/");
    ttc("Готово!", "Done!", "button");
    ttc("выход", "logout", "div[@class='userBlock']//a");
    ttc("Искать", "Search for", "label");
    ttc("темах", "subjects", "form/div/a");
    ttc("сообщениях", "posts", "form/div/a");
    ttc("фобрики", "fobriks", "div/a[@href='#'][@onclick]");
    window.setTimeout(function() {ttc("[ Сейф ]", "[ Safe ]");}, 100);
}

function translateChildTextNodes(/*Element*/ element, /*Array*/ translations, /*[optional] boolean*/ logMisses) {
    if (logMisses == null || logMisses == undefined) {
        logMisses = false;
    }

    for (var i = 0; i < element.childNodes.length; ++i) {
        var node = element.childNodes[i];

        if (node.nodeType != 3) {
            continue;
        }

        var text = node.nodeValue.trim();

        if (isAlwaysIgnored(text)) {
            continue;
        } else if (translations[text] != null) {
            node.nodeValue = translations[text];
        } else if (logMisses) {
            GM_log(text);
        }
    }
}

function translateByXPath(/*String*/ xpath, /*Array*/ translations, /*[optional] boolean*/ logMisses) {
    var elementsResult = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < elementsResult.snapshotLength; ++i) {
        translateChildTextNodes(elementsResult.snapshotItem(i), translations, logMisses);
    }
}

function testTranslation() {
}

// Main function
(function() {
    if (selectSingleNode("/html/head/title") == null) {
        return;
    }

    testTranslation();
    translateTextContents();
    translateByXPath("//div[@class='nav_menu']//ul/li/a[@href][count(text())!=0]", tmi);
    translateByXPath("//a[contains(@class, 'postbitGray')][@href][normalize-space(/.)!=''][count(text())=1][count(*/*)=0]", pgl);
    translateByXPath("//div[contains(@class, 'smallfont')][count(text())!=0]", sfdt);
    translateByXPath("//tr/td[contains(@class, 'headerBlueSmall')][count(text())!=0]|" +
            "//tr[contains(@class, 'headerBlueSmall') or contains(@class, 'smallfont')]/td[count(text())!=0]|" +
            "//tr[contains(@class, 'headerBlueSmall')]/td/div[count(text())!=0]|" +
            "/html/body/table/*/tr/td/table/*/tr[1]/td/span/b[count(text())!=0]", tct);
})();
