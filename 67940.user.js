// ==UserScript==
// @name           CustomTwitter
// @namespace      h13i32maru
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/invitations/*
// @exclude        http://twitter.com/settings/*
// @exclude        http://twitter.com/goodies/*
// @exclude        https://twitter.com/invitations/*
// @exclude        https://twitter.com/settings/*
// @exclude        https://twitter.com/goodies/*
// ==/UserScript==
//script info
var name = "CustomTwitter";
var version = "2010-11-22";
var url = "http://h13i32maru.jp/gm/custom_twitter";
var versionUrl = url + "/version";
var resourceUrl = url + "/" + version;
var scriptUrl = "http://userscripts.org/scripts/show/67940";
var prefix = "h13i32maru::ct";
//

//script util
//{{{function createUtil()
function createUtil()
{
  var that;
  var util = {
    //{{{$ = function(selector , elm = document)
    $ : function(selector , elm)
    {
      elm = elm || document;
      return elm.querySelectorAll(selector);
    },
    //}}}
    //{{{head : function()
    head : function()
    {
      return document.getElementsByTagName("head")[0];
    },
    //}}}
  //{{{removeElementById : function(id)
  removeElementById : function(id)
  {
    var e = document.getElementById(id);
    if(!e){return;}
    e.parentNode.removeChild(e);
  },
  //}}}
    //{{{log : function(obj)
    log : function(obj)
    {
      if(typeof console == "object" && typeof console.log == "function"){
        console.log(obj);
      }
    },
    //}}}
    //{{{dateTime : function(unixTime)
    dateTime : function(unixTime)
    {
      var weekList = ["日" , "月" , "火" , "水" , "木" , "金" , "土"];
      var d = new Date(parseInt(unixTime));
      return d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + "(" + weekList[d.getDay()] + ")" + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    },
    //}}}
    //{{{getValue : function(key , _default)
    getValue : function(key , _default)
    {
      if(!window.localStorage)
      {
        that.log("can't user localStorage");
        return;
      }

      var value = window.localStorage.getItem(key);
      if(value != null)
      {
        //localStorageは文字のみの扱いのみなので、型変換を行う。
        if(value == "true"){ value = true; }
        else if(value == "false"){ value = false; }
        else if(value.match(/^[0-9.]+$/)){ value = Number(value); }
        return value;
      }
      else
      {
        return _default
      }
    },
    //}}}
    //{{{setValue : function(key , value)
    setValue : function(key , value)
    {
      if(!window.localStorage)
      {
        that.log("can't user localStorage");
        return;
      }

      window.localStorage.setItem(key , value);
    },
    //}}}
    //{{{deleteValue : function(key)
    deleteValue : function(key)
    {
      if(!window.localStorage)
      {
        that.log("window.localStorage and GM_deleteValue are not defined");
      }
      window.localStorage.removeItem(key);
    },
    //}}}
    //{{{listValues : function()
    listValues : function()
    {
      if(!window.localStorage)
      {
        Util.log("window.localStorage and GM_listValues are not defined");
        return;
      }

      //localStorage.length is not availabled in user script
      var list = [];
      var key;
      try{
        for(var i = 0 ; ; i++)
        {
          key = window.localStorage.key(i);
          if(!key){ break; }
          list.push(key);
        }
      }
      catch(e) { }
      return list;
    },
    //}}}
    //{{{addStyleText : function(id , text)
    addStyleText : function(id , text)
    {
      if(document.getElementById(id))
      {
        var e = document.getElementById(id);
        e.parentNode.removeChild(e);
      }

      var e = document.createElement("style");
      if(id){ e.id = id; }
      e.textContent = text;
      document.getElementsByTagName("head")[0].appendChild(e);
    },
    //}}}
    //{{{addStyleUrl : function(id , url)
    addStyleUrl : function(id , url)
    {
      var e = document.createElement("link");
      e.id = id;
      e.rel = "stylesheet";
      e.type = "text/css";
      e.href = url;
      document.getElementsByTagName("head")[0].appendChild(e);
    },
    //}}}
    //{{{encodeUrlParam : function(param)
    encodeUrlParam : function(param)
    {
      var name;
      var data = [];
      param = param || {};

      for(name in param)
      {
        if(param.hasOwnProperty(name))
        {
          data.push(name + "=" + param[name]);
        }
      }

      return data.join("&");
    },
    //}}}
    //{{{xhr : function(url , param , callback , method)
    xhr : function(url , param , callback , method)
    {
      var data = "";

      method = method || "GET";

      var req = new XMLHttpRequest;

      if(callback)
      {
        req.onreadystatechange = function(){ if(req.readyState == 4) callback(req.responseText , req); }
      }

      if(param)
      {
        param = that.encodeUrlParam(param);
        if(method.toUpperCase() == "GET" && param.length > 0)
        {
          url = url + "?" + param;
          param = null;
        }
      }

      req.open(method , url , true);
      req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8");
      req.send(param);
    },
    //}}}
    //{{{browser : function()
    browser : function()
    {
      var ua = navigator.userAgent;
      if(ua.indexOf("Firefox") > -1){ return "firefox"; }
      if(ua.indexOf("Chrome") > -1){ return "chrome"; }
      return "";
    },
    //}}}
    //{{{os : function()
    os : function()
    {
      if(navigator.platform.indexOf("Mac") > -1){ return "mac"; }
      if(navigator.platform.indexOf("Win") > -1){ return "windows"; }
      return null;
    },
    //}}}
    //{{{checkVersion : function()
    checkVersion : function()
    {
      var checkVersionKey = prefix + "::checkVersion";
      that.xhr(versionUrl , null , callback);

      function callback(latestVersion)
      {
        var latestVersion = parseInt( latestVersion.replace(/-/g , "") );
        var thisVersion = parseInt( version.replace(/-/g , "") );

        if(thisVersion < latestVersion)
        {
          if(that.getValue(checkVersionKey , true) == false){ return; }

          var text = "";
          text += "%nameの新しいバージョンがリリースされています。\n";
          text += "以下のダウンロードサイトから最新版をインストールすることができます。\n";
          text += "%url";

          /*アンインストールしなくてよくなった
          if(that.browser() == "chrome")
          {
            text += "\n\n※GoogleChromeの場合、一度%nameをアンインストールしてから最新版をインストールしてください";
          }
          */

          text += "\n\nダウンロードサイトへ移動しますか?";

          text = text.replace(/%name/ , name).replace(/%url/ , scriptUrl);

          if(confirm(text))
          {
            window.open(scriptUrl , "_self");
          }

          //一度更新のアナウンスをしたら最新版がインストールされるまでチェックしない
          that.setValue(checkVersionKey , false);
        }
        else
        {
          that.setValue(checkVersionKey , true);
        }
      }
    },
    //}}}
    //{{{GM_addStyle : function(id , resourceName)
    GM_addStyle : function(id , resourceName)
    {
      if(typeof(GM_getResourceText) == "function")
      {
        var e = document.createElement("style");
        e.id = id;
        e.textContent = GM_getResourceText(resourceName);
        document.getElementsByTagName("head")[0].appendChild(e);
      }
    }
    //}}}
  };

  that = util;

  return util;
}
//}}}
var util = createUtil();
//

