// ==UserScript==
// @name       Fantasy online floating wiki bits
// @namespace  http://www.darklan.net/
// @version    1
// @description  creates floating bits of wiki in the fo home page
// @match      http://www.fantasy-mmorpg.com/?server=*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource   jQueryUIStyle http://code.jquery.com/ui/1.9.2/themes/base/minified/jquery-ui.min.css
// @copyright  2012+, Emanuele Conti
// ==/UserScript==

// add jQueryUI style to the page
GM_addStyle(GM_getResourceText("jQueryUIStyle"));

// utilities to read/write cookies
function getCookie(cName) {
    var i, x, y, arrCookies = document.cookie.split(";");
    for (i = 0; i < arrCookies.length; i++) {
        x = arrCookies[i].substr(0, arrCookies[i].indexOf("="));
        y = arrCookies[i].substr(arrCookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cName) {
            return unescape(y);
        }
    }
};

function setCookie(cName, value, expireTime) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireTime);
    var cValue = escape(value) + "; path=/" + ((expireTime == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = cName + "=" + cValue;
};

function CreateFloatingBit(id, page, height, width, top, left) {
    // window border, for dragging and resizing
    var bezel = 5;
    // the container div
    var bit = $('<div />');
    $(bit).attr('id', id);
    $(bit).resizable().draggable();
    $(bit).appendTo($('body'));
    $(bit).height(height).width(width).css('top', top).css('left', left).css('cursor', 'move');
    // top bar
    var bar = $('<div />');
    $(bar).attr('id', id + 'Closer');
    $(bar).height(16).css('background-color', 'navy').css('color', 'white');
    $(bar).appendTo($(bit));
    // closing X
    var close = $('<a>X</a>');
    $(close).css('cursor', 'pointer');
    $(close).click(function() { $(bit).remove();});
    $(close).appendTo($(bar));
    // the content frame
    var frame = $('<iframe></iframe>');
    $(frame).attr('id', id + 'Frame');
    $(frame).attr('src',page);
    $(frame).appendTo($(bit));
    
    // attach resize behaviour
    $(bit).resize(function() { $(frame).height($(bit).height() - $(bar).height() - bezel).width($(bit).width() - bezel)});
    $(bit).resize();
};

CreateFloatingBit('wiki', 'http://www.fantasy-mmorpg.com/fowiki/#24540~3', 600, 600, -15);
CreateFloatingBit('gems', 'http://www.fantasy-mmorpg.com/fowiki/#156071~4', 370, 600, -595, 600);
CreateFloatingBit('imps', 'http://www.fantasy-mmorpg.com/fowiki/#284959~8', 370, 600, -965, 1200);
CreateFloatingBit('battery', 'http://www.fantasy-mmorpg.com/fowiki/#517353~6', 200, 600, -965, 600);
