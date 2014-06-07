// ==UserScript==
// @name          RSDN Monkey
// @namespace     http://www.rsdn.ru
// @description   RSDN Monkey
// @include       http://www.rsdn.ru/Forum/*
// @include       http://www.rsdn.ru/forum/*
// ==/UserScript==

/* Search for !!!CONFIG!!! through the file to midify some of the behaviour. */

//
// VIM Rules :)
//
// Some bindings (OMG!) aimed to help editing inline styles/javascript.
//
// nmap \as mx[*j0my]*k$mz:'y,'zs/\\/\\\\/ge<CR>:'y,'zs/"/\\"/ge<CR>:'y,'zs/^/" /<CR>:'y,'zs/$/\=repeat(' ',140)<CR>:'y,'zs/\%140v.*/\\n" +/<CR>:noh<CR>`x
//    This binding wraps all text between two /* */ comments into JS string. Be sure to place cursor
//    somwhere between those comments first.
//    Example:
//       /* begin */
//       first line
//       second line
//       /* end */
//
//       becomes
//       /* begin */
//       " first line     \n" +
//       " second line    \n" +
//       /* end */
//
// nmap \aa mx[*j0my]*k$mz:'y,'zs/^" //<CR>:'y,'zs/\s*\\n" +$//<CR>:'y,'zs/\\"/"/ge<CR>:'y,'zs/\\\\/\\/ge<CR>:noh<CR>`x
//    This binding does the reverse thing of above binding. I.e. it unwraps JS strings into regular lines.
//

