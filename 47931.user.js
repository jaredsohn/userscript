// ==UserScript==
// @name          Sellaband Main Menu Enhancer
// @namespace     http://scrobble.me/sellaband
// @description   This userscript extends the main menu with useful links.
// @include       http://*.sellaband.com/*
// @include       http://sellaband.com/*
// ==/UserScript==


addStyle('.tab { font-weight: bold ! important; padding: 5px ! important;}');
addStyle('.tab:hover { color: rgb(255,255,255) ! important; background-color: #D21F28 ! important }');
addStyle('#menu-block {text-align: center ! important; height:70px ! important;  }');
addStyle('#menutop { width:100px ! important; }');

addChild('menu-items', '<a class="menutop" href="http://forum.sellaband.com/sabforum.php">Forum</a>');
addChild('menu-items', '<a class="menutop" href="http://www2.sellaband.com/chat">Chatroom</a>');
addChild('menu-items', '<a class="menutop" href="http://www2.sellaband.com/sixpack">Sixpack</a>');

var arenafestPattern = /.*arenafest\.sellaband\..*/;
if (location.href.match(arenafestPattern)) {
    addChild('menu', '<br />');
    addChild('menu', '<a class="menutop" href="http://forum.sellaband.com/sabforum.php">Forum</a>');
    addChild('menu', '<a class="menutop" href="http://www2.sellaband.com/chat">Chatroom</a>');
    addChild('menu', '<a class="menutop" href="http://www2.sellaband.com/sixpack">Sixpack</a>');
}

/**
 This method adds a style item to the head element.
 */
function addStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/**
 This method adds a child to the parent specified by its id.
 */
function addChild(id, child){
    var parent;
    parent = document.getElementById(id);
    if (!parent) {
        return;
    };
    parent.innerHTML = parent.innerHTML + child;
    
}

