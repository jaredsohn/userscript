// ==UserScript==
// @name       Tabs for textareas
// @namespace  http://use.i.E.your.homepage/
// @version    2.0
// @description Each textarea found will be modified
// @match      http://*/*
// @match      https://*/*
// @copyright  2012+, Axel DUCH
// ==/UserScript==

var ta = document.getElementsByTagName('textarea');
for(var q=ta.length-1;q>=0; q--){
    ta[q].onkeydown = function(e){
        if(e.keyCode===9){
            e.preventDefault();
            var tabBaseSize = 4;
            var startSel = e.target.selectionStart;
            var endSel = e.target.selectionEnd;
            var sLeft= e.target.value.substring(0, startSel);
            var linePos = sLeft.lastIndexOf("\n")+1;
            var tabSize = tabBaseSize - ((startSel-linePos)%tabBaseSize);
            var sTab = '';
            for(var i=tabSize;i;i--){
                    sTab += ' ';
            }
            var sRight = e.target.value.substring(endSel, e.target.value.length);
            e.target.value = sLeft+sTab+sRight;
            e.target.selectionStart = e.target.selectionEnd =startSel+tabSize;
        }
    }
}