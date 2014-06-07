// ==UserScript==
// @name           bash.org.ru return comments back
// @namespace      888555.info
// @description    888555.info
// @include        http://test2.ru/*
// @include        http://bash.org.ru*
// ==/UserScript==

function getversion() {

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://888555.info/version.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        onload: function(responseDetails) {
            if (responseDetails.responseText !== "0.0.1") {
                alert("обнови user script 888555.info");
            }
        }
    });

}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function appendstyle() {
    addGlobalStyle('.p1 { border:1px solid #E9E9E9; margin-bottom:1em; }');
    addGlobalStyle('.p1 .ph1 { background:#F6F6F6 none repeat scroll 0; }');
    addGlobalStyle('.p1 .ph1 .h2 {font-size:1.3em; font-weight:normal; padding:0.25em 0 0 0.25em;border-bottom:2px solid #800000;}');
    addGlobalStyle('.p1 .ph1 .data {font-size:0.8em; padding:0 0 0.5em 0.5em; }');
    addGlobalStyle('.p1 .pm1 { background:#FCFCFC none repeat scroll 0; font-size:0.9em; padding:0.5em;}');
    addGlobalStyle('.p1 .pf1 { background:#F6F6F6 none repeat scroll 0; font-size:0.8em;font-weight:bold; padding:0.25em 1em; text-align:right;}');
    addGlobalStyle('hr { display:none; }');
    addGlobalStyle('a.my  {color:#EE3333;text-decoration:none;}');
    addGlobalStyle('a.my:visited {color:#993333;}');
    addGlobalStyle('a.my:hover {text-decoration:underline;}');
    addGlobalStyle('.p1 .ph1 .rate { background:#333333 none repeat scroll 0; color:#FFFFFF; float:right; font-size:1.2em; padding:0.5em; position:relative; right:-5px; top:-5px; width:auto; }');
    addGlobalStyle('.p1 .ph1 .rate span { padding:0 1em; } ');
    addGlobalStyle('.p1 .ph1 .rate a { color:#FF0000; font-weight:bold; text-decoration:none; }');
    addGlobalStyle('.p1 .ph1 .rate a:hover { color:#FFFFFF; font-weight:bold; text-decoration:none; }');
    addGlobalStyle('.vote .v a { color:#FF0000; font-weight:bold; text-decoration:none; font-size:1.2em;}');
    addGlobalStyle('.vote .v a:hover { color:#000000; font-weight:bold; text-decoration:none; font-size:1.2em;}');
    addGlobalStyle('.gray  { color:#999999;}');
    addGlobalStyle('.white { color:#f3f3f3;}');

}

function appendMinus() {
    var allDivs, thisDiv;
    allDivs = document.evaluate("//div[@class='vote']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        x = document.createElement('span');
        x.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        thisDiv.appendChild(x);
    }
}

function sign() {
    var allDivs, thisDiv;
    res = /sux/;
    rer = /rulez/;
    reb = /bayan/;
    red = /(\d+)/;

    allDivs = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        ret = null;
        if (res.test(thisDiv.href) === true) {
            ret = thisDiv.href.match(red);
            if (ret !== null) {
                ret = ret[0];
            }
            else {
                ret = 0;
            }
            thisDiv.setAttribute("id", "s" + ret);
        }
        if (rer.test(thisDiv.href) === true) {
            ret = thisDiv.href.match(red);
            if (ret !== null) {
                ret = ret[0];
            }
            else {
                ret = 0;
            }
            thisDiv.setAttribute("id", "r" + ret);
        }
        if (reb.test(thisDiv.href) === true) {
            ret = thisDiv.href.match(red);
            if (ret !== null) {
                ret = ret[0];
            }
            else {
                ret = 0;
            }
            thisDiv.setAttribute("id", "b" + ret);
        }

    }
}

//stuf

