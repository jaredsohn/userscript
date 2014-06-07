// TED.com fullscreen video user script
// version 0.1
// Author: Greg Bray (3/13/2010)
// Website: http://blog.theg2.net/
// License: free for personal or commercial use under the Creative Commons Attribution 3.0 United States License.

// ==UserScript==
// @name          TED.com fullscreen video
// @namespace     http://codeblog.theg2.net/2010/03/ted-fullscreen-video-multiple-monitor.html
// @description   Resizes the video player to the full width and height of the screen so you can watch it on a multi-monitor system
// @include http://*.ted.com/*
// @include http://ted.com/*
// ==/UserScript==

//alert('start');
var b=document.body;
var d=document.getElementById('maincontent');
if(d){
    //alert("hit1");
    o = d.getElementsByTagName('object');
    //NOTE: some videos are embeded from youtube. Their parent class is called external_player
    if(o.length==1 && o[0].parentNode.className == "leftColumn"){ //Get video element
        //alert('hit2');
        //Remove existing player from page and store it in object element variable
        oPlayer = o[0].parentNode.removeChild(o[0]); 
        
        //Hide bar at top
        //document.getElementById("header").style.display = "none";
        
        //Get page height and width
        var h = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        var w = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        
        //Create new element to store new player
        z=document.createElement('div');
        intW = (w-35);
        intH = (h-20);
        z.style.width = intW+"px";
        z.style.height = intH+"px";
        z.style.marginLeft = "5px";
        z.style.marginTop = "5px";
        z.style.marginBottom = "10px";
        z.style.backgroundColor = "LightGrey";
        z.style.border = "medium solid black";
        //Have to get embed code from flash variables since the standard flash player does not scale correctly
        strFlashVars = oPlayer.children[6].value;
        strEmbedCode = strFlashVars.substring(strFlashVars.indexOf("embedCode")+10, strFlashVars.indexOf("languageCode")-1);
        strEmbedCode = strEmbedCode.replace(/&lt;/g,"<"); //Convert to HTML
        strEmbedCode = strEmbedCode.replace(/&gt;/g,">");
        strEmbedCode = strEmbedCode.replace(/&quot;/g,'"');
        strEmbedCode = strEmbedCode.replace(/&amp;/g,'&');
        strEmbedCode = strEmbedCode.replace(/width="[0-9]{3,4}"/g,'width="'+intW+'"'); //Resize player
        strEmbedCode = strEmbedCode.replace(/height="[0-9]{3,4}"/g,'height="'+intH+'"');
        strEmbedCode = strEmbedCode.replace(/vw=[0-9]{3,4}/g,'vw='+(intW-12)); //Resize video
        strEmbedCode = strEmbedCode.replace(/vh=[0-9]{3,4}/g, 'vh='+(intH-86));
        z.innerHTML = strEmbedCode;
        b.insertBefore(z, b.firstChild); //Add element to DOM   
    } else { 
        //Error messages disabled so userscript doesn't prompt user on invalid pages
        //alert("Error: TEDFixZoom could not find video object.);
    }
}else{
    //alert('maincontent not found. Make sure TED video page is loaded.');
}
//alert('end');