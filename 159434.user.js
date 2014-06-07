// ==UserScript==
// @name           Etherpad Notifications
// @description    Chat notifications for Etherpad-based services
// @version        0.5
// @grant          none
// @include        http://piratenpad.de/*
// @include        http://*.piratenpad.de/*
// @include        https://piratenpad.de/*
// @include        https://*.piratenpad.de/*
// @include        http://piratepad.net/*
// @include        http://*.piratepad.net/*
// @include        http://titanpad.com/*
// @include        http://*.titanpad.com/*
// @include        https://etherpad.mozilla.org/*
// @include        https://*.etherpad.mozilla.org/*
// @include        http://*ponypad*.*/*
// ==/UserScript==

(function() {
    if(!document.querySelector || !document.querySelector('#padpage #padmain'))
        return;
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome')>=0;
    var isOpera = navigator.userAgent.toLowerCase().indexOf('opera')>=0;
    if(isChrome) {
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.textContent = '('+ExecuteScript.toString()+')();';
        document.head.appendChild(script);
    }
    else
        ExecuteScript();
    function ExecuteScript() {
        if(!window.padchat || !window.$ || !$('#padpage #padmain').length)
            return;
        var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome')>=0;
        var isOpera = navigator.userAgent.toLowerCase().indexOf('opera')>=0;
        var padChatNotificationSenders = [];
        var padChatNotificationLines = [];
        var padChatNotification = null;
        var audio = null;
        var hasBeenBlurred = false;
        var replaceId = 'padChatNotification_'+window.location.hostname+'_'+clientVars.globalPadId;
        var separator = '      ';
        var optionsImageData = 'data:image/gif;base64,R0lGODlhCwALAJECAMPDw39/f////wAAACH5BAEAAAIALAAAAAALAAsAAAIglB13AQLsUgy0NlSrou3BvGgCN11jRh0eekFPJ22KUAAAOw==';
        var defaultNotificationsSoundSource = 'http://k007.kiwi6.com/hotlink/tr3cz46oy8/notification2.ogg';
        var notificationsOn = window.localStorage.getItem('NotificationsOn')=='true' || false;
        var notificationsSoundOn = window.localStorage.getItem('NotificationsSoundOn')=='true' || false;
        var notificationsSoundSource = window.localStorage.getItem('NotificationsSoundSource') || defaultNotificationsSoundSource;
        var notificationsTimeout = parseInt(window.localStorage.getItem('NotificationsTimeout') || 0);
        var notificationsLinesLimit = parseInt(window.localStorage.getItem('NotificationsLinesLimit') || 3);
        var debugMode = false;
        var debugVersion = '0.5';
        
        var oldReceiveChat = window.padchat.receiveChat;
        window.padchat.receiveChat = receiveChat;
        var oldHandleChannelStateChange = window.pad.handleChannelStateChange;
        window.pad.handleChannelStateChange = handleChannelStateChange;
        if(window.pad.collabClient)
            window.pad.collabClient.setOnChannelStateChange(handleChannelStateChange);

        window.setInterval(pollWindowFocus, 1250);
        window.addEventListener('focus', onWindowFocus, false);
        window.addEventListener('blur', onWindowBlur, false);
        window.addEventListener('DOMActivate', onWindowFocus, false);
        window.addEventListener('beforeunload', onWindowUnload, false);
        $('#sharebutton').before('<div style="text-align: center; padding-top: 7px; display: none;" id="togglenotificationsouter"><a href="javascript:void(0)" id="togglenotifications" style="text-decoration: none; color: #00e">Notifications: disabled</a>&emsp;&ensp;<a href="javascript:void(0)" id="notificationsoptions"><img style="vertical-align: middle;" src="'+optionsImageData+'"/></a></div>');
        if(window.Notification || window.webkitNotifications) {        
            $('#sharebutton').css('display', 'none');
            $('#togglenotificationsouter').css('display', 'block');
            $('#togglenotifications').click(toggleNotifications);
            $('#notificationsoptions').click(showOptions);
        }
        updateNotificationsCaption();
        function showNotification(iconUrl, title, textLines) {
            if(debugMode)
                title = '['+debugVersion+'] ['+pad.getUserName()+'] '+title;
            if(window.webkitNotifications) {
                var text = textLines.join(separator);
                var newPadChatNotification = window.webkitNotifications.createNotification(iconUrl, title, text);
                newPadChatNotification.replaceId = replaceId;
                newPadChatNotification.onclick = function() {
                    padChatNotificationSenders = [];
                    padChatNotificationLines = [];
                    updateTitle();
                    newPadChatNotification.cancel();
                    window.focus();
                }
                padChatNotification = newPadChatNotification;
                padChatNotification.show();
                if(notificationsTimeout)
                    setTimeout(function(notification) {return function() {notification.cancel();}}(padChatNotification), notificationsTimeout);
            }
            else if(window.Notification) {
                var newPadChatNotification = new Notification(title, {iconUrl: iconUrl, body: textLines.join(separator), tag: replaceId});
                newPadChatNotification.onclick = function() {
                    padChatNotificationSenders = [];
                    padChatNotificationLines = [];
                    updateTitle();
                    newPadChatNotification.close();
                    window.focus();
                }
                padChatNotification = newPadChatNotification;
                if(notificationsTimeout)
                    setTimeout(function(notification) {return function() {notification.close();}}(padChatNotification), notificationsTimeout);
            }
        }
        function hideNotification() {
            if(window.webkitNotifications) {
                if(padChatNotification)
                    padChatNotification.cancel();
            }
            else if(window.Notification) {
                if(padChatNotification)
                    padChatNotification.close();
            }
        }
        function addToNotificationsQueue(sender, text) {
            padChatNotificationSenders.push(sender);
            padChatNotificationLines.push(text);
            updateTitle();
            if(notificationsOn) {
                var textLines = [];
                for(var i=Math.max(0, padChatNotificationSenders.length-notificationsLinesLimit);i<padChatNotificationSenders.length;++i)
                    textLines.push(padChatNotificationSenders[i]+': '+padChatNotificationLines[i]);
                showNotification('http://'+window.location.host+'/favicon.ico', padChatNotificationSenders.length+' new message'+(padChatNotificationSenders.length>1?'s':''), textLines);
                if(notificationsSoundOn && notificationsSoundSource) {
                    if(!audio) {
                        audio = document.createElement('audio');
                        audio.src = notificationsSoundSource;
                        audio.volume = 1;
                    }
                    audio.play();
                }
            }
        }

        function receiveChat(msg) {
            oldReceiveChat(msg);
            if(isWindowFocused()) {
                padChatNotificationSenders = [];
                padChatNotificationLines = [];
                updateTitle();
            }
            else if(!msg.dontShowNotification) {
                var senderName = msg.senderName==undefined ? '<unnamed>' : msg.senderName.replace(' ', ' ').replace(/&#(\d\d\d\d);/g, function(m, m1) {return String.fromCharCode(parseInt(m1, 10));});
                addToNotificationsQueue(senderName, msg.lineText);
            }
        };

        function handleChannelStateChange(newState, message) {
            oldHandleChannelStateChange(newState, message);
            if(isWindowFocused()) {
                padChatNotificationSenders = [];
                padChatNotificationLines = [];
                updateTitle();
            }
            else {
                if(newState=='DISCONNECTED')
                    addToNotificationsQueue('[Etherpad]', 'disconnected');
            }
        };
        
        function updateTitle() {
            var title = window.document.title;
            var m = title.match(/\[\d*\] /);
            if(m)
                title = title.substring(0, m.index)+title.substring(m.index+m[0].length);
            if(padChatNotificationSenders.length)
                window.document.title = '['+padChatNotificationSenders.length+'] '+title;
            else
                window.document.title = title;
        }
        function isPermissionGranted() {
            //var notifications = window.Notification ? window.Notification : window.webkitNotifications ? window.webkitNotifications : null;
            var notifications = window.webkitNotifications ? window.webkitNotifications : window.Notification ? window.Notification : null;
            return notifications && (notifications.checkPermission ? notifications.checkPermission()==0 : notifications.permission ? notifications.permission=='granted' : false);
        }
        function updateNotificationsCaption() {
            $('#togglenotifications').text(!isPermissionGranted() ? 'Notifications: disabled' : notificationsOn ? 'Notifications: ON' : 'Notifications: OFF');
        }
        function toggleNotifications() {
            //var notifications = window.Notification ? window.Notification : window.webkitNotifications ? window.webkitNotifications : null;
            var notifications = window.webkitNotifications ? window.webkitNotifications : window.Notification ? window.Notification : null;
            if(notifications) {
                var newState = !notificationsOn;
                if(!isPermissionGranted()) {
                    notifications.requestPermission(updateNotificationsCaption);
                    newState = true;            
                }
                if(isPermissionGranted()) {
                    notificationsOn = newState;
                    window.localStorage.setItem('NotificationsOn', notificationsOn);
                }
            }
            else
                window.alert('Your browser does not support desktop notifications.');
            updateNotificationsCaption();
        }
        function showOptions() {
            var promptResult = window.prompt('Autohide timeout (in milliseconds, "0" to disable autohide):', notificationsTimeout);
            if(promptResult!=null) {
                notificationsTimeout = parseInt(promptResult || 0);
                window.localStorage.setItem('NotificationsTimeout', notificationsTimeout);
            }
        }
        function isWindowFocused() {
            return isOpera && !hasBeenBlurred || window.document.hasFocus && window.document.hasFocus();
        }
        function pollWindowFocus(evt) {
            if(isWindowFocused()) 
                onWindowFocus();
        }
        function onWindowFocus(evt) {
            hasBeenBlurred = false;
            padChatNotificationSenders = [];
            padChatNotificationLines = [];
            setTimeout(updateTitle, isChrome ? 500 : 0);
            hideNotification();
        }
        function onWindowBlur(evt) {
            hasBeenBlurred = true;
        }
        function onWindowUnload(evt) {
            padChatNotificationSenders = [];
            padChatNotificationLines = [];
            hideNotification();
        }
    }
})();
