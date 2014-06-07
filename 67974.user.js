// ==UserScript==
// @name           PM Logger
// @author         Kaedenn (http://kaedenn.net/userscripts/)
// @include        http://www.kongregate.com/games/*
// @description    The commands config and about open a new tab, which contains a list of all whispers you've received recently. The list is cleared when you move to a different chat room
// ==/UserScript==

function Logger(kae) {
  this._initialize(kae);
}

Logger.JOIN      = "Join";
Logger.PART      = "Part";
Logger.MESSAGE   = "Message";
Logger.WHISPER   = "Whisper";
Logger.HIGHLIGHT = "Highlight";

Logger.prototype = {
  _initialize: function(kae) {
    this._kae = kae;
    this._log = new Array();
    this._push = function(dict, key, value) {
      if (dict[key]) {
        dict[key].unshift(value);
      } else {
        dict[key] = [value];
      }
    };
    this.spam_override = false;
  },
  log_join: function(nick) {
    this._log.unshift([nick, Logger.JOIN, new Date()]);
  },
  log_part: function(nick) {
    this._log.unshift([nick, Logger.PART, new Date()]);
  },
  log_whisper: function(nick, message) {
    this._log.unshift([nick, Logger.WHISPER, message, new Date()]);
  },
  log_message: function(nick, message) {
    this._log.unshift([nick, Logger.MESSAGE, message, new Date()]);
  },
  log_highlight: function(nick, message) {
    this._log.unshift([nick, Logger.HIGHLIGHT, message, new Date()]);
  },
  spam_count: function(nick) {
    if (this.spam_override) return 0;
    var message = null;
    var count = 0;
    for (var i = 0; i < this._log.length; ++i) {
      if (this._log[i][0] == nick) {
        if (message == null) {
          message = this._log[i][2];
          count = 1;
        } else if (message == this._log[i][2]) {
          count += 1;
        } else {
          break;
        }
      }
    }
    return count;
  },
  get_join_part_log: function(nick) {
    var result = new Array();
    var cmp = function(n1, n2) {
      if (typeof(n1) == "undefined") return true;
      else return n1 == n2;
    };
    for (var i = 0; i < this._log.length; ++i) {
      if (cmp(nick, this._log[i][0])) {
        if (this._log[i][1] == Logger.JOIN || this._log[i][1] == Logger.PART) {
          result.push(this._log[i]);
        }
      }
    }
    return result;
  },
  get_whisper_log: function(nick) {
    var result = new Array();
    var cmp = function(n1, n2) {
      if (typeof(n1) == "undefined") return true;
      else return n1 == n2;
    };
    for (var i = 0; i < this._log.length; ++i) {
      if (cmp(nick, this._log[i][0]) && this._log[i][1] == Logger.WHISPER) {
        result.push(this._log[i]);
      }
    }
    return result;
  },
  get_message_log: function(nick) {
    var result = new Array();
    var cmp = function(n1, n2) {
      if (typeof(n1) == "undefined") return true;
      else return n1 == n2;
    };
    for (var i = 0; i < this._log.length; ++i) {
      if (cmp(nick, this._log[i][0]) && this._log[i][1] == Logger.MESSAGE) {
        result.push(this._log[i]);
      }
    }
    return result;
  },
  get_highlight_log: function(nick) {
    var result = new Array();
    var cmp = function(n1, n2) {
      if (typeof(n1) == "undefined") return true;
      else return n1 == n2;
    };
    for (var i = 0; i < this._log.length; ++i) {
      if (cmp(nick, this._log[i][0]) && this._log[i][1] == Logger.HIGHLIGHT) {
        result.push(this._log[i]);
      }
    }
    return result;
  }
};

