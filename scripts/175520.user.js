// ==UserScript==
// @name        Salty Bettor
// @namespace   http://saltybet.com
// @include     http://www.saltybet.com/
// @version     1
// ==/UserScript==
javascript:n=function(b){return "$('#wager').val("+b+")"};p=function(b){return "d=$('#balance').text();$('#wager').val(Math.floor(d*"+b+"))"};c=function(x,t){return '<input type="button" style="border-radius:5px;border: 2px solid #336633;margin:0.25em;padding:0;background:green;color:white;" onclick="'+x+'" value="'+t+'"/>';};$('#wager').before(c(n(10),'10')
+c(n(100),'100')
+c(n(1000),'1000')
+c(n(10000),'10k')
+c(p(0.1),'10%')
+c(p(0.25),'25%')
+c(p(0.5),'50%')
+c(p(0.75),'75%')
+c(p(1),'All in!'));