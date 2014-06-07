// ==UserScript==
// @name Green Bar
// @author Green bar
// @include http://www.hackforums.net/
// @include http://hackforums.net/
// @version     1.0
// ==/UserScript== 




 var script = document.createElement('script');
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	document.body.innerHTML = document.body.innerHTML.replace('<<div class="pm_alert">We are having some issues being marked as unsafe from browsers and Google search. You can read more about it <a href="showthread.php?tid=2821087">HERE</a>.</div>', '');
	document.body