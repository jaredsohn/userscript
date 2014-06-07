// ==UserScript==
// @name           Popmundo Youth Hostels
// @namespace      http://popodeus.com
// @description    Quick access to Youth Hostels in Popmundo.com city page. Absolutely SAFE to use!
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @include        http://popodeus.com/*
// @author         Seppo Vuolteenaho, aka Photodeus, aka Popodeus
// @copyright      Seppo Vuolteenaho. No rights to redistribute modified versions of this code is granted  All rights reserved.
// @version        20110621
// ==/UserScript==
var version = 20110621;

// Translatable strings
// TODO fetch them from a resource

var MSG_UPGRADE = 'Upgrade Youth Hostel Script';
var MSG_NEW_VERSION = 'There is a newer version of the Youth Hostel script online\n\nGo to download page?';

// =====
var TIMEDIFF = 86400; // 60*60*24 = 24 hours
var VERSION_CHECKED_TIME = 'update.checked';
var UPDATE_AVAILABLE = 'update.available';
var UPDATE_CHECK_URL = 'http://www.popmundo.com/';
var INSTALL_URL = 'http://www.popmundo.com/';
var URLPART = 'City.asp?action=view';



// Checks for updated script on Userscripts website
function getOnlineRevision() {
    // Mark time for last check even before fiunction finishes or if it fails
    var checktime = Math.round(new Date().getTime() / 1000);
    GM_log('checktime: ' + checktime)
    GM_setValue(VERSION_CHECKED_TIME, checktime);
    GM_xmlhttpRequest({
        method:'GET',
        url:UPDATE_CHECK_URL,
        onload: function(resp) {
            var text = resp.responseText;
            if (resp.readyState == 4 && resp.status == 200) {
                var tmp = text.match( /.*@version\s+(\d+)/i );
                if (tmp) {
                    var online_ver = tmp[1];
                    GM_log('Online version: ' + online_ver);
                    if (online_ver > version) {
                        GM_setValue(UPDATE_AVAILABLE, true);
                        newVersionNotify();
                    } else {
                        GM_setValue(UPDATE_AVAILABLE, false);
                    }
                }
            }
        },
        onerror: function(resp) {
            // should do something here perhaps
            GM_log("Update check response status: " + resp.status);
        }
    });
}
// Prints out a nice notification bar telling there's an upgrade to the script
function newVersionNotify() {
    var link = '<a id="script-upgrade" href="'+INSTALL_URL+'">'+MSG_UPGRADE+'</a>';
    var star = '<img src="graphics/Default/menu/separator2.gif" width="9" height="9" hspace="2" />';
    var noti = document.evaluate("//td[@class='Notifications']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    if (noti && noti.snapshotItem(0)) {
        noti = noti.snapshotItem(0);
        noti.innerHTML = noti.innerHTML + link + ' ' + star;
    } else {
        var table = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
        var td = document.createElement('td');
        td.setAttribute('class', 'paper');
        td.height = 7;
        var tr = document.createElement('tr');
        tr.appendChild(td);
        table.appendChild(tr);

        noti = document.createElement('td');
        noti.setAttribute('class', 'Notifications');
        noti.setAttribute('colspan', '2');
        noti.align = 'center';
        noti.height = 20;
        noti.innerHTML = star + ' ' + link + ' ' + star;

        tr = document.createElement('tr');
        tr.appendChild(noti)
        table.appendChild(tr);

        document.getElementById('script-upgrade').addEventListener('click', function() {
            GM_setValue(UPDATE_AVAILABLE, false);
         }, false)
    }
}

if (location.href.indexOf(URLPART) > 0) {
    var doOnlineCheck = false;
    if (typeof(GM_getValue) != "undefined") { // opera fails this, so no update check...
        var lastcheck = GM_getValue(VERSION_CHECKED_TIME);
        if (!lastcheck) lastcheck = 0;
        var now = Math.round(new Date().getTime() / 1000) ;
        var diff = now - lastcheck;
        doOnlineCheck = (diff >= TIMEDIFF);
        GM_log('now: ' + now + ', last check: ' + lastcheck + '. diff: ' + diff + '. doOnlineCheck: ' + doOnlineCheck);
        if (doOnlineCheck) {
            getOnlineRevision();
        } else if (GM_getValue(UPDATE_AVAILABLE)) {
            newVersionNotify();
        }
    }

    // The main part of the script is here, this injects the link into the city menu
    var citylink = document.evaluate("//a[contains(@href, 'City.asp?action=online&CityID=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if (citylink) {
        var city_id = citylink.snapshotItem(0).href.match( /CityID=(\d+)/ )[1];
        var tmp = document.evaluate("//div[contains(@id, 'Menu')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (tmp) {
            var div  = tmp.snapshotItem(0).parentNode; // document.getElementById('div');
            if (div && HOSTELS[city_id]) {
                var star = div.getElementsByTagName('img')[0];

                var newdiv = document.createElement('div');
                newdiv.innerHTML = '<img src="graphics/Default/miscellaneous/Rivet.gif" alt="" width="8" height="8" hspace="5" /> '+
                '<a href="#" onclick="meny(\'MenuHostel\'); this.blur(); return false;">' +
                '<font color="#333333">'+MSG_YOUTH_HOSTEL+'</font></a><br />' +
                '<div class="DarkColumnHL" id="MenuHostel" style="display:none; padding-left:6px; padding-bottom:1px;">' +
                '<span style="float:right;"><a title="" href="Locale.asp?action=MoveHere&LocaleID='+HOSTELS[city_id]+'">Git</a>&nbsp;</span>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<a href="Locale.asp?action=view&LocaleID='+HOSTELS[city_id]+'">'+MSG_SHOW_HOSTEL+'</a></div>';
                div.insertBefore( newdiv, star );
            }
        }
    }
} 