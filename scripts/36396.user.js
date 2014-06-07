// ==UserScript==
// @name           Delicious for Google Reader
// @namespace      http://delicious.com/userscripts
// @description    Delicious for Google Reader
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*

// ==/UserScript==

// Made with help by looking at existing code ;)

// add a button
var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

var mode;

function nodeInserted(event){
    if (event.target.tagName=="DIV"){
     try{
         if (event.target.className!=""){
             var linkbar;
             
             if (event.target.className=="entry-actions"){
                 linkbar=event.target;
                 mode="list";
                        
             }
             else if (event.target.firstChild && event.target.firstChild.className=="card"){
                 linkbar=event.target.firstChild.firstChild.childNodes[2].
                     childNodes[1].firstChild;
                 mode="expanded";
             }
             else
                 return;
                    
                    
                                
             var btn=document.createElement("span");
             btn.className="tag unselectable link";
             btn.innerHTML="Add to Delicious";
             btn.addEventListener("click", postBookmark, false);
             linkbar.appendChild(btn);
             document.addEventListener("keypress", keyPressed, true);
         }
     }
     catch(e){
         //GM_log(e);
     }
    }
}

function keyPressed(event){
    // Get the keycode for the keypress
    var kcode = (event.keyCode)?event.keyCode:event.which;
    // Get the key pressed in string format
    var k = String.fromCharCode(kcode);

    // If we move away from a Google Reader item, reset the link offset
    if ( k == "d" )
    {    
        var elementName = event.target.nodeName.toLowerCase();
        var typing      = true;
        
        if( elementName == 'input' )
        {
            typing = (element.type == 'text') || (element.type == 'password');
        } 
        else 
        {
            typing = (elementName == 'textarea');
        }
        
        if( typing ) 
        {
            return true;
        }
        
        postBookmark(event);
    }
    
}


function postBookmark(event){    
    var header;
    var parent = document.getElementById('current-entry');
    if (mode == "list")
    {
        header=parent.childNodes[1].firstChild.childNodes[1].firstChild;   
    }
    else
    {
        header = parent.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.firstChild.childNodes[1].firstChild;
    }

    var url=header.getAttribute('href');
    var title=header.textContent;
    
    window.open('http://delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+encodeURIComponent(url)+'&amp;title='+encodeURIComponent(title), 'delicious','toolbar=no,width=550,height=550');
}
