// ==UserScript==
// @name           SY relinker
// @namespace      www.seriesyonkis.com
// @include        http://www.seriesyonkis.com/capitulo/*
// ==/UserScript==
// Escrito por Kenkeiras


var llist=document.getElementsByTagName("a");
var link,i;

for (i=0;i<llist.length;i++){
    link=llist.item(i);

    var d=link.href.split("/");
    if ((d[4]=="descargar") && (d[5]=="n")){    // Supongo que la N es para saber que esta en Megaupload :P
        var n,s;
        s="";
        var ref=unescape(d[6]);
        for (n=0;n<ref.length;n++){
            s+= String.fromCharCode((ref.charCodeAt(n)^0xFE)&0xFF);
        }
        link.href="http://www.megaupload.com/?d="+s;
    }    
}
