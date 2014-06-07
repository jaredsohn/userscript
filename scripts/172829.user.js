// ==UserScript==
// @name           Facebook Batch Sender
// @author         Witiko
// @include        http*://www.facebook.com*
// @version        1.00
// ==/UserScript==

/*

  Input: <Message/Command1><Message/Command2> ... <Message/CommandN>

  Commands:
    Responding to actions:
        (seen) - Wait until the previous message has been marked as seen
     (replied) - Wait until the recipient has replied to you
      (typing) - Wait until the recipient has started typing to you
     (typing!) - Wait until the recipient has started typing to you / replied
         (any) - Wait until the recipient has started typing to you / replied / seen the previous message

    Responding to states:
      (online) - Wait until the recipient has gone online
     (!online) - Wait until the recipient is no longer online
      (mobile) - Wait until the recipient has gone mobile
     (!mobile) - Wait until the recipient is no longer mobile
     (offline) - Wait until the recipient has gone offline
    (!offline) - Wait until the recipient is no longer offline

    Miscellaneous:
           (!) - Redirect all following messages to console.log
        (beep) - Let out a beeping sound (html5.audioContext dependent)
 (<#1><unit1> <#2><unit2> ...
  <#N><unitN>) - Wait <#> <unit>s, valid ones being:
             Y - Years
             M - Months
             d - Days
             h - Hours
             m - Minutes
             s - Seconds
            ms - Milliseconds
    
*/

if(top != this) return;
var commands = /(\(!\)|\((?:\d+(?:Y|M|d|h|ms|m|s)\s?)+\)|\(seen\)|\(typing!?\)|\(any\)|\(beep\)|\(replied\)|\(!?(?:(?:on|off)line|mobile)\))/,
    units = /(Y|M|d|h|ms|m|s)/,
    unitValues = {
       "Y": 31556925994,
       "M": 2629743831,
       "d": 86400000,
       "h": 3600000,
       "m": 60000,
       "s": 1000,
      "ms": 1
    }, ctx = new (window.audioContext || window.webkitAudioContext);

(function() { // Building a GUI
  var input = document.createElement("div"), highlighter, DEFAULT_TEXT = "(!)", hidden = true;
  if(!localStorage.curr) {
    localStorage.curr = localStorage.max = 0;
    localStorage[0] = DEFAULT_TEXT;
  } input.innerText = localStorage[localStorage.curr];
  with(input) {
    contentEditable = true;
    with(style) {
      display = "none";
      fontSize = "16px";
      width = "100%";
      position = "fixed";
      bottom = "0px";
      left = "0px";
      outline = "none";
      backgroundColor = "rgba(255, 255, 255, .75)";
      margin = "0px";
      padding = "5px";
      zIndex = "999";
      borderTop = "1px solid rgba(0, 0, 0, .4)";
    }
  } with(highlighter = input.cloneNode(false)) {
    contentEditable = false;
    with(style) {
      border = "0";
      color = backgroundColor = "transparent";
      zIndex = "998";
    }
  } onkeydown = function(e) { // Display / Hide the console via Ctrl+~
    if(e.keyCode === 186 && e.ctrlKey) {
      input.style.display =
      highlighter.style.display = (hidden = !hidden)?"none":"block";
      input.focus();
    }
  }; input.onkeydown = function(e) {
    if(e.keyCode === 13 && !e.shiftKey) return false;
  };
  input.onkeyup = function(e) {
    if(e.keyCode === 13 && !e.shiftKey) { // Process the queue
      console.log(input.innerText);
      execute(input.innerText.split(commands), false);
      localStorage[localStorage.curr = ++localStorage.max] =
      input.innerText = highlighter.innerText = DEFAULT_TEXT;
    } else {
      if(e.keyCode === 38) { // Up
        if(localStorage.curr > 0) {
          input.innerText = localStorage[--localStorage.curr];
          while(localStorage.max !== localStorage.curr) { // Autoremoval of redundant tail entries
            if(localStorage[localStorage.max] === DEFAULT_TEXT) {
              localStorage.removeItem(localStorage.max--);
            } else break;
          }
        }
      } else if(e.keyCode == 40) { // Down
        if(localStorage.curr < localStorage.max || localStorage[localStorage.curr] !== DEFAULT_TEXT) {
          if(++localStorage.curr > localStorage.max) {
            localStorage[localStorage.curr] = DEFAULT_TEXT;
            ++localStorage.max;
          } input.innerText = localStorage[localStorage.curr];
        }
      } else localStorage[localStorage.curr] = input.innerText;
    } highlight();
  }; document.body.appendChild(input);
  document.body.appendChild(highlighter);
  highlight();

  function highlight() {
    highlighter.innerHTML = input.innerText.split(commands).map(function(text) {
      return commands.test(text)?"<span style=\"background-color: #00f\">" + text + "</span>":text;
    }).join("").replace("\n", "<br>");
  }
})();

