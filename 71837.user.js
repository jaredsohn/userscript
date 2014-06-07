// ==UserScript==
// @name           Slice-o-mat fuers Quick-Reply by Kambfhase
// @namespace      Kambfhase
// @author Kambfhase
// @description    fügt einen Slice-Button hinzu.
// @include        http://forum.mods.de/bb/thread.php?TID=*
// ==/UserScript==

var $=unsafeWindow.jQuery,
    r=/^.*(?:\[quote=(\d*),(\d*),"([^"]+)"\])(?:.*?\[quote(?:.*?\[quote.*?\[\/quote\])*?(?!(?:.*?\[\/quote\].*?){2}$).*?\[\/quote\])*?(?!.*?\[\/quote\].*?$).*?$/;

$("<img />",{
   alt:"Slice-o-mat",
click: function(e){
var $area = $('#message'),
    text = $area.val(),
    domarea=$area[0],
    pre=text.slice(0,domarea.selectionStart),
    post=text.slice(domarea.selectionStart),
    mid= r.exec(pre);
    if(mid){
        text=pre+"[/quote]\n\n[quote="+mid[1]+","+mid[2]+",\""+mid[3]+"\"]"+post;
        $area.val(text);
    }
    return false;
}
}).insertAfter('#qr_row1 img[alt="Quote"]');