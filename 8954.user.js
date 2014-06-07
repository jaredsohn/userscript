// ==UserScript==
// @name           Farkyish comments
// @namespace      file://
// @description    Tags threads you've commented on, the way Farky used to.
// @include        http://*.fark.com/*
// ==/UserScript==

function doReplace(details){
    var myThreads = new Array();
    myThreads = details.responseText.match(/IDLink=([0-9]{7})/g);
    
    var allLinks = document.getElementsByTagName("a");
    
    for(i=0; i<allLinks.length; i++){
        for(j=0; j<myThreads.length; j++){
            if(allLinks[i].href.search(myThreads[j]) > -1){
                //I've commented here!
                allLinks[i].style.color = "red";
                allLinks[i].style.fontWeight = "bold";
            }
        }
    }
}

GM_xmlhttpRequest({
method:"GET",
url:"http://cgi.fark.com/cgi/fark/users.pl?self=1",
headers:{"User-Agent":"monkeyagent"},
onload:function(details){
    doReplace(details);
}
});
    