function remove_her() {
    if (document.getElementById("bar")) {
        var x = document.getElementById("bar");
        x.parentNode.removeChild(x);
    }

    var x = document.getElementById("quotes");

    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }

}
function vote(subj, id, id3, mark) {

    var id2 = (id + ' ').replace(/^0+/, "");
    var send_data = "subj=" + subj + "&id=" + id + "&vote=" + mark;
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://888555.info/vote.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: send_data,
        onload: function(responseDetails) {
            var up = [];
            var response = responseDetails.responseText;
            var id2;
            if (response.indexOf('|' != -1)) {
                up = response.split('|');
            }

            if (subj === 5) {

                setTimeout('thisDiv = document.getElementById("r"+' + id + '); thisDiv.parentNode.removeChild(thisDiv); thisDiv = document.getElementById("s"+' + id + '); thisDiv.parentNode.removeChild(thisDiv); thisDiv = document.getElementById("b"+' + id + '); thisDiv.parentNode.removeChild(thisDiv); thisDiv = document.getElementById("gavno"+' + id + '); thisDiv.parentNode.removeChild(thisDiv); thisDiv = document.getElementById("Rulez"+' + id + '); thisDiv.parentNode.removeChild(thisDiv); ', 1000);

            }
            else {

                document.getElementById(id3).innerHTML = up[1];

            }

        }

    });
}


function create_navigation(sort, p, info, subj) {
    var a;
    var x = document.createElement("div");
    x.setAttribute("id", "nav");

    a = document.createElement("a");
    a.setAttribute("id", "navLast");
    a.setAttribute("subj", subj);
    a.appendChild(document.createTextNode("Последнее"));
    x.appendChild(a);
    x.appendChild(document.createTextNode("  "));

    a = document.createElement("a");
    a.setAttribute("id", "navDate");
    a.setAttribute("subj", subj);
    a.appendChild(document.createTextNode("ПоНомеру"));
    x.appendChild(a);
    x.appendChild(document.createTextNode("  "));

    a = document.createElement("a");
    a.setAttribute("id", "navComment");
    a.setAttribute("subj", subj);
    a.appendChild(document.createTextNode("ПоКоментам"));
    x.appendChild(a);
    x.appendChild(document.createTextNode("  "));

    a = document.createElement("a");
    a.setAttribute("id", "navRating");
    a.setAttribute("subj", subj);
    a.appendChild(document.createTextNode("ПоРейтингу"));
    x.appendChild(a);
    x.appendChild(document.createElement("br"));

    var div2 = document.createElement("div");
    for (var i = 0; i < info; i++) {
        a = document.createElement("a");
        a.setAttribute("id", "go");
        a.setAttribute("sort", sort);
        a.setAttribute("page", i);
        a.setAttribute("subj", subj);
        a.appendChild(document.createTextNode(i));
        div2.appendChild(a);
        div2.appendChild(document.createTextNode("  "));

    }

    x.appendChild(div2);
    document.getElementById("quotes").appendChild(x);
}
function create_add(subj) {

    document.getElementById("quotes").appendChild(document.createElement("br"));

    var form = document.createElement("form");
    var div = document.createElement("div");
    div.appendChild(document.createTextNode("Заголовок"));
    form.appendChild(div);

    div = document.createElement("div");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "128");
    input.setAttribute("id", "title");
    input.setAttribute("style", "width: 340px;");

    div.appendChild(input);
    form.appendChild(div);

    var div = document.createElement("div");
    div.appendChild(document.createTextNode("Текст сообщения"));
    form.appendChild(div);

    var textarea = document.createElement("textarea");
    textarea.setAttribute("id", "textarea");
    textarea.setAttribute("cols", "70");
    textarea.setAttribute("rows", "7");

    form.appendChild(textarea);

    input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", "idadd");
    input.setAttribute("subj", subj);
    input.setAttribute("value", "Отправить");
    input.setAttribute("onclick", "event.stopPropagation();return false;");

    form.appendChild(input);

    document.getElementById("quotes").appendChild(form);
}

function get_last_comment() {
    var max, temp;
    max = 0;
    a = document.getElementsByTagName("a");

    for (i = 0; i < a.length; i++) {
        if (a[i].hasAttribute("class")) {
            if (a[i].className === "comment") {
                max = parseInt(a[i].innerHTML.replace(/\D/g, "").replace(/^0+/, ""), 10);
            }
        }
    }
    return max;
}