//{{{function setOSBrowser()
function setOSBrowser()
{
  document.body.className += " " + util.os();
  document.body.className += " " + util.browser();
}
//}}}
//{{{function hideTag()
function hideTag()
{
  var style = "*[class^='ct-']{ position:absolute; z-index:-1; }";
  util.addStyleText("ct-hide-tag" , style);
}
//}}}
//{{{function getPageType()
function getPageType()
{
  if(document.body.id.indexOf("front") > -1){ return "front"; }
  if(util.$("#doc")[0].className.indexOf("route-home") > -1){ return "home"; }
  else{ return null ; }
}
//}}}
//{{{var stream = function(){}()
var stream = function(){
  var that;
  var stream = {
    count : 0,
    handler : [],
    init : function()
    {
      setInterval(that.update , 300);
    },
    addHandler : function(handler)
    {
      that.handler.push(handler);
    },
    update : function()
    {
      var e = util.$(".stream-items .stream-item");
      if(!e){ return; }
      var nowCount = e.length;
      if(nowCount == that.count){ return ; }
      that.count = nowCount;
      for(var i = 0 ; i < that.handler.length ; i++)
      {
        that.handler[i]();
      }
    }
  }

  that = stream;
  return stream;
}();
//}}}
//{{{function commonCustom()
function commonCustom()
{
  var myName = getMyName();
  //{{{function getMyName()
  function getMyName()
  {
    var e = util.$("#screen-name")[0];
    if(e){ return e.textContent.replace(/[\s]/g , ""); }
    else{ return ""; }
  }
  //}}}
  //{{{function init()
  function init()
  {
    setCommonStyle();
    setScreenName();
    setDateTime();
    setUserMenu();
    setMentionToMe();

    userMenu.restore();

    stream.addHandler(setScreenName);
    stream.addHandler(setDateTime);
    stream.addHandler(setUserMenu);
    stream.addHandler(setMentionToMe);
    
  }
  //}}}
  //{{{function setCommonStyle()
  function setCommonStyle()
  {
    util.addStyleUrl("ct-common" , resourceUrl + "/style.css");
  }
  //}}}
  //{{{function setScreenName()
  function setScreenName()
  {
    var name;
    var list = util.$(".stream-items .stream-item:not([data-screen-name]) .stream-item-content");
    for(var i = 0 ; i < list.length ; i++){
      name = list[i].getAttribute("data-screen-name");
      list[i].parentNode.setAttribute("data-screen-name" , name);
    }
  }
  //}}}
  //{{{function setDateTime()
  function setDateTime()
  {
    var e;
    var list = util.$(".stream-item ._timestamp:not([data-ct-date-time]) , .stream-item ._old-timestamp:not([data-ct-date-time])");
    for(var i = 0 ; i < list.length ; i++)
    {
      e = document.createElement("span");
      e.className = "ct-date-time";
      e.textContent = util.dateTime(list[i].getAttribute("data-time"));

      list[i].setAttribute("data-ct-date-time" , true);

      list[i].parentNode.appendChild(e);
    }
  }
  //}}}
  //{{{function setUserMenu()
  function setUserMenu()
  {
    var ul;
    var li;
    var list = util.$(".stream-item .tweet-content .tweet-row:not([data-ct-user-menu]):nth-child(4)");
    for(var i = 0 ; i < list.length ; i++)
    {
      ul = document.createElement("ul");
      ul.className = "ct-user-menu";

      li = document.createElement("li");
      li.textContent = "default";
      li.addEventListener("click" , userMenu.defaultHandler , false);
      li.title = "通常表示";
      ul.appendChild(li);

      li = document.createElement("li");
      li.textContent = "light";
      li.addEventListener("click" , userMenu.lightHandler , false);
      li.title = "強調表示";
      ul.appendChild(li);

      li = document.createElement("li");
      li.textContent = "hide";
      li.addEventListener("click" , userMenu.hideHandler , false);
      li.title = "非表示";
      ul.appendChild(li);

      list[i].appendChild(ul);
      list[i].setAttribute("data-ct-user-menu" , true);
    }
  }
  //}}}
  //{{{function setMentionToMe()
  function setMentionToMe()
  {
    if(location.href.indexOf("/mentions") > -1){ return; }
    var list = util.$(".stream-items .stream-item:not([data-ct-mention-to-me])");
    var text;
    for(var i = 0 ; i < list.length ; i++)
    {
      //text = util.$(".tweet-text" , list[i])[0].textContent;
      text = util.$(".tweet-text" , list[i])[0];
      if(!text){ continue; }
      text = text.textContent;
      if(text.indexOf("@" + myName) > -1)
      {
        list[i].className += " ct-mention-to-me";
        list[i].setAttribute("data-ct-mention-to-me" , true);
      }
    }
  }
  //}}}
  //{{{userMenu = function(){}()
  userMenu = function(){
    var that;
    var prefix = "h13i32maru::ct::user::";
    var menu = {
      //{{{setDefault : function(name)
      setDefault : function(name)
      {
        util.removeElementById("ct-user-" + name);
        util.deleteValue(prefix + name);
      },
      //}}}
      //{{{setLight : function(name)
      setLight : function(name)
      {
        var style = "";
        style += ".stream-item[data-screen-name='%name']{ background:#ffff88; }";
        style += "body.gstyle #doc.route-home.stream-item[data-screen-name='%name'] { margin:4px; -moz-border-radius:4px; -webkit-border-radius:4px;}";
        style += "body.gstyle #doc.route-home.stream-item[data-screen-name='%name']:hover { background:#ffff88 !important; margin:4px !important;}";
        style = style.replace(new RegExp("%name" ,"g") , name);

        var id = "ct-user-" + name;
        util.addStyleText(id , style);
        util.setValue(prefix + name , "light");
      },
      //}}}
      //{{{setHide : function(name)
      setHide : function(name)
      {
        var style = "";
        style += ".stream-item[data-screen-name='%name']{ min-height:16px; }";
        style += ".stream-item[data-screen-name='%name']:before{ content:\"%name\"; color:#0084b4; padding-left:4px; opacity:0.8; font-size:10px;}";
        style += "body.gstyle #doc.route-home .stream-item[data-screen-name='%name']:before{ padding-left:16px;}";
        style += ".stream-item[data-screen-name='%name'] > div{ display:none }";
        style += ".stream-item[data-screen-name='%name']:hover:before{ display:none; }";
        style += ".stream-item[data-screen-name='%name']:hover > div{ display:block }";
        style = style.replace(new RegExp("%name" ,"g") , name);

        var id = "ct-user-" + name;
        util.addStyleText(id , style);

        util.setValue(prefix + name , "hide");
      },
      //}}}
      //{{{defaultHandler : function(ev)
      defaultHandler : function(ev)
      {
        that.setDefault(that.getScreenName(ev.target));
        ev.stopPropagation();
      },
      //}}}
      //{{{lightHandler : function(ev)
      lightHandler : function(ev)
      {
        that.setLight(that.getScreenName(ev.target));
        ev.stopPropagation();
      },
      //}}}
      //{{{hideHandler : function(ev)
      hideHandler : function(ev)
      {
        that.setHide(that.getScreenName(ev.target));
        ev.stopPropagation();
      },
      //}}}
      //{{{getScreenName : function(elm)
      getScreenName : function(elm)
      {
        var name;
        //親の要素にさかのぼってscreen-nameを探す
        while(true)
        {
          elm = elm.parentNode;
          if(!elm){ return ""; }

          name = elm.getAttribute("data-screen-name");
          if(name){ return name; }
        }
      },
      //}}}
      //{{{restore : function()
      restore : function()
      {
        var keyList = util.listValues();
        var name;
        var type;
        for(var i = 0 ; i< keyList.length ; i++)
        {
          if(keyList[i].indexOf(prefix) == 0)
          {
            name = keyList[i].replace(prefix , "");
            type = util.getValue(keyList[i]);
            if(type == "light"){ that.setLight(name); }
            else if(type == "hide"){ that.setHide(name); }
          }
        }
      }
      //}}}
    };
    that = menu;
    return menu;
  }();
  //}}}

  init();
}
//}}}
//{{{var googleCustomInfo = {}
var googleCustomInfo = {
  isGStyle : false,
  titleTimerId : null,
  handler : [],
  //{{{init : function()
  init : function()
  {
    this.addHandler(this.setFavicon);
    this.addHandler(this.setTitle);

    this.switchGoogleStyle(true);
  },
  //}}}
  //{{{addHandler : function(func)
  addHandler : function(func)
  {
    this.handler.push(func);
  },
  //}}}
  //{{{setFavicon : function(type)
  setFavicon : function(type)
  {
    util.removeElementById("ct-favicon");
    var e = document.createElement("link");
    e.id = "ct-favicon";
    e.type = "image/x-icon";
    e.rel = "shortcut icon";
    if(type == true)
    {
      e.href = "http://www.google.co.jp/favicon.ico";
    }
    else
    {
      e.href = "/phoneix/favicon.ico";
    }
    util.head().appendChild(e);
  },
  //}}}
  //{{{setTitle : function(type)
  setTitle : function(type)
  {
    if(type == true)
    {
      //unsafeWindow.document.watch()でしか監視できない
      document["title"] = document["title"].replace("Twitter" , "Google");
      this.titleTimerId = setInterval(function()
      {
        document["title"] = document["title"].replace("Twitter" , "Google");
      } , 1000);
    }
    else
    {
      if(this.titleTimerId){ clearInterval(this.titleTimerId); }
      document["title"] = document["title"].replace("Google" , "Twitter");
    }
  },
  //}}}
  //{{{switchGoogleStyle : function(restore)
  switchGoogleStyle : function(restore)
  {
    var root = document.body;
    var key = "h13i32maru::ct::gstyle";
    var on;
    if(restore === true)
    {
      //現在の設定を復元
      on = util.getValue(key , false);
    }
    else
    {
      //設定をトグル
      if(root.className.match(/gstyle/))
      {
        on = false;
      }
      else
      {
        on = true;
      }
    }

    if(on){ root.className += " gstyle"; }
    else{ root.className = root.className.replace(/ gstyle/g , ""); }

    this.isGStyle = on;
    util.setValue(key , on);
    for(var i = 0 ; i < this.handler.length ; i++)
    {
      this.handler[i](on);
    }
  }
  //}}}
};
//}}}
//{{{function googleCustomFront()
function googleCustomFront()
{
  //{{{function init()
  function init()
  {
    setGoogleStyle();
    setGoogleButton();
    setButtonText();
    setDummyHeader();
    setDummyButton();
    setDummyPlace();
    setDummySearchOption();
    setDummyChangeBG();
  }
  //}}}
  //{{{function setGoogleStyle()
  function setGoogleStyle()
  {
    util.addStyleUrl("ct-gstyle-front" , resourceUrl + "/gstyle_front.css");
  }
  //}}}
  //{{{function setGoogleButton()
  function setGoogleButton()
  {
    var e = document.createElement("div");
    e.className = "ct-google-button";
    e.textContent = "G";
    e.title = "Googleレイアウトの切り替え";
    
    document.body.appendChild(e);

    e.addEventListener("click" , function()
    {
      googleCustomInfo.switchGoogleStyle();
    } , false);
  }
  //}}}
  //{{{function setButtonText()
  function setButtonText()
  {
    var e = util.$("#signin_submit")[0];
    e.setAttribute("data-ct-original" , e.value);
    if(googleCustomInfo.isGStyle){ e.value = "Google 検索"; }
    googleCustomInfo.addHandler(function(gstyle)
    {
      if(gstyle) { e.value = "Google 検索"; }
      else { e.value = e.getAttribute("data-ct-original"); }
    });
  }
  //}}}
  //{{{function setDummyHeader()
  function setDummyHeader()
  {
    var p = document.createElement("div");
    p.className = "ct-dummy-header";
    var html = "<div>-ウェブ--画像--動画--地図--ニュース--ショッピング--Gmail--その他--▼-</div> <div>-twitter@gmail.com-|-iGoogle-|-設定--▼-|-ログアウト-</div>".replace(/-(.+?)-/g , "<span>$1</span>");
    p.innerHTML = html;

    document.body.appendChild(p);
  }
  //}}}
  //{{{function setDummyButton()
  function setDummyButton()
  {
    var e = document.createElement("span");
    e.innerHTML = "I'm Feeling Lucky";
    e.className = "ct-dummy-lucky";

    util.$("#signin p.remember")[0].appendChild(e);
  }
  //}}}
  //{{{function setDummyPlace()
  function setDummyPlace()
  {
    var e = document.createElement("span");
    e.className = "ct-dummy-place";
    e.textContent = "Twitter";

    util.$("#signin_menu")[0].appendChild(e);
  }
  //}}}
  //{{{function setDummySearchOption()
  function setDummySearchOption()
  {
    var e = document.createElement("div");
    e.className = "ct-dummy-search-option";
    e.innerHTML = "<div>検索オプション</div><div>言語ツール</div>";
    util.$("#signin_menu")[0].appendChild(e);
  }
  //}}}
  //{{{function setDummyChangeBG()
  function setDummyChangeBG()
  {
    var e = document.createElement("span");
    e.className = "ct-dummy-change-bg";
    e.innerHTML = "背景画像を変更する";
    document.body.appendChild(e);
  }
  //}}}

  if(getPageType() == "front"){ init(); }
}
//}}}
//{{{function googleCustomHome()
function googleCustomHome()
{
  //{{{function init()
  function init()
  {
    setGoogleStyle();
    setRetweetUser();
    setShortText();
    setDummyTweetIcon();
    setDummyDashboardIcon();
    setDummyGoogleLogo();
    setDummyNav();
    setDummySearch();
    setDummyDashboard();
    setDummyBorder();
    setGoogleButton();

    stream.addHandler(setRetweetUser);

  }
  //}}}
  //{{{function setGoogleStyle()
  function setGoogleStyle()
  {
    util.addStyleUrl("ct-gstyle-home" , resourceUrl + "/gstyle_home.css");
  }
  //}}}
  //{{{function setShortText()
  function setShortText()
  {
    var list = util.$(".dashboard .component div[class$='activity'] .title-link");
    for(var i = 0 ; i < list.length ; i++)
    {
      list[i].setAttribute("data-orignal-text" , list[i].innerHTML);
      list[i].innerHTML = list[i].innerHTML.
        replace("あなたのツイート" , "ツイート").
        replace("フォローしている" , "フォロー").
        replace("フォローされている" , "フォロワー");
    }
  }
  //}}}
  //{{{function setButtonText()
  function setButtonText()
  {
    var e = util.$(".tweet-button")[0];
    e.setAttribute("data-original-text" , e.textContent);
    e.textContent = "検索";
  }
  //}}}
 //{{{function setRetweetUser()
  //retweetユーザを下部に表示
  function setRetweetUser()
  {
    var e;
    var list = util.$(".stream-item-content[data-retweet-id]:not([data-ct-retweet])");
    for(var i = 0; i < list.length ; i++)
    {
      e = document.createElement("a");
      e.className = "ct-dummy-retweet";
      e.textContent = list[i].querySelector(".tweet-corner .tweet-meta .icons em").textContent;
      list[i].querySelector(".tweet-actions").appendChild(e);
      list[i].setAttribute("data-ct-retweet" , true);
    }
  }
  //}}}
  //{{{function setDummyTweetIcon()
  function setDummyTweetIcon()
  {
    var e;
    var list = util.$(".stream-item .tweet-row:first-child");
    for(var i = 0 ; i < list.length ; i++)
    {
      e = document.createElement("span");
      e.className = "ct-dummy-star-icon";
      list[i].appendChild(e);

      e = document.createElement("span");
      e.className = "ct-dummy-magnifier-icon";
      list[i].appendChild(e);
    }
  }
  //}}}
  //{{{function setDummyDashboardIcon()
  function setDummyDashboardIcon()
  {
    var e;
    var list = util.$(".dashboard .component .tweet-activity , .dashboard .component .your-activity");
    for(var i = 0; i < list.length ; i++)
    {
      e = document.createElement("span");
      e.id = "ct-dummy-dashboard-icon" + i;
      e.className = "ct-dummy-dashboard-icon";
      list[i].insertBefore(e , list[i].firstChild);
    }
    
  }
  //}}}
  //{{{function setDummyGoogleLogo()
  function setDummyGoogleLogo()
  {
    var e = document.createElement("a");
    e.href = "/";
    e.className = "ct-dummy-google-logo";
    util.$(".dashboard")[0].appendChild(e);
  }
  //}}}
  //{{{function setDummyNav()
  function setDummyNav()
  {
    var e = document.createElement("span");
    e.className = "ct-dummy-nav";
    e.innerHTML = " | <span>ウェブ履歴</span> | <span>設定</span><font style='color:#2200c1;font-size:0.8em;'> ▼ </font> | <span>ログアウト</span>";
    util.$("#session")[0].appendChild(e);
  }
  //}}}
  //{{{function setDummySearch()
  function setDummySearch()
  {
    var e = document.createElement("span");
    e.className = "ct-dummy-search";
    e.textContent = "検索オプション";

    var p = util.$(".tweet-button-container")[0];
    if(!p){return;}
    p.appendChild(e);
  }
  //}}}
  //{{{function setDummyDashboard()
  function setDummyDashboard()
  {
    var _parent = util.$(".dashboard")[0];

    var e = document.createElement("div");
    e.id = "ct-dummy-dashboard0";
    e.className = "ct-dummy-dashboard";
    e.innerHTML = "<div style='font-weight:bold;color:#000000;'>東京都渋谷区</div><div><span></span>場所を変更</div>";
    _parent.appendChild(e);

    e = document.createElement("div");
    e.id = "ct-dummy-dashboard1";
    e.className = "ct-dummy-dashboard";
    e.innerHTML = "<div style='font-weight:bold;color:#000000;'>ウェブ全体から検索</div><div style='padding-bottom:8px;'>日本語のページを検索</div><div style='font-weight:bold;color:#000000';>期間指定なし</div><div style='padding-bottom:8px;'>3か月以内</div><div style='font-weight:bold;color:#000000;'>すべての結果</div><div>ワインダーホイール</div><div>タイムライン</div><div style='padding-bottom:8px;'>画像を含むサイト</div><div><span></span>もっとツールを見る</div>";
    _parent.appendChild(e);
  }
  //}}}
  //{{{function setDummyBorder()
  function setDummyBorder()
  {
    var e = document.createElement("div");
    e.className = "ct-dummy-border";
    util.$("#doc")[0].appendChild(e);
  }
  //}}}
  //{{{function setGoogleButton()
  function setGoogleButton()
  {
    var e = document.createElement("div");
    e.className = "ct-google-button";
    e.textContent = "G";
    e.title = "Googleレイアウトの切り替え";
    
    util.$("#doc")[0].appendChild(e);

    e.addEventListener("click" , function()
    {
      googleCustomInfo.switchGoogleStyle();
    } , false);
  }
  //}}}

  if(getPageType() == "home")
  {
    init();
  }
}
//}}}
//{{{function init()
function init()
{
  util.checkVersion();

  setOSBrowser();

  hideTag();
  googleCustomInfo.init();

  if(getPageType() == "front")
  {
    googleCustomFront();
  }
  else
  {
    var count = 0;
    var timerId;
    var pageType;
    var streamList;
    timerId = setInterval(function()
    {
      pageType = getPageType();
      streamList = util.$(".stream-items .stream-item");
      if(pageType == "home" && streamList && streamList.length >= 20)
      {
        clearInterval(timerId);
        stream.init();
        commonCustom();
        googleCustomHome();
      }
      count++;
      if(count == 20){ clearInterval(timerId); }
    } , 500);
  }
}
//}}}

init();
