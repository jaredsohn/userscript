// ==UserScript==
// @name       TinkerBin++
// @namespace  http://forum.valorsolo.com/
// @version    0.1
// @description  Ctrl+Up to remove side bar, Ctrl+Down to bring it back...Ctrl+, and Ctrl+. to resize the output area
// @include    http://tinkerbin.com/*
// @copyright  None
// ==/UserScript==

window.addEventListener('keydown', KeyCheck, true);

var toolbar = document.getElementById('toolbar');
var logo = document.getElementById('logo');
var editorPane = document.getElementById('editorPane');
var outputPane = document.getElementById('outputPane');
var area = document.querySelector('#area');
//Why do I have to do the below? Why cant it just get it from the css sheet?
editorPane.style.width='50%';
outputPane.style.left ='50%';
outputPane.style.width ='50%';

function KeyCheck(e)
{


    if (e.ctrlKey) {
        switch (e.keyCode)
        {
        case 190:
            // Key left = Ctrl+,
            var len=editorPane.style.width;
            len=Number(len.substr(0,len.length-1));
            len+=10;
            if (len>90) len =90;
            editorPane.style.width=len+'%';
            outputPane.style.left=len+'%';
            outputPane.style.width=100-len+'%';
            break;
        case 38:
            // Key up.
            toolbar.style.display='none';
            logo.style.display='none';
            area.style.left='0px';
            break;
        case 188:
            // Key right = Ctrl+.
            var len=editorPane.style.width;
            len=Number(len.substr(0,len.length-1));
            len-=10;
            if (len<10) len =10;
            editorPane.style.width=len+'%';
            outputPane.style.left=len+'%';
            outputPane.style.width=100-len+'%';
            break;
        case 40:
            // Key down.
            toolbar.style.display='block';
            logo.style.display='block';
            area.style.left='200px';
            break;

        }
    }


}