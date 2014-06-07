// ==UserScript==
// @name           Unsubscribe Button on LDR
// @namespace      http://pastak.cosmio.net
// @description    Add Unsubscribe Button on Livedoor Reader
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==
function delFeed(id){
		var api="/api/feed/unsubscribe";
		var url=(api+"?subscribe_id="+id+"&ApiKey="+ApiKey);
		var req=new XMLHttpRequest();
		req.open('POST',url,true);
		req.onprogress = function(res){
		alert("Unsubscribe this Feed.");
		};
		req.onerror = function(res){
		alert("Failed - "+req.status+':'+req.statusText);
		};
		req.send(null);
	}

(function(){
	var w = unsafeWindow;
	var _onload=w.onload;
	var onloadfunc=function(){
		w.register_hook('AFTER_PRINTFEED', function(feed){
			var button=document.createElement("a");
			button.href="javascript:void(0);";
			var s=button.style;
			s.backgroundImage="url(/img/icon/trash.gif)";
			s.backgroundPosition="0 0";
			s.backgroundRepeat="no-repeat";
			s.padding="0 0 4px 20px";
			button.textContent="購読停止";
			var f=function(){delFeed(feed.subscribe_id);};
			button.addEventListener("click",f,false);
			var info=document.getElementById("channel_info");
			var span=document.createElement("span");
			span.className="widget widget_about";
			span.appendChild(button);
			var split=document.createElement("span");
			split.textContent='  |  ';
			info.appendChild(split);
			info.appendChild(span);
		});
	};
	
	w.onload=function(){
		_onload();
		onloadfunc();
	};
})();