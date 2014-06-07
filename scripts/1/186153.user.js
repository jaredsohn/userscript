// ==UserScript==
// @name        新浪秀场刷屏
// @namespace   http://userscripts.org/users/softiger
// @description 在新浪秀场回复刷屏。
// @author      softiger
// @downloadURL https://userscripts.org/scripts/source/186153.user.js
// @updateURL   https://userscripts.org/scripts/source/186153.meta.js
// @include     http://ok.sina.com.cn/9*
// @version     0.1
// @grant       GM_addStyle
// @history     0.1 Initial release.
// ==/UserScript==

var msg = new Array();
msg[0] = "[b/23][b/2]";
msg[1] = "[b/20][b/18]";
msg[2] = "[b/48][b/27]";
msg[3] = "[b/46][b/47]";
msg[4] = "[b/18][b/18]";
var msg_i = 0;
var time_interval = 5000;
var time_out_default = '90';
var time_out = 0;
var flag = 1;
var myInterval;
var myTimeout;
var el_txtmsg = document.getElementById ("txtmsg");
var el_btnsend = document.getElementById ("btnsend");

function myTimer() {
    el_txtmsg.value = msg[msg_i];
    el_btnsend.click();
    if ( msg_i < msg.length-1 )
	msg_i++;
    else {
	msg_i = 0;
	if ( time_out ) {
	    myStopInterval();
	    myTimeout = setTimeout (function() {
		myInterval = setInterval(function(){myTimer()},time_interval);
	    },time_out);
	}
    }
}

function myStopInterval() {
    clearInterval(myInterval);
}

function myStopTimeout() {
    clearTimeout(myTimeout);
}

/*--- Create a button in a container div.  It will be styled and
  positioned with CSS.
*/
var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
    + 'Start/Stop/Input</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
      of the screen.
    */
    var mymsg_1 = document.getElementById ('mymsg_1').value;
    var mymsg_2 = document.getElementById ('mymsg_2').value;
    var mymsg_3 = document.getElementById ('mymsg_3').value;
    var mymsg_4 = document.getElementById ('mymsg_4').value;
    if ( mymsg_1 >= 0 && mymsg_1 <= msg.length )
	msg[mymsg_1] = mymsg_2;
    if( !msg[msg.length-1] )
	msg.length--;
    if ( mymsg_3 > 0 && mymsg_3 <= 3600 )
        time_interval = mymsg_3*1000;
    if ( mymsg_4 >= 0 && mymsg_4 <= 3600 )
        time_out = mymsg_4*1000;
    if ( flag == 1 ) {
	myInterval = setInterval(function(){myTimer()},time_interval);
	flag = 0;
	var zNode = document.createElement ('p');
	zNode.innerHTML = 'Started!';
	document.getElementById ("myContainer").appendChild (zNode);
    }
    else {
	myStopInterval();
	if ( time_out )
            myStopTimeout();
	flag = 1;
	var zNode = document.createElement ('p');
	zNode.innerHTML = 'Stopped!';
	document.getElementById ("myContainer").appendChild (zNode);
    }
}

var zNode = document.createElement ('div');
zNode.innerHTML = '<input id="mymsg_1" type="text" placeholder="Index of message">';
zNode.setAttribute ('id', 'myText1');
document.body.appendChild (zNode);

var zNode = document.createElement ('div');
zNode.innerHTML = '<input id="mymsg_2" type="text" placeholder="Content of message">';
zNode.setAttribute ('id', 'myText2');
document.body.appendChild (zNode);

var zNode = document.createElement ('div');
zNode.innerHTML = '<input id="mymsg_3" type="text" placeholder="Time interval">';
zNode.setAttribute ('id', 'myText3');
document.body.appendChild (zNode);

var zNode = document.createElement ('div');
zNode.innerHTML = '<input id="mymsg_4" type="text" placeholder="Timeout" value='
    + time_out_default + '>';
zNode.setAttribute ('id', 'myText4');
document.body.appendChild (zNode);

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
					    #myContainer {
					    position:               absolute;
					    top:                    0;
					    left:                   0;
					    font-size:              20px;
					    background:             orange;
					    border:                 3px outset black;
					    margin:                 5px;
					    opacity:                0.9;
					    z-index:                9999;
					    padding:                1px 2px;
					    }
					    #myButton {
					    cursor:                 pointer;
					    }
					    #myContainer p {
					    position:               absolute;
					    top:                    2em;
					    left:                   0;
					    color:                  red;
					    background:             white;
					    }
					    #myText1 {
					    position:               absolute;
					    top:                    0;
					    left:                   10em;
					    font-size:              20px;
					    background:             green;
					    border:                 3px outset black;
					    margin:                 5px;
					    opacity:                0.9;
					    z-index:                9999;
					    padding:                1px 2px;
					    }
					    #myText2 {
					    position:               absolute;
					    top:                    2em;
					    left:                   10em;
					    font-size:              20px;
					    background:             red;
					    border:                 1px outset black;
					    margin:                 1px;
					    opacity:                0.9;
					    z-index:                9999;
					    padding:                1px 2px;
					    }
					    #myText3 {
					    position:               absolute;
					    top:                    4em;
					    left:                   10em;
					    font-size:              20px;
					    background:             blue;
					    border:                 1px outset black;
					    margin:                 1px;
					    opacity:                0.9;
					    z-index:                9999;
					    padding:                1px 2px;
					    }
					    #myText4 {
					    position:               absolute;
					    top:                    4em;
					    left:                   0;
					    font-size:              20px;
					    background:             black;
					    border:                 1px outset black;
					    margin:                 1px;
					    opacity:                0.9;
					    z-index:                9999;
					    padding:                1px 2px;
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