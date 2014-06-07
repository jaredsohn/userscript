// ==UserScript==
// @name           video2blog.de
// @namespace      Woems
// @include        *
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

if (/http:\/\/www\.youtube\.com\/watch\?v/g.test(document.URL))
{
//  alert(document.URL+"\nyoutube");
  GM_setValue("Titel",$x("/html/body/div/div[2 or 3]/h1")[0].innerHTML);
  GM_setValue("Inhalt",$("embed_code").value+"\n\n"+$x("/html/body/div/div[4 or 5]/div[1 or 2]/div[4]/div/div/div/span")[0].innerHTML+"\n\n"+$("watch-url-field").value+"\n\nDownload: http://keepvid.com/?url="+$("watch-url-field").value);
//  alert(document.URL+"\nyoutube");
} else if (/http:\/\/www\.blog\.de\/admin\/b2edit.php\?blog=/g.test(document.URL))
{
  $("post_title").value=GM_getValue("Titel","-- keinen --");
  $("content").value=GM_getValue("Inhalt","-- keinen --");
  //alert(document.URL+"\nblog.de");
}
