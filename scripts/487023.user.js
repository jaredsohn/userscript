// ==UserScript==
// @name       Lepro Total Comments v2
// @description  lepro total comments v2 for fictional and not real leprosorium worls
// @license      MIT
// @copyright  2014+, itspoma
// ==/UserScript==

var pluginId = 'lepro-total-comments-v2';
var defaultMode = 'allall';
var viewModeCookie = pluginId + '-view-mode';

var modes = {
    'all': {
        title: 'все',
        isMatch: function (comment) {
            if (comment.body.length > 60) {
                return true;
            }
            if (comment.rating > 5) {
                return true;
            }

            var stopWords = ['inbox', 'инбокс', 'инбоск',],
                stopWord, i;

            for (i=0; i<stopWords.length; i++) {
                stopWord = stopWords[i];

                if (comment.body.indexOf(stopWord) !== -1) {
                    return false;
                }
            }

            return true;
        }
    },

    'newcomment': {
        title: 'новые',
        isMatch: function (comment) {
            return comment.el.classList.contains('new');
        }
    },

    'image': {
        title: 'с картинками',
        isMatch: function (comment) {
            return comment.body.indexOf('<img ') !== -1;
        }
    },

    'link': {
        title: 'ссылки',
        isMatch: function (comment) {
            return comment.body.indexOf('<a ') !== -1;
        }
    },

    'nice': {
        title: 'клеви',
        isMatch: function (comment) {
            if (comment.rating <= 0) {
                return true;
            }
            
            if (comment.rating >= 100) {
                return true;
            }
            
            return false;
            
            //return ( (comment.rating/standard_deviation) >= 0.8 ) ? 1 : 0;
        }
    },

    'mine': {
        title: 'мои',
        isMatch: function (comment) {
            return comment.el.classList.contains('mine');
        }
    },

    'author': {
        title: 'по автору:',
        render: function (containerEl) {
            var filterByAuthor = function() {
                var author = document.getElementById('ltc-author-name').value;
                if (author.length < 0) return;
                
                setViewMode('author');
            };
            
            var authorEl = document.createElement('INPUT');
            authorEl.id = 'ltc-author-name';
            authorEl.style.width = '80px';
            authorEl.style.marginLeft = '3px';
            authorEl.style.padding = '3px';
            authorEl.style.font = '11px Verdana';
            authorEl.setAttribute('placeholder', 'ник автора');
            authorEl.addEventListener("change", function(event) { filterByAuthor(); return false; });
            authorEl.addEventListener("keypress", function(event) {
                if (event.keyCode != 13) return false;
                filterByAuthor();
            });
            
            containerEl.appendChild(authorEl);
            
            return containerEl;
        },
        showCount: false,
        tooltip: 'Показать комментарии только этого юзернейма (можно указать номер)',
        isMatch: function (comment) {
            var authorValue = document.getElementById('ltc-author-name').value;
            if (!authorValue) return true;
            
            return comment.author === authorValue;
        }
    },

    'allall': {
        title: 'все-все',
        isMatch: function (comment) {
            return true;
        }
    }
};

// 

var gc = function (n) { return document.getElementsByClassName(n); },
    insertAfter = function (where, what) { where.parentNode.insertBefore(what, where.nextSibling); },
    removeElement = function (el) { el.parentNode.removeChild(el); },
    setCookie = function(k,v,path) { path = path || '/'; document.cookie=k+'='+escape(v)+'; path='+path+';'; },
    getCookie = function(k) { v = document.cookie.match(new RegExp(k+'=(.+?);')); if (!v) return null; return unescape(v[1]);  }
;

var getAllComments = function () {
    return document.getElementsByClassName('comment');
};

var parseComment = function (commentEl) {
    return {
        el: commentEl,
        body: commentEl.getElementsByClassName('c_body')[0].innerHTML,
        rating: commentEl.getElementsByClassName('vote_result')[0].innerText,
        author: commentEl.getElementsByClassName('c_user')[0].innerText
    };
};

