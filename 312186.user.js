// ==UserScript==
// @name         Twitch Copy Pasterino Squelcher
// @author       icheatatlan
// @namespace    http://wtfk.us/
// @version      1.0.2
// @description  Silences repeated messages that occur within a short period of time.
// @downloadURL  http://userscripts.org/scripts/source/312186.user.js
// @match        *://*.twitch.tv/*
// @copyright    2014+
// ==/UserScript==


/**
 * Changelog
 *
 * 1.0.2
 *   Changed threshold to 3 messages.
 *   Convert messages to lowercase before hashing.
 * 
 * 1.0
 *   Initial release.
 *
 */

if (window.top != window.self)
  return;

(function() {
  if (!unsafeWindow.TTVChatHook) {
    (function() {
      function TTVChatHook() {
        this.hooks = [ // indexed by priority
          // [ { name, f }, { name, f }, ... ],
          // ....
        ];
        
        this.o_insert_chat_line = null;
        this.ready = false;
        
        // XXX: actually gets called in context of CurrentChat
        this.h_insert_chat_line = function(line) {
          var that = unsafeWindow.TTVChatHook;
          
          for (var i = 0; i < that.hooks.length; i++) {
            if (!that.hooks[i]) {
              continue;
            }
              
            for (var j = 0; j < that.hooks[i].length; j++) {
              if (!that.hooks[i][j].f(line)) {
                return;
              }
            }
          }
          
          that.o_insert_chat_line.call(CurrentChat, line);
        };
        
        this.add = function(name, priority, f) {
          if (!this.hooks[priority]) {
            this.hooks[priority] = [];
          }
          
          this.hooks[priority].push({ 'name': name, 'f': f });
          console.log('TTVChatHook: Added hook ' + name + ' at priority ' + priority);
        };
        
        this.hook_chat = function() {
          this.o_insert_chat_line = CurrentChat.insert_chat_line;
          CurrentChat.insert_chat_line = this.h_insert_chat_line;      
        };
        
        this.install = function() {
          if (typeof unsafeWindow['CurrentChat'] == 'undefined') {
            console.log('TTVChatHook: Waiting for chat');
            setTimeout(function() { unsafeWindow.TTVChatHook.install(); }, 1000);
            return;
          }
          
          this.hook_chat();
          this.ready = true;
          
          console.log('TTVChatHook: Ready');
        };
        
        this.check = function() {
          if (CurrentChat.insert_chat_line != this.h_insert_chat_line) {
            console.log('TTVChatHook: Rehooking chat');
            this.hook_chat();
          }
        };
      }
      
      unsafeWindow.TTVChatHook = new TTVChatHook();
      unsafeWindow.TTVChatHook.install();
    }).call(this);
  }

  var cps_load = function() {
    if (!jQuery) {
      console.log('Squelcher: Waiting for jQuery');
      setTimeout(cps_load, 1000);
      return;
    }
  
    if (!TTVChatHook.ready) {
      setTimeout(cps_load, 1000);
      return;
    }

    
    var Squelcher = (function() {
      function Squelcher() {}
      var that = Squelcher;
      
      // murmur3: http://jsperf.com/murmurhash3
      that.hash_seed = (Math.random() * (Math.pow(2, 31) - 1)) | 0;
      that.mul32 = function(m, n) {
        var nlo = n & 0xffff;
        var nhi = n - nlo;
        return ((nhi * m | 0) + (nlo * m | 0)) | 0;
      };

      that.hashString = function(data, len) {
        var c1 = 0xcc9e2d51, c2 = 0x1b873593;
        var h1 = that.hash_seed;
        var roundedEnd = len & ~0x1;
    
        for (var i = 0; i < roundedEnd; i += 2) {
          var k1 = data.charCodeAt(i) | (data.charCodeAt(i + 1) << 16);
    
          k1 = that.mul32(k1, c1);
          k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
          k1 = that.mul32(k1, c2);
    
          h1 ^= k1;
          h1 = ((h1 & 0x7ffff) << 13) | (h1 >>> 19); // ROTL32(h1,13);
          h1 = (h1 * 5 + 0xe6546b64) | 0;
        }
    
        if ((len % 2) == 1) {
          k1 = data.charCodeAt(roundedEnd);
          k1 = that.mul32(k1, c1);
          k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
          k1 = that.mul32(k1, c2);
          h1 ^= k1;
        }
    
        // finalization
        h1 ^= (len << 1);
    
        // fmix(h1);
        h1 ^= h1 >>> 16;
        h1 = that.mul32(h1, 0x85ebca6b);
        h1 ^= h1 >>> 13;
        h1 = that.mul32(h1, 0xc2b2ae35);
        h1 ^= h1 >>> 16;
    
        return h1;
      };
      
      
      that.threshold = 3; // repeat count before squelching within update interval
      that.update_interval = 10000;
      
      that.table = {
        // <hash>: { count, last }
      };
      
      that.process_message = function(message) {
        var str = message.replace(/\s+/g, '').toLowerCase();
        var hash = that.hashString(str, str.length);
        
        if (that.table[hash]) {
          var entry = that.table[hash];

          entry.last = new Date().getTime();
          return ++entry.count > that.threshold;
        }
        
        that.table[hash] = {
          count: 1,
          last: new Date().getTime(),
        };
        
        return false;
      };
      
      that.insert_chat_line = function(line) {
        return !that.process_message(line.message);
      };
      
      that.update = function() {
        TTVChatHook.check();
        
        var time = new Date().getTime();
        
        for (var key in that.table) {
          if (that.table.hasOwnProperty(key)) {
            var entry = that.table[key];
            
            if (time - entry.last > that.update_interval) {
              delete that.table[key];
            }
          }
        }
        
        setTimeout(that.update, 1000);
      };
      
      return Squelcher;
    })();
    
    TTVChatHook.add('Squelcher', 9, Squelcher.insert_chat_line);
    Squelcher.update();
    
    console.log("Squelcher: Loaded");
  };
  
  setTimeout(cps_load, 1000);
}).call(this);