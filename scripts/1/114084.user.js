// ==UserScript==
// @id             what-anti-yart
// @name           What.CD : Anti-YART
// @version        1.0
// @namespace      hateradio)))
// @author         hateradio
// @description    Hide threads with YART in the title.
// @include        http*://*what.cd/forums.php?action*
// ==/UserScript==
var yart = {
    anti:function(){
        var a = document.querySelectorAll('.last_topic strong a'), b = a.length, c;
        while(b--){
            c = a[b];
            if(/(?:YART)/i.test(c.textContent)){
                c.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }
};
yart.anti();