// ==UserScript==
// @author         InsultComicDog
// @version        2012-09-29
// @name           recommendAllComments
// @namespace      http://www.dailykos.com
// @description    Recommend all comments in a diary - this version also handles checkboxes
// @include        *
// ==/UserScript==

var j=0;
var i=0;
var rbuttons;

function innerloop() {
    if (rbuttons[i].type == 'radio' &&
        rbuttons[i].value == 4 && 
        rbuttons[i].id[0]=='r' &&
        rbuttons[i].checked == false)
    {
        rbuttons[i].checked = true;
        rbuttons[i].click();
        j++;
    }
    else
    {
        if (rbuttons[i].type == 'checkbox' &&
            rbuttons[i].checked == false &&
            rbuttons[i].id[0] == 'r')
        {
            rbuttons[i].checked = true;
            rbuttons[i].click();
            j++;
        }
    }
}
function recommendAllComments2() {
    rbuttons = document.getElementsByTagName('input');
    if (rbuttons.length)
    {
        
        for (i = 0; 
             i < rbuttons.length;
             i++) 
        { 
            var x = setTimeout(innerloop(), 0);
        }
        alert("recommended "+j+" comments");
        
    } 
}
function recommendAllComments() {
    setTimeout(recommendAllComments2(), 0);
}

GM_registerMenuCommand("Recommend All", recommendAllComments, null, "R","R");