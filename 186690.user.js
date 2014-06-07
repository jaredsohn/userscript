/*
 * Social Friend Tracker
 * 
 * NOTICE: this user script contains some code nicked from Social Fixer by
 * Matt Kruse.  With apologies.
 *
 * Social Fixer used to contain a Friend Tracker.  However, since SF 8.0
 * this has no longer been the case because Facebook objected and placed
 * pressure on the author to remove it.  This script is an attempt to 
 * resurrect the Friend Tracker.
 */

// ==UserScript==
// @name           Social Friend Tracker
// @namespace      http://userscripts.org/users/49156
// @description    Monitors your Facebook frends and notifies you if you are unfriended
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @version        0.82
// @updateURL      https://userscripts.org/scripts/source/186690.meta.js
// @downloadURL    https://userscripts.org/scripts/source/186690.user.js
// ==/UserScript==
/*
 * 0.80 24-dec-2013 was the initial release
 * 0.81 30-dec-2013 fix the regexp that parses the user_num out of cookies
 * 0.82 31-mar-2014 fb changed the newsfeed and the box disappeared, but
                    only because of a silly typo in the code
 */
 
var addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(
    '#sft_pagelet {border: solid 1px; padding: 2px;}' +
    '.sft_noactivity {font-weight:bold;}' +
    '.sft_unfriended {color: #ff0000;}' +
    '.sft_friended {color: #00ff00;}' +
    '.sft_unfriend_name {margin-left:1em;}' +
    '.sft_friend_name {margin-left:1em;}'
);

var queueFunction = function(f) {return setTimeout(f,0);};
var time = function () {return (new Date()).getTime();};
var protocol='http:';try { protocol = location.protocol; } catch(e) { }
var host='facebook.com';try { host = location.host; } catch(e) { }
var user_num = null;try {user_num = unsafeWindow.Env.user;} catch(e) { }
if (!user_num) try {user_num=document.cookie.match(/^(.*;\s*)?c_user=([0-9]+)(;.*)?$/)[2];} catch(e) { }

var requestProps = {type:'xhr', url:protocol+'//'+host+'/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&options[0]=friends_only&viewer='+user_num+'&__user='+user_num, headers:{'Content-type':'application/x-www-form-urlencoded'}, ttl:3600 };

