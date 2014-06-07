// ==UserScript==
// @name           Reddit Account Switcher
// @namespace      http://reddit.com
// @description    Easily switch between multiple accounts while browsing reddit.
// @include        http://*.reddit.com/*
// ==/UserScript==

if(typeof unsafeWindow == 'undefined') var unsafeWindow = window;
var $ = unsafeWindow.jQuery;

SU = function () {    

    var users = {
      "account": "password",
      "example": "password"
    };
    
    var init = function(){

        var current = $(".user").text().split("(")[0].trim();
        var menu = '<div class="drop-choices srdrop">';

        for(var u in users){
            if (current !== u) {
                menu += '<a class="choice user-choice" href="javascript:void(0)">' + u + '</a>';
            }
        }
        menu += '</div>';
        
        $('span.user').css('background', 'url("/static/droparrowgray.gif") no-repeat right')
            .css('padding-right', '21px')
            .after(menu)
            .click(function(){
                $(this).siblings(".drop-choices").not(".inuse").css("width", $('span.user').width() + "px")
                    .addClass('active inuse');
            });
            
        $('.user-choice').each(function(i, e){
            $(e).click(function(){
                
                var user = $(e).text();
                $.post("/logout", $(".logout:eq(0)").serialize(), function(){
                    $.post("/post/login", { user: user, passwd: users[user] }, function(){
                        window.location.reload();
                    });
                });
                
            });
        });
        
    };
    
    return {
        'init': init
    };
    
}();

if($){
    SU.init();
}