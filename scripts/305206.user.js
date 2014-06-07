// ==UserScript==
// @name         Twitch KPM Meter
// @author       icheatatlan
// @namespace    http://wtfk.us/
// @version      1.1.2
// @description  Adds a Kappa-per-minute meter to the Twitch chat UI.  Mouseover the Kappa icon in the chat box to see the current KPM.  Click to toggle the graph panel.
// @downloadURL  http://userscripts.org/scripts/source/305206.user.js
// @match        *://*.twitch.tv/*
// @copyright    2014+
// ==/UserScript==


/**
 * Changelog
 *
 * 1.1.2
 *   Added support for multiple chat hooks across different UserScripts.
 *   Bugfix: Prevent double load.
 *
 * 1.1.1
 *   Bugfix: Corrected namespace 
 *
 * 1.1
 *   Added KPM over time graph.  Plots the average KPM over the past hour (rolling).
 *   Moved announce feature to separate button inside the graph panel.
 *   Bugfix: Wait for CurrentChat before loading.
 *
 * 1.0.1
 *   Bugfix: Don't indent Kappa icon when #emoticon-selector-toggle is invisible (channels without subscriber emotes).
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

  var kpm_load = function() {
    if (!jQuery) {
      console.log('KPMMeter: Waiting for jQuery');
      setTimeout(kpm_load, 1000);
      return;
    }
  
    if (!TTVChatHook.ready) {
      setTimeout(kpm_load, 1000);
      return;
    }

    
    var KPMMeter = (function() {
      function KPMMeter() {}
      var that = KPMMeter;
      
      that.canvas = null;
      that.context = null;
      
      that.current_average = 0;
      that.average_changed = true;
      that.kappa_delta = 0;
      that.sample_count = 60;
      that.samples = new Array(that.sample_count);
      that.sample_index = 0;
      that.sample_sum = 0;
      
      for (var i = 0; i < that.sample_count; i++) {
        that.samples[i] = 0;
      }
      
      that.point_rate = 4; // per minute
      that.point_total = that.point_rate * 60; // 1 hour
      that.point_interval = (60 / that.point_rate) * 1000;
      that.graph_points = new Array(that.point_total);
      for (var i = 0; i < that.point_total; i++) {
        that.graph_points[i] = 0;
      }

      
      that.setup_ui = function() {
        var kpm_icon = jQuery('<a id="kpm-toggle"></a>');
        var kpm_under = jQuery('<a id="kpm-underlay"></a>');
        
        kpm_under.css({
          'display': 'inline',
          'width': '18px',
          'height': '18px',
          'position': 'absolute',
          'top': '5px',
          'background-image': 'linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 1.0))',
          'background-size': '18px 18px',
          'background-position': '0px 18px',
          'background-repeat': 'no-repeat'
        });
        
        kpm_icon.css({
          'display': 'inline',
          'width': '18px',
          'height': '18px',
          'position': 'absolute',
          'top': '5px',
          'background-image': 'url("http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png")',
          'background-repeat': 'no-repeat',
          'background-size': '18px 18px'
        });
        
        kpm_icon.attr('title', 'KPM: 0 (click to toggle)');
        
        if (jQuery('#emoticon-selector-toggle') && jQuery('#emoticon-selector-toggle').css('display') != 'none') {
          kpm_icon.css('right',  '25px');
          kpm_under.css('right', '25px');
          jQuery('#chat_text_input').css('padding-right', '40px');
        } else {
          kpm_icon.css('right', '5px');
          kpm_under.css('right', '5px');
        }
        
        kpm_icon.click(function() {
          var container = jQuery('#kpm-panel-container');
          var visible = container.height() == 104;
          container.height(visible ? 0 : 104);
          
          var chat_box = jQuery('#twitch_chat .js-chat-scroll');
          var bottom = parseInt(chat_box.css('bottom'), 10);
          chat_box.css('bottom', bottom + (visible ? -104 : 104) + 'px');
          
          that.update_panel();
        });
        
        jQuery('#control_input').append(kpm_under).append(kpm_icon);
        
        
        var kpm_container = jQuery('<div id="kpm-panel-container" style="overflow: hidden; height: 0px;"></div>');
        var kpm_inner = jQuery('<div class="kpm-panel-inner"></div>');
        kpm_inner.css({
          'position': 'relative',
          'background': '#ddd',
          'height': '94px',
          'margin-bottom': '10px',
          'border': '1px solid rgba(0, 0, 0, 0.25)',
          'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(255, 255, 255, 0.65)',
          'box-sizing': 'border-box'
        });
        
        var canvas = jQuery('<canvas id="kpm-panel"></canvas>');
        canvas.append(jQuery('<div>no canvas? what a noob</div>').css({
          'background-image': 'url("http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png")',
          'width': '100%',
          'height': '100%',
          'color': 'white',
          'text-align': 'center',
          'text-shadow': '0 0 4px black, 0 0 4px black, 0 0 4px black, 0 0 4px black, 0 0 4px black'
        }));
        
        // XXX: negative top margin bandaid (needs proper fix)
        var kpm_status = jQuery('<div style="height: 20px; background-color: black; margin-top: -5px;"></div>');
        var kpm_button = jQuery('<button id="kpm-announce" class="primary_button">Announce (0 KPM)</button>').css({
          'display': 'block',
          'padding': '0px 2px'
        });
        
        // workaround
        kpm_button[0].style.setProperty('float', 'none', 'important');
        kpm_button[0].style.setProperty('margin', '0px auto', 'important');
        
        kpm_status.append(kpm_button.click(function() {
          CurrentChat.say('The current KPM is ' + KPMMeter.current_average + ' Kappa');
        }));
        
        kpm_inner.append(canvas);
        kpm_inner.append(kpm_status);
        kpm_container.append(kpm_inner);
        jQuery('#control_buttons').prepend(kpm_container);
        
        canvas.attr('width', kpm_inner.css('width'));
        canvas.attr('height', (kpm_inner.height() - 20) + 'px');
      };
      
      that.count_occurences = function(str, needle) {
        var idx = str.indexOf(needle);
        var n = 0;
          
        while (idx != -1) {
          n++;
          idx = str.indexOf(needle, idx + needle.length);
        }
         
        return n;
      };
      
      that.h_insert_chat_line = function(line) {
        if (line.message) {
          that.kappa_delta += that.count_occurences(line.message, 'Kappa');
          that.kappa_delta += that.count_occurences(line.message, 'Keepo');
            
          if (line.turbo) {
            that.kappa_delta += that.count_occurences(line.message, 'KappaHD');
            that.kappa_delta += that.count_occurences(line.message, 'MiniK');
          }
        }
          
        return true;
      };
      
      that.update_underlay = function() {
        var max = 100;
        var offset = 18 - (18 * (that.current_average / max));
        
        if (offset < 0) {
          offset = 0;
        } else if (offset > 18) { // negative KPM? sure whatever
          offset = 18;
        }

        jQuery('#kpm-underlay').css('background-position', '0px ' + offset + 'px');
      };
      
      that.update_graph = function() {
        that.graph_points.shift();
        that.graph_points.push(that.current_average);
        
        if (that.canvas == null) {
          that.canvas = document.getElementById('kpm-panel');
          if (that.canvas == null) {
            setTimeout(that.update_graph, that.point_interval);
            return;
          }
        }
          
        if (that.context == null) {
          that.context = that.canvas.getContext('2d');
          if (that.context == null) {
            setTimeout(that.update_graph, that.point_interval);
            return;
          }
        }
        
        var peak = 0;
        for (var i = 0; i < that.point_total; i++) {
          if (that.graph_points[i] > peak) {
            peak = that.graph_points[i];
          }
        }
        
        var c = that.context;
        
        var y_scale = that.canvas.height / peak;
        var step = that.canvas.width / that.point_total;

        c.clearRect(0, 0, that.canvas.width, that.canvas.height);
        c.fillStyle = 'black';
        c.lineWidth = 1;
        
        c.beginPath();
        
        c.moveTo(0, that.canvas.height - (that.graph_points[0] * y_scale));
        for (var i = 1, x = step; i < that.point_total; i++, x += step) {
          c.lineTo(x, that.canvas.height - (that.graph_points[i] * y_scale));
        }
        
        c.lineTo(that.canvas.width, that.canvas.height - (that.graph_points[that.point_total - 1] * y_scale));
        c.lineTo(that.canvas.width, that.canvas.height);
        c.lineTo(0, that.canvas.height);
        
        c.closePath();
        c.fill();
        
        c.fillStyle = 'white';
        c.strokeStyle = 'black';
        c.font = 'bold 13pt Courier New';
        
        // ugh
        c.lineWidth = 3;
        c.strokeText('0', 2, that.canvas.height - 4);
        c.lineWidth = 2;
        c.fillText('0', 2, that.canvas.height - 4);

        c.lineWidth = 3;
        c.strokeText(peak.toString(), 2, 15);
        c.lineWidth = 2;
        c.fillText(peak.toString(), 2, 15);

        setTimeout(that.update_graph, that.point_interval);
      };
      
      that.update_panel = function() {
        if (jQuery('#kpm-panel-container').height() == 0)
          return;
        
        jQuery('#kpm-announce').text('Announce (' + that.current_average + ' KPM)');
      };
      
      that.update = function() {
        TTVChatHook.check();

        // simple moving average
        that.sample_sum -= that.samples[that.sample_index];
        that.sample_sum += that.kappa_delta;
        that.samples[that.sample_index] = that.kappa_delta; 
        if (++that.sample_index == that.sample_count) {
          that.sample_index = 0;
        }
        
        that.kappa_delta = 0;
        
        var average = (that.sample_sum / that.sample_count) * 60;
        if (that.average_changed = that.current_average != average) {
          jQuery('#kpm-toggle').attr('title', 'KPM: ' + average + ' (click to toggle)');
          that.current_average = average;
          that.update_underlay();
          that.update_panel();
        }

        setTimeout(that.update, 1000);
      };

      return KPMMeter;
    })();
    
    TTVChatHook.add('KPMMeter', 0, KPMMeter.h_insert_chat_line);
    
    KPMMeter.setup_ui();
    KPMMeter.update();
    KPMMeter.update_graph();
    
    console.log('KPMMeter: Loaded');
  };
  

  setTimeout(kpm_load, 1000);
}).call(this);