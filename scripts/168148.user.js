// ==UserScript==
// @name           Avanturist.org.PATCH (unpacked)
// @description    Avanturist.org forum York PATCH (unpacked)
// @version        0.12.45
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*

// ==/UserScript==

// NOTE! Справедливо для Opera! Если имя файла скрипта оканчивается на
// ".user.js", то выполняется эмуляция GreaseMonkey, и скрипт запускается после
// загрузки страницы и только на сайтах из @include. Иначе, скрипт запускается
// на всех сайтах когда страница ещё не загружена.
// Второй вариант предпочтительнее!

var scriptVersion = "0.12.45";
var scriptDate = "04.04.2014";

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

if (window.HTMLAnchorElement != null && HTMLAnchorElement.prototype.click == null)
{
	HTMLAnchorElement.prototype.click = function()
	{
		var event = this.ownerDocument.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		if(this.dispatchEvent(event) && this.href != null) document.location.href = this.href;
	};
}

(function () {

var app;
var wnd = typeof unsafeWindow != "undefined" ? unsafeWindow : window;
var userAgent = navigator.userAgent.toLowerCase();
var isOpera = /opera/.test(userAgent);
var isChrome = /chrome/.test(userAgent);
var isFirefox = /firefox/.test(userAgent);
var url = location.href;
var clearUrl = url.replace(/#.*/, "");
var debug = /^.*#enable_log$/.test(url);
var start;
var xpathCounter = 0;

// ****************************************************************************
// ********************************* HTML *************************************
// ****************************************************************************


// TODO: Здесь одна проблема, форма вставляется на страницу, и в одном случае оказывается вложенной.
// По-моему, вложенные формы запрещены, но в данный момент работает, благодаря div
var formHtml =
    "<div id='york_div%idx%' style='visibility: hidden; z-index: 10; " +
         "position: absolute; background-color: rgb(245, 245, 250); " +
         "border-style: solid; border-width: 1px; border-color: " +
         "rgb(60, 97, 164); padding: 3px; font-size: 13px; color: #000000;'>" +
    "  <form id='york_form%idx%' method='get' action='/forum/index.php'>" +
    "    <input type='hidden' id='york_topic%idx%' name='topic' value=''/>" +
    "    <input type='hidden' id='york_start%idx%' name='start' value=''/>" +
    //   Номер страницы:
    "    \u041d\u043e\u043c\u0435\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b:" +
    "    <input type='text' id='york_page%idx%' value='' maxlength='4' size='4'/>" +
    //   Перейти
    "    <input type='submit' value='\u041f\u0435\u0440\u0435\u0439\u0442\u0438'/>" +
    "  </form>" +
    "</div>";


// ****************************************************************************
// ******************************** LOGGER ************************************
// ****************************************************************************

var Logger;

if (debug) {
    /**
     * @constructor
     */
    Logger = function(context) {
        this.context = "AVANTURIST.ORG " + context + "() ";
        this.errorContext = "AVANTURIST.ORG ERROR " + context + "() ";

        var len = arguments.length;
        if (1 < len) {
            var callee = "Arguments: ";
            for (var i = 1; i < len; ++i) {
                if (i != 1) {
                    callee += ", ";
                }
                callee += arguments[i];
            }

            this.trace(callee);
        } else {
            this.trace("");
        }
    };
} else {
    /**
     * @constructor
     */
    Logger = function(context) {
        this.errorContext = "AVANTURIST.ORG ERROR " + context + "() ";
    };
}

// Определяем метод trace
if (debug) {
    if (isOpera) {
        Logger.prototype.trace = function(msg) {
            opera.postError(this.context + msg);
        };
    } else if (isChrome) {
        Logger.prototype.trace = function(msg) {
            console.log(this.context + msg);
        };
    } else if (isFirefox) {
        Logger.prototype.trace = function(msg) {
            GM_log(this.context + msg);
        };
    } else {
        Logger.prototype.trace = function() {
        };
    }
} else {
    Logger.prototype.trace = function() {
    };
}

// Определяем метод debug
if (isOpera) {
    Logger.prototype.error = function(msg) {
        opera.postError(this.errorContext + msg);
    };

} else if (isChrome) {
    Logger.prototype.error = function(msg) {
        console.error(this.errorContext + msg);
    };

} else if (isFirefox) {
    Logger.prototype.error = function(msg) {
        GM_log(this.errorContext + msg);
    };

} else {
    Logger.prototype.error = function() {
    };
}


// ****************************************************************************
// ******************************** HELPERS ***********************************
// ****************************************************************************


function $id(id) {
    return document.getElementById(id);
}


function $x(xpath, context) {
    var log = new Logger("$x", xpath);

    ++xpathCounter;
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


function throwException(log, msg) {
    log.error(msg);
    throw msg;
}


// Функцию почти без изменений взял в forum.js, лишь добавил переводы строк после
// некоторых фигурных скобок.
// Пришлось копировать функцию, т.к. в Google Chrome нет доступа к глобальным
// функциям объявленным в скриптах страницы.
// Хотя странно, что при этом есть объект wnd.$ (jQuery).
function surroundText(a,c,b) {
    if(typeof b.caretPos!="undefined"&&b.createTextRange) {
        var d=b.caretPos,e=d.text.length;d.text=d.text.charAt(d.text.length-1)==" "?a+d.text+c+" ":a+d.text+c;if(e==0){d.moveStart("character",-c.length);d.moveEnd("character",-c.length);d.select()}else b.focus(d)
    } else if (typeof b.selectionStart!="undefined") {
        d=b.value.substr(0,b.selectionStart);e=b.value.substr(b.selectionStart,b.selectionEnd-b.selectionStart);var g=b.value.substr(b.selectionEnd),f=b.selectionStart,h=b.scrollTop;
        b.value=d+a+e+c+g;if(b.setSelectionRange){e.length==0?b.setSelectionRange(f+a.length,f+a.length):b.setSelectionRange(f,f+a.length+e.length+c.length);b.focus()}b.scrollTop=h
    } else {
        b.value+=a+c;b.focus(b.value.length-1)
    }
}


// TODO переделать, надо бы topic_id где-нибудь хранить, а не вычислять каждый раз
function getTopicId() {
    var log = new Logger("getTopicId");

    var regexp = /^.*\/forum\/(\d+)(\/)?.*/;
    var matches = regexp.exec(url);
    if (matches != null && 2 <= matches.length) {
        return parseInt(matches[1]);
    } else {
        return null;
    }
}


function showHideForm(e) {
    var log = new Logger("showHideForm");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;

    var divId = src.getAttribute("div_id");
    var div = $id(divId);
    if (div.style.visibility == "visible") {
        div.style.visibility = "hidden";
        log.trace("Form " + divId + " was hidden");
    } else {
        div.style.visibility = "visible";
        var inputId = src.getAttribute("input_id");
        if (inputId != null) {
            var input = $id(inputId);
            input.focus();
        }
        log.trace("Form " + divId + " was showed");
    }

    e.returnValue = false;
    if (typeof e.preventDefault != "undefined") {
        e.preventDefault();
    }
    return false;
}


// ****************************************************************************
// ****************************** XPathHelper *********************************
// ****************************************************************************

var XPathHelper = function() {};

XPathHelper.linkRelPrev         = "/html/head/link[@rel='prev']";
XPathHelper.linkRelNext         = "/html/head/link[@rel='next']";

// Все картинки страницы с пустым alt
XPathHelper.imgEmptyAlt         = "//img[@alt='']";

XPathHelper.divMain             = "./div[@class='layout']";

XPathHelper.divMenuSite         = XPathHelper.divMain + "/div[@class='menu']";
XPathHelper.divMenuSiteItems    = XPathHelper.divMain + "/div[@class='menu']";

XPathHelper.divMenuUser         = XPathHelper.divMain+"/div[@class='headRegion']"+"/div[contains(@class,'user')]";
XPathHelper.tableMenuUser       = XPathHelper.divMenuUser + "/table[1]";  //"/table[not(@class)]";/html/body/div/div/div[2]
XPathHelper.tdCabinet           = "./tbody/tr/td[3]";
XPathHelper.tableRowMenuUser    = XPathHelper.tableMenuUser + "/tbody[1]/tr[1]";
XPathHelper.aSignup             = XPathHelper.tableRowMenuUser + "/td/a[contains(@href, '/signup')]";

XPathHelper.divContainer        = XPathHelper.divMain + "/div[@class='contentRegion']"; // + "/div[@class='container']";
XPathHelper.divContent          = XPathHelper.divContainer + "/div[@class='leftCenterContainer']" + "/div[@class='contentColumn']"; // + "/div[@class='content-leftcenter']";

XPathHelper.tableMenuForum      = XPathHelper.divContent + "/table[2]/tbody/tr/td/table";

XPathHelper.trMenuForum         = XPathHelper.tableMenuForum + "/tbody[1]/tr[1]";
XPathHelper.divMenuUser         = XPathHelper.divMain+"/div[@class='headRegion']"+"/div[contains(@class,'user')]";
//XPathHelper.tableMenuUser       = XPathHelper.divMenuUser + "/table[1]";  //"/table[not(@class)]";/html/body/div/div/div[2]
//XPathHelper.divMenuUser         = XPathHelper.divMain+"/div[@class='headRegion']"+"/div[contains(@class,'user')]";
//XPathHelper.tableMenuUser       = XPathHelper.divMenuUser + "/table[1]";  //"/table[not(@class)]";/html/body/div/div/div[2]

// Тег B с троеточием между номерами страниц
XPathHelper.bPagerDots          = XPathHelper.divContent + "//b[ contains(text(), '...') and 0<count(preceding-sibling::a[@class='navPages']) ]";

XPathHelper.tableBoardTable     = XPathHelper.divContent + "/table[contains(@class, 'board')]";
// Строка с названием раздела в BoardTable
XPathHelper.trBoard             = XPathHelper.tableBoardTable + "/tbody[1]/tr[ th[6<=number(@colspan)] ]"; //table[@class='boardTable'] ]";
// Путь к относительно XPathHelper.trBoard к строке таблицы с данными о разделе
XPathHelper.trBoardContent      = "./th/table[1]/tbody[1]/tr[1]"; //"./th/table[@class='boardTable']/tbody[1]/tr[1]";
// Тег SMALL, содержащий список модераторов раздела или ветки
XPathHelper.smallModerators     = XPathHelper.trBoard + "/th[1]/div";//table[@class='boardTable']/tbody[1]/tr/th/small | " +
                                  XPathHelper.tableBoardTable + "/tbody[1]/tr/td[2]/small";

// Список ссылок на профили активных пользователей, идёт после таблицы XPathHelper.tableBoardTable
XPathHelper.aUsersOnline        = XPathHelper.tableBoardTable + "/following-sibling::table/tbody[1]/tr[3]/td[2]/a[contains(@href, 'profile')]";

XPathHelper.divBottom           = XPathHelper.divMain + "/div[@class='bottomRegion']";
// BR после строки "SMF © 2006, Simple Machines LLC"
XPathHelper.brCopyright         = XPathHelper.divBottom + "/table[1]"; //"/div[1]"; //"/br[1]";

XPathHelper.divMessages         = XPathHelper.divContent + "/div[@id='forummessagelist_list']"; //"/form[@id='form-message']"; //"/div[@id='messagesDiv']";
XPathHelper.msgTable            = XPathHelper.divMessages + "/table[@class='board forummessagelist_message']"; //"/div[3]"; //"/table[@class='board forummessage_message']";
XPathHelper.msgTableBody        = XPathHelper.msgTable + "/tbody[1]"; //"/div[1]/table[1]/tbody[1]"; //
XPathHelper.trMsgTitle          = XPathHelper.msgTableBody + "/tr[1]/td[2]/table[1]/tbody[1]/tr[1]";
// Тег A с именем автора сообщения
XPathHelper.aMsgAuthor          = XPathHelper.msgTableBody + "/tr[1]/td[1]/a[contains(@href,'profile')]";
// Ячейчи с кнопками "Сохранить в архив" и др.
XPathHelper.tdPostButtons       = XPathHelper.msgTableBody + "/tr[1]/td[2]/table/tbody[1]/tr[1]/td[last()]";
// Путь к кнопке сохранения в журнал относительно XPathHelper.aMsgAuthor
//                                 b  td tr
XPathHelper.aSaveToJournalBtn   = "../../../td[2]/table/tbody[1]/tr[1]/td[2]/a[@class='all_save_to_journal']";
XPathHelper.btnReply            = XPathHelper.trMsgTitle + "/td/a[contains(@href, 'action=post')]";
XPathHelper.postBody            = XPathHelper.msgTableBody + "/tr[2]/td[2]/div[@class='post']";
// Все ссылки всех сообщений
XPathHelper.postLinks           = XPathHelper.postBody + "//a";
// Все рисунки из текстов сообщений, которые:
// 1. не содержат в пути "avanturist.org/",
// 2. путь к ним начинается с "http://",
// 3. не окружены ссылками
// 4. имеют теги height и width
XPathHelper.postScaledImages    = XPathHelper.postBody + "//img[" +
    "not(contains(@src, 'avanturist.org/')) and " +
    "starts-with(@src, 'http://') and " +
    "string-length(@width) > 0 and string-length(@height) > 0 and " +
    "count(ancestor::a)=0 ]";

// Все пути относительно таблицы сообщения
// Тег B с именем автора сообщения
// TODO Такого больше нет!!!
//XPathHelper.bMsgAuthor          = "./tbody/tr[1]/td[1]/b";
XPathHelper.bMsgAuthor          = "./tbody/tr[1]/td[1]/a";
// Ссылки из 1-й строки 1-ячейки - дата сообщения, что-нибудь ещё
XPathHelper.aMsgHeadLinks       = "./tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/a";
// Ссылка на DIV с рейтингом
XPathHelper.divRating           = "./tbody/tr[3]/td[2]/table/tbody/tr[1]/td[1]";///div";

// TODO restore divMessages
//XPathHelper.h1TopicTitle        = XPathHelper.tableMessages + "/tbody[1]/tr[1]/th[1]/table[@class='topicHead']/tbody[1]/tr[1]/td[1]/h1";

XPathHelper.tdBottomPageNav     = XPathHelper.divContent + "/table[not(@id)]/tbody[1]/tr[1]/td[@class='middletext']/";
// Тэг B, после которого идёт текст, содержащий "]"
XPathHelper.bCurrentPage        = XPathHelper.tdBottomPageNav + "/b[following-sibling::node()[position()=1 and contains(self::text(), ']')]]";
// Тег A с номером последней страницы темы (последняя ссылка в навигаторе)
XPathHelper.aLastPage           = XPathHelper.tdBottomPageNav + "/a[@class='navPages' and position()=last()]";

// Ссылки относительно элемента с ID "postmodify"
XPathHelper.tbodyMessageForm    = "/html/body/div/div[3]/div/div/form"; //"./table[2]/tbody[1]/tr[2]/td[1]/table[1]/tbody[1]";

XPathHelper.textareaMessage     = XPathHelper.tbodyMessageForm + "/div[3]/div/table/tbody/tr[2]/td[1]/textarea[@name='contentBBCode']";

XPathHelper.selectAutoHide      = XPathHelper.tbodyMessageForm + "/tr[4<position()]/td[2]/select[ option[contains(@value, 'Hide')] ]";
// Тег BR в конце тулбара с кнопками, т.е. такой, которому предшествует картинка с alt="|"
XPathHelper.brToolbar           = XPathHelper.tbodyMessageForm + "/tr[position()<5]/td[2]/br[ preceding-sibling::img[position()=1 and @alt='|'] ]";
XPathHelper.Toolbar           = "/html/body/div/div[3]/div/div/form/div[3]/div/table/tbody/tr/td/table/tbody/tr";


// ****************************************************************************
// ***************************** CTopicWrapper ********************************
// ****************************************************************************


var topicWrapper;


/**
 * @constructor
 */
function CTopicWrapper() {
    var log = new Logger("CTopicWrapper");

    this.boards = new Array();
    var snapshot = $x(XPathHelper.trBoard);
    log.trace("Number of found boards: " + snapshot.snapshotLength);
    for (var i = 0; i < snapshot.snapshotLength; ++i) {
        var boardTr = snapshot.snapshotItem(i);
        var boardIdx = this.boards.length;
        var board = new CBoard(boardTr, boardIdx);
        this.boards[boardIdx] = board;
    }
};


CTopicWrapper.onClick = function(e) {
    var log = new Logger("CTopicWrapper.onClick");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;
    var boardIdx = src.getAttribute("board_idx");
    var board = topicWrapper.boards[boardIdx];
    var res = board.onClick(src);

    e.returnValue = res;
    if (!res && typeof e.preventDefault != "undefined") {
        e.preventDefault();
    }
    return res;
};


CTopicWrapper.prototype = {
    collapse: function() {
        var log = new Logger("CTopicWrapper.collapse");

        for (var i = 0; i < this.boards.length; ++i) {
            this.boards[i].collapse();
        }
    },

    expand: function() {
        var log = new Logger("CTopicWrapper.expand");

        for (var i = 0; i < this.boards.length; ++i) {
            this.boards[i].expand();
        }
    },

    boards: []
};


// ****************************************************************************
// ******************************** CBoard ************************************
// ****************************************************************************


/**
 * @constructor
 */
function CBoard(boardTr, boardIdx) {
    var log = new Logger("CBoard", boardTr, boardIdx);

    this.idx = boardIdx;
    this.board = boardTr;
    this.isCollapsed = false;
    this.href = null;
    this.hiddenTopics = [];

    // TODO workaround
    var settings = app.controllers[0].settings;
    this.collapseAlways = settings.hiddenBoards[boardIdx] == true;

    var table = boardTr.parentNode;
    var rows = table.rows;
    var hasHidden = false;
    for (var i = boardTr.rowIndex + 1; i < rows.length; ++i) {
        var topicTr = rows[i];
        
        if (topicTr.cells.length != 6 && topicTr.cells.length != 7 && topicTr.style.display != "none") {
            break;
        }

        var topic = new CTopic(this, topicTr);
        if (topic.isRead || this.collapseAlways || topicTr.style.display == "none") {
            this.hiddenTopics.push(topic);
        }
    }

    var tr = $x1(XPathHelper.trBoardContent, boardTr);
    if (tr) {
        var th = document.createElement("TH");
        th.width = "30%";
        th.style.textAlign = "right";
        th.style.cssFloat = "left";
        tr.childNodes[1].style.cssFloat="left";
        tr.insertBefore(th, tr.childNodes[2]);
        //tr.cells[0].width = "40%";
        //tr.cells[2].width = "40%";
        //tr.cells[2].style.textAlign = "right";

        this.spanMsg = document.createElement("SPAN");
        this.spanMsg.innerHTML = this.allUnreadText;
        this.spanMsg.setAttribute("board_idx", boardIdx);

        this.spanToggle = document.createElement("SPAN");
        this.spanToggle.innerHTML = this.collapseText;
        this.spanToggle.setAttribute("board_idx", boardIdx);

        this.href = document.createElement("A");
        this.href.href = "#";
        this.href.appendChild(this.spanToggle);
        this.href.appendChild(this.spanMsg);
        this.href.setAttribute("board_idx", boardIdx);
        this.href.addEventListener("click", CTopicWrapper.onClick, false);
        if (this.hiddenTopics.length == 0) {
            this.spanToggle.style.display = "none";
            this.spanMsg.style.display = "inline";
        } else {
            this.spanToggle.style.display = "inline";
            this.spanMsg.style.display = "none";
        }
        th.appendChild(this.href);

        this.cbHide = document.createElement("SPAN");
        this.cbHide.className = this.collapseAlways ? "cbHideChecked" : "cbHideUnchecked";
        this.cbHide.setAttribute("board_idx", boardIdx);

        this.lblHide = document.createElement("LABEL");
        this.lblHide.innerHTML = "&nbsp;&nbsp;("
        this.lblHide.appendChild(this.cbHide);
        this.lblHide.appendChild(document.createTextNode(this.collapseAlwaysText + ")"));
        this.lblHide.addEventListener("click", CTopicWrapper.onClick, false);
        this.lblHide.setAttribute("board_idx", boardIdx);

        var smallHide = document.createElement("SMALL");
        smallHide.appendChild(this.lblHide);

        th.appendChild(smallHide);

        // Выравниваю название раздела влево
        //tr.cells[0].align = "left";

        // TODO переписать
        // Если есть список модераторов, то помещаю его в новую строку таблицы
        /* var small = $x1("./th[1]/div[2]", tr);
        if (null != small) {
            var tr2 = document.createElement("TR");
            th = document.createElement("TH");
            th.colSpan = 3;
            th.align = "left";
            th.appendChild(small);
            tr2.appendChild(th);
            var table = tr.parentNode;
            table.appendChild(tr2);
        } */
    } else {
        log.error("TR wasn't found");
    }
};


CBoard.prototype = {
    collapse: function() {
        var log = new Logger("CBoard.collapse", this.board.rowIndex);

        for (var i = 0; i < this.hiddenTopics.length; ++i) {
            this.hiddenTopics[i].collapse();
        }
        if (this.href != null) {
            this.spanToggle.innerHTML = this.expandText;
        } else {
            log.error("this.href == null. It isn't expected");
        }
        this.isCollapsed = true;
    },

    expand: function() {
        var log = new Logger("CBoard.expand");

        for (var i = 0; i < this.hiddenTopics.length; ++i) {
            this.hiddenTopics[i].expand();
        }
        if (this.href != null) {
            this.spanToggle.innerHTML = this.collapseText;
        } else {
            log.error("this.href == null. It isn't expected");
        }
        this.isCollapsed = false;
    },

    changeCollapseSetting: function() {
        var log = new Logger("CBoard.changeCollapseSetting");

        // TODO workaround
        var settings = app.controllers[0].settings;

        if (this.collapseAlways) {
            this.collapseAlways = false;
            this.cbHide.className = "cbHideUnchecked";
            delete settings.hiddenBoards[this.idx];
        } else {
            this.collapseAlways = true;
            this.cbHide.className = "cbHideChecked";
            settings.hiddenBoards[this.idx] = true;
        }

        settings.save();

        // TODO workaround для принудительной перерисовки SPAN, без этого вызова
        // Opera почему-то не перерисовывает элемент
        this.cbHideForceRedraw();
    },

    cbHideForceRedraw: function() {
        var log = new Logger("CBoard.cbHideForceRedraw");

        if (0 < this.cbHide.childNodes.length) {
            this.cbHide.removeChild(this.cbHide.childNodes[0]);
        } else {
            this.cbHide.appendChild(document.createTextNode(" "));
        }
    },

    onClick: function(src) {
        var log = new Logger("CBoard.onClick");

        if (src == this.spanToggle || src == this.spanMsg || src == this.href) {
            if (this.isCollapsed) {
                this.expand();
            } else {
                this.collapse();
            }

            return false;

        } else if (src == this.cbHide || src == this.lblHide) {
            this.changeCollapseSetting();
            return false;

        } else {
            return true;
        }
    },

    // "СВЕРНУТЬ"
    collapseText: "\u0421\u0412\u0415\u0420\u041d\u0423\u0422\u042c",

    // "РАЗВЕРНУТЬ"
    expandText: "\u0420\u0410\u0417\u0412\u0415\u0420\u041d\u0423\u0422\u042c",

    // "Прочитанных тем нет"
    allUnreadText: "\u041f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0445 \u0442\u0435\u043c \u043d\u0435\u0442",

    // "всегда сворачивать"
    collapseAlwaysText: "\u0432\u0441\u0435\u0433\u0434\u0430 \u0441\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0442\u044c"
};


// ****************************************************************************
// ******************************** CTopic ************************************
// ****************************************************************************


/**
 * @constructor
 */
function CTopic(board, topicTr) {
    var log = new Logger("CTopic", "row index = " + topicTr.rowIndex);

    CTopic.nextId++;
    topicTr.setAttribute("topicId", CTopic.nextId);
    CTopic.topics[CTopic.nextId] = this;

    this.board = board;
    this.topic = topicTr;
    this.isRead = (!this.topic.innerHTML.contains("cRed") || this.topic.style.display == "none");
    //(this.topic.cells[0].innerHTML.contains("btnGotoUnreadMessageOff.png") || this.topic.style.display == "none");
    //getElementsByTagName("span").length == 0);
    //("new_post.gif") == -1;

    // Не надо, т.к. функция разделения тем на отслеживаемые и нет больше
    // не поддерживается
//    var xpath = "./td[2]/a[1]";
//    var topicHref = $x1(xpath, topicTr);
//    if (topicHref != null) {
//        var regexp = /^.*[\/?&]topic[=,](\d+).*$/;
//        var matches = regexp.exec(topicHref.href);
//        if (matches != null && matches.length == 2) {
//            this.topicId = matches[1];
//        } else {
//            log.error("Topic ID wasn't found. URL: " + topicHref.href + ", matches = " + matches);
//        }
//    } else {
//        log.error("Topic HREF wasn't found");
//    }
};


CTopic.find = function(topicTr) {
    var log = new Logger("CTopic.find");

    var topicId = topicTr.getAttribute("topicId");
    if (topicId == null) {
        return null;
    }
    return CTopic.topics[topicId];
}


CTopic.topics = new Array();
CTopic.nextId = 0;


CTopic.prototype = {
    collapse: function() {
        var log = new Logger("CTopic.collapse");

        this.topic.style.display = "none";
    },

    expand: function() {
        var log = new Logger("CTopic.expand");

        this.topic.style.display = "";
    }
};


// ****************************************************************************
// ********************************* OTHER ************************************
// ****************************************************************************


function createGotoPageForms(topicId) {
	return; // nj;t yt yflj
    var log = new Logger("createGotoPageForms", topicId);

    // TODO перенести в другое место
    // Делаю так, что навигатор по страницам темы появляется всегда в одном
    //    месте в заголовке темы
    var topicTitle = $x1(XPathHelper.h1TopicTitle);
    if (null != topicTitle) {
        var openBraceIdx = topicTitle.innerHTML.lastIndexOf(" (");
        var div = document.createElement("DIV");
        div.style.cssFloat = "right";
        div.style.paddingRight = "10px";
        div.innerHTML = topicTitle.innerHTML.substr(openBraceIdx);
        topicTitle.innerHTML = topicTitle.innerHTML.substr(0, openBraceIdx);
        topicTitle.appendChild(div);
    }

    // Ищу "..." между страницами вверху и внизу страницы
    var snapshot = $x(XPathHelper.bPagerDots);
    var len = snapshot.snapshotLength
    log.trace("Number of found three dots: " + len);
    for (var i = 0; i < snapshot.snapshotLength; ++i) {
        var bPagerDots = snapshot.snapshotItem(i);

        // Создаю навигатор
        var href = document.createElement("A");
        href.innerHTML = "...";
        href.href = "#";
        href.setAttribute("div_id", "york_div" + i);
        href.setAttribute("input_id", "york_page" + i);
        href.addEventListener("click", showHideForm, false);
        href.style.fontWeight = "bold";
        href.style.fontSize = "inherit";
        href.style.textDecoration = "underline";

        var span = document.createElement("SPAN");
        span.id = "york_span" + i;
        span.innerHTML = formHtml.replace(/%idx%/g, i);

        bPagerDots.innerHTML = "";
        bPagerDots.appendChild(document.createTextNode(" "));
        bPagerDots.appendChild(href);
        bPagerDots.appendChild(span);
        bPagerDots.appendChild(document.createTextNode(" "));

        var form = $id("york_form" + i);
        form.setAttribute("idx", i);
        form.addEventListener("submit", submitGotoPageForm, false);

        var topic = $id("york_topic" + i);
        topic.value = topicId;
    }
}


function submitGotoPageForm(e) {
    var log = new Logger("submitGotoPageForm");

    e = e || window.event;
    var src = e.srcelement ? e.srcelement : e.target;

    var idx = src.getAttribute("idx");
    var inputStart = $id("york_start" + idx);
    var inputPage = $id("york_page" + idx);
    inputStart.value = (inputPage.value - 1) * 20;
}


/*
 * Если ссылка длинная, то обрезает её, чтобы она не портила форматирование
 */
function cutLongLink(link, redirectUrl) {
    var log = new Logger("cutLongLink", link);

    var href = link.href;
    var html = link.innerHTML;
    if (href.indexOf(redirectUrl) == 0) {
        href = href.substr(redirectUrl.length);
    }
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
                    log.error("Can't decode href: " + href);
                }
                var decodedHtml;
                try {
                    decodedHtml = decodeURI(htmlAmp);
                } catch (err) {
                    decodedHtml = htmlAmp;
                    log.error("Can't decode htmlAmp: " + htmlAmp);
                }
                found = decodedHref == decodedHtml;
            } else {
                log.trace("href == htmlAmp");
            }
        } else {
            log.trace("href == html");
        }

        if (found) {
            log.trace("Found long link: " + href);
            link.innerHTML = html.substr(0, 77) + "...";
            link.style.fontStyle = "italic";
        }
    }
}


