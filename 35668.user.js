// ==UserScript==
// @name           forum_invite_fix
// @namespace      pbr_fif
// @include        http://goallineblitz.com/game/forum_private_access.pl?forum_id=*
// @version        08.10.21
// ==/UserScript==

/*
 *
 * pabst did this 10/17/08+
 *
 */

window.setTimeout(function() {
    main();
},100);

function main() {
    var f = document.getElementsByTagName("form");
    //console.log(f.length);
    f = f[1].parentNode.removeChild(f[1]);

    var c = document.getElementById("content");
    c.insertBefore(f,c.childNodes[4]);    

    var inp = document.getElementsByTagName("input");
    //console.log(inp[0].value);

    var link = document.createElement("a");
    link.href = "http://goallineblitz.com/game/forum_thread_list.pl?forum_id="+inp[0].value;
    link.innerHTML = "Back to forum";
    
    f.appendChild(link);
}


