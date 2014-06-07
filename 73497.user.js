// ==UserScript==
// @name           pre select
// @version        0.1
// @namespace      kayac.com
// @author         NAGATA Hiroaki <nagata-hiroaki@kayac.com>
// @description    Select content in pre tag when double click.
// @include        http://*
// ==/UserScript==

var pres = document.body.getElementsByTagName('pre');

for(var i = 0; i < pres.length; ++i) {
    pres[i].addEventListener('click', function() {
        var textarea = makeTextarea(this);

        this.style.display = 'none';
        this.parentNode.insertBefore(textarea, this);

        textarea.focus();
        textarea.select();

    }, false);
}

var makeTextarea = function(pre) {
    var textarea           = document.createElement('textarea');
    textarea.setAttribute('type', 'text');
    textarea.innerHTML    = pre.innerHTML;
    textarea.innerHTML     = textarea.innerHTML.replace('&gt;', '>');
    textarea.innerHTML     = textarea.innerHTML.replace('&lt;', '<');
    textarea.style.display = 'block';
    textarea.style.width   = pre.offsetWidth + 'px';
    textarea.style.height  = pre.offsetHeight + 'px';

      textarea.addEventListener('click', function() {
        pre.style.display = 'block';
        this.parentNode.removeChild(this);
    }, false);

    return textarea;
}
