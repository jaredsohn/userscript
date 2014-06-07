// ==UserScript==
// @name        log_hilite
// @namespace   OG
// @description Pretty colors for log files
// @include     https://jira.acme.com/*.log
// @version     2
// @grant       none
// ==/UserScript==

window.setTimeout(function() {
    lines = document.getElementsByTagName('pre')[0].innerHTML.split('\n')
    
    var bodyNode = document.body;
    var documentNode = bodyNode.parentNode;
    documentNode.removeChild(bodyNode);

    var headNode = document.head;
    var styleNode = document.createElement('style');
    styleNode.innerHTML = 'p{font-family:consolas;font-size:small;color:white;}';
    headNode.appendChild(styleNode);

    bodyNode = document.createElement('body');
    bodyNode.setAttribute('bgcolor', '#181818');
    var paragraphNode = document.createElement('p');

    var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
    var buff = '';
    for (i=0;i<lines.length;i++){
    	var line = lines[i];
    	var hilite = 'white';
        if (/DEBUG/.test(line)){
            hilite = '#a0a0a0';
        } else if (/WARN/.test(line)){
            hilite = 'yellow';
        } else if (/ERROR/.test(line)){
            hilite = 'red';
        } else if (/FATAL/.test(line)){
            hilite = 'red';
        } else if (/^\s*\bat com\.acme/.test(line)){
            hilite = 'magenta';
            line = tab + line;
        } else if (/\s*\bat /.test(line)){
            hilite = '#cc00ff';
            line = tab + line;
        } else if (/[A-Z2]{2}[0-9]{4}W /.test(line)){
            hilite = 'yellow';
        } else if (/[A-Z2]{2}[0-9]{4}E /.test(line)){
            hilite = 'red';
        } else if (/Exception/.test(line)){
            hilite = '#cc00ff';
        }
        buff = buff.concat((line + '</br>').fontcolor(hilite));
    }

    paragraphNode.innerHTML = buff;
    bodyNode.appendChild(paragraphNode);
    documentNode.appendChild(bodyNode);
}, 60);
