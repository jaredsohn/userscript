// ==UserScript==
// @name           remove ALL Comments
// @namespace      comments
// @include        *
// @exclude        http://ask.metafilter.com/*
// ==/UserScript==
(function() {


    divCollection = document.getElementsByTagName("div");
    for (var i=0; i<divCollection.length; i++) {
        if (divCollection[i].id != ""){
            if(divCollection[i].id.indexOf("comments")>=0) {
                thisDiv = divCollection[i];
                thisDiv.parentNode.removeChild(thisDiv);
            }       
        }
        if (divCollection[i].className != ""){
            if(divCollection[i].className.indexOf("comments")>=0) {
                thisDiv = divCollection[i];
                thisDiv.parentNode.removeChild(thisDiv);
            }       
        }        
    }

})();