// ==UserScript==
// @name           Ustream Auto Opener
// @description    Checks your favorite Ustream channel is live or not and opens it automatically.
// @author         Yuki KODAMA (Twitter: kuy)
// @namespace      http://endflow.net/
// @include        *
// @version        0.1.0 [07-08-20]
// ==/UserScript==

(function(){

// append here user ID (case sensitive)
var list = [/* append here ! */];

// check interval (minutes)
var interval = 15;

Array.prototype.map = function(fn) {
	var ret = new Array(this.length);
	for (var i = 0; i < this.length; i++) {ret[i] = fn(this[i]);}
	return ret;
}
Array.prototype.indexOf = function(e) {
	for(var i = 0; i < this.length; i++) {if(this[i] == e) {return i;}}
	return -1;
}
Array.prototype.remove = function(e) {
    var idx = this.indexOf(e);
    return this.slice(0, idx).concat(this.slice(idx + 1));
}
var _list;
GM_registerMenuCommand("Ustream Auto Opener - Enable", function(){
	if(list.length == 0){return;}
	_list = list.slice(0);
	setTimeout(checkAndOpen, Math.round(interval * 60000));
});
function checkAndOpen() {
	GM_xmlhttpRequest({
		method:	"GET",
		url: "http://ustream.tv/live.rss",
		onload: function(r){
		    if(_list.length == 0) {return;}
			var rgx = eval("/(\\/" + _list.join("<)|(\\/") + "<)/g");
			var lives = r.responseText.match(rgx);
			if(lives) {
				lives = lives.map(function(e){return e.slice(1, -1);})
				for(var i = 0; i < lives.length; i++) {
					window.open("http://ustream.tv/channel/" + lives[i], "uao_" + lives[i]);
					_list = _list.remove(lives[i]);
				}
			}
			setTimeout(checkAndOpen, Math.round(interval * 60000));
		}
	});
}
})();