// Рисуем панельку с кнопками вызова режима фильтрации
var createPanel = function () {
    var panelEl = document.getElementById(pluginId);
    if (panelEl) {
        removeElement(panelEl);
    }

    var panelEl = document.createElement('div');
    panelEl.id = pluginId;
    panelEl.style.marginTop = '-15px';
    panelEl.style.marginBottom = '15px';
    panelEl.style.padding = '5px 10px 8px 5px';
    panelEl.style.background = '#F8F8F8';

    var introEl = document.createElement('span');
    introEl.style.marginRight = '10px';
    introEl.innerText = 'Показать комментарии:';
    panelEl.appendChild(introEl);

    var comments = getAllComments();
    
    var counter = {};

    for (i = 0; i < comments.length; i++) {
        var comment = comments[i];

        for (var modeName in modes) {
            var mode = modes[modeName];

            if (mode.showCount === false) {
                continue;
            }

            if (typeof counter[modeName] == 'undefined') {
                counter[modeName] = 0;
            }

            if (mode.isMatch(parseComment(comment)) === true) {
                counter[modeName]++;
            }
        }
    }

    var modeName;
    for (modeName in modes) {
        var mode = modes[modeName];

        var containerEl = document.createElement('span');
        containerEl.id = 'ltc-container-' + modeName;
        containerEl.className = 'ltc-container';

        var linkEl = document.createElement('span');
        linkEl.style.cursor = 'pointer';
        linkEl.style.textDecoration = 'none';
        linkEl.style.color = '#888';
        linkEl.style.borderBottom = '1px dotted';
        if (modeName !== 'all') {
            linkEl.style.marginLeft = '15px';
        }

        linkEl.className = 'ltc-mode';
        linkEl.id = 'ltc-mode-' + modeName;
        
        linkEl.appendChild(document.createTextNode(mode.title));
        linkEl.addEventListener("click", function (ev) { setViewMode(ev.target.id.replace('ltc-mode-', '')); return false; }, false);

        if (typeof mode.tooltip !== 'undefined') {
            linkEl.setAttribute('title', mode.tooltip);
        }

        containerEl.appendChild(linkEl);

        if (mode.showCount !== false) {
            var count = counter[modeName] || '0';

            var countEl = document.createElement('span');
            countEl.style.marginLeft = '3px';
            countEl.style.background = '#EEE';
            countEl.style.padding = '4px';
            countEl.style.borderRadius = '5px';
            countEl.style.font = '10px Verdana';

            countEl.className = 'ltc-count';
            countEl.appendChild(document.createTextNode(count));
            countEl.addEventListener("click", function (ev) { setViewModeForNew(ev.target.hash.replace('#ltc-', '')); return false; }, false);

            containerEl.appendChild(countEl);
        }

        if (typeof mode.render !== 'undefined') {
            containerEl = mode.render(containerEl);
        }

        panelEl.appendChild(containerEl);
    }

    insertAfter(gc('b-comments_controls')[0], panelEl);
};

var appendAuthorsSearchLink = function() {
    var comments = getAllComments();
    
    for (i = 0; i < comments.length; i++) {
        var commentEl = comments[i];
        var comment = parseComment(comments[i]);
 
        var answerEl = commentEl.getElementsByClassName('c_answer')[0];
        
        var findAuthorEl = document.createElement('span');
        findAuthorEl.innerText = 'коментарии';
        findAuthorEl.style.borderBottom = '1px solid';
        findAuthorEl.style.marginLeft = '5px';
        findAuthorEl.style.marginRight = '5px';
        findAuthorEl.style.cursor = 'pointer';
        findAuthorEl.setAttribute('data-author', comment.author);
        
        findAuthorEl.addEventListener("click", function (ev) {
            document.getElementById('ltc-author-name').value = ev.target.getAttribute('data-author');
            setViewMode('author');
            return false;
        }, false);
        
        insertAfter(answerEl, findAuthorEl);
    }
}

var resetPanel = function () {
    var selectedMode = getViewMode();
    
    var containerEl = document.getElementById('ltc-container-' + selectedMode);

    if (containerEl) {
        containerEl.classList.remove('selected');
        
        var linkEl = containerEl.getElementsByClassName('ltc-mode')[0];
        linkEl.classList.remove('selected');
        linkEl.style.color = '#888';
        linkEl.style.borderBottom = '1px dotted';
        
        var countEl = containerEl.getElementsByClassName('ltc-count')[0];
        if (countEl) {
            countEl.classList.remove('selected');
            countEl.style.background = '#EEE';
        }
    }
};

var setViewModeForNew = function (key) {
};

var getViewMode = function () {
    var panelEl = document.getElementById(pluginId);
    
    var containerEls = panelEl.getElementsByClassName('ltc-container');

    for (var i=0; i<containerEls.length; i++) {
        var containerEl = containerEls[i];

        if (containerEl.classList.contains('selected') === true) {
            return containerEl.id.replace('ltc-container-', '');
        }
    }
    
    return defaultMode;
}

var setViewMode = function (modeName) {
    var mode = modes[modeName];
    if (!mode) return;
    
    var selectedMode = getViewMode();
    if (mode === selectedMode) return;
    
    var containerEl = document.getElementById('ltc-container-' + modeName);
    if (!containerEl) return;
    
    resetPanel();
    
    if (modeName == 'author') {
        var authorValue = document.getElementById('ltc-author-name').value;
        location.hash = '#ltc-author-' + authorValue;
    }
    else {
        location.hash = '#ltc-' + modeName;
    }
    //setCookie(viewModeCookie, modeName, location.pathname);
    
    containerEl.classList.add('selected');

    var linkEl = containerEl.getElementsByClassName('ltc-mode')[0];
    linkEl.classList.add('selected');
    linkEl.style.color = 'black';
    linkEl.style.borderBottom = 'none';

    var countEl = containerEl.getElementsByClassName('ltc-count')[0];
    if (countEl) countEl.classList.add('selected');
    if (countEl) countEl.style.background = '#DFDFDF';

    var comments = getAllComments();
    
    for (i = 0; i < comments.length; i++) {
        var comment = comments[i];
        if (mode.isMatch(parseComment(comment)) !== true) {
            comment.style.display = 'none';
        }
        else {
            comment.style.display = 'block';
        }
    }
};

// 

var work = function() {
     createPanel();
     appendAuthorsSearchLink();

     if (location.hash.search('#ltc-') !== -1) {
         var mode = location.hash.replace('#ltc-', '');

         if (mode.search('author-') === 0) {
             document.getElementById('ltc-author-name').value = mode.replace('author-', '');
             setViewMode('author');
         }
         else {
             setViewMode(mode);
         }
     }
     else {
         setViewMode(defaultMode);
     }
};

(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }

    if (/leprosorium.ru\/comments/.test(w.location.href)) {
        work();
    }
})(window);