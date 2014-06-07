// ==UserScript==
// @name           rslt.ru
// @namespace      rslt.ru
// @include        http://www.rslt.ru/ru/prayingtime*
// ==/UserScript==

Now = new Date();
day = Now.getDate();

tab = document.getElementsByTagName('table');
for(var x=0; x<tab.length; x++)
    if (tab[x].className == 'full') {
        var tb = tab[x].getElementsByTagName('TBODY')[0]

        rows = tab[x].getElementsByTagName('tr');
        for(var i=0; i<rows.length; i++) {
            var date = rows[i].getElementsByTagName('td')[0].lastChild.textContent;
            if (date == day) {
                rows[i].style.backgroundColor = '#20AC34';              // Покрасим в нужный цвет фон тр-ки
                var tds = rows[i].getElementsByTagName('td');           // Пройдемся в цикле по td-шкам и сотрем их классы
                for(var t=0; t<tds.length; t++) tds[t].className = '';
            }

        }
    }
