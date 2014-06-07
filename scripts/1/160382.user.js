// ==UserScript==
// @name             TimeToDeadLine [GW] 
// @namespace        
// @description      Время до возврата предмета
// @include          http://www.ganjawars.ru/items.php*
// @version          1.0
// @author           sixis
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

        var font = document.getElementsByTagName('font');
        var cont;
            for (var i=0;i<font.length;i++)
            {
                if (font[i].firstChild.tagName=='B')
                        {
                                cont=/Передача с обязательным возвратом (\d+).(\d+).(\d+) (\d+):(\d+)/.exec(font[i].firstChild.innerHTML);
                                break;
                        }
            } 
        cont[2]--;
        now=new Date();
        vos=new Date(20+cont[3],cont[2],cont[1],cont[4],cont[5])

var ms= parseInt(vos.getTime()-now.getTime());

x = ms / 1000;
sec = Math.floor(x % 60);
x /= 60;
min = Math.floor(x % 60);
x /= 60;
hours = Math.floor(x % 24);
x /= 24;
days = Math.floor(x);
        
if(/Купить предмет/.test(font[i].parentNode.nextSibling.nextSibling.nextSibling.innerHTML))
        {
                var tmp=font[i].parentNode.nextSibling.nextSibling.nextSibling;
                tmp.innerHTML='<b>Возврат через '+days+' д '+hours+' ч '+min+' м </b>'+tmp.innerHTML;
        }
})();









