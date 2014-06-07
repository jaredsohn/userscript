// ==UserScript==
// @name           Twitter Append echoic word
// @description    base on Twitter Append dead word.
// @namespace      http://trucktrace.org/
// @include        http://twitter.com/home
// ==/UserScript==
(function() {
    var endpoint = 'http://home.alc.co.jp/db/owa/s_kaydic?num_in='
    var subpoint = '&ctg_in=4';
    var lastIndex = 359;
    var onclick_orig;

    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var submit = w.document.getElementsByClassName('update-button')[0];

    var onclick = function(){
        GM_xmlhttpRequest({
            method : "GET",
            url : endpoint + Math.floor(Math.random() * lastIndex) + subpoint,
            overrideMimeType: "text/html; charset=Shift_JIS",

            onload : function(response) {
                var font;
                var div = document.createElement('div');
                div.innerHTML = response.responseText;

                if (font = div.getElementsByTagName('b')[0]){
                    font = font.innerHTML.replace(/[\s\t\n]*/g, "");
                    document.getElementById('status').value += ' '
                        + font + '!!!'.substr(Math.random()*3);
                }

                submit.onclick = onclick_orig;
                submit.click();
                submit.onclick = onclick;
            }
        });
    return false;
    };
  
    onclick_orig = submit.onclick;
    submit.onclick = onclick;
})();
