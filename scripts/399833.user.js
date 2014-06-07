// ==UserScript==
// @name        Html Video Player plugin
// @namespace   player
// @description Extra functionality for the html player website
// @include     https://dl.dropboxusercontent.com/u/43280076/web/*
// @version     1.0.0
// @grant       none
// @icon        http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/256/Letter-V-icon.png
// @author      jobin george
// ==/UserScript==
setTimeout(updater,5000);

function updater(){
    dataElement=document.getElementById("data");
    videoupdater();
    dataElement.addEventListener("DOMSubtreeModified",clickEvent,true);
    //dataElement.innerHTML="this noob";
    dataElement.oncontextmenu=function(){return false;};
}

function clickEvent(){
    //alert(dataElement.childNodes);
    var child=dataElement.getElementsByTagName("p");    
    for(var n in child){
      child[n].addEventListener("mouseup",buttoncheck,true);
    }    
    //var tags=document.getElementsByTagName("p");
    //tags[0].innerHTML="YOLO";
}

function buttoncheck(e){
    if(e.button==1){
        //alert("middle mouse was pressed");
        var pr=prompt("Rename the tab "+this.innerHTML,this.innerHTML);
        if(pr.trim()!=""){
        this.innerHTML=pr;
        }
    }
    if(e.button==2){
       var result=confirm("Do u want to delete this");
        if(result==true){
          var parent=this.parentNode;
          parent.removeChild(this);
        }
    }
}
function videoupdater(){
    videoframe=document.getElementById("frame");
    frame.addEventListener("mouseup",videocontrols,true);
    frame.oncontextmenu=function(){return false;};
}
function videocontrols(e){
    if(e.button==1){
        //this.load(); 
        this.pause();
        //this.src="";        
        this.parentNode.innerHTML=this.parentNode.innerHTML;
        this.src="";
        this.addEventListener("mouseup",videocontrols,true);
        this.oncontextmenu=function(){return false;};
    }
    if(e.button==2){
        if(!this.paused){
            this.pause();
        }else{
            this.play();
        }
        
    }        
}