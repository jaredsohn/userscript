// ==UserScript==
// @name        TamTay Original Pictures
// @namespace   ranmeus.tk
// @require     //ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-start
// @description Shows original pictures in photo.tamtay.vn albums.
// @include     http://photo.tamtay.vn/xem-anh/*/*
// @version     0.0.1
// ==/UserScript==

var eventsCache = {};
window.addEventListener('beforescriptexecute', function(e) {
    e.stopPropagation();
    e.preventDefault();
    eventsCache.bse = {};
    eventsCache.bse.type = e.type;
    eventsCache.bse.callee = arguments.callee;
}, true);

$(function(){
    window.removeEventListener(eventsCache.bse.type, eventsCache.bse.callee, true);
    var title = $("title"), head = $('head'), body = $('body'), cStr = "small", alt = $('.titleDetailArticle').text()+' ', isOri=false, pix = [], i;
    var elems = $('#containerLeft .btn.liTool1 a[href*="original"]'), bUrl = 'http://photo.tamtay.vn';
    head.empty().append(title);
    $('<style type="text/css">').text('img{display:block;} .small{height:300px; margin: 5px; display:inline;}').appendTo(head);
    body.empty();
    $('<input type="button" value="toggle Size"/>').
        click(function(){if (isOri) {$('img').addClass(cStr);} else {$('img').removeClass(cStr);} isOri = !isOri;}).
        appendTo($('<div>').appendTo(body));
    for (i = 0; i<elems.length;i++) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.pos = i;
        pix.push($('<img>').addClass(cStr).attr('alt',alt+i).
            click(function(){$(this).toggleClass(cStr);}).
            appendTo(body));
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $(pix[this.pos]).attr('src', $('<div>').
                    html(this.responseText).
                    find('.imgDetailArticle img').attr('src'));
            }
        }
        xmlhttp.open('GET',bUrl + $(elems[i]).attr('href'),true);
        xmlhttp.send();
    }
});
