// ==UserScript==
// @name             Advanced Item [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      На странице предмета добавляет ссылки: "Кто сдает в аренду", "Кто покупает?", "Кому в аренду". А также 4 ссылки для подачи объявлений: "Продаю", "Сдаю", "Куплю", "Возьму в аренду".
// @include          http://www.ganjawars.ru/item.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

var item_id = /^http:\/\/www\.ganjawars\.ru\/item\.php\?item_id=(.*)$/.exec(root.location.href);

// предмет найден
if (item_id != null) {
    
    item_id = item_id[1];
    
    // ищем ссылку "где купить" и добавляем остальные ссылки после нее
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (a[i].innerHTML == 'Где купить?') {
            
            // кто сдает в аренду
            var span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market.php?stage=2&item_id='+ item_id +'&action_id=3&island=-1" >Кто сдает?</a> ]';
            a[i].parentNode.appendChild(span);
            
            // кто покупает
            span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market.php?stage=2&item_id='+ item_id +'&action_id=2&island=-1" >Кто покупает?</a> ]';
            a[i].parentNode.appendChild(span);
            
            // кому в аренду
            span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market.php?stage=2&item_id='+ item_id +'&action_id=4&island=-1" >Кому в аренду?</a> ]';
            a[i].parentNode.appendChild(span);
            
            // разделитель
            a[i].parentNode.appendChild(root.document.createElement('br'));
            a[i].parentNode.appendChild(root.document.createElement('br'));
            
            // продаю
            var span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ item_id +'&action_id=1" >Продаю</a> ]';
            a[i].parentNode.appendChild(span);
            
            // сдам
            var span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ item_id +'&action_id=3" >Сдам</a> ]';
            a[i].parentNode.appendChild(span);
            
            // куплю
            var span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ item_id +'&action_id=2" >Куплю</a> ]';
            a[i].parentNode.appendChild(span);
            
            // возьму в аренду
            var span = root.document.createElement('span');
            span.innerHTML = '[ <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ item_id +'&action_id=2">Возьму в аренду</a> ]';
            a[i].parentNode.appendChild(span);
            
        }
        
    }
    
}

})();