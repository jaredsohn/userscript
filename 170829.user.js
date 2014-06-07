// ==UserScript==
// @id             elitecsprotetorremove
// @name           EliteCDS and JairzinhoCDS Protector Remover
// @version        2013.07.14
// @namespace      https://github.com/hotvic
// @author         Victor Aurélio
// @description    Remove EliteCDS link protetor
// @include        http://elitecds.com.br/baixar-*
// @include        http://jairzinhocds.com.br/baixar-*
// ==/UserScript==


var buttons = document.getElementsByClassName('link-download-1')[0].getElementsByTagName('a');
var expander;

// if isn't elitecds use 'link-dow-med1' class
if (!buttons) {
    var buttons = document.getElementsByClassName('.link-dow-med1')[0].
         getElementsByTagName('a');
}

function replacebutton(btn) {
    return function (ro) {
        btn.href = JSON.parse(ro.responseText).longUrl;
    };
}

for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].href.match(/url:=/)) {
        var url = buttons[i].href.replace(/.*url:=(.*)/, "$1");
        buttons[i].href = url;
        
        expander = GM_xmlhttpRequest({'method': 'GET',
                                      'onload': replacebutton(buttons[i]),
                                      'synchronous': false,
                                      'url': 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=' + encodeURIComponent(url)});
    }
}
