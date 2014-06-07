// ==UserScript==           
// @name           Google Search Previews
// @namespace      GoogleSearchPreviews
// @author         Costas
// @description    Preview thumbs for google search results, and larger previews when hovering the thumbs.
// @include        *//*.google.*/*
// @version        1.0.0
// ==/UserScript==

if (window.frameElement) throw new Error("Stopped JavaScript.");

var doc = document;
var win = window;
var host = win.location.hostname;
var prot = win.location.protocol;

var css_style = "\
            .ppeek_box {position:absolute; top:0px; width:180px; min-height:95px; max-height:270px; height:100%; z-index:100000; border-radius:4px; border:1px solid gray; overflow:hidden;}\
            body[ppeek_pos|=left] .ppeek_box {left:-195px; box-shadow:2px 2px 2px gray;}\
            body[ppeek_pos|=right] .ppeek_box {right:-195px; box-shadow:-2px 2px 2px gray;}\
            .ppeek_box:hover {background:lavender; padding:0px 5px; width:170px;}\
            .ppeek_box .text_span {position:relative; font:bold 12px/20px arial,sans-serif; word-wrap:break-word;}\
            .ppeek_box .frame_span {position:relative; background:white;}\
            .ppeek_box:hover .frame_span {position:fixed; top:10px; bottom:10px; width:750px; box-shadow:0px 0px 20px 10px gray; border-radius:10px; overflow:hidden;}\
            body[ppeek_pos|=left] .ppeek_box:hover .frame_span {left:300px;}\
            body[ppeek_pos|=right] .ppeek_box:hover .frame_span {right:300px;}\
            .ppeek_box iframe {overflow:hidden; border:0px;}\
            body[ppeek_pos|=left] .ppeek_box iframe {width:900px; height:1350px; transform:translate(-450px,-675px) scale(0.2) translate(450px,675px); -webkit-transform:translate(-450px,-675px) scale(0.2) translate(450px,675px);}\
            body[ppeek_pos|=right] .ppeek_box iframe {width:900px; height:1350px; transform:translate(450px,-675px) scale(0.2) translate(-450px,675px); -webkit-transform:translate(450px,-675px) scale(0.2) translate(-450px,675px);}\
            body[ppeek_pos|=left] .ppeek_box:hover iframe {width:1000px; height:2000px; transform:translate(-500px,-1000px) scale(0.75) translate(500px,1000px); -webkit-transform:translate(-500px,-1000px) scale(0.75) translate(500px,1000px);}\
            body[ppeek_pos|=right] .ppeek_box:hover iframe {width:1000px; height:2000px; transform:translate(500px,-1000px) scale(0.75) translate(-500px,1000px); -webkit-transform:translate(500px,-1000px) scale(0.75) translate(-500px,1000px);}\
            .ppeek_button {font:bold 12px/20px arial,sans-serif; position:absolute; top:10px; padding:0px 5px; border-radius:4px; color:white; background:linear-gradient(lightsteelblue,steelblue); cursor:pointer;}\
            .ppeek_button.left {left:10px;}\
            .ppeek_button.right {left:auto; right:10px;}\
            .ppeek_button:hover {background:linear-gradient(lightgray,gray);}\
            .ppeek_button.warning:after {content:attr(warning_message); font-weight:normal; position:absolute; z-index:1000; padding:0px 5px; background:yellow; color:black; border:1px solid lightgray; border-radius:4px; white-space:nowrap; display:none;}\
            .ppeek_button.left.warning:after {left:110%;}\
            .ppeek_button.right.warning:after {right:110%;}\
            .ppeek_button.warning:hover:after {display:inline-block;}\
            body[ppeek_pos] .g {position:relative !important;}\
            body[ppeek_pos] .g:not([style*='padding-top']) {min-height:90px !important;}\
            body[ppeek_pos] .g .s {font-size:15px !important;}\
            body[ppeek_pos] .g .st {font-size:15px !important;}\
            body[ppeek_pos|=left] #center_col {margin-left:190px !important;} /*120*/\
            body[ppeek_pos|=left] .mw #nyc {margin-left:721px !important;} /*651*/\
            body[ppeek_pos|=left] .mw #rhs {margin-left:772px !important;} /*702*/\
            body[ppeek_pos|=right] #center_col {margin-right:190px !important;} /*120*/\
            body[ppeek_pos|=right] .mw #nyc {margin-right:721px !important;} /*651*/\
            body[ppeek_pos|=right] .mw #rhs {margin-right:772px !important;} /*702*/\
            ";

