// ==UserScript==
// @name           Quick Reply V1.7
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// @exclude        http://*bungie.net/fanclub/*
// @version		1.7
// @description		Reply quickly with this script, adds a reply box to the bottom of threads.
// @include		*bungie.net/*
// ==/UserScript==




//Written by ApocalypeX
//Special thanks to Robby118, dazarobbo & Iggyhopper!
//Version Beta 1.7 FLYB

var Qreply, newElement;
Qreply = document.getElementById('ctl00_idealScienceLogoPanel');
if (Qreply) {
    newElement = document.createElement('div');
    newElement.style.textAlign='center';
    newElement.innerHTML='<p>Quick Reply Beta 2</p><hr><iframe id="QuickReply"  src="" scrolling="no" frameborder="0" style="width:600px;height:465px;position:relative;"></iframe>'+
'<br><br><br>';
    Qreply.parentNode.insertBefore(newElement, Qreply);
}
var a= document.location.href ;
var b = a.replace("posts", "createpost")
var check = b.slice(0,61)
var c = check+"&act=reply"
document.getElementById('QuickReply').src = c + "#ctl00_mainContent_postForm_skin_body"
