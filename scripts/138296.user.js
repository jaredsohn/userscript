// ==UserScript==
// @name           AmesTrib Article View
// @description    Removes the subscription window so you can view the page
// @author         Chris Van Oort
// @include        http://amestrib.com/*
// @version        1.1 01/15/2014
// ==/UserScript==

function showArticle(){
    document.getElementById("gregbox-outer").style.visibility = 'hidden';
    document.getElementById("gregbox-signInTab").style.visibility = 'hidden';
    //hide overlay:
    var elems = document.body.getElementsByTagName("*");
    for(i=0;i<elems.length;i++){
        if(elems[i].style.zIndex == 100002 || elems[i].style.zIndex == 99998){
           elems[i].style.visibility = 'hidden';
        }
    }
}
setInterval(showArticle, 1000);