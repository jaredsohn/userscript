// ==UserScript==
// @name        newshelper
// @namespace   newshelper-userscript.g0v.tw
// @description g0v News Helper
// @author         racklin@gmail.com
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @match     https://www.facebook.com/*
// @match     http://www.facebook.com/*
// @run-at         document-end
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// @updateURL      http://userscripts.org/scripts/source/176144.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176144.user.js
// @version     1.0.3.1
// ==/UserScript==


(function(){
  var contentStyle;
  contentStyle = ".newshelper-warning {\n    background: hsl(0, 50%, 50%);\n    color: white;\n    font-size: large;\n    text-align: center;\n    width: 100%;\n    padding: 5px 0;\n}\n\n.newshelper-warning-facebook {\nbackground: hsl(50, 100%, 70%);\n   color: hsl(0, 0%, 20%);\n   font-size: medium;\n   text-align: center;\n   margin: 20px 0 10px 0;\n   padding: 0 0 10px 0;\n   -webkit-border-radius: 5px;\n      -moz-border-radius: 5px;\n           border-radius: 5px;\n}\n\n.newshelper-description {\n  display: block;\n  font-size: small;\n  margin-top: 5px;\n}\n\n.newshelper-description a {\n  color: hsl(0, 100%, 50%);\n  font-weight: bold;\n  padding-right: 20px;\n  background: transparent url(data:image/gif;base64,R0lGODlhEQDcAKIAAP////8AAGYAmQAzZv///wAAAAAAAAAAACH5BAUUAAQALAAAAAARANwAAAPmSLrc/m7IOeEAON/x9gQXGGVa1XgSyRGSEpLa0qIUSH1w7HL0t7asnI7RS62IQsxRdrtBntCodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+zxcL/oCAEAI5hAIPhoAAhIsOjCSBjouKGYcEfwqPhQuYiYGen0mNmYegipaYl6KWDKZ/o62rjp+ffba3uLm6u7y9vr/AwcLDxMXGx8jJynIBzc7OEAE50gEP1M4A0tkO2iTP3NnYGdUEzQrd0wvm18/s7aLk5dXu2OTm5fDg7c3bDegw8dTt+7ZsSgIAOw==) no-repeat 100% -200px;\n}\n\n.arrow-up {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid hsl(50, 100%, 70%);\n  position: relative;\n  top: -10px;\n  margin: 0 auto;\n}";
  (function($){
    var indexedDB, opened_db, addStyle, get_newshelper_db, get_time_diff, check_recent_seen, get_recent_report, sync_report_data, log_browsed_link, check_report, buildWarningMessage, censorFacebook, registerObserver, buildActionBar;
    indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    opened_db = null;
    addStyle = function(it){
      return GM_addStyle(it);
    };
    get_newshelper_db = function(cb){
      var request;
      if (null !== opened_db) {
        cb(opened_db);
        return;
      }
      request = indexedDB.open('newshelper', '6');
      request.onsuccess = function(event){
        opened_db = request.result;
        return cb(opened_db);
      };
      request.onerror = function(event){
        return console.log("IndexedDB error: " + event.target.errorCode);
      };
      return request.onupgradeneeded = function(event){
        var objectStore;
        try {
          event.currentTarget.result.deleteObjectStore('read_news');
        } catch (e$) {}
        objectStore = event.currentTarget.result.createObjectStore('read_news', {
          keyPath: 'id',
          autoIncrement: true
        });
        objectStore.createIndex('title', 'title', {
          unique: false
        });
        objectStore.createIndex('link', 'link', {
          unique: true
        });
        objectStore.createIndex('last_seen_at', 'last_seen_at', {
          unique: false
        });
        try {
          event.currentTarget.result.deleteObjectStore('report');
        } catch (e$) {}
        objectStore = event.currentTarget.result.createObjectStore('report', {
          keyPath: 'id'
        });
        objectStore.createIndex('news_title', 'news_title', {
          unique: false
        });
        objectStore.createIndex('news_link', 'news_link', {
          unique: false
        });
        return objectStore.createIndex('updated_at', 'updated_at', {
          unique: false
        });
      };
    };
    get_time_diff = function(time){
      var delta;
      delta = Math.floor(new Date().getTime() / 1000) - time;
      switch (true) {
      case delta < 60:
        return delta + " 秒前";
      case delta < 60 * 60:
        return Math.floor(delta / 60) + " 分鐘前";
      case delta < 60 * 60 * 24:
        return Math.floor(delta / 60 / 60) + " 小時前";
      default:
        return Math.floor(delta / 60 / 60 / 24) + " 天前";
      }
    };
    check_recent_seen = function(report){
      return get_newshelper_db(function(opened_db){
        var transaction, objectStore, index, get_request;
        transaction = opened_db.transaction('read_news', 'readonly');
        objectStore = transaction.objectStore('read_news');
        index = objectStore.index('link');
        get_request = index.get(report.news_link);
        return get_request.onsuccess = function(){
          if (!get_request.result) {
            return;
          }
          if (parseInt(get_request.result.deleted_at, 10)) {
            return;
          }
        };
      });
    };
    get_recent_report = function(cb){
      return get_newshelper_db(function(opened_db){
        var transaction, objectStore, index, request;
        transaction = opened_db.transaction('report', 'readonly');
        objectStore = transaction.objectStore('report');
        index = objectStore.index('updated_at');
        request = index.openCursor(null, 'prev');
        return request.onsuccess = function(){
          if (request.result) {
            cb(request.result.value);
            return;
          }
          return cb(null);
        };
      });
    };
    sync_report_data = function(){
      return get_newshelper_db(function(opened_db){
        return get_recent_report(function(report){
          var cachedTime, url;
          cachedTime = (report != null ? report.updated_at : void 8) != null ? parseInt(report.updated_at) : 0;
          url = "http://newshelper.g0v.tw/index/data?time=" + cachedTime;
          return GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(xhr){
              var ret, transaction, objectStore, i;
              ret = JSON.parse(xhr.responseText);
              transaction = opened_db.transaction('report', 'readwrite');
              objectStore = transaction.objectStore('report');
              if (ret.data) {
                i = 0;
                while (i < ret.data.length) {
                  objectStore.put(ret.data[i]);
                  check_recent_seen(ret.data[i]);
                  i++;
                }
              }
              return setTimeout(sync_report_data, 300000);
            }
          });
        });
      });
    };
    log_browsed_link = function(link, title){
      if (!link) {
        return;
      }
      return get_newshelper_db(function(opened_db){
        var transaction, objectStore, request, message;
        transaction = opened_db.transaction('read_news', 'readwrite');
        objectStore = transaction.objectStore('read_news');
        try {
          request = objectStore.add({
            title: title,
            link: link,
            last_seen_at: Math.floor(new Date().getTime() / 1000)
          });
        } catch (e$) {
          message = e$.message;
          GM_log("Error " + link + " , " + title + " , " + message);
        }
        return request.onerror = function(){
          var transaction, objectStore, index, get_request;
          transaction = opened_db.transaction('read_news', 'readwrite');
          objectStore = transaction.objectStore('read_news');
          index = objectStore.index('link');
          get_request = index.get(link);
          return get_request.onsuccess = function(){
            var put_request;
            return put_request = objectStore.put({
              id: get_request.result.id,
              title: title,
              last_seen_at: Math.floor(new Date().getTime() / 1000)
            });
          };
        };
      });
    };
    check_report = function(title, url, cb){
      if (!url) {
        return;
      }
      return get_newshelper_db(function(opened_db){
        var transaction, objectStore, index, get_request;
        transaction = opened_db.transaction('report', 'readonly');
        objectStore = transaction.objectStore('report');
        index = objectStore.index('news_link');
        get_request = index.get(url);
        return get_request.onsuccess = function(){
          if (get_request.result && !parseInt(get_request.result.deleted_at, 10)) {
            return cb(get_request.result);
          }
        };
      });
    };
    buildWarningMessage = function(options){
      return "<div class=\"newshelper-warning-facebook\">" + "<div class=\"arrow-up\"></div>" + "注意！您可能是<b>問題新聞</b>的受害者" + "<span class=\"newshelper-description\">" + $("<span></span>").append($("<a></a>").attr({
        href: options.link,
        target: "_blank"
      }).text(options.title)).html() + "</span>" + "</div>";
    };
    censorFacebook = function(baseNode){
      var censorFacebookNode;
      if (window.location.host.indexOf("www.facebook.com") !== -1) {
        censorFacebookNode = function(containerNode, titleText, linkHref){
          var matches, className, addedAction;
          matches = ("" + linkHref).match("^http://www.facebook.com/l.php\\?u=([^&]*)");
          if (matches) {
            linkHref = decodeURIComponent(matches[1]);
          }
          containerNode = $(containerNode);
          className = "newshelper-checked";
          if (containerNode.hasClass(className)) {
            return;
          } else {
            containerNode.addClass(className);
          }
          addedAction = false;
          containerNode.parent("div[role=article]").find(".uiStreamActionFooter").each(function(idx, uiStreamSource){
            var addedAction;
            $(uiStreamSource).find("li:first").append("· " + buildActionBar({
              title: titleText,
              link: linkHref
            }));
            return addedAction = true;
          });
          if (!addedAction) {
            containerNode.parent("div[role=article]").find(".uiStreamSource").each(function(idx, uiStreamSource){
              $($("<span></span>").html(buildActionBar({
                title: titleText,
                link: linkHref
              }))).insertBefore(uiStreamSource);
              if (idx !== 0) {
                return console.error(idx + titleText);
              }
            });
          }
          log_browsed_link(linkHref, titleText);
          return check_report(titleText, linkHref, function(report){
            containerNode.addClass(className);
            return containerNode.append(buildWarningMessage({
              title: report.report_title,
              link: report.report_link
            }));
          });
        };
        $(baseNode).find(".uiStreamAttachments").each(function(idx, uiStreamAttachment){
          var titleText, linkHref;
          uiStreamAttachment = $(uiStreamAttachment);
          if (!uiStreamAttachment.hasClass("newshelper-checked")) {
            titleText = uiStreamAttachment.find(".uiAttachmentTitle").text();
            linkHref = uiStreamAttachment.find("a").attr("href");
            return censorFacebookNode(uiStreamAttachment, titleText, linkHref);
          }
        });
        $(baseNode).find(".shareUnit").each(function(idx, shareUnit){
          var titleText, linkHref;
          shareUnit = $(shareUnit);
          if (!shareUnit.hasClass("newshelper-checked")) {
            titleText = shareUnit.find(".fwb").text();
            linkHref = shareUnit.find("a").attr("href");
            return censorFacebookNode(shareUnit, titleText, linkHref);
          }
        });
        return $(baseNode).find('._6kv').not('newshelper-checked').each(function(idx, userContent){
          var titleText, linkHref;
          userContent = $(userContent);
          titleText = userContent.find('.mbs').text();
          linkHref = userContent.find('a').attr('href');
          return censorFacebookNode(userContent, titleText, linkHref);
        });
      }
    };
    registerObserver = function(){
      var MutationObserver, mutationObserverConfig, throttle, mutationObserver;
      MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      mutationObserverConfig = {
        target: document.getElementsByTagName('body')[0],
        config: {
          attributes: true,
          childList: true,
          characterData: true
        }
      };
      throttle = function(){
        var timer_;
        return function(fn, wait){
          if (timer_) {
            clearTimeout(timer_);
          }
          return timer_ = setTimeout(fn, wait);
        };
      }();
      mutationObserver = new MutationObserver(function(mutations){
        return throttle(function(){
          return censorFacebook(document.body);
        }, 1000);
      });
      return mutationObserver.observe(mutationObserverConfig.target, mutationObserverConfig.config);
    };
    buildActionBar = function(options){
      var url;
      url = "http://newshelper.g0v.tw";
      if ("undefined" !== typeof options.title && "undefined" !== typeof options.link) {
        url += "?news_link=" + encodeURIComponent(options.link) + "&news_title= " + encodeURIComponent(options.title);
      }
      return "<a href=\"" + url + "\" target=\"_blank\">回報給新聞小幫手</a>";
    };
    (function(){
      addStyle(contentStyle);
      censorFacebook(document.body);
      sync_report_data();
      return registerObserver();
    })();
  }.call(this, jQuery));
}).call(this);
