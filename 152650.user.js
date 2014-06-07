// ==UserScript==
// @name       Ikariam SoundNotifier (beta)
// @autor      snet metnee
// @namespace  ikariam
// @version    0.61
// @icon http://us.ikariam.com/favicon.ico
// @description  sound notifier about events
// @downloadURL    https://userscripts.org/scripts/source/152650.user.js
// @updateURL    https://userscripts.org/scripts/source/152650.meta.js
// @include      http://*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var advisors = [];
var alert = true;
$("#advisors li a[class=normal]").parents("li").each(function (){
    advisors.push($(this).attr("id"));
});
if($("#advisors li a[class=normalalert]").length!=0){
    alert=false;
}
$('#advisors li').click(function(){
    if($.inArray($(this).attr('id'), advisors)<0){
        advisors.push($(this).attr("id"));
    }
});
var q = setInterval(function() {
    $.ajax({
        url: window.location.pathname,
        cache: false,
        success: function (code)
        {
            $(code).find("#"+advisors.join(", #")).each(function () {
                if($(this).children('.normalactive').length!=0||(alert&&$(this).children('.normalalert').length!=0)){
                    doIt($(this));
                }
            });
        }
    });
}, 10000);
function doIt(adv){
    var advid = $(adv).attr('id');
    var advclass = $(adv).children('a[class^=normal]').attr('class');
    
    $('#'+advid+" a[class='normal']").attr('class', advclass);
    
    if($('audio').length>0){
        $('audio').remove();
    }else{
        $('body').append('<audio autoplay="autoplay"><source src="http://pandorapanic.googlecode.com/svn-history/r40/trunk/built/music/BadVista/ding.ogg" type="audio/ogg"></audio>');
    }
    
    if(advclass!='normalalert'){
        advisors.splice($.inArray(advid, advisors), 1);
    }else{
        alert = true;
    }
    if(advisors.length<1){
        clearInterval(q);
    }
}
/*end*/