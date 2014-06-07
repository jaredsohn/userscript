// ==UserScript==
// @name       tf2r.com | Alert on won / on finish
// @namespace  http://userscripts.org/users/starku
// @version    1
// @description  Alert on won / on finish
// @match      http://tf2r.com/notifications.html
// @copyright  2012+, StaRku*
// ==/UserScript==


//Settings / Réglages
var time = 20;
// sec (20 by default)

//Language / Langue
var lang = 'FR';
// FR : French / EN : English



if (lang=='FR'){
    var win = 'Vous avez gagné un raffle !';
    var finish = 'Un de vos raffle est terminé !';
}
else {
    var win = 'You won a raffle !';
    var finish = 'Your raffle is finished !';
}

x=document.getElementsByClassName('notif lev1 ntifnew').length;

if(x>0){
    for( var i = 0; i < x; ++i )
    {
        if(document.getElementsByClassName('notif lev1 ntifnew')[i].innerHTML.match(/won/))
            alert(win);
        else if(document.getElementsByClassName('notif lev1 ntifnew')[i].innerHTML.match(/Your/))
            alert(finish);
    }
    window.location.reload();
}
else
    var t=setTimeout("window.location.reload()",time*1000);