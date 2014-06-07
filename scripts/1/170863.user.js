// ==UserScript==
// @name JustTweet
// @description Tweet any crap thing you see on your chrome browser.
// @author Rahul Bohra
// @version 1
// @date 2013-06-14
// ==/UserScript==

javascript:(function(){function bmLoader(jsFile) { var head = document.getElementsByTagName('head')[0]; var fileref = document.createElement('script'); fileref.type = 'text/javascript'; fileref.src = jsFile; head.appendChild(fileref); } bmLoader('http://emphit.com/js/emphit.js');})()