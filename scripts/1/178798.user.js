// ==UserScript==
// @name       Twitch.TV Above The Chat Bar Hider
// @namespace  http://enut.co/dev
// @version    1.8
// @description  Removes annoying top bar above chat that displays the buttons 'Chat' & 'Videos'
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://www.twitch.tv/directory*
// @exclude        http://www.twitch.tv/inbox*
// @exclude        http://www.twitch.tv/subscriptions*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013+, tracerman but created with the help of google, browsing stackoverflow.com, & looking at the Twitch.TV Tab Complete Userscript
// ==/UserScript==

var showCheck = 0;
var zNode       = document.createElement ('div');

zNode.innerHTML = '<button id="myButton" type="button">'
                + 'O</button>';

zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {

if(showCheck == 1) {
$("#twitch_chat").css({"top":"51px"});
$("#chat").each(function () {
    this.style.setProperty("top", "51px", "important");
});
$("#archives").css({"top":"51px"});
$(".segmented_tabs").css({"visibility":"visible"});
$("#myButton").fadeTo("fast", 1).delay(300).css({"color":"green"});
    showCheck = 0;
}
else if(showCheck == 0) {
$(".segmented_tabs").css({"visibility":"hidden"});
$("#twitch_chat").css({"top":"0px"});
$("#archives").css({"top":"0px"});
$("#chat").each(function () {
    this.style.setProperty("top", "0px", "important");
});
$("#myButton").fadeTo("fast", 0.5).delay(300).css({"color":"purple"});
        showCheck = 1;
}
else {
    
}
       

    }

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    0;
        right:	 0;
        font-size:              1px;
        border:                 0px outset black;
        margin:                 0px;
        opacity:                10.0;
        z-index:                222;
        padding:                0px 1px;
    }
    #myButton {
        cursor:                 pointer;
       	background: 			transparent;
    	border: 				none !important;
        color:					green;
        font-weight:			bold;
    }
    #myContainer p {
        color:                  purple;
        background:             transparent;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}