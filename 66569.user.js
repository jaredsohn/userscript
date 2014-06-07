// ==UserScript==
// @name        colorReply
// @namespace   http://mstssk.blogspot.com/
// @include     *://twitter.com/*
// @exclude     *://twitter.com/#replies
// @description Coloring reply tweet for you.
// ==/UserScript==

const propertyName = 'color';
var color = GM_getValue(propertyName, 'oldlace');
GM_registerMenuCommand("configure color[colorReply]", function(){
    var msg = "Type color name, #rrggbb style or HTML color name";
    var new_color = prompt(msg,color);
    if(new_color){
        GM_setValue(propertyName, new_color);
        execute();
    }
});
function execute(){
    var $ = unsafeWindow.$;
    var screen_name = $('meta[name="session-user-screen_name"]').attr('content');
    $('body:not(#replies) #timeline li.status a.username[href="/'+screen_name+'"]')
    .expire().livequery(function(){
        $(this).closest('li').css("background-color",color);
    });
}
execute();
