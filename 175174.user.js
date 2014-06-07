// ==UserScript==
// @name       Einthusan Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.einthusan.com/*
// @copyright  2012+, You
// ==/UserScript==

function getQueryVariable(variable, query) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

function createDownloadLink(href, text){
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', href);
    downloadLink.innerHTML =text;
    downloadLink.setAttribute('style', 'padding-right: 10px;');
    document.getElementById('module_auth').appendChild(downloadLink);    
}

window.setTimeout(function(){
    var fvParam = document.getElementsByName("flashvars")[0].value;
    var filePath = getQueryVariable('file', fvParam);
    createDownloadLink(filePath, 'Download Movie');
    
    var hdFilePath = getQueryVariable('hd.file', fvParam);
    createDownloadLink(hdFilePath, 'Download HD Movie');
    
}, 1000);
