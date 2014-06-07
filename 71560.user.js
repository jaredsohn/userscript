// ==UserScript==
// @author: ymi@ya.ru
// @name           DiaryPlugin
// @namespace      $diaryPlugin
// @include http://diary.ru/*
// @include http://*.diary.ru/*
// @title: Some useful utilites for Diary.RU
// @description: Some useful utilites for Diary.RU
// @version: 1.0.10
// ==/UserScript==

var $diaryPlugin = {
    filters : [
        {enable: 0, name: "поднятая запись", filters: [
            {regExp: 0, pattern: "запись создана"}
        ]},
        {enable: 0, name: "куклы", filters: [
            {regExp: 0, pattern: "мейк"},
            {regExp: 0, pattern: "мэйк"},
            {regExp: 0, pattern: "бжд"},
            {regExp: 0, pattern: "Soom"},
            {regExp: 0, pattern: "клир"}
        ]},
        {enable: 0, name: "слэш", filters: [
            {regExp: 0, pattern: "косплей"},
            {regExp: 0, pattern: "яой"},
            {regExp: 0, pattern: "yaoi"},
            {regExp: 0, pattern: "пейринг"},
            {regExp: 0, pattern: "peyring"},
            {regExp: 0, pattern: "pg-13"},
            {regExp: 0, pattern: "pg-18"},
            {regExp: 0, pattern: "pg-24"},
            {regExp: 0, pattern: "nc-13"},
            {regExp: 0, pattern: "nc-18"},
            {regExp: 0, pattern: "nc-24"},
            {regExp: 0, pattern: "слеш"},
            {regExp: 0, pattern: "B-13"},
            {regExp: 1, pattern: "\\sфик(?|.|..)\\s"}
        ]},
        {enable: 0, name: "флешмобы, тесты, анкеты", filters: [
            {regExp: 0, pattern: "aeterna"},
            {regExp: 0, pattern: "флешмоб"},
            {regExp: 0, pattern: "флэшмоб"},
            {regExp: 0, pattern: "flashmob"},
            {regExp: 1, pattern: "\\sвы\\s*отмечаетесь\\s*в\\s*ком*ент"},
            {regExp: 1, pattern: "\\sпсихологич.*\\sтест"},
            {regExp: 0, pattern: "осальте"},
            {regExp: 0, pattern: "осалить"},
            {regExp: 0, pattern: "осалил"},
            {regExp: 0, pattern: "uborshizzza"},
            {regExp: 1, pattern: "\\sя\\s.*\\sдаю\\s.*\\s\\d*\\s.*и\\s"},
            {regExp: 0, pattern: "Пройти тест"}
        ]},
        {enable: 0, name: "остальное", filters: [
            {regExp: 0, pattern: "Проголосуй за цитату"},
            {regExp: 0, pattern: "пикспам"}
        ]}
    ],
    init : function(doc) {
        jQuery.noConflict();

        if (doc.__dp$already) return;
        else doc.__dp$already = true;

        try {
            var d = doc, context = this;
            jQuery(doc).ready(function() {
                context.addMyDesignTool(d);
                context.extendPage(d);
                try {
                    context.addFilterEditorTool(d);
                } catch(e) {
                    $diaryPlugin.debug(e);
                }
                context.applyFilters(doc);
            });
        } catch(e) {
            doc.__dp$already = false;
            $diaryPlugin.debug(e);
            throw e;
        }
    },
    debug : function(e) {
//        var msg = e.message;
//        msg += "\n";
//        if (e.stack) msg += e.stack;
//        alert(msg);
    },
    addFilterEditorTool : function(doc) {
        // restore
        var filters = unsafeWindow.localStorage ? unsafeWindow.localStorage['blockFilterSettings diary.ru'] : null;
        if (filters) this.filters = (eval(filters));

        var check = jQuery(doc).find('#writeThisDiary');
        if (check.length < 1) return;

        var action = jQuery('<a href="javascript:;">Мои фильтры</a>');
        action.appendTo(jQuery('<li id="editMyFilters"></li>').insertBefore(check));

        var context = this;

        var pane = jQuery('<div class="settingsPane"><style>.filterEnabled div.filterGroupHead{background-color:#506050;color:white;} .filterDisabled div.filterGroupHead{background-color:#605050;color:white;} .filterEnabled{background-color:#f0fff0;} .filterDisabled{background-color:#fff0f0;} div.settingsPane div,div.settingsPane span,div.settingsPane td,div.settingsPane input{font-size:x-small;font-family:sans-serif;font-weight:normal;font-style:normal;text-decoration:none;color:black;}</style><div style="position:fixed;top:0;left:0;bottom:0;right:0;background-color:#000000;opacity:0.6;"><br/></div><div style="position:fixed;left:100px;right:100px;top:50px;bottom:50px;"><div style="color:white;font-size:x-large;font-weight:bolder;padding:0;padding-bottom:1px;margin:0;text-align:left;float:left;">настройка фильтров:</div><div style="text-align:right;"><span class="closeAction" style="font-size:large;font-weight:bolder;color:#ffc0c0;cursor:pointer;">закрыть</span><span class="saveAction" style="font-size:large;font-weight:bolder;color:#ffffc0;cursor:pointer;">&nbsp; сохранить</span></div><div style="background-color:white;position:fixed;left:100px;right:100px;top:60pt;bottom:50pt;overflow-y:auto;margin:0;padding:2pt;text-align:left;" class="contentPane"></div></div></div>');
        pane.appendTo(jQuery(doc).find('body'));
        pane.hide();

        var contentPane = pane.find("div.contentPane");
        var closeAction = pane.find("span.closeAction");
        var saveAction = pane.find("span.saveAction");

        function enableSaveAction() {
            saveAction.show()
        }

        var body = jQuery(doc).find('body');
        var st = body.scrollTop();

        function hideForm() {
            saveAction.hide();
            contentPane.children("*").remove();
            pane.hide();
            filters = (eval(unsafeWindow.JSON.stringify(context.filters)));
            try {
                body.scrollTop(st - 10);
            } catch(e) {
            }
            try {
                body.scrollTop(st + 10);
            } catch(e) {
            }
            try {
                body.scrollTop(st);
            } catch(e) {
            }
            st = body.scrollTop();
        }

        function showForm() {
            hideForm();

            var p = jQuery('<form action="javascript:;"></form>').appendTo(contentPane);

            function addFilter(g, f) {
                var d = jQuery('<div class="filter" id="filterGroup' + g + 'id' + f + '">RegExp:&nbsp;</div>').appendTo(p.find("#filterGroup" + g));

                var di = jQuery('<input class="filterIsRegExp" type="checkbox">').appendTo(d);
                di[0].checked = !!filters[g].filters[f].regExp;
                di.click(function() {
                    var di = jQuery(this);
                    var d = di.parents("div.filter");
                    var g = d[0].id.split("filterGroup")[1];
                    var f = g.split("id")[1];
                    g = g.split("id")[0];
                    if (this.checked) {
                        if (filters[g].filters[f].length < 1) {
                            alert("строка с регулярным выражением не может быть пустой");
                            this.checked = false;
                        } else {
                            try {
                                new RegExp(filters[g].filters[f].pattern, "i");
                            } catch(e) {
                                alert("неверный синтаксис регулярного выражения: " + filters[g].filters[f].pattern);
                                this.checked = false;
                            }
                        }
                    }

                    filters[g].filters[f].regExp = this.checked;
                    enableSaveAction();
                });

                jQuery('<strong>&nbsp;</strong>').appendTo(d);
                di = jQuery('<input class="filterPattern" type="text" size="40">').appendTo(d);
                di.val(filters[g].filters[f].pattern);
                di.click(enableSaveAction);
                di.change(function() {
                    enableSaveAction();
                    var di = jQuery(this);
                    var d = di.parents("div.filter");
                    var g = d[0].id.split("filterGroup")[1];
                    var f = g.split("id")[1];
                    g = g.split("id")[0];
                    if (filters[g].filters[f].regExp) {
                        try {
                            new RegExp(di.val(), "i");
                        } catch(e) {
                            alert("неверный синтаксис регулярного выражения: " + di.val());
                            d.find(".filterIsRegExp").checked(false);
                        }
                    }
                    filters[g].filters[f].pattern = di.val();
                });

                jQuery('<strong>&nbsp;</strong>').appendTo(d);
                di = jQuery('<input class="filterButton" type="button" value="Удалить">').appendTo(d);
                di.click(function() {
                    enableSaveAction();
                    var di = jQuery(this);
                    var d = di.parents("div.filter");
                    var g = d[0].id.split("filterGroup")[1];
                    var f = g.split("id")[1];
                    g = g.split("id")[0];
                    filters[g].filters[f] = false;
                    d.remove();
                });
            }

            function addGroup(g) {
                var r = jQuery('<div class="filterGroup" id="filterGroup' + g + '"/>').prependTo(p);

                for (var f = 0; f < filters[g].filters.length; f++) addFilter(g, f);

                var t = jQuery('<div class="filterGroupHead"><strong>Группа фильтров:&nbsp;</strong></div>').prependTo(r);
                var ti = jQuery('<input type="text" size="40" class="groupName">').appendTo(t);
                ti.val(filters[g].name);
                ti.click(enableSaveAction);
                ti.change(function() {
                    enableSaveAction();
                    var ti = jQuery(this);
                    var r = ti.parents("div.filterGroup");
                    var g = r[0].id.split("filterGroup")[1];
                    filters[g].name = ti.val();
                });

                jQuery('<strong>&nbsp;</strong>').appendTo(t);
                ti = jQuery('<input class="filterButton" type="button">').appendTo(t);
                if (filters[g].enable) {
                    r.addClass("filterEnabled");
                    ti.val("Выключить группу");
                } else {
                    r.addClass("filterDisabled");
                    ti.val("Включить группу");
                }
                ti.click(function() {
                    enableSaveAction();
                    var ti = jQuery(this);
                    var r = ti.parents("div.filterGroup");
                    var g = r[0].id.split("filterGroup")[1];
                    filters[g].enable = !filters[g].enable;
                    if (filters[g].enable) {
                        r.removeClass("filterDisabled");
                        r.addClass("filterEnabled");
                        ti.val("Выключить группу");
                    } else {
                        r.removeClass("filterEnabled");
                        r.addClass("filterDisabled");
                        ti.val("Включить группу");
                    }
                });

                jQuery('<strong>&nbsp;</strong>').appendTo(t);
                ti = jQuery('<input class="filterButton" type="button" value="Удалить группу">').appendTo(t);
                ti.click(function() {
                    enableSaveAction();
                    var ti = jQuery(this);
                    var r = ti.parents("div.filterGroup");
                    var g = r[0].id.split("filterGroup")[1];
                    filters[g] = false;
                    r.remove();
                });

                jQuery('<strong>&nbsp;</strong>').appendTo(t);
                ti = jQuery('<input class="filterButton" type="button" value="Добавить фильтр">').appendTo(t);
                ti.click(function() {
                    enableSaveAction();
                    var ti = jQuery(this);
                    var r = ti.parents("div.filterGroup");
                    var g = r[0].id.split("filterGroup")[1];
                    var f = filters[g].filters.length;
                    filters[g].filters[f] = {regExp: 0, pattern: ""};
                    addFilter(g, f);
                });
            }

            for (var g = 0; g < filters.length; g++) addGroup(g);

            var t = jQuery('<div class="filterGroup"/>').prependTo(p);
            t = jQuery('<div class="filterGroupHead"></div>').appendTo(t);
            t = jQuery('<input class="filterButton" type="button" value="Добавить новую группу">').appendTo(t);
            t.click(function() {
                enableSaveAction();
                var g = filters.length;
                filters[g] = {enable: 1, name: "Группа (" + g + ")", filters:[]};
                addGroup(g);
            });

            pane.show();
        }

        closeAction.click(function() {
            if (saveAction.css("display") == 'block') {
                if (confirm("закрыть без сохранения?")) {
                    hideForm();
                }
            } else hideForm();
        });

        saveAction.click(function() {
            // store filters:
            context.filters = [];
            for (var i = 0; i < filters.length; i++)
                if (filters[i]) {
                    var fg = {enable: filters[i].enable, name: filters[i].name, filters:[]};
                    for (var j = 0; j < filters[i].filters.length; j++)
                        if (filters[i].filters[j])
                            if (filters[i].filters[j].pattern.length > 0)
                                fg.filters[fg.filters.length] = filters[i].filters[j];
                    context.filters[context.filters.length] = fg;
                }

            var stored = unsafeWindow.JSON.stringify(context.filters);
            if (unsafeWindow.localStorage) {
                unsafeWindow.localStorage['blockFilterSettings diary.ru'] = stored;
            } else {
                alert('Ваш браузер не поддерживает сохранение.\nВы можете самостоятельно изменить скрипт, заменив значение filters : {...} на:\nfilters : stored');
            }

            hideForm();
        });

        action.click(showForm);
    },
    applyFilters : function(doc, parentDoc) {
        if (!parentDoc) parentDoc = doc;
        if (!this.blockCounter) this.blockCounter = 0;

        var posts = jQuery(doc).find('div.postInner div.paragraph');
        for (var i = 0; i < posts.length; i++) {
            var post = jQuery(posts[i]);
            var text = posts[i].innerHTML.toLowerCase();
            for (var g = 0; g < this.filters.length; g++)
                if (this.filters[g].enable) {
                    var group = this.filters[g];
                    var filterResult = false;
                    for (var f = 0; f < group.filters.length; f++) {
                        var test;
                        if (group.filters[f].regExp) {
                            try {
                                if (!(group.filters[f].regExp instanceof RegExp))
                                    group.filters[f].regExp = new RegExp(group.filters[f].pattern, 'i');
                                test = !!text.match(group.filters[f].regExp);
                            } catch(e) {
                                $diaryPlugin.debug(e);
                            }
                        } else {
                            test = text.indexOf(group.filters[f].pattern.toLowerCase()) >= 0;
                        }

                        if (test) {
                            if (!filterResult) filterResult = "<strong>" + group.name + "</strong>: ";
                            else  filterResult += "; ";
                            filterResult += group.filters[f].pattern;
                        }
                    }
                    if (filterResult) {
                        this.blockCounter++;
                        var blockId = 'blocked' + this.blockCounter;
                        var action = jQuery('<a href="#' + blockId + '" class="diaryFilterGroup">[' + filterResult + ']</a>');
                        post.wrapInner('<div id="div' + blockId + '"  class="diaryFilterBlock" style="display:none;"/>');
                        action.prependTo(post);
                        action.click(function() {
                            var post = jQuery(parentDoc).find('#div' + this.href.split('#')[1]);
                            if (post.css('display') == "block") {
                                post.css('display', 'none');
                            } else {
                                post.css('display', 'block');
                            }
                        });
                    }
                }
        }
    },
    extendPage : function(doc) {
        var pg = jQuery(doc).find('#pageBar');
        if (pg.length < 1) return;

        var pagePfx = "";
        var pageSfx = "";

        function getFrom(href) {
            pagePfx = href.substring(0, href.indexOf("from=") + 5);
            var from = href.substring(href.indexOf("from=") + 5);
            var i = from.indexOf("&");
            if (i > 0) {
                pageSfx = from.substring(i);
                from = from.substring(0, i);
            }
            if (from.length) {
                try {
                    from = 1 * from;
                } catch(e) {
                    from = 0;
                }
            }
            return from;
        }

        // pages
        var nonCommentPage = doc.location.href.toLowerCase().indexOf(".htm") < 0;
        var cs = nonCommentPage ? jQuery(doc).find('div.singlePost:first') : jQuery(doc).find('#commentsArea_title').next();
        var pager = pg.find('tr:not(.pages_str) > td').children('*');
        var currentPage = false;
        var lastPage = 1;
        var pt = false;
        var pSize = false; // messages on page
        var pages = [];
        for (var i = 0; i < pager.length - 1; i++) {
            if (pager[i].tagName.toLowerCase() == "a") {
                var title = pager[i].innerHTML;
                if (title && title.indexOf("…") < 0) {
                    var rP = "rP" + title;
                    var href = "#rPi" + title;
                    jQuery(pager[i]).addClass(rP + "a");
                    var link = jQuery('<a name="rPi' + title + '"/><div class="restorePage ' + rP + '"><a href="' + href + '" class="' + rP + '">[раскрыть страницу №' + title + ']</a></div>');
                    pages[pages.length] = {page:title, href:pager[i].href, link:link, rP:rP};
                    pager[i].href = href;
                    if (currentPage) {
                        link.insertBefore(pg);
                        if (!pSize) if (pages.length > pt + 1) {
                            pSize = getFrom(pages[pages.length - 1].href) - getFrom(pages[pages.length - 2].href);
                        }
                    } else {
                        link.insertBefore(cs);
                        pt = title;
                    }
                    if (lastPage < 1 * title) lastPage = 1 * title;
                }
            } else {
                currentPage = 1 * pt + 1;
                if (pages.length > 2) {
                    pSize = getFrom(pages[pages.length - 1].href) - getFrom(pages[pages.length - 2].href);
                }
                pt = pages.length;
                if (lastPage < 1 * pt) lastPage = 1 * pt;
            }
        }

        var elmPrev = jQuery('<a name="elmPrev"/>');
        elmPrev.insertBefore(cs);
        var elmNext = jQuery('<a name="elmNext"/>');
        elmNext.insertBefore(pg);

        // get page
        function getPage(p) {
            jQuery.get(p.href, function(data) {
                try {
                    var ipoint = p.link[0];
                    if (!ipoint) return;
                    ipoint = jQuery(ipoint);
                    p.link = false;

                    var dataObj = jQuery(data);
                    context.applyFilters(dataObj, doc);

                    var elms = dataObj.find(includeSelector);
                    for (var e = 0; e < elms.length; e++) {
                        try {
                            if (elms[e].id) {
                                if (!ddoc.find('#' + elms[e].id).length) {
                                    ipoint = jQuery(elms[e]).insertAfter(ipoint);
                                }
                            } else {
                                ipoint = jQuery(elms[e]).insertAfter(ipoint);
                            }
                        } catch(ex) {
                            throw {message: '#' + elms[e].id + '\n' + ex};
                        }
                    }
                    jQuery("." + p.rP).css("display", "none").remove();
                    jQuery("." + p.rP + "a").replaceWith('<strong>' + p.page + "</strong>");

                    elmNext.remove();
                    elmNext = jQuery('<a name="elmNext"/>');
                    elmNext.insertBefore(pg);
                } catch(e) {
                    $diaryPlugin.debug(e);
                    alert("error on page extends: " + unsafeWindow.JSON.stringify(e));
                }
            });
        }

        function get(pageNumber) {
            var extended = false;
            for (var p = 0; p < pages.length; p++)
                if (pages[p].page == pageNumber) {
                    if (pages[p].link) {
                        getPage(pages[p]);
                    }
                    extended = true;
                    break;
                }
            if (!extended) {

                var link;
                if (pageNumber < currentPage) {
                    link = elmPrev;
                    jQuery('<strong>' + pageNumber + '</strong>').insertBefore(jQuery(pager[0]));
                } else {
                    link = elmNext;
                    jQuery('<strong>' + pageNumber + '</strong>').insertAfter(jQuery(pager[pager.length - 1]));
                }

                getPage({
                    page: pageNumber,
                    href: pagePfx + (pSize * pageNumber) + pageSfx,
                    link: link,
                    rP: "rP" + pageNumber
                });
            }
        }

        //prevous & next pages
        var pn = pg.find('tr.pages_str > td');

        var prev = jQuery(pn[0]).children("a");
        if (prev[0]) {
            var prevPage = 1;
            prev[0].href = "#rPi" + (currentPage - prevPage);
            prev.click(function() {
                var pNumber = currentPage - prevPage;
                if (pNumber >= 0) {
                    prevPage++;
                    prev[0].href = "#rPi" + pNumber;
                    get(pNumber);
                } else {
                    prev.hide().remove();
                }
            });
        }

        var next = jQuery(pn[1]).children("a");
        if (next[0]) {
            var nextPage = 1;
            next[0].href = "#rPi" + (currentPage + nextPage);
            next.click(function() {
                var pNumber = currentPage + nextPage;
                if (pNumber >= 0) {
                    nextPage++;
                    next[0].href = "#rPi" + pNumber;
                    get(pNumber);
                }
            });
        }

        var context = this;
        var includeSelector = nonCommentPage ? "div.singlePost" : "div.singleComment";
        var ddoc = jQuery(doc);
        for (var i = 0; i < pages.length; i++)if (pages[i]) {
            ddoc.find("a.rP" + pages[i].page + ", a.rP" + pages[i].page + "a").click(function() {
                var t = this.href.split("#rPi")[1];
                get(t);
            });
        }

        if (currentPage >= 8) {
            jQuery(".rP1").css("display", "none").remove();
            jQuery(".rP1a").replaceWith('');
        }

        var pgNav = jQuery('<div style="text-align:center;width:100%;"><span>перейти на страницу: <input id="pgNavPage" value="' + (lastPage + 1) + '" type="text" maxlength="4" size="4"/><input  id="pgNavPageGo" type="button" value="перейти"/></span><div>').insertAfter(pg);
        var navAct = function() {
            var page = pgNav.find('#pgNavPage')[0].value;
            try {
                page = 1 * page - 1;
                if (page < 1) return;
                document.location.href = pagePfx + (pSize * page) + pageSfx;
            } catch(e) {
                $diaryPlugin.debug(e);
            }
        };
        pgNav.find('#pgNavPageGo').click(navAct);
//        pgNav.find('#pgNavPage').change(navAct);
        pgNav.find('#pgNavPage').keypress(function(key) {
            if (key.keyCode == '13') {
                navAct();
            }
        });
    },
    addMyDesignTool : function(doc) {
        if (jQuery(doc).find('#communityFav').length < 1 &&
            jQuery(doc).find('#authorFav').length < 1)return;

        var action = jQuery('<a href="javascript:;">В моём дизайне</a>');
        action.appendTo(jQuery('<li id="showInMyDesign"></li>').insertBefore(jQuery(doc).find('#writeThisDiary')));

        var link = jQuery(doc).find('#myProfileLink > a')[0].href.split('?')[1].split('/')[0];
        link = 'http://static.diary.ru/userdir/' +
            link.substring(0, 1) + '/' +
            link.substring(1, 2) + '/' +
            link.substring(2, 3) + '/' +
            link.substring(3, 4) + '/' +
            link + '/';

        var journalStyle = doc.getElementById('link_journal_css');
        var userStyle = doc.getElementById('link_user_css');
        if (!userStyle) {
            userStyle = doc.createElement('link');
            userStyle.setAttribute('rel', 'stylesheet');
            userStyle.setAttribute('href', 'about:blank');
            doc.getElementsByTagName('head').item(0).appendChild(userStyle);
        }
        var thisJournalCSS = journalStyle.href;
        var thisUserCSS = userStyle.href;
        var myJournalCSS = link + 'journal.css';
        var myUserCSS = link + 'user.css';

        var myCSS = false;
        action.click(function() {
            if (myCSS) {
                journalStyle.href = thisJournalCSS;
                userStyle.href = thisUserCSS;
                action.html("В моём дизайне");
            } else {
                journalStyle.href = myJournalCSS;
                userStyle.href = myUserCSS;
                action.html("В авторском дизайне");
            }
            myCSS = !myCSS;
        });
    },
    loadScript : function(doc, src) {
        var hd = doc.getElementsByTagName('head');
        var lib = doc.createElement('script');
        lib.src = 'http://yandex.st/jquery/1.4.4/jquery.min.js';
        lib.type = 'text/javascript';
        hd[0].appendChild(lib);
    },
    jqWait : function() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout($diaryPlugin.jqWait, 800);
        } else {
            window.jQuery = unsafeWindow.jQuery;
            $diaryPlugin.init(unsafeWindow.document);
        }
    },
    documentWait : function() {
        var hd = unsafeWindow.document.getElementsByTagName('head');
        if (!hd || hd.length < 1) {
            window.setTimeout($diaryPlugin.documentWait, 800);
        } else {
            $diaryPlugin.loadScript(unsafeWindow.document, 'http://yandex.st/jquery/1.4.4/jquery.min.js');
            if (!unsafeWindow.JSON || !unsafeWindow.JSON.stringify) {
                $diaryPlugin.loadScript(unsafeWindow.document, 'http://yandex.st/json2/2009-09-29/json2.min.js');
            }
            $diaryPlugin.jqWait();
        }
    }
};

unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
if (unsafeWindow.document.location.href.toLowerCase().indexOf("diary.ru") >= 0)
    $diaryPlugin.documentWait();