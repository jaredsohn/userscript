// ==UserScript==
// @id            IYE
// @name          Imageboard YouTube Embed
// @namespace     4chon.net
// @version       2.1
// @description   Turns YouTube URLs into embedded objects (4chan, 4chon.net, 420chan, archives)
// @homepage      http://userscripts.org/scripts/show/98867
// @updateURL     https://userscripts.org/scripts/source/98867.user.js
// @icon          http://static.4chon.net/favicon.gif
// @include       http://4chanarchive.org/brchive/*
// @include       http://4chon.net/*
// @include       http://archive.easymodo.net/cgi-board.pl/*
// @include       http://archive.no-ip.org/*
// @include       http://boards.420chan.org/*
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// @include       http://dis.4chan.org/read/*
// @include       http://green-oval.net/cgi-board.pl/*
// @include       http://suptg.thisisnotatrueending.com/archive/*
// ==/UserScript==

(function() {
  var C, CodeGen, Main, Options, SiteMan;
  C = {
    Prefs: {
      'Break Before': [true, 'Insert a line break before the embedded object'],
      'Break After': [true, 'Insert a line break after the embedded object'],
      'HTML5 Player': [false, 'Use HTML5 player instead of Flash player'],
      'Transparent wmode': [false, 'Use transparent wmode'],
      'Hide Page Duplicates': [false, 'Hide all duplicates in a page'],
      'Hide Post Duplicates': [false, 'Hide all duplicates in a post'],
      'Width': [640, 'Embedded object\'s width'],
      'Height': [390, 'Embedded object\'s height'],
      'Page Limit': [-1, 'Maximum embedded objects per page'],
      'Post Limit': [-1, 'Maximum embedded objects per post'],
      'Prompt on limit': [true, 'Show a prompt when the limit is reached']
    },
    init: function() {
      if (GM_getValue("firstrun", true)) {
        this.delPrefs();
        this.savePrefs();
      }
      this.loadPrefs();
    },
    saveOpts: function() {
      var i, _i, _len, _ref;
      _ref = document.getElementsByClassName('IYE_Option');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        this.Prefs[i.name][0] = i.type === "checkbox" ? i.checked : i.value;
      }
    },
    savePrefs: function() {
      var opt;
      for (opt in this.Prefs) {
        GM_setValue(opt, this.get(opt));
      }
    },
    delPrefs: function() {
      var old, _i, _len, _ref;
      _ref = GM_listValues();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        old = _ref[_i];
        GM_deleteValue(old);
      }
    },
    loadPrefs: function() {
      var opt;
      for (opt in this.Prefs) {
        this.Prefs[opt][0] = GM_getValue(opt, this.get(opt));
      }
    },
    get: function(name) {
      return this.Prefs[name][0];
    },
    desc: function(name) {
      return this.Prefs[name][1];
    },
    list: function() {
      var opt, _results;
      _results = [];
      for (opt in this.Prefs) {
        _results.push(opt);
      }
      return _results;
    }
  };
  Options = {
    create: function() {
      var option, tmp, _i, _len, _ref;
      tmp = "<div id=\"IYE_Overlay\"><li id=\"IYE_Options\">";
      _ref = C.list();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        tmp += "<ul>" + (C.desc(option)) + " <input class=\"IYE_Option\" name=\"" + option + "\" " + (typeof (C.get(option)) === "boolean" ? "type=\"checkbox\" " + (C.get(option) ? "checked" : "") : "type=\"text\" value=\"" + (C.get(option)) + "\"") + "></ul>";
      }
      tmp += "</li></div>";
      return Main.createEl(tmp);
    },
    close: function() {
      C.saveOpts();
      C.savePrefs();
      document.getElementById("IYE_Overlay").style.display = "none";
    },
    open: function() {
      document.getElementById("IYE_Overlay").style.display = "inline-block";
    },
    init: function() {
      document.body.appendChild(this.create());
      document.getElementById("IYE_Overlay").addEventListener("click", this.close);
      document.getElementById("IYE_Options").addEventListener("click", function(e) {
        e.stopPropagation();
      });
      if (typeof GM_registerMenuCommand !== "undefined" && GM_registerMenuCommand !== null) {
        GM_registerMenuCommand("IYE", this.open);
      }
      if (typeof GM_addStyle !== "undefined" && GM_addStyle !== null) {
        GM_addStyle("                    #IYE_Overlay {                      display: none;                      position: fixed;                      bottom: 0;                      left: 0;                      right: 0;                      top: 0;                      background: rgba(0, 0, 0, 0.5);                      text-align: center;                          horizontal-align: middle;                      vertical-align: middle;                      z-index: 1;                    }                    #IYE_Options {                      display: inline-block;                      background: rgba(192, 192, 192, 1);                      width:min;                      text-align: right;                      vertical-align: middle;                    }                    #IYE_Overlay:after {                      display: inline-block;                      content: \"\";                      height: 100%;                      vertical-align: middle;                    }                  ");
      }
    }
  };
  CodeGen = {
    base: null,
    init: function() {
      this.base = "" + (C.get('Break Before') ? "<br/>" : "") + "\n  " + (C.get('HTML5 Player') ? "<iframe class=\"youtube-player\" type=\"text/html\" width=" + (C.get('Width')) + " height=" + (C.get('Height')) + " src=\"http://www.youtube.com/embed/$1\" frameborder=\"0\"></iframe>" : "<object wmode=\"" + (C.get('Transparent wmode') ? "transparent" : "opaque") + "\" type=\"application/x-shockwave-flash\" style=\"width: " + (C.get('Width')) + "px; height: " + (C.get('Height')) + "px\" data=\"http://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22?fs=1\">        <param name=\"movie\" value=\"http://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22?fs=1\">        </param>        <param name=\"allowFullScreen\" value=\"true\">        </param>      </object>") + "\n" + (C.get('Break After') ? "<br/>" : "");
    }
  };
  SiteMan = {
    site: null,
    posts: null,
    init: function() {
      var i;
      for (i in this.sites) {
        if (this.sites[i].ureg.exec(document.URL)) {
          this.site = i;
          this.addLinks();
          switch (i) {
            case "4chon":
              this.posts = document.getElementsByClassName("body");
              break;
            default:
              this.posts = document.getElementsByTagName("blockquote");
          }
          return;
        }
      }
    },
    addLinks: function() {
      var arr, i, link, _i, _len;
      arr = (function() {
        switch (this.site) {
          case "4chan":
            return [document.getElementById("boardNavDesktop"), document.getElementById("boardNavDesktopFoot")];
          case "4chon":
            return document.getElementsByClassName("boardlist");
        }
      }).call(this);
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        i = arr[_i];
        link = Main.createEl("<span> [<a href='javascript:;'>IYE</a>] </span>");
        link.addEventListener("click", Options.open);
        i.appendChild(link);
      }
    },
    sites: {
      "4chon": {
        hreg: /<a target="_blank" rel="nofollow" href="http\:\/\/(?:www.|)youtube.com\/watch\?v=.*?">.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>/,
        ureg: /(?:4chon.net)/
      },
      "4chan": {
        hreg: /(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&amp;(?:feature=(?:agve|aso|channel|feedrec|fvhl|player_embedded|playlist|popt[a-zA-Z0-9]{6}|popular|sub|topvideos|youtu.be|)|index=[0-9]|p=[a-zA-Z0-9_-]{16}|playnext=[0-9]|playnext_from=TL|videos=[a-zA-Z0-9_-]{11})|){1,10}(?:<br>|)/,
        ureg: /(?:boards.4chan.org)/
      },
      "4chanarchive": {
        hreg: /(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&amp;(?:feature=(?:agve|aso|channel|feedrec|fvhl|player_embedded|playlist|popt[a-zA-Z0-9]{6}|popular|sub|topvideos|youtu.be|)|index=[0-9]|p=[a-zA-Z0-9_-]{16}|playnext=[0-9]|playnext_from=TL|videos=[a-zA-Z0-9_-]{11})|){1,10}(?:<br>|)/,
        ureg: /(?:4chanarchive.org)/
      },
      easymodo: {
        hreg: /(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&amp;(?:feature=(?:agve|aso|channel|feedrec|fvhl|player_embedded|playlist|popt[a-zA-Z0-9]{6}|popular|sub|topvideos|youtu.be|)|index=[0-9]|p=[a-zA-Z0-9_-]{16}|playnext=[0-9]|playnext_from=TL|videos=[a-zA-Z0-9_-]{11})|){1,10}(?:<br>|)/,
        ureg: /(?:archive.easymodo.net)/
      },
      thisisnotatrueending: {
        hreg: /(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&amp;(?:feature=(?:agve|aso|channel|feedrec|fvhl|player_embedded|playlist|popt[a-zA-Z0-9]{6}|popular|sub|topvideos|youtu.be|)|index=[0-9]|p=[a-zA-Z0-9_-]{16}|playnext=[0-9]|playnext_from=TL|videos=[a-zA-Z0-9_-]{11})|){1,10}(?:<br>|)/,
        ureg: /(?:suptg.thisisnotatrueending.com)/
      },
      "420chan": {
        hreg: /<a href="(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=.*?"(?: rel="nofollow"|)>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>/,
        ureg: /(?:420chan.org)/
      },
      "green-oval": {
        hreg: /<a href="(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=.*?"(?: rel="nofollow"|)>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>/,
        ureg: /(?:green-oval.net)/
      },
      "no-ip": {
        hreg: /<a href="(?:http.{3}|)(?:www.|)youtube.com\/watch\?v=.*?"(?: rel="nofollow"|)>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>/,
        ureg: /(?:archive.no-ip.org)/
      },
      "dis.4chan": {
        hreg: /<a rel.*>.*?\?v=([a-zA-Z0-9_-]{11}).*?<\/a>(?:<br \/>|)/,
        ureg: /(?:dis.4chan.org)/
      }
    }
  };
  Main = {
    l: function(s) {
      console.log(s);
    },
    createEl: function(s) {
      var div;
      div = document.createElement("div");
      div.innerHTML = s;
      return div.childNodes[0];
    },
    init: function() {
      var jq;
      jq = document.createElement('script');
      jq.type = "text/javascript";
      jq.src = "http://code.jquery.com/jquery-1.7.2.min.js";
      document.getElementsByTagName('head')[0].appendChild(jq);
      C.init();
      CodeGen.init();
      SiteMan.init();
      Options.init();
      if (GM_getValue("firstrun", true)) {
        Options.open();
        GM_setValue("firstrun", false);
      } else {
        this.embedify(SiteMan.posts, SiteMan.sites[SiteMan.site].hreg, CodeGen.base);
      }
    },
    embedify: function(posts, search_str, replace_str) {
      var countPer, countTotal, found, id, post, promptings, vid_ids, _i, _len;
      vid_ids = [];
      countTotal = 0;
      promptings = 0;
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        post = posts[_i];
        if (C.get("Hide Post Duplicates") && !C.get("Hide Page Duplicates")) {
          vid_ids = [];
        }
        countPer = 0;
        while (!(countPer === +(C.get("Post Limit")) || countTotal === +C.get("Page Limit"))) {
          found = post.innerHTML.search(search_str);
          if (found === -1) {
            break;
          }
          if (C.get("Hide Post Duplicates") || C.get("Hide Page Duplicates")) {
            id = post.innerHTML.substring(found).replace(search_str, '$1').substring(0, 11);
            if (vid_ids.indexOf(id) !== -1) {
              post.innerHTML = post.innerHTML.replace(search_str, "");
              continue;
            } else {
              vid_ids.push(id);
            }
          }
          countPer++;
          countTotal++;
          post.innerHTML = post.innerHTML.replace(search_str, replace_str);
          if (C.get("Prompt on limit") && countTotal === +C.get("Page Limit")) {
            if (confirm("This page contains more than " + (Number(C.get('Page Limit')) * (++promptings)) + " videos. Continue?")) {
              countTotal = 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
    }
  };
  Main.init();
}).call(this);
