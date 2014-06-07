// ==UserScript==
// @name           LeproTotalComments
// @namespace      TooDrunkToCode
// @description    Удобные опции для комментариев с красивыми кнопочками
// @include        http://*leprosorium.ru/comments/*
// ==/UserScript==



// Полезные настройки
var config = {
    max_inbox_rating: 0,     // Открывать комментарии "инбокс ми",
                             // если рейтинг больше этого значения

    max_inbox_length: 60,    // Открывать комментарии "инбокс ми",
                             // если комментарий содержит более X символов

    min_rating_nice: 75    // Рейтинг комментария, начиная с которого
                             // его можно считать риальни клеви
};


/*
/  Поддерживаемые режимы фильтрации комментариев
/  Для добавления нового режима достаточно написать метод isSomething,
/  который принимает в параметрах DOM-элемент комментария, а на выходе
/  дает 1 или 0.
/  Но это не все!
/  Еще нужно добавить элемент в массив modes, сочинить название режима
/  и подпись на кнопке для его вызова.
*/
var modes = [
    {
        name: 'all',
        title: 'все',
        criteria: isNotFuckingInboxRequest
    },{
        name: 'newcomment',
        title: 'новые',
        criteria: isNew
    },{
        name: 'image',
        title: 'с картинками',
        criteria: isImage
    },{
        name: 'link',
        title: 'ссылки',
        criteria: isLink
    },{
        name: 'nice',
        title: 'клеви',
        criteria: isNice
    },{
        name: 'mine',
        title: 'мои',
        criteria: isMine             // тот самый метод-критерий
    },{
        name: 'allall',
        title: 'все-все'
    }
];

//------------------------------------------------------------------------------
// Здесь происходят действия по нахождению, сортировке и подсчету комментариев
var default_content_class = document.getElementById('content').className.split(' ')[1];

var post = document.getElementById('navigation');
var counter = {allall:0};
nodes = document.getElementById('js-commentsHolder').childNodes;

var comments;
var author = '';
var standard_deviation;

var post_author = document.getElementsByClassName("p")[0].childNodes[3].innerHTML;

sortComments();

//------------------------------------------------------------------------------
// Рисуем панельку с кнопками вызова режима фильтрации

tbl = document.getElementById('content_left_inner').childNodes[1].tBodies[0];

mytr = tbl.insertRow(1);
mytd = mytr.insertCell(0);
mytd.className = 'system';
mytd.setAttribute('colspan', 4);
container = mytd.appendChild(document.createElement("SPAN"));
container.appendChild(document.createTextNode("TotalComments: "));

for (i=0; i<modes.length; i++) {
    mode = modes[i];
    if (mode.hide) continue;
    link = document.createElement('A');
    link.style.cursor = 'pointer';
    link.href = '#ltc-' + mode.name;
    link.id = 'button_' + mode.name;
    link.className = 'ltc_button';
    link.appendChild(document.createTextNode(mode.title));
    link.addEventListener("click", function(event) {setViewMode(event.target.hash.replace('#ltc-', '')); return false; }, false);
    container.appendChild(link);
    count = counter[mode.name] || 0;
    container.appendChild(document.createTextNode(" (" + count + ") "));

}

container.appendChild(document.createTextNode(" автор: "));
control_author = document.createElement('INPUT');
control_author.style.width = '80px';
control_author.addEventListener("change", function(event) {
    author = event.target.value;
    sortComments();
    setViewMode(getCurrentMode());
    return false;
}, false);
control_author.addEventListener("focus", function(event) {
    displayAuthorList();
    return false;
}, false);
control_author.addEventListener("keypress", function(event) {
    document.getElementById('author_selector').style.display = 'none';
    return false;
}, false);

window.addEventListener("click", function(event) {
    if (event.target.id != 'control_author') document.getElementById('author_selector').style.display = 'none';
    return true;
}, false);

function displayAuthorList() {
    var selector = document.getElementById('author_selector');
    selector.style.display = 'block';
    selector.style.top = (findPosY(document.getElementById('control_author')) + 18) + 'px';
    selector.style.left = findPosX(document.getElementById('control_author')) + 'px';
}