function load_comment(subj, id) {
    var comment = get_last_comment();

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://888555.info/get_comm.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: "id=" + id + "&comment=" + comment + "&subj=" + subj,
        onload: function(responseDetails) {

            var response = eval("(" + responseDetails.responseText + ")");

            for (i = 0; i < response.length; i++) {

                var divq = document.createElement("div");
                divq.setAttribute("class", "q");

                div = document.createElement("div");
                div.appendChild(document.createTextNode("anonymous: #" + response[i].comment + " | " + response[i].data));
                div.innerHTML = div.innerHTML.replace(/#\d{9}/g, "<a class='comment' id='add_commentid' onclick='event.stopPropagation();return false ;'>$&</a>");
                div.setAttribute("class", "vote");
                divq.appendChild(div);
                //------------------------------
                div.appendChild(document.createTextNode(" | "));

                div2 = document.createElement("span");
                div2.setAttribute("class", "v");
                var a = document.createElement("a");
                a.setAttribute("id", "vs" + response[i].comment);
                if (subj === 2) {
                    a.setAttribute("subj", 2);
                }
                else {
                    a.setAttribute("subj", parseInt(subj) + 3);
                }
                a.setAttribute("mark", "1");
                a.setAttribute("id2", "span2" + response[i].comment);

                a.appendChild(document.createTextNode("+"));
                div2.appendChild(a);
                div.appendChild(div2);

                var span = document.createElement("span");
                span.setAttribute("id", "span2" + response[i].comment);
                span.appendChild(document.createTextNode(" " + response[i].rating + " "));

                div.appendChild(span);

                div2 = document.createElement("span");
                div2.setAttribute("class", "v");
                var a = document.createElement("a");
                a.setAttribute("id", "vs" + response[i].comment);
                if (subj === 2) {
                    a.setAttribute("subj", 2);
                }
                else {
                    a.setAttribute("subj", parseInt(subj) + 3);
                }
                a.setAttribute("mark", "-1");
                a.setAttribute("id2", "span2" + response[i].comment);

                a.appendChild(document.createTextNode("-"));
                div2.appendChild(a);
                div.appendChild(div2);

                divq.appendChild(div);

                //------------------------------
                div = document.createElement("div");
                if ( parseInt(response[i].rating,10) < -4 ){
                
                div.setAttribute("class", "gray");
                }
                if ( parseInt (response[i].rating,10) < -8 ){
                div.setAttribute("class", "white");
                }
                div.setAttribute("id", "q" + response[i].comment);
                div.setAttribute("rand", "thread");
                for (j = 0; j < response[i].text.length; j++) {

                    div.innerHTML += response[i].text[j];

                }
                div.innerHTML = div.innerHTML.replace(/\d{9}/g, "<a href='$&' onclick='event.stopPropagation();return false ;'>$&</a>");

                divq.appendChild(div);
                if (document.getElementById("comments")) {
                    document.getElementById("comments").appendChild(divq); 
                }
                else {

                    var comm = document.createElement("div");
                    comm.setAttribute("id", "comments");
                    document.getElementById("quotes").appendChild(comm);
                    document.getElementById("comments").appendChild(divq);
                }
            }
        }
    });

}

function create_response_form(id, postid) {

    document.getElementById("quotes").appendChild(document.createElement("hr"));
    // comment div
    comments = document.createElement("div");
    comments.setAttribute("id", "comments");

    document.getElementById("quotes").appendChild(comments);

    document.getElementById("quotes").appendChild(document.createElement("hr"));

    div = document.createElement("div");


    form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "http://test1.ru/postcomment.php");

    form.appendChild(div);

    quote_id = document.createElement("input");
    quote_id.setAttribute("type", "hidden");
    quote_id.setAttribute("name", "id");
    quote_id.setAttribute("value", id);

    form.appendChild(quote_id);

    textarea = document.createElement("textarea");
    textarea.setAttribute("id", "quote_text");
    textarea.setAttribute("rows", "5");
    textarea.style.height = "150px";
    textarea.setAttribute("name", "text");
    textarea.setAttribute("cols", "40");
    form.appendChild(textarea);

    submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", postid);
    submit.setAttribute("id2", id);
    submit.setAttribute("value", "Comment!"); 
    submit.setAttribute("onclick", "event.stopPropagation();return false;");

    form.appendChild(submit);

    document.getElementById("quotes").appendChild(form);

    document.getElementById("quotes").appendChild(document.createElement("hr"));
}


