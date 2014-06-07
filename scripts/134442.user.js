// ==UserScript==
// @name        ProjectGo Improved
// @namespace   projectgo
// @description Increases the size of the video and also fixes the https problem.
// @author rubtit
// @include     http://www.simplepickup.com/simplepickup-premium/
// @include     http://www.simplepickup.com/simplepickup-premium/*
// @include     https://www.simplepickup.com/simplepickup-premium/*
// @include     https://simplepickup.com/simplepickup-premium/*
// @version     1.1
// ==/UserScript==

window.setTimeout(main, 10);

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

function main() {
    //Add favicon.
    var headID = document.getElementsByTagName("head")[0];         
    var favNode = document.createElement('link');
    favNode.id = 'favicon';
    favNode.rel = 'icon';
    favNode.type = 'image/png';
    favNode.href = 'http://i.imgur.com/R3aA7.png';
    headID.appendChild(favNode);


    
    var url = window.location.href;
    console.log(url);
    if(url.startsWith("https")){
        window.location.href= window.location.href.replace("https", "http");
    }

    console.log("HELLOWORLD");
    var myObjs = document.getElementsByTagName("iframe");



    var i=0;
    for(var i=0; i<myObjs.length; i++){
        myObjs[i].width=800;
        myObjs[i].height=450;
        
        
    }

    var c = document.getElementById('container');
    c.style.width="1000px";
    var c = document.getElementById('centeredmenu');
    c.style.width="1080px";


    var elemts = document.getElementsByClassName("tablestyle1");
    var i=0;
    for(var i=0; i<elemts.length; i++){
        elemts[i].style.width="100%";
        
        
        
    }

    var elemts = document.getElementsByClassName("maxwidth");
    var i=0;
    for(var i=0; i<elemts.length; i++){
        elemts[i].style.width="100%";
        elemts[i].style.border="none";
        
        
    }


}
