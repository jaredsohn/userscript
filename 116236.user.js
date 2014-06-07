// ==UserScript==
// @name           TurboYamm!
// @namespace      _caizzz
// @description    Gyorsabb autorefresh Yammon
// @version        1.0
// @include        http://yamm.hu/*
// // ==/UserScript==


timelineUpdateInterval = 10000; // 60 sec
function checkTimelineUpdates() {
    if (prevUpdateCount > MAX_UPDATE_COUNT) {
        return;
    }
    var tl = $('.timeline')
    var url = window.location.href;
    data = {'type': 'update-count', 'since_id': getMaxId(tl)}
    $.ajax({type: 'GET',
            url: url,
            data: data,
            dataType: 'json',
            success: onTimelineUpdateSuccess});

    setTimeout(checkTimelineUpdates, timelineUpdateInterval);
}

function startTimelineUpdate(interval) {
    if (interval) {
        timelineUpdateInterval = interval;
    }
    setTimeout(checkTimelineUpdates, timelineUpdateInterval);
}

liveTimelineUpdateCallbacks = [];
function addLiveTimelineUpdateCallback(callback) {
    liveTimelineUpdateCallbacks.push(callback);
}



function onLiveTimelineUpdateSuccess(data) {
    var tl = $('.timeline');
    var el = $('<div>' + data.replace(/^\s+|\s+$/, '') + '</div>');
    var newTweets = el.find('div.tweet').toArray();
    var tweetsDiv = tl.find('div.tweets');
    for (var i=newTweets.length-1; i>=0; i--) {
        var nt = $(newTweets[i]);
        nt.hide().addClass('update-new')
        nt.remove();
        tweetsDiv.prepend(nt);
    }
    el = null;

    var allTweets = $('.timeline .tweets div.tweet').toArray();
    for (var i=0; i<allTweets.length; i++) {
        if (i >= 40) {
            $(allTweets[i]).remove();
        }
    }

    for (var i=0; i<liveTimelineUpdateCallbacks.length; i++) {
        liveTimelineUpdateCallbacks[i](newTweets);
    }

    if (true || maxId > 0) {
        var dur = Math.min(600, 125 + newTweets.length * 125);
        $('.timeline .update-new').slideDown(dur, function () {
            $(this).removeClass('update-new');
        });
    } else {
        $('.timeline .update-new').show().removeClass('update-new');
    }
    $('.timeline .update-remove').empty().remove();

    if (newTweets.length > 0 && allTweets.length >= 40) {
        $(allTweets[37]).css('opacity', '0.7');
        $(allTweets[38]).css('opacity', '0.4');
        $(allTweets[39]).css('opacity', '0.1');
    }

    delete tl;
    delete newTweets;
    delete tweetsDiv;
    delete allTweets;

    setTimeout(checkLiveTimelineUpdates, liveTimelineUpdateInterval);
}

liveTimelineUpdateInterval = 5000; // 5 sec
liveTimelineUpdateUrl = null;
function checkLiveTimelineUpdates() {
    var tl = $('.timeline');

    var url = '';
    if (liveTimelineUpdateUrl) {
        url = liveTimelineUpdateUrl;
    } else {
        url = window.location.href;
    }

    url += '?type=live-update&since_id=' + getMaxId(tl) + '&callback=onLiveTimelineUpdateSuccess' + '&t=' + (new Date()).getTime();

    var scriptId = 'live-update-script';
    var scriptEl = document.getElementById(scriptId);
    if (scriptEl) {
        scriptEl.parentNode.removeChild(scriptEl);
    }

    var script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

isBackchannel = false;
function startLiveTimelineUpdate(interval, url) {
    if (interval) {
        liveTimelineUpdateInterval = interval;
    }
    if (url) {
        liveTimelineUpdateUrl = url;
    }
    isBackchannel = true;
    checkLiveTimelineUpdates();
}

function showNotification(type, message) {
    var n = $('<div class="notification ' + type + '" style="display: none;">' + message + '</div>');
    $('#notifications').prepend(n);
    n.show().animate({opacity: 1.0}, 3000).fadeOut(5000);
}

function updateStatusesCount(new_count) {
    $('#sidebar-statuses_count').fadeTo(500, 0, function() {
        $('#sidebar-statuses_count').html(new_count).fadeTo(500, 1, function() {
            $('#sidebar-statuses_count').css('filter', '');
        });
    });
}

function postTweet() {
    $('#post-submit').attr('disabled', true);

    var form = $(this).parents('form');
    var data = {
        status: $('#status').val(),
        in_reply_to_status_id: $('#in_reply_to_status_id').val(),
        enable_long_status: $('#enable-long-status').val(),
        autotag: $('#autotag').val(),
        csrfmiddlewaretoken: $('#csrfmiddlewaretoken').val()
    }

    if (data['status'] == '') {
        $('#post-submit').attr('disabled', false);
        return false;
    }

    var loadInd = $('#post').find('.load-indicator');
    loadInd.show();

    function doPost() {
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data, textStatus) {
                $('#post-submit').attr('disabled', false);
                if (data['ok']) {
                    loadInd.hide();
                    $('#status').val('').keyup();
                    $('#in_reply_to_status_id').val('');
                    if (inboxSub == 'home' || isBackchannel) {
                        var tweet_html = data['tweet'].replace(/^\s+|\s+$/g, '');
                        var new_tweet = $(tweet_html).hide();
                        $('.timeline .tweets').prepend(new_tweet);
                        new_tweet.fadeIn(1000);
                    } else {
                        if (window.location.href.indexOf('/twitterarc') != -1) {
                            window.location.href = '/';
                        } else {
                            showNotification('success', 'A twitt elküldése megtörtént.');
                        }
                    }
                    if (data['statuses_count'] > 0) {
                        updateStatusesCount(data['statuses_count']);
                    }
                } else {
                    loadInd.hide();
                    showNotification('error', data['error_message']);
                }
            },
            error: function () {
                $('#post-submit').attr('disabled', false);
                loadInd.hide();
                showNotification('error', 'Nem sikerült elküldeni a twittet, kérjük, próbáld újra később!');
            }
        });
    }

    if ($('#geo-coords-enable').attr('checked')) {
        if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            function succ(position) {
                data['geo_coords_lat'] = '' + position.coords.latitude;
                data['geo_coords_lng'] = '' + position.coords.longitude;
                doPost();
            }
            function err() {
                doPost();
            }
            navigator.geolocation.getCurrentPosition(succ, err, {enableHighAccuracy:true,maximumAge:60000});
        } else {
            doPost();
        }
    } else {
        doPost();
    }

    return false;
}

