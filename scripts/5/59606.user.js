// ==UserScript==
// @name           Vampires Wars Requests Help
// @namespace      Facebook
// @description    Vampires Wars Requests Help
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/reqs.php
// @version        1.0.1
// @build          4
// ==/UserScript==

var app_setting = {
    version: '1.0.0',
    build: 4,
    application: '10979261223',
    developer: 'George J. Capnias',
    url: 'http://userscripts.org/scripts/source/59606.user.js'
};

var app_links = {
    link: 'http://www.facebook.com/reqs.php',
    action: 'http://www.facebook.com/ajax/reqs.php?__a=1',
    revision: '296644'
};


String.prototype.removeTags = function() {
    return this.replace(/<\/?[^>]+(>|$)/g, '');
}

String.prototype.startsWith = function(str) {
    return (this.match("^" + str) == str);
}

String.prototype.endsWith = function(str) {
    return (this.match(str + "$") == str);
}

String.prototype.trim = function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}



function Queue() {
    var itemsQueue = new Array();
    var itemsQueueArray = new Array();

    this.length = 0;

    this.enqueue = function(key, value) {
        itemsQueue[key] = value;
        itemsQueueArray.push(key);
        this.length = itemsQueueArray.length;
    }
    this.dequeue = function() {
        var keyToDequeue = itemsQueueArray.shift();
        var valueToDequeue = itemsQueue[keyToDequeue];
        delete itemsQueue[keyToDequeue];
        this.length = itemsQueueArray.length;
        return { 'key': keyToDequeue, 'value': valueToDequeue };
    }
    this.serialize = function() {
        var serialized = '';
        for (var item in itemsQueue) {
            serialized += serialized == '' ? '' : '&';
            serialized += escape(item) + '=' + escape(itemsQueue[item]);
        }
        return serialized;
    }
    this.deserialize = function(serialized) {
        if (serialized != '') {
            itemsQueue = new Array();
            itemsQueueArray = new Array();
            var items = serialized.split('&');
            for (var item in items) {
                var values = items[item].split('=');
                itemsQueueArray.push(unescape(values[0]));
                itemsQueue[unescape(values[0])] = unescape(values[1]);
            }
        }
    }
    this.contains = function(key) {
        if (itemsQueue[key] == undefined)
            return false;
        return true;
    }
    this.peek = function() {
        var keyToDequeue = itemsQueueArray[0];
        var valueToDequeue = itemsQueue[keyToDequeue];
        return { 'key': keyToDequeue, 'value': valueToDequeue };
    }
}

function VWRequest() {
    this.data = '';
}


var requestQueue = new Array();
var executeRequests;

//
// Main
//
function getRequests() {
    //var container = $("div[id='confirm_25287267406_0'][class='confirm_boxes']");
    var container = $("div[id='confirm_25287267406'] ~ ul[class='uiList']");
    //var container = $("#confirm_25287267406 ~ ul");

    $('form', container).each(function(index) {
        var inputElements = '';
        $('input', this).each(function(index) {
            if ($(this).attr('name') != 'actions[reject]') {
                inputElements += encodeURIComponent($(this).attr('name')) + '=' + encodeURIComponent($(this).attr('value')) + '&';
            }
        });
        inputElements += 'lsd=ZHgLE&post_form_id_source=AsyncRequest';
        //$('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request"></div>').text(inputElements));

        var request = new VWRequest();
        request.data = inputElements;
        requestQueue.push(request);
        $('#theRequests').text(requestQueue.length);

    });

    if (requestQueue.length > 0) {
        // Debug
        //executeRequests = window.setTimeout(executeRequestsCalls, (5 * 1000));

        // Routine
        //executeRequests = window.setInterval(executeRequestsCalls, (5 * 1000));
        //$('#theRequestsStatus').text('Proccessing requests...');

        // Manual
        $('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request">There are ' + requestQueue.length + ' requests. Script will automatically run in 1 minute. </div>').append($('<a href="#">Click here to start now.</a>').click(proccessRequests)));
        window.setTimeout(proccessRequests, (60 * 1000));
    }
    else {
        var timeout = GM_getValue('timeout', 5);
        window.setTimeout(function() { window.location.reload(); }, (timeout * 60 * 1000));
        $('#theRequestsStatus').text('Reloading page in ' + timeout + ' minutes.');
    }
}

