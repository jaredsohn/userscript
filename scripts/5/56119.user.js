// ==UserScript==
// @name           Hatena Status
// @namespace      h13i32maru
// @include        http://d.hatena.ne.jp/*
// @exclude        http://d.hatena.ne.jp/diarylist*
// @exclude        http://d.hatena.ne.jp/*/edit*
// @exclude        http://d.hatena.ne.jp/*/archive*
// @exclude        http://d.hatena.ne.jp/*/draft*
// @exclude        http://d.hatena.ne.jp/*/*list
// @exclude        http://d.hatena.ne.jp/*/linkscore*
// @exclude        http://d.hatena.ne.jp/*/design*
// @exclude        http://d.hatena.ne.jp/*/config*
// @exclude        http://d.hatena.ne.jp/*/option*
// @exclude        http://d.hatena.ne.jp/*/port*
// @exclude        http://d.hatena.ne.jp/*/delete*
// @exclude        http://d.hatena.ne.jp/*/tools*
// @exclude        http://d.hatena.ne.jp/*/guide*
// @include        http://blog.livedoor.jp/*
// @exclude        http://tophatenar.com/*
// @resource       style http://h13i32maru.sakura.ne.jp/gm/hatena_status/style.css
// @resource       version http://h13i32maru.sakura.ne.jp/gm/hatena_status/version.txt
// ==/UserScript==
(function()
{
  //{{{function sendRequest(url , async , method , data , callback , callbackArgument)
  function sendRequest(url , async , method , data , callback , callbackArgument)
  {
    var req = new XMLHttpRequest;

    if(async){
      req.onreadystatechange = function(){ if(req.readyState == 4) callback(req , callbackArgument); }
    }

    if(method.toUpperCase() == "GET" && data.length > 0){
      url += "?" + data;
      data = "";
    }

    req.open(method , url , async);
    req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8");
    req.send(data);
    if(!async){ callback(req , callbackArgument);}
  }
  //}}}
  //{{{function insertComma(num)
  function insertComma(num)
  {
    var str = "" + num;
    var list = [];
    for(var i = str.length ; i > 0 ; i -= 3)
    {
      list.push(str.substring(i - 3 , i));
    }
    return list.reverse().join(",");
  }
  //}}}
  //{{{function getInfo()
  function getInfo()
  {
    var info = new Object();

    if(location.hostname.match(/^.*[.]livedoor[.]biz/) != null)
    {
      info.id = location.hostname.replace(/[.]livedoor[.]biz/ , "");
      info.url = location.protocol + "//" + location.host + "/";
    }
    else
    {
      info.id = location.pathname.replace(/^[\/]/ , "").replace(/[\/].*/ , "");
      info.url = location.protocol + "//" + location.host + "/" + info.id + "/";
    }

    if(location.hostname == "d.hatena.ne.jp")
    {
      info.hatena = true;
    }
    else
    {
      info.hatena = false;
    }

    return info; 
  }
  //}}}
  //{{{function initStatus(id , url , title , _parent)
  function initStatus(id , url , title , _parent)
  {
    var a = document.createElement("a");
    a.id = id;
    a.className = "Status";
    if(url != ""){ a.href = url; }
    a.title = title;

    var span = document.createElement("span");
    a.appendChild(span);
    span.innerHTML = "?";
    _parent.appendChild(a);

    return span;
  }
  //}}}
  //{{{function setToggleStatus(info , elm)
  function setToggleStatus(info , elm)
  {
    //{{{function open()
    function open()
    {
      var main = document.getElementById("StatusMain");
      main.style.display = "inline";
      elm.innerHTML = "<";
      elm.parentNode.title = "閉じる";
      GM_setValue(info.id + ":open" , true);
    }
    //}}}
    //{{{function close()
    function close()
    {
      var main = document.getElementById("StatusMain");
      main.style.display = "none";
      elm.innerHTML = ">";
      elm.parentNode.title = "開く";
      GM_setValue(info.id + ":open" , false);
    }
    //}}}
    //{{{function toggle()
    function toggle()
    {
      var main = document.getElementById("StatusMain");
      if(main.style.display == "inline" || main.style.display == "")
      {
        close();
      }
      else
      {
        open();
      }
    }
    //}}}

    elm.innerHTML = "<";
    elm.parentNode.title = "閉じる";
    elm.parentNode.addEventListener("click" , toggle , true);

    if(GM_getValue(info.id + ":open" , true))
    {
      open();
    }
    else
    {
      close();
    }
  }
  //}}}
  //{{{function setOptionStatus(info , elm)
  function setOptionStatus(info , elm)
  {
    elm.innerHTML = "#";
    elm.parentNode.addEventListener("click" , showOptionPrompt , true);

    var option = GM_getValue(info.id + "option" , null);
    if(option != null){ changeOption(option); }

    function showOptionPrompt()
    {
      var option = GM_getValue(info.id + "option" , null);
      option = prompt("Hatena Statusのオプションを変更することができます。\n複数指定する場合はスペースで区切ります｡\n\nfixed=[0|1] :\t1を指定すると表示する位置を固定します\nopacity=[0|1] :\t1を指定すると完全に不透明にします\n\n入力例) fixed=1 opacity=1" , option);
      if(option != null)
      {
        changeOption(option);
        GM_setValue(info.id + "option" , option);
      }
    }
  }
  //}}}
  //{{{function setDiaryStatus(info , elm)
  function setDiaryStatus(info , elm)
  {
    if(info.hatena == false)
    {
      return;
    }

    sendRequest("http://d.hatena.ne.jp/" + info.id + "/about" , false , "GET" , "" , callback , null);

    function callback(req)
    {
      if(req.responseText.match(/ユーザー登録から本日までに日記をつけた日数：<strong>([0-9]*)<\/strong>日/))
      {
        diaryNum = parseInt(RegExp.$1);
        elm.innerHTML = "<span class='Icon'>D</span>" + insertComma(diaryNum);
      }
    }
  }
  //}}}
  //{{{function setBookmarkStatus(info , elm)
  function setBookmarkStatus(info , elm)
  {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://h13i32maru.sakura.ne.jp/api/hatenaBookmark.pl?func=addBookmarkNum&url=" + info.url;
    document.body.appendChild(script);

    window.wrappedJSObject.addBookmarkNum = function(json)
    {
      var ratio = (diaryNum > 0 ? "(" + Math.round(json.count/diaryNum) + ")" : "");
      //elm.textContent = insertComma(json.count) + " users (" + ratio +")";
      elm.textContent = insertComma(json.count) + " users " + ratio;
    }
  }
  //}}}
  //{{{function setStarStatus(info , elm)
  function setStarStatus(info , elm)
  {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://s.hatena.ne.jp/blog.json/" + info.url + "?callback=addStarNum";
    document.body.appendChild(script);

    window.wrappedJSObject.addStarNum = function(json)
    {
      var ratio = (diaryNum > 0 ? "(" + Math.round(json.star_count/diaryNum) + ")" : "");
      elm.innerHTML = "<span class='Icon'>★</span>" + insertComma(json.star_count) + ratio;
    }
  }
  //}}}
  //{{{function setTopHatenar(elm)
  function setTopHatenar(elm)
  {
    elm.innerHTML = "H";
  }
  //}}}
  //{{{function setTwitter(elm)
  function setTwitter(elm)
  {
    elm.innerHTML = "T";
  }
  //}}}
  //{{{function checkVersion()
  function checkVersion()
  {
    var thisVersion = parseInt(GM_getResourceText("version"));

    function check(res)
    {
      var latestVersion = parseInt(res.responseText);

      if(thisVersion < latestVersion)
      {
        if(GM_getValue("checkVersion" , true) == false){ return; }

        GM_setValue("checkVersion" , false);//二度目のチェックを行わないためにfalseにする

        var url = "http://userscripts.org/scripts/show/56119";
        //alert("Hatena Statusの新しいバージョンがリリースされています。\n・最新のバージョン : "+latestVersion+"\n・現在のバージョン : "+thisVersion+"\n\n以下のダウンロードサイトを開きます。\n" + url);
        alert("Hatena Statusの新しいバージョンがリリースされています。\n以下のダウンロードサイトから最新版をインストールすることができます。\n" + url);
        GM_openInTab(url);
      }
      else
      {
        GM_setValue("checkVersion" , true);
      }
    }

    GM_xmlhttpRequest({method:"GET" , url:"http://h13i32maru.sakura.ne.jp/gm/hatena_status/version.txt" , onload:check});
  }
  //}}}
  //{{{function changeOption(option)
  function changeOption(option)
  {
    var list = option.split(" ");
    var kv;//key and value

    for(var i = 0 ; i < list.length; i++)
    {
      kv = list[i].split("=" , 2);
      switch(kv[0])
      {
        case "fixed":
          if(kv[1] == "1") { GM_addStyle("#HatenaStatus{ position:fixed;}"); }
          else if(kv[1] == "0") { GM_addStyle("#HatenaStatus{ position:absolute;}"); }
          break;
        case "opacity":
          if(kv[1] == "1") { GM_addStyle("#HatenaStatus{ opacity:1;}"); } 
          else if(kv[1] == "0") { GM_addStyle("#HatenaStatus{ opacity:0.6;}"); } 
          break;
      }
    }
  }
  //}}}

  var info = getInfo();
  if(info.id == ""){ return; }

  GM_addStyle(GM_getResourceText("style"));

  var _parent = document.body;
  var statusRoot = document.createElement("div");
  var statusNavi = document.createElement("span");
  var statusMain = document.createElement("span");

  statusRoot.id = "HatenaStatus";
  statusNavi.id = "StatusNavi";
  statusMain.id = "StatusMain";

  _parent.appendChild(statusRoot);
  statusRoot.appendChild(statusNavi);
  statusRoot.appendChild(statusMain);

  var toggle = initStatus("ToggleStatus" , "" , "" , statusNavi);
  setToggleStatus(info , toggle);

  var option = initStatus("OptionStatus" , "" , "オプションの変更" , statusMain);
  var bookmark = initStatus("BookmarkStatus" , "http://b.hatena.ne.jp/bookmarklist?url=" + info.url , "はてなブックマーク" , statusMain);
  var star = initStatus("StarStatus" , "http://s.hatena.ne.jp/" + info.id + "/" , "はてなスター" , statusMain);
  if(info.hatena == true) { var diary = initStatus("DiaryStatus" , "http://d.hatena.ne.jp/" + info.id + "/about" , "プロフィール" , statusMain); }
  var topHatenar = initStatus("TopHatenarStatus" , "http://tophatenar.com/view/" + info.url , "TopHatenar" , statusMain);
  var twitter = initStatus("TwitterStatus" , "http://twitter.com/" + info.id , "Twitter" , statusMain);
  var diaryNum = 0;

  setOptionStatus(info , option);
  if(info.hatena == true) { setDiaryStatus(info , diary); }
  setStarStatus(info , star);
  setBookmarkStatus(info , bookmark);
  setTopHatenar(topHatenar);
  setTwitter(twitter);

  checkVersion();
  
})();
