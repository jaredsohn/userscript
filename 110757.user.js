// ==UserScript==
// @name           Favotter censored blinder
// @namespace      montered
// @description    ふぁぼったーのcensored部分をクリックしてめくれるようにする
// @include        http://favotter.net*
// @version        1.1
// @author		   Vilart
// ==/UserScript==

(function(){
	// based on Prototype.js
	function unescapeHTML(stt) {
		var div = document.createElement('div');
		div.innerHTML = stt
		return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
	}
	
	// from http://subtech.g.hatena.ne.jp/cho45/20090513/1242199703
	function escapeForRegexp(stt) {
		return stt.replace(/[\s\S]/g, function (_) {
	    	return '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1)
		});
	}
	var bgurl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAVUlEQVR4nGN89%2B4%2FAwz8%2F%2F%2F%2F4b2jTMj8R%2FdPvnl%2BhAXOf3Dv6NvnRxgYGJhg8icgfAYGBpb%2F%2F%2F8%2FeXD0%2B6ezwkJ8LCxM%2F%2F4zML5%2FcZSd5S0nJyfcUAARPS7kXLm3jQAAAABJRU5ErkJggg%3D%3D";

	// スタイルの設定
	censorstyle = document.createElement("style");

	censorstyle.type = "text/css";
	censorstyle.innerHTML =	"#content .censored.blinded {" +
							"background:#fff5bb url("+bgurl+") no-repeat 0px 0px;" +
							"border-bottom: 1px solid #e8dea8; border-right: 1px solid #e8dea8; margin: 0 -1px -1px 0;" +
							"cursor: pointer;" +
							"}" +
							"#content .censored.blinded span {" +
							"visibility: hidden;" +
							"}" +
							"#content .censored.blinded.uncensored {background:none;border:none;cursor:auto;color:inherit;margin:0;} #content .censored.blinded.uncensored span {visibility:visible;}";

	////////////////////////////////////////////////////////////////

	var doProcess = function() {

		// 全体でつかう変数
		var statuses = new Object();
		var worker = new Array();
		var working = 0;

		// censored発言の列挙
		entries = document.getElementsByClassName("entry");

		for (var i = 0; i < entries.length; i++) {
			var text = entries[i].getElementsByClassName("status_text")[0];
			var censors = text.getElementsByClassName("censored");
			
			if (censors.length > 0) {
				if (!/gm_censored/.test(entries[i].className)) {
					entries[i].className += " gm_censored ";

					var status_id = entries[i].id.replace("status_", "");
					var username = entries[i].getElementsByClassName("info")[0].getElementsByTagName("strong")[0].getElementsByTagName("a")[0].textContent;

					// censoredを抽出するための正規表現をつくる
					var censoredStts = text.innerHTML.replace(/<a[\s\S]*?>(.*?)<\/a>/igm, function() { return RegExp.$1; }).split(/<span[\s\S]*?>.*?<\/span>/igm);
					for (var k = 0; k < censoredStts.length; k++) censoredStts[k] = escapeForRegexp(unescapeHTML(censoredStts[k]));

					// データ追加
					statuses[status_id] = {
						'user': username,
						'num': censoredStts.length - 1,
						'regexp': new RegExp("^" + censoredStts.join("([\\s\\S]*)") + "$", "")
					};
					worker.push(status_id);
				}
			}
		}
		
		// 取得処理
		function getNext() {
			if (working >= worker.length) {
				gotCallback();
				return;
			}
			GM_xmlhttpRequest({
				method: "GET", 
				url: "http://mobile.twitter.com/"+statuses[worker[working]].user+"/status/"+worker[working],
				onload: function(e) {
					var d = document.createElement("div");
					d.innerHTML = e.responseText;
					var statusClass = d.getElementsByClassName("status");
					
					var w = statuses[worker[working]];
					if (statusClass.length > 0) {
						w.failed = false;
						w.uncensored = statusClass[0].textContent;
						w.censoring = new Array(w.num);

						var wmatch = w.uncensored.match(w.regexp);
						if (wmatch)
							for (var i=0; i<w.num; i++) w.censoring[i] = wmatch[i+1];
						else
							w.failed = true;
					} else {
						w.failed = true;
					}
					
					working++
					getNext();
				}
			});
		}
		
		// ブラインドの適用
		function gotCallback() {
			document.getElementsByTagName('head')[0].appendChild(censorstyle);

			for(var m in statuses) {
				if (statuses[m].failed) continue;

				var status = document.getElementById("status_" + m);
				var censors = status.getElementsByClassName("censored");
				
				for (var i=0; i < censors.length; i++) {
					var span = document.createElement("span");
					span.innerHTML = statuses[m].censoring[i];

					censors[i].innerHTML = "";
					censors[i].appendChild(span);
					censors[i].className += " blinded";
					
					censors[i].addEventListener("click", removeBlind, false);
				}
			}
		}
		
		function removeBlind(e) {
			if (e.target.className.indexOf("uncensored", 0) == -1) e.target.className += " uncensored";
		}
		
		// 処理開始
		getNext();
	}
	
	doProcess();

	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	    doProcess();
	}, false);
	
})();