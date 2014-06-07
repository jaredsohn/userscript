// ==UserScript==
// @name        TwilogFriendsEliminator
// @namespace   http://enmps.net
// @description Delete all tweets mentioning to specific user on Twilog.org / Twilog.org上で特定ユーザ宛への@ツイートを全削除する
// @include     http://twilog.org/*/friends-*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       none
// ==/UserScript==
$("div#info").before(
    $("<button />")
        .attr("id", "TwilogFriendsEliminator")
        .text("このページに表示されている全てのツイートを削除")
        .click(function()
        {
            if(window.confirm("本当に削除しますか？（操作のキャンセル・差し戻しはできません）"))
            {
                var originConfirm = window.confirm;
                window.confirm = function(){return true ;}
                
                var i = 0;
                var $dels=$("span.tl-del>a")
                
                var timer;
                timer=setInterval(function()
                {
                    $dels[i].click();
                    
                    i++;
                    
                    if(i >= $dels.length)
                    {
                        clearInterval(timer);
                        window.confirm=originConfirm;
                        
                        $("button#TwilogFriendsEliminator").text("削除完了！").attr("disabled", "disabled");
                        window.location.reload();
                    }
                }, 1000);
            }
        })
);