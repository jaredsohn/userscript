// ==UserScript==
// @author          Paranoya
// @name            Shoutbox
// @namespace       paranoya_shoutbox
// @version         14.03.25
// @match           http://*.erepublik.com/*
// @match           https://*.erepublik.com/*
// @include         http://www.erepublik.com/en/military/battlefield/50152
// @include         http://*.erepublik.com/*
// @include         https://*.erepublik.com/*
// @exclude         http://*.erepublik.com/*/*
// @exclude         https://*.erepublik.com/*/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.6/socket.io.min.js
// @require         http://code.jquery.com/jquery-1.11.0.min.js
// @grant           unsafeWindow
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @downloadURL     http://erepublik-stats.com/shoutbox.user.js
// @updateURL       http://erepublik-stats.com/shoutbox.meta.js
// ==/UserScript==

function variable(type) {
    switch (type) {
        case "version":
            return "14.03.25";
            break;
        case "storage":
            return Storage;
            break;
        case "localStorage":
            return localStorage;
            break;
        case "unsafe":
            return unsafeWindow;
            break;
        case "jquery":
            return unsafeWindow.jQuery;
            break;
        case "document":
            return window.document;
            break;
        case "window":
            return window;
            break;
    }
}

(function($, window, document, unsafeWindow, undefined) {
    'use strict';
    $.extend($.fn, {
        shoutboxs: function(options) {
            if (!this.length) {
                if (options && options.debug && window.console) {
                    window.console.warn("Nothing selected, can't create shoutbox module, returning nothing.");
                }
                return;
            }

            var shoutboxer = $.data(this[0], "shoutboxs");
            if (shoutboxer) {
                return shoutboxer;
            }

            shoutboxer = new $.shoutboxer(options, this[0]);
            $.data(this[0], "shoutboxs", shoutboxer);

            return shoutboxer;
        }
    });

    $.shoutboxer = function(options, shoutboxs) {
        this.settings = $.extend(true, {}, $.shoutboxer.defaults, options);
        this.shoutboxs = shoutboxs;
        this.init();
    };

    $.extend($.shoutboxer, {
        defaults: {
            debug: true,
            params: {},
            images: {}
        },
        methods: {
            time: function(print) {
                var now = new Date(), time = { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
                now.setHours(now.getHours() - 2);

                time.hours < 10 && (time.hours = "0" + time.hours);
                time.minutes < 10 && (time.minutes = "0" + time.minutes);
                time.seconds < 10 && (time.seconds = "0" + time.seconds);

                return time.hours + ':' + time.minutes + ':' + time.seconds;
            }
        },
        prototype: {
            init: function() {
                var that = this;
                this.version();

                this.params = { unreaded: {} };
                this.socket = null;

                this.base = '/en';
                if (typeof variable('unsafe').erepublik !== 'undefined' && typeof variable('unsafe').erepublik.settings !== 'undefined' && typeof variable('unsafe').erepublik.settings.culture !== 'undefined') {
                    this.base = '/' + variable('unsafe').erepublik.settings.culture;
                }

                this.settings.token = variable('unsafe').flc.getVariable("token");
                this.settings.citizen = variable('unsafe').flc.getVariable("citizen_id");
                this.settings.nickname = $('a.user_name').text().trim();
                
                this.panel();
                this.connect();
                this.actions();
            },
            version: function() {
                var meta = "http://erepublik-stats.com/shoutbox.meta.js?time=" + (new Date()).getTime();
                var script = "http://erepublik-stats.com/shoutbox.user.js";
                
                $(".shoutbox-update-panel").remove();
                
                GM_xmlhttpRequest({method: "GET", url: meta, onload: function(data) {
                        var response = data.responseText.replace(/src=/g, "tmpsrc=").replace(/\.css/g, "").replace(/\.js/g, "").replace(/url\(/g, "");
                        var version = { start: null, end: null, string: null, number: null };
                                                
                        version.start = response.indexOf("@version") + 8;
                        version.end = response.indexOf("\n", version.start);
                        version.string = response.substring(version.start, version.end).trim();
                        version.number = parseFloat(version.string.replace(/\./g, ""));
                        
                        version.current = parseFloat(variable('version').replace(/\./g, ""));
                        
                        if (version.number > version.current){
                            $("#header").after('<div class="shoutbox-update-panel"></div>');
                            $('.shoutbox-update-panel').append('<div class="shoutbox-update-content" style="clear:both; text-align: center;"></div>');
                                $('.shoutbox-update-panel').find('.shoutbox-update-content').append('<span>New version of the shoutbox script is out. </span>');
                                $('.shoutbox-update-panel').find('.shoutbox-update-content').append('<span>Update it <a href="' + script + '">here</a>. v. ' + version.string + '</span>');
                        }
                    }
                });
            },
            connect: function() {
                var that = this;
                this.socket = io.connect('http://erepublik-stats.com:5000/');
                
                this.socket.on('error', function(reason) {
                    $('.shoutbox-panel').hide();
                });
                
                this.socket.on('disconnect', function() {
                    $('.shoutbox-panel').hide();
                });
                
                this.socket.on('connect', function() {
                    $('.shoutbox-panel').show();
                    that.socket.emit('register', {nickname: that.settings.nickname, citizen: that.settings.citizen});
                    that.socket.emit('clients');
                    
                    that.rooms();
                });                
            },
            rooms: function() {
                var that = this;
                
                GM_xmlhttpRequest({method: "GET", url: this.base + '/citizen/profile/' + this.settings.citizen, onload: function(data) {
                        var response = data.responseText.match(/\/main\/group-show\/[0-9]+/g);
                        if (typeof response === 'object' && response !== null) {
                            response = response[0].split('/');
                            var unit = parseInt(response.pop());
                            
                            if (unit && !isNaN(unit)){
                                that.socket.emit('military join', { room: unit });
                                
                                that.socket.on('military join', function(data) {
                                    if (data.success === true) {
                                        $('a[rel="discussions"][data-group="military"]').removeClass('hidden');
                                        $('div[rel="shoutbox-discussion"][data-group="military"]').removeClass('hidden');
                                    }
                                });                                
                            }
                        }
                    }
                });
            },
            actions: function() {
                this.rooms();
                
                var that = this;
                var nickname = this.settings.nickname;
                
                that.socket.emit('register', {nickname: this.settings.nickname, citizen: this.settings.citizen}); // Register in the application with nickname
                
                that.socket.emit('clients');
                that.socket.on('clients', function(clients) {
                    $('span[rel="total-clients"]').text(clients.length);

                    $('div[rel="shoutbox-clients"]').find('.client-list-content a').each(function() {
                        $(this).attr('data-replace', 'true');
                    });

                    $.each(clients, function(index, item) {
                        var account = $('div[rel="shoutbox-clients"]').find('a[data-id="' + item.citizen + '"]');
                        if (account.length) {
                            account.attr('data-replace', null).attr('data-time', $.shoutboxer.methods.time.call(that, false));
                        } else {
                            $('div[rel="shoutbox-clients"]').find('.client-list-content').append('<a href="javascript:;" data-id="' + item.citizen + '">' + item.nickname.ucwords().ucfirst() + '</a>');
                        }
                    });

                    $('div[rel="shoutbox-clients"]').find('a[data-replace="true"]').each(function() {
                        $(this).remove();
                    });
                });
                
                that.socket.on('log', function(log) {
                    $('span[rel="system-log"]').html(log);
                });
                
                that.socket.on('system', function(data) {
                    $('div[rel="received-' + data.board + '"]').append('<div style="color:' + data.color + ';"><strong>System:</strong>: ' + data.message + '</div>');
                    that.scroll($('div[rel="received-' + data.board + '"]'));
                });
                
                that.socket.on('lobby history', function(logs) {
                    $('div[rel="received-lobby"]').html('');
                    $.each(logs, function(index, item){
                        $('div[rel="received-lobby"]').append('<div style="color:gray;"><strong>' + item.nickname + '</strong>: ' + item.message.linkify());                        
                        that.scroll($('div[rel="received-lobby"]'));
                    });
                });

                that.socket.on('military history', function(logs) {
                    $('div[rel="received-military"]').html('');
                    $.each(logs, function(index, item){
                        $('div[rel="received-military"]').append('<div style="color:gray;"><strong>' + item.nickname + '</strong>: ' + item.message.linkify());                        
                        that.scroll($('div[rel="received-military"]'));
                    });
                });
                
                that.socket.on('lobby', function(data) {
                    if (variable('localStorage').getItem("shoutbox-lobby-state") === 'close'){
                        that.params.unreaded.lobby = parseInt(parseInt(that.params.unreaded.lobby) + 1);
                        variable('localStorage').setItem("shoutbox-unreaded-lobby", that.params.unreaded.lobby);
                        
                        $('span[rel="lobby-unreaded"]').removeClass('empty').text(parseInt(that.params.unreaded.lobby));
                        if (that.params.unreaded.lobby > 99) {
                            $('span[rel="lobby-unreaded"]').removeClass('empty').text('99+');
                        }
                    }
                    
                    $('div[rel="received-lobby"]').append('<div style="color:' + data.color + ';"><strong>' + data.nickname + '</strong>: ' + data.message.linkify() + '</div>');                    
                    that.scroll($('div[rel="received-lobby"]'));
                });  
                
                that.socket.on('military', function(data) {
                    if (variable('localStorage').getItem("shoutbox-military-state") === 'close'){
                        that.params.unreaded.military = parseInt(parseInt(that.params.unreaded.military) + 1);
                        variable('localStorage').setItem("shoutbox-unreaded-military", that.params.unreaded.military);

                        $('span[rel="military-unreaded"]').removeClass('empty').text(parseInt(that.params.unreaded.military));
                        if (that.params.unreaded.military > 99) {
                            $('span[rel="military-unreaded"]').removeClass('empty').text('99+');
                        }
                    }

                    $('div[rel="received-military"]').append('<div style="color:' + data.color + ';"><strong>' + data.nickname + '</strong>: ' + data.message.linkify() + '</div>');                    
                    that.scroll($('div[rel="received-military"]'));
                }); 
                
                
                // User actions 
                $('a[rel="toggle-clients"]').click(function() {
                    $(this).toggleClass('active');
                    $('div[rel="shoutbox-clients"]').toggleClass('active');
                    
                    variable('localStorage').setItem("shoutbox-clients-state", "close");
                    if ($(this).hasClass('active')){
                        that.socket.emit('clients');
                        variable('localStorage').setItem("shoutbox-clients-state", "open");
                    }
                });
                
                $('img[rel="shoutbox-discussion-close"]').click(function() {
                    $('a[rel="discussions"]').each(function(){
                        $(this).removeClass('active');
                        $('div[rel="shoutbox-discussion"]').removeClass('active');
                        variable('localStorage').setItem("shoutbox-" + $(this).attr('data-group') +"-state", "close");
                    });
                });
                
                // Toggle chats
                $('a[rel="discussions"]').click(function(event) {
                    var item = this;                    
                    if ($(this).hasClass('active')){
                        $('a[rel="discussions"]').removeClass('active');
                        $('a[rel="discussions"]').each(function(){
                            $('div[rel="shoutbox-discussion"]').removeClass('active');
                            variable('localStorage').setItem("shoutbox-" + $(this).attr('data-group') +"-state", "close");
                        });
                    } else {
                        if ($(this).attr('data-group') === 'lobby') {
                            that.params.unreaded.lobby = 0;
                            variable('localStorage').setItem("shoutbox-unreaded-lobby", "0");
                            $('span[rel="lobby-unreaded"]').addClass('empty').text(0);
                        }
                        
                        if ($(this).attr('data-group') === 'military') {
                            that.params.unreaded.military = 0;
                            variable('localStorage').setItem("shoutbox-unreaded-military", "0");
                            $('span[rel="military-unreaded"]').addClass('empty').text(0);
                        }
                        
                        $('a[rel="discussions"]').removeClass('active');
                        $('div[rel="shoutbox-discussion"]').removeClass('active');
                        
                        $('a[rel="discussions"]').each(function(){
                            variable('localStorage').setItem("shoutbox-" + $(this).attr('data-group') +"-state", "close");
                        });
                        
                        $(this).addClass('active');
                        variable('localStorage').setItem("shoutbox-" + $(item).attr('data-group') +"-state", "open");
                        $('div[rel="shoutbox-discussion"][data-group="' + $(item).attr('data-group') + '"]').addClass('active');
                        
                        that.scroll($('div[rel="received-' + $(item).attr('data-group') + '"]'));
                    }
                });
                
                $('a[rel="board-message-lobby"]').click(function() {
                    var message = $('input[rel="board-message-lobby"]').val().strip_tags();
                    
                    if (typeof message === 'undefined' || message === null || message === 'null' || $.trim(message) === '' ) {
                        return false;
                    }
                    
                    that.socket.emit('lobby', message);      
                    $('input[rel="board-message-lobby"]').val('').focus(); 
                    
                    $('div[rel="received-lobby"]').append('<div style="color:black;"><strong>' + nickname + '</strong>: ' + message.linkify());                    
                    that.scroll($('div[rel="received-lobby"]'));
                });
                
                $('input[rel="board-message-lobby"]').keyup(function(event){
                    if (event.keyCode === 13){
                        $('a[rel="board-message-lobby"]').trigger('click');
                    }
                });
                
                $('a[rel="board-message-military"]').click(function() {
                    var message = $('input[rel="board-message-military"]').val().strip_tags();

                    if (typeof message === 'undefined' || message === null || message === 'null' || $.trim(message) === '' ) {
                        return false;
                    }

                    that.socket.emit('military', message);      
                    $('input[rel="board-message-military"]').val('').focus(); 

                    $('div[rel="received-military"]').append('<div style="color:black;"><strong>' + that.settings.nickname + '</strong>: ' + message.linkify());                    
                    that.scroll($('div[rel="received-military"]'));
                });

                $('input[rel="board-message-military"]').keyup(function(event){
                    if (event.keyCode === 13){
                        $('a[rel="board-message-military"]').trigger('click');
                    }
                });
                                
                $(variable('window')).resize(function() {
                    $('.shoutbox-panel').css('width', $('body').width());
                });                
            },
            scroll: function(board) {
                if (typeof board[0] !== 'undefined' && typeof board[0].scrollTop !== 'undefined' && typeof board[0].scrollHeight !== 'undefined'){
                    board[0].scrollTop = board[0].scrollHeight;
                }
            },
            panel: function() {
                this.styles();
                var panel = $(this.shoutboxs);

                panel.append('<div id="shoutbox-panel-' + this.settings.citizen + '" class="shoutbox-panel"></div>');
                panel.find('.shoutbox-panel').css('width', $('body').width());

                // Connected clients
                panel.find('.shoutbox-panel').append('<div rel="shoutbox-data" class="shoutbox-data"></div>');

                panel.find('div[rel="shoutbox-data"]').append('<div rel="shoutbox-clients" class="shoutbox-client-list active"></div>');
                    panel.find('div[rel="shoutbox-clients"]').append('<div class="client-list-content"></div>');

                // Toolbar
                panel.find('.shoutbox-panel').append('<div rel="shoutbox-toolbar" class="shoutbox-toolbar"></div>');
                    panel.find('div[rel="shoutbox-toolbar"]').append('<span rel="system-log" class="shoutbox-system-log"></span>');
                    panel.find('div[rel="shoutbox-toolbar"]').append('<a href="javascript:;" rel="toggle-clients" class="toolbar-button toggle-clients">Online users</a>');
                        panel.find('a[rel="toggle-clients"]').append(' (<span rel="total-clients">0</span>)');

                    panel.find('div[rel="shoutbox-toolbar"]').append('<a href="javascript:;" rel="discussions" data-group="lobby" class="toolbar-button lobby">#macedonia</a>');
                        panel.find('a[rel="discussions"][data-group="lobby"]').append('<span rel="lobby-unreaded" class="messages-unreaded empty">0</span>');

                    panel.find('div[rel="shoutbox-toolbar"]').append('<a href="javascript:;" rel="discussions" data-group="private" class="toolbar-button private">Private</a>');

                    panel.find('div[rel="shoutbox-toolbar"]').append('<a href="javascript:;" rel="discussions" data-group="military" class="toolbar-button military hidden">Military Unit</a>');
                        panel.find('a[rel="discussions"][data-group="military"]').append('<span rel="military-unreaded" class="messages-unreaded empty">0</span>');

                // Lobby
                panel.find('div[rel="shoutbox-data"]').append('<div rel="shoutbox-discussion" data-group="lobby" class="shoutbox-board lobby"></div>');
                    panel.find('div[rel="shoutbox-discussion"][data-group="lobby"]').append('<div rel="toolbar-lobby" class="board-toolbar lobby"></div>');
                        panel.find('div[rel="toolbar-lobby"]').append('<span>Lobby Discussion</span>');
                        panel.find('div[rel="toolbar-lobby"]').append('<img rel="shoutbox-discussion-close" width="9" height="9" src="data:image/png;base64,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" />');

                    panel.find('div[rel="shoutbox-discussion"][data-group="lobby"]').append('<div rel="received-lobby" class="board-content lobby"></div>');

                    panel.find('div[rel="shoutbox-discussion"][data-group="lobby"]').append('<div rel="actions-lobby" class="board-actions lobby"></div>');
                        panel.find('div[rel="actions-lobby"]').append('<input type="text" rel="board-message-lobby" class="shoutbox-inputbox" placeholder="Message" />');
                        panel.find('div[rel="actions-lobby"]').append('<a rel="board-message-lobby" data-group="lobby" class="shoutbox-submitbox" href="javascript:;"><span>Send</span></a>');
                        panel.find('div[rel="actions-lobby"]').append('<div style="clear:both;"></div>');


                // Private
                panel.find('div[rel="shoutbox-data"]').append('<div rel="shoutbox-discussion" data-group="private" class="shoutbox-board private"></div>');
                    panel.find('div[rel="shoutbox-discussion"][data-group="private"]').append('<div rel="toolbar-private" class="board-toolbar private"></div>');
                        panel.find('div[rel="toolbar-private"]').append('<span>Private Discussion</span>');
                        panel.find('div[rel="toolbar-private"]').append('<img rel="shoutbox-discussion-close" width="9" height="9" src="data:image/png;base64,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" />');

                    panel.find('div[rel="shoutbox-discussion"][data-group="private"]').append('<div rel="received-private" class="board-content private"></div>');
                        panel.find('div[rel="received-private"]').append('<div class="board-note">Select a nickname from the list to load the private conversation</div>');

                    panel.find('div[rel="shoutbox-discussion"][data-group="private"]').append('<div rel="actions-private" class="board-actions private"></div>');
                        panel.find('div[rel="actions-private"]').append('<input type="text" rel="board-message-private" class="shoutbox-inputbox" placeholder="Message" />');
                        panel.find('div[rel="actions-private"]').append('<a rel="board-message-private" data-group="private" class="shoutbox-submitbox" href="javascript:;"><span>Send</span></a>');
                        panel.find('div[rel="actions-private"]').append('<div style="clear:both;"></div>');


                // Military
                panel.find('div[rel="shoutbox-data"]').append('<div rel="shoutbox-discussion" data-group="military" class="shoutbox-board military hidden"></div>');
                    panel.find('div[rel="shoutbox-discussion"][data-group="military"]').append('<div rel="toolbar-military" class="board-toolbar military"></div>');
                        panel.find('div[rel="toolbar-military"]').append('<span>Military Discussion</span>');
                        panel.find('div[rel="toolbar-military"]').append('<img rel="shoutbox-discussion-close" width="9" height="9" src="data:image/png;base64,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" />');

                    panel.find('div[rel="shoutbox-discussion"][data-group="military"]').append('<div rel="received-military" class="board-content military"></div>');

                    panel.find('div[rel="shoutbox-discussion"][data-group="military"]').append('<div rel="actions-military" class="board-actions military"></div>');
                        panel.find('div[rel="actions-military"]').append('<input type="text" rel="board-message-military" class="shoutbox-inputbox" placeholder="Message" />');
                        panel.find('div[rel="actions-military"]').append('<a rel="board-message-military" data-group="military" class="shoutbox-submitbox" href="javascript:;"><span>Send</span></a>');
                        panel.find('div[rel="actions-military"]').append('<div style="clear:both;"></div>');


                panel.find('.shoutbox-panel').append('<div style="clear:both;"></div>');

                panel.find('a[rel="discussions"]').removeClass('active');
                panel.find('div[rel="shoutbox-discussion"]').removeClass('active');

                panel.find('div[rel="shoutbox-clients"]').removeClass('active');
                panel.find('a[rel="toggle-clients"]').removeClass('active');

                if (typeof (variable('storage')) !== "undefined") {
                    this.params.unreaded.lobby = variable('localStorage').getItem("shoutbox-unreaded-lobby");
                    this.params.unreaded.military = variable('localStorage').getItem("shoutbox-unreaded-military");
                    
                    this.params.clients = variable('localStorage').getItem("shoutbox-clients-state");

                    this.params.lobby = variable('localStorage').getItem("shoutbox-lobby-state");
                    this.params.private = variable('localStorage').getItem("shoutbox-private-state");
                    this.params.military = variable('localStorage').getItem("shoutbox-military-state");

                    if (typeof this.params.unreaded.lobby === 'undefined' || this.params.unreaded.lobby === null || this.params.unreaded.lobby === 'null') {
                        this.params.unreaded.lobby = 1;
                    }
                    if (typeof this.params.unreaded.military === 'undefined' || this.params.unreaded.military === null || this.params.unreaded.military === 'null') {
                        this.params.unreaded.military = 1;
                    }

                    if (typeof this.params.clients === 'undefined' || this.params.clients === null || this.params.clients === 'null') {
                        this.params.clients = 'close';
                    }
                    if (this.params.clients === 'open') {
                        panel.find('a[rel="toggle-clients"]').addClass('active');
                        panel.find('div[rel="shoutbox-clients"]').addClass('active');
                    }

                    if (typeof this.params.lobby === 'undefined' || this.params.lobby === null || this.params.lobby === 'null') {
                        this.params.lobby = 'close';
                    }
                    if (this.params.lobby === 'open') {
                        this.params.unreaded.lobby = 0;
                        panel.find('a[rel="discussions"][data-group="lobby"]').addClass('active');
                        panel.find('div[rel="shoutbox-discussion"][data-group="lobby"]').addClass('active');
                    }

                    if (typeof this.params.private === 'undefined' || this.params.private === null || this.params.private === 'null') {
                        this.params.private = 'close';
                    }
                    if (this.params.private === 'open') {
                        panel.find('a[rel="discussions"][data-group="private"]').addClass('active');
                        panel.find('div[rel="shoutbox-discussion"][data-group="private"]').addClass('active');
                    }

                    if (typeof this.params.military === 'undefined' || this.params.military === null || this.params.military === 'null') {
                        this.params.military = 'close';
                    }
                    if (this.params.military === 'open') {
                        this.params.unreaded.military = 0;
                        panel.find('a[rel="discussions"][data-group="military"]').addClass('active');
                        panel.find('div[rel="shoutbox-discussion"][data-group="military"]').addClass('active');
                    }

                    if (parseInt(this.params.unreaded.lobby) > 0) {
                        panel.find('span[rel="lobby-unreaded"]').removeClass('empty').text(parseInt(this.params.unreaded.lobby));
                        if (this.params.unreaded.lobby > 99) {
                            panel.find('span[rel="lobby-unreaded"]').removeClass('empty').text('99+');
                        }
                    }
                    
                    if (parseInt(this.params.unreaded.military) > 0) {
                        panel.find('span[rel="military-unreaded"]').removeClass('empty').text(parseInt(this.params.unreaded.military));
                        if (this.params.unreaded.military > 99) {
                            panel.find('span[rel="military-unreaded"]').removeClass('empty').text('99+');
                        }
                    }
                }
            },
            styles: function() {
                GM_addStyle("#footer { margin-bottom:40px; }");
                GM_addStyle(".hidden { display:none !important; }");

                GM_addStyle(".shoutbox-update-panel { margin:5px 0px; padding: 5px 0; width: auto; }");
                GM_addStyle(".shoutbox-update-panel div { border:1px solid #888; padding:5px 0px; border-radius:5px; line-height:20px; background:none repeat scroll 0 0 rgba(17, 17, 17, 0.9);  font-weight:bold }");
                GM_addStyle('.shoutbox-update-panel span { padding:0px 5px; font-family:"FranchiseRegular",Impact; font-size:30px; line-height:30px; color:#F95555; text-shadow:0 1px 1px rgba(0, 0, 0, 0.5), 0 0 30px rgba(249, 85, 85, 0.5); display:inline-block; }');

                GM_addStyle(".shoutbox-panel *:focus { outline:none; }");
                GM_addStyle(".shoutbox-panel { display:none; z-index:100000; position:fixed; bottom:0px; }");

                GM_addStyle(".shoutbox-data { z-index:99999; width:100%; position:relative; }");

                // Toolbar
                GM_addStyle(".shoutbox-toolbar { z-index:100000; height:30px; width:100%; position:relative; -moz-box-shadow:0px 1px 8px #333; -webkit-box-shadow:0px 1px 8px #333; box-shadow:0px 1px 8px #333; background:rgba(225, 225, 225, 0.8); }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button { position:relative; font-weight:bold; border-left:1px solid #CCC; color:black; padding:0px 20px; display:block; float:right; width:200px; line-height:30px; }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button:hover, .shoutbox-toolbar .toolbar-button.active { background:white; }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button.toggle-clients { margin-left:4px; }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button.lobby { border-right:1px solid transparent }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button.lobby:hover, .shoutbox-toolbar .toolbar-button.lobby.active { border-right:1px solid #CCC; }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button.lobby, .shoutbox-toolbar .toolbar-button.military, .shoutbox-toolbar .toolbar-button.private { width:100px; }");

                GM_addStyle(".shoutbox-toolbar .toolbar-button .messages-unreaded { position:absolute; left:0px; float:left; background:red; border-radius:4px; color:#FFF; line-height:normal; margin:-11px 0px 0px 10px; padding:1px 6px 1px 6px; }");
                GM_addStyle(".shoutbox-toolbar .toolbar-button .messages-unreaded.empty { display:none; }");

                GM_addStyle(".shoutbox-toolbar .shoutbox-system-log { max-width:330px; height:30px; overflow:hiddden; display:inline-block; color:#666666; font-size:11px; line-height:30px; padding:0px 0px 0px 10px; float:left; }");

                // Connected clients ...                
                GM_addStyle(".shoutbox-client-list { display:none; overflow:hidden; overflow-y:auto; position:absolute; right:0px; bottom:0px; float:right; width:240px; min-height:400px; max-height:450px; background:white; border-left:1px solid #CCC; border-top:1px solid #CCC; }");
                GM_addStyle(".shoutbox-client-list.active { display:block; }");
                GM_addStyle(".shoutbox-client-list .client-list-content { padding:0px 10px 10px 10px; }");
                GM_addStyle(".shoutbox-client-list .client-list-content a { display:block; line-height:25px; border-bottom:1px dashed #EFEFEF; font-weight:bold; }");
                GM_addStyle(".shoutbox-client-list .client-list-content a:hover { color:black }");
                GM_addStyle(".shoutbox-client-list .client-list-content a:last-child { border-bottom:none; }");

                // Boards
                GM_addStyle(".shoutbox-board a { color:black; font-weight:bold; }");
                GM_addStyle(".shoutbox-board { display:none; overflow:hidden; position:absolute; right:245px; bottom:0px; float:right; width:500px; min-height:400px; max-height:470px; background:white; border-left:1px solid #CCC; border-right:1px solid #CCC; border-top:1px solid #CCC; }");
                GM_addStyle(".shoutbox-board.active { display:block; }");
                GM_addStyle(".shoutbox-board.private { right:386px; width:400px; }");
                GM_addStyle(".shoutbox-board.military { right:527px; width:400px; }");

                GM_addStyle(".shoutbox-board .board-toolbar { font-size:11px; font-weight:bold; background-color:#F4F2EC; background-image:linear-gradient(#F4F2EC 0px, #E5E4DA 100%); padding:3px 5px; color:#A39D92; border-bottom:1px solid #CCC; box-shadow:0 1px 0 #FFFFFF, 0 1px 0 #F7F6F2 inset, 1px -1px 3px #E1E0D4 inset; text-shadow:0 1px 0 #FFFFFF; }");
                GM_addStyle(".shoutbox-board .board-toolbar img { float:right; margin:3px 2px 0px 0px; cursor:pointer }");
                GM_addStyle(".shoutbox-board .board-toolbar img:hover { opacity:0.6 }");

                GM_addStyle(".shoutbox-board .board-content { min-height:343px; max-height:393px; position:relative; overflow:hidden; overflow-y:auto; }");
                GM_addStyle(".shoutbox-board .board-content > div { padding:5px 10px; border-bottom:1px dashed #EFEFEF; }");
                GM_addStyle(".shoutbox-board .board-content > div:last-child { border:none; }");

                GM_addStyle(".shoutbox-board .board-content .board-note { color:gray; text-shadow:0px 1px #DBDBDB; padding:155px 95px 0px 95px; text-align:center; }");

                GM_addStyle(".shoutbox-board .board-actions { height:28px; overflow:hidden; padding:2px 5px 5px 5px; border-top:1px solid #CCC; position:relative; display:block; }");
                GM_addStyle(".shoutbox-board .board-actions .shoutbox-inputbox  { width:400px; height:24px; border:none; background:none; float:left; padding:2px 5px; }");
                GM_addStyle(".shoutbox-board .board-actions.private .shoutbox-inputbox, .shoutbox-board .board-actions.military .shoutbox-inputbox  { width:300px; }");

                GM_addStyle(".shoutbox-board .board-actions .shoutbox-submitbox { float:right; position:relative;   background-color: #115695; background-image:linear-gradient(#1AA6CA 0px, #115695 100%); border-bottom:1px solid #14417F; border-radius:5px; border-top:1px solid #5FC2DB; box-shadow:0 1px 2px rgba(63, 75, 55, 0.9); color:#FFFFFF; font-size:11px; font-weight:700; padding:6px 8px 6px 0; text-indent:9px; text-shadow:0 -1px 0 rgba(0, 0, 0, 0.2); }");
                GM_addStyle(".shoutbox-board .board-actions .shoutbox-submitbox:hover { background-color:#166CAC; background-image: linear-gradient(#24BBD8 0px, #166CAC 100%); text-shadow:0 -1px 0 rgba(0, 0, 0, 0.2), 0 0 5px #8BC7FF; }");
                GM_addStyle(".shoutbox-board .board-actions .shoutbox-submitbox:active { opacity:0.6; }");
                GM_addStyle(".shoutbox-board .board-actions .shoutbox-submitbox span { background-image:url('/images/modules/homepage/blue_beauty_span.png?1391681179'); background-position:right center; background-repeat:no-repeat; padding:7px 25px 2px 0px; }");
            }
        }
    });

})(jQuery, window, window.document, unsafeWindow);

function shoutbox_loading() {
    if (typeof unsafeWindow.jQuery === 'undefined') {
        window.setTimeout(shoutbox_loading, 100);
        return false;
    } else {
        $('body').shoutboxs();
    }
}
shoutbox_loading();

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toInt = function() {
    return parseInt(this.trim(), 10);
};

String.prototype.toFloat = function() {
    return parseFloat(this.trim());
};

String.prototype.deSpace = function() {
    return this.trim().replace(/\s/g, '').replace(/\./g, '').replace(/\!/g, '');
};

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.ucwords = function() {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function($1) {
            return $1.toUpperCase();
        });
};

String.prototype.strip_tags = function(allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    var code = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    return this.replace(code, '').replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

String.prototype.linkify = function() {
    // http://, https://, ftp://
    var http = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    var www = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    var mail = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return this.replace(http, '<a href="$&" target="_blank">$&</a>').replace(www, '$1<a href="http://$2" target="_blank">$2</a>').replace(mail, '<a href="mailto:$&">$&</a>');
};