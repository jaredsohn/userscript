// ==UserScript==
// @name       Syndicate New Post Checker
// @namespace  Syndicate New Post Checker
// @version    0.3
// @description  Checks the Syndicate subforums to check for new posts and alerts the user if there are.
// @include      http://leakforums.org*
// @include      http://*.leakforums.org*
// @match      http://leakforums.org*
// @match      http://*.leakforums.org*
// @updateURL https://userscripts.org/scripts/source/176974.meta.js
// @downloadURL https://userscripts.org/scripts/source/176974.user.js
// @copyright  2013+, Oscar Sanchez
// @icon http://www.leakforums.org/uploads/ficons/5N2LkwV.png
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/cookie.js
// @run-at document-end
// ==/UserScript==
n=["c","d","e"],i={},k="__snpc",q=187,o="/forumdisplay.php?fid=",r=Date.now(),u=$(document),l=$("#container"),h=".navigation",e="a:contains('Syndicate')"; if(getCookie(k)==null){setCookie(k,r+".0"+".0");s=r+".0"+".0";}else{s=getCookie(k);} $.each(n,function(a,b){x=s.split(".")[a];i[b]=+(x);}); if(($('li>a[href*="'+q+'"]').length)||($(".active").text()=="Syndicate")){s=r+".0."+i.e;setCookie(k,s);$.ajax({url:o+"89",cache:false}).done(function(j){g=+($(e).closest('tr').find($("td[style*='white-space']")).eq(1).text());if(i.e<g){l.prepend(v(g));s=r+".0."+g;setCookie(k,s);}});return;} v=function(t){return'<div class="pm_alert"><a href="'+o+q+'">New post(s) in the Syndicate Subforums!</a></div>';}; if(i.d==1){l.prepend(v(i.e));return;} if(r-i.c>1e4){$.ajax({url:o+"89",cache:false}).done(function(j){g=+($(e).closest('tr').find($("td[style*='white-space']")).eq(1).text());if(i.e<g){l.prepend(v(g));s=r+".1."+g;setCookie(k,s);}});}