var getData = function (func,force) {
    if (!user_num) return;
    var t=time();
    var rc=requestProps;
    var dt = user_num + '.data';
    if (!force) {
        var lastcheck = +GM_getValue(dt+'.last_check',0);
        if (t-lastcheck <= rc.ttl*1000) {
            var cache = GM_getValue(dt,'');
            if (cache) { func(cache); return; }
        }
    }
    if (!rc.loading) {
        rc.loading=true;
        var headers=rc.headers;
        headers['Cache-Control']='no-cache';
        var url=rc.url;
        url += '&time='+t;
        try {
            GM_xmlhttpRequest({'method': 'GET', 'headers': headers, 'url': url, 'onload': function(res) {
                rc.loading=false;
                if (res.responseText==null || res.responseText=="") {
                    GM_log("ajax request returned no content");
                    return;
                }
    	        val=func(res.responseText);
                if (val!=false) {
                    GM_setValue(dt+'.last_check',''+t);
                    GM_setValue(dt,res.responseText);
                }
            }});
        } catch (e) {
            GM_log("An error occurred during the ajax request: " + e.toString());
        }
    }
};
var object_to_array = function(obj,key,desc) {
    var dir=1; if (desc) dir=-1;
    var a=[];
    for(var i in obj) {a.push(obj[i]);}
    return a.sort(function(a,b){
        var ta=typeof a[key]; var tb=typeof b[key];
        if (ta=="undefined" && tb=="undefined") return 0;
        if (tb=="undefined") return dir;
        if (ta=="undefined") return -dir;
        if (a[key]>b[key]) return dir;
        if (a[key]==b[key]) return 0;
        return -dir;
    });
};
var ago = function(when,now) {
    var diff = Math.floor((now-when)/1000/60);
    if (diff<60) return diff+" min ago";
    diff = Math.floor(diff/60);
    if (diff<24) return diff+" hr ago";
    diff = Math.floor(diff/24);
    return diff+" days ago";
};
var sftClearPressed = false;
var sftLoaded = false;
var sftProcessData = function(data) {
    var dirty = false;
    var t = time();
    var dt = user_num + '.friends';
    var fdata = GM_getValue(dt,"");
    var friends = {};
    if (fdata != "") {
        try { friends = JSON.parse(fdata); } catch (e) { GM_log("Friends JSON data could not be parsed"); }
    }
    if (typeof friends.friends=="undefined") { friends.friends={}; }
    if (typeof friends.unfriended=="undefined" || sftClearPressed) { friends.unfriended={}; }
    if (typeof friends.refriended=="undefined" || sftClearPressed) { friends.refriended={}; }
    if (sftClearPressed) dirty=true;
    sftClearPressed = false;
    var old_friends = friends.friends;
    var unfriended = friends.unfriended;
    var refriended = friends.refriended;
    var count=0;
    var friend_list = {};
    try { friend_list = JSON.parse(data.replace(/for\s*\(\s*\;\s*\;\s*\)\s*\;/,'')); }
    catch (e) { GM_log("Friends data returned from Facebook could not be parsed"); return false; }
    if (!friend_list.payload || !friend_list.payload.entries) { return false; }
    friend_list = friend_list.payload.entries;
    if (friend_list && friend_list.length>5) {
        sftLoaded = true;
        var current_friends = {};
        /* analyse each current friend in the returned data */
        for (var i=0;i<friend_list.length;i++) {
            if (friend_list[i].type=="user") {
                count++;
                var id = friend_list[i].uid;
                if (id == user_num) continue;
                var name = friend_list[i].text;
                var f = {'name':name,'added':t};
                if (typeof old_friends[id]=="undefined") {
                    old_friends[id] = f; /* this is a new friend */
                    dirty = true;
                }
                current_friends[id] = f;
                if (typeof unfriended[id]!="undefined") {
                    /* this friend was unfriended, but has returned */
                    refriended[id] = unfriended[id];
                    refriended[id].refriended = t;
                    refriended[id].id = id;
                    dirty = true;
                }
            }
        }
        /* now look for old friends who didn't appear in the data */
        for (var id in old_friends) {
            if (id==user_num) continue;
            if (typeof current_friends[id]=="undefined") {
                /* Gone! */
                unfriended[id] = old_friends[id];
                unfriended[id].deleted = t;
                unfriended[id].id = id;
                delete old_friends[id];
                delete refriended[id];
                dirty = true;
            }
        }
        var dtk=user_num + '.keep_days';
        var days=+GM_getValue(dtk,'5');
        var duration = 1000*60*60*24*days;
        var timeClass = " uiStreamSource timestamp ";
        /* Report each current unfriend unless too old */
        var unmsg="";
        var unfriend_array = object_to_array( unfriended, 'deleted', true );
        for (var i=0; i<unfriend_array.length; i++) {
            var f = unfriend_array[i];
            var id = f.id;
            if (t-f.deleted > duration ) {
                delete unfriended[id];
                dirty = true;
            } else {
                if (unmsg=="") unmsg='You are <span class="sft_unfriended">no longer friends</span> with:';
                unmsg += '<div><a href="/profile.php?id='+id+'" target="_blank" class="sft_unfriend_name">'+f.name+'</a> ' +
                         '<span class="'+timeClass+'">'+ago(f.deleted,t)+' <span class="sft_unfriend_reason"></span></span></div>';
            }
        }
        /* Report each current refriend unless too old */
        var remsg="";
        var refriend_array = object_to_array( refriended, 'refriended', true );
        for (var i=0; i<refriend_array.length; i++) {
            var f = refriend_array[i];
            var id = f.id;
            if (t-f.refriended > duration ) {
                delete refriended[id];
                dirty = true;
            } else {
                if (remsg=="") remsg='You have been <span class="sft_friended">re-friended</span> by:';
                remsg += '<div><a href="/profile.php?id='+id+'" target="_blank" class="sft_friend_name">'+f.name+'</a> ' +
                         '<span class="'+timeClass+'">'+ago(f.refriended,t)+'</span></div>';
            }
        }
        var pagelet = document.getElementById('sft_pagelet');
        if (unmsg!="" || remsg!="") {
            var keepmsg = '<div class=sft_keep_msg>(These names will be remembered for <input id=sft_keep_days type=text size=1 value="'+days+'"> days or until the Clear button is pressed.)</div>';
            pagelet.innerHTML = unmsg + remsg + keepmsg;
            /* monitor the keep_days input for changes */
            var elt=pagelet.querySelector('#sft_keep_days');
            if (elt) elt.onchange=function () {
                var days=document.getElementById('sft_keep_days').value;
                if (+days>0) GM_setValue(dtk,''+days);
            };
            /* Find out whether the unfriended accounts have been deactivated */
            var elts=pagelet.querySelectorAll('.sft_unfriend_name');
            if (elts && elts.length>0){
                for (var i=0; i<elts.length; i++) {
                    var a=elts[i];
                    GM_xmlhttpRequest({'url':a.href,'onload':function(res){
                        if (res.status==404) {
                            elt=a.parentNode.querySelector('.sft_unfriend_reason');
                            if (elt) elt.innerHTML='(account inactive)';
                        }
                    }});
                }
            }
        } else {
            pagelet.innerHTML = '<div class="sft_noactivity">No activity (When you are unfriended, names will show up here)</div>';
        }
        /* Update the friend count in the box header */
        var elt = document.getElementById('sft_friend_number');
        if (elt) elt.innerHTML=' (' + (count-1) + ')';
        if (dirty) {
            GM_setValue(dt,JSON.stringify(friends));
        }
    }
    return true;
};
var sftFail = function() {
    if (sftLoaded) return;
    var pagelet = document.getElementById('sft_pagelet');
    if (pagelet) {
        if (!user_num) pagelet.innerHTML='Friend Tracker was unable to determine your Facebook user number.';
        else pagelet.innerHTML='Friend Tracker failed to load.  Please check browser\'s setting for third party cookies.';
    }
};
var sftLoadContent = function(force) {
    var pagelet = document.getElementById('sft_pagelet');
    if (pagelet) pagelet.innerHTML="Loading...";
    setTimeout(sftFail,10000);
    getData(sftProcessData,force);
};
var insertAfter = function(newelt,child) {
    var parent=child.parentNode;
    var sibling=child.nextSibling;
    if (sibling) parent.insertBefore(newelt,sibling);
    else parent.appendChild(newelt);
};
var sftMakePagelet = function() {
    var rightCol = document.getElementById('rightCol');
    if (!rightCol) return 0;
    var div = document.createElement('DIV');
    div.id='sft_pagelet_container';
    div.innerHTML='<div class="mbl">'+
                   '<div class="uiHeader uiHeaderBottomBorder uiHeaderTopAndBottomBorder uiSideHeader mbm mbs pbs">'+
                    '<div class="clearfix uiHeaderTop">'+
                     '<div class="uiTextSubtitle uiHeaderActions rfloat" id=sft_button_refresh><a href="#">Refresh</a>&nbsp;</div>'+
                     '<div class="uiTextSubtitle uiHeaderActions rfloat" id=sft_button_clear><a href="#">Clear</a>&nbsp;</div>'+
                     '<div>'+
                      '<h4 class="uiHeaderTitle pagelet_title">Friend Tracker</h4><span id="sft_friend_number"></span>'+
                     '</div>'+
                    '</div>'+
                   '</div>'+
                   '<div class="UIRequestBox phs">'+
                    '<div id="sft_pagelet" class="UIImageBlock clearfix UIRequestBox_Request UIRequestBox_RequestFirst UIRequestBox_RequestOdd">'+
                    '</div>'+
                   '</div>'+
                  '</div>';
    var set_onclick = function(parent, id, func) { var elt = parent.querySelector('#'+id); if (elt) elt.onclick=func; }
    set_onclick(div, 'sft_button_refresh', function () {sftLoadContent(true);});
    set_onclick(div, 'sft_button_clear', function () {sftClearPressed=true; sftLoadContent();});
    var rem = document.getElementById('pagelet_reminders');
    if (rem) insertAfter(div,rem);
    else {
        var container=rightCol;
        var get = function(selector){
            var x = container.querySelector(selector);
            if (x) container=x;
        }
        get('.home_right_column');
        get('.rightColumnWrapper');
        var first=container.firstChild;
        if (first) insertAfter(div,first);
        else container.appendChild(div);
    }
    queueFunction(sftLoadContent);
    return 1;
};

queueFunction(sftMakePagelet);
