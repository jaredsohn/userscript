// ==UserScript==
// @name           让谷歌音乐歌手列表支持快捷键(gm)
// @namespace      http://wagada.com
// @description    让谷歌音乐歌手列表支持快捷键(gm)
// @include        http://www.google.cn/music/artistlibrary*
// ==/UserScript==
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        $(document).keydown(function(e){
            var k = e.keyCode;
            var v = '';
            switch (k) {
                case 65:
                    v = 'A';
                    break;
                case 66:
                    v = 'B';
                    break;
                case 67:
                    v = 'C';
                    break;
                case 68:
                    v = 'D';
                    break;
                case 69:
                    v = 'E';
                    break;
                case 70:
                    v = 'F';
                    break;
                case 71:
                    v = 'G';
                    break;
                case 72:
                    v = 'H';
                    break;
                case 73:
                    v = 'I';
                    break;
                case 74:
                    v = 'J';
                    break;
                case 75:
                    v = 'K';
                    break;
                case 76:
                    v = 'L';
                    break;
                case 77:
                    v = 'M';
                    break;
                case 78:
                    v = 'N';
                    break;
                case 79:
                    v = 'O';
                    break;
                case 80:
                    v = 'P';
                    break;
                case 81:
                    v = 'Q';
                    break;
                case 82:
                    v = 'R';
                    break;
                case 83:
                    v = 'S';
                    break;
                case 84:
                    v = 'T';
                    break;
                case 85:
                    v = 'U';
                    break;
                case 86:
                    v = 'V';
                    break;
                case 87:
                    v = 'W';
                    break;
                case 88:
                    v = 'X';
                    break;
                case 89:
                    v = 'Y';
                    break;
                case 90:
                    v = 'Z';
                    break;
                default :
                    break;
            }
            if(v){
                $("html,body").animate({scrollTop: $("a[name="+v+"]").offset().top}, 500);
            }
        })
    }