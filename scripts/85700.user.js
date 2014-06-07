// ==UserScript==
// @name        e-hentai tags
// @description Show all tags
// @include     http://g.e-hentai.org/*
// @exclude     http://g.e-hentai.org/g/*
// @exclude     http://g.e-hentai.org/s/*
// @include     http://exhentai.org/*
// @exclude     http://exhentai.org/g/*
// @exclude     http://exhentai.org/s/*
// @downloadURL   https://userscripts.org/scripts/source/85700.user.js
// @updateURL     https://userscripts.org/scripts/source/85700.user.js
// @version       2013.6.8e
// @author      Rikis
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function JQ_wait() {
    if (typeof $ != 'undefined') {
        JQ_ready();
    } // Opera
    else if (typeof this.jQuery != 'undefined') {
        $ = this.jQuery;
        JQ_ready();
    } // Chrome
    else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') {
        $ = unsafeWindow.jQuery;
        JQ_ready();
    } // Firefox
    else window.setTimeout(JQ_wait, 100);
};
JQ_wait();

function JQ_ready() {
    function TagIt(k) {    
        var all = $('div.tfl[style*="-'+(17*k+1)+'px"]');
        if (all.length == 0) {
            all = $('div.tft[style*="-'+(17*k+1)+'px"]');
        }
        all.each(function () {
            
            var imgx = $(this);
				    function proccolor() {
				        switch (imgx[0].style.backgroundPosition) {
				        case "0px -1px":
				            return ('Red');
				        case "0px -18px":
				            return ('Coral');
				        case "0px -35px":
				            return ('Olive');
				        case "0px -52px":
				            return ('#00a000');
				        case "0px -69px":
				            return ('Blue');
				        case "0px -86px":
				            return ('Magenta');
				        }
				    }	            
				            var btf = imgx.attr("title").split(/,[ ]*/);
            var newlist = new Array();
            btf.forEach(function (item) {
                newlist.push(
                  item.split(':').pop().trim()
                );
            });
            var el = imgx[0].parentNode.parentNode.parentNode;
            $(el.getElementsByClassName("it5")[0]).append(' <font color=' + proccolor() + '>[' + newlist.join(', ') + ']</font>');
            $(el.getElementsByClassName("id2")[0]).prepend('<font color=' + proccolor() + '>[' + newlist.join(', ') + ']</font> ');
            imgx.detach();
        })
    }
    $(".it5").css("height", "auto"); 
    TagIt(0);
    TagIt(1);
    TagIt(2);
    TagIt(3);
    TagIt(4);
    TagIt(5);
};