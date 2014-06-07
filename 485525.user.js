// ==UserScript==
// @name         The West PM Notifications
// @version      0.01
// @description  I dunno what to put here, sorry...
// @author       xShteff (With a lot of help from Diggo and Slygoxx/Leones huehuehue)
// @website      http://allenmcpotter.net
// @include      http://*.the-west.*/game.php*
// ==/UserScript==
$("#ui_topbar").before("<div style='position:absolute;top:30px;z-index:2;margin-left:-250px;margin-right:auto' title='' class='custom_unit_counter'><a style='font-size:15px;text-align:center;' id='perm' class='value'>Notifications</a></div>");

$('.fill').css('background-image', 'url(http://puu.sh/8lX8N.png)');

var perm = document.getElementById('perm');

perm.addEventListener('click', function (e) {
    e.preventDefault();

    if (!window.Notification) {
        new UserMessage("Sorry, notifications are not supported.").show();
    } else {
        Notification.requestPermission(function (p) {
            if (p === 'denied') {
                new UserMessage("Notifications are disabled.").show();
            } else if (p === 'granted') {
                new UserMessage("Notifications are enabled.").show();
            }
        });
    }
});


EventHandler.listen("chat_tell_received", function (room) {
    function sendNotification() {
        var regex = /<td(.*)chat_text(.*)>(.*)<\/td>/ig;
        new Notification('New Message from ' + room.client.pname, {
            body: regex.exec(room.history[room.history.length - 1])[3],
            icon: 'http://puu.sh/8kbK7.png'
        });
    }

    if (Notification.permission !== 'granted')
        new UserMessage("Please enable notifications").show();
    else
        sendNotification();
});