// ==UserScript==
// @name           Link Light
// @namespace      http://userscripts.org/users/106516
// @include        http://*.livejournal.com/*
// ==/UserScript==


function appendParameterToUrl(url,name,value){
    var parameter = name + '=' + value;
    if(url.indexOf(parameter) < 0 && url.indexOf('.htm') > 0){
        if(url.indexOf('?') < 0){
            if(url.indexOf('#') < 0){
                url += '?' + parameter;
            }else{
                url = url.replace('#', '?' + parameter + '#');
            }
        }else{
            url = url.replace('?', '?' + parameter + '&');
        }
    }
    return url;
}     

function urlContainsParameter(url,name,value){
    var parameter = name + '=' + value;
    if(url.indexOf(parameter) < 0 && url.indexOf('.htm') > 0){
        return false;
    }else{
        return true;
    }
}

var a, links, domain;
links = document.getElementsByTagName('a');
domain = window.location.host;
for (var i = 0; i < links.length; i++) {
    a = links[i];
    if(!urlContainsParameter(a.href,'format','light')){
        if (a.host && a.host == domain) {
            a.href = appendParameterToUrl(a.href,'format','light');
        }
    }
}
