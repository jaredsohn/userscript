// ==UserScript==
// @name          User Rollover
// @author        Kaedenn (http://kaedenn.net/userscripts/)
// @include       http://www.kongregate.com/games/*
// @description   Created by Kaedenn. If you move your mouse over a user's name in chat, you will see a little pop-up box with their level, the game they're playing, when they sent that message, and other information
// ==/UserScript==

function MessageRollover(dialogue) {
  this._initialize(dialogue);
}

MessageRollover.TOP_NUDGE  = -8;
MessageRollover.LEFT_NUDGE = 22 + 16;

MessageRollover._Class     = {
  Rollover:     "user_rollover",
  Container:    "user_rollover_container",
  Inner:        "user_rollover_inner",
  PMLink:       "rollover_message_private_message_link",
  TMLink:       "rollover_message_trollmute_link",
  PMLinkHolder: "rollover_message_private_message_link_message_link_holder",
  GLinkHolder:  "rollover_game_link_holder",
  GLink:        "rollover_game_link"
};

MessageRollover._ID        = {
  Template:     "message_rollover_template",
  PMLink:       "rollover_message_private_message_link",
  TMLink:       "rollover_message_trollmute_link",
  TimeText:     "rollover_time_text",
  LevelText:    "rollover_level_text",
  GLink:        "rollover_game_link"
};

MessageRollover.prototype  = {
  _initialize: function(dialogue) {
    this._dialogue = dialogue;
    this._kae      = dialogue._kae;
    
    var Element  = this._kae.Element;
    var Template = this._kae.Template;
    var Class    = MessageRollover._Class;
    var ID       = MessageRollover._ID;
    
    this._template          = Element("div", {"id":    ID.Template,
                                              "class": Class.Container,
                                              "style": "display: none"});
    this._rollover          = Element("div", {"class": Class.Rollover});
    this._rollover_inner    = Element("div", {"class": Class.Inner});
    this._time_container    = Element("p", {"id": ID.TimeText});
    this._level_container   = Element("p", {"id": ID.LevelText});
    this._game_container    = Element("p", {"class": Class.GLinkHolder});
    this._whisper_container = Element("p", {"class": Class.PMLinkHolder});
    this._whisper_link      = Element("a", {"id":    ID.PMLink,
                                            "class": Class.PMLink,
                                            "href":  "#"});
    this._trollmute_container = Element("p", {"class": Class.PMLinkHolder});
    this._trollmute_link      = Element("a", {"id":    ID.TMLink,
                                              "class": Class.PMLink,
                                              "href":  "#"});
    this._whisper_link.update("Whisper");
    this._whisper_container.update(this._whisper_link);
    this._trollmute_link.update("Hide and Mute");
    this._trollmute_container.update(this._trollmute_link);
    this._rollover_inner.appendChild(this._time_container);
    this._rollover_inner.appendChild(this._level_container);
    this._rollover_inner.appendChild(this._game_container);
    this._rollover_inner.appendChild(this._whisper_container);
    this._rollover_inner.appendChild(this._trollmute_container);
    this._rollover.update(this._rollover_inner);
    this._template.update(this._rollover);
    
    $("chat_tab_pane").appendChild(this._template);
    
    this._whisper_observer   = function(event) { event.stop(); return false; };
    this._trollmute_observer = function(event) { event.stop(); return false; };
    
    var self = this;
    this._template.observe(Event.Mouse.Over, function(event) {
      self._stop_hide();
      event.stop();
    });
    this._template.observe(Event.Mouse.Out, function(event) {
      self.beginHide();
      event.stop();
    });
  },
  show: function(time, level, game_name, game_url, user, event) {
    if (this._hide_timer) this._stop_hide();
    this._set_time_text(time);
    this._start_time_text_timer(time);
    this._level_container.update(parseInt(level) ? ("Level " + level) : "");
    this._game_container.update(this._make_game_link(game_name, game_url));
    this._set_whisper_link(user);
    this._set_trollmute_link(user);
    this._set_position(event);
    this._template.show();
    this._template.style.opacity = 1;
  },
  beginHide: function() {
    if (this._hide_timer) { this._stop_hide(); }
    this._hide_timer = setInterval(function(self) { self._hide(); }, 5, this);
  },
  _make_game_link: function(game_name, game_url) {
    game_name = Utilities.decode(game_name, Encoding.HTML);
    return this._kae.Element("a", {"id":    MessageRollover._ID.GLink,
                                   "class": MessageRollover._Class.GLink,
                                   "href":  game_url}).update(game_name);
  },
  _hide: function() {
    if (this._template.style.opacity > 0) {
      this._template.style.opacity -= 0.10;
    } else {
      this._template.hide();
      clearInterval(this._hide_timer);
      clearInterval(this._timestamp_timer);
      this._hide_timer      = null;
      this._timestamp_timer = null;
    }
  },
  _stop_hide: function() {
    clearInterval(this._hide_timer);
    this._hide_timer = null;
    this._template.style.opacity = 1;
  },
  _start_time_text_timer: function(time) {
    if (this._timestamp_timer) {
      clearInterval(this._timestamp_timer);
      this._timestamp_timer = null;
    }
    this._timestamp_timer = setInterval(function(self) {
      self._set_time_text(time);
    }, 1000, this);
  },
  _set_time_text: function(time) {
    var abs = Utilities.strftime(time, "%I:%M:%S");
    var rel = Utilities.strftime(new Date() - new Date(time), "[%M:%S]");
    this._time_container.update(abs + "&nbsp;" + rel);
  },
  _set_whisper_link: function(user) {
    var cw = this._dialogue._user_manager;
    this._whisper_link.stopObserving(Event.Mouse.Click);
    if (this._kae.isBot(user)) {
      this._whisper_container.hide();
    } else {
      this._whisper_container.show();
      this._whisper_observer = unsafeWindow
          .CapturesToInlineRegistration.decorate(function(event) {
        cw.insertPrivateMessagePrefixFor(user);
        event.stop();
        return false;
      });
      this._whisper_link.observe(Event.Mouse.Click, this._whisper_observer);
    }
  },
  _set_trollmute_link: function(user) {
    var kae = this._kae;
    if (user == kae._username || kae.isBot(user)) {
      this._trollmute_container.hide();
    } else {
      this._trollmute_container.show();
    }
    this._trollmute_link.stopObserving(Event.Mouse.Click);
    this._trollmute_observer = function(event) {
      kae._commands.call("trollmute", user);
      event.stop();
      return false;
    };
    this._trollmute_link.observe(Event.Mouse.Click, this._trollmute_observer);
  },
  _set_position: function(event) {
    var node        = event.target;
    var current_top = this._dialogue._message_window_node.scrollTop;
    var top         = node.positionedOffset()[1];
    var left        = node.getWidth() + MessageRollover.LEFT_NUDGE;
    if (current_top < top) {
      top -= current_top;
    }
    top += MessageRollover.TOP_NUDGE;
    this._template.setStyle({"top": top + "px", "left": left + "px"});
  }
};

