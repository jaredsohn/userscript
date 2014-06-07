// ==UserScript==
// @author         azproduction
// @name           Habrahabr Sausage Navigation
// @namespace      Habrahabr
// @include        http://habrahabr.ru/*
// ==/UserScript==

//window.addEventListener('load', function () {
(function (window, document) {
    // Если доисторический браузер - выходим
    if (!document.querySelectorAll) {
        return;
    }

    // Определяем тип страницы
    var $entry = Array.prototype.slice.call(document.querySelectorAll('div.hentry')),
        isListPage = $entry.length > 1;

    /**
     * Преобразует заголовок в url
     *
     * @param {String} string
     * @returns {String}
     */
    function toUrl(string) {
        return string.replace(/(?:—|-|\/|\\)/g, ' ').replace(/<[^>]*>/g, '').replace(/\s\s/g, '').replace(/\s/g, '-').replace(/</g, '').replace(/>/g, '').replace(/"/g, '&quot;');
    }

    /**
     * Примитивный эскейпер
     *
     * @param {String} string
     * @returns {String}
     */   
    function escape(string) {
        return string.replace(/<[^>]*>/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var blocks = [],
        type,
        totalHeight = 0,
        height,
        title,
        view = '',
        id,
        topic,
        blog,
        itemClassName;

    if (isListPage) {
        // Режим - список статей (например главная)

        // Собираем блоки
        $entry.forEach(function ($item) {
            itemClassName = $item.className;

            blog = $item.querySelector('h2 .blog');

            // Если нет блога - это вопросы и ответы
            blog = blog ? blog.innerHTML : 'Q&A';

            // Получаем имя топика, вычищаем "профильный блог"
            topic = $item.querySelector('h2 .topic').innerHTML.replace('<span></span>', '');

            height = $item.clientHeight;

            type = $item.className.match(/(?:corporative|link|translation)/);
            type = type ? type[0] : 'blog';

            id = '!/';
            id += toUrl(blog);
            id += '/';
            id += toUrl(topic);

            $item.querySelector('h2 .topic').setAttribute('name', id);

            blocks.push({
                title: escape(blog ? blog + ' &rarr; ' + topic : topic),
                height: height,
                type: type,
                id: id
            });

            totalHeight += height;
        });

    } else if ($entry[0]) {
        // Режим топик

        // Собираем блоки
        var $content = $entry[0].querySelector('.content'),
            $headings = Array.prototype.slice.call($entry[0].querySelectorAll('h1, h2, h3, h4, h5, h6'));
        
        totalHeight = $content.clientHeight + 50;

        var commentsHeight = totalHeight * 0.1;
        totalHeight += commentsHeight;

        var $subBlocks = Array.prototype.slice.call($entry[0].querySelectorAll('img, code, embed, object'));
        var commentsOffsetTop = document.querySelector('#comments').offsetTop;

        $headings.forEach(function (header, index) {
            if ($headings[index + 1]) {
                height = $headings[index + 1].offsetTop - header.offsetTop;
            } else if ($headings.length === 1) {
                height = totalHeight - commentsHeight;
            } else {
                height = (totalHeight + $content.offsetTop - header.offsetTop) + header.clientHeight - commentsHeight;
            }
            
            var span = header.querySelector('span');
            title = !index ? span.innerHTML : header.innerHTML;
            if (!title) {
                title = !index ? header.querySelector('a').innerHTML : header.innerHTML;
            }

            type = header.tagName.toLowerCase();
            
            id = toUrl(title);

            header.setAttribute('id', id);

            var subBlocks = [];
            // Ищем все субблоки, который принадлежат этому блоку
            $subBlocks.forEach(function (image, blockIndex) {
                var isMatch = false;

                if (image) {
                    var imageOffsetTop = image.offsetTop,
                        imageClientHeight = image.clientHeight;

                    // Картинка идет после заголовка
                    isMatch = header.offsetTop + header.clientHeight < imageOffsetTop;

                    if (isMatch && $headings[index + 1]) {
                        // Картинка не чужая
                        isMatch = $headings[index + 1].offsetTop > imageOffsetTop + imageClientHeight;
                    }

                    // Блок не в комментах
                    isMatch = isMatch && commentsOffsetTop > imageOffsetTop + imageClientHeight;

                    if (isMatch) {
                        // Игнорируем счетчики
                        if (imageClientHeight > 1) {
                            subBlocks.push({
                                top: imageOffsetTop - header.offsetTop,
                                height: imageClientHeight,
                                type: image.tagName.toLocaleLowerCase()
                            });
                        }
                        $subBlocks[blockIndex] = null;
                    }
                }
            });

            blocks.push({
                title: escape(title),
                height: height,
                type: type,
                id: id,
                subBlocks: subBlocks
            });
        });
        
        blocks.push({
            title: 'Комментарии',
            height: commentsHeight,
            type: 'comments',
            id: 'comments'
        });
    } else {
        // Это какая-то другая страница
        return;
    }

    // Рендерим блоки
    blocks.forEach(function (block) {
        view += '<tr style="height:' + (typeof block.height === 'number' ? Math.round(block.height / totalHeight * 100) + '%' : block.height) + ';">' +
                    '<td>' +
                        '<a href="#' + block.id + '" class="navi-' + block.type +'">' +
                            '<span class="title">' + block.title + '</span>';

        if (block.subBlocks) {
            block.subBlocks.forEach(function (subBlock) {
                view += '<span class="' + subBlock.type + '" style="height:' + ~~(subBlock.height / block.height * 100) + '%;top:' + ~~(subBlock.top / block.height * 100) + '%;"></span>';
            });
        }

        view +=         '</a>' +
                    '</td>' +
                '</tr>';
    });

    // Рендерим таблицу
    view = '<table style="height:' + window.innerHeight + 'px" cellspacing="0" cellpadding="1">' + view + '</table>';

    // Цвета блоков
    var style = '<style>' +
                    '#habr-sausage-navi table{opacity:0.3;}' +
                    '#habr-sausage-navi table:hover{opacity:1;}' +
                    '#habr-sausage-navi table:hover a{width:16px;}' +
                    '#habr-sausage-navi table a span.img {' +
                        'left: 2px;' +
                        'width: 2px;' +
                        'position: absolute;' +
                        'border: solid 1px #ff6;' +
                        'display: inline-block;' +
                    '}' +
                    '#habr-sausage-navi table a span.code {' +
                        'left: 2px;' +
                        'width: 4px;' +
                        'position: absolute;' +
                        'border: solid 1px #6f6;' +
                        'display: inline-block;' +
                    '}' +
                    '#habr-sausage-navi table a span.object, #habr-sausage-navi table a span.embed {' +
                        'left: 2px;' +
                        'width: 4px;' +
                        'position: absolute;' +
                        'border: solid 1px #66f;' +
                        'display: inline-block;' +
                    '}' +
                    '#habr-sausage-navi table a span.title{' +
                        'background: #FFFFFF;' + 
                        'border: 1px solid #999999;' + 
                        'border-radius: 5px;' +
                        '-o-border-radius: 5px;' +
                        '-moz-border-radius: 5px;' +
                        '-webkit-border-radius: 5px;' + 
                        'box-shadow: 2px 2px 2px #DDDDDD;' +
                        '-o-box-shadow: 2px 2px 2px #DDDDDD;' +
                        '-moz-box-shadow: 2px 2px 2px #DDDDDD;' +
                        '-webkit-box-shadow: 2px 2px 2px #DDDDDD;' + 
                        'color: #333333;' + 
                        'display: none;' + 
                        'font-size: 10px;' + 
                        'margin-left: 20px;' + 
                        'padding: 4px;' + 
                        'position: absolute;' +
                        'width: auto;' +
                        'width: 200px;' +
                        'overflow: hidden;' + 
                    '}' +
                    
                    '#habr-sausage-navi table tr:last-child span.title{margin-top:-15px;}' +
                    
                    '#habr-sausage-navi table a:hover span.title{display:inline-block;}' +

                    '#habr-sausage-navi table:hover a span.img{width: 10px;}' +
                    '#habr-sausage-navi table:hover a span.code{width: 10px;}' +
                    '#habr-sausage-navi table:hover a span.object{width: 10px;}' +
                    '#habr-sausage-navi table:hover a span.embed{width: 10px;}' +

                    '#habr-sausage-navi a{' +
                        'position: relative;' +
                        'overflow: visible;'+  
                        'height:100%;width:100%;display:block;text-decoration:none;width:8px;' +
                        '-webkit-border-radius: 0 4px 4px 0;-o-border-radius: 0 4px 4px 0;-moz-border-radius: 0 4px 4px 0;border-radius: 0 4px 4px 0;' +  
                    '}' +


                    // Для списка статей
                    '#habr-sausage-navi a.navi-corporative{background: #8277A3;}' +
                    '#habr-sausage-navi a.navi-link{background: #749F79;}' +
                    '#habr-sausage-navi a.navi-translation{background: #333;}' +
                    '#habr-sausage-navi a.navi-blog{background: #6DA3BD;}' +

                    '#habr-sausage-navi a.navi-corporative:hover{background: #ABA4C2;}' +
                    '#habr-sausage-navi a.navi-link:hover{background: #84B18A;}' +
                    '#habr-sausage-navi a.navi-translation:hover{background: #555;}' +
                    '#habr-sausage-navi a.navi-blog:hover{background: #A0C5D4;}' +

                    // Для топика
                    '#habr-sausage-navi a.navi-comments{background: #F00;}' +
                    '#habr-sausage-navi a.navi-comments span{margin-top:-15px;}' +
                    '#habr-sausage-navi a.navi-h2{background: #333;}' +
                    '#habr-sausage-navi a.navi-h4{background: #666;}' +
                    '#habr-sausage-navi a.navi-h5{background: #999;}' +
                    '#habr-sausage-navi a.navi-h6{background: #CCC;}' +

                    '#habr-sausage-navi a.navi-comments:hover{background: #D00;}' +
                    '#habr-sausage-navi a.navi-h2:hover{background: #555;}' +
                    '#habr-sausage-navi a.navi-h4:hover{background: #888;}' +
                    '#habr-sausage-navi a.navi-h5:hover{background: #AAA;}' +
                    '#habr-sausage-navi a.navi-h6:hover{background: #EEE;}' +
                '</style>';

    // Запихиваем таблицу с враппером в DOM
    var $navi = document.createElement('div');
        $navi.setAttribute('id', 'habr-sausage-navi');
        $navi.setAttribute('style', 'position: fixed; left: -1px; top: 0;z-index:1000;');

    $navi.innerHTML = style + view;
    document.body.appendChild($navi);

    var $table = $navi.querySelector('table');

    // Наблюдаем ресайз
    window.addEventListener('resize', function () {
        $table.style.height = window.innerHeight + 'px';
    }, false);

}(window, document));
//}, false);