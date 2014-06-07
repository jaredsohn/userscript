// ==UserScript==

// @name           mop music

// @namespace      http://m.mop.com/

// @include        http://m.mop.com/*

// @include        http://m.mop.com/

// ==/UserScript==

function tryAddLink(node)
{
    var d = node.getAttribute('onmousedown');
    var re = /^m\.SongExpando\.byId\('[^']+'\)/
    if(!d)return;
    var match = re.exec(d);
    if (match)
    {
        var x=eval('unsafeWindow.'+match[0]+'.song.clipurl');
        x = unsafeWindow.decodeBase64(x)
        node.parentNode.innerHTML += '<a href="'+x+'" style="color:red">link</a>'
    }
}
var ____temp = document.getElementsByClassName('song_play_btn');
for (____i in ____temp)
{tryAddLink(____temp[____i]);}
