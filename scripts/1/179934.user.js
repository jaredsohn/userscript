// ==UserScript==
// @namespace       heroeswm
// @name            HWM Taxes
// @description     Отображение цен с учетом налогов.
// @version         3.0.0
// @include         http://www.heroeswm.ru/auction_new_lot.php
// ==/UserScript==


/** Новый лот аукциона
*
* @file libAuctionNewLot.js
* @version 0.0.5
* @author hotamateurxxx
* @license GPL
*/


/**
*/
function AuctionNewLot() {}


/** Загрузка и парсинг домашней страницы
*
* @param Document doc
* @param String art
* @param Number price
*/
AuctionNewLot.setNewLot = function(doc, art, price) {

    var form = doc.forms['f'];
    var count = 1;
    var maxCount = 50;
    
    // Выставляем продаваемый артефакт
    var select = form.getElementsByTagName('select')[0];
    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        
        // Проверяем имя артефакта
        var re = new RegExp(art + '@\\d+');
        var res = re.exec(option.value);
        if (res !== null) {
            var re = new RegExp('.+\\s+\\d+/\\d+(\\s+\\((\\d+)\\))?');
            var res = re.exec(option.textContent);
            if (res[2] !== undefined)
                count = Number(res[2]);
            maxCount = 3; // Это однозначно артефакт
            select.selectedIndex = i;
            break;
        }
        
        // Проверяем заголовок элемента
        var re = new RegExp(art + '(\\s+\\d+/\\d+)?(\\s+\\((\\d+)\\))?');
        var res = re.exec(option.textContent);
        if (res !== null) {
            if (res[3] !== undefined)
                count = Number(res[3]);
            if (res[1] !== undefined)
                maxCount = 3; // Это однозначно артефакт
            select.selectedIndex = i;
            break;
        }
        
    }
    
    // Выставляем цену
    var input = form.elements['price'];
    input.value = Number(price) - 1;
    
    // Выставляем количество
    var input = form.elements['count'];
    input.value = Math.min(count, maxCount);
    
}


/** Привязка подсказки по налогам
*
* @param Document doc
*/
AuctionNewLot.bindTaxesHint = function(doc) {

    // Ищем форму
    // <form action="/auction_new_lot.php" method="post" name="f">
    var form = doc.forms['f'];
    
    // Ищем поле
    // <input type="text" value="0" style="width:100;" name="price">
    var input = form.elements['price'];
    
    // Вставляем подсказку
    var font = doc.createElement('font');
    font.style.marginLeft = '12px';
    input.parentNode.insertBefore(font, input.nextSibling);

    /** Обработчик изменения цены
    */
    function onChangePrice() {
        var price = Number(input.value);
        font.textContent = Math.round(price * 0.99) + ' с учетом коммиссии';
    }

    // Вешаем обработчик
    input.onkeyup = onChangePrice;
    input.onchange = onChangePrice;
    onChangePrice();

}



AuctionNewLot.bindTaxesHint(document);