function followUser(userId, loadInd, successCallback, errorCallback, ignoreNotifications, extraUrl) {
    var data = {
        user_id: userId,
        csrfmiddlewaretoken: csrfMiddlewareToken
    }

    if (loadInd) {
        loadInd.show();
    }

    var url = '/follow';
    if (extraUrl) {
        url += '?' + extraUrl;
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (data, textStatus) {
            if (loadInd) {
                loadInd.hide();
            }
            if (!ignoreNotifications) {
                showNotification('success', 'Oké, mostantól követed a felhasználót.');
            }
            if (successCallback) successCallback();
        },
        error: function () {
            if (loadInd) {
                loadInd.hide();
            }
            if (!ignoreNotifications) {
                showNotification('error', 'Valamit gond volt a követésnél. Próbáld meg újra!');
            }
            if (errorCallback) errorCallback();
        }
    });

    return false;
}

function setClientUserAttr(key, value) {
    data = {
        key: key,
        value: value,
        csrfmiddlewaretoken: csrfMiddlewareToken
    }

    $.ajax({
        url: '/set-client-user-attr',
        type: 'POST',
        data: data,
        dataType: 'json'});
}

var inboxUpdateTimeoutHandle = null;
var inboxUpdateInProgress = false;
function checkInboxUpdates() {
    inboxUpdateInProgress = true;
    $.ajax({type: 'GET',
            url: '/check-inbox',
            data: null,
            dataType: 'json',
            success: function (res) {
                inboxUpdateInProgress = false;
                onInboxUpdateSuccess(res);
                inboxUpdateTimeoutHandle = setTimeout(checkInboxUpdates, inboxUpdateInterval);
            },
            error: function () {
                inboxUpdateInProgress = false;
                inboxUpdateTimeoutHandle = setTimeout(checkInboxUpdates, inboxUpdateInterval);
            }
    });
}

prevInboxCount = null;
function onInboxUpdateSuccess(res) {
    if (!res) {
        return;
    }

    var subs = ['home', 'mention', 'dm'];

    // get current sub
    var sub = inboxSub;
    if (sub) {
        // update current sub
        if (sub != 'all' && res[sub] > 0) {
            // display update notice
            var tl = $('.timeline');
            var upd = $('.update-results', tl);
            $('.count', upd).html(res[sub]);
            upd.show();
        }

        // update all other subs
        for (var i=0; i<subs.length; i++) {
            if (subs[i] != sub) {
                if (res[subs[i]] > 0) {
                    $('#unread-cnt-' + subs[i]).html('(' + res[subs[i]] + ')');
                    $('#unread-cnt-' + subs[i]).parents('li').addClass('has-unread');
                }
            }
        }
    }

    // total unread notifications
    var total = 0;
    for (var i=0; i<subs.length; i++) {
        total += res[subs[i]];
    }

    if (inboxSub && total > 0) {
        $('#inbox-loader').hide();
        // update window title
        var titleMsg = total;
        if (res['mention'] + res['dm'] > 0) {
            titleMsg += '*';
        }

        var origWindowTitle = $(document).attr('title').replace(/^\s*\([^\)]*\)\s*/, '');
        $(document).attr('title', '(' + titleMsg + ') ' + origWindowTitle);

        // show Fluid notification
        var msgs = [];
        if (res['home'] > 0) msgs.push(res['home'] + ' új twitt');
        if (res['mention'] > 0) msgs.push(res['mention'] + ' új @üzenet');
        if (res['dm'] > 0) msgs.push(res['dm'] + ' új privát üzenet');
        //showDesktopNotification('Yamm!', msgs, '');
        prevInboxCount = total;
    }

    if (!inboxSub || res[inboxSub] > 0) {
        inboxUpdateInterval = 10000; //35000 (11-05-12, zsolti)
    }
}

inboxUpdateInterval = null;
function startInboxUpdate(sub, counts, interval) {
    inboxUpdateInterval = interval;

    var subs = ['home', 'mention', 'dm'];
    prevInboxCount = 0;
    for (var i=0; i<subs.length; i++) {
        if (subs[i] != sub) {
            prevInboxCount += counts[subs[i]];
        }
    }

    inboxUpdateTimeoutHandle = setTimeout(checkInboxUpdates, inboxUpdateInterval);
}