function beep() { // Let us let out a beep
var osc = ctx.createOscillator();
    osc.type = 3;
    osc.connect(ctx.destination);
    osc.noteOn(0);
  setTimeout(function() {
    osc.noteOff(0);
    osc.disconnect();
  }, 500); 
}

function parse(time) {
  var curr = 0;
  takeTwo(time.replace(/\s/g, "").split(units), function(fst, snd) {
    curr += +fst * unitValues[snd];
  }); return curr;

  function takeTwo(arr, callback) {
    for(var i = 0, l = Math.floor(arr.length / 2); i !== l; ++i)
      callback(arr[i * 2],
               arr[i * 2 + 1]);
  }
}

function send(message) {
  var el = document.querySelector("textarea[name=\"message_body\"]");
  el.classList.remove("DOMControl_placeholder");
  el.value = message;
  document.querySelector("input[value=\"Odpovědět\"]").click();
}

function whisper(message) {
  if(message.length) console.log(message);
}

function execute(batch, silent) {
  if(!batch.length) return;
  if(commands.test(batch[0])) { // It's a command
    var command = batch[0].replace(/\((.*)\)/, "$1");
    switch(command) { // Let's handle it
      case "seen": waitUntil(function() {
        return document.querySelector("._kv .seenByListener").classList.contains("seenByAll");
      }); break;
      
      case "replied": waitUntil(function() {
        return !document.querySelector("._kv .seenByListener").classList.contains("repliedLast");
      }); break;

      case "typing": waitUntil(function() {
        return document.querySelector(".typing");
      }); break;

      case "typing!": waitUntil(function() {
        return document.querySelector(".typing") ||
              !document.querySelector("._kv .seenByListener").classList.contains("repliedLast");
      }); break;

      case "any": waitUntil(function() {
        return document.querySelector(".typing") ||
               document.querySelector(".seen")   ||
              !document.querySelector("._kv .seenByListener").classList.contains("repliedLast");
      }); break;

      case "online": waitUntil(function() {
        return document.querySelector(".presenceActive");
      }); break;

      case "!online": waitUntil(function() {
        return !document.querySelector(".presenceActive");
      }); break;

      case "mobile": waitUntil(function() {
        return document.querySelector(".presenceMobile");
      }); break;

      case "!mobile": waitUntil(function() {
        return !document.querySelector(".presenceMobile");
      }); break;

      case "offline": waitUntil(function() {
        return !document.querySelector(".presenceActive") &&
               !document.querySelector(".presenceMobile");
      }); break;

      case "!offline": waitUntil(function() {
        return document.querySelector(".presenceActive") ||
               document.querySelector(".presenceMobile");
      }); break;

      case "!": silent = true; next(); break;
      case "beep": perform(beep); break;

      default: setTimeout(function() {
        perform(null);
      }, parse(command));
    }
  } else perform(function() { // No command, let's send it as plaintext
    (silent?whisper:send)(batch[0]);
  });

  function waitUntil(condition) {
    var interval = setInterval(function() {
      if(condition()) {
        clearInterval(interval);
        next();
      }
    }, 100);
  } function perform(action) {
    if(action) action();
    next();
  } function next() {
    execute(batch.splice(1), silent);
  }

}