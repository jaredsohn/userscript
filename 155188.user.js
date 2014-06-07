// ==UserScript==
// @name       RYM: block users in notification box
// @version    0.1
// @match      https://rateyourmusic.com/~*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
function addUser(y){
    ignoredNotes = ignoredNotes+y+',';
    GM_setValue('ingnoredNotes',ignoredNotes);
}
toDel = [];
ignoredNotes = GM_getValue('ingnoredNotes');
if (ignoredNotes == undefined){ignoredNotes = ''}
notif = document.getElementsByClassName('notification');
if (notif != undefined){
    for (n=0; n<notif.length; n++){
        user = notif[n].getElementsByClassName('usero')[0];
        if (user == undefined){user = notif[n].getElementsByClassName('user')[0];}
        if (user != undefined){
            if (ignoredNotes.indexOf(user.innerHTML+',') >= 0){
                toDel.push(notif[n].id.split('_')[1]);
                notif[n].style.display = 'none';
            } else {
                x = document.createElement('a');
                x.innerHTML = 'block';
                x.href = 'javascript:void(0);';
                notif[n].getElementsByTagName('td')[0].appendChild(document.createElement('br'));
                notif[n].getElementsByTagName('td')[0].appendChild(document.createElement('br'));
                notif[n].getElementsByTagName('td')[0].appendChild(x);
                x.addEventListener('click', (function(n) { return function (e) { addUser(n); };  })(user.innerHTML), 'false');
            }
        }
    }
}

for (n=0; n<toDel.length; n++){
     unsafeWindow.dismissNotification(toDel[n]);
}
