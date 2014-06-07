// ==UserScript==
// @name       Xbox Music Keys
// @namespace  http://millisoft.me/
// @version    2.1
// @description  Allows you to use keys to manipulate the XBox Music player. Space: play/pause.
// @match      http://music.xbox.com/*
// @copyright  2013+, Michael Stack
// ==/UserScript==

$(document).keydown(function(e) {
    if(!$("input").is(":focus")) { //previous selector: #searchValue
        var handled = false;
        switch(e.keyCode)
        {
            case 32: //SPACE
                var $pauseBtn = $(".iconPlayerPause");
                var $playBtn = $(".iconPlayerPlay");
                if($playBtn.length < 1)
                    $pauseBtn.click();
                else $playBtn.click();
                handled = true;
                break;
            case 37: //LEFT
                var $previousBtn = $(".iconPlayerPrevious");
                $previousBtn.click();
                handled = true;
                break;
            case 39: //RIGHT
                var $nextBtn = $(".iconPlayerNext");
                $nextBtn.click();
                handled = true;
                break;
        }
        if(handled)
            e.preventDefault();
    }	
});