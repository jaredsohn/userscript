// ==UserScript==
// @name 1chan Extension Tools for 1chan.inach.org
// @author postman, ayakudere
// @version 1.3.3
// @icon http://1chan.inach.org/ico/favicons/1chan.ru.gif
// @include http://1chan.inach.org/*
// @grant       none
// ==/UserScript==

(function(document) {

    // Globals
    var formTextarea;
    var deletingSmiles;
    var locationPrefix;
    var hidePatterns;
    var features = ['answermap', 'hiding', 'smiles', 'markup', 'spoilers',
                    'show-hidden', 'form-settings', 'panel-hiding', 'markup-top',
                    'hide-short-news'
                   ];
    var descriptions = ['Построение карты ответов', 'Скрытие постов', 'Панель смайлов',
                        'Панель разметки', 'Раскрытие спойлеров', 'Показывать скрытые комментарии',
                        'Настройки рядом с формой', 'Убирать панель по клику', 
                        'Разметка над формой', 'Скрывать новости короче 140 символов'
                       ];
    var enabledFeatures;
    var VERSION = '100';


   /* 
    *      Replies map
    */

    function createRepliesMap() {
        
        locationPrefix = /\.inach\.org\/([^/]+)/.exec(document.URL)[1]
        var comments = document.getElementsByClassName("b-comment");
        var table = {};
        
        for(var i=0; i<comments.length; i++) {
            current_post = comments[i].id.slice(locationPrefix == 'news' ? 8 : 
                (locationPrefix.length + 9) );
            refs = comments[i].getElementsByClassName("js-cross-link");
            for(var j=0; j<refs.length; j++) {
                ref = refs[j].name.slice(locationPrefix.length + 1);
                if(typeof(table[ref]) != 'undefined')
                    table[ref].push(current_post);
                else
                    table[ref] = [current_post];
            }
        }
        for(post_num in table) {
            container = document.createElement("div");
            container.id = "answers_"+post_num;
            container.appendChild(document.createElement('p'));
            container = container.lastChild;
            container.style.margin = '0px';
            container.style.padding = '4px';
            container.style.fontSize = '0.8em';
            container.textContent = "Ответы: ";
            for(post_ref in table[post_num]) {
                link = document.createElement("a");
                link.className = "js-cross-link";
                link.href = document.URL + '#'+table[post_num][post_ref];
                link.name = locationPrefix + "/" + table[post_num][post_ref];
                link.textContent = ">>"+table[post_num][post_ref];
                link.style.fontSize = '1em';
                container.appendChild(link);
                container.innerHTML += ', ';
            }
            container.innerHTML = container.innerHTML.substring(0, container.innerHTML.length-2);
            comment = document.getElementById("comment" + 
                (locationPrefix == 'news' ? '_' : ('_' + locationPrefix + '_')) + post_num);
            if(comment)
                comment.appendChild(container.parentNode);
      }
    }
      
    function registerAutoupdateHandler() {
        if(/\.inach\.org\/news\/add/.test(document.URL))
            return;
        document.getElementsByClassName("l-comments-wrap")[0].addEventListener('DOMNodeInserted',
            function(event) {
                if(/comment/.test(event.target.id)) {
                    // Hiding
                    if(enabledFeatures.indexOf("hiding")!= -1) {
                        var match = false;
                        for(var j=0; j<hidePatterns.length; j++)
                            if(hidePatterns[j].test(event.target.textContent)) {
                                hidePost(event.target);
                                break;
                            }
                        var hideButton = event.target.getElementsByClassName('b-comment_b-info')[0]
                                        .getElementsByClassName('js-remove-button')[0];
                        hideButton.getElementsByTagName('img')[0].setAttribute("src", "http://1chan.inach.org/ico/oh-my-eyes.png");
                        hideButton.style.display = "inline-block";
                        hideButton.onclick = function() {
                            hidePost(this.parentNode.parentNode);
                            return false;
                        };
                    }
                    // Answer map
                    if(enabledFeatures.indexOf("answermap")!= -1){
                    refs = event.target.getElementsByClassName("js-cross-link");
                    for(var j=0; j<refs.length; j++) {
                        ref = refs[j].name.slice(locationPrefix.length + 1);
                        link = document.createElement("a");
                        link.className = "js-cross-link";
                        var current_post = event.target.id.slice(locationPrefix == 'news' ? 8 : 
                            (locationPrefix.length + 9) );
                        link.href = document.URL + '#' + current_post;
                        link.name = locationPrefix + "/" + current_post;
                        link.textContent = ">>" + current_post;
                        link.style.fontSize = '1em';
                        if(container = document.getElementById('answers_'+ref)) { // да, именно =
                            container = container.lastChild
                            container.innerHTML += ', ';
                            container.appendChild(link)
                        } else {
                            container = document.createElement("div");
                            container.id = "answers_" + ref;
                            container.appendChild(document.createElement('p'));
                            container = container.lastChild;
                            container.style.margin = '0px';
                            container.style.padding = '4px';
                            container.style.fontSize = '0.8em';
                            container.textContent = "Ответы: ";
                            container.appendChild(link)
                            comment = document.getElementById("comment" + 
                            (locationPrefix == 'news' ? '_' : ('_' + locationPrefix + '_')) 
                            + ref);
                            if(comment)
                                comment.appendChild(container.parentNode);
                        }
                    }
                    }
                }
            });
    }


   /*
    *      Hiding
    */ 

    function hidePosts() {
        hidePatterns = [];
        var hiddenComments = [];
        for(var key in localStorage) 
            if(/hidephrase/.test(key))
                hidePatterns.push(new RegExp(localStorage[key],"i"));
            else if(/comment_\d+/.test(key))
                hiddenComments.push(key);
        
        var hideButtons = document.getElementsByClassName('js-remove-button');
        for(var i=0; i < hideButtons.length; i++) {
            hideButtons[i].getElementsByTagName('img')[0].setAttribute("src", "http://1chan.inach.org/ico/oh-my-eyes.png");
            hideButtons[i].onclick = function() {
                hidePost(this.parentNode.parentNode);
                return false;
            }
            hideButtons[i].style.display = "inline-block";
        }
        
        var comments = document.getElementsByClassName('b-comment');
        for(var i=0; i < comments.length; i++){
            for(var j=0; j < hidePatterns.length; j++)
                if(hiddenComments.indexOf(comments[i].id)!= -1 || hidePatterns[j].test(comments[i].textContent)) {
                    hidePost(comments[i]);
                    break;
                }
        }
    }

    function hideThreads() {
        hidePatterns = [];
        for(var key in localStorage) 
            if(/hidephrase/.test(key))
                hidePatterns.push(new RegExp(localStorage[key],"i"));
            
        var threads = document.getElementsByClassName('b-blog-entry');
        for(var i=0; i < threads.length; i++) {
            var threadOpPost = threads[i].getElementsByClassName('b-blog-entry_b-body')[0].textContent;
            var threadTitle = threads[i].getElementsByClassName('b-blog-entry_b-header')[0].textContent;
            var hideShort = enabledFeatures.indexOf("hide-short-news")!= -1
            for(var j=0; j < hidePatterns.length; j++)
                if(
                    hidePatterns[j].test(threadOpPost) ||
                    hidePatterns[j].test(threadTitle)  ||
                   (hideShort && threadOpPost.length < 140)
                  ) {
                    hideThread(threads[i]);
                    break;
                }
        }   
    }
    
    function hideThread(node) {
        if(enabledFeatures.indexOf("show-hidden")!= -1) {
            node.setAttribute("class", "b-blog-entry m-hide");
            var h = node.getElementsByClassName('b-blog-entry_b-header')[0];
            h.onclick = function() {
                showThread(node);
                return false;
            }
        } else {
            node.style.display = "none";
        }
    }
    
    function showThread(node) {
        node.setAttribute("class", "b-blog-entry");
        var h = node.getElementsByClassName('b-blog-entry_b-header')[0];
        h.onclick = function() {};
    }

    function hidePost(node) {
        if(enabledFeatures.indexOf("show-hidden")!= -1) {
            node.getElementsByClassName('b-comment_b-body')[0].style.display = "none";
            var button = node.getElementsByClassName('b-comment_b-info')[0].getElementsByClassName('js-remove-button')[0];
            button.onclick = function() {
                showPost(node);
                return false;
            }
            button.getElementsByTagName('img')[0].setAttribute("src", "http://img440.imageshack.us/img440/162/ohmyeyes1.png");
        } else {
            node.parentNode.removeChild(node);
        }
        localStorage.setItem(node.id, node.id);
    }

    function showPost(node) {
        node.getElementsByClassName('b-comment_b-body')[0].style.display = "block";
        var button = node.getElementsByClassName('b-comment_b-info')[0].getElementsByClassName('js-remove-button')[0];
        button.onclick = function() {
            hidePost(node);
            return false;
        }
        button.getElementsByTagName('img')[0].setAttribute("src", "http://1chan.inach.org/ico/oh-my-eyes.png");
        localStorage.removeItem(node.id);
    }


   /* 
    *      Smiles Panel
    */

    function addTextToForm(text) {
        cursor_pos = formTextarea.selectionStart;
        var formText = formTextarea.value;
        formTextarea.value = formText.slice(0, cursor_pos)
                            + text 
                            + formText.slice(formTextarea.selectionEnd);
        formTextarea.focus();
    };

    function wrapImageLink(link) {
        if (/rghost/.test(link)) 
            return '[:' + /\d+/.exec(link)[0] + ':]';
        else
            return '[' + link + ']';
    }

    function createSmile(text, imgLink) {
      
        var image = document.createElement("img");
        var link = document.createElement("a");
      
        link.href = "#";
        link.onclick = function(e) {
            if (deletingSmiles) {
                destroyCustomSmile(this.id);
            } else {
                addTextToForm(text);
                formTextarea.focus();
            }
            e.preventDefault();
            return false;
        };
        link.title = text;
        image.src = imgLink;
        image.style.margin = "6px 3px 1px 3px";
        link.style.outline  = "none";
        link.appendChild(image);
        return link;
    }

    // Custom Images

    function createCustomImage(link) {
        
        var name = prompt("Имя для картинки:");
        if (!name)
            return false;
        var id = "image-" + name;
        
        if (localStorage.getItem(id)) {
            alert("Уже есть картинка с таким именем");
            return false;
        }
        addCustomImage(link, name);
        localStorage.setItem(id, link);
    }

    function addCustomImage(link, name) {
        
        var id = "image-" + name;
        var newImage = createButton(name, function(e) {
            if (deletingSmiles)
                destroyCustomImage(this.id);
            else {
                addTextToForm(wrapImageLink(link));
                formTextarea.focus();
            }
            e.preventDefault();
            return false;
        });
        
        newImage.onmousedown = function(e) {
            if (e.which === 2) {
                destroyCustomImage(this.id);
            }
            return false;
        };
        
        newImage.id = id;
        newImage.setAttribute("class", "add-image-button");
        
        var imageContainer = document.getElementById("image-container");
        imageContainer.appendChild(newImage);
        imageContainer.style.display = "block";
    }

    function destroyCustomImage(id) {
        localStorage.removeItem(id);
        document.getElementById("image-container").removeChild(document.getElementById(id));
        if (document.getElementsByClassName("add-image-button").length === 0) 
            document.getElementById("image-container").style.display = "none";
    }

    // Custom Smiles

    function createCustomSmile(link) {

        var id  = "smile-"+link;
        
        if (localStorage.getItem(id)) {
            alert("Такой смайлик уже добавлен");
            return false;
        }
        addCustomSmile(link)
        localStorage.setItem(id, link);
    }

    function addCustomSmile(link) {
        
        var id  = "smile-"+link;
        var newSmile = createSmile('"' + wrapImageLink(link) + '":' + link, link);
        
        newSmile.onmousedown = function(e) {
            if (e.which === 2) {
                destroyCustomSmile(this.id);
            }
            return false;
        };
        newSmile.title = "Средняя кнопка мыши для удаления";
        newSmile.id = id;
        newSmile.setAttribute("class", "add-smile-link");
        document.getElementById("smile-panel").insertBefore(newSmile,
                                                        document.getElementById("image-container"));
    }

    function destroyCustomSmile(id) {
        localStorage.removeItem(id);
        document.getElementById("smile-panel").removeChild(document.getElementById(id));
    }

    function addSmileClick(e) {
        
        var link = prompt("Ссылка на картинку или номер файла на ргхосте:");
        var image = new Image();
        
        if (!link)
            return false;
        
        if (/(\d+)\D*$/.test(link))
            var num = /(\d+)\D*$/.exec(link)[1];
        
        image.src = link;
        image.onerror = function() {
            if(num) {
                link = "http://rghost.ru/" + num + "/image.png";
                image.src = link;
            }
            image.onerror = function() {
                alert("Ошибка при загрузке картинки");
            }
        }
        image.onload = function() {
            if (image.width > 45 || image.heigth > 45) {
                createCustomImage(link);
            } else {
                createCustomSmile(link);
            }
        }
        e.preventDefault();
        return false;
    }

    function removeSmilesClick(e) {
        const redCross = "http://1chan.inach.org/ico/remove.gif";
        const whiteCross = "http://1chan.inach.org/ico/delete.gif";
        
        if (!deletingSmiles) {
            document.getElementById("remove-smiles-icon").src = whiteCross;
            deletingSmiles = true;
        } else {
            document.getElementById("remove-smiles-icon").src = redCross;
            deletingSmiles = false;
        }
        e.preventDefault();
        return false;
    }


    function createSmilePanel() {
      
        var container = document.createElement("div");
        var gifSmileList = [ "coolface", "desu", "nyan", "sobak", "trollface"];
        var pngSmileList = ["awesome", "ffuu", "okay", "rage"];
        var imageContainer = document.createElement("div");
        
        for(var i in gifSmileList) {
            var newSmile = createSmile(':'+gifSmileList[i]+':', "http://1chan.inach.org/img/" + gifSmileList[i] + ".gif"); 
            container.appendChild(newSmile);
        }
        for(var i in pngSmileList) {
            var newSmile = createSmile(':'+pngSmileList[i]+':', "http://1chan.inach.org/img/" + pngSmileList[i] + ".png"); 
            container.appendChild(newSmile);
        }
        
        var addSmileLink  = document.createElement("a");
        var addSmileImg = document.createElement("img");
        addSmileImg.src = "http://cdn1.iconfinder.com/data/icons/basicset/plus_16.png";
        addSmileLink.href = "#";
        addSmileLink.onclick = addSmileClick;
        addSmileLink.appendChild(addSmileImg);
        addSmileLink.title = "Добавить смайлик или картинку";
        
        var removeSmilesLink  = document.createElement("a");
        var removeSmilesImg = document.createElement("img");
        removeSmilesImg.src = "http://1chan.inach.org/ico/remove.gif";
        removeSmilesImg.id = "remove-smiles-icon";
        removeSmilesLink.href = "#";
        removeSmilesLink.onclick = removeSmilesClick;
        removeSmilesLink.appendChild(removeSmilesImg);
        removeSmilesLink.title = "Удалить смайлики или картинки";
        
        var controlsContainer = document.createElement("span");
        controlsContainer.style.cssFloat = "right";
        controlsContainer.style.margin = "5px";
        
        controlsContainer.appendChild(addSmileLink);
        controlsContainer.appendChild(document.createElement("br"));
        controlsContainer.appendChild(removeSmilesLink);
        
        container.appendChild(controlsContainer);
        container.style.minHeight = "50px";
        
        if(/\.inach\.org\/news\/add/.test(document.URL)) { // news/add
            container.style.width = '530px'
            container.style.border = "1px solid #999999";
            container.id = "smile-panel";
            document.getElementsByName('text_full')[0].parentNode.insertBefore(container,
                                                        document.getElementsByName('text_full')[0]);
        }
        else {
            container.style.margin = "10px";
            container.style.paddingLeft = "8px";
            container.style.border = "1px solid #CCCCCC";
            container.style.borderRadius = "5px";
            container.id = "smile-panel";
            var formBody = formTextarea.parentNode.parentNode;
            formBody.parentNode.insertBefore(container, formBody);
        }
        
        if(/\.inach\.org\/news/.test(document.URL)) {
            var images = [];
            for(var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if ((/^smile-/).test(key)) {
                    var link = localStorage.getItem(key);
                    addCustomSmile(link);
                } else if ((/^image-.+$/).test(key)) 
                    images.push(key);
            }
            
            imageContainer.id = "image-container";
            imageContainer.style.margin = "5px 6px 7px 0px";
            imageContainer.style.paddingTop = "2px";
            imageContainer.style.borderTop = "1px dashed #CCCCCC";
                
            container.appendChild(imageContainer);
                
            for(var i in images) {
                var name = /^image-(.+)$/.exec(images[i])[1];
                addCustomImage(localStorage.getItem(images[i]), name);
            }
            
            if (images.length === 0) {
                imageContainer.style.display = "none";
            }
        }
        
        if(enabledFeatures.indexOf("panel-hiding")!= -1)
            initSmilePanelHiding()
    }

    function initSmilePanelHiding() {
        
        var smilePanel = document.getElementById("smile-panel");
        var showButton = document.createElement("a");
        var showContainer = document.createElement("div");
        var hideButton = document.createElement("a");
        var hideContainer = document.createElement("div");
            
        showButton.onclick = function() {
            showSmilePanel();
            return false;
        };
        showButton.textContent = "Cмайлики и картинки";
        showButton.style.borderBottom = "1px dashed #3366CC";
        showButton.style.textDecoration = "none";
        showButton.href = "#";
        showContainer.appendChild(showButton);
        showContainer.style.display = "none";
        showContainer.style.fontSize = "0.65em";
        showContainer.id = "show-panel-button";
        
        hideButton.onclick = function() {
            hideSmilePanel();
            return false;
        };
        hideButton.textContent = "Спрятать панель";
        hideButton.style.borderBottom = "1px dashed #3366CC";
        hideButton.style.textDecoration = "none";
        hideButton.href = "#";
        hideContainer.appendChild(hideButton);
        hideContainer.style.fontSize = "0.65em";
        hideContainer.id = "hide-panel-button";
        
        if(/\.inach\.org\/news\/add/.test(document.URL)) {
            hideContainer.style.margin = "3px 0px 4px 220px";
            showContainer.style.margin = "3px 0px 4px 210px";
        } else {
            hideContainer.style.margin = "3px 0px -3px 240px";
            showContainer.style.margin = "3px 0px -3px 230px";
        }
            
        smilePanel.parentNode.insertBefore(hideContainer, smilePanel);
        smilePanel.parentNode.insertBefore(showContainer, smilePanel);
            
        if(localStorage.getItem("smile_panel") == "hidden") 
            hideSmilePanel();
    }

    function hideSmilePanel() {
        localStorage.setItem("smile_panel", "hidden");
        document.getElementById("smile-panel").style.display = "none";
        document.getElementById("show-panel-button").style.display = "block";
        document.getElementById("hide-panel-button").style.display = "none";
    }

    function showSmilePanel() {
        localStorage.setItem("smile_panel", "visible");
        document.getElementById("smile-panel").style.display = "block";
        document.getElementById("show-panel-button").style.display = "none";
        document.getElementById("hide-panel-button").style.display = "block";
    }


   /* 
    *      Markup Panel
    */

    function getSelectionText(node) {
        var start = node.selectionStart;
        var end = node.selectionEnd;
        return node.value.substring(start, end);
    }

    function wrapText(text, wrapper) {
        return wrapper + text + wrapper;
    }

    function createButton(value, onclick) {
        var button   = document.createElement("input");
        button.type  = "button";
        button.value = value;
        button.onclick = onclick;
        return button;
    }

    function wrapImageLink(link) {
        if (!link) {
            return "";
        } else if (/rghost/.test(link)) {
            return "[:" + /(\d+)\D*$/.exec(link)[1] + ":]";
        } else {
            return "[" + link + "]";
        }
    }

    function imgClick() {
      
        var link = getSelectionText(formTextarea);
      
        if (link.length > 0) {
            addTextToForm(wrapImageLink(link));
        } else {
            addTextToForm(wrapImageLink(prompt('Ссылка на изображение:')));
        }
    }

    function quoteClick() {
      
        var text  = getSelectionText(formTextarea);
        var start = formTextarea.selectionStart;
      
        if (text.length > 0) {
            var formText = formTextarea.value;
            var lines = text.split("\n");
            for(var i in lines) {
                lines[i] = ">>" + lines[i].trim() + "<<";
            }
            addTextToForm(lines.join("\n"));
            if(lines.length == 1)
                formTextarea.setSelectionRange(start + 2, start + text.length + 2);
        } else {
            text = document.getSelection().toString();
            var lines = text.split("\n");
            for(var i in lines) {
              lines[i] = ">" + lines[i].trim();
            }
            addTextToForm(lines.join("\n"));
        }
    }

    function bigBoldClick() {
      
        var text = getSelectionText(formTextarea);
        var lines = text.split("\n");
        var cursor = formTextarea.selectionEnd;
        var start = formTextarea.selectionStart;
        const stars = "\n********************************************";
      
        if (text.length > 0) {
            for(var i in lines) {
                if (lines[i] !== "") 
                    lines[i] += stars;
            }
            addTextToForm(lines.join("\n"));
        } else {
            formTextarea.value += stars;
        }
        
        formTextarea.focus();
        if(lines.length == 1 && text.length > 0)
            formTextarea.setSelectionRange(start, start + text.length);
        else
            formTextarea.setSelectionRange(cursor, cursor);
    }

    function bigImgClick() {
      
        var link = getSelectionText(formTextarea);
        
        if (link.length === 0) 
            link = prompt('Ссылка на изображение или номер файла на ргхосте:');
        if (!link) {
            formTextarea.focus();
            return false;
        }
        if (/rghost|^[^\/]*\d+[^\/]*$/.test(link)) {
            var num = /(\d+)\D*$/.exec(link)[1];
            link = "http://rghost.ru/" + num + "/image.png";
        }
      
        addTextToForm('"' + wrapImageLink(link) + '":' + link + '');
    }

    function strikeThroughClick() {
        var text = getSelectionText(formTextarea);
        addTextToForm('<s>' + text + '</s>');
    }
    
    function numListClick() {
    }
    
    function mListClick() {
    }
    
    function yobaClick() {
        var selected_text = getSelectionText(formTextarea);
        var has_selected = selected_text.length != 0;

        if(has_selected)
           addTextToForm(yobaTranslate(selected_text));
        else
           formTextarea.value = yobaTranslate(formTextarea.value)
    }

    function createMarkupPanel() {
      
        var container = document.createElement("div");
        var markup = {
            "B": ["**", "Жирный"],
            "I": ["*", "Наклонный"],
            "C": ["`", "Моноширный"],
            "%": ["%%", "Спойлер"]
        };
        
        var buttons = {
            "img": imgClick,
            "bimg": bigImgClick,
            ">": quoteClick,
            "S": strikeThroughClick,
            "BB": bigBoldClick,
            "Y": yobaClick
        };
        
        for (var k in buttons)
            container.appendChild(createButton(k, buttons[k]));

        for(var k in markup) {
            var newButton = createButton(k, function() {
                var text = getSelectionText(formTextarea);
                var start = formTextarea.selectionStart;
                var selection = formTextarea.selectionStart != formTextarea.selectionEnd;
                var m = markup[this.value][0];
                text = wrapText(text, m);
                addTextToForm(text);
                if(selection)
                    formTextarea.setSelectionRange(start, start + text.length);
                else
                    formTextarea.setSelectionRange(start + m.length, start + m.length);
                });
            container.appendChild(newButton);
        }
        
        if(/\.inach\.org\/news\/add/.test(document.URL)) {
            container.style.paddingTop = "4px";
            document.getElementsByName('text_full')[0].parentNode.insertBefore(container,
                                                        document.getElementsByName('text_full')[0])
            document.addEventListener('click', function(event){
                if(/text/.test(event.target.name))
                    formTextarea = event.target // Смена полей в news/add
                })
        } else {
            if(enabledFeatures.indexOf("markup-top") == -1) {
                container.style.display = "inline-block";
                formTextarea.parentNode.insertBefore(container, 
                                document.getElementsByClassName("b-comment-form_b-uplink")[0]);
            } else {
                container.style.marginTop = "3px";
                formTextarea.style.margin = "3px 0px 6px"
                formTextarea.parentNode.insertBefore(container, formTextarea);
            }
        }
    }


   /*
    *      Spoilers
    */
    
    function revealSpoilers() {
        var spoilers = document.getElementsByClassName('b-spoiler-text')
        for(var i = 0; i<spoilers.length; i++)
            spoilers[i].setAttribute('style', 'color:#40454B !important')
    }

   /*
    * Yoba Translator
    */
   var yoba_main = {
      'а': ["a"],
      'б': ["b"],
      'в': ["v"],
      'г': ["g"],
      'д': ["d"],
      'е': ["ye", "e"],
      'ё': ["yo"],
      'ж': ["zh"],
      'з': ["z"],
      'и': ["i", "ee"],
      'й': ["y", "j"],
      'к': ["k", "ck", "q"],
      'л': ["l"],
      'м': ["m"],
      'н': ["n"],
      'о': ["o", "ou"],
      'п': ["p"],
      'р': ["r"],
      'с': ["s"],
      'т': ["t"],
      'у': ["oo", "u"],
      'ф': ["f"],
      'х': ["kh"],
      'ц': ["c"],
      'ч': ["ch"],
      'ш': ["sh"],
      'щ': ["sh"],
      'ы': ["y", "i"],
      'э': ["e"],
      'ю': ["yu"],
      'я': ["ya"]
   };

   var yoba_ends = {
      'и': ["ey"],
      'е': ["eu"],
      'о': ["ou"]
   };

   function pickRandomElement(arr) {
      if(arr.length == 0)
         return null;
      else if(arr.length == 1)
         return arr[0];
      else
         return arr[Math.floor(Math.random() * arr.length)];
   }

   function yobaTranslate(str) {
      var result = "";

      str = str.replace(/[ьъ]/gi, "");

      for(var pos = 0; pos < str.length; pos++)
      {
         var from = str[pos];
         var to   = '';

         var is_upper = from == from.toUpperCase();
         from = from.toLowerCase();

         if(yoba_ends[from] && (!str[pos + 1] || /[\s\.,!\?]/.test(str[pos + 1])))
            to = pickRandomElement(yoba_ends[from]);
         else if(yoba_main[from])
            to = pickRandomElement(yoba_main[from]);
         else
            to = from;

         if(is_upper)
            to = to[0].toUpperCase() + to.slice(1);

         result += to;
      }

      return result;
   }

   /*
    *      Menu
    */
    
    function createMenu() {
        
        var general = document.createElement("a");
        var hidelist = document.createElement("a");
        
        general.href = "#";
        general.onclick = displayGeneralOptions;
        general.id = "general-settings-button";
        hidelist.href = "#";
        hidelist.onclick = displayHideList;
        hidelist.id = "hiding-list-button";
        if(enabledFeatures.indexOf('form-settings')!= -1) {
            var generalIcon = document.createElement("img");
            generalIcon.src = "http://cdn1.iconfinder.com/data/icons/munich/16x16/settings.png";
            general.appendChild(generalIcon);
            var regexpIcon = document.createElement("img");
            regexpIcon.src = "http://vll.java.net/images/GrammarIconRegex.gif";
            hidelist.appendChild(regexpIcon);
            var container = formTextarea.parentNode.parentNode.getElementsByTagName("div")[0];
            hidelist.style.cssFloat = "right";
            general.style.cssFloat = "right";
            general.style.margin = "0px 10px 0px 2px";
            general.title = "Настройки скрипта";
            hidelist.title = "Список скрываемых выражений";
            container.parentNode.insertBefore(general, container);
            container.parentNode.insertBefore(hidelist, container);
        } else {
            var container = document.getElementsByClassName("b-menu-panel_b-links")[0];
            general.textContent = "Настройки скрипта";
            hidelist.textContent = "Список скрываемых выражений";
            container.appendChild(general);
            container.appendChild(document.createElement("br"));
            container.appendChild(hidelist);
        }
    }

    function hideGeneralOptions() {
        var cont = document.getElementById('scriptsettings');
        cont.parentNode.removeChild(cont);
        document.getElementById('general-settings-button').onclick = displayGeneralOptions;
        return false;
    }

    function hideHideList() {
        var menu = document.getElementById('regexps').parentNode;
        menu.parentNode.removeChild(menu);
        document.getElementById('hiding-list-button').onclick = displayHideList;
        return false;
    }

    function displayGeneralOptions() {
        var container = document.createElement("div");
        document.getElementById('general-settings-button').onclick = hideGeneralOptions;
        container.id = 'scriptsettings'
        container.setAttribute("style", 'top: 5px; left:5px; position:fixed; \
        z-index: 10000; background: #EAF4FF; padding: 5px');
        for(var i = 0; i < features.length; i++) {
            var desc = document.createElement('p');
            desc.textContent = descriptions[i];
            desc.style.display = 'inline';
            desc.style.fontSize = '0.75em'
            var box = document.createElement('input');
            box.type = 'checkbox';
            box.className = 'opt';
            box.id = features[i];
            container.appendChild(box);
            container.appendChild(desc);
            container.appendChild(document.createElement('br'));
        }
        btn = document.createElement("button");
        btn.textContent = "Сохранить";
        btn.href = "#";
        btn.onclick = saveGeneralOptions;
        container.appendChild(btn);
        document.getElementsByTagName("body")[0].appendChild(container)
        for(var i = 0; i<enabledFeatures.length; i++)
            if(enabledFeatures[i] != '')
                    document.getElementById(enabledFeatures[i]).checked = true;
        return false;
    }

    function saveGeneralOptions() {
        document.getElementById('general-settings-button').onclick = displayGeneralOptions;
        enabledFeatures = [];
        var boxes = document.getElementsByClassName('opt');
        for(var i = 0; i<boxes.length; i++)
            if(boxes[i].checked)
                enabledFeatures.push(boxes[i].id);
        var str = '';
        for(var i = 0; i < enabledFeatures.length; i++)
            str += enabledFeatures[i] + ' ';
        localStorage['settings' + VERSION] = str;
        cont = document.getElementById('scriptsettings');
        cont.parentNode.removeChild(cont)
    }

    function displayHideList() {
        var container = document.createElement("div")
        document.getElementById('hiding-list-button').onclick = hideHideList;
        container.setAttribute("style", "top: 5px; left:5px; position:fixed; \
        z-index: 10000; background: #EAF4FF; border: 1px black")
        var list = document.createElement("textarea")
        list.id = "regexps"
        list.setAttribute("style", "width: 300px; height: 300px; margin:5px")
        for(var key in localStorage)
            if(/hidephrase/.test(key))
                list.value += localStorage[key] + '\n'
        var button = document.createElement("button")
        button.textContent = "Сохранить"
        button.onclick = updateRegexps;
        button.style.margin = "5px"
        container.appendChild(list)
        container.appendChild(document.createElement("br"))
        container.appendChild(button)
        document.getElementsByTagName("body")[0].appendChild(container)
        return false;
    }

    function updateRegexps() {
        document.getElementById('hiding-list-button').onclick = displayHideList;
        for(var key in localStorage)
            if(/hidephrase/.test(key))
                localStorage.removeItem(key);
        regexps = document.getElementById('regexps').value.split('\n');
        for(var i = 0; i < regexps.length; i++) {
            if(regexps[i] != "") {
                localStorage.setItem("hidephrase" + i, regexps[i]);
            }
        }
        menu = document.getElementById('regexps').parentNode;
        menu.parentNode.removeChild(menu);
    }


   /* 
    *      Main
    */

    function letTheSobakOut() {
        try {
            enabledFeatures = localStorage['settings' + VERSION].split(' ');
        } catch(keyerror) {
            enabledFeatures = features;
            var str = '';
            for(var i = 0; i < features.length; i++ )
                str += features[i] + ' ';
            localStorage['settings' + VERSION] = str;
        }
        
        formTextarea = document.getElementById("comment_form_text");
        if (!formTextarea)
            formTextarea = document.getElementsByName("text")[0];
        if (formTextarea) {
            if(enabledFeatures.indexOf("answermap")!= -1)
                createRepliesMap();
            if(enabledFeatures.indexOf("hiding")!= -1)
                hidePosts();
            registerAutoupdateHandler();
            deletingSmiles = false;
            if(enabledFeatures.indexOf("markup")!= -1)
                createMarkupPanel();
            if(enabledFeatures.indexOf("smiles")!= -1)
                createSmilePanel();
        } else
            if(enabledFeatures.indexOf("hiding")!= -1)
                hideThreads();
        if(enabledFeatures.indexOf("spoilers")!= -1)
            revealSpoilers();
        createMenu();
        
    }

    if(navigator.appName == "Opera")
        document.addEventListener('DOMContentLoaded', letTheSobakOut);
    else {
        letTheSobakOut();
    }

})(document);