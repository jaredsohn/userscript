// ==UserScript==
// @name           NicoNicoAutoLogin
// @namespace      h13i32maru
// @include        http://www.nicovideo.jp/*
// @include        https://secure.nicovideo.jp/*
// ==/UserScript==
(function()
{
	//あなたのアカウントに置き換えてください;
	var mail = "hoge@example.com";
	var password = "foo";

	function redirect()
	{
		var img = document.querySelector("img[alt='ログイン画面へ']");
		if(img == null){ return; }

		var url = img.parentNode.href;
		location.href = url;
	}

	function login()
	{
		//一度ログインに失敗した場合は自動ログインを中止する。
		//こうしないと何回も自動ログインを繰り返しアカウントのロックが行われるため
		if(document.getElementsByTagName("strong")[0].textContent == "ログイン情報が間違っています！"){ return; }

		//1.5秒ほど待ってからログインしないとログイン処理になぜか時間がかかる
		setTimeout(function()
		{
			document.getElementById("mail").value = mail;
			document.getElementById("password").value = password;
			document.getElementById("login").submit();
		} , 1500);
	}

	if(location.href.match(/sm[0-9]*$/))
	{
		redirect();
		return;
	}
	else if(location.href.match(/login_form/))
	{
		login();
	}
})();