function processMessageLinks() {
	return;
    var log = new Logger("processMessageLinks");

    var redirectUrl = "http://www.avanturist.org/redirect.php/?url=";
    //http://www.avanturist.org/redirect/?url=aHR0cDovL3VzZXJzY3JpcHRzLm9yZy9zY3JpcHRzL3Nob3cvMTYxMTAy/
    var snapshot = $x(XPathHelper.postLinks);
    log.trace("number of found links: " + snapshot.snapshotLength);
    for (var i = 0; i < snapshot.snapshotLength; ++i) {
        var link = snapshot.snapshotItem(i);

        cutLongLink(link, redirectUrl);
        if (link.href.indexOf(redirectUrl) == 0) {
            // Во всех ссылках надо заменить & на его URL encode представление
            link.href = link.href.replace(/&/g, "%26");
        }
    }
}


// ****************************************************************************
// ************************** Обработчики страниц *****************************
// ****************************************************************************


function handleTopicPage() {
    var log = new Logger("handleTopicPage");

    var topicId = getTopicId();
    log.trace("topic_id = " + topicId);
    if (topicId != null) {
        createGotoPageForms(topicId);
    }

    processMessageLinks();
}


function handleBoardPage() {
    var log = new Logger("handleBoardPage");

}


function handleForumMainPage() {
    var log = new Logger("handleForumMainPage");
	
	// разворачиваю супертопики
 
	var bl = document.getElementsByClassName('forumBoardSuperTopicExpandButton blackToggle bold');
	for (var i = 0 ; i<bl.length; i++) {
		bl[i].click();
	}
	// но нихрена не разворачивается
	
    // TODO workaround
    if (app.controllers[0].settings.sett_collapseTopics) {
        topicWrapper = new CTopicWrapper();
        topicWrapper.collapse();
    } else {
        log.trace("Don't collapse the read topics");
    }
}


function handleOtherForumPages() {
    var log = new Logger("handleOtherForumPages");

    // TODO: IMPLEMENT
}


function handleOtherSitePages() {
    var log = new Logger("handleOtherSitePages");

    // TODO: IMPLEMENT
}


// ****************************************************************************
// ****************************** Точка входа *********************************
// ****************************************************************************


function onLoad(e) {
    var log = new Logger("onLoad");

    start = new Date();
    log.trace("START: " + start);

    if (!document.body) {
        log.error("document.body hasn't been loaded");
        return;
    }

    if (typeof $ == "undefined") {
        $ = wnd.jQuery;
    }

    try {
        main();
    } catch (e) {
        log.error("EXCEPTION:\n" + e);
    }
}


