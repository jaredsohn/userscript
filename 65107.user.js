// ==UserScript==
// @name           hidetsf
// @namespace      http://tsadult.s7.x-beat.com/
// @description    Hides unwanted comments (e.g. SPAMs) on the TSF image BBS which is named "Adult TSF shienjo".
// @version        2
// @include        http://tsadult.s7.x-beat.com/cgi-bin/picbbs*/*
// @exclude        http://tsadult.s7.x-beat.com/cgi-bin/picbbs*/textbbs.htm
// @exclude        http://tsadult.s7.x-beat.com/cgi-bin/picbbs01/*
// @require        http://userscripts.org/scripts/source/65595.user.js
// ==/UserScript==

(function () {
   const DEFAULT_CONFIG =
     [ {key:"minimum_point_enabled", val:true}
     , {key:"minimum_point", val:0}
     , {key:"minimum_total_point_enabled", val:false}
     , {key:"minimum_total_point", val:0}
     , {key:"spamfilter_enabled", val:true}
     , {key:"spamfilter_ham_domain", val:/(tsadult\.s7\.x-beat\.com|tsfbase\.sakura\.ne\.jp|moe\.homelinux\.net)/}
     , {key:"spamfilter_ham_response_count", val:1}
     , {key:"reduced_mode_comment_filter_regexp", val:/(ｷﾀ━{4}\(ﾟ∀ﾟ\)━{4}ｯ!!|^#)/}
     ];
   const PREFS_PANEL_CSS = '#hidetsf_prefs { z-index:10; position: fixed; top: 50px; left: 100px; right: 100px; border:1px solid #ccc; background: #ddd; }'
     + 'input[@type="checkbox"] { display: inline; }'
     +'.setting { margin: 5px 0; padding: 2px; background: #eee;}'
     +'.setting div { margin-left: 20px; }';

   const PREFS_PANEL_HTML = '<div id="hidetsf_prefs">\
  <div class="setting">\
    <input id="minimum_point_checkbox" class="checkbox" type="checkbox" value="" />\
    <label class="choice" for="minimum_point_checkbox">親コメントのポイントが閾値より低いスレッドを隠す</label>\
    <div class="sub">\
    <label for="minimum_point_val">閾値:</label>\
    <input id="minimum_point_val" type="text" value="" />\
    </div>\
  </div>\
  <div class="setting">\
    <input id="minimum_total_point_checkbox" class="checkbox" type="checkbox" value="" />\
    <label class="choice" for="minimum_total_point_checkbox">スレッド全体のポイントが閾値より低いスレッドを隠す</label>\
    <div class="sub">\
    <label for="minimum_total_point_val">閾値:</label>\
    <input id="minimum_total_point_val" type="text" value="" />\
    </div>\
  </div>\
  <div class="setting">\
    <input id="spam_checkbox" class="checkbox" type="checkbox" value="" />\
    <label class="choice" for="spam_checkbox">スパムフィルタ</label>\
    <div class="sub">\
    <label for="ham_domain_val">許可するドメインの正規表現:</label>\
    <input id="ham_domain_val" type="text" value="" />\
    </div>\
    <div class="sub">\
    <label for="ham_response_val">これ以上の返信があるスレッドは除外:</label>\
    <input id="ham_response_val" type="text" value="" />\
    </div>\
  </div>\
  <div class="setting">\
    <label for="reduced_mode_comment_filter_regexp">簡略表示の際除外するコメントの正規表現:</label>\
    <input id="reduced_mode_comment_filter_regexp" type="text" value="" />\
  </div>\
  <div>\
    <input id="hidetsf_prefs_submit" type="button" name="submit" value="Save" />\
    <input id="hidetsf_prefs_cancel" type="button" name="cancel" value="Cancel" />\
    <input id="hidetsf_prefs_default" type="button" name="default" value="default" />\
  </div>\
</div>';

   var Prefs = new function() {
     this.show = show;
     this.hide = hide;
     this.save = save;
     this.load = load;
     this.save_button_clicked = save_button_clicked;
     this.cancel_button_clicked = cancel_button_clicked;
     var _panel = null;

     init();
     
     function init() {
       GM_addStyle(PREFS_PANEL_CSS);
       _panel = document.createElement('div');
       _panel.innerHTML = PREFS_PANEL_HTML;
       $x('/html/body').appendChild(_panel);
       $x("//input[@id='hidetsf_prefs_submit']").addEventListener('click', save_button_clicked, true);
       $x("//input[@id='hidetsf_prefs_cancel']").addEventListener('click', cancel_button_clicked, true);
       $x("//input[@id='hidetsf_prefs_default']").addEventListener('click', default_button_clicked, true);
       hide();
     }

     function show() {
       config = load();
       set_config(config);
       _panel.style.display = 'block';
     }

     function set_config(config) {
       $x("//input[@id='minimum_point_checkbox']").checked = config.minimum_point_enabled;
       $x("//input[@id='minimum_point_val']").value = config.minimum_point;
       $x("//input[@id='minimum_total_point_checkbox']").checked = config.minimum_total_point_enabled;
       $x("//input[@id='minimum_total_point_val']").value = config.minimum_total_point;
       $x("//input[@id='spam_checkbox']").checked = config.spamfilter_enabled;
       $x("//input[@id='ham_domain_val']").value = config.spamfilter_ham_domain.source;
       $x("//input[@id='ham_response_val']").value = config.spamfilter_ham_response_count;
       $x("//input[@id='reduced_mode_comment_filter_regexp']").value = config.reduced_mode_comment_filter_regexp.source;
     }

     function hide() {
       _panel.style.display = 'none';
     }
     
     function save_button_clicked() {
       var newconfig = {};
       try {
         newconfig.minimum_point_enabled = $x("//input[@id='minimum_point_checkbox']").checked;
         newconfig.minimum_point = parseInt($x("//input[@id='minimum_point_val']").value);

         newconfig.minimum_total_point_enabled = $x("//input[@id='minimum_total_point_checkbox']").checked;
         newconfig.minimum_total_point = parseInt($x("//input[@id='minimum_total_point_val']").value);

         newconfig.spamfilter_enabled = $x("//input[@id='spam_checkbox']").checked;
         newconfig.spamfilter_ham_domain = new RegExp($x("//input[@id='ham_domain_val']").value);
         newconfig.spamfilter_ham_response_count = parseInt($x("//input[@id='ham_response_val']").value);

         newconfig.reduced_mode_comment_filter_regexp = new RegExp($x("//input[@id='reduced_mode_comment_filter_regexp']").value);
       } catch(e) {
         alert(e);
         return;
       }
       save(newconfig);
       hide();
     }

     function cancel_button_clicked() {
       hide(); 
     }
     
     function default_button_clicked() {
       var config = {};
       DEFAULT_CONFIG.forEach(function(cnf) {
         config[cnf.key] = cnf.val;
       });
       set_config(config);
     }
     
     function load() {
       var json = GM_getValue("config", "({})");
       var config = eval(json);
       DEFAULT_CONFIG.forEach(function(cnf) {
         if (typeof config[cnf.key] == 'undefined') {
           config[cnf.key] = cnf.val;
         }
       });
       return config;
     }
     function save(config) {
       var json = config.toSource();
       GM_setValue("config", json);
     }
   };

   function createToggleButton(config) {
     var root = Utils.XPath_single("/html/body/form");
     GM_addStyle(".togglebutton { display:block; border: 1px solid #753; background: #eee; float: left; clear: left; } .togglebutton .point { color: orange; } .togglebutton .comments { font-size: x-small; color: gray; }");
     TSAdult.Threads.forEach(function (thread) {
       var elem = document.createElement("div");
       elem.id = "togglebutton-"+thread.id;
       elem.className = "togglebutton";
       var comments = "";
       var rcomments = thread.comments
         .map(function(c){return c.text_content;})
         .filter(function(c){ return !config.reduced_mode_comment_filter_regexp.test(c); })
         .map(function(c){return c.slice(0,50);});
       if (rcomments.length > 0) {
         comments = rcomments.reduce(function(a,b){return a+"//"+b;}).slice(0,100);
       }
       elem.innerHTML = "Toggle" + "<span class='info'>(<span class='point'>"
         + thread.comments[0].point + "pts. / total:"
         + thread.total_point+"pts.</span>)<span class='comments'>"+comments+"</span></span>";
       elem.addEventListener("click", function() { toggleThread(thread); }, false);
       root.insertBefore(elem, thread.element);
       reset_info_showstatus(thread);
     });
   }

   function reset_info_showstatus(thread) {
     var style = thread.is_shown() ? 'none' : 'inline';
     Utils.XPath_single('//*[@id="togglebutton-'+thread.id+'"]/*[contains(@class, "info")]').style.display = style;
   }

   function toggleThread(thread) {
     thread.toggle();
     reset_info_showstatus(thread);
   }
   function hideThread(thread) {
     thread.hide();
     reset_info_showstatus(thread);
   }

   function hideSpamThreads(config) {
     if (!config.spamfilter_enabled) { return; }
     var absLinkRegExp = /http:\/\/([^/\s]+)/;
     TSAdult.Threads.forEach(function (thread) {
       if (thread.comments.length > config.spamfilter_ham_response_count) {
         return;
       }
       var content = thread.comments[0].content;
       if (absLinkRegExp.test(content)) {
         var hostname = RegExp.$1;
         if (!config.spamfilter_ham_domain.test(hostname)) {
           hideThread(thread);
         }
       }
     });
   }
   function hideThreadsPtsLessThan(config) {
     TSAdult.Threads.forEach(function (thread) {
       if (config.minimum_point_enabled && thread.comments[0].point < config.minimum_point) {
         hideThread(thread);
       }
       if (config.minimum_total_point_enabled && thread.total_point < config.minimum_total_point) {
         hideThread(thread);
       }
     });
   }

   var config = Prefs.load();
   createToggleButton(config);
   hideThreadsPtsLessThan(config);
   hideSpamThreads(config);

   GM_registerMenuCommand('config', function(){ Prefs.show(); });
 })();

