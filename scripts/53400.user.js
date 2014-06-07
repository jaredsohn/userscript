// ==UserScript==
// @name KFC
// @description Kongregate Framework for sCripts
// @include http://www.kongregate.com/games/*
// @author Zaphio
// @version 1.0
// @date 10/07/10
// ==/UserScript==

window.location.href = "javascript:window.KongChat = (" + function () {
    // Constants
    var TAB_TEMPLATE = new Template("<li class='tab closeable' id='#{label}_tab'><a href='##{label}_tab_pane'><span style='float: left'>#{label}</span><span class='close_tab_link'>Close</span></a></li>");
    var PANE_TEMPLATE = new Template("<div id='#{label}_tab_pane' class='tabpane' style='height: 404px'>#{content}</div>");
    var ROLL_TEMPLATE = new Template("<a id='rollover_#{label}_link' class='rollover_#{label}_link' href='javascript:#{href}'>#{label}</a>");

    // Private variables
    var messageQueue = [];
    var delay = 500;
    var timeoutID = 0;
    var onRoomMessageCallbacks = [];
    var onPrivMessageCallbacks = [];
    var onKeyPressCallbacks = [];
    var userRolloverCallbacks = {};
    
    // Substituting ChatDialogue.insert for message callbacks
    ChatDialogue.prototype.insert = function(content) {
        var dialogue = this,
        message_window = this._message_window_node,
        holodeck = this._holodeck;
    
        holodeck.scheduleRender(function() {
            var window_height = message_window.getHeight(),
            is_visible = (window_height !== 0),
            scroll_height = message_window.scrollHeight,
            scrolled_to_bottom = (window_height + message_window.scrollTop + ChatDialogue.SCROLL_FUDGE >= scroll_height),
            scroll_to_bottom = is_visible && scrolled_to_bottom;
      
            holodeck.scheduleRender(function() {
                if ((dialogue._insertion_count % ChatDialogue.BIN_SIZE) === 0) {
                    dialogue._insertion_target = new Element('div');
                    message_window.appendChild(dialogue._insertion_target);
                }
                dialogue._insertion_count++;
                
                if (undefined === content.parentNode) {
                    dialogue._insertion_target.innerHTML += content;
                    // KongChat code for message callback functions
                    var messageNode = $(dialogue._insertion_target).descendants().pop();
                    if(messageNode.hasClassName("chat_message_window_username") && !messageNode.down(".is_self")) {
                        // Creating functions
                        var KongChat = {
                            addStyle: function(style) {
                                messageNode.setStyle(style);
                            },
                            addWrapper: function(text, prefix, suffix) {
                                prefix = prefix?prefix:"";
                                suffix = suffix?suffix:"";
                                messageNode.down(".message").innerHTML.replace(text, prefix, suffix);
                            },
                            block: function() {
                                messageNode.hide();
                                messageNode.addClassName('kongchat_hidden');
                            }
                        };
                        // Invoking callbacks
                        var event = {
                            username: messageNode.down(".username").innerText,
                            message:  messageNode.down(".message").innerText
                        };
                        if(messageNode.hasClassName('whisper')) {
                            onRoomMessageCallbacks.invoke("call", event);
                        } else {
                            onPrivMessageCallbacks.invoke("call", event);
                        }
                    }
                } else {
                    dialogue._insertion_target.appendChild(content);
                }
                if (scroll_to_bottom) { dialogue.scrollToBottom(); }
            });
        });
    };
    
    // Substituting ChatDialogue.onKeyPress for callbacks
    ChatDialogue.prototype.onKeyPressCopy = ChatDialogue.prototype.onKeyPress;
    ChatDialogue.prototype.onKeyPress = function(event) {
        onKeyPressCallbacks.invoke("call", {event: event, text: this._input_node.value});
        this.onKeyPressCopy(event);
    };

    // Substituting UserRollover.show for callbacks
    UserRollover.prototype.showCopy = UserRollover.prototype.show;
    UserRollover.prototype.show = function(user) {
        KongChat.rollUser = user;
        this.showCopy(user);
    };
        
    // Private function for handling sending messages
    function processQueue() {
        timeoutID = window.setTimeout(function () {
            if (messageQueue.join("")) {
                var message = messageQueue.shift();
                if (message.isPrivate) {
                    holodeck._active_dialogue.sendPrivateMessage(message.target, message.content);
                } else {
                    holodeck._chat_window._active_room.sendRoomMessage(message.content);
                }
                processQueue();
            } else {
                timeoutID = 0;
            }
        }, delay);
    }
    
    // Public properties
    return {
        // Variables
        rollUser: {},
        // Functions
        onJoinRoom: function (callback) {
            holodeck._event_dispatcher.register("join_room", callback);
        },
        onLeaveRoom: function (callback) {
            holodeck._event_dispatcher.register("leave_room", callback);
        },
        onUserJoin: function (callback) {
            holodeck._event_dispatcher.register("user_join", callback);
        },
        onUserDeparture: function (callback) {
            holodeck._event_dispatcher.register("user_departure", callback);
        },
        onUserChanged: function (callback) {
            holodeck._event_dispatcher.register("user_changed", callback);
        },
        onRoomMessage: function (callback) {
            onRoomMessageCallbacks.push(callback);
        },
        onPrivateMessage: function (callback) {
            onPrivMessageCallbacks.push(callback);
        },
        onKeyPress: function(callback) {
            onKeyPressCallbacks.push(callback);
        },
        sendRoomMessage: function (msg) {
            messageQueue.push({
                "isPrivate": false,
                "content": msg
            });
            if(!timeoutID) {
                processQueue();
            }
        },
        sendPrivateMessage: function (usr, msg) {
            messageQueue.push({
                "isPrivate": true,
                "target": usr,
                "content": msg
            });
            if(!timeoutID) {
                processQueue();
            }
        },
        addChatCommand: function (command, callback) {
            holodeck.addChatCommand(command, function(holodeck, input) {
                var params = input.replace(/\s+/g, " ").replace(/^\s|\s$/g, "").split(" ");
                callback(params, input);
                return false;
            });
        },
        addMenuItem: function (label, callback, index) {
            // Creating menu item node
            if(typeof callback == "function") {
                callback = "(" + callback + ")();";
            }
            var call = new Element("option", { "class": "action", "onclick": callback});
            call.innerHTML = label;
            
            // Inserting in template for new rooms
            var select = document.getElementsByClassName("chat_actions_container")[0].childNodes[1];
            if(!index) {
                index = select.childNodes.length;
            }
            select.insertBefore(call, select.childNodes[index]);
            
            // Add also on current rooms if they exist
            var chatRoom = holodeck._chat_window._recent_chat_room;
            var gameRoom = holodeck._chat_window._recent_game_room; 
            if(chatRoom) {
                chatRoom._chat_actions_node.update(select.innerHTML);
            }
            if(gameRoom) {
                gameRoom._chat_actions_node.update(select.innerHTML);

            }
        },
        addChatTab: function(label, content) {
            var options = {
                label: label,
                content: content
            };
            $('kong_game_ui').innerHTML += PANE_TEMPLATE.evaluate(options);
            $('main_tab_set').innerHTML += TAB_TEMPLATE.evaluate(options);
            var link = $(label + "_tab").down("a");
            holodeck._tabs.addTab(link);
        },
        addRolloverOption: function(label, callback, index) {
            userRolloverCallbacks[label] = callback;
            var p = new Element("p");
            p.update(ROLL_TEMPLATE.evaluate({
                label: label,
                href:  "javascript:("+callback+")("+KongChat.rollUser+")"
            }));
            var div = $$(".user_rollover_inner")[0];
            div.insertBefore(p, div.childNodes[!index?div.childNodes.length:index]);
        },
        showMessage: function(name, message) {
            holodeck._active_dialogue.displayMessage(name, message, { 'class': 'whisper received_whisper' }, { 'non_user': true });
        },
        setInput: function(str) {
            holodeck._active_dialogue._input_node.value = str;
        }
    };
} + ")();void(0);";