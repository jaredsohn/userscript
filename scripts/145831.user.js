// ==UserScript==
    // @name LOR Backwash
    // @description Превью и список ответов для комментариев.
    // @author Kalashnikov Ilya
    // @license CC NC SA
    // @version 0.1.3
    // @namespace http://www.linux.org.ru/*
    // @namespace https://www.linux.org.ru/*
    // @include http://www.linux.org.ru/*
    // @include https://www.linux.org.ru/*
    // ==/UserScript==
     
    /*
    var Config = {
            loadPreviousPages: false,
            loadNextPages:     false,
            persistentPopup:   false,
    }*/
     
    (function() {
            if (!document.getElementsByClassName('comment')[0] /*|| window.top != window.self*/)
                    return;
     
            /*var loadedPages = []; // сюда будут складывться линки на темы которые будут подгружены
     
            function pageNumber(url) { // вытягивает номер страницы из урла
                    return parseInt(url.match(/\d+(?:\/page(\d))?/)[1] || 0);
            }
     
            loadedPages[ pageNumber(location.href) ] = true;
            */
     
            // CSS
            var style = document.createElement('style');
            style.innerHTML = 'div#commentPreview {\
                    display:none;\
                    position:fixed;\
                    /*min-width: 500px;*/\
                    left:0\
                    top:0\
                    right:0\
                    bottom:0\
            }\
            div#commentPreview article {\
                    border:red 1px solid;\
                    box-shadow: 0 0 10px black;\
                    margin:5px;\
            }\
            iframe#pageLoader{\
                    display:none;\
            }';
            document.getElementsByTagName('head')[0].appendChild(style);
     
            var preview = document.createElement('div');
            preview.id = 'commentPreview';
            document.getElementsByClassName('comment')[0].appendChild(preview);     // Втыкаем сюда чтоб применялись все стили для комментов
     
            /*
            var iframe = document.createElement('iframe'); // потому что responseXML XHR не парсится :(
            iframe.id = 'pageLoader';
            document.body.appendChild(iframe);*/
     
            function commentPreview(id) {   // Генерирует попап
                    var comment = document.getElementById('comment-' + id);
                    if (!comment)
                            return false;
                    comment = comment.cloneNode(true);
                    comment.removeChild( comment.children[0] ); // Удаляем заголовок
                    var msg = comment.getElementsByClassName('msg_body')[0];
                    msg.removeChild( msg.getElementsByClassName('reply')[0] ); // и [Ответить на Это сообщение]
                    preview.innerHTML = '';
                    preview.appendChild(comment);
                    return true;
            };
     
            function showPreview(id) {      // Создает обработчик для конкрентного ид     // Вообще, если покопаться в event.target, ид можно и оттуда выцепить
                    return function(event) {
                            if (commentPreview(id)) {
                                    preview.style.display = 'block';        // приходится делать первым ибо иначе ширина/высота 0
                                    preview.style.left = event.clientX + 20 + 'px';
                                    preview.style.top  = Math.max(0, event.clientY - preview.scrollHeight - 10) + 'px';
                            }
                    }
            };
     
            function hidePreview() {
                    preview.style.display = 'none';
            };
     
            var links = document.querySelectorAll('.comment .msg .title a[onclick]');       // Костыльно, но хз как лучше
            for (var i =0; i<links.length; i++) {
                    var container = links[i].parentNode.parentNode;
     
                    var originalId = links[i].href.match(/.*-(\d+)/)[1];    // Комментарий на который мы нашли ответ
                    var original = document.getElementById('comment-'+originalId)
     
                    if (original) { //  Если он на текущей странице
                            var repliesList = original.getElementsByClassName('title')[0].getElementsByClassName('repliesList')[0];
                            if (!repliesList) {
                                    repliesList = document.createElement('span');
                                    repliesList.className = 'repliesList';
                                    repliesList.appendChild(document.createTextNode('Ответы: '));
                                    original.getElementsByClassName('title')[0].appendChild(repliesList);
                            }
     
                            var a = document.createElement('a');
                            a.href = links[i].href.replace(/#comment-\d+$/, '#'+container.id);      // линк на текущий комментарий
     
                            var h2 = container.getElementsByClassName('msg_body')[0].getElementsByTagName('h2')[0];
                           
                            repliesList.appendChild(document.createTextNode(" ["));
                            if (h2)
                                    a.text = h2.text;
                            else {
                                    var username = container.getElementsByClassName('msg_body')[0].getElementsByClassName('sign')[0].getElementsByTagName('a')[0];
                                    a.text = 'от ' + (username? username.text: 'anonymous');
                            }
     
                            repliesList.appendChild(a);
                            repliesList.appendChild(document.createTextNode("]"));
     
                            a.addEventListener('mouseover', showPreview( container.id.match(/comment-(\d+)/)[1] ));
                            a.addEventListener('mouseout',  hidePreview);
                    }
                    /*else {
                            var url = links[i].href;
                            if(!loadedPages[ pageNumber(url) ]) {   // если ту страницу мы ещё не грузили
                                    loadedPages[ pageNumber(url) ] = true;  // правильней это сделать в обработчике ответа, но он вызывается асинхронно :(
                                    /*var req = new XMLHttpRequest( url );
                                    console.log(url)
                                    req.open('GET', url, true);             // может тут рсс можно грузить?
                                    req.overrideMimeType('text/html');
                                    req.onreadystatechange = function() {
                                            if (req.readyState == 4) {
                                                    if (req.status == 200) {
                                                            //var dom = (new DOMParser()).parseFromString(req.responseText, "application/xml");     // responseXML пустой :(
                                                            console.log(req);
                                                            //console.log(req.getAllResponseHeaders());
                                                            console.log(req.responseXML);
                                                    }
                                                    else
                                                            console.log('Не удалось загрузить предыдущюю страницу: ' + req.statusText);
                                            }
                                    }
                                    req.send(null);         * /
                                    /*iframe.src = url;
                                    iframe.contentDocument.onload = function() {
                                            var oldComments = iframe.contentDocument.getElementsByClassName('comment')[0].cloneNode(true);
                                            oldComments.className = 'oldComment';
                                            oldComments.style.display = 'none';
                                            document.getElementsByClassName('comment')[0].appendChild(oldComments);
                                            console.log(oldComments)
                                    }
                                    iframe.src = url;       * /
                            }
                    }*/
                    links[i].addEventListener('mouseover', showPreview(originalId));
                    links[i].addEventListener('mouseout',  hidePreview)
            }
    })()