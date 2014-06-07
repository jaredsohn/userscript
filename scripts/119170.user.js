// ==UserScript==
// @name             ApeHgA [GW] 
// @namespace        http://gw.heymexa.net/
// @description      Скрипт в помощь арендодателям.
// @include          http://www.ganjawars.ru/*
// @include          http://ganjawars.ru/*
// @version          1.00
// @author           W_or_M
// ==/UserScript==

(function() {

// НАСТРОЙКИ
// ===============================================
// предметы для сдачи в аренду.
// id, название предмета, цена в еунах, цена сдачи на день, неделю, месяц
    var items = [
        { id : 'mi8', name : 'Вертолёт МИ-8', eun : 40, price : 7000, week : 40000, month : 150000 },
        { id : 'apache', name : 'Вертолёт Apache', eun : 30, price : 7000, week : 40000, month : 150000 },
        { id : 'maskl', name : 'Лесной маскхалат', eun : 20, price : 4000, week : 28000, month : 120000 },
        { id : 'nokia9500', name : 'Nokia 9500', eun : 20, price : 7000, week : 28000, month : 120000 },
        { id : 'cboots', name : 'Кевларовые сапоги [TB]', eun : 20, price : 11000, week : 66000, month : 250000 },
        { id : 'sas_helmet', name : 'Шлем SAS [DF]', eun : 55, price : 19000, week : 114000, month : 456000 },
        { id : 'mossberg', name : 'Mossberg 590 [SB]', eun : 50, price : 40000, week : 240000, month : 1000000 },
    ];
// ===============================================
    
    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    
    function getXmlHttp(){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
        xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
    }


    function ajax(url, onload) {
        
        var xmlhttp = getXmlHttp();
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    onload(xmlhttp);
                }
            }
        };
        xmlhttp.send(null);
        
    }
    
    // главное меню
    function getMainMenu() {
        
        var a = root.document.getElementsByTagName('a');
        for (var i = 0, l = a.length; i < l; i++) {
            
            if (a[i].href == 'http://chat.ganjawars.ru/' && /<b>Чат<\/b>/i.test(a[i].innerHTML)) {
                
                return a[i].parentNode;
                
            }
            
        }
        
        return false;
        
    }
    
    // добавляет ссылки в главное меню
    function addToMenu(text, url, func) {
        
        // не задан текст и урл
        if (!text || !url) {
            
            return false;
            
        }
        
        // получаем главное меню
        var menu = getMainMenu();
        
        if (menu) {
            
            menu.appendChild(root.document.createTextNode(' | '));
            
            var a = root.document.createElement('a');
            a.innerHTML = text;
            a.setAttribute('style', 'text-decoration: none; color: #990000');
            a.href = url;
            if (func) {
                
                a.onclick = func;
                
            }
            menu.appendChild(a);
            
        }
        
    }
    
    // проверка предмета на наличие в массиве предметов
    function getItem(itemName) {
        
        for (var i = 0, l = items.length; i < l; i++) {
            
            if (items[i].name == itemName || items[i].id == itemName) {
                
                return items[i];
                
            }
            
        }
        
        return false;
        
    }
    
    // возвращает инпут по имени
    function getInputByName(name) {
        
        
        if (!name) {
            
            return false;
            
        }
        
        var input = root.document.getElementsByName(name);
        if (input.length) {
            
            return input[0];
            
        }
        
        return false;
        
    }
    
    // при клике по инпуту очищает его
    function inputClear() {
        
        this.value = '';
        
    }
    
    // смена сроков аренды
    function changeOwnedTime(time) {
        
        if (!inputOwnedTime && (inputOwnedTime = getInputByName('owned_time')) === false) {
            
            return false;
            
        }
        
        inputOwnedTime.value = time;
        
        if (inputPrice || (inputPrice = getInputByName('sendprice')) !== false ) {
            
            if (time == 30) {
                
                inputPrice.value = item.month;
            
            } else if (time == 7) {
                
                inputPrice.value = item.week;
                
            } else {
                
                inputPrice.value = item.price * time;
                
            }
            
            
        }
        
    }
    
    // ончандж для смены срока аренды
    function onchangeOwnedTime() {
    
        var value = parseFloat(this.value);
        if (isNaN(value)) {
            
            value = 1;
            
        }
        
        changeOwnedTime(value);
        
    }
    
    function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
    }
    
    // возвращает id предмета по ссылке возврата
    function getVozvratItemId(url) {
        
        if ((itemid = /item_tag=([\w\d_]+)&/.exec(url)) != null) {
            
            return itemid[1];
            
        }
        
        return false;
        
    }
    
    // возвращает ссылку на возврат предмета
    function getVozvralUrl(d) {
        
                
        var d = d || root.document;
        
        var a = d.getElementsByTagName('a');
        for (var i = 0, l = a.length; i < l; i++) {
            
            if (/ganjawars\.ru\/home\.itemactions\.php\?forcetake=1/.test(a[i].href)) {
                
                var item = {};
                item.url = a[i].href;
                if ((itemext = /Предмет (.*?) \[(\d+)\/(\d+)\] принадлежит Вам/.exec(a[i].previousSibling.nodeValue)) != null) {
    
                    item.name = itemext[1];
                    item.durability1 = itemext[2];
                    item.durability2 = itemext[3];
    
                }
                
                return item;
                
            }
            
        }
        
        return false;
        
    }
    
    // удаляет ссылки «забыть»
    function deleteAllForgetLinks() {
        
        var a = root.document.getElementsByTagName('a');
        for (var i = 0, l = a.length; i < l; i++) {
            
            if (a[i] && a[i].innerHTML == '(забыть)') {
                
                a[i].parentNode.removeChild(a[i]);
                i--;
                
            }
            
        }
        
    }
    
    // получеие инфо по аренде
    function getInfo() {
        
        var retval = [];
        
        var table = getArendTable();
        var row = table.getElementsByTagName('tr');
        for (var i = 1, l = row.length; i < l; i++) {
            
            var tmp = {};
            
            // разные браузеры, мать их
            if (root.opera) {
                
                var cn = [0, 1, 2];
                
            } else {
                
                var cn = [1, 3, 5]
                
            }
            
            if (row[i].childNodes[cn[0]] && row[i].childNodes[cn[0]].tagName == 'TD') {
                
                var a = row[i].childNodes[cn[0]].firstChild;
                if (a) {
                    
                    tmp.itemName = a.innerHTML;
                    tmp.itemId = /\/item\.php\?item_id=(.*)/.exec(a.href)[1];
                    
                }
                
            }
            
            // кому
            if (row[i].childNodes[cn[1]] && row[i].childNodes[cn[1]].tagName == 'TD') {
                
                var a = row[i].childNodes[cn[1]].getElementsByTagName('a');
                for(var k = 0; k < a.length; k++) {
                    
                    if ((persid = /info\.php\?id=(\d+)/.exec(a[k].href))) {
                        
                        tmp.persId = persid[1];
                        
                    }
                    
                }
                
            }
            
            // дата возврата
            if (row[i].childNodes[cn[2]] && row[i].childNodes[cn[2]].tagName == 'TD') {
                
                if (row[i].childNodes[cn[2]].firstChild.tagName == 'FONT') {
                    
                    tmp.isOver = 1;
                    
                }
                
                tmp.objDate = row[i].childNodes[cn[2]];
                
            }
            
            if (tmp.itemName && tmp.itemId && tmp.persId && tmp.objDate) {
                
                retval.push(tmp);
                
            }
            
        }
        
        if (retval.length) {
            
            return retval;
            
        }
        
        return false;
        
    }
    
    function getArendTable() {
        
        return root.document.getElementsByTagName('table')[5];
        
    }
    
    function printPriceItems(itemsInfo) {
        
        if (!itemsInfo || !itemsInfo.length) {
            
            return false;
            
        }
        
        var eun_dirty = 0;
        var eun_clean = 0;
        
        for (var i = 0; i < itemsInfo.length; i++) {
            
            var eun = getItemEun(itemsInfo[i].itemId);
            
            eun_dirty += eun;
            eun_clean += Math.floor(eun * 0.9);
            
        }
        
        //Стоимость вещей в еунах:
        //«грязными» 
        //«чистыми»
        var node = getArendTable().nextSibling;
        var p = root.document.createElement('p');
        p.style.align = 'center';
        p.setAttribute('style', 'text-align: center');
        p.innerHTML = 'Стоимость «грязными»: <span style="color: red;"><b>'+ eun_dirty +'</b></span> еун<br/>';
        p.innerHTML += 'Стоимость «чистыми»: &nbsp;<span style="color: green;"><b>'+ eun_clean +'</b></span> еун';
        
        
        node.parentNode.insertBefore(p, node);
        
        
    }
    
    function getItemEun(id) {
        
        for (var i = 0; i < items.length; i++) {
            
            if (items[i].id == id && items[i].eun) {
                
                return items[i].eun;
                
            }
            
        }
        
        return 0;
        
    }
    