var wsConn = null;
function startWebSocketInboxUpdate() {
    if (currentUserSocketIO) {
        var socket = io.connect(nodeJsUrl);
        socket.on('connect', function() {
            var user = {
                'client_user_id': currentUserClientId,
                'screen_name': currentUserScreenName
            };
            socket.emit('identify', user);
        });
        socket.on('update inbox', function (data) {
            if (!inboxUpdateInProgress) {
                if (inboxUpdateTimeoutHandle) {
                    clearTimeout(inboxUpdateTimeoutHandle);
                }
                checkInboxUpdates();
            }
        });
    }
}

function checkFirstLoginCompleted() {
   $.ajax({type: 'GET',
            url: '/first-login-completed',
            data: null,
            dataType: 'json',
            success: onFirstLoginCheckIntervalSuccess});

    setTimeout(checkFirstLoginCompleted, firstLoginCheckInterval);
}

function onFirstLoginCheckIntervalSuccess(res) {
    if (res['completed']) {
        window.location.reload(true);
    }
}

firstLoginCheckInterval = 5000;
function startFirstLoginCompletedCheck() {
    setTimeout(function() { checkFirstLoginCompleted(); }, firstLoginCheckInterval);
}

function destroyTweet(status_id) {
    var data = {'status_id': status_id,
                'csrfmiddlewaretoken': getCsrfToken()};

    var url = '/destroy';
    $.ajax({type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: onDestroyTweetSuccess,
            error: function() { onDestroyTweetError(status_id); }});

    $('#tweet-' + status_id).find('.destroy.load-indicator').show();

    return false;
}

function onDestroyTweetSuccess(data, textStatus) {
    $('#tweet-' + data['status_id']).find('.destroy.load-indicator').hide();
    $('#tweet-' + data['status_id']).fadeOut();
    if (data['statuses_count'] > 0) {
        updateStatusesCount(data['statuses_count']);
    }
}

function onDestroyTweetError(status_id) {
    $('#tweet-' + status_id).find('.destroy.load-indicator').hide();
}

function destroyDM(status_id) {
    var data = {'status_id': status_id,
                'csrfmiddlewaretoken': getCsrfToken()};

    var url = '/destroy-dm';
    $.ajax({type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: onDestroyDMSuccess,
            error: function() { onDestroyDMError(status_id); }});

    $('#tweet-' + status_id).find('.destroy-dm.load-indicator').show();

    return false;
}

function onDestroyDMSuccess(data, textStatus) {
    $('#tweet-' + data['status_id']).find('.destroy-dm.load-indicator').hide();
    $('#tweet-' + data['status_id']).fadeOut();
}

function onDestroyDMError(status_id) {
    $('#tweet-' + status_id).find('.destroy-dm.load-indicator').hide();
}

function favoriteCreate(status_id) {
    var data = {'status_id': status_id,
                'csrfmiddlewaretoken': getCsrfToken()};

    var url = '/favorite/create';
    $.ajax({type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: onFavoriteCreateSuccess,
            error: function() { onFavoriteCreateError(status_id); }});

    $('#tweet-' + status_id).find('.favorite.load-indicator').show();

    return false;
}

function onFavoriteCreateSuccess(data, textStatus) {
    $('#tweet-' + data['status_id']).find('.favorite.load-indicator').hide();
    $('#tweet-' + data['status_id']).find('a.favorite').addClass('favorited');
    $('#tweet-' + data['status_id']).find('.favorited_by').html(data['favorited_by_html']);
}

function onFavoriteCreateError(status_id) {
    $('#tweet-' + status_id).find('.favorite.load-indicator').hide();
}

function favoriteDestroy(status_id) {
    var data = {'status_id': status_id,
                'csrfmiddlewaretoken': getCsrfToken()};

            var url = '/favorite/destroy';
    $.ajax({type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: onFavoriteDestroySuccess,
            error: function() { onFavoriteDestroyError(status_id); }});

    $('#tweet-' + status_id).find('.favorite.load-indicator').show();

    return false;
}

function onFavoriteDestroySuccess(data, textStatus) {
    $('#tweet-' + data['status_id']).find('.favorite.load-indicator').hide();
    $('#tweet-' + data['status_id']).find('a.favorite').removeClass('favorited');
    $('#tweet-' + data['status_id']).find('.favorited_by').html(data['favorited_by_html']);
}

function onFavoriteDestroyError(status_id) {
    $('#tweet-' + status_id).find('.favorite.load-indicator').hide();
}


function onShorten() {
    var inp = $('#shorten-input');
    if (inp.is(':visible')) {
        inp.hide();
    } else {
        $('#upload-image-input').hide();
        $('#shorten-input .error').hide();
        inp.show();
    }

    return false;
}

function onShortenSubmit() {
    var long_url = $('#shorten-long-url').val();
    if (long_url == '') return false;

    var url = '/shorten-url';
    var data = {'long_url': long_url,
                'csrfmiddlewaretoken': getCsrfToken()};

    $('#shorten-input .load-indicator').show();

    $.ajax({type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: onShortenSuccess,
            error: onShortenError});
}