control_author.title = 'Показать комментарии только этого юзернейма (можно указать номер)';
control_author.id = 'control_author';
container.appendChild(control_author);


var div = document.createElement("div");
div.style.border="1px solid #F0F0F0";
div.style.minWidth="80px";
div.style.minHeight="20px";
div.id = "author_selector";
div.style.position="absolute";
div.style.zIndex="99";
div.style.color="#999";
div.style.background="#ffffff";
div.style.fontSize="10px";
div.style.padding="0px";
div.style.whiteSpace="nowrap";
div.style.display="none";
div.style.top = (findPosY(document.getElementById('control_author')) + 18) + 'px';
div.style.left = findPosX(document.getElementById('control_author')) + 'px';

var div_link_empty = document.createElement('a');
div_link_empty.innerHTML = '&nbsp;';
div_link_empty.addEventListener("click", function(event) {
    insertAuthor('');
    return false;
}, false);

var div_link_me = document.createElement('a');
div_link_me.innerHTML = getMyUsername();
div_link_me.addEventListener("click", function(event) {
    insertAuthor(event.target.innerHTML);
    return false;
}, false);

var div_link_postauthor = document.createElement('a');
div_link_postauthor.innerHTML = post_author;
div_link_postauthor.addEventListener("click", function(event) {
    insertAuthor(event.target.innerHTML);
    return false;
}, false);

//div.appendChild(div_link_empty);
div.appendChild(div_link_postauthor);
div.appendChild(div_link_me);

document.body.appendChild(div);

addGlobalStyle('#author_selector a {display: block; cursor: pointer;} #author_selector a:hover {background: #f0f0f0;}');
addGlobalStyle('a.ltc_button:hover {background: #F6EFD2; border: 0px;}');

function insertAuthor(username) {
    var element = document.getElementById('control_author');
    element.value = username;
    var selector = document.getElementById('author_selector');
    selector.style.display = 'none';

    author = username;
    sortComments();
    setViewMode(getCurrentMode());

    return;
}

//------------------------------------------------------------------------------
// Всякие вспомогательные функции. Очень нужные!

// Находим и сортируем все комментарии
function sortComments() {
    comments = new Array;
    rating_sum = 0;
    rating_square_sum = 0;
    counter.abovenull = 0;

    for (i=0; i<nodes.length; i++) {
        if (! (nodes[i].className ) ) continue;
        if (! (nodes[i].className.match(/u(\d+)/)) ) continue;
        comment = {
            dom: nodes[i],
            text: getCommentText(nodes[i]),
            rating: getRating(nodes[i]),
            author_number: getUserNumber(nodes[i]),
            allall: 1
        };
        parent_link = nodes[i].childNodes[3].childNodes[1].childNodes[9];
        if (parent_link.className == 'show_parent') {
            parent_link.addEventListener("click", function(event) {
                index = event.target.href.indexOf("#");
                id = (index >= 0) ? event.target.href.substring(index + 1) : 0;
                showComment({dom: document.getElementById(id)});
            }, false);
        };
        for (j=0; j<modes.length; j++) {
            mode = modes[j];
            if (!counter[mode.name]) counter[mode.name] = 0;
            if (mode.criteria) {
                comment[mode.name] = (mode.criteria)(comment.dom);
                if (comment[mode.name]) counter[mode.name]++;
            }
        }
        nodes[i].childNodes[3].childNodes[1].childNodes[1].setAttribute('title', comment.author_number);
        comment.isfromauthor = isFromAuthor(comment.dom);
        counter.allall++;
        if (comment.rating >= 0) {
            counter.abovenull++;
            rating_sum += comment.rating;
            rating_square_sum += Math.pow(comment.rating, 2);
        }
        comments.push(comment);
    };

    // Вычисляем среднеквадратичное отклонение рейтинга по преобразованной формуле
    // без использония среднего рейтинга

    standard_deviation = Math.sqrt(( rating_square_sum - (Math.pow(rating_sum,2)/counter.abovenull) )/(counter.abovenull - 1));

    //

    for (i=0; i<comments.length; i++) {
        comment = comments[i];
        if (isNice(comment.dom)) {
            comment.nice = 1;
            counter.nice++;
        }
    }
};

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    return curtop;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