function get_thread(id, subj, sort, page) {


    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://888555.info/get_thread.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: "id=" + id + "&subj=" + subj + "&sort=" + sort + "&page=" + page,
        onload: function(responseDetails) {

            var response = eval("(" + responseDetails.responseText + ")");

            create_navigation(sort, page, response.info, subj);

            var quote = document.getElementById("quotes");
            response = response.mess;
            for (i = 0; i < response.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "p1");

                var div2 = document.createElement("div");
                div2.setAttribute("class", "ph1");

                var rate = document.createElement("div");
                rate.setAttribute("class", "rate");

                var a = document.createElement("a");
                a.setAttribute("id", "vt" + response[i].id);
                a.setAttribute("subj", subj);
                a.setAttribute("mark", "1");
                a.setAttribute("id2", "span" + response[i].id);

                a.appendChild(document.createTextNode("+"));
                rate.appendChild(a);

                var span = document.createElement("span");
                span.setAttribute("id", "span" + response[i].id);
                span.appendChild(document.createTextNode(response[i].rating));
                span.setAttribute("rand", "span");
                rate.appendChild(span);

                var a = document.createElement("a");
                a.setAttribute("id", response[i].id);
                a.setAttribute("id", "vt" + response[i].id);
                a.setAttribute("subj", subj);
                a.setAttribute("mark", "-1");
                a.setAttribute("id2", "span" + response[i].id);
                a.appendChild(document.createTextNode("-"));
                rate.appendChild(a);

                div2.appendChild(rate);

                var th2 = document.createElement("div");
                th2.setAttribute("class", "h2");
                th2.appendChild(document.createTextNode("#" + response[i].id + ": "));

                var a = document.createElement("a");
                a.setAttribute("class", "my");
                a.appendChild(document.createTextNode(response[i].title));
                a.setAttribute("id", "thread" + response[i].id);
                a.setAttribute("subj", subj);

                th2.appendChild(a);

                var data = document.createElement("div");
                data.setAttribute("class", "data");
                var b = document.createElement("b");
                b.appendChild(document.createTextNode(response[i].autor + " "));
                data.appendChild(b);
                data.appendChild(document.createTextNode("- " + response[i].date));

                div2.appendChild(th2);
                div2.appendChild(data);

                div.appendChild(div2);

                div2 = document.createElement("div");
                div2.setAttribute("class", "pm1");

                for (j = 0; j < response[i].comment.length; j++) {
                    div2.appendChild(document.createTextNode(response[i].comment[j]));
                    div2.appendChild(document.createElement("br"));
                }

                div.appendChild(div2);

                div2 = document.createElement("div");
                div2.setAttribute("class", "pf1");
                div2.appendChild(document.createTextNode("ответов: "));

                a = document.createElement("a");
                a.setAttribute("class", "my");
                a.appendChild(document.createTextNode(response[i].ans));
                a.setAttribute("id", "thread" + response[i].id);
                a.setAttribute("subj", subj);

                div2.appendChild(a);
                div.appendChild(div2);

                quote.appendChild(div);
                quote.appendChild(document.createElement("hr"));

                //div p1
                //      ph1
                //          h2  number: href title
                //          data  <b>autor</b> data
                //      pm1
                //          comment
                //      pf1
                //          href ans
                // hr1
            }

            if (subj === 1) {
                create_add(1); 
            }

            if (id > 0) {

                create_response_form(id, subj);
                load_comment(subj, id);
            }

        }

    });

}

function create_wordstream() {
    remove_her();
    get_thread(0, 0, 3, 0);
}
function create_todo() {
    remove_her();
    get_thread(0, 1, 3, 0);

}

