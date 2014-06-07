// ==UserScript==
// @name Frendz4m download helper
// @version 1.0
// @author Devjmi
// @description for www.frendz4m.com only
// @date 2011-07-24
// @include http://*.frendz4m.*/*
// @include http://*.fzdownloads.*/*
// ==/UserScript==

var log = function(obj){

try{  
    if(debug){  
        if(!console){  
            console = unsafeWindow.console;  
        }  
        console.log(obj);  
    }  
}catch(e){}  

}

function processLinks(){

try{  
    repairLinks();  
    if(location.href.indexOf("http://www.fzdownloads.com/download2.php")==0)  
        startFzDownload();  
}catch(e){log(e);}  


}

function repairLinks(){

for(var i=0;i<document.links.length;i++){  
    try{  
        var t=document.links[i];  
        // Repair all links here  
        // Repair 1 = Direct Attachment Links  
        if(t.href.indexOf("http://www.fzdownloads.com/link.php?link=download.php")!=-1){  
            t.href=t.href.replace("http://www.fzdownloads.com/link.php?link=download.php","http://www.fzdownloads.com/download2.php");  
            t.target="_blank"+Math.random();  


            var drl=document.createElement("a");  
            drl.setAttribute("href","#");  
            drl.setAttribute("onclick",""+  
                    "this.innerHTML=\"<iframe src=\\\""+t.href+"\\\" width=0 height=0 style=\\\"visibility:hidden\\\"></iframe>\";"+  
                    "return false;"+  
                "");  
            drl.innerHTML='<button id="setit">DOWNLOAD</button>';  
            t.parentNode.insertBefore(drl,t);  
        }  
 if(t.href.indexOf("http://www.frendzforum.org/forum/link.php?link=")!=-1 || t.href.indexOf("frendz4m.com/forum/link.php?link=")!=-1){  
            t.href=t.href.substr(t.href.indexOf("link.php?link=")+14);  
            t.target="_blank"+Math.random();  
        }  

    }catch(e){log(e);}  
}  
       

}

function startFzDownload(){

for(var i=0;i<document.links.length;i++){  
    try{  
        var t=document.links[i];  
        if(t.innerHTML=="Download"){  
            var x=t.href;  
            document.body.innerHTML="<font face=\"Segoe UI\" size=7><a href=\""+x+"\">"+getFzFileName(x)+"</a></font>";  
            location.replace(x);  
            break;  
        }  
    }catch(e){log(e);}  
}  


}

function getFzFileName(x){

try{  
    var y=x.substr(x.lastIndexOf("/")+1);  
    y=y.substr(y.indexOf("-")+1);  
    y=y.substr(y.indexOf("-")+1);  
    return y;  
}catch(e){log(e);} 


}

try{

processLinks();  


}catch(e){log(e);}