// ==UserScript==
// @name           Twitter Kiriban Checker
// @description    check kiriban before submit tweet
// @author         Yuki KODAMA (Twitter: kuy)
// @namespace      http://endflow.net/
// @include        http://twitter.com/home
// @version        0.1.0 [07-06-20]
// ==/UserScript==

(function(){
var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
function isKiriban(num){
	var isZorome = function(num){
		if(num < 100){return false;}
		var str = num.toString();
		for(var i = 0; i < str.length; i++){if(str[i] !== str[0]){return false;}}
		return true;
	}
	return (num != 0) && ((num % 100) == 0) || isZorome(num);
}
with(w){
	var df = $("doingForm");
	var _onsubmit = df.onsubmit;
	df.onsubmit = function(){
		var next = parseInt($("update_count").innerHTML.split(" ")[0]) + 1;
		if(isKiriban(next)){
			if(confirm("KIRIBAN " + next + ": Do you REALLY want to post this tweet?")){
				_onsubmit.call(df);
			}
		} else {
			_onsubmit.call(df);
		}
		return false;
	}
}
})();
