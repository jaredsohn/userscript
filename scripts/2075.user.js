// ==UserScript==
// @name          LF Quick Bookmark
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  Makes bookmarking faster
// @include       http://linkfilter.net/*
// @include       http://www.linkfilter.net/*
// ==/UserScript==

/*
   This uses XMLHttpRequest() to do bookmarking and
   unbookmarking quickly. You get an indication that
   it worked by the image becoming faded and the
   title (tooltip) will also say it's done.
*/

(function() {
  window.addEventListener("load", function(e) {

var vlinks = document.getElementsByTagName("a");
var vlink, i;
var bmid = "";

for (i=0; vlink = vlinks[i]; ++i)
{
    if(vlink.getAttribute("href"))
    {
	if(vlink.getAttribute("href").indexOf("/?cmd=bookmark;id=") != -1)
	{
	    var bmid = vlink.getAttribute("href").split("id=")[1];
	    vlink.setAttribute("onclick","return qvote('"+bmid+"');");
	    vlink.setAttribute("id","bm"+bmid);
	    vlink.setAttribute("title","Quick Bookmark");
	}
	else if(vlink.getAttribute("href").indexOf("/?cmd=unbookmark;id=") != -1)
	{
	    var bmid = vlink.getAttribute("href").split("id=")[1];
	    vlink.setAttribute("onclick","return quvote('"+bmid+"');");
	    vlink.setAttribute("id","bm"+bmid);
	    vlink.setAttribute("title","Quick Un-Bookmark");
	}
    }
}

var buf ="\
function qvote(id)\
{\
try{\
  var url = '/?cmd=bookmark;id='+id;\
  var httpreq = new XMLHttpRequest();\
  httpreq.open('GET',url,true);\
  httpreq.send(null);\
  var bm = document.getElementById('bm'+id);\
  bm.setAttribute('style','opacity:0.4');\
  bm.setAttribute('title','Bookmarked!');\
  return false;\
}catch(err){alert(err)}\
}\
function quvote(id)\
{\
  var url = '/?cmd=unbookmark;id='+id;\
  var httpreq = new XMLHttpRequest();\
  httpreq.open('GET',url,true);\
  httpreq.send(null);\
  var bm = document.getElementById('bm'+id);\
  bm.setAttribute('style','opacity:0.4');\
  bm.setAttribute('title','Un-Bookmarked!');\
  return false;\
}";
document.injectScript(buf);

// End of script
  }, false);
})();

/* Script injector */
document.injectScript = function(data)
{
    var head = document.getElementsByTagName("head").item(0);
    var js = document.createTextNode(data);
    var script = document.createElement("script");
    script.setAttribute("language","Javascript");
    script.setAttribute("type","text/javascript");
    script.appendChild(js);
    head.appendChild(script);
}
