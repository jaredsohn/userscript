// ==UserScript==
// @name           Fuck 8000
// @namespace      Fuck 8000
// @description    Fuck 8000, yes we can~
// @include        http*
// @version        1.0.0
// ==/UserScript==

var fuck_8000_max_try_num = 5,
    fuck_8000_timer = setInterval(function(){
        try{
            if(fuck_8000_max_try_num == 0){ clearInterval(fuck_8000_timer); }

            // redirect url
            if(document.URL.indexOf('tencentrawurl') != -1){
                location.href = decodeURIComponent(document.URL.replace(/.*?tencentrawurl=/g, ''));
            }

            // anti fucked
            if(document.title == "温馨提示" && fuck_8000_max_try_num > 0){
                document.getElementById("btnVisit30").click();
                document.getElementById("btnVisit").click();
            }

            // save login info
            if(document.URL.indexOf('passport.oa') != -1){
                // auto fill username
                var cookie = document.cookie;
                if(cookie.indexOf('t_uid') != -1){
                    document.querySelector('#txtLoginName').value = cookie.replace(/.*?t_uid=(\w*).*/, '$1');
                    document.querySelector('#txtPassword').focus();
                }
            }
        }catch(e){}

        fuck_8000_max_try_num --;
    }, 500);