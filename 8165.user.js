// ==UserScript==
// @name           Google lightbox
// @namespace      http://ihoss.not-a-blog.com/gm.php
// @description    View previews of google image results in a lightbox
// @include        http://images.google.com/images?*
// ==/UserScript==
var a = document.createElement("script");
a.type = "text/javascript";
a.src = "http://ihoss.not-a-blog.com/gm/js/prototype.js";
var b = document.createElement("script");
b.type = "text/javascript";
b.src = "http://ihoss.not-a-blog.com/gm/js/effects.js";
var c = document.createElement("script");
c.type = "text/javascript";
c.src = "http://ihoss.not-a-blog.com/gm/js/lightbox.js";
var d = document.createElement("link");
d.rel = "stylesheet";
d.href = "http://ihoss.not-a-blog.com/gm/css/lightbox.css";
d.type = "text/css";
d.media = "screen";
document.body.appendChild(a);
document.body.appendChild(b);
document.body.appendChild(c);
document.body.appendChild(d);
    var l = 1+1*document.getElementById('ImgContent').firstChild.firstChild.lastChild.lastChild.id.substr(9);
    var td, img, desc, href;
    for(i=0; i<l; i++){
      td = document.getElementById("tDataImage"+i);
      img = td.firstChild.firstChild.src;
      img = unescape(img.substr(img.lastIndexOf("http://")));
      href = td.firstChild.href;
      desc = document.getElementById("tDataText"+i).firstChild.innerHTML
      desc = desc.replace(/<font(.*)>(.*)<\/font>/gi,'<a href="' + href + '" style="color:#008800; text-decoration: none" >$2</a>');
      desc = desc.replace(/<(.*)>/g,"&lt;$1&gt;");
      desc = desc.replace(/"/g,'\'');
      td.innerHTML+= '<a href="' + img + '" rel="lightbox[google]" title="' + desc + '" style="margin: 0px 0px 0px -20px;"><img src="http://ihoss.not-a-blog.com/gm/preview.gif" style=" border: 0px solid #FFF;"/></a>';
    }