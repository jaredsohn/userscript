// ==UserScript==
// @name   UTF8Twitter
// @description   Adds menu at top of Twitter web interface so you can add cool UTF8 characters to your tweets!
// @namespace  James
// @version 1.1
// @include http://twitter.com/home*
// @include http://twitter.com/direct_messages*
// ==/UserScript==

var JQ = document.createElement('script');
JQ.src = 'http://jquery.com/src/jquery-latest.js';
JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(JQ);
function wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(wait,100); }
else { $ = unsafeWindow.jQuery; setTimeout(function(){action();},1000); }
}
wait();
function action() {
    $(function(){
        $('<div id="twit_gm_bg"/><div id="twit_gm"><ul/></div>').appendTo('body');
        var c = '♥✈☺♬☑♠☎☻♫☒♤☤☹♪♀✩✉☠✔♂★✇♺✖♨❦☁✌♛❁☪☂✏♝❀☭☃☛♞✿☮☼☚♘✾☯☾☝♖✽✝☄☟♟✺☥✂✍♕✵☉☇☈☡✠☊☋☌☍♁✇☢☣✣✡☞☜✜✛❥♈♉♊♋♌♍♎♏♐♑♒♓☬☫☨☧☦✁✃✄✎✐❂❉❆♅♇♆♙♟♔♕♖♗♘♚♛♜♝♞©®™…∞¥€£ƒ$≤≥∑«»ç∫µ◊ı∆Ω≈*§•¶¬†&¡¿øå∂œÆæπß÷‰√≠%˚ˆ˜˘¯∑ºª?';
        $('#twit_gm ul').css({
            color: 'white',
            fontSize: '18px',
            margin: 0,
            padding: 0,
            position: 'absolute',
            width: '10000px'
        });
        $('#twit_gm_bg').css({
            width: '100%',
            background: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '50px',
            opacity: 0.6,
            borderBottom: '2px solid white'
        });
        $('body').css({paddingTop:'62px'}); /* < You can get rid of this if you don't want the padding to be added to document (on top) */
        $('#twit_gm').css({
            width: '92%',
            margin: '0 4%',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '40px',
            overflow: 'hidden',
            padding: '5px 0'
        });
        c = c.split('');
        $(c).each(function(i){
            $('#twit_gm ul').append('<li>' + c[i] + '</li>');
        });
        $('#twit_gm ul').append('<li id="twit_gm_last"> </li>');
        $('<div id="twit_gm_left">&lt;&lt;</div><div id="twit_gm_right">&gt;&gt;</div>').appendTo('body');
        $('#twit_gm_left,#twit_gm_right').css({
           color: 'white',
           position: 'fixed',
           top: 0,
           width: '4%',
           lineHeight: '50px',
           textAlign: 'center',
           fontWeight: '700',
           fontSize: '1.4em',
           cursor: 'pointer',
           height: '50px'
        });
        $('#twit_gm_right').css({
           right: 0
        }).mousedown(function(){
            if(parseInt($('#twit_gm_last').offset().left,10)>$(document).width()) {
                $('#twit_gm ul').animate({left:'-=500'},600);
            }
        });
        $('#twit_gm_left').css({
          left: 0
        }).mousedown(function(){
            if(parseInt($('#twit_gm li:eq(0)').offset().left,10)<0) {
                $('#twit_gm ul').animate({left:'+=500'},600);
            }
        });
        $('#twit_gm ul li')
            .css({
                float: 'left',
                lineHeight: '40px',
                cursor: 'pointer',
                padding: '0 10px',
                MozBorderRadius: '5px'
            })
            .hover(function(){
                $(this).css({
                   background: '#EEE',
                   color: 'black'
                });
            },function(){
                $(this).css({
                   background: '',
                   color: 'white'
                });
            })
            .click(function(){insertChar(document.getElementById('status'),$(this).text());});
        function insertChar(el,c) {
            if (el.selectionStart || el.selectionStart == '0') {
                el.focus();
                var sPos = el.selectionStart;
                var ePos = el.selectionEnd;
                el.value = el.value.substring(0, sPos) + c + el.value.substring(ePos, el.value.length);
                el.setSelectionRange(ePos+c.length, ePos+c.length);
            } else {
                el.value += c;
            }
        }
    });
}