function proccessRequests() {
    $('#theRequestsWall').empty();
    executeRequests = window.setInterval(executeRequestsCalls, (5 * 1000));
    $('#theRequestsStatus').text('Waiting to start...');
}

function executeRequestsCalls() {
    if (requestQueue.length == 0) {
        window.clearInterval(executeRequests);
        $('#requestsStatusWorking').css('visibility', 'hidden');
        var timeout = GM_getValue('timeout', 5);
        window.setTimeout(function() { window.location.reload(); }, (timeout * 60 * 1000));
        $('#theRequestsStatus').text('Reloading page in ' + timeout + ' minutes.');
        return;
    }

    $('#requestsStatusWorking').css('visibility', 'visible');
    $('#theRequestsStatus').text('Proccessing requests...');

    var request = requestQueue.shift();
    $('#theRequests').text(requestQueue.length);

    GM_xmlhttpRequest({
        method: 'POST',
        url: app_links.action,
        headers: {
            'Host': 'www.facebook.com',
            'User-agent': navigator.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
            'X-SVN-Rev': app_links.revision,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': app_links.link
        },
        data: request.data,
        onload: function(_ajaxResponseDetails) {
            eval('var _rad = ' + _ajaxResponseDetails.responseText.split('for (;;);')[1] + ';');
            //GM_log('JS Commands: '+_rad.onload.length);

            var _trackUrl = '';
            for (var itemIndex = 0; itemIndex < _rad.onload.length; itemIndex++) {
                if (_rad.onload[itemIndex].startsWith('goURI')) {
                    eval('_trackUrl = ' + _rad.onload[itemIndex]);
                    //GM_log('_trackUrl: '+ _trackUrl);
                }
            }
            if (_trackUrl != '') {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: _trackUrl,
                    headers: {
                        'Host': 'facebook6.vampires.zynga.com',
                        'User-agent': navigator.userAgent,
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Accept-Encoding': 'gzip,deflate',
                        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                        'Referer': app_links.link
                    },
                    onload: function(_trackResponseDetails) {
                        var _landingUrl = _trackResponseDetails.responseText.split('top.location.href = "')[1].split('";')[0].replace(/\\/g, '');
                        //GM_log('_landingUrl: '+_landingUrl);

                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: _landingUrl,
                            headers: {
                                'Host': 'www.new.facebook.com',
                                'User-agent': navigator.userAgent,
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                'Accept-Language': 'en-us,en;q=0.5',
                                'Accept-Encoding': 'gzip,deflate',
                                'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                'Referer': _trackUrl
                            },
                            onload: function(_landingResponseDetails) {
                                var _iframeUrl = _landingResponseDetails.responseText.split('<iframe src="')[1].split('"')[0].replace(/\&amp;/g, '&');
                                //GM_log('_iframeUrl: '+_iframeUrl);

                                if (_iframeUrl != '') {
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url: _iframeUrl,
                                        headers: {
                                            'Host': 'facebook6.vampires.zynga.com',
                                            'User-agent': navigator.userAgent,
                                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                            'Accept-Language': 'en-us,en;q=0.5',
                                            'Accept-Encoding': 'gzip,deflate',
                                            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
                                            'Referer': _landingUrl
                                        },
                                        onload: function(_iframeResponseDetails) {
                                            // http://apps.facebook.com/vampiresgame/recruit.php?action=accept&zy_track=recruit&source=recruit
                                            if (_iframeUrl.indexOf('recruit.php?action=accept') > -1) {
                                                var _giftTitle = 'You just accepted a join clan request';
                                                $('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request"></div>').append('<img src="http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/58/25287267406/app_2_25287267406_4738.gif" class="UIImageBlock_Image UIImageBlock_ICON_Image img"><span>' + _giftTitle + '</span>'));
                                            }
                                            else {
                                                GM_log('iframeResponseDetails:' + _iframeResponseDetails.responseText);

                                                var _giftTitle = $("div[class='title']", $(_iframeResponseDetails.responseText)).text();
                                                $('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request"></div>').append('<img src="http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/58/25287267406/app_2_25287267406_4738.gif" class="UIImageBlock_Image UIImageBlock_ICON_Image img"><span>' + _giftTitle + '</span>'));
                                            }
                                        }
                                    });
                                }
                                else {
                                    // http://apps.facebook.com/vampiresgame/recruit.php?action=accept&zy_track=recruit&source=recruit
                                    if (_landingUrl.indexOf('recruit.php?action=accept') > -1) {
                                        var _giftTitle = 'You just accepted a join clan request';
                                        $('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request"></div>').append('<img src="http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/58/25287267406/app_2_25287267406_4738.gif" class="UIImageBlock_Image UIImageBlock_ICON_Image img"><span>' + _giftTitle + '</span>'));
                                    }
                                    else {
                                        var _giftTitle = $("div[class='title']", $(_landingResponseDetails.responseText)).text();
                                        $('#theRequestsWall').append($('<div class="UIImageBlock clearfix UIRequestBox_Request"></div>').append('<img src="http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/58/25287267406/app_2_25287267406_4738.gif" class="UIImageBlock_Image UIImageBlock_ICON_Image img"><span>' + _giftTitle + '</span>'));
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
    });
}


function getArguments(url) {
    var args = new Object();
    var query;
    if (url == undefined) {
        query = location.search.substring(1);
    }
    else {
        query = url.split('?')[1];
    }

    //GM_log('query:' + query);
    var pairs = query.split("&");
    for (var index = 0; index < pairs.length; index++) {
        var pos = pairs[index].indexOf('=');
        if (pos == -1)
            continue;
        var argName = pairs[index].substring(0, pos);
        var argValue = pairs[index].substring(pos + 1);

        //GM_log('Name:' + argName);
        //GM_log('Value:' + argValue);

        args[argName] = String(unescape(argValue));
    }

    return args;
}

function goURI(url) {
    return url.toString();
}

//
// Update script
//
function updateRequestsScript() {
    try {
        GM_xmlhttpRequest({
            method: 'GET',
            url: app_setting.url + '?' + Math.random(),
            onload: function(result) {
                if (result.status != 200) {
                    return;
                }
                if (!result.responseText.match(/@build\s+(\d+)/))
                    return;

                var theOtherBuild = parseInt(RegExp.$1);
                var runningBuild = parseInt(app_setting.build);
                var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/) ? RegExp.$1 : '';
                if (theOtherBuild < runningBuild) {
                    if (window.confirm('You have a beta version (build ' + runningBuild + ') installed.\n\nDo you want to DOWNGRADE to the most recent official release (version ' + theOtherVersion + ')?\n')) {
                        window.location.href = app_setting.url;
                    }
                    return;
                } else if (theOtherBuild > runningBuild ||
					theOtherVersion != app_setting.version) {
                    if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
                        window.location.href = app_setting.url;
                    }
                } else {
                    alert('You already have the latest version.');
                    return;
                }
            }
        });
    } catch (ex) {
        windows.alert('BUG DETECTED (updateRequestsScript): ' + ex);
    }
}

