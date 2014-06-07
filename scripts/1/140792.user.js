// ==UserScript==
// @name           Present the picture on line
// @description    Present the picture on line
// @author         kendo.chu
// @include        http://*
// @version        1.0
// ==/UserScript==
    var reg = new RegExp("\.jpg$|\.jpeg$|\.bmp$|\.png$|\.gif$|^圖","i");               
    var x = document.links;
    var d = document.createElement('div');
    for (var i=0;i<x.length;i++)
    {   
        if (reg.test(x[i].firstChild.nodeValue)){
        var txt = document.createTextNode(x[i].href);
        var img=document.createElement("img");        
        img.src=x[i].href;
        x[i].appendChild(img);
        } 
    }
    document.body.appendChild(d);
    