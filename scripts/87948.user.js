//
// ==UserScript==
// @name          Reformal.Ru Moderator Tools
// @namespace     http://*.reformal.ru/
// @description   Some useful stuff for moderation on Reformal.Ru
// @include       http://*.reformal.ru/*
// @include       http://reformal.ru/*
// ==/UserScript==


(function() {
    var snapshot = document.evaluate('//a[contains(@href, "javascript: CGo") and contains(@href, "delidea")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < snapshot.snapshotLength; i++) {
        var link = snapshot.snapshotItem(i);
        
        var matches = /javascript: CGo\('http:\/\/([^\/]+)\/(.*)ia=(\d+)(.*)'/.exec(decodeURI(link.href));
        if(matches) {
            var host = matches[1];
            var id = matches[3];
            
            var controls = document.getElementById('sts_'+id);
            if(controls) {
                controls.innerHTML += "<a id='removeIdea_%id' href='javascript: window.deleteIdea(\"%host\", \"%id\")'> удалить </a>".replace(/%host/g, host).replace(/%id/g, id);
            }
        }
    }    

    unsafeWindow.deleteIdea = function(host, id) {
        var xhr = new XMLHttpRequest();
        
        var link = document.getElementById("removeIdea_"+id);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // для статуса "OK"
                if (xhr.status == 200 || xhr.status == 302) {
                    link.innerHTML = '<span style="color: red">  удалено </span>';    
                } 
            }
        };
        xhr.open('GET', "http://%host/proj/?ia=%id&mod=delidea&wt=".replace(/%host/g, host).replace(/%id/g, id), true);
        xhr.send();        
    };
})();


