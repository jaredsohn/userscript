// ==UserScript==
// @name           Feedburner: Adds an easily accessible ping link to feed page
// @namespace      http://steeev.f2o.org/
// @description    Adds an easily accessible ping button for your feed
// @include        http://www.feedburner.com/fb/a/dashboard*
// ==/UserScript==

(function() {

unsafeWindow.pingbastrd=function(apiurl) {
  GM_xmlhttpRequest({
    method: "GET",
    url: apiurl,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    onload: function(res) {
      if(res.responseText.match('Successfully pinged'))
        alert('Ping succesful!');
      else
        alert('Ping failed');
    }
  });
}

genarea=document.getElementById('feedDetails');
dinps=genarea.getElementsByTagName('input');
for (i=0;i<dinps.length;i++)
  if (dinps[i].getAttribute('name')=="sourceUrl") {
    feedsrc=dinps[i].getAttribute('value');
    break;
  }
     
target=document.getElementById('thingActions');
newlink=" | <A onclick='pingbastrd(\"http://www.feedburner.com/fb/a/pingSubmit?bloglink=" + encodeURI(feedsrc)  + "\");return false;' href='http://www.feedburner.com/fb/a/pingSubmit?bloglink=" + encodeURI(feedsrc) +"'>Ping this feed...</a>"
target.innerHTML+=newlink;

}) ();