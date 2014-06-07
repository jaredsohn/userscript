// ==UserScript==
// @name           Twitter Append secret gadget
// @description    based on Twitter Append dead word.
// @namespace      http://trucktrace.org/
// @include        http://twitter.com/home
// ==/UserScript==

(function() {
    var endpoint = 'http://ja.wikipedia.org/wiki/%E3%83%89%E3%83%A9%E3%81%88%E3%82%82%E3%82%93%E3%81%AE%E9%81%93%E5%85%B7%E4%B8%80%E8%A6%A7';
    var onclick_orig;

    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var submit = w.document.getElementsByClassName('update-button')[0];

    var onclick = function(){
        GM_xmlhttpRequest({
            method : "GET",
            url : endpoint,

            onload : function(response) {
                var font;
                var div = document.createElement('div');
                div.innerHTML = response.responseText;

                var count = 5 + Math.floor(Math.random() * 1526);

                if (font = div.getElementsByTagName('li')[count]){
                    if (font.innerHTML.match(/<.*?>/g)){
                        font = font.innerHTML.replace(/<.*?>/g, "");
                    }
                    else {
                        font = font.innerHTML;
                    }
                    document.getElementById('status').value += ' '
                        + font + '~' + '!'.substr(Math.random()*1);
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

