// ==UserScript==
// @name TwitchChatCleanser
// @version 0.0.2
// @description Cleans up the Twitch.TV chat by not showing any messages containing 2 or more non-ASCII characters (configurable), messages matching the configurable regular expressions or messages consisting only of (or excessive) emoticons.
// @author morkai
// @include http://www.twitch.tv/*
// @include http://*.twitch.tv/*
// @exclude http://www.twitch.tv/*/popout
// @exclude http://www.twitch.tv/
// @exclude http://www.twitch.tv/directory/*
// ==/UserScript==

function twitchChatCleanser()
{
  if (self !== top)
  {
    return;
  }

  // Do not display a message if it contains the specified (or more) number
  // of non-ASCII characters.
  var MAX_NON_ASCII_CHARS = 2;
  
  // Do not display a message if it contains the specified (or more) number
  // of emoticons.
  var MAX_EMOTICONS = 4;

  // Messages matching one of the following regular expressions will not be
  // shown in the chat.
  var FILTERS = [
    /but at what cost/i,
    /\=.*?no\s*(sp|f)ace/i,
    /smotriall\.com/i,
    /^DDOS$/i
  ];

  var STRIP_TAGS_RE = /<(?:.|\n)*?>/gm;
  var EMOTICON_RE = /"emo\-[0-9]+ emoticon"/g;
  var EMPTY_MESSAGE_PATTERN = 'chat_line"></';

  function isDirtyText(text)
  {
    for (var i = 0, l = FILTERS.length; i < l; ++i)
    {
      if (FILTERS[i].test(text))
      {
        return true;
      }
    }

    var dirtyChars = 0;
    
    for (var i = 0, l = text.length; i < l; ++i)
    {
      if (text.charCodeAt(i) > 127)
      {
        ++dirtyChars;
        
        if (dirtyChars >= MAX_NON_ASCII_CHARS)
        {
          return true;
        }
      }
    }
    
    return false;
  }

  jQuery(function()
  {
    var insert_chat_line = Chat.prototype.insert_chat_line;
    var insert_with_lock = Chat.prototype.insert_with_lock;
    var format_message = Chat.prototype.format_message;

    Chat.prototype.insert_chat_line = function(a)
    {
      if (a.subscriber || a.tagtype === 'mod' || !isDirtyText(a.message))
      {
        insert_chat_line.call(this, a);
      }
    };

    Chat.prototype.format_message = function()
    {
      var text = format_message.apply(this, arguments);
      var textWoHtml = text.replace(STRIP_TAGS_RE, '').trim();

      if (textWoHtml.length <= 1)
      {
        return '';
      }
      
      var emoMatches = text.match(EMOTICON_RE);
      
      if (emoMatches && emoMatches.length >= MAX_EMOTICONS)
      {
        return '';
      }

      return text;
    };

    Chat.prototype.insert_with_lock = function(a, line, c, b)
    {
      if (line.lastIndexOf(EMPTY_MESSAGE_PATTERN) === -1)
      {
        insert_with_lock.apply(this, arguments);
      }
    };
  });
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(twitchChatCleanser);