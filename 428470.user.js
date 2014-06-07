// ==UserScript==
// @name             Advanced Battle [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Расширенный список врагов. Сортировка противников по дальности.
// @include          http://www.ganjawars.ru/b0/b.php*
// @version          1.01
// @author           W_or_M
// ==/UserScript==

(function() {

// настройки. 1 - вкл. 0 - выкл.
    
var sortEnemys  = 1; // сортировка, если ненужна ставьте 0
var showHp      = 1; // показ хп
var showVisible = 1; // показ видимости
var showWeapon  = 1; // показ оружия
var showPower   = 0; // показ мощности

    
// сортировка
function cmp(a, b) {
    
    a = a.dist;
    b = b.dist;
    
    if (a < b) return -1;
    if (a > b) return 1;
    
    return 0;
    
}

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/b0/b.php') >= 0) {
    
    // ищем список врагов
    var o = root.document.getElementsByTagName('select');
    for (var i = 0, l = o.length; i < l; i++) {
        
        if (o[i].name == 'enemy') {
            
            // список
            var select = o[i];
            
            break;
            
        }
        
    }
    
    if (typeof select != 'undefined') {
        
        // тут храним список врагов
        var enemys = [];
        
        // пробегаем по списку и составляем массив врагов
        for (i = 0; i < select.childNodes.length; i++) {
            
            // ыде персонажа
            var pers_id = select.childNodes[i].value;
            
            // перс
            var pers = /(\d+)\. (.*)\[(\d+)\] - (\d+)/.exec(select.childNodes[i].innerHTML);
            var temp = {};
            
            if (pers != null) {
                
                temp.n = pers[1];
                temp.nick  = pers[2];
                temp.level = parseInt(pers[3]);
                temp.dist  = parseInt(pers[4]);
                
                // id
                temp.id = select.childNodes[i].value;
                // цвет
                temp.color = select.childNodes[i].style.backgroundColor;
                
                // пробегаем по списку персов
                var a = root.document.getElementsByTagName('a');
                for (var k = 0; k < a.length; k++ ) {
                    
                    // нашли перса
                    if (a[k].id == ('userheader'+ pers_id)) {
                        
                        var node = a[k].nextSibling.nextSibling;
                        
                        // колво хп
                        temp.hp = node.firstChild.nodeValue.replace(/\-\s+/, '; ');
                        
                        // видимость
                        temp.visible = node.childNodes[11].nodeValue.replace(/\-\s+/, '; ');
                        
                        // мощность
                        temp.power = node.childNodes[5].nodeValue.replace(/\-\s+/, '; ');
                        
                        // оружие
                        temp.weapon = '; '+ node.childNodes[13].firstChild.innerHTML;
                        
                        enemys[i] = temp;
                        
                    }
                    
                }
                
            }
            
        }
        
        // список есть
        if (enemys.length) {
            
            // очищаем список
            for (i = 0, l = select.childNodes.length; i < l; i++) {
                
                select.removeChild(select.firstChild);
                
            }
            
            // сортируем врагов по дальности
            if (sortEnemys != 0) {
                
                enemys.sort(cmp);
                
            }
            
            // составляем новый список
            for (i in enemys) {
                
                var option = root.document.createElement('option');
                option.value = enemys[i].id;
                option.style.backgroundColor = enemys[i].color;
                //option.setAttribute('style', 'background-color: '+ enemys[i].color);
                option.innerHTML = enemys[i].n +'. '+ enemys[i].nick + ' ['+ enemys[i].level +']; расстояние: '+ enemys[i].dist + (showHp != 0 ?  enemys[i].hp : '') + (showPower != 0 ? enemys[i].power : '') + ( showVisible != 0 ? enemys[i].visible : '') + ( showWeapon != 0 ? enemys[i].weapon : '');
                select.appendChild(option);
                
            }
            
        }
        
        
    }
    
}

})();