function create_rule() {
    remove_her();

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://888555.info/rule.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        onload: function(responseDetails) {

            var response = eval("(" + responseDetails.responseText + ")");
            var div2 = document.createElement("div");
            div2.setAttribute("class", "q");
            for (i = 0; i < response.length; i++) {
                var div = document.createElement("div");
                var span = document.createElement("span");
                var text = document.createTextNode(response[i].id + ' ');
                span.appendChild(text);
                span.setAttribute("style", "color:#FF0000; font-weight:bold; ");
                div.appendChild(span);
                text = document.createTextNode(response[i].text);
                div.appendChild(text);
                div2.appendChild(div);
                div2.appendChild(document.createElement("br"));

            }
            document.getElementById("quotes").appendChild(div2);
        }
    });

}
function hideMe() {
    document.getElementById('toolTipBox').style.display = "none";
}


function updatePos() {
    var ev = arguments[0] ? arguments[0] : event;
    var x = ev.pageX + 5;
    var y = ev.pageY - parseInt(document.getElementById('toolTipBox').offsetHeight, 10) - 10;

    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
    document.getElementById('toolTipBox').style.top = y + "px"; 
    document.getElementById('toolTipBox').style.left = x + "px"; 
    theObj.addEventListener('mouseout', hideMe, false);
}

function toolTip(text, me) {

    theObj = me;
    theObj.addEventListener('mousemove', updatePos, false);

    x = document.getElementById('toolTipBox');

    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }

    var newContent = document.getElementById(text).cloneNode(true);
    x.appendChild(newContent);
    x.style.display = "block";
    x.style.position = "absolute";
    x.style.padding = 5;
    x.style.border = "blue solid 1px";
    x.style.background = "#b9f9e6"; //"#B4B4E9";
    window.onscroll = updatePos;
}




function clickme(me) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    me.dispatchEvent(evt);
}
function off(id) {
    document.getElementById(id).style.display = "none"; 
    document.getElementById("x" + id).childNodes[0].textContent = "Show";
}

function post_comment(subj, id) {

    var send_data = "id=" + id + "&subj=" + subj + "&text=" + document.getElementById("quote_text").value;

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://888555.info/postcomment.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: send_data,
        onload: function(responseDetails) {
            document.getElementById("quote_text").value = "";

            load_comment(subj, id);

        }
    });

}

function post_thread(subj) {

    var text = document.getElementById("textarea").value;
    var title = document.getElementById("title").value;
    var send_data = "title=" + title + "&text=" + text + "&subj=" + subj;

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://888555.info/post_thread.php',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: send_data,
        onload: function(responseDetails) {
            create_wordstream();
        }
    });

}

