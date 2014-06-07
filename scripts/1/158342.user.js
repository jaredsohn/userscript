// ==UserScript==
// @name        EpicMafia AutoBan 2.0
// @namespace   http://github.com/explodes
// @version     214
// @description Automatically ban users upon enter. Check boxes upon enter.
// @match       http://www.epicmafia.com/game/*
// @copyright   2013+, explodes
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/158342.user.js
// @downloadURL http://userscripts.org/scripts/source/158342.user.js
// ==/UserScript==

var DEBUG_TRACE = 5
,DEBUG_DEBUG = 4
,DEBUG_INFO = 3
,DEBUG_WARN = 2
,DEBUG_ERROR = 1
,DEBUG_NONE =0
;

var APPLICATION = 'EpicMafia AutoBan 2.0'
,VERSION = '214'
,AUTHOR  = 'explodes'
,DEBUG_LEVEL = DEBUG_DEBUG
;

var FACES_HAPPY = ['（=´∇｀=）', '(. ❛ ᴗ ❛.) ╭ ♡', '(｡◕‿‿◕｡)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '( ᵔ ᴥ ᵔ )', '(◕‿◕✿)', '(*ﾟ▽ﾟ*)', '(☞ﾟ∀ﾟ)☞', '(⌒▽⌒)☆', '( ͡^ ͜ʖ ͡^)', '(๑╹ω╹๑ )', '(✿◠‿◠)', 'ლ(́◉◞౪◟◉‵ლ)']
,FACES_SAD = ['(ಥ﹏ಥ)', '(ಠ_ಠ)', '(；一_一)', 'ಠ_ರೃ', '¯\\(ºдಠ)/¯', '(☞ﾟ_ﾟ)☞', '\\(╬ ಠ益ಠ)/', '٩(͡๏̯͡๏)۶', 'の＿の']
;

(function($, console, window) {
    
    /**
    * Ban
    * Core Ban Object
    */
    function Ban(userName, creationDate, expirationDate, reason) {
        this.userName = userName;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
        this.reason = reason;
    }
    
    function Core() {
        this.Helpers = null;
        this.GameBoard = null;
        this.Settings = null;
        this.Terminal = null;
        this.Bans = null;
        this.CommandProcessor = null;
    }
    
    Core.prototype = {
        
        /** ## BAN STUFF **/
        
        onPlayer : function(type, userName) {
            if (this.GameBoard.isPregame()) {
                this.Terminal.logMessage(userName + ' ' + type);
                if (type == 'joined') {
                    var ban = this.Bans.check(userName);
                    if (ban) {
                        this.callForBan(userName);
                    }
                }
            }
        },
        
        /** ## PROCESSOR METHODS ## **/
        
        initializeCommands : function() {
            this.CommandProcessor.setUnknownCommandHook(this.onUnknownCommand.bind(this));
            this.CommandProcessor.addProcessor(this, /^about$/i, this.onAbout, 'about', 'about', 'Brief introduction of EpicMafia AutoBan');
            this.CommandProcessor.addProcessor(this, /^help$/i, this.onHelp, 'help', 'help', 'Show a list of all available commands');
            this.CommandProcessor.addProcessor(this, /^help ([a-z]+)$/i, this.onHelpCommand, 'help', 'help <command>', 'Show help of a specific command');
            this.CommandProcessor.addProcessor(this, /^ban ([a-z0-9][a-z0-9_]+) ([0-9]+[hmd]?) (.*)$/i, this.onTempBan, 'ban', 'ban <user> <duration> <reason>', 'Temporarily ban a user from your games. Durations are in the format 10m for 10 minutes, or 10h for 10 hours or 10d for 10 days.');
            this.CommandProcessor.addProcessor(this, /^ban ([a-z0-9][a-z0-9_]+)(.*)?$/i, this.onPermaban, 'ban', 'ban <user> <reason>', 'Permanently ban a user from your games');
            this.CommandProcessor.addProcessor(this, /^unban ([a-z0-9][a-z0-9_]+)$/i, this.onUnban, 'unban', 'unban <user>', 'Unban a user');
            this.CommandProcessor.addProcessor(this, /^check ([a-z0-9][a-z0-9_]+)$/i, this.onCheck, 'check', 'check <user>', 'Check a user\'s ban status');
            this.CommandProcessor.addProcessor(this, /^bans$/i, this.onBans, 'bans', 'bans', 'List all bans');
            this.CommandProcessor.addProcessor(this, /^happy$/i, this.onHappy, 'happy', 'happy', 'Say a happy!');
            this.CommandProcessor.addProcessor(this, /^sad$/i, this.onSad, 'sad', 'sad', 'Say a sad');
            this.CommandProcessor.addProcessor(this, /^random$/i, this.onRandomPlayer, 'random', 'random', 'Pick a random player');
            this.CommandProcessor.addProcessor(this, /^share$/i, this.onShare, 'share', 'share', 'Let everyone know you\'re using a great system');
            this.CommandProcessor.addProcessor(this, /^contacts$/i, this.onContacts, 'contacts', 'contacts', 'Print the contact list into the game. Use this instead of typing them all out manually.');
        },
        
        onUnknownCommand : function (command) {
            if (command) {
                var commandName = command.split(/\s+/)[0];
                this.Terminal.logError('Unknown command: ' + commandName);
            }
        },
        
        onAbout : function(processor, command) {
            this.Terminal.logMessage(APPLICATION + ' v' + VERSION + ' by ' + AUTHOR);
        },
        
        onHelp : function(processor, command) {
            var self = this
            ;
            this.Terminal.logOutput('Help:');
            $(this.CommandProcessor.processors).each(function(index, processor) {
                self.Terminal.logOutput(' ' + processor.syntax);
            });
        },
        
        onHelpCommand : function(processor, command, name) {
            var found = false
            ,self = this
            ;
            $(this.CommandProcessor.processors).each(function(index, processor) {
                if (processor.name == name) {
                    self.Terminal.logOutput('Usage: ' + processor.syntax + ' :: ' + processor.description);
                    found = true;
                }
            });
            if (!found) {
                this.Terminal.logError('Command ' + name + ' not found.');
            }
        },
        
        onPermaban : function (processor, command, userName, reason) {
            var ban = this.Bans.check(userName);
            if (ban) {
                this.Terminal.logError('Ban already in effect for ' + userName + '. ' + ban.reason);
            } else {
                
                if (reason == undefined || reason == '') {
                    reason = 'no reason';
                }
                
                ban = new Ban(userName, new Date(), undefined, reason);
                this.Bans.add(ban);
                this.callForBan(userName);
                this.Terminal.logOutput('Perma-banned ' + userName);
            }
        },
        
        onTempBan : function (processor, command, userName, duration, reason) {
            var ban = this.Bans.check(userName)
            ,expiration
            ;
            if (ban) {
                this.Terminal.logError('Ban already in effect for ' + userName + '. ' + ban.reason);
            } else {
                expiration = this.buildExpiration(new Date(), duration);
                if (expiration == false) {
                    this.Terminal.logError('Invalid duration.');
                } else {
                    ban = new Ban(userName, new Date(), expiration, reason);
                    this.Bans.add(ban);
                    this.callForBan(userName);
                    this.Terminal.logOutput('Temp-banned ' + userName + ' until ' + expiration);
                }
            }
        },
        
        buildExpiration : function (now, delta) {
            // Turn 10d, 10h, or 10m into a date.
            delta = delta.toLowerCase();
            var time = now.getTime()
            ,char = delta.substring(delta.length - 1, delta.length)
            ,duration = null
            ,multiplier = 1000 * 60
            ,result = new Date()
            ;
            console.log('finding delta', now, delta, time, char);
            switch (char) {
                case 'd':
                    multiplier = 1000 * 60 * 60 * 24;
                    duration = parseInt(delta.substring(0, delta.length - 1), 10);
                    break;
                case 'h':
                    multiplier = 1000 * 60 * 60;
                    duration = parseInt(delta.substring(0, delta.length - 1), 10);
                    break;
                case 'm':
                    multiplier = 1000 * 60 * 60;
                    duration = parseInt(delta.substring(0, delta.length - 1), 10);
                    break;
                default:
                    return false;
            }
            time += multiplier * duration;
            result.setTime(time);
            return result;
        },
        
        onUnban : function (processor, command, userName) {
            var ban = this.Bans.check(userName);
            if (ban) {
                this.Bans.remove(ban);
                this.Terminal.logOutput('Ban lifted for ' + userName);
            } else {
                this.Terminal.logError('No ban in effect for ' + userName);
            }
        },
        
        onCheck : function (processor, command, userName) {
            var ban = this.Bans.check(userName);
            if (ban) {
                this.Terminal.logOutput(userName + ' banned for ' + ban.reason + ' expires ' + (ban.expirationDate ? ban.expirationDate : 'never') + '.');
            } else {
                this.Terminal.logOutput('No ban in effect for ' + userName);
            }
        },
        
        onBans : function (processor, command) {
            var bans = this.Settings.getBans()
            ,self = this
            ;
            if (bans.length) {
                $(bans).each(function(index, ban) {
                    self.Terminal.logOutput('BAN: ' + ban.userName + ' for ' + ban.reason + ' expires ' + (ban.expirationDate ? ban.expirationDate : 'never') + '.');
                });
            } else {
                this.Terminal.logOutput('There are no bans.');
            }
        },
        
        onHappy : function (processor, command) {
            var happy = this.Helpers.RandomFromList(FACES_HAPPY);
            this.GameBoard.say(happy);
            this.Terminal.logOutput(happy);
        },
        
        onSad : function (processor, command) {
            var sad = this.Helpers.RandomFromList(FACES_SAD);
            this.GameBoard.say(sad);
            this.Terminal.logOutput(sad);
        },
        
        onRandomPlayer : function (processor, command) {
            var players = this.GameBoard.getAlivePlayersNames()
            ,choice = this.Helpers.RandomFromList(players)
            ;
            this.Terminal.logOutput(choice);
        },
        
        onShare : function (processor, command) {
            var message = '(◕‿◕✿) Troll-Free Game™ ' + APPLICATION + ' v' + VERSION;
            this.Terminal.logOutput(message);
            this.GameBoard.say(message);
        },
        
        onContacts : function (processor, command) {
            var contacts = this.GameBoard.getContacts()
            ,message
            ;
            if (contacts.length) {
                message = contacts.join(', ')
                this.GameBoard.say(message);
                this.Terminal.logOutput(message);
            } else {
                this.Terminal.logOutput('No contacts found!');
            }
        },
        
        /** ## MISC STUFF **/
        
        callForBan : function (userName) {
            var banned = this.GameBoard.banUser(userName);
            if (banned) {
                this.Terminal.logBan('Banning ' + userName);
            }
        },
        
        debug : function(level /*, arguments */) {
            if (DEBUG_LEVEL >= level) {
                (console.debug || console.log).apply(console, arguments);
            }
        },
        
        onLoad : function(isAdmin) {
            this.Terminal.create();
            this.onAbout();
            this.initializeCommands();
            this.Bans.prune();
            if (isAdmin) {
                this.onAdmin();
            }
        },
        
        onAdmin : function() {
            this.autoCheckBoxes();
            this.GameBoard.listenPlayers(this.onPlayer.bind(this));
        },
        
        autoCheckBoxes : function() {
            if (this.GameBoard.isPregame()) {
                if(this.Settings.isCheckFastGameEnabled()) {
                    this.GameBoard.checkFastGame();
                    this.Terminal.logMessage('Checking Fast-Game');
                }
                if(this.Settings.isCheckNoObserversEnabled()) {
                    this.GameBoard.checkNoObservers();
                    this.Terminal.logMessage('Checking No-Observers');
                }
            }
        }
    };
    Core = new Core();
    
    
    /**
    * Helpers
    * Core Library Functions.
    */
    function Helpers() {
    }
    Helpers.prototype = {
        click : function(element) {
            var clickEvent  = document.createEvent("HTMLEvents");
            clickEvent.initEvent("click", true, true);
            element.dispatchEvent(clickEvent);
        }, 
        $click : function($element) {
            var self = this;
            $element.each(function(index, item) {
                self.click(item);
            });
        },
        htmlDecode : function(input){
            var e = document.createElement('div');
            e.innerHTML = input;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        },
        stripHtml : function(html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent||tmp.innerText;
        },
        RandomFromList : function (list) {
            var index = Math.floor(Math.random() * list.length);
            return list[index];
        }
    };
    
    /**
    * Bans
    * Core Bans Object Database
    */
    function Bans() {
        this.bans = Core.Settings.getBans();
    }
    Bans.prototype = {
        prune : function() {
            var bans = []
            ,self = this
            ,banlist = Core.Settings.getBans()
            ,expired
            ;
            $(banlist).each(function(index, ban) {
                expired = self.isExpired(ban);
                if(!expired) {
                    bans.push(ban);
                } else {
                    Core.Terminal.logMessage('Ban expired: ' + ban.userName + ' for ' + ban.reason);
                }
            });
            this.save(bans);
        },
        add : function(ban) {
            var checkedBan = this.check(ban.userName);
            if (checkedBan) {
                return checkedBan;
            }
            this.bans.push(ban);
            this.save(this.bans);
        },
        check : function(userName) {
            var result
            ,self = this
            ;
            $(this.bans).each(function(index, ban) {
                if(ban.userName == userName && !self.isExpired(ban)) {
                    result = ban;
                    return false;
                }
            });
            return result;
        },
        remove : function(ban) {
            var position = this.bans.indexOf(ban);
            if( position >= 0) {
                this.bans.splice(position, 1);
                this.save(this.bans);
            }
        },
        save : function(bans) {
            this.bans = bans;
            Core.Settings.setBans(this.bans);
        },
        isExpired : function (ban) {
            var result = false
            ,now
            ,expiry
            ;
            if(ban.expirationDate !== undefined) {
                now = new Date();
                expiry = typeof(ban.expirationDate) == "string" ? new Date(ban.expirationDate) : ban.expirationDate;
                result = expiry < now;
            }
            return result;
        }
    };
    
    /**
    * Settings
    * Core Settings Object
    */
    function Settings() {
    }
    Settings.prototype = {
        isBansEnabled : function() {
            return GM_getValue('isBansEnabled', true); 
        },
        setBansEnabled : function(bansEnabled) {
            return GM_setValue('isBansEnabled', bansEnabled);
        },
        
        isCheckFastGameEnabled : function() {
            return GM_getValue('isCheckFastGameEnabled', true); 
        },
        setCheckFastGameEnabled : function(fastGame) {
            return GM_setValue('isCheckFastGameEnabled', fastGame); 
        },
        
        isCheckNoObserversEnabled : function() { 
            return GM_getValue('isCheckNoObserversEnabled', true); 
        },
        setCheckNoObserversEnabled : function(noObservers) {
            return GM_setValue('isCheckNoObserversEnabled', noObservers); 
        },
        
        getBans : function() { 
            return GM_getValue('bans2', []);
        },
        setBans : function(bans) { 
            return GM_setValue('bans2', bans); 
        }
    };
    
    /**
    * Terminal
    * Core Terminal and accessories.
    */
    function Terminal() {
        this.terminal = null;
    }
    Terminal.prototype = {
        
        logInput : function (message) {
            this.log('in', message);
        },
        logOutput : function (message) {
            this.log('out', message);
        },
        logError : function (message) {
            this.log('err', message);
        },
        logBan : function (message) {
            this.log('ban', message);
        },
        logMessage : function (message) {
            this.log('msg', message);
        },
        
        log : function(klass, message) {
            console.log('EMAB', klass, message);
            if (this.terminal !== null) {
                var escaped = $('<div/>').text(message).html()
                ,html = '<div class="message ' + klass + '">' + escaped + '</div>'
                ,messages = this.terminal.find("#messages")
                ;
                messages.append(html);
                messages.prop({ scrollTop: messages.prop("scrollHeight") });
            }
            
        },
        
        create : function () { 
            var html = '<style type="text/css">#autoban * {margin:0;padding:0;border:none;font-family:\\\'Helvetica Neue\\\',\\\'Helvetica\\\',Arial,sans-serif;}#autoban {z-index:9999;position:fixed;right:0;top:0;height:212px;background:black;}#autoban #slider{float:left;height:212px;width:32px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAOklEQVQYlX3JsRHAMAwDMVJTPKfXqmlyl8IO0cI6AEASwOV21+UkudzX13v77yS5nKQpB0w5YMoleQD1lhwxmFZhvAAAAABJRU5ErkJggg==);}#autoban #system{float:left;width:320px;height:172px;padding:6px;}#autoban #icons{display:none;}#autoban #messages {background:none;border:none;color:#2f3;width:100%;height:168px;margin:0;padding:0;overflow-y:scroll;}#autoban .message{font-size:10px;width:100%;}#autoban .message.out{color:#EDB90C;}#autoban .message.msg{color:#EDED0C;}#autoban .message.ban{color:#D60F9A;}#autoban .message.err{color:#ED0C0C;}#autoban .message.in{color:#A2ED0C;}#autoban #prompt {height:36px;}#autoban #command {width:100%;margin:4px 0;color:#A2ED0C;background-color:#7A7A7A;font-size:16px;}#autoban #command-submit {background-color:orange;font-weight:bold;font-size:8px;display:none;}</style><aside id="autoban"><aside id="slider"></aside><div id="system"><header id="icons"></header><section id="messages"></section><footer id="prompt"><input type="text" id="command" placeholder="press enter when done"/><input type="submit" id="command-submit"/></footer></div></aside>'
            ,terminal = $(html)
            ,self = this
            ;
            
            function toggleTerminal (speed) {
                if (speed === undefined) { speed = 'fast'; }
                terminal.find('#system').animate({width: 'toggle'}, speed);
            }
            
            terminal.find('#slider').on('click', toggleTerminal);
            
            function submit () {
                var command = terminal.find('#command')
                ,value = command.val()
                ;
                if (value) {
                    Core.CommandProcessor.process(value);
                    command.val('');
                }
            }
            
            terminal.find('#command').keypress(function(e) {
                if(e.which == 13) {
                    submit();
                }
            });
            
            terminal.find('#command-submit').on('click', function () {
                submit();
            });
            
            this.terminal = terminal;
            $('body').prepend(this.terminal);
        },
        focus : function () {
            if (this.terminal) {
                this.terminal.find('#command').focus();
            }
        }
    };
    
    /**
    * CommandProcessor
    * Core CommandProcessor
    */
    function CommandProcessor() {
        this.processors = [];
        this._unknownCommandHook = undefined;
    }
    CommandProcessor.prototype = {
        process : function(command) {
            var match
            ;
            Core.Terminal.logInput(command);
            if(command != undefined) {
                $(this.processors).each(function(index, processor) {
                    match = command.match(processor.regex);
                    if(match != undefined) {
                        match.splice(0, 0, processor);
                        processor.callback.apply(processor.context, match);
                        return false;
                    }
                });
            }
            
            if (match == undefined && this._unknownCommandHook) {
                this._unknownCommandHook(command);
            } else {
                Core.Terminal.focus();
            }
        },
        /**
        * Add a command processor.
        * context: Context in which to run the processor
        * regex: Regex to match for the processor
        * callback: Processor function, arguments are [processor, group 1, group 2, ..., group n]
        * name: Name of the command
        * syntax: Syntax of the command
        * description: Description of the command.
        */
        addProcessor : function(context, regex, callback, name, syntax, description) {
            this.processors.push({
                context: context,
                regex: regex,
                callback: callback,
                name: name,
                syntax: syntax,
                description: description
            });
        },
        
        setUnknownCommandHook : function (hook) {
            this._unknownCommandHook = hook;
        }
    };
    
    /**
    * GameBoard
    * Core GameBoard accessories.
    */
    function GameBoard() {
        this._lastPlayersNames = [];
        this._listenPlayersInterval = null;
    }
    GameBoard.prototype = {
        isRanked : function() {
            return $('#rankedimg').length > 0;
        },
        isPregame : function () {
            var waitingOrCountingDown = $('#startcount,#waitcount').is(':visible');
            return waitingOrCountingDown;
        },
        isLoaded : function() {
            return this.getAlivePlayers().length > 0;
        },
        getAlivePlayers : function() {
            return $('ul#alive li.user_li');
        },
        getAlivePlayersNames : function() {
            var names = []
            ;
            this.getAlivePlayers().each(function(index, player) {
                names.push($(player).data('uname'));
            });
            return names;
        },
        checkPlayerListChange : function(callback) {
            var newList = this.getAlivePlayersNames()
            ,oldList = this._lastPlayersNames
            ;
            $(newList).each(function(index, newPlayer) {
                if(oldList.indexOf(newPlayer) < 0) {
                    callback('joined', newPlayer);
                }
            });
            $(oldList).each(function(index, oldPlayer) {
                if(newList.indexOf(oldPlayer) < 0) {
                    callback('left', oldPlayer);
                }
            });
            this._lastPlayersNames = newList;
        },
        getFastGameCheckbox : function() {
            return $('#option_fastgame');
        },
        getNoObserversCheckBox : function() {
            return $('#option_nospectate');
        },
        /**
        * Callback: function(type, userName)
        * type: 'left' or 'joined'
        * userName: userName of player
        */ 
        listenPlayers : function(callback) {
            this._listenPlayersInterval = setInterval(this.checkPlayerListChange.bind(this), 100, callback);
        },
        stopListenPlayers : function() {
            clearInterval(this._listenPlayersInterval);
            this._listenPlayersInterval = null;
        },
        onLoad : function(callback) {
            if(this.isLoaded()) {
                var isAdmin = this.isAdmin();
                callback(isAdmin);
            } else {
                setTimeout(this.onLoad.bind(this), 100, callback);
            }
        },
        checkFastGame : function() {
            var boxes = this.getFastGameCheckbox().not('.sel');
            boxes.click();
        },
        checkNoObservers : function() {
            var boxes = this.getNoObserversCheckBox().not('.sel');
            boxes.click();
        },
        isAdmin : function () {
            return true; // Assume admin.
        },
        banUser : function (userName) {
            var self = this
            ,banned = false
            ;
            this.getAlivePlayers().each(function(index, player) {
                var $player = $(player)
                ,uname = $player.data('uname')
                ,innerLi = null
                ,link = null
                ;
                if (uname == userName) {
                    innerLi = $player.find('.user_inner_li');
                    innerLi.click();
                    link = $('#userwindow_' + userName + ' .ban_link');
                    if (link.is(':visible')) {
                        Core.Helpers.$click(link);
                        banned = true;
                        return false;
                    }
                    Core.Helpers.$click($('.close_modal'));
                }
            });
            return banned;
        },
        say : function (message) {
            var typebox = $('#typebox')
            ,speak_button = $('#speak_button')
            ;
            message = Core.Helpers.htmlDecode(message);
            typebox.val(message);
            Core.Helpers.$click(speak_button);
        },
        getContacts : function () {
            var contacts = []
            ,text
            ;
            $('#contactselect option').each(function (index, value) {
                text = $(value).text();
                if (text.length > 0) {
                	contacts.push(text);
                }
            });
            return contacts;
        }
    };
    
    /** main() **/
    $(function() {
        Core.Helpers = new Helpers();
        Core.GameBoard = new GameBoard();
        Core.Settings = new Settings();
        Core.Bans = new Bans();
        Core.Terminal = new Terminal();
        Core.CommandProcessor = new CommandProcessor();
        
        Core.GameBoard.onLoad(Core.onLoad.bind(Core));
    });
    
}(window.jQuery, window.console, window));