//
// Create interface layout
//
function setupRequestsLayout() {
    var requestsProccess = '<img id=\"requestsWorking\" style=\"visibility:hidden;\" alt=\"Getting requests...\" src=\"http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif\" />';
    var requestsStatusProccess = '<img id=\"requestsStatusWorking\" style=\"visibility:hidden;\" alt=\"Proccessing requests...\" src=\"http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif\" />';

    var layout = $('<div id=\"theRequestsBox\" class=\"ego_column\"></div>');
    layout = layout.append('<div id=\"theRequestsHeader\" class=\"uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader\"><b><a id=\"theRequestsUpdater\" alt=\"Check for updates\" href=\"#\">Vampires Wars Request Help</a></b> (<span id=\"theRequests\">0</span>) ' + requestsProccess + '</div>');
    layout = layout.append('<div id=\"theRequestsWall\" class=\"phs\"></div>');
    layout = layout.append('<div style="margin-top: 6px;"><i><span id=\"theRequestsStatus\">Idle.</span></i> ' + requestsStatusProccess + '</div>');
    layout = layout.append('<div style="margin-bottom: 12px;"><ul id=\"theRequestsTags\"></ul></div>');

    $('#rightCol').prepend(layout);
}


$(document).ready(function() {

    setupRequestsLayout();
    $("#theRequestsUpdater").click(updateRequestsScript);

    window.addEventListener("unload", function(e) {
        try {
            //window.clearTimeout(getWallEvents);
            GM_log('Scripts are unloading...');
        }
        catch (_errObj) {
            GM_log('Something bad has happend!');
        }
    },
	false);

    getRequests();

});

