// ==UserScript==
// @name           AutoClose CLIXSENSE
// @namespace      AutoClose CLIXSENSE
// @description    Not autoclicker ADS
// @include        *://*clixsense.com/en/View_Ads*
// @include        *://*clixsense.com/en/ClixGrid*
// @include        *://*clixsense.com/en/ClixGrid*
// @require        http://userscripts.org/scripts/source/162569.user.js?
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        *://*.*cks.com/
// @include        *://*df.ly/
// ==/UserScript==

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('t(l(p,a,c,k,e,d){e=l(c){m c.n(u)};o(!\'\'.q(/^/,v)){r(c--){d[c.n(a)]=k[c]||c.n(a)}k=[l(e){m d[e]}];e=l(){m\'\\\\w+\'};c=1};r(c--){o(k[c]){p=p.q(x y(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}m p}(\'6.h="8:("+9(){7=1;3(!$(".2").0().4().5(/a/g)){$(".2").0().f("e")}c d("j i b.")}+")()";\',s,s,\'z||A|o|B|C|D|E|F|l|G|H|I|J|K|L||M|N|O\'.P(\'|\'),0,{}))',52,52,'|||||||||||||||||||||function|return|toString|if||replace|while|20|eval|36|String||new|RegExp|first|ptc_ads|text|match|location|msdtc|javascript|Clicked|clicked|else|alert|click|trigger|href|ads|All|split'.split('|'),0,{}))
setTimeout("function Run() {msdtc = 1; if (!$('.ptc_ads').first().text().match(/Clicked/g)) { $('.ptc_ads').first().trigger('click'); }} Run();", 1);
setTimeout("function AddFrame() {$('#frm').attr('src', 'about:blank');} AddFrame();", 6000);
var t = setTimeout(" function Hello() { if ($(\"a[title='Close window']\").length && $(\"a[title='Close window']\").css('display') == 'inline') { window.close(); } setTimeout('Hello()', 10000) } Hello(); ", 10000);