//stuf
function mauseclicklistener() {
    document.addEventListener('click',
    function(event) {
        resw = /xxz\d+/;
        rer = /(r)\d+/;
        reg = /^(s|b)\d+/;
        rer2 = /Rulez\d+/;
        reg2 = /gavno\d+/;
        remw = /Wordstream/;
        remt = /ToDo/;
        remr = /Rules/;
        rema = /Add/;
        rend = /navDate/;
        renc = /navComment/;
        renr = /navRating/;
        renl = /navLast/;
        reng = /go/;
        reth = /thread/;
        revt = /v(t|s)\d+/;

        reac = /add_commentid/;
        reat = /idadd/;

        if (event.target.hasAttribute('type')) {
            if (event.target.type === "submit") {
                if (event.target.id === "0") {
                    post_comment(0, event.target.getAttribute("id2"));
                }
                else if (event.target.id === "1") {
                    post_comment(1, event.target.getAttribute("id2"));
                }
                else if (event.target.id === "2") {
                    post_comment(2, event.target.getAttribute("id2"));

                }
               
                return;
            }
        }

        if (event.target.hasAttribute("id")) {
            if (resw.test(event.target.id) === true) {
                if (document.getElementById("xz" + event.target.id.replace(/\D/g, "")).style.display === 'none') {
                    event.target.childNodes[0].textContent = "Hide";
                    document.getElementById("xz" + event.target.id.replace(/\D/g, "")).style.display = "block";
                }
                else {
                    event.target.childNodes[0].textContent = "Show";
                    document.getElementById("xz" + event.target.id.replace(/\D/g, "")).style.display = "none";
                }
                return;
            }
            if (reg.test(event.target.id) === true) {
                off("xz" + event.target.id.replace(/\D/g, ""));
                vote(5, event.target.id.replace(/\D/g, ""), 0, -1);
            }
            if (rer.test(event.target.id) === true) {

                vote(5, event.target.id.replace(/\D/g, ""), 0, 1);
            }
            if (reg2.test(event.target.id) === true) {

                clickme(document.getElementById("s" + event.target.id.replace(/\D/g, "")));
                return;
            }
            if (rer2.test(event.target.id) === true) {

                clickme(document.getElementById("r" + event.target.id.replace(/\D/g, "")));
                return;
            }
            if (remw.test(event.target.id) === true) {
                create_wordstream();
            }
            if (remt.test(event.target.id) === true) {
                create_todo();
            }
            if (remr.test(event.target.id) === true) {
                create_rule();
            }
            if (rema.test(event.target.id) === true) {
                remove_her();
                create_add(0);
            }
            if (rend.test(event.target.id) === true) {
                remove_her();
                get_thread(0, event.target.getAttribute("subj"), 0, 0);
            }
            if (renc.test(event.target.id) === true) {
                remove_her();
                get_thread(0, event.target.getAttribute("subj"), 1, 0);
            }
            if (renl.test(event.target.id) === true) {
                remove_her();
                get_thread(0, event.target.getAttribute("subj"), 2, 0);
            }
            if (renr.test(event.target.id) === true) {
                remove_her();
                get_thread(0, event.target.getAttribute("subj"), 3, 0);
            }
            if (reng.test(event.target.id) === true) {
                remove_her();
                get_thread(0, event.target.getAttribute("subj"), event.target.getAttribute("sort"), event.target.getAttribute("page"));
            }
            if (reth.test(event.target.id) === true) {
                remove_her();
                get_thread(parseInt(event.target.id.replace(/\D/g, "").replace(/^0+/, "")), event.target.getAttribute("subj"), 0, 0);
            }
            if (revt.test(event.target.id) === true) {

                
                vote(event.target.getAttribute("subj"), parseInt(event.target.id.replace(/\D/g, ""), 10), event.target.getAttribute("id2"), event.target.getAttribute("mark"));

            }
            if (reac.test(event.target.id) === true) {
                document.getElementById("quote_text").value += ">>" + event.target.innerHTML.replace(/\D/g, "") + " ";
            }
            if (reat.test(event.target.id) === true) {

                post_thread(event.target.getAttribute("subj"));

            }

            //if (re.test(event.target.id) === true ){  }
        }
        
    },
    true);
}

//ajax


function discus() {
    re = /quote/;
    if (re.test(window.location.href) === true) {
        create_response_form(window.location.href.match(/(\d+)/)[0], 2);
        load_comment(2, window.location.href.match(/(\d+)/)[0]); 
    }
}

function mauseoverlistener() {
    document.addEventListener('mouseover',
    function(event) {
        var patt = new RegExp("\\d{9}");

        if (event.target.hasAttribute("href") && (patt.test(event.target.getAttribute("href")))) {
            if (event.type == "mouseover") {
                toolTip("q" + event.target.getAttribute("href").match("\\d{9}$")[0], event.target);
            }
        }
    },
    true);
}
function linktostream() {

    allDivs = document.evaluate("//div[@class='menu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        div = document.createElement("div");
        //link
        a = document.createElement("a");
        a.setAttribute("id", "Wordstream");
        a.appendChild(document.createTextNode("Wordstream"));
        div.appendChild(a);
        //nbsp
        a = document.createElement("span");
        a.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        div.appendChild(a);
        //link
        a = document.createElement("a");
        a.setAttribute("id", "ToDo");
        a.appendChild(document.createTextNode("ToDo"));
        div.appendChild(a);
        //nbsp
        a = document.createElement("span");
        a.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        div.appendChild(a);
        //link
        a = document.createElement("a");
        a.setAttribute("id", "Rules");
        a.appendChild(document.createTextNode("Rules"));
        div.appendChild(a);
        thisDiv.insertBefore(div, thisDiv.firstChild);
        //nbsp
        a = document.createElement("span");
        a.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        div.appendChild(a);
        //link
        a = document.createElement("a");
        a.setAttribute("id", "Add");
        a.appendChild(document.createTextNode("Add"));
        div.appendChild(a);
        thisDiv.insertBefore(div, thisDiv.firstChild);

    }
}

