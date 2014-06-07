// ==UserScript==
// @name           LJ Light
// @namespace      http://userscripts.org/users/106516
// @include        http://*.livejournal.com/*
// ==/UserScript==

function appendParameterToUrl(url,name,value){
    if(url.indexOf(name + '=' + value) < 0 && url.indexOf('.htm') > 0){
        if(url.indexOf('?') < 0){
            if(url.indexOf('#') < 0){
                url += '?' + name + '=' + value;
            }else{
                url = url.replace('#', '?' + name + '=' + value + '#');
            }
        }else{
            url = url.replace('?', '?' + name + '=' + value + '&');
        }
    }
    return url;
}    

function urlContainsParameter(url,name,value){
    if(url.indexOf(name + '=' + value) < 0 && url.indexOf('.htm') > 0){
        return false;
    }else{
        return true;
    }
}

if(!urlContainsParameter(window.location.href,'format','light')){
    window.location.href = appendParameterToUrl(window.location.href,'format','light');
}    


