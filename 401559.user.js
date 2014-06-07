// ==UserScript==
// @name       LeBonCoin - Recherche par titre
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Added: oas-top ads remove
// @include        http://www.leboncoin.fr/*
// @include        http://www*.leboncoin.fr/*
// @include        http://mobile.leboncoin.fr/*
// @run-at         document-end
// ==/UserScript==




 function start(){
     
        var arts = document.querySelectorAll(".lbc");
        var q = document.querySelector("#searchtext").value.toLowerCase();
        for(var i = 0; i<arts.length; i++){
            elem = arts[i];
            title = elem.querySelector(".title");
            
            //title.innerHTML= "toto:" + title.innerHTML.toLowerCase();
            if(title.innerHTML.toLowerCase().indexOf(q) < 0)
                elem.parentNode.parentNode.removeChild(elem.parentNode);
            
            
            
        }
     
     var list = document.querySelector(".list-gallery");
     if(list != null){
     	list.parentNode.removeChild(list);
     }
     
     var propub = document.querySelector(".oas-x01");
     if(propub!=null){
         propub.parentNode.removeChild(propub);
     }
     var propub = document.querySelector(".oas-x02");
     if(propub!=null){
         propub.parentNode.removeChild(propub);
     }
     var propub = document.querySelector(".oas-x03");
     if(propub!=null){
         propub.parentNode.removeChild(propub);
     }
     
     var google = document.querySelector(".google");
     if(google!=null){
         google.parentNode.removeChild(google);
     }
     var google = document.querySelector(".oas-top");
     if(google!=null){
         google.parentNode.removeChild(google);
     }
    }

start();
