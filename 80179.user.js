// ==UserScript==
// @name           Add toggle button replacing "Official RT" and "RT" for HootSuite
// @include        http://hootsuite.com/dashboard
// @version        2.0
// @author         nori (http://5509.me/)
// @modified       2011-03-18 13:45
// ==/UserScript==
// Based on this script by
//   Bookmarklet (http://tweet-code.appspot.com/code/20001)
//   by h_kurosawa (http://twitter.com/h_kurosawa)

(function() {
	window.addEventListener(
		"load",
		function() {
			var li = document.createElement("li");
			var anchor = [
					'<a href=\javascript:void(0);" class="firstlevel" onclick="if(document.getElementById(\'hsrt\').checked){hs.prefs.isNewRetweet=1;document.getElementById(\'hsrtTxt\').innerHTML=\' Official ReTweet\';document.getElementById(\'rtToggle\').style.backgroundPosition=\'2px 0px\';}else{hs.prefs.isNewRetweet=0;document.getElementById(\'hsrtTxt\').innerHTML=\' Web ReTweet\';document.getElementById(\'rtToggle\').style.backgroundPosition=\'2px -17px\';};"><label>',
						'<span class="trim rb-a-3">',
							'<span class="assignments icon-19" id="rtToggle"></span>',
							'<span class="text" id="hsrtTxt">Web ReTweet</span>',
							'<span class="icon-13 selected"></span>',
						'<span>',
						'<input type="checkbox" id="hsrt" style="display: none" />',
					'</label></a>'
				].join('');
				
			li.innerHTML = anchor;
				
			document
				.querySelectorAll(".sidebarNavMenu")[1]
				.appendChild(li);
				
			var rtToggle = document.getElementById("rtToggle");
			console.log(rtToggle);
			rtToggle.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAkCAYAAACE7WrnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxJJREFUeNrUlUtIG1EUhmfyMCkJUppFDYGalFlFGrIoNRspVLRdFLt0URoQpKRCyK5FKF2kXUhdlhTiGxJ0I9imlRbRYnYVamK6iNAUpC58BBJNbIyPRPufwQkTM8SMZNMLhzucOfPdc+659x/29PSUqcdQpVIpk1qtflUr8ODggNnf3z+yWCxusZ/d3t6+pVAofh4eHjInJydMNeDx8THFFPR6vWpnZ4exWq1sKaNiscgUCgV+JWSXOsK4KCuAjDR3dna+nZube86DxAGDg4Oh6enpCB6rwjY2NvwVeyQRF4KtSwGEsjc3NytACongdal9uqgZZaCGhgal1Ie1dFRFQYLJzaIsI+oYGTUrn88X5R5ElmWv8yCVSsWQoSwG54le3KgFQPE4OvpSaeQQSlMqlcIqVcuihbVabSm+DEQfi19UgxGE3lMFZSBhlYGBgS6/338bgUfClcDesWelCFQ97iYPKcuIAEJZRqPRAJ/h/F6cHxRLRlmJQelsNhuIRCJWuR3DVcmXtuJsfxrxfPeSUhQGI8vWS9gUTJ3GpRUSAveS47iMWNiuAfJUjkIGAoE3S0tLXVtbW/cA7jObzXnZCjk2NvYNHdYvLCy8xjfNkOo7cNtlK2Rra+vV+fn5vlwu10wZzszMJOB+IkshM5mMCdMiZh4yMjLyEbdhBb5IRdfi8XhfMpl8XwXCUfXj4+OhM8gH2EoZqKOj46bBYHiB1Z7h7/BF8O/u7prQhEXMHDWFILC19vb27wThz5FYIcPh8J9EIrGCK8OgEw8A+4r/Fw9BHzi0nTY7NDExsTY0NNTd29u7B0ajpEK63e7HWHlVo9EwLS0t95HBb/g5utxTU1Oh4eHhxOjoaDf+tE2APgLjiqRCRqPRv7FYzEEw0h0cVi1BJycnP3u93qjT6YzbbLam8wqpIAeZWPFcLlcWZ8WRTqdXdTodEwwGZ/v7+5fx6hPmX1IKKQmi0dPTk8Xpdfh8vncej+cHXLOwZQJTLFnNCkmDFLKtrU1jt9sfCgopyKxshQTkP1NIWP0U8p8AAwDpEvnzcDWIVwAAAABJRU5ErkJggg==)";
			rtToggle.style.backgroundRepeat = "none";
			rtToggle.style.backgroundPosition = "2px -17px";
		},
		false
	);
}());