// ДЛЯ ВСЕХ СТРАНИЦ    
// ----------------------------------------------------------------------------

addToMenu('Мои объявы', 'http://www.ganjawars.ru/market-l.php');
addToMenu('Возврат', 'http://www.ganjawars.ru/info.rent.php?id='+ getCookie('uid'));

// НА ГЛАВНОЙ
// ----------------------------------------------------------------------------

// НА СТРАНИЦЕ АРЕНДЫ
// ----------------------------------------------------------------------------
    if (root.location.href.indexOf('ganjawars.ru/info.rent.php?id='+ getCookie('uid')) >= 0) {
        
        // удаляем «забыть»
        deleteAllForgetLinks();
        
        var info = getInfo();
        
        var curItem = 0;
        var getBackItem = function () {
            
            if (!info[curItem]) {
                
                return false;
                
            } else if (info[curItem] && info[curItem].isOver) {
                
                // переходим на страницу персонажа
                ajax("http://www.ganjawars.ru/info.php?id="+ info[curItem].persId, function(response) {
                        
                        var div = root.document.createElement('div');
                        div.innerHTML = response.responseText;
                        
                        // ссылко на возврат найдена
                        if ((item = getVozvralUrl(div)) != false) {
                            
                            var o = info[curItem].objDate;
                            var a = root.document.createElement('a');
                            a.href = item.url;
                            a.innerHTML = '<b>Забрать</b>';
                            o.appendChild(a);
                            
                        }
                        
                        curItem++;
                        getBackItem();
                    
                });
                
            }
            
        };
        getBackItem();
        
        // стоимость всех предметов
        printPriceItems(info);
        
    }
    