//menu

function appendSwitch(thisDiv, id) {

    newlink = document.createElement('a');
    newlink.setAttribute('class', 'signature');

    newlink.setAttribute('id', 'x' + id);
    
    newlink.appendChild(document.createTextNode('Hide'));
    thisDiv.appendChild(newlink);

    x = document.createElement("span");
    x.innerHTML = "&nbsp;&nbsp;&nbsp;";
    thisDiv.appendChild(x);

    newlink = document.createElement('a');
    newlink.setAttribute('class', 'signature');
    id = id.match(/(\d+)/)[0];

    // обсудить и прочее говно
    patt = new RegExp('http://bash.org.ru/index/|http://bash.org.ru/$|ru/best|random|abyss|byrating');

    if (patt.test(window.location.href) === true) {

        if (/s(top|best)/.test(window.location.href) === false) {
            newlink.setAttribute('id', 'gavno' + id);
            newlink.setAttribute('onclick', 'event.stopPropagation();return false');
            newlink.appendChild(document.createTextNode('Sux'));
            thisDiv.appendChild(newlink);
            x = document.createElement("span");
            x.innerHTML = "&nbsp;&nbsp;&nbsp;";
            thisDiv.appendChild(x);
            newlink = document.createElement('a');
            newlink.setAttribute('class', 'signature');
            newlink.setAttribute('id', 'Rulez' + id);
            newlink.setAttribute('onclick', 'event.stopPropagation();return false');
            newlink.appendChild(document.createTextNode('Rulez'));
            thisDiv.appendChild(newlink);
        }
        if (/abyss($|\?|top|best)/.test(window.location.href) === false) {
            x = document.createElement("span");
            x.innerHTML = "&nbsp;&nbsp;&nbsp;";
            thisDiv.appendChild(x);
            newlink = document.createElement('a');
            newlink.setAttribute('href', 'http://bash.org.ru/quote/' + id);
            newlink.appendChild(document.createTextNode('Обсудить'));
            thisDiv.appendChild(newlink);
        }
    }
}

function get_id(thisDiv) {
    re = /(\d+)/;
    ret = null;
    ret = thisDiv.textContent.match(re);

    if (ret !== null) {
        ret = ret[0];
    }
    else {
        ret = 0;
    }
    return ret;
}

function getXmlString() {

    var allDivs, thisDiv, xmlString, id;

    var doc = document.implementation.createDocument("", "", null);
    var root = doc.createElement("r");

    allDivs = document.evaluate("//div[@class='q']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        if (thisDiv.childNodes.length == 5) {
            id = get_id(thisDiv);
            var domain = doc.createElement("s");
            domain.appendChild(doc.createTextNode(id));
            root.appendChild(domain);

            thisDiv.childNodes[3].setAttribute('id', 'xz' + id);
            appendSwitch(thisDiv.childNodes[1], 'xz' + id);

        }
    }
    doc.appendChild(root);
    xmlString = (new XMLSerializer()).serializeToString(doc);
    return xmlString;
}

var p = document.createElement("DIV");
p.setAttribute("id", "toolTipBox");
p.innerHTML = 'e<br>e<br>e';
p.style.display = "none";
document.getElementsByTagName("body")[0].appendChild(p);

// go 
getversion(); // проверяем обновление
appendstyle(); // добавляем стили
appendMinus(); // добавляем пробелы
sign(); // подписываем кнопки голосования
mauseclicklistener(); // регистрируем обработчик кликов //#########################
mauseoverlistener(); // регистрируем tooltip
//
linktostream(); // добавляем меню
discus(); // comment if quot discus
var send_data = getXmlString(); //  получаем номера цитат бездны switch inside
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://888555.info/get.php',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
    data: send_data,
    onload: function(responseDetails) {

        var response = eval("(" + responseDetails.responseText + ")");
        for (var i = 0; i < response.length; i++) {
          
            if (response[i].p < response[i].m) {
                off('xz' + response[i].id);
            }
            //alert(title);
        }
    }
});