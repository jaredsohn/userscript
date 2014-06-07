// ==UserScript==
// @name           Download Embedded
// @namespace      http://userscripts.org/users/RyanBiscuit
// @description    Creates a window with links to all embedded flash elements within the page
// @include        *
// @creator        Ryan Boylett <ryanbiscuit@live.com>
// @identifier     http://userscripts.org/scripts/source/37559.user.js
// @version        5.0
// @date           2010-1-3
// ==/UserScript==

var e, p, ce, cp, r, t, ex, exd;
r = new Array(); t = new Array();
e = document.evaluate("//embed", document, null, XPathResult.ANY_TYPE, null);
ce = e.iterateNext();
while(ce) { t = Array(ce.getAttribute('src'),'&lt;span style=&quot;color:#ccc;&quot;&gt;&amp;lt;embed&amp;gt;&lt;/span&gt;'); r.push(t); ce = e.iterateNext(); }
p = document.evaluate("//param", document, null, XPathResult.ANY_TYPE, null);
cp = p.iterateNext();
while(ce) { if(cp.getAttribute('name')=='movie') { t = Array(ce.getAttribute('src'),'&lt;span style=&quot;color:#ccc;&quot;&gt;&amp;lt;param&amp;gt;&lt;/span&gt;'); r.push(t); cp = p.iterateNext(); } }
ex = '<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;><html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;><head><meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /><link rel=&quot;shortcut icon&quot; href=&quot;http://img227.imageshack.us/img227/736/flashiconnw7.gif&quot; /><title>Download Embedded</title></head><body style=&quot;padding:0px;margin:0px;background:#EBEBEB;&quot;>';
exd = ''; for(i=0;i<r.length;i++) { exd += '<div style=&quot;font:arial;font-size:14px;color:#000;background:#fff;border-bottom:1px solid #ccc;padding:5px;&quot;><a href=&quot;'+r[i][0]+'&quot; target=&quot;_blank&quot;>'+r[i][0]+'</a>&nbsp;'+r[i][1]+'</div>'; }
ex += ''+exd+'</body></html>';
if(exd) { document.body.innerHTML += ("<div id=\"flashMiniEmbed\" style=\"position:absolute;top:2px;right:2px;z-index:98327935;cursor:pointer;\" onclick=\"window.open('javascript:document.write(\\'"+ex+"\\');','embedded','left=20,top=20,width="+(screen.width/2)+",height="+(30*r.length)+",toolbar=0,resizable=1');\"><img src=\"http://img227.imageshack.us/img227/736/flashiconnw7.gif\" width=\"16\" height=\"16\" border=\"0\" /></div>"); }
