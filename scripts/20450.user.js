// ==UserScript==
// @name           Twitter Append Cinema Copy
// @description    base on Twitter Append dead word.
// @namespace      http://trucktrace.org/
// @include        http://twitter.com/home
// ==/UserScript==
(function() {
    var endpoint = 'http://www.javara.net/cinenavi/detail.php?rec_id='
    var lastIndex = 1933;
    var onclick_orig;

    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var submit = w.document.getElementsByClassName('update-button')[0];

    var onclick = function(){
        GM_xmlhttpRequest({
            method : "GET",
            url : endpoint + Math.floor(Math.random() * lastIndex),
            overrideMimeType: "text/html; charset=EUC-JP",

            onload : function(response) {
                var words;
                var all_ary = [];
                var words_ary = [];
                var count;
                var font;
                var div = document.createElement('div');
                div.innerHTML = response.responseText;

                if (words = div.getElementsByTagName('span')[0].innerHTML){
                    all_ary = words.replace(/[\s\t\n]*/g, "").split("<br>");
                    for (var i=0; i<all_ary.length; i++){
                        if (all_ary[i]){
                            all_ary[i] = all_ary[i].replace(/\uFF01/g, '!');
                            all_ary[i] = all_ary[i].replace(/\uFF1F/g, '?');
                            all_ary[i] = all_ary[i].split(/[\u3002|\u3001|\u2014|!]+$/g)[0];
                            words_ary.push(all_ary[i]);
                        }
                    }
                    if (words_ary[0]){
                        count = Math.floor(Math.random()*words_ary.length);
                        font = words_ary[count];
                        document.getElementById('status').value += ' '
                            + font + '!!!'.substr(Math.random()*3);
                    }
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

