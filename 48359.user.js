// ==UserScript==
// @name           mop music: hide ads && anti 30s
// @namespace      http://m.mop.com/
// @include        http://m.mop.com/*
// ==/UserScript==

try {
  (function() {
    var uw = unsafeWindow, jq = uw.jQuery, tmm_items = '.tmm #gg_player, .tmm #rbar_mini_app, .tmm #tabcontent_bottom, .tmm #top_ad, .tmm #inline-player, .tmm #shareit, .tmm #rbar_ad, .tmm #rbar_start_quiz, .tmm #mtop_nav, .tmm .song_title span, .tmm .newalbum .persist + div';
    var chk = function(arg) {
      return typeof(arg) != 'undefined';
    };
    var cc = function(args) {
      if (chk(uw.console) && chk(uw.console.log)) {
        uw.console.log(arguments);
      }
    };
    var addGlobalStyle = function(css) { 
        var head, style; 
        head = document.getElementsByTagName('head')[0]; 
        if (!head) { return; } 
        style = document.createElement('style'); 
        style.type = 'text/css'; 
        style.innerHTML = css; 
        head.appendChild(style); 
    };
    
    // copy from www.semnanweb.com/jquery-plugin/base64.html
    (function(jq){
  		var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  		var uTF8Encode = function(string) {
  			string = string.replace(/\x0d\x0a/g, "\x0a");
  			var output = "";
  			for (var n = 0; n < string.length; n++) {
  				var c = string.charCodeAt(n);
  				if (c < 128) {
  					output += String.fromCharCode(c);
  				} else if ((c > 127) && (c < 2048)) {
  					output += String.fromCharCode((c >> 6) | 192);
  					output += String.fromCharCode((c & 63) | 128);
  				} else {
  					output += String.fromCharCode((c >> 12) | 224);
  					output += String.fromCharCode(((c >> 6) & 63) | 128);
  					output += String.fromCharCode((c & 63) | 128);
  				}
  			}
  			return output;
  		};
  		jq.extend({
  			base64Encode: function(input) {
  				var output = "";
  				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  				var i = 0;
  				input = uTF8Encode(input);
  				while (i < input.length) {
  					chr1 = input.charCodeAt(i++);
  					chr2 = input.charCodeAt(i++);
  					chr3 = input.charCodeAt(i++);
  					enc1 = chr1 >> 2;
  					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
  					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
  					enc4 = chr3 & 63;
  					if (isNaN(chr2)) {
  						enc3 = enc4 = 64;
  					} else if (isNaN(chr3)) {
  						enc4 = 64;
  					}
  					output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
  				}
  				return output;
  			}
  		});
  	})(jq);
    
    var is_player_mode = uw.page_data && uw.page_data.type=='player';
    if (is_player_mode) {
      jq.extend(uw.m, {
        trEl: function(el, y) {
      		if (el.length) {
      			var list = jq('#track_list');
      			var h_el = el.css('height'), h_list = list.css('height');
      			if (el.css('display')=='none' || y) {
      				list.animate({height: (310 - parseInt(h_el))+'px'});
      				el.show();
      			}
      			else {
      				list.animate({height: '320px'});
      				el.hide();
      			}
      		}
      	}
      });
    }

    if(chk(jq)) {
      jq(function() {
        addGlobalStyle(
          tmm_items + ' { display: none; }' +
          '.tmm #track_list { bottom: 22px; }' + 
          '.tmm .player-footer { height: 20px; }'
        );
        jq(document.body).addClass('tmm');
        jq('iframe', tmm_items).remove();
        if (is_player_mode) {
          jq.each(uw.m.sounds, function() {
            (function(d) {
              d.clipurl = d.clipurl.replace('/30s/', '/');
            })(this);
          });
        }
        else {
          jq.each(uw.g_data && uw.g_data.songs, function() {
            (function(d) {
              d.clipurl = jq.base64Encode(uw.decodeBase64(d.clipurl)).replace('/30s/', '/');
            })(this.tag);
          });
        }
      });
    }
  })();
}
catch(err) {};
