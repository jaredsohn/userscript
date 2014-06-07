// ==UserScript==
// @name           KFSE REMOVER
// @namespace      http://tumalevich.pp.ru
// @description    Remove all dumb themes by KFSE
// @include        http://www.e1.ru/talk/forum/*
// ==/UserScript==

var enemies = new Array();
enemies.push('проверка слуха');//Нами всеми горячо нелюбимый КФСЕ

var page = document.location.href;
if (page.indexOf('list.php') != -1)
{
    //Список тем
    var seek = '//span[@class="registered_user"]';
    var elements = document.evaluate(seek, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    for (var i = 0; i < elements.snapshotLength; i++) { 
            var node = elements.snapshotItem(i);
            if (enemies.indexOf(node.firstChild.innerHTML) != -1)
            {
                //alert('Зосранец детектед');
                node.parentNode.parentNode.style.display = 'none';
            }
    }
}
else
{
    //Сообщения
    seek = '//font[@color="green"]';
    elements = document.evaluate(seek, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    for (var i = 0; i < elements.snapshotLength; i++) { 
            var node = elements.snapshotItem(i);
            var testing_text = node.innerHTML;
            testing_text = testing_text.replace(/<[^>]+>/g, '');
            testing_text = testing_text.replace('&nbsp;',' ');
            if (enemies.indexOf(testing_text) != -1)
            {
                node.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            }
    }
}

seek = null;
elements = null;