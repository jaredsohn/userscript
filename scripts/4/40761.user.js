// ==UserScript==
// @name           Alacarta Video downloader
// @namespace      scripts.laforca.info
// @description    Permite Bajar videos del alacarta, de RTVE.// http://scripts.laforca.info  - (c)chapuzzo GPL
// @include        http://www.rtve.es/alacarta/*
// ==/UserScript==


function llbt(strid){

GM_xmlhttpRequest({
            method:"GET",
            url:strid.replace(/luismi_gv-/,"http://www.rtve.es/alacarta/player/")+'.xml',
            onload:function(xmlhttp) {
              var resp=xmlhttp.responseText;
               var com=resp.search(/<location>/);
               var tro=resp.substr(com+10);
               var fin=tro.search(/<\/location/);
               var r=tro.substr(0,fin);
                   
                   with(document.getElementById(strid)){
                   href = r.replace(/rtmp:\/\/stream.rtve.es\/stream/,"http://www.rtve.es");
                   }
                   with(document.getElementById(strid.replace(/-/,"--"))){
                   disabled = false;
                   style.background = '#ee0033';
                   value='↓';
                   }
            }
         });



}

var vid=document.getElementsByClassName("video")[0];

if (vid){
var frm=document.createElement("form");
var but=document.createElement("input");
but.value="×";
but.id="bajarVideo";
but.type="submit";

frm.method="post";
//frm.target="_blank";

var w = document.location.href;
var nw = w.replace(/html/,"xml") ;
but.disabled=true;
frm.action=nw;

          GM_xmlhttpRequest({
            method:"GET",
            url:nw,
            onload:function(xmlhttp) {
              var resp=xmlhttp.responseText;
               var com=resp.search(/<location>/);
               var tro=resp.substr(com+10);
               var fin=tro.search(/<\/location/);
               var r=tro.substr(0,fin);
                   
                   with(document.getElementById("bajarVideo")){
                   parentNode.action=r.replace(/rtmp:\/\/stream.rtve.es\/stream/,"http://www.rtve.es");
                   disabled=false;
                   value='↓';
                   }
            }
         });

vid.parentNode.insertBefore(frm,vid);
frm.appendChild(but);
frm.appendChild(vid);
}

links = document.evaluate(
         '//li[starts-with(@id,"video")]',
         document,
         null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
         null);
         
for (var i=0;i<links.snapshotLength;i++)
     {
          tl = links.snapshotItem(i);
          var h = document.createElement("a");
          var w = document.createElement("input");
          h.id = tl.id.replace(/video-/g,"luismi_gv-");
          
          w.type ="button";
          w.value = "×";
          w.id = tl.id.replace(/video-/g,"luismi_gv--");
          
          w.disabled = 'true';
          w.style.zIndex = 1000;
          w.style.left = '0px';
          w.style.top = '-23px';
          w.style.position = 'relative';
          w.style.padding = '0px';
          w.style.opacity = '.70';
          w.style.background = '#333333';
          w.style.color = '#bbbbbb'
          w.style.fontWeight = 'bold';
          
          tl.style.overflow='hidden';
          tl.insertBefore(h,tl.lastChild);
          h.appendChild(w);
          llbt(h.id);
      }

