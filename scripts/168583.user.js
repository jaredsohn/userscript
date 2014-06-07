// ==UserScript==
// @name Monkeybro
(function() {
  var Command, RoomHelper, User, afkCheck, afksCommand, allAfksCommand, announceCurate, antispam, apiHooks, avgVoteRatioCommand, badQualityCommand, beggar, 

foulLanguage, chatCommandDispatcher, chatUniversals, cmdHelpCommand, cmds, commandsCommand, cookieCommand, data, dieCommand, disconnectLookupCommand, contactCommand, 

youtubeCommand, skypeCommand, submitCommand, scriptCommand, forceSkipCommand, handleNewSong, handleUserJoin, handleUserLeave, handleVote, hook, hugCommand, 

initEnvironment, initHooks, initialize, lockCommand, msToStr, newSongsCommand, popCommand, populateUserData, protectCommand, punishCommand, pupOnline, pushCommand, 

reloadCommand, resetAfkCommand, roomHelpCommand, rulesCommand, settings, skipCommand, strobesCommand, sourceCommand, staffCommand, statusCommand, swapCommand, 

churrosCommand, themeCommand, undoHooks, unhook, unhookCommand, unlockCommand, updateVotes, voteRatioCommand, wootCommand,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = 

child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  settings = (function() {

    function settings() {
      this.implode = __bind(this.implode, this);

      this.intervalMessages = __bind(this.intervalMessages, this);

      this.startAfkInterval = __bind(this.startAfkInterval, this);

      this.setInternalWaitlist = __bind(this.setInternalWaitlist, this);

      this.userJoin = __bind(this.userJoin, this);

      this.getRoomUrlPath = __bind(this.getRoomUrlPath, this);

      this.startup = __bind(this.startup, this);

    }

    settings.prototype.currentsong = {};

    settings.prototype.users = {};

    settings.prototype.djs = [];

    settings.prototype.mods = [];

    settings.prototype.host = [];

    settings.prototype.hasWarned = false;

    settings.prototype.currentwoots = 0;

    settings.prototype.currentmehs = 0;

    settings.prototype.currentcurates = 0;

    settings.prototype.roomUrlPath = null;

    settings.prototype.internalWaitlist = [];

    settings.prototype.userDisconnectLog = [];

    settings.prototype.voteLog = {};

    settings.prototype.seshOn = false;

    settings.prototype.forceSkip = false;

    settings.prototype.seshMembers = [];

    settings.prototype.launchTime = null;

    settings.prototype.totalVotingData = {
      woots: 0,
      mehs: 0,
      curates: 0
    };

    settings.prototype.pupScriptUrl = '';

    settings.prototype.afkTime = 24 * 60 * 1000;

    settings.prototype.songIntervalMessages = [
      {
        interval: 20,
        offset: 0,
        msg: "Gibe me moni or I repot u!"
      }
    ];

    settings.prototype.songCount = 0;

    settings.prototype.startup = function() {
      this.launchTime = new Date();
      return this.roomUrlPath = this.getRoomUrlPath();
    };

    settings.prototype.getRoomUrlPath = function() {
      return window.location.pathname.replace(/\//g, '');
    };

    settings.prototype.newSong = function() {
      this.totalVotingData.woots += this.currentwoots;
      this.totalVotingData.mehs += this.currentmehs;
      this.totalVotingData.curates += this.currentcurates;
      this.setInternalWaitlist();
      this.currentsong = API.getMedia();
      if (this.currentsong !== null) {
        return this.currentsong;
      } else {
        return false;
      }
    };

    settings.prototype.userJoin = function(u) {
      var userIds, _ref;
      userIds = Object.keys(this.users);
      if (_ref = u.id, __indexOf.call(userIds, _ref) >= 0) {
        return this.users[u.id].inRoom(true);
      } else {
        this.users[u.id] = new User(u);
        return this.voteLog[u.id] = {};
      }
    };

    settings.prototype.setInternalWaitlist = function() {
      var boothWaitlist, fullWaitList, lineWaitList;
      boothWaitlist = API.getDJs().slice(1);
      lineWaitList = API.getWaitList();
      fullWaitList = boothWaitlist.concat(lineWaitList);
      return this.internalWaitlist = fullWaitList;
    };

    settings.prototype.activity = function(obj) {
      if (obj.type === 'message') {
        return this.users[obj.fromID].updateActivity();
      }
    };

    settings.prototype.startAfkInterval = function() {
      return this.afkInterval = setInterval(afkCheck, 2000);
    };

    settings.prototype.intervalMessages = function() {
      var msg, _i, _len, _ref, _results;
      this.songCount++;
      _ref = this.songIntervalMessages;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        msg = _ref[_i];
        if (((this.songCount + msg['offset']) % msg['interval']) === 0) {
          _results.push(API.sendChat(msg['msg']));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    settings.prototype.implode = function() {
      var item, val;
      for (item in this) {
        val = this[item];
        if (typeof this[item] === 'object') {
          delete this[item];
        }
      }
      return clearInterval(this.afkInterval);
    };

    settings.prototype.lockBooth = function(callback) {
      if (callback == null) {
        callback = null;
      }
      return $.ajax({
        url: "http://plug.dj/_/gateway/room.update_options",
        type: 'POST',
        data: JSON.stringify({
          service: "room.update_options",
          body: [
            this.roomUrlPath, {
              "boothLocked": true,
              "waitListEnabled": true,
              "maxPlays": 1,
              "maxDJs": 5
            }
          ]
        }),
        async: this.async,
        dataType: 'json',
        contentType: 'application/json'
      }).done(function() {
        if (callback != null) {
          return callback();
        }
      });
    };

    settings.prototype.unlockBooth = function(callback) {
      if (callback == null) {
        callback = null;
      }
      return $.ajax({
        url: "http://plug.dj/_/gateway/room.update_options",
        type: 'POST',
        data: JSON.stringify({
          service: "room.update_options",
          body: [
            this.roomUrlPath, {
              "boothLocked": false,
              "waitListEnabled": true,
              "maxPlays": 1,
              "maxDJs": 5
            }
          ]
        }),
        async: this.async,
        dataType: 'json',
        contentType: 'application/json'
      }).done(function() {
        if (callback != null) {
          return callback();
        }
      });
    };

    return settings;

  })();

  data = new settings();

  User = (function() {

    User.prototype.afkWarningCount = 0;

    User.prototype.lastWarning = null;

    User.prototype["protected"] = false;

    User.prototype.isInRoom = true;

    function User(user) {
      this.user = user;
      this.updateVote = __bind(this.updateVote, this);

      this.inRoom = __bind(this.inRoom, this);

      this.notDj = __bind(this.notDj, this);

      this.warn = __bind(this.warn, this);

      this.getIsDj = __bind(this.getIsDj, this);

      this.getWarningCount = __bind(this.getWarningCount, this);

      this.getUser = __bind(this.getUser, this);

      this.getLastWarning = __bind(this.getLastWarning, this);

      this.getLastActivity = __bind(this.getLastActivity, this);

      this.updateActivity = __bind(this.updateActivity, this);

      this.init = __bind(this.init, this);

      this.init();
    }

    User.prototype.init = function() {
      return this.lastActivity = new Date();
    };

    User.prototype.updateActivity = function() {
      this.lastActivity = new Date();
      this.afkWarningCount = 0;
      return this.lastWarning = null;
    };

    User.prototype.getLastActivity = function() {
      return this.lastActivity;
    };

    User.prototype.getLastWarning = function() {
      if (this.lastWarning === null) {
        return false;
      } else {
        return this.lastWarning;
      }
    };

    User.prototype.getUser = function() {
      return this.user;
    };

    User.prototype.getWarningCount = function() {
      return this.afkWarningCount;
    };

    User.prototype.getIsDj = function() {
      var DJs, dj, _i, _len;
      DJs = API.getDJs();
      for (_i = 0, _len = DJs.length; _i < _len; _i++) {
        dj = DJs[_i];
        if (this.user.id === dj.id) {
          return true;
        }
      }
      return false;
    };

    User.prototype.warn = function() {
      this.afkWarningCount++;
      return this.lastWarning = new Date();
    };

    User.prototype.notDj = function() {
      this.afkWarningCount = 0;
      return this.lastWarning = null;
    };

    User.prototype.inRoom = function(online) {
      return this.isInRoom = online;
    };

    User.prototype.updateVote = function(v) {
      if (this.isInRoom) {
        return data.voteLog[this.user.id][data.currentsong.id] = v;
      }
    };

    return User;

  })();

  RoomHelper = (function() {

    function RoomHelper() {}

    RoomHelper.prototype.lookupUser = function(username) {
      var id, u, _ref;
      _ref = data.users;
      for (id in _ref) {
        u = _ref[id];
        if (u.getUser().username === username) {
          return u.getUser();
        }
      }
      return false;
    };

    RoomHelper.prototype.userVoteRatio = function(user) {
      var songId, songVotes, vote, votes;
      songVotes = data.voteLog[user.id];
      votes = {
        'woot': 0,
        'meh': 0
      };
      for (songId in songVotes) {
        vote = songVotes[songId];
        if (vote === 1) {
          votes['woot']++;
        } else if (vote === -1) {
          votes['meh']++;
        }
      }
      votes['positiveRatio'] = (votes['woot'] / (votes['woot'] + votes['meh'])).toFixed(2);
      return votes;
    };

    return RoomHelper;

  })();

  pupOnline = function() {
    return API.sendChat("Monkeybro chegou nessa delícia!");
  };

  populateUserData = function() {
    var u, users, _i, _len;
    users = API.getUsers();
    for (_i = 0, _len = users.length; _i < _len; _i++) {
      u = users[_i];
      data.users[u.id] = new User(u);
      data.voteLog[u.id] = {};
    }
  };

  initEnvironment = function() {
    document.getElementById("button-vote-positive").click();
    document.getElementById("button-sound").click();
    Playback.streamDisabled = true;
    return Playback.stop();
  };

  initialize = function() {
    pupOnline();
    populateUserData();
    initEnvironment();
    initHooks();
    data.startup();
    data.newSong();
    return data.startAfkInterval();
  };

  afkCheck = function() {
    var DJs, id, lastActivity, lastWarned, now, oneMinute, secsLastActive, timeSinceLastActivity, timeSinceLastWarning, twoMinutes, user, warnMsg, _ref, _results;
    _ref = data.users;
    _results = [];
    for (id in _ref) {
      user = _ref[id];
      now = new Date();
      lastActivity = user.getLastActivity();
      timeSinceLastActivity = now.getTime() - lastActivity.getTime();
      if (timeSinceLastActivity > data.afkTime) {
        if (user.getIsDj()) {
          secsLastActive = timeSinceLastActivity / 1000;
          if (user.getWarningCount() === 0) {
            user.warn();
            _results.push(API.sendChat("@" + user.getUser().username + ", I haven't seen you chat or vote in at least 24 minutes. If you don't show activity in 5 

minutes I will remove you."));
          } else if (user.getWarningCount() === 1) {
            lastWarned = user.getLastWarning();
            timeSinceLastWarning = now.getTime() - lastWarned.getTime();
            fiveMinutes = 5 * 60 * 1000;
            if (timeSinceLastWarning > fiveMinutes) {
              user.warn();
              warnMsg = "@" + user.getUser().username;
              warnMsg += ", I haven't seen you chat or vote in at least 30 minutes now.  This is your second and FINAL warning.  If you do not chat or vote in the next 

minute I will remove you.";
              _results.push(API.sendChat(warnMsg));
            } else {
              _results.push(void 0);
            }
          } else if (user.getWarningCount() === 5) {
            lastWarned = user.getLastWarning();
            timeSinceLastWarning = now.getTime() - lastWarned.getTime();
            oneMinute = 1 * 60 * 1000;
            if (timeSinceLastWarning > oneMinute) {
              DJs = API.getDJs();
              if (DJs.length > 0 && DJs[0].id !== user.getUser().id) {
                API.sendChat("@" + user.getUser().username + ", you had 2 warnings. Please stay active by chatting or voting.");
                API.moderateRemoveDJ(id);
                _results.push(user.warn());
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(user.notDj());
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  msToStr = function(msTime) {
    var ms, msg, timeAway;
    msg = '';
    timeAway = {
      'days': 0,
      'hours': 0,
      'minutes': 0,
      'seconds': 0
    };
    ms = {
      'day': 24 * 60 * 60 * 1000,
      'hour': 60 * 60 * 1000,
      'minute': 60 * 1000,
      'second': 1000
    };
    if (msTime > ms['day']) {
      timeAway['days'] = Math.floor(msTime / ms['day']);
      msTime = msTime % ms['day'];
    }
    if (msTime > ms['hour']) {
      timeAway['hours'] = Math.floor(msTime / ms['hour']);
      msTime = msTime % ms['hour'];
    }
    if (msTime > ms['minute']) {
      timeAway['minutes'] = Math.floor(msTime / ms['minute']);
      msTime = msTime % ms['minute'];
    }
    if (msTime > ms['second']) {
      timeAway['seconds'] = Math.floor(msTime / ms['second']);
    }
    if (timeAway['days'] !== 0) {
      msg += timeAway['days'].toString() + 'd';
    }
    if (timeAway['hours'] !== 0) {
      msg += timeAway['hours'].toString() + 'h';
    }
    if (timeAway['minutes'] !== 0) {
      msg += timeAway['minutes'].toString() + 'm';
    }
    if (timeAway['seconds'] !== 0) {
      msg += timeAway['seconds'].toString() + 's';
    }
    if (msg !== '') {
      return msg;
    } else {
      return false;
    }
  };

  Command = (function() {

    function Command(msgData) {
      this.msgData = msgData;
      this.init();
    }

    Command.prototype.init = function() {
      this.parseType = null;
      this.command = null;
      return this.rankPrivelege = null;
    };

    Command.prototype.functionality = function(data) {};

    Command.prototype.hasPrivelege = function() {
      var user;
      user = data.users[this.msgData.fromID].getUser();
      switch (this.rankPrivelege) {
        case 'host':
          return user.permission === 5;
        case 'cohost':
          return user.permission >= 4;
        case 'mod':
          return user.permission >= 3;
        case 'manager':
          return user.permission >= 3;
        case 'bouncer':
          return user.permission >= 2;
        case 'featured':
          return user.permission >= 1;
        default:
          return true;
      }
    };

    Command.prototype.commandMatch = function() {
      var command, msg, _i, _len, _ref;
      msg = this.msgData.message;
      if (typeof this.command === 'string') {
        if (this.parseType === 'exact') {
          if (msg === this.command) {
            return true;
          } else {
            return false;
          }
        } else if (this.parseType === 'startsWith') {
          if (msg.substr(0, this.command.length) === this.command) {
            return true;
          } else {
            return false;
          }
        } else if (this.parseType === 'contains') {
          if (msg.indexOf(this.command) !== -1) {
            return true;
          } else {
            return false;
          }
        }
      } else if (typeof this.command === 'object') {
        _ref = this.command;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          command = _ref[_i];
          if (this.parseType === 'exact') {
            if (msg === command) {
              return true;
            }
          } else if (this.parseType === 'startsWith') {
            if (msg.substr(0, command.length) === command) {
              return true;
            }
          } else if (this.parseType === 'contains') {
            if (msg.indexOf(command) !== -1) {
              return true;
            }
          }
        }
        return false;
      }
    };

    Command.prototype.evalMsg = function() {
      if (this.commandMatch() && this.hasPrivelege()) {
        this.functionality();
        return true;
      } else {
        return false;
      }
    };

    return Command;

  })();

  protectCommand = (function(_super) {

    __extends(protectCommand, _super);

    function protectCommand() {
      return protectCommand.__super__.constructor.apply(this, arguments);
    }

    protectCommand.prototype.init = function() {
      this.command = '/protect';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    protectCommand.prototype.functionality = function() {
      var id, msg, user, username, _ref;
      msg = this.msgData.message;
      if (msg.length > 9) {
        username = msg.substring(10);
        _ref = data.users;
        for (id in _ref) {
          user = _ref[id];
          if (user.getUser().username === username) {
            user["protected"] = true;
            API.sendChat("I shall protect you @" + username + " (I just wont kick you)");
            return;
          }
        }
      }
      API.sendChat("That aint no name I ever did see");
    };

    return protectCommand;

  })(Command);

  cmdHelpCommand = (function(_super) {

    __extends(cmdHelpCommand, _super);

    function cmdHelpCommand() {
      return cmdHelpCommand.__super__.constructor.apply(this, arguments);
    }

    cmdHelpCommand.prototype.init = function() {
      this.command = '/cmdhelp';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    cmdHelpCommand.prototype.functionality = function() {
      var msg, param, resp;
      msg = this.msgData.message;
      resp = '';
      if (msg.length > 9) {
        param = msg.substring(9);
        switch (param) {
          case "hugs pup":
            resp = "You give me a hug!";
            break;
          case "rapes pup":
            resp = "er... isso... tipo... não é um comando... idiota";
            break;
          case "churros":
            resp = "order a yummy churros.  simply say 'churros' or give on to someone else by saying 'churros @user'";
            break;
          case "cookie":
            resp = "Mod only command.  Reward a user with a sweet treat!  Syntax: cookie @user";
            break;
          case "punish":
            resp = "Mod only command.  Punish a user in one of several methods.  For naughty users.  Syntax: punish @user";
            break;
          case "/newsongs":
            resp = "find new songs by checking out one of 40+ dubstep channels that post new music daily";
            break;
          case "/theme":
            resp = "Learn what genres of music are generally accepted here.  Don't forget to check if your song is in /overplayed though";
            break;
          case "/rules":
            resp = "Room rules.  Duh";
            break;
          case "/roomhelp":
            resp = "Information about the room for the newer folk.";
            break;
          case "/source":
            resp = "About the bot and the code that produced it";
            break;
          case "/sourcecode":
            resp = "About the bot and the code that produced it";
            break;
          case "/author":
            resp = "About the bot and the code that produced it";
            break;
          case "/woot":
            resp = "Remind users to hit woot so they don't get removed.  either type /woot or /woot @user";
            break;
          case ".128":
            resp = "Mod only command. Flags songs that are bad quality.";
            break;
          case "/tableflip":
            resp = "... flips a table";
            break;
          case "/tablefix":
            resp = "... fixes a table";
            break;
          case "/smokesesh":
            resp = "For when ya just wanna get high";
            break;
          case "/smoke":
            resp = "doobies";
            break;
          case "/dab":
            resp = "WOLVES uses this";
            break;
          case "/afks":
            resp = "List current DJs on deck that haven't chatted or voted in 5+ minutes";
            break;
          case "/allafks":
            resp = "List all users in room that haven't chatted or voted in 10+ minutes";
            break;
          case "/status":
            resp = "Uptime and total song stats";
            break;
          case "/unhook events all":
            resp = "Comando para Mods apenas.  It's complicated";
            break;
          case "/die":
            resp = "Comando para Mods apenas. Makes bot go bye bye";
            break;
          case "/reload":
            resp = "Comando para Mods apenas. Reload pup's script";
            break;
          case "/lock":
            resp = "Comando para Mods apenas. Locks booth";
            break;
          case "/unlock":
            resp = "Comando para Mods apenas. Unlocks booth";
            break;
          case "/skip":
            resp = "Comando para Mods apenas.  Skips song.  Works for skipping invisible DJs.";
            break;
          case "/commands":
            resp = "Lists all commands.  Will only list commands available to caller's user class (user, mod, or host)";
            break;
          case "/resetafk":
            resp = "Mod only command.  Resets AFK timer for user.  Syntax: /resetafk @USER";
            break;
          case "/forceskip":
            resp = "Host only command.  Make pup skip songs when they are supposed to end (addresses triangles of death issue). Syntax: /forceskip [enable|disable]";
            break;
          case "/dclookup":
            resp = "Mod only command.  Looks up user for a log of their last disconnect. Syntax: /dclookup @USER";
            break;
          case "/reminder":
            resp = "Mod only command.  Set reminder for x songs from now.  For users that dc'd mainly.  Syntax: /reminder \"MSG\" [numsongs]";
            break;
          case "/voteratio":
            resp = "Mod only command.  See woot & meh count for user since bot launch.  Syntax: /voteratio @USER";
            break;
          case "/avgvoteratio":
            resp = "Mod only command.  See average voting ratio of every present user in room. Syntax: /avgvoteratio";
            break;
          case "/cmdhelp":
            resp = "Looks like you got it down";
            break;
          case "/pop":
            resp = "Mod only command.  Removes last person on deck";
            break;
          case "/push":
            resp = "Mod only command.  Puts user on deck. Syntax: /push @user";
            break;
          default:
            resp = "That is nothing.  That is not a thing.";
        }
      } else {
        resp = "Use this command to learn how use other commands.  Syntax: /cmdhelp [/CMD]";
      }
      return API.sendChat(resp);
    };

    return cmdHelpCommand;

  })(Command);

  hugCommand = (function(_super) {

    __extends(hugCommand, _super);

    function hugCommand() {
      return hugCommand.__super__.constructor.apply(this, arguments);
    }

    hugCommand.prototype.init = function() {
      this.command = 'hugs pup';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    hugCommand.prototype.functionality = function() {
      return API.sendChat("hugs @" + this.msgData['from']);
    };

    return hugCommand;

  })(Command);

  churrosCommand = (function(_super) {

    __extends(churrosCommand, _super);

    function churrosCommand() {
      return churrosCommand.__super__.constructor.apply(this, arguments);
    }

    churrosCommand.prototype.init = function() {
      this.command = 'churros';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    churrosCommand.prototype.randomChurros = function() {
      var r, churros;
      churros = ["Churros de Doce de Leite", "Pênis", "Churros duplo com Suco de Cajú", "Picolé de coxinha", "Churros Supremo", "Churros Grelhados com Banana", 

"Cupcake homossexual", "Cheetos do Deaddy"];
      r = Math.floor(Math.random() * churros.length);
      return churros[r];
    };

    churrosCommand.prototype.functionality = function() {
      var msg, churros, churrosName;
      msg = this.msgData.message;
      churros = this.randomChurros();
      if (msg.substring(5, 6) === "@") {
        churrosName = msg.substring(6);
        if (churrosName === '#Wolf Pup') {
          return API.sendChat("Não, já sou muito gordo :(");
        } else {
          return API.sendChat("Hey @" + churrosName + ", " + this.msgData.from + " toma aqui seu " + churros + ", seu puto!");
        }
      } else {
        return API.sendChat("Hey @" + this.msgData.from + ", aqui está o " + churros + ", seu viado!");
      }
    };

    return churrosCommand;

  })(Command);

  cookieCommand = (function(_super) {

    __extends(cookieCommand, _super);

    function cookieCommand() {
      return cookieCommand.__super__.constructor.apply(this, arguments);
    }

    cookieCommand.prototype.init = function() {
      this.command = 'cookie';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    cookieCommand.prototype.getCookie = function() {
      var c, cookies;
      cookies = ["a chocolate chip cookie", "a sugar cookie", "an oatmeal raisin cookie", "a 'special' brownie", "an animal cracker", "a scooby snack", "a blueberry 

muffin", "a cupcake"];
      c = Math.floor(Math.random() * cookies.length);
      return cookies[c];
    };

    cookieCommand.prototype.functionality = function() {
      var msg, r, user;
      msg = this.msgData.message;
      r = new RoomHelper();
      if (msg.length > 8) {
        user = r.lookupUser(msg.substr(8));
        if (user === false) {
          API.sendChat("/em doesn't see '" + msg.substr(8) + "' in room and eats cookie himself");
          return false;
        } else {
          return API.sendChat("@" + user.username + ", @" + this.msgData.from + " has rewarded you with " + this.getCookie() + ". Enjoy.");
        }
      }
    };

    return cookieCommand;

  })(Command);

  punishCommand = (function(_super) {

    __extends(punishCommand, _super);

    function punishCommand() {
      return punishCommand.__super__.constructor.apply(this, arguments);
    }

    punishCommand.prototype.init = function() {
      this.command = 'punish';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    punishCommand.prototype.getPunishment = function(username) {
      var p, punishment, punishments;
      punishments = [" rubs sandpaper on @{victim}'s scrotum", " pokes @{victim} in the eyes", " throws sand in @{victim}'s eyes", " makes @{victim}'s mother cry", " 

penetrates @{victim} with a sharpie", " pinches @{victim}'s nipples super hard", " gives @{victim} a wet willy"];
      p = Math.floor(Math.random() * punishments.length);
      punishment = punishments[p].replace('{victim}', username);
      return punishment;
    };

    punishCommand.prototype.functionality = function() {
      var msg, name, r, user;
      msg = this.msgData.message;
      r = new RoomHelper();
      if (msg.length > 8) {
        name = msg.substr(8);
        user = r.lookupUser(name);
        if (user === false) {
          API.sendChat("/me punishes @" + this.msgData.from + " for getting the syntax wrong.");
          return setTimeout(function() {
            return API.sendChat("Seriously though, I don't recognize the username '" + name + "'");
          }, 750);
        } else {
          if (user.owner) {
            return API.sendChat(this.getPunishment(this.msgData.from));
          } else {
            return API.sendChat(this.getPunishment(user.username));
          }
        }
      }
    };

    return punishCommand;

  })(Command);

  newSongsCommand = (function(_super) {

    __extends(newSongsCommand, _super);

    function newSongsCommand() {
      return newSongsCommand.__super__.constructor.apply(this, arguments);
    }

    newSongsCommand.prototype.init = function() {
      this.command = '/newsongs';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    newSongsCommand.prototype.functionality = function() {
      var msg;
      msg = " Não sei onde achar boas músicas, sou apenas um macaco. ";
      return API.sendChat(msg);
    };

    return newSongsCommand;

  })(Command);

  themeCommand = (function(_super) {

    __extends(themeCommand, _super);

    function themeCommand() {
      return themeCommand.__super__.constructor.apply(this, arguments);
    }

    themeCommand.prototype.init = function() {
      this.command = '/theme';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    themeCommand.prototype.functionality = function() {
      var msg;
      msg = "/em: EDM,   ";
      msg += " Fique à vontade para tocar o que quiser, desde mbjarias até funk(jus da lulz ou não(?)). Essa é a principal diferença entre o plug.dj e a Sa/b/alada.";
      return API.sendChat(msg);
    };

    return themeCommand;

  })(Command);

  rulesCommand = (function(_super) {

    __extends(rulesCommand, _super);

    function rulesCommand() {
      return rulesCommand.__super__.constructor.apply(this, arguments);
    }

    rulesCommand.prototype.init = function() {
      this.command = '/rules';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    rulesCommand.prototype.functionality = function() {
      var msg;
      msg = "/em: 1)   Não seja negro!   ";
            return API.sendChat(msg);
    };

    return rulesCommand;

  })(Command);

  roomHelpCommand = (function(_super) {

    __extends(roomHelpCommand, _super);

    function roomHelpCommand() {
      return roomHelpCommand.__super__.constructor.apply(this, arguments);
    }

    roomHelpCommand.prototype.init = function() {
      this.command = '/roomhelp';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    roomHelpCommand.prototype.functionality = function() {
      var msg1, msg2;
      msg1 = "Bem vindo à financiada pela A.L.I.C.I.A.! Você pode criar sua playlist clicando em 'Meus Playlists', depois em 'Novo' para criar uma nova playlist. Pode 

recheá-la pesquisando por links/nomes do YouTube e Soundcloud. ";
      msg1 += "Clique em 'Clique para DJ' e espere até chegar sua vez de tocar. A maioria dos tipos de música são aceitas, tecle '/theme' para mais especificações.";
      msg2 = "Nesta sala você pode realizar seu sonho de ser um DJ de grande sucesso, como o Raphael Mendes. Toque boas músicas e verifique em 'História' se ela não 

foi tocada recentemente. ";
      msg2 += "O tempo máximo para cada anão é de 7 minutos, músicas maiores que 7 minutos serão puladas assim que completadas tais minutos de play. Se você pretende 

tocar músicas do Skrillex... apenas não.";
      API.sendChat(msg1);
      return setTimeout((function() {
        return API.sendChat(msg2);
      }), 750);
    };

    return roomHelpCommand;

  })(Command);

  sourceCommand = (function(_super) {

    __extends(sourceCommand, _super);

    function sourceCommand() {
      return sourceCommand.__super__.constructor.apply(this, arguments);
    }

    sourceCommand.prototype.init = function() {
      this.command = ['/source', '/sourcecode', '/author'];
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    sourceCommand.prototype.functionality = function() {
      var msg;
      msg = 'Backus wrote me in CoffeeScript.  A generalized version of me should be available on github soon!';
      return API.sendChat(msg);
    };

    return sourceCommand;
	
	})(Command);

  staffCommand = (function(_super) {

    __extends(staffCommand, _super);

    function staffCommand() {
      return staffCommand.__super__.constructor.apply(this, arguments);
    }

    staffCommand.prototype.init = function() {
      this.command = '/staff';
      this.parseType = 'exact';
      this.rankPrivelege = 'user';
      return window.lastActiveStaffTime;
    };

    staffCommand.prototype.staff = function() {
      var now, staff, staffAfk, stringstaff, user, _i, _len;
      staff = API.getStaff();
      now = new Date();
      stringstaff = "";
      for (_i = 0, _len = staff.length; _i < _len; _i++) {
        user = staff[_i];
        if (user.permission > 2) {
          staffAfk = now.getTime() - data.users[user.id].getLastActivity().getTime();
          if (staffAfk < (20 * 60 * 1000)) {
            stringstaff += "@" + user.username + " ";
          }
        }
      }
      if (stringstaff.length === 0) {
        stringstaff = "Nenhum membro da staff está presente. ";
      }
      return stringstaff;
    };

    staffCommand.prototype.functionality = function() {
      var currentTime, millisecondsPassed, thestaff;
      thestaff = this.staff();
      currentTime = new Date();
      if (!window.lastActiveStaffTime) {
        API.sendChat(thestaff);
        return window.lastActiveStaffTime = currentTime;
      } else {
        millisecondsPassed = currentTime.getTime() - window.lastActiveStaffTime.getTime();
        if (millisecondsPassed > 10000) {
          window.lastActiveStaffTime = currentTime;
          return API.sendChat(thestaff);
        }
      }
    };

    return staffCommand;

  })(Command);

  wootCommand = (function(_super) {

    __extends(wootCommand, _super);

    function wootCommand() {
      return wootCommand.__super__.constructor.apply(this, arguments);
    }

    wootCommand.prototype.init = function() {
      this.command = '/woot';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'user';
    };

    wootCommand.prototype.functionality = function() {
      var msg, nameIndex;
      msg = "Please WOOT on DJ Booth and support your fellow DJs!";
      if ((nameIndex = this.msgData.message.indexOf('@')) !== -1) {
        return API.sendChat(this.msgData.message.substr(nameIndex) + ', ' + msg);
      } else {
        return API.sendChat(msg);
      }
    };

    return wootCommand;

  })(Command);

  badQualityCommand = (function(_super) {

    __extends(badQualityCommand, _super);

    function badQualityCommand() {
      return badQualityCommand.__super__.constructor.apply(this, arguments);
    }

    badQualityCommand.prototype.init = function() {
      this.command = '.128';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    badQualityCommand.prototype.functionality = function() {
      var msg;
      msg = "Flagged for bad sound quality. Where do you get your music? The garbage can? Don't play this low quality tune again!";
      return API.sendChat(msg);
    };

    return badQualityCommand;

  })(Command);

  afksCommand = (function(_super) {

    __extends(afksCommand, _super);

    function afksCommand() {
      return afksCommand.__super__.constructor.apply(this, arguments);
    }

    afksCommand.prototype.init = function() {
      this.command = '/afks';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    afksCommand.prototype.functionality = function() {
      var dj, djAfk, djs, msg, now, _i, _len;
      msg = '';
      djs = API.getDJs();
      for (_i = 0, _len = djs.length; _i < _len; _i++) {
        dj = djs[_i];
        now = new Date();
        djAfk = now.getTime() - data.users[dj.id].getLastActivity().getTime();
        if (djAfk > (5 * 60 * 1000)) {
          if (msToStr(djAfk) !== false) {
            msg += dj.username + ' - ' + msToStr(djAfk);
            msg += '. ';
          }
        }
      }
      if (msg === '') {
        return API.sendChat("Ninguém está AFK");
      } else {
        return API.sendChat('AFKs: ' + msg);
      }
    };

    return afksCommand;

  })(Command);

  allAfksCommand = (function(_super) {

    __extends(allAfksCommand, _super);

    function allAfksCommand() {
      return allAfksCommand.__super__.constructor.apply(this, arguments);
    }

    allAfksCommand.prototype.init = function() {
      this.command = '/allafks';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    allAfksCommand.prototype.functionality = function() {
      var msg, now, u, uAfk, usrs, _i, _len;
      msg = '';
      usrs = API.getUsers();
      for (_i = 0, _len = usrs.length; _i < _len; _i++) {
        u = usrs[_i];
        now = new Date();
        uAfk = now.getTime() - data.users[u.id].getLastActivity().getTime();
        if (uAfk > (10 * 60 * 1000)) {
          if (msToStr(uAfk) !== false) {
            msg += u.username + ' - ' + msToStr(uAfk);
            msg += '. ';
          }
        }
      }
      if (msg === '') {
        return API.sendChat("No one is AFK");
      } else {
        return API.sendChat('AFKs: ' + msg);
      }
    };

    return allAfksCommand;

  })(Command);

  statusCommand = (function(_super) {

    __extends(statusCommand, _super);

    function statusCommand() {
      return statusCommand.__super__.constructor.apply(this, arguments);
    }

    statusCommand.prototype.init = function() {
      this.command = '/status';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    statusCommand.prototype.functionality = function() {
      var day, hour, launch, lt, meridian, min, month, msg, t, totals;
      lt = data.launchTime;
      month = lt.getMonth() + 1;
      day = lt.getDate();
      hour = lt.getHours();
      meridian = hour % 12 === hour ? 'AM' : 'PM';
      min = lt.getMinutes();
      min = min < 10 ? '0' + min : min;
      t = data.totalVotingData;
      t['songs'] = data.songCount;
      launch = 'Initiated ' + month + '/' + day + ' ' + hour + ':' + min + ' ' + meridian + '. ';
      totals = '' + t.songs + ' músicas foram tocadas, acumulando ' + t.woots + ' likes, ' + t.mehs + ' mehs, and ' + t.curates + ' enfiações no cu.';
      msg = launch + totals;
      return API.sendChat(msg);
    };

    return statusCommand;

  })(Command);

  unhookCommand = (function(_super) {

    __extends(unhookCommand, _super);

    function unhookCommand() {
      return unhookCommand.__super__.constructor.apply(this, arguments);
    }

    unhookCommand.prototype.init = function() {
      this.command = '/unhook events all';
      this.parseType = 'exact';
      return this.rankPrivelege = 'host';
    };

    unhookCommand.prototype.functionality = function() {
      API.sendChat('Unhooking all events...');
      return undoHooks();
    };

    return unhookCommand;

  })(Command);

  dieCommand = (function(_super) {

    __extends(dieCommand, _super);

    function dieCommand() {
      return dieCommand.__super__.constructor.apply(this, arguments);
    }

    dieCommand.prototype.init = function() {
      this.command = '/die';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    dieCommand.prototype.functionality = function() {
      API.sendChat('Unhooking Events...');
      undoHooks();
      API.sendChat('Deleting bot data...');
      data.implode();
      return API.sendChat('Consider me dead');
    };

    return dieCommand;

  })(Command);

  reloadCommand = (function(_super) {

    __extends(reloadCommand, _super);

    function reloadCommand() {
      return reloadCommand.__super__.constructor.apply(this, arguments);
    }

    reloadCommand.prototype.init = function() {
      this.command = '/reload';
      this.parseType = 'exact';
      return this.rankPrivelege = 'host';
    };

    reloadCommand.prototype.functionality = function() {
      var pupSrc;
      API.sendChat('brb');
      undoHooks();
      pupSrc = data.pupScriptUrl;
      data.implode();
      return $.getScript(pupSrc);
    };

    return reloadCommand;

  })(Command);

  lockCommand = (function(_super) {

    __extends(lockCommand, _super);

    function lockCommand() {
      return lockCommand.__super__.constructor.apply(this, arguments);
    }

    lockCommand.prototype.init = function() {
      this.command = '/lock';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    lockCommand.prototype.functionality = function() {
      
      return data.lockBooth();
    };

    return lockCommand;

  })(Command);

  unlockCommand = (function(_super) {

    __extends(unlockCommand, _super);

    function unlockCommand() {
      return unlockCommand.__super__.constructor.apply(this, arguments);
    }

    unlockCommand.prototype.init = function() {
      this.command = '/unlock';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    unlockCommand.prototype.functionality = function() {
           return data.unlockBooth();
    };

    return unlockCommand;

  })(Command);

  swapCommand = (function(_super) {

    __extends(swapCommand, _super);

    function swapCommand() {
      return swapCommand.__super__.constructor.apply(this, arguments);
    }

    swapCommand.prototype.init = function() {
      this.command = '/swap';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    swapCommand.prototype.functionality = function() {
      var msg, r, swapRegex, userAdd, userRemove, users;
      msg = this.msgData.message;
      swapRegex = new RegExp("^/swap @(.+) for @(.+)$");
      users = swapRegex.exec(msg).slice(1);
      r = new RoomHelper();
      if (users.length === 2) {
        userRemove = r.lookupUser(users[0]);
        userAdd = r.lookupUser(users[1]);
        if (userRemove === false || userAdd === false) {
          API.sendChat('Error parsing one or both names');
          return false;
        } else {
          return data.lockBooth(function() {
            API.moderateRemoveDJ(userRemove.id);
            API.sendChat("Removing " + userRemove.username + "...");
            return setTimeout(function() {
              API.moderateAddDJ(userAdd.id);
              API.sendChat("Adding " + userAdd.username + "...");
              return setTimeout(function() {
                return data.unlockBooth();
              }, 1500);
            }, 1500);
          });
        }
      } else {
        return API.sendChat("Command didn't parse into two seperate usernames");
      }
    };

    return swapCommand;

  })(Command);

  popCommand = (function(_super) {

    __extends(popCommand, _super);

    function popCommand() {
      return popCommand.__super__.constructor.apply(this, arguments);
    }

    popCommand.prototype.init = function() {
      this.command = '/pop';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    popCommand.prototype.functionality = function() {
      var djs, popDj;
      djs = API.getDJs();
      popDj = djs[djs.length - 1];
      return API.moderateRemoveDJ(popDj.id);
    };

    return popCommand;

  })(Command);

  pushCommand = (function(_super) {

    __extends(pushCommand, _super);

    function pushCommand() {
      return pushCommand.__super__.constructor.apply(this, arguments);
    }

    pushCommand.prototype.init = function() {
      this.command = '/push';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    pushCommand.prototype.functionality = function() {
      var msg, name, r, user;
      msg = this.msgData.message;
      if (msg.length > this.command.length + 2) {
        name = msg.substr(this.command.length + 2);
        r = new RoomHelper();
        user = r.lookupUser(name);
        if (user !== false) {
          return API.moderateAddDJ(user.id);
        }
      }
    };

    return pushCommand;

  })(Command);

  resetAfkCommand = (function(_super) {

    __extends(resetAfkCommand, _super);

    function resetAfkCommand() {
      return resetAfkCommand.__super__.constructor.apply(this, arguments);
    }

    resetAfkCommand.prototype.init = function() {
      this.command = '/resetafk';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    resetAfkCommand.prototype.functionality = function() {
      var id, name, u, _ref;
      if (this.msgData.message.length > 10) {
        name = this.msgData.message.substring(11);
        _ref = data.users;
        for (id in _ref) {
          u = _ref[id];
          if (u.getUser().username === name) {
            u.updateActivity();
            API.sendChat('@' + u.getUser().username + '\'s AFK time has been reset.');
            return;
          }
        }
        API.sendChat('Not sure who ' + name + ' is');
      } else {
        API.sendChat('Yo Gimme a name r-tard');
      }
    };

    return resetAfkCommand;

  })(Command);

  forceSkipCommand = (function(_super) {

    __extends(forceSkipCommand, _super);

    function forceSkipCommand() {
      return forceSkipCommand.__super__.constructor.apply(this, arguments);
    }

    forceSkipCommand.prototype.init = function() {
      this.command = '/forceskip';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    forceSkipCommand.prototype.functionality = function() {
      var msg, param;
      msg = this.msgData.message;
      if (msg.length > 11) {
        param = msg.substr(11);
        if (param === 'enable') {
          data.forceSkip = true;
          return API.sendChat("Forced skipping enabled.");
        } else if (param === 'disable') {
          data.forceSkip = false;
          return API.sendChat("Forced skipping disabled.");
        }
      }
    };

    return forceSkipCommand;
	
})(Command);

  contactCommand = (function(_super) {

    __extends(contactCommand, _super);

    function contactCommand() {
      return contactCommand.__super__.constructor.apply(this, arguments);
    }

    contactCommand.prototype.init = function() {
      this.command = '/contact';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    contactCommand.prototype.functionality = function() {
      var msg;
      msg = " DropboxLuminant@Gmail.com";
      return API.sendChat(msg);
    };

    return contactCommand;

  })(Command);

  youtubeCommand = (function(_super) {

    __extends(youtubeCommand, _super);

    function youtubeCommand() {
      return youtubeCommand.__super__.constructor.apply(this, arguments);
    }

    youtubeCommand.prototype.init = function() {
      this.command = '/youtube';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    youtubeCommand.prototype.functionality = function() {
      var m, msg;
      m = Math.floor(Math.random() * this.msgs.length);
      msg = this.msgs[m].replace('{youtube}', 'http://www.youtube.com/user/LuminantNetwork');
      return API.sendChat(msg);
    };

    youtubeCommand.prototype.msgs = ["Subscribe! {youtube}", "Subscribe to us! {youtube} !", "Here's our Youtube channel: {youtube} you should subscribe.", " Subscribe 

if you want a daily dose of delicious EDM! {youtube}", "Check out Luminant Network on youtube! {youtube}", "New uploads daily! {youtube}"];

    return youtubeCommand;
	
	})(Command);

  skypeCommand = (function(_super) {

    __extends(skypeCommand, _super);

    function skypeCommand() {
      return skypeCommand.__super__.constructor.apply(this, arguments);
    }

    skypeCommand.prototype.init = function() {
      this.command = '/skype';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    skypeCommand.prototype.functionality = function() {
      var msg;
      msg = " moky_24 ... add me if you want ;)   ";
      return API.sendChat(msg);
    };

    return skypeCommand;
	
	})(Command);

  submitCommand = (function(_super) {

    __extends(submitCommand, _super);

    function submitCommand() {
      return submitCommand.__super__.constructor.apply(this, arguments);
    }

    submitCommand.prototype.init = function() {
      this.command = '/submit';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    submitCommand.prototype.functionality = function() {
      var msg;
      msg = " Submit your track! http://bit.ly/12Jetlc ";
      return API.sendChat(msg);
    };

    return submitCommand;
	
	})(Command);

  scriptCommand = (function(_super) {

    __extends(scriptCommand, _super);

    function scriptCommand() {
      return scriptCommand.__super__.constructor.apply(this, arguments);
    }

    scriptCommand.prototype.init = function() {
      this.command = '/script';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    scriptCommand.prototype.functionality = function() {
      var msg;
      msg = "Download Luminant script! Custom backround and more! ";
	  msg += "http://userscripts.org/scripts/show/161092";
      return API.sendChat(msg);
    };

    return scriptCommand;

  })(Command);

  skipCommand = (function(_super) {

    __extends(skipCommand, _super);

    function skipCommand() {
      return skipCommand.__super__.constructor.apply(this, arguments);
    }

    skipCommand.prototype.init = function() {
      this.command = '/skip';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    skipCommand.prototype.functionality = function() {
      return API.moderateForceSkip();
    };

    return skipCommand;
	
	  })(Command);

  lockskipCommand = (function(_super) {

    __extends(lockskipCommand, _super);

    function lockskipCommand() {
      return lockskipCommand.__super__.constructor.apply(this, arguments);
    }

    lockskipCommand.prototype.init = function() {
      this.command = '/lockskip';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'bouncer';
    };

    lockskipCommand.prototype.functionality = function() {
      return data.lockBooth(function() {
        return setTimeout(function() {}, API.moderateForceSkip(), setTimeout(function() {
          return data.unlockBooth();
        }, 5000), 5000);
      });
    };

    return lockskipCommand;
	
})(Command);

  strobesCommand = (function(_super) {

    __extends(strobesCommand, _super);

    function strobesCommand() {
      return strobesCommand.__super__.constructor.apply(this, arguments);
    }

    strobesCommand.prototype.init = function() {
      this.command = '/strobes';
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    strobesCommand.prototype.functionality = function() {
      var msg1, msg2;
      msg1 = " Want strobe lights? Download Luminant script! ";
	  msg2 = "/script";
      API.sendChat(msg1);
      return setTimeout((function() {
        return API.sendChat(msg2);
      }), 750);
    };

    return strobesCommand;
	
	})(Command);

  commandsCommand = (function(_super) {

    __extends(commandsCommand, _super);

    function commandsCommand() {
      return commandsCommand.__super__.constructor.apply(this, arguments);
    }

    commandsCommand.prototype.init = function() {
      this.command = ['/commands', '/help'];
      this.parseType = 'exact';
      return this.rankPrivelege = 'user';
    };

    commandsCommand.prototype.functionality = function() {
      var allowedUserLevels, c, cc, cmd, msg, user, _i, _j, _len, _len1, _ref, _ref1;
      allowedUserLevels = [];
      user = API.getUser(this.msgData.fromID);
      if (user.owner) {
        allowedUserLevels = ['user', 'mod', 'host'];
      } else if (user.moderator) {
        allowedUserLevels = ['user', 'mod'];
      } else {
        allowedUserLevels = ['user'];
      }
      msg = '';
      for (_i = 0, _len = cmds.length; _i < _len; _i++) {
        cmd = cmds[_i];
        c = new cmd('');
        if (_ref = c.rankPrivelege, __indexOf.call(allowedUserLevels, _ref) >= 0) {
          if (typeof c.command === "string") {
            msg += c.command + ', ';
          } else if (typeof c.command === "object") {
            _ref1 = c.command;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              cc = _ref1[_j];
              msg += cc + ', ';
            }
          }
        }
      }
      msg = msg.substring(0, msg.length - 2);
      return API.sendChat(msg);
    };

    return commandsCommand;

  })(Command);

  disconnectLookupCommand = (function(_super) {

    __extends(disconnectLookupCommand, _super);

    function disconnectLookupCommand() {
      return disconnectLookupCommand.__super__.constructor.apply(this, arguments);
    }

    disconnectLookupCommand.prototype.init = function() {
      this.command = '/dclookup';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    disconnectLookupCommand.prototype.functionality = function() {
      var cmd, dcHour, dcLookupId, dcMeridian, dcMins, dcSongsAgo, dcTimeStr, dcUser, disconnectInstances, givenName, id, recentDisconnect, resp, u, _i, _len, _ref, 

_ref1;
      cmd = this.msgData.message;
      if (cmd.length > 11) {
        givenName = cmd.slice(11);
        _ref = data.users;
        for (id in _ref) {
          u = _ref[id];
          if (u.getUser().username === givenName) {
            dcLookupId = id;
            disconnectInstances = [];
            _ref1 = data.userDisconnectLog;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              dcUser = _ref1[_i];
              if (dcUser.id === dcLookupId) {
                disconnectInstances.push(dcUser);
              }
            }
            if (disconnectInstances.length > 0) {
              resp = u.getUser().username + ' has disconnected ' + disconnectInstances.length.toString() + ' time';
              if (disconnectInstances.length === 1) {
                resp += '. ';
              } else {
                resp += 's. ';
              }
              recentDisconnect = disconnectInstances.pop();
              dcHour = recentDisconnect.time.getHours();
              dcMins = recentDisconnect.time.getMinutes();
              if (dcMins < 10) {
                dcMins = '0' + dcMins.toString();
              }
              dcMeridian = dcHour % 12 === dcHour ? 'AM' : 'PM';
              dcTimeStr = '' + dcHour + ':' + dcMins + ' ' + dcMeridian;
              dcSongsAgo = data.songCount - recentDisconnect.songCount;
              resp += 'Their most recent disconnect was at ' + dcTimeStr + ' (' + dcSongsAgo + ' songs ago). ';
              if (recentDisconnect.waitlistPosition !== void 0) {
                resp += 'They were ' + recentDisconnect.waitlistPosition + ' song';
                if (recentDisconnect.waitlistPosition > 1) {
                  resp += 's';
                }
                resp += ' away from the DJ booth.';
              } else {
                resp += 'They were not on the waitlist.';
              }
              API.sendChat(resp);
              return;
            } else {
              API.sendChat("I haven't seen " + u.getUser().username + " disconnect.");
              return;
            }
          }
        }
        return API.sendChat("I don't see a user in the room named '" + givenName + "'.");
      }
    };

    return disconnectLookupCommand;

  })(Command);

  voteRatioCommand = (function(_super) {

    __extends(voteRatioCommand, _super);

    function voteRatioCommand() {
      return voteRatioCommand.__super__.constructor.apply(this, arguments);
    }

    voteRatioCommand.prototype.init = function() {
      this.command = '/voteratio';
      this.parseType = 'startsWith';
      return this.rankPrivelege = 'mod';
    };

    voteRatioCommand.prototype.functionality = function() {
      var msg, name, r, u, votes;
      r = new RoomHelper();
      msg = this.msgData.message;
      if (msg.length > 12) {
        name = msg.substr(12);
        u = r.lookupUser(name);
        if (u !== false) {
          votes = r.userVoteRatio(u);
          msg = u.username + " has wooted " + votes['woot'].toString() + " time";
          if (votes['woot'] === 1) {
            msg += ', ';
          } else {
            msg += 's, ';
          }
          msg += "and meh'd " + votes['meh'].toString() + " time";
          if (votes['meh'] === 1) {
            msg += '. ';
          } else {
            msg += 's. ';
          }
          msg += "Their woot:vote ratio is " + votes['positiveRatio'].toString() + ".";
          return API.sendChat(msg);
        } else {
          return API.sendChat("I don't recognize a user named '" + name + "'");
        }
      } else {
        return API.sendChat("I'm not sure what you want from me...");
      }
    };

    return voteRatioCommand;

  })(Command);

  avgVoteRatioCommand = (function(_super) {

    __extends(avgVoteRatioCommand, _super);

    function avgVoteRatioCommand() {
      return avgVoteRatioCommand.__super__.constructor.apply(this, arguments);
    }

    avgVoteRatioCommand.prototype.init = function() {
      this.command = '/avgvoteratio';
      this.parseType = 'exact';
      return this.rankPrivelege = 'mod';
    };

    avgVoteRatioCommand.prototype.functionality = function() {
      var averageRatio, msg, r, ratio, roomRatios, uid, user, userRatio, votes, _i, _len, _ref;
      roomRatios = [];
      r = new RoomHelper();
      _ref = data.voteLog;
      for (uid in _ref) {
        votes = _ref[uid];
        user = data.users[uid].getUser();
        userRatio = r.userVoteRatio(user);
        roomRatios.push(userRatio['positiveRatio']);
      }
      averageRatio = 0.0;
      for (_i = 0, _len = roomRatios.length; _i < _len; _i++) {
        ratio = roomRatios[_i];
        averageRatio += ratio;
      }
      averageRatio = averageRatio / roomRatios.length;
      msg = "Accounting for " + roomRatios.length.toString() + " user ratios, the average room ratio is " + averageRatio.toFixed(2).toString() + ".";
      return API.sendChat(msg);
    };

    return avgVoteRatioCommand;

  })(Command);

  cmds = [hugCommand, churrosCommand, cookieCommand, punishCommand, newSongsCommand, themeCommand, rulesCommand, roomHelpCommand, sourceCommand, staffCommand, 

wootCommand, badQualityCommand, afksCommand, allAfksCommand, statusCommand, unhookCommand, dieCommand, reloadCommand, lockCommand, unlockCommand, swapCommand, 

popCommand, pushCommand, skipCommand, strobesCommand, commandsCommand, resetAfkCommand, forceSkipCommand, contactCommand, youtubeCommand,  skypeCommand, submitCommand, 

scriptCommand, cmdHelpCommand, protectCommand, disconnectLookupCommand, voteRatioCommand, avgVoteRatioCommand];

  chatCommandDispatcher = function(chat) {
    var c, cmd, _i, _len, _results;
    chatUniversals(chat);
    _results = [];
    for (_i = 0, _len = cmds.length; _i < _len; _i++) {
      cmd = cmds[_i];
      c = new cmd(chat);
      if (c.evalMsg()) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  updateVotes = function(obj) {
    data.currentwoots = obj.positive;
    data.currentmehs = obj.negative;
    return data.currentcurates = obj.curates;
  };

  announceCurate = function(obj) {
    return API.sendChat("/em: " + obj.user.username + " gostou tanto dessa música que quer enfiá-la no cu de tão delícia que é!");
  };

  handleUserJoin = function(user) {
    data.userJoin(user);
    data.users[user.id].updateActivity();
    return API.sendChat("/em: @" + user.username + " Bem vindo, anon.");
  };

  handleNewSong = function(obj) {
    var songId;
    data.intervalMessages();
    if (data.currentsong === null) {
      data.newSong();
    } else {
      API.sendChat("/em: Tocou: '" + data.currentsong.title + " - " + data.currentsong.author + "'. Rate dos anons: :+1: " + data.currentwoots + ", :-1: " + 

data.currentmehs + ", :heart: " + data.currentcurates + ".");
      data.newSong();
      document.getElementById("button-vote-positive").click();
    }
    if (data.forceSkip) {
      songId = obj.media.id;
      return setTimeout(function() {
        var cMedia;
        cMedia = API.getMedia();
        if (cMedia.id === songId) {
          return API.moderateForceSkip();
        }
      }, obj.media.duration * 1000);
    }
  };

  handleVote = function(obj) {
    data.users[obj.user.id].updateActivity();
    return data.users[obj.user.id].updateVote(obj.vote);
  };

  handleUserLeave = function(user) {
    var disconnectStats, i, u, _i, _len, _ref;
    disconnectStats = {
      id: user.id,
      time: new Date(),
      songCount: data.songCount
    };
    i = 0;
    _ref = data.internalWaitlist;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      u = _ref[_i];
      if (u.id === user.id) {
        disconnectStats['waitlistPosition'] = i - 1;
        data.setInternalWaitlist();
        break;
      } else {
        i++;
      }
    }
    data.userDisconnectLog.push(disconnectStats);
    return data.users[user.id].inRoom(false);
  };

  antispam = function(chat) {
    var plugRoomLinkPatt, sender;
    plugRoomLinkPatt = /(\bhttps?:\/\/(www.)?plug\.dj[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    if (plugRoomLinkPatt.exec(chat.message)) {
      sender = API.getUser(chat.fromID);
      if (!sender.ambassador && !sender.moderator && !sender.owner && !sender.superuser) {
        if (!data.users[chat.fromID]["protected"]) {
          API.sendChat("Don't spam room links you ass clown");
          return API.moderateDeleteChat(chat.chatID);
        } else {
          return API.sendChat("I'm supposed to kick you, but you're just too darn pretty.");
        }
      }
    }
  };

  beggar = function(chat) {
    var msg, r, responses, sender;
    msg = chat.message.toLowerCase();
    responses = ["Good idea @{beggar}!", "Guys @{beggar} asked us to fan him!  Lets all totally do it! ಠ_ಠ", "srsly @{beggar}? ಠ_ಠ", "NO! @{beggar} ಠ_ಠ"];
    r = Math.floor(Math.random() * responses.length);
	sender = API.getUser(chat.fromID);
    if (msg.indexOf('fan me') !== -1 || msg.indexOf('fan for fan') !== -1 || msg.indexOf('fan pls') !== -1 || msg.indexOf('fans pls') !== -1 || msg.indexOf('fan4fan') 

!== -1 || msg.indexOf('add me to fan') !== -1)  {
      API.sendChat(responses[r].replace("{beggar}", chat.from));
    }
		{
		return API.moderateDeleteChat(chat.chatID);
	} 
  };

  chatUniversals = function(chat) {
    data.activity(chat);
    antispam(chat);
    return beggar(chat);
  };

  foulLanguage = function(chat) {
    var msg, r, responses;
    msg = chat.message.toLowerCase();
    responses = ["Please do not use foul language here @{foulLanguage}", "@{foulLanguage} Please do not use bad language here."];
    r = Math.floor(Math.random() * responses.length);
    if (msg.indexOf('fuck') !== -1 || msg.indexOf('fucking') !== -1 || msg.indexOf('suck') !== -1 || msg.indexOf('bitch') !== -1 || msg.indexOf('cunt') !== -1 || 

msg.indexOf('dick') !== -1)  {
      return API.sendChat(responses[r].replace("{foulLanguage}", chat.from));
    }
  };

  chatUniversals = function(chat) {
    data.activity(chat);
    antispam(chat);
    return foulLanguage(chat);
  };

  hook = function(apiEvent, callback) {
    return API.addEventListener(apiEvent, callback);
  };

  unhook = function(apiEvent, callback) {
    return API.removeEventListener(apiEvent, callback);
  };

  apiHooks = [
    {
      'event': API.ROOM_SCORE_UPDATE,
      'callback': updateVotes
    }, {
      'event': API.CURATE_UPDATE,
      'callback': announceCurate
    }, {
      'event': API.USER_JOIN,
      'callback': handleUserJoin
    }, {
      'event': API.DJ_ADVANCE,
      'callback': handleNewSong
    }, {
      'event': API.VOTE_UPDATE,
      'callback': handleVote
    }, {
      'event': API.CHAT,
      'callback': chatCommandDispatcher
    }, {
      'event': API.USER_LEAVE,
      'callback': handleUserLeave
    }
  ];

  initHooks = function() {
    var pair, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = apiHooks.length; _i < _len; _i++) {
      pair = apiHooks[_i];
      _results.push(hook(pair['event'], pair['callback']));
    }
    return _results;
  };

  undoHooks = function() {
    var pair, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = apiHooks.length; _i < _len; _i++) {
      pair = apiHooks[_i];
      _results.push(unhook(pair['event'], pair['callback']));
    }
    return _results;
  };

  initialize();

}).call(this);
// ==/UserScript==