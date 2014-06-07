// ==UserScript==
// @name           onlinekosten.de pure content
// @namespace      *
// @include        http://www.onlinekosten.de/news/*
// ==/UserScript==
tables = document.getElementsByTagName('table');
for each (table in tables){
    if(table.style && table.width!=530){
        table.style.display='none';
    }else if(table.width==530){
        parentNode=table.parentNode;
        while (parentNode!=document){
            if (parentNode.style.display=='none'){
                parentNode.style.display='block';
            }
            parentNode=parentNode.parentNode;
        }
    }
}
