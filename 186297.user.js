// ==UserScript==
// @name       GroupMe clean style
// @namespace  http://userscripts.org/scripts/show/186297
// @version    0.45
// @description  Change GroupMe styleing to something cleaner. More text possible in chatwindow. This script is still beta and due to possible changes!
// @include      https://app.groupme.com/chats
// @include		http://www.groupme.com
// @include		https://app.groupme.com/
// @copyright  2013+, Marco van der Laan, EnterZ
// ==/UserScript==

/*
 * Changelog
 * 
 * 2013-12-19 [0.2] 	- Added IRC style nicks. 
 * 						- Include pattern changes so it works without a refresh.
 * 			  [0.3]		- Eliminate blue colours, change them to green.
 * 			  [0.4]		- It's not easy being green! 
 * 			  [0.45]	- Fixxed some things with the likes, not 100% but works better.
 * 						- Some more green accents.	
 */

// function shamelessly ripped from http://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
// thx for helping there!
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(function(){
    var showAvatar = false;
    var inlineChat = true;
    var enlightened = true;
    
    addGlobalStyle('.chat-messages .message.separator { padding-top: 3px; padding-bottom:1px; }');
    addGlobalStyle('.chat-messages .message.bookend { padding-bottom: 1px; }');
    addGlobalStyle('.chat-messages .message.separator .likes-container {margin-top: -10px;}'); // hearts.. not 100% this way, but better..
    if(!showAvatar){
        addGlobalStyle('.chat-messages .avatar.gutter { display: none; }');
        addGlobalStyle('.chat-messages { padding-left: 6px; }');
    }
    if(inlineChat){
        addGlobalStyle('.chat-messages .text .body {display: inline; }');
        addGlobalStyle('.chat-messages .message.separator .nickname, .chat-messages .message.separator img.avatar {display: inline; font-weight: bold;} ');   
        ircStyleNick();
    }
    if(enlightened){
        addGlobalStyle( ".navbar-inner {background: #9ae23b; background: -moz-linear-gradient(top, #9ae23b 0%, #54ad2e 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9ae23b), color-stop(100%,#54ad2e)); background: -webkit-linear-gradient(top, #9ae23b 0%,#54ad2e 100%); background: -o-linear-gradient(top, #9ae23b 0%,#54ad2e 100%); background: -ms-linear-gradient(top, #9ae23b 0%,#54ad2e 100%); background: linear-gradient(to bottom, #9ae23b 0%,#54ad2e 100%);                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9ae23b', endColorstr='#54ad2e',GradientType=0 ); }");
        addGlobalStyle('.btn-primary {background-color: #00C800;} ');
        addGlobalStyle('.btn-primary:hover {background-color: #00AA00;} ');
        addGlobalStyle('#tabbed-chats li {border-right: 1px solid #00C800;} '); 
        addGlobalStyle('#tabbed-chats li:hover>a{background:#00AA00;transition:background .2s 0 ease;color:white!important}'); 
        addGlobalStyle('.navbar .burger-box {border-right: 1px solid #00AA00;} ');
        addGlobalStyle('.navbar .burger-box:hover{background:#00C800;transition:background .2s 0 ease;color:white!important}');        
        // button flashing 
        addGlobalStyle('.navbar .burger-box:hover{background:#OOAA00;transition:background .2s 0 ease;color:white!important}');
        addGlobalStyle('body.signup .btn-success:hover{background-color:#00AA00}');
        // 40CCFF -> 00AA00
        addGlobalStyle('@-moz-keyframes pulsateBackground{0%{background:#00aff0}100%{background:#40ccff}}@-webkit-keyframes pulsateBackground{0%{background:#00aff0}100%{background:#00AA00}}@keyframes{0%{background:#00aff0}100%{background:#00AA00}}');
        addGlobalStyle('#tabbed-chats li.unread>a{background:#00AA00}');
        // 5ad3ff -> 54FF16
        addGlobalStyle('#tabbed-chats li.unread>a:hover{background:#3CB510;transition:background .2s 0 ease}'); 
        // own backgroundcolour text
        addGlobalStyle('.chat-messages .message.me{background-color:#E6FFD8}'); //D8FFCD
        // a href
        addGlobalStyle('a {color: #00C800}');
        addGlobalStyle('a:hover {color: #00AA00}');
        
    }
});

function ircStyleNick() {

$(document).bind('DOMNodeInserted', function(event) {
        if(event.type == "DOMNodeInserted"){
            if(event.target.className == "nickname ng-binding"){
                var nick = event.target.innerHTML;
                event.target.innerHTML = "&lt;" + nick + "&gt;";
                event.target.innerText = "<" + nick + ">";
                //console.log(event);
            }
        }
    });
}


    
    
