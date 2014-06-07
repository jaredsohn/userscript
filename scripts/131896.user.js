// ==UserScript==
// @name           WORLDLINE image uploader
// @namespace  aramakid
// @description  WORLDLINEに画像投稿する拡張
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        http://test.oov.ch/worldline/*
// ==/UserScript==

function addJQuery(callback){
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function(){
		var script = document.createElement("script");
		script.textContent = "jQuery.noConflict(); (" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(function(){
	var timer = 0;
	document.addEventListener('DOMNodeInserted', function() {
		if(timer) return;
		timer = setTimeout(function() {
			//base64データを画像に差し替える
			var regexp = /(data:.+;base64,[a-zA-Z0-9¥/¥+]+==)/;
			$('span.title').each(function(){
				var s = this.innerHTML;
				if(!this.decoded &&(m = regexp.exec(s)) != null){
					this.innerHTML = s.replace(regexp, '<img src="' + m[1] + '">');
				}
				this.decoded = true;
			});

			//テキストボックスに画像をD&Dできるようにする
			$('textarea.span6').each(
				function(){
					this.ondragover = function(event){
						event.preventDefault();
					};
					this.ondragleave = function(event){
						event.preventDefault();
					};
					this.ondrop = function(event){
						event.preventDefault();
						if(!event.dataTransfer.files.length){
							return;
						}
						var file = event.dataTransfer.files[0];
						var reader = new FileReader();
						reader.readAsDataURL(file)
				reader.onload = function(){
					var text = $('textarea.span6').val() + reader.result;
					$('textarea.span6').val(text);
				}
					}
				});
		timer = 0; // 初期化
		}, 30);
	}, false);
});