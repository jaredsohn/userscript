// ==UserScript==
// @name       WebChat Mini
// @namespace  Webchat
// @version    0.1.1
// @include      http://*.forumcommunity.net/*
// @include      http://*.forumfree.net/*
// @include      http://*.blogfree.net/*
// ==/UserScript==

//incudes js from
// http://irc.forumfree.it/chat/Scripts/ChatEngine.js
// http://irc.forumfree.it/chat/Scripts/Protocol.js

if (top == self) {

    function UserData (protocolIdentity) {
    Object.defineProperties(this, {
        id: {
            value: protocolIdentity.Id
        },
        service: {
            value: protocolIdentity.Service
        },
        serviceNick: {
            value: protocolIdentity.ServiceNick
        },
        avatar: {
            value: protocolIdentity.Avatar || window.chatDefaultAvatar || 'http://irc.forumfree.it/chat/Content/Images/avatar.png'
        }
    });
}

UserData.prototype.toProtocol = function () {
    return { Id: this.id, Service: this.service, ServiceNick: this.serviceNick, Avatar: this.avatar };
};

UserData.prototype.equalTo = function (other) {
    return other && other.id === this.id && other.service === this.service;
};

UserData.prototype.toString = function () {
    return '[UserData {id: ' + this.id + ', service: ' + this.service + '}]';
};

function ChannelData (protocolIdentity) {
    Object.defineProperties(this, {
        domain: {
            value: protocolIdentity.Domain
        },
        service: {
            value: protocolIdentity.Service
        }
    });
}

ChannelData.prototype.toProtocol = function () {
    return { Domain: this.domain, Service: this.service };
};

ChannelData.prototype.equalTo = function (other) {
    return other && other.domain === this.domain && other.service === this.service;
};

ChannelData.prototype.toString = function () {
    return '[ChannelData {domain: ' + this.domain + ', service: ' + this.service + '}]';
};

function Protocol (connectionType, eventHandlers, logger, fid) {
    'use strict';

    logger = logger ? logger : (console ? console : {
        log: function () {
        }
    });

    fid = !fid ? "ff3" : fid;

    var online = false,
        sequentialsId = 0,
        websocketSession,
        onIdEvents = {},
        userDataList = [];

    /*
     Esempio di connectionData:
     {
     Type: tipo di connessione che si vuole effettuare(Webchat, WebchatMini, Manager),
     Service: Service da cui ci si connette(Forumfree, Forumcommunity, Blogfree),
     Id: ID utente
     Session: ID sessione
     }

     Esempio di eventHandlers:
     {
     onEvent1: {
     Set: function() {...}
     Remove: function() {...}
     },
     onEvent2: {...},
     ...
     }
     */

    function identityToUserData (identity) {
        for (var i = 0; i < userDataList.length; i++) {
            var userData = userDataList[i];
            if (userData.id === identity.Id && userData.service === identity.Service) {
                return userData;
            }
        }
    }

    function findId (message) {
        return message.Reference ? message.Reference.Id : undefined;
    }

    function unknownMessage (raw) {
        logger.log('Protocol: Info: Unknown message' + raw);
    }

    function eventHandlerNotFoundFor (raw) {
        logger.log('Protocol: Info: Event handler not found for: ' + raw);
    }

    function sendQuery (command, onSuccess, onError) {
        if (onSuccess || onError) {
            onIdEvents[(command.Id = sequentialsId++)] = {
                onSuccess: onSuccess,
                onError: onError
            };
        }

        sendJson({
            Action: 'Query',
            Type: 'Request',
            Command: command
        });
    }

    function sendJson (message) {
        sendRaw(JSON.stringify(message));
    }

    function sendRaw (raw) {
        websocketSession.send(raw);
        logger.log('Protocol: Debug: Sent: ' + raw);
    }

    function sendPing () {
        sendRaw('{"Action":"Ping"}');
    }

    function onMessage (raw) {
        function handleQuery () {
            var id = findId(message),
                event = id === undefined ? undefined : onIdEvents[id],
                handler = event ? (message.Type === 'Error' ? event.onError : event.onSuccess) : undefined;

            if (handler) {
                handler(message);
                delete onIdEvents[id];
            } else {
                eventHandlerNotFoundFor(raw);
            }
        }

        function handleUserData () {
            if (message.Error) {
                var eventHandler = eventHandlers.onUserData;
                if (eventHandler && eventHandler.onError) {
                    eventHandler.onError(message);
                } else {
                    eventHandlerNotFoundFor('UserData');
                }
            } else {
                var ownUserData = new UserData(message.Identity);
                userDataList.push(ownUserData);

                online = true;

                if (connectionType === Protocol.ConnectionType.Manager || connectionType === Protocol.ConnectionType.Webchat) {
                    if (eventHandlers.onUserData && eventHandlers.onUserData.onSuccess) {
                        eventHandlers.onUserData.onSuccess(ownUserData, message);
                    } else {
                        eventHandlerNotFoundFor('UserData');
                    }
                } else {
                    var contacts = {
                            online: [],
                            offline: [],
                            request: [],
                            incoming: []
                        },
                        i, userData;

                    for (i = 0; i < message.Contacts.Online.length; i++) {
                        userData = new UserData(message.Contacts.Online[i]);
                        contacts.online.push(userData);
                        userDataList.push(userData);
                    }

                    for (i = 0; i < message.Contacts.Offline.length; i++) {
                        userData = new UserData(message.Contacts.Offline[i]);
                        contacts.offline.push(userData);
                        userDataList.push(userData);
                    }

                    for (i = 0; i < message.Contacts.Requests.length; i++) {
                        var yourRequestItem = message.Contacts.Requests[i];
                        userData = new UserData(yourRequestItem.Identity);
                        userDataList.push(userData);
                        contacts.request.push({userData: userData, message: yourRequestItem.Reason});
                    }

                    for (i = 0; i < message.Contacts.Incomings.length; i++) {
                        var requestItem = message.Contacts.Incomings[i];
                        userData = new UserData(requestItem.Identity);
                        userDataList.push(userData);
                        contacts.incoming.push({userData: userData, message: requestItem.Reason});
                    }

                    var conversations = [];

                    for (i = 0; i < message.Conversations.length; i++) {
                        var conversationItem = message.Conversations[i];
                        userData = identityToUserData(conversationItem.Identity);
                        if (!userData) {
                            logger.log('Protocol.onUserData: UserData for ' + conversationItem.Identity + 'not found');
                            continue;
                        }
                        var conversation = {
                            userData: userData,
                            messages: [],
                            lastRead: new Date(Date.parse(conversationItem.LastRead))
                        };
                        conversations.push(conversation);

                        for (var j = 0; j < conversationItem.Messages.length; j++) {
                            var messageItem = conversationItem.Messages[j];
                            conversation.messages.push({
                                userData: messageItem.ByYou === true ? ownUserData : userData,
                                message: messageItem.Message,
                                date: new Date(Date.parse(messageItem.Date))
                            });
                        }
                    }

                    if (eventHandlers.onUserData && eventHandlers.onUserData.onSuccess) {
                        eventHandlers.onUserData.onSuccess(ownUserData, contacts, conversations, message);
                    } else {
                        eventHandlerNotFoundFor('UserData');
                    }
                }
            }
        }

        function handlePresence () {
            var event, userData;

            switch (message.Type) {
                case 'Online':
                    if (message.To && (event = eventHandlers.onChannelUserEnter)) {
                        event(new ChannelData(message.To), new UserData(message.From), message);
                    } else if (event = eventHandlers.onUserOnline) {
                        event(identityToUserData(message.Identity), message);
                    }
                    break;
                case 'Offline':
                    if (message.To && (event = eventHandlers.onChannelUserLeave)) {
                        event(new ChannelData(message.To), new UserData(message.From), message);
                    } else if (event = eventHandlers.onUserOffline) {
                        event(identityToUserData(message.Identity), message);
                    }
                    break;
                case 'Request':
                    userData = new UserData(message.Identity);
                    userDataList.push(userData);
                    if (event = eventHandlers.onContactRequest) {
                        event(userData, message.Reason, message);
                    }
                    break;
                case 'Requested':
                    userData = new UserData(message.Identity);
                    userDataList.push(userData);
                    if (event = eventHandlers.onYourContactRequest) {
                        event(userData, message.Reason, message);
                    }
                    break;
                case 'Accept':
                    if (event = eventHandlers.onContactAccept) {
                        event(identityToUserData(message.Identity) || new UserData(message.Identity), message);
                    }
                    break;
                case 'Accepted':
                    if (event = eventHandlers.onYourContactAccept) {
                        event(identityToUserData(message.Identity) || new UserData(message.Identity), message);
                    }
                    break;
                case 'Unsubscribe':
                    if (event = eventHandlers.onContactRemove) {
                        event(identityToUserData(message.Identity) || new UserData(message.Identity), message);
                    }
                    break;
                case 'AlreadyJoined':
                    if(event = eventHandlers.onAlreadyJoined) {
                        event(message.Channel, message.OperatorList, message.MomentaryOperatorList, message.VoiceList, message.UserList);
                    }
                case 'Join':
                    if (event = eventHandlers.onJoin) {
                        event(message.Channel, message.User, message.Status);
                    }
                    break;
                case 'Part':
                    if (event = eventHandlers.onPart) {
                        event(message.Channel, message.User, message.Reason);
                    }
                    break;
                case 'Kick':
                    if(event = eventHandlers.onKick) {
                        event(message.Channel, message.User, message.Reason);
                    }
                    break;
                case 'Status':
                    switch (message.Status.Action) {
                        case 'Error':
                            if (event = eventHandlers.onError) {
                                event(message);
                            }
                            break;
                        case 'Topic':
                            if (event = eventHandlers.onChannelTopic.Set) {
                                event(message.To, message.From, message.Status.Topic, message);
                            }
                            break;
                        case 'Mode':
                            if (event = eventHandlers.onChannelMode.Set) {
                                var option = (message.Status.Type === 'Set'),
                                    password = message.Status.Password;
                                event(message.To, message.From, message.Status.Mode, option, password, message);
                            }
                            break;
                        case 'IrcBan':
                            if (event = (message.Status.Type === 'Set' ? eventHandlers.onIrcBan.Set : eventHandlers.onIrcBan.Remove)) {
                                event(message.To, message.From, message.Status.Mask, message);
                            }
                            break;
                        case 'IrcAkick':
                            if (event = (message.Status.Type === 'Set' ? eventHandlers.onIrcAkick.Set : eventHandlers.onIrcAkick.Remove)) {
                                event(message.To, message.From, message.Status.Mask, message.Status.Reason, message);
                            }
                            break;
                        case 'Voice':
                            if (event = (message.Status.Type === 'Set' ? eventHandlers.onVoice.Set : eventHandlers.onVoice.Remove)) {
                                event(message.To, message.From, message.Status.Voice, message);
                            }
                            break;
                        case 'WBan':
                            if (event = (message.Status.Type === 'Set' ? eventHandlers.onWBan.Set : eventHandlers.onWBan.Remove)) {
                                event(message.To, message.From, message.Status.Ban, message.Status.Reason, message);
                            }
                            break;
                        case 'Ignore':
                            if (event = (message.Status.Type === 'Set' ? eventHandlers.onContactIgnoreSet : eventHandlers.onContactIgnoreRemove)) {
                                event(identityToUserData(message.Status.Identity) || new UserData(message.Status.Identity), message);
                            }
                            break
                    }
                    break;

            }

            if (event === undefined) {
                eventHandlerNotFoundFor(raw);
            }
        }

        function handleMessage () {
            var event;

            if (message.Type === 'Relay') {
                if (message.To) {
                    if (event = eventHandlers.onChannelMessageRelay) {
                        event(message.To, message.From, message);
                    }
                } else if (event = eventHandlers.onUserMessageRelay) {
                    event(identityToUserData(message.From) || new UserData(message.From), message.Message, message);
                }
            } else {
                if (message.To) {
                    if (event = eventHandlers.onChannelMessage) {
                        event(message.To, message.From, message.Message, message);
                    }
                } else if (event = eventHandlers.onUserMessage) {
                    event(identityToUserData(message.From) || new UserData(message.From), message.Message, message);
                }
            }

            if (!event) {
                eventHandlerNotFoundFor(raw);
            }
        }

        function handleError () {
            eventHandlers.onError(message);
        }

        var message = JSON.parse(raw);
        switch(message.Action) {
            case 'Ping':
                sendPing();
                break;
            case 'UserData':
                handleUserData();
                break;
            case 'Error':
                handleError();
                break;
            case 'Query':
                handleQuery();
                break;
            case 'Message':
                handleMessage();
                break;
            case 'Presence':
                handlePresence();
                break;
            default:
                unknownMessage(raw);
        }
    }

    websocketSession = new WebSocket('ws://' + Protocol.Urls.server + ':843/' + connectionType + '/' + fid);

    websocketSession.onerror = function (event) {
        logger.log('Protocol: Error: Websocket Error: ' + event.error);
        if (eventHandlers.onError) eventHandlers.onError(event.error);
    };

    websocketSession.onopen = function () {
        logger.log('Protocol: Info: Connected');
        if (eventHandlers.onConnect) eventHandlers.onConnect();
    };

    websocketSession.onmessage = function (event) {
        logger.log('Protocol: Debug: Received: ' + event.data);
        onMessage(event.data);
    };

    websocketSession.onclose = function () {
        logger.log('Protocol: Info: Disconnect');
    };

    this.sendQuery = sendQuery;

    this.sendMessage = function (type, identity, message) {
        sendJson({
            Action: 'Message',
            Type: type,
            To: identity,
            Message: message
        });
    };

    this.fastQuit = function () {
        logger.log('Protocol: Info: Fast Quit');

        if (!online) {
            throw new Error('Not connected');
        }

        sendQuery({ Action: 'Quit' }, function () {
            online = false;
        });
    };

    this.quit = function () {
        logger.log('Protocol: Info: Quit');
        
        if (!online) {
            throw new Error('Not connected');
        }

        sendQuery({ Action: 'Quit' }, function () {
            online = false;
            if (eventHandlers.onQuit) eventHandlers.onQuit();
        });
    };

    Object.defineProperty(this, 'isOnline', {        
       get: function () {
           return online;
       }
    });
}

Protocol.Urls = (function () {
    'use strict';

    var server;

    if (window.location.hostname.substring(window.location.hostname.length - 13) === '.forumfree.it') {
        server = 'irc.forumfree.it';
    } else if (window.location.hostname.substring(window.location.hostname.length - 19) === '.forumcommunity.net') {
        server = 'irc.forumcommunity.net';
    } else if (window.location.hostname.substring(window.location.hostname.length - 13) === '.blogfree.net') {
        server = 'irc.blogfree.net';
    } else if (window.chatLocalDebug) {
        server = window.location.hostname;
    } else {
        throw new Error('Cannot find adeguate domain for: ' + document.location.hostname);
    }

    return Object.freeze({
        server: server
    });
})();

Protocol.ConnectionType = { Webchat: 'webchat', WebchatMini: 'webchatmini', Manager: 'edit' };
Protocol.MessageType = { PrivateChat: 'Chat', Groupchat: 'Groupchat' };

Object.freeze(Protocol);
    
webchatMini = (function () {
    'use strict';

    var FFChatLogging = (function () {
        var useDebug = document.location.href === 'http://chat.forumfree.it/?debug' || document.location.href === 'http://ffircd.blogfree.net/?debug',
            isConsole = console !== undefined;

        if (useDebug) {
            var logWindow = $('<div id="consoleWindow" style="display:block; padding:10px; border:solid 1px black;"></div>').appendTo('body');
        }

        return Object.freeze({
            log: function (message) {
                if (useDebug) {
                    if (typeof message === 'string') {
                        logWindow.append('<p>' + $('<p></p>').text(message).html() + '</p>');
                    } else {
                        logWindow.append('<p>' + jsDump.parse(message) + '</p>');
                    }
                }

                if (isConsole) {
                    console.log(message);
                }
            }
        });
    })();

    window.error = function (errorMessage, fileName, lineNumber) {
        FFChatLogging.log(errorMessage);
        FFChatLogging.log(fileName);
        FFChatLogging.log(lineNumber);
    };

    var util = {
        pageIsVisible: (function() {
            var visibility = true;

            window.addEventListener('focus', function() {
                visibility = true;
            }, true);
            window.addEventListener('blur', function() {
                visibility = false;
            }, true);

            return function() {
                return visibility;
            };
        })(),
        profileUrl: function(userData) {
            switch (userData.service) {
            case 'ForumFree':
                return 'http://www.forumfree.it/?act=Profile&MID=' + userData.id;
            case 'ForumCommunity':
                return 'http://www.forumcommunity.net/?act=Profile&MID=' + userData.id;
            case 'BlogFree':
                return 'http://www.blogfree.net/?act=Profile&MID=' + userData.id;
            default:
                throw new Error('Invalid userData: unknow service');
            }
        },
        privateMessageUrl: function(userData) {
            switch (userData.service) {
            case 'ForumFree':
                return 'http://www.forumfree.it/?act=Msg&CODE=4&MID=' + userData.id;
            case 'ForumCommunity':
                return 'http://www.forumcommunity.net/?act=Msg&CODE=4&MID=' + userData.id;
            case 'BlogFree':
                return 'http://www.blogfree.net/?act=Msg&CODE=4&MID=' + userData.id;
            default:
                throw new Error('Invalid userData: unknow service');
            }
        }
    };

    function TitleNotify() {
        var vendorHidden, vendorVisibilitychange;

        if (document.hidden !== undefined) {
            vendorHidden = 'hidden';
            vendorVisibilitychange = 'visibilitychange';
        } else if (document.msHidden !== undefined) {
            vendorHidden = 'msHidden';
            vendorVisibilitychange = 'msvisibilitychange';
        } else if (document.mozHidden !== undefined) {
            vendorHidden = 'mozHidden';
            vendorVisibilitychange = 'mozvisibilitychange';
        }

        if (vendorVisibilitychange) {
            document.addEventListener(vendorVisibilitychange, function () {
                if (!document[vendorHidden] && document.title.length > 4 && document.title.substring(0, 3) === '(!)') {
                    document.title = document.title.substring(4);
                }
            });
        }

        this.set = function () {
            if (vendorHidden && document[vendorHidden] && !(document.title.length > 4 && document.title.substring(0, 3) === '(!)')) {
                document.title = '(!) ' + document.title;
            }
        };
    }

    function MessageTicker() {
        var tickerElement = document.getElementById('chat_notify_message'),
            messageElement = tickerElement.firstElementChild,
            serviceNickText = messageElement.firstElementChild.firstChild,
            messageText = messageElement.childNodes[1],
            timer;

        function hide() {
            timer = null;
            $(tickerElement).hide('slow');
        }

        function updateTicker(serviceNick, message) {
            serviceNickText.textContent = serviceNick;
            messageText.textContent = message;
        }

        this.add = function (userData, message) {
            if (timer) {
                clearTimeout(timer);
                timer = setTimeout(hide, 5000);
                $(messageElement).slideUp('slow', function () {
                    updateTicker(userData.serviceNick, message);
                });
            } else {
                timer = setTimeout(hide, 5000);
                updateTicker(userData.serviceNick, message);
                $(tickerElement).show('slow', function () {
                    updateTicker(userData.serviceNick, message);
                });
            }
        };

        this.hide = function () {
            if (!timer) {
                clearTimeout(timer);
            }
            hide();
        };
    }

    function AudioNotify() {
        var audioElement = document.getElementById('chat_audio_notify');

        Object.defineProperty(this, 'isEnabled', {
            get: function () {
                return localStorage.getItem('chat_audio_notify') === null;
            }
        });

        this.toggle = function () {
            if (this.isEnabled) {
                localStorage.setItem('chat_audio_notify', 'disabled');
                return false;
            } else {
                localStorage.removeItem('chat_audio_notify');
                audioElement.play();
                return true;
            }
        };

        this.play = function () {
            if (this.isEnabled) {
                audioElement.play();
            }
        };
    }

    function Emoticons() {
        var internalEmoticons, emoticon;

        if (window.emoticons) {
            internalEmoticons = window.emoticons;
        } else {
            internalEmoticons = {
                ':)': 'http://img.forumfree.net/html/emoticons/smile.gif',
                ':D': 'http://img.forumfree.net/html/emoticons/biggrin.gif',
                ';)': 'http://img.forumfree.net/html/emoticons/wink.gif',
                ':P': 'http://img.forumfree.net/html/emoticons/tongue.gif',
                '^_^': 'http://img.forumfree.net/html/emoticons/happy.gif',
                '-_-': 'http://img.forumfree.net/html/emoticons/sleep.gif',
                ':(': 'http://img.forumfree.net/html/emoticons/sad.gif'
            };

            if (window.api && window.api.emoticons) {
                for (var i = 0; i < window.api.emoticons.length; ++i) {
                    emoticon = window.api.emoticons[i];
                    var image = emoticon['image'];
                    if (emoticon['image'].substring(0, 7) != 'http://') {
                        image = 'http://img.forumfree.net/html/emoticons/' + emoticon['image'];
                    }
                    internalEmoticons[emoticon['typed']] = image;
                }
            }
        }

        return internalEmoticons;
    }

    function ChatStatus(onSetOnline, onSetOffline) {
        var online;

        Object.defineProperty(this, 'isOnline', {
            get: function () {
                if (online !== undefined) return online;

                for (var aCouple, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/) ; nIdx < aCouples.length; nIdx++) {
                    aCouple = aCouples[nIdx].split(/\s*=\s*/);
                    if (aCouple.length > 1) {
                        if (unescape(aCouple[0]) === 'chat_online') {
                            return false;
                        }
                    }
                }
                return true;
            },
            set: function (val) {
                online = val;
                if (val) {
                    document.cookie = 'chat_online=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Domain=' + Protocol.Urls.server.substring(3);
                    if (onSetOnline) onSetOnline();
                } else {
                    document.cookie = 'chat_online=0; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/; Domain=' + Protocol.Urls.server.substring(3);
                    if (onSetOffline) onSetOffline();
                }
            }
        });


    }

    function SettingsMenu() {
        var menuElement = document.getElementById('chat_settings_menu'),
            audioElement = {
                button: document.getElementById('chat_audio_button'),
                text: document.querySelector('#chat_audio_button > span')
            },
            disconnectElement = {
                button: document.getElementById('chat_disconnect_button'),
                text: document.querySelector('#chat_disconnect_button > span')
            };

        function hide() {
            menuElement.style.display = 'none';
        };

        function settingOn(element) {
            element.classList.remove('chat_setting_off');
            element.classList.add('chat_setting_on');
        }

        function settingOff(element) {
            element.classList.remove('chat_setting_on');
            element.classList.add('chat_setting_off');
        }

        if (!audioNotify.isEnabled) {
            audioElement.text.innerHTML = 'attiva audio';
            settingOff(audioElement.button);
        }

        if (!chatStatus.isOnline) {
            disconnectElement.button.innerHTML = 'entra in chat';
            settingOff(disconnectElement.button);
        }

        audioElement.button.onclick = function () {
            if (audioNotify.toggle()) {
                audioElement.text.innerHTML = 'disattiva audio';
                settingOn(audioElement.button);
            } else {
                audioElement.text.innerHTML = 'attiva audio';
                settingOff(audioElement.button);
            }
            hide();
        };

        document.getElementById('chat_feedback_button').onclick = function () {
            hide();
        };

        disconnectElement.button.onclick = function () {
            if (chatStatus.isOnline) {
                chatApplication.chatSession.sendQuery({ Action: 'AnnunceOwnOffline' },
                    function () {
                        chatStatus.isOnline = false;
                    });
                disconnectElement.text.innerHTML = 'entra in chat';
                settingOff(disconnectElement.button);
            } else {
                chatStatus.isOnline = true;
                disconnectElement.text.innerHTML = 'esci dalla chat';
                settingOn(disconnectElement.button);
            }
            hide();
        };
    }

    function ChatWindow() {
        var chatMain = document.getElementById('chat_main'),
            chatShow = document.getElementById('chat_show');

        Object.defineProperty(this, 'isVisible', {
            get: function () {
                return chatMain.style.display == 'block';
            }
        });

        this.show = function () {
            chatShow.style.display = 'none';
            chatMain.style.display = 'block';
        };

        this.hide = function () {
            chatMain.style.display = 'none';
            chatShow.style.display = 'block';
        };

        this.setOnline = function () {
            chatShow.classList.remove('chat_offline');
            chatMain.classList.remove('chat_offline');
        };

        this.setOffline = function () {
            chatShow.classList.add('chat_offline');
            chatMain.classList.add('chat_offline');
        };
    }

    function ContactList(online, offline) {
        var counters = document.getElementsByClassName('chat_online_counter'),
            internalContacts = {},
            currentActive;

        function updateOnlineCounters() {
            var onlineCount = online.length;
            counters[0].textContent = onlineCount;
            counters[1].textContent = onlineCount;
            counters[2].textContent = onlineCount;
        }

        function removeContactFrom(userData, contacts) {
            for (var i = 0; i < contacts.length; i++) {
                if (userData.equalTo(contacts[i])) {
                    contacts.splice(i, 1);
                    return true;
                }
            }

            return false;
        }

        function Contact(userData, isOnline) {
            var contactDiv = document.createElement('DIV'),
                contactAvatar = document.createElement('IMG'),
                messageNotify = document.createElement('DIV'),
                contactStatus = document.createElement('DIV'),
                contactNick = document.createElement('DIV'),
                contactNickLink = document.createElement('A'),
                contactService = document.createElement('DIV'),
                self = this,
                toggleConversationCallback = function () {
                    var conversation = chatApplication.conversationManager.get(userData);

                    if (conversation && chatApplication.pageManager.currentPage === conversation) {
                        chatApplication.pageManager.setCurrent();

                        contactDiv.classList.remove('chat_conversation_active');
                        currentActive = null;
                    } else {
                        if (!conversation) {
                            conversation = chatApplication.conversationManager.open(userData);
                            if (!isOnline) {
                                conversation.setOffline();
                            }
                        } else {
                            messageNotify.style.display = 'none';
                            chatApplication.visualNotify.remove(userData);
                            conversation.read();
                        }

                        chatApplication.pageManager.setCurrent(conversation);

                        if (currentActive) {
                            currentActive.htmlElement.classList.remove('chat_conversation_active');
                        }
                        currentActive = self;
                        contactDiv.classList.add('chat_conversation_active');

                        conversation.scrollDown();
                    }

                    return false;
                };

            contactDiv.contact = userData;
            contactDiv.className = 'chat_friend_list ' + (isOnline ? 'chat_friend_online_list' : 'chat_friend_offline_list');

            contactAvatar.src = userData.avatar;
            contactAvatar.className = 'chat_avatar';
            contactAvatar.onclick = toggleConversationCallback;
            contactDiv.appendChild(contactAvatar);

            messageNotify.className = 'chat_unread_messages';
            messageNotify.style.display = 'none';
            contactDiv.appendChild(messageNotify);

            contactStatus.className = 'chat_friend_status_list';
            contactDiv.appendChild(contactStatus);

            contactNick.className = 'chat_nick_list';

            contactNickLink.href = '#';
            contactNickLink.textContent = userData.serviceNick;
            contactNickLink.onclick = toggleConversationCallback;
            contactNick.appendChild(contactNickLink);
            contactDiv.appendChild(contactNick);

            contactService.className = 'chat_friend_service_list';
            contactService.textContent = userData.service;
            contactDiv.appendChild(contactService);

            this.htmlElement = contactDiv;

            Object.defineProperty(this, 'online', {
                get: function () {
                    return isOnline;
                }
            });

            this.setOnline = function () {
                contactDiv.classList.remove('chat_friend_offline_list');
                contactDiv.classList.add('chat_friend_online_list');
                isOnline = true;
            };

            this.setOffline = function () {
                contactDiv.classList.remove('chat_friend_online_list');
                contactDiv.classList.add('chat_friend_offline_list');
                isOnline = false;
            };
        }

        var listElement = document.getElementById('chat_friends_list'),
            fragment = document.createDocumentFragment(),
            i, contactLength,
            contactData,
            contact;

        updateOnlineCounters();

        online.sort(function (a, b) {
            var isAinConversation = chatApplication.conversationManager.get(a),
                isBinConversation = chatApplication.conversationManager.get(b);

            if (isAinConversation && isBinConversation) {
                return a.serviceNick.localeCompare(b.serviceNick);
            }
            if (isAinConversation) {
                return -1;
            }
            if (isBinConversation) {
                return 1;
            }
            return a.serviceNick.localeCompare(b.serviceNick);
        });

        for (i = 0, contactLength = online.length; i < contactLength; i++) {
            contactData = online[i];
            contact = new Contact(contactData, true);
            internalContacts[contactData] = contact;
            fragment.appendChild(contact.htmlElement);
        }

        offline.sort(function (a, b) {
            return a.serviceNick.localeCompare(b.serviceNick);
        });

        for (i = 0, contactLength = offline.length; i < contactLength; i++) {
            contactData = offline[i];
            contact = new Contact(contactData, false);
            internalContacts[contactData] = contact;
            fragment.appendChild(contact.htmlElement);
        }

        listElement.innerHTML = '';
        listElement.appendChild(fragment);

        this.notifyOn = function (userData) {
            internalContacts[userData].htmlElement.children[1].style.display = 'block';
        };

        this.notifyOff = function (userData) {
            internalContacts[userData].htmlElement.children[1].style.display = 'none';
        };

        this.setOnline = function (userData) {
            var onlineLength = online.length,
                contactInConversation = chatApplication.conversationManager.get(userData);

            removeContactFrom(userData, offline);
            contact = internalContacts[userData];
            listElement.removeChild(contact.htmlElement);
            contact.setOnline();

            if (onlineLength === 0) {
                if (offline.length === 0) {
                    listElement.appendChild(contact.htmlElement);
                } else {
                    listElement.insertBefore(contact.htmlElement, listElement.firstElementChild);
                }
                online.push(userData);
            } else {
                for (var j = 0; j < onlineLength; j++) {
                    if (j === onlineLength - 1) {
                        listElement.insertBefore(contact.htmlElement, listElement.firstElementChild);
                        online.push(userData);
                        break;
                    }

                    var referenceContact = online[j],
                        otherContactInConversation = chatApplication.conversationManager.get(referenceContact);

                    if (contactInConversation == otherContactInConversation) {
                        if (userData.serviceNick.localeCompare(referenceContact.serviceNick) === -1) {
                            listElement.insertBefore(contact.htmlElement, internalContacts[referenceContact].htmlElement);
                            online.splice(j, 0, userData);
                            break;
                        }
                    } else if (contactInConversation && !otherContactInConversation) {
                        listElement.insertBefore(contact.htmlElement, internalContacts[referenceContact].htmlElement);
                        online.splice(j, 0, userData);
                        break;
                    }
                }
            }

            updateOnlineCounters();
        };

        this.setOffline = function (userData) {
            var offlineLength = offline.length,
                referenceContact;

            removeContactFrom(userData, online);
            contact = internalContacts[userData];
            listElement.removeChild(contact.htmlElement);
            contact.setOffline();

            if (offlineLength === 0) {
                listElement.appendChild(contact.htmlElement);
                offline.push(userData);
            } else {
                for (var j = 0; j < offlineLength; j++) {
                    if (j === offlineLength - 1) {
                        listElement.appendChild(contact.htmlElement);
                        offline.push(userData);
                        break;
                    }

                    referenceContact = offline[j];

                    if (userData.serviceNick.localeCompare(referenceContact.serviceNick) === -1) {
                        listElement.insertBefore(contact.htmlElement, internalContacts[referenceContact].htmlElement);
                        offline.splice(j, 0, userData);
                        break;
                    }
                }
            }

            updateOnlineCounters();
        };

        this.setActive = function (userData) {
            if (currentActive) {
                currentActive.htmlElement.classList.remove('chat_conversation_active');
                currentActive = null;
            }
            if (userData) {
                var contact = internalContacts[userData];
                contact.htmlElement.classList.add('chat_conversation_active');
                currentActive = contact;
            }
        };

        this.isOnline = function (userData) {
            return internalContacts[userData].online;
        };

        this.add = function (userData) {
            var contactElement = new Contact(userData, false);

            internalContacts[userData] = contactElement;

            for (var i = 0; i < offline.length; i++) {
                var contactData = offline[i];

                if (userData.serviceNick.localeCompare(contactData.serviceNick) !== 1) {
                    listElement.insertBefore(contactElement.htmlElement, internalContacts[contactData].htmlElement);
                    offline.splice(i, 0, userData);
                    return;
                }
            }

            listElement.appendChild(contactElement.htmlElement);
        };

        this.remove = function (userData) {
            var contactData;

            contact = internalContacts[userData];

            if (!contact) {
                return;
            }

            if (currentActive === contact) {
                currentActive = null;
            }

            listElement.removeChild(contact.htmlElement);
            delete internalContacts[userData];

            for (i = 0; i < online.length; i++) {
                contactData = online[i];
                if (userData.equalTo(contactData)) {
                    online.splice(i, 1);
                    updateOnlineCounters();
                    return;
                }
            }

            for (i = 0; i < offline.length; i++) {
                contactData = offline[i];
                if (userData.equalTo(contactData)) {
                    offline.splice(i, 1);
                    return;
                }
            }
        };
    }

    function messageBody(message, onImageLoad) {
        var container = document.createElement('P');
        container.className = 'chat_message';

        function appendText(text) {
            lastContainerChild = container.lastChild;
            if (lastContainerChild && lastContainerChild.nodeType === 3) {
                lastContainerChild.appendData(text);
            } else {
                container.appendChild(document.createTextNode(text));
            }
        }

        function checkUrlProtocol(url) {
            try{
                return new URL(url).protocol !== 'javascript:';
            }
            catch (e) {
                return false;
            }
        }

        if (message.substr(0, 9) === '[sticker]' && message.substr(message.length - 10) === '[/sticker]') {
            var stickerUrl = message.substr(9, message.length - 19);
            if (checkUrlProtocol(stickerUrl)) {
                var sticker = document.createElement('IMG');
                sticker.title = 'Sticker';
                sticker.className = 'chat_sticker';
                sticker.onload = onImageLoad;
                sticker.src = message.substr(9, message.length - 19);
                container.appendChild(sticker);
            } else {
                container.appendChild(document.createTextNode(message));
            }
            return container;
        }

        var currentWord = [],
            lastContainerChild;

        for (var i = 0, messageLength = message.length; i < messageLength; ++i) {
            var currentChar = message[i],
                currentCharIsSpace = currentChar === ' ';

            if (!currentCharIsSpace) currentWord.push(currentChar);

            if (currentCharIsSpace || i === messageLength - 1) {
                var word = currentWord.join('');
                if (word.substr(0, 5) === '[img]' && word.substr(word.length - 6) === '[/img]') {
                    var imageUrl = word.substr(5, word.length - 11).trim();

                    if (!checkUrlProtocol(imageUrl)) {
                        appendText(word);
                        continue;
                    }

                    var imageLink = document.createElement('A'),
                        imageElement = document.createElement('IMG');

                    imageLink.title = 'Image';
                    imageLink.className = 'chat_message_img';
                    imageLink.href = imageUrl;
                    imageLink.target = '_blank';

                    imageElement.onload = onImageLoad;
                    imageElement.src = imageUrl;

                    imageLink.appendChild(imageElement);
                    container.appendChild(imageLink);
                } else {
                    var isIncompleteUrl = word.substr(0, 4) === 'www.';
                    if (isIncompleteUrl ||
                        word.substr(0, 7) === 'http://' ||
                        word.substr(0, 8) === 'https://' ||
                        word.substr(0, 6) === 'ftp://') {
                        var linkElement = document.createElement('A'),
                            linkText = document.createTextNode(word);
                        linkElement.href = isIncompleteUrl ? 'http://' + word : word;
                        linkElement.target = '_blank';
                        linkElement.appendChild(linkText);

                        container.appendChild(linkElement);
                    } else {
                        var emoticonImage = chatApplication.emoticons[word];
                        if (emoticonImage) {
                            var emoticonElement = document.createElement('IMG');
                            emoticonElement.src = emoticonImage;

                            container.appendChild(emoticonElement);
                        } else {
                            appendText(word);
                        }
                    }
                }

                if (currentCharIsSpace) {
                    appendText(' ');
                }

                currentWord = [];
            }
        }

        return container;
    }

    function Message(userData, message, date, onImageLoad) {
        date = date ? date : new Date();

        var container = document.createElement('DIV'),
            avatar = document.createElement('IMG'),
            messageContainer = document.createElement('DIV'),
            time = document.createElement('SPAN'),
            serviceNick = document.createElement('SPAN'),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            currentTime = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);

        container.className = chatApplication.userData.equalTo(userData) ? 'chat_discussion chat_discussion_you' : 'chat_discussion chat_discussion';

        avatar.className = 'chat_message_avatar';
        avatar.src = userData.avatar;
        container.appendChild(avatar);

        container.appendChild(messageContainer);

        time.className = 'chat_time';
        time.textContent = currentTime;
        messageContainer.appendChild(time);

        serviceNick.className = 'chat_nick';
        serviceNick.textContent = userData.serviceNick;
        messageContainer.appendChild(serviceNick);

        messageContainer.appendChild(messageBody(message, onImageLoad));


        this.element = container;

        this.userData = userData;

        this.date = date;

        this.add = function(messageFragment, date) {
            this.date = date === undefined ? new Date() : date;
            messageContainer.appendChild(messageBody(messageFragment, onImageLoad));
        };
    }

    function EmoticonsLazyView() {
        var view = document.createElement('DIV'),
            emoticonsContainer = document.createElement('UL'),
            stickersContainer = document.createElement('UL'),
            emoticonClick,
            stickerClick;

        view.className = 'chat_conversation_input_options_emoticons_box';
        view.style.display = 'none';

        emoticonsContainer.className = 'chat_emoticons_list';
        stickersContainer.className = 'chat_stickers_list';

        Object.defineProperties(this, {
            "htmlElement": {
                get: function() {
                    return view;
                }
            },
            "onEmoticonClick": {
                set: function(handler) {
                    emoticonClick = handler;
                }
            },
            "onStickerClick": {
                set: function(handler) {
                    stickerClick = handler;
                }
            }
        });

        function load() {
            for (var emoticon in chatApplication.emoticons) {
                var emoticonElement = document.createElement('LI'),
                    emoticonButton = document.createElement('BUTTON'),
                    emoticonImage = document.createElement('IMG');

                emoticonButton.onclick = (function (currentEmoticon) {
                    return function () {
                        emoticonClick(currentEmoticon);

                        view.style.display = 'none';
                    };
                })(emoticon);

                emoticonElement.appendChild(emoticonButton);

                emoticonImage.src = chatApplication.emoticons[emoticon];
                emoticonButton.appendChild(emoticonImage);

                emoticonsContainer.appendChild(emoticonElement);
            }
            view.appendChild(emoticonsContainer);

            if (chatApplication.stickers.length === 0) return;

            for (var i = 0; i < chatApplication.stickers.length; i++) {
                var sticker = chatApplication.stickers[i],
                    stickerElement = document.createElement('LI'),
                    stickerButton = document.createElement('BUTTON'),
                    stickerImage = document.createElement('IMG');

                stickerButton.title = 'Sticker';
                stickerButton.onclick = (function (currentSticker) {
                    return function () {
                        stickerClick(currentSticker);
                        view.style.display = 'none';
                    };
                })(sticker);
                stickerElement.appendChild(stickerButton);

                stickerImage.src = sticker;
                stickerButton.appendChild(stickerImage);

                stickersContainer.appendChild(stickerElement);
            }

            view.appendChild(stickersContainer);
        }

        this.hide = function () {
            view.style.display = 'none';
        };

        this.show = function() {
            if (view.childElementCount === 0) load();
            view.style.display = 'block';
        };

        this.toggle = function() {
            if (view.style.display === 'none') {
                this.show();
            } else {
                this.hide();
            }
        };
    }

    function Conversation(contact, lastRead) {
        lastRead = lastRead === undefined ? new Date() : lastRead;

        var messageList = [],
            profileUrl = util.profileUrl(contact),
            container = document.createElement('DIV'),
            header = document.createElement('DIV'),
            avatar = document.createElement('IMG'),
            serviceNick = document.createElement('SPAN'),
            options = document.createElement('UL'),
            closeButton = document.createElement('BUTTON'),
            closeSpan = document.createElement('SPAN'),
            viewProfile = document.createElement('LI'),
            viewProfileLink = document.createElement('A'),
            blockContact = document.createElement('LI'),
            blockContactLink = document.createElement('A'),
            messages = document.createElement('DIV'),
            inputContainer = document.createElement('DIV'),
            input = document.createElement('TEXTAREA'),
            inputOptions = document.createElement('DIV'),
            emoticonsButton = document.createElement('BUTTON'),
            emoticons = new EmoticonsLazyView(),
            offlineContainer = document.createElement('DIV'),
            offlineMessage = document.createElement('P'),
            offlineMessageLink = document.createElement('P'),
            offlineMessageLinkLink = document.createElement('A');

        function close() {
            chatApplication.pageManager.setCurrent();
            chatApplication.contactList.setActive();
            messageList = [];
            messages.innerHTML = '';
            input.value = '';
            chatApplication.chatSession.sendQuery({
                Action: 'Conversation',
                Type: 'Close',
                Identity: contact.toProtocol()
            });
        }

        container.style.display = 'none';
        container.className = 'chat_page';

        header.className = 'chat_conversation_header';
        container.appendChild(header);

        avatar.src = contact.avatar;
        avatar.className = 'chat_avatar';
        header.appendChild(avatar);

        serviceNick.textContent = contact.serviceNick;
        header.appendChild(serviceNick);

        options.className = 'chat_conversation_toolbox';
        header.appendChild(options);

        viewProfile.className = 'chat_conversation_toolbox_profile_' + contact.service.toLowerCase();
        options.appendChild(viewProfile);

        viewProfileLink.href = profileUrl;
        viewProfileLink.title = 'Visualizza il profilo';
        viewProfileLink.target = '_blank';
        viewProfileLink.textContent = contact.service;
        viewProfile.appendChild(viewProfileLink);

        blockContact.className = 'chat_conversation_toolbox_ignore';
        options.appendChild(blockContact);

        blockContactLink.href = '#';
        blockContactLink.title = 'Elimina questa persona dai tuoi contatti';
        blockContactLink.textContent = 'Blocca';
        blockContactLink.onclick = function () {
            if (confirm("Sei sicuro di voler bloccare questa persona?")) {
                chatApplication.ignoreSet(contact);
            }
        };
        blockContact.appendChild(blockContactLink);

        closeButton.className = 'chat_conversation_close';
        closeButton.title = 'Chiudi la conversazione';
        closeButton.onclick = close;
        header.appendChild(closeButton);

        closeSpan.textContent = 'Chiudi';
        closeButton.appendChild(closeSpan);

        messages.className = 'chat_conversation_main';
        container.appendChild(messages);

        inputContainer.className = 'chat_conversation_input';
        container.appendChild(inputContainer);

        input.rows = 2;
        input.className = 'textinput';
        input.onkeypress = function (event) {
            if (event.keyCode === 13) {
                chatApplication.sendMessage(contact, input.value);
                input.value = '';
                return false;
            }
        };
        inputContainer.appendChild(input);

        inputOptions.className = 'chat_conversation_input_options';
        inputContainer.appendChild(inputOptions);

        emoticonsButton.className = 'chat_conversation_input_options_emoticons';
        emoticonsButton.onclick = function () {
            emoticons.toggle();
            return false;
        };
        inputOptions.appendChild(emoticonsButton);
        inputOptions.appendChild(emoticons.htmlElement);

        emoticons.onEmoticonClick = function(emoticon) {
            input.focus();
            if (input.value) {
                if (input.value.substring(input.value.length - 1) === ' ') {
                    input.value = input.value + emoticon + ' ';
                } else {
                    input.value = input.value + ' ' + emoticon + ' ';
                }
            } else {
                input.value = emoticon + ' ';
            }
        };
        emoticons.onStickerClick = function(sticker) {
            chatApplication.sendMessage(contact, '[sticker]' + sticker + '[/sticker]');
        };

        offlineContainer.className = 'chat_conversation_offline';
        container.appendChild(offlineContainer);

        offlineMessage.textContent = contact.serviceNick + ' non è online.';
        offlineContainer.appendChild(offlineMessage);

        offlineContainer.appendChild(offlineMessageLink);

        offlineMessageLinkLink.href = util.privateMessageUrl(contact);
        offlineMessageLinkLink.target = '_blank';
        offlineMessageLinkLink.textContent = 'Invia un messaggio privato';
        offlineMessageLink.appendChild(offlineMessageLinkLink);

        document.getElementById('chat_conversations').appendChild(container);


        this.type = PageType.Conversation;

        this.userData = contact;

        this.addMessage = function (userData, message, date) {
            var lastMessage = messageList[messageList.length - 1];

            if (lastMessage && lastMessage.userData.equalTo(userData)) {
                lastMessage.add(message);
            } else {
                lastMessage = new Message(userData, message, date, (function(self) {
                    return function() {
                        self.scrollDown();
                    };
                })(this));
                messageList.push(lastMessage);
                messages.appendChild(lastMessage.element);
            }

            messages.scrollTop = messages.scrollHeight;
        };

        this.show = function () {
            container.style.display = 'block';
            input.focus();
        };

        this.hide = function () {
            container.style.display = 'none';
        };

        this.setOnline = function () {
            offlineContainer.style.display = 'none';
            inputContainer.style.display = 'block';
        };

        this.setOffline = function () {
            inputContainer.style.display = 'none';
            offlineContainer.style.display = 'block';
        };

        this.focus = function () {
            input.focus();
        };

        this.read = function () {
            var lastMessage = messageList[messageList.length - 1];
            if (lastMessage && lastMessage.date > lastRead) {
                chatApplication.chatSession.sendQuery({
                    Action: 'Conversation',
                    Type: 'Read',
                    Identity: contact.toProtocol()
                });
                lastRead = new Date();
            }
        };

        this.scrollDown = function () {
            messages.scrollTop = messages.scrollHeight;
        };

        this.close = close;
    }

    function ConversationManager() {
        var conversations = {};

        function checkedGet(userData) {
            var conversation = conversations[userData];
            if (!conversation) {
                throw new Error('Conversation not found');
            }
            return conversation;
        }

        this.get = function (userData) {
            return conversations[userData];
        };

        this.open = function (userData, lastRead) {
            return (conversations[userData] = new Conversation(userData, lastRead));
        };

        this.close = function (userData) {
            var conversation = conversations[userData];
            if (conversation) {
                conversation.close();
                delete conversations[userData];
            }
        };

        this.show = function (userData) {
            var conversation = checkedGet(userData);
            conversation.show();
            chatApplication.pageManager.setCurrent(conversation);
        };

        this.hide = function (userData) {
            checkedGet(userData).hide();
        };
    }

    function ContactsManager(contacts) {
        var internalYourRequest = {},
            internalRequest = {},
            container = document.createElement('DIV'),
            title = document.createElement('H3'),
            addRequestButton = document.createElement('BUTTON'),
            requestContainer = document.createElement('DIV'),
            requestForm = document.createElement('FORM'),
            requestServiceContainer = document.createElement('P'),
            requestServiceLabel = document.createElement('LABEL'),
            requestServiceSelect = document.createElement('SELECT'),
            requestServiceSelectForumFree = document.createElement('OPTION'),
            requestServiceSelectForumCommunity = document.createElement('OPTION'),
            requestServiceSelectBlogFree = document.createElement('OPTION'),
            requestIdentityContainer = document.createElement('P'),
            requestIdentityLabel = document.createElement('LABEL'),
            requestIdentityInput = document.createElement('INPUT'),
            requestMessageContainer = document.createElement('P'),
            requestMessageLabel = document.createElement('LABEL'),
            requestMessageInput = document.createElement('TEXTAREA'),
            requestButton = document.createElement('INPUT'),
            incomingContainer = document.createElement('DIV'),
            incomingHeader = document.createElement('DIV'),
            incomingHeaderText = document.createElement('SPAN'),
            incomingList = document.createElement('DIV'),
            requestListContainer = document.createElement('DIV'),
            requestListHeader = document.createElement('DIV'),
            requestListHeaderText = document.createElement('SPAN'),
            requestList = document.createElement('DIV'),
            requestListCounter = document.getElementById('chat_request_counter');

        function updateRequestCounter(count) {
            if (count === 0) {
                requestListCounter.style.display = 'none';
                requestListCounter.textContent = 0;
            } else {
                requestListCounter.style.display = 'inline';
                requestListCounter.textContent = count;
            }
        }

        container.id = 'chat_contacts_manager';
        container.className = 'chat_page';
        container.style.display = 'none';

        title.textContent = 'gestione contatti';
        container.appendChild(title);

        addRequestButton.id = 'chat_contacts_request_button';
        addRequestButton.textContent = 'aggiungi contatto';
        addRequestButton.onclick = function () {
            requestContainer.style.display = 'block';
            requestIdentityInput.focus();
        };
        container.appendChild(addRequestButton);

        requestContainer.id = 'chat_contact_request';
        requestContainer.style.display = 'none';
        container.appendChild(requestContainer);

        requestForm.id = 'chat_contact_request_form';
        requestForm.acceptCharset = 'UTF-8';
        requestContainer.appendChild(requestForm);

        requestForm.appendChild(requestServiceContainer);

        requestServiceLabel.htmlFor = 'chat_contact_request_service';
        requestServiceLabel.textContent = 'Circuito:';
        requestServiceContainer.appendChild(requestServiceLabel);

        requestServiceSelect.id = 'chat_contact_request_service';
        requestServiceSelect.name = 'chat_contact_request_service';
        requestServiceContainer.appendChild(requestServiceSelect);

        requestServiceSelectForumFree.textContent = 'ForumFree';
        requestServiceSelect.appendChild(requestServiceSelectForumFree);

        requestServiceSelectForumCommunity.textContent = 'ForumCommunity';
        requestServiceSelect.appendChild(requestServiceSelectForumCommunity);

        requestServiceSelectBlogFree.textContent = 'BlogFree';
        requestServiceSelect.appendChild(requestServiceSelectBlogFree);

        if (Protocol.Urls.server === 'irc.forumfree.it') {
            requestServiceSelectForumFree.selected = 'selected';
        } else if (Protocol.Urls.server === 'irc.forumcommunity.net') {
            requestServiceSelectForumCommunity.selected = 'selected';
        } else {
            requestServiceSelectBlogFree.selected = 'selected';
        }

        requestForm.appendChild(requestIdentityContainer);

        requestIdentityLabel.htmlFor = 'chat_contact_request_servicenick';
        requestIdentityLabel.innerHTML = 'Nick del contatto o suo id, es: <i>Amnesiac</i> oppure <i>454332</i>:';
        requestIdentityContainer.appendChild(requestIdentityLabel);

        requestIdentityInput.id = 'chat_contact_request_servicenick';
        requestIdentityInput.spellcheck = false;
        requestIdentityInput.autocomplete = false;
        requestIdentityInput.maxLength = 35;
        requestIdentityContainer.appendChild(requestIdentityInput);

        requestForm.appendChild(requestMessageContainer);

        requestMessageLabel.htmlFor = 'chat_contact_request_message';
        requestMessageLabel.textContent = 'Messaggio da inserire nella richiesta:';
        requestMessageContainer.appendChild(requestMessageLabel);

        requestMessageInput.id = 'chat_contact_request_message';
        requestMessageContainer.appendChild(requestMessageInput);

        requestButton.id = 'chat_contact_request_send';
        requestButton.type = 'submit';
        requestButton.value = 'Invia richiesta';
        requestButton.onclick = function () {
            var service = requestServiceSelect.options[requestServiceSelect.selectedIndex].value,
                message = requestMessageInput.value.trim(),
                serviceNick = requestIdentityInput.value.trim(),
                id = parseInt(serviceNick, 10),
                identity = isNaN(id)
                    ? { ServiceNick: serviceNick, Service: service }
                    : { Id: id, Service: service },
                command = message.length === 0
                    ? { Action: 'Contact', Type: 'Request', Identity: identity }
                    : { Action: 'Contact', Type: 'Request', Identity: identity, Reason: message };

            if (serviceNick.length === 0) return false;

            chatApplication.chatSession.sendQuery(command,
                function (json) {
                    chatApplication.contactsManager.yourRequestAdd(new UserData(json.Identity), message);
                    requestContainer.style.display = 'none';
                    requestIdentityInput.value = '';
                    requestMessageInput.value = '';
                },
                function () {
                    alert('Impossibile inviare la richiesta di amicizia al contatto');
                });

            return false;
        };
        requestMessageContainer.appendChild(requestButton);


        incomingContainer.id = 'chat_contacts_incomings';
        container.appendChild(incomingContainer);

        incomingHeader.id = 'chat_contacts_incomings_header'
        incomingContainer.appendChild(incomingHeader);

        incomingHeaderText.textContent = 'richieste di amicizia';
        incomingHeader.appendChild(incomingHeaderText);

        incomingList.id = 'chat_contacts_incomings_list';
        for (var i = 0; i < contacts.incoming.length; i++) {
            var requestItem = contacts.incoming[i];
            incomingList.appendChild((internalRequest[requestItem.userData] = requestElement(requestItem.userData, requestItem.message)));
            chatApplication.visualNotify.addRequest(requestItem.userData);
        }
        if (contacts.incoming.length !== 0) {
            updateRequestCounter(contacts.incoming.length);
        }
        incomingContainer.appendChild(incomingList);

        requestListContainer.id = 'chat_contacts_requests';
        container.appendChild(requestListContainer);

        requestListHeader.id = 'chat_contacts_requests_header';
        requestListContainer.appendChild(requestListHeader);

        requestListHeaderText.textContent = 'tue richieste di amicizia';
        requestListHeader.appendChild(requestListHeaderText);

        requestList.id = 'chat_contacts_requests_list';
        for (var i = 0; i < contacts.request.length; i++) {
            var yourRequestItem = contacts.request[i];
            requestList.appendChild((internalYourRequest[yourRequestItem.userData] = yourRequestElement(yourRequestItem.userData, yourRequestItem.message)));
        }
        requestListContainer.appendChild(requestList);

        document.getElementById('chat_conversations').appendChild(container);


        function yourRequestElement(userData, message) {
            var yourRequestContainer = document.createElement('DIV'),
                yourRequestCancelButton = document.createElement('BUTTON'),
                yourRequestCancelButtonText = document.createElement('SPAN'),
                yourRequestServiceNick = document.createElement('A'),
                yourRequestMessage = document.createElement('P');

            yourRequestContainer.className = 'chat_contacts_request';

            yourRequestCancelButton.className = 'chat_contacts_request_remove';
            yourRequestCancelButton.title = 'Cancella la richiesta';
            yourRequestCancelButton.onclick = function () {
                chatApplication.ignoreSet(userData);
            };
            yourRequestContainer.appendChild(yourRequestCancelButton);

            yourRequestCancelButtonText.textContent = 'Cancella';
            yourRequestCancelButton.appendChild(yourRequestCancelButtonText);

            yourRequestServiceNick.href = util.profileUrl(userData);
            yourRequestServiceNick.target = '_blank';
            yourRequestServiceNick.textContent = userData.serviceNick;
            yourRequestContainer.appendChild(yourRequestServiceNick);

            yourRequestMessage.className = 'chat_contacts_request_message';
            yourRequestMessage.textContent = message;
            yourRequestContainer.appendChild(yourRequestMessage);

            return yourRequestContainer;
        }

        function requestElement(userData, message) {
            var requestContainer = document.createElement('DIV'),
                requestCancelButton = document.createElement('BUTTON'),
                requestCancelButtonText = document.createElement('SPAN'),
                requestAcceptButton = document.createElement('BUTTON'),
                requestAcceptButtonText = document.createElement('SPAN'),
                requestServiceNick = document.createElement('A');

            requestContainer.className = 'chat_contacts_incoming';

            requestCancelButton.className = 'chat_contacts_incoming_remove';
            requestCancelButton.title = "Rifiuta l'amicizia";
            requestCancelButton.onclick = function () {
                chatApplication.ignoreSet(userData);
            };
            requestContainer.appendChild(requestCancelButton);

            requestCancelButtonText.textContent = 'Rifiuta';
            requestCancelButton.appendChild(requestCancelButtonText);

            requestAcceptButton.className = 'chat_contacts_incoming_accept';
            requestAcceptButton.title = "Accetta l'amicizia";
            requestAcceptButton.onclick = function () {
                chatApplication.chatSession.sendQuery({ Action: 'Contact', Type: 'Accept', Identity: userData.toProtocol() },
                    function () {
                        incomingList.removeChild(requestContainer);
                        chatApplication.contactList.add(userData);
                        updateRequestCounter(incomingList.childElementCount);
                        chatApplication.visualNotify.removeRequest(userData);
                    },
                    function () {
                        alert('Impossibile accettare la richiesta del contatto');
                    });
            };
            requestContainer.appendChild(requestAcceptButton);

            requestAcceptButtonText.textContent = 'Accetta';
            requestAcceptButton.appendChild(requestAcceptButtonText);

            requestServiceNick.href = util.profileUrl(userData);
            requestServiceNick.target = '_blank';
            requestServiceNick.textContent = userData.serviceNick;
            requestContainer.appendChild(requestServiceNick);

            if (message) {
                var requestMessage = document.createElement('P')
                requestMessage.className = 'chat_contacts_request_message';
                requestMessage.textContent = message;
                requestContainer.appendChild(requestMessage);
            }

            return requestContainer;
        }

        this.type = PageType.Settings;

        this.show = function () {
            container.style.display = 'block';
        };

        this.hide = function () {
            container.style.display = 'none';
        };

        this.yourRequestAdd = function (userData, message) {
            var userElement = yourRequestElement(userData, message);
            internalYourRequest[userData] = userElement;
            requestList.appendChild(userElement);
        };

        this.yourRequestRemove = function (userData) {
            var userElement = internalYourRequest[userData];
            if (userElement) {
                requestList.removeChild(userElement);
                delete internalYourRequest[userData];
            }
        };

        this.requestAdd = function (userData, message) {
            incomingList.appendChild((internalRequest[userData] = requestElement(userData, message)));
            updateRequestCounter(incomingList.childElementCount);
            chatApplication.visualNotify.addRequest(userData);
        };

        this.requestRemove = function (userData) {
            var userElement = internalRequest[userData];
            if (userElement) {
                incomingList.removeChild(userElement);
                delete internalRequest[userData];
                updateRequestCounter(incomingList.childElementCount);
                chatApplication.visualNotify.removeRequest(userData);
            }
        };
    }

    function WelcomePage() {
        var element = document.getElementById('chat_welcome');

        this.show = function () {
            element.style.display = 'block';
        };

        this.hide = function () {
            element.style.display = 'none';
        };
    }

    function PageManager() {
        this.welcomePage = new WelcomePage();
        this.currentPage = this.welcomePage;
    }

    PageManager.prototype.setCurrent = function (element) {
        if (this.currentPage) {
            this.currentPage.hide();
        }

        if (element) {
            (this.currentPage = element).show();
        } else {
            (this.currentPage = this.welcomePage).show();
        }
    };

    var PageType = {
        Conversation: 'Conversation',
        Settings: 'Settings'
    };

    function VisualNotify() {
        var notifyElement = document.getElementById('chat_notification'),
            chatShow = document.getElementById('chat_show'),
            notifications = [],
            requests = [];

        function show() {
            if (notifyElement.style.display === 'none') {
                notifyElement.style.display = 'block';
            }
            if (!chatShow.classList.contains('chat_on_notification')) {
                chatShow.classList.add('chat_on_notification');
            }
        }

        function checkIfHide() {
            if (notifications.length === 0 && requests.length === 0 && notifyElement.style.display === 'block') {
                notifyElement.style.display = 'none';
                chatShow.classList.remove('chat_on_notification');
            }
        }

        this.add = function (userData) {
            if (notifications.indexOf(userData) !== -1) return;

            chatApplication.contactList.notifyOn(userData);
            notifications.push(userData);
            show();
        };

        this.remove = function (userData) {
            if (!userData) {
                throw new Error('userData is false');
            }

            for (var i = 0, length = notifications.length; i < length; i++) {
                if (notifications[i].equalTo(userData)) {
                    notifications.splice(i, 1);
                    break;
                }
            }

            checkIfHide();
        };

        this.addRequest = function (userData) {
            requests.push(userData);
            show();
        };

        this.removeRequest = function (userData) {
            if (!userData) {
                throw new Error('userData is false');
            }

            for (var i = 0, length = requests.length; i < length; i++) {
                if (requests[i].equalTo(userData)) {
                    requests.splice(i, 1);
                    break;
                }
            }

            checkIfHide();
        };

        this.removeCurrentVisible = function () {
            var currentPage = chatApplication.pageManager.currentPage,
                userData;

            if (currentPage && currentPage.type == PageType.Conversation) {
                currentPage.scrollDown();
                currentPage.focus();
                userData = currentPage.userData;
                chatApplication.contactList.notifyOff(userData);
                this.remove(userData);
                currentPage.read();
            }
        };
    }

    FFChatLogging.log('Inizializzo la webchat');

    function updateConversations(conversations) {
        for (var i = 0; i < conversations.length; i++) {
            var conversationItem = conversations[i],
                conversation = chatApplication.conversationManager.open(conversationItem.userData, conversationItem.lastRead);

            for (var j = 0; j < conversationItem.messages.length; j++) {
                var messageItem = conversationItem.messages[j];
                conversation.addMessage(messageItem.userData, messageItem.message, messageItem.date);
            }

            if (messageItem.date > conversationItem.lastRead) {
                chatApplication.visualNotify.add(conversationItem.userData);
                chatApplication.contactList.notifyOn(conversationItem.userData);
            }

            if (!chatApplication.contactList.isOnline(conversationItem.userData)) {
                conversation.setOffline();
            }
        }

        if (conversation && !window.chatShowOnStart) {
            chatApplication.pageManager.setCurrent(conversation);
            chatApplication.contactList.setActive(conversationItem.userData);
        }
    }

    function connect(isFirstStart) {
        isFirstStart = isFirstStart === undefined ? false : isFirstStart;

        chatApplication.chatSession = new Protocol(Protocol.ConnectionType.WebchatMini, {
            onUserData: {
                onSuccess: function (userData, contacts, conversations) {
                    chatApplication.userData = userData;
                    chatApplication.conversationManager = new ConversationManager();
                    chatApplication.contactList = new ContactList(contacts.online, contacts.offline);
                    chatApplication.contactsManager = new ContactsManager(contacts);

                    chatApplication.chatWindow.setOnline();

                    if (isFirstStart) {
                        isFirstStart = false;

                        if (window.chatShowOnStart) chatApplication.showChat();

                        window.onbeforeunload = function () {
                            if (chatApplication.chatSession.isOnline) {
                                chatApplication.chatSession.fastQuit();
                                FFChatLogging.log('Webchat Mini: Quit');
                            }
                        };
                    }

                    updateConversations(conversations);

                    document.dispatchEvent(new Event('webchatminiconnect'));
                }
            },
            onUserOnline: function (userData) {
                var conversation = chatApplication.conversationManager.get(userData);

                chatApplication.contactList.setOnline(userData);

                if (conversation) {
                    conversation.setOnline();
                }
            },
            onUserOffline: function (userData) {
                if (userData.equalTo(chatApplication.userData)) {
                    chatStatus.isOnline = false;
                    return;
                }

                var conversation = chatApplication.conversationManager.get(userData);

                chatApplication.contactList.setOffline(userData);

                if (conversation) {
                    conversation.setOffline();
                }
            },
            onUserMessage: function (userData, message) {
                var conversation = chatApplication.conversationManager.get(userData);

                if (!conversation) {
                    conversation = chatApplication.conversationManager.open(userData);
                }

                conversation.addMessage(userData, message);

                if (!chatApplication.chatWindow.isVisible) {
                    chatApplication.visualNotify.add(userData);
                    audioNotify.play();
                    chatApplication.messageTicker.add(userData, message);
                } else if (!util.pageIsVisible()) {
                    audioNotify.play();
                } else if (chatApplication.pageManager.currentPage !== conversation) {
                    chatApplication.visualNotify.add(userData);
                    audioNotify.play();
                } else {
                    conversation.read();
                }

                chatApplication.titleNotify.set();
            },
            onUserMessageRelay: function (userData, message) {
                var conversation = chatApplication.conversationManager.get(userData);

                if (!conversation) {
                    conversation = chatApplication.conversationManager.open(userData);
                }

                conversation.addMessage(chatApplication.userData, message);
            },
            onContactIgnoreSet: function (userData) {
                chatApplication.contactList.remove(userData);
                chatApplication.conversationManager.close(userData);
                chatApplication.visualNotify.remove(userData);
                chatApplication.contactsManager.yourRequestRemove(userData);
            },
            onYourContactRequest: function (userData, message) {
                chatApplication.contactsManager.yourRequestAdd(userData, message);
            },
            onContactRequest: function (userData, message) {
                chatApplication.contactsManager.requestAdd(userData, message);
            },
            onContactAccept: function (userData) {
                chatApplication.contactsManager.yourRequestRemove(userData);
                chatApplication.contactList.add(userData);
            },
            onYourContactAccept: function (userData) {
                chatApplication.contactsManager.requestRemove(userData);
                chatApplication.contactList.add(userData);
            },
            onContactRemove: function (userData) {
                chatApplication.contactList.remove(userData);
                chatApplication.conversationManager.close(userData);
                chatApplication.visualNotify.remove(userData);
                chatApplication.contactsManager.yourRequestRemove(userData);
                chatApplication.contactsManager.requestRemove(userData);
            },
            onError: function () {
                setOffline();
            },
            onQuit: function () {
                setOffline();
            },
        },
        FFChatLogging);
    }

    function setOffline() {
        if (!window.chatShowOnStart) chatApplication.chatWindow.hide();

        chatApplication.chatWindow.setOffline();

        chatApplication.pageManager.setCurrent();

        document.getElementsByClassName('chat_online_counter')[0].textContent = 'offline';
        document.getElementsByClassName('chat_online_counter')[1].textContent = 'offline';
        document.getElementsByClassName('chat_online_counter')[2].textContent = '0';

        document.getElementById('chat_friends_list').innerHTML = '';
    }

    function disconnect() {
        chatApplication.chatSession.quit();
    }

    var audioNotify, chatStatus, chatApplication;

    function init() {
        (window.chatContainer ? document.querySelector(window.chatContainer) : document.body).insertAdjacentHTML('beforeend',
        '<audio id="chat_audio_notify"><source src="http://irc.forumfree.it/chat/Content/Sounds/notice.ogg" type="audio/ogg"><source src="http://irc.forumfree.it/chat/Content/Sounds/notice.mp3" type="audio/mpeg"></audio>' +
        '<div id="chat_notify_message" style="display:none; z-index:9;"><p><span class="chat_notify_message_nick">test</span>test</p></div>' +
        '<div id="chat_show" class="chat_offline"><button type="button" class="chat_start_button"><span>chat <em class="chat_online_counter">offline</em></span>' +
        '<div id="chat_notification" style="display:none"><span>!</span></div></button>' +
        '</div>' +
        '<div id="chat_main" class="chat_offline">' +
        '<div id="chat_hide">' +
        ' <button type="button" class="chat_start_button"><span>chat <em class="chat_online_counter">offline</em></span></button>' +
        ' <div id="chat_settings_container">' +
        '  <button type="button" id="chat_settings_button"><span>impostazioni</span></button>' +
        '  <ul id="chat_settings_menu">' +
        '   <li><a id="chat_audio_button" class="chat_setting_on" title="Abilita o disabilita le notifiche audio"><span>disattiva audio</span></a></li>' +
        '   <li><a id="chat_feedback_button" href="http://ffircd.forumfree.it" target="_blank"><span>invia feedback</span></a></li>' +
        '   <li><a id="chat_disconnect_button" class="chat_setting_on"><span>esci dalla chat</span></a></li>' +
        '  </ul>' +
        ' </div>' +
        '</div>' +
        '<div id="chat_window">' +
        '<div id="chat_status">' +
        '<div id="chat_friends">' +
        ' <div id="chat_friends_header"><p>contatti <span class="chat_online_counter">0</span></p></div>' +
        ' <div id="chat_friends_list"></div>' +
        '</div>' +
        '<div id="chat_friends_manager_button"><a href="#">gestione contatti</a><span id="chat_request_counter" title="Richieste in sospeso" style="display:none">0</span></div>' +
        '</div>' +
        '<div id="chat_conversations">' +
        ' <div id="chat_welcome" class="chat_page">' +
        ' <div></div></div>' +
        ' </div>' +
        '</div>' +
        '</div>' +
        '</div>');

        audioNotify = new AudioNotify();
        chatStatus = new ChatStatus(connect, disconnect);
        chatApplication = {
            userData: null,
            contacts: {
                online: [],
                offline: [],
                ignored: [],
                incoming: [],
                request: []
            },
            conversations: [],
            chatSession: null,
            titleNotify: new TitleNotify(),
            chatWindow: new ChatWindow(),
            settingsMenu: new SettingsMenu(),
            messageTicker: new MessageTicker(),
            emoticons: new Emoticons(util),
            stickers: window.chat_stickers || [],
            contactList: null,
            conversationManager: null,
            pageManager: new PageManager(),
            visualNotify: new VisualNotify(),
            contactsManager: null,
            showChat: function () {
                this.messageTicker.hide();
                this.chatWindow.show();
                this.visualNotify.removeCurrentVisible();
            },
            sendMessage: function (userData, message) {
                message = message.trim();
                if (message.length !== 0) {
                    chatApplication.conversationManager.get(userData).addMessage(chatApplication.userData, message);
                    chatApplication.chatSession.sendMessage(Protocol.MessageType.PrivateChat, userData.toProtocol(), message);
                }
            },
            ignoreSet: function (userData) {
                chatApplication.chatSession.sendQuery({ Action: 'Ignore', Type: 'Set', Identity: userData.toProtocol() },
                    function () {
                        chatApplication.contactList.remove(userData);
                        chatApplication.conversationManager.close(userData);
                        chatApplication.visualNotify.remove(userData);
                        chatApplication.contactsManager.yourRequestRemove(userData);
                    },
                    function () {
                        alert('Impossibile ignorare il contatto');
                    });
            }
        };

        if (chatStatus.isOnline) {
            connect(true);
        }

        window.addEventListener('offline', function () {
            if (chatApplication.chatSession.isOnline) setOffline();;
        });

        document.querySelector('#chat_show > button').onclick = function () {
            if (!chatStatus.isOnline) {
                chatStatus.isOnline = true;
            }

            chatApplication.showChat();
        };

        document.querySelector('#chat_hide > button').onclick = function () {
            if ($('.chat_unread_messages:visible').length !== 0) {
                $('#chat_notification').show();
            }

            $('#chat_main').hide();
            $('#chat_show').show();

            return false;
        };

        document.getElementById('chat_settings_button').onclick = function () {
            $('#chat_settings_menu').toggle();
        };

        document.querySelector('#chat_friends_manager_button > a').onclick = function () {
            if (!chatStatus.isOnline) return false;

            if (chatApplication.pageManager.currentPage === chatApplication.contactsManager) {
                chatApplication.pageManager.setCurrent();
            } else {
                chatApplication.pageManager.setCurrent(chatApplication.contactsManager);
                chatApplication.contactList.setActive();
            }
            return false;
        };

        var jQueryFriendsList = $('#chat_friends_list');
        jQueryFriendsList.bind('mousewheel', function (event) {
            var scroll = jQueryFriendsList.scrollTop(),
                pixel = -18 * (event.originalEvent.wheelDelta / 120);

            jQueryFriendsList.scrollTop(scroll + pixel);

            return false;
        });

        document.dispatchEvent(new Event('webchatminiload'));
    }

    if (!window.chatHasSkin) {
        var cssElement = document.createElement('LINK');
        cssElement.rel = 'stylesheet';
        cssElement.addEventListener('load', function () {
            init();
        }, false);
        cssElement.href = 'http://' + Protocol.Urls.server + '/chat/Content/Chat.css';
        document.head.appendChild(cssElement);
    } else {
        init();
    }

    return {
        get page() { return chatApplication.pageManager; }
    };
})();
    
}