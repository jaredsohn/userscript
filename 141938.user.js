// ==UserScript==
// @name          Clien Show me the point
// @namespace     http://nuridol.egloos.com
// @description   나는 얼마나 클리앙 폐인인지 보여줍니다.
// @version       1.0.0
// @author        NuRi
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://www.clien.net/*
// @exclude       http://www.clien.net/cs2/bbs/memo.php*
// ==/UserScript==

// ...script by NuRi

// Add jQuery
/*
var GM_JQ = document.createElement('script');
GM_JQ.type = 'text/javascript';
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
*/
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(letsJQuery);

function letsJQuery() {
    $(document).ready(function() {
        // check id
        if (!$("#account p.member_info a")) {
            return;
        }
        var id = $("#account p.member_info a")[0].href.split(",")[1];
        id = id.replace(/%20|'/g, "");
        if (!id) {
            return;
        }

        var profileUrl = "http://www.clien.net/cs2/bbs/profile.php?mb_id=" + escape(id);

        $.get(profileUrl, function(data){
            if (data.search("포인트 : ") > 0) {
                var box= "";
                var plainText = data.replace(/[\n\r]/mg,"");
                var jsSrcRegex = / : ([0-9,]+) /m;
                var pointInfo = jsSrcRegex.exec(plainText);
                if (null != pointInfo) {
                    var point = pointInfo[1];
                    var styleText = "background-color: #D9DFE2;border-radius: 3px 3px 3px 3px;padding: 1px 4px 2px;color: #777;font-size: 9px;font-weight: bold;line-height: 12px;text-shadow: 0 -1px 0 rgba(55, 55, 55, 0.25);vertical-align: baseline;white-space: nowrap;";
                    box= '<div style="width:100%;margin:-7px 0 -5px 0;text-align:center;"><span style="' + styleText + '">';
                    box = box + point + " CP</span></div>";
                    $("#account p.member_info").after(box);
                }
            }
        }); // $.get
    }); // function letsJQuery()
}
