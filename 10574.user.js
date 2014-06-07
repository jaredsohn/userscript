// ==UserScript==
// @name           Facebook Videos Fix
// @description    Allows you to play videos without a page reload
// @include        http://*.facebook.com/*
// ==/UserScript==
w = document;
x = new Array();
count = 0;
a = w.getElementsByTagName('div');
for(var i=0; i<a.length; i++){
x[i] = a[i];
}
for(var y=0; y<x.length; y++){
a = x[y];
if ( ((a.className == "video_thumb") || (a.className == "thumb clearfix")) && ((a.parentNode.className == "extra_media clearfix") || (a.parentNode.className == "feed_video clearfix")) && (count < 1) ) {
url = a.getElementsByTagName('a')[0].href;
count++;
a.id = "fixplayer";
}
}

if (url != "") {
var client = new XMLHttpRequest();
client.open("GET", url);
client.send(null);
client.onreadystatechange = function () { 
if (client.readyState==4)
  {
  if (client.status==200)
    {
html = client.responseText;
html = html.split('<body')[1];
html2 = html.split('video_src", "')[1];
html2 = html2.split('"')[0];
html2 = html2.replace(new RegExp(/\\/g),"");
html3 = html.split('"jpg_src", "')[1];
html3 = html3.split('"')[0];
html3 = html3.replace(new RegExp(/\\/g),"");
html4 = html.split('"video_title", "')[1];
html4 = html4.split('"')[0];
html5 = html.split('"video_seconds",')[1];
html5 = html5.split(')')[0];
html = '<embed type="application/x-shockwave-flash" src="http://static.ak.facebook.com/swf/flv.swf?video_src='+html2+'&jpg_src='+html3+'&stage_h=285&stage_w=380&video_title='+html4+'&video_seconds='+html5+'" style="" bgcolor="%23000000" quality="high" scale="noscale" wmode="transparent" height="285" width="380">';
w.getElementById("fixplayer").innerHTML = html;
  }
  }
};
}