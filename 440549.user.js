// ==UserScript==
// @name       Twitch Chroma Chat
// @author	   TraCeRMan
// @version    0.4
// @description  Chroma Key Style Background for Twitch Chat
// @updateURL https://userscripts.org/scripts/source/440549.meta.js
// @downloadURL https://userscripts.org/scripts/source/440549.user.js
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://www.twitch.tv/*/dashboard
// @exclude        http://www.twitch.tv/inbox*
// @exclude        http://www.twitch.tv/subscriptions*
// @exclude        http://store.twitch.tv
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_addStyle
// @copyright  2013+, tracerman
// @run-at	document-end
// ==/UserScript==

	var chatInt = $(".chat-interface").css("background-color");
    var showCheck72 = 0;
	var zNode14       = document.createElement ('div');

zNode14.innerHTML = '<button id="myButton14" type="button">'
                + 'C</button>';

zNode14.setAttribute ('id', 'myContainer14');
document.body.appendChild (zNode14);

//--- New Features

    
//--- Activate the newly added button.
document.getElementById ("myButton14").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    if(showCheck72 == 1) {
     chatInt = $(".chat-interface").css("background-color");
        if (chatInt == "rgb(220, 220, 220)"){
            $(".chat-messages").each(function () {
      	this.style.setProperty("background", "#dcdcdc", "important");
});
        }
        else if (chatInt == "rgb(255, 255, 255)"){
            $(".chat-messages").each(function () {
      	this.style.setProperty("background", "white", "important");
});
        }
        else
        {
            $(".chat-messages").each(function () {
      	this.style.setProperty("background", "rgb(30, 30, 30)", "important");
});
        }
        
    $(".chat-messages").each(function () {
      	//--- this.style.setProperty("background", chatBack, "important");
        this.style.setProperty("font-weight", "");
});
       $(".chat-messages").each(function () {
        this.style.setProperty("background", "");
}); 
       //--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    .chat-messages {
    	font-size:			13.33333px !important;
    }
    .message {
        text-shadow:               none;
    }
    .from {
        text-shadow:               none;
    }
*/} ) );
$("#myButton14").fadeTo("fast", 1).delay(200).css({"color":"green"});
    showCheck72 = 0;
}
else if(showCheck72 == 0) { 
    $(".chat-messages").each(function () {
      this.style.setProperty("background", "#00ff00", "important");
      this.style.setProperty("font-weight", "bold");
});
        
        //--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    .chat-messages {
    	font-size:			14.5px !important;
    }
    .message {
        text-shadow:               -1px 1px 10px white, 1px -1px 10px #fff;
    }
    .from {
        text-shadow:               -1px 1px 8px yellow, 1px -1px 8px #fff;
    }
    
*/} ) );
    
$("#myButton14").fadeTo("fast", 0.5).delay(200).css({"color":"red"});
        showCheck72 = 1;
}
else {
    
}
    
}
                    

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer14 {
        position:               absolute;
        bottom:                    0;
        right:					0;
        font-size:              10px;
        border:                 0px outset black;
        margin:                 0px;
        opacity:                10.0;
        z-index:                255;
        padding:                0px 1px;
    }

    #myButton14 {
        cursor:                 pointer;
       	background: 			transparent;
    	border: 				none !important;
        color:					green;
        font-weight:			bold;
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