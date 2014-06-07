// ==UserScript==
// @name            [udit]add stumblethru image-flip button[w/o container] on all websites
// @namespace       testing-for-that-script
// @description     
// @include         http://facebook.com/*
// @include         http://*
// @include         https://*
// @include         *
// @exclude         file:///*
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
{
    //Optional: GM_log ('In frame');
    return;
}

/*--- Create a button in a container div.  It will be styled and positioned with CSS.
*/
var zNode       = document.createElement ('input');
zNode.setAttribute ('id', 'suButton');
zNode.setAttribute( 'type', 'image' );
zNode.setAttribute( 'src', 'http://www.creativeadornments.com/nephco/doraemon/icons/doraemon_18a.gif' );
document.body.appendChild (zNode);

function tiddu1()
{
document.getElementById("suButton").src ="http://www.creativeadornments.com/nephco/doraemon/icons/doraemon_07.gif";
}

function tiddu2()
{
document.getElementById("suButton").src ="http://www.creativeadornments.com/nephco/doraemon/icons/doraemon_18a.gif";
}

function tiddu3()
{
document.getElementById("suButton").src ="http://www.creativeadornments.com/nephco/doraemon/icons/dorami_01a.gif";
}

function tiddu4()
{
document.getElementById("suButton").src ="http://t1.gstatic.com/images?q=tbn:ANd9GcSI_hx0nLvnO-Em6elAxyMnoBFGw8IMD3Yrpep4XY2I51GylSRf3jHiabAyiw";
}

//--- Activate the newly added button and add rollover image handling.
var zNode = document.getElementById ("suButton");
zNode.addEventListener ("click",        ButtonClickAction,  true);
zNode.addEventListener ("mouseover",    tiddu1,          true);
zNode.addEventListener ("mouseout",     tiddu2,           true);
zNode.addEventListener ("mousedown",     tiddu3,           true);
zNode.addEventListener ("click",     tiddu4,           true);

function ButtonClickAction (zEvent)
{
    //--- For our dummy action, we'll just add a line of text to the top of the screen.
    var button  = document.createElement ('a');
    location.href='http://www.stumbleupon.com/to/stumble/stumblethru:'+location.href.replace("http://","").replace("https://","").replace("ftp://","").split('/',4)[0];
}

//--- Style our newly added elements using CSS.
GM_addStyle ( (<><![CDATA[
    #suButton {
        position:               fixed;
        bottom:                 0px;
        left:                   0px;
        margin:                 0px 0px 50px 0px;
        opacity:                0.8;
		cursor:                 url(C:\buttercup_06.cur),url(http://www.creativeadornments.com/nephco/powerpuffgirls/cursors/ppg_01anim.gif),url(myBall.cur),pointer;
        border:                 0px outset red;
        z-index:                222;
        padding:                5px 5px;
	}
]]></>).toString () );