function onShortenSuccess(data, textStatus) {
    var status = $('#status').val();
    if (status.length > 0 && status[status.length - 1] != ' ') {
        status += ' ';
    }
    status += data['short_url'];
    $('#status').val(status);
    $('#status').keyup();

    $('#shorten-input').fadeOut(1000);
    setTimeout("$('#shorten-long-url').val('http://');", 1000);

    $('#shorten-input .load-indicator').hide();
    $('#status').focus()
}

function onShortenError() {
    $('#shorten-input .load-indicator').hide();
    $('#shorten-input .error').html('Nem sikerült a rövidítés :(');
    $('#shorten-input .error').show();
}

function onUploadImageSuccess(image_url) {
    var status = $('#status').val();
    if (status.length > 0 && status[status.length - 1] != ' ') {
        status += ' ';
    }
    status += image_url;
    $('#status').val(status);
    $('#status').keyup();

    $('#upload-image-input').fadeOut(1000);
    setTimeout("$('#upload-image-file').val('');", 1000);

    $('#upload-image-input .load-indicator').hide();
    $('#status').focus()
}

function onUploadImageError() {
    $('#upload-image-input .load-indicator').hide();
    $('#upload-image-input .error').html('Nem sikerült a feltöltés. :( Ha biztos vagy benne, hogy jó a kép formátuma és nem is nagyobb mint 2MB, akkor próbáld újra!');
    $('#upload-image-input .error').show();
}

function onUploadImage() {
    var inp = $('#upload-image-input');
    if (inp.is(':visible')) {
        inp.hide();
    } else {
        $('#upload-image-input .error').hide();
        $('#shorten-input').hide();
        inp.show();
    }

    return false;
}

function onUploadImageSubmit() {
    $('#dummy-iframe').remove();
    var fr = $('<iframe name="dummy-iframe" id="dummy-iframe" width="0" height="0" frameborder="0" style="border: none; display: none; visibility: hidden;"></iframe>');
    fr.appendTo('body');

    var form = $('#post-form');
    if (form.length == 0) {
        form = $('#dm-form');
    }

    _enctype = form.attr('enctype');
    _action = form.attr('action');
    _target = form.attr('target');
    form.attr('enctype', 'multipart/form-data');
    form.attr('action', '/upload-image');
    form.attr('target', 'dummy-iframe');
    form.submit();
    form.attr('enctype', _enctype);
    form.attr('action', _action);
    form.attr('target', _target);

    $('#upload-image-input .load-indicator').show();

    return false;
}

function showTweetMap(tweetId) {
    var mapId = 'tweet-map-' + tweetId;
    var mapDiv = $('#' + mapId);
    var coords = $('#tweet-' + tweetId + ' a.show-map').attr('rel');
    if (!coords) return;
    coords = coords.split(',');

    if (mapDiv.is(':visible')) {
        mapDiv.hide();
    } else if (mapDiv.hasClass('initialized')) {
        mapDiv.show();
    } else {
        if (GBrowserIsCompatible()) {
            mapDiv.show();
            var map = new GMap2(mapDiv.get(0));
            var point = new GLatLng(coords[0], coords[1]);
            map.setCenter(point, 13);
            map.addOverlay(new GMarker(point));
            map.setUIToDefault();
            mapDiv.addClass('initialized');
        }
    }
}

var prevBubble = null;
var bubbleNoCloseOnClick = null;
function loadBubble(e, options) {
    if (prevBubble == e.currentTarget) {
        closeBubble();
        return false;
    }

    if (prevBubble) {
        closeBubble();
    }

    prevBubble = e.currentTarget;

    var target = $(e.currentTarget);
    var pos = target.position();
    var x = parseInt(pos.left + target.width() / 2 + (parseInt(target.css('padding-left'), 10) + parseInt(target.css('padding-right'), 10)) / 2, 10);
    var y = pos.top + target.height();

    var tweetParent = target.parents('div.tweet');

    $('#bubble').detach()
                .appendTo(tweetParent)
                .css('position', 'absolute')
                .css('left', (x - 62) + 'px')
                .css('top', (y + 15) + 'px')
                .html('<img src="http://static.yamm.hu/static/images/ajax-loader.gif" style="display: block; margin: 1em auto;">')
                .show();
    tweetParent.addClass('has-bubble');

    bubbleNoCloseOnClick = options['noCloseOnClick'];
    if ($('#bubble').data('clickAdded') != 1) {
        $('#bubble').click(function(e) { if (!bubbleNoCloseOnClick && e.target.tagName.toLowerCase() != 'a') { closeBubble(); } })
        $('#bubble').data('clickAdded', 1);
    }

    if (options['url']) {
        $.ajax({type: 'GET',
                url: options['url'],
                data: {},
                dataType: 'text',
                success: function(html, textStatus) {
                    $('#bubble').html(html);
                },
                error: function() { $('#bubble').html('').hide(); }});
    } else if (options['contentCallback']) {
        options['contentCallback']($('#bubble'));
    }
}

function closeBubble() {
    if (prevBubble) {
        var tweetParent = $(prevBubble).parents('div.tweet');
        tweetParent.removeClass('has-bubble');
    }
    prevBubble = null;
    $('#bubble').hide();
}

function postUserAction(url, userId) {
    var form = '<form action="' + url + '" method="post">'
      + '<input type="hidden" name="user_id" value="' + userId + '">'
      + '<input type="hidden" name="csrfmiddlewaretoken" value="' + csrfMiddlewareToken + '">'
      + '</form>';
    $(form).appendTo('body').submit();
}

