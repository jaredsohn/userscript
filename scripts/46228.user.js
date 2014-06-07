// ==UserScript==
// @name           chinkoup.fullscreen
// @namespace      chinkoup.fullscreen
// @include        http://chinkoup.net:8094/cash/*
// ==/UserScript==

//課題
//1. 見開きと単頁の手動切り替えが出来ないので実装したい
//2. 可能なら画像のwidthを計って自動で単頁か見開きかも切り替わるようにしたい

//単頁、見開き切り替えメニューをいつか作りたい
setFSS='';

//環境回り取得

//得に根拠は無いが一応16pxだけ引いておく
w=document.body.clientWidth;
h=document.body.clientHeight;

html = document.body.innerHTML;

current = document.URL.replace(/(.*.cash\/[^\/]+\/).+/gi,"$1");

page = document.URL.replace(/.*.cash\/([^\/]+)\/.+/gi,"$1");
page = page.replace(/[^0-9]/g,"");
toppage = 'http://chinkoup.net:8084/index.php?M=disp&f_No='+page;

//divide画像,前後頁取得
html = html.replace(/[\n\r]/g,"")
div1 = html.replace(/^.*.src="([^"]+div1_image.(jpg|png))".+/gi,"$1");
div2 = html.replace(/^.*.src="([^"]+div2_image.(jpg|png))".+/gi,"$1");
next = html.replace(/^.*.href="([^"]+)">次.+/gi,"$1");
next = next.replace(/.\//,current);
prev = html.replace(/^.*.href="([^"]+)">前.+/gi,"$1");
prev = prev.replace(/.\//,current);

//最終頁は強制単頁表示
if(next.match(/<h1 /g)){
	force_nospread=null;
	next = "";
	GM_addStyle('* {margin:0px;padding:0px;border:none;} img {display:block;height:'+h/2+';} div {float:left;} #navigation{position:absolute;top:0px;right:0px;} a {color:#00cc00;} #next {display:none;}')
	document.body.innerHTML = '<div id="current"><img src="'+div1+'" /><img src="'+div2+'" /></a></div><div id="navigation">1P進む|<a href="'+toppage+'">トップ</a>|<a href="'+prev+'">1P戻る</a>'+setFSS+'</div>';
}

//次頁取得
GM_xmlhttpRequest({
	method: 'GET',
	url: next,
	overrideMimeType: "text/plain; charset=EUC-JP",
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	},
	//次の頁取得
	onload: function(responseDetails) {
		//次の頁の画像と次の次の頁のURL取得
		html_n = responseDetails.responseText;
		html_n = html_n.replace(/[\n\r]/g,"")
		div1_n = html_n.replace(/^.*.src="([^"]+div1_image.(jpg|png))".+/gi,"$1");
		div2_n = html_n.replace(/^.*.src="([^"]+div2_image.(jpg|png))".+/gi,"$1");
		next_n = html_n.replace(/^.*.href="([^"]+)">次.+/gi,"$1");
		next_n = next_n.replace(/.\//,current);
		//最初の頁は強制単頁表示
		force_nospread = 1;
		if(prev.match(/<h1 /gi)){
			force_nospread=null;
			prev = "";
		}
		if(force_nospread){
			GM_xmlhttpRequest({
				method: 'GET',
				url: prev,
				overrideMimeType: "text/plain; charset=EUC-JP",
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				},
				//前の頁を取得 div._pは不要か
				onload: function(responseDetails) {
					//前の前の頁のURLを取得
					html_p = responseDetails.responseText;
					html_p = html_p.replace(/[\n\r]/g,"")
					div1_p = html_p.replace(/^.*.src="([^"]+div1_image.(jpg|png))".+/gi,"$1");
					div2_p = html_p.replace(/^.*.src="([^"]+div2_image.(jpg|png))".+/gi,"$1");
					prev_p = html_p.replace(/^.*.href="([^"]+)">前.+/gi,"$1");
					prev_p = prev_p.replace(/.\//,current);


					//単頁表示と見開き表示、そのうち選択させる形式にしたい
					is_spread = true;
					if(prev_p.match(/h1/g)){
						is_spread = false;
					}
					if(next_n.match(/h1/g)){
						is_spread = false;
					}

					forcenospread = GM_getValue("forcenospread",false);
					if(forcenospread){
						is_spread = false;
					}
					if(is_spread){
						//通常の見開き表示
						GM_addStyle('* {margin:0px;padding:0px;border:none;} img {display:block;max-height:'+h/2+';max-width:'+w/2+';} div {float:left;} #navigation{position:absolute;top:0px;right:0px;} a {color:#00cc00;}')
						document.body.innerHTML = '<div id="next"><a href="'+next_n+'"><img src="'+div1_n+'" /><img src="'+div2_n+'" /></a></div><div id="current"><a href="'+prev_p+'"><img src="'+div1+'" /><img src="'+div2+'" /></a></div><div id="navigation"><a href="'+next+'">1P進む</a>|<a href="'+toppage+'">トップ</a>|<a href="'+prev+'">1P戻る</a>'+setFSS+'</div>';
					}else{
						//通常の単頁表示
						GM_addStyle('* {margin:0px;padding:0px;border:none;} img {display:block;height:'+h/2+';} div {float:left;} #navigation{position:absolute;top:0px;right:0px;} a {color:#00cc00;} #next {display:none;}')
						document.body.innerHTML = '<div id="current"><a href="'+next+'"><img src="'+div1+'" /><img src="'+div2+'" /></a></div><div id="navigation"><a href="'+next+'">1P進む</a>|<a href="'+toppage+'">トップ</a>|<a href="'+prev+'">1P戻る</a>'+setFSS+'</div>';
					}

				}
			})
		}else{	
			//最初の頁
			GM_addStyle('* {margin:0px;padding:0px;border:none;} img {display:block;height:'+h/2+';} div {float:left;} #navigation{position:absolute;top:0px;right:0px;} a {color:#00cc00;} #next {display:none;}')
			document.body.innerHTML = '<div id="current"><a href="'+next+'"><img src="'+div1+'" /><img src="'+div2+'" /></a></div><div id="navigation"><a href="'+next+'">1P進む</a>|<a href="'+toppage+'">トップ</a>|<a href="'+prev+'">1P戻る</a>'+setFSS+'</div>';
		}

	}
});

