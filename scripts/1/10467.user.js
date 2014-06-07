// ==UserScript==
// @name           livedoor Reader and Fastladder - crosslink
// @namespace      tag:drry@drry.jp,2007-07-05:/
// @description    ldR and FastLDR are linked with each other
// @include        http://reader.livedoor.com/reader/
// @include        http://reader.livedoor.com/public/*
// @include        http://fastladder.com/reader/
// @include        http://fastladder.com/public/*
// ==/UserScript==
const VERSION = 2.0;

const _d_favicon_ldR = <><!--
  Copyright 2007 livedoor Co.,Ltd. All rights reserved.
--><![CDATA[data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m
dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHjaYvz//z+DciPDfwYywN16BkZGxdr/ZGmG
AZb/fxkYqGrAgw7sChUqsIszMfwGkkiYU84RLgliw/hgg39jYpZ/f1BNFA3cj5UNAuhqIV74g9t/6HL/
STXg8VQEm0PakUHEZz9mGIAMQMdwTVKI8BD22M+ATS1eA4Rc9zOwS0IMeTqXAasBBMNAyGk/3jDAcMHz
pQhJEBskxi7uCOfDxOAuQI8aNjFHFL6A7X4Gfpv9KOIgMRhgFPUd4LzACMrOIh7kZec3OxgYAQIMAOEJ
hQIvLn7xAAAAAElFTkSuQmCC
]]></>.toString().replace(/\s/g, "");
const _d_favicon_FastLDR = <><!--
  Copyright 2007 livedoor Co.,Ltd. All rights reserved.
--><![CDATA[data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m
dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEzSURBVHjaYvz//z+D6qSn/++8+8NAClAXYWW4kSPF
yCjX9+S/mjALg5IgC0kGgCx89PEPA9Pzz39I1gwCKkIsYENYGBkZ4YJeqpwM/hpceDWmb36LwmdC5my7
/Z1h/fVvJLkEw+077nxn8FXnZGBhYmQo2PGe4fvvf2BxZyUOhjBtbsIGgAWZGDHE9t77wcDIwEicATAw
wUMQxe977n3HUMP0D5gOgIhk8PknRBPLH6AXdwGdpyXKyiDLx4yiCDkMkMGNN38YDj38gfDCww9/wFiK
l5lBjh/TVyBL3n7/x/D00x+G+0B1b7/9wx4Gzz7/BWMYWHDhC8PHH//weoUJm2DNvg/kpwMQaD30keHX
X+JClkkRRz7oPvqJoPNBAc90L1+a0UyaneRoBOm5mi3FCBBgALntd/20hScBAAAAAElFTkSuQmCC
]]></>.toString().replace(/\s/g, "");

var w       = typeof unsafeWindow != "undefined" ? unsafeWindow : window;
var _onload = w.onload;
w.onload = function() {
  _onload();
  var name    = "livedoor Reader";
  var domain  = "reader.livedoor.com";
  var favicon = _d_favicon_ldR;
  if (document.domain == domain) {
    name    = "Fastladder";
    domain  = "fastladder.com";
    favicon = _d_favicon_FastLDR;
  }
  var ul = w.$("control_buttons").getElementsByTagName("ul").item(0);
  var li = document.createElement("li");
  li.className = "button icon";
  li.innerHTML = [
    '<a href="', document.URL.replace(document.domain, domain),
    '" title="', name, '" target="_blank">',
//  '<img src="http://', domain, '/favicon.ico" alt="', name,
    '<img src="', favicon, '" alt="', name,
      '" style="border:0 none;"/>',
    "</a>"
  ].join("");
  ul.appendChild(li);
};