/**************************************************************************************************/
/*                            COMMON FUNCTIONS                                                    */
/**************************************************************************************************/
function common_funcs()
{ /* Begin common functions */

/* !!!CONFIG!!! */
/* Set your RSDN user id here. Leaving this zero will result in displaying rating for <Anonymous>. */
window.userID = 0;
window.onresize = null;

function XPQuerySingle(query, context)
{
    return document.evaluate(query, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function XPQueryOrdered(query, context)
{
    return document.evaluate(query, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function N(name, prop)
{
    var e = document.createElement(name);

    for (var key in prop) e.setAttribute(key, prop[key]);

    for (var i = 2; i < arguments.length; ++i)
    {
        append(e, arguments[i]);
    }

    return e;
}

function T(text)
{
    return document.createTextNode(text);
}

function injectCSS(css)
{
    return append(document.getElementsByTagName("head")[0] || append(document.documentElement, N("head")),
                  N("style", {type: "text/css"}, T(css)));
}

function firstElementChild(e)
{
    var elem = e.firstChild;
    return elem && elem.nodeType != elem.ELEMENT_NODE ? nextElementSibling(elem) : elem;
}

function nextElementSibling(e)
{
    var elem = e;
    while ((elem = elem.nextSibling) && elem && elem.nodeType != elem.ELEMENT_NODE) ;

    return elem;
}

function removeSelf(e)
{
    e && e.parentNode && e.parentNode.removeChild(e);
    return e;
}

function foreach(c, f)
{
    var i = c.firstChild;
    var next = i ? i.nextSibling : null;
    while (i)
    {
        f(i);
        i = next;
        next = i ? i.nextSibling : null;
    }
}

function transferChildren(newParent, oldParent, filterFunc)
{
    foreach(oldParent,
        function (e) {
            if (!filterFunc || filterFunc(e))
                append(newParent, e);
        }
    );
}

function append(p, c)
{
    return p && c && p.appendChild(c);
}

function classOf(e)
{
    return e.getAttribute("class");
}

function absoluteLeft(e)
{
    var left = 0;

    while(e)
    {
        left += e.offsetLeft;
        e = e.offsetParent;
    }

    return left;
}

function absoluteTop(e)
{
    var top = 0;

    while(e)
    {
        top += e.offsetTop;
        e = e.offsetParent;
    }

    return top;
}

function positionLeft(e, width)
{
    var initialLeft = absoluteLeft(e);
    var adjustedLeft = document.documentElement.clientWidth - width;

    return Math.max(0, Math.min(initialLeft, adjustedLeft));
}

function positionTop(e, height)
{
    var initialTop = absoluteTop(e) + e.offsetHeight;
    var adjustedTop = document.documentElement.clientHeight - height;

    return Math.max(0, Math.min(initialTop, adjustedTop));
}

function openDB()
{
    var db;
    var request = mozIndexedDB.open("ReadMessages");

    request.onsuccess = function(event)
    {
        db = request.result;
    };

    if (!db) return null;

    if (db.version != "1.0") {
        var request = db.setVersion("1.0");
        request.onerror = function(event) {
          // Handle errors.
        };
        request.onsuccess = function(event) {
          // Set up the database structure here!
        };
    }

    try
    {
        db = google.gears.factory.create("beta.database");

        db.open("messages");
        db.execute("CREATE TABLE IF NOT EXISTS Messages (tid int, mid int)");
        db.execute("CREATE UNIQUE INDEX IF NOT EXISTS midx ON Messages (tid, mid)");
    }
    catch(ex)
    {
        return null;
    }

    return db;
}

function getReadMsgsCount(db, tid)
{
    var cnt = 0;

    try
    {
        var rs = db.execute("SELECT COUNT(*) FROM Messages WHERE tid=?", [tid]);
        rs.isValidRow() && (cnt = parseInt(rs.field(0)));
        rs.close();
    }
    catch(ex) {}

    return cnt;
}

function getLastReadMsg(db, tid)
{
    var lastRead = 0;

    try
    {
        var rs = db.execute("SELECT MAX(mid) FROM Messages WHERE tid=?", [tid]);
        rs.isValidRow() && (lastRead = parseInt(rs.field(0) || "0"));
        rs.close();
    }
    catch(ex) {}

    return lastRead;
}

function insertMessage(db, tid, mid)
{
    try
    {
        db.execute("INSERT OR REPLACE INTO Messages VALUES (?, ?)", [tid, mid]);
    }
    catch(ex) {}
}

function dropStylesheets()
{
    var stylesheets = document.styleSheets;

    for (var i = 0; i < stylesheets.length; i++)
    {
        stylesheets[i].disabled = true;
    }
}

function toggleDisplay(e)
{
    e.style.display = e.style.display == "none" ? "" : "none";
}

} /* End common functions */


/**************************************************************************************************/
/*                            LIST COMMON FUNCTIONS                                               */
/**************************************************************************************************/

function list_common()
{ /* Begin list common */

/* !!!CONFIG!!! */
/* Common CSS for msg list, rating list and answers list. */
/* Keep in mind that RSDN sets quirks mode, so table doesn't inherit body styles. */

var listCSS =
/* BEGIN CSS */
" body                 { display: block ! important; font-family: verdana; padding: 5px; font-size: 10pt; }                                \n" +
" table                { font-family: verdana; font-size: 10pt; background-color: #cfe5f0; }                                               \n" +
"                                                                                                                                          \n" +
" a:link               { text-decoration: none; color: #000000; }                                                                          \n" +
" a:visited            { text-decoration: none; color: #000000; }                                                                          \n" +
" a:hover              { text-decoration: underline; color: #000000; }                                                                     \n" +
"                                                                                                                                          \n" +
" img                  { border-width: 0px; }                                                                                              \n" +
"                                                                                                                                          \n" +
" td                   { padding: 1pt 2pt 1pt 2pt; }                                                                                       \n" +
" .odd                 { background-color: #f0f8ff; }                                                                                      \n" +
" .even                { background-color: #f7f7ff; }                                                                                      \n" +
"                                                                                                                                          \n" +
" div.toolbar          { background-color: #f0f8ff; padding: 3pt; margin-bottom: 1pt; }                                                    \n" +
" div.forum_list_entry { padding: 1pt 2pt 1pt 2pt; margin: 1px 0px 0px 10pt; }                                                             \n" +
" div.forum_list       { background-color: #cfe5f0; padding: 0pt; margin-bottom: 1px; }                                                    \n" +
" a.unread             { font-weight: bold; }                                                                                              \n" +
/* END CSS*/
"";

function toggleToolbar(evt)
{
    evt.preventDefault();
    toggleDisplay(document.getElementById("forum_list"));
}

function createToolBar(gid, isForum)
{
/* !!!CONFIG!!! */
/* Forum List. Comment out unneeded entries, reorder as desired. */

    var forums =
    [
    { gid: 53 , name: "dotnet.gui"          , caption: ".NET GUI" },
    { gid: 8  , name: "dotnet"              , caption: ".NET" },
    { gid: 65 , name: "gdn.aspnet"          , caption: "ASP.NET [GDN]" },
    { gid: 25 , name: "dotnet.web"          , caption: "ASP.NET" },
    { gid: 7  , name: "atl"                 , caption: "ATL/WTL" },
    { gid: 56 , name: "prj.rfd"             , caption: "Business Logic Toolkit" },
    { gid: 9  , name: "cpp"                 , caption: "C/C++" },
    { gid: 73 , name: "cpp.applied"         , caption: "C/C++. Прикладные вопросы" },
    { gid: 4  , name: "com"                 , caption: "COM/DCOM/ActiveX" },
    { gid: 91 , name: "life.cook"           , caption: "CookBook" },
    { gid: 16 , name: "delphi"              , caption: "Delphi & Builder" },
    { gid: 35 , name: "faq"                 , caption: "FAQ" },
    { gid: 41 , name: "info"                , caption: "Info" },
    { gid: 10 , name: "java"                , caption: "Java" },
    { gid: 5  , name: "mfc"                 , caption: "MFC" },
    { gid: 86 , name: "prj.SharedLibraries" , caption: "MetaCommunication Open Source Libraries" },
    { gid: 95 , name: "nemerle"             , caption: "Nemerle" },
    { gid: 60 , name: "prj.phoenix"         , caption: "Phoenix" },
    { gid: 57 , name: "prj.rsharp"          , caption: "R#" },
    { gid: 54 , name: "dotnet.usergroup"    , caption: "RSDN .NET UserGroup" },
    { gid: 49 , name: "bench"               , caption: "RSDN Bench" },
    { gid: 20 , name: "mag"                 , caption: "RSDN Magazine" },
    { gid: 32 , name: "nntp"                , caption: "RSDN NNTP Server" },
    { gid: 81 , name: "prj.rsdn.editor"     , caption: "RSDN.Editor" },
    { gid: 30 , name: "janus"               , caption: "RSDN@Home" },
    { gid: 40 , name: "shareware"           , caption: "Shareware и бизнес" },
    { gid: 22 , name: "unix"                , caption: "Unix" },
    { gid: 21 , name: "vb"                  , caption: "Visual Basic" },
    { gid: 75 , name: "gdn.vs2005"          , caption: "Visual Studio 2005 [GDN]" },
    { gid: 3  , name: "winapi"              , caption: "WIN API" },
    { gid: 68 , name: "gdn.winforms"        , caption: "WinForms [GDN]" },
    { gid: 14 , name: "xml"                 , caption: "XML/SOAP" },
    { gid: 43 , name: "test"                , caption: "test" },
    { gid: 62 , name: "test2"               , caption: "test2" },
    { gid: 15 , name: "alg"                 , caption: "Алгоритмы" },
    { gid: 17 , name: "design"              , caption: "Архитектура программного обеспечения" },
    { gid: 6  , name: "db"                  , caption: "Базы данных" },
    { gid: 12 , name: "web"                 , caption: "Веб программирование" },
    { gid: 55 , name: "prj.grid"            , caption: "Виртуальный грид" },
    { gid: 44 , name: "reports"             , caption: "Генератор отчетов" },
    { gid: 74 , name: "decl"                , caption: "Декларативное программирование" },
    { gid: 63 , name: "hardware"            , caption: "Железо" },
    { gid: 24 , name: "setup"               , caption: "Инсталляция, администрирование, поддержка" },
    { gid: 90 , name: "jetbrains"           , caption: "Инструменты JetBrains для .NET" },
    { gid: 87 , name: "prj.nemerle"         , caption: "Интеграция Nemerle и Visual Studio" },
    { gid: 29 , name: "src"                 , caption: "Исходники" },
    { gid: 93 , name: "job.search"          , caption: "Ищу работу" },
    { gid: 33 , name: "humour"              , caption: "Коллеги, улыбнитесь" },
    { gid: 83 , name: "flame.comp"          , caption: "Компьютерные священные войны" },
    { gid: 45 , name: "pda"                 , caption: "Мобильные устройства" },
    { gid: 19 , name: "media"               , caption: "Мультимедиа, графика, звук" },
    { gid: 26 , name: "asm"                 , caption: "Низкоуровневое программирование" },
    { gid: 31 , name: "news"                , caption: "Новости" },
    { gid: 34 , name: "life"                , caption: "О жизни" },
    { gid: 13 , name: "job"                 , caption: "О работе" },
    { gid: 85 , name: "education"           , caption: "Образование и наука" },
    { gid: 1  , name: "rsdn"                , caption: "Обсуждение сайта" },
    { gid: 69 , name: "gdn.common"          , caption: "Общий форум [GDN]" },
    { gid: 52 , name: "prj"                 , caption: "Открытые проекты" },
    { gid: 84 , name: "flame.politics"      , caption: "Политика" },
    { gid: 78 , name: "usability"           , caption: "Пользовательский интерфейс: проектирование, usability" },
    { gid: 61 , name: "dictionary"          , caption: "Проблемы перевода" },
    { gid: 94 , name: "htmlayout"           , caption: "Продукты TerraInformatica" },
    { gid: 80 , name: "prj.entropy"         , caption: "Проект Entropy" },
    { gid: 18 , name: "other"               , caption: "Прочее" },
    { gid: 92 , name: "job.offers.ea"       , caption: "Работа — предложения от кадровых агентств" },
    { gid: 59 , name: "job.offers"          , caption: "Работа — предложения работы от прямых работодателей" },
    { gid: 42 , name: "game"                , caption: "Разработка игр" },
    { gid: 98 , name: "rsdn.dev"            , caption: "Разработка сайта" },
    { gid: 48 , name: "flame"               , caption: "Священные войны" },
    { gid: 11 , name: "network"             , caption: "Сети, сокеты, протоколы" },
    { gid: 28 , name: "tools"               , caption: "Средства разработки" },
    { gid: 72 , name: "apptesting"          , caption: "Тестирование приложений" },
    { gid: 76 , name: "management"          , caption: "Управление проектами" },
    { gid: 27 , name: "philosophy"          , caption: "Философия программирования" },
    { gid: 71 , name: "gdn.ask.ms"          , caption: "Чаты на GotDotNet [GDN]" },
    { gid: 37 , name: "etude"               , caption: "Этюды для программистов" },
    { gid: 99 , name: "dynamic"             , caption: "Языки с динамической типизацией" }
    ];

    var container = document.createDocumentFragment();

    var refr = N("a", {href: window.location.href, target: "_self", title: "Обновить"},
                   N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/refresh.png"}));

    var list = N("a", {href: "#", title: "Список форумов"},
                   N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/open%20alt.png"}));

    var rate = N("a", {href: "/Forum/RateList.aspx?uid=" + window.userID + "&process=1", target: "_self", title: "Оценки мне"},
                   N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/cash.png"}));

    var answ = N("a", {href: "/Forum/Private/Answers.aspx?ans=1&process=1", target: "_self", title: "Ответы мне"},
                   N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/unread%20mail.png"}));

    var newMsg = N("a", {target: "_blank", href: "/Forum/NewMsg.aspx?gid=" + gid, title: "Создать топик"},
                     N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/new%20mail.png"}));

    var search = N("a", {target: "_blank", href: "http://img.meta.ua/rsdnsearch/" + (gid ? "?group=" + gid : ""), title: "Поиск"},
                     N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/search.png"}));

    list.addEventListener("click", toggleToolbar, false);

    var div;

    div = append(container, N("div", {class: "toolbar"}));

           append(div, refr)   && append(div, T(" "));
           append(div, list)   && append(div, T(" "));
           append(div, answ)   && append(div, T(" "));
           append(div, rate)   && append(div, T(" "));
    gid && append(div, newMsg) && append(div, T(" "));
           append(div, search) && append(div, T(" "));

    div = append(container, N("div", {class: "forum_list", id: "forum_list"}));
    div.style.display = "none";

    for (var i = 0; i < forums.length; ++i)
    {
        append(div, N("div", {class: "forum_list_entry " + (i % 2 ? "odd" : "even")},
                        N("a", {href: "/forum/MsgList.aspx?flat=1&group=" + forums[i].name, target: "_self"},
                            T(forums[i].caption))));
    }

    return container;
}

} /* End list common */


/**************************************************************************************************/
/*                            MESSAGE LIST MAIN                                                   */
/**************************************************************************************************/

function msglist_main()
{
    dropStylesheets();

    var forumName = XPQuerySingle(".//form[1]/div[1]/b/text()", document.body);
    var gid;

    try
    {
        gid = parseInt(XPQuerySingle(".//form[1]/div[1]/a[4]", document.body).getAttribute("href").match(/gid=(\d+)/)[1]);
    }
    catch(ex)
    {
        gid = 0;
    }

    var tbl = document.getElementById("tbl");
    tbl.setAttribute("style", "");
    tbl.setAttribute("width", "100%");
    tbl.setAttribute("cellspacing", "1");
    tbl.setAttribute("cellpadding", "0");

    removeSelf(document.body);

    var newBody = N("body");

    append(newBody, createToolBar(gid));
    append(newBody, tbl);

    var messageList = firstElementChild(tbl);

    tbl.insertBefore(N("tbody", {},
                         N("tr", {class: "forum_name"},
                             N("td", {class: "forum_name", colspan: "3"}, forumName))),
                     messageList);

    var rows = messageList.getElementsByTagName("tr");
    removeSelf(rows[0]);
    removeSelf(rows[rows.length - 1]);

    var odd = false;
    var db = openDB();

    for (var i = 0; i < rows.length; ++i)
    {
        var row = rows[i];

        var imgTD = firstElementChild(row);
        var threadTD = nextElementSibling(imgTD);
        removeSelf(nextElementSibling(threadTD));  // drop author column
        removeSelf(nextElementSibling(threadTD));  // drop rating column
        var cntTD = nextElementSibling(threadTD);
        removeSelf(nextElementSibling(cntTD));     // drop date column
        removeSelf(nextElementSibling(cntTD));     // drop author column

        row.setAttribute("class", odd ? "odd" : "even");
        odd = !odd;

        var threadB = removeSelf(firstElementChild(threadTD));
        var threadHref = firstElementChild(threadB);
        threadTD.insertBefore(threadHref, threadTD.firstChild);
        var threadHrefAddr = threadHref.getAttribute("href");
        var tid = parseInt(threadHrefAddr.match(/\d+/)[0]);

        var totalCnt = parseInt(cntTD.textContent) + 1;
        var dbCnt = getReadMsgsCount(db, tid);

        var imgHref = firstElementChild(imgTD);

        if (totalCnt == dbCnt)
        {
            removeSelf(imgHref);
        }
        else
        {
            var img = firstElementChild(imgHref);
            img.setAttribute("src", "http://files.rsdn.ru/37641/16-circle-blue.png");
            append(imgTD, img);
            removeSelf(imgHref);

            if (dbCnt == 0)
            {
                threadHref.setAttribute("class", "unread");
            }
        }

        var lastPage = XPQuerySingle(".//nobr/small/a[last()]/text()", threadTD);
        var page = 1;
        var msgsPerPage = 0;

        if (lastPage)
        {
            var supportedMsgNum = [10, 20, 30, 50, 100];
            lastPage = parseInt(lastPage.nodeValue);

            msgsPerPage = 0;

            for (var j = 0; j < supportedMsgNum.length; ++j)
            {
                if (totalCnt <= lastPage * supportedMsgNum[j])
                {
                    msgsPerPage = supportedMsgNum[j];
                    break;
                }
            }

            page = Math.ceil((dbCnt + 1) / msgsPerPage);
        }

        threadHrefAddr = threadHrefAddr.replace(/\d+\.flat/, tid + ".flat." + page);
        threadHref.setAttribute("href", threadHrefAddr);

        threadHref.addEventListener("click",
            function markAsRead(evt)
            {
                this.setAttribute("class", "");
                removeSelf(firstElementChild(firstElementChild(this.parentNode.parentNode)));
            }
            , false);

    }

    db && db.close();

    append(document.documentElement, newBody);

    injectCSS(listCSS);

}

/**************************************************************************************************/
/*                            RATING AND ANSWERS MAIN                                             */
/**************************************************************************************************/

function rate_and_answers_main()
{
    var isRateList = window.location.href.match(/http:\/\/www\.rsdn\.ru\/forum\/ratelist\.aspx/i) != null;
    dropStylesheets();

    var tbl = document.getElementById("tbl");
    tbl.setAttribute("style", "");
    tbl.setAttribute("width", "100%");
    tbl.setAttribute("cellspacing", "1");
    tbl.setAttribute("cellpadding", "0");

    removeSelf(document.body);

    var newBody = N("body");

    append(newBody, createToolBar(0));
    append(newBody, tbl);

    var messageList = firstElementChild(tbl);

    tbl.insertBefore(N("tbody", {},
                         N("tr", {class: "forum_name"},
                             N("td", {class: "forum_name", colspan: "3"},
                                 T(isRateList ? "Оценки мне" : "Ответы мне")))),
                     messageList);

    var rows = messageList.getElementsByTagName("tr");
    removeSelf(rows[0]);
    removeSelf(rows[rows.length - 1]);

    var odd = false;

    for (var i = 0; i < rows.length; ++i)
    {
        var row = rows[i];

        var imgTD = firstElementChild(row);
        var threadTD = nextElementSibling(imgTD);
        var rateTD = nextElementSibling(threadTD);
        var authorTD = nextElementSibling(rateTD);

        removeSelf(imgTD);
        !isRateList && removeSelf(rateTD);

        var td;
        while (td = nextElementSibling(authorTD)) removeSelf(td);
        removeSelf(authorTD);

        row.setAttribute("class", odd ? "odd" : "even");
        odd = !odd;

        var threadHref = firstElementChild(threadTD);
        threadHref.setAttribute("style", "");
    }

    append(document.documentElement, newBody);

    injectCSS(listCSS);
}

/**************************************************************************************************/
/*                            MESSAGES VIEW FUNCTIONS                                             */
/**************************************************************************************************/

function msgview_funcs()
{ /* Begin MsgView fucntions */

function showQuote(evt)
{
    var e = document.getElementById("quote_" + this.getAttribute("quoteID"));
    toggleDisplay(e);
    toggleDisplay(this);
}

function closeFrame()
{
    if (window.currentFrame)
    {
        document.body.removeChild(window.currentFrame);
        window.currentFrame = null;
    }
}

function showFrame(evt) {
    link = this;
    evt.preventDefault();

    closeFrame();

    var div = N("div", {class: "popup"},
                  N("iframe", {class: "popup", frameborder: "no", hspace: 0, vspace: 0, src: this.href}));

    div.style.left = "0px";
    div.style.top = "0px";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    div.style.left = positionLeft(link, div.offsetWidth) + "px";
    div.style.top = positionTop(link, div.offsetHeight) + "px";
    div.style.visibility = "visible";

    window.currentFrame = div;
}

function toggleButtons(evt) {
    evt.preventDefault();

    var buttons = document.getElementById(this.getAttribute("buttons_id"));
    buttons.style.display = buttons.style.display == "none" ? "" : "none";
}

} /* End MsgView fucntions */

/**************************************************************************************************/
/*                            MESSAGES VIEW MAIN                                                  */
/**************************************************************************************************/

function msgview_main()
{ /* Begin MsgView main() */

/* !!!CONFIG!!! */
/* Message view CSS. Keep in mind that RSDN sets quirks mode, so table doesn't inherit body styles. */

var msgViewCSS =
/* BEGIN CSS */
" body                 { font-family: verdana; font-size: 10pt; padding: 5px; }                                                            \n" +
" table                { font-family: verdana; font-size: 10pt; }                                                                          \n" +
"                                                                                                                                          \n" +
" a:link               { text-decoration: none; color: #505000; }                                                                          \n" +
" a:visited            { text-decoration: none; color: #909090; }                                                                          \n" +
" a:hover              { text-decoration: underline; color: #B0B0B0; }                                                                     \n" +
"                                                                                                                                          \n" +
" img                  { border-width: 0px; }                                                                                              \n" +
" .tooltip             { display: none; }                                                                                                  \n" +
"                                                                                                                                          \n" +
" div.mod              { margin-top: 2pt; padding: 2pt 5pt 2pt 5pt; font-size: 0.75em; color: #800000;                                     \n" +
"                        background-color: #ffcccc; }                                                                                      \n" +
"                                                                                                                                          \n" +
" a.media              { border-bottom: dotted 1px #505000; text-decoration: none !important;                                              \n" +
"                        background: url(/Forum/Images/tv.gif) no-repeat right top; padding-right: 16px; }                                 \n" +
"                                                                                                                                          \n" +
"                                                                                                                                          \n" +
" table.messages       { width: 100%;  }                                                                                                 \n" +
" tr.message_hdr       { color: #555555; background-color: #cfe5f0; }                                                                      \n" +
" td.message_hdr       { white-space: nowrap; padding: 2px 5px 2px 5px; }                                                                  \n" +
" tr.buttons           { display: none; }                                                                                              \n" +
" td.buttons           { text-align: right; }                                                                                              \n" +
" tr.message           { }                                                                                                                 \n" +
" td.message           { text-align: justify; padding: 5pt; }                                                                              \n" +
" td.rate              { padding: 5pt; vertical-align: top; text-align: left; white-space: nowrap; }                                       \n" +
" td.title             { overflow: hidden; }                                                                                               \n" +
" td.user              { overflow: hidden; text-overflow: ellipsis; max-width: 150px; }                                                    \n" +
" tr.unread_mark       { background-color: #ffa07a; }                                                                                      \n" +
" span.title           { font-weight: bold; }                                                                                              \n" +
"                                                                                                                                          \n" +
" div.quote            { margin: 5pt 5pt 5pt 12pt; padding: 2pt 2pt 2pt 4pt;                                                               \n" +
"                        background-color: #f7f7ff; color: #888888; border-left: double 3px #aaaaaa; }                                     \n" +
" div.signature        { white-space: normal; margin-top: 6pt; padding: 1pt; color: #888888; border-top: solid 1px #aaaaaa; }              \n" +
" pre                  { background-color: #ffffff; color: #111111; padding: 4pt; border: dashed 1px grey;                                 \n" +
"                        font-family: dejavu sans mono; margin: 2pt; white-space: pre-wrap; }                                              \n" +
"                                                                                                                                          \n" +
" div.pager            { margin-top: 4pt; margin-bottom: 4pt; text-align: center; vertical-align: middle;                                  \n" +
"                        padding: 3pt; font-weight: bold; }                                                                                \n" +
" .page                { margin-left:4pt; margin-right: 4pt; border: solid 1px #97cc97; background-color: #cfe5f0;                         \n" +
"                        padding: 2pt; }                                                                                                   \n" +
"                                                                                                                                          \n" +
" img                  { max-width: 500px; }                                                                                               \n" +
" span.kw              { color: #3399ff; font-weight: bold ! important; }                                                                  \n" +
" span.com             { color: #33cc99; font-style: italic; }                                                                             \n" +
" span.str             { color: #cc0099; }                                                                                                 \n" +
"                                                                                                                                          \n" +
" blockquote.bquote    { border: solid 1px grey; padding: 0pt 5pt 0pt 20pt; margin: 2pt; background-color: #ffebcd; }                      \n" +
" p.bquote             { padding: 5pt; background-color:#ffffe0; border-right: dotted 2px grey; margin: 0pt;                               \n" +
"                        border-left: dotted 2px grey; }                                                                                   \n" +
"                                                                                                                                          \n" +
" div.popup            { position: absolute; background-color: #cfe5f0; border: solid 1px #65a7cb; width: 300px; height: 170px;            \n" +
"                        padding: 5px; }                                                                                                   \n" +
"                                                                                                                                          \n" +
" iframe.popup         { width: 300px; height: 170px; }                                                                                    \n" +
/* END CSS */
"";

var origAuthorTemplates =
[
    new RegExp("^\\s*Здравствуйте, (.+?), Вы писали:\\s*", ""), // все нормальные люди :)
    new RegExp("^\\s*Приветствую, (.+?), вы писали:\\s*", ""),  // Sheridan
    new RegExp("^\\s*(.+?) пишет:\\s*", ""),                    // Vzhyk
    new RegExp("^\\s*(.+?) wrote:\\s*", "")                     // der Igel
                                                                // Mamut doesn't say "Hello" :(
];

var quoteID = 1;

function pushQuote(m, quote)
{
    var stack = m.data.quotes;
    var q = decomposeQuote(quote);

    if (stack.length > q.level)
    {
        stack.length = q.level;
    }
    else if (stack.length < q.level)
    {
        for (var i = stack.length; i < q.level; ++i)
        {
            stack.push(N("div"));

            i == 0 && m.data.author.length && append(stack[0], N("b", {}, T(m.data.author + ": ")));

            if (i == 1)
            {
                var e = N("img", {src: "http://files.rsdn.ru/37641/16-square-blue-add.png",
                                  align: "absmiddle",
                                  quoteID: "" + quoteID});
                e.addEventListener("click", showQuote, false);
                append(stack[0], e);
                append(stack[0], T(" "));
                stack[1].style.display = "none";
                stack[1].setAttribute("id", "quote_" + quoteID++);
            }

            i > 0 && append(stack[i - 1], stack[i]);
            stack[i].setAttribute("class", "quote");

        }
    }

    append(stack[q.level - 1], q.node);
    append(stack[q.level - 1], T(" "));

    return true;
}

function processBQ(bq, isQuote)
{
    var p = XPQuerySingle(".//p", bq);

    if (p)
    {
        isQuote && foreach(p, function(np) {
            if (np.nodeName == "#text")
            {
               np.nodeValue = np.nodeValue.replace(/^(?:[^>\n]{0,5}>+)+/mg, "");
            }
        });

        bq.setAttribute("class", "bquote");
        p.setAttribute("class", "bquote");
    }

    return bq;
}

function processTable(tbl, isQuote)
{
    var pre = XPQuerySingle(".//tbody/tr/td/pre", tbl);

    if (pre && tbl.getAttribute("class") != "formatter")
    {
        isQuote && foreach(pre, function(np) {
            if (np.nodeName == "#text")
            {
               np.nodeValue = np.nodeValue.replace(/^(?:[^>\n]{0,5}>+)+/mg, "");
            }
        });

        pre.setAttribute("class", "code");

        return pre;
    }

    return tbl;
}

function $switch(value, args, table)
{
    for (var i = 0; i < table.length; ++i)
    {
        if (table[i][0] && table[i][0](value))
            return table[i][1].apply(window, args);
    }

    return null;
}

function decomposeQuote(q)
{
    var level = 0;
    var node = document.createDocumentFragment();

    foreach(q, function (n) {
        $switch(n, [node, n],
        [
            [isWS,    function(node, n) { append(node, T(" ")); } ],
            [isBQ,    function(node, n) { append(node, processBQ(n, true)); } ],
            [isTable, function(node, n) { append(node, processTable(n, true)); } ],
            [isImage, function(node, n) {
                          n.getAttribute("src").match(/^(?:http:\/\/(?:www\.)?rsdn.ru)?\/forum\/images/i) ?
                          append(node, n) : append(node, N("a", {href: n.getAttribute("src")}, T(n.getAttribute("src")))); } ],
            [isText,  function(node, n) {
                          var text = n.nodeValue;
                          var match = text.match(/^(?:\s*[^>]{0,5}\s*>+)+/);

                          match && (level = match[0].replace(/[^>]*/g, "").length);
                          text = extractAuthor(text.replace(/^(?:\s*[^>]{0,5}\s*>+)+/, "")).rest;

                          text.length && node.appendChild(T(text)); } ],
            [$default, append]
        ])
    });

    return {level: level, node: node};
}

function extractAuthor(text)
{
    for (var i = 0; i < origAuthorTemplates.length; ++i)
    {
        var match = text.match(origAuthorTemplates[i]);

        if (match)
            return { author: match[1], rest: text.replace(origAuthorTemplates[i], "") };
    }

    return {author: "", rest: text};
}

/* STATE MACHINE :) */
function makeMachine(states, stateData)
{
    var machine =
    {
        current_state: states[0],
        states: states,
        data: stateData,
        state: function (i) { this.current_state = this.states[i]; }
    };

    return function(item)
    {
        for (var i = 0; i < machine.current_state.length; ++i)
        {
            if (machine.current_state[i][0](item))
            {
                if (machine.current_state[i][1](machine, item))
                {
                    return;
                }
                else
                {
                    i = -1;
                    continue;
                }
            }
        }
        // No handler ...
    }
}

var termNode = { nodeName: "#term", nodeType: -1 };

function $term(e)     { return e.nodeName == "#term"; }
function isWS(e)      { return e.nodeName == "BR" || (e.nodeName == "#text" && e.nodeValue.match(/^\s*$/)); }
function isBR(e)      { return e.nodeName == "BR"; }
function isTagline(e) { return e.nodeName == "DIV" && classOf(e) == "tagline"; }
function isQuote(e)   { return e.nodeName == "SPAN" && classOf(e) == "lineQuote"; }
function isBQ(e)      { return e.nodeName == "BLOCKQUOTE" && classOf(e) == "q"; }
function isTable(e)   { return e.nodeName == "TABLE"; }
function isImage(e)   { return e.nodeName == "IMG"; }
function isText(e)    { return e.nodeType == e.TEXT_NODE; }
function $default(e)  { return true; }

function skip(m, i)   { return true; }
function clone(m, i)  { append(m.data.msg, i); return true; }

function insertQuote(m, i)
{
    append(m.data.msg, m.data.quotes[0]);
    m.data.quotes.length = 0;
    m.state(m.data.NORMAL);

    return false;
}

function insertBRs(m, i)
{
    if (m.data.msg.firstChild)
    {
        m.data.numBRs > 1 && append(m.data.msg, N("br"));
        m.data.numBRs > 0 && append(m.data.msg, N("br"));
    }

    m.data.numBRs = 0;
    m.state(m.data.NORMAL);

    return false;
}

function processAuthor(m, i)
{
   var tdata = extractAuthor(i.nodeValue);

   tdata.author.length && (m.data.author = tdata.author);
   tdata.rest.length && append(m.data.msg, T(tdata.rest));
   m.state(m.data.NORMAL);

   return true;
}

function processMessage(m)
{
    var newMsg = document.createDocumentFragment();

    var processItem = makeMachine(
    [
        // AUTHOR
        [
           [ isText,    processAuthor ],
           [ $default,  function (m, i) { m.state(m.data.NORMAL); return false; } ]

        ],

        // NORMAL
        [
           [ isText,    clone ],
           [ isBR,      function (m, i) { m.state(m.data.FOLD_LINES);          return false; } ],
           [ isQuote,   function (m, i) { m.state(m.data.FOLD_QUOTES);         return false; } ],
           [ isBQ,      function (m, i) { append(m.data.msg, processBQ(i));    return true; } ],
           [ isTable,   function (m, i) { append(m.data.msg, processTable(i)); return true; } ],
           [ isTagline, skip ],
           [ $term,     skip ],
           [ $default,  clone ]
        ],

        // FOLD_LINES
        [
            [ isBR,     function (m, i) { ++m.data.numBRs; return true; } ],
            [ isWS,     skip ],
            [ $term,    skip ],
            [ $default, insertBRs ]
        ],

        // FOLD_QUOTES
        [
            [ isWS,     skip ],
            [ isQuote,  pushQuote ],
            [ $term,    insertQuote ],
            [ $default, insertQuote ]
        ]
    ],
    {
        author: "",
        msg:    newMsg,
        numBRs: 0,
        quotes: [],

        // State names.
        AUTHOR:      0,
        NORMAL:      1,
        FOLD_LINES:  2,
        FOLD_QUOTES: 3
    }
    );

    foreach(m, function(e)
               {
                   if (e.nodeName == "FONT") foreach(e, processItem);
                   else !isTagline(e) && append(newMsg, e);
               }
           );

    processItem(termNode);
    return newMsg;
}

dropStylesheets();
injectCSS(msgViewCSS);

window.mids = [];
var mid = 0;
var prevMid = 0;

var body = removeSelf(document.body);
var pages = XPQuerySingle(".//table[1]/tbody/tr/td/small", body);
var anchors = XPQueryOrdered(".//a[@name]", body);

var tbody;
var tbl = N("table", {cellspacing: "0", cellpadding: "0", border: "0", align: "center", class: "messages"},
              tbody = N("tbody"));

for (var i = 0; i < anchors.snapshotLength; i++)
{
    var anchor = anchors.snapshotItem(i);

    if (!anchor.getAttribute("name").match(/^\d+$/)) continue;

    prevMid = mid;
    mid = parseInt(anchor.getAttribute("name"));
    window.mids.push(mid);

    var titleBar = nextElementSibling(anchor);
    var userBar = nextElementSibling(titleBar);
    var message = nextElementSibling(userBar);

    // Decompose title bar
    if (XPQuerySingle(".//tr/td[1]/img", titleBar))
    {
      var title = XPQuerySingle(".//tr/td[2]/font", titleBar);
      var buttons = XPQuerySingle(".//tr/td[3]/font", titleBar);
    }
    else
    {
      var title = XPQuerySingle(".//tr/td[1]/font", titleBar);
      var buttons = XPQuerySingle(".//tr/td[2]/font", titleBar);
    }

    // Decompose userBar
    var userProfile = XPQuerySingle(".//tr[1]/td[3]/font", userBar);
    var messageDate = XPQuerySingle(".//tr[2]/td[2]/font/text()", userBar);
    var messageRate = XPQuerySingle(".//tr[3]/td[3]/a", userBar);

    if (messageRate)
    {
        var t = messageRate.getElementsByTagName("font");
        if (t && t.length)
        {
            transferChildren(messageRate, t[0]);
            removeSelf(t[0]);
        }

        var dobr = messageRate.firstChild && !isWS(messageRate.firstChild);

        t = messageRate.getElementsByTagName("img");
        var k = 0;

        for (var j = 0; j < t.length; ++j)
        {
            if (k == 0) {++k; (j != 0 || dobr) && t[j].parentNode.insertBefore(N("br"), t[j])}
            else { ++k; k = k > 4 ? 0 : k; }
        }
    }

    // Decompose message
    var messageText = XPQuerySingle(".//tr[1]/td[1]", message);
    var signature = XPQuerySingle(".//tr[2]/td[1]/font", message);
    var signatureElem = signature ? N("div", {class: "signature"}) : null;
    var imgs = [];

    var userElem;
    var titleElem;
    var msgElem;
    var buttonsElem;
    var buttonsToggle;
    var buttonsRow;
    var boldTitle = N("span", {class: "title"});

    //tbody.appendChild(
    //    N("tr", {class: "message_hdr"},
    //        userElem  = N("td", {class: "user message_hdr"}, N("a", {id: mid}), N("a", {id: "after_" + prevMid})),
    //        titleElem = N("td", {width: "*", class: "title message_hdr"}, messageDate, T(" - "), boldTitle = N("span", {class: "title"})),
    //        buttonsElem = N("td", {class: "buttons message_hdr"})
    //     )
    //);
    tbody.appendChild(
        N("tr", {class: "message_hdr"},
            userElem  = N("td", {class: "user message_hdr"}, N("a", {id: mid}), N("a", {id: "after_" + prevMid})),
            titleElem = N("td", {width: "*", class: "title message_hdr"}, messageDate, T(" - "), boldTitle = N("span", {class: "title"})),
            N("td", {class: "title message_hdr"}, buttonsToggle = N("img", {src: "http://files.rsdn.ru/37641/arrow_down.png"}))
         )
    );

    buttonsToggle.addEventListener("click", toggleButtons, false);
    buttonsToggle.setAttribute("buttons_id", "buttons_" + mid);

    tbody.appendChild(
        buttonsRow = N("tr", {class: "message_hdr", id: "buttons_" + mid},
            buttonsElem = N("td", {class: "message_hdr buttons", colspan: 3}))
    );

    buttonsRow.style.display = "none";

    //tbody.appendChild(
    //    N("tr", {class: "message_hdr"},
    //        buttonsElem = N("td", {colspan: "2", class: "buttons message_hdr"})
    //     )
    //);

    append(userElem, N("img", {align: "absmiddle", src: "http://files.rsdn.ru/37641/user.png"}));
    append(userElem, T(" "));
    transferChildren(userElem, userProfile);
    transferChildren(boldTitle, title, function (e) { return !isWS(e) && e.nodeName != "SCRIPT" && e.nodeName != "A"; });

    tbody.appendChild(
        N("tr", {class: "message"},
            rateElem = N("td", {class: "rate"}, messageRate ? messageRate : document.createTextNode(" ")),
            msgElem = N("td", {class: "message", colspan: 2}, processMessage(messageText))
         )
    );

    signature && transferChildren(signatureElem, signature);
    /* !!!CONFIG!!! */
    /* Comment out next line to disable signatures. */
    msgElem.childNodes.length && append(msgElem, signatureElem);

    transferChildren(buttonsElem, buttons,
        function (e)
        {
            if (e.nodeName == "FONT") return false;

            switch (e.title)
            {
                case "Подписка на сообщения темы":
                    window.tid = e.getAttribute("href").match(/tid=(\d+)/)[1];
                    return true;

                case "Поиск в MSDN":
                case "Написать новое сообщение":
                case "Показать положение в теме":
                case "+1":
                    return false;

                case "Добавить в избранное":
                case "Интересно":
                case "Спасибо":
                case "Супер":
                case "Удалить оценку":
                case "Смешно":
                case "Согласен":
                case "Не согласен":
                    e.setAttribute("onclick", "");
                    e.addEventListener("click", showFrame, false);
                    return true;
            }

            return true;
        }
    );
}

append(tbody, N("tr", {}, N("td", {}, N("a", {id: "after_" + mid}))));

var newBody = N("body");
var topPager = N("div", {class: "pager"});

pages && transferChildren(topPager, pages, function(e) { e.nodeName != "#text" && e.setAttribute("class", "page"); return true;} );

var bottomPager = topPager.cloneNode(true);

pages && append(newBody, topPager);
append(newBody, tbl);
pages && append(newBody, bottomPager);

append(document.documentElement, newBody);

injectCSS("body { display: block ! important; } ");

var db = openDB();
var lastRead = getLastReadMsg(db, window.tid);
db && db.close();

var scrollTo = "after_" + lastRead;

if (scrollTo = (document.getElementById(scrollTo) || document.getElementById("after_0")))
{
    scrollTo = scrollTo.parentNode.parentNode.parentNode.insertBefore(N("tr", {class: "unread_mark"}, N("td", {colspan: "3"}, T("\u00A0"))), scrollTo.parentNode.parentNode);
    scrollTo && scrollTo.scrollIntoView(true);
}

setTimeout(
    function()
    {
        if (window.location.href.match(/http:\/\/www\.rsdn\.ru\/forum\/[^\/]+\/\d+\.(hot|1)\.(?:\d+\.)?aspx/i)) return false;

        var db = openDB();
        if (!db) return false;

        db.execute("BEGIN");

        for (var i = 0; i < mids.length; ++i)
        {
            insertMessage(db, window.tid, window.mids[i]);
        }

        db.execute("COMMIT");
        db.close();
    },
    1000);


} /* End MsgView main() */


/**************************************************************************************************/
/*                            GREASEMONKEY MAIN SCRIPT                                            */
/**************************************************************************************************/

function injectCSS(css)
{
    var styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    styleElement.appendChild(document.createTextNode(css));

    (document.getElementsByTagName("head")[0] ||
     document.documentElement.appendChild(document.createElement("head")))
        .appendChild(styleElement);
}

function injectScriptFromContainers()
{
    var script = "";
    for (var i = 0; i < arguments.length; ++i)
    {
        script += ("" + arguments[i]).replace(/^\s*function\s*.*?(.*?)\s*{/, "").replace(/}\s*$/, "") + "\n";
    }

    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.appendChild(document.createTextNode(script));

    (document.getElementsByTagName("head")[0] ||
     document.documentElement.appendChild(document.createElement("head")))
        .appendChild(scriptElement);
}

function injectScriptExec(script)
{
    var script = "\n(\n" + script + "\n)();\n";

    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.appendChild(document.createTextNode(script));

    (document.getElementsByTagName("head")[0] ||
     document.documentElement.appendChild(document.createElement("head")))
        .appendChild(scriptElement);
}

function injectGears()
{
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.setAttribute("src", "http://code.google.com/apis/gears/gears_init.js");

    (document.getElementsByTagName("head")[0] ||
     document.documentElement.appendChild(document.createElement("head")))
        .appendChild(scriptElement);
}

var addr = window.location.href;

if (addr.match(/http:\/\/www\.rsdn\.ru\/forum\/msglist\.aspx/i))
{
    injectGears();
    injectScriptFromContainers(common_funcs, list_common);
    injectScriptExec(msglist_main)
}
else if (addr.match(/http:\/\/www\.rsdn\.ru\/forum\/ratelist\.aspx.*process=1.*/i) ||
         addr.match(/http:\/\/www\.rsdn\.ru\/forum\/private\/answers.aspx.*process=1.*/i))
{
    injectScriptFromContainers(common_funcs, list_common);
    injectScriptExec(rate_and_answers_main)
}
else if (addr.match(/http:\/\/www\.rsdn\.ru\/forum\/[^\/]+\/\d+\.aspx/i) ||
         addr.match(/http:\/\/www\.rsdn\.ru\/forum\/[^\/]+\/$/i))
{
    var e = document.getElementsByTagName("frameset")[0];
    e.setAttribute("cols","27%,*");
    e.setAttribute("rows", "");
    e.setAttribute("border", "8");

    return true;
}
else if (addr.match(/http:\/\/www\.rsdn\.ru\/forum\/private\/rate\.aspx/i) ||
         addr.match(/http:\/\/www\.rsdn\.ru\/users\/private\/addfav\.aspx/i))
{
    var e = document.getElementsByName("no");
    if (e && e.length)
    {
        e[0].setAttribute("onclick", "parent.closeFrame();");
    }

    e = document.getElementsByName("_ctl8");
    if (e && e.length)
    {
        e[0].setAttribute("onclick", "parent.closeFrame();");
        setTimeout("parent.closeFrame();", 3000);
    }

    e = document.getElementsByName("ret");
    if (e && e.length)
    {
        e[0].setAttribute("onclick", "parent.closeFrame();");
        setTimeout("parent.closeFrame();", 3000);
    }

    injectCSS("body { display: block ! important; } ");
}
else if (addr.match(/http:\/\/www\.rsdn\.ru\/forum\/[^\/]+\/\d+\.(flat|all|hot|1)\.(?:\d+\.)?aspx/i))
{
    injectGears();
    injectScriptFromContainers(common_funcs, msgview_funcs/*, msgview_main*/);
    injectScriptExec(msgview_main)
}
else
{
    injectCSS("body { display: block ! important; } ");
}