// Применить фильтр к комментариям
function setViewMode(mode) {
    if (mode != 'all' && mode != 'allall') {
        document.getElementById('content').className = default_content_class;
    }

    for (i=0; i<modes.length; i++) {
        button = document.getElementById('button_' + modes[i].name);
        if (!button) continue;
        if (button.id) button.style.borderBottom = (modes[i].name == mode) ? '2px solid #ff0000' : '1px dotted #000000';
    }
    for (i=0; i<comments.length; i++) {
        comment = comments[i];
        hideComment(comment);  // Сначала все прячем
        if (author && (!comment.isfromauthor)) continue;
        if (comment[mode]) showComment(comment);  // Показываем, если подходит
    }
}

// Получить текущий режим
function getCurrentMode() {
    var location = decodeURI(window.location);
    if (location.search('#new') != -1) return 'newcomment';
    if (location.search('#ltc-') == -1) return 'all';

    index = location.indexOf("#");
    mode = (index >= 0) ? location.substring(index) : "";
    mode = mode.replace('#ltc-', '');
    return mode;
}

// Показать комментарий
function showComment(comment) {
    comment.dom.style.display = '';
}

// Скрыть комментарий
function hideComment(comment) {
    comment.dom.style.display = 'none';
}

// Получить текст комментария
function getCommentText(node) {
    return (node.childNodes[1]) ? node.childNodes[1].innerHTML.toLowerCase() : "empty";
}

// Получить номер и юзернейм автора комментария
function getCommentAuthor(node) {
    comment_author = {};
    link = node.childNodes[3].childNodes[1].childNodes[3];
    comment_author.number = getUserNumber(node);
    comment_author.username = link.innerHTML;
    return comment_author;
}

// Получить ID комментария
function getCommentID(node) {
    return node.id;
}
// Узнать номер автора
function getUserNumber(node) {
    return node.className.match(/u(\d+)/)[1];
}

// Получить рейтинг комментария
function getRating(div) {
    r = div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML;
    return parseInt(r, 10);
}

// Узнать свой собственный юзернейм!
function getMyUsername() {
   return document.getElementById('greetings').childNodes[1].innerHTML;
}

//------------------------------------------------------------------------------
// Критерии отбора комментариев

// Содержит картинку
function isImage(node) {
    var content = getCommentText(node);
    return content.match(/<img\s/) ? 1 : 0;
}
// Содержит линк
function isLink(node) {
    var content = getCommentText(node);
    return content.match(/<a\s/) ? 1 : 0;
}

// Это новый комментарий
function isNew(node) {
    return node.className.match(/new/) ? 1 : 0;
}

// Это мой остроумный комментарий
function isMine(node) {
    return node.className.match(/mine/) ? 1 : 0;
}

function isFromAuthor(node) {
    comment_author = getCommentAuthor(node);
    if (!author) return 0;
    return ( comment_author.number == author || comment_author.username == author ) ? 1 : 0
}

// Судя по всему, этот комментарий интереснее, чем "инбоск ме плиз!!!111"
function isNotFuckingInboxRequest(comment) { return !isFuckingInboxRequest(comment) }

// А вот тут явно просьба записать в инбокс
function isFuckingInboxRequest(comment) {
    var text = getCommentText(comment);
    var rating = getRating(comment);

    if (rating > config.max_inbox_rating) return 0;
    if (text.length > config.max_inbox_length) return 0;

    if (text.search(/inbox/ig) != -1) return 1;
    if (text.search(/инбокс/ig) != -1 ) return 1;
    if (text.search(/инбоск/ig) != -1) return 1;

    return 0;
}

// Остроумный комментарий с множеством плюсов
function isNice(comment) {
    var rating = getRating(comment);

    if (rating < 0) return 0;

    //Новый вариант с использование среднеквадратического отклонения
    return ( (rating / standard_deviation) >= 0.8 ) ? 1 : 0;

    //Старый вариант с фиксированным порогом
    //return (rating >= config.min_rating_nice) ? 1 : 0;
}


//------------------------------------------------------------------------------
// САМАЯ ГЛАВНАЯ СТРОЧКА В СКРИПТЕ!!!11111
// здесь творится волшебство

setViewMode(getCurrentMode());
