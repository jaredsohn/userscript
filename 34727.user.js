// ==UserScript==
// @name           Avanturist.org.PATCH
// @description    Avanturist.org forum PATCH
// @version        0.07.2
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// ==/UserScript==


var app;
var userAgent = navigator.userAgent.toLowerCase();
var isOpera = /opera/.test(userAgent);
var url = location.href;
var clearUrl = url.replace(/#.*/, "");
var debug = /^.*#enable_log$/.test(url); // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var log;
if (debug) {
    if (isOpera) {
        log = function(msg) {
            opera.postError("AVANTURIST.ORG: " + msg);
        }
    } else {
        log = function(msg) {
            GM_log("AVANTURIST.ORG: " + msg);
        }
    }
} else {
    log = function(msg) {
    }
}

var logError;
if (isOpera) {
    logError = function(msg) {
        opera.postError("AVANTURIST.ORG ERROR: " + msg);
    }
} else {
    logError = function(msg) {
        GM_log("AVANTURIST.ORG ERROR: " + msg);
    }
}

log("User-Agent: " + userAgent);
log("Is Opera? " + isOpera);
log("url = " + url);


var anchorMgr = {
    showHideButtons: function() {
        /*
        Перебираю все теги a, которые являются закладками. Среди них есть удалённые и не удалённые.
        Если закладка удалена, то ставлю значёк "В" (восстановить),
        если не удалена, то ставлю "У" (удалить)
        */
        var xpath = "./tbody/tr/td[7]/a[contains(@href,'#msg')]";
        var snapshot = $x(xpath, $id("category"));
        for (var i = 0; i < snapshot.snapshotLength; i++) {
            var link = snapshot.snapshotItem(i);
            if (link.href.indexOf("#msg-") == 0) {
                // Это НЕ удалённая закладка
                // <span style='color: blue; border: 1px solid blue'><a href='#'>У</a></span>
//                link.parent().get(0).
            } else {
                // Это удалённая закладка
            }
        }
    }
};


// ****************************************************************************
// ********************************* HTML *************************************
// ****************************************************************************


// TODO: Здесь одна проблема, форма вставляется на страницу, и в одном случае оказывается вложенной.
// По-моему, вложенные формы запрещены, но в данный момент работает, благодаря div
var formHtml =
    "<div id='york_div%idx%' style='visibility: hidden; z-index: 10; position: absolute; background-color: rgb(245, 245, 250); border-style: solid; border-width: 1px; border-color: rgb(60, 97, 164); padding: 3px'>" +
    "  <form id='york_form%idx%' method='get' action='http://www.avanturist.org/forum/index.php'>" +
    "    <input type='hidden' id='york_topic%idx%' name='topic' value=''/>" +
    "    <input type='hidden' id='york_start%idx%' name='start' value=''/>" +
    //   Номер страницы:
    "    \u041d\u043e\u043c\u0435\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b:"+
    "    <input type='text' id='york_page%idx%' value='' maxlength='4' size='4'/>" +
    //   Перейти
    "    <input type='submit' value='\u041f\u0435\u0440\u0435\u0439\u0442\u0438'/>" +
    "  </form>" +
    "</div>";


// ****************************************************************************
// ******************************** HELPERS ***********************************
// ****************************************************************************


function $id(id) {
    return document.getElementById(id);
}


function $x(xpath, context) {
    context = context || document.body;
    return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function $x1(xpath, context) {
    var snapshot = $x(xpath, context);
    if (snapshot.snapshotLength > 0) {
        return snapshot.snapshotItem(0);
    } else {
        return null;
    }
}


function showHideForm(e) {
    log("showHideForm()");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;

    var divId = src.getAttribute("div_id");
    var div = $id(divId);
    if (div.style.visibility == "visible") {
        div.style.visibility = "hidden";
        log("Form " + divId + " was hidden");
    } else {
        div.style.visibility = "visible";
        var inputId = src.getAttribute("input_id");
        if (inputId != null) {
            var input = $id(inputId);
            input.focus();
        }
        log("Form " + divId + " was showed");
    }

    e.returnValue = false;
    if (typeof e.preventDefault != "undefined") {
        e.preventDefault();
    }
    return false;
}


// ****************************************************************************
// ***************************** CTopicWrapper ********************************
// ****************************************************************************


var topicWrapper;


function CTopicWrapper() {
    log("CTopicWrapper()");

    this.boards = new Array();
    var xpath = "tbody/tr[th[@colspan='7']/table[@id='category']]";
    var snapshot = $x(xpath, $id("category"));
    log("Number of found boards: " + snapshot.snapshotLength);
    for (var i = 0; i < snapshot.snapshotLength; i++) {
        var boardTr = snapshot.snapshotItem(i);
        var boardIdx = this.boards.length;
        var board = new CBoard(boardTr, boardIdx);
        this.boards[boardIdx] = board;
    }
};


CTopicWrapper.onClick = function(e) {
    log("CTopicWrapper.onClick()");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;

    var boardIdx = src.getAttribute("board_idx");
    board = topicWrapper.boards[boardIdx];
    board.onClick();

    e.returnValue = false;
    if (typeof e.preventDefault != "undefined") {
        e.preventDefault();
    }
    return false;
};


CTopicWrapper.prototype = {
    collapse: function() {
        log("CTopicWrapper.collapse()");

        for (var i = 0; i < this.boards.length; i++) {
            this.boards[i].collapse();
        }
    },

    expand: function() {
        log("CTopicWrapper.expand()");

        for (var i = 0; i < this.boards.length; i++) {
            this.boards[i].expand();
        }
    },

    boards: []
};


// ****************************************************************************
// ******************************** CBoard ************************************
// ****************************************************************************


function CBoard(boardTr, boardIdx) {
    log("CBoard(): boardIdx = " + boardIdx + ", row index = " + boardTr.rowIndex);

    this.board = boardTr;
    this.isCollapsed = false;
    this.href = null;
    this.hiddenTopics = [];

    var table = boardTr.parentNode;
    var rows = table.rows;
    var hasHidden = false;
    for (var i = boardTr.rowIndex + 1; i < rows.length; i++) {
        var topicTr = rows[i];
        if (topicTr.cells.length != 7) {
            break;
        }

        var topic = new CTopic(this, topicTr);
        if (topic.isRead || topic.anchorStatus == CTopic.DELETED_ANCHOR) {
            this.hiddenTopics.push(topic);
        }
    }

    var xpath = "th/table[@id='category']/tbody/tr[1]";
    var tr = $x1(xpath, boardTr);
    if (tr) {
        this.href = document.createElement("A");
        this.href.href = "#";
        this.href.innerHTML = this.collapseText;
        this.href.setAttribute("board_idx", boardIdx);
        this.href.addEventListener("click", CTopicWrapper.onClick, false);
        if (this.hiddenTopics.length == 0) {
            this.href.style.visibility = "hidden";
        }

        var th = document.createElement("TH");
        th.width = "20%";
        th.style.textAlign = "center";
        th.appendChild(this.href);
        tr.insertBefore(th, tr.cells[1]);
        tr.cells[0].width = "40%";
        tr.cells[2].width = "40%";
        tr.cells[2].style.textAlign = "right";
    } else {
        logError("TR wasn't found");
    }
};


CBoard.prototype = {
    collapse: function() {
        log("CBoard.collapse(): row index = " + this.board.rowIndex);

        for (var i = 0; i < this.hiddenTopics.length; i++) {
            this.hiddenTopics[i].collapse();
        }
        if (this.href != null) {
            this.href.innerHTML = this.expandText;
        } else {
            logError("this.href == null. It isn't expected");
        }
        this.isCollapsed = true;
    },

    expand: function() {
        log("CBoard.expand()");

        for (var i = 0; i < this.hiddenTopics.length; i++) {
            this.hiddenTopics[i].expand();
        }
        this.href.innerHTML = this.collapseText;
        this.isCollapsed = false;
    },

    onClick: function() {
        log("CBoard.onClick()");

        if (this.isCollapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    },

    // "СВЕРНУТЬ"
    collapseText: "\u0421\u0412\u0415\u0420\u041d\u0423\u0422\u042c",

    // "РАЗВЕРНУТЬ"
    expandText: "\u0420\u0410\u0417\u0412\u0415\u0420\u041d\u0423\u0422\u042c"
};


// ****************************************************************************
// ******************************** CTopic ************************************
// ****************************************************************************


function CTopic(board, topicTr) {
    log("CTopic(): row index = " + topicTr.rowIndex);

    CTopic.nextId++;
    topicTr.setAttribute("topicId", CTopic.nextId);
    CTopic.topics[CTopic.nextId] = this;

    this.board = board;
    this.topic = topicTr;
    this.isRead = topicTr.cells[2].innerHTML.indexOf("new_post.gif") == -1;

    var xpath = "td[3]//span[contains(@id,'msg_')]/a[1]";
    var topicHref = $x1(xpath, topicTr);
    if (topicHref != null) {
        var regexp = /^.*[/?&]topic[=,](\d+).*$/;
        var matches = regexp.exec(topicHref.href);
        if (matches != null && matches.length == 2) {
            var span = topicHref.parentNode;
            this.topicId = matches[1];
            this.firstMsgId = span.id.substr(4);
        } else {
            logError("Topic ID wasn't found. URL: " + topicHref.href + ", matches = " + matches);
        }
    } else {
        logError("Topic HREF wasn't found");
    }

    xpath = "td[7]/a[contains(@href,'#msg')]";
    var anchorHref = $x1(xpath, topicTr);
    if (anchorHref != null) {
        var idx = anchorHref.href.indexOf("#msg-");
        if (idx != -1) {
            this.anchorMsgId = anchorHref.href.substr(idx + 5);
            this.anchorStatus = CTopic.DELETED_ANCHOR;
        } else {
            idx = anchorHref.href.indexOf("#msg");
            this.anchorMsgId = anchorHref.href.substr(idx + 4);
            this.anchorStatus = CTopic.HAS_ANCHOR;
        }
        log("Anchor message ID: " + this.anchorMsgId);
    } else {
        log("The anchor wasn't found");
        this.anchorStatus = CTopic.NO_ANCHOR;
    }

    // TODO этот код должен быть в другом месте
    // TODO русский язык
    if (this.anchorStatus == CTopic.HAS_ANCHOR) {
        topicTr.cells[2].innerHTML +=
            "<br/>" +
            "<a href='/forum/index.php?action=all_ajax_message_anchor&msg_id=-" + this.anchorMsgId + "&topic_id=" + this.topicId + "' style='color: red'>" +
            "Удалить закладку" +
            "</a>";
    } else if (this.anchorStatus == CTopic.DELETED_ANCHOR) {
//        topicTr.cells[2].innerHTML +=
//            "<br/>" +
//            "<a href='/forum/index.php?action=all_ajax_message_anchor&msg_id="  + this.anchorMsgId + "&topic_id=" + this.topicId + "' style='color: blue'>" +
//            "Восстановить закладку" +
//            "</a>";
    } else if (this.anchorStatus == CTopic.NO_ANCHOR) {
        var hrefTrack = document.createElement("A");
        hrefTrack.href = "#";
        hrefTrack.style.color = "blue";
        // отслеживать
        hrefTrack.innerHTML = "\u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0442\u044c";
        hrefTrack.addEventListener("click", function(e) {
            log("XXXXXXXXXx()");

            e = e || window.event;
            var src = e.srcelement ? e.srcelement : e.target;

            //       A   SPAN       TD         TR
            var tr = src.parentNode.parentNode.parentNode;
            var topic = CTopic.find(tr);
            if (topic != null) {
                // Нашли топик
                // Сначала ставим закладку,
                $.getJSON("/forum/index.php?action=all_ajax_message_anchor", {msg_id: topic.firstMsgId, topic_id: topic.topicId}, function(data) {
                    if (data.result == 1) {
                        // если успешно, то
                        // скрываем надпись
                        src.parentNode.style.display = "none";
                        // Теперь: т.к. тему отслеживаем, то надо сделать следующее:
                        // TODO Показать якорь
                        // TODO Если включён режим отображения управления закладками, то показать надпись "удалить закладку"
                    } else {
                        // TODO: Ошибка! Закладка не сохранена
                        alert("\u041e\u0448\u0438\u0431\u043a\u0430! \u0417\u0430\u043a\u043b\u0430\u0434\u043a\u0430 \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430. " + data.resultStatus);
                        logError("Anchor wasn't saved. topic_id = " + topic_id + ", msg_id = " + msg_id +
                            " The server returns an error. data.result_status = " + data.resultStatus);
                    }
                });
            }

            e.returnValue = false;
            if (typeof e.preventDefault != "undefined") {
                e.preventDefault();
            }
            return false;
        }, false);

        var hrefNotTrack = document.createElement("A");
        hrefNotTrack.href = "#";
        hrefNotTrack.style.color = "red";
        // не отслеживать
        hrefNotTrack.innerHTML = "\u043d\u0435 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0442\u044c";
        hrefNotTrack.addEventListener("click", function(e) {
            log("XXXXXXXXXx()");

            e = e || window.event;
            var src = e.srcelement ? e.srcelement : e.target;

            //       A   SPAN       TD         TR
            var tr = src.parentNode.parentNode.parentNode;
            var topic = CTopic.find(tr);
            if (topic != null) {
                // Нашли топик
                // Сначала ставим закладку,
                $.getJSON("/forum/index.php?action=all_ajax_message_anchor", {msg_id: -topic.firstMsgId, topic_id: topic.topicId}, function(data) {
                    if (data.result == 1) {
                        // если успешно, то
                        // скрываем надпись
                        src.parentNode.style.display = "none";
                        // Теперь: т.к. тему не отслеживаем, то надо сделать следующее:
                        // добавить топик в раздел, как скрытый
                        // если раздел развёрнут, то ничего не делать,
                        // если раздел свёрнут, то скрыть топик
                        // Если включён режим отображения управления закладками, то показать надпись "восстановить закладку"
                        var board = topic.board;
                        board.hiddenTopics.push(topic);
                        board.href.style.visibility = "visible";
                        if (board.isCollapsed) {
                            topic.collapse();
                        }
                        // TODO: Ещё надо при необходимости отобразить надпись "восстановить закладку"
                    } else {
                        // TODO: Ошибка! Закладка не сохранена
                        alert("\u041e\u0448\u0438\u0431\u043a\u0430! \u0417\u0430\u043a\u043b\u0430\u0434\u043a\u0430 \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430. " + data.resultStatus);
                        logError("Anchor wasn't saved. topic_id = " + topic_id + ", msg_id = " + msg_id +
                            " The server returns an error. data.result_status = " + data.resultStatus);
                    }
                });
            }

            e.returnValue = false;
            if (typeof e.preventDefault != "undefined") {
                e.preventDefault();
            }
            return false;
        }, false);

        var span = document.createElement("SPAN");
        // <br/><b>Новая тема:</b>
        span.innerHTML = "<br/><b>\u041d\u043e\u0432\u0430\u044f \u0442\u0435\u043c\u0430:</b> ";
        span.appendChild(hrefTrack);
        span.appendChild(document.createTextNode(" / "));
        span.appendChild(hrefNotTrack);
        topicTr.cells[2].appendChild(span);
        // Надо: скрыть div
        // если отслеживать, то больше ничего не делать
        // если не отслеживать, то поместить тему в скрытые, при необходимости скрыть
    } else {
        logError("Anchor status is not defined");
    }
};


CTopic.find = function(topicTr) {
    var topicId = topicTr.getAttribute("topicId");
    if (topicId == null) {
        return null;
    }
    return CTopic.topics[topicId];
}


CTopic.topics = new Array();
CTopic.nextId = 0;


CTopic.NO_ANCHOR = 0;
CTopic.HAS_ANCHOR = 1;
CTopic.DELETED_ANCHOR = 2;


CTopic.prototype = {
    collapse: function() {
        log("CTopic.collapse()");
        this.topic.style.display = "none";
    },

    expand: function() {
        log("CTopic.expand()");
        this.topic.style.display = "";
    }
};


// ****************************************************************************
// ********************************* OTHER ************************************
// ****************************************************************************


function createGotoPageForms(topicId) {
    log("createGotoPageForms(" + topicId + ")");

    var tables = document.body.getElementsByTagName("TABLE");
    var found = 0;
    for (var i = 0; i < tables.length && found < 2; i++) {
        var table = tables[i];
        var innerTables = table.getElementsByTagName("TABLE");
        if (innerTables != null && innerTables.length > 0) {
            continue;
        }

        // "Страниц:"
        var pages = "\u0421\u0442\u0440\u0430\u043d\u0438\u0446:";
        if (table.innerHTML.indexOf(pages) != -1) {
            log("Page navigator #" + found + " is found");
            // Нашли таблицу, включающую список страниц
            // Ищем элемент с текстом "Страниц:"
            var cell = table.rows[0].cells[0];
            // Это нужный элемент!
            var text = cell.childNodes[0];
            // Убеждаемся, что это он
            if (text.nodeType == 3 && text.nodeValue.indexOf(pages) == 0) {
                var href = document.createElement("A");
                href.appendChild(text);
                href.href = "#";
                href.setAttribute("div_id", "york_div" + found);
                href.setAttribute("input_id", "york_page" + found);
                href.addEventListener("click", showHideForm, false);
                cell.insertBefore(href, cell.childNodes[0]);

                var span = document.createElement("SPAN");
                span.id = "york_span" + found;
                span.innerHTML = formHtml.replace(/%idx%/g, found);
                cell.insertBefore(span, cell.childNodes[1]);

                var form = $id("york_form" + found);
                form.setAttribute("idx", found);
                form.addEventListener("submit", submitGotoPageForm, false);

                var topic = $id("york_topic" + found);
                topic.value = topicId;

                found++;
            }
        }
    }
}


function submitGotoPageForm(e) {
    log("submitGotoPageForm()");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;

    var idx = src.getAttribute("idx");
    var inputStart = $id("york_start" + idx);
    var inputPage = $id("york_page" + idx);
    inputStart.value = (inputPage.value - 1) * 20;
}


// Почему-то не работают всякие хитрые jQuery запросы, поэтому просо перебираю элементы
function getArchiveSourceId(anchor) {
    var childrens = $(anchor).parent().children();
    for (var i = 0; i < childrens.length; i++) {
        var node = childrens.get(i);
        if (node.name == "source_id") {
            return node.value;
        }
    }
    log("source_id wasn't found! target = " + anchor);
    return null;
}


function archiveSeen() {
    log("archiveSeen()");

    var source_id = getArchiveSourceId(this);
    if (!source_id || source_id == 'undefined') {
        // "Ошибка подтверждения нового поступления в ваш личный архив!"
        alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f \u0432 \u0432\u0430\u0448 \u043b\u0438\u0447\u043d\u044b\u0439 \u0430\u0440\u0445\u0438\u0432!");
        logError("Can't approve the archive card: source_id is undefined");
        return;
    }

    // отправляем запрос
    $.getJSON("/myarchive/seen/" + source_id, {source_id: source_id}, function(data) {
        if (data.result == 1) {
            $('#ga_myarchive_card_' + source_id).slideUp("slow");
        } else {
            // "Ошибка: "
            alert("\u041e\u0448\u0438\u0431\u043a\u0430: " + data.result_status);
            logError("The archive card with source_id=" + source_id + " wasn't confirmed. " +
                "The server returns an error. data.result_status = " + data.result_status);
        }
    });

    return false;
}


function archiveDelete() {
    log("archiveDelete()");

    // "Вы действительно хотите удалить данный материал?"
    if (!confirm("\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0439 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b?")) {
        return false;
    }

    var source_id = getArchiveSourceId(this);
    if (!source_id || source_id == 'undefined') {
        // "Ошибка удаления нового поступления в ваш личный архив!"
        alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f \u0432 \u0432\u0430\u0448 \u043b\u0438\u0447\u043d\u044b\u0439 \u0430\u0440\u0445\u0438\u0432!");
        logError("Can't delete the archive card: source_id is undefined");
        return;
    }

    // отправляем запрос
    $.getJSON("/myarchive/delete/" + source_id, {source_id: source_id}, function(data) {
        if (data.result == 1) {
            $('#ga_myarchive_card_' + source_id).slideUp("slow");
        } else {
            // "Ошибка: "
            alert("\u041e\u0448\u0438\u0431\u043a\u0430: " + data.result_status);
            logError("The archive card with source_id=" + source_id + " wasn't deleted. " +
                "The server returns an error. data.result_status = " + data.result_status);
        }
    });

    return false;
}


function setAnchor(e) {
    log("setAnchor()");

    var jHref = $(this);
    var msg_id   = jHref.find("#msg_id").val();
    var topic_id = jHref.find("#topic_id").val();

    var img = jHref.children("img").get(0);
    img.style.borderStyle = "none";

    $.getJSON("/forum/index.php?action=all_ajax_message_anchor", {msg_id: msg_id, topic_id: topic_id}, function(data) {
        if (data.result == 1) {
            var images = $(".york_message_anchor > img");
            images.css("borderStyle", "none");

            img.style.borderStyle = "solid";
            img.style.borderColor = "blue";
            img.style.borderWidth = "1px";
            img.style.padding = "1px";
        } else {
            // Ошибка! Закладка не сохранена
            alert("\u041e\u0448\u0438\u0431\u043a\u0430! \u0417\u0430\u043a\u043b\u0430\u0434\u043a\u0430 \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430. " + data.resultStatus);
            logError("Anchor wasn't saved. topic_id = " + topic_id + ", msg_id = " + msg_id +
                " The server returns an error. data.result_status = " + data.resultStatus);
        }
    });

    return false;
}


function replaceAnchorHandler() {
    log("replaceAnchorHandler()");

    // TODO workaround
    if (!app.controllers[0].settings.sett_customAnchors) {
        log("Use the default anchor handler");
        return;
    }

    var anchors = $(".message_anchor");
    if (anchors != null && anchors.length > 0) {
        anchors.unbind("click");
        anchors.attr("class", "york_message_anchor");
        anchors.click(setAnchor);
    } else {
        log("Anchors weren't found!");
    }
}


function hideDeletedAnchors() {
    log("hideDeletedAnchors()");

    var xpath = "./tbody/tr/td[7]/a[contains(@href,'#msg-')]";
    var snapshot = $x(xpath, $id("category"));
    for (var i = 0; i < snapshot.snapshotLength; i++) {
        var deletedAnchor = snapshot.snapshotItem(i);
        deletedAnchor.style.visibility = "hidden";
        log("The anchor was hidden: " + deletedAnchor);
    }
}


/*
 * Находит длинные ссылки в сообщениях темы и обрезает их, чтобы они не портили форматирование
 */
function cutLongLinks() {
    log("cutLongLinks()");

    var xpath = "tbody[1]/tr[1]/td[1]/table[@id='topic_posts']/tbody[1]/tr/td[1]//table[@class='message' or @class='message_hidden']//td[contains(@id,'message_body_')]/div[@class='post']//a";
    var snapshot = $x(xpath, $id("content"));
    for (var i = 0; i < snapshot.snapshotLength; i++) {
        var link = snapshot.snapshotItem(i);
        var href = link.href;
        var html = link.innerHTML;
        if (href.indexOf("http://") == 0 && html.indexOf("http://") == 0 && html.length > 80) {
            var found = href == html;
            if (!found) {
                var htmlAmp = html.replace(/&amp;/g, "&");
                found = href == htmlAmp;
                if (!found) {
                    var decodedHref;
                    try {
                        decodedHref = decodeURI(href);
                    } catch (err) {
                        decodedHref = href;
                        logError("Can't decode href: " + href);
                    }
                    var decodedHtml;
                    try {
                        decodedHtml = decodeURI(htmlAmp);
                    } catch (err) {
                        decodedHtml = htmlAmp;
                        logError("Can't decode htmlAmp: " + htmlAmp);
                    }
                    found = decodedHref == decodedHtml;
                } else {
                    log("href == htmlAmp");
                }
            } else {
                log("href == html");
            }

            if (found) {
                log("Found long link: " + href);
                link.innerHTML = html.substr(0, 77) + "...";
                link.style.fontStyle = "italic";
            }
        }
    }
}


function doRepairMailboxUrl(xpath, signalRegExp) {
    var snapshot = $x(xpath);
    for (var i = 0; i < snapshot.snapshotLength; i++) {
        var link = snapshot.snapshotItem(i);
        if (signalRegExp.test(link.innerHTML)) {
            log("FOUND: " + link.innerHTML + " - " + link.href);
            if (link.href.replace(/#.*/, "") == clearUrl) {
                link.href = "http://www.avanturist.org/forum/index.php?action=pm";
            }
            break;
        }
    }
}


function repairMailboxUrl() {
    // Сначала всталяю ссылку на почтовый ящик в правом верхнем углу (текст "0 новых писем")
    // Эта ссылка есть только для форумных страниц
    if (/\/forum\//.test(url)) {
        // /пис(ем|ьмо|ьма)/
        var regExp = /\u043f\u0438\u0441(\u0435\u043c|\u044c\u043c\u043e|\u044c\u043c\u0430)/;
        doRepairMailboxUrl("//table[@class='info']//td[@class='info_content']/table//a", regExp);
    }

    // Теперь вставляю ссылку под слово "Почта", ссылка находится рядом с сылкой на "Архив" и есть на всех страницах
    // /Почта/
    var regExp = /\u041f\u043e\u0447\u0442\u0430/;
    doRepairMailboxUrl("//table[@class='subheader' or @class='submenu']//a", regExp);
}


// ****************************************************************************
// ************************** Обработчики страниц *****************************
// ****************************************************************************


function handleArchivePage() {
    log("handleArchivePage()");

    var seenHrefs = $(".ga_myarchive_seen");
    if (seenHrefs != null && seenHrefs.length > 0) {
        seenHrefs.unbind("click");
        seenHrefs.attr("class", "");
        seenHrefs.click(archiveSeen);
    } else {
        // "\"Подтвердить\" links weren't found!"
        log("\"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c\" links weren't found!");
    }

    var deleteHrefs = $(".ga_myarchive_delete");
    if (deleteHrefs != null && deleteHrefs.length > 0) {
        deleteHrefs.unbind("click");
        deleteHrefs.attr("class", "");
        deleteHrefs.click(archiveDelete);
    } else {
        // "\"Удалить\" links weren't found!"
        log("\"\u0423\u0434\u0430\u043b\u0438\u0442\u044c\" links weren't found!");
    }

    repairMailboxUrl();
}


function handleJournalPage() {
    log("handleJournalPage()");

    // TODO: IMPLEMENT
    repairMailboxUrl();
}


function handleTopicPage() {
    log("handleTopicPage()");

    var input = $id("topic_id");
    log("topic_id = " + input);
    if (input != null && input.nodeType == 1 && input.tagName == "INPUT") {
        createGotoPageForms(input.value);
        replaceAnchorHandler();
    }

    cutLongLinks();
    repairMailboxUrl();



    // TODO кнопка сохранения в архив в закрытых темах!!!
//    var xpath = "tbody/tr/td[1]/table/tbody/tr[1]/td[1]/table[contains(@id,'message_table_')]/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[2]";
//    var snapshot = $x(xpath, $id("topic_posts"));
//    for (var i = 0; i < snapshot.snapshotLength; i++) {
//        var td = snapshot.snapshotItem(i);
//        var  href = document.createElement("A");
//        href.href = "#";
//        href.innerHTML = "Сохранить в архив";
//        href.addEventListener("click", function(e) {
//            log("XXXXXXXXX()");

//            e = e || window.event;
//            var src = e.srcelement ? e.srcelement : e.target;

//            var topic_id   = $(src).parent().parent().find("input[name='topic_id']").val();
//            var message_id = $(src).parent().parent().find("input[name='message_id']").val();

//            // проверяем входные параметры
//            if (topic_id == 'undefined' || message_id == 'undefined') {
//                alert("Ошибка сохранения материала в ваш личный архив!");
//                return;
//            }

//            // отправляем запрос
//            $.getJSON("/forum/index.php?action=all_ajax_save_to_archive", {topic_id: topic_id, message_id: message_id}, function(data) {
//                if (data.result == 1) {
//            	    $(src).hide();
//                } else {
//                    alert(data.result_status);
//                }
//            });

//            e.returnValue = false;
//            if (typeof e.preventDefault != "undefined") {
//                e.preventDefault();
//            }
//            return false;
//        }, false);
//        td.appendChild(href);
//    }
}


function handleBoardPage() {
    log("handleBoardPage()");

    // TODO: IMPLEMENT
    repairMailboxUrl();
}


function handleForumMainPage() {
    log("handleForumMainPage()");

    // TODO workaround
    if (app.controllers[0].settings.sett_collapseTopics) {
        topicWrapper = new CTopicWrapper();
        topicWrapper.collapse();
    } else {
        log("Don't collapse the read topics");
    }
    hideDeletedAnchors();
    repairMailboxUrl();
}


function handleOtherForumPages() {
    log("handleOtherForumPages()");

    // TODO: IMPLEMENT
    repairMailboxUrl();
}


function handleOtherSitePages() {
    log("handleOtherSitePages()");

    // TODO: IMPLEMENT
    repairMailboxUrl();
}


// ****************************************************************************
// ****************************** Точка входа *********************************
// ****************************************************************************


function onLoad(e) {
    log("onLoad()");




    // TODO: этот код должен быть в другом месте и его надо переписать
    var r1 = /^.*#msg(\d+)$/;
    var matches = r1.exec(url);
    if (matches != null && matches.length == 2) {
        // Это URL для перехода к конкректному сообщению
        var msgId = parseInt(matches[1]);
        log("msgId = " + msgId);

        // Ищем тэг B, после которого идёт текст, содержащий "]"
        var xpath = "tbody[1]/tr[1]/td[1]/table[not(@id)]/tbody[1]/tr[1]/td[@class='middletext']/b[following-sibling::node()[position()=1 and contains(self::text(), ']')]]";
        var b = $x1(xpath, $id("content"));
        if (b == null) {
            logError("XXXXX(): Navigator wasn't found");
            return;
        }
        var currentPage = parseInt(b.innerHTML);
        log("currentPage = " + currentPage);

        xpath = "tbody[1]/tr[1]/td[1]/table[not(@id)]/tbody[1]/tr[1]/td[@class='middletext']/a[@class='navPages' and position()=last()]";
        var href = $x1(xpath, $id("content"));
        var lastPage = href != null ? parseInt(href.innerHTML) : 1;
        lastPage = Math.max(lastPage, currentPage);
        log("lastPage = " + lastPage);

        var topicId = $id("topic_id").value;



        // Определяем текущий этап алгоритма
        function parseUrlParameters(url) {
            log("parseUrlParameters(" + url + ")");

            var res = new Array();
            var idxQuery = url.indexOf("?") + 1;
            if (idxQuery == 0) { // Выше была прибавлена 1, поэтому сравнение не с -1
                log("question mark wasn't found");
                return res;
            }

            var idxHash = url.indexOf("#");
            idxHash = idxHash == -1 ? url.length() : idxHash;
            if (idxHash <= idxQuery) {
                logError("parseUrlParameters(): invalid URL");
                return res;
            }

            var paramStr = url.substr(idxQuery, idxHash - idxQuery);
            log("paramStr = " + paramStr);
            var pairs = paramStr.split("&");
            for (var i = 0; i < pairs.length; i++) {
	            var pair = pairs[i].split("=");
	            res[pair[0]] = pair[1];
            }

            return res;
        }
        var params = parseUrlParameters(url);
        var searchFrom = parseInt(params["search_from"]);
        var searchTo = parseInt(params["search_to"]);
        var searchMid = parseInt(params["search_mid"]);
        if (isNaN(searchFrom) || isNaN(searchTo)) {
            // Этап I. Первая загрузка страницы

            // Проверяем, есть ли искомое сообщение на странице, и если нет, то в какую сторону двигаться чтобы его найти
            var xpath = "tbody/tr/td[1]/table[1]/tbody/tr[1]/td[1]/table[contains(@id,'message_table_')]";
            var snapshot = $x(xpath, $id("topic_posts"));
            if (snapshot.snapshotLength > 0) {
                // TODO: дублирование кода
                var firstMsgTable = snapshot.snapshotItem(0);
                var lastMsgTable = snapshot.snapshotItem(snapshot.snapshotLength - 1);
                var firstMsgId = parseInt(firstMsgTable.id.substr(14));
                log("firstMsgId = " + firstMsgId);
                var lastMsgId = parseInt(lastMsgTable.id.substr(14));
                log("lastMsgId = " + lastMsgId);

                var step = Math.floor(currentPage / 16);
                step = Math.max(1, step);
                searchFrom = currentPage;
                if (msgId < firstMsgId) {
                    if (currentPage == 1) {
                        // Встаём на первое сообщение на странице
                        var start = 20 * (currentPage - 1);
                        document.location.href = "http://www.avanturist.org/forum/index.php/" +
                            "topic," + topicId +
                            "." + start +
                            ".html#msg" + firstMsgId;
                        return;
                    }
                    searchTo = searchFrom - step;
                    searchTo = Math.max(1, searchTo);
                    var start = 20 * (searchTo - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php" +
                        "?topic=" + topicId +
                        "&start=" + start +
                        "&search_from=" + searchFrom +
                        "&search_to=" + searchTo +
                        "#msg" + msgId;
                    return;
                } else if (lastMsgId < msgId) {
                    if (currentPage == lastPage) {
                        // Встаём на последнее сообщение на странице
                        var start = 20 * (currentPage - 1);
                        document.location.href = "http://www.avanturist.org/forum/index.php/" +
                            "topic," + topicId +
                            "." + start +
                            ".html#msg" + lastMsgId;
                        return;
                    }
                    searchTo = searchFrom + step;
                    searchTo = Math.min(lastPage, searchTo);
                    var start = 20 * (searchTo - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php" +
                        "?topic=" + topicId +
                        "&start=" + start +
                        "&search_from=" + searchFrom +
                        "&search_to=" + searchTo +
                        "#msg" + msgId;
                    return;
                } else {
                    log("Message " + msgId + " is found");
                    // TODO: ПЕРЕПИСАТЬ
                    // Ищем сообщение на странице, если не находим, то ищем сообщение, которое было непосредственно перед ним
                    var xxx = msgId;
                    for (var i = 0; i < snapshot.snapshotLength; i++) {
                        var msgTable = snapshot.snapshotItem(i);
                        var currMsgId = parseInt(msgTable.id.substr(14));
                        if (currMsgId < msgId) {
                            xxx = currMsgId;
                        } else if (msgId < currMsgId) {
                            break;
                        } else {
                            xxx = currMsgId;
                            break;
                        }
                    }
                    if (xxx != msgId) {
                        var start = 20 * (currentPage - 1);
                        document.location.href = "http://www.avanturist.org/forum/index.php/" +
                            "topic," + topicId +
                            "." + start +
                            ".html#msg" + xxx;
                    }
                }
            } else {
                logError("XXXXXXXX(): Can't find the page messages");
            }

        } else if (isNaN(searchMid)) {
            // Этап II. Поиск диапазона страниц, содержащих сообщение

            // TODO: дублирование кода
            // Проверяем, есть ли искомое сообщение на странице, и если нет, то продолжаем искать диапазон страниц, между которыми находится сообщение
            var xpath = "tbody/tr/td[1]/table[1]/tbody/tr[1]/td[1]/table[contains(@id,'message_table_')]";
            var snapshot = $x(xpath, $id("topic_posts"));
            if (snapshot.snapshotLength > 0) {
                var firstMsgTable = snapshot.snapshotItem(0);
                var lastMsgTable = snapshot.snapshotItem(snapshot.snapshotLength - 1);
                var firstMsgId = parseInt(firstMsgTable.id.substr(14));
                log("firstMsgId = " + firstMsgId);
                var lastMsgId = parseInt(lastMsgTable.id.substr(14));
                log("lastMsgId = " + lastMsgId);

                if (msgId < firstMsgId) {
                    if (searchFrom < searchTo) {
                        // Диапазон найден! Ищем сообщение в этом диапазоне
                        var step = searchTo - searchFrom;
                        if (step == 1) {
                            // Сообщения не существует ни на одной из соседних
                            // страниц. Значит надо загрузить страницу с минимальным
                            // номером и перейти на ней к последнему сообщению
                            // В данном случае надо загрузить страницу searchFrom
                            var start = 20 * (searchFrom - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php" +
                                "?topic=" + topicId +
                                "&start=" + start +
                                "&search_from=" + searchTo +
                                "&search_to=" + searchFrom +
                                "#msg" + msgId;
                            return;
                        } else {
                            step = Math.floor(step / 2);
                            searchMid = searchFrom + step;
                            var start = 20 * (searchMid - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php" +
                                "?topic=" + topicId +
                                "&start=" + start +
                                "&search_from=" + searchFrom +
                                "&search_to=" + searchTo +
                                "&search_mid=" + searchMid +
                                "#msg" + msgId;
                            return;
                        }
                    } else if (searchTo < searchFrom) {
                        // Недолёт. Надо дальше двигаться в сторону уменьшения номеров страниц
                        if (searchTo == 1) {
                            // Встаём на первое сообщение на странице
                            var start = 20 * (searchTo - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php/" +
                                "topic," + topicId +
                                "." + start +
                                ".html#msg" + firstMsgId;
                            return;
                        }
                        var step = searchFrom - searchTo;
                        searchFrom = searchTo;
                        searchTo = searchFrom - step;
                        searchTo = Math.max(1, searchTo);
                        var start = 20 * (searchTo - 1);
                        document.location.href = "http://www.avanturist.org/forum/index.php" +
                            "?topic=" + topicId +
                            "&start=" + start +
                            "&search_from=" + searchFrom +
                            "&search_to=" + searchTo +
                            "#msg" + msgId;
                        return;
                    } else {
                        // Такого быть не может
                        logError("XXXXXXXXX(): Unexpected error");
                        return;
                    }
                } else if (lastMsgId < msgId) {
                    if (searchFrom < searchTo) {
                        // Недолёт. Надо дальше двигаться в сторону увеличения номеров страниц
                        if (searchTo == lastPage) {
                            // Встаём на последнее сообщение на странице
                            var start = 20 * (searchTo - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php/" +
                                "topic," + topicId +
                                "." + start +
                                ".html#msg" + lastMsgId;
                            return;
                        }
                        var step = searchTo - searchFrom;
                        searchFrom = searchTo;
                        searchTo = searchFrom + step;
                        searchTo = Math.min(lastPage, searchTo);
                        var start = 20 * (searchTo - 1);
                        document.location.href = "http://www.avanturist.org/forum/index.php" +
                            "?topic=" + topicId +
                            "&start=" + start +
                            "&search_from=" + searchFrom +
                            "&search_to=" + searchTo +
                            "#msg" + msgId;
                        return;
                    } else if (searchTo < searchFrom) {
                        // Диапазон найден! Ищем сообщение в этом диапазоне
                        var step = searchFrom - searchTo;
                        if (step == 1) {
                            // Сообщения не существует ни на одной из соседних
                            // страниц. Значит надо загрузить страницу с минимальным
                            // номером и перейти на ней к последнему сообщению
                            // В данном случае надо перейти к последнему сообщению на текущей странице
                            var start = 20 * (searchTo - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php/" +
                                "topic," + topicId +
                                "." + start +
                                ".html#msg" + lastMsgId;
                            return;
                        } else {
                            step = Math.floor(step / 2);
                            // Теперь можно сделать так, чтобы searchFrom всегда было меньше searchTo
                            var temp = searchFrom;
                            searchFrom = searchTo;
                            searchTo = temp;
                            searchMid = searchFrom + step;
                            var start = 20 * (searchMid - 1);
                            document.location.href = "http://www.avanturist.org/forum/index.php" +
                                "?topic=" + topicId +
                                "&start=" + start +
                                "&search_from=" + searchFrom +
                                "&search_to=" + searchTo +
                                "&search_mid=" + searchMid +
                                "#msg" + msgId;
                            return;
                        }
                    } else {
                        // Такого быть не может
                        logError("XXXXXXXXX(): Unexpected error");
                        return;
                    }
                } else {
                    log("Message " + msgId + " is found");
                    var start = 20 * (searchTo - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php/" +
                        "topic," + topicId +
                        "." + start +
                        ".html#msg" + msgId;
                }
            } else {
                logError("XXXXXXXX(): Can't find the page messages");
            }

        } else {
            // Этап III. Поиск сообщения где-то между двумя страницами

            // TODO: дублирование кода
            // Проверяем, есть ли искомое сообщение на странице, и если нет, то продолжаем искать диапазон страниц, между которыми находится сообщение
            var xpath = "tbody/tr/td[1]/table[1]/tbody/tr[1]/td[1]/table[contains(@id,'message_table_')]";
            var snapshot = $x(xpath, $id("topic_posts"));
            if (snapshot.snapshotLength > 0) {
                var firstMsgTable = snapshot.snapshotItem(0);
                var lastMsgTable = snapshot.snapshotItem(snapshot.snapshotLength - 1);
                var firstMsgId = parseInt(firstMsgTable.id.substr(14));
                log("firstMsgId = " + firstMsgId);
                var lastMsgId = parseInt(lastMsgTable.id.substr(14));
                log("lastMsgId = " + lastMsgId);

                if (msgId < firstMsgId) {
                    // Сообщение находится между searchFrom и searchMid
                    searchTo = searchMid;
                    var step = searchTo - searchFrom;
                    step = Math.floor(step / 2);
                    searchMid = searchFrom + step;
                    var start = 20 * (searchMid - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php" +
                        "?topic=" + topicId +
                        "&start=" + start +
                        "&search_from=" + searchFrom +
                        "&search_to=" + searchTo +
                        "&search_mid=" + searchMid +
                        "#msg" + msgId;
                    return;
                } else if (lastMsgId < msgId) {
                    // Сообщение находится между searchMid и searchTo
                    searchFrom = searchMid;
                    var step = searchTo - searchFrom;
                    step = Math.floor(step / 2);
                    searchMid = searchFrom + step;
                    var start = 20 * (searchMid - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php" +
                        "?topic=" + topicId +
                        "&start=" + start +
                        "&search_from=" + searchFrom +
                        "&search_to=" + searchTo +
                        "&search_mid=" + searchMid +
                        "#msg" + msgId;
                    return;
                } else {
                    log("Message " + msgId + " is found");
                    var start = 20 * (searchMid - 1);
                    document.location.href = "http://www.avanturist.org/forum/index.php/" +
                        "topic," + topicId +
                        "." + start +
                        ".html#msg" + msgId;
                }
            } else {
                logError("XXXXXXXX(): Can't find the page messages");
            }
        }
    } else {
        log("There is not find message URL");
    }






    var start = new Date();
    log("START: " + start);

    if (!document.body) {
        log("document.body hasn't been loaded");
        return;
    }

    var jQueryInstalled = true;
    if (typeof $ == "undefined" && typeof unsafeWindow != "undefined") {
        $ = unsafeWindow.jQuery;
    }
    if (typeof $ == "undefined") {
        logError("jQuery hasn't installed");
        $ = function() {};
        jQueryInstalled = false;
    }







    // NOTE: Изменение свойства visibility работает быстрее, чем изменение display!!!
    var DIV_STYLE =
        "visibility: hidden;" +
        "z-index: 2;" +
        "position: absolute;" +
        "background-color: rgb(245, 245, 250);" +
        "border: 1px solid rgb(60, 97, 164);" +
        "padding: 3px;" +
        "color: black;";


    // ****************************************************************************
    // ****************************** User ignore *********************************
    // ****************************************************************************


    function CDisplayedMessageModel(userIgnoreModel, originalMsg, userId, userName) {
        log("CDisplayedMessageModel()");

        this.userIgnoreModel    = userIgnoreModel;
        this.originalMsg        = originalMsg;
        this.userId             = userId;
        this.userName           = userName;
    }


    CDisplayedMessageModel.prototype = {
        removeFromList: function() {
            this.userIgnoreModel.removeFromList(this.userId);
        },


        addToList: function() {
            this.userIgnoreModel.addToList(this.userId, this.userName);
        }
    }


    function CDisplayedMessageController(userIgnoreController, model, view) {
        log("CDisplayedMessageController()");

        app.addController(this);

        this.userIgnoreController = userIgnoreController;
        this.model = model;
        this.view = view;
    }


    CDisplayedMessageController.prototype = {
        handle: function(src, e) {
            log("CDisplayedMessageController.handle(" + src + ", " + e.type + ")");

            var view = this.view;
            var model = this.model;
            if (src == view.listCtrlHref) {
                if (model.userIgnoreModel.isBlackList) {
                    var msg =
                        // Вы действительно
                        "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e " +
                        // хотите поместить \"
                        "\u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u043c\u0435\u0441\u0442\u0438\u0442\u044c \"" +
                        this.model.userName +
                        // \" в \"чёрный\"
                        "\" \u0432 \"\u0447\u0451\u0440\u043d\u044b\u0439\" " +
                        // список?
                        "\u0441\u043f\u0438\u0441\u043e\u043a?";
                    if (!confirm(msg)) {
                        return false;
                    }

                    this.model.addToList();
                } else {
                    var msg =
                        // Вы действительно
                        "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e " +
                        // хотите удалить \"
                        "\u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \"" +
                        this.model.userName +
                        // \" из \"белого\"
                        "\" \u0438\u0437 \"\u0431\u0435\u043b\u043e\u0433\u043e\" " +
                        // списка?
                        "\u0441\u043f\u0438\u0441\u043a\u0430?";
                    if (!confirm(msg)) {
                        return false;
                    }

                    this.model.removeFromList();
                }
                this.userIgnoreController.updateSettings();
                document.location.reload();
                return false;
            } else {
                logError("CDisplayedMessageController.handle(): An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        }
    }


    function CDisplayedMessageView(model, userIgnoreController) {
        log("CDisplayedMessageView()");

        this.model = model;
        this.controller = new CDisplayedMessageController(userIgnoreController, model, this);

        xpath = "tbody/tr[1]/td[1]/b";
        this.profileHrefNode = $x1(xpath, this.model.originalMsg);
        if (this.profileHrefNode == null) {
            logError("CDisplayedMessageView(): Profile URL wasn't found");
            return;
        }
        var cellUser = this.profileHrefNode.parentNode;

        this.createUserCellContentNode();;
        cellUser.appendChild(this.userCellContentNode);
    }


    CDisplayedMessageView.prototype = {
        createListCtrlHref: function() {
            log("CDisplayedMessageView.createListCtrlHref()");

            var href = document.createElement("A");
            href.href = "#";
            href.innerHTML = "x";
            href.setAttribute("style", "font-size: 16px; color: red;");
            if (this.model.userIgnoreModel.isBlackList) {
                href.title =
                    // Поместить
                    "\u041f\u043e\u043c\u0435\u0441\u0442\u0438\u0442\u044c " +
                    // пользователя в
                    "\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0432 " +
                    // \"чёрный\" список
                    "\"\u0447\u0451\u0440\u043d\u044b\u0439\" \u0441\u043f\u0438\u0441\u043e\u043a";
            } else {
                href.title =
                    // Удалить
                    "\u0423\u0434\u0430\u043b\u0438\u0442\u044c " +
                    // пользователя из
                    "\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u0437 " +
                    // \"белого\" списка
                    "\"\u0431\u0435\u043b\u043e\u0433\u043e\" \u0441\u043f\u0438\u0441\u043a\u0430";
            }
            app.addEventListener(href, "click", this.controller);

            this.listCtrlHref = href;
        },


        createUserCellContentNode: function() {
            log("C...MessageView.createCollapsedUserCell()");

            this.createListCtrlHref();

            var table = document.createElement("TABLE");
            table.width = "100%";
            var row = table.insertRow(-1);

            var userCell = row.insertCell(-1);
            userCell.width = "95%";
            userCell.appendChild(this.profileHrefNode);

            var hrefCell = row.insertCell(-1);
            hrefCell.width = "5%";
            hrefCell.align = "right";
            hrefCell.appendChild(this.listCtrlHref);

            this.userCellContentNode = table;
        }
    }


    function CHiddenMessageModel(userIgnoreModel, originalMsg, userId, userName) {
        log("CHiddenMessageModel()");

        this.userIgnoreModel    = userIgnoreModel;
        this.originalMsg        = originalMsg;
        this.userId             = userId;
        this.userName           = userName;
        this.isVisible          = true;
    }


    CHiddenMessageModel.prototype = {
        removeFromList: function() {
            this.userIgnoreModel.removeFromList(this.userId);
        },


        addToList: function() {
            this.userIgnoreModel.addToList(this.userId, this.userName);
        }
    }


    function CHiddenMessageController(userIgnoreController, model, view) {
        log("CHiddenMessageController()");

        app.addController(this);

        this.userIgnoreController = userIgnoreController;
        this.model = model;
        this.view = view;
    }


    CHiddenMessageController.prototype = {
        handle: function(src, e) {
            log("CHiddenMessageController.handle(" + src + ", " + e.type + ")");

            if (src == this.view.expandHref) {
                this.view.expand();
                return false;
            } else if (src == this.view.collapseHref) {
                this.view.collapse();
                return false;
            } else if (src == this.view.listCtrlHref) {
                if (this.model.userIgnoreModel.isBlackList) {
                    var msg =
                        // Вы действительно
                        "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e " +
                        // хотите удалить \"
                        "\u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \"" +
                        this.model.userName +
                        // \" из \"чёрного\"
                        "\" \u0438\u0437 \"\u0447\u0451\u0440\u043d\u043e\u0433\u043e\" " +
                        // списка?
                        "\u0441\u043f\u0438\u0441\u043a\u0430?";
                    if (!confirm(msg)) {
                        return false;
                    }

                    this.model.removeFromList();
                } else {
                    var msg =
                        // Вы действительно
                        "\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e " +
                        // хотите добавить \"
                        "\u0445\u043e\u0442\u0438\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \"" +
                        this.model.userName +
                        // \" в \"белый\"
                        "\" \u0432 \"\u0431\u0435\u043b\u044b\u0439\" " +
                        // список?
                        "\u0441\u043f\u0438\u0441\u043e\u043a?";
                    if (!confirm(msg)) {
                        return false;
                    }

                    this.model.addToList();
                }
                this.userIgnoreController.updateSettings();
                document.location.reload();
                return false;
            } else {
                logError("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        }
    }


    function CHiddenMessageView(model, userIgnoreController) {
        log("CHiddenMessageView()");

        this.model = model;
        this.controller = new CHiddenMessageController(userIgnoreController, model, this);
        this.expanded = model.originalMsg;

        this.parseExpandedView();
        this.createUserCellContentNode();
        this.createCollapsedView();

        this.expanded.parentNode.insertBefore(this.collapsed, this.expanded);
    }


    CHiddenMessageView.prototype = {
        createListCtrlHref: function() {
            log("CHiddenMessageView.createListCtrlHref()");

            var href = document.createElement("A");
            href.href = "#";
            href.innerHTML = "+";
            href.setAttribute("style", "font-size: 16px; color: blue;");
            if (this.model.userIgnoreModel.isBlackList) {
                href.title =
                    // Удалить
                    "\u0423\u0434\u0430\u043b\u0438\u0442\u044c " +
                    // пользователя из
                    "\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u0437 " +
                    // \"чёрного\" списка
                    "\"\u0447\u0451\u0440\u043d\u043e\u0433\u043e\" \u0441\u043f\u0438\u0441\u043a\u0430";
            } else {
                href.title =
                    // Добавить
                    "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c " +
                    // пользователя в
                    "\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0432 " +
                    // \"белый\" список
                    "\"\u0431\u0435\u043b\u044b\u0439\" \u0441\u043f\u0438\u0441\u043e\u043a";
            }
            app.addEventListener(href, "click", this.controller);

            this.listCtrlHref = href;
        },


        createUserCellContentNode: CDisplayedMessageView.prototype.createUserCellContentNode,


        createCollapsedView: function() {
            log("CHiddenMessageView.createCollapsedView()");

            var msgTable = document.createElement("TABLE");
            msgTable.className      = "message_hidden";
            msgTable.cellSpacing    = "1";
            msgTable.cellPadding    = "5";
            msgTable.width          = "100%";
            msgTable.style.display  = "none";
            var row = msgTable.insertRow(-1);

            var cellUser = row.insertCell(-1);
            cellUser.width = 200;

            var cellInfo = row.insertCell(-1);

            var cellInfoTable = document.createElement("TABLE");
            cellInfoTable.width  = "100%";
            row = cellInfoTable.insertRow(-1);

            var cellInfoCell1 = row.insertCell(-1);
            cellInfoCell1.width = "40%";

            var cellInfoCell2 = row.insertCell(-1);
            cellInfoCell2.width = "10%";
            cellInfoCell2.align = "center";

            var cellInfoCell3 = row.insertCell(-1);
            cellInfoCell3.width = "40%";
            cellInfoCell3.align = "right";

            var href = document.createElement("A");
            href.href = "#";
            // "РАЗВЕРНУТЬ"
            href.innerHTML = "\u0420\u0410\u0417\u0412\u0415\u0420\u041d\u0423\u0422\u042c";
            app.addEventListener(href, "click", this.controller);
            cellInfoCell2.appendChild(href);

            cellInfo.appendChild(cellInfoTable);

            this.collapsed = msgTable;
            this.collapsedCellUser   = cellUser;
            this.collapsedCellInfo   = cellInfoCell1;
            this.collapsedCellCtrl   = cellInfoCell2;
            this.collapsedCellRating = cellInfoCell3;
            this.expandHref = href;
        },


        parseExpandedView: function() {
            log("CHiddenMessageView.parseExpandedView()");

            xpath = "tbody/tr[1]/td[1]/b";
            this.profileHrefNode = $x1(xpath, this.expanded);
            if (this.profileHrefNode == null) {
                logError("CHiddenMessageView.parseExpandedView(): Profile URL wasn't found");
                return;
            }
            this.expandedCellUser = this.profileHrefNode.parentNode;

            xpath = "tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/a";
            var snapshot = $x(xpath, this.expanded);
            if (snapshot.snapshotLength == 0) {
                logError("CHiddenMessageView.parseExpandedView(): Anchor and date weren't found");
                return;
            }
            this.cellAnchorContent = new Array();
            for (var i = 0; i < snapshot.snapshotLength; i++) {
                var children = snapshot.snapshotItem(i);
                this.cellAnchorContent[i] = children;
            }
            this.expandedCellAnchor = this.cellAnchorContent[0].parentNode;

            var href = document.createElement("A");
            href.href = "#";
            // "СВЕРНУТЬ"
            href.innerHTML = "\u0421\u0412\u0415\u0420\u041d\u0423\u0422\u042c";
            app.addEventListener(href, "click", this.controller);
            var tr = this.expandedCellAnchor.parentNode;
            var td = tr.insertCell(1);
            td.align = "center";
            td.width = "10%";
            td.appendChild(href);
            tr.cells[0].width = "40%";
            tr.cells[2].width = "40%";
            this.collapseHref = href;

            xpath = "tbody/tr[3]/td[2]/table/tbody/tr[1]/td[1]/div";
            this.ratingDiv = $x1(xpath, this.expanded);
            if (this.ratingDiv == null) {
                logError("CHiddenMessageView.parseExpandedView(): Message rating wasn't found");
                return;
            }
            this.expandedCellRating = this.ratingDiv.parentNode;
        },


        createCollapsedUserCell: function() {
            log("CHiddenMessageView.createCollapsedUserCell()");

            var table = document.createElement("TABLE");
            table.width = "100%";
            var row = userTable.insertRow(-1);
            var userCell = userTableRow.insertCell(-1);
            var hrefCell = userTableRow.insertCell(-1);
            hrefCell.align = "right";

            this.collapsedCellUser      = cellUser;
            this.collapsedCellListCtrl  = hrefCell;
        },


        collapse: function() {
            log("CHiddenMessageView.collapse()");

            if (!this.model.isVisible) {
                return;
            }

            this.expanded.style.display = "none";

            this.collapsedCellUser.appendChild(this.userCellContentNode);
            var len = this.cellAnchorContent.length;
            for (var i = 0; i < len; i++) {
                this.collapsedCellInfo.appendChild(this.cellAnchorContent[i]);
            }
            this.collapsedCellRating.appendChild(this.ratingDiv);

            this.collapsed.style.display = "table";

            this.model.isVisible = false;
        },


        expand: function() {
            log("CHiddenMessageView.expand()");

            if (this.model.isVisible) {
                return;
            }

            this.collapsed.style.display = "none";

            this.expandedCellUser.appendChild(this.userCellContentNode);
            var len = this.cellAnchorContent.length;
            for (var i = 0; i < len; i++) {
                this.expandedCellAnchor.appendChild(this.cellAnchorContent[i]);
            }
            this.expandedCellRating.insertBefore(this.ratingDiv, this.expandedCellRating.childNodes[0]);

            this.expanded.style.display = "table";

            this.model.isVisible = true;
        }
    }


    function CUserIgnoreModel(isBlackList, users, scriptUserId) {
        log("CUserIgnoreModel()");

        this.isBlackList = isBlackList;
        this.users = users;
        this.hiddenMessages = new Array();
        this.displayedMessages = new Array();

        xpath = "tbody/tr/td[1]/table[1]/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[1]/b/a[contains(@href,'profile')]";
        var snapshot = $x(xpath, $id("topic_posts"));
        //       b  td tr
        xpath = "../../../td[2]/table/tbody/tr[1]/td[2]/a[@class='all_save_to_journal']";
        for (var i = 0; i < snapshot.snapshotLength; i++) {
            var profileHref = snapshot.snapshotItem(i);
            var saveToJournal = $x1(xpath, profileHref);
            if (saveToJournal != null) {
                log("There is script user's message");
                continue;
            }

            var href = profileHref.href;
            var idx = href.indexOf(";u=");
            if (idx == -1) {
                logError("CUserIgnoreModel(). Can't find user ID. href = " + href);
                continue;
            }
            var userId = href.substr(idx + 3);
            var userName = profileHref.innerHTML;
            //             a           b          td         tr         tbody      table
            var msgTable = profileHref.parentNode.parentNode.parentNode.parentNode.parentNode;
            var contains = users[userId] != null;
            if (contains && isBlackList || !contains && !isBlackList) {
                log("Found hidden message: idx = " + i);
                var len = this.hiddenMessages.length;
                this.hiddenMessages[len] = new CHiddenMessageModel(this, msgTable, userId, userName);
            } else {
                var len = this.displayedMessages.length;
                this.displayedMessages[len] = new CDisplayedMessageModel(this, msgTable, userId, userName);
            }
        }
    }


    CUserIgnoreModel.prototype = {
        removeFromList: function(userId) {
            delete this.users[userId];
        },


        addToList: function(userId, userName) {
            this.users[userId] = userName;
        }
    }


    function CUserIgnoreController(settings) {
        log("CUserIgnoreController()");

        app.addController(this);

        this.settings = settings;
        this.model = new CUserIgnoreModel(settings.userIgnoreType == CSettingsModel.BLACK_LIST, settings.userIgnoreList);
        this.view = new CUserIgnoreView(this.model, this);

        var len = this.model.hiddenMessages.length;
        for (var i = 0; i < len; i++) {
            var msgModel = this.model.hiddenMessages[i];
            this.view.addHiddenMsgView(new CHiddenMessageView(msgModel, this));
        }

        var len = this.model.displayedMessages.length;
        for (var i = 0; i < len; i++) {
            var msgModel = this.model.displayedMessages[i];
            this.view.addDisplayedMsgView(new CDisplayedMessageView(msgModel, this));
        }
    }


    CUserIgnoreController.prototype = {
        collapse: function() {
            this.view.collapse();
        },


        expand: function() {
            this.view.expand();
        },


        updateSettings: function() {
            this.settings.userIgnoreType = this.model.isBlackList ? CSettingsModel.BLACK_LIST : CSettingsModel.WHITE_LIST;
            this.settings.userIgnoreList = this.model.users;
            this.settings.save();
        }
    }


    function CUserIgnoreView(model, controller) {
        log("CUserIgnoreView()");

        this.model = model;
        this.controller = controller;
        this.hiddenMsgViews = new Array();
        this.displayedMsgViews = new Array();
    }


    CUserIgnoreView.prototype = {
        addHiddenMsgView: function(msgView) {
            this.hiddenMsgViews[this.hiddenMsgViews.length] = msgView;
        },


        addDisplayedMsgView: function(msgView) {
            this.displayedMsgViews[this.displayedMsgViews.length] = msgView;
        },


        collapse: function() {
            log("CUserIgnoreView.collapse()");

            var views = this.hiddenMsgViews;
            var len = views.length;
            for (var i = 0; i < len; i++) {
                views[i].collapse();
            }
        },


        expand: function() {
            log("CUserIgnoreView.expand()");

            var views = this.hiddenMsgViews;
            var len = views.length;
            for (var i = 0; i < len; i++) {
                views[i].expand();
            }
        }
    }


    // ****************************************************************************
    // ******************************* Settings ***********************************
    // ****************************************************************************


    function CSettingsModel() {
        log("CSettingsModel()");

        this.isVisible = false;

        this.sett_customAnchors = false;
        this.label_sett_customAnchors =
            // НЕ выдавать
            "\u041d\u0415 \u0432\u044b\u0434\u0430\u0432\u0430\u0442\u044c " +
            // сообщение после
            "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043f\u043e\u0441\u043b\u0435 " +
            // установки закладки
            "\u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 \u0437\u0430\u043a\u043b\u0430\u0434\u043a\u0438";

        this.sett_collapseTopics = false;
        this.label_sett_collapseTopics =
            // Сворачивать
            "\u0421\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0442\u044c " +
            // прочитанные
            "\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 " +
            // темы после загрузки 
            "\u0442\u0435\u043c\u044b \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 " +
            // главной страницы
            "\u0433\u043b\u0430\u0432\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b";

        this.sett_collapseTopics = false;
        this.label_sett_collapseTopics =
            // Сворачивать
            "\u0421\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0442\u044c " +
            // прочитанные
            "\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 " +
            // темы после загрузки 
            "\u0442\u0435\u043c\u044b \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 " +
            // главной страницы
            "\u0433\u043b\u0430\u0432\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b";

        this.userIgnoreType = CSettingsModel.BLACK_LIST;
        this.userIgnoreList = new Array();

        this.load();
    }


    CSettingsModel.BLACK_LIST = 0;
    CSettingsModel.WHITE_LIST = 1;


    CSettingsModel.prototype = {
        store: function(name, value) {
            log("CSettingsModel.store()");

            if (isOpera) {
	            var yearInSec = 365 * 24 * 60 * 60;
	            var now = (new Date()).getTime();
	            var fiveYearsLater = new Date(now + 5 * 1000 * yearInSec);
	            document.cookie = escape(name) + "=" + escape(value) +
	                ";expires=" + fiveYearsLater.toGMTString() +
	                ";path=/";
            } else {
                GM_setValue(name, value);
            }
        },

        restore: function(name) {
            log("CSettingsModel.restore()");

            if (isOpera) {
                var value = null;
	            var cookies = document.cookie.split("; ");
	            for (var i = 0; i < cookies.length; i++) {
		            var cookie = cookies[i].split("=");
		            if (cookie[0] == escape(name)) {
			            try {
				            value = unescape(cookie[1]);
			            } catch(e) {
			                logError("Can't unescape the value of the cookie: '" + cookie[0] + "=" + cookie[1] + "'");
			            }
			            break;
		            }
	            }
	            return value;
            } else {
                return GM_getValue(name);
            }
        },

        save: function() {
            log("CSettingsModel.save()");

            var value = "";
            for (var key in this) {
                if (key.indexOf("sett_") == 0) {
                    if (value.length > 0) {
                        value += ",";
                    }
                    value += key + '=' + this[key];
                }
            }

            if (value.length > 0) {
                value += ",";
            }
            value += "userIgnoreType=";
            value += this.userIgnoreType;

            var users = "";
            if (this.userIgnoreList.length > 0) {
                var regexp = /[,:|]/g;
                for (var id in this.userIgnoreList) {
                    if (users.length > 0) {
                        users += "|";
                    }
                    var name = this.userIgnoreList[id];
                    users += id;
                    users += ":";
                    if (!isOpera) {
                        users += name.replace(regexp, "_");
                    }
                }
            }

            value += ",userIgnoreList=";
            value += users;

            this.store("york_settings", value);
        },

        load: function() {
            log("CSettingsModel.load()");

            var value = this.restore("york_settings");
            if (value == null) {
                logError("Stored settings weren't found");
                return;
            }

            var values = value.split(",");
            for (var i = 0; i < values.length; i++) {
                var setting = values[i].split("=");
                if (setting[0].indexOf("sett_") == 0) {
                    this[setting[0]] = eval(setting[1]);
                } else if (setting[0] == "userIgnoreType") {
                    this.userIgnoreType = parseInt(setting[1]);
                } else if (setting[0] == "userIgnoreList") {
                    var idNamePairs = setting[1].split("|");
                    var len = idNamePairs.length;
                    for (var j = 0; j < len; j++) {
                        var pair = idNamePairs[j].split(":");
                        if (pair[0] != null && pair[1] != null) {
                            this.userIgnoreList[pair[0]] = pair[1];
                        }
                    }
                } else {
                    logError("CSettingsModel.load(): Unknown setting: " + values[i]);
                }
            }
        }
    };


    function CSettingsController(model, parentNode) {
        log("CSettingsController()");

        app.addController(this);

        this.model = model;
        this.view = new CSettingsView(this, parentNode);
    }


    CSettingsController.prototype = {
        handle: function(src, e) {
            log("CSettingsController.handle(" + src + ", " + e.type + ")");

            var view = this.view;
            if (src == view.btnSave) {
                this.showHideForm();
                this.synchronizeModel();
                this.model.save();
                document.location.reload();
                return false;
            } else if (src == view.href || src == view.btnCancel) {
                this.showHideForm();
                return false;
            } else if (src == view.userIgnoreBtnDelete) {
                var select = view.userIgnoreSelect;
                var options = select.options;
                var len = options.length;
                var idx = -1;
                for (var i = 0; i < len; i++) {
                    if (options[i].selected) {
                        idx = i;
                        break;
                    }
                }
                if (idx != -1) {
                    var option = options[idx];
                    select.removeChild(option);
                    len--;
                    if (idx < len) {
                        options[idx].selected = true;
                    } else if (len > 0) {
                        options[len - 1].selected = true;
                    }
                } else {
                    logError("CSettingsController.handle(): selectedIndex = " + idx);
                }
                return false;
            } else {
                logError("CSettingsController.handle(): An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        },

        synchronizeForm: function() {
            log("CSettingsController.synchronizeForm()");

            var model = this.model;
            var view = this.view;
            for (var key in model) {
                if (key.indexOf("sett_") == 0) {
                    var checkbox = view[key];
                    if (checkbox != null) {
                        checkbox.checked = model[key];
                    }
                }
            }

            if (model.userIgnoreType == CSettingsModel.BLACK_LIST) {
                view.userIgnoreRadioBlack.checked = true;
                view.userIgnoreRadioWhite.checked = false;
            } else {
                view.userIgnoreRadioBlack.checked = false;
                view.userIgnoreRadioWhite.checked = true;
            }

            // Вывожу элементы в порядке их идентификаторов
            var sortedIds = new Array();
            for (var id in model.userIgnoreList) {
                sortedIds[sortedIds.length] = parseInt(id);
            }
            // Почему-то sort() без параметра не работала, пришлось написать функцию
            sortedIds.sort(function(a, b) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });

            var select = view.userIgnoreSelect;
            // Удаляю все существующие элементы
            var len = select.options.length;
            for (i = len - 1; i >= 0; i--) {
                select.removeChild(select.options[i]);
            }

            len = sortedIds.length;
            for (var i = 0; i < len; i++) {
                var option = document.createElement("OPTION");
                var id = sortedIds[i];
                var name = model.userIgnoreList[new String(id)];
                option.value = id;
                option.setAttribute("userName", name);
                if (name.length > 0) {
                    option.innerHTML = id + " (" + name + ")";
                } else {
                    option.innerHTML = id;
                }
                select.options[select.options.length] = option;
            }
            if (select.options.length > 0) {
                select.options[0].selected = true;
            }
        },


        synchronizeModel: function() {
            log("CSettingsController.synchronizeModel()");

            var model = this.model;
            var view = this.view;
            for (var key in view) {
                if (key.indexOf("sett_") == 0) {
                    var checkbox = view[key];
                    if (checkbox != null) {
                        model[key] = checkbox.checked;
                    }
                }
            }

            model.userIgnoreType =
                view.userIgnoreRadioBlack.checked ?
                CSettingsModel.BLACK_LIST :
                CSettingsModel.WHITE_LIST;

            model.userIgnoreList = new Array();
            var options = view.userIgnoreSelect.options;
            var len = options.length;
            for (var i = 0; i < len; i++) {
                var userId = options[i].value;
                var userName = options[i].getAttribute("userName");
                model.userIgnoreList[userId] = userName;
            }
        },


        showHideForm: function() {
            if (this.model.isVisible) {
                this.view.div.style.visibility = "hidden";
                this.model.isVisible = false;
            } else {
                this.synchronizeForm();
                this.view.div.style.visibility = "visible";
                this.model.isVisible = true;
            }
        }
    }


    function CSettingsView(controller, parentNode) {
        this.model = controller.model;
        this.controller = controller;
        this.parentNode = parentNode;

        this.href = document.createElement("A");
        this.href.href = "#";
        // Настройки
        this.href.innerHTML = "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438";
        app.addEventListener(this.href, "click", this.controller);

        this.form = document.createElement("FORM");
        var form = this.form;
        var model = controller.model;
        for (var key in model) {
            if (key.indexOf("sett_") == 0) {
                var input = document.createElement("INPUT");
                input.type = "checkbox";
                this[key] = input;

                var label = document.createElement("LABEL");
                label.appendChild(input);
                label.appendChild(document.createTextNode(model["label_" + key]));

                form.appendChild(label);
                form.appendChild(document.createElement("BR"));
            }
        }

        this.createUserIgnoreSettingsView();

        var button = document.createElement("INPUT");
        button.type = "button";
        // Сохранить
        button.value = "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c";
        app.addEventListener(button, "click", this.controller);
        this.btnSave = button;
        form.appendChild(button);
        form.appendChild(document.createTextNode(" "));

        button = document.createElement("INPUT");
        button.type = "button";
        // Отменить
        button.value = "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c";
        app.addEventListener(button, "click", this.controller);
        this.btnCancel = button;
        form.appendChild(button);

        this.div = document.createElement("DIV");
        this.div.setAttribute("style", DIV_STYLE);
        this.div.appendChild(form);

        parentNode.appendChild(this.href);
        parentNode.appendChild(this.div);

        // Продолжаем обработку настроек игнорирования пользователей
        this.userIgnoreRadioBlack   = $id("york_user_ignore_type_black");
        this.userIgnoreRadioWhite   = $id("york_user_ignore_type_white");
        this.userIgnoreSelect       = $id("york_user_ignore_select");
        this.userIgnoreBtnDelete    = $id("york_user_ignore_btn_delete");
        app.addEventListener(this.userIgnoreBtnDelete, "click", this.controller);
    }


    CSettingsView.prototype = {
        createUserIgnoreSettingsView: function() {
            var div = document.createElement("DIV");
            div.setAttribute("style", "border: 1px solid black; margin-top: 10px; margin-bottom: 10px; padding: 5px; width: 300px;");
            div.innerHTML =
                // Автоскрытие сообщений
                "<b>\u0410\u0432\u0442\u043e\u0441\u043a\u0440\u044b\u0442\u0438\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439</b>" +
                "<br/>" +
                "<br/>" +
                // Тип списка:
                "\u0422\u0438\u043f \u0441\u043f\u0438\u0441\u043a\u0430:&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<label>" +
                    "<input type='radio' name='york_user_ignore_type' id='york_user_ignore_type_black'/> " +
                    // "Чёрный"
                    "\"\u0427\u0451\u0440\u043d\u044b\u0439\"" +
                "</label>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<label>" +
                    "<input type='radio' name='york_user_ignore_type' id='york_user_ignore_type_white'/> " +
                    // "Белый"
                    "\"\u0411\u0435\u043b\u044b\u0439\"" +
                "</label>" +
                "<br/>" +
                "<br/>" +
                // Список пользователей:
                "\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439:" +
                "<table width='100%' cellpadding='0' cellspacint='0'>" +
                    "<tr>" +
                        "<td width='90%'>" +
                            "<select id='york_user_ignore_select' size='10' style='width: 100%;'>" +
                            "</select>" +
                        "</td>" +
                        "<td width='10%' valign='top'>" +
                            // Удалить
                            "<input type='button' id='york_user_ignore_btn_delete' value='\u0423\u0434\u0430\u043b\u0438\u0442\u044c'/> " +
                        "</td>" +
                    "</tr>" +
                "</table>" +
                "";

            this.form.appendChild(div);
        }
    }


    // ****************************************************************************
    // ******************************** Search ************************************
    // ****************************************************************************


    function CSearchModel(topicId) {
        log("CSearchModel(" + topicId + ")");

        this.isVisible = false;
        this.isTopic = topicId != null;
        if (this.isTopic) {
            this.topicId = topicId;
            this.topicTitle = document.title;
        }
    }


    function CSearchController(pageCtrl, parentNode) {
        log("CSearchController()");

        app.addController(this);

        this.pageCtrl = pageCtrl;
        this.model = new CSearchModel(pageCtrl.model.topicId);
        this.view = new CSearchView(this.model, this, parentNode);
    }


    CSearchController.prototype = {
        handle: function(src, e) {
            log("CSearchController.handle(" + src + ", " + e.type + ")");

            if (src == this.view.form) {
                if (this.model.isTopic) {
                    var view = this.view;
                    var form = view.form;
                    if (view.getCheckbox().checked) {
                        form.appendChild(view.getInputTopicId());
                        form.appendChild(view.getInputTopicTitle());
                    } else {
                        form.removeChild(view.getInputTopicId());
                        form.removeChild(view.getInputTopicTitle());
                    }
                }

                this.showHideForm();

                return true;
            } else if (src == this.view.href) {
                this.showHideForm();
                return false;
            } else {
                logError("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        },

        showHideForm: function() {
            if (this.model.isVisible) {
                this.view.div.style.visibility = "hidden";
                this.model.isVisible = false;
            } else {
                this.view.div.style.visibility = "visible";
                this.view.getInputText().focus();
                this.model.isVisible = true;
            }
        }
    };


    function CSearchView(model, controller, parentNode) {
        log("CSearchView()");

        this.model = model;
        this.controller = controller;

        this.href = document.createElement("A");
        this.href.href = "#";
        this.href.innerHTML =
            "<img src='http://www.google.com/favicon.ico' alt='g' style='vertical-align: middle; height: 15px;'/> " +
            // Поиск с Google
            "\u041f\u043e\u0438\u0441\u043a \u0441 Google";
        app.addEventListener(this.href, "click", this.controller);

        this.form = document.createElement("FORM");
        var form = this.form;
        form.method = "GET";
        form.action = "http://www.google.com/search";
        form.target = "_blank";
        form.innerHTML =
            "<input type='text' id='york_search_text' name='q' value='' size='30'/>" +
            // Поиск
            "<input type='submit' value='\u041f\u043e\u0438\u0441\u043a'/>";
        if (model.isTopic) {
            form.innerHTML +=
                "<br/>" +
                "<input type='checkbox' id='york_checkbox_in_topic' checked/>" +
                "<label for='york_checkbox_in_topic'>" +
                    // Только в текущей теме
                    "\u0422\u043e\u043b\u044c\u043a\u043e \u0432 \u0442\u0435\u043a\u0443\u0449\u0435\u0439 \u0442\u0435\u043c\u0435" +
                "</label>" +
                "<input type='hidden' id='york_search_topic_id' name='q' value='inurl:" + model.topicId + "'/>" +
                "<input type='hidden' id='york_search_topic_title' name='q' value='intitle:\"" + model.topicTitle + "\"'/>";
        }
        form.innerHTML +=
            "<input type='hidden' name='q' value='site:avanturist.org'/>" +
            "<input type='hidden' name='q' value='inurl:forum'/>" +
            "<input type='hidden' name='q' value='inurl:topic'/>";

        app.addEventListener(this.form, "submit", this.controller);

        this.div = document.createElement("DIV");
        this.div.align = "left";
        this.div.setAttribute("style", DIV_STYLE);
        this.div.appendChild(this.form);

        parentNode.appendChild(this.href);
        parentNode.appendChild(this.div);
    }


    CSearchView.prototype = {
        getInputText: function() {
            if (this.inputText == null) {
                this.inputText = $id("york_search_text");
            }
            return this.inputText;
        },

        getInputTopicId: function() {
            if (this.inputTopicId == null) {
                this.inputTopicId = $id("york_search_topic_id");
            }
            return this.inputTopicId;
        },

        getInputTopicTitle: function() {
            if (this.inputTopicTitle == null) {
                this.inputTopicTitle = $id("york_search_topic_title");
            }
            return this.inputTopicTitle;
        },

        getCheckbox: function() {
            if (this.checkbox == null) {
                this.checkbox = $id("york_checkbox_in_topic");
            }
            return this.checkbox;
        }
    }


    // ****************************************************************************
    // ********************************* Page *************************************
    // ****************************************************************************


    function CPageModel() {
        log("CPageModel()");

        if (jQueryInstalled && /myarchive/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_ARCHIVE;
        } else if (jQueryInstalled && /myjournal/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_JOURNAL;
        } else if (jQueryInstalled && /index\.php.+topic[=,]/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_TOPIC;
        } else if (jQueryInstalled && /index\.php.+board[=,]/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_BOARD;
        } else if (jQueryInstalled && /\/forum\//.test(url)) {
            var contentTable = $id("category");
            if (contentTable != null && contentTable.tagName == "TABLE") {
                this.pageType = CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE;
            } else {
                this.pageType = CPageModel.PAGE_TYPE_OTHER_FORUM_PAGE;
            }
        } else {
            this.pageType = CPageModel.PAGE_TYPE_OTHER_SITE_PAGE;
        }
        log("Page type = " + this.pageType);

        if (CPageModel.PAGE_TYPE_TOPIC == this.pageType) {
            var input = $id("topic_id");
            log("topic_id = " + input);
            if (input != null && input.nodeType == 1 && input.tagName == "INPUT") {
                this.topicId = input.value;
            }
        }
    }


    CPageModel.PAGE_TYPE_ARCHIVE            = 0x0201;
    CPageModel.PAGE_TYPE_JOURNAL            = 0x0202;
    CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE    = 0x0104;
    CPageModel.PAGE_TYPE_BOARD              = 0x0108;
    CPageModel.PAGE_TYPE_TOPIC              = 0x0110;
    CPageModel.PAGE_TYPE_OTHER_FORUM_PAGE   = 0x0120;
    CPageModel.PAGE_TYPE_OTHER_SITE_PAGE    = 0x0240;

    CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP   = 0x0100;
    CPageModel.PAGE_TYPE_FORUM_SITE_GROUP   = 0x0200;


    function CPageController(isForumPage, isTopic) {
        log("CPageController()");

        app.addController(this);

        this.settings = new CSettingsModel();
        this.model = new CPageModel();
        this.view = new CPageView(this, this.model);

        if ((this.model.pageType & CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP) != 0) {
            this.searchCtrl = new CSearchController(this, this.view.forumMenu.cells[2]);

            // Настраиваем меню скрипта
            var settingsCell = this.view.scriptMenu.insertCell(-1);
            this.settingsCtrl = new CSettingsController(this.settings, settingsCell);
            var cell = this.view.scriptMenu.insertCell(-1);
            this.view.createUserMenuItems(cell);
        }
        if (CPageModel.PAGE_TYPE_TOPIC == this.model.pageType) {
            this.userIgnoreController = new CUserIgnoreController(this.settings);
            this.userIgnoreController.collapse();
        }
    }


    CPageController.prototype = {
        handle: function(src, e) {
            log("CPageController.handle(" + src + ", " + e.type + ")");

            if (src == this.view.anchorMgrHref) {
                alert("TODO anchorMgrHref");
                return false;

            } else if (src == this.view.collapseAllBoards) {
                // TODO: переделать
                topicWrapper.collapse();
                return false;

            } else if (src == this.view.expandAllBoards) {
                // TODO: переделать
                topicWrapper.expand();
                return false;

            } else if (src == this.view.collapseIgnoredMsgs) {
                alert("TODO collapseIgnoredMsgs");
                return false;

            } else if (src == this.view.expandIgnoredMsgs) {
                alert("TODO expandIgnoredMsgs");
                return false;
            } else {
                logError("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        }
    };


    function CPageView(contoller, model) {
        log("CPageView()");

        this.controller = contoller;
        this.model = model;

        if ((model.pageType & CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP) != 0) {
            var xpath = "./table[@class='info']/tbody/tr[1]/td[2]/table[@class='info_panel']";
            var infoPanel = $x1(xpath);
            if (infoPanel == null) {
                logError("CPageView(): TABLE 'info_panel' wasn't found");
                return;
            }

            xpath = "tbody/tr[1]/td[@class='info_header']/table[1]/tbody[1]/tr[1]"
            this.forumMenu = $x1(xpath, infoPanel);
            if (this.forumMenu == null) {
                logError("CPageView(): the forum menu wasn't found");
                return;
            }

            xpath = "tbody/tr[2]/td[1]/table/tbody/tr[1]";
            this.userMenu = $x1(xpath, infoPanel);
            if (this.forumMenu == null) {
                logError("CPageView(): the user menu wasn't found");
                return;
            }

            var td = document.createElement("TD");
            td.width = 120;
            td.style.textAlign = "right";

            this.forumMenu.insertBefore(td, this.forumMenu.cells[2]);
            // FIX: Opera v9.0 - v9.25
            this.forumMenu.parentNode.parentNode.width = "99%";

            td = document.createElement("TD");
            td.innerHTML = 
                // Статистика
                "<a href='http://www.avanturist.org/forum/index.php?action=stats'>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430</a>" +
                "&nbsp;&nbsp;<b>&middot;</b>&nbsp;&nbsp;" +
                // Непрочитанные темы
                "<a href='http://www.avanturist.org/forum/index.php?action=unread'>\u041d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 \u0442\u0435\u043c\u044b</a>" +
                "&nbsp;&nbsp;<b>&middot;</b>&nbsp;&nbsp;" +
                // Непрочитанные ответы
                "<a href='http://www.avanturist.org/forum/index.php?action=unreadreplies'>\u041d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 \u043e\u0442\u0432\u0435\u0442\u044b</a>" +
                "&nbsp;&nbsp;<b>&middot;</b>&nbsp;&nbsp;" +
                // Последние сообщения
                "<a href='http://www.avanturist.org/forum/index.php?action=recent'>\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f</a>" +
                "";
            this.userMenu.insertBefore(td, this.userMenu.cells[0]);

            // Создаю меню скрипта
            //                    tr       tbody      table      td
            var parentCell = this.userMenu.parentNode.parentNode.parentNode;
            var hr = document.createElement("HR");
            hr.setAttribute("style", "margin: 0px; padding: 0px; border-top: 1px solid black; border-bottom-style: none;");

            var table = document.createElement("TABLE");
            table.cellSpacing = 0;
            table.cellPadding = 0;
            table.style.margin = "2px";
            table.style.padding = "2px";
            this.scriptMenu = table.insertRow(-1);
            this.scriptMenu.vAlign = "bottom";
            var td = this.scriptMenu.insertCell(-1);
            td.style.paddingLeft = "2px";
            // Скрипт:
            td.innerHTML = "<b>\u0421\u043a\u0440\u0438\u043f\u0442:</b>&nbsp;&nbsp;";

            parentCell.appendChild(hr);
            parentCell.appendChild(table);
        }
    }


    CPageView.prototype = {
        createUserMenuItems: function(parentNode) {
            var delimiter = document.createElement("SPAN");
            delimiter.innerHTML = "&nbsp;&nbsp;<b>&middot;</b>&nbsp;&nbsp;";

            var href;

            // TODO: Дублирование кода, выделить метод создающий пункт меню
            if (CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE == this.model.pageType) {
//                href = document.createElement("A");
//                href.href = "#";
//                // Показать управление закладками
//                href.innerHTML = "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u043b\u0430\u0434\u043a\u0430\u043c\u0438";
//                app.addEventListener(href, "click", this.controller);
//                this.anchorMgrHref = href;
//                parentNode.appendChild(delimiter.cloneNode(true));
//                parentNode.appendChild(href);

                href = document.createElement("A");
                href.href = "#";
                // Свернуть все разделы
                href.innerHTML = "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0435 \u0440\u0430\u0437\u0434\u0435\u043b\u044b";
                app.addEventListener(href, "click", this.controller);
                this.collapseAllBoards = href;
                parentNode.appendChild(delimiter.cloneNode(true));
                parentNode.appendChild(href);

                href = document.createElement("A");
                href.href = "#";
                // Развернуть все разделы
                href.innerHTML = "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0435 \u0440\u0430\u0437\u0434\u0435\u043b\u044b";
                app.addEventListener(href, "click", this.controller);
                this.expandAllBoards = href;
                parentNode.appendChild(delimiter.cloneNode(true));
                parentNode.appendChild(href);
           } else if (CPageModel.PAGE_TYPE_TOPIC == this.model.pageType) {
//                href = document.createElement("A");
//                href.href = "#";
//                // Свернуть игнорируемые сообщения
//                href.innerHTML = "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f";
//                app.addEventListener(href, "click", this.controller);
//                this.collapseIgnoredMsgs = href;
//                parentNode.appendChild(delimiter.cloneNode(true));
//                parentNode.appendChild(href);

//                href = document.createElement("A");
//                href.href = "#";
//                // Развернуть игнорируемые сообщения
//                href.innerHTML = "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f";
//                app.addEventListener(href, "click", this.controller);
//                this.expandIgnoredMsgs = href;
//                parentNode.appendChild(delimiter.cloneNode(true));
//                parentNode.appendChild(href);
           }
        }
    }



    // ****************************************************************************
    // ********************************** App *************************************
    // ****************************************************************************


    app = {
        controllers: new Array(),

        run: function() {
            log("app.run()");

            this.pageController = new CPageController();


            var isForumPage = false;
            var isTopic = false;
            if (jQueryInstalled && /myarchive/.test(url)) {
                handleArchivePage();
            } else if (jQueryInstalled && /myjournal/.test(url)) {
                handleJournalPage();
            } else if (jQueryInstalled && /index\.php.+topic[=,]/.test(url)) {
                isForumPage = true;
                isTopic = true;
                handleTopicPage();
            } else if (jQueryInstalled && /index\.php.+board[=,]/.test(url)) {
                isForumPage = true;
                handleBoardPage();
            } else if (jQueryInstalled && /\/forum\//.test(url)) {
                var contentTable = $id("category");
                if (contentTable != null && contentTable.tagName == "TABLE") {
                    isForumPage = true;
                    handleForumMainPage();
                } else {
                    isForumPage = true;
                    handleOtherForumPages();
                }
            } else {
                handleOtherSitePages();
            }
        },

        addController: function(controller) {
            controller.idx = app.controllers.length;
            app.controllers[controller.idx] = controller;
        },

        actionHandler: function(e) {
            log("actionHandler()");

            e = e || window.event;
            var src = e.srcelement ? e.srcelement : e.target;

            var controllerIdx = src.getAttribute("ctrl_idx");
            while (controllerIdx == null) {
                src = src.parentNode;
                if (src != null && typeof src.getAttribute == "function") {
                    controllerIdx = src.getAttribute("ctrl_idx");
                } else {
                    break;
                }
            }
            if (controllerIdx == null) {
                src = e.srcelement ? e.srcelement : e.target;
                logError("Controller index wasn't found. Event: type = " + e.type + ", src = " + src);
                return true;
            }

            var controller = app.controllers[parseInt(controllerIdx)];
            if (controller != null) {
                var res = controller.handle(src, e);
                if (!res) {
                    e.returnValue = false;
                    if (typeof e.preventDefault != "undefined") {
                        e.preventDefault();
                    }
                }
                return res;
            } else {
                logError("Controller wasn't found. Event: type = " + e.type + ", src = " + src + ", controllerIdx = " + controllerIdx);
                return true;
            }
        },

        addEventListener: function(element, type, controller) {
            element.setAttribute("ctrl_idx", controller.idx);
            element.addEventListener(type, app.actionHandler, false);
        }
    };


    // ****************************************************************************
    // ********************************* START ************************************
    // ****************************************************************************


    app.run();

    var end = new Date();
    log("END: " + end);
    log("SCRIPT TOOK " + (end.getTime() - start.getTime()) + " ms");
}


if (isOpera) {
    // TODO оптимизация загрузки страниц архива, улучшить код, написать таку. же для журнала
    if (/myarchive/.test(url)) {
        window.opera.addEventListener(
            "BeforeExternalScript",
            function (e) {
                var src = e.element.getAttribute('src');
                if (src.match(/ga_mycolumns\.js$|ga_myjournal\.js$/)) {
                    e.preventDefault();
                }
            },
            false
        );
    }

    if(typeof(opera.version) == "function" && opera.version() >= 9) {
        log("Opera 9.x. Subscribing on the DOMContentLoaded event");
        document.addEventListener("DOMContentLoaded", onLoad, false);
    } else {
        log("Opera older then 9.0. Subscribing on the load event");
        document.addEventListener('load', onLoad, false);
    }
} else {
    log("Firefox. Calling onLoad()");
    onLoad();
}
