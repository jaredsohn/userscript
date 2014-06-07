// ==UserScript==
// @match http://www.reddit.com/r/*
// @name Reddit comment preview
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(function () {
  var converter = new Showdown.converter();
  $("header").append("<style>.preview { width: 500px; }</style>");
  var fetchPreview = function ($usertext_edit) {
    var $preview = $usertext_edit.children(".preview");
    if($preview.length) { return $preview; } // Preview space exists
    
    // Make preview space
    return $usertext_edit.children(".bottom-area").after('<div class="preview"></div>');
  };
  $(".usertext-edit div:first-child textarea").live("keyup", function () {
    var $this = $(this),
      $usertext_edit = $this.closest(".usertext-edit"),
      $preview = fetchPreview($usertext_edit);
    $preview.html(converter.makeHtml($this.val()));
  });
});

// Showdown from
//
// * https://github.com/coreyti/showdown
// * http://www.ctrlshift.net/project/markdowneditor/
//
// Compressed by
//
// * http://closure-compiler.appspot.com/home
var Showdown={converter:function(){var i,j,n,o=0;this.makeHtml=function(a){i=[];j=[];n=[];a=a.replace(/~/g,"~T");a=a.replace(/\$/g,"~D");a=a.replace(/\r\n/g,"\n");a=a.replace(/\r/g,"\n");a=u("\n\n"+a+"\n\n");a=a.replace(/^[ \t]+$/mg,"");a=v(a);a=B(a);a=p(a);a=w(a);a=a.replace(/~D/g,"$$");return a=a.replace(/~T/g,"~")};var B=function(a){return a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(a,c,b,e,g){c=c.toLowerCase();i[c]=
x(b);if(e)return e+g;g&&(j[c]=g.replace(/"/g,"&quot;"));return""})},v=function(a){a=a.replace(/\n/g,"\n\n");a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,l);a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,l);a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,l);a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,
l);a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,l);return a=a.replace(/\n\n/g,"\n")},l=function(a,d){var c;c=d.replace(/\n\n/g,"\n");c=c.replace(/^\n/,"");c=c.replace(/\n+$/g,"");return c="\n\n~K"+(n.push(c)-1)+"K\n\n"},p=function(a){for(var a=C(a),d=h("<hr />"),a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,d),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,d),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,d),a=y(a),a=D(a),a=E(a),a=v(a),a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,
""),c=a.split(/\n{2,}/g),a=[],d=c.length,b=0;b<d;b++){var e=c[b];0<=e.search(/~K(\d+)K/g)?a.push(e):0<=e.search(/\S/)&&(e=m(e),e=e.replace(/^([ \t]*)/g,"<p>"),e+="</p>",a.push(e))}d=a.length;for(b=0;b<d;b++)for(;0<=a[b].search(/~K(\d+)K/);)c=n[RegExp.$1],c=c.replace(/\$/g,"$$$$"),a[b]=a[b].replace(/~K\d+K/,c);return a=a.join("\n\n")},m=function(a){a=F(a);a=G(a);a=a.replace(/\\(\\)/g,q);a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,q);a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,z);a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,
z);a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,r);a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,r);a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,r);a=H(a);a=x(a);a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>");a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>");return a=a.replace(/  +\n/g," <br />\n")},G=function(a){return a=a.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi,
function(a){a=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return a=k(a,"\\`*_")})},r=function(a,d,c,b,e,g,h,f){void 0==f&&(f="");a=b.toLowerCase();if(""==e)if(""==a&&(a=c.toLowerCase().replace(/ ?\n/g," ")),void 0!=i[a])e=i[a],void 0!=j[a]&&(f=j[a]);else if(-1<d.search(/\(\s*\)$/m))e="";else return d;e=k(e,"*_");d='<a href="'+e+'"';""!=f&&(f=f.replace(/"/g,"&quot;"),f=k(f,"*_"),d+=' title="'+f+'"');return d+(">"+c+"</a>")},z=function(a,d,c,b,e,g,h,f){a=c;b=b.toLowerCase();f||(f="");if(""==e)if(""==b&&(b=
a.toLowerCase().replace(/ ?\n/g," ")),void 0!=i[b])e=i[b],void 0!=j[b]&&(f=j[b]);else return d;a=a.replace(/"/g,"&quot;");e=k(e,"*_");d='<img src="'+e+'" alt="'+a+'"';f=f.replace(/"/g,"&quot;");f=k(f,"*_");return d+(' title="'+f+'"')+" />"},C=function(a){a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return h("<h1>"+m(c)+"</h1>")});a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return h("<h2>"+m(c)+"</h2>")});return a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,b){a=
c.length;return h("<h"+a+">"+m(b)+"</h"+a+">")})},s,y=function(a){var a=a+"~0",d=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;o?a=a.replace(d,function(a,d,e){a=d;e=-1<e.search(/[*+-]/g)?"ul":"ol";a=a.replace(/\n{2,}/g,"\n\n\n");a=s(a);a=a.replace(/\s+$/,"");return"<"+e+">"+a+"</"+e+">\n"}):(d=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(d,function(a,d,e,g){a=e;g=-1<g.search(/[*+-]/g)?
"ul":"ol";a=a.replace(/\n{2,}/g,"\n\n\n");a=s(a);return d+"<"+g+">\n"+a+"</"+g+">\n"}));return a=a.replace(/~0/,"")};s=function(a){o++;a=a.replace(/\n{2,}$/,"\n");a=(a+"~0").replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,c,b,e,g){a=g;c||-1<a.search(/\n{2,}/)?a=p(t(a)):(a=y(t(a)),a=a.replace(/\n$/,""),a=m(a));return"<li>"+a+"</li>\n"});a=a.replace(/~0/g,"");o--;return a};var D=function(a){a=(a+"~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
function(a,c,b){a=A(t(c));a=u(a);a=a.replace(/^\n+/g,"");a=a.replace(/\n+$/g,"");return h("<pre><code>"+a+"\n</code></pre>")+b});return a=a.replace(/~0/,"")},h=function(a){a=a.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(n.push(a)-1)+"K\n\n"},F=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,c,b,e){a=e.replace(/^([ \t]*)/g,"");a=a.replace(/[ \t]*$/g,"");a=A(a);return c+"<code>"+a+"</code>"})},A=function(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");a=a.replace(/>/g,
"&gt;");return a=k(a,"*_{}[]\\",!1)},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,c){var b;b=c.replace(/^[ \t]*>[ \t]?/gm,"~0");b=b.replace(/~0/g,"");b=b.replace(/^[ \t]+$/gm,"");b=p(b);b=b.replace(/(^|\n)/g,"$1  ");b=b.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,c){var b;b=c.replace(/^  /mg,"~0");return b=b.replace(/~0/g,"")});return h("<blockquote>\n"+b+"\n</blockquote>")})},x=function(a){a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");return a=
a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")},H=function(a){a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>');return a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,c){return I(w(c))})},I=function(a){var d=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){a=a.charCodeAt(0);return"&#x"+("0123456789ABCDEF".charAt(a>>4)+"0123456789ABCDEF".charAt(a&15))+";"},function(a){return a}],a=("mailto:"+a).replace(/./g,function(a){if("@"==a)a=d[Math.floor(2*
Math.random())](a);else if(":"!=a)var b=Math.random(),a=0.9<b?d[2](a):0.45<b?d[1](a):d[0](a);return a});return a=('<a href="'+a+'">'+a+"</a>").replace(/">.+:/g,'">')},w=function(a){return a=a.replace(/~E(\d+)E/g,function(a,c){var b=parseInt(c);return String.fromCharCode(b)})},t=function(a){a=a.replace(/^(\t|[ ]{1,4})/gm,"~0");return a=a.replace(/~0/g,"")},u=function(a){a=a.replace(/\t(?=\t)/g,"    ");a=a.replace(/\t/g,"~A~B");a=a.replace(/~B(.+?)~A/g,function(a,c){for(var b=c,e=4-b.length%4,g=0;g<
e;g++)b+=" ";return b});a=a.replace(/~A/g,"    ");return a=a.replace(/~B/g,"")},k=function(a,d,c){d="(["+d.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);return a=a.replace(RegExp(d,"g"),q)},q=function(a,d){return"~E"+d.charCodeAt(0)+"E"}}};