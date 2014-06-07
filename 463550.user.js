// ==UserScript==
// @name        Gotoquiz refresh posts.
// @namespace   http://localhost
// @description Refresh the posts on gotoquiz forums
// @include     http://www.gotoquiz.com/forum/*
// @include     http://gotoquiz.com/forum/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
url = window.location.href;
u = url.split('/');
loop=[];
if (u[3] == 'forum' && u.length >= 7) {
    go = true;
}
if(go && u[6]=="thread.html"){
    n=1;
    refresh();
}
else if(go){
    n=u[6];
    refresh();
}
function refresh(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://gotoquiz.com/forum/offbeat/' + u[5] + '/' + n + '/thread.html',
        onreadystatechange: function (response) {
            if(url==window.location.href){
            if(response.readyState==4){
            last=response.responseText;
            last=last.split('<table id="f_board">')[1];
            last=last.split('</table>')[0];
            document.getElementById("f_board").innerHTML=last;
            refresh();
            }
            }
        }
    })
}