// ==UserScript==
// @name        Zvýrazňování vybraných lidí na disukuzích iDNES
// @description Pro přidání uživatele stačí v diskuzi kliknout na číslo u jeho jména. Barvy jsou volené náhodně ze 6 barev, je možné se tedy časem proklikat na tu žádanou.
// @include     /^http://(.*\.)?idnes\.cz/diskuse\.aspx(\?.*)?$/
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var colors = ['#BFFFFF', '#FFBFFF', '#FFFFBF', '#DFDFFF', '#DFFFDF', '#FFDFDF'];
var ids = JSON.parse(GM_getValue('ids', '{}'));

var list = document.getElementsByClassName('disc-list');
list = list[list.length - 1];

var posts = {};

for (var i = 0; i < list.children.length; ++i)
{
    var sup = list.children[i].getElementsByTagName('sup')[0];

    if (sup)
    {
        var userId = sup.innerHTML.replace(new RegExp('<i>.*?</i>', 'g'), '')
        
        if (ids[userId])
            list.children[i].style.background = ids[userId];

        sup.onclick = function(userId){ return function(event){ toggle(userId); }; }(userId);
        sup.style.cursor = 'pointer';

        if (!posts[userId])
            posts[userId] = [];

        posts[userId].push(list.children[i]);
    }
}

function toggle(userId)
{
    if (!ids[userId])
        ids[userId] = colors[Math.floor(Math.random() * colors.length)];
    else
        delete ids[userId];

    for (var i = 0; i < posts[userId].length; ++i)
        posts[userId][i].style.background = ids[userId] ? ids[userId] : '';

    GM_setValue('ids', JSON.stringify(ids));
}
