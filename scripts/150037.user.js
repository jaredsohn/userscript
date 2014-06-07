// ==UserScript==
// @author         InsultComicDog
// @version        2012-10-11
// @name           recAll
// @namespace      http://www.dailykos.com
// @description    Recommend all comments in a diary - this version also handles checkboxes
// @include        * 
// @grant          none
// ==/UserScript==

var j=0;
var i=0;
var z=0;
var x;
var rbuttons;
var tf=1;

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

function loadtheform(){
    formcontents = document.getElementById("rateAllForm");
}

function getTheElements(){
    setTimeout(loadtheform(), 0);
    rbuttons = formcontents.getElementsByTagName('input');
   // alert("length=" + rbuttons.length + ".") 
        }

function ifstatemnt(){
    
    if (rbuttons.length)
    {
        /*while (rbuttons.length == 10 && z<5){
setTimeout(getTheElements(), 0);
z++;
}*/
        
        for (i = 0; 
             i < rbuttons.length;
             i++) 
        { 
            
            x = setTimeout(innerloop(), 0);
        }
        alert("recommended "+j+" comments");
        
    }
}

function recommendAllComments2() {
    
    setTimeout(getTheElements(), 0);
    setTimeout(ifstatemnt(), 0); 
    
}
function recommendAllComments() {
    setTimeout(recommendAllComments2(), 0);
}

GM_registerMenuCommand("RecAll", recommendAllComments, null, "R","R");