//params
var pref_enable = GM_getValue("enable");
if (pref_enable == null)
    pref_enable = false;

var newTab = true; //true, false
var maxLoad = 3; //1, 2, 3, 4, 5 number of concurrent downloads
var maxTime = 5000; //maximum delay time for download and rendering


////====================================================
////================ Auxilliary Functions ==============



function message(str) {
    var node = doc.createElement("pre");
    node.textContent = str + "\n";
    node.style.color = "black";
    node.style.backgroundColor = "beige";
    node.style.whiteSpace = "pre-wrap";
    doc.body.appendChild(node);
}


function xpath(query, outer_dom, inner_dom) {
    return outer_dom.evaluate(query, inner_dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


function docsearch(query) {
    return xpath(query, doc, doc);
}


function indocsearch(query, inner) {
    return xpath(query, doc, inner);
}


function insertStyle(str) {
    var styleNode = doc.createElement("style");
    styleNode.setAttribute("type", "text/css");
    styleNode.appendChild(document.createTextNode(str));
    doc.body.appendChild(styleNode);
}

insertStyle(css_style);


////=======================================================
////================ Enable Button  =======================

//adjust direction

var docdir = "left";

if (doc.documentElement.getAttribute("dir") == 'rtl')
    docdir = "right";
else
    if (doc.body.getAttribute("dir") == 'rtl')
        docdir = "right";


function change_enable() {
    GM_setValue("enable", !pref_enable);
    win.location.reload();
}


function enable_button() {
    var parent = doc.getElementById("topabar");
    if (parent == null) return;

    var button_class = "ppeek_button " + docdir;
    var res = indocsearch(".//span[@class='" + button_class + "']", parent).snapshotItem(0);
    if (res != null) return;

    var button = doc.createElement("span");
    button.className = button_class;

    button.textContent = "preview " + (pref_enable ? "ON" : "OFF");
    button.title = "click to turn preview " + (pref_enable ? "OFF" : "ON");
    button.onclick = change_enable;

    if (!pref_enable) {
        button.className += " warning";
        button.setAttribute("warning_message", "previews will use regular unencrypted http protocol to access the search result web pages");
    }

    parent.appendChild(button);
}


//==============================================================
//=================== Previews==================================

var alist = new Array(); //link items to be previewed in page
var fcount = 0; //number of active downloads


function exec_items() {
    while ((alist.length > 0) && (fcount < maxLoad)) {
        var item = alist.shift();
        httpReq(item);
        fcount++;
    }
}


function filter(str, url) {
    if (str == null) return null;

    var res = str;
    var url_prot = "";
    var url_domain = "";

    var m = url.match(/(http[:]|https[:])/);
    if (m != null) {
        url_prot = m[0];
        //message(url_prot);
    }

    m = url.match(/(http[:]|https[:])\/\/[^\/]*/);
    if (m != null) {
        url_domain = m[0];
        //message(url_domain);
    }

    res = res.replace(/(src|href)=(\"|\')(?=\/\/)/gm, '$1=$2' + url_prot);
    res = res.replace(/(src|href)=(\"|\')(?=\/[^\/])/gm, '$1=$2' + url_domain);
    res = res.replace(/(src|href)=(\"|\')(?!(http:|https:))/gm, '$1=$2' + url_domain + '/');

    return (res);
}


function httpReq(item) {
    //message(item.url);

    GM_xmlhttpRequest({
        method: "GET",
        url: item.url,
        timeout: maxTime,
        onload: function (response) {
            var res = filter(response.responseText, item.url);
            callback(res, item);
        },
        onerror: function (response) {
            callback(null, item);
        },
        ontimeout: function (response) {
            callback(null, item);
        },
        onabort: function (response) {
            callback(null, item);
        }
    });
}


function callback(srcdoc, item) {
    //message("callback");
    //message(srcdoc);

    var box = doc.getElementById("ppeek_box_" + item.id);

    if (box != null) {
        if (box.getAttribute("processed") == null) {
            box.setAttribute("processed", "yes");

            if (srcdoc != null) {
                create_frame(srcdoc, item);
                win.setTimeout(showFrame, maxTime, item.id);
            }
            else {
                fcount--;
                //message(fcount);
                exec_items();
            }
        }
    }
}


function create_frame(srcdoc, item) {
    //message("new frame");
    var box = doc.getElementById("ppeek_box_" + item.id);
    if (box == null) return;

    //message("new frame")
    var frame = doc.createElement("iframe");
    frame.id = "ppeek_frame_" + item.id;
    frame.srcdoc = srcdoc;
    frame.setAttribute("item_id", item.id);
    frame.setAttribute("sandbox", "");
    frame.addEventListener("load", handleFrameLoad, true);

    var span = doc.createElement("span");
    span.className = "frame_span";
    span.appendChild(frame);
    box.appendChild(span);

    span = doc.createElement("span");
    span.className = "text_span";
    span.textContent = item.text;
    box.appendChild(span);
}


function handleFrameLoad(evt) {
    var frame = evt.target;
    showFrame(frame.getAttribute("item_id"));
}


function showFrame(id) {
    var frame = doc.getElementById('ppeek_frame_' + id);
    if (frame != null) {
        var box = doc.getElementById("ppeek_box_" + frame.getAttribute("item_id"));
        if (box != null) {
            box.style.display = "block";
        }
        fcount--;
        exec_items();
    }
}


//===============================================================
//=================== Find Info =================================

var href_str = ".//h3/a[@href]";
var search_str = "//li[(not(@ppeek_mark))\
                        and ((@class='g') or (@class='g g') or (@class='g no-sep'))\
                        and not(./div/span[contains(@class,'altcts')]/s)\
                        and (" + href_str + ")]";
var acount = 0; //number of link items 

function findInfo() {
    var nodes = docsearch(search_str);
    //message(nodes.snapshotLength);

    if (nodes.snapshotLength == 0) return false;

    if (!pref_enable) return true;

    alist = [];

    for (var i = 0; i < nodes.snapshotLength; i++) {
        acount++;
        var n = nodes.snapshotItem(i);
        n.setAttribute("ppeek_mark", acount);

        var a = indocsearch(href_str, n).snapshotItem(0);
        if (a == null) break;

        if ((a.href == null) || (a.href == "") || (a.href == "about:blank")) break;

        var anode = doc.createElement("a");
        anode.href = a.href;
        if (newTab)
            anode.setAttribute("target", "_blank");
        var box = doc.createElement("div");
        box.id = "ppeek_box_" + acount;
        box.className = "ppeek_box";
        box.style.display = "none";
        anode.appendChild(box);
        n.appendChild(anode);

        var item = new Object();
        item.id = acount;
        item.url = a.href;
        item.text = a.textContent;
        alist.push(item);
    }

    fcount = 0;
    exec_items();

    return true;
}


////===============================================================
////=================== Check Page ================================

var tries = 0;
var max_tries = 10;
var time_period = 1000;
var timeout = null;


function repeatCheck() {
    tries--;

    if (doc.getElementById("xfoot") != null) {
        if (findInfo()) {
            if (pref_enable)
                doc.body.setAttribute("ppeek_pos", docdir);
            enable_button();
        }
    }

    if (tries > 0)
        timeout = win.setTimeout(function () { repeatCheck(); }, time_period);
}


function checkPage() {
    win.clearTimeout(timeout);
    tries = max_tries;
    repeatCheck();
}


var oldfunc = win.onhashchange;
win.onhashchange = function (e) {
    if (oldfunc != null)
        oldfunc(e);
    checkPage();
};

checkPage();