tweetMaxLength = null;
function setLongTweet() {
    $('#status').removeClass('normal').addClass('long');
    $('#enable-long-status').val('1');
    $('#long-tweet').hide();
    $('#normal-tweet').show();
    tweetMaxLength = 20000;
    $('#status').keyup();
    $('#status').focus();
    return false;
}

function setNormalTweet() {
    $('#status').removeClass('long').addClass('normal');
    $('#enable-long-status').val('0');
    $('#normal-tweet').hide();
    $('#long-tweet').show();
    tweetMaxLength = 140;
    $('#status').keyup();
    $('#status').focus();
    return false;
}

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//** jQuery Scroll to Top Control script- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com.
//** Available/ usage terms at http://www.dynamicdrive.com (March 30th, 09')
//** v1.1 (April 7th, 09'):

var scrolltotop = {
    setting: {startline: 100, scrollto: 0, scrollduration: 500, fadeduration: [500, 100]},
    controlHTML: '<img src="http://static.yamm.hu/static/images/scrolltop.png" style="width:55px;height:25px">',
    controlattrs: {offsetx: 8, offsety: 0}, //offset of control relative to right/ bottom of window corner
    anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

    state: {isvisible: false, shouldvisible: false},

    scrollup: function(){
        if (!this.cssfixedsupport) {
            this.$control.hide(); //hide control immediately after clicking it
        }
        var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
        if (typeof dest == "string" && jQuery('#'+dest).length==1) { //check element set by string exists
            dest=jQuery('#'+dest).offset().top;
        } else {
            dest=0;
        }
        this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
    },

    keepfixed: function() {
        var $window = jQuery(window);
        var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
        var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({left: controlx+'px', top: controly+'px'});
    },

    togglecontrol: function() {
        var scrolltop = jQuery(window).scrollTop();
        if (!this.cssfixedsupport) {
            this.keepfixed();
        }
        this.state.shouldvisible = (scrolltop >= this.setting.startline) ? true : false;
        if (this.state.shouldvisible && !this.state.isvisible) {
            this.$control.stop().fadeIn(this.setting.fadeduration[0]);
            this.state.isvisible=true;
        } else if (this.state.shouldvisible==false && this.state.isvisible) {
            this.$control.stop().fadeOut(this.setting.fadeduration[1]);
            this.state.isvisible=false
        }
    },

    init:function(){
        jQuery(document).ready(function($) {
            var mainobj = scrolltotop;
            var iebrws = document.all;
            mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest; //not IE or IE7+ browsers in standards mode
            mainobj.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            mainobj.$control = $('<div id="topcontrol">' + mainobj.controlHTML + '</div>')
                .css({position: mainobj.cssfixedsupport ? 'fixed' : 'absolute', bottom: mainobj.controlattrs.offsety, right: mainobj.controlattrs.offsetx, display: 'none', cursor:'pointer', height: '25px'})
                .attr({title: 'Ugrás az oldal tetejére'})
                .click(function() { mainobj.scrollup(); return false; })
                .appendTo('body');
            if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != '') { //loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({width:mainobj.$control.width()}); //IE6- seems to require an explicit width on a DIV containing text
            }
            mainobj.togglecontrol();
            $('a[href="' + mainobj.anchorkeyword + '"]').click(function(){
                mainobj.scrollup();
                return false;
            });
            $(window).bind('scroll resize', function(e) {
                mainobj.togglecontrol();
            });
        })
    }
}

/*
 * jQuery iFramer
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 0.1
 * Last Modified: 6/5/2009
 * 
 * Copyright 2009 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 * 
 */
jQuery.iframer = function(options){
    options = $.extend({},{ iframe: 'iframer_iframe', returnType: 'html', onComplete:function(){} },options);
    
    var $theframe = $('<iframe name='+ options.iframe +' id="'+ options.iframe +'" width="0" height="0" frameborder="0" style="border: none; display: none; visibility: hidden;"></iframe>');

    $(this).append($theframe).attr('target',options.iframe).submit(function(){
        $('#'+ options.iframe).load(function(){
            var data = $('#'+ options.iframe).contents().find('body').html();
            if(options.returnType.toLowerCase() == 'json')
                eval('data='+ data);
            options.onComplete(data);
            $('#'+ options.iframe).contents().find('body').html('');
            $('#'+ options.iframe).unbind('load');
        });
        
        return true;
    });			
}

