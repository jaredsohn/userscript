// ==UserScript==
// @version     0.0.6
// @name        LDR Show B Comments
// @namespace   http://basyura.org
// @include     http://reader.livedoor.com/reader/*
// @author      basyura
// ==/UserScript==

(function (w) {
   
const JSON_API_URL = "http://b.hatena.ne.jp/entry/json/";
const TORIGGER_KEY = "m";
const REMOVE_KEY   = "M";
const ID_COMMENT   = "hatena_bookmark_comment";
const ID_CONTENTS  = "hatena_bookmark_comment";
const CONTENTS_WIDTH_RATE    = 0.8;
const CONTENTS_HEIGHT_RATE   = 0.6;
const CONTENTS_SCROLL_HEIGHT = 40;
       
w.register_hook('after_init', function() {
    w.Keybind.add(TORIGGER_KEY, function() {
        if(isExistComment()) {
           var comment  = appendComment();
           var contents = getSingleNodeValue(comment , ".//div[@id='" + ID_CONTENTS + "']");
            if(contents.scrollHeight <= contents.scrollTop + getContentsHeight()) {
                removeComment();
            }
            contents.scrollTop += CONTENTS_SCROLL_HEIGHT;
        }
        else {
            appendComment().innerHTML = createComment({"title":"loading ...","count":-1,"bookmarks":[]});
            showComments(w.get_active_item(true).link);
        }
    });
    w.Keybind.add(REMOVE_KEY, function() {
        removeComment();
    });
});
// private methods
function showComments(link) {
    var opt = {
        method: 'GET',
        url: JSON_API_URL + link,
        onload: function(res){
            if(!isExistComment()) {
                return;
            }
            var text = "(" + res.responseText +")";
            var bm = text == "(null)" ? {"title":"no comment" , "count":-1,"bookmarks":[]} : eval(text);
            appendComment().innerHTML = createComment(bm);
        },
        onerror: function(res){
        },
    }
    window.setTimeout(GM_xmlhttpRequest, 0, opt);
}
function removeComment() {
    var comment = document.getElementById(ID_COMMENT);
    if(comment != null) {
        document.body.removeChild(comment);
    }
}
function isExistComment() {
    var comment = document.getElementById(ID_COMMENT);
    return comment != null;
}
function appendComment() {
    var comment = document.getElementById(ID_COMMENT);
    if(comment == null) {
        comment = document.createElement("div");
        comment.setAttribute("id"    , ID_COMMENT);
        comment.setAttribute("style" , "position:absolute;width:100%;");
        comment.setAttribute("align" , "center");
        document.body.appendChild(comment);
    }
    return comment;
}
function createComment(bm) {
    var bookmarks = bm.bookmarks.reverse();
    var buf = [];
    buf.push("<div style='width:" + getContentsWidth() + "px;'>");
    buf.push("<div style='background-color:#4872ff;color:#ffffff;padding:5px;' align='left'>");
    buf.push("&nbsp;" + bm.title);
    buf.push("&nbsp;&nbsp;");
    if(bm.count > 0) {
        buf.push("<span style='background-color:#FFCCCC;color:#FF0000;font-size:10pt;padding:2px'>");
        buf.push(bm.count + " users");
        buf.push("</span>");
    }
    buf.push("</div>");
    buf.push("<div id='" + ID_CONTENTS + "' style='");
    buf.push("height:" + getContentsHeight() + "px;");
    buf.push("overflow-y:auto;");
    buf.push("background-color:#f0f0f0;");
    buf.push("border:3px solid #4872ff;");
    buf.push("font-size:10pt;");
    buf.push("' align='center'>");
    buf.push("<div style='width:95%;padding:3px;' align='left'>");
    for(var i = 0 ; i < bookmarks.length ; i++) {
        var b = bookmarks[i];
        if(b.comment == "") {
            continue;
        }
        buf.push("<img src='http://www.hatena.ne.jp/users/ba/" + b.user + "/profile_s.gif'>");
        buf.push("&nbsp;");
        buf.push("<span style='color:blue;'>" + b.user + "</span>");
        buf.push("&nbsp;" + b.comment + "&nbsp;" + b.timestamp);
        buf.push("<hr style='color:#c9f6ff;'>");
    }
    buf.push("</div>");
    buf.push("</div>");
    buf.push("</div>");
    return buf.join("");
}
function getSingleNodeValue(base , reg) {
    return document.evaluate(
                         reg ,
                         base ,
                         null ,
                         XPathResult.FIRST_ORDERED_NODE_TYPE ,
                         null).singleNodeValue;
}
function getContentsHeight() {
   return Math.floor(w.innerHeight * CONTENTS_HEIGHT_RATE);
}
function getContentsWidth() {
   return Math.floor(w.innerWidth  * CONTENTS_WIDTH_RATE);
}
})(this.unsafeWindow || this);
