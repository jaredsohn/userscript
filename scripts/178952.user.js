// ==UserScript==
// @name        Twitch.TV Background-B-Gone
// @version    0.9
// @description Removes channel backgrounds only.
// @updateURL https://userscripts.org/scripts/source/178952.meta.js
// @downloadURL https://userscripts.org/scripts/source/178952.user.js
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://www.twitch.tv/directory*
// @exclude        http://www.twitch.tv/inbox*
// @exclude        http://www.twitch.tv/subscriptions*
// @exclude        http://store.twitch.tv
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.min.js
// @grant       GM_addStyle
// ==/UserScript==

var showCheck1 = 0;
var zNode1       = document.createElement ('div');

zNode1.innerHTML = '<button id="myButton1" type="button">'
                + 'B</button>';

zNode1.setAttribute ('id', 'myContainer1');
document.body.appendChild (zNode1);

//--- Activate the newly added button.
document.getElementById ("myButton1").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {

if(showCheck1 == 1) {
$('canvas:nth-of-type(1)').fadeIn("fast");
$("#myButton1").fadeTo("fast", 1).delay(200).css({"color":"white"});
    showCheck1 = 0;
    $.cookie("check", 1, { expires: 7, path: "/" });
}
else if(showCheck1 == 0) {
$('canvas:nth-of-type(1)').fadeOut("fast");
$("#myButton1").fadeTo("fast", 0.5).delay(200).css({"color":"yellow"});
        showCheck1 = 1;
    $.cookie("check", 2, { expires: 7, path: "/" });
}
else {
    
}
       
}

//--- Cookie Check

if($.cookie("check") == 1) {
$('canvas:nth-of-type(1)').fadeIn("fast");
$("#myButton1").fadeTo("fast", 1).delay(200).css({"color":"white"});
    showCheck1 = 0;
}
else if($.cookie("check") == 2) {
$('canvas:nth-of-type(1)').fadeOut("fast");
$("#myButton1").fadeTo("fast", 0.5).delay(200).css({"color":"yellow"});
        showCheck1 = 1;
}
else {
    
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer1 {
        position:               absolute;
        top:                    0;
        left:	 0;
        font-size:              1px;
        border:                 0px outset black;
        margin:                 2px;
        opacity:                10.0;
        z-index:                222;
        padding:                1px 1px;
    }
    #myButton1 {
        cursor:                 pointer;
       	background: 			transparent;
    	border: 				none !important;
        color:					white;
    }
    #myContainer1 p {
        color:                  purple;
        background:             white;
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