$(document).ready(function() {
    // add custom jQuery plugins
    $.fn.focusEnd = function() {
        return this.each(function() {
            if ($(this).is(':visible')) {
                if($.browser.msie) {
                    this.focus();
                    var range = this.createTextRange();
                    range.collapse(false);
                    range.select()
                } else {
                    var len = $(this).val().length;
                    this.setSelectionRange(len, len);
                    this.focus()
                }
            }
        });
    }

    $.fn.defaultValue = function(def, options) {
        options = options || {};
        options['class'] = options['class'] || 'defaultValue';
        $(this).each(function() {
            if ($(this).val() == '' || $(this).val() == def) {
                $(this).addClass(options['class']);
                $(this).val(def)
            }

            $(this).focus(function() {
                if ($(this).val() == def) {
                    $(this).val('');
                    $(this).removeClass(options['class']);
                }
            });
            $(this).blur(function() {
                if ($(this).val() == '') {
                    $(this).addClass(options['class']);
                    $(this).val(def);
                }
            });

            var inp = $(this);
            $(this).parents('form').submit(function() {
                if (inp.val() == def) {
                    inp.val('');
                }
            });
        });
    }

    // remaining character counter on the post form
    tweetMaxLength = $('#status').hasClass('long') ? 20000 : 140;
    var keyHandler = function() {
        var len = tweetMaxLength - $('#status').val().length;
        var color = len > 10 ? '#ccc' : '#ff3000';
        $('#post .remaining').html(len).css('color', color).show();
    }
    $('#status').keyup(keyHandler).keyup();

    var delayedKeyHandler = function() {
        setTimeout(function() { $('#status').trigger('keyup') }, 1);
    }
    $('#status').bind('paste', delayedKeyHandler)
                .bind('cut', delayedKeyHandler);

    if ($('form#search input.text').val() == '') {
        $('form#search input.text').focus();
    }

    $('#navigation-search #search-tweets').click(function() {
        $('#search-tweets').hide();
        $('#search-users').show();
        $('#search-type').val('users');
        return false;
    });
    $('#navigation-search #search-users').click(function() {
        $('#search-tweets').show();
        $('#search-users').hide();
        $('#search-type').val('tweets');
        return false;
    });
    $('#navigation-search a#search-submit').click(function() {
        $('#navigation-search').submit();
    });

    $('#navigation-search input').defaultValue('Keresés');

    // tweet reply links
    if ($('#post-form').length) {
        $('#post-form #post-submit').click(postTweet);

        $('#long-tweet').click(setLongTweet);
        $('#normal-tweet').click(setNormalTweet);

        $('a.reply').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var tweet_screen_name = tweet_div.find('.author a').html();

            if ($('#status').val().replace(/\s+/g, '') == '') {
                $('#in_reply_to_status_id').val(tweet_id);
                $('#in_reply_to_user').val(tweet_screen_name);
                $('#status').val('@' + tweet_screen_name + ' ');
            } else {
                $('#status').val($('#status').val() + ' @' + tweet_screen_name);
            }
            $('#status').focusEnd();
            $('html').attr('scrollTop', 0);
            window.scroll(0,0);
            $('#status').keyup();

            return false;
        });

        $('a.retweet').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_screen_name = tweet_div.find('.author a').html();
            var tweet_text = tweet_div.find('.body .verbatim').html();
            tweet_text = tweet_text.replace(/&gt;/g, '>');
            tweet_text = tweet_text.replace(/&lt;/g, '<');
            $('#in_reply_to_status_id').val('');
            $('#status').val('RT @' + tweet_screen_name + ' ' + tweet_text);
            $('#status').focusEnd();
            $('html').attr('scrollTop', 0);
            window.scroll(0,0);
            $('#status').keyup();

            return false;
        });

        if ($('#geo-toggle').length) {
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                $('#geo-toggle').show();
            }
        }

        $('#geo-coords-enable').change(function() {
            if ($(this).attr('checked')) {
                $.cookie('geo_send_coords', 1, {path: '/', expires: 30});
            } else {
                $.cookie('geo_send_coords', 0, {path: '/', expires: 30});
            }

            return false;
        });
    }
    if ($('#dm-form').length) {
        $('#dm-form #post-submit').click(function () {
            $('#dm-form').submit();
            return false;
        });
        $('a.dm-reply').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var author_id = tweet_div.find('.author-id').html();
            $('#target_user_id').val(author_id);
            $('#status').focusEnd();
            $('html').attr('scrollTop', 0);
            window.scroll(0,0);
            $('#status').keyup();

            return false;
        });
    }

    $('a.destroy').live('click', function(e) {
        if (e.button !== 0) return false;

		if(!confirm('Biztos, hogy törölni szeretnéd ezt a twittet?\nNem lehet majd visszahozni, soha, soha, soha!')) return false;

        var tweet_div = $(this).parents('div.tweet');
        var tweet_id = tweet_div.attr('id').split('-')[1];
        destroyTweet(tweet_id)
        return false;
    });

    $('a.destroy-dm').live('click', function(e) {
        if (e.button !== 0) return false;

        var tweet_div = $(this).parents('div.tweet');
        var tweet_id = tweet_div.attr('id').split('-')[1];
        destroyDM(tweet_id)
        return false;
    });

    $('a.favorite').live('click', function(e) {
        if (e.button !== 0) return false;

        var tweet_div = $(this).parents('div.tweet');
        var tweet_id = tweet_div.attr('id').split('-')[1];
        if ($(this).hasClass('favorited')) {
            favoriteDestroy(tweet_id);
        } else {
            favoriteCreate(tweet_id);
        };
        return false;
    });

    $('a.show-full-text').live('click', function(e) {
        if (e.button !== 0) return false;

        var tweet_div = $(this).parents('div.tweet');
        tweet_div.find('.tweet-text.short').hide();
        tweet_div.find('.tweet-text.full').show();
        return false;
    });

    $('a.show-short-text').live('click', function(e) {
        if (e.button !== 0) return false;

        var tweet_div = $(this).parents('div.tweet');
        tweet_div.find('.tweet-text.full').hide();
        tweet_div.find('.tweet-text.short').show();
        return false;
    });

    $('a.menu-toggle').click(function() {
        var li = $(this).parents('li');
        var cookieName = $(this).attr('id');
        if (li.hasClass('expanded')) {
            li.removeClass('expanded').addClass('collapsed');
            $.cookie(cookieName, 0, {path: '/', expires: 30});
        } else {
            li.removeClass('collapsed').addClass('expanded');
            $.cookie(cookieName, 1, {path: '/', expires: 30});
        }
        return false;
    });

    if (!isMobile) {
        $('a.get-thread').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var isInbox = inboxSub && inboxSub != 'all';
            var url = (isInbox ? '/inbox-thread' : '/thread') + '/' + tweet_id;
            loadBubble(e, {url: url});

            return false;
        });

        $('a.get-replies').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var url = '/replies/' + tweet_id;
            loadBubble(e, {url: url});

            return false;
        });

        $('a.get-retweets').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var url = '/retweets/' + tweet_id;
            loadBubble(e, {url: url});

            return false;
        });

        $('a.get-favorites').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var url = '/favorites/' + tweet_id;
            loadBubble(e, {url: url});

            return false;
        });

        $('a.show-map').live('click', function(e) {
            if (e.button !== 0) return false;
            if (!GBrowserIsCompatible()) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            var coords = $('#tweet-' + tweet_id + ' a.show-map').attr('rel').split(',');

            var cb = function(bubble) {
                bubble.html('<div id="bubble-map" style="height: 250px;"></div>');
                var map = new GMap2($('#bubble-map').get(0));
                var point = new GLatLng(coords[0], coords[1]);
                map.setCenter(point, 13);
                map.addOverlay(new GMarker(point));
                map.setUIToDefault();
            };

            loadBubble(e, {contentCallback: cb, noCloseOnClick: true});

            return false;
        });

        $('body').live('click', function (e) {
            if (e.target.tagName.toLowerCase() == "a" &&
                $(e.target).attr('target') == '_blank')
            {
                return true;
            }

            if (bubbleNoCloseOnClick) {
                /* don't close when the click is inside the bubble */
                if ($(e.target).parents().index($('#bubble')) >= 0) {
                    return true;
                }
            }

            if (prevBubble) {
                closeBubble();
            }

            return true;
        });
    } else {
        $('a.get-thread').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];

            var thread = tweet_div.find('.thread');
            if (thread.html() != '') {
                thread.toggle();
            } else {
                var isInbox = inboxSub && inboxSub != 'all';
                var url = (isInbox ? '/inbox-thread' : '/thread') + '/' + tweet_id;
                var loadInd = tweet_div.find('.get-thread.load-indicator');
                loadInd.show();
                $.ajax({type: 'GET',
                        url: url,
                        data: {},
                        dataType: 'text',
                        success: function(html, textStatus) {
                            thread.html(html);
                            loadInd.hide();
                            thread.show();
                        },
                        error: function() { loadInd.hide(); }});
            }
            return false;
        });

        $('a.show-map').live('click', function(e) {
            if (e.button !== 0) return false;

            var tweet_div = $(this).parents('div.tweet');
            var tweet_id = tweet_div.attr('id').split('-')[1];
            showTweetMap(tweet_id);

            return false;
        });
    }

    // timeline "more" links
    $('a.more').click(function() {
        var loadInd = $(this).parent().find('.load-indicator');
        loadInd.show();

        var last = $('.timeline .tweets div.tweet:last');
        var id = 0;
        if (last.length) {
            id = last.attr('id').split('-')[1];
        } else {
            return false;
        }

        var moreButton = $(this);
        var url = window.location.href;
        $.ajax({
            url: url,
            data: {'max_id': id, 'type': 'update'},
            dataType: 'text',
            success: function (data, textStatus) {
                data = data.replace(/^\s+|\s+$/g, '');
                var cnt = $('.timeline .tweets .tweet').length;
                $('.timeline .tweets').append(data);
                if ($('.timeline .tweets .tweet').length - cnt < 100) {
                    moreButton.hide();
                }
                loadInd.hide();
                //updateCreatedAt();
            },
            error: function () {
                loadInd.hide();
                //updateCreatedAt();
            }
        });

        return false;
    });

    $('a.extra-content-preview-toggle').live('click', function(e) {
        if (e.button !== 0) return;

        $(this).parents('div.tweet').find('.extra-content').toggle();
        return false;
    });

    $('#shorten-long-url').defaultValue('http://');
    $('#shorten').click(onShorten);
    $('#shorten-submit').click(onShortenSubmit);

    $('#upload-image').click(onUploadImage);
    $('#upload-image-submit').click(onUploadImageSubmit);

    $('a.hide-promo').live('click', function(e) {
        if (e.button !== 0) return;

        var promoDiv = $(this).parents('div.promo');
        var name = promoDiv.attr('id');
        $.cookie('promos_' + name, 0, {path: '/', expires: 365*10});
        promoDiv.hide();

        return false;
    });

    if (currentUserId) {
        $('#promoted a.can-follow').live('click', function() {
            var userId = $(this).attr('rel');
            var loadInd = $('#promoted .load-indicator');
            function succ() {
                $('#promoted a.can-follow').removeClass('can-follow');
            }
            followUser(userId, loadInd, succ);

            return false;
        });

        $('#follow-button').click(function() {
            var userId = $(this).attr('rel');
            postUserAction('/follow', userId);
            return false;
        });

        $('#unfollow-button').click(function() {
            var userId = $(this).attr('rel');
            postUserAction('/unfollow', userId);
            return false;
        });

        $('#mute-button').click(function() {
            var userId = $(this).attr('rel');
            postUserAction('/mute', userId);
            return false;
        });

        $('#unmute-button').click(function() {
            var userId = $(this).attr('rel');
            postUserAction('/unmute', userId);
            return false;
        });
    }

    $('a.save-post').click(function() {
        var status = $('#status').val();
        var in_reply_to_status_id = $('#in_reply_to_status_id').val();
        if (status != '') {
            d = new Date();
            d.setTime(d.getTime() + 1500);
            $.cookie('saved_status', status, {expires: d});
            $.cookie('saved_in_reply_to_status_id', in_reply_to_status_id, {expires: d});
            $.cookie('saved_enable_long_status', $('#enable-long-status').val(), {expires: d});
        }
        return true;
    });

    $('.add-remove-list').each(function (idx, node) {
        var wrapper = $(this);
        var baseUrl = wrapper.attr('rel');
        wrapper.find('a.add-remove-list-remove').live('click', function () {
            var w = $(this).parent().find('.add-remove-list-item').html();
            var el = $(this);
            $.ajax({
                'type': 'POST',
                'url': baseUrl + '/remove',
                'data': {'item': w, csrfmiddlewaretoken: csrfMiddlewareToken},
                'success': function () { el.parent().hide('slow'); },
                'error': function () { alert('Az elem törlése nem sikerült.'); }
            });
            return false;
        });

        wrapper.find('.add-remove-list-add').click(function() {
            var w = wrapper.find('.add-remove-list-new').val();
            if (w == '') return false;
            $.ajax({
                'type': 'POST',
                'url': baseUrl + '/add',
                'data': {'item': w, csrfmiddlewaretoken: csrfMiddlewareToken},
                'success': function () {
                    var el = wrapper.find('.add-remove-list-item-template').clone();
                    el.removeClass('add-remove-list-item-template');
                    wrapper.find('.add-remove-list-items').append(el);
                    el.show();
                    el.find('.add-remove-list-item').html(w);
                    el.get(0).scrollIntoView(true);
                    wrapper.find('.add-remove-list-new').val('');
                },
                'error': function () { alert('Az elem hozzáadása nem sikerült.'); }
            });
            return false;
        });
    });

    if (currentUserId) {
        $('#new-user-suggestions a.follow-user').click(function() {
            var userId = $(this).attr('rel');
            var followBtn = $(this).parent().find('a.follow-btn');

            if (followBtn.hasClass('following')) return false;

            function succ() { followBtn.addClass('following').html('Követed').css('color', '#264409'); }
            function err() {  }
            var extraUrl = 'ref=new_user_suggestions&user_id=' + userId;
            followUser(userId, null, succ, err, true, extraUrl);

            return false;
        });

        $('#new-user-suggestions a.close').click(function() {
            $('#new-user-suggestions').fadeOut();
            setClientUserAttr('seen_new_user_suggestions', '1');
            return false;
        });
    }

    var suggested_curr = 0;
    $('#next-suggestion').click(function() {
        var divs = $('#suggested > div').length;
        suggested_curr++;

        if (suggested_curr == divs) {
            $('#suggested > div').css('top', '66px');
            suggested_curr = 0;
        }
        $('#suggested > div').animate({top: '-=66px'}, 150);
        return false;
    });

    if (!isMobile) {
        scrolltotop.init()
    }

    if (currentUserId) {
        var sub = inboxSub;
        startInboxUpdate(sub, currentUserUnreadCounts, 25000);
        if (!isMobile) {
            startWebSocketInboxUpdate();
        }
    }
});


