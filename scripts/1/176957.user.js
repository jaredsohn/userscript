// ==UserScript==
// @name        no more backspace plz
// @namespace   ih8backspacingonrs
// @include     *oldschool*.runescape.com*
// @version     1
// ==/UserScript==

$(function(){
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        }
    });
});