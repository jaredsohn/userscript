// ==UserScript==
// @name         InsertImg
// @namespace    http://mail.yandex.ru/
// @version      0.1
// @description  Add images to mail in Yandex.Mail web-interface
// @match        http*://*/*
// @copyright    2013+, apostol@yandex-team.ru
// ==/UserScript==

$(document).ready(function() {

    var styles = ".INSERT_IMG_insert-button{line-height:1.4em;width:auto !important;}.INSERT_IMG.prompt{position:absolute;z-index:1;top:50%;left:50%;width:500px;margin-left:-250px;padding:20px;text-align:center;opacity:0;border:1px solid rgba(0,0,0,.1);background:rgba(255,255,255,.9);pointer-events:none;-webkit-transition:opacity ease-out .3s;}.INSERT_IMG.prompt.visible{opacity:1;pointer-events:auto;}.INSERT_IMG input{display:inline-block;margin:5px;padding:5px;}.INSERT_IMG .src{width:300px}.INSERT_IMG .optional{position:absolute;z-index:-1;top:0;right:37px;width:147px;height:51px;padding-top:3px;text-align:center;color:#555;background-color:#efefef;}.INSERT_IMG .height,.INSERT_IMG .width{width:50px;margin-right:10px;background:#efefef;}.INSERT_IMG .submit{position:absolute;visibility:hidden;}.INSERT_IMG .hint{font-family:sans-serif;font-size:10px;padding-top:12px;color:#999;}",
        stylesImg = "img{min-height:20px;min-width:20px;}";

    var toolBar = getToolBar(),
        imgButtonWrap = $('<td>'),
        imgButton = $('<a>').addClass('mceButton mceButtonEnabled'),
        wait;

    // elems
    var body = $('body'),
        messageContent,
        button,
        img,
        src,
        height,
        width,
        form,
        prompt;


    function showPrompt() {
        var findedPrompt = $('.INSERT_IMG.prompt'),
            prompt = findedPrompt[0] ? findedPrompt : buildPrompt();

        prompt.addClass('visible')
        cleanPrompt();
        src.focus();

        // кладём тэг <img> в начало сообщения
        createNewImg();
    };

    // добавляет в DOM попап с запросом параметров картинки
    function buildPrompt() {
        src = $('<input class="src" placeholder="source">');
        optional = $('<div class="optional">').text('optional');
        height = $('<input class="height" type="number" placeholder="height">');
        width = $('<input class="width" type="number" placeholder="width">');
        submit = $('<button class="submit" type="submit"/>');
        hint = $('<div class="hint">').text('Если не указывать размеры, возьмутся оригинальные значения');
        form = $('<form class="form" action="/">');
        prompt = $('<div class="INSERT_IMG prompt">');

        // собираем попап
        form.append( src, optional, height, width, submit, hint );
        prompt.append( form );

        // бинды
        src.on('keyup', function(e) { img.attr('src', e.target.value); });
        height.on('keyup', updateAttr);
        width.on('keyup', updateAttr);
        prompt.on('submit', closePrompt);
        // закрываем по esc
        $(document).on('keyup', function(e) { e.which == 27 && closePrompt(); });

        body.append( prompt );

        return prompt;
    };

    function cleanPrompt() {
        src.val('');
        height.val('');
        width.val('');
    };

    function closePrompt() {
        prompt.removeClass('visible');
        return false;
    };

    // фильтруем только цифры
    function filterNumber(e) {
        e.target.value = e.target.value.match(/\d*/)[0] || '';
    };

    function createNewImg() {
        // id – для создания _новой_ картинки
        img = $('<img>', { id: (Math.random()*10000).toFixed() });
        addImg();
    };

    function addImg() {
        messageContent = getMessageContent();
        messageContent.prepend( img );

        // по закгрузке устанавливаем оригинальный размер
        img[0].onload = function() {
            console.log(img.height + ' / ' + img.width);
            setImgSize('height', img.height);
            setImgSize('width', img.width);
        }
    };

    function updateAttr(e) {
        filterNumber(e);
        setImgSize(e.target.className, e.target.value);
    };

    function setImgSize(attr, size) {
        img.attr(attr, size + 'px');
    };

    // добавляет кнопку "вставить картинку" в toolbar
    function addImgButton() {
        button = $('<td>'
                   + '<a class="mceButton mceButtonEnabled mce_removeformat INSERT_IMG_insert-button">'
                   + '< img >'
                   + '</a>'
                   + '</td>');

        // ждём пока инициализируется toolbar
        wait = setInterval(patchEditor, 500);
    };

    function patchEditor() {
        tbar = $('.mceToolbarEndButton.mceLast');
        messageContent = getMessageContent();

        if ( tbar[0] ) {
            body.append( $('<style>').text(styles) );
            messageContent.append( $('<style>').text(stylesImg) );

            button.insertBefore( tbar );
            button.on('click', showPrompt);

            clearInterval( wait );
        }
    };

    function init() {
        toolBar
            ? addImgButton()
            : $('.b-toolbar__item_compose').on('click', addImgButton);
    };

    function getToolBar() {
        return $('.compose-send_toolbar1 tbody tr');
    };

    function getMessageContent() {
        return $('#compose-send_ifr').contents().find('body');
    };


    init();

});
