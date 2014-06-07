// ==UserScript==
// @name           Movapic Add Nice! from LDR(Fastladder)
// @namespace      http://d.hatena.ne.jp/Aoba/
// @include        http://fastladder.com/reader/
// @include        http://reader.livedoor.com/reader/
// @version        1.1
// @description    Movapic Add "nice!" from LDR(Fastladder)
// ==/UserScript==
(function(w){

//=====[CONFIG]=====
const USER = "your_username"; // your username for Movapic (!! not email !!)
const PASS = "your_password"; // your password for Movapic
const KEY  = "n"; // shortcut key for Add Nice!
//==================

var MovapicOnLDR = {
	init: function(w) {
		var self = this;
		var timerId = setTimeout(function(){
			self.login();
		}, 0);
	}
	,login: function() {
		var self = this;
		GM_xmlhttpRequest({
			"method" : "POST", 
			"headers" : {"Content-type":"application/x-www-form-urlencoded"},
			"data" : "email=" + USER + "&password=" + PASS + "",
			"url" : "http://movapic.com/account/login",
			"onload" : function(x){
				if (x.status != 200) {
					w.message('Movapic Login Error. HTTP Response Code : ' + x.status + '');
					return false;
				}
				if (x.responseText.match(/<title>[^<]*ログイン[^<]*<\/title>/)) {
					w.message('Movapic Login Error. Please check your setting.');
					return false;
				}
				w.message('Movapic Login OK.');
				if (typeof w.Keybind != 'undefined' && typeof w.entry_widgets != 'undefined') {
					w.Keybind.add(KEY, function(){self.addNice();});
				}
				return true;
			}
		});
	}
	,addNice: function(id) {
		if (!id) {var id = w.get_active_item(true).id;}
		if (!id) {return;}
		var feed = w.get_active_feed();
		if (!feed.channel.link.match(/^http:\/\/movapic.com\//)) {
			w.message("this is not a Movapic's feed.");
			return;
		}
		var item = w.get_item_info(id);
		item.link.match(/^http:\/\/movapic\.com\/[^\/]+\/[^\/]+\/(\d+)$/);
		var photoNum = RegExp.$1;
		if (!photoNum) {
			w.message('photo number get error.');
			return;
		}
		w.message('Add Nice! ...');
		window.setTimeout(function() {
			GM_xmlhttpRequest({
				"method" : "POST", 
				"headers" : {"Content-type":"application/x-www-form-urlencoded"},
				"data" : "id=" + photoNum + "",
				"url" : "http://movapic.com/star/add",
				"onload" : function(x){

if (x.status == 200) {
	window.setTimeout(function(){GM_xmlhttpRequest({
		"method" : "GET", 
		"url" : "http://movapic.com/star/list/" + photoNum,
		"onload" : function(y){
			if (y.status == 200) {
				var re = new RegExp('<a href="\/' + USER + '"');
				if (y.responseText.match(re)) {
					w.message('done : <a href="' + item.link + '">' + photoNum + '</a>');
				} else {
					w.message('Add Nice Error. Please reload your browser.');
				}
			} else {
				w.message('Add Nice Check Error. HTTP Response Code : ' + y.status + '');
			}
		}
	});}, 0);
} else {
	w.message('Add Nice Post Error. HTTP Response Code : ' + x.status + '');
}

				}
			});
		}, 0);
	}
}

MovapicOnLDR.init(w);

})(this.unsafeWindow || this);