WEBAUDIT=function() {
    
  this.WACID=null;
  this.WACIDName="WACID";
  
  
  this.getCookie=function(name)  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  this.setCookie=function(name,value,topDomain) {
    var date = new Date(2020,12,31,23,59,59);
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/; domain=" + topDomain;  
  }
  
  this.generateID=function(splitter) {
    var sp=(splitter) ? splitter : 'A';
    var now=new Date();
    return Date.parse(now.toGMTString()) + sp + Math.floor(Math.random()*1000000000);
  }
  
  this.getTopDomain=function(fullDomain) {
    var darabok=fullDomain.split('.');
    return darabok[(darabok.length-2)] + '.' + darabok[(darabok.length-1)];
  }
  
  this.getDomain=function(url) {
    var urlDarabok=url.split('/');
    return urlDarabok[2];
  }
  
  this.WACID=this.getCookie(this.WACIDName);
}

var same =  Math.floor(Math.random()*1000000);
var wa=new WEBAUDIT();
var felbontas = "";
var wa_url = "@u=";
var wa_referrer = "@r=";

if(wa.WACID==null)
{
  wa.WACID=wa.generateID('A');
  wa.setCookie(wa.WACIDName,wa.WACID,wa.getTopDomain(wa.getDomain(document.URL)));
}

same = same + "@c=" + wa.WACID;
if(screen) felbontas='@s='+screen.width+'x'+screen.height;
if(document.referrer) wa_referrer=wa_referrer+document.referrer;
if(document.URL) wa_url=wa_url+document.URL;
same = same + felbontas + wa_url + wa_referrer;

