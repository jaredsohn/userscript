// ==UserScript==
// @name       优酷页内全屏播放
// @namespace  http://org.tuuboo.youku/fullpage
// @version    0.1
// @description  优酷网播放页左下角，加上页内全屏播放按钮，点击切换是否在页内进行全屏观看。
// @match      http://v.youku.com/v_show/*
// @copyright  tuuboo
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { letsJQuery(); }
}
GM_wait();
 
var tuuboo_show = true;
// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    jQuery.noConflict(); 
    jQuery(document).ready(function () {
        var bg = "background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABVSURBVDhPtY1LEsAgCEO9/4obebQaK6P4GZBq38okviHQJ7L2OGla3Oa2hjg0EkyaVuBKgNLWCjy8IP6mcSVAqWkcJjCtNZ0bmotOw8Ok/jy45oYoAe0PouMxXdX1AAAAAElFTkSuQmCC);";
        jQuery("<div style='position:fixed; bottom:0px;left:0px;width:18px;height:16px;z-index:2;"+bg+"' title='页内全屏开关'></div>")
        .appendTo(jQuery(document.body)).click(function(){
            if(tuuboo_show == true){
                jQuery("#qheader,#commentAction,#vpactionv5_wrap,#sideTool,#player_sidebar,#vpofficialinfov5").hide();
                jQuery("#player").css({"position":"fixed", "top":"3px", "right":"3px", "bottom":"3px", "left":"3px", "height":"100%", "width":"auto"});
                tuuboo_show = false;
            }else{
                jQuery("#qheader,#commentAction,#vpactionv5_wrap,#sideTool,#player_sidebar,#vpofficialinfov5").show();
                jQuery("#player").attr("style", "");
                tuuboo_show = true;
            }
        });
    });
}