// НА СТРАНИЦЕ ПЕРЕДАЧ    
// ----------------------------------------------------------------------------
    if (root.location.href.indexOf('ganjawars.ru/home.senditem.php') >= 0) {
        
        // ставим передать в аренду
        root.document.getElementsByName('sendtype')[2].checked = true;
        
        
        // что за предмет передаем
        var b = root.document.getElementsByTagName('b');
        for (var i = 0, l = b.length; i < l; i++ ) {
            
            if (/Передача предмета/.test(b[i].innerHTML)) {
                
                var itemName = b[i+1].innerHTML;
                
            }
            
        }
        
        // предмет найден
        if (itemName && (item = getItem(itemName)) !== false ) {
            
            // ставим цену
            if ((inputPrice = getInputByName('sendprice')) !== false ) {
                
                inputPrice.value = item.price;
                
                // вешаем очистку value по онклику, если нету
                if (!inputPrice.onclick) {
                    
                    inputPrice.onclick = inputClear;
                    
                }
                
            }
            
            // прикручиваем зависимость цены от срока аренды
            // ставим цену
            if (inputPrice && (inputOwnedTime = getInputByName('owned_time')) !== false && !inputOwnedTime.onchange) {
                
                inputOwnedTime.onchange = onchangeOwnedTime;
                
            }
            
        }
        
    }
// ----------------------------------------------------------------------------
})();