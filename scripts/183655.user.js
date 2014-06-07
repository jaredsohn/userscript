// ==UserScript==
// @name       Рецензент+
// @namespace  be soon
// @version    1.2
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include      http://www.google.com.ua/mapmaker*
// @include      https://www.google.com.ua/mapmaker*
// @include      http://www.google.com/mapmaker*
// @include      https://www.google.com/mapmaker*
// @copyright  2013+, samosfator
// ==/UserScript==
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://karantin.zz.mu/gmm/style.css';
document.getElementsByTagName('head')[0].appendChild(link);

//t - template
var t = {}, count = 0; //count- кілкість створених шаблонів - скільки разів на addNew натиснули
t = {
    0: {
        name: '',
        descr: '',
        icon: '',
        code: ''
    },
    src: {
        0: '<div id="kd-edit-directions" class="t_list goog-menuitem"><div class="goog-menuitem-content"><div class="kd-toolbar-menuitem-img" style="background: no-repeat url(',
        1: ');"><img src="http://www.google.com.ua/mapmaker/mapfiles/transparent.png"></div><div class="text-head goog-inline-block"><div class="icon kd-toolbar-menuitem-title">',
        2: '</div><div class="descr kd-toolbar-menuitem-desc">',
        3: '</div></div><div class="copypaste"><img src="http://karantin.zz.mu/gmm/img/Arrowhead-Right-01-48.png" title="Вставити і надіслати"></div></div></div>'
    },
    srcNew: {
        code: '<div id="kd-edit-directions" class="addNew t_list goog-menuitem"><div class="goog-menuitem-content"><div class="kd-toolbar-menuitem-img"><img src="http://www.google.com.ua/mapmaker/mapfiles/transparent.png"></div><div class="goog-inline-block"><div class="kd-toolbar-menuitem-title">Додати новий шаблон</div><div class="kd-toolbar-menuitem-desc">Введіть текст нового шаблону. Він збережеться на вашому комп\'ютері.</div></div></div></div>'
    },
    button: {
        code: '<div id="kd-edit-toolbar-menubutton" class="t_butt hasMaxWidth goog-inline-block goog-flat-menu-button"><div class="goog-inline-block goog-flat-menu-button-caption"><div guidedhelpid="iph-toolbar-edit">Шаблони</div></div><div class="goog-inline-block goog-flat-menu-button-dropdown">&nbsp;</div></div>'
    }
};
function makeCode(n) {
    t[n].code = t.src[0] + t[n].icon + t.src[1] + t[n].name + t.src[2] + t[n].descr + t.src[3];
    return t[n].code;
}
function appendItem(item) {
    $('.addNew').before(item);
    mouseEvents();
    listEvenets();
}
function insert(n, callback) {
    $('#reviewerComment_0').addClass('active');
    $('#reviewerComment_0').text($('.t_list .kd-toolbar-menuitem-desc').eq(n).text());
    $('#reviewerComment_0').attr('style', 'height: 120px;');
    $('#userCommentsText_0').text($('.t_list .kd-toolbar-menuitem-desc').eq(n).text());
    $('#userCommentsText_0').attr('style', 'height: 120px;');
    callback.call();
}
function mouseEvents() {
    $('.t_butt, .t_list').mouseenter(function() {
        $('.t_list').show();
        //Ефект натискання кнопки
        $('.t_butt').addClass('goog-flat-menu-button-open');
    });
    $('.t_butt, .t_list').mouseleave(function() {
        $('.t_list').hide();
        $('.t_butt').removeClass('goog-flat-menu-button-open');
    });
}
function listEvenets() {
    for (var i = 0; i < 20; i++) {
        (function (i) {
            $('.t_list').eq(i).click(function() {
                insert(i, '');
            });
            $('img[src*="Arrowhead-Right-01-48.png"]').eq(i).click(function() {
                insert(i, $('#nextModeration_0 .img').click());
            });
        }(i));
    }
}
function getLocal() {
    if (JSON.parse(localStorage['t'])) {
        t = JSON.parse(localStorage['t']);
        tlength = Object.keys(t).length - 3;    //Кількість шаблонів
        count += tlength;
        for (var i = 0; i < tlength; i++) {
            appendItem(makeCode(i));
        }
        listEvenets();
    }
}
$('#kd-toolbar>#kd-browse-toolbar-button').after(t.button.code + t.srcNew.code);
getLocal();
mouseEvents();

$('.addNew').click(function() {
    t[count] = {};
    t[count]['name'] = prompt('Введіть ім\'я шаблону: ');
    t[count]['descr'] = prompt('Введіть текст шаблону: ');
    t[count]['icon'] = prompt('Введіть посилання на іконку:', 'http://karantin.zz.mu/gmm/img/Add-New-32.png');
    localStorage.setItem('t', JSON.stringify(t));
    appendItem(makeCode(count));
    count++;
});