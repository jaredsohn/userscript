// ==UserScript==
// @name           Blogger preview
// @namespace      http://santyweb.blogspot.com/
// @description    Remove all layers
// @include        *.blogspot.com/b/post-preview?*
// @version        0.5
// ==/UserScript==
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 f(a){1=2.6("1")[0];7(!1)8;3=2.9("g");3.b=\'c/h\';3.d=a;1.e(3)};5 i(a){1=2.6("1")[0];7(!1)8;4=2.9("j");4.b=\'c/k\';4.d=a;1.e(4)}',21,21,'|head|document|styl|scrp|function|getElementsByTagName|if|return|createElement||type|text|innerHTML|appendChild|addStyle|style|css|addScript|script|javascript'.split('|'),0,{}))

window.addEventListener('load', function() {
  tmp=".blogger-clickTrap{display:none !important}";
  addStyle(tmp);
}, true);