function main(e) {
    var log = new Logger("main");

    var jQueryInstalled = true;
    if (typeof $ == "undefined") {
        if (isChrome) {
            // Для Хрома это номальная ситуация, поэтому не регистрирую эту
            // ситуацию как ошибку
            log.trace("jQuery hasn't installed. URL: " + url);
        } else {
            log.error("jQuery hasn't installed. URL: " + url);
        }
        $ = function() {};
        jQueryInstalled = false;
    }


    // ************************************************************************
    // **************************** Settings Model ****************************
    // ************************************************************************

    // Вид и контроллер находятся ниже, т.к. может оказаться, что нет необходимости
    // создавать

    /**
     * @constructor
     */
    function CSettingsModel() {
        var log = new Logger("CSettingsModel");

        this.isVisible = false;

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

        this.sett_searchPosts = false;
        this.label_sett_searchPosts =
            // Автоматически
            "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 " +
            // искать
            "\u0438\u0441\u043a\u0430\u0442\u044c " +
            // сообщения
            "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f";

        this.sett_confirmSearchPosts = false;
        this.label_sett_confirmSearchPosts =
            // Выдавать запрос
            "\u0412\u044b\u0434\u0430\u0432\u0430\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 " +
            // перед началом
            "\u043f\u0435\u0440\u0435\u0434 \u043d\u0430\u0447\u0430\u043b\u043e\u043c " +
            // поиска сообщения
            "\u043f\u043e\u0438\u0441\u043a\u0430 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f";

        this.sett_borderTables = false;
        this.label_sett_borderTables =
            // Рисовать
            "\u0420\u0438\u0441\u043e\u0432\u0430\u0442\u044c " +
            // границы у
            "\u0433\u0440\u0430\u043d\u0438\u0446\u044b \u0443 " +
            // таблиц в
            "\u0442\u0430\u0431\u043b\u0438\u0446 \u0432 " +
            // сообщениях
            "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f\u0445";

        this.sett_addImageLinks = false;
        this.label_sett_addImageLinks =
            // Добавлять
            "\u0414\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c " +
            // ссылки к
            "\u0441\u0441\u044b\u043b\u043a\u0438 \u043a " +
            // уменьшенным
            "\u0443\u043c\u0435\u043d\u044c\u0448\u0435\u043d\u043d\u044b\u043c " +
            // изображениям
            "\u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f\u043c";

        this.sett_addSpoilToComment = false;
        this.label_sett_addSpoilToComment =
            // Добавлять
            "\u0414\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c " +
            // спойлер к
            "\u0441\u043f\u043e\u0439\u043b\u0435\u0440 \u043a " +
            // цитате
            "\u0446\u0438\u0442\u0430\u0442\u0435";

        this.userIgnoreType = CSettingsModel.BLACK_LIST;
        this.userIgnoreListBlack = new Array();
        this.userIgnoreListWhite = new Array();

        this.hiddenBoards = new Array();

        this.load();
    }


    CSettingsModel.BLACK_LIST = 0;
    CSettingsModel.WHITE_LIST = 1;


    CSettingsModel.prototype = {
        store: function(name, value) {
            var log = new Logger("CSettingsModel.store");

            if (isOpera || isChrome) {
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
            var log = new Logger("CSettingsModel.restore");

            if (isOpera || isChrome) {
                var value = null;
                var cookies = document.cookie.split("; ");
                for (var i = 0; i < cookies.length; ++i) {
                        var cookie = cookies[i].split("=");
                        if (cookie[0] == escape(name)) {
                        try {
                            value = unescape(cookie[1]);
                        } catch(e) {
                            log.error("Can't unescape the value of the cookie: '" + cookie[0] + "=" + cookie[1] + "'");
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
            var log = new Logger("CSettingsModel.save");

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

            var listBlack = this.userIgnoreListToString(this.userIgnoreListBlack);
            value += ",userIgnoreListBlack=";
            value += listBlack;

            var listWhite = this.userIgnoreListToString(this.userIgnoreListWhite);
            value += ",userIgnoreListWhite=";
            value += listWhite;

            var hiddenBoardsStr = this.hiddenBoardsToString(this.hiddenBoards);
            value += ",hiddenBoards=";
            value += hiddenBoardsStr;

            this.store("york_settings", value);
        },

        load: function() {
            var log = new Logger("CSettingsModel.load");

            var value = this.restore("york_settings");
            if (value == null) {
                log.error("Stored settings weren't found");
                return;
            }

            var values = value.split(",");
            for (var i = 0; i < values.length; ++i) {
                var setting = values[i].split("=");
                if (setting[0].indexOf("sett_") == 0) {
                    this[setting[0]] = eval(setting[1]);

                } else if (setting[0] == "userIgnoreType") {
                    this.userIgnoreType = parseInt(setting[1]);

                } else if (setting[0] == "userIgnoreList") {
                    // Обрабатываю эту настройку для совместимостью с версиями до 0.08.x включительно
                    if (this.userIgnoreType == CSettingsModel.BLACK_LIST) {
                        this.userIgnoreListFromString(this.userIgnoreListBlack, setting[1]);
                    } else {
                        this.userIgnoreListFromString(this.userIgnoreListWhite, setting[1]);
                    }

                } else if (setting[0] == "userIgnoreListBlack") {
                    this.userIgnoreListFromString(this.userIgnoreListBlack, setting[1]);

                } else if (setting[0] == "userIgnoreListWhite") {
                    this.userIgnoreListFromString(this.userIgnoreListWhite, setting[1]);

                } else if (setting[0] == "hiddenBoards") {
                    this.hiddenBoardsFromString(this.hiddenBoards, setting[1]);

                } else {
                    log.error("Unknown setting: " + values[i]);
                }
            }
        },

        userIgnoreListFromString: function(list, str) {
            var log = new Logger("CSettingsModel.userIgnoreListFromString");

            var idNamePairs = str.split("|");
            var len = idNamePairs.length;
            for (var i = 0; i < len; ++i) {
                if (idNamePairs[i] != null && idNamePairs[i].length > 0) {
                    var pair = idNamePairs[i].split(":");
                    var id = NaN;
                    try {
                        id = parseInt(pair[0]);
                    } catch (e) {
                        id = NaN;
                    }
                    if (!isNaN(id)) {
                        list[pair[0]] = pair[1] == null ? "" : pair[1];
                    }
                }
            }
        },

        userIgnoreListToString: function(list) {
            var log = new Logger("CSettingsModel.userIgnoreListToString");

            var users = "";
            if (list.length > 0) {
                var regexp = /[,:|]/g;
                for (var id in list) {
                    if (users.length > 0) {
                        users += "|";
                    }
                    var name = list[id];
                    users += id;
                    users += ":";
                    // Для FF храним в настройках имя пользователя без спец. символов
                    if (isFirefox) {
                        users += name.replace(regexp, "_");
                    }
                }
            }
            return users;
        },

        hiddenBoardsFromString: function(list, str) {
            var log = new Logger("CSettingsModel.hiddenBoardsFromString");

            var idArray = str.split("|");
            var len = idArray.length;
            for (var i = 0; i < len; ++i) {
                if (idArray[i] != null && idArray[i].length > 0) {
                    var id = NaN;
                    try {
                        id = parseInt(idArray[i]);
                    } catch (e) {
                        id = NaN;
                    }
                    if (!isNaN(id)) {
                        this.hiddenBoards[id] = true;
                    }
                }
            }
        },

        hiddenBoardsToString: function(list) {
            var log = new Logger("CSettingsModel.hiddenBoardsToString");

            var res = "";
            for (var id in list) {
                if (list[id] == true) {
                    res += "|" + id;
                }
            }

            return res == "|" ? "" : res;
        }
    };

    // Конец CSettingsModel
    // ************************************************************************


    var settingsModel = new CSettingsModel();

    if (settingsModel.sett_searchPosts) {
        // В целях оптимизации объявляю класс CPostSearcher только если задана
        // соответсвующая настройка. После объявления класса идёт использующий
        // его код

        // ********************************************************************
        // ************************** CPostSearcher ***************************
        // ********************************************************************

        /**
         * @constructor
         */
        function CPostSearcher(msdId) {
            var log = new Logger("CPostSearcher", msdId);

            this.msgId = msgId;

            this.topicId = getTopicId();
            if (null == this.topicId) {
                throwException(log, "topic_id wasn't found");
            }

            // Нахожу навигатор по страницам и определяю текущую страницу (находится в теге <b>)
            var b = $x1(XPathHelper.bCurrentPage);
            if (b == null) {
                throwException(log, "Navigator wasn't found");
            }
            this.currentPage = parseInt(b.innerHTML);
            log.trace("currentPage = " + this.currentPage);

            // Определяю номер последней страницы темы (последняя ссылка в навигаторе)
            var href = $x1(XPathHelper.aLastPage);
            this.lastPage = href != null ? parseInt(href.innerHTML) : 1;
            this.lastPage = Math.max(this.lastPage, this.currentPage);
            log.trace("lastPage = " + this.lastPage);

            var params = CPostSearcher.parseUrlParameters(url);
            this.searchFrom = parseInt(params["search_from"]);
            this.searchTo = parseInt(params["search_to"]);
            this.searchMid = parseInt(params["search_mid"]);

            // Ниже mode может быть изменён!
            this.mode = 1;
            if (!this.initPageMessageIds()) {
                throwException(log, "Can't initialize page message ids");
            }

            if (this.firstPageMsgId > this.lastPageMsgId) {
                // У пользователя сообщения в обратном порядке! Поэтому все идентификаторы
                // сообщений буду брать со знаком минус, в этом случае алгоритм почти
                // не надо менять!
                this.mode = -1;
                this.msgId *= -1;
                this.firstPageMsgId *= -1;
                this.lastPageMsgId *= -1;
            }
        };

        CPostSearcher.prototype = {
            searchMessage: function() {
                var log = new Logger("CPostSearcher.searchMessage");

                if (isNaN(this.searchFrom) || isNaN(this.searchTo)) {
                    // Этап I. Первая загрузка страницы
                    return this.firstPageLoad();
                } else if (isNaN(this.searchMid)) {
                    // Этап II. Поиск диапазона страниц, содержащих сообщение
                    return this.searchPageInterval();
                } else {
                    // Этап III. Поиск сообщения где-то между двумя страницами
                    return this.binaryPageSearch();
                }
            },

            // Этап I. Первая загрузка страницы
            // Проверяем, есть ли искомое сообщение на странице, и если нет,
            // то определяем в какую сторону двигаться чтобы его найти
            firstPageLoad: function() {
                var log = new Logger("CPostSearcher.firstPageLoad");

                var msg =
                    // "Вы пытаетесь
                    "\u0412\u044b \u043f\u044b\u0442\u0430\u0435\u0442\u0435\u0441\u044c " +
                    // перейти к
                    "\u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a " +
                    // сообщению № "
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044e \u2116 " + this.msgId +
                    // .\nЭто сообщение
                    ".\n\u042d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 " +
                    // не найдено на
                    "\u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u043d\u0430 " +
                    // текущей
                    "\u0442\u0435\u043a\u0443\u0449\u0435\u0439 " +
                    // странице №
                    "\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u2116 " + this.currentPage +
                    // .\nНачать поиск
                    ".\n\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u043e\u0438\u0441\u043a " +
                    // сообщения?\n
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f?\n" +
                    // (В процессе
                    "(\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435 " +
                    // поиска
                    "\u043f\u043e\u0438\u0441\u043a\u0430 " +
                    // страница будет
                    "\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0431\u0443\u0434\u0435\u0442 " +
                    // неоднократно
                    "\u043d\u0435\u043e\u0434\u043d\u043e\u043a\u0440\u0430\u0442\u043d\u043e " +
                    // перегружена.
                    "\u043f\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043d\u0430.)";
                var step = 5;
                this.searchFrom = this.currentPage;
                if (this.msgId < this.firstPageMsgId) {
                    if (this.currentPage == 1) {
                        // Встаём на первое сообщение на странице
                        return this.jumpToMessage(1, this.firstPageMsgId);
                    } else {
                        step = Math.floor(this.currentPage / step);
                        step = Math.max(1, step);
                        this.searchTo = this.searchFrom - step;
                        this.searchTo = Math.max(1, this.searchTo);
                        if (!settingsModel.sett_confirmSearchPosts || confirm(msg)) {
                            return this.jumpToSearchToPage();
                        } else {
                            return false;
                        }
                    }
                } else if (this.lastPageMsgId < this.msgId) {
                    if (this.currentPage == this.lastPage) {
                        // Встаём на последнее сообщение на странице
                        return this.jumpToMessage(this.lastPage, this.lastPageMsgId);
                    } else {
                        step = Math.floor((this.lastPage - this.currentPage) / step);
                        step = Math.max(1, step);
                        this.searchTo = this.searchFrom + step;
                        this.searchTo = Math.min(this.lastPage, this.searchTo);
                        if (!settingsModel.sett_confirmSearchPosts || confirm(msg)) {
                            return this.jumpToSearchToPage();
                        } else {
                            return false;
                        }
                    }
                } else {
                    log.trace("Message " + this.msgId + " is on the current page");
                    // Ищем сообщение на странице, если не находим, то ищем сообщение,
                    // которое было непосредственно перед ним
                    var targetMsgId = this.msgId;
                    for (var i = 0; i < this.pageMessagesSnapshot.snapshotLength; ++i) {
                        var id = this.extractMessageId(i);
                        if (id < this.msgId) {
                            targetMsgId = id;
                        } else if (id == this.msgId) {
                            targetMsgId = id;
                            break;
                        } else {
                            break;
                        }
                    }
                    if (targetMsgId != this.msgId) {
                        return this.jumpToMessage(this.currentPage, targetMsgId);
                    }
                }

                return false;
            },

            // Этап II. Поиск диапазона страниц, содержащих сообщение
            // При этом если searchFrom < searchTo, то движемся справа налево, иначе слева направо
            searchPageInterval: function() {
                var log = new Logger("CPostSearcher.searchPageInterval");

                var step = Math.abs(this.searchTo - this.searchFrom);
                if (this.msgId < this.firstPageMsgId) {
                    if (this.searchFrom < this.searchTo) {
                        // Диапазон найден! Переходим к этапу III
                        if (step == 1) {
                            // Сообщения не существует ни на одной из соседних
                            // страниц. Значит надо загрузить страницу с минимальным
                            // номером и перейти на ней к последнему сообщению
                            // В данном случае надо загрузить страницу searchFrom.
                            // Для этого делаем переход к ней, она при загрузке обнаружит,
                            // что сообщение на ней отсутствует и перейдёт к последнему
                            // сообщению на странице
                            this.swapFromAndTo();
                            return this.jumpToSearchToPage();
                        } else {
                            step = Math.floor(step / 2);
                            this.searchMid = this.searchFrom + step;
                            return this.jumpToSearchMidPage();
                        }
                    } else if (this.searchTo < this.searchFrom) {
                        // Недолёт. Надо дальше двигаться в сторону уменьшения номеров страниц
                        if (this.searchTo == 1) {
                            // Встаём на первое сообщение на странице
                            return this.jumpToMessage(1, this.firstPageMsgId);
                        } else {
                            this.searchFrom = this.searchTo;
                            this.searchTo = this.searchFrom - step;
                            this.searchTo = Math.max(1, this.searchTo);
                            return this.jumpToSearchToPage();
                        }
                    } else {
                        // Такого быть не может
                        log.error("Unexpected error");
                    }
                } else if (this.lastPageMsgId < this.msgId) {
                    if (this.searchFrom < this.searchTo) {
                        // Недолёт. Надо дальше двигаться в сторону увеличения номеров страниц
                        if (this.searchTo == this.lastPage) {
                            // Встаём на последнее сообщение на странице
                            return this.jumpToMessage(this.lastPage, this.lastPageMsgId);
                        } else {
                            this.searchFrom = this.searchTo;
                            this.searchTo = this.searchFrom + step;
                            this.searchTo = Math.min(this.lastPage, this.searchTo);
                            return this.jumpToSearchToPage();
                        }
                    } else if (this.searchTo < this.searchFrom) {
                        // Диапазон найден! Ищем сообщение в этом диапазоне
                        if (step == 1) {
                            // Сообщения не существует ни на одной из соседних
                            // страниц. Значит надо загрузить страницу с минимальным
                            // номером и перейти на ней к последнему сообщению
                            // В данном случае надо перейти к последнему сообщению на текущей странице
                            return this.jumpToMessage(this.currentPage, this.lastPageMsgId);
                        } else {
                            // Теперь можно сделать так, чтобы searchFrom всегда было меньше searchTo
                            this.swapFromAndTo();
                            step = Math.floor(step / 2);
                            this.searchMid = this.searchFrom + step;
                            return this.jumpToSearchMidPage();
                        }
                    } else {
                        // Такого быть не может
                        log.error("Unexpected error");
                    }
                } else {
                    log.trace("Message " + this.msgId + " is found");
                    return this.jumpToMessage(this.currentPage, this.msgId);
                }

                return false;
            },

            // Этап III. Поиск сообщения где-то между двумя страницами
            // Всегда выполняется условие: searchFrom < searchMid < searchTo
            binaryPageSearch: function() {
                var log = new Logger("CPostSearcher.binaryPageSearch");

                if (this.msgId < this.firstPageMsgId) {
                    // Сообщение находится между searchFrom и searchMid
                    this.searchTo = this.searchMid;
                    var step = this.searchTo - this.searchFrom;
                    if (step == 1) {
                        // Сообщения не существует ни на одной из соседних
                        // страниц. Значит надо загрузить страницу с минимальным
                        // номером и перейти на ней к последнему сообщению
                        // В данном случае надо загрузить страницу searchFrom
                        this.swapFromAndTo();
                        return this.jumpToSearchToPage();
                    } else {
                        step = Math.floor(step / 2);
                        this.searchMid = this.searchFrom + step;
                        return this.jumpToSearchMidPage();
                    }
                } else if (this.lastPageMsgId < this.msgId) {
                    // Сообщение находится между searchMid и searchTo
                    this.searchFrom = this.searchMid;
                    var step = this.searchTo - this.searchFrom;
                    if (step == 1) {
                        // Сообщения не существует ни на одной из соседних
                        // страниц. Значит надо загрузить страницу с минимальным
                        // номером и перейти на ней к последнему сообщению
                        // В данном случае надо перейти к последнему сообщению на текущей странице
                        return this.jumpToMessage(this.searchFrom, this.lastPageMsgId);
                    } else {
                        step = Math.floor(step / 2);
                        this.searchMid = this.searchFrom + step;
                        return this.jumpToSearchMidPage();
                    }
                } else {
                    log.trace("Message " + msgId + " is found");
                    return this.jumpToMessage(this.searchMid, this.msgId);
                }

                return false;
            },

            initPageMessageIds: function() {
                var log = new Logger("CPostSearcher.initPageMessageIds");

                // TODO Можно оптимизировать, где-нибудь сохранив ссылку на таблицу сообщений
                var snapshot = $x(XPathHelper.msgTableBody);
                if (snapshot.snapshotLength > 0) {
                    this.pageMessagesSnapshot = snapshot;
                    this.firstPageMsgId = this.extractMessageId(0);
                    this.lastPageMsgId = this.extractMessageId(snapshot.snapshotLength - 1);
                    log.trace("firstPageMsgId = " + this.firstPageMsgId);
                    log.trace("lastPageMsgId = " + this.lastPageMsgId);
                    return !isNaN(this.firstPageMsgId) && !isNaN(this.lastPageMsgId);
                } else {
                    log.error("The message table wasn't found");
                    return false;
                }
            },

            extractMessageId: function(idx) {
                var log = new Logger("CPostSearcher.extractMessageId");

                var msgTableBody = this.pageMessagesSnapshot.snapshotItem(idx);
                var id = parseInt(msgTableBody.rows[1].cells[1].id.substr(13));
                if (!isNaN(id)) {
                    // Зачем это нужно см. в конструкторе
                    id *= this.mode;
                }
                return id;
            },

            swapFromAndTo: function() {
                var log = new Logger("CPostSearcher.swapFromAndTo");

                var temp = this.searchFrom;
                this.searchFrom = this.searchTo;
                this.searchTo = temp;
            },

            jumpToMessage: function(page, msg) {
                var log = new Logger("CPostSearcher.jumpToMessage");

                var start = 20 * (page - 1);
                // Про необходимость Math.abs см. в конструкторе
                wnd.location.replace(wnd.location.protocol + "//www.avanturist.org/forum/index.php/" +
                    "topic," + this.topicId +
                    "." + start +
                    ".html#msg" + Math.abs(msg));
            },

            jumpToSearchToPage: function() {
                var log = new Logger("CPostSearcher.jumpToSearchToPage");

                var start = 20 * (this.searchTo - 1);
                // Про необходимость Math.abs см. в конструкторе
                wnd.location.replace(wnd.location.protocol + "//www.avanturist.org/forum/index.php" +
                    "?topic=" + this.topicId +
                    "&start=" + start +
                    "&search_from=" + this.searchFrom +
                    "&search_to=" + this.searchTo +
                    "#msg" + Math.abs(this.msgId));
                return true;
            },

            jumpToSearchMidPage: function() {
                var log = new Logger("CPostSearcher.jumpToSearchMidPage");

                var start = 20 * (this.searchMid - 1);
                // Про необходимость Math.abs см. в конструкторе
                wnd.location.replace(wnd.location.protocol + "//www.avanturist.org/forum/index.php" +
                    "?topic=" + this.topicId +
                    "&start=" + start +
                    "&search_from=" + this.searchFrom +
                    "&search_to=" + this.searchTo +
                    "&search_mid=" + this.searchMid +
                    "#msg" + Math.abs(this.msgId));
                return true;
            }
        };


        CPostSearcher.parseUrlParameters = function(url) {
            var log = new Logger("CPostSearcher.parseUrlParameters", url);

            var res = new Array();
            var idxQuery = url.indexOf("?") + 1;
            if (idxQuery == 0) { // Выше была прибавлена 1, поэтому сравнение не с -1
                log.trace("Question mark wasn't found");
                return res;
            }

            var idxHash = url.indexOf("#");
            idxHash = idxHash == -1 ? url.length() : idxHash;
            if (idxHash <= idxQuery) {
                log.error("invalid URL");
                return res;
            }

            var paramStr = url.substr(idxQuery, idxHash - idxQuery);
            log.trace("paramStr = " + paramStr);
            var pairs = paramStr.split("&");
            for (var i = 0; i < pairs.length; ++i) {
                var pair = pairs[i].split("=");
                res[pair[0]] = pair[1];
            }

            return res;
        }

        // Конец CPostSearcher
        // ************************************************************************

        // Выполняем поиск нужного сообщения
        var regexp = /^.*#msg(\d+)$/;
        var matches = regexp.exec(url);
        if (matches != null && matches.length == 2) {
            // URL страницы создан для перехода к конкректному сообщению
            var msgId = parseInt(matches[1]);
            log.trace("msgId = " + msgId);

            try {
                var postSearcher = new CPostSearcher(msgId);
                if (postSearcher.searchMessage()) {
                    // Необходимо перегрузить страницу, поэтому дальше выполнять скрипт не надо
                    return;
                }
            } catch (e) {
                log.error("error in CPostSearcher initialization. " + e);
            }
        } else {
            log.trace("There is not a search message URL");
        }
    } // if (settingsModel.sett_searchPosts)


    // NOTE: Изменение свойства visibility работает быстрее, чем изменение display!!!
    var DIV_STYLE =
        "visibility: hidden;" +
        "z-index: 2;" +
        "position: absolute;" +
        "background-color: rgb(245, 245, 250);" +
        "border: 1px solid rgb(60, 97, 164);" +
        "padding: 3px;" +
        "text-align: left;" +
        "color: black;";


    // ****************************************************************************
    // ****************************** User ignore *********************************
    // ****************************************************************************


    /**
     * @constructor
     */
    function CDisplayedMessageModel(userIgnoreModel, originalMsg, userId, userName) {
        var log = new Logger("CDisplayedMessageModel");

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


    /**
     * @constructor
     */
    function CDisplayedMessageController(userIgnoreController, model, view) {
        var log = new Logger("CDisplayedMessageController");

        app.addController(this);

        this.userIgnoreController = userIgnoreController;
        this.model = model;
        this.view = view;
    }


    CDisplayedMessageController.prototype = {
        handle: function(src, e) {
            var log = new Logger("CDisplayedMessageController.handle", src, e.type);

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
                wnd.location.reload();
                return false;
            } else {
                log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        }
    }


    /**
     * @constructor
     */
    function CDisplayedMessageView(model, userIgnoreController) {
        var log = new Logger("CDisplayedMessageView");

        this.model = model;
        this.controller = new CDisplayedMessageController(userIgnoreController, model, this);

        this.profileHrefNode = $x1(XPathHelper.bMsgAuthor, this.model.originalMsg);
        if (this.profileHrefNode == null) {
            log.error("Profile URL wasn't found");
            return;
        }
        var cellUser = this.profileHrefNode.parentNode;

        this.createUserCellContentNode();;
        cellUser.appendChild(this.userCellContentNode);
    }


    CDisplayedMessageView.prototype = {
        createListCtrlHref: function() {
            var log = new Logger("CDisplayedMessageView.createListCtrlHref");

            var href = document.createElement("A");
            href.href = "#";
            href.innerHTML = "x";
            href.setAttribute("style", "font-weight: bold; font-size: 16px; color: red;");
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
            var log = new Logger("CDisplayedMessageView.createUserCellContentNode");

            this.createListCtrlHref();

            var table = document.createElement("TABLE");
            table.width = "100%";
            table.cellPadding = "0";
            table.cellSpacing = "0";
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


    /**
     * @constructor
     */
    function CHiddenMessageModel(userIgnoreModel, originalMsg, userId, userName) {
        var log = new Logger("CHiddenMessageModel");

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


    /**
     * @constructor
     */
    function CHiddenMessageController(userIgnoreController, model, view) {
        var log = new Logger("CHiddenMessageController");

        app.addController(this);

        this.userIgnoreController = userIgnoreController;
        this.model = model;
        this.view = view;
    }


    CHiddenMessageController.prototype = {
        handle: function(src, e) {
            var log = new Logger("CHiddenMessageController.handle", src, e.type);

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
                wnd.location.reload();
                return false;
            } else {
                log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        }
    }


    /**
     * @constructor
     */
    function CHiddenMessageView(model, userIgnoreController) {
        var log = new Logger("CHiddenMessageView");

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
            var log = new Logger("CHiddenMessageView.createListCtrlHref");

            var href = document.createElement("A");
            href.href = "#";
            href.innerHTML = "+";
            href.setAttribute("style", "font-weight: bold; font-size: 16px; color: blue;");
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
            var log = new Logger("CHiddenMessageView.createCollapsedView");

            var msgTable = document.createElement("TABLE");
            // Стиль message_hidden_york описан ниже в CPageView.addCustomCSS()
            msgTable.className      = "message_hidden_york";
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
            cellInfoCell3.id = "XXX";

            var href = document.createElement("A");
            href.href = "#";
            href.style.fontWeight = "bold";
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
            var log = new Logger("CHiddenMessageView.parseExpandedView");

            this.profileHrefNode = $x1(XPathHelper.bMsgAuthor, this.expanded);
            if (this.profileHrefNode == null) {
                log.error("Profile URL wasn't found");
                return;
            }
            this.expandedCellUser = this.profileHrefNode.parentNode;

            // Ссылки из первой ячейка заголовка сообщения: якорь и дата
            var snapshot = $x(XPathHelper.aMsgHeadLinks, this.expanded);
            if (snapshot.snapshotLength == 0) {
                log.error("Date weren't found");
                return;
            }
            // Добавляю все ссылки из 1-й ячейки заголовка сообщения в массив
            this.cellAnchorContent = new Array();
            for (var i = 0; i < snapshot.snapshotLength; ++i) {
                var children = snapshot.snapshotItem(i);
                this.cellAnchorContent[i] = children;
            }
            this.expandedCellAnchor = this.cellAnchorContent[0].parentNode;

            // Создаю ссылку "СВЕРНУТЬ"
            var href = document.createElement("A");
            href.href = "#";
            href.style.fontWeight = "bold";
            // "СВЕРНУТЬ"
            href.innerHTML = "\u0421\u0412\u0415\u0420\u041d\u0423\u0422\u042c";
            app.addEventListener(href, "click", this.controller);
            // Строка - заголовок сообщения
            var tr = this.expandedCellAnchor.parentNode;
            // Добавляю ячейку в середину, было 2 ячейки стало 3
            var td = tr.insertCell(1);
            td.align = "center";
            td.width = "10%";
            td.appendChild(href);
            tr.cells[0].width = "40%";
            tr.cells[2].width = "40%";
            this.collapseHref = href;

            // TODO workaround
            td = tr.insertCell(2);
            td.width = "40%";
            td.appendChild(href);


            this.ratingDiv = $x1(XPathHelper.divRating, this.expanded);
            if (this.ratingDiv == null) {
                log.error("Message rating wasn't found");
                return;
            }
            this.expandedCellRating = this.ratingDiv.parentNode;
        },


        collapse: function() {
            var log = new Logger("CHiddenMessageView.collapse");

            if (!this.model.isVisible) {
                return;
            }

            this.expanded.style.display = "none";

            this.collapsedCellUser.appendChild(this.userCellContentNode);
            var len = this.cellAnchorContent.length;
            for (var i = 0; i < len; ++i) {
                this.collapsedCellInfo.appendChild(this.cellAnchorContent[i]);
            }
            this.collapsedCellRating.appendChild(this.ratingDiv);

            this.collapsed.style.display = "table";

            this.model.isVisible = false;
        },


        expand: function() {
            var log = new Logger("CHiddenMessageView.expand");

            if (this.model.isVisible) {
                return;
            }

            this.collapsed.style.display = "none";

            this.expandedCellUser.appendChild(this.userCellContentNode);
            var len = this.cellAnchorContent.length;
            for (var i = 0; i < len; ++i) {
                this.expandedCellAnchor.appendChild(this.cellAnchorContent[i]);
            }
            this.expandedCellRating.insertBefore(this.ratingDiv, this.expandedCellRating.childNodes[0]);

            this.expanded.style.display = "table";

            this.model.isVisible = true;
        }
    }


    /**
     * @constructor
     */
    function CUserIgnoreModel(isBlackList, users, scriptUserId) {
        var log = new Logger("CUserIgnoreModel");

        this.isBlackList = isBlackList;
        this.users = users;
        this.hiddenMessages = new Array();
        this.displayedMessages = new Array();

        var snapshot = $x(XPathHelper.aMsgAuthor);
        log.trace("number of found posts: " + snapshot.snapshotLength);
        for (var i = 0; i < snapshot.snapshotLength; ++i) {
            var profileHref = snapshot.snapshotItem(i);
            //var saveToJournal = $x1(XPathHelper.aSaveToJournalBtn, profileHref);
            //if (saveToJournal != null) {
            //    log.trace("There is script user's message");
            //    continue;
            //}

            var href = profileHref.href;
            var idx = href.indexOf(";u=");
            if (idx == -1) {
                log.error("Can't find user ID. href = " + href);
                continue;
            }
            var userId = href.substr(idx + 3);
            log.trace("User ID = " + userId);
            var userName = profileHref.innerHTML;
            //             a           td         tr         tbody      table
            var msgTable = profileHref.parentNode.parentNode.parentNode.parentNode;
            var contains = users[userId] != null;
            if (contains && isBlackList || !contains && !isBlackList) {
                log.trace("Found hidden message: idx = " + i);
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


    /**
     * @constructor
     */
    function CUserIgnoreController(settings) {
        var log = new Logger("CUserIgnoreController");

        app.addController(this);

        this.settings = settings;
        if (settings.userIgnoreType == CSettingsModel.BLACK_LIST) {
            this.model = new CUserIgnoreModel(true,  settings.userIgnoreListBlack);
        } else {
            this.model = new CUserIgnoreModel(false, settings.userIgnoreListWhite);
        }
        this.view = new CUserIgnoreView(this.model, this);

        var len = this.model.hiddenMessages.length;
        for (var i = 0; i < len; ++i) {
            var msgModel = this.model.hiddenMessages[i];
            this.view.addHiddenMsgView(new CHiddenMessageView(msgModel, this));
        }

        len = this.model.displayedMessages.length;
        for (var i = 0; i < len; ++i) {
            var msgModel = this.model.displayedMessages[i];
            this.view.addDisplayedMsgView(new CDisplayedMessageView(msgModel, this));
        }

        // alt + ctrl + ^
        app.addHotKey("alt+ctrl+38", this);
        // ctrl + shift + ^
        app.addHotKey("ctrl+shift+38", this);
        // alt + ctrl + v
        app.addHotKey("alt+ctrl+40", this);
        // ctrl + shift + v
        app.addHotKey("ctrl+shift+40", this);
    }


    CUserIgnoreController.prototype = {
        handleHotKey: function(hotKey) {
            var log = new Logger("CUserIgnoreController.handleHotKey", hotKey);

            if ("alt+ctrl+38" == hotKey || "ctrl+shift+38" == hotKey) {
                // alt + ctrl + ^ ИЛИ ctrl + shift + ^
                this.collapse();
            } else if ("alt+ctrl+40" == hotKey || "ctrl+shift+40" == hotKey) {
                // alt + ctrl + v ИЛИ alt + shift + v
                this.expand();
            }
        },


        collapse: function() {
            this.view.collapse();
        },


        expand: function() {
            this.view.expand();
        },


        updateSettings: function() {
            var log = new Logger("CUserIgnoreController.updateSettings");

            if (this.model.isBlackList) {
                this.settings.userIgnoreType = CSettingsModel.BLACK_LIST;
                this.settings.userIgnoreListBlack = this.model.users;
            } else {
                this.settings.userIgnoreType = CSettingsModel.WHITE_LIST;
                this.settings.userIgnoreListWhite = this.model.users;
            }
            this.settings.save();
        }
    }


    /**
     * @constructor
     */
    function CUserIgnoreView(model, controller) {
        var log = new Logger("CUserIgnoreView");

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
            var log = new Logger("CUserIgnoreView.collapse");

            var views = this.hiddenMsgViews;
            var len = views.length;
            for (var i = 0; i < len; ++i) {
                views[i].collapse();
            }
        },


        expand: function() {
            var log = new Logger("CUserIgnoreView.expand");

            var views = this.hiddenMsgViews;
            var len = views.length;
            for (var i = 0; i < len; ++i) {
                views[i].expand();
            }
        }
    }


    // ****************************************************************************
    // ************************ Settings View & Controller ************************
    // ****************************************************************************

    // Здесь находится всё, кроме модели. Модель создаётся в самом начале метода
    // onLoad, т.к. она используется ещё до создания других объектов


    /**
     * @constructor
     */
    function CSettingsController(model, menuCtrl) {
        var log = new Logger("CSettingsController");

        app.addController(this);

        this.model = model;
        this.view = new CSettingsView(this, menuCtrl);
    }


    CSettingsController.prototype = {
        handle: function(src, e) {
            var log = new Logger("CSettingsController.handle", src, e.type);

            var view = this.view;
            if (src == view.btnSave) {
                this.showHideForm();
                this.synchronizeModel();
                this.model.save();
                wnd.location.reload();
                return false;
            } else if (src == view.href || src == view.btnCancel) {
                this.showHideForm();
                return false;
            } else if (src == view.userIgnoreRadioBlack || src == view.userIgnoreRadioWhite) {
                this.synchronizeSelect();
                return true;
            } else if (src == view.userIgnoreBtnDelete) {
                var select =
                    view.userIgnoreRadioBlack.checked ?
                    view.userIgnoreSelectBlack :
                    view.userIgnoreSelectWhite;
                var options = select.options;
                var len = options.length;
                var idx = -1;
                for (var i = 0; i < len; ++i) {
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
                    log.error("selectedIndex = " + idx);
                }
                return false;
            } else if (src == view.userIgnoreBtnImport) {
                var useBlackList = view.userIgnoreRadioBlack.checked;
                var importStr = prompt(
                    // Импорт \"
                    "\u0418\u043c\u043f\u043e\u0440\u0442 \"" +
                    // БЕЛОГО : ЧЁРНОГО
                    (useBlackList ? "\u0427\u0401\u0420\u041d\u041e\u0413\u041e" : "\u0411\u0415\u041b\u041e\u0413\u041e") +
                    // \" списка.\n"
                    "\" \u0441\u043f\u0438\u0441\u043a\u0430.\n" +
                    // Вставьте
                    "\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 " +
                    // строку,
                    "\u0441\u0442\u0440\u043e\u043a\u0443, " +
                    // полученную
                    "\u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u0443\u044e " +
                    // при экспорте
                    "\u043f\u0440\u0438 \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u0435 " +
                    // списка
                    "\u0441\u043f\u0438\u0441\u043a\u0430");
                if (importStr != null && importStr.length > 0) {
                    var arr = new Array();
                    this.model.userIgnoreListFromString(arr, importStr);
                    this.createUserIgnoreListOptionsFromArray(useBlackList, arr);
                }
                return false;
            } else if (src == view.userIgnoreBtnExport) {
                var useBlackList = view.userIgnoreRadioBlack.checked;
                var arr = this.userIgnoreListOptionsToArray(useBlackList);
                var exportStr = this.model.userIgnoreListToString(arr);
                prompt(
                    // Экспорт \"
                    "\u042d\u043a\u0441\u043f\u043e\u0440\u0442 \"" +
                    // БЕЛОГО : ЧЁРНОГО
                    (useBlackList ? "\u0427\u0401\u0420\u041d\u041e\u0413\u041e" : "\u0411\u0415\u041b\u041e\u0413\u041e") +
                    // \" списка.\n"
                    "\" \u0441\u043f\u0438\u0441\u043a\u0430.\n" +
                    // Сохраните
                    "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u0435 " +
                    // куда-нибудь
                    "\u043a\u0443\u0434\u0430-\u043d\u0438\u0431\u0443\u0434\u044c " +
                    // эту строку.\n
                    "\u044d\u0442\u0443 \u0441\u0442\u0440\u043e\u043a\u0443.\n" +
                    // В любой момент
                    "\u0412 \u043b\u044e\u0431\u043e\u0439 \u043c\u043e\u043c\u0435\u043d\u0442 " +
                    // Вы можете
                    "\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 " +
                    // восстановить
                    "\u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c " +
                    // сохранённый\n
                    "\u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0439\n" +
                    // список
                    "\u0441\u043f\u0438\u0441\u043e\u043a " +
                    // воспользовавшись
                    "\u0432\u043e\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0432\u0448\u0438\u0441\u044c " +
                    // кнопкой
                    "\u043a\u043d\u043e\u043f\u043a\u043e\u0439 " +
                    // \"Импорт\"
                    "\"\u0418\u043c\u043f\u043e\u0440\u0442\"",
                    exportStr);
                return false;
            } else {
                log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        },

        synchronizeForm: function() {
            var log = new Logger("CSettingsController.synchronizeForm");

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

            this.createUserIgnoreListOptionsFromArray(true,  model.userIgnoreListBlack);
            this.createUserIgnoreListOptionsFromArray(false, model.userIgnoreListWhite);

            this.synchronizeSelect();
        },


        synchronizeModel: function() {
            var log = new Logger("CSettingsController.synchronizeModel");

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

            model.userIgnoreListBlack = this.userIgnoreListOptionsToArray(true);
            model.userIgnoreListWhite = this.userIgnoreListOptionsToArray(false);
        },

        createUserIgnoreListOptionsFromArray: function(useBlackList, userIgnoreList) {
            var log = new Logger("CSettingsController.createUserIgnoreListOptionsFromArray");

            // Вывожу элементы в порядке их идентификаторов
            var sortedIds = new Array();
            for (var id in userIgnoreList) {
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

            var select =
                useBlackList ?
                this.view.userIgnoreSelectBlack :
                this.view.userIgnoreSelectWhite;
            // Удаляю все существующие элементы
            var len = select.options.length;
            for (i = len - 1; i >= 0; i--) {
                select.removeChild(select.options[i]);
            }

            len = sortedIds.length;
            for (var i = 0; i < len; ++i) {
                var option = document.createElement("OPTION");
                var id = sortedIds[i];
                var name = userIgnoreList[new String(id)];
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

        userIgnoreListOptionsToArray: function(useBlackList) {
            var log = new Logger("CSettingsController.userIgnoreListOptionsToArray");

            var select =
                useBlackList ?
                this.view.userIgnoreSelectBlack :
                this.view.userIgnoreSelectWhite;
            var options = select.options;
            var arr = new Array();
            var len = options.length;
            for (var i = 0; i < len; ++i) {
                var userId = options[i].value;
                var userName = options[i].getAttribute("userName");
                arr[userId] = userName;
            }
            return arr;
        },


        showHideForm: function() {
            var log = new Logger("CSettingsController.showHideForm");

            if (this.model.isVisible) {
                this.view.div.style.visibility = "hidden";
                this.model.isVisible = false;
            } else {
                this.synchronizeForm();
                this.view.div.style.visibility = "visible";
                this.model.isVisible = true;
            }
        },

        synchronizeSelect: function() {
            var log = new Logger("CSettingsController.synchronizeSelect");

            var view = this.view;
            if (view.userIgnoreRadioBlack.checked) {
                view.userIgnoreSelectBlack.style.visibility = "inherit";
                view.userIgnoreSelectBlack.style.zOrder     = "20";
                view.userIgnoreSelectWhite.style.visibility = "hidden";
                view.userIgnoreSelectWhite.style.zOrder     = "10";
            } else {
                view.userIgnoreSelectWhite.style.visibility = "inherit";
                view.userIgnoreSelectWhite.style.zOrder     = "20";
                view.userIgnoreSelectBlack.style.visibility = "hidden";
                view.userIgnoreSelectBlack.style.zOrder     = "10";
            }
        }
    }


    /**
     * @constructor
     */
    function CSettingsView(controller, menuCtrl) {
        var log = new Logger("CSettingsView");

        this.model = controller.model;
        this.controller = controller;

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

        // Добавляю пункт в меню
        var span = document.createElement("SPAN");
        span.style.display = "inline-block";
        span.appendChild(this.href);
        span.appendChild(this.div);

        if (menuCtrl != null) {
            var item = menuCtrl.createItem("");
            item.appendChild(span);
            menuCtrl.insertMenuScriptItem(item);

            // Продолжаем обработку настроек игнорирования пользователей
            this.userIgnoreRadioBlack   = $id("york_user_ignore_type_black");
            this.userIgnoreRadioWhite   = $id("york_user_ignore_type_white");
            this.userIgnoreSelectBlack  = $id("york_user_ignore_select_black");
            this.userIgnoreSelectWhite  = $id("york_user_ignore_select_white");
            this.userIgnoreBtnDelete    = $id("york_user_ignore_btn_delete");
            this.userIgnoreBtnImport    = $id("york_user_ignore_btn_import");
            this.userIgnoreBtnExport    = $id("york_user_ignore_btn_export");

            app.addEventListener(this.userIgnoreRadioBlack, "click", this.controller);
            app.addEventListener(this.userIgnoreRadioWhite, "click", this.controller);
            app.addEventListener(this.userIgnoreBtnDelete,  "click", this.controller);
            app.addEventListener(this.userIgnoreBtnImport,  "click", this.controller);
            app.addEventListener(this.userIgnoreBtnExport,  "click", this.controller);
        }
    }


    CSettingsView.prototype = {
        createUserIgnoreSettingsView: function() {
            var log = new Logger("CSettingsView.createUserIgnoreSettingsView");

            var div = document.createElement("DIV");
            div.setAttribute("style", "border: 1px solid black; margin-top: 10px; margin-bottom: 10px; padding: 5px; width: 300px;");
            div.innerHTML =
                // Автоскрытие сообщений
                "<b>\u0410\u0432\u0442\u043e\u0441\u043a\u0440\u044b\u0442\u0438\u0435 " +
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439</b>" +
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
                        "<td width='90%' rowspan='2'>" +
                            "<div style='position: relative; top: 0px; left: 0px;'>" +
                              "<select id='york_user_ignore_select_black' size='10' " +
                                      "style='z-index: 10; width: 100%; visibility: inherit;'>" +
                              "</select>" +
                              "<select id='york_user_ignore_select_white' size='10' " +
                                      "style='z-index: 20; position: absolute; top: 0px; " +
                                      "left: 0px; width: 100%; visibility: hidden;'>" +
                              "</select>" +
                            "</div>" +
                        "</td>" +
                        "<td width='10%' valign='top'>" +
                            // Удалить
                            "<input type='button' id='york_user_ignore_btn_delete' value='\u0423\u0434\u0430\u043b\u0438\u0442\u044c'/> " +
                        "</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td width='10%' valign='bottom'>" +
                            // Импорт
                            "<input type='button' id='york_user_ignore_btn_import' value='\u0418\u043c\u043f\u043e\u0440\u0442'/> " +
                            // Экспорт
                            "<input type='button' id='york_user_ignore_btn_export' value='\u042d\u043a\u0441\u043f\u043e\u0440\u0442'/> " +
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


    /**
     * @constructor
     */
    function CSearchModel(topicId) {
        var log = new Logger("CSearchModel", topicId);

        this.isVisible = false;
        this.isTopic = topicId != null;
        if (this.isTopic) {
            this.topicId = topicId;
            this.topicTitle = document.title;
        }
    }


    /**
     * @constructor
     */
    function CSearchController(pageCtrl, menuCtrl) {
        var log = new Logger("CSearchController");

        app.addController(this);

        this.pageCtrl = pageCtrl;
        this.model = new CSearchModel(pageCtrl.model.topicId);
        this.view = new CSearchView(this.model, this, menuCtrl);
    }


    CSearchController.prototype = {
        handle: function(src, e) {
            var log = new Logger("CSearchController.handle", src, e.type);

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
                log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        },

        showHideForm: function() {
            var log = new Logger("CSearchController.showHideForm");

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


    /**
     * @constructor
     */
    function CSearchView(model, controller, menuCtrl) {
        var log = new Logger("CSearchView");

        this.model = model;
        this.controller = controller;

        this.href = document.createElement("A");
        this.href.style.textDecoration = "none";
        this.href.style.color = "black";
        this.href.href = "#";
        this.href.innerHTML =
            "<img src='http://www.google.com/favicon.ico' alt='g' " +
            "style='vertical-align: top; height: 16px;'/>&nbsp;" +
            // // Поиск с Google
            // "\u041f\u043e\u0438\u0441\u043a \u0441 Google";
            "Google";
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
                    // Только в
                    "\u0422\u043e\u043b\u044c\u043a\u043e \u0432 " +
                    // текущей теме
                    "\u0442\u0435\u043a\u0443\u0449\u0435\u0439 \u0442\u0435\u043c\u0435" +
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

        var span = document.createElement("SPAN");
        span.style.display = "inline-block";
        span.appendChild(this.href);
        span.appendChild(this.div);

        if (menuCtrl != null) {
            menuCtrl.insertMenuForumItem(span,5);
        }
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
    // ********************************* Menu *************************************
    // ****************************************************************************


    /**
     * @constructor
     */
    function CMenuControl() {
        var log = new Logger("CMenuControl");

        // Верхнее меню сайта с пунктами "О проекте", "Форум" и т.д.
        this.menuSite = $x1(XPathHelper.divMenuSite);
        if (null == this.menuSite) {
            log.trace(log, "Site menu wasn't found");
        }

         // Раньше, это меню было в виде списка (ul), теперь это простые div,
         // поэтому для единообразия помещаю все эти div в ещё один div
         var menuSiteItems = $x(XPathHelper.divMenuSiteItems);
         if (null == menuSiteItems || 0 == menuSiteItems.snapshotLength) {
           throwException(log, "Top menu items weren't found");
         }
         this.topMenuLinks = document.createElement("DIV");
         var firstMenuItem = menuSiteItems.snapshotItem(0);
         firstMenuItem.parentNode.insertBefore(this.topMenuLinks, firstMenuItem);
         for (var i = 0; i < menuSiteItems.snapshotLength; ++i) {
             var item = menuSiteItems.snapshotItem(i);
             this.topMenuLinks.appendChild(item);
         }

        // Верхнее меню форума с пунктами "Голосование", "Модерация", "Участники", "Поиск". Теперь оно снизу
        this.menuForum = $x1(XPathHelper.trMenuForum);
        if (null == this.menuForum) {
            log.trace("Forum menu wasn't found");
        }

        // Меню пользователя с пунктами "Личный кабинет", "Сообщения", "Журнал", "Архив" и "Выход"
        this.menuUser = this.topMenuLinks; // $x1(XPathHelper.divMenuUser);
        if (null != this.menuUser) {
            this.menuUser.className += "topMenu";
            this.menuUser.removeAttribute("style");
            this.menuUser.style.height = "29px";
            var menuUserTable = $x1(XPathHelper.tableMenuUser);
            if (null != menuUserTable) {
                menuUserTable.className += "york_menu";
                menuUserTable.removeAttribute("cellPadding");
                menuUserTable.removeAttribute("style");

                // Изменяю ширину ячейки, т.к. её текст "Личный кабинет" у
                // некоторых переносится на две строки
                var cellCabinet = $x1(XPathHelper.tdCabinet, menuUserTable);
                if (null != cellCabinet && cellCabinet.width != "") {
                    cellCabinet.width = parseInt(cellCabinet.width) + 30;
                    cellCabinet.style.textAlign = "right";
                }
            }
        } else {
            log.trace("User menu wasn't found");
        }

        // Создаю div для меню скрипта
        var divMenuScript = document.createElement("DIV");
        divMenuScript.className = "topMenu york_menu";

        this.menuScript = document.createElement("UL");
        this.menuScript.className = "york_scriptMenu";
//        this.menuScript.style.width = "610px";
        this.menuScript.style.cssFloat = "left";
        this.menuScript.style.textAlign = "left";

        this.scriptLinks = document.createElement("UL");
        this.scriptLinks.className = "york_scriptMenu";
//        this.scriptLinks.style.width = "460px";
        this.menuScript.style.textAlign = "right";

        // Добавляю меню скрипта на страницу после меню пользователя
        divMenuScript.appendChild(this.menuScript);
        divMenuScript.appendChild(this.scriptLinks);
        if (this.menuUser != null) {
            // this.menuUser.parentNode - это div[@class='main']
            this.menuUser.parentNode.insertBefore(divMenuScript, this.menuUser.nextSibling);
            //this.menuUser.parentNode.appendChild(divMenuScript);
        }
     //   if (this.menuForum != null) {
     //       // this.menuUser.parentNode - это div[@class='main']
     //       this.menuForum.parentNode.insertBefore(divMenuScript, this.menuUser.nextSibling);
     //   }

        // Добавляю текст "Скрипт:"
        // <b>Скрипт:</b>
        var item = this.createItem("<b>\u0421\u043a\u0440\u0438\u043f\u0442:</b>");
        this.insertMenuScriptItem(item);

        // Делаю отступ перед именем пользователя
        // item = this.createItem("&nbsp;&nbsp;&nbsp;");
        // this.insertTopUserItem(item, 0);
    }


    CMenuControl.prototype = {
        insertMenuForumItem: function(item, idx) {
            if (this.menuForum == null)
            {
                return;
            }

            var td = this.menuForum.insertCell(idx);
            td.align = "center";
            td.width = "100";
            td.style.borderRight = "1px solid #ffffff";
            td.appendChild(item);
        },

        // insertTopUserItem: function(item, idx) {
            // this.insertItem(this.topMenuUser, item, idx);
        // },

        insertMenuScriptItem: function(item, idx) {
            this.insertItem(this.menuScript, item, idx);
        },

        insertScriptLinksItem: function(item, idx) {
            this.insertItem(this.scriptLinks, item, idx);
        },

        insertItem: function(menu, item, idx) {
            var log = new Logger("CMenuControl.insertItem", idx);

            // На всякий случай сделаю проверку, вдруг нужное меню не инициализировалось
            if (menu != null) {
                if (null == idx) {
                    menu.appendChild(item);
                } else {
                    menu.insertBefore(item, menu.childNodes[idx]);
                }
            } else {
                log.error("Can't insert an item: menu is null");
            }
        },

        createItem: function(text, url) {
            var log = new Logger("CMenuControl.createItem", text, url);

            var textNode;
            if (null != url) {
                textNode = document.createElement("A");
                textNode.href = url;
            } else {
                textNode = document.createElement("SPAN");
            }
            textNode.innerHTML = text;

            var item = document.createElement("LI");
            item.appendChild(textNode);

            return item;
        }
    }


    // ****************************************************************************
    // ********************************* Page *************************************
    // ****************************************************************************

    /**
     * @constructor
     */
    function CPageModel() {
        var log = new Logger("CPageModel");

        if (/(avanturist.org|glav.su).forum.[0-9].+(message|offset).(new|[0-9]|last).+/.test(url)){  
            this.pageType = CPageModel.PAGE_TYPE_TOPIC;
        } else if (/(avanturist.org|glav.su).forum.[0-9]/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_BOARD;
        } else if (/\/forum\//.test(url)) {
            if ((!url.contains("reply")&&(!url.contains("message/add/")))&&(null != $x1(XPathHelper.tableBoardTable))) {
                this.pageType = CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE;
            } else {
				if (url.contains("reply")||(url.contains("message/add/"))) {
					this.pageType = CPageModel.PAGE_TYPE_MESSAGE;
				} else {
					this.pageType = CPageModel.PAGE_TYPE_OTHER_FORUM_PAGE;
				}
            }
        } else {
            this.pageType = CPageModel.PAGE_TYPE_OTHER_SITE_PAGE;
        }


        /* if (/index\.php.+action=post/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_MESSAGE;
        } else if (/index\.php.+topic[=,]/.test(url) || /\/forum\/topic\/\d+/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_TOPIC;
        } else if (/index\.php.+board[=,]/.test(url)) {
            this.pageType = CPageModel.PAGE_TYPE_BOARD;
        } else if (/\/forum\//.test(url)) {
            if (null != $x1(XPathHelper.tableBoardTable)) {
                this.pageType = CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE;
            } else {
                this.pageType = CPageModel.PAGE_TYPE_OTHER_FORUM_PAGE;
            }
        } else {
            this.pageType = CPageModel.PAGE_TYPE_OTHER_SITE_PAGE;
        } */
        log.trace("Page type = " + this.pageType);

        if (CPageModel.PAGE_TYPE_TOPIC == this.pageType) {
            // TODO дублирование кода, где-то уже это есть
            this.topicId = getTopicId();
            log.trace("topic_id = " + this.topicId);
//            if (null != this.topicId) {
//                this.topicId = input.value;
//            }

            var b = $x1(XPathHelper.bCurrentPage);
            if (b != null) {
                this.currentPage = parseInt(b.innerHTML);
                log.trace("currentPage = " + this.currentPage);
            } else {
                // TODO restore
                //throwException(log, "Navigator wasn't found");
                return;
            }

            var href = $x1(XPathHelper.aLastPage);
            this.lastPage = href != null ? parseInt(href.innerHTML) : 1;
            this.lastPage = Math.max(this.lastPage, this.currentPage);
            log.trace("lastPage = " + this.lastPage);

            if (this.currentPage != 1) {
                this.firstPageUrl = this.buildPageUrl(1);
                this.prevPageUrl  = this.buildPageUrl(this.currentPage - 1);
            }

            if (this.currentPage != this.lastPage) {
                this.nextPageUrl = this.buildPageUrl(this.currentPage + 1);
                this.lastPageUrl = this.buildPageUrl(this.lastPage);
            }
        } else {
            this.topicId = null;
        }
    }


    CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE    = 0x0101;
    CPageModel.PAGE_TYPE_BOARD              = 0x0102;
    CPageModel.PAGE_TYPE_TOPIC              = 0x0504;
    CPageModel.PAGE_TYPE_MESSAGE            = 0x0408;   // Форма отправки/редактирования сообщения
    CPageModel.PAGE_TYPE_OTHER_FORUM_PAGE   = 0x0110;
    CPageModel.PAGE_TYPE_OTHER_SITE_PAGE    = 0x0220;

    // Страницы форума, на которых надо показывать меню, поиск и настройки
    CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP   = 0x0100;
    // Прочие страницы сайта
    CPageModel.PAGE_TYPE_SITE_GROUP         = 0x0200;
    // Страницы форума отображающие содержиое темы: просмотр темы и отправка сообщения
    CPageModel.PAGE_TYPE_FORUM_TOPIC_GROUP  = 0x0400;


    CPageModel.prototype = {
        isClosedTopic: function() {
            var log = new Logger("CPageModel.isClosedTopic");

            if (this.pageType != CPageModel.PAGE_TYPE_TOPIC)
                return false;

            if (typeof this.isClosed == "undefined") {
                // Проверяю, вошёл ли пользователь
                var userSignedup = null == $x1(XPathHelper.aSignup);
                log.trace("userSignedup = " + userSignedup);

                if (userSignedup) {
                    // Проверяю, есть ли кнопка "Ответить" у сообщений
                    this.isClosed = null == $x1(XPathHelper.btnReply);
                } else {
                    this.isClosed = false;
                }
                log.trace("result = " + this.isClosed);
            }

            return this.isClosed;
        },

        buildPageUrl: function(page) {
            var start = (page - 1) * 20;
            return "/forum/index.php/topic," + this.topicId + "." + start + ".html";
        }
    };

    /**
     * @constructor
     */
    function CPageController(isForumPage, isTopic) {
        var log = new Logger("CPageController");

        app.addController(this);

        this.settings = new CSettingsModel();
        this.model = new CPageModel();
        this.view = new CPageView(this, this.model);

        if ((this.model.pageType & CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP) != 0) {
            this.searchCtrl = new CSearchController(this, this.view.menuCtrl);

            // Настройка меню скрипта
            this.settingsCtrl = new CSettingsController(this.settings, this.view.menuCtrl);
            this.view.createUserMenuItems();
        }
        if (CPageModel.PAGE_TYPE_TOPIC == this.model.pageType) {
            this.userIgnoreController = new CUserIgnoreController(this.settings);
            this.userIgnoreController.collapse();
            // Горячие клавиши для навигации по теме
            // ctrl + <
            app.addHotKey("ctrl+37", this);
            // ctrl + >
            app.addHotKey("ctrl+39", this);
            // ctrl + Home
            app.addHotKey("ctrl+36", this);
            // ctrl + End
            app.addHotKey("ctrl+35", this);
        }
        if (CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE == this.model.pageType) {
            // Горячие клавиши для сворачивания/разворачивания тем на первой странице
            // alt + ctrl + ^
            app.addHotKey("alt+ctrl+38", this);
            // ctrl + shift + ^
            app.addHotKey("ctrl+shift+38", this);
            // alt + ctrl + v
            app.addHotKey("alt+ctrl+40", this);
            // ctrl + shift + v
            app.addHotKey("ctrl+shift+40", this);
        }
    }


    CPageController.prototype = {
        handle: function(src, e) {
            var log = new Logger("CPageController.handle", src, e.type);

            if (e.type == "click") {
                if (src == this.view.collapseAllBoards) {
                    // TODO: переделать
                    topicWrapper.collapse();
                    return false;

                } else if (src == this.view.expandAllBoards) {
                    // TODO: переделать
                    topicWrapper.expand();
                    return false;

                } else if (src == this.view.collapseIgnoredMsgs) {
                    this.userIgnoreController.collapse();
                    return false;

                } else if (src == this.view.expandIgnoredMsgs) {
                    this.userIgnoreController.expand();
                    return false;

                } else if (src == this.view.btnPre || src.parentNode == this.view.btnPre) {
                    surroundText("[pre]", "[/pre]", this.view.textArea);
                    return false;

                } else if (src == this.view.btnUrl || src.parentNode == this.view.btnUrl) {
                    // Введите URL. Например, http://yandex.ru
                    var href = wnd.prompt("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 URL. " +
                        "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, http://yandex.ru", "");
                    if (null != href) {
                        surroundText("[url=" + href + "]", "[/url]", this.view.textArea);
                    }
                    return false;

                } else if (src == this.view.btnQuote || src.parentNode == this.view.btnQuote) {
                    // Укажите автора цитаты или её источник. Например, avanturist.
                    // Можете ничего не указывать.
                    // Кнопка "Отменить" отменяет создание цитаты.
                    var s=this.view.textArea.value;
                    if ((s!=null)&&(s.indexOf("=")>s.indexOf("["))&&(s.indexOf("=")<s.indexOf("]"))) {
						s=s.substr(s.indexOf("[")+1,s.length);
						s=s.substr(1,s.indexOf("]")-1);
						s=s.substr(s.indexOf("=")+1,s.length);
                    } else {
						s="";
					}
                    var source = wnd.prompt("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 " +
                        "\u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a " +
                        "\u0446\u0438\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f. " +
                        "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, avanturist.\n" +
                        "\u041c\u043e\u0436\u0435\u0442\u0435 " +
                        "\u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 " +
                        "\u0443\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c.\n" +
                        "\u041a\u043d\u043e\u043f\u043a\u0430 " +
                        "\"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c\" " +
                        "\u043e\u0442\u043c\u0435\u043d\u044f\u0435\u0442 " +
                        "\u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 " +
                        "\u0446\u0438\u0442\u0430\u0442\u044b.", s);
                    if (source != null) {
                        var openQuote = "[quote" + (source != "" ? " author=" + source : "") + "]";
                        surroundText(openQuote, "[/quote]", this.view.textArea);
                    }
                    return false;

                } else if (src == this.view.btnFormatTable || src.parentNode == this.view.btnFormatTable) {
                    var textArea = this.view.textArea;
                    // Can a text range be created?
                    if (typeof(textArea.caretPos) != "undefined" && textArea.createTextRange) {
                        var caretPos = textArea.caretPos;
                        var len = caretPos.text.length;

                        var formatted = this.formatTable(caretPos.text);
                        if (formatted.length > 0) {
                            caretPos.text = formatted;
                            textArea.focus(caretPos);
                        }
                    } else if (typeof(textArea.selectionStart) != "undefined") {
                        // Mozilla text range wrap
                        var begin = textArea.value.substr(0, textArea.selectionStart);
                        var selection = textArea.value.substr(textArea.selectionStart,
                            textArea.selectionEnd - textArea.selectionStart);
                        var end = textArea.value.substr(textArea.selectionEnd);
                        var newCursorPos = textArea.selectionStart;
                        var scrollPos = textArea.scrollTop;

                        var formatted = this.formatTable(selection);
                        if (formatted.length > 0) {
                            textArea.value = begin + formatted + end;

                            if (textArea.setSelectionRange) {
                                textArea.setSelectionRange(newCursorPos, newCursorPos + formatted.length);
                                textArea.focus();
                            }
                            textArea.scrollTop = scrollPos;
                        }
                    } else {
                        // Извините, функция не поддерживается вашим браузером
                        alert("\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, " +
                            "\u0444\u0443\u043d\u043a\u0446\u0438\u044f \u043d\u0435 " +
                            "\u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f " +
                            "\u0432\u0430\u0448\u0438\u043c " +
                            "\u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043e\u043c");
                    }
                    return false;

                } else {
                    log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                    return true;
                }

            } else if (e.type == "mouseover") {
                if (wnd["bbc_highlight"] != null) {
                    wnd.bbc_highlight(src, true);
                }
                return false;

            } else if (e.type == "mouseout") {
                if (wnd["bbc_highlight"] != null) {
                    wnd.bbc_highlight(src, false);
                }
                return false;

            } else {
                log.error("An unexpected event. src.id = " + src.id + ", e.type = " + e.type);
                return true;
            }
        },


        handleHotKey: function(hotKey) {
            var log = new Logger("CPageController.handleHotKey", hotKey);

            if ("alt+ctrl+38" == hotKey || "ctrl+shift+38" == hotKey) {
                // alt + ctrl + ^ ИЛИ ctrl + shift + ^
                // TODO: переделать
                topicWrapper.collapse();

            } else if ("alt+ctrl+40" == hotKey || "ctrl+shift+40" == hotKey) {
                // alt + ctrl + v ИЛИ alt + shift + v
                // TODO: переделать
                topicWrapper.expand();

            } else if ("ctrl+37" == hotKey) {
                // ctrl + <
                if (null != this.model.prevPageUrl) {
                    window.location.replace(this.model.prevPageUrl);
                };

            } else if ("ctrl+39" == hotKey) {
                // ctrl + >
                if (null != this.model.nextPageUrl) {
                    window.location.replace(this.model.nextPageUrl);
                };

            } else if ("ctrl+36" == hotKey) {
                // ctrl + Home
                if (null != this.model.firstPageUrl) {
                    window.location.replace(this.model.firstPageUrl);
                };

            } else if ("ctrl+35" == hotKey) {
                // ctrl + End
                if (null != this.model.lastPageUrl) {
                    window.location.replace(this.model.lastPageUrl);
                };
            }
        },


        handleSaveToArchive: function(src, e) {
            var log = new Logger("CPageController.handleSaveToArchive", src, e.type);

            var topic_id   = $(src).parent().parent().find("input[name='topic_id']").val();
            var message_id = $(src).parent().parent().find("input[name='message_id']").val();

            // Проверяем входные параметры
            if (topic_id == 'undefined' || message_id == 'undefined') {
                // Ошибка сохранения материала в ваш личный архив!
                alert("\u041e\u0448\u0438\u0431\u043a\u0430 " +
                    "\u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f " +
                    "\u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u0430 \u0432 " +
                    "\u0432\u0430\u0448 \u043b\u0438\u0447\u043d\u044b\u0439 " +
                    "\u0430\u0440\u0445\u0438\u0432!");
                return;
            }

            // отправляем запрос
            $.getJSON("/forum/index.php?action=all_ajax_save_to_archive",
                {topic_id: topic_id, message_id: message_id},
                function(data) {
                    if (data.result == 1) {
                        $(src).hide();
                    } else {
                        alert(data.result_status);
                    }
                }
            );

            return false;
        },

        formatTable: function(text) {
            var log = new Logger("CPageController.formatTable");

            // Сначала удаляем все лишние символы сначала и конца строки
            var start = text.length;
            for (var i = 0; i < text.length; ++i) {
                var ch = text[i];
                if (ch != " " && ch != "\r" && ch != "\n") {
                    start = i;
                    break;
                }
            }
            if (start == text.length) {
                log.error("the text is empty");
                return "";
            }

            var end = 0;
            for (var i = text.length - 1; i > start; i--) {
                var ch = text[i];
                if (ch != " " && ch != "\r" && ch != "\n") {
                    end = i;
                    break;
                }
            }

            var res = "[table]\n[tr][td]";
            var len = text.length;
            for (var i = start; i <= end; ++i) {
                var ch = text[i];
                if (ch == "\t") {
                    res += "[/td][td]";
                } else if (ch == "\n") {
                    res += "[/td][/tr]\n[tr][td]";
                } else if (ch == "\r") {
                    // Ignore
                } else {
                    res += ch;
                }
            }
            res += "[/td][/tr]\n[/table]\n";

            return res;
        }
    };


    /**
     * @constructor
     */
    function CPageView(controller, model) {
        var log = new Logger("CPageView");

        this.controller = controller;
        this.model = model;

        if (model.pageType == CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE) {
            //this.highlightModerators();
        }

        if ((model.pageType & CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP) != 0) {
            try {
                this.menuCtrl = new CMenuControl();
            } catch (e) {
                this.menuCtrl = null;
                log.error("menu control creation error: " + e);
            }

            if (this.menuCtrl != null) {
                var item = document.createElement("DIV");
                // Убрал, т.к. ссылка на статистику появилась внизу 1-й страницы
                // item.className = "link";
                // item.style.width = "80px";
                // item.innerHTML = "<a href=\"/forum/index.php?action=stats\">" +
                    // // Статистика
                    // "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430" +
                    // "</a>";
                // this.menuCtrl.insertTopLinksItem(item, 3);

                // Убрал, т.к. ссылка на поиск появилась в вехнем меню ссылок
                // item = this.menuCtrl.createItem(
                    // "<img src='/forum/Themes/default/images/ga_ico_search.gif' " +
                        // "style='vertical-align:middle; margin-bottom:1px;'/>" +
                    // // &nbsp;Поиск
                    // "&nbsp;\u041f\u043e\u0438\u0441\u043a",
                    // "/forum/index.php?action=search");
                // this.menuCtrl.insertTopUserItem(item, 0);
    
                item = this.menuCtrl.createItem(
                    // Непрочитанные
                    "\u041d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 " +
                    // темы
                    "\u0442\u0435\u043c\u044b",
                    "/forum/index.php?action=unread");
                this.menuCtrl.insertScriptLinksItem(item);
    
                item = this.menuCtrl.createItem(
                    // Непрочитанные
                    "\u041d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0435 " +
                    // ответы
                    "\u043e\u0442\u0432\u0435\u0442\u044b",
                    "/forum/index.php?action=unreadreplies");
                this.menuCtrl.insertScriptLinksItem(item);
    
                item = this.menuCtrl.createItem(
                    // Последние
                    "\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 " +
                    // сообщения
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f",
                    "/forum/index.php?action=recent");
                this.menuCtrl.insertScriptLinksItem(item);
            }
        }

        if (model.pageType == CPageModel.PAGE_TYPE_MESSAGE) {
            this.addEditButtons();
            this.removeHideMessageOptions();
        }

        if (model.pageType == CPageModel.PAGE_TYPE_TOPIC) {
            if (model.isClosedTopic()) {
                this.addSaveToArchiveButtons();
            }

            if (controller.settings.sett_addImageLinks) {
                this.addImageLinks();
            }

            if (controller.settings.sett_addSpoilToComment) {
                this.addSpoilToComment();
            }
            
            // TODO: добавить настройку
            this.updateHeadLinks();
        }

        if ((model.pageType & CPageModel.PAGE_TYPE_FORUM_TOPIC_GROUP) != 0) {
            if (controller.settings.sett_borderTables) {
                this.borderTables();
            }
        }

        if ((model.pageType & CPageModel.PAGE_TYPE_FORUM_PAGE_GROUP) != 0 ||
            (model.pageType & CPageModel.PAGE_TYPE_FORUM_TOPIC_GROUP) != 0) {
            this.addScriptVersion();
        }

        this.addImageAlt();
        this.addFavicon();
        this.addCustomCSS();
    }


    CPageView.prototype = {
        createUserMenuItems: function(parentNode) {
            var log = new Logger("CPageView.createUserMenuItems");

            if (CPageModel.PAGE_TYPE_MAIN_FORUM_PAGE == this.model.pageType) {
                // Свернуть разделы
                this.collapseAllBoards = this.appendScriptMenuItem(
                    "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c " +
                    "\u0440\u0430\u0437\u0434\u0435\u043b\u044b");
                // Развернуть разделы
                this.expandAllBoards = this.appendScriptMenuItem(
                    "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c " +
                    "\u0440\u0430\u0437\u0434\u0435\u043b\u044b");
            } else if (CPageModel.PAGE_TYPE_TOPIC == this.model.pageType) {
                // Свернуть игнорируемые сообщения
                this.collapseIgnoredMsgs = this.appendScriptMenuItem(
                    "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c " +
                    "\u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0435\u043c\u044b\u0435 " +
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f");
                // Развернуть игнорируемые сообщения
                this.expandIgnoredMsgs = this.appendScriptMenuItem(
                    "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c " +
                    "\u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u0435\u043c\u044b\u0435 " +
                    "\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f");
            }
        },

        appendScriptMenuItem: function(title) {
            var log = new Logger("CPageView.appendScriptMenuItem", title);

            var href = document.createElement("A");
            href.href = "#";
            href.innerHTML = title;
            app.addEventListener(href, "click", this.controller);

            if (this.menuCtrl != null) {
                var item = this.menuCtrl.createItem("");
                item.appendChild(href);
                this.menuCtrl.insertMenuScriptItem(item);
            }

            return href;
        },

        createButton: function(imgUrl, title) {
            var log = new Logger("CPageView.createButton", title);

            var img = document.createElement("IMG");
            img.src = imgUrl;
            img.title = title;
            img.alt = title;
            img.height = 22;
            img.width = 23;
            img.align = "bottom";
            img.style.margin = "0px 2px 0px 1px";
            img.style.backgroundImage = "url(/forum/Themes/default/images/bbc/bbc_bg.gif)";
            img.style.verticalAlign = "middle";
            app.addEventListener(img, "mouseout", this.controller);
            app.addEventListener(img, "mouseover", this.controller);

            var href = document.createElement("A");
            href.href = "#";
            app.addEventListener(href, "click", this.controller);
            href.appendChild(img);

            return href;
        },

        borderTables: function() {
            var log = new Logger("CPageView.borderTables");

            var cssCode =
                ".text .table .table .post table, #preview_section .post table {" +
                    "border: 2px solid rgb(213, 213, 234);" +
                    "border-spacing: 0px;" +
                    "border-collapse: collapse;" +
                    "margin-top: 5px; } " +
                ".text .table .table .post tr:first-child, #preview_section .post tr:first-child {" +
                    "font-weight: bold; }" +
                ".text .table .table .post td, #preview_section .post td {" +
                    "border: 1px solid rgb(213, 213, 234);" +
                    "padding: 2px;" +
                "}";
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = cssCode;
            } else {
                styleElement.appendChild(document.createTextNode(cssCode));
            }
            document.getElementsByTagName("head")[0].appendChild(styleElement);
        },

        // Окружаю рисунки без ссылок на источник, такими ссылками
        addImageLinks: function() {
            var log = new Logger("CPageView.addImageLinks");

            // Выбираю все рисунки из текстов сообщений, которые:
            // 1. не содержат в пути "avanturist.org/",
            // 2. путь к нем начинается с "http://",
            // 3. не окружены ссылками
            // 4. имеют теги height и width
            var snapshot = $x(XPathHelper.postScaledImages);
            log.trace("Found images: " + snapshot.snapshotLength);
            for (var i = 0; i < snapshot.snapshotLength; ++i) {
                var img = snapshot.snapshotItem(i);
                var href = document.createElement("A");
                href.href = img.src;
                href.target = "_blank";
                img.parentNode.insertBefore(href, img);
                href.appendChild(img);
            }
        },

        // Добавляет спойлер к цитатам
        addSpoilToComment: function() {
			var s,h,n,k;
            var log = new Logger("CPageView.addSpoilToComment");

            var snapshot = document.getElementsByClassName("quoteContent");
            log.trace("Found comments: " + snapshot.length);
            for (var i = 0; i < snapshot.length; ++i) {
                s = snapshot[i].innerHTML.trim();
                if ((s.length>200)||(s.indexOf('<img')>=0)) {
					if (s.indexOf('<img')>=0 && s.indexOf('<img')<200) {
						k=s.indexOf('<img');
					} else {
						k=200;
						while (('.?!'.indexOf(s[k])<0)&&(k<s.length)) {
							k=k+1;
						}
						k=k+1;
					}
					if (k<s.length) {
 						h = s.substr(0,k);
						s = s.substr(k,s.length);
						n = '<div class="spoiler forumspoiler_container">';
						n+='<a onclick="return false;" href="" class="spoilerHeader forumspoiler_header">';
						n+=h+'</a><div style="display: none;" class="spoilerContent">'+s+'</div></div>';
						snapshot[i].innerHTML = n;
					}
				}
            }
        },
        
        // Добавляю атрибут alt ко всем рисункам без этого атрибута
        addImageAlt: function() {
            var log = new Logger("CPageView.addImageAlt");

            // Выбираю все рисунки без атрибута alt
            var snapshot = $x(XPathHelper.imgEmptyAlt);
            log.trace("Found images without alt: " + snapshot.snapshotLength);
            for (var i = 0; i < snapshot.snapshotLength; ++i) {
                var img = snapshot.snapshotItem(i);
                img.alt = "IMG";
            }
        },

        addSaveToArchiveButtons: function() {
			return;
            var log = new Logger("CPageView.addSaveToArchiveButtons");

            if (!jQueryInstalled) {
                log.error("feature requires jQuery, but it is not found");
                return;
            }

            // Получаю последние ячейки в таблице, которая находится в правой верхней ячейки таблицы сообщения
            var snapshot = $x(XPathHelper.tdPostButtons);
            var len = snapshot.snapshotLength;
            log.trace("Number of found posts: " + len);
            for (var i = 0; i < len; ++i) {
                var td = snapshot.snapshotItem(i);

                var img = document.createElement("IMG");
                img.src = "/forum/Themes/default/images/btn_save_to_archive.gif";
                img.style.verticalAlign = "middle";
                img.style.marginTop = "-3px";
                img.style.marginBottom = "-4px";
                // Сохранить в архив
                img.alt = "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0432 \u0430\u0440\u0445\u0438\u0432";
                img.title = img.alt;

                var href = document.createElement("A");
                href.href = "#";
                href.appendChild(img);
                app.addEventListener(href, "click", this.controller, "handleSaveToArchive");

                td.appendChild(href);
            }
        },
        
        updateHeadLinks: function() {
            var log = new Logger("CPageView.updateHeadLinks");

            var head = document.getElementsByTagName("HEAD")[0];

            // Только (?) для Opera
            var link = document.createElement("LINK");
            link.href = "#";
            link.rel = "up";
            head.appendChild(link);

            link = document.createElement("LINK");
            link.href = "/forum/index.php?action=search";
            link.rel = "search";
            head.appendChild(link);

            link = document.createElement("LINK");
            link.href = "/forum/index.php";
            link.rel = "Index";
            head.appendChild(link);

            link = document.createElement("LINK");
            link.href = "/forum/index.php";
            link.rel = "Contents";
            head.appendChild(link);

            link = document.createElement("LINK");
            link.href = "/forum/index.php?action=help";
            link.rel = "Help";
            head.appendChild(link);

            if (null != this.model.firstPageUrl) {
                link = link.cloneNode(true);
                link.href = this.model.firstPageUrl;
                link.rel = "start";
                head.appendChild(link);

                // Только (?) для Opera
                link = link.cloneNode(true);
                link.rel = "first";
                head.appendChild(link);
            }

            if (null != this.model.lastPageUrl) {
                link = link.cloneNode(true);
                link.href = this.model.lastPageUrl;
                link.rel = "last";
                head.appendChild(link);
            }

            link = $x1(XPathHelper.linkRelPrev);
            if (null != this.model.prevPageUrl) {
                if (null == link) {
                    log.trace("<link rel='prev'> wasn't found");
                    link = document.createElement("LINK");
                    link.rel = "prev";
                    head.appendChild(link);
                }
                link.href = this.model.prevPageUrl;
            } else if (null != link) {
                link.parentNode.removeChild(link);
            }

            link = $x1(XPathHelper.linkRelNext);
            if (null != this.model.nextPageUrl) {
                if (null == link) {
                    log.trace("<link rel='next'> wasn't found");
                    link = document.createElement("LINK");
                    link.rel = "next";
                    head.appendChild(link);
                }
                link.href = this.model.nextPageUrl;
            } else if (null != link) {
                link.parentNode.removeChild(link);
            }
        },

        addFavicon: function() {
            var log = new Logger("CPageView.addFavicon");

            var head = document.getElementsByTagName("HEAD")[0];
            var link = document.createElement("LINK");
            link.href = "data:image/x-icon;base64," +
                "AAABAAIAEBAAAAEACABoBQAAJgAAABAQAAABACAAaAQAAI4FAAAoAAAAEAAA" +
                "ACAAAAABAAgAAAAAAEABAAAAAAAAAAAAAAABAAAAAAAAAAAAAP///wBENwQA" +
                "nq+kAKOwpACcppcAoK+jAJekmQCerp4AmaGOAJOdgQCNmHgAmKiOAJiihgCb" +
                "n38AkZiAAJGcfQCWnIIAl56CAJ2nlACgqZwApK6fAKe0qgCxwLEAcndBAEtM" +
                "EwA8KAAAKRUAACELAACanZsAoaqXAI2ZfQCMl3YAjpRyAI+cfgCVpIsAlaGL" +
                "AJ+rmwCgq5YAhY9wAEdFEwA0GwwAJQQAACYAAAAkAAAANB0jAKawkQCPm4AA" +
                "k5+AAJWbfwCao4sAl6GIAJKZegCcoYYAnaWKAGJfQQAjAAAALgIIAMnNwACf" +
                "qJQAo6qgAKKvmACepIkAmaGDAJadfQCSmoEAqK2OAGBZQQBHoT8AOkkQAFA8" +
                "NwBARB0ANZI6ACeJIgC4zMIAt8OwAKiyqQCpuasAprKkAI6TbwCTmXYAn6J+" +
                "AFRGMgB2bU8AanVLADtwIgBgiFsASoRSAFOYVABWOzwAIAUAAHFtbACkr54A" +
                "lqaRAKezqQCWnHIAmp15AJedfgCosIgAWGKHAGCKzwAtdhEAUIJ3AEZdPwBN" +
                "fyYAMFxKAKizuACbp4EAlZ16AJejgwCmrpUAmJt4AJCZbgCSmXQAmJ1qAE9s" +
                "wwBxqYgAMYw1ADmMRABQpzIARViTAC8xlQB1enIAn6N2AJ6fdQCboYAAoauR" +
                "AKGkjwCcoH0AkZd2AJ2feABkfrEAbaulAFrAqwAio1QAKqNCAEaBHQAgK6YA" +
                "tbuSAJyeewCgpogAn6SCAKWvlQClr54AsbmuALG/sgC6xbgAeo+vAHuprQAe" +
                "nSUAK58zACyXFQBFei4AOD6YAMPJrQCutqIArbWkAKatmQCot6UArrWfAK20" +
                "rQCxu7EArL62ALK/qwBfh9oAVIZbADp5AAA6eBAAQ1umAHlxkwC7xakAt8Cy" +
                "ALO6pwCxvrAAtryqAJWhhwCmr5wAs7qqAKu0pACjr6MAXXKaAFB51ACBqPAA" +
                "QWXQAB44jQCCfIAAsrifAKitlgCjsJcAqK+ZAKu0mwCeqI8AnKmTAKOtoQCq" +
                "tacAiJaAAIGBbQCAlckALk6iABcddQCJg6IAW19AAIuLdQClrJQAkpl5AKGn" +
                "iwChpYYAusKvALLArQDAzsYAm6iZAEtICQBkYlcA6P/vALS8zQDR7e8AxdnU" +
                "AExLLQAnEAAAdHNlALW/sACus5gAsLaZAKy7sQCDgWkAUU8iADkqAgBRURoA" +
                "QTQbANv38wBudb0Ag5CzAMvm8AAqHgAARjcTADUjAAA/NQ8Af3xrALvGtQBJ" +
                "RR0AWlgmAEU4FQBQTCEAPCwAALzP0wCBiscAkqS/ALPNyQAvFgAASUYVAEEs" +
                "EwBSSxoAUk0TADo1AgBwjIQAEEREAALv8PHy8/T19vf4+fr7/P3f4OHi4+Tl" +
                "5ufo6err7O3uz9DR0tPU1dbX2Nna29zd3r/AwcLDxMXGx8jJysvMzc6vsLGy" +
                "s7S1tre4ubq7vL2+n6ChoqOkpaanqKmqq6ytro+QkZKTlJWWl5iZmpucnZ5/" +
                "gIGCg4SFhoeIiYqLjI2Ob3BxcnN0dXZ3eHl6e3x9fl9gYWJjZGVmZ2hpamts" +
                "bW5PUFFSU1RVVldYWVpbXF1eP0BBQkNERUZHSElKS0xNTjM0NTY3OCssLCw5" +
                "Ojs8PT4jJCUmJygpKissLS4vMDEyExQVFhcYGRobHB0eHyAhIgMEBQYHCAkK" +
                "CwwNDg8QERIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAABAAAAAgAAAAAQAgAAAA" +
                "AABABAAAAAAAAAAAAAAAAAAAAAAAAEQ3BP9JRR3/Wlgm/0U4Ff9QTCH/PCwA" +
                "/7zP0/+Bisf/kqS//7PNyf8vFgD/SUYV/0EsE/9SSxr/Uk0T/zo1Av+su7H/" +
                "g4Fp/1FPIv85KgL/UVEa/0E0G//b9/P/bnW9/4OQs//L5vD/Kh4A/0Y3E/81" +
                "IwD/PzUP/398a/+7xrX/usKv/7LArf/Azsb/m6iZ/0tICf9kYlf/6P/v/7S8" +
                "zf/R7e//xdnU/0xLLf8nEAD/dHNl/7W/sP+us5j/sLaZ/56oj/+cqZP/o62h" +
                "/6q1p/+IloD/gYFt/4CVyf8uTqL/Fx11/4mDov9bX0D/i4t1/6WslP+SmXn/" +
                "oaeL/6Glhv+VoYf/pq+c/7O6qv+rtKT/o6+j/11ymv9QedT/gajw/0Fl0P8e" +
                "OI3/gnyA/7K4n/+orZb/o7CX/6ivmf+rtJv/rrWf/620rf+xu7H/rL62/7K/" +
                "q/9fh9r/VIZb/zp5AP86eBD/Q1um/3lxk/+7xan/t8Cy/7O6p/+xvrD/tryq" +
                "/6Wvnv+xua7/sb+y/7rFuP96j6//e6mt/x6dJf8rnzP/LJcV/0V6Lv84Ppj/" +
                "w8mt/662ov+ttaT/pq2Z/6i3pf+hpI//nKB9/5GXdv+dn3j/ZH6x/22rpf9a" +
                "wKv/IqNU/yqjQv9GgR3/ICum/7W7kv+cnnv/oKaI/5+kgv+lr5X/mJt4/5CZ" +
                "bv+SmXT/mJ1q/09sw/9xqYj/MYw1/zmMRP9QpzL/RViT/y8xlf91enL/n6N2" +
                "/56fdf+boYD/oauR/5accv+anXn/l51+/6iwiP9YYof/YIrP/y12Ef9Qgnf/" +
                "Rl0//01/Jv8wXEr/qLO4/5ungf+VnXr/l6OD/6aulf+Ok2//k5l2/5+ifv9U" +
                "RjL/dm1P/2p1S/87cCL/YIhb/0qEUv9TmFT/Vjs8/yAFAP9xbWz/pK+e/5am" +
                "kf+ns6n/maGD/5adff+SmoH/qK2O/2BZQf9HoT//OkkQ/1A8N/9ARB3/NZI6" +
                "/yeJIv+4zML/t8Ow/6iyqf+puav/prKk/5ehiP+SmXr/nKGG/52liv9iX0H/" +
                "IwAA/yYAAP8kAAD/JAAA/yQAAP8uAgj/yc3A/5+olP+jqqD/oq+Y/56kif+V" +
                "pIv/laGL/5+rm/+gq5b/hY9w/0dFE/80Gwz/JQQA/yYAAP8kAAD/NB0j/6aw" +
                "kf+Pm4D/k5+A/5Wbf/+ao4v/naeU/6CpnP+krp//p7Sq/7HAsf9yd0H/S0wT" +
                "/zwoAP8pFQD/IQsA/5qdm/+hqpf/jZl9/4yXdv+OlHL/j5x+/56vpP+jsKT/" +
                "nKaX/6Cvo/+XpJn/nq6e/5mhjv+TnYH/jZh4/5iojv+Yoob/m59//5GYgP+R" +
                "nH3/lpyC/5eegv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            link.rel = "shortcut icon";
            link.type = "image/x-icon";
            head.appendChild(link);
        },

        addCustomCSS: function() {
            var log = new Logger("CPageView.addCustomCSS");

            var cssCode =
                // Делает широким поле редактирования сообщения
                "#contentBBCode textarea {" +
                    "width: 100%;}" +
                // Подчёрквает синим пунктиром ссылки в в подписях и уменьшает их шрифт
                ".signature a {" +
                    "font-size: 11px !important;" +
                    "text-decoration: none !important;" +
                    "border-bottom: 1px dashed blue;}" +
                // Отменяет подчёркивание и пр. в ссылках в подписях, оставляя только пунктир
                ".signature a * {" +
                    "text-decoration: none !important;}" +
                // Подчёрквает ссылки в цитатах
                ".quote a {" +
                    "text-decoration: underline !important;" +
                    "color: blue !important;}" +
                // Запрет подчёркивания ссылок в заголовках вложенных цитат
                ".quoteheader a {" +
                    "text-decoration: none !important;" +
                    "color: black !important;}" +
                // Подчёркивание ссылок в заголовках цитат при наведении на них курсора мыши
                ".quoteheader a:hover {" +
                    "text-decoration: underline !important;" +
                    "color: blue !important;}" +
                // Стили меню
                "table.york_menu {" +
                    "position: absolute;" +
                    "padding: 6px 15px 0px 15px !important;}" +
                "table.york_menu td {" +
                    "padding: 0px 2px 0px 2px !important;}" +
                "div.york_menu {" +
                    "padding: 0px 8px 1px 12px !important;" +
                    "margin-bottom: 4px !important;}" +
                ".york_scriptMenu {"+
                    "padding-left: 0px;" +
                    "padding-top: 2px;" +
                    "padding-bottom: -2px;" +
                    "margin-top: 0px;" +
                    "margin-bottom: 0px;" +
                    "text-align: right; }"+
                ".york_scriptMenu li {"+
                    "margin-left: 9px;"+
                    "display: inline; }"+
                ".york_scriptMenu li a {"+
                    "color: black;"+
                    "text-decoration: none; }"+
                // Выделение ссылок на модераторов в списке пользователей на главной странице
                "a.york_moderator {" +
                    "font-weight: bold !important; }" +
                "a.york_avanturist {" +
                    "font-weight: bold !important;" +
                    "font-size: 14px !important;" +
                    "color: green !important; }" +
                "a.york_moderator:hover, a.york_avanturist:hover {" +
                    "text-decoration: underline !important;" +
                    "color: blue !important; }" +
                // Набор стилей для свёрнутых сообщений
                ".message_hidden_york {" +
                    "border: 1px solid #3C61A4;" +
                    "background-color: #d5d5ea !important; }" +
                ".message_hidden_york td {" +
                    "background-color: #e8e8ff !important; }" +
                ".message_hidden_york .ga_message_expert_vote_rate {" +
                    "float: right; }" +
                // Запрещаю подчёркивание моих ссылок
                "a[ctrl_idx], a[board_idx] {" +
                    "text-decoration: none !important; }" +
                // Чекбокс в заголовках разделов на 1-й странице
                ".board label span {" +  //".boardTable label span {" +
                    "display: inline-block;" +
                    "width: 3px;" +
                    "height: 3px;" +
                    "padding: 0px;" +
                    "margin-left: 2px;" +
                    "margin-right: 4px;" +
                    "margin-bottom: 0px;" +
                    "outline: 1px solid black;" +
                    "border: 1px solid white; }" +
                ".cbHideUnchecked {" +
                    "background-color: white; }" +
                ".cbHideChecked {" +
                    "background-color: black; }" +
                ".boardTable small label {" +
                    "position: absolute; }" +
                "";
            if (isChrome) {
                cssCode +=
                    // Исправляю позиционирование label в Chrome
                    ".boardTable small {" +
                        "position: relative; }" +
                    ".boardTable small label {" +
                        "white-space: nowrap;" +
                        "position: absolute; }" +
                    "";
            }
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = cssCode;
            } else {
                styleElement.appendChild(document.createTextNode(cssCode));
            }
            document.getElementsByTagName("head")[0].appendChild(styleElement);
        },

        addScriptVersion: function() {
            var log = new Logger("CPageView.addScriptVersion");

            // Нахожу BR после строки "SMF © 2006, Simple Machines LLC"
            var br = $x1(XPathHelper.brCopyright);
            if (null == br) {
                log.error("BR wasn't found");
                return;
            }

            var span = document.createElement("SPAN");
            var href = document.createElement("A");
            href.href = "/forum/index.php/topic,196.html";
            href.innerHTML =
                // Патч к
                "\u041f\u0430\u0442\u0447 \u043a " +
                // форуму
                "\u0444\u043e\u0440\u0443\u043c\u0443 v" + scriptVersion +
                // от
                " \u043e\u0442 " + scriptDate;
            // Делаю так, чтобы ссылка отличалась от соседних с ней
            href.style.fontWeight = "normal";
            href.style.color = "#666666";
            // Чтобы всё же хоть как-то выделить ссылку делаю её подчёркнутой
            //href.style.textDecoration = "underline";

            span.appendChild(document.createTextNode(" | "));
            span.appendChild(href);
            br.parentNode.insertBefore(span, br);
        },

        addEditButtons: function() {
            var log = new Logger("CPageView.addEditButtons");

            // Используется в обработчиках событий от кнопок
            this.textArea  = $x1(XPathHelper.textareaMessage, $id("form-field-widget-contentBBCode"));
            if (this.textArea == null) {
                log.error("the text area wasn't found");
                return;
            }
			/*
            var br = $x1(XPathHelper.brToolbar, $id("form-field-widget-contentBBCode"));
            if (br == null) {
                log.error("<br> in the buttons cell wasn't found");
                return;
            }

            var td = br.parentNode;
            td.removeChild(br); */
			td = $x1(XPathHelper.Toolbar);
			
            // Ищем картинку разделитель, если находим, то добавляем разделитель
            for (var i = 0; i < td.childNodes.length; ++i) {
                var child = td.childNodes[i].firstChild;
                if (child!=null && child.tagName != null && child.tagName == "IMG") {
                    td.appendChild(child.cloneNode(true));
                    td.appendChild(document.createTextNode(" "));
                    break;
                }
            }

            // Форматировать таблицу
            this.btnFormatTable = this.createButton("/forum/Themes/default/images/bbc/flash.gif",
                "\u0424\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c " +
                "\u0442\u0430\u0431\u043b\u0438\u0446\u0443");
            td.appendChild(this.btnFormatTable);

            // Код
            this.btnPre = this.createButton("/forum/Themes/default/images/bbc/code.gif",
                "\u041a\u043e\u0434");
            td.appendChild(this.btnPre);

            // Вставить URL
            this.btnUrl = this.createButton("/forum/Themes/default/images/bbc/url.gif",
                "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c URL");
            td.appendChild(this.btnUrl);

            // Цитата
            this.btnQuote = this.createButton("/forum/Themes/default/images/bbc/quote.gif",
                "\u0426\u0438\u0442\u0430\u0442\u0430");
            td.appendChild(this.btnQuote);
        },

        removeHideMessageOptions: function() {
            var log = new Logger("CPageView.removeHideMessageOptions");

            var select = $x1(XPathHelper.selectAutoHide, $id("postmodify"));
            if (select != null) {
                for (var i = select.length - 1; 0 <= i; --i) {
                    var option = select.options[i];
                    if (option.value.indexOf("Hide") != -1) {
                        select.remove(i);
                    }
                }
            } else {
                log.error("select wasn't found");
            }
        },

        highlightModerators: function() {
			return; // это не сильно нужно
            var log = new Logger("CPageView.highlightModerators");

            // Составляю список модераторов
            var snapshot = $x(XPathHelper.smallModerators);
            log.trace("Number of found SMALL tags: " + snapshot.snapshotLength);
            var reModerators = /^[^:]+:\s*(.*)/;
            var reComma = /,\s/g;
            // Для простоты, храню модераторов в виде строки
            // ConstB нет в списках модераторов, поэтому его добавляю принудительно
            var moderators = ",ConstB,";
            for (var i = 0; i < snapshot.snapshotLength; ++i) {
                var small = snapshot.snapshotItem(i);
                var strModerators = small.innerHTML;
                // Модераторы
                var a = reModerators.exec(strModerators);
                if (a == null) {
                    continue;
                }
                strModerators = a[1];
                strModerators = strModerators.replace(reComma, ",");
                moderators += strModerators + ",";
            }
            log.trace("Moderator list: " + moderators);

            // Нахожу модераторов в списке текущих пользователей
            snapshot = $x(XPathHelper.aUsersOnline);
            log.trace("Number of found users: " + snapshot.snapshotLength);
            for (var i = 0; i < snapshot.snapshotLength; ++i) {
                var userA = snapshot.snapshotItem(i);
                if (moderators.indexOf("," + userA.innerHTML + ",") > 0) {
                    log.trace("Moderator: " + userA.innerHTML);
                    userA.className += " york_moderator";
                } else if (userA.innerHTML == "avanturist" && userA.href.indexOf("u=3") != -1) {
                    log.trace("Avanturist is online!");
                    userA.className += " york_avanturist";
                }
            }
        }
    }



    // ****************************************************************************
    // ********************************** App *************************************
    // ****************************************************************************


    app = {
        controllers: new Array(),

        /**
         * @constructor
         */
        run: function() {
            var log = new Logger("app.run");

            this.hotKeys = new Array();
            document.addEventListener("keydown", app.keyPressed, false);

            this.pageController = new CPageController();

            var isForumPage = false;
            var isTopic = false;
            if (/(avanturist.org|glav.su).forum.[0-9].+(message|offset).(new|[0-9]|last).+/.test(url)){ // || /forum\/topic\/\d+/.test(url)) 
                isForumPage = true;
                isTopic = true;
                handleTopicPage();
            } else if (/(avanturist.org|glav.su).forum.[0-9]/.test(url)) {
                isForumPage = true;
                handleBoardPage();
            } else if (/\/forum\//.test(url)) {
                isForumPage = true;
                if ((!url.contains("reply")&&(!url.contains("message/add/")))&&(null != $x1(XPathHelper.tableBoardTable))) {
                    handleForumMainPage();
                } else {
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
            var log = new Logger("app.actionHandler");

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
                log.error("Controller index wasn't found. Event: type = " + e.type + ", src = " + src);
                return true;
            }

            var controller = app.controllers[parseInt(controllerIdx)];
            if (controller != null) {
                var res;
                var handler = src.getAttribute("ctrl_handler");
                if (handler) {
                    res = controller[handler](src, e);
                } else {
                    res = controller.handle(src, e);
                }
                if (!res) {
                    e.returnValue = false;
                    if (typeof e.preventDefault != "undefined") {
                        e.preventDefault();
                    }
                }
                return res;
            } else {
                log.error("Controller wasn't found. Event: type = " + e.type + ", src = " + src + ", controllerIdx = " + controllerIdx);
                return true;
            }
        },

        addEventListener: function(element, type, controller, handler) {
            var log = new Logger("app.addEventListener", controller.idx);

            element.setAttribute("ctrl_idx", controller.idx);
            if (handler) {
                element.setAttribute("ctrl_handler", handler);
            }
            element.addEventListener(type, app.actionHandler, false);
        },

        keyPressed: function(e) {
            var log = new Logger("app.keyPressed");

            e = e || window.event;
            var keyCode = e.which || e.keyCode;
            var hotKey = "";
            hotKey += e.altKey   ? "alt+"   : "";
            hotKey += e.ctrlKey  ? "ctrl+"  : "";
            hotKey += e.shiftKey ? "shift+" : "";
            hotKey += keyCode;
            log.trace("Hot key: " + hotKey);

            var ctrls = app.hotKeys[hotKey];
            if (null != ctrls) {
                log.trace("Controllers count: " + ctrls.length);
                for (var i = 0; i < ctrls.length; ++i) {
                    ctrls[i].handleHotKey(hotKey);
                }
                return false;
            }

            return true;
        },

        /**
         * @constructor
         */
        addHotKey: function(hotKey, controller) {
            var log = new Logger("app.addHotKey", hotKey);

            var hotKeyLower = hotKey.toLowerCase();
            var ctrls = this.hotKeys[hotKeyLower];
            if (ctrls == null) {
                ctrls = new Array();
                this.hotKeys[hotKeyLower] = ctrls;
            }
            ctrls.push(controller);
        }
    };


    // ****************************************************************************
    // ********************************* START ************************************
    // ****************************************************************************


    app.run();

    var end = new Date();
    log.trace("END: " + end);
    log.trace("SCRIPT TOOK " + (end.getTime() - start.getTime()) + " ms");
    log.trace("NUMBER OF XPATH QUERIES: " + xpathCounter);
}

var log = new Logger("GLOBAL", url);

log.trace("User-Agent: " + userAgent);
log.trace("Opera/Firefox/Chrome = " + isOpera + "/" + isFirefox + "/" + isChrome);


// В первую очередь эта проверка нужна для Opera, когда скрипт установлен как
// обычный userjs без эмуляции GreaseMonkey. В этом случае скрипт запускается на
// всех сайтах. См. примечание в начале скрипта.
if (/^https?:\/\/(www\.)?(avanturist.org|glav.su)(\/|\?|$)/.test(url)) {
    if (isOpera) {
        // TODO оптимизация загрузки страниц архива, улучшить код, написать такую же для журнала
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
    }

    if (isOpera) {
        if (document.readyState == "complete") {
            // На случай, если эмулируется GreaseMonkey (см. примечание в начале)
            log.trace("Opera. Document has loaded. Calling onLoad()");
            onLoad();
        } else if (typeof(opera.version) == "function" && opera.version() >= 9) {
            log.trace("Opera 9.x. Subscribing on the DOMContentLoaded event");
            document.addEventListener("DOMContentLoaded", onLoad, false);
        } else {
            log.trace("Opera older then 9.0. Subscribing on the load event");
            document.addEventListener('load', onLoad, false);
        }
    } else {
        log.trace("Firefox or Chrome. Calling onLoad()");
        onLoad();
    }
} else {
    log.trace(url + " - isn't avanturist.org. Do nothing.");
}

})();
