// ==UserScript==
// @id             www.baidu.com-3172f509-6098-48b2-88b4-f7dcba1852b1@patwonder@163.com
// @name           贴吧HTML注入漏洞修复 Tieba HTML injection fix
// @version        2.2.1
// @namespace      patwonder@163.com
// @author         patwonder
// @description    本脚本用于修复个人信息页面HTML注入漏洞，百度迟迟不修复这个漏洞。。。声明：本脚本仅能在一定程度上起到预防作用，漏洞为百度网页本身问题，与本脚本无关。无论您是否安装本脚本，因该漏洞引起的任何损失，本人不负任何责任。
// @include        http://www.baidu.com/p/*
// @run-at         document-start
// ==/UserScript==

(function(w) {
    var selToFix = ".mod-portraitlist a, .tieba-userlist a";
    var code = function() {
      var _app = (unsafeWindow || window).App;
      if (_app != undefined)
        hookOnPageletArrive();
      function hookOnPageletArrive() {
        //_hooked = true;
        // Hook onPageletArrive
        var _onPageletArrive = _app.onPageletArrive;
        var _onPageletArriveHooked = function(obj) {
          //console.log("onPageletArrive: " + JSON.stringify(obj));
          // we should filter the "tplContent" property
          if (obj.viewType == "TiebaRelation" || obj.viewType == "TiebaFriendList"
              || obj.viewType == "TiebaFriendHolder")
          {
            //console.log(obj.tplContent);
            var newTplContent = filter(obj.tplContent);
            if (newTplContent != obj.tplContent)
              console.log("Filtered tplContent: " + newTplContent);
            obj.tplContent = newTplContent;
          }
          // call the original function
          _onPageletArrive.call(this, obj);
        };
        Object.defineProperty(_app, "onPageletArrive", {
          enumerable: true,
          configurable: false,
          get: function() {
            return _onPageletArriveHooked;
          },
          set: function(value) {
            _onPageletArrive = value;
          }
        });
        console.log("App.onPageletArrive hooked");
      }
      Object.defineProperty(unsafeWindow || window, "App", {
        enumerable: true,
        configurable: false,
        get: function() {
          return _app;
        },
        set: function(value) {
          _app = value;
          hookOnPageletArrive();
        }
      });
    };
    
    code();
    
    var re0 = /(<a\s+href="\/p\/.{0,35}"><[a-z]{1,10}[^>]*)on[a-z]+=/gi;
    var re1 = /(<a\s+href="\/p\/)(.{0,35}".{0,35})("(?:(?:\s+[^>]*\s+)|\s+)title=").{0,35}".{0,35}(")/g;
    var re2 = /(<a\s+href="\/p\/)(.{0,35}".{0,35})("[^>]*target=_blank>)\2(<\/a>)/g;
    var re3 = /(<a\s+href="\/p\/)(.{0,35}".{0,35})("[^>]*class="user-(?:online|offline)" target=_blank><img\s+)/g;

    function filter(html) {
      //html = html.replace(re0, "$1data-dummy=");
      
      html = html.replace(re1, function(match, p1, p2, p3, p4) {
        var escaped = p2.replace(/"/g, "&quot;");
        //console.log(match + " ==========> " + p1 + escaped + p3 + escaped + p4);
        return p1 + escaped + p3 + escaped + p4;
      });
      html = html.replace(re2, function(match, p1, p2, p3, p4) {
        var escaped = p2.replace(/"/g, "&quot;");
        var strongEscaped = escaped.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        //console.log(match + " ==========> " + p1 + escaped + p3 + strongEscaped + p4);
        return p1 + escaped + p3 + strongEscaped + p4;
      });
      html = html.replace(re3, function(match, p1, p2, p3) {
        var escaped = p2.replace(/"/g, "&quot;");
        //console.log(match + " ==========> " + p1 + escaped + p3);
        return p1 + escaped + p3;
      });
      
      return html;
    }

    function matchesSelector(element, selector) {
        if (element.mozMatchesSelector) {
            return element.mozMatchesSelector(selector);
        } else if (element.webkitMatchesSelector) {
            return element.webkitMatchesSelector(selector);
        } else if (element.matchesSelector) {
            return element.matchesSelector(selector);
        } else {
            try {
                var elems = element.parentElement ? element.parentElement.querySelectorAll(selector) : [];
                for (var i = 0, l = elems.length; i < l; i++) {
                    if (elems[i] === element) return true;
                }
            } catch (ex) { }
            return false;
        }
    }
    
    function fixLink(link) {
      var html = link.outerHTML;
      // preprocess
      var newhtml = filter(html);
      if (html != newhtml) {
        link.outerHTML = newhtml;
      }
    }
    
    w.addEventListener('DOMNodeInserted', function(event) {
      if (matchesSelector(event.target, selToFix)) {
        fixLink(event.target);
      } else {
        var links = event.target.querySelectorAll ? event.target.querySelectorAll(selToFix) : [];
        for (var i = 0; i < links.length; i++) {
          fixLink(links[i].parentElement || links[i]);
        }
      }
    }, true);
    
    // prevent script execution inside link tags & paragraphs
    w.addEventListener("beforescriptexecute", function(event) {
      if (!event.cancelable) return;
      if (matchesSelector(event.target, "a script, p script")) {
        //console.log("Canceled script execution: " + event.target.innerHTML);
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    
    // prevent image onload/onerror handlers from running
    w.addEventListener("error", function(event) {
      if (event.target.localName && event.target.localName.toLowerCase() == "img") {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    w.addEventListener("load", function(event) {
      if (event.target.localName && event.target.localName.toLowerCase() == "img") {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
})(window);
