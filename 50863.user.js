// ==UserScript==
// @name           Tufer: Urlizer and Simple Line Highlighter
// @namespace      http://www.kongregate.com
// @description    Makes URL links clickable in Kongregate's chat and highlights lines containing your full username.
// @include        http://*kongregate.com/games*
// @copyright      A veritable mish-mash of copyrights: Nabb, TheBarge, McKain
// ==/UserScript==

/*
  The reason for this is simple, really. I wanted clickable links and I wanted
  a simple line highlighter. Now I can have both! And you can too!

  The expanded script, sorta. Taken, and doctored, from www.strfriend.com
  ((?#Protocol)((?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?
  (?#Authentication)([\w]+:\w+@)?
  (?#Domain)(?:((?:[-\w\.])+)(?:\.))+([\w]{2,5})
  (?#Port)(?::([\d]{1,5}))?
  (?#Path)((?:\/?(?:\w+\/?)*)?
  (?#Extention)(?:\.[\w]{3,4})?)?
  (?#Query)(?:\?((?:&?[-\w]+(?:=[-\w]+)?)+)*)?
  (?#Anchor)(?:#([-\w]+))?)

  Simplified, no longer pseudo validator:
  ((?#Protocol)((?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?
  (?#Authentication)([\w]+:\w+@)?
  (?#Domain)(?:((?:[-\w]\.?)+)(?:\.))+([\w]{2,7})
  (?#Port)(?::([\d]{1,5}))?(?#Path)([^?#\s]+)?
  (?#Query)(?:\?([^#\s]+)?)?
  (?#Anchor)(?:#([^\s]+)?)?)
*/

function init(){
  if(this.holodeck && this.ChatRoom){
    this.ChatRoom.prototype.receivedMessage = function(event) {
        var message = this._chat_dialogue.sanitizeIncomingMessage(event.data.message);
        var pat = /((?#Protocol)((?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?#Authentication)([\w]+:\w+@)?(?#Domain)(?:((?:[-\w]\.?)+)(?:\.))+([\w]{2,7})(?#Port)(?::([\d]{1,5}))?(?#Path)([^?#\s]+)?(?#Query)(?:\?([^#\s]+)?)?(?#Anchor)(?:#([^\s]+)?)?)/gi;
        message = message.replace(pat, "<a target=\"_new\" href=\"$1\">$1</a> ");
        this._chat_dialogue.displayUnsanitizedMessage(
            event.data.user.username, message,
            (message.toLowerCase().search(
                this.username().toLowerCase()) < 0) ? "{}" : {'class':'toMe'}
        );
    };
    x=document.styleSheets[1];
    x.insertRule('#kong_game_ui .chat_message_window .toMe{background-color:#d5fec2;}', x.cssRules.length);
  };
};

setTimeout(init, 0);
