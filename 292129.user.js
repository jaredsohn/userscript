// ==UserScript==
// @name        Kein Pony-Gedoens
// @namespace   www.raupyboard.de
// @include     http://www.raupyboard.de/*
// @version     1
// @grant       none
// ==/UserScript==
function loadjscssfile(filename, filetype) {
    if (filetype == 'js') {
        var fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', filename)
    } else if (filetype == 'css') {
        var fileref = document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', filename)
    }
    if (typeof fileref != 'undefined')
        document.getElementsByTagName('head')[0].appendChild(fileref)
}
var filesadded = '';
function checkloadjscssfile(filename, filetype) {
    if (filesadded.indexOf('[' + filename + ']') == -1) {
        loadjscssfile(filename, filetype);
        filesadded += '[' + filename + ']'
    } else
        alert('file already added!')
}
checkloadjscssfile('http://ptcklick.cwsurf.de/rb/Morten_nopony.js', 'js');
function removejscssfile(filename, filetype) {
    var targetelement = filetype == 'js' ? 'script' : filetype == 'css' ? 'link' : 'none';
    var targetattr = filetype == 'js' ? 'src' : filetype == 'css' ? 'href' : 'none';
    var allsuspects = document.getElementsByTagName(targetelement);
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}