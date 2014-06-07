// ==UserScript==
// @name        BitMarketNotifier
// @namespace   http://userscripts.org/scripts/show/430008
// @include     https://bitmarket.pl/*
// @version     1.0
// @grant       none
// ==/UserScript==

var last_notified_id = 0;
var notifier_first_time = true;

function notifier_show_msg(msg)
{
    if(!Notification || Notification.permission == "denied") return;
    
    if(Notification.permission != "granted")
    {
        Notification.requestPermission(
            function (permission)
            {
                Notification.permission = permission;
                if(permission == "granted")
                {
                    notifier_show_msg(msg);
                }
            }
        );
    }
    else
    {
        Notification("BitMarket", {"body" : msg, "icon" : "https://bitmarket.pl/logo1.png"}); 
    }
}

function notifier_show_notifications(data)
{
    var msg = "";
    
    for(i = 0; i < data.length; i++)
    {
        if(data[i].color == 1 && data[i].id > last_notified_id)
        {
            msg = msg + data[i].msg + "\n";
            last_notified_id = data[i].id;
        }
    }
    
    if(notifier_first_time)
    {
        notifier_show_msg("Notifications are active");
        notifier_first_time = false;
    }
    else if(msg != "")
    {
       notifier_show_msg(msg);
    }
}

function notifier_get_events()
{
    $.ajax({
       "url" : "ajax_events.php",
       "cache" : false,
       "dataType" : "json",
       "success" : notifier_show_notifications
    });
}

notifier_get_events();
window.setInterval(notifier_get_events, 